/* =========================================================
   BSH International — shared chrome + i18n
   ========================================================= */
(function () {
  "use strict";

  var LANG_KEY = "bsh-lang";
  function getLang() {
    try { return localStorage.getItem(LANG_KEY) || "ko"; } catch (e) { return "ko"; }
  }
  function setLang(l) {
    try { localStorage.setItem(LANG_KEY, l); } catch (e) {}
  }

  /* ---- Nav config: [href, KO, EN] ---- */
  var NAV = [
    ["index.html",    "홈",        "Home"],
    ["about.html",    "회사 소개",  "About"],
    ["fields.html",   "유치 분야",  "Treatments"],
    ["services.html", "서비스",     "Services"],
    ["contact.html",  "상담 신청",  "Contact"]
  ];

  /* ---- Marquee items ---- */
  var MARQUEE = [
    "JAPAN", "CHINA", "MONGOLIA", "K-MEDICAL",
    "PLASTIC & DERMATOLOGY", "HEALTH SCREENING",
    "CANCER & CRITICAL CARE", "OPHTHALMOLOGY", "ONE-STOP CARE"
  ];

  function current() {
    var p = location.pathname.split("/").pop();
    return p && p.length ? p : "index.html";
  }

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }

  /* ---------- Build Nav ---------- */
  function buildNav() {
    var here = current();
    var nav = el("header", { "class": "nav" });

    var linksHtml = NAV.map(function (n) {
      var active = n[0] === here ? " active" : "";
      return '<a href="' + n[0] + '" class="' + active.trim() + '" data-ko="' + n[1] + '" data-en="' + n[2] + '">' + n[1] + "</a>";
    }).join("");

    nav.innerHTML =
      '<div class="nav-inner">' +
        '<a class="brand" href="index.html"><span class="dot"></span>BSH<span style="font-weight:330;color:#888;font-size:15px;margin-left:2px">International</span></a>' +
        '<nav class="nav-links">' + linksHtml + "</nav>" +
        '<div class="nav-right">' +
          '<button class="lang-toggle" id="langToggle" aria-label="Language"></button>' +
          '<div class="nav-cta">' +
            '<a class="btn btn-secondary" href="about.html" data-ko="회사 소개" data-en="About us">회사 소개</a>' +
            '<a class="btn btn-primary" href="contact.html" data-ko="상담 신청" data-en="Get started">상담 신청</a>' +
          "</div>" +
          '<button class="hamburger" id="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>' +
        "</div>" +
      "</div>";

    // marquee
    var marquee = el("div", { "class": "marquee" });
    var inner = MARQUEE.concat(MARQUEE).map(function (m) { return "<span>" + m + "</span>"; }).join("");
    marquee.innerHTML = '<div class="marquee-track">' + inner + "</div>";

    // mobile menu
    var mob = el("div", { "class": "mobile-menu", id: "mobileMenu" });
    mob.innerHTML =
      NAV.map(function (n) {
        return '<a href="' + n[0] + '" data-ko="' + n[1] + '" data-en="' + n[2] + '">' + n[1] + "</a>";
      }).join("") +
      '<div class="mob-cta">' +
        '<a class="btn btn-secondary" href="about.html" data-ko="회사 소개" data-en="About us">회사 소개</a>' +
        '<a class="btn btn-primary" href="contact.html" data-ko="상담 신청" data-en="Get started">상담 신청</a>' +
      "</div>";

    document.body.insertBefore(mob, document.body.firstChild);
    document.body.insertBefore(marquee, document.body.firstChild);
    document.body.insertBefore(nav, document.body.firstChild);
  }

  /* ---------- Build Footer ---------- */
  function buildFooter() {
    var f = el("footer", { "class": "footer" });
    f.innerHTML =
      '<div class="footer-inner">' +
        '<div class="footer-wordmark">BSH</div>' +
        '<div class="footer-grid">' +
          '<div class="footer-col">' +
            '<h4 data-ko="회사" data-en="Company">회사</h4>' +
            '<p data-ko="비에스에이치 인터내셔널 주식회사" data-en="BSH International Co., Ltd.">비에스에이치 인터내셔널 주식회사</p>' +
            '<p data-ko="외국인환자 유치업체 (에이전시)" data-en="Foreign-patient attraction agency">외국인환자 유치업체 (에이전시)</p>' +
            '<p data-ko="서울특별시 마포구" data-en="Mapo-gu, Seoul, Republic of Korea">서울특별시 마포구</p>' +
            '<p data-ko="사업자등록번호 180-88-03539" data-en="Business Reg. No. 180-88-03539">사업자등록번호 180-88-03539</p>' +
          "</div>" +
          '<div class="footer-col">' +
            '<h4 data-ko="바로가기" data-en="Explore">바로가기</h4>' +
            '<a href="about.html" data-ko="회사 소개" data-en="About">회사 소개</a>' +
            '<a href="fields.html" data-ko="유치 분야" data-en="Treatments">유치 분야</a>' +
            '<a href="services.html" data-ko="서비스" data-en="Services">서비스</a>' +
            '<a href="contact.html" data-ko="상담 신청" data-en="Contact">상담 신청</a>' +
          "</div>" +
          '<div class="footer-col">' +
            '<h4 data-ko="유치 분야" data-en="Treatments">유치 분야</h4>' +
            '<a href="fields.html" data-ko="성형·피부과" data-en="Plastic & Dermatology">성형·피부과</a>' +
            '<a href="fields.html" data-ko="건강검진" data-en="Health Screening">건강검진</a>' +
            '<a href="fields.html" data-ko="암·중증질환" data-en="Cancer & Critical Care">암·중증질환</a>' +
            '<a href="fields.html" data-ko="안과·기타" data-en="Ophthalmology & More">안과·기타</a>' +
          "</div>" +
          '<div class="footer-col">' +
            '<h4 data-ko="문의" data-en="Get in touch">문의</h4>' +
            '<a href="tel:+821039139380">+82-10-3913-9380</a>' +
            '<a href="mailto:ookokoro@bshinternational.co.kr">ookokoro@bshinternational.co.kr</a>' +
            '<p data-ko="상담 언어: 한·일·중·영" data-en="Languages: KO · JP · CN · EN">상담 언어: 한·일·중·영</p>' +
          "</div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          '<span>© 2026 BSH International Co., Ltd.</span>' +
          '<span data-ko="보건복지부 외국인환자 유치업 등록" data-en="Registered medical-tourism agency · Ministry of Health & Welfare, Korea">보건복지부 외국인환자 유치업 등록</span>' +
        "</div>" +
      "</div>";
    document.body.appendChild(f);
  }

  /* ---------- i18n apply ---------- */
  function applyLang(lang) {
    document.documentElement.lang = lang;
    var nodes = document.querySelectorAll("[data-ko]");
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var val = n.getAttribute("data-" + lang);
      if (val != null) n.textContent = val;
    }
    // placeholders
    var ph = document.querySelectorAll("[data-ko-ph]");
    for (var j = 0; j < ph.length; j++) {
      var pv = ph[j].getAttribute("data-" + lang + "-ph");
      if (pv != null) ph[j].setAttribute("placeholder", pv);
    }
    // toggle label shows the OTHER language
    var t = document.getElementById("langToggle");
    if (t) t.innerHTML = lang === "ko" ? "KO <b>/</b> EN" : "<b>KO</b> / EN";
    // doc title
    if (document.body.getAttribute("data-title-" + lang)) {
      document.title = document.body.getAttribute("data-title-" + lang);
    }
  }

  /* ---------- Wire up ---------- */
  function init() {
    buildNav();
    buildFooter();

    var lang = getLang();
    applyLang(lang);

    var toggle = document.getElementById("langToggle");
    if (toggle) toggle.addEventListener("click", function () {
      lang = (getLang() === "ko") ? "en" : "ko";
      setLang(lang);
      applyLang(lang);
    });

    var burger = document.getElementById("hamburger");
    var menu = document.getElementById("mobileMenu");
    if (burger && menu) {
      burger.addEventListener("click", function () {
        menu.classList.toggle("open");
        document.body.style.overflow = menu.classList.contains("open") ? "hidden" : "";
      });
      menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          menu.classList.remove("open");
          document.body.style.overflow = "";
        });
      });
    }

    // contact form (no backend) — show thank-you
    var form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = document.getElementById("formSuccess");
        if (ok) { ok.classList.add("show"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
        form.reset();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
