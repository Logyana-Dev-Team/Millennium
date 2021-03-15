(function ($) {
  "use strict";
  if (typeof wpcf7 === "undefined" || wpcf7 === null) {
    return;
  }
  wpcf7 = $.extend({ cached: 0, inputs: [] }, wpcf7);
  $(function () {
    wpcf7.supportHtml5 = (function () {
      var features = {};
      var input = document.createElement("input");
      features.placeholder = "placeholder" in input;
      var inputTypes = ["email", "url", "tel", "number", "range", "date"];
      $.each(inputTypes, function (index, value) {
        input.setAttribute("type", value);
        features[value] = input.type !== "text";
      });
      return features;
    })();
    $("div.wpcf7 > form").each(function () {
      var $form = $(this);
      wpcf7.initForm($form);
      if (wpcf7.cached) {
        wpcf7.refill($form);
      }
    });
  });
  wpcf7.getId = function (form) {
    return parseInt($('input[name="_wpcf7"]', form).val(), 10);
  };
  wpcf7.initForm = function (form) {
    var $form = $(form);
    $form.submit(function (event) {
      if (!wpcf7.supportHtml5.placeholder) {
        $("[placeholder].placeheld", $form).each(function (i, n) {
          $(n).val("").removeClass("placeheld");
        });
      }
      if (typeof window.FormData === "function") {
        wpcf7.submit($form);
        event.preventDefault();
      }
    });
    $(".wpcf7-exclusive-checkbox", $form).on(
      "click",
      "input:checkbox",
      function () {
        var name = $(this).attr("name");
        $form
          .find('input:checkbox[name="' + name + '"]')
          .not(this)
          .prop("checked", false);
      }
    );
    $(".wpcf7-list-item.has-free-text", $form).each(function () {
      var $freetext = $(":input.wpcf7-free-text", this);
      var $wrap = $(this).closest(".wpcf7-form-control");
      if ($(":checkbox, :radio", this).is(":checked")) {
        $freetext.prop("disabled", false);
      } else {
        $freetext.prop("disabled", true);
      }
      $wrap.on("change", ":checkbox, :radio", function () {
        var $cb = $(".has-free-text", $wrap).find(":checkbox, :radio");
        if ($cb.is(":checked")) {
          $freetext.prop("disabled", false).focus();
        } else {
          $freetext.prop("disabled", true);
        }
      });
    });
    if (!wpcf7.supportHtml5.placeholder) {
      $("[placeholder]", $form).each(function () {
        $(this).val($(this).attr("placeholder"));
        $(this).addClass("placeheld");
        $(this).focus(function () {
          if ($(this).hasClass("placeheld")) {
            $(this).val("").removeClass("placeheld");
          }
        });
        $(this).blur(function () {
          if ("" === $(this).val()) {
            $(this).val($(this).attr("placeholder"));
            $(this).addClass("placeheld");
          }
        });
      });
    }
    if (wpcf7.jqueryUi && !wpcf7.supportHtml5.date) {
      $form.find('input.wpcf7-date[type="date"]').each(function () {
        $(this).datepicker({
          dateFormat: "yy-mm-dd",
          minDate: new Date($(this).attr("min")),
          maxDate: new Date($(this).attr("max")),
        });
      });
    }
    if (wpcf7.jqueryUi && !wpcf7.supportHtml5.number) {
      $form.find('input.wpcf7-number[type="number"]').each(function () {
        $(this).spinner({
          min: $(this).attr("min"),
          max: $(this).attr("max"),
          step: $(this).attr("step"),
        });
      });
    }
    $(".wpcf7-character-count", $form).each(function () {
      var $count = $(this);
      var name = $count.attr("data-target-name");
      var down = $count.hasClass("down");
      var starting = parseInt($count.attr("data-starting-value"), 10);
      var maximum = parseInt($count.attr("data-maximum-value"), 10);
      var minimum = parseInt($count.attr("data-minimum-value"), 10);
      var updateCount = function (target) {
        var $target = $(target);
        var length = $target.val().length;
        var count = down ? starting - length : length;
        $count.attr("data-current-value", count);
        $count.text(count);
        if (maximum && maximum < length) {
          $count.addClass("too-long");
        } else {
          $count.removeClass("too-long");
        }
        if (minimum && length < minimum) {
          $count.addClass("too-short");
        } else {
          $count.removeClass("too-short");
        }
      };
      $(':input[name="' + name + '"]', $form).each(function () {
        updateCount(this);
        $(this).keyup(function () {
          updateCount(this);
        });
      });
    });
    $form.on("change", ".wpcf7-validates-as-url", function () {
      var val = $.trim($(this).val());
      if (
        val &&
        !val.match(/^[a-z][a-z0-9.+-]*:/i) &&
        -1 !== val.indexOf(".")
      ) {
        val = val.replace(/^\/+/, "");
        val = "http://" + val;
      }
      $(this).val(val);
    });
  };
  wpcf7.submit = function (form) {
    if (typeof window.FormData !== "function") {
      return;
    }
    var $form = $(form);
    $(".ajax-loader", $form).addClass("is-active");
    wpcf7.clearResponse($form);
    var formData = new FormData($form.get(0));
    var detail = {
      id: $form.closest("div.wpcf7").attr("id"),
      status: "init",
      inputs: [],
      formData: formData,
    };
    $.each($form.serializeArray(), function (i, field) {
      if ("_wpcf7" == field.name) {
        detail.contactFormId = field.value;
      } else if ("_wpcf7_version" == field.name) {
        detail.pluginVersion = field.value;
      } else if ("_wpcf7_locale" == field.name) {
        detail.contactFormLocale = field.value;
      } else if ("_wpcf7_unit_tag" == field.name) {
        detail.unitTag = field.value;
      } else if ("_wpcf7_container_post" == field.name) {
        detail.containerPostId = field.value;
      } else if (field.name.match(/^_wpcf7_\w+_free_text_/)) {
        var owner = field.name.replace(/^_wpcf7_\w+_free_text_/, "");
        detail.inputs.push({ name: owner + "-free-text", value: field.value });
      } else if (field.name.match(/^_/)) {
      } else {
        detail.inputs.push(field);
      }
    });
    wpcf7.triggerEvent($form.closest("div.wpcf7"), "beforesubmit", detail);
    var ajaxSuccess = function (data, status, xhr, $form) {
      detail.id = $(data.into).attr("id");
      detail.status = data.status;
      detail.apiResponse = data;
      var $message = $(".wpcf7-response-output", $form);
      switch (data.status) {
        case "validation_failed":
          $.each(data.invalidFields, function (i, n) {
            $(n.into, $form).each(function () {
              wpcf7.notValidTip(this, n.message);
              $(".wpcf7-form-control", this).addClass("wpcf7-not-valid");
              $("[aria-invalid]", this).attr("aria-invalid", "true");
            });
          });
          $message.addClass("wpcf7-validation-errors");
          $form.addClass("invalid");
          wpcf7.triggerEvent(data.into, "invalid", detail);
          break;
        case "acceptance_missing":
          $message.addClass("wpcf7-acceptance-missing");
          $form.addClass("unaccepted");
          wpcf7.triggerEvent(data.into, "unaccepted", detail);
          break;
        case "spam":
          $message.addClass("wpcf7-spam-blocked");
          $form.addClass("spam");
          wpcf7.triggerEvent(data.into, "spam", detail);
          break;
        case "aborted":
          $message.addClass("wpcf7-aborted");
          $form.addClass("aborted");
          wpcf7.triggerEvent(data.into, "aborted", detail);
          break;
        case "mail_sent":
          $message.addClass("wpcf7-mail-sent-ok");
          $form.addClass("sent");
          wpcf7.triggerEvent(data.into, "mailsent", detail);
          break;
        case "mail_failed":
          $message.addClass("wpcf7-mail-sent-ng");
          $form.addClass("failed");
          wpcf7.triggerEvent(data.into, "mailfailed", detail);
          break;
        default:
          var customStatusClass =
            "custom-" + data.status.replace(/[^0-9a-z]+/i, "-");
          $message.addClass("wpcf7-" + customStatusClass);
          $form.addClass(customStatusClass);
      }
      wpcf7.refill($form, data);
      wpcf7.triggerEvent(data.into, "submit", detail);
      if ("mail_sent" == data.status) {
        $form.each(function () {
          this.reset();
        });
        wpcf7.toggleSubmit($form);
      }
      if (!wpcf7.supportHtml5.placeholder) {
        $form.find("[placeholder].placeheld").each(function (i, n) {
          $(n).val($(n).attr("placeholder"));
        });
      }
      $message.html("").append(data.message).slideDown("fast");
      $message.attr("role", "alert");
      $(".screen-reader-response", $form.closest(".wpcf7")).each(function () {
        var $response = $(this);
        $response.html("").attr("role", "").append(data.message);
        if (data.invalidFields) {
          var $invalids = $("<ul></ul>");
          $.each(data.invalidFields, function (i, n) {
            if (n.idref) {
              var $li = $("<li></li>").append(
                $("<a></a>")
                  .attr("href", "#" + n.idref)
                  .append(n.message)
              );
            } else {
              var $li = $("<li></li>").append(n.message);
            }
            $invalids.append($li);
          });
          $response.append($invalids);
        }
        $response.attr("role", "alert").focus();
      });
    };
    $.ajax({
      type: "POST",
      url: wpcf7.apiSettings.getRoute(
        "/contact-forms/" + wpcf7.getId($form) + "/feedback"
      ),
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false,
    })
      .done(function (data, status, xhr) {
        ajaxSuccess(data, status, xhr, $form);
        $(".ajax-loader", $form).removeClass("is-active");
      })
      .fail(function (xhr, status, error) {
        var $e = $('<div class="ajax-error"></div>').text(error.message);
        $form.after($e);
      });
  };
  wpcf7.triggerEvent = function (target, name, detail) {
    var $target = $(target);
    var event = new CustomEvent("wpcf7" + name, {
      bubbles: true,
      detail: detail,
    });
    $target.get(0).dispatchEvent(event);
    $target.trigger("wpcf7:" + name, detail);
    $target.trigger(name + ".wpcf7", detail);
  };
  wpcf7.toggleSubmit = function (form, state) {
    var $form = $(form);
    var $submit = $("input:submit", $form);
    if (typeof state !== "undefined") {
      $submit.prop("disabled", !state);
      return;
    }
    if ($form.hasClass("wpcf7-acceptance-as-validation")) {
      return;
    }
    $submit.prop("disabled", false);
    $(".wpcf7-acceptance", $form).each(function () {
      var $span = $(this);
      var $input = $("input:checkbox", $span);
      if (!$span.hasClass("optional")) {
        if (
          ($span.hasClass("invert") && $input.is(":checked")) ||
          (!$span.hasClass("invert") && !$input.is(":checked"))
        ) {
          $submit.prop("disabled", true);
          return false;
        }
      }
    });
  };
  wpcf7.notValidTip = function (target, message) {
    var $target = $(target);
    $(".wpcf7-not-valid-tip", $target).remove();
    $('<span role="alert" class="wpcf7-not-valid-tip"></span>')
      .text(message)
      .appendTo($target);
    if ($target.is(".use-floating-validation-tip *")) {
      var fadeOut = function (target) {
        $(target)
          .not(":hidden")
          .animate({ opacity: 0 }, "fast", function () {
            $(this).css({ "z-index": -100 });
          });
      };
      $target.on("mouseover", ".wpcf7-not-valid-tip", function () {
        fadeOut(this);
      });
      $target.on("focus", ":input", function () {
        fadeOut($(".wpcf7-not-valid-tip", $target));
      });
    }
  };
  wpcf7.refill = function (form, data) {
    var $form = $(form);
    var refillCaptcha = function ($form, items) {
      $.each(items, function (i, n) {
        $form.find(':input[name="' + i + '"]').val("");
        $form.find("img.wpcf7-captcha-" + i).attr("src", n);
        var match = /([0-9]+)\.(png|gif|jpeg)$/.exec(n);
        $form
          .find('input:hidden[name="_wpcf7_captcha_challenge_' + i + '"]')
          .attr("value", match[1]);
      });
    };
    var refillQuiz = function ($form, items) {
      $.each(items, function (i, n) {
        $form.find(':input[name="' + i + '"]').val("");
        $form
          .find(':input[name="' + i + '"]')
          .siblings("span.wpcf7-quiz-label")
          .text(n[0]);
        $form
          .find('input:hidden[name="_wpcf7_quiz_answer_' + i + '"]')
          .attr("value", n[1]);
      });
    };
    if (typeof data === "undefined") {
      $.ajax({
        type: "GET",
        url: wpcf7.apiSettings.getRoute(
          "/contact-forms/" + wpcf7.getId($form) + "/refill"
        ),
        beforeSend: function (xhr) {
          var nonce = $form.find(':input[name="_wpnonce"]').val();
          if (nonce) {
            xhr.setRequestHeader("X-WP-Nonce", nonce);
          }
        },
        dataType: "json",
      }).done(function (data, status, xhr) {
        if (data.captcha) {
          refillCaptcha($form, data.captcha);
        }
        if (data.quiz) {
          refillQuiz($form, data.quiz);
        }
      });
    } else {
      if (data.captcha) {
        refillCaptcha($form, data.captcha);
      }
      if (data.quiz) {
        refillQuiz($form, data.quiz);
      }
    }
  };
  wpcf7.clearResponse = function (form) {
    var $form = $(form);
    $form.removeClass("invalid spam sent failed");
    $form.siblings(".screen-reader-response").html("").attr("role", "");
    $(".wpcf7-not-valid-tip", $form).remove();
    $("[aria-invalid]", $form).attr("aria-invalid", "false");
    $(".wpcf7-form-control", $form).removeClass("wpcf7-not-valid");
    $(".wpcf7-response-output", $form)
      .hide()
      .empty()
      .removeAttr("role")
      .removeClass(
        "wpcf7-mail-sent-ok wpcf7-mail-sent-ng wpcf7-validation-errors wpcf7-spam-blocked"
      );
  };
  wpcf7.apiSettings.getRoute = function (path) {
    var url = wpcf7.apiSettings.root;
    url = url.replace(
      wpcf7.apiSettings.namespace,
      wpcf7.apiSettings.namespace + path
    );
    return url;
  };
})(jQuery);
(function () {
  if (typeof window.CustomEvent === "function") return false;
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();
!(function (o, e, t, _) {
  (o.imageMapProShapeDefaults = {
    id: "spot-0",
    title: "",
    type: "spot",
    x: -1,
    y: -1,
    width: 44,
    height: 44,
    x_image_background: -1,
    y_image_background: -1,
    width_image_background: 44,
    height_image_background: 44,
    connected_to: "",
    use_connected_shape_tooltip: 0,
    layerID: 0,
    static: 0,
    text: {
      text: "Text",
      font_family: "sans-serif",
      font_size: 16,
      font_weight: 400,
      text_color: "#000000",
      text_opacity: 1,
    },
    actions: {
      click: "no-action",
      link: "#",
      open_link_in_new_window: 1,
      script: "",
    },
    default_style: {
      opacity: 1,
      border_radius: 50,
      background_type: "color",
      background_image_url: "",
      background_image_opacity: 1,
      background_image_scale: 1,
      background_image_offset_x: 0,
      background_image_offset_y: 0,
      background_color: "#000000",
      background_opacity: 0.4,
      border_width: 0,
      border_style: "solid",
      border_color: "#ffffff",
      border_opacity: 1,
      stroke_color: "#ffffff",
      stroke_opacity: 0.75,
      stroke_width: 0,
      stroke_dasharray: "0",
      stroke_linecap: "round",
      use_icon: 1,
      icon_type: "library",
      icon_svg_path:
        "M409.81,160.113C409.79,71.684,338.136,0,249.725,0C161.276,0,89.583,71.684,89.583,160.113     c0,76.325,119.274,280.238,151.955,334.638c1.72,2.882,4.826,4.641,8.178,4.641c3.351,0,6.468-1.759,8.168-4.631     C290.545,440.361,409.81,236.438,409.81,160.113z M249.716,283.999c-68.303,0-123.915-55.573-123.915-123.895     c0-68.313,55.592-123.895,123.915-123.895s123.876,55.582,123.876,123.895S318.029,283.999,249.716,283.999z",
      icon_svg_viewbox: "0 0 499.392 499.392",
      icon_fontawesome_id: "map-marker",
      icon_fill: "#000000",
      icon_url: "",
      icon_is_pin: 1,
      icon_shadow: 0,
    },
    mouseover_style: {
      opacity: 1,
      border_radius: 50,
      background_image_url: "",
      background_image_opacity: 1,
      background_image_scale: 1,
      background_image_offset_x: 0,
      background_image_offset_y: 0,
      background_color: "#ffffff",
      background_opacity: 0.4,
      border_width: 0,
      border_style: "solid",
      border_color: "#ffffff",
      border_opacity: 1,
      stroke_color: "#ffffff",
      stroke_opacity: 0.75,
      stroke_width: 0,
      stroke_dasharray: "0",
      stroke_linecap: "round",
      icon_fill: "#000000",
    },
    tooltip: { enable_tooltip: 1 },
    tooltip_style: {
      buffer: 40,
      border_radius: 10,
      padding: 15,
      background_color: "#222222",
      background_opacity: 1,
      position: "top",
      width: 225,
      auto_width: 1,
      offset_x: 0,
      offset_y: 0,
    },
    tooltip_content: {
      squares_settings: {
        containers: [
          {
            id: "sq-container-403761",
            settings: {
              elements: [
                {
                  settings: { name: "Heading", iconClass: "fa fa-header" },
                  options: { heading: { text: "My Shape" } },
                },
              ],
            },
          },
        ],
      },
    },
    points: [],
    vs: [],
    svgPathCommands: [],
    d: "",
    dEditor: "",
  }),
    (o.imageMapProEditorDefaults = {
      id: 0,
      editor: {
        previewMode: 0,
        selected_shape: -1,
        transform_tooltip_mode: 0,
        tool: "spot",
        zoom: 1,
        currentLayer: 0,
        state: { dragging: !1 },
        shapeCounter: {
          spots: 0,
          rects: 0,
          ovals: 0,
          polys: 0,
          texts: 0,
          paths: 0,
        },
      },
      runtime: {
        is_fullscreen: 0,
        layerID: 0,
        menu_search_string: "",
        menu_scroll: 0,
      },
      general: {
        name: "",
        shortcode: "",
        width: 800,
        height: 450,
        naturalWidth: 800,
        naturalHeight: 450,
        responsive: 1,
        preserve_quality: 1,
        center_image_map: 0,
      },
      image: { url: "" },
      fullscreen: {
        enable_fullscreen_mode: 0,
        start_in_fullscreen_mode: 0,
        fullscreen_background: "#000000",
        fullscreen_button_position: 1,
        fullscreen_button_type: "icon_and_text",
        fullscreen_button_color: "#ffffff",
        fullscreen_button_text_color: "#222222",
      },
      shapes: {
        pageload_animation: "none",
        glowing_shapes: 0,
        glowing_shapes_color: "#ffffff",
        glow_opacity: 0.5,
        stop_glowing_on_mouseover: 1,
      },
      tooltips: {
        enable_tooltips: 1,
        show_tooltips: "mouseover",
        show_title_on_mouseover: 0,
        sticky_tooltips: 0,
        constrain_tooltips: 1,
        tooltip_animation: "none",
        fullscreen_tooltips: "mobile-only",
      },
      zooming: {
        enable_zooming: 0,
        max_zoom: 16,
        limit_max_zoom_to_image_size: 0,
        enable_zoom_buttons: 1,
        enable_navigator: 1,
        zoom_button_text_color: "#000000",
        zoom_button_background_color: "#ffffff",
        hold_ctrl_to_zoom: 1,
      },
      layers: { enable_layers: 0, layers_list: [] },
      shapes_menu: {
        enable_shapes_menu: 0,
        detached_menu: 0,
        menu_position: "left",
        enable_search: 1,
        group_by_floor: 0,
        hide_children_of_connected_shapes: 1,
      },
      custom_code: { custom_css: "", custom_js: "" },
      spots: [],
    });
})(jQuery, window, document);
!(function (t, e, s, i) {
  var o = new Array();
  function n(t) {
    (this.settings = t), (this.containers = []), this.init();
  }
  function r(t) {
    (this.settings = t), (this.elements = []), this.init();
  }
  (t.squaresRendererRegisterElement = function (t) {
    o[t.name] = t;
  }),
    (t.squaresRendererRenderObject = function (t) {
      if ("object" != typeof t)
        try {
          t = JSON.parse(t);
        } catch (e) {
          return (
            console.log(e),
            console.log("Squares renderer failed to parse JSON: "),
            console.log(t),
            ""
          );
        }
      return new n(t).render();
    }),
    (n.prototype.init = function () {
      for (var t = 0; t < this.settings.containers.length; t++)
        this.containers[t] = new r(this.settings.containers[t]);
    }),
    (n.prototype.render = function () {
      for (var t = "", e = 0; e < this.containers.length; e++)
        t += this.containers[e].render();
      return t;
    }),
    (r.prototype.init = function () {
      if (this.settings.settings)
        for (var t = 0; t < this.settings.settings.elements.length; t++)
          this.elements[t] = new l(this.settings.settings.elements[t]);
    }),
    (r.prototype.render = function () {
      var t = "";
      if (((t += '<div class="squares-container">'), this.settings.settings))
        for (var e = 0; e < this.settings.settings.elements.length; e++)
          t += this.elements[e].render();
      return (t += '\t<div class="squares-clear"></div>'), (t += "</div>");
    });
  var a = {
    layout: {
      box_model: {
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
        padding: { top: 10, bottom: 10, left: 10, right: 10 },
      },
      use_grid: 1,
      column_span: {
        xs: { use: 0, class: "sq-col-xs-12", visible: 0 },
        sm: { use: 0, class: "sq-col-sm-12", visible: 0 },
        md: { use: 0, class: "sq-col-md-12", visible: 1 },
        lg: { use: 1, class: "sq-col-lg-12", visible: 1 },
      },
      width: "100",
      auto_width: 1,
      height: "100",
      auto_height: 1,
    },
    style: {
      background_color: "#ffffff",
      background_opacity: "0",
      opacity: "1",
      box_shadow: "none",
      border_width: "0",
      border_style: "none",
      border_color: "#000000",
      border_opacity: "1",
      border_radius: "0",
    },
    font: {
      font_family: "sans-serif",
      font_size: "14",
      font_weight: "normal",
      font_style: "normal",
      line_height: "22",
      text_color: "#ffffff",
      text_align: "left",
      text_decoration: "none",
      text_transform: "none",
      text_shadow: "",
    },
    general: { id: "", classes: "", css: "" },
  };
  function l(e) {
    (this.settings = e.settings),
      (this.defaults = t.extend(!0, {}, a)),
      (this.elementSpecificDefaults = {}),
      (this.options = i),
      this.init(e);
  }
  function d(t) {
    var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
    return e
      ? { r: parseInt(e[1], 16), g: parseInt(e[2], 16), b: parseInt(e[3], 16) }
      : { r: 0, g: 0, b: 0 };
  }
  (l.prototype.init = function (e) {
    if (this.settings) {
      var s = t.extend(!0, {}, o[this.settings.name].controls);
      for (var i in s) {
        var n = s[i];
        for (var r in ((this.elementSpecificDefaults[i] = {}), n)) {
          var a = n[r];
          this.elementSpecificDefaults[i][r] = a.default;
        }
      }
      (this.defaults = t.extend(
        !0,
        {},
        this.defaults,
        this.elementSpecificDefaults
      )),
        (this.options = t.extend(!0, {}, this.defaults, e.options));
    }
  }),
    (l.prototype.render = function () {
      if (this.settings) {
        var t = "";
        return (
          (t +=
            '<div class="squares-element ' +
            this.generateLayoutClass(this.options.layout) +
            '" style="' +
            this.generateCSS(this.options) +
            '">'),
          (t += o[this.settings.name].render(this.options)),
          (t += "</div>")
        );
      }
    }),
    (l.prototype.generateLayoutClass = function () {
      if (this.settings) {
        var t = this.options.layout;
        if (1 == parseInt(t.use_grid, 10)) {
          var e = "",
            s = t.column_span;
          return (
            1 == parseInt(s.xs.use, 10) &&
              ((e += s.xs.class + " "),
              0 == parseInt(s.xs.visible, 10) && (e += "sq-hidden-sm ")),
            1 == parseInt(s.sm.use, 10) &&
              ((e += s.sm.class + " "),
              0 == parseInt(s.sm.visible, 10) && (e += "sq-hidden-md ")),
            1 == parseInt(s.md.use, 10) &&
              ((e += s.md.class + " "),
              0 == parseInt(s.md.visible, 10) && (e += "sq-hidden-lg ")),
            1 == parseInt(s.lg.use, 10) &&
              ((e += s.lg.class + " "),
              0 == parseInt(s.lg.visible, 10) && (e += "sq-hidden-xl ")),
            e
          );
        }
        return "";
      }
    }),
    (l.prototype.generateCSS = function () {
      if (this.settings) {
        var t = "";
        (t +=
          "margin-top: " +
          (s = this.options.layout).box_model.margin.top +
          "px; "),
          (t += "margin-bottom: " + s.box_model.margin.bottom + "px; "),
          (t += "margin-left: " + s.box_model.margin.left + "px; "),
          (t += "margin-right: " + s.box_model.margin.right + "px; "),
          (t += "padding-top: " + s.box_model.padding.top + "px; "),
          (t += "padding-bottom: " + s.box_model.padding.bottom + "px; "),
          (t += "padding-left: " + s.box_model.padding.left + "px; "),
          (t += "padding-right: " + s.box_model.padding.right + "px; "),
          1 == parseInt(s.use_grid, 10) ||
            (1 == parseInt(s.auto_width, 10)
              ? (t += "width: auto; ")
              : "" === s.width ||
                isNaN(s.width) ||
                (t += "width: " + s.width + "px; "),
            1 == parseInt(s.auto_height, 10)
              ? (t += "height: auto; ")
              : "" === s.height ||
                isNaN(s.height) ||
                (t += "height: " + s.height + "px; "));
        var e,
          s = this.options.font;
        if (
          ((this.options.fontStyles = ""),
          s &&
            ((t += "font-family: " + s.font_family + "; "),
            (this.options.fontStyles += "font-family: " + s.font_family + "; "),
            (t += "font-size: " + s.font_size + "px; "),
            (this.options.fontStyles += "font-size: " + s.font_size + "px; "),
            (t += "font-weight: " + s.font_weight + "; "),
            (this.options.fontStyles += "font-weight: " + s.font_weight + "; "),
            (t += "font-style: " + s.font_style + "; "),
            (this.options.fontStyles += "font-style: " + s.font_style + "; "),
            (t += "line-height: " + s.line_height + "px; "),
            (this.options.fontStyles +=
              "line-height: " + s.line_height + "px; "),
            (t += "color: " + s.text_color + "; "),
            (this.options.fontStyles += "color: " + s.text_color + "; "),
            (t += "text-align: " + s.text_align + "; "),
            (this.options.fontStyles += "text-align: " + s.text_align + "; "),
            (t += "text-decoration: " + s.text_decoration + "; "),
            (this.options.fontStyles +=
              "text-decoration: " + s.text_decoration + "; "),
            (t += "text-transform: " + s.text_transform + "; "),
            (this.options.fontStyles +=
              "text-transform: " + s.text_transform + "; "),
            (t += "text-shadow: " + s.text_shadow + "; "),
            (this.options.fontStyles +=
              "text-shadow: " + s.text_shadow + "; ")),
          (s = this.options.style))
        )
          (t +=
            "background-color: rgba(" +
            (e = d(s.background_color)).r +
            ", " +
            e.g +
            ", " +
            e.b +
            ", " +
            s.background_opacity +
            "); "),
            (t += "opacity: " + s.opacity + "; "),
            (t += "box-shadow: " + s.box_shadow + "; "),
            (t += "border-width: " + s.border_width + "px; "),
            (t += "border-style: " + s.border_style + "; "),
            (t +=
              "border-color: rgba(" +
              (e = d(s.border_color)).r +
              ", " +
              e.g +
              ", " +
              e.b +
              ", " +
              s.border_opacity +
              "); "),
            (t += "border-radius: " + s.border_radius + "px; ");
        return t;
      }
    });
})(jQuery, window, document);
!(function (e, t, a, l) {
  var s = {
    name: "Paragraph",
    iconClass: "fa fa-paragraph",
    controls: {
      text: {
        text: {
          name: "Text",
          type: "textarea",
          default: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        },
      },
    },
    controlGroupIcons: { text: "fa fa-ellipsis-h" },
    content: function () {
      var e = this.controls.text.text.getVal();
      return (
        (e = (e = e.replace(/\\(.)/gm, "$1")).replace(/\n/gm, "<br>")),
        '<p id="' +
          this.controls.general.id.getVal() +
          '" style="' +
          this.controls.general.css.getVal() +
          this.fontStyles +
          ' margin: 0; padding: 0;" class="' +
          this.controls.general.classes.getVal() +
          '">' +
          e +
          "</p>"
      );
    },
    render: function (e) {
      var t = e.text.text;
      return (
        (t = (t = t.replace(/\\(.)/gm, "$1")).replace(/\n/gm, "<br>")),
        '<p id="' +
          e.general.id +
          '" style="' +
          e.general.css +
          e.fontStyles +
          ' margin: 0; padding: 0;" class="' +
          e.general.classes +
          '">' +
          t +
          "</p>"
      );
    },
  };
  e.squaresRegisterElement && e.squaresRegisterElement(s),
    e.squaresRendererRegisterElement(s);
  var o = {
    name: "Heading",
    iconClass: "fa fa-header",
    controls: {
      heading: {
        text: { name: "Text", type: "text", default: "Lorem Ipsum" },
        heading: {
          name: "Heading",
          type: "select",
          options: ["h1", "h2", "h3"],
          default: "h3",
        },
      },
    },
    controlGroupIcons: { heading: "fa fa-header" },
    content: function () {
      return (
        "<" +
        this.controls.heading.heading.getVal() +
        ' id="' +
        this.controls.general.id.getVal() +
        '" style="' +
        this.controls.general.css.getVal() +
        this.fontStyles +
        ' margin: 0; padding: 0;" class="' +
        this.controls.general.classes.getVal() +
        '">' +
        this.controls.heading.text.getVal() +
        "</" +
        this.controls.heading.heading.getVal() +
        ">"
      );
    },
    render: function (e) {
      return (
        "<" +
        e.heading.heading +
        ' id="' +
        e.general.id +
        '" style="' +
        e.general.css +
        e.fontStyles +
        ' margin: 0; padding: 0;" class="' +
        e.general.classes +
        '">' +
        e.heading.text +
        "</" +
        e.heading.heading +
        ">"
      );
    },
  };
  e.squaresRegisterElement && e.squaresRegisterElement(o),
    e.squaresRendererRegisterElement(o);
  var n = {
    name: "Image",
    iconClass: "fa fa-camera",
    controls: {
      image: {
        url: {
          name: "Image URL",
          type: "text",
          default: "https://webcraftplugins.com/uploads/placeholder_image.png",
        },
        image_is_a_link: {
          name: "Image is a Link",
          type: "switch",
          default: 0,
        },
        link_to: { name: "Link to", type: "text", default: "#" },
      },
    },
    controlGroupIcons: { image: "fa fa-camera" },
    useFontControls: !1,
    content: function () {
      var e = "";
      1 == parseInt(this.controls.image.image_is_a_link.getVal(), 10) &&
        (e += '<a href="' + this.controls.image.link_to.getVal() + '">'),
        (e +=
          '<img src="' +
          this.controls.image.url.getVal() +
          '" id="' +
          this.controls.general.id.getVal() +
          '" style="' +
          this.controls.general.css.getVal() +
          '" class="' +
          this.controls.general.classes.getVal() +
          '">'),
        1 == parseInt(this.controls.image.image_is_a_link.getVal(), 10) &&
          (e += "</a>");
      var t = new Image();
      function a() {}
      return (
        (t.src = this.controls.image.url.getVal()),
        t.complete || t.addEventListener("load", a),
        e
      );
    },
    render: function (t) {
      var l = "";
      1 == parseInt(t.image.image_is_a_link, 10) &&
        (l += '<a href="' + t.image.link_to + '">'),
        (l +=
          '<img src="' +
          t.image.url +
          '" id="' +
          t.general.id +
          '" style="' +
          t.general.css +
          '" class="' +
          t.general.classes +
          '">'),
        1 == parseInt(t.image.image_is_a_link, 10) && (l += "</a>");
      var s = new Image();
      function o() {
        e(a).trigger("squares_image_loaded");
      }
      return (
        (s.src = t.image.url),
        s.complete ? o() : s.addEventListener("load", o),
        l
      );
    },
  };
  e.squaresRegisterElement && e.squaresRegisterElement(n),
    e.squaresRendererRegisterElement(n);
  var r = {
    name: "Video",
    iconClass: "fa fa-video-camera",
    controls: {
      video: {
        mp4_url: {
          name: "MP4 URL",
          type: "text",
          default: "http://webcraftplugins.com/uploads/example_video.mp4",
        },
        webm_url: {
          name: "WEBM URL",
          type: "text",
          default: "http://webcraftplugins.com/uploads/example_video.webm",
        },
        ogv_url: {
          name: "OGV URL",
          type: "text",
          default: "http://webcraftplugins.com/uploads/example_video.ogv",
        },
        video_is_a_link: {
          name: "Video is a Link",
          type: "switch",
          default: 0,
        },
        link_to: { name: "Link to", type: "text", default: "#" },
        autoplay: { name: "Autoplay", type: "switch", default: 0 },
        loop: { name: "Loop", type: "switch", default: 0 },
        controls: { name: "Controls", type: "switch", default: 0 },
      },
    },
    useFontControls: !1,
    controlGroupIcons: { video: "fa fa-video-camera" },
    content: function () {
      var e = "";
      1 == parseInt(this.controls.video.video_is_a_link.getVal(), 10) &&
        (e += '<a href="' + this.controls.video.link_to.getVal() + '">');
      var t = "";
      return (
        1 == parseInt(this.controls.video.autoplay.getVal(), 10) &&
          (t += " autoplay "),
        1 == parseInt(this.controls.video.loop.getVal(), 10) && (t += " loop "),
        1 == parseInt(this.controls.video.controls.getVal(), 10) &&
          (t += " controls "),
        (e +=
          "<video " +
          t +
          ' id="' +
          this.controls.general.id.getVal() +
          '" style="' +
          this.controls.general.css.getVal() +
          '" class="' +
          this.controls.general.classes.getVal() +
          '"><source src="' +
          this.controls.video.mp4_url.getVal() +
          '" type="video/mp4"><source src="' +
          this.controls.video.webm_url.getVal() +
          '" type="video/webm"><source src="' +
          this.controls.video.ogv_url.getVal() +
          '" type="video/ogv"></video>'),
        1 == parseInt(this.controls.video.video_is_a_link.getVal(), 10) &&
          (e += "</a>"),
        e
      );
    },
    render: function (e) {
      var t = "";
      1 == parseInt(e.video.video_is_a_link, 10) &&
        (t += '<a href="' + e.video.link_to + '">');
      var a = "";
      return (
        1 == parseInt(e.video.autoplay, 10) && (a += " autoplay "),
        1 == parseInt(e.video.loop, 10) && (a += " loop "),
        1 == parseInt(e.video.controls, 10) && (a += " controls "),
        (t +=
          "<video " +
          a +
          ' id="' +
          e.general.id +
          '" style="' +
          e.general.css +
          '" class="' +
          e.general.classes +
          '"><source src="' +
          e.video.mp4_url +
          '" type="video/mp4"><source src="' +
          e.video.webm_url +
          '" type="video/webm"><source src="' +
          e.video.ogv_url +
          '" type="video/ogv"></video>'),
        1 == parseInt(e.video.video_is_a_link, 10) && (t += "</a>"),
        t
      );
    },
  };
  e.squaresRegisterElement && e.squaresRegisterElement(r),
    e.squaresRendererRegisterElement(r);
  var i = {
    name: "YouTube",
    iconClass: "fa fa-youtube",
    useStyleControls: !1,
    useFontControls: !1,
    controls: {
      youtube: {
        embed_code: {
          name: "Embed Code",
          type: "textarea",
          default:
            '<iframe width="560" height="315" src="https://www.youtube.com/embed/6NC_ODHu5jg" frameborder="0" allowfullscreen></iframe>',
        },
        allow_fullscreen: {
          name: "Allow Fullscreen",
          type: "switch",
          default: 1,
        },
        iframe_width: { name: "iframe Width", type: "int", default: 320 },
        iframe_auto_width: {
          name: "iframe Auto Width",
          type: "switch",
          default: 1,
        },
        iframe_height: { name: "iframe Height", type: "int", default: 320 },
      },
    },
    controlGroupIcons: { youtube: "fa fa-youtube" },
    content: function () {
      var e = this.controls.youtube.embed_code.getVal(),
        t = "";
      return (
        (t +=
          '<div id="' +
          this.controls.general.id.getVal() +
          '" style="' +
          this.controls.general.css.getVal() +
          '" class="' +
          this.controls.general.classes.getVal() +
          '">'),
        (e = e.replace("allowfullscreen", "")),
        1 == parseInt(this.controls.youtube.allow_fullscreen.getVal(), 10) &&
          -1 == e.indexOf("allowfullscreen") &&
          (e = e.replace("></iframe>", " allowfullscreen></iframe>")),
        (t += e = (e =
          1 == parseInt(this.controls.youtube.iframe_auto_width.getVal(), 10)
            ? e.replace(/width="\d+"/g, 'width="100%"')
            : e.replace(
                /width="\d+"/g,
                'width="' + this.controls.youtube.iframe_width.getVal() + 'px"'
              )).replace(
          /height="\d+"/g,
          'height="' + this.controls.youtube.iframe_height.getVal() + 'px"'
        )),
        (t += "</div>")
      );
    },
    render: function (e) {
      var t = e.youtube.embed_code,
        a = "";
      return (
        (a +=
          '<div id="' +
          e.general.id +
          '" style="' +
          e.general.css +
          '" class="' +
          e.general.classes +
          '">'),
        (t = t.replace("allowfullscreen", "")),
        1 == parseInt(e.youtube.allow_fullscreen, 10) &&
          -1 == t.indexOf("allowfullscreen") &&
          (t = t.replace("></iframe>", " allowfullscreen></iframe>")),
        (a += t = (t =
          1 == parseInt(e.youtube.iframe_auto_width, 10)
            ? t.replace(/width="\d+"/g, 'width="100%"')
            : t.replace(
                /width="\d+"/g,
                'width="' + e.youtube.iframe_width + 'px"'
              )).replace(
          /height="\d+"/g,
          'height="' + e.youtube.iframe_height + 'px"'
        )),
        (a += "</div>")
      );
    },
  };
  e.squaresRegisterElement && e.squaresRegisterElement(i),
    e.squaresRendererRegisterElement(i);
  var c = {
    name: "Button",
    iconClass: "fa fa-link",
    controls: {
      button: {
        text: { name: "Text", type: "text", default: "Button" },
        link_to: { name: "Link to", type: "text", default: "#" },
        new_tab: { name: "Open in New Tab", type: "switch", default: 0 },
        display: {
          name: "Display",
          type: "button group",
          options: ["inline-block", "block"],
          default: "inline-block",
        },
        height: { name: "Height", type: "int", default: 44 },
        bg_color: {
          name: "Background Color",
          type: "color",
          default: "#2196f3",
        },
        text_color: { name: "Text Color", type: "color", default: "#ffffff" },
        border_radius: { name: "Border Radius", type: "int", default: 10 },
        padding: { name: "Padding Left/Right", type: "int", default: 20 },
      },
    },
    controlGroupIcons: { button: "fa fa-link" },
    content: function () {
      var e = "";
      (e += "display: " + this.controls.button.display.getVal() + "; "),
        (e += "height: " + this.controls.button.height.getVal() + "px; "),
        (e += "line-height: " + this.controls.button.height.getVal() + "px; "),
        (e +=
          "background-color: " + this.controls.button.bg_color.getVal() + "; "),
        (e += "color: " + this.controls.button.text_color.getVal() + "; "),
        (e +=
          "border-radius: " +
          this.controls.button.border_radius.getVal() +
          "px; "),
        (e +=
          "padding-left: " + this.controls.button.padding.getVal() + "px; "),
        (e +=
          "padding-right: " + this.controls.button.padding.getVal() + "px; ");
      var t = "";
      return (
        1 == parseInt(this.controls.button.new_tab.getVal(), 10) &&
          (t = 'target="_blank"'),
        '<div id="' +
          this.controls.general.id.getVal() +
          '" style="' +
          this.controls.general.css.getVal() +
          '" class="' +
          this.controls.general.classes.getVal() +
          '"><a href="' +
          this.controls.button.link_to.getVal() +
          '" style="' +
          e +
          '" ' +
          t +
          ' class="squares-button">' +
          this.controls.button.text.getVal() +
          "</a></div>"
      );
    },
    render: function (e) {
      var t = "";
      (t += "display: " + e.button.display + "; "),
        (t += "height: " + e.button.height + "px; "),
        (t += "line-height: " + e.button.height + "px; "),
        (t += "background-color: " + e.button.bg_color + "; "),
        (t += "color: " + e.button.text_color + "; "),
        (t += "border-radius: " + e.button.border_radius + "px; "),
        (t += "padding-left: " + e.button.padding + "px; "),
        (t += "padding-right: " + e.button.padding + "px; ");
      var a = "";
      return (
        1 == parseInt(e.button.new_tab, 10) && (a = 'target="_blank"'),
        '<div id="' +
          e.general.id +
          '" style="' +
          e.general.css +
          '" class="' +
          e.general.classes +
          '"><a href="' +
          e.button.link_to +
          '" style="' +
          t +
          '" ' +
          a +
          ' class="squares-button">' +
          e.button.text +
          "</a></div>"
      );
    },
  };
  e.squaresRegisterElement && e.squaresRegisterElement(c),
    e.squaresRendererRegisterElement(c);
})(jQuery, window, document);
!(function ($, window, document, undefined) {
  "use strict";
  var fullscreenMap = undefined,
    fullscreenMapParent = undefined,
    touch = !1;
  ($.imageMapProInitialized = function (t) {}),
    ($.imageMapProEventHighlightedShape = function (t, i) {}),
    ($.imageMapProEventUnhighlightedShape = function (t, i) {}),
    ($.imageMapProEventClickedShape = function (t, i) {}),
    ($.imageMapProEventOpenedTooltip = function (t, i) {}),
    ($.imageMapProEventClosedTooltip = function (t, i) {}),
    ($.imageMapProEventSwitchedFloor = function (t, i) {}),
    ($.imageMapProHighlightShape = function (t, i) {
      var e = findImageMapWithName(t);
      if (e) {
        var s = findShapeWithTitle(e.settings.general.name, i);
        if (s) {
          var n = s.shape,
            a = s.index;
          if (
            (-1 == e.apiHighlightedShapes.indexOf(a) &&
              e.apiHighlightedShapes.push(a),
            e.connectedShapes[n.id])
          )
            for (var o = 0; o < e.connectedShapes[n.id].length; o++) {
              var h = e.connectedShapes[n.id][o].index;
              -1 == e.apiHighlightedShapes.indexOf(h) &&
                e.apiHighlightedShapes.push(h);
            }
          APIFunctionQueueAddAction(function (t) {
            e.highlightShape(a), t();
          });
        }
      }
    }),
    ($.imageMapProUnhighlightShape = function (t, i) {
      var e = findImageMapWithName(t);
      if (e) {
        var s = findShapeWithTitle(e.settings.general.name, i);
        if (s) {
          var n = s.shape,
            a = s.index;
          if (-1 != e.apiHighlightedShapes.indexOf(a)) {
            var o = e.apiHighlightedShapes.indexOf(a);
            e.apiHighlightedShapes.splice(o, 1);
          }
          if (e.connectedShapes[n.id])
            for (var h = 0; h < e.connectedShapes[n.id].length; h++) {
              var r = e.connectedShapes[n.id][h].index,
                l = e.apiHighlightedShapes.indexOf(r);
              e.apiHighlightedShapes.splice(l, 1),
                APIFunctionQueueAddAction(function (t) {
                  e.unhighlightShape(r), t();
                });
            }
          APIFunctionQueueAddAction(function (t) {
            e.unhighlightShape(a), t();
          });
        }
      }
    }),
    ($.imageMapProFocusShape = function (t, i) {
      var e = findImageMapWithName(t);
      if (e) {
        var s = findShapeWithTitle(e.settings.general.name, i);
        if (s) {
          var n = s.shape,
            a = s.index;
          n.layerID != e.settings.runtime.layerID &&
            APIFunctionQueueAddAction(function (t) {
              e.switchLayer(n.layerID, function () {
                t();
              });
            }),
            APIFunctionQueueAddAction(function (t) {
              e.focusShape(a), t();
            }),
            APIFunctionQueueAddAction(function (t) {
              e.highlightShape(a), t();
            });
        }
      }
    }),
    ($.imageMapProOpenTooltip = function (t, i) {
      var e = findImageMapWithName(t);
      if (e) {
        var s = findShapeWithTitle(e.settings.general.name, i);
        if (s) {
          s.shape;
          var n = s.index;
          APIFunctionQueueAddAction(function (t) {
            e.showTooltip(n), t();
          }),
            APIFunctionQueueAddAction(function (t) {
              e.updateTooltipPosition(n), t();
            }),
            -1 == e.apiOpenedTooltips.indexOf(n) && e.apiOpenedTooltips.push(n);
        }
      }
    }),
    ($.imageMapProHideTooltip = function (t, i) {
      var e = findImageMapWithName(t);
      if (e) {
        var s = findShapeWithTitle(e.settings.general.name, i);
        if (s) {
          s.shape;
          var n = s.index;
          if (-1 != e.apiOpenedTooltips.indexOf(n)) {
            var a = e.apiOpenedTooltips.indexOf(n);
            e.apiOpenedTooltips.splice(a, 1);
          }
          APIFunctionQueueAddAction(function (t) {
            e.hideTooltip(n), t();
          });
        }
      }
    }),
    ($.imageMapProReInitMap = function (t) {
      var i = findImageMapWithName(t);
      i && i.init();
    }),
    ($.imageMapProIsMobile = function () {
      return isMobile();
    }),
    ($.imageMapProGoToFloor = function (t, i) {
      var e = findImageMapWithName(t);
      if (e) {
        for (var s = 0, n = 0; n < e.settings.layers.layers_list.length; n++)
          e.settings.layers.layers_list[n].title == i &&
            (s = e.settings.layers.layers_list[n].id);
        APIFunctionQueueAddAction(function (t) {
          e.switchLayer(s), t();
        });
      }
    }),
    ($.imageMapProZoomIn = function (t) {
      var i = findImageMapWithName(t);
      i && i.zoomIn();
    }),
    ($.imageMapProZoomOut = function (t) {
      var i = findImageMapWithName(t);
      i && i.zoomOut();
    });
  var APIFunctionQueue = [];
  function findShapeWithTitle(t, i) {
    var e = $('[data-shape-title="' + i + '"]').data("index"),
      s = instances[t].settings.spots[e];
    if (!s) {
      for (var n = 0; n < instances[t].settings.spots.length; n++)
        instances[t].settings.spots[n].title == i &&
          ((s = instances[t].settings.spots[n]), (e = n));
      if (!s)
        return (
          console.log("Error: Could not find shape with name: " + i), undefined
        );
    }
    return { shape: s, index: e };
  }
  function findImageMapWithName(t) {
    for (var i in instances)
      if (instances[i].settings.general.name == t) return instances[i];
    for (var i in (console.log(
      'Image map with name "' +
        t +
        '" not found, returning the first found image map instead.'
    ),
    instances))
      return instances[i];
    return console.log("Error: No image maps found!"), undefined;
  }
  function APIFunctionQueueAddAction(t) {
    var i = APIFunctionQueue.length;
    APIFunctionQueue.push(t), 0 == i && APIFunctionQueuePopAction();
  }
  function APIFunctionQueuePopAction() {
    APIFunctionQueue[0](function () {
      APIFunctionQueue.shift(),
        APIFunctionQueue.length > 0 && APIFunctionQueuePopAction();
    });
  }
  $(document).ready(function () {
    $(document).on(
      "mouseover",
      "[data-imp-highlight-shape-on-mouseover]",
      function () {
        var t = $(this).data("imp-highlight-shape-on-mouseover"),
          i = findImageMapWithName($(this).data("imp-image-map-name"));
        if (i) {
          var e = findShapeWithTitle(i.settings.general.name, t);
          if (e) {
            e.shape;
            var s = e.index;
            APIFunctionQueueAddAction(function (t) {
              i.highlightShape(s, !0), t();
            });
          }
        }
      }
    ),
      $(document).on(
        "mouseout",
        "[data-imp-highlight-shape-on-mouseover]",
        function () {
          var t = $(this).data("imp-highlight-shape-on-mouseover"),
            i = findImageMapWithName($(this).data("imp-image-map-name"));
          if (i) {
            var e = findShapeWithTitle(i.settings.general.name, t);
            if (e) {
              e.shape, e.index;
              APIFunctionQueueAddAction(function (t) {
                i.unhighlightAllShapes(), t();
              });
            }
          }
        }
      ),
      $(document).on(
        "click",
        "[data-imp-highlight-shape-on-click]",
        function () {
          var t = $(this).data("imp-highlight-shape-on-click"),
            i = findImageMapWithName($(this).data("imp-image-map-name"));
          if (i) {
            var e = findShapeWithTitle(i.settings.general.name, t);
            if (e) {
              var s = e.shape,
                n = e.index;
              if (
                (s.layerID != i.settings.runtime.layerID &&
                  APIFunctionQueueAddAction(function (t) {
                    i.switchLayer(s.layerID, function () {
                      t();
                    });
                  }),
                APIFunctionQueueAddAction(function (t) {
                  i.highlightShape(n, !0), t();
                }),
                -1 == i.apiHighlightedShapes.indexOf(n) &&
                  i.apiHighlightedShapes.push(n),
                i.connectedShapes[s.id])
              )
                for (var a = 0; a < i.connectedShapes[s.id].length; a++) {
                  var o = i.connectedShapes[s.id][a].index;
                  -1 == i.apiHighlightedShapes.indexOf(o) &&
                    i.apiHighlightedShapes.push(o);
                }
            }
          }
        }
      ),
      $(document).on(
        "mouseover",
        "[data-imp-unhighlight-shape-on-mouseover]",
        function () {
          var t = $(this).data("imp-unhighlight-shape-on-mouseover"),
            i = findImageMapWithName($(this).data("imp-image-map-name"));
          if (i) {
            var e = findShapeWithTitle(i.settings.general.name, t);
            if (e) {
              var s = e.shape,
                n = e.index;
              if (-1 != i.apiHighlightedShapes.indexOf(n)) {
                var a = i.apiHighlightedShapes.indexOf(n);
                i.apiHighlightedShapes.splice(a, 1);
              }
              if (
                (s.layerID != i.settings.runtime.layerID &&
                  APIFunctionQueueAddAction(function (t) {
                    i.switchLayer(s.layerID, function () {
                      t();
                    });
                  }),
                i.connectedShapes[s.id])
              )
                for (var o = 0; o < i.connectedShapes[s.id].length; o++) {
                  var h = i.connectedShapes[s.id][o].index,
                    r = i.apiHighlightedShapes.indexOf(h);
                  i.apiHighlightedShapes.splice(r, 1),
                    APIFunctionQueueAddAction(function (t) {
                      i.unhighlightShape(h), t();
                    });
                }
              APIFunctionQueueAddAction(function (t) {
                i.unhighlightShape(n), t();
              });
            }
          }
        }
      ),
      $(document).on(
        "click",
        "[data-imp-unhighlight-shape-on-click]",
        function () {
          var t = $(this).data("imp-unhighlight-shape-on-click"),
            i = findImageMapWithName($(this).data("imp-image-map-name"));
          if (i) {
            var e = findShapeWithTitle(i.settings.general.name, t);
            if (e) {
              var s = e.shape,
                n = e.index;
              if (-1 != i.apiHighlightedShapes.indexOf(n)) {
                var a = i.apiHighlightedShapes.indexOf(n);
                i.apiHighlightedShapes.splice(a, 1);
              }
              if (
                (s.layerID != i.settings.runtime.layerID &&
                  APIFunctionQueueAddAction(function (t) {
                    i.switchLayer(s.layerID, function () {
                      t();
                    });
                  }),
                i.connectedShapes[s.id])
              )
                for (var o = 0; o < i.connectedShapes[s.id].length; o++) {
                  var h = i.connectedShapes[s.id][o].index,
                    r = i.apiHighlightedShapes.indexOf(h);
                  i.apiHighlightedShapes.splice(r, 1),
                    APIFunctionQueueAddAction(function (t) {
                      i.unhighlightShape(h), t();
                    });
                }
              APIFunctionQueueAddAction(function (t) {
                i.unhighlightShape(n), t();
              });
            }
          }
        }
      ),
      $(document).on(
        "mouseover",
        "[data-imp-open-tooltip-on-mouseover]",
        function () {
          var t = $(this).data("imp-open-tooltip-on-mouseover"),
            i = findImageMapWithName($(this).data("imp-image-map-name"));
          if (i) {
            var e = findShapeWithTitle(i.settings.general.name, t);
            if (e) {
              var s = e.shape,
                n = e.index;
              s.layerID != i.settings.runtime.layerID &&
                APIFunctionQueueAddAction(function (t) {
                  i.switchLayer(s.layerID, function () {
                    t();
                  });
                }),
                APIFunctionQueueAddAction(function (t) {
                  i.showTooltip(n), t();
                }),
                APIFunctionQueueAddAction(function (t) {
                  i.updateTooltipPosition(n), t();
                });
            }
          }
        }
      ),
      $(document).on(
        "mouseout",
        "[data-imp-open-tooltip-on-mouseover]",
        function () {
          var t = $(this).data("imp-open-tooltip-on-mouseover"),
            i = findImageMapWithName($(this).data("imp-image-map-name"));
          if (i) {
            var e = findShapeWithTitle(i.settings.general.name, t);
            if (e) {
              var s = e.shape;
              e.index;
              s.layerID != i.settings.runtime.layerID &&
                APIFunctionQueueAddAction(function (t) {
                  i.switchLayer(s.layerID, function () {
                    t();
                  });
                }),
                APIFunctionQueueAddAction(function (t) {
                  i.hideAllTooltips(), t();
                });
            }
          }
        }
      ),
      $(document).on("click", "[data-imp-open-tooltip-on-click]", function () {
        var t = $(this).data("imp-open-tooltip-on-click"),
          i = findImageMapWithName($(this).data("imp-image-map-name"));
        if (i) {
          var e = findShapeWithTitle(i.settings.general.name, t);
          if (e) {
            var s = e.shape,
              n = e.index;
            s.layerID != i.settings.runtime.layerID &&
              APIFunctionQueueAddAction(function (t) {
                i.switchLayer(s.layerID, function () {
                  t();
                });
              }),
              APIFunctionQueueAddAction(function (t) {
                i.showTooltip(n), t();
              }),
              APIFunctionQueueAddAction(function (t) {
                i.updateTooltipPosition(n), t();
              }),
              -1 == i.apiOpenedTooltips.indexOf(n) &&
                i.apiOpenedTooltips.push(n);
          }
        }
      }),
      $(document).on(
        "mouseover",
        "[data-imp-close-tooltip-on-mouseover]",
        function () {
          var t = $(this).data("imp-close-tooltip-on-mouseover"),
            i = findImageMapWithName($(this).data("imp-image-map-name"));
          if (i) {
            var e = findShapeWithTitle(i.settings.general.name, t);
            if (e) {
              var s = e.shape,
                n = e.index;
              if (
                (s.layerID != i.settings.runtime.layerID &&
                  APIFunctionQueueAddAction(function (t) {
                    i.switchLayer(s.layerID, function () {
                      t();
                    });
                  }),
                -1 != i.apiOpenedTooltips.indexOf(n))
              ) {
                var a = i.apiOpenedTooltips.indexOf(n);
                i.apiOpenedTooltips.splice(a, 1);
              }
              APIFunctionQueueAddAction(function (t) {
                i.hideTooltip(n), t();
              });
            }
          }
        }
      ),
      $(document).on("click", "[data-imp-close-tooltip-on-click]", function () {
        var t = $(this).data("imp-close-tooltip-on-click"),
          i = findImageMapWithName($(this).data("imp-image-map-name"));
        if (i) {
          var e = findShapeWithTitle(i.settings.general.name, t);
          if (e) {
            var s = e.shape,
              n = e.index;
            if (
              (s.layerID != i.settings.runtime.layerID &&
                APIFunctionQueueAddAction(function (t) {
                  i.switchLayer(s.layerID, function () {
                    t();
                  });
                }),
              -1 != i.apiOpenedTooltips.indexOf(n))
            ) {
              var a = i.apiOpenedTooltips.indexOf(n);
              i.apiOpenedTooltips.splice(a, 1);
            }
            APIFunctionQueueAddAction(function (t) {
              i.hideTooltip(n), t();
            });
          }
        }
      }),
      $(document).on(
        "mouseover",
        "[data-imp-trigger-shape-on-mouseover]",
        function () {
          var t = $(this).data("imp-trigger-shape-on-mouseover"),
            i = findImageMapWithName($(this).data("imp-image-map-name"));
          if (i) {
            var e = findShapeWithTitle(i.settings.general.name, t);
            if (e) {
              var s = e.shape,
                n = e.index;
              s.layerID != i.settings.runtime.layerID &&
                APIFunctionQueueAddAction(function (t) {
                  i.switchLayer(s.layerID, function () {
                    t();
                  });
                }),
                APIFunctionQueueAddAction(function (t) {
                  i.highlightShape(n, !0), t();
                }),
                APIFunctionQueueAddAction(function (t) {
                  i.showTooltip(n), t();
                }),
                APIFunctionQueueAddAction(function (t) {
                  i.updateTooltipPosition(n), t();
                });
            }
          }
        }
      ),
      $(document).on(
        "mouseout",
        "[data-imp-trigger-shape-on-mouseover]",
        function () {
          var t = $(this).data("imp-trigger-shape-on-mouseover"),
            i = findImageMapWithName($(this).data("imp-image-map-name"));
          if (i) {
            var e = findShapeWithTitle(i.settings.general.name, t);
            if (e) {
              var s = e.shape;
              e.index;
              s.layerID != i.settings.runtime.layerID &&
                APIFunctionQueueAddAction(function (t) {
                  i.switchLayer(s.layerID, function () {
                    t();
                  });
                }),
                APIFunctionQueueAddAction(function (t) {
                  i.unhighlightAllShapes(), t();
                }),
                APIFunctionQueueAddAction(function (t) {
                  i.hideAllTooltips(), t();
                });
            }
          }
        }
      ),
      $(document).on("click", "[data-imp-trigger-shape-on-click]", function () {
        var t = $(this).data("imp-trigger-shape-on-click"),
          i = findImageMapWithName($(this).data("imp-image-map-name"));
        if (i) {
          var e = findShapeWithTitle(i.settings.general.name, t);
          if (e) {
            var s = e.shape,
              n = e.index;
            if (
              (s.layerID != i.settings.runtime.layerID &&
                APIFunctionQueueAddAction(function (t) {
                  i.switchLayer(s.layerID, function () {
                    t();
                  });
                }),
              APIFunctionQueueAddAction(function (t) {
                i.highlightShape(n, !0), t();
              }),
              APIFunctionQueueAddAction(function (t) {
                i.showTooltip(n), t();
              }),
              APIFunctionQueueAddAction(function (t) {
                i.updateTooltipPosition(n), t();
              }),
              -1 == i.apiOpenedTooltips.indexOf(n) &&
                i.apiOpenedTooltips.push(n),
              -1 == i.apiHighlightedShapes.indexOf(n) &&
                i.apiHighlightedShapes.push(n),
              i.connectedShapes[s.id])
            )
              for (var a = 0; a < i.connectedShapes[s.id].length; a++) {
                var o = i.connectedShapes[s.id][a].index;
                -1 == i.apiHighlightedShapes.indexOf(o) &&
                  i.apiHighlightedShapes.push(o);
              }
          }
        }
      }),
      $(document).on(
        "mouseover",
        "[data-imp-untrigger-shape-on-mouseover]",
        function () {
          var t = $(this).data("imp-untrigger-shape-on-mouseover"),
            i = findImageMapWithName($(this).data("imp-image-map-name"));
          if (i) {
            var e = findShapeWithTitle(i.settings.general.name, t);
            if (e) {
              var s = e.shape,
                n = e.index;
              if (
                (s.layerID != i.settings.runtime.layerID &&
                  APIFunctionQueueAddAction(function (t) {
                    i.switchLayer(s.layerID, function () {
                      t();
                    });
                  }),
                -1 != i.apiHighlightedShapes.indexOf(n))
              ) {
                var a = i.apiHighlightedShapes.indexOf(n);
                i.apiHighlightedShapes.splice(a, 1);
              }
              if (i.connectedShapes[s.id])
                for (var o = 0; o < i.connectedShapes[s.id].length; o++) {
                  var h = i.connectedShapes[s.id][o].index,
                    r = i.apiHighlightedShapes.indexOf(h);
                  i.apiHighlightedShapes.splice(r, 1),
                    APIFunctionQueueAddAction(function (t) {
                      i.unhighlightShape(h), t();
                    });
                }
              if (
                (APIFunctionQueueAddAction(function (t) {
                  i.unhighlightShape(n), t();
                }),
                -1 != i.apiOpenedTooltips.indexOf(n))
              ) {
                a = i.apiOpenedTooltips.indexOf(n);
                i.apiOpenedTooltips.splice(a, 1);
              }
              APIFunctionQueueAddAction(function (t) {
                i.hideTooltip(n), t();
              });
            }
          }
        }
      ),
      $(document).on(
        "click",
        "[data-imp-untrigger-shape-on-click]",
        function () {
          var t = $(this).data("imp-untrigger-shape-on-click"),
            i = findImageMapWithName($(this).data("imp-image-map-name"));
          if (i) {
            var e = findShapeWithTitle(i.settings.general.name, t);
            if (e) {
              var s = e.shape,
                n = e.index;
              if (
                (s.layerID != i.settings.runtime.layerID &&
                  APIFunctionQueueAddAction(function (t) {
                    i.switchLayer(s.layerID, function () {
                      t();
                    });
                  }),
                -1 != i.apiHighlightedShapes.indexOf(n))
              ) {
                var a = i.apiHighlightedShapes.indexOf(n);
                i.apiHighlightedShapes.splice(a, 1);
              }
              if (i.connectedShapes[s.id])
                for (var o = 0; o < i.connectedShapes[s.id].length; o++) {
                  var h = i.connectedShapes[s.id][o].index,
                    r = i.apiHighlightedShapes.indexOf(h);
                  i.apiHighlightedShapes.splice(r, 1),
                    APIFunctionQueueAddAction(function (t) {
                      i.unhighlightShape(h), t();
                    });
                }
              if (
                (APIFunctionQueueAddAction(function (t) {
                  i.unhighlightShape(n), t();
                }),
                -1 != i.apiOpenedTooltips.indexOf(n))
              ) {
                a = i.apiOpenedTooltips.indexOf(n);
                i.apiOpenedTooltips.splice(a, 1);
              }
              APIFunctionQueueAddAction(function (t) {
                i.hideTooltip(n), t();
              });
            }
          }
        }
      ),
      $(document).on(
        "mouseover",
        "[data-imp-focus-shape-on-mouseover]",
        function () {
          var t = $(this).data("imp-focus-shape-on-mouseover"),
            i = findImageMapWithName($(this).data("imp-image-map-name"));
          if (i) {
            var e = findShapeWithTitle(i.settings.general.name, t);
            if (e) {
              var s = e.shape,
                n = e.index;
              s.layerID != i.settings.runtime.layerID &&
                APIFunctionQueueAddAction(function (t) {
                  i.switchLayer(s.layerID, function () {
                    t();
                  });
                }),
                APIFunctionQueueAddAction(function (t) {
                  i.focusShape(n), t();
                }),
                APIFunctionQueueAddAction(function (t) {
                  i.unhighlightAllShapes(), t();
                }),
                APIFunctionQueueAddAction(function (t) {
                  i.highlightShape(n), t();
                });
            }
          }
        }
      ),
      $(document).on("click", "[data-imp-focus-shape-on-click]", function () {
        var t = $(this).data("imp-focus-shape-on-click"),
          i = findImageMapWithName($(this).data("imp-image-map-name"));
        if (i) {
          var e = findShapeWithTitle(i.settings.general.name, t);
          if (e) {
            var s = e.shape,
              n = e.index;
            i.hideResponsiveShapesMenu(),
              s.layerID != i.settings.runtime.layerID &&
                APIFunctionQueueAddAction(function (t) {
                  i.switchLayer(s.layerID, function () {
                    t();
                  });
                }),
              APIFunctionQueueAddAction(function (t) {
                i.focusShape(n), t();
              }),
              APIFunctionQueueAddAction(function (t) {
                i.unhighlightAllShapes(), t();
              }),
              APIFunctionQueueAddAction(function (t) {
                i.highlightShape(n), t();
              });
          }
        }
      }),
      $(document).on("click", "[data-imp-go-to-floor]", function () {
        var t = $(this).data("imp-go-to-floor"),
          i = findImageMapWithName($(this).data("imp-image-map-name"));
        if (i) {
          for (var e = 0, s = 0; s < i.settings.layers.layers_list.length; s++)
            i.settings.layers.layers_list[s].title == t &&
              (e = i.settings.layers.layers_list[s].id);
          i.switchLayer(e);
        }
      });
  });
  var pluginName = "imageMapPro",
    default_settings = $.imageMapProEditorDefaults,
    default_spot_settings = $.imageMapProShapeDefaults,
    instances = new Array();
  function Plugin(t, i) {
    (this.element = t),
      (this.settings = $.extend(!0, {}, default_settings, i)),
      (this.root = $(t)),
      (this.wrap = undefined),
      (this.shapesMenuWrap = undefined),
      (this.shapesMenuResponsiveButton = undefined),
      (this.zoomWrap = undefined),
      (this.translateWrap = undefined),
      (this.ui = undefined),
      (this.uiNavigatorRoot = undefined),
      (this.uiNavigatorWindowWidth = undefined),
      (this.uiNavigatorWindowHeight = undefined),
      (this.uiNavigatorImage = undefined),
      (this.shapeContainer = undefined),
      (this.imageBackgroundsContainer = undefined),
      (this.shapeSvgContainer = undefined),
      (this.fullscreenTooltipsContainer = undefined),
      (this.tooltipsContainer = undefined),
      (this.scrollMessage = undefined),
      (this.responsiveShapesMenu = !1),
      (this.responsiveShapesMenuWrap = !1),
      (this.wrapWidth = 0),
      (this.wrapHeight = 0),
      (this.wrapOffsetLeft = 0),
      (this.wrapOffsetTop = 0),
      (this.visibleFullscreenTooltip = undefined),
      (this.visibleFullscreenTooltipIndex = undefined),
      (this.bodyOverflow = undefined),
      (this.highlightedShapes = new Array()),
      (this.connectedShapes = new Array()),
      (this.openedTooltips = new Array()),
      (this.apiHighlightedShapes = new Array()),
      (this.apiOpenedTooltips = new Array()),
      (this.hideScrollMessageTimeout = undefined),
      (this.targetZoom = 1),
      (this.zoom = 1),
      (this.maxZoomLevel = 8),
      (this.zoomMultiplier = 1.45),
      (this.targetPanX = 0),
      (this.actualPanX = 0),
      (this.targetPanY = 0),
      (this.actualPanY = 0),
      (this.initialPanX = 0),
      (this.initialPanY = 0),
      (this.panDeltaY = 0),
      (this.ix = 0),
      (this.iy = 0),
      (this.lastX = 0),
      (this.lastY = 0),
      (this.pinchInitial = [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ]),
      (this.pinchInitialDistance = 0),
      (this.pinchInitialZoom = 0),
      (this.navigatorRatio = 1),
      (this.navigatorMarginX = 0),
      (this.navigatorMarginY = 0),
      (this.touch = !1),
      (this.fullscreenTooltipVisible = !1),
      (this.panning = !1),
      (this.didPan = !1),
      (this.panningOnNavigator = !1),
      (this.pinching = !1),
      (this.didAnimateShapesOnPageload = !1),
      (this.ctrlKeyDown = !1),
      (this.cmdKeyDown = !1),
      (this.mac = !1),
      (this.lastWrapRecalc = 0),
      this.init();
  }
  function isTrue(t) {
    return 1 == parseInt(t, 10);
  }
  function hexToRgb(t) {
    var i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
    return i
      ? { r: parseInt(i[1], 16), g: parseInt(i[2], 16), b: parseInt(i[3], 16) }
      : { r: 0, g: 0, b: 0 };
  }
  function screenToImageMapSpace(t, i, e) {
    return {
      x: Math.round(1e3 * (t - e.offset().left)) / 1e3,
      y: Math.round(1e3 * (i - e.offset().top)) / 1e3,
    };
  }
  function isPointInsideRect(t, i, e, s, n, a) {
    return t >= e && t <= e + n && i >= s && i <= s + a;
  }
  function isPointInsidePolygon(t, i, e) {
    for (var s = !1, n = 0, a = e.length - 1; n < e.length; a = n++) {
      var o = e[n][0],
        h = e[n][1],
        r = e[a][0],
        l = e[a][1];
      h > i != l > i && t < ((r - o) * (i - h)) / (l - h) + o && (s = !s);
    }
    return s;
  }
  function isPointInsideEllipse(t, i, e, s, n, a) {
    return ((t - e) * (t - e)) / (n * n) + ((i - s) * (i - s)) / (a * a) <= 1;
  }
  function fitRectToScreen(t, i, e, s) {
    return (
      t < 0 && (t = 0),
      i < 0 && (i = 0),
      t > $(document).width() - e && (t = $(document).width() - e),
      i > $(document).height() - s && (i = $(document).height() - s),
      { x: t, y: i }
    );
  }
  function shuffle(t) {
    for (var i, e, s = t.length; 0 !== s; )
      (e = Math.floor(Math.random() * s)),
        (i = t[(s -= 1)]),
        (t[s] = t[e]),
        (t[e] = i);
    return t;
  }
  function isMobile() {
    return !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
  function lerp(t, i, e) {
    return t * (1 - e) + i * e;
  }
  function easeOutBounce(t, i, e, s, n) {
    return (i /= n) < 1 / 2.75
      ? s * (7.5625 * i * i) + e
      : i < 2 / 2.75
      ? s * (7.5625 * (i -= 1.5 / 2.75) * i + 0.75) + e
      : i < 2.5 / 2.75
      ? s * (7.5625 * (i -= 2.25 / 2.75) * i + 0.9375) + e
      : s * (7.5625 * (i -= 2.625 / 2.75) * i + 0.984375) + e;
  }
  $.extend(Plugin.prototype, {
    init: function (t) {
      this.parseSettings(),
        (instances[this.settings.general.name] = this),
        (this.id = 100 * Math.random());
      for (var i = 0; i < this.settings.spots.length; i++) {
        var e = this.settings.spots[i],
          s = $.extend(!0, {}, default_spot_settings);
        (e = $.extend(!0, s, e)),
          (this.settings.spots[i] = $.extend(!0, {}, e)),
          (this.settings.spots[i].title &&
            0 != this.settings.spots[i].title.length) ||
            (this.settings.spots[i].title = this.settings.spots[i].id),
          "" != e.connected_to &&
            (this.connectedShapes[e.connected_to] ||
              (this.connectedShapes[e.connected_to] = new Array()),
            this.connectedShapes[e.connected_to].push({ id: e.id, index: i })),
          (this.settings.spots[
            i
          ].mouseover_style.background_type = this.settings.spots[
            i
          ].default_style.background_type);
      }
      if (isTrue(this.settings.layers.enable_layers)) {
        var n = !1;
        for (i = 0; i < this.settings.layers.layers_list.length; i++)
          this.settings.layers.layers_list[i].id ==
            this.settings.runtime.layerID &&
            ((n = !0),
            (this.settings.image.url = this.settings.layers.layers_list[
              i
            ].image_url));
        n ||
          ((this.settings.image.url = this.settings.layers.layers_list[0].image_url),
          (this.settings.runtime.layerID = this.settings.layers.layers_list[0].id));
      }
      this.mac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      var a = this.root.width();
      if (
        (this.settings.runtime.is_fullscreen && (a = $(window).width()),
        (isMobile() || a / 3 < 240) && (this.responsiveShapesMenu = !0),
        "" != this.settings.image.url)
      ) {
        (h = new Image()).src = this.settings.image.url;
        var o = this;
        this.loadImage(
          h,
          function () {},
          function () {
            o.finishInit(t);
          }
        );
      } else this.finishInit(t);
      for (i = 0; i < this.settings.spots.length; i++) {
        var h;
        if (
          "image" == (e = this.settings.spots[i]).default_style.background_type
        )
          ((h = new Image()).src = e.mouseover_style.background_image_url),
            $(h).on("load", function () {});
      }
    },
    finishInit: function (t) {
      var i = "",
        e = "";
      if (
        (isTrue(this.settings.tooltips.sticky_tooltips) &&
          (e = "imp-sticky-tooltips"),
        (i += '<div class="imp-wrap ' + e + '">'),
        (i +=
          '   <div class="imp-ui" data-image-map-pro-ui-id="' +
          this.settings.id +
          '">'),
        isTrue(this.settings.zooming.enable_zooming) &&
          isTrue(this.settings.zooming.enable_navigator) &&
          ((i +=
            '       <div data-imp-id="' +
            this.settings.id +
            '" class="imp-ui-element imp-ui-navigator-root">'),
          "" != this.settings.image.url &&
            ((i +=
              '         <img src="' +
              this.settings.image.url +
              '" class="imp-ui-navigator-background-image-edgefill">'),
            (i +=
              '         <img src="' +
              this.settings.image.url +
              '" class="imp-ui-navigator-background-image">')),
          (i += '         <div class="imp-ui-navigator-overlay"></div>'),
          "" != this.settings.image.url &&
            (i +=
              '         <img src="' +
              this.settings.image.url +
              '" class="imp-ui-navigator-window-image">'),
          (i += "      </div>")),
        isTrue(this.settings.zooming.enable_zooming) &&
          isTrue(this.settings.zooming.enable_zoom_buttons) &&
          ((i +=
            '       <div data-imp-id="' +
            this.settings.id +
            '" class="imp-ui-element imp-ui-zoom-button imp-ui-zoom-button-zoom-in" style="color: ' +
            this.settings.zooming.zoom_button_text_color +
            "; background: " +
            this.settings.zooming.zoom_button_background_color +
            ';"><i class="fa fa-plus"></i></div>'),
          (i +=
            '       <div data-imp-id="' +
            this.settings.id +
            '" class="imp-ui-element imp-ui-zoom-button imp-ui-zoom-button-zoom-out" style="color: ' +
            this.settings.zooming.zoom_button_text_color +
            "; background: " +
            this.settings.zooming.zoom_button_background_color +
            ';"><i class="fa fa-minus"></i></div>')),
        isTrue(this.settings.layers.enable_layers))
      ) {
        (i += '<div class="imp-ui-layers-menu-wrap">'),
          (i +=
            '   <div data-imp-id="' +
            this.settings.id +
            '" class="imp-ui-layer-switch-up imp-ui-layer-switch"><i class="fa fa-caret-up" aria-hidden="true"></i></div>'),
          (i +=
            '   <div data-imp-id="' +
            this.settings.id +
            '" class="imp-ui-layer-switch-down imp-ui-layer-switch"><i class="fa fa-caret-down" aria-hidden="true"></i></div>'),
          (i += '   <select class="imp-ui-element imp-ui-layers-select">');
        for (var s = 0; s < this.settings.layers.layers_list.length; s++)
          i +=
            '<option value="' +
            this.settings.layers.layers_list[s].id +
            '">' +
            this.settings.layers.layers_list[s].title +
            "</option>";
        (i += "   </select>"), (i += "</div>");
      }
      if (
        isTrue(this.settings.zooming.enable_zooming) &&
        isTrue(this.settings.zooming.hold_ctrl_to_zoom)
      ) {
        var n = "CTRL";
        this.mac && (n = "⌘"),
          (i += '<div class="imp-ui-scroll-message-wrap">'),
          (i += '   <div class="imp-ui-scroll-message-wrap-inner">'),
          (i +=
            '       <div class="imp-ui-scroll-message">Hold <div class="imp-ui-scroll-message-button">' +
            n +
            "</div> to Zoom</div>"),
          (i += "   </div>"),
          (i += "</div>");
      }
      (i += "   </div>"),
        (i += '   <div class="imp-zoom-outer-wrap">'),
        (i += '       <div class="imp-translate-wrap">'),
        (i += '           <div class="imp-zoom-wrap">'),
        "" != this.settings.image.url &&
          (i +=
            '               <img src="' +
            this.settings.image.url +
            '" class="imp-main-image">'),
        (i += "           </div>"),
        (i += "       </div>"),
        (i += "   </div>"),
        (i += "</div>"),
        this.root.html(i),
        (this.wrap = this.root.find(".imp-wrap")),
        (this.zoomWrap = this.root.find(".imp-zoom-wrap")),
        (this.translateWrap = this.root.find(".imp-translate-wrap")),
        (this.ui = this.wrap.find(".imp-ui")),
        (this.scrollMessage = this.wrap.find(".imp-ui-scroll-message-wrap")),
        this.root.addClass("imp-initialized"),
        this.root.attr("data-image-map-pro-id", this.settings.id),
        $('[data-imp-tooltips-container="' + this.settings.id + '"]').remove(),
        $("body").prepend(
          '<div class="imp-tooltips-container" data-imp-tooltips-container="' +
            this.settings.id +
            '"></div>'
        ),
        (this.tooltipsContainer = $(
          '[data-imp-tooltips-container="' + this.settings.id + '"]'
        )),
        this.events(),
        this.centerImageMap(),
        this.drawShapes(),
        this.addTooltips(),
        this.initFullscreen(),
        this.initZoom(),
        this.drawShapesMenu(),
        this.adjustSize(),
        this.initNavigator(),
        this.initLayers(),
        this.animateShapesLoop(),
        $.imageMapProInitialized(this.settings.general.name),
        t && t();
    },
    parseSettings: function () {
      this.settings.general.image_url &&
        (this.settings.image.url = this.settings.general.image_url);
      for (var t = 0; t < this.settings.spots.length; t++) {
        var i = this.settings.spots[t];
        if (
          (i.tooltip_style &&
            i.tooltip_style.enable_tooltip &&
            ((i.tooltip.enable_tooltip = i.tooltip_style.enable_tooltip),
            (i.tooltip_style.enable_tooltip = undefined)),
          i.tooltip_content.plain_text &&
            "content-builder" != i.tooltip_content.content_type)
        ) {
          var e = {
            containers: [
              {
                id: "sq-container-160121",
                settings: {
                  elements: [
                    {
                      settings: {
                        name: "Paragraph",
                        iconClass: "fa fa-paragraph",
                      },
                      options: {
                        text: { text: i.tooltip_content.plain_text },
                        font: {
                          text_color: i.tooltip_content.plain_text_color,
                        },
                      },
                    },
                  ],
                },
              },
            ],
          };
          (i.tooltip_content.squares_settings = e),
            (i.tooltip_content.content_type = undefined),
            (i.tooltip_content.plain_text = undefined),
            (i.tooltip_content.plain_text_color = undefined);
        }
        i.default_style &&
          i.default_style.fill &&
          ((i.default_style.background_color = i.default_style.fill),
          delete i.default_style.fill),
          i.default_style &&
            i.default_style.fill_opacity &&
            ((i.default_style.background_opacity =
              i.default_style.fill_opacity),
            delete i.default_style.fill_opacity),
          i.mouseover_style &&
            i.mouseover_style.fill &&
            ((i.mouseover_style.background_color = i.mouseover_style.fill),
            delete i.mouseover_style.fill),
          i.mouseover_style &&
            i.mouseover_style.fill_opacity &&
            ((i.mouseover_style.background_opacity =
              i.mouseover_style.fill_opacity),
            delete i.mouseover_style.fill_opacity);
      }
    },
    loadImage: function (t, i, e) {
      if (isTrue(this.settings.layers.enable_layers))
        for (var s = 0; s < this.settings.layers.layers_list.length; s++) {
          var n = new Image();
          n.src = this.settings.layers.layers_list[s].image_url;
          var a = 0,
            o = this;
          $(n).on("load", function () {
            ++a == o.settings.layers.layers_list.length && e();
          });
        }
      else
        t.complete &&
        t.naturalWidth !== undefined &&
        t.naturalHeight !== undefined
          ? e()
          : (i(),
            $(t).on("load", function () {
              $(t).off("load"), e();
            }));
    },
    centerImageMap: function () {
      isTrue(this.settings.general.center_image_map) &&
        this.wrap.css({ margin: "0 auto" });
    },
    adjustSize: function () {
      if (isTrue(this.settings.runtime.is_fullscreen)) {
        var t = $(window).width(),
          i = $(window).height();
        isTrue(this.settings.shapes_menu.enable_shapes_menu) &&
          !this.responsiveShapesMenu &&
          (t -= 240);
        var e = t / i,
          s =
            this.settings.general.naturalWidth /
            this.settings.general.naturalHeight;
        return (
          s < e
            ? ((this.settings.general.width = i * s),
              (this.settings.general.height = i))
            : ((this.settings.general.width = t),
              (this.settings.general.height = t / s)),
          this.wrap.css({
            width: this.settings.general.width,
            height: this.settings.general.height,
          }),
          (this.wrapWidth = this.wrap.width()),
          (this.wrapHeight = this.wrap.height()),
          (this.wrapOffsetLeft = this.wrap.offset().left),
          void (this.wrapOffsetTop = this.wrap.offset().top)
        );
      }
      "" != this.settings.image.url
        ? isTrue(this.settings.general.responsive)
          ? isTrue(this.settings.general.preserve_quality) &&
            this.wrap.css({ "max-width": this.settings.general.naturalWidth })
          : this.wrap.css({
              width: this.settings.general.width,
              height: this.settings.general.height,
            })
        : isTrue(this.settings.general.responsive)
        ? (this.wrap.css({
            width: "100%",
            height: this.settings.general.height,
            "max-width": this.settings.general.width,
            "max-height": this.settings.general.height,
          }),
          this.wrap.css({
            height:
              this.wrap.width() *
              (this.settings.general.height / this.settings.general.width),
          }))
        : this.wrap.css({
            width: this.settings.general.width,
            height: this.settings.general.height,
          }),
        (this.wrapWidth = this.wrap.width()),
        (this.wrapHeight = this.wrap.height()),
        (this.wrapOffsetLeft = this.wrap.offset().left),
        (this.wrapOffsetTop = this.wrap.offset().top);
    },
    drawShapes: function () {
      for (var t = 0; t < this.settings.spots.length; t++) {
        if (
          (((o = this.settings.spots[t]).x = parseFloat(o.x)),
          (o.y = parseFloat(o.y)),
          (o.width = parseFloat(o.width)),
          (o.height = parseFloat(o.height)),
          (o.default_style.stroke_width = parseInt(
            o.default_style.stroke_width
          )),
          (o.mouseover_style.stroke_width = parseInt(
            o.mouseover_style.stroke_width
          )),
          "poly" == o.type)
        )
          for (var i = 0; i < o.points.length; i++)
            (o.points[i].x = parseFloat(o.points[i].x)),
              (o.points[i].y = parseFloat(o.points[i].y));
      }
      (this.settings.general.width = parseInt(this.settings.general.width)),
        (this.settings.general.height = parseInt(this.settings.general.height)),
        this.zoomWrap.prepend('<div class="imp-shape-container"></div>'),
        this.zoomWrap.prepend(
          '<div class="imp-image-backgrounds-container"></div>'
        ),
        (this.shapeContainer = this.wrap.find(".imp-shape-container")),
        (this.imageBackgroundsContainer = this.wrap.find(
          ".imp-image-backgrounds-container"
        ));
      var e = "",
        s = this.settings.general.width,
        n = this.settings.general.height;
      isTrue(this.settings.general.responsive) &&
        ((s = this.settings.general.naturalWidth),
        (n = this.settings.general.naturalHeight));
      var a =
        '<svg class="hs-poly-svg" viewBox="0 0 ' +
        s +
        " " +
        n +
        '" preserveAspectRatio="none">';
      for (t = 0; t < this.settings.spots.length; t++)
        if (
          !isTrue(this.settings.layers.enable_layers) ||
          parseInt(this.settings.spots[t].layerID, 10) ==
            parseInt(this.settings.runtime.layerID)
        ) {
          var o = this.settings.spots[t],
            h = this.calcStyles(o.default_style, t),
            r = "";
          if ((isTrue(o.static) && (r = "imp-shape-static"), "spot" == o.type))
            if (isTrue(o.default_style.use_icon)) {
              var l = "imp-shape-spot";
              if (
                (isTrue(o.default_style.icon_is_pin) &&
                  (l += " imp-shape-spot-pin"),
                (e +=
                  '<div class="imp-shape ' +
                  r +
                  " " +
                  l +
                  '" id="' +
                  o.id +
                  '" data-shape-title="' +
                  o.title +
                  '" style="' +
                  h +
                  '" data-index=' +
                  t +
                  ">"),
                "library" == o.default_style.icon_type)
              ) {
                var p = "";
                (p += "line-height: " + o.height + "px;"),
                  (e +=
                    '   <div class="imp-spot-fontawesome-icon" style="' +
                    (p += "font-size: " + o.height + "px;") +
                    '">'),
                  (e +=
                    '       <i class="fa fa-' +
                    o.default_style.icon_fontawesome_id +
                    '"></i>'),
                  (e += "   </div>");
              }
              if (
                ("custom" == o.default_style.icon_type &&
                  o.default_style.icon_url.length > 0 &&
                  (e +=
                    '<img src="' +
                    o.default_style.icon_url +
                    '" style="width: ' +
                    o.width +
                    "px; height: " +
                    o.height +
                    'px">'),
                isTrue(o.default_style.icon_shadow))
              ) {
                var g = "";
                (g += "width: " + o.width + "px;"),
                  (g += "height: " + o.height + "px;"),
                  (e +=
                    '<div style="' +
                    (g += "top: " + o.height / 2 + "px;") +
                    '" class="imp-shape-icon-shadow"></div>');
              }
              if (isTrue(this.settings.shapes.glowing_shapes)) {
                var d = "";
                (d += "width: " + o.width / 3 + "px;"),
                  (d += "height: " + o.height / 3 + "px;"),
                  (d += "margin-left: " + -o.width / 6 + "px;"),
                  (d += "margin-top: " + -o.height / 6 + "px;"),
                  (d += "border-radius: " + o.width / 3 + "px;"),
                  (d +=
                    "background: rgba(" +
                    (c = hexToRgb(
                      this.settings.shapes.glowing_shapes_color
                    ) || { r: 0, b: 0, g: 0 }).r +
                    ", " +
                    c.g +
                    ", " +
                    c.b +
                    ", " +
                    this.settings.shapes.glow_opacity +
                    ");"),
                  (e +=
                    '<div class="imp-spot-glow" style="' +
                    (d +=
                      "box-shadow: 0 0 20px 15px rgba(" +
                      c.r +
                      ", " +
                      c.g +
                      ", " +
                      c.b +
                      ", " +
                      this.settings.shapes.glow_opacity +
                      ");") +
                    '"></div>');
              }
              e += "</div>";
            } else {
              var u = "";
              if (isTrue(this.settings.shapes.glowing_shapes)) {
                d = "";
                (d +=
                  "box-shadow: 0 0 20px 15px rgba(" +
                  (c = hexToRgb(this.settings.shapes.glowing_shapes_color) || {
                    r: 0,
                    b: 0,
                    g: 0,
                  }).r +
                  ", " +
                  c.g +
                  ", " +
                  c.b +
                  ", " +
                  this.settings.shapes.glow_opacity +
                  ");"),
                  (u +=
                    '<div class="imp-shape-glow" style="' +
                    (d += "border-radius: 50% 50%;") +
                    '"></div>');
              }
              e +=
                '<div class="imp-shape ' +
                r +
                ' imp-shape-spot" id="' +
                o.id +
                '" data-shape-title="' +
                o.title +
                '" style="' +
                h +
                '" data-index=' +
                t +
                ">" +
                u +
                "</div>";
            }
          if (
            ("text" == o.type &&
              (e +=
                '<div class="imp-shape ' +
                r +
                ' imp-shape-text" id="' +
                o.id +
                '" data-shape-title="' +
                o.title +
                '" style="' +
                h +
                '" data-index=' +
                t +
                ">" +
                o.text.text +
                "</div>"),
            "rect" == o.type)
          ) {
            u = "";
            if (isTrue(this.settings.shapes.glowing_shapes)) {
              d = "";
              (d +=
                "box-shadow: 0 0 20px 15px rgba(" +
                (c = hexToRgb(this.settings.shapes.glowing_shapes_color) || {
                  r: 0,
                  b: 0,
                  g: 0,
                }).r +
                ", " +
                c.g +
                ", " +
                c.b +
                ", " +
                this.settings.shapes.glow_opacity +
                ");"),
                (u +=
                  '<div class="imp-shape-glow" style="' +
                  (d +=
                    "border-radius: " + o.default_style.border_radius + "px;") +
                  '"></div>');
            }
            e +=
              '<div class="imp-shape ' +
              r +
              ' imp-shape-rect" id="' +
              o.id +
              '" data-shape-title="' +
              o.title +
              '" style="' +
              h +
              '" data-index=' +
              t +
              ">" +
              u +
              "</div>";
          }
          if ("oval" == o.type) {
            u = "";
            if (isTrue(this.settings.shapes.glowing_shapes)) {
              var c;
              d = "";
              (d +=
                "box-shadow: 0 0 20px 15px rgba(" +
                (c = hexToRgb(this.settings.shapes.glowing_shapes_color) || {
                  r: 0,
                  b: 0,
                  g: 0,
                }).r +
                ", " +
                c.g +
                ", " +
                c.b +
                ", " +
                this.settings.shapes.glow_opacity +
                ");"),
                (u +=
                  '<div class="imp-shape-glow" style="' +
                  (d += "border-radius: 50% 50%;") +
                  '"></div>');
            }
            e +=
              '<div class="imp-shape ' +
              r +
              ' imp-shape-oval" id="' +
              o.id +
              '" data-shape-title="' +
              o.title +
              '" style="' +
              h +
              '" data-index=' +
              t +
              ">" +
              u +
              "</div>";
          }
          if ("poly" == o.type) {
            if (o.points.length < 3) continue;
            a +=
              '<polygon class="imp-shape ' +
              r +
              ' imp-shape-poly" style="' +
              h +
              '" data-index=' +
              t +
              ' id="' +
              o.id +
              '" data-shape-title="' +
              o.title +
              '" points="';
            var m = s * (o.width / 100),
              f = n * (o.height / 100);
            o.vs = new Array();
            for (i = 0; i < o.points.length; i++) {
              var v = s * (o.x / 100) + (o.points[i].x / 100) * m,
                y = n * (o.y / 100) + (o.points[i].y / 100) * f;
              (a += v + "," + y + " "), o.vs.push([v, y]);
            }
            a += '"></polygon>';
          }
          if ("path" == o.type) {
            (m = s * (o.width / 100)), (f = n * (o.height / 100));
            a +=
              '<path class="imp-shape ' +
              r +
              ' imp-shape-poly" style="' +
              h +
              '" data-index=' +
              t +
              ' id="' +
              o.id +
              '" data-shape-title="' +
              o.title +
              '" d="' +
              o.d +
              '"></path>';
          }
        }
      a += "</svg>";
      var w = "";
      for (t = 0; t < this.settings.spots.length; t++)
        if (
          !isTrue(this.settings.layers.enable_layers) ||
          parseInt(this.settings.spots[t].layerID, 10) ==
            parseInt(this.settings.runtime.layerID)
        ) {
          h = "";
          (h +=
            "left: " +
            ((o = this.settings.spots[t]).x_image_background +
              o.default_style.background_image_offset_x) +
            "%;"),
            (h +=
              "top: " +
              (o.y_image_background +
                o.default_style.background_image_offset_y) +
              "%;"),
            (h += "width: " + o.width_image_background + "%;"),
            (h += "height: " + o.height_image_background + "%;"),
            "image" == o.default_style.background_type &&
              o.default_style.background_image_url &&
              ((h +=
                "background-image: url(" +
                o.default_style.background_image_url +
                ");"),
              (h +=
                "opacity: " + o.default_style.background_image_opacity + ";"),
              (h +=
                "transform: scale(" +
                o.default_style.background_image_scale +
                ");")),
            (w +=
              '<div class="imp-shape-background-image" style="' +
              h +
              '" data-id="' +
              o.id +
              '"></div>');
        }
      this.shapeContainer.html(e + a), this.imageBackgroundsContainer.html(w);
    },
    drawShapesMenu: function () {
      if (isTrue(this.settings.shapes_menu.enable_shapes_menu)) {
        this.shapesMenuWrap && this.shapesMenuWrap.remove(),
          this.shapesMenuResponsiveButton &&
            this.shapesMenuResponsiveButton.remove(),
          $(".imp-ui-layers-menu-wrap").length > 0 &&
            $(".imp-ui-layers-menu-wrap").css({ right: 20 });
        var t = "",
          i = "imp-shapes-menu-wrap-left";
        "right" == this.settings.shapes_menu.menu_position &&
          (i = "imp-shapes-menu-wrap-right");
        var e = "";
        isTrue(this.settings.shapes_menu.enable_search) &&
          (e = "imp-shapes-menu-wrap-with-search-box"),
          (t += '<div class="imp-shapes-menu-wrap ' + i + " " + e + '">');
        var s = "";
        if (
          (this.responsiveShapesMenu &&
            (s =
              '<div data-imp-id="' +
              this.settings.id +
              '" class="imp-close-responsive-menu"><i class="fa fa-times" aria-hidden="true"></i></div>'),
          isTrue(this.settings.shapes_menu.enable_search) &&
            ((t += '<div class="imp-shapes-menu-search-box">'),
            (t += '   <div class="imp-shapes-menu-search-box-input-wrap">'),
            (t +=
              '       <input type="text" placeholder="Search..." data-image-map-pro-search-id="' +
              this.settings.id +
              '">'),
            (t += '       <i class="fa fa-search" aria-hidden="true"></i>'),
            (t +=
              '       <i class="fa fa-times imp-clear-search" aria-hidden="true" data-image-map-pro-id="' +
              this.settings.id +
              '"></i>'),
            (t += "   </div>"),
            (t += s),
            (t += "</div>")),
          (t += '   <div class="imp-shapes-menu-scroll-wrap">'),
          isTrue(this.settings.shapes_menu.group_by_floor) &&
            isTrue(this.settings.layers.enable_layers))
        )
          for (var n = 0; n < this.settings.layers.layers_list.length; n++) {
            var a = this.settings.layers.layers_list[n];
            t +=
              '<div class="imp-shapes-menu-layer-title" data-imp-content="' +
              a.title +
              '">' +
              a.title +
              "</div>";
            for (var o = 0; o < this.settings.spots.length; o++) {
              var h = this.settings.spots[o];
              (isTrue(
                this.settings.shapes_menu.hide_children_of_connected_shapes
              ) &&
                "" != h.connected_to) ||
                (h.layerID == a.id &&
                  (t +=
                    '<div class="imp-shapes-menu-shape-title" data-imp-image-map-name="' +
                    this.settings.general.name +
                    '" data-imp-highlight-shape-on-mouseover="' +
                    h.title +
                    '" data-imp-focus-shape-on-click="' +
                    h.title +
                    '" data-imp-content="' +
                    h.title +
                    '">' +
                    h.title +
                    "</div>"));
            }
          }
        else
          for (o = 0; o < this.settings.spots.length; o++) {
            h = this.settings.spots[o];
            (isTrue(
              this.settings.shapes_menu.hide_children_of_connected_shapes
            ) &&
              "" != h.connected_to) ||
              (t +=
                '<div class="imp-shapes-menu-shape-title" data-imp-image-map-name="' +
                this.settings.general.name +
                '" data-imp-highlight-shape-on-mouseover="' +
                h.title +
                '" data-imp-focus-shape-on-click="' +
                h.title +
                '" data-imp-content="' +
                h.title +
                '">' +
                h.title +
                "</div>");
          }
        if (
          ((t += "   </div>"),
          (t += "</div>"),
          isTrue(this.settings.shapes_menu.detached_menu))
        )
          $('[data-imp-detached-menu="' + this.settings.id + '"]').html(t),
            (this.shapesMenuWrap = $(
              '[data-imp-detached-menu="' + this.settings.id + '"]'
            ).find(".imp-shapes-menu-wrap"));
        else if (this.responsiveShapesMenu) {
          this.responsiveShapesMenuWrap ||
            ($("body").append(
              '<div data-imp-id="' +
                this.settings.id +
                '" class="imp-responsive-menu"></div>'
            ),
            (this.responsiveShapesMenuWrap = $(
              '.imp-responsive-menu[data-imp-id="' + this.settings.id + '"]'
            ))),
            this.responsiveShapesMenuWrap.append(t),
            (this.shapesMenuWrap = this.responsiveShapesMenuWrap.find(
              ".imp-shapes-menu-wrap"
            ));
          var r = "";
          (r +=
            '<div data-imp-id="' +
            this.settings.id +
            '" class="imp-ui-element imp-shapes-menu-button">'),
            (r += '<i class="fa fa-bars" aria-hidden="true"></i>'),
            (r += "</div>"),
            this.ui.append(r),
            (this.shapesMenuResponsiveButton = this.ui.find(
              ".imp-shapes-menu-button"
            )),
            $(".imp-ui-layers-menu-wrap").length > 0 &&
              $(".imp-ui-layers-menu-wrap").css({ right: 70 }),
            $("#imp-fullscreen-wrap")
              .find(".imp-fullscreen-root-wrap")
              .removeClass("imp-shapes-menu-left"),
            $("#imp-fullscreen-wrap")
              .find(".imp-fullscreen-root-wrap")
              .removeClass("imp-shapes-menu-right");
        } else
          isTrue(this.settings.runtime.is_fullscreen)
            ? ($("#imp-fullscreen-wrap").find(".imp-shapes-menu-wrap").remove(),
              $("#imp-fullscreen-wrap").append(t),
              0 ==
                $("#imp-fullscreen-wrap").find(".imp-fullscreen-root-wrap")
                  .length &&
                this.root.wrap('<div class="imp-fullscreen-root-wrap"></div>'),
              (this.shapesMenuWrap = $("#imp-fullscreen-wrap").find(
                ".imp-shapes-menu-wrap"
              )),
              "left" == this.settings.shapes_menu.menu_position
                ? $("#imp-fullscreen-wrap")
                    .find(".imp-fullscreen-root-wrap")
                    .addClass("imp-shapes-menu-left")
                : $("#imp-fullscreen-wrap")
                    .find(".imp-fullscreen-root-wrap")
                    .addClass("imp-shapes-menu-right"))
            : (0 == this.root.find(".imp-shapes-menu-outer-wrap").length &&
                this.wrap.wrap(
                  '<div class="imp-shapes-menu-outer-wrap"></div>'
                ),
              "left" == this.settings.shapes_menu.menu_position
                ? this.root.find(".imp-shapes-menu-outer-wrap").prepend(t)
                : this.root.find(".imp-shapes-menu-outer-wrap").append(t),
              (this.shapesMenuWrap = this.root.find(".imp-shapes-menu-wrap")),
              isTrue(this.settings.shapes_menu.enable_search)
                ? this.shapesMenuWrap.height(this.wrap.height() - 73)
                : this.shapesMenuWrap.height(this.wrap.height()));
        this.shapesMenuWrap
          .find(
            'input[data-image-map-pro-search-id="' + this.settings.id + '"]'
          )
          .val(this.settings.runtime.menu_search_string),
          this.updateMenuSearch(),
          this.shapesMenuWrap
            .find(".imp-shapes-menu-scroll-wrap")
            .scrollTop(this.settings.runtime.menu_scroll);
      }
    },
    addTooltips: function () {
      if (
        "always" == this.settings.tooltips.fullscreen_tooltips ||
        ("mobile-only" == this.settings.tooltips.fullscreen_tooltips &&
          isMobile())
      ) {
        this.fullscreenTooltipsContainer ||
          ($(
            '.imp-fullscreen-tooltips-container[data-image-map-id="' +
              this.settings.id +
              '"]'
          ).remove(),
          $("body").prepend(
            '<div class="imp-fullscreen-tooltips-container" data-image-map-id="' +
              this.settings.id +
              '"></div>'
          ),
          (this.fullscreenTooltipsContainer = $(
            '.imp-fullscreen-tooltips-container[data-image-map-id="' +
              this.settings.id +
              '"]'
          )));
        for (var t = "", i = 0; i < this.settings.spots.length; i++) {
          var e = "",
            s = hexToRgb(
              (n = this.settings.spots[i]).tooltip_style.background_color
            ) || { r: 0, b: 0, g: 0 };
          if (
            ((e += "padding: " + n.tooltip_style.padding + "px;"),
            (e +=
              "background: rgba(" +
              s.r +
              ", " +
              s.g +
              ", " +
              s.b +
              ", " +
              n.tooltip_style.background_opacity +
              ");"),
            "none" == this.settings.tooltips.tooltip_animation &&
              (e += "opacity: 0;"),
            "fade" == this.settings.tooltips.tooltip_animation &&
              ((e += "opacity: 0;"),
              (e +=
                "transition-property: opacity;-moz-transition-property: opacity;-webkit-transition-property: opacity;")),
            "grow" == this.settings.tooltips.tooltip_animation &&
              ((e +=
                "transform: scale(0, 0);-moz-transform: scale(0, 0);-webkit-transform: scale(0, 0);"),
              (e +=
                "transition-property: transform;-moz-transition-property: -moz-transform;-webkit-transition-property: -webkit-transform;"),
              (e +=
                "transform-origin: 50% 50%;-moz-transform-origin: 50% 50%;-webkit-transform-origin: 50% 50%;")),
            (t +=
              '<div class="imp-fullscreen-tooltip" style="' +
              e +
              '" data-index="' +
              i +
              '">'),
            (t +=
              '   <div class="imp-tooltip-close-button" data-index="' +
              i +
              '"><i class="fa fa-times" aria-hidden="true"></i></div>'),
            "plain-text" == n.tooltip_content.content_type)
          ) {
            e = "";
            t +=
              '<div class="imp-tooltip-plain-text" style="' +
              (e += "color: " + n.tooltip_content.plain_text_color + ";") +
              '">' +
              n.tooltip_content.plain_text +
              "</div>";
          } else
            n.tooltip_content.squares_json
              ? (t += $.squaresRendererRenderObject(
                  n.tooltip_content.squares_json
                ))
              : (t += $.squaresRendererRenderObject(
                  n.tooltip_content.squares_settings
                ));
          t += "</div>";
        }
        this.fullscreenTooltipsContainer.html(t);
      } else {
        for (t = "", i = 0; i < this.settings.spots.length; i++) {
          var n;
          (e = ""),
            (s = hexToRgb(
              (n = this.settings.spots[i]).tooltip_style.background_color
            ) || { r: 0, b: 0, g: 0 });
          (e += "border-radius: " + n.tooltip_style.border_radius + "px;"),
            (e += "padding: " + n.tooltip_style.padding + "px;"),
            (e +=
              "background: rgba(" +
              s.r +
              ", " +
              s.g +
              ", " +
              s.b +
              ", " +
              n.tooltip_style.background_opacity +
              ");"),
            "none" == this.settings.tooltips.tooltip_animation &&
              ((e += "opacity: 0;"),
              (e +=
                "transition-property: transform; -moz-transition-property: -moz-transform; -webkit-transition-property: -webkit-transform;")),
            "fade" == this.settings.tooltips.tooltip_animation &&
              ((e += "opacity: 0;"),
              (e +=
                "transition-property: transform, opacity; -moz-transition-property: -moz-transform, opacity;-webkit-transition-property: -webkit-transform, opacity;")),
            "grow" == this.settings.tooltips.tooltip_animation &&
              ((e +=
                "transform: scale(0, 0);-moz-transform: scale(0, 0);-webkit-transform: scale(0, 0);"),
              (e +=
                "transition-property: transform; -moz-transition-property: -moz-transform; -webkit-transition-property: -webkit-transform;"),
              "top" == n.tooltip_style.position &&
                (e +=
                  "transform-origin: 50% 100%;-moz-transform-origin: 50% 100%;-webkit-transform-origin: 50% 100%;"),
              "bottom" == n.tooltip_style.position &&
                (e +=
                  "transform-origin: 50% 0%;-moz-transform-origin: 50% 0%;-webkit-transform-origin: 50% 0%;"),
              "left" == n.tooltip_style.position &&
                (e +=
                  "transform-origin: 100% 50%;-moz-transform-origin: 100% 50%;-webkit-transform-origin: 100% 50%;"),
              "right" == n.tooltip_style.position &&
                (e +=
                  "transform-origin: 0% 50%;-moz-transform-origin: 0% 50%;-webkit-transform-origin: 0% 50%;")),
            (t +=
              '<div class="imp-tooltip" style="' +
              e +
              '" data-index="' +
              i +
              '">'),
            "top" == n.tooltip_style.position &&
              (t +=
                '   <div class="hs-arrow hs-arrow-bottom" style="border-top-color: rgba(' +
                s.r +
                ", " +
                s.g +
                ", " +
                s.b +
                ", " +
                n.tooltip_style.background_opacity +
                ');"></div>'),
            "bottom" == n.tooltip_style.position &&
              (t +=
                '   <div class="hs-arrow hs-arrow-top" style="border-bottom-color: rgba(' +
                s.r +
                ", " +
                s.g +
                ", " +
                s.b +
                ", " +
                n.tooltip_style.background_opacity +
                ');"></div>'),
            "left" == n.tooltip_style.position &&
              (t +=
                '   <div class="hs-arrow hs-arrow-right" style="border-left-color: rgba(' +
                s.r +
                ", " +
                s.g +
                ", " +
                s.b +
                ", " +
                n.tooltip_style.background_opacity +
                ');"></div>'),
            "right" == n.tooltip_style.position &&
              (t +=
                '   <div class="hs-arrow hs-arrow-left" style="border-right-color: rgba(' +
                s.r +
                ", " +
                s.g +
                ", " +
                s.b +
                ", " +
                n.tooltip_style.background_opacity +
                ');"></div>');
          e = "";
          e += "color: " + n.tooltip_content.plain_text_color + ";";
          var a = {
            containers: [
              {
                id: "sq-container-403761",
                settings: {
                  elements: [
                    {
                      settings: {
                        name: "Paragraph",
                        iconClass: "fa fa-paragraph",
                      },
                      options: { text: { text: n.title } },
                    },
                  ],
                },
              },
            ],
          };
          (t +=
            '<div class="imp-tooltip-title" style="' +
            e +
            '">' +
            $.squaresRendererRenderObject(a) +
            "</div>"),
            "plain-text" == n.tooltip_content.content_type
              ? (t +=
                  '<div class="imp-tooltip-plain-text" style="' +
                  e +
                  '">' +
                  n.tooltip_content.plain_text +
                  "</div>")
              : n.tooltip_content.squares_json
              ? (t += $.squaresRendererRenderObject(
                  n.tooltip_content.squares_json
                ))
              : (t += $.squaresRendererRenderObject(
                  n.tooltip_content.squares_settings
                )),
            (t += "</div>");
        }
        this.tooltipsContainer.prepend(t),
          isTrue(this.settings.tooltips.sticky_tooltips) &&
            this.tooltipsContainer.addClass("imp-sticky-tooltips");
      }
    },
    initFullscreen: function () {
      if (isTrue(this.settings.fullscreen.enable_fullscreen_mode)) {
        var t = "";
        (t +=
          "background: " +
          this.settings.fullscreen.fullscreen_button_color +
          "; "),
          (t +=
            "color: " +
            this.settings.fullscreen.fullscreen_button_text_color +
            "; ");
        var i = '<i class="fa fa-arrows-alt" aria-hidden="true"></i>';
        isTrue(this.settings.runtime.is_fullscreen) &&
          (i = '<i class="fa fa-times" aria-hidden="true"></i>');
        var e = "Go Fullscreen";
        isTrue(this.settings.runtime.is_fullscreen) && (e = "Close Fullscreen");
        var s = "";
        "icon" == this.settings.fullscreen.fullscreen_button_type && (s += i),
          "text" == this.settings.fullscreen.fullscreen_button_type && (s += e),
          "icon_and_text" == this.settings.fullscreen.fullscreen_button_type &&
            (s += i + " " + e);
        var n = "";
        "icon" == this.settings.fullscreen.fullscreen_button_type &&
          (n += "imp-fullscreen-button-icon-only");
        var a = "";
        (a +=
          '<div data-imp-id="' +
          this.settings.id +
          '" style="' +
          t +
          '" class="imp-ui-element ' +
          n +
          " imp-fullscreen-button imp-fullscreen-button-position-" +
          this.settings.fullscreen.fullscreen_button_position +
          '">'),
          (a += s),
          (a += "</div>"),
          this.ui.append(a),
          isTrue(this.settings.runtime.is_fullscreen) &&
            ($(window).scrollTop(0), (fullscreenMap = this));
        var o = this.ui.find(".imp-fullscreen-button");
        (1 !=
          parseInt(this.settings.fullscreen.fullscreen_button_position, 10) &&
          4 !=
            parseInt(
              this.settings.fullscreen.fullscreen_button_position,
              10
            )) ||
          o.css({ "margin-left": -o.outerWidth() / 2 }),
          isTrue(this.settings.fullscreen.start_in_fullscreen_mode) &&
            0 == this.settings.runtime.is_fullscreen &&
            ((this.settings.fullscreen.start_in_fullscreen_mode = 0),
            this.toggleFullscreen());
      }
    },
    initNavigator: function () {
      isTrue(this.settings.zooming.enable_zooming) &&
        isTrue(this.settings.zooming.enable_navigator) &&
        ((this.uiNavigatorRoot = this.ui.find(".imp-ui-navigator-root")),
        (this.uiNavigatorImage = this.ui.find(
          ".imp-ui-navigator-window-image"
        )),
        this.adjustNavigatorSize());
    },
    initLayers: function () {
      if (isTrue(this.settings.layers.enable_layers)) {
        for (
          var t = !1, i = 0;
          i < this.settings.layers.layers_list.length;
          i++
        )
          parseInt(this.settings.layers.layers_list[i].id, 10) ==
            parseInt(this.settings.runtime.layerID, 10) && (t = !0);
        t ||
          (this.settings.runtime.layerID = this.settings.layers.layers_list[0].id),
          this.wrap
            .find(".imp-ui-layers-select")
            .val(this.settings.runtime.layerID);
      }
    },
    initZoom: function () {
      isTrue(this.settings.zooming.enable_zooming) &&
        ((this.zoom = 1),
        (this.targetZoom = 1),
        (this.targetPanX = 0),
        (this.actualPanX = 0),
        (this.targetPanY = 0),
        (this.actualPanY = 0),
        (this.initialPanX = 0),
        (this.initialPanY = 0),
        (this.panDeltaY = 0),
        isTrue(this.settings.zooming.limit_max_zoom_to_image_size)
          ? (this.maxZoomLevel =
              this.settings.general.naturalWidth / this.wrap.width())
          : (this.maxZoomLevel = this.settings.zooming.max_zoom));
    },
    adjustNavigatorSize: function () {
      if (
        isTrue(this.settings.zooming.enable_zooming) &&
        isTrue(this.settings.zooming.enable_navigator)
      )
        if (isTrue(this.settings.runtime.is_fullscreen)) {
          this.navigatorRatio =
            this.uiNavigatorRoot.width() / this.settings.general.width;
          var t =
              this.settings.general.naturalWidth /
              this.settings.general.naturalHeight,
            i = window.innerWidth / window.innerHeight,
            e = 0,
            s = 0;
          t < i
            ? t < 1
              ? ((e = 150 * t),
                (s = 150),
                (this.uiNavigatorWindowWidth = s * i),
                (this.uiNavigatorWindowHeight = s),
                (this.navigatorMarginX =
                  e / 2 - this.uiNavigatorWindowWidth / 2),
                (this.navigatorMarginY = 0))
              : ((e = 150),
                (s = 150 / t),
                (this.uiNavigatorWindowWidth = s * i),
                (this.uiNavigatorWindowHeight = s),
                (this.navigatorMarginX =
                  e / 2 - this.uiNavigatorWindowWidth / 2),
                (this.navigatorMarginY = 0))
            : t < 1
            ? ((e = 150 * t),
              (s = 150),
              (this.uiNavigatorWindowWidth = e),
              (this.uiNavigatorWindowHeight = e / i),
              (this.navigatorMarginX = 0),
              (this.navigatorMarginY =
                s / 2 - this.uiNavigatorWindowHeight / 2))
            : ((e = 150),
              (s = 150 / t),
              (this.uiNavigatorWindowWidth = e),
              (this.uiNavigatorWindowHeight = e / i),
              (this.navigatorMarginX = 0),
              (this.navigatorMarginY =
                s / 2 - this.uiNavigatorWindowHeight / 2));
        } else
          (this.navigatorRatio =
            this.uiNavigatorRoot.width() / this.wrap.width()),
            (this.uiNavigatorWindowWidth = this.uiNavigatorRoot.width()),
            (this.uiNavigatorWindowHeight = this.uiNavigatorRoot.height());
    },
    measureTooltipSize: function (t) {
      if (
        !(
          "always" == this.settings.tooltips.fullscreen_tooltips ||
          ("mobile-only" == this.settings.tooltips.fullscreen_tooltips &&
            isMobile())
        )
      ) {
        var i = this.settings.spots[t],
          e = this.tooltipsContainer.find(
            '.imp-tooltip[data-index="' + t + '"]'
          );
        isTrue(i.tooltip_style.auto_width) ||
          e.css({ width: i.tooltip_style.width });
        e[0].getBoundingClientRect();
        e.data("imp-measured-width", e.outerWidth()),
          e.data("imp-measured-height", e.outerHeight());
      }
    },
    animateShapesLoop: function () {
      if ("none" != this.settings.shapes.pageload_animation) {
        this.didAnimateShapesOnPageload = !0;
        for (
          var t = 750 / this.settings.spots.length,
            i = shuffle(this.settings.spots.slice()),
            e = 0;
          e < i.length;
          e++
        )
          this.animateShape(i[e], t * e);
      }
    },
    animateShape: function (t, i) {
      var e = this,
        s = $("#" + t.id),
        n = 0;
      setTimeout(function () {
        if (
          ("fade" == e.settings.shapes.pageload_animation &&
            s.css({ opacity: t.default_style.opacity }),
          "grow" == e.settings.shapes.pageload_animation &&
            s.css({
              transform: "scale(1, 1)",
              "-moz-transform": "scale(1, 1)",
              "-webkit-transform": "scale(1, 1)",
            }),
          "fall-down" == e.settings.shapes.pageload_animation &&
            (s.css({ opacity: t.default_style.opacity }), "spot" == t.type))
        ) {
          s.css({ "transition-property": "opacity" }),
            (function t() {
              requestAnimationFrame(function () {
                var i = easeOutBounce(undefined, (n += 0.01666), -200, 200, 1);
                s.css({ transform: "translateY(" + i + "px)" }), n <= 1 && t();
              });
            })();
        }
      }, i);
    },
    events: function () {
      var t = this;
      $(document).off("mousedown." + this.settings.id),
        $(document).on("mousedown." + this.settings.id, function (i) {
          touch || t.handleEventStart(i);
        }),
        $(document).off("mousemove." + this.settings.id),
        $(document).on("mousemove." + this.settings.id, function (i) {
          touch || t.handleEventMove(i);
        }),
        $(document).off("mouseup." + this.settings.id),
        $(document).on("mouseup." + this.settings.id, function (i) {
          touch || t.handleEventEnd(i);
        }),
        $(document).off("touchstart." + this.settings.id),
        $(document).on("touchstart." + this.settings.id, function (i) {
          touch || t.handleEventStart(i);
        }),
        $(document).off("touchmove." + this.settings.id),
        $(document).on("touchmove." + this.settings.id, function (i) {
          if (!touch)
            return (
              t.handleEventMove(i),
              (!t.panning || 0 == t.panDeltaY) && !t.pinching && void 0
            );
        }),
        $(document).off("touchend." + this.settings.id),
        $(document).on("touchend." + this.settings.id, function (i) {
          touch || t.handleEventEnd(i);
        }),
        this.wrap.off("mousewheel"),
        this.wrap.on("mousewheel", function (i) {
          if (!touch && isTrue(t.settings.zooming.enable_zooming)) {
            if (isTrue(t.settings.zooming.hold_ctrl_to_zoom))
              return (t.mac && t.cmdKeyDown) || (!t.mac && t.ctrlKeyDown)
                ? (t.handleEventEnd(i), !1)
                : (t.displayScrollMessage(), !0);
            if (
              (t.handleEventEnd(i),
              (i.deltaY < 0 && t.targetZoom > 1) ||
                (i.deltaY > 0 && t.targetZoom < t.maxZoomLevel))
            )
              return !1;
          }
        }),
        $(document).off("keydown." + this.settings.id),
        $(document).on("keydown." + this.settings.id, function (i) {
          t.handleKeyDownEvent(i);
        }),
        $(document).off("keyup." + this.settings.id),
        $(document).on("keyup." + this.settings.id, function (i) {
          t.handleKeyUpEvent(i);
        }),
        $(document).off(
          "click." + this.settings.id,
          ".imp-tooltip-close-button"
        ),
        $(document).on(
          "click." + this.settings.id,
          ".imp-tooltip-close-button",
          function () {
            t.hideAllTooltips();
          }
        ),
        $(document).off("change." + this.settings.id, ".imp-ui-layers-select"),
        $(document).on(
          "change." + this.settings.id,
          ".imp-ui-layers-select",
          function () {
            var i = t.wrap.find(".imp-ui-layers-select").val();
            t.switchLayer(i);
          }
        ),
        $(document).off(
          "keyup." + this.settings.id,
          '[data-image-map-pro-search-id="' + this.settings.id + '"]'
        ),
        $(document).on(
          "keyup." + this.settings.id,
          '[data-image-map-pro-search-id="' + this.settings.id + '"]',
          function (i) {
            t.updateMenuSearch();
          }
        ),
        $(document).off(
          "change." + this.settings.id,
          '[data-image-map-pro-search-id="' + this.settings.id + '"]'
        ),
        $(document).on(
          "change." + this.settings.id,
          '[data-image-map-pro-search-id="' + this.settings.id + '"]',
          function (i) {
            t.updateMenuSearch();
          }
        ),
        $(window).off(
          "resize." +
            this.settings.general.id +
            this.settings.runtime.is_fullscreen
        ),
        $(window).on(
          "resize." +
            this.settings.general.id +
            this.settings.runtime.is_fullscreen,
          function () {
            if (
              ((t.wrapWidth = t.wrap.width()),
              (t.wrapHeight = t.wrap.height()),
              (t.wrapOffsetLeft = t.wrap.offset().left),
              (t.wrapOffsetTop = t.wrap.offset().top),
              t.openedTooltips.length > 0)
            )
              for (var i = 0; i < t.openedTooltips.length; i++)
                t.updateTooltipPosition(t.openedTooltips[i]);
            if (
              (t.resetZoomAndPan(),
              t.adjustNavigatorSize(),
              isTrue(t.settings.shapes_menu.enable_shapes_menu))
            ) {
              var e = t.responsiveShapesMenu,
                s = t.root.width();
              t.settings.runtime.is_fullscreen && (s = $(window).width()),
                isMobile() || s / 3 < 240
                  ? (t.responsiveShapesMenu = !0)
                  : (t.responsiveShapesMenu = !1),
                e != t.responsiveShapesMenu && t.drawShapesMenu(),
                !isTrue(t.settings.shapes_menu.enable_shapes_menu) ||
                  isTrue(t.settings.shapes_menu.detached_menu) ||
                  t.settings.runtime.is_fullscreen ||
                  t.responsiveShapesMenu ||
                  (isTrue(t.settings.shapes_menu.enable_search)
                    ? t.shapesMenuWrap.height(t.wrap.height() - 73)
                    : t.shapesMenuWrap.height(t.wrap.height()));
            }
            fullscreenMap && fullscreenMap.adjustSize(),
              "" == t.settings.image.url &&
                (isTrue(t.settings.general.responsive)
                  ? (t.wrap.css({
                      width: "100%",
                      height: t.settings.general.height,
                      "max-width": t.settings.general.width,
                      "max-height": t.settings.general.height,
                    }),
                    t.wrap.css({
                      height:
                        t.wrap.width() *
                        (t.settings.general.height / t.settings.general.width),
                    }))
                  : t.wrap.css({
                      width: t.settings.general.width,
                      height: t.settings.general.height,
                    }));
          }
        );
    },
    disableEvents: function () {
      $(document).off("mousedown." + this.settings.id),
        $(document).off("mousemove." + this.settings.id),
        $(document).off("mouseup." + this.settings.id),
        $(document).off("touchstart." + this.settings.id),
        $(document).off("touchmove." + this.settings.id),
        $(document).off("touchend." + this.settings.id),
        this.wrap.off("mousewheel"),
        $(document).off(
          "click." + this.settings.id,
          ".imp-tooltip-close-button"
        ),
        $(document).off("change." + this.settings.id, ".imp-ui-layers-select"),
        $(document).off(
          "keyup." + this.settings.id,
          '[data-image-map-pro-search-id="' + this.settings.id + '"]'
        ),
        $(document).off(
          "change." + this.settings.id,
          '[data-image-map-pro-search-id="' + this.settings.id + '"]'
        );
    },
    isEventOnHTMLAPIElement: function (t) {
      return (
        !!$(t.target).data("imp-highlight-shape-on-mouseover") ||
        !!$(t.target).data("imp-highlight-shape-on-click") ||
        !!$(t.target).data("imp-unhighlight-shape-on-mouseover") ||
        !!$(t.target).data("imp-unhighlight-shape-on-click") ||
        !!$(t.target).data("imp-open-tooltip-on-mouseover") ||
        !!$(t.target).data("imp-open-tooltip-on-click") ||
        !!$(t.target).data("imp-close-tooltip-on-mouseover") ||
        !!$(t.target).data("imp-close-tooltip-on-click") ||
        !!$(t.target).data("imp-trigger-shape-on-mouseover") ||
        !!$(t.target).data("imp-trigger-shape-on-click") ||
        !!$(t.target).data("imp-untrigger-shape-on-mouseover") ||
        !!$(t.target).data("imp-untrigger-shape-on-click") ||
        !!$(t.target).data("imp-focus-shape-on-click") ||
        !!$(t.target).data("imp-focus-shape-on-mouseover")
      );
    },
    handleEventStart: function (t) {
      (this.targetZoom = this.zoom),
        (this.targetPanX = this.actualPanX),
        (this.targetPanY = this.actualPanY);
      var i = this.getEventCoordinates(t);
      if (
        !this.isEventOnHTMLAPIElement(t) &&
        isTrue(this.settings.zooming.enable_zooming)
      ) {
        if (
          $(t.target).closest(".imp-ui-navigator-root").length > 0 &&
          $(t.target).closest(".imp-ui-navigator-root").data("imp-id") ==
            this.settings.id
        )
          return (
            (this.ix = i.x),
            (this.iy = i.y),
            void (this.panningOnNavigator = !0)
          );
        if (t.originalEvent.touches && t.originalEvent.touches.length > 1)
          return (
            (this.pinchInitial[0] = {
              x: t.originalEvent.touches[0].pageX,
              y: t.originalEvent.touches[0].pageY,
            }),
            (this.pinchInitial[1] = {
              x: t.originalEvent.touches[1].pageX,
              y: t.originalEvent.touches[1].pageY,
            }),
            (this.initialPanX = this.actualPanX),
            (this.initialPanY = this.actualPanY),
            (this.ix =
              (t.originalEvent.touches[0].pageX +
                t.originalEvent.touches[1].pageX) /
              2),
            (this.iy =
              (t.originalEvent.touches[0].pageY +
                t.originalEvent.touches[1].pageY) /
              2),
            (this.lastX = this.ix),
            (this.lastY = this.iy),
            (this.pinchInitialDistance = Math.sqrt(
              Math.pow(this.pinchInitial[1].x - this.pinchInitial[0].x, 2) +
                Math.pow(this.pinchInitial[1].y - this.pinchInitial[0].y, 2)
            )),
            (this.pinchInitialZoom = this.zoom),
            void (this.pinching = !0)
          );
        !this.panning &&
          0 == $(t.target).closest(".imp-ui").length &&
          i.x > this.wrapOffsetLeft &&
          i.x < this.wrapOffsetLeft + this.wrapWidth &&
          i.y > this.wrapOffsetTop &&
          i.y < this.wrapOffsetTop + this.wrapHeight &&
          ((this.ix = i.x),
          (this.iy = i.y),
          (this.initialPanX = this.actualPanX),
          (this.initialPanY = this.actualPanY),
          (this.panning = !0));
      }
    },
    handleEventMove: function (t) {
      if (
        (Date.now() - this.lastWrapRecalc > 1e3 &&
          ((this.lastWrapRecalc = Date.now()),
          (this.wrapWidth = this.wrap.width()),
          (this.wrapHeight = this.wrap.height()),
          (this.wrapOffsetLeft = this.wrap.offset().left),
          (this.wrapOffsetTop = this.wrap.offset().top)),
        !this.fullscreenTooltipVisible && !this.isEventOnHTMLAPIElement(t))
      ) {
        var i = this.getEventRelativeCoordinates(t),
          e = this.matchShapeToCoords(i),
          s = this.getEventCoordinates(t);
        if (isTrue(this.settings.zooming.enable_zooming)) {
          if (this.panningOnNavigator) {
            var n =
                ((s.x - this.uiNavigatorRoot.offset().left) /
                  this.navigatorRatio) *
                this.targetZoom,
              a =
                ((s.y - this.uiNavigatorRoot.offset().top) /
                  this.navigatorRatio) *
                this.targetZoom;
            return void this.panTo(n, a);
          }
          if (this.pinching) return this.pinch(t), void (this.didPan = !0);
          if (this.panning) {
            s = this.getEventCoordinates(t);
            return this.pan(s.x, s.y), void (this.didPan = !0);
          }
        }
        if (
          (!this.isPointInsideVisibleTooltip(t) ||
            isTrue(this.settings.tooltips.sticky_tooltips)) &&
          !$(t.target).data("imp-highlight-shape-on-mouseover") &&
          0 ==
            $(t.target).closest("[data-imp-highlight-shape-on-mouseover]")
              .length &&
          !$(t.target).data("imp-trigger-shape-on-mouseover") &&
          0 ==
            $(t.target).closest("[data-imp-trigger-shape-on-mouseover]").length
        ) {
          if (1 == $(t.target).closest(".imp-ui").length)
            return (
              this.unhighlightAllShapes(),
              void (
                "mouseover" == this.settings.tooltips.show_tooltips &&
                this.hideAllTooltips()
              )
            );
          -1 != e &&
            ((s.x > this.wrapOffsetLeft &&
              s.x < this.wrapOffsetLeft + this.wrapWidth &&
              s.y > this.wrapOffsetTop &&
              s.y < this.wrapOffsetTop + this.wrapHeight) ||
              this.settings.runtime.is_fullscreen) &&
            (isTrue(this.settings.shapes.glowing_shapes) &&
              isTrue(this.settings.shapes.stop_glowing_on_mouseover) &&
              this.wrap.addClass("imp-no-glow"),
            this.didPan ||
              (this.isShapeHighlighted(e) ||
                (this.unhighlightAllShapes(),
                "mouseover" == this.settings.tooltips.show_tooltips &&
                  this.hideAllTooltips(),
                isTrue(this.settings.tooltips.show_title_on_mouseover) &&
                  "click" == this.settings.tooltips.show_tooltips &&
                  this.hideAllTitles(),
                this.highlightShape(e, !0)),
              isTrue(this.settings.tooltips.enable_tooltips) &&
                ("mouseover" == this.settings.tooltips.show_tooltips &&
                  isTrue(this.settings.spots[e].tooltip.enable_tooltip) &&
                  this.showTooltip(e),
                "click" == this.settings.tooltips.show_tooltips &&
                  isTrue(this.settings.tooltips.show_title_on_mouseover) &&
                  isTrue(this.settings.spots[e].tooltip.enable_tooltip) &&
                  this.showTooltipTitle(e),
                this.openedTooltips.length > 0 &&
                  isTrue(this.settings.tooltips.sticky_tooltips) &&
                  "mouseover" == this.settings.tooltips.show_tooltips &&
                  this.updateTooltipPosition(
                    this.openedTooltips[this.openedTooltips.length - 1],
                    t
                  ),
                isTrue(this.settings.tooltips.show_title_on_mouseover) &&
                  "click" == this.settings.tooltips.show_tooltips &&
                  -1 == this.openedTooltips.indexOf(e) &&
                  this.updateTooltipPosition(e, t)))),
            $(t.target).is("video") ||
              $(t.target).closest("video").length > 0 ||
              ((-1 == e ||
                ((s.x < this.wrapOffsetLeft ||
                  s.x > this.wrapOffsetLeft + this.wrapWidth ||
                  s.y < this.wrapOffsetTop ||
                  s.y > this.wrapOffsetTop + this.wrapHeight) &&
                  !this.settings.runtime.is_fullscreen)) &&
                (this.unhighlightAllShapes(),
                isTrue(this.settings.tooltips.show_title_on_mouseover) &&
                  "click" == this.settings.tooltips.show_tooltips &&
                  this.hideAllTitles(),
                "mouseover" == this.settings.tooltips.show_tooltips &&
                  this.openedTooltips.length > 0 &&
                  this.hideAllTooltips()));
        }
      }
    },
    handleEventEnd: function (t) {
      if (!this.isEventOnHTMLAPIElement(t)) {
        if (isTrue(this.settings.zooming.enable_zooming)) {
          if (
            (this.panning &&
              ((this.panning = !1),
              this.tooltipsContainer.removeClass("imp-no-transition")),
            this.pinching && (this.pinching = !1),
            "mousewheel" == t.type)
          )
            return (
              this.hideAllTooltips(),
              this.unhighlightAllShapes(),
              t.deltaY > 0 && this.zoomIn(t),
              void (t.deltaY < 0 && this.zoomOut(t))
            );
          if (
            this.panningOnNavigator &&
            $(t.target).closest(".imp-ui-navigator-root").length > 0 &&
            $(t.target).closest(".imp-ui-navigator-root").data("imp-id") ==
              this.settings.id
          ) {
            this.panningOnNavigator = !1;
            var i =
                (((o = this.getEventCoordinates(t)).x -
                  this.uiNavigatorRoot.offset().left) /
                  this.navigatorRatio) *
                this.targetZoom,
              e =
                ((o.y - this.uiNavigatorRoot.offset().top) /
                  this.navigatorRatio) *
                this.targetZoom;
            return void this.panTo(i, e);
          }
          if (
            (this.panningOnNavigator && (this.panningOnNavigator = !1),
            $(t.target).closest(".imp-ui-zoom-button").length > 0 &&
              $(t.target).closest(".imp-ui-zoom-button").data("imp-id") ==
                this.settings.id)
          )
            return void ($(t.target).closest(".imp-ui-zoom-button-zoom-in")
              .length > 0
              ? this.zoomIn()
              : this.zoomOut());
        }
        if (
          ($(t.target).closest(".imp-fullscreen-button").length > 0 &&
            $(t.target).closest(".imp-fullscreen-button").data("imp-id") ==
              this.settings.id &&
            this.toggleFullscreen(),
          $(t.target).closest(".imp-shapes-menu-button").length > 0 &&
            $(t.target).closest(".imp-shapes-menu-button").data("imp-id") ==
              this.settings.id &&
            this.showResponsiveShapesMenu(),
          $(t.target).closest(".imp-close-responsive-menu").length > 0 &&
            $(t.target).closest(".imp-close-responsive-menu").data("imp-id") ==
              this.settings.id &&
            this.hideResponsiveShapesMenu(),
          $(t.target).closest(".imp-ui-layer-switch-up").length > 0 &&
            $(t.target).closest(".imp-ui-layer-switch-up").data("imp-id") ==
              this.settings.id)
        )
          for (var s = 0; s < this.settings.layers.layers_list.length; s++)
            if (
              this.settings.layers.layers_list[s].id ==
                this.settings.runtime.layerID &&
              s > 0
            ) {
              var n = this.settings.layers.layers_list[s - 1].id;
              this.switchLayer(n);
              break;
            }
        if (
          $(t.target).closest(".imp-ui-layer-switch-down").length > 0 &&
          $(t.target).closest(".imp-ui-layer-switch-down").data("imp-id") ==
            this.settings.id
        )
          for (s = 0; s < this.settings.layers.layers_list.length; s++)
            if (
              this.settings.layers.layers_list[s].id ==
                this.settings.runtime.layerID &&
              s < this.settings.layers.layers_list.length - 1
            ) {
              n = this.settings.layers.layers_list[s + 1].id;
              this.switchLayer(n);
              break;
            }
        if (
          ($(t.target).hasClass("imp-clear-search") &&
            $(t.target).data("image-map-pro-id") == this.settings.id &&
            ($(
              'input[data-image-map-pro-search-id="' + this.settings.id + '"]'
            ).val(""),
            this.updateMenuSearch()),
          0 == $(t.target).closest(".imp-tooltip").length &&
            !this.fullscreenTooltipVisible)
        ) {
          if (1 == $(t.target).closest(".imp-ui").length)
            return (
              this.unhighlightAllShapes(),
              void (
                "mouseover" == this.settings.tooltips.show_tooltips &&
                this.hideAllTooltips()
              )
            );
          var a = this.getEventRelativeCoordinates(t),
            o = ((s = this.matchShapeToCoords(a)), this.getEventCoordinates(t));
          -1 != s &&
            ((o.x > this.wrapOffsetLeft &&
              o.x < this.wrapOffsetLeft + this.wrapWidth &&
              o.y > this.wrapOffsetTop &&
              o.y < this.wrapOffsetTop + this.wrapHeight) ||
              this.settings.runtime.is_fullscreen) &&
            (this.didPan ||
              (this.isShapeHighlighted(s) ||
                (this.unhighlightAllShapes(),
                "mouseover" == this.settings.tooltips.show_tooltips &&
                  this.hideAllTooltips(),
                this.highlightShape(s, !0)),
              isTrue(this.settings.tooltips.enable_tooltips) &&
                isTrue(this.settings.spots[s].tooltip.enable_tooltip) &&
                this.showTooltip(s),
              this.openedTooltips.length > 0 &&
                isTrue(this.settings.tooltips.sticky_tooltips) &&
                "mouseover" == this.settings.tooltips.show_tooltips &&
                this.updateTooltipPosition(
                  this.openedTooltips[this.openedTooltips.length - 1],
                  t
                ),
              isTrue(this.settings.zooming.enable_zooming) &&
                this.focusShape(s)),
            this.performClickAction(s)),
            (-1 == s ||
              ((o.x < this.wrapOffsetLeft ||
                o.x > this.wrapOffsetLeft + this.wrapWidth ||
                o.y < this.wrapOffsetTop ||
                o.y > this.wrapOffsetTop + this.wrapHeight) &&
                !this.settings.runtime.is_fullscreen)) &&
              (this.hideAllTooltips(),
              this.didPan || this.unhighlightAllShapes()),
            t.originalEvent.touches &&
              0 == t.originalEvent.touches.length &&
              (this.didPan = !1),
            t.originalEvent.touches || (this.didPan = !1);
        }
      }
    },
    handleKeyDownEvent: function (t) {
      t.ctrlKey && (this.ctrlKeyDown = !0), t.metaKey && (this.cmdKeyDown = !0);
    },
    handleKeyUpEvent: function (t) {
      (this.ctrlKeyDown = !1), (this.cmdKeyDown = !1);
    },
    getEventRelativeCoordinates: function (t) {
      var i, e;
      if (
        "touchstart" == t.type ||
        "touchmove" == t.type ||
        "touchend" == t.type ||
        "touchcancel" == t.type
      ) {
        var s = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0];
        (i = s.pageX), (e = s.pageY);
      } else
        ("mousedown" != t.type &&
          "mouseup" != t.type &&
          "mousemove" != t.type &&
          "mouseover" != t.type &&
          "mouseout" != t.type &&
          "mouseenter" != t.type &&
          "mouseleave" != t.type) ||
          ((i = t.pageX), (e = t.pageY));
      return (
        (i -= this.zoomWrap.offset().left),
        (e -= this.zoomWrap.offset().top),
        {
          x: (i = (i / (this.wrap.width() * this.zoom)) * 100),
          y: (e = (e / (this.wrap.height() * this.zoom)) * 100),
        }
      );
    },
    getEventCoordinates: function (t) {
      var i, e;
      if (
        "touchstart" == t.type ||
        "touchmove" == t.type ||
        "touchend" == t.type ||
        "touchcancel" == t.type
      ) {
        var s = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0];
        (i = s.pageX), (e = s.pageY);
      } else
        ("mousedown" != t.type &&
          "mouseup" != t.type &&
          "mousemove" != t.type &&
          "mouseover" != t.type &&
          "mouseout" != t.type &&
          "mouseenter" != t.type &&
          "mouseleave" != t.type) ||
          ((i = t.pageX), (e = t.pageY));
      return { x: i, y: e };
    },
    matchShapeToCoords: function (t) {
      for (var i = this.settings.spots.length - 1; i >= 0; i--)
        if (
          !isTrue(this.settings.layers.enable_layers) ||
          parseInt(this.settings.spots[i].layerID, 10) ==
            this.settings.runtime.layerID
        ) {
          var e = this.settings.spots[i];
          if (!isTrue(e.static)) {
            if ("poly" == e.type || "path" == e.type) {
              var s = (t.x / 100) * this.zoomWrap.width(),
                n = (t.y / 100) * this.zoomWrap.height();
              if (
                isPointInsidePolygon(
                  (s =
                    (s * this.settings.general.naturalWidth) /
                    this.zoomWrap.width()),
                  (n =
                    (n * this.settings.general.naturalHeight) /
                    this.zoomWrap.height()),
                  e.vs
                )
              )
                return i;
            }
            if ("spot" == e.type) {
              var a = e.width < 44 ? 44 : e.width,
                o = e.height < 44 ? 44 : e.height;
              (a /= this.zoom), (o /= this.zoom);
              (s = (t.x / 100) * this.wrap.width()),
                (n = (t.y / 100) * this.wrap.height());
              var h = (e.x / 100) * this.wrap.width() - a / 2,
                r = (e.y / 100) * this.wrap.height() - o / 2,
                l = a,
                p = o;
              if (
                (isTrue(e.default_style.icon_is_pin) &&
                  isTrue(e.default_style.use_icon) &&
                  ((r -= o / 2), e.height < 44 && (r += e.height / 2)),
                isPointInsideRect(s, n, h, r, l, p))
              )
                return i;
            }
            if (
              "rect" == e.type &&
              isPointInsideRect(t.x, t.y, e.x, e.y, e.width, e.height)
            )
              return i;
            if ("oval" == e.type)
              if (
                isPointInsideEllipse(
                  (s = t.x),
                  (n = t.y),
                  e.x + e.width / 2,
                  e.y + e.height / 2,
                  (h = e.width / 2),
                  (r = e.height / 2)
                )
              )
                return i;
            e.type;
          }
        }
      return -1;
    },
    isPointInsideVisibleTooltip: function (t) {
      for (var i = 0; i < this.openedTooltips.length; i++) {
        var e = this.getEventCoordinates(t),
          s = this.tooltipsContainer.find(
            '.imp-tooltip[data-index="' + this.openedTooltips[i] + '"]'
          ),
          n = this.openedTooltips[i];
        (e.x = ((e.x - this.wrap.offset().left) / this.wrap.width()) * 100),
          (e.y = ((e.y - this.wrap.offset().top) / this.wrap.height()) * 100);
        var a = 0;
        a =
          "spot" == this.settings.spots[n].type
            ? this.settings.spots[n].tooltip_style.buffer
            : this.settings.spots[n].tooltip_style.buffer * this.zoom;
        var o = s.outerWidth(),
          h = s.outerHeight(),
          r = s.offset().left - this.wrap.offset().left,
          l = s.offset().top - this.wrap.offset().top;
        (r = (r / this.wrap.width()) * 100),
          (l = (l / this.wrap.height()) * 100),
          (o = (o / this.wrap.width()) * 100),
          (h = (h / this.wrap.height()) * 100);
        var p = [];
        if ("left" == this.settings.spots[n].tooltip_style.position)
          p = [
            [r, l],
            [r + o, l],
            [
              r + o + (a = (a / this.wrap.width()) * 100),
              l + h - h / 3 - h / 3,
            ],
            [r + o + a, l + h - h / 3],
            [r + o, l + h],
            [r, l + h],
          ];
        if ("right" == this.settings.spots[n].tooltip_style.position)
          p = [
            [r, l],
            [r + o, l],
            [r + o, l + h],
            [r, l + h],
            [r - (a = (a / this.wrap.width()) * 100), l + h - h / 3],
            [r - a, l + h - h / 3 - h / 3],
          ];
        if ("top" == this.settings.spots[n].tooltip_style.position)
          p = [
            [r, l],
            [r + o, l],
            [r + o, l + h],
            [r + o - o / 3, l + h + (a = (a / this.wrap.height()) * 100)],
            [r + o - o / 3 - o / 3, l + h + a],
            [r, l + h],
          ];
        if ("bottom" == this.settings.spots[n].tooltip_style.position)
          p = [
            [r, l],
            [r + o - o / 3 - o / 3, l - (a = (a / this.wrap.height()) * 100)],
            [r + o - o / 3, l - a],
            [r + o, l],
            [r + o, l + h],
            [r, l + h],
          ];
        return !!isPointInsidePolygon(e.x, e.y, p);
      }
    },
    getIndexOfShapeWithID: function (t) {
      for (var i = 0; i < this.settings.spots.length; i++)
        if (this.settings.spots[i].id == t) return i;
    },
    calcStyles: function (t, i) {
      var e = this.settings.spots[i],
        s = "";
      if ("spot" == e.type) {
        (s += "left: " + e.x + "%;"),
          (s += "top: " + e.y + "%;"),
          (s += "width: " + e.width + "px;"),
          (s += "height: " + e.height + "px;"),
          this.didAnimateShapesOnPageload ||
            ("fall-down" == this.settings.shapes.pageload_animation
              ? ((s += "opacity: 0;"), (s += "transform: translateY(-500px);"))
              : "grow" == this.settings.shapes.pageload_animation
              ? ((s += "opacity: " + t.opacity + ";"),
                (s += "transform: scale(0);"))
              : "fade" == this.settings.shapes.pageload_animation
              ? ((s += "opacity: 0;"),
                (s += "transform: scale(" + 1 / this.zoom + ");"))
              : ((s += "opacity: " + t.opacity + ";"),
                (s += "transform: scale(" + 1 / this.zoom + ");")));
        var n = -e.width / 2,
          a = -e.height / 2;
        if (!isTrue(e.default_style.use_icon)) {
          var o = hexToRgb(t.background_color) || { r: 0, b: 0, g: 0 },
            h = hexToRgb(t.border_color) || { r: 0, b: 0, g: 0 };
          (s += "border-radius: " + t.border_radius + "px;"),
            (s +=
              "background: rgba(" +
              o.r +
              ", " +
              o.g +
              ", " +
              o.b +
              ", " +
              t.background_opacity +
              ");"),
            (s += "border-width: " + t.border_width + "px;"),
            (s += "border-style: " + t.border_style + ";"),
            (s +=
              "border-color: rgba(" +
              h.r +
              ", " +
              h.g +
              ", " +
              h.b +
              ", " +
              t.border_opacity +
              ");");
        }
        if (
          isTrue(e.default_style.use_icon) &&
          (isTrue(e.default_style.icon_is_pin) && (n = -e.height),
          "library" == e.default_style.icon_type)
        ) {
          var r = hexToRgb(t.icon_fill) || { r: 0, b: 0, g: 0 };
          s +=
            "color: rgba(" +
            r.r +
            ", " +
            r.g +
            ", " +
            r.b +
            ", " +
            t.opacity +
            ");";
        }
        (s += "margin-left: " + a + "px;"), (s += "margin-top: " + n + "px;");
      }
      if ("text" == e.type) {
        var l = hexToRgb(e.text.text_color);
        (s += "left: " + e.x + "%;"),
          (s += "top: " + e.y + "%;"),
          (s += "font-family: " + e.text.font_family + ";"),
          (s += "font-size: " + e.text.font_size + "px;"),
          (s += "font-weight: " + e.text.font_weight + ";"),
          (s +=
            "color: rgba(" +
            l.r +
            ", " +
            l.g +
            ", " +
            l.b +
            ", " +
            e.text.text_opacity +
            ");"),
          this.didAnimateShapesOnPageload ||
            ("grow" == this.settings.shapes.pageload_animation
              ? ((s += "opacity: " + t.opacity + ";"),
                (s += "transform: scale(0);"))
              : "fade" == this.settings.shapes.pageload_animation
              ? ((s += "opacity: 0;"),
                (s += "transform: scale(" + 1 / this.zoom + ");"))
              : ((s += "opacity: " + t.opacity + ";"),
                (s += "transform: scale(" + 1 / this.zoom + ");")));
      }
      if ("rect" == e.type || "oval" == e.type) {
        var p = t.border_radius + "px";
        "oval" == e.type && (p = "50% 50%");
        (o = hexToRgb(t.background_color) || { r: 0, b: 0, g: 0 }),
          (h = hexToRgb(t.border_color) || { r: 0, b: 0, g: 0 });
        (s += "left: " + e.x + "%;"),
          (s += "top: " + e.y + "%;"),
          (s += "width: " + e.width + "%;"),
          (s += "height: " + e.height + "%;"),
          "color" == t.background_type &&
            (s +=
              "background: rgba(" +
              o.r +
              ", " +
              o.g +
              ", " +
              o.b +
              ", " +
              t.background_opacity +
              ");"),
          (s += "border-width: " + t.border_width + "px;"),
          (s += "border-style: " + t.border_style + ";"),
          (s +=
            "border-color: rgba(" +
            h.r +
            ", " +
            h.g +
            ", " +
            h.b +
            ", " +
            t.border_opacity +
            ");"),
          (s += "border-radius: " + p + ";"),
          this.didAnimateShapesOnPageload ||
            ("grow" == this.settings.shapes.pageload_animation
              ? ((s += "opacity: " + t.opacity + ";"),
                (s += "transform: scale(0);"))
              : "fade" == this.settings.shapes.pageload_animation
              ? ((s += "opacity: 0;"), (s += "transform: scale(1);"))
              : ((s += "opacity: " + t.opacity + ";"),
                (s += "transform: scale(1);")));
      }
      if ("poly" == e.type || "path" == e.type) {
        var g = hexToRgb(t.background_color) || { r: 0, b: 0, g: 0 },
          d = hexToRgb(t.stroke_color) || { r: 0, b: 0, g: 0 };
        "color" == t.background_type
          ? (s +=
              "fill: rgba(" +
              g.r +
              ", " +
              g.g +
              ", " +
              g.b +
              ", " +
              t.background_opacity +
              ");")
          : (s += "fill: rgba(0, 0, 0, 0);"),
          (s +=
            "stroke: rgba(" +
            d.r +
            ", " +
            d.g +
            ", " +
            d.b +
            ", " +
            t.stroke_opacity +
            ");"),
          (s += "stroke-width: " + t.stroke_width + "px;"),
          (s += "stroke-dasharray: " + t.stroke_dasharray + ";"),
          (s += "stroke-linecap: " + t.stroke_linecap + ";"),
          this.didAnimateShapesOnPageload ||
            ("fade" == this.settings.shapes.pageload_animation
              ? (s += "opacity: 0;")
              : (s += "opacity: " + t.opacity + ";"));
      }
      return s;
    },
    applyStyles: function (t, i) {
      var e = this.settings.spots[i],
        s = this.wrap.find("#" + e.id),
        n = this.calcStyles(t, i);
      s.attr("style", n),
        "spot" == e.type &&
          s.find("path").length > 0 &&
          s.find("path").attr("style", "fill:" + t.icon_fill),
        "image" === t.background_type &&
          this.imageBackgroundsContainer.find('[data-id="' + e.id + '"]').css({
            "background-image": "url(" + t.background_image_url + ")",
            opacity: t.background_image_opacity,
            transform:
              "scale(" +
              t.background_image_scale +
              ") translate(" +
              t.background_image_offset_x +
              "px, " +
              t.background_image_offset_y +
              "px)",
          });
    },
    highlightShape: function (t, i) {
      var e = this.settings.spots[t];
      if (i && "" != e.connected_to) {
        var s = this.getIndexOfShapeWithID(e.connected_to);
        this.highlightShape(s, !0);
      } else {
        if (this.connectedShapes[e.id])
          for (var n = 0; n < this.connectedShapes[e.id].length; n++) {
            s = this.connectedShapes[e.id][n].index;
            this.highlightShape(s, !1);
          }
        this.applyStyles(this.settings.spots[t].mouseover_style, t),
          $.imageMapProEventHighlightedShape(
            this.settings.general.name,
            e.title
          ),
          -1 == this.highlightedShapes.indexOf(t) &&
            this.highlightedShapes.push(t);
      }
    },
    unhighlightShape: function (t) {
      var i = this.settings.spots[t];
      if (-1 == this.apiHighlightedShapes.indexOf(t)) {
        this.applyStyles(i.default_style, t),
          $.imageMapProEventUnhighlightedShape(
            this.settings.general.name,
            i.title
          );
        var e = this.highlightedShapes.indexOf(t);
        this.highlightedShapes.splice(e, 1);
      }
    },
    unhighlightAllShapes: function () {
      for (var t = this.highlightedShapes.slice(0), i = 0; i < t.length; i++)
        this.unhighlightShape(t[i]);
    },
    isShapeHighlighted: function (t) {
      for (var i = 0; i < this.highlightedShapes.length; i++)
        if (this.highlightedShapes[i] == t) return !0;
      return !1;
    },
    focusShape: function (t) {
      if (isTrue(this.settings.zooming.enable_zooming)) {
        for (var i = [], e = 0; e < this.settings.spots.length; e++)
          this.settings.spots[e].connected_to == this.settings.spots[t].id &&
            i.push(this.settings.spots[e]);
        var s = this.settings.spots[t],
          n = 0,
          a = 0;
        if (i.length > 0) {
          var o = 999,
            h = 999,
            r = 0,
            l = 0;
          s.x < o && (o = s.x),
            s.y < h && (h = s.y),
            s.x > r && (r = s.x),
            s.y > l && (l = s.y);
          for (e = 0; e < i.length; e++)
            i[e].x < o && (o = i[e].x),
              i[e].y < h && (h = i[e].y),
              i[e].x > r && (r = i[e].x),
              i[e].y > l && (l = i[e].y);
          (n = r - o), (a = l - h);
        } else
          "spot" == s.type
            ? ((n /= this.wrapWidth),
              (a /= this.wrapHeight),
              n < 25 && (n = 25),
              a < 25 && (a = 25))
            : ((n = s.width), (a = s.height));
        var p = 0;
        n >= a && (p = n), a > n && (p = a);
        var g = 50 / p;
        g < 1 && (g = 1), g > this.maxZoomLevel && (g = this.maxZoomLevel);
        var d = 0,
          u = 0;
        if (
          ("spot" == s.type
            ? ((d = s.x), (u = s.y))
            : ((d = s.x + s.width / 2), (u = s.y + s.height / 2)),
          i.length > 0)
        ) {
          for (e = 0; e < i.length; e++)
            "spot" == i[e].type
              ? ((d += i[e].x), (u += i[e].y))
              : ((d += i[e].x + i[e].width / 2),
                (u += i[e].y + i[e].height / 2));
          (d /= i.length + 1), (u /= i.length + 1);
        }
        (d = (d / 100) * this.wrapWidth * g),
          (u = (u / 100) * this.wrapHeight * g),
          this.applyZoom(g),
          this.panTo(d, u);
      }
    },
    performClickAction: function (i) {
      var s = this.settings.spots[i];
      "follow-link" == s.actions.click &&
        (0 == $("#imp-temp-link").length &&
          $("body").append(
            '<a href="" id="imp-temp-link" target="_blank"></a>'
          ),
        $("#imp-temp-link").attr("href", s.actions.link),
        isTrue(s.actions.open_link_in_new_window)
          ? $("#imp-temp-link").attr("target", "_blank")
          : $("#imp-temp-link").removeAttr("target"),
        $("#imp-temp-link")[0].click()),
        "run-script" == s.actions.click &&
          eval(s.actions.script.replace("<br>", "")),
        $.imageMapProEventClickedShape(
          this.settings.general.name,
          this.settings.spots[i].title
        );
    },
    showTooltip: function (t, i) {
      if (-1 == this.openedTooltips.indexOf(t)) {
        if (
          isTrue(this.settings.tooltips.show_title_on_mouseover) &&
          "click" == this.settings.tooltips.show_tooltips
        )
          (a = this.tooltipsContainer.find(
            '.imp-tooltip[data-index="' + t + '"]'
          ))
            .find(".imp-tooltip-title")
            .hide(),
            a.find(".imp-tooltip-plain-text").show(),
            a.find(".squares-container").show(),
            a.css({ left: 0, top: 0 });
        var e = this.settings.spots[t];
        if ("" != e.connected_to && isTrue(e.use_connected_shape_tooltip)) {
          var s = this.getIndexOfShapeWithID(e.connected_to);
          this.showTooltip(s);
        } else {
          if (
            (this.openedTooltips.length > 0 && this.hideAllTooltips(),
            -1 == this.openedTooltips.indexOf(t) && this.openedTooltips.push(t),
            ("mobile-only" == this.settings.tooltips.fullscreen_tooltips &&
              isMobile()) ||
              "always" == this.settings.tooltips.fullscreen_tooltips)
          ) {
            (this.visibleFullscreenTooltip = $(
              '.imp-fullscreen-tooltip[data-index="' + t + '"]'
            )),
              (this.visibleFullscreenTooltipIndex = t),
              this.fullscreenTooltipsContainer.show(),
              this.visibleFullscreenTooltip.show();
            var n = this;
            setTimeout(function () {
              n.visibleFullscreenTooltip.addClass("imp-tooltip-visible");
            }, 20),
              (this.fullscreenTooltipVisible = !0),
              (this.bodyOverflow = $("body").css("overflow")),
              $("body").css({ overflow: "hidden" });
          } else {
            var a;
            (a = this.tooltipsContainer.find(
              '.imp-tooltip[data-index="' + t + '"]'
            )).show(),
              setTimeout(function () {
                a.addClass("imp-tooltip-visible");
              }, 1),
              this.measureTooltipSize(t),
              this.updateTooltipPosition(t, i);
          }
          $.imageMapProEventOpenedTooltip(
            this.settings.general.name,
            this.settings.spots[t].title
          );
        }
      }
    },
    hideTooltip: function (t) {
      if (-1 == this.apiOpenedTooltips.indexOf(t)) {
        var i = this.openedTooltips.indexOf(t);
        if (
          (this.openedTooltips.splice(i, 1),
          ("mobile-only" == this.settings.tooltips.fullscreen_tooltips &&
            isMobile()) ||
            "always" == this.settings.tooltips.fullscreen_tooltips)
        ) {
          (e = this.fullscreenTooltipsContainer.find(
            '.imp-fullscreen-tooltip[data-index="' + t + '"]'
          )).removeClass("imp-tooltip-visible"),
            this.fullscreenTooltipsContainer.hide(),
            e.hide(),
            (this.fullscreenTooltipVisible = !1),
            $("body").css({ overflow: this.bodyOverflow });
        } else {
          var e = this.tooltipsContainer.find(
            '.imp-tooltip[data-index="' + t + '"]'
          );
          setTimeout(function () {
            e.removeClass("imp-tooltip-visible"),
              e.hasClass("imp-tooltip-visible") || e.hide();
          }, 1),
            e.find("video").trigger("pause"),
            e.find("iframe").each(function () {
              $(this).attr("src", $(this).attr("src"));
            });
        }
        $.imageMapProEventClosedTooltip(
          this.settings.general.name,
          this.settings.spots[t].title
        );
      }
    },
    hideAllTooltips: function () {
      for (var t = this.openedTooltips.slice(0), i = 0; i < t.length; i++)
        this.hideTooltip(t[i]);
    },
    hideAllTitles: function () {
      for (var t = 0; t < this.settings.spots.length; t++)
        this.hideTooltipTitle(t, !0);
    },
    showTooltipTitle: function (t, i) {
      if (-1 == this.openedTooltips.indexOf(t)) {
        var e = this.tooltipsContainer.find(
          '.imp-tooltip[data-index="' + t + '"]'
        );
        e.hasClass("imp-tooltip-visible")
          ? this.updateTooltipPosition(t, i)
          : (e.find(".squares-container").hide(),
            e.find(".imp-tooltip-title").show(),
            e.find(".imp-tooltip-title .squares-container").show(),
            e.find(".imp-tooltip-plain-text").hide(),
            e.show(),
            setTimeout(function () {
              e.addClass("imp-tooltip-visible");
            }, 1),
            e.data("imp-measured-width", e.outerWidth()),
            e.data("imp-measured-height", e.outerHeight()),
            this.updateTooltipPosition(t, i));
      }
    },
    hideTooltipTitle: function (t) {
      if (-1 == this.openedTooltips.indexOf(t)) {
        var i = this.tooltipsContainer.find(
          '.imp-tooltip[data-index="' + t + '"]'
        );
        i.find(".imp-tooltip-title").hide(),
          i.find(".imp-tooltip-plain-text").show(),
          i.find(".squares-container").show(),
          i.css({ width: "auto" }),
          i.removeClass("imp-tooltip-visible"),
          i.hide();
      }
    },
    updateTooltipPosition: function (t, i) {
      if (!this.fullscreenTooltipVisible) {
        var e, s, n, a, o, h, r, l, p, g;
        (s = (e = this.tooltipsContainer.find(
          '.imp-tooltip[data-index="' + t + '"]'
        )).data("imp-measured-width")),
          (n = e.data("imp-measured-height")),
          (g = this.settings.spots[t]);
        var d,
          u,
          c = window.innerWidth,
          m = window.innerHeight;
        if (isTrue(this.settings.tooltips.sticky_tooltips) && i) {
          var f = this.getEventCoordinates(i);
          (l = f.x),
            (p = f.y),
            (a = l - this.wrapOffsetLeft),
            (o = p - this.wrapOffsetTop),
            (h = 0),
            (r = 0);
        } else
          (h = (g.width / 100) * this.wrapWidth),
            (r = (g.height / 100) * this.wrapHeight),
            (h *= this.targetZoom),
            (r *= this.targetZoom),
            (a = (Math.round(10 * g.x) / 10 / 100) * this.wrapWidth),
            (o = (Math.round(10 * g.y) / 10 / 100) * this.wrapHeight),
            (a = a * this.targetZoom + this.targetPanX),
            (o = o * this.targetZoom + this.targetPanY);
        "spot" == g.type &&
          ((a -= g.width / 2),
          isTrue(this.settings.tooltips.sticky_tooltips) || (o -= g.height / 2),
          (h = g.width),
          (r = g.height)),
          "spot" == g.type &&
            isTrue(g.default_style.icon_is_pin) &&
            "spot" == g.type &&
            isTrue(g.default_style.use_icon) &&
            !isTrue(this.settings.tooltips.sticky_tooltips) &&
            (o -= r / 2),
          isTrue(this.settings.runtime.is_fullscreen) &&
          isTrue(this.settings.tooltips.constrain_tooltips)
            ? (a + this.wrapOffsetLeft < 0 &&
                ((h = h + a + this.wrapOffsetLeft), (a = -this.wrapOffsetLeft)),
              a + this.wrapOffsetLeft + h > c &&
                (h += c - (a + this.wrapOffsetLeft + h)),
              o + this.wrapOffsetTop < 0 &&
                ((r = r + o + this.wrapOffsetTop), (o = -this.wrapOffsetTop)),
              o + this.wrapOffsetTop + r > m &&
                (r += m - (o + this.wrapOffsetTop + r)))
            : (a < 0 && ((h += a), (a = 0)),
              a + h > this.wrapWidth && (h = this.wrapWidth - a),
              o < 0 && ((r += o), (o = 0)),
              o + r > this.wrapHeight && (r = this.wrapHeight - o)),
          "left" == g.tooltip_style.position &&
            ((d = a - s - 20), (u = o + r / 2 - n / 2)),
          "right" == g.tooltip_style.position &&
            ((d = a + h + 20), (u = o + r / 2 - n / 2)),
          "top" == g.tooltip_style.position &&
            ((d = a + h / 2 - s / 2), (u = o - n - 20)),
          "bottom" == g.tooltip_style.position &&
            ((d = a + h / 2 - s / 2), (u = o + r + 20));
        var v = { x: d, y: u };
        isTrue(this.settings.tooltips.constrain_tooltips) &&
          (((v = fitRectToScreen(
            d + this.wrapOffsetLeft,
            u + this.wrapOffsetTop,
            s,
            n
          )).x -= this.wrapOffsetLeft),
          (v.y -= this.wrapOffsetTop)),
          (v.x += (g.tooltip_style.offset_x / 100) * this.wrapWidth),
          (v.y += (g.tooltip_style.offset_y / 100) * this.wrapHeight),
          e.css({
            left:
              v.x + this.wrapOffsetLeft - this.tooltipsContainer.offset().left,
            top: v.y + this.wrapOffsetTop - this.tooltipsContainer.offset().top,
          });
      }
    },
    updateOpenedTooltipsPosition: function () {
      for (var t = 0; t < this.openedTooltips.length; t++)
        this.updateTooltipPosition(this.openedTooltips[t]);
    },
    toggleFullscreen: function () {
      if (isTrue(this.settings.runtime.is_fullscreen))
        $("body").removeClass("imp-fullscreen-mode"),
          $("#imp-fullscreen-wrap").remove(),
          this.disableEvents(),
          fullscreenMapParent.events();
      else {
        $("body").addClass("imp-fullscreen-mode");
        var t = $.extend(!0, {}, this.settings);
        (t.runtime.is_fullscreen = 1),
          (t.id = "999999"),
          (t.general.responsive = 0),
          (t.general.width = this.settings.general.naturalWidth),
          (t.general.height = this.settings.general.naturalHeight),
          (t.general.name += "-fullscreen"),
          isTrue(this.settings.shapes_menu.enable_shapes_menu) &&
            isTrue(this.settings.shapes_menu.detached_menu) &&
            (t.shapes_menu.detached_menu = 0);
        var i = "";
        (i += "background: " + this.settings.fullscreen.fullscreen_background),
          $("body").append(
            '<div id="imp-fullscreen-wrap" style="' +
              i +
              '"><div id="image-map-pro-' +
              t.id +
              '"></div></div>'
          ),
          $("#image-map-pro-" + t.id).imageMapPro(t),
          this.disableEvents(),
          (fullscreenMapParent = this);
      }
    },
    resetZoomAndPan: function () {
      (this.zoom = 1),
        (this.targetZoom = 1),
        (this.targetPanX = 0),
        (this.targetPanY = 0),
        (this.actualPanX = 0),
        (this.actualPanY = 0),
        this.redraw(!1);
    },
    zoomIn: function (t) {
      if (this.targetZoom < this.maxZoomLevel) {
        var i = this.zoom * this.zoomMultiplier,
          e = 0,
          s = 0,
          n = this.wrap.width(),
          a = this.wrap.height();
        t
          ? ((e = t.pageX), (s = t.pageY))
          : ((e = this.wrap.offset().left + n / 2),
            (s = this.wrap.offset().top + a / 2)),
          this.applyZoom(i, e, s);
      }
    },
    zoomOut: function (t) {
      if (this.targetZoom > 1) {
        var i = this.zoom / this.zoomMultiplier,
          e = 0,
          s = 0,
          n = this.wrap.width(),
          a = this.wrap.height();
        t
          ? ((e = t.pageX), (s = t.pageY))
          : ((e = this.wrap.offset().left + n / 2),
            (s = this.wrap.offset().top + a / 2)),
          this.applyZoom(i, e, s);
      }
    },
    applyZoom: function (t, i, e) {
      (this.targetZoom = this.zoom),
        (this.targetPanX = this.actualPanX),
        (this.targetPanY = this.actualPanY),
        t > this.maxZoomLevel && (t = this.maxZoomLevel),
        t < 1 && (t = 1),
        (this.targetZoom = t);
      var s =
          (this.wrapWidth * this.targetZoom - this.wrapWidth * this.zoom) / 2,
        n =
          (this.wrapHeight * this.targetZoom - this.wrapHeight * this.zoom) / 2;
      if (i && e) {
        var a = i - this.zoomWrap.offset().left,
          o = e - this.zoomWrap.offset().top,
          h =
            s *
            (((this.wrapWidth * this.zoom) / 2 - a) /
              ((this.wrapWidth * this.zoom) / 2)),
          r =
            n *
            (((this.wrapHeight * this.zoom) / 2 - o) /
              ((this.wrapHeight * this.zoom) / 2));
        (this.targetPanX -= s),
          (this.targetPanY -= n),
          (this.targetPanX += h),
          (this.targetPanY += r);
      }
      this.targetPanX > 0 && (this.targetPanX = 0),
        this.targetPanY > 0 && (this.targetPanY = 0),
        this.targetPanX < this.wrapWidth - this.wrapWidth * this.targetZoom &&
          (this.targetPanX = this.wrapWidth - this.wrapWidth * this.targetZoom),
        this.targetPanY < this.wrapHeight - this.wrapHeight * this.targetZoom &&
          (this.targetPanY =
            this.wrapHeight - this.wrapHeight * this.targetZoom);
      for (var l = 0; l < this.settings.spots.length; l++) {
        var p = this.settings.spots[l];
        "spot" == p.type &&
          this.wrap
            .find("#" + p.id)
            .css({ transform: "scale(" + 1 / this.targetZoom + ")" });
      }
      "mouseover" == this.settings.tooltips.show_tooltips
        ? this.hideAllTooltips()
        : this.updateOpenedTooltipsPosition(),
        this.redraw(!0);
    },
    pan: function (t, i) {
      var e = this.ix - t,
        s = this.iy - i;
      (this.targetPanX = this.initialPanX - e),
        (this.targetPanY = this.initialPanY - s),
        this.targetPanX > 0 && (this.targetPanX = 0),
        this.targetPanY > 0 && (this.targetPanY = 0),
        this.targetPanX < this.wrapWidth - this.wrapWidth * this.zoom &&
          (this.targetPanX = this.wrapWidth - this.wrapWidth * this.zoom),
        this.targetPanY < this.wrapHeight - this.wrapHeight * this.zoom &&
          (this.targetPanY = this.wrapHeight - this.wrapHeight * this.zoom),
        "mouseover" == this.settings.tooltips.show_tooltips
          ? this.hideAllTooltips()
          : (this.tooltipsContainer.addClass("imp-no-transition"),
            this.updateOpenedTooltipsPosition()),
        this.redraw(!1);
    },
    panTo: function (t, i) {
      var e = -t + this.wrapWidth / 2,
        s = -i + this.wrapHeight / 2;
      (this.targetPanX = e),
        (this.targetPanY = s),
        this.targetPanX > 0 && (this.targetPanX = 0),
        this.targetPanY > 0 && (this.targetPanY = 0),
        this.targetPanX < this.wrapWidth - this.wrapWidth * this.targetZoom &&
          (this.targetPanX = this.wrapWidth - this.wrapWidth * this.targetZoom),
        this.targetPanY < this.wrapHeight - this.wrapHeight * this.targetZoom &&
          (this.targetPanY =
            this.wrapHeight - this.wrapHeight * this.targetZoom),
        "mouseover" == this.settings.tooltips.show_tooltips
          ? this.hideAllTooltips()
          : this.updateOpenedTooltipsPosition(),
        this.redraw(!0);
    },
    pinch: function (t) {
      var i =
          (t.originalEvent.touches[0].pageX +
            t.originalEvent.touches[1].pageX) /
          2,
        e =
          (t.originalEvent.touches[0].pageY +
            t.originalEvent.touches[1].pageY) /
          2;
      (this.actualPanX += i - this.lastX), (this.actualPanY += e - this.lastY);
      var s = this.wrap.width(),
        n = this.wrap.height(),
        a = this.wrap.offset().left,
        o = this.wrap.offset().top,
        h = window.innerWidth,
        r = window.innerHeight;
      isTrue(this.settings.runtime.is_fullscreen)
        ? (s * this.zoom > h
            ? (this.actualPanX > -a && (this.actualPanX = -a),
              this.actualPanX < h - s * this.targetZoom - a &&
                (this.actualPanX = h - s * this.targetZoom - a))
            : (this.actualPanX = (s - s * this.targetZoom) / 2),
          n * this.zoom > r
            ? (this.actualPanY > -o && (this.actualPanY = -o),
              this.actualPanY < r - n * this.targetZoom - o &&
                (this.actualPanY = r - n * this.targetZoom - o))
            : (this.actualPanY = (n - n * this.targetZoom) / 2))
        : (this.actualPanX > 0 && (this.actualPanX = 0),
          this.actualPanY > 0 && (this.actualPanY = 0),
          this.actualPanX < s - s * this.targetZoom &&
            (this.actualPanX = s - s * this.targetZoom),
          this.actualPanY < n - n * this.targetZoom &&
            (this.actualPanY = n - n * this.targetZoom)),
        (this.lastX = i),
        (this.lastY = e);
      var l =
        Math.sqrt(
          Math.pow(
            t.originalEvent.touches[1].pageX - t.originalEvent.touches[0].pageX,
            2
          ) +
            Math.pow(
              t.originalEvent.touches[1].pageY -
                t.originalEvent.touches[0].pageY,
              2
            )
        ) / this.pinchInitialDistance;
      this.applyZoom(this.pinchInitialZoom * l, i, e);
    },
    redraw: function (t) {
      if (
        (t
          ? ((this.zoom = lerp(this.zoom, this.targetZoom, 0.1)),
            (this.actualPanX = lerp(this.actualPanX, this.targetPanX, 0.1)),
            (this.actualPanY = lerp(this.actualPanY, this.targetPanY, 0.1)),
            Math.abs(this.zoom - this.targetZoom) < 0.001 &&
              (this.zoom = this.targetZoom),
            Math.abs(this.actualPanX - this.targetPanX) < 1 &&
              (this.actualPanX = this.targetPanX),
            Math.abs(this.actualPanY - this.targetPanY) < 1 &&
              (this.actualPanY = this.targetPanY))
          : ((this.zoom = this.targetZoom),
            (this.actualPanX = this.targetPanX),
            (this.actualPanY = this.targetPanY)),
        this.zoomWrap.css({
          transform: "scale(" + this.zoom + ", " + this.zoom + ")",
        }),
        this.translateWrap.css({
          transform:
            "translate(" + this.actualPanX + "px, " + this.actualPanY + "px)",
        }),
        isTrue(this.settings.zooming.enable_navigator) &&
          isTrue(this.settings.zooming.enable_zooming))
      ) {
        var i =
            (-this.actualPanX * this.navigatorRatio) / this.zoom +
            this.navigatorMarginX / this.zoom,
          e =
            this.wrapWidth * this.navigatorRatio -
            (i + (1 * this.uiNavigatorWindowWidth) / this.zoom),
          s =
            (-this.actualPanY * this.navigatorRatio) / this.zoom +
            this.navigatorMarginY / this.zoom,
          n =
            this.wrapHeight * this.navigatorRatio -
            (s + (1 * this.uiNavigatorWindowHeight) / this.zoom);
        this.uiNavigatorImage.css({
          "clip-path": "inset(" + s + "px " + e + "px " + n + "px " + i + "px)",
          "-webkit-clip-path":
            "inset(" + s + "px " + e + "px " + n + "px " + i + "px)",
          "-moz-clip-path":
            "inset(" + s + "px " + e + "px " + n + "px " + i + "px)",
        });
      }
      if (t) {
        var a = this;
        (this.zoom == this.targetZoom &&
          this.actualPanX == this.targetPanX &&
          this.actualPanY == this.targetPanY) ||
          window.requestAnimationFrame(function () {
            a.redraw(t);
          });
      }
    },
    switchLayer: function (t, i) {
      (this.settings.runtime.layerID = t),
        (this.openedTooltips = []),
        (this.apiOpenedTooltips = []),
        (this.highlightedShapes = []),
        (this.apiHighlightedShapes = []),
        this.shapesMenuWrap &&
          (this.settings.runtime.menu_scroll = this.shapesMenuWrap
            .find(".imp-shapes-menu-scroll-wrap")
            .scrollTop());
      for (var e = "", s = 0; s < this.settings.layers.layers_list.length; s++)
        if (
          parseInt(this.settings.layers.layers_list[s].id, 10) ==
          parseInt(this.settings.runtime.layerID, 10)
        ) {
          (e = this.settings.layers.layers_list[s].title),
            (this.settings.general.naturalWidth = this.settings.layers.layers_list[
              s
            ].image_width),
            (this.settings.general.naturalHeight = this.settings.layers.layers_list[
              s
            ].image_height),
            isTrue(this.settings.runtime.is_fullscreen) &&
              ((this.settings.general.width = this.settings.layers.layers_list[
                s
              ].image_width),
              (this.settings.general.height = this.settings.layers.layers_list[
                s
              ].image_height));
          break;
        }
      var n = this;
      this.init(function () {
        i && i(), $.imageMapProEventSwitchedFloor(n.settings.general.name, e);
      });
    },
    updateMenuSearch: function () {
      var t = $(
        '[data-image-map-pro-search-id="' + this.settings.id + '"]'
      ).val();
      t && t.length > 0
        ? (this.shapesMenuWrap.addClass("imp-searching"),
          $(".imp-shapes-menu-shape-title").each(function () {
            var i = new RegExp("(" + t + ")", "gi"),
              e = $(this).data("imp-content"),
              s = $(this)
                .data("imp-content")
                .replace(i, '<span class="imp-search-highlight">$&</span>');
            e != s
              ? ($(this).show(), $(this).html(s))
              : ($(this).hide(), $(this).html(e));
          }))
        : (this.shapesMenuWrap.removeClass("imp-searching"),
          $(".imp-shapes-menu-shape-title, .imp-shapes-menu-layer-title").each(
            function () {
              $(this).show(), $(this).html($(this).data("imp-content"));
            }
          )),
        (this.settings.runtime.menu_search_string = t);
    },
    displayScrollMessage: function () {
      this.scrollMessage.fadeIn(), clearTimeout(this.hideScrollMessageTimeout);
      var t = this;
      this.hideScrollMessageTimeout = setTimeout(function () {
        t.scrollMessage.fadeOut();
      }, 1e3);
    },
    showResponsiveShapesMenu: function () {
      this.responsiveShapesMenuWrap &&
        (this.responsiveShapesMenuWrap.addClass("imp-responsive-menu-visible"),
        $("body").addClass("imp-noscroll"));
    },
    hideResponsiveShapesMenu: function () {
      this.responsiveShapesMenuWrap &&
        (this.responsiveShapesMenuWrap.removeClass(
          "imp-responsive-menu-visible"
        ),
        $("body").removeClass("imp-noscroll"));
    },
  }),
    ($.fn[pluginName] = function (t) {
      return this.each(function () {
        $.data(this, "plugin_" + pluginName, new Plugin(this, t));
      });
    });
})(jQuery, window, document),
  (function (t) {
    "function" == typeof define && define.amd
      ? define(["jquery"], t)
      : "object" == typeof exports
      ? (module.exports = t)
      : t(jQuery);
  })(function (t) {
    function i(i) {
      var o = i || window.event,
        h = r.call(arguments, 1),
        l = 0,
        g = 0,
        d = 0,
        u = 0,
        c = 0,
        m = 0;
      if (
        (((i = t.event.fix(o)).type = "mousewheel"),
        "detail" in o && (d = -1 * o.detail),
        "wheelDelta" in o && (d = o.wheelDelta),
        "wheelDeltaY" in o && (d = o.wheelDeltaY),
        "wheelDeltaX" in o && (g = -1 * o.wheelDeltaX),
        "axis" in o && o.axis === o.HORIZONTAL_AXIS && ((g = -1 * d), (d = 0)),
        (l = 0 === d ? g : d),
        "deltaY" in o && (l = d = -1 * o.deltaY),
        "deltaX" in o && ((g = o.deltaX), 0 === d && (l = -1 * g)),
        0 !== d || 0 !== g)
      ) {
        if (1 === o.deltaMode) {
          var f = t.data(this, "mousewheel-line-height");
          (l *= f), (d *= f), (g *= f);
        } else if (2 === o.deltaMode) {
          var v = t.data(this, "mousewheel-page-height");
          (l *= v), (d *= v), (g *= v);
        }
        if (
          ((u = Math.max(Math.abs(d), Math.abs(g))),
          (!a || a > u) && ((a = u), s(o, u) && (a /= 40)),
          s(o, u) && ((l /= 40), (g /= 40), (d /= 40)),
          (l = Math[l >= 1 ? "floor" : "ceil"](l / a)),
          (g = Math[g >= 1 ? "floor" : "ceil"](g / a)),
          (d = Math[d >= 1 ? "floor" : "ceil"](d / a)),
          p.settings.normalizeOffset && this.getBoundingClientRect)
        ) {
          var y = this.getBoundingClientRect();
          (c = i.clientX - y.left), (m = i.clientY - y.top);
        }
        return (
          (i.deltaX = g),
          (i.deltaY = d),
          (i.deltaFactor = a),
          (i.offsetX = c),
          (i.offsetY = m),
          (i.deltaMode = 0),
          h.unshift(i, l, g, d),
          n && clearTimeout(n),
          (n = setTimeout(e, 200)),
          (t.event.dispatch || t.event.handle).apply(this, h)
        );
      }
    }
    function e() {
      a = null;
    }
    function s(t, i) {
      return (
        p.settings.adjustOldDeltas && "mousewheel" === t.type && i % 120 == 0
      );
    }
    var n,
      a,
      o = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
      h =
        "onwheel" in document || document.documentMode >= 9
          ? ["wheel"]
          : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
      r = Array.prototype.slice;
    if (t.event.fixHooks)
      for (var l = o.length; l; ) t.event.fixHooks[o[--l]] = t.event.mouseHooks;
    var p = (t.event.special.mousewheel = {
      version: "3.1.12",
      setup: function () {
        if (this.addEventListener)
          for (var e = h.length; e; ) this.addEventListener(h[--e], i, !1);
        else this.onmousewheel = i;
        t.data(this, "mousewheel-line-height", p.getLineHeight(this)),
          t.data(this, "mousewheel-page-height", p.getPageHeight(this));
      },
      teardown: function () {
        if (this.removeEventListener)
          for (var e = h.length; e; ) this.removeEventListener(h[--e], i, !1);
        else this.onmousewheel = null;
        t.removeData(this, "mousewheel-line-height"),
          t.removeData(this, "mousewheel-page-height");
      },
      getLineHeight: function (i) {
        var e = t(i),
          s = e["offsetParent" in t.fn ? "offsetParent" : "parent"]();
        return (
          s.length || (s = t("body")),
          parseInt(s.css("fontSize"), 10) ||
            parseInt(e.css("fontSize"), 10) ||
            16
        );
      },
      getPageHeight: function (i) {
        return t(i).height();
      },
      settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
    });
    t.fn.extend({
      mousewheel: function (t) {
        return t ? this.bind("mousewheel", t) : this.trigger("mousewheel");
      },
      unmousewheel: function (t) {
        return this.unbind("mousewheel", t);
      },
    });
  });
