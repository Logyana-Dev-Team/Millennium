"use strict";
var Layout = (function () {
    function e(e) {
      $(".sidenav-toggler").addClass("active"),
        $(".sidenav-toggler").data("action", "sidenav-unpin"),
        $("body").addClass("sidenav-pinned ready"),
        $("body")
          .find(".main-content")
          .append(
            '<div class="sidenav-mask mask-body d-xl-none" data-action="sidenav-unpin" data-target=' +
              e.data("target") +
              " />"
          ),
        $(e.data("target")).addClass("show"),
        localStorage.setItem("sidenav-state", "pinned");
    }
    function t(e) {
      $(".sidenav-toggler").removeClass("active"),
        $(".sidenav-toggler").data("action", "sidenav-pin"),
        $("body").removeClass("sidenav-pinned"),
        $("body").addClass("ready"),
        $("body").find(".sidenav-mask").remove(),
        $(e.data("target")).removeClass("show"),
        localStorage.setItem("sidenav-state", "unpinned");
    }
    var a = localStorage.getItem("sidenav-state")
      ? localStorage.getItem("sidenav-state")
      : "pinned";
    if (
      ($(window).on({
        "load resize": function () {
          $(window).width() < 1200
            ? t($(".sidenav-toggler"))
            : "pinned" == a
            ? e($(".sidenav-toggler"))
            : "unpinned" == a && t($(".sidenav-toggler"));
        },
      }),
      $("body").on("click", "[data-action]", function (a) {
        a.preventDefault();
        var n = $(this),
          o = n.data("action"),
          i = n.data("target");
        switch (o) {
          case "offcanvas-open":
            (i = n.data("target")),
              $(i).addClass("open"),
              $("body").append(
                '<div class="body-backdrop" data-action="offcanvas-close" data-target=' +
                  i +
                  " />"
              );
            break;
          case "offcanvas-close":
            (i = n.data("target")),
              $(i).removeClass("open"),
              $("body").find(".body-backdrop").remove();
            break;
          case "aside-open":
            (i = n.data("target")),
              n.addClass("active"),
              $(i).addClass("show"),
              $("body").append(
                '<div class="mask-body mask-body-light" data-action="aside-close" data-target=' +
                  i +
                  " />"
              );
            break;
          case "aside-close":
            (i = n.data("target")),
              n.removeClass("active"),
              $(i).removeClass("show"),
              $("body").find(".body-backdrop").remove();
            break;
          case "omnisearch-open":
            (i = n.data("target")),
              n.addClass("active"),
              $(i).addClass("show"),
              $(i).find(".form-control").focus(),
              $("body")
                .addClass("omnisearch-open")
                .append(
                  '<div class="mask-body mask-body-dark" data-action="omnisearch-close" data-target="' +
                    i +
                    '" />'
                );
            break;
          case "omnisearch-close":
            (i = n.data("target")),
              $('[data-action="search-open"]').removeClass("active"),
              $(i).removeClass("show"),
              $("body")
                .removeClass("omnisearch-open")
                .find(".mask-body")
                .remove();
            break;
          case "search-open":
            (i = n.data("target")),
              n.addClass("active"),
              $(i).addClass("show"),
              $(i).find(".form-control").focus();
            break;
          case "search-close":
            (i = n.data("target")),
              $('[data-action="search-open"]').removeClass("active"),
              $(i).removeClass("show");
            break;
          case "sidenav-pin":
            e(n);
            break;
          case "sidenav-unpin":
            t(n);
        }
      }),
      $("[data-offset-top]").length)
    ) {
      var n = $("[data-offset-top]"),
        o = $(n.data("offset-top")).height();
      n.css({ "padding-top": o + "px" });
    }
  })(),
  Popover = (function () {
    var e = $('[data-toggle="popover"]');
    e.length &&
      e.each(function () {
        !(function (e) {
          var t = "";
          e.data("color") && (t = " popover-" + e.data("color"));
          var a = {
            trigger: "focus",
            template:
              '<div class="popover' +
              t +
              '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
          };
          e.popover(a);
        })($(this));
      });
  })(),
  PurposeStyle = (function () {
    var e = getComputedStyle(document.body);
    return {
      colors: {
        gray: {
          100: "#f6f9fc",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#8898aa",
          700: "#525f7f",
          800: "#32325d",
          900: "#212529",
        },
        theme: {
          primary: e.getPropertyValue("--primary")
            ? e.getPropertyValue("--primary").replace(" ", "")
            : "#6e00ff",
          info: e.getPropertyValue("--info")
            ? e.getPropertyValue("--info").replace(" ", "")
            : "#00B8D9",
          success: e.getPropertyValue("--success")
            ? e.getPropertyValue("--success").replace(" ", "")
            : "#36B37E",
          danger: e.getPropertyValue("--danger")
            ? e.getPropertyValue("--danger").replace(" ", "")
            : "#FF5630",
          warning: e.getPropertyValue("--warning")
            ? e.getPropertyValue("--warning").replace(" ", "")
            : "#FFAB00",
          dark: e.getPropertyValue("--dark")
            ? e.getPropertyValue("--dark").replace(" ", "")
            : "#212529",
        },
        transparent: "transparent",
      },
      fonts: { base: "Nunito" },
    };
  })(),
  Tooltip = (function () {
    var e = $('[data-toggle="tooltip"]');
    e.length && e.tooltip();
  })(),
  BgImgHolder = (function () {
    var e = $(".bg-img-holder");
    e.length &&
      e.each(function () {
        var e, t, a, n, o;
        (e = $(this)),
          (t = e.children("img").attr("src")),
          (a = e.data("bg-position") ? e.data("bg-position") : "initial"),
          (n = e.data("bg-size") ? e.data("bg-size") : "auto"),
          (o = e.data("bg-height") ? e.data("bg-height") : "100%"),
          e
            .css("background-image", 'url("' + t + '")')
            .css("background-position", a)
            .css("background-size", n)
            .css("opacity", "1")
            .css("height", o);
      });
  })(),
  CardActions = (function () {
    var e = $(".card"),
      t = ".card-product-actions";
    e.length &&
      $(t).length &&
      (e.on({
        mouseenter: function () {
          var e, a, n;
          (e = $(this)),
            (a = e.find(t)),
            (n = a.data("animation-in")),
            a.length &&
              (a.addClass("in animated " + n),
              a.one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function () {
                  a.removeClass("animated " + n);
                }
              ));
        },
      }),
      e.on({
        mouseleave: function () {
          var e, a, n;
          (e = $(this)),
            (a = e.find(t)),
            (n = a.data("animation-out")),
            a.length &&
              (a.addClass("animated " + n),
              a.one(
                "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                function () {
                  a.removeClass("in animated " + n);
                }
              ));
        },
      }));
  })(),
  Dropdown = (function () {
    var e = $(".dropdown-animate"),
      t = $('.dropdown-submenu [data-toggle="dropdown"]');
    e.length && e.on({ "hide.bs.dropdown": function () {} }),
      t.length &&
        t.on("click", function (e) {
          return (
            (function (e) {
              e.next().hasClass("show") ||
                e
                  .parents(".dropdown-menu")
                  .first()
                  .find(".show")
                  .removeClass("show");
              var t = e.next(".dropdown-menu");
              t.toggleClass("show"),
                t.parent().toggleClass("show"),
                e
                  .parents(".nav-item.dropdown.show")
                  .on("hidden.bs.dropdown", function (e) {
                    $(".dropdown-submenu .show").removeClass("show");
                  });
            })($(this)),
            !1
          );
        });
  })(),
  FormControl = (function () {
    var e = $(".form-control"),
      t = $('[data-toggle="indeterminate"]');
    e.length &&
      e
        .on("focus blur", function (e) {
          $(this)
            .parents(".form-group")
            .toggleClass("focused", "focus" === e.type);
        })
        .trigger("blur"),
      t.length &&
        t.each(function () {
          $(this).prop("indeterminate", !0);
        });
  })(),
  CustomInputFile = (function () {
    var e = $(".custom-input-file");
    e.length &&
      e.each(function () {
        var e = $(this);
        e.on("change", function (t) {
          !(function (e, t, a) {
            var n,
              o = e.next("label"),
              i = o.html();
            t && t.files.length > 1
              ? (n = (t.getAttribute("data-multiple-caption") || "").replace(
                  "{count}",
                  t.files.length
                ))
              : a.target.value && (n = a.target.value.split("\\").pop()),
              n ? o.find("span").html(n) : o.html(i);
          })(e, this, t);
        }),
          e
            .on("focus", function () {
              !(function (e) {
                e.addClass("has-focus");
              })(e);
            })
            .on("blur", function () {
              !(function (e) {
                e.removeClass("has-focus");
              })(e);
            });
      });
  })(),
  NavbarVertical = (function () {
    var e = $(
        ".navbar-vertical .navbar-nav, .navbar-vertical .navbar-nav .nav"
      ),
      t = $(".navbar-vertical .collapse"),
      a = $(".navbar-vertical .dropdown");
    t.on({
      "show.bs.collapse": function () {
        var a;
        (a = $(this)).closest(e).find(t).not(a).collapse("hide");
      },
    }),
      a.on({
        "hide.bs.dropdown": function () {
          var e, t;
          (e = $(this)),
            (t = e.find(".dropdown-menu")).addClass("close"),
            setTimeout(function () {
              t.removeClass("close");
            }, 200);
        },
      });
  })(),
  NavbarCollapse = (function () {
    var e = $("#navbar-main"),
      t = $("#navbar-main-collapse"),
      a = $("#navbar-top-main");
    t.length &&
      (t.on({
        "show.bs.collapse": function () {
          e.addClass("navbar-collapsed"),
            a.addClass("navbar-collapsed"),
            $("#header-main").addClass("header-collapse-show"),
            $("body").addClass("modal-open");
        },
      }),
      t.on({
        "hide.bs.collapse": function () {
          t.removeClass("collapsing").addClass("collapsing-out"),
            e.removeClass("navbar-collapsed").addClass("navbar-collapsed-out"),
            a.removeClass("navbar-collapsed").addClass("navbar-collapsed-out");
        },
      }),
      t.on({
        "hidden.bs.collapse": function () {
          t.removeClass("collapsing-out"),
            e.removeClass("navbar-collapsed-out"),
            a.removeClass("navbar-collapsed-out"),
            $("#header-main").removeClass("header-collapse-show"),
            $("body").removeClass("modal-open");
        },
      }));
  })(),
  NavbarSticky = (function () {
    var e = $(".navbar-sticky");
    function t(e) {
      $(window).scrollTop() > a + 200
        ? e.addClass("sticky")
        : e.removeClass("sticky");
    }
    if (e.length) {
      var a = e.offset().top;
      t(e),
        $(window).on({
          scroll: function () {
            t(e);
          },
        });
    }
  })(),
  NegativeMargin = (function () {
    var e = $("[data-negative-margin]");
    $(window).on({
      "load resize": function () {
        e.length &&
          e.each(function () {
            var e, t;
            (e = $(this)),
              (t = e.find($(e.data("negative-margin"))).height()),
              console.log(t),
              $(window).width() > 991
                ? e.css({ "margin-top": "-" + t + "px" })
                : e.css({ "margin-top": "0" });
          });
      },
    });
  })(),
  PasswordText = (function () {
    var e = $('[data-toggle="password-text"]');
    e.length &&
      e.on("click", function (e) {
        var t, a;
        (t = $(this)),
          "password" == (a = $(t.data("target"))).attr("type")
            ? a.attr("type", "text")
            : a.attr("type", "password");
      });
  })(),
  Pricing = (function () {
    var e = $(".pricing-container"),
      t = $(".pricing-container button[data-pricing]");
    e.length &&
      t.on({
        click: function () {
          !(function (e) {
            e.data("pricing");
            var t = e.parents(".pricing-container"),
              a = $("." + t.attr("class") + " [data-pricing-value]");
            e.hasClass("active") ||
              ($("." + t.attr("class") + " button[data-pricing]").removeClass(
                "active"
              ),
              e.addClass("active"),
              a.each(function () {
                var e = $(this).data("pricing-value"),
                  t = $(this).find("span.price").text();
                $(this).find("span.price").text(e),
                  $(this).data("pricing-value", t);
              }));
          })($(this));
        },
      });
  })(),
  ScrollTo = (function () {
    var e = $(".scroll-me, [data-scroll-to], .toc-entry a"),
      t = window.location.hash;
    function a(e) {
      var t = e.attr("href"),
        a = e.data("scroll-to-offset") ? e.data("scroll-to-offset") : 0,
        n = { scrollTop: $(t).offset().top - a };
      $("html, body").stop(!0, !0).animate(n, 300), event.preventDefault();
    }
    e.length &&
      e.on("click", function (e) {
        a($(this));
      }),
      $(window).on("load", function () {
        var e;
        t &&
          "#!" != t &&
          $(t).length &&
          ((e = t),
          $("html, body").animate({ scrollTop: $(e).offset().top }, "slow"));
      });
  })(),
  SendEmail = (function () {
    var e = $("#form-contact");
    function t(e, t, a, n, o, i) {
      $.notify(
        {
          icon: a,
          title: " Bootstrap Notify",
          message:
            "Turning standard Bootstrap alerts into awesome notifications",
          url: "",
        },
        {
          element: "body",
          type: n,
          allow_dismiss: !0,
          placement: { from: e, align: t },
          offset: { x: 15, y: 15 },
          spacing: 10,
          z_index: 1080,
          delay: 2500,
          timer: 25e3,
          url_target: "_blank",
          mouse_over: !1,
          animate: { enter: o, exit: i },
          template:
            '<div class="alert alert-{0} alert-icon alert-group alert-notify" data-notify="container" role="alert"><div class="alert-group-prepend align-self-start"><span class="alert-group-icon"><i data-notify="icon"></i></span></div><div class="alert-content"><strong data-notify="title">{1}</strong><div data-notify="message">{2}</div></div><button type="button" class="close" data-notify="dismiss" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
        }
      );
    }
    e.length &&
      e.on("submit", function (e) {
        return (
          (function (e, a) {
            var n = e.find('button[type="submit"]').text();
            if (a.isDefaultPrevented());
            else {
              var o = e.serialize();
              console.log(o);
              var i = $.ajax({
                type: "POST",
                url: e.data("process"),
                data: o,
                dataType: "json",
              });
              e.find('button[type="submit"]').text("Sending..."),
                i.done(function (a, o) {
                  var i = a.status;
                  t(a.notify_title, a.notify_message, a.notify_type),
                    "success" == i &&
                      (e.find(".btn-reset").trigger("click"),
                      grecaptcha.reset()),
                    e.find('button[type="submit"]').text("Message sent!"),
                    setTimeout(function () {
                      e.find('button[type="submit"]').text(n);
                    }, 3e3);
                }),
                i.fail(function (a, o) {
                  a.status,
                    t(a.notify_title, a.responseText, "danger"),
                    e.find('button[type="submit"]').text("Error!"),
                    setTimeout(function () {
                      e.find('button[type="submit"]').text(n);
                    }, 3e3);
                });
            }
          })($(this), e),
          !1
        );
      });
  })(),
  Shape = (function () {
    var e = $(".shape-container");
    $(window).on({
      "load resize": function () {
        e.length &&
          e.each(function () {
            var e, t;
            (e = $(this)),
              (t = e.find("svg").height()),
              e.css({ height: t + "px" });
          });
      },
    });
  })(),
  Spotlight = (function () {
    var e = $("[data-spotlight]");
    $(window).on({
      "load resize": function () {
        e.length &&
          e.each(function () {
            !(function (e) {
              var t;
              if ("fullscreen" == e.data("spotlight")) {
                if (e.data("spotlight-offset")) {
                  var a = $("body").find(e.data("spotlight-offset")).height();
                  t = $(window).height() - a;
                } else t = $(window).height();
                $(window).width() > 991
                  ? e.find(".spotlight-holder").css({ height: t + "px" })
                  : e.find(".spotlight-holder").css({ height: "auto" });
              }
              e.imagesLoaded().done(function (t) {
                e.find(".animated").each(function () {
                  var e = $(this);
                  if (!e.hasClass("animation-ended")) {
                    var t = e.data("animation-in"),
                      a = (e.data("animation-out"), e.data("animation-delay"));
                    setTimeout(function () {
                      e.addClass("animation-ended " + t, 100).on(
                        "webkitAnimationEnd animationend",
                        function () {
                          e.removeClass(t);
                        }
                      );
                    }, a);
                  }
                });
              });
            })($(this));
          });
      },
    });
  })(),
  GoogleMapCustom = (function () {
    var e,
      t,
      a,
      n = document.getElementById("map-custom");
    void 0 !== n &&
      null != n &&
      google.maps.event.addDomListener(
        window,
        "load",
        (function (n) {
          (e = n.getAttribute("data-lat")),
            (t = n.getAttribute("data-lng")),
            (a = n.getAttribute("data-color"));
          var o = new google.maps.LatLng(e, t),
            i = {
              zoom: 12,
              scrollwheel: !1,
              center: o,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              styles: [
                {
                  featureType: "administrative",
                  elementType: "labels.text.fill",
                  stylers: [{ color: "#444444" }],
                },
                {
                  featureType: "landscape",
                  elementType: "all",
                  stylers: [{ color: "#f2f2f2" }],
                },
                {
                  featureType: "poi",
                  elementType: "all",
                  stylers: [{ visibility: "off" }],
                },
                {
                  featureType: "road",
                  elementType: "all",
                  stylers: [{ saturation: -100 }, { lightness: 45 }],
                },
                {
                  featureType: "road.highway",
                  elementType: "all",
                  stylers: [{ visibility: "simplified" }],
                },
                {
                  featureType: "road.arterial",
                  elementType: "labels.icon",
                  stylers: [{ visibility: "off" }],
                },
                {
                  featureType: "transit",
                  elementType: "all",
                  stylers: [{ visibility: "off" }],
                },
                {
                  featureType: "water",
                  elementType: "all",
                  stylers: [{ color: a }, { visibility: "on" }],
                },
              ],
            };
          n = new google.maps.Map(n, i);
          var s = new google.maps.Marker({
              position: o,
              map: n,
              animation: google.maps.Animation.DROP,
              title: "Hello World!",
            }),
            r = new google.maps.InfoWindow({
              content:
                '<div class="info-window-content"><h2>{{ site.product.name }} {{ site.product.name_long }}</h2><p>{{ site.product.description }}</p></div>',
            });
          google.maps.event.addListener(s, "click", function () {
            r.open(n, s);
          });
        })(n)
      );
  })(),
  GoogleMap = (function () {
    var e,
      t,
      a = document.getElementById("map-default");
    void 0 !== a &&
      null != a &&
      google.maps.event.addDomListener(
        window,
        "load",
        (function (a) {
          (e = a.getAttribute("data-lat")), (t = a.getAttribute("data-lng"));
          var n = new google.maps.LatLng(e, t),
            o = {
              zoom: 12,
              scrollwheel: !1,
              center: n,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
            };
          a = new google.maps.Map(a, o);
          var i = new google.maps.Marker({
              position: n,
              map: a,
              animation: google.maps.Animation.DROP,
              title: "Hello World!",
            }),
            s = new google.maps.InfoWindow({
              content:
                '<div class="info-window-content"><h2>{{ site.product.name }} {{ site.product.name_long }}</h2><p>{{ site.product.description }}</p></div>',
            });
          google.maps.event.addListener(i, "click", function () {
            s.open(a, i);
          });
        })(a)
      );
  })(),
  TextareaAutosize = (function () {
    var e = $('[data-toggle="autosize"]');
    e.length && autosize(e);
  })();
if ($('[data-toggle="widget-calendar"]')[0]) {
  $('[data-toggle="widget-calendar"]').fullCalendar({
    contentHeight: "auto",
    theme: !1,
    buttonIcons: { prev: " fas fa-angle-left", next: " fas fa-angle-right" },
    header: { right: "next", center: "title, ", left: "prev" },
    defaultDate: "2018-12-01",
    editable: !0,
    events: [
      {
        title: "Call with Dave",
        start: "2018-11-18",
        end: "2018-11-18",
        className: "bg-danger",
      },
      {
        title: "Lunch meeting",
        start: "2018-11-21",
        end: "2018-11-22",
        className: "bg-warning",
      },
      {
        title: "All day conference",
        start: "2018-11-29",
        end: "2018-11-29",
        className: "bg-success",
      },
      {
        title: "Meeting with Mary",
        start: "2018-12-01",
        end: "2018-12-01",
        className: "bg-info",
      },
      {
        title: "Winter Hackaton",
        start: "2018-12-03",
        end: "2018-12-03",
        className: "bg-danger",
      },
      {
        title: "Digital event",
        start: "2018-12-07",
        end: "2018-12-09",
        className: "bg-warning",
      },
      {
        title: "Marketing event",
        start: "2018-12-10",
        end: "2018-12-10",
        className: "bg-primary",
      },
      {
        title: "Dinner with Family",
        start: "2018-12-19",
        end: "2018-12-19",
        className: "bg-danger",
      },
      {
        title: "Black Friday",
        start: "2018-12-23",
        end: "2018-12-23",
        className: "bg-info",
      },
      {
        title: "Cyber Week",
        start: "2018-12-02",
        end: "2018-12-02",
        className: "bg-warning",
      },
    ],
  });
  var mYear = moment().format("YYYY"),
    mDay = moment().format("dddd, MMM D");
  $(".widget-calendar-year").html(mYear), $(".widget-calendar-day").html(mDay);
}
var Countdown = (function () {
  var e = $(".countdown");
  e.length &&
    e.each(function () {
      var e, t;
      (e = $(this)),
        (t = e.data("countdown-date")),
        e.countdown(t).on("update.countdown", function (e) {
          $(this).html(
            e.strftime(
              '<div class="countdown-item"><span class="countdown-digit">%-D</span><span class="countdown-label countdown-days">day%!D</span></div><div class="countdown-item"><span class="countdown-digit">%H</span><span class="countdown-separator">:</span><span class="countdown-label">hours</span></div><div class="countdown-item"><span class="countdown-digit">%M</span><span class="countdown-separator">:</span><span class="countdown-label">minutes</span></div><div class="countdown-item"><span class="countdown-digit">%S</span><span class="countdown-label">seconds</span></div>'
            )
          );
        });
    });
})();
!(function (e) {
  (e.fn.countTo = function (t) {
    return (
      (t = t || {}),
      e(this).each(function () {
        var a = e.extend(
            {},
            e.fn.countTo.defaults,
            {
              from: e(this).data("from"),
              to: e(this).data("to"),
              speed: e(this).data("speed"),
              refreshInterval: e(this).data("refresh-interval"),
              decimals: e(this).data("decimals"),
            },
            t
          ),
          n = Math.ceil(a.speed / a.refreshInterval),
          o = (a.to - a.from) / n,
          i = this,
          s = e(this),
          r = 0,
          l = a.from,
          d = s.data("countTo") || {};
        function c(e) {
          var t = a.formatter.call(i, e, a);
          s.text(t);
        }
        s.data("countTo", d),
          d.interval && clearInterval(d.interval),
          (d.interval = setInterval(function () {
            r++,
              c((l += o)),
              "function" == typeof a.onUpdate && a.onUpdate.call(i, l),
              r >= n &&
                (s.removeData("countTo"),
                clearInterval(d.interval),
                (l = a.to),
                "function" == typeof a.onComplete && a.onComplete.call(i, l));
          }, a.refreshInterval)),
          c(l);
      })
    );
  }),
    (e.fn.countTo.defaults = {
      from: 0,
      to: 0,
      speed: 1e3,
      refreshInterval: 100,
      decimals: 0,
      formatter: function (e, t) {
        return e.toFixed(t.decimals);
      },
      onUpdate: null,
      onComplete: null,
    });
})(jQuery);
var Counter = (function () {
    var e,
      t = ".counter",
      a = $(t);
    a.length &&
      ((e = a),
      inView(t).on("enter", function () {
        e.hasClass("counting-finished") ||
          e.countTo({
            formatter: function (e, t) {
              return e.toFixed(t.decimals);
            },
            onUpdate: function (e) {},
            onComplete: function (e) {
              $(this).addClass("counting-finished");
            },
          });
      }));
  })(),
  Datepicker = (function () {
    var e = $('[data-toggle="date"]'),
      t = $('[data-toggle="datetime"]'),
      a = $('[data-toggle="time"]');
    e.length &&
      e.each(function () {
        $(this).flatpickr({ enableTime: !1, allowInput: !0 });
      }),
      t.length &&
        t.each(function () {
          $(this).flatpickr({ enableTime: !0, allowInput: !0 });
        }),
      a.length &&
        a.each(function () {
          $(this).flatpickr({ noCalendar: !0, enableTime: !0, allowInput: !0 });
        });
  })();
// !(function (e) {
//   var t = function () {
//     this.$body = e("body");
//   };
//   (t.prototype.init = function () {
//     e('[data-toggle="dragula"]').each(function () {
//       var t = e(this).data("containers"),
//         a = [];
//       if (t) for (var n = 0; n < t.length; n++) a.push(e("#" + t[n])[0]);
//       else a = [e(this)[0]];
//       var o = e(this).data("handle-class");
//       o
//         ? dragula(a, {
//             moves: function (e, t, a) {
//               return a.classList.contains(o);
//             },
//           })
//         : dragula(a);
//     });
//   }),
//     (e.Dragula = new t()),
//     (e.Dragula.Constructor = t);
// })(window.jQuery),
//   window.jQuery.Dragula.init();
var Dropzones = (function () {
    var e = $('[data-toggle="dropzone"]'),
      t = $(".dz-preview");
    e.length &&
      ((Dropzone.autoDiscover = !1),
      e.each(function () {
        var e, a, n, o, i;
        (e = $(this)),
          (a = void 0 !== e.data("dropzone-multiple")),
          (n = e.find(t)),
          (o = void 0),
          (i = {
            url: e.data("dropzone-url"),
            thumbnailWidth: null,
            thumbnailHeight: null,
            previewsContainer: n.get(0),
            previewTemplate: n.html(),
            maxFiles: a ? null : 1,
            acceptedFiles: a ? null : "image/*",
            init: function () {
              this.on("addedfile", function (e) {
                !a && o && this.removeFile(o), (o = e);
              });
            },
          }),
          n.html(""),
          e.dropzone(i);
      }));
  })(),
  Fullcalendar = (function () {
    var e,
      t,
      a = $('[data-toggle="calendar"]');
    a.length &&
      ((t = {
        header: { right: "", center: "", left: "" },
        buttonIcons: { prev: "calendar--prev", next: "calendar--next" },
        theme: !1,
        selectable: !0,
        selectHelper: !0,
        editable: !0,
        events: [
          {
            id: 1,
            title: "Call with Dave",
            start: "2019-04-18",
            allDay: !0,
            className: "bg-danger",
            description:
              "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          },
          {
            id: 2,
            title: "Lunch meeting",
            start: "2019-04-21",
            allDay: !0,
            className: "bg-warning",
            description:
              "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          },
          {
            id: 3,
            title: "All day conference",
            start: "2019-04-29",
            allDay: !0,
            className: "bg-success",
            description:
              "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          },
          {
            id: 4,
            title: "Meeting with Mary",
            start: "2019-05-01",
            allDay: !0,
            className: "bg-info",
            description:
              "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          },
          {
            id: 5,
            title: "Winter Hackaton",
            start: "2019-05-03",
            allDay: !0,
            className: "bg-danger",
            description:
              "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          },
          {
            id: 6,
            title: "Digital event",
            start: "2019-05-07",
            allDay: !0,
            className: "bg-warning",
            description:
              "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          },
          {
            id: 7,
            title: "Marketing event",
            start: "2019-05-10",
            allDay: !0,
            className: "bg-primary",
            description:
              "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          },
          {
            id: 8,
            title: "Dinner with Family",
            start: "2019-05-19",
            allDay: !0,
            className: "bg-danger",
            description:
              "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          },
          {
            id: 9,
            title: "Black Friday",
            start: "2019-05-23",
            allDay: !0,
            className: "bg-info",
            description:
              "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          },
          {
            id: 10,
            title: "Cyber Week",
            start: "2019-05-02",
            allDay: !0,
            className: "bg-yellow",
            description:
              "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          },
        ],
        dayClick: function (e) {
          var t = moment(e).toISOString();
          $("#new-event").modal("show"),
            $(".new-event--title").val(""),
            $(".new-event--start").val(t),
            $(".new-event--end").val(t);
        },
        viewRender: function (t) {
          e.fullCalendar("getDate").month(),
            $(".fullcalendar-title").html(t.title);
        },
        eventClick: function (e, t) {
          $("#edit-event input[value=" + e.className + "]").prop("checked", !0),
            $("#edit-event").modal("show"),
            $(".edit-event--id").val(e.id),
            $(".edit-event--title").val(e.title),
            $(".edit-event--description").val(e.description);
        },
      }),
      (e = a).fullCalendar(t),
      $("body").on("click", ".new-event--add", function () {
        var t = $(".new-event--title").val(),
          a = {
            Stored: [],
            Job: function () {
              var e = Date.now().toString().substr(6);
              return this.Check(e) ? this.Job() : (this.Stored.push(e), e);
            },
            Check: function (e) {
              for (var t = 0; t < this.Stored.length; t++)
                if (this.Stored[t] == e) return !0;
              return !1;
            },
          };
        "" != t
          ? (e.fullCalendar(
              "renderEvent",
              {
                id: a.Job(),
                title: t,
                start: $(".new-event--start").val(),
                end: $(".new-event--end").val(),
                allDay: !0,
                className: $(".event-tag input:checked").val(),
              },
              !0
            ),
            $(".new-event--form")[0].reset(),
            $(".new-event--title")
              .closest(".form-group")
              .removeClass("has-danger"),
            $("#new-event").modal("hide"))
          : ($(".new-event--title")
              .closest(".form-group")
              .addClass("has-danger"),
            $(".new-event--title").focus());
      }),
      $("body").on("click", "[data-calendar]", function () {
        var t = $(this).data("calendar"),
          a = $(".edit-event--id").val(),
          n = $(".edit-event--title").val(),
          o = $(".edit-event--description").val(),
          i = $("#edit-event .event-tag input:checked").val(),
          s = e.fullCalendar("clientEvents", a);
        "update" === t &&
          ("" != n
            ? ((s[0].title = n),
              (s[0].description = o),
              (s[0].className = [i]),
              console.log(i),
              e.fullCalendar("updateEvent", s[0]),
              $("#edit-event").modal("hide"))
            : ($(".edit-event--title")
                .closest(".form-group")
                .addClass("has-error"),
              $(".edit-event--title").focus())),
          "delete" === t &&
            ($("#edit-event").modal("hide"),
            setTimeout(function () {
              swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: !0,
                buttonsStyling: !1,
                confirmButtonClass: "btn btn-danger",
                confirmButtonText: "Yes, delete it!",
                cancelButtonClass: "btn btn-secondary",
              }).then(function (t) {
                t.value &&
                  (e.fullCalendar("removeEvents", a),
                  swal({
                    title: "Deleted!",
                    text: "The event has been deleted.",
                    type: "success",
                    buttonsStyling: !1,
                    confirmButtonClass: "btn btn-primary",
                  }));
              });
            }, 200));
      }),
      $("body").on("click", "[data-calendar-view]", function (t) {
        t.preventDefault(),
          $("[data-calendar-view]").removeClass("active"),
          $(this).addClass("active");
        var a = $(this).attr("data-calendar-view");
        e.fullCalendar("changeView", a);
      }),
      $("body").on("click", ".fullcalendar-btn-next", function (t) {
        t.preventDefault(), e.fullCalendar("next");
      }),
      $("body").on("click", ".fullcalendar-btn-prev", function (t) {
        t.preventDefault(), e.fullCalendar("prev");
      }));
  })(),
  Highlight = (function () {
    $(".highlight").each(function (e, t) {
      !(function (e, t) {
        $(t).before(
          '<button class="action-item btn-clipboard" title="Copy to clipboard"><i class="far fa-copy mr-2"></i>Copy</button>'
        ),
          $(".btn-clipboard")
            .tooltip()
            .on("mouseleave", function () {
              $(this).tooltip("hide");
            });
        var a = new ClipboardJS(".btn-clipboard", {
          target: function (e) {
            return e.nextElementSibling;
          },
        });
        a.on("success", function (e) {
          $(e.trigger)
            .attr("title", "Copied!")
            .tooltip("_fixTitle")
            .tooltip("show")
            .attr("title", "Copy to clipboard")
            .tooltip("_fixTitle"),
            e.clearSelection();
        }),
          a.on("error", function (e) {
            var t =
              "Press " +
              (/Mac/i.test(navigator.userAgent) ? "⌘" : "Ctrl-") +
              "C to copy";
            $(e.trigger)
              .attr("title", t)
              .tooltip("_fixTitle")
              .tooltip("show")
              .attr("title", "Copy to clipboard")
              .tooltip("_fixTitle");
          }),
          hljs.highlightBlock(t);
      })(0, t);
    });
  })(),
  SortList = (function () {
    var e = $('[data-toggle="list"]'),
      t = $("[data-sort]");
    e.length &&
      e.each(function () {
        var e;
        (e = $(this)),
          new List(
            e.get(0),
            (function (e) {
              return {
                valueNames: e.data("list-values"),
                listClass: e.data("list-class") ? e.data("list-class") : "list",
              };
            })(e)
          );
      }),
      t.on("click", function () {
        return !1;
      });
  })(),
  Masonry = (function () {
    var e = $(".masonry-container");
    e.length &&
      e.each(function () {
        var e, t, a, n, o, i;
        (e = $(this)),
          (t = e.find(".masonry")),
          (a = e.find(".masonry-filter-menu")),
          (n = a.find(".active")),
          (o = n.data("filter")),
          (i = t.imagesLoaded(function () {
            null != o &&
              "" != o &&
              ("*" != o && (o = "." + o), n.addClass("active"));
            var e = { itemSelector: ".masonry-item", filter: o };
            i.isotope(e);
          })),
          a.on("click", "a", function (e) {
            e.preventDefault();
            var t = $(this),
              n = $(this).attr("data-filter");
            (n = "*" == n ? "" : "." + n),
              i.isotope({ filter: n }).on("arrangeComplete", function () {
                a.find("[data-filter]").removeClass("active"),
                  t.addClass("active");
              });
          });
      });
  })(),
  Notify = (function () {
    var e = $('[data-toggle="notify"]');
    e.length &&
      e.on("click", function (e) {
        e.preventDefault(),
          (function (e, t, a, n, o, i) {
            $.notify(
              {
                icon: a,
                title: " Bootstrap Notify",
                message:
                  "Turning standard Bootstrap alerts into awesome notifications",
                url: "",
              },
              {
                element: "body",
                type: n,
                allow_dismiss: !0,
                placement: { from: e, align: t },
                offset: { x: 15, y: 15 },
                spacing: 10,
                z_index: 1080,
                delay: 2500,
                timer: 25e3,
                url_target: "_blank",
                mouse_over: !1,
                animate: { enter: o, exit: i },
                template:
                  '<div class="alert alert-{0} alert-icon alert-group alert-notify" data-notify="container" role="alert"><div class="alert-group-prepend align-self-start"><span class="alert-group-icon"><i data-notify="icon"></i></span></div><div class="alert-content"><strong data-notify="title">{1}</strong><div data-notify="message">{2}</div></div><button type="button" class="close" data-notify="dismiss" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
              }
            );
          })(
            $(this).attr("data-placement"),
            $(this).attr("data-align"),
            $(this).attr("data-icon"),
            $(this).attr("data-type"),
            $(this).attr("data-animation-in"),
            $(this).attr("data-animation-out")
          );
      });
  })(),
  SingleSlider = (function () {
    var e = $(".input-slider-container");
    e.length &&
      e.each(function () {
        var e, t, a, n, o, i, s, r, l, d, c;
        (e = $(this)),
          (t = e.find(".input-slider")),
          (a = t.attr("id")),
          (n = t.data("range-value-min")),
          (o = t.data("range-value-max")),
          (i = e.find(".range-slider-value")),
          (s = i.attr("id")),
          (r = i.data("range-value-low")),
          (l = document.getElementById(a)),
          (d = document.getElementById(s)),
          (c = {
            start: [parseInt(r)],
            connect: [!0, !1],
            range: { min: [parseInt(n)], max: [parseInt(o)] },
          }),
          noUiSlider.create(l, c),
          l.noUiSlider.on("update", function (e, t) {
            d.textContent = e[t];
          });
      });
  })(),
  RangeSlider = (function () {
    var e = $("#input-slider-range");
    e.length &&
      e.each(function () {
        var e, t, a, n;
        $(this),
          (e = document.getElementById("input-slider-range")),
          (t = document.getElementById("input-slider-range-value-low")),
          (a = document.getElementById("input-slider-range-value-high")),
          (n = [t, a]),
          noUiSlider.create(e, {
            start: [
              parseInt(t.getAttribute("data-range-value-low")),
              parseInt(a.getAttribute("data-range-value-high")),
            ],
            connect: !0,
            range: {
              min: parseInt(e.getAttribute("data-range-value-min")),
              max: parseInt(e.getAttribute("data-range-value-max")),
            },
          }),
          e.noUiSlider.on("update", function (e, t) {
            n[t].textContent = e[t];
          });
      });
  })(),
  ProgressCircle =
    ((Popover = (function () {
      var e = $('[data-toggle="popover"]'),
        t = "";
      e.length &&
        e.each(function () {
          !(function (e) {
            e.data("color") && (t = "popover-" + e.data("color"));
            var a = {
              template:
                '<div class="popover ' +
                t +
                '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
            };
            e.popover(a);
          })($(this));
        });
    })()),
    (function () {
      var e = $(".progress-circle");
      e.length &&
        e.each(function () {
          var e, t, a, n, o, i;
          (e = $(this)),
            (t = e.data().progress),
            (a = e.data().text ? e.data().text : ""),
            (n = e.data().textclass ? e.data().textclass : "progressbar-text"),
            (o = e.data().color ? e.data().color : "primary"),
            (i = {
              color: PurposeStyle.colors.theme[o],
              strokeWidth: 7,
              trailWidth: 2,
              text: { value: a, className: n },
              svgStyle: { display: "block" },
              duration: 1500,
              easing: "easeInOut",
            }),
            new ProgressBar.Circle(e[0], i).animate(t / 100);
        });
    })()),
  QuillEditor = (function () {
    var e = $('[data-toggle="quill"]');
    e.length &&
      e.each(function () {
        var e, t;
        (e = $(this)),
          (t = e.data("quill-placeholder")),
          new Quill(e.get(0), {
            modules: {
              toolbar: [
                ["bold", "italic"],
                ["link", "blockquote", "code", "image"],
                [{ list: "ordered" }, { list: "bullet" }],
              ],
            },
            placeholder: t,
            theme: "snow",
          });
      });
  })(),
  Scrollbar = (function () {
    var e = $(".scrollbar-inner");
    e.length && e.scrollbar().scrollLock();
  })(),
  Select = (function () {
    var e = $('[data-toggle="select"]');
    e.length &&
      e.each(function () {
        $(this).select2({});
      });
  })(),
  Sticky = (function () {
    var e = $('[data-toggle="sticky"]');
    $(window).on("load resize", function () {
      e.length &&
        e.each(function () {
          var e, t;
          (e = $(this)),
            (t = {
              offset_top: e.data("sticky-offset") ? e.data("sticky-offset") : 0,
            }),
            $(window).width() > 1e3
              ? e.stick_in_parent(t)
              : e.trigger("sticky_kit:detach");
        });
    });
  })(),
  SvgInjector = (function () {
    var e = document.querySelectorAll("img.svg-inject");
    e.length && SVGInjector(e);
  })(),
  WpxSwiper = (function () {
    var e = $(".swiper-js-container");
    $(document).ready(function () {
      e.length &&
        e.each(function (e, t) {
          var a, n, o, i, s, r, l, d, c, u, p, g, f, h, m, v, y, b, w, C, k, x;
          (a = $(t)),
            (n = a.find(".swiper-container")),
            (o = a.find(".swiper-pagination")),
            (i = a.find(".swiper-button-next")),
            (s = a.find(".swiper-button-prev")),
            (r = n.data("swiper-effect") ? n.data("swiper-effect") : "slide"),
            (l = n.data("swiper-direction")
              ? n.data("swiper-direction")
              : "horizontal"),
            (d = n.data("swiper-initial-slide")
              ? n.data("swiper-initial-slide")
              : 0),
            (c = !!n.data("swiper-autoheight") && n.data("swiper-autoheight")),
            (u = !!n.data("swiper-autoplay") && n.data("swiper-autoplay")),
            (p =
              !!n.data("swiper-centered-slides") &&
              n.data("swiper-centered-slides")),
            (g = n.data("swiper-pagination-type")
              ? n.data("swiper-pagination-type")
              : "bullets"),
            (f = n.data("swiper-items")),
            (h = n.data("swiper-sm-items")),
            (m = n.data("swiper-md-items")),
            (v = n.data("swiper-lg-items")),
            (y = n.data("swiper-xl-items")),
            (b = n.data("swiper-space-between")),
            (w = n.data("swiper-sm-space-between")),
            (C = n.data("swiper-md-space-between")),
            (k = n.data("swiper-lg-space-between")),
            (x = n.data("swiper-xl-space-between")),
            (f = f || 1),
            (h = h || f),
            (m = m || h),
            (v = v || m),
            (y = y || v),
            (b = b || 0),
            (w = w || b),
            (C = C || w),
            (k = k || C),
            (x = x || k),
            new Swiper(n, {
              pagination: { el: o, clickable: !0, type: g },
              navigation: { nextEl: i, prevEl: s },
              slidesPerView: f,
              spaceBetween: b,
              initialSlide: d,
              autoHeight: c,
              centeredSlides: p,
              mousewheel: !1,
              keyboard: { enabled: !0, onlyInViewport: !1 },
              grabCursor: !0,
              autoplay: u,
              effect: r,
              coverflowEffect: {
                rotate: 10,
                stretch: 0,
                depth: 50,
                modifier: 3,
                slideShadows: !1,
              },
              speed: 800,
              direction: l,
              preventClicks: !0,
              preventClicksPropagation: !0,
              observer: !0,
              observeParents: !0,
              breakpointsInverse: !0,
              breakpoints: {
                575: { slidesPerView: h, spaceBetweenSlides: w },
                767: { slidesPerView: m, spaceBetweenSlides: C },
                991: { slidesPerView: v, spaceBetweenSlides: k },
                1199: { slidesPerView: y, spaceBetweenSlides: x },
              },
            });
        });
    });
  })(),
  Tags = (function () {
    var e = $('[data-toggle="tags"]');
    e.length &&
      e.each(function () {
        $(this).tagsinput({ tagClass: "badge badge-primary" });
      });
  })(),
  Typed = (function () {
    var e = $(".typed");
    e.length &&
      e.each(function () {
        var e, t, a, n;
        (e = $(this)),
          (t = "#" + e.attr("id")),
          (a = (a = e.data("type-this")).split(",")),
          (n = new Typed(t, {
            strings: a,
            typeSpeed: 100,
            backSpeed: 70,
            loop: !0,
          })),
          inView(t)
            .on("enter", function () {
              n.start();
            })
            .on("exit", function () {
              n.stop();
            });
      });
  })(),
  Wavify = (function () {
    var e = $('[data-toggle="wavify"]');
    e.length &&
      e.each(function () {
        $(this)
          .find("path")
          .wavify({ height: 50, bones: 5, amplitude: 40, speed: 0.15 });
      });
  })(),
  EngagementChart = (function () {
    var e = $("#apex-engagement");
    e.length &&
      e.each(function () {
        !(function (e) {
          var t = {
              chart: {
                width: "100%",
                zoom: { enabled: !1 },
                toolbar: { show: !1 },
                shadow: { enabled: !1 },
              },
              stroke: { width: 7, curve: "smooth" },
              series: [{ name: "Likes", data: [4, 3, 10, 9, 29, 19, 22, 9] }],
              xaxis: {
                labels: {
                  format: "MMM",
                  style: {
                    colors: PurposeStyle.colors.gray[600],
                    fontSize: "14px",
                    fontFamily: PurposeStyle.fonts.base,
                    cssClass: "apexcharts-xaxis-label",
                  },
                },
                axisBorder: { show: !1 },
                axisTicks: {
                  show: !0,
                  borderType: "solid",
                  color: PurposeStyle.colors.gray[300],
                  height: 6,
                  offsetX: 0,
                  offsetY: 0,
                },
                type: "datetime",
                categories: [
                  "1/11/2000",
                  "2/11/2000",
                  "3/11/2000",
                  "4/11/2000",
                  "5/11/2000",
                  "6/11/2000",
                  "7/11/2000",
                  "8/11/2000",
                ],
              },
              yaxis: {
                labels: {
                  style: {
                    color: PurposeStyle.colors.gray[600],
                    fontSize: "12px",
                    fontFamily: PurposeStyle.fonts.base,
                  },
                },
                axisBorder: { show: !1 },
                axisTicks: {
                  show: !0,
                  borderType: "solid",
                  color: PurposeStyle.colors.gray[300],
                  height: 6,
                  offsetX: 0,
                  offsetY: 0,
                },
              },
              fill: { type: "solid" },
              markers: {
                size: 4,
                opacity: 0.7,
                strokeColor: "#fff",
                strokeWidth: 3,
                hover: { size: 7 },
              },
              grid: {
                borderColor: PurposeStyle.colors.gray[300],
                strokeDashArray: 5,
              },
              dataLabels: { enabled: !1 },
            },
            a = (e.data().dataset, e.data().labels, e.data().color),
            n = e.data().height,
            o = e.data().type;
          (t.colors = [PurposeStyle.colors.theme[a]]),
            (t.markers.colors = [PurposeStyle.colors.theme[a]]),
            (t.chart.height = n || 350),
            (t.chart.type = o || "line");
          var i = new ApexCharts(e[0], t);
          setTimeout(function () {
            i.render();
          }, 300);
        })($(this));
      });
  })(),
  LineChart = (function () {
    var e = $("#apex-line");
    e.length &&
      e.each(function () {
        !(function (e) {
          var t = {
              chart: {
                zoom: { enabled: !1 },
                toolbar: { show: !1 },
                shadow: { enabled: !1 },
              },
              stroke: { width: 7, curve: "smooth" },
              series: [
                {
                  name: "Likes",
                  data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9],
                },
              ],
              xaxis: {
                labels: {
                  format: "MMM",
                  style: {
                    colors: PurposeStyle.colors.gray[600],
                    fontSize: "14px",
                    fontFamily: PurposeStyle.fonts.base,
                    cssClass: "apexcharts-xaxis-label",
                  },
                },
                axisBorder: { show: !1 },
                axisTicks: {
                  show: !0,
                  borderType: "solid",
                  color: PurposeStyle.colors.gray[300],
                  height: 6,
                  offsetX: 0,
                  offsetY: 0,
                },
                type: "datetime",
                categories: [
                  "1/11/2000",
                  "2/11/2000",
                  "3/11/2000",
                  "4/11/2000",
                  "5/11/2000",
                  "6/11/2000",
                  "7/11/2000",
                  "8/11/2000",
                  "9/11/2000",
                  "10/11/2000",
                  "11/11/2000",
                  "12/11/2000",
                  "1/11/2001",
                  "2/11/2001",
                ],
              },
              yaxis: {
                labels: {
                  style: {
                    color: PurposeStyle.colors.gray[600],
                    fontSize: "12px",
                    fontFamily: PurposeStyle.fonts.base,
                  },
                },
                axisBorder: { show: !1 },
                axisTicks: {
                  show: !0,
                  borderType: "solid",
                  color: PurposeStyle.colors.gray[300],
                  height: 6,
                  offsetX: 0,
                  offsetY: 0,
                },
              },
              fill: { type: "solid" },
              markers: {
                size: 4,
                opacity: 0.7,
                strokeColor: "#fff",
                strokeWidth: 3,
                hover: { size: 7 },
              },
              grid: {
                borderColor: PurposeStyle.colors.gray[300],
                strokeDashArray: 5,
              },
              dataLabels: { enabled: !1 },
            },
            a = (e.data().dataset, e.data().labels, e.data().color),
            n = e.data().height,
            o = e.data().type;
          (t.colors = [PurposeStyle.colors.theme[a]]),
            (t.markers.colors = [PurposeStyle.colors.theme[a]]),
            (t.chart.height = n || 350),
            (t.chart.type = o || "line");
          var i = new ApexCharts(e[0], t);
          setTimeout(function () {
            i.render();
          }, 300);
        })($(this));
      });
  })(),
  SparkChart = (function () {
    var e = $('[data-toggle="spark-chart"]');
    e.length &&
      e.each(function () {
        !(function (e) {
          var t = {
              chart: { width: "100%", sparkline: { enabled: !0 } },
              series: [],
              labels: [],
              stroke: { width: 2, curve: "smooth" },
              markers: { size: 0 },
              colors: [],
              tooltip: {
                fixed: { enabled: !1 },
                x: { show: !1 },
                y: {
                  title: {
                    formatter: function (e) {
                      return "";
                    },
                  },
                },
                marker: { show: !1 },
              },
            },
            a = e.data().dataset,
            n = e.data().labels,
            o = e.data().color,
            i = e.data().height,
            s = e.data().type;
          (t.series = [{ data: a }]),
            n && (t.labels = [n]),
            (t.colors = [PurposeStyle.colors.theme[o]]),
            (t.chart.height = i || 35),
            (t.chart.type = s || "line");
          var r = new ApexCharts(e[0], t);
          setTimeout(function () {
            r.render();
          }, 300);
        })($(this));
      });
  })(),
  WorkedHoursChart = (function () {
    var e = $("#apex-worked-hours");
    e.length &&
      e.each(function () {
        !(function (e) {
          var t = {
              chart: {
                width: "100%",
                type: "bar",
                zoom: { enabled: !1 },
                toolbar: { show: !1 },
                shadow: { enabled: !1 },
              },
              plotOptions: {
                bar: {
                  horizontal: !1,
                  columnWidth: "30%",
                  endingShape: "rounded",
                },
              },
              stroke: { show: !0, width: 2, colors: ["transparent"] },
              series: [{ name: "Worked hours", data: [40, 30, 100, 90, 20] }],
              xaxis: {
                labels: {
                  format: "MMM",
                  style: {
                    colors: PurposeStyle.colors.gray[600],
                    fontSize: "14px",
                    fontFamily: PurposeStyle.fonts.base,
                    cssClass: "apexcharts-xaxis-label",
                  },
                },
                axisBorder: { show: !1 },
                axisTicks: {
                  show: !0,
                  borderType: "solid",
                  color: PurposeStyle.colors.gray[300],
                  height: 6,
                  offsetX: 0,
                  offsetY: 0,
                },
                type: "datetime",
                categories: [
                  "1/11/2000",
                  "2/11/2000",
                  "3/11/2000",
                  "4/11/2000",
                  "5/11/2000",
                ],
              },
              yaxis: {
                labels: {
                  style: {
                    color: PurposeStyle.colors.gray[600],
                    fontSize: "12px",
                    fontFamily: PurposeStyle.fonts.base,
                  },
                },
                axisBorder: { show: !1 },
                axisTicks: {
                  show: !0,
                  borderType: "solid",
                  color: PurposeStyle.colors.gray[300],
                  height: 6,
                  offsetX: 0,
                  offsetY: 0,
                },
              },
              fill: { type: "solid" },
              markers: {
                size: 4,
                opacity: 0.7,
                strokeColor: "#fff",
                strokeWidth: 3,
                hover: { size: 7 },
              },
              grid: {
                borderColor: PurposeStyle.colors.gray[300],
                strokeDashArray: 5,
              },
              dataLabels: { enabled: !1 },
            },
            a = (e.data().dataset, e.data().labels, e.data().color),
            n = e.data().height;
          e.data().type,
            (t.colors = [PurposeStyle.colors.theme[a]]),
            (t.markers.colors = [PurposeStyle.colors.theme[a]]),
            (t.chart.height = n || 350);
          var o = new ApexCharts(e[0], t);
          setTimeout(function () {
            o.render();
          }, 300);
        })($(this));
      });
  })();
