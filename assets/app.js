/* =========================================================
   BSH International — "Gallery" theme chrome + i18n (5 languages)
   Requires: assets/i18n.js (window.I18N, window.I18N_LANGS)
   ========================================================= */
(function () {
  "use strict";

  var LANG_KEY = "bsh-lang";
  var LANGS = window.I18N_LANGS || [{ code: "ko", label: "한국어", short: "KO" }];
  var DICT = window.I18N || {};

  function supported(l) { for (var i = 0; i < LANGS.length; i++) if (LANGS[i].code === l) return true; return false; }
  function getLang() {
    try { var l = localStorage.getItem(LANG_KEY); if (l && supported(l)) return l; } catch (e) {}
    return "ko";
  }
  function setLang(l) { try { localStorage.setItem(LANG_KEY, l); } catch (e) {} }
  function t(key, lang) {
    var e = DICT[key]; if (!e) return key;
    return e[lang] != null ? e[lang] : (e.ko != null ? e.ko : key);
  }

  var NAV = [
    ["index.html",      "nav.home"],
    ["about.html",      "nav.about"],
    ["medical.html",    "nav.medical"],
    ["export.html",     "nav.export"],
    ["consulting.html", "nav.consulting"],
    ["contact.html",    "nav.contact"]
  ];

  function current() { var p = location.pathname.split("/").pop(); return p && p.length ? p : "index.html"; }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }

  function buildNav() {
    var here = current();

    var links = NAV.map(function (n) {
      var active = n[0] === here ? " active" : "";
      return '<a href="' + n[0] + '" class="' + active.trim() + '" data-i18n="' + n[1] + '"></a>';
    }).join("");

    var langOptions = LANGS.map(function (L) {
      return '<button class="lang-item" data-lang="' + L.code + '" role="option">' +
               '<span class="lang-short">' + L.short + '</span><span class="lang-label">' + L.label + '</span>' +
             '</button>';
    }).join("");

    var gnav = el("header", { "class": "global-nav" });
    gnav.innerHTML =
      '<div class="gnav-inner">' +
        '<a class="gnav-brand" href="index.html"><span class="dot"></span>BSH<small>International</small></a>' +
        '<nav class="gnav-links" id="gnavLinks">' + links + '</nav>' +
        '<div class="gnav-right">' +
          '<div class="lang-select" id="langSelect">' +
            '<button class="lang-toggle" id="langToggle" aria-haspopup="listbox" aria-expanded="false" aria-label="Language">' +
              '<span id="langCurrent">KO</span>' +
              '<svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' +
            '</button>' +
            '<div class="lang-menu" id="langMenu" role="listbox">' + langOptions + '</div>' +
          '</div>' +
          '<button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</div>';

    // sub-nav (frosted)
    var titleKey = document.body.getAttribute("data-subnav-key") || "nav.home";
    var sub = el("div", { "class": "sub-nav" });
    sub.innerHTML =
      '<div class="subnav-inner">' +
        '<span class="subnav-title" data-i18n="' + titleKey + '"></span>' +
        '<div class="subnav-right">' +
          '<a class="subnav-link" href="about.html" data-i18n="common.overview"></a>' +
          '<a class="btn btn-primary btn-sm" href="contact.html" data-i18n="cta.consult"></a>' +
        '</div>' +
      '</div>';

    document.body.insertBefore(sub, document.body.firstChild);
    document.body.insertBefore(gnav, document.body.firstChild);
  }

  function buildFooter() {
    var f = el("footer", { "class": "footer" });
    f.innerHTML =
      '<div class="footer-inner">' +
        '<div class="footer-wordmark">BSH</div>' +
        '<div class="footer-grid">' +
          '<div class="footer-col">' +
            '<h4 data-i18n="footer.company_h"></h4>' +
            '<p data-i18n="footer.company_name"></p>' +
            '<p data-i18n="footer.company_type"></p>' +
            '<p data-i18n="footer.company_addr"></p>' +
            '<p data-i18n="footer.company_reg"></p>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4 data-i18n="footer.explore_h"></h4>' +
            '<a href="about.html" data-i18n="nav.about"></a>' +
            '<a href="medical.html" data-i18n="nav.medical"></a>' +
            '<a href="export.html" data-i18n="nav.export"></a>' +
            '<a href="consulting.html" data-i18n="nav.consulting"></a>' +
            '<a href="contact.html" data-i18n="nav.contact"></a>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4 data-i18n="footer.biz_h"></h4>' +
            '<a href="medical.html" data-i18n="home.biz1_t"></a>' +
            '<a href="export.html" data-i18n="home.biz2_t"></a>' +
            '<a href="consulting.html" data-i18n="home.biz3_t"></a>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4 data-i18n="footer.contact_h"></h4>' +
            '<a href="tel:+821039139380">+82-10-3913-9380</a>' +
            '<a href="mailto:ookokoro@bshinternational.co.kr">ookokoro@bshinternational.co.kr</a>' +
            '<p data-i18n="footer.langs"></p>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span data-i18n="footer.copyright">© 2026 BSH International Co., Ltd.</span>' +
          '<span data-i18n="footer.bottom_note"></span>' +
        '</div>' +
      '</div>';
    document.body.appendChild(f);
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var v = t(nodes[i].getAttribute("data-i18n"), lang);
      if (v != null) nodes[i].textContent = v;
    }
    var ph = document.querySelectorAll("[data-i18n-ph]");
    for (var j = 0; j < ph.length; j++) {
      var pv = t(ph[j].getAttribute("data-i18n-ph"), lang);
      if (pv != null) ph[j].setAttribute("placeholder", pv);
    }
    var tkey = document.body.getAttribute("data-title-key");
    if (tkey) { var tv = t(tkey, lang); if (tv) document.title = tv; }
    var cur = document.getElementById("langCurrent");
    if (cur) for (var k = 0; k < LANGS.length; k++) if (LANGS[k].code === lang) { cur.textContent = LANGS[k].short; break; }
    var items = document.querySelectorAll(".lang-item");
    for (var m = 0; m < items.length; m++) items[m].classList.toggle("active", items[m].getAttribute("data-lang") === lang);
  }

  function init() {
    buildNav();
    buildFooter();

    var lang = getLang();
    applyLang(lang);

    var select = document.getElementById("langSelect");
    var toggle = document.getElementById("langToggle");
    var menu = document.getElementById("langMenu");
    if (select && toggle && menu) {
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = select.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      menu.querySelectorAll(".lang-item").forEach(function (b) {
        b.addEventListener("click", function () {
          lang = b.getAttribute("data-lang");
          setLang(lang); applyLang(lang);
          select.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
      document.addEventListener("click", function () {
        select.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    }

    var burger = document.getElementById("hamburger");
    var glinks = document.getElementById("gnavLinks");
    if (burger && glinks) {
      burger.addEventListener("click", function (e) {
        e.stopPropagation();
        glinks.classList.toggle("open");
      });
    }

    // contact form → FormSubmit.co (AJAX); keeps the in-page thank-you message
    var form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = document.getElementById("formSuccess");
        var btn = form.querySelector('button[type="submit"]') || form.querySelector("button");
        var action = form.getAttribute("action");
        function showOk() {
          if (ok) { ok.classList.add("show"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
          form.reset();
        }
        if (!action) { showOk(); return; }
        var data = {};
        new FormData(form).forEach(function (v, k) { data[k] = v; });
        if (data._honey) { showOk(); return; } // bot trap
        var endpoint = action.indexOf("/ajax/") !== -1 ? action : action.replace("formsubmit.co/", "formsubmit.co/ajax/");
        if (btn) btn.disabled = true;
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(data)
        })
          .then(function (r) { return r.json(); })
          .then(function () { showOk(); })
          .catch(function () { alert(t("contact.send_error", getLang())); })
          .then(function () { if (btn) btn.disabled = false; });
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
