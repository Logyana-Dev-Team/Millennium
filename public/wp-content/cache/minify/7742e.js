!(function (o) {
  "use strict";
  (window.qodef = {}),
    (qodef.body = o("body")),
    (qodef.html = o("html")),
    (qodef.windowWidth = o(window).width()),
    (qodef.windowHeight = o(window).height()),
    (qodef.scroll = 0),
    o(document).ready(function () {
      (qodef.scroll = o(window).scrollTop()),
        t.init(),
        y.init(),
        n.init(),
        d.init(),
        a.init();
    }),
    o(window).on("load", function () {
      e.init();
    }),
    o(window).resize(function () {
      (qodef.windowWidth = o(window).width()),
        (qodef.windowHeight = o(window).height());
    }),
    o(window).scroll(function () {
      qodef.scroll = o(window).scrollTop();
    }),
    o(document).on("hendon_trigger_get_new_posts", function () {
      y.init(), n.init();
    });
  var t = {
      init: function () {
        t.addBodyClassName();
      },
      isBrowser: function (e) {
        var i = !1;
        switch (e) {
          case "chrome":
            i =
              /Chrome/.test(navigator.userAgent) &&
              /Google Inc/.test(navigator.vendor);
            break;
          case "safari":
            i =
              /Safari/.test(navigator.userAgent) &&
              /Apple Computer/.test(navigator.vendor);
            break;
          case "firefox":
            i = -1 < navigator.userAgent.toLowerCase().indexOf("firefox");
            break;
          case "ie":
            i =
              0 < window.navigator.userAgent.indexOf("MSIE ") ||
              !!navigator.userAgent.match(/Trident.*rv\:11\./);
            break;
          case "edge":
            i = /Edge\/\d./i.test(navigator.userAgent);
        }
        return i;
      },
      addBodyClassName: function () {
        o.each(["chrome", "safari", "firefox", "ie", "edge"], function (e, i) {
          t.isBrowser(i) &&
            void 0 !== qodef.body &&
            ("ie" === i && (i = "ms-explorer"),
            qodef.body.addClass("qodef-browser--" + i));
        });
      },
    },
    e = {
      init: function () {
        var e = o(
          ".qodef-instagram-list .sbi_photo, .qodef-social-share.qodef-layout--list li a, #qodef-author-info .qodef-m-social-icons a, .qodef-social-share.qodef-layout--dropdown .qodef-social-share-dropdown li a, .qodef-social-share-dropdown-opener"
        );
        e.length &&
          e.each(function () {
            o(this).append(
              '<svg class="qodef-svg-circle"><circle cx="50%" cy="50%" r="49%"></circle></svg>'
            );
          });
      },
    },
    y = {
      init: function (e) {
        (this.holder = o(".qodef-swiper-container")),
          o.extend(this.holder, e),
          this.holder.length &&
            this.holder.each(function () {
              y.createSlider(o(this));
            });
      },
      createSlider: function (e) {
        var i = y.getOptions(e),
          t = y.getEvents(e);
        new Swiper(e, Object.assign(i, t));
      },
      getOptions: function (e) {
        var i = void 0 !== e.data("options") ? e.data("options") : {},
          t =
            void 0 !== i.spaceBetween && "" !== i.spaceBetween
              ? i.spaceBetween
              : 0,
          n =
            void 0 !== i.slidesPerView && "" !== i.slidesPerView
              ? i.slidesPerView
              : 1,
          o =
            void 0 !== i.centeredSlides &&
            "" !== i.centeredSlides &&
            i.centeredSlides,
          a = void 0 === i.loop || "" === i.loop || i.loop,
          d = void 0 === i.autoplay || "" === i.autoplay || i.autoplay,
          s =
            void 0 !== i.speed && "" !== i.speed ? parseInt(i.speed, 10) : 3e3,
          r =
            void 0 !== i.speedAnimation && "" !== i.speedAnimation
              ? parseInt(i.speedAnimation, 10)
              : 800,
          l =
            void 0 !== i.customStages &&
            "" !== i.customStages &&
            i.customStages,
          f = void 0 !== i.outsideNavigation && "yes" === i.outsideNavigation,
          c = f
            ? ".swiper-button-next-" + i.unique
            : e.find(".swiper-button-next"),
          h = f
            ? ".swiper-button-prev-" + i.unique
            : e.find(".swiper-button-prev"),
          u = e.find(".swiper-pagination");
        !1 !== d && (d = { delay: s, disableOnInteraction: !1 });
        var g =
            void 0 !== i.slidesPerView1440 && "" !== i.slidesPerView1440
              ? i.slidesPerView1440
              : 5,
          p =
            void 0 !== i.slidesPerView1366 && "" !== i.slidesPerView1366
              ? i.slidesPerView1366
              : 4,
          m =
            void 0 !== i.slidesPerView1024 && "" !== i.slidesPerView1024
              ? i.slidesPerView1024
              : 3,
          w =
            void 0 !== i.slidesPerView768 && "" !== i.slidesPerView768
              ? i.slidesPerView768
              : 2,
          v =
            void 0 !== i.slidesPerView680 && "" !== i.slidesPerView680
              ? i.slidesPerView680
              : 1;
        l ||
          (n < 2
            ? (w = m = p = g = n)
            : n < 3
            ? (m = p = g = n)
            : n < 4
            ? (p = g = n)
            : n < 5 && (g = n));
        var q = {
          slidesPerView: n,
          centeredSlides: o,
          spaceBetween: t,
          autoplay: d,
          loop: a,
          speed: r,
          navigation: { nextEl: c, prevEl: h },
          pagination: { el: u, type: "bullets", clickable: !0 },
          breakpoints: {
            0: {
              slidesPerView:
                void 0 !== i.slidesPerView480 && "" !== i.slidesPerView480
                  ? i.slidesPerView480
                  : 1,
            },
            481: { slidesPerView: v },
            681: { slidesPerView: w },
            769: { slidesPerView: m },
            1025: { slidesPerView: p },
            1367: { slidesPerView: g },
            1441: { slidesPerView: n },
          },
        };
        return Object.assign(q, y.getSliderDatas(e));
      },
      getSliderDatas: function (e) {
        var i = e.data(),
          t = {};
        for (var n in i)
          i.hasOwnProperty(n) &&
            "options" !== n &&
            void 0 !== i[n] &&
            "" !== i[n] &&
            (t[n] = i[n]);
        return t;
      },
      getEvents: function (e) {
        return {
          on: {
            init: function () {
              e.addClass("qodef-swiper--initialized"),
                e
                  .parent()
                  .find(".swiper-button-prev")
                  .append(
                    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="74px" height="40px" viewBox="0 0 74 40" enable-background="new 0 0 74 40" xml:space="preserve"><g><circle opacity="0.5" fill="none" stroke="#C28562" cx="71%" cy="50%" r="24%" style=""></circle><circle fill="none" stroke="#C28562" cx="71%" cy="50%" r="24%"></circle></g><polygon fill="#C28562" points="49.525,14.265 48.898,15.044 54.481,19.541 6.444,19.541 6.444,20.541 54.464,20.541 48.901,24.954 49.522,25.737 56.7,20.044 "></polygon></svg>'
                  ),
                e
                  .parent()
                  .find(".swiper-button-next")
                  .append(
                    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="74px" height="40px" viewBox="0 0 74 40" enable-background="new 0 0 74 40" xml:space="preserve"><g><circle opacity="0.5" fill="none" stroke="#C28562" cx="71%" cy="50%" r="24%" style=""></circle><circle fill="none" stroke="#C28562" cx="71%" cy="50%" r="24%"></circle></g><polygon fill="#C28562" points="49.525,14.265 48.898,15.044 54.481,19.541 6.444,19.541 6.444,20.541 54.464,20.541 48.901,24.954 49.522,25.737 56.7,20.044 "></polygon></svg>'
                  );
            },
          },
        };
      },
    };
  qodef.qodefSwiper = y;
  var n = {
    init: function (e) {
      (this.holder = o(".qodef-magnific-popup")),
        o.extend(this.holder, e),
        this.holder.length &&
          this.holder.each(function () {
            var e = o(this);
            e.hasClass("qodef-popup-item")
              ? n.initSingleImagePopup(e)
              : e.hasClass("qodef-popup-gallery") && n.initGalleryPopup(e);
          });
    },
    initSingleImagePopup: function (e) {
      var i = e.data("type");
      e.magnificPopup({ type: i, titleSrc: "title", image: { cursor: null } });
    },
    initGalleryPopup: function (e) {
      var i = e.find(".qodef-popup-item"),
        t = n.generateGalleryItems(i);
      i.each(function (e) {
        o(this).magnificPopup({
          items: t,
          gallery: { enabled: !0 },
          index: e,
          type: "image",
          image: { cursor: null },
        });
      });
    },
    generateGalleryItems: function (e) {
      var t = [];
      return (
        e.length &&
          e.each(function () {
            var e = o(this),
              i = {
                src: e.attr("href"),
                title: e.attr("title"),
                type: e.data("type"),
              };
            t.push(i);
          }),
        t
      );
    },
  };
  qodef.qodefMagnificPopup = n;
  var i = {
    init: function (e, i) {
      return (
        (e = Math.ceil(e)),
        (i = Math.floor(i)),
        Math.floor(Math.random() * (i - e)) + e
      );
    },
  };
  qodef.qodefGetRandomIntegerInRange = i;
  qodef.qodefSplitTextToSpans = {
    init: function (i) {
      if (i.length) {
        var e = i.text().trim().split("");
        i.empty(),
          e.forEach(function (e) {
            i.append("<span>" + e + "</span>");
          });
      }
    },
  };
  var a = {
      init: function () {
        [
          [
            ".qodef-banner.qodef-layout--with-custom-icon",
            ".qodef-m-content",
            0,
            0,
            "ascending",
          ],
          [".qodef-icon-with-text.qodef-layout--top", "svg", 600, 0, "random"],
          [
            ".qodef-clients-list.qodef-item-layout--image-only.qodef-hover-animation--fade-in",
            ".qodef-e",
            500,
            0,
            "random",
          ],
          [
            ".qodef-video-button.qodef--has-img",
            ".qodef-m-image",
            0,
            0,
            "ascending",
          ],
          [
            ".qodef-image-with-text.qodef-image-outline.qodef-image-outline-top-right",
            ".qodef-m-image",
            0,
            0,
            "ascending",
          ],
        ].forEach(function (n) {
          var e = o(n[0]);
          if (e.length) {
            var i = e.find(n[1]);
            if (i.length) {
              var t = n[3];
              e.offset().top > 0.8 * qodef.windowHeight &&
                e.offset().top < 2 * qodef.windowHeight &&
                (t = -200),
                e.appear(
                  function () {
                    i.each(function (e) {
                      var i,
                        t = o(this);
                      "random" === n[4]
                        ? (i = qodef.qodefGetRandomIntegerInRange.init(0, n[2]))
                        : "ascending" === n[4] && (i = e * n[2]),
                        setTimeout(function () {
                          t.addClass("qodef--appear");
                        }, i);
                    });
                  },
                  { accX: 0, accY: t }
                );
            }
          }
        });
      },
    },
    d = {
      items: "",
      init: function (e) {
        (this.holder = o(".qodef-anchor")),
          o.extend(this.holder, e),
          this.holder.length &&
            ((d.items = this.holder),
            d.clickTrigger(),
            o(window).on("load", function () {
              d.checkAnchorOnScroll(), d.checkAnchorOnLoad();
            }));
      },
      clickTrigger: function () {
        d.items.on("click", function (e) {
          var i = d.getAnchorItem(this),
            t = i.attr("href"),
            n = i.prop("hash").split("#")[1],
            o = window.location.href,
            a = -1 < o.indexOf("#") ? o.split("#")[1] : 0;
          (t.indexOf("http") < 0 ||
            t === o ||
            (0 !== a &&
              t.substring(0, t.length - n.length - 1) ===
                o.substring(0, o.length - a.length - 1)) ||
            (0 === a && t.substring(0, t.length - n.length - 1) === o)) &&
            e.preventDefault(),
            d.animateScroll(i, n);
        });
      },
      checkAnchorOnLoad: function () {
        var i = window.location.hash.split("#")[1];
        void 0 !== i &&
          "" !== i &&
          d.items.length &&
          d.items.each(function () {
            var e = d.getAnchorItem(this);
            -1 < e.attr("href").indexOf(i) && d.animateScroll(e, i);
          });
      },
      checkAnchorOnScroll: function () {
        if (1024 < qodef.windowWidth) {
          var e = o("#qodef-page-inner *[id]");
          e.length &&
            e.each(function () {
              var e = o(this),
                i = o('[href*="#' + e.attr("id") + '"]');
              i.length &&
                (d.isTargetInView(e) && d.setActiveState(i),
                o(window).scroll(function () {
                  d.isTargetInView(e)
                    ? d.setActiveState(i)
                    : i.removeClass(d.getItemClasses(i));
                }));
            });
        }
      },
      isTargetInView: function (e) {
        var i = e[0].getBoundingClientRect(),
          t = window.innerHeight || document.documentElement.clientHeight;
        return !(
          Math.floor(100 - ((0 <= i.top ? 0 : i.top) / -+i.height) * 100) <
            20 || Math.floor(100 - ((i.bottom - t) / i.height) * 100) < 20
        );
      },
      getAnchorItem: function (e) {
        return "A" === e.tagName ? o(e) : o(e).children("a");
      },
      animateScroll: function (e, i) {
        var t = "" !== i ? o('[id="' + i + '"]') : "";
        if (t.length) {
          var n =
            t.offset().top -
            d.getHeaderHeight() -
            qodefGlobal.vars.adminBarHeight;
          return (
            d.setActiveState(e),
            qodef.html
              .stop()
              .animate({ scrollTop: Math.round(n) }, 1e3, function () {
                history.pushState && history.pushState(null, "", "#" + i);
              }),
            !1
          );
        }
      },
      getHeaderHeight: function () {
        var e = 0;
        return (
          1024 < qodef.windowWidth &&
            null !== qodefGlobal.vars.headerHeight &&
            "" !== qodefGlobal.vars.headerHeight &&
            (e = parseInt(qodefGlobal.vars.headerHeight, 10)),
          e
        );
      },
      setActiveState: function (e) {
        var i = !e.parent().hasClass("qodef-anchor"),
          t = d.getItemClasses(e);
        d.items.removeClass(t), i ? e.addClass(t) : e.parent().addClass(t);
      },
      getItemClasses: function (e) {
        return (
          "qodef-anchor--active" +
          (e.parents("#qodef-page-header")
            ? " current-menu-item current_page_item"
            : "")
        );
      },
    };
  qodef.qodefAnchor = d;
})(jQuery),
  (function (o) {
    "use strict";
    o(document).ready(function () {
      n.init();
    }),
      o(window).on("resize", function () {
        n.init();
      }),
      o(document).on("hendon_trigger_get_new_posts", function (e, i) {
        i.hasClass("qodef-blog") && (t.init(i), n.resize(i));
      });
    var t = {
        init: function (e) {
          var i = e
            .find(".wp-video-shortcode, .wp-audio-shortcode")
            .not(".mejs-container");
          i.length &&
            i.each(function () {
              var e = o(this);
              "function" == typeof e.mediaelementplayer &&
                e.mediaelementplayer();
            });
        },
      },
      n = {
        init: function () {
          var e = o(".qodef-blog");
          e.length && n.resize(e);
        },
        resize: function (e) {
          var i = e.find(".qodef-e-media iframe");
          i.length &&
            i.each(function () {
              var e = o(this),
                i = e.attr("width"),
                t = e.attr("height"),
                n = (e.width() / i) * t;
              e.css("height", n);
            });
        },
      };
  })(jQuery),
  (function (u) {
    "use strict";
    u(document).ready(function () {
      g.init();
    }),
      u(document).on("hendon_trigger_get_new_posts", function (e, i) {
        i.hasClass("qodef-filter--on") &&
          g.setVisibility(i, i.find(".qodef-m-filter-item.qodef--active"), !0);
      });
    var g = {
      init: function (e) {
        (this.holder = u(".qodef-filter--on")),
          u.extend(this.holder, e),
          this.holder.length &&
            this.holder.each(function () {
              var e = u(this),
                i = e.find(".qodef-m-filter-item");
              g.extendListHTML(e), g.clickEvent(e, i);
            });
      },
      extendListHTML: function (e) {
        e.children(".qodef-hidden-filter-items").length ||
          g.isMasonryLayout(e) ||
          e.append('<div class="qodef-hidden-filter-items"></div>');
      },
      clickEvent: function (t, n) {
        n.on("click", function (e) {
          e.preventDefault();
          var i = u(this);
          i.hasClass("qodef--active") ||
            (t.addClass("qodef--filter-loading"),
            n.removeClass("qodef--active"),
            i.addClass("qodef--active"),
            g.setVisibility(t, i));
        });
      },
      setVisibility: function (e, i, t) {
        var n = e.children(".qodef-hidden-filter-items"),
          o = n.length,
          a = o ? n.children(".qodef-grid-item") : "",
          d = e.find(".qodef-grid-inner"),
          s = d.children(".qodef-grid-item"),
          r = i.data("taxonomy"),
          l = i.data("filter"),
          f = "*" === l,
          c = f ? l : r + "-" + l,
          h = s.hasClass(c);
        o && !h && a.hasClass(c) && (h = !0),
          (t && f) ||
            (f || h || !g.hasLoadMore(e)
              ? (g.isMasonryLayout(e)
                  ? d.isotope({ filter: f ? "" : "." + c })
                  : (f ||
                      s.each(function () {
                        var e = u(this);
                        -1 === e.attr("class").indexOf(c) &&
                          e.hide(300, "linear", function () {
                            e.appendTo(n);
                          });
                      }),
                    a.length &&
                      a.each(function () {
                        var e = u(this),
                          i = e.attr("class");
                        (!f && -1 === i.indexOf(c)) ||
                          e.appendTo(d).show(300, "linear");
                      })),
                e.removeClass("qodef--filter-loading"))
              : qodef.body.trigger("hendon_trigger_load_more", [e]));
      },
      isMasonryLayout: function (e) {
        return e.hasClass("qodef-layout--masonry");
      },
      hasLoadMore: function (e) {
        return e.hasClass("qodef-pagination-type--load-more");
      },
    };
    qodef.qodefFilter = g;
  })(jQuery),
  (function (s) {
    "use strict";
    s(document).ready(function () {
      i.init();
    }),
      s(document).on("hendon_trigger_get_new_posts", function () {
        i.init();
      });
    var i = {
      init: function () {
        var e = s(".qodef-layout--justified-gallery");
        e.length &&
          e.each(function () {
            i.setJustifyGallery(s(this));
          });
      },
      setJustifyGallery: function (e) {
        var i = e.data("options"),
          t = e.children(".qodef-grid-inner"),
          n =
            void 0 !== i.justified_gallery_row_height &&
            "" !== i.justified_gallery_row_height
              ? i.justified_gallery_row_height
              : 150,
          o =
            void 0 !== i.justified_gallery_row_height_max &&
            "" !== i.justified_gallery_row_height_max &&
            i.justified_gallery_row_height_max,
          a = 2 * i.space_value,
          d =
            void 0 !== i.justified_gallery_treshold &&
            "" !== i.justified_gallery_treshold
              ? i.justified_gallery_treshold
              : 0.75;
        t.waitForImages(function () {
          "function" == typeof t.justifiedGallery &&
            t
              .justifiedGallery({
                captions: !1,
                rowHeight: n,
                maxRowHeight: o,
                margins: a,
                border: 0,
                lastRow: "nojustify",
                justifyThreshold: d,
                selector: ".qodef-grid-item",
              })
              .on("jg.complete jg.rowflush", function () {
                var i = s(this),
                  t = !1;
                i.find(".qodef-grid-item")
                  .addClass("show")
                  .each(function () {
                    var e = s(this);
                    e.height(Math.round(e.height())),
                      t ||
                        0 !== e.width() ||
                        (i.height(i.height() - e.height() - a), (t = !0));
                  });
              }),
            e.addClass("qodef--justified-gallery-init");
        });
      },
    };
    qodef.qodefJustifiedGallery = i;
  })(jQuery),
  (function (i) {
    "use strict";
    i(document).ready(function () {
      o.init();
    }),
      i(document).on("hendon_trigger_get_new_posts", function (e, i) {
        i.hasClass("qodef-layout--masonry") && o.init();
      });
    var o = {
      init: function (e) {
        (this.holder = i(".qodef-layout--masonry")),
          i.extend(this.holder, e),
          this.holder.length &&
            this.holder.each(function () {
              o.createMasonry(i(this));
            });
      },
      createMasonry: function (i) {
        var t = i.find(".qodef-grid-inner"),
          n = t.find(".qodef-grid-item");
        t.waitForImages(function () {
          if ("function" == typeof t.isotope) {
            if (
              (t.isotope({
                layoutMode: "packery",
                itemSelector: ".qodef-grid-item",
                percentPosition: !0,
                masonry: {
                  columnWidth: ".qodef-grid-masonry-sizer",
                  gutter: ".qodef-grid-masonry-gutter",
                },
              }),
              i.hasClass("qodef-items--fixed"))
            ) {
              var e = o.getFixedImageSize(t, n);
              o.setFixedImageProportionSize(t, n, e);
            }
            t.isotope("layout");
          }
          t.addClass("qodef--masonry-init");
        });
      },
      getFixedImageSize: function (e, i) {
        var t = e.find(".qodef-item--square");
        if (t.length) {
          var n = t.find("img"),
            o = n.width(),
            a = n.height();
          return o !== a ? a : o;
        }
        return (
          e.find(".qodef-grid-masonry-sizer").width() -
          2 * parseInt(i.css("paddingLeft"), 10)
        );
      },
      setFixedImageProportionSize: function (e, i, t) {
        var n = parseInt(i.css("paddingLeft"), 10),
          o = (e.find(".qodef-item--square"), e.find(".qodef-item--landscape")),
          a = e.find(".qodef-item--portrait"),
          d = e.find(".qodef-item--huge-square"),
          s = qodef.windowWidth <= 680;
        i.css("height", t),
          o.length && o.css("height", Math.round(t / 2)),
          a.length && a.css("height", Math.round(2 * (t + n))),
          s ||
            (o.length && o.css("height", t),
            d.length && d.css("height", Math.round(2 * (t + n))));
      },
    };
    qodef.qodefMasonryLayout = o;
  })(jQuery),
  (function (i) {
    "use strict";
    i(document).ready(function () {
      t.init();
    });
    var t = {
      init: function () {
        var e = i("#qodef-page-mobile-header");
        e.length && (t.initMobileHeaderOpener(e), t.initDropDownMobileMenu());
      },
      initMobileHeaderOpener: function (e) {
        var i = e.find(".qodef-mobile-header-opener");
        if (i.length) {
          var t = e.find(".qodef-mobile-header-navigation");
          i.on("tap click", function (e) {
            e.preventDefault(),
              t.is(":visible")
                ? (t.slideUp(450), i.removeClass("qodef--opened"))
                : (t.slideDown(450), i.addClass("qodef--opened"));
          });
        }
      },
      initDropDownMobileMenu: function () {
        var e = i(
          ".qodef-mobile-header-navigation .menu-item-has-children > a"
        );
        e.length &&
          e.each(function () {
            var o = i(this);
            o.on("tap click", function (e) {
              e.preventDefault();
              var i = o.parent(),
                t = i.siblings(".menu-item-has-children");
              if (i.hasClass("menu-item-has-children")) {
                var n = i.find("ul.sub-menu").first();
                n.is(":visible")
                  ? (n.slideUp(450), i.removeClass("qodef--opened"))
                  : (i.addClass("qodef--opened"),
                    0 === t.length
                      ? i.find(".sub-menu").slideUp(400, function () {
                          n.slideDown(400);
                        })
                      : i
                          .siblings()
                          .removeClass("qodef--opened")
                          .find(".sub-menu")
                          .slideUp(400, function () {
                            n.slideDown(400);
                          }));
              }
            });
          });
      },
    };
  })(jQuery),
  (function (s) {
    s(document).ready(function () {
      e.init();
    });
    var e = {
      init: function () {
        var e = s(
          ".qodef-header-navigation.qodef-header-navigation-initial > ul > li.qodef-menu-item--narrow.menu-item-has-children"
        );
        e.length &&
          e.each(function (e) {
            var i,
              t = s(this),
              n = t.offset().left,
              o = t.find(" > ul"),
              a = o.outerWidth(),
              d = s(window).width() - n;
            0 < t.find("li.menu-item-has-children").length && (i = d - a),
              o.removeClass("qodef-drop-down--right"),
              (d < a || i < a) && o.addClass("qodef-drop-down--right");
          });
      },
    };
  })(jQuery),
  (function (a) {
    "use strict";
    a(document).ready(function () {
      d.init();
    }),
      a(window).scroll(function () {
        d.scroll();
      }),
      a(document).on("hendon_trigger_load_more", function (e, i, t) {
        d.triggerLoadMore(i, t);
      });
    var d = {
      init: function (e) {
        (this.holder = a(".qodef-pagination--on")),
          a.extend(this.holder, e),
          this.holder.length &&
            this.holder.each(function () {
              var e = a(this);
              d.initPaginationType(e);
            });
      },
      scroll: function (e) {
        (this.holder = a(".qodef-pagination--on")),
          a.extend(this.holder, e),
          this.holder.length &&
            this.holder.each(function () {
              var e = a(this);
              e.hasClass("qodef-pagination-type--infinite-scroll") &&
                d.initInfiniteScroll(e);
            });
      },
      initPaginationType: function (e) {
        e.hasClass("qodef-pagination-type--standard")
          ? d.initStandard(e)
          : e.hasClass("qodef-pagination-type--load-more")
          ? d.initLoadMore(e)
          : e.hasClass("qodef-pagination-type--infinite-scroll") &&
            d.initInfiniteScroll(e);
      },
      initStandard: function (n) {
        var e = n.find(".qodef-m-pagination-items");
        if (e.length) {
          var o = n.data("options");
          e.children().each(function () {
            var i = a(this),
              t = i.children("a");
            d.changeStandardState(n, o.max_pages_num, 1),
              t.on("click", function (e) {
                e.preventDefault(),
                  i.hasClass("qodef--active") ||
                    d.getNewPosts(n, t.data("paged"));
              });
          });
        }
      },
      changeStandardState: function (e, i, t) {
        if (e.hasClass("qodef-pagination-type--standard")) {
          var n = e.find(".qodef-m-pagination-items"),
            o = n.children(".qodef--number"),
            a = n.children(".qodef--prev"),
            d = n.children(".qodef--next");
          o
            .removeClass("qodef--active")
            .eq(t - 1)
            .addClass("qodef--active"),
            a.children().data("paged", t - 1),
            1 < t ? a.show() : a.hide(),
            d.children().data("paged", t + 1),
            t === i ? d.hide() : d.show();
        }
      },
      initLoadMore: function (i) {
        i.find(".qodef-load-more-button").on("click", function (e) {
          e.preventDefault(), d.getNewPosts(i);
        });
      },
      triggerLoadMore: function (e, i) {
        d.getNewPosts(e, i);
      },
      hideLoadMoreButton: function (e, i) {
        e.hasClass("qodef-pagination-type--load-more") &&
          i.next_page > i.max_pages_num &&
          e.find(".qodef-load-more-button").hide();
      },
      initInfiniteScroll: function (e) {
        var i = e.outerHeight() + e.offset().top,
          t = qodef.scroll + qodef.windowHeight,
          n = e.data("options");
        !e.hasClass("qodef--loading") &&
          i < t &&
          n.max_pages_num >= n.next_page &&
          d.getNewPosts(e);
      },
      getNewPosts: function (i, t) {
        i.addClass("qodef--loading");
        var n = i.children(".qodef-grid-inner"),
          o = i.data("options");
        d.setNextPageValue(o, t, !1),
          a.ajax({
            type: "GET",
            url:
              qodefGlobal.vars.restUrl + qodefGlobal.vars.paginationRestRoute,
            data: { options: o },
            beforeSend: function (e) {
              e.setRequestHeader("X-WP-Nonce", qodefGlobal.vars.restNonce);
            },
            success: function (e) {
              "success" === e.status
                ? (d.setNextPageValue(o, t, !0),
                  d.changeStandardState(i, o.max_pages_num, t),
                  n.waitForImages(function () {
                    d.addPosts(n, e.data.html, t),
                      d.reInitMasonryPosts(i, n),
                      qodef.body.trigger("hendon_trigger_get_new_posts", [
                        i,
                        e.data,
                        t,
                      ]);
                  }),
                  i.hasClass("qodef-pagination-type--standard") &&
                    a("html, body").animate(
                      { scrollTop: i.offset().top - 100 },
                      500
                    ),
                  d.hideLoadMoreButton(i, o))
                : console.log(e.message);
            },
            complete: function () {
              i.removeClass("qodef--loading");
            },
          });
      },
      setNextPageValue: function (e, i, t) {
        void 0 === i || "" === i || t
          ? t && (e.next_page = parseInt(e.next_page, 10) + 1)
          : (e.next_page = i);
      },
      addPosts: function (e, i, t) {
        void 0 !== t && "" !== t ? e.html(i) : e.append(i);
      },
      reInitMasonryPosts: function (e, i) {
        e.hasClass("qodef-layout--masonry") &&
          (i.isotope("reloadItems").isotope({ sortBy: "original-order" }),
          setTimeout(function () {
            i.isotope("layout");
          }, 200));
      },
    };
    qodef.qodefPagination = d;
  })(jQuery);
!(function (n) {
  "use strict";
  "object" != typeof qodef && (window.qodef = {}),
    (window.qodefCore = {}),
    (qodefCore.shortcodes = {}),
    (qodefCore.listShortcodesScripts = {
      qodefSwiper: qodef.qodefSwiper,
      qodefPagination: qodef.qodefPagination,
      qodefFilter: qodef.qodefFilter,
      qodefMasonryLayout: qodef.qodefMasonryLayout,
      qodefJustifiedGallery: qodef.qodefJustifiedGallery,
    }),
    (qodefCore.body = n("body")),
    (qodefCore.html = n("html")),
    (qodefCore.windowWidth = n(window).width()),
    (qodefCore.windowHeight = n(window).height()),
    (qodefCore.scroll = 0),
    n(document).ready(function () {
      (qodefCore.scroll = n(window).scrollTop()), e.init();
    }),
    n(window).resize(function () {
      (qodefCore.windowWidth = n(window).width()),
        (qodefCore.windowHeight = n(window).height());
    }),
    n(window).scroll(function () {
      qodefCore.scroll = n(window).scrollTop();
    });
  var t = {
    disable: function () {
      window.addEventListener &&
        window.addEventListener("wheel", t.preventDefaultValue, {
          passive: !1,
        }),
        (document.onkeydown = t.keyDown);
    },
    enable: function () {
      window.removeEventListener &&
        window.removeEventListener("wheel", t.preventDefaultValue, {
          passive: !1,
        }),
        (window.onmousewheel = document.onmousewheel = document.onkeydown = null);
    },
    preventDefaultValue: function (e) {
      (e = e || window.event).preventDefault && e.preventDefault(),
        (e.returnValue = !1);
    },
    keyDown: function (e) {
      for (var o = [37, 38, 39, 40], n = o.length; n--; )
        if (e.keyCode === o[n]) return void t.preventDefaultValue(e);
    },
  };
  qodefCore.qodefScroll = t;
  var o = {
    init: function (e) {
      e.length && o.qodefInitScroll(e);
    },
    qodefInitScroll: function (e) {
      var o = new PerfectScrollbar(e.selector, {
        wheelSpeed: 0.6,
        suppressScrollX: !0,
      });
      n(window).resize(function () {
        o.update();
      });
    },
  };
  qodefCore.qodefPerfectScrollbar = o;
  var e = {
    init: function () {
      if (
        ((this.holder = n("#hendon-core-page-inline-style")),
        this.holder.length)
      ) {
        var e = this.holder.data("style");
        e.length &&
          n("head").append('<style type="text/css">' + e + "</style>");
      }
    },
  };
})(jQuery),
  (function (o) {
    "use strict";
    o(document).ready(function () {
      n.init();
    });
    var n = {
      init: function () {
        if (
          ((this.holder = o("#qodef-age-verification-modal")),
          this.holder.length)
        ) {
          var e = this.holder.find(".qodef-m-content-prevent");
          if (e.length)
            e.find(".qodef-prevent--yes").on("click", function () {
              var e = new Date();
              e.setTime(e.getTime() + 6048e5);
              var o = "expires=" + e.toUTCString();
              (document.cookie =
                "disabledAgeVerification=Yes;" + o + ";path=/"),
                n.handleClassAndScroll("remove");
            });
        }
      },
      handleClassAndScroll: function (e) {
        "remove" === e &&
          (qodefCore.body.removeClass("qodef-age-verification--opened"),
          qodefCore.qodefScroll.enable()),
          "add" === e &&
            (qodefCore.body.addClass("qodef-age-verification--opened"),
            qodefCore.qodefScroll.disable());
      },
    };
  })(jQuery),
  (function (a) {
    "use strict";
    a(document).ready(function () {
      d.init();
    });
    var d = {
      init: function () {
        (this.holder = a("#qodef-back-to-top")),
          this.holder.length &&
            (this.holder.on("click", function (e) {
              e.preventDefault(), d.animateScrollToTop();
            }),
            d.showHideBackToTop());
      },
      animateScrollToTop: function () {
        var o,
          n = qodef.scroll,
          t = qodef.scroll,
          i = function () {
            if (0 !== t) {
              t < 1e-4 && (t = 0);
              var e = d.easingFunction((n - t) / n);
              a("html, body").scrollTop(n - (n - t) * e),
                (t *= 0.9),
                (o = requestAnimationFrame(i));
            }
          };
        i(),
          a("html, body").one("wheel touchstart", function () {
            cancelAnimationFrame(o);
          });
      },
      easingFunction: function (e) {
        return 0 == e ? 0 : Math.pow(1024, e - 1);
      },
      showHideBackToTop: function () {
        a(window).scroll(function () {
          var e = a(this),
            o = e.scrollTop(),
            n = e.height();
          (0 < o ? o + n / 2 : 1) < 1e3 ? d.addClass("off") : d.addClass("on");
        });
      },
      addClass: function (e) {
        this.holder.removeClass("qodef--off qodef--on"),
          "on" === e
            ? this.holder.addClass("qodef--on")
            : this.holder.addClass("qodef--off");
      },
    };
  })(jQuery),
  (function (n) {
    "use strict";
    n(window).on("load", function () {
      e.init();
    });
    var e = {
      holder: "",
      init: function () {
        (this.holder = n("#qodef-page-footer.qodef--uncover")),
          this.holder.length &&
            !qodefCore.html.hasClass("touchevents") &&
            (e.addClass(),
            e.setHeight(this.holder),
            n(window).resize(function () {
              e.setHeight(e.holder);
            }));
      },
      setHeight: function (e) {
        e.css("height", "auto");
        var o = e.outerHeight();
        0 < o &&
          (n("#qodef-page-outer").css({
            "margin-bottom": o,
            "background-color": qodefCore.body.css("backgroundColor"),
          }),
          e.css("height", o));
      },
      addClass: function () {
        qodefCore.body.addClass("qodef-page-footer--uncover");
      },
    };
  })(jQuery),
  (function (n) {
    "use strict";
    n(document).ready(function () {
      t.init();
    });
    var t = {
      init: function () {
        var e = n("a.qodef-fullscreen-menu-opener"),
          o = n("#qodef-fullscreen-area nav ul li a");
        e.on("click", function (e) {
          e.preventDefault(),
            qodefCore.body.hasClass("qodef-fullscreen-menu--opened")
              ? t.closeFullscreen()
              : (t.openFullscreen(),
                n(document).keyup(function (e) {
                  27 === e.keyCode && t.closeFullscreen();
                }));
        }),
          o.on("tap click", function (e) {
            var o = n(this);
            o.parent().hasClass("menu-item-has-children")
              ? (e.preventDefault(), t.clickItemWithChild(o))
              : "http://#" !== n(this).attr("href") &&
                "#" !== n(this).attr("href") &&
                t.closeFullscreen();
          });
      },
      openFullscreen: function () {
        qodefCore.body
          .removeClass("qodef-fullscreen-menu-animate--out")
          .addClass(
            "qodef-fullscreen-menu--opened qodef-fullscreen-menu-animate--in"
          ),
          qodefCore.qodefScroll.disable();
      },
      closeFullscreen: function () {
        qodefCore.body
          .removeClass(
            "qodef-fullscreen-menu--opened qodef-fullscreen-menu-animate--in"
          )
          .addClass("qodef-fullscreen-menu-animate--out"),
          qodefCore.qodefScroll.enable(),
          n("nav.qodef-fullscreen-menu ul.sub_menu").slideUp(200);
      },
      clickItemWithChild: function (e) {
        var o = e.parent(),
          n = o.find(".sub-menu").first();
        n.is(":visible")
          ? n.slideUp(300)
          : (n.slideDown(300), o.siblings().find(".sub-menu").slideUp(400));
      },
    };
  })(jQuery),
  (function () {
    "use strict";
    jQuery(document).ready(function () {
      e.init();
    });
    var e = {
      appearanceType: function () {
        return -1 !==
          qodefCore.body.attr("class").indexOf("qodef-header-appearance--")
          ? qodefCore.body
              .attr("class")
              .match(/qodef-header-appearance--([\w]+)/)[1]
          : "";
      },
      init: function () {
        var e = this.appearanceType();
        "" !== e && "none" !== e && qodefCore[e + "HeaderAppearance"]();
      },
    };
  })(),
  (function (t) {
    "use strict";
    t(document).ready(function () {
      i.init();
    });
    var i = {
      init: function () {
        if (qodefCore.body.hasClass("qodef-mobile-header-appearance--sticky")) {
          var e = qodefCore.scroll,
            o =
              qodefGlobal.vars.mobileHeaderHeight +
              qodefGlobal.vars.adminBarHeight,
            n = t("#qodef-page-outer");
          i.showHideMobileHeader(e, o, n),
            t(window).scroll(function () {
              i.showHideMobileHeader(e, o, n), (e = qodefCore.scroll);
            }),
            t(window).resize(function () {
              n.css("padding-top", 0), i.showHideMobileHeader(e, o, n);
            });
        }
      },
      showHideMobileHeader: function (e, o, n) {
        qodefCore.windowWidth <= 1024 &&
          (qodefCore.scroll > 2 * o
            ? (qodefCore.body.addClass("qodef-mobile-header--sticky"),
              setTimeout(function () {
                qodefCore.body.addClass(
                  "qodef-mobile-header--sticky-animation"
                );
              }, 300),
              n.css("padding-top", qodefGlobal.vars.mobileHeaderHeight))
            : (qodefCore.body.removeClass("qodef-mobile-header--sticky"),
              setTimeout(function () {
                qodefCore.body.removeClass(
                  "qodef-mobile-header--sticky-animation"
                );
              }, 300),
              n.css("padding-top", 0)),
          (qodefCore.scroll > e && qodefCore.scroll > o) ||
          qodefCore.scroll < 3 * o
            ? qodefCore.body.removeClass("qodef-mobile-header--sticky-display")
            : qodefCore.body.addClass("qodef-mobile-header--sticky-display"));
      },
    };
  })(jQuery),
  (function (r) {
    "use strict";
    r(document).ready(function () {
      e.init();
    });
    var e = {
      init: function () {
        e.dropdownBehavior(), e.wideDropdownPosition(), e.dropdownPosition();
      },
      dropdownBehavior: function () {
        r(".qodef-header-navigation > ul > li").each(function () {
          var i = r(this);
          i.find(".qodef-drop-down-second").length &&
            i.waitForImages(function () {
              var e = i.find(".qodef-drop-down-second"),
                o = e.find(".qodef-drop-down-second-inner ul").outerHeight();
              if (navigator.userAgent.match(/(iPod|iPhone|iPad)/))
                i.on("touchstart mouseenter", function () {
                  e.css({
                    height: o,
                    overflow: "visible",
                    visibility: "visible",
                    opacity: "1",
                  });
                }).on("mouseleave", function () {
                  e.css({
                    height: "0px",
                    overflow: "hidden",
                    visibility: "hidden",
                    opacity: "0",
                  });
                });
              else if (
                qodefCore.body.hasClass(
                  "qodef-drop-down-second--animate-height"
                )
              ) {
                var n = {
                  interval: 0,
                  over: function () {
                    setTimeout(function () {
                      e.addClass("qodef-drop-down--start").css({
                        visibility: "visible",
                        height: "0",
                        opacity: "1",
                      }),
                        e
                          .stop()
                          .animate(
                            { height: o },
                            400,
                            "easeInOutQuint",
                            function () {
                              e.css("overflow", "visible");
                            }
                          );
                    }, 100);
                  },
                  timeout: 100,
                  out: function () {
                    e
                      .stop()
                      .animate({ height: "0", opacity: 0 }, 100, function () {
                        e.css({ overflow: "hidden", visibility: "hidden" });
                      }),
                      e.removeClass("qodef-drop-down--start");
                  },
                };
                i.hoverIntent(n);
              } else {
                var t = {
                  interval: 0,
                  over: function () {
                    setTimeout(function () {
                      e.addClass("qodef-drop-down--start")
                        .stop()
                        .css({ height: o });
                    }, 150);
                  },
                  timeout: 150,
                  out: function () {
                    e.stop()
                      .css({ height: "0" })
                      .removeClass("qodef-drop-down--start");
                  },
                };
                i.hoverIntent(t);
              }
            });
        });
      },
      wideDropdownPosition: function () {
        var e = r(".qodef-header-navigation > ul > li.qodef-menu-item--wide");
        e.length &&
          e.each(function () {
            var e = r(this).find(".qodef-drop-down-second");
            if (e.length) {
              e.css("left", 0);
              var o = e.offset().left;
              if (qodefCore.body.hasClass("qodef--boxed")) {
                var n = r(".qodef--boxed #qodef-page-wrapper").outerWidth();
                (o -= (qodefCore.windowWidth - n) / 2),
                  e.css({ left: -o, width: n });
              } else
                qodefCore.body.hasClass("qodef-drop-down-second--full-width")
                  ? e.css({ left: -o })
                  : e.css({
                      left: -o + (qodefCore.windowWidth - e.width()) / 2,
                    });
            }
          });
      },
      dropdownPosition: function () {
        var e = r(
          ".qodef-header-navigation > ul > li.qodef-menu-item--narrow.menu-item-has-children"
        );
        e.length &&
          e.each(function () {
            var e,
              o = r(this),
              n = o.offset().left,
              t = o.find(".qodef-drop-down-second"),
              i = t.find(".qodef-drop-down-second-inner ul"),
              a = i.outerWidth(),
              d = r(window).width() - n;
            qodef.body.hasClass("qodef--boxed") &&
              (d = r(".qodef--boxed #qodef-page-wrapper").outerWidth() - n);
            0 < o.find("li.menu-item-has-children").length && (e = d - a),
              t.removeClass("qodef-drop-down--right"),
              i.removeClass("qodef-drop-down--right"),
              (d < a || e < a) &&
                (t.addClass("qodef-drop-down--right"),
                i.addClass("qodef-drop-down--right"));
          });
      },
    };
  })(jQuery),
  (function (t) {
    "use strict";
    t(window).on("load", function () {
      d.init();
    });
    var d = {
      init: function (e) {
        (this.$sections = t(".qodef-parallax")), t.extend(this.$sections, e);
        var o =
          !qodef.windowWidth < 1024 &&
          !qodefCore.body.hasClass("qodef-browser--edge") &&
          !qodefCore.body.hasClass("qodef-browser--ms-explorer");
        this.$sections.length &&
          o &&
          this.$sections.each(function () {
            d.ready(t(this));
          });
      },
      ready: function (e) {
        (e.$imgHolder = e.find(".qodef-parallax-img-holder")),
          (e.$imgWrapper = e.find(".qodef-parallax-img-wrapper")),
          (e.$img = e.find("img"));
        var o = e.outerHeight(),
          n = e.$imgWrapper.height();
        (e.movement = (300 * (n - o)) / o / 2),
          (e.buffer = window.pageYOffset),
          (e.scrollBuffer = null),
          requestAnimationFrame(function () {
            e.$imgHolder.animate({ opacity: 1 }, 100), d.calc(e), d.loop(e);
          }),
          t(window).on("resize", function () {
            d.calc(e);
          });
      },
      calc: function (e) {
        var o = e.$imgWrapper.height(),
          n = e.$imgWrapper.width();
        e.$img.width() < n && e.$img.css({ width: "100%", height: "auto" }),
          e.$img.height() < o &&
            e.$img.css({ height: "100%", width: "auto", "max-width": "unset" });
      },
      loop: function (e) {
        if (e.scrollBuffer === Math.round(window.pageYOffset))
          return (
            requestAnimationFrame(function () {
              d.loop(e);
            }),
            !1
          );
        e.scrollBuffer = Math.round(window.pageYOffset);
        var o = window.outerHeight,
          n = e.offset().top,
          t = e.outerHeight();
        if (e.scrollBuffer + 1.2 * o > n && e.scrollBuffer < n + t) {
          var i = (Math.abs(e.scrollBuffer + o - n) / (o + t)).toFixed(4),
            a = (i * e.movement).toFixed(4);
          e.buffer !== i &&
            e.$imgWrapper.css("transform", "translate3d(0," + a + "%, 0)"),
            (e.buffer = i);
        }
        requestAnimationFrame(function () {
          d.loop(e);
        });
      },
    };
    qodefCore.qodefParallaxBackground = d;
  })(jQuery),
  (function (a) {
    "use strict";
    a(document).ready(function () {
      e.init();
    });
    var e = {
      init: function () {
        function i(e, o) {
          for (var n = 0; n < e.length; n++) {
            var t = e[n];
            n < o ? a(t).addClass("active") : a(t).removeClass("active");
          }
        }
        var e = a("#qodef-page-comments-form .qodef-rating-inner");
        e.each(function () {
          var e = a(this),
            o = e.find(".qodef-rating"),
            n = o.val(),
            t = e.find(".qodef-star-rating");
          i(t, n),
            t.on("click", function () {
              o.val(a(this).data("value")).trigger("change");
            }),
            o.change(function () {
              (n = o.val()), i(t, n);
            });
        });
      },
    };
  })(jQuery),
  (function (t) {
    "use strict";
    t(document).ready(function () {
      i.init();
    });
    var i = {
      init: function () {
        var e = t("a.qodef-side-area-opener"),
          o = t("#qodef-side-area-close"),
          n = t("#qodef-side-area");
        i.openerHoverColor(e),
          e.on("click", function (e) {
            e.preventDefault(),
              qodefCore.body.hasClass("qodef-side-area--opened")
                ? i.closeSideArea()
                : (i.openSideArea(),
                  t(document).keyup(function (e) {
                    27 === e.keyCode && i.closeSideArea();
                  }));
          }),
          o.on("click", function (e) {
            e.preventDefault(), i.closeSideArea();
          }),
          n.length &&
            "object" == typeof qodefCore.qodefPerfectScrollbar &&
            qodefCore.qodefPerfectScrollbar.init(n);
      },
      openSideArea: function () {
        var e = t("#qodef-page-wrapper"),
          o = t(window).scrollTop();
        t(".qodef-side-area-cover").remove(),
          e.prepend('<div class="qodef-side-area-cover"/>'),
          qodefCore.body
            .removeClass("qodef-side-area-animate--out")
            .addClass("qodef-side-area--opened qodef-side-area-animate--in"),
          t(".qodef-side-area-cover").on("click", function (e) {
            e.preventDefault(), i.closeSideArea();
          }),
          t(window).scroll(function () {
            400 < Math.abs(qodefCore.scroll - o) && i.closeSideArea();
          });
      },
      closeSideArea: function () {
        qodefCore.body
          .removeClass("qodef-side-area--opened qodef-side-area-animate--in")
          .addClass("qodef-side-area-animate--out");
      },
      openerHoverColor: function (e) {
        if (void 0 !== e.data("hover-color")) {
          var o = e.data("hover-color"),
            n = e.css("color");
          e.on("mouseenter", function () {
            e.css("color", o);
          }).on("mouseleave", function () {
            e.css("color", n);
          });
        }
      },
    };
  })(jQuery),
  (function (i) {
    "use strict";
    i(document).ready(function () {
      o.init();
    });
    var o = {
      init: function () {
        (this.holder = i("#qodef-page-spinner:not(.qodef-layout--hendon)")),
          this.holder.length && o.animateSpinner(this.holder);
      },
      animateSpinner: function (e) {
        i(window).on("load", function () {
          o.fadeOutLoader(e);
        }),
          window.elementorFrontend && o.fadeOutLoader(e);
      },
      fadeOutLoader: function (o, n, e, t) {
        (n = n || 600),
          (e = e || 0),
          (t = t || "swing"),
          o.delay(e).fadeOut(n, t),
          i(window).on("bind", "pageshow", function (e) {
            e.originalEvent.persisted && o.fadeOut(n, t);
          });
      },
    };
  })(jQuery),
  (function (d) {
    "use strict";
    d(window).on("load", function () {
      r.init();
    });
    var r = {
      init: function () {
        if (
          ((this.holder = d("#qodef-subscribe-popup-modal")),
          this.holder.length)
        ) {
          var e = this.holder.find(".qodef-sp-prevent"),
            o = d(".qodef-sp-close"),
            n = "no";
          if (e.length) {
            var t = this.holder.hasClass("qodef-sp-prevent-cookies"),
              i = e.find(".qodef-sp-prevent-input"),
              a = i.data("value");
            t
              ? ((n = localStorage.getItem("disabledPopup")),
                sessionStorage.removeItem("disabledPopup"))
              : ((n = sessionStorage.getItem("disabledPopup")),
                localStorage.removeItem("disabledPopup")),
              e.children().on("click", function (e) {
                "yes" !== a
                  ? ((a = "yes"),
                    i.addClass("qodef-sp-prevent-clicked").data("value", "yes"))
                  : ((a = "no"),
                    i
                      .removeClass("qodef-sp-prevent-clicked")
                      .data("value", "no")),
                  "yes" === a
                    ? t
                      ? localStorage.setItem("disabledPopup", "yes")
                      : sessionStorage.setItem("disabledPopup", "yes")
                    : t
                    ? localStorage.setItem("disabledPopup", "no")
                    : sessionStorage.setItem("disabledPopup", "no");
              });
          }
          "yes" !== n &&
            (qodefCore.body.hasClass("qodef-sp-opened")
              ? r.handleClassAndScroll("remove")
              : r.handleClassAndScroll("add"),
            o.on("click", function (e) {
              e.preventDefault(), r.handleClassAndScroll("remove");
            }),
            d(document).keyup(function (e) {
              27 === e.keyCode && r.handleClassAndScroll("remove");
            }));
        }
      },
      handleClassAndScroll: function (e) {
        "remove" === e &&
          (qodefCore.body.removeClass("qodef-sp-opened"),
          qodefCore.qodefScroll.enable()),
          "add" === e &&
            (qodefCore.body.addClass("qodef-sp-opened"),
            qodefCore.qodefScroll.disable());
      },
    };
  })(jQuery),
  (function (t) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_accordion = {}),
      t(document).ready(function () {
        o.init();
      });
    var o = {
      init: function () {
        (this.holder = t(".qodef-accordion")),
          this.holder.length &&
            this.holder.each(function () {
              var e = t(this);
              e.hasClass("qodef-behavior--accordion") && o.initAccordion(e),
                e.hasClass("qodef-behavior--toggle") && o.initToggle(e),
                e.addClass("qodef--init");
            });
      },
      initAccordion: function (e) {
        e.accordion({
          animate: "swing",
          collapsible: !0,
          active: 0,
          icons: "",
          heightStyle: "content",
        });
      },
      initToggle: function (e) {
        var o = e.find(".qodef-accordion-title"),
          n = o.next();
        e.addClass(
          "accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset"
        ),
          o.addClass(
            "ui-accordion-header ui-state-default ui-corner-top ui-corner-bottom"
          ),
          n
            .addClass(
              "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"
            )
            .hide(),
          o.each(function () {
            var e = t(this);
            e.hover(function () {
              e.toggleClass("ui-state-hover");
            }),
              e.on("click", function () {
                e.toggleClass(
                  "ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom"
                ),
                  e
                    .next()
                    .toggleClass("ui-accordion-content-active")
                    .slideToggle(400);
              });
          });
      },
    };
    qodefCore.shortcodes.hendon_core_accordion.qodefAccordion = o;
  })(jQuery),
  (function (o) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_button = {}),
      o(document).ready(function () {
        t.init();
      });
    var t = {
      init: function () {
        (this.buttons = o(".qodef-button")),
          this.buttons.length &&
            this.buttons.each(function () {
              var e = o(this);
              t.buttonHoverColor(e),
                t.buttonHoverBgColor(e),
                t.buttonHoverBorderColor(e),
                t.buttonBordersAnimation(e);
            });
      },
      buttonHoverColor: function (e) {
        if (void 0 !== e.data("hover-color")) {
          var o = e.data("hover-color"),
            n = e.css("color");
          e.on("mouseenter", function () {
            t.changeColor(e, "color", o);
          }),
            e.on("mouseleave", function () {
              t.changeColor(e, "color", n);
            });
        }
      },
      buttonHoverBgColor: function (e) {
        if (void 0 !== e.data("hover-background-color")) {
          var o = e.data("hover-background-color"),
            n = e.css("background-color");
          e.on("mouseenter", function () {
            t.changeColor(e, "background-color", o);
          }),
            e.on("mouseleave", function () {
              t.changeColor(e, "background-color", n);
            });
        }
      },
      buttonHoverBorderColor: function (e) {
        if (
          void 0 !== e.data("hover-border-color") &&
          !e.hasClass("qodef-layout--outlined") &&
          !e.hasClass("qodef-layout--filled")
        ) {
          var o = e.data("hover-border-color"),
            n = e.css("borderTopColor");
          e.on("mouseenter", function () {
            t.changeColor(e, "border-color", o);
          }),
            e.on("mouseleave", function () {
              t.changeColor(e, "border-color", n);
            });
        }
      },
      changeColor: function (e, o, n) {
        e.css(o, n);
      },
      buttonBordersAnimation: function (e) {
        if (
          e.hasClass("qodef-layout--outlined") ||
          e.hasClass("qodef-layout--filled") ||
          e.hasClass("qodef-type--filled")
        ) {
          var o = e.data("border-color"),
            n = e.data("hover-border-color");
          t.appendBorders(e),
            setTimeout(function () {
              e.find(".qodef-border-holder").css("border-color", o),
                e.find(".qodef-border-holder span").css("background-color", n),
                e.addClass("qodef-layout--borders-animated");
            }, 10);
        }
      },
      appendBorders: function (e) {
        e.prepend(
          '<span class="qodef-border-holder"><span class="qodef-top-border"></span><span class="qodef-right-border"></span><span class="qodef-bottom-border"></span><span class="qodef-left-border"></span></span>'
        );
      },
    };
    qodefCore.shortcodes.hendon_core_button.qodefButton = t;
  })(jQuery),
  (function (t) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_cards_gallery = {}),
      t(document).ready(function () {
        o.init();
      });
    var o = {
      init: function () {
        (this.holder = t(".qodef-cards-gallery")),
          this.holder.length &&
            this.holder.each(function () {
              var e = t(this);
              o.initCards(e), o.initBundle(e);
            });
      },
      initCards: function (o) {
        var n = o.find(".qodef-m-card");
        n.each(function () {
          var e = t(this);
          e.on("click", function () {
            if (!n.last().is(e))
              return (
                e
                  .addClass("qodef-out qodef-animating")
                  .siblings()
                  .addClass("qodef-animating-siblings"),
                e.detach(),
                e.insertAfter(n.last()),
                setTimeout(function () {
                  e.removeClass("qodef-out");
                }, 200),
                setTimeout(function () {
                  e.removeClass("qodef-animating")
                    .siblings()
                    .removeClass("qodef-animating-siblings");
                }, 1200),
                (n = o.find(".qodef-m-card")),
                !1
              );
          });
        });
      },
      initBundle: function (e) {
        e.hasClass("qodef-animation--bundle") &&
          !qodefCore.html.hasClass("touchevents") &&
          e.appear(
            function () {
              e.addClass("qodef-appeared"),
                e
                  .find("img")
                  .one(
                    "animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd",
                    function () {
                      t(this).addClass("qodef-animation-done");
                    }
                  );
            },
            { accX: 0, accY: -100 }
          );
      },
    };
    qodefCore.shortcodes.hendon_core_cards_gallery.qodefCardsGallery = o;
  })(jQuery),
  (function (r) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_countdown = {}),
      r(document).ready(function () {
        t.init();
      });
    var t = {
      init: function () {
        (this.countdowns = r(".qodef-countdown")),
          this.countdowns.length &&
            this.countdowns.each(function () {
              var e = r(this),
                o = e.find(".qodef-m-date"),
                n = t.generateOptions(e);
              t.initCountdown(o, n);
            });
      },
      generateOptions: function (e) {
        var o = {};
        return (
          (o.date = void 0 !== e.data("date") ? e.data("date") : null),
          (o.weekLabel =
            void 0 !== e.data("week-label") ? e.data("week-label") : ""),
          (o.weekLabelPlural =
            void 0 !== e.data("week-label-plural")
              ? e.data("week-label-plural")
              : ""),
          (o.dayLabel =
            void 0 !== e.data("day-label") ? e.data("day-label") : ""),
          (o.dayLabelPlural =
            void 0 !== e.data("day-label-plural")
              ? e.data("day-label-plural")
              : ""),
          (o.hourLabel =
            void 0 !== e.data("hour-label") ? e.data("hour-label") : ""),
          (o.hourLabelPlural =
            void 0 !== e.data("hour-label-plural")
              ? e.data("hour-label-plural")
              : ""),
          (o.minuteLabel =
            void 0 !== e.data("minute-label") ? e.data("minute-label") : ""),
          (o.minuteLabelPlural =
            void 0 !== e.data("minute-label-plural")
              ? e.data("minute-label-plural")
              : ""),
          (o.secondLabel =
            void 0 !== e.data("second-label") ? e.data("second-label") : ""),
          (o.secondLabelPlural =
            void 0 !== e.data("second-label-plural")
              ? e.data("second-label-plural")
              : ""),
          o
        );
      },
      initCountdown: function (e, o) {
        var n =
            '<span class="qodef-digit-wrapper"><span class="qodef-digit">%w</span><span class="qodef-label">%!w:' +
            o.weekLabel +
            "," +
            o.weekLabelPlural +
            ";</span></span>",
          t =
            '<span class="qodef-digit-wrapper"><span class="qodef-digit">%d</span><span class="qodef-label">%!d:' +
            o.dayLabel +
            "," +
            o.dayLabelPlural +
            ";</span></span>",
          i =
            '<span class="qodef-digit-wrapper"><span class="qodef-digit">%H</span><span class="qodef-label">%!H:' +
            o.hourLabel +
            "," +
            o.hourLabelPlural +
            ";</span></span>",
          a =
            '<span class="qodef-digit-wrapper"><span class="qodef-digit">%M</span><span class="qodef-label">%!M:' +
            o.minuteLabel +
            "," +
            o.minuteLabelPlural +
            ";</span></span>",
          d =
            '<span class="qodef-digit-wrapper"><span class="qodef-digit">%S</span><span class="qodef-label">%!S:' +
            o.secondLabel +
            "," +
            o.secondLabelPlural +
            ";</span></span>";
        e.countdown(o.date, function (e) {
          r(this).html(e.strftime(n + t + i + a + d));
        });
      },
    };
    qodefCore.shortcodes.hendon_core_countdown.qodefCountdown = t;
  })(jQuery),
  (function (s) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_counter = {}),
      s(document).ready(function () {
        c.init();
      });
    var c = {
      init: function () {
        (this.counters = s(".qodef-counter")),
          this.counters.length &&
            this.counters.each(function () {
              var e = s(this),
                o = e.find(".qodef-m-digit"),
                n = c.generateOptions(e);
              c.counterScript(e, o, n);
            });
      },
      generateOptions: function (e) {
        var o = {};
        return (
          (o.start =
            void 0 !== e.data("start-digit") && "" !== e.data("start-digit")
              ? e.data("start-digit")
              : 0),
          (o.end =
            void 0 !== e.data("end-digit") && "" !== e.data("end-digit")
              ? e.data("end-digit")
              : null),
          (o.step =
            void 0 !== e.data("step-digit") && "" !== e.data("step-digit")
              ? e.data("step-digit")
              : 1),
          (o.delay =
            void 0 !== e.data("step-delay") && "" !== e.data("step-delay")
              ? parseInt(e.data("step-delay"), 10)
              : 100),
          (o.txt =
            void 0 !== e.data("digit-label") && "" !== e.data("digit-label")
              ? e.data("digit-label")
              : ""),
          o
        );
      },
      counterScript: function (e, o, n) {
        var t = s.extend(
            { start: 0, end: null, step: 1, delay: 100, txt: "" },
            n || {}
          ),
          i = t.start,
          a = t.end;
        o.text(i + t.txt);
        function d() {
          (null !== a && a <= i) ||
            ((i += t.step), a <= i && (i = a), o.text(i + t.txt));
        }
        if (e.hasClass("qodef-layout--simple")) {
          var r = 400;
          o.text(a),
            qodef.qodefSplitTextToSpans.init(o),
            o.find("span").css({ display: "inline-block", opacity: 0 }),
            o.offset().top > 0.8 * qodef.windowHeight &&
              o.offset().top < 2 * qodef.windowHeight &&
              (r = -50),
            o.appear(
              function () {
                setTimeout(function () {
                  c.animateSimpleCounter(o.find("span"));
                }, qodef.qodefGetRandomIntegerInRange.init(0, 600));
              },
              { accX: 0, accY: r }
            );
        } else
          o.appear(
            function () {
              setInterval(d, t.delay);
            },
            { accX: 0, accY: 0 }
          );
      },
      animateSimpleCounter: function (e) {
        TweenMax.staggerFromTo(
          e,
          1,
          {
            opacity: 0,
            y: function (e) {
              return e % 2 == 0 ? -15 : 15;
            },
          },
          { opacity: 1, y: 0, ease: Power3.easeOut },
          0.3
        );
      },
    };
    qodefCore.shortcodes.hendon_core_counter.qodefCounter = c;
  })(jQuery),
  (function (e) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_google_map = {}),
      e(document).ready(function () {
        o.init();
      });
    var o = {
      init: function () {
        (this.holder = e(".qodef-google-map")),
          this.holder.length &&
            this.holder.each(function () {
              void 0 !== window.qodefGoogleMap &&
                window.qodefGoogleMap.initMap(e(this).find(".qodef-m-map"));
            });
      },
    };
    qodefCore.shortcodes.hendon_core_google_map.qodefGoogleMap = o;
  })(jQuery),
  (function (o) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_icon = {}),
      o(document).ready(function () {
        i.init();
      });
    var i = {
      init: function () {
        (this.icons = o(".qodef-icon-holder")),
          this.icons.length &&
            this.icons.each(function () {
              var e = o(this);
              i.iconHoverColor(e),
                i.iconHoverBgColor(e),
                i.iconHoverBorderColor(e);
            });
      },
      iconHoverColor: function (e) {
        if (void 0 !== e.data("hover-color")) {
          var o = e.find("span"),
            n = o.css("color"),
            t = e.data("hover-color");
          e.on("mouseenter", function () {
            i.changeColor(o, "color", t);
          }),
            e.on("mouseleave", function () {
              i.changeColor(o, "color", n);
            });
        }
      },
      iconHoverBgColor: function (e) {
        if (void 0 !== e.data("hover-background-color")) {
          var o = e.data("hover-background-color"),
            n = e.css("background-color");
          e.on("mouseenter", function () {
            i.changeColor(e, "background-color", o);
          }),
            e.on("mouseleave", function () {
              i.changeColor(e, "background-color", n);
            });
        }
      },
      iconHoverBorderColor: function (e) {
        if (void 0 !== e.data("hover-border-color")) {
          var o = e.data("hover-border-color"),
            n = e.css("borderTopColor");
          e.on("mouseenter", function () {
            i.changeColor(e, "border-color", o);
          }),
            e.on("mouseleave", function () {
              i.changeColor(e, "border-color", n);
            });
        }
      },
      changeColor: function (e, o, n) {
        e.css(o, n);
      },
    };
    qodefCore.shortcodes.hendon_core_icon.qodefIcon = i;
  })(jQuery),
  (function (t) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_icon_with_text = {}),
      t(document).ready(function () {
        i.init(), e.init();
      });
    var i = {
        init: function () {
          (this.icons = t(
            ".qodef-icon-with-text.qodef-layout--content-in-box"
          )),
            this.icons.length &&
              this.icons.each(function () {
                var e = t(this);
                i.iconBoxBgColor(e);
              });
        },
        iconBoxBgColor: function (e) {
          if (void 0 !== e.data("hover-background-color")) {
            var o = e.data("hover-background-color"),
              n = e.css("background-color");
            e.on("mouseenter", function () {
              i.changeColor(e, "background-color", o);
            }),
              e.on("mouseleave", function () {
                i.changeColor(e, "background-color", n);
              });
          }
        },
        changeColor: function (e, o, n) {
          e.css(o, n);
        },
      },
      e = {
        init: function () {
          var e = t(".qodef-icon-with-text.qodef--circle-frame-enabled");
          e.length &&
            e.each(function () {
              var e = t(this),
                o = e.data("circle-color"),
                n = e.data("circle-hover-color");
              e.find(".qodef-svg-circle circle:nth-child(1)").css("stroke", o),
                e
                  .find(".qodef-svg-circle circle:nth-child(2)")
                  .css("stroke", n);
            });
        },
      };
    (qodefCore.shortcodes.hendon_core_icon_with_text.qodefIconWithTextBox = i),
      (qodefCore.shortcodes.hendon_core_icon_with_text.qodefIconWithTextCircle = e);
  })(jQuery),
  (function () {
    "use strict";
    (qodefCore.shortcodes.hendon_core_image_gallery = {}),
      (qodefCore.shortcodes.hendon_core_image_gallery.qodefSwiper =
        qodef.qodefSwiper),
      (qodefCore.shortcodes.hendon_core_image_gallery.qodefMasonryLayout =
        qodef.qodefMasonryLayout);
  })(jQuery),
  (function (h) {
    "use strict";
    h(document).ready(function () {
      e.init();
    });
    var e = {
      init: function () {
        var r = function (e, o, n, t, i) {
            a(e, o), d(e, n), d(e, t);
          },
          a = function (e, o) {
            var n = o.find(".swiper-slide-active").data("index");
            e.data("active-index", n);
          },
          d = function (e, o) {
            var n = o.filter(function () {
              return h(this).data("index") == e.data("active-index");
            });
            o.removeClass("qodef-active"),
              n.addClass("qodef-active"),
              o.removeClass("qodef-prev"),
              n.prev().addClass("qodef-prev"),
              o.removeClass("qodef-next"),
              n.next().addClass("qodef-next");
          },
          s = function (s, c) {
            function l(e, o, n) {
              var t;
              (t = "qodef-" + n),
                e.removeClass("qodef-next qodef-prev").addClass(t),
                e.data("idle", !1),
                e.addClass("qodef-mask"),
                "next" == n
                  ? setTimeout(function () {
                      o.slideNext(800);
                    }, 0)
                  : (e.addClass("qodef-fade-prev-content"),
                    setTimeout(function () {
                      e.removeClass("qodef-fade-prev-content"),
                        o.slidePrev(800);
                    }, 0));
            }
            if (
              (s.on("click", ".swiper-slide", function (e) {
                var o = h(e.currentTarget);
                o.hasClass("swiper-slide-next")
                  ? s.data("idle") && l(s, c, "next")
                  : o.hasClass("swiper-slide-prev") &&
                    s.data("idle") &&
                    l(s, c, "prev");
              }),
              s.hasClass("qodef-change-on-scroll") &&
                (s[0].addEventListener("wheel", function (e) {
                  if (s.data("idle")) {
                    var o = 0 < e.deltaY ? "next" : "prev",
                      n = s.data("active-index");
                    (("next" == o && n < s.data("items")) ||
                      ("prev" == o && 1 < n)) &&
                      l(s, c, o);
                  }
                }),
                Modernizr.touch &&
                  s[0].addEventListener("touchstart", function (e) {
                    s.data(
                      "touch-start",
                      parseInt(e.changedTouches[0].clientX)
                    );
                  }),
                Modernizr.touch &&
                  s[0].addEventListener("touchmove", function (e) {
                    s.data("touch-move", parseInt(e.changedTouches[0].clientX));
                    var o = s.data("touch-move") - s.data("touch-start");
                    if (s.data("idle")) {
                      var n = o < 0 ? "next" : "prev",
                        t = s.data("active-index");
                      (("next" == n && t < s.data("items")) ||
                        ("prev" == n && 1 < t)) &&
                        l(s, c, n);
                    }
                  })),
              s.find(".qodef-m-indicator").on("click", function () {
                var e = h(this).data("index"),
                  o = s.find(".qodef-m-indicator.qodef-active").data("index");
                e < o && e === o - 1 && l(s, c, "prev"),
                  o < e && e === o + 1 && l(s, c, "next");
              }),
              qodef.windowWidth < 1025)
            ) {
              var e = "touchstart",
                o = "touchend",
                n = "srcElement",
                f = function (e) {
                  return e.originalEvent.changedTouches[0].clientX;
                },
                u = !1;
              s.on(e, function (e) {
                if (!u && !h(e[n]).is("a, span")) {
                  var d = e,
                    r = f(e);
                  (u = !0),
                    s.one(o, function (e) {
                      var o,
                        n,
                        t,
                        i = f(e);
                      if (
                        10 < Math.abs(r - i) &&
                        ((o = e),
                        (n = d.originalEvent.changedTouches[0].clientY),
                        (t = o.originalEvent.changedTouches[0].clientY),
                        !(100 < Math.abs(t - n)))
                      ) {
                        var a = s.data("active-index");
                        i < r
                          ? a < s.data("items") && l(s, c, "next")
                          : 1 < a && l(s, c, "prev");
                      }
                      u = !1;
                    });
                }
              });
            }
          },
          e = h(".qodef-numbered-carousel");
        e.length &&
          e.each(function () {
            var e,
              o,
              n,
              t,
              i,
              a,
              d = h(this).find(".swiper-container");
            (e = d),
              (o = new Swiper(e, {
                speed: 300,
                centeredSlides: !0,
                slidesPerView: "auto",
                allowTouchMove: !1,
                init: !1,
              })),
              (n = e.closest(".qodef-numbered-carousel")),
              (t = n.find(".qodef-m-bg-item")),
              (i = n.find(".qodef-m-indicator")),
              (a = n.find(".qodef-m-grid-line:last-child")),
              o.on("init", function () {
                n.data("items", t.length),
                  r(n, e, t, i, e.find(".swiper-wrapper")),
                  s(n, o),
                  e
                    .addClass("qodef-show")
                    .one(
                      "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
                      function () {
                        n.addClass("qodef-initialized"),
                          a.one(
                            "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
                            function () {
                              n.data("idle", !0);
                            }
                          );
                      }
                    );
              }),
              o.on("slideChangeTransitionEnd", function () {
                r(n, e, t, i, e.find(".swiper-wrapper")),
                  n.removeClass("qodef-mask"),
                  a.one(
                    "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",
                    function () {
                      n.data("idle", !0);
                    }
                  );
              }),
              e.waitForImages(o.init());
          });
      },
    };
    qodefCore.shortcodes.hendon_core_numered_carousel = e;
  })(jQuery),
  (function (e) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_progress_bar = {}),
      e(document).ready(function () {
        a.init();
      });
    var a = {
      init: function () {
        (this.holder = e(".qodef-progress-bar")),
          this.holder.length &&
            this.holder.each(function () {
              var t = e(this),
                i = t.data("layout");
              t.appear(function () {
                t.addClass("qodef--init");
                var e = t.find(".qodef-m-canvas"),
                  o = a.generateBarData(t, i),
                  n = t.data("number") / 100;
                switch (i) {
                  case "circle":
                    a.initCircleBar(e, o, n);
                    break;
                  case "semi-circle":
                    a.initSemiCircleBar(e, o, n);
                    break;
                  case "line":
                    (o = a.generateLineData(t, n)), a.initLineBar(e, o);
                    break;
                  case "custom":
                    a.initCustomBar(e, o, n);
                }
              });
            });
      },
      generateBarData: function (e, n) {
        var o = e.data("active-line-width"),
          t = e.data("active-line-color"),
          i = e.data("inactive-line-width"),
          a = e.data("inactive-line-color");
        return {
          strokeWidth: o,
          color: t,
          trailWidth: i,
          trailColor: a,
          easing: "linear",
          duration:
            void 0 !== e.data("duration") && "" !== e.data("duration")
              ? parseInt(e.data("duration"), 10)
              : 1600,
          svgStyle: { width: "100%", height: "100%" },
          text: {
            style: { color: e.data("text-color") },
            autoStyleContainer: !1,
          },
          from: { color: a },
          to: { color: t },
          step: function (e, o) {
            "custom" !== n && o.setText(Math.round(100 * o.value()) + "%");
          },
        };
      },
      generateLineData: function (e, o) {
        var n = e.data("active-line-width"),
          t = e.data("active-line-color"),
          i = e.data("inactive-line-width"),
          a = e.data("inactive-line-color"),
          d =
            void 0 !== e.data("duration") && "" !== e.data("duration")
              ? parseInt(e.data("duration"), 10)
              : 1600,
          r = e.data("text-color");
        return {
          percentage: 100 * o,
          duration: d,
          fillBackgroundColor: t,
          backgroundColor: a,
          height: n,
          inactiveHeight: i,
          followText: e.hasClass("qodef-percentage--floating"),
          textColor: r,
        };
      },
      initCircleBar: function (e, o, n) {
        a.checkBar(e) && new ProgressBar.Circle(e[0], o).animate(n);
      },
      initSemiCircleBar: function (e, o, n) {
        a.checkBar(e) && new ProgressBar.SemiCircle(e[0], o).animate(n);
      },
      initCustomBar: function (e, o, n) {
        if (a.checkBar(e)) {
          var t = new ProgressBar.Path(e[0], o);
          t.set(0), t.animate(n);
        }
      },
      initLineBar: function (e, o) {
        e.LineProgressbar(o);
      },
      checkBar: function (e) {
        return !e.find("svg").length;
      },
    };
    qodefCore.shortcodes.hendon_core_progress_bar.qodefProgressBar = a;
  })(jQuery),
  (function (r) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_stacked_images = {}),
      r(document).ready(function () {
        o.init();
      });
    var o = {
      init: function () {
        var e = r(".qodef-stacked-images");
        e.length &&
          e.each(function () {
            var e = r(this);
            o.animateAppear(e), o.animateOnScroll();
          });
      },
      animateAppear: function (e) {
        e.appear(
          function () {
            e.addClass("qodef--appear");
          },
          { accX: 0, accY: -200 }
        );
      },
      animateOnScroll: function () {
        1024 < qodef.windowWidth &&
          [
            {
              selector: ".qodef-stacked-images .qodef-m-images img",
              modifier: "translateY",
              modifierUnit: "%",
              startValue: 50,
              endValue: 0,
            },
            {
              selector: ".qodef-stack-image-img-holder",
              modifier: "translateY",
              modifierUnit: "%",
              startValue: 100,
              endValue: 0,
            },
            {
              selector:
                ".qodef-image-with-text.qodef-layout--text-below.qodef-image-outline-top-right",
              modifier: "translateY",
              modifierUnit: "%",
              startValue: 50,
              endValue: 0,
            },
          ].forEach(function (d) {
            var e = r(d.selector);
            e.length &&
              e.each(function () {
                var e = r(this),
                  o = e.offset().top,
                  n = e.outerHeight(),
                  t = o + n,
                  i = 0,
                  a = -1 * qodef.windowHeight * 1.2;
                o > 0.5 * qodef.windowHeight &&
                  e.css(
                    "transform",
                    d.modifier + "(" + d.startValue + d.modifierUnit + ")"
                  ),
                  e.css(
                    "transition",
                    "transform 1.5s cubic-bezier(0.07, 0.83, 0.25, 1)"
                  ),
                  r(window).on("scroll", function () {
                    qodef.scroll > o + a && (i = 1),
                      qodef.scroll > o + a &&
                        qodef.scroll < t + a &&
                        1 !== i &&
                        (i = Math.abs(qodef.scroll - o - a) / n),
                      e.css(
                        "transform",
                        d.modifier +
                          "(" +
                          (d.endValue + (1 - i) * Math.abs(1 - d.startValue)) +
                          d.modifierUnit +
                          ")"
                      );
                  });
              });
          });
      },
    };
    qodefCore.shortcodes.hendon_core_stacked_images.qodefStackedImages = o;
  })(jQuery),
  (function (o) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_swapping_image_gallery = {}),
      o(document).ready(function () {
        n.init();
      });
    var n = {
      init: function () {
        (this.holder = o(".qodef-swapping-image-gallery")),
          this.holder.length &&
            this.holder.each(function () {
              var e = o(this);
              n.createSlider(e);
            });
      },
      createSlider: function (e) {
        var o = e.find(".qodef-m-image-holder"),
          n = e.find(".qodef-m-thumbnails-holder .qodef-grid-inner");
        new Swiper(o, {
          slidesPerView: 1,
          centeredSlides: !1,
          spaceBetween: 0,
          autoplay: !1,
          loop: !1,
          speed: 800,
          pagination: {
            el: n,
            type: "custom",
            clickable: !0,
            bulletClass: "qodef-m-thumbnail",
          },
          on: {
            init: function () {
              o.addClass("qodef-swiper--initialized"),
                n.find(".qodef-m-thumbnail").eq(0).addClass("qodef--active");
            },
            slideChange: function () {
              var e = this.activeIndex;
              n.find(".qodef--active").removeClass("qodef--active"),
                n.find(".qodef-m-thumbnail").eq(e).addClass("qodef--active");
            },
          },
        });
      },
    };
    qodefCore.shortcodes.hendon_core_swapping_image_gallery.qodefSwappingImageGallery = n;
  })(jQuery),
  (function (a) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_tabs = {}),
      a(document).ready(function () {
        e.init();
      });
    var e = {
      init: function () {
        (this.holder = a(".qodef-tabs")),
          this.holder.length &&
            this.holder.each(function () {
              e.initTabs(a(this));
            });
      },
      initTabs: function (e) {
        e.children(".qodef-tabs-content").each(function (e) {
          e += 1;
          var o = a(this),
            n = o.attr("id"),
            t = o
              .parent()
              .find(".qodef-tabs-navigation li:nth-child(" + e + ") a"),
            i = t.attr("href");
          -1 < (n = "#" + n).indexOf(i) && t.attr("href", n);
        }),
          e.addClass("qodef--init").tabs();
      },
    };
    qodefCore.shortcodes.hendon_core_tabs.qodefTabs = e;
  })(jQuery),
  (function (t) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_text_marquee = {}),
      t(document).ready(function () {
        i.init();
      });
    var i = {
      init: function () {
        (this.holder = t(".qodef-text-marquee")),
          this.holder.length &&
            this.holder.each(function () {
              i.initMarquee(t(this)),
                i.initResponsive(t(this).find(".qodef-m-content"));
            });
      },
      initResponsive: function (e) {
        var o,
          n,
          t = 1,
          i = 1;
        qodefCore.windowWidth < 1480 && (t = 0.8),
          qodefCore.windowWidth < 1200 && (t = 0.7),
          qodefCore.windowWidth < 768 && ((t = 0.55), (i = 0.65)),
          qodefCore.windowWidth < 600 && ((t = 0.45), (i = 0.55)),
          qodefCore.windowWidth < 480 && ((t = 0.4), (i = 0.5)),
          200 < (o = parseInt(e.css("font-size")))
            ? (o = Math.round(o * t))
            : 60 < o && (o = Math.round(o * i)),
          e.css("font-size", o + "px"),
          (70 < (n = parseInt(e.css("line-height"))) &&
            qodefCore.windowWidth < 1440) ||
          (35 < n && qodefCore.windowWidth < 768)
            ? (n = "1.2em")
            : (n += "px"),
          e.css("line-height", n);
      },
      initMarquee: function (e) {
        var o = e.find(".qodef-m-text");
        o.each(function (e) {
          t(this).data("x", 0);
        }),
          requestAnimationFrame(function () {
            i.loop(e, o, 0.05);
          });
      },
      inRange: function (e) {
        return (
          qodefCore.scroll + qodefCore.windowHeight >= e.offset().top &&
          qodefCore.scroll < e.offset().top + e.height()
        );
      },
      loop: function (e, o, n) {
        if (!i.inRange(e))
          return (
            requestAnimationFrame(function () {
              i.loop(e, o, n);
            }),
            !1
          );
        o.each(function (e) {
          var o = t(this);
          o.css("transform", "translate3d(" + o.data("x") + "%, 0, 0)"),
            o.data("x", (o.data("x") - n).toFixed(2)),
            o.offset().left < -o.width() - 25 &&
              o.data("x", 100 * Math.abs(e - 1));
        }),
          requestAnimationFrame(function () {
            i.loop(e, o, n);
          });
      },
    };
    qodefCore.shortcodes.hendon_core_text_marquee.qodefTextMarquee = i;
  })(jQuery),
  (function (i) {
    "use strict";
    i(window).on("load", function () {
      o.init();
    });
    var o = {
      init: function () {
        var e = i(".widget_hendon_core_sticky_sidebar");
        e.length &&
          1024 < qodefCore.windowWidth &&
          ((e.wrapper = e.parents("#qodef-page-sidebar")),
          (e.c = 24),
          (e.offsetM = e.offset().top - e.wrapper.offset().top),
          (e.adj = 15),
          o.callStack(e),
          i(window).on("resize", function () {
            1024 < qodefCore.windowWidth && o.callStack(e);
          }),
          i(window).on("scroll", function () {
            1024 < qodefCore.windowWidth && o.infoPosition(e);
          }));
      },
      calc: function (e) {
        var o = i(".qodef-page-content-section"),
          n = i(".header-appear, .qodef-fixed-wrapper"),
          t = n.length ? n.height() : 0;
        (e.start = o.offset().top),
          (e.end = o.outerHeight()),
          (e.h = e.wrapper.height()),
          (e.w = e.outerWidth()),
          (e.left = e.offset().left),
          (e.top = t + qodefGlobal.vars.adminBarHeight + e.c - e.offsetM),
          e.data("state", "top");
      },
      infoPosition: function (e) {
        if (
          qodefCore.scroll < e.start - e.top &&
          qodefCore.scroll + e.h &&
          "top" !== e.data("state")
        )
          TweenMax.to(e.wrapper, 0.1, { y: 5 }),
            TweenMax.to(e.wrapper, 0.3, { y: 0, delay: 0.1 }),
            e.data("state", "top"),
            e.wrapper.css({ position: "static" });
        else if (
          qodefCore.scroll >= e.start - e.top &&
          qodefCore.scroll + e.h + e.adj <= e.start + e.end &&
          "fixed" !== e.data("state")
        ) {
          var o = "top" === e.data("state") ? 1 : -1;
          e.data("state", "fixed"),
            e.wrapper.css({
              position: "fixed",
              top: e.top,
              left: e.left,
              width: e.w,
            }),
            TweenMax.fromTo(
              e.wrapper,
              0.2,
              { y: 0 },
              { y: 10 * o, ease: Power4.easeInOut }
            ),
            TweenMax.to(e.wrapper, 0.2, { y: 0, delay: 0.2 });
        } else
          qodefCore.scroll + e.h + e.adj > e.start + e.end &&
            "bottom" !== e.data("state") &&
            (e.data("state", "bottom"),
            e.wrapper.css({
              position: "absolute",
              top: e.end - e.h - e.adj,
              left: 0,
            }),
            TweenMax.fromTo(e.wrapper, 0.1, { y: 0 }, { y: -5 }),
            TweenMax.to(e.wrapper, 0.3, { y: 0, delay: 0.1 }));
      },
      callStack: function (e) {
        this.calc(e), this.infoPosition(e);
      },
    };
  })(jQuery),
  (function (n) {
    "use strict";
    var t = "hendon_core_blog_list";
    (qodefCore.shortcodes[t] = {}),
      "object" == typeof qodefCore.listShortcodesScripts &&
        n.each(qodefCore.listShortcodesScripts, function (e, o) {
          qodefCore.shortcodes[t][e] = o;
        }),
      n(document).ready(function () {
        i.init();
      });
    var i = {
      init: function () {
        var e = n(".qodef-blog.qodef-item-layout--date-in-image .qodef-e");
        e.length &&
          e.each(function () {
            var e = n(this),
              o = e.find(".qodef-e-title, .qodef-e-media-image, .qodef-button");
            o.length && i.hoverClass(e, o);
          });
      },
      hoverClass: function (e, o) {
        o.on("mouseenter", function () {
          e.addClass("qodef-e--isHovered");
        }).on("mouseleave", function () {
          e.removeClass("qodef-e--isHovered");
        });
      },
    };
  })(jQuery),
  (function (n) {
    "use strict";
    var t = {
      showHideHeader: function (e, o) {
        1024 < qodefCore.windowWidth &&
          (qodefCore.scroll <= 0
            ? (qodefCore.body.removeClass("qodef-header--fixed-display"),
              e.css("padding-top", "0"),
              o.css("margin-top", "0"))
            : (qodefCore.body.addClass("qodef-header--fixed-display"),
              e.css(
                "padding-top",
                parseInt(
                  qodefGlobal.vars.headerHeight + qodefGlobal.vars.topAreaHeight
                ) + "px"
              ),
              o.css(
                "margin-top",
                parseInt(qodefGlobal.vars.topAreaHeight) + "px"
              )));
      },
      init: function () {
        if (!qodefCore.body.hasClass("qodef-header--vertical")) {
          var e = n("#qodef-page-outer"),
            o = n("#qodef-page-header");
          t.showHideHeader(e, o),
            n(window).scroll(function () {
              t.showHideHeader(e, o);
            }),
            n(window).resize(function () {
              e.css("padding-top", "0"), t.showHideHeader(e, o);
            });
        }
      },
    };
    qodefCore.fixedHeaderAppearance = t.init;
  })(jQuery),
  (function (o) {
    "use strict";
    var n = {
      displayAmount: function () {
        return 0 !== qodefGlobal.vars.qodefStickyHeaderScrollAmount
          ? parseInt(qodefGlobal.vars.qodefStickyHeaderScrollAmount, 10)
          : parseInt(
              qodefGlobal.vars.headerHeight + qodefGlobal.vars.adminBarHeight,
              10
            );
      },
      showHideHeader: function (e) {
        qodefCore.scroll < e
          ? qodefCore.body.removeClass("qodef-header--sticky-display")
          : qodefCore.body.addClass("qodef-header--sticky-display");
      },
      init: function () {
        var e = n.displayAmount();
        n.showHideHeader(e),
          o(window).scroll(function () {
            n.showHideHeader(e);
          });
      },
    };
    qodefCore.stickyHeaderAppearance = n.init;
  })(jQuery),
  (function (t) {
    "use strict";
    t(document).ready(function () {
      i.init();
    });
    var i = {
      init: function () {
        var e = t("a.qodef-search-opener"),
          o = t(".qodef-search-cover-form"),
          n = o.find(".qodef-m-close");
        e.length &&
          o.length &&
          (e.on("click", function (e) {
            e.preventDefault(), i.openCoversHeader(o);
          }),
          n.on("click", function (e) {
            e.preventDefault(), i.closeCoversHeader(o);
          }));
      },
      openCoversHeader: function (e) {
        qodefCore.body.addClass(
          "qodef-covers-search--opened qodef-covers-search--fadein"
        ),
          qodefCore.body.removeClass("qodef-covers-search--fadeout"),
          setTimeout(function () {
            e.find(".qodef-m-form-field").focus();
          }, 600);
      },
      closeCoversHeader: function (e) {
        qodefCore.body.removeClass(
          "qodef-covers-search--opened qodef-covers-search--fadein"
        ),
          qodefCore.body.addClass("qodef-covers-search--fadeout"),
          setTimeout(function () {
            e.find(".qodef-m-form-field").val(""),
              e.find(".qodef-m-form-field").blur(),
              qodefCore.body.removeClass("qodef-covers-search--fadeout");
          }, 300);
      },
    };
  })(jQuery),
  (function (t) {
    "use strict";
    t(document).ready(function () {
      i.init();
    });
    var i = {
      init: function () {
        var e = t("a.qodef-search-opener"),
          o = t(".qodef-fullscreen-search-holder"),
          n = o.find(".qodef-m-close");
        e.length &&
          o.length &&
          (e.on("click", function (e) {
            e.preventDefault(),
              qodefCore.body.hasClass("qodef-fullscreen-search--opened")
                ? i.closeFullscreen(o)
                : i.openFullscreen(o);
          }),
          n.on("click", function (e) {
            e.preventDefault(), i.closeFullscreen(o);
          }),
          t(document).keyup(function (e) {
            27 === e.keyCode && i.closeFullscreen(o);
          }));
      },
      openFullscreen: function (e) {
        qodefCore.body.removeClass("qodef-fullscreen-search--fadeout"),
          qodefCore.body.addClass(
            "qodef-fullscreen-search--opened qodef-fullscreen-search--fadein"
          ),
          setTimeout(function () {
            e.find(".qodef-m-form-field").focus();
          }, 900),
          qodefCore.qodefScroll.disable();
      },
      closeFullscreen: function (e) {
        qodefCore.body.removeClass(
          "qodef-fullscreen-search--opened qodef-fullscreen-search--fadein"
        ),
          qodefCore.body.addClass("qodef-fullscreen-search--fadeout"),
          setTimeout(function () {
            e.find(".qodef-m-form-field").val(""),
              e.find(".qodef-m-form-field").blur(),
              qodefCore.body.removeClass("qodef-fullscreen-search--fadeout");
          }, 300),
          qodefCore.qodefScroll.enable();
      },
    };
  })(jQuery),
  (function (o) {
    "use strict";
    o(document).ready(function () {
      n.init();
    });
    var n = {
      init: function () {
        (this.search = o("a.qodef-search-opener")),
          this.search.length &&
            this.search.each(function () {
              var e = o(this);
              n.searchHoverColor(e);
            });
      },
      searchHoverColor: function (e) {
        if (void 0 !== e.data("hover-color")) {
          var o = e.data("hover-color"),
            n = e.css("color");
          e.on("mouseenter", function () {
            e.css("color", o);
          }).on("mouseleave", function () {
            e.css("color", n);
          });
        }
      },
    };
  })(jQuery),
  (function (i) {
    "use strict";
    i(document).ready(function () {
      a.init();
    }),
      i(window).on("elementor/frontend/init", function () {
        var e = Boolean(elementorFrontend.isEditMode());
        e && a.init(e);
      });
    var a = {
      init: function (e) {
        (this.holder = i("#qodef-page-spinner.qodef-layout--hendon")),
          this.holder.length && a.animateSpinner(this.holder, e);
      },
      animateSpinner: function (e, o) {
        var n = e.find(".qodef-m-hendon-text span"),
          t = new TimelineMax({ repeat: -1, repeatDelay: 0 });
        t.staggerFromTo(
          n,
          3,
          { opacity: 0 },
          { opacity: 1, ease: Power3.easeInOut },
          0.3
        ),
          t.staggerTo(n, 2, { opacity: 0, ease: Power2.easeInOut }, 0.1),
          o && a.finishAnimation(e),
          i(window).on("load", function () {
            t.eventCallback("onUpdate", function () {
              0.6 < t.progress() &&
                (t.pause().kill(),
                TweenMax.to(n, 1, {
                  opacity: 0,
                  stagger: 0.1,
                  ease: Power1.easeInOut,
                }),
                setTimeout(function () {
                  a.finishAnimation(e);
                }, 1e3));
            });
          });
      },
      finishAnimation: function (e) {
        a.fadeOutLoader(e);
        var o = i("#qodef-landing-rev").find("rs-module");
        o.length && o.revstart();
      },
      fadeOutLoader: function (o, n, e, t) {
        (n = n || 600),
          (e = e || 0),
          (t = t || "linear"),
          o.delay(e).fadeOut(n, t),
          i(window).on("bind", "pageshow", function (e) {
            e.originalEvent.persisted && o.fadeOut(n, t);
          });
      },
    };
  })(jQuery),
  (function (d) {
    "use strict";
    d(document).ready(function () {
      r.init();
    });
    var r = {
      percentNumber: 0,
      init: function () {
        (this.holder = d("#qodef-page-spinner.qodef-layout--progress-bar")),
          this.holder.length && r.animateSpinner(this.holder);
      },
      animateSpinner: function (e) {
        var o,
          n = e.find(".qodef-m-spinner-number-label"),
          t = e.find(".qodef-m-spinner-line-front"),
          i = !1;
        t.animate({ width: "100%" }, 1e4, "linear");
        var a = setInterval(function () {
          r.animatePercent(n, r.percentNumber), i && clearInterval(a);
        }, 100);
        d(window).on("load", function () {
          (i = !0),
            (o = setInterval(function () {
              100 <= r.percentNumber
                ? (clearInterval(o),
                  t.stop().animate({ width: "100%" }, 500),
                  setTimeout(function () {
                    e.addClass("qodef--finished"),
                      setTimeout(function () {
                        r.fadeOutLoader(e);
                      }, 1e3);
                  }, 600))
                : r.animatePercent(n, r.percentNumber);
            }, 6));
        });
      },
      animatePercent: function (e, o) {
        o < 100 && ((o += 5), e.text(o), (r.percentNumber = o));
      },
      fadeOutLoader: function (o, n, e, t) {
        (n = n || 600),
          (e = e || 0),
          (t = t || "swing"),
          o.delay(e).fadeOut(n, t),
          d(window).on("bind", "pageshow", function (e) {
            e.originalEvent.persisted && o.fadeOut(n, t);
          });
      },
    };
  })(jQuery),
  (function (i) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_instagram_list = {}),
      i(document).ready(function () {
        e.init();
      });
    var e = {
      init: function () {
        (this.holder = i(".sbi.qodef-instagram-swiper-container")),
          this.holder.length &&
            this.holder.each(function () {
              var e = i(this),
                o = e.parent().attr("data-options"),
                n = e.find(".sbi_item.sbi_type_image"),
                t = e.find("#sbi_images");
              e.attr("data-options", o),
                t.addClass("swiper-wrapper"),
                n.length &&
                  n.each(function () {
                    i(this).addClass(
                      "qodef-e qodef-image-wrapper swiper-slide"
                    );
                  }),
                "object" == typeof qodef.qodefSwiper &&
                  qodef.qodefSwiper.init(e);
            });
      },
    };
    (qodefCore.shortcodes.hendon_core_instagram_list.qodefInstagram = e),
      (qodefCore.shortcodes.hendon_core_instagram_list.qodefSwiper =
        qodef.qodefSwiper);
  })(jQuery),
  (function () {
    "use strict";
    (qodefCore.shortcodes.hendon_core_clients_list = {}),
      (qodefCore.shortcodes.hendon_core_clients_list.qodefSwiper =
        qodef.qodefSwiper);
  })(jQuery),
  (function (e) {
    "use strict";
    var n = "hendon_core_team_list";
    (qodefCore.shortcodes[n] = {}),
      "object" == typeof qodefCore.listShortcodesScripts &&
        e.each(qodefCore.listShortcodesScripts, function (e, o) {
          qodefCore.shortcodes[n][e] = o;
        });
  })(jQuery),
  (function () {
    "use strict";
    (qodefCore.shortcodes.hendon_core_testimonials_list = {}),
      (qodefCore.shortcodes.hendon_core_testimonials_list.qodefSwiper =
        qodef.qodefSwiper);
  })(jQuery),
  (function (e) {
    "use strict";
    var n = "hendon_core_apartment_list";
    (qodefCore.shortcodes[n] = {}),
      "object" == typeof qodefCore.listShortcodesScripts &&
        e.each(qodefCore.listShortcodesScripts, function (e, o) {
          qodefCore.shortcodes[n][e] = o;
        });
  })(jQuery),
  (function (s) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_image_map = {}),
      s(window).on("load", function () {
        e.init();
      });
    var e = {
        init: function () {
          var e = s(".qodef-image-map");
          e.length &&
            e.each(function () {
              var e = s(this),
                o = e.find(".qodef-image-map-holder"),
                n = JSON.parse(o.attr("data-options")),
                t = e.find(".qodef-im-info-section-holder .qodef-m-item"),
                i = o.find(".imp-shape"),
                a = n.general.name,
                d = n.spots.map(function (e) {
                  return e.title;
                }),
                r = d[0];
              t.first().addClass("qodef--active"),
                s.imageMapProHighlightShape(a, r);
              i.on("mouseenter", function () {
                setTimeout(function () {
                  d.forEach(function (e) {
                    e !== r && s.imageMapProUnhighlightShape(a, e);
                  });
                }, 10);
              }),
                (s.imageMapProEventHighlightedShape = function (e, o) {
                  (r = o),
                    t.each(function () {
                      s(this).data("imp-shape") === o
                        ? s(this).addClass("qodef--active")
                        : s(this).removeClass("qodef--active");
                    });
                }),
                (s.imageMapProEventUnhighlightedShape = function (e, o) {
                  s.imageMapProHighlightShape(a, r),
                    t.each(function () {
                      s(this).data("imp-shape") === o &&
                        s(this).removeClass("qodef--active");
                    });
                });
            });
        },
      },
      o = {
        init: function () {
          var e = s(".qodef-image-map-holder");
          e.length &&
            e.each(function () {
              var e = s(this),
                o = "undefined" !== e.data("options") ? e.data("options") : {},
                n = void 0 !== o.id && "" !== o.id ? o.id : 0,
                t = e.find("#image-map-pro-" + n);
              t.length && t.imageMapPro(o);
            });
        },
      };
    (qodefCore.shortcodes.hendon_core_image_map.qodefImageMap = e),
      (qodefCore.shortcodes.hendon_core_image_map.qodefPropertyImageMapSVG = o);
  })(jQuery),
  (function (e) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_property_advanced_info = {}),
      e(window).on("load", function () {
        o.init();
      });
    var o = {
      init: function () {
        e(window).on("elementor/frontend/init", function (e) {
          elementorFrontend.hooks.addAction(
            "frontend/element_ready/hendon_core_property_advanced_info.default",
            function () {
              qodefCore.shortcodes.hendon_core_tabs.qodefTabs.init();
            }
          );
        });
      },
    };
    qodefCore.shortcodes.hendon_core_property_advanced_info.qodefElementorPropertyAdvancedInfo = o;
  })(jQuery),
  (function (q) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_property_image_map_gallery = {}),
      q(document).ready(function () {
        e.init();
      });
    var e = {
        init: function () {
          var e = q(".qodef-image-map-gallery");
          e.length &&
            e.each(function () {
              var e,
                o,
                n = q(this),
                t = n.data("image-map-name"),
                i = n.find(".qodef-map-nav-item.qodef-active-map"),
                a = n.find(".qodef-map-nav-item.qodef-inactive-map"),
                d = n.find(".qodef-image-map-holder-overlay"),
                r = n.find(".qodef-image-map-holder");
              a.each(function () {
                q(this).on("click", function () {
                  d.css("z-index", 999), r.css("opacity", 0.5);
                });
              }),
                i.each(function () {
                  q(this).on("click", function () {
                    d.css("z-index", -1), r.css("opacity", 1);
                  });
                });
              var s = n.find(".qodef-img-slider"),
                c = n.find(".qodef-pagination-slider"),
                l = new Swiper(s, {
                  loop: !1,
                  autoplay: !1,
                  slidesPerView: 1,
                  on: {
                    init: function () {
                      s.addClass("qodef--initialized"),
                        setTimeout(function () {
                          void 0 !==
                            (o = s
                              .find(".swiper-slide.swiper-slide-active")
                              .data("imp-shape")) && u();
                        }, 100);
                    },
                    slideChange: function () {
                      setTimeout(function () {
                        void 0 !==
                          (o = s
                            .find(".swiper-slide.swiper-slide-active")
                            .data("imp-shape")) && u();
                      }, 300),
                        f.slideTo(l.realIndex, 500, !0);
                    },
                  },
                });
              l.init();
              var f = new Swiper(c, {
                loop: !1,
                autoplay: !1,
                slidesPerView: 4,
                spaceBetween: 15,
                on: {
                  init: function () {
                    s.addClass("qodef--initialized");
                  },
                  slideChange: function () {
                    l.slideTo(f.realIndex, 500, !0);
                  },
                  click: function () {
                    l.slideTo(f.clickedIndex, 500, !0);
                  },
                },
              });
              function u() {
                void 0 !== e && q.imageMapProUnhighlightShape(t, e),
                  "empty" !== o && (q.imageMapProHighlightShape(t, o), (e = o));
              }
              f.init();
              var h = n.find(".qodef-img-section"),
                p = n.find(".qodef-map-navigation .qodef-map-nav-item");
              p.on("click", function () {
                h.removeClass("active"), p.removeClass("active");
                var e = q(this),
                  o = e.index();
                e.addClass("active"), h.eq(o).addClass("active");
              }),
                (q.imageMapProEventClickedShape = function (e, o) {
                  var n = -1;
                  q(".qodef-image-map-gallery[data-image-map-name='" + e + "']")
                    .find(".qodef-img-slider")
                    .find(".swiper-slide")
                    .each(function () {
                      q(this).data("imp-shape") === o && (n = q(this).index()),
                        -1 !== n &&
                          (l.slideTo(n, 500, !0), f.slideTo(n, 500, !0));
                    });
                });
            });
        },
      },
      o = {
        init: function () {
          var e = q(".qodef-image-map-holder");
          e.length &&
            e.each(function () {
              var e = q(this),
                o = "undefined" !== e.data("options") ? e.data("options") : {},
                n = void 0 !== o.id && "" !== o.id ? o.id : 0,
                t = e.find("#image-map-pro-" + n);
              t.length && t.imageMapPro(o);
            });
        },
      };
    (qodefCore.shortcodes.hendon_core_property_image_map_gallery.qodefPropertyImageMapGallery = e),
      (qodefCore.shortcodes.hendon_core_property_image_map_gallery.qodefPropertyImageMapSVG = o);
  })(jQuery),
  (function (e) {
    "use strict";
    var n = "hendon_core_property_list";
    (qodefCore.shortcodes[n] = {}),
      "object" == typeof qodefCore.listShortcodesScripts &&
        e.each(qodefCore.listShortcodesScripts, function (e, o) {
          qodefCore.shortcodes[n][e] = o;
        });
  })(jQuery),
  (function (n) {
    "use strict";
    (qodefCore.shortcodes.hendon_core_property_list = {}),
      n(document).ready(function () {
        o.init();
      });
    var o = {
      init: function () {
        (this.holder = n(".qodef-property-list.qodef-item-layout--info-aside")),
          this.holder.length &&
            this.holder.each(function () {
              var e = n(this);
              o.initList(e);
            });
      },
      initList: function (e) {
        var o = e.find("article.qodef-e");
        o.first().addClass("active"),
          o.on("mouseenter", function () {
            o.removeClass("active"), n(this).addClass("active");
          });
      },
    };
    qodefCore.shortcodes.hendon_core_property_list.qodefProperyListAside = o;
  })(jQuery); /*! waitForImages jQuery Plugin 2018-02-13 */
!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : "object" == typeof exports
    ? (module.exports = a(require("jquery")))
    : a(jQuery);
})(function (a) {
  var b = "waitForImages",
    c = (function (a) {
      return a.srcset && a.sizes;
    })(new Image());
  (a.waitForImages = {
    hasImageProperties: [
      "backgroundImage",
      "listStyleImage",
      "borderImage",
      "borderCornerImage",
      "cursor",
    ],
    hasImageAttributes: ["srcset"],
  }),
    (a.expr.pseudos["has-src"] = function (b) {
      return a(b).is('img[src][src!=""]');
    }),
    (a.expr.pseudos.uncached = function (b) {
      return !!a(b).is(":has-src") && !b.complete;
    }),
    (a.fn.waitForImages = function () {
      var d,
        e,
        f,
        g = 0,
        h = 0,
        i = a.Deferred(),
        j = this,
        k = [],
        l = a.waitForImages.hasImageProperties || [],
        m = a.waitForImages.hasImageAttributes || [],
        n = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
      if (
        (a.isPlainObject(arguments[0])
          ? ((f = arguments[0].waitForAll),
            (e = arguments[0].each),
            (d = arguments[0].finished))
          : 1 === arguments.length && "boolean" === a.type(arguments[0])
          ? (f = arguments[0])
          : ((d = arguments[0]), (e = arguments[1]), (f = arguments[2])),
        (d = d || a.noop),
        (e = e || a.noop),
        (f = !!f),
        !a.isFunction(d) || !a.isFunction(e))
      )
        throw new TypeError("An invalid callback was supplied.");
      return (
        this.each(function () {
          var b = a(this);
          f
            ? b
                .find("*")
                .addBack()
                .each(function () {
                  var b = a(this);
                  b.is("img:has-src") &&
                    !b.is("[srcset]") &&
                    k.push({ src: b.attr("src"), element: b[0] }),
                    a.each(l, function (a, c) {
                      var d,
                        e = b.css(c);
                      if (!e) return !0;
                      for (; (d = n.exec(e)); )
                        k.push({ src: d[2], element: b[0] });
                    }),
                    a.each(m, function (a, c) {
                      var d = b.attr(c);
                      return (
                        !d ||
                        void k.push({
                          src: b.attr("src"),
                          srcset: b.attr("srcset"),
                          element: b[0],
                        })
                      );
                    });
                })
            : b.find("img:has-src").each(function () {
                k.push({ src: this.src, element: this });
              });
        }),
        (g = k.length),
        (h = 0),
        0 === g && (d.call(j), i.resolveWith(j)),
        a.each(k, function (f, k) {
          var l = new Image(),
            m = "load." + b + " error." + b;
          a(l).one(m, function b(c) {
            var f = [h, g, "load" == c.type];
            if (
              (h++,
              e.apply(k.element, f),
              i.notifyWith(k.element, f),
              a(this).off(m, b),
              h == g)
            )
              return d.call(j[0]), i.resolveWith(j[0]), !1;
          }),
            c && k.srcset && ((l.srcset = k.srcset), (l.sizes = k.sizes)),
            (l.src = k.src);
        }),
        i.promise()
      );
    });
});
(function ($) {
  $.fn.appear = function (fn, options) {
    var settings = $.extend(
      { data: undefined, one: true, accX: 0, accY: 0 },
      options
    );
    return this.each(function () {
      var t = $(this);
      t.appeared = false;
      if (!fn) {
        t.trigger("appear", settings.data);
        return;
      }
      var w = $(window);
      var check = function () {
        if (!t.is(":visible")) {
          t.appeared = false;
          return;
        }
        var a = w.scrollLeft();
        var b = w.scrollTop();
        var o = t.offset();
        var x = o.left;
        var y = o.top;
        var ax = settings.accX;
        var ay = settings.accY;
        var th = t.height();
        var wh = w.height();
        var tw = t.width();
        var ww = w.width();
        if (
          y + th + ay >= b &&
          y <= b + wh + ay &&
          x + tw + ax >= a &&
          x <= a + ww + ax
        ) {
          if (!t.appeared) t.trigger("appear", settings.data);
        } else {
          t.appeared = false;
        }
      };
      var modifiedFn = function () {
        t.appeared = true;
        if (settings.one) {
          w.unbind("scroll", check);
          var i = $.inArray(check, $.fn.appear.checks);
          if (i >= 0) $.fn.appear.checks.splice(i, 1);
        }
        fn.apply(this, arguments);
      };
      if (settings.one) t.one("appear", settings.data, modifiedFn);
      else t.bind("appear", settings.data, modifiedFn);
      w.scroll(check);
      $.fn.appear.checks.push(check);
      check();
    });
  };
  $.extend($.fn.appear, {
    checks: [],
    timeout: null,
    checkAll: function () {
      var length = $.fn.appear.checks.length;
      if (length > 0) while (length--) $.fn.appear.checks[length]();
    },
    run: function () {
      if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
      $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
    },
  });
  $.each(
    [
      "append",
      "prepend",
      "after",
      "before",
      "attr",
      "removeAttr",
      "addClass",
      "removeClass",
      "toggleClass",
      "remove",
      "css",
      "show",
      "hide",
    ],
    function (i, n) {
      var old = $.fn[n];
      if (old) {
        $.fn[n] = function () {
          var r = old.apply(this, arguments);
          $.fn.appear.run();
          return r;
        };
      }
    }
  );
})(jQuery);
/**
 * Swiper 5.3.6
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://swiperjs.com
 *
 * Copyright 2014-2020 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: February 29, 2020
 */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = e || self).Swiper = t());
})(this, function () {
  "use strict";
  var e =
      "undefined" == typeof document
        ? {
            body: {},
            addEventListener: function () {},
            removeEventListener: function () {},
            activeElement: { blur: function () {}, nodeName: "" },
            querySelector: function () {
              return null;
            },
            querySelectorAll: function () {
              return [];
            },
            getElementById: function () {
              return null;
            },
            createEvent: function () {
              return { initEvent: function () {} };
            },
            createElement: function () {
              return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function () {},
                getElementsByTagName: function () {
                  return [];
                },
              };
            },
            location: { hash: "" },
          }
        : document,
    t =
      "undefined" == typeof window
        ? {
            document: e,
            navigator: { userAgent: "" },
            location: {},
            history: {},
            CustomEvent: function () {
              return this;
            },
            addEventListener: function () {},
            removeEventListener: function () {},
            getComputedStyle: function () {
              return {
                getPropertyValue: function () {
                  return "";
                },
              };
            },
            Image: function () {},
            Date: function () {},
            screen: {},
            setTimeout: function () {},
            clearTimeout: function () {},
          }
        : window,
    i = function (e) {
      for (var t = 0; t < e.length; t += 1) this[t] = e[t];
      return (this.length = e.length), this;
    };
  function s(s, a) {
    var r = [],
      n = 0;
    if (s && !a && s instanceof i) return s;
    if (s)
      if ("string" == typeof s) {
        var o,
          l,
          d = s.trim();
        if (d.indexOf("<") >= 0 && d.indexOf(">") >= 0) {
          var h = "div";
          for (
            0 === d.indexOf("<li") && (h = "ul"),
              0 === d.indexOf("<tr") && (h = "tbody"),
              (0 !== d.indexOf("<td") && 0 !== d.indexOf("<th")) || (h = "tr"),
              0 === d.indexOf("<tbody") && (h = "table"),
              0 === d.indexOf("<option") && (h = "select"),
              (l = e.createElement(h)).innerHTML = d,
              n = 0;
            n < l.childNodes.length;
            n += 1
          )
            r.push(l.childNodes[n]);
        } else
          for (
            o =
              a || "#" !== s[0] || s.match(/[ .<>:~]/)
                ? (a || e).querySelectorAll(s.trim())
                : [e.getElementById(s.trim().split("#")[1])],
              n = 0;
            n < o.length;
            n += 1
          )
            o[n] && r.push(o[n]);
      } else if (s.nodeType || s === t || s === e) r.push(s);
      else if (s.length > 0 && s[0].nodeType)
        for (n = 0; n < s.length; n += 1) r.push(s[n]);
    return new i(r);
  }
  function a(e) {
    for (var t = [], i = 0; i < e.length; i += 1)
      -1 === t.indexOf(e[i]) && t.push(e[i]);
    return t;
  }
  (s.fn = i.prototype), (s.Class = i), (s.Dom7 = i);
  var r = {
    addClass: function (e) {
      if (void 0 === e) return this;
      for (var t = e.split(" "), i = 0; i < t.length; i += 1)
        for (var s = 0; s < this.length; s += 1)
          void 0 !== this[s] &&
            void 0 !== this[s].classList &&
            this[s].classList.add(t[i]);
      return this;
    },
    removeClass: function (e) {
      for (var t = e.split(" "), i = 0; i < t.length; i += 1)
        for (var s = 0; s < this.length; s += 1)
          void 0 !== this[s] &&
            void 0 !== this[s].classList &&
            this[s].classList.remove(t[i]);
      return this;
    },
    hasClass: function (e) {
      return !!this[0] && this[0].classList.contains(e);
    },
    toggleClass: function (e) {
      for (var t = e.split(" "), i = 0; i < t.length; i += 1)
        for (var s = 0; s < this.length; s += 1)
          void 0 !== this[s] &&
            void 0 !== this[s].classList &&
            this[s].classList.toggle(t[i]);
      return this;
    },
    attr: function (e, t) {
      var i = arguments;
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (var s = 0; s < this.length; s += 1)
        if (2 === i.length) this[s].setAttribute(e, t);
        else
          for (var a in e) (this[s][a] = e[a]), this[s].setAttribute(a, e[a]);
      return this;
    },
    removeAttr: function (e) {
      for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    data: function (e, t) {
      var i;
      if (void 0 !== t) {
        for (var s = 0; s < this.length; s += 1)
          (i = this[s]).dom7ElementDataStorage ||
            (i.dom7ElementDataStorage = {}),
            (i.dom7ElementDataStorage[e] = t);
        return this;
      }
      if ((i = this[0])) {
        if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage)
          return i.dom7ElementDataStorage[e];
        var a = i.getAttribute("data-" + e);
        return a || void 0;
      }
    },
    transform: function (e) {
      for (var t = 0; t < this.length; t += 1) {
        var i = this[t].style;
        (i.webkitTransform = e), (i.transform = e);
      }
      return this;
    },
    transition: function (e) {
      "string" != typeof e && (e += "ms");
      for (var t = 0; t < this.length; t += 1) {
        var i = this[t].style;
        (i.webkitTransitionDuration = e), (i.transitionDuration = e);
      }
      return this;
    },
    on: function () {
      for (var e, t = [], i = arguments.length; i--; ) t[i] = arguments[i];
      var a = t[0],
        r = t[1],
        n = t[2],
        o = t[3];
      function l(e) {
        var t = e.target;
        if (t) {
          var i = e.target.dom7EventData || [];
          if ((i.indexOf(e) < 0 && i.unshift(e), s(t).is(r))) n.apply(t, i);
          else
            for (var a = s(t).parents(), o = 0; o < a.length; o += 1)
              s(a[o]).is(r) && n.apply(a[o], i);
        }
      }
      function d(e) {
        var t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t);
      }
      "function" == typeof t[1] &&
        ((a = (e = t)[0]), (n = e[1]), (o = e[2]), (r = void 0)),
        o || (o = !1);
      for (var h, p = a.split(" "), c = 0; c < this.length; c += 1) {
        var u = this[c];
        if (r)
          for (h = 0; h < p.length; h += 1) {
            var v = p[h];
            u.dom7LiveListeners || (u.dom7LiveListeners = {}),
              u.dom7LiveListeners[v] || (u.dom7LiveListeners[v] = []),
              u.dom7LiveListeners[v].push({ listener: n, proxyListener: l }),
              u.addEventListener(v, l, o);
          }
        else
          for (h = 0; h < p.length; h += 1) {
            var f = p[h];
            u.dom7Listeners || (u.dom7Listeners = {}),
              u.dom7Listeners[f] || (u.dom7Listeners[f] = []),
              u.dom7Listeners[f].push({ listener: n, proxyListener: d }),
              u.addEventListener(f, d, o);
          }
      }
      return this;
    },
    off: function () {
      for (var e, t = [], i = arguments.length; i--; ) t[i] = arguments[i];
      var s = t[0],
        a = t[1],
        r = t[2],
        n = t[3];
      "function" == typeof t[1] &&
        ((s = (e = t)[0]), (r = e[1]), (n = e[2]), (a = void 0)),
        n || (n = !1);
      for (var o = s.split(" "), l = 0; l < o.length; l += 1)
        for (var d = o[l], h = 0; h < this.length; h += 1) {
          var p = this[h],
            c = void 0;
          if (
            (!a && p.dom7Listeners
              ? (c = p.dom7Listeners[d])
              : a && p.dom7LiveListeners && (c = p.dom7LiveListeners[d]),
            c && c.length)
          )
            for (var u = c.length - 1; u >= 0; u -= 1) {
              var v = c[u];
              r && v.listener === r
                ? (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1))
                : r &&
                  v.listener &&
                  v.listener.dom7proxy &&
                  v.listener.dom7proxy === r
                ? (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1))
                : r ||
                  (p.removeEventListener(d, v.proxyListener, n),
                  c.splice(u, 1));
            }
        }
      return this;
    },
    trigger: function () {
      for (var i = [], s = arguments.length; s--; ) i[s] = arguments[s];
      for (var a = i[0].split(" "), r = i[1], n = 0; n < a.length; n += 1)
        for (var o = a[n], l = 0; l < this.length; l += 1) {
          var d = this[l],
            h = void 0;
          try {
            h = new t.CustomEvent(o, {
              detail: r,
              bubbles: !0,
              cancelable: !0,
            });
          } catch (t) {
            (h = e.createEvent("Event")).initEvent(o, !0, !0), (h.detail = r);
          }
          (d.dom7EventData = i.filter(function (e, t) {
            return t > 0;
          })),
            d.dispatchEvent(h),
            (d.dom7EventData = []),
            delete d.dom7EventData;
        }
      return this;
    },
    transitionEnd: function (e) {
      var t,
        i = ["webkitTransitionEnd", "transitionend"],
        s = this;
      function a(r) {
        if (r.target === this)
          for (e.call(this, r), t = 0; t < i.length; t += 1) s.off(i[t], a);
      }
      if (e) for (t = 0; t < i.length; t += 1) s.on(i[t], a);
      return this;
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          var t = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(t.getPropertyValue("margin-right")) +
            parseFloat(t.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          var t = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(t.getPropertyValue("margin-top")) +
            parseFloat(t.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    offset: function () {
      if (this.length > 0) {
        var i = this[0],
          s = i.getBoundingClientRect(),
          a = e.body,
          r = i.clientTop || a.clientTop || 0,
          n = i.clientLeft || a.clientLeft || 0,
          o = i === t ? t.scrollY : i.scrollTop,
          l = i === t ? t.scrollX : i.scrollLeft;
        return { top: s.top + o - r, left: s.left + l - n };
      }
      return null;
    },
    css: function (e, i) {
      var s;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (s = 0; s < this.length; s += 1)
            for (var a in e) this[s].style[a] = e[a];
          return this;
        }
        if (this[0])
          return t.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (s = 0; s < this.length; s += 1) this[s].style[e] = i;
        return this;
      }
      return this;
    },
    each: function (e) {
      if (!e) return this;
      for (var t = 0; t < this.length; t += 1)
        if (!1 === e.call(this[t], t, this[t])) return this;
      return this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
      for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (a) {
      var r,
        n,
        o = this[0];
      if (!o || void 0 === a) return !1;
      if ("string" == typeof a) {
        if (o.matches) return o.matches(a);
        if (o.webkitMatchesSelector) return o.webkitMatchesSelector(a);
        if (o.msMatchesSelector) return o.msMatchesSelector(a);
        for (r = s(a), n = 0; n < r.length; n += 1) if (r[n] === o) return !0;
        return !1;
      }
      if (a === e) return o === e;
      if (a === t) return o === t;
      if (a.nodeType || a instanceof i) {
        for (r = a.nodeType ? [a] : a, n = 0; n < r.length; n += 1)
          if (r[n] === o) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      var e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      var t,
        s = this.length;
      return new i(
        e > s - 1 ? [] : e < 0 ? ((t = s + e) < 0 ? [] : [this[t]]) : [this[e]]
      );
    },
    append: function () {
      for (var t, s = [], a = arguments.length; a--; ) s[a] = arguments[a];
      for (var r = 0; r < s.length; r += 1) {
        t = s[r];
        for (var n = 0; n < this.length; n += 1)
          if ("string" == typeof t) {
            var o = e.createElement("div");
            for (o.innerHTML = t; o.firstChild; )
              this[n].appendChild(o.firstChild);
          } else if (t instanceof i)
            for (var l = 0; l < t.length; l += 1) this[n].appendChild(t[l]);
          else this[n].appendChild(t);
      }
      return this;
    },
    prepend: function (t) {
      var s, a;
      for (s = 0; s < this.length; s += 1)
        if ("string" == typeof t) {
          var r = e.createElement("div");
          for (r.innerHTML = t, a = r.childNodes.length - 1; a >= 0; a -= 1)
            this[s].insertBefore(r.childNodes[a], this[s].childNodes[0]);
        } else if (t instanceof i)
          for (a = 0; a < t.length; a += 1)
            this[s].insertBefore(t[a], this[s].childNodes[0]);
        else this[s].insertBefore(t, this[s].childNodes[0]);
      return this;
    },
    next: function (e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && s(this[0].nextElementSibling).is(e)
            ? new i([this[0].nextElementSibling])
            : new i([])
          : this[0].nextElementSibling
          ? new i([this[0].nextElementSibling])
          : new i([])
        : new i([]);
    },
    nextAll: function (e) {
      var t = [],
        a = this[0];
      if (!a) return new i([]);
      for (; a.nextElementSibling; ) {
        var r = a.nextElementSibling;
        e ? s(r).is(e) && t.push(r) : t.push(r), (a = r);
      }
      return new i(t);
    },
    prev: function (e) {
      if (this.length > 0) {
        var t = this[0];
        return e
          ? t.previousElementSibling && s(t.previousElementSibling).is(e)
            ? new i([t.previousElementSibling])
            : new i([])
          : t.previousElementSibling
          ? new i([t.previousElementSibling])
          : new i([]);
      }
      return new i([]);
    },
    prevAll: function (e) {
      var t = [],
        a = this[0];
      if (!a) return new i([]);
      for (; a.previousElementSibling; ) {
        var r = a.previousElementSibling;
        e ? s(r).is(e) && t.push(r) : t.push(r), (a = r);
      }
      return new i(t);
    },
    parent: function (e) {
      for (var t = [], i = 0; i < this.length; i += 1)
        null !== this[i].parentNode &&
          (e
            ? s(this[i].parentNode).is(e) && t.push(this[i].parentNode)
            : t.push(this[i].parentNode));
      return s(a(t));
    },
    parents: function (e) {
      for (var t = [], i = 0; i < this.length; i += 1)
        for (var r = this[i].parentNode; r; )
          e ? s(r).is(e) && t.push(r) : t.push(r), (r = r.parentNode);
      return s(a(t));
    },
    closest: function (e) {
      var t = this;
      return void 0 === e
        ? new i([])
        : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      for (var t = [], s = 0; s < this.length; s += 1)
        for (var a = this[s].querySelectorAll(e), r = 0; r < a.length; r += 1)
          t.push(a[r]);
      return new i(t);
    },
    children: function (e) {
      for (var t = [], r = 0; r < this.length; r += 1)
        for (var n = this[r].childNodes, o = 0; o < n.length; o += 1)
          e
            ? 1 === n[o].nodeType && s(n[o]).is(e) && t.push(n[o])
            : 1 === n[o].nodeType && t.push(n[o]);
      return new i(a(t));
    },
    filter: function (e) {
      for (var t = [], s = 0; s < this.length; s += 1)
        e.call(this[s], s, this[s]) && t.push(this[s]);
      return new i(t);
    },
    remove: function () {
      for (var e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
    add: function () {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
      var i, a;
      for (i = 0; i < e.length; i += 1) {
        var r = s(e[i]);
        for (a = 0; a < r.length; a += 1)
          (this[this.length] = r[a]), (this.length += 1);
      }
      return this;
    },
    styles: function () {
      return this[0] ? t.getComputedStyle(this[0], null) : {};
    },
  };
  Object.keys(r).forEach(function (e) {
    s.fn[e] = s.fn[e] || r[e];
  });
  var n = {
      deleteProps: function (e) {
        var t = e;
        Object.keys(t).forEach(function (e) {
          try {
            t[e] = null;
          } catch (e) {}
          try {
            delete t[e];
          } catch (e) {}
        });
      },
      nextTick: function (e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t);
      },
      now: function () {
        return Date.now();
      },
      getTranslate: function (e, i) {
        var s, a, r;
        void 0 === i && (i = "x");
        var n = t.getComputedStyle(e, null);
        return (
          t.WebKitCSSMatrix
            ? ((a = n.transform || n.webkitTransform).split(",").length > 6 &&
                (a = a
                  .split(", ")
                  .map(function (e) {
                    return e.replace(",", ".");
                  })
                  .join(", ")),
              (r = new t.WebKitCSSMatrix("none" === a ? "" : a)))
            : (s = (r =
                n.MozTransform ||
                n.OTransform ||
                n.MsTransform ||
                n.msTransform ||
                n.transform ||
                n
                  .getPropertyValue("transform")
                  .replace("translate(", "matrix(1, 0, 0, 1,"))
                .toString()
                .split(",")),
          "x" === i &&
            (a = t.WebKitCSSMatrix
              ? r.m41
              : 16 === s.length
              ? parseFloat(s[12])
              : parseFloat(s[4])),
          "y" === i &&
            (a = t.WebKitCSSMatrix
              ? r.m42
              : 16 === s.length
              ? parseFloat(s[13])
              : parseFloat(s[5])),
          a || 0
        );
      },
      parseUrlQuery: function (e) {
        var i,
          s,
          a,
          r,
          n = {},
          o = e || t.location.href;
        if ("string" == typeof o && o.length)
          for (
            r = (s = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "")
              .split("&")
              .filter(function (e) {
                return "" !== e;
              })).length,
              i = 0;
            i < r;
            i += 1
          )
            (a = s[i].replace(/#\S+/g, "").split("=")),
              (n[decodeURIComponent(a[0])] =
                void 0 === a[1] ? void 0 : decodeURIComponent(a[1]) || "");
        return n;
      },
      isObject: function (e) {
        return (
          "object" == typeof e &&
          null !== e &&
          e.constructor &&
          e.constructor === Object
        );
      },
      extend: function () {
        for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
        for (var i = Object(e[0]), s = 1; s < e.length; s += 1) {
          var a = e[s];
          if (null != a)
            for (
              var r = Object.keys(Object(a)), o = 0, l = r.length;
              o < l;
              o += 1
            ) {
              var d = r[o],
                h = Object.getOwnPropertyDescriptor(a, d);
              void 0 !== h &&
                h.enumerable &&
                (n.isObject(i[d]) && n.isObject(a[d])
                  ? n.extend(i[d], a[d])
                  : !n.isObject(i[d]) && n.isObject(a[d])
                  ? ((i[d] = {}), n.extend(i[d], a[d]))
                  : (i[d] = a[d]));
            }
        }
        return i;
      },
    },
    o = {
      touch:
        (t.Modernizr && !0 === t.Modernizr.touch) ||
        !!(
          t.navigator.maxTouchPoints > 0 ||
          "ontouchstart" in t ||
          (t.DocumentTouch && e instanceof t.DocumentTouch)
        ),
      pointerEvents:
        !!t.PointerEvent &&
        "maxTouchPoints" in t.navigator &&
        t.navigator.maxTouchPoints > 0,
      observer: "MutationObserver" in t || "WebkitMutationObserver" in t,
      passiveListener: (function () {
        var e = !1;
        try {
          var i = Object.defineProperty({}, "passive", {
            get: function () {
              e = !0;
            },
          });
          t.addEventListener("testPassiveListener", null, i);
        } catch (e) {}
        return e;
      })(),
      gestures: "ongesturestart" in t,
    },
    l = function (e) {
      void 0 === e && (e = {});
      var t = this;
      (t.params = e),
        (t.eventsListeners = {}),
        t.params &&
          t.params.on &&
          Object.keys(t.params.on).forEach(function (e) {
            t.on(e, t.params.on[e]);
          });
    },
    d = { components: { configurable: !0 } };
  (l.prototype.on = function (e, t, i) {
    var s = this;
    if ("function" != typeof t) return s;
    var a = i ? "unshift" : "push";
    return (
      e.split(" ").forEach(function (e) {
        s.eventsListeners[e] || (s.eventsListeners[e] = []),
          s.eventsListeners[e][a](t);
      }),
      s
    );
  }),
    (l.prototype.once = function (e, t, i) {
      var s = this;
      if ("function" != typeof t) return s;
      function a() {
        for (var i = [], r = arguments.length; r--; ) i[r] = arguments[r];
        s.off(e, a), a.f7proxy && delete a.f7proxy, t.apply(s, i);
      }
      return (a.f7proxy = t), s.on(e, a, i);
    }),
    (l.prototype.off = function (e, t) {
      var i = this;
      return i.eventsListeners
        ? (e.split(" ").forEach(function (e) {
            void 0 === t
              ? (i.eventsListeners[e] = [])
              : i.eventsListeners[e] &&
                i.eventsListeners[e].length &&
                i.eventsListeners[e].forEach(function (s, a) {
                  (s === t || (s.f7proxy && s.f7proxy === t)) &&
                    i.eventsListeners[e].splice(a, 1);
                });
          }),
          i)
        : i;
    }),
    (l.prototype.emit = function () {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
      var i,
        s,
        a,
        r = this;
      if (!r.eventsListeners) return r;
      "string" == typeof e[0] || Array.isArray(e[0])
        ? ((i = e[0]), (s = e.slice(1, e.length)), (a = r))
        : ((i = e[0].events), (s = e[0].data), (a = e[0].context || r));
      var n = Array.isArray(i) ? i : i.split(" ");
      return (
        n.forEach(function (e) {
          if (r.eventsListeners && r.eventsListeners[e]) {
            var t = [];
            r.eventsListeners[e].forEach(function (e) {
              t.push(e);
            }),
              t.forEach(function (e) {
                e.apply(a, s);
              });
          }
        }),
        r
      );
    }),
    (l.prototype.useModulesParams = function (e) {
      var t = this;
      t.modules &&
        Object.keys(t.modules).forEach(function (i) {
          var s = t.modules[i];
          s.params && n.extend(e, s.params);
        });
    }),
    (l.prototype.useModules = function (e) {
      void 0 === e && (e = {});
      var t = this;
      t.modules &&
        Object.keys(t.modules).forEach(function (i) {
          var s = t.modules[i],
            a = e[i] || {};
          s.instance &&
            Object.keys(s.instance).forEach(function (e) {
              var i = s.instance[e];
              t[e] = "function" == typeof i ? i.bind(t) : i;
            }),
            s.on &&
              t.on &&
              Object.keys(s.on).forEach(function (e) {
                t.on(e, s.on[e]);
              }),
            s.create && s.create.bind(t)(a);
        });
    }),
    (d.components.set = function (e) {
      this.use && this.use(e);
    }),
    (l.installModule = function (e) {
      for (var t = [], i = arguments.length - 1; i-- > 0; )
        t[i] = arguments[i + 1];
      var s = this;
      s.prototype.modules || (s.prototype.modules = {});
      var a = e.name || Object.keys(s.prototype.modules).length + "_" + n.now();
      return (
        (s.prototype.modules[a] = e),
        e.proto &&
          Object.keys(e.proto).forEach(function (t) {
            s.prototype[t] = e.proto[t];
          }),
        e.static &&
          Object.keys(e.static).forEach(function (t) {
            s[t] = e.static[t];
          }),
        e.install && e.install.apply(s, t),
        s
      );
    }),
    (l.use = function (e) {
      for (var t = [], i = arguments.length - 1; i-- > 0; )
        t[i] = arguments[i + 1];
      var s = this;
      return Array.isArray(e)
        ? (e.forEach(function (e) {
            return s.installModule(e);
          }),
          s)
        : s.installModule.apply(s, [e].concat(t));
    }),
    Object.defineProperties(l, d);
  var h = {
    updateSize: function () {
      var e,
        t,
        i = this.$el;
      (e = void 0 !== this.params.width ? this.params.width : i[0].clientWidth),
        (t =
          void 0 !== this.params.height
            ? this.params.height
            : i[0].clientHeight),
        (0 === e && this.isHorizontal()) ||
          (0 === t && this.isVertical()) ||
          ((e =
            e -
            parseInt(i.css("padding-left"), 10) -
            parseInt(i.css("padding-right"), 10)),
          (t =
            t -
            parseInt(i.css("padding-top"), 10) -
            parseInt(i.css("padding-bottom"), 10)),
          n.extend(this, {
            width: e,
            height: t,
            size: this.isHorizontal() ? e : t,
          }));
    },
    updateSlides: function () {
      var e = this.params,
        i = this.$wrapperEl,
        s = this.size,
        a = this.rtlTranslate,
        r = this.wrongRTL,
        o = this.virtual && e.virtual.enabled,
        l = o ? this.virtual.slides.length : this.slides.length,
        d = i.children("." + this.params.slideClass),
        h = o ? this.virtual.slides.length : d.length,
        p = [],
        c = [],
        u = [];
      function v(t) {
        return !e.cssMode || t !== d.length - 1;
      }
      var f = e.slidesOffsetBefore;
      "function" == typeof f && (f = e.slidesOffsetBefore.call(this));
      var m = e.slidesOffsetAfter;
      "function" == typeof m && (m = e.slidesOffsetAfter.call(this));
      var g = this.snapGrid.length,
        b = this.snapGrid.length,
        w = e.spaceBetween,
        y = -f,
        x = 0,
        T = 0;
      if (void 0 !== s) {
        var E, S;
        "string" == typeof w &&
          w.indexOf("%") >= 0 &&
          (w = (parseFloat(w.replace("%", "")) / 100) * s),
          (this.virtualSize = -w),
          a
            ? d.css({ marginLeft: "", marginTop: "" })
            : d.css({ marginRight: "", marginBottom: "" }),
          e.slidesPerColumn > 1 &&
            ((E =
              Math.floor(h / e.slidesPerColumn) ===
              h / this.params.slidesPerColumn
                ? h
                : Math.ceil(h / e.slidesPerColumn) * e.slidesPerColumn),
            "auto" !== e.slidesPerView &&
              "row" === e.slidesPerColumnFill &&
              (E = Math.max(E, e.slidesPerView * e.slidesPerColumn)));
        for (
          var C,
            M = e.slidesPerColumn,
            P = E / M,
            z = Math.floor(h / e.slidesPerColumn),
            k = 0;
          k < h;
          k += 1
        ) {
          S = 0;
          var $ = d.eq(k);
          if (e.slidesPerColumn > 1) {
            var L = void 0,
              I = void 0,
              D = void 0;
            if ("row" === e.slidesPerColumnFill && e.slidesPerGroup > 1) {
              var O = Math.floor(k / (e.slidesPerGroup * e.slidesPerColumn)),
                A = k - e.slidesPerColumn * e.slidesPerGroup * O,
                G =
                  0 === O
                    ? e.slidesPerGroup
                    : Math.min(
                        Math.ceil((h - O * M * e.slidesPerGroup) / M),
                        e.slidesPerGroup
                      );
              (L =
                (I = A - (D = Math.floor(A / G)) * G + O * e.slidesPerGroup) +
                (D * E) / M),
                $.css({
                  "-webkit-box-ordinal-group": L,
                  "-moz-box-ordinal-group": L,
                  "-ms-flex-order": L,
                  "-webkit-order": L,
                  order: L,
                });
            } else
              "column" === e.slidesPerColumnFill
                ? ((D = k - (I = Math.floor(k / M)) * M),
                  (I > z || (I === z && D === M - 1)) &&
                    (D += 1) >= M &&
                    ((D = 0), (I += 1)))
                : (I = k - (D = Math.floor(k / P)) * P);
            $.css(
              "margin-" + (this.isHorizontal() ? "top" : "left"),
              0 !== D && e.spaceBetween && e.spaceBetween + "px"
            );
          }
          if ("none" !== $.css("display")) {
            if ("auto" === e.slidesPerView) {
              var H = t.getComputedStyle($[0], null),
                B = $[0].style.transform,
                N = $[0].style.webkitTransform;
              if (
                (B && ($[0].style.transform = "none"),
                N && ($[0].style.webkitTransform = "none"),
                e.roundLengths)
              )
                S = this.isHorizontal() ? $.outerWidth(!0) : $.outerHeight(!0);
              else if (this.isHorizontal()) {
                var X = parseFloat(H.getPropertyValue("width")),
                  V = parseFloat(H.getPropertyValue("padding-left")),
                  Y = parseFloat(H.getPropertyValue("padding-right")),
                  F = parseFloat(H.getPropertyValue("margin-left")),
                  W = parseFloat(H.getPropertyValue("margin-right")),
                  R = H.getPropertyValue("box-sizing");
                S = R && "border-box" === R ? X + F + W : X + V + Y + F + W;
              } else {
                var q = parseFloat(H.getPropertyValue("height")),
                  j = parseFloat(H.getPropertyValue("padding-top")),
                  K = parseFloat(H.getPropertyValue("padding-bottom")),
                  U = parseFloat(H.getPropertyValue("margin-top")),
                  _ = parseFloat(H.getPropertyValue("margin-bottom")),
                  Z = H.getPropertyValue("box-sizing");
                S = Z && "border-box" === Z ? q + U + _ : q + j + K + U + _;
              }
              B && ($[0].style.transform = B),
                N && ($[0].style.webkitTransform = N),
                e.roundLengths && (S = Math.floor(S));
            } else
              (S = (s - (e.slidesPerView - 1) * w) / e.slidesPerView),
                e.roundLengths && (S = Math.floor(S)),
                d[k] &&
                  (this.isHorizontal()
                    ? (d[k].style.width = S + "px")
                    : (d[k].style.height = S + "px"));
            d[k] && (d[k].swiperSlideSize = S),
              u.push(S),
              e.centeredSlides
                ? ((y = y + S / 2 + x / 2 + w),
                  0 === x && 0 !== k && (y = y - s / 2 - w),
                  0 === k && (y = y - s / 2 - w),
                  Math.abs(y) < 0.001 && (y = 0),
                  e.roundLengths && (y = Math.floor(y)),
                  T % e.slidesPerGroup == 0 && p.push(y),
                  c.push(y))
                : (e.roundLengths && (y = Math.floor(y)),
                  (T - Math.min(this.params.slidesPerGroupSkip, T)) %
                    this.params.slidesPerGroup ==
                    0 && p.push(y),
                  c.push(y),
                  (y = y + S + w)),
              (this.virtualSize += S + w),
              (x = S),
              (T += 1);
          }
        }
        if (
          ((this.virtualSize = Math.max(this.virtualSize, s) + m),
          a &&
            r &&
            ("slide" === e.effect || "coverflow" === e.effect) &&
            i.css({ width: this.virtualSize + e.spaceBetween + "px" }),
          e.setWrapperSize &&
            (this.isHorizontal()
              ? i.css({ width: this.virtualSize + e.spaceBetween + "px" })
              : i.css({ height: this.virtualSize + e.spaceBetween + "px" })),
          e.slidesPerColumn > 1 &&
            ((this.virtualSize = (S + e.spaceBetween) * E),
            (this.virtualSize =
              Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween),
            this.isHorizontal()
              ? i.css({ width: this.virtualSize + e.spaceBetween + "px" })
              : i.css({ height: this.virtualSize + e.spaceBetween + "px" }),
            e.centeredSlides))
        ) {
          C = [];
          for (var Q = 0; Q < p.length; Q += 1) {
            var J = p[Q];
            e.roundLengths && (J = Math.floor(J)),
              p[Q] < this.virtualSize + p[0] && C.push(J);
          }
          p = C;
        }
        if (!e.centeredSlides) {
          C = [];
          for (var ee = 0; ee < p.length; ee += 1) {
            var te = p[ee];
            e.roundLengths && (te = Math.floor(te)),
              p[ee] <= this.virtualSize - s && C.push(te);
          }
          (p = C),
            Math.floor(this.virtualSize - s) - Math.floor(p[p.length - 1]) >
              1 && p.push(this.virtualSize - s);
        }
        if (
          (0 === p.length && (p = [0]),
          0 !== e.spaceBetween &&
            (this.isHorizontal()
              ? a
                ? d.filter(v).css({ marginLeft: w + "px" })
                : d.filter(v).css({ marginRight: w + "px" })
              : d.filter(v).css({ marginBottom: w + "px" })),
          e.centeredSlides && e.centeredSlidesBounds)
        ) {
          var ie = 0;
          u.forEach(function (t) {
            ie += t + (e.spaceBetween ? e.spaceBetween : 0);
          });
          var se = (ie -= e.spaceBetween) - s;
          p = p.map(function (e) {
            return e < 0 ? -f : e > se ? se + m : e;
          });
        }
        if (e.centerInsufficientSlides) {
          var ae = 0;
          if (
            (u.forEach(function (t) {
              ae += t + (e.spaceBetween ? e.spaceBetween : 0);
            }),
            (ae -= e.spaceBetween) < s)
          ) {
            var re = (s - ae) / 2;
            p.forEach(function (e, t) {
              p[t] = e - re;
            }),
              c.forEach(function (e, t) {
                c[t] = e + re;
              });
          }
        }
        n.extend(this, {
          slides: d,
          snapGrid: p,
          slidesGrid: c,
          slidesSizesGrid: u,
        }),
          h !== l && this.emit("slidesLengthChange"),
          p.length !== g &&
            (this.params.watchOverflow && this.checkOverflow(),
            this.emit("snapGridLengthChange")),
          c.length !== b && this.emit("slidesGridLengthChange"),
          (e.watchSlidesProgress || e.watchSlidesVisibility) &&
            this.updateSlidesOffset();
      }
    },
    updateAutoHeight: function (e) {
      var t,
        i = [],
        s = 0;
      if (
        ("number" == typeof e
          ? this.setTransition(e)
          : !0 === e && this.setTransition(this.params.speed),
        "auto" !== this.params.slidesPerView && this.params.slidesPerView > 1)
      )
        if (this.params.centeredSlides) i.push.apply(i, this.visibleSlides);
        else
          for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
            var a = this.activeIndex + t;
            if (a > this.slides.length) break;
            i.push(this.slides.eq(a)[0]);
          }
      else i.push(this.slides.eq(this.activeIndex)[0]);
      for (t = 0; t < i.length; t += 1)
        if (void 0 !== i[t]) {
          var r = i[t].offsetHeight;
          s = r > s ? r : s;
        }
      s && this.$wrapperEl.css("height", s + "px");
    },
    updateSlidesOffset: function () {
      for (var e = this.slides, t = 0; t < e.length; t += 1)
        e[t].swiperSlideOffset = this.isHorizontal()
          ? e[t].offsetLeft
          : e[t].offsetTop;
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      var t = this.params,
        i = this.slides,
        a = this.rtlTranslate;
      if (0 !== i.length) {
        void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
        var r = -e;
        a && (r = e),
          i.removeClass(t.slideVisibleClass),
          (this.visibleSlidesIndexes = []),
          (this.visibleSlides = []);
        for (var n = 0; n < i.length; n += 1) {
          var o = i[n],
            l =
              (r +
                (t.centeredSlides ? this.minTranslate() : 0) -
                o.swiperSlideOffset) /
              (o.swiperSlideSize + t.spaceBetween);
          if (t.watchSlidesVisibility || (t.centeredSlides && t.autoHeight)) {
            var d = -(r - o.swiperSlideOffset),
              h = d + this.slidesSizesGrid[n];
            ((d >= 0 && d < this.size - 1) ||
              (h > 1 && h <= this.size) ||
              (d <= 0 && h >= this.size)) &&
              (this.visibleSlides.push(o),
              this.visibleSlidesIndexes.push(n),
              i.eq(n).addClass(t.slideVisibleClass));
          }
          o.progress = a ? -l : l;
        }
        this.visibleSlides = s(this.visibleSlides);
      }
    },
    updateProgress: function (e) {
      if (void 0 === e) {
        var t = this.rtlTranslate ? -1 : 1;
        e = (this && this.translate && this.translate * t) || 0;
      }
      var i = this.params,
        s = this.maxTranslate() - this.minTranslate(),
        a = this.progress,
        r = this.isBeginning,
        o = this.isEnd,
        l = r,
        d = o;
      0 === s
        ? ((a = 0), (r = !0), (o = !0))
        : ((r = (a = (e - this.minTranslate()) / s) <= 0), (o = a >= 1)),
        n.extend(this, { progress: a, isBeginning: r, isEnd: o }),
        (i.watchSlidesProgress ||
          i.watchSlidesVisibility ||
          (i.centeredSlides && i.autoHeight)) &&
          this.updateSlidesProgress(e),
        r && !l && this.emit("reachBeginning toEdge"),
        o && !d && this.emit("reachEnd toEdge"),
        ((l && !r) || (d && !o)) && this.emit("fromEdge"),
        this.emit("progress", a);
    },
    updateSlidesClasses: function () {
      var e,
        t = this.slides,
        i = this.params,
        s = this.$wrapperEl,
        a = this.activeIndex,
        r = this.realIndex,
        n = this.virtual && i.virtual.enabled;
      t.removeClass(
        i.slideActiveClass +
          " " +
          i.slideNextClass +
          " " +
          i.slidePrevClass +
          " " +
          i.slideDuplicateActiveClass +
          " " +
          i.slideDuplicateNextClass +
          " " +
          i.slideDuplicatePrevClass
      ),
        (e = n
          ? this.$wrapperEl.find(
              "." + i.slideClass + '[data-swiper-slide-index="' + a + '"]'
            )
          : t.eq(a)).addClass(i.slideActiveClass),
        i.loop &&
          (e.hasClass(i.slideDuplicateClass)
            ? s
                .children(
                  "." +
                    i.slideClass +
                    ":not(." +
                    i.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    r +
                    '"]'
                )
                .addClass(i.slideDuplicateActiveClass)
            : s
                .children(
                  "." +
                    i.slideClass +
                    "." +
                    i.slideDuplicateClass +
                    '[data-swiper-slide-index="' +
                    r +
                    '"]'
                )
                .addClass(i.slideDuplicateActiveClass));
      var o = e
        .nextAll("." + i.slideClass)
        .eq(0)
        .addClass(i.slideNextClass);
      i.loop && 0 === o.length && (o = t.eq(0)).addClass(i.slideNextClass);
      var l = e
        .prevAll("." + i.slideClass)
        .eq(0)
        .addClass(i.slidePrevClass);
      i.loop && 0 === l.length && (l = t.eq(-1)).addClass(i.slidePrevClass),
        i.loop &&
          (o.hasClass(i.slideDuplicateClass)
            ? s
                .children(
                  "." +
                    i.slideClass +
                    ":not(." +
                    i.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    o.attr("data-swiper-slide-index") +
                    '"]'
                )
                .addClass(i.slideDuplicateNextClass)
            : s
                .children(
                  "." +
                    i.slideClass +
                    "." +
                    i.slideDuplicateClass +
                    '[data-swiper-slide-index="' +
                    o.attr("data-swiper-slide-index") +
                    '"]'
                )
                .addClass(i.slideDuplicateNextClass),
          l.hasClass(i.slideDuplicateClass)
            ? s
                .children(
                  "." +
                    i.slideClass +
                    ":not(." +
                    i.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    l.attr("data-swiper-slide-index") +
                    '"]'
                )
                .addClass(i.slideDuplicatePrevClass)
            : s
                .children(
                  "." +
                    i.slideClass +
                    "." +
                    i.slideDuplicateClass +
                    '[data-swiper-slide-index="' +
                    l.attr("data-swiper-slide-index") +
                    '"]'
                )
                .addClass(i.slideDuplicatePrevClass));
    },
    updateActiveIndex: function (e) {
      var t,
        i = this.rtlTranslate ? this.translate : -this.translate,
        s = this.slidesGrid,
        a = this.snapGrid,
        r = this.params,
        o = this.activeIndex,
        l = this.realIndex,
        d = this.snapIndex,
        h = e;
      if (void 0 === h) {
        for (var p = 0; p < s.length; p += 1)
          void 0 !== s[p + 1]
            ? i >= s[p] && i < s[p + 1] - (s[p + 1] - s[p]) / 2
              ? (h = p)
              : i >= s[p] && i < s[p + 1] && (h = p + 1)
            : i >= s[p] && (h = p);
        r.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0);
      }
      if (a.indexOf(i) >= 0) t = a.indexOf(i);
      else {
        var c = Math.min(r.slidesPerGroupSkip, h);
        t = c + Math.floor((h - c) / r.slidesPerGroup);
      }
      if ((t >= a.length && (t = a.length - 1), h !== o)) {
        var u = parseInt(
          this.slides.eq(h).attr("data-swiper-slide-index") || h,
          10
        );
        n.extend(this, {
          snapIndex: t,
          realIndex: u,
          previousIndex: o,
          activeIndex: h,
        }),
          this.emit("activeIndexChange"),
          this.emit("snapIndexChange"),
          l !== u && this.emit("realIndexChange"),
          (this.initialized || this.runCallbacksOnInit) &&
            this.emit("slideChange");
      } else t !== d && ((this.snapIndex = t), this.emit("snapIndexChange"));
    },
    updateClickedSlide: function (e) {
      var t = this.params,
        i = s(e.target).closest("." + t.slideClass)[0],
        a = !1;
      if (i)
        for (var r = 0; r < this.slides.length; r += 1)
          this.slides[r] === i && (a = !0);
      if (!i || !a)
        return (this.clickedSlide = void 0), void (this.clickedIndex = void 0);
      (this.clickedSlide = i),
        this.virtual && this.params.virtual.enabled
          ? (this.clickedIndex = parseInt(
              s(i).attr("data-swiper-slide-index"),
              10
            ))
          : (this.clickedIndex = s(i).index()),
        t.slideToClickedSlide &&
          void 0 !== this.clickedIndex &&
          this.clickedIndex !== this.activeIndex &&
          this.slideToClickedSlide();
    },
  };
  var p = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      var t = this.params,
        i = this.rtlTranslate,
        s = this.translate,
        a = this.$wrapperEl;
      if (t.virtualTranslate) return i ? -s : s;
      if (t.cssMode) return s;
      var r = n.getTranslate(a[0], e);
      return i && (r = -r), r || 0;
    },
    setTranslate: function (e, t) {
      var i = this.rtlTranslate,
        s = this.params,
        a = this.$wrapperEl,
        r = this.wrapperEl,
        n = this.progress,
        o = 0,
        l = 0;
      this.isHorizontal() ? (o = i ? -e : e) : (l = e),
        s.roundLengths && ((o = Math.floor(o)), (l = Math.floor(l))),
        s.cssMode
          ? (r[
              this.isHorizontal() ? "scrollLeft" : "scrollTop"
            ] = this.isHorizontal() ? -o : -l)
          : s.virtualTranslate ||
            a.transform("translate3d(" + o + "px, " + l + "px, 0px)"),
        (this.previousTranslate = this.translate),
        (this.translate = this.isHorizontal() ? o : l);
      var d = this.maxTranslate() - this.minTranslate();
      (0 === d ? 0 : (e - this.minTranslate()) / d) !== n &&
        this.updateProgress(e),
        this.emit("setTranslate", this.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, i, s, a) {
      var r;
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === i && (i = !0),
        void 0 === s && (s = !0);
      var n = this,
        o = n.params,
        l = n.wrapperEl;
      if (n.animating && o.preventInteractionOnTransition) return !1;
      var d,
        h = n.minTranslate(),
        p = n.maxTranslate();
      if (
        ((d = s && e > h ? h : s && e < p ? p : e),
        n.updateProgress(d),
        o.cssMode)
      ) {
        var c = n.isHorizontal();
        return (
          0 === t
            ? (l[c ? "scrollLeft" : "scrollTop"] = -d)
            : l.scrollTo
            ? l.scrollTo(
                (((r = {})[c ? "left" : "top"] = -d),
                (r.behavior = "smooth"),
                r)
              )
            : (l[c ? "scrollLeft" : "scrollTop"] = -d),
          !0
        );
      }
      return (
        0 === t
          ? (n.setTransition(0),
            n.setTranslate(d),
            i &&
              (n.emit("beforeTransitionStart", t, a), n.emit("transitionEnd")))
          : (n.setTransition(t),
            n.setTranslate(d),
            i &&
              (n.emit("beforeTransitionStart", t, a),
              n.emit("transitionStart")),
            n.animating ||
              ((n.animating = !0),
              n.onTranslateToWrapperTransitionEnd ||
                (n.onTranslateToWrapperTransitionEnd = function (e) {
                  n &&
                    !n.destroyed &&
                    e.target === this &&
                    (n.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      n.onTranslateToWrapperTransitionEnd
                    ),
                    n.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      n.onTranslateToWrapperTransitionEnd
                    ),
                    (n.onTranslateToWrapperTransitionEnd = null),
                    delete n.onTranslateToWrapperTransitionEnd,
                    i && n.emit("transitionEnd"));
                }),
              n.$wrapperEl[0].addEventListener(
                "transitionend",
                n.onTranslateToWrapperTransitionEnd
              ),
              n.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                n.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  var c = {
    setTransition: function (e, t) {
      this.params.cssMode || this.$wrapperEl.transition(e),
        this.emit("setTransition", e, t);
    },
    transitionStart: function (e, t) {
      void 0 === e && (e = !0);
      var i = this.activeIndex,
        s = this.params,
        a = this.previousIndex;
      if (!s.cssMode) {
        s.autoHeight && this.updateAutoHeight();
        var r = t;
        if (
          (r || (r = i > a ? "next" : i < a ? "prev" : "reset"),
          this.emit("transitionStart"),
          e && i !== a)
        ) {
          if ("reset" === r) return void this.emit("slideResetTransitionStart");
          this.emit("slideChangeTransitionStart"),
            "next" === r
              ? this.emit("slideNextTransitionStart")
              : this.emit("slidePrevTransitionStart");
        }
      }
    },
    transitionEnd: function (e, t) {
      void 0 === e && (e = !0);
      var i = this.activeIndex,
        s = this.previousIndex,
        a = this.params;
      if (((this.animating = !1), !a.cssMode)) {
        this.setTransition(0);
        var r = t;
        if (
          (r || (r = i > s ? "next" : i < s ? "prev" : "reset"),
          this.emit("transitionEnd"),
          e && i !== s)
        ) {
          if ("reset" === r) return void this.emit("slideResetTransitionEnd");
          this.emit("slideChangeTransitionEnd"),
            "next" === r
              ? this.emit("slideNextTransitionEnd")
              : this.emit("slidePrevTransitionEnd");
        }
      }
    },
  };
  var u = {
    slideTo: function (e, t, i, s) {
      var a;
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === i && (i = !0);
      var r = this,
        n = e;
      n < 0 && (n = 0);
      var o = r.params,
        l = r.snapGrid,
        d = r.slidesGrid,
        h = r.previousIndex,
        p = r.activeIndex,
        c = r.rtlTranslate,
        u = r.wrapperEl;
      if (r.animating && o.preventInteractionOnTransition) return !1;
      var v = Math.min(r.params.slidesPerGroupSkip, n),
        f = v + Math.floor((n - v) / r.params.slidesPerGroup);
      f >= l.length && (f = l.length - 1),
        (p || o.initialSlide || 0) === (h || 0) &&
          i &&
          r.emit("beforeSlideChangeStart");
      var m,
        g = -l[f];
      if ((r.updateProgress(g), o.normalizeSlideIndex))
        for (var b = 0; b < d.length; b += 1)
          -Math.floor(100 * g) >= Math.floor(100 * d[b]) && (n = b);
      if (r.initialized && n !== p) {
        if (!r.allowSlideNext && g < r.translate && g < r.minTranslate())
          return !1;
        if (
          !r.allowSlidePrev &&
          g > r.translate &&
          g > r.maxTranslate() &&
          (p || 0) !== n
        )
          return !1;
      }
      if (
        ((m = n > p ? "next" : n < p ? "prev" : "reset"),
        (c && -g === r.translate) || (!c && g === r.translate))
      )
        return (
          r.updateActiveIndex(n),
          o.autoHeight && r.updateAutoHeight(),
          r.updateSlidesClasses(),
          "slide" !== o.effect && r.setTranslate(g),
          "reset" !== m && (r.transitionStart(i, m), r.transitionEnd(i, m)),
          !1
        );
      if (o.cssMode) {
        var w = r.isHorizontal();
        return (
          0 === t
            ? (u[w ? "scrollLeft" : "scrollTop"] = -g)
            : u.scrollTo
            ? u.scrollTo(
                (((a = {})[w ? "left" : "top"] = -g),
                (a.behavior = "smooth"),
                a)
              )
            : (u[w ? "scrollLeft" : "scrollTop"] = -g),
          !0
        );
      }
      return (
        0 === t
          ? (r.setTransition(0),
            r.setTranslate(g),
            r.updateActiveIndex(n),
            r.updateSlidesClasses(),
            r.emit("beforeTransitionStart", t, s),
            r.transitionStart(i, m),
            r.transitionEnd(i, m))
          : (r.setTransition(t),
            r.setTranslate(g),
            r.updateActiveIndex(n),
            r.updateSlidesClasses(),
            r.emit("beforeTransitionStart", t, s),
            r.transitionStart(i, m),
            r.animating ||
              ((r.animating = !0),
              r.onSlideToWrapperTransitionEnd ||
                (r.onSlideToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      r.onSlideToWrapperTransitionEnd
                    ),
                    r.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      r.onSlideToWrapperTransitionEnd
                    ),
                    (r.onSlideToWrapperTransitionEnd = null),
                    delete r.onSlideToWrapperTransitionEnd,
                    r.transitionEnd(i, m));
                }),
              r.$wrapperEl[0].addEventListener(
                "transitionend",
                r.onSlideToWrapperTransitionEnd
              ),
              r.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                r.onSlideToWrapperTransitionEnd
              ))),
        !0
      );
    },
    slideToLoop: function (e, t, i, s) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === i && (i = !0);
      var a = e;
      return (
        this.params.loop && (a += this.loopedSlides), this.slideTo(a, t, i, s)
      );
    },
    slideNext: function (e, t, i) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var s = this.params,
        a = this.animating,
        r = this.activeIndex < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup;
      if (s.loop) {
        if (a) return !1;
        this.loopFix(), (this._clientLeft = this.$wrapperEl[0].clientLeft);
      }
      return this.slideTo(this.activeIndex + r, e, t, i);
    },
    slidePrev: function (e, t, i) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      var s = this.params,
        a = this.animating,
        r = this.snapGrid,
        n = this.slidesGrid,
        o = this.rtlTranslate;
      if (s.loop) {
        if (a) return !1;
        this.loopFix(), (this._clientLeft = this.$wrapperEl[0].clientLeft);
      }
      function l(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      var d,
        h = l(o ? this.translate : -this.translate),
        p = r.map(function (e) {
          return l(e);
        }),
        c =
          (n.map(function (e) {
            return l(e);
          }),
          r[p.indexOf(h)],
          r[p.indexOf(h) - 1]);
      return (
        void 0 === c &&
          s.cssMode &&
          r.forEach(function (e) {
            !c && h >= e && (c = e);
          }),
        void 0 !== c && (d = n.indexOf(c)) < 0 && (d = this.activeIndex - 1),
        this.slideTo(d, e, t, i)
      );
    },
    slideReset: function (e, t, i) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, i)
      );
    },
    slideToClosest: function (e, t, i, s) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === s && (s = 0.5);
      var a = this.activeIndex,
        r = Math.min(this.params.slidesPerGroupSkip, a),
        n = r + Math.floor((a - r) / this.params.slidesPerGroup),
        o = this.rtlTranslate ? this.translate : -this.translate;
      if (o >= this.snapGrid[n]) {
        var l = this.snapGrid[n];
        o - l > (this.snapGrid[n + 1] - l) * s &&
          (a += this.params.slidesPerGroup);
      } else {
        var d = this.snapGrid[n - 1];
        o - d <= (this.snapGrid[n] - d) * s &&
          (a -= this.params.slidesPerGroup);
      }
      return (
        (a = Math.max(a, 0)),
        (a = Math.min(a, this.slidesGrid.length - 1)),
        this.slideTo(a, e, t, i)
      );
    },
    slideToClickedSlide: function () {
      var e,
        t = this,
        i = t.params,
        a = t.$wrapperEl,
        r =
          "auto" === i.slidesPerView
            ? t.slidesPerViewDynamic()
            : i.slidesPerView,
        o = t.clickedIndex;
      if (i.loop) {
        if (t.animating) return;
        (e = parseInt(s(t.clickedSlide).attr("data-swiper-slide-index"), 10)),
          i.centeredSlides
            ? o < t.loopedSlides - r / 2 ||
              o > t.slides.length - t.loopedSlides + r / 2
              ? (t.loopFix(),
                (o = a
                  .children(
                    "." +
                      i.slideClass +
                      '[data-swiper-slide-index="' +
                      e +
                      '"]:not(.' +
                      i.slideDuplicateClass +
                      ")"
                  )
                  .eq(0)
                  .index()),
                n.nextTick(function () {
                  t.slideTo(o);
                }))
              : t.slideTo(o)
            : o > t.slides.length - r
            ? (t.loopFix(),
              (o = a
                .children(
                  "." +
                    i.slideClass +
                    '[data-swiper-slide-index="' +
                    e +
                    '"]:not(.' +
                    i.slideDuplicateClass +
                    ")"
                )
                .eq(0)
                .index()),
              n.nextTick(function () {
                t.slideTo(o);
              }))
            : t.slideTo(o);
      } else t.slideTo(o);
    },
  };
  var v = {
    loopCreate: function () {
      var t = this,
        i = t.params,
        a = t.$wrapperEl;
      a.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
      var r = a.children("." + i.slideClass);
      if (i.loopFillGroupWithBlank) {
        var n = i.slidesPerGroup - (r.length % i.slidesPerGroup);
        if (n !== i.slidesPerGroup) {
          for (var o = 0; o < n; o += 1) {
            var l = s(e.createElement("div")).addClass(
              i.slideClass + " " + i.slideBlankClass
            );
            a.append(l);
          }
          r = a.children("." + i.slideClass);
        }
      }
      "auto" !== i.slidesPerView ||
        i.loopedSlides ||
        (i.loopedSlides = r.length),
        (t.loopedSlides = Math.ceil(
          parseFloat(i.loopedSlides || i.slidesPerView, 10)
        )),
        (t.loopedSlides += i.loopAdditionalSlides),
        t.loopedSlides > r.length && (t.loopedSlides = r.length);
      var d = [],
        h = [];
      r.each(function (e, i) {
        var a = s(i);
        e < t.loopedSlides && h.push(i),
          e < r.length && e >= r.length - t.loopedSlides && d.push(i),
          a.attr("data-swiper-slide-index", e);
      });
      for (var p = 0; p < h.length; p += 1)
        a.append(s(h[p].cloneNode(!0)).addClass(i.slideDuplicateClass));
      for (var c = d.length - 1; c >= 0; c -= 1)
        a.prepend(s(d[c].cloneNode(!0)).addClass(i.slideDuplicateClass));
    },
    loopFix: function () {
      this.emit("beforeLoopFix");
      var e,
        t = this.activeIndex,
        i = this.slides,
        s = this.loopedSlides,
        a = this.allowSlidePrev,
        r = this.allowSlideNext,
        n = this.snapGrid,
        o = this.rtlTranslate;
      (this.allowSlidePrev = !0), (this.allowSlideNext = !0);
      var l = -n[t] - this.getTranslate();
      if (t < s)
        (e = i.length - 3 * s + t),
          (e += s),
          this.slideTo(e, 0, !1, !0) &&
            0 !== l &&
            this.setTranslate((o ? -this.translate : this.translate) - l);
      else if (t >= i.length - s) {
        (e = -i.length + t + s),
          (e += s),
          this.slideTo(e, 0, !1, !0) &&
            0 !== l &&
            this.setTranslate((o ? -this.translate : this.translate) - l);
      }
      (this.allowSlidePrev = a),
        (this.allowSlideNext = r),
        this.emit("loopFix");
    },
    loopDestroy: function () {
      var e = this.$wrapperEl,
        t = this.params,
        i = this.slides;
      e
        .children(
          "." +
            t.slideClass +
            "." +
            t.slideDuplicateClass +
            ",." +
            t.slideClass +
            "." +
            t.slideBlankClass
        )
        .remove(),
        i.removeAttr("data-swiper-slide-index");
    },
  };
  var f = {
    setGrabCursor: function (e) {
      if (
        !(
          o.touch ||
          !this.params.simulateTouch ||
          (this.params.watchOverflow && this.isLocked) ||
          this.params.cssMode
        )
      ) {
        var t = this.el;
        (t.style.cursor = "move"),
          (t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
          (t.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
          (t.style.cursor = e ? "grabbing" : "grab");
      }
    },
    unsetGrabCursor: function () {
      o.touch ||
        (this.params.watchOverflow && this.isLocked) ||
        this.params.cssMode ||
        (this.el.style.cursor = "");
    },
  };
  var m,
    g,
    b,
    w,
    y,
    x,
    T,
    E,
    S,
    C,
    M,
    P,
    z,
    k,
    $,
    L = {
      appendSlide: function (e) {
        var t = this.$wrapperEl,
          i = this.params;
        if (
          (i.loop && this.loopDestroy(), "object" == typeof e && "length" in e)
        )
          for (var s = 0; s < e.length; s += 1) e[s] && t.append(e[s]);
        else t.append(e);
        i.loop && this.loopCreate(),
          (i.observer && o.observer) || this.update();
      },
      prependSlide: function (e) {
        var t = this.params,
          i = this.$wrapperEl,
          s = this.activeIndex;
        t.loop && this.loopDestroy();
        var a = s + 1;
        if ("object" == typeof e && "length" in e) {
          for (var r = 0; r < e.length; r += 1) e[r] && i.prepend(e[r]);
          a = s + e.length;
        } else i.prepend(e);
        t.loop && this.loopCreate(),
          (t.observer && o.observer) || this.update(),
          this.slideTo(a, 0, !1);
      },
      addSlide: function (e, t) {
        var i = this.$wrapperEl,
          s = this.params,
          a = this.activeIndex;
        s.loop &&
          ((a -= this.loopedSlides),
          this.loopDestroy(),
          (this.slides = i.children("." + s.slideClass)));
        var r = this.slides.length;
        if (e <= 0) this.prependSlide(t);
        else if (e >= r) this.appendSlide(t);
        else {
          for (var n = a > e ? a + 1 : a, l = [], d = r - 1; d >= e; d -= 1) {
            var h = this.slides.eq(d);
            h.remove(), l.unshift(h);
          }
          if ("object" == typeof t && "length" in t) {
            for (var p = 0; p < t.length; p += 1) t[p] && i.append(t[p]);
            n = a > e ? a + t.length : a;
          } else i.append(t);
          for (var c = 0; c < l.length; c += 1) i.append(l[c]);
          s.loop && this.loopCreate(),
            (s.observer && o.observer) || this.update(),
            s.loop
              ? this.slideTo(n + this.loopedSlides, 0, !1)
              : this.slideTo(n, 0, !1);
        }
      },
      removeSlide: function (e) {
        var t = this.params,
          i = this.$wrapperEl,
          s = this.activeIndex;
        t.loop &&
          ((s -= this.loopedSlides),
          this.loopDestroy(),
          (this.slides = i.children("." + t.slideClass)));
        var a,
          r = s;
        if ("object" == typeof e && "length" in e) {
          for (var n = 0; n < e.length; n += 1)
            (a = e[n]),
              this.slides[a] && this.slides.eq(a).remove(),
              a < r && (r -= 1);
          r = Math.max(r, 0);
        } else
          (a = e),
            this.slides[a] && this.slides.eq(a).remove(),
            a < r && (r -= 1),
            (r = Math.max(r, 0));
        t.loop && this.loopCreate(),
          (t.observer && o.observer) || this.update(),
          t.loop
            ? this.slideTo(r + this.loopedSlides, 0, !1)
            : this.slideTo(r, 0, !1);
      },
      removeAllSlides: function () {
        for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
        this.removeSlide(e);
      },
    },
    I =
      ((m = t.navigator.platform),
      (g = t.navigator.userAgent),
      (b = {
        ios: !1,
        android: !1,
        androidChrome: !1,
        desktop: !1,
        iphone: !1,
        ipod: !1,
        ipad: !1,
        edge: !1,
        ie: !1,
        firefox: !1,
        macos: !1,
        windows: !1,
        cordova: !(!t.cordova && !t.phonegap),
        phonegap: !(!t.cordova && !t.phonegap),
        electron: !1,
      }),
      (w = t.screen.width),
      (y = t.screen.height),
      (x = g.match(/(Android);?[\s\/]+([\d.]+)?/)),
      (T = g.match(/(iPad).*OS\s([\d_]+)/)),
      (E = g.match(/(iPod)(.*OS\s([\d_]+))?/)),
      (S = !T && g.match(/(iPhone\sOS|iOS)\s([\d_]+)/)),
      (C = g.indexOf("MSIE ") >= 0 || g.indexOf("Trident/") >= 0),
      (M = g.indexOf("Edge/") >= 0),
      (P = g.indexOf("Gecko/") >= 0 && g.indexOf("Firefox/") >= 0),
      (z = "Win32" === m),
      (k = g.toLowerCase().indexOf("electron") >= 0),
      ($ = "MacIntel" === m),
      !T &&
        $ &&
        o.touch &&
        ((1024 === w && 1366 === y) ||
          (834 === w && 1194 === y) ||
          (834 === w && 1112 === y) ||
          (768 === w && 1024 === y)) &&
        ((T = g.match(/(Version)\/([\d.]+)/)), ($ = !1)),
      (b.ie = C),
      (b.edge = M),
      (b.firefox = P),
      x &&
        !z &&
        ((b.os = "android"),
        (b.osVersion = x[2]),
        (b.android = !0),
        (b.androidChrome = g.toLowerCase().indexOf("chrome") >= 0)),
      (T || S || E) && ((b.os = "ios"), (b.ios = !0)),
      S && !E && ((b.osVersion = S[2].replace(/_/g, ".")), (b.iphone = !0)),
      T && ((b.osVersion = T[2].replace(/_/g, ".")), (b.ipad = !0)),
      E &&
        ((b.osVersion = E[3] ? E[3].replace(/_/g, ".") : null), (b.ipod = !0)),
      b.ios &&
        b.osVersion &&
        g.indexOf("Version/") >= 0 &&
        "10" === b.osVersion.split(".")[0] &&
        (b.osVersion = g.toLowerCase().split("version/")[1].split(" ")[0]),
      (b.webView =
        !(
          !(S || T || E) ||
          (!g.match(/.*AppleWebKit(?!.*Safari)/i) && !t.navigator.standalone)
        ) ||
        (t.matchMedia && t.matchMedia("(display-mode: standalone)").matches)),
      (b.webview = b.webView),
      (b.standalone = b.webView),
      (b.desktop = !(b.ios || b.android) || k),
      b.desktop &&
        ((b.electron = k),
        (b.macos = $),
        (b.windows = z),
        b.macos && (b.os = "macos"),
        b.windows && (b.os = "windows")),
      (b.pixelRatio = t.devicePixelRatio || 1),
      b);
  function D(i) {
    var a = this.touchEventsData,
      r = this.params,
      o = this.touches;
    if (!this.animating || !r.preventInteractionOnTransition) {
      var l = i;
      l.originalEvent && (l = l.originalEvent);
      var d = s(l.target);
      if (
        ("wrapper" !== r.touchEventsTarget ||
          d.closest(this.wrapperEl).length) &&
        ((a.isTouchEvent = "touchstart" === l.type),
        (a.isTouchEvent || !("which" in l) || 3 !== l.which) &&
          !(
            (!a.isTouchEvent && "button" in l && l.button > 0) ||
            (a.isTouched && a.isMoved)
          ))
      )
        if (
          r.noSwiping &&
          d.closest(
            r.noSwipingSelector ? r.noSwipingSelector : "." + r.noSwipingClass
          )[0]
        )
          this.allowClick = !0;
        else if (!r.swipeHandler || d.closest(r.swipeHandler)[0]) {
          (o.currentX =
            "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX),
            (o.currentY =
              "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY);
          var h = o.currentX,
            p = o.currentY,
            c = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
            u = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
          if (!c || !(h <= u || h >= t.screen.width - u)) {
            if (
              (n.extend(a, {
                isTouched: !0,
                isMoved: !1,
                allowTouchCallbacks: !0,
                isScrolling: void 0,
                startMoving: void 0,
              }),
              (o.startX = h),
              (o.startY = p),
              (a.touchStartTime = n.now()),
              (this.allowClick = !0),
              this.updateSize(),
              (this.swipeDirection = void 0),
              r.threshold > 0 && (a.allowThresholdMove = !1),
              "touchstart" !== l.type)
            ) {
              var v = !0;
              d.is(a.formElements) && (v = !1),
                e.activeElement &&
                  s(e.activeElement).is(a.formElements) &&
                  e.activeElement !== d[0] &&
                  e.activeElement.blur();
              var f = v && this.allowTouchMove && r.touchStartPreventDefault;
              (r.touchStartForcePreventDefault || f) && l.preventDefault();
            }
            this.emit("touchStart", l);
          }
        }
    }
  }
  function O(t) {
    var i = this.touchEventsData,
      a = this.params,
      r = this.touches,
      o = this.rtlTranslate,
      l = t;
    if ((l.originalEvent && (l = l.originalEvent), i.isTouched)) {
      if (!i.isTouchEvent || "mousemove" !== l.type) {
        var d =
            "touchmove" === l.type &&
            l.targetTouches &&
            (l.targetTouches[0] || l.changedTouches[0]),
          h = "touchmove" === l.type ? d.pageX : l.pageX,
          p = "touchmove" === l.type ? d.pageY : l.pageY;
        if (l.preventedByNestedSwiper)
          return (r.startX = h), void (r.startY = p);
        if (!this.allowTouchMove)
          return (
            (this.allowClick = !1),
            void (
              i.isTouched &&
              (n.extend(r, { startX: h, startY: p, currentX: h, currentY: p }),
              (i.touchStartTime = n.now()))
            )
          );
        if (i.isTouchEvent && a.touchReleaseOnEdges && !a.loop)
          if (this.isVertical()) {
            if (
              (p < r.startY && this.translate <= this.maxTranslate()) ||
              (p > r.startY && this.translate >= this.minTranslate())
            )
              return (i.isTouched = !1), void (i.isMoved = !1);
          } else if (
            (h < r.startX && this.translate <= this.maxTranslate()) ||
            (h > r.startX && this.translate >= this.minTranslate())
          )
            return;
        if (
          i.isTouchEvent &&
          e.activeElement &&
          l.target === e.activeElement &&
          s(l.target).is(i.formElements)
        )
          return (i.isMoved = !0), void (this.allowClick = !1);
        if (
          (i.allowTouchCallbacks && this.emit("touchMove", l),
          !(l.targetTouches && l.targetTouches.length > 1))
        ) {
          (r.currentX = h), (r.currentY = p);
          var c = r.currentX - r.startX,
            u = r.currentY - r.startY;
          if (
            !(
              this.params.threshold &&
              Math.sqrt(Math.pow(c, 2) + Math.pow(u, 2)) < this.params.threshold
            )
          ) {
            var v;
            if (void 0 === i.isScrolling)
              (this.isHorizontal() && r.currentY === r.startY) ||
              (this.isVertical() && r.currentX === r.startX)
                ? (i.isScrolling = !1)
                : c * c + u * u >= 25 &&
                  ((v = (180 * Math.atan2(Math.abs(u), Math.abs(c))) / Math.PI),
                  (i.isScrolling = this.isHorizontal()
                    ? v > a.touchAngle
                    : 90 - v > a.touchAngle));
            if (
              (i.isScrolling && this.emit("touchMoveOpposite", l),
              void 0 === i.startMoving &&
                ((r.currentX === r.startX && r.currentY === r.startY) ||
                  (i.startMoving = !0)),
              i.isScrolling)
            )
              i.isTouched = !1;
            else if (i.startMoving) {
              (this.allowClick = !1),
                a.cssMode || l.preventDefault(),
                a.touchMoveStopPropagation && !a.nested && l.stopPropagation(),
                i.isMoved ||
                  (a.loop && this.loopFix(),
                  (i.startTranslate = this.getTranslate()),
                  this.setTransition(0),
                  this.animating &&
                    this.$wrapperEl.trigger(
                      "webkitTransitionEnd transitionend"
                    ),
                  (i.allowMomentumBounce = !1),
                  !a.grabCursor ||
                    (!0 !== this.allowSlideNext &&
                      !0 !== this.allowSlidePrev) ||
                    this.setGrabCursor(!0),
                  this.emit("sliderFirstMove", l)),
                this.emit("sliderMove", l),
                (i.isMoved = !0);
              var f = this.isHorizontal() ? c : u;
              (r.diff = f),
                (f *= a.touchRatio),
                o && (f = -f),
                (this.swipeDirection = f > 0 ? "prev" : "next"),
                (i.currentTranslate = f + i.startTranslate);
              var m = !0,
                g = a.resistanceRatio;
              if (
                (a.touchReleaseOnEdges && (g = 0),
                f > 0 && i.currentTranslate > this.minTranslate()
                  ? ((m = !1),
                    a.resistance &&
                      (i.currentTranslate =
                        this.minTranslate() -
                        1 +
                        Math.pow(
                          -this.minTranslate() + i.startTranslate + f,
                          g
                        )))
                  : f < 0 &&
                    i.currentTranslate < this.maxTranslate() &&
                    ((m = !1),
                    a.resistance &&
                      (i.currentTranslate =
                        this.maxTranslate() +
                        1 -
                        Math.pow(
                          this.maxTranslate() - i.startTranslate - f,
                          g
                        ))),
                m && (l.preventedByNestedSwiper = !0),
                !this.allowSlideNext &&
                  "next" === this.swipeDirection &&
                  i.currentTranslate < i.startTranslate &&
                  (i.currentTranslate = i.startTranslate),
                !this.allowSlidePrev &&
                  "prev" === this.swipeDirection &&
                  i.currentTranslate > i.startTranslate &&
                  (i.currentTranslate = i.startTranslate),
                a.threshold > 0)
              ) {
                if (!(Math.abs(f) > a.threshold || i.allowThresholdMove))
                  return void (i.currentTranslate = i.startTranslate);
                if (!i.allowThresholdMove)
                  return (
                    (i.allowThresholdMove = !0),
                    (r.startX = r.currentX),
                    (r.startY = r.currentY),
                    (i.currentTranslate = i.startTranslate),
                    void (r.diff = this.isHorizontal()
                      ? r.currentX - r.startX
                      : r.currentY - r.startY)
                  );
              }
              a.followFinger &&
                !a.cssMode &&
                ((a.freeMode ||
                  a.watchSlidesProgress ||
                  a.watchSlidesVisibility) &&
                  (this.updateActiveIndex(), this.updateSlidesClasses()),
                a.freeMode &&
                  (0 === i.velocities.length &&
                    i.velocities.push({
                      position: r[this.isHorizontal() ? "startX" : "startY"],
                      time: i.touchStartTime,
                    }),
                  i.velocities.push({
                    position: r[this.isHorizontal() ? "currentX" : "currentY"],
                    time: n.now(),
                  })),
                this.updateProgress(i.currentTranslate),
                this.setTranslate(i.currentTranslate));
            }
          }
        }
      }
    } else i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", l);
  }
  function A(e) {
    var t = this,
      i = t.touchEventsData,
      s = t.params,
      a = t.touches,
      r = t.rtlTranslate,
      o = t.$wrapperEl,
      l = t.slidesGrid,
      d = t.snapGrid,
      h = e;
    if (
      (h.originalEvent && (h = h.originalEvent),
      i.allowTouchCallbacks && t.emit("touchEnd", h),
      (i.allowTouchCallbacks = !1),
      !i.isTouched)
    )
      return (
        i.isMoved && s.grabCursor && t.setGrabCursor(!1),
        (i.isMoved = !1),
        void (i.startMoving = !1)
      );
    s.grabCursor &&
      i.isMoved &&
      i.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    var p,
      c = n.now(),
      u = c - i.touchStartTime;
    if (
      (t.allowClick &&
        (t.updateClickedSlide(h),
        t.emit("tap click", h),
        u < 300 &&
          c - i.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", h)),
      (i.lastClickTime = n.now()),
      n.nextTick(function () {
        t.destroyed || (t.allowClick = !0);
      }),
      !i.isTouched ||
        !i.isMoved ||
        !t.swipeDirection ||
        0 === a.diff ||
        i.currentTranslate === i.startTranslate)
    )
      return (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1);
    if (
      ((i.isTouched = !1),
      (i.isMoved = !1),
      (i.startMoving = !1),
      (p = s.followFinger
        ? r
          ? t.translate
          : -t.translate
        : -i.currentTranslate),
      !s.cssMode)
    )
      if (s.freeMode) {
        if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
        if (p > -t.maxTranslate())
          return void (t.slides.length < d.length
            ? t.slideTo(d.length - 1)
            : t.slideTo(t.slides.length - 1));
        if (s.freeModeMomentum) {
          if (i.velocities.length > 1) {
            var v = i.velocities.pop(),
              f = i.velocities.pop(),
              m = v.position - f.position,
              g = v.time - f.time;
            (t.velocity = m / g),
              (t.velocity /= 2),
              Math.abs(t.velocity) < s.freeModeMinimumVelocity &&
                (t.velocity = 0),
              (g > 150 || n.now() - v.time > 300) && (t.velocity = 0);
          } else t.velocity = 0;
          (t.velocity *= s.freeModeMomentumVelocityRatio),
            (i.velocities.length = 0);
          var b = 1e3 * s.freeModeMomentumRatio,
            w = t.velocity * b,
            y = t.translate + w;
          r && (y = -y);
          var x,
            T,
            E = !1,
            S = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
          if (y < t.maxTranslate())
            s.freeModeMomentumBounce
              ? (y + t.maxTranslate() < -S && (y = t.maxTranslate() - S),
                (x = t.maxTranslate()),
                (E = !0),
                (i.allowMomentumBounce = !0))
              : (y = t.maxTranslate()),
              s.loop && s.centeredSlides && (T = !0);
          else if (y > t.minTranslate())
            s.freeModeMomentumBounce
              ? (y - t.minTranslate() > S && (y = t.minTranslate() + S),
                (x = t.minTranslate()),
                (E = !0),
                (i.allowMomentumBounce = !0))
              : (y = t.minTranslate()),
              s.loop && s.centeredSlides && (T = !0);
          else if (s.freeModeSticky) {
            for (var C, M = 0; M < d.length; M += 1)
              if (d[M] > -y) {
                C = M;
                break;
              }
            y = -(y =
              Math.abs(d[C] - y) < Math.abs(d[C - 1] - y) ||
              "next" === t.swipeDirection
                ? d[C]
                : d[C - 1]);
          }
          if (
            (T &&
              t.once("transitionEnd", function () {
                t.loopFix();
              }),
            0 !== t.velocity)
          ) {
            if (
              ((b = r
                ? Math.abs((-y - t.translate) / t.velocity)
                : Math.abs((y - t.translate) / t.velocity)),
              s.freeModeSticky)
            ) {
              var P = Math.abs((r ? -y : y) - t.translate),
                z = t.slidesSizesGrid[t.activeIndex];
              b = P < z ? s.speed : P < 2 * z ? 1.5 * s.speed : 2.5 * s.speed;
            }
          } else if (s.freeModeSticky) return void t.slideToClosest();
          s.freeModeMomentumBounce && E
            ? (t.updateProgress(x),
              t.setTransition(b),
              t.setTranslate(y),
              t.transitionStart(!0, t.swipeDirection),
              (t.animating = !0),
              o.transitionEnd(function () {
                t &&
                  !t.destroyed &&
                  i.allowMomentumBounce &&
                  (t.emit("momentumBounce"),
                  t.setTransition(s.speed),
                  t.setTranslate(x),
                  o.transitionEnd(function () {
                    t && !t.destroyed && t.transitionEnd();
                  }));
              }))
            : t.velocity
            ? (t.updateProgress(y),
              t.setTransition(b),
              t.setTranslate(y),
              t.transitionStart(!0, t.swipeDirection),
              t.animating ||
                ((t.animating = !0),
                o.transitionEnd(function () {
                  t && !t.destroyed && t.transitionEnd();
                })))
            : t.updateProgress(y),
            t.updateActiveIndex(),
            t.updateSlidesClasses();
        } else if (s.freeModeSticky) return void t.slideToClosest();
        (!s.freeModeMomentum || u >= s.longSwipesMs) &&
          (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses());
      } else {
        for (
          var k = 0, $ = t.slidesSizesGrid[0], L = 0;
          L < l.length;
          L += L < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup
        ) {
          var I = L < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
          void 0 !== l[L + I]
            ? p >= l[L] && p < l[L + I] && ((k = L), ($ = l[L + I] - l[L]))
            : p >= l[L] && ((k = L), ($ = l[l.length - 1] - l[l.length - 2]));
        }
        var D = (p - l[k]) / $,
          O = k < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
        if (u > s.longSwipesMs) {
          if (!s.longSwipes) return void t.slideTo(t.activeIndex);
          "next" === t.swipeDirection &&
            (D >= s.longSwipesRatio ? t.slideTo(k + O) : t.slideTo(k)),
            "prev" === t.swipeDirection &&
              (D > 1 - s.longSwipesRatio ? t.slideTo(k + O) : t.slideTo(k));
        } else {
          if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
          t.navigation &&
          (h.target === t.navigation.nextEl || h.target === t.navigation.prevEl)
            ? h.target === t.navigation.nextEl
              ? t.slideTo(k + O)
              : t.slideTo(k)
            : ("next" === t.swipeDirection && t.slideTo(k + O),
              "prev" === t.swipeDirection && t.slideTo(k));
        }
      }
  }
  function G() {
    var e = this.params,
      t = this.el;
    if (!t || 0 !== t.offsetWidth) {
      e.breakpoints && this.setBreakpoint();
      var i = this.allowSlideNext,
        s = this.allowSlidePrev,
        a = this.snapGrid;
      (this.allowSlideNext = !0),
        (this.allowSlidePrev = !0),
        this.updateSize(),
        this.updateSlides(),
        this.updateSlidesClasses(),
        ("auto" === e.slidesPerView || e.slidesPerView > 1) &&
        this.isEnd &&
        !this.params.centeredSlides
          ? this.slideTo(this.slides.length - 1, 0, !1, !0)
          : this.slideTo(this.activeIndex, 0, !1, !0),
        this.autoplay &&
          this.autoplay.running &&
          this.autoplay.paused &&
          this.autoplay.run(),
        (this.allowSlidePrev = s),
        (this.allowSlideNext = i),
        this.params.watchOverflow &&
          a !== this.snapGrid &&
          this.checkOverflow();
    }
  }
  function H(e) {
    this.allowClick ||
      (this.params.preventClicks && e.preventDefault(),
      this.params.preventClicksPropagation &&
        this.animating &&
        (e.stopPropagation(), e.stopImmediatePropagation()));
  }
  function B() {
    var e = this.wrapperEl;
    (this.previousTranslate = this.translate),
      (this.translate = this.isHorizontal() ? -e.scrollLeft : -e.scrollTop),
      -0 === this.translate && (this.translate = 0),
      this.updateActiveIndex(),
      this.updateSlidesClasses();
    var t = this.maxTranslate() - this.minTranslate();
    (0 === t ? 0 : (this.translate - this.minTranslate()) / t) !==
      this.progress && this.updateProgress(this.translate),
      this.emit("setTranslate", this.translate, !1);
  }
  var N = !1;
  function X() {}
  var V = {
      init: !0,
      direction: "horizontal",
      touchEventsTarget: "container",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      preventInteractionOnTransition: !1,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      freeMode: !1,
      freeModeMomentum: !0,
      freeModeMomentumRatio: 1,
      freeModeMomentumBounce: !0,
      freeModeMomentumBounceRatio: 1,
      freeModeMomentumVelocityRatio: 1,
      freeModeSticky: !1,
      freeModeMinimumVelocity: 0.02,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerColumnFill: "column",
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !1,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      watchSlidesVisibility: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      containerModifierClass: "swiper-container-",
      slideClass: "swiper-slide",
      slideBlankClass: "swiper-slide-invisible-blank",
      slideActiveClass: "swiper-slide-active",
      slideDuplicateActiveClass: "swiper-slide-duplicate-active",
      slideVisibleClass: "swiper-slide-visible",
      slideDuplicateClass: "swiper-slide-duplicate",
      slideNextClass: "swiper-slide-next",
      slideDuplicateNextClass: "swiper-slide-duplicate-next",
      slidePrevClass: "swiper-slide-prev",
      slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
      wrapperClass: "swiper-wrapper",
      runCallbacksOnInit: !0,
    },
    Y = {
      update: h,
      translate: p,
      transition: c,
      slide: u,
      loop: v,
      grabCursor: f,
      manipulation: L,
      events: {
        attachEvents: function () {
          var t = this.params,
            i = this.touchEvents,
            s = this.el,
            a = this.wrapperEl;
          (this.onTouchStart = D.bind(this)),
            (this.onTouchMove = O.bind(this)),
            (this.onTouchEnd = A.bind(this)),
            t.cssMode && (this.onScroll = B.bind(this)),
            (this.onClick = H.bind(this));
          var r = !!t.nested;
          if (!o.touch && o.pointerEvents)
            s.addEventListener(i.start, this.onTouchStart, !1),
              e.addEventListener(i.move, this.onTouchMove, r),
              e.addEventListener(i.end, this.onTouchEnd, !1);
          else {
            if (o.touch) {
              var n = !(
                "touchstart" !== i.start ||
                !o.passiveListener ||
                !t.passiveListeners
              ) && { passive: !0, capture: !1 };
              s.addEventListener(i.start, this.onTouchStart, n),
                s.addEventListener(
                  i.move,
                  this.onTouchMove,
                  o.passiveListener ? { passive: !1, capture: r } : r
                ),
                s.addEventListener(i.end, this.onTouchEnd, n),
                i.cancel && s.addEventListener(i.cancel, this.onTouchEnd, n),
                N || (e.addEventListener("touchstart", X), (N = !0));
            }
            ((t.simulateTouch && !I.ios && !I.android) ||
              (t.simulateTouch && !o.touch && I.ios)) &&
              (s.addEventListener("mousedown", this.onTouchStart, !1),
              e.addEventListener("mousemove", this.onTouchMove, r),
              e.addEventListener("mouseup", this.onTouchEnd, !1));
          }
          (t.preventClicks || t.preventClicksPropagation) &&
            s.addEventListener("click", this.onClick, !0),
            t.cssMode && a.addEventListener("scroll", this.onScroll),
            t.updateOnWindowResize
              ? this.on(
                  I.ios || I.android
                    ? "resize orientationchange observerUpdate"
                    : "resize observerUpdate",
                  G,
                  !0
                )
              : this.on("observerUpdate", G, !0);
        },
        detachEvents: function () {
          var t = this.params,
            i = this.touchEvents,
            s = this.el,
            a = this.wrapperEl,
            r = !!t.nested;
          if (!o.touch && o.pointerEvents)
            s.removeEventListener(i.start, this.onTouchStart, !1),
              e.removeEventListener(i.move, this.onTouchMove, r),
              e.removeEventListener(i.end, this.onTouchEnd, !1);
          else {
            if (o.touch) {
              var n = !(
                "onTouchStart" !== i.start ||
                !o.passiveListener ||
                !t.passiveListeners
              ) && { passive: !0, capture: !1 };
              s.removeEventListener(i.start, this.onTouchStart, n),
                s.removeEventListener(i.move, this.onTouchMove, r),
                s.removeEventListener(i.end, this.onTouchEnd, n),
                i.cancel && s.removeEventListener(i.cancel, this.onTouchEnd, n);
            }
            ((t.simulateTouch && !I.ios && !I.android) ||
              (t.simulateTouch && !o.touch && I.ios)) &&
              (s.removeEventListener("mousedown", this.onTouchStart, !1),
              e.removeEventListener("mousemove", this.onTouchMove, r),
              e.removeEventListener("mouseup", this.onTouchEnd, !1));
          }
          (t.preventClicks || t.preventClicksPropagation) &&
            s.removeEventListener("click", this.onClick, !0),
            t.cssMode && a.removeEventListener("scroll", this.onScroll),
            this.off(
              I.ios || I.android
                ? "resize orientationchange observerUpdate"
                : "resize observerUpdate",
              G
            );
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          var e = this.activeIndex,
            t = this.initialized,
            i = this.loopedSlides;
          void 0 === i && (i = 0);
          var s = this.params,
            a = this.$el,
            r = s.breakpoints;
          if (r && (!r || 0 !== Object.keys(r).length)) {
            var o = this.getBreakpoint(r);
            if (o && this.currentBreakpoint !== o) {
              var l = o in r ? r[o] : void 0;
              l &&
                [
                  "slidesPerView",
                  "spaceBetween",
                  "slidesPerGroup",
                  "slidesPerGroupSkip",
                  "slidesPerColumn",
                ].forEach(function (e) {
                  var t = l[e];
                  void 0 !== t &&
                    (l[e] =
                      "slidesPerView" !== e || ("AUTO" !== t && "auto" !== t)
                        ? "slidesPerView" === e
                          ? parseFloat(t)
                          : parseInt(t, 10)
                        : "auto");
                });
              var d = l || this.originalParams,
                h = s.slidesPerColumn > 1,
                p = d.slidesPerColumn > 1;
              h && !p
                ? a.removeClass(
                    s.containerModifierClass +
                      "multirow " +
                      s.containerModifierClass +
                      "multirow-column"
                  )
                : !h &&
                  p &&
                  (a.addClass(s.containerModifierClass + "multirow"),
                  "column" === d.slidesPerColumnFill &&
                    a.addClass(s.containerModifierClass + "multirow-column"));
              var c = d.direction && d.direction !== s.direction,
                u = s.loop && (d.slidesPerView !== s.slidesPerView || c);
              c && t && this.changeDirection(),
                n.extend(this.params, d),
                n.extend(this, {
                  allowTouchMove: this.params.allowTouchMove,
                  allowSlideNext: this.params.allowSlideNext,
                  allowSlidePrev: this.params.allowSlidePrev,
                }),
                (this.currentBreakpoint = o),
                u &&
                  t &&
                  (this.loopDestroy(),
                  this.loopCreate(),
                  this.updateSlides(),
                  this.slideTo(e - i + this.loopedSlides, 0, !1)),
                this.emit("breakpoint", d);
            }
          }
        },
        getBreakpoint: function (e) {
          if (e) {
            var i = !1,
              s = Object.keys(e).map(function (e) {
                if ("string" == typeof e && 0 === e.indexOf("@")) {
                  var i = parseFloat(e.substr(1));
                  return { value: t.innerHeight * i, point: e };
                }
                return { value: e, point: e };
              });
            s.sort(function (e, t) {
              return parseInt(e.value, 10) - parseInt(t.value, 10);
            });
            for (var a = 0; a < s.length; a += 1) {
              var r = s[a],
                n = r.point;
              r.value <= t.innerWidth && (i = n);
            }
            return i || "max";
          }
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          var e = this.params,
            t = this.isLocked,
            i =
              this.slides.length > 0 &&
              e.slidesOffsetBefore +
                e.spaceBetween * (this.slides.length - 1) +
                this.slides[0].offsetWidth * this.slides.length;
          e.slidesOffsetBefore && e.slidesOffsetAfter && i
            ? (this.isLocked = i <= this.size)
            : (this.isLocked = 1 === this.snapGrid.length),
            (this.allowSlideNext = !this.isLocked),
            (this.allowSlidePrev = !this.isLocked),
            t !== this.isLocked && this.emit(this.isLocked ? "lock" : "unlock"),
            t &&
              t !== this.isLocked &&
              ((this.isEnd = !1), this.navigation.update());
        },
      },
      classes: {
        addClasses: function () {
          var e = this.classNames,
            t = this.params,
            i = this.rtl,
            s = this.$el,
            a = [];
          a.push("initialized"),
            a.push(t.direction),
            t.freeMode && a.push("free-mode"),
            t.autoHeight && a.push("autoheight"),
            i && a.push("rtl"),
            t.slidesPerColumn > 1 &&
              (a.push("multirow"),
              "column" === t.slidesPerColumnFill && a.push("multirow-column")),
            I.android && a.push("android"),
            I.ios && a.push("ios"),
            t.cssMode && a.push("css-mode"),
            a.forEach(function (i) {
              e.push(t.containerModifierClass + i);
            }),
            s.addClass(e.join(" "));
        },
        removeClasses: function () {
          var e = this.$el,
            t = this.classNames;
          e.removeClass(t.join(" "));
        },
      },
      images: {
        loadImage: function (e, i, s, a, r, n) {
          var o;
          function l() {
            n && n();
          }
          e.complete && r
            ? l()
            : i
            ? (((o = new t.Image()).onload = l),
              (o.onerror = l),
              a && (o.sizes = a),
              s && (o.srcset = s),
              i && (o.src = i))
            : l();
        },
        preloadImages: function () {
          var e = this;
          function t() {
            null != e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit("imagesReady")));
          }
          e.imagesToLoad = e.$el.find("img");
          for (var i = 0; i < e.imagesToLoad.length; i += 1) {
            var s = e.imagesToLoad[i];
            e.loadImage(
              s,
              s.currentSrc || s.getAttribute("src"),
              s.srcset || s.getAttribute("srcset"),
              s.sizes || s.getAttribute("sizes"),
              !0,
              t
            );
          }
        },
      },
    },
    F = {},
    W = (function (e) {
      function t() {
        for (var i, a, r, l = [], d = arguments.length; d--; )
          l[d] = arguments[d];
        1 === l.length && l[0].constructor && l[0].constructor === Object
          ? (r = l[0])
          : ((a = (i = l)[0]), (r = i[1])),
          r || (r = {}),
          (r = n.extend({}, r)),
          a && !r.el && (r.el = a),
          e.call(this, r),
          Object.keys(Y).forEach(function (e) {
            Object.keys(Y[e]).forEach(function (i) {
              t.prototype[i] || (t.prototype[i] = Y[e][i]);
            });
          });
        var h = this;
        void 0 === h.modules && (h.modules = {}),
          Object.keys(h.modules).forEach(function (e) {
            var t = h.modules[e];
            if (t.params) {
              var i = Object.keys(t.params)[0],
                s = t.params[i];
              if ("object" != typeof s || null === s) return;
              if (!(i in r && "enabled" in s)) return;
              !0 === r[i] && (r[i] = { enabled: !0 }),
                "object" != typeof r[i] ||
                  "enabled" in r[i] ||
                  (r[i].enabled = !0),
                r[i] || (r[i] = { enabled: !1 });
            }
          });
        var p = n.extend({}, V);
        h.useModulesParams(p),
          (h.params = n.extend({}, p, F, r)),
          (h.originalParams = n.extend({}, h.params)),
          (h.passedParams = n.extend({}, r)),
          (h.$ = s);
        var c = s(h.params.el);
        if ((a = c[0])) {
          if (c.length > 1) {
            var u = [];
            return (
              c.each(function (e, i) {
                var s = n.extend({}, r, { el: i });
                u.push(new t(s));
              }),
              u
            );
          }
          var v, f, m;
          return (
            (a.swiper = h),
            c.data("swiper", h),
            a && a.shadowRoot && a.shadowRoot.querySelector
              ? ((v = s(
                  a.shadowRoot.querySelector("." + h.params.wrapperClass)
                )).children = function (e) {
                  return c.children(e);
                })
              : (v = c.children("." + h.params.wrapperClass)),
            n.extend(h, {
              $el: c,
              el: a,
              $wrapperEl: v,
              wrapperEl: v[0],
              classNames: [],
              slides: s(),
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: function () {
                return "horizontal" === h.params.direction;
              },
              isVertical: function () {
                return "vertical" === h.params.direction;
              },
              rtl:
                "rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction"),
              rtlTranslate:
                "horizontal" === h.params.direction &&
                ("rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction")),
              wrongRTL: "-webkit-box" === v.css("display"),
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              previousTranslate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              allowSlideNext: h.params.allowSlideNext,
              allowSlidePrev: h.params.allowSlidePrev,
              touchEvents:
                ((f = ["touchstart", "touchmove", "touchend", "touchcancel"]),
                (m = ["mousedown", "mousemove", "mouseup"]),
                o.pointerEvents &&
                  (m = ["pointerdown", "pointermove", "pointerup"]),
                (h.touchEventsTouch = {
                  start: f[0],
                  move: f[1],
                  end: f[2],
                  cancel: f[3],
                }),
                (h.touchEventsDesktop = { start: m[0], move: m[1], end: m[2] }),
                o.touch || !h.params.simulateTouch
                  ? h.touchEventsTouch
                  : h.touchEventsDesktop),
              touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                formElements:
                  "input, select, option, textarea, button, video, label",
                lastClickTime: n.now(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                isTouchEvent: void 0,
                startMoving: void 0,
              },
              allowClick: !0,
              allowTouchMove: h.params.allowTouchMove,
              touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0,
              },
              imagesToLoad: [],
              imagesLoaded: 0,
            }),
            h.useModules(),
            h.params.init && h.init(),
            h
          );
        }
      }
      e && (t.__proto__ = e),
        (t.prototype = Object.create(e && e.prototype)),
        (t.prototype.constructor = t);
      var i = {
        extendedDefaults: { configurable: !0 },
        defaults: { configurable: !0 },
        Class: { configurable: !0 },
        $: { configurable: !0 },
      };
      return (
        (t.prototype.slidesPerViewDynamic = function () {
          var e = this.params,
            t = this.slides,
            i = this.slidesGrid,
            s = this.size,
            a = this.activeIndex,
            r = 1;
          if (e.centeredSlides) {
            for (
              var n, o = t[a].swiperSlideSize, l = a + 1;
              l < t.length;
              l += 1
            )
              t[l] &&
                !n &&
                ((r += 1), (o += t[l].swiperSlideSize) > s && (n = !0));
            for (var d = a - 1; d >= 0; d -= 1)
              t[d] &&
                !n &&
                ((r += 1), (o += t[d].swiperSlideSize) > s && (n = !0));
          } else
            for (var h = a + 1; h < t.length; h += 1)
              i[h] - i[a] < s && (r += 1);
          return r;
        }),
        (t.prototype.update = function () {
          var e = this;
          if (e && !e.destroyed) {
            var t = e.snapGrid,
              i = e.params;
            i.breakpoints && e.setBreakpoint(),
              e.updateSize(),
              e.updateSlides(),
              e.updateProgress(),
              e.updateSlidesClasses(),
              e.params.freeMode
                ? (s(), e.params.autoHeight && e.updateAutoHeight())
                : (("auto" === e.params.slidesPerView ||
                    e.params.slidesPerView > 1) &&
                  e.isEnd &&
                  !e.params.centeredSlides
                    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                    : e.slideTo(e.activeIndex, 0, !1, !0)) || s(),
              i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
              e.emit("update");
          }
          function s() {
            var t = e.rtlTranslate ? -1 * e.translate : e.translate,
              i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
            e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
          }
        }),
        (t.prototype.changeDirection = function (e, t) {
          void 0 === t && (t = !0);
          var i = this.params.direction;
          return (
            e || (e = "horizontal" === i ? "vertical" : "horizontal"),
            e === i || ("horizontal" !== e && "vertical" !== e)
              ? this
              : (this.$el
                  .removeClass("" + this.params.containerModifierClass + i)
                  .addClass("" + this.params.containerModifierClass + e),
                (this.params.direction = e),
                this.slides.each(function (t, i) {
                  "vertical" === e
                    ? (i.style.width = "")
                    : (i.style.height = "");
                }),
                this.emit("changeDirection"),
                t && this.update(),
                this)
          );
        }),
        (t.prototype.init = function () {
          this.initialized ||
            (this.emit("beforeInit"),
            this.params.breakpoints && this.setBreakpoint(),
            this.addClasses(),
            this.params.loop && this.loopCreate(),
            this.updateSize(),
            this.updateSlides(),
            this.params.watchOverflow && this.checkOverflow(),
            this.params.grabCursor && this.setGrabCursor(),
            this.params.preloadImages && this.preloadImages(),
            this.params.loop
              ? this.slideTo(
                  this.params.initialSlide + this.loopedSlides,
                  0,
                  this.params.runCallbacksOnInit
                )
              : this.slideTo(
                  this.params.initialSlide,
                  0,
                  this.params.runCallbacksOnInit
                ),
            this.attachEvents(),
            (this.initialized = !0),
            this.emit("init"));
        }),
        (t.prototype.destroy = function (e, t) {
          void 0 === e && (e = !0), void 0 === t && (t = !0);
          var i = this,
            s = i.params,
            a = i.$el,
            r = i.$wrapperEl,
            o = i.slides;
          return void 0 === i.params || i.destroyed
            ? null
            : (i.emit("beforeDestroy"),
              (i.initialized = !1),
              i.detachEvents(),
              s.loop && i.loopDestroy(),
              t &&
                (i.removeClasses(),
                a.removeAttr("style"),
                r.removeAttr("style"),
                o &&
                  o.length &&
                  o
                    .removeClass(
                      [
                        s.slideVisibleClass,
                        s.slideActiveClass,
                        s.slideNextClass,
                        s.slidePrevClass,
                      ].join(" ")
                    )
                    .removeAttr("style")
                    .removeAttr("data-swiper-slide-index")),
              i.emit("destroy"),
              Object.keys(i.eventsListeners).forEach(function (e) {
                i.off(e);
              }),
              !1 !== e &&
                ((i.$el[0].swiper = null),
                i.$el.data("swiper", null),
                n.deleteProps(i)),
              (i.destroyed = !0),
              null);
        }),
        (t.extendDefaults = function (e) {
          n.extend(F, e);
        }),
        (i.extendedDefaults.get = function () {
          return F;
        }),
        (i.defaults.get = function () {
          return V;
        }),
        (i.Class.get = function () {
          return e;
        }),
        (i.$.get = function () {
          return s;
        }),
        Object.defineProperties(t, i),
        t
      );
    })(l),
    R = { name: "device", proto: { device: I }, static: { device: I } },
    q = { name: "support", proto: { support: o }, static: { support: o } },
    j = {
      isEdge: !!t.navigator.userAgent.match(/Edge/g),
      isSafari: (function () {
        var e = t.navigator.userAgent.toLowerCase();
        return (
          e.indexOf("safari") >= 0 &&
          e.indexOf("chrome") < 0 &&
          e.indexOf("android") < 0
        );
      })(),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
        t.navigator.userAgent
      ),
    },
    K = { name: "browser", proto: { browser: j }, static: { browser: j } },
    U = {
      name: "resize",
      create: function () {
        var e = this;
        n.extend(e, {
          resize: {
            resizeHandler: function () {
              e &&
                !e.destroyed &&
                e.initialized &&
                (e.emit("beforeResize"), e.emit("resize"));
            },
            orientationChangeHandler: function () {
              e && !e.destroyed && e.initialized && e.emit("orientationchange");
            },
          },
        });
      },
      on: {
        init: function () {
          t.addEventListener("resize", this.resize.resizeHandler),
            t.addEventListener(
              "orientationchange",
              this.resize.orientationChangeHandler
            );
        },
        destroy: function () {
          t.removeEventListener("resize", this.resize.resizeHandler),
            t.removeEventListener(
              "orientationchange",
              this.resize.orientationChangeHandler
            );
        },
      },
    },
    _ = {
      func: t.MutationObserver || t.WebkitMutationObserver,
      attach: function (e, i) {
        void 0 === i && (i = {});
        var s = this,
          a = new (0, _.func)(function (e) {
            if (1 !== e.length) {
              var i = function () {
                s.emit("observerUpdate", e[0]);
              };
              t.requestAnimationFrame
                ? t.requestAnimationFrame(i)
                : t.setTimeout(i, 0);
            } else s.emit("observerUpdate", e[0]);
          });
        a.observe(e, {
          attributes: void 0 === i.attributes || i.attributes,
          childList: void 0 === i.childList || i.childList,
          characterData: void 0 === i.characterData || i.characterData,
        }),
          s.observer.observers.push(a);
      },
      init: function () {
        if (o.observer && this.params.observer) {
          if (this.params.observeParents)
            for (var e = this.$el.parents(), t = 0; t < e.length; t += 1)
              this.observer.attach(e[t]);
          this.observer.attach(this.$el[0], {
            childList: this.params.observeSlideChildren,
          }),
            this.observer.attach(this.$wrapperEl[0], { attributes: !1 });
        }
      },
      destroy: function () {
        this.observer.observers.forEach(function (e) {
          e.disconnect();
        }),
          (this.observer.observers = []);
      },
    },
    Z = {
      name: "observer",
      params: { observer: !1, observeParents: !1, observeSlideChildren: !1 },
      create: function () {
        n.extend(this, {
          observer: {
            init: _.init.bind(this),
            attach: _.attach.bind(this),
            destroy: _.destroy.bind(this),
            observers: [],
          },
        });
      },
      on: {
        init: function () {
          this.observer.init();
        },
        destroy: function () {
          this.observer.destroy();
        },
      },
    },
    Q = {
      update: function (e) {
        var t = this,
          i = t.params,
          s = i.slidesPerView,
          a = i.slidesPerGroup,
          r = i.centeredSlides,
          o = t.params.virtual,
          l = o.addSlidesBefore,
          d = o.addSlidesAfter,
          h = t.virtual,
          p = h.from,
          c = h.to,
          u = h.slides,
          v = h.slidesGrid,
          f = h.renderSlide,
          m = h.offset;
        t.updateActiveIndex();
        var g,
          b,
          w,
          y = t.activeIndex || 0;
        (g = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top"),
          r
            ? ((b = Math.floor(s / 2) + a + l), (w = Math.floor(s / 2) + a + d))
            : ((b = s + (a - 1) + l), (w = a + d));
        var x = Math.max((y || 0) - w, 0),
          T = Math.min((y || 0) + b, u.length - 1),
          E = (t.slidesGrid[x] || 0) - (t.slidesGrid[0] || 0);
        function S() {
          t.updateSlides(),
            t.updateProgress(),
            t.updateSlidesClasses(),
            t.lazy && t.params.lazy.enabled && t.lazy.load();
        }
        if (
          (n.extend(t.virtual, {
            from: x,
            to: T,
            offset: E,
            slidesGrid: t.slidesGrid,
          }),
          p === x && c === T && !e)
        )
          return (
            t.slidesGrid !== v && E !== m && t.slides.css(g, E + "px"),
            void t.updateProgress()
          );
        if (t.params.virtual.renderExternal)
          return (
            t.params.virtual.renderExternal.call(t, {
              offset: E,
              from: x,
              to: T,
              slides: (function () {
                for (var e = [], t = x; t <= T; t += 1) e.push(u[t]);
                return e;
              })(),
            }),
            void S()
          );
        var C = [],
          M = [];
        if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
        else
          for (var P = p; P <= c; P += 1)
            (P < x || P > T) &&
              t.$wrapperEl
                .find(
                  "." +
                    t.params.slideClass +
                    '[data-swiper-slide-index="' +
                    P +
                    '"]'
                )
                .remove();
        for (var z = 0; z < u.length; z += 1)
          z >= x &&
            z <= T &&
            (void 0 === c || e
              ? M.push(z)
              : (z > c && M.push(z), z < p && C.push(z)));
        M.forEach(function (e) {
          t.$wrapperEl.append(f(u[e], e));
        }),
          C.sort(function (e, t) {
            return t - e;
          }).forEach(function (e) {
            t.$wrapperEl.prepend(f(u[e], e));
          }),
          t.$wrapperEl.children(".swiper-slide").css(g, E + "px"),
          S();
      },
      renderSlide: function (e, t) {
        var i = this.params.virtual;
        if (i.cache && this.virtual.cache[t]) return this.virtual.cache[t];
        var a = i.renderSlide
          ? s(i.renderSlide.call(this, e, t))
          : s(
              '<div class="' +
                this.params.slideClass +
                '" data-swiper-slide-index="' +
                t +
                '">' +
                e +
                "</div>"
            );
        return (
          a.attr("data-swiper-slide-index") ||
            a.attr("data-swiper-slide-index", t),
          i.cache && (this.virtual.cache[t] = a),
          a
        );
      },
      appendSlide: function (e) {
        if ("object" == typeof e && "length" in e)
          for (var t = 0; t < e.length; t += 1)
            e[t] && this.virtual.slides.push(e[t]);
        else this.virtual.slides.push(e);
        this.virtual.update(!0);
      },
      prependSlide: function (e) {
        var t = this.activeIndex,
          i = t + 1,
          s = 1;
        if (Array.isArray(e)) {
          for (var a = 0; a < e.length; a += 1)
            e[a] && this.virtual.slides.unshift(e[a]);
          (i = t + e.length), (s = e.length);
        } else this.virtual.slides.unshift(e);
        if (this.params.virtual.cache) {
          var r = this.virtual.cache,
            n = {};
          Object.keys(r).forEach(function (e) {
            var t = r[e],
              i = t.attr("data-swiper-slide-index");
            i && t.attr("data-swiper-slide-index", parseInt(i, 10) + 1),
              (n[parseInt(e, 10) + s] = t);
          }),
            (this.virtual.cache = n);
        }
        this.virtual.update(!0), this.slideTo(i, 0);
      },
      removeSlide: function (e) {
        if (null != e) {
          var t = this.activeIndex;
          if (Array.isArray(e))
            for (var i = e.length - 1; i >= 0; i -= 1)
              this.virtual.slides.splice(e[i], 1),
                this.params.virtual.cache && delete this.virtual.cache[e[i]],
                e[i] < t && (t -= 1),
                (t = Math.max(t, 0));
          else
            this.virtual.slides.splice(e, 1),
              this.params.virtual.cache && delete this.virtual.cache[e],
              e < t && (t -= 1),
              (t = Math.max(t, 0));
          this.virtual.update(!0), this.slideTo(t, 0);
        }
      },
      removeAllSlides: function () {
        (this.virtual.slides = []),
          this.params.virtual.cache && (this.virtual.cache = {}),
          this.virtual.update(!0),
          this.slideTo(0, 0);
      },
    },
    J = {
      name: "virtual",
      params: {
        virtual: {
          enabled: !1,
          slides: [],
          cache: !0,
          renderSlide: null,
          renderExternal: null,
          addSlidesBefore: 0,
          addSlidesAfter: 0,
        },
      },
      create: function () {
        n.extend(this, {
          virtual: {
            update: Q.update.bind(this),
            appendSlide: Q.appendSlide.bind(this),
            prependSlide: Q.prependSlide.bind(this),
            removeSlide: Q.removeSlide.bind(this),
            removeAllSlides: Q.removeAllSlides.bind(this),
            renderSlide: Q.renderSlide.bind(this),
            slides: this.params.virtual.slides,
            cache: {},
          },
        });
      },
      on: {
        beforeInit: function () {
          if (this.params.virtual.enabled) {
            this.classNames.push(
              this.params.containerModifierClass + "virtual"
            );
            var e = { watchSlidesProgress: !0 };
            n.extend(this.params, e),
              n.extend(this.originalParams, e),
              this.params.initialSlide || this.virtual.update();
          }
        },
        setTranslate: function () {
          this.params.virtual.enabled && this.virtual.update();
        },
      },
    },
    ee = {
      handle: function (i) {
        var s = this.rtlTranslate,
          a = i;
        a.originalEvent && (a = a.originalEvent);
        var r = a.keyCode || a.charCode;
        if (
          !this.allowSlideNext &&
          ((this.isHorizontal() && 39 === r) ||
            (this.isVertical() && 40 === r) ||
            34 === r)
        )
          return !1;
        if (
          !this.allowSlidePrev &&
          ((this.isHorizontal() && 37 === r) ||
            (this.isVertical() && 38 === r) ||
            33 === r)
        )
          return !1;
        if (
          !(
            a.shiftKey ||
            a.altKey ||
            a.ctrlKey ||
            a.metaKey ||
            (e.activeElement &&
              e.activeElement.nodeName &&
              ("input" === e.activeElement.nodeName.toLowerCase() ||
                "textarea" === e.activeElement.nodeName.toLowerCase()))
          )
        ) {
          if (
            this.params.keyboard.onlyInViewport &&
            (33 === r ||
              34 === r ||
              37 === r ||
              39 === r ||
              38 === r ||
              40 === r)
          ) {
            var n = !1;
            if (
              this.$el.parents("." + this.params.slideClass).length > 0 &&
              0 === this.$el.parents("." + this.params.slideActiveClass).length
            )
              return;
            var o = t.innerWidth,
              l = t.innerHeight,
              d = this.$el.offset();
            s && (d.left -= this.$el[0].scrollLeft);
            for (
              var h = [
                  [d.left, d.top],
                  [d.left + this.width, d.top],
                  [d.left, d.top + this.height],
                  [d.left + this.width, d.top + this.height],
                ],
                p = 0;
              p < h.length;
              p += 1
            ) {
              var c = h[p];
              c[0] >= 0 && c[0] <= o && c[1] >= 0 && c[1] <= l && (n = !0);
            }
            if (!n) return;
          }
          this.isHorizontal()
            ? ((33 !== r && 34 !== r && 37 !== r && 39 !== r) ||
                (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
              (((34 !== r && 39 !== r) || s) &&
                ((33 !== r && 37 !== r) || !s)) ||
                this.slideNext(),
              (((33 !== r && 37 !== r) || s) &&
                ((34 !== r && 39 !== r) || !s)) ||
                this.slidePrev())
            : ((33 !== r && 34 !== r && 38 !== r && 40 !== r) ||
                (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)),
              (34 !== r && 40 !== r) || this.slideNext(),
              (33 !== r && 38 !== r) || this.slidePrev()),
            this.emit("keyPress", r);
        }
      },
      enable: function () {
        this.keyboard.enabled ||
          (s(e).on("keydown", this.keyboard.handle),
          (this.keyboard.enabled = !0));
      },
      disable: function () {
        this.keyboard.enabled &&
          (s(e).off("keydown", this.keyboard.handle),
          (this.keyboard.enabled = !1));
      },
    },
    te = {
      name: "keyboard",
      params: { keyboard: { enabled: !1, onlyInViewport: !0 } },
      create: function () {
        n.extend(this, {
          keyboard: {
            enabled: !1,
            enable: ee.enable.bind(this),
            disable: ee.disable.bind(this),
            handle: ee.handle.bind(this),
          },
        });
      },
      on: {
        init: function () {
          this.params.keyboard.enabled && this.keyboard.enable();
        },
        destroy: function () {
          this.keyboard.enabled && this.keyboard.disable();
        },
      },
    };
  var ie = {
      lastScrollTime: n.now(),
      lastEventBeforeSnap: void 0,
      recentWheelEvents: [],
      event: function () {
        return t.navigator.userAgent.indexOf("firefox") > -1
          ? "DOMMouseScroll"
          : (function () {
              var t = "onwheel" in e;
              if (!t) {
                var i = e.createElement("div");
                i.setAttribute("onwheel", "return;"),
                  (t = "function" == typeof i.onwheel);
              }
              return (
                !t &&
                  e.implementation &&
                  e.implementation.hasFeature &&
                  !0 !== e.implementation.hasFeature("", "") &&
                  (t = e.implementation.hasFeature("Events.wheel", "3.0")),
                t
              );
            })()
          ? "wheel"
          : "mousewheel";
      },
      normalize: function (e) {
        var t = 0,
          i = 0,
          s = 0,
          a = 0;
        return (
          "detail" in e && (i = e.detail),
          "wheelDelta" in e && (i = -e.wheelDelta / 120),
          "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120),
          "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
          "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = i), (i = 0)),
          (s = 10 * t),
          (a = 10 * i),
          "deltaY" in e && (a = e.deltaY),
          "deltaX" in e && (s = e.deltaX),
          e.shiftKey && !s && ((s = a), (a = 0)),
          (s || a) &&
            e.deltaMode &&
            (1 === e.deltaMode
              ? ((s *= 40), (a *= 40))
              : ((s *= 800), (a *= 800))),
          s && !t && (t = s < 1 ? -1 : 1),
          a && !i && (i = a < 1 ? -1 : 1),
          { spinX: t, spinY: i, pixelX: s, pixelY: a }
        );
      },
      handleMouseEnter: function () {
        this.mouseEntered = !0;
      },
      handleMouseLeave: function () {
        this.mouseEntered = !1;
      },
      handle: function (e) {
        var t = e,
          i = this,
          a = i.params.mousewheel;
        i.params.cssMode && t.preventDefault();
        var r = i.$el;
        if (
          ("container" !== i.params.mousewheel.eventsTarged &&
            (r = s(i.params.mousewheel.eventsTarged)),
          !i.mouseEntered && !r[0].contains(t.target) && !a.releaseOnEdges)
        )
          return !0;
        t.originalEvent && (t = t.originalEvent);
        var o = 0,
          l = i.rtlTranslate ? -1 : 1,
          d = ie.normalize(t);
        if (a.forceToAxis)
          if (i.isHorizontal()) {
            if (!(Math.abs(d.pixelX) > Math.abs(d.pixelY))) return !0;
            o = d.pixelX * l;
          } else {
            if (!(Math.abs(d.pixelY) > Math.abs(d.pixelX))) return !0;
            o = d.pixelY;
          }
        else
          o =
            Math.abs(d.pixelX) > Math.abs(d.pixelY) ? -d.pixelX * l : -d.pixelY;
        if (0 === o) return !0;
        if ((a.invert && (o = -o), i.params.freeMode)) {
          var h = {
              time: n.now(),
              delta: Math.abs(o),
              direction: Math.sign(o),
            },
            p = i.mousewheel.lastEventBeforeSnap,
            c =
              p &&
              h.time < p.time + 500 &&
              h.delta <= p.delta &&
              h.direction === p.direction;
          if (!c) {
            (i.mousewheel.lastEventBeforeSnap = void 0),
              i.params.loop && i.loopFix();
            var u = i.getTranslate() + o * a.sensitivity,
              v = i.isBeginning,
              f = i.isEnd;
            if (
              (u >= i.minTranslate() && (u = i.minTranslate()),
              u <= i.maxTranslate() && (u = i.maxTranslate()),
              i.setTransition(0),
              i.setTranslate(u),
              i.updateProgress(),
              i.updateActiveIndex(),
              i.updateSlidesClasses(),
              ((!v && i.isBeginning) || (!f && i.isEnd)) &&
                i.updateSlidesClasses(),
              i.params.freeModeSticky)
            ) {
              clearTimeout(i.mousewheel.timeout),
                (i.mousewheel.timeout = void 0);
              var m = i.mousewheel.recentWheelEvents;
              m.length >= 15 && m.shift();
              var g = m.length ? m[m.length - 1] : void 0,
                b = m[0];
              if (
                (m.push(h),
                g && (h.delta > g.delta || h.direction !== g.direction))
              )
                m.splice(0);
              else if (
                m.length >= 15 &&
                h.time - b.time < 500 &&
                b.delta - h.delta >= 1 &&
                h.delta <= 6
              ) {
                var w = o > 0 ? 0.8 : 0.2;
                (i.mousewheel.lastEventBeforeSnap = h),
                  m.splice(0),
                  (i.mousewheel.timeout = n.nextTick(function () {
                    i.slideToClosest(i.params.speed, !0, void 0, w);
                  }, 0));
              }
              i.mousewheel.timeout ||
                (i.mousewheel.timeout = n.nextTick(function () {
                  (i.mousewheel.lastEventBeforeSnap = h),
                    m.splice(0),
                    i.slideToClosest(i.params.speed, !0, void 0, 0.5);
                }, 500));
            }
            if (
              (c || i.emit("scroll", t),
              i.params.autoplay &&
                i.params.autoplayDisableOnInteraction &&
                i.autoplay.stop(),
              u === i.minTranslate() || u === i.maxTranslate())
            )
              return !0;
          }
        } else {
          var y = {
              time: n.now(),
              delta: Math.abs(o),
              direction: Math.sign(o),
              raw: e,
            },
            x = i.mousewheel.recentWheelEvents;
          x.length >= 2 && x.shift();
          var T = x.length ? x[x.length - 1] : void 0;
          if (
            (x.push(y),
            T
              ? (y.direction !== T.direction || y.delta > T.delta) &&
                i.mousewheel.animateSlider(y)
              : i.mousewheel.animateSlider(y),
            i.mousewheel.releaseScroll(y))
          )
            return !0;
        }
        return t.preventDefault ? t.preventDefault() : (t.returnValue = !1), !1;
      },
      animateSlider: function (e) {
        return (
          (e.delta >= 6 && n.now() - this.mousewheel.lastScrollTime < 60) ||
          (e.direction < 0
            ? (this.isEnd && !this.params.loop) ||
              this.animating ||
              (this.slideNext(), this.emit("scroll", e.raw))
            : (this.isBeginning && !this.params.loop) ||
              this.animating ||
              (this.slidePrev(), this.emit("scroll", e.raw)),
          (this.mousewheel.lastScrollTime = new t.Date().getTime()),
          !1)
        );
      },
      releaseScroll: function (e) {
        var t = this.params.mousewheel;
        if (e.direction < 0) {
          if (this.isEnd && !this.params.loop && t.releaseOnEdges) return !0;
        } else if (this.isBeginning && !this.params.loop && t.releaseOnEdges)
          return !0;
        return !1;
      },
      enable: function () {
        var e = ie.event();
        if (this.params.cssMode)
          return (
            this.wrapperEl.removeEventListener(e, this.mousewheel.handle), !0
          );
        if (!e) return !1;
        if (this.mousewheel.enabled) return !1;
        var t = this.$el;
        return (
          "container" !== this.params.mousewheel.eventsTarged &&
            (t = s(this.params.mousewheel.eventsTarged)),
          t.on("mouseenter", this.mousewheel.handleMouseEnter),
          t.on("mouseleave", this.mousewheel.handleMouseLeave),
          t.on(e, this.mousewheel.handle),
          (this.mousewheel.enabled = !0),
          !0
        );
      },
      disable: function () {
        var e = ie.event();
        if (this.params.cssMode)
          return this.wrapperEl.addEventListener(e, this.mousewheel.handle), !0;
        if (!e) return !1;
        if (!this.mousewheel.enabled) return !1;
        var t = this.$el;
        return (
          "container" !== this.params.mousewheel.eventsTarged &&
            (t = s(this.params.mousewheel.eventsTarged)),
          t.off(e, this.mousewheel.handle),
          (this.mousewheel.enabled = !1),
          !0
        );
      },
    },
    se = {
      update: function () {
        var e = this.params.navigation;
        if (!this.params.loop) {
          var t = this.navigation,
            i = t.$nextEl,
            s = t.$prevEl;
          s &&
            s.length > 0 &&
            (this.isBeginning
              ? s.addClass(e.disabledClass)
              : s.removeClass(e.disabledClass),
            s[
              this.params.watchOverflow && this.isLocked
                ? "addClass"
                : "removeClass"
            ](e.lockClass)),
            i &&
              i.length > 0 &&
              (this.isEnd
                ? i.addClass(e.disabledClass)
                : i.removeClass(e.disabledClass),
              i[
                this.params.watchOverflow && this.isLocked
                  ? "addClass"
                  : "removeClass"
              ](e.lockClass));
        }
      },
      onPrevClick: function (e) {
        e.preventDefault(),
          (this.isBeginning && !this.params.loop) || this.slidePrev();
      },
      onNextClick: function (e) {
        e.preventDefault(),
          (this.isEnd && !this.params.loop) || this.slideNext();
      },
      init: function () {
        var e,
          t,
          i = this.params.navigation;
        (i.nextEl || i.prevEl) &&
          (i.nextEl &&
            ((e = s(i.nextEl)),
            this.params.uniqueNavElements &&
              "string" == typeof i.nextEl &&
              e.length > 1 &&
              1 === this.$el.find(i.nextEl).length &&
              (e = this.$el.find(i.nextEl))),
          i.prevEl &&
            ((t = s(i.prevEl)),
            this.params.uniqueNavElements &&
              "string" == typeof i.prevEl &&
              t.length > 1 &&
              1 === this.$el.find(i.prevEl).length &&
              (t = this.$el.find(i.prevEl))),
          e && e.length > 0 && e.on("click", this.navigation.onNextClick),
          t && t.length > 0 && t.on("click", this.navigation.onPrevClick),
          n.extend(this.navigation, {
            $nextEl: e,
            nextEl: e && e[0],
            $prevEl: t,
            prevEl: t && t[0],
          }));
      },
      destroy: function () {
        var e = this.navigation,
          t = e.$nextEl,
          i = e.$prevEl;
        t &&
          t.length &&
          (t.off("click", this.navigation.onNextClick),
          t.removeClass(this.params.navigation.disabledClass)),
          i &&
            i.length &&
            (i.off("click", this.navigation.onPrevClick),
            i.removeClass(this.params.navigation.disabledClass));
      },
    },
    ae = {
      update: function () {
        var e = this.rtl,
          t = this.params.pagination;
        if (
          t.el &&
          this.pagination.el &&
          this.pagination.$el &&
          0 !== this.pagination.$el.length
        ) {
          var i,
            a =
              this.virtual && this.params.virtual.enabled
                ? this.virtual.slides.length
                : this.slides.length,
            r = this.pagination.$el,
            n = this.params.loop
              ? Math.ceil(
                  (a - 2 * this.loopedSlides) / this.params.slidesPerGroup
                )
              : this.snapGrid.length;
          if (
            (this.params.loop
              ? ((i = Math.ceil(
                  (this.activeIndex - this.loopedSlides) /
                    this.params.slidesPerGroup
                )) >
                  a - 1 - 2 * this.loopedSlides &&
                  (i -= a - 2 * this.loopedSlides),
                i > n - 1 && (i -= n),
                i < 0 &&
                  "bullets" !== this.params.paginationType &&
                  (i = n + i))
              : (i =
                  void 0 !== this.snapIndex
                    ? this.snapIndex
                    : this.activeIndex || 0),
            "bullets" === t.type &&
              this.pagination.bullets &&
              this.pagination.bullets.length > 0)
          ) {
            var o,
              l,
              d,
              h = this.pagination.bullets;
            if (
              (t.dynamicBullets &&
                ((this.pagination.bulletSize = h
                  .eq(0)
                  [this.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                r.css(
                  this.isHorizontal() ? "width" : "height",
                  this.pagination.bulletSize * (t.dynamicMainBullets + 4) + "px"
                ),
                t.dynamicMainBullets > 1 &&
                  void 0 !== this.previousIndex &&
                  ((this.pagination.dynamicBulletIndex +=
                    i - this.previousIndex),
                  this.pagination.dynamicBulletIndex > t.dynamicMainBullets - 1
                    ? (this.pagination.dynamicBulletIndex =
                        t.dynamicMainBullets - 1)
                    : this.pagination.dynamicBulletIndex < 0 &&
                      (this.pagination.dynamicBulletIndex = 0)),
                (o = i - this.pagination.dynamicBulletIndex),
                (d =
                  ((l = o + (Math.min(h.length, t.dynamicMainBullets) - 1)) +
                    o) /
                  2)),
              h.removeClass(
                t.bulletActiveClass +
                  " " +
                  t.bulletActiveClass +
                  "-next " +
                  t.bulletActiveClass +
                  "-next-next " +
                  t.bulletActiveClass +
                  "-prev " +
                  t.bulletActiveClass +
                  "-prev-prev " +
                  t.bulletActiveClass +
                  "-main"
              ),
              r.length > 1)
            )
              h.each(function (e, a) {
                var r = s(a),
                  n = r.index();
                n === i && r.addClass(t.bulletActiveClass),
                  t.dynamicBullets &&
                    (n >= o &&
                      n <= l &&
                      r.addClass(t.bulletActiveClass + "-main"),
                    n === o &&
                      r
                        .prev()
                        .addClass(t.bulletActiveClass + "-prev")
                        .prev()
                        .addClass(t.bulletActiveClass + "-prev-prev"),
                    n === l &&
                      r
                        .next()
                        .addClass(t.bulletActiveClass + "-next")
                        .next()
                        .addClass(t.bulletActiveClass + "-next-next"));
              });
            else {
              var p = h.eq(i),
                c = p.index();
              if ((p.addClass(t.bulletActiveClass), t.dynamicBullets)) {
                for (var u = h.eq(o), v = h.eq(l), f = o; f <= l; f += 1)
                  h.eq(f).addClass(t.bulletActiveClass + "-main");
                if (this.params.loop)
                  if (c >= h.length - t.dynamicMainBullets) {
                    for (var m = t.dynamicMainBullets; m >= 0; m -= 1)
                      h.eq(h.length - m).addClass(
                        t.bulletActiveClass + "-main"
                      );
                    h.eq(h.length - t.dynamicMainBullets - 1).addClass(
                      t.bulletActiveClass + "-prev"
                    );
                  } else
                    u
                      .prev()
                      .addClass(t.bulletActiveClass + "-prev")
                      .prev()
                      .addClass(t.bulletActiveClass + "-prev-prev"),
                      v
                        .next()
                        .addClass(t.bulletActiveClass + "-next")
                        .next()
                        .addClass(t.bulletActiveClass + "-next-next");
                else
                  u
                    .prev()
                    .addClass(t.bulletActiveClass + "-prev")
                    .prev()
                    .addClass(t.bulletActiveClass + "-prev-prev"),
                    v
                      .next()
                      .addClass(t.bulletActiveClass + "-next")
                      .next()
                      .addClass(t.bulletActiveClass + "-next-next");
              }
            }
            if (t.dynamicBullets) {
              var g = Math.min(h.length, t.dynamicMainBullets + 4),
                b =
                  (this.pagination.bulletSize * g -
                    this.pagination.bulletSize) /
                    2 -
                  d * this.pagination.bulletSize,
                w = e ? "right" : "left";
              h.css(this.isHorizontal() ? w : "top", b + "px");
            }
          }
          if (
            ("fraction" === t.type &&
              (r
                .find("." + t.currentClass)
                .text(t.formatFractionCurrent(i + 1)),
              r.find("." + t.totalClass).text(t.formatFractionTotal(n))),
            "progressbar" === t.type)
          ) {
            var y;
            y = t.progressbarOpposite
              ? this.isHorizontal()
                ? "vertical"
                : "horizontal"
              : this.isHorizontal()
              ? "horizontal"
              : "vertical";
            var x = (i + 1) / n,
              T = 1,
              E = 1;
            "horizontal" === y ? (T = x) : (E = x),
              r
                .find("." + t.progressbarFillClass)
                .transform(
                  "translate3d(0,0,0) scaleX(" + T + ") scaleY(" + E + ")"
                )
                .transition(this.params.speed);
          }
          "custom" === t.type && t.renderCustom
            ? (r.html(t.renderCustom(this, i + 1, n)),
              this.emit("paginationRender", this, r[0]))
            : this.emit("paginationUpdate", this, r[0]),
            r[
              this.params.watchOverflow && this.isLocked
                ? "addClass"
                : "removeClass"
            ](t.lockClass);
        }
      },
      render: function () {
        var e = this.params.pagination;
        if (
          e.el &&
          this.pagination.el &&
          this.pagination.$el &&
          0 !== this.pagination.$el.length
        ) {
          var t =
              this.virtual && this.params.virtual.enabled
                ? this.virtual.slides.length
                : this.slides.length,
            i = this.pagination.$el,
            s = "";
          if ("bullets" === e.type) {
            for (
              var a = this.params.loop
                  ? Math.ceil(
                      (t - 2 * this.loopedSlides) / this.params.slidesPerGroup
                    )
                  : this.snapGrid.length,
                r = 0;
              r < a;
              r += 1
            )
              e.renderBullet
                ? (s += e.renderBullet.call(this, r, e.bulletClass))
                : (s +=
                    "<" +
                    e.bulletElement +
                    ' class="' +
                    e.bulletClass +
                    '"></' +
                    e.bulletElement +
                    ">");
            i.html(s), (this.pagination.bullets = i.find("." + e.bulletClass));
          }
          "fraction" === e.type &&
            ((s = e.renderFraction
              ? e.renderFraction.call(this, e.currentClass, e.totalClass)
              : '<span class="' +
                e.currentClass +
                '"></span> / <span class="' +
                e.totalClass +
                '"></span>'),
            i.html(s)),
            "progressbar" === e.type &&
              ((s = e.renderProgressbar
                ? e.renderProgressbar.call(this, e.progressbarFillClass)
                : '<span class="' + e.progressbarFillClass + '"></span>'),
              i.html(s)),
            "custom" !== e.type &&
              this.emit("paginationRender", this.pagination.$el[0]);
        }
      },
      init: function () {
        var e = this,
          t = e.params.pagination;
        if (t.el) {
          var i = s(t.el);
          0 !== i.length &&
            (e.params.uniqueNavElements &&
              "string" == typeof t.el &&
              i.length > 1 &&
              1 === e.$el.find(t.el).length &&
              (i = e.$el.find(t.el)),
            "bullets" === t.type && t.clickable && i.addClass(t.clickableClass),
            i.addClass(t.modifierClass + t.type),
            "bullets" === t.type &&
              t.dynamicBullets &&
              (i.addClass("" + t.modifierClass + t.type + "-dynamic"),
              (e.pagination.dynamicBulletIndex = 0),
              t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
            "progressbar" === t.type &&
              t.progressbarOpposite &&
              i.addClass(t.progressbarOppositeClass),
            t.clickable &&
              i.on("click", "." + t.bulletClass, function (t) {
                t.preventDefault();
                var i = s(this).index() * e.params.slidesPerGroup;
                e.params.loop && (i += e.loopedSlides), e.slideTo(i);
              }),
            n.extend(e.pagination, { $el: i, el: i[0] }));
        }
      },
      destroy: function () {
        var e = this.params.pagination;
        if (
          e.el &&
          this.pagination.el &&
          this.pagination.$el &&
          0 !== this.pagination.$el.length
        ) {
          var t = this.pagination.$el;
          t.removeClass(e.hiddenClass),
            t.removeClass(e.modifierClass + e.type),
            this.pagination.bullets &&
              this.pagination.bullets.removeClass(e.bulletActiveClass),
            e.clickable && t.off("click", "." + e.bulletClass);
        }
      },
    },
    re = {
      setTranslate: function () {
        if (this.params.scrollbar.el && this.scrollbar.el) {
          var e = this.scrollbar,
            t = this.rtlTranslate,
            i = this.progress,
            s = e.dragSize,
            a = e.trackSize,
            r = e.$dragEl,
            n = e.$el,
            o = this.params.scrollbar,
            l = s,
            d = (a - s) * i;
          t
            ? (d = -d) > 0
              ? ((l = s - d), (d = 0))
              : -d + s > a && (l = a + d)
            : d < 0
            ? ((l = s + d), (d = 0))
            : d + s > a && (l = a - d),
            this.isHorizontal()
              ? (r.transform("translate3d(" + d + "px, 0, 0)"),
                (r[0].style.width = l + "px"))
              : (r.transform("translate3d(0px, " + d + "px, 0)"),
                (r[0].style.height = l + "px")),
            o.hide &&
              (clearTimeout(this.scrollbar.timeout),
              (n[0].style.opacity = 1),
              (this.scrollbar.timeout = setTimeout(function () {
                (n[0].style.opacity = 0), n.transition(400);
              }, 1e3)));
        }
      },
      setTransition: function (e) {
        this.params.scrollbar.el &&
          this.scrollbar.el &&
          this.scrollbar.$dragEl.transition(e);
      },
      updateSize: function () {
        if (this.params.scrollbar.el && this.scrollbar.el) {
          var e = this.scrollbar,
            t = e.$dragEl,
            i = e.$el;
          (t[0].style.width = ""), (t[0].style.height = "");
          var s,
            a = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
            r = this.size / this.virtualSize,
            o = r * (a / this.size);
          (s =
            "auto" === this.params.scrollbar.dragSize
              ? a * r
              : parseInt(this.params.scrollbar.dragSize, 10)),
            this.isHorizontal()
              ? (t[0].style.width = s + "px")
              : (t[0].style.height = s + "px"),
            (i[0].style.display = r >= 1 ? "none" : ""),
            this.params.scrollbar.hide && (i[0].style.opacity = 0),
            n.extend(e, {
              trackSize: a,
              divider: r,
              moveDivider: o,
              dragSize: s,
            }),
            e.$el[
              this.params.watchOverflow && this.isLocked
                ? "addClass"
                : "removeClass"
            ](this.params.scrollbar.lockClass);
        }
      },
      getPointerPosition: function (e) {
        return this.isHorizontal()
          ? "touchstart" === e.type || "touchmove" === e.type
            ? e.targetTouches[0].clientX
            : e.clientX
          : "touchstart" === e.type || "touchmove" === e.type
          ? e.targetTouches[0].clientY
          : e.clientY;
      },
      setDragPosition: function (e) {
        var t,
          i = this.scrollbar,
          s = this.rtlTranslate,
          a = i.$el,
          r = i.dragSize,
          n = i.trackSize,
          o = i.dragStartPos;
        (t =
          (i.getPointerPosition(e) -
            a.offset()[this.isHorizontal() ? "left" : "top"] -
            (null !== o ? o : r / 2)) /
          (n - r)),
          (t = Math.max(Math.min(t, 1), 0)),
          s && (t = 1 - t);
        var l =
          this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * t;
        this.updateProgress(l),
          this.setTranslate(l),
          this.updateActiveIndex(),
          this.updateSlidesClasses();
      },
      onDragStart: function (e) {
        var t = this.params.scrollbar,
          i = this.scrollbar,
          s = this.$wrapperEl,
          a = i.$el,
          r = i.$dragEl;
        (this.scrollbar.isTouched = !0),
          (this.scrollbar.dragStartPos =
            e.target === r[0] || e.target === r
              ? i.getPointerPosition(e) -
                e.target.getBoundingClientRect()[
                  this.isHorizontal() ? "left" : "top"
                ]
              : null),
          e.preventDefault(),
          e.stopPropagation(),
          s.transition(100),
          r.transition(100),
          i.setDragPosition(e),
          clearTimeout(this.scrollbar.dragTimeout),
          a.transition(0),
          t.hide && a.css("opacity", 1),
          this.params.cssMode &&
            this.$wrapperEl.css("scroll-snap-type", "none"),
          this.emit("scrollbarDragStart", e);
      },
      onDragMove: function (e) {
        var t = this.scrollbar,
          i = this.$wrapperEl,
          s = t.$el,
          a = t.$dragEl;
        this.scrollbar.isTouched &&
          (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
          t.setDragPosition(e),
          i.transition(0),
          s.transition(0),
          a.transition(0),
          this.emit("scrollbarDragMove", e));
      },
      onDragEnd: function (e) {
        var t = this.params.scrollbar,
          i = this.scrollbar,
          s = this.$wrapperEl,
          a = i.$el;
        this.scrollbar.isTouched &&
          ((this.scrollbar.isTouched = !1),
          this.params.cssMode &&
            (this.$wrapperEl.css("scroll-snap-type", ""), s.transition("")),
          t.hide &&
            (clearTimeout(this.scrollbar.dragTimeout),
            (this.scrollbar.dragTimeout = n.nextTick(function () {
              a.css("opacity", 0), a.transition(400);
            }, 1e3))),
          this.emit("scrollbarDragEnd", e),
          t.snapOnRelease && this.slideToClosest());
      },
      enableDraggable: function () {
        if (this.params.scrollbar.el) {
          var t = this.scrollbar,
            i = this.touchEventsTouch,
            s = this.touchEventsDesktop,
            a = this.params,
            r = t.$el[0],
            n = !(!o.passiveListener || !a.passiveListeners) && {
              passive: !1,
              capture: !1,
            },
            l = !(!o.passiveListener || !a.passiveListeners) && {
              passive: !0,
              capture: !1,
            };
          o.touch
            ? (r.addEventListener(i.start, this.scrollbar.onDragStart, n),
              r.addEventListener(i.move, this.scrollbar.onDragMove, n),
              r.addEventListener(i.end, this.scrollbar.onDragEnd, l))
            : (r.addEventListener(s.start, this.scrollbar.onDragStart, n),
              e.addEventListener(s.move, this.scrollbar.onDragMove, n),
              e.addEventListener(s.end, this.scrollbar.onDragEnd, l));
        }
      },
      disableDraggable: function () {
        if (this.params.scrollbar.el) {
          var t = this.scrollbar,
            i = this.touchEventsTouch,
            s = this.touchEventsDesktop,
            a = this.params,
            r = t.$el[0],
            n = !(!o.passiveListener || !a.passiveListeners) && {
              passive: !1,
              capture: !1,
            },
            l = !(!o.passiveListener || !a.passiveListeners) && {
              passive: !0,
              capture: !1,
            };
          o.touch
            ? (r.removeEventListener(i.start, this.scrollbar.onDragStart, n),
              r.removeEventListener(i.move, this.scrollbar.onDragMove, n),
              r.removeEventListener(i.end, this.scrollbar.onDragEnd, l))
            : (r.removeEventListener(s.start, this.scrollbar.onDragStart, n),
              e.removeEventListener(s.move, this.scrollbar.onDragMove, n),
              e.removeEventListener(s.end, this.scrollbar.onDragEnd, l));
        }
      },
      init: function () {
        if (this.params.scrollbar.el) {
          var e = this.scrollbar,
            t = this.$el,
            i = this.params.scrollbar,
            a = s(i.el);
          this.params.uniqueNavElements &&
            "string" == typeof i.el &&
            a.length > 1 &&
            1 === t.find(i.el).length &&
            (a = t.find(i.el));
          var r = a.find("." + this.params.scrollbar.dragClass);
          0 === r.length &&
            ((r = s(
              '<div class="' + this.params.scrollbar.dragClass + '"></div>'
            )),
            a.append(r)),
            n.extend(e, { $el: a, el: a[0], $dragEl: r, dragEl: r[0] }),
            i.draggable && e.enableDraggable();
        }
      },
      destroy: function () {
        this.scrollbar.disableDraggable();
      },
    },
    ne = {
      setTransform: function (e, t) {
        var i = this.rtl,
          a = s(e),
          r = i ? -1 : 1,
          n = a.attr("data-swiper-parallax") || "0",
          o = a.attr("data-swiper-parallax-x"),
          l = a.attr("data-swiper-parallax-y"),
          d = a.attr("data-swiper-parallax-scale"),
          h = a.attr("data-swiper-parallax-opacity");
        if (
          (o || l
            ? ((o = o || "0"), (l = l || "0"))
            : this.isHorizontal()
            ? ((o = n), (l = "0"))
            : ((l = n), (o = "0")),
          (o =
            o.indexOf("%") >= 0
              ? parseInt(o, 10) * t * r + "%"
              : o * t * r + "px"),
          (l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px"),
          null != h)
        ) {
          var p = h - (h - 1) * (1 - Math.abs(t));
          a[0].style.opacity = p;
        }
        if (null == d) a.transform("translate3d(" + o + ", " + l + ", 0px)");
        else {
          var c = d - (d - 1) * (1 - Math.abs(t));
          a.transform(
            "translate3d(" + o + ", " + l + ", 0px) scale(" + c + ")"
          );
        }
      },
      setTranslate: function () {
        var e = this,
          t = e.$el,
          i = e.slides,
          a = e.progress,
          r = e.snapGrid;
        t
          .children(
            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
          )
          .each(function (t, i) {
            e.parallax.setTransform(i, a);
          }),
          i.each(function (t, i) {
            var n = i.progress;
            e.params.slidesPerGroup > 1 &&
              "auto" !== e.params.slidesPerView &&
              (n += Math.ceil(t / 2) - a * (r.length - 1)),
              (n = Math.min(Math.max(n, -1), 1)),
              s(i)
                .find(
                  "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
                )
                .each(function (t, i) {
                  e.parallax.setTransform(i, n);
                });
          });
      },
      setTransition: function (e) {
        void 0 === e && (e = this.params.speed);
        this.$el
          .find(
            "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
          )
          .each(function (t, i) {
            var a = s(i),
              r = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
            0 === e && (r = 0), a.transition(r);
          });
      },
    },
    oe = {
      getDistanceBetweenTouches: function (e) {
        if (e.targetTouches.length < 2) return 1;
        var t = e.targetTouches[0].pageX,
          i = e.targetTouches[0].pageY,
          s = e.targetTouches[1].pageX,
          a = e.targetTouches[1].pageY;
        return Math.sqrt(Math.pow(s - t, 2) + Math.pow(a - i, 2));
      },
      onGestureStart: function (e) {
        var t = this.params.zoom,
          i = this.zoom,
          a = i.gesture;
        if (
          ((i.fakeGestureTouched = !1), (i.fakeGestureMoved = !1), !o.gestures)
        ) {
          if (
            "touchstart" !== e.type ||
            ("touchstart" === e.type && e.targetTouches.length < 2)
          )
            return;
          (i.fakeGestureTouched = !0),
            (a.scaleStart = oe.getDistanceBetweenTouches(e));
        }
        (a.$slideEl && a.$slideEl.length) ||
        ((a.$slideEl = s(e.target).closest("." + this.params.slideClass)),
        0 === a.$slideEl.length &&
          (a.$slideEl = this.slides.eq(this.activeIndex)),
        (a.$imageEl = a.$slideEl.find(
          "img, svg, canvas, picture, .swiper-zoom-target"
        )),
        (a.$imageWrapEl = a.$imageEl.parent("." + t.containerClass)),
        (a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio),
        0 !== a.$imageWrapEl.length)
          ? (a.$imageEl.transition(0), (this.zoom.isScaling = !0))
          : (a.$imageEl = void 0);
      },
      onGestureChange: function (e) {
        var t = this.params.zoom,
          i = this.zoom,
          s = i.gesture;
        if (!o.gestures) {
          if (
            "touchmove" !== e.type ||
            ("touchmove" === e.type && e.targetTouches.length < 2)
          )
            return;
          (i.fakeGestureMoved = !0),
            (s.scaleMove = oe.getDistanceBetweenTouches(e));
        }
        s.$imageEl &&
          0 !== s.$imageEl.length &&
          (o.gestures
            ? (i.scale = e.scale * i.currentScale)
            : (i.scale = (s.scaleMove / s.scaleStart) * i.currentScale),
          i.scale > s.maxRatio &&
            (i.scale =
              s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, 0.5)),
          i.scale < t.minRatio &&
            (i.scale =
              t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, 0.5)),
          s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"));
      },
      onGestureEnd: function (e) {
        var t = this.params.zoom,
          i = this.zoom,
          s = i.gesture;
        if (!o.gestures) {
          if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
          if (
            "touchend" !== e.type ||
            ("touchend" === e.type && e.changedTouches.length < 2 && !I.android)
          )
            return;
          (i.fakeGestureTouched = !1), (i.fakeGestureMoved = !1);
        }
        s.$imageEl &&
          0 !== s.$imageEl.length &&
          ((i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio)),
          s.$imageEl
            .transition(this.params.speed)
            .transform("translate3d(0,0,0) scale(" + i.scale + ")"),
          (i.currentScale = i.scale),
          (i.isScaling = !1),
          1 === i.scale && (s.$slideEl = void 0));
      },
      onTouchStart: function (e) {
        var t = this.zoom,
          i = t.gesture,
          s = t.image;
        i.$imageEl &&
          0 !== i.$imageEl.length &&
          (s.isTouched ||
            (I.android && e.preventDefault(),
            (s.isTouched = !0),
            (s.touchesStart.x =
              "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX),
            (s.touchesStart.y =
              "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY)));
      },
      onTouchMove: function (e) {
        var t = this.zoom,
          i = t.gesture,
          s = t.image,
          a = t.velocity;
        if (
          i.$imageEl &&
          0 !== i.$imageEl.length &&
          ((this.allowClick = !1), s.isTouched && i.$slideEl)
        ) {
          s.isMoved ||
            ((s.width = i.$imageEl[0].offsetWidth),
            (s.height = i.$imageEl[0].offsetHeight),
            (s.startX = n.getTranslate(i.$imageWrapEl[0], "x") || 0),
            (s.startY = n.getTranslate(i.$imageWrapEl[0], "y") || 0),
            (i.slideWidth = i.$slideEl[0].offsetWidth),
            (i.slideHeight = i.$slideEl[0].offsetHeight),
            i.$imageWrapEl.transition(0),
            this.rtl && ((s.startX = -s.startX), (s.startY = -s.startY)));
          var r = s.width * t.scale,
            o = s.height * t.scale;
          if (!(r < i.slideWidth && o < i.slideHeight)) {
            if (
              ((s.minX = Math.min(i.slideWidth / 2 - r / 2, 0)),
              (s.maxX = -s.minX),
              (s.minY = Math.min(i.slideHeight / 2 - o / 2, 0)),
              (s.maxY = -s.minY),
              (s.touchesCurrent.x =
                "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
              (s.touchesCurrent.y =
                "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
              !s.isMoved && !t.isScaling)
            ) {
              if (
                this.isHorizontal() &&
                ((Math.floor(s.minX) === Math.floor(s.startX) &&
                  s.touchesCurrent.x < s.touchesStart.x) ||
                  (Math.floor(s.maxX) === Math.floor(s.startX) &&
                    s.touchesCurrent.x > s.touchesStart.x))
              )
                return void (s.isTouched = !1);
              if (
                !this.isHorizontal() &&
                ((Math.floor(s.minY) === Math.floor(s.startY) &&
                  s.touchesCurrent.y < s.touchesStart.y) ||
                  (Math.floor(s.maxY) === Math.floor(s.startY) &&
                    s.touchesCurrent.y > s.touchesStart.y))
              )
                return void (s.isTouched = !1);
            }
            e.preventDefault(),
              e.stopPropagation(),
              (s.isMoved = !0),
              (s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX),
              (s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY),
              s.currentX < s.minX &&
                (s.currentX =
                  s.minX + 1 - Math.pow(s.minX - s.currentX + 1, 0.8)),
              s.currentX > s.maxX &&
                (s.currentX =
                  s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, 0.8)),
              s.currentY < s.minY &&
                (s.currentY =
                  s.minY + 1 - Math.pow(s.minY - s.currentY + 1, 0.8)),
              s.currentY > s.maxY &&
                (s.currentY =
                  s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, 0.8)),
              a.prevPositionX || (a.prevPositionX = s.touchesCurrent.x),
              a.prevPositionY || (a.prevPositionY = s.touchesCurrent.y),
              a.prevTime || (a.prevTime = Date.now()),
              (a.x =
                (s.touchesCurrent.x - a.prevPositionX) /
                (Date.now() - a.prevTime) /
                2),
              (a.y =
                (s.touchesCurrent.y - a.prevPositionY) /
                (Date.now() - a.prevTime) /
                2),
              Math.abs(s.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0),
              Math.abs(s.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0),
              (a.prevPositionX = s.touchesCurrent.x),
              (a.prevPositionY = s.touchesCurrent.y),
              (a.prevTime = Date.now()),
              i.$imageWrapEl.transform(
                "translate3d(" + s.currentX + "px, " + s.currentY + "px,0)"
              );
          }
        }
      },
      onTouchEnd: function () {
        var e = this.zoom,
          t = e.gesture,
          i = e.image,
          s = e.velocity;
        if (t.$imageEl && 0 !== t.$imageEl.length) {
          if (!i.isTouched || !i.isMoved)
            return (i.isTouched = !1), void (i.isMoved = !1);
          (i.isTouched = !1), (i.isMoved = !1);
          var a = 300,
            r = 300,
            n = s.x * a,
            o = i.currentX + n,
            l = s.y * r,
            d = i.currentY + l;
          0 !== s.x && (a = Math.abs((o - i.currentX) / s.x)),
            0 !== s.y && (r = Math.abs((d - i.currentY) / s.y));
          var h = Math.max(a, r);
          (i.currentX = o), (i.currentY = d);
          var p = i.width * e.scale,
            c = i.height * e.scale;
          (i.minX = Math.min(t.slideWidth / 2 - p / 2, 0)),
            (i.maxX = -i.minX),
            (i.minY = Math.min(t.slideHeight / 2 - c / 2, 0)),
            (i.maxY = -i.minY),
            (i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX)),
            (i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY)),
            t.$imageWrapEl
              .transition(h)
              .transform(
                "translate3d(" + i.currentX + "px, " + i.currentY + "px,0)"
              );
        }
      },
      onTransitionEnd: function () {
        var e = this.zoom,
          t = e.gesture;
        t.$slideEl &&
          this.previousIndex !== this.activeIndex &&
          (t.$imageEl.transform("translate3d(0,0,0) scale(1)"),
          t.$imageWrapEl.transform("translate3d(0,0,0)"),
          (e.scale = 1),
          (e.currentScale = 1),
          (t.$slideEl = void 0),
          (t.$imageEl = void 0),
          (t.$imageWrapEl = void 0));
      },
      toggle: function (e) {
        var t = this.zoom;
        t.scale && 1 !== t.scale ? t.out() : t.in(e);
      },
      in: function (e) {
        var t,
          i,
          s,
          a,
          r,
          n,
          o,
          l,
          d,
          h,
          p,
          c,
          u,
          v,
          f,
          m,
          g = this.zoom,
          b = this.params.zoom,
          w = g.gesture,
          y = g.image;
        (w.$slideEl ||
          ((w.$slideEl = this.slides.eq(this.activeIndex)),
          (w.$imageEl = w.$slideEl.find(
            "img, svg, canvas, picture, .swiper-zoom-target"
          )),
          (w.$imageWrapEl = w.$imageEl.parent("." + b.containerClass))),
        w.$imageEl && 0 !== w.$imageEl.length) &&
          (w.$slideEl.addClass("" + b.zoomedSlideClass),
          void 0 === y.touchesStart.x && e
            ? ((t =
                "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX),
              (i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY))
            : ((t = y.touchesStart.x), (i = y.touchesStart.y)),
          (g.scale = w.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio),
          (g.currentScale =
            w.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio),
          e
            ? ((f = w.$slideEl[0].offsetWidth),
              (m = w.$slideEl[0].offsetHeight),
              (s = w.$slideEl.offset().left + f / 2 - t),
              (a = w.$slideEl.offset().top + m / 2 - i),
              (o = w.$imageEl[0].offsetWidth),
              (l = w.$imageEl[0].offsetHeight),
              (d = o * g.scale),
              (h = l * g.scale),
              (u = -(p = Math.min(f / 2 - d / 2, 0))),
              (v = -(c = Math.min(m / 2 - h / 2, 0))),
              (r = s * g.scale) < p && (r = p),
              r > u && (r = u),
              (n = a * g.scale) < c && (n = c),
              n > v && (n = v))
            : ((r = 0), (n = 0)),
          w.$imageWrapEl
            .transition(300)
            .transform("translate3d(" + r + "px, " + n + "px,0)"),
          w.$imageEl
            .transition(300)
            .transform("translate3d(0,0,0) scale(" + g.scale + ")"));
      },
      out: function () {
        var e = this.zoom,
          t = this.params.zoom,
          i = e.gesture;
        i.$slideEl ||
          ((i.$slideEl = this.slides.eq(this.activeIndex)),
          (i.$imageEl = i.$slideEl.find(
            "img, svg, canvas, picture, .swiper-zoom-target"
          )),
          (i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass))),
          i.$imageEl &&
            0 !== i.$imageEl.length &&
            ((e.scale = 1),
            (e.currentScale = 1),
            i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
            i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
            i.$slideEl.removeClass("" + t.zoomedSlideClass),
            (i.$slideEl = void 0));
      },
      enable: function () {
        var e = this.zoom;
        if (!e.enabled) {
          e.enabled = !0;
          var t = !(
              "touchstart" !== this.touchEvents.start ||
              !o.passiveListener ||
              !this.params.passiveListeners
            ) && { passive: !0, capture: !1 },
            i = !o.passiveListener || { passive: !1, capture: !0 },
            s = "." + this.params.slideClass;
          o.gestures
            ? (this.$wrapperEl.on("gesturestart", s, e.onGestureStart, t),
              this.$wrapperEl.on("gesturechange", s, e.onGestureChange, t),
              this.$wrapperEl.on("gestureend", s, e.onGestureEnd, t))
            : "touchstart" === this.touchEvents.start &&
              (this.$wrapperEl.on(
                this.touchEvents.start,
                s,
                e.onGestureStart,
                t
              ),
              this.$wrapperEl.on(
                this.touchEvents.move,
                s,
                e.onGestureChange,
                i
              ),
              this.$wrapperEl.on(this.touchEvents.end, s, e.onGestureEnd, t),
              this.touchEvents.cancel &&
                this.$wrapperEl.on(
                  this.touchEvents.cancel,
                  s,
                  e.onGestureEnd,
                  t
                )),
            this.$wrapperEl.on(
              this.touchEvents.move,
              "." + this.params.zoom.containerClass,
              e.onTouchMove,
              i
            );
        }
      },
      disable: function () {
        var e = this.zoom;
        if (e.enabled) {
          this.zoom.enabled = !1;
          var t = !(
              "touchstart" !== this.touchEvents.start ||
              !o.passiveListener ||
              !this.params.passiveListeners
            ) && { passive: !0, capture: !1 },
            i = !o.passiveListener || { passive: !1, capture: !0 },
            s = "." + this.params.slideClass;
          o.gestures
            ? (this.$wrapperEl.off("gesturestart", s, e.onGestureStart, t),
              this.$wrapperEl.off("gesturechange", s, e.onGestureChange, t),
              this.$wrapperEl.off("gestureend", s, e.onGestureEnd, t))
            : "touchstart" === this.touchEvents.start &&
              (this.$wrapperEl.off(
                this.touchEvents.start,
                s,
                e.onGestureStart,
                t
              ),
              this.$wrapperEl.off(
                this.touchEvents.move,
                s,
                e.onGestureChange,
                i
              ),
              this.$wrapperEl.off(this.touchEvents.end, s, e.onGestureEnd, t),
              this.touchEvents.cancel &&
                this.$wrapperEl.off(
                  this.touchEvents.cancel,
                  s,
                  e.onGestureEnd,
                  t
                )),
            this.$wrapperEl.off(
              this.touchEvents.move,
              "." + this.params.zoom.containerClass,
              e.onTouchMove,
              i
            );
        }
      },
    },
    le = {
      loadInSlide: function (e, t) {
        void 0 === t && (t = !0);
        var i = this,
          a = i.params.lazy;
        if (void 0 !== e && 0 !== i.slides.length) {
          var r =
              i.virtual && i.params.virtual.enabled
                ? i.$wrapperEl.children(
                    "." +
                      i.params.slideClass +
                      '[data-swiper-slide-index="' +
                      e +
                      '"]'
                  )
                : i.slides.eq(e),
            n = r.find(
              "." +
                a.elementClass +
                ":not(." +
                a.loadedClass +
                "):not(." +
                a.loadingClass +
                ")"
            );
          !r.hasClass(a.elementClass) ||
            r.hasClass(a.loadedClass) ||
            r.hasClass(a.loadingClass) ||
            (n = n.add(r[0])),
            0 !== n.length &&
              n.each(function (e, n) {
                var o = s(n);
                o.addClass(a.loadingClass);
                var l = o.attr("data-background"),
                  d = o.attr("data-src"),
                  h = o.attr("data-srcset"),
                  p = o.attr("data-sizes");
                i.loadImage(o[0], d || l, h, p, !1, function () {
                  if (null != i && i && (!i || i.params) && !i.destroyed) {
                    if (
                      (l
                        ? (o.css("background-image", 'url("' + l + '")'),
                          o.removeAttr("data-background"))
                        : (h &&
                            (o.attr("srcset", h), o.removeAttr("data-srcset")),
                          p && (o.attr("sizes", p), o.removeAttr("data-sizes")),
                          d && (o.attr("src", d), o.removeAttr("data-src"))),
                      o.addClass(a.loadedClass).removeClass(a.loadingClass),
                      r.find("." + a.preloaderClass).remove(),
                      i.params.loop && t)
                    ) {
                      var e = r.attr("data-swiper-slide-index");
                      if (r.hasClass(i.params.slideDuplicateClass)) {
                        var s = i.$wrapperEl.children(
                          '[data-swiper-slide-index="' +
                            e +
                            '"]:not(.' +
                            i.params.slideDuplicateClass +
                            ")"
                        );
                        i.lazy.loadInSlide(s.index(), !1);
                      } else {
                        var n = i.$wrapperEl.children(
                          "." +
                            i.params.slideDuplicateClass +
                            '[data-swiper-slide-index="' +
                            e +
                            '"]'
                        );
                        i.lazy.loadInSlide(n.index(), !1);
                      }
                    }
                    i.emit("lazyImageReady", r[0], o[0]),
                      i.params.autoHeight && i.updateAutoHeight();
                  }
                }),
                  i.emit("lazyImageLoad", r[0], o[0]);
              });
        }
      },
      load: function () {
        var e = this,
          t = e.$wrapperEl,
          i = e.params,
          a = e.slides,
          r = e.activeIndex,
          n = e.virtual && i.virtual.enabled,
          o = i.lazy,
          l = i.slidesPerView;
        function d(e) {
          if (n) {
            if (
              t.children(
                "." + i.slideClass + '[data-swiper-slide-index="' + e + '"]'
              ).length
            )
              return !0;
          } else if (a[e]) return !0;
          return !1;
        }
        function h(e) {
          return n ? s(e).attr("data-swiper-slide-index") : s(e).index();
        }
        if (
          ("auto" === l && (l = 0),
          e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0),
          e.params.watchSlidesVisibility)
        )
          t.children("." + i.slideVisibleClass).each(function (t, i) {
            var a = n ? s(i).attr("data-swiper-slide-index") : s(i).index();
            e.lazy.loadInSlide(a);
          });
        else if (l > 1)
          for (var p = r; p < r + l; p += 1) d(p) && e.lazy.loadInSlide(p);
        else e.lazy.loadInSlide(r);
        if (o.loadPrevNext)
          if (l > 1 || (o.loadPrevNextAmount && o.loadPrevNextAmount > 1)) {
            for (
              var c = o.loadPrevNextAmount,
                u = l,
                v = Math.min(r + u + Math.max(c, u), a.length),
                f = Math.max(r - Math.max(u, c), 0),
                m = r + l;
              m < v;
              m += 1
            )
              d(m) && e.lazy.loadInSlide(m);
            for (var g = f; g < r; g += 1) d(g) && e.lazy.loadInSlide(g);
          } else {
            var b = t.children("." + i.slideNextClass);
            b.length > 0 && e.lazy.loadInSlide(h(b));
            var w = t.children("." + i.slidePrevClass);
            w.length > 0 && e.lazy.loadInSlide(h(w));
          }
      },
    },
    de = {
      LinearSpline: function (e, t) {
        var i,
          s,
          a,
          r,
          n,
          o = function (e, t) {
            for (s = -1, i = e.length; i - s > 1; )
              e[(a = (i + s) >> 1)] <= t ? (s = a) : (i = a);
            return i;
          };
        return (
          (this.x = e),
          (this.y = t),
          (this.lastIndex = e.length - 1),
          (this.interpolate = function (e) {
            return e
              ? ((n = o(this.x, e)),
                (r = n - 1),
                ((e - this.x[r]) * (this.y[n] - this.y[r])) /
                  (this.x[n] - this.x[r]) +
                  this.y[r])
              : 0;
          }),
          this
        );
      },
      getInterpolateFunction: function (e) {
        this.controller.spline ||
          (this.controller.spline = this.params.loop
            ? new de.LinearSpline(this.slidesGrid, e.slidesGrid)
            : new de.LinearSpline(this.snapGrid, e.snapGrid));
      },
      setTranslate: function (e, t) {
        var i,
          s,
          a = this,
          r = a.controller.control;
        function n(e) {
          var t = a.rtlTranslate ? -a.translate : a.translate;
          "slide" === a.params.controller.by &&
            (a.controller.getInterpolateFunction(e),
            (s = -a.controller.spline.interpolate(-t))),
            (s && "container" !== a.params.controller.by) ||
              ((i =
                (e.maxTranslate() - e.minTranslate()) /
                (a.maxTranslate() - a.minTranslate())),
              (s = (t - a.minTranslate()) * i + e.minTranslate())),
            a.params.controller.inverse && (s = e.maxTranslate() - s),
            e.updateProgress(s),
            e.setTranslate(s, a),
            e.updateActiveIndex(),
            e.updateSlidesClasses();
        }
        if (Array.isArray(r))
          for (var o = 0; o < r.length; o += 1)
            r[o] !== t && r[o] instanceof W && n(r[o]);
        else r instanceof W && t !== r && n(r);
      },
      setTransition: function (e, t) {
        var i,
          s = this,
          a = s.controller.control;
        function r(t) {
          t.setTransition(e, s),
            0 !== e &&
              (t.transitionStart(),
              t.params.autoHeight &&
                n.nextTick(function () {
                  t.updateAutoHeight();
                }),
              t.$wrapperEl.transitionEnd(function () {
                a &&
                  (t.params.loop &&
                    "slide" === s.params.controller.by &&
                    t.loopFix(),
                  t.transitionEnd());
              }));
        }
        if (Array.isArray(a))
          for (i = 0; i < a.length; i += 1)
            a[i] !== t && a[i] instanceof W && r(a[i]);
        else a instanceof W && t !== a && r(a);
      },
    },
    he = {
      makeElFocusable: function (e) {
        return e.attr("tabIndex", "0"), e;
      },
      addElRole: function (e, t) {
        return e.attr("role", t), e;
      },
      addElLabel: function (e, t) {
        return e.attr("aria-label", t), e;
      },
      disableEl: function (e) {
        return e.attr("aria-disabled", !0), e;
      },
      enableEl: function (e) {
        return e.attr("aria-disabled", !1), e;
      },
      onEnterKey: function (e) {
        var t = this.params.a11y;
        if (13 === e.keyCode) {
          var i = s(e.target);
          this.navigation &&
            this.navigation.$nextEl &&
            i.is(this.navigation.$nextEl) &&
            ((this.isEnd && !this.params.loop) || this.slideNext(),
            this.isEnd
              ? this.a11y.notify(t.lastSlideMessage)
              : this.a11y.notify(t.nextSlideMessage)),
            this.navigation &&
              this.navigation.$prevEl &&
              i.is(this.navigation.$prevEl) &&
              ((this.isBeginning && !this.params.loop) || this.slidePrev(),
              this.isBeginning
                ? this.a11y.notify(t.firstSlideMessage)
                : this.a11y.notify(t.prevSlideMessage)),
            this.pagination &&
              i.is("." + this.params.pagination.bulletClass) &&
              i[0].click();
        }
      },
      notify: function (e) {
        var t = this.a11y.liveRegion;
        0 !== t.length && (t.html(""), t.html(e));
      },
      updateNavigation: function () {
        if (!this.params.loop && this.navigation) {
          var e = this.navigation,
            t = e.$nextEl,
            i = e.$prevEl;
          i &&
            i.length > 0 &&
            (this.isBeginning ? this.a11y.disableEl(i) : this.a11y.enableEl(i)),
            t &&
              t.length > 0 &&
              (this.isEnd ? this.a11y.disableEl(t) : this.a11y.enableEl(t));
        }
      },
      updatePagination: function () {
        var e = this,
          t = e.params.a11y;
        e.pagination &&
          e.params.pagination.clickable &&
          e.pagination.bullets &&
          e.pagination.bullets.length &&
          e.pagination.bullets.each(function (i, a) {
            var r = s(a);
            e.a11y.makeElFocusable(r),
              e.a11y.addElRole(r, "button"),
              e.a11y.addElLabel(
                r,
                t.paginationBulletMessage.replace(/{{index}}/, r.index() + 1)
              );
          });
      },
      init: function () {
        this.$el.append(this.a11y.liveRegion);
        var e,
          t,
          i = this.params.a11y;
        this.navigation &&
          this.navigation.$nextEl &&
          (e = this.navigation.$nextEl),
          this.navigation &&
            this.navigation.$prevEl &&
            (t = this.navigation.$prevEl),
          e &&
            (this.a11y.makeElFocusable(e),
            this.a11y.addElRole(e, "button"),
            this.a11y.addElLabel(e, i.nextSlideMessage),
            e.on("keydown", this.a11y.onEnterKey)),
          t &&
            (this.a11y.makeElFocusable(t),
            this.a11y.addElRole(t, "button"),
            this.a11y.addElLabel(t, i.prevSlideMessage),
            t.on("keydown", this.a11y.onEnterKey)),
          this.pagination &&
            this.params.pagination.clickable &&
            this.pagination.bullets &&
            this.pagination.bullets.length &&
            this.pagination.$el.on(
              "keydown",
              "." + this.params.pagination.bulletClass,
              this.a11y.onEnterKey
            );
      },
      destroy: function () {
        var e, t;
        this.a11y.liveRegion &&
          this.a11y.liveRegion.length > 0 &&
          this.a11y.liveRegion.remove(),
          this.navigation &&
            this.navigation.$nextEl &&
            (e = this.navigation.$nextEl),
          this.navigation &&
            this.navigation.$prevEl &&
            (t = this.navigation.$prevEl),
          e && e.off("keydown", this.a11y.onEnterKey),
          t && t.off("keydown", this.a11y.onEnterKey),
          this.pagination &&
            this.params.pagination.clickable &&
            this.pagination.bullets &&
            this.pagination.bullets.length &&
            this.pagination.$el.off(
              "keydown",
              "." + this.params.pagination.bulletClass,
              this.a11y.onEnterKey
            );
      },
    },
    pe = {
      init: function () {
        if (this.params.history) {
          if (!t.history || !t.history.pushState)
            return (
              (this.params.history.enabled = !1),
              void (this.params.hashNavigation.enabled = !0)
            );
          var e = this.history;
          (e.initialized = !0),
            (e.paths = pe.getPathValues()),
            (e.paths.key || e.paths.value) &&
              (e.scrollToSlide(
                0,
                e.paths.value,
                this.params.runCallbacksOnInit
              ),
              this.params.history.replaceState ||
                t.addEventListener(
                  "popstate",
                  this.history.setHistoryPopState
                ));
        }
      },
      destroy: function () {
        this.params.history.replaceState ||
          t.removeEventListener("popstate", this.history.setHistoryPopState);
      },
      setHistoryPopState: function () {
        (this.history.paths = pe.getPathValues()),
          this.history.scrollToSlide(
            this.params.speed,
            this.history.paths.value,
            !1
          );
      },
      getPathValues: function () {
        var e = t.location.pathname
            .slice(1)
            .split("../../index.html")
            .filter(function (e) {
              return "" !== e;
            }),
          i = e.length;
        return { key: e[i - 2], value: e[i - 1] };
      },
      setHistory: function (e, i) {
        if (this.history.initialized && this.params.history.enabled) {
          var s = this.slides.eq(i),
            a = pe.slugify(s.attr("data-history"));
          t.location.pathname.includes(e) || (a = e + "/" + a);
          var r = t.history.state;
          (r && r.value === a) ||
            (this.params.history.replaceState
              ? t.history.replaceState({ value: a }, null, a)
              : t.history.pushState({ value: a }, null, a));
        }
      },
      slugify: function (e) {
        return e
          .toString()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "")
          .replace(/--+/g, "-")
          .replace(/^-+/, "")
          .replace(/-+$/, "");
      },
      scrollToSlide: function (e, t, i) {
        if (t)
          for (var s = 0, a = this.slides.length; s < a; s += 1) {
            var r = this.slides.eq(s);
            if (
              pe.slugify(r.attr("data-history")) === t &&
              !r.hasClass(this.params.slideDuplicateClass)
            ) {
              var n = r.index();
              this.slideTo(n, e, i);
            }
          }
        else this.slideTo(0, e, i);
      },
    },
    ce = {
      onHashCange: function () {
        var t = e.location.hash.replace("#", "");
        if (t !== this.slides.eq(this.activeIndex).attr("data-hash")) {
          var i = this.$wrapperEl
            .children("." + this.params.slideClass + '[data-hash="' + t + '"]')
            .index();
          if (void 0 === i) return;
          this.slideTo(i);
        }
      },
      setHash: function () {
        if (
          this.hashNavigation.initialized &&
          this.params.hashNavigation.enabled
        )
          if (
            this.params.hashNavigation.replaceState &&
            t.history &&
            t.history.replaceState
          )
            t.history.replaceState(
              null,
              null,
              "#" + this.slides.eq(this.activeIndex).attr("data-hash") || ""
            );
          else {
            var i = this.slides.eq(this.activeIndex),
              s = i.attr("data-hash") || i.attr("data-history");
            e.location.hash = s || "";
          }
      },
      init: function () {
        if (
          !(
            !this.params.hashNavigation.enabled ||
            (this.params.history && this.params.history.enabled)
          )
        ) {
          this.hashNavigation.initialized = !0;
          var i = e.location.hash.replace("#", "");
          if (i)
            for (var a = 0, r = this.slides.length; a < r; a += 1) {
              var n = this.slides.eq(a);
              if (
                (n.attr("data-hash") || n.attr("data-history")) === i &&
                !n.hasClass(this.params.slideDuplicateClass)
              ) {
                var o = n.index();
                this.slideTo(o, 0, this.params.runCallbacksOnInit, !0);
              }
            }
          this.params.hashNavigation.watchState &&
            s(t).on("hashchange", this.hashNavigation.onHashCange);
        }
      },
      destroy: function () {
        this.params.hashNavigation.watchState &&
          s(t).off("hashchange", this.hashNavigation.onHashCange);
      },
    },
    ue = {
      run: function () {
        var e = this,
          t = e.slides.eq(e.activeIndex),
          i = e.params.autoplay.delay;
        t.attr("data-swiper-autoplay") &&
          (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
          clearTimeout(e.autoplay.timeout),
          (e.autoplay.timeout = n.nextTick(function () {
            e.params.autoplay.reverseDirection
              ? e.params.loop
                ? (e.loopFix(),
                  e.slidePrev(e.params.speed, !0, !0),
                  e.emit("autoplay"))
                : e.isBeginning
                ? e.params.autoplay.stopOnLastSlide
                  ? e.autoplay.stop()
                  : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0),
                    e.emit("autoplay"))
                : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay"))
              : e.params.loop
              ? (e.loopFix(),
                e.slideNext(e.params.speed, !0, !0),
                e.emit("autoplay"))
              : e.isEnd
              ? e.params.autoplay.stopOnLastSlide
                ? e.autoplay.stop()
                : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay"))
              : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")),
              e.params.cssMode && e.autoplay.running && e.autoplay.run();
          }, i));
      },
      start: function () {
        return (
          void 0 === this.autoplay.timeout &&
          !this.autoplay.running &&
          ((this.autoplay.running = !0),
          this.emit("autoplayStart"),
          this.autoplay.run(),
          !0)
        );
      },
      stop: function () {
        return (
          !!this.autoplay.running &&
          void 0 !== this.autoplay.timeout &&
          (this.autoplay.timeout &&
            (clearTimeout(this.autoplay.timeout),
            (this.autoplay.timeout = void 0)),
          (this.autoplay.running = !1),
          this.emit("autoplayStop"),
          !0)
        );
      },
      pause: function (e) {
        this.autoplay.running &&
          (this.autoplay.paused ||
            (this.autoplay.timeout && clearTimeout(this.autoplay.timeout),
            (this.autoplay.paused = !0),
            0 !== e && this.params.autoplay.waitForTransition
              ? (this.$wrapperEl[0].addEventListener(
                  "transitionend",
                  this.autoplay.onTransitionEnd
                ),
                this.$wrapperEl[0].addEventListener(
                  "webkitTransitionEnd",
                  this.autoplay.onTransitionEnd
                ))
              : ((this.autoplay.paused = !1), this.autoplay.run())));
      },
    },
    ve = {
      setTranslate: function () {
        for (var e = this.slides, t = 0; t < e.length; t += 1) {
          var i = this.slides.eq(t),
            s = -i[0].swiperSlideOffset;
          this.params.virtualTranslate || (s -= this.translate);
          var a = 0;
          this.isHorizontal() || ((a = s), (s = 0));
          var r = this.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs(i[0].progress), 0)
            : 1 + Math.min(Math.max(i[0].progress, -1), 0);
          i.css({ opacity: r }).transform(
            "translate3d(" + s + "px, " + a + "px, 0px)"
          );
        }
      },
      setTransition: function (e) {
        var t = this,
          i = t.slides,
          s = t.$wrapperEl;
        if ((i.transition(e), t.params.virtualTranslate && 0 !== e)) {
          var a = !1;
          i.transitionEnd(function () {
            if (!a && t && !t.destroyed) {
              (a = !0), (t.animating = !1);
              for (
                var e = ["webkitTransitionEnd", "transitionend"], i = 0;
                i < e.length;
                i += 1
              )
                s.trigger(e[i]);
            }
          });
        }
      },
    },
    fe = {
      setTranslate: function () {
        var e,
          t = this.$el,
          i = this.$wrapperEl,
          a = this.slides,
          r = this.width,
          n = this.height,
          o = this.rtlTranslate,
          l = this.size,
          d = this.params.cubeEffect,
          h = this.isHorizontal(),
          p = this.virtual && this.params.virtual.enabled,
          c = 0;
        d.shadow &&
          (h
            ? (0 === (e = i.find(".swiper-cube-shadow")).length &&
                ((e = s('<div class="swiper-cube-shadow"></div>')),
                i.append(e)),
              e.css({ height: r + "px" }))
            : 0 === (e = t.find(".swiper-cube-shadow")).length &&
              ((e = s('<div class="swiper-cube-shadow"></div>')), t.append(e)));
        for (var u = 0; u < a.length; u += 1) {
          var v = a.eq(u),
            f = u;
          p && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
          var m = 90 * f,
            g = Math.floor(m / 360);
          o && ((m = -m), (g = Math.floor(-m / 360)));
          var b = Math.max(Math.min(v[0].progress, 1), -1),
            w = 0,
            y = 0,
            x = 0;
          f % 4 == 0
            ? ((w = 4 * -g * l), (x = 0))
            : (f - 1) % 4 == 0
            ? ((w = 0), (x = 4 * -g * l))
            : (f - 2) % 4 == 0
            ? ((w = l + 4 * g * l), (x = l))
            : (f - 3) % 4 == 0 && ((w = -l), (x = 3 * l + 4 * l * g)),
            o && (w = -w),
            h || ((y = w), (w = 0));
          var T =
            "rotateX(" +
            (h ? 0 : -m) +
            "deg) rotateY(" +
            (h ? m : 0) +
            "deg) translate3d(" +
            w +
            "px, " +
            y +
            "px, " +
            x +
            "px)";
          if (
            (b <= 1 &&
              b > -1 &&
              ((c = 90 * f + 90 * b), o && (c = 90 * -f - 90 * b)),
            v.transform(T),
            d.slideShadows)
          ) {
            var E = h
                ? v.find(".swiper-slide-shadow-left")
                : v.find(".swiper-slide-shadow-top"),
              S = h
                ? v.find(".swiper-slide-shadow-right")
                : v.find(".swiper-slide-shadow-bottom");
            0 === E.length &&
              ((E = s(
                '<div class="swiper-slide-shadow-' +
                  (h ? "left" : "top") +
                  '"></div>'
              )),
              v.append(E)),
              0 === S.length &&
                ((S = s(
                  '<div class="swiper-slide-shadow-' +
                    (h ? "right" : "bottom") +
                    '"></div>'
                )),
                v.append(S)),
              E.length && (E[0].style.opacity = Math.max(-b, 0)),
              S.length && (S[0].style.opacity = Math.max(b, 0));
          }
        }
        if (
          (i.css({
            "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
            "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
            "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
            "transform-origin": "50% 50% -" + l / 2 + "px",
          }),
          d.shadow)
        )
          if (h)
            e.transform(
              "translate3d(0px, " +
                (r / 2 + d.shadowOffset) +
                "px, " +
                -r / 2 +
                "px) rotateX(90deg) rotateZ(0deg) scale(" +
                d.shadowScale +
                ")"
            );
          else {
            var C = Math.abs(c) - 90 * Math.floor(Math.abs(c) / 90),
              M =
                1.5 -
                (Math.sin((2 * C * Math.PI) / 360) / 2 +
                  Math.cos((2 * C * Math.PI) / 360) / 2),
              P = d.shadowScale,
              z = d.shadowScale / M,
              k = d.shadowOffset;
            e.transform(
              "scale3d(" +
                P +
                ", 1, " +
                z +
                ") translate3d(0px, " +
                (n / 2 + k) +
                "px, " +
                -n / 2 / z +
                "px) rotateX(-90deg)"
            );
          }
        var $ = j.isSafari || j.isUiWebView ? -l / 2 : 0;
        i.transform(
          "translate3d(0px,0," +
            $ +
            "px) rotateX(" +
            (this.isHorizontal() ? 0 : c) +
            "deg) rotateY(" +
            (this.isHorizontal() ? -c : 0) +
            "deg)"
        );
      },
      setTransition: function (e) {
        var t = this.$el;
        this.slides
          .transition(e)
          .find(
            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
          )
          .transition(e),
          this.params.cubeEffect.shadow &&
            !this.isHorizontal() &&
            t.find(".swiper-cube-shadow").transition(e);
      },
    },
    me = {
      setTranslate: function () {
        for (
          var e = this.slides, t = this.rtlTranslate, i = 0;
          i < e.length;
          i += 1
        ) {
          var a = e.eq(i),
            r = a[0].progress;
          this.params.flipEffect.limitRotation &&
            (r = Math.max(Math.min(a[0].progress, 1), -1));
          var n = -180 * r,
            o = 0,
            l = -a[0].swiperSlideOffset,
            d = 0;
          if (
            (this.isHorizontal()
              ? t && (n = -n)
              : ((d = l), (l = 0), (o = -n), (n = 0)),
            (a[0].style.zIndex = -Math.abs(Math.round(r)) + e.length),
            this.params.flipEffect.slideShadows)
          ) {
            var h = this.isHorizontal()
                ? a.find(".swiper-slide-shadow-left")
                : a.find(".swiper-slide-shadow-top"),
              p = this.isHorizontal()
                ? a.find(".swiper-slide-shadow-right")
                : a.find(".swiper-slide-shadow-bottom");
            0 === h.length &&
              ((h = s(
                '<div class="swiper-slide-shadow-' +
                  (this.isHorizontal() ? "left" : "top") +
                  '"></div>'
              )),
              a.append(h)),
              0 === p.length &&
                ((p = s(
                  '<div class="swiper-slide-shadow-' +
                    (this.isHorizontal() ? "right" : "bottom") +
                    '"></div>'
                )),
                a.append(p)),
              h.length && (h[0].style.opacity = Math.max(-r, 0)),
              p.length && (p[0].style.opacity = Math.max(r, 0));
          }
          a.transform(
            "translate3d(" +
              l +
              "px, " +
              d +
              "px, 0px) rotateX(" +
              o +
              "deg) rotateY(" +
              n +
              "deg)"
          );
        }
      },
      setTransition: function (e) {
        var t = this,
          i = t.slides,
          s = t.activeIndex,
          a = t.$wrapperEl;
        if (
          (i
            .transition(e)
            .find(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            )
            .transition(e),
          t.params.virtualTranslate && 0 !== e)
        ) {
          var r = !1;
          i.eq(s).transitionEnd(function () {
            if (!r && t && !t.destroyed) {
              (r = !0), (t.animating = !1);
              for (
                var e = ["webkitTransitionEnd", "transitionend"], i = 0;
                i < e.length;
                i += 1
              )
                a.trigger(e[i]);
            }
          });
        }
      },
    },
    ge = {
      setTranslate: function () {
        for (
          var e = this.width,
            t = this.height,
            i = this.slides,
            a = this.$wrapperEl,
            r = this.slidesSizesGrid,
            n = this.params.coverflowEffect,
            l = this.isHorizontal(),
            d = this.translate,
            h = l ? e / 2 - d : t / 2 - d,
            p = l ? n.rotate : -n.rotate,
            c = n.depth,
            u = 0,
            v = i.length;
          u < v;
          u += 1
        ) {
          var f = i.eq(u),
            m = r[u],
            g = ((h - f[0].swiperSlideOffset - m / 2) / m) * n.modifier,
            b = l ? p * g : 0,
            w = l ? 0 : p * g,
            y = -c * Math.abs(g),
            x = n.stretch;
          "string" == typeof x &&
            -1 !== x.indexOf("%") &&
            (x = (parseFloat(n.stretch) / 100) * m);
          var T = l ? 0 : x * g,
            E = l ? x * g : 0;
          Math.abs(E) < 0.001 && (E = 0),
            Math.abs(T) < 0.001 && (T = 0),
            Math.abs(y) < 0.001 && (y = 0),
            Math.abs(b) < 0.001 && (b = 0),
            Math.abs(w) < 0.001 && (w = 0);
          var S =
            "translate3d(" +
            E +
            "px," +
            T +
            "px," +
            y +
            "px)  rotateX(" +
            w +
            "deg) rotateY(" +
            b +
            "deg)";
          if (
            (f.transform(S),
            (f[0].style.zIndex = 1 - Math.abs(Math.round(g))),
            n.slideShadows)
          ) {
            var C = l
                ? f.find(".swiper-slide-shadow-left")
                : f.find(".swiper-slide-shadow-top"),
              M = l
                ? f.find(".swiper-slide-shadow-right")
                : f.find(".swiper-slide-shadow-bottom");
            0 === C.length &&
              ((C = s(
                '<div class="swiper-slide-shadow-' +
                  (l ? "left" : "top") +
                  '"></div>'
              )),
              f.append(C)),
              0 === M.length &&
                ((M = s(
                  '<div class="swiper-slide-shadow-' +
                    (l ? "right" : "bottom") +
                    '"></div>'
                )),
                f.append(M)),
              C.length && (C[0].style.opacity = g > 0 ? g : 0),
              M.length && (M[0].style.opacity = -g > 0 ? -g : 0);
          }
        }
        (o.pointerEvents || o.prefixedPointerEvents) &&
          (a[0].style.perspectiveOrigin = h + "px 50%");
      },
      setTransition: function (e) {
        this.slides
          .transition(e)
          .find(
            ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
          )
          .transition(e);
      },
    },
    be = {
      init: function () {
        var e = this.params.thumbs,
          t = this.constructor;
        e.swiper instanceof t
          ? ((this.thumbs.swiper = e.swiper),
            n.extend(this.thumbs.swiper.originalParams, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
            n.extend(this.thumbs.swiper.params, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }))
          : n.isObject(e.swiper) &&
            ((this.thumbs.swiper = new t(
              n.extend({}, e.swiper, {
                watchSlidesVisibility: !0,
                watchSlidesProgress: !0,
                slideToClickedSlide: !1,
              })
            )),
            (this.thumbs.swiperCreated = !0)),
          this.thumbs.swiper.$el.addClass(
            this.params.thumbs.thumbsContainerClass
          ),
          this.thumbs.swiper.on("tap", this.thumbs.onThumbClick);
      },
      onThumbClick: function () {
        var e = this.thumbs.swiper;
        if (e) {
          var t = e.clickedIndex,
            i = e.clickedSlide;
          if (
            !(
              (i && s(i).hasClass(this.params.thumbs.slideThumbActiveClass)) ||
              null == t
            )
          ) {
            var a;
            if (
              ((a = e.params.loop
                ? parseInt(
                    s(e.clickedSlide).attr("data-swiper-slide-index"),
                    10
                  )
                : t),
              this.params.loop)
            ) {
              var r = this.activeIndex;
              this.slides.eq(r).hasClass(this.params.slideDuplicateClass) &&
                (this.loopFix(),
                (this._clientLeft = this.$wrapperEl[0].clientLeft),
                (r = this.activeIndex));
              var n = this.slides
                  .eq(r)
                  .prevAll('[data-swiper-slide-index="' + a + '"]')
                  .eq(0)
                  .index(),
                o = this.slides
                  .eq(r)
                  .nextAll('[data-swiper-slide-index="' + a + '"]')
                  .eq(0)
                  .index();
              a = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n;
            }
            this.slideTo(a);
          }
        }
      },
      update: function (e) {
        var t = this.thumbs.swiper;
        if (t) {
          var i =
            "auto" === t.params.slidesPerView
              ? t.slidesPerViewDynamic()
              : t.params.slidesPerView;
          if (this.realIndex !== t.realIndex) {
            var s,
              a = t.activeIndex;
            if (t.params.loop) {
              t.slides.eq(a).hasClass(t.params.slideDuplicateClass) &&
                (t.loopFix(),
                (t._clientLeft = t.$wrapperEl[0].clientLeft),
                (a = t.activeIndex));
              var r = t.slides
                  .eq(a)
                  .prevAll('[data-swiper-slide-index="' + this.realIndex + '"]')
                  .eq(0)
                  .index(),
                n = t.slides
                  .eq(a)
                  .nextAll('[data-swiper-slide-index="' + this.realIndex + '"]')
                  .eq(0)
                  .index();
              s =
                void 0 === r
                  ? n
                  : void 0 === n
                  ? r
                  : n - a == a - r
                  ? a
                  : n - a < a - r
                  ? n
                  : r;
            } else s = this.realIndex;
            t.visibleSlidesIndexes &&
              t.visibleSlidesIndexes.indexOf(s) < 0 &&
              (t.params.centeredSlides
                ? (s =
                    s > a
                      ? s - Math.floor(i / 2) + 1
                      : s + Math.floor(i / 2) - 1)
                : s > a && (s = s - i + 1),
              t.slideTo(s, e ? 0 : void 0));
          }
          var o = 1,
            l = this.params.thumbs.slideThumbActiveClass;
          if (
            (this.params.slidesPerView > 1 &&
              !this.params.centeredSlides &&
              (o = this.params.slidesPerView),
            this.params.thumbs.multipleActiveThumbs || (o = 1),
            (o = Math.floor(o)),
            t.slides.removeClass(l),
            t.params.loop || (t.params.virtual && t.params.virtual.enabled))
          )
            for (var d = 0; d < o; d += 1)
              t.$wrapperEl
                .children(
                  '[data-swiper-slide-index="' + (this.realIndex + d) + '"]'
                )
                .addClass(l);
          else
            for (var h = 0; h < o; h += 1)
              t.slides.eq(this.realIndex + h).addClass(l);
        }
      },
    },
    we = [
      R,
      q,
      K,
      U,
      Z,
      J,
      te,
      {
        name: "mousewheel",
        params: {
          mousewheel: {
            enabled: !1,
            releaseOnEdges: !1,
            invert: !1,
            forceToAxis: !1,
            sensitivity: 1,
            eventsTarged: "container",
          },
        },
        create: function () {
          n.extend(this, {
            mousewheel: {
              enabled: !1,
              enable: ie.enable.bind(this),
              disable: ie.disable.bind(this),
              handle: ie.handle.bind(this),
              handleMouseEnter: ie.handleMouseEnter.bind(this),
              handleMouseLeave: ie.handleMouseLeave.bind(this),
              animateSlider: ie.animateSlider.bind(this),
              releaseScroll: ie.releaseScroll.bind(this),
              lastScrollTime: n.now(),
              lastEventBeforeSnap: void 0,
              recentWheelEvents: [],
            },
          });
        },
        on: {
          init: function () {
            !this.params.mousewheel.enabled &&
              this.params.cssMode &&
              this.mousewheel.disable(),
              this.params.mousewheel.enabled && this.mousewheel.enable();
          },
          destroy: function () {
            this.params.cssMode && this.mousewheel.enable(),
              this.mousewheel.enabled && this.mousewheel.disable();
          },
        },
      },
      {
        name: "navigation",
        params: {
          navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
          },
        },
        create: function () {
          n.extend(this, {
            navigation: {
              init: se.init.bind(this),
              update: se.update.bind(this),
              destroy: se.destroy.bind(this),
              onNextClick: se.onNextClick.bind(this),
              onPrevClick: se.onPrevClick.bind(this),
            },
          });
        },
        on: {
          init: function () {
            this.navigation.init(), this.navigation.update();
          },
          toEdge: function () {
            this.navigation.update();
          },
          fromEdge: function () {
            this.navigation.update();
          },
          destroy: function () {
            this.navigation.destroy();
          },
          click: function (e) {
            var t,
              i = this.navigation,
              a = i.$nextEl,
              r = i.$prevEl;
            !this.params.navigation.hideOnClick ||
              s(e.target).is(r) ||
              s(e.target).is(a) ||
              (a
                ? (t = a.hasClass(this.params.navigation.hiddenClass))
                : r && (t = r.hasClass(this.params.navigation.hiddenClass)),
              !0 === t
                ? this.emit("navigationShow", this)
                : this.emit("navigationHide", this),
              a && a.toggleClass(this.params.navigation.hiddenClass),
              r && r.toggleClass(this.params.navigation.hiddenClass));
          },
        },
      },
      {
        name: "pagination",
        params: {
          pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: function (e) {
              return e;
            },
            formatFractionTotal: function (e) {
              return e;
            },
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            modifierClass: "swiper-pagination-",
            currentClass: "swiper-pagination-current",
            totalClass: "swiper-pagination-total",
            hiddenClass: "swiper-pagination-hidden",
            progressbarFillClass: "swiper-pagination-progressbar-fill",
            progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
            clickableClass: "swiper-pagination-clickable",
            lockClass: "swiper-pagination-lock",
          },
        },
        create: function () {
          n.extend(this, {
            pagination: {
              init: ae.init.bind(this),
              render: ae.render.bind(this),
              update: ae.update.bind(this),
              destroy: ae.destroy.bind(this),
              dynamicBulletIndex: 0,
            },
          });
        },
        on: {
          init: function () {
            this.pagination.init(),
              this.pagination.render(),
              this.pagination.update();
          },
          activeIndexChange: function () {
            this.params.loop
              ? this.pagination.update()
              : void 0 === this.snapIndex && this.pagination.update();
          },
          snapIndexChange: function () {
            this.params.loop || this.pagination.update();
          },
          slidesLengthChange: function () {
            this.params.loop &&
              (this.pagination.render(), this.pagination.update());
          },
          snapGridLengthChange: function () {
            this.params.loop ||
              (this.pagination.render(), this.pagination.update());
          },
          destroy: function () {
            this.pagination.destroy();
          },
          click: function (e) {
            this.params.pagination.el &&
              this.params.pagination.hideOnClick &&
              this.pagination.$el.length > 0 &&
              !s(e.target).hasClass(this.params.pagination.bulletClass) &&
              (!0 ===
              this.pagination.$el.hasClass(this.params.pagination.hiddenClass)
                ? this.emit("paginationShow", this)
                : this.emit("paginationHide", this),
              this.pagination.$el.toggleClass(
                this.params.pagination.hiddenClass
              ));
          },
        },
      },
      {
        name: "scrollbar",
        params: {
          scrollbar: {
            el: null,
            dragSize: "auto",
            hide: !1,
            draggable: !1,
            snapOnRelease: !0,
            lockClass: "swiper-scrollbar-lock",
            dragClass: "swiper-scrollbar-drag",
          },
        },
        create: function () {
          n.extend(this, {
            scrollbar: {
              init: re.init.bind(this),
              destroy: re.destroy.bind(this),
              updateSize: re.updateSize.bind(this),
              setTranslate: re.setTranslate.bind(this),
              setTransition: re.setTransition.bind(this),
              enableDraggable: re.enableDraggable.bind(this),
              disableDraggable: re.disableDraggable.bind(this),
              setDragPosition: re.setDragPosition.bind(this),
              getPointerPosition: re.getPointerPosition.bind(this),
              onDragStart: re.onDragStart.bind(this),
              onDragMove: re.onDragMove.bind(this),
              onDragEnd: re.onDragEnd.bind(this),
              isTouched: !1,
              timeout: null,
              dragTimeout: null,
            },
          });
        },
        on: {
          init: function () {
            this.scrollbar.init(),
              this.scrollbar.updateSize(),
              this.scrollbar.setTranslate();
          },
          update: function () {
            this.scrollbar.updateSize();
          },
          resize: function () {
            this.scrollbar.updateSize();
          },
          observerUpdate: function () {
            this.scrollbar.updateSize();
          },
          setTranslate: function () {
            this.scrollbar.setTranslate();
          },
          setTransition: function (e) {
            this.scrollbar.setTransition(e);
          },
          destroy: function () {
            this.scrollbar.destroy();
          },
        },
      },
      {
        name: "parallax",
        params: { parallax: { enabled: !1 } },
        create: function () {
          n.extend(this, {
            parallax: {
              setTransform: ne.setTransform.bind(this),
              setTranslate: ne.setTranslate.bind(this),
              setTransition: ne.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            this.params.parallax.enabled &&
              ((this.params.watchSlidesProgress = !0),
              (this.originalParams.watchSlidesProgress = !0));
          },
          init: function () {
            this.params.parallax.enabled && this.parallax.setTranslate();
          },
          setTranslate: function () {
            this.params.parallax.enabled && this.parallax.setTranslate();
          },
          setTransition: function (e) {
            this.params.parallax.enabled && this.parallax.setTransition(e);
          },
        },
      },
      {
        name: "zoom",
        params: {
          zoom: {
            enabled: !1,
            maxRatio: 3,
            minRatio: 1,
            toggle: !0,
            containerClass: "swiper-zoom-container",
            zoomedSlideClass: "swiper-slide-zoomed",
          },
        },
        create: function () {
          var e = this,
            t = {
              enabled: !1,
              scale: 1,
              currentScale: 1,
              isScaling: !1,
              gesture: {
                $slideEl: void 0,
                slideWidth: void 0,
                slideHeight: void 0,
                $imageEl: void 0,
                $imageWrapEl: void 0,
                maxRatio: 3,
              },
              image: {
                isTouched: void 0,
                isMoved: void 0,
                currentX: void 0,
                currentY: void 0,
                minX: void 0,
                minY: void 0,
                maxX: void 0,
                maxY: void 0,
                width: void 0,
                height: void 0,
                startX: void 0,
                startY: void 0,
                touchesStart: {},
                touchesCurrent: {},
              },
              velocity: {
                x: void 0,
                y: void 0,
                prevPositionX: void 0,
                prevPositionY: void 0,
                prevTime: void 0,
              },
            };
          "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out"
            .split(" ")
            .forEach(function (i) {
              t[i] = oe[i].bind(e);
            }),
            n.extend(e, { zoom: t });
          var i = 1;
          Object.defineProperty(e.zoom, "scale", {
            get: function () {
              return i;
            },
            set: function (t) {
              if (i !== t) {
                var s = e.zoom.gesture.$imageEl
                    ? e.zoom.gesture.$imageEl[0]
                    : void 0,
                  a = e.zoom.gesture.$slideEl
                    ? e.zoom.gesture.$slideEl[0]
                    : void 0;
                e.emit("zoomChange", t, s, a);
              }
              i = t;
            },
          });
        },
        on: {
          init: function () {
            this.params.zoom.enabled && this.zoom.enable();
          },
          destroy: function () {
            this.zoom.disable();
          },
          touchStart: function (e) {
            this.zoom.enabled && this.zoom.onTouchStart(e);
          },
          touchEnd: function (e) {
            this.zoom.enabled && this.zoom.onTouchEnd(e);
          },
          doubleTap: function (e) {
            this.params.zoom.enabled &&
              this.zoom.enabled &&
              this.params.zoom.toggle &&
              this.zoom.toggle(e);
          },
          transitionEnd: function () {
            this.zoom.enabled &&
              this.params.zoom.enabled &&
              this.zoom.onTransitionEnd();
          },
          slideChange: function () {
            this.zoom.enabled &&
              this.params.zoom.enabled &&
              this.params.cssMode &&
              this.zoom.onTransitionEnd();
          },
        },
      },
      {
        name: "lazy",
        params: {
          lazy: {
            enabled: !1,
            loadPrevNext: !1,
            loadPrevNextAmount: 1,
            loadOnTransitionStart: !1,
            elementClass: "swiper-lazy",
            loadingClass: "swiper-lazy-loading",
            loadedClass: "swiper-lazy-loaded",
            preloaderClass: "swiper-lazy-preloader",
          },
        },
        create: function () {
          n.extend(this, {
            lazy: {
              initialImageLoaded: !1,
              load: le.load.bind(this),
              loadInSlide: le.loadInSlide.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            this.params.lazy.enabled &&
              this.params.preloadImages &&
              (this.params.preloadImages = !1);
          },
          init: function () {
            this.params.lazy.enabled &&
              !this.params.loop &&
              0 === this.params.initialSlide &&
              this.lazy.load();
          },
          scroll: function () {
            this.params.freeMode &&
              !this.params.freeModeSticky &&
              this.lazy.load();
          },
          resize: function () {
            this.params.lazy.enabled && this.lazy.load();
          },
          scrollbarDragMove: function () {
            this.params.lazy.enabled && this.lazy.load();
          },
          transitionStart: function () {
            this.params.lazy.enabled &&
              (this.params.lazy.loadOnTransitionStart ||
                (!this.params.lazy.loadOnTransitionStart &&
                  !this.lazy.initialImageLoaded)) &&
              this.lazy.load();
          },
          transitionEnd: function () {
            this.params.lazy.enabled &&
              !this.params.lazy.loadOnTransitionStart &&
              this.lazy.load();
          },
          slideChange: function () {
            this.params.lazy.enabled && this.params.cssMode && this.lazy.load();
          },
        },
      },
      {
        name: "controller",
        params: { controller: { control: void 0, inverse: !1, by: "slide" } },
        create: function () {
          n.extend(this, {
            controller: {
              control: this.params.controller.control,
              getInterpolateFunction: de.getInterpolateFunction.bind(this),
              setTranslate: de.setTranslate.bind(this),
              setTransition: de.setTransition.bind(this),
            },
          });
        },
        on: {
          update: function () {
            this.controller.control &&
              this.controller.spline &&
              ((this.controller.spline = void 0),
              delete this.controller.spline);
          },
          resize: function () {
            this.controller.control &&
              this.controller.spline &&
              ((this.controller.spline = void 0),
              delete this.controller.spline);
          },
          observerUpdate: function () {
            this.controller.control &&
              this.controller.spline &&
              ((this.controller.spline = void 0),
              delete this.controller.spline);
          },
          setTranslate: function (e, t) {
            this.controller.control && this.controller.setTranslate(e, t);
          },
          setTransition: function (e, t) {
            this.controller.control && this.controller.setTransition(e, t);
          },
        },
      },
      {
        name: "a11y",
        params: {
          a11y: {
            enabled: !0,
            notificationClass: "swiper-notification",
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
          },
        },
        create: function () {
          var e = this;
          n.extend(e, {
            a11y: {
              liveRegion: s(
                '<span class="' +
                  e.params.a11y.notificationClass +
                  '" aria-live="assertive" aria-atomic="true"></span>'
              ),
            },
          }),
            Object.keys(he).forEach(function (t) {
              e.a11y[t] = he[t].bind(e);
            });
        },
        on: {
          init: function () {
            this.params.a11y.enabled &&
              (this.a11y.init(), this.a11y.updateNavigation());
          },
          toEdge: function () {
            this.params.a11y.enabled && this.a11y.updateNavigation();
          },
          fromEdge: function () {
            this.params.a11y.enabled && this.a11y.updateNavigation();
          },
          paginationUpdate: function () {
            this.params.a11y.enabled && this.a11y.updatePagination();
          },
          destroy: function () {
            this.params.a11y.enabled && this.a11y.destroy();
          },
        },
      },
      {
        name: "history",
        params: { history: { enabled: !1, replaceState: !1, key: "slides" } },
        create: function () {
          n.extend(this, {
            history: {
              init: pe.init.bind(this),
              setHistory: pe.setHistory.bind(this),
              setHistoryPopState: pe.setHistoryPopState.bind(this),
              scrollToSlide: pe.scrollToSlide.bind(this),
              destroy: pe.destroy.bind(this),
            },
          });
        },
        on: {
          init: function () {
            this.params.history.enabled && this.history.init();
          },
          destroy: function () {
            this.params.history.enabled && this.history.destroy();
          },
          transitionEnd: function () {
            this.history.initialized &&
              this.history.setHistory(
                this.params.history.key,
                this.activeIndex
              );
          },
          slideChange: function () {
            this.history.initialized &&
              this.params.cssMode &&
              this.history.setHistory(
                this.params.history.key,
                this.activeIndex
              );
          },
        },
      },
      {
        name: "hash-navigation",
        params: {
          hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 },
        },
        create: function () {
          n.extend(this, {
            hashNavigation: {
              initialized: !1,
              init: ce.init.bind(this),
              destroy: ce.destroy.bind(this),
              setHash: ce.setHash.bind(this),
              onHashCange: ce.onHashCange.bind(this),
            },
          });
        },
        on: {
          init: function () {
            this.params.hashNavigation.enabled && this.hashNavigation.init();
          },
          destroy: function () {
            this.params.hashNavigation.enabled && this.hashNavigation.destroy();
          },
          transitionEnd: function () {
            this.hashNavigation.initialized && this.hashNavigation.setHash();
          },
          slideChange: function () {
            this.hashNavigation.initialized &&
              this.params.cssMode &&
              this.hashNavigation.setHash();
          },
        },
      },
      {
        name: "autoplay",
        params: {
          autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !0,
            stopOnLastSlide: !1,
            reverseDirection: !1,
          },
        },
        create: function () {
          var e = this;
          n.extend(e, {
            autoplay: {
              running: !1,
              paused: !1,
              run: ue.run.bind(e),
              start: ue.start.bind(e),
              stop: ue.stop.bind(e),
              pause: ue.pause.bind(e),
              onVisibilityChange: function () {
                "hidden" === document.visibilityState &&
                  e.autoplay.running &&
                  e.autoplay.pause(),
                  "visible" === document.visibilityState &&
                    e.autoplay.paused &&
                    (e.autoplay.run(), (e.autoplay.paused = !1));
              },
              onTransitionEnd: function (t) {
                e &&
                  !e.destroyed &&
                  e.$wrapperEl &&
                  t.target === this &&
                  (e.$wrapperEl[0].removeEventListener(
                    "transitionend",
                    e.autoplay.onTransitionEnd
                  ),
                  e.$wrapperEl[0].removeEventListener(
                    "webkitTransitionEnd",
                    e.autoplay.onTransitionEnd
                  ),
                  (e.autoplay.paused = !1),
                  e.autoplay.running ? e.autoplay.run() : e.autoplay.stop());
              },
            },
          });
        },
        on: {
          init: function () {
            this.params.autoplay.enabled &&
              (this.autoplay.start(),
              document.addEventListener(
                "visibilitychange",
                this.autoplay.onVisibilityChange
              ));
          },
          beforeTransitionStart: function (e, t) {
            this.autoplay.running &&
              (t || !this.params.autoplay.disableOnInteraction
                ? this.autoplay.pause(e)
                : this.autoplay.stop());
          },
          sliderFirstMove: function () {
            this.autoplay.running &&
              (this.params.autoplay.disableOnInteraction
                ? this.autoplay.stop()
                : this.autoplay.pause());
          },
          touchEnd: function () {
            this.params.cssMode &&
              this.autoplay.paused &&
              !this.params.autoplay.disableOnInteraction &&
              this.autoplay.run();
          },
          destroy: function () {
            this.autoplay.running && this.autoplay.stop(),
              document.removeEventListener(
                "visibilitychange",
                this.autoplay.onVisibilityChange
              );
          },
        },
      },
      {
        name: "effect-fade",
        params: { fadeEffect: { crossFade: !1 } },
        create: function () {
          n.extend(this, {
            fadeEffect: {
              setTranslate: ve.setTranslate.bind(this),
              setTransition: ve.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            if ("fade" === this.params.effect) {
              this.classNames.push(this.params.containerModifierClass + "fade");
              var e = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !0,
              };
              n.extend(this.params, e), n.extend(this.originalParams, e);
            }
          },
          setTranslate: function () {
            "fade" === this.params.effect && this.fadeEffect.setTranslate();
          },
          setTransition: function (e) {
            "fade" === this.params.effect && this.fadeEffect.setTransition(e);
          },
        },
      },
      {
        name: "effect-cube",
        params: {
          cubeEffect: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: 0.94,
          },
        },
        create: function () {
          n.extend(this, {
            cubeEffect: {
              setTranslate: fe.setTranslate.bind(this),
              setTransition: fe.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            if ("cube" === this.params.effect) {
              this.classNames.push(this.params.containerModifierClass + "cube"),
                this.classNames.push(this.params.containerModifierClass + "3d");
              var e = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: !1,
                virtualTranslate: !0,
              };
              n.extend(this.params, e), n.extend(this.originalParams, e);
            }
          },
          setTranslate: function () {
            "cube" === this.params.effect && this.cubeEffect.setTranslate();
          },
          setTransition: function (e) {
            "cube" === this.params.effect && this.cubeEffect.setTransition(e);
          },
        },
      },
      {
        name: "effect-flip",
        params: { flipEffect: { slideShadows: !0, limitRotation: !0 } },
        create: function () {
          n.extend(this, {
            flipEffect: {
              setTranslate: me.setTranslate.bind(this),
              setTransition: me.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            if ("flip" === this.params.effect) {
              this.classNames.push(this.params.containerModifierClass + "flip"),
                this.classNames.push(this.params.containerModifierClass + "3d");
              var e = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !0,
              };
              n.extend(this.params, e), n.extend(this.originalParams, e);
            }
          },
          setTranslate: function () {
            "flip" === this.params.effect && this.flipEffect.setTranslate();
          },
          setTransition: function (e) {
            "flip" === this.params.effect && this.flipEffect.setTransition(e);
          },
        },
      },
      {
        name: "effect-coverflow",
        params: {
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: !0,
          },
        },
        create: function () {
          n.extend(this, {
            coverflowEffect: {
              setTranslate: ge.setTranslate.bind(this),
              setTransition: ge.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            "coverflow" === this.params.effect &&
              (this.classNames.push(
                this.params.containerModifierClass + "coverflow"
              ),
              this.classNames.push(this.params.containerModifierClass + "3d"),
              (this.params.watchSlidesProgress = !0),
              (this.originalParams.watchSlidesProgress = !0));
          },
          setTranslate: function () {
            "coverflow" === this.params.effect &&
              this.coverflowEffect.setTranslate();
          },
          setTransition: function (e) {
            "coverflow" === this.params.effect &&
              this.coverflowEffect.setTransition(e);
          },
        },
      },
      {
        name: "thumbs",
        params: {
          thumbs: {
            multipleActiveThumbs: !0,
            swiper: null,
            slideThumbActiveClass: "swiper-slide-thumb-active",
            thumbsContainerClass: "swiper-container-thumbs",
          },
        },
        create: function () {
          n.extend(this, {
            thumbs: {
              swiper: null,
              init: be.init.bind(this),
              update: be.update.bind(this),
              onThumbClick: be.onThumbClick.bind(this),
            },
          });
        },
        on: {
          beforeInit: function () {
            var e = this.params.thumbs;
            e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0));
          },
          slideChange: function () {
            this.thumbs.swiper && this.thumbs.update();
          },
          update: function () {
            this.thumbs.swiper && this.thumbs.update();
          },
          resize: function () {
            this.thumbs.swiper && this.thumbs.update();
          },
          observerUpdate: function () {
            this.thumbs.swiper && this.thumbs.update();
          },
          setTransition: function (e) {
            var t = this.thumbs.swiper;
            t && t.setTransition(e);
          },
          beforeDestroy: function () {
            var e = this.thumbs.swiper;
            e && this.thumbs.swiperCreated && e && e.destroy();
          },
        },
      },
    ];
  return (
    void 0 === W.use &&
      ((W.use = W.Class.use), (W.installModule = W.Class.installModule)),
    W.use(we),
    W
  );
});
/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
//# sourceMappingURL=swiper.min.js.map
!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a(
        "object" == typeof exports
          ? require("jquery")
          : window.jQuery || window.Zepto
      );
})(function (a) {
  var b,
    c,
    d,
    e,
    f,
    g,
    h = "Close",
    i = "BeforeClose",
    j = "AfterClose",
    k = "BeforeAppend",
    l = "MarkupParse",
    m = "Open",
    n = "Change",
    o = "mfp",
    p = "." + o,
    q = "mfp-ready",
    r = "mfp-removing",
    s = "mfp-prevent-close",
    t = function () {},
    u = !!window.jQuery,
    v = a(window),
    w = function (a, c) {
      b.ev.on(o + a + p, c);
    },
    x = function (b, c, d, e) {
      var f = document.createElement("div");
      return (
        (f.className = "mfp-" + b),
        d && (f.innerHTML = d),
        e ? c && c.appendChild(f) : ((f = a(f)), c && f.appendTo(c)),
        f
      );
    },
    y = function (c, d) {
      b.ev.triggerHandler(o + c, d),
        b.st.callbacks &&
          ((c = c.charAt(0).toLowerCase() + c.slice(1)),
          b.st.callbacks[c] &&
            b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
    },
    z = function (c) {
      return (
        (c === g && b.currTemplate.closeBtn) ||
          ((b.currTemplate.closeBtn = a(
            b.st.closeMarkup.replace("%title%", b.st.tClose)
          )),
          (g = c)),
        b.currTemplate.closeBtn
      );
    },
    A = function () {
      a.magnificPopup.instance ||
        ((b = new t()), b.init(), (a.magnificPopup.instance = b));
    },
    B = function () {
      var a = document.createElement("p").style,
        b = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== a.transition) return !0;
      for (; b.length; ) if (b.pop() + "Transition" in a) return !0;
      return !1;
    };
  (t.prototype = {
    constructor: t,
    init: function () {
      var c = navigator.appVersion;
      (b.isLowIE = b.isIE8 = document.all && !document.addEventListener),
        (b.isAndroid = /android/gi.test(c)),
        (b.isIOS = /iphone|ipad|ipod/gi.test(c)),
        (b.supportsTransition = B()),
        (b.probablyMobile =
          b.isAndroid ||
          b.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent
          )),
        (d = a(document)),
        (b.popupsCache = {});
    },
    open: function (c) {
      var e;
      if (c.isObj === !1) {
        (b.items = c.items.toArray()), (b.index = 0);
        var g,
          h = c.items;
        for (e = 0; e < h.length; e++)
          if (((g = h[e]), g.parsed && (g = g.el[0]), g === c.el[0])) {
            b.index = e;
            break;
          }
      } else
        (b.items = a.isArray(c.items) ? c.items : [c.items]),
          (b.index = c.index || 0);
      if (b.isOpen) return void b.updateItemHTML();
      (b.types = []),
        (f = ""),
        c.mainEl && c.mainEl.length ? (b.ev = c.mainEl.eq(0)) : (b.ev = d),
        c.key
          ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}),
            (b.currTemplate = b.popupsCache[c.key]))
          : (b.currTemplate = {}),
        (b.st = a.extend(!0, {}, a.magnificPopup.defaults, c)),
        (b.fixedContentPos =
          "auto" === b.st.fixedContentPos
            ? !b.probablyMobile
            : b.st.fixedContentPos),
        b.st.modal &&
          ((b.st.closeOnContentClick = !1),
          (b.st.closeOnBgClick = !1),
          (b.st.showCloseBtn = !1),
          (b.st.enableEscapeKey = !1)),
        b.bgOverlay ||
          ((b.bgOverlay = x("bg").on("click" + p, function () {
            b.close();
          })),
          (b.wrap = x("wrap")
            .attr("tabindex", -1)
            .on("click" + p, function (a) {
              b._checkIfClose(a.target) && b.close();
            })),
          (b.container = x("container", b.wrap))),
        (b.contentContainer = x("content")),
        b.st.preloader &&
          (b.preloader = x("preloader", b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;
      for (e = 0; e < i.length; e++) {
        var j = i[e];
        (j = j.charAt(0).toUpperCase() + j.slice(1)), b["init" + j].call(b);
      }
      y("BeforeOpen"),
        b.st.showCloseBtn &&
          (b.st.closeBtnInside
            ? (w(l, function (a, b, c, d) {
                c.close_replaceWith = z(d.type);
              }),
              (f += " mfp-close-btn-in"))
            : b.wrap.append(z())),
        b.st.alignTop && (f += " mfp-align-top"),
        b.fixedContentPos
          ? b.wrap.css({
              overflow: b.st.overflowY,
              overflowX: "hidden",
              overflowY: b.st.overflowY,
            })
          : b.wrap.css({ top: v.scrollTop(), position: "absolute" }),
        (b.st.fixedBgPos === !1 ||
          ("auto" === b.st.fixedBgPos && !b.fixedContentPos)) &&
          b.bgOverlay.css({ height: d.height(), position: "absolute" }),
        b.st.enableEscapeKey &&
          d.on("keyup" + p, function (a) {
            27 === a.keyCode && b.close();
          }),
        v.on("resize" + p, function () {
          b.updateSize();
        }),
        b.st.closeOnContentClick || (f += " mfp-auto-cursor"),
        f && b.wrap.addClass(f);
      var k = (b.wH = v.height()),
        n = {};
      if (b.fixedContentPos && b._hasScrollBar(k)) {
        var o = b._getScrollbarSize();
        o && (n.marginRight = o);
      }
      b.fixedContentPos &&
        (b.isIE7
          ? a("body, html").css("overflow", "hidden")
          : (n.overflow = "hidden"));
      var r = b.st.mainClass;
      return (
        b.isIE7 && (r += " mfp-ie7"),
        r && b._addClassToMFP(r),
        b.updateItemHTML(),
        y("BuildControls"),
        a("html").css(n),
        b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)),
        (b._lastFocusedEl = document.activeElement),
        setTimeout(function () {
          b.content
            ? (b._addClassToMFP(q), b._setFocus())
            : b.bgOverlay.addClass(q),
            d.on("focusin" + p, b._onFocusIn);
        }, 16),
        (b.isOpen = !0),
        b.updateSize(k),
        y(m),
        c
      );
    },
    close: function () {
      b.isOpen &&
        (y(i),
        (b.isOpen = !1),
        b.st.removalDelay && !b.isLowIE && b.supportsTransition
          ? (b._addClassToMFP(r),
            setTimeout(function () {
              b._close();
            }, b.st.removalDelay))
          : b._close());
    },
    _close: function () {
      y(h);
      var c = r + " " + q + " ";
      if (
        (b.bgOverlay.detach(),
        b.wrap.detach(),
        b.container.empty(),
        b.st.mainClass && (c += b.st.mainClass + " "),
        b._removeClassFromMFP(c),
        b.fixedContentPos)
      ) {
        var e = { marginRight: "" };
        b.isIE7 ? a("body, html").css("overflow", "") : (e.overflow = ""),
          a("html").css(e);
      }
      d.off("keyup" + p + " focusin" + p),
        b.ev.off(p),
        b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
        b.bgOverlay.attr("class", "mfp-bg"),
        b.container.attr("class", "mfp-container"),
        !b.st.showCloseBtn ||
          (b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0) ||
          (b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach()),
        b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(),
        (b.currItem = null),
        (b.content = null),
        (b.currTemplate = null),
        (b.prevHeight = 0),
        y(j);
    },
    updateSize: function (a) {
      if (b.isIOS) {
        var c = document.documentElement.clientWidth / window.innerWidth,
          d = window.innerHeight * c;
        b.wrap.css("height", d), (b.wH = d);
      } else b.wH = a || v.height();
      b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
    },
    updateItemHTML: function () {
      var c = b.items[b.index];
      b.contentContainer.detach(),
        b.content && b.content.detach(),
        c.parsed || (c = b.parseEl(b.index));
      var d = c.type;
      if (
        (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]),
        (b.currItem = c),
        !b.currTemplate[d])
      ) {
        var f = b.st[d] ? b.st[d].markup : !1;
        y("FirstMarkupParse", f),
          f ? (b.currTemplate[d] = a(f)) : (b.currTemplate[d] = !0);
      }
      e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
      var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](
        c,
        b.currTemplate[d]
      );
      b.appendContent(g, d),
        (c.preloaded = !0),
        y(n, c),
        (e = c.type),
        b.container.prepend(b.contentContainer),
        y("AfterChange");
    },
    appendContent: function (a, c) {
      (b.content = a),
        a
          ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0
            ? b.content.find(".mfp-close").length || b.content.append(z())
            : (b.content = a)
          : (b.content = ""),
        y(k),
        b.container.addClass("mfp-" + c + "-holder"),
        b.contentContainer.append(b.content);
    },
    parseEl: function (c) {
      var d,
        e = b.items[c];
      if (
        (e.tagName
          ? (e = { el: a(e) })
          : ((d = e.type), (e = { data: e, src: e.src })),
        e.el)
      ) {
        for (var f = b.types, g = 0; g < f.length; g++)
          if (e.el.hasClass("mfp-" + f[g])) {
            d = f[g];
            break;
          }
        (e.src = e.el.attr("data-mfp-src")),
          e.src || (e.src = e.el.attr("href"));
      }
      return (
        (e.type = d || b.st.type || "inline"),
        (e.index = c),
        (e.parsed = !0),
        (b.items[c] = e),
        y("ElementParse", e),
        b.items[c]
      );
    },
    addGroup: function (a, c) {
      var d = function (d) {
        (d.mfpEl = this), b._openClick(d, a, c);
      };
      c || (c = {});
      var e = "click.magnificPopup";
      (c.mainEl = a),
        c.items
          ? ((c.isObj = !0), a.off(e).on(e, d))
          : ((c.isObj = !1),
            c.delegate
              ? a.off(e).on(e, c.delegate, d)
              : ((c.items = a), a.off(e).on(e, d)));
    },
    _openClick: function (c, d, e) {
      var f =
        void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
      if (
        f ||
        !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)
      ) {
        var g =
          void 0 !== e.disableOn
            ? e.disableOn
            : a.magnificPopup.defaults.disableOn;
        if (g)
          if (a.isFunction(g)) {
            if (!g.call(b)) return !0;
          } else if (v.width() < g) return !0;
        c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()),
          (e.el = a(c.mfpEl)),
          e.delegate && (e.items = d.find(e.delegate)),
          b.open(e);
      }
    },
    updateStatus: function (a, d) {
      if (b.preloader) {
        c !== a && b.container.removeClass("mfp-s-" + c),
          d || "loading" !== a || (d = b.st.tLoading);
        var e = { status: a, text: d };
        y("UpdateStatus", e),
          (a = e.status),
          (d = e.text),
          b.preloader.html(d),
          b.preloader.find("a").on("click", function (a) {
            a.stopImmediatePropagation();
          }),
          b.container.addClass("mfp-s-" + a),
          (c = a);
      }
    },
    _checkIfClose: function (c) {
      if (!a(c).hasClass(s)) {
        var d = b.st.closeOnContentClick,
          e = b.st.closeOnBgClick;
        if (d && e) return !0;
        if (
          !b.content ||
          a(c).hasClass("mfp-close") ||
          (b.preloader && c === b.preloader[0])
        )
          return !0;
        if (c === b.content[0] || a.contains(b.content[0], c)) {
          if (d) return !0;
        } else if (e && a.contains(document, c)) return !0;
        return !1;
      }
    },
    _addClassToMFP: function (a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a);
    },
    _removeClassFromMFP: function (a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
    },
    _hasScrollBar: function (a) {
      return (
        (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
      );
    },
    _setFocus: function () {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
    },
    _onFocusIn: function (c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target)
        ? void 0
        : (b._setFocus(), !1);
    },
    _parseMarkup: function (b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)),
        y(l, [b, c, d]),
        a.each(c, function (c, d) {
          if (void 0 === d || d === !1) return !0;
          if (((e = c.split("_")), e.length > 1)) {
            var f = b.find(p + "-" + e[0]);
            if (f.length > 0) {
              var g = e[1];
              "replaceWith" === g
                ? f[0] !== d[0] && f.replaceWith(d)
                : "img" === g
                ? f.is("img")
                  ? f.attr("src", d)
                  : f.replaceWith(
                      a("<img>").attr("src", d).attr("class", f.attr("class"))
                    )
                : f.attr(e[1], d);
            }
          } else b.find(p + "-" + c).html(d);
        });
    },
    _getScrollbarSize: function () {
      if (void 0 === b.scrollbarSize) {
        var a = document.createElement("div");
        (a.style.cssText =
          "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
          document.body.appendChild(a),
          (b.scrollbarSize = a.offsetWidth - a.clientWidth),
          document.body.removeChild(a);
      }
      return b.scrollbarSize;
    },
  }),
    (a.magnificPopup = {
      instance: null,
      proto: t.prototype,
      modules: [],
      open: function (b, c) {
        return (
          A(),
          (b = b ? a.extend(!0, {}, b) : {}),
          (b.isObj = !0),
          (b.index = c || 0),
          this.instance.open(b)
        );
      },
      close: function () {
        return a.magnificPopup.instance && a.magnificPopup.instance.close();
      },
      registerModule: function (b, c) {
        c.options && (a.magnificPopup.defaults[b] = c.options),
          a.extend(this.proto, c.proto),
          this.modules.push(b);
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: "",
        preloader: !0,
        focus: "",
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: "auto",
        fixedBgPos: "auto",
        overflowY: "auto",
        closeMarkup:
          '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
        tClose: "Close (Esc)",
        tLoading: "Loading...",
        autoFocusLast: !0,
      },
    }),
    (a.fn.magnificPopup = function (c) {
      A();
      var d = a(this);
      if ("string" == typeof c)
        if ("open" === c) {
          var e,
            f = u ? d.data("magnificPopup") : d[0].magnificPopup,
            g = parseInt(arguments[1], 10) || 0;
          f.items
            ? (e = f.items[g])
            : ((e = d), f.delegate && (e = e.find(f.delegate)), (e = e.eq(g))),
            b._openClick({ mfpEl: e }, d, f);
        } else
          b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
      else
        (c = a.extend(!0, {}, c)),
          u ? d.data("magnificPopup", c) : (d[0].magnificPopup = c),
          b.addGroup(d, c);
      return d;
    });
  var C,
    D,
    E,
    F = "inline",
    G = function () {
      E && (D.after(E.addClass(C)).detach(), (E = null));
    };
  a.magnificPopup.registerModule(F, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found",
    },
    proto: {
      initInline: function () {
        b.types.push(F),
          w(h + "." + F, function () {
            G();
          });
      },
      getInline: function (c, d) {
        if ((G(), c.src)) {
          var e = b.st.inline,
            f = a(c.src);
          if (f.length) {
            var g = f[0].parentNode;
            g &&
              g.tagName &&
              (D || ((C = e.hiddenClass), (D = x(C)), (C = "mfp-" + C)),
              (E = f.after(D).detach().removeClass(C))),
              b.updateStatus("ready");
          } else b.updateStatus("error", e.tNotFound), (f = a("<div>"));
          return (c.inlineElement = f), f;
        }
        return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
      },
    },
  });
  var H,
    I = "ajax",
    J = function () {
      H && a(document.body).removeClass(H);
    },
    K = function () {
      J(), b.req && b.req.abort();
    };
  a.magnificPopup.registerModule(I, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.',
    },
    proto: {
      initAjax: function () {
        b.types.push(I),
          (H = b.st.ajax.cursor),
          w(h + "." + I, K),
          w("BeforeChange." + I, K);
      },
      getAjax: function (c) {
        H && a(document.body).addClass(H), b.updateStatus("loading");
        var d = a.extend(
          {
            url: c.src,
            success: function (d, e, f) {
              var g = { data: d, xhr: f };
              y("ParseAjax", g),
                b.appendContent(a(g.data), I),
                (c.finished = !0),
                J(),
                b._setFocus(),
                setTimeout(function () {
                  b.wrap.addClass(q);
                }, 16),
                b.updateStatus("ready"),
                y("AjaxContentAdded");
            },
            error: function () {
              J(),
                (c.finished = c.loadError = !0),
                b.updateStatus(
                  "error",
                  b.st.ajax.tError.replace("%url%", c.src)
                );
            },
          },
          b.st.ajax.settings
        );
        return (b.req = a.ajax(d)), "";
      },
    },
  });
  var L,
    M = function (c) {
      if (c.data && void 0 !== c.data.title) return c.data.title;
      var d = b.st.image.titleSrc;
      if (d) {
        if (a.isFunction(d)) return d.call(b, c);
        if (c.el) return c.el.attr(d) || "";
      }
      return "";
    };
  a.magnificPopup.registerModule("image", {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.',
    },
    proto: {
      initImage: function () {
        var c = b.st.image,
          d = ".image";
        b.types.push("image"),
          w(m + d, function () {
            "image" === b.currItem.type &&
              c.cursor &&
              a(document.body).addClass(c.cursor);
          }),
          w(h + d, function () {
            c.cursor && a(document.body).removeClass(c.cursor),
              v.off("resize" + p);
          }),
          w("Resize" + d, b.resizeImage),
          b.isLowIE && w("AfterChange", b.resizeImage);
      },
      resizeImage: function () {
        var a = b.currItem;
        if (a && a.img && b.st.image.verticalFit) {
          var c = 0;
          b.isLowIE &&
            (c =
              parseInt(a.img.css("padding-top"), 10) +
              parseInt(a.img.css("padding-bottom"), 10)),
            a.img.css("max-height", b.wH - c);
        }
      },
      _onImageHasSize: function (a) {
        a.img &&
          ((a.hasSize = !0),
          L && clearInterval(L),
          (a.isCheckingImgSize = !1),
          y("ImageHasSize", a),
          a.imgHidden &&
            (b.content && b.content.removeClass("mfp-loading"),
            (a.imgHidden = !1)));
      },
      findImageSize: function (a) {
        var c = 0,
          d = a.img[0],
          e = function (f) {
            L && clearInterval(L),
              (L = setInterval(function () {
                return d.naturalWidth > 0
                  ? void b._onImageHasSize(a)
                  : (c > 200 && clearInterval(L),
                    c++,
                    void (3 === c
                      ? e(10)
                      : 40 === c
                      ? e(50)
                      : 100 === c && e(500)));
              }, f));
          };
        e(1);
      },
      getImage: function (c, d) {
        var e = 0,
          f = function () {
            c &&
              (c.img[0].complete
                ? (c.img.off(".mfploader"),
                  c === b.currItem &&
                    (b._onImageHasSize(c), b.updateStatus("ready")),
                  (c.hasSize = !0),
                  (c.loaded = !0),
                  y("ImageLoadComplete"))
                : (e++, 200 > e ? setTimeout(f, 100) : g()));
          },
          g = function () {
            c &&
              (c.img.off(".mfploader"),
              c === b.currItem &&
                (b._onImageHasSize(c),
                b.updateStatus("error", h.tError.replace("%url%", c.src))),
              (c.hasSize = !0),
              (c.loaded = !0),
              (c.loadError = !0));
          },
          h = b.st.image,
          i = d.find(".mfp-img");
        if (i.length) {
          var j = document.createElement("img");
          (j.className = "mfp-img"),
            c.el &&
              c.el.find("img").length &&
              (j.alt = c.el.find("img").attr("alt")),
            (c.img = a(j).on("load.mfploader", f).on("error.mfploader", g)),
            (j.src = c.src),
            i.is("img") && (c.img = c.img.clone()),
            (j = c.img[0]),
            j.naturalWidth > 0 ? (c.hasSize = !0) : j.width || (c.hasSize = !1);
        }
        return (
          b._parseMarkup(d, { title: M(c), img_replaceWith: c.img }, c),
          b.resizeImage(),
          c.hasSize
            ? (L && clearInterval(L),
              c.loadError
                ? (d.addClass("mfp-loading"),
                  b.updateStatus("error", h.tError.replace("%url%", c.src)))
                : (d.removeClass("mfp-loading"), b.updateStatus("ready")),
              d)
            : (b.updateStatus("loading"),
              (c.loading = !0),
              c.hasSize ||
                ((c.imgHidden = !0),
                d.addClass("mfp-loading"),
                b.findImageSize(c)),
              d)
        );
      },
    },
  });
  var N,
    O = function () {
      return (
        void 0 === N &&
          (N = void 0 !== document.createElement("p").style.MozTransform),
        N
      );
    };
  a.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (a) {
        return a.is("img") ? a : a.find("img");
      },
    },
    proto: {
      initZoom: function () {
        var a,
          c = b.st.zoom,
          d = ".zoom";
        if (c.enabled && b.supportsTransition) {
          var e,
            f,
            g = c.duration,
            j = function (a) {
              var b = a
                  .clone()
                  .removeAttr("style")
                  .removeAttr("class")
                  .addClass("mfp-animated-image"),
                d = "all " + c.duration / 1e3 + "s " + c.easing,
                e = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden",
                },
                f = "transition";
              return (
                (e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d),
                b.css(e),
                b
              );
            },
            k = function () {
              b.content.css("visibility", "visible");
            };
          w("BuildControls" + d, function () {
            if (b._allowZoom()) {
              if (
                (clearTimeout(e),
                b.content.css("visibility", "hidden"),
                (a = b._getItemToZoom()),
                !a)
              )
                return void k();
              (f = j(a)),
                f.css(b._getOffset()),
                b.wrap.append(f),
                (e = setTimeout(function () {
                  f.css(b._getOffset(!0)),
                    (e = setTimeout(function () {
                      k(),
                        setTimeout(function () {
                          f.remove(), (a = f = null), y("ZoomAnimationEnded");
                        }, 16);
                    }, g));
                }, 16));
            }
          }),
            w(i + d, function () {
              if (b._allowZoom()) {
                if ((clearTimeout(e), (b.st.removalDelay = g), !a)) {
                  if (((a = b._getItemToZoom()), !a)) return;
                  f = j(a);
                }
                f.css(b._getOffset(!0)),
                  b.wrap.append(f),
                  b.content.css("visibility", "hidden"),
                  setTimeout(function () {
                    f.css(b._getOffset());
                  }, 16);
              }
            }),
            w(h + d, function () {
              b._allowZoom() && (k(), f && f.remove(), (a = null));
            });
        }
      },
      _allowZoom: function () {
        return "image" === b.currItem.type;
      },
      _getItemToZoom: function () {
        return b.currItem.hasSize ? b.currItem.img : !1;
      },
      _getOffset: function (c) {
        var d;
        d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
        var e = d.offset(),
          f = parseInt(d.css("padding-top"), 10),
          g = parseInt(d.css("padding-bottom"), 10);
        e.top -= a(window).scrollTop() - f;
        var h = {
          width: d.width(),
          height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f,
        };
        return (
          O()
            ? (h["-moz-transform"] = h.transform =
                "translate(" + e.left + "px," + e.top + "px)")
            : ((h.left = e.left), (h.top = e.top)),
          h
        );
      },
    },
  });
  var P = "iframe",
    Q = "//about:blank",
    R = function (a) {
      if (b.currTemplate[P]) {
        var c = b.currTemplate[P].find("iframe");
        c.length &&
          (a || (c[0].src = Q),
          b.isIE8 && c.css("display", a ? "block" : "none"));
      }
    };
  a.magnificPopup.registerModule(P, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1",
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
        gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
      },
    },
    proto: {
      initIframe: function () {
        b.types.push(P),
          w("BeforeChange", function (a, b, c) {
            b !== c && (b === P ? R() : c === P && R(!0));
          }),
          w(h + "." + P, function () {
            R();
          });
      },
      getIframe: function (c, d) {
        var e = c.src,
          f = b.st.iframe;
        a.each(f.patterns, function () {
          return e.indexOf(this.index) > -1
            ? (this.id &&
                (e =
                  "string" == typeof this.id
                    ? e.substr(
                        e.lastIndexOf(this.id) + this.id.length,
                        e.length
                      )
                    : this.id.call(this, e)),
              (e = this.src.replace("%id%", e)),
              !1)
            : void 0;
        });
        var g = {};
        return (
          f.srcAction && (g[f.srcAction] = e),
          b._parseMarkup(d, g, c),
          b.updateStatus("ready"),
          d
        );
      },
    },
  });
  var S = function (a) {
      var c = b.items.length;
      return a > c - 1 ? a - c : 0 > a ? c + a : a;
    },
    T = function (a, b, c) {
      return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
    };
  a.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%",
    },
    proto: {
      initGallery: function () {
        var c = b.st.gallery,
          e = ".mfp-gallery";
        return (
          (b.direction = !0),
          c && c.enabled
            ? ((f += " mfp-gallery"),
              w(m + e, function () {
                c.navigateByImgClick &&
                  b.wrap.on("click" + e, ".mfp-img", function () {
                    return b.items.length > 1 ? (b.next(), !1) : void 0;
                  }),
                  d.on("keydown" + e, function (a) {
                    37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
                  });
              }),
              w("UpdateStatus" + e, function (a, c) {
                c.text &&
                  (c.text = T(c.text, b.currItem.index, b.items.length));
              }),
              w(l + e, function (a, d, e, f) {
                var g = b.items.length;
                e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
              }),
              w("BuildControls" + e, function () {
                if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                  var d = c.arrowMarkup,
                    e = (b.arrowLeft = a(
                      d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")
                    ).addClass(s)),
                    f = (b.arrowRight = a(
                      d
                        .replace(/%title%/gi, c.tNext)
                        .replace(/%dir%/gi, "right")
                    ).addClass(s));
                  e.click(function () {
                    b.prev();
                  }),
                    f.click(function () {
                      b.next();
                    }),
                    b.container.append(e.add(f));
                }
              }),
              w(n + e, function () {
                b._preloadTimeout && clearTimeout(b._preloadTimeout),
                  (b._preloadTimeout = setTimeout(function () {
                    b.preloadNearbyImages(), (b._preloadTimeout = null);
                  }, 16));
              }),
              void w(h + e, function () {
                d.off(e),
                  b.wrap.off("click" + e),
                  (b.arrowRight = b.arrowLeft = null);
              }))
            : !1
        );
      },
      next: function () {
        (b.direction = !0), (b.index = S(b.index + 1)), b.updateItemHTML();
      },
      prev: function () {
        (b.direction = !1), (b.index = S(b.index - 1)), b.updateItemHTML();
      },
      goTo: function (a) {
        (b.direction = a >= b.index), (b.index = a), b.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var a,
          c = b.st.gallery.preload,
          d = Math.min(c[0], b.items.length),
          e = Math.min(c[1], b.items.length);
        for (a = 1; a <= (b.direction ? e : d); a++)
          b._preloadItem(b.index + a);
        for (a = 1; a <= (b.direction ? d : e); a++)
          b._preloadItem(b.index - a);
      },
      _preloadItem: function (c) {
        if (((c = S(c)), !b.items[c].preloaded)) {
          var d = b.items[c];
          d.parsed || (d = b.parseEl(c)),
            y("LazyLoad", d),
            "image" === d.type &&
              (d.img = a('<img class="mfp-img" />')
                .on("load.mfploader", function () {
                  d.hasSize = !0;
                })
                .on("error.mfploader", function () {
                  (d.hasSize = !0), (d.loadError = !0), y("LazyLoadError", d);
                })
                .attr("src", d.src)),
            (d.preloaded = !0);
        }
      },
    },
  });
  var U = "retina";
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (a) {
        return a.src.replace(/\.\w+$/, function (a) {
          return "@2x" + a;
        });
      },
      ratio: 1,
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var a = b.st.retina,
            c = a.ratio;
          (c = isNaN(c) ? c() : c),
            c > 1 &&
              (w("ImageHasSize." + U, function (a, b) {
                b.img.css({
                  "max-width": b.img[0].naturalWidth / c,
                  width: "100%",
                });
              }),
              w("ElementParse." + U, function (b, d) {
                d.src = a.replaceSrc(d, c);
              }));
        }
      },
    },
  }),
    A();
}); /*! This file is auto-generated */
window.addComment = (function (s) {
  var u,
    f,
    v,
    y = s.document,
    p = {
      commentReplyClass: "comment-reply-link",
      cancelReplyId: "cancel-comment-reply-link",
      commentFormId: "commentform",
      temporaryFormId: "wp-temp-form-div",
      parentIdFieldId: "comment_parent",
      postIdFieldId: "comment_post_ID",
    },
    e = s.MutationObserver || s.WebKitMutationObserver || s.MozMutationObserver,
    i = "querySelector" in y && "addEventListener" in s,
    n = !!y.documentElement.dataset;
  function t() {
    r(),
      (function () {
        if (!e) return;
        new e(d).observe(y.body, { childList: !0, subtree: !0 });
      })();
  }
  function r(e) {
    if (i && ((u = I(p.cancelReplyId)), (f = I(p.commentFormId)), u)) {
      u.addEventListener("touchstart", a), u.addEventListener("click", a);
      var t = function (e) {
        if ((e.metaKey || e.ctrlKey) && 13 === e.keyCode)
          return (
            f.removeEventListener("keydown", t),
            e.preventDefault(),
            f.submit.click(),
            !1
          );
      };
      f && f.addEventListener("keydown", t);
      for (
        var n,
          r = (function (e) {
            var t,
              n = p.commentReplyClass;
            (e && e.childNodes) || (e = y);
            t = y.getElementsByClassName
              ? e.getElementsByClassName(n)
              : e.querySelectorAll("." + n);
            return t;
          })(e),
          d = 0,
          o = r.length;
        d < o;
        d++
      )
        (n = r[d]).addEventListener("touchstart", l),
          n.addEventListener("click", l);
    }
  }
  function a(e) {
    var t = I(p.temporaryFormId);
    t &&
      v &&
      ((I(p.parentIdFieldId).value = "0"),
      t.parentNode.replaceChild(v, t),
      (this.style.display = "none"),
      e.preventDefault());
  }
  function l(e) {
    var t = this,
      n = m(t, "belowelement"),
      r = m(t, "commentid"),
      d = m(t, "respondelement"),
      o = m(t, "postid");
    n &&
      r &&
      d &&
      o &&
      !1 === s.addComment.moveForm(n, r, d, o) &&
      e.preventDefault();
  }
  function d(e) {
    for (var t = e.length; t--; ) if (e[t].addedNodes.length) return void r();
  }
  function m(e, t) {
    return n ? e.dataset[t] : e.getAttribute("data-" + t);
  }
  function I(e) {
    return y.getElementById(e);
  }
  return (
    i && "loading" !== y.readyState
      ? t()
      : i && s.addEventListener("DOMContentLoaded", t, !1),
    {
      init: r,
      moveForm: function (e, t, n, r) {
        var d = I(e);
        v = I(n);
        var o,
          i,
          a,
          l = I(p.parentIdFieldId),
          m = I(p.postIdFieldId);
        if (d && v && l) {
          !(function (e) {
            var t = p.temporaryFormId,
              n = I(t);
            if (n) return;
            ((n = y.createElement("div")).id = t),
              (n.style.display = "none"),
              e.parentNode.insertBefore(n, e);
          })(v),
            r && m && (m.value = r),
            (l.value = t),
            (u.style.display = ""),
            d.parentNode.insertBefore(v, d.nextSibling),
            (u.onclick = function () {
              return !1;
            });
          try {
            for (var c = 0; c < f.elements.length; c++)
              if (
                ((o = f.elements[c]),
                (i = !1),
                "getComputedStyle" in s
                  ? (a = s.getComputedStyle(o))
                  : y.documentElement.currentStyle && (a = o.currentStyle),
                ((o.offsetWidth <= 0 && o.offsetHeight <= 0) ||
                  "hidden" === a.visibility) &&
                  (i = !0),
                "hidden" !== o.type && !o.disabled && !i)
              ) {
                o.focus();
                break;
              }
          } catch (e) {}
          return !1;
        }
      },
    }
  );
})(window); /*! This file is auto-generated */
!(function (d, l) {
  "use strict";
  var e = !1,
    o = !1;
  if (l.querySelector) if (d.addEventListener) e = !0;
  if (((d.wp = d.wp || {}), !d.wp.receiveEmbedMessage))
    if (
      ((d.wp.receiveEmbedMessage = function (e) {
        var t = e.data;
        if (t)
          if (t.secret || t.message || t.value)
            if (!/[^a-zA-Z0-9]/.test(t.secret)) {
              var r,
                a,
                i,
                s,
                n,
                o = l.querySelectorAll(
                  'iframe[data-secret="' + t.secret + '"]'
                ),
                c = l.querySelectorAll(
                  'blockquote[data-secret="' + t.secret + '"]'
                );
              for (r = 0; r < c.length; r++) c[r].style.display = "none";
              for (r = 0; r < o.length; r++)
                if (((a = o[r]), e.source === a.contentWindow)) {
                  if ((a.removeAttribute("style"), "height" === t.message)) {
                    if (1e3 < (i = parseInt(t.value, 10))) i = 1e3;
                    else if (~~i < 200) i = 200;
                    a.height = i;
                  }
                  if ("link" === t.message)
                    if (
                      ((s = l.createElement("a")),
                      (n = l.createElement("a")),
                      (s.href = a.getAttribute("src")),
                      (n.href = t.value),
                      n.host === s.host)
                    )
                      if (l.activeElement === a) d.top.location.href = t.value;
                }
            }
      }),
      e)
    )
      d.addEventListener("message", d.wp.receiveEmbedMessage, !1),
        l.addEventListener("DOMContentLoaded", t, !1),
        d.addEventListener("load", t, !1);
  function t() {
    if (!o) {
      o = !0;
      var e,
        t,
        r,
        a,
        i = -1 !== navigator.appVersion.indexOf("MSIE 10"),
        s = !!navigator.userAgent.match(/Trident.*rv:11\./),
        n = l.querySelectorAll("iframe.wp-embedded-content");
      for (t = 0; t < n.length; t++) {
        if (!(r = n[t]).getAttribute("data-secret"))
          (a = Math.random().toString(36).substr(2, 10)),
            (r.src += "#?secret=" + a),
            r.setAttribute("data-secret", a);
        if (i || s)
          (e = r.cloneNode(!0)).removeAttribute("security"),
            r.parentNode.replaceChild(e, r);
      }
    }
  }
})(window, document);
/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
!(function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function (h) {
  var s,
    i = 0,
    a = Array.prototype.slice;
  return (
    (h.cleanData =
      ((s = h.cleanData),
      function (t) {
        var e, i, n;
        for (n = 0; null != (i = t[n]); n++)
          try {
            (e = h._data(i, "events")) &&
              e.remove &&
              h(i).triggerHandler("remove");
          } catch (t) {}
        s(t);
      })),
    (h.widget = function (t, i, e) {
      var n,
        s,
        o,
        r,
        a = {},
        u = t.split(".")[0];
      return (
        (t = t.split(".")[1]),
        (n = u + "-" + t),
        e || ((e = i), (i = h.Widget)),
        (h.expr[":"][n.toLowerCase()] = function (t) {
          return !!h.data(t, n);
        }),
        (h[u] = h[u] || {}),
        (s = h[u][t]),
        (o = h[u][t] = function (t, e) {
          if (!this._createWidget) return new o(t, e);
          arguments.length && this._createWidget(t, e);
        }),
        h.extend(o, s, {
          version: e.version,
          _proto: h.extend({}, e),
          _childConstructors: [],
        }),
        ((r = new i()).options = h.widget.extend({}, r.options)),
        h.each(e, function (e, n) {
          function s() {
            return i.prototype[e].apply(this, arguments);
          }
          function o(t) {
            return i.prototype[e].apply(this, t);
          }
          h.isFunction(n)
            ? (a[e] = function () {
                var t,
                  e = this._super,
                  i = this._superApply;
                return (
                  (this._super = s),
                  (this._superApply = o),
                  (t = n.apply(this, arguments)),
                  (this._super = e),
                  (this._superApply = i),
                  t
                );
              })
            : (a[e] = n);
        }),
        (o.prototype = h.widget.extend(
          r,
          { widgetEventPrefix: (s && r.widgetEventPrefix) || t },
          a,
          { constructor: o, namespace: u, widgetName: t, widgetFullName: n }
        )),
        s
          ? (h.each(s._childConstructors, function (t, e) {
              var i = e.prototype;
              h.widget(i.namespace + "." + i.widgetName, o, e._proto);
            }),
            delete s._childConstructors)
          : i._childConstructors.push(o),
        h.widget.bridge(t, o),
        o
      );
    }),
    (h.widget.extend = function (t) {
      for (var e, i, n = a.call(arguments, 1), s = 0, o = n.length; s < o; s++)
        for (e in n[s])
          (i = n[s][e]),
            n[s].hasOwnProperty(e) &&
              void 0 !== i &&
              (h.isPlainObject(i)
                ? (t[e] = h.isPlainObject(t[e])
                    ? h.widget.extend({}, t[e], i)
                    : h.widget.extend({}, i))
                : (t[e] = i));
      return t;
    }),
    (h.widget.bridge = function (o, e) {
      var r = e.prototype.widgetFullName || o;
      h.fn[o] = function (i) {
        var t = "string" == typeof i,
          n = a.call(arguments, 1),
          s = this;
        return (
          t
            ? this.each(function () {
                var t,
                  e = h.data(this, r);
                return "instance" === i
                  ? ((s = e), !1)
                  : e
                  ? h.isFunction(e[i]) && "_" !== i.charAt(0)
                    ? (t = e[i].apply(e, n)) !== e && void 0 !== t
                      ? ((s = t && t.jquery ? s.pushStack(t.get()) : t), !1)
                      : void 0
                    : h.error(
                        "no such method '" +
                          i +
                          "' for " +
                          o +
                          " widget instance"
                      )
                  : h.error(
                      "cannot call methods on " +
                        o +
                        " prior to initialization; attempted to call method '" +
                        i +
                        "'"
                    );
              })
            : (n.length && (i = h.widget.extend.apply(null, [i].concat(n))),
              this.each(function () {
                var t = h.data(this, r);
                t
                  ? (t.option(i || {}), t._init && t._init())
                  : h.data(this, r, new e(i, this));
              })),
          s
        );
      };
    }),
    (h.Widget = function () {}),
    (h.Widget._childConstructors = []),
    (h.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: { disabled: !1, create: null },
      _createWidget: function (t, e) {
        (e = h(e || this.defaultElement || this)[0]),
          (this.element = h(e)),
          (this.uuid = i++),
          (this.eventNamespace = "." + this.widgetName + this.uuid),
          (this.bindings = h()),
          (this.hoverable = h()),
          (this.focusable = h()),
          e !== this &&
            (h.data(e, this.widgetFullName, this),
            this._on(!0, this.element, {
              remove: function (t) {
                t.target === e && this.destroy();
              },
            }),
            (this.document = h(e.style ? e.ownerDocument : e.document || e)),
            (this.window = h(
              this.document[0].defaultView || this.document[0].parentWindow
            ))),
          (this.options = h.widget.extend(
            {},
            this.options,
            this._getCreateOptions(),
            t
          )),
          this._create(),
          this._trigger("create", null, this._getCreateEventData()),
          this._init();
      },
      _getCreateOptions: h.noop,
      _getCreateEventData: h.noop,
      _create: h.noop,
      _init: h.noop,
      destroy: function () {
        this._destroy(),
          this.element
            .unbind(this.eventNamespace)
            .removeData(this.widgetFullName)
            .removeData(h.camelCase(this.widgetFullName)),
          this.widget()
            .unbind(this.eventNamespace)
            .removeAttr("aria-disabled")
            .removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
          this.bindings.unbind(this.eventNamespace),
          this.hoverable.removeClass("ui-state-hover"),
          this.focusable.removeClass("ui-state-focus");
      },
      _destroy: h.noop,
      widget: function () {
        return this.element;
      },
      option: function (t, e) {
        var i,
          n,
          s,
          o = t;
        if (0 === arguments.length) return h.widget.extend({}, this.options);
        if ("string" == typeof t)
          if (((o = {}), (t = (i = t.split(".")).shift()), i.length)) {
            for (
              n = o[t] = h.widget.extend({}, this.options[t]), s = 0;
              s < i.length - 1;
              s++
            )
              (n[i[s]] = n[i[s]] || {}), (n = n[i[s]]);
            if (((t = i.pop()), 1 === arguments.length))
              return void 0 === n[t] ? null : n[t];
            n[t] = e;
          } else {
            if (1 === arguments.length)
              return void 0 === this.options[t] ? null : this.options[t];
            o[t] = e;
          }
        return this._setOptions(o), this;
      },
      _setOptions: function (t) {
        var e;
        for (e in t) this._setOption(e, t[e]);
        return this;
      },
      _setOption: function (t, e) {
        return (
          (this.options[t] = e),
          "disabled" === t &&
            (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e),
            e &&
              (this.hoverable.removeClass("ui-state-hover"),
              this.focusable.removeClass("ui-state-focus"))),
          this
        );
      },
      enable: function () {
        return this._setOptions({ disabled: !1 });
      },
      disable: function () {
        return this._setOptions({ disabled: !0 });
      },
      _on: function (r, a, t) {
        var u,
          d = this;
        "boolean" != typeof r && ((t = a), (a = r), (r = !1)),
          t
            ? ((a = u = h(a)), (this.bindings = this.bindings.add(a)))
            : ((t = a), (a = this.element), (u = this.widget())),
          h.each(t, function (t, e) {
            function i() {
              if (
                r ||
                (!0 !== d.options.disabled &&
                  !h(this).hasClass("ui-state-disabled"))
              )
                return ("string" == typeof e ? d[e] : e).apply(d, arguments);
            }
            "string" != typeof e &&
              (i.guid = e.guid = e.guid || i.guid || h.guid++);
            var n = t.match(/^([\w:-]*)\s*(.*)$/),
              s = n[1] + d.eventNamespace,
              o = n[2];
            o ? u.delegate(o, s, i) : a.bind(s, i);
          });
      },
      _off: function (t, e) {
        (e =
          (e || "").split(" ").join(this.eventNamespace + " ") +
          this.eventNamespace),
          t.unbind(e).undelegate(e),
          (this.bindings = h(this.bindings.not(t).get())),
          (this.focusable = h(this.focusable.not(t).get())),
          (this.hoverable = h(this.hoverable.not(t).get()));
      },
      _delay: function (t, e) {
        var i = this;
        return setTimeout(function () {
          return ("string" == typeof t ? i[t] : t).apply(i, arguments);
        }, e || 0);
      },
      _hoverable: function (t) {
        (this.hoverable = this.hoverable.add(t)),
          this._on(t, {
            mouseenter: function (t) {
              h(t.currentTarget).addClass("ui-state-hover");
            },
            mouseleave: function (t) {
              h(t.currentTarget).removeClass("ui-state-hover");
            },
          });
      },
      _focusable: function (t) {
        (this.focusable = this.focusable.add(t)),
          this._on(t, {
            focusin: function (t) {
              h(t.currentTarget).addClass("ui-state-focus");
            },
            focusout: function (t) {
              h(t.currentTarget).removeClass("ui-state-focus");
            },
          });
      },
      _trigger: function (t, e, i) {
        var n,
          s,
          o = this.options[t];
        if (
          ((i = i || {}),
          ((e = h.Event(e)).type = (t === this.widgetEventPrefix
            ? t
            : this.widgetEventPrefix + t
          ).toLowerCase()),
          (e.target = this.element[0]),
          (s = e.originalEvent))
        )
          for (n in s) n in e || (e[n] = s[n]);
        return (
          this.element.trigger(e, i),
          !(
            (h.isFunction(o) &&
              !1 === o.apply(this.element[0], [e].concat(i))) ||
            e.isDefaultPrevented()
          )
        );
      },
    }),
    h.each({ show: "fadeIn", hide: "fadeOut" }, function (o, r) {
      h.Widget.prototype["_" + o] = function (e, t, i) {
        "string" == typeof t && (t = { effect: t });
        var n,
          s = t ? (!0 === t || "number" == typeof t ? r : t.effect || r) : o;
        "number" == typeof (t = t || {}) && (t = { duration: t }),
          (n = !h.isEmptyObject(t)),
          (t.complete = i),
          t.delay && e.delay(t.delay),
          n && h.effects && h.effects.effect[s]
            ? e[o](t)
            : s !== o && e[s]
            ? e[s](t.duration, t.easing, i)
            : e.queue(function (t) {
                h(this)[o](), i && i.call(e[0]), t();
              });
      };
    }),
    h.widget
  );
});
/*!
 * jQuery UI Accordion 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/accordion/
 */
!(function (e) {
  "function" == typeof define && define.amd
    ? define(["jquery", "./core", "./widget"], e)
    : e(jQuery);
})(function (d) {
  return d.widget("ui.accordion", {
    version: "1.11.4",
    options: {
      active: 0,
      animate: {},
      collapsible: !1,
      event: "click",
      header: "> li > :first-child,> :not(li):even",
      heightStyle: "auto",
      icons: {
        activeHeader: "ui-icon-triangle-1-s",
        header: "ui-icon-triangle-1-e",
      },
      activate: null,
      beforeActivate: null,
    },
    hideProps: {
      borderTopWidth: "hide",
      borderBottomWidth: "hide",
      paddingTop: "hide",
      paddingBottom: "hide",
      height: "hide",
    },
    showProps: {
      borderTopWidth: "show",
      borderBottomWidth: "show",
      paddingTop: "show",
      paddingBottom: "show",
      height: "show",
    },
    _create: function () {
      var e = this.options;
      (this.prevShow = this.prevHide = d()),
        this.element
          .addClass("ui-accordion ui-widget ui-helper-reset")
          .attr("role", "tablist"),
        e.collapsible ||
          (!1 !== e.active && null != e.active) ||
          (e.active = 0),
        this._processPanels(),
        e.active < 0 && (e.active += this.headers.length),
        this._refresh();
    },
    _getCreateEventData: function () {
      return {
        header: this.active,
        panel: this.active.length ? this.active.next() : d(),
      };
    },
    _createIcons: function () {
      var e = this.options.icons;
      e &&
        (d("<span>")
          .addClass("ui-accordion-header-icon ui-icon " + e.header)
          .prependTo(this.headers),
        this.active
          .children(".ui-accordion-header-icon")
          .removeClass(e.header)
          .addClass(e.activeHeader),
        this.headers.addClass("ui-accordion-icons"));
    },
    _destroyIcons: function () {
      this.headers
        .removeClass("ui-accordion-icons")
        .children(".ui-accordion-header-icon")
        .remove();
    },
    _destroy: function () {
      var e;
      this.element
        .removeClass("ui-accordion ui-widget ui-helper-reset")
        .removeAttr("role"),
        this.headers
          .removeClass(
            "ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top"
          )
          .removeAttr("role")
          .removeAttr("aria-expanded")
          .removeAttr("aria-selected")
          .removeAttr("aria-controls")
          .removeAttr("tabIndex")
          .removeUniqueId(),
        this._destroyIcons(),
        (e = this.headers
          .next()
          .removeClass(
            "ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled"
          )
          .css("display", "")
          .removeAttr("role")
          .removeAttr("aria-hidden")
          .removeAttr("aria-labelledby")
          .removeUniqueId()),
        "content" !== this.options.heightStyle && e.css("height", "");
    },
    _setOption: function (e, t) {
      "active" !== e
        ? ("event" === e &&
            (this.options.event && this._off(this.headers, this.options.event),
            this._setupEvents(t)),
          this._super(e, t),
          "collapsible" !== e ||
            t ||
            !1 !== this.options.active ||
            this._activate(0),
          "icons" === e && (this._destroyIcons(), t && this._createIcons()),
          "disabled" === e &&
            (this.element
              .toggleClass("ui-state-disabled", !!t)
              .attr("aria-disabled", t),
            this.headers
              .add(this.headers.next())
              .toggleClass("ui-state-disabled", !!t)))
        : this._activate(t);
    },
    _keydown: function (e) {
      if (!e.altKey && !e.ctrlKey) {
        var t = d.ui.keyCode,
          i = this.headers.length,
          a = this.headers.index(e.target),
          s = !1;
        switch (e.keyCode) {
          case t.RIGHT:
          case t.DOWN:
            s = this.headers[(a + 1) % i];
            break;
          case t.LEFT:
          case t.UP:
            s = this.headers[(a - 1 + i) % i];
            break;
          case t.SPACE:
          case t.ENTER:
            this._eventHandler(e);
            break;
          case t.HOME:
            s = this.headers[0];
            break;
          case t.END:
            s = this.headers[i - 1];
        }
        s &&
          (d(e.target).attr("tabIndex", -1),
          d(s).attr("tabIndex", 0),
          s.focus(),
          e.preventDefault());
      }
    },
    _panelKeyDown: function (e) {
      e.keyCode === d.ui.keyCode.UP &&
        e.ctrlKey &&
        d(e.currentTarget).prev().focus();
    },
    refresh: function () {
      var e = this.options;
      this._processPanels(),
        (!1 === e.active && !0 === e.collapsible) || !this.headers.length
          ? ((e.active = !1), (this.active = d()))
          : !1 === e.active
          ? this._activate(0)
          : this.active.length && !d.contains(this.element[0], this.active[0])
          ? this.headers.length ===
            this.headers.find(".ui-state-disabled").length
            ? ((e.active = !1), (this.active = d()))
            : this._activate(Math.max(0, e.active - 1))
          : (e.active = this.headers.index(this.active)),
        this._destroyIcons(),
        this._refresh();
    },
    _processPanels: function () {
      var e = this.headers,
        t = this.panels;
      (this.headers = this.element
        .find(this.options.header)
        .addClass("ui-accordion-header ui-state-default ui-corner-all")),
        (this.panels = this.headers
          .next()
          .addClass(
            "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"
          )
          .filter(":not(.ui-accordion-content-active)")
          .hide()),
        t && (this._off(e.not(this.headers)), this._off(t.not(this.panels)));
    },
    _refresh: function () {
      var i,
        e = this.options,
        t = e.heightStyle,
        a = this.element.parent();
      (this.active = this._findActive(e.active)
        .addClass("ui-accordion-header-active ui-state-active ui-corner-top")
        .removeClass("ui-corner-all")),
        this.active.next().addClass("ui-accordion-content-active").show(),
        this.headers
          .attr("role", "tab")
          .each(function () {
            var e = d(this),
              t = e.uniqueId().attr("id"),
              i = e.next(),
              a = i.uniqueId().attr("id");
            e.attr("aria-controls", a), i.attr("aria-labelledby", t);
          })
          .next()
          .attr("role", "tabpanel"),
        this.headers
          .not(this.active)
          .attr({
            "aria-selected": "false",
            "aria-expanded": "false",
            tabIndex: -1,
          })
          .next()
          .attr({ "aria-hidden": "true" })
          .hide(),
        this.active.length
          ? this.active
              .attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0,
              })
              .next()
              .attr({ "aria-hidden": "false" })
          : this.headers.eq(0).attr("tabIndex", 0),
        this._createIcons(),
        this._setupEvents(e.event),
        "fill" === t
          ? ((i = a.height()),
            this.element.siblings(":visible").each(function () {
              var e = d(this),
                t = e.css("position");
              "absolute" !== t && "fixed" !== t && (i -= e.outerHeight(!0));
            }),
            this.headers.each(function () {
              i -= d(this).outerHeight(!0);
            }),
            this.headers
              .next()
              .each(function () {
                d(this).height(
                  Math.max(0, i - d(this).innerHeight() + d(this).height())
                );
              })
              .css("overflow", "auto"))
          : "auto" === t &&
            ((i = 0),
            this.headers
              .next()
              .each(function () {
                i = Math.max(i, d(this).css("height", "").height());
              })
              .height(i));
    },
    _activate: function (e) {
      var t = this._findActive(e)[0];
      t !== this.active[0] &&
        ((t = t || this.active[0]),
        this._eventHandler({
          target: t,
          currentTarget: t,
          preventDefault: d.noop,
        }));
    },
    _findActive: function (e) {
      return "number" == typeof e ? this.headers.eq(e) : d();
    },
    _setupEvents: function (e) {
      var i = { keydown: "_keydown" };
      e &&
        d.each(e.split(" "), function (e, t) {
          i[t] = "_eventHandler";
        }),
        this._off(this.headers.add(this.headers.next())),
        this._on(this.headers, i),
        this._on(this.headers.next(), { keydown: "_panelKeyDown" }),
        this._hoverable(this.headers),
        this._focusable(this.headers);
    },
    _eventHandler: function (e) {
      var t = this.options,
        i = this.active,
        a = d(e.currentTarget),
        s = a[0] === i[0],
        n = s && t.collapsible,
        r = n ? d() : a.next(),
        o = i.next(),
        h = { oldHeader: i, oldPanel: o, newHeader: n ? d() : a, newPanel: r };
      e.preventDefault(),
        (s && !t.collapsible) ||
          !1 === this._trigger("beforeActivate", e, h) ||
          ((t.active = !n && this.headers.index(a)),
          (this.active = s ? d() : a),
          this._toggle(h),
          i.removeClass("ui-accordion-header-active ui-state-active"),
          t.icons &&
            i
              .children(".ui-accordion-header-icon")
              .removeClass(t.icons.activeHeader)
              .addClass(t.icons.header),
          s ||
            (a
              .removeClass("ui-corner-all")
              .addClass(
                "ui-accordion-header-active ui-state-active ui-corner-top"
              ),
            t.icons &&
              a
                .children(".ui-accordion-header-icon")
                .removeClass(t.icons.header)
                .addClass(t.icons.activeHeader),
            a.next().addClass("ui-accordion-content-active")));
    },
    _toggle: function (e) {
      var t = e.newPanel,
        i = this.prevShow.length ? this.prevShow : e.oldPanel;
      this.prevShow.add(this.prevHide).stop(!0, !0),
        (this.prevShow = t),
        (this.prevHide = i),
        this.options.animate
          ? this._animate(t, i, e)
          : (i.hide(), t.show(), this._toggleComplete(e)),
        i.attr({ "aria-hidden": "true" }),
        i.prev().attr({ "aria-selected": "false", "aria-expanded": "false" }),
        t.length && i.length
          ? i.prev().attr({ tabIndex: -1, "aria-expanded": "false" })
          : t.length &&
            this.headers
              .filter(function () {
                return 0 === parseInt(d(this).attr("tabIndex"), 10);
              })
              .attr("tabIndex", -1),
        t.attr("aria-hidden", "false").prev().attr({
          "aria-selected": "true",
          "aria-expanded": "true",
          tabIndex: 0,
        });
    },
    _animate: function (e, i, t) {
      function a() {
        o._toggleComplete(t);
      }
      var s,
        n,
        r,
        o = this,
        h = 0,
        d = e.css("box-sizing"),
        c = e.length && (!i.length || e.index() < i.index()),
        l = this.options.animate || {},
        u = (c && l.down) || l;
      return (
        "number" == typeof u && (r = u),
        "string" == typeof u && (n = u),
        (n = n || u.easing || l.easing),
        (r = r || u.duration || l.duration),
        i.length
          ? e.length
            ? ((s = e.show().outerHeight()),
              i.animate(this.hideProps, {
                duration: r,
                easing: n,
                step: function (e, t) {
                  t.now = Math.round(e);
                },
              }),
              void e.hide().animate(this.showProps, {
                duration: r,
                easing: n,
                complete: a,
                step: function (e, t) {
                  (t.now = Math.round(e)),
                    "height" !== t.prop
                      ? "content-box" === d && (h += t.now)
                      : "content" !== o.options.heightStyle &&
                        ((t.now = Math.round(s - i.outerHeight() - h)),
                        (h = 0));
                },
              }))
            : i.animate(this.hideProps, r, n, a)
          : e.animate(this.showProps, r, n, a)
      );
    },
    _toggleComplete: function (e) {
      var t = e.oldPanel;
      t
        .removeClass("ui-accordion-content-active")
        .prev()
        .removeClass("ui-corner-top")
        .addClass("ui-corner-all"),
        t.length && (t.parent()[0].className = t.parent()[0].className),
        this._trigger("activate", null, e);
    },
  });
}); /*! elementor - v2.9.7 - 25-03-2020 */
!(function (t) {
  var e = {};
  function __webpack_require__(n) {
    if (e[n]) return e[n].exports;
    var r = (e[n] = { i: n, l: !1, exports: {} });
    return (
      t[n].call(r.exports, r, r.exports, __webpack_require__),
      (r.l = !0),
      r.exports
    );
  }
  (__webpack_require__.m = t),
    (__webpack_require__.c = e),
    (__webpack_require__.d = function (t, e, n) {
      __webpack_require__.o(t, e) ||
        Object.defineProperty(t, e, { enumerable: !0, get: n });
    }),
    (__webpack_require__.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (__webpack_require__.t = function (t, e) {
      if ((1 & e && (t = __webpack_require__(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (
        (__webpack_require__.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var r in t)
          __webpack_require__.d(
            n,
            r,
            function (e) {
              return t[e];
            }.bind(null, r)
          );
      return n;
    }),
    (__webpack_require__.n = function (t) {
      var e =
        t && t.__esModule
          ? function getDefault() {
              return t.default;
            }
          : function getModuleExports() {
              return t;
            };
      return __webpack_require__.d(e, "a", e), e;
    }),
    (__webpack_require__.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (__webpack_require__.p = ""),
    __webpack_require__((__webpack_require__.s = 743));
})([
  function (t, e) {
    t.exports = function _interopRequireDefault(t) {
      return t && t.__esModule ? t : { default: t };
    };
  },
  function (t, e, n) {
    t.exports = n(137);
  },
  function (t, e) {
    t.exports = function _classCallCheck(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    };
  },
  function (t, e, n) {
    var r = n(1);
    function _defineProperties(t, e) {
      for (var n = 0; n < e.length; n++) {
        var o = e[n];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          "value" in o && (o.writable = !0),
          r(t, o.key, o);
      }
    }
    t.exports = function _createClass(t, e, n) {
      return (
        e && _defineProperties(t.prototype, e), n && _defineProperties(t, n), t
      );
    };
  },
  function (t, e, n) {
    var r = n(153),
      o = n(106);
    function _getPrototypeOf(e) {
      return (
        (t.exports = _getPrototypeOf = o
          ? r
          : function _getPrototypeOf(t) {
              return t.__proto__ || r(t);
            }),
        _getPrototypeOf(e)
      );
    }
    t.exports = _getPrototypeOf;
  },
  function (t, e, n) {
    var r = n(43),
      o = n(47);
    t.exports = function _possibleConstructorReturn(t, e) {
      return !e || ("object" !== r(e) && "function" != typeof e) ? o(t) : e;
    };
  },
  function (t, e, n) {
    var r = n(117),
      o = n(112);
    t.exports = function _inherits(t, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (t.prototype = r(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        e && o(t, e);
    };
  },
  function (t, e) {
    var n = (t.exports = { version: "2.6.9" });
    "number" == typeof __e && (__e = n);
  },
  function (t, e, n) {
    var r = n(9),
      o = n(7),
      i = n(42),
      u = n(26),
      c = n(19),
      s = function (t, e, n) {
        var f,
          a,
          l,
          p = t & s.F,
          v = t & s.G,
          h = t & s.S,
          d = t & s.P,
          g = t & s.B,
          y = t & s.W,
          m = v ? o : o[e] || (o[e] = {}),
          _ = m.prototype,
          x = v ? r : h ? r[e] : (r[e] || {}).prototype;
        for (f in (v && (n = e), n))
          ((a = !p && x && void 0 !== x[f]) && c(m, f)) ||
            ((l = a ? x[f] : n[f]),
            (m[f] =
              v && "function" != typeof x[f]
                ? n[f]
                : g && a
                ? i(l, r)
                : y && x[f] == l
                ? (function (t) {
                    var e = function (e, n, r) {
                      if (this instanceof t) {
                        switch (arguments.length) {
                          case 0:
                            return new t();
                          case 1:
                            return new t(e);
                          case 2:
                            return new t(e, n);
                        }
                        return new t(e, n, r);
                      }
                      return t.apply(this, arguments);
                    };
                    return (e.prototype = t.prototype), e;
                  })(l)
                : d && "function" == typeof l
                ? i(Function.call, l)
                : l),
            d &&
              (((m.virtual || (m.virtual = {}))[f] = l),
              t & s.R && _ && !_[f] && u(_, f, l)));
      };
    (s.F = 1),
      (s.G = 2),
      (s.S = 4),
      (s.P = 8),
      (s.B = 16),
      (s.W = 32),
      (s.U = 64),
      (s.R = 128),
      (t.exports = s);
  },
  function (t, e) {
    var n = (t.exports =
      "undefined" != typeof window && window.Math == Math
        ? window
        : "undefined" != typeof self && self.Math == Math
        ? self
        : Function("return this")());
    "number" == typeof __g && (__g = n);
  },
  function (t, e, n) {
    var r = n(60)("wks"),
      o = n(61),
      i = n(13).Symbol,
      u = "function" == typeof i;
    (t.exports = function (t) {
      return r[t] || (r[t] = (u && i[t]) || (u ? i : o)("Symbol." + t));
    }).store = r;
  },
  function (t, e, n) {
    var r = n(70)("wks"),
      o = n(49),
      i = n(9).Symbol,
      u = "function" == typeof i;
    (t.exports = function (t) {
      return r[t] || (r[t] = (u && i[t]) || (u ? i : o)("Symbol." + t));
    }).store = r;
  },
  function (t, e, n) {
    t.exports = !n(27)(function () {
      return (
        7 !=
        Object.defineProperty({}, "a", {
          get: function () {
            return 7;
          },
        }).a
      );
    });
  },
  function (t, e) {
    var n = (t.exports =
      "undefined" != typeof window && window.Math == Math
        ? window
        : "undefined" != typeof self && self.Math == Math
        ? self
        : Function("return this")());
    "number" == typeof __g && (__g = n);
  },
  function (t, e) {
    t.exports = function (t) {
      return "object" == typeof t ? null !== t : "function" == typeof t;
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(29),
      o = n(113)(5),
      i = !0;
    "find" in [] &&
      Array(1).find(function () {
        i = !1;
      }),
      r(r.P + r.F * i, "Array", {
        find: function find(t) {
          return o(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
      }),
      n(75)("find");
  },
  function (t, e, n) {
    var r = n(14);
    t.exports = function (t) {
      if (!r(t)) throw TypeError(t + " is not an object!");
      return t;
    };
  },
  function (t, e, n) {
    var r = n(16),
      o = n(102),
      i = n(67),
      u = Object.defineProperty;
    e.f = n(12)
      ? Object.defineProperty
      : function defineProperty(t, e, n) {
          if ((r(t), (e = i(e, !0)), r(n), o))
            try {
              return u(t, e, n);
            } catch (t) {}
          if ("get" in n || "set" in n)
            throw TypeError("Accessors not supported!");
          return "value" in n && (t[e] = n.value), t;
        };
  },
  function (t, e, n) {
    var r = n(24);
    t.exports = function (t) {
      if (!r(t)) throw TypeError(t + " is not an object!");
      return t;
    };
  },
  function (t, e) {
    var n = {}.hasOwnProperty;
    t.exports = function (t, e) {
      return n.call(t, e);
    };
  },
  function (t, e, n) {
    var r = n(109),
      o = n(53);
    t.exports = function (t) {
      return r(o(t));
    };
  },
  function (t, e, n) {
    var r = n(129),
      o = n(182),
      i = n(185);
    function _get(e, n, u) {
      return (
        "undefined" != typeof Reflect && o
          ? (t.exports = _get = o)
          : (t.exports = _get = function _get(t, e, n) {
              var o = i(t, e);
              if (o) {
                var u = r(o, e);
                return u.get ? u.get.call(n) : u.value;
              }
            }),
        _get(e, n, u || e)
      );
    }
    t.exports = _get;
  },
  function (t, e, n) {
    t.exports = n(186);
  },
  function (t, e, n) {
    t.exports = !n(25)(function () {
      return (
        7 !=
        Object.defineProperty({}, "a", {
          get: function () {
            return 7;
          },
        }).a
      );
    });
  },
  function (t, e) {
    t.exports = function (t) {
      return "object" == typeof t ? null !== t : "function" == typeof t;
    };
  },
  function (t, e) {
    t.exports = function (t) {
      try {
        return !!t();
      } catch (t) {
        return !0;
      }
    };
  },
  function (t, e, n) {
    var r = n(17),
      o = n(45);
    t.exports = n(12)
      ? function (t, e, n) {
          return r.f(t, e, o(1, n));
        }
      : function (t, e, n) {
          return (t[e] = n), t;
        };
  },
  function (t, e) {
    t.exports = function (t) {
      try {
        return !!t();
      } catch (t) {
        return !0;
      }
    };
  },
  function (t, e, n) {
    var r = n(40),
      o = n(87);
    t.exports = n(23)
      ? function (t, e, n) {
          return r.f(t, e, o(1, n));
        }
      : function (t, e, n) {
          return (t[e] = n), t;
        };
  },
  function (t, e, n) {
    var r = n(13),
      o = n(41),
      i = n(28),
      u = n(31),
      c = n(56),
      s = function (t, e, n) {
        var f,
          a,
          l,
          p,
          v = t & s.F,
          h = t & s.G,
          d = t & s.S,
          g = t & s.P,
          y = t & s.B,
          m = h ? r : d ? r[e] || (r[e] = {}) : (r[e] || {}).prototype,
          _ = h ? o : o[e] || (o[e] = {}),
          x = _.prototype || (_.prototype = {});
        for (f in (h && (n = e), n))
          (l = ((a = !v && m && void 0 !== m[f]) ? m : n)[f]),
            (p =
              y && a
                ? c(l, r)
                : g && "function" == typeof l
                ? c(Function.call, l)
                : l),
            m && u(m, f, l, t & s.U),
            _[f] != l && i(_, f, p),
            g && x[f] != l && (x[f] = l);
      };
    (r.core = o),
      (s.F = 1),
      (s.G = 2),
      (s.S = 4),
      (s.P = 8),
      (s.B = 16),
      (s.W = 32),
      (s.U = 64),
      (s.R = 128),
      (t.exports = s);
  },
  function (t, e, n) {
    var r = n(40).f,
      o = Function.prototype,
      i = /^\s*function ([^ (]*)/;
    "name" in o ||
      (n(23) &&
        r(o, "name", {
          configurable: !0,
          get: function () {
            try {
              return ("" + this).match(i)[1];
            } catch (t) {
              return "";
            }
          },
        }));
  },
  function (t, e, n) {
    var r = n(13),
      o = n(28),
      i = n(51),
      u = n(61)("src"),
      c = n(119),
      s = ("" + c).split("toString");
    (n(41).inspectSource = function (t) {
      return c.call(t);
    }),
      (t.exports = function (t, e, n, c) {
        var f = "function" == typeof n;
        f && (i(n, "name") || o(n, "name", e)),
          t[e] !== n &&
            (f && (i(n, u) || o(n, u, t[e] ? "" + t[e] : s.join(String(e)))),
            t === r
              ? (t[e] = n)
              : c
              ? t[e]
                ? (t[e] = n)
                : o(t, e, n)
              : (delete t[e], o(t, e, n)));
      })(Function.prototype, "toString", function toString() {
        return ("function" == typeof this && this[u]) || c.call(this);
      });
  },
  ,
  function (t, e) {
    t.exports = function (t) {
      if (null == t) throw TypeError("Can't call method on  " + t);
      return t;
    };
  },
  function (t, e) {
    var n = {}.toString;
    t.exports = function (t) {
      return n.call(t).slice(8, -1);
    };
  },
  function (t, e, n) {
    var r = n(104),
      o = n(71);
    t.exports =
      Object.keys ||
      function keys(t) {
        return r(t, o);
      };
  },
  ,
  function (t, e, n) {
    var r = n(48),
      o = Math.min;
    t.exports = function (t) {
      return t > 0 ? o(r(t), 9007199254740991) : 0;
    };
  },
  function (t, e) {
    t.exports = {};
  },
  function (t, e, n) {
    var r = n(53);
    t.exports = function (t) {
      return Object(r(t));
    };
  },
  function (t, e, n) {
    var r = n(18),
      o = n(108),
      i = n(99),
      u = Object.defineProperty;
    e.f = n(23)
      ? Object.defineProperty
      : function defineProperty(t, e, n) {
          if ((r(t), (e = i(e, !0)), r(n), o))
            try {
              return u(t, e, n);
            } catch (t) {}
          if ("get" in n || "set" in n)
            throw TypeError("Accessors not supported!");
          return "value" in n && (t[e] = n.value), t;
        };
  },
  function (t, e) {
    var n = (t.exports = { version: "2.6.10" });
    "number" == typeof __e && (__e = n);
  },
  function (t, e, n) {
    var r = n(66);
    t.exports = function (t, e, n) {
      if ((r(t), void 0 === e)) return t;
      switch (n) {
        case 1:
          return function (n) {
            return t.call(e, n);
          };
        case 2:
          return function (n, r) {
            return t.call(e, n, r);
          };
        case 3:
          return function (n, r, o) {
            return t.call(e, n, r, o);
          };
      }
      return function () {
        return t.apply(e, arguments);
      };
    };
  },
  function (t, e, n) {
    var r = n(139),
      o = n(147);
    function _typeof2(t) {
      return (_typeof2 =
        "function" == typeof o && "symbol" == typeof r
          ? function _typeof2(t) {
              return typeof t;
            }
          : function _typeof2(t) {
              return t &&
                "function" == typeof o &&
                t.constructor === o &&
                t !== o.prototype
                ? "symbol"
                : typeof t;
            })(t);
    }
    function _typeof(e) {
      return (
        "function" == typeof o && "symbol" === _typeof2(r)
          ? (t.exports = _typeof = function _typeof(t) {
              return _typeof2(t);
            })
          : (t.exports = _typeof = function _typeof(t) {
              return t &&
                "function" == typeof o &&
                t.constructor === o &&
                t !== o.prototype
                ? "symbol"
                : _typeof2(t);
            }),
        _typeof(e)
      );
    }
    t.exports = _typeof;
  },
  function (t, e) {
    t.exports = !0;
  },
  function (t, e) {
    t.exports = function (t, e) {
      return {
        enumerable: !(1 & t),
        configurable: !(2 & t),
        writable: !(4 & t),
        value: e,
      };
    };
  },
  function (t, e) {
    e.f = {}.propertyIsEnumerable;
  },
  function (t, e) {
    t.exports = function _assertThisInitialized(t) {
      if (void 0 === t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return t;
    };
  },
  function (t, e) {
    var n = Math.ceil,
      r = Math.floor;
    t.exports = function (t) {
      return isNaN((t = +t)) ? 0 : (t > 0 ? r : n)(t);
    };
  },
  function (t, e) {
    var n = 0,
      r = Math.random();
    t.exports = function (t) {
      return "Symbol(".concat(
        void 0 === t ? "" : t,
        ")_",
        (++n + r).toString(36)
      );
    };
  },
  ,
  function (t, e) {
    var n = {}.hasOwnProperty;
    t.exports = function (t, e) {
      return n.call(t, e);
    };
  },
  function (t, e, n) {
    var r = n(46),
      o = n(45),
      i = n(20),
      u = n(67),
      c = n(19),
      s = n(102),
      f = Object.getOwnPropertyDescriptor;
    e.f = n(12)
      ? f
      : function getOwnPropertyDescriptor(t, e) {
          if (((t = i(t)), (e = u(e, !0)), s))
            try {
              return f(t, e);
            } catch (t) {}
          if (c(t, e)) return o(!r.f.call(t, e), t[e]);
        };
  },
  function (t, e) {
    t.exports = function (t) {
      if (null == t) throw TypeError("Can't call method on  " + t);
      return t;
    };
  },
  function (t, e, n) {
    var r = n(16),
      o = n(122),
      i = n(71),
      u = n(69)("IE_PROTO"),
      c = function () {},
      s = function () {
        var t,
          e = n(88)("iframe"),
          r = i.length;
        for (
          e.style.display = "none",
            n(123).appendChild(e),
            e.src = "javascript:",
            (t = e.contentWindow.document).open(),
            t.write("<script>document.F=Object</script>"),
            t.close(),
            s = t.F;
          r--;

        )
          delete s.prototype[i[r]];
        return s();
      };
    t.exports =
      Object.create ||
      function create(t, e) {
        var n;
        return (
          null !== t
            ? ((c.prototype = r(t)),
              (n = new c()),
              (c.prototype = null),
              (n[u] = t))
            : (n = s()),
          void 0 === e ? n : o(n, e)
        );
      };
  },
  function (t, e, n) {
    var r = n(17).f,
      o = n(19),
      i = n(11)("toStringTag");
    t.exports = function (t, e, n) {
      t &&
        !o((t = n ? t : t.prototype), i) &&
        r(t, i, { configurable: !0, value: e });
    };
  },
  function (t, e, n) {
    var r = n(62);
    t.exports = function (t, e, n) {
      if ((r(t), void 0 === e)) return t;
      switch (n) {
        case 1:
          return function (n) {
            return t.call(e, n);
          };
        case 2:
          return function (n, r) {
            return t.call(e, n, r);
          };
        case 3:
          return function (n, r, o) {
            return t.call(e, n, r, o);
          };
      }
      return function () {
        return t.apply(e, arguments);
      };
    };
  },
  function (t, e) {
    var n = {}.toString;
    t.exports = function (t) {
      return n.call(t).slice(8, -1);
    };
  },
  ,
  ,
  function (t, e, n) {
    var r = n(41),
      o = n(13),
      i = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});
    (t.exports = function (t, e) {
      return i[t] || (i[t] = void 0 !== e ? e : {});
    })("versions", []).push({
      version: r.version,
      mode: n(94) ? "pure" : "global",
      copyright: "© 2019 Denis Pushkarev (zloirock.ru)",
    });
  },
  function (t, e) {
    var n = 0,
      r = Math.random();
    t.exports = function (t) {
      return "Symbol(".concat(
        void 0 === t ? "" : t,
        ")_",
        (++n + r).toString(36)
      );
    };
  },
  function (t, e) {
    t.exports = function (t) {
      if ("function" != typeof t) throw TypeError(t + " is not a function!");
      return t;
    };
  },
  ,
  function (t, e, n) {
    var r = n(33);
    t.exports = function (t) {
      return Object(r(t));
    };
  },
  ,
  function (t, e) {
    t.exports = function (t) {
      if ("function" != typeof t) throw TypeError(t + " is not a function!");
      return t;
    };
  },
  function (t, e, n) {
    var r = n(14);
    t.exports = function (t, e) {
      if (!r(t)) return t;
      var n, o;
      if (e && "function" == typeof (n = t.toString) && !r((o = n.call(t))))
        return o;
      if ("function" == typeof (n = t.valueOf) && !r((o = n.call(t)))) return o;
      if (!e && "function" == typeof (n = t.toString) && !r((o = n.call(t))))
        return o;
      throw TypeError("Can't convert object to primitive value");
    };
  },
  function (t, e) {
    var n = Math.ceil,
      r = Math.floor;
    t.exports = function (t) {
      return isNaN((t = +t)) ? 0 : (t > 0 ? r : n)(t);
    };
  },
  function (t, e, n) {
    var r = n(70)("keys"),
      o = n(49);
    t.exports = function (t) {
      return r[t] || (r[t] = o(t));
    };
  },
  function (t, e, n) {
    var r = n(7),
      o = n(9),
      i = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});
    (t.exports = function (t, e) {
      return i[t] || (i[t] = void 0 !== e ? e : {});
    })("versions", []).push({
      version: r.version,
      mode: n(44) ? "pure" : "global",
      copyright: "© 2019 Denis Pushkarev (zloirock.ru)",
    });
  },
  function (t, e) {
    t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
      ","
    );
  },
  function (t, e, n) {
    e.f = n(11);
  },
  function (t, e, n) {
    var r = n(9),
      o = n(7),
      i = n(44),
      u = n(72),
      c = n(17).f;
    t.exports = function (t) {
      var e = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});
      "_" == t.charAt(0) || t in e || c(e, t, { value: u.f(t) });
    };
  },
  ,
  function (t, e, n) {
    var r = n(10)("unscopables"),
      o = Array.prototype;
    null == o[r] && n(28)(o, r, {}),
      (t.exports = function (t) {
        o[r][t] = !0;
      });
  },
  function (t, e, n) {
    "use strict";
    var r = n(114),
      o = n(18),
      i = n(133),
      u = n(100),
      c = n(37),
      s = n(85),
      f = n(80),
      a = n(25),
      l = Math.min,
      p = [].push,
      v = !a(function () {
        RegExp(4294967295, "y");
      });
    n(86)("split", 2, function (t, e, n, a) {
      var h;
      return (
        (h =
          "c" == "abbc".split(/(b)*/)[1] ||
          4 != "test".split(/(?:)/, -1).length ||
          2 != "ab".split(/(?:ab)*/).length ||
          4 != ".".split(/(.?)(.?)/).length ||
          ".".split(/()()/).length > 1 ||
          "".split(/.?/).length
            ? function (t, e) {
                var o = String(this);
                if (void 0 === t && 0 === e) return [];
                if (!r(t)) return n.call(o, t, e);
                for (
                  var i,
                    u,
                    c,
                    s = [],
                    a =
                      (t.ignoreCase ? "i" : "") +
                      (t.multiline ? "m" : "") +
                      (t.unicode ? "u" : "") +
                      (t.sticky ? "y" : ""),
                    l = 0,
                    v = void 0 === e ? 4294967295 : e >>> 0,
                    h = new RegExp(t.source, a + "g");
                  (i = f.call(h, o)) &&
                  !(
                    (u = h.lastIndex) > l &&
                    (s.push(o.slice(l, i.index)),
                    i.length > 1 &&
                      i.index < o.length &&
                      p.apply(s, i.slice(1)),
                    (c = i[0].length),
                    (l = u),
                    s.length >= v)
                  );

                )
                  h.lastIndex === i.index && h.lastIndex++;
                return (
                  l === o.length
                    ? (!c && h.test("")) || s.push("")
                    : s.push(o.slice(l)),
                  s.length > v ? s.slice(0, v) : s
                );
              }
            : "0".split(void 0, 0).length
            ? function (t, e) {
                return void 0 === t && 0 === e ? [] : n.call(this, t, e);
              }
            : n),
        [
          function split(n, r) {
            var o = t(this),
              i = null == n ? void 0 : n[e];
            return void 0 !== i ? i.call(n, o, r) : h.call(String(o), n, r);
          },
          function (t, e) {
            var r = a(h, t, this, e, h !== n);
            if (r.done) return r.value;
            var f = o(t),
              p = String(this),
              d = i(f, RegExp),
              g = f.unicode,
              y =
                (f.ignoreCase ? "i" : "") +
                (f.multiline ? "m" : "") +
                (f.unicode ? "u" : "") +
                (v ? "y" : "g"),
              m = new d(v ? f : "^(?:" + f.source + ")", y),
              _ = void 0 === e ? 4294967295 : e >>> 0;
            if (0 === _) return [];
            if (0 === p.length) return null === s(m, p) ? [p] : [];
            for (var x = 0, b = 0, S = []; b < p.length; ) {
              m.lastIndex = v ? b : 0;
              var w,
                O = s(m, v ? p : p.slice(b));
              if (
                null === O ||
                (w = l(c(m.lastIndex + (v ? 0 : b)), p.length)) === x
              )
                b = u(p, b, g);
              else {
                if ((S.push(p.slice(x, b)), S.length === _)) return S;
                for (var E = 1; E <= O.length - 1; E++)
                  if ((S.push(O[E]), S.length === _)) return S;
                b = x = w;
              }
            }
            return S.push(p.slice(x)), S;
          },
        ]
      );
    });
  },
  function (t, e, n) {
    "use strict";
    var r = n(141)(!0);
    n(89)(
      String,
      "String",
      function (t) {
        (this._t = String(t)), (this._i = 0);
      },
      function () {
        var t,
          e = this._t,
          n = this._i;
        return n >= e.length
          ? { value: void 0, done: !0 }
          : ((t = r(e, n)), (this._i += t.length), { value: t, done: !1 });
      }
    );
  },
  function (t, e, n) {
    var r = n(19),
      o = n(39),
      i = n(69)("IE_PROTO"),
      u = Object.prototype;
    t.exports =
      Object.getPrototypeOf ||
      function (t) {
        return (
          (t = o(t)),
          r(t, i)
            ? t[i]
            : "function" == typeof t.constructor && t instanceof t.constructor
            ? t.constructor.prototype
            : t instanceof Object
            ? u
            : null
        );
      };
  },
  function (t, e) {
    e.f = Object.getOwnPropertySymbols;
  },
  function (t, e, n) {
    "use strict";
    var r,
      o,
      i = n(101),
      u = RegExp.prototype.exec,
      c = String.prototype.replace,
      s = u,
      f =
        ((r = /a/),
        (o = /b*/g),
        u.call(r, "a"),
        u.call(o, "a"),
        0 !== r.lastIndex || 0 !== o.lastIndex),
      a = void 0 !== /()??/.exec("")[1];
    (f || a) &&
      (s = function exec(t) {
        var e,
          n,
          r,
          o,
          s = this;
        return (
          a && (n = new RegExp("^" + s.source + "$(?!\\s)", i.call(s))),
          f && (e = s.lastIndex),
          (r = u.call(s, t)),
          f && r && (s.lastIndex = s.global ? r.index + r[0].length : e),
          a &&
            r &&
            r.length > 1 &&
            c.call(r[0], n, function () {
              for (o = 1; o < arguments.length - 2; o++)
                void 0 === arguments[o] && (r[o] = void 0);
            }),
          r
        );
      }),
      (t.exports = s);
  },
  function (t, e, n) {
    n(145);
    for (
      var r = n(9),
        o = n(26),
        i = n(38),
        u = n(11)("toStringTag"),
        c = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(
          ","
        ),
        s = 0;
      s < c.length;
      s++
    ) {
      var f = c[s],
        a = r[f],
        l = a && a.prototype;
      l && !l[u] && o(l, u, f), (i[f] = i.Array);
    }
  },
  function (t, e, n) {
    var r = n(8),
      o = n(7),
      i = n(27);
    t.exports = function (t, e) {
      var n = (o.Object || {})[t] || Object[t],
        u = {};
      (u[t] = e(n)),
        r(
          r.S +
            r.F *
              i(function () {
                n(1);
              }),
          "Object",
          u
        );
    };
  },
  ,
  ,
  function (t, e, n) {
    "use strict";
    var r = n(98),
      o = RegExp.prototype.exec;
    t.exports = function (t, e) {
      var n = t.exec;
      if ("function" == typeof n) {
        var i = n.call(t, e);
        if ("object" != typeof i)
          throw new TypeError(
            "RegExp exec method returned something other than an Object or null"
          );
        return i;
      }
      if ("RegExp" !== r(t))
        throw new TypeError("RegExp#exec called on incompatible receiver");
      return o.call(t, e);
    };
  },
  function (t, e, n) {
    "use strict";
    n(169);
    var r = n(31),
      o = n(28),
      i = n(25),
      u = n(33),
      c = n(10),
      s = n(80),
      f = c("species"),
      a = !i(function () {
        var t = /./;
        return (
          (t.exec = function () {
            var t = [];
            return (t.groups = { a: "7" }), t;
          }),
          "7" !== "".replace(t, "$<a>")
        );
      }),
      l = (function () {
        var t = /(?:)/,
          e = t.exec;
        t.exec = function () {
          return e.apply(this, arguments);
        };
        var n = "ab".split(t);
        return 2 === n.length && "a" === n[0] && "b" === n[1];
      })();
    t.exports = function (t, e, n) {
      var p = c(t),
        v = !i(function () {
          var e = {};
          return (
            (e[p] = function () {
              return 7;
            }),
            7 != ""[t](e)
          );
        }),
        h = v
          ? !i(function () {
              var e = !1,
                n = /a/;
              return (
                (n.exec = function () {
                  return (e = !0), null;
                }),
                "split" === t &&
                  ((n.constructor = {}),
                  (n.constructor[f] = function () {
                    return n;
                  })),
                n[p](""),
                !e
              );
            })
          : void 0;
      if (!v || !h || ("replace" === t && !a) || ("split" === t && !l)) {
        var d = /./[p],
          g = n(u, p, ""[t], function maybeCallNative(t, e, n, r, o) {
            return e.exec === s
              ? v && !o
                ? { done: !0, value: d.call(e, n, r) }
                : { done: !0, value: t.call(n, e, r) }
              : { done: !1 };
          }),
          y = g[0],
          m = g[1];
        r(String.prototype, t, y),
          o(
            RegExp.prototype,
            p,
            2 == e
              ? function (t, e) {
                  return m.call(t, this, e);
                }
              : function (t) {
                  return m.call(t, this);
                }
          );
      }
    };
  },
  function (t, e) {
    t.exports = function (t, e) {
      return {
        enumerable: !(1 & t),
        configurable: !(2 & t),
        writable: !(4 & t),
        value: e,
      };
    };
  },
  function (t, e, n) {
    var r = n(14),
      o = n(9).document,
      i = r(o) && r(o.createElement);
    t.exports = function (t) {
      return i ? o.createElement(t) : {};
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(44),
      o = n(8),
      i = n(103),
      u = n(26),
      c = n(38),
      s = n(142),
      f = n(55),
      a = n(78),
      l = n(11)("iterator"),
      p = !([].keys && "next" in [].keys()),
      v = function () {
        return this;
      };
    t.exports = function (t, e, n, h, d, g, y) {
      s(n, e, h);
      var m,
        _,
        x,
        b = function (t) {
          if (!p && t in E) return E[t];
          switch (t) {
            case "keys":
              return function keys() {
                return new n(this, t);
              };
            case "values":
              return function values() {
                return new n(this, t);
              };
          }
          return function entries() {
            return new n(this, t);
          };
        },
        S = e + " Iterator",
        w = "values" == d,
        O = !1,
        E = t.prototype,
        j = E[l] || E["@@iterator"] || (d && E[d]),
        P = j || b(d),
        k = d ? (w ? b("entries") : P) : void 0,
        M = ("Array" == e && E.entries) || j;
      if (
        (M &&
          (x = a(M.call(new t()))) !== Object.prototype &&
          x.next &&
          (f(x, S, !0), r || "function" == typeof x[l] || u(x, l, v)),
        w &&
          j &&
          "values" !== j.name &&
          ((O = !0),
          (P = function values() {
            return j.call(this);
          })),
        (r && !y) || (!p && !O && E[l]) || u(E, l, P),
        (c[e] = P),
        (c[S] = v),
        d)
      )
        if (
          ((m = {
            values: w ? P : b("values"),
            keys: g ? P : b("keys"),
            entries: k,
          }),
          y)
        )
          for (_ in m) _ in E || i(E, _, m[_]);
        else o(o.P + o.F * (p || O), e, m);
      return m;
    };
  },
  function (t, e, n) {
    var r = n(97),
      o = n(33);
    t.exports = function (t) {
      return r(o(t));
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(98),
      o = {};
    (o[n(10)("toStringTag")] = "z"),
      o + "" != "[object z]" &&
        n(31)(
          Object.prototype,
          "toString",
          function toString() {
            return "[object " + r(this) + "]";
          },
          !0
        );
  },
  function (t, e, n) {
    var r = n(24),
      o = n(13).document,
      i = r(o) && r(o.createElement);
    t.exports = function (t) {
      return i ? o.createElement(t) : {};
    };
  },
  ,
  function (t, e) {
    t.exports = !1;
  },
  function (t, e, n) {
    var r = n(68),
      o = Math.min;
    t.exports = function (t) {
      return t > 0 ? o(r(t), 9007199254740991) : 0;
    };
  },
  function (t, e, n) {
    var r = n(104),
      o = n(71).concat("length", "prototype");
    e.f =
      Object.getOwnPropertyNames ||
      function getOwnPropertyNames(t) {
        return r(t, o);
      };
  },
  function (t, e, n) {
    var r = n(34);
    t.exports = Object("z").propertyIsEnumerable(0)
      ? Object
      : function (t) {
          return "String" == r(t) ? t.split("") : Object(t);
        };
  },
  function (t, e, n) {
    var r = n(34),
      o = n(10)("toStringTag"),
      i =
        "Arguments" ==
        r(
          (function () {
            return arguments;
          })()
        );
    t.exports = function (t) {
      var e, n, u;
      return void 0 === t
        ? "Undefined"
        : null === t
        ? "Null"
        : "string" ==
          typeof (n = (function (t, e) {
            try {
              return t[e];
            } catch (t) {}
          })((e = Object(t)), o))
        ? n
        : i
        ? r(e)
        : "Object" == (u = r(e)) && "function" == typeof e.callee
        ? "Arguments"
        : u;
    };
  },
  function (t, e, n) {
    var r = n(24);
    t.exports = function (t, e) {
      if (!r(t)) return t;
      var n, o;
      if (e && "function" == typeof (n = t.toString) && !r((o = n.call(t))))
        return o;
      if ("function" == typeof (n = t.valueOf) && !r((o = n.call(t)))) return o;
      if (!e && "function" == typeof (n = t.toString) && !r((o = n.call(t))))
        return o;
      throw TypeError("Can't convert object to primitive value");
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(168)(!0);
    t.exports = function (t, e, n) {
      return e + (n ? r(t, e).length : 1);
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(18);
    t.exports = function () {
      var t = r(this),
        e = "";
      return (
        t.global && (e += "g"),
        t.ignoreCase && (e += "i"),
        t.multiline && (e += "m"),
        t.unicode && (e += "u"),
        t.sticky && (e += "y"),
        e
      );
    };
  },
  function (t, e, n) {
    t.exports =
      !n(12) &&
      !n(27)(function () {
        return (
          7 !=
          Object.defineProperty(n(88)("div"), "a", {
            get: function () {
              return 7;
            },
          }).a
        );
      });
  },
  function (t, e, n) {
    t.exports = n(26);
  },
  function (t, e, n) {
    var r = n(19),
      o = n(20),
      i = n(143)(!1),
      u = n(69)("IE_PROTO");
    t.exports = function (t, e) {
      var n,
        c = o(t),
        s = 0,
        f = [];
      for (n in c) n != u && r(c, n) && f.push(n);
      for (; e.length > s; ) r(c, (n = e[s++])) && (~i(f, n) || f.push(n));
      return f;
    };
  },
  function (t, e, n) {
    var r = n(57);
    t.exports =
      Array.isArray ||
      function isArray(t) {
        return "Array" == r(t);
      };
  },
  function (t, e, n) {
    t.exports = n(156);
  },
  ,
  function (t, e, n) {
    t.exports =
      !n(23) &&
      !n(25)(function () {
        return (
          7 !=
          Object.defineProperty(n(92)("div"), "a", {
            get: function () {
              return 7;
            },
          }).a
        );
      });
  },
  function (t, e, n) {
    var r = n(57);
    t.exports = Object("z").propertyIsEnumerable(0)
      ? Object
      : function (t) {
          return "String" == r(t) ? t.split("") : Object(t);
        };
  },
  function (t, e, n) {
    var r = n(49)("meta"),
      o = n(14),
      i = n(19),
      u = n(17).f,
      c = 0,
      s =
        Object.isExtensible ||
        function () {
          return !0;
        },
      f = !n(27)(function () {
        return s(Object.preventExtensions({}));
      }),
      a = function (t) {
        u(t, r, { value: { i: "O" + ++c, w: {} } });
      },
      l = (t.exports = {
        KEY: r,
        NEED: !1,
        fastKey: function (t, e) {
          if (!o(t))
            return "symbol" == typeof t
              ? t
              : ("string" == typeof t ? "S" : "P") + t;
          if (!i(t, r)) {
            if (!s(t)) return "F";
            if (!e) return "E";
            a(t);
          }
          return t[r].i;
        },
        getWeak: function (t, e) {
          if (!i(t, r)) {
            if (!s(t)) return !0;
            if (!e) return !1;
            a(t);
          }
          return t[r].w;
        },
        onFreeze: function (t) {
          return f && l.NEED && s(t) && !i(t, r) && a(t), t;
        },
      });
  },
  function (t, e) {},
  function (t, e, n) {
    var r = n(106);
    function _setPrototypeOf(e, n) {
      return (
        (t.exports = _setPrototypeOf =
          r ||
          function _setPrototypeOf(t, e) {
            return (t.__proto__ = e), t;
          }),
        _setPrototypeOf(e, n)
      );
    }
    t.exports = _setPrototypeOf;
  },
  function (t, e, n) {
    var r = n(56),
      o = n(97),
      i = n(64),
      u = n(37),
      c = n(130);
    t.exports = function (t, e) {
      var n = 1 == t,
        s = 2 == t,
        f = 3 == t,
        a = 4 == t,
        l = 6 == t,
        p = 5 == t || l,
        v = e || c;
      return function (e, c, h) {
        for (
          var d,
            g,
            y = i(e),
            m = o(y),
            _ = r(c, h, 3),
            x = u(m.length),
            b = 0,
            S = n ? v(e, x) : s ? v(e, 0) : void 0;
          x > b;
          b++
        )
          if ((p || b in m) && ((g = _((d = m[b]), b, y)), t))
            if (n) S[b] = g;
            else if (g)
              switch (t) {
                case 3:
                  return !0;
                case 5:
                  return d;
                case 6:
                  return b;
                case 2:
                  S.push(d);
              }
            else if (a) return !1;
        return l ? -1 : f || a ? a : S;
      };
    };
  },
  function (t, e, n) {
    var r = n(24),
      o = n(34),
      i = n(10)("match");
    t.exports = function (t) {
      var e;
      return r(t) && (void 0 !== (e = t[i]) ? !!e : "RegExp" == o(t));
    };
  },
  function (t, e, n) {
    var r = n(57),
      o = n(11)("toStringTag"),
      i =
        "Arguments" ==
        r(
          (function () {
            return arguments;
          })()
        );
    t.exports = function (t) {
      var e, n, u;
      return void 0 === t
        ? "Undefined"
        : null === t
        ? "Null"
        : "string" ==
          typeof (n = (function (t, e) {
            try {
              return t[e];
            } catch (t) {}
          })((e = Object(t)), o))
        ? n
        : i
        ? r(e)
        : "Object" == (u = r(e)) && "function" == typeof e.callee
        ? "Arguments"
        : u;
    };
  },
  function (t, e) {
    t.exports = {};
  },
  function (t, e, n) {
    t.exports = n(159);
  },
  ,
  function (t, e, n) {
    t.exports = n(60)("native-function-to-string", Function.toString);
  },
  function (t, e, n) {
    var r = n(115),
      o = n(11)("iterator"),
      i = n(38);
    t.exports = n(7).getIteratorMethod = function (t) {
      if (null != t) return t[o] || t["@@iterator"] || i[r(t)];
    };
  },
  function (t, e, n) {
    var r = n(60)("keys"),
      o = n(61);
    t.exports = function (t) {
      return r[t] || (r[t] = o(t));
    };
  },
  function (t, e, n) {
    var r = n(17),
      o = n(16),
      i = n(35);
    t.exports = n(12)
      ? Object.defineProperties
      : function defineProperties(t, e) {
          o(t);
          for (var n, u = i(e), c = u.length, s = 0; c > s; )
            r.f(t, (n = u[s++]), e[n]);
          return t;
        };
  },
  function (t, e, n) {
    var r = n(9).document;
    t.exports = r && r.documentElement;
  },
  function (t, e) {
    t.exports = function (t, e) {
      return { value: e, done: !!t };
    };
  },
  ,
  function (t, e, n) {
    t.exports = n(218);
  },
  function (t, e, n) {
    var r = n(42),
      o = n(192),
      i = n(193),
      u = n(16),
      c = n(95),
      s = n(120),
      f = {},
      a = {};
    ((e = t.exports = function (t, e, n, l, p) {
      var v,
        h,
        d,
        g,
        y = p
          ? function () {
              return t;
            }
          : s(t),
        m = r(n, l, e ? 2 : 1),
        _ = 0;
      if ("function" != typeof y) throw TypeError(t + " is not iterable!");
      if (i(y)) {
        for (v = c(t.length); v > _; _++)
          if ((g = e ? m(u((h = t[_]))[0], h[1]) : m(t[_])) === f || g === a)
            return g;
      } else
        for (d = y.call(t); !(h = d.next()).done; )
          if ((g = o(d, m, h.value, e)) === f || g === a) return g;
    }).BREAK = f),
      (e.RETURN = a);
  },
  function (t, e, n) {
    "use strict";
    var r = n(9),
      o = n(19),
      i = n(12),
      u = n(8),
      c = n(103),
      s = n(110).KEY,
      f = n(27),
      a = n(70),
      l = n(55),
      p = n(49),
      v = n(11),
      h = n(72),
      d = n(73),
      g = n(149),
      y = n(105),
      m = n(16),
      _ = n(14),
      x = n(39),
      b = n(20),
      S = n(67),
      w = n(45),
      O = n(54),
      E = n(150),
      j = n(52),
      P = n(79),
      k = n(17),
      M = n(35),
      I = j.f,
      T = k.f,
      L = E.f,
      C = r.Symbol,
      D = r.JSON,
      A = D && D.stringify,
      F = v("_hidden"),
      N = v("toPrimitive"),
      R = {}.propertyIsEnumerable,
      q = a("symbol-registry"),
      $ = a("symbols"),
      W = a("op-symbols"),
      G = Object.prototype,
      H = "function" == typeof C && !!P.f,
      V = r.QObject,
      U = !V || !V.prototype || !V.prototype.findChild,
      Q =
        i &&
        f(function () {
          return (
            7 !=
            O(
              T({}, "a", {
                get: function () {
                  return T(this, "a", { value: 7 }).a;
                },
              })
            ).a
          );
        })
          ? function (t, e, n) {
              var r = I(G, e);
              r && delete G[e], T(t, e, n), r && t !== G && T(G, e, r);
            }
          : T,
      z = function (t) {
        var e = ($[t] = O(C.prototype));
        return (e._k = t), e;
      },
      B =
        H && "symbol" == typeof C.iterator
          ? function (t) {
              return "symbol" == typeof t;
            }
          : function (t) {
              return t instanceof C;
            },
      J = function defineProperty(t, e, n) {
        return (
          t === G && J(W, e, n),
          m(t),
          (e = S(e, !0)),
          m(n),
          o($, e)
            ? (n.enumerable
                ? (o(t, F) && t[F][e] && (t[F][e] = !1),
                  (n = O(n, { enumerable: w(0, !1) })))
                : (o(t, F) || T(t, F, w(1, {})), (t[F][e] = !0)),
              Q(t, e, n))
            : T(t, e, n)
        );
      },
      K = function defineProperties(t, e) {
        m(t);
        for (var n, r = g((e = b(e))), o = 0, i = r.length; i > o; )
          J(t, (n = r[o++]), e[n]);
        return t;
      },
      Y = function propertyIsEnumerable(t) {
        var e = R.call(this, (t = S(t, !0)));
        return (
          !(this === G && o($, t) && !o(W, t)) &&
          (!(e || !o(this, t) || !o($, t) || (o(this, F) && this[F][t])) || e)
        );
      },
      X = function getOwnPropertyDescriptor(t, e) {
        if (((t = b(t)), (e = S(e, !0)), t !== G || !o($, e) || o(W, e))) {
          var n = I(t, e);
          return (
            !n || !o($, e) || (o(t, F) && t[F][e]) || (n.enumerable = !0), n
          );
        }
      },
      Z = function getOwnPropertyNames(t) {
        for (var e, n = L(b(t)), r = [], i = 0; n.length > i; )
          o($, (e = n[i++])) || e == F || e == s || r.push(e);
        return r;
      },
      tt = function getOwnPropertySymbols(t) {
        for (
          var e, n = t === G, r = L(n ? W : b(t)), i = [], u = 0;
          r.length > u;

        )
          !o($, (e = r[u++])) || (n && !o(G, e)) || i.push($[e]);
        return i;
      };
    H ||
      (c(
        (C = function Symbol() {
          if (this instanceof C)
            throw TypeError("Symbol is not a constructor!");
          var t = p(arguments.length > 0 ? arguments[0] : void 0),
            e = function (n) {
              this === G && e.call(W, n),
                o(this, F) && o(this[F], t) && (this[F][t] = !1),
                Q(this, t, w(1, n));
            };
          return i && U && Q(G, t, { configurable: !0, set: e }), z(t);
        }).prototype,
        "toString",
        function toString() {
          return this._k;
        }
      ),
      (j.f = X),
      (k.f = J),
      (n(96).f = E.f = Z),
      (n(46).f = Y),
      (P.f = tt),
      i && !n(44) && c(G, "propertyIsEnumerable", Y, !0),
      (h.f = function (t) {
        return z(v(t));
      })),
      u(u.G + u.W + u.F * !H, { Symbol: C });
    for (
      var et = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(
          ","
        ),
        nt = 0;
      et.length > nt;

    )
      v(et[nt++]);
    for (var rt = M(v.store), ot = 0; rt.length > ot; ) d(rt[ot++]);
    u(u.S + u.F * !H, "Symbol", {
      for: function (t) {
        return o(q, (t += "")) ? q[t] : (q[t] = C(t));
      },
      keyFor: function keyFor(t) {
        if (!B(t)) throw TypeError(t + " is not a symbol!");
        for (var e in q) if (q[e] === t) return e;
      },
      useSetter: function () {
        U = !0;
      },
      useSimple: function () {
        U = !1;
      },
    }),
      u(u.S + u.F * !H, "Object", {
        create: function create(t, e) {
          return void 0 === e ? O(t) : K(O(t), e);
        },
        defineProperty: J,
        defineProperties: K,
        getOwnPropertyDescriptor: X,
        getOwnPropertyNames: Z,
        getOwnPropertySymbols: tt,
      });
    var it = f(function () {
      P.f(1);
    });
    u(u.S + u.F * it, "Object", {
      getOwnPropertySymbols: function getOwnPropertySymbols(t) {
        return P.f(x(t));
      },
    }),
      D &&
        u(
          u.S +
            u.F *
              (!H ||
                f(function () {
                  var t = C();
                  return (
                    "[null]" != A([t]) ||
                    "{}" != A({ a: t }) ||
                    "{}" != A(Object(t))
                  );
                })),
          "JSON",
          {
            stringify: function stringify(t) {
              for (var e, n, r = [t], o = 1; arguments.length > o; )
                r.push(arguments[o++]);
              if (((n = e = r[1]), (_(e) || void 0 !== t) && !B(t)))
                return (
                  y(e) ||
                    (e = function (t, e) {
                      if (
                        ("function" == typeof n && (e = n.call(this, t, e)),
                        !B(e))
                      )
                        return e;
                    }),
                  (r[1] = e),
                  A.apply(D, r)
                );
            },
          }
        ),
      C.prototype[N] || n(26)(C.prototype, N, C.prototype.valueOf),
      l(C, "Symbol"),
      l(Math, "Math", !0),
      l(r.JSON, "JSON", !0);
  },
  function (t, e, n) {
    t.exports = n(180);
  },
  function (t, e, n) {
    var r = n(131);
    t.exports = function (t, e) {
      return new (r(t))(e);
    };
  },
  function (t, e, n) {
    var r = n(24),
      o = n(132),
      i = n(10)("species");
    t.exports = function (t) {
      var e;
      return (
        o(t) &&
          ("function" != typeof (e = t.constructor) ||
            (e !== Array && !o(e.prototype)) ||
            (e = void 0),
          r(e) && null === (e = e[i]) && (e = void 0)),
        void 0 === e ? Array : e
      );
    };
  },
  function (t, e, n) {
    var r = n(34);
    t.exports =
      Array.isArray ||
      function isArray(t) {
        return "Array" == r(t);
      };
  },
  function (t, e, n) {
    var r = n(18),
      o = n(62),
      i = n(10)("species");
    t.exports = function (t, e) {
      var n,
        u = r(t).constructor;
      return void 0 === u || null == (n = r(u)[i]) ? e : o(n);
    };
  },
  ,
  function (t, e, n) {
    var r = n(90),
      o = n(37),
      i = n(171);
    t.exports = function (t) {
      return function (e, n, u) {
        var c,
          s = r(e),
          f = o(s.length),
          a = i(u, f);
        if (t && n != n) {
          for (; f > a; ) if ((c = s[a++]) != c) return !0;
        } else
          for (; f > a; a++)
            if ((t || a in s) && s[a] === n) return t || a || 0;
        return !t && -1;
      };
    };
  },
  function (t, e) {
    t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
      ","
    );
  },
  function (t, e, n) {
    n(138);
    var r = n(7).Object;
    t.exports = function defineProperty(t, e, n) {
      return r.defineProperty(t, e, n);
    };
  },
  function (t, e, n) {
    var r = n(8);
    r(r.S + r.F * !n(12), "Object", { defineProperty: n(17).f });
  },
  function (t, e, n) {
    t.exports = n(140);
  },
  function (t, e, n) {
    n(77), n(81), (t.exports = n(72).f("iterator"));
  },
  function (t, e, n) {
    var r = n(68),
      o = n(53);
    t.exports = function (t) {
      return function (e, n) {
        var i,
          u,
          c = String(o(e)),
          s = r(n),
          f = c.length;
        return s < 0 || s >= f
          ? t
            ? ""
            : void 0
          : (i = c.charCodeAt(s)) < 55296 ||
            i > 56319 ||
            s + 1 === f ||
            (u = c.charCodeAt(s + 1)) < 56320 ||
            u > 57343
          ? t
            ? c.charAt(s)
            : i
          : t
          ? c.slice(s, s + 2)
          : u - 56320 + ((i - 55296) << 10) + 65536;
      };
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(54),
      o = n(45),
      i = n(55),
      u = {};
    n(26)(u, n(11)("iterator"), function () {
      return this;
    }),
      (t.exports = function (t, e, n) {
        (t.prototype = r(u, { next: o(1, n) })), i(t, e + " Iterator");
      });
  },
  function (t, e, n) {
    var r = n(20),
      o = n(95),
      i = n(144);
    t.exports = function (t) {
      return function (e, n, u) {
        var c,
          s = r(e),
          f = o(s.length),
          a = i(u, f);
        if (t && n != n) {
          for (; f > a; ) if ((c = s[a++]) != c) return !0;
        } else
          for (; f > a; a++)
            if ((t || a in s) && s[a] === n) return t || a || 0;
        return !t && -1;
      };
    };
  },
  function (t, e, n) {
    var r = n(68),
      o = Math.max,
      i = Math.min;
    t.exports = function (t, e) {
      return (t = r(t)) < 0 ? o(t + e, 0) : i(t, e);
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(146),
      o = n(124),
      i = n(38),
      u = n(20);
    (t.exports = n(89)(
      Array,
      "Array",
      function (t, e) {
        (this._t = u(t)), (this._i = 0), (this._k = e);
      },
      function () {
        var t = this._t,
          e = this._k,
          n = this._i++;
        return !t || n >= t.length
          ? ((this._t = void 0), o(1))
          : o(0, "keys" == e ? n : "values" == e ? t[n] : [n, t[n]]);
      },
      "values"
    )),
      (i.Arguments = i.Array),
      r("keys"),
      r("values"),
      r("entries");
  },
  function (t, e) {
    t.exports = function () {};
  },
  function (t, e, n) {
    t.exports = n(148);
  },
  function (t, e, n) {
    n(128), n(111), n(151), n(152), (t.exports = n(7).Symbol);
  },
  function (t, e, n) {
    var r = n(35),
      o = n(79),
      i = n(46);
    t.exports = function (t) {
      var e = r(t),
        n = o.f;
      if (n)
        for (var u, c = n(t), s = i.f, f = 0; c.length > f; )
          s.call(t, (u = c[f++])) && e.push(u);
      return e;
    };
  },
  function (t, e, n) {
    var r = n(20),
      o = n(96).f,
      i = {}.toString,
      u =
        "object" == typeof window && window && Object.getOwnPropertyNames
          ? Object.getOwnPropertyNames(window)
          : [];
    t.exports.f = function getOwnPropertyNames(t) {
      return u && "[object Window]" == i.call(t)
        ? (function (t) {
            try {
              return o(t);
            } catch (t) {
              return u.slice();
            }
          })(t)
        : o(r(t));
    };
  },
  function (t, e, n) {
    n(73)("asyncIterator");
  },
  function (t, e, n) {
    n(73)("observable");
  },
  function (t, e, n) {
    t.exports = n(154);
  },
  function (t, e, n) {
    n(155), (t.exports = n(7).Object.getPrototypeOf);
  },
  function (t, e, n) {
    var r = n(39),
      o = n(78);
    n(82)("getPrototypeOf", function () {
      return function getPrototypeOf(t) {
        return o(r(t));
      };
    });
  },
  function (t, e, n) {
    n(157), (t.exports = n(7).Object.setPrototypeOf);
  },
  function (t, e, n) {
    var r = n(8);
    r(r.S, "Object", { setPrototypeOf: n(158).set });
  },
  function (t, e, n) {
    var r = n(14),
      o = n(16),
      i = function (t, e) {
        if ((o(t), !r(e) && null !== e))
          throw TypeError(e + ": can't set as prototype!");
      };
    t.exports = {
      set:
        Object.setPrototypeOf ||
        ("__proto__" in {}
          ? (function (t, e, r) {
              try {
                (r = n(42)(
                  Function.call,
                  n(52).f(Object.prototype, "__proto__").set,
                  2
                ))(t, []),
                  (e = !(t instanceof Array));
              } catch (t) {
                e = !0;
              }
              return function setPrototypeOf(t, n) {
                return i(t, n), e ? (t.__proto__ = n) : r(t, n), t;
              };
            })({}, !1)
          : void 0),
      check: i,
    };
  },
  function (t, e, n) {
    n(160);
    var r = n(7).Object;
    t.exports = function create(t, e) {
      return r.create(t, e);
    };
  },
  function (t, e, n) {
    var r = n(8);
    r(r.S, "Object", { create: n(54) });
  },
  ,
  function (t, e) {
    t.exports = "\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff";
  },
  ,
  ,
  function (t, e, n) {
    "use strict";
    var r = n(75),
      o = n(233),
      i = n(116),
      u = n(90);
    (t.exports = n(234)(
      Array,
      "Array",
      function (t, e) {
        (this._t = u(t)), (this._i = 0), (this._k = e);
      },
      function () {
        var t = this._t,
          e = this._k,
          n = this._i++;
        return !t || n >= t.length
          ? ((this._t = void 0), o(1))
          : o(0, "keys" == e ? n : "values" == e ? t[n] : [n, t[n]]);
      },
      "values"
    )),
      (i.Arguments = i.Array),
      r("keys"),
      r("values"),
      r("entries");
  },
  function (t, e, n) {
    var r = n(40).f,
      o = n(51),
      i = n(10)("toStringTag");
    t.exports = function (t, e, n) {
      t &&
        !o((t = n ? t : t.prototype), i) &&
        r(t, i, { configurable: !0, value: e });
    };
  },
  ,
  function (t, e, n) {
    var r = n(48),
      o = n(33);
    t.exports = function (t) {
      return function (e, n) {
        var i,
          u,
          c = String(o(e)),
          s = r(n),
          f = c.length;
        return s < 0 || s >= f
          ? t
            ? ""
            : void 0
          : (i = c.charCodeAt(s)) < 55296 ||
            i > 56319 ||
            s + 1 === f ||
            (u = c.charCodeAt(s + 1)) < 56320 ||
            u > 57343
          ? t
            ? c.charAt(s)
            : i
          : t
          ? c.slice(s, s + 2)
          : u - 56320 + ((i - 55296) << 10) + 65536;
      };
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(80);
    n(29)({ target: "RegExp", proto: !0, forced: r !== /./.exec }, { exec: r });
  },
  ,
  function (t, e, n) {
    var r = n(48),
      o = Math.max,
      i = Math.min;
    t.exports = function (t, e) {
      return (t = r(t)) < 0 ? o(t + e, 0) : i(t, e);
    };
  },
  ,
  function (t, e, n) {
    var r = n(191),
      o = n(136);
    t.exports =
      Object.keys ||
      function keys(t) {
        return r(t, o);
      };
  },
  ,
  ,
  ,
  function (t, e) {
    t.exports = function (t, e, n, r) {
      if (!(t instanceof e) || (void 0 !== r && r in t))
        throw TypeError(n + ": incorrect invocation!");
      return t;
    };
  },
  function (t, e, n) {
    var r = n(26);
    t.exports = function (t, e, n) {
      for (var o in e) n && t[o] ? (t[o] = e[o]) : r(t, o, e[o]);
      return t;
    };
  },
  ,
  function (t, e, n) {
    n(181);
    var r = n(7).Object;
    t.exports = function getOwnPropertyDescriptor(t, e) {
      return r.getOwnPropertyDescriptor(t, e);
    };
  },
  function (t, e, n) {
    var r = n(20),
      o = n(52).f;
    n(82)("getOwnPropertyDescriptor", function () {
      return function getOwnPropertyDescriptor(t, e) {
        return o(r(t), e);
      };
    });
  },
  function (t, e, n) {
    t.exports = n(183);
  },
  function (t, e, n) {
    n(184), (t.exports = n(7).Reflect.get);
  },
  function (t, e, n) {
    var r = n(52),
      o = n(78),
      i = n(19),
      u = n(8),
      c = n(14),
      s = n(16);
    u(u.S, "Reflect", {
      get: function get(t, e) {
        var n,
          u,
          f = arguments.length < 3 ? t : arguments[2];
        return s(t) === f
          ? t[e]
          : (n = r.f(t, e))
          ? i(n, "value")
            ? n.value
            : void 0 !== n.get
            ? n.get.call(f)
            : void 0
          : c((u = o(t)))
          ? get(u, e, f)
          : void 0;
      },
    });
  },
  function (t, e, n) {
    var r = n(4);
    t.exports = function _superPropBase(t, e) {
      for (
        ;
        !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = r(t));

      );
      return t;
    };
  },
  function (t, e, n) {
    n(187), (t.exports = n(7).Object.keys);
  },
  function (t, e, n) {
    var r = n(39),
      o = n(35);
    n(82)("keys", function () {
      return function keys(t) {
        return o(r(t));
      };
    });
  },
  ,
  ,
  ,
  function (t, e, n) {
    var r = n(51),
      o = n(90),
      i = n(135)(!1),
      u = n(121)("IE_PROTO");
    t.exports = function (t, e) {
      var n,
        c = o(t),
        s = 0,
        f = [];
      for (n in c) n != u && r(c, n) && f.push(n);
      for (; e.length > s; ) r(c, (n = e[s++])) && (~i(f, n) || f.push(n));
      return f;
    };
  },
  function (t, e, n) {
    var r = n(16);
    t.exports = function (t, e, n, o) {
      try {
        return o ? e(r(n)[0], n[1]) : e(n);
      } catch (e) {
        var i = t.return;
        throw (void 0 !== i && r(i.call(t)), e);
      }
    };
  },
  function (t, e, n) {
    var r = n(38),
      o = n(11)("iterator"),
      i = Array.prototype;
    t.exports = function (t) {
      return void 0 !== t && (r.Array === t || i[o] === t);
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    n(1)(e, "__esModule", { value: !0 }), (e.default = void 0);
    var o = r(n(43)),
      i = r(n(2)),
      u = r(n(3)),
      c = (function () {
        function ArgsObject(t) {
          (0, i.default)(this, ArgsObject), (this.args = t);
        }
        return (
          (0, u.default)(ArgsObject, [
            {
              key: "requireArgument",
              value: function requireArgument(t) {
                var e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : this.args;
                if (!e.hasOwnProperty(t))
                  throw Error("".concat(t, " is required."));
              },
            },
            {
              key: "requireArgumentType",
              value: function requireArgumentType(t, e) {
                var n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : this.args;
                if ((this.requireArgument(t, n), (0, o.default)(n[t]) !== e))
                  throw Error("".concat(t, " invalid type: ").concat(e, "."));
              },
            },
            {
              key: "requireArgumentInstance",
              value: function requireArgumentInstance(t, e) {
                var n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : this.args;
                if ((this.requireArgument(t, n), !(n[t] instanceof e)))
                  throw Error("".concat(t, " invalid instance."));
              },
            },
            {
              key: "requireArgumentConstructor",
              value: function requireArgumentConstructor(t, e) {
                var n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : this.args;
                if ((this.requireArgument(t, n), n[t].constructor !== e))
                  throw Error("".concat(t, " invalid constructor type."));
              },
            },
          ]),
          ArgsObject
        );
      })();
    e.default = c;
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (t, e, n) {
    "use strict";
    var r = n(29),
      o = n(135)(!0);
    r(r.P, "Array", {
      includes: function includes(t) {
        return o(this, t, arguments.length > 1 ? arguments[1] : void 0);
      },
    }),
      n(75)("includes");
  },
  function (t, e, n) {
    "use strict";
    var r = n(29),
      o = n(210);
    r(r.P + r.F * n(211)("includes"), "String", {
      includes: function includes(t) {
        return !!~o(this, t, "includes").indexOf(
          t,
          arguments.length > 1 ? arguments[1] : void 0
        );
      },
    });
  },
  function (t, e, n) {
    var r = n(114),
      o = n(33);
    t.exports = function (t, e, n) {
      if (r(e)) throw TypeError("String#" + n + " doesn't accept regex!");
      return String(o(t));
    };
  },
  function (t, e, n) {
    var r = n(10)("match");
    t.exports = function (t) {
      var e = /./;
      try {
        "/./"[t](e);
      } catch (n) {
        try {
          return (e[r] = !1), !"/./"[t](e);
        } catch (t) {}
      }
      return !0;
    };
  },
  ,
  ,
  function (t, e, n) {
    for (
      var r = n(165),
        o = n(173),
        i = n(31),
        u = n(13),
        c = n(28),
        s = n(116),
        f = n(10),
        a = f("iterator"),
        l = f("toStringTag"),
        p = s.Array,
        v = {
          CSSRuleList: !0,
          CSSStyleDeclaration: !1,
          CSSValueList: !1,
          ClientRectList: !1,
          DOMRectList: !1,
          DOMStringList: !1,
          DOMTokenList: !0,
          DataTransferItemList: !1,
          FileList: !1,
          HTMLAllCollection: !1,
          HTMLCollection: !1,
          HTMLFormElement: !1,
          HTMLSelectElement: !1,
          MediaList: !0,
          MimeTypeArray: !1,
          NamedNodeMap: !1,
          NodeList: !0,
          PaintRequestList: !1,
          Plugin: !1,
          PluginArray: !1,
          SVGLengthList: !1,
          SVGNumberList: !1,
          SVGPathSegList: !1,
          SVGPointList: !1,
          SVGStringList: !1,
          SVGTransformList: !1,
          SourceBufferList: !1,
          StyleSheetList: !0,
          TextTrackCueList: !1,
          TextTrackList: !1,
          TouchList: !1,
        },
        h = o(v),
        d = 0;
      d < h.length;
      d++
    ) {
      var g,
        y = h[d],
        m = v[y],
        _ = u[y],
        x = _ && _.prototype;
      if (x && (x[a] || c(x, a, p), x[l] || c(x, l, y), (s[y] = p), m))
        for (g in r) x[g] || i(x, g, r[g], !0);
    }
  },
  function (t, e, n) {
    var r = n(18),
      o = n(236),
      i = n(136),
      u = n(121)("IE_PROTO"),
      c = function () {},
      s = function () {
        var t,
          e = n(92)("iframe"),
          r = i.length;
        for (
          e.style.display = "none",
            n(216).appendChild(e),
            e.src = "javascript:",
            (t = e.contentWindow.document).open(),
            t.write("<script>document.F=Object</script>"),
            t.close(),
            s = t.F;
          r--;

        )
          delete s.prototype[i[r]];
        return s();
      };
    t.exports =
      Object.create ||
      function create(t, e) {
        var n;
        return (
          null !== t
            ? ((c.prototype = r(t)),
              (n = new c()),
              (c.prototype = null),
              (n[u] = t))
            : (n = s()),
          void 0 === e ? n : o(n, e)
        );
      };
  },
  function (t, e, n) {
    var r = n(13).document;
    t.exports = r && r.documentElement;
  },
  ,
  function (t, e, n) {
    n(219), (t.exports = n(7).parseInt);
  },
  function (t, e, n) {
    var r = n(8),
      o = n(220);
    r(r.G + r.F * (parseInt != o), { parseInt: o });
  },
  function (t, e, n) {
    var r = n(9).parseInt,
      o = n(221).trim,
      i = n(162),
      u = /^[-+]?0[xX]/;
    t.exports =
      8 !== r(i + "08") || 22 !== r(i + "0x16")
        ? function parseInt(t, e) {
            var n = o(String(t), 3);
            return r(n, e >>> 0 || (u.test(n) ? 16 : 10));
          }
        : r;
  },
  function (t, e, n) {
    var r = n(8),
      o = n(53),
      i = n(27),
      u = n(162),
      c = "[" + u + "]",
      s = RegExp("^" + c + c + "*"),
      f = RegExp(c + c + "*$"),
      a = function (t, e, n) {
        var o = {},
          c = i(function () {
            return !!u[t]() || "​" != "​"[t]();
          }),
          s = (o[t] = c ? e(l) : u[t]);
        n && (o[n] = s), r(r.P + r.F * c, "String", o);
      },
      l = (a.trim = function (t, e) {
        return (
          (t = String(o(t))),
          1 & e && (t = t.replace(s, "")),
          2 & e && (t = t.replace(f, "")),
          t
        );
      });
    t.exports = a;
  },
  function (t, e) {
    t.exports = function (t, e, n) {
      var r = void 0 === n;
      switch (e.length) {
        case 0:
          return r ? t() : t.call(n);
        case 1:
          return r ? t(e[0]) : t.call(n, e[0]);
        case 2:
          return r ? t(e[0], e[1]) : t.call(n, e[0], e[1]);
        case 3:
          return r ? t(e[0], e[1], e[2]) : t.call(n, e[0], e[1], e[2]);
        case 4:
          return r
            ? t(e[0], e[1], e[2], e[3])
            : t.call(n, e[0], e[1], e[2], e[3]);
      }
      return t.apply(n, e);
    };
  },
  ,
  function (t, e, n) {
    "use strict";
    var r = n(9),
      o = n(7),
      i = n(17),
      u = n(12),
      c = n(11)("species");
    t.exports = function (t) {
      var e = "function" == typeof o[t] ? o[t] : r[t];
      u &&
        e &&
        !e[c] &&
        i.f(e, c, {
          configurable: !0,
          get: function () {
            return this;
          },
        });
    };
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (t, e) {
    t.exports = function (t, e) {
      return { value: e, done: !!t };
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(94),
      o = n(29),
      i = n(31),
      u = n(28),
      c = n(116),
      s = n(235),
      f = n(166),
      a = n(237),
      l = n(10)("iterator"),
      p = !([].keys && "next" in [].keys()),
      v = function () {
        return this;
      };
    t.exports = function (t, e, n, h, d, g, y) {
      s(n, e, h);
      var m,
        _,
        x,
        b = function (t) {
          if (!p && t in E) return E[t];
          switch (t) {
            case "keys":
              return function keys() {
                return new n(this, t);
              };
            case "values":
              return function values() {
                return new n(this, t);
              };
          }
          return function entries() {
            return new n(this, t);
          };
        },
        S = e + " Iterator",
        w = "values" == d,
        O = !1,
        E = t.prototype,
        j = E[l] || E["@@iterator"] || (d && E[d]),
        P = j || b(d),
        k = d ? (w ? b("entries") : P) : void 0,
        M = ("Array" == e && E.entries) || j;
      if (
        (M &&
          (x = a(M.call(new t()))) !== Object.prototype &&
          x.next &&
          (f(x, S, !0), r || "function" == typeof x[l] || u(x, l, v)),
        w &&
          j &&
          "values" !== j.name &&
          ((O = !0),
          (P = function values() {
            return j.call(this);
          })),
        (r && !y) || (!p && !O && E[l]) || u(E, l, P),
        (c[e] = P),
        (c[S] = v),
        d)
      )
        if (
          ((m = {
            values: w ? P : b("values"),
            keys: g ? P : b("keys"),
            entries: k,
          }),
          y)
        )
          for (_ in m) _ in E || i(E, _, m[_]);
        else o(o.P + o.F * (p || O), e, m);
      return m;
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(215),
      o = n(87),
      i = n(166),
      u = {};
    n(28)(u, n(10)("iterator"), function () {
      return this;
    }),
      (t.exports = function (t, e, n) {
        (t.prototype = r(u, { next: o(1, n) })), i(t, e + " Iterator");
      });
  },
  function (t, e, n) {
    var r = n(40),
      o = n(18),
      i = n(173);
    t.exports = n(23)
      ? Object.defineProperties
      : function defineProperties(t, e) {
          o(t);
          for (var n, u = i(e), c = u.length, s = 0; c > s; )
            r.f(t, (n = u[s++]), e[n]);
          return t;
        };
  },
  function (t, e, n) {
    var r = n(51),
      o = n(64),
      i = n(121)("IE_PROTO"),
      u = Object.prototype;
    t.exports =
      Object.getPrototypeOf ||
      function (t) {
        return (
          (t = o(t)),
          r(t, i)
            ? t[i]
            : "function" == typeof t.constructor && t instanceof t.constructor
            ? t.constructor.prototype
            : t instanceof Object
            ? u
            : null
        );
      };
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (t, e, n) {
    var r = n(14);
    t.exports = function (t, e) {
      if (!r(t) || t._t !== e)
        throw TypeError("Incompatible receiver, " + e + " required!");
      return t;
    };
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (t, e, n) {
    var r = n(117),
      o = n(320),
      i = n(4),
      u = n(112),
      c = n(335),
      s = n(336);
    function _wrapNativeSuper(e) {
      var n = "function" == typeof o ? new o() : void 0;
      return (
        (t.exports = _wrapNativeSuper = function _wrapNativeSuper(t) {
          if (null === t || !c(t)) return t;
          if ("function" != typeof t)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          if (void 0 !== n) {
            if (n.has(t)) return n.get(t);
            n.set(t, Wrapper);
          }
          function Wrapper() {
            return s(t, arguments, i(this).constructor);
          }
          return (
            (Wrapper.prototype = r(t.prototype, {
              constructor: {
                value: Wrapper,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
            u(Wrapper, t)
          );
        }),
        _wrapNativeSuper(e)
      );
    }
    t.exports = _wrapNativeSuper;
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (t, e, n) {
    t.exports = n(321);
  },
  function (t, e, n) {
    n(111),
      n(77),
      n(81),
      n(322),
      n(328),
      n(331),
      n(333),
      (t.exports = n(7).Map);
  },
  function (t, e, n) {
    "use strict";
    var r = n(323),
      o = n(249);
    t.exports = n(324)(
      "Map",
      function (t) {
        return function Map() {
          return t(this, arguments.length > 0 ? arguments[0] : void 0);
        };
      },
      {
        get: function get(t) {
          var e = r.getEntry(o(this, "Map"), t);
          return e && e.v;
        },
        set: function set(t, e) {
          return r.def(o(this, "Map"), 0 === t ? 0 : t, e);
        },
      },
      r,
      !0
    );
  },
  function (t, e, n) {
    "use strict";
    var r = n(17).f,
      o = n(54),
      i = n(178),
      u = n(42),
      c = n(177),
      s = n(127),
      f = n(89),
      a = n(124),
      l = n(224),
      p = n(12),
      v = n(110).fastKey,
      h = n(249),
      d = p ? "_s" : "size",
      g = function (t, e) {
        var n,
          r = v(e);
        if ("F" !== r) return t._i[r];
        for (n = t._f; n; n = n.n) if (n.k == e) return n;
      };
    t.exports = {
      getConstructor: function (t, e, n, f) {
        var a = t(function (t, r) {
          c(t, a, e, "_i"),
            (t._t = e),
            (t._i = o(null)),
            (t._f = void 0),
            (t._l = void 0),
            (t[d] = 0),
            null != r && s(r, n, t[f], t);
        });
        return (
          i(a.prototype, {
            clear: function clear() {
              for (var t = h(this, e), n = t._i, r = t._f; r; r = r.n)
                (r.r = !0), r.p && (r.p = r.p.n = void 0), delete n[r.i];
              (t._f = t._l = void 0), (t[d] = 0);
            },
            delete: function (t) {
              var n = h(this, e),
                r = g(n, t);
              if (r) {
                var o = r.n,
                  i = r.p;
                delete n._i[r.i],
                  (r.r = !0),
                  i && (i.n = o),
                  o && (o.p = i),
                  n._f == r && (n._f = o),
                  n._l == r && (n._l = i),
                  n[d]--;
              }
              return !!r;
            },
            forEach: function forEach(t) {
              h(this, e);
              for (
                var n,
                  r = u(t, arguments.length > 1 ? arguments[1] : void 0, 3);
                (n = n ? n.n : this._f);

              )
                for (r(n.v, n.k, this); n && n.r; ) n = n.p;
            },
            has: function has(t) {
              return !!g(h(this, e), t);
            },
          }),
          p &&
            r(a.prototype, "size", {
              get: function () {
                return h(this, e)[d];
              },
            }),
          a
        );
      },
      def: function (t, e, n) {
        var r,
          o,
          i = g(t, e);
        return (
          i
            ? (i.v = n)
            : ((t._l = i = {
                i: (o = v(e, !0)),
                k: e,
                v: n,
                p: (r = t._l),
                n: void 0,
                r: !1,
              }),
              t._f || (t._f = i),
              r && (r.n = i),
              t[d]++,
              "F" !== o && (t._i[o] = i)),
          t
        );
      },
      getEntry: g,
      setStrong: function (t, e, n) {
        f(
          t,
          e,
          function (t, n) {
            (this._t = h(t, e)), (this._k = n), (this._l = void 0);
          },
          function () {
            for (var t = this._k, e = this._l; e && e.r; ) e = e.p;
            return this._t && (this._l = e = e ? e.n : this._t._f)
              ? a(0, "keys" == t ? e.k : "values" == t ? e.v : [e.k, e.v])
              : ((this._t = void 0), a(1));
          },
          n ? "entries" : "values",
          !n,
          !0
        ),
          l(e);
      },
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(9),
      o = n(8),
      i = n(110),
      u = n(27),
      c = n(26),
      s = n(178),
      f = n(127),
      a = n(177),
      l = n(14),
      p = n(55),
      v = n(17).f,
      h = n(325)(0),
      d = n(12);
    t.exports = function (t, e, n, g, y, m) {
      var _ = r[t],
        x = _,
        b = y ? "set" : "add",
        S = x && x.prototype,
        w = {};
      return (
        d &&
        "function" == typeof x &&
        (m ||
          (S.forEach &&
            !u(function () {
              new x().entries().next();
            })))
          ? ((x = e(function (e, n) {
              a(e, x, t, "_c"), (e._c = new _()), null != n && f(n, y, e[b], e);
            })),
            h(
              "add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(
                ","
              ),
              function (t) {
                var e = "add" == t || "set" == t;
                t in S &&
                  (!m || "clear" != t) &&
                  c(x.prototype, t, function (n, r) {
                    if ((a(this, x, t), !e && m && !l(n)))
                      return "get" == t && void 0;
                    var o = this._c[t](0 === n ? 0 : n, r);
                    return e ? this : o;
                  });
              }
            ),
            m ||
              v(x.prototype, "size", {
                get: function () {
                  return this._c.size;
                },
              }))
          : ((x = g.getConstructor(e, t, y, b)),
            s(x.prototype, n),
            (i.NEED = !0)),
        p(x, t),
        (w[t] = x),
        o(o.G + o.W + o.F, w),
        m || g.setStrong(x, t, y),
        x
      );
    };
  },
  function (t, e, n) {
    var r = n(42),
      o = n(109),
      i = n(39),
      u = n(95),
      c = n(326);
    t.exports = function (t, e) {
      var n = 1 == t,
        s = 2 == t,
        f = 3 == t,
        a = 4 == t,
        l = 6 == t,
        p = 5 == t || l,
        v = e || c;
      return function (e, c, h) {
        for (
          var d,
            g,
            y = i(e),
            m = o(y),
            _ = r(c, h, 3),
            x = u(m.length),
            b = 0,
            S = n ? v(e, x) : s ? v(e, 0) : void 0;
          x > b;
          b++
        )
          if ((p || b in m) && ((g = _((d = m[b]), b, y)), t))
            if (n) S[b] = g;
            else if (g)
              switch (t) {
                case 3:
                  return !0;
                case 5:
                  return d;
                case 6:
                  return b;
                case 2:
                  S.push(d);
              }
            else if (a) return !1;
        return l ? -1 : f || a ? a : S;
      };
    };
  },
  function (t, e, n) {
    var r = n(327);
    t.exports = function (t, e) {
      return new (r(t))(e);
    };
  },
  function (t, e, n) {
    var r = n(14),
      o = n(105),
      i = n(11)("species");
    t.exports = function (t) {
      var e;
      return (
        o(t) &&
          ("function" != typeof (e = t.constructor) ||
            (e !== Array && !o(e.prototype)) ||
            (e = void 0),
          r(e) && null === (e = e[i]) && (e = void 0)),
        void 0 === e ? Array : e
      );
    };
  },
  function (t, e, n) {
    var r = n(8);
    r(r.P + r.R, "Map", { toJSON: n(329)("Map") });
  },
  function (t, e, n) {
    var r = n(115),
      o = n(330);
    t.exports = function (t) {
      return function toJSON() {
        if (r(this) != t) throw TypeError(t + "#toJSON isn't generic");
        return o(this);
      };
    };
  },
  function (t, e, n) {
    var r = n(127);
    t.exports = function (t, e) {
      var n = [];
      return r(t, !1, n.push, n, e), n;
    };
  },
  function (t, e, n) {
    n(332)("Map");
  },
  function (t, e, n) {
    "use strict";
    var r = n(8);
    t.exports = function (t) {
      r(r.S, t, {
        of: function of() {
          for (var t = arguments.length, e = new Array(t); t--; )
            e[t] = arguments[t];
          return new this(e);
        },
      });
    };
  },
  function (t, e, n) {
    n(334)("Map");
  },
  function (t, e, n) {
    "use strict";
    var r = n(8),
      o = n(66),
      i = n(42),
      u = n(127);
    t.exports = function (t) {
      r(r.S, t, {
        from: function from(t) {
          var e,
            n,
            r,
            c,
            s = arguments[1];
          return (
            o(this),
            (e = void 0 !== s) && o(s),
            null == t
              ? new this()
              : ((n = []),
                e
                  ? ((r = 0),
                    (c = i(s, arguments[2], 2)),
                    u(t, !1, function (t) {
                      n.push(c(t, r++));
                    }))
                  : u(t, !1, n.push, n),
                new this(n))
          );
        },
      });
    };
  },
  function (t, e) {
    t.exports = function _isNativeFunction(t) {
      return -1 !== Function.toString.call(t).indexOf("[native code]");
    };
  },
  function (t, e, n) {
    var r = n(337),
      o = n(112);
    function _construct(e, n, i) {
      return (
        !(function isNativeReflectConstruct() {
          if ("undefined" == typeof Reflect || !r) return !1;
          if (r.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Date.prototype.toString.call(r(Date, [], function () {})), !0
            );
          } catch (t) {
            return !1;
          }
        })()
          ? (t.exports = _construct = function _construct(t, e, n) {
              var r = [null];
              r.push.apply(r, e);
              var i = new (Function.bind.apply(t, r))();
              return n && o(i, n.prototype), i;
            })
          : (t.exports = _construct = r),
        _construct.apply(null, arguments)
      );
    }
    t.exports = _construct;
  },
  function (t, e, n) {
    t.exports = n(338);
  },
  function (t, e, n) {
    n(339), (t.exports = n(7).Reflect.construct);
  },
  function (t, e, n) {
    var r = n(8),
      o = n(54),
      i = n(66),
      u = n(16),
      c = n(14),
      s = n(27),
      f = n(340),
      a = (n(9).Reflect || {}).construct,
      l = s(function () {
        function F() {}
        return !(a(function () {}, [], F) instanceof F);
      }),
      p = !s(function () {
        a(function () {});
      });
    r(r.S + r.F * (l || p), "Reflect", {
      construct: function construct(t, e) {
        i(t), u(e);
        var n = arguments.length < 3 ? t : i(arguments[2]);
        if (p && !l) return a(t, e, n);
        if (t == n) {
          switch (e.length) {
            case 0:
              return new t();
            case 1:
              return new t(e[0]);
            case 2:
              return new t(e[0], e[1]);
            case 3:
              return new t(e[0], e[1], e[2]);
            case 4:
              return new t(e[0], e[1], e[2], e[3]);
          }
          var r = [null];
          return r.push.apply(r, e), new (f.apply(t, r))();
        }
        var s = n.prototype,
          v = o(c(s) ? s : Object.prototype),
          h = Function.apply.call(t, v, e);
        return c(h) ? h : v;
      },
    });
  },
  function (t, e, n) {
    "use strict";
    var r = n(66),
      o = n(14),
      i = n(222),
      u = [].slice,
      c = {},
      s = function (t, e, n) {
        if (!(e in c)) {
          for (var r = [], o = 0; o < e; o++) r[o] = "a[" + o + "]";
          c[e] = Function("F,a", "return new F(" + r.join(",") + ")");
        }
        return c[e](t, n);
      };
    t.exports =
      Function.bind ||
      function bind(t) {
        var e = r(this),
          n = u.call(arguments, 1),
          c = function () {
            var r = n.concat(u.call(arguments));
            return this instanceof c ? s(e, r.length, r) : i(e, r, t);
          };
        return o(e.prototype) && (c.prototype = e.prototype), c;
      };
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      o = r(n(117));
    n(30);
    var i = r(n(43));
    n(76);
    var u = function Module() {
      var t,
        e = jQuery,
        n = arguments,
        r = this,
        o = {},
        u = function ensureClosureMethods() {
          e.each(r, function (t) {
            var e = r[t];
            "function" == typeof e &&
              (r[t] = function () {
                return e.apply(r, arguments);
              });
          });
        },
        c = function initSettings() {
          t = r.getDefaultSettings();
          var o = n[0];
          o && e.extend(!0, t, o);
        },
        s = function init() {
          r.__construct.apply(r, n), u(), c(), r.trigger("init");
        };
      (this.getItems = function (t, e) {
        if (e) {
          var n = e.split("."),
            r = n.splice(0, 1);
          if (!n.length) return t[r];
          if (!t[r]) return;
          return this.getItems(t[r], n.join("."));
        }
        return t;
      }),
        (this.getSettings = function (e) {
          return this.getItems(t, e);
        }),
        (this.setSettings = function (n, o, u) {
          if ((u || (u = t), "object" === (0, i.default)(n)))
            return e.extend(u, n), r;
          var c = n.split("."),
            s = c.splice(0, 1);
          return c.length
            ? (u[s] || (u[s] = {}), r.setSettings(c.join("."), o, u[s]))
            : ((u[s] = o), r);
        }),
        (this.getErrorMessage = function (t, e) {
          var n;
          switch (t) {
            case "forceMethodImplementation":
              n = "The method '".concat(
                e,
                "' must to be implemented in the inheritor child."
              );
              break;
            default:
              n = "An error occurs";
          }
          return n;
        }),
        (this.forceMethodImplementation = function (t) {
          throw new Error(this.getErrorMessage("forceMethodImplementation", t));
        }),
        (this.on = function (t, n) {
          return "object" === (0, i.default)(t)
            ? (e.each(t, function (t) {
                r.on(t, this);
              }),
              r)
            : (t.split(" ").forEach(function (t) {
                o[t] || (o[t] = []), o[t].push(n);
              }),
              r);
        }),
        (this.off = function (t, e) {
          if (!o[t]) return r;
          if (!e) return delete o[t], r;
          var n = o[t].indexOf(e);
          return (
            -1 !== n &&
              (delete o[t][n],
              (o[t] = o[t].filter(function (t) {
                return t;
              }))),
            r
          );
        }),
        (this.trigger = function (t) {
          var n = "on" + t[0].toUpperCase() + t.slice(1),
            i = Array.prototype.slice.call(arguments, 1);
          r[n] && r[n].apply(r, i);
          var u = o[t];
          return u
            ? (e.each(u, function (t, e) {
                e.apply(r, i);
              }),
              r)
            : r;
        }),
        s();
    };
    (u.prototype.__construct = function () {}),
      (u.prototype.getDefaultSettings = function () {
        return {};
      }),
      (u.prototype.getConstructorID = function () {
        return this.constructor.name;
      }),
      (u.extend = function (t) {
        var e = jQuery,
          n = this,
          r = function child() {
            return n.apply(this, arguments);
          };
        return (
          e.extend(r, n),
          ((r.prototype = (0, o.default)(
            e.extend({}, n.prototype, t)
          )).constructor = r),
          (r.__super__ = n.prototype),
          r
        );
      }),
      (t.exports = u);
  },
  function (t, e, n) {
    "use strict";
    var r = n(0)(n(341));
    t.exports = r.default.extend({
      elements: null,
      getDefaultElements: function getDefaultElements() {
        return {};
      },
      bindEvents: function bindEvents() {},
      onInit: function onInit() {
        this.initElements(), this.bindEvents();
      },
      initElements: function initElements() {
        this.elements = this.getDefaultElements();
      },
    });
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (t, e, n) {
    "use strict";
    var r = n(0);
    n(1)(e, "__esModule", { value: !0 }), (e.default = void 0), n(15);
    var o = r(n(2)),
      i = r(n(3)),
      u = r(n(5)),
      c = r(n(4)),
      s = r(n(21)),
      f = r(n(6)),
      a = (function (t) {
        function _default() {
          return (
            (0, o.default)(this, _default),
            (0, u.default)(
              this,
              (0, c.default)(_default).apply(this, arguments)
            )
          );
        }
        return (
          (0, f.default)(_default, t),
          (0, i.default)(_default, [
            {
              key: "getDefaultSettings",
              value: function getDefaultSettings() {
                return {
                  selectors: {
                    elements: ".elementor-element",
                    nestedDocumentElements: ".elementor .elementor-element",
                  },
                  classes: { editMode: "elementor-edit-mode" },
                };
              },
            },
            {
              key: "getDefaultElements",
              value: function getDefaultElements() {
                var t = this.getSettings("selectors");
                return {
                  $elements: this.$element
                    .find(t.elements)
                    .not(this.$element.find(t.nestedDocumentElements)),
                };
              },
            },
            {
              key: "getDocumentSettings",
              value: function getDocumentSettings(t) {
                var e;
                if (this.isEdit) {
                  e = {};
                  var n = elementor.settings.page.model;
                  jQuery.each(n.getActiveControls(), function (t) {
                    e[t] = n.attributes[t];
                  });
                } else e = this.$element.data("elementor-settings") || {};
                return this.getItems(e, t);
              },
            },
            {
              key: "runElementsHandlers",
              value: function runElementsHandlers() {
                this.elements.$elements.each(function (t, e) {
                  return elementorFrontend.elementsHandler.runReadyTrigger(e);
                });
              },
            },
            {
              key: "onInit",
              value: function onInit() {
                var t = this;
                (this.$element = this.getSettings("$element")),
                  (0, s.default)(
                    (0, c.default)(_default.prototype),
                    "onInit",
                    this
                  ).call(this),
                  (this.isEdit = this.$element.hasClass(
                    this.getSettings("classes.editMode")
                  )),
                  this.isEdit
                    ? elementor.on("document:loaded", function () {
                        elementor.settings.page.model.on(
                          "change",
                          t.onSettingsChange.bind(t)
                        );
                      })
                    : this.runElementsHandlers();
              },
            },
            { key: "onSettingsChange", value: function onSettingsChange() {} },
          ]),
          _default
        );
      })(elementorModules.ViewModule);
    e.default = a;
  },
  ,
  function (t, e, n) {
    "use strict";
    var r = n(0);
    n(1)(e, "__esModule", { value: !0 }), (e.default = void 0);
    var o = r(n(341)),
      i = r(n(342)),
      u = r(n(194)),
      c = r(n(567)),
      s = r(n(568)),
      f = (window.elementorModules = {
        Module: o.default,
        ViewModule: i.default,
        ArgsObject: u.default,
        ForceMethodImplementation: s.default,
        utils: { Masonry: c.default },
      });
    e.default = f;
  },
  function (t, e, n) {
    "use strict";
    var r = n(0),
      o = r(n(126)),
      i = r(n(342));
    t.exports = i.default.extend({
      getDefaultSettings: function getDefaultSettings() {
        return {
          container: null,
          items: null,
          columnsCount: 3,
          verticalSpaceBetween: 30,
        };
      },
      getDefaultElements: function getDefaultElements() {
        return {
          $container: jQuery(this.getSettings("container")),
          $items: jQuery(this.getSettings("items")),
        };
      },
      run: function run() {
        var t = [],
          e = this.elements.$container.position().top,
          n = this.getSettings(),
          r = n.columnsCount;
        (e += (0, o.default)(this.elements.$container.css("margin-top"), 10)),
          this.elements.$items.each(function (i) {
            var u = Math.floor(i / r),
              c = jQuery(this),
              s = c[0].getBoundingClientRect().height + n.verticalSpaceBetween;
            if (u) {
              var f = c.position(),
                a = i % r,
                l = f.top - e - t[a];
              (l -= (0, o.default)(c.css("margin-top"), 10)),
                (l *= -1),
                c.css("margin-top", l + "px"),
                (t[a] += s);
            } else t.push(s);
          });
      },
    });
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    n(1)(e, "__esModule", { value: !0 }),
      (e.default = e.ForceMethodImplementation = void 0),
      n(208),
      n(209),
      n(569),
      n(76);
    var o = r(n(2)),
      i = r(n(5)),
      u = r(n(4)),
      c = r(n(47)),
      s = r(n(6)),
      f = (function (t) {
        function ForceMethodImplementation() {
          var t,
            e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
          return (
            (0, o.default)(this, ForceMethodImplementation),
            (t = (0, i.default)(
              this,
              (0, u.default)(ForceMethodImplementation).call(
                this,
                ""
                  .concat(e.isStatic ? "static " : "")
                  .concat(
                    e.fullName,
                    "() should be implemented, please provide '"
                  )
                  .concat(e.functionName || e.fullName, "' functionality.")
              )
            )),
            Error.captureStackTrace(
              (0, c.default)(t),
              ForceMethodImplementation
            ),
            t
          );
        }
        return (
          (0, s.default)(ForceMethodImplementation, t),
          ForceMethodImplementation
        );
      })((0, r(n(268)).default)(Error));
    e.ForceMethodImplementation = f;
    e.default = function _default() {
      var t = Error().stack.split("\n")[2].trim(),
        e = t.startsWith("at new") ? "constructor" : t.split(" ")[1],
        n = {};
      if (
        ((n.functionName = e), (n.fullName = e), n.functionName.includes("."))
      ) {
        var r = n.functionName.split(".");
        (n.className = r[0]), (n.functionName = r[1]);
      } else n.isStatic = !0;
      throw new f(n);
    };
  },
  function (t, e, n) {
    "use strict";
    var r = n(29),
      o = n(37),
      i = n(210),
      u = "".startsWith;
    r(r.P + r.F * n(211)("startsWith"), "String", {
      startsWith: function startsWith(t) {
        var e = i(this, t, "startsWith"),
          n = o(
            Math.min(arguments.length > 1 ? arguments[1] : void 0, e.length)
          ),
          r = String(t);
        return u ? u.call(e, r, n) : e.slice(n, n + r.length) === r;
      },
    });
  },
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  ,
  function (t, e, n) {
    "use strict";
    var r = n(0),
      o = r(n(566)),
      i = r(n(564)),
      u = r(n(744)),
      c = r(n(745));
    o.default.frontend = {
      Document: i.default,
      tools: { StretchElement: u.default },
      handlers: { Base: c.default },
    };
  },
  function (t, e, n) {
    "use strict";
    t.exports = elementorModules.ViewModule.extend({
      getDefaultSettings: function getDefaultSettings() {
        return {
          element: null,
          direction: elementorFrontend.config.is_rtl ? "right" : "left",
          selectors: { container: window },
        };
      },
      getDefaultElements: function getDefaultElements() {
        return { $element: jQuery(this.getSettings("element")) };
      },
      stretch: function stretch() {
        var t,
          e = this.getSettings("selectors.container");
        try {
          t = jQuery(e);
        } catch (t) {}
        (t && t.length) ||
          (t = jQuery(this.getDefaultSettings().selectors.container)),
          this.reset();
        var n = this.elements.$element,
          r = t.outerWidth(),
          o = n.offset().left,
          i = "fixed" === n.css("position"),
          u = i ? 0 : o;
        if (window !== t[0]) {
          var c = t.offset().left;
          i && (u = c), o > c && (u = o - c);
        }
        i ||
          (elementorFrontend.config.is_rtl && (u = r - (n.outerWidth() + u)),
          (u = -u));
        var s = {};
        (s.width = r + "px"),
          (s[this.getSettings("direction")] = u + "px"),
          n.css(s);
      },
      reset: function reset() {
        var t = { width: "" };
        (t[this.getSettings("direction")] = ""), this.elements.$element.css(t);
      },
    });
  },
  function (t, e, n) {
    "use strict";
    var r = n(0);
    n(214), n(165), n(91), n(76);
    var o = r(n(22));
    n(15),
      (t.exports = elementorModules.ViewModule.extend({
        $element: null,
        editorListeners: null,
        onElementChange: null,
        onEditSettingsChange: null,
        onGeneralSettingsChange: null,
        onPageSettingsChange: null,
        isEdit: null,
        __construct: function __construct(t) {
          (this.$element = t.$element),
            (this.isEdit = this.$element.hasClass(
              "elementor-element-edit-mode"
            )),
            this.isEdit && this.addEditorListeners();
        },
        findElement: function findElement(t) {
          var e = this.$element;
          return e.find(t).filter(function () {
            return jQuery(this).closest(".elementor-element").is(e);
          });
        },
        getUniqueHandlerID: function getUniqueHandlerID(t, e) {
          return (
            t || (t = this.getModelCID()),
            e || (e = this.$element),
            t + e.attr("data-element_type") + this.getConstructorID()
          );
        },
        initEditorListeners: function initEditorListeners() {
          var t = this;
          if (
            ((t.editorListeners = [
              {
                event: "element:destroy",
                to: elementor.channels.data,
                callback: function callback(e) {
                  e.cid === t.getModelCID() && t.onDestroy();
                },
              },
            ]),
            t.onElementChange)
          ) {
            var e = t.getWidgetType() || t.getElementType(),
              n = "change";
            "global" !== e && (n += ":" + e),
              t.editorListeners.push({
                event: n,
                to: elementor.channels.editor,
                callback: function callback(e, n) {
                  t.getUniqueHandlerID(n.model.cid, n.$el) ===
                    t.getUniqueHandlerID() &&
                    t.onElementChange(e.model.get("name"), e, n);
                },
              });
          }
          t.onEditSettingsChange &&
            t.editorListeners.push({
              event: "change:editSettings",
              to: elementor.channels.editor,
              callback: function callback(e, n) {
                n.model.cid === t.getModelCID() &&
                  t.onEditSettingsChange((0, o.default)(e.changed)[0]);
              },
            }),
            ["page", "general"].forEach(function (e) {
              var n = "on" + e[0].toUpperCase() + e.slice(1) + "SettingsChange";
              t[n] &&
                t.editorListeners.push({
                  event: "change",
                  to: elementor.settings[e].model,
                  callback: function callback(e) {
                    t[n](e.changed);
                  },
                });
            });
        },
        getEditorListeners: function getEditorListeners() {
          return (
            this.editorListeners || this.initEditorListeners(),
            this.editorListeners
          );
        },
        addEditorListeners: function addEditorListeners() {
          var t = this.getUniqueHandlerID();
          this.getEditorListeners().forEach(function (e) {
            elementorFrontend.addListenerOnce(t, e.event, e.callback, e.to);
          });
        },
        removeEditorListeners: function removeEditorListeners() {
          var t = this.getUniqueHandlerID();
          this.getEditorListeners().forEach(function (e) {
            elementorFrontend.removeListeners(t, e.event, null, e.to);
          });
        },
        getElementType: function getElementType() {
          return this.$element.data("element_type");
        },
        getWidgetType: function getWidgetType() {
          var t = this.$element.data("widget_type");
          if (t) return t.split(".")[0];
        },
        getID: function getID() {
          return this.$element.data("id");
        },
        getModelCID: function getModelCID() {
          return this.$element.data("model-cid");
        },
        getElementSettings: function getElementSettings(t) {
          var e = {},
            n = this.getModelCID();
          if (this.isEdit && n) {
            var r = elementorFrontend.config.elements.data[n],
              o = r.attributes,
              i = o.widgetType || o.elType;
            o.isInner && (i = "inner-" + i);
            var u = elementorFrontend.config.elements.keys[i];
            u ||
              ((u = elementorFrontend.config.elements.keys[i] = []),
              jQuery.each(r.controls, function (t, e) {
                e.frontend_available && u.push(t);
              })),
              jQuery.each(r.getActiveControls(), function (t) {
                if (-1 !== u.indexOf(t)) {
                  var n = o[t];
                  n.toJSON && (n = n.toJSON()), (e[t] = n);
                }
              });
          } else e = this.$element.data("settings") || {};
          return this.getItems(e, t);
        },
        getEditSettings: function getEditSettings(t) {
          var e = {};
          return (
            this.isEdit &&
              (e =
                elementorFrontend.config.elements.editSettings[
                  this.getModelCID()
                ].attributes),
            this.getItems(e, t)
          );
        },
        getCurrentDeviceSetting: function getCurrentDeviceSetting(t) {
          return elementorFrontend.getCurrentDeviceSetting(
            this.getElementSettings(),
            t
          );
        },
        onDestroy: function onDestroy() {
          this.isEdit && this.removeEditorListeners(),
            this.unbindEvents && this.unbindEvents();
        },
      }));
  },
]);
/*!
 * jQuery UI Position 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
!(function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function (I) {
  return (
    (function () {
      I.ui = I.ui || {};
      var n,
        H,
        x = Math.max,
        T = Math.abs,
        L = Math.round,
        o = /left|center|right/,
        l = /top|center|bottom/,
        f = /[\+\-]\d+(\.[\d]+)?%?/,
        s = /^\w+/,
        h = /%$/,
        i = I.fn.position;
      function P(t, i, e) {
        return [
          parseFloat(t[0]) * (h.test(t[0]) ? i / 100 : 1),
          parseFloat(t[1]) * (h.test(t[1]) ? e / 100 : 1),
        ];
      }
      function D(t, i) {
        return parseInt(I.css(t, i), 10) || 0;
      }
      (I.position = {
        scrollbarWidth: function () {
          if (void 0 !== n) return n;
          var t,
            i,
            e = I(
              "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"
            ),
            o = e.children()[0];
          return (
            I("body").append(e),
            (t = o.offsetWidth),
            e.css("overflow", "scroll"),
            t === (i = o.offsetWidth) && (i = e[0].clientWidth),
            e.remove(),
            (n = t - i)
          );
        },
        getScrollInfo: function (t) {
          var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
            e = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
            o =
              "scroll" === i ||
              ("auto" === i && t.width < t.element[0].scrollWidth);
          return {
            width:
              "scroll" === e ||
              ("auto" === e && t.height < t.element[0].scrollHeight)
                ? I.position.scrollbarWidth()
                : 0,
            height: o ? I.position.scrollbarWidth() : 0,
          };
        },
        getWithinInfo: function (t) {
          var i = I(t || window),
            e = I.isWindow(i[0]),
            o = !!i[0] && 9 === i[0].nodeType;
          return {
            element: i,
            isWindow: e,
            isDocument: o,
            offset: i.offset() || { left: 0, top: 0 },
            scrollLeft: i.scrollLeft(),
            scrollTop: i.scrollTop(),
            width: e || o ? i.width() : i.outerWidth(),
            height: e || o ? i.height() : i.outerHeight(),
          };
        },
      }),
        (I.fn.position = function (c) {
          if (!c || !c.of) return i.apply(this, arguments);
          c = I.extend({}, c);
          var d,
            a,
            g,
            u,
            m,
            t,
            w = I(c.of),
            W = I.position.getWithinInfo(c.within),
            v = I.position.getScrollInfo(W),
            y = (c.collision || "flip").split(" "),
            b = {};
          return (
            (t = (function (t) {
              var i = t[0];
              return 9 === i.nodeType
                ? {
                    width: t.width(),
                    height: t.height(),
                    offset: { top: 0, left: 0 },
                  }
                : I.isWindow(i)
                ? {
                    width: t.width(),
                    height: t.height(),
                    offset: { top: t.scrollTop(), left: t.scrollLeft() },
                  }
                : i.preventDefault
                ? {
                    width: 0,
                    height: 0,
                    offset: { top: i.pageY, left: i.pageX },
                  }
                : {
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    offset: t.offset(),
                  };
            })(w)),
            w[0].preventDefault && (c.at = "left top"),
            (a = t.width),
            (g = t.height),
            (u = t.offset),
            (m = I.extend({}, u)),
            I.each(["my", "at"], function () {
              var t,
                i,
                e = (c[this] || "").split(" ");
              1 === e.length &&
                (e = o.test(e[0])
                  ? e.concat(["center"])
                  : l.test(e[0])
                  ? ["center"].concat(e)
                  : ["center", "center"]),
                (e[0] = o.test(e[0]) ? e[0] : "center"),
                (e[1] = l.test(e[1]) ? e[1] : "center"),
                (t = f.exec(e[0])),
                (i = f.exec(e[1])),
                (b[this] = [t ? t[0] : 0, i ? i[0] : 0]),
                (c[this] = [s.exec(e[0])[0], s.exec(e[1])[0]]);
            }),
            1 === y.length && (y[1] = y[0]),
            "right" === c.at[0]
              ? (m.left += a)
              : "center" === c.at[0] && (m.left += a / 2),
            "bottom" === c.at[1]
              ? (m.top += g)
              : "center" === c.at[1] && (m.top += g / 2),
            (d = P(b.at, a, g)),
            (m.left += d[0]),
            (m.top += d[1]),
            this.each(function () {
              var e,
                t,
                f = I(this),
                s = f.outerWidth(),
                h = f.outerHeight(),
                i = D(this, "marginLeft"),
                o = D(this, "marginTop"),
                n = s + i + D(this, "marginRight") + v.width,
                l = h + o + D(this, "marginBottom") + v.height,
                r = I.extend({}, m),
                p = P(b.my, f.outerWidth(), f.outerHeight());
              "right" === c.my[0]
                ? (r.left -= s)
                : "center" === c.my[0] && (r.left -= s / 2),
                "bottom" === c.my[1]
                  ? (r.top -= h)
                  : "center" === c.my[1] && (r.top -= h / 2),
                (r.left += p[0]),
                (r.top += p[1]),
                H || ((r.left = L(r.left)), (r.top = L(r.top))),
                (e = { marginLeft: i, marginTop: o }),
                I.each(["left", "top"], function (t, i) {
                  I.ui.position[y[t]] &&
                    I.ui.position[y[t]][i](r, {
                      targetWidth: a,
                      targetHeight: g,
                      elemWidth: s,
                      elemHeight: h,
                      collisionPosition: e,
                      collisionWidth: n,
                      collisionHeight: l,
                      offset: [d[0] + p[0], d[1] + p[1]],
                      my: c.my,
                      at: c.at,
                      within: W,
                      elem: f,
                    });
                }),
                c.using &&
                  (t = function (t) {
                    var i = u.left - r.left,
                      e = i + a - s,
                      o = u.top - r.top,
                      n = o + g - h,
                      l = {
                        target: {
                          element: w,
                          left: u.left,
                          top: u.top,
                          width: a,
                          height: g,
                        },
                        element: {
                          element: f,
                          left: r.left,
                          top: r.top,
                          width: s,
                          height: h,
                        },
                        horizontal: e < 0 ? "left" : 0 < i ? "right" : "center",
                        vertical: n < 0 ? "top" : 0 < o ? "bottom" : "middle",
                      };
                    a < s && T(i + e) < a && (l.horizontal = "center"),
                      g < h && T(o + n) < g && (l.vertical = "middle"),
                      x(T(i), T(e)) > x(T(o), T(n))
                        ? (l.important = "horizontal")
                        : (l.important = "vertical"),
                      c.using.call(this, t, l);
                  }),
                f.offset(I.extend(r, { using: t }));
            })
          );
        }),
        (I.ui.position = {
          fit: {
            left: function (t, i) {
              var e,
                o = i.within,
                n = o.isWindow ? o.scrollLeft : o.offset.left,
                l = o.width,
                f = t.left - i.collisionPosition.marginLeft,
                s = n - f,
                h = f + i.collisionWidth - l - n;
              i.collisionWidth > l
                ? 0 < s && h <= 0
                  ? ((e = t.left + s + i.collisionWidth - l - n),
                    (t.left += s - e))
                  : (t.left =
                      0 < h && s <= 0
                        ? n
                        : h < s
                        ? n + l - i.collisionWidth
                        : n)
                : 0 < s
                ? (t.left += s)
                : 0 < h
                ? (t.left -= h)
                : (t.left = x(t.left - f, t.left));
            },
            top: function (t, i) {
              var e,
                o = i.within,
                n = o.isWindow ? o.scrollTop : o.offset.top,
                l = i.within.height,
                f = t.top - i.collisionPosition.marginTop,
                s = n - f,
                h = f + i.collisionHeight - l - n;
              i.collisionHeight > l
                ? 0 < s && h <= 0
                  ? ((e = t.top + s + i.collisionHeight - l - n),
                    (t.top += s - e))
                  : (t.top =
                      0 < h && s <= 0
                        ? n
                        : h < s
                        ? n + l - i.collisionHeight
                        : n)
                : 0 < s
                ? (t.top += s)
                : 0 < h
                ? (t.top -= h)
                : (t.top = x(t.top - f, t.top));
            },
          },
          flip: {
            left: function (t, i) {
              var e,
                o,
                n = i.within,
                l = n.offset.left + n.scrollLeft,
                f = n.width,
                s = n.isWindow ? n.scrollLeft : n.offset.left,
                h = t.left - i.collisionPosition.marginLeft,
                r = h - s,
                p = h + i.collisionWidth - f - s,
                c =
                  "left" === i.my[0]
                    ? -i.elemWidth
                    : "right" === i.my[0]
                    ? i.elemWidth
                    : 0,
                d =
                  "left" === i.at[0]
                    ? i.targetWidth
                    : "right" === i.at[0]
                    ? -i.targetWidth
                    : 0,
                a = -2 * i.offset[0];
              r < 0
                ? ((e = t.left + c + d + a + i.collisionWidth - f - l) < 0 ||
                    e < T(r)) &&
                  (t.left += c + d + a)
                : 0 < p &&
                  (0 <
                    (o =
                      t.left -
                      i.collisionPosition.marginLeft +
                      c +
                      d +
                      a -
                      s) ||
                    T(o) < p) &&
                  (t.left += c + d + a);
            },
            top: function (t, i) {
              var e,
                o,
                n = i.within,
                l = n.offset.top + n.scrollTop,
                f = n.height,
                s = n.isWindow ? n.scrollTop : n.offset.top,
                h = t.top - i.collisionPosition.marginTop,
                r = h - s,
                p = h + i.collisionHeight - f - s,
                c =
                  "top" === i.my[1]
                    ? -i.elemHeight
                    : "bottom" === i.my[1]
                    ? i.elemHeight
                    : 0,
                d =
                  "top" === i.at[1]
                    ? i.targetHeight
                    : "bottom" === i.at[1]
                    ? -i.targetHeight
                    : 0,
                a = -2 * i.offset[1];
              r < 0
                ? ((o = t.top + c + d + a + i.collisionHeight - f - l) < 0 ||
                    o < T(r)) &&
                  (t.top += c + d + a)
                : 0 < p &&
                  (0 <
                    (e =
                      t.top - i.collisionPosition.marginTop + c + d + a - s) ||
                    T(e) < p) &&
                  (t.top += c + d + a);
            },
          },
          flipfit: {
            left: function () {
              I.ui.position.flip.left.apply(this, arguments),
                I.ui.position.fit.left.apply(this, arguments);
            },
            top: function () {
              I.ui.position.flip.top.apply(this, arguments),
                I.ui.position.fit.top.apply(this, arguments);
            },
          },
        }),
        (function () {
          var t,
            i,
            e,
            o,
            n,
            l = document.getElementsByTagName("body")[0],
            f = document.createElement("div");
          for (n in ((t = document.createElement(l ? "div" : "body")),
          (e = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none",
          }),
          l &&
            I.extend(e, {
              position: "absolute",
              left: "-1000px",
              top: "-1000px",
            }),
          e))
            t.style[n] = e[n];
          t.appendChild(f),
            (i = l || document.documentElement).insertBefore(t, i.firstChild),
            (f.style.cssText = "position: absolute; left: 10.7432222px;"),
            (o = I(f).offset().left),
            (H = 10 < o && o < 11),
            (t.innerHTML = ""),
            i.removeChild(t);
        })();
    })(),
    I.ui.position
  );
}); /*! dialogs-manager v4.7.6 | (c) Kobi Zaltzberg | https://github.com/kobizz/dialogs-manager/blob/master/LICENSE.txt 
 2020-02-11 15:22 */
!(function (a, b) {
  "use strict";
  var c = {
    widgetsTypes: {},
    createWidgetType: function (b, d, e) {
      e || (e = this.Widget);
      var f = function () {
          e.apply(this, arguments);
        },
        g = (f.prototype = new e(b));
      return (
        (g.types = g.types.concat([b])),
        a.extend(g, d),
        (g.constructor = f),
        (f.extend = function (a, b) {
          return c.createWidgetType(a, b, f);
        }),
        f
      );
    },
    addWidgetType: function (a, b, c) {
      return b && b.prototype instanceof this.Widget
        ? (this.widgetsTypes[a] = b)
        : (this.widgetsTypes[a] = this.createWidgetType(a, b, c));
    },
    getWidgetType: function (a) {
      return this.widgetsTypes[a];
    },
  };
  (c.Instance = function () {
    var b = this,
      d = {},
      e = {},
      f = function () {
        d.body = a("body");
      },
      g = function (b) {
        var c = {
          classPrefix: "dialog",
          effects: { show: "fadeIn", hide: "fadeOut" },
        };
        a.extend(e, c, b);
      };
    (this.createWidget = function (a, d) {
      var e = c.getWidgetType(a),
        f = new e(a);
      return (d = d || {}), f.init(b, d), f;
    }),
      (this.getSettings = function (a) {
        return a ? e[a] : Object.create(e);
      }),
      (this.init = function (a) {
        return g(a), f(), b;
      }),
      b.init();
  }),
    (c.Widget = function (b) {
      var d = this,
        e = {},
        f = {},
        g = {},
        h = 0,
        i = ["refreshPosition"],
        j = function () {
          var a = [g.window];
          g.iframe && a.push(jQuery(g.iframe[0].contentWindow)),
            a.forEach(function (a) {
              e.hide.onEscKeyPress && a.on("keyup", v),
                e.hide.onOutsideClick && a[0].addEventListener("click", p, !0),
                e.hide.onOutsideContextMenu &&
                  a[0].addEventListener("contextmenu", p, !0),
                e.position.autoRefresh && a.on("resize", d.refreshPosition);
            }),
            (e.hide.onClick || e.hide.onBackgroundClick) &&
              g.widget.on("click", n);
        },
        k = function (b, c) {
          var d = e.effects[b],
            f = g.widget;
          if (a.isFunction(d)) d.apply(f, c);
          else {
            if (!f[d]) throw "Reference Error: The effect " + d + " not found";
            f[d].apply(f, c);
          }
        },
        l = function () {
          var b = i.concat(d.getClosureMethods());
          a.each(b, function () {
            var a = this,
              b = d[a];
            d[a] = function () {
              b.apply(d, arguments);
            };
          });
        },
        m = function (a) {
          if (a.my) {
            var b = /left|right/,
              c = /([+-]\d+)?$/,
              d = g.iframe.offset(),
              e = g.iframe[0].contentWindow,
              f = a.my.split(" "),
              h = [];
            1 === f.length &&
              (b.test(f[0]) ? f.push("center") : f.unshift("center")),
              f.forEach(function (a, b) {
                var f = a.replace(c, function (a) {
                  return (
                    (a = +a || 0),
                    (a += b ? d.top - e.scrollY : d.left - e.scrollX),
                    a >= 0 && (a = "+" + a),
                    a
                  );
                });
                h.push(f);
              }),
              (a.my = h.join(" "));
          }
        },
        n = function (b) {
          if (!t(b)) {
            if (e.hide.onClick) {
              if (a(b.target).closest(e.selectors.preventClose).length) return;
            } else if (b.target !== this) return;
            d.hide();
          }
        },
        o = function (b) {
          return !!e.hide.ignore && !!a(b.target).closest(e.hide.ignore).length;
        },
        p = function (b) {
          t(b) || a(b.target).closest(g.widget).length || o(b) || d.hide();
        },
        q = function () {
          d.addElement("widget"),
            d.addElement("header"),
            d.addElement("message"),
            d.addElement("window", window),
            d.addElement("body", document.body),
            d.addElement("container", e.container),
            e.iframe && d.addElement("iframe", e.iframe),
            e.closeButton &&
              d.addElement(
                "closeButton",
                '<div><i class="' + e.closeButtonClass + '"></i></div>'
              );
          var b = d.getSettings("id");
          b && d.setID(b);
          var c = [];
          a.each(d.types, function () {
            c.push(e.classes.globalPrefix + "-type-" + this);
          }),
            c.push(d.getSettings("className")),
            g.widget.addClass(c.join(" "));
        },
        r = function (c, f) {
          var g = a.extend(!0, {}, c.getSettings());
          (e = {
            headerMessage: "",
            message: "",
            effects: g.effects,
            classes: {
              globalPrefix: g.classPrefix,
              prefix: g.classPrefix + "-" + b,
              preventScroll: g.classPrefix + "-prevent-scroll",
            },
            selectors: { preventClose: "." + g.classPrefix + "-prevent-close" },
            container: "body",
            preventScroll: !1,
            iframe: null,
            closeButton: !1,
            closeButtonClass: g.classPrefix + "-close-button-icon",
            position: {
              element: "widget",
              my: "center",
              at: "center",
              enable: !0,
              autoRefresh: !1,
            },
            hide: {
              auto: !1,
              autoDelay: 5e3,
              onClick: !1,
              onOutsideClick: !0,
              onOutsideContextMenu: !1,
              onBackgroundClick: !0,
              onEscKeyPress: !0,
              ignore: "",
            },
          }),
            a.extend(!0, e, d.getDefaultSettings(), f),
            s();
        },
        s = function () {
          a.each(e, function (a) {
            var b = a.match(/^on([A-Z].*)/);
            b &&
              ((b = b[1].charAt(0).toLowerCase() + b[1].slice(1)),
              d.on(b, this));
          });
        },
        t = function (a) {
          return "click" === a.type && 2 === a.button;
        },
        u = function (a) {
          return a.replace(/([a-z])([A-Z])/g, function () {
            return arguments[1] + "-" + arguments[2].toLowerCase();
          });
        },
        v = function (a) {
          var b = 27,
            c = a.which;
          b === c && d.hide();
        },
        w = function () {
          var a = [g.window];
          g.iframe && a.push(jQuery(g.iframe[0].contentWindow)),
            a.forEach(function (a) {
              e.hide.onEscKeyPress && a.off("keyup", v),
                e.hide.onOutsideClick &&
                  a[0].removeEventListener("click", p, !0),
                e.hide.onOutsideContextMenu &&
                  a[0].removeEventListener("contextmenu", p, !0),
                e.position.autoRefresh && a.off("resize", d.refreshPosition);
            }),
            (e.hide.onClick || e.hide.onBackgroundClick) &&
              g.widget.off("click", n);
        };
      (this.addElement = function (b, c, d) {
        var f = (g[b] = a(c || "<div>")),
          h = u(b);
        return (
          (d = d ? d + " " : ""),
          (d += e.classes.globalPrefix + "-" + h),
          (d += " " + e.classes.prefix + "-" + h),
          f.addClass(d),
          f
        );
      }),
        (this.destroy = function () {
          return w(), g.widget.remove(), d.trigger("destroy"), d;
        }),
        (this.getElements = function (a) {
          return a ? g[a] : g;
        }),
        (this.getSettings = function (a) {
          var b = Object.create(e);
          return a ? b[a] : b;
        }),
        (this.hide = function () {
          if (d.isVisible())
            return (
              clearTimeout(h),
              k("hide", arguments),
              w(),
              e.preventScroll &&
                d.getElements("body").removeClass(e.classes.preventScroll),
              d.trigger("hide"),
              d
            );
        }),
        (this.init = function (a, b) {
          if (!(a instanceof c.Instance))
            throw (
              "The " +
              d.widgetName +
              " must to be initialized from an instance of DialogsManager.Instance"
            );
          return (
            l(),
            d.trigger("init", b),
            r(a, b),
            q(),
            d.buildWidget(),
            d.attachEvents(),
            d.trigger("ready"),
            d
          );
        }),
        (this.isVisible = function () {
          return g.widget.is(":visible");
        }),
        (this.on = function (b, c) {
          if ("object" == typeof b)
            return (
              a.each(b, function (a) {
                d.on(a, this);
              }),
              d
            );
          var e = b.split(" ");
          return (
            e.forEach(function (a) {
              f[a] || (f[a] = []), f[a].push(c);
            }),
            d
          );
        }),
        (this.off = function (a, b) {
          if (!f[a]) return d;
          if (!b) return delete f[a], d;
          var c = f[a].indexOf(b);
          return -1 !== c && f[a].splice(c, 1), d;
        }),
        (this.refreshPosition = function () {
          if (e.position.enable) {
            var b = a.extend({}, e.position);
            g[b.of] && (b.of = g[b.of]),
              b.of || (b.of = window),
              e.iframe && m(b),
              g[b.element].position(b);
          }
        }),
        (this.setID = function (a) {
          return g.widget.attr("id", a), d;
        }),
        (this.setHeaderMessage = function (a) {
          return d.getElements("header").html(a), d;
        }),
        (this.setMessage = function (a) {
          return g.message.html(a), d;
        }),
        (this.setSettings = function (b, c) {
          return (
            jQuery.isPlainObject(c) ? a.extend(!0, e[b], c) : (e[b] = c), d
          );
        }),
        (this.show = function () {
          return (
            clearTimeout(h),
            g.widget.appendTo(g.container).hide(),
            k("show", arguments),
            d.refreshPosition(),
            e.hide.auto && (h = setTimeout(d.hide, e.hide.autoDelay)),
            j(),
            e.preventScroll &&
              d.getElements("body").addClass(e.classes.preventScroll),
            d.trigger("show"),
            d
          );
        }),
        (this.trigger = function (b, c) {
          var e = "on" + b[0].toUpperCase() + b.slice(1);
          d[e] && d[e](c);
          var g = f[b];
          if (g)
            return (
              a.each(g, function (a, b) {
                b.call(d, c);
              }),
              d
            );
        });
    }),
    (c.Widget.prototype.types = []),
    (c.Widget.prototype.buildWidget = function () {
      var a = this.getElements(),
        b = this.getSettings();
      a.widget.append(a.header, a.message),
        this.setHeaderMessage(b.headerMessage),
        this.setMessage(b.message),
        this.getSettings("closeButton") && a.widget.prepend(a.closeButton);
    }),
    (c.Widget.prototype.attachEvents = function () {
      var a = this;
      a.getSettings("closeButton") &&
        a.getElements("closeButton").on("click", function () {
          a.hide();
        });
    }),
    (c.Widget.prototype.getDefaultSettings = function () {
      return {};
    }),
    (c.Widget.prototype.getClosureMethods = function () {
      return [];
    }),
    (c.Widget.prototype.onHide = function () {}),
    (c.Widget.prototype.onShow = function () {}),
    (c.Widget.prototype.onInit = function () {}),
    (c.Widget.prototype.onReady = function () {}),
    (c.widgetsTypes.simple = c.Widget),
    c.addWidgetType("buttons", {
      activeKeyUp: function (a) {
        var b = 9;
        a.which === b && a.preventDefault(),
          this.hotKeys[a.which] && this.hotKeys[a.which](this);
      },
      activeKeyDown: function (a) {
        if (this.focusedButton) {
          var b = 9;
          if (a.which === b) {
            a.preventDefault();
            var c,
              d = this.focusedButton.index();
            a.shiftKey
              ? ((c = d - 1), c < 0 && (c = this.buttons.length - 1))
              : ((c = d + 1), c >= this.buttons.length && (c = 0)),
              (this.focusedButton = this.buttons[c].focus());
          }
        }
      },
      addButton: function (b) {
        var c = this,
          d = c.getSettings(),
          e = jQuery.extend(d.button, b),
          f = b.classes ? b.classes + " " : "";
        f += d.classes.globalPrefix + "-button";
        var g = c.addElement(b.name, a("<" + e.tag + ">").text(b.text), f);
        c.buttons.push(g);
        var h = function () {
          d.hide.onButtonClick && c.hide(),
            a.isFunction(b.callback) && b.callback.call(this, c);
        };
        return (
          g.on("click", h),
          b.hotKey && (this.hotKeys[b.hotKey] = h),
          this.getElements("buttonsWrapper").append(g),
          b.focus && (this.focusedButton = g),
          c
        );
      },
      bindHotKeys: function () {
        this.getElements("window").on({
          keyup: this.activeKeyUp,
          keydown: this.activeKeyDown,
        });
      },
      buildWidget: function () {
        c.Widget.prototype.buildWidget.apply(this, arguments);
        var a = this.addElement("buttonsWrapper");
        this.getElements("widget").append(a);
      },
      getClosureMethods: function () {
        return ["activeKeyUp", "activeKeyDown"];
      },
      getDefaultSettings: function () {
        return { hide: { onButtonClick: !0 }, button: { tag: "button" } };
      },
      onHide: function () {
        this.unbindHotKeys();
      },
      onInit: function () {
        (this.buttons = []), (this.hotKeys = {}), (this.focusedButton = null);
      },
      onShow: function () {
        this.bindHotKeys(),
          this.focusedButton || (this.focusedButton = this.buttons[0]),
          this.focusedButton && this.focusedButton.focus();
      },
      unbindHotKeys: function () {
        this.getElements("window").off({
          keyup: this.activeKeyUp,
          keydown: this.activeKeyDown,
        });
      },
    }),
    c.addWidgetType(
      "lightbox",
      c.getWidgetType("buttons").extend("lightbox", {
        getDefaultSettings: function () {
          var b = c
            .getWidgetType("buttons")
            .prototype.getDefaultSettings.apply(this, arguments);
          return a.extend(!0, b, {
            contentWidth: "auto",
            contentHeight: "auto",
            position: {
              element: "widgetContent",
              of: "widget",
              autoRefresh: !0,
            },
          });
        },
        buildWidget: function () {
          c.getWidgetType("buttons").prototype.buildWidget.apply(
            this,
            arguments
          );
          var a = this.addElement("widgetContent"),
            b = this.getElements();
          a.append(b.header, b.message, b.buttonsWrapper),
            b.widget.html(a),
            b.closeButton && a.prepend(b.closeButton);
        },
        onReady: function () {
          var a = this.getElements(),
            b = this.getSettings();
          "auto" !== b.contentWidth && a.message.width(b.contentWidth),
            "auto" !== b.contentHeight && a.message.height(b.contentHeight);
        },
      })
    ),
    c.addWidgetType(
      "confirm",
      c.getWidgetType("lightbox").extend("confirm", {
        onReady: function () {
          c.getWidgetType("lightbox").prototype.onReady.apply(this, arguments);
          var a = this.getSettings("strings"),
            b = "cancel" === this.getSettings("defaultOption");
          this.addButton({
            name: "cancel",
            text: a.cancel,
            callback: function (a) {
              a.trigger("cancel");
            },
            focus: b,
          }),
            this.addButton({
              name: "ok",
              text: a.confirm,
              callback: function (a) {
                a.trigger("confirm");
              },
              focus: !b,
            });
        },
        getDefaultSettings: function () {
          var a = c
            .getWidgetType("lightbox")
            .prototype.getDefaultSettings.apply(this, arguments);
          return (
            (a.strings = { confirm: "OK", cancel: "Cancel" }),
            (a.defaultOption = "cancel"),
            a
          );
        },
      })
    ),
    c.addWidgetType(
      "alert",
      c.getWidgetType("lightbox").extend("alert", {
        onReady: function () {
          c.getWidgetType("lightbox").prototype.onReady.apply(this, arguments);
          var a = this.getSettings("strings");
          this.addButton({
            name: "ok",
            text: a.confirm,
            callback: function (a) {
              a.trigger("confirm");
            },
          });
        },
        getDefaultSettings: function () {
          var a = c
            .getWidgetType("lightbox")
            .prototype.getDefaultSettings.apply(this, arguments);
          return (a.strings = { confirm: "OK" }), a;
        },
      })
    ),
    (b.DialogsManager = c);
})(
  "undefined" != typeof jQuery
    ? jQuery
    : "function" == typeof require && require("jquery"),
  "undefined" != typeof module ? module.exports : window
);
!(function () {
  "use strict";
  function Waypoint(options) {
    if (!options) throw new Error("No options passed to Waypoint constructor");
    if (!options.element)
      throw new Error("No element option passed to Waypoint constructor");
    if (!options.handler)
      throw new Error("No handler option passed to Waypoint constructor");
    (this.key = "waypoint-" + keyCounter),
      (this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options)),
      (this.element = this.options.element),
      (this.adapter = new Waypoint.Adapter(this.element)),
      (this.callback = options.handler),
      (this.axis = this.options.horizontal ? "horizontal" : "vertical"),
      (this.enabled = this.options.enabled),
      (this.triggerPoint = null),
      (this.group = Waypoint.Group.findOrCreate({
        name: this.options.group,
        axis: this.axis,
      })),
      (this.context = Waypoint.Context.findOrCreateByElement(
        this.options.context
      )),
      Waypoint.offsetAliases[this.options.offset] &&
        (this.options.offset = Waypoint.offsetAliases[this.options.offset]),
      this.group.add(this),
      this.context.add(this),
      (allWaypoints[this.key] = this),
      (keyCounter += 1);
  }
  var keyCounter = 0,
    allWaypoints = {};
  (Waypoint.prototype.queueTrigger = function (direction) {
    this.group.queueTrigger(this, direction);
  }),
    (Waypoint.prototype.trigger = function (args) {
      this.enabled && this.callback && this.callback.apply(this, args);
    }),
    (Waypoint.prototype.destroy = function () {
      this.context.remove(this),
        this.group.remove(this),
        delete allWaypoints[this.key];
    }),
    (Waypoint.prototype.disable = function () {
      return (this.enabled = !1), this;
    }),
    (Waypoint.prototype.enable = function () {
      return this.context.refresh(), (this.enabled = !0), this;
    }),
    (Waypoint.prototype.next = function () {
      return this.group.next(this);
    }),
    (Waypoint.prototype.previous = function () {
      return this.group.previous(this);
    }),
    (Waypoint.invokeAll = function (method) {
      var allWaypointsArray = [];
      for (var waypointKey in allWaypoints)
        allWaypointsArray.push(allWaypoints[waypointKey]);
      for (var i = 0, end = allWaypointsArray.length; i < end; i++)
        allWaypointsArray[i][method]();
    }),
    (Waypoint.destroyAll = function () {
      Waypoint.invokeAll("destroy");
    }),
    (Waypoint.disableAll = function () {
      Waypoint.invokeAll("disable");
    }),
    (Waypoint.enableAll = function () {
      Waypoint.Context.refreshAll();
      for (var waypointKey in allWaypoints)
        allWaypoints[waypointKey].enabled = !0;
      return this;
    }),
    (Waypoint.refreshAll = function () {
      Waypoint.Context.refreshAll();
    }),
    (Waypoint.viewportHeight = function () {
      return window.innerHeight || document.documentElement.clientHeight;
    }),
    (Waypoint.viewportWidth = function () {
      return document.documentElement.clientWidth;
    }),
    (Waypoint.adapters = []),
    (Waypoint.defaults = {
      context: window,
      continuous: !0,
      enabled: !0,
      group: "default",
      horizontal: !1,
      offset: 0,
    }),
    (Waypoint.offsetAliases = {
      "bottom-in-view": function () {
        return this.context.innerHeight() - this.adapter.outerHeight();
      },
      "right-in-view": function () {
        return this.context.innerWidth() - this.adapter.outerWidth();
      },
    }),
    (window.Waypoint = Waypoint);
})(),
  (function () {
    "use strict";
    function requestAnimationFrameShim(callback) {
      window.setTimeout(callback, 1e3 / 60);
    }
    function Context(element) {
      (this.element = element),
        (this.Adapter = Waypoint.Adapter),
        (this.adapter = new this.Adapter(element)),
        (this.key = "waypoint-context-" + keyCounter),
        (this.didScroll = !1),
        (this.didResize = !1),
        (this.oldScroll = {
          x: this.adapter.scrollLeft(),
          y: this.adapter.scrollTop(),
        }),
        (this.waypoints = { vertical: {}, horizontal: {} }),
        (element.waypointContextKey = this.key),
        (contexts[element.waypointContextKey] = this),
        (keyCounter += 1),
        Waypoint.windowContext ||
          ((Waypoint.windowContext = !0),
          (Waypoint.windowContext = new Context(window))),
        this.createThrottledScrollHandler(),
        this.createThrottledResizeHandler();
    }
    var keyCounter = 0,
      contexts = {},
      Waypoint = window.Waypoint,
      oldWindowLoad = window.onload;
    (Context.prototype.add = function (waypoint) {
      var axis = waypoint.options.horizontal ? "horizontal" : "vertical";
      (this.waypoints[axis][waypoint.key] = waypoint), this.refresh();
    }),
      (Context.prototype.checkEmpty = function () {
        var horizontalEmpty = this.Adapter.isEmptyObject(
            this.waypoints.horizontal
          ),
          verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical),
          isWindow = this.element == this.element.window;
        horizontalEmpty &&
          verticalEmpty &&
          !isWindow &&
          (this.adapter.off(".waypoints"), delete contexts[this.key]);
      }),
      (Context.prototype.createThrottledResizeHandler = function () {
        function resizeHandler() {
          self.handleResize(), (self.didResize = !1);
        }
        var self = this;
        this.adapter.on("resize.waypoints", function () {
          self.didResize ||
            ((self.didResize = !0),
            Waypoint.requestAnimationFrame(resizeHandler));
        });
      }),
      (Context.prototype.createThrottledScrollHandler = function () {
        function scrollHandler() {
          self.handleScroll(), (self.didScroll = !1);
        }
        var self = this;
        this.adapter.on("scroll.waypoints", function () {
          (self.didScroll && !Waypoint.isTouch) ||
            ((self.didScroll = !0),
            Waypoint.requestAnimationFrame(scrollHandler));
        });
      }),
      (Context.prototype.handleResize = function () {
        Waypoint.Context.refreshAll();
      }),
      (Context.prototype.handleScroll = function () {
        var triggeredGroups = {},
          axes = {
            horizontal: {
              newScroll: this.adapter.scrollLeft(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
            },
            vertical: {
              newScroll: this.adapter.scrollTop(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
            },
          };
        for (var axisKey in axes) {
          var axis = axes[axisKey],
            isForward = axis.newScroll > axis.oldScroll,
            direction = isForward ? axis.forward : axis.backward;
          for (var waypointKey in this.waypoints[axisKey]) {
            var waypoint = this.waypoints[axisKey][waypointKey];
            if (null !== waypoint.triggerPoint) {
              var wasBeforeTriggerPoint =
                  axis.oldScroll < waypoint.triggerPoint,
                nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint,
                crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint,
                crossedBackward =
                  !wasBeforeTriggerPoint && !nowAfterTriggerPoint;
              (crossedForward || crossedBackward) &&
                (waypoint.queueTrigger(direction),
                (triggeredGroups[waypoint.group.id] = waypoint.group));
            }
          }
        }
        for (var groupKey in triggeredGroups)
          triggeredGroups[groupKey].flushTriggers();
        this.oldScroll = {
          x: axes.horizontal.newScroll,
          y: axes.vertical.newScroll,
        };
      }),
      (Context.prototype.innerHeight = function () {
        return this.element == this.element.window
          ? Waypoint.viewportHeight()
          : this.adapter.innerHeight();
      }),
      (Context.prototype.remove = function (waypoint) {
        delete this.waypoints[waypoint.axis][waypoint.key], this.checkEmpty();
      }),
      (Context.prototype.innerWidth = function () {
        return this.element == this.element.window
          ? Waypoint.viewportWidth()
          : this.adapter.innerWidth();
      }),
      (Context.prototype.destroy = function () {
        var allWaypoints = [];
        for (var axis in this.waypoints)
          for (var waypointKey in this.waypoints[axis])
            allWaypoints.push(this.waypoints[axis][waypointKey]);
        for (var i = 0, end = allWaypoints.length; i < end; i++)
          allWaypoints[i].destroy();
      }),
      (Context.prototype.refresh = function () {
        var axes,
          isWindow = this.element == this.element.window,
          contextOffset = isWindow ? void 0 : this.adapter.offset(),
          triggeredGroups = {};
        this.handleScroll(),
          (axes = {
            horizontal: {
              contextOffset: isWindow ? 0 : contextOffset.left,
              contextScroll: isWindow ? 0 : this.oldScroll.x,
              contextDimension: this.innerWidth(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
              offsetProp: "left",
            },
            vertical: {
              contextOffset: isWindow ? 0 : contextOffset.top,
              contextScroll: isWindow ? 0 : this.oldScroll.y,
              contextDimension: this.innerHeight(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
              offsetProp: "top",
            },
          });
        for (var axisKey in axes) {
          var axis = axes[axisKey];
          for (var waypointKey in this.waypoints[axisKey]) {
            var contextModifier,
              wasBeforeScroll,
              nowAfterScroll,
              triggeredBackward,
              triggeredForward,
              waypoint = this.waypoints[axisKey][waypointKey],
              adjustment = waypoint.options.offset,
              oldTriggerPoint = waypoint.triggerPoint,
              elementOffset = 0,
              freshWaypoint = null == oldTriggerPoint;
            waypoint.element !== waypoint.element.window &&
              (elementOffset = waypoint.adapter.offset()[axis.offsetProp]),
              "function" == typeof adjustment
                ? (adjustment = adjustment.apply(waypoint))
                : "string" == typeof adjustment &&
                  ((adjustment = parseFloat(adjustment)),
                  waypoint.options.offset.indexOf("%") > -1 &&
                    (adjustment = Math.ceil(
                      (axis.contextDimension * adjustment) / 100
                    ))),
              (contextModifier = axis.contextScroll - axis.contextOffset),
              (waypoint.triggerPoint = Math.floor(
                elementOffset + contextModifier - adjustment
              )),
              (wasBeforeScroll = oldTriggerPoint < axis.oldScroll),
              (nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll),
              (triggeredBackward = wasBeforeScroll && nowAfterScroll),
              (triggeredForward = !wasBeforeScroll && !nowAfterScroll),
              !freshWaypoint && triggeredBackward
                ? (waypoint.queueTrigger(axis.backward),
                  (triggeredGroups[waypoint.group.id] = waypoint.group))
                : !freshWaypoint && triggeredForward
                ? (waypoint.queueTrigger(axis.forward),
                  (triggeredGroups[waypoint.group.id] = waypoint.group))
                : freshWaypoint &&
                  axis.oldScroll >= waypoint.triggerPoint &&
                  (waypoint.queueTrigger(axis.forward),
                  (triggeredGroups[waypoint.group.id] = waypoint.group));
          }
        }
        return (
          Waypoint.requestAnimationFrame(function () {
            for (var groupKey in triggeredGroups)
              triggeredGroups[groupKey].flushTriggers();
          }),
          this
        );
      }),
      (Context.findOrCreateByElement = function (element) {
        return Context.findByElement(element) || new Context(element);
      }),
      (Context.refreshAll = function () {
        for (var contextId in contexts) contexts[contextId].refresh();
      }),
      (Context.findByElement = function (element) {
        return contexts[element.waypointContextKey];
      }),
      (window.onload = function () {
        oldWindowLoad && oldWindowLoad(), Context.refreshAll();
      }),
      (Waypoint.requestAnimationFrame = function (callback) {
        var requestFn =
          window.requestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          requestAnimationFrameShim;
        requestFn.call(window, callback);
      }),
      (Waypoint.Context = Context);
  })(),
  (function () {
    "use strict";
    function byTriggerPoint(a, b) {
      return a.triggerPoint - b.triggerPoint;
    }
    function byReverseTriggerPoint(a, b) {
      return b.triggerPoint - a.triggerPoint;
    }
    function Group(options) {
      (this.name = options.name),
        (this.axis = options.axis),
        (this.id = this.name + "-" + this.axis),
        (this.waypoints = []),
        this.clearTriggerQueues(),
        (groups[this.axis][this.name] = this);
    }
    var groups = { vertical: {}, horizontal: {} },
      Waypoint = window.Waypoint;
    (Group.prototype.add = function (waypoint) {
      this.waypoints.push(waypoint);
    }),
      (Group.prototype.clearTriggerQueues = function () {
        this.triggerQueues = { up: [], down: [], left: [], right: [] };
      }),
      (Group.prototype.flushTriggers = function () {
        for (var direction in this.triggerQueues) {
          var waypoints = this.triggerQueues[direction],
            reverse = "up" === direction || "left" === direction;
          waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint);
          for (var i = 0, end = waypoints.length; i < end; i += 1) {
            var waypoint = waypoints[i];
            (waypoint.options.continuous || i === waypoints.length - 1) &&
              waypoint.trigger([direction]);
          }
        }
        this.clearTriggerQueues();
      }),
      (Group.prototype.next = function (waypoint) {
        this.waypoints.sort(byTriggerPoint);
        var index = Waypoint.Adapter.inArray(waypoint, this.waypoints),
          isLast = index === this.waypoints.length - 1;
        return isLast ? null : this.waypoints[index + 1];
      }),
      (Group.prototype.previous = function (waypoint) {
        this.waypoints.sort(byTriggerPoint);
        var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);
        return index ? this.waypoints[index - 1] : null;
      }),
      (Group.prototype.queueTrigger = function (waypoint, direction) {
        this.triggerQueues[direction].push(waypoint);
      }),
      (Group.prototype.remove = function (waypoint) {
        var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);
        index > -1 && this.waypoints.splice(index, 1);
      }),
      (Group.prototype.first = function () {
        return this.waypoints[0];
      }),
      (Group.prototype.last = function () {
        return this.waypoints[this.waypoints.length - 1];
      }),
      (Group.findOrCreate = function (options) {
        return groups[options.axis][options.name] || new Group(options);
      }),
      (Waypoint.Group = Group);
  })(),
  (function () {
    "use strict";
    function JQueryAdapter(element) {
      this.$element = $(element);
    }
    var $ = window.jQuery,
      Waypoint = window.Waypoint;
    $.each(
      [
        "innerHeight",
        "innerWidth",
        "off",
        "offset",
        "on",
        "outerHeight",
        "outerWidth",
        "scrollLeft",
        "scrollTop",
      ],
      function (i, method) {
        JQueryAdapter.prototype[method] = function () {
          var args = Array.prototype.slice.call(arguments);
          return this.$element[method].apply(this.$element, args);
        };
      }
    ),
      $.each(["extend", "inArray", "isEmptyObject"], function (i, method) {
        JQueryAdapter[method] = $[method];
      }),
      Waypoint.adapters.push({ name: "jquery", Adapter: JQueryAdapter }),
      (Waypoint.Adapter = JQueryAdapter);
  })(),
  (function () {
    "use strict";
    function createExtension(framework) {
      return function () {
        var waypoints = [],
          overrides = arguments[0];
        return (
          framework.isFunction(arguments[0]) &&
            ((overrides = framework.extend({}, arguments[1])),
            (overrides.handler = arguments[0])),
          this.each(function () {
            var options = framework.extend({}, overrides, { element: this });
            "string" == typeof options.context &&
              (options.context = framework(this).closest(options.context)[0]),
              waypoints.push(new Waypoint(options));
          }),
          waypoints
        );
      };
    }
    var Waypoint = window.Waypoint;
    window.jQuery &&
      (window.jQuery.fn.elementorWaypoint = createExtension(window.jQuery)),
      window.Zepto &&
        (window.Zepto.fn.elementorWaypoint = createExtension(window.Zepto));
  })();
(function (a) {
  (window.ShareLink = function (b, c) {
    var d,
      e = {},
      f = function (a) {
        var b = a.substr(0, e.classPrefixLength);
        return b === e.classPrefix ? a.substr(e.classPrefixLength) : null;
      },
      g = function (a) {
        d.on("click", function () {
          h(a);
        });
      },
      h = function (a) {
        var b = "";
        if (e.width && e.height) {
          var c = screen.width / 2 - e.width / 2,
            d = screen.height / 2 - e.height / 2;
          b =
            "toolbar=0,status=0,width=" +
            e.width +
            ",height=" +
            e.height +
            ",top=" +
            d +
            ",left=" +
            c;
        }
        var f = ShareLink.getNetworkLink(a, e),
          g = /^https?:\/\//.test(f),
          h = g ? "" : "_self";
        open(f, h, b);
      },
      i = function () {
        a.each(b.classList, function () {
          var a = f(this);
          if (a) return g(a), !1;
        });
      },
      j = function () {
        a.extend(e, ShareLink.defaultSettings, c),
          ["title", "text"].forEach(function (a) {
            e[a] = e[a].replace("#", "");
          }),
          (e.classPrefixLength = e.classPrefix.length);
      },
      k = function () {
        d = a(b);
      };
    (function () {
      j(), k(), i();
    })();
  }),
    (ShareLink.networkTemplates = {
      twitter: "https://twitter.com/intent/tweet?text={text}{url}",
      pinterest:
        "https://www.pinterest.com/pin/create/button/?url={url}&media={image}",
      facebook: "https://www.facebook.com/sharer.php?u={url}",
      vk:
        "https://vkontakte.ru/share.php?url={url}&title={title}&description={text}&image={image}",
      linkedin:
        "https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={text}&source={url}",
      odnoklassniki:
        "https://connect.ok.ru/offer?url={url}&title={title}&imageUrl={image}",
      tumblr: "https://tumblr.com/share/link?url={url}",
      delicious: "https://del.icio.us/save?url={url}&title={title}",
      google: "https://plus.google.com/share?url={url}",
      digg: "https://digg.com/submit?url={url}",
      reddit: "https://reddit.com/submit?url={url}&title={title}",
      stumbleupon: "https://www.stumbleupon.com/submit?url={url}",
      pocket: "https://getpocket.com/edit?url={url}",
      whatsapp: "https://api.whatsapp.com/send?text=*{title}*\n{text}\n{url}",
      xing: "https://www.xing.com/app/user?op=share&url={url}",
      print: "javascript:print()",
      email: "mailto:?subject={title}&body={text}\n{url}",
      telegram: "https://telegram.me/share/url?url={url}&text={text}",
      skype: "https://web.skype.com/share?url={url}",
    }),
    (ShareLink.defaultSettings = {
      title: "",
      text: "",
      image: "",
      url: location.href,
      classPrefix: "s_",
      width: 640,
      height: 480,
    }),
    (ShareLink.getNetworkLink = function (a, b) {
      var c = ShareLink.networkTemplates[a].replace(
        /{([^}]+)}/g,
        function (a, c) {
          return b[c] || "";
        }
      );
      if ("email" === a) {
        if (-1 < b.title.indexOf("&") || -1 < b.text.indexOf("&")) {
          var d = {
            text: b.text.replace(/&/g, "%26"),
            title: b.title.replace(/&/g, "%26"),
            url: b.url,
          };
          c = ShareLink.networkTemplates[a].replace(
            /{([^}]+)}/g,
            function (a, b) {
              return d[b];
            }
          );
        }
        return (
          c.indexOf("?subject=&body") && (c = c.replace("subject=&", "")), c
        );
      }
      return c;
    }),
    (a.fn.shareLink = function (b) {
      return this.each(function () {
        a(this).data("shareLink", new ShareLink(this, b));
      });
    });
})(jQuery);
