var sbi_js_exists = void 0 !== sbi_js_exists;
sbi_js_exists ||
  (!(function (i) {
    function e() {
      var i,
        e,
        s,
        t = t || { VER: "0.9.944" };
      (t.bgs_Available = !1),
        (t.bgs_CheckRunned = !1),
        (function (i) {
          i.fn.extend({
            sbi_imgLiquid: function (e) {
              (this.defaults = {
                fill: !0,
                verticalAlign: "center",
                horizontalAlign: "center",
                useBackgroundSize: !0,
                useDataHtmlAttr: !0,
                responsive: !0,
                delay: 0,
                fadeInTime: 0,
                removeBoxBackground: !0,
                hardPixels: !0,
                responsiveCheckTime: 500,
                timecheckvisibility: 500,
                onStart: null,
                onFinish: null,
                onItemStart: null,
                onItemFinish: null,
                onItemError: null,
              }),
                (function () {
                  if (!t.bgs_CheckRunned) {
                    t.bgs_CheckRunned = !0;
                    var e = i('<span style="background-size:cover" />');
                    i("body").append(e),
                      (function () {
                        var i = e[0];
                        if (i && window.getComputedStyle) {
                          var s = window.getComputedStyle(i, null);
                          s &&
                            s.backgroundSize &&
                            (t.bgs_Available = "cover" === s.backgroundSize);
                        }
                      })(),
                      e.remove();
                  }
                })();
              var s = this;
              return (
                (this.options = e),
                (this.settings = i.extend({}, this.defaults, this.options)),
                this.settings.onStart && this.settings.onStart(),
                this.each(function (e) {
                  function a() {
                    (r.responsive || h.data("sbi_imgLiquid_oldProcessed")) &&
                      h.data("sbi_imgLiquid_settings") &&
                      ((r = h.data("sbi_imgLiquid_settings")),
                      (l.actualSize =
                        l.get(0).offsetWidth + l.get(0).offsetHeight / 1e4),
                      l.sizeOld && l.actualSize !== l.sizeOld && o(),
                      (l.sizeOld = l.actualSize),
                      setTimeout(a, r.responsiveCheckTime));
                  }
                  function n() {
                    h.data("sbi_imgLiquid_error", !0),
                      l.addClass("sbi_imgLiquid_error"),
                      r.onItemError && r.onItemError(e, l, h),
                      d();
                  }
                  function o() {
                    var i,
                      s,
                      t,
                      a,
                      n,
                      o,
                      g,
                      u,
                      m = 0,
                      _ = 0,
                      f = l.width(),
                      c = l.height();
                    void 0 === h.data("owidth") && h.data("owidth", h[0].width),
                      void 0 === h.data("oheight") &&
                        h.data("oheight", h[0].height),
                      r.fill === f / c >= h.data("owidth") / h.data("oheight")
                        ? ((i = "100%"),
                          (s = "auto"),
                          (t = Math.floor(f)),
                          (a = Math.floor(
                            f * (h.data("oheight") / h.data("owidth"))
                          )))
                        : ((i = "auto"),
                          (s = "100%"),
                          (t = Math.floor(
                            c * (h.data("owidth") / h.data("oheight"))
                          )),
                          (a = Math.floor(c))),
                      (g = f - t),
                      "left" === (n = r.horizontalAlign.toLowerCase()) &&
                        (_ = 0),
                      "center" === n && (_ = 0.5 * g),
                      "right" === n && (_ = g),
                      -1 !== n.indexOf("%") &&
                        (n = parseInt(n.replace("%", ""), 10)) > 0 &&
                        (_ = g * n * 0.01),
                      (u = c - a),
                      "left" === (o = r.verticalAlign.toLowerCase()) && (m = 0),
                      "center" === o && (m = 0.5 * u),
                      "bottom" === o && (m = u),
                      -1 !== o.indexOf("%") &&
                        (o = parseInt(o.replace("%", ""), 10)) > 0 &&
                        (m = u * o * 0.01),
                      r.hardPixels && ((i = t), (s = a)),
                      h.css({
                        width: i,
                        height: s,
                        "margin-left": Math.floor(_),
                        "margin-top": Math.floor(m),
                      }),
                      h.data("sbi_imgLiquid_oldProcessed") ||
                        (h.fadeTo(r.fadeInTime, 1),
                        h.data("sbi_imgLiquid_oldProcessed", !0),
                        r.removeBoxBackground &&
                          l.css("background-image", "none"),
                        l.addClass("sbi_imgLiquid_nobgSize"),
                        l.addClass("sbi_imgLiquid_ready")),
                      r.onItemFinish && r.onItemFinish(e, l, h),
                      d();
                  }
                  function d() {
                    e === s.length - 1 &&
                      s.settings.onFinish &&
                      s.settings.onFinish();
                  }
                  var r = s.settings,
                    l = i(this),
                    h = i("img:first", l);
                  return h.length
                    ? (h.data("sbi_imgLiquid_settings")
                        ? (l
                            .removeClass("sbi_imgLiquid_error")
                            .removeClass("sbi_imgLiquid_ready"),
                          (r = i.extend(
                            {},
                            h.data("sbi_imgLiquid_settings"),
                            s.options
                          )))
                        : (r = i.extend(
                            {},
                            s.settings,
                            (function () {
                              var i = {};
                              if (s.settings.useDataHtmlAttr) {
                                var e = l.attr("data-sbi_imgLiquid-fill"),
                                  a = l.attr(
                                    "data-sbi_imgLiquid-horizontalAlign"
                                  ),
                                  n = l.attr(
                                    "data-sbi_imgLiquid-verticalAlign"
                                  );
                                ("true" === e || "false" === e) &&
                                  (i.fill = Boolean("true" === e)),
                                  void 0 === a ||
                                    ("left" !== a &&
                                      "center" !== a &&
                                      "right" !== a &&
                                      -1 === a.indexOf("%")) ||
                                    (i.horizontalAlign = a),
                                  void 0 === n ||
                                    ("top" !== n &&
                                      "bottom" !== n &&
                                      "center" !== n &&
                                      -1 === n.indexOf("%")) ||
                                    (i.verticalAlign = n);
                              }
                              return (
                                t.isIE &&
                                  s.settings.ieFadeInDisabled &&
                                  (i.fadeInTime = 0),
                                i
                              );
                            })()
                          )),
                      h.data("sbi_imgLiquid_settings", r),
                      r.onItemStart && r.onItemStart(e, l, h),
                      void (t.bgs_Available && r.useBackgroundSize
                        ? (-1 ===
                            l
                              .css("background-image")
                              .indexOf(encodeURI(h.attr("src"))) &&
                            l.css({
                              "background-image":
                                'url("' + encodeURI(h.attr("src")) + '")',
                            }),
                          l.css({
                            "background-size": r.fill ? "cover" : "contain",
                            "background-position": (
                              r.horizontalAlign +
                              " " +
                              r.verticalAlign
                            ).toLowerCase(),
                            "background-repeat": "no-repeat",
                          }),
                          i("a:first", l).css({
                            display: "block",
                            width: "100%",
                            height: "100%",
                          }),
                          i("img", l).css({ display: "none" }),
                          r.onItemFinish && r.onItemFinish(e, l, h),
                          l.addClass("sbi_imgLiquid_bgSize"),
                          l.addClass("sbi_imgLiquid_ready"),
                          d())
                        : (function s() {
                            if (
                              h.data("oldSrc") &&
                              h.data("oldSrc") !== h.attr("src")
                            ) {
                              var t = h.clone().removeAttr("style");
                              return (
                                t.data(
                                  "sbi_imgLiquid_settings",
                                  h.data("sbi_imgLiquid_settings")
                                ),
                                h.parent().prepend(t),
                                h.remove(),
                                ((h = t)[0].width = 0),
                                void setTimeout(s, 10)
                              );
                            }
                            return h.data("sbi_imgLiquid_oldProcessed")
                              ? void o()
                              : (h.data("sbi_imgLiquid_oldProcessed", !1),
                                h.data("oldSrc", h.attr("src")),
                                i("img:not(:first)", l).css("display", "none"),
                                l.css({ overflow: "hidden" }),
                                h
                                  .fadeTo(0, 0)
                                  .removeAttr("width")
                                  .removeAttr("height")
                                  .css({
                                    visibility: "visible",
                                    "max-width": "none",
                                    "max-height": "none",
                                    width: "auto",
                                    height: "auto",
                                    display: "block",
                                  }),
                                h.on("error", n),
                                (h[0].onerror = n),
                                (function i() {
                                  h.data("sbi_imgLiquid_error") ||
                                    h.data("sbi_imgLiquid_loaded") ||
                                    h.data("sbi_imgLiquid_oldProcessed") ||
                                    (l.is(":visible") &&
                                    h[0].complete &&
                                    h[0].width > 0 &&
                                    h[0].height > 0
                                      ? (h.data("sbi_imgLiquid_loaded", !0),
                                        setTimeout(o, e * r.delay))
                                      : setTimeout(i, r.timecheckvisibility));
                                })(),
                                void a());
                          })()))
                    : void n();
                })
              );
            },
          });
        })(jQuery),
        (i = t.injectCss),
        (e = document.getElementsByTagName("head")[0]),
        ((s = document.createElement("style")).type = "text/css"),
        s.styleSheet
          ? (s.styleSheet.cssText = i)
          : s.appendChild(document.createTextNode(i)),
        e.appendChild(s);
    }
    function s() {
      (this.feeds = {}), (this.options = sb_instagram_js_options);
    }
    function t(i, e, s) {
      (this.el = i),
        (this.index = e),
        (this.settings = s),
        (this.minImageWidth = 0),
        (this.imageResolution = 150),
        (this.resizedImages = {}),
        (this.needsResizing = []),
        (this.outOfPages = !1),
        (this.isInitialized = !1);
    }
    function a(e, s) {
      i.ajax({ url: sbiajaxurl, type: "post", data: e, success: s });
    }
    (s.prototype = {
      createPage: function (e, s) {
        (void 0 !== window.sbiajaxurl &&
          -1 !== window.sbiajaxurl.indexOf(window.location.hostname)) ||
          (window.sbiajaxurl =
            location.protocol +
            "//" +
            window.location.hostname +
            "/wp-admin/admin-ajax.php"),
          i(".sbi_no_js_error_message").remove(),
          i(".sbi_no_js").removeClass("sbi_no_js"),
          e(s);
      },
      createFeeds: function (e) {
        e.whenFeedsCreated(
          i(".sbi").each(function (e) {
            i(this).attr("data-sbi-index", e + 1);
            var s = i(this),
              n =
                void 0 !== s.attr("data-sbi-flags")
                  ? s.attr("data-sbi-flags").split(",")
                  : [],
              o =
                void 0 !== s.attr("data-options")
                  ? JSON.parse(s.attr("data-options"))
                  : {};
            if (n.indexOf("testAjax") > -1) {
              window.sbi.triggeredTest = !0;
              a({ action: "sbi_on_ajax_test_trigger" }, function (i) {
                console.log("did test");
              });
            }
            var d = {
              cols: s.attr("data-cols"),
              colsmobile:
                "same" !== s.attr("data-colsmobile")
                  ? s.attr("data-colsmobile")
                  : s.attr("data-cols"),
              num: s.attr("data-num"),
              imgRes: s.attr("data-res"),
              feedID: s.attr("data-feedid"),
              shortCodeAtts: s.attr("data-shortcode-atts"),
              resizingEnabled: -1 === n.indexOf("resizeDisable"),
              imageLoadEnabled: -1 === n.indexOf("imageLoadDisable"),
              debugEnabled: n.indexOf("debug") > -1,
              favorLocal: n.indexOf("favorLocal") > -1,
              ajaxPostLoad: n.indexOf("ajaxPostLoad") > -1,
              autoMinRes: 1,
              general: o,
            };
            (window.sbi.feeds[e] = (function (i, e, s) {
              return new t(i, e, s);
            })(this, e, d)),
              window.sbi.feeds[e].setResizedImages(),
              window.sbi.feeds[e].init();
            var r = jQuery.Event("sbiafterfeedcreate");
            (r.feed = window.sbi.feeds[e]), jQuery(window).trigger(r);
          })
        );
      },
      afterFeedsCreated: function () {
        i(".sb_instagram_header").each(function () {
          var e = i(this);
          e.find(".sbi_header_link").hover(
            function () {
              e.find(".sbi_header_img_hover").addClass("sbi_fade_in");
            },
            function () {
              e.find(".sbi_header_img_hover").removeClass("sbi_fade_in");
            }
          );
        });
      },
      encodeHTML: function (i) {
        return void 0 === i
          ? ""
          : i
              .replace(/(>)/g, "&gt;")
              .replace(/(<)/g, "&lt;")
              .replace(/(&lt;br\/&gt;)/g, "<br>")
              .replace(/(&lt;br&gt;)/g, "<br>");
      },
      urlDetect: function (i) {
        return i.match(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/g
        );
      },
    }),
      (t.prototype = {
        init: function () {
          var e = this;
          i(this.el).find("#sbi_mod_error").length &&
            i(this.el).prepend(i(this.el).find("#sbi_mod_error")),
            this.settings.ajaxPostLoad
              ? this.getNewPostSet()
              : this.afterInitialImagesLoaded();
          var s,
            t =
              ((s = 0),
              function (i, e) {
                clearTimeout(s), (s = setTimeout(i, e));
              });
          jQuery(window).resize(function () {
            t(function () {
              e.afterResize();
            }, 500);
          });
        },
        initLayout: function () {},
        afterInitialImagesLoaded: function () {
          this.initLayout(),
            this.loadMoreButtonInit(),
            this.hideExtraImagesForWidth(),
            this.beforeNewImagesRevealed(),
            this.revealNewImages(),
            this.afterNewImagesRevealed();
        },
        afterResize: function () {
          this.setImageHeight(),
            this.setImageResolution(),
            this.maybeRaiseImageResolution(),
            this.setImageSizeClass();
        },
        afterLoadMoreClicked: function (i) {
          i.find(".sbi_loader").removeClass("sbi_hidden"),
            i.find(".sbi_btn_text").addClass("sbi_hidden"),
            i
              .closest(".sbi")
              .find(".sbi_num_diff_hide")
              .addClass("sbi_transition")
              .removeClass("sbi_num_diff_hide");
        },
        afterNewImagesLoaded: function () {
          var e = i(this.el),
            s = this;
          this.beforeNewImagesRevealed(),
            this.revealNewImages(),
            this.afterNewImagesRevealed(),
            setTimeout(function () {
              e.find(".sbi_loader").addClass("sbi_hidden"),
                e.find(".sbi_btn_text").removeClass("sbi_hidden"),
                s.maybeRaiseImageResolution();
            }, 500);
        },
        beforeNewImagesRevealed: function () {
          this.setImageHeight(),
            this.maybeRaiseImageResolution(!0),
            this.setImageSizeClass();
        },
        revealNewImages: function () {
          var e = i(this.el);
          e.find(".sbi-screenreader").each(function () {
            i(this).find("img").remove();
          }),
            "function" == typeof sbi_custom_js &&
              setTimeout(function () {
                sbi_custom_js();
              }, 100),
            this.applyImageLiquid(),
            e.find(".sbi_item").each(function (i) {
              jQuery(this)
                .find(".sbi_photo")
                .hover(
                  function () {
                    jQuery(this).fadeTo(200, 0.85);
                  },
                  function () {
                    jQuery(this).stop().fadeTo(500, 1);
                  }
                );
            }),
            setTimeout(function () {
              jQuery("#sbi_images .sbi_item.sbi_new").removeClass("sbi_new");
              var i = 10;
              e.find(".sbi_transition").each(function () {
                var e = jQuery(this);
                setTimeout(function () {
                  e.removeClass("sbi_transition");
                }, i),
                  (i += 10);
              });
            }, 500);
        },
        afterNewImagesRevealed: function () {
          this.listenForVisibilityChange(),
            this.sendNeedsResizingToServer(),
            this.settings.imageLoadEnabled ||
              i(".sbi_no_resraise").removeClass("sbi_no_resraise");
          var e = i.Event("sbiafterimagesloaded");
          (e.el = i(this.el)), i(window).trigger(e);
        },
        setResizedImages: function () {
          i(this.el).find(".sbi_resized_image_data").length &&
            void 0 !==
              i(this.el).find(".sbi_resized_image_data").attr("data-resized") &&
            0 ===
              i(this.el)
                .find(".sbi_resized_image_data")
                .attr("data-resized")
                .indexOf('{"') &&
            ((this.resizedImages = JSON.parse(
              i(this.el).find(".sbi_resized_image_data").attr("data-resized")
            )),
            i(this.el).find(".sbi_resized_image_data").remove());
        },
        sendNeedsResizingToServer: function () {
          var e = this;
          if (e.needsResizing.length > 0 && e.settings.resizingEnabled) {
            var s = i(this.el).find(".sbi_item").length;
            a(
              {
                action: "sbi_resized_images_submit",
                needs_resizing: e.needsResizing,
                offset: s,
                feed_id: e.settings.feedID,
                atts: e.settings.shortCodeAtts,
              },
              function (i) {
                if (0 === i.trim().indexOf("{")) {
                  var s = JSON.parse(i);
                  e.settings.debugEnabled && console.log(s);
                }
              }
            );
          }
        },
        loadMoreButtonInit: function () {
          var e = i(this.el),
            s = this;
          e.find("#sbi_load .sbi_load_btn")
            .off()
            .on("click", function () {
              s.afterLoadMoreClicked(jQuery(this)), s.getNewPostSet();
            });
        },
        getNewPostSet: function () {
          var e = i(this.el),
            s = this;
          a(
            {
              action: "sbi_load_more_clicked",
              offset: e.find(".sbi_item").length,
              feed_id: s.settings.feedID,
              atts: s.settings.shortCodeAtts,
              current_resolution: s.imageResolution,
            },
            function (t) {
              if (0 === t.trim().indexOf("{")) {
                var a = JSON.parse(t);
                s.settings.debugEnabled && console.log(a),
                  s.appendNewPosts(a.html),
                  s.addResizedImages(a.resizedImages),
                  s.settings.ajaxPostLoad
                    ? ((s.settings.ajaxPostLoad = !1),
                      s.afterInitialImagesLoaded())
                    : s.afterNewImagesLoaded(),
                  a.feedStatus.shouldPaginate
                    ? (s.outOfPages = !1)
                    : ((s.outOfPages = !0), e.find(".sbi_load_btn").hide()),
                  i(".sbi_no_js").removeClass("sbi_no_js");
              }
            }
          );
        },
        appendNewPosts: function (e) {
          var s = i(this.el);
          s.find("#sbi_images .sbi_item").length
            ? s.find("#sbi_images .sbi_item").last().after(e)
            : s.find("#sbi_images").append(e);
        },
        addResizedImages: function (i) {
          for (var e in i) this.resizedImages[e] = i[e];
        },
        setImageHeight: function () {
          var e = i(this.el),
            s = e.find(".sbi_photo").eq(0).innerWidth(),
            t = this.getColumnCount(),
            a =
              e.find("#sbi_images").innerWidth() -
              e.find("#sbi_images").width(),
            n = a / 2;
          (sbi_photo_width_manual = e.find("#sbi_images").width() / t - a),
            e.find(".sbi_photo").css("height", s),
            e.find(".sbi-owl-nav").length &&
              setTimeout(function () {
                var i = 2;
                e.find(".sbi_owl2row-item").length && (i = 1);
                var s = e.find(".sbi_photo").eq(0).innerWidth() / i;
                (s += parseInt(n) * (2 - i + 2)),
                  e.find(".sbi-owl-nav div").css("top", s);
              }, 100);
        },
        maybeRaiseSingleImageResolution: function (e, s, t) {
          var a = this,
            n = a.getImageUrls(e),
            o = e.find(".sbi_photo img").attr("src"),
            d = 150,
            r = e.find("img").get(0),
            l =
              o === window.sbi.options.placeholder
                ? 1
                : r.naturalWidth / r.naturalHeight;
          t = void 0 !== t && t;
          if (
            !(
              e.hasClass("sbi_no_resraise") ||
              e.hasClass("sbi_had_error") ||
              (e.find(".sbi_link_area").length &&
                e.find(".sbi_link_area").hasClass("sbi_had_error"))
            )
          ) {
            i.each(n, function (i, e) {
              e === o && ((d = parseInt(i)), (t = !1));
            });
            var h = 640;
            switch (a.settings.imgRes) {
              case "thumb":
                h = 150;
                break;
              case "medium":
                h = 320;
                break;
              case "full":
                h = 640;
                break;
              default:
                var g = Math.max(
                    a.settings.autoMinRes,
                    e.find(".sbi_photo").innerWidth()
                  ),
                  u = a.getBestResolutionForAuto(g, l, e);
                switch (u) {
                  case 320:
                    h = 320;
                    break;
                  case 150:
                    h = 150;
                }
            }
            if (h > d || o === window.sbi.options.placeholder || t) {
              if (a.settings.debugEnabled) {
                var m =
                  o === window.sbi.options.placeholder
                    ? "was placeholder"
                    : "too small";
                console.log("rais res for " + o, m);
              }
              var _ = n[h].split("?ig_cache_key")[0];
              if (
                (e.find(".sbi_photo img").attr("src", _),
                e
                  .find(".sbi_photo")
                  .css("background-image", 'url("' + _ + '")'),
                (d = h),
                "auto" === a.settings.imgRes)
              ) {
                var f = !1;
                e.find(".sbi_photo img").on("load", function () {
                  var s = i(this),
                    t = s.get(0).naturalWidth / s.get(0).naturalHeight;
                  if (1e3 !== s.get(0).naturalWidth && t > l && !f) {
                    switch (
                      (a.settings.debugEnabled &&
                        console.log(
                          "rais res again for aspect ratio change " + o
                        ),
                      (f = !0),
                      (g = e.find(".sbi_photo").innerWidth()),
                      (u = a.getBestResolutionForAuto(g, t, e)),
                      (h = 640),
                      u)
                    ) {
                      case 320:
                        h = 320;
                        break;
                      case 150:
                        h = 150;
                    }
                    h > d &&
                      ((_ = n[h].split("?ig_cache_key")[0]),
                      s.attr("src", _),
                      s
                        .closest(".sbi_photo")
                        .css("background-image", 'url("' + _ + '")')),
                      ("masonry" !== a.layout && "highlight" !== a.layout) ||
                        (i(a.el).find("#sbi_images").smashotope(a.isotopeArgs),
                        setTimeout(function () {
                          i(a.el).find("#sbi_images").smashotope(a.isotopeArgs);
                        }, 500));
                  } else if (a.settings.debugEnabled) {
                    var r = f ? "already checked" : "no aspect ratio change";
                    console.log("not raising res for replacement  " + o, r);
                  }
                });
              }
            }
            e.find("img").on("error", function () {
              if (i(this).hasClass("sbi_img_error"))
                console.log("unfixed error " + i(this).attr("src"));
              else {
                var e;
                if (
                  (i(this).addClass("sbi_img_error"),
                  i(this).attr("src").indexOf("media?size=") > -1 ||
                    i(this).attr("src").indexOf("cdninstagram") > -1 ||
                    i(this).attr("src").indexOf("fbcdn") > -1)
                )
                  (a.settings.favorLocal = !0),
                    void 0 !==
                      (e = a.getImageUrls(i(this).closest(".sbi_item")))[640] &&
                      (i(this).attr("src", e[640]),
                      i(this)
                        .closest(".sbi_photo")
                        .css("background-image", "url(" + e[640] + ")"),
                      i(this)
                        .closest(".sbi_item")
                        .addClass("sbi_had_error")
                        .find(".sbi_link_area")
                        .attr("href", e[640])
                        .addClass("sbi_had_error"));
                else if (
                  "undefined" !==
                  i(this).closest(".sbi_photo").attr("data-img-src-set")
                )
                  void 0 !==
                    (e = JSON.parse(
                      i(this)
                        .closest(".sbi_photo")
                        .attr("data-img-src-set")
                        .replace(/\\\//g, "/")
                    )).d &&
                    (i(this).attr("src", e.d),
                    i(this)
                      .closest(".sbi_photo")
                      .css("background-image", "url(" + e.d + ")"),
                    i(this)
                      .closest(".sbi_item")
                      .addClass("sbi_had_error")
                      .find(".sbi_link_area")
                      .attr("href", e[640])
                      .addClass("sbi_had_error"));
                setTimeout(function () {
                  a.afterResize();
                }, 1500);
              }
            });
          }
        },
        maybeRaiseImageResolution: function (e) {
          var s = this,
            t = void 0 !== e && !0 === e ? ".sbi_item.sbi_new" : ".sbi_item",
            a = !s.isInitialized;
          i(s.el)
            .find(t)
            .each(function (e) {
              !i(this).hasClass("sbi_num_diff_hide") &&
                i(this).find(".sbi_photo").length &&
                void 0 !==
                  i(this).find(".sbi_photo").attr("data-img-src-set") &&
                s.maybeRaiseSingleImageResolution(i(this), e, a);
            }),
            (s.isInitialized = !0);
        },
        getBestResolutionForAuto: function (e, s, t) {
          (isNaN(s) || s < 1) && (s = 1);
          var a = e * s,
            n = 10 * Math.ceil(a / 10),
            o = [150, 320, 640];
          if (
            (t.hasClass("sbi_highlighted") && (n *= 2),
            -1 === o.indexOf(parseInt(n)))
          ) {
            var d = !1;
            i.each(o, function (i, e) {
              e > parseInt(n) && !d && ((n = e), (d = !0));
            });
          }
          return n;
        },
        hideExtraImagesForWidth: function () {
          if ("carousel" !== this.layout) {
            var e = i(this.el),
              s =
                void 0 !== e.attr("data-num") && "" !== e.attr("data-num")
                  ? parseInt(e.attr("data-num"))
                  : 1,
              t =
                void 0 !== e.attr("data-nummobile") &&
                "" !== e.attr("data-nummobile")
                  ? parseInt(e.attr("data-nummobile"))
                  : s;
            i(window).width() < 480
              ? t < e.find(".sbi_item").length &&
                e
                  .find(".sbi_item")
                  .slice(t - e.find(".sbi_item").length)
                  .addClass("sbi_num_diff_hide")
              : s < e.find(".sbi_item").length &&
                e
                  .find(".sbi_item")
                  .slice(s - e.find(".sbi_item").length)
                  .addClass("sbi_num_diff_hide");
          }
        },
        setImageSizeClass: function () {
          var e = i(this.el);
          e.removeClass("sbi_small sbi_medium");
          var s = e.innerWidth(),
            t =
              parseInt(
                e.find("#sbi_images").outerWidth() -
                  e.find("#sbi_images").width()
              ) / 2,
            a = this.getColumnCount(),
            n = (s - t * (a + 2)) / a;
          n > 120 && n < 240
            ? e.addClass("sbi_medium")
            : n <= 120 && e.addClass("sbi_small");
        },
        setMinImageWidth: function () {
          i(this.el).find(".sbi_item .sbi_photo").first().length
            ? (this.minImageWidth = i(this.el)
                .find(".sbi_item .sbi_photo")
                .first()
                .innerWidth())
            : (this.minImageWidth = 150);
        },
        setImageResolution: function () {
          if ("auto" === this.settings.imgRes) this.imageResolution = "auto";
          else
            switch (this.settings.imgRes) {
              case "thumb":
                this.imageResolution = 150;
                break;
              case "medium":
                this.imageResolution = 320;
                break;
              default:
                this.imageResolution = 640;
            }
        },
        getImageUrls: function (i) {
          var e = JSON.parse(
              i
                .find(".sbi_photo")
                .attr("data-img-src-set")
                .replace(/\\\//g, "/")
            ),
            s = i.attr("id").replace("sbi_", "");
          if (
            void 0 !== this.resizedImages[s] &&
            "video" !== this.resizedImages[s] &&
            "pending" !== this.resizedImages[s] &&
            "error" !== this.resizedImages[s].id &&
            "video" !== this.resizedImages[s].id &&
            "pending" !== this.resizedImages[s].id
          ) {
            if (void 0 !== this.resizedImages[s].sizes) {
              var t = [];
              void 0 !== this.resizedImages[s].sizes.full &&
                ((e[640] =
                  sb_instagram_js_options.resized_url +
                  this.resizedImages[s].id +
                  "full.jpg"),
                t.push(640)),
                void 0 !== this.resizedImages[s].sizes.low &&
                  ((e[320] =
                    sb_instagram_js_options.resized_url +
                    this.resizedImages[s].id +
                    "low.jpg"),
                  t.push(320)),
                void 0 !== this.resizedImages[s].sizes.thumb &&
                  (t.push(150),
                  (e[150] =
                    sb_instagram_js_options.resized_url +
                    this.resizedImages[s].id +
                    "thumb.jpg")),
                this.settings.favorLocal &&
                  (-1 === t.indexOf(640) &&
                    t.indexOf(320) > -1 &&
                    (e[640] =
                      sb_instagram_js_options.resized_url +
                      this.resizedImages[s].id +
                      "low.jpg"),
                  -1 === t.indexOf(320) &&
                    (t.indexOf(640) > -1
                      ? (e[320] =
                          sb_instagram_js_options.resized_url +
                          this.resizedImages[s].id +
                          "full.jpg")
                      : t.indexOf(150) > -1 &&
                        (e[320] =
                          sb_instagram_js_options.resized_url +
                          this.resizedImages[s].id +
                          "thumb.jpg")),
                  -1 === t.indexOf(150) &&
                    (t.indexOf(320) > -1
                      ? (e[150] =
                          sb_instagram_js_options.resized_url +
                          this.resizedImages[s].id +
                          "low.jpg")
                      : t.indexOf(640) > -1 &&
                        (e[150] =
                          sb_instagram_js_options.resized_url +
                          this.resizedImages[s].id +
                          "full.jpg")));
            }
          } else
            (void 0 === this.resizedImages[s] ||
              (void 0 !== this.resizedImages[s].id &&
                "pending" !== this.resizedImages[s].id &&
                "error" !== this.resizedImages[s].id)) &&
              this.addToNeedsResizing(s);
          return e;
        },
        getAvatarUrl: function (i, e) {
          if ("" === i) return "";
          var s = this.settings.general.avatars;
          return "local" === (e = void 0 !== e ? e : "local")
            ? void 0 !== s["LCL" + i] && 1 === parseInt(s["LCL" + i])
              ? sb_instagram_js_options.resized_url + i + ".jpg"
              : void 0 !== s[i]
              ? s[i]
              : ""
            : void 0 !== s[i]
            ? s[i]
            : void 0 !== s["LCL" + i] && 1 === parseInt(s["LCL" + i])
            ? sb_instagram_js_options.resized_url + i + ".jpg"
            : "";
        },
        addToNeedsResizing: function (i) {
          -1 === this.needsResizing.indexOf(i) && this.needsResizing.push(i);
        },
        applyImageLiquid: function () {
          var s = i(this.el);
          e(),
            "function" == typeof s.find(".sbi_photo").sbi_imgLiquid &&
              s.find(".sbi_photo").sbi_imgLiquid({ fill: !0 });
        },
        listenForVisibilityChange: function () {
          var e,
            s,
            t,
            a = this;
          (e = jQuery),
            (s = {
              callback: function () {},
              runOnLoad: !0,
              frequency: 100,
              sbiPreviousVisibility: null,
            }),
            (t = {
              sbiCheckVisibility: function (i, e) {
                if (jQuery.contains(document, i[0])) {
                  var s = e.sbiPreviousVisibility,
                    a = i.is(":visible");
                  (e.sbiPreviousVisibility = a),
                    null == s
                      ? e.runOnLoad && e.callback(i, a)
                      : s !== a && e.callback(i, a),
                    setTimeout(function () {
                      t.sbiCheckVisibility(i, e);
                    }, e.frequency);
                }
              },
            }),
            (e.fn.sbiVisibilityChanged = function (i) {
              var a = e.extend({}, s, i);
              return this.each(function () {
                t.sbiCheckVisibility(e(this), a);
              });
            }),
            "function" ==
              typeof i(this.el).filter(":hidden").sbiVisibilityChanged &&
              i(this.el)
                .filter(":hidden")
                .sbiVisibilityChanged({
                  callback: function (i, e) {
                    a.afterResize();
                  },
                  runOnLoad: !1,
                });
        },
        getColumnCount: function () {
          var e = i(this.el),
            s = this.settings.cols,
            t = this.settings.colsmobile,
            a = s;
          return (
            (sbiWindowWidth = window.innerWidth),
            e.hasClass("sbi_mob_col_auto")
              ? (sbiWindowWidth < 640 &&
                  parseInt(s) > 2 &&
                  parseInt(s) < 7 &&
                  (a = 2),
                sbiWindowWidth < 640 &&
                  parseInt(s) > 6 &&
                  parseInt(s) < 11 &&
                  (a = 4),
                sbiWindowWidth <= 480 && parseInt(s) > 2 && (a = 1))
              : sbiWindowWidth <= 480 && (a = t),
            parseInt(a)
          );
        },
      }),
      (window.sbi_init = function () {
        (window.sbi = new s()),
          window.sbi.createPage(window.sbi.createFeeds, {
            whenFeedsCreated: window.sbi.afterFeedsCreated,
          });
      });
  })(jQuery),
  jQuery(document).ready(function (i) {
    void 0 === window.sb_instagram_js_options &&
      (window.sb_instagram_js_options = {
        font_method: "svg",
        resized_url:
          location.protocol +
          "//" +
          window.location.hostname +
          "/wp-content/uploads/sb-instagram-feed-images/",
        placeholder:
          location.protocol +
          "//" +
          window.location.hostname +
          "/wp-content/plugins/instagram-feed/img/placeholder.png",
      }),
      void 0 !== window.sb_instagram_js_options.resized_url &&
        -1 ===
          window.sb_instagram_js_options.resized_url.indexOf(
            location.protocol
          ) &&
        ("http:" === location.protocol
          ? (window.sb_instagram_js_options.resized_url = window.sb_instagram_js_options.resized_url.replace(
              "http:",
              "https:"
            ))
          : (window.sb_instagram_js_options.resized_url = window.sb_instagram_js_options.resized_url.replace(
              "https:",
              "http:"
            ))),
      sbi_init();
  }));
/*!
 * @fileOverview TouchSwipe - jQuery Plugin @version 1.6.18 / SANDBOXED VERSION FOR TP
 * @author Matt Bryson http://www.github.com/mattbryson
 * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * @see http://labs.rampinteractive.co.uk/touchSwipe/
 * @see http://plugins.jquery.com/project/touchSwipe
 * @license
 * Copyright (c) 2010-2015 Matt Bryson
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */ !(function (e) {
  "function" == typeof define && define.amd && define.amd.jQuery
    ? define(["jquery"], e)
    : "undefined" != typeof module && module.exports
    ? e(require("jquery"))
    : e(jQuery);
})(function (ae) {
  "use strict";
  var ue = "left",
    se = "right",
    ce = "up",
    pe = "down",
    fe = "in",
    he = "out",
    ge = "none",
    de = "auto",
    we = "swipe",
    ve = "pinch",
    Te = "tap",
    ye = "doubletap",
    Ee = "longtap",
    me = "horizontal",
    xe = "vertical",
    be = "all",
    Se = 10,
    Oe = "start",
    Me = "move",
    Pe = "end",
    De = "cancel",
    Le = "ontouchstart" in window,
    Re = window.navigator.msPointerEnabled && !window.PointerEvent && !Le,
    ke = (window.PointerEvent || window.navigator.msPointerEnabled) && !Le,
    Ae = "TouchSwipe";
  function r(e, h) {
    h = ae.extend({}, h);
    var t = Le || ke || !h.fallbackToMouseEvents,
      n = t
        ? ke
          ? Re
            ? "MSPointerDown"
            : "pointerdown"
          : "touchstart"
        : "mousedown",
      r = t
        ? ke
          ? Re
            ? "MSPointerMove"
            : "pointermove"
          : "touchmove"
        : "mousemove",
      i = t
        ? ke
          ? Re
            ? "MSPointerUp"
            : "pointerup"
          : "touchend"
        : "mouseup",
      l = t ? (ke ? "mouseleave" : null) : "mouseleave",
      o = ke ? (Re ? "MSPointerCancel" : "pointercancel") : "touchcancel",
      g = 0,
      d = null,
      w = null,
      v = 0,
      T = 0,
      y = 0,
      E = 1,
      m = 0,
      x = 0,
      b = null,
      a = ae(e),
      S = "start",
      O = 0,
      M = {},
      u = 0,
      P = 0,
      s = 0,
      c = 0,
      p = 0,
      f = null,
      D = null;
    try {
      a.on(n, L), a.on(o, A);
    } catch (e) {
      ae.error("events not supported " + n + "," + o + " on jQuery.swipe");
    }
    function L(e) {
      if (
        !0 !== a.data(Ae + "_intouch") &&
        !(0 < ae(e.target).closest(h.excludedElements, a).length)
      ) {
        var t = e.originalEvent ? e.originalEvent : e;
        if (
          !t.pointerType ||
          "mouse" != t.pointerType ||
          0 != h.fallbackToMouseEvents
        ) {
          var n,
            r,
            i = t.touches,
            l = i ? i[0] : t;
          return ((S = Oe),
          i
            ? (O = i.length)
            : !1 !== h.preventDefaultEvents && e.preventDefault(),
          (x = w = d = null),
          (E = 1),
          (m = y = T = v = g = 0),
          ((r = {})[ue] = ne(ue)),
          (r[se] = ne(se)),
          (r[ce] = ne(ce)),
          (r[pe] = ne(pe)),
          (b = r),
          B(),
          $(0, l),
          !i || O === h.fingers || h.fingers === be || F()
            ? ((u = oe()),
              2 == O && ($(1, i[1]), (T = y = ie(M[0].start, M[1].start))),
              (h.swipeStatus || h.pinchStatus) && (n = N(t, S)))
            : (n = !1),
          !1 === n)
            ? (N(t, (S = De)), n)
            : (h.hold &&
                (D = setTimeout(
                  ae.proxy(function () {
                    a.trigger("hold", [t.target]),
                      h.hold && (n = h.hold.call(a, t, t.target));
                  }, this),
                  h.longTapThreshold
                )),
              K(!0),
              null);
        }
      }
    }
    function R(e) {
      var t = e.originalEvent ? e.originalEvent : e;
      if (S !== Pe && S !== De && !J()) {
        var n,
          r,
          i,
          l,
          o,
          a,
          u,
          s = t.touches,
          c = ee(s ? s[0] : t);
        if (
          ((P = oe()),
          s && (O = s.length),
          h.hold && clearTimeout(D),
          (S = Me),
          2 == O &&
            (0 == T
              ? ($(1, s[1]), (T = y = ie(M[0].start, M[1].start)))
              : (ee(s[1]),
                (y = ie(M[0].end, M[1].end)),
                M[0].end,
                M[1].end,
                (x = E < 1 ? he : fe)),
            (E = ((y / T) * 1).toFixed(2)),
            (m = Math.abs(T - y))),
          O === h.fingers || h.fingers === be || !s || F())
        ) {
          if (
            ((d = le(c.start, c.end)),
            (function (e, t) {
              if (!1 === h.preventDefaultEvents) return;
              if (h.allowPageScroll === ge) e.preventDefault();
              else {
                var n = h.allowPageScroll === de;
                switch (t) {
                  case ue:
                    ((h.swipeLeft && n) || (!n && h.allowPageScroll != me)) &&
                      e.preventDefault();
                    break;
                  case se:
                    ((h.swipeRight && n) || (!n && h.allowPageScroll != me)) &&
                      e.preventDefault();
                    break;
                  case ce:
                    ((h.swipeUp && n) || (!n && h.allowPageScroll != xe)) &&
                      e.preventDefault();
                    break;
                  case pe:
                    ((h.swipeDown && n) || (!n && h.allowPageScroll != xe)) &&
                      e.preventDefault();
                }
              }
            })(e, (w = le(c.last, c.end))),
            (a = c.start),
            (u = c.end),
            (g = Math.round(
              Math.sqrt(Math.pow(u.x - a.x, 2) + Math.pow(u.y - a.y, 2))
            )),
            (v = re()),
            (function (e, t) {
              if (e == ge) return;
              (t = Math.max(t, te(e))), (b[e].distance = t);
            })(d, g),
            (n = N(t, S)),
            !h.triggerOnTouchEnd || h.triggerOnTouchLeave)
          ) {
            var p = !0;
            if (h.triggerOnTouchLeave) {
              var f = {
                left: (o = (l = ae((l = this))).offset()).left,
                right: o.left + l.outerWidth(),
                top: o.top,
                bottom: o.top + l.outerHeight(),
              };
              (r = c.end),
                (i = f),
                (p =
                  r.x > i.left &&
                  r.x < i.right &&
                  r.y > i.top &&
                  r.y < i.bottom);
            }
            !h.triggerOnTouchEnd && p
              ? (S = j(Me))
              : h.triggerOnTouchLeave && !p && (S = j(Pe)),
              (S != De && S != Pe) || N(t, S);
          }
        } else N(t, (S = De));
        !1 === n && N(t, (S = De));
      }
    }
    function k(e) {
      var t,
        n = e.originalEvent ? e.originalEvent : e,
        r = n.touches;
      if (r) {
        if (r.length && !J())
          return (t = n), (s = oe()), (c = t.touches.length + 1), !0;
        if (r.length && J()) return !0;
      }
      return (
        J() && (O = c),
        (P = oe()),
        (v = re()),
        q() || !_()
          ? N(n, (S = De))
          : h.triggerOnTouchEnd || (!1 === h.triggerOnTouchEnd && S === Me)
          ? (!1 !== h.preventDefaultEvents &&
              !1 !== e.cancelable &&
              e.preventDefault(),
            N(n, (S = Pe)))
          : !h.triggerOnTouchEnd && z()
          ? H(n, (S = Pe), Te)
          : S === Me && N(n, (S = De)),
        K(!1),
        null
      );
    }
    function A() {
      (y = T = u = P = O = 0), (E = 1), B(), K(!1);
    }
    function I(e) {
      var t = e.originalEvent ? e.originalEvent : e;
      h.triggerOnTouchLeave && N(t, (S = j(Pe)));
    }
    function U() {
      a.off(n, L),
        a.off(o, A),
        a.off(r, R),
        a.off(i, k),
        l && a.off(l, I),
        K(!1);
    }
    function j(e) {
      var t = e,
        n = Q(),
        r = _(),
        i = q();
      return (
        !n || i
          ? (t = De)
          : !r || e != Me || (h.triggerOnTouchEnd && !h.triggerOnTouchLeave)
          ? !r && e == Pe && h.triggerOnTouchLeave && (t = De)
          : (t = Pe),
        t
      );
    }
    function N(e, t) {
      var n,
        r = e.touches;
      return (
        ((X() && Y()) || Y()) && (n = H(e, t, we)),
        ((C() && F()) || F()) && !1 !== n && (n = H(e, t, ve)),
        Z() && G() && !1 !== n
          ? (n = H(e, t, ye))
          : v > h.longTapThreshold && g < Se && h.longTap && !1 !== n
          ? (n = H(e, t, Ee))
          : (1 !== O && Le) ||
            !(isNaN(g) || g < h.threshold) ||
            !z() ||
            !1 === n ||
            (n = H(e, t, Te)),
        t === De && A(),
        t === Pe && ((r && r.length) || A()),
        n
      );
    }
    function H(e, t, n) {
      var r;
      if (n == we) {
        if (
          (a.trigger("swipeStatus", [t, d || null, g || 0, v || 0, O, M, w]),
          h.swipeStatus &&
            !1 ===
              (r = h.swipeStatus.call(
                a,
                e,
                t,
                d || null,
                g || 0,
                v || 0,
                O,
                M,
                w
              )))
        )
          return !1;
        if (t == Pe && X()) {
          if (
            (clearTimeout(f),
            clearTimeout(D),
            a.trigger("swipe", [d, g, v, O, M, w]),
            h.swipe && !1 === (r = h.swipe.call(a, e, d, g, v, O, M, w)))
          )
            return !1;
          switch (d) {
            case ue:
              a.trigger("swipeLeft", [d, g, v, O, M, w]),
                h.swipeLeft && (r = h.swipeLeft.call(a, e, d, g, v, O, M, w));
              break;
            case se:
              a.trigger("swipeRight", [d, g, v, O, M, w]),
                h.swipeRight && (r = h.swipeRight.call(a, e, d, g, v, O, M, w));
              break;
            case ce:
              a.trigger("swipeUp", [d, g, v, O, M, w]),
                h.swipeUp && (r = h.swipeUp.call(a, e, d, g, v, O, M, w));
              break;
            case pe:
              a.trigger("swipeDown", [d, g, v, O, M, w]),
                h.swipeDown && (r = h.swipeDown.call(a, e, d, g, v, O, M, w));
          }
        }
      }
      if (n == ve) {
        if (
          (a.trigger("pinchStatus", [t, x || null, m || 0, v || 0, O, E, M]),
          h.pinchStatus &&
            !1 ===
              (r = h.pinchStatus.call(
                a,
                e,
                t,
                x || null,
                m || 0,
                v || 0,
                O,
                E,
                M
              )))
        )
          return !1;
        if (t == Pe && C())
          switch (x) {
            case fe:
              a.trigger("pinchIn", [x || null, m || 0, v || 0, O, E, M]),
                h.pinchIn &&
                  (r = h.pinchIn.call(
                    a,
                    e,
                    x || null,
                    m || 0,
                    v || 0,
                    O,
                    E,
                    M
                  ));
              break;
            case he:
              a.trigger("pinchOut", [x || null, m || 0, v || 0, O, E, M]),
                h.pinchOut &&
                  (r = h.pinchOut.call(
                    a,
                    e,
                    x || null,
                    m || 0,
                    v || 0,
                    O,
                    E,
                    M
                  ));
          }
      }
      return (
        n == Te
          ? (t !== De && t !== Pe) ||
            (clearTimeout(f),
            clearTimeout(D),
            G() && !Z()
              ? ((p = oe()),
                (f = setTimeout(
                  ae.proxy(function () {
                    (p = null),
                      a.trigger("tap", [e.target]),
                      h.tap && (r = h.tap.call(a, e, e.target));
                  }, this),
                  h.doubleTapThreshold
                )))
              : ((p = null),
                a.trigger("tap", [e.target]),
                h.tap && (r = h.tap.call(a, e, e.target))))
          : n == ye
          ? (t !== De && t !== Pe) ||
            (clearTimeout(f),
            clearTimeout(D),
            (p = null),
            a.trigger("doubletap", [e.target]),
            h.doubleTap && (r = h.doubleTap.call(a, e, e.target)))
          : n == Ee &&
            ((t !== De && t !== Pe) ||
              (clearTimeout(f),
              (p = null),
              a.trigger("longtap", [e.target]),
              h.longTap && (r = h.longTap.call(a, e, e.target)))),
        r
      );
    }
    function _() {
      var e = !0;
      return null !== h.threshold && (e = g >= h.threshold), e;
    }
    function q() {
      var e = !1;
      return (
        null !== h.cancelThreshold &&
          null !== d &&
          (e = te(d) - g >= h.cancelThreshold),
        e
      );
    }
    function Q() {
      return !h.maxTimeThreshold || !(v >= h.maxTimeThreshold);
    }
    function C() {
      var e = V(),
        t = W(),
        n = null === h.pinchThreshold || m >= h.pinchThreshold;
      return e && t && n;
    }
    function F() {
      return h.pinchStatus || h.pinchIn || h.pinchOut;
    }
    function X() {
      var e = Q(),
        t = _(),
        n = V(),
        r = W();
      return !q() && r && n && t && e;
    }
    function Y() {
      return (
        h.swipe ||
        h.swipeStatus ||
        h.swipeLeft ||
        h.swipeRight ||
        h.swipeUp ||
        h.swipeDown
      );
    }
    function V() {
      return O === h.fingers || h.fingers === be || !Le;
    }
    function W() {
      return 0 !== M[0].end.x;
    }
    function z() {
      return h.tap;
    }
    function G() {
      return !!h.doubleTap;
    }
    function Z() {
      if (null == p) return !1;
      var e = oe();
      return G() && e - p <= h.doubleTapThreshold;
    }
    function B() {
      c = s = 0;
    }
    function J() {
      var e = !1;
      s && oe() - s <= h.fingerReleaseThreshold && (e = !0);
      return e;
    }
    function K(e) {
      a &&
        (!0 === e
          ? (a.on(r, R), a.on(i, k), l && a.on(l, I))
          : (a.off(r, R, !1), a.off(i, k, !1), l && a.off(l, I, !1)),
        a.data(Ae + "_intouch", !0 === e));
    }
    function $(e, t) {
      var n = {
        start: { x: 0, y: 0 },
        last: { x: 0, y: 0 },
        end: { x: 0, y: 0 },
      };
      return (
        (n.start.x = n.last.x = n.end.x = t.pageX || t.clientX),
        (n.start.y = n.last.y = n.end.y = t.pageY || t.clientY),
        (M[e] = n)
      );
    }
    function ee(e) {
      var t = void 0 !== e.identifier ? e.identifier : 0,
        n = M[t] || null;
      return (
        null === n && (n = $(t, e)),
        (n.last.x = n.end.x),
        (n.last.y = n.end.y),
        (n.end.x = e.pageX || e.clientX),
        (n.end.y = e.pageY || e.clientY),
        n
      );
    }
    function te(e) {
      if (b[e]) return b[e].distance;
    }
    function ne(e) {
      return { direction: e, distance: 0 };
    }
    function re() {
      return P - u;
    }
    function ie(e, t) {
      var n = Math.abs(e.x - t.x),
        r = Math.abs(e.y - t.y);
      return Math.round(Math.sqrt(n * n + r * r));
    }
    function le(e, t) {
      if (((r = t), (n = e).x == r.x && n.y == r.y)) return ge;
      var n,
        r,
        i,
        l,
        o,
        a,
        u,
        s,
        c =
          ((l = t),
          (o = (i = e).x - l.x),
          (a = l.y - i.y),
          (u = Math.atan2(a, o)),
          (s = Math.round((180 * u) / Math.PI)) < 0 && (s = 360 - Math.abs(s)),
          s);
      return (c <= 45 && 0 <= c) || (c <= 360 && 315 <= c)
        ? ue
        : 135 <= c && c <= 225
        ? se
        : 45 < c && c < 135
        ? pe
        : ce;
    }
    function oe() {
      return new Date().getTime();
    }
    (this.enable = function () {
      return this.disable(), a.on(n, L), a.on(o, A), a;
    }),
      (this.disable = function () {
        return U(), a;
      }),
      (this.destroy = function () {
        U(), a.data(Ae, null), (a = null);
      }),
      (this.option = function (e, t) {
        if ("object" == typeof e) h = ae.extend(h, e);
        else if (void 0 !== h[e]) {
          if (void 0 === t) return h[e];
          h[e] = t;
        } else {
          if (!e) return h;
          ae.error("Option " + e + " does not exist on jQuery.swipe.options");
        }
        return null;
      });
  }
  (ae.fn.rsswipe = function (e) {
    var t = ae(this),
      n = t.data(Ae);
    if (n && "string" == typeof e) {
      if (n[e]) return n[e].apply(n, Array.prototype.slice.call(arguments, 1));
      ae.error("Method " + e + " does not exist on jQuery.rsswipe");
    } else if (n && "object" == typeof e) n.option.apply(n, arguments);
    else if (!(n || ("object" != typeof e && e)))
      return function (n) {
        !n ||
          void 0 !== n.allowPageScroll ||
          (void 0 === n.swipe && void 0 === n.swipeStatus) ||
          (n.allowPageScroll = ge);
        void 0 !== n.click && void 0 === n.tap && (n.tap = n.click);
        n = n || {};
        return (
          (n = ae.extend({}, ae.fn.rsswipe.defaults, n)),
          this.each(function () {
            var e = ae(this),
              t = e.data(Ae);
            t || ((t = new r(this, n)), e.data(Ae, t));
          })
        );
      }.apply(this, arguments);
    return t;
  }),
    (ae.fn.rsswipe.version = "1.6.18"),
    (ae.fn.rsswipe.defaults = {
      fingers: 1,
      threshold: 75,
      cancelThreshold: null,
      pinchThreshold: 20,
      maxTimeThreshold: null,
      fingerReleaseThreshold: 250,
      longTapThreshold: 500,
      doubleTapThreshold: 200,
      swipe: null,
      swipeLeft: null,
      swipeRight: null,
      swipeUp: null,
      swipeDown: null,
      swipeStatus: null,
      pinchIn: null,
      pinchOut: null,
      pinchStatus: null,
      click: null,
      tap: null,
      doubleTap: null,
      longTap: null,
      hold: null,
      triggerOnTouchEnd: !0,
      triggerOnTouchLeave: !1,
      allowPageScroll: "auto",
      fallbackToMouseEvents: !0,
      excludedElements: ".noSwipe",
      preventDefaultEvents: !0,
    }),
    (ae.fn.rsswipe.phases = {
      PHASE_START: Oe,
      PHASE_MOVE: Me,
      PHASE_END: Pe,
      PHASE_CANCEL: De,
    }),
    (ae.fn.rsswipe.directions = {
      LEFT: ue,
      RIGHT: se,
      UP: ce,
      DOWN: pe,
      IN: fe,
      OUT: he,
    }),
    (ae.fn.rsswipe.pageScroll = {
      NONE: ge,
      HORIZONTAL: me,
      VERTICAL: xe,
      AUTO: de,
    }),
    (ae.fn.rsswipe.fingers = {
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
      ALL: be,
    });
});
/*!Console Check and GSAP Sandboxing*/ if (typeof console === "undefined") {
  var console = {};
  console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = console.groupCollapsed = function () {};
}
var RS_CacheGS = window.GreenSockGlobals,
  RS_CacheGS_queue = window._gsQueue,
  RS_Cache_define = window._gsDefine;
window._gsDefine = null;
delete window._gsDefine;
var tpGS = (punchgs = window.GreenSockGlobals = {});
/*!
 * FOR ALL GREENSOCK UTILS, PLUGINS, ETC ADDED BELOW :
 * https://greensock.com
 * @license Copyright 2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */ /*!GSAP 3.2.0*/ !(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(((t = t || self).window = t.window || {}));
})(this, function (e) {
  "use strict";
  function _inheritsLoose(t, e) {
    (t.prototype = Object.create(e.prototype)),
      ((t.prototype.constructor = t).__proto__ = e);
  }
  function _assertThisInitialized(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t;
  }
  function n(t) {
    return "string" == typeof t;
  }
  function o(t) {
    return "function" == typeof t;
  }
  function p(t) {
    return "number" == typeof t;
  }
  function q(t) {
    return void 0 === t;
  }
  function r(t) {
    return "object" == typeof t;
  }
  function s(t) {
    return !1 !== t;
  }
  function t() {
    return "undefined" != typeof window;
  }
  function u(t) {
    return o(t) || n(t);
  }
  function K(t) {
    return (l = dt(t, at)) && ne;
  }
  function L(t, e) {
    return console.warn(
      "Invalid property",
      t,
      "set to",
      e,
      "Missing plugin? gsap.registerPlugin()"
    );
  }
  function M(t, e) {
    return !e && console.warn(t);
  }
  function N(t, e) {
    return (t && (at[t] = e) && l && (l[t] = e)) || at;
  }
  function O() {
    return 0;
  }
  function Y(t) {
    var e,
      n,
      i = t[0];
    if ((r(i) || o(i) || (t = [t]), !(e = (i._gsap || {}).harness))) {
      for (n = pt.length; n-- && !pt[n].targetTest(i); );
      e = pt[n];
    }
    for (n = t.length; n--; )
      (t[n] && (t[n]._gsap || (t[n]._gsap = new Rt(t[n], e)))) ||
        t.splice(n, 1);
    return t;
  }
  function Z(t) {
    return t._gsap || Y(yt(t))[0]._gsap;
  }
  function $(t, e) {
    var r = t[e];
    return o(r) ? t[e]() : (q(r) && t.getAttribute(e)) || r;
  }
  function _(t, e) {
    return (t = t.split(",")).forEach(e) || t;
  }
  function aa(t) {
    return Math.round(1e5 * t) / 1e5 || 0;
  }
  function ba(t, e) {
    for (var r = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < r; );
    return n < r;
  }
  function ca(t, e, r) {
    var n,
      i = p(t[1]),
      a = (i ? 2 : 1) + (e < 2 ? 0 : 1),
      o = t[a];
    if ((i && (o.duration = t[1]), (o.parent = r), e)) {
      for (n = o; r && !("immediateRender" in n); )
        (n = r.vars.defaults || {}), (r = s(r.vars.inherit) && r.parent);
      (o.immediateRender = s(n.immediateRender)),
        e < 2 ? (o.runBackwards = 1) : (o.startAt = t[a - 1]);
    }
    return o;
  }
  function da() {
    var t,
      e,
      r = ot.length,
      n = ot.slice(0);
    for (ut = {}, t = ot.length = 0; t < r; t++)
      (e = n[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
  }
  function ea(t, e, r, n) {
    ot.length && da(), t.render(e, r, n), ot.length && da();
  }
  function fa(t) {
    var e = parseFloat(t);
    return (e || 0 === e) && (t + "").match(it).length < 2 ? e : t;
  }
  function ga(t) {
    return t;
  }
  function ha(t, e) {
    for (var r in e) r in t || (t[r] = e[r]);
    return t;
  }
  function ia(t, e) {
    for (var r in e)
      r in t || "duration" === r || "ease" === r || (t[r] = e[r]);
  }
  function ka(t, e) {
    for (var n in e) t[n] = r(e[n]) ? ka(t[n] || (t[n] = {}), e[n]) : e[n];
    return t;
  }
  function la(t, e) {
    var r,
      n = {};
    for (r in t) r in e || (n[r] = t[r]);
    return n;
  }
  function pa(t, e, r, n) {
    void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
    var i = e._prev,
      a = e._next;
    i ? (i._next = a) : t[r] === e && (t[r] = a),
      a ? (a._prev = i) : t[n] === e && (t[n] = i),
      (e._dp = t),
      (e._next = e._prev = e.parent = null);
  }
  function qa(t, e) {
    !t.parent || (e && !t.parent.autoRemoveChildren) || t.parent.remove(t),
      (t._act = 0);
  }
  function ra(t) {
    for (var e = t; e; ) (e._dirty = 1), (e = e.parent);
    return t;
  }
  function ua(t) {
    return t._repeat ? _t(t._tTime, (t = t.duration() + t._rDelay)) * t : 0;
  }
  function wa(t, e) {
    return (
      (t - e._start) * e._ts +
      (0 <= e._ts ? 0 : e._dirty ? e.totalDuration() : e._tDur)
    );
  }
  function xa(t) {
    return (t._end = aa(
      t._start + (t._tDur / Math.abs(t._ts || t._pauseTS || B) || 0)
    ));
  }
  function ya(t, e, r) {
    if (
      (e.parent && qa(e),
      (e._start = aa(r + e._delay)),
      (e._end = aa(
        e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)
      )),
      (function _addLinkedListItem(t, e, r, n, i) {
        void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
        var a,
          s = t[n];
        if (i) for (a = e[i]; s && s[i] > a; ) s = s._prev;
        s
          ? ((e._next = s._next), (s._next = e))
          : ((e._next = t[r]), (t[r] = e)),
          e._next ? (e._next._prev = e) : (t[n] = e),
          (e._prev = s),
          (e.parent = t);
      })(t, e, "_first", "_last", t._sort ? "_start" : 0),
      (t._recent = e)._time || (!e._dur && e._initted))
    ) {
      var n = (t.rawTime() - e._start) * e._ts;
      (!e._dur || gt(0, e.totalDuration(), n) - e._tTime > B) &&
        e.render(n, !0);
    }
    if (ra(t)._dp && t._initted && t._time >= t._dur && t._ts) {
      if (t._dur < t.duration())
        for (var i = t; i._dp; )
          0 <= i.rawTime() && i.totalTime(i._tTime, !0), (i = i._dp);
      t._zTime = -B;
    }
    return t;
  }
  function za(t, e, r, n) {
    return (
      qt(t, e),
      t._initted
        ? !r &&
          t._pt &&
          ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
          c !== Mt.frame
          ? (ot.push(t), (t._lazy = [e, n]), 1)
          : void 0
        : 1
    );
  }
  function Ca(t, e, r) {
    var n = t._repeat,
      i = aa(e);
    return (
      (t._dur = i),
      (t._tDur = n ? (n < 0 ? 1e12 : aa(i * (n + 1) + t._rDelay * n)) : i),
      r || ra(t.parent),
      t.parent && xa(t),
      t
    );
  }
  function Da(t) {
    return t instanceof Bt ? ra(t) : Ca(t, t._dur);
  }
  function Fa(t, e) {
    var r,
      i,
      a = t.labels,
      s = t._recent || mt,
      o = t.duration() >= z ? s.endTime(!1) : t._dur;
    return n(e) && (isNaN(e) || e in a)
      ? "<" === (r = e.charAt(0)) || ">" === r
        ? ("<" === r ? s._start : s.endTime(0 <= s._repeat)) +
          (parseFloat(e.substr(1)) || 0)
        : (r = e.indexOf("=")) < 0
        ? (e in a || (a[e] = o), a[e])
        : ((i = +(e.charAt(r - 1) + e.substr(r + 1))),
          1 < r ? Fa(t, e.substr(0, r - 1)) + i : o + i)
      : null == e
      ? o
      : +e;
  }
  function Ga(t, e) {
    return t || 0 === t ? e(t) : e;
  }
  function Ia(t) {
    return (t + "").substr((parseFloat(t) + "").length);
  }
  function La(t, e) {
    return (
      t &&
      r(t) &&
      "length" in t &&
      ((!e && !t.length) || (t.length - 1 in t && r(t[0]))) &&
      !t.nodeType &&
      t !== i
    );
  }
  function Oa(t) {
    return t.sort(function () {
      return 0.5 - Math.random();
    });
  }
  function Pa(t) {
    if (o(t)) return t;
    var d = r(t) ? t : { each: t },
      _ = Dt(d.ease),
      m = d.from || 0,
      g = parseFloat(d.base) || 0,
      v = {},
      e = 0 < m && m < 1,
      y = isNaN(m) || e,
      T = d.axis,
      b = m,
      w = m;
    return (
      n(m)
        ? (b = w = { center: 0.5, edges: 0.5, end: 1 }[m] || 0)
        : !e && y && ((b = m[0]), (w = m[1])),
      function (t, e, r) {
        var n,
          i,
          a,
          s,
          o,
          u,
          h,
          l,
          f,
          p = (r || d).length,
          c = v[p];
        if (!c) {
          if (!(f = "auto" === d.grid ? 0 : (d.grid || [1, z])[1])) {
            for (
              h = -z;
              h < (h = r[f++].getBoundingClientRect().left) && f < p;

            );
            f--;
          }
          for (
            c = v[p] = [],
              n = y ? Math.min(f, p) * b - 0.5 : m % f,
              i = y ? (p * w) / f - 0.5 : (m / f) | 0,
              l = z,
              u = h = 0;
            u < p;
            u++
          )
            (a = (u % f) - n),
              (s = i - ((u / f) | 0)),
              (c[u] = o = T ? Math.abs("y" === T ? s : a) : X(a * a + s * s)),
              h < o && (h = o),
              o < l && (l = o);
          "random" === m && Oa(c),
            (c.max = h - l),
            (c.min = l),
            (c.v = p =
              (parseFloat(d.amount) ||
                parseFloat(d.each) *
                  (p < f
                    ? p - 1
                    : T
                    ? "y" === T
                      ? p / f
                      : f
                    : Math.max(f, p / f)) ||
                0) * ("edges" === m ? -1 : 1)),
            (c.b = p < 0 ? g - p : g),
            (c.u = Ia(d.amount || d.each) || 0),
            (_ = _ && p < 0 ? Ft(_) : _);
        }
        return (
          (p = (c[t] - c.min) / c.max || 0),
          aa(c.b + (_ ? _(p) : p) * c.v) + c.u
        );
      }
    );
  }
  function Qa(e) {
    var r = e < 1 ? Math.pow(10, (e + "").length - 2) : 1;
    return function (t) {
      return ~~(Math.round(parseFloat(t) / e) * e * r) / r + (p(t) ? 0 : Ia(t));
    };
  }
  function Ra(u, t) {
    var h,
      l,
      e = W(u);
    return (
      !e &&
        r(u) &&
        ((h = e = u.radius || z),
        u.values
          ? ((u = yt(u.values)), (l = !p(u[0])) && (h *= h))
          : (u = Qa(u.increment))),
      Ga(
        t,
        e
          ? o(u)
            ? function (t) {
                return (l = u(t)), Math.abs(l - t) <= h ? l : t;
              }
            : function (t) {
                for (
                  var e,
                    r,
                    n = parseFloat(l ? t.x : t),
                    i = parseFloat(l ? t.y : 0),
                    a = z,
                    s = 0,
                    o = u.length;
                  o--;

                )
                  (e = l
                    ? (e = u[o].x - n) * e + (r = u[o].y - i) * r
                    : Math.abs(u[o] - n)) < a && ((a = e), (s = o));
                return (
                  (s = !h || a <= h ? u[s] : t),
                  l || s === t || p(t) ? s : s + Ia(t)
                );
              }
          : Qa(u)
      )
    );
  }
  function Sa(t, e, r, n) {
    return Ga(W(t) ? !e : !0 === r ? !!(r = 0) : !n, function () {
      return W(t)
        ? t[~~(Math.random() * t.length)]
        : (r = r || 1e-5) &&
            (n = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) &&
            ~~(Math.round((t + Math.random() * (e - t)) / r) * r * n) / n;
    });
  }
  function Wa(e, r, t) {
    return Ga(t, function (t) {
      return e[~~r(t)];
    });
  }
  function Za(t) {
    for (var e, r, n, i, a = 0, s = ""; ~(e = t.indexOf("random(", a)); )
      (n = t.indexOf(")", e)),
        (i = "[" === t.charAt(e + 7)),
        (r = t.substr(e + 7, n - e - 7).match(i ? it : H)),
        (s += t.substr(a, e - a) + Sa(i ? r : +r[0], +r[1], +r[2] || 1e-5)),
        (a = n + 1);
    return s + t.substr(a, t.length - a);
  }
  function ab(t, e, r) {
    var n,
      i,
      a,
      s = t.labels,
      o = z;
    for (n in s)
      (i = s[n] - e) < 0 == !!r &&
        i &&
        o > (i = Math.abs(i)) &&
        ((a = n), (o = i));
    return a;
  }
  function cb(t) {
    return qa(t), t.progress() < 1 && bt(t, "onInterrupt"), t;
  }
  function hb(t, e, r) {
    return (
      ((6 * (t = t < 0 ? t + 1 : 1 < t ? t - 1 : t) < 1
        ? e + (r - e) * t * 6
        : t < 0.5
        ? r
        : 3 * t < 2
        ? e + (r - e) * (2 / 3 - t) * 6
        : e) *
        wt +
        0.5) |
      0
    );
  }
  function ib(t, e, r) {
    var n,
      i,
      a,
      s,
      o,
      u,
      h,
      l,
      f,
      c,
      d = t ? (p(t) ? [t >> 16, (t >> 8) & wt, t & wt] : 0) : xt.black;
    if (!d) {
      if (("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), xt[t]))
        d = xt[t];
      else if ("#" === t.charAt(0))
        4 === t.length &&
          (t =
            "#" +
            (n = t.charAt(1)) +
            n +
            (i = t.charAt(2)) +
            i +
            (a = t.charAt(3)) +
            a),
          (d = [(t = parseInt(t.substr(1), 16)) >> 16, (t >> 8) & wt, t & wt]);
      else if ("hsl" === t.substr(0, 3))
        if (((d = c = t.match(H)), e)) {
          if (~t.indexOf("="))
            return (d = t.match(J)), r && d.length < 4 && (d[3] = 1), d;
        } else
          (s = (+d[0] % 360) / 360),
            (o = d[1] / 100),
            (n =
              2 * (u = d[2] / 100) -
              (i = u <= 0.5 ? u * (o + 1) : u + o - u * o)),
            3 < d.length && (d[3] *= 1),
            (d[0] = hb(s + 1 / 3, n, i)),
            (d[1] = hb(s, n, i)),
            (d[2] = hb(s - 1 / 3, n, i));
      else d = t.match(H) || xt.transparent;
      d = d.map(Number);
    }
    return (
      e &&
        !c &&
        ((n = d[0] / wt),
        (i = d[1] / wt),
        (a = d[2] / wt),
        (u = ((h = Math.max(n, i, a)) + (l = Math.min(n, i, a))) / 2),
        h === l
          ? (s = o = 0)
          : ((f = h - l),
            (o = 0.5 < u ? f / (2 - h - l) : f / (h + l)),
            (s =
              h === n
                ? (i - a) / f + (i < a ? 6 : 0)
                : h === i
                ? (a - n) / f + 2
                : (n - i) / f + 4),
            (s *= 60)),
        (d[0] = ~~(s + 0.5)),
        (d[1] = ~~(100 * o + 0.5)),
        (d[2] = ~~(100 * u + 0.5))),
      r && d.length < 4 && (d[3] = 1),
      d
    );
  }
  function jb(t) {
    var r = [],
      n = [],
      i = -1;
    return (
      t.split(kt).forEach(function (t) {
        var e = t.match(tt) || [];
        r.push.apply(r, e), n.push((i += e.length + 1));
      }),
      (r.c = n),
      r
    );
  }
  function kb(t, e, r) {
    var n,
      i,
      a,
      s,
      o = "",
      u = (t + o).match(kt),
      h = e ? "hsla(" : "rgba(",
      l = 0;
    if (!u) return t;
    if (
      ((u = u.map(function (t) {
        return (
          (t = ib(t, e, 1)) &&
          h +
            (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) +
            ")"
        );
      })),
      r && ((a = jb(t)), (n = r.c).join(o) !== a.c.join(o)))
    )
      for (s = (i = t.replace(kt, "1").split(tt)).length - 1; l < s; l++)
        o +=
          i[l] +
          (~n.indexOf(l)
            ? u.shift() || h + "0,0,0,0)"
            : (a.length ? a : u.length ? u : r).shift());
    if (!i) for (s = (i = t.split(kt)).length - 1; l < s; l++) o += i[l] + u[l];
    return o + i[s];
  }
  function nb(t) {
    var e,
      r = t.join(" ");
    if (((kt.lastIndex = 0), kt.test(r)))
      return (
        (e = Ot.test(r)),
        (t[1] = kb(t[1], e)),
        (t[0] = kb(t[0], e, jb(t[1]))),
        !0
      );
  }
  function vb(t) {
    var e = (t + "").split("("),
      r = Ct[e[0]];
    return r && 1 < e.length && r.config
      ? r.config.apply(
          null,
          ~t.indexOf("{")
            ? [
                (function _parseObjectInString(t) {
                  for (
                    var e,
                      r,
                      n,
                      i = {},
                      a = t.substr(1, t.length - 3).split(":"),
                      s = a[0],
                      o = 1,
                      u = a.length;
                    o < u;
                    o++
                  )
                    (r = a[o]),
                      (e = o !== u - 1 ? r.lastIndexOf(",") : r.length),
                      (n = r.substr(0, e)),
                      (i[s] = isNaN(n) ? n.replace(At, "").trim() : +n),
                      (s = r.substr(e + 1).trim());
                  return i;
                })(e[1]),
              ]
            : rt.exec(t)[1].split(",").map(fa)
        )
      : Ct._CE && St.test(t)
      ? Ct._CE("", t)
      : r;
  }
  function yb(t, e, r, n) {
    void 0 === r &&
      (r = function easeOut(t) {
        return 1 - e(1 - t);
      }),
      void 0 === n &&
        (n = function easeInOut(t) {
          return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
        });
    var i,
      a = { easeIn: e, easeOut: r, easeInOut: n };
    return (
      _(t, function (t) {
        for (var e in ((Ct[t] = at[t] = a), (Ct[(i = t.toLowerCase())] = r), a))
          Ct[
            i + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")
          ] = Ct[t + "." + e] = a[e];
      }),
      a
    );
  }
  function zb(e) {
    return function (t) {
      return t < 0.5 ? (1 - e(1 - 2 * t)) / 2 : 0.5 + e(2 * (t - 0.5)) / 2;
    };
  }
  function Ab(r, t, e) {
    function Vk(t) {
      return 1 === t ? 1 : n * Math.pow(2, -10 * t) * Q((t - a) * i) + 1;
    }
    var n = 1 <= t ? t : 1,
      i = (e || (r ? 0.3 : 0.45)) / (t < 1 ? t : 1),
      a = (i / I) * (Math.asin(1 / n) || 0),
      s =
        "out" === r
          ? Vk
          : "in" === r
          ? function (t) {
              return 1 - Vk(1 - t);
            }
          : zb(Vk);
    return (
      (i = I / i),
      (s.config = function (t, e) {
        return Ab(r, t, e);
      }),
      s
    );
  }
  function Bb(e, r) {
    function bl(t) {
      return t ? --t * t * ((r + 1) * t + r) + 1 : 0;
    }
    void 0 === r && (r = 1.70158);
    var t =
      "out" === e
        ? bl
        : "in" === e
        ? function (t) {
            return 1 - bl(1 - t);
          }
        : zb(bl);
    return (
      (t.config = function (t) {
        return Bb(e, t);
      }),
      t
    );
  }
  var R,
    i,
    a,
    h,
    l,
    f,
    c,
    d,
    m,
    g,
    v,
    y,
    T,
    b,
    w,
    x,
    k,
    P,
    C,
    S,
    A,
    F,
    D,
    U = {
      autoSleep: 120,
      force3D: "auto",
      nullTargetWarn: 1,
      units: { lineHeight: "" },
    },
    E = { duration: 0.5, overwrite: !1, delay: 0 },
    z = 1e8,
    B = 1 / z,
    I = 2 * Math.PI,
    V = I / 4,
    j = 0,
    X = Math.sqrt,
    G = Math.cos,
    Q = Math.sin,
    W = Array.isArray,
    H = /(?:-?\.?\d|\.)+/gi,
    J = /[-+=.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g,
    tt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    et = /[-+=.]*\d+(?:\.|e-|e)*\d*/gi,
    rt = /\(([^()]+)\)/i,
    nt = /[+-]=-?[\.\d]+/,
    it = /[#\-+.]*\b[a-z\d-=+%.]+/gi,
    at = {},
    st = {},
    ot = [],
    ut = {},
    ht = {},
    lt = {},
    ft = 30,
    pt = [],
    ct = "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
    dt = function _merge(t, e) {
      for (var r in e) t[r] = e[r];
      return t;
    },
    _t = function _animationCycle(t, e) {
      return (t /= e) && ~~t === t ? ~~t - 1 : ~~t;
    },
    mt = { _start: 0, endTime: O },
    gt = function _clamp(t, e, r) {
      return r < t ? t : e < r ? e : r;
    },
    vt = [].slice,
    yt = function toArray(t, e) {
      return !n(t) || e || (!a && Pt())
        ? W(t)
          ? (function _flatten(t, e, r) {
              return (
                void 0 === r && (r = []),
                t.forEach(function (t) {
                  return (n(t) && !e) || La(t, 1)
                    ? r.push.apply(r, yt(t))
                    : r.push(t);
                }) || r
              );
            })(t, e)
          : La(t)
          ? vt.call(t, 0)
          : t
          ? [t]
          : []
        : vt.call(h.querySelectorAll(t), 0);
    },
    Tt = function mapRange(e, t, r, n, i) {
      var a = t - e,
        s = n - r;
      return Ga(i, function (t) {
        return r + ((t - e) / a) * s;
      });
    },
    bt = function _callback(t, e, r) {
      var n,
        i,
        a = t.vars,
        s = a[e];
      if (s)
        return (
          (n = a[e + "Params"]),
          (i = a.callbackScope || t),
          r && ot.length && da(),
          n ? s.apply(i, n) : s.call(i)
        );
    },
    wt = 255,
    xt = {
      aqua: [0, wt, wt],
      lime: [0, wt, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, wt],
      navy: [0, 0, 128],
      white: [wt, wt, wt],
      olive: [128, 128, 0],
      yellow: [wt, wt, 0],
      orange: [wt, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [wt, 0, 0],
      pink: [wt, 192, 203],
      cyan: [0, wt, wt],
      transparent: [wt, wt, wt, 0],
    },
    kt = (function () {
      var t,
        e =
          "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
      for (t in xt) e += "|" + t + "\\b";
      return new RegExp(e + ")", "gi");
    })(),
    Ot = /hsl[a]?\(/,
    Mt =
      ((b = Date.now),
      (w = 500),
      (x = 33),
      (k = b()),
      (P = k),
      (S = C = 1 / 240),
      (T = {
        time: 0,
        frame: 0,
        tick: function tick() {
          _j(!0);
        },
        wake: function wake() {
          f &&
            (!a &&
              t() &&
              ((i = a = window),
              (h = i.document || {}),
              (at.gsap = ne),
              (i.gsapVersions || (i.gsapVersions = [])).push(ne.version),
              K(l || i.GreenSockGlobals || (!i.gsap && i) || {}),
              (y = i.requestAnimationFrame)),
            g && T.sleep(),
            (v =
              y ||
              function (t) {
                return setTimeout(t, (1e3 * (S - T.time) + 1) | 0);
              }),
            (m = 1),
            _j(2));
        },
        sleep: function sleep() {
          (y ? i.cancelAnimationFrame : clearTimeout)(g), (m = 0), (v = O);
        },
        lagSmoothing: function lagSmoothing(t, e) {
          (w = t || 1e8), (x = Math.min(e, w, 0));
        },
        fps: function fps(t) {
          (C = 1 / (t || 240)), (S = T.time + C);
        },
        add: function add(t) {
          A.indexOf(t) < 0 && A.push(t), Pt();
        },
        remove: function remove(t) {
          var e;
          ~(e = A.indexOf(t)) && A.splice(e, 1);
        },
        _listeners: (A = []),
      })),
    Pt = function _wake() {
      return !m && Mt.wake();
    },
    Ct = {},
    St = /^[\d.\-M][\d.\-,\s]/,
    At = /["']/g,
    Ft = function _invertEase(e) {
      return function (t) {
        return 1 - e(1 - t);
      };
    },
    Dt = function _parseEase(t, e) {
      return (t && (o(t) ? t : Ct[t] || vb(t))) || e;
    };
  function _j(e) {
    var t,
      r,
      n = b() - P,
      i = !0 === e;
    w < n && (k += n - x),
      (P += n),
      (T.time = (P - k) / 1e3),
      (0 < (t = T.time - S) || i) &&
        (T.frame++, (S += t + (C <= t ? 0.004 : C - t)), (r = 1)),
      i || (g = v(_j)),
      r &&
        A.forEach(function (t) {
          return t(T.time, n, T.frame, e);
        });
  }
  function sl(t) {
    return t < D
      ? F * t * t
      : t < 0.7272727272727273
      ? F * Math.pow(t - 1.5 / 2.75, 2) + 0.75
      : t < 0.9090909090909092
      ? F * (t -= 2.25 / 2.75) * t + 0.9375
      : F * Math.pow(t - 2.625 / 2.75, 2) + 0.984375;
  }
  _("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
    var r = e < 5 ? e + 1 : e;
    yb(
      t + ",Power" + (r - 1),
      e
        ? function (t) {
            return Math.pow(t, r);
          }
        : function (t) {
            return t;
          },
      function (t) {
        return 1 - Math.pow(1 - t, r);
      },
      function (t) {
        return t < 0.5
          ? Math.pow(2 * t, r) / 2
          : 1 - Math.pow(2 * (1 - t), r) / 2;
      }
    );
  }),
    (Ct.Linear.easeNone = Ct.none = Ct.Linear.easeIn),
    yb("Elastic", Ab("in"), Ab("out"), Ab()),
    (F = 7.5625),
    (D = 1 / 2.75),
    yb(
      "Bounce",
      function (t) {
        return 1 - sl(1 - t);
      },
      sl
    ),
    yb("Expo", function (t) {
      return t ? Math.pow(2, 10 * (t - 1)) : 0;
    }),
    yb("Circ", function (t) {
      return -(X(1 - t * t) - 1);
    }),
    yb("Sine", function (t) {
      return 1 - G(t * V);
    }),
    yb("Back", Bb("in"), Bb("out"), Bb()),
    (Ct.SteppedEase = Ct.steps = at.SteppedEase = {
      config: function config(t, e) {
        void 0 === t && (t = 1);
        var r = 1 / t,
          n = t + (e ? 0 : 1),
          i = e ? 1 : 0;
        return function (t) {
          return (((n * gt(0, 0.99999999, t)) | 0) + i) * r;
        };
      },
    }),
    (E.ease = Ct["quad.out"]);
  var zt,
    Rt = function GSCache(t, e) {
      (this.id = j++),
        ((t._gsap = this).target = t),
        (this.harness = e),
        (this.get = e ? e.get : $),
        (this.set = e ? e.getSetter : Gt);
    },
    Et =
      (((zt = Animation.prototype).delay = function delay(t) {
        return t || 0 === t ? ((this._delay = t), this) : this._delay;
      }),
      (zt.duration = function duration(t) {
        return arguments.length
          ? Ca(this, t)
          : this.totalDuration() && this._dur;
      }),
      (zt.totalDuration = function totalDuration(t) {
        return arguments.length
          ? ((this._dirty = 0),
            Ca(
              this,
              this._repeat < 0
                ? t
                : (t - this._repeat * this._rDelay) / (this._repeat + 1)
            ))
          : this._tDur;
      }),
      (zt.totalTime = function totalTime(t, e) {
        if ((Pt(), !arguments.length)) return this._tTime;
        var r = this.parent || this._dp;
        if (r && r.smoothChildTiming && this._ts) {
          for (
            this._start = aa(
              r._time -
                (0 < this._ts
                  ? t / this._ts
                  : ((this._dirty ? this.totalDuration() : this._tDur) - t) /
                    -this._ts)
            ),
              xa(this),
              r._dirty || ra(r);
            r.parent;

          )
            r.parent._time !==
              r._start +
                (0 <= r._ts
                  ? r._tTime / r._ts
                  : (r.totalDuration() - r._tTime) / -r._ts) &&
              r.totalTime(r._tTime, !0),
              (r = r.parent);
          !this.parent &&
            this._dp.autoRemoveChildren &&
            ya(this._dp, this, this._start - this._delay);
        }
        return (
          (this._tTime === t &&
            (this._dur || e) &&
            Math.abs(this._zTime) !== B) ||
            (this._ts || (this._pTime = t), ea(this, t, e)),
          this
        );
      }),
      (zt.time = function time(t, e) {
        return arguments.length
          ? this.totalTime(
              Math.min(this.totalDuration(), t + ua(this)) % this._dur ||
                (t ? this._dur : 0),
              e
            )
          : this._time;
      }),
      (zt.totalProgress = function totalProgress(t, e) {
        return arguments.length
          ? this.totalTime(this.totalDuration() * t, e)
          : this.totalDuration()
          ? Math.min(1, this._tTime / this._tDur)
          : this.ratio;
      }),
      (zt.progress = function progress(t, e) {
        return arguments.length
          ? this.totalTime(
              this.duration() *
                (!this._yoyo || 1 & this.iteration() ? t : 1 - t) +
                ua(this),
              e
            )
          : this.duration()
          ? Math.min(1, this._time / this._dur)
          : this.ratio;
      }),
      (zt.iteration = function iteration(t, e) {
        var r = this.duration() + this._rDelay;
        return arguments.length
          ? this.totalTime(this._time + (t - 1) * r, e)
          : this._repeat
          ? _t(this._tTime, r) + 1
          : 1;
      }),
      (zt.timeScale = function timeScale(t) {
        if (!arguments.length) return this._ts || this._pauseTS || 0;
        if (null !== this._pauseTS) return (this._pauseTS = t), this;
        var e =
          this.parent && this._ts ? wa(this.parent._time, this) : this._tTime;
        return (
          (this._ts = t),
          (function _recacheAncestors(t) {
            for (var e = t.parent; e && e.parent; )
              (e._dirty = 1), e.totalDuration(), (e = e.parent);
            return t;
          })(this.totalTime(e, !0))
        );
      }),
      (zt.paused = function paused(t) {
        var e = !this._ts;
        return arguments.length
          ? (e !== t &&
              (t
                ? ((this._pauseTS = this._ts),
                  (this._pTime =
                    this._tTime || Math.max(-this._delay, this.rawTime())),
                  (this._ts = this._act = 0))
                : (Pt(),
                  (this._ts = this._pauseTS || 1),
                  (this._pauseTS = null),
                  this.totalTime(
                    this.parent && !this.parent.smoothChildTiming
                      ? this.rawTime()
                      : this._tTime || this._pTime,
                    1 === this.progress() &&
                      (this._tTime -= B) &&
                      Math.abs(this._zTime) !== B
                  ))),
            this)
          : e;
      }),
      (zt.startTime = function startTime(t) {
        return arguments.length
          ? (this.parent &&
              this.parent._sort &&
              ya(this.parent, this, t - this._delay),
            this)
          : this._start;
      }),
      (zt.endTime = function endTime(t) {
        return (
          this._start +
          (s(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts)
        );
      }),
      (zt.rawTime = function rawTime(t) {
        var e = this.parent || this._dp;
        return e
          ? t &&
            (!this._ts ||
              (this._repeat && this._time && this.totalProgress() < 1))
            ? this._tTime % (this._dur + this._rDelay)
            : this._ts
            ? wa(e.rawTime(t), this)
            : this._tTime
          : this._tTime;
      }),
      (zt.repeat = function repeat(t) {
        return arguments.length ? ((this._repeat = t), Da(this)) : this._repeat;
      }),
      (zt.repeatDelay = function repeatDelay(t) {
        return arguments.length ? ((this._rDelay = t), Da(this)) : this._rDelay;
      }),
      (zt.yoyo = function yoyo(t) {
        return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
      }),
      (zt.seek = function seek(t, e) {
        return this.totalTime(Fa(this, t), s(e));
      }),
      (zt.restart = function restart(t, e) {
        return this.play().totalTime(t ? -this._delay : 0, s(e));
      }),
      (zt.play = function play(t, e) {
        return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
      }),
      (zt.reverse = function reverse(t, e) {
        return (
          null != t && this.seek(t || this.totalDuration(), e),
          this.reversed(!0).paused(!1)
        );
      }),
      (zt.pause = function pause(t, e) {
        return null != t && this.seek(t, e), this.paused(!0);
      }),
      (zt.resume = function resume() {
        return this.paused(!1);
      }),
      (zt.reversed = function reversed(t) {
        var e = this._ts || this._pauseTS || 0;
        return arguments.length
          ? (t !== this.reversed() &&
              ((this[null === this._pauseTS ? "_ts" : "_pauseTS"] =
                Math.abs(e) * (t ? -1 : 1)),
              this.totalTime(this._tTime, !0)),
            this)
          : e < 0;
      }),
      (zt.invalidate = function invalidate() {
        return (this._initted = 0), (this._zTime = -B), this;
      }),
      (zt.isActive = function isActive(t) {
        var e,
          r = this.parent || this._dp,
          n = this._start;
        return !(
          r &&
          !(
            this._ts &&
            (this._initted || !t) &&
            r.isActive(t) &&
            (e = r.rawTime(!0)) >= n &&
            e < this.endTime(!0) - B
          )
        );
      }),
      (zt.eventCallback = function eventCallback(t, e, r) {
        var n = this.vars;
        return 1 < arguments.length
          ? (e
              ? ((n[t] = e),
                r && (n[t + "Params"] = r),
                "onUpdate" === t && (this._onUpdate = e))
              : delete n[t],
            this)
          : n[t];
      }),
      (zt.then = function then(t) {
        var n = this;
        return new Promise(function (e) {
          function Hm() {
            var t = n.then;
            (n.then = null),
              o(r) && (r = r(n)) && (r.then || r === n) && (n.then = t),
              e(r),
              (n.then = t);
          }
          var r = o(t) ? t : ga;
          (n._initted && 1 === n.totalProgress() && 0 <= n._ts) ||
          (!n._tTime && n._ts < 0)
            ? Hm()
            : (n._prom = Hm);
        });
      }),
      (zt.kill = function kill() {
        cb(this);
      }),
      Animation);
  function Animation(t, e) {
    var r = t.parent || R;
    (this.vars = t),
      (this._delay = +t.delay || 0),
      (this._repeat = t.repeat || 0) &&
        ((this._rDelay = t.repeatDelay || 0),
        (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
      (this._ts = 1),
      Ca(this, +t.duration, 1),
      (this.data = t.data),
      m || Mt.wake(),
      r && ya(r, this, e || 0 === e ? e : r._time),
      t.reversed && this.reversed(!0),
      t.paused && this.paused(!0);
  }
  ha(Et.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -B,
    _prom: 0,
    _pauseTS: null,
  });
  var Bt = (function (i) {
    function Timeline(t, e) {
      var r;
      return (
        void 0 === t && (t = {}),
        ((r = i.call(this, t, e) || this).labels = {}),
        (r.smoothChildTiming = !!t.smoothChildTiming),
        (r.autoRemoveChildren = !!t.autoRemoveChildren),
        (r._sort = s(t.sortChildren)),
        r
      );
    }
    _inheritsLoose(Timeline, i);
    var t = Timeline.prototype;
    return (
      (t.to = function to(t, e, r, n) {
        return new Vt(t, ca(arguments, 0, this), Fa(this, p(e) ? n : r)), this;
      }),
      (t.from = function from(t, e, r, n) {
        return new Vt(t, ca(arguments, 1, this), Fa(this, p(e) ? n : r)), this;
      }),
      (t.fromTo = function fromTo(t, e, r, n, i) {
        return new Vt(t, ca(arguments, 2, this), Fa(this, p(e) ? i : n)), this;
      }),
      (t.set = function set(t, e, r) {
        return (
          (e.duration = 0),
          (e.parent = this),
          e.repeatDelay || (e.repeat = 0),
          (e.immediateRender = !!e.immediateRender),
          new Vt(t, e, Fa(this, r)),
          this
        );
      }),
      (t.call = function call(t, e, r) {
        return ya(this, Vt.delayedCall(0, t, e), Fa(this, r));
      }),
      (t.staggerTo = function staggerTo(t, e, r, n, i, a, s) {
        return (
          (r.duration = e),
          (r.stagger = r.stagger || n),
          (r.onComplete = a),
          (r.onCompleteParams = s),
          (r.parent = this),
          new Vt(t, r, Fa(this, i)),
          this
        );
      }),
      (t.staggerFrom = function staggerFrom(t, e, r, n, i, a, o) {
        return (
          (r.runBackwards = 1),
          (r.immediateRender = s(r.immediateRender)),
          this.staggerTo(t, e, r, n, i, a, o)
        );
      }),
      (t.staggerFromTo = function staggerFromTo(t, e, r, n, i, a, o, u) {
        return (
          (n.startAt = r),
          (n.immediateRender = s(n.immediateRender)),
          this.staggerTo(t, e, n, i, a, o, u)
        );
      }),
      (t.render = function render(t, e, r) {
        var n,
          i,
          a,
          s,
          o,
          u,
          h,
          l,
          f,
          p,
          c,
          d,
          _ = this._time,
          m = this._dirty ? this.totalDuration() : this._tDur,
          g = this._dur,
          v = this !== R && m - B < t && 0 <= t ? m : t < B ? 0 : t,
          y = this._zTime < 0 != t < 0 && (this._initted || !g);
        if (v !== this._tTime || r || y) {
          if (
            (_ !== this._time &&
              g &&
              ((v += this._time - _), (t += this._time - _)),
            (n = v),
            (f = this._start),
            (u = !(l = this._ts)),
            y && (g || (_ = this._zTime), (!t && e) || (this._zTime = t)),
            this._repeat &&
              ((c = this._yoyo),
              (o = g + this._rDelay),
              (g < (n = aa(v % o)) || m === v) && (n = g),
              (s = ~~(v / o)) && s === v / o && ((n = g), s--),
              c && 1 & s && ((n = g - n), (d = 1)),
              s !== (p = _t(this._tTime, o)) && !this._lock))
          ) {
            var T = c && 1 & p,
              b = T === (c && 1 & s);
            if (
              (s < p && (T = !T),
              (_ = T ? 0 : g),
              (this._lock = 1),
              (this.render(_, e, !g)._lock = 0),
              !e && this.parent && bt(this, "onRepeat"),
              this.vars.repeatRefresh && !d && (this.invalidate()._lock = 1),
              _ !== this._time || u != !this._ts)
            )
              return this;
            if (
              (b &&
                ((this._lock = 2),
                (_ = T ? g + 1e-4 : -1e-4),
                this.render(_, !0),
                this.vars.repeatRefresh && !d && this.invalidate()),
              (this._lock = 0),
              !this._ts && !u)
            )
              return this;
          }
          if (
            (this._hasPause &&
              !this._forcing &&
              this._lock < 2 &&
              (h = (function _findNextPauseTween(t, e, r) {
                var n;
                if (e < r)
                  for (n = t._first; n && n._start <= r; ) {
                    if (!n._dur && "isPause" === n.data && n._start > e)
                      return n;
                    n = n._next;
                  }
                else
                  for (n = t._last; n && n._start >= r; ) {
                    if (!n._dur && "isPause" === n.data && n._start < e)
                      return n;
                    n = n._prev;
                  }
              })(this, aa(_), aa(n))) &&
              (v -= n - (n = h._start)),
            (this._tTime = v),
            (this._time = n),
            (this._act = !l),
            this._initted ||
              ((this._onUpdate = this.vars.onUpdate),
              (this._initted = 1),
              (this._zTime = t)),
            _ || !n || e || bt(this, "onStart"),
            _ <= n && 0 <= t)
          )
            for (i = this._first; i; ) {
              if (
                ((a = i._next), (i._act || n >= i._start) && i._ts && h !== i)
              ) {
                if (i.parent !== this) return this.render(t, e, r);
                if (
                  (i.render(
                    0 < i._ts
                      ? (n - i._start) * i._ts
                      : (i._dirty ? i.totalDuration() : i._tDur) +
                          (n - i._start) * i._ts,
                    e,
                    r
                  ),
                  n !== this._time || (!this._ts && !u))
                ) {
                  (h = 0), a && (v += this._zTime = -B);
                  break;
                }
              }
              i = a;
            }
          else {
            i = this._last;
            for (var w = t < 0 ? t : n; i; ) {
              if (
                ((a = i._prev), (i._act || w <= i._end) && i._ts && h !== i)
              ) {
                if (i.parent !== this) return this.render(t, e, r);
                if (
                  (i.render(
                    0 < i._ts
                      ? (w - i._start) * i._ts
                      : (i._dirty ? i.totalDuration() : i._tDur) +
                          (w - i._start) * i._ts,
                    e,
                    r
                  ),
                  n !== this._time || (!this._ts && !u))
                ) {
                  (h = 0), a && (v += this._zTime = w ? -B : B);
                  break;
                }
              }
              i = a;
            }
          }
          if (
            h &&
            !e &&
            (this.pause(),
            (h.render(_ <= n ? 0 : -B)._zTime = _ <= n ? 1 : -1),
            this._ts)
          )
            return (this._start = f), xa(this), this.render(t, e, r);
          this._onUpdate && !e && bt(this, "onUpdate", !0),
            ((v === m && m >= this.totalDuration()) || (!v && this._ts < 0)) &&
              ((f !== this._start && Math.abs(l) === Math.abs(this._ts)) ||
                ((!t && g) ||
                  !((t && 0 < this._ts) || (!v && this._ts < 0)) ||
                  qa(this, 1),
                e ||
                  (t < 0 && !_) ||
                  (bt(this, v === m ? "onComplete" : "onReverseComplete", !0),
                  this._prom && this._prom())));
        }
        return this;
      }),
      (t.add = function add(t, e) {
        var r = this;
        if ((p(e) || (e = Fa(this, e)), !(t instanceof Et))) {
          if (W(t))
            return (
              t.forEach(function (t) {
                return r.add(t, e);
              }),
              ra(this)
            );
          if (n(t)) return this.addLabel(t, e);
          if (!o(t)) return this;
          t = Vt.delayedCall(0, t);
        }
        return this !== t ? ya(this, t, e) : this;
      }),
      (t.getChildren = function getChildren(t, e, r, n) {
        void 0 === t && (t = !0),
          void 0 === e && (e = !0),
          void 0 === r && (r = !0),
          void 0 === n && (n = -z);
        for (var i = [], a = this._first; a; )
          a._start >= n &&
            (a instanceof Vt
              ? e && i.push(a)
              : (r && i.push(a),
                t && i.push.apply(i, a.getChildren(!0, e, r)))),
            (a = a._next);
        return i;
      }),
      (t.getById = function getById(t) {
        for (var e = this.getChildren(1, 1, 1), r = e.length; r--; )
          if (e[r].vars.id === t) return e[r];
      }),
      (t.remove = function remove(t) {
        return n(t)
          ? this.removeLabel(t)
          : o(t)
          ? this.killTweensOf(t)
          : (pa(this, t),
            t === this._recent && (this._recent = this._last),
            ra(this));
      }),
      (t.totalTime = function totalTime(t, e) {
        return arguments.length
          ? ((this._forcing = 1),
            this.parent ||
              this._dp ||
              !this._ts ||
              (this._start = aa(
                Mt.time -
                  (0 < this._ts
                    ? t / this._ts
                    : (this.totalDuration() - t) / -this._ts)
              )),
            i.prototype.totalTime.call(this, t, e),
            (this._forcing = 0),
            this)
          : this._tTime;
      }),
      (t.addLabel = function addLabel(t, e) {
        return (this.labels[t] = Fa(this, e)), this;
      }),
      (t.removeLabel = function removeLabel(t) {
        return delete this.labels[t], this;
      }),
      (t.addPause = function addPause(t, e, r) {
        var n = Vt.delayedCall(0, e || O, r);
        return (
          (n.data = "isPause"), (this._hasPause = 1), ya(this, n, Fa(this, t))
        );
      }),
      (t.removePause = function removePause(t) {
        var e = this._first;
        for (t = Fa(this, t); e; )
          e._start === t && "isPause" === e.data && qa(e), (e = e._next);
      }),
      (t.killTweensOf = function killTweensOf(t, e, r) {
        for (var n = this.getTweensOf(t, r), i = n.length; i--; )
          It !== n[i] && n[i].kill(t, e);
        return this;
      }),
      (t.getTweensOf = function getTweensOf(t, e) {
        for (var r, n = [], i = yt(t), a = this._first; a; )
          a instanceof Vt
            ? !ba(a._targets, i) ||
              (e && !a.isActive("started" === e)) ||
              n.push(a)
            : (r = a.getTweensOf(i, e)).length && n.push.apply(n, r),
            (a = a._next);
        return n;
      }),
      (t.tweenTo = function tweenTo(t, e) {
        e = e || {};
        var r = this,
          n = Fa(r, t),
          i = e.startAt,
          a = Vt.to(
            r,
            ha(e, {
              ease: "none",
              lazy: !1,
              time: n,
              duration:
                e.duration ||
                Math.abs(n - (i && "time" in i ? i.time : r._time)) /
                  r.timeScale() ||
                B,
              onStart: function onStart() {
                r.pause();
                var t = e.duration || Math.abs(n - r._time) / r.timeScale();
                a._dur !== t && Ca(a, t).render(a._time, !0, !0),
                  e.onStart && e.onStart.apply(a, e.onStartParams || []);
              },
            })
          );
        return a;
      }),
      (t.tweenFromTo = function tweenFromTo(t, e, r) {
        return this.tweenTo(e, ha({ startAt: { time: Fa(this, t) } }, r));
      }),
      (t.recent = function recent() {
        return this._recent;
      }),
      (t.nextLabel = function nextLabel(t) {
        return void 0 === t && (t = this._time), ab(this, Fa(this, t));
      }),
      (t.previousLabel = function previousLabel(t) {
        return void 0 === t && (t = this._time), ab(this, Fa(this, t), 1);
      }),
      (t.currentLabel = function currentLabel(t) {
        return arguments.length
          ? this.seek(t, !0)
          : this.previousLabel(this._time + B);
      }),
      (t.shiftChildren = function shiftChildren(t, e, r) {
        void 0 === r && (r = 0);
        for (var n, i = this._first, a = this.labels; i; )
          i._start >= r && (i._start += t), (i = i._next);
        if (e) for (n in a) a[n] >= r && (a[n] += t);
        return ra(this);
      }),
      (t.invalidate = function invalidate() {
        var t = this._first;
        for (this._lock = 0; t; ) t.invalidate(), (t = t._next);
        return i.prototype.invalidate.call(this);
      }),
      (t.clear = function clear(t) {
        void 0 === t && (t = !0);
        for (var e, r = this._first; r; )
          (e = r._next), this.remove(r), (r = e);
        return (
          (this._time = this._tTime = 0), t && (this.labels = {}), ra(this)
        );
      }),
      (t.totalDuration = function totalDuration(t) {
        var e,
          r,
          n,
          i,
          a = 0,
          s = this,
          o = s._last,
          u = z;
        if (arguments.length)
          return s._repeat < 0 ? s : s.timeScale(s.totalDuration() / t);
        if (s._dirty) {
          for (i = s.parent; o; )
            (e = o._prev),
              o._dirty && o.totalDuration(),
              u < (n = o._start) && s._sort && o._ts && !s._lock
                ? ((s._lock = 1), (ya(s, o, n - o._delay)._lock = 0))
                : (u = n),
              n < 0 &&
                o._ts &&
                ((a -= n),
                ((!i && !s._dp) || (i && i.smoothChildTiming)) &&
                  ((s._start += n / s._ts), (s._time -= n), (s._tTime -= n)),
                s.shiftChildren(-n, !1, -1e20),
                (u = 0)),
              a < (r = xa(o)) && o._ts && (a = r),
              (o = e);
          Ca(s, s === R && s._time > a ? s._time : Math.min(z, a), 1),
            (s._dirty = 0);
        }
        return s._tDur;
      }),
      (Timeline.updateRoot = function updateRoot(t) {
        if ((R._ts && (ea(R, wa(t, R)), (c = Mt.frame)), Mt.frame >= ft)) {
          ft += U.autoSleep || 120;
          var e = R._first;
          if ((!e || !e._ts) && U.autoSleep && Mt._listeners.length < 2) {
            for (; e && !e._ts; ) e = e._next;
            e || Mt.sleep();
          }
        }
      }),
      Timeline
    );
  })(Et);
  ha(Bt.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
  function Ib(t, e, i, a, s, u) {
    var h, l, f, p;
    if (
      ht[t] &&
      !1 !==
        (h = new ht[t]()).init(
          s,
          h.rawVars
            ? e[t]
            : (function _processVars(t, e, i, a, s) {
                if (
                  (o(t) && (t = Yt(t, s, e, i, a)),
                  !r(t) || (t.style && t.nodeType) || W(t))
                )
                  return n(t) ? Yt(t, s, e, i, a) : t;
                var u,
                  h = {};
                for (u in t) h[u] = Yt(t[u], s, e, i, a);
                return h;
              })(e[t], a, s, u, i),
          i,
          a,
          u
        ) &&
      ((i._pt = l = new ee(i._pt, s, t, 0, 1, h.render, h, 0, h.priority)),
      i !== d)
    )
      for (f = i._ptLookup[i._targets.indexOf(s)], p = h._props.length; p--; )
        f[h._props[p]] = l;
    return h;
  }
  var It,
    Lt = function _addPropTween(t, e, r, i, a, s, u, h, l) {
      o(i) && (i = i(a || 0, t, s));
      var f,
        p = t[e],
        c =
          "get" !== r
            ? r
            : o(p)
            ? l
              ? t[
                  e.indexOf("set") || !o(t["get" + e.substr(3)])
                    ? e
                    : "get" + e.substr(3)
                ](l)
              : t[e]()
            : p,
        d = o(p) ? (l ? Zt : Xt) : jt;
      if (
        (n(i) &&
          (~i.indexOf("random(") && (i = Za(i)),
          "=" === i.charAt(1) &&
            (i =
              parseFloat(c) +
              parseFloat(i.substr(2)) * ("-" === i.charAt(0) ? -1 : 1) +
              (Ia(c) || 0))),
        c !== i)
      )
        return isNaN(c + i)
          ? (p || e in t || L(e, i),
            function _addComplexStringPropTween(t, e, r, n, i, a, s) {
              var o,
                u,
                h,
                l,
                f,
                p,
                c,
                d,
                _ = new ee(this._pt, t, e, 0, 1, Ht, null, i),
                m = 0,
                g = 0;
              for (
                _.b = r,
                  _.e = n,
                  r += "",
                  (c = ~(n += "").indexOf("random(")) && (n = Za(n)),
                  a && (a((d = [r, n]), t, e), (r = d[0]), (n = d[1])),
                  u = r.match(et) || [];
                (o = et.exec(n));

              )
                (l = o[0]),
                  (f = n.substring(m, o.index)),
                  h ? (h = (h + 1) % 5) : "rgba(" === f.substr(-5) && (h = 1),
                  l !== u[g++] &&
                    ((p = parseFloat(u[g - 1]) || 0),
                    (_._pt = {
                      _next: _._pt,
                      p: f || 1 === g ? f : ",",
                      s: p,
                      c:
                        "=" === l.charAt(1)
                          ? parseFloat(l.substr(2)) *
                            ("-" === l.charAt(0) ? -1 : 1)
                          : parseFloat(l) - p,
                      m: h && h < 4 ? Math.round : 0,
                    }),
                    (m = et.lastIndex));
              return (
                (_.c = m < n.length ? n.substring(m, n.length) : ""),
                (_.fp = s),
                (nt.test(n) || c) && (_.e = 0),
                (this._pt = _)
              );
            }.call(this, t, e, c, i, d, h || U.stringFilter, l))
          : ((f = new ee(
              this._pt,
              t,
              e,
              +c || 0,
              i - (c || 0),
              "boolean" == typeof p ? Wt : Qt,
              0,
              d
            )),
            l && (f.fp = l),
            u && f.modifier(u, this, t),
            (this._pt = f));
    },
    qt = function _initTween(t, e) {
      var r,
        n,
        i,
        a,
        o,
        u,
        h,
        l,
        f,
        p,
        c,
        d,
        _ = t.vars,
        m = _.ease,
        g = _.startAt,
        v = _.immediateRender,
        y = _.lazy,
        T = _.onUpdate,
        b = _.onUpdateParams,
        w = _.callbackScope,
        x = _.runBackwards,
        k = _.yoyoEase,
        O = _.keyframes,
        M = _.autoRevert,
        P = t._dur,
        C = t._startAt,
        S = t._targets,
        A = t.parent,
        F = A && "nested" === A.data ? A.parent._targets : S,
        D = "auto" === t._overwrite,
        z = t.timeline;
      if (
        (!z || (O && m) || (m = "none"),
        (t._ease = Dt(m, E.ease)),
        (t._yEase = k ? Ft(Dt(!0 === k ? m : k, E.ease)) : 0),
        k &&
          t._yoyo &&
          !t._repeat &&
          ((k = t._yEase), (t._yEase = t._ease), (t._ease = k)),
        !z)
      ) {
        if ((C && C.render(-1, !0).kill(), g)) {
          if (
            (qa(
              (t._startAt = Vt.set(
                S,
                ha(
                  {
                    data: "isStart",
                    overwrite: !1,
                    parent: A,
                    immediateRender: !0,
                    lazy: s(y),
                    startAt: null,
                    delay: 0,
                    onUpdate: T,
                    onUpdateParams: b,
                    callbackScope: w,
                    stagger: 0,
                  },
                  g
                )
              ))
            ),
            v)
          )
            if (0 < e) M || (t._startAt = 0);
            else if (P) return;
        } else if (x && P)
          if (C) M || (t._startAt = 0);
          else if (
            (e && (v = !1),
            qa(
              (t._startAt = Vt.set(
                S,
                dt(la(_, st), {
                  overwrite: !1,
                  data: "isFromStart",
                  lazy: v && s(y),
                  immediateRender: v,
                  stagger: 0,
                  parent: A,
                })
              ))
            ),
            v)
          ) {
            if (!e) return;
          } else _initTween(t._startAt, B);
        for (
          r = la(_, st),
            d = (l = S[(t._pt = 0)] ? Z(S[0]).harness : 0) && _[l.prop],
            y = (P && s(y)) || (y && !P),
            n = 0;
          n < S.length;
          n++
        ) {
          if (
            ((h = (o = S[n])._gsap || Y(S)[n]._gsap),
            (t._ptLookup[n] = p = {}),
            ut[h.id] && da(),
            (c = F === S ? n : F.indexOf(o)),
            l &&
              !1 !== (f = new l()).init(o, d || r, t, c, F) &&
              ((t._pt = a = new ee(
                t._pt,
                o,
                f.name,
                0,
                1,
                f.render,
                f,
                0,
                f.priority
              )),
              f._props.forEach(function (t) {
                p[t] = a;
              }),
              f.priority && (u = 1)),
            !l || d)
          )
            for (i in r)
              ht[i] && (f = Ib(i, r, t, c, o, F))
                ? f.priority && (u = 1)
                : (p[i] = a = Lt.call(
                    t,
                    o,
                    i,
                    "get",
                    r[i],
                    c,
                    F,
                    0,
                    _.stringFilter
                  ));
          t._op && t._op[n] && t.kill(o, t._op[n]),
            D && t._pt && ((It = t), R.killTweensOf(o, p, "started"), (It = 0)),
            t._pt && y && (ut[h.id] = 1);
        }
        u && te(t), t._onInit && t._onInit(t);
      }
      (t._from = !z && !!_.runBackwards), (t._onUpdate = T), (t._initted = 1);
    },
    Yt = function _parseFuncOrString(t, e, r, i, a) {
      return o(t)
        ? t.call(e, r, i, a)
        : n(t) && ~t.indexOf("random(")
        ? Za(t)
        : t;
    },
    Nt = ct + ",repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
    Ut = (Nt + ",id,stagger,delay,duration,paused").split(","),
    Vt = (function (P) {
      function Tween(t, e, n) {
        var i;
        "number" == typeof e && ((n.duration = e), (e = n), (n = null));
        var a,
          o,
          h,
          l,
          f,
          c,
          d,
          _,
          m = (i =
            P.call(
              this,
              (function _inheritDefaults(t) {
                var e = t.parent || R,
                  r = t.keyframes ? ia : ha;
                if (s(t.inherit))
                  for (; e; ) r(t, e.vars.defaults), (e = e.parent);
                return t;
              })(e),
              n
            ) || this).vars,
          g = m.duration,
          v = m.delay,
          y = m.immediateRender,
          T = m.stagger,
          b = m.overwrite,
          w = m.keyframes,
          x = m.defaults,
          k = (W(t) ? p(t[0]) : "length" in e) ? [t] : yt(t);
        if (
          ((i._targets = k.length
            ? Y(k)
            : M(
                "GSAP target " + t + " not found. https://greensock.com",
                !U.nullTargetWarn
              ) || []),
          (i._ptLookup = []),
          (i._overwrite = b),
          w || T || u(g) || u(v))
        ) {
          if (
            ((e = i.vars),
            (a = i.timeline = new Bt({
              data: "nested",
              defaults: x || {},
            })).kill(),
            (a.parent = _assertThisInitialized(i)),
            w)
          )
            ha(a.vars.defaults, { ease: "none" }),
              w.forEach(function (t) {
                return a.to(k, t, ">");
              });
          else {
            if (((l = k.length), (d = T ? Pa(T) : O), r(T)))
              for (f in T) ~Nt.indexOf(f) && ((_ = _ || {})[f] = T[f]);
            for (o = 0; o < l; o++) {
              for (f in ((h = {}), e)) Ut.indexOf(f) < 0 && (h[f] = e[f]);
              (h.stagger = 0),
                _ && dt(h, _),
                e.yoyoEase && !e.repeat && (h.yoyoEase = e.yoyoEase),
                (c = k[o]),
                (h.duration = +Yt(g, _assertThisInitialized(i), o, c, k)),
                (h.delay =
                  (+Yt(v, _assertThisInitialized(i), o, c, k) || 0) - i._delay),
                !T &&
                  1 === l &&
                  h.delay &&
                  ((i._delay = v = h.delay), (i._start += v), (h.delay = 0)),
                a.to(c, h, d(o, c, k));
            }
            g = v = 0;
          }
          g || i.duration((g = a.duration()));
        } else i.timeline = 0;
        return (
          !0 === b &&
            ((It = _assertThisInitialized(i)), R.killTweensOf(k), (It = 0)),
          (y ||
            (!g &&
              !w &&
              i._start === i.parent._time &&
              s(y) &&
              (function _hasNoPausedAncestors(t) {
                return !t || (t._ts && _hasNoPausedAncestors(t.parent));
              })(_assertThisInitialized(i)) &&
              "nested" !== i.parent.data)) &&
            ((i._tTime = -B), i.render(Math.max(0, -v))),
          i
        );
      }
      _inheritsLoose(Tween, P);
      var t = Tween.prototype;
      return (
        (t.render = function render(t, e, r) {
          var n,
            i,
            a,
            s,
            o,
            u,
            h,
            l,
            f,
            p = this._time,
            c = this._tDur,
            d = this._dur,
            _ = c - B < t && 0 <= t ? c : t < B ? 0 : t;
          if (d) {
            if (
              _ !== this._tTime ||
              !t ||
              r ||
              (this._startAt && this._zTime < 0 != t < 0)
            ) {
              if (((n = _), (l = this.timeline), this._repeat)) {
                if (
                  ((s = d + this._rDelay),
                  (d < (n = aa(_ % s)) || c === _) && (n = d),
                  (a = ~~(_ / s)) && a === _ / s && ((n = d), a--),
                  (u = this._yoyo && 1 & a) && ((f = this._yEase), (n = d - n)),
                  (o = _t(this._tTime, s)),
                  n === p && !r && this._initted)
                )
                  return this;
                a !== o &&
                  (!this.vars.repeatRefresh ||
                    u ||
                    this._lock ||
                    ((this._lock = r = 1),
                    (this.render(s * a, !0).invalidate()._lock = 0)));
              }
              if (!this._initted && za(this, n, r, e))
                return (this._tTime = 0), this;
              for (
                this._tTime = _,
                  this._time = n,
                  !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                  this.ratio = h = (f || this._ease)(n / d),
                  this._from && (this.ratio = h = 1 - h),
                  p || !n || e || bt(this, "onStart"),
                  i = this._pt;
                i;

              )
                i.r(h, i.d), (i = i._next);
              (l && l.render(t < 0 ? t : !n && u ? -B : l._dur * h, e, r)) ||
                (this._startAt && (this._zTime = t)),
                this._onUpdate &&
                  !e &&
                  (t < 0 && this._startAt && this._startAt.render(t, !0, r),
                  bt(this, "onUpdate")),
                this._repeat &&
                  a !== o &&
                  this.vars.onRepeat &&
                  !e &&
                  this.parent &&
                  bt(this, "onRepeat"),
                (_ !== this._tDur && _) ||
                  this._tTime !== _ ||
                  (t < 0 &&
                    this._startAt &&
                    !this._onUpdate &&
                    this._startAt.render(t, !0, r),
                  (!t && d) ||
                    !((t && 0 < this._ts) || (!_ && this._ts < 0)) ||
                    qa(this, 1),
                  e ||
                    (t < 0 && !p) ||
                    (bt(this, _ === c ? "onComplete" : "onReverseComplete", !0),
                    this._prom && this._prom()));
            }
          } else
            !(function _renderZeroDurationTween(t, e, r, n) {
              var i,
                a = t._zTime < 0 ? 0 : 1,
                s = e < 0 ? 0 : 1,
                o = t._rDelay,
                u = 0;
              if (
                (o &&
                  t._repeat &&
                  ((u = gt(0, t._tDur, e)),
                  _t(u, o) !== _t(t._tTime, o) &&
                    ((a = 1 - s),
                    t.vars.repeatRefresh && t._initted && t.invalidate())),
                (t._initted || !za(t, e, n, r)) &&
                  (s !== a || n || t._zTime === B || (!e && t._zTime)))
              ) {
                for (
                  t._zTime = e || (r ? B : 0),
                    t.ratio = s,
                    t._from && (s = 1 - s),
                    t._time = 0,
                    t._tTime = u,
                    r || bt(t, "onStart"),
                    i = t._pt;
                  i;

                )
                  i.r(s, i.d), (i = i._next);
                !s &&
                  t._startAt &&
                  !t._onUpdate &&
                  t._start &&
                  t._startAt.render(e, !0, n),
                  t._onUpdate && !r && bt(t, "onUpdate"),
                  u && t._repeat && !r && t.parent && bt(t, "onRepeat"),
                  (e >= t._tDur || e < 0) &&
                    t.ratio === s &&
                    (t.ratio && qa(t, 1),
                    r ||
                      (bt(t, t.ratio ? "onComplete" : "onReverseComplete", !0),
                      t._prom && t._prom()));
              }
            })(this, t, e, r);
          return this;
        }),
        (t.targets = function targets() {
          return this._targets;
        }),
        (t.invalidate = function invalidate() {
          return (
            (this._pt = this._op = this._startAt = this._onUpdate = this._act = this._lazy = 0),
            (this._ptLookup = []),
            this.timeline && this.timeline.invalidate(),
            P.prototype.invalidate.call(this)
          );
        }),
        (t.kill = function kill(t, e) {
          if (
            (void 0 === e && (e = "all"),
            !(t || (e && "all" !== e)) && ((this._lazy = 0), this.parent))
          )
            return cb(this);
          if (this.timeline)
            return (
              this.timeline.killTweensOf(t, e, It && !0 !== It.vars.overwrite),
              this
            );
          var r,
            i,
            a,
            s,
            o,
            u,
            h,
            l = this._targets,
            f = t ? yt(t) : l,
            p = this._ptLookup,
            c = this._pt;
          if (
            (!e || "all" === e) &&
            (function _arraysMatch(t, e) {
              for (
                var r = t.length, n = r === e.length;
                n && r-- && t[r] === e[r];

              );
              return r < 0;
            })(l, f)
          )
            return cb(this);
          for (
            r = this._op = this._op || [],
              "all" !== e &&
                (n(e) &&
                  ((o = {}),
                  _(e, function (t) {
                    return (o[t] = 1);
                  }),
                  (e = o)),
                (e = (function _addAliasesToVars(t, e) {
                  var r,
                    n,
                    i,
                    a,
                    s = t[0] ? Z(t[0]).harness : 0,
                    o = s && s.aliases;
                  if (!o) return e;
                  for (n in ((r = dt({}, e)), o))
                    if ((n in r))
                      for (i = (a = o[n].split(",")).length; i--; )
                        r[a[i]] = r[n];
                  return r;
                })(l, e))),
              h = l.length;
            h--;

          )
            if (~f.indexOf(l[h]))
              for (o in ((i = p[h]),
              "all" === e
                ? ((r[h] = e), (s = i), (a = {}))
                : ((a = r[h] = r[h] || {}), (s = e)),
              s))
                (u = i && i[o]) &&
                  (("kill" in u.d && !0 !== u.d.kill(o)) || pa(this, u, "_pt"),
                  delete i[o]),
                  "all" !== a && (a[o] = 1);
          return this._initted && !this._pt && c && cb(this), this;
        }),
        (Tween.to = function to(t, e, r) {
          return new Tween(t, e, r);
        }),
        (Tween.from = function from(t, e) {
          return new Tween(t, ca(arguments, 1));
        }),
        (Tween.delayedCall = function delayedCall(t, e, r, n) {
          return new Tween(e, 0, {
            immediateRender: !1,
            lazy: !1,
            overwrite: !1,
            delay: t,
            onComplete: e,
            onReverseComplete: e,
            onCompleteParams: r,
            onReverseCompleteParams: r,
            callbackScope: n,
          });
        }),
        (Tween.fromTo = function fromTo(t, e, r) {
          return new Tween(t, ca(arguments, 2));
        }),
        (Tween.set = function set(t, e) {
          return (
            (e.duration = 0), e.repeatDelay || (e.repeat = 0), new Tween(t, e)
          );
        }),
        (Tween.killTweensOf = function killTweensOf(t, e, r) {
          return R.killTweensOf(t, e, r);
        }),
        Tween
      );
    })(Et);
  ha(Vt.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
    _("staggerTo,staggerFrom,staggerFromTo", function (r) {
      Vt[r] = function () {
        var t = new Bt(),
          e = vt.call(arguments, 0);
        return e.splice("staggerFromTo" === r ? 5 : 4, 0, 0), t[r].apply(t, e);
      };
    });
  function Tb(t, e, r) {
    return t.setAttribute(e, r);
  }
  function _b(t, e, r, n) {
    n.mSet(t, e, n.m.call(n.tween, r, n.mt), n);
  }
  var jt = function _setterPlain(t, e, r) {
      return (t[e] = r);
    },
    Xt = function _setterFunc(t, e, r) {
      return t[e](r);
    },
    Zt = function _setterFuncWithParam(t, e, r, n) {
      return t[e](n.fp, r);
    },
    Gt = function _getSetter(t, e) {
      return o(t[e]) ? Xt : q(t[e]) && t.setAttribute ? Tb : jt;
    },
    Qt = function _renderPlain(t, e) {
      return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4, e);
    },
    Wt = function _renderBoolean(t, e) {
      return e.set(e.t, e.p, !!(e.s + e.c * t), e);
    },
    Ht = function _renderComplexString(t, e) {
      var r = e._pt,
        n = "";
      if (!t && e.b) n = e.b;
      else if (1 === t && e.e) n = e.e;
      else {
        for (; r; )
          (n =
            r.p +
            (r.m
              ? r.m(r.s + r.c * t)
              : Math.round(1e4 * (r.s + r.c * t)) / 1e4) +
            n),
            (r = r._next);
        n += e.c;
      }
      e.set(e.t, e.p, n, e);
    },
    $t = function _renderPropTweens(t, e) {
      for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
    },
    Kt = function _addPluginModifier(t, e, r, n) {
      for (var i, a = this._pt; a; )
        (i = a._next), a.p === n && a.modifier(t, e, r), (a = i);
    },
    Jt = function _killPropTweensOf(t) {
      for (var e, r, n = this._pt; n; )
        (r = n._next),
          (n.p === t && !n.op) || n.op === t
            ? pa(this, n, "_pt")
            : n.dep || (e = 1),
          (n = r);
      return !e;
    },
    te = function _sortPropTweensByPriority(t) {
      for (var e, r, n, i, a = t._pt; a; ) {
        for (e = a._next, r = n; r && r.pr > a.pr; ) r = r._next;
        (a._prev = r ? r._prev : i) ? (a._prev._next = a) : (n = a),
          (a._next = r) ? (r._prev = a) : (i = a),
          (a = e);
      }
      t._pt = n;
    },
    ee =
      ((PropTween.prototype.modifier = function modifier(t, e, r) {
        (this.mSet = this.mSet || this.set),
          (this.set = _b),
          (this.m = t),
          (this.mt = r),
          (this.tween = e);
      }),
      PropTween);
  function PropTween(t, e, r, n, i, a, s, o, u) {
    (this.t = e),
      (this.s = n),
      (this.c = i),
      (this.p = r),
      (this.r = a || Qt),
      (this.d = s || this),
      (this.set = o || jt),
      (this.pr = u || 0),
      (this._next = t) && (t._prev = this);
  }
  _(
    ct +
      ",parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert",
    function (t) {
      (st[t] = 1), "on" === t.substr(0, 2) && (st[t + "Params"] = 1);
    }
  ),
    (at.TweenMax = at.TweenLite = Vt),
    (at.TimelineLite = at.TimelineMax = Bt),
    (R = new Bt({
      sortChildren: !1,
      defaults: E,
      autoRemoveChildren: !0,
      id: "root",
      smoothChildTiming: !0,
    })),
    (U.stringFilter = nb);
  var re = {
    registerPlugin: function registerPlugin() {
      for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
        e[r] = arguments[r];
      e.forEach(function (t) {
        return (function _createPlugin(t) {
          var e = (t = (!t.name && t.default) || t).name,
            r = o(t),
            n =
              e && !r && t.init
                ? function () {
                    this._props = [];
                  }
                : t,
            i = {
              init: O,
              render: $t,
              add: Lt,
              kill: Jt,
              modifier: Kt,
              rawVars: 0,
            },
            a = {
              targetTest: 0,
              get: 0,
              getSetter: Gt,
              aliases: {},
              register: 0,
            };
          if ((Pt(), t !== n)) {
            if (ht[e]) return;
            ha(n, ha(la(t, i), a)),
              dt(n.prototype, dt(i, la(t, a))),
              (ht[(n.prop = e)] = n),
              t.targetTest && (pt.push(n), (st[e] = 1)),
              (e =
                ("css" === e
                  ? "CSS"
                  : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin");
          }
          N(e, n), t.register && t.register(ne, n, ee);
        })(t);
      });
    },
    timeline: function timeline(t) {
      return new Bt(t);
    },
    getTweensOf: function getTweensOf(t, e) {
      return R.getTweensOf(t, e);
    },
    getProperty: function getProperty(i, t, e, r) {
      n(i) && (i = yt(i)[0]);
      var a = Z(i || {}).get,
        s = e ? ga : fa;
      return (
        "native" === e && (e = ""),
        i
          ? t
            ? s(((ht[t] && ht[t].get) || a)(i, t, e, r))
            : function (t, e, r) {
                return s(((ht[t] && ht[t].get) || a)(i, t, e, r));
              }
          : i
      );
    },
    quickSetter: function quickSetter(r, e, n) {
      if (1 < (r = yt(r)).length) {
        var i = r.map(function (t) {
            return ne.quickSetter(t, e, n);
          }),
          a = i.length;
        return function (t) {
          for (var e = a; e--; ) i[e](t);
        };
      }
      r = r[0] || {};
      var s = ht[e],
        o = Z(r),
        u = s
          ? function (t) {
              var e = new s();
              (d._pt = 0),
                e.init(r, n ? t + n : t, d, 0, [r]),
                e.render(1, e),
                d._pt && $t(1, d);
            }
          : o.set(r, e);
      return s
        ? u
        : function (t) {
            return u(r, e, n ? t + n : t, o, 1);
          };
    },
    isTweening: function isTweening(t) {
      return 0 < R.getTweensOf(t, !0).length;
    },
    defaults: function defaults(t) {
      return t && t.ease && (t.ease = Dt(t.ease, E.ease)), ka(E, t || {});
    },
    config: function config(t) {
      return ka(U, t || {});
    },
    registerEffect: function registerEffect(t) {
      var i = t.name,
        n = t.effect,
        e = t.plugins,
        a = t.defaults,
        s = t.extendTimeline;
      (e || "").split(",").forEach(function (t) {
        return (
          t && !ht[t] && !at[t] && M(i + " effect requires " + t + " plugin.")
        );
      }),
        (lt[i] = function (t, e) {
          return n(yt(t), ha(e || {}, a));
        }),
        s &&
          (Bt.prototype[i] = function (t, e, n) {
            return this.add(lt[i](t, r(e) ? e : (n = e) && {}), n);
          });
    },
    registerEase: function registerEase(t, e) {
      Ct[t] = Dt(e);
    },
    parseEase: function parseEase(t, e) {
      return arguments.length ? Dt(t, e) : Ct;
    },
    getById: function getById(t) {
      return R.getById(t);
    },
    exportRoot: function exportRoot(t, e) {
      void 0 === t && (t = {});
      var r,
        n,
        i = new Bt(t);
      for (
        i.smoothChildTiming = s(t.smoothChildTiming),
          R.remove(i),
          i._dp = 0,
          i._time = i._tTime = R._time,
          r = R._first;
        r;

      )
        (n = r._next),
          (!e &&
            !r._dur &&
            r instanceof Vt &&
            r.vars.onComplete === r._targets[0]) ||
            ya(i, r, r._start - r._delay),
          (r = n);
      return ya(R, i, 0), i;
    },
    utils: {
      wrap: function wrap(e, t, r) {
        var n = t - e;
        return W(e)
          ? Wa(e, wrap(0, e.length), t)
          : Ga(r, function (t) {
              return ((n + ((t - e) % n)) % n) + e;
            });
      },
      wrapYoyo: function wrapYoyo(e, t, r) {
        var n = t - e,
          i = 2 * n;
        return W(e)
          ? Wa(e, wrapYoyo(0, e.length - 1), t)
          : Ga(r, function (t) {
              return e + (n < (t = (i + ((t - e) % i)) % i) ? i - t : t);
            });
      },
      distribute: Pa,
      random: Sa,
      snap: Ra,
      normalize: function normalize(t, e, r) {
        return Tt(t, e, 0, 1, r);
      },
      getUnit: Ia,
      clamp: function clamp(e, r, t) {
        return Ga(t, function (t) {
          return gt(e, r, t);
        });
      },
      splitColor: ib,
      toArray: yt,
      mapRange: Tt,
      pipe: function pipe() {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
          e[r] = arguments[r];
        return function (t) {
          return e.reduce(function (t, e) {
            return e(t);
          }, t);
        };
      },
      unitize: function unitize(e, r) {
        return function (t) {
          return e(parseFloat(t)) + (r || Ia(t));
        };
      },
      interpolate: function interpolate(e, r, t, i) {
        var a = isNaN(e + r)
          ? 0
          : function (t) {
              return (1 - t) * e + t * r;
            };
        if (!a) {
          var s,
            o,
            u,
            h,
            l,
            f = n(e),
            p = {};
          if ((!0 === t && (i = 1) && (t = null), f))
            (e = { p: e }), (r = { p: r });
          else if (W(e) && !W(r)) {
            for (u = [], h = e.length, l = h - 2, o = 1; o < h; o++)
              u.push(interpolate(e[o - 1], e[o]));
            h--,
              (a = function func(t) {
                t *= h;
                var e = Math.min(l, ~~t);
                return u[e](t - e);
              }),
              (t = r);
          } else i || (e = dt(W(e) ? [] : {}, e));
          if (!u) {
            for (s in r) Lt.call(p, e, s, "get", r[s]);
            a = function func(t) {
              return $t(t, p) || (f ? e.p : e);
            };
          }
        }
        return Ga(t, a);
      },
      shuffle: Oa,
    },
    install: K,
    effects: lt,
    ticker: Mt,
    updateRoot: Bt.updateRoot,
    plugins: ht,
    globalTimeline: R,
    core: {
      PropTween: ee,
      globals: N,
      Tween: Vt,
      Timeline: Bt,
      Animation: Et,
      getCache: Z,
    },
  };
  _("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
    return (re[t] = Vt[t]);
  }),
    Mt.add(Bt.updateRoot),
    (d = re.to({}, { duration: 0 }));
  function dc(t, e) {
    for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
      r = r._next;
    return r;
  }
  function fc(t, a) {
    return {
      name: t,
      rawVars: 1,
      init: function init(t, i, e) {
        e._onInit = function (t) {
          var e, r;
          if (
            (n(i) &&
              ((e = {}),
              _(i, function (t) {
                return (e[t] = 1);
              }),
              (i = e)),
            a)
          ) {
            for (r in ((e = {}), i)) e[r] = a(i[r]);
            i = e;
          }
          !(function _addModifiers(t, e) {
            var r,
              n,
              i,
              a = t._targets;
            for (r in e)
              for (n = a.length; n--; )
                (i = (i = t._ptLookup[n][r]) && i.d) &&
                  (i._pt && (i = dc(i, r)),
                  i && i.modifier && i.modifier(e[r], t, a[n], r));
          })(t, i);
        };
      },
    };
  }
  var ne =
    re.registerPlugin(
      {
        name: "attr",
        init: function init(t, e, r, n, i) {
          for (var a in e)
            this.add(
              t,
              "setAttribute",
              (t.getAttribute(a) || 0) + "",
              e[a],
              n,
              i,
              0,
              0,
              a
            ),
              this._props.push(a);
        },
      },
      {
        name: "endArray",
        init: function init(t, e) {
          for (var r = e.length; r--; ) this.add(t, r, t[r] || 0, e[r]);
        },
      },
      fc("roundProps", Qa),
      fc("modifiers"),
      fc("snap", Ra)
    ) || re;
  (Vt.version = Bt.version = ne.version = "3.2.0"), (f = 1), t() && Pt();
  function Qc(t, e) {
    return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
  }
  function Rc(t, e) {
    return e.set(
      e.t,
      e.p,
      1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
      e
    );
  }
  function Sc(t, e) {
    return e.set(
      e.t,
      e.p,
      t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
      e
    );
  }
  function Tc(t, e) {
    var r = e.s + e.c * t;
    e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
  }
  function Uc(t, e) {
    return e.set(e.t, e.p, t ? e.e : e.b, e);
  }
  function Vc(t, e) {
    return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
  }
  function Wc(t, e, r) {
    return (t.style[e] = r);
  }
  function Xc(t, e, r) {
    return t.style.setProperty(e, r);
  }
  function Yc(t, e, r) {
    return (t._gsap[e] = r);
  }
  function Zc(t, e, r) {
    return (t._gsap.scaleX = t._gsap.scaleY = r);
  }
  function $c(t, e, r, n, i) {
    var a = t._gsap;
    (a.scaleX = a.scaleY = r), a.renderTransform(i, a);
  }
  function _c(t, e, r, n, i) {
    var a = t._gsap;
    (a[e] = r), a.renderTransform(i, a);
  }
  function dd(t, e) {
    var r = ae.createElementNS
      ? ae.createElementNS(
          (e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
          t
        )
      : ae.createElement(t);
    return r.style ? r : ae.createElement(t);
  }
  function ed(t, e, r) {
    var n = getComputedStyle(t);
    return (
      n[e] ||
      n.getPropertyValue(e.replace(Re, "-$1").toLowerCase()) ||
      n.getPropertyValue(e) ||
      (!r && ed(t, Ne(e) || e, 1)) ||
      ""
    );
  }
  function hd() {
    !(function _windowExists() {
      return "undefined" != typeof window;
    })() ||
      ((ie = window),
      (ae = ie.document),
      (se = ae.documentElement),
      (ue = dd("div") || { style: {} }),
      (he = dd("div")),
      (Le = Ne(Le)),
      (qe = Ne(qe)),
      (ue.style.cssText =
        "border-width:0;line-height:0;position:absolute;padding:0"),
      (fe = !!Ne("perspective")),
      (oe = 1));
  }
  function jd(t, e) {
    for (var r = e.length; r--; )
      if (t.hasAttribute(e[r])) return t.getAttribute(e[r]);
  }
  function kd(e) {
    var r;
    try {
      r = e.getBBox();
    } catch (t) {
      r = function _getBBoxHack(t) {
        var e,
          r = dd(
            "svg",
            (this.ownerSVGElement &&
              this.ownerSVGElement.getAttribute("xmlns")) ||
              "http://www.w3.org/2000/svg"
          ),
          n = this.parentNode,
          i = this.nextSibling,
          a = this.style.cssText;
        if (
          (se.appendChild(r),
          r.appendChild(this),
          (this.style.display = "block"),
          t)
        )
          try {
            (e = this.getBBox()),
              (this._gsapBBox = this.getBBox),
              (this.getBBox = _getBBoxHack);
          } catch (t) {}
        else this._gsapBBox && (e = this._gsapBBox());
        return (
          i ? n.insertBefore(this, i) : n.appendChild(this),
          se.removeChild(r),
          (this.style.cssText = a),
          e
        );
      }.call(e, !0);
    }
    return !r || r.width || r.x || r.y
      ? r
      : {
          x: +jd(e, ["x", "cx", "x1"]) || 0,
          y: +jd(e, ["y", "cy", "y1"]) || 0,
          width: 0,
          height: 0,
        };
  }
  function ld(t) {
    return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !kd(t));
  }
  function md(t, e) {
    if (e) {
      var r = t.style;
      e in Ae && (e = Le),
        r.removeProperty
          ? (("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6)) ||
              (e = "-" + e),
            r.removeProperty(e.replace(Re, "-$1").toLowerCase()))
          : r.removeAttribute(e);
    }
  }
  function nd(t, e, r, n, i, a) {
    var s = new ee(t._pt, e, r, 0, 1, a ? Vc : Uc);
    return ((t._pt = s).b = n), (s.e = i), t._props.push(r), s;
  }
  function pd(t, e, r, n) {
    var i,
      a,
      s,
      o,
      u = parseFloat(r) || 0,
      h = (r + "").trim().substr((u + "").length) || "px",
      l = ue.style,
      f = Ee.test(e),
      p = "svg" === t.tagName.toLowerCase(),
      c = (p ? "client" : "offset") + (f ? "Width" : "Height"),
      d = "px" === n;
    return n === h || !u || Ue[n] || Ue[h]
      ? u
      : ((o = t.getCTM && ld(t)),
        "%" === n && (Ae[e] || ~e.indexOf("adius"))
          ? aa((u / (o ? t.getBBox()[f ? "width" : "height"] : t[c])) * 100)
          : ((l[f ? "width" : "height"] = 100 + (d ? h : n)),
            (a =
              ~e.indexOf("adius") || ("em" === n && t.appendChild && !p)
                ? t
                : t.parentNode),
            o && (a = (t.ownerSVGElement || {}).parentNode),
            (a && a !== ae && a.appendChild) || (a = ae.body),
            (s = a._gsap) && "%" === n && s.width && f && s.time === Mt.time
              ? aa((u / s.width) * 100)
              : (a === t && (l.position = "static"),
                a.appendChild(ue),
                (i = ue[c]),
                a.removeChild(ue),
                (l.position = "absolute"),
                f &&
                  "%" === n &&
                  (((s = Z(a)).time = Mt.time), (s.width = a[c])),
                aa(d ? (i * u) / 100 : (100 / i) * u))));
  }
  function qd(t, e, r, n) {
    var i;
    return (
      oe || hd(),
      e in Ie &&
        "transform" !== e &&
        ~(e = Ie[e]).indexOf(",") &&
        (e = e.split(",")[0]),
      Ae[e] && "transform" !== e
        ? ((i = Ge(t, n)),
          (i =
            "transformOrigin" !== e
              ? i[e]
              : Qe(ed(t, qe)) + " " + i.zOrigin + "px"))
        : ((i = t.style[e]) &&
            "auto" !== i &&
            !n &&
            !~(i + "").indexOf("calc(")) ||
          (i =
            (je[e] && je[e](t, e, r)) ||
            ed(t, e) ||
            $(t, e) ||
            ("opacity" === e ? 1 : 0)),
      r && !~(i + "").indexOf(" ") ? pd(t, e, i, r) + r : i
    );
  }
  function rd(t, e, r, n) {
    if (!r || "none" === r) {
      var i = Ne(e, t, 1),
        a = i && ed(t, i, 1);
      a && a !== r && ((e = i), (r = a));
    }
    var s,
      o,
      u,
      h,
      l,
      f,
      p,
      c,
      d,
      _,
      m,
      g,
      v = new ee(this._pt, t.style, e, 0, 1, Ht),
      y = 0,
      T = 0;
    if (
      ((v.b = r),
      (v.e = n),
      (r += ""),
      "auto" === (n += "") &&
        ((t.style[e] = n), (n = ed(t, e) || n), (t.style[e] = r)),
      nb((s = [r, n])),
      (n = s[1]),
      (u = (r = s[0]).match(tt) || []),
      (n.match(tt) || []).length)
    ) {
      for (; (o = tt.exec(n)); )
        (p = o[0]),
          (d = n.substring(y, o.index)),
          l
            ? (l = (l + 1) % 5)
            : ("rgba(" !== d.substr(-5) && "hsla(" !== d.substr(-5)) || (l = 1),
          p !== (f = u[T++] || "") &&
            ((h = parseFloat(f) || 0),
            (m = f.substr((h + "").length)),
            (g = "=" === p.charAt(1) ? +(p.charAt(0) + "1") : 0) &&
              (p = p.substr(2)),
            (c = parseFloat(p)),
            (_ = p.substr((c + "").length)),
            (y = tt.lastIndex - _.length),
            _ ||
              ((_ = _ || U.units[e] || m),
              y === n.length && ((n += _), (v.e += _))),
            m !== _ && (h = pd(t, e, f, _) || 0),
            (v._pt = {
              _next: v._pt,
              p: d || 1 === T ? d : ",",
              s: h,
              c: g ? g * c : c - h,
              m: l && l < 4 ? Math.round : 0,
            }));
      v.c = y < n.length ? n.substring(y, n.length) : "";
    } else v.r = "display" === e && "none" === n ? Vc : Uc;
    return nt.test(n) && (v.e = 0), (this._pt = v);
  }
  function td(t) {
    var e = t.split(" "),
      r = e[0],
      n = e[1] || "50%";
    return (
      ("top" !== r && "bottom" !== r && "left" !== n && "right" !== n) ||
        ((t = r), (r = n), (n = t)),
      (e[0] = Ve[r] || r),
      (e[1] = Ve[n] || n),
      e.join(" ")
    );
  }
  function ud(t, e) {
    if (e.tween && e.tween._time === e.tween._dur) {
      var r,
        n,
        i,
        a = e.t,
        s = a.style,
        o = e.u;
      if ("all" === o || !0 === o) (s.cssText = ""), (n = 1);
      else
        for (i = (o = o.split(",")).length; -1 < --i; )
          (r = o[i]),
            Ae[r] && ((n = 1), (r = "transformOrigin" === r ? qe : Le)),
            md(a, r);
      n &&
        (md(a, Le),
        (n = a._gsap) && (n.svg && a.removeAttribute("transform"), Ge(a, 1)));
    }
  }
  function yd(t) {
    return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
  }
  function zd(t) {
    var e = ed(t, Le);
    return yd(e) ? Xe : e.substr(7).match(J).map(aa);
  }
  function Ad(t, e) {
    var r,
      n,
      i,
      a,
      s = t._gsap,
      o = t.style,
      u = zd(t);
    return s.svg && t.getAttribute("transform")
      ? "1,0,0,1,0,0" ===
        (u = [
          (i = t.transform.baseVal.consolidate().matrix).a,
          i.b,
          i.c,
          i.d,
          i.e,
          i.f,
        ]).join(",")
        ? Xe
        : u
      : (u !== Xe ||
          t.offsetParent ||
          t === se ||
          s.svg ||
          ((i = o.display),
          (o.display = "block"),
          ((r = t.parentNode) && t.offsetParent) ||
            ((a = 1), (n = t.nextSibling), se.appendChild(t)),
          (u = zd(t)),
          i ? (o.display = i) : md(t, "display"),
          a &&
            (n
              ? r.insertBefore(t, n)
              : r
              ? r.appendChild(t)
              : se.removeChild(t))),
        e && 6 < u.length ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u);
  }
  function Bd(t, e, r, n, i, a) {
    var s,
      o,
      u,
      h = t._gsap,
      l = i || Ad(t, !0),
      f = h.xOrigin || 0,
      p = h.yOrigin || 0,
      c = h.xOffset || 0,
      d = h.yOffset || 0,
      _ = l[0],
      m = l[1],
      g = l[2],
      v = l[3],
      y = l[4],
      T = l[5],
      b = e.split(" "),
      w = parseFloat(b[0]) || 0,
      x = parseFloat(b[1]) || 0;
    r
      ? l !== Xe &&
        (o = _ * v - m * g) &&
        ((u = w * (-m / o) + x * (_ / o) - (_ * T - m * y) / o),
        (w = w * (v / o) + x * (-g / o) + (g * T - v * y) / o),
        (x = u))
      : ((w = (s = kd(t)).x + (~b[0].indexOf("%") ? (w / 100) * s.width : w)),
        (x = s.y + (~(b[1] || b[0]).indexOf("%") ? (x / 100) * s.height : x))),
      n || (!1 !== n && h.smooth)
        ? ((y = w - f),
          (T = x - p),
          (h.xOffset = c + (y * _ + T * g) - y),
          (h.yOffset = d + (y * m + T * v) - T))
        : (h.xOffset = h.yOffset = 0),
      (h.xOrigin = w),
      (h.yOrigin = x),
      (h.smooth = !!n),
      (h.origin = e),
      (h.originIsAbsolute = !!r),
      (t.style[qe] = "0px 0px"),
      a &&
        (nd(a, h, "xOrigin", f, w),
        nd(a, h, "yOrigin", p, x),
        nd(a, h, "xOffset", c, h.xOffset),
        nd(a, h, "yOffset", d, h.yOffset));
  }
  function Ed(t, e, r) {
    var n = Ia(e);
    return aa(parseFloat(e) + parseFloat(pd(t, "x", r + "px", n))) + n;
  }
  function Ld(t, e, r, i, a, s) {
    var o,
      u,
      h = 360,
      l = n(a),
      f = parseFloat(a) * (l && ~a.indexOf("rad") ? Fe : 1),
      p = s ? f * s : f - i,
      c = i + p + "deg";
    return (
      l &&
        ("short" === (o = a.split("_")[1]) &&
          (p %= h) !== p % 180 &&
          (p += p < 0 ? h : -h),
        "cw" === o && p < 0
          ? (p = ((p + 36e9) % h) - ~~(p / h) * h)
          : "ccw" === o && 0 < p && (p = ((p - 36e9) % h) - ~~(p / h) * h)),
      (t._pt = u = new ee(t._pt, e, r, i, p, Rc)),
      (u.e = c),
      (u.u = "deg"),
      t._props.push(r),
      u
    );
  }
  function Md(t, e, r) {
    var n,
      i,
      a,
      s,
      o,
      u,
      h,
      l = he.style,
      f = r._gsap;
    for (i in ((l.cssText =
      getComputedStyle(r).cssText + ";position:absolute;display:block;"),
    (l[Le] = e),
    ae.body.appendChild(he),
    (n = Ge(he, 1)),
    Ae))
      (a = f[i]) !== (s = n[i]) &&
        "perspective,force3D,transformOrigin,svgOrigin".indexOf(i) < 0 &&
        ((o = Ia(a) !== (h = Ia(s)) ? pd(r, i, a, h) : parseFloat(a)),
        (u = parseFloat(s)),
        (t._pt = new ee(t._pt, f, i, o, u - o, Qc)),
        (t._pt.u = h || 0),
        t._props.push(i));
    ae.body.removeChild(he);
  }
  var ie,
    ae,
    se,
    oe,
    ue,
    he,
    le,
    fe,
    pe = Ct.Power0,
    ce = Ct.Power1,
    de = Ct.Power2,
    _e = Ct.Power3,
    me = Ct.Power4,
    ge = Ct.Linear,
    ve = Ct.Quad,
    ye = Ct.Cubic,
    Te = Ct.Quart,
    be = Ct.Quint,
    we = Ct.Strong,
    xe = Ct.Elastic,
    ke = Ct.Back,
    Oe = Ct.SteppedEase,
    Me = Ct.Bounce,
    Pe = Ct.Sine,
    Ce = Ct.Expo,
    Se = Ct.Circ,
    Ae = {},
    Fe = 180 / Math.PI,
    De = Math.PI / 180,
    ze = Math.atan2,
    Re = /([A-Z])/g,
    Ee = /(?:left|right|width|margin|padding|x)/i,
    Be = /[\s,\(]\S/,
    Ie = {
      autoAlpha: "opacity,visibility",
      scale: "scaleX,scaleY",
      alpha: "opacity",
    },
    Le = "transform",
    qe = Le + "Origin",
    Ye = "O,Moz,ms,Ms,Webkit".split(","),
    Ne = function _checkPropPrefix(t, e, r) {
      var n = (e || ue).style,
        i = 5;
      if (t in n && !r) return t;
      for (
        t = t.charAt(0).toUpperCase() + t.substr(1);
        i-- && !(Ye[i] + t in n);

      );
      return i < 0 ? null : (3 === i ? "ms" : 0 <= i ? Ye[i] : "") + t;
    },
    Ue = { deg: 1, rad: 1, turn: 1 },
    Ve = {
      top: "0%",
      bottom: "100%",
      left: "0%",
      right: "100%",
      center: "50%",
    },
    je = {
      clearProps: function clearProps(t, e, r, n, i) {
        if ("isFromStart" !== i.data) {
          var a = (t._pt = new ee(t._pt, e, r, 0, 0, ud));
          return (a.u = n), (a.pr = -10), (a.tween = i), t._props.push(r), 1;
        }
      },
    },
    Xe = [1, 0, 0, 1, 0, 0],
    Ze = {},
    Ge = function _parseTransform(t, e) {
      var r = t._gsap || new Rt(t);
      if ("x" in r && !e && !r.uncache) return r;
      var n,
        i,
        a,
        s,
        o,
        u,
        h,
        l,
        f,
        p,
        c,
        d,
        _,
        m,
        g,
        v,
        y,
        T,
        b,
        w,
        x,
        k,
        O,
        M,
        P,
        C,
        S,
        A,
        F,
        D,
        z = t.style,
        R = r.scaleX < 0,
        E = r.xOrigin || 0,
        B = r.yOrigin || 0,
        I = "deg",
        L = ed(t, qe) || "0";
      return (
        (n = i = a = u = h = l = f = p = c = 0),
        (s = o = 1),
        (r.svg = !(!t.getCTM || !ld(t))),
        (d = Ad(t, r.svg)),
        r.svg && Bd(t, L, r.originIsAbsolute, !1 !== r.smooth, d),
        d !== Xe &&
          ((v = d[0]),
          (y = d[1]),
          (T = d[2]),
          (b = d[3]),
          (n = w = d[4]),
          (i = x = d[5]),
          6 === d.length
            ? ((s = Math.sqrt(v * v + y * y)),
              (o = Math.sqrt(b * b + T * T)),
              (u = v || y ? ze(y, v) * Fe : 0),
              (f = T || b ? ze(T, b) * Fe + u : 0),
              r.svg && ((n -= E - (E * v + B * T)), (i -= B - (E * y + B * b))))
            : ((D = d[6]),
              (A = d[7]),
              (P = d[8]),
              (C = d[9]),
              (S = d[10]),
              (F = d[11]),
              (n = d[12]),
              (i = d[13]),
              (a = d[14]),
              (h = (_ = ze(D, S)) * Fe),
              _ &&
                ((k = w * (m = Math.cos(-_)) + P * (g = Math.sin(-_))),
                (O = x * m + C * g),
                (M = D * m + S * g),
                (P = w * -g + P * m),
                (C = x * -g + C * m),
                (S = D * -g + S * m),
                (F = A * -g + F * m),
                (w = k),
                (x = O),
                (D = M)),
              (l = (_ = ze(-T, S)) * Fe),
              _ &&
                ((m = Math.cos(-_)),
                (F = b * (g = Math.sin(-_)) + F * m),
                (v = k = v * m - P * g),
                (y = O = y * m - C * g),
                (T = M = T * m - S * g)),
              (u = (_ = ze(y, v)) * Fe),
              _ &&
                ((k = v * (m = Math.cos(_)) + y * (g = Math.sin(_))),
                (O = w * m + x * g),
                (y = y * m - v * g),
                (x = x * m - w * g),
                (v = k),
                (w = O)),
              h &&
                359.9 < Math.abs(h) + Math.abs(u) &&
                ((h = u = 0), (l = 180 - l)),
              (s = aa(Math.sqrt(v * v + y * y + T * T))),
              (o = aa(Math.sqrt(x * x + D * D))),
              (_ = ze(w, x)),
              (f = 2e-4 < Math.abs(_) ? _ * Fe : 0),
              (c = F ? 1 / (F < 0 ? -F : F) : 0)),
          r.svg &&
            ((d = t.getAttribute("transform")),
            (r.forceCSS = t.setAttribute("transform", "") || !yd(ed(t, Le))),
            d && t.setAttribute("transform", d))),
        90 < Math.abs(f) &&
          Math.abs(f) < 270 &&
          (R
            ? ((s *= -1),
              (f += u <= 0 ? 180 : -180),
              (u += u <= 0 ? 180 : -180))
            : ((o *= -1), (f += f <= 0 ? 180 : -180))),
        (r.x =
          ((r.xPercent =
            n && Math.round(t.offsetWidth / 2) === Math.round(-n) ? -50 : 0)
            ? 0
            : n) + "px"),
        (r.y =
          ((r.yPercent =
            i && Math.round(t.offsetHeight / 2) === Math.round(-i) ? -50 : 0)
            ? 0
            : i) + "px"),
        (r.z = a + "px"),
        (r.scaleX = aa(s)),
        (r.scaleY = aa(o)),
        (r.rotation = aa(u) + I),
        (r.rotationX = aa(h) + I),
        (r.rotationY = aa(l) + I),
        (r.skewX = f + I),
        (r.skewY = p + I),
        (r.transformPerspective = c + "px"),
        (r.zOrigin = parseFloat(L.split(" ")[2]) || 0) && (z[qe] = Qe(L)),
        (r.xOffset = r.yOffset = 0),
        (r.force3D = U.force3D),
        (r.renderTransform = r.svg ? tr : fe ? Je : We),
        (r.uncache = 0),
        r
      );
    },
    Qe = function _firstTwoOnly(t) {
      return (t = t.split(" "))[0] + " " + t[1];
    },
    We = function _renderNon3DTransforms(t, e) {
      (e.z = "0px"),
        (e.rotationY = e.rotationX = "0deg"),
        (e.force3D = 0),
        Je(t, e);
    },
    He = "0deg",
    $e = "0px",
    Ke = ") ",
    Je = function _renderCSSTransforms(t, e) {
      var r = e || this,
        n = r.xPercent,
        i = r.yPercent,
        a = r.x,
        s = r.y,
        o = r.z,
        u = r.rotation,
        h = r.rotationY,
        l = r.rotationX,
        f = r.skewX,
        p = r.skewY,
        c = r.scaleX,
        d = r.scaleY,
        _ = r.transformPerspective,
        m = r.force3D,
        g = r.target,
        v = r.zOrigin,
        y = "",
        T = ("auto" === m && t && 1 !== t) || !0 === m;
      if (v && (l !== He || h !== He)) {
        var b,
          w = parseFloat(h) * De,
          x = Math.sin(w),
          k = Math.cos(w);
        (w = parseFloat(l) * De),
          (b = Math.cos(w)),
          (a = Ed(g, a, x * b * -v)),
          (s = Ed(g, s, -Math.sin(w) * -v)),
          (o = Ed(g, o, k * b * -v + v));
      }
      _ !== $e && (y += "perspective(" + _ + Ke),
        (n || i) && (y += "translate(" + n + "%, " + i + "%) "),
        (!T && a === $e && s === $e && o === $e) ||
          (y +=
            o !== $e || T
              ? "translate3d(" + a + ", " + s + ", " + o + ") "
              : "translate(" + a + ", " + s + Ke),
        u !== He && (y += "rotate(" + u + Ke),
        h !== He && (y += "rotateY(" + h + Ke),
        l !== He && (y += "rotateX(" + l + Ke),
        (f === He && p === He) || (y += "skew(" + f + ", " + p + Ke),
        (1 === c && 1 === d) || (y += "scale(" + c + ", " + d + Ke),
        (g.style[Le] = y || "translate(0, 0)");
    },
    tr = function _renderSVGTransforms(t, e) {
      var r,
        n,
        i,
        a,
        s,
        o = e || this,
        u = o.xPercent,
        h = o.yPercent,
        l = o.x,
        f = o.y,
        p = o.rotation,
        c = o.skewX,
        d = o.skewY,
        _ = o.scaleX,
        m = o.scaleY,
        g = o.target,
        v = o.xOrigin,
        y = o.yOrigin,
        T = o.xOffset,
        b = o.yOffset,
        w = o.forceCSS,
        x = parseFloat(l),
        k = parseFloat(f);
      (p = parseFloat(p)),
        (c = parseFloat(c)),
        (d = parseFloat(d)) && ((c += d = parseFloat(d)), (p += d)),
        p || c
          ? ((p *= De),
            (c *= De),
            (r = Math.cos(p) * _),
            (n = Math.sin(p) * _),
            (i = Math.sin(p - c) * -m),
            (a = Math.cos(p - c) * m),
            c &&
              ((d *= De),
              (s = Math.tan(c - d)),
              (i *= s = Math.sqrt(1 + s * s)),
              (a *= s),
              d &&
                ((s = Math.tan(d)), (r *= s = Math.sqrt(1 + s * s)), (n *= s))),
            (r = aa(r)),
            (n = aa(n)),
            (i = aa(i)),
            (a = aa(a)))
          : ((r = _), (a = m), (n = i = 0)),
        ((x && !~(l + "").indexOf("px")) || (k && !~(f + "").indexOf("px"))) &&
          ((x = pd(g, "x", l, "px")), (k = pd(g, "y", f, "px"))),
        (v || y || T || b) &&
          ((x = aa(x + v - (v * r + y * i) + T)),
          (k = aa(k + y - (v * n + y * a) + b))),
        (u || h) &&
          ((s = g.getBBox()),
          (x = aa(x + (u / 100) * s.width)),
          (k = aa(k + (h / 100) * s.height))),
        (s =
          "matrix(" +
          r +
          "," +
          n +
          "," +
          i +
          "," +
          a +
          "," +
          x +
          "," +
          k +
          ")"),
        g.setAttribute("transform", s),
        w && (g.style[Le] = s);
    };
  _("padding,margin,Width,Radius", function (e, r) {
    var t = "Right",
      n = "Bottom",
      i = "Left",
      o = (r < 3 ? ["Top", t, n, i] : ["Top" + i, "Top" + t, n + t, n + i]).map(
        function (t) {
          return r < 2 ? e + t : "border" + t + e;
        }
      );
    je[1 < r ? "border" + e : e] = function (e, t, r, n, i) {
      var a, s;
      if (arguments.length < 4)
        return (
          (a = o.map(function (t) {
            return qd(e, t, r);
          })),
          5 === (s = a.join(" ")).split(a[0]).length ? a[0] : s
        );
      (a = (n + "").split(" ")),
        (s = {}),
        o.forEach(function (t, e) {
          return (s[t] = a[e] = a[e] || a[((e - 1) / 2) | 0]);
        }),
        e.init(t, s, i);
    };
  });
  var er,
    rr,
    nr,
    ir = {
      name: "css",
      register: hd,
      targetTest: function targetTest(t) {
        return t.style && t.nodeType;
      },
      init: function init(t, e, r, n, i) {
        var a,
          s,
          o,
          u,
          h,
          l,
          f,
          p,
          c,
          d,
          _,
          m,
          g,
          v,
          y,
          T = this._props,
          b = t.style;
        for (f in (oe || hd(), e))
          if (
            "autoRound" !== f &&
            ((s = e[f]), !ht[f] || !Ib(f, e, r, n, t, i))
          )
            if (
              ((h = typeof s),
              (l = je[f]),
              "function" === h && (h = typeof (s = s.call(r, n, t, i))),
              "string" === h && ~s.indexOf("random(") && (s = Za(s)),
              l)
            )
              l(this, t, f, s, r) && (y = 1);
            else if ("--" === f.substr(0, 2))
              this.add(
                b,
                "setProperty",
                getComputedStyle(t).getPropertyValue(f) + "",
                s + "",
                n,
                i,
                0,
                0,
                f
              );
            else {
              if (
                ((a = qd(t, f)),
                (u = parseFloat(a)),
                (d =
                  "string" === h && "=" === s.charAt(1)
                    ? +(s.charAt(0) + "1")
                    : 0) && (s = s.substr(2)),
                (o = parseFloat(s)),
                f in Ie &&
                  ("autoAlpha" === f &&
                    (1 === u &&
                      "hidden" === qd(t, "visibility") &&
                      o &&
                      (u = 0),
                    nd(
                      this,
                      b,
                      "visibility",
                      u ? "inherit" : "hidden",
                      o ? "inherit" : "hidden",
                      !o
                    )),
                  "scale" !== f &&
                    "transform" !== f &&
                    ~(f = Ie[f]).indexOf(",") &&
                    (f = f.split(",")[0])),
                (_ = f in Ae))
              )
                if (
                  (m ||
                    ((g = t._gsap).renderTransform || Ge(t),
                    (v = !1 !== e.smoothOrigin && g.smooth),
                    ((m = this._pt = new ee(
                      this._pt,
                      b,
                      Le,
                      0,
                      1,
                      g.renderTransform,
                      g,
                      0,
                      -1
                    )).dep = 1)),
                  "scale" === f)
                )
                  (this._pt = new ee(
                    this._pt,
                    g,
                    "scaleY",
                    g.scaleY,
                    d ? d * o : o - g.scaleY
                  )),
                    T.push("scaleY", f),
                    (f += "X");
                else {
                  if ("transformOrigin" === f) {
                    (s = td(s)),
                      g.svg
                        ? Bd(t, s, 0, v, 0, this)
                        : ((c = parseFloat(s.split(" ")[2])) !== g.zOrigin &&
                            nd(this, g, "zOrigin", g.zOrigin, c),
                          nd(this, b, f, Qe(a), Qe(s)));
                    continue;
                  }
                  if ("svgOrigin" === f) {
                    Bd(t, s, 1, v, 0, this);
                    continue;
                  }
                  if (f in Ze) {
                    Ld(this, g, f, u, s, d);
                    continue;
                  }
                  if ("smoothOrigin" === f) {
                    nd(this, g, "smooth", g.smooth, s);
                    continue;
                  }
                  if ("force3D" === f) {
                    g[f] = s;
                    continue;
                  }
                  if ("transform" === f) {
                    Md(this, s, t);
                    continue;
                  }
                }
              else f in b || (f = Ne(f) || f);
              if (
                _ ||
                ((o || 0 === o) && (u || 0 === u) && !Be.test(s) && f in b)
              )
                (p = (a + "").substr((u + "").length)) !==
                  (c =
                    (s + "").substr((o + "").length) ||
                    (f in U.units ? U.units[f] : p)) && (u = pd(t, f, a, c)),
                  (this._pt = new ee(
                    this._pt,
                    _ ? g : b,
                    f,
                    u,
                    d ? d * o : o - u,
                    "px" !== c || !1 === e.autoRound || _ ? Qc : Tc
                  )),
                  (this._pt.u = c || 0),
                  p !== c && ((this._pt.b = a), (this._pt.r = Sc));
              else if (f in b) rd.call(this, t, f, a, s);
              else {
                if (!(f in t)) {
                  L(f, s);
                  continue;
                }
                this.add(t, f, t[f], s, n, i);
              }
              T.push(f);
            }
        y && te(this);
      },
      get: qd,
      aliases: Ie,
      getSetter: function getSetter(t, e, r) {
        var n = Ie[e];
        return (
          n && n.indexOf(",") < 0 && (e = n),
          e in Ae && e !== qe && (t._gsap.x || qd(t, "x"))
            ? r && le === r
              ? "scale" === e
                ? Zc
                : Yc
              : (le = r || {}) && ("scale" === e ? $c : _c)
            : t.style && !q(t.style[e])
            ? Wc
            : ~e.indexOf("-")
            ? Xc
            : Gt(t, e)
        );
      },
    };
  (ne.utils.checkPrefix = Ne),
    (nr = _(
      (er = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") +
        "," +
        (rr = "rotation,rotationX,rotationY,skewX,skewY") +
        ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
      function (t) {
        Ae[t] = 1;
      }
    )),
    _(rr, function (t) {
      (U.units[t] = "deg"), (Ze[t] = 1);
    }),
    (Ie[nr[13]] = er + "," + rr),
    _(
      "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
      function (t) {
        var e = t.split(":");
        Ie[e[1]] = nr[e[0]];
      }
    ),
    _(
      "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
      function (t) {
        U.units[t] = "px";
      }
    ),
    ne.registerPlugin(ir);
  var ar = ne.registerPlugin(ir) || ne,
    sr = ar.core.Tween;
  (e.Back = ke),
    (e.Bounce = Me),
    (e.CSSPlugin = ir),
    (e.Circ = Se),
    (e.Cubic = ye),
    (e.Elastic = xe),
    (e.Expo = Ce),
    (e.Linear = ge),
    (e.Power0 = pe),
    (e.Power1 = ce),
    (e.Power2 = de),
    (e.Power3 = _e),
    (e.Power4 = me),
    (e.Quad = ve),
    (e.Quart = Te),
    (e.Quint = be),
    (e.Sine = Pe),
    (e.SteppedEase = Oe),
    (e.Strong = we),
    (e.TimelineLite = Bt),
    (e.TimelineMax = Bt),
    (e.TweenLite = Vt),
    (e.TweenMax = sr),
    (e.default = ar),
    (e.gsap = ar);
  if (typeof window === "undefined" || window !== e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
  } else {
    delete e.default;
  }
});
/*!CustomBounce 3.2.0*/ !(function (e, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? n(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], n)
    : n(((e = e || self).window = e.window || {}));
})(this, function (e) {
  "use strict";
  function g() {
    return (
      n ||
      ("undefined" != typeof window &&
        (n = window.gsap) &&
        n.registerPlugin &&
        n)
    );
  }
  function h(e) {
    (n = g()),
      (j = n && n.parseEase("_CE"))
        ? ((b = 1),
          (n.parseEase("bounce").config = function (e) {
            return "object" == typeof e
              ? t("", e)
              : t("bounce(" + e + ")", { strength: +e });
          }))
        : e &&
          console.warn("Please gsap.registerPlugin(CustomEase, CustomBounce)");
  }
  function i(e) {
    var n,
      t = e.length,
      o = 1 / e[t - 2];
    for (n = 2; n < t; n += 2) e[n] = ~~(e[n] * o * 1e3) / 1e3;
    e[t - 2] = 1;
  }
  var n,
    b,
    j,
    t = function _create(e, n) {
      b || h(1), (n = n || {});
      var t,
        o,
        u,
        s,
        r,
        f,
        c,
        a = Math.min(0.999, n.strength || 0.7),
        g = a,
        d = (n.squash || 0) / 100,
        p = d,
        l = 1 / 0.03,
        m = 0.2,
        C = 1,
        w = 0.1,
        y = [0, 0, 0.07, 0, 0.1, 1, 0.1, 1],
        B = [0, 0, 0, 0, 0.1, 0, 0.1, 0];
      for (
        r = 0;
        r < 200 &&
        ((f = w + (m *= g * ((g + 1) / 2))),
        (s = 1 - (C *= a * a)),
        (o = (u = w + 0.49 * m) + 0.8 * (u - (t = w + C / l))),
        d &&
          ((w += d),
          (t += d),
          (u += d),
          (o += d),
          (f += d),
          (c = d / p),
          B.push(
            w - d,
            0,
            w - d,
            c,
            w - d / 2,
            c,
            w,
            c,
            w,
            0,
            w,
            0,
            w,
            -0.6 * c,
            w + (f - w) / 6,
            0,
            f,
            0
          ),
          y.push(w - d, 1, w, 1, w, 1),
          (d *= a * a)),
        y.push(w, 1, t, s, u, s, o, s, f, 1, f, 1),
        (a *= 0.95),
        (l = C / (f - o)),
        (w = f),
        !(0.999 < s));
        r++
      );
      if (n.endAtStart && "false" !== n.endAtStart) {
        if (((u = -0.1), y.unshift(u, 1, u, 1, -0.07, 0), p))
          for (
            u -= d = 2.5 * p,
              y.unshift(u, 1, u, 1, u, 1),
              B.splice(0, 6),
              B.unshift(
                u,
                0,
                u,
                0,
                u,
                1,
                u + d / 2,
                1,
                u + d,
                1,
                u + d,
                0,
                u + d,
                0,
                u + d,
                -0.6,
                u + d + 0.033,
                0
              ),
              r = 0;
            r < B.length;
            r += 2
          )
            B[r] -= u;
        for (r = 0; r < y.length; r += 2)
          (y[r] -= u), (y[r + 1] = 1 - y[r + 1]);
      }
      return (
        d &&
          (i(B),
          (B[2] = "C" + B[2]),
          j(n.squashID || e + "-squash", "M" + B.join(","))),
        i(y),
        (y[2] = "C" + y[2]),
        j(e, "M" + y.join(","))
      );
    },
    o =
      ((CustomBounce.create = function create(e, n) {
        return t(e, n);
      }),
      (CustomBounce.register = function register(e) {
        (n = e), h();
      }),
      CustomBounce);
  function CustomBounce(e, n) {
    this.ease = t(e, n);
  }
  g() && n.registerPlugin(o),
    (o.version = "3.2.0"),
    (e.CustomBounce = o),
    (e.default = o);
  if (typeof window === "undefined" || window !== e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
  } else {
    delete e.default;
  }
});
/*!CustomEase 3.2.0*/ !(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(((e = e || self).window = e.window || {}));
})(this, function (e) {
  "use strict";
  function m(e) {
    return ~~(1e5 * e + (e < 0 ? -0.5 : 0.5)) / 1e5;
  }
  var b = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
    w = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
    Y = Math.PI / 180,
    k = Math.sin,
    B = Math.cos,
    F = Math.abs,
    J = Math.sqrt;
  function arcToSegment(e, t, n, s, a, r, i, o, h) {
    if (e !== o || t !== h) {
      (n = F(n)), (s = F(s));
      var u = (a % 360) * Y,
        f = B(u),
        c = k(u),
        l = Math.PI,
        g = 2 * l,
        m = (e - o) / 2,
        x = (t - h) / 2,
        d = f * m + c * x,
        p = -c * m + f * x,
        y = d * d,
        M = p * p,
        v = y / (n * n) + M / (s * s);
      1 < v && ((n = J(v) * n), (s = J(v) * s));
      var C = n * n,
        E = s * s,
        b = (C * E - C * M - E * y) / (C * M + E * y);
      b < 0 && (b = 0);
      var w = (r === i ? -1 : 1) * J(b),
        P = ((n * p) / s) * w,
        S = ((-s * d) / n) * w,
        N = f * P - c * S + (e + o) / 2,
        D = c * P + f * S + (t + h) / 2,
        T = (d - P) / n,
        V = (p - S) / s,
        _ = (-d - P) / n,
        q = (-p - S) / s,
        A = T * T + V * V,
        R = (V < 0 ? -1 : 1) * Math.acos(T / J(A)),
        G =
          (T * q - V * _ < 0 ? -1 : 1) *
          Math.acos((T * _ + V * q) / J(A * (_ * _ + q * q)));
      isNaN(G) && (G = l),
        !i && 0 < G ? (G -= g) : i && G < 0 && (G += g),
        (R %= g),
        (G %= g);
      var L,
        O = Math.ceil(F(G) / (g / 4)),
        j = [],
        z = G / O,
        I = ((4 / 3) * k(z / 2)) / (1 + B(z / 2)),
        H = f * n,
        Q = c * n,
        Z = c * -s,
        U = f * s;
      for (L = 0; L < O; L++)
        (d = B((a = R + L * z))),
          (p = k(a)),
          (T = B((a += z))),
          (V = k(a)),
          j.push(d - I * p, p + I * d, T + I * V, V - I * T, T, V);
      for (L = 0; L < j.length; L += 2)
        (d = j[L]),
          (p = j[L + 1]),
          (j[L] = d * H + p * Z + N),
          (j[L + 1] = d * Q + p * U + D);
      return (j[L - 2] = o), (j[L - 1] = h), j;
    }
  }
  function stringToRawPath(e) {
    function db(e, t, n, s) {
      (f = (n - e) / 3),
        (c = (s - t) / 3),
        o.push(e + f, t + c, n - f, s - c, n, s);
    }
    var t,
      n,
      s,
      a,
      r,
      i,
      o,
      h,
      u,
      f,
      c,
      l,
      g,
      m,
      x,
      d =
        (e + "")
          .replace(w, function (e) {
            var t = +e;
            return t < 1e-4 && -1e-4 < t ? 0 : t;
          })
          .match(b) || [],
      p = [],
      y = 0,
      M = 0,
      v = d.length,
      C = 0,
      E = "ERROR: malformed path: " + e;
    if (!e || !isNaN(d[0]) || isNaN(d[1])) return console.log(E), p;
    for (t = 0; t < v; t++)
      if (
        ((g = r),
        isNaN(d[t]) ? (i = (r = d[t].toUpperCase()) !== d[t]) : t--,
        (s = +d[t + 1]),
        (a = +d[t + 2]),
        i && ((s += y), (a += M)),
        t || ((h = s), (u = a)),
        "M" === r)
      )
        o && (o.length < 8 ? --p.length : (C += o.length)),
          (y = h = s),
          (M = u = a),
          (o = [s, a]),
          p.push(o),
          (t += 2),
          (r = "L");
      else if ("C" === r)
        i || (y = M = 0),
          (o = o || [0, 0]).push(
            s,
            a,
            y + 1 * d[t + 3],
            M + 1 * d[t + 4],
            (y += 1 * d[t + 5]),
            (M += 1 * d[t + 6])
          ),
          (t += 6);
      else if ("S" === r)
        (f = y),
          (c = M),
          ("C" !== g && "S" !== g) ||
            ((f += y - o[o.length - 4]), (c += M - o[o.length - 3])),
          i || (y = M = 0),
          o.push(f, c, s, a, (y += 1 * d[t + 3]), (M += 1 * d[t + 4])),
          (t += 4);
      else if ("Q" === r)
        (f = y + (2 / 3) * (s - y)),
          (c = M + (2 / 3) * (a - M)),
          i || (y = M = 0),
          (y += 1 * d[t + 3]),
          (M += 1 * d[t + 4]),
          o.push(f, c, y + (2 / 3) * (s - y), M + (2 / 3) * (a - M), y, M),
          (t += 4);
      else if ("T" === r)
        (f = y - o[o.length - 4]),
          (c = M - o[o.length - 3]),
          o.push(
            y + f,
            M + c,
            s + (2 / 3) * (y + 1.5 * f - s),
            a + (2 / 3) * (M + 1.5 * c - a),
            (y = s),
            (M = a)
          ),
          (t += 2);
      else if ("H" === r) db(y, M, (y = s), M), (t += 1);
      else if ("V" === r) db(y, M, y, (M = s + (i ? M - y : 0))), (t += 1);
      else if ("L" === r || "Z" === r)
        "Z" === r && ((s = h), (a = u), (o.closed = !0)),
          ("L" === r || 0.5 < F(y - s) || 0.5 < F(M - a)) &&
            (db(y, M, s, a), "L" === r && (t += 2)),
          (y = s),
          (M = a);
      else if ("A" === r) {
        if (
          ((m = d[t + 4]),
          (x = d[t + 5]),
          (f = d[t + 6]),
          (c = d[t + 7]),
          (n = 7),
          1 < m.length &&
            (m.length < 3
              ? ((c = f), (f = x), n--)
              : ((c = x), (f = m.substr(2)), (n -= 2)),
            (x = m.charAt(1)),
            (m = m.charAt(0))),
          (l = arcToSegment(
            y,
            M,
            +d[t + 1],
            +d[t + 2],
            +d[t + 3],
            +m,
            +x,
            (i ? y : 0) + 1 * f,
            (i ? M : 0) + 1 * c
          )),
          (t += n),
          l)
        )
          for (n = 0; n < l.length; n++) o.push(l[n]);
        (y = o[o.length - 2]), (M = o[o.length - 1]);
      } else console.log(E);
    return (
      (t = o.length) < 6
        ? (p.pop(), (t = 0))
        : o[0] === o[t - 2] && o[1] === o[t - 1] && (o.closed = !0),
      (p.totalPoints = C + t),
      p
    );
  }
  function p() {
    return (
      M ||
      ("undefined" != typeof window &&
        (M = window.gsap) &&
        M.registerPlugin &&
        M)
    );
  }
  function q() {
    (M = p())
      ? (M.registerEase("_CE", n.create), (a = 1))
      : console.warn("Please gsap.registerPlugin(CustomEase)");
  }
  function s(e) {
    return ~~(1e3 * e + (e < 0 ? -0.5 : 0.5)) / 1e3;
  }
  function x(e, t, n, s, a, r, i, o, h, u, f) {
    var c,
      l = (e + n) / 2,
      g = (t + s) / 2,
      m = (n + a) / 2,
      d = (s + r) / 2,
      p = (a + i) / 2,
      y = (r + o) / 2,
      M = (l + m) / 2,
      v = (g + d) / 2,
      C = (m + p) / 2,
      E = (d + y) / 2,
      b = (M + C) / 2,
      w = (v + E) / 2,
      P = i - e,
      S = o - t,
      N = Math.abs((n - i) * S - (s - o) * P),
      D = Math.abs((a - i) * S - (r - o) * P);
    return (
      u ||
        ((u = [
          { x: e, y: t },
          { x: i, y: o },
        ]),
        (f = 1)),
      u.splice(f || u.length - 1, 0, { x: b, y: w }),
      h * (P * P + S * S) < (N + D) * (N + D) &&
        ((c = u.length),
        x(e, t, l, g, M, v, b, w, h, u, f),
        x(b, w, C, E, p, y, i, o, h, u, f + 1 + (u.length - c))),
      u
    );
  }
  var M,
    a,
    t,
    y = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
    v = /[cLlsSaAhHvVtTqQ]/g,
    n =
      (((t = CustomEase.prototype).setData = function setData(e, t) {
        t = t || {};
        var n,
          s,
          a,
          r,
          i,
          o,
          h,
          u,
          f,
          c = (e = e || "0,0,1,1").match(y),
          l = 1,
          g = [],
          m = [],
          d = t.precision || 1,
          p = d <= 1;
        if (
          ((this.data = e),
          (v.test(e) || (~e.indexOf("M") && e.indexOf("C") < 0)) &&
            (c = stringToRawPath(e)[0]),
          4 === (n = c.length))
        )
          c.unshift(0, 0), c.push(1, 1), (n = 8);
        else if ((n - 2) % 6) throw "Invalid CustomEase";
        for (
          (0 == +c[0] && 1 == +c[n - 2]) ||
            (function _normalize(e, t, n) {
              n || 0 === n || (n = Math.max(+e[e.length - 1], +e[1]));
              var s,
                a = -1 * e[0],
                r = -n,
                i = e.length,
                o = 1 / (+e[i - 2] + a),
                h =
                  -t ||
                  (Math.abs(e[i - 1] - e[1]) < 0.01 * (e[i - 2] - e[0])
                    ? (function _findMinimum(e) {
                        var t,
                          n = e.length,
                          s = 1e20;
                        for (t = 1; t < n; t += 6) +e[t] < s && (s = +e[t]);
                        return s;
                      })(e) + r
                    : +e[i - 1] + r);
              for (h = h ? 1 / h : -o, s = 0; s < i; s += 2)
                (e[s] = (+e[s] + a) * o), (e[s + 1] = (+e[s + 1] + r) * h);
            })(c, t.height, t.originY),
            this.segment = c,
            r = 2;
          r < n;
          r += 6
        )
          (s = { x: +c[r - 2], y: +c[r - 1] }),
            (a = { x: +c[r + 4], y: +c[r + 5] }),
            g.push(s, a),
            x(
              s.x,
              s.y,
              +c[r],
              +c[r + 1],
              +c[r + 2],
              +c[r + 3],
              a.x,
              a.y,
              1 / (2e5 * d),
              g,
              g.length - 1
            );
        for (n = g.length, r = 0; r < n; r++)
          (h = g[r]),
            (u = g[r - 1] || h),
            h.x > u.x || (u.y !== h.y && u.x === h.x) || h === u
              ? ((u.cx = h.x - u.x),
                (u.cy = h.y - u.y),
                (u.n = h),
                (u.nx = h.x),
                p &&
                  1 < r &&
                  2 < Math.abs(u.cy / u.cx - g[r - 2].cy / g[r - 2].cx) &&
                  (p = 0),
                u.cx < l &&
                  (u.cx
                    ? (l = u.cx)
                    : ((u.cx = 0.001),
                      r === n - 1 &&
                        ((u.x -= 0.001), (l = Math.min(l, 0.001)), (p = 0)))))
              : (g.splice(r--, 1), n--);
        if (((i = 1 / (n = (1 / l + 1) | 0)), (h = g[(o = 0)]), p)) {
          for (r = 0; r < n; r++)
            (f = r * i),
              h.nx < f && (h = g[++o]),
              (s = h.y + ((f - h.x) / h.cx) * h.cy),
              (m[r] = { x: f, cx: i, y: s, cy: 0, nx: 9 }),
              r && (m[r - 1].cy = s - m[r - 1].y);
          m[n - 1].cy = g[g.length - 1].y - s;
        } else {
          for (r = 0; r < n; r++) h.nx < r * i && (h = g[++o]), (m[r] = h);
          o < g.length - 1 && (m[r - 1] = g[g.length - 2]);
        }
        return (
          (this.ease = function (e) {
            var t = m[(e * n) | 0] || m[n - 1];
            return t.nx < e && (t = t.n), t.y + ((e - t.x) / t.cx) * t.cy;
          }),
          (this.ease.custom = this).id && M.registerEase(this.id, this.ease),
          this
        );
      }),
      (t.getSVGData = function getSVGData(e) {
        return CustomEase.getSVGData(this, e);
      }),
      (CustomEase.create = function create(e, t, n) {
        return new CustomEase(e, t, n).ease;
      }),
      (CustomEase.register = function register(e) {
        (M = e), q();
      }),
      (CustomEase.get = function get(e) {
        return M.parseEase(e);
      }),
      (CustomEase.getSVGData = function getSVGData(e, t) {
        var n,
          a,
          r,
          i,
          o,
          h,
          u,
          f,
          c,
          l,
          g = (t = t || {}).width || 100,
          x = t.height || 100,
          d = t.x || 0,
          p = (t.y || 0) + x,
          y = M.utils.toArray(t.path)[0];
        if (
          (t.invert && ((x = -x), (p = 0)),
          "string" == typeof e && (e = M.parseEase(e)),
          e.custom && (e = e.custom),
          e instanceof CustomEase)
        )
          n = (function rawPathToString(e) {
            !(function _isNumber(e) {
              return "number" == typeof e;
            })(e[0]) || (e = [e]);
            var t,
              n,
              s,
              a,
              r = "",
              i = e.length;
            for (n = 0; n < i; n++) {
              for (
                a = e[n],
                  r += "M" + m(a[0]) + "," + m(a[1]) + " C",
                  t = a.length,
                  s = 2;
                s < t;
                s++
              )
                r +=
                  m(a[s++]) +
                  "," +
                  m(a[s++]) +
                  " " +
                  m(a[s++]) +
                  "," +
                  m(a[s++]) +
                  " " +
                  m(a[s++]) +
                  "," +
                  m(a[s]) +
                  " ";
              a.closed && (r += "z");
            }
            return r;
          })(
            (function transformRawPath(e, t, n, s, a, r, i) {
              for (var o, h, u, f, c, l = e.length; -1 < --l; )
                for (h = (o = e[l]).length, u = 0; u < h; u += 2)
                  (f = o[u]),
                    (c = o[u + 1]),
                    (o[u] = f * t + c * s + r),
                    (o[u + 1] = f * n + c * a + i);
              return (e._dirty = 1), e;
            })([e.segment], g, 0, 0, -x, d, p)
          );
        else {
          for (
            n = [d, p],
              i = 1 / (u = Math.max(5, 200 * (t.precision || 1))),
              f = 5 / (u += 2),
              c = s(d + i * g),
              a = ((l = s(p + e(i) * -x)) - p) / (c - d),
              r = 2;
            r < u;
            r++
          )
            (o = s(d + r * i * g)),
              (h = s(p + e(r * i) * -x)),
              (Math.abs((h - l) / (o - c) - a) > f || r === u - 1) &&
                (n.push(c, l), (a = (h - l) / (o - c))),
              (c = o),
              (l = h);
          n = "M" + n.join(",");
        }
        return y && y.setAttribute("d", n), n;
      }),
      CustomEase);
  function CustomEase(e, t, n) {
    a || q(), (this.id = e), this.setData(t, n);
  }
  p() && M.registerPlugin(n),
    (n.version = "3.2.0"),
    (e.CustomEase = n),
    (e.default = n);
  if (typeof window === "undefined" || window !== e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
  } else {
    delete e.default;
  }
});
/*!CustomWiggle 3.2.0*/ !(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(((e = e || self).window = e.window || {}));
})(this, function (e) {
  "use strict";
  function g() {
    return (
      n ||
      ("undefined" != typeof window &&
        (n = window.gsap) &&
        n.registerPlugin &&
        n)
    );
  }
  function i(e) {
    return e;
  }
  function j(e) {
    if (!C)
      if (((n = g()), (M = n && n.parseEase("_CE")))) {
        for (var t in y) y[t] = M("", y[t]);
        (C = 1),
          (o("wiggle").config = function (e) {
            return "object" == typeof e
              ? o("", e)
              : o("wiggle(" + e + ")", { wiggles: +e });
          });
      } else
        e &&
          console.warn("Please gsap.registerPlugin(CustomEase, CustomWiggle)");
  }
  function k(t, e) {
    return (
      "function" != typeof t && (t = n.parseEase(t) || M("", t)),
      t.custom || !e
        ? t
        : function (e) {
            return 1 - t(e);
          }
    );
  }
  var n,
    C,
    M,
    y = {
      easeOut: "M0,1,C0.7,1,0.6,0,1,0",
      easeInOut: "M0,0,C0.1,0,0.24,1,0.444,1,0.644,1,0.6,0,1,0",
      anticipate:
        "M0,0,C0,0.222,0.024,0.386,0,0.4,0.18,0.455,0.65,0.646,0.7,0.67,0.9,0.76,1,0.846,1,1",
      uniform: "M0,0,C0,0.95,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0",
    },
    o = function _create(e, t) {
      C || j(1);
      var n,
        o,
        s,
        u,
        r,
        a,
        g,
        f,
        l,
        c = 0 | ((t = t || {}).wiggles || 10),
        p = 1 / c,
        d = p / 2,
        m = "anticipate" === t.type,
        h = y[t.type] || y.easeOut,
        w = i;
      if (
        (m && ((w = h), (h = y.easeOut)),
        t.timingEase && (w = k(t.timingEase)),
        t.amplitudeEase && (h = k(t.amplitudeEase, !0)),
        (f = [0, 0, (a = w(d)) / 4, 0, a / 2, (g = m ? -h(d) : h(d)), a, g]),
        "random" === t.type)
      ) {
        for (
          f.length = 4, n = w(p), o = 2 * Math.random() - 1, l = 2;
          l < c;
          l++
        )
          (d = n),
            (g = o),
            (n = w(p * l)),
            (o = 2 * Math.random() - 1),
            (s = Math.atan2(o - f[f.length - 3], n - f[f.length - 4])),
            (u = Math.cos(s) * p),
            (r = Math.sin(s) * p),
            f.push(d - u, g - r, d, g, d + u, g + r);
        f.push(n, 0, 1, 0);
      } else {
        for (l = 1; l < c; l++)
          f.push(w(d + p / 2), g),
            (d += p),
            (g = (0 < g ? -1 : 1) * h(l * p)),
            (a = w(d)),
            f.push(w(d - p / 2), g, a, g);
        f.push(w(d + p / 4), g, w(d + p / 4), 0, 1, 0);
      }
      for (l = f.length; -1 < --l; ) f[l] = ~~(1e3 * f[l]) / 1e3;
      return (f[2] = "C" + f[2]), M(e, "M" + f.join(","));
    },
    t =
      ((CustomWiggle.create = function create(e, t) {
        return o(e, t);
      }),
      (CustomWiggle.register = function register(e) {
        (n = e), j();
      }),
      CustomWiggle);
  function CustomWiggle(e, t) {
    this.ease = o(e, t);
  }
  g() && n.registerPlugin(t),
    (t.version = "3.2.0"),
    (e.CustomWiggle = t),
    (e.default = t);
  if (typeof window === "undefined" || window !== e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
  } else {
    delete e.default;
  }
});
/*!DrawSVGPlugin 3.2.0*/ !(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(((e = e || self).window = e.window || {}));
})(this, function (e) {
  "use strict";
  function i() {
    return "undefined" != typeof window;
  }
  function j() {
    return t || (i() && (t = window.gsap) && t.registerPlugin && t);
  }
  function m(e) {
    return Math.round(1e4 * e) / 1e4;
  }
  function n(e) {
    return parseFloat(e || 0);
  }
  function o(e, t) {
    return n(e.getAttribute(t));
  }
  function q(e, t, s, r, i, o) {
    return P(Math.pow((n(s) - n(e)) * i, 2) + Math.pow((n(r) - n(t)) * o, 2));
  }
  function r(e) {
    return console.warn(e);
  }
  function s(e) {
    return "non-scaling-stroke" === e.getAttribute("vector-effect");
  }
  function v(e) {
    if (!(e = k(e)[0])) return 0;
    var t,
      n,
      i,
      a,
      f,
      h,
      d,
      l = e.tagName.toLowerCase(),
      u = e.style,
      c = 1,
      g = 1;
    s(e) &&
      ((g = e.getScreenCTM()),
      (c = P(g.a * g.a + g.b * g.b)),
      (g = P(g.d * g.d + g.c * g.c)));
    try {
      n = e.getBBox();
    } catch (e) {
      r(
        "Some browsers won't measure invisible elements (like display:none or masks inside defs)."
      );
    }
    var _ = n || { x: 0, y: 0, width: 0, height: 0 },
      p = _.x,
      x = _.y,
      y = _.width,
      m = _.height;
    if (
      ((n && (y || m)) ||
        !M[l] ||
        ((y = o(e, M[l][0])),
        (m = o(e, M[l][1])),
        "rect" !== l && "line" !== l && ((y *= 2), (m *= 2)),
        "line" === l &&
          ((p = o(e, "x1")),
          (x = o(e, "y1")),
          (y = Math.abs(y - p)),
          (m = Math.abs(m - x)))),
      "path" === l)
    )
      (a = u.strokeDasharray),
        (u.strokeDasharray = "none"),
        (t = e.getTotalLength() || 0),
        c !== g &&
          r(
            "Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."
          ),
        (t *= (c + g) / 2),
        (u.strokeDasharray = a);
    else if ("rect" === l) t = 2 * y * c + 2 * m * g;
    else if ("line" === l) t = q(p, x, p + y, x + m, c, g);
    else if ("polyline" === l || "polygon" === l)
      for (
        i = e.getAttribute("points").match(b) || [],
          "polygon" === l && i.push(i[0], i[1]),
          t = 0,
          f = 2;
        f < i.length;
        f += 2
      )
        t += q(i[f - 2], i[f - 1], i[f], i[f + 1], c, g) || 0;
    else
      ("circle" !== l && "ellipse" !== l) ||
        ((h = (y / 2) * c),
        (d = (m / 2) * g),
        (t = Math.PI * (3 * (h + d) - P((3 * h + d) * (h + 3 * d)))));
    return t || 0;
  }
  function w(e, t) {
    if (!(e = k(e)[0])) return [0, 0];
    t = t || v(e) + 1;
    var s = h.getComputedStyle(e),
      r = s.strokeDasharray || "",
      i = n(s.strokeDashoffset),
      o = r.indexOf(",");
    return (
      o < 0 && (o = r.indexOf(" ")),
      t < (r = o < 0 ? t : n(r.substr(0, o)) || 1e-5) && (r = t),
      [Math.max(0, -i), Math.max(0, r - i)]
    );
  }
  function x() {
    i() &&
      ((h = window),
      (l = t = j()),
      (k = t.utils.toArray),
      (d = -1 !== ((h.navigator || {}).userAgent || "").indexOf("Edge")));
  }
  var t,
    k,
    h,
    d,
    l,
    b = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
    M = {
      rect: ["width", "height"],
      circle: ["r", "r"],
      ellipse: ["rx", "ry"],
      line: ["x2", "y2"],
    },
    P = Math.sqrt,
    a = {
      version: "3.2.0",
      name: "drawSVG",
      register: function register(e) {
        (t = e), x();
      },
      init: function init(e, t) {
        if (!e.getBBox) return !1;
        l || x();
        var r,
          i,
          o,
          a,
          f = v(e) + 1;
        return (
          (this._style = e.style),
          (this._target = e),
          t + "" == "true"
            ? (t = "0 100%")
            : t
            ? -1 === (t + "").indexOf(" ") && (t = "0 " + t)
            : (t = "0 0"),
          (i = (function _parse(e, t, s) {
            var r,
              i,
              o = e.indexOf(" ");
            return (
              (i =
                o < 0
                  ? ((r = void 0 !== s ? s + "" : e), e)
                  : ((r = e.substr(0, o)), e.substr(o + 1))),
              (r = ~r.indexOf("%") ? (n(r) / 100) * t : n(r)),
              (i = ~i.indexOf("%") ? (n(i) / 100) * t : n(i)) < r
                ? [i, r]
                : [r, i]
            );
          })(t, f, (r = w(e, f))[0])),
          (this._length = m(f + 10)),
          0 === r[0] && 0 === i[0]
            ? ((o = Math.max(1e-5, i[1] - f)),
              (this._dash = m(f + o)),
              (this._offset = m(f - r[1] + o)),
              (this._offsetPT = this.add(
                this,
                "_offset",
                this._offset,
                m(f - i[1] + o)
              )))
            : ((this._dash = m(r[1] - r[0]) || 1e-6),
              (this._offset = m(-r[0])),
              (this._dashPT = this.add(
                this,
                "_dash",
                this._dash,
                m(i[1] - i[0]) || 1e-5
              )),
              (this._offsetPT = this.add(
                this,
                "_offset",
                this._offset,
                m(-i[0])
              ))),
          d &&
            (a = h.getComputedStyle(e)).strokeLinecap !== a.strokeLinejoin &&
            ((i = n(a.strokeMiterlimit)),
            this.add(e.style, "strokeMiterlimit", i, i + 0.01)),
          (this._live = s(e) || ~(t + "").indexOf("live")),
          this._props.push("drawSVG"),
          1
        );
      },
      render: function render(e, t) {
        var n,
          s,
          r,
          i,
          o = t._pt,
          a = t._style;
        if (o) {
          for (
            t._live &&
            (n = v(t._target) + 11) !== t._length &&
            ((s = n / t._length),
            (t._length = n),
            (t._offsetPT.s *= s),
            (t._offsetPT.c *= s),
            t._dashPT
              ? ((t._dashPT.s *= s), (t._dashPT.c *= s))
              : (t._dash *= s));
            o;

          )
            o.r(e, o.d), (o = o._next);
          (r = t._dash),
            (i = t._offset),
            (n = t._length),
            (a.strokeDashoffset = t._offset),
            1 !== e && e
              ? (a.strokeDasharray = r + "px," + n + "px")
              : (r - i < 0.001 && n - r <= 10 && (a.strokeDashoffset = i + 1),
                (a.strokeDasharray =
                  i < 0.001 && n - r <= 10
                    ? "none"
                    : i === r
                    ? "0px, 999999px"
                    : r + "px," + n + "px"));
        }
      },
      getLength: v,
      getPosition: w,
    };
  j() && t.registerPlugin(a), (e.DrawSVGPlugin = a), (e.default = a);
  if (typeof window === "undefined" || window !== e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
  } else {
    delete e.default;
  }
});
/*!SplitText 3.2.0*/ !(function (D, u) {
  "object" == typeof exports && "undefined" != typeof module
    ? u(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], u)
    : u(((D = D || self).window = D.window || {}));
})(this, function (D) {
  "use strict";
  var b = /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;
  function k(D) {
    return e.getComputedStyle(D);
  }
  function n(D, u) {
    var e;
    return i(D)
      ? D
      : "string" == (e = typeof D) && !u && D
      ? E.call(Q.querySelectorAll(D), 0)
      : D && "object" == e && "length" in D
      ? E.call(D, 0)
      : D
      ? [D]
      : [];
  }
  function o(D) {
    return "absolute" === D.position || !0 === D.absolute;
  }
  function p(D, u) {
    for (var e, F = u.length; -1 < --F; )
      if (((e = u[F]), D.substr(0, e.length) === e)) return e.length;
  }
  function r(D, u) {
    void 0 === D && (D = "");
    var e = ~D.indexOf("++"),
      F = 1;
    return (
      e && (D = D.split("++").join("")),
      function () {
        return (
          "<" +
          u +
          " style='position:relative;display:inline-block;'" +
          (D ? " class='" + D + (e ? F++ : "") + "'>" : ">")
        );
      }
    );
  }
  function s(D, u, e) {
    var F = D.nodeType;
    if (1 === F || 9 === F || 11 === F)
      for (D = D.firstChild; D; D = D.nextSibling) s(D, u, e);
    else (3 !== F && 4 !== F) || (D.nodeValue = D.nodeValue.split(u).join(e));
  }
  function t(D, u) {
    for (var e = u.length; -1 < --e; ) D.push(u[e]);
  }
  function u(D, u, e) {
    for (var F; D && D !== u; ) {
      if ((F = D._next || D.nextSibling)) return F.textContent.charAt(0) === e;
      D = D.parentNode || D._parent;
    }
  }
  function v(D) {
    var u,
      e,
      F = n(D.childNodes),
      t = F.length;
    for (u = 0; u < t; u++)
      (e = F[u])._isSplit
        ? v(e)
        : (u && 3 === e.previousSibling.nodeType
            ? (e.previousSibling.nodeValue +=
                3 === e.nodeType ? e.nodeValue : e.firstChild.nodeValue)
            : 3 !== e.nodeType && D.insertBefore(e.firstChild, e),
          D.removeChild(e));
  }
  function w(D, u) {
    return parseFloat(u[D]) || 0;
  }
  function x(D, e, F, C, i, n, E) {
    var r,
      l,
      a,
      p,
      d,
      h,
      B,
      f,
      A,
      c,
      g,
      x,
      y = k(D),
      b = w("paddingLeft", y),
      _ = -999,
      S = w("borderBottomWidth", y) + w("borderTopWidth", y),
      T = w("borderLeftWidth", y) + w("borderRightWidth", y),
      N = w("paddingTop", y) + w("paddingBottom", y),
      m = w("paddingLeft", y) + w("paddingRight", y),
      L = 0.2 * w("fontSize", y),
      W = y.textAlign,
      H = [],
      O = [],
      V = [],
      j = e.wordDelimiter || " ",
      M = e.tag ? e.tag : e.span ? "span" : "div",
      R = e.type || e.split || "chars,words,lines",
      z = i && ~R.indexOf("lines") ? [] : null,
      P = ~R.indexOf("words"),
      q = ~R.indexOf("chars"),
      G = o(e),
      I = e.linesClass,
      J = ~(I || "").indexOf("++"),
      K = [];
    for (
      J && (I = I.split("++").join("")),
        a = (l = D.getElementsByTagName("*")).length,
        d = [],
        r = 0;
      r < a;
      r++
    )
      d[r] = l[r];
    if (z || G)
      for (r = 0; r < a; r++)
        ((h = (p = d[r]).parentNode === D) || G || (q && !P)) &&
          ((x = p.offsetTop),
          z &&
            h &&
            Math.abs(x - _) > L &&
            ("BR" !== p.nodeName || 0 === r) &&
            ((B = []), z.push(B), (_ = x)),
          G &&
            ((p._x = p.offsetLeft),
            (p._y = x),
            (p._w = p.offsetWidth),
            (p._h = p.offsetHeight)),
          z &&
            (((p._isSplit && h) ||
              (!q && h) ||
              (P && h) ||
              (!P &&
                p.parentNode.parentNode === D &&
                !p.parentNode._isSplit)) &&
              (B.push(p), (p._x -= b), u(p, D, j) && (p._wordEnd = !0)),
            "BR" === p.nodeName &&
              ((p.nextSibling && "BR" === p.nextSibling.nodeName) || 0 === r) &&
              z.push([])));
    for (r = 0; r < a; r++)
      (h = (p = d[r]).parentNode === D),
        "BR" !== p.nodeName
          ? (G &&
              ((A = p.style),
              P || h || ((p._x += p.parentNode._x), (p._y += p.parentNode._y)),
              (A.left = p._x + "px"),
              (A.top = p._y + "px"),
              (A.position = "absolute"),
              (A.display = "block"),
              (A.width = p._w + 1 + "px"),
              (A.height = p._h + "px")),
            !P && q
              ? p._isSplit
                ? ((p._next = p.nextSibling), p.parentNode.appendChild(p))
                : p.parentNode._isSplit
                ? ((p._parent = p.parentNode),
                  !p.previousSibling &&
                    p.firstChild &&
                    (p.firstChild._isFirst = !0),
                  p.nextSibling &&
                    " " === p.nextSibling.textContent &&
                    !p.nextSibling.nextSibling &&
                    K.push(p.nextSibling),
                  (p._next =
                    p.nextSibling && p.nextSibling._isFirst
                      ? null
                      : p.nextSibling),
                  p.parentNode.removeChild(p),
                  d.splice(r--, 1),
                  a--)
                : h ||
                  ((x = !p.nextSibling && u(p.parentNode, D, j)),
                  p.parentNode._parent && p.parentNode._parent.appendChild(p),
                  x && p.parentNode.appendChild(Q.createTextNode(" ")),
                  "span" === M && (p.style.display = "inline"),
                  H.push(p))
              : p.parentNode._isSplit && !p._isSplit && "" !== p.innerHTML
              ? O.push(p)
              : q &&
                !p._isSplit &&
                ("span" === M && (p.style.display = "inline"), H.push(p)))
          : z || G
          ? (p.parentNode && p.parentNode.removeChild(p), d.splice(r--, 1), a--)
          : P || D.appendChild(p);
    for (r = K.length; -1 < --r; ) K[r].parentNode.removeChild(K[r]);
    if (z) {
      for (
        G &&
          ((c = Q.createElement(M)),
          D.appendChild(c),
          (g = c.offsetWidth + "px"),
          (x = c.offsetParent === D ? 0 : D.offsetLeft),
          D.removeChild(c)),
          A = D.style.cssText,
          D.style.cssText = "display:none;";
        D.firstChild;

      )
        D.removeChild(D.firstChild);
      for (f = " " === j && (!G || (!P && !q)), r = 0; r < z.length; r++) {
        for (
          B = z[r],
            (c = Q.createElement(M)).style.cssText =
              "display:block;text-align:" +
              W +
              ";position:" +
              (G ? "absolute;" : "relative;"),
            I && (c.className = I + (J ? r + 1 : "")),
            V.push(c),
            a = B.length,
            l = 0;
          l < a;
          l++
        )
          "BR" !== B[l].nodeName &&
            ((p = B[l]),
            c.appendChild(p),
            f && p._wordEnd && c.appendChild(Q.createTextNode(" ")),
            G &&
              (0 === l &&
                ((c.style.top = p._y + "px"), (c.style.left = b + x + "px")),
              (p.style.top = "0px"),
              x && (p.style.left = p._x - x + "px")));
        0 === a
          ? (c.innerHTML = "&nbsp;")
          : P || q || (v(c), s(c, String.fromCharCode(160), " ")),
          G && ((c.style.width = g), (c.style.height = p._h + "px")),
          D.appendChild(c);
      }
      D.style.cssText = A;
    }
    G &&
      (E > D.clientHeight &&
        ((D.style.height = E - N + "px"),
        D.clientHeight < E && (D.style.height = E + S + "px")),
      n > D.clientWidth &&
        ((D.style.width = n - m + "px"),
        D.clientWidth < n && (D.style.width = n + T + "px"))),
      t(F, H),
      P && t(C, O),
      t(i, V);
  }
  function y(D, u, e, F) {
    var t,
      C,
      i,
      n,
      E,
      r,
      l,
      a,
      d = u.tag ? u.tag : u.span ? "span" : "div",
      h = ~(u.type || u.split || "chars,words,lines").indexOf("chars"),
      B = o(u),
      f = u.wordDelimiter || " ",
      A = " " !== f ? "" : B ? "&#173; " : " ",
      c = "</" + d + ">",
      g = 1,
      x = u.specialChars
        ? "function" == typeof u.specialChars
          ? u.specialChars
          : p
        : null,
      y = Q.createElement("div"),
      v = D.parentNode;
    for (
      v.insertBefore(y, D),
        y.textContent = D.nodeValue,
        v.removeChild(D),
        l =
          -1 !==
          (t = (function getText(D) {
            var u = D.nodeType,
              e = "";
            if (1 === u || 9 === u || 11 === u) {
              if ("string" == typeof D.textContent) return D.textContent;
              for (D = D.firstChild; D; D = D.nextSibling) e += getText(D);
            } else if (3 === u || 4 === u) return D.nodeValue;
            return e;
          })((D = y))).indexOf("<"),
        !1 !== u.reduceWhiteSpace && (t = t.replace(S, " ").replace(_, "")),
        l && (t = t.split("<").join("{{LT}}")),
        E = t.length,
        C = (" " === t.charAt(0) ? A : "") + e(),
        i = 0;
      i < E;
      i++
    )
      if (((r = t.charAt(i)), x && (a = x(t.substr(i), u.specialChars))))
        (r = t.substr(i, a || 1)),
          (C += h && " " !== r ? F() + r + "</" + d + ">" : r),
          (i += a - 1);
      else if (r === f && t.charAt(i - 1) !== f && i) {
        for (C += g ? c : "", g = 0; t.charAt(i + 1) === f; ) (C += A), i++;
        i === E - 1
          ? (C += A)
          : ")" !== t.charAt(i + 1) && ((C += A + e()), (g = 1));
      } else
        "{" === r && "{{LT}}" === t.substr(i, 6)
          ? ((C += h ? F() + "{{LT}}</" + d + ">" : "{{LT}}"), (i += 5))
          : (55296 <= r.charCodeAt(0) && r.charCodeAt(0) <= 56319) ||
            (65024 <= t.charCodeAt(i + 1) && t.charCodeAt(i + 1) <= 65039)
          ? ((n = ((t.substr(i, 12).split(b) || [])[1] || "").length || 2),
            (C +=
              h && " " !== r
                ? F() + t.substr(i, n) + "</" + d + ">"
                : t.substr(i, n)),
            (i += n - 1))
          : (C += h && " " !== r ? F() + r + "</" + d + ">" : r);
    (D.outerHTML = C + (g ? c : "")), l && s(v, "{{LT}}", "<");
  }
  function z(D, u, e, F) {
    var t,
      C,
      i = n(D.childNodes),
      E = i.length,
      s = o(u);
    if (3 !== D.nodeType || 1 < E) {
      for (u.absolute = !1, t = 0; t < E; t++)
        (3 === (C = i[t]).nodeType && !/\S+/.test(C.nodeValue)) ||
          (s &&
            3 !== C.nodeType &&
            "inline" === k(C).display &&
            ((C.style.display = "inline-block"),
            (C.style.position = "relative")),
          (C._isSplit = !0),
          z(C, u, e, F));
      return (u.absolute = s), void (D._isSplit = !0);
    }
    y(D, u, e, F);
  }
  var Q,
    e,
    F,
    C,
    _ = /(?:\r|\n|\t\t)/g,
    S = /(?:\s\s+)/g,
    i = Array.isArray,
    E = [].slice,
    l =
      (((C = TPGSSPLITTEXT.prototype).split = function split(D) {
        this.isSplit && this.revert(),
          (this.vars = D = D || this.vars),
          (this._originals.length = this.chars.length = this.words.length = this.lines.length = 0);
        for (
          var u,
            e,
            F,
            t = this.elements.length,
            C = D.tag ? D.tag : D.span ? "span" : "div",
            i = r(D.wordsClass, C),
            n = r(D.charsClass, C);
          -1 < --t;

        )
          (F = this.elements[t]),
            (this._originals[t] = F.innerHTML),
            (u = F.clientHeight),
            (e = F.clientWidth),
            z(F, D, i, n),
            x(F, D, this.chars, this.words, this.lines, e, u);
        return (
          this.chars.reverse(),
          this.words.reverse(),
          this.lines.reverse(),
          (this.isSplit = !0),
          this
        );
      }),
      (C.revert = function revert() {
        var e = this._originals;
        if (!e) throw "revert() call wasn't scoped properly.";
        return (
          this.elements.forEach(function (D, u) {
            return (D.innerHTML = e[u]);
          }),
          (this.chars = []),
          (this.words = []),
          (this.lines = []),
          (this.isSplit = !1),
          this
        );
      }),
      (TPGSSPLITTEXT.create = function create(D, u) {
        return new TPGSSPLITTEXT(D, u);
      }),
      TPGSSPLITTEXT);
  function TPGSSPLITTEXT(D, u) {
    F ||
      (function _initCore() {
        (Q = document), (e = window), (F = 1);
      })(),
      (this.elements = n(D)),
      (this.chars = []),
      (this.words = []),
      (this.lines = []),
      (this._originals = []),
      (this.vars = u || {}),
      this.split(u);
  }
  (l.version = "3.2.0"), (D.TPGSSPLITTEXT = l), (D.default = l);
  if (typeof window === "undefined" || window !== D) {
    Object.defineProperty(D, "__esModule", { value: !0 });
  } else {
    delete D.default;
  }
});
/*!MotionPathPlugin 3.2.0*/ !(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(((t = t || self).window = t.window || {}));
})(this, function (t) {
  "use strict";
  function p(t) {
    return "string" == typeof t;
  }
  function x(t, e, n, r) {
    var a = t[e],
      o = 1 === r ? 6 : subdivideSegment(a, n, r);
    if (o && o + n + 2 < a.length)
      return t.splice(e, 0, a.slice(0, n + o + 2)), a.splice(0, n + o), 1;
  }
  function A(t, e) {
    var n = t.length,
      r = t[n - 1] || [],
      a = r.length;
    e[0] === r[a - 2] && e[1] === r[a - 1] && ((e = r.concat(e.slice(2))), n--),
      (t[n] = e);
  }
  var M = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
    L = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
    R = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
    r = /(^[#\.][a-z]|[a-y][a-z])/i,
    F = Math.PI / 180,
    s = 180 / Math.PI,
    U = Math.sin,
    H = Math.cos,
    Z = Math.abs,
    Q = Math.sqrt,
    S = Math.atan2,
    C = 1e8,
    l = function _isNumber(t) {
      return "number" == typeof t;
    },
    _ = {},
    N = {},
    e = 1e5,
    d = function _wrapProgress(t) {
      return Math.round(((t + C) % 1) * e) / e || (t < 0 ? 0 : 1);
    },
    O = function _round(t) {
      return ~~(t * e + (t < 0 ? -0.5 : 0.5)) / e;
    },
    B = function _copyMetaData(t, e) {
      return (
        (e.totalLength = t.totalLength),
        t.samples
          ? ((e.samples = t.samples.slice(0)),
            (e.lookup = t.lookup.slice(0)),
            (e.minLength = t.minLength),
            (e.resolution = t.resolution))
          : (e.totalPoints = t.totalPoints),
        e
      );
    };
  function getRawPath(t) {
    var e,
      n = (t = (p(t) && r.test(t) && document.querySelector(t)) || t)
        .getAttribute
        ? t
        : 0;
    return n && (t = t.getAttribute("d"))
      ? (n._gsPath || (n._gsPath = {}),
        (e = n._gsPath[t]) && !e._dirty
          ? e
          : (n._gsPath[t] = stringToRawPath(t)))
      : t
      ? p(t)
        ? stringToRawPath(t)
        : l(t[0])
        ? [t]
        : t
      : console.warn("Expecting a <path> element or an SVG path data string");
  }
  function reverseSegment(t) {
    var e,
      n = 0;
    for (t.reverse(); n < t.length; n += 2)
      (e = t[n]), (t[n] = t[n + 1]), (t[n + 1] = e);
    t.reversed = !t.reversed;
  }
  var D = {
    rect: "rx,ry,x,y,width,height",
    circle: "r,cx,cy",
    ellipse: "rx,ry,cx,cy",
    line: "x1,x2,y1,y2",
  };
  function convertToPath(t, e) {
    var n,
      r,
      a,
      o,
      i,
      s,
      l,
      h,
      u,
      f,
      g,
      c,
      p,
      d,
      m,
      v,
      x,
      P,
      y,
      w,
      b,
      M,
      R = t.tagName.toLowerCase(),
      T = 0.552284749831;
    return "path" !== R && t.getBBox
      ? ((s = (function _createPath(t, e) {
          var n,
            r = document.createElementNS("http://www.w3.org/2000/svg", "path"),
            a = [].slice.call(t.attributes),
            o = a.length;
          for (e = "," + e + ","; -1 < --o; )
            (n = a[o].nodeName.toLowerCase()),
              e.indexOf("," + n + ",") < 0 &&
                r.setAttributeNS(null, n, a[o].nodeValue);
          return r;
        })(t, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points")),
        (M = (function _attrToObj(t, e) {
          for (var n = e ? e.split(",") : [], r = {}, a = n.length; -1 < --a; )
            r[n[a]] = +t.getAttribute(n[a]) || 0;
          return r;
        })(t, D[R])),
        "rect" === R
          ? ((o = M.rx),
            (i = M.ry),
            (r = M.x),
            (a = M.y),
            (f = M.width - 2 * o),
            (g = M.height - 2 * i),
            (n =
              o || i
                ? "M" +
                  (v = (d = (p = r + o) + f) + o) +
                  "," +
                  (P = a + i) +
                  " V" +
                  (y = P + g) +
                  " C" +
                  [
                    v,
                    (w = y + i * T),
                    (m = d + o * T),
                    (b = y + i),
                    d,
                    b,
                    d - (d - p) / 3,
                    b,
                    p + (d - p) / 3,
                    b,
                    p,
                    b,
                    (c = r + o * (1 - T)),
                    b,
                    r,
                    w,
                    r,
                    y,
                    r,
                    y - (y - P) / 3,
                    r,
                    P + (y - P) / 3,
                    r,
                    P,
                    r,
                    (x = a + i * (1 - T)),
                    c,
                    a,
                    p,
                    a,
                    p + (d - p) / 3,
                    a,
                    d - (d - p) / 3,
                    a,
                    d,
                    a,
                    m,
                    a,
                    v,
                    x,
                    v,
                    P,
                  ].join(",") +
                  "z"
                : "M" +
                  (r + f) +
                  "," +
                  a +
                  " v" +
                  g +
                  " h" +
                  -f +
                  " v" +
                  -g +
                  " h" +
                  f +
                  "z"))
          : "circle" === R || "ellipse" === R
          ? ((h =
              "circle" === R
                ? (o = i = M.r) * T
                : ((o = M.rx), (i = M.ry) * T)),
            (n =
              "M" +
              ((r = M.cx) + o) +
              "," +
              (a = M.cy) +
              " C" +
              [
                r + o,
                a + h,
                r + (l = o * T),
                a + i,
                r,
                a + i,
                r - l,
                a + i,
                r - o,
                a + h,
                r - o,
                a,
                r - o,
                a - h,
                r - l,
                a - i,
                r,
                a - i,
                r + l,
                a - i,
                r + o,
                a - h,
                r + o,
                a,
              ].join(",") +
              "z"))
          : "line" === R
          ? (n = "M" + M.x1 + "," + M.y1 + " L" + M.x2 + "," + M.y2)
          : ("polyline" !== R && "polygon" !== R) ||
            ((n =
              "M" +
              (r = (u =
                (t.getAttribute("points") + "").match(L) || []).shift()) +
              "," +
              (a = u.shift()) +
              " L" +
              u.join(",")),
            "polygon" === R && (n += "," + r + "," + a + "z")),
        s.setAttribute(
          "d",
          rawPathToString((s._gsRawPath = stringToRawPath(n)))
        ),
        e &&
          t.parentNode &&
          (t.parentNode.insertBefore(s, t), t.parentNode.removeChild(t)),
        s)
      : t;
  }
  function getRotationAtBezierT(t, e, n) {
    var r,
      a = t[e],
      o = t[e + 2],
      i = t[e + 4];
    return (
      (a += (o - a) * n),
      (a += ((o += (i - o) * n) - a) * n),
      (r = o + (i + (t[e + 6] - i) * n - o) * n - a),
      (a = t[e + 1]),
      (a += ((o = t[e + 3]) - a) * n),
      (a += ((o += ((i = t[e + 5]) - o) * n) - a) * n),
      O(S(o + (i + (t[e + 7] - i) * n - o) * n - a, r) * s)
    );
  }
  function sliceRawPath(t, e, n) {
    !(function _isUndefined(t) {
      return void 0 === t;
    })(n) || (n = 1);
    var r = n < (e = e || 0),
      a = Math.max(0, ~~(Z(n - e) - 1e-8));
    if (
      (r && ((r = n), (n = e), (e = r), (r = 1), (a -= a ? 1 : 0)),
      e < 0 || n < 0)
    ) {
      var o = 1 + ~~Math.min(e, n);
      (e += o), (n += o);
    }
    var i,
      s,
      l,
      h,
      u,
      f,
      g,
      c = (function copyRawPath(t) {
        for (var e = [], n = 0; n < t.length; n++)
          e[n] = B(t[n], t[n].slice(0));
        return B(t, e);
      })(t.totalLength ? t : cacheRawPathMeasurements(t)),
      p = 1 < n,
      d = getProgressData(c, e, _),
      m = getProgressData(c, n, N),
      v = m.segment,
      P = d.segment,
      y = m.segIndex,
      w = d.segIndex,
      b = m.i,
      M = d.i,
      R = w === y,
      T = b === M && R,
      L = (R && b < M) || (T && d.t > m.t);
    if (p || a) {
      if (
        (x(c, w, M, d.t) &&
          ((i = 1),
          w++,
          T
            ? L
              ? (m.t /= d.t)
              : ((m.t = (m.t - d.t) / (1 - d.t)), y++, (b = 0))
            : w <= y + 1 && !L && (y++, R && (b -= M))),
        m.t ? x(c, y, b, m.t) && (L && i && w++, r && y++) : (y--, r && w--),
        (h = []),
        (f = 1 + (u = c.length) * a),
        (g = w),
        r)
      )
        for (f += (u - (y = (y || u) - 1) + w) % u, l = 0; l < f; l++)
          A(h, c[g]), (g = (g || u) - 1);
      else for (f += (u - w + y) % u, l = 0; l < f; l++) A(h, c[g++ % u]);
      c = h;
    } else if (((s = 1 === m.t ? 6 : subdivideSegment(v, b, m.t)), e !== n))
      for (
        i = subdivideSegment(P, M, T ? d.t / m.t : d.t),
          R && (s += i),
          v.splice(b + s + 2),
          i && P.splice(0, M + i),
          l = c.length;
        l--;

      )
        (l < w || y < l) && c.splice(l, 1);
    else
      (v.angle = getRotationAtBezierT(v, b + s, 0)),
        (d = v[(b += s)]),
        (m = v[b + 1]),
        (v.length = v.totalLength = 0),
        (v.totalPoints = c.totalPoints = 8),
        v.push(d, m, d, m, d, m, d, m);
    return (
      r &&
        (function _reverseRawPath(t, e) {
          var n = t.length;
          for (e || t.reverse(); n--; ) t[n].reversed || reverseSegment(t[n]);
        })(c, p || a),
      (c.totalLength = 0),
      c
    );
  }
  function measureSegment(t, e, n) {
    (e = e || 0), t.samples || ((t.samples = []), (t.lookup = []));
    var r,
      a,
      o,
      i,
      s,
      l,
      h,
      u,
      f,
      g,
      c,
      p,
      d,
      m,
      v,
      x,
      P,
      y = ~~t.resolution || 12,
      w = 1 / y,
      b = n ? e + 6 * n + 1 : t.length,
      M = t[e],
      R = t[e + 1],
      T = e ? (e / 6) * y : 0,
      L = t.samples,
      S = t.lookup,
      _ = (e ? t.minLength : C) || C,
      N = L[T + n * y - 1],
      A = e ? L[T - 1] : 0;
    for (L.length = S.length = 0, a = e + 2; a < b; a += 6) {
      if (
        ((o = t[a + 4] - M),
        (i = t[a + 2] - M),
        (s = t[a] - M),
        (u = t[a + 5] - R),
        (f = t[a + 3] - R),
        (g = t[a + 1] - R),
        (l = h = c = p = 0),
        Z(o) < 1e-5 && Z(u) < 1e-5 && Z(s) + Z(g) < 1e-5)
      )
        8 < t.length && (t.splice(a, 6), (a -= 6), (b -= 6));
      else
        for (r = 1; r <= y; r++)
          (l =
            h -
            (h =
              ((m = w * r) * m * o + 3 * (d = 1 - m) * (m * i + d * s)) * m)),
            (c = p - (p = (m * m * u + 3 * d * (m * f + d * g)) * m)),
            (x = Q(c * c + l * l)) < _ && (_ = x),
            (A += x),
            (L[T++] = A);
      (M += o), (R += u);
    }
    if (N) for (N -= A; T < L.length; T++) L[T] += N;
    if (L.length && _)
      for (
        t.totalLength = P = L[L.length - 1] || 0,
          t.minLength = _,
          x = v = 0,
          r = 0;
        r < P;
        r += _
      )
        S[x++] = L[v] < r ? ++v : v;
    else t.totalLength = L[0] = 0;
    return e ? A - L[e / 2 - 1] : A;
  }
  function cacheRawPathMeasurements(t, e) {
    var n, r, a;
    for (a = n = r = 0; a < t.length; a++)
      (t[a].resolution = ~~e || 12),
        (r += t[a].length),
        (n += measureSegment(t[a]));
    return (t.totalPoints = r), (t.totalLength = n), t;
  }
  function subdivideSegment(t, e, n) {
    if (n <= 0 || 1 <= n) return 0;
    var r = t[e],
      a = t[e + 1],
      o = t[e + 2],
      i = t[e + 3],
      s = t[e + 4],
      l = t[e + 5],
      h = r + (o - r) * n,
      u = o + (s - o) * n,
      f = a + (i - a) * n,
      g = i + (l - i) * n,
      c = h + (u - h) * n,
      p = f + (g - f) * n,
      d = s + (t[e + 6] - s) * n,
      m = l + (t[e + 7] - l) * n;
    return (
      (u += (d - u) * n),
      (g += (m - g) * n),
      t.splice(
        e + 2,
        4,
        O(h),
        O(f),
        O(c),
        O(p),
        O(c + (u - c) * n),
        O(p + (g - p) * n),
        O(u),
        O(g),
        O(d),
        O(m)
      ),
      t.samples &&
        t.samples.splice(((e / 6) * t.resolution) | 0, 0, 0, 0, 0, 0, 0, 0),
      6
    );
  }
  function getProgressData(t, e, n) {
    (n = n || {}),
      t.totalLength || cacheRawPathMeasurements(t),
      (e < 0 || 1 < e) && (e = d(e));
    var r,
      a,
      o,
      i,
      s,
      l,
      h = 0,
      u = t[0];
    if (1 < t.length) {
      for (o = t.totalLength * e, s = l = 0; (s += t[l++].totalLength) < o; )
        h = l;
      e = (o - (i = s - (u = t[h]).totalLength)) / (s - i) || 0;
    }
    return (
      (r = u.samples),
      (a = u.resolution),
      (o = u.totalLength * e),
      (i = (l = u.lookup[~~(o / u.minLength)] || 0) ? r[l - 1] : 0),
      (s = r[l]) < o && ((i = s), (s = r[++l])),
      (n.path = t),
      (n.segment = u),
      (n.segIndex = h),
      (n.i = 6 * ~~(l / a)),
      (n.t = (1 / a) * ((o - i) / (s - i) + (l % a))),
      n
    );
  }
  function getPositionOnPath(t, e, n, r) {
    var a,
      o,
      i,
      s,
      l,
      h,
      u,
      f,
      g,
      c = t[0],
      p = r || {};
    if (((e < 0 || 1 < e) && (e = d(e)), 1 < t.length)) {
      for (i = t.totalLength * e, l = h = 0; (l += t[h++].totalLength) < i; )
        c = t[h];
      e = (i - (s = l - c.totalLength)) / (l - s) || 0;
    }
    return (
      (a = c.samples),
      (o = c.resolution),
      (i = c.totalLength * e),
      (s = (h = c.lookup[~~(i / c.minLength)] || 0) ? a[h - 1] : 0),
      (l = a[h]) < i && ((s = l), (l = a[++h])),
      (g = 1 - (u = (1 / o) * ((i - s) / (l - s) + (h % o)) || 0)),
      (f = c[(h = 6 * ~~(h / o))]),
      (p.x = O(
        (u * u * (c[h + 6] - f) +
          3 * g * (u * (c[h + 4] - f) + g * (c[h + 2] - f))) *
          u +
          f
      )),
      (p.y = O(
        (u * u * (c[h + 7] - (f = c[h + 1])) +
          3 * g * (u * (c[h + 5] - f) + g * (c[h + 3] - f))) *
          u +
          f
      )),
      n &&
        (p.angle = c.totalLength
          ? getRotationAtBezierT(c, h, 1 <= u ? 1 - 1e-9 : u || 1e-9)
          : c.angle || 0),
      p
    );
  }
  function transformRawPath(t, e, n, r, a, o, i) {
    for (var s, l, h, u, f, g = t.length; -1 < --g; )
      for (l = (s = t[g]).length, h = 0; h < l; h += 2)
        (u = s[h]),
          (f = s[h + 1]),
          (s[h] = u * e + f * r + o),
          (s[h + 1] = u * n + f * a + i);
    return (t._dirty = 1), t;
  }
  function arcToSegment(t, e, n, r, a, o, i, s, l) {
    if (t !== s || e !== l) {
      (n = Z(n)), (r = Z(r));
      var h = (a % 360) * F,
        u = H(h),
        f = U(h),
        g = Math.PI,
        c = 2 * g,
        p = (t - s) / 2,
        d = (e - l) / 2,
        m = u * p + f * d,
        v = -f * p + u * d,
        x = m * m,
        P = v * v,
        y = x / (n * n) + P / (r * r);
      1 < y && ((n = Q(y) * n), (r = Q(y) * r));
      var w = n * n,
        b = r * r,
        M = (w * b - w * P - b * x) / (w * P + b * x);
      M < 0 && (M = 0);
      var R = (o === i ? -1 : 1) * Q(M),
        T = ((n * v) / r) * R,
        L = ((-r * m) / n) * R,
        S = u * T - f * L + (t + s) / 2,
        _ = f * T + u * L + (e + l) / 2,
        N = (m - T) / n,
        A = (v - L) / r,
        C = (-m - T) / n,
        O = (-v - L) / r,
        B = N * N + A * A,
        D = (A < 0 ? -1 : 1) * Math.acos(N / Q(B)),
        V =
          (N * O - A * C < 0 ? -1 : 1) *
          Math.acos((N * C + A * O) / Q(B * (C * C + O * O)));
      isNaN(V) && (V = g),
        !i && 0 < V ? (V -= c) : i && V < 0 && (V += c),
        (D %= c),
        (V %= c);
      var z,
        E = Math.ceil(Z(V) / (c / 4)),
        X = [],
        k = V / E,
        G = ((4 / 3) * U(k / 2)) / (1 + H(k / 2)),
        I = u * n,
        j = f * n,
        Y = f * -r,
        q = u * r;
      for (z = 0; z < E; z++)
        (m = H((a = D + z * k))),
          (v = U(a)),
          (N = H((a += k))),
          (A = U(a)),
          X.push(m - G * v, v + G * m, N + G * A, A - G * N, N, A);
      for (z = 0; z < X.length; z += 2)
        (m = X[z]),
          (v = X[z + 1]),
          (X[z] = m * I + v * Y + S),
          (X[z + 1] = m * j + v * q + _);
      return (X[z - 2] = s), (X[z - 1] = l), X;
    }
  }
  function stringToRawPath(t) {
    function nf(t, e, n, r) {
      (u = (n - t) / 3),
        (f = (r - e) / 3),
        s.push(t + u, e + f, n - u, r - f, n, r);
    }
    var e,
      n,
      r,
      a,
      o,
      i,
      s,
      l,
      h,
      u,
      f,
      g,
      c,
      p,
      d,
      m =
        (t + "")
          .replace(R, function (t) {
            var e = +t;
            return e < 1e-4 && -1e-4 < e ? 0 : e;
          })
          .match(M) || [],
      v = [],
      x = 0,
      P = 0,
      y = m.length,
      w = 0,
      b = "ERROR: malformed path: " + t;
    if (!t || !isNaN(m[0]) || isNaN(m[1])) return console.log(b), v;
    for (e = 0; e < y; e++)
      if (
        ((c = o),
        isNaN(m[e]) ? (i = (o = m[e].toUpperCase()) !== m[e]) : e--,
        (r = +m[e + 1]),
        (a = +m[e + 2]),
        i && ((r += x), (a += P)),
        e || ((l = r), (h = a)),
        "M" === o)
      )
        s && (s.length < 8 ? --v.length : (w += s.length)),
          (x = l = r),
          (P = h = a),
          (s = [r, a]),
          v.push(s),
          (e += 2),
          (o = "L");
      else if ("C" === o)
        i || (x = P = 0),
          (s = s || [0, 0]).push(
            r,
            a,
            x + 1 * m[e + 3],
            P + 1 * m[e + 4],
            (x += 1 * m[e + 5]),
            (P += 1 * m[e + 6])
          ),
          (e += 6);
      else if ("S" === o)
        (u = x),
          (f = P),
          ("C" !== c && "S" !== c) ||
            ((u += x - s[s.length - 4]), (f += P - s[s.length - 3])),
          i || (x = P = 0),
          s.push(u, f, r, a, (x += 1 * m[e + 3]), (P += 1 * m[e + 4])),
          (e += 4);
      else if ("Q" === o)
        (u = x + (2 / 3) * (r - x)),
          (f = P + (2 / 3) * (a - P)),
          i || (x = P = 0),
          (x += 1 * m[e + 3]),
          (P += 1 * m[e + 4]),
          s.push(u, f, x + (2 / 3) * (r - x), P + (2 / 3) * (a - P), x, P),
          (e += 4);
      else if ("T" === o)
        (u = x - s[s.length - 4]),
          (f = P - s[s.length - 3]),
          s.push(
            x + u,
            P + f,
            r + (2 / 3) * (x + 1.5 * u - r),
            a + (2 / 3) * (P + 1.5 * f - a),
            (x = r),
            (P = a)
          ),
          (e += 2);
      else if ("H" === o) nf(x, P, (x = r), P), (e += 1);
      else if ("V" === o) nf(x, P, x, (P = r + (i ? P - x : 0))), (e += 1);
      else if ("L" === o || "Z" === o)
        "Z" === o && ((r = l), (a = h), (s.closed = !0)),
          ("L" === o || 0.5 < Z(x - r) || 0.5 < Z(P - a)) &&
            (nf(x, P, r, a), "L" === o && (e += 2)),
          (x = r),
          (P = a);
      else if ("A" === o) {
        if (
          ((p = m[e + 4]),
          (d = m[e + 5]),
          (u = m[e + 6]),
          (f = m[e + 7]),
          (n = 7),
          1 < p.length &&
            (p.length < 3
              ? ((f = u), (u = d), n--)
              : ((f = d), (u = p.substr(2)), (n -= 2)),
            (d = p.charAt(1)),
            (p = p.charAt(0))),
          (g = arcToSegment(
            x,
            P,
            +m[e + 1],
            +m[e + 2],
            +m[e + 3],
            +p,
            +d,
            (i ? x : 0) + 1 * u,
            (i ? P : 0) + 1 * f
          )),
          (e += n),
          g)
        )
          for (n = 0; n < g.length; n++) s.push(g[n]);
        (x = s[s.length - 2]), (P = s[s.length - 1]);
      } else console.log(b);
    return (
      (e = s.length) < 6
        ? (v.pop(), (e = 0))
        : s[0] === s[e - 2] && s[1] === s[e - 1] && (s.closed = !0),
      (v.totalPoints = w + e),
      v
    );
  }
  function flatPointsToSegment(t, e) {
    void 0 === e && (e = 1);
    for (var n = t[0], r = 0, a = [n, r], o = 2; o < t.length; o += 2)
      a.push(n, r, t[o], (r = ((t[o] - n) * e) / 2), (n = t[o]), -r);
    return a;
  }
  function pointsToSegment(t, e, n) {
    var r,
      a,
      o,
      i,
      s,
      l,
      h,
      u,
      f,
      g,
      c,
      p,
      d,
      m,
      v = t.length - 2,
      x = +t[0],
      P = +t[1],
      y = +t[2],
      w = +t[3],
      b = [x, P, x, P],
      M = y - x,
      R = w - P;
    for (
      isNaN(n) && (n = Math.PI / 10), e = e || 0 === e ? +e : 1, s = 2;
      s < v;
      s += 2
    )
      (r = x),
        (a = P),
        (x = y),
        (P = w),
        (p = (l = M) * l + (u = R) * u),
        (d = (M = (y = +t[s + 2]) - x) * M + (R = (w = +t[s + 3]) - P) * R),
        (m = (h = y - r) * h + (f = w - a) * f),
        (c = ((o = Math.acos((p + d - m) / Q(4 * p * d))) / Math.PI) * e),
        (g = Q(p) * c),
        (c *= Q(d)),
        (x === r && P === a) ||
          (n < o
            ? ((i = S(f, h)),
              b.push(
                O(x - H(i) * g),
                O(P - U(i) * g),
                O(x),
                O(P),
                O(x + H(i) * c),
                O(P + U(i) * c)
              ))
            : ((i = S(u, l)),
              b.push(O(x - H(i) * g), O(P - U(i) * g)),
              (i = S(R, M)),
              b.push(O(x), O(P), O(x + H(i) * c), O(P + U(i) * c))));
    return b.push(O(y), O(w), O(y), O(w)), b;
  }
  function rawPathToString(t) {
    l(t[0]) && (t = [t]);
    var e,
      n,
      r,
      a,
      o = "",
      i = t.length;
    for (n = 0; n < i; n++) {
      for (
        a = t[n],
          o += "M" + O(a[0]) + "," + O(a[1]) + " C",
          e = a.length,
          r = 2;
        r < e;
        r++
      )
        o +=
          O(a[r++]) +
          "," +
          O(a[r++]) +
          " " +
          O(a[r++]) +
          "," +
          O(a[r++]) +
          " " +
          O(a[r++]) +
          "," +
          O(a[r]) +
          " ";
      a.closed && (o += "z");
    }
    return o;
  }
  function T(t) {
    return (
      t.ownerSVGElement || ("svg" === (t.tagName + "").toLowerCase() ? t : null)
    );
  }
  function V(t, e) {
    if (
      t.parentNode &&
      (f ||
        (function _setDoc(t) {
          var e = t.ownerDocument || t;
          !(b in t.style) &&
            "msTransform" in t.style &&
            (z = (b = "msTransform") + "Origin");
          for (; e.parentNode && (e = e.parentNode); );
          if (((g = window), (y = new G()), e)) {
            (c = (f = e).documentElement), (m = e.body);
            var n = e.createElement("div"),
              r = e.createElement("div");
            m.appendChild(n),
              n.appendChild(r),
              (n.style.position = "static"),
              (n.style[b] = "translate3d(0,0,1px)"),
              (w = r.offsetParent !== n),
              m.removeChild(n);
          }
          return e;
        })(t))
    ) {
      var n = T(t),
        r = n
          ? n.getAttribute("xmlns") || "http://www.w3.org/2000/svg"
          : "http://www.w3.org/1999/xhtml",
        a = n ? (e ? "rect" : "g") : "div",
        o = 2 !== e ? 0 : 100,
        i = 3 === e ? 100 : 0,
        s = "position:absolute;display:block;pointer-events:none;",
        l = f.createElementNS
          ? f.createElementNS(r.replace(/^https/, "http"), a)
          : f.createElement(a);
      return (
        e &&
          (n
            ? ((P = P || V(t)),
              l.setAttribute("width", 1),
              l.setAttribute("height", 1),
              l.setAttribute("transform", "translate(" + o + "," + i + ")"),
              P.appendChild(l))
            : (v || ((v = V(t)).style.cssText = s),
              (l.style.cssText =
                s + "width:1px;height:1px;top:" + i + "px;left:" + o + "px"),
              v.appendChild(l))),
        l
      );
    }
    throw "Need document and parent.";
  }
  function X(t, e, n, r, a, o, i) {
    return (t.a = e), (t.b = n), (t.c = r), (t.d = a), (t.e = o), (t.f = i), t;
  }
  var f,
    g,
    c,
    m,
    v,
    P,
    y,
    w,
    n,
    b = "transform",
    z = b + "Origin",
    E = [],
    k = [],
    G =
      (((n = Matrix2D.prototype).inverse = function inverse() {
        var t = this.a,
          e = this.b,
          n = this.c,
          r = this.d,
          a = this.e,
          o = this.f,
          i = t * r - e * n;
        return X(
          this,
          r / i,
          -e / i,
          -n / i,
          t / i,
          (n * o - r * a) / i,
          -(t * o - e * a) / i
        );
      }),
      (n.multiply = function multiply(t) {
        var e = this.a,
          n = this.b,
          r = this.c,
          a = this.d,
          o = this.e,
          i = this.f,
          s = t.a,
          l = t.c,
          h = t.b,
          u = t.d,
          f = t.e,
          g = t.f;
        return X(
          this,
          s * e + h * r,
          s * n + h * a,
          l * e + u * r,
          l * n + u * a,
          o + f * e + g * r,
          i + f * n + g * a
        );
      }),
      (n.clone = function clone() {
        return new Matrix2D(this.a, this.b, this.c, this.d, this.e, this.f);
      }),
      (n.equals = function equals(t) {
        var e = this.a,
          n = this.b,
          r = this.c,
          a = this.d,
          o = this.e,
          i = this.f;
        return (
          e === t.a &&
          n === t.b &&
          r === t.c &&
          a === t.d &&
          o === t.e &&
          i === t.f
        );
      }),
      (n.apply = function apply(t, e) {
        void 0 === e && (e = {});
        var n = t.x,
          r = t.y,
          a = this.a,
          o = this.b,
          i = this.c,
          s = this.d,
          l = this.e,
          h = this.f;
        return (
          (e.x = n * a + r * i + l || 0), (e.y = n * o + r * s + h || 0), e
        );
      }),
      Matrix2D);
  function Matrix2D(t, e, n, r, a, o) {
    void 0 === t && (t = 1),
      void 0 === e && (e = 0),
      void 0 === n && (n = 0),
      void 0 === r && (r = 1),
      void 0 === a && (a = 0),
      void 0 === o && (o = 0),
      X(this, t, e, n, r, a, o);
  }
  function getGlobalMatrix(t, e, n) {
    if (!t || !t.parentNode) return new G();
    var r = T(t) ? E : k,
      a = (function _placeSiblings(t, e) {
        var n,
          r,
          a,
          o,
          i,
          s = T(t),
          l = t === s,
          h = s ? E : k;
        if (t === g) return t;
        if ((h.length || h.push(V(t, 1), V(t, 2), V(t, 3)), (n = s ? P : v), s))
          (a = l ? { x: 0, y: 0 } : t.getBBox()),
            (i = (r = t.transform ? t.transform.baseVal : {}).numberOfItems
              ? ((o = (r = r.consolidate().matrix).a * a.x + r.c * a.y),
                r.b * a.x + r.d * a.y)
              : ((r = y), (o = a.x), a.y)),
            e && "g" === t.tagName.toLowerCase() && (o = i = 0),
            n.setAttribute(
              "transform",
              "matrix(" +
                r.a +
                "," +
                r.b +
                "," +
                r.c +
                "," +
                r.d +
                "," +
                (r.e + o) +
                "," +
                (r.f + i) +
                ")"
            ),
            (l ? s : t.parentNode).appendChild(n);
        else {
          if (((o = i = 0), w))
            for (r = t.offsetParent, a = t; a && (a = a.parentNode) !== r; )
              4 < (g.getComputedStyle(a)[b] + "").length &&
                ((o = a.offsetLeft), (i = a.offsetTop), (a = 0));
          ((a = n.style).top = t.offsetTop - i + "px"),
            (a.left = t.offsetLeft - o + "px"),
            (r = g.getComputedStyle(t)),
            (a[b] = r[b]),
            (a[z] = r[z]),
            (a.position = "fixed" === r.position ? "fixed" : "absolute"),
            t.parentNode.appendChild(n);
        }
        return n;
      })(t, n),
      o = r[0].getBoundingClientRect(),
      i = r[1].getBoundingClientRect(),
      s = r[2].getBoundingClientRect(),
      l = a.parentNode,
      h = (function _isFixed(t) {
        return (
          "fixed" === g.getComputedStyle(t).position ||
          ((t = t.parentNode) && 1 === t.nodeType ? _isFixed(t) : void 0)
        );
      })(t),
      u = new G(
        (i.left - o.left) / 100,
        (i.top - o.top) / 100,
        (s.left - o.left) / 100,
        (s.top - o.top) / 100,
        o.left +
          (h
            ? 0
            : (function _getDocScrollLeft() {
                return (
                  g.pageXOffset ||
                  f.scrollLeft ||
                  c.scrollLeft ||
                  m.scrollLeft ||
                  0
                );
              })()),
        o.top +
          (h
            ? 0
            : (function _getDocScrollTop() {
                return (
                  g.pageYOffset ||
                  f.scrollTop ||
                  c.scrollTop ||
                  m.scrollTop ||
                  0
                );
              })())
      );
    return l.removeChild(a), e ? u.inverse() : u;
  }
  function fa(t, e, n, r) {
    for (var a = e.length, o = r, i = 0; i < a; i++)
      (t[o] = parseFloat(e[i][n])), (o += 2);
    return t;
  }
  function ga(t, e, n) {
    return parseFloat(t._gsap.get(t, e, n || "px")) || 0;
  }
  function ha(t) {
    var e,
      n = t[0],
      r = t[1];
    for (e = 2; e < t.length; e += 2) (n = t[e] += n), (r = t[e + 1] += r);
  }
  function ia(t, e, n, r, a, o, i) {
    return (
      (e =
        "cubic" === i.type
          ? [e]
          : (e.unshift(ga(n, r, i.unitX), a ? ga(n, a, i.unitY) : 0),
            i.relative && ha(e),
            [(a ? pointsToSegment : flatPointsToSegment)(e, i.curviness)])),
      (e = o(K(e, n, i))),
      tt(t, n, r, e, "x", i.unitX),
      a && tt(t, n, a, e, "y", i.unitY),
      cacheRawPathMeasurements(e, i.resolution || (0 === i.curviness ? 20 : 12))
    );
  }
  function ja(t) {
    return t;
  }
  function la(t, e, n) {
    var r = getGlobalMatrix(t),
      a = e && t.ownerSVGElement && t.getBBox();
    return n.apply(
      e && "auto" !== e
        ? r.apply({
            x: e[0] * (a ? a.width : t.offsetWidth || 0),
            y: e[1] * (a ? a.height : t.offsetHeight || 0),
          })
        : { x: r.e, y: r.f }
    );
  }
  function ma(t, e, n, r) {
    var a,
      o = getGlobalMatrix(t.parentNode, !0, !0),
      i = o.clone().multiply(getGlobalMatrix(e)),
      s = la(t, n, o),
      l = la(e, r, o),
      h = l.x,
      u = l.y;
    return (
      (i.e = i.f = 0),
      "auto" === r &&
        e.getTotalLength &&
        "path" === e.tagName.toLowerCase() &&
        ((a = e.getAttribute("d").match(J) || []),
        (h += (a = i.apply({ x: +a[0], y: +a[1] })).x),
        (u += a.y)),
      (a || (e.getBBox && t.getBBox)) &&
        ((h -= (a = i.apply(e.getBBox())).x), (u -= a.y)),
      (i.e = h - s.x),
      (i.f = u - s.y),
      i
    );
  }
  var I,
    j,
    Y,
    q,
    W = ["x", "translateX", "left", "marginLeft"],
    $ = ["y", "translateY", "top", "marginTop"],
    o = Math.PI / 180,
    J = /[-+\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/g,
    K = function _align(t, e, n) {
      var r,
        a,
        o,
        i,
        s = n.align,
        l = n.matrix,
        h = n.offsetX,
        u = n.offsetY,
        f = n.alignOrigin,
        g = t[0][0],
        c = t[0][1];
      return t && t.length
        ? (s &&
            ("self" === s || (a = q(s)[0] || e) === e
              ? transformRawPath(t, 1, 0, 0, 1, ga(e, "x") - g, ga(e, "y") - c)
              : (f &&
                  !1 !== f[2] &&
                  I.set(e, {
                    transformOrigin: 100 * f[0] + "% " + 100 * f[1] + "%",
                  }),
                (r = I.to(e, {
                  xPercent: 0,
                  yPercent: 0,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotation: 0,
                  skewX: 0,
                  skewY: 0,
                }).progress(1)),
                (o = ma(e, a, f, "auto")),
                r.render(-1).kill(),
                (i = o.apply({ x: g, y: c })),
                transformRawPath(
                  t,
                  o.a,
                  o.b,
                  o.c,
                  o.d,
                  o.e - (i.x - o.e),
                  o.f - (i.y - o.f)
                ))),
          l
            ? transformRawPath(t, l.a, l.b, l.c, l.d, l.e, l.f)
            : (h || u) && transformRawPath(t, 1, 0, 0, 1, h || 0, u || 0),
          t)
        : getRawPath("M0,0L0,0");
    },
    tt = function _addDimensionalPropTween(t, e, n, r, a, o) {
      var i = e._gsap,
        s = i.harness,
        l = s && s.aliases && s.aliases[n],
        h = l && l.indexOf(",") < 0 ? l : n,
        u = (t._pt = new j(t._pt, e, h, 0, 0, ja, 0, i.set(e, h, t)));
      (u.u = Y(i.get(e, h, o)) || 0),
        (u.path = r),
        (u.pp = a),
        t._props.push(h);
    },
    a = {
      version: "3.2.0",
      name: "motionPath",
      register: function register(t, e, n) {
        (Y = (I = t).utils.getUnit), (q = I.utils.toArray), (j = n);
      },
      init: function init(t, e) {
        if (!I)
          return (
            console.warn("Please gsap.registerPlugin(MotionPathPlugin)"), !1
          );
        ("object" == typeof e && !e.style && e.path) || (e = { path: e });
        var n,
          r,
          a,
          o,
          i = [],
          s = e.path,
          l = s[0],
          h = e.autoRotate,
          u = (function _sliceModifier(e, n) {
            return function (t) {
              return e || 1 !== n ? sliceRawPath(t, e, n) : t;
            };
          })(e.start, "end" in e ? e.end : 1);
        if (
          ((this.rawPaths = i),
          (this.target = t),
          (this.rotate = h || 0 === h) &&
            ((this.rOffset = parseFloat(h) || 0),
            (this.radians = !!e.useRadians),
            (this.rProp = e.rotation || "rotation"),
            (this.rSet = t._gsap.set(t, this.rProp, this)),
            (this.ru = Y(t._gsap.get(t, this.rProp)) || 0)),
          !Array.isArray(s) || "closed" in s || "number" == typeof l)
        )
          cacheRawPathMeasurements(
            (n = u(K(getRawPath(e.path), t, e))),
            e.resolution
          ),
            i.push(n),
            tt(this, t, e.x || "x", n, "x", e.unitX || "px"),
            tt(this, t, e.y || "y", n, "y", e.unitY || "px");
        else {
          for (r in l) ~W.indexOf(r) ? (a = r) : ~$.indexOf(r) && (o = r);
          for (r in (a && o
            ? i.push(
                ia(
                  this,
                  fa(fa([], s, a, 0), s, o, 1),
                  t,
                  e.x || a,
                  e.y || o,
                  u,
                  e
                )
              )
            : (a = o = 0),
          l))
            r !== a &&
              r !== o &&
              i.push(ia(this, fa([], s, r, 0), t, r, 0, u, e));
        }
      },
      render: function render(t, e) {
        var n = e.rawPaths,
          r = n.length,
          a = e._pt;
        for (1 < t ? (t = 1) : t < 0 && (t = 0); r--; )
          getPositionOnPath(n[r], t, !r && e.rotate, n[r]);
        for (; a; ) a.set(a.t, a.p, a.path[a.pp] + a.u, a.d, t), (a = a._next);
        e.rotate &&
          e.rSet(
            e.target,
            e.rProp,
            n[0].angle * (e.radians ? o : 1) + e.rOffset + e.ru,
            e,
            t
          );
      },
      getLength: function getLength(t) {
        return cacheRawPathMeasurements(getRawPath(t)).totalLength;
      },
      sliceRawPath: sliceRawPath,
      getRawPath: getRawPath,
      pointsToSegment: pointsToSegment,
      stringToRawPath: stringToRawPath,
      rawPathToString: rawPathToString,
      transformRawPath: transformRawPath,
      convertToPath: function convertToPath$1(t, e) {
        return q(t).map(function (t) {
          return convertToPath(t, !1 !== e);
        });
      },
      getGlobalMatrix: getGlobalMatrix,
      getPositionOnPath: getPositionOnPath,
      cacheRawPathMeasurements: cacheRawPathMeasurements,
      getAlignMatrix: ma,
      getRelativePosition: function getRelativePosition(t, e, n, r) {
        var a = ma(t, e, n, r);
        return { x: a.e, y: a.f };
      },
      arrayToRawPath: function arrayToRawPath(t, e) {
        var n = fa(fa([], t, (e = e || {}).x || "x", 0), t, e.y || "y", 1);
        return (
          e.relative && ha(n),
          ["cubic" === e.type ? n : pointsToSegment(n, e.curviness)]
        );
      },
    };
  !(function _getGSAP() {
    return (
      I ||
      ("undefined" != typeof window &&
        (I = window.gsap) &&
        I.registerPlugin &&
        I)
    );
  })() || I.registerPlugin(a),
    (t.MotionPathPlugin = a),
    (t.default = a);
  if (typeof window === "undefined" || window !== t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
  } else {
    delete t.default;
  }
});
/*!Map SplitText to tpGS TPGSSPLITTEXT*/ tpGS.SplitText = TPGSSPLITTEXT;
tpGS.RAD2DEG = 180 / Math.PI;
tpGS.DEG2RAD = Math.PI / 180;
/*!Custom Eases*/ tpGS.SFXBounceLite = tpGS.CustomBounce.create(
  "SFXBounceLite",
  { strength: 0.3, squash: 1, squashID: "SFXBounceLite-squash" }
);
tpGS.SFXBounceSolid = tpGS.CustomBounce.create("SFXBounceSolid", {
  strength: 0.5,
  squash: 2,
  squashID: "SFXBounceSolid-squash",
});
tpGS.SFXBounceStrong = tpGS.CustomBounce.create("SFXBounceStrong", {
  strength: 0.7,
  squash: 3,
  squashID: "SFXBounceStrong-squash",
});
tpGS.SFXBounceExtrem = tpGS.CustomBounce.create("SFXBounceExtrem", {
  strength: 0.9,
  squash: 4,
  squashID: "SFXBounceExtrem-squash",
});
tpGS.BounceLite = tpGS.CustomBounce.create("BounceLite", { strength: 0.3 });
tpGS.BounceSolid = tpGS.CustomBounce.create("BounceSolid", { strength: 0.5 });
tpGS.BounceStrong = tpGS.CustomBounce.create("BounceStrong", { strength: 0.7 });
tpGS.BounceExtrem = tpGS.CustomBounce.create("BounceExtrem", { strength: 0.9 });
/*!REGISTER MOTION PATH (BEZIER)*/ tpGS.gsap.registerPlugin(MotionPathPlugin);
tpGS.gsap.config({ nullTargetWarn: false });
/*!FallBack for old and new Eases*/ tpGS.eases = tpGS.gsap.parseEase();
for (var ease in tpGS.eases)
  if (tpGS.eases.hasOwnProperty(ease) && tpGS[ease] === undefined)
    tpGS[ease] = tpGS.eases[ease];
/*!SANDBOX*/ try {
  (window.GreenSockGlobals = null),
    (window._gsQueue = null),
    (window._gsDefine = null),
    delete window.GreenSockGlobals,
    delete window._gsQueue,
    delete window._gsDefine;
} catch (e) {}
try {
  (window.GreenSockGlobals = RS_CacheGS),
    (window._gsQueue = RS_CacheGS_queue),
    (window._gsDefine = RS_Cache_define);
} catch (e) {} /*!FallBack for Essential Grid*/
if (
  punchgs !== undefined &&
  punchgs.TweenLite !== undefined &&
  punchgs.TweenLite.lagSmoothing === undefined
)
  punchgs.TweenLite.lagSmoothing = function () {};
/*!Wait For Images Library*/ !(function (u) {
  (u.waitForImages = {
    hasImageProperties: [
      "backgroundImage",
      "listStyleImage",
      "borderImage",
      "borderCornerImage",
    ],
  }),
    (u.expr[":"].uncached = function (e) {
      var r = document.createElement("img");
      return (r.src = e.src), u(e).is('img[src!=""]') && !r.complete;
    }),
    (u.fn.waitForImages = function (o, l, r) {
      if (
        (u.isPlainObject(o) &&
          ((l = o.each), (r = o.waitForAll), (o = o.finished)),
        (o = o || u.noop),
        (l = l || u.noop),
        (r = !!r),
        !u.isFunction(o) || !u.isFunction(l))
      )
        throw new TypeError("An invalid callback was supplied.");
      return this.each(function () {
        var a = u(this),
          i = [];
        if (r) {
          var e = u.waitForImages.hasImageProperties || [],
            t = /url\((['"]?)(.*?)\1\)/g;
          a.find("*").each(function () {
            var c = u(this);
            c.is("img:uncached") &&
              i.push({ src: c.attr("src"), element: c[0] }),
              u.each(e, function (e, r) {
                var n,
                  a = c.css(r);
                if (!a) return !0;
                for (; (n = t.exec(a)); ) i.push({ src: n[2], element: c[0] });
              });
          });
        } else
          a.find("img:uncached").each(function () {
            i.push({ src: this.src, element: this });
          });
        var c = i.length,
          s = 0;
        0 == c && o.call(a[0]),
          u.each(i, function (e, r) {
            var n = new Image();
            u(n).bind("load error", function (e) {
              if ((s++, l.call(r.element, s, c, "load" == e.type), s == c))
                return o.call(a[0]), !1;
            }),
              (n.src = r.src);
          });
      });
    });
})(jQuery);
/*!
- Slider Revolution 6.2.0 JavaScript Plugin -
..........................xXXXXX.................
................. xXXXXX..xXXXXX..xXXXXX.........
..................xXXXXX..xXXXXX..xXXXXX.........
..........xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
..........xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
..........xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
..........xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
..........xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
.........,xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
.........,xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
.........,xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
..........xXXXXX..xXXXXX..xXXXXX..xXXXXX.........
.....................xxxxxxxxxxxxxxxxxxx.........
.....................xxxxxxxxxxxxxxxxxxx.........
.....................xxxxxxxxxxxxxxxxxxx.........
VERSION: 6.2.0
DATE: 2020-02-18
@author: Krisztian Horvath, ThemePunch OHG.
UPDATES AND DOCS AT:
https://www.themepunch.com/support-center
GET LICENSE AT:
https://www.themepunch.com/links/slider_revolution_wordpress_regular_license
LICENSE:
Copyright (c) 2009-2019, ThemePunch. All rights reserved.
This work is subject to the terms at https://www.themepunch.com/links/slider_revolution_wordpress_regular_license (Regular / Extended)
*/ !(function (
  e,
  t
) {
  "use strict";
  var i;
  (window.RSANYID = window.RSANYID === t ? [] : window.RSANYID),
    (window.RSANYID_sliderID =
      window.RSANYID_sliderID === t ? [] : window.RSANYID_sliderID),
    e.fn.extend({
      revolution: function (a) {
        return this.each(function () {
          for (var o = document.getElementsByClassName("rs-p-wp-fix"); o[0]; )
            o[0].parentNode.removeChild(o[0]);
          (i = e.fn.revolution),
            this.id !== t
              ? ((i[s] = { anyid: [] }), (this.id = i.revCheckIDS(s, this, !0)))
              : (this.id = "rs_module_" + Math.round(1e7 * Math.random()));
          var s = this.id,
            n = e.extend(!0, {}, a);
          if (
            ((i[s] = Q(a)),
            (i[s].option_export = n),
            (i[s].anyid = []),
            (i[s].c = e(this)),
            (i[s].cpar = i[s].c.parent()),
            (i[s].canvas = i[s].c.find("rs-slides")),
            (i[s].dimensionReCheck = {}),
            N(s),
            i[s].stopAfterLoops != t && i[s].stopAfterLoops > -1
              ? (i[s].looptogo = i[s].stopAfterLoops)
              : (i[s].looptogo = "disabled"),
            (window._T = i[s]),
            (i[s].BUG_safari_clipPath =
              "Safari" === i.get_browser() && i.get_browser_version() > "12"),
            (i[s].BUG_ie_clipPath =
              "Edge" === i.get_browser() || "IE" === i.get_browser()),
            (i[s].indexhelper = 0),
            (i[s].level = 0),
            (i[s].rtl = e("body").hasClass("rtl")),
            (i[s]._L = i[s]._L === t ? {} : i[s]._L),
            (i[s].minHeight =
              "fullwidth" === i[s].sliderLayout
                ? 0
                : i[s].minHeight != t && "" !== i[s].minHeight
                ? parseInt(i[s].minHeight, 0)
                : 0),
            (i[s].isEdge = "Edge" === i.get_browser()),
            r(s),
            "hero" == i[s].sliderType &&
              i[s].c.find("rs-slide").each(function (t) {
                t > 0 && e(this).remove();
              }),
            (i[s].navigation.use =
              "hero" !== i[s].sliderType &&
              ("carousel" == i[s].sliderType ||
                i[s].navigation.keyboardNavigation ||
                "on" == i[s].navigation.mouseScrollNavigation ||
                "carousel" == i[s].navigation.mouseScrollNavigation ||
                i[s].navigation.touch.touchenabled ||
                i[s].navigation.arrows.enable ||
                i[s].navigation.bullets.enable ||
                i[s].navigation.thumbnails.enable ||
                i[s].navigation.tabs.enable)),
            i[s].c.find("rs-bgvideo").each(function () {
              "RS-BGVIDEO" !== this.tagName ||
                (this.id !== t && "" !== this.id) ||
                (this.id = "rs-bg-video-" + Math.round(1e6 * Math.random()));
            }),
            (tpGS.force3D = "auto"),
            !0 === i[s].pageLoading)
          ) {
            if (window.RS_toInit === t) {
              var l = document.getElementsByTagName("rs-module");
              for (var d in ((window.RS_toInit = {}),
              (window.RS_prioList = []),
              l))
                l.hasOwnProperty(d) &&
                  ((window.RS_toInit[l[d].id] = !1),
                  window.RS_prioList.push(l[d].id));
              i.nextSlider = s;
            }
            e.fn.initNextRevslider(s);
          } else c(s);
        });
      },
      initNextRevslider: function (t) {
        window.RS_prioList[0] === t && !1 === window.RS_toInit[t]
          ? ((window.RS_toInit[t] = "waiting"),
            c(t),
            setTimeout(function () {
              e.fn.initNextRevslider(t);
            }, 19))
          : window.RS_prioList[0] === t && "waiting" === window.RS_toInit[t]
          ? setTimeout(function () {
              e.fn.initNextRevslider(t);
            }, 19)
          : window.RS_prioList[0] === t && !0 === window.RS_toInit[t]
          ? (window.RS_prioList.shift(),
            setTimeout(function () {
              e.fn.initNextRevslider(t);
            }, 19))
          : window.RS_prioList[0] !== t &&
            !1 === window.RS_toInit[t] &&
            setTimeout(function () {
              e.fn.initNextRevslider(t);
            }, 19);
      },
      getRSJASONOptions: function (e) {
        delete i[e].option_export.jsFileLocation,
          console.log(JSON.stringify(i[e].option_export));
      },
      getRSVersion: function (e) {
        var t,
          i,
          a = window.SliderRevolutionVersion;
        if (!e) {
          for (var r in ((t = i =
            "---------------------------------------------------------\n"),
          (t += "    Currently Loaded Slider Revolution & SR Modules :\n" + i),
          a))
            a.hasOwnProperty(r) && (t += a[r].alias + ": " + a[r].ver + "\n");
          t += i;
        }
        return e ? a : t;
      },
      revremoveslide: function (t) {
        return this.each(function () {
          var a = this.id;
          if (
            !(t < 0 || t > i[a].slideamount) &&
            i[a] &&
            i[a].slides.length > 0 &&
            (t > 0 || t <= i[a].slides.length)
          ) {
            var r = i.gA(i[a].slides[t], "key");
            (i[a].slideamount = i[a].slideamount - 1),
              (i[a].realslideamount = i[a].realslideamount - 1),
              s("rs-bullet", r, a),
              s("rs-tab", r, a),
              s("rs-thumb", r, a),
              e(i[a].slides[t]).remove(),
              (i[a].slides = o(i[a].slides, t)),
              i[a].carousel &&
                i[a].carousel.slides &&
                (i[a].carousel.slides = o(i[a].carousel.slides, t)),
              (i[a].thumbs = o(i[a].thumbs, t)),
              i.updateNavIndexes && i.updateNavIndexes(a),
              t <= i[a].pr_active_key &&
                (i[a].pr_active_key = i[a].pr_active_key - 1);
          }
        });
      },
      revaddcallback: function (e) {
        return this.each(function () {
          i[this.id] &&
            (i[this.id].callBackArray === t && (i[this.id].callBackArray = []),
            i[this.id].callBackArray.push(e));
        });
      },
      revgetparallaxproc: function () {
        if (i[this[0].id]) return i[this[0].id].scrollproc;
      },
      revdebugmode: function () {},
      revscroll: function (t) {
        return this.each(function () {
          var i = e(this);
          e("body,html").animate(
            { scrollTop: i.offset().top + i.height() - t + "px" },
            { duration: 400 }
          );
        });
      },
      revredraw: function () {
        return this.each(function () {
          m(this.id);
        });
      },
      revkill: function () {
        return this.each(function () {
          var a = this.id;
          tpGS.gsap.killDelayedCallsTo(i.showHideNavElements),
            i[a].c.data("conthover", 1),
            i[a].c.data("conthoverchanged", 1),
            i[a].c.trigger("revolution.slide.onpause");
          var r = i[a].cpar.find("rs-progress");
          i[a].c[0].opt;
          (i[a].tonpause = !0),
            i[a].c.trigger("stoptimer"),
            (i[a].sliderisrunning = !1);
          var o = "resize.revslider-" + i[a].c.attr("id");
          e(window).unbind(o),
            tpGS.gsap.killTweensOf(i[a].c.find("*"), !1),
            tpGS.gsap.killTweensOf(i[a].c, !1),
            i[a].c.unbind("hover, mouseover, mouseenter,mouseleave, resize"),
            (o = "resize.revslider-" + i[a].c.attr("id")),
            e(window).off(o),
            i[a].c.find("*").each(function () {
              var i = e(this);
              i.unbind(
                "on, hover, mouseenter,mouseleave,mouseover, resize,restarttimer, stoptimer"
              ),
                i.off("on, hover, mouseenter,mouseleave,mouseover, resize"),
                i.data("mySplitText", null),
                i.data("ctl", null),
                i.data("tween") != t && i.data("tween").kill(),
                i.data("pztl") != t && i.data("pztl").kill(),
                i.data("timeline_out") != t && i.data("timeline_out").kill(),
                i.data("timeline") != t && i.data("timeline").kill(),
                i.remove(),
                i.empty(),
                (i = null);
            }),
            tpGS.gsap.killTweensOf(i[a].c.find("*"), !1),
            tpGS.gsap.killTweensOf(i[a].c, !1),
            r.remove();
          try {
            i[a].c.closest("rs-fullwidth-wrap").remove();
          } catch (e) {}
          try {
            i[a].c.closest("rs-module-wrap").remove();
          } catch (e) {}
          try {
            i[a].c.remove();
          } catch (e) {}
          i[a].c.empty(), i[a].c.html(), (i[a].c = null);
        });
      },
      revpause: function () {
        return this.each(function () {
          var a = e(this);
          a != t &&
            a.length > 0 &&
            e("body").find("#" + a.attr("id")).length > 0 &&
            (a.data("conthover", 1),
            a.data("conthoverchanged", 1),
            a.trigger("revolution.slide.onpause"),
            (i[this.id].tonpause = !0),
            a.trigger("stoptimer"));
        });
      },
      revresume: function () {
        return this.each(function () {
          if (i[this.id] !== t) {
            var a = e(this);
            a.data("conthover", 0),
              a.data("conthoverchanged", 1),
              a.trigger("revolution.slide.onresume"),
              (i[this.id].tonpause = !1),
              a.trigger("starttimer");
          }
        });
      },
      revmodal: function (a) {
        var r = this instanceof e ? this[0] : this,
          o = r.id;
        i[r.id] !== t && i.revModal(o, a);
      },
      revstart: function () {
        var a = this instanceof e ? this[0] : this;
        return i[a.id] === t
          ? (console.log("Slider is Not Existing"), !1)
          : i[a.id].sliderisrunning
          ? (console.log("Slider Is Running Already"), !1)
          : ((i[a.id].c = e(a)),
            (i[a.id].canvas = i[a.id].c.find("rs-slides")),
            u(a.id),
            !0);
      },
      revnext: function () {
        return this.each(function () {
          i[this.id] !== t &&
            i.callingNewSlide(this.id, 1, "carousel" === i[this.id].sliderType);
        });
      },
      revprev: function () {
        return this.each(function () {
          i[this.id] !== t &&
            i.callingNewSlide(
              this.id,
              -1,
              "carousel" === i[this.id].sliderType
            );
        });
      },
      revmaxslide: function () {
        return e(this).find("rs-slide").length;
      },
      revcurrentslide: function () {
        if (i[e(this)[0].id] !== t)
          return parseInt(i[e(this)[0].id].pr_active_key, 0) + 1;
      },
      revlastslide: function () {
        return e(this).find("rs-slide").length;
      },
      revshowslide: function (e) {
        return this.each(function () {
          i[this.id] !== t &&
            e !== t &&
            i.callingNewSlide(this.id, "to" + (e - 1));
        });
      },
      revcallslidewithid: function (e) {
        return this.each(function () {
          i[this.id] !== t &&
            i.callingNewSlide(this.id, e, "carousel" === i[this.id].sliderType);
        });
      },
    }),
    (i = e.fn.revolution),
    e.extend(!0, i, {
      sA: function (e, t, i) {
        e && e.setAttribute && e.setAttribute("data-" + t, i);
      },
      gA: function (e, i, a) {
        return e === t
          ? t
          : e.hasAttribute &&
            e.hasAttribute("data-" + i) &&
            e.getAttribute("data-" + i) !== t &&
            null !== e.getAttribute("data-" + i)
          ? e.getAttribute("data-" + i)
          : a !== t
          ? a
          : t;
      },
      iWA: function (e, a) {
        return i[e].justifyCarousel
          ? "static" === a
            ? i[e].carousel.wrapwidth
            : i[e].carousel.slide_widths[a !== t ? a : i[e].carousel.focused]
          : i[e].gridwidth[i[e].level];
      },
      iHE: function (e, t) {
        return i[e].useFullScreenHeight
          ? i[e].conh
          : i[e].gridheight[i[e].level];
      },
      updateFixedScrollTimes: function (e) {
        !0 === i[e].sbtimeline.set &&
          !0 === i[e].sbtimeline.fixed &&
          "auto" !== i[e].sliderLayout &&
          ((i[e].sbtimeline.rest = i[e].duration - i[e].sbtimeline.fixEnd),
          (i[e].sbtimeline.time =
            i[e].duration - (i[e].sbtimeline.fixStart + i[e].sbtimeline.rest)),
          (i[e].sbtimeline.extended = i[e].sbtimeline.time / 10));
      },
      callContWidthManager: function (e) {
        f(e);
      },
      showModalCover: function (a, r, o) {
        switch (o) {
          case "show":
            var s;
            r.spin !== t &&
              "off" !== r.spin &&
              (s = i.buildSpinner(
                a,
                "spinner" + r.spin,
                r.spinc,
                "modalspinner"
              )),
              r.bg !== t &&
              !1 !== r.bg &&
              "false" !== r.bg &&
              "transparent" !== r.bg
                ? ((i[a].modalLoader = e(
                    '<rs-modal-cover data-rid="' +
                      a +
                      '" id="' +
                      a +
                      '_modal_bg"></rs-modal-cover>'
                  )),
                  e("body").append(i[a].modalLoader),
                  tpGS.gsap.set(i[a].modalLoader, {
                    display: "none",
                    background: r.bg,
                    opacity: 0,
                  }),
                  tpGS.gsap.to(i[a].modalLoader, 0.5, {
                    display: "block",
                    opacity: 1,
                    ease: "power3.inOut",
                  }),
                  s !== t && i[a].modalLoader.append(s))
                : s !== t && i[a].c.append(s);
            break;
          case "hide":
            i[a].modalLoader !== t
              ? (i[a].modalLoader.find(".modalspinner").remove(),
                tpGS.gsap.to(i[a].modalLoader, 2, {
                  delay: 1,
                  display: "none",
                  opacity: 0,
                  ease: "power3.in",
                }))
              : i[a].c.find(".modalspinner").remove();
        }
      },
      revModal: function (a, r) {
        if (a !== t && i[a] !== t && "clicked" !== i[a].modal.closeProtection) {
          if (!0 === i[a].modal.closeProtection)
            return (
              i[a].modal.closeProtection,
              void setTimeout(function () {
                (i[a].modal.closeProtection = !1), i.revModal(a, r);
              }, 750)
            );
          switch (r.mode) {
            case "show":
              if (!0 === i[a].modal.isLive) return;
              (i[a].modal.isLive = !0),
                (r.slide = r.slide === t ? "to0" : r.slide),
                i[a].modal.bodyclass !== t &&
                  i[a].modal.bodyclass.length >= 0 &&
                  document.body.classList.add(i[a].modal.bodyclass),
                tpGS.gsap.to(i[a].modal.bg, 2, {
                  display: "block",
                  opacity: 1,
                  ease: "power3.inOut",
                }),
                tpGS.gsap.set(i[a].modal.c, {
                  display:
                    "auto" === i[a].sliderLayout ? "inline-block" : "block",
                  opacity: 0,
                }),
                tpGS.gsap.set(i[a].cpar, { display: "block", opacity: 1 });
              var o = { a: 0 };
              tpGS.gsap.fromTo(
                o,
                0.01,
                { a: 0 },
                {
                  a: 10,
                  ease: "power3.inOut",
                  onComplete: function () {
                    i[a].sliderisrunning
                      ? i.callingNewSlide(a, r.slide)
                      : ("to0" !== r.slide &&
                          (i[a].startWithSlideKey = r.slide),
                        u(a));
                  },
                }
              ),
                tpGS.gsap.fromTo(
                  [i[a].modal.c],
                  0.01,
                  { opacity: 0 },
                  {
                    opacity: 1,
                    delay: 0.5,
                    ease: "power3.inOut",
                    onComplete: function () {},
                  }
                ),
                (window.overscrollhistory = document.body.style.overflow),
                (document.body.style.overflow = "hidden");
              break;
            case "close":
              I(a),
                (document.body.style.overflow = window.overscrollhistory),
                i[a].modal.bodyclass !== t &&
                  i[a].modal.bodyclass.length >= 0 &&
                  document.body.classList.remove(i[a].modal.bodyclass),
                tpGS.gsap.to(i[a].modal.bg, 2, {
                  display: "none",
                  opacity: 0,
                  ease: "power3.inOut",
                }),
                tpGS.gsap.to(i[a].modal.c, 0.3, {
                  display: "none",
                  delay: 0.5,
                  opacity: 0,
                  onComplete: function () {
                    tpGS.gsap.set(i[a].cpar, { display: "none", opacity: 0 }),
                      e(document).trigger("revolution.all.resize");
                  },
                }),
                (i[a].modal.closeProtection = !0),
                setTimeout(function () {
                  (i[a].modal.isLive = !1), (i[a].modal.closeProtection = !1);
                }, 750);
              break;
            case "init":
              if (
                ((window.RS_60_MODALS =
                  window.RS_60_MODALS === t ? [] : window.RS_60_MODALS),
                -1 === e.inArray(i[a].modal.alias, window.RS_60_MODALS) &&
                  window.RS_60_MODALS.push(i[a].modal.alias),
                i[a].modal.listener === t)
              ) {
                (i[a].modal.c = e("#" + a + "_modal")),
                  (i[a].modal.bg = e(
                    '<rs-modal-cover data-rid="' +
                      a +
                      '" id="' +
                      a +
                      '_modal_bg"></rs-modal-cover>'
                  )),
                  "auto" === i[a].sliderLayout && i[a].modal.cover
                    ? e("body").append(i[a].modal.bg)
                    : i[a].modal.c.append(i[a].modal.bg),
                  (i[a].modal.c[0].className +=
                    "rs-modal-" + i[a].sliderLayout);
                var s = {
                  left:
                    "auto" === i[a].sliderLayout
                      ? "center" === i[a].modal.horizontal
                        ? "50%"
                        : "left" === i[a].modal.horizontal
                        ? "0px"
                        : "auto"
                      : "0px",
                  right:
                    "auto" === i[a].sliderLayout
                      ? "center" === i[a].modal.horizontal
                        ? "auto"
                        : "left" === i[a].modal.horizontal
                        ? "auto"
                        : "0px"
                      : "0px",
                  top:
                    "auto" === i[a].sliderLayout ||
                    "fullwidth" === i[a].sliderLayout
                      ? "middle" === i[a].modal.vertical
                        ? "50%"
                        : "top" === i[a].modal.vertical
                        ? "0px"
                        : "auto"
                      : "0px",
                  bottom:
                    "auto" === i[a].sliderLayout ||
                    "fullwidth" === i[a].sliderLayout
                      ? "middle" === i[a].modal.vertical
                        ? "auto"
                        : "top" === i[a].modal.vertical
                        ? "auto"
                        : "0px"
                      : "0px",
                  y:
                    ("auto" === i[a].sliderLayout ||
                      "fullwidth" === i[a].sliderLayout) &&
                    "middle" === i[a].modal.vertical
                      ? "-50%"
                      : 0,
                  x:
                    "auto" === i[a].sliderLayout &&
                    "center" === i[a].modal.horizontal
                      ? "-50%"
                      : 0,
                };
                if (
                  ("-50%" === s.y && (s.filter = "blur(0px)"),
                  tpGS.gsap.set(
                    i[a].modal.c,
                    "auto" === i[a].sliderLayout ||
                      "fullscreen" === i[a].sliderLayout
                      ? e.extend(!0, s, { opacity: 0, display: "none" })
                      : { opacity: 0, display: "none" }
                  ),
                  "fullwidth" === i[a].sliderLayout &&
                    tpGS.gsap.set(i[a].modal.c.find("rs-module-wrap"), s),
                  (!1 !== i[a].modal.cover && "false" !== i[a].modal.cover) ||
                    (i[a].modal.coverColor = "transparent"),
                  tpGS.gsap.set(i[a].modal.bg, {
                    display: "none",
                    background: i[a].modal.coverColor,
                    opacity: 0,
                  }),
                  e(document).on(
                    "RS_OPENMODAL_" + i[a].modal.alias,
                    function (e, t) {
                      i.revModal(a, { mode: "show", slide: t });
                    }
                  ),
                  e(document).on("click", "rs-modal-cover", function () {
                    i.revModal(i.gA(this, "rid"), { mode: "close" });
                  }),
                  (i[a].modal.listener = !0),
                  i[a].modal.trigger !== t)
                ) {
                  var n,
                    l = i[a].modal.trigger.split(";");
                  for (o in ((i[a].modal.trigger = {}), l))
                    if (l.hasOwnProperty(o))
                      switch ((n = l[o].split(":"))[0]) {
                        case "t":
                          i[a].modal.trigger.time = parseInt(n[1], 0);
                          break;
                        case "s":
                          i[a].modal.trigger.scroll = n[1];
                          break;
                        case "so":
                          i[a].modal.trigger.scrollo = parseInt(n[1], 0);
                          break;
                        case "e":
                          i[a].modal.trigger.event = n[1];
                      }
                  if (
                    (i[a].modal.trigger.time !== t &&
                      0 !== i[a].modal.trigger.time &&
                      setTimeout(function () {
                        e(document).trigger("RS_OPENMODAL_" + i[a].modal.alias);
                      }, i[a].modal.trigger.time),
                    i[a].modal.trigger.scrollo !== t ||
                      i[a].modal.trigger.scroll !== t)
                  ) {
                    i[a].modal.trigger.scroll !== t &&
                      e(i[a].modal.trigger.scroll)[0] !== t &&
                      (i[a].modal.trigger.scroll = e(
                        i[a].modal.trigger.scroll
                      )[0]);
                    var d = function () {
                      if (i[a].modal.trigger.scroll !== t)
                        var r = i[
                          a
                        ].modal.trigger.scroll.getBoundingClientRect();
                      ((i[a].modal.trigger.scroll !== t &&
                        Math.abs(
                          r.top +
                            (r.bottom - r.top) / 2 -
                            window.innerHeight / 2
                        ) < 50) ||
                        (i[a].modal.trigger.scrollo !== t &&
                          Math.abs(
                            i[a].modal.trigger.scrollo - window.scrollY
                          ) < 100)) &&
                        (e(document).trigger(
                          "RS_OPENMODAL_" + i[a].modal.alias
                        ),
                        document.removeEventListener("scroll", d));
                    };
                    document.addEventListener("scroll", d, {
                      id: a,
                      passive: !0,
                    });
                  }
                  i[a].modal.trigger.event !== t &&
                    e(document).on(i[a].modal.trigger.event, function () {
                      e(document).trigger("RS_OPENMODAL_" + i[a].modal.alias);
                    });
                }
              }
          }
        }
      },
      smartConvertDivs: function (e) {
        var t = "";
        if ("string" == typeof e && e.indexOf("#") >= 0) {
          var i = e.split(","),
            a = i.length - 1;
          for (var r in i)
            t =
              "string" == typeof i[r] && "#" === i[r][0]
                ? t + (i[r][1] / i[r][3]) * 100 + "%" + (r < a ? "," : "")
                : t + i[r] + (r < a ? "," : "");
        } else t = e;
        return t;
      },
      revToResp: function (e, i, a, r) {
        if ((e = e === t ? a : e) !== t) {
          if (
            ((r = r === t ? "," : r),
            "boolean" != typeof e && ("object" != typeof e || Array.isArray(e)))
          ) {
            try {
              e = e.replace(/[[\]]/g, "").replace(/\'/g, "").split(r);
            } catch (e) {}
            for (e = Array.isArray(e) ? e : [e]; e.length < i; )
              e[e.length] = e[e.length - 1];
          }
          return e;
        }
      },
      loadImages: function (a, r, o, s) {
        if (a !== t && 0 !== a.length) {
          var n = [];
          if (e.isArray(a))
            for (var l in a) a.hasOwnProperty(l) && a[l] !== t && n.push(a[l]);
          else n.push(a);
          for (var d in n)
            if (n.hasOwnProperty(d)) {
              var c = n[d].querySelectorAll("img, rs-sbg, .rs-svg");
              for (var l in c)
                if (c.hasOwnProperty(l)) {
                  var p = g(c[l], t, r),
                    u =
                      p !== t
                        ? p
                        : i.gA(c[l], "svg_src") != t
                        ? i.gA(c[l], "svg_src")
                        : c[l].src === t
                        ? e(c[l]).data("src")
                        : c[l].src,
                    f = i.gA(c[l], "svg_src") != t ? "svg" : "img";
                  u !== t &&
                    0 ==
                      i[r].loadqueue.filter(function (e) {
                        return e.src === u;
                      }).length &&
                    i[r].loadqueue.push({
                      src: u,
                      index: l,
                      starttoload: e.now(),
                      type: f || "img",
                      prio: o,
                      progress:
                        c[l].complete && u === c[l].src ? "loaded" : "prepared",
                      static: s,
                      width: c[l].complete && u === c[l].src ? c[l].width : t,
                      height: c[l].complete && u === c[l].src ? c[l].height : t,
                    });
                }
            }
          L(r);
        }
      },
      waitForCurrentImages: function (r, o, s) {
        if (r !== t && 0 !== r.length && i[o] !== t) {
          var n = !1,
            l = [];
          if (e.isArray(r))
            for (var d in r) r.hasOwnProperty(d) && r[d] !== t && l.push(r[d]);
          else l.push(r);
          for (var c in l)
            if (l.hasOwnProperty(c)) {
              var p = l[c].querySelectorAll("img, rs-sbg, .rs-svg");
              for (d in p)
                if (
                  p.hasOwnProperty(d) &&
                  "length" !== d &&
                  !(p[d].className.indexOf("rs-pzimg") >= 0)
                ) {
                  var u = e(p[d]).data(),
                    f = g(p[d], t, o),
                    h =
                      f !== t
                        ? f
                        : i.gA(p[d], "svg_src") != t
                        ? i.gA(p[d], "svg_src")
                        : p[d].src === t
                        ? e(p[d]).data("src")
                        : p[d].src,
                    m = i.getLoadObj(o, h);
                  if (
                    (i.sA(p[d], "src-rs-ref", h),
                    u.loaded === t &&
                      m !== t &&
                      m.progress &&
                      "loaded" == m.progress)
                  ) {
                    if (((p[d].src = m.src), "img" == m.type)) {
                      if (u.slidebgimage) {
                        (-1 == m.src.indexOf("images/transparent.png") &&
                          -1 == m.src.indexOf("assets/transparent.png")) ||
                        u.bgcolor === t
                          ? (p[d].style.backgroundImage =
                              'url("' + m.src + '")')
                          : u.bgcolor !== t &&
                            (p[d].style.background = u.bgcolor),
                          i.sA(l[c], "owidth", m.width),
                          i.sA(l[c], "oheight", m.height);
                        var v = l[c].getElementsByTagName("rs-sbg-wrap");
                        if (
                          (v.length > 0 &&
                            (i.sA(v[0], "owidth", m.width),
                            i.sA(v[0], "oheight", m.height)),
                          "carousel" === i[o].sliderType)
                        ) {
                          var y = e(v);
                          y.data("panzoom") !== t &&
                            y.data("pztl") === t &&
                            i.startPanZoom(
                              y,
                              o,
                              0,
                              i.getSlideIndex(o, i.gA(l[c], "key")),
                              !0
                            );
                        }
                      }
                    } else
                      "svg" == m.type &&
                        "loaded" == m.progress &&
                        (p[d].innerHTML = m.innerHTML);
                    u.loaded = !0;
                  }
                  m &&
                    m.progress &&
                    m.progress.match(/inprogress|inload|prepared/g) &&
                    (!m.error && e.now() - m.starttoload < 3e3
                      ? (n = !0)
                      : ((m.progress = "failed"),
                        m.reported_img ||
                          ((m.reported_img = !0),
                          console.log(h + "  Could not be loaded !")))),
                    1 != i[o].youtubeapineeded ||
                      (window.YT && YT.Player != t) ||
                      (n = A("youtube", o)),
                    1 != i[o].vimeoapineeded ||
                      window.Vimeo ||
                      (n = A("vimeo", o));
                }
            }
          !a &&
            i[o].audioqueue &&
            i[o].audioqueue.length > 0 &&
            e.each(i[o].audioqueue, function (t, i) {
              i.status &&
                "prepared" === i.status &&
                e.now() - i.start < i.waittime &&
                (n = !0);
            }),
            e.each(i[o].loadqueue, function (t, i) {
              !0 === i.static &&
                (("loaded" != i.progress && "done" !== i.progress) ||
                  "failed" === i.progress) &&
                ("failed" != i.progress || i.reported
                  ? !i.error && e.now() - i.starttoload < 5e3
                    ? (n = !0)
                    : i.reported || (i.reported = R(i.src, i.error))
                  : (i.reported = R(i.src, i.error)));
            }),
            n
              ? tpGS.gsap.delayedCall(0.18, i.waitForCurrentImages, [r, o, s])
              : s !== t && tpGS.gsap.delayedCall(0.18, s);
        }
      },
      updateVisibleArea: function (a) {
        for (var r in ((i[a].viewPort.visible_area = i.revToResp(
          i[a].viewPort.visible_area,
          i[a].rle,
          "200px"
        )),
        (i[a].viewPort.vaType = new Array(4)),
        i[a].viewPort.visible_area))
          i[a].viewPort.visible_area.hasOwnProperty(r) &&
            (e.isNumeric(i[a].viewPort.visible_area[r]) &&
              (i[a].viewPort.visible_area[r] += "%"),
            i[a].viewPort.visible_area[r] !== t &&
              (i[a].viewPort.vaType[r] =
                i[a].viewPort.visible_area[r].indexOf("%") >= 0 ? "%" : "px"),
            (i[a].viewPort.visible_area[r] = parseInt(
              i[a].viewPort.visible_area[r],
              0
            )),
            (i[a].viewPort.visible_area[r] =
              "%" == i[a].viewPort.vaType[r]
                ? i[a].viewPort.visible_area[r] / 100
                : i[a].viewPort.visible_area[r]));
      },
      fontLoaded: function (e) {
        return (
          (i.monoWidth = i.monoWidth === t ? n("monospace") : i.monoWidth),
          (i.sansWidth = i.sansWidth === t ? n("sans-serif") : i.sansWidth),
          (i.serifWidth = i.serifWidth === t ? n("serif") : i.serifWidth),
          i.monoWidth !== n(e + ",monospace") ||
            i.sansWidth !== n(e + ",sans-serif") ||
            i.serifWidth !== n(e + ",serif")
        );
      },
      getversion: function () {
        return "Slider Revolution 6.2.1";
      },
      currentSlideIndex: function (e) {
        return i[e].pr_active_key;
      },
      iOSVersion: function () {
        return (
          !!(
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/iPad/i)
          ) && navigator.userAgent.match(/OS 4_\d like Mac OS X/i)
        );
      },
      isIE: function (t, i) {
        var a = e('<div style="display:none;"/>').appendTo(e("body"));
        a.html(
          "\x3c!--[if " +
            (i || "") +
            " IE " +
            (t || "") +
            "]><a>&nbsp;</a><![endif]--\x3e"
        );
        var r = a.find("a").length;
        return a.remove(), r;
      },
      is_mobile: function () {
        var e = [
            "android",
            "webos",
            "iphone",
            "ipad",
            "blackberry",
            "Android",
            "webos",
            "iPod",
            "iPhone",
            "iPad",
            "Blackberry",
            "BlackBerry",
          ],
          i = !1;
        if (window.orientation !== t) i = !0;
        else
          for (var a in e)
            e.hasOwnProperty(a) &&
              (i = !!(i || navigator.userAgent.split(e[a]).length > 1) || i);
        return i;
      },
      is_android: function () {
        var e = ["android", "Android"],
          t = !1;
        for (var i in e)
          e.hasOwnProperty(i) &&
            (t = !!(t || navigator.userAgent.split(e[i]).length > 1) || t);
        return t;
      },
      callBackHandling: function (t, a, r) {
        i[t].callBackArray &&
          e.each(i[t].callBackArray, function (e, t) {
            t &&
              t.inmodule &&
              t.inmodule === a &&
              t.atposition &&
              t.atposition === r &&
              t.callback &&
              t.callback.call();
          });
      },
      get_browser: function () {
        var e,
          t = navigator.userAgent,
          i =
            t.match(
              /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
            ) || [];
        return /trident/i.test(i[1])
          ? ((e = /\brv[ :]+(\d+)/g.exec(t) || []), "IE")
          : "Chrome" === i[1] && null != (e = t.match(/\b(OPR|Edge)\/(\d+)/))
          ? e[1].replace("OPR", "Opera")
          : ((i = i[2]
              ? [i[1], i[2]]
              : [navigator.appName, navigator.appVersion, "-?"]),
            null != (e = t.match(/version\/(\d+)/i)) && i.splice(1, 1, e[1]),
            i[0]);
      },
      get_browser_version: function () {
        var e,
          t = navigator.appName,
          i = navigator.userAgent,
          a = i.match(
            /(edge|opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i
          );
        return (
          a && null != (e = i.match(/version\/([\.\d]+)/i)) && (a[2] = e[1]),
          (a = a ? [a[1], a[2]] : [t, navigator.appVersion, "-?"])[1]
        );
      },
      isFirefox: function (e) {
        return (
          (i[e].isFirefox =
            i[e].isFirefox === t
              ? "Firefox" === i.get_browser()
              : i[e].isFirefox),
          i[e].isFirefox
        );
      },
      isSafari11: function () {
        return (
          "safari" === e.trim(i.get_browser().toLowerCase()) &&
          parseFloat(i.get_browser_version()) >= 11
        );
      },
      getHorizontalOffset: function (e, t) {
        var i = d(e, ".outer-left"),
          a = d(e, ".outer-right");
        return "left" == t
          ? i
          : "right" == t
          ? a
          : "all" == t
          ? { left: i, right: a, both: i + a }
          : i + a;
      },
      getComingSlide: function (a, r) {
        var o =
            i[a].pr_next_key !== t
              ? i[a].pr_next_key
              : i[a].pr_processing_key !== t
              ? i[a].pr_processing_key
              : i[a].pr_active_key,
          s = 0;
        if (
          ((s = 0),
          i[a].pr_active_slide !== t &&
            i[a].pr_active_slide.hasClass("not-in-nav") &&
            (o = i[a].pr_lastshown_key),
          (r !== t && e.isNumeric(r)) || (r !== t && r.match(/to/g)))
        )
          s =
            1 === r || -1 === r
              ? parseInt(o, 0) + r < 0
                ? i[a].slideamount - 1
                : parseInt(o, 0) + r >= i[a].slideamount
                ? 0
                : parseInt(o, 0) + r
              : (r = e.isNumeric(r) ? r : parseInt(r.split("to")[1], 0)) < 0
              ? 0
              : r > i[a].slideamount - 1
              ? i[a].slideamount - 1
              : r;
        else if (r)
          for (var n in i[a].slides)
            i[a].slides.hasOwnProperty(n) &&
              (s =
                i[a].slides &&
                i[a].slides[n] &&
                i.gA(i[a].slides[n], "key") === r
                  ? n
                  : s);
        return { nindex: s, aindex: o };
      },
      callingNewSlide: function (e, a, r) {
        var o = i.getComingSlide(e, a);
        (i[e].pr_next_key = o.nindex),
          (i[e].sdir = i[e].pr_next_key < i[e].pr_active_key ? 1 : 0),
          r &&
            i[e].carousel !== t &&
            (i[e].carousel.focused = i[e].pr_next_key),
          i[e].ctNavElement
            ? (i[e].ctNavElement = !1)
            : i[e].c.trigger("revolution.nextslide.waiting"),
          ((o.aindex === i[e].pr_next_key &&
            o.aindex === i[e].pr_lastshown_key) ||
            (i[e].pr_next_key !== o.aindex && -1 != i[e].pr_next_key)) &&
            z(e, r);
      },
      getLoadObj: function (e, a) {
        var r = i[e].loadqueue.filter(function (e) {
          return e.src === a;
        })[0];
        return r === t ? { src: a } : r;
      },
      updateDimensions: function (e) {
        (i[e].lastconw = i[e].conw),
          (i[e].lastconh = i[e].conh),
          (i[e].conw = i[e].c.width()),
          (i[e].conh = i[e].infullscreenmode
            ? i[e].minHeight
            : i[e].c.height()),
          (i[e].ulw = i[e].canvas.width()),
          (i[e].ulh = i[e].canvas.height());
      },
      getSlideIndex: function (e, t) {
        var a = !1;
        for (var r in i[e].slides) {
          if (!i[e].slides.hasOwnProperty(r) || !1 !== a) continue;
          a = i.gA(i[e].slides[r], "key") === t ? r : a;
        }
        return !1 === a ? 0 : a;
      },
      loadUpcomingContent: function (e) {
        if ("smart" == i[e].lazyType) {
          var t = [],
            a = parseInt(
              i.getSlideIndex(e, i.gA(i[e].pr_next_slide[0], "key")),
              0
            ),
            r = a - 1 < 0 ? i[e].realslideamount - 1 : a - 1,
            o = a + 1 == i[e].realslideamount ? 0 : a + 1;
          r !== a && t.push(i[e].slides[r]),
            o !== a && t.push(i[e].slides[o]),
            t.length > 0 &&
              (i.loadImages(t, e, 2),
              i.waitForCurrentImages(t, e, function () {}));
        }
      },
      setSize: function (a, r) {
        var o,
          s = parseInt(i[a].top_outer || 0) + parseInt(i[a].bottom_outer || 0),
          n =
            "carousel" == i[a].sliderType
              ? parseInt(i[a].carousel.padding_top || 0, 0)
              : 0,
          l =
            "carousel" == i[a].sliderType
              ? parseInt(i[a].carousel.padding_bottom || 0, 0)
              : 0,
          d = 0,
          c = 0,
          p = 0,
          g = i[a].pr_processing_key || i[a].pr_active_key || 0,
          u = i[a].pr_active_key || 0;
        if (
          (i[a].blockSpacing !== t &&
            tpGS.gsap.set(i[a].blockSpacing.block, {
              paddingLeft: i[a].blockSpacing.left[i[a].level],
              paddingRight: i[a].blockSpacing.right[i[a].level],
              marginTop: i[a].blockSpacing.top[i[a].level],
              marginBottom: i[a].blockSpacing.bottom[i[a].level],
            }),
          (i[a].minHeight = i[a].minHeight === t ? 0 : i[a].minHeight || 0),
          (i[a].paddings =
            i[a].paddings === t
              ? {
                  top: parseInt(i[a].cpar.css("paddingTop"), 0) || 0,
                  bottom: parseInt(i[a].cpar.css("paddingBottom"), 0) || 0,
                }
              : i[a].paddings),
          i[a].rowzones && i[a].rowzones.length > 0)
        ) {
          if (i[a].rowzones[g] !== t)
            for (o = 0; o < i[a].rowzones[g].length; o++)
              d += i[a].rowzones[g][o][0].offsetHeight;
          if (u !== g)
            for (o = 0; o < i[a].rowzones[u].length; o++)
              c += i[a].rowzones[u][o][0].offsetHeight;
        }
        if (i[a].srowzones && i[a].srowzones.length > 0)
          for (o = 0; o < i[a].srowzones.length; o++)
            p += i[a].srowzones[o][0].offsetHeight;
        d = d < p ? p : d;
        var f = Math.max(
          Math.max(i[a].minHeight, i[a].gridheight[i[a].level]),
          d
        );
        if (
          ((f = 0 !== i[a].maxHeight ? Math.min(i[a].maxHeight, f) : f),
          "fullwidth" != i[a].sliderLayout ||
            i[a].autoHeight ||
            tpGS.gsap.set(i[a].c, { maxHeight: f + "px" }),
          i[a].c.css({ marginTop: n, marginBottom: l }),
          (i[a].width = i[a].canvas.width()),
          (i[a].height = i[a].canvas.height()),
          "fullscreen" == i[a].sliderLayout || i[a].infullscreenmode)
        ) {
          var h = e(window).height();
          if (i[a].fullScreenOffsetContainer != t) {
            var m = ("" + i[a].fullScreenOffsetContainer).split(",");
            for (var v in m)
              m.hasOwnProperty(v) && (h -= e(m[v]).outerHeight(!0) || 0);
          }
          i[a].fullScreenOffset != t &&
          !e.isNumeric(i[a].fullScreenOffset) &&
          i[a].fullScreenOffset.split("%").length > 1
            ? (h -=
                (e(window).height() * parseInt(i[a].fullScreenOffset, 0)) / 100)
            : i[a].fullScreenOffset != t &&
              i[a].fullScreenOffset.length > 0 &&
              e.isNumeric(parseInt(i[a].fullScreenOffset, 0)) &&
              (h -= parseInt(i[a].fullScreenOffset, 0)),
            (i[a].height = Math.max(d, Math.max(h - s, i[a].minHeight))),
            u !== g &&
              ((i[a].currentSlideHeight = Math.max(
                c,
                Math.max(h - s, i[a].minHeight)
              )),
              (i[a].slides[u].style.maxHeight =
                i[a].currentSlideHeight !== i[a].height
                  ? i[a].currentSlideHeight + "px"
                  : "none")),
            i[a].cpar.height(i[a].height),
            i[a].c.css({ height: "100%" });
        } else
          (i[a].height = Math.round(
            i[a].gridheight[i[a].level] *
              (i[a].keepBPHeight ? 1 : i[a].width / i[a].gridwidth[i[a].level])
          )),
            (i[a].height = Math.max(
              d,
              Math.max(
                i[a].autoHeight
                  ? i[a].height
                  : Math.min(i[a].height, i[a].gridheight[i[a].level]),
                i[a].minHeight
              )
            )),
            !1 !== r && i[a].c.height(i[a].height);
        var b =
            n + l + s + i[a].height + i[a].paddings.top + i[a].paddings.bottom,
          _ = { height: b };
        if (
          (!1 !== r &&
            (i[a].c.closest("rs-fullwidth-wrap").find("rs-fw-forcer").css(_),
            i[a].c.closest("rs-module-wrap").css(_)),
          i[a].sbtimeline.set &&
            i[a].sbtimeline.fixed &&
            ((i[a].curheight = b),
            i[a].sbtimeline.extended === t && i.updateFixedScrollTimes(a),
            tpGS.gsap.set(i[a].forcer, {
              height: 2 * b + i[a].sbtimeline.extended,
            })),
          i[a].middleZones &&
            i[a].middleZones.length > 0 &&
            i[a].middleZones[g] !== t)
        )
          for (o = 0; o < i[a].middleZones[g].length; o++)
            i[a].middleZones[g][o].style.top =
              Math.round(b / 2 - i[a].middleZones[g][o].offsetHeight / 2) +
              "px";
        if (i[a].smiddleZones && i[a].smiddleZones.length > 0)
          for (o = 0; o < i[a].smiddleZones.length; o++)
            i[a].smiddleZones[o].style.top =
              Math.round(b / 2 - i[a].smiddleZones[o].offsetHeight / 2) + "px";
        y(a);
      },
      enterInViewPort: function (a) {
        i[a].waitForCountDown && (P(a), (i[a].waitForCountDown = !1)),
          i[a].waitForFirstSlide &&
            (z(a),
            (i[a].waitForFirstSlide = !1),
            setTimeout(function () {
              i[a].c.removeClass("tp-waitforfirststart");
            }, 500)),
          ("playing" != i[a].sliderlaststatus && i[a].sliderlaststatus != t) ||
            i[a].c.trigger("starttimer"),
          i[a].lastplayedvideos != t &&
            i[a].lastplayedvideos.length > 0 &&
            e.each(i[a].lastplayedvideos, function (e, t) {
              i.playVideo(t, a);
            });
      },
      leaveViewPort: function (a) {
        (i[a].sliderlaststatus = i[a].sliderstatus),
          i[a].c.trigger("stoptimer"),
          i[a].playingvideos != t &&
            i[a].playingvideos.length > 0 &&
            ((i[a].lastplayedvideos = e.extend(!0, [], i[a].playingvideos)),
            i[a].playingvideos &&
              e.each(i[a].playingvideos, function (e, t) {
                (i[a].leaveViewPortBasedStop = !0),
                  i.stopVideo && i.stopVideo(t, a);
              }));
      },
      unToggleState: function (e) {
        if (e !== t)
          for (var i = 0; i < e.length; i++)
            try {
              document.getElementById(e[i]).classList.remove("rs-tc-active");
            } catch (e) {}
      },
      toggleState: function (e) {
        if (e !== t)
          for (var i = 0; i < e.length; i++)
            try {
              document.getElementById(e[i]).classList.add("rs-tc-active");
            } catch (e) {}
      },
      swaptoggleState: function (e) {
        if (e != t && e.length > 0)
          for (var a = 0; a < e.length; a++) {
            var r = document.getElementById(e[a]);
            if (
              i.gA(r, "toggletimestamp") !== t &&
              new Date().getTime() - i.gA(r, "toggletimestamp") < 250
            )
              return;
            i.sA(r, "toggletimestamp", new Date().getTime()),
              null !== r &&
                (r.className.indexOf("rs-tc-active") >= 0
                  ? r.classList.remove("rs-tc-active")
                  : r.classList.add("rs-tc-active"));
          }
      },
      lastToggleState: function (e) {
        var i;
        if (e !== t)
          for (var a = 0; a < e.length; a++) {
            var r = document.getElementById(e[a]);
            i =
              !0 === i ||
              (null !== r && r.className.indexOf("rs-tc-active") >= 0) ||
              i;
          }
        return i;
      },
      revCheckIDS: function (a, r) {
        if (i.gA(r, "idcheck") === t) {
          var o = r.id,
            s = e.inArray(r.id, window.RSANYID),
            n = -1;
          -1 !== s &&
            ((n = e.inArray(r.id, i[a].anyid)),
            (window.RSANYID_sliderID[s] === a && -1 === n) ||
              ((r.id = r.id + "_" + Math.round(9999 * Math.random())),
              console.log(
                "Warning - ID:" + o + " exists already. New Runtime ID:" + r.id
              ),
              (s = n = -1))),
            -1 === n && i[a].anyid.push(r.id),
            -1 === s &&
              (window.RSANYID.push(r.id), window.RSANYID_sliderID.push(a));
        }
        return i.sA(r, "idcheck", !0), r.id;
      },
      buildSpinner: function (i, a, r, o) {
        var s;
        if ("off" !== a) {
          (o = o === t ? "" : o), (r = r === t ? "#ffffff" : r);
          var n = parseInt(a.replace("spinner", ""), 10);
          if (isNaN(n) || n < 6) {
            var l = 'style="background-color:' + r + '"',
              d = o === t || (3 !== n && 4 != n) ? "" : l;
            s = e(
              "<rs-loader " +
                (o === t || (1 !== n && 2 != n) ? "" : l) +
                ' class="' +
                a +
                " " +
                o +
                '"><div ' +
                d +
                ' class="dot1"></div><div ' +
                d +
                ' class="dot2"></div><div ' +
                d +
                ' class="bounce1"></div><div ' +
                d +
                ' class="bounce2"></div><div ' +
                d +
                ' class="bounce3"></div></rs-loader>'
            );
          } else {
            var c,
              p = '<div class="rs-spinner-inner"';
            if (7 === n)
              -1 !== r.search("#")
                ? ((c = r.replace("#", "")),
                  (c =
                    "rgba(" +
                    parseInt(c.substring(0, 2), 16) +
                    ", " +
                    parseInt(c.substring(2, 4), 16) +
                    ", " +
                    parseInt(c.substring(4, 6), 16) +
                    ", "))
                : -1 !== r.search("rgb") &&
                  (c = r
                    .substring(r.indexOf("(") + 1, r.lastIndexOf(")"))
                    .split(",")).length > 2 &&
                  (c =
                    "rgba(" +
                    c[0].trim() +
                    ", " +
                    c[1].trim() +
                    ", " +
                    c[2].trim() +
                    ", "),
                c &&
                  "string" == typeof c &&
                  (p +=
                    ' style="border-top-color: ' +
                    c +
                    "0.65); border-bottom-color: " +
                    c +
                    "0.15); border-left-color: " +
                    c +
                    "0.65); border-right-color: " +
                    c +
                    '0.15)"');
            else 12 === n && (p += ' style="background:' + r + '"');
            p += ">";
            for (
              var g = [10, 0, 4, 2, 5, 9, 0, 4, 4, 2][n - 6], u = 0;
              u < g;
              u++
            )
              u > 0 && (p += " "),
                (p += '<span style="background:' + r + '"></span>');
            s = e(
              '<rs-loader class="' +
                a +
                " " +
                o +
                '">' +
                (p += "</div>") +
                "</div></rs-loader>"
            );
          }
          return s;
        }
      },
    });
  var a = i.is_mobile(),
    r =
      (i.is_android(),
      function (e) {
        (i[e].responsiveLevels = i.revToResp(i[e].responsiveLevels, i[e].rle)),
          (i[e].visibilityLevels = i.revToResp(
            i[e].visibilityLevels,
            i[e].rle
          )),
          (i[e].responsiveLevels[0] = 9999),
          (i[e].rle = i[e].responsiveLevels.length || 1),
          (i[e].gridwidth = i.revToResp(i[e].gridwidth, i[e].rle)),
          (i[e].gridheight = i.revToResp(i[e].gridheight, i[e].rle)),
          i[e].editorheight !== t &&
            (i[e].editorheight = i.revToResp(i[e].editorheight, i[e].rle)),
          l(e),
          y(e);
        var a = Math.max(i[e].minHeight, i[e].gridheight[i[e].level] * i[e].bw);
        i[e].editorheight !== t &&
          (a = Math.max(a, i[e].editorheight[i[e].level] * i[e].bw)),
          tpGS.gsap.set(i[e].c, { height: a });
      }),
    o = function (t, i) {
      var a = [];
      return (
        e.each(t, function (e, t) {
          e != i && a.push(t);
        }),
        a
      );
    },
    s = function (t, a, r) {
      i[r].c.find(t).each(function () {
        var t = e(this);
        t.data("key") === a && t.remove();
      });
    },
    n = function (e) {
      window.revFontTestcontainer == t &&
        ((window.revFontTestcontainer = document.createElement("span")),
        (window.revFontTestcontainer.innerHTML = Array(100).join("wi")),
        (window.revFontTestcontainer.style.cssText = [
          "position:absolute",
          "width:auto",
          "font-size:128px",
          "left:-99999px",
        ].join(" !important;"))),
        (window.revFontTestcontainer.style.fontFamily = e),
        document.body.appendChild(window.revFontTestcontainer);
      var i = window.revFontTestcontainer.clientWidth;
      return document.body.removeChild(window.revFontTestcontainer), i;
    },
    l = function (t, a) {
      var r = 9999,
        o = 0,
        s = 0,
        n = e(window).width(),
        l =
          a && 9999 == i[t].responsiveLevels
            ? i[t].visibilityLevels
            : i[t].responsiveLevels;
      l &&
        l.length &&
        e.each(l, function (e, a) {
          n < a &&
            (0 == o || o > parseInt(a)) &&
            ((r = parseInt(a)), (i[t].level = e), (o = parseInt(a))),
            n > a && o < a && ((o = parseInt(a)), (s = e));
        }),
        o < r && (i[t].level = s),
        (i[t].levelForced = i[t].level);
    },
    d = function (t, i) {
      var a = 0;
      return (
        t.find(i).each(function () {
          var t = e(this);
          !t.hasClass("tp-forcenotvisible") &&
            a < t.outerWidth() &&
            (a = t.outerWidth());
        }),
        a
      );
    },
    c = function (r) {
      if (r === t || i[r] === t || i[r].c === t) return !1;
      (window._rs_firefox13 = !1),
        (window._rs_ie =
          window._rs_ie === t ? !e.support.opacity : window._rs_ie),
        (window._rs_ie9 =
          window._rs_ie9 === t ? 9 == document.documentMode : window._rs_ie9);
      var o = e.fn.jquery.split("."),
        s = parseFloat(o[0]),
        n = parseFloat(o[1]);
      1 == s &&
        n < 7 &&
        i[r].c.html(
          '<div style="text-align:center; padding:40px 0px; font-size:20px; color:#992222;"> The Current Version of jQuery:' +
            o +
            " <br>Please update your jQuery Version to min. 1.7 in Case you wish to use the Revolution Slider Plugin</div>"
        ),
        s > 1 && (window._rs_ie = !1),
        i[r].cpar !== t &&
          i[r].cpar.data("aimg") != t &&
          (("enabled" == i[r].cpar.data("aie8") && i.isIE(8)) ||
            ("enabled" == i[r].cpar.data("amobile") && a)) &&
          i[r].c.html(
            '<img class="tp-slider-alternative-image" src="' +
              i[r].cpar.data("aimg") +
              '">'
          ),
        (i[r].realslideamount = i[r].slideamount = 0);
      var l = i[r].canvas[0].getElementsByTagName("rs-slide");
      for (var d in l)
        l.hasOwnProperty(d) &&
          ("on" == i.gA(l[d], "hsom") && a
            ? l[d].classList.add("removeslidenow")
            : (i.gA(l[d], "invisible") || 1 == i.gA(l[d], "invisible")
                ? l[d].classList.add("not-in-nav")
                : i[r].slideamount++,
              i[r].realslideamount++,
              i.sA(l[d], "originalindex", i[r].realslideamount),
              i.sA(l[d], "origindex", i[r].realslideamount - 1)));
      i[r].canvas.find(".removeslidenow").each(function () {
        e(this).remove();
      }),
        i[r].canvas.find(".not-in-nav").each(function () {
          e(this).appendTo(i[r].canvas);
        }),
        i[r].canvas.css({ visibility: "visible" }),
        (i[r].slayers = i[r].c.find("rs-static-layers")),
        i[r].slayers.length > 0 && i.sA(i[r].slayers[0], "key", "staticlayers"),
        !0 === i[r].modal.useAsModal &&
          (i[r].cpar.wrap(
            '<rs-modal id="' + i[r].c[0].id + '_modal"></rs-modal>'
          ),
          (i[r].modal.c = i[r].cpar.closest("rs-modal")),
          i[r].modal.c.appendTo(e("body")),
          i[r].modal !== t &&
            i[r].modal.alias !== t &&
            i.revModal(r, { mode: "init" })),
        1 != i[r].waitForInit && 1 != i[r].modal.useAsModal && u(r);
    },
    p = function () {
      e("body").data("rs-fullScreenMode", !e("body").data("rs-fullScreenMode")),
        e("body").data("rs-fullScreenMode") &&
          setTimeout(function () {
            e(window).trigger("resize");
          }, 200);
    },
    g = function (e, a, r) {
      return i.gA(e, "lazyload") !== t
        ? i.gA(e, "lazyload")
        : i[r].lazyloaddata !== t &&
          i[r].lazyloaddata.length > 0 &&
          i.gA(e, i[r].lazyloaddata) !== t
        ? i.gA(e, i[r].lazyloaddata)
        : i.gA(e, "lazy-src") !== t
        ? i.gA(e, "lazy-src")
        : i.gA(e, "lazy-wpfc-original-src") !== t
        ? i.gA(e, "lazy-wpfc-original-src")
        : i.gA(e, "lazy") !== t
        ? i.gA(e, "lazy")
        : a;
    },
    u = function (r) {
      if (i[r] !== t) {
        if (
          ((i[r].sliderisrunning = !0),
          e(document).on("revolution.all.resize", function () {
            i[r].sliderisrunning && m(r);
          }),
          i[r].shuffle)
        ) {
          for (
            var o = i[r].canvas.find("rs-slide:first-child"),
              s = i.gA(o[0], "firstanim"),
              n = 0;
            n < i[r].slideamount;
            n++
          )
            i[r].canvas
              .find(
                "rs-slide:eq(" +
                  Math.round(Math.random() * i[r].slideamount) +
                  ")"
              )
              .prependTo(i[r].canvas);
          i.sA(i[r].canvas.find("rs-slide:first-child")[0], "firstanim", s);
        }
        (i[r].slides = i[r].canvas[0].getElementsByTagName("rs-slide")),
          (i[r].thumbs = new Array(i[r].slides.length)),
          (i[r].slots = 4),
          (i[r].firststart = 1),
          (i[r].loadqueue = []),
          (i[r].syncload = 0),
          i.updateDimensions(r);
        var d = 0;
        for (var c in i[r].slides)
          if (i[r].slides.hasOwnProperty(c) && "length" !== c) {
            var u = i[r].slides[c],
              v = u.getElementsByClassName(".rev-slidebg");
            (v = 0 === v.length ? u.getElementsByTagName("img")[0] : v),
              i.gA(u, "key") === t &&
                i.sA(u, "key", "rs-" + Math.round(999999 * Math.random()));
            var y = {
              params: Array(12),
              id: i.gA(u, "key"),
              src: i.gA(u, "thumb") !== t ? i.gA(u, "thumb") : g(v, v.src, r),
            };
            i.gA(u, "title") === t && i.sA(u, "title", ""),
              i.gA(u, "description") === t && i.sA(u, "description", ""),
              (y.params[0] = {
                from: RegExp("\\{\\{title\\}\\}", "g"),
                to: i.gA(u, "title"),
              }),
              (y.params[1] = {
                from: RegExp("\\{\\{description\\}\\}", "g"),
                to: i.gA(u, "description"),
              });
            for (var _ = 1; _ <= 10; _++)
              i.gA(u, "p" + _) !== t
                ? (y.params[_ + 1] = {
                    from: RegExp("\\{\\{param" + _ + "\\}\\}", "g"),
                    to: i.gA(u, "p" + _),
                  })
                : (y.params[_ + 1] = {
                    from: RegExp("\\{\\{param" + _ + "\\}\\}", "g"),
                    to: "",
                  });
            if (
              ((i[r].thumbs[d] = e.extend({}, !0, y)),
              i.gA(u, "link") != t || i.gA(u, "linktoslide") !== t)
            ) {
              var w = i.gA(u, "link") !== t ? i.gA(u, "link") : "slide",
                x = "slide" != w ? "no" : i.gA(u, "linktoslide"),
                k = i.gA(u, "seoz");
              if (x != t && "no" != x && "next" != x && "prev" != x)
                for (var S in i[r].slides)
                  i[r].slides.hasOwnProperty(S) &&
                    parseInt(i.gA(i[r].slides[S], "origindex"), 0) + 1 ==
                      i.gA(u, "linktoslide") &&
                    (x = i.gA(i[r].slides[S], "key"));
              e(u).prepend(
                '<rs-layer class="rs-layer slidelink" style="z-index:' +
                  ("back" === k
                    ? 0
                    : "front" === k
                    ? 60
                    : k !== t
                    ? parseInt(k, 0)
                    : 100) +
                  ';" dataxy="x:c;y:c" data-dim="w:100%;h:100%" data-basealign="slide"' +
                  ("no" == x
                    ? "slide" == w || a
                      ? ""
                      : "  data-actions='o:click;a:simplelink;target:" +
                        (i.gA(u, "target") || "_self") +
                        ";url:" +
                        w +
                        ";'"
                    : "  data-actions='" +
                      ("scroll_under" === x
                        ? "o:click;a:scrollbelow;offset:100px;"
                        : "prev" === x
                        ? "o:click;a:jumptoslide;slide:prev;d:0.2;"
                        : "next" === x
                        ? "o:click;a:jumptoslide;slide:next;d:0.2;"
                        : "o:click;a:jumptoslide;slide:" + x + ";d:0.2;") +
                      "'") +
                  " data-frame_1='e:power3.inOut;st:100;sp:100' data-frame_999='e:power3.inOut;o:0;st:w;sp:100'>" +
                  (a
                    ? "<a " +
                      ("slide" != w
                        ? ' target="' +
                          (i.gA(u, "target") || "_self") +
                          '" href="' +
                          w +
                          '"'
                        : "") +
                      "><span></span></a>"
                    : "") +
                  "</rs-layer>"
              );
            }
            d++;
          }
        if (
          (i[r].simplifyAll &&
            (i.isIE(8) || i.iOSVersion()) &&
            (i[r].c.find(".rs-layer").each(function () {
              var t = e(this);
              t.removeClass("customin customout").addClass("fadein fadeout"),
                t.data("splitin", ""),
                t.data("speed", 400);
            }),
            i[r].slides.each(function () {
              var t = e(this);
              t.data("transition", "fade"),
                t.data("masterspeed", 500),
                t.data("slotamount", 1),
                (t.find(".rev-slidebg") || t.find(">img").first()).data(
                  "panzoom",
                  null
                );
            })),
          (window._rs_desktop =
            window._rs_desktop === t
              ? !navigator.userAgent.match(
                  /(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i
                )
              : window._rs_desktop),
          (i[r].autoHeight =
            "fullscreen" == i[r].sliderLayout || i[r].autoHeight),
          "fullwidth" != i[r].sliderLayout ||
            i[r].autoHeight ||
            i[r].c.css({ maxHeight: i[r].gridheight[i[r].level] + "px" }),
          "auto" == i[r].sliderLayout ||
            0 != i[r].c.closest("rs-fullwidth-wrap").length ||
            ("fullscreen" === i[r].sliderLayout &&
              1 == i[r].disableForceFullWidth))
        )
          i[r].topc = i[r].cpar;
        else {
          var T = i[r].cpar[0].style.marginTop,
            L = i[r].cpar[0].style.marginBottom;
          (T = T === t || "" === T ? "" : "margin-top:" + T + ";"),
            (L = L === t || "" === L ? "" : "margin-bottom:" + L + ";"),
            (i[r].topc = e(
              '<rs-fullwidth-wrap id="' +
                i[r].c[0].id +
                '_forcefullwidth" style="' +
                T +
                L +
                '"></rs-fullwidth-wrap>'
            )),
            (i[r].forcer = e(
              '<rs-fw-forcer style="height:' +
                i[r].cpar.height() +
                'px"></rs-fw-forcer>'
            )),
            i[r].topc.append(i[r].forcer),
            i[r].topc.insertBefore(i[r].cpar),
            i[r].cpar.detach(),
            i[r].cpar.css({
              marginTop: "0px",
              marginBottom: "0px",
              position: "absolute",
            }),
            i[r].cpar.prependTo(i[r].topc);
        }
        if (
          (i[r].forceOverflow && i[r].topc[0].classList.add("rs-forceoverflow"),
          "carousel" === i[r].sliderType &&
            !0 !== i[r].overflowHidden &&
            i[r].c.css({ overflow: "visible" }),
          0 !== i[r].maxHeight &&
            tpGS.gsap.set([i[r].cpar, i[r].c, i[r].topc], {
              maxHeight: i[r].maxHeight + "px",
            }),
          i[r].fixedOnTop &&
            tpGS.gsap.set(i[r].topc, {
              position: "fixed",
              top: "0px",
              left: "0px",
              pointerEvents: "none",
              zIndex: 5e3,
            }),
          i[r].shadow !== t &&
            i[r].shadow > 0 &&
            i[r].cpar
              .addClass("tp-shadow" + i[r].shadow)
              .append(
                '<div class="tp-shadowcover" style="background-color:' +
                  i[r].cpar.css("backgroundColor") +
                  ";background-image:" +
                  i[r].cpar.css("backgroundImage") +
                  '"></div>'
              ),
          l(r),
          !i[r].c.hasClass("revslider-initialised"))
        ) {
          i[r].c[0].classList.add("revslider-initialised"),
            (i[r].c[0].id =
              i[r].c[0].id === t
                ? "revslider-" + Math.round(1e3 * Math.random() + 5)
                : i[r].c[0].id),
            i.revCheckIDS(r, i[r].c[0]),
            (i[r].origcd = parseInt(i[r].duration, 0)),
            (i[r].scrolleffect._L = []),
            (i[r].sbas = i[r].sbas === t ? {} : i[r].sbas),
            (i[r].layers = i[r].layers || {}),
            (i[r].sortedLayers = i[r].sortedLayers || {}),
            i[r].c.detach(),
            i[r].c
              .find(
                "rs-layer, rs-row, rs-column, rs-group,  rs-bgvideo, .rs-layer"
              )
              .each(function () {
                var a,
                  o,
                  s = e(this),
                  n = s.data();
                if (
                  ((n.startclasses = this.className),
                  (n.startclasses =
                    n.startclasses === t || null === n.startclasses
                      ? ""
                      : n.startclasses),
                  (n.animationonscroll =
                    !!i[r].sbtimeline.set && i[r].sbtimeline.layers),
                  (n.animationonscroll =
                    !0 === n.animationonscroll ||
                    "true" == n.animationonscroll),
                  (n.filteronscroll =
                    !!i[r].scrolleffect.set && i[r].scrolleffect.layers),
                  (n.pxundermask =
                    n.startclasses.indexOf("rs-pxmask") >= 0 &&
                    "off" !== i[r].parallax.type &&
                    n.startclasses.indexOf("rs-pxl-") >= 0),
                  (n.noPevents = n.startclasses.indexOf("rs-noevents") >= 0),
                  n.sba)
                )
                  for (var l in (a = n.sba.split(";")))
                    a.hasOwnProperty(l) &&
                      ("t" == (o = a[l].split(":"))[0] &&
                        ((n.animationonscroll = o[1]),
                        "false" == o[1] && (n.animOnScrollForceDisable = !0)),
                      "e" == o[0] && (n.filteronscroll = o[1]),
                      "so" == o[0] &&
                        (n.scrollBasedOffset = parseInt(o[1]) / 1e3));
                if (
                  (("true" != n.animationonscroll &&
                    1 != n.animationonscroll) ||
                    ((n.startclasses += " rs-sba"),
                    (s[0].className += " rs-sba")),
                  n.startclasses.indexOf("rs-layer-static") >= 0 &&
                    i.handleStaticLayers &&
                    i.handleStaticLayers(s, r),
                  "RS-BGVIDEO" !== s[0].tagName)
                ) {
                  if (
                    (s[0].classList.add("rs-layer"),
                    "column" === n.type &&
                      ((n.columnwidth = "33.33%"),
                      (n.verticalalign = "top"),
                      n.column !== t))
                  )
                    for (var d in (a = n.column.split(";")))
                      a.hasOwnProperty(d) &&
                        ("w" === (o = a[d].split(":"))[0] &&
                          (n.columnwidth = o[1]),
                        "a" === o[0] && (n.verticalalign = o[1]));
                  var c =
                      n.startclasses.indexOf("slidelink") >= 0
                        ? "width:100% !important;height:100% !important;"
                        : "",
                    p =
                      "column" !== n.type
                        ? ""
                        : n.verticalalign === t
                        ? " vertical-align:top;"
                        : " vertical-align:" + n.verticalalign + ";",
                    g =
                      "row" === n.type || "column" === n.type
                        ? "position:relative;"
                        : "position:absolute;",
                    u = "",
                    f =
                      "row" === n.type
                        ? "rs-row-wrap"
                        : "column" === n.type
                        ? "rs-column-wrap"
                        : "group" === n.type
                        ? "rs-group-wrap"
                        : "rs-layer-wrap",
                    h = "",
                    m = "",
                    v = (n.noPevents, ";pointer-events:none");
                  for (var y in ("row" === n.type ||
                  "column" === n.type ||
                  "group" === n.type
                    ? (s[0].classList.remove("tp-resizeme"),
                      "column" === n.type &&
                        ((n.width = "auto"),
                        (s[0].group = "row"),
                        tpGS.gsap.set(s, { width: "auto" }),
                        (n.filteronscroll = !1)))
                    : ((h =
                        "display:" +
                        ("inline-block" === s[0].style.display
                          ? "inline-block"
                          : "block") +
                        ";"),
                      s.closest("rs-column").length > 0
                        ? ((s[0].group = "column"), (n.filteronscroll = !1))
                        : s.closest("rs-group-wrap").length > 0 &&
                          ((s[0].group = "group"), (n.filteronscroll = !1))),
                  n.wrpcls !== t && (u = u + " " + n.wrpcls),
                  n.wrpid !== t && (m = 'id="' + n.wrpid + '"'),
                  (n.maskinuse = !1),
                  n))
                    n.maskinuse &&
                      n.hasOwnProperty(y) &&
                      (n.maskinuse = y.indexOf("_mask") > 0);
                  s.wrap(
                    "<" +
                      f +
                      " " +
                      m +
                      ' class="rs-parallax-wrap ' +
                      u +
                      '" style="' +
                      p +
                      " " +
                      c +
                      g +
                      h +
                      v +
                      '"><rs-loop-wrap style="' +
                      c +
                      g +
                      h +
                      '"><rs-mask-wrap style="' +
                      c +
                      g +
                      h +
                      '">' +
                      (n.pxundermask ? "<rs-px-mask></rs-px-mask>" : "") +
                      "</rs-mask-wrap></rs-loop-wrap></" +
                      f +
                      ">"
                  ),
                    (!0 !== n.filteronscroll && "true" != n.filteronscroll) ||
                      i[r].scrolleffect._L.push(s.parent()),
                    (s[0].id =
                      s[0].id === t
                        ? "layer-" + Math.round(999999999 * Math.random())
                        : s[0].id),
                    i.revCheckIDS(r, s[0]),
                    "column" === n.type &&
                      s
                        .closest(".rs-parallax-wrap")
                        .append(
                          '<rs-cbg-mask-wrap><rs-column-bg id="' +
                            s[0].id +
                            '_rs_cbg"></rs-column-bg></rs-cbg-mask-wrap>'
                        ),
                    "text" === n.type &&
                      s[0].getElementsByTagName("iframe").length > 0 &&
                      s[0].classList.add("rs-ii-o"),
                    tpGS.gsap.set(s, { visibility: "hidden" }),
                    i[r].BUG_safari_clipPath && s[0].classList.add("rs-pelock");
                }
                i.gA(s[0], "actions") &&
                  i.checkActions &&
                  i.checkActions(s, r, i[r]),
                  !i.checkVideoApis ||
                    (window.rs_addedvim && window.rs_addedyt) ||
                    (i[r].youtubeapineeded && i[r].vimeoapineeded) ||
                    i.checkVideoApis(s, r);
              }),
            i.checkActions && i.checkActions(t, r),
            i[r].c.prependTo(i[r].cpar),
            i[r].c[0].addEventListener(
              "mouseenter",
              function () {
                i[r].c.trigger("tp-mouseenter"), (i[r].overcontainer = !0);
              },
              { passive: !0 }
            ),
            i[r].c[0].addEventListener(
              "mouseover",
              function () {
                i[r].c.trigger("tp-mouseover"), (i[r].overcontainer = !0);
              },
              { passive: !0 }
            ),
            i[r].c[0].addEventListener(
              "mouseleave",
              function () {
                i[r].c.trigger("tp-mouseleft"), (i[r].overcontainer = !1);
              },
              { passive: !0 }
            ),
            i[r].c.find(".rs-layer video").each(function (t) {
              var i = e(this);
              i.removeClass("video-js vjs-default-skin"),
                i.attr("preload", ""),
                i.css({ display: "none" });
            }),
            (i[r].rs_static_layer = i[r].c[0].getElementsByTagName(
              "rs-static-layers"
            )),
            i.preLoadAudio &&
              i[r].rs_static_layer.length > 0 &&
              i.preLoadAudio(e(i[r].rs_static_layer), r, 1),
            i[r].rs_static_layer.length > 0 &&
              (i.loadImages(i[r].rs_static_layer[0], r, 0, !0),
              i.waitForCurrentImages(i[r].rs_static_layer[0], r, function () {
                i[r] !== t &&
                  i[r].c.find("rs-static-layers img").each(function () {
                    this.src = i.getLoadObj(
                      r,
                      i.gA(this, "src") != t ? i.gA(this, "src") : this.src
                    ).src;
                  });
              })),
            (i[r].rowzones = []),
            (i[r].middleZones = []);
          var R = H("#")[0];
          if (
            R.length < 9 &&
            R.split("slide").length > 1 &&
            -1 == R.indexOf("slider")
          ) {
            var A = parseInt(R.split("slide")[1], 0);
            e.isNumeric(parseInt(A, 0)) &&
              ((A = parseInt(A, 0)) < 1 && (A = 1),
              A > i[r].slideamount && (A = i[r].slideamount),
              (i[r].startWithSlide = A - 1));
          }
          (i[r].loader = i.buildSpinner(r, i[r].spinner, i[r].spinnerclr)),
            i[r].c.append(i[r].loader);
          var I = window.getComputedStyle(i[r].c[0].parentNode, null);
          i[r].c.height(I.height),
            0 === i[r].c.find("rs-progress").length &&
              i[r].c.append(
                '<rs-progress style="visibility:hidden"></rs-progress>'
              ),
            i[r].c.find("rs-progress").css({ width: "0%" }),
            i[r].canvas.css({ display: "block" }),
            b(r),
            (i[r].slides = i[r].canvas.find("rs-slide").not(".rs-not-in-nav")),
            (i[r].inli = i[r].canvas.find("rs-slide.rs-not-in-nav")),
            ("off" !== i[r].parallax.type ||
              i[r].scrolleffect.set ||
              i[r].sbtimeline.set) &&
              i.checkForParallax &&
              i.checkForParallax(r),
            i.setSize(r, !1),
            "hero" !== i[r].sliderType &&
              i.createNavigation &&
              i[r].navigation.use &&
              i.createNavigation(r),
            i.resizeThumbsTabs &&
              i.resizeThumbsTabs &&
              i[r].navigation.use &&
              i.resizeThumbsTabs(r),
            f(r);
          var C = i[r].viewPort;
          (i[r].inviewport = !1),
            C != t && C.enable && i.scrollTicker && i.scrollTicker(r),
            i[r].slides.each(function (t) {
              var a = e(this);
              (i[r].rowzones[t] = []),
                (i[r].middleZones[t] = []),
                a.find("rs-zone").each(function () {
                  i[r].rowzones[t].push(e(this)),
                    this.className.indexOf("rev_row_zone_middle") >= 0 &&
                      i[r].middleZones[t].push(this);
                }),
                ((C.enable && i[r].inviewport) || !C.enable) &&
                  "all" == i[r].lazyType &&
                  (i.loadImages(a[0], r, t),
                  i.waitForCurrentImages(a[0], r, function () {}));
            }),
            (i[r].srowzones = []),
            (i[r].smiddleZones = []),
            i[r].slayers.find("rs-zone").each(function () {
              i[r].srowzones.push(e(this)),
                this.className.indexOf("rev_row_zone_middle") >= 0 &&
                  i[r].smiddleZones.push(this);
            }),
            "carousel" === i[r].sliderType &&
              i.prepareCarousel &&
              (tpGS.gsap.set(i[r].canvas, {
                scale: 1,
                perspective: 1200,
                transformStyle: "flat",
                opacity: 0,
              }),
              i.prepareCarousel(r, t, 0),
              (i[r].onlyPreparedSlide = !0)),
            setTimeout(function () {
              !C.enable ||
              (C.enable && i[r].inviewport) ||
              (C.enable && !i[r].inviewport && "wait" !== C.outof)
                ? z(r)
                : (i[r].c.addClass("tp-waitforfirststart"),
                  (i[r].waitForFirstSlide = !0),
                  C.presize &&
                    ((i[r].pr_next_slide = e(i[r].slides[0])),
                    i.loadImages(i[r].pr_next_slide[0], r, 0, !0),
                    i.waitForCurrentImages(
                      i[r].pr_next_slide.find(".tp-layers"),
                      r,
                      function () {
                        i.animateTheLayers &&
                          i.animateTheLayers({
                            slide: i[r].pr_next_key,
                            id: r,
                            mode: "preset",
                          });
                      }
                    ))),
                i.manageNavigation &&
                  i[r].navigation.use &&
                  i.manageNavigation(r),
                i[r].slideamount > 1 &&
                  (!C.enable || (C.enable && i[r].inviewport)
                    ? P(r)
                    : (i[r].waitForCountDown = !0)),
                setTimeout(function () {
                  i[r] !== t && i[r].c.trigger("revolution.slide.onloaded");
                }, 50);
            }, i[r].startDelay),
            (i[r].startDelay = 0),
            e("body").data("rs-fullScreenMode", !1),
            window.addEventListener("fullscreenchange", p, { passive: !0 }),
            window.addEventListener("mozfullscreenchange", p, { passive: !0 }),
            window.addEventListener("webkitfullscreenchange", p, {
              passive: !0,
            });
          var O = "resize.revslider-" + i[r].c.attr("id");
          e(window).on(O, function () {
            if (i[r] !== t) {
              if (i[r].c == t) return !1;
              0 != e("body").find(i[r].c) && (l(r), f(r));
              var o = !1;
              if ("fullscreen" == i[r].sliderLayout) {
                var s = e(window).height();
                ("mobile" == i[r].fallbacks.ignoreHeightChanges && a) ||
                "always" == i[r].fallbacks.ignoreHeightChanges
                  ? ((i[r].fallbacks.ignoreHeightChangesSize =
                      i[r].fallbacks.ignoreHeightChangesSize == t
                        ? 0
                        : i[r].fallbacks.ignoreHeightChangesSize),
                    (o =
                      s != i[r].lastwindowheight &&
                      Math.abs(s - i[r].lastwindowheight) >
                        i[r].fallbacks.ignoreHeightChangesSize))
                  : (o = s != i[r].lastwindowheight);
              }
              (i[r].c.outerWidth(!0) != i[r].width ||
                i[r].c.is(":hidden") ||
                o) &&
                ((i[r].lastwindowheight = e(window).height()), m(r));
            }
          }),
            h(r),
            f(r),
            i[r].fallbacks.disableFocusListener ||
              "true" == i[r].fallbacks.disableFocusListener ||
              !0 === i[r].fallbacks.disableFocusListener ||
              (i[r].c.addClass("rev_redraw_on_blurfocus"), M()),
            !0 === i[r].pageLoading && (window.RS_toInit[r] = !0);
        }
      }
    },
    f = function (a) {
      i[a].navOutterOffsets = i.getHorizontalOffset(i[a].c, "all");
      var r = i[a].navOutterOffsets.left,
        o =
          i[a].blockSpacing !== t && i[a].blockSpacing.left !== t
            ? parseInt(i[a].blockSpacing.left[i[a].level], 0)
            : 0,
        s =
          o +
          (i[a].blockSpacing !== t && i[a].blockSpacing.right !== t
            ? parseInt(i[a].blockSpacing.right[i[a].level], 0)
            : 0);
      if (
        ("auto" === i[a].sliderLayout ||
        ("fullscreen" === i[a].sliderLayout &&
          !0 === i[a].disableForceFullWidth)
          ? "fullscreen" == i[a].sliderLayout && 1 == i[a].disableForceFullWidth
            ? tpGS.gsap.set(i[a].cpar, { left: 0, width: "auto" })
            : tpGS.gsap.set(i[a].canvas, {
                left: "carousel" === i[a].sliderType ? 0 : r,
                width: i[a].c.width() - i[a].navOutterOffsets.both,
              })
          : tpGS.gsap.set(i[a].cpar, {
              left:
                0 -
                Math.ceil(
                  i[a].c.closest("rs-fullwidth-wrap").offset().left - (r + o)
                ) +
                "px",
              width: e(window).width() - (i[a].navOutterOffsets.both + s),
            }),
        "auto" === i[a].sliderLayout &&
          i[a].modal !== t &&
          i[a].modal.useAsModal)
      ) {
        var n = Math.min(i[a].gridwidth[i[a].level], window.innerWidth);
        tpGS.gsap.set([i[a].modal.c, i[a].canvas], { width: n });
      }
      i[a].slayers &&
        i[a].slayers.length > 0 &&
        "fullwidth" != i[a].sliderLayout &&
        "fullscreen" != i[a].sliderLayout &&
        tpGS.gsap.set(i[a].slayers, { left: r });
    },
    h = function (a, r) {
      e(window).width() < i[a].hideSliderAtLimit
        ? (i[a].c.trigger("stoptimer"),
          i.sA(
            i[a].cpar[0],
            "displaycache",
            "none" != i[a].cpar.css("display")
              ? i[a].cpar.css("display")
              : i.gA(i[a].cpar[0], "displaycache")
          ),
          i[a].cpar.css({ display: "none" }))
        : i[a].c.is(":hidden") &&
          r &&
          (i.gA(i[a].cpar[0], "displaycache") != t &&
          "none" != i.gA(i[a].cpar[0], "displaycache")
            ? i[a].cpar.css({ display: i.gA(i[a].cpar[0], "displaycache") })
            : i[a].cpar.css({ display: "block" }),
          i[a].c.trigger("restarttimer"),
          setTimeout(function () {
            m(a, !0);
          }, 150)),
        i.hideUnHideNav && i[a].navigation.use && i.hideUnHideNav(a);
    },
    m = function (r, o) {
      if (i[r].c === t) return !1;
      (i[r].dimensionReCheck = {}),
        i[r].c.trigger("revolution.slide.beforeredraw"),
        1 == i[r].infullscreenmode && (i[r].minHeight = e(window).height()),
        a && (i[r].lastMobileHeight = window.innerHeight),
        l(r),
        (i.resizeThumbsTabs && !0 !== i.resizeThumbsTabs(r)) ||
          (h(r, !0 !== o),
          f(r),
          "carousel" == i[r].sliderType && i.prepareCarousel(r),
          i.setSize(r),
          i.updateDimensions(r),
          "standard" === i[r].sliderType &&
            i[r].mtl !== t &&
            i.animateSlide({ recall: !0, id: r }),
          "carousel" === i[r].sliderType &&
            i[r].lastconw != i[r].conw &&
            (clearTimeout(i[r].pcartimer),
            (i[r].pcartimer = setTimeout(function () {
              i.prepareCarousel(r),
                i.animateTheLayers({
                  slide: "individual",
                  id: r,
                  mode: "rebuild",
                });
            }, 100)),
            (i[r].lastconw = i[r].conw)),
          i.animateTheLayers &&
            (i[r].pr_processing_key !== t
              ? i.animateTheLayers({
                  slide: i[r].pr_processing_key,
                  id: r,
                  mode: "rebuild",
                })
              : i[r].pr_active_key !== t &&
                i.animateTheLayers({
                  slide: i[r].pr_active_key,
                  id: r,
                  mode: "rebuild",
                }),
            i.scrollHandling && i.scrollHandling(r, !0)),
          v(r, i[r].pr_next_bg),
          "carousel" !== i[r].sliderType && v(r, i[r].pr_active_bg),
          i.manageNavigation && i.manageNavigation(r)),
        i[r].c.trigger("revolution.slide.afterdraw"),
        setTimeout(function () {
          f(r);
        }, 19);
    },
    v = function (e, a) {
      a &&
        a.data("panzoom") !== t &&
        i.startPanZoom(
          a,
          e,
          a.data("pztl") !== t ? a.data("pztl").progress() : 0
        );
    },
    y = function (e) {
      i[e].justifyCarousel
        ? (i[e].bh = i[e].bw = 1)
        : ((i[e].bw = i[e].width / i[e].gridwidth[i[e].level]),
          (i[e].bh = i[e].height / i[e].gridheight[i[e].level]),
          (i[e].bw = isNaN(i[e].bw) ? 1 : i[e].bw),
          (i[e].bh = isNaN(i[e].bh) ? 1 : i[e].bh),
          i[e].bh > i[e].bw ? (i[e].bh = i[e].bw) : (i[e].bw = i[e].bh),
          (i[e].bh > 1 || i[e].bw > 1) && ((i[e].bw = 1), (i[e].bh = 1)));
    },
    b = function (a) {
      i[a].autoHeight &&
        tpGS.gsap.set([i[a].c, i[a].cpar], { maxHeight: "none" }),
        tpGS.gsap.set(i[a].canvas, {
          overflow: "hidden",
          width: "100%",
          height: "100%",
          maxHeight: i[a].autoHeight ? "none" : i[a].cpar.css("maxHeight"),
        }),
        "carousel" === i[a].sliderType &&
          (i[a].canvas
            .css({ overflow: "visible" })
            .wrap("<rs-carousel-wrap></rs-carousel-wrap>"),
          i[a].cpar
            .prepend("<rs-carousel-space></rs-carousel-space>")
            .append("<rs-carousel-space></rs-carousel-space>"),
          i.prepareCarousel(a)),
        (i[a].startWithSlide =
          i[a].startWithSlide === t
            ? t
            : "carousel" === i[a].sliderType
            ? parseInt(i[a].startWithSlide)
            : parseInt(i[a].startWithSlide) + 1),
        i[a].cpar.css({ overflow: "visible" }),
        (i[a].scrolleffect.bgs = []);
      for (var r = 0; r < i[a].slides.length; r++) {
        var o = e(i[a].slides[r]),
          s = o.find(">img"),
          n = o.find("rs-bgvideo");
        s.detach(),
          n.detach(),
          ((i[a].startWithSlide != t &&
            i.gA(i[a].slides[r], "originalindex") == i[a].startWithSlide) ||
            (i[a].startWithSlide === t && 0 == r)) &&
            (i[a].pr_next_key = o.index()),
          tpGS.gsap.set(o, {
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }),
          s.wrap("<rs-sbg-px><rs-sbg-wrap></rs-sbg-wrap></rs-sbg-px>");
        var l = s.closest("rs-sbg-wrap"),
          d = o.data("mediafilter"),
          c = _(s.data(), a, s[0].style.backgroundColor),
          p = c.bgcolor !== t && c.bgcolor.indexOf("gradient") >= 0,
          u =
            c.bgcolor !== t && c.bgcolor.indexOf("gradient") >= 0
              ? "background:" + c.bgcolor + ";"
              : "background-color:" + c.bgcolor + ";";
        (c.src = s[0].src),
          (c.lazyload = g(s[0], t, a)),
          (c.slidebgimage = !0),
          (d = "none" === d || d === t ? "" : d),
          n.length > 0 &&
            (n.addClass("defaultvid").css({ zIndex: 30 }),
            n.appendTo(l),
            d !== t && "" !== d && "none" !== d && n.addClass(d),
            c.parallax != t &&
              (n.data("parallax", c.parallax),
              n.data("showcoveronpause", "on"),
              n.data("mediafilter", d))),
          "none" != i[a].dottedOverlay &&
            i[a].dottedOverlay != t &&
            l.append(
              '<rs-dotted class="' + i[a].dottedOverlay + '"></rs-dotted>'
            ),
          (u +=
            (p
              ? ""
              : "background-repeat:" +
                c.bgrepeat +
                ";background-image:url(" +
                c.src +
                ");background-size:" +
                c.bgfit +
                ";background-position:" +
                c.bgposition +
                ";") + "width:100%;height:100%;"),
          (u +=
            "standard" === i[a].sliderType || "undefined" === i[a].sliderType
              ? "opacity:0;"
              : ""),
          s.data("mediafilter", d),
          (d = s.data("panzoom") !== t ? "" : d);
        var f = e(
          "<rs-sbg " +
            (c.lazyload !== t ? 'data-lazyload="' + c.lazyload + '"' : "") +
            ' src="' +
            c.src +
            '" class="' +
            d +
            '" data-bgcolor="' +
            c.bgcolor +
            '" style="' +
            u +
            '"></rs-sbg>'
        );
        l.append(f);
        var h = document.createComment(
          "Runtime Modification - Img tag is Still Available for SEO Goals in Source - " +
            s.get(0).outerHTML
        );
        s.replaceWith(h),
          l.data(c),
          f.data(c),
          i.gA(o[0], "sba") === t && i.sA(o[0], "sba", "");
        var m = {},
          v = i.gA(o[0], "sba").split(";");
        for (var y in v)
          if (v.hasOwnProperty(y)) {
            var b = v[y].split(":");
            switch (b[0]) {
              case "f":
                m.f = b[1];
                break;
              case "b":
                m.b = b[1];
                break;
              case "g":
                m.g = b[1];
                break;
              case "t":
                m.s = b[1];
            }
          }
        i.sA(o[0], "scroll-based", !!i[a].sbtimeline.set && m.s !== t && m.s),
          i[a].scrolleffect.set
            ? (i[a].scrolleffect.bgs.push({
                fade:
                  m.f !== t
                    ? m.f
                    : !!i[a].scrolleffect.slide && i[a].scrolleffect.fade,
                blur:
                  m.b !== t
                    ? m.b
                    : !!i[a].scrolleffect.slide && i[a].scrolleffect.blur,
                grayscale:
                  m.g !== t
                    ? m.g
                    : !!i[a].scrolleffect.slide && i[a].scrolleffect.grayscale,
                c: l.wrap("<rs-sbg-effectwrap></rs-sbg-effectwrap>").parent(),
              }),
              o.prepend(l.parent().parent()))
            : o.prepend(l.parent());
      }
    },
    _ = function (r, o, s) {
      r.bg = r.bg === t ? "" : r.bg;
      var n = r.bg.split(";"),
        l = {
          bgposition: "50% 50%",
          bgfit: "cover",
          bgrepeat: "no-repeat",
          bgcolor: s || "transparent",
        };
      for (var d in n)
        if (n.hasOwnProperty(d)) {
          var c = n[d].split(":"),
            p = c[0],
            g = c[1],
            u = "";
          switch (p) {
            case "p":
              u = "bgposition";
              break;
            case "f":
              u = "bgfit";
              break;
            case "r":
              u = "bgrepeat";
              break;
            case "c":
              u = "bgcolor";
          }
          u !== t && (l[u] = g);
        }
      return (
        i[o].fallbacks.panZoomDisableOnMobile &&
          a &&
          ((l.panzoom = null), (l.bgfit = "cover")),
        e.extend(!0, r, l)
      );
    },
    w = function (t, a) {
      a.find(".slot, .slot-circle-wrapper").each(function () {
        e(this).remove();
      }),
        (i[t].transition = 0);
    },
    x = function (e) {
      var i = e;
      return e != t && e.length > 0 && (i = e.split("?")[0]), i;
    },
    k = function (e) {
      var i = e;
      return (
        e != t &&
          e.length > 0 &&
          (i = i.replace(document.location.protocol, "")),
        i
      );
    },
    S = function (e, t) {
      var i = e.split("/"),
        a = t.split("/");
      i.pop();
      for (var r = 0; r < a.length; r++)
        "." != a[r] && (".." == a[r] ? i.pop() : i.push(a[r]));
      return i.join("/");
    },
    T = function (e, a, r) {
      if (i[a] !== t) {
        for (var o in (i[a].syncload--, i[a].loadqueue))
          if (
            i[a].loadqueue.hasOwnProperty(o) &&
            "loaded" !== i[a].loadqueue[o].progress
          ) {
            var s =
              i[a].loadqueue[o].src !== t
                ? i[a].loadqueue[o].src.replace(/\.\.\/\.\.\//gi, "")
                : i[a].loadqueue[o].src;
            (s === e.src ||
              k(s) === k(e.src) ||
              x(document.location.protocol + s) ===
                x(decodeURIComponent(e.src)) ||
              x(document.location.origin + s) ===
                x(decodeURIComponent(e.src)) ||
              x(
                self.location.href.substring(0, self.location.href.length - 1) +
                  s
              ) === x(decodeURIComponent(e.src)) ||
              x(S(self.location.href, i[a].loadqueue[o].src)) ===
                x(decodeURIComponent(e.src)) ||
              x(document.location.origin + "/" + s) ===
                x(decodeURIComponent(e.src)) ||
              x(
                self.location.href.substring(0, self.location.href.length - 1) +
                  "/" +
                  s
              ) === x(decodeURIComponent(e.src)) ||
              x(i[a].loadqueue[o].src) === x(decodeURIComponent(e.src)) ||
              ("file://" === window.location.origin &&
                x(e.src).match(new RegExp(s)))) &&
              ((i[a].loadqueue[o].img = e),
              (i[a].loadqueue[o].progress = r),
              (i[a].loadqueue[o].width = e.width),
              (i[a].loadqueue[o].height = e.height));
          }
        L(a);
      }
    },
    L = function (a) {
      4 != i[a].syncload &&
        i[a].loadqueue &&
        e.each(i[a].loadqueue, function (r, o) {
          if ("prepared" == o.progress && i[a].syncload <= 4) {
            if ((i[a].syncload++, "img" == o.type)) {
              var s = new Image();
              /^([\w]+\:)?\/\//.test(o.src) &&
                -1 === o.src.indexOf(location.host) &&
                "" !== i[a].imgCrossOrigin &&
                i[a].imgCrossOrigin !== t &&
                (s.crossOrigin = i[a].imgCrossOrigin),
                (s.onload = function () {
                  T(this, a, "loaded"), (o.error = !1);
                }),
                (s.onerror = function () {
                  T(this, a, "failed"), (o.error = !0);
                }),
                (s.src = o.src),
                (o.starttoload = e.now());
            } else
              e.get(o.src, function (e) {
                (o.innerHTML = new XMLSerializer().serializeToString(
                  e.documentElement
                )),
                  (o.progress = "loaded"),
                  i[a].syncload--,
                  L(a);
              }).fail(function () {
                (o.progress = "failed"), i[a].syncload--, L(a);
              });
            o.progress = "inload";
          }
        });
    },
    R = function (e, t) {
      return (
        console.log(
          "Static Image " +
            e +
            "  Could not be loaded in time. Error Exists:" +
            t
        ),
        !0
      );
    },
    A = function (t, a) {
      if (e.now() - i[a][t + "starttime"] > 5e3 && 1 != i[a][t + "warning"]) {
        i[a][t + "warning"] = !0;
        var r = t + " Api Could not be loaded !";
        "https:" === location.protocol &&
          (r += " Please Check and Renew SSL Certificate !"),
          console.error(r),
          i[a].c.append(
            '<div style="position:absolute;top:50%;width:100%;color:#e74c3c;  font-size:16px; text-align:center; padding:15px;background:#000; display:block;"><strong>' +
              r +
              "</strong></div>"
          );
      }
      return !0;
    },
    I = function (a) {
      i[a] !== t &&
        ((i[a].pr_active_slide = e(i[a].slides[i[a].pr_active_key])),
        (i[a].pr_next_slide = e(i[a].slides[i[a].pr_processing_key])),
        (i[a].pr_active_bg = i[a].pr_active_slide.find("rs-sbg-wrap")),
        (i[a].pr_next_bg = i[a].pr_next_slide.find("rs-sbg-wrap")),
        i[a].pr_active_bg !== t &&
          i[a].pr_active_bg.length > 0 &&
          tpGS.gsap.to(i[a].pr_active_bg, 0.5, { opacity: 0 }),
        i[a].pr_next_bg !== t &&
          i[a].pr_next_bg.length > 0 &&
          tpGS.gsap.to(i[a].pr_next_bg, 0.5, { opacity: 0 }),
        tpGS.gsap.set(i[a].pr_active_slide, { zIndex: 18 }),
        i[a].pr_next_slide !== t &&
          i[a].pr_next_slide.length > 0 &&
          tpGS.gsap.set(i[a].pr_next_slide, { autoAlpha: 0, zIndex: 20 }),
        (i[a].tonpause = !1),
        i.removeTheLayers &&
          i[a].pr_active_key !== t &&
          i.removeTheLayers(i[a].pr_active_slide, a, !0),
        (i[a].firststart = 1),
        setTimeout(function () {
          delete i[a].pr_active_key, delete i[a].pr_processing_key;
        }, 200));
    },
    z = function (a, r) {
      if (i[a] !== t)
        if (
          (clearTimeout(i[a].waitWithSwapSlide), i[a].pr_processing_key === t)
        ) {
          if (
            (i[a].startWithSlideKey !== t &&
              ((i[a].pr_next_key = i.getComingSlide(
                a,
                i[a].startWithSlideKey
              ).nindex),
              delete i[a].startWithSlideKey),
            (i[a].pr_active_slide = e(i[a].slides[i[a].pr_active_key])),
            (i[a].pr_next_slide = e(i[a].slides[i[a].pr_next_key])),
            i[a].pr_next_key == i[a].pr_active_key &&
              !0 !== i[a].onlyPreparedSlide)
          )
            return delete i[a].pr_next_key;
          !0 === i[a].onlyPreparedSlide && (i[a].onlyPreparedSlide = !1),
            (i[a].pr_processing_key = i[a].pr_next_key),
            (i[a].pr_cache_pr_next_key = i[a].pr_next_key),
            delete i[a].pr_next_key,
            i[a].pr_next_slide !== t &&
              i[a].pr_next_slide[0] !== t &&
              i.gA(i[a].pr_next_slide[0], "hal") !== t &&
              i.sA(
                i[a].pr_next_slide[0],
                "sofacounter",
                i.gA(i[a].pr_next_slide[0], "sofacounter") === t
                  ? 1
                  : parseInt(i.gA(i[a].pr_next_slide[0], "sofacounter"), 0) + 1
              ),
            i[a].stopLoop &&
              i[a].pr_processing_key == i[a].lastslidetoshow - 1 &&
              (i[a].c.find("rs-progress").css({ visibility: "hidden" }),
              i[a].c.trigger("revolution.slide.onstop"),
              (i[a].noloopanymore = 1)),
            i[a].pr_next_slide.index() === i[a].slideamount - 1 &&
              i[a].looptogo > 0 &&
              "disabled" !== i[a].looptogo &&
              (i[a].looptogo--, i[a].looptogo <= 0 && (i[a].stopLoop = !0)),
            (i[a].tonpause = !0),
            (i[a].slideInSwapTimer = !0),
            i[a].c.trigger("stoptimer"),
            "off" === i[a].spinner &&
              (i[a].loader !== t
                ? i[a].loader.css({ display: "none" })
                : (i[a].loadertimer = setTimeout(function () {
                    i[a].loader !== t && i[a].loader.css({ display: "block" });
                  }, 18)));
          var o =
            "carousel" === i[a].sliderType && "all" !== i[a].lazyType
              ? i.loadVisibleCarouselItems(a)
              : i[a].pr_next_slide[0];
          i.loadImages(o, a, 1),
            i.preLoadAudio && i.preLoadAudio(i[a].pr_next_slide, a, 1),
            i.waitForCurrentImages(o, a, function () {
              i[a] !== t &&
                (i[a].pr_next_slide.find("rs-bgvideo").each(function () {
                  var t = e(this);
                  t.hasClass("HasListener") ||
                    (t.data("bgvideo", 1),
                    i.manageVideoLayer && i.manageVideoLayer(t, a)),
                    0 == t.find(".rs-fullvideo-cover").length &&
                      t.append('<div class="rs-fullvideo-cover"></div>');
                }),
                i.loadUpcomingContent(a),
                C(i[a].pr_next_slide.find("rs-sbg"), a, r));
            }),
            f(a);
        } else
          i[a].waitWithSwapSlide = setTimeout(function () {
            z(a, r);
          }, 18);
    },
    C = function (a, r, o) {
      if (i[r] !== t) {
        if (
          ((i[r].pr_active_slide = e(i[r].slides[i[r].pr_active_key])),
          (i[r].pr_next_slide = e(i[r].slides[i[r].pr_processing_key])),
          (i[r].pr_active_bg = i[r].pr_active_slide.find("rs-sbg-wrap")),
          (i[r].pr_next_bg = i[r].pr_next_slide.find("rs-sbg-wrap")),
          (i[r].tonpause = !1),
          clearTimeout(i[r].loadertimer),
          i[r].loader !== t && i[r].loader.css({ display: "none" }),
          i.setSize(r),
          i.manageNavigation &&
            i[r].navigation.use &&
            i.manageNavigation(r, !1),
          i[r].c.trigger("revolution.slide.onbeforeswap", {
            slider: r,
            slideIndex: parseInt(i[r].pr_active_key, 0) + 1,
            slideLIIndex: i[r].pr_active_key,
            nextSlideIndex: parseInt(i[r].pr_processing_key, 0) + 1,
            nextSlideLIIndex: i[r].pr_processing_key,
            nextslide: i[r].pr_next_slide,
            slide: i[r].pr_active_slide,
            currentslide: i[r].pr_active_slide,
            prevslide:
              i[r].pr_lastshown_key !== t
                ? i[r].slides[i[r].pr_lastshown_key]
                : "",
          }),
          (i[r].transition = 1),
          (i[r].stopByVideo = !1),
          i[r].pr_next_slide[0] !== t &&
          i.gA(i[r].pr_next_slide[0], "duration") != t &&
          "" != i.gA(i[r].pr_next_slide[0], "duration")
            ? (i[r].duration = parseInt(
                i.gA(i[r].pr_next_slide[0], "duration"),
                0
              ))
            : (i[r].duration = i[r].origcd),
          i[r].pr_next_slide[0] === t ||
          ("true" != i.gA(i[r].pr_next_slide[0], "ssop") &&
            !0 !== i.gA(i[r].pr_next_slide[0], "ssop"))
            ? (i[r].ssop = !1)
            : (i[r].ssop = !0),
          i[r].sbtimeline.set &&
            i[r].sbtimeline.fixed &&
            i.updateFixedScrollTimes(r),
          i[r].c.trigger("nulltimer"),
          (i[r].sdir = i[r].pr_processing_key < i[r].pr_active_key ? 1 : 0),
          "arrow" == i[r].sc_indicator &&
            (0 == i[r].pr_active_key &&
              i[r].pr_processing_key == i[r].slideamount - 1 &&
              (i[r].sdir = 1),
            i[r].pr_active_key == i[r].slideamount - 1 &&
              0 == i[r].pr_processing_key &&
              (i[r].sdir = 0)),
          (i[r].lsdir = i[r].sdir),
          i[r].pr_active_key != i[r].pr_processing_key &&
            1 != i[r].firststart &&
            "carousel" !== i[r].sliderType &&
            i.removeTheLayers &&
            i.removeTheLayers(i[r].pr_active_slide, r),
          i[r].pr_next_slide.hasClass("rs-pause-timer-once") ||
          i[r].pr_next_slide.hasClass("rs-pause-timer-always")
            ? ((i[r].stopByVideo = !0), i.unToggleState(i[r].slidertoggledby))
            : i[r].c.trigger("restarttimer"),
          i[r].pr_next_slide.removeClass("rs-pause-timer-once"),
          i[r].pr_next_slide[0] !== t &&
            i.sA(i[r].c[0], "slideactive", i.gA(i[r].pr_next_slide[0], "key")),
          "carousel" == i[r].sliderType)
        )
          (i[r].mtl = tpGS.gsap.timeline()),
            i.prepareCarousel(r),
            O(r),
            (i[r].transition = 0);
        else {
          (i[r].mtl = tpGS.gsap.timeline({
            onComplete: function () {
              O(r);
            },
          })),
            i[r].mtl.add(
              tpGS.gsap.set(i[r].pr_next_bg.find("rs-sbg"), { opacity: 0 })
            ),
            i[r].mtl.pause(),
            i.animateTheLayers &&
              (i[r].pr_next_key !== t
                ? i.animateTheLayers({
                    slide: i[r].pr_next_key,
                    id: r,
                    mode: "preset",
                  })
                : i[r].pr_processing_key !== t
                ? i.animateTheLayers({
                    slide: i[r].pr_processing_key,
                    id: r,
                    mode: "preset",
                  })
                : i[r].pr_active_key !== t &&
                  i.animateTheLayers({
                    slide: i[r].pr_active_key,
                    id: r,
                    mode: "preset",
                  })),
            1 == i[r].firststart &&
              (i[r].pr_active_slide[0] !== t &&
                tpGS.gsap.set(i[r].pr_active_slide, { autoAlpha: 0 }),
              (i[r].firststart = 0)),
            i[r].pr_active_slide[0] !== t &&
              tpGS.gsap.set(i[r].pr_active_slide, { zIndex: 18 }),
            i[r].pr_next_slide[0] !== t &&
              tpGS.gsap.set(i[r].pr_next_slide, { autoAlpha: 0, zIndex: 20 }),
            "prepared" == i.gA(i[r].pr_next_slide[0], "differentissplayed") &&
              (i.sA(i[r].pr_next_slide[0], "differentissplayed", "done"),
              i.sA(
                i[r].pr_next_slide[0],
                "anim",
                i.gA(i[r].pr_next_slide[0], "savedanim")
              )),
            i.gA(i[r].pr_next_slide[0], "firstanim") != t &&
              "done" != i.gA(i[r].pr_next_slide[0], "differentissplayed") &&
              (i.sA(
                i[r].pr_next_slide[0],
                "savedanim",
                i.gA(i[r].pr_next_slide[0], "anim")
              ),
              i.sA(
                i[r].pr_next_slide[0],
                "anim",
                i.gA(i[r].pr_next_slide[0], "firstanim")
              ),
              i.sA(i[r].pr_next_slide[0], "differentissplayed", "prepared"));
          var s = (function (e) {
            var i = (e = e === t ? "t:random" : e).split(";"),
              a = {};
            for (var r in i)
              if (i.hasOwnProperty(r)) {
                var o = i[r].split(":"),
                  s = o[0],
                  n = o[1],
                  l = "transition";
                switch (s) {
                  case "ei":
                    l = "easein";
                    break;
                  case "eo":
                    l = "easeout";
                    break;
                  case "s":
                    l = "masterspeed";
                    break;
                  case "sl":
                    l = "slotamount";
                    break;
                  case "r":
                    l = "rotate";
                }
                s !== t && n !== t && (a[l] = n.split(","));
              }
            a.transition === t && (a = { transition: ["fade"] });
            return a;
          })(i.gA(i[r].pr_next_slide[0], "anim"));
          i.sA(
            i[r].pr_next_slide[0],
            "ntrid",
            "on" == i.gA(i[r].pr_next_slide[0], "rndtrans")
              ? Math.round(80 * Math.random())
              : parseInt(i.gA(i[r].pr_next_slide[0], "ntrid"), 0) + 1 || 0
          ),
            i.sA(
              i[r].pr_next_slide[0],
              "ntrid",
              s.transition === t ||
                i.gA(i[r].pr_next_slide[0], "ntrid") == s.transition.length
                ? 0
                : i.gA(i[r].pr_next_slide[0], "ntrid")
            ),
            i.animateSlide({
              animation: s,
              ntrid: i.gA(i[r].pr_next_slide[0], "ntrid"),
              id: r,
            }),
            i[r].pr_next_bg.data("panzoom") !== t &&
              (i.startPanZoom(i[r].pr_next_bg, r),
              i[r].mtl.add(
                tpGS.gsap.set(i[r].pr_next_bg, {
                  autoAlpha: 0,
                  immediateRender: !0,
                }),
                0
              )),
            i[r].mtl.pause();
        }
        i.scrollHandling &&
          i[r].mtl !== t &&
          (i.scrollHandling(r, !0, 0),
          i[r].mtl.eventCallback("onUpdate", function () {
            i.scrollHandling(r, !0, 0, !0);
          })),
          "off" != i[r].parallax.type &&
            i[r].parallax.firstgo == t &&
            i.scrollHandling &&
            ((i[r].parallax.firstgo = !0),
            (i[r].lastscrolltop = -999),
            i.scrollHandling(r, !0, 0),
            setTimeout(function () {
              i[r] !== t &&
                ((i[r].lastscrolltop = -999), i.scrollHandling(r, !0, 0));
            }, 70),
            setTimeout(function () {
              i[r] !== t &&
                ((i[r].lastscrolltop = -999), i.scrollHandling(r, !0, 0));
            }, 100)),
          i.animateTheLayers
            ? "carousel" === i[r].sliderType
              ? (!1 !== i[r].carousel.showLayersAllTime &&
                  (i[r].carousel.allLayersStarted
                    ? i.animateTheLayers({
                        slide: "individual",
                        id: r,
                        mode: "rebuild",
                      })
                    : i.animateTheLayers({
                        slide: "individual",
                        id: r,
                        mode: "start",
                      }),
                  (i[r].carousel.allLayersStarted = !0)),
                0 !== i[r].firststart
                  ? i.animateTheLayers({ slide: 0, id: r, mode: "start" })
                  : !0 !== o &&
                    i.animateTheLayers({
                      slide:
                        i[r].pr_next_key !== t
                          ? i[r].pr_next_key
                          : i[r].pr_processing_key !== t
                          ? i[r].pr_processing_key
                          : i[r].pr_active_key,
                      id: r,
                      mode: "start",
                    }),
                (i[r].firststart = 0))
              : i.animateTheLayers({
                  slide:
                    i[r].pr_next_key !== t
                      ? i[r].pr_next_key
                      : i[r].pr_processing_key !== t
                      ? i[r].pr_processing_key
                      : i[r].pr_active_key,
                  id: r,
                  mode: "start",
                })
            : i[r].mtl != t &&
              setTimeout(function () {
                i[r].mtl.resume();
              }, 18),
          "carousel" !== i[r].sliderType &&
            tpGS.gsap.to(i[r].pr_next_slide, 0.001, { autoAlpha: 1 });
      }
    };
  var O = function (r) {
      if (
        i[r] !== t &&
        (i[r].firstSlideAvailable === t &&
          ((i[r].firstSlideAvailable = !0),
          i.showFirstTime !== t && i.showFirstTime(r)),
        "carousel" === i[r].sliderType ||
          (tpGS.gsap.to(i[r].pr_next_bg.find("rs-sbg"), 0.001, {
            zIndex: 20,
            autoAlpha: 1,
            onComplete: function () {
              w(r, i[r].pr_next_slide);
            },
          }),
          i[r].pr_next_slide.index() != i[r].pr_active_slide.index() &&
            i[r].pr_active_slide[0] !== t &&
            tpGS.gsap.to(i[r].pr_active_slide, 0.2, {
              zIndex: 18,
              autoAlpha: 0,
              onComplete: function () {
                w(r, i[r].pr_active_slide);
              },
            })),
        (i[r].pr_active_key =
          i[r].pr_processing_key !== t
            ? i[r].pr_processing_key
            : i[r].pr_active_key),
        delete i[r].pr_processing_key,
        ("scroll" != i[r].parallax.type &&
          "scroll+mouse" != i[r].parallax.type &&
          "mouse+scroll" != i[r].parallax.type) ||
          ((i[r].lastscrolltop = -999), i.scrollHandling(r)),
        (i[r].mtldiff = i[r].mtl.time()),
        delete i[r].mtl,
        i[r].pr_active_key !== t)
      ) {
        i.gA(i[r].slides[i[r].pr_active_key], "sloop") !== t &&
          (function (e) {
            if (i[e] !== t) {
              i[e].sloops = i[e].sloops === t ? {} : i[e].sloops;
              var a = i.gA(i[e].slides[i[e].pr_active_key], "key"),
                r = i[e].sloops[a];
              if (r === t) {
                r = { s: 2500, e: 4500, r: "unlimited" };
                var o = i
                  .gA(i[e].slides[i[e].pr_active_key], "sloop")
                  .split(";");
                for (var s in o)
                  if (o.hasOwnProperty(s)) {
                    var n = o[s].split(":");
                    switch (n[0]) {
                      case "s":
                        r.s = parseInt(n[1], 0) / 1e3;
                        break;
                      case "e":
                        r.e = parseInt(n[1], 0) / 1e3;
                        break;
                      case "r":
                        r.r = n[1];
                    }
                  }
                (r.r = "unlimited" === r.r ? -1 : parseInt(r.r, 0)),
                  (i[e].sloops[a] = r),
                  (r.key = a);
              }
              (r.ct = { time: r.s }),
                (r.tl = tpGS.gsap.timeline({})),
                (r.timer = tpGS.gsap
                  .fromTo(
                    r.ct,
                    r.e - r.s,
                    { time: r.s },
                    {
                      time: r.e,
                      ease: "none",
                      onRepeat: function () {
                        for (var a in i[e].layers[r.key])
                          i[e].layers[r.key].hasOwnProperty(a) &&
                            i[e]._L[a].timeline.play(r.s);
                        var o = i[e].c.find("rs-progress");
                        o !== t &&
                          o[0] !== t &&
                          o[0].tween !== t &&
                          o[0].tween.time(r.s);
                      },
                      onUpdate: function () {},
                      onComplete: function () {},
                    }
                  )
                  .repeat(r.r)),
                r.tl.add(r.timer, r.s),
                r.tl.time(i[e].mtldiff);
            }
          })(r),
          i[r].c.find(".active-rs-slide").removeClass("active-rs-slide"),
          e(i[r].slides[i[r].pr_active_key]).addClass("active-rs-slide"),
          i.sA(
            i[r].c[0],
            "slideactive",
            i.gA(i[r].slides[i[r].pr_active_key], "key")
          ),
          i[r].pr_active_bg.data("pztl") != t &&
            (i[r].pr_active_bg.data("pztl").reverse(),
            i[r].pr_active_bg.data("pztl").timeScale(3)),
          i[r].pr_next_bg.data("panzoom") !== t &&
            (i[r].pr_next_bg.data("pztl") != t
              ? (i[r].pr_next_bg.data("pztl").timeScale(1),
                i[r].pr_next_bg.data("pztl").play())
              : i.startPanZoom(i[r].pr_next_bg, r)),
          i[r].pr_next_slide.find("rs-bgvideo").each(function (t) {
            if (a && !i[r].fallbacks.allowHTML5AutoPlayOnAndroid) return !1;
            var o = e(this);
            i.resetVideo(o, r, !1, !0),
              tpGS.gsap.fromTo(
                o,
                0.25,
                { autoAlpha: 0 },
                {
                  autoAlpha: 1,
                  ease: "power3.inOut",
                  delay: 0.05,
                  onComplete: function () {
                    i.animcompleted && i.animcompleted(o, r);
                  },
                }
              );
          }),
          i[r].pr_active_bg.find("rs-bgvideo").each(function (t) {
            if (a && !i[r].fallbacks.allowHTML5AutoPlayOnAndroid) return !1;
            var o = e(this);
            i.stopVideo && (i.resetVideo(o, r), i.stopVideo(o, r)),
              tpGS.gsap.to(o, 1, {
                autoAlpha: 0,
                ease: "power3.inOut",
                delay: 0.2,
              });
          });
        var o = {
          slider: r,
          slideIndex: parseInt(i[r].pr_active_key, 0) + 1,
          slideLIIndex: i[r].pr_active_key,
          slide: i[r].pr_next_slide,
          currentslide: i[r].pr_next_slide,
          prevSlideIndex:
            i[r].pr_lastshown_key !== t &&
            parseInt(i[r].pr_lastshown_key, 0) + 1,
          prevSlideLIIndex:
            i[r].pr_lastshown_key !== t && parseInt(i[r].pr_lastshown_key, 0),
          prevSlide:
            i[r].pr_lastshown_key !== t && i[r].slides[i[r].pr_lastshown_key],
        };
        if (
          (i[r].c.trigger("revolution.slide.onchange", o),
          i[r].c.trigger("revolution.slide.onafterswap", o),
          (i[r].pr_lastshown_key = i[r].pr_active_key),
          i[r].startWithSlide !== t &&
            "done" !== i[r].startWithSlide &&
            "carousel" === i[r].sliderType)
        ) {
          for (
            var s = i[r].startWithSlide, n = 0;
            n <= i[r].slides.length - 1;
            n++
          )
            i[r].slides[n] !== t &&
              i[r].slides[n][0] !== t &&
              i.gA(i[r].slides[n][0], "originalindex") ===
                i[r].startWithSlide &&
              (s = n);
          0 !== s && i.callingNewSlide(r, s), (i[r].startWithSlide = "done");
        }
        (i[r].duringslidechange = !1),
          i[r].pr_active_slide.length > 0 &&
            0 != i.gA(i[r].pr_active_slide[0], "hal") &&
            i.gA(i[r].pr_active_slide[0], "hal") <=
              i.gA(i[r].pr_active_slide[0], "sofacounter") &&
            i[r].c.revremoveslide(i[r].pr_active_slide.index());
        var l = i[r].pr_processing_key || i[r].pr_active_key || 0;
        i[r].rowzones != t &&
          (l = l > i[r].rowzones.length ? i[r].rowzones.length : l),
          i[r].rowzones != t &&
            i[r].rowzones.length > 0 &&
            i[r].rowzones[l] != t &&
            l >= 0 &&
            l <= i[r].rowzones.length &&
            i[r].rowzones[l].length > 0 &&
            i.setSize(r),
          delete i[r].sc_indicator,
          delete i[r].sc_indicator_dir,
          i[r].firstLetItFree === t &&
            (i.scrollHandling && i.scrollHandling(r, !0),
            (i[r].firstLetItFree = !0));
      }
    },
    P = function (r) {
      (i[r].loop = 0),
        i[r].stopAtSlide != t && i[r].stopAtSlide > -1
          ? (i[r].lastslidetoshow = i[r].stopAtSlide)
          : (i[r].lastslidetoshow = 999),
        (i[r].stopLoop = !1),
        0 == i[r].looptogo && (i[r].stopLoop = !0);
      var o = i[r].c.find("rs-progress");
      i[r].c.on("stoptimer", function () {
        var t = e(this).find("rs-progress");
        t[0].tween.pause(),
          i[r].disableProgressBar && t.css({ visibility: "hidden" }),
          (i[r].sliderstatus = "paused"),
          i[r].slideInSwapTimer || i.unToggleState(i[r].slidertoggledby),
          (i[r].slideInSwapTimer = !1);
      }),
        i[r].c.on("starttimer", function () {
          i[r].forcepaused ||
            (1 != i[r].conthover &&
              1 != i[r].stopByVideo &&
              i[r].width > i[r].hideSliderAtLimit &&
              1 != i[r].tonpause &&
              1 != i[r].overnav &&
              1 != i[r].ssop &&
              (1 === i[r].noloopanymore ||
                (i[r].viewPort.enable && !i[r].inviewport) ||
                (o.css({ visibility: "visible" }),
                o[0].tween.resume(),
                (i[r].sliderstatus = "playing"))),
            i[r].disableProgressBar && o.css({ visibility: "hidden" }),
            i.toggleState(i[r].slidertoggledby));
        }),
        i[r].c.on("restarttimer", function () {
          if (!i[r].forcepaused) {
            var t = e(this).find("rs-progress");
            if (
              i[r].mouseoncontainer &&
              "on" == i[r].navigation.onHoverStop &&
              !a
            )
              return !1;
            1 === i[r].noloopanymore ||
            (i[r].viewPort.enable && !i[r].inviewport) ||
            1 == i[r].ssop
              ? i.unToggleState(i[r].slidertoggledby)
              : (t.css({ visibility: "visible" }),
                t[0].tween.kill(),
                (t[0].tween = tpGS.gsap.fromTo(
                  t,
                  i[r].duration / 1e3,
                  { width: "0%" },
                  {
                    force3D: "auto",
                    width: "100%",
                    ease: "none",
                    onComplete: s,
                    delay: 1,
                  }
                )),
                (i[r].sliderstatus = "playing"),
                i.toggleState(i[r].slidertoggledby)),
              i[r].disableProgressBar && t.css({ visibility: "hidden" }),
              i[r].mouseoncontainer &&
                1 == i[r].navigation.onHoverStop &&
                !a &&
                (i[r].c.trigger("stoptimer"),
                i[r].c.trigger("revolution.slide.onpause"));
          }
        }),
        i[r].c.on("nulltimer", function () {
          o[0].tween.kill(),
            (o[0].tween = tpGS.gsap.fromTo(
              o,
              i[r].duration / 1e3,
              { width: "0%" },
              {
                force3D: "auto",
                width: "100%",
                ease: "none",
                onComplete: s,
                delay: 1,
              }
            )),
            o[0].tween.pause(0),
            i[r].disableProgressBar && o.css({ visibility: "hidden" }),
            (i[r].sliderstatus = "paused");
        });
      var s = function () {
        r !== t &&
          i !== t &&
          i[r] !== t &&
          (0 == e("body").find(i[r].c).length ||
          null === i[r] ||
          null === i[r].c ||
          i[r].c === t ||
          0 === i[r].length
            ? (!(function (t) {
                i[t].c.children().each(function () {
                  try {
                    e(this).die("click");
                  } catch (e) {}
                  try {
                    e(this).die("mouseenter");
                  } catch (e) {}
                  try {
                    e(this).die("mouseleave");
                  } catch (e) {}
                  try {
                    e(this).unbind("hover");
                  } catch (e) {}
                });
                try {
                  i[t].c.die("click", "mouseenter", "mouseleave");
                } catch (e) {}
                clearInterval(i[t].cdint), (i[t].c = null);
              })(r),
              clearInterval(i[r].cdint))
            : (i[r].c.trigger("revolution.slide.slideatend"),
              1 == i[r].c.data("conthoverchanged") &&
                ((i[r].conthover = i[r].c.data("conthover")),
                i[r].c.data("conthoverchanged", 0)),
              i.callingNewSlide(r, 1, !0)));
      };
      (o[0].tween = tpGS.gsap.fromTo(
        o,
        i[r].duration / 1e3,
        { width: "0%" },
        {
          force3D: "auto",
          width: "100%",
          ease: "none",
          onComplete: s,
          delay: 1,
        }
      )),
        i[r].slideamount > 1 &&
        (0 != i[r].stopAfterLoops || 1 != i[r].stopAtSlide)
          ? i[r].c.trigger("starttimer")
          : ((i[r].noloopanymore = 1), i[r].c.trigger("nulltimer")),
        i[r].c.on("tp-mouseenter", function () {
          (i[r].mouseoncontainer = !0),
            1 != i[r].navigation.onHoverStop ||
              a ||
              (i[r].c.trigger("stoptimer"),
              i[r].c.trigger("revolution.slide.onpause"));
        }),
        i[r].c.on("tp-mouseleft", function () {
          (i[r].mouseoncontainer = !1),
            1 != i[r].c.data("conthover") &&
              1 == i[r].navigation.onHoverStop &&
              ((1 == i[r].viewPort.enable && i[r].inviewport) ||
                0 == i[r].viewPort.enable) &&
              (i[r].c.trigger("revolution.slide.onresume"),
              i[r].c.trigger("starttimer"));
        });
    },
    G = function () {
      e(".rev_redraw_on_blurfocus").each(function () {
        var e = this.id;
        if (i[e] == t || i[e].c == t || 0 === i[e].c.length) return !1;
        1 != i[e].windowfocused &&
          ((i[e].windowfocused = !0),
          tpGS.gsap.delayedCall(0.3, function () {
            i[e].fallbacks.nextSlideOnWindowFocus && i[e].c.revnext(),
              i[e].c.revredraw(),
              "playing" == i[e].lastsliderstatus && i[e].c.revresume(),
              i[e].c.trigger("revolution.slide.tabfocused");
          }));
      });
    },
    j = function () {
      document.hasFocus() ||
        e(".rev_redraw_on_blurfocus").each(function () {
          (i[this.id].windowfocused = !1),
            (i[this.id].lastsliderstatus = i[this.id].sliderstatus),
            i[this.id].c.revpause(),
            i[this.id].pr_next_bg !== t &&
              i[this.id].pr_next_bg.data("panzoom") !== t &&
              i.stopPanZoom(i[this.id].pr_next_bg, i[this.id]),
            i[this.id].pr_active_bg !== t &&
              i[this.id].pr_active_bg.data("panzoom") !== t &&
              i.stopPanZoom(i[this.id].pr_active_bg, i[this.id]),
            i[this.id].c.trigger("revolution.slide.tabblured");
        });
    },
    M = function () {
      var i = document.documentMode === t,
        a = window.chrome;
      1 !== e("body").data("revslider_focus_blur_listener") &&
        (e("body").data("revslider_focus_blur_listener", 1),
        i && !a
          ? e(window)
              .on("focusin", function () {
                G();
              })
              .on("focusout", function () {
                j();
              })
          : window.addEventListener
          ? (window.addEventListener(
              "focus",
              function (e) {
                G();
              },
              { capture: !1, passive: !0 }
            ),
            window.addEventListener(
              "blur",
              function (e) {
                j();
              },
              { capture: !1, passive: !0 }
            ))
          : (window.attachEvent("focus", function (e) {
              G();
            }),
            window.attachEvent("blur", function (e) {
              j();
            })));
    },
    H = function (e) {
      for (
        var t,
          i = [],
          a = window.location.href
            .slice(window.location.href.indexOf(e) + 1)
            .split("_"),
          r = 0;
        r < a.length;
        r++
      )
        (a[r] = a[r].replace("%3D", "=")),
          (t = a[r].split("=")),
          i.push(t[0]),
          (i[t[0]] = t[1]);
      return i;
    },
    N = function (e) {
      if (i[e].blockSpacing !== t) {
        var a = i[e].blockSpacing.split(";");
        for (var r in ((i[e].blockSpacing = {}), a))
          if (a.hasOwnProperty(r)) {
            var o = a[r].split(":");
            switch (o[0]) {
              case "t":
                i[e].blockSpacing.top = i.revToResp(o[1], 4, 0);
                break;
              case "b":
                i[e].blockSpacing.bottom = i.revToResp(o[1], 4, 0);
                break;
              case "l":
                i[e].blockSpacing.left = i.revToResp(o[1], 4, 0);
                break;
              case "r":
                i[e].blockSpacing.right = i.revToResp(o[1], 4, 0);
            }
          }
        (i[e].blockSpacing.block = i[e].c.closest(
          ".wp-block-themepunch-revslider"
        )),
          i[e].level !== t &&
            i[e].blockSpacing !== t &&
            tpGS.gsap.set(i[e].blockSpacing.block, {
              paddingLeft: i[e].blockSpacing.left[i[e].level],
              paddingRight: i[e].blockSpacing.right[i[e].level],
              marginTop: i[e].blockSpacing.top[i[e].level],
              marginBottom: i[e].blockSpacing.bottom[i[e].level],
            });
      }
    },
    D = function (e) {
      return e.charAt(0).toUpperCase() + e.slice(1);
    },
    Q = function (i) {
      return (function (i) {
        for (var a in ((i.minHeight =
          i.minHeight !== t
            ? "none" === i.minHeight ||
              "0" === i.minHeight ||
              "0px" === i.minHeight ||
              "" == i.minHeight ||
              " " == i.minHeight
              ? 0
              : parseInt(i.minHeight, 0)
            : 0),
        (i.maxHeight =
          "none" === i.maxHeight || "0" === i.maxHeight
            ? 0
            : parseInt(i.maxHeight, 0)),
        (i.carousel.maxVisibleItems =
          i.carousel.maxVisibleItems < 1 ? 999 : i.carousel.maxVisibleItems),
        (i.carousel.vertical_align =
          "top" === i.carousel.vertical_align
            ? "0%"
            : "bottom" === i.carousel.vertical_align
            ? "100%"
            : "50%"),
        (i.carousel.space = parseInt(i.carousel.space, 0)),
        (i.carousel.maxOpacity = parseInt(i.carousel.maxOpacity, 0)),
        (i.carousel.maxOpacity =
          i.carousel.maxOpacity > 1
            ? i.carousel.maxOpacity / 100
            : i.carousel.maxOpacity),
        (i.carousel.showLayersAllTime =
          "true" === i.carousel.showLayersAllTime ||
          !0 === i.carousel.showLayersAllTime
            ? "all"
            : i.carousel.showLayersAllTime),
        (i.carousel.maxRotation = parseInt(i.carousel.maxRotation, 0)),
        (i.carousel.minScale = parseInt(i.carousel.minScale, 0)),
        (i.carousel.minScale =
          i.carousel.minScale > 0.9
            ? i.carousel.minScale / 100
            : i.carousel.minScale),
        (i.carousel.speed = parseInt(i.carousel.speed, 0)),
        (i.navigation.maintypes = ["arrows", "tabs", "thumbnails", "bullets"]),
        i.navigation.maintypes))
          i.navigation.maintypes.hasOwnProperty(a) &&
            i.navigation[i.navigation.maintypes[a]] !== t &&
            ((i.navigation[i.navigation.maintypes[a]].animDelay =
              parseInt(i.navigation[i.navigation.maintypes[a]].animDelay, 0) /
              1e3),
            (i.navigation[i.navigation.maintypes[a]].animSpeed =
              parseInt(i.navigation[i.navigation.maintypes[a]].animSpeed, 0) /
              1e3));
        if (
          (e.isNumeric(i.scrolleffect.tilt) ||
            (-1 !== i.scrolleffect.tilt.indexOf("%") &&
              (i.scrolleffect.tilt = parseInt(i.scrolleffect.tilt))),
          (i.scrolleffect.tilt = i.scrolleffect.tilt / 100),
          (i.navigation.thumbnails.position =
            "outer-horizontal" == i.navigation.thumbnails.position
              ? "bottom" == i.navigation.thumbnails.v_align
                ? "outer-bottom"
                : "outer-top"
              : "outer-vertical" == i.navigation.thumbnails.position
              ? "left" == i.navigation.thumbnails.h_align
                ? "outer-left"
                : "outer-right"
              : i.navigation.thumbnails.position),
          (i.navigation.tabs.position =
            "outer-horizontal" == i.navigation.tabs.position
              ? "bottom" == i.navigation.tabs.v_align
                ? "outer-bottom"
                : "outer-top"
              : "outer-vertical" == i.navigation.tabs.position
              ? "left" == i.navigation.tabs.h_align
                ? "outer-left"
                : "outer-right"
              : i.navigation.tabs.position),
          (i.sbtimeline.speed = parseInt(i.sbtimeline.speed, 0) / 1e3 || 0.5),
          !0 === i.sbtimeline.set &&
          !0 === i.sbtimeline.fixed &&
          "auto" !== i.sliderLayout
            ? ((i.sbtimeline.fixStart = parseInt(i.sbtimeline.fixStart)),
              (i.sbtimeline.fixEnd = parseInt(i.sbtimeline.fixEnd)))
            : (i.sbtimeline.fixed = !1),
          (i.startDelay = parseInt(i.startDelay, 0) || 0),
          i.navigation !== t &&
            i.navigation.arrows != t &&
            i.navigation.arrows.hide_under != t &&
            (i.navigation.arrows.hide_under = parseInt(
              i.navigation.arrows.hide_under
            )),
          i.navigation !== t &&
            i.navigation.bullets != t &&
            i.navigation.bullets.hide_under != t &&
            (i.navigation.bullets.hide_under = parseInt(
              i.navigation.bullets.hide_under
            )),
          i.navigation !== t &&
            i.navigation.thumbnails != t &&
            i.navigation.thumbnails.hide_under != t &&
            (i.navigation.thumbnails.hide_under = parseInt(
              i.navigation.thumbnails.hide_under
            )),
          i.navigation !== t &&
            i.navigation.tabs != t &&
            i.navigation.tabs.hide_under != t &&
            (i.navigation.tabs.hide_under = parseInt(
              i.navigation.tabs.hide_under
            )),
          i.navigation !== t &&
            i.navigation.arrows != t &&
            i.navigation.arrows.hide_over != t &&
            (i.navigation.arrows.hide_over = parseInt(
              i.navigation.arrows.hide_over
            )),
          i.navigation !== t &&
            i.navigation.bullets != t &&
            i.navigation.bullets.hide_over != t &&
            (i.navigation.bullets.hide_over = parseInt(
              i.navigation.bullets.hide_over
            )),
          i.navigation !== t &&
            i.navigation.thumbnails != t &&
            i.navigation.thumbnails.hide_over != t &&
            (i.navigation.thumbnails.hide_over = parseInt(
              i.navigation.thumbnails.hide_over
            )),
          i.navigation !== t &&
            i.navigation.tabs != t &&
            i.navigation.tabs.hide_over != t &&
            (i.navigation.tabs.hide_over = parseInt(
              i.navigation.tabs.hide_over
            )),
          i.lazyloaddata !== t &&
            i.lazyloaddata.length > 0 &&
            i.lazyloaddata.indexOf("-") > 0)
        ) {
          var r = i.lazyloaddata.split("-");
          for (i.lazyloaddata = r[0], a = 1; a < r.length; a++)
            i.lazyloaddata += D(r[a]);
        }
        return (
          (i.duration = parseInt(i.duration)),
          "carousel" === i.sliderType &&
            i.carousel.justify &&
            ((i.justifyCarousel = !0), (i.keepBPHeight = !0)),
          (i.useFullScreenHeight =
            "carousel" === i.sliderType &&
            "fullscreen" === i.sliderLayout &&
            !0 === i.useFullScreenHeight),
          i
        );
      })(
        e.extend(
          !0,
          {
            sliderType: "standard",
            sliderLayout: "auto",
            dottedOverlay: "none",
            duration: 9e3,
            imgCrossOrigin: "",
            modal: {
              useAsModal: !1,
              cover: !0,
              coverColor: "rgba(0,0,0,0.5)",
              horizontal: "center",
              vertical: "middle",
            },
            navigation: {
              keyboardNavigation: !1,
              keyboard_direction: "horizontal",
              mouseScrollNavigation: "off",
              onHoverStop: !0,
              mouseScrollReverse: "default",
              touch: {
                touchenabled: !1,
                touchOnDesktop: !1,
                swipe_treshold: 75,
                swipe_min_touches: 1,
                swipe_direction: "horizontal",
                drag_block_vertical: !1,
                mobileCarousel: !0,
                desktopCarousel: !0,
              },
              arrows: {
                style: "",
                enable: !1,
                hide_onmobile: !1,
                hide_under: 0,
                hide_onleave: !1,
                hide_delay: 200,
                hide_delay_mobile: 1200,
                hide_over: 9999,
                tmp: "",
                rtl: !1,
                left: {
                  h_align: "left",
                  v_align: "center",
                  h_offset: 20,
                  v_offset: 0,
                  container: "slider",
                },
                right: {
                  h_align: "right",
                  v_align: "center",
                  h_offset: 20,
                  v_offset: 0,
                  container: "slider",
                },
              },
              bullets: {
                enable: !1,
                hide_onmobile: !1,
                hide_onleave: !1,
                hide_delay: 200,
                hide_delay_mobile: 1200,
                hide_under: 0,
                hide_over: 9999,
                direction: "horizontal",
                h_align: "center",
                v_align: "bottom",
                space: 5,
                h_offset: 0,
                v_offset: 20,
                tmp:
                  '<span class="tp-bullet-image"></span><span class="tp-bullet-title"></span>',
                container: "slider",
                rtl: !1,
                style: "",
              },
              thumbnails: {
                container: "slider",
                rtl: !1,
                style: "",
                enable: !1,
                width: 100,
                height: 50,
                min_width: 100,
                wrapper_padding: 2,
                wrapper_color: "transparent",
                tmp:
                  '<span class="tp-thumb-image"></span><span class="tp-thumb-title"></span>',
                visibleAmount: 5,
                hide_onmobile: !1,
                hide_onleave: !1,
                hide_delay: 200,
                hide_delay_mobile: 1200,
                hide_under: 0,
                hide_over: 9999,
                direction: "horizontal",
                span: !1,
                position: "inner",
                space: 2,
                h_align: "center",
                v_align: "bottom",
                h_offset: 0,
                v_offset: 20,
              },
              tabs: {
                container: "slider",
                rtl: !1,
                style: "",
                enable: !1,
                width: 100,
                min_width: 100,
                height: 50,
                wrapper_padding: 10,
                wrapper_color: "transparent",
                tmp: '<span class="tp-tab-image"></span>',
                visibleAmount: 5,
                hide_onmobile: !1,
                hide_onleave: !1,
                hide_delay: 200,
                hide_delay_mobile: 1200,
                hide_under: 0,
                hide_over: 9999,
                direction: "horizontal",
                span: !1,
                space: 0,
                position: "inner",
                h_align: "center",
                v_align: "bottom",
                h_offset: 0,
                v_offset: 20,
              },
            },
            responsiveLevels: 4064,
            visibilityLevels: [2048, 1024, 778, 480],
            gridwidth: 960,
            gridheight: 500,
            minHeight: 0,
            maxHeight: 0,
            keepBPHeight: !1,
            useFullScreenHeight: !0,
            overflowHidden: !1,
            forceOverflow: !1,
            fixedOnTop: !1,
            autoHeight: !1,
            gridEQModule: !1,
            disableForceFullWidth: !1,
            fullScreenOffsetContainer: "",
            fullScreenOffset: "0",
            hideLayerAtLimit: 0,
            hideAllLayerAtLimit: 0,
            hideSliderAtLimit: 0,
            disableProgressBar: !1,
            stopAtSlide: -1,
            stopAfterLoops: 0,
            shadow: 0,
            startDelay: 0,
            lazyType: "none",
            spinner: "off",
            shuffle: !1,
            viewPort: {
              enable: !1,
              outof: "wait",
              visible_area: "200px",
              presize: !1,
            },
            fallbacks: {
              isJoomla: !1,
              panZoomDisableOnMobile: !1,
              simplifyAll: !0,
              nextSlideOnWindowFocus: !1,
              disableFocusListener: !1,
              ignoreHeightChanges: "off",
              ignoreHeightChangesSize: 0,
              allowHTML5AutoPlayOnAndroid: !0,
            },
            parallax: {
              type: "off",
              levels: [
                10,
                15,
                20,
                25,
                30,
                35,
                40,
                45,
                50,
                55,
                60,
                65,
                70,
                75,
                80,
                85,
              ],
              origo: "enterpoint",
              disable_onmobile: !1,
              ddd_shadow: !1,
              ddd_bgfreeze: !1,
              ddd_overflow: "visible",
              ddd_layer_overflow: "visible",
              ddd_z_correction: 65,
              speed: 400,
              speedbg: 0,
              speedls: 0,
            },
            scrolleffect: {
              set: !1,
              fade: !1,
              blur: !1,
              scale: !1,
              grayscale: !1,
              maxblur: 10,
              layers: !1,
              slide: !1,
              direction: "both",
              multiplicator: 1.35,
              multiplicator_layers: 0.5,
              tilt: 30,
              disable_onmobile: !1,
            },
            sbtimeline: {
              set: !1,
              fixed: !1,
              fixStart: 0,
              fixEnd: 0,
              layers: !1,
              slide: !1,
              ease: "none",
              speed: 500,
            },
            carousel: {
              easing: "power3.inOut",
              speed: 800,
              showLayersAllTime: !1,
              horizontal_align: "center",
              vertical_align: "center",
              infinity: !1,
              space: 0,
              maxVisibleItems: 3,
              stretch: !1,
              fadeout: !0,
              maxRotation: 0,
              maxOpacity: 100,
              minScale: 0,
              offsetScale: !1,
              vary_fade: !1,
              vary_rotation: !1,
              vary_scale: !1,
              border_radius: "0px",
              padding_top: 0,
              padding_bottom: 0,
            },
            extensions: "extensions/",
            extensions_suffix: ".min.js",
            stopLoop: !1,
            waitForInit: !1,
          },
          i
        )
      );
    };
})(jQuery),
  (function ($, undefined) {
    "use strict";
    var _R = jQuery.fn.revolution,
      _ISM = _R.is_mobile();
    jQuery.extend(!0, _R, {
      checkActions: function (e, t) {
        e === undefined
          ? moduleEnterLeaveActions(t)
          : checkActions_intern(e, t);
      },
    });
    var moduleEnterLeaveActions = function (e) {
        !_R[e].moduleActionsPrepared &&
          _R[e].c[0].getElementsByClassName("rs-on-sh").length > 0 &&
          (_R[e].c.on("tp-mouseenter", function () {
            _R[e].mouseoncontainer = !0;
            var t,
              i =
                _R[e].pr_next_key !== undefined
                  ? _R[e].pr_next_key
                  : _R[e].pr_processing_key !== undefined
                  ? _R[e].pr_processing_key
                  : _R[e].pr_active_key !== undefined
                  ? _R[e].pr_active_key
                  : _R[e].pr_next_key;
            if ("none" !== i && i !== undefined) {
              if (
                (i = _R.gA(_R[e].slides[i], "key")) !== undefined &&
                _R[e].layers[i]
              )
                for (t in _R[e].layers[i])
                  _R[e].layers[i][t].className.indexOf("rs-on-sh") >= 0 &&
                    _R.renderLayerAnimation({
                      layer: jQuery(_R[e].layers[i][t]),
                      frame: "frame_1",
                      mode: "trigger",
                      id: e,
                    });
              for (t in _R[e].layers.static)
                _R[e].layers.static[t].className.indexOf("rs-on-sh") >= 0 &&
                  _R.renderLayerAnimation({
                    layer: jQuery(_R[e].layers.static[t]),
                    frame: "frame_1",
                    mode: "trigger",
                    id: e,
                  });
            }
          }),
          _R[e].c.on("tp-mouseleft", function () {
            _R[e].mouseoncontainer = !0;
            var t,
              i =
                _R[e].pr_next_key !== undefined
                  ? _R[e].pr_next_key
                  : _R[e].pr_processing_key !== undefined
                  ? _R[e].pr_processing_key
                  : _R[e].pr_active_key !== undefined
                  ? _R[e].pr_active_key
                  : _R[e].pr_next_key;
            if ("none" !== i && i !== undefined) {
              if (
                (i = _R.gA(_R[e].slides[i], "key")) !== undefined &&
                _R[e].layers[i]
              )
                for (t in _R[e].layers[i])
                  _R[e].layers[i][t].className.indexOf("rs-on-sh") >= 0 &&
                    _R.renderLayerAnimation({
                      layer: jQuery(_R[e].layers[i][t]),
                      frame: "frame_999",
                      mode: "trigger",
                      id: e,
                    });
              for (t in _R[e].layers.static)
                _R[e].layers.static[t].className.indexOf("rs-on-sh") >= 0 &&
                  _R.renderLayerAnimation({
                    layer: jQuery(_R[e].layers.static[t]),
                    frame: "frame_999",
                    mode: "trigger",
                    id: e,
                  });
            }
          })),
          (_R[e].moduleActionsPrepared = !0);
      },
      checkActions_intern = function (layer, id) {
        var actions = _R.gA(layer[0], "actions"),
          _L = layer.data();
        for (var ei in ((actions = actions.split("||")),
        layer.addClass("rs-waction"),
        (_L.events = _L.events === undefined ? [] : _L.events),
        actions))
          if (actions.hasOwnProperty(ei)) {
            var event = getEventParams(actions[ei].split(";"));
            _L.events.push(event),
              _R[id].fullscreen_esclistener ||
                ("exitfullscreen" != event.action &&
                  "togglefullscreen" != event.action) ||
                (jQuery(document).keyup(function (e) {
                  27 == e.keyCode &&
                    jQuery("#rs-go-fullscreen").length > 0 &&
                    layer.trigger(event.on);
                }),
                (_R[id].fullscreen_esclistener = !0));
            var targetlayer =
              "backgroundvideo" == event.layer
                ? jQuery("rs-bgvideo")
                : "firstvideo" == event.layer
                ? jQuery("rs-slide").find(".rs-layer-video")
                : jQuery("#" + event.layer);
            switch (
              (-1 !=
                jQuery.inArray(event.action, [
                  "toggleslider",
                  "toggle_mute_video",
                  "toggle_global_mute_video",
                  "togglefullscreen",
                ]) && (_L._togglelisteners = !0),
              event.action)
            ) {
              case "togglevideo":
                jQuery.each(targetlayer, function () {
                  updateToggleByList(
                    jQuery(this),
                    "videotoggledby",
                    layer[0].id
                  );
                });
                break;
              case "togglelayer":
                jQuery.each(targetlayer, function () {
                  updateToggleByList(
                    jQuery(this),
                    "layertoggledby",
                    layer[0].id
                  ),
                    jQuery(this).data(
                      "triggered_startstatus",
                      event.togglestate
                    );
                });
                break;
              case "toggle_global_mute_video":
              case "toggle_mute_video":
                jQuery.each(targetlayer, function () {
                  updateToggleByList(
                    jQuery(this),
                    "videomutetoggledby",
                    layer[0].id
                  );
                });
                break;
              case "toggleslider":
                _R[id].slidertoggledby == undefined &&
                  (_R[id].slidertoggledby = []),
                  _R[id].slidertoggledby.push(layer[0].id);
                break;
              case "togglefullscreen":
                _R[id].fullscreentoggledby == undefined &&
                  (_R[id].fullscreentoggledby = []),
                  _R[id].fullscreentoggledby.push(layer[0].id);
            }
          }
        (_R[id].actionsPrepared = !0),
          layer.on("click mouseenter mouseleave", function (e) {
            for (var i in _L.events)
              if (_L.events.hasOwnProperty(i) && _L.events[i].on === e.type) {
                var event = _L.events[i];
                if (
                  "click" === event.on &&
                  layer.hasClass("tp-temporarydisabled")
                )
                  return !1;
                var targetlayer =
                    "backgroundvideo" == event.layer
                      ? jQuery(_R[id].slides[_R[id].pr_active_key]).find(
                          "rs-sbg-wrap rs-bgvideo"
                        )
                      : "firstvideo" == event.layer
                      ? jQuery(_R[id].slides[_R[id].pr_active_key])
                          .find(".rs-layer-video")
                          .first()
                      : jQuery("#" + event.layer),
                  tex = targetlayer.length > 0;
                switch (event.action) {
                  case "nextframe":
                  case "prevframe":
                  case "gotoframe":
                  case "togglelayer":
                  case "toggleframes":
                  case "startlayer":
                  case "stoplayer":
                    if (targetlayer[0] === undefined) continue;
                    var _ = _R[id]._L[targetlayer[0].id],
                      frame = event.frame,
                      tou = "triggerdelay";
                    if (
                      "click" === e.type &&
                      _.clicked_time_stamp !== undefined &&
                      new Date().getTime() - _.clicked_time_stamp < 300
                    )
                      return;
                    if (
                      "mouseenter" === e.type &&
                      _.mouseentered_time_stamp !== undefined &&
                      new Date().getTime() - _.mouseentered_time_stamp < 300
                    )
                      return;
                    if (
                      (clearTimeout(_.triggerdelayIn),
                      clearTimeout(_.triggerdelayOut),
                      clearTimeout(_.triggerdelay),
                      "click" === e.type &&
                        (_.clicked_time_stamp = new Date().getTime()),
                      "mouseenter" === e.type &&
                        (_.mouseentered_time_stamp = new Date().getTime()),
                      "mouseleave" === e.type &&
                        (_.mouseentered_time_stamp = undefined),
                      "nextframe" === event.action ||
                        "prevframe" === event.action)
                    ) {
                      _.forda =
                        _.forda === undefined ? getFordWithAction(_) : _.forda;
                      var inx = jQuery.inArray(_.currentframe, _.ford);
                      for (
                        "nextframe" === event.action && inx++,
                          "prevframe" === event.action && inx--;
                        "skip" !== _.forda[inx] &&
                        inx > 0 &&
                        inx < _.forda.length - 1;

                      )
                        "nextframe" === event.action && inx++,
                          "prevframe" === event.action && inx--,
                          (inx = Math.min(
                            Math.max(0, inx),
                            _.forda.length - 1
                          ));
                      frame = _.ford[inx];
                    }
                    jQuery.inArray(event.action, [
                      "toggleframes",
                      "togglelayer",
                      "startlayer",
                      "stoplayer",
                    ]) >= 0 &&
                      ((_.triggeredstate =
                        "startlayer" === event.action ||
                        ("togglelayer" === event.action &&
                          "frame_1" !== _.currentframe) ||
                        ("toggleframes" === event.action &&
                          _.currentframe !== event.frameN)),
                      "togglelayer" === event.action &&
                        !0 === _.triggeredstate &&
                        _.currentframe !== undefined &&
                        "frame_999" !== _.currentframe &&
                        (_.triggeredstate = !1),
                      (frame = _.triggeredstate
                        ? "toggleframes" === event.action
                          ? event.frameN
                          : "frame_1"
                        : "toggleframes" === event.action
                        ? event.frameM
                        : "frame_999"),
                      (tou = _.triggeredstate
                        ? "triggerdelayIn"
                        : "triggerdelayOut"),
                      _.triggeredstate
                        ? _R.toggleState(_.layertoggledby)
                        : (_R.stopVideo && _R.stopVideo(targetlayer, id),
                          _R.unToggleState(_.layertoggledby)));
                    var pars = {
                      layer: targetlayer,
                      frame: frame,
                      mode: "trigger",
                      id: id,
                    };
                    !0 === event.children &&
                      ((pars.updateChildren = !0), (pars.fastforward = !0)),
                      _R.renderLayerAnimation &&
                        (clearTimeout(_[tou]),
                        (_[tou] = setTimeout(
                          function (e) {
                            _R.renderLayerAnimation(e);
                          },
                          1e3 * event.delay,
                          pars
                        )));
                    break;
                  case "playvideo":
                    tex && _R.playVideo(targetlayer, id);
                    break;
                  case "stopvideo":
                    tex && _R.stopVideo && _R.stopVideo(targetlayer, id);
                    break;
                  case "togglevideo":
                    tex &&
                      (_R.isVideoPlaying(targetlayer, id)
                        ? _R.stopVideo && _R.stopVideo(targetlayer, id)
                        : _R.playVideo(targetlayer, id));
                    break;
                  case "mutevideo":
                    tex && _R.Mute(targetlayer, id, !0);
                    break;
                  case "unmutevideo":
                    tex && _R.Mute && _R.Mute(targetlayer, id, !1);
                    break;
                  case "toggle_mute_video":
                    tex &&
                      (_R.Mute(targetlayer, id)
                        ? _R.Mute(targetlayer, id, !1)
                        : _R.Mute && _R.Mute(targetlayer, id, !0));
                    break;
                  case "toggle_global_mute_video":
                    var pvl =
                      _R[id].playingvideos != undefined &&
                      _R[id].playingvideos.length > 0;
                    pvl &&
                      (_R[id].globalmute
                        ? jQuery.each(_R[id].playingvideos, function (e, t) {
                            _R.Mute && _R.Mute(t, id, !1);
                          })
                        : jQuery.each(_R[id].playingvideos, function (e, t) {
                            _R.Mute && _R.Mute(t, id, !0);
                          })),
                      (_R[id].globalmute = !_R[id].globalmute);
                    break;
                  default:
                    tpGS.gsap.delayedCall(
                      event.delay,
                      function (targetlayer, id, event, layer) {
                        switch (event.action) {
                          case "openmodal":
                            if (
                              ((event.modalslide =
                                event.modalslide === undefined
                                  ? 0
                                  : event.modalslide),
                              window.RS_60_MODALS === undefined ||
                                -1 ==
                                  jQuery.inArray(
                                    event.modal,
                                    window.RS_60_MODALS
                                  ))
                            ) {
                              _R.showModalCover(id, event, "show");
                              var data = {
                                action: "revslider_ajax_call_front",
                                client_action: "get_slider_html",
                                token: _R[id].ajaxNonce,
                                alias: event.modal,
                                usage: "modal",
                              };
                              jQuery.ajax({
                                type: "post",
                                url: _R[id].ajaxUrl,
                                dataType: "json",
                                data: data,
                                success: function (e, t, i) {
                                  1 == e.success &&
                                    (jQuery("body").append(e.data),
                                    setTimeout(function () {
                                      _R.showModalCover(id, event, "hide"),
                                        jQuery(document).trigger(
                                          "RS_OPENMODAL_" + event.modal,
                                          event.modalslide
                                        );
                                    }, 49));
                                },
                                error: function (e) {
                                  console.log("Modal Can not be Loaded"),
                                    console.log(e);
                                },
                              });
                            } else
                              jQuery(document).trigger(
                                "RS_OPENMODAL_" + event.modal,
                                event.modalslide
                              );
                            break;
                          case "closemodal":
                            _R.revModal(id, { mode: "close" });
                            break;
                          case "callback":
                            eval(event.callback);
                            break;
                          case "simplelink":
                            window.open(event.url, event.target);
                            break;
                          case "simulateclick":
                            targetlayer.length > 0 && targetlayer.click();
                            break;
                          case "toggleclass":
                            targetlayer.length > 0 &&
                              targetlayer.toggleClass(event.classname);
                            break;
                          case "scrollbelow":
                          case "scrollto":
                            layer.addClass("tp-scrollbelowslider");
                            var doc = jQuery(document),
                              off =
                                "scrollbelow" === event.action
                                  ? (getOffContH(
                                      _R[id].fullScreenOffsetContainer
                                    ) || 0) -
                                      (parseInt(event.offset, 0) || 0) || 0
                                  : 0 - (parseInt(event.offset, 0) || 0),
                              c =
                                "scrollbelow" === event.action
                                  ? _R[id].c
                                  : jQuery("#" + event.id),
                              ctop = c.length > 0 ? c.offset().top : 0,
                              sobj = {
                                _y:
                                  window.pageYOffset !==
                                  document.documentElement.scrollTop
                                    ? 0 !== window.pageYOffset
                                      ? window.pageYOffset
                                      : document.documentElement.scrollTop
                                    : window.pageYOffset,
                              };
                            (ctop +=
                              "scrollbelow" === event.action
                                ? jQuery(_R[id].slides[0]).height()
                                : 0),
                              tpGS.gsap.to(sobj, event.speed / 1e3, {
                                _y: ctop - off,
                                ease: event.ease,
                                onUpdate: function () {
                                  doc.scrollTop(sobj._y);
                                },
                              });
                            break;
                          case "jumptoslide":
                            switch (event.slide.toLowerCase()) {
                              case "+1":
                              case "next":
                                (_R[id].sc_indicator = "arrow"),
                                  (_R[id].sc_indicator_dir = 0),
                                  _R.callingNewSlide(
                                    id,
                                    1,
                                    "carousel" === _R[id].sliderType
                                  );
                                break;
                              case "previous":
                              case "prev":
                              case "-1":
                                (_R[id].sc_indicator = "arrow"),
                                  (_R[id].sc_indicator_dir = 1),
                                  _R.callingNewSlide(
                                    id,
                                    -1,
                                    "carousel" === _R[id].sliderType
                                  );
                                break;
                              case "first":
                                (_R[id].sc_indicator = "arrow"),
                                  (_R[id].sc_indicator_dir = 1),
                                  _R.callingNewSlide(
                                    id,
                                    0,
                                    "carousel" === _R[id].sliderType
                                  );
                                break;
                              case "last":
                                (_R[id].sc_indicator = "arrow"),
                                  (_R[id].sc_indicator_dir = 0),
                                  _R.callingNewSlide(
                                    id,
                                    _R[id].slideamount - 1,
                                    "carousel" === _R[id].sliderType
                                  );
                                break;
                              default:
                                var ts = jQuery.isNumeric(event.slide)
                                  ? parseInt(event.slide, 0)
                                  : event.slide;
                                _R.callingNewSlide(
                                  id,
                                  ts,
                                  "carousel" === _R[id].sliderType
                                );
                            }
                            break;
                          case "toggleslider":
                            (_R[id].noloopanymore = 0),
                              "playing" == _R[id].sliderstatus
                                ? (_R[id].c.revpause(),
                                  (_R[id].forcepaused = !0),
                                  _R.unToggleState(_R[id].slidertoggledby))
                                : ((_R[id].forcepaused = !1),
                                  _R[id].c.revresume(),
                                  _R.toggleState(_R[id].slidertoggledby));
                            break;
                          case "pauseslider":
                            _R[id].c.revpause(),
                              _R.unToggleState(_R[id].slidertoggledby);
                            break;
                          case "playslider":
                            (_R[id].noloopanymore = 0),
                              _R[id].c.revresume(),
                              _R.toggleState(_R[id].slidertoggledby);
                            break;
                          case "gofullscreen":
                          case "exitfullscreen":
                          case "togglefullscreen":
                            var gf;
                            jQuery(".rs-go-fullscreen").length > 0 &&
                            ("togglefullscreen" == event.action ||
                              "exitfullscreen" == event.action)
                              ? (jQuery(".rs-go-fullscreen").removeClass(
                                  "rs-go-fullscreen"
                                ),
                                (gf =
                                  _R[id].c.closest("rs-fullwidth-wrap").length >
                                  0
                                    ? _R[id].c.closest("rs-fullwidth-wrap")
                                    : _R[id].c.closest("rs-module-wrap")),
                                (_R[id].minHeight = _R[id].oldminheight),
                                (_R[id].infullscreenmode = !1),
                                _R[id].c.revredraw(),
                                jQuery(window).trigger("resize"),
                                _R.unToggleState(_R[id].fullscreentoggledby))
                              : 0 != jQuery(".rs-go-fullscreen").length ||
                                ("togglefullscreen" != event.action &&
                                  "gofullscreen" != event.action) ||
                                ((gf =
                                  _R[id].c.closest("rs-fullwidth-wrap").length >
                                  0
                                    ? _R[id].c.closest("rs-fullwidth-wrap")
                                    : _R[id].c.closest("rs-module-wrap")),
                                gf.addClass("rs-go-fullscreen"),
                                (_R[id].oldminheight = _R[id].minHeight),
                                (_R[id].minHeight = jQuery(window).height()),
                                (_R[id].infullscreenmode = !0),
                                _R[id].c.revredraw(),
                                jQuery(window).trigger("resize"),
                                _R.toggleState(_R[id].fullscreentoggledby));
                            break;
                          default:
                            _R[id].c.trigger("layeraction", [
                              event.action,
                              layer,
                              event,
                            ]);
                        }
                      },
                      [targetlayer, id, event, layer]
                    );
                }
              }
          });
      };
    function getFordWithAction(e) {
      var t = [];
      for (var i in e.ford)
        e.frames[e.ford[i]].timeline.waitoncall
          ? t.push(e.ford[i])
          : t.push("skip");
      return t;
    }
    function updateToggleByList(e, t, i) {
      var a = e.data(t);
      a === undefined && (a = []), a.push(i), e.data(t, a);
    }
    function getEventParams(e) {
      var t = { on: "click", delay: 0, ease: "power2.out", speed: 400 };
      for (var i in e)
        if (e.hasOwnProperty(i)) {
          var a = e[i].split(":");
          switch (a[0]) {
            case "modal":
              t.modal = a[1];
              break;
            case "ms":
              t.modalslide = a[1];
              break;
            case "m":
              t.frameM = a[1];
              break;
            case "n":
              t.frameN = a[1];
              break;
            case "o":
              t.on =
                "click" === a[1] || "c" === a[1]
                  ? "click"
                  : "ml" === a[1] || "mouseleave" === a[1]
                  ? "mouseleave"
                  : "mouseenter" === a[1] || "me" === a[1]
                  ? "mouseenter"
                  : a[1];
              break;
            case "d":
              (t.delay = parseInt(a[1], 0) / 1e3),
                (t.delay = "NaN" === t.delay || isNaN(t.delay) ? 0 : t.delay);
              break;
            case "a":
              t.action = a[1];
              break;
            case "f":
              t.frame = a[1];
              break;
            case "slide":
              t.slide = a[1];
              break;
            case "layer":
              t.layer = a[1];
              break;
            case "sp":
              t.speed = parseInt(a[1], 0);
              break;
            case "e":
              t.ease = a[1];
              break;
            case "ls":
              t.togglestate = a[1];
              break;
            case "offset":
              t.offset = a[1];
              break;
            case "call":
              t.callback = a[1];
              break;
            case "url":
              t.url = "";
              for (var r = 1; r < a.length; r++)
                t.url += a[r] + (r === a.length - 1 ? "" : ":");
              break;
            case "target":
              t.target = a[1];
              break;
            case "class":
              t.classname = a[1];
              break;
            case "ch":
              t.children = "true" == a[1] || 1 == a[1] || "t" == a[1];
              break;
            default:
              a[0].length > 0 && "" !== a[0] && (t[a[0]] = a[1]);
          }
        }
      return t;
    }
    var getOffContH = function (e) {
      if (e == undefined) return 0;
      if (e.split(",").length > 1) {
        var t = e.split(","),
          i = 0;
        return (
          t &&
            jQuery.each(t, function (e, t) {
              jQuery(t).length > 0 && (i += jQuery(t).outerHeight(!0));
            }),
          i
        );
      }
      return jQuery(e).height();
    };
  })(jQuery),
  (function (e) {
    "use strict";
    var t = jQuery.fn.revolution;
    t.is_mobile();
    jQuery.extend(!0, t, {
      prepareCarousel: function (e, i, a) {
        if (void 0 !== e) {
          var s = t[e].carousel;
          (s.slidepositions =
            void 0 === s.slidepositions ? [] : s.slidepositions),
            (s.slideFakePositions =
              void 0 === s.slideFakePositions ? [] : s.slideFakePositions),
            (i = s.lastdirection = o(i, s.lastdirection)),
            r(e),
            void 0 === s.slidepositions[0] &&
              (t.organiseCarousel(e, "right", !0, !1, !1),
              (s.focused = 0),
              (s.keepFocusedFirst = !0)),
            (s.slide_offset =
              void 0 !== s.slide_offset && jQuery.isNumeric(s.slide_offset)
                ? s.slide_offset
                : 0),
            (s.swipeTo = s.slide_offset + n(e)),
            void 0 !== s.swipeTo && jQuery.isNumeric(s.swipeTo)
              ? void 0 !== a
                ? t.swipeAnimate({
                    id: e,
                    to: s.swipeTo,
                    direction: i,
                    fix: !0,
                    speed: a,
                  })
                : t.swipeAnimate({
                    id: e,
                    to: s.swipeTo,
                    direction: i,
                    fix: !0,
                  })
              : t.swipeAnimate({ id: e, to: 0, direction: i, speed: 0 });
        }
      },
      carouselToEvalPosition: function (e, a, r) {
        var s = t[e].carousel;
        if (s.justify)
          (s.focused = void 0 === s.focused ? 0 : s.focused),
            (s.slidepositions[s.focused] =
              void 0 === s.slidepositions[s.focused]
                ? 0
                : s.slidepositions[s.focused]),
            (s.slide_offset_target = i(e, s.focused));
        else {
          a = s.lastdirection = o(a, s.lastdirection);
          var n =
              "center" === s.horizontal_align
                ? (s.wrapwidth / 2 - s.slide_width / 2 - s.slide_offset) /
                  s.slide_width
                : (0 - s.slide_offset) / s.slide_width,
            l = n % t[e].slideamount,
            d = l - Math.floor(l),
            c = -1 * (Math.ceil(l) - l),
            p = -1 * (Math.floor(l) - l),
            g = d * s.slide_width,
            u =
              g >= 20 && "left" === a
                ? 1
                : g >= s.slide_width - 20 && "right" === a
                ? 2
                : g < 20 && "left" === a
                ? 3
                : g < s.slide_width - 20 && "right" === a
                ? 4
                : 5,
            f = 1 === u || 2 === u ? c : 3 === u || 4 === u ? p : 0;
          s.slide_offset_target =
            (s.infinity
              ? f
              : l < 0
              ? l
              : n > t[e].slideamount - 1
              ? n - (t[e].slideamount - 1)
              : f) * s.slide_width;
        }
        return (
          s.slide_offset_target !== s.slide_offset_targetCACHE &&
            !0 !== r &&
            (0 !== Math.abs(s.slide_offset_target)
              ? t.animateCarousel(e, a, !0)
              : t.organiseCarousel(e, a),
            (s.slide_offset_targetCACHE = s.slide_offset_target)),
          s.slide_offset_target
        );
      },
      loadVisibleCarouselItems: function (e, i) {
        var a = [];
        t[e].carousel.focused = parseInt(t[e].carousel.focused, 0);
        for (var r = 0; r < Math.ceil(t[e].carousel.maxVisibleItems / 2); r++) {
          var o =
              "right" === t[e].carousel.horizontal_align
                ? t[e].carousel.focused - r
                : t[e].carousel.focused + r,
            s =
              "center" === t[e].carousel.horizontal_align
                ? t[e].carousel.focused - r
                : "left" === t[e].carousel.horizontal_align
                ? t[e].carousel.maxVisibleItems + o - 1
                : o - t[e].carousel.maxVisibleItems + 1;
          (o = o >= t[e].slideamount ? o - t[e].slideamount + 0 : o),
            (s = s >= t[e].slideamount ? s - t[e].slideamount + 0 : s),
            (o = o < 0 ? t[e].slideamount + o : o),
            (s = s < 0 ? t[e].slideamount + s : s),
            a.push(t[e].slides[o]),
            o !== s && a.push(t[e].slides[s]);
        }
        return i && (t.loadImages(a, e, 1), t.waitForCurrentImages(a, e)), a;
      },
      organiseCarousel: function (e, i, a, r, o) {
        Math.round(1e5 * Math.random());
        var s = t[e].carousel,
          n = "center" === s.horizontal_align ? 2 : 1,
          l = Math.ceil(s.maxVisibleItems / n),
          d =
            "center" === s.horizontal_align
              ? s.wrapwidth / 2 + s.maxwidth / 2
              : s.maxwidth - s.slide_width,
          c =
            "center" === s.horizontal_align
              ? s.wrapwidth / 2 - s.maxwidth / 2
              : 0 - s.slide_width,
          p = 0,
          g = 0,
          u = 0;
        if (
          ((i = s.slide_offset < s.cached_slide_offset ? "left" : "right"),
          (s.cached_slide_offset = s.slide_offset),
          !0 !== s.justify && "center" === s.horizontal_align)
        ) {
          var f = 2 * (s.windhalf - s.wrapoffset) + s.slide_width;
          f >= s.maxwidth &&
            ("left" === i &&
              ((d = 2 * s.windhalf),
              (c = 0 - (s.slide_width - (f - s.maxwidth)))),
            "right" === i &&
              ((d = 2 * s.windhalf - (f - s.maxwidth)),
              (c = 0 - s.slide_width)));
        }
        for (var h = 2 * s.windhalf, m = 0, v = -1, y = 0; y < s.len; y++)
          !0 === s.justify
            ? ((p += y > 0 ? s.slide_widths[y - 1] + s.space : s.slide_offset),
              s.wrapwidth >= s.maxwidth &&
                "center" !== s.horizontal_align &&
                (s.slideFakePositions[y] = p - s.slide_offset),
              (c = 0 - s.slide_widths[y]),
              (d = s.maxwidth - s.slide_widths[y]),
              (s.inneroffset = 0))
            : ((p = y * s.slide_width + s.slide_offset),
              s.wrapwidth >= s.maxwidth &&
                "left" === s.horizontal_align &&
                (s.slideFakePositions[y] = y * s.slide_width),
              s.wrapwidth >= s.maxwidth &&
                "right" === s.horizontal_align &&
                (s.slideFakePositions[y] =
                  s.wrapwidth - (y + 1) * s.slide_width)),
            (u = g = p),
            s.infinity &&
              (g =
                g >= d - s.inneroffset
                  ? g - s.maxwidth
                  : g <= c - s.inneroffset
                  ? g + s.maxwidth
                  : g),
            h > g && ((h = g), y),
            m < g && ((m = g), (v = y)),
            (s.slidepositions[y] =
              u > s.maxwidth + d
                ? g - s.maxwidth
                : u < c - s.maxwidth
                ? g + s.maxwidth
                : g);
        s.infinity &&
          h > 0 &&
          m > s.wrapwidth &&
          (s.slidepositions[v] -= s.maxwidth);
        var b = 999,
          _ = 0,
          w = (t[e].ulw, !1),
          x = "right" === s.horizontal_align ? 0 : s.wrapwidth;
        t[e].slides &&
          jQuery.each(t[e].slides, function (i, a) {
            var r = {
                left: s.slidepositions[i] + s.inneroffset,
                width: !0 === s.justify ? s.slide_widths[i] : s.slide_width,
                x: 0,
                transformPerspective: 1200,
                transformOrigin: "50% " + s.vertical_align,
                scale: 1,
              },
              d = 0;
            if (s.justify)
              (r.autoAlpha = 1),
                (s.wrapwidth >= s.maxwidth &&
                  "center" !== s.horizontal_align) ||
                  ("center" === s.horizontal_align &&
                  s.slidepositions[i] < s.windhalf &&
                  s.slidepositions[i] + s.slide_widths[i] > s.windhalf
                    ? (s.focused = i)
                    : "left" === s.horizontal_align &&
                      s.slidepositions[i] >= -25 &&
                      s.slidepositions[i] < s.windhalf &&
                      (!w || s.slidepositions[i] < x)
                    ? ((s.focused = i), (w = !0), (x = s.slidepositions[i]))
                    : "right" === s.horizontal_align &&
                      s.slidepositions[i] + s.slide_widths[i] <=
                        s.wrapwidth + 25 &&
                      ((s.slide_widths[i] < s.windhalf &&
                        s.slidepositions[i] > s.windhalf) ||
                        s.slidepositions[i] >
                          s.wrapwidth - s.slide_widths[i]) &&
                      (!w || s.slidepositions[i] > x) &&
                      ((s.focused = i), (w = !0), (x = s.slidepositions[i])),
                  (s.focused =
                    s.focused >= s.len
                      ? s.infinity
                        ? 0
                        : s.len - 1
                      : s.focused < 0
                      ? s.infinity
                        ? s.len - 1
                        : 0
                      : s.focused));
            else {
              (d =
                "center" === s.horizontal_align
                  ? (Math.abs(s.wrapwidth / 2) - (r.left + s.slide_width / 2)) /
                    s.slide_width
                  : (s.inneroffset - r.left) / s.slide_width),
                (Math.abs(d) < b || 0 === d) &&
                  ((b = Math.abs(d)), (s.focused = i)),
                void 0 !== s.minScale &&
                  s.minScale > 0 &&
                  (s.vary_scale
                    ? (r.scale = 1 - Math.abs(((1 - s.minScale) / l) * d))
                    : (r.scale =
                        d >= 1 || d <= -1
                          ? s.minScale
                          : s.minScale + (1 - s.minScale) * (1 - Math.abs(d))),
                  (_ = (d * (r.width - r.width * r.scale)) / 2)),
                s.fadeout &&
                  (s.vary_fade
                    ? (r.autoAlpha = 1 - Math.abs((s.maxOpacity / l) * d))
                    : (r.autoAlpha =
                        d >= 1 || d <= -1
                          ? s.maxOpacity
                          : s.maxOpacity +
                            (1 - s.maxOpacity) * (1 - Math.abs(d))));
              var c = Math.ceil(s.maxVisibleItems / n) - Math.abs(d);
              (r.autoAlpha = void 0 === r.autoAlpha ? 1 : r.autoAlpha),
                (r.autoAlpha = Math.max(0, Math.min(c, r.autoAlpha))),
                void 0 !== s.maxRotation &&
                  0 != Math.abs(s.maxRotation) &&
                  (s.vary_rotation
                    ? ((r.rotationY =
                        Math.abs(s.maxRotation) -
                        Math.abs((1 - Math.abs((1 / l) * d)) * s.maxRotation)),
                      (r.autoAlpha =
                        Math.abs(r.rotationY) > 90 ? 0 : r.autoAlpha))
                    : (r.rotationY =
                        d >= 1 || d <= -1
                          ? s.maxRotation
                          : Math.abs(d) * s.maxRotation),
                  (r.rotationY = d < 0 ? -1 * r.rotationY : r.rotationY)),
                (r.x = Math.floor(
                  -1 * s.space * d * (s.offsetScale ? r.scale : 1)
                )),
                void 0 !== r.scale && (r.x = r.x + _);
            }
            (r.x +=
              s.wrapwidth >= s.maxwidth &&
              ("left" === s.horizontal_align || "right" === s.horizontal_align)
                ? s.slideFakePositions[i]
                : Math.floor(r.left)),
              delete r.left,
              (r.zIndex = s.justify ? 95 : Math.round(100 - Math.abs(5 * d))),
              (r.force3D = !0),
              (r.transformStyle =
                "3D" != t[e].parallax.type && "3d" != t[e].parallax.type
                  ? "flat"
                  : "preserve-3d"),
              !0 !== o && tpGS.gsap.set(a, r);
          }),
          r &&
            !0 !== o &&
            ((s.focused = void 0 === s.focused ? 0 : s.focused),
            (s.oldfocused = void 0 === s.oldfocused ? 0 : s.oldfocused),
            (t[e].pr_next_key = s.focused),
            s.focused !== s.oldfocused &&
              t.animateTheLayers &&
              (t.removeTheLayers(jQuery(t[e].slides[s.oldfocused]), e),
              t.animateTheLayers({ slide: s.focused, id: e, mode: "start" }),
              t.loadVisibleCarouselItems(e, !0)),
            (s.oldfocused = s.focused),
            t[e].c.trigger("revolution.nextslide.waiting"));
      },
      swipeAnimate: function (e) {
        var i = t[e.id].carousel,
          r = { from: i.slide_offset, to: e.to },
          o = void 0 === e.speed ? 0.5 : e.speed;
        if ((void 0 !== i.positionanim && i.positionanim.pause(), e.fix)) {
          if (!1 !== i.snap) {
            var s = i.slide_offset,
              n = "end" === e.phase ? i.focusedBeforeSwipe : i.focused;
            (i.slide_offset = e.to),
              t.organiseCarousel(e.id, e.direction, !0, !1, !1),
              Math.abs(i.swipeDistance) > 40 &&
                n == i.focused &&
                ((i.focused =
                  "right" === e.direction ? i.focused - 1 : i.focused + 1),
                (i.focused =
                  i.focused >= i.len
                    ? i.infinity
                      ? 0
                      : i.len - 1
                    : i.focused < 0
                    ? i.infinity
                      ? i.len - 1
                      : 0
                    : i.focused)),
              (r.to += t.carouselToEvalPosition(e.id, e.direction, !0)),
              (i.slide_offset = s),
              t.organiseCarousel(e.id, e.direction, !0, !1, !1),
              i.keepFocusedFirst &&
                ((i.keepFocusedFirst = !1), (i.focused = 0));
          } else
            !0 !== i.infinity
              ? (r.to > 0 && (r.to = 0),
                r.to < i.wrapwidth - i.maxwidth &&
                  (r.to = i.wrapwidth - i.maxwidth))
              : "end" === e.phase
              ? (i.dragModeJustEnded = !0)
              : !0 !== i.dragModeJustEnded
              ? (r.to += t.carouselToEvalPosition(e.id, e.direction, !0))
              : (i.dragModeJustEnded = !1);
          0 !==
            (o =
              (i.speed / 1e3) *
              a(Math.abs(Math.abs(r.from) - Math.abs(r.to)) / i.wrapwidth)) &&
            o < 0.1 &&
            Math.abs(r.to) > 25 &&
            (o = 0.3);
        }
        (i.swipeDistance = 0),
          (i.positionanim = tpGS.gsap.to(r, 0.7, {
            from: r.to,
            onUpdate: function () {
              (i.slide_offset = r.from % i.maxwidth),
                t.organiseCarousel(
                  e.id,
                  e.direction,
                  !0 !== e.fix,
                  !0 !== e.fix
                ),
                (i.slide_offset = r.from);
            },
            onComplete: function () {
              (i.slide_offset = r.from % i.maxwidth),
                "carousel" !== t[e.id].sliderType ||
                  i.fadein ||
                  (tpGS.gsap.to(t[e.id].canvas, 1, { scale: 1, opacity: 1 }),
                  (i.fadein = !0)),
                (i.lastNotSimplifedSlideOffset = i.slide_offset),
                (i.justDragged = !1),
                e.fix &&
                  ((i.focusedAfterAnimation = i.focused),
                  e.newSlide &&
                    i.focusedBeforeSwipe !== i.focused &&
                    t.callingNewSlide(
                      e.id,
                      jQuery(t[e.id].slides[i.focused]).data("key"),
                      !0
                    ),
                  t.organiseCarousel(e.id, e.direction, !0, !0),
                  t[e.id].c.trigger("revolution.slide.carouselchange", {
                    slider: e.id,
                    slideIndex: parseInt(t[e.id].pr_active_key, 0) + 1,
                    slideLIIndex: t[e.id].pr_active_key,
                    slide: t[e.id].pr_next_slide,
                    currentslide: t[e.id].pr_next_slide,
                    prevSlideIndex:
                      void 0 !== t[e.id].pr_lastshown_key &&
                      parseInt(t[e.id].pr_lastshown_key, 0) + 1,
                    prevSlideLIIndex:
                      void 0 !== t[e.id].pr_lastshown_key &&
                      parseInt(t[e.id].pr_lastshown_key, 0),
                    prevSlide:
                      void 0 !== t[e.id].pr_lastshown_key &&
                      t[e.id].slides[t[e.id].pr_lastshown_key],
                  }));
            },
            ease: e.easing ? e.easing : i.easing,
          }));
      },
    });
    var i = function (e, i) {
        var a = t[e].carousel;
        return "center" === a.horizontal_align
          ? a.windhalf - a.slide_widths[i] / 2 - a.slidepositions[i]
          : "left" === a.horizontal_align
          ? 0 - a.slidepositions[i]
          : a.wrapwidth - a.slide_widths[i] - a.slidepositions[i];
      },
      a = function (e) {
        return e < 1 ? Math.sqrt(1 - (e -= 1) * e) : Math.sqrt(e);
      },
      r = function (e) {
        void 0 === t[e].bw && t.setSize(e);
        var i = t[e].carousel,
          a = t.getHorizontalOffset(t[e].c, "left"),
          r = t.getHorizontalOffset(t[e].c, "right");
        if (
          (void 0 === i.wrap &&
            (function (e) {
              var i = t[e].carousel;
              (i.infbackup = i.infinity),
                (i.maxVisiblebackup = i.maxVisibleItems),
                (i.slide_offset = "none"),
                (i.slide_offset = 0),
                (i.cached_slide_offset = 0),
                (i.wrap = t[e].c.find("rs-carousel-wrap")),
                0 !== i.maxRotation &&
                  (("3D" !== t[e].parallax.type &&
                    "3d" !== t[e].parallax.type) ||
                    tpGS.gsap.set(i.wrap, {
                      perspective: "1600px",
                      transformStyle: "preserve-3d",
                    })),
                void 0 !== i.border_radius &&
                  parseInt(i.border_radius, 0) > 0 &&
                  tpGS.gsap.set(t[e].c.find("rs-slide"), {
                    borderRadius: i.border_radius,
                  });
            })(e),
          (i.slide_width =
            !0 !== i.stretch
              ? t[e].gridwidth[t[e].level] * (0 === t[e].bw ? 1 : t[e].bw)
              : t[e].c.width()),
          (i.slide_height =
            !0 !== i.stretch
              ? t[e].gridheight[t[e].level] * (0 === t[e].bw ? 1 : t[e].bw)
              : t[e].c.height()),
          (i.ratio = i.slide_width / i.slide_height),
          (i.len = t[e].slides.length),
          (i.maxwidth = t[e].slideamount * i.slide_width),
          i.justify && (i.maxVisiblebackup = i.len + 2),
          i.maxVisiblebackup > i.len + 1 && (i.maxVisibleItems = i.len + 2),
          (i.wrapwidth =
            i.maxVisibleItems * i.slide_width +
            (i.maxVisibleItems - 1) * i.space),
          (i.wrapwidth =
            "auto" != t[e].sliderLayout
              ? i.wrapwidth > t[e].c.width()
                ? t[e].c.width()
                : i.wrapwidth
              : i.wrapwidth > t[e].canvas.width()
              ? t[e].canvas.width()
              : i.wrapwidth),
          !0 === i.justify)
        ) {
          (i.slide_height = t[e].gridheight[t[e].level]),
            (i.slide_widths = []),
            (i.maxwidth = 0);
          for (var o = 0; o < i.len; o++)
            if (t[e].slides.hasOwnProperty(o)) {
              var s = t.gA(t[e].slides[o], "iratio");
              (s = void 0 === s || 0 === s || null === s ? i.ratio : s),
                (i.slide_widths[o] = Math.round(i.slide_height * s)),
                !1 !== i.justifyMaxWidth &&
                  (i.slide_widths[o] = Math.min(
                    i.wrapwidth,
                    i.slide_widths[o]
                  )),
                tpGS.gsap.set(t[e].slides[o], { width: i.slide_widths[o] }),
                (i.maxwidth += i.slide_widths[o] + i.space);
            }
        }
        (i.infinity = !(i.wrapwidth >= i.maxwidth) && i.infbackup),
          (i.wrapoffset =
            "center" === i.horizontal_align
              ? (t[e].c.width() - r - a - i.wrapwidth) / 2
              : 0),
          (i.wrapoffset =
            "auto" != t[e].sliderLayout && t[e].outernav
              ? 0
              : i.wrapoffset < a
              ? a
              : i.wrapoffset);
        var n =
          "3D" == t[e].parallax.type || "3d" == t[e].parallax.type
            ? "visible"
            : "hidden";
        "right" === i.horizontal_align
          ? tpGS.gsap.set(i.wrap, {
              left: "auto",
              right: i.wrapoffset + "px",
              width: i.wrapwidth,
              overflow: n,
            })
          : tpGS.gsap.set(i.wrap, {
              right: "auto",
              left: i.wrapoffset + "px",
              width: i.wrapwidth,
              overflow: n,
            }),
          (i.inneroffset =
            "right" === i.horizontal_align ? i.wrapwidth - i.slide_width : 0),
          (i.realoffset = Math.abs(i.wrap.position().left)),
          (i.windhalf = jQuery(window).width() / 2);
      },
      o = function (e, t) {
        return null === e || jQuery.isEmptyObject(e)
          ? t
          : void 0 === e
          ? "right"
          : e;
      },
      s = function (e, t) {
        return Math.abs(e) > Math.abs(t)
          ? e > 0
            ? e - Math.abs(Math.floor(e / t) * t)
            : e + Math.abs(Math.floor(e / t) * t)
          : e;
      },
      n = function (e) {
        var i,
          a,
          r,
          o,
          n,
          l = 0,
          d = t[e].carousel;
        if ((void 0 !== d.positionanim && d.positionanim.pause(), d.justify))
          "center" === d.horizontal_align
            ? (l =
                d.windhalf -
                d.slide_widths[d.focused] / 2 -
                d.slidepositions[d.focused])
            : "left" === d.horizontal_align
            ? (l = 0 - d.slidepositions[d.focused])
            : "right" === d.horizontal_align &&
              (l =
                d.wrapwidth -
                d.slide_widths[d.focused] -
                d.slidepositions[d.focused]),
            (l =
              l > d.maxwidth / 2
                ? d.maxwidth - l
                : l < 0 - d.maxwidth / 2
                ? l + d.maxwidth
                : l);
        else {
          var c =
              t[e].pr_processing_key >= 0
                ? t[e].pr_processing_key
                : t[e].pr_active_key >= 0
                ? t[e].pr_active_key
                : 0,
            p =
              ("center" === d.horizontal_align
                ? (d.wrapwidth / 2 - d.slide_width / 2 - d.slide_offset) /
                  d.slide_width
                : (0 - d.slide_offset) / d.slide_width) % t[e].slideamount;
          l =
            (d.infinity
              ? ((i = p),
                (a = c),
                (r = t[e].slideamount),
                (n = a - r - i),
                (o = s((o = a - i), r)),
                (n = s(n, r)),
                -(Math.abs(o) > Math.abs(n) ? n : o))
              : p - c) * d.slide_width;
        }
        return (
          !1 === d.snap && d.justDragged && (l = 0), (d.justDragged = !1), l
        );
      };
  })(jQuery),
  (function (e) {
    "use strict";
    var t = ["chars", "words", "lines"],
      i = jQuery.fn.revolution,
      a = i.is_mobile();
    i.is_android();
    jQuery.extend(!0, i, {
      checkLayerDimensions: function (e) {
        var t = !1;
        for (var a in i[e.id].layers[e.skey])
          if (i[e.id].layers[e.skey].hasOwnProperty(a) && !t) {
            var r = i[e.id].layers[e.skey][a],
              o = i[e.id]._L[r.id];
            o.eow !== r.offsetWidth &&
              "true" !== i.gA(r, "vary-layer-dims") &&
              (t = !0),
              (o.lastknownwidth = o.eow),
              (o.lastknownheight = o.eoh);
          }
        return t;
      },
      initLayer: function (e) {
        var t,
          a,
          r,
          o = e.id,
          s = e.skey;
        for (var n in i[o].layers[e.skey])
          if (i[o].layers[e.skey].hasOwnProperty(n)) {
            var l = i[o].layers[e.skey][n],
              d = jQuery(l),
              c = i.gA(l, "initialised") ? i[o]._L[l.id] : d.data();
            "individual" === e.skey &&
              ((c.slideKey =
                void 0 === c.slideKey
                  ? i.gA(d.closest("rs-slide")[0], "key")
                  : c.slideKey),
              (c.slideIndex =
                void 0 === c.slideIndex
                  ? i.getSlideIndex(o, c.slideKey)
                  : c.slideIndex),
              (e.slideIndex = c.slideIndex),
              (s = c.slideKey));
            var p =
                "carousel" === i[o].sliderType
                  ? 0
                  : i[o].width / 2 - (i.iWA(o, e.slideIndex) * i[o].bw) / 2,
              g = 0;
            if (void 0 === i.gA(l, "initialised")) {
              if (
                (i.revCheckIDS(o, l),
                (i[o]._L[l.id] = c),
                (c.ford =
                  void 0 === c.ford ? "frame_0;frame_1;frame_999" : c.ford),
                (c.ford =
                  ";" == c.ford[c.ford.length - 1]
                    ? c.ford.substring(0, c.ford.length - 1)
                    : c.ford),
                (c.ford = c.ford.split(";")),
                void 0 !== c.clip)
              )
                for (t in ((c.clipPath = {
                  use: !1,
                  origin: "l",
                  type: "rectangle",
                }),
                (c.clip = c.clip.split(";")),
                c.clip))
                  c.clip.hasOwnProperty(t) &&
                    ("u" == (a = c.clip[t].split(":"))[0] &&
                      (c.clipPath.use = "true" == a[1]),
                    "o" == a[0] && (c.clipPath.origin = a[1]),
                    "t" == a[0] && (c.clipPath.type = a[1]));
              if (
                ((c.frames = _(c, o)),
                (c.c = d),
                (c.p = d.closest(".rs-parallax-wrap")),
                (c.lp = d.closest("rs-loop-wrap")),
                (c.m = d.closest("rs-mask-wrap")),
                (c.triggercache =
                  void 0 === c.triggercache ? "reset" : c.triggercache),
                (c.rsp_bd =
                  void 0 === c.rsp_bd
                    ? "column" === c.type || "row" === c.type
                      ? "off"
                      : "on"
                    : c.rsp_bd),
                (c.rsp_o = void 0 === c.rsp_o ? "on" : c.rsp_o),
                (c.basealign = void 0 === c.basealign ? "grid" : c.basealign),
                (c.group =
                  "group" !== c.type && d.closest("rs-group-wrap").length > 0
                    ? "group"
                    : "column" !== c.type && d.closest("rs-column").length > 0
                    ? "column"
                    : "row" !== c.type && d.closest("rs-row").length > 0
                    ? "row"
                    : void 0),
                (c._lig =
                  "group" === c.group
                    ? d.closest("rs-group")
                    : "column" === c.group
                    ? d.closest("rs-column")
                    : "row" === c.group
                    ? d.closest("rs-row")
                    : void 0),
                (c._ligid = void 0 !== c._lig ? c._lig[0].id : void 0),
                (c._column =
                  "RS-COLUMN" === d[0].tagName
                    ? d.closest("rs-column-wrap")
                    : "none"),
                (c._row = "RS-COLUMN" === d[0].tagName && d.closest("rs-row")),
                (c._ingroup = "group" === c.group),
                (c._incolumn = "column" === c.group),
                (c._inrow = "row" === c.group),
                (c._ingroup || c._incolumn) &&
                  c._lig[0].className.indexOf("rs-sba") >= 0 &&
                  (!1 !== c.animationonscroll || void 0 === c.frames.loop) &&
                  !0 !== c.animOnScrollForceDisable &&
                  ((c.animationonscroll = !0),
                  (d[0].className += " rs-sba"),
                  (i[o].sbas[s][l.id] = d[0])),
                (c.animOnScrollRepeats = 0),
                (c._isgroup = "RS-GROUP" === d[0].tagName),
                (c.type = c.type || "none"),
                "row" === c.type && void 0 === c.cbreak && (c.cbreak = 2),
                (c.esginside = jQuery(d.find(".esg-grid"))),
                (c._isnotext =
                  -1 !==
                  jQuery.inArray(c.type, [
                    "video",
                    "image",
                    "audio",
                    "shape",
                    "row",
                    "group",
                  ])),
                (c._mediatag = "html5" == c.audio ? "audio" : "video"),
                (c.img = d.find("img")),
                (c.deepiframe = d[0].getElementsByTagName("iframe")),
                (c.deepmedia = d[0].getElementsByTagName(c._mediatag)),
                (c.layertype =
                  "image" === c.type
                    ? "image"
                    : d[0].className.indexOf("rs-layer-video") >= 0 ||
                      d[0].className.indexOf("rs-layer-audio") >= 0 ||
                      (c.deepiframe.length > 0 &&
                        (c.deepiframe[0].src.toLowerCase().indexOf("youtube") >
                          0 ||
                          c.deepiframe[0].src.toLowerCase().indexOf("vimeo") >
                            0)) ||
                      c.deepmedia.length > 0
                    ? "video"
                    : "html"),
                c.deepiframe.length > 0 &&
                  i.sA(c.deepiframe[0], "layertype", c.layertype),
                "column" === c.type &&
                  ((c.cbg = c.p.find("rs-column-bg")),
                  (c.cbgmask = c.p.find("rs-cbg-mask-wrap"))),
                (c._slidelink = d[0].className.indexOf("slidelink") >= 0),
                (c._isstatic = d[0].className.indexOf("rs-layer-static") >= 0),
                (c.slidekey = c._isstatic ? "staticlayers" : s),
                (c._togglelisteners = d.find(".rs-toggled-content").length > 0),
                (c.bgcol =
                  void 0 === c.bgcol
                    ? d[0].style.background.indexOf("gradient") >= 0
                      ? d[0].style.background
                      : d.css("backgroundColor")
                    : c.bgcol),
                (c.bgcol =
                  0 === c.bgcol.indexOf("rgba(0, 0, 0, 0)") &&
                  c.bgcol.length > 18
                    ? c.bgcol.replace("rgba(0, 0, 0, 0)", "")
                    : c.bgcol),
                (c.zindex = d.css("z-Index")),
                c._togglelisteners &&
                  d.click(function () {
                    i.swaptoggleState([this.id]);
                  }),
                void 0 !== c.border)
              )
                for (t in ((c.border = c.border.split(";")),
                (c.bordercolor = "transparent"),
                c.border))
                  if (c.border.hasOwnProperty(t))
                    switch ((a = c.border[t].split(":"))[0]) {
                      case "boc":
                        c.bordercolor = a[1];
                        break;
                      case "bow":
                        c.borderwidth = i.revToResp(a[1], 4, 0);
                        break;
                      case "bos":
                        c.borderstyle = i.revToResp(a[1], 4, 0);
                        break;
                      case "bor":
                        c.borderradius = i.revToResp(a[1], 4, 0);
                    }
              if (
                ("svg" === c.type &&
                  ((c.svg = d.find("svg")),
                  (c.svgPath = c.svg.find("path")),
                  (c.svgI = u(c.svgi, o)),
                  (c.svgH = u(c.svgh, o))),
                void 0 !== c.btrans)
              ) {
                var h = c.btrans;
                for (t in ((c.btrans = { rX: 0, rY: 0, rZ: 0, o: 1 }),
                (h = h.split(";"))))
                  if (h.hasOwnProperty(t))
                    switch ((a = h[t].split(":"))[0]) {
                      case "rX":
                        c.btrans.rX = a[1];
                        break;
                      case "rY":
                        c.btrans.rY = a[1];
                        break;
                      case "rZ":
                        c.btrans.rZ = a[1];
                        break;
                      case "o":
                        c.btrans.o = a[1];
                    }
              }
              if (void 0 !== c.tsh)
                for (t in ((c.tshadow = {
                  c: "rgba(0,0,0,0.25)",
                  v: 0,
                  h: 0,
                  b: 0,
                }),
                (c.tsh = c.tsh.split(";")),
                c.tsh))
                  if (c.tsh.hasOwnProperty(t))
                    switch ((a = c.tsh[t].split(":"))[0]) {
                      case "c":
                        c.tshadow.c = a[1];
                        break;
                      case "h":
                        c.tshadow.h = a[1];
                        break;
                      case "v":
                        c.tshadow.v = a[1];
                        break;
                      case "b":
                        c.tshadow.b = a[1];
                    }
              if (void 0 !== c.tst)
                for (t in ((c.tstroke = { c: "rgba(0,0,0,0.25)", w: 1 }),
                (c.tst = c.tst.split(";")),
                c.tst))
                  if (c.tst.hasOwnProperty(t))
                    switch ((a = c.tst[t].split(":"))[0]) {
                      case "c":
                        c.tstroke.c = a[1];
                        break;
                      case "w":
                        c.tstroke.w = a[1];
                    }
              if (void 0 !== c.bsh)
                for (t in ((c.bshadow = {
                  e: "c",
                  c: "rgba(0,0,0,0.25)",
                  v: 0,
                  h: 0,
                  b: 0,
                  s: 0,
                }),
                (c.bsh = c.bsh.split(";")),
                c.bsh))
                  if (c.bsh.hasOwnProperty(t))
                    switch ((a = c.bsh[t].split(":"))[0]) {
                      case "c":
                        c.bshadow.c = a[1];
                        break;
                      case "h":
                        c.bshadow.h = a[1];
                        break;
                      case "v":
                        c.bshadow.v = a[1];
                        break;
                      case "b":
                        c.bshadow.b = a[1];
                        break;
                      case "s":
                        c.bshadow.s = a[1];
                        break;
                      case "e":
                        c.bshadow.e = a[1];
                    }
              if (void 0 !== c.dim)
                for (t in ((c.dim = c.dim.split(";")), c.dim))
                  if (c.dim.hasOwnProperty(t))
                    switch ((a = c.dim[t].split(":"))[0]) {
                      case "w":
                        c.width = a[1];
                        break;
                      case "h":
                        c.height = a[1];
                        break;
                      case "maxw":
                        c.maxwidth = a[1];
                        break;
                      case "maxh":
                        c.maxheight = a[1];
                        break;
                      case "minw":
                        c.minwidth = a[1];
                        break;
                      case "minh":
                        c.minheight = a[1];
                    }
              if (void 0 !== c.xy)
                for (t in ((c.xy = c.xy.split(";")), c.xy))
                  if (c.xy.hasOwnProperty(t))
                    switch ((a = c.xy[t].split(":"))[0]) {
                      case "x":
                        c.x = a[1].replace("px", "");
                        break;
                      case "y":
                        c.y = a[1].replace("px", "");
                        break;
                      case "xo":
                        c.hoffset = a[1].replace("px", "");
                        break;
                      case "yo":
                        c.voffset = a[1].replace("px", "");
                    }
              if (!c._isnotext && void 0 !== c.text)
                for (t in ((c.text = c.text.split(";")), c.text))
                  if (c.text.hasOwnProperty(t))
                    switch ((a = c.text[t].split(":"))[0]) {
                      case "w":
                        c.whitespace = a[1];
                        break;
                      case "td":
                        c.textDecoration = a[1];
                        break;
                      case "c":
                        c.clear = a[1];
                        break;
                      case "f":
                        c.float = a[1];
                        break;
                      case "s":
                        c.fontsize = a[1];
                        break;
                      case "l":
                        c.lineheight = a[1];
                        break;
                      case "ls":
                        c.letterspacing = a[1];
                        break;
                      case "fw":
                        c.fontweight = a[1];
                        break;
                      case "a":
                        c.textalign = a[1];
                    }
              if (
                ("column" === c.type &&
                  void 0 !== c.textDecoration &&
                  delete c.textDecoration,
                void 0 !== c.flcr)
              )
                for (t in ((c.flcr = c.flcr.split(";")), c.flcr))
                  if (c.flcr.hasOwnProperty(t))
                    switch ((a = c.flcr[t].split(":"))[0]) {
                      case "c":
                        c.clear = a[1];
                        break;
                      case "f":
                        c.float = a[1];
                    }
              if (void 0 !== c.padding)
                for (t in ((c.padding = c.padding.split(";")), c.padding))
                  if (c.padding.hasOwnProperty(t))
                    switch ((a = c.padding[t].split(":"))[0]) {
                      case "t":
                        c.paddingtop = a[1];
                        break;
                      case "b":
                        c.paddingbottom = a[1];
                        break;
                      case "l":
                        c.paddingleft = a[1];
                        break;
                      case "r":
                        c.paddingright = a[1];
                    }
              if (void 0 !== c.margin)
                for (t in ((c.margin = c.margin.split(";")), c.margin))
                  if (c.margin.hasOwnProperty(t))
                    switch ((a = c.margin[t].split(":"))[0]) {
                      case "t":
                        c.margintop = a[1];
                        break;
                      case "b":
                        c.marginbottom = a[1];
                        break;
                      case "l":
                        c.marginleft = a[1];
                        break;
                      case "r":
                        c.marginright = a[1];
                    }
              if (
                (void 0 !== c.spike && (c.spike = A(c.spike)),
                void 0 !== c.corners)
              )
                for (t in ((r = c.corners.split(";")), (c.corners = {}), r))
                  r.hasOwnProperty(t) &&
                    r[t].length > 0 &&
                    ((c.corners[r[t]] = jQuery(
                      "<" + r[t] + "></" + r[t] + ">"
                    )),
                    c.c.append(c.corners[r[t]]));
              (c.textalign = f(c.textalign)),
                (c.vbility = i.revToResp(c.vbility, i[o].rle, !0)),
                (c.hoffset = i.revToResp(c.hoffset, i[o].rle, 0)),
                (c.voffset = i.revToResp(c.voffset, i[o].rle, 0)),
                (c.x = i.revToResp(c.x, i[o].rle, "l")),
                (c.y = i.revToResp(c.y, i[o].rle, "t")),
                S(d, 0, o),
                i.sA(l, "initialised", !0),
                i[o].c.trigger("layerinitialised", {
                  layer: d[0].id,
                  slider: o,
                });
            }
            var m =
                "grid" === c.basealign
                  ? i[o].width
                  : "carousel" !== i[o].sliderType || c._isstatic
                  ? i[o].ulw
                  : i[o].carousel.slide_width,
              v = i[o].useFullScreenHeight
                ? i[o].height
                : "grid" === c.basealign
                ? i[o].height
                : ("carousel" !== i[o].sliderType || c._isstatic, i[o].ulh),
              y = c.x[i[o].level],
              b = c.y[i[o].level];
            if (
              ((g =
                "slide" === c.basealign
                  ? 0
                  : Math.max(
                      0,
                      "fullscreen" == i[o].sliderLayout
                        ? v / 2 -
                            (i.iHE(o) * (i[o].keepBPHeight ? 1 : i[o].bh)) / 2
                        : i[o].autoHeight ||
                          (null != i[o].minHeight && i[o].minHeight > 0)
                        ? i[o].conh / 2 - (i.iHE(o) * i[o].bh) / 2
                        : g
                    )),
              (p = "slide" === c.basealign ? 0 : Math.max(0, p)),
              "slide" !== c.basealign &&
                "carousel" === i[o].sliderType &&
                c._isstatic &&
                void 0 !== i[o].carousel &&
                void 0 !== i[o].carousel.horizontal_align &&
                (p = Math.max(
                  0,
                  "center" === i[o].carousel.horizontal_align
                    ? 0 + (i[o].ulw - i.iWA(o, "static") * i[o].bw) / 2
                    : "right" === i[o].carousel.horizontal_align
                    ? i[o].ulw - i[o].gridwidth[i[o].level] * i[o].bw
                    : p
                )),
              "updateposition" !== e.mode)
            ) {
              if (
                (0 == c.vbility[i[o].levelForced] ||
                "f" == c.vbility[i[o].levelForced] ||
                (m < i[o].hideLayerAtLimit && "on" == c.layeronlimit) ||
                m < i[o].hideAllLayerAtLimit
                  ? c.p[0].classList.add("rs-layer-hidden")
                  : c.p[0].classList.remove("rs-layer-hidden"),
                (c.poster =
                  null == c.poster && void 0 !== c.thumbimage
                    ? c.thumbimage
                    : c.poster),
                "image" === c.layertype)
              )
                if ("cover-proportional" === c.img.data("c")) {
                  i.sA(
                    c.img[0],
                    "owidth",
                    i.gA(c.img[0], "owidth", c.img[0].width)
                  ),
                    i.sA(
                      c.img[0],
                      "oheight",
                      i.gA(c.img[0], "oheight", c.img[0].height)
                    );
                  var w = i.gA(c.img[0], "owidth") / i.gA(c.img[0], "oheight"),
                    x = m / v;
                  (w > x && w <= 1) || (w < x && w > 1)
                    ? tpGS.gsap.set(c.img, {
                        width: "100%",
                        height: "auto",
                        left:
                          "c" === y || "center" === y
                            ? "50%"
                            : "left" === y || "l" === y
                            ? "0"
                            : "auto",
                        right: "r" === y || "right" === y ? "0" : "auto",
                        top:
                          "c" === b || "center" === b
                            ? "50%"
                            : "top" === b || "t" === b
                            ? "0"
                            : "auto",
                        bottom: "b" === b || "bottom" === b ? "0" : "auto",
                        x: "c" === y || "center" === y ? "-50%" : "0",
                        y: "c" === b || "center" === y ? "-50%" : "0",
                        position: "absolute",
                      })
                    : tpGS.gsap.set(c.img, {
                        height: "100%",
                        width: "auto",
                        left:
                          "c" === y || "center" === y
                            ? "50%"
                            : "left" === y || "l" === y
                            ? "0"
                            : "auto",
                        right: "r" === y || "right" === y ? "0" : "auto",
                        top:
                          "c" === b || "center" === b
                            ? "50%"
                            : "top" === b || "t" === b
                            ? "0"
                            : "auto",
                        bottom: "b" === b || "bottom" === b ? "0" : "auto",
                        x: "c" === y || "center" === y ? "-50%" : "0",
                        y: "c" === b || "center" === y ? "-50%" : "0",
                        position: "absolute",
                      });
                } else {
                  var k =
                      "auto" !== c.width[i[o].level] ||
                      (isNaN(c.width[i[o].level]) &&
                        c.width[i[o].level].indexOf("%") >= 0)
                        ? "100%"
                        : "auto",
                    L =
                      "auto" !== c.height[i[o].level] ||
                      (isNaN(c.height[i[o].level]) &&
                        c.height[i[o].level].indexOf("%") >= 0)
                        ? "100%"
                        : "auto";
                  tpGS.gsap.set(c.img, { width: k, height: L });
                }
              else if ("video" === c.layertype) {
                i.manageVideoLayer &&
                  !c.videoLayerManaged &&
                  i.manageVideoLayer(d, o),
                  "rebuild" !== e.mode &&
                    i.resetVideo &&
                    i.resetVideo(d, o, e.mode),
                  null != c.aspectratio &&
                    c.aspectratio.split(":").length > 1 &&
                    (1 == c.bgvideo || 1 == c.forcecover) &&
                    i.prepareCoveredVideo(o, d),
                  (c.media =
                    void 0 === c.media
                      ? c.deepiframe.length > 0
                        ? jQuery(c.deepiframe[0])
                        : jQuery(c.deepmedia[0])
                      : c.media),
                  (c.html5vid =
                    void 0 === c.html5vid
                      ? !(c.deepiframe.length > 0)
                      : c.html5vid);
                var I = d[0].className.indexOf("coverscreenvideo") >= 0;
                c.media.css({ display: "block" });
                var z = c.width[i[o].level],
                  C = c.height[i[o].level];
                (z =
                  "auto" === z
                    ? z
                    : !jQuery.isNumeric(z) && z.indexOf("%") > 0
                    ? c._incolumn || c._ingroup
                      ? "100%"
                      : "grid" === c.basealign
                      ? i.iWA(o, e.slideIndex) * i[o].bw
                      : m
                    : "off" !== c.rsp_bd
                    ? parseFloat(z) * i[o].bw + "px"
                    : parseFloat(z) + "px"),
                  (C =
                    "auto" === C
                      ? C
                      : !jQuery.isNumeric(C) && C.indexOf("%") > 0
                      ? "grid" === c.basealign
                        ? i.iHE(o) * i[o].bw
                        : v
                      : "off" !== c.rsp_bd
                      ? parseFloat(C) * i[o].bh + "px"
                      : parseFloat(C) + "px");
                var O = T(d, o);
                if (
                  c._incolumn &&
                  "100%" === z &&
                  "auto" === C &&
                  void 0 !== c.ytid
                ) {
                  c.vd =
                    void 0 === c.vd
                      ? i[o].videos[d[0].id].ratio.split(":").length > 1
                        ? i[o].videos[d[0].id].ratio.split(":")[0] /
                          i[o].videos[d[0].id].ratio.split(":")[1]
                        : 1
                      : c.vd;
                  var P = d.width() / c.vd;
                  tpGS.gsap.set(d, { height: P + "px" }),
                    (c.heightSetByVideo = !0);
                } else
                  -1 != d[0].className.indexOf("rs-fsv") || I
                    ? ((p = 0),
                      (g = 0),
                      (c.x = i.revToResp(0, i[o].rle, 0)),
                      (c.y = i.revToResp(0, i[o].rle, 0)),
                      d.css({
                        width: m,
                        height: i[o].autoHeight ? i[o].conh : v,
                      }))
                    : tpGS.gsap.set(d, {
                        paddingTop: Math.round(O.paddingTop * i[o].bh) + "px",
                        paddingBottom:
                          Math.round(O.paddingBottom * i[o].bh) + "px",
                        paddingLeft: Math.round(O.paddingLeft * i[o].bw) + "px",
                        paddingRight:
                          Math.round(O.paddingRight * i[o].bw) + "px",
                        marginTop: O.marginTop * i[o].bh + "px",
                        marginBottom: O.marginBottom * i[o].bh + "px",
                        marginLeft: O.marginLeft * i[o].bw + "px",
                        marginRight: O.marginRight * i[o].bw + "px",
                        borderTopWidth:
                          Math.round(O.borderTopWidth * i[o].bh) + "px",
                        borderBottomWidth:
                          Math.round(O.borderBottomWidth * i[o].bh) + "px",
                        borderLeftWidth:
                          Math.round(O.borderLeftWidth * i[o].bw) + "px",
                        borderRightWidth:
                          Math.round(O.borderRightWidth * i[o].bw) + "px",
                        width: z,
                        height: C,
                      }),
                    ((0 == c.html5vid && !I) ||
                      (1 != c.forcecover && !d.hasClass("rs-fsv") && !I)) &&
                      (c.media.width(z), c.media.height(C)),
                    c._ingroup &&
                      null != z &&
                      !jQuery.isNumeric(z) &&
                      z.indexOf("%") > 0 &&
                      tpGS.gsap.set([c.lp, c.p, c.m], { minWidth: z });
              }
              c._slidelink || R(d, o, 0, c.rsp_bd, e.slideIndex),
                "on" === c.rsp_ch &&
                  "row" !== c.type &&
                  "column" !== c.type &&
                  "group" !== c.type &&
                  d.find("*").each(function () {
                    var t = jQuery(this);
                    "true" !== i.gA(this, "stylerecorder") &&
                      !0 !== i.gA(this, "stylerecorder") &&
                      S(t, "rekursive", o),
                      R(t, o, "rekursive", c.rsp_bd, e.slideIndex);
                  });
            }
            if ("preset" !== e.mode) {
              if (
                ((c.eow = d.outerWidth(!0)),
                (c.eoh = d.outerHeight(!0)),
                (c.imgInFirefox =
                  "image" == c.type &&
                  "auto" == c.width[i[o].level] &&
                  "100%" == c.height[i[o].level] &&
                  i.isFirefox(o)),
                c.imgInFirefox)
              ) {
                let e = c.img.width();
                c.eow = 0 !== e ? e : c.eow;
              }
              if (
                (c.eow <= 0 &&
                  void 0 !== c.lastknownwidth &&
                  (c.eow = c.lastknownwidth),
                c.eoh <= 0 &&
                  void 0 !== c.lastknownheight &&
                  (c.eoh = c.lastknownheight),
                void 0 !== c.corners &&
                  ("text" === c.type ||
                    "button" === c.type ||
                    "shape" === c.type))
              ) {
                for (r in c.corners)
                  if (c.corners.hasOwnProperty(r)) {
                    c.corners[r].css("borderWidth", c.eoh + "px");
                    var G = "rs-fcrt" === r || "rs-fcr" === r;
                    c.corners[r].css(
                      "border" + (G ? "Right" : "Left"),
                      "0px solid transparent"
                    ),
                      c.corners[r].css(
                        "border" +
                          ("rs-fcrt" == r || "rs-bcr" == r ? "Bottom" : "Top") +
                          "Color",
                        c.bgcol
                      );
                  }
                c.eow = d.outerWidth(!0);
              }
              0 == c.eow &&
                0 == c.eoh &&
                ((c.eow = i[o].ulw), (c.eoh = i[o].ulh)),
                (c.basealign = i[o].justifyCarousel ? "grid" : c.basealign);
              var j =
                  "on" === c.rsp_o
                    ? parseInt(c.voffset[i[o].level], 0) * i[o].bw
                    : parseInt(c.voffset[i[o].level], 0),
                M =
                  "on" === c.rsp_o
                    ? parseInt(c.hoffset[i[o].level], 0) * i[o].bw
                    : parseInt(c.hoffset[i[o].level], 0),
                H =
                  "grid" === c.basealign ? i.iWA(o, e.slideIndex) * i[o].bw : m,
                N =
                  "grid" === c.basealign
                    ? i.iHE(o) * (i[o].keepBPHeight ? 1 : i[o].bh)
                    : v;
              (1 == i[o].gridEQModule ||
                (void 0 !== c._lig &&
                  "row" !== c.type &&
                  "column" !== c.type &&
                  "group" !== c.type)) &&
                ((H = void 0 !== c._lig ? c._lig.width() : i[o].ulw),
                (N = void 0 !== c._lig ? c._lig.height() : i[o].ulh),
                (p = 0),
                (g = 0)),
                (y =
                  "c" === y || "m" === y || "center" === y || "middle" === y
                    ? H / 2 - c.eow / 2 + M
                    : "l" === y || "left" === y
                    ? M
                    : "r" === y || "right" === y
                    ? H - c.eow - M
                    : "off" !== c.rsp_o
                    ? y * i[o].bw
                    : y),
                (b =
                  "m" === b || "c" === b || "center" === b || "middle" === b
                    ? N / 2 - c.eoh / 2 + j
                    : "t" === b || "top" == b
                    ? j
                    : "b" === b || "bottom" == b
                    ? N - c.eoh - j
                    : "off" !== c.rsp_o
                    ? b * i[o].bw
                    : b),
                (y = c._slidelink
                  ? 0
                  : i[o].rtl && "100%" !== c.width[i[o].level]
                  ? y + c.eow
                  : y),
                (c.calcx = parseInt(y, 0) + p),
                (c.calcy = parseInt(b, 0) + g),
                "row" !== c.type && "column" !== c.type
                  ? tpGS.gsap.set(c.p, {
                      zIndex: c.zindex,
                      top: c.calcy,
                      left: c.calcx,
                      overwrite: "auto",
                    })
                  : "row" !== c.type
                  ? tpGS.gsap.set(c.p, {
                      zIndex: c.zindex,
                      width: c.columnwidth,
                      top: 0,
                      left: 0,
                      overwrite: "auto",
                    })
                  : "row" === c.type &&
                    (tpGS.gsap.set(c.p, {
                      zIndex: c.zindex,
                      width: "grid" === c.basealign ? H + "px" : "100%",
                      top: 0,
                      left: p,
                      overwrite: "auto",
                    }),
                    c.cbreak <= i[o].level
                      ? d[0].classList.add("rev_break_columns")
                      : d[0].classList.remove("rev_break_columns")),
                void 0 !== c.blendmode &&
                  tpGS.gsap.set(c.p, { mixBlendMode: c.blendmode }),
                (void 0 !== c.frames.loop || c.imgInFirefox) &&
                  tpGS.gsap.set(c.lp, { width: c.eow, height: c.eoh }),
                c._ingroup &&
                  (void 0 !== c._groupw &&
                    !jQuery.isNumeric(c._groupw) &&
                    c._groupw.indexOf("%") > 0 &&
                    tpGS.gsap.set([c.lp, c.p, c.m], { minWidth: c._groupw }),
                  void 0 !== c._grouph &&
                    !jQuery.isNumeric(c._grouph) &&
                    c._grouph.indexOf("%") > 0 &&
                    tpGS.gsap.set([c.lp, c.p, c.m], { minHeight: c._grouph })),
                e.animcompleted && i.animcompleted(d, o);
            }
          }
      },
      hoverReverseDone: function (e) {
        i[e.id]._L[e.L[0].id].textDecoration &&
          tpGS.gsap.set(i[e.id]._L[e.L[0].id].c, {
            textDecoration: i[e.id]._L[e.L[0].id].textDecoration,
          });
      },
      animcompleted: function (e, t) {
        if (void 0 !== i[t].videos) {
          var a = i[t].videos[e[0].id];
          null != a &&
            null != a.type &&
            "none" != a.type &&
            (1 == a.aplay ||
            "true" == a.aplay ||
            "on" == a.aplay ||
            "1sttime" == a.aplay
              ? (("carousel" === i[t].sliderType &&
                  e.closest("rs-slide").index() != i[t].carousel.focused) ||
                  i.playVideo(e, t),
                i.toggleState(e.data("videotoggledby")),
                (a.aplay1 || "1sttime" == a.aplay) &&
                  ((a.aplay1 = !1), (a.aplay = !1)))
              : ("no1sttime" == a.aplay && (a.aplay = !0),
                i.unToggleState(e.data("videotoggledby"))));
        }
      },
      handleStaticLayers: function (e, t) {
        var a = 0,
          r = i[t].realslideamount + 1;
        if (void 0 !== i.gA(e[0], "onslides")) {
          var o = i.gA(e[0], "onslides").split(";");
          for (var s in o)
            if (o.hasOwnProperty(s)) {
              var n = o[s].split(":");
              "s" === n[0] && (a = parseInt(n[1], 0)),
                "e" === n[0] && (r = parseInt(n[1], 0));
            }
        }
        (a = Math.max(0, a)),
          (r = Math.min(
            i[t].realslideamount,
            r < 0 ? i[t].realslideamount : r
          )),
          (r =
            (1 !== a && 0 !== a) || r !== i[t].realslideamount
              ? r
              : i[t].realslideamount + 1),
          e.data("startslide", a),
          e.data("endslide", r),
          i.sA(e[0], "startslide", a),
          i.sA(e[0], "endslide", r);
      },
      animateTheLayers: function (e) {
        if (void 0 === e.slide) return !1;
        var t = e.id;
        if (void 0 === i[t].slides[e.slide] && "individual" !== e.slide)
          return !1;
        if ("carousel" === i[t].sliderType) {
          if ("start" === e.mode && "start" === i[t].lastATLmode) {
            if (
              e.slide === i[t].lastATLslide &&
              new Date().getTime() - i[t].lastATLtime < 1500
            )
              return;
            i[t].lastATLtime = new Date().getTime();
          }
          (i[t].lastATLmode = e.mode), (i[t].lastATLslide = e.slide);
        }
        var a =
            "individual" !== e.slide
              ? i.gA(i[t].slides[e.slide], "key")
              : "individual",
          r = i[t].pr_processing_key || i[t].pr_active_key || 0;
        (i[t].layers = i[t].layers || {}),
          "individual" === a
            ? (i[t].layers.individual =
                void 0 === i[t].layers.individual
                  ? "all" === i[t].carousel.showLayersAllTime
                    ? x(jQuery(i[t].c), "rs-layer", "rs-layer-static")
                    : x(jQuery(i[t].c), "rs-on-car")
                  : i[t].layers.individual)
            : ((i[t].layers[a] =
                void 0 === i[t].layers[a]
                  ? "all" === i[t].carousel.showLayersAllTime
                    ? []
                    : x(jQuery(i[t].slides[e.slide]), "rs-layer", "rs-on-car")
                  : i[t].layers[a]),
              (i[t].layers.static =
                void 0 === i[t].layers.static
                  ? x(
                      jQuery(i[t].c.find("rs-static-layers")),
                      "rs-layer",
                      "rs-on-car"
                    )
                  : i[t].layers.static),
              (i[t].sbas[a] =
                void 0 === i[t].sbas[a]
                  ? x(jQuery(i[t].slides[e.slide]), "rs-sba")
                  : i[t].sbas[a])),
          i.updateDimensions(t);
        var o =
          "rebuild" === e.mode &&
          "carousel" === i[t].sliderType &&
          "individual" === a;
        if (
          (void 0 !== a &&
            i[t].layers[a] &&
            i.initLayer({
              id: t,
              slideIndex: e.slide,
              skey: a,
              mode: e.mode,
              animcompleted: o,
            }),
          i[t].layers.static &&
            i.initLayer({
              id: t,
              skey: "static",
              slideIndex: "static",
              mode: e.mode,
              animcompleted: o,
            }),
          void 0 === i[t].dimensionReCheck[a] &&
            (setTimeout(function () {
              void 0 !== a &&
                i[t].layers[a] &&
                i.checkLayerDimensions({ id: t, skey: a }) &&
                i.initLayer({
                  id: t,
                  skey: a,
                  slideIndex: e.slide,
                  mode: "updateposition",
                }),
                i[t].layers.static &&
                  i.checkLayerDimensions({ id: t, skey: "static" }) &&
                  i.initLayer({
                    id: t,
                    skey: "static",
                    slideIndex: "static",
                    mode: "updateposition",
                  });
            }, 200),
            (i[t].dimensionReCheck[a] = !0)),
          ((void 0 !== i[t].rowzones &&
            i[t].rowzones.length > 0 &&
            r >= 0 &&
            i[t].rowzones[Math.min(r, i[t].rowzones.length)].length > 0) ||
            (void 0 !== i[t].srowzones && i[t].srowzones.length > 0) ||
            (void 0 !== i[t].smiddleZones && i[t].smiddleZones.length > 0)) &&
            (i.setSize(t),
            i.updateDimensions(t),
            i.initLayer({
              id: t,
              skey: a,
              slideIndex: e.slide,
              mode: "updateposition",
            }),
            i.initLayer({
              id: t,
              skey: "static",
              slideIndex: "static",
              mode: "updateposition",
            }),
            ("start" !== e.mode && "preset" !== e.mode) ||
              i.manageNavigation(t)),
          void 0 !== a && i[t].layers[a])
        )
          for (var s in i[t].layers[a])
            i[t].layers[a].hasOwnProperty(s) &&
              i.renderLayerAnimation({
                layer: jQuery(i[t].layers[a][s]),
                id: t,
                mode: e.mode,
              });
        if (i[t].layers.static)
          for (var s in i[t].layers.static)
            i[t].layers.static.hasOwnProperty(s) &&
              i.renderLayerAnimation({
                layer: jQuery(i[t].layers.static[s]),
                id: t,
                mode: e.mode,
              });
        null != i[t].mtl &&
          setTimeout(function () {
            null != i[t].mtl && i[t].mtl.resume();
          }, 30);
      },
      removeTheLayers: function (e, t, a) {
        var r = i.gA(e[0], "key");
        for (var o in (i[t].sloops &&
          i[t].sloops[r] &&
          i[t].sloops[r].tl &&
          i[t].sloops[r].tl.stop(),
        i[t].layers[r]))
          i[t].layers[r].hasOwnProperty(o) &&
            i.renderLayerAnimation({
              layer: jQuery(i[t].layers[r][o]),
              frame: "frame_999",
              mode: "continue",
              remove: !0,
              id: t,
              allforce: a,
            });
        for (var o in i[t].layers.static)
          i[t].layers.static.hasOwnProperty(o) &&
            i.renderLayerAnimation({
              layer: jQuery(i[t].layers.static[o]),
              frame: "frame_999",
              mode: "continue",
              remove: !0,
              id: t,
              allforce: a,
            });
      },
      renderLayerAnimation: function (e) {
        var a = e.layer,
          p = e.id,
          g = i[p].level,
          u = i[p]._L[a[0].id],
          f = void 0 !== u.timeline ? u.timeline.time() : void 0,
          v = !1,
          b = !1,
          _ = "none";
        if (
          "preset" !== e.mode ||
          !0 === u.frames.frame_1.timeline.waitoncall ||
          void 0 !== u.scrollBasedOffset ||
          !0 === u.forceRender
        ) {
          if (
            ("trigger" == e.mode && (u.triggeredFrame = e.frame), u._isstatic)
          ) {
            var w =
                "carousel" === i[p].sliderType &&
                void 0 !== i[p].carousel.oldfocused
                  ? i[p].carousel.oldfocused
                  : void 0 === i[p].pr_lastshown_key
                  ? 1
                  : parseInt(i[p].pr_lastshown_key, 0) + 1,
              x =
                "carousel" === i[p].sliderType
                  ? void 0 === i[p].pr_next_key
                    ? 0 === w
                      ? 1
                      : w
                    : parseInt(i[p].pr_next_key, 0) + 1
                  : void 0 === i[p].pr_processing_key
                  ? w
                  : parseInt(i[p].pr_processing_key, 0) + 1,
              k = w >= u.startslide && w <= u.endslide,
              S = x >= u.startslide && x <= u.endslide;
            if (
              ((_ =
                (w === u.endslide && "continue" === e.mode) ||
                (("continue" === e.mode || w === u.endslide) && "none")),
              !0 === e.allforce || !0 === _)
            );
            else {
              if ("preset" === e.mode && (u.elementHovered || !S)) return;
              if ("rebuild" === e.mode && !k && !S) return;
              if (
                "start" === e.mode &&
                S &&
                "frame_1" === u.lastRequestedMainFrame
              )
                return;
              if ("continue" === e.mode && "frame_999" === e.frame && S) return;
              if ("start" === e.mode && !S) return;
            }
          } else
            "start" === e.mode &&
              "keep" !== u.triggercache &&
              (u.triggeredFrame = void 0);
          for (var T in ("start" === e.mode &&
            void 0 !== u.layerLoop &&
            (u.layerLoop.count = 0),
          "start" === e.mode &&
            (e.frame = void 0 === u.triggeredFrame ? 0 : u.triggeredFrame),
          "continue" !== e.mode &&
            "trigger" !== e.mode &&
            void 0 !== u.timeline &&
            u.timeline.pause(0),
          ("continue" !== e.mode && "trigger" !== e.mode) ||
            void 0 === u.timeline ||
            u.timeline.pause(),
          (u.timeline = tpGS.gsap.timeline({ paused: !0 })),
          ("text" !== u.type && "button" !== u.type) ||
            (void 0 !== u.splitText &&
              (void 0 !== u.splitTextFix ||
                ("start" !== e.mode && "preset" !== e.mode))) ||
            (h({ layer: a, id: p }),
            "start" === e.mode && (u.splitTextFix = !0)),
          u.ford))
            if (u.ford.hasOwnProperty(T)) {
              var L = u.ford[T],
                R = !1;
              if ("frame_0" !== L && "frame_hover" !== L && "loop" !== L) {
                if (
                  ("frame_999" === L &&
                    !u.frames[L].timeline.waitoncall &&
                    u.frames[L].timeline.start >= i[p].duration &&
                    !0 !== e.remove &&
                    (u.frames[L].timeline.waitoncall = !0),
                  "start" === e.mode &&
                    "keep" !== u.triggercache &&
                    (u.frames[L].timeline.callstate = u.frames[L].timeline
                      .waitoncall
                      ? "waiting"
                      : ""),
                  "trigger" === e.mode &&
                    u.frames[L].timeline.waitoncall &&
                    (L === e.frame
                      ? ((u.frames[L].timeline.triggered = !0),
                        (u.frames[L].timeline.callstate = "called"))
                      : (u.frames[L].timeline.triggered = !1)),
                  "rebuild" === e.mode ||
                    u.frames[L].timeline.triggered ||
                    (u.frames[L].timeline.callstate = u.frames[L].timeline
                      .waitoncall
                      ? "waiting"
                      : ""),
                  !1 !== e.fastforward)
                ) {
                  if (
                    ("continue" === e.mode || "trigger" === e.mode) &&
                    !1 === b &&
                    L !== e.frame
                  )
                    continue;
                  if (
                    ("rebuild" === e.mode || "preset" === e.mode) &&
                    !1 === b &&
                    void 0 !== u.triggeredFrame &&
                    L !== u.triggeredFrame
                  )
                    continue;
                  (L === e.frame ||
                    ("rebuild" === e.mode && L === u.triggeredFrame)) &&
                    (b = !0);
                } else L === e.frame && (b = !0);
                if (
                  (L !== e.frame &&
                    u.frames[L].timeline.waitoncall &&
                    "called" !== u.frames[L].timeline.callstate &&
                    (v = !0),
                  L !== e.frame &&
                    b &&
                    (v =
                      !0 === v && u.frames[L].timeline.waitoncall
                        ? "skiprest"
                        : !0 !== v && v),
                  void 0 === u.hideonfirststart &&
                    "frame_1" === L &&
                    u.frames[L].timeline.waitoncall &&
                    (u.hideonfirststart = !0),
                  v &&
                    "waiting" === u.frames[L].timeline.callstate &&
                    "preset" === e.mode &&
                    1 != u.firstTimeRendered)
                )
                  (R = !0), (u.firstTimeRendered = !0);
                else if (
                  "skiprest" === v ||
                  ("called" !== u.frames[L].timeline.callstate &&
                    v &&
                    e.toframe !== L)
                )
                  continue;
                if (
                  "frame_999" !== L ||
                  !1 !== _ ||
                  ("continue" !== e.mode &&
                    "start" !== e.mode &&
                    "rebuild" !== e.mode)
                ) {
                  (u.fff =
                    "frame_1" === L &&
                    ("trigger" !== e.mode ||
                      "frame_999" === u.currentframe ||
                      "frame_0" === u.currentframe ||
                      void 0 === u.currentframe)),
                    "trigger" === e.mode &&
                      "frame_1" === e.frame &&
                      !1 === u.leftstage &&
                      (u.fff = !1),
                    R ||
                      ((u.frames[L].timeline.callstate = "called"),
                      (u.currentframe = L));
                  var A = u.frames[L],
                    I = u.fff ? u.frames.frame_0 : void 0,
                    z = tpGS.gsap.timeline(),
                    C = tpGS.gsap.timeline(),
                    O = u.c,
                    P =
                      void 0 !== A.sfx && m(A.sfx.effect, u.m, A.timeline.ease),
                    G = A.timeline.speed / 1e3,
                    j = 0,
                    M = y({
                      id: p,
                      frame: A,
                      layer: a,
                      ease: A.timeline.ease,
                      splitAmount: O.length,
                      target: L,
                      forcefilter:
                        void 0 !== u.frames.frame_hover &&
                        void 0 !== u.frames.frame_hover.filter,
                    }),
                    H = u.fff
                      ? y({
                          id: p,
                          frame: I,
                          layer: a,
                          ease: A.timeline.ease,
                          splitAmount: O.length,
                          target: "frame_0",
                        })
                      : void 0,
                    N =
                      void 0 !== A.mask
                        ? y({
                            id: p,
                            frame: { transform: { x: A.mask.x, y: A.mask.y } },
                            layer: a,
                            ease: M.ease,
                            target: "mask",
                          })
                        : void 0,
                    D =
                      void 0 !== N && u.fff
                        ? y({
                            id: p,
                            frame: { transform: { x: I.mask.x, y: I.mask.y } },
                            layer: a,
                            ease: M.ease,
                            target: "frommask",
                          })
                        : void 0,
                    Q = M.ease;
                  if (
                    ((M.force3D = !0),
                    "block" === P.type &&
                      ((P.ft[0].background = A.sfx.fxc),
                      z.add(
                        tpGS.gsap.fromTo(P.bmask_in, G / 2, P.ft[0], P.ft[1], 0)
                      ),
                      z.add(
                        tpGS.gsap.fromTo(P.bmask_in, G / 2, P.ft[1], P.t, G / 2)
                      ),
                      "frame_0" === L || "frame_1" === L
                        ? (H.opacity = 0)
                        : "frame_999" === L &&
                          z.add(
                            C.staggerFromTo(
                              O,
                              0.05,
                              { autoAlpha: 1 },
                              { autoAlpha: 0, delay: G / 2 },
                              0
                            ),
                            0.001
                          )),
                    void 0 !== A.color
                      ? (M.color = A.color)
                      : void 0 !== u.color &&
                        "npc" !== u.color[g] &&
                        (M.color = u.color[g]),
                    void 0 !== I && void 0 !== I.color
                      ? (H.color = I.color)
                      : void 0 !== I &&
                        void 0 !== u.color &&
                        "npc" !== u.color[g] &&
                        (H.color = u.color[g]),
                    void 0 !== A.bgcolor
                      ? A.bgcolor.indexOf("gradient") >= 0
                        ? (M.background = A.bgcolor)
                        : (M.backgroundColor = A.bgcolor)
                      : !0 === u.bgcolinuse &&
                        (u.bgcol.indexOf("gradient") >= 0
                          ? (M.background = u.bgcol)
                          : (M.backgroundColor = u.bgcol)),
                    void 0 !== I &&
                      (void 0 !== I.bgcolor
                        ? I.bgcolor.indexOf("gradient") >= 0
                          ? (H.background = I.bgcolor)
                          : (H.backgroundColor = I.bgcolor)
                        : !0 === u.bgcolinuse &&
                          (u.bgcol.indexOf("gradient") >= 0
                            ? (H.background = u.bgcol)
                            : (H.backgroundColor = u.bgcol))),
                    void 0 !== u.splitText && !1 !== u.splitText)
                  )
                    for (var B in t)
                      if (void 0 !== A[t[B]] && !u.quickRendering) {
                        var W = u.splitText[t[B]],
                          F = y({
                            id: p,
                            frame: A,
                            source: t[B],
                            ease: Q,
                            layer: a,
                            splitAmount: W.length,
                            target: L + "_" + t[B],
                          }),
                          Y = u.fff
                            ? y({
                                id: p,
                                frame: I,
                                ease: F.ease,
                                source: t[B],
                                layer: a,
                                splitAmount: W.length,
                                target: "frame_0_" + t[B],
                              })
                            : void 0,
                          E = u.frames[L].dosplit
                            ? void 0 === A[t[B]].delay
                              ? 0.05
                              : A[t[B]].delay / 100
                            : 0;
                        (u.color[g] === M.color && "frame_1" === L) ||
                          (F.color = M.color),
                          void 0 !== H &&
                            u.color[g] !== H.color &&
                            (Y.color = H.color),
                          void 0 !== Y &&
                            Y.color !== M.color &&
                            (F.color = M.color);
                        var V = jQuery.extend(!0, {}, F),
                          X = u.fff ? jQuery.extend(!0, {}, Y) : void 0,
                          Z = A[t[B]].dir;
                        delete V.dir,
                          (V.data = { splitted: !0 }),
                          (V.stagger =
                            "center" === Z || "edge" === Z
                              ? s({ each: E, offset: E / 2, from: Z })
                              : { each: E, from: Z }),
                          (V.duration = G),
                          void 0 !== X && delete X.dir,
                          u.fff
                            ? z.add(C.fromTo(W, X, V), 0)
                            : z.add(C.to(W, V), 0),
                          (j = Math.max(j, W.length * E));
                      }
                  (G += j),
                    u.pxundermask ||
                    (void 0 !== N &&
                      ((void 0 !== I && "hidden" === I.mask.overflow) ||
                        "hidden" === A.mask.overflow))
                      ? (z.add(
                          tpGS.gsap.to(u.m, 0.001, { overflow: "hidden" }),
                          0
                        ),
                        "column" === u.type &&
                          z.add(
                            tpGS.gsap.to(u.cbgmask, 0.001, {
                              overflow: "hidden",
                            }),
                            0
                          ),
                        u.btrans &&
                          (D &&
                            ((D.rotationX = u.btrans.rX),
                            (D.rotationY = u.btrans.rY),
                            (D.rotationZ = u.btrans.rZ),
                            (D.opacity = u.btrans.o)),
                          (N.rotationX = u.btrans.rX),
                          (N.rotationY = u.btrans.rY),
                          (N.rotationZ = u.btrans.rZ),
                          (N.opacity = u.btrans.o)),
                        u.fff
                          ? z.add(
                              tpGS.gsap.fromTo(
                                [u.m, u.cbgmask],
                                G,
                                jQuery.extend(!0, {}, D),
                                jQuery.extend(!0, {}, N)
                              ),
                              0.001
                            )
                          : z.add(
                              tpGS.gsap.to(
                                [u.m, u.cbgmask],
                                G,
                                jQuery.extend(!0, {}, N)
                              ),
                              0.001
                            ))
                      : void 0 !== u.btrans
                      ? z.add(
                          tpGS.gsap.to(u.m, 0.001, {
                            x: 0,
                            y: 0,
                            filter: "none",
                            opacity: u.btrans.o,
                            rotationX: u.btrans.rX,
                            rotationY: u.btrans.rY,
                            rotationZ: u.btrans.rZ,
                            overflow: "visible",
                          }),
                          0
                        )
                      : z.add(
                          tpGS.gsap.to(u.m, 0.001, {
                            clearProps: "transform",
                            overflow: "visible",
                          }),
                          0
                        ),
                    (M.force3D = "auto"),
                    u.fff
                      ? ((M.visibility = "visible"),
                        void 0 !== u.cbg && z.fromTo(u.cbg, G, H, M, 0),
                        i[p].BUG_safari_clipPath &&
                          (H.clipPath || M.clipPath || u.spike) &&
                          ((H.z && parseInt(H.z, 10)) || (H.z = -1e-4),
                          (M.z && parseInt(M.z, 10)) || (M.z = 0)),
                        void 0 !== u.cbg && "column" === u.type
                          ? z.fromTo(O, G, r(H), r(M), 0)
                          : z.fromTo(O, G, H, M, 0))
                      : (void 0 !== u.cbg && z.to(u.cbg, G, M, 0),
                        !i[p].BUG_safari_clipPath ||
                          (!M.clipPath && !u.spike) ||
                          (M.z && parseInt(M.z, 10)) ||
                          (M.z = 0 - 0.01 * Math.random()),
                        void 0 !== u.cbg && "column" === u.type
                          ? z.to(O, G, r(M), 0)
                          : z.to(O, G, M, 0)),
                    void 0 !== Q &&
                      "object" != typeof Q &&
                      "function" != typeof Q &&
                      Q.indexOf("SFXBounce") >= 0 &&
                      z.to(
                        O,
                        G,
                        {
                          scaleY: 0.5,
                          scaleX: 1.3,
                          ease: M.ease + "-squash",
                          transformOrigin: "bottom",
                        },
                        1e-4
                      );
                  var q =
                    ("trigger" !== e.mode &&
                      ((!0 !== v && "skiprest" !== v) ||
                        "rebuild" !== e.mode)) ||
                    e.frame === L ||
                    void 0 === A.timeline.start ||
                    !jQuery.isNumeric(A.timeline.start)
                      ? "+=0" === A.timeline.start ||
                        void 0 === A.timeline.start
                        ? "+=0.005"
                        : parseInt(A.timeline.start, 0) / 1e3
                      : "+=" + parseInt(A.timeline.startRelative, 0) / 1e3;
                  u.timeline.addLabel(L, q),
                    u.timeline.add(z, q),
                    u.timeline.addLabel(L + "_end", "+=0.01"),
                    z.eventCallback("onStart", n, [{ id: p, frame: L, L: a }]),
                    "true" == u.animationonscroll || 1 == u.animationonscroll
                      ? (z.eventCallback("onUpdate", l, [
                          { id: p, frame: L, L: a },
                        ]),
                        (z.smoothChildTiming = !0))
                      : z.eventCallback("onUpdate", l, [
                          { id: p, frame: L, L: a },
                        ]),
                    z.eventCallback("onComplete", d, [
                      { id: p, frame: L, L: a },
                    ]);
                }
              }
            }
          if (void 0 !== u.frames.loop) {
            var U = u.frames.loop.frame_0,
              J = u.frames.loop.frame_999,
              K = tpGS.gsap.timeline({}),
              $ = tpGS.gsap.timeline({
                repeat: -1,
                yoyo: u.frames.loop.timeline.yoyo_move,
              }),
              ee = tpGS.gsap.timeline({
                repeat: -1,
                yoyo: u.frames.loop.timeline.yoyo_rotate,
              }),
              te = tpGS.gsap.timeline({
                repeat: -1,
                yoyo: u.frames.loop.timeline.yoyo_scale,
              }),
              ie = tpGS.gsap.timeline({
                repeat: -1,
                yoyo: u.frames.loop.timeline.yoyo_filter,
              }),
              ae = parseInt(u.frames.loop.timeline.speed, 0) / 1e3,
              re = parseInt(u.frames.loop.timeline.start) / 1e3 || 0,
              oe = re + 0.2,
              se =
                "blur(" +
                parseInt(U.blur || 0, 0) +
                "px) grayscale(" +
                parseInt(U.grayscale || 0, 0) +
                "%) brightness(" +
                parseInt(U.brightness || 100, 0) +
                "%)",
              ne =
                "blur(" +
                (J.blur || 0) +
                "px) grayscale(" +
                (J.grayscale || 0) +
                "%) brightness(" +
                (J.brightness || 100) +
                "%)";
            if (
              ("blur(0px) grayscale(0%) brightness(100%)" === se &&
                "blur(0px) grayscale(0%) brightness(100%)" === ne &&
                ((se = "none"), (ne = "none")),
              K.add($, 0),
              K.add(ee, 0),
              K.add(te, 0),
              K.add(ie, 0),
              (J.originX = U.originX),
              (J.originY = U.originY),
              (J.originZ = U.originZ),
              u.frames.loop.timeline.curved)
            ) {
              var le = parseInt(u.frames.loop.timeline.radiusAngle, 0) || 0,
                de = [
                  {
                    x: (U.x - U.xr) * i[p].bw,
                    y: 0,
                    z: (U.z - U.zr) * i[p].bw,
                  },
                  { x: 0, y: (U.y + U.yr) * i[p].bw, z: 0 },
                  {
                    x: (J.x + J.xr) * i[p].bw,
                    y: 0,
                    z: (J.z + J.zr) * i[p].bw,
                  },
                  { x: 0, y: (J.y - J.yr) * i[p].bw, z: 0 },
                ],
                ce = {
                  type: "thru",
                  curviness: u.frames.loop.timeline.curviness,
                  path: [],
                  autoRotate: u.frames.loop.timeline.autoRotate,
                };
              for (var pe in de)
                de.hasOwnProperty(pe) &&
                  ((ce.path[pe] = de[le]), (le = ++le == de.length ? 0 : le));
              u.timeline.fromTo(
                u.lp,
                0.2,
                {
                  "-webkit-filter": se,
                  filter: se,
                  x: 0,
                  y: 0,
                  z: 0,
                  minWidth:
                    u._incolumn || u._ingroup
                      ? "100%"
                      : void 0 === u.eow
                      ? 0
                      : u.eow,
                  minHeight:
                    u._incolumn || u._ingroup
                      ? "100%"
                      : void 0 === u.eoh
                      ? 0
                      : u.eoh,
                  scaleX: 1,
                  scaleY: 1,
                  skewX: 0,
                  skewY: 0,
                  rotationX: 0,
                  rotationY: 0,
                  rotationZ: 0,
                  transformPerspective: 600,
                  transformOrigin:
                    J.originX + " " + J.originY + " " + J.originZ,
                  opacity: 1,
                },
                {
                  x: ce.path[3].x,
                  y: ce.path[3].y,
                  z: ce.path[3].z,
                  scaleX: U.scaleX,
                  skewX: U.skewX,
                  skewY: U.skewY,
                  scaleY: U.scaleY,
                  rotationX: U.rotationX,
                  rotationY: U.rotationY,
                  rotationZ: U.rotationZ,
                  "-webkit-filter": se,
                  filter: se,
                  ease: "sine.inOut",
                  opacity: U.opacity,
                },
                re
              ),
                $.to(u.lp, u.frames.loop.timeline.yoyo_move ? ae / 2 : ae, {
                  motionPath: ce,
                  ease: u.frames.loop.timeline.ease,
                });
            } else
              u.timeline.fromTo(
                u.lp,
                0.2,
                {
                  "-webkit-filter": se,
                  filter: se,
                  x: 0,
                  y: 0,
                  z: 0,
                  minWidth:
                    u._incolumn || u._ingroup
                      ? "100%"
                      : void 0 === u.eow
                      ? 0
                      : u.eow,
                  minHeight:
                    u._incolumn || u._ingroup
                      ? "100%"
                      : void 0 === u.eoh
                      ? 0
                      : u.eoh,
                  scaleX: 1,
                  scaleY: 1,
                  skewX: 0,
                  skewY: 0,
                  rotationX: 0,
                  rotationY: 0,
                  rotationZ: 0,
                  transformPerspective: 600,
                  transformOrigin:
                    J.originX + " " + J.originY + " " + J.originZ,
                  opacity: 1,
                },
                o({
                  x: U.x * i[p].bw,
                  y: U.y * i[p].bw,
                  z: U.z * i[p].bw,
                  scaleX: U.scaleX,
                  skewX: U.skewX,
                  skewY: U.skewY,
                  scaleY: U.scaleY,
                  rotationX: U.rotationX,
                  rotationY: U.rotationY,
                  rotationZ: U.rotationZ,
                  ease: "sine.out",
                  opacity: U.opacity,
                  "-webkit-filter": se,
                  filter: se,
                }),
                re
              ),
                $.to(u.lp, u.frames.loop.timeline.yoyo_move ? ae / 2 : ae, {
                  x: J.x * i[p].bw,
                  y: J.y * i[p].bw,
                  z: J.z * i[p].bw,
                  ease: u.frames.loop.timeline.ease,
                });
            ee.to(u.lp, u.frames.loop.timeline.yoyo_rotate ? ae / 2 : ae, {
              rotationX: J.rotationX,
              rotationY: J.rotationY,
              rotationZ: J.rotationZ,
              ease: u.frames.loop.timeline.ease,
            }),
              te.to(
                u.lp,
                u.frames.loop.timeline.yoyo_scale ? ae / 2 : ae,
                o({
                  scaleX: J.scaleX,
                  scaleY: J.scaleY,
                  skewX: J.skewX,
                  skewY: J.skewY,
                  ease: u.frames.loop.timeline.ease,
                })
              );
            var ge = {
              opacity: J.opacity || 1,
              ease: u.frames.loop.timeline.ease,
              "-webkit-filter": ne,
              filter: ne,
            };
            ie.to(u.lp, u.frames.loop.timeline.yoyo_filter ? ae / 2 : ae, ge),
              u.timeline.add(K, oe);
          }
          if (
            void 0 !== u.frames.frame_hover &&
            ("start" === e.mode || void 0 === u.hoverframeadded)
          ) {
            u.hoverframeadded = !0;
            var ue = u.frames.frame_hover.timeline.speed / 1e3;
            (ue = 0 === ue ? 1e-5 : ue),
              u.hoverlistener ||
                ((u.hoverlistener = !0),
                jQuery(document).on(
                  "mouseenter mousemove",
                  ("column" === u.type ? "#" + u.cbg[0].id + "," : "") +
                    "#" +
                    u.c[0].id,
                  function (e) {
                    if (
                      ("mousemove" !== e.type || !0 !== u.ignoremousemove) &&
                      u.readyForHover
                    ) {
                      if (
                        ((u.ignoremousemove = !0),
                        (u.elementHovered = !0),
                        u.hovertimeline ||
                          (u.hovertimeline = tpGS.gsap.timeline()),
                        u.hovertimeline.to(
                          [u.m, u.cbgmask],
                          ue,
                          {
                            overflow: u.frames.frame_hover.mask
                              ? "hidden"
                              : "visible",
                          },
                          0
                        ),
                        "column" === u.type &&
                          u.hovertimeline.to(
                            u.cbg,
                            ue,
                            jQuery.extend(
                              !0,
                              {},
                              c(u.frames.frame_hover, u.cbg)
                            ),
                            0
                          ),
                        u.hovertimeline.pause(),
                        ("text" !== u.type && "button" !== u.type) ||
                          void 0 === u.splitText ||
                          !1 === u.splitText ||
                          u.hovertimeline.to(
                            [
                              u.splitText.lines,
                              u.splitText.words,
                              u.splitText.chars,
                            ],
                            ue,
                            {
                              color: u.frames.frame_hover.color,
                              ease: u.frames.frame_hover.transform.ease,
                            },
                            0
                          ),
                        "column" === u.type
                          ? u.hovertimeline.to(
                              u.c,
                              ue,
                              r(
                                jQuery.extend(
                                  !0,
                                  {},
                                  c(u.frames.frame_hover, u.c)
                                )
                              ),
                              0
                            )
                          : u.hovertimeline.to(
                              u.c,
                              ue,
                              jQuery.extend(
                                !0,
                                {},
                                c(u.frames.frame_hover, u.c)
                              ),
                              0
                            ),
                        "svg" === u.type)
                      ) {
                        u.svgHTemp = jQuery.extend(!0, {}, u.svgH);
                        var t = Array.isArray(u.svgHTemp.fill)
                          ? u.svgHTemp.fill[i[p].level]
                          : u.svgHTemp.fill;
                        (u.svgHTemp.fill = t),
                          u.hovertimeline.to(u.svg, ue, u.svgHTemp, 0),
                          u.hovertimeline.to(u.svgPath, ue, { fill: t }, 0);
                      }
                      u.hovertimeline.play();
                    }
                  }
                ),
                jQuery(document).on(
                  "mouseleave",
                  ("column" === u.type ? "#" + u.cbg[0].id + "," : "") +
                    "#" +
                    u.c[0].id,
                  function () {
                    (u.elementHovered = !1),
                      u.readyForHover &&
                        void 0 !== u.hovertimeline &&
                        (u.hovertimeline.reverse(),
                        u.hovertimeline.eventCallback(
                          "onReverseComplete",
                          i.hoverReverseDone,
                          [{ id: p, L: a }]
                        ));
                  }
                ));
          }
          if (
            (R ||
              (u.lastRequestedMainFrame =
                "start" === e.mode
                  ? "frame_1"
                  : "continue" === e.mode
                  ? void 0 === e.frame
                    ? u.currentframe
                    : e.frame
                  : u.lastRequestedMainFrame),
            void 0 !== e.totime
              ? (u.tSTART = e.totime)
              : void 0 !== f && void 0 === e.frame
              ? (u.tSTART = f)
              : void 0 !== e.frame
              ? (u.tSTART = e.frame)
              : (u.tSTART = 0),
            0 === u.tSTART &&
              void 0 === u.startedAnimOnce &&
              void 0 === u.leftstage &&
              void 0 === u.startedAnimOnce &&
              !0 === u.hideonfirststart &&
              "preset" === e.mode &&
              (i[p]._L[a[0].id].p[0].classList.add("rs-forcehidden"),
              (u.hideonfirststart = !1)),
            ("frame_999" !== u.tSTART && "frame_999" !== u.triggeredFrame) ||
              (!u.leftstage && void 0 !== u.startedAnimOnce))
          ) {
            if (
              ("true" != u.animationonscroll && 1 != u.animationonscroll
                ? u.timeline.play(u.tSTART)
                : u.timeline.time(u.tSTART),
              jQuery.inArray(u.type, ["group", "row", "column"]) >= 0 &&
                void 0 !== e.frame)
            ) {
              if (void 0 === u.childrenJS)
                for (var B in ((u.childrenJS = {}), i[p]._L))
                  void 0 !== i[p]._L[B]._lig &&
                    void 0 !== i[p]._L[B]._lig[0] &&
                    i[p]._L[B]._lig[0].id === a[0].id &&
                    i[p]._L[B]._lig[0].id !== i[p]._L[B].c[0].id &&
                    (u.childrenJS[i[p]._L[B].c[0].id] = i[p]._L[B].c);
              (e.frame = "0" == e.frame ? "frame_0" : e.frame),
                (e.frame = "1" == e.frame ? "frame_1" : e.frame),
                (e.frame = "999" == e.frame ? "frame_999" : e.frame);
              var fe =
                void 0 === e.totime
                  ? void 0 !== u.frames[e.frame].timeline.startAbsolute
                    ? parseInt(u.frames[e.frame].timeline.startAbsolute, 0) /
                      1e3
                    : void 0 !== u.frames[e.frame].timeline.start
                    ? jQuery.isNumeric(u.frames[e.frame].timeline.start)
                      ? parseInt(u.frames[e.frame].timeline.start, 0) / 1e3
                      : 0
                    : 0.001
                  : e.totime;
              if (!0 === e.updateChildren)
                for (var B in u.childrenJS)
                  u.childrenJS.hasOwnProperty(B) &&
                    i.renderLayerAnimation({
                      layer: u.childrenJS[B],
                      fastforward: !1,
                      id: p,
                      mode: "continue",
                      updateChildren: !0,
                      totime: fe,
                    });
              else
                for (var B in u.childrenJS)
                  u.childrenJS.hasOwnProperty(B) &&
                    i[p]._L[B].pausedTrueParrent &&
                    (i.renderLayerAnimation({
                      layer: u.childrenJS[B],
                      fastforward: !1,
                      id: p,
                      mode: "continue",
                      updateChildren: !0,
                      totime: fe,
                    }),
                    (i[p]._L[B].pausedTrueParrent = !1));
            }
          } else;
        }
      },
    });
    var r = function (e) {
        var t = jQuery.extend(!0, {}, e);
        return (
          delete t.backgroundColor,
          delete t.background,
          delete t.backgroundImage,
          delete t.borderSize,
          delete t.borderStyle,
          t
        );
      },
      o = function (e) {
        return (
          void 0 === e.skewX && delete e.skewX,
          void 0 === e.skewY && delete e.skewY,
          e
        );
      },
      s = function (e) {
        let t = tpGS.gsap.utils.distribute(e);
        return function (i, a, r) {
          return t(i, a, r) + (i <= r.length / 2 ? 0 : e.offset || 0);
        };
      },
      n = function (e) {
        i[e.id].BUG_safari_clipPath && e.L[0].classList.remove("rs-pelock"),
          (i[e.id]._L[e.L[0].id]._ingroup ||
            i[e.id]._L[e.L[0].id]._incolumn ||
            i[e.id]._L[e.L[0].id]._inrow) &&
            void 0 !== i[e.id]._L[i[e.id]._L[e.L[0].id]._ligid] &&
            void 0 !== i[e.id]._L[i[e.id]._L[e.L[0].id]._ligid].timeline &&
            (i[e.id]._L[i[e.id]._L[e.L[0].id]._ligid].timeline.isActive() ||
              void 0 === i[e.id]._L[e.L[0].id] ||
              void 0 ===
                i[e.id]._L[e.L[0].id].frames[
                  i[e.id]._L[e.L[0].id].timeline.currentLabel()
                ] ||
              ((null == i[e.id]._L[i[e.id]._L[e.L[0].id]._ligid].timezone ||
                i[e.id]._L[i[e.id]._L[e.L[0].id]._ligid].timezone.to <=
                  parseInt(
                    i[e.id]._L[e.L[0].id].frames[
                      i[e.id]._L[e.L[0].id].timeline.currentLabel()
                    ].timeline.start,
                    0
                  )) &&
                !0 !== i[e.id]._L[e.L[0].id].animOnScrollForceDisable &&
                ((i[e.id]._L[e.L[0].id].pausedTrueParrent = !0),
                i[e.id]._L[e.L[0].id].timeline.pause())));
        var t = i[e.id]._L[e.L[0].id],
          a = t.hovertimeline;
        a &&
          a.time() > 0 &&
          (a.pause(), a.time(0), a.kill(), delete t.hovertimeline),
          i[e.id]._L[e.L[0].id].p[0].classList.remove("rs-forcehidden");
        var r = {};
        if (
          ((i[e.id]._L[e.L[0].id].ignoremousemove = !1),
          (i[e.id]._L[e.L[0].id].leftstage = !1),
          (i[e.id]._L[e.L[0].id].readyForHover = !1),
          (r.layer = e.L),
          void 0 !== i[e.id]._L[e.L[0].id].layerLoop &&
            i[e.id]._L[e.L[0].id].layerLoop.from === e.frame &&
            i[e.id]._L[e.L[0].id].layerLoop.count++,
          "frame_1" === e.frame &&
            void 0 === i[e.id]._L[e.L[0].id].safariRenderIssue &&
            (tpGS.gsap.set([i[e.id]._L[e.L[0].id].c], { opacity: 1 }),
            (i[e.id]._L[e.L[0].id].safariRenderIssue = !0)),
          "frame_999" !== e.frame &&
            ((i[e.id]._L[e.L[0].id].startedAnimOnce = !0),
            tpGS.gsap.set(
              [
                i[e.id]._L[e.L[0].id].c,
                i[e.id]._L[e.L[0].id].l,
                i[e.id]._L[e.L[0].id].m,
              ],
              { visibility: "visible" }
            ),
            tpGS.gsap.set(i[e.id]._L[e.L[0].id].p, {
              pointerEvents: i[e.id]._L[e.L[0].id].noPevents ? "none" : "auto",
              visibility: "visible",
            })),
          (r.eventtype =
            "frame_0" === e.frame || "frame_1" === e.frame
              ? "enterstage"
              : "frame_999" === e.frame
              ? "leavestage"
              : "framestarted"),
          "enterstage" === r.eventtype)
        ) {
          var o = i[e.id].pr_processing_key || i[e.id].pr_active_key || 0,
            s = 0;
          if (
            i[e.id].middleZones &&
            i[e.id].middleZones.length > 0 &&
            void 0 !== i[e.id].middleZones[o]
          )
            for (s = 0; s < i[e.id].middleZones[o].length; s++)
              i[e.id].middleZones[o][s].style.top =
                Math.round(
                  i[e.id].height / 2 -
                    i[e.id].middleZones[o][s].offsetHeight / 2
                ) + "px";
          if (i[e.id].smiddleZones && i[e.id].smiddleZones.length > 0)
            for (s = 0; s < i[e.id].smiddleZones.length; s++)
              i[e.id].smiddleZones[s].style.top =
                Math.round(
                  i[e.id].height / 2 - i[e.id].smiddleZones[s].offsetHeight / 2
                ) + "px";
          void 0 !== i[e.id]._L[e.L[0].id].esginside &&
            void 0 !== i[e.id]._L[e.L[0].id].esginside.esredraw &&
            i[e.id]._L[e.L[0].id].esginside.esredraw();
        }
        (r.layertype = i[e.id]._L[e.L[0].id].type),
          (r.frame_index = e.frame),
          (r.layersettings = i[e.id]._L[e.L[0].id]),
          i[e.id].c.trigger("revolution.layeraction", [r]),
          "enterstage" === r.eventtype &&
            i.toggleState(i[e.id]._L[e.L[0].id].layertoggledby),
          "frame_1" === e.frame && i.animcompleted(e.L, e.id);
      },
      l = function (e) {
        "frame_999" === e.frame &&
          (i[e.id]._L[e.L[0].id].leftstage &&
            i[e.id]._L[e.L[0].id].p[0].classList.remove("rs-forcehidden"),
          (i[e.id]._L[e.L[0].id].leftstage = !1),
          tpGS.gsap.set(i[e.id]._L[e.L[0].id].c, { visibility: "visible" }),
          tpGS.gsap.set(i[e.id]._L[e.L[0].id].p, {
            pointerEvents: i[e.id]._L[e.L[0].id].noPevents ? "none" : "auto",
            visibility: "visible",
          }));
      },
      d = function (e) {
        var t = !0;
        if (
          "column" === i[e.id]._L[e.L[0].id].type ||
          "row" === i[e.id]._L[e.L[0].id].type ||
          "group" === i[e.id]._L[e.L[0].id].type
        ) {
          var a = i[e.id]._L[e.L[0].id].timeline.currentLabel(),
            r = jQuery.inArray(a, i[e.id]._L[e.L[0].id].ford);
          r++,
            (r =
              i[e.id]._L[e.L[0].id].ford.length > r
                ? i[e.id]._L[e.L[0].id].ford[r]
                : a),
            void 0 !== i[e.id]._L[e.L[0].id].frames[r] &&
              void 0 !== i[e.id]._L[e.L[0].id].frames[a] &&
              (i[e.id]._L[e.L[0].id].timezone = {
                from: parseInt(
                  i[e.id]._L[e.L[0].id].frames[a].timeline.startAbsolute,
                  0
                ),
                to: parseInt(
                  i[e.id]._L[e.L[0].id].frames[r].timeline.startAbsolute,
                  0
                ),
              });
        }
        if ("frame_999" === e.frame)
          tpGS.gsap.set(i[e.id]._L[e.L[0].id].c, { visibility: "hidden" }),
            tpGS.gsap.set(i[e.id]._L[e.L[0].id].p, {
              pointerEvents: "none",
              visibility: "hidden",
            }),
            (t = !1);
        else if (i[e.id].isEdge && "shape" === i[e.id]._L[e.L[0].id].type) {
          var o = i[e.id]._L[e.L[0].id].c[0].style.opacity;
          (i[e.id]._L[e.L[0].id].c[0].style.opacity = o - 1e-4),
            tpGS.gsap.set(i[e.id]._L[e.L[0].id].c[0], {
              opacity: o - 0.001,
              delay: 0.05,
            }),
            tpGS.gsap.set(i[e.id]._L[e.L[0].id].c[0], {
              opacity: o,
              delay: 0.1,
            });
        }
        var s = {};
        (s.layer = e.L),
          (s.eventtype =
            "frame_0" === e.frame || "frame_1" === e.frame
              ? "enteredstage"
              : "frame_999" === e.frame
              ? "leftstage"
              : "frameended"),
          (i[e.id]._L[e.L[0].id].readyForHover = !0),
          (s.layertype = i[e.id]._L[e.L[0].id].type),
          (s.frame_index = e.frame),
          (s.layersettings = i[e.id]._L[e.L[0].id]),
          i[e.id].c.trigger("revolution.layeraction", [s]),
          "frame_999" === e.frame &&
            "leftstage" === s.eventtype &&
            ((i[e.id]._L[e.L[0].id].leftstage = !0),
            i[e.id]._L[e.L[0].id].p[0].classList.add("rs-forcehidden")),
          "leftstage" === s.eventtype &&
            void 0 !== i[e.id].videos &&
            void 0 !== i[e.id].videos[e.L[0].id] &&
            i.stopVideo &&
            i.stopVideo(e.L, e.id),
          "column" === i[e.id]._L[e.L[0].id].type &&
            tpGS.gsap.to(i[e.id]._L[e.L[0].id].cbg, 0.01, {
              visibility: "visible",
            }),
          "leftstage" === s.eventtype &&
            (i.unToggleState(e.layertoggledby),
            "video" === i[e.id]._L[e.L[0].id].type &&
              i.resetVideo &&
              setTimeout(function () {
                i.resetVideo(e.L, e.id);
              }, 100)),
          i[e.id].BUG_safari_clipPath &&
            !t &&
            e.L[0].classList.add("rs-pelock"),
          void 0 !== i[e.id]._L[e.L[0].id].layerLoop &&
            i[e.id]._L[e.L[0].id].layerLoop.to === e.frame &&
            (-1 == i[e.id]._L[e.L[0].id].layerLoop.repeat ||
              i[e.id]._L[e.L[0].id].layerLoop.repeat >
                i[e.id]._L[e.L[0].id].layerLoop.count) &&
            i.renderLayerAnimation({
              layer: i[e.id]._L[e.L[0].id].c,
              frame: i[e.id]._L[e.L[0].id].layerLoop.from,
              updateChildren: i[e.id]._L[e.L[0].id].layerLoop.children,
              mode: "continue",
              fastforward: !0 === i[e.id]._L[e.L[0].id].layerLoop.keep,
              id: e.id,
            });
      },
      c = function (e, t) {
        var i,
          a = jQuery.extend(!0, {}, e.transform);
        return (
          (a.originX || a.originY || a.originZ) &&
            ((a.transformOrigin =
              (void 0 === a.originX ? "50%" : a.originX) +
              " " +
              (void 0 === a.originY ? "50%" : a.originY) +
              " " +
              (void 0 === a.originZ ? "50%" : a.originZ)),
            delete a.originX,
            delete a.originY,
            delete a.originZ),
          void 0 !== e &&
            void 0 !== e.filter &&
            ((a["-webkit-filter"] =
              "blur(" +
              (e.filter.blur || 0) +
              "px) grayscale(" +
              (e.filter.grayscale || 0) +
              "%) brightness(" +
              (e.filter.brightness || 100) +
              "%)"),
            (a.filter =
              "blur(" +
              (e.filter.blur || 0) +
              "px) grayscale(" +
              (e.filter.grayscale || 0) +
              "%) brightness(" +
              (e.filter.brightness || 100) +
              "%)")),
          (a.color = void 0 === a.color ? "rgba(255,255,255,1)" : a.color),
          (a.force3D = "auto"),
          void 0 !== a.borderRadius &&
            ((i = a.borderRadius.split(" ")).length,
            (a.borderTopLeftRadius = i[0]),
            (a.borderTopRightRadius = i[1]),
            (a.borderBottomRightRadius = i[2]),
            (a.borderBottomLeftRadius = i[3]),
            delete a.borderRadius),
          void 0 !== a.borderWidth &&
            ((i = a.borderWidth.split(" ")).length,
            (a.borderTopWidth = i[0]),
            (a.borderRightWidth = i[1]),
            (a.borderBottomWidth = i[2]),
            (a.borderLeftWidth = i[3]),
            delete a.borderWidth),
          a.backgroundImage &&
            "string" == typeof a.backgroundImage &&
            -1 !== a.backgroundImage.search("gradient") &&
            180 !== g(t.css("backgroundImage")) &&
            180 === g(a.backgroundImage) &&
            (a.backgroundImage = p(a.backgroundImage, 180)),
          a
        );
      },
      p = function (e, t) {
        var i = (e = e.split("("))[0];
        return e.shift(), i + "(" + t + "deg, " + e.join("(");
      },
      g = function (e) {
        if (-1 !== e.search("deg,")) {
          var t = e.split("deg,")[0];
          if (-1 !== t.search(/\(/)) return parseInt(t.split("(")[1], 10);
        }
        return 180;
      },
      u = function (e, t) {
        e = void 0 === e ? "" : e.split(";");
        var a = {
          fill: i.revToResp("#ffffff", i[t].rle),
          stroke: "transparent",
          "stroke-width": "0px",
          "stroke-dasharray": "0",
          "stroke-dashoffset": "0",
        };
        for (var r in e)
          if (e.hasOwnProperty(r)) {
            var o = e[r].split(":");
            switch (o[0]) {
              case "c":
                a.fill = i.revToResp(o[1], i[t].rle, void 0, "||");
                break;
              case "sw":
                a["stroke-width"] = o[1];
                break;
              case "sc":
                a.stroke = o[1];
                break;
              case "so":
                a["stroke-dashoffset"] = o[1];
                break;
              case "sa":
                a["stroke-dasharray"] = o[1];
            }
          }
        return a;
      },
      f = function (e) {
        return "c" === e
          ? "center"
          : "l" === e
          ? "left"
          : "r" === e
          ? "right"
          : e;
      },
      h = function (e) {
        var t = i[e.id]._L[e.layer[0].id],
          a = !1;
        if (
          (t.splitText && !1 !== t.splitText && t.splitText.revert(),
          "text" === t.type || "button" === t.type)
        ) {
          for (var r in t.frames)
            if (
              void 0 !== t.frames[r].chars ||
              void 0 !== t.frames[r].words ||
              void 0 !== t.frames[r].lines
            ) {
              a = !0;
              break;
            }
          t.splitText =
            !!a &&
            new tpGS.SplitText(t.c, {
              type: "lines,words,chars",
              wordsClass: "rs_splitted_words",
              linesClass: "rs_splitted_lines",
              charsClass: "rs_splitted_chars",
            });
        } else t.splitText = !1;
      },
      m = function (e, t, i) {
        if (void 0 !== e && e.indexOf("block") >= 0) {
          var a = {};
          switch (
            (0 === t.find(".tp-blockmask_in").length &&
              (t.append('<div class="tp-blockmask_in"></div>'),
              t.append('<div class="tp-blockmask_out"></div>')),
            (i = void 0 === i ? "power3.inOut" : i),
            (a.ft = [
              { scaleY: 1, scaleX: 0, transformOrigin: "0% 50%" },
              { scaleY: 1, scaleX: 1, ease: i, immediateRender: !1 },
            ]),
            (a.t = {
              scaleY: 1,
              scaleX: 0,
              transformOrigin: "100% 50%",
              ease: i,
              immediateRender: !1,
            }),
            (a.bmask_in = t.find(".tp-blockmask_in")),
            (a.bmask_out = t.find(".tp-blockmask_out")),
            (a.type = "block"),
            e)
          ) {
            case "blocktoleft":
            case "blockfromright":
              (a.ft[0].transformOrigin = "100% 50%"),
                (a.t.transformOrigin = "0% 50%");
              break;
            case "blockfromtop":
            case "blocktobottom":
              (a.ft = [
                { scaleX: 1, scaleY: 0, transformOrigin: "50% 0%" },
                { scaleX: 1, scaleY: 1, ease: i, immediateRender: !1 },
              ]),
                (a.t = {
                  scaleX: 1,
                  scaleY: 0,
                  transformOrigin: "50% 100%",
                  ease: i,
                  immediateRender: !1,
                });
              break;
            case "blocktotop":
            case "blockfrombottom":
              (a.ft = [
                { scaleX: 1, scaleY: 0, transformOrigin: "50% 100%" },
                { scaleX: 1, scaleY: 1, ease: i, immediateRender: !1 },
              ]),
                (a.t = {
                  scaleX: 1,
                  scaleY: 0,
                  transformOrigin: "50% 0%",
                  ease: i,
                  immediateRender: !1,
                });
          }
          return (a.ft[1].overwrite = "auto"), (a.t.overwrite = "auto"), a;
        }
        return !1;
      },
      v = function (e, t, a, r, o) {
        return 0 === i[o].sdir || void 0 === t
          ? e
          : ("mask" === a
              ? (r = "x" === r ? "mX" : "y" === r ? "mY" : r)
              : "chars" === a
              ? (r =
                  "x" === r ? "cX" : "y" === r ? "cY" : "dir" === r ? "cD" : r)
              : "words" === a
              ? (r =
                  "x" === r ? "wX" : "y" === r ? "wY" : "dir" === r ? "wD" : r)
              : "lines" === a &&
                (r =
                  "x" === r ? "lX" : "y" === r ? "lY" : "dir" === r ? "lD" : r),
            void 0 === t[r] || !1 === t[r]
              ? e
              : void 0 !== t && !0 === t[r]
              ? "t" === e || "top" === e
                ? "b"
                : "b" === e || "bottom" === e
                ? "t"
                : "l" === e || "left" === e
                ? "r"
                : "r" === e || "right" === e
                ? "l"
                : -1 * e
              : void 0);
      },
      y = function (e) {
        var t,
          a = i[e.id]._L[e.layer[0].id],
          r =
            void 0 === e.source
              ? jQuery.extend(!0, {}, e.frame.transform)
              : jQuery.extend(!0, {}, e.frame[e.source]),
          o = { originX: "50%", originY: "50%", originZ: "0" },
          s = i[e.id].conw,
          n = i[e.id].conh;
        for (var l in r)
          if (r.hasOwnProperty(l)) {
            if (
              ((r[l] = "object" == typeof r[l] ? r[l][i[e.id].level] : r[l]),
              "inherit" === r[l] ||
                "delay" === l ||
                "direction" === l ||
                "use" === l)
            )
              delete r[l];
            else if ("originX" === l || "originY" === l || "originZ" === l)
              (o[l] = r[l]), delete r[l];
            else if (jQuery.isNumeric(r[l], 0))
              r[l] = v(r[l], e.frame.reverse, e.target, l, e.id, e.id);
            else if ("r" === r[l][0] && "a" === r[l][1] && "(" === r[l][3])
              r[l] = r[l].replace("ran", "random");
            else if (r[l].indexOf("cyc(") >= 0) {
              var d = r[l]
                .replace("cyc(", "")
                .replace(")", "")
                .replace("[", "")
                .replace("]", "")
                .split("|");
              r[l] = new (function (e) {
                return tpGS.gsap.utils.wrap(d, void 0);
              })();
            } else if (
              r[l].indexOf("%") >= 0 &&
              jQuery.isNumeric((t = parseInt(r[l], 0)))
            )
              r[l] =
                "x" === l
                  ? v(
                      ((a.eow || 0) * t) / 100,
                      e.frame.reverse,
                      e.target,
                      l,
                      e.id
                    )
                  : "y" === l
                  ? v(
                      ((a.eoh || 0) * t) / 100,
                      e.frame.reverse,
                      e.target,
                      l,
                      e.id
                    )
                  : r[l];
            else
              switch (
                ((r[l] = r[l].replace("[", "").replace("]", "")),
                (r[l] = v(r[l], e.frame.reverse, e.target, l, e.id, e.id)),
                r[l])
              ) {
                case "t":
                case "top":
                  r[l] =
                    0 - (a.eoh || 0) - ("column" === a.type ? 0 : a.calcy || 0);
                  break;
                case "b":
                case "bottom":
                  r[l] = n - ("column" === a.type ? 0 : a.calcy || 0);
                  break;
                case "l":
                case "left":
                  r[l] =
                    0 - (a.eow || 0) - ("column" === a.type ? 0 : a.calcx || 0);
                  break;
                case "r":
                case "right":
                  r[l] = s - ("column" === a.type ? 0 : a.calcx || 0);
                  break;
                case "m":
                case "c":
                case "middle":
                case "center":
                  r[l] =
                    "x" === l
                      ? v(
                          s / 2 -
                            ("column" === a.type ? 0 : a.calcx || 0) -
                            (a.eow || 0) / 2,
                          e.frame.reverse,
                          e.target,
                          l,
                          e.id
                        )
                      : "y" === l
                      ? v(
                          n / 2 -
                            ("column" === a.type ? 0 : a.calcy || 0) -
                            (a.eoh || 0) / 2,
                          e.frame.reverse,
                          e.target,
                          l,
                          e.id
                        )
                      : r[l];
              }
            "skewX" === l &&
              void 0 !== r[l] &&
              0 !== parseFloat(r[l]) &&
              ((r.scaleY = void 0 === r.scaleY ? 1 : parseFloat(r.scaleY)),
              (r.scaleY *= Math.cos(parseFloat(r[l]) * tpGS.DEG2RAD))),
              "skewY" === l &&
                (void 0 !== r[l]) & (0 !== parseFloat(r[l])) &&
                ((r.scaleX = void 0 === r.scaleX ? 1 : parseFloat(r.scaleX)),
                (r.scaleX *= Math.cos(parseFloat(r[l]) * tpGS.DEG2RAD)));
          }
        if (
          ((r.transformOrigin = o.originX + " " + o.originY + " " + o.originZ),
          !i[e.id].BUG_ie_clipPath &&
            void 0 !== r.clip &&
            void 0 !== a.clipPath &&
            a.clipPath.use)
        ) {
          var c = "rectangle" == a.clipPath.type,
            p = parseInt(r.clip, 0),
            g = 100 - parseInt(r.clipB, 0),
            u = Math.round(p / 2);
          switch (a.clipPath.origin) {
            case "invh":
              r.clipPath =
                "polygon(0% 0%, 0% 100%, " +
                p +
                "% 100%, " +
                p +
                "% 0%, 100% 0%, 100% 100%, " +
                g +
                "% 100%, " +
                g +
                "% 0%, 0% 0%)";
              break;
            case "invv":
              r.clipPath =
                "polygon(100% 0%, 0% 0%, 0% " +
                p +
                "%, 100% " +
                p +
                "%, 100% 100%, 0% 100%, 0% " +
                g +
                "%, 100% " +
                g +
                "%, 100% 0%)";
              break;
            case "cv":
              r.clipPath = c
                ? "polygon(" +
                  (50 - u) +
                  "% 0%, " +
                  (50 + u) +
                  "% 0%, " +
                  (50 + u) +
                  "% 100%, " +
                  (50 - u) +
                  "% 100%)"
                : "circle(" + p + "% at 50% 50%)";
              break;
            case "ch":
              r.clipPath = c
                ? "polygon(0% " +
                  (50 - u) +
                  "%, 0% " +
                  (50 + u) +
                  "%, 100% " +
                  (50 + u) +
                  "%, 100% " +
                  (50 - u) +
                  "%)"
                : "circle(" + p + "% at 50% 50%)";
              break;
            case "l":
              r.clipPath = c
                ? "polygon(0% 0%, " + p + "% 0%, " + p + "% 100%, 0% 100%)"
                : "circle(" + p + "% at 0% 50%)";
              break;
            case "r":
              r.clipPath = c
                ? "polygon(" +
                  (100 - p) +
                  "% 0%, 100% 0%, 100% 100%, " +
                  (100 - p) +
                  "% 100%)"
                : "circle(" + p + "% at 100% 50%)";
              break;
            case "t":
              r.clipPath = c
                ? "polygon(0% 0%, 100% 0%, 100% " + p + "%, 0% " + p + "%)"
                : "circle(" + p + "% at 50% 0%)";
              break;
            case "b":
              r.clipPath = c
                ? "polygon(0% 100%, 100% 100%, 100% " +
                  (100 - p) +
                  "%, 0% " +
                  (100 - p) +
                  "%)"
                : "circle(" + p + "% at 50% 100%)";
              break;
            case "lt":
              r.clipPath = c
                ? "polygon(0% 0%," + 2 * p + "% 0%, 0% " + 2 * p + "%)"
                : "circle(" + p + "% at 0% 0%)";
              break;
            case "lb":
              r.clipPath = c
                ? "polygon(0% " +
                  (100 - 2 * p) +
                  "%, 0% 100%," +
                  2 * p +
                  "% 100%)"
                : "circle(" + p + "% at 0% 100%)";
              break;
            case "rt":
              r.clipPath = c
                ? "polygon(" +
                  (100 - 2 * p) +
                  "% 0%, 100% 0%, 100% " +
                  2 * p +
                  "%)"
                : "circle(" + p + "% at 100% 0%)";
              break;
            case "rb":
              r.clipPath = c
                ? "polygon(" +
                  (100 - 2 * p) +
                  "% 100%, 100% 100%, 100% " +
                  (100 - 2 * p) +
                  "%)"
                : "circle(" + p + "% at 100% 100%)";
              break;
            case "clr":
              r.clipPath = c
                ? "polygon(0% 0%, 0% " +
                  p +
                  "%, " +
                  (100 - p) +
                  "% 100%, 100% 100%, 100% " +
                  (100 - p) +
                  "%, " +
                  p +
                  "% 0%)"
                : "circle(" + p + "% at 50% 50%)";
              break;
            case "crl":
              r.clipPath = c
                ? "polygon(0% " +
                  (100 - p) +
                  "%, 0% 100%, " +
                  p +
                  "% 100%, 100% " +
                  p +
                  "%, 100% 0%, " +
                  (100 - p) +
                  "% 0%)"
                : "circle(" + p + "% at 50% 50%)";
          }
          !0 !== i.isFirefox(e.id) && (r["-webkit-clip-path"] = r.clipPath),
            (r["clip-path"] = r.clipPath),
            delete r.clip;
        } else delete r.clip;
        return (
          "mask" !== e.target &&
            (void 0 === e.frame ||
              (void 0 === e.frame.filter && !e.forcefilter) ||
              ((r["-webkit-filter"] =
                "blur(" +
                (null == e.frame.filter ? 0 : e.frame.filter.blur || 0) +
                "px) grayscale(" +
                (null == e.frame.filter ? 0 : e.frame.filter.grayscale || 0) +
                "%) brightness(" +
                (null == e.frame.filter
                  ? 100
                  : e.frame.filter.brightness || 100) +
                "%)"),
              (r.filter =
                "blur(" +
                (null == e.frame.filter ? 0 : e.frame.filter.blur || 0) +
                "px) grayscale(" +
                (null == e.frame.filter ? 0 : e.frame.filter.grayscale || 0) +
                "%) brightness(" +
                (null == e.frame.filter
                  ? 100
                  : e.frame.filter.brightness || 100) +
                "%)")),
            jQuery.inArray(e.source, ["chars", "words", "lines"]) >= 0 &&
              (void 0 !== e.frame[e.source].blur || e.forcefilter) &&
              ((r["-webkit-filter"] =
                "blur(" +
                (parseInt(e.frame[e.source].blur, 0) || 0) +
                "px) grayscale(" +
                (parseInt(e.frame[e.source].grayscale, 0) || 0) +
                "%) brightness(" +
                (parseInt(e.frame[e.source].brightness, 0) || 100) +
                "%)"),
              (r.filter =
                "blur(" +
                (parseInt(e.frame[e.source].blur, 0) || 0) +
                "px) grayscale(" +
                (parseInt(e.frame[e.source].grayscale, 0) || 0) +
                "%) brightness(" +
                (parseInt(e.frame[e.source].brightness, 0) || 100) +
                "%)"))),
          (r.ease =
            void 0 !== r.ease
              ? r.ease
              : (void 0 === r.ease && void 0 !== e.ease) ||
                (void 0 !== r.ease && void 0 !== e.ease && "inherit" === r.ease)
              ? e.ease
              : e.frame.timeline.ease),
          (r.ease =
            void 0 === r.ease || "default" === r.ease
              ? "power3.inOut"
              : r.ease),
          r
        );
      },
      b = function (e, t, a, r, o) {
        var s,
          n,
          l = {},
          d = {},
          c = {};
        for (var p in ((r = void 0 === r ? "transform" : r),
        "loop" === o
          ? ((c.autoRotate = !1),
            (c.yoyo_filter = !1),
            (c.yoyo_rotate = !1),
            (c.yoyo_move = !1),
            (c.yoyo_scale = !1),
            (c.curved = !1),
            (c.curviness = 2),
            (c.ease = "none"),
            (c.speed = 1e3),
            (c.st = 0),
            (l.x = 0),
            (l.y = 0),
            (l.z = 0),
            (l.xr = 0),
            (l.yr = 0),
            (l.zr = 0),
            (l.scaleX = 1),
            (l.scaleY = 1),
            (l.originX = "50%"),
            (l.originY = "50%"),
            (l.originZ = "0"),
            (l.rotationX = "0deg"),
            (l.rotationY = "0deg"),
            (l.rotationZ = "0deg"))
          : ((c.speed = 300), a ? (c.ease = "default") : (l.ease = "default")),
        "sfx" === o && (l.fxc = "#ffffff"),
        (e = e.split(";"))))
          if (e.hasOwnProperty(p)) {
            var g = e[p].split(":");
            switch (g[0]) {
              case "u":
                l.use = "true" === g[1] || "t" === g[1] || fasle;
                break;
              case "c":
                s = g[1];
                break;
              case "fxc":
                l.fxc = g[1];
                break;
              case "bgc":
                n = g[1];
                break;
              case "auto":
                l.auto = "t" === g[1] || void 0 === g[1] || "true" === g[1];
                break;
              case "o":
                l.opacity = g[1];
                break;
              case "oX":
                l.originX = g[1];
                break;
              case "oY":
                l.originY = g[1];
                break;
              case "oZ":
                l.originZ = g[1];
                break;
              case "sX":
                l.scaleX = g[1];
                break;
              case "sY":
                l.scaleY = g[1];
                break;
              case "skX":
                l.skewX = g[1];
                break;
              case "skY":
                l.skewY = g[1];
                break;
              case "rX":
                l.rotationX = g[1];
                break;
              case "rY":
                l.rotationY = g[1];
                break;
              case "rZ":
                l.rotationZ = g[1];
                break;
              case "sc":
                l.color = g[1];
                break;
              case "se":
                l.effect = g[1];
                break;
              case "bos":
                l.borderStyle = g[1];
                break;
              case "boc":
                l.borderColor = g[1];
                break;
              case "td":
                l.textDecoration = g[1];
                break;
              case "zI":
                l.zIndex = g[1];
                break;
              case "tp":
                l.transformPerspective = g[1];
                break;
              case "cp":
                l.clip = parseInt(g[1], 0);
                break;
              case "cpb":
                l.clipB = parseInt(g[1], 0);
                break;
              case "fpr":
                l.fpr = "t" === g[1] || "true" === g[1] || !0 === g[1];
                break;
              case "aR":
                c.autoRotate = "t" == g[1];
                break;
              case "rA":
                c.radiusAngle = g[1];
                break;
              case "yyf":
                c.yoyo_filter = "t" == g[1];
                break;
              case "yym":
                c.yoyo_move = "t" == g[1];
                break;
              case "yyr":
                c.yoyo_rotate = "t" == g[1];
                break;
              case "yys":
                c.yoyo_scale = "t" == g[1];
                break;
              case "crd":
                c.curved = "t" == g[1];
                break;
              case "x":
                l.x =
                  "reverse" === o
                    ? "t" === g[1] || !0 === g[1] || "true" == g[1]
                    : "loop" === o
                    ? parseInt(g[1], 0)
                    : i.revToResp(g[1], i[t].rle);
                break;
              case "y":
                l.y =
                  "reverse" === o
                    ? "t" === g[1] || !0 === g[1] || "true" == g[1]
                    : "loop" === o
                    ? parseInt(g[1], 0)
                    : i.revToResp(g[1], i[t].rle);
                break;
              case "z":
                l.z =
                  "loop" === o
                    ? parseInt(g[1], 0)
                    : i.revToResp(g[1], i[t].rle);
                break;
              case "bow":
                l.borderWidth = i
                  .revToResp(g[1], 4, 0)
                  .toString()
                  .replace(/,/g, " ");
                break;
              case "bor":
                l.borderRadius = i
                  .revToResp(g[1], 4, 0)
                  .toString()
                  .replace(/,/g, " ");
                break;
              case "m":
                l.mask = "t" === g[1] || ("f" !== g[1] && g[1]);
                break;
              case "iC":
                l.instantClick = "t" === g[1] || ("f" !== g[1] && g[1]);
                break;
              case "xR":
                l.xr = parseInt(g[1], 0);
                break;
              case "yR":
                l.yr = parseInt(g[1], 0);
                break;
              case "zR":
                l.zr = parseInt(g[1], 0);
                break;
              case "blu":
                "loop" === o
                  ? (l.blur = parseInt(g[1], 0))
                  : (d.blur = parseInt(g[1], 0));
                break;
              case "gra":
                "loop" === o
                  ? (l.grayscale = parseInt(g[1], 0))
                  : (d.grayscale = parseInt(g[1], 0));
                break;
              case "bri":
                "loop" === o
                  ? (l.brightness = parseInt(g[1], 0))
                  : (d.brightness = parseInt(g[1], 0));
                break;
              case "sp":
                c.speed = parseInt(g[1], 0);
                break;
              case "d":
                l.delay = parseInt(g[1], 0);
                break;
              case "crns":
                c.curviness = parseInt(g[1], 0);
                break;
              case "st":
                (c.start = "w" === g[1] || "a" === g[1] ? "+=0" : g[1]),
                  (c.waitoncall = "w" === g[1] || "a" === g[1]);
                break;
              case "sA":
                c.startAbsolute = g[1];
                break;
              case "sR":
                c.startRelative = g[1];
                break;
              case "e":
                a ? (c.ease = g[1]) : (l.ease = g[1]);
                break;
              default:
                g[0].length > 0 &&
                  (l[g[0]] = "t" === g[1] || ("f" !== g[1] && g[1]));
            }
          }
        var u = { timeline: c };
        return (
          jQuery.isEmptyObject(d) ||
            ("split" === o ? (l = jQuery.extend(!0, l, d)) : (u.filter = d)),
          "split" === o &&
            (l.dir =
              void 0 === l.dir
                ? "start"
                : "backward" === l.dir
                ? "end"
                : "middletoedge" === l.dir
                ? "center"
                : "edgetomiddle" === l.dir
                ? "edge"
                : l.dir),
          jQuery.isEmptyObject(s) || (u.color = s),
          jQuery.isEmptyObject(n) || (u.bgcolor = n),
          (u[r] = l),
          u
        );
      },
      _ = function (e, t) {
        var r = {},
          o = 0;
        if (void 0 === window.rdF0) {
          var s = b(
            "x:0;y:0;z:0;rX:0;rY:0;rZ:0;o:0;skX:0;skY:0;sX:0;sY:0;oX:50%;oY:50%;oZ:0;dir:forward;d:5",
            t
          ).transform;
          (window.rdF0 = window.rdF1 = {
            transform: b(
              "x:0;y:0;z:0;rX:0;rY:0;rZ:0;o:0;skX:0;skY:0;sX:0;sY:0;oX:50%;oY:50%;oZ:0;tp:600px",
              t,
              !0
            ).transform,
            mask: b("x:0;y:0", t, !0).transform,
            chars: jQuery.extend(
              !0,
              { blur: 0, grayscale: 0, brightness: 100 },
              s
            ),
            words: jQuery.extend(
              !0,
              { blur: 0, grayscale: 0, brightness: 100 },
              s
            ),
            lines: jQuery.extend(
              !0,
              { blur: 0, grayscale: 0, brightness: 100 },
              s
            ),
          }),
            (window.rdF1.transform.opacity = window.rdF1.chars.opacity = window.rdF1.words.opacity = window.rdF1.lines.opacity = window.rdF1.transform.scaleX = window.rdF1.chars.scaleX = window.rdF1.words.scaleX = window.rdF1.lines.scaleX = window.rdF1.transform.scaleY = window.rdF1.chars.scaleY = window.rdF1.words.scaleY = window.rdF1.lines.scaleY = 1);
        }
        for (var o in (void 0 === e.frame_0 && (e.frame_0 = "x:0"),
        void 0 === e.frame_1 && (e.frame_1 = "x:0"),
        (e.dddNeeded = !1),
        e.ford))
          if (e.ford.hasOwnProperty(o)) {
            var n = e.ford[o];
            if (e[n]) {
              if (
                ((r[n] = b(e[n], t, !0)),
                void 0 !== r[n].bgcolor && (e.bgcolinuse = !0),
                i[t].BUG_ie_clipPath &&
                  void 0 !== e.clipPath &&
                  e.clipPath.use &&
                  void 0 !== r[n].transform.clip)
              ) {
                var l =
                  "rectangle" === e.clipPath.type
                    ? 100 - parseInt(r[n].transform.clip)
                    : 100 - Math.min(100, 2 * parseInt(r[n].transform.clip));
                switch (e.clipPath.origin) {
                  case "clr":
                  case "rb":
                  case "rt":
                  case "r":
                    (e[n + "_mask"] = "u:t;x:" + l + "%;y:0px;"),
                      (r[n].transform.x = i.revToResp("-" + l + "%", i[t].rle));
                    break;
                  case "crl":
                  case "lb":
                  case "lt":
                  case "cv":
                  case "l":
                    (e[n + "_mask"] = "u:t;x:-" + l + "%;y:0px;"),
                      (r[n].transform.x = i.revToResp(l + "%", i[t].rle));
                    break;
                  case "ch":
                  case "t":
                    (e[n + "_mask"] = "u:t;y:-" + l + "%;y:0px;"),
                      (r[n].transform.y = i.revToResp(l + "%", i[t].rle));
                    break;
                  case "b":
                    (e[n + "_mask"] = "u:t;y:" + l + "%;y:0px;"),
                      (r[n].transform.y = i.revToResp("-" + l + "%", i[t].rle));
                }
                delete r[n].transform.clip,
                  delete r[n].transform.clipB,
                  (e.maskinuse = !0);
              }
              e[n + "_mask"] && (r[n].mask = b(e[n + "_mask"], t).transform),
                null != r[n].mask && r[n].mask.use
                  ? ((r[n].mask.x = void 0 === r[n].mask.x ? 0 : r[n].mask.x),
                    (r[n].mask.y = void 0 === r[n].mask.y ? 0 : r[n].mask.y),
                    delete r[n].mask.use,
                    (r[n].mask.overflow = "hidden"))
                  : (r[n].mask = { ease: "default", overflow: "visible" }),
                e[n + "_chars"] &&
                  (r[n].chars = b(
                    e[n + "_chars"],
                    t,
                    void 0,
                    void 0,
                    "split"
                  ).transform),
                e[n + "_words"] &&
                  (r[n].words = b(
                    e[n + "_words"],
                    t,
                    void 0,
                    void 0,
                    "split"
                  ).transform),
                e[n + "_lines"] &&
                  (r[n].lines = b(
                    e[n + "_lines"],
                    t,
                    void 0,
                    void 0,
                    "split"
                  ).transform),
                (e[n + "_chars"] || e[n + "_words"] || e[n + "_lines"]) &&
                  (r[n].dosplit = !0),
                (r.frame_0 =
                  void 0 === r.frame_0 ? { transform: {} } : r.frame_0),
                r[n].transform.auto &&
                  ((r[n].transform = jQuery.extend(
                    !0,
                    {},
                    r.frame_0.transform
                  )),
                  (r[n].transform.opacity =
                    void 0 === r[n].transform.opacity
                      ? 0
                      : r[n].transform.opacity),
                  void 0 !== r.frame_0.filter &&
                    (r[n].filter = jQuery.extend(!0, {}, r.frame_0.filter)),
                  void 0 !== r.frame_0.mask &&
                    (r[n].mask = jQuery.extend(!0, {}, r.frame_0.mask)),
                  void 0 !== r.frame_0.chars &&
                    (r[n].chars = jQuery.extend(!0, {}, r.frame_0.chars)),
                  void 0 !== r.frame_0.words &&
                    (r[n].words = jQuery.extend(!0, {}, r.frame_0.words)),
                  void 0 !== r.frame_0.lines &&
                    (r[n].lines = jQuery.extend(!0, {}, r.frame_0.lines))),
                e[n + "_sfx"] &&
                  (r[n].sfx = b(e[n + "_sfx"], t, !1, void 0, "sfx").transform),
                e[n + "_reverse"] &&
                  (r[n].reverse = b(
                    e[n + "_reverse"],
                    t,
                    !1,
                    void 0,
                    "reverse"
                  ).transform);
            }
          }
        if (
          (r.frame_0.dosplit && (r.frame_1.dosplit = !0),
          void 0 !== r.frame_0.transform.fpr &&
            ((e.forceRender = r.frame_0.transform.fpr),
            delete r.frame_0.transform.fpr),
          (void 0 === e.frame_hover && void 0 === e.svgh) ||
            ((r.frame_hover = b(
              void 0 === e.frame_hover ? "" : e.frame_hover,
              t
            )),
            !a ||
            ("true" != r.frame_hover.transform.instantClick &&
              1 != r.frame_hover.transform.instantClick)
              ? (delete r.frame_hover.transform.instantClick,
                (r.frame_hover.transform.color = r.frame_hover.color),
                void 0 === r.frame_hover.transform.color &&
                  delete r.frame_hover.transform.color,
                void 0 !== r.frame_hover.bgcolor &&
                r.frame_hover.bgcolor.indexOf("gradient") >= 0
                  ? (r.frame_hover.transform.backgroundImage =
                      r.frame_hover.bgcolor)
                  : void 0 !== r.frame_hover.bgcolor &&
                    (r.frame_hover.transform.backgroundColor =
                      r.frame_hover.bgcolor),
                void 0 !== r.frame_hover.bgcolor && (e.bgcolinuse = !0),
                (r.frame_hover.transform.opacity =
                  void 0 === r.frame_hover.transform.opacity
                    ? 1
                    : r.frame_hover.transform.opacity),
                (r.frame_hover.mask =
                  void 0 !== r.frame_hover.transform.mask &&
                  r.frame_hover.transform.mask),
                delete r.frame_hover.transform.mask,
                void 0 !== r.frame_hover.transform &&
                  ((r.frame_hover.transform.borderWidth ||
                    r.frame_hover.transform.borderStyle) &&
                    (r.frame_hover.transform.borderColor =
                      void 0 === r.frame_hover.transform.borderColor
                        ? "transparent"
                        : r.frame_hover.transform.borderColor),
                  "none" !== r.frame_hover.transform.borderStyle &&
                    void 0 === r.frame_hover.transform.borderWidth &&
                    (r.frame_hover.transform.borderWidth = i
                      .revToResp(0, 4, 0)
                      .toString()
                      .replace(/,/g, " ")),
                  void 0 === e.bordercolor &&
                    void 0 !== r.frame_hover.transform.borderColor &&
                    (e.bordercolor = "transparent"),
                  void 0 === e.borderwidth &&
                    void 0 !== r.frame_hover.transform.borderWidth &&
                    (e.borderwidth = i.revToResp(
                      r.frame_hover.transform.borderWidth,
                      4,
                      0
                    )),
                  void 0 === e.borderstyle &&
                    void 0 !== r.frame_hover.transform.borderStyle &&
                    (e.borderstyle = i.revToResp(
                      r.frame_hover.transform.borderStyle,
                      4,
                      0
                    ))))
              : delete r.frame_hover),
          void 0 !== e.tloop)
        ) {
          e.layerLoop = {
            from: "frame_1",
            to: "frame_999",
            repeat: -1,
            keep: !0,
            children: !0,
          };
          var d = e.tloop.split(";");
          for (var o in d)
            if (d.hasOwnProperty(o)) {
              var c = d[o].split(":");
              switch (c[0]) {
                case "f":
                  e.layerLoop.from = c[1];
                  break;
                case "t":
                  e.layerLoop.to = c[1];
                  break;
                case "k":
                  e.layerLoop.keep = c[1];
                  break;
                case "r":
                  e.layerLoop.repeat = parseInt(c[1], 0);
                  break;
                case "c":
                  e.layerLoop.children = c[1];
              }
            }
          e.layerLoop.count = 0;
        }
        for (var o in ((e.loop_0 || e.loop_999) &&
          ((r.loop = b(e.loop_999, t, !0, "frame_999", "loop")),
          (r.loop.frame_0 = b(
            e.loop_0 || "",
            t,
            !1,
            void 0,
            "loop"
          ).transform)),
        (r.frame_0.transform.opacity =
          void 0 === r.frame_0.transform.opacity
            ? 0
            : r.frame_0.transform.opacity),
        (r.frame_1.transform.opacity =
          void 0 === r.frame_1.transform.opacity
            ? 1
            : r.frame_1.transform.opacity),
        (r.frame_999.transform.opacity =
          void 0 === r.frame_999.transform.opacity
            ? "inherit"
            : r.frame_999.transform.opacity),
        e.clipPath &&
          e.clipPath.use &&
          ((r.frame_0.transform.clip =
            void 0 === r.frame_0.transform.clip
              ? 100
              : parseInt(r.frame_0.transform.clip)),
          (r.frame_1.transform.clip =
            void 0 === r.frame_1.transform.clip
              ? 100
              : parseInt(r.frame_1.transform.clip))),
        (e.resetfilter = !1),
        r))
          void 0 !== r[o].filter && (e.resetfilter = !0);
        return (
          e.resetfilter &&
            ((r.frame_0.filter = jQuery.extend(!0, {}, r.frame_0.filter)),
            (r.frame_0.filter.blur =
              void 0 === r.frame_0.filter.blur ? 0 : r.frame_0.filter.blur),
            (r.frame_0.filter.brightness =
              void 0 === r.frame_0.filter.brightness
                ? 100
                : r.frame_0.filter.brightness),
            (r.frame_0.filter.grayscale =
              void 0 === r.frame_0.filter.grayscale
                ? 0
                : r.frame_0.filter.grayscale)),
          void 0 !== r.frame_0.filter &&
            ((r.frame_1.filter = jQuery.extend(!0, {}, r.frame_1.filter)),
            void 0 !== r.frame_0.filter.blur &&
              0 !== r.frame_1.filter.blur &&
              (r.frame_1.filter.blur =
                void 0 === r.frame_1.filter.blur ? 0 : r.frame_1.filter.blur),
            void 0 !== r.frame_0.filter.brightness &&
              100 !== r.frame_1.filter.brightness &&
              (r.frame_1.filter.brightness =
                void 0 === r.frame_1.filter.brightness
                  ? 100
                  : r.frame_1.filter.brightness),
            void 0 !== r.frame_0.filter.grayscale &&
              0 !== r.frame_1.filter.grayscale &&
              (r.frame_1.filter.grayscale =
                void 0 === r.frame_1.filter.grayscale
                  ? 0
                  : r.frame_1.filter.grayscale)),
          w(r)
        );
      },
      w = function (e) {
        var t,
          i = {},
          a = ["transform", "words", "chars", "lines", "mask"];
        for (var r in e)
          "loop" !== r &&
            "frame_hover" !== r &&
            (i = jQuery.extend(!0, i, e[r]));
        for (var r in e)
          if (
            e.hasOwnProperty(r) &&
            ((e[r].timeline.usePerspective = !1),
            "loop" !== r && "frame_hover" !== r)
          ) {
            for (t in i.transform)
              i.transform.hasOwnProperty(t) &&
                ((i.transform[t] =
                  void 0 === e[r].transform[t]
                    ? "frame_0" === r
                      ? window.rdF0.transform[t]
                      : "frame_1" === r
                      ? window.rdF1.transform[t]
                      : i.transform[t]
                    : e[r].transform[t]),
                (e[r].transform[t] =
                  void 0 === e[r].transform[t]
                    ? i.transform[t]
                    : e[r].transform[t]));
            for (var o = 1; o <= 4; o++)
              for (t in i[a[o]])
                i[a[o]].hasOwnProperty(t) &&
                  ((e[r][a[o]] = void 0 === e[r][a[o]] ? {} : e[r][a[o]]),
                  (i[a[o]][t] =
                    void 0 === e[r][a[o]][t]
                      ? "frame_0" === r
                        ? window.rdF0[a[o]][t]
                        : "frame_1" === r
                        ? window.rdF1[a[o]][t]
                        : i[a[o]][t]
                      : e[r][a[o]][t]),
                  (e[r][a[o]][t] =
                    void 0 === e[r][a[o]][t] ? i[a[o]][t] : e[r][a[o]][t]));
            ((!1 === e[r].timeline.usePerspective &&
              void 0 !== e[r].transform &&
              void 0 !== e[r].transform.rotationY) ||
              void 0 !== e[r].transform.rotationX ||
              void 0 !== e[r].transform.z ||
              ("600px" !== e[r].transform.transformPerspective &&
                void 0 !== e[r].transform.transformPerspective &&
                "default" !== e[r].transform.transformPerspective)) &&
              (e[r].timeline.usePerspective = !0);
          }
        return (
          e.frame_0.timeline.usePerspective &&
            (e.frame_0.transform.transformPerspective =
              void 0 === e.frame_0.transform.transformPerspective
                ? "600px"
                : e.frame_0.transform.transformPerspective),
          e
        );
      },
      x = function (e, t, i) {
        if (0 === e.length) return {};
        for (
          var a = e[0].getElementsByClassName(t), r = {}, o = 0;
          o < a.length;
          o++
        )
          (void 0 !== i && -1 !== a[o].className.indexOf(i)) ||
            (r[a[o].id] = a[o]);
        return r;
      },
      k = function (e) {
        return "thin" === (e = jQuery.isNumeric(e) ? e : e.toLowerCase())
          ? "00"
          : "extra light" === e
          ? 200
          : "light" === e
          ? 300
          : "normal" === e
          ? 400
          : "medium" === e
          ? 500
          : "semi bold" === e
          ? 600
          : "bold" === e
          ? 700
          : "extra bold" === e
          ? 800
          : "ultra bold" === e
          ? 900
          : "black" === e
          ? 900
          : e;
      },
      S = function (e, t, a) {
        if (
          "BR" == e[0].nodeName ||
          "br" == e[0].tagName ||
          ("object" != typeof e[0].className &&
            e[0].className.indexOf("rs_splitted_") >= 0)
        )
          return !1;
        i.sA(e[0], "stylerecorder", !0);
        var r = window.getComputedStyle(e[0], null),
          o =
            void 0 !== e[0].id && void 0 !== i[a]._L[e[0].id]
              ? i[a]._L[e[0].id]
              : e.data(),
          s = "rekursive" === t ? e.closest(".rs-layer") : void 0,
          n =
            void 0 !== s &&
            r.fontSize == s.css("fontSize") &&
            k(r.fontWeight) == k(s.css("fontWeight")) &&
            r.lineHeight == s.css("lineHeight"),
          l = n
            ? void 0 !== s[0].id && void 0 !== i[a]._L[s[0].id]
              ? i[a]._L[s[0].id]
              : s.data()
            : void 0,
          d = 0;
        (o.basealign = void 0 === o.basealign ? "grid" : o.basealign),
          o._isnotext ||
            ((o.fontSize = i.revToResp(
              n
                ? void 0 === l.fontsize
                  ? parseInt(s.css("fontSize"), 0) || 20
                  : l.fontsize
                : void 0 === o.fontsize
                ? "rekursive" !== t
                  ? 20
                  : "inherit"
                : o.fontsize,
              i[a].rle
            )),
            (o.fontWeight = i.revToResp(
              n
                ? void 0 === l.fontweight
                  ? s.css("fontWeight") || "inherit"
                  : l.fontweight
                : void 0 === o.fontweight
                ? e.css("fontWeight") || "inherit"
                : o.fontweight,
              i[a].rle
            )),
            (o.whiteSpace = i.revToResp(
              n
                ? void 0 === l.whitespace
                  ? "nowrap"
                  : l.whitespace
                : void 0 === o.whitespace
                ? "nowrap"
                : o.whitespace,
              i[a].rle
            )),
            (o.textAlign = i.revToResp(
              n
                ? void 0 === l.textalign
                  ? "left"
                  : l.textalign
                : void 0 === o.textalign
                ? "left"
                : o.textalign,
              i[a].rle
            )),
            (o.letterSpacing = i.revToResp(
              n
                ? void 0 === l.letterspacing
                  ? parseInt(s.css("letterSpacing"), 0) || "inherit"
                  : l.letterspacing
                : void 0 === o.letterspacing
                ? parseInt(e.css("letterSpacing"), 0) || "inherit"
                : o.letterspacing,
              i[a].rle
            )),
            (o.textDecoration = n
              ? void 0 === l.textDecoration
                ? "none"
                : l.textDecoration
              : void 0 === o.textDecoration
              ? "none"
              : o.textDecoration),
            (d = 25),
            (d = void 0 !== s && "I" === e[0].tagName ? "inherit" : d),
            void 0 !== o.tshadow &&
              ((o.tshadow.b = i.revToResp(o.tshadow.b, i[a].rle)),
              (o.tshadow.h = i.revToResp(o.tshadow.h, i[a].rle)),
              (o.tshadow.v = i.revToResp(o.tshadow.v, i[a].rle)))),
          void 0 !== o.bshadow &&
            ((o.bshadow.b = i.revToResp(o.bshadow.b, i[a].rle)),
            (o.bshadow.h = i.revToResp(o.bshadow.h, i[a].rle)),
            (o.bshadow.v = i.revToResp(o.bshadow.v, i[a].rle)),
            (o.bshadow.s = i.revToResp(o.bshadow.s, i[a].rle))),
          (o.display = n
            ? void 0 === l.display
              ? s.css("display")
              : l.display
            : void 0 === o.display
            ? e.css("display")
            : o.display),
          (o.float = i.revToResp(
            n
              ? void 0 === l.float
                ? s.css("float") || "none"
                : l.float
              : void 0 === o.float
              ? "none"
              : o.float,
            i[a].rle
          )),
          (o.clear = i.revToResp(
            n
              ? void 0 === l.clear
                ? s.css("clear") || "none"
                : l.clear
              : void 0 === o.clear
              ? "none"
              : o.clear,
            i[a].rle
          )),
          (o.lineHeight = i.revToResp(
            e.is("img") ||
              -1 != jQuery.inArray(o.layertype, ["video", "image", "audio"])
              ? d
              : n
              ? void 0 === l.lineheight
                ? parseInt(s.css("lineHeight"), 0) || d
                : l.lineheight
              : void 0 === o.lineheight
              ? d
              : o.lineheight,
            i[a].rle
          )),
          (o.zIndex = n
            ? void 0 === l.zindex
              ? parseInt(s.css("zIndex"), 0) || "inherit"
              : l.zindex
            : void 0 === o.zindex
            ? parseInt(e.css("zIndex"), 0) || "inherit"
            : o.zindex),
          (o.paddingTop = i.revToResp(
            void 0 === o.paddingtop
              ? parseInt(r.paddingTop, 0) || 0
              : o.paddingtop,
            i[a].rle
          )),
          (o.paddingBottom = i.revToResp(
            void 0 === o.paddingbottom
              ? parseInt(r.paddingBottom, 0) || 0
              : o.paddingbottom,
            i[a].rle
          )),
          (o.paddingLeft = i.revToResp(
            void 0 === o.paddingleft
              ? parseInt(r.paddingLeft, 0) || 0
              : o.paddingleft,
            i[a].rle
          )),
          (o.paddingRight = i.revToResp(
            void 0 === o.paddingright
              ? parseInt(r.paddingRight, 0) || 0
              : o.paddingright,
            i[a].rle
          )),
          (o.marginTop = i.revToResp(
            void 0 === o.margintop
              ? parseInt(r.marginTop, 0) || 0
              : o.margintop,
            i[a].rle
          )),
          (o.marginBottom = i.revToResp(
            void 0 === o.marginbottom
              ? parseInt(r.marginBottom, 0) || 0
              : o.marginbottom,
            i[a].rle
          )),
          (o.marginLeft = i.revToResp(
            void 0 === o.marginleft
              ? parseInt(r.marginLeft, 0) || 0
              : o.marginleft,
            i[a].rle
          )),
          (o.marginRight = i.revToResp(
            void 0 === o.marginright
              ? parseInt(r.marginRight, 0) || 0
              : o.marginright,
            i[a].rle
          )),
          (o.borderTopWidth =
            void 0 === o.borderwidth
              ? parseInt(r.borderTopWidth, 0) || 0
              : o.borderwidth[0]),
          (o.borderBottomWidth =
            void 0 === o.borderwidth
              ? parseInt(r.borderBottomWidth, 0) || 0
              : o.borderwidth[2]),
          (o.borderLeftWidth =
            void 0 === o.borderwidth
              ? parseInt(r.borderLeftWidth, 0) || 0
              : o.borderwidth[3]),
          (o.borderRightWidth =
            void 0 === o.borderwidth
              ? parseInt(r.borderRightWidth, 0) || 0
              : o.borderwidth[1]),
          (o.borderTopLeftRadius = i.revToResp(
            void 0 === o.borderradius
              ? r.borderTopLeftRadius || 0
              : o.borderradius[0],
            i[a].rle
          )),
          (o.borderTopRightRadius = i.revToResp(
            void 0 === o.borderradius
              ? r.borderTopRightRadius || 0
              : o.borderradius[1],
            i[a].rle
          )),
          (o.borderBottomLeftRadius = i.revToResp(
            void 0 === o.borderradius
              ? r.borderBottomLeftRadius || 0
              : o.borderradius[3],
            i[a].rle
          )),
          (o.borderBottomRightRadius = i.revToResp(
            void 0 === o.borderradius
              ? r.borderBottomRightRadius || 0
              : o.borderradius[2],
            i[a].rle
          )),
          (o.borderStyle = i.revToResp(
            void 0 === o.borderstyle ? r.borderStyle || 0 : o.borderstyle,
            i[a].rle
          )),
          (o.borderBottomColor =
            void 0 === o.bordercolor
              ? r["border-bottom-color"]
              : o.bordercolor),
          (o.borderTopColor =
            void 0 === o.bordercolor ? r["border-top-color"] : o.bordercolor),
          (o.borderLeftColor =
            void 0 === o.bordercolor ? r["border-left-color"] : o.bordercolor),
          (o.borderRightColor =
            void 0 === o.bordercolor ? r["border-right-color"] : o.bordercolor),
          "rekursive" !== t
            ? ((o.color = i.revToResp(
                void 0 === o.color ? "#ffffff" : o.color,
                i[a].rle,
                void 0,
                "||"
              )),
              (o.minWidth = i.revToResp(
                void 0 === o.minwidth
                  ? parseInt(r.minWidth, 0) || 0
                  : o.minwidth,
                i[a].rle
              )),
              (o.minHeight = i.revToResp(
                void 0 === o.minheight
                  ? parseInt(r.minHeight, 0) || 0
                  : o.minheight,
                i[a].rle
              )),
              (o.width = i.revToResp(
                void 0 === o.width ? "auto" : i.smartConvertDivs(o.width),
                i[a].rle
              )),
              (o.height = i.revToResp(
                void 0 === o.height ? "auto" : i.smartConvertDivs(o.height),
                i[a].rle
              )),
              (o.maxWidth = i.revToResp(
                void 0 === o.maxwidth
                  ? parseInt(r.maxWidth, 0) || "none"
                  : o.maxwidth,
                i[a].rle
              )),
              (o.maxHeight = i.revToResp(
                -1 !== jQuery.inArray(o.type, ["column", "row"])
                  ? "none"
                  : void 0 !== o.maxheight
                  ? parseInt(r.maxHeight, 0) || "none"
                  : o.maxheight,
                i[a].rle
              )))
            : "html" === o.layertype &&
              ((o.width = i.revToResp(e[0].width, i[a].rle)),
              (o.height = i.revToResp(e[0].height, i[a].rle))),
          (o.styleProps = {
            background: e[0].style.background,
            "background-color": e[0].style["background-color"],
            color: e[0].style.color,
            cursor: e[0].style.cursor,
            "font-style": e[0].style["font-style"],
          }),
          null == o.bshadow && (o.styleProps.boxShadow = e[0].style.boxShadow),
          ("" !== o.styleProps.background &&
            void 0 !== o.styleProps.background &&
            o.styleProps.background !== o.styleProps["background-color"]) ||
            delete o.styleProps.background,
          "" == o.styleProps.color && (o.styleProps.color = r.color);
      },
      T = function (e, t) {
        if (void 0 !== e) {
          if ("BR" == e[0].nodeName || "br" == e[0].tagName) return !1;
          var a = i[t].level,
            r =
              void 0 !== e[0] &&
              void 0 !== e[0].id &&
              void 0 !== i[t]._L[e[0].id]
                ? i[t]._L[e[0].id]
                : e.data();
          if (
            void 0 ===
            (r = void 0 === r.basealign ? e.closest("rs-layer").data() : r)
              ._isnotext
          ) {
            var o = e.closest("rs-layer")[0];
            r._isnotext =
              void 0 !== o && o.length > 0 ? i.gA(o, "_isnotext") : r._isnotext;
          }
          var s = {
            basealign: void 0 === r.basealign ? "grid" : r.basealign,
            lineHeight:
              void 0 === r.basealign ? "inherit" : parseInt(r.lineHeight[a]),
            color: void 0 === r.color ? void 0 : r.color[a],
            width:
              void 0 === r.width
                ? void 0
                : "a" === r.width[a]
                ? "auto"
                : r.width[a],
            height:
              void 0 === r.height
                ? void 0
                : "a" === r.height[a]
                ? "auto"
                : r.height[a],
            minWidth:
              void 0 === r.minWidth
                ? void 0
                : "n" === r.minWidth[a]
                ? "none"
                : r.minWidth[a],
            minHeight:
              void 0 === r.minHeight
                ? void 0
                : "n" == r.minHeight[a]
                ? "none"
                : r.minHeight[a],
            maxWidth:
              void 0 === r.maxWidth
                ? void 0
                : "n" == r.maxWidth[a]
                ? "none"
                : r.maxWidth[a],
            maxHeight:
              void 0 === r.maxHeight
                ? void 0
                : "n" == r.maxHeight[a]
                ? "none"
                : r.maxHeight[a],
            paddingTop: r.paddingTop[a],
            paddingBottom: parseInt(r.paddingBottom[a]),
            paddingLeft: parseInt(r.paddingLeft[a]),
            paddingRight: parseInt(r.paddingRight[a]),
            marginTop: parseInt(r.marginTop[a]),
            marginBottom: parseInt(r.marginBottom[a]),
            marginLeft: parseInt(r.marginLeft[a]),
            marginRight: parseInt(r.marginRight[a]),
            borderTopWidth: parseInt(r.borderTopWidth),
            borderBottomWidth: parseInt(r.borderBottomWidth),
            borderLeftWidth: parseInt(r.borderLeftWidth),
            borderRightWidth: parseInt(r.borderRightWidth),
            borderTopLeftRadius: r.borderTopLeftRadius[a],
            borderTopRightRadius: r.borderTopRightRadius[a],
            borderBottomLeftRadius: r.borderBottomLeftRadius[a],
            borderBottomRightRadius: r.borderBottomRightRadius[a],
            borderStyle: r.borderStyle[a],
            float: r.float[a],
            clear: r.clear[a],
          };
          return (
            (s.borderTopColor = r.borderTopColor),
            (s.borderBottomColor = r.borderBottomColor),
            (s.borderLeftColor = r.borderLeftColor),
            (s.borderRightColor = r.borderRightColor),
            r._isnotext ||
              ((s.textDecoration = r.textDecoration),
              (s.fontSize = parseInt(r.fontSize[a])),
              (s.fontWeight = parseInt(r.fontWeight[a])),
              (s.letterSpacing = parseInt(r.letterSpacing[a]) || 0),
              (s.textAlign = r.textAlign[a]),
              (s.whiteSpace = r.whiteSpace[a]),
              (s.whiteSpace =
                "normal" === s.whiteSpace &&
                "auto" === s.width &&
                !0 !== r._incolumn
                  ? "nowrap"
                  : s.whiteSpace),
              (s.display = r.display),
              void 0 !== r.tshadow &&
                (s.textShadow =
                  parseInt(r.tshadow.h[a], 0) +
                  "px " +
                  parseInt(r.tshadow.v[a], 0) +
                  "px " +
                  r.tshadow.b[a] +
                  " " +
                  r.tshadow.c),
              void 0 !== r.tstroke &&
                (s.textStroke =
                  parseInt(r.tstroke.w, 0) + "px " + r.tstroke.c)),
            void 0 !== r.bshadow &&
              (s.boxShadow =
                parseInt(r.bshadow.h[a], 0) +
                "px " +
                parseInt(r.bshadow.v[a], 0) +
                "px " +
                parseInt(r.bshadow.b[a], 0) +
                "px " +
                parseInt(r.bshadow.s[a], 0) +
                "px " +
                r.bshadow.c),
            s
          );
        }
      },
      L = function (e, t, i, a, r) {
        var o =
          jQuery.isNumeric(e) || void 0 === e
            ? ""
            : e.indexOf("px") >= 0
            ? "px"
            : e.indexOf("%") >= 0
            ? "%"
            : "";
        return (
          (e = jQuery.isNumeric(parseInt(e)) ? parseInt(e) : e),
          (e =
            null ==
            (e =
              "full" === (e = jQuery.isNumeric(e) ? e * t + o : e)
                ? a
                : "auto" === e || "none" === e
                ? i
                : e)
              ? r
              : e)
        );
      },
      R = function (e, t, a, r, o) {
        var s = i[t]._L[e[0].id];
        s = void 0 === s ? {} : s;
        var n = e[0].className;
        if (
          ("object" == typeof n && (n = ""),
          void 0 !== e &&
            void 0 !== e[0] &&
            (n.indexOf("rs_splitted") >= 0 ||
              "BR" == e[0].nodeName ||
              "br" == e[0].tagName ||
              e[0].tagName.indexOf("FCR") > 0 ||
              e[0].tagName.indexOf("BCR") > 0))
        )
          return !1;
        var l,
          d,
          c,
          p,
          g = T(e, t),
          u = "off" === r ? 1 : i[t].bw,
          f = "off" === r ? 1 : i[t].bh,
          h =
            "column" !== s.type
              ? {
                  t: g.marginTop,
                  b: g.marginBottom,
                  l: g.marginLeft,
                  r: g.marginRight,
                }
              : { t: 0, b: 0, l: 0, r: 0 };
        if (void 0 === s._isnotext) {
          var m = e.closest("rs-layer")[0];
          s._isnotext =
            void 0 !== m && m.length > 0 ? i.gA(m, "_isnotext") : s._isnotext;
        }
        if (
          ("column" === s.type &&
            tpGS.gsap.set(s._column, {
              paddingTop: Math.round(g.marginTop * f) + "px",
              paddingBottom: Math.round(g.marginBottom * f) + "px",
              paddingLeft: Math.round(g.marginLeft * u) + "px",
              paddingRight: Math.round(g.marginRight * u) + "px",
            }),
          -1 === n.indexOf("rs_splitted_"))
        ) {
          var v = {
            paddingTop: Math.round(g.paddingTop * f) + "px",
            paddingBottom: Math.round(g.paddingBottom * f) + "px",
            paddingLeft: Math.round(g.paddingLeft * u) + "px",
            paddingRight: Math.round(g.paddingRight * u) + "px",
            borderTopLeftRadius: g.borderTopLeftRadius,
            borderTopRightRadius: g.borderTopRightRadius,
            borderBottomLeftRadius: g.borderBottomLeftRadius,
            borderBottomRightRadius: g.borderBottomRightRadius,
            overwrite: "auto",
          };
          if (
            (s._incolumn ||
              ((v.marginTop = "row" === s.type ? 0 : h.t * f + "px"),
              (v.marginBottom = "row" === s.type ? 0 : h.b * f + "px"),
              (v.marginLeft = "row" === s.type ? 0 : h.l * u + "px"),
              (v.marginRight = "row" === s.type ? 0 : h.r * u + "px")),
            void 0 !== s.spike &&
              (v["clip-path"] = v["-webkit-clip-path"] = s.spike),
            g.boxShadow && (v.boxShadow = g.boxShadow),
            "column" !== s.type &&
              (void 0 !== g.borderStyle &&
              "none" !== g.borderStyle &&
              (0 !== g.borderTopWidth ||
                g.borderBottomWidth > 0 ||
                g.borderLeftWidth > 0 ||
                g.borderRightWidth > 0)
                ? ((v.borderTopWidth = Math.round(g.borderTopWidth * f) + "px"),
                  (v.borderBottomWidth =
                    Math.round(g.borderBottomWidth * f) + "px"),
                  (v.borderLeftWidth =
                    Math.round(g.borderLeftWidth * u) + "px"),
                  (v.borderRightWidth =
                    Math.round(g.borderRightWidth * u) + "px"),
                  (v.borderStyle = g.borderStyle),
                  (v.borderTopColor = g.borderTopColor),
                  (v.borderBottomColor = g.borderBottomColor),
                  (v.borderLeftColor = g.borderLeftColor),
                  (v.borderRightColor = g.borderRightColor))
                : ("none" === g.borderStyle && (v.borderStyle = "none"),
                  (v.borderTopColor = g.borderTopColor),
                  (v.borderBottomColor = g.borderBottomColor),
                  (v.borderLeftColor = g.borderLeftColor),
                  (v.borderRightColor = g.borderRightColor))),
            ("shape" !== s.type && "image" !== s.type) ||
              (0 === parseInt(g.borderTopLeftRadius, 0) &&
                0 === parseInt(g.borderTopRightRadius, 0) &&
                0 === parseInt(g.borderBottomLeftRadius, 0) &&
                0 === parseInt(g.borderBottomRightRadius, 0)) ||
              (v.overflow = "hidden"),
            s._isnotext ||
              ("column" !== s.type &&
                ((v.fontSize = Math.round(g.fontSize * u) + "px"),
                (v.fontWeight = g.fontWeight),
                (v.letterSpacing = g.letterSpacing * u + "px"),
                g.textShadow && (v.textShadow = g.textShadow),
                g.textStroke && (v["-webkit-text-stroke"] = g.textStroke)),
              (v.lineHeight = Math.round(g.lineHeight * f) + "px"),
              (v.textAlign = g.textAlign)),
            "column" === s.type &&
              (void 0 === s.cbg_set &&
                ((s.cbg_set = s.styleProps["background-color"]),
                (s.cbg_set =
                  "" == s.cbg_set ||
                  void 0 === s.cbg_set ||
                  0 == s.cbg_set.length
                    ? "transparent"
                    : s.cbg_set),
                (s.cbg_img = e.css("backgroundImage")),
                (s.cbg_img_r = e.css("backgroundRepeat")),
                (s.cbg_img_p = e.css("backgroundPosition")),
                (s.cbg_img_s = e.css("backgroundSize")),
                (s.cbg_o = s.bgopacity ? 1 : s.bgopacity),
                tpGS.gsap.set(e, {
                  backgroundColor: "transparent",
                  backgroundImage: "",
                })),
              (v.backgroundColor = "transparent"),
              (v.backgroundImage = "none")),
            s._isstatic &&
              s.elementHovered &&
              (l = e.data("frames")) &&
              l.frame_hover &&
              l.frame_hover.transform)
          )
            for (d in v)
              v.hasOwnProperty(d) &&
                l.frame_hover.transform.hasOwnProperty(d) &&
                delete v[d];
          if (
            ("IFRAME" == e[0].nodeName &&
              "html" === i.gA(e[0], "layertype") &&
              ((c = "slide" == g.basealign ? i[t].ulw : i.iWA(t, o)),
              (p = "slide" == g.basealign ? i[t].ulh : i.iHE(t)),
              (v.width =
                !jQuery.isNumeric(g.width) && g.width.indexOf("%") >= 0
                  ? !s._isstatic || s._incolumn || s._ingroup
                    ? g.width
                    : (c * parseInt(g.width, 0)) / 100
                  : L(g.width, u, "auto", c, "auto")),
              (v.height =
                !jQuery.isNumeric(g.height) && g.height.indexOf("%") >= 0
                  ? !s._isstatic || s._incolumn || s._ingroup
                    ? g.height
                    : (p * parseInt(g.height, 0)) / 100
                  : L(g.height, f, "auto", c, "auto"))),
            tpGS.gsap.set(e, v),
            "rekursive" != a)
          ) {
            (c = "slide" == g.basealign ? i[t].ulw : i.iWA(t, o)),
              (p = "slide" == g.basealign ? i[t].ulh : i.iHE(t));
            var y =
                !jQuery.isNumeric(g.width) && g.width.indexOf("%") >= 0
                  ? !s._isstatic || s._incolumn || s._ingroup
                    ? g.width
                    : (c * parseInt(g.width, 0)) / 100
                  : L(g.width, u, "auto", c, "auto"),
              b =
                !jQuery.isNumeric(g.height) && g.height.indexOf("%") >= 0
                  ? !s._isstatic || s._incolumn || s._ingroup
                    ? g.height
                    : (p * parseInt(g.height, 0)) / 100
                  : L(g.height, f, "auto", c, "auto"),
              _ = {
                maxWidth: L(g.maxWidth, u, "none", c, "none"),
                maxHeight: L(g.maxHeight, f, "none", p, "none"),
                minWidth: L(g.minWidth, u, "0px", c, 0),
                minHeight: L(g.minHeight, f, "0px", p, 0),
                height: b,
                width: y,
                overwrite: "auto",
              };
            if (
              (1 == s.heightSetByVideo && delete _.height,
              s._incolumn
                ? (tpGS.gsap.set([s.p], {
                    minWidth: y,
                    maxWidth: y,
                    marginTop: h.t * f + "px",
                    marginBottom: h.b * f + "px",
                    marginLeft: h.l * u + "px",
                    marginRight: h.r * u + "px",
                    float: g.float,
                    clear: g.clear,
                  }),
                  tpGS.gsap.set("block" === g.display ? [s.lp] : [s.lp, s.m], {
                    width: "100%",
                  }),
                  (_.width =
                    !jQuery.isNumeric(g.width) && g.width.indexOf("%") >= 0
                      ? "100%"
                      : y),
                  "image" === s.type &&
                    tpGS.gsap.set(s.img, { width: _.width }))
                : !jQuery.isNumeric(g.width) &&
                  g.width.indexOf("%") >= 0 &&
                  (tpGS.gsap.set([s.p], {
                    minWidth:
                      "slide" === s.basealign || !0 === s._ingroup
                        ? y
                        : i.iWA(t, o) * i[t].bw + "px",
                  }),
                  (s.lp[0].style.width = s.m[0].style.width = "100%")),
              !jQuery.isNumeric(g.height) &&
                g.height.indexOf("%") >= 0 &&
                (tpGS.gsap.set([s.p], {
                  minHeight:
                    "slide" === s.basealign || !0 === s._ingroup
                      ? b
                      : i.iHE(t) * i[t].bw + "px",
                }),
                (s.lp[0].style.height = s.m[0].style.height = "100%")),
              s._isnotext ||
                ((_.whiteSpace = g.whiteSpace),
                (_.textAlign = g.textAlign),
                (_.textDecoration = g.textDecoration)),
              "npc" != g.color && void 0 !== g.color && (_.color = g.color),
              s._ingroup &&
                ((s._groupw = _.minWidth), (s._grouph = _.minHeight)),
              "row" === s.type &&
              (jQuery.isNumeric(_.minHeight) ||
                _.minHeight.indexOf("px") >= 0) &&
              "0px" !== _.minHeight &&
              0 !== _.minHeight &&
              "0" !== _.minHeight &&
              "none" !== _.minHeight
                ? (_.height = _.minHeight)
                : "row" === s.type && (_.height = "auto"),
              s._isstatic &&
                s.elementHovered &&
                (l = e.data("frames")) &&
                l.frame_hover &&
                l.frame_hover.transform)
            )
              for (d in _)
                _.hasOwnProperty(d) &&
                  l.frame_hover.transform.hasOwnProperty(d) &&
                  delete _[d];
            "image" === s.type &&
              (!jQuery.isNumeric(_.width) &&
                _.width.indexOf("%") >= 0 &&
                (_.width = "100%"),
              !jQuery.isNumeric(_.height) &&
                _.height.indexOf("%") >= 0 &&
                (_.height = "100%")),
              s._isgroup &&
                (!jQuery.isNumeric(_.width) &&
                  _.width.indexOf("%") >= 0 &&
                  (_.width = "100%"),
                tpGS.gsap.set(s.p, { height: _.height })),
              tpGS.gsap.set(e, _),
              null != s.svg_src &&
                void 0 !== s.svgI &&
                ("string" == typeof s.svgI.fill &&
                  (s.svgI.fill = [s.svgI.fill]),
                (s.svgTemp = jQuery.extend(!0, {}, s.svgI)),
                (s.svgTemp.fill = s.svgTemp.fill[i[t].level]),
                tpGS.gsap.set(s.svg, s.svgTemp),
                tpGS.gsap.set(s.svgPath, { fill: s.svgI.fill[i[t].level] }));
          }
          "row" === s.type &&
            ((v = {
              paddingTop: h.t * f + "px",
              paddingBottom: h.b * f + "px",
              paddingLeft: h.l * u + "px",
              paddingRight: h.r * u + "px",
            }),
            tpGS.gsap.set(s.p, v)),
            "column" === s.type &&
              s.cbg &&
              s.cbg.length > 0 &&
              ((s.cbg[0].style.backgroundSize = s.cbg_img_s),
              tpGS.gsap.set(s.cbg, {
                cursor: s.styleProps.cursor,
                borderTopWidth: Math.round(g.borderTopWidth * f) + "px",
                borderBottomWidth: Math.round(g.borderBottomWidth * f) + "px",
                borderLeftWidth: Math.round(g.borderLeftWidth * u) + "px",
                borderRightWidth: Math.round(g.borderRightWidth * u) + "px",
                borderStyle: g.borderStyle,
                borderTopColor: g.borderTopColor,
                borderBottomColor: g.borderBottomColor,
                borderLeftColor: g.borderLeftColor,
                borderRightColor: g.borderRightColor,
                borderTopLeftRadius: g.borderTopLeftRadius,
                borderTopRightRadius: g.borderTopRightRadius,
                borderBottomLeftRadius: g.borderBottomLeftRadius,
                borderBottomRightRadius: g.borderBottomRightRadius,
                backgroundColor: s.cbg_set,
                backgroundImage: s.cbg_img,
                backgroundRepeat: s.cbg_img_r,
                backgroundPosition: s.cbg_img_p,
                opacity: s.cbg_o,
              }),
              tpGS.gsap.set(s.cbgmask, {
                top: g.marginTop * f + "px",
                left: g.marginLeft * u + "px",
                right: g.marginRight * u + "px",
                bottom: g.marginBottom * f + "px",
              }));
        }
      },
      A = function (e) {
        var t = { l: "none", lw: 10, r: "none", rw: 10 };
        for (var i in (e = e.split(";")))
          if (e.hasOwnProperty(i)) {
            var a = e[i].split(":");
            switch (a[0]) {
              case "l":
                t.l = a[1];
                break;
              case "r":
                t.r = a[1];
                break;
              case "lw":
                t.lw = a[1];
                break;
              case "rw":
                t.rw = a[1];
            }
          }
        return (
          "polygon(" +
          I(t.l, 0, parseFloat(t.lw)) +
          "," +
          I(t.r, 100, 100 - parseFloat(t.rw), !0) +
          ")"
        );
      },
      I = function (e, t, i, a) {
        var r;
        switch (e) {
          case "none":
            r = t + "% 100%," + t + "% 0%";
            break;
          case "top":
            r = i + "% 100%," + t + "% 0%";
            break;
          case "middle":
            r = i + "% 100%," + t + "% 50%," + i + "% 0%";
            break;
          case "bottom":
            r = t + "% 100%," + i + "% 0%";
            break;
          case "two":
            r =
              i +
              "% 100%," +
              t +
              "% 75%," +
              i +
              "% 50%," +
              t +
              "% 25%," +
              i +
              "% 0%";
            break;
          case "three":
            r =
              t +
              "% 100%," +
              i +
              "% 75%," +
              t +
              "% 50%," +
              i +
              "% 25%," +
              t +
              "% 0%";
            break;
          case "four":
            r =
              t +
              "% 100%," +
              i +
              "% 87.5%," +
              t +
              "% 75%," +
              i +
              "% 62.5%," +
              t +
              "% 50%," +
              i +
              "% 37.5%," +
              t +
              "% 25%," +
              i +
              "% 12.5%," +
              t +
              "% 0%";
            break;
          case "five":
            r =
              t +
              "% 100%," +
              i +
              "% 90%," +
              t +
              "% 80%," +
              i +
              "% 70%," +
              t +
              "% 60%," +
              i +
              "% 50%," +
              t +
              "% 40%," +
              i +
              "% 30%," +
              t +
              "% 20%," +
              i +
              "% 10%," +
              t +
              "% 0%";
        }
        if (a) {
          var o = r.split(",");
          for (var i in ((r = ""), o))
            o.hasOwnProperty(i) &&
              (r += o[o.length - 1 - i] + (i < o.length - 1 ? "," : ""));
        }
        return r;
      };
  })(jQuery),
  (function (e) {
    "use strict";
    var t = jQuery.fn.revolution,
      i = t.is_mobile();
    function a(e, i) {
      var a = new Object({
        single: ".tp-" + i,
        c: t[e].cpar.find(".tp-" + i + "s"),
      });
      return (
        (a.mask = a.c.find(".tp-" + i + "-mask")),
        (a.wrap = a.c.find(".tp-" + i + "s-inner-wrapper")),
        a
      );
    }
    jQuery.extend(!0, t, {
      hideUnHideNav: function (e) {
        var i = t[e].c.width(),
          a = t[e].navigation.arrows,
          r = t[e].navigation.bullets,
          o = t[e].navigation.thumbnails,
          s = t[e].navigation.tabs;
        p(a) && S(t[e].c.find(".tparrows"), a.hide_under, i, a.hide_over),
          p(r) && S(t[e].c.find(".tp-bullets"), r.hide_under, i, r.hide_over),
          p(o) && S(o.c, o.hide_under, i, o.hide_over),
          p(s) && S(s.c, s.hide_under, i, s.hide_over),
          k(e);
      },
      resizeThumbsTabs: function (e, i) {
        if (
          void 0 !== t[e] &&
          t[e].navigation.use &&
          ((t[e].navigation && t[e].navigation.bullets.enable) ||
            (t[e].navigation && t[e].navigation.tabs.enable) ||
            (t[e].navigation && t[e].navigation.thumbnails.enable))
        ) {
          var a = (jQuery(window).width() - 480) / 500,
            r = tpGS.gsap.timeline(),
            s = t[e].navigation.tabs,
            n = t[e].navigation.thumbnails,
            l = t[e].navigation.bullets;
          if (
            (r.pause(),
            (a = a > 1 ? 1 : a < 0 ? 0 : a),
            p(s) &&
              (i || s.width > s.min_width) &&
              o(a, r, t[e].c, s, t[e].slideamount, "tab"),
            p(n) &&
              (i || n.width > n.min_width) &&
              o(a, r, t[e].c, n, t[e].slideamount, "thumb"),
            p(l) && i)
          ) {
            var d = t[e].c.find(".tp-bullets");
            d.find(".tp-bullet").each(function (e) {
              var t = jQuery(this),
                i = e + 1,
                a =
                  t.outerWidth() +
                  parseInt(void 0 === l.space ? 0 : l.space, 0),
                r =
                  t.outerHeight() +
                  parseInt(void 0 === l.space ? 0 : l.space, 0);
              "vertical" === l.direction
                ? (t.css({ top: (i - 1) * r + "px", left: "0px" }),
                  d.css({
                    height: (i - 1) * r + t.outerHeight(),
                    width: t.outerWidth(),
                  }))
                : (t.css({ left: (i - 1) * a + "px", top: "0px" }),
                  d.css({
                    width: (i - 1) * a + t.outerWidth(),
                    height: t.outerHeight(),
                  }));
            });
          }
          r.play(), k(e);
        }
        return !0;
      },
      updateNavIndexes: function (e) {
        var i = t[e].c;
        function a(e) {
          i.find(e).lenght > 0 &&
            i.find(e).each(function (e) {
              jQuery(this).data("liindex", e);
            });
        }
        a("rs-tab"),
          a("rs-bullet"),
          a("rs-thumb"),
          t.resizeThumbsTabs(e, !0),
          t.manageNavigation(e);
      },
      manageNavigation: function (e, i) {
        if (t[e].navigation.use) {
          var a = t.getHorizontalOffset(t[e].cpar, "left"),
            o = t.getHorizontalOffset(t[e].cpar, "right");
          p(t[e].navigation.bullets) &&
            ("fullscreen" != t[e].sliderLayout &&
              "fullwidth" != t[e].sliderLayout &&
              ((t[e].navigation.bullets.h_offset_old =
                void 0 === t[e].navigation.bullets.h_offset_old
                  ? parseInt(t[e].navigation.bullets.h_offset, 0)
                  : t[e].navigation.bullets.h_offset_old),
              (t[e].navigation.bullets.h_offset =
                "center" === t[e].navigation.bullets.h_align
                  ? t[e].navigation.bullets.h_offset_old + a / 2 - o / 2
                  : t[e].navigation.bullets.h_offset_old + a - o)),
            _(t[e].c.find(".tp-bullets"), t[e].navigation.bullets, e)),
            p(t[e].navigation.thumbnails) &&
              _(t[e].navigation.thumbnails.c, t[e].navigation.thumbnails, e),
            p(t[e].navigation.tabs) &&
              _(t[e].navigation.tabs.c, t[e].navigation.tabs, e),
            p(t[e].navigation.arrows) &&
              ("fullscreen" != t[e].sliderLayout &&
                "fullwidth" != t[e].sliderLayout &&
                ((t[e].navigation.arrows.left.h_offset_old =
                  void 0 === t[e].navigation.arrows.left.h_offset_old
                    ? parseInt(t[e].navigation.arrows.left.h_offset, 0)
                    : t[e].navigation.arrows.left.h_offset_old),
                (t[e].navigation.arrows.left.h_offset =
                  "right" === t[e].navigation.arrows.left.h_align
                    ? t[e].navigation.arrows.left.h_offset_old + o
                    : t[e].navigation.arrows.left.h_offset_old + a),
                (t[e].navigation.arrows.right.h_offset_old =
                  void 0 === t[e].navigation.arrows.right.h_offset_old
                    ? parseInt(t[e].navigation.arrows.right.h_offset, 0)
                    : t[e].navigation.arrows.right.h_offset_old),
                (t[e].navigation.arrows.right.h_offset =
                  "right" === t[e].navigation.arrows.right.h_align
                    ? t[e].navigation.arrows.right.h_offset_old + o
                    : t[e].navigation.arrows.right.h_offset_old + a)),
              _(
                t[e].c.find(".tp-leftarrow.tparrows"),
                t[e].navigation.arrows.left,
                e
              ),
              _(
                t[e].c.find(".tp-rightarrow.tparrows"),
                t[e].navigation.arrows.right,
                e
              )),
            !1 !== i &&
              (p(t[e].navigation.thumbnails) &&
                r(t[e].navigation.thumbnails, e),
              p(t[e].navigation.tabs) && r(t[e].navigation.tabs, e));
        }
      },
      showFirstTime: function (e) {
        u(e), t.callContWidthManager(e);
      },
      createNavigation: function (e) {
        var o = t[e].navigation.arrows,
          l = t[e].navigation.bullets,
          f = t[e].navigation.thumbnails,
          m = t[e].navigation.tabs,
          y = p(o),
          b = p(l),
          _ = p(f),
          k = p(m);
        s(e),
          n(e),
          y && (v(o, e), (o.c = t[e].cpar.find(".tparrows"))),
          t[e].slides.each(function (i) {
            if (-1 === this.className.indexOf("not-in-nav")) {
              var a = jQuery(t[e].slides[t[e].slides.length - 1 - i]),
                r = jQuery(this);
              b &&
                (t[e].navigation.bullets.rtl
                  ? w(t[e].c, l, a, e)
                  : w(t[e].c, l, r, e)),
                _ &&
                  (t[e].navigation.thumbnails.rtl
                    ? x(t[e].c, f, a, "tp-thumb", e)
                    : x(t[e].c, f, r, "tp-thumb", e)),
                k &&
                  (t[e].navigation.tabs.rtl
                    ? x(t[e].c, m, a, "tp-tab", e)
                    : x(t[e].c, m, r, "tp-tab", e));
            }
          }),
          b && (l.c = t[e].cpar.find(".tp-bullets")),
          _ && jQuery.extend(!0, f, a(e, "thumb")),
          k && jQuery.extend(!0, m, a(e, "tab")),
          t[e].c.bind(
            "revolution.slide.onafterswap revolution.nextslide.waiting",
            function (i) {
              if (
                void 0 !== t[e].pr_next_key ||
                void 0 !== t[e].pr_active_key
              ) {
                var a =
                    void 0 === t[e].pr_next_key
                      ? void 0 === t[e].pr_cache_pr_next_key
                        ? t[e].pr_active_key
                        : t[e].pr_cache_pr_next_key
                      : t[e].pr_next_key,
                  s = t.gA(t[e].slides[a], "key");
                t[e].c.find(".tp-bullet").each(function () {
                  t.gA(this, "key") === s
                    ? this.classList.add("selected")
                    : this.classList.remove("selected");
                }),
                  t[e].cpar.find(".tp-thumb, .tp-tab").each(function () {
                    t.gA(this, "key") === s
                      ? (this.classList.add("selected"),
                        "RS-TAB" === this.nodeName ? r(m, e) : r(f, e))
                      : this.classList.remove("selected");
                  });
                var n = 0,
                  l = !1;
                t[e].thumbs &&
                  jQuery.each(t[e].thumbs, function (e, t) {
                    (n = !1 === l ? e : n),
                      (l = (void 0 !== t && t.id === s) || e === s || l);
                  });
                var d = n > 0 ? n - 1 : t[e].slideamount - 1,
                  c = n + 1 == t[e].slideamount ? 0 : n + 1;
                if (!0 === o.enable && o.pi !== d && o.ni !== c) {
                  (o.pi = d), (o.ni = c);
                  var p = o.tmp;
                  if (
                    (null != t[e].thumbs[d] &&
                      jQuery.each(t[e].thumbs[d].params, function (e, t) {
                        p = p.replace(t.from, t.to);
                      }),
                    o.left.j.html(p),
                    (p = o.tmp),
                    c > t[e].slideamount)
                  )
                    return;
                  void 0 !== t[e].thumbs[c] &&
                    jQuery.each(t[e].thumbs[c].params, function (e, t) {
                      p = p.replace(t.from, t.to);
                    }),
                    o.right.j.html(p),
                    (o.right.iholder = o.right.j.find(".tp-arr-imgholder")),
                    (o.left.iholder = o.left.j.find(".tp-arr-imgholder")),
                    o.rtl
                      ? (void 0 !== o.left.iholder[0] &&
                          tpGS.gsap.set(o.left.iholder, {
                            backgroundImage: "url(" + t[e].thumbs[c].src + ")",
                          }),
                        void 0 !== t[e].thumbs[d] &&
                          void 0 !== o.right.iholder[0] &&
                          tpGS.gsap.set(o.right.iholder, {
                            backgroundImage: "url(" + t[e].thumbs[d].src + ")",
                          }))
                      : (void 0 !== t[e].thumbs[d] &&
                          void 0 !== o.left.iholder[0] &&
                          tpGS.gsap.set(o.left.iholder, {
                            backgroundImage: "url(" + t[e].thumbs[d].src + ")",
                          }),
                        void 0 !== o.right.iholder[0] &&
                          tpGS.gsap.set(o.right.iholder, {
                            backgroundImage: "url(" + t[e].thumbs[c].src + ")",
                          }));
                }
              }
            }
          ),
          c(o),
          c(l),
          c(f),
          c(m),
          t[e].cpar.on("mouseenter mousemove", function (a) {
            (void 0 !== a.target &&
              void 0 !== a.target.className &&
              "string" == typeof a.target.className &&
              a.target.className.indexOf("rs-waction") >= 0) ||
              t[e].cpar.hasClass("tp-mouseover") ||
              (t[e].cpar.addClass("tp-mouseover"),
              t[e].firstSlideAvailable &&
                (u(e),
                i &&
                  !0 !== t[e].someNavIsDragged &&
                  (g(t[e].hideAllNavElementTimer),
                  (t[e].hideAllNavElementTimer = setTimeout(function () {
                    t[e].cpar.removeClass("tp-mouseover"), h(e);
                  }, 150)))));
          }),
          t[e].cpar.on("mouseleave ", function () {
            t[e].cpar.removeClass("tp-mouseover"), h(e);
          }),
          (_ ||
            k ||
            "carousel" === t[e].sliderType ||
            t[e].navigation.touch.touchOnDesktop ||
            (t[e].navigation.touch.touchenabled && i)) &&
            d(e);
      },
    });
    var r = function (e, i) {
        var a =
            "vertical" === e.direction
              ? e.mask.find(e.single).first().outerHeight(!0) + e.space
              : e.mask.find(e.single).first().outerWidth(!0) + e.space,
          r = "vertical" === e.direction ? e.mask.height() : e.mask.width(),
          o = e.mask.find(e.single + ".selected").data("liindex");
        o =
          (o = void 0 === o ? 0 : o) > 0 &&
          1 === t[i].sdir &&
          e.visibleAmount > 1
            ? o - 1
            : o;
        var s = r / a,
          n = "vertical" === e.direction ? e.mask.height() : e.mask.width(),
          l = 0 - o * a,
          d = "vertical" === e.direction ? e.wrap.height() : e.wrap.width(),
          c = l < 0 - (d - n) ? 0 - (d - n) : l,
          p = t.gA(e.wrap[0], "offset");
        (p = void 0 === p ? 0 : p),
          s > 2 &&
            ((c = l - (p + a) <= 0 ? (l - (p + a) < 0 - a ? p : c + a) : c),
            (c =
              l - a + p + r < a && l + (Math.round(s) - 2) * a < p
                ? l + (Math.round(s) - 2) * a
                : c)),
          (c =
            ("vertical" !== e.direction && e.mask.width() >= e.wrap.width()) ||
            ("vertical" === e.direction && e.mask.height() >= e.wrap.height())
              ? 0
              : c < 0 - (d - n)
              ? 0 - (d - n)
              : c > 0
              ? 0
              : c),
          e.c.hasClass("dragged") ||
            ("vertical" === e.direction
              ? e.wrap.data(
                  "tmmove",
                  tpGS.gsap.to(e.wrap, 0.5, {
                    top: c + "px",
                    ease: "power3.inOut",
                  })
                )
              : e.wrap.data(
                  "tmmove",
                  tpGS.gsap.to(e.wrap, 0.5, {
                    left: c + "px",
                    ease: "power3.inOut",
                  })
                ),
            e.wrap.data("offset", c));
      },
      o = function (e, t, i, a, r, o) {
        var s = i.parent().find(".tp-" + o + "s"),
          n = s.find(".tp-" + o + "s-inner-wrapper"),
          l = s.find(".tp-" + o + "-mask"),
          d = a.width * e < a.min_width ? a.min_width : Math.round(a.width * e),
          c = Math.round((d / a.width) * a.height),
          p = "vertical" === a.direction ? d : d * r + a.space * (r - 1),
          g = "vertical" === a.direction ? c * r + a.space * (r - 1) : c,
          u =
            "vertical" === a.direction
              ? { width: d + "px" }
              : { height: c + "px" };
        t.add(tpGS.gsap.set(s, u)),
          t.add(tpGS.gsap.set(n, { width: p + "px", height: g + "px" })),
          t.add(tpGS.gsap.set(l, { width: p + "px", height: g + "px" }));
        var f = n.find(".tp-" + o);
        return (
          f &&
            jQuery.each(f, function (e, i) {
              "vertical" === a.direction
                ? t.add(
                    tpGS.gsap.set(i, {
                      top:
                        e * (c + parseInt(void 0 === a.space ? 0 : a.space, 0)),
                      width: d + "px",
                      height: c + "px",
                    })
                  )
                : "horizontal" === a.direction &&
                  t.add(
                    tpGS.gsap.set(i, {
                      left:
                        e * (d + parseInt(void 0 === a.space ? 0 : a.space, 0)),
                      width: d + "px",
                      height: c + "px",
                    })
                  );
            }),
          t
        );
      },
      s = function (e) {
        !0 === t[e].navigation.keyboardNavigation &&
          jQuery(document).keydown(function (i) {
            (("horizontal" == t[e].navigation.keyboard_direction &&
              39 == i.keyCode) ||
              ("vertical" == t[e].navigation.keyboard_direction &&
                40 == i.keyCode)) &&
              ((t[e].sc_indicator = "arrow"),
              (t[e].sc_indicator_dir = 0),
              t.callingNewSlide(e, 1)),
              (("horizontal" == t[e].navigation.keyboard_direction &&
                37 == i.keyCode) ||
                ("vertical" == t[e].navigation.keyboard_direction &&
                  38 == i.keyCode)) &&
                ((t[e].sc_indicator = "arrow"),
                (t[e].sc_indicator_dir = 1),
                t.callingNewSlide(e, -1));
          });
      },
      n = function (e) {
        if (
          !0 === t[e].navigation.mouseScrollNavigation ||
          "on" === t[e].navigation.mouseScrollNavigation ||
          "carousel" === t[e].navigation.mouseScrollNavigation
        ) {
          (t[e].isIEEleven = !!navigator.userAgent.match(/Trident.*rv\:11\./)),
            (t[e].isSafari = !!navigator.userAgent.match(/safari/i)),
            (t[e].ischrome = !!navigator.userAgent.match(/chrome/i));
          var i = t[e].ischrome
              ? -49
              : t[e].isIEEleven || t[e].isSafari
              ? -9
              : navigator.userAgent.match(/mozilla/i)
              ? -29
              : -49,
            a = t[e].ischrome
              ? 49
              : t[e].isIEEleven || t[e].isSafari
              ? 9
              : navigator.userAgent.match(/mozilla/i)
              ? 29
              : 49;
          t[e].c.on("mousewheel DOMMouseScroll", function (r) {
            var o,
              s,
              n,
              l,
              d,
              c =
                ((o = r.originalEvent),
                (s = 0),
                (n = 0),
                (l = 0),
                (d = 0),
                "detail" in o && (n = o.detail),
                "wheelDelta" in o && (n = -o.wheelDelta / 120),
                "wheelDeltaY" in o && (n = -o.wheelDeltaY / 120),
                "wheelDeltaX" in o && (s = -o.wheelDeltaX / 120),
                "axis" in o &&
                  o.axis === o.HORIZONTAL_AXIS &&
                  ((s = n), (n = 0)),
                (l = 1 * s),
                (d = 1 * n),
                "deltaY" in o && (d = o.deltaY),
                "deltaX" in o && (l = o.deltaX),
                (l || d) && o.deltaMode && (o.deltaMode, (l *= 1), (d *= 1)),
                l && !s && (s = l < 1 ? -1 : 1),
                d && !n && (n = d < 1 ? -1 : 1),
                ((d = navigator.userAgent.match(/mozilla/i) ? 10 * d : d) >
                  300 ||
                  d < -300) &&
                  (d /= 10),
                { spinX: s, spinY: n, pixelX: l, pixelY: d }),
              p = !0,
              g = 0 == t[e].pr_active_key || 0 == t[e].pr_processing_key,
              u =
                t[e].pr_active_key == t[e].slideamount - 1 ||
                t[e].pr_processing_key == t[e].slideamount - 1;
            if (t[e].isSafari) {
              var f = c.pixelY < 0 ? -1 : 1;
              if (
                void 0 !== t[e].doubleScrollEventTimeStamp &&
                r.timeStamp - t[e].doubleScrollEventTimeStamp < 750 &&
                t[e].doubleScrollEventDir === f
              )
                return void r.preventDefault(r);
              (t[e].doubleScrollEventTimeStamp = r.timeStamp),
                (t[e].doubleScrollEventDir = f);
            }
            "carousel" == t[e].navigation.mouseScrollNavigation && (g = u = !1),
              void 0 === t[e].pr_processing_key
                ? c.pixelY < i
                  ? (g ||
                      ((t[e].sc_indicator = "arrow"),
                      "reverse" !== t[e].navigation.mouseScrollReverse &&
                        ((t[e].sc_indicator_dir = 1),
                        "carousel" === t[e].sliderType &&
                          (t[e].ctNavElement = !0),
                        t.callingNewSlide(
                          e,
                          -1,
                          "carousel" === t[e].sliderType
                        )),
                      (p = !1)),
                    u ||
                      ((t[e].sc_indicator = "arrow"),
                      "reverse" === t[e].navigation.mouseScrollReverse &&
                        ((t[e].sc_indicator_dir = 0),
                        "carousel" === t[e].sliderType &&
                          (t[e].ctNavElement = !0),
                        t.callingNewSlide(
                          e,
                          1,
                          "carousel" === t[e].sliderType
                        )),
                      (p = !1)))
                  : c.pixelY > a &&
                    (u ||
                      ((t[e].sc_indicator = "arrow"),
                      "reverse" !== t[e].navigation.mouseScrollReverse &&
                        ((t[e].sc_indicator_dir = 0),
                        "carousel" === t[e].sliderType &&
                          (t[e].ctNavElement = !0),
                        t.callingNewSlide(
                          e,
                          1,
                          "carousel" === t[e].sliderType
                        )),
                      (p = !1)),
                    g ||
                      ((t[e].sc_indicator = "arrow"),
                      "reverse" === t[e].navigation.mouseScrollReverse &&
                        ((t[e].sc_indicator_dir = 1),
                        "carousel" === t[e].sliderType &&
                          (t[e].ctNavElement = !0),
                        t.callingNewSlide(
                          e,
                          -1,
                          "carousel" === t[e].sliderType
                        )),
                      (p = !1)))
                : (p = !1);
            var h = t[e].c.offset().top - jQuery("body").scrollTop(),
              m = h + t[e].c.height();
            return (
              "carousel" != t[e].navigation.mouseScrollNavigation
                ? ("reverse" !== t[e].navigation.mouseScrollReverse &&
                    ((h > 0 && c.pixelY > 0) ||
                      (m < jQuery(window).height() && c.pixelY < 0)) &&
                    (p = !0),
                  "reverse" === t[e].navigation.mouseScrollReverse &&
                    ((h < 0 && c.pixelY < 0) ||
                      (m > jQuery(window).height() && c.pixelY > 0)) &&
                    (p = !0))
                : (p = !1),
              p ? void 0 : (r.preventDefault(r), !1)
            );
          });
        }
      },
      l = function (e, t) {
        var a = !1;
        for (var r in ((void 0 === t.path || i) &&
          (a = (function (e, t) {
            for (; e && e !== document; e = e.parentNode)
              if (e.tagName === t) return e;
            return !1;
          })(t.target, e)),
        t.path))
          t.path.hasOwnProperty(r) && t.path[r].tagName === e && (a = !0);
        return a;
      },
      d = function (e) {
        var a = t[e].carousel,
          r = t.is_android();
        jQuery(".bullet, .bullets, .tp-bullets, .tparrows").addClass("noSwipe"),
          (t[e].navigation.touch =
            void 0 === t[e].navigation.touch ? {} : t[e].navigation.touch),
          (t[e].navigation.touch.swipe_direction =
            void 0 === t[e].navigation.touch.swipe_direction
              ? "horizontal"
              : t[e].navigation.touch.swipe_direction),
          jQuery(".rs-nav-element").rsswipe({
            allowPageScroll: "vertical",
            triggerOnTouchLeave: !0,
            treshold: t[e].navigation.touch.swipe_treshold,
            fingers:
              t[e].navigation.touch.swipe_min_touches > 5
                ? 1
                : t[e].navigation.touch.swipe_min_touches,
            excludedElements: ".noSwipe",
            tap: function (e, t) {
              if (void 0 !== t) var i = jQuery(t).closest("rs-thumb");
              void 0 !== i && i.length > 0
                ? i.trigger("click")
                : (i = jQuery(t).closest("rs-tab")).length > 0
                ? i.trigger("click")
                : (i = jQuery(t).closest("rs-bullet")).length > 0 &&
                  i.trigger("click");
            },
            swipeStatus: function (i, o, s, n, d, c, p) {
              if ("start" !== o && "move" !== o && "end" !== o && "cancel" != o)
                return (
                  t[e].navigation.touch.drag_block_vertical &&
                    i.preventDefault(),
                  !0
                );
              var u = l("RS-THUMB", i),
                h =
                  (l("RS-TAB", i),
                  "start" === o
                    ? 0
                    : r
                    ? p[0].end.x - p[0].start.x
                    : i.pageX - a.screenX),
                m =
                  "start" === o
                    ? 0
                    : r
                    ? p[0].end.y - p[0].start.y
                    : i.pageY - a.screenY,
                v = u ? ".tp-thumbs" : ".tp-tabs",
                y = u ? ".tp-thumb-mask" : ".tp-tab-mask",
                b = u ? ".tp-thumbs-inner-wrapper" : ".tp-tabs-inner-wrapper",
                _ = u ? ".tp-thumb" : ".tp-tab",
                w = u ? t[e].navigation.thumbnails : t[e].navigation.tabs,
                x = t[e].cpar.find(y),
                k = x.find(b),
                S = w.direction,
                T = "vertical" === S ? k.height() : k.width(),
                L = "vertical" === S ? x.height() : x.width(),
                R =
                  "vertical" === S
                    ? x.find(_).first().outerHeight(!0) + w.space
                    : x.find(_).first().outerWidth(!0) + w.space,
                A =
                  void 0 === k.data("offset")
                    ? 0
                    : parseInt(k.data("offset"), 0),
                I = 0;
              switch (o) {
                case "start":
                  "vertical" === S && i.preventDefault(),
                    (a.screenX = r ? p[0].end.x : i.pageX),
                    (a.screenY = r ? p[0].end.y : i.pageY),
                    t[e].cpar.find(v).addClass("dragged"),
                    (A =
                      "vertical" === S ? k.position().top : k.position().left),
                    k.data("offset", A),
                    k.data("tmmove") && k.data("tmmove").pause(),
                    (t[e].someNavIsDragged = !0),
                    f(e);
                  break;
                case "move":
                  if (T <= L) return !1;
                  I =
                    (I = A + ("vertical" === S ? m : h)) > 0
                      ? "horizontal" === S
                        ? I - k.width() * (((I / k.width()) * I) / k.width())
                        : I - k.height() * (((I / k.height()) * I) / k.height())
                      : I;
                  var z =
                    "vertical" === S
                      ? 0 - (k.height() - x.height())
                      : 0 - (k.width() - x.width());
                  (I =
                    I < z
                      ? "horizontal" === S
                        ? I +
                          (((k.width() * (I - z)) / k.width()) * (I - z)) /
                            k.width()
                        : I +
                          (((k.height() * (I - z)) / k.height()) * (I - z)) /
                            k.height()
                      : I),
                    "vertical" === S
                      ? tpGS.gsap.set(k, { top: I + "px" })
                      : tpGS.gsap.set(k, { left: I + "px" }),
                    g(t[e].hideAllNavElementTimer);
                  break;
                case "end":
                case "cancel":
                  return (
                    (I = A + ("vertical" === S ? m : h)),
                    (I =
                      (I =
                        "vertical" === S
                          ? I < 0 - (k.height() - x.height())
                            ? 0 - (k.height() - x.height())
                            : I
                          : I < 0 - (k.width() - x.width())
                          ? 0 - (k.width() - x.width())
                          : I) > 0
                        ? 0
                        : I),
                    (I =
                      Math.abs(n) > R / 10
                        ? n <= 0
                          ? Math.floor(I / R) * R
                          : Math.ceil(I / R) * R
                        : n < 0
                        ? Math.ceil(I / R) * R
                        : Math.floor(I / R) * R),
                    (I =
                      (I =
                        "vertical" === S
                          ? I < 0 - (k.height() - x.height())
                            ? 0 - (k.height() - x.height())
                            : I
                          : I < 0 - (k.width() - x.width())
                          ? 0 - (k.width() - x.width())
                          : I) > 0
                        ? 0
                        : I),
                    "vertical" === S
                      ? tpGS.gsap.to(k, 0.5, {
                          top: I + "px",
                          ease: "power3.out",
                        })
                      : tpGS.gsap.to(k, 0.5, {
                          left: I + "px",
                          ease: "power3.out",
                        }),
                    (I =
                      I ||
                      ("vertical" === S
                        ? k.position().top
                        : k.position().left)),
                    k.data("offset", I),
                    k.data("distance", n),
                    t[e].cpar.find(v).removeClass("dragged"),
                    (t[e].someNavIsDragged = !1),
                    !0
                  );
              }
            },
          }),
          (("carousel" !== t[e].sliderType &&
            ((i && t[e].navigation.touch.touchenabled) ||
              (!0 !== i && t[e].navigation.touch.touchOnDesktop))) ||
            ("carousel" === t[e].sliderType &&
              ((i && t[e].navigation.touch.mobileCarousel) ||
                (!0 !== i && t[e].navigation.touch.desktopCarousel)))) &&
            t[e].c.rsswipe({
              allowPageScroll: "vertical",
              triggerOnTouchLeave: !0,
              treshold: t[e].navigation.touch.swipe_treshold,
              fingers:
                t[e].navigation.touch.swipe_min_touches > 5
                  ? 1
                  : t[e].navigation.touch.swipe_min_touches,
              excludedElements:
                "label, button, input, select, textarea, .noSwipe, .rs-nav-element",
              swipeStatus: function (o, s, n, l, d, c, p) {
                var g =
                  "start" === s
                    ? 0
                    : r
                    ? p[0].end.x - p[0].start.x
                    : o.pageX - a.screenX;
                "start" === s ||
                  (r ? (p[0].end.x, p[0].start.y) : (o.pageY, a.screenY));
                if (
                  !(
                    "carousel" === t[e].sliderType &&
                    t[e].carousel.wrapwidth > t[e].carousel.maxwidth &&
                    "center" !== t[e].carousel.horizontal_align
                  )
                ) {
                  if ("carousel" !== t[e].sliderType) {
                    if ("end" == s) {
                      if (
                        ((t[e].sc_indicator = "arrow"),
                        ("horizontal" ==
                          t[e].navigation.touch.swipe_direction &&
                          "left" == n) ||
                          ("vertical" ==
                            t[e].navigation.touch.swipe_direction &&
                            "up" == n))
                      )
                        return (
                          (t[e].sc_indicator_dir = 0),
                          t.callingNewSlide(e, 1),
                          !1
                        );
                      if (
                        ("horizontal" ==
                          t[e].navigation.touch.swipe_direction &&
                          "right" == n) ||
                        ("vertical" == t[e].navigation.touch.swipe_direction &&
                          "down" == n)
                      )
                        return (
                          (t[e].sc_indicator_dir = 1),
                          t.callingNewSlide(e, -1),
                          !1
                        );
                    }
                    return (
                      t[e].navigation.touch.drag_block_vertical &&
                        o.preventDefault(),
                      !0
                    );
                  }
                  switch (
                    ((a.preventSwipe ||
                      (i && ("left" === n || "right" === n))) &&
                      o.preventDefault(),
                    void 0 !== a.positionanim && a.positionanim.pause(),
                    (a.carouselAutomatic = !1),
                    s)
                  ) {
                    case "start":
                      clearTimeout(a.swipeMainTimer),
                        (a.beforeSwipeOffet = a.slide_offset),
                        (a.focusedBeforeSwipe = a.focused),
                        (a.beforeDragStatus = t[e].sliderstatus),
                        t[e].c.trigger("stoptimer"),
                        (a.swipeStartPos = r ? p[0].start.x : o.pageX),
                        (a.swipeStartTime = new Date().getTime()),
                        (a.screenX = r ? p[0].end.x : o.pageX),
                        (a.screenY = r ? p[0].end.y : o.pageY),
                        void 0 !== a.positionanim &&
                          (a.positionanim.pause(), (a.carouselAutomatic = !1)),
                        (a.overpull = "none"),
                        a.wrap.addClass("dragged");
                      break;
                    case "move":
                      if (
                        (("left" !== n && "right" !== n) ||
                          (a.preventSwipe = !0),
                        (a.justDragged = !0),
                        Math.abs(g) >= 10 || t[e].carousel.isDragged)
                      ) {
                        if (
                          ((t[e].carousel.isDragged = !0),
                          t[e].c
                            .find(".rs-waction")
                            .addClass("tp-temporarydisabled"),
                          (a.CACHE_slide_offset = a.beforeSwipeOffet + g),
                          !a.infinity)
                        ) {
                          var u =
                            "center" === a.horizontal_align
                              ? (a.wrapwidth / 2 -
                                  a.slide_width / 2 -
                                  a.CACHE_slide_offset) /
                                a.slide_width
                              : (0 - a.CACHE_slide_offset) / a.slide_width;
                          ("none" !== a.overpull && 0 !== a.overpull) ||
                          !(u < 0 || u > t[e].slideamount - 1)
                            ? u >= 0 &&
                              u <= t[e].slideamount - 1 &&
                              ((u >= 0 && g > a.overpull) ||
                                (u <= t[e].slideamount - 1 &&
                                  g < a.overpull)) &&
                              (a.overpull = 0)
                            : (a.overpull = g),
                            (a.CACHE_slide_offset =
                              u < 0
                                ? a.CACHE_slide_offset +
                                  (a.overpull - g) / 1.5 +
                                  Math.sqrt(Math.abs((a.overpull - g) / 1.5))
                                : u > t[e].slideamount - 1
                                ? a.CACHE_slide_offset +
                                  (a.overpull - g) / 1.5 -
                                  Math.sqrt(Math.abs((a.overpull - g) / 1.5))
                                : a.CACHE_slide_offset);
                        }
                        t.swipeAnimate({
                          id: e,
                          to: a.CACHE_slide_offset,
                          direction: n,
                          easing: "power2.out",
                          phase: "move",
                        });
                      }
                      break;
                    case "end":
                    case "cancel":
                      clearTimeout(a.swipeMainTimer),
                        (a.swipeMainTimer = setTimeout(function () {
                          a.preventSwipe = !1;
                        }, 500)),
                        (t[e].carousel.isDragged = !1),
                        a.wrap.removeClass("dragged"),
                        (a.swipeEndPos = r ? p[0].end.x : o.pageX),
                        (a.swipeEndTime = new Date().getTime()),
                        (a.swipeDuration = a.swipeEndTime - a.swipeStartTime),
                        (a.swipeDistance = i
                          ? a.swipeEndPos - a.swipeStartPos
                          : (a.swipeEndPos - a.swipeStartPos) / 1.5),
                        (a.swipePower = a.swipeDistance / a.swipeDuration),
                        (a.CACHE_slide_offset =
                          a.slide_offset +
                          a.swipeDistance * Math.abs(a.swipePower)),
                        t.swipeAnimate({
                          id: e,
                          to: a.CACHE_slide_offset,
                          direction: n,
                          fix: !0,
                          newSlide: !0,
                          easing: "power2.out",
                          phase: "end",
                        }),
                        "playing" === a.beforeDragStatus &&
                          t[e].c.trigger("restarttimer"),
                        setTimeout(function () {
                          t[e].c
                            .find(".rs-waction")
                            .removeClass("tp-temporarydisabled");
                        }, 19);
                  }
                }
              },
            }),
          "carousel" === t[e].sliderType &&
            ((i && 0 == t[e].navigation.touch.mobileCarousel) ||
              (!0 !== i && !1 === t[e].navigation.touch.desktopCarousel)) &&
            a.wrap.addClass("noswipe");
      },
      c = function (e) {
        (e.hide_delay = jQuery.isNumeric(parseInt(e.hide_delay, 0))
          ? e.hide_delay
          : 0.2),
          (e.hide_delay_mobile = jQuery.isNumeric(
            parseInt(e.hide_delay_mobile, 0)
          )
            ? e.hide_delay_mobile
            : 0.2);
      },
      p = function (e) {
        return e && e.enable;
      },
      g = function (e) {
        clearTimeout(e);
      },
      u = function (e) {
        var i = t[e].navigation.maintypes;
        for (var a in i)
          i.hasOwnProperty(a) &&
            p(t[e].navigation[i[a]]) &&
            (g(t[e].navigation[i[a]].showCall),
            (t[e].navigation[i[a]].showCall = setTimeout(
              function (i) {
                g(i.hideCall),
                  (i.hide_onleave && !t[e].cpar.hasClass("tp-mouseover")) ||
                    (void 0 === i.tween ? (i.tween = m(i)) : i.tween.play());
              },
              t[e].navigation[i[a]].hide_onleave &&
                !t[e].cpar.hasClass("tp-mouseover")
                ? 0
                : parseInt(t[e].navigation[i[a]].animDelay),
              t[e].navigation[i[a]]
            )));
      },
      f = function (e) {
        var i = t[e].navigation.maintypes;
        for (var a in i)
          i.hasOwnProperty(a) &&
            void 0 !== t[e].navigation[i[a]] &&
            t[e].navigation[i[a]].hide_onleave &&
            p(t[e].navigation[i[a]]) &&
            g(t[e].navigation[i[a]].hideCall);
      },
      h = function (e, a) {
        var r = t[e].navigation.maintypes;
        for (var o in r)
          r.hasOwnProperty(o) &&
            void 0 !== t[e].navigation[r[o]] &&
            t[e].navigation[r[o]].hide_onleave &&
            p(t[e].navigation[r[o]]) &&
            (g(t[e].navigation[r[o]].hideCall),
            (t[e].navigation[r[o]].hideCall = setTimeout(
              function (e) {
                g(e.showCall), e.tween && e.tween.reverse();
              },
              i
                ? parseInt(t[e].navigation[r[o]].hide_delay_mobile, 0)
                : parseInt(t[e].navigation[r[o]].hide_delay, 0),
              t[e].navigation[r[o]]
            )));
      },
      m = function (e) {
        (e.speed = void 0 === e.speed ? 0.5 : e.speed),
          (e.anims = []),
          void 0 !== e.anim && void 0 === e.left && e.anims.push(e.anim),
          void 0 !== e.left && e.anims.push(e.left.anim),
          void 0 !== e.right && e.anims.push(e.right.anim);
        var t = tpGS.gsap.timeline();
        for (var i in (t.add(
          tpGS.gsap.to(e.c, e.speed, {
            autoAlpha: 1,
            opacity: 1,
            ease: "power3.inOut",
          }),
          0
        ),
        e.anims))
          if (e.anims.hasOwnProperty(i))
            switch (e.anims[i]) {
              case "left":
                t.add(
                  tpGS.gsap.fromTo(
                    e.c[i],
                    e.speed,
                    { marginLeft: -50 },
                    { marginLeft: 0, ease: "power3.inOut" }
                  ),
                  0
                );
                break;
              case "right":
                t.add(
                  tpGS.gsap.fromTo(
                    e.c[i],
                    e.speed,
                    { marginLeft: 50 },
                    { marginLeft: 0, ease: "power3.inOut" }
                  ),
                  0
                );
                break;
              case "top":
                t.add(
                  tpGS.gsap.fromTo(
                    e.c[i],
                    e.speed,
                    { marginTop: -50 },
                    { marginTop: 0, ease: "power3.inOut" }
                  ),
                  0
                );
                break;
              case "bottom":
                t.add(
                  tpGS.gsap.fromTo(
                    e.c[i],
                    e.speed,
                    { marginTop: 50 },
                    { marginTop: 0, ease: "power3.inOut" }
                  ),
                  0
                );
                break;
              case "zoomin":
                t.add(
                  tpGS.gsap.fromTo(
                    e.c[i],
                    e.speed,
                    { scale: 0.5 },
                    { scale: 1, ease: "power3.inOut" }
                  ),
                  0
                );
                break;
              case "zoomout":
                t.add(
                  tpGS.gsap.fromTo(
                    e.c[i],
                    e.speed,
                    { scale: 1.2 },
                    { scale: 1, ease: "power3.inOut" }
                  ),
                  0
                );
            }
        return t.play(), t;
      },
      v = function (e, i) {
        (e.style = void 0 === e.style ? "" : e.style),
          (e.left.style = void 0 === e.left.style ? "" : e.left.style),
          (e.right.style = void 0 === e.right.style ? "" : e.right.style),
          0 === t[i].c.find(".tp-leftarrow.tparrows").length &&
            t[i].c.append(
              '<rs-arrow style="opacity:0" class="tp-leftarrow tparrows ' +
                e.style +
                " " +
                e.left.style +
                '">' +
                e.tmp +
                "</rs-arrow>"
            ),
          0 === t[i].c.find(".tp-rightarrow.tparrows").length &&
            t[i].c.append(
              '<rs-arrow style="opacity:0"  class="tp-rightarrow tparrows ' +
                e.style +
                " " +
                e.right.style +
                '">' +
                e.tmp +
                "</rs-arrow>"
            );
        var a = t[i].c.find(".tp-leftarrow.tparrows"),
          r = t[i].c.find(".tp-rightarrow.tparrows");
        e.rtl
          ? (a.click(function () {
              "carousel" === t[i].sliderType && (t[i].ctNavElement = !0),
                (t[i].sc_indicator = "arrow"),
                (t[i].sc_indicator_dir = 0),
                t[i].c.revnext();
            }),
            r.click(function () {
              "carousel" === t[i].sliderType && (t[i].ctNavElement = !0),
                (t[i].sc_indicator = "arrow"),
                (t[i].sc_indicator_dir = 1),
                t[i].c.revprev();
            }))
          : (r.click(function () {
              "carousel" === t[i].sliderType && (t[i].ctNavElement = !0),
                (t[i].sc_indicator = "arrow"),
                (t[i].sc_indicator_dir = 0),
                t[i].c.revnext();
            }),
            a.click(function () {
              "carousel" === t[i].sliderType && (t[i].ctNavElement = !0),
                (t[i].sc_indicator = "arrow"),
                (t[i].sc_indicator_dir = 1),
                t[i].c.revprev();
            })),
          (e.right.j = t[i].c.find(".tp-rightarrow.tparrows")),
          (e.left.j = t[i].c.find(".tp-leftarrow.tparrows")),
          (e.padding_top = parseInt(t[i].carousel.padding_top || 0, 0)),
          (e.padding_bottom = parseInt(t[i].carousel.padding_bottom || 0, 0)),
          _(a, e.left, i),
          _(r, e.right, i),
          ("outer-left" != e.position && "outer-right" != e.position) ||
            (t[i].outernav = !0);
      },
      y = function (e, i, a) {
        var r = e.outerHeight(!0),
          o = null == t[a] ? 0 : 0 == t[a].conh ? t[a].height : t[a].conh,
          s =
            "layergrid" == i.container
              ? "fullscreen" == t[a].sliderLayout
                ? t[a].height / 2 - (t[a].gridheight[t[a].level] * t[a].bh) / 2
                : t[a].autoHeight ||
                  (null != t[a].minHeight && t[a].minHeight > 0)
                ? o / 2 - (t[a].gridheight[t[a].level] * t[a].bh) / 2
                : 0
              : 0,
          n =
            "top" === i.v_align
              ? { top: "0px", y: Math.round(i.v_offset + s) + "px" }
              : "center" === i.v_align
              ? { top: "50%", y: Math.round(0 - r / 2 + i.v_offset) + "px" }
              : { top: "100%", y: Math.round(0 - (r + i.v_offset + s)) + "px" };
        e.hasClass("outer-bottom") || tpGS.gsap.set(e, n);
      },
      b = function (e, i, a) {
        var r = e.outerWidth(!0),
          o =
            "layergrid" === i.container
              ? t[a].width / 2 - (t[a].gridwidth[t[a].level] * t[a].bw) / 2
              : 0,
          s =
            "left" === i.h_align
              ? { left: "0px", x: Math.round(i.h_offset + o) + "px" }
              : "center" === i.h_align
              ? { left: "50%", x: Math.round(0 - r / 2 + i.h_offset) + "px" }
              : {
                  left: "100%",
                  x: Math.round(0 - (r + i.h_offset + o)) + "px",
                };
        tpGS.gsap.set(e, s);
      },
      _ = function (e, i, a) {
        var r =
            "fullwidth" == t[a].sliderLayout ||
            "fullscreen" == t[a].sliderLayout,
          o = r ? t[a].c.width() : t[a].topc.width(),
          s = t[a].c.height();
        if (
          (y(e, i, a),
          b(e, i, a),
          "outer-left" === i.position && r
            ? tpGS.gsap.set(e, {
                left: 0 - e.outerWidth() + "px",
                x: i.h_offset + "px",
              })
            : "outer-right" === i.position &&
              r &&
              tpGS.gsap.set(e, {
                right: 0 - e.outerWidth() + "px",
                x: i.h_offset + "px",
              }),
          e.hasClass("tp-thumbs") || e.hasClass("tp-tabs"))
        ) {
          var n = e.data("wr_padding"),
            l = e.data("maxw"),
            d = e.data("maxh"),
            c = e.hasClass("tp-thumbs")
              ? e.find(".tp-thumb-mask")
              : e.find(".tp-tab-mask"),
            p = parseInt(i.padding_top || 0, 0),
            g = parseInt(i.padding_bottom || 0, 0),
            u = {},
            f = {};
          l > o && "outer-left" !== i.position && "outer-right" !== i.position
            ? ((u.left = "0px"),
              (u.x = 0),
              (u.maxWidth = o - 2 * n + "px"),
              (f.maxWidth = o - 2 * n + "px"))
            : ((u.maxWidth = l), (f.maxWidth = o + "px")),
            d + 2 * n > s &&
            "outer-bottom" !== i.position &&
            "outer-top" !== i.position
              ? ((u.top = "0px"),
                (u.y = 0),
                (u.maxHeight = p + g + (s - 2 * n) + "px"),
                (f.maxHeight = p + g + (s - 2 * n) + "px"))
              : ((u.maxHeight = d + "px"), (f.maxHeight = d + "px")),
            i.span
              ? ("layergrid" == i.container &&
                  "outer-left" !== i.position &&
                  "outer-right" !== i.position &&
                  (p = g = 0),
                "vertical" === i.direction
                  ? ((u.maxHeight = p + g + (s - 2 * n) + "px"),
                    (u.height = p + g + (s - 2 * n) + "px"),
                    (u.top = 0 - p),
                    (u.y = 0),
                    (f.maxHeight = p + g + Math.min(d, s - 2 * n) + "px"),
                    tpGS.gsap.set(e, u),
                    tpGS.gsap.set(c, f),
                    y(c, i, a))
                  : "horizontal" === i.direction &&
                    ((u.maxWidth = "100%"),
                    (u.width = o - 2 * n + "px"),
                    (u.left = 0),
                    (u.x = 0),
                    (f.maxWidth = l >= o ? "100%" : Math.min(l, o) + "px"),
                    tpGS.gsap.set(e, u),
                    tpGS.gsap.set(c, f),
                    b(c, i, a)))
              : (tpGS.gsap.set(e, u), tpGS.gsap.set(c, f));
        }
      },
      w = function (e, i, a, r) {
        0 === e.find(".tp-bullets").length &&
          ((i.style = void 0 === i.style ? "" : i.style),
          e.append(
            '<rs-bullets style="opacity:0"  class="tp-bullets ' +
              i.style +
              " " +
              i.direction +
              '"></rs-bullets>'
          ));
        var o = e.find(".tp-bullets"),
          s = a.data("key"),
          n = i.tmp;
        void 0 !== t[r].thumbs[a.index()] &&
          jQuery.each(t[r].thumbs[a.index()].params, function (e, t) {
            n = n.replace(t.from, t.to);
          }),
          o.append(
            '<rs-bullet data-key="' +
              s +
              '" class="justaddedbullet tp-bullet">' +
              n +
              "</rs-bullet>"
          );
        var l = e.find(".justaddedbullet"),
          d = e.find(".tp-bullet").length,
          c = l.outerWidth() + parseInt(void 0 === i.space ? 0 : i.space, 0),
          p = l.outerHeight() + parseInt(void 0 === i.space ? 0 : i.space, 0);
        "vertical" === i.direction
          ? (l.css({ top: (d - 1) * p + "px", left: "0px" }),
            o.css({
              height: (d - 1) * p + l.outerHeight(),
              width: l.outerWidth(),
            }))
          : (l.css({ left: (d - 1) * c + "px", top: "0px" }),
            o.css({
              width: (d - 1) * c + l.outerWidth(),
              height: l.outerHeight(),
            })),
          void 0 !== t[r].thumbs[a.index()] &&
            l.find(".tp-bullet-image").css({
              backgroundImage: "url(" + t[r].thumbs[a.index()].src + ")",
            }),
          l.click(function () {
            "carousel" === t[r].sliderType && (t[r].ctNavElement = !0),
              (t[r].sc_indicator = "bullet"),
              e.revcallslidewithid(s),
              e.find(".tp-bullet").removeClass("selected"),
              jQuery(this).addClass("selected");
          }),
          l.removeClass("justaddedbullet"),
          (i.padding_top = parseInt(t[r].carousel.padding_top || 0, 0)),
          (i.padding_bottom = parseInt(t[r].carousel.padding_bottom || 0, 0)),
          ("outer-left" != i.position && "outer-right" != i.position) ||
            (t[r].outernav = !0),
          o.addClass("nav-pos-hor-" + i.h_align),
          o.addClass("nav-pos-ver-" + i.v_align),
          o.addClass("nav-dir-" + i.direction),
          _(o, i, r);
      },
      x = function (e, i, a, r, o) {
        var s = "tp-thumb" === r ? ".tp-thumbs" : ".tp-tabs",
          n = "tp-thumb" === r ? ".tp-thumb-mask" : ".tp-tab-mask",
          l =
            "tp-thumb" === r
              ? ".tp-thumbs-inner-wrapper"
              : ".tp-tabs-inner-wrapper",
          d = "tp-thumb" === r ? ".tp-thumb" : ".tp-tab",
          c = "tp-thumb" === r ? ".tp-thumb-image" : ".tp-tab-image",
          p = "tp-thumb" === r ? "rs-thumb" : "rs-tab";
        if (
          ((i.visibleAmount =
            i.visibleAmount > t[o].slideamount
              ? t[o].slideamount
              : i.visibleAmount),
          (i.sliderLayout = t[o].sliderLayout),
          0 === e.parent().find(s).length)
        ) {
          i.style = void 0 === i.style ? "" : i.style;
          var g =
            "<" +
            p +
            's style="opacity:0" class="rs-nav-element ' +
            r +
            "s " +
            (!0 === i.span ? "tp-span-wrapper" : "") +
            " " +
            i.position +
            " " +
            i.style +
            '"><rs-navmask class="' +
            r +
            '-mask"><' +
            p +
            's-wrap class="' +
            r +
            's-inner-wrapper" style="position:relative;"></' +
            p +
            "s-wrap></rs-navmask></" +
            p +
            "s>";
          "outer-top" === i.position
            ? e.parent().prepend(g)
            : "outer-bottom" === i.position
            ? e.after(g)
            : e.append(g),
            ("outer-left" !== i.position && "outer-right" !== i.position) ||
              tpGS.gsap.set(t[o].c, { overflow: "visible" }),
            (i.padding_top = parseInt(t[o].carousel.padding_top || 0, 0)),
            (i.padding_bottom = parseInt(t[o].carousel.padding_bottom || 0, 0)),
            ("outer-left" != i.position && "outer-right" != i.position) ||
              (t[o].outernav = !0);
        }
        var u = a.data("key"),
          f = e.parent().find(s),
          h = f.find(n),
          m = h.find(l),
          v =
            "horizontal" === i.direction
              ? i.width * i.visibleAmount + i.space * (i.visibleAmount - 1)
              : i.width,
          y =
            "horizontal" === i.direction
              ? i.height
              : i.height * i.visibleAmount + i.space * (i.visibleAmount - 1),
          b = i.tmp;
        void 0 !== t[o].thumbs[a.index()] &&
          jQuery.each(t[o].thumbs[a.index()].params, function (e, t) {
            b = b.replace(t.from, t.to);
          }),
          m.append(
            "<" +
              p +
              ' data-liindex="' +
              a.index() +
              '" data-key="' +
              u +
              '" class="justaddedthumb ' +
              r +
              '" style="width:' +
              i.width +
              "px;height:" +
              i.height +
              'px;">' +
              b +
              "<" +
              p +
              ">"
          );
        var w = f.find(".justaddedthumb"),
          x = f.find(d).length,
          k = w.outerWidth() + parseInt(void 0 === i.space ? 0 : i.space, 0),
          S = w.outerHeight() + parseInt(void 0 === i.space ? 0 : i.space, 0);
        void 0 !== t[o].thumbs[a.index()] &&
          w.find(c).css({
            backgroundImage: "url(" + t[o].thumbs[a.index()].src + ")",
          }),
          "vertical" === i.direction
            ? (w.css({ top: (x - 1) * S + "px", left: "0px" }),
              m.css({
                height: (x - 1) * S + w.outerHeight(),
                width: w.outerWidth(),
              }))
            : (w.css({ left: (x - 1) * k + "px", top: "0px" }),
              m.css({
                width: (x - 1) * k + w.outerWidth(),
                height: w.outerHeight(),
              })),
          f.data("maxw", v),
          f.data("maxh", y),
          f.data("wr_padding", i.wrapper_padding);
        var T =
          "outer-top" === i.position || "outer-bottom" === i.position
            ? "relative"
            : "absolute";
        h.css({
          maxWidth: v + "px",
          maxHeight: y + "px",
          overflow: "hidden",
          position: "relative",
        }),
          f.css({
            maxWidth: v + "px",
            maxHeight: y + "px",
            overflow: "visible",
            position: T,
            background: i.wrapper_color,
            padding: i.wrapper_padding + "px",
            boxSizing: "contet-box",
          }),
          w.click(function () {
            (t[o].sc_indicator = "bullet"),
              "carousel" === t[o].sliderType && (t[o].ctNavElement = !0);
            var i = e.parent().find(l).data("distance");
            (i = void 0 === i ? 0 : i),
              Math.abs(i) < 10 &&
                (e.revcallslidewithid(u),
                e.parent().find(s).removeClass("selected"),
                jQuery(this).addClass("selected"));
          }),
          w.removeClass("justaddedthumb"),
          f.addClass("nav-pos-hor-" + i.h_align),
          f.addClass("nav-pos-ver-" + i.v_align),
          f.addClass("nav-dir-" + i.direction),
          _(f, i, o),
          t.callContWidthManager(o);
      },
      k = function (e) {
        var i = t[e].cpar.find(".outer-top"),
          a = t[e].cpar.find(".outer-bottom");
        (t[e].top_outer = i.hasClass("tp-forcenotvisible")
          ? 0
          : i.outerHeight() || 0),
          (t[e].bottom_outer = a.hasClass("tp-forcenotvisible")
            ? 0
            : a.outerHeight() || 0);
      },
      S = function (e, t, i, a) {
        t > i || i > a
          ? e.addClass("tp-forcenotvisible")
          : e.removeClass("tp-forcenotvisible");
      };
  })(jQuery),
  (function (e) {
    "use strict";
    var t = jQuery.fn.revolution;
    jQuery.extend(!0, t, {
      preparePanZoom: function (e) {},
      stopPanZoom: function (e) {
        null != e.data("pztl") && e.data("pztl").pause();
      },
      startPanZoom: function (e, i, a, r, o) {
        var s = e.data(),
          n = e.find("rs-sbg"),
          l = n.data("lazyload") || n.data("src"),
          d =
            (s.owidth,
            s.oheight,
            "carousel" === t[i].sliderType
              ? t[i].carousel.justify
                ? t[i].carousel.slide_widths[
                    void 0 !== r
                      ? r
                      : void 0 === t[i].carousel.focused
                      ? 0
                      : t[i].carousel.focused
                  ]
                : t[i].carousel.slide_width
              : t[i].canvas.width()),
          c = t[i].canvas.height();
        if (void 0 !== s.panzoom && null !== s.panzoom) {
          if (
            (e.data("pztl") && e.data("pztl").kill(),
            (a = a || 0),
            0 == e.find(".rs-pzimg").length)
          ) {
            var p = n.data("mediafilter");
            (p = void 0 === p ? "" : p),
              e.append(
                '<rs-pzimg-wrap class="' +
                  p +
                  '" style="z-index:25;width:100%;height:100%;top:0px;left:0px;position:absolute;display:block"><img class="rs-pzimg" src="' +
                  l +
                  '" style="position:absolute;" width="' +
                  s.owidth +
                  '" height="' +
                  s.oheight +
                  '"></rs-pzimg-wrap>'
              ),
              e.data("pzimg", e.find(".rs-pzimg"));
          }
          var g = function (e, t, i, a, r, o, s) {
            var n = e * i,
              l = t * i,
              d = Math.abs(a - n),
              c = Math.abs(r - l),
              p = new Object();
            return (
              (p.l = (0 - o) * d),
              (p.r = p.l + n),
              (p.t = (0 - s) * c),
              (p.b = p.t + l),
              (p.h = o),
              (p.v = s),
              p
            );
          };
          null != e.data("pztl") &&
            (e.data("pztl").kill(), e.removeData("pztl"));
          var u = e.data("pzimg"),
            f = u.parent(),
            h = (function (e, t, i) {
              var a =
                  void 0 === i.panvalues
                    ? jQuery.extend(
                        !0,
                        {},
                        (function (e) {
                          var t = e.panzoom.split(";"),
                            i = {
                              duration: 10,
                              ease: "none",
                              scalestart: 1,
                              scaleend: 1,
                              rotatestart: 0.01,
                              rotateend: 0,
                              blurstart: 0,
                              blurend: 0,
                              offsetstart: "0/0",
                              offsetend: "0/0",
                            };
                          for (var a in t)
                            if (t.hasOwnProperty(a)) {
                              var r = t[a].split(":"),
                                o = r[0],
                                s = r[1];
                              switch (o) {
                                case "d":
                                  i.duration = parseInt(s, 0) / 1e3;
                                  break;
                                case "e":
                                  i.ease = s;
                                  break;
                                case "ss":
                                  i.scalestart = parseInt(s, 0) / 100;
                                  break;
                                case "se":
                                  i.scaleend = parseInt(s, 0) / 100;
                                  break;
                                case "rs":
                                  i.rotatestart = parseInt(s, 0);
                                  break;
                                case "re":
                                  i.rotateend = parseInt(s, 0);
                                  break;
                                case "bs":
                                  i.blurstart = parseInt(s, 0);
                                  break;
                                case "be":
                                  i.blurend = parseInt(s, 0);
                                  break;
                                case "os":
                                  i.offsetstart = s;
                                  break;
                                case "oe":
                                  i.offsetend = s;
                              }
                            }
                          return (
                            (i.offsetstart = i.offsetstart.split(
                              "index.html"
                            ) || [0, 0]),
                            (i.offsetend = i.offsetend.split("index.html") || [
                              0,
                              0,
                            ]),
                            (i.rotatestart =
                              0 === i.rotatestart ? 0.01 : i.rotatestart),
                            (e.panvalues = i),
                            (e.bgposition =
                              "center center" == e.bgposition
                                ? "50% 50%"
                                : e.bgposition),
                            i
                          );
                        })(i)
                      )
                    : jQuery.extend(!0, {}, i.panvalues),
                r = a.offsetstart,
                o = a.offsetend,
                s = {
                  start: {
                    width: e,
                    height: (e / i.owidth) * i.oheight,
                    rotation: a.rotatestart + "deg",
                    scale: a.scalestart,
                    transformOrigin: i.bgposition,
                  },
                  starto: {},
                  end: { rotation: a.rotateend + "deg", scale: a.scaleend },
                  endo: {},
                };
              a.scalestart,
                i.owidth,
                i.oheight,
                a.scaleend,
                i.owidth,
                i.oheight;
              if (s.start.height < t) {
                var n = t / s.start.height;
                (s.start.height = t), (s.start.width = s.start.width * n);
              }
              var l = (function (e, t, i, a) {
                var r = e.bgposition.split(" ") || "center center",
                  o =
                    "center" == r[0]
                      ? "50%"
                      : "left" == r[0] || "left" == r[1]
                      ? "0%"
                      : "right" == r[0] || "right" == r[1]
                      ? "100%"
                      : r[0],
                  s =
                    "center" == r[1]
                      ? "50%"
                      : "top" == r[0] || "top" == r[1]
                      ? "0%"
                      : "bottom" == r[0] || "bottom" == r[1]
                      ? "100%"
                      : r[1];
                (o = parseInt(o, 0) / 100 || 0),
                  (s = parseInt(s, 0) / 100 || 0);
                var n = new Object();
                return (
                  (n.start = g(
                    a.start.width,
                    a.start.height,
                    a.start.scale,
                    t,
                    i,
                    o,
                    s
                  )),
                  (n.end = g(
                    a.start.width,
                    a.start.height,
                    a.end.scale,
                    t,
                    i,
                    o,
                    s
                  )),
                  n
                );
              })(i, e, t, s);
              (r[0] = parseFloat(r[0]) + l.start.l),
                (o[0] = parseFloat(o[0]) + l.end.l),
                (r[1] = parseFloat(r[1]) + l.start.t),
                (o[1] = parseFloat(o[1]) + l.end.t);
              var d = l.start.r - l.start.l,
                c = l.start.b - l.start.t,
                p = l.end.r - l.end.l,
                u = l.end.b - l.end.t;
              return (
                (r[0] = r[0] > 0 ? 0 : d + r[0] < e ? e - d : r[0]),
                (o[0] = o[0] > 0 ? 0 : p + o[0] < e ? e - p : o[0]),
                (r[1] = r[1] > 0 ? 0 : c + r[1] < t ? t - c : r[1]),
                (o[1] = o[1] > 0 ? 0 : u + o[1] < t ? t - u : o[1]),
                (s.starto.x = r[0] + "px"),
                (s.starto.y = r[1] + "px"),
                (s.endo.x = o[0] + "px"),
                (s.endo.y = o[1] + "px"),
                (s.end.ease = s.endo.ease = a.ease),
                (s.end.force3D = s.endo.force3D = !0),
                s
              );
            })(d, c, s),
            m = tpGS.gsap.timeline();
          if (
            (m.pause(),
            (h.start.transformOrigin = "0% 0%"),
            (h.starto.transformOrigin = "0% 0%"),
            (s.panvalues.duration =
              NaN === s.panvalues.duration || void 0 === s.panvalues.duration
                ? 10
                : s.panvalues.duration),
            tpGS.gsap.set(u, { width: h.start.width, height: h.start.height }),
            delete h.start.width,
            delete h.start.height,
            o && tpGS.gsap.fromTo(u, 1, { autoAlpha: 0 }, { autoAlpha: 1 }),
            m.add(tpGS.gsap.fromTo(u, s.panvalues.duration, h.start, h.end), 0),
            m.add(
              tpGS.gsap.fromTo(f, s.panvalues.duration, h.starto, h.endo),
              0
            ),
            void 0 !== s.panvalues.blurstart &&
              void 0 !== s.panvalues.blurend &&
              (0 !== s.panvalues.blurstart || 0 !== s.panvalues.blurend))
          ) {
            var v = { a: s.panvalues.blurstart },
              y = { a: s.panvalues.blurend, ease: h.endo.ease },
              b = tpGS.gsap.to(v, s.panvalues.duration, y);
            b.eventCallback(
              "onUpdate",
              function (e) {
                tpGS.gsap.set(e, {
                  filter: "blur(" + v.a + "px)",
                  webkitFilter: "blur(" + v.a + "px)",
                });
              },
              [f]
            ),
              m.add(b, 0);
          }
          m.progress(a), !0 !== o && m.play(), e.data("pztl", m);
        }
      },
    });
  })(jQuery),
  (function (e) {
    "use strict";
    var t = jQuery.fn.revolution,
      i = t.is_mobile();
    jQuery.extend(!0, t, {
      checkForParallax: function (e) {
        var a = t[e].parallax;
        if (!a.done) {
          if (((a.done = !0), i && a.disable_onmobile)) return !1;
          if (
            ("3D" == a.type || "3d" == a.type) &&
            (tpGS.gsap.set(t[e].c, { overflow: a.ddd_overflow }),
            tpGS.gsap.set(t[e].canvas, { overflow: a.ddd_overflow }),
            "carousel" != t[e].sliderType && a.ddd_shadow)
          ) {
            var r = jQuery('<div class="dddwrappershadow"></div>');
            tpGS.gsap.set(r, {
              force3D: "auto",
              transformPerspective: 1600,
              transformOrigin: "50% 50%",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0,
            }),
              t[e].c.prepend(r);
          }
          t[e].slides.each(function () {
            n(jQuery(this));
          }),
            ("3D" == a.type || "3d" == a.type) &&
              t[e].c.find("rs-static-layers").length > 0 &&
              (tpGS.gsap.set(t[e].c.find("rs-static-layers"), {
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }),
              n(t[e].c.find("rs-static-layers"))),
            (a.pcontainers = []),
            (a.pcontainer_depths = []),
            (a.bgcontainers = []),
            (a.bgcontainer_depths = []),
            (a.speed = void 0 === a.speed ? 0 : parseInt(a.speed, 0)),
            (a.speedbg = void 0 === a.speedbg ? 0 : parseInt(a.speedbg, 0)),
            (a.speedls = void 0 === a.speedls ? 0 : parseInt(a.speedls, 0)),
            t[e].c
              .find("rs-slide rs-sbg-wrap, rs-slide rs-bgvideo")
              .each(function () {
                var i = jQuery(this),
                  r = i.data("parallax");
                void 0 !== (r = "on" == r || !0 === r ? 1 : r) &&
                  "off" !== r &&
                  !1 !== r &&
                  (a.bgcontainers.push(i.closest("rs-sbg-px")),
                  a.bgcontainer_depths.push(
                    t[e].parallax.levels[parseInt(r, 0) - 1] / 100
                  ));
              });
          for (var o = 1; o <= a.levels.length; o++)
            t[e].c.find(".rs-pxl-" + o).each(function () {
              var e = jQuery(this),
                t =
                  this.className.indexOf("rs-pxmask") >= 0
                    ? e.closest("rs-px-mask")
                    : e.closest(".rs-parallax-wrap");
              t.data("parallaxlevel", a.levels[o - 1]),
                t.addClass("tp-parallax-container"),
                a.pcontainers.push(t),
                a.pcontainer_depths.push(a.levels[o - 1]);
            });
          ("mouse" != a.type &&
            "mousescroll" != a.type &&
            "3D" != a.type &&
            "3d" != a.type) ||
            (t[e].c.mouseenter(function (i) {
              var a = t[e].c.offset().top,
                r = t[e].c.offset().left;
              void 0 !== t[e].pr_active_key &&
                (t.sA(t[e].slides[t[e].pr_active_key], "enterx", i.pageX - r),
                t.sA(t[e].slides[t[e].pr_active_key], "entery", i.pageY - a));
            }),
            t[e].c.on(
              "mousemove.hoverdir, mouseleave.hoverdir, trigger3dpath",
              function (i, r) {
                var o =
                  r && r.li ? r.li : jQuery(t[e].slides[t[e].pr_active_key]);
                if ("enterpoint" == a.origo) {
                  var s = t[e].c.offset().top,
                    n = t[e].c.offset().left;
                  null == o.data("enterx") && o.data("enterx", i.pageX - n),
                    null == o.data("entery") && o.data("entery", i.pageY - s);
                  var l = o.data("enterx") || i.pageX - n,
                    d = o.data("entery") || i.pageY - s,
                    c = l - (i.pageX - n),
                    p = d - (i.pageY - s),
                    g = a.speed / 1e3 || 0.4;
                } else
                  (s = t[e].c.offset().top),
                    (n = t[e].c.offset().left),
                    (c = t[e].conw / 2 - (i.pageX - n)),
                    (p = t[e].conh / 2 - (i.pageY - s)),
                    (g = a.speed / 1e3 || 3);
                "mouseleave" == i.type &&
                  ((c = a.ddd_lasth || 0), (p = a.ddd_lastv || 0), (g = 1.5));
                for (var u = 0; u < a.pcontainers.length; u++) {
                  var f = a.pcontainers[u],
                    h = a.pcontainer_depths[u],
                    m = "3D" == a.type || "3d" == a.type ? h / 200 : h / 100,
                    v = c * m,
                    y = p * m;
                  "mousescroll" == a.type
                    ? tpGS.gsap.to(f, g, {
                        force3D: "auto",
                        x: v,
                        ease: "power3.out",
                        overwrite: "all",
                      })
                    : tpGS.gsap.to(f, g, {
                        force3D: "auto",
                        x: v,
                        y: y,
                        ease: "power3.out",
                        overwrite: "all",
                      });
                }
                if ("3D" == a.type || "3d" == a.type) {
                  var b =
                    "rs-slide .dddwrapper, .dddwrappershadow, rs-slide .dddwrapper-layer, rs-static-layers .dddwrapper-layer";
                  "carousel" === t[e].sliderType &&
                    (b =
                      "rs-slide .dddwrapper, rs-slide .dddwrapper-layer, rs-static-layers .dddwrapper-layer"),
                    t[e].c.find(b).each(function () {
                      var r = jQuery(this),
                        o = a.levels[a.levels.length - 1] / 200,
                        s = c * o,
                        n = p * o,
                        l =
                          0 == t[e].conw
                            ? 0
                            : Math.round((c / t[e].conw) * o * 100) || 0,
                        d =
                          0 == t[e].conh
                            ? 0
                            : Math.round((p / t[e].conh) * o * 100) || 0,
                        u = r.closest("rs-slide"),
                        f = 0,
                        h = !1;
                      r.hasClass("dddwrapper-layer") &&
                        ((f = a.ddd_z_correction || 65), (h = !0)),
                        r.hasClass("dddwrapper-layer") && ((s = 0), (n = 0)),
                        u.index() === t[e].pr_active_key ||
                        "carousel" != t[e].sliderType
                          ? !a.ddd_bgfreeze || h
                            ? tpGS.gsap.to(r, g, {
                                rotationX: d,
                                rotationY: -l,
                                x: s,
                                z: f,
                                y: n,
                                ease: "power3.out",
                                overwrite: "all",
                              })
                            : tpGS.gsap.to(r, 0.5, {
                                force3D: "auto",
                                rotationY: 0,
                                rotationX: 0,
                                z: 0,
                                ease: "power3.out",
                                overwrite: "all",
                              })
                          : tpGS.gsap.to(r, 0.5, {
                              force3D: "auto",
                              rotationY: 0,
                              x: 0,
                              y: 0,
                              rotationX: 0,
                              z: 0,
                              ease: "power3.out",
                              overwrite: "all",
                            }),
                        "mouseleave" == i.type &&
                          tpGS.gsap.to(jQuery(this), 3.8, {
                            z: 0,
                            ease: "power3.out",
                          });
                    });
                }
              }
            ),
            i &&
              (window.ondeviceorientation = function (i) {
                var r = Math.round(i.beta || 0) - 70,
                  o = Math.round(i.gamma || 0),
                  s = jQuery(t[e].slides[t[e].pr_active_key]);
                if (jQuery(window).width() > jQuery(window).height()) {
                  var n = o;
                  (o = r), (r = n);
                }
                var l = t[e].c.width(),
                  d = t[e].c.height(),
                  c = (360 / l) * o,
                  p = (180 / d) * r,
                  g = a.speed / 1e3 || 3,
                  u = [];
                if (
                  (s.find(".tp-parallax-container").each(function (e) {
                    u.push(jQuery(this));
                  }),
                  t[e].c
                    .find("rs-static-layers .tp-parallax-container")
                    .each(function () {
                      u.push(jQuery(this));
                    }),
                  jQuery.each(u, function () {
                    var e = jQuery(this),
                      t = parseInt(e.data("parallaxlevel"), 0) / 100,
                      i = c * t * 2,
                      a = p * t * 4;
                    tpGS.gsap.to(e, g, {
                      force3D: "auto",
                      x: i,
                      y: a,
                      ease: "power3.out",
                      overwrite: "all",
                    });
                  }),
                  "3D" == a.type || "3d" == a.type)
                ) {
                  var f =
                    "rs-slide .dddwrapper, .dddwrappershadow, rs-slide .dddwrapper-layer, rs-static-layers .dddwrapper-layer";
                  "carousel" === t[e].sliderType &&
                    (f =
                      "rs-slide .dddwrapper, rs-slide .dddwrapper-layer, rs-static-layers .dddwrapper-layer"),
                    t[e].c.find(f).each(function () {
                      var r = jQuery(this),
                        o = a.levels[a.levels.length - 1] / 200,
                        s = c * o,
                        n = p * o * 3,
                        l =
                          0 == t[e].conw
                            ? 0
                            : Math.round((c / t[e].conw) * o * 500) || 0,
                        d =
                          0 == t[e].conh
                            ? 0
                            : Math.round((p / t[e].conh) * o * 700) || 0,
                        u = r.closest("rs-slide"),
                        f = 0,
                        h = !1;
                      r.hasClass("dddwrapper-layer") &&
                        ((f = a.ddd_z_correction || 65), (h = !0)),
                        r.hasClass("dddwrapper-layer") && ((s = 0), (n = 0)),
                        u.hasClass("active-rs-slide") ||
                        "carousel" != t[e].sliderType
                          ? !a.ddd_bgfreeze || h
                            ? tpGS.gsap.to(r, g, {
                                rotationX: d,
                                rotationY: -l,
                                x: s,
                                z: f,
                                y: n,
                                ease: "power3.out",
                                overwrite: "all",
                              })
                            : tpGS.gsap.to(r, 0.5, {
                                force3D: "auto",
                                rotationY: 0,
                                rotationX: 0,
                                z: 0,
                                ease: "power3.out",
                                overwrite: "all",
                              })
                          : tpGS.gsap.to(r, 0.5, {
                              force3D: "auto",
                              rotationY: 0,
                              z: 0,
                              x: 0,
                              y: 0,
                              rotationX: 0,
                              ease: "power3.out",
                              overwrite: "all",
                            }),
                        "mouseleave" == i.type &&
                          tpGS.gsap.to(jQuery(this), 3.8, {
                            z: 0,
                            ease: "power3.out",
                          });
                    });
                }
              }));
          var s = t[e].scrolleffect;
          s.set &&
            ((s.multiplicator_layers = parseFloat(s.multiplicator_layers)),
            (s.multiplicator = parseFloat(s.multiplicator))),
            void 0 !== s._L && 0 === s._L.length && (s._L = !1),
            void 0 !== s.bgs && 0 === s.bgs.length && (s.bgs = !1),
            t.scrollTicker(e);
        }
        function n(i) {
          if ("3D" == a.type || "3d" == a.type) {
            i
              .find("rs-sbg-wrap")
              .wrapAll(
                '<div class="dddwrapper" style="width:100%;height:100%;position:absolute;top:0px;left:0px;overflow:hidden"></div>'
              ),
              i
                .find(".rs-parallax-wrap")
                .wrapAll(
                  '<div class="dddwrapper-layer" style="width:100%;height:100%;position:absolute;top:0px;left:0px;z-index:5;overflow:' +
                    a.ddd_layer_overflow +
                    ';"></div>'
                ),
              i
                .find(".rs-pxl-tobggroup")
                .closest(".rs-parallax-wrap")
                .wrapAll(
                  '<div class="dddwrapper-layertobggroup" style="position:absolute;top:0px;left:0px;z-index:50;width:100%;height:100%"></div>'
                );
            var r = i.find(".dddwrapper"),
              o = i.find(".dddwrapper-layer");
            i.find(".dddwrapper-layertobggroup").appendTo(r),
              "carousel" == t[e].sliderType &&
                (a.ddd_shadow && r.addClass("dddwrappershadow"),
                tpGS.gsap.set(r, {
                  borderRadius: t[e].carousel.border_radius,
                })),
              tpGS.gsap.set(i, {
                overflow: "visible",
                transformStyle: "preserve-3d",
                perspective: 1600,
              }),
              tpGS.gsap.set(r, {
                force3D: "auto",
                transformOrigin: "50% 50%",
                transformStyle: "preserve-3d",
                transformPerspective: 1600,
              }),
              tpGS.gsap.set(o, {
                force3D: "auto",
                transformOrigin: "50% 50%",
                zIndex: 5,
                transformStyle: "flat",
                transformPerspective: 1600,
              }),
              tpGS.gsap.set(t[e].canvas, {
                transformStyle: "preserve-3d",
                transformPerspective: 1600,
              });
          }
        }
      },
      scrollTicker: function (e) {
        1 != t[e].scrollTicker &&
          ((t[e].scrollTicker = !0),
          i
            ? (tpGS.gsap.ticker.fps(150),
              tpGS.gsap.ticker.add(function () {
                t.scrollHandling(e);
              }))
            : document.addEventListener(
                "scroll",
                function (i) {
                  t.scrollHandling(e, !0);
                },
                { passive: !0 }
              )),
          t.scrollHandling(e, !0);
      },
      scrollHandling: function (e, a, r, o) {
        if (void 0 !== t[e]) {
          if (
            ((t[e].lastwindowheight =
              t[e].lastwindowheight || window.innerHeight),
            (t[e].conh =
              0 === t[e].conh || void 0 === t[e].conh
                ? t[e].infullscreenmode
                  ? t[e].minHeight
                  : t[e].c.height()
                : t[e].conh),
            t[e].lastscrolltop == window.scrollY &&
              !t[e].duringslidechange &&
              !a)
          )
            return !1;
          tpGS.gsap.delayedCall(
            0.2,
            function (e, i) {
              t[e].lastscrolltop = i;
            },
            [e, window.scrollY]
          );
          var s =
              void 0 !== t[e].topc
                ? t[e].topc[0].getBoundingClientRect()
                : 0 === t[e].c.height()
                ? t[e].cpar[0].getBoundingClientRect()
                : t[e].c[0].getBoundingClientRect(),
            n = t[e].viewPort,
            l = t[e].parallax,
            d =
              t[e].slides[
                void 0 === t[e].pr_active_key ? 0 : t[e].pr_active_key
              ];
          s.hheight =
            0 === s.height
              ? 0 === t[e].c.height()
                ? t[e].cpar.height()
                : t[e].c.height()
              : s.height;
          var c =
              s.top < 0 || s.hheight > t[e].lastwindowheight
                ? s.top / s.hheight
                : s.bottom > t[e].lastwindowheight
                ? (s.bottom - t[e].lastwindowheight) / s.hheight
                : 0,
            p = t[e].fixedOnTop
              ? Math.min(1, Math.max(0, window.scrollY / t[e].lastwindowheight))
              : Math.min(
                  1,
                  Math.max(
                    0,
                    1 -
                      (s.top + s.hheight) / (s.hheight + t[e].lastwindowheight)
                  )
                ),
            g =
              (s.top >= 0 && s.top <= t[e].lastwindowheight) ||
              (s.top <= 0 && s.bottom >= 0) ||
              (s.top <= 0 && s.bottom >= 0);
          (t[e].scrollproc = c),
            t.callBackHandling && t.callBackHandling(e, "parallax", "start");
          var u = Math.max(0, 1 - Math.abs(c));
          if (
            (g
              ? t[e].sbtimeline.fixed
                ? ((t[e].curheight =
                    void 0 === t[e].curheight
                      ? t[e].cpar.height()
                      : t[e].curheight),
                  void 0 === t[e].sbtimeline.rest &&
                    t.updateFixedScrollTimes(e),
                  s.top >= 0 && s.top <= t[e].lastwindowheight
                    ? ((p =
                        (t[e].sbtimeline.fixStart *
                          (1 - s.top / t[e].lastwindowheight)) /
                        1e3),
                      t[e].topc.removeClass("rs-fixedscrollon"),
                      tpGS.gsap.set(t[e].cpar, { top: 0 }))
                    : s.top <= 0 && s.bottom >= t[e].curheight
                    ? (t[e].topc.addClass("rs-fixedscrollon"),
                      tpGS.gsap.set(t[e].cpar, { top: 0 }),
                      (p =
                        (t[e].sbtimeline.fixStart +
                          t[e].sbtimeline.time *
                            (Math.abs(s.top) / (s.hheight - t[e].curheight))) /
                        1e3))
                    : (tpGS.gsap.set(t[e].cpar, {
                        top: s.height - t[e].curheight,
                      }),
                      t[e].topc.removeClass("rs-fixedscrollon"),
                      (p =
                        (t[e].sbtimeline.fixEnd +
                          t[e].sbtimeline.rest *
                            (1 - s.bottom / t[e].curheight)) /
                        1e3)))
                : (p = (t[e].duration * p) / 1e3)
              : t[e].sbtimeline.fixed &&
                (t[e].topc.removeClass("rs-fixedscrollon"),
                tpGS.gsap.set(t[e].cpar, { top: 0 })),
            n.enable &&
              (void 0 === t[e].viewPort.vaType && t.updateVisibleArea(e),
              ("%" === n.vaType[t[e].level] &&
                n.visible_area[t[e].level] <= u) ||
              ("px" === n.vaType[t[e].level] &&
                ((s.top <= 0 && s.bottom >= t[e].lastwindowheight) ||
                  (s.top >= 0 && s.bottom <= t[e].lastwindowheight) ||
                  (s.top >= 0 &&
                    s.top <
                      t[e].lastwindowheight - n.visible_area[t[e].level]) ||
                  (s.bottom >= n.visible_area[t[e].level] &&
                    s.bottom < t[e].lastwindowheight)))
                ? t[e].inviewport ||
                  ((t[e].inviewport = !0), t.enterInViewPort(e))
                : t[e].inviewport &&
                  ((t[e].inviewport = !1), t.leaveViewPort(e))),
            g && void 0 !== d && void 0 !== t.gA(d, "key") && !0 !== o)
          )
            for (var f in t[e].sbas[t.gA(d, "key")])
              void 0 === t[e]._L[f] ||
                void 0 === t[e]._L[f].timeline ||
                (1 != t[e]._L[f].animationonscroll &&
                  "true" != t[e]._L[f].animationonscroll) ||
                (void 0 !== t[e]._L[f].scrollBasedOffset &&
                  (p += t[e]._L[f].scrollBasedOffset),
                p > 0 && t[e]._L[f].animOnScrollRepeats < 5
                  ? (t[e]._L[f].timeline.time(p),
                    t[e]._L[f].animOnScrollRepeats++)
                  : tpGS.gsap.to(t[e]._L[f].timeline, t[e].sbtimeline.speed, {
                      time: p,
                      ease: t[e].sbtimeline.ease,
                    }));
          if (i && l.disable_onmobile) return !1;
          if ("3d" != l.type && "3D" != l.type) {
            if (
              ("scroll" == l.type || "mousescroll" == l.type) &&
              l.pcontainers
            )
              for (var h = 0; h < l.pcontainers.length; h++)
                if (l.pcontainers[h].length > 0) {
                  var m = l.pcontainers[h],
                    v = l.pcontainer_depths[h] / 100,
                    y = Math.round(c * (-v * t[e].conh) * 10) / 10 || 0,
                    b = void 0 !== r ? r : l.speedls / 1e3 || 0;
                  m.data("parallaxoffset", y),
                    tpGS.gsap.to(m, b, {
                      overwrite: "auto",
                      force3D: "auto",
                      y: y,
                    });
                }
            if (l.bgcontainers)
              for (h = 0; h < l.bgcontainers.length; h++) {
                var _ = l.bgcontainers[h];
                (y = c * (-l.bgcontainer_depths[h] * t[e].conh) || 0),
                  (b = void 0 !== r ? r : l.speedbg / 1e3 || 0.015);
                (b =
                  void 0 !== t[e].parallax.lastBGY &&
                  0 === b &&
                  Math.abs(y - t[e].parallax.lastBGY) > 50
                    ? 0.15
                    : b),
                  tpGS.gsap.to(_, b, {
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    backfaceVisibility: "hidden",
                    force3D: "true",
                    y: y + "px",
                  }),
                  (t[e].parallax.lastBGY = y);
              }
          }
          var w = t[e].scrolleffect;
          if (w.set && (!i || !1 === w.disable_onmobile)) {
            var x = Math.abs(c) - w.tilt / 100;
            if (((x = x < 0 ? 0 : x), !1 !== w._L)) {
              var k = 1 - x * w.multiplicator_layers,
                S = { force3D: "true" };
              if (
                ("top" == w.direction && c >= 0 && (k = 1),
                "bottom" == w.direction && c <= 0 && (k = 1),
                (k = k > 1 ? 1 : k < 0 ? 0 : k),
                w.fade && (S.opacity = k),
                w.scale)
              ) {
                var T = k;
                S.scale = 1 - T + 1;
              }
              if (w.blur) {
                var L = (1 - k) * w.maxblur;
                (S["-webkit-filter"] = "blur(" + L + "px)"),
                  (S.filter = "blur(" + L + "px)");
              }
              if (w.grayscale) {
                var R = "grayscale(" + 100 * (1 - k) + "%)";
                (S["-webkit-filter"] =
                  void 0 === S["-webkit-filter"]
                    ? R
                    : S["-webkit-filter"] + " " + R),
                  (S.filter = void 0 === S.filter ? R : S.filter + " " + R);
              }
              tpGS.gsap.set(w._L, S);
            }
            if (!1 !== w.bgs) {
              (k = 1 - x * w.multiplicator),
                (S = { backfaceVisibility: "hidden", force3D: "true" });
              for (var A in ("top" == w.direction && c >= 0 && (k = 1),
              "bottom" == w.direction && c <= 0 && (k = 1),
              (k = k > 1 ? 1 : k < 0 ? 0 : k),
              w.bgs))
                if (w.bgs.hasOwnProperty(A)) {
                  if ((w.bgs[A].fade && (S.opacity = k), w.bgs[A].blur)) {
                    L = (1 - k) * w.maxblur;
                    (S["-webkit-filter"] = "blur(" + L + "px)"),
                      (S.filter = "blur(" + L + "px)");
                  }
                  if (w.bgs[A].grayscale) {
                    R = "grayscale(" + 100 * (1 - k) + "%)";
                    (S["-webkit-filter"] =
                      void 0 === S["-webkit-filter"]
                        ? R
                        : S["-webkit-filter"] + " " + R),
                      (S.filter = void 0 === S.filter ? R : S.filter + " " + R);
                  }
                  tpGS.gsap.set(w.bgs[A].c, S);
                }
            }
          }
          t.callBackHandling && t.callBackHandling(e, "parallax", "end");
        }
      },
    });
  })(jQuery),
  (function (e) {
    "use strict";
    var t = jQuery.fn.revolution;
    jQuery.extend(!0, t, {
      animateSlide: function (e) {
        return a(e);
      },
    });
    var i = function (e, t) {
        var i;
        return void 0 !==
          (i = jQuery.isArray(e)
            ? e.length >= t
              ? e[t]
              : e[e.length - 1]
            : e) && jQuery.isNumeric(i)
          ? parseInt(e, 0)
          : i;
      },
      a = function (e) {
        var a = e.id,
          n =
            "arrow" == t[a].sc_indicator
              ? void 0 === t[a].sc_indicator_dir
                ? t[a].sdir
                : t[a].sc_indicator_dir
              : t[a].sdir,
          l =
            !0 === e.recall
              ? jQuery.extend(!0, {}, t[a].lastSliderTransition)
              : (function (e, i, a) {
                  var r = "power1.in",
                    o = "power1.out",
                    s = "power1.inOut",
                    n = "power2.in",
                    l = "power2.out",
                    d = "power2.inOut",
                    c = "power3.inOut",
                    p = [
                      0,
                      1,
                      2,
                      3,
                      4,
                      5,
                      6,
                      7,
                      8,
                      9,
                      10,
                      11,
                      12,
                      13,
                      14,
                      15,
                      28,
                      29,
                      30,
                      31,
                      32,
                      33,
                      34,
                      35,
                      36,
                      37,
                      38,
                      39,
                      40,
                      41,
                      42,
                      43,
                      44,
                      45,
                    ],
                    g = [17, 18, 19, 20, 21, 22, 23, 24, 25, 27],
                    u = 0,
                    f = 1,
                    h = 0,
                    m = [
                      ["boxslide", 0, 0, 10, "box", !1, null, 0, o, o, 1e3, 6],
                      [
                        "boxrandomrotate",
                        0,
                        1,
                        10,
                        "box",
                        !1,
                        null,
                        60,
                        o,
                        o,
                        1e3,
                        6,
                      ],
                      ["boxfade", 1, 0, 10, "box", !1, null, 1, s, s, 1e3, 5],
                      [
                        "slotslide-horizontal",
                        2,
                        0,
                        0,
                        "horizontal",
                        !0,
                        !1,
                        2,
                        d,
                        d,
                        1e3,
                        3,
                      ],
                      [
                        "slotslide-vertical",
                        3,
                        0,
                        0,
                        "vertical",
                        !0,
                        !1,
                        3,
                        d,
                        d,
                        1e3,
                        3,
                      ],
                      [
                        "curtain-1",
                        4,
                        3,
                        0,
                        "horizontal",
                        !0,
                        !0,
                        4,
                        o,
                        o,
                        900,
                        5,
                      ],
                      [
                        "curtain-2",
                        5,
                        3,
                        0,
                        "horizontal",
                        !0,
                        !0,
                        5,
                        o,
                        o,
                        900,
                        5,
                      ],
                      [
                        "curtain-3",
                        6,
                        3,
                        25,
                        "horizontal",
                        !0,
                        !0,
                        6,
                        o,
                        o,
                        900,
                        5,
                      ],
                      [
                        "slotzoom-horizontal",
                        7,
                        0,
                        0,
                        "horizontal",
                        !0,
                        !0,
                        7,
                        o,
                        o,
                        1e3,
                        7,
                      ],
                      [
                        "slotzoom-vertical",
                        8,
                        0,
                        0,
                        "vertical",
                        !0,
                        !0,
                        8,
                        l,
                        l,
                        1e3,
                        8,
                      ],
                      [
                        "slotzoom-mixed",
                        8,
                        1,
                        0,
                        "vertical",
                        !0,
                        !0,
                        59,
                        l,
                        l,
                        1e3,
                        8,
                      ],
                      [
                        "slotfade-horizontal",
                        9,
                        0,
                        0,
                        "horizontal",
                        !0,
                        null,
                        9,
                        d,
                        d,
                        1500,
                        10,
                      ],
                      [
                        "slotfade-vertical",
                        10,
                        0,
                        0,
                        "vertical",
                        !0,
                        null,
                        10,
                        d,
                        d,
                        1500,
                        10,
                      ],
                      [
                        "crossfade-horizontal",
                        9,
                        0,
                        0,
                        "horizontal",
                        !0,
                        null,
                        9,
                        d,
                        d,
                        0,
                        10,
                      ],
                      [
                        "crossfade-vertical",
                        10,
                        0,
                        0,
                        "vertical",
                        !0,
                        null,
                        10,
                        d,
                        d,
                        0,
                        10,
                      ],
                      [
                        "fade",
                        11,
                        0,
                        1,
                        "horizontal",
                        !0,
                        null,
                        11,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "crossfade",
                        11,
                        1,
                        1,
                        "horizontal",
                        !0,
                        null,
                        11,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "fadethroughdark",
                        11,
                        2,
                        1,
                        "horizontal",
                        !0,
                        null,
                        11,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "fadethroughlight",
                        11,
                        3,
                        1,
                        "horizontal",
                        !0,
                        null,
                        11,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "fadethroughtransparent",
                        11,
                        4,
                        1,
                        "horizontal",
                        !0,
                        null,
                        11,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "slideleft",
                        12,
                        0,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        12,
                        c,
                        c,
                        1e3,
                        1,
                      ],
                      [
                        "slideup",
                        13,
                        0,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        13,
                        c,
                        c,
                        1e3,
                        1,
                      ],
                      [
                        "slidedown",
                        14,
                        0,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        14,
                        c,
                        c,
                        1e3,
                        1,
                      ],
                      [
                        "slideright",
                        15,
                        0,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        15,
                        c,
                        c,
                        1e3,
                        1,
                      ],
                      [
                        "slideoverleft",
                        12,
                        7,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        12,
                        c,
                        c,
                        1e3,
                        1,
                      ],
                      [
                        "slideoverup",
                        13,
                        7,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        13,
                        c,
                        c,
                        1e3,
                        1,
                      ],
                      [
                        "slideoverdown",
                        14,
                        7,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        14,
                        c,
                        c,
                        1e3,
                        1,
                      ],
                      [
                        "slideoverright",
                        15,
                        7,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        15,
                        c,
                        c,
                        1e3,
                        1,
                      ],
                      [
                        "slideremoveleft",
                        12,
                        8,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        12,
                        c,
                        c,
                        1e3,
                        1,
                      ],
                      [
                        "slideremoveup",
                        13,
                        8,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        13,
                        c,
                        c,
                        1e3,
                        1,
                      ],
                      [
                        "slideremovedown",
                        14,
                        8,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        14,
                        c,
                        c,
                        1e3,
                        1,
                      ],
                      [
                        "slideremoveright",
                        15,
                        8,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        15,
                        c,
                        c,
                        1e3,
                        1,
                      ],
                      [
                        "papercut",
                        16,
                        0,
                        0,
                        "vertical",
                        null,
                        !0,
                        16,
                        c,
                        c,
                        1e3,
                        2,
                      ],
                      [
                        "3dcurtain-horizontal",
                        17,
                        0,
                        20,
                        "vertical",
                        !0,
                        !0,
                        17,
                        s,
                        s,
                        2e3,
                        7,
                      ],
                      [
                        "3dcurtain-vertical",
                        18,
                        0,
                        10,
                        "horizontal",
                        !0,
                        !0,
                        18,
                        s,
                        s,
                        2e3,
                        7,
                      ],
                      [
                        "cubic",
                        19,
                        0,
                        20,
                        "horizontal",
                        !1,
                        !0,
                        19,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "cube",
                        19,
                        0,
                        20,
                        "horizontal",
                        !1,
                        !0,
                        20,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "flyin",
                        20,
                        0,
                        4,
                        "vertical",
                        !1,
                        !0,
                        21,
                        "power3.out",
                        c,
                        1e3,
                        1,
                      ],
                      [
                        "turnoff",
                        21,
                        0,
                        1,
                        "horizontal",
                        !1,
                        !0,
                        22,
                        c,
                        c,
                        1e3,
                        1,
                      ],
                      [
                        "incube",
                        22,
                        0,
                        20,
                        "horizontal",
                        !1,
                        !0,
                        23,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "cubic-horizontal",
                        23,
                        0,
                        20,
                        "vertical",
                        !1,
                        !0,
                        24,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "cube-horizontal",
                        23,
                        0,
                        20,
                        "vertical",
                        !1,
                        !0,
                        25,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "incube-horizontal",
                        24,
                        0,
                        20,
                        "vertical",
                        !1,
                        !0,
                        26,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "turnoff-vertical",
                        25,
                        0,
                        1,
                        "horizontal",
                        !1,
                        !0,
                        27,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "fadefromright",
                        12,
                        1,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        28,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "fadefromleft",
                        15,
                        1,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        29,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "fadefromtop",
                        14,
                        1,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        30,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "fadefrombottom",
                        13,
                        1,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        31,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "fadetoleftfadefromright",
                        12,
                        2,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        32,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "fadetorightfadefromleft",
                        15,
                        2,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        33,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "fadetobottomfadefromtop",
                        14,
                        2,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        34,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "fadetotopfadefrombottom",
                        13,
                        2,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        35,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "parallaxtoright",
                        15,
                        3,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        36,
                        d,
                        d,
                        1500,
                        1,
                      ],
                      [
                        "parallaxtoleft",
                        12,
                        3,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        37,
                        d,
                        d,
                        1500,
                        1,
                      ],
                      [
                        "parallaxtotop",
                        14,
                        3,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        38,
                        d,
                        d,
                        1500,
                        1,
                      ],
                      [
                        "parallaxtobottom",
                        13,
                        3,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        39,
                        d,
                        d,
                        1500,
                        1,
                      ],
                      [
                        "scaledownfromright",
                        12,
                        4,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        40,
                        d,
                        n,
                        1e3,
                        1,
                      ],
                      [
                        "scaledownfromleft",
                        15,
                        4,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        41,
                        d,
                        n,
                        1e3,
                        1,
                      ],
                      [
                        "scaledownfromtop",
                        14,
                        4,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        42,
                        d,
                        n,
                        1e3,
                        1,
                      ],
                      [
                        "scaledownfrombottom",
                        13,
                        4,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        43,
                        d,
                        n,
                        1e3,
                        1,
                      ],
                      [
                        "zoomout",
                        13,
                        5,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        44,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "zoomin",
                        13,
                        6,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        45,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "slidingoverlayup",
                        27,
                        0,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        47,
                        s,
                        o,
                        2e3,
                        1,
                      ],
                      [
                        "slidingoverlaydown",
                        28,
                        0,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        48,
                        s,
                        o,
                        2e3,
                        1,
                      ],
                      [
                        "slidingoverlayright",
                        30,
                        0,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        49,
                        s,
                        o,
                        2e3,
                        1,
                      ],
                      [
                        "slidingoverlayleft",
                        29,
                        0,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        50,
                        s,
                        o,
                        2e3,
                        1,
                      ],
                      [
                        "parallaxcirclesup",
                        31,
                        0,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        51,
                        d,
                        r,
                        1500,
                        1,
                      ],
                      [
                        "parallaxcirclesdown",
                        32,
                        0,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        52,
                        d,
                        r,
                        1500,
                        1,
                      ],
                      [
                        "parallaxcirclesright",
                        33,
                        0,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        53,
                        d,
                        r,
                        1500,
                        1,
                      ],
                      [
                        "parallaxcirclesleft",
                        34,
                        0,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        54,
                        d,
                        r,
                        1500,
                        1,
                      ],
                      [
                        "notransition",
                        26,
                        0,
                        1,
                        "horizontal",
                        !0,
                        null,
                        46,
                        d,
                        n,
                        1e3,
                        1,
                      ],
                      [
                        "parallaxright",
                        15,
                        3,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        55,
                        d,
                        n,
                        1500,
                        1,
                      ],
                      [
                        "parallaxleft",
                        12,
                        3,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        56,
                        d,
                        n,
                        1500,
                        1,
                      ],
                      [
                        "parallaxup",
                        14,
                        3,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        57,
                        d,
                        r,
                        1500,
                        1,
                      ],
                      [
                        "parallaxdown",
                        13,
                        3,
                        1,
                        "horizontal",
                        !0,
                        !0,
                        58,
                        d,
                        r,
                        1500,
                        1,
                      ],
                      [
                        "grayscale",
                        11,
                        5,
                        1,
                        "horizontal",
                        !0,
                        null,
                        11,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "grayscalecross",
                        11,
                        6,
                        1,
                        "horizontal",
                        !0,
                        null,
                        11,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "brightness",
                        11,
                        7,
                        1,
                        "horizontal",
                        !0,
                        null,
                        11,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "brightnesscross",
                        11,
                        8,
                        1,
                        "horizontal",
                        !0,
                        null,
                        11,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "blurlight",
                        11,
                        9,
                        1,
                        "horizontal",
                        !0,
                        null,
                        11,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "blurlightcross",
                        11,
                        10,
                        1,
                        "horizontal",
                        !0,
                        null,
                        11,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "blurstrong",
                        11,
                        9,
                        1,
                        "horizontal",
                        !0,
                        null,
                        11,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                      [
                        "blurstrongcross",
                        11,
                        10,
                        1,
                        "horizontal",
                        !0,
                        null,
                        11,
                        d,
                        d,
                        1e3,
                        1,
                      ],
                    ];
                  return (
                    (t[e].duringslidechange = !0),
                    jQuery.each(
                      [
                        "parallaxcircles",
                        "slidingoverlay",
                        "slide",
                        "slideover",
                        "slideremove",
                        "parallax",
                        "parralaxto",
                      ],
                      function (e, t) {
                        i == t + "horizontal" &&
                          (i = 1 != a ? t + "left" : t + "right"),
                          i == t + "vertical" &&
                            (i = 1 != a ? t + "up" : t + "down");
                      }
                    ),
                    "random" == i
                      ? (i = Math.min(
                          Math.round(Math.random() * (m.length - 1)),
                          m.length - 1
                        ))
                      : "random-static" == i
                      ? (i =
                          p[
                            Math.min(
                              Math.round(Math.random() * p.length - 1),
                              p.length - 1
                            )
                          ])
                      : "random-premium" == i &&
                        (i =
                          g[
                            Math.min(
                              Math.round(Math.random() * g.length - 1),
                              g.length - 1
                            )
                          ]),
                    1 == t[e].isJoomla &&
                      null != window.MooTools &&
                      -1 !=
                        [
                          12,
                          13,
                          14,
                          15,
                          16,
                          28,
                          29,
                          30,
                          31,
                          32,
                          33,
                          34,
                          35,
                          36,
                          37,
                          38,
                          39,
                          40,
                          41,
                          42,
                          43,
                          44,
                          45,
                        ].indexOf(i) &&
                      (i =
                        g[
                          Math.max(
                            0,
                            Math.min(
                              g.length - 1,
                              Math.round(Math.random() * (g.length - 2)) + 1
                            )
                          )
                        ]),
                    jQuery.each(m, function (e, t) {
                      (t[0] != i && t[7] != i) ||
                        ((u = t[1]), (f = t[2]), (h = e));
                    }),
                    {
                      nTR: (u = Math.max(0, Math.min(30, u))),
                      TR: m[h],
                      trC: f,
                    }
                  );
                })(a, e.animation.transition[e.ntrid], n),
          d =
            t[a].pr_next_bg &&
            void 0 !== t[a].pr_next_bg.data("panzoom") &&
            (l.nTR < 11 ||
              17 == l.nTR ||
              18 === l.nTR ||
              (l.nTR >= 27 && l.nTR <= 30))
              ? 11
              : l.nTR;
        !0 !== e.recall
          ? ((t[a].lastSliderAnimation = jQuery.extend(!0, {}, e.animation)),
            (t[a].lastSliderTransition = jQuery.extend(!0, {}, l)))
          : (e.animation = jQuery.extend(!0, {}, t[a].lastSliderAnimation));
        var c = !0 === e.recall ? l.ntrid : e.ntrid || 0,
          p = i(e.animation.masterspeed, c);
        (p =
          (p =
            "default" === p || "d" === p
              ? l.TR[10]
              : "random" === p
              ? Math.round(1e3 * Math.random() + 300)
              : null != p
              ? parseInt(p, 0)
              : l.TR[10]) > t[a].duration
            ? t[a].duration
            : p),
          (t[a].rotate = i(e.animation.rotate, c)),
          (t[a].rotate =
            null == t[a].rotate ||
            "default" == t[a].rotate ||
            "d" == t[a].rotate
              ? 0
              : 999 == t[a].rotate || "random" == t[a].rotate
              ? Math.round(360 * Math.random())
              : t[a].rotate),
          (t[a].rotate = window._rs_ie || window._rs_ie9 ? 0 : t[a].rotate),
          (d < 11 ||
            16 === d ||
            17 === d ||
            18 === d ||
            (l.nTR >= 27 && l.nTR <= 30)) &&
            ((t[a].slots = i(e.animation.slotamount, c)),
            (t[a].slots =
              null == t[a].slots || "default" == t[a].slots || "d" == t[a].slots
                ? l.TR[11]
                : "random" == t[a].slots
                ? Math.round(12 * Math.random() + 4)
                : t[a].slots),
            (t[a].slots =
              t[a].slots < 1
                ? "boxslide" == l.TR[0]
                  ? Math.round(6 * Math.random() + 3)
                  : "boxslide" == l.TR[0] || "flyin" == l.TR[0]
                  ? Math.round(4 * Math.random() + 1)
                  : t[a].slots
                : t[a].slots),
            (t[a].slots =
              (4 == d || 5 == d || 6 == d) && t[a].slots < 3 ? 3 : t[a].slots),
            (t[a].slots =
              0 != l.TR[3] ? Math.min(t[a].slots, l.TR[3]) : t[a].slots),
            (t[a].slots =
              9 == d
                ? t[a].width / t[a].slots
                : 10 == d
                ? t[a].height / t[a].slots
                : t[a].slots),
            (t[a].slots =
              jQuery.inArray(d, [19, 20, 21, 22, 23, 24, 25, 27]) >= 0
                ? 1
                : t[a].slots),
            (t[a].slots =
              (3 != d && 8 != d && 10 != d) || "vertical" !== l.TR[4]
                ? t[a].slots
                : t[a].slots + 2),
            null != l.TR[6] && s(t[a].pr_active_bg, a, l.TR[6], l.TR[4]),
            null != l.TR[5] && s(t[a].pr_next_bg, a, l.TR[5], l.TR[4]),
            t[a].mtl.delay(0.075));
        var g = 7 === d || 16 === d || 8 === d || 17 === d || 18 === d ? 0 : 1,
          u = d < 11 || 17 === d || 18 === d ? 0 : 1;
        if (void 0 !== t[a].pr_next_bg[0]) {
          var f = t[a].pr_next_bg.find("rs-sbg");
          void 0 !== f[0] &&
            t[a].mtl.add(
              tpGS.gsap.set(f, {
                scale: 1,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                z: 0,
                top: 0,
                left: 0,
                x: 0,
                y: 0,
                clearProps: "filter, transform",
                opacity: u,
              }),
              0
            ),
            t[a].mtl.add(
              tpGS.gsap.set(t[a].pr_next_bg, {
                transformOrigin: "50% 50% 0",
                transformPerspective: 600,
                scale: 1,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                z: 0,
                autoAlpha: 1,
                top: 0,
                left: 0,
                x: 0,
                y: 0,
                clearProps: "filter, transform",
              }),
              0
            ),
            t[a].mtl.add(
              tpGS.gsap.set(t[a].pr_next_bg.parent(), {
                backgroundColor: "transparent",
              }),
              0
            );
        }
        if (void 0 !== t[a].pr_active_bg[0]) {
          var h = t[a].pr_active_bg.find("rs-sbg");
          void 0 !== h[0] &&
            t[a].mtl.add(
              tpGS.gsap.set(h, {
                scale: 1,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                z: 0,
                top: 0,
                left: 0,
                x: 0,
                y: 0,
                clearProps: "filter, transform",
                opacity: g,
              }),
              0
            ),
            t[a].mtl.add(
              tpGS.gsap.set(t[a].pr_active_bg, {
                transformOrigin: "50% 50% 0",
                transformPerspective: 600,
                scale: 1,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                z: 0,
                autoAlpha: 1,
                top: 0,
                left: 0,
                x: 0,
                y: 0,
                clearProps: "filter, transform",
              }),
              0
            ),
            t[a].mtl.add(
              tpGS.gsap.set(t[a].pr_active_bg.parent(), {
                backgroundColor: "transparent",
              }),
              0
            );
        }
        var m = i(e.animation.easein, c),
          v = i(e.animation.easeout, c);
        if (
          ((m =
            "default" === m || "d" === m
              ? l.TR[8] || "power2.inOut"
              : m || l.TR[8] || "power2.inOut"),
          (v =
            "default" === v || "d" === v
              ? l.TR[9] || "power2.inOut"
              : v || l.TR[9] || "power2.inOut"),
          d >= 31)
        ) {
          var y = {
            canvas: t[a].pr_next_bg[0].getElementsByClassName("bgcanvas")[0],
          };
          if (
            ((y.ctx = y.canvas.getContext("2d")),
            (y.oBG_next = t[a].pr_next_bg[0].getElementsByTagName("rs-sbg")[0]),
            (y.img_next = t.getLoadObj(a, t.gA(y.oBG_next, "src-rs-ref"))),
            (y.col_next = t.gA(y.oBG_next, "bgcolor")),
            void 0 !== t[a].pr_active_bg[0] &&
              ((y.oBG_act = t[a].pr_active_bg[0].getElementsByTagName(
                "rs-sbg"
              )[0]),
              (y.img_act = t.getLoadObj(a, t.gA(y.oBG_act, "src-rs-ref"))),
              (y.col_act = t.gA(y.oBG_act, "bgcolor"))),
            y.ctx.clearRect(0, 0, y.canvas.width, y.canvas.height),
            (y.canvas.width = t[a].width),
            (y.canvas.height = t[a].height),
            (y.canvas.style.background = "transparent"),
            (y.canvas.style.display = "block"),
            (y.oBG_next.style.display = "none"),
            void 0 !== y.col_next &&
              y.col_next.indexOf("gradient") >= 0 &&
              (y.col_next = "transparent"),
            void 0 !== y.col_act &&
              y.col_act.indexOf("gradient") >= 0 &&
              (y.col_act = "transparent"),
            31 === d)
          ) {
            for (
              var b =
                  "transparent" !== y.col_next && void 0 !== y.col_next
                    ? { x: 0, y: 0, width: t[a].width, height: t[a].height }
                    : r(
                        "contain" === y.oBG_next.style.backgroundSize,
                        t[a].width,
                        t[a].height,
                        y.img_next.width,
                        y.img_next.height
                      ),
                _ =
                  void 0 === y.oBG_act
                    ? void 0
                    : "transparent" !== y.col_act && void 0 !== y.col_act
                    ? { x: 0, y: 0, width: t[a].width, height: t[a].height }
                    : r(
                        "contain" === y.oBG_act.style.backgroundSize,
                        t[a].width,
                        t[a].height,
                        y.img_act.width,
                        y.img_act.height
                      ),
                w = t[a].width / t[a].slots,
                x = w / 2,
                k = t[a].height,
                S = [],
                T = 0;
              T < t[a].slots + 1;
              T++
            )
              S.push({ mt: k, it: k / 4, ml: 0, o: 2 });
            t[a].mtl.add(
              tpGS.gsap.staggerTo(
                S,
                (2 * p) / 1e3,
                {
                  mt: 0,
                  it: 0,
                  ml: x,
                  o: 0,
                  ease: "power3.out",
                  onUpdate: function () {
                    var e = 0;
                    y.ctx.clearRect(0, 0, y.canvas.width, y.canvas.height);
                    for (var i = 0; i < t[a].slots + 1; i++) {
                      var r = S[i].mt,
                        s = S[i].ml,
                        n = S[i].it,
                        l = S[i].mt - k,
                        d = S[i].ml + x,
                        c = S[i].it - k / 4;
                      o({
                        ctx: y.ctx,
                        poly: [
                          [e - x + s, 0 + r],
                          [e + x + 1 + s, 0 + r],
                          [e + 1 + s, k + r],
                          [e - w + s, k + r],
                        ],
                        bg: {
                          overlay: "rgba(0,0,0," + S[i].o + ")",
                          img: y.img_next.img,
                          col: y.col_next,
                          offsetx: b.x,
                          offsety: b.y + n,
                          width: b.width,
                          height: b.height,
                        },
                      }),
                        void 0 !== y.col_act &&
                          ((y.oBG_act.style.display = "none"),
                          o({
                            ctx: y.ctx,
                            poly: [
                              [e - x + d, 0 + l],
                              [e + x + 1 + d, 0 + l],
                              [e + 1 + d, k + l],
                              [e - w + d, k + l],
                            ],
                            bg: {
                              overlay: "rgba(0,0,0," + (1 - S[i].o) + ")",
                              img: y.img_act.img,
                              col: y.col_act,
                              offsetx: _.x,
                              offsety: _.y + c,
                              width: _.width,
                              height: _.height,
                            },
                          })),
                        (e += w);
                    }
                  },
                },
                0.2,
                function () {
                  y.ctx.clearRect(0, 0, y.canvas.width, y.canvas.height),
                    (y.canvas.style.display = "none"),
                    (y.oBG_next.style.display = "block");
                }
              ),
              0
            );
          }
        }
        if (0 == d) {
          var L = Math.ceil(t[a].height / t[a].sloth),
            R = 0;
          t[a].pr_next_bg.find(".slotslide").each(function (e) {
            (R = ++R === L ? 0 : R),
              (t[a].rotate = 1 === l.trC ? 45 : t[a].rotate),
              t[a].mtl.add(
                tpGS.gsap.from(this, p / 2e3, {
                  opacity: 0,
                  transformStyle: "flat",
                  transformPerspective: 600,
                  scale: 0,
                  rotationZ:
                    0 !== t[a].rotate
                      ? Math.random() * t[a].rotate - t[a].rotate / 2
                      : 0,
                  force3D: "auto",
                  ease: m,
                }),
                (10 * e + 30 * R) / 3e3
              );
          });
        } else if (1 == d)
          t[a].pr_next_bg.find(".slotslide").each(function (e) {
            t[a].mtl.add(
              tpGS.gsap.from(this, (Math.random() * p + 300) / 1e3, {
                autoAlpha: 0,
                force3D: "auto",
                rotation: t[a].rotate,
                ease: m,
              }),
              (500 * Math.random() + 200) / 1e3
            );
          });
        else if (2 == d || 3 == d)
          t[a].pr_active_bg.find(".slotslide").each(function () {
            t[a].mtl.add(
              tpGS.gsap.to(this, p / 1e3, {
                top: 3 === d ? t[a].sloth : 0,
                left: 2 === d ? t[a].slotw : 0,
                ease: m,
                force3D: "auto",
                rotation: 0 - t[a].rotate,
              }),
              0
            );
          }),
            t[a].pr_next_bg.find(".slotslide").each(function () {
              t[a].mtl.add(
                tpGS.gsap.from(this, p / 1e3, {
                  top: 3 == d ? (1 === n ? 0 - t[a].sloth : t[a].sloth) : 0,
                  left: 2 == d ? (1 === n ? 0 - t[a].slotw : t[a].slotw) : 0,
                  ease: m,
                  force3D: "auto",
                  rotation: t[a].rotate,
                }),
                0
              );
            });
        else if (4 == d || 5 == d || 6 == d) {
          var A = tpGS.gsap.timeline(),
            I = p / 1e3 - p / 1e3 / t[a].slots;
          (t[a].slots -= t[a].slots % 2 == 1 ? 1 : 0),
            t[a].pr_active_bg.find(".slotslide").each(function (e) {
              var i = 6 !== d ? e : e > t[a].slots / 2 ? t[a].slots - e : e;
              A.add(
                tpGS.gsap.to(this, I, {
                  transformPerspective: 600,
                  force3D: "auto",
                  top: 1 !== n ? t[a].height : -t[a].height,
                  opacity: 0.75,
                  rotation: t[a].rotate,
                  ease: m,
                  delay:
                    ((5 !== d ? i : t[a].slots - i) * (I / t[a].slots)) /
                    (6 === d ? 1.3 : 1),
                }),
                0
              ),
                t[a].mtl.add(A, 0);
            }),
            t[a].pr_next_bg.find(".slotslide").each(function (e) {
              var i = 6 !== d ? e : e > t[a].slots / 2 ? t[a].slots - e : e;
              A.add(
                tpGS.gsap.from(this, I, {
                  top: 1 == n ? t[a].height : -t[a].height,
                  opacity: 0.75,
                  rotation: t[a].rotate,
                  force3D: "auto",
                  ease: v,
                  delay:
                    ((5 !== d ? i : t[a].slots - i) * (I / t[a].slots)) /
                    (6 === d ? 1.3 : 1),
                }),
                0
              ),
                t[a].mtl.add(A, 0);
            });
        } else if (7 == d || 8 == d)
          (p = Math.min(t[a].duration || p, p)),
            t[a].pr_active_bg.find(".slotslide").each(function (e) {
              var i = e > t[a].slots / 2 ? t[a].slots - e : e;
              t[a].mtl.add(
                tpGS.gsap.to(this.getElementsByTagName("div"), p / 1e3, {
                  x: 8 === d && 0 === l.trC ? 0 : (i * t[a].slotw) / 3,
                  y: 8 === d && 0 === l.trC ? (i * t[a].sloth) / 3 : 0,
                  ease: m,
                  transformPerspective: 600,
                  force3D: "auto",
                  filter: "blur(2px)",
                  scale: 1.2,
                  opacity: 0,
                }),
                0
              );
            }),
            t[a].pr_next_bg.find(".slotslide").each(function (e) {
              var i = e > t[a].slots / 2 ? t[a].slots - e : e;
              t[a].mtl.add(
                tpGS.gsap.fromTo(
                  this.getElementsByTagName("div"),
                  p / 1e3,
                  {
                    x: 8 === d && 0 === l.trC ? 0 : 0 - (i * t[a].slotw) / 3,
                    y: 8 === d && 0 === l.trC ? 0 - (i * t[a].sloth) / 3 : 0,
                    filter: "blur(2px)",
                    opacity: 0,
                    transformPerspective: 600,
                    scale: 1.2,
                  },
                  {
                    x: 0,
                    y: 0,
                    ease: v,
                    force3D: "auto",
                    scale: 1,
                    filter: "blur(0px)",
                    opacity: 1,
                    rotation: 0,
                  }
                ),
                0
              );
            });
        else if (9 == d || 10 == d) {
          var z = t[a].pr_next_bg[0].getElementsByClassName("slotslide"),
            C = p - p / 1.8;
          for (T = 0; T < z.length; T++)
            t[a].mtl.add(
              tpGS.gsap.fromTo(
                z[T],
                (p - T * (C / t[a].slots)) / 1e3,
                { opacity: 0, force3D: "auto", transformPerspective: 600 },
                {
                  opacity: 1,
                  ease: "none",
                  delay: (T * (C / t[a].slots)) / 1e3,
                }
              ),
              0
            );
        } else if (11 == d) {
          l.trC = Math.min(12, l.trC);
          var O =
            2 == l.trC ? "#000000" : 3 == l.trC ? "#ffffff" : "transparent";
          switch (l.trC) {
            case 0:
              void 0 !== t[a].pr_next_bg &&
                t[a].pr_next_bg.length > 0 &&
                t[a].mtl.add(
                  tpGS.gsap.fromTo(
                    t[a].pr_next_bg,
                    p / 1e3,
                    { autoAlpha: 0 },
                    { autoAlpha: 1, force3D: "auto", ease: m }
                  ),
                  0
                );
              break;
            case 1:
              void 0 !== t[a].pr_next_bg &&
                t[a].pr_next_bg.length > 0 &&
                t[a].mtl.add(
                  tpGS.gsap.fromTo(
                    t[a].pr_next_bg,
                    p / 1e3,
                    { autoAlpha: 0 },
                    { autoAlpha: 1, force3D: "auto", ease: m }
                  ),
                  0
                ),
                t[a].mtl.add(
                  tpGS.gsap.fromTo(
                    t[a].pr_active_bg,
                    p / 1e3,
                    { autoAlpha: 1 },
                    { autoAlpha: 0, force3D: "auto", ease: m }
                  ),
                  0
                );
              break;
            case 2:
            case 3:
            case 4:
              t[a].mtl.add(
                tpGS.gsap.set(t[a].pr_active_bg.parent(), {
                  backgroundColor: O,
                  force3D: "auto",
                }),
                0
              ),
                t[a].mtl.add(
                  tpGS.gsap.set(t[a].pr_next_bg.parent(), {
                    backgroundColor: "transparent",
                    force3D: "auto",
                  }),
                  0
                ),
                void 0 !== t[a].pr_active_bg &&
                  t[a].pr_active_bg.length > 0 &&
                  t[a].mtl.add(
                    tpGS.gsap.to(t[a].pr_active_bg, p / 2e3, {
                      autoAlpha: 0,
                      force3D: "auto",
                      ease: m,
                    }),
                    0
                  ),
                void 0 !== t[a].pr_next_bg &&
                  t[a].pr_next_bg.length > 0 &&
                  t[a].mtl.add(
                    tpGS.gsap.fromTo(
                      t[a].pr_next_bg,
                      p / 2e3,
                      { autoAlpha: 0 },
                      { autoAlpha: 1, force3D: "auto", ease: m }
                    ),
                    p / 2e3
                  );
              break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
              var P =
                  "blur(" +
                  (jQuery.inArray(l.trC, [9, 10]) >= 0
                    ? 5
                    : jQuery.inArray(l.trC, [11, 12]) >= 0
                    ? 10
                    : 0) +
                  "px) grayscale(" +
                  (jQuery.inArray(l.trC, [5, 6, 7, 8]) >= 0 ? 100 : 0) +
                  "%) brightness(" +
                  (jQuery.inArray(l.trC, [7, 8]) >= 0 ? 300 : 0) +
                  "%)",
                G = "blur(0px) grayscale(0%) brightness(100%)";
              void 0 !== t[a].pr_next_bg &&
                t[a].pr_next_bg.length > 0 &&
                t[a].mtl.add(
                  tpGS.gsap.fromTo(
                    t[a].pr_next_bg,
                    p / 1e3,
                    { autoAlpha: 0, filter: P, "-webkit-filter": P },
                    {
                      autoAlpha: 1,
                      filter: G,
                      "-webkit-filter": G,
                      force3D: "auto",
                      ease: m,
                    }
                  ),
                  0
                ),
                jQuery.inArray(l.trC, [6, 8, 10]) >= 0 &&
                  t[a].mtl.add(
                    tpGS.gsap.fromTo(
                      t[a].pr_active_bg,
                      p / 1e3,
                      { autoAlpha: 1, filter: G, "-webkit-filter": G },
                      {
                        autoAlpha: 0,
                        force3D: "auto",
                        ease: m,
                        filter: P,
                        "-webkit-filter": P,
                      }
                    ),
                    0
                  );
          }
          t[a].mtl.add(
            tpGS.gsap.set(t[a].pr_next_bg.find("rs-sbg"), { autoAlpha: 1 }),
            0
          ),
            void 0 !== t[a].pr_active_bg[0] &&
              t[a].mtl.add(
                tpGS.gsap.set(t[a].pr_active_bg.find("rs-sbg"), {
                  autoAlpha: 1,
                }),
                0
              );
        } else if (12 == d || 13 == d || 14 == d || 15 == d) {
          var j = 3 == l.trC ? p / 1300 : p / 1e3,
            M = p / 1e3,
            H = 5 == l.trC || 6 == l.trC ? 0 : t[a].width,
            N = 5 == l.trC || 6 == l.trC ? 0 : t[a].currentSlideHeight,
            D = 12 == d ? H : 15 == d ? 0 - H : 0,
            Q =
              13 == d
                ? 5 == l.trC || 6 == l.trC
                  ? 0
                  : t[a].height
                : 14 == d
                ? 5 == l.trC || 6 == l.trC
                  ? 0
                  : 0 - t[a].height
                : 0,
            B = 1 == l.trC || 2 == l.trC || 5 == l.trC || 6 == l.trC ? 0 : 1,
            W = 4 == l.trC || 5 == l.trC ? 0.6 : 6 == l.trC ? 1.4 : 1,
            F = 5 == l.trC ? 1.4 : 6 == l.trC ? 0.6 : 1;
          if (
            ((7 != l.trC && 4 != l.trC) || ((H = 0), (N = 0)),
            8 == l.trC
              ? (t[a].mtl.add(
                  tpGS.gsap.set(t[a].pr_active_slide, { zIndex: 20 }),
                  0
                ),
                t[a].mtl.add(
                  tpGS.gsap.set(t[a].pr_next_slide, { zIndex: 15 }),
                  0
                ),
                t[a].mtl.add(
                  tpGS.gsap.to(t[a].pr_next_bg, 0.01, {
                    overflow: "hidden",
                    left: 0,
                    top: 0,
                    x: 0,
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                    rotation: 0,
                    overwrite: !0,
                    immediateRender: !0,
                    force3D: "auto",
                  }),
                  0
                ))
              : (void 0 !== t[a].pr_active_slide &&
                  t[a].pr_active_slide.length > 0 &&
                  t[a].mtl.add(
                    tpGS.gsap.set(t[a].pr_active_slide, { zIndex: 15 }),
                    0
                  ),
                void 0 !== t[a].pr_next_slide &&
                  t[a].pr_next_slide.length > 0 &&
                  t[a].mtl.add(
                    tpGS.gsap.set(t[a].pr_next_slide, { zIndex: 20 }),
                    0
                  ),
                void 0 !== t[a].pr_next_bg &&
                  t[a].pr_next_bg.length > 0 &&
                  t[a].mtl.add(
                    tpGS.gsap.from(t[a].pr_next_bg, j, {
                      left: D,
                      top: Q,
                      overflow: "hidden",
                      scale: F,
                      autoAlpha: B,
                      rotation: t[a].rotate,
                      ease: m,
                      force3D: "auto",
                    }),
                    0
                  )),
            1 != l.trC)
          )
            switch (d) {
              case 12:
                void 0 !== t[a].pr_active_bg &&
                  t[a].pr_active_bg.length > 0 &&
                  t[a].mtl.add(
                    tpGS.gsap.to(t[a].pr_active_bg, M, {
                      left: 0 - H + "px",
                      overflow: "hidden",
                      force3D: "auto",
                      scale: W,
                      autoAlpha: B,
                      rotation: t[a].rotate,
                      ease: v,
                    }),
                    0
                  );
                break;
              case 15:
                void 0 !== t[a].pr_active_bg &&
                  t[a].pr_active_bg.length > 0 &&
                  t[a].mtl.add(
                    tpGS.gsap.to(t[a].pr_active_bg, M, {
                      left: H + "px",
                      overflow: "hidden",
                      force3D: "auto",
                      scale: W,
                      autoAlpha: B,
                      rotation: t[a].rotate,
                      ease: v,
                    }),
                    0
                  );
                break;
              case 13:
                void 0 !== t[a].pr_active_bg &&
                  t[a].pr_active_bg.length > 0 &&
                  t[a].mtl.add(
                    tpGS.gsap.to(t[a].pr_active_bg, M, {
                      top: 0 - N + "px",
                      overflow: "hidden",
                      force3D: "auto",
                      scale: W,
                      autoAlpha: B,
                      rotation: t[a].rotate,
                      ease: v,
                    }),
                    0
                  );
                break;
              case 14:
                void 0 !== t[a].pr_active_bg &&
                  t[a].pr_active_bg.length > 0 &&
                  t[a].mtl.add(
                    tpGS.gsap.to(t[a].pr_active_bg, M, {
                      top: N + "px",
                      overflow: "hidden",
                      force3D: "auto",
                      scale: W,
                      autoAlpha: B,
                      rotation: t[a].rotate,
                      ease: v,
                    }),
                    0
                  );
            }
        } else if (16 == d) {
          var Y = 1 === n ? "80% 50% 0" : "20%  50% 0";
          t[a].mtl.add(tpGS.gsap.set(t[a].pr_active_slide, { zIndex: 20 }), 0),
            t[a].mtl.add(tpGS.gsap.set(t[a].pr_next_slide, { zIndex: 15 }), 0),
            t[a].pr_active_bg.find(".slotslide").each(function (e) {
              t[a].mtl.add(
                tpGS.gsap.fromTo(
                  this,
                  p / 1e3,
                  { left: 0, rotationZ: 0, opacity: 1, top: 0, z: 0, scale: 1 },
                  {
                    opacity: 1,
                    left:
                      1 === n
                        ? 0 == e
                          ? -t[a].width / 1.6
                          : -t[a].width / 1.8
                        : 0 === e
                        ? t[a].width / 1.6
                        : t[a].width / 1.8,
                    rotationZ:
                      1 === n ? (0 === e ? -35 : 25) : 0 === e ? 25 : -35,
                    z: 0,
                    top: 0 == e ? "-120%" : "140%",
                    scale: 0.8,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: Y,
                    delay: 0,
                    ease: m,
                  }
                ),
                0
              ),
                t[a].mtl.add(
                  tpGS.gsap.fromTo(
                    this,
                    p / 2e3,
                    { opacity: 1 },
                    { opacity: 0, delay: p / 2e3 }
                  ),
                  0
                );
            }),
            void 0 !== t[a].pr_next_bg &&
              t[a].pr_next_bg.length > 0 &&
              t[a].mtl.add(
                tpGS.gsap.fromTo(
                  t[a].pr_next_bg,
                  p / 1e3 - p / 7e3,
                  {
                    x: 100 * Math.random() - 50,
                    opacity: 1,
                    scale: 0.9,
                    rotationZ: 10 * Math.random() - 5,
                  },
                  {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    rotationZ: 0,
                    ease: m,
                    force3D: "auto",
                    delay: p / 7e3,
                  }
                ),
                0
              );
        } else if (17 == d || 18 == d)
          t[a].pr_next_bg.find(".slotslide").each(function (e) {
            t[a].mtl.add(
              tpGS.gsap.fromTo(
                this,
                p / t[a].slots / 1e3,
                {
                  opacity: 0,
                  top: 0,
                  left: 0,
                  rotationY: 17 === d ? 0 : 90,
                  scale: 1,
                  rotationX: 17 === d ? -90 : 0,
                  force3D: "auto",
                  transformPerspective: 600,
                  transformOrigin: 17 === d ? "top center" : "center left",
                },
                {
                  opacity: 1,
                  top: 0,
                  left: 0,
                  rotationX: 0,
                  rotationY: 0,
                  force3D: "auto",
                  ease: v,
                  delay: e * (p / t[a].slots / 2e3),
                }
              ),
              0
            );
          }),
            t[a].pr_active_bg.find(".slotslide").each(function (e) {
              t[a].mtl.add(
                tpGS.gsap.fromTo(
                  this,
                  p / t[a].slots / 1e3,
                  {
                    opacity: 1,
                    rotationY: 0,
                    scale: 1,
                    rotationX: 0,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin:
                      17 === d ? "bottom center" : "center right",
                  },
                  {
                    opacity: 0,
                    rotationX: 17 === d ? 110 : 0,
                    rotationY: 17 === d ? 0 : 110,
                    force3D: "auto",
                    ease: m,
                    delay: e * (p / t[a].slots / 2e3),
                  }
                ),
                0
              );
            });
        else if (19 == d || 22 == d || 23 == d || 24 == d) {
          t[a].mtl.add(tpGS.gsap.set(t[a].pr_active_slide, { zIndex: 20 }), 0),
            t[a].mtl.add(tpGS.gsap.set(t[a].pr_next_slide, { zIndex: 10 }), 0);
          Y =
            19 === d
              ? "center center -" + t[a].height / 2
              : 22 === d
              ? "center center " + t[a].height / 2
              : 23 === d
              ? "center center -" + t[a].width / 2
              : "center center " + t[a].width / 2;
          tpGS.gsap.set(t[a].c, {
            transformStyle: "flat",
            backfaceVisibility: "hidden",
            transformPerspective: 600,
          }),
            void 0 !== t[a].pr_next_bg &&
              t[a].pr_next_bg.length > 0 &&
              t[a].mtl.add(
                tpGS.gsap.fromTo(
                  t[a].pr_next_bg,
                  p / 1e3,
                  {
                    rotationX: 19 == d || 22 === d ? (1 == n ? -90 : 90) : 0,
                    rotationY: 23 == d || 24 === d ? (1 == n ? -90 : 90) : 0,
                    left: 0,
                    top: 0,
                    scale: 1,
                    x: 0,
                    y: 0,
                    overflow: "hidden",
                    autoAlpha: 1,
                    transformStyle: "flat",
                    backfaceVisibility: "hidden",
                    force3D: "auto",
                    transformPerspective: 1200,
                    transformOrigin: Y,
                  },
                  {
                    overflow: "hidden",
                    left: 0,
                    autoAlpha: 1,
                    rotationX: 0,
                    rotationY: 0,
                    top: 0,
                    scale: 1,
                    delay: 0,
                    ease: m,
                    transformStyle: "flat",
                    backfaceVisibility: "hidden",
                    force3D: "auto",
                    transformPerspective: 1200,
                    transformOrigin: Y,
                  }
                ),
                0
              ),
            void 0 !== t[a].pr_next_bg &&
              t[a].pr_next_bg.length > 0 &&
              t[a].mtl.add(
                tpGS.gsap.fromTo(
                  t[a].pr_next_bg,
                  p / 2e3,
                  { z: 19 == d || 23 === d ? -200 : 0 },
                  {
                    z: 19 === d || 23 === d ? 0 : -200,
                    ease: "power3.inOut",
                    delay: 19 === d || 23 === d ? p / 2e3 : 0,
                  }
                ),
                0
              ),
            (22 !== d && 24 !== d) ||
              t[a].mtl.add(
                tpGS.gsap.fromTo(
                  [t[a].pr_active_bg, t[a].pr_next_bg],
                  p / 2e3,
                  { z: -200 },
                  { z: 0, ease: "power2.in", delay: p / 2e3 }
                ),
                0
              ),
            t[a].mtl.add(
              tpGS.gsap.fromTo(
                t[a].pr_active_bg,
                p / 2e3,
                { z: 0 },
                { z: -200, ease: "power3.inOut", delay: 0, force3D: "auto" }
              ),
              0
            ),
            (19 !== d && 23 !== d) ||
              t[a].mtl.add(
                tpGS.gsap.fromTo(
                  t[a].pr_active_bg,
                  p / 2e3,
                  { autoAlpha: 1 },
                  {
                    autoAlpha: 0,
                    ease: "none",
                    delay: p / 2e3,
                    force3D: "auto",
                  }
                ),
                0
              ),
            t[a].mtl.add(
              tpGS.gsap.fromTo(
                t[a].pr_active_bg,
                p / 1e3,
                {
                  overflow: "hidden",
                  rotationX: 0,
                  rotationY: 0,
                  rotationZ: 0,
                  top: 0,
                  left: 0,
                  scale: 1,
                  transformStyle: "flat",
                  backfaceVisibility: "hidden",
                  force3D: "auto",
                  transformPerspective: 1200,
                  transformOrigin: Y,
                },
                {
                  rotationX: 19 === d || 22 === d ? (1 == n ? 90 : -90) : 0,
                  rotationY: 23 === d || 24 === d ? (1 == n ? 90 : -90) : 0,
                  overflow: "hidden",
                  top: 0,
                  scale: 1,
                  delay: 0,
                  force3D: "auto",
                  ease: m,
                  transformStyle: "flat",
                  backfaceVisibility: "hidden",
                  transformPerspective: 1200,
                  transformOrigin: Y,
                }
              ),
              0
            );
        } else if (20 == d) {
          Y = 1 === n ? "20% " : "80% ";
          (Y += "60% -50%"),
            void 0 !== t[a].pr_next_bg &&
              t[a].pr_next_bg.length > 0 &&
              t[a].mtl.add(
                tpGS.gsap.fromTo(
                  t[a].pr_next_bg,
                  p / 1e3,
                  {
                    left: 1 === n ? -t[a].width : t[a].width,
                    rotationX: 20,
                    z: -t[a].width,
                    autoAlpha: 0,
                    top: 0,
                    scale: 1,
                    force3D: "auto",
                    transformPerspective: 600,
                    transformOrigin: Y,
                    rotationY: 1 === n ? 50 : -50,
                  },
                  {
                    left: 0,
                    rotationX: 0,
                    autoAlpha: 1,
                    top: 0,
                    z: 0,
                    scale: 1,
                    rotationY: 0,
                    delay: 0,
                    ease: m,
                  }
                ),
                0
              ),
            (Y = 1 != n ? "20% " : "80% "),
            (Y += "60% -50%"),
            t[a].mtl.add(
              tpGS.gsap.fromTo(
                t[a].pr_active_bg,
                p / 1e3,
                {
                  autoAlpha: 1,
                  rotationX: 0,
                  top: 0,
                  z: 0,
                  scale: 1,
                  left: 0,
                  force3D: "auto",
                  transformPerspective: 600,
                  transformOrigin: Y,
                  rotationY: 0,
                },
                {
                  autoAlpha: 1,
                  rotationX: 20,
                  top: 0,
                  z: -t[a].width,
                  left: 1 != n ? -t[a].width / 1.2 : t[a].width / 1.2,
                  force3D: "auto",
                  rotationY: 1 === n ? -50 : 50,
                  delay: 0,
                  ease: "power2.inOut",
                }
              ),
              0
            );
        } else if (21 == d || 25 == d) {
          var E = 25 === d ? t[a].rotate : 1 === n ? 90 : -90,
            V = 25 === d ? (1 === n ? -90 : 90) : t[a].rotate;
          Y =
            1 === n
              ? 25 === d
                ? "center top 0"
                : "left center 0"
              : 25 === d
              ? "center bottom 0"
              : "right center 0";
          void 0 !== t[a].pr_next_bg &&
            t[a].pr_next_bg.length > 0 &&
            t[a].mtl.add(
              tpGS.gsap.fromTo(
                t[a].pr_next_bg,
                p / 1e3,
                {
                  transformStyle: "flat",
                  rotationX: V,
                  top: 0,
                  left: 0,
                  autoAlpha: 0,
                  force3D: "auto",
                  transformPerspective: 1200,
                  transformOrigin: Y,
                  rotationY: E,
                },
                { autoAlpha: 1, rotationX: 0, rotationY: 0, ease: m }
              ),
              0
            ),
            (Y =
              1 === n
                ? 25 === d
                  ? "center bottom 0"
                  : "right center 0"
                : 25 === d
                ? "center top 0"
                : "left center 0"),
            (E = 25 !== d ? -E : E),
            (V = 25 !== d ? V : -V),
            t[a].mtl.add(
              tpGS.gsap.fromTo(
                t[a].pr_active_bg,
                p / 1e3,
                {
                  rotationX: 0,
                  rotationY: 0,
                  transformStyle: "flat",
                  transformPerspective: 1200,
                  force3D: "auto",
                },
                {
                  immediateRender: !0,
                  rotationX: V,
                  transformOrigin: Y,
                  rotationY: E,
                  ease: v,
                }
              ),
              0
            );
        } else if (26 == d)
          (p = 0),
            void 0 !== t[a].pr_next_bg &&
              t[a].pr_next_bg.length > 0 &&
              (t[a].mtl.add(
                tpGS.gsap.fromTo(
                  t[a].pr_next_bg,
                  0.001,
                  { autoAlpha: 0 },
                  { autoAlpha: 1, force3D: "auto", ease: m }
                ),
                0
              ),
              t[a].mtl.add(
                tpGS.gsap.set(t[a].pr_next_bg.find("rs-sbg"), { autoAlpha: 1 }),
                0
              )),
            void 0 !== t[a].pr_active_bg &&
              t[a].pr_active_bg.length > 0 &&
              (t[a].mtl.add(
                tpGS.gsap.to(t[a].pr_active_bg, 0.001, {
                  autoAlpha: 0,
                  force3D: "auto",
                  ease: m,
                }),
                0
              ),
              t[a].mtl.add(
                tpGS.gsap.set(t[a].pr_active_bg.find("rs-sbg"), {
                  autoAlpha: 1,
                }),
                0
              ));
        else if (27 == d || 28 == d || 29 == d || 30 == d) {
          var X = t[a].pr_next_bg.find(".slot"),
            Z = 27 == d || 29 == d ? "-100%" : "100%",
            q = 27 == d || 29 == d ? "100%" : "-100%",
            U = 27 == d || 29 == d ? "-80%" : "80%",
            J = 27 == d || 29 == d ? "80%" : "-80%",
            K = 27 == d || 29 == d ? "10%" : "-10%",
            $ = { overwrite: "all" },
            ee = { autoAlpha: 0, zIndex: 1, force3D: "auto", ease: m },
            te = {
              position: "inherit",
              autoAlpha: 0,
              overwrite: "all",
              zIndex: 1,
            },
            ie = { autoAlpha: 1, force3D: "auto", ease: v },
            ae = { overwrite: "all", zIndex: 2, opacity: 1, autoAlpha: 1 },
            re = { autoAlpha: 1, force3D: "auto", overwrite: "all", ease: m },
            oe = { overwrite: "all", zIndex: 2, autoAlpha: 1 },
            se = { autoAlpha: 1, force3D: "auto", ease: m },
            ne = 1 == (27 == d || 28 == d ? 1 : 2) ? "y" : "x";
          ($[ne] = "0%"),
            (ee[ne] = Z),
            (te[ne] = K),
            (ie[ne] = 0),
            (ae[ne] = q),
            (re[ne] = Z),
            (oe[ne] = U),
            (se[ne] = J),
            X.append(
              '<span style="background-color:rgba(0,0,0,0.6);width:100%;height:100%;position:absolute;top:0px;left:0px;display:block;z-index:2"></span>'
            ),
            void 0 !== t[a].pr_active_bg &&
              t[a].pr_active_bg.length > 0 &&
              t[a].mtl.add(
                tpGS.gsap.fromTo(t[a].pr_active_bg, p / 1e3, $, ee),
                0
              ),
            void 0 !== t[a].pr_next_bg &&
              t[a].pr_next_bg.length > 0 &&
              t[a].mtl.add(
                tpGS.gsap.fromTo(
                  t[a].pr_next_bg.find("rs-sbg"),
                  p / 2e3,
                  te,
                  ie
                ),
                p / 2e3
              ),
            t[a].mtl.add(tpGS.gsap.fromTo(X, p / 1e3, ae, re), 0),
            t[a].mtl.add(
              tpGS.gsap.fromTo(X.find(".slotslide div"), p / 1e3, oe, se),
              0
            );
        }
      },
      r = function (e, t, i, a, r) {
        var o = a / r,
          s = t / i,
          n = t,
          l = i;
        return (
          (e ? o > s : o < s) ? (l = n / o) : (n = l * o),
          { width: n, height: l, x: (t - n) / 2, y: (i - l) / 2 }
        );
      },
      o = function (e) {
        e.ctx.save(),
          e.ctx.beginPath(),
          e.ctx.moveTo(e.poly[0][0], e.poly[0][1]);
        for (var t = 1; t < e.poly.length; t++)
          e.ctx.lineTo(e.poly[t][0], e.poly[t][1]);
        e.ctx.closePath(),
          (e.ctx.lineWidth = 2),
          e.ctx.stroke(),
          e.ctx.clip(),
          void 0 !== e.bg.img &&
            e.ctx.drawImage(
              e.bg.img,
              e.bg.offsetx,
              e.bg.offsety,
              e.bg.width,
              e.bg.height
            ),
          "transparent" !== e.bg.col &&
            void 0 !== e.bg.col &&
            ((e.ctx.fillStyle = e.bg.col),
            e.ctx.fillRect(
              e.bg.offsetx,
              e.bg.offsety,
              e.bg.width,
              e.bg.height
            )),
          void 0 !== e.bg.overlay &&
            ((e.ctx.fillStyle = e.bg.overlay),
            e.ctx.fillRect(
              e.bg.offsetx,
              e.bg.offsety,
              e.bg.width,
              e.bg.height
            )),
          e.ctx.restore();
      },
      s = function (e, i, a, r) {
        var o = e.find("rs-sbg"),
          s = o.data("mediafilter"),
          n = e.data("zoomstart"),
          l = e.data("rotationstart");
        null != o.data("currotate") && (l = o.data("currotate")),
          null != o.data("curscale") && "box" == r
            ? (n = 100 * o.data("curscale"))
            : null != o.data("curscale") && (n = o.data("curscale")),
          (function (e, i) {
            (t[i].slotw = Math.ceil(t[i].width / t[i].slots)),
              "fullscreen" == t[i].sliderLayout
                ? (t[i].sloth = Math.ceil(jQuery(window).height() / t[i].slots))
                : (t[i].sloth = Math.ceil(t[i].height / t[i].slots)),
              t[i].autoHeight &&
                void 0 !== e &&
                "" !== e &&
                (t[i].sloth = Math.ceil(e.height() / t[i].slots));
          })(o, i);
        var d =
            void 0 !== o[0] &&
            void 0 !== o[0].dataset &&
            void 0 !== o[0].dataset.lazyload
              ? o[0].dataset.lazyload
              : o.attr("src"),
          c = t[i].width,
          p = t[i].autoHeight ? t[i].c.height() : t[i].height,
          g = o.data("fxof"),
          u = 0,
          f = e.data("bgcolor") || o.css("backgroundColor"),
          h = e.data("bgfit") || "cover",
          m = e.data("bgrepeat") || "no-repeat",
          v = e.data("bgposition") || "center center",
          y =
            void 0 !== f && f.indexOf("gradient") >= 0
              ? "background:" + f
              : "background-color:" +
                f +
                ";background-image:url(" +
                d +
                ");background-repeat:" +
                m +
                ";background-size:" +
                h +
                ";background-position:" +
                v,
          b = "";
        if (
          ((g = null == g ? 0 : g),
          e.find(".slot").each(function () {
            jQuery(this).remove();
          }),
          "box" === r)
        )
          for (var _ = 0, w = 0, x = 0; x < t[i].slots; x++) {
            w = 0;
            for (var k = 0; k < t[i].slots; k++)
              (b +=
                '<div class="slot" style="' +
                (null != n && null != l
                  ? "transform:rotateZ(" + l + "deg)"
                  : "") +
                ";position:absolute;overflow:hidden;top:" +
                (0 + w) +
                "px;left:" +
                (g + _) +
                "px;width:" +
                t[i].slotw +
                "px;height:" +
                t[i].sloth +
                'px;"><div class="slotslide ' +
                s +
                '" data-x="' +
                _ +
                '" data-y="' +
                w +
                '" style="position:absolute;top:0px;left:0px;width:' +
                t[i].slotw +
                "px;height:" +
                t[i].sloth +
                'px;overflow:hidden;"><div style="position:absolute;top:' +
                (0 - w) +
                "px;left:" +
                (0 - _) +
                "px;width:" +
                c +
                "px;height:" +
                p +
                "px;" +
                y +
                ';"></div></div></div>'),
                (w += t[i].sloth);
            _ += t[i].slotw;
          }
        else if ("horizontal" === r) {
          if (!a) u = 0 - t[i].slotw;
          for (k = 0; k < t[i].slots; k++)
            b +=
              '<div class="slot" style="' +
              (null != n && null != l
                ? "transform:rotateZ(" + l + "deg)"
                : "") +
              ";position:absolute;overflow:hidden;top:0px;left:" +
              (g + k * t[i].slotw) +
              "px;width:" +
              (t[i].slotw + 0.3) +
              "px;height:" +
              p +
              'px"><div class="slotslide ' +
              s +
              '" style="position:absolute;top:0px;left:' +
              u +
              "px;width:" +
              (t[i].slotw + 0.6) +
              "px;height:" +
              p +
              'px;overflow:hidden;"><div style="position:absolute;top:0px;left:' +
              (0 - k * t[i].slotw) +
              "px;width:" +
              c +
              "px;height:" +
              p +
              "px;" +
              y +
              ';"></div></div></div>';
        }
        if ("vertical" === r) {
          if (!a) u = 0 - t[i].sloth;
          for (k = 0; k < t[i].slots; k++)
            b +=
              '<div class="slot" style="' +
              (null != n && null != l
                ? "transform:rotateZ(" + l + "deg)"
                : "") +
              ";position:absolute;overflow:hidden;top:" +
              (0 + k * t[i].sloth) +
              "px;left:" +
              g +
              "px;width:" +
              c +
              "px;height:" +
              t[i].sloth +
              'px"><div class="slotslide ' +
              s +
              '" style="position:absolute;top:' +
              u +
              "px;left:0px;width:" +
              c +
              "px;height:" +
              t[i].sloth +
              'px;overflow:hidden;"><div style="position:absolute;top:' +
              (0 - k * t[i].sloth) +
              "px;left:0px;width:" +
              c +
              "px;height:" +
              p +
              "px;" +
              y +
              ';"></div></div></div>';
        }
        e.append(b);
      };
  })(jQuery),
  (function (e) {
    "use strict";
    var t = jQuery.fn.revolution,
      i = t.is_mobile();
    t.is_android();
    function a(e) {
      return null == e
        ? -1
        : jQuery.isNumeric(e)
        ? e
        : e.split(":").length > 1
        ? 60 * parseInt(e.split(":")[0], 0) + parseInt(e.split(":")[1], 0)
        : e;
    }
    jQuery.extend(!0, t, {
      preLoadAudio: function (e, i) {
        (t[i].videos = void 0 === t[i].videos ? {} : t[i].videos),
          e.find(".rs-layer-audio").each(function () {
            var e = jQuery(this),
              a = (t[i].videos[e[0].id] =
                void 0 === t[i].videos[e[0].id]
                  ? y(e.data(), "audio")
                  : t[i].videos[e[0].id]),
              r = {};
            0 === e.find("audio").length &&
              ((r.src = null != a.mp4 ? a.mp4 : ""),
              (r.pre = a.pload || ""),
              (this.id =
                void 0 === this.id || "" === this.id
                  ? e.attr("audio-layer-" + Math.round(199999 * Math.random()))
                  : this.id),
              (r.id = this.id),
              (r.status = "prepared"),
              (r.start = jQuery.now()),
              (r.waittime = void 0 !== a.ploadwait ? 1e3 * a.ploadwait : 5e3),
              ("auto" != r.pre &&
                "canplaythrough" != r.pre &&
                "canplay" != r.pre &&
                "progress" != r.pre) ||
                (void 0 === t[i].audioqueue && (t[i].audioqueue = []),
                t[i].audioqueue.push(r),
                t.manageVideoLayer(e, i)));
          });
      },
      preLoadAudioDone: function (e, i, a) {
        var r = t[i].videos[e[0].id];
        t[i].audioqueue &&
          t[i].audioqueue.length > 0 &&
          jQuery.each(t[i].audioqueue, function (e, t) {
            r.mp4 !== t.src ||
              (t.pre !== a && "auto" !== t.pre) ||
              (t.status = "loaded");
          });
      },
      resetVideo: function (e, a, r, o) {
        var s = t[a].videos[e[0].id];
        switch (s.type) {
          case "youtube":
            s.rwd &&
              null != s.player &&
              void 0 !== s.player.seekTo &&
              (s.player.seekTo(-1 == s.ssec ? 0 : s.ssec),
              s.player.pauseVideo()),
              0 != e.find("rs-poster").length ||
                s.bgvideo ||
                "preset" === r ||
                tpGS.gsap.to(e.find("iframe"), 0.3, {
                  opacity: 1,
                  display: "block",
                  ease: "power3.inOut",
                });
            break;
          case "vimeo":
            void 0 !== s.vimeoplayer &&
              !o &&
              s.rwd &&
              ((0 !== s.ssec && -1 !== s.ssec) ||
                s.bgvideo ||
                e.find("rs-poster").length > 0) &&
              (s.vimeoplayer.setCurrentTime(-1 == s.ssec ? 0 : s.ssec),
              s.vimeoplayer.pause()),
              0 != e.find("rs-poster").length ||
                s.bgvideo ||
                "preset" === r ||
                tpGS.gsap.to(e.find("iframe"), 0.3, {
                  opacity: 1,
                  display: "block",
                  ease: "power3.inOut",
                });
            break;
          case "html5":
            if (i && s.notonmobile) return !1;
            tpGS.gsap.to(s.jvideo, 0.3, {
              opacity: 1,
              display: "block",
              ease: "power3.inOut",
            }),
              !s.rwd ||
                e.hasClass("videoisplaying") ||
                isNaN(s.video.duration) ||
                (s.video.currentTime = -1 == s.ssec ? 0 : s.ssec),
              ("mute" == s.volume ||
                t.lastToggleState(e.videomutetoggledby) ||
                !0 === t[a].globalmute) &&
                (s.video.muted = !0);
        }
      },
      Mute: function (e, i, a) {
        var r = !1,
          o = t[i].videos[e[0].id];
        switch (o.type) {
          case "youtube":
            o.player &&
              (!0 === a && o.player.mute(),
              !1 === a && l(o, parseInt(o.volcache, 0)),
              (r = o.player.isMuted()));
            break;
          case "vimeo":
            o.volcachecheck ||
              ((o.volcache = o.volcache > 1 ? o.volcache / 100 : o.volcache),
              (o.volcachecheck = !0)),
              (o.volume = !0 === a ? "mute" : !1 === a ? o.volcache : o.volume),
              void 0 !== a &&
                null != o.vimeoplayer &&
                n(o, !0 === a ? 0 : o.volcache),
              (r = "mute" == o.volume || 0 === o.volume);
            break;
          case "html5":
            o.volcachecheck ||
              ((o.volcache = o.volcache > 1 ? o.volcache / 100 : o.volcache),
              (o.volcachecheck = !0)),
              (o.video.volume = o.volcache),
              void 0 !== a && o.video && (o.video.muted = a),
              (r = void 0 !== o.video ? o.video.muted : r);
        }
        if (void 0 === a) return r;
      },
      stopVideo: function (e, i) {
        if (void 0 !== t[i] && void 0 !== t[i]) {
          var a = t[i].videos[e[0].id];
          if (void 0 !== a)
            switch (
              (t[i].leaveViewPortBasedStop || (t[i].lastplayedvideos = []),
              (t[i].leaveViewPortBasedStop = !1),
              a.type)
            ) {
              case "youtube":
                if (
                  void 0 === a.player ||
                  2 === a.player.getPlayerState() ||
                  5 === a.player.getPlayerState()
                )
                  return;
                a.player.pauseVideo(),
                  (a.youtubepausecalled = !0),
                  setTimeout(function () {
                    a.youtubepausecalled = !1;
                  }, 80);
                break;
              case "vimeo":
                if (void 0 === a.vimeoplayer) return;
                a.vimeoplayer.pause(),
                  (a.vimeopausecalled = !0),
                  setTimeout(function () {
                    a.vimeopausecalled = !1;
                  }, 80);
                break;
              case "html5":
                a.video && a.video.pause();
            }
        }
      },
      playVideo: function (e, i) {
        var a = t[i].videos[e[0].id];
        switch ((clearTimeout(a.videoplaywait), a.type)) {
          case "youtube":
            if (0 == e.find("iframe").length)
              e.append(a.videomarkup), u(e, i, !0);
            else if (null != a.player.playVideo) {
              var o = a.player.getCurrentTime();
              a.nseTriggered && ((o = -1), (a.nseTriggered = !1)),
                -1 != a.ssec && a.ssec > o && a.player.seekTo(a.ssec),
                !0 !== a.youtubepausecalled && p(a);
            } else
              a.videoplaywait = setTimeout(function () {
                !0 !== a.youtubepausecalled && t.playVideo(e, i);
              }, 50);
            break;
          case "vimeo":
            0 == e.find("iframe").length
              ? (delete a.vimeoplayer, e.append(a.videomarkup), u(e, i, !0))
              : e.hasClass("rs-apiready")
              ? ((a.vimeoplayer =
                  null == a.vimeoplayer
                    ? new Vimeo.Player(e.find("iframe").attr("id"))
                    : a.vimeoplayer),
                a.vimeoplayer.getPaused()
                  ? setTimeout(function () {
                      var r = void 0 === a.currenttime ? 0 : a.currenttime;
                      a.nseTriggered && ((r = -1), (a.nseTriggered = !1)),
                        -1 != a.ssec &&
                          a.ssec > r &&
                          a.vimeoplayer.setCurrentTime(a.ssec),
                        ("mute" == a.volume ||
                          0 === a.volume ||
                          t.lastToggleState(e.data("videomutetoggledby")) ||
                          !0 === t[i].globalmute) &&
                          ((a.volumetoken = !0), a.vimeoplayer.setVolume(0)),
                        c(a.vimeoplayer);
                    }, 510)
                  : (a.videoplaywait = setTimeout(function () {
                      !0 !== a.vimeopausecalled && t.playVideo(e, i);
                    }, 50)))
              : (a.videoplaywait = setTimeout(function () {
                  !0 !== a.vimeopausecalled && t.playVideo(e, i);
                }, 100));
            break;
          case "html5":
            if (a.metaloaded) {
              d(a.video);
              o = a.video.currentTime;
              a.nseTriggered && ((o = -1), (a.nseTriggered = !1)),
                -1 != a.ssec && a.ssec > o && (a.video.currentTime = a.ssec);
            } else
              r(
                a.video,
                "loadedmetadata",
                (function (e) {
                  t.resetVideo(e, i), a.video.play();
                  var r = a.video.currentTime;
                  a.nseTriggered && ((r = -1), (a.nseTriggered = !1)),
                    -1 != a.ssec &&
                      a.ssec > r &&
                      (a.video.currentTime = a.ssec);
                })(e)
              );
        }
      },
      isVideoPlaying: function (e, i) {
        var a = !1;
        return (
          null != t[i].playingvideos &&
            jQuery.each(t[i].playingvideos, function (t, i) {
              e.attr("id") == i.attr("id") && (a = !0);
            }),
          a
        );
      },
      removeMediaFromList: function (e, t) {
        w(e, t);
      },
      prepareCoveredVideo: function (e, i) {
        var a = t[e].videos[i[0].id];
        if (
          (t.updateDimensions(e),
          void 0 === a.vimeoid || void 0 !== a.vimeoplayerloaded)
        ) {
          if (
            ((a.ifr = i.find("iframe, video")),
            (a.vd =
              a.ratio.split(":").length > 1
                ? a.ratio.split(":")[0] / a.ratio.split(":")[1]
                : 1),
            0 === t[e].conw || 0 === t[e].conh)
          )
            return (
              t.setSize(e),
              clearTimeout(a.resizelistener),
              void (a.resizelistener = setTimeout(function () {
                t.prepareCoveredVideo(e, i);
              }, 100))
            );
          var r = t[e].conw / t[e].conh,
            o = (r / a.vd) * 100,
            s = (a.vd / r) * 100;
          "html5" === a.type &&
            "Edge" !== t.get_browser() &&
            "IE" !== t.get_browser() &&
            ((s = 100), (o = 100)),
            "Edge" === t.get_browser()
              ? r > a.vd
                ? tpGS.gsap.set(a.ifr, {
                    minWidth: "100%",
                    height: o + "%",
                    x: "-50%",
                    y: "-50%",
                    top: "50%",
                    left: "50%",
                    position: "absolute",
                  })
                : tpGS.gsap.set(a.ifr, {
                    minHeight: "100%",
                    width: s + "%",
                    x: "-50%",
                    y: "-50%",
                    top: "50%",
                    left: "50%",
                    position: "absolute",
                  })
              : r > a.vd
              ? tpGS.gsap.set(a.ifr, {
                  height: o + "%",
                  width: "100%",
                  top: -(o - 100) / 2 + "%",
                  left: "0px",
                  position: "absolute",
                })
              : tpGS.gsap.set(a.ifr, {
                  width: s + "%",
                  height: "100%",
                  left: -(s - 100) / 2 + "%",
                  top: "0px",
                  position: "absolute",
                }),
            a.ifr.hasClass("resizelistener") ||
              (a.ifr.addClass("resizelistener"),
              jQuery(window).resize(function () {
                t.prepareCoveredVideo(e, i),
                  clearTimeout(a.resizelistener),
                  (a.resizelistener = setTimeout(function () {
                    t.prepareCoveredVideo(e, i);
                  }, 90));
              }));
        }
      },
      checkVideoApis: function (e, i) {
        location.protocol;
        if (
          !t[i].youtubeapineeded &&
          ((null != e.data("ytid") ||
            (e.find("iframe").length > 0 &&
              e.find("iframe").attr("src").toLowerCase().indexOf("youtube") >
                0)) &&
            (t[i].youtubeapineeded = !0),
          t[i].youtubeapineeded && !window.rs_addedyt)
        ) {
          (t[i].youtubestarttime = jQuery.now()), (window.rs_addedyt = !0);
          var a = document.createElement("script"),
            r = document.getElementsByTagName("script")[0],
            o = !0;
          (a.src = "https://www.youtube.com/iframe_api"),
            jQuery("head")
              .find("*")
              .each(function () {
                "https://www.youtube.com/iframe_api" ==
                  jQuery(this).attr("src") && (o = !1);
              }),
            o && r.parentNode.insertBefore(a, r);
        }
        if (
          !t[i].vimeoapineeded &&
          ((null != e.data("vimeoid") ||
            (e.find("iframe").length > 0 &&
              e.find("iframe").attr("src").toLowerCase().indexOf("vimeo") >
                0)) &&
            (t[i].vimeoapineeded = !0),
          t[i].vimeoapineeded && !window.rs_addedvim)
        ) {
          (t[i].vimeostarttime = jQuery.now()), (window.rs_addedvim = !0);
          var s = document.createElement("script");
          (r = document.getElementsByTagName("script")[0]), (o = !0);
          (s.src = "../player.vimeo.com/api/player.js"),
            jQuery("head")
              .find("*")
              .each(function () {
                "https://player.vimeo.com/api/player.js" ==
                  jQuery(this).attr("src") && (o = !1);
              }),
            o && r.parentNode.insertBefore(s, r);
        }
      },
      manageVideoLayer: function (e, a) {
        if (
          !0 === t.gA(e[0], "videoLayerManaged") ||
          "true" === t.gA(e[0], "videoLayerManaged")
        )
          return !1;
        t[a].videos = void 0 === t[a].videos ? {} : t[a].videos;
        var o = (t[a].videos[e[0].id] =
          void 0 === t[a].videos[e[0].id] ? y(e.data()) : t[a].videos[e[0].id]);
        if (((o.audio = void 0 !== o.audio && o.audio), i && o.opom))
          0 == e.find("rs-poster").length &&
            e.append(
              '<rs-poster class="noSwipe" style="background-image:url(' +
                o.poster +
                ');"></rs-poster>'
            );
        else {
          switch (
            ((o.id = e[0].id),
            (o.pload =
              "auto" === o.pload ||
              "canplay" === o.pload ||
              "canplaythrough" === o.pload ||
              "progress" === o.pload
                ? "auto"
                : o.pload),
            (o.type =
              null != o.mp4 || null != o.webm
                ? "html5"
                : null != o.ytid && String(o.ytid).length > 1
                ? "youtube"
                : null != o.vimeoid && String(o.vimeoid).length > 1
                ? "vimeo"
                : "none"),
            (o.newtype =
              "html5" == o.type &&
              0 == e.find(o.audio ? "audio" : "video").length
                ? "html5"
                : "youtube" == o.type && 0 == e.find("iframe").length
                ? "youtube"
                : "vimeo" == o.type && 0 == e.find("iframe").length
                ? "vimeo"
                : "none"),
            !o.audio &&
              "1sttime" == o.aplay &&
              o.pausetimer &&
              o.bgvideo &&
              e.closest("rs-slide").addClass("rs-pause-timer-once"),
            o.audio ||
              !o.bgvideo ||
              !o.pausetimer ||
              (1 != o.aplay && "true" != o.aplay && "no1sttime" != o.aplay) ||
              e.closest("rs-slide").addClass("rs-pause-timer-always"),
            o.noInt && e.addClass("rs-nointeraction"),
            o.newtype)
          ) {
            case "html5":
              o.audio && e.addClass("rs-audio"),
                (o.tag = o.audio ? "audio" : "video");
              var s =
                  "video" === o.tag && (t.is_mobile() || t.isSafari11())
                    ? o.aplay || "true" === o.aplay
                      ? "muted playsinline autoplay"
                      : o.inline
                      ? " playsinline"
                      : ""
                    : "",
                n =
                  "<" +
                  o.tag +
                  " " +
                  s +
                  " " +
                  (o.controls ? " controls " : "") +
                  ' style="' +
                  ("Edge" !== t.get_browser()
                    ? "object-fit:cover;background-size:cover;opacity:0;width:100%; height:100%"
                    : "") +
                  '" class="" ' +
                  (o.loop ? "loop" : "") +
                  ' preload="' +
                  o.pload +
                  '">';
              "video" === o.tag &&
                null != o.webm &&
                "firefox" == t.get_browser().toLowerCase() &&
                (n = n + '<source src="' + o.webm + '" type="video/webm" />'),
                null != o.mp4 &&
                  (n =
                    n +
                    '<source src="' +
                    o.mp4 +
                    '" type="' +
                    ("video" === o.tag ? "video/mp4" : "audio/mpeg") +
                    '" />'),
                null != o.ogv &&
                  (n =
                    n +
                    '<source src="' +
                    o.mp4 +
                    '" type="' +
                    o.tag +
                    '/ogg" />'),
                (n += "</" + o.tag + ">"),
                (o.videomarkup = n),
                (i && o.notonmobile) || t.isIE(8) || e.append(n),
                e.find(o.tag).parent().hasClass("html5vid") ||
                  e
                    .find(o.tag)
                    .wrap(
                      '<div class="html5vid" style="position:relative;top:0px;left:0px;width:100%;height:100%; overflow:hidden;"></div>'
                    ),
                (o.jvideo = e.find(o.tag)),
                (o.video = o.jvideo[0]),
                (o.html5vid = o.jvideo.parent()),
                o.metaloaded ||
                  r(
                    o.video,
                    "loadedmetadata",
                    (function (e) {
                      m(e, a), t.resetVideo(e, a);
                    })(e)
                  );
              break;
            case "youtube":
              o.controls ||
                ((o.vatr = o.vatr.replace("controls=1", "controls=0")),
                -1 == o.vatr.toLowerCase().indexOf("controls") &&
                  (o.vatr = o.vatr + "&controls=0")),
                (o.inline || "RS-BGVIDEO" === e[0].tagName) &&
                  (o.vatr = o.vatr + "&playsinline=1"),
                -1 != o.ssec && (o.vatr += "&start=" + o.ssec),
                -1 != o.esec && (o.vatr += "&end=" + o.esec);
              var l = o.vatr.split("origin%3dhttps_/index.html");
              (o.vatrnew =
                l.length > 1
                  ? l[0] +
                    "origin=https://" +
                    (self.location.href.match(/www/gi) && !l[1].match(/www/gi)
                      ? "www." + l[1]
                      : l[1])
                  : o.vatr),
                (o.videomarkup =
                  '<iframe allow="autoplay; fullscreen" type="text/html" src="https://www.youtube-nocookie.com/embed/' +
                  o.ytid +
                  "?" +
                  o.vatrnew +
                  '" ' +
                  (!0 === o.afs ? "allowfullscreen" : "") +
                  ' width="100%" height="100%" style="opacity:0;visibility:visible;width:100%;height:100%"></iframe>');
              break;
            case "vimeo":
              o.controls
                ? ((o.vatr = o.vatr.replace("background=0", "background=1")),
                  -1 == o.vatr.toLowerCase().indexOf("background") &&
                    (o.vatr = o.vatr + "&background=1"))
                : ((o.vatr = o.vatr.replace("background=1", "background=0")),
                  -1 == o.vatr.toLowerCase().indexOf("background") &&
                    (o.vatr = o.vatr + "&background=0")),
                (o.vatr =
                  "autoplay=" + (!0 === o.aplay ? 1 : 0) + "&" + o.vatr),
                i && (o.vatr = "muted=1&" + o.vatr),
                o.loop && (o.vatr = "loop=1&" + o.vatr),
                (o.videomarkup =
                  '<iframe  allow="autoplay; fullscreen" src="https://player.vimeo.com/video/' +
                  o.vimeoid +
                  "?" +
                  o.vatr +
                  '" webkitallowfullscreen mozallowfullscreen allowfullscreen width="100%" height="100%" style="opacity:0;visibility:visible;100%;height:100%"></iframe>');
          }
          if (!(null != o.poster && o.poster.length > 2) || (i && o.npom)) {
            if (i && o.notonmobile) return !1;
            0 != e.find("iframe").length ||
              ("youtube" != o.type && "vimeo" != o.type) ||
              (delete o.vimeoplayer, e.append(o.videomarkup), u(e, a, !1));
          } else
            0 == e.find("rs-poster").length &&
              e.append(
                '<rs-poster class="noSwipe" style="background-image:url(' +
                  o.poster +
                  ');"></rs-poster>'
              ),
              0 == e.find("iframe").length &&
                e.find("rs-poster").click(function () {
                  if ((t.playVideo(e, a), i)) {
                    if (o.notonmobile) return !1;
                    tpGS.gsap.to(e.find("rs-poster"), 0.3, {
                      opacity: 0,
                      visibility: "hidden",
                      force3D: "auto",
                      ease: "power3.inOut",
                    }),
                      tpGS.gsap.to(e.find("iframe"), 0.3, {
                        opacity: 1,
                        display: "block",
                        ease: "power3.inOut",
                      });
                  }
                });
          "none" !== o.doverlay &&
            void 0 !== o.doverlay &&
            (o.bgvideo
              ? 1 != e.closest("rs-sbg-wrap").find("rs-dotted").length &&
                e
                  .closest("rs-sbg-wrap")
                  .append('<rs-dotted class="' + o.doverlay + '"></rs-dotted>')
              : 1 != e.find("rs-dotted").length &&
                e.append('<rs-dotted class="' + o.doverlay + '"></rs-dotted>')),
            t.sA(e[0], "videoLayerManaged", !0),
            o.bgvideo && tpGS.gsap.set(e.find("video, iframe"), { opacity: 0 });
        }
      },
    });
    var r = function (e, t, i) {
        e.addEventListener
          ? e.addEventListener(t, i, { capture: !1, passive: !0 })
          : e.attachEvent(t, i, { capture: !1, passive: !0 });
      },
      o = function (e, t, i) {
        var a = {};
        return (a.video = e), (a.type = t), (a.settings = i), a;
      },
      s = function (e, i) {
        var a = t[e].videos[i[0].id];
        (a.bgvideo || a.fcover) &&
          (a.fcover && i.removeClass("rs-fsv").addClass("coverscreenvideo"),
          (void 0 === a.ratio || a.ratio.split(":").length <= 1) &&
            (a.ratio = "16:9"),
          t.prepareCoveredVideo(e, i));
      },
      n = function (e, t) {
        var i = e.vimeoplayer;
        i.getPaused()
          .then(function (a) {
            e.volumetoken = !0;
            var r = !a,
              o = i.setVolume(t);
            void 0 !== o &&
              o
                .then(function (t) {
                  i.getPaused()
                    .then(function (t) {
                      r === t &&
                        ((e.volume = "mute"),
                        (e.volumetoken = !0),
                        i.setVolume(0),
                        i.play());
                    })
                    .catch(function (e) {
                      console.log(
                        "Get Paused Function Failed for Vimeo Volume Changes Inside the Promise"
                      );
                    });
                })
                .catch(function (t) {
                  r &&
                    ((e.volume = "mute"),
                    (e.volumetoken = !0),
                    i.setVolume(0),
                    i.play());
                });
          })
          .catch(function () {
            console.log("Get Paused Function Failed for Vimeo Volume Changes");
          });
      },
      l = function (e, t) {
        var i = e.player.getPlayerState();
        "mute" === t
          ? e.player.mute()
          : (e.player.unMute(), e.player.setVolume(t)),
          setTimeout(function () {
            1 === i &&
              1 !== e.player.getPlayerState() &&
              (e.player.mute(), e.player.playVideo());
          }, 39);
      },
      d = function (e) {
        var t = e.play();
        void 0 !== t &&
          t
            .then(function (e) {})
            .catch(function (t) {
              e.pause();
            });
      },
      c = function (e) {
        var t = e.play();
        void 0 !== t &&
          t
            .then(function (e) {})
            .catch(function (t) {
              (_.volumetoken = !0), e.setVolume(0), e.play();
            });
      },
      p = function (e) {
        e.player.playVideo(),
          setTimeout(function () {
            1 !== e.player.getPlayerState() &&
              3 !== e.player.getPlayerState() &&
              ((e.volume = "mute"), e.player.mute(), e.player.playVideo());
          }, 39);
      },
      g = function (e, i, a) {
        (e.vimeostarted = !0), (e.nextslidecalled = !1);
        var r = i.find("rs-poster"),
          s = i.find("iframe");
        void 0 !== r &&
          r.length > 0 &&
          tpGS.gsap.to(r, 0.3, {
            opacity: 0,
            visibility: "hidden",
            force3D: "auto",
            ease: "power3.inOut",
          }),
          void 0 !== s &&
            s.length > 0 &&
            tpGS.gsap.to(s, 0.3, {
              opacity: 1,
              display: "block",
              ease: "power3.inOut",
            }),
          t[a].c.trigger(
            "revolution.slide.onvideoplay",
            o(e.vimeoplayer, "vimeo", e)
          ),
          (t[a].stopByVideo = e.pausetimer),
          b(i, a),
          "mute" == e.volume ||
          0 === e.volume ||
          t.lastToggleState(i.data("videomutetoggledby")) ||
          !0 === t[a].globalmute
            ? ((e.volumetoken = !0), e.vimeoplayer.setVolume(0))
            : n(e, parseInt(e.volcache, 0) / 100 || 0.75),
          t.toggleState(e.videotoggledby);
      },
      u = function (e, a, r) {
        var n = t[a].videos[e[0].id],
          d = "iframe" + Math.round(1e5 * Math.random() + 1);
        if (
          ((n.ifr = e.find("iframe")),
          s(a, e),
          n.ifr.attr("id", d),
          (n.startvideonow = r),
          n.videolistenerexist)
        ) {
          if (r)
            switch (n.type) {
              case "youtube":
                p(n), -1 != n.ssec && n.player.seekTo(n.ssec);
                break;
              case "vimeo":
                c(n.vimeoplayer), -1 != n.ssec && n.vimeoplayer.seekTo(n.ssec);
            }
        } else
          switch (n.type) {
            case "youtube":
              n.player = new YT.Player(d, {
                events: {
                  onStateChange: function (i) {
                    i.data == YT.PlayerState.PLAYING
                      ? (tpGS.gsap.to(e.find("rs-poster"), 0.3, {
                          opacity: 0,
                          visibility: "hidden",
                          force3D: "auto",
                          ease: "power3.inOut",
                        }),
                        tpGS.gsap.to(n.ifr, 0.3, {
                          opacity: 1,
                          display: "block",
                          ease: "power3.inOut",
                        }),
                        "mute" == n.volume ||
                        0 === n.volume ||
                        t.lastToggleState(e.data("videomutetoggledby")) ||
                        !0 === t[a].globalmute
                          ? n.player.mute()
                          : l(n, parseInt(n.volcache, 0) || 75),
                        (t[a].stopByVideo = !0),
                        b(e, a),
                        n.pausetimer
                          ? t[a].c.trigger("stoptimer")
                          : (t[a].stopByVideo = !1),
                        t[a].c.trigger(
                          "revolution.slide.onvideoplay",
                          o(n.player, "youtube", n)
                        ),
                        t.toggleState(n.videotoggledby))
                      : (0 == i.data &&
                          n.loop &&
                          (-1 != n.ssec && n.player.seekTo(n.ssec),
                          p(n),
                          t.toggleState(n.videotoggledby)),
                        h() ||
                          (0 != i.data && 2 != i.data) ||
                          !(
                            (n.scop && e.find("rs-poster").length > 0) ||
                            (n.bgvideo &&
                              e.find(".rs-fullvideo-cover").length > 0)
                          ) ||
                          (n.bgvideo
                            ? tpGS.gsap.to(e.find(".rs-fullvideo-cover"), 0.1, {
                                opacity: 1,
                                force3D: "auto",
                                ease: "power3.inOut",
                              })
                            : tpGS.gsap.to(e.find("rs-poster"), 0.1, {
                                opacity: 1,
                                visibility: "visible",
                                force3D: "auto",
                                ease: "power3.inOut",
                              }),
                          tpGS.gsap.to(n.ifr, 0.1, {
                            opacity: 0,
                            ease: "power3.inOut",
                          })),
                        -1 != i.data &&
                          3 != i.data &&
                          ((t[a].stopByVideo = !1),
                          (t[a].tonpause = !1),
                          w(e, a),
                          t[a].c.trigger("starttimer"),
                          t[a].c.trigger(
                            "revolution.slide.onvideostop",
                            o(n.player, "youtube", n)
                          ),
                          (null != t[a].videoIsPlaying &&
                            t[a].videoIsPlaying.attr("id") != e.attr("id")) ||
                            t.unToggleState(n.videotoggledby)),
                        0 == i.data && n.nse
                          ? (f(),
                            (n.nseTriggered = !0),
                            t[a].c.revnext(),
                            w(e, a))
                          : (w(e, a),
                            (t[a].stopByVideo = !1),
                            3 !== i.data &&
                              ((-1 != n.lasteventdata &&
                                3 != n.lasteventdata &&
                                void 0 !== n.lasteventdata) ||
                                (-1 != i.data && 3 != i.data)) &&
                              t[a].c.trigger("starttimer"),
                            t[a].c.trigger(
                              "revolution.slide.onvideostop",
                              o(n.player, "youtube", n)
                            ),
                            (null != t[a].videoIsPlaying &&
                              t[a].videoIsPlaying.attr("id") != e.attr("id")) ||
                              t.unToggleState(n.videotoggledby))),
                      (n.lasteventdata = i.data);
                  },
                  onReady: function (a) {
                    var r,
                      o = t.is_mobile(),
                      s = e.hasClass("rs-layer-video");
                    (!o && (!t.isSafari11() || (o && s))) ||
                      ("RS-BGVIDEO" !== e[0].tagName &&
                        (!s || (!0 !== n.aplay && "true" !== n.aplay))) ||
                      ((r = !0),
                      n.player.setVolume(0),
                      (n.volume = "mute"),
                      n.player.mute(),
                      clearTimeout(e.data("mobilevideotimr")),
                      (2 !== n.player.getPlayerState() &&
                        -1 !== n.player.getPlayerState()) ||
                        e.data(
                          "mobilevideotimr",
                          setTimeout(function () {
                            p(n);
                          }, 500)
                        )),
                      r ||
                        "mute" != n.volume ||
                        (n.player.setVolume(0), n.player.mute()),
                      e.addClass("rs-apiready"),
                      (null == n.speed && 1 === n.speed) ||
                        a.target.setPlaybackRate(parseFloat(n.speed)),
                      e.find("rs-poster").unbind("click"),
                      e.find("rs-poster").click(function () {
                        i || p(n);
                      }),
                      n.startvideonow &&
                        (p(n), -1 != n.ssec && n.player.seekTo(n.ssec)),
                      (n.videolistenerexist = !0);
                  },
                },
              });
              break;
            case "vimeo":
              for (
                var u,
                  m = n.ifr.attr("src"),
                  v = {},
                  y = m,
                  _ = /([^&=]+)=([^&]*)/g;
                (u = _.exec(y));

              )
                v[decodeURIComponent(u[1])] = decodeURIComponent(u[2]);
              m = (m =
                null != v.player_id
                  ? m.replace(v.player_id, d)
                  : m + "&player_id=" + d).replace(/&api=0|&api=1/g, "");
              var x,
                k = t.is_mobile() || t.isSafari11(),
                S = "RS-BGVIDEO" === e[0].tagName;
              if (
                (k && S && (m += "&background=1"),
                n.ifr.attr("src", m),
                (n.vimeoplayer =
                  void 0 === n.vimeoplayer || !1 === n.vimeoplayer
                    ? new Vimeo.Player(d)
                    : n.vimeoplayer),
                k)
              )
                S ? (x = !0) : (n.aplay || "true" === n.aplay) && (x = !0),
                  x &&
                    ((n.volumetoken = !0),
                    n.vimeoplayer.setVolume(0),
                    (n.volume = "mute"));
              n.vimeoplayer.on("play", function (t) {
                n.vimeostarted || g(n, e, a);
              }),
                n.vimeoplayer.on("loaded", function (t) {
                  var i = {};
                  n.vimeoplayer.getVideoWidth().then(function (t) {
                    (i.width = t),
                      void 0 !== i.width &&
                        void 0 !== i.height &&
                        ((n.ratio = i.width + ":" + i.height),
                        (n.vimeoplayerloaded = !0),
                        s(a, e));
                  }),
                    n.vimeoplayer.getVideoHeight().then(function (t) {
                      (i.height = t),
                        void 0 !== i.width &&
                          void 0 !== i.height &&
                          ((n.ratio = i.width + ":" + i.height),
                          (n.vimeoplayerloaded = !0),
                          s(a, e));
                    }),
                    n.startvideonow &&
                      ("mute" === n.volume &&
                        ((n.volumetoken = !0), n.vimeoplayer.setVolume(0)),
                      c(n.vimeoplayer),
                      -1 != n.ssec && n.vimeoplayer.setCurrentTime(n.ssec));
                }),
                e.addClass("rs-apiready"),
                n.vimeoplayer.on("volumechange", function (e) {
                  n.volumetoken && (n.volume = e.volume), (n.volumetoken = !1);
                }),
                n.vimeoplayer.on("timeupdate", function (i) {
                  n.vimeostarted || g(n, e, a),
                    n.pausetimer &&
                      "playing" == t[a].sliderstatus &&
                      ((t[a].stopByVideo = !0), t[a].c.trigger("stoptimer")),
                    (n.currenttime = i.seconds),
                    0 != n.esec &&
                      -1 !== n.esec &&
                      n.esec < i.seconds &&
                      !0 !== n.nextslidecalled &&
                      (n.loop
                        ? (c(n.vimeoplayer),
                          n.vimeoplayer.setCurrentTime(
                            -1 !== n.ssec ? n.ssec : 0
                          ))
                        : (n.nse &&
                            ((n.nseTriggered = !0),
                            (n.nextslidecalled = !0),
                            t[a].c.revnext()),
                          n.vimeoplayer.pause()));
                }),
                n.vimeoplayer.on("ended", function (i) {
                  (n.vimeostarted = !1),
                    w(e, a),
                    (t[a].stopByVideo = !1),
                    t[a].c.trigger("starttimer"),
                    t[a].c.trigger(
                      "revolution.slide.onvideostop",
                      o(n.vimeoplayer, "vimeo", n)
                    ),
                    n.nse && ((n.nseTriggered = !0), t[a].c.revnext()),
                    (null != t[a].videoIsPlaying &&
                      t[a].videoIsPlaying.attr("id") != e.attr("id")) ||
                      t.unToggleState(n.videotoggledby);
                }),
                n.vimeoplayer.on("pause", function (i) {
                  (n.vimeostarted = !1),
                    ((n.scop && e.find("rs-poster").length > 0) ||
                      (n.bgvideo &&
                        e.find(".rs-fullvideo-cover").length > 0)) &&
                      (n.bgvideo
                        ? tpGS.gsap.to(e.find(".rs-fullvideo-cover"), 0.1, {
                            opacity: 1,
                            force3D: "auto",
                            ease: "power3.inOut",
                          })
                        : tpGS.gsap.to(e.find("rs-poster"), 0.1, {
                            opacity: 1,
                            visibility: "visible",
                            force3D: "auto",
                            ease: "power3.inOut",
                          }),
                      tpGS.gsap.to(e.find("iframe"), 0.1, {
                        opacity: 0,
                        ease: "power3.inOut",
                      })),
                    (t[a].stopByVideo = !1),
                    (t[a].tonpause = !1),
                    w(e, a),
                    t[a].c.trigger("starttimer"),
                    t[a].c.trigger(
                      "revolution.slide.onvideostop",
                      o(n.vimeoplayer, "vimeo", n)
                    ),
                    (null != t[a].videoIsPlaying &&
                      t[a].videoIsPlaying.attr("id") != e.attr("id")) ||
                      t.unToggleState(n.videotoggledby);
                }),
                e.find("rs-poster").unbind("click"),
                e.find("rs-poster").click(function () {
                  if (!i) return c(n.vimeoplayer), !1;
                }),
                (n.videolistenerexist = !0);
          }
      },
      f = function () {
        document.exitFullscreen && document.fullscreen
          ? document.exitFullscreen()
          : document.mozCancelFullScreen && document.mozFullScreen
          ? document.mozCancelFullScreen()
          : document.webkitExitFullscreen &&
            document.webkitIsFullScreen &&
            document.webkitExitFullscreen();
      },
      h = function () {
        if (void 0 !== window.fullScreen) return window.fullScreen;
        if (void 0 !== document.fullscreen) return document.fullscreen;
        if (void 0 !== document.mozFullScreen) return document.mozFullScreen;
        if (void 0 !== document.webkitIsFullScreen)
          return document.webkitIsFullScreen;
        var e =
          jQuery.browser.webkit && /Apple Computer/.test(navigator.vendor)
            ? 42
            : 5;
        return (
          screen.width == window.innerWidth &&
          Math.abs(screen.height - window.innerHeight) < e
        );
      },
      m = function (e, a, s) {
        var n = t[a].videos[e[0].id];
        if (i && n.notonmobile) return !1;
        (n.metaloaded = !0),
          (n.control && !n.audio) ||
            (0 != e.find(".tp-video-play-button").length ||
              i ||
              e.append(
                '<div class="tp-video-play-button"><i class="revicon-right-dir"></i><span class="tp-revstop">&nbsp;</span></div>'
              ),
            e
              .find("video, rs-poster, .tp-video-play-button")
              .click(function () {
                e.hasClass("videoisplaying") ? n.video.pause() : n.video.play();
              })),
          (n.fcover || e.hasClass("rs-fsv") || n.bgvideo) &&
            (n.fcover || n.bgvideo
              ? (n.html5vid.addClass("fullcoveredvideo"),
                (void 0 !== n.ratio && 1 != n.ratio.split(":").length) ||
                  (n.ratio = "16:9"),
                t.prepareCoveredVideo(a, e))
              : n.html5vid.addClass("rs-fsv")),
          r(n.video, "canplaythrough", function () {
            t.preLoadAudioDone(e, a, "canplaythrough");
          }),
          r(n.video, "canplay", function () {
            t.preLoadAudioDone(e, a, "canplay");
          }),
          r(n.video, "progress", function () {
            t.preLoadAudioDone(e, a, "progress");
          }),
          r(n.video, "timeupdate", function (e) {
            0 != n.esec &&
              -1 != n.esec &&
              n.esec < n.video.currentTime &&
              !n.nextslidecalled &&
              (n.loop
                ? (n.video.play(),
                  (n.video.currentTime = -1 === n.ssec ? 0 : n.ssec))
                : (n.nse &&
                    ((n.nseTriggered = !0),
                    (n.nextslidecalled = !0),
                    (t[a].jcnah = !0),
                    t[a].c.revnext(),
                    setTimeout(function () {
                      t[a].jcnah = !1;
                    }, 1e3)),
                  n.video.pause()));
          }),
          r(n.video, "play", function () {
            (n.nextslidecalled = !1),
              (n.volume =
                null != n.volume && "mute" != n.volume
                  ? parseFloat(n.volcache)
                  : n.volume),
              (n.volcache =
                null != n.volcache && "mute" != n.volcache
                  ? parseFloat(n.volcache)
                  : n.volcache),
              t.is_mobile() ||
                t.isSafari11() ||
                (!0 === t[a].globalmute
                  ? (n.video.muted = !0)
                  : (n.video.muted = "mute" == n.volume),
                (n.volcache =
                  jQuery.isNumeric(n.volcache) && n.volcache > 1
                    ? n.volcache / 100
                    : n.volcache),
                "mute" == n.volume
                  ? (n.video.muted = !0)
                  : null != n.volcache && (n.video.volume = n.volcache)),
              e.addClass("videoisplaying"),
              b(e, a),
              !0 !== n.pausetimer || "audio" == n.tag
                ? ((t[a].stopByVideo = !1),
                  t[a].c.trigger(
                    "revolution.slide.onvideostop",
                    o(n.video, "html5", n)
                  ))
                : ((t[a].stopByVideo = !0),
                  t[a].c.trigger(
                    "revolution.slide.onvideoplay",
                    o(n.video, "html5", n)
                  )),
              n.pausetimer &&
                "playing" == t[a].sliderstatus &&
                ((t[a].stopByVideo = !0), t[a].c.trigger("stoptimer")),
              void 0 !== e &&
                void 0 !== e[0] &&
                (e[0].getElementsByTagName("rs-poster").length > 0 &&
                  tpGS.gsap.to(e[0].getElementsByTagName("rs-poster"), 0.3, {
                    opacity: 0,
                    visibility: "hidden",
                    force3D: "auto",
                    ease: "power3.inOut",
                  }),
                e.find(n.tag).length > 0 &&
                  tpGS.gsap.to(e.find(n.tag), 0.3, {
                    opacity: 1,
                    display: "block",
                    ease: "power3.inOut",
                  })),
              t.toggleState(n.videotoggledby);
          }),
          r(n.video, "pause", function (i) {
            !h() &&
              e.find("rs-poster").length > 0 &&
              n.scop &&
              (tpGS.gsap.to(e.find("rs-poster"), 0.3, {
                opacity: 1,
                visibility: "visible",
                force3D: "auto",
                ease: "power3.inOut",
              }),
              tpGS.gsap.to(e.find(n.tag), 0.3, {
                opacity: 0,
                ease: "power3.inOut",
              })),
              e.removeClass("videoisplaying"),
              (t[a].stopByVideo = !1),
              w(e, a),
              "audio" != n.tag && t[a].c.trigger("starttimer"),
              t[a].c.trigger(
                "revolution.slide.onvideostop",
                o(n.video, "html5", n)
              ),
              (null != t[a].videoIsPlaying &&
                t[a].videoIsPlaying.attr("id") != e.attr("id")) ||
                t.unToggleState(n.videotoggledby);
          }),
          r(n.video, "ended", function () {
            f(),
              w(e, a),
              (t[a].stopByVideo = !1),
              w(e, a),
              "audio" != n.tag && t[a].c.trigger("starttimer"),
              t[a].c.trigger(
                "revolution.slide.onvideostop",
                o(n.video, "html5", e.data())
              ),
              n.nse &&
                n.video.currentTime > 0 &&
                (1 == !t[a].jcnah &&
                  ((n.nseTriggered = !0), t[a].c.revnext(), (t[a].jcnah = !0)),
                setTimeout(function () {
                  t[a].jcnah = !1;
                }, 1500)),
              e.removeClass("videoisplaying"),
              (!0 !== t[a].inviewport && void 0 !== t[a].inviewport) ||
                (t[a].lastplayedvideos = []);
          });
      },
      v = function (e) {
        return (
          "t" === e ||
          !0 === e ||
          "true" === e ||
          ("f" !== e && !1 !== e && "false" !== e && e)
        );
      },
      y = function (e, t) {
        e.audio = "audio" === t;
        var i = void 0 === e.video ? [] : e.video.split(";"),
          r = {
            volume: e.audio ? 1 : "mute",
            pload: "auto",
            ratio: "16:9",
            loop: !0,
            aplay: "true",
            fcover: 1 === e.bgvideo,
            afs: !0,
            controls: !1,
            nse: !0,
            npom: !1,
            opom: !1,
            inline: !0,
            notonmobile: !1,
            start: -1,
            end: -1,
            doverlay: "none",
            scop: !1,
            rwd: !0,
            speed: 1,
            ploadwait: 5,
            stopAV: 1 !== e.bgvideo,
            noInt: !1,
            volcache: 75,
          };
        for (var o in i)
          if (i.hasOwnProperty(o)) {
            var s = i[o].split(":");
            switch (s[0]) {
              case "v":
                r.volume = s[1];
                break;
              case "vd":
                r.volcache = s[1];
                break;
              case "p":
                r.pload = s[1];
                break;
              case "ar":
                r.ratio = s[1] + (void 0 !== s[2] ? ":" + s[2] : "");
                break;
              case "ap":
                r.aplay = v(s[1]);
                break;
              case "fc":
                r.fcover = v(s[1]);
                break;
              case "afs":
                r.afs = v(s[1]);
                break;
              case "vc":
                r.controls = s[1];
                break;
              case "nse":
                r.nse = v(s[1]);
                break;
              case "npom":
                r.npom = v(s[1]);
                break;
              case "opom":
                r.opom = v(s[1]);
                break;
              case "t":
                r.vtype = s[1];
                break;
              case "inl":
                r.inline = v(s[1]);
                break;
              case "nomo":
                r.notonmobile = v(s[1]);
                break;
              case "sta":
                r.start = s[1] + (void 0 !== s[2] ? ":" + s[2] : "");
                break;
              case "end":
                r.end = s[1] + (void 0 !== s[2] ? ":" + s[2] : "");
                break;
              case "do":
                r.doverlay = s[1];
                break;
              case "scop":
                r.scop = v(s[1]);
                break;
              case "rwd":
                r.rwd = v(s[1]);
                break;
              case "sp":
                r.speed = s[1];
                break;
              case "vw":
                r.ploadwait = parseInt(s[1], 0) || 5;
                break;
              case "sav":
                r.stopAV = v(s[1]);
                break;
              case "noint":
                r.noInt = v(s[1]);
                break;
              case "l":
                (r.loopcache = s[1]),
                  (r.loop =
                    "loop" === s[1] ||
                    "loopandnoslidestop" === s[1] ||
                    ("none" !== s[1] && v(s[1])));
                break;
              case "ptimer":
                r.pausetimer = v(s[1]);
            }
          }
        return (
          void 0 !== e.bgvideo && (r.bgvideo = e.bgvideo),
          void 0 === e.bgvideo ||
            (!1 !== r.fcover && "false" !== r.fcover) ||
            (r.doverlay = "none"),
          r.noInt && (r.controls = !1),
          void 0 !== e.mp4 && (r.mp4 = e.mp4),
          void 0 !== e.videomp4 && (r.mp4 = e.videomp4),
          void 0 !== e.ytid && (r.ytid = e.ytid),
          void 0 !== e.ogv && (r.ogv = e.ogv),
          void 0 !== e.webm && (r.webm = e.webm),
          void 0 !== e.vimeoid && (r.vimeoid = e.vimeoid),
          void 0 !== e.vatr && (r.vatr = e.vatr),
          void 0 !== e.videoattributes && (r.vatr = e.videoattributes),
          void 0 !== e.poster && (r.poster = e.poster),
          (r.aplay = "true" === r.aplay || r.aplay),
          (r.aplay = 1 != e.audio && r.aplay),
          1 === r.bgvideo && (r.volume = "mute"),
          (r.ssec = a(r.start)),
          (r.esec = a(r.end)),
          (r.pausetimer =
            void 0 === r.pausetimer
              ? "loopandnoslidestop" !== r.loopcache
              : r.pausetimer),
          (r.inColumn = e._incolumn),
          (r.audio = e.audio),
          (!0 !== r.loop && "true" !== r.loop) ||
            (!0 !== r.nse && "true" !== r.nse) ||
            (r.loop = !1),
          r
        );
      },
      b = function (e, i) {
        if (
          ((t[i].playingvideos =
            void 0 === t[i].playingvideos ? new Array() : t[i].playingvideos),
          t[i].videos[e[0].id].stopAV &&
            void 0 !== t[i].playingvideos &&
            t[i].playingvideos.length > 0)
        )
          for (var a in ((t[i].lastplayedvideos = jQuery.extend(
            !0,
            [],
            t[i].playingvideos
          )),
          t[i].playingvideos))
            t[i].playingvideos.hasOwnProperty(a) &&
              t.stopVideo(t[i].playingvideos[a], i);
        t[i].playingvideos.push(e), (t[i].videoIsPlaying = e);
      },
      w = function (e, i) {
        void 0 !== t[i] &&
          void 0 !== t[i] &&
          null != t[i].playingvideos &&
          jQuery.inArray(e, t[i].playingvideos) >= 0 &&
          t[i].playingvideos.splice(jQuery.inArray(e, t[i].playingvideos), 1);
      };
  })(jQuery);
