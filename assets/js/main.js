/* Renders every page from window.SITE (assets/js/data.js). */
(function () {
  "use strict";
  var S = window.SITE;
  if (!S) return;

  var page = document.body.getAttribute("data-page") || "home";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var set = function (id, html) { var el = $(id); if (el) el.innerHTML = html; return el; };
  var ext = function (url) { return /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : ""; };

  // ---------- icons ----------
  var ICON = {
    ncd: '<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/><path d="M3.5 12h4l2-3 3 6 2-3h6"/></svg>',
    water: '<svg viewBox="0 0 24 24"><path d="M12 2.7s-6.5 7.1-6.5 11.8a6.5 6.5 0 0 0 13 0C18.5 9.8 12 2.7 12 2.7z"/><path d="M9 15a3 3 0 0 0 3 3"/></svg>',
    child: '<svg viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.5"/><path d="M12 8v7M8 11l4-2 4 2M9.5 21l2.5-6 2.5 6"/></svg>',
    system: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="8.5" y="14" width="7" height="7" rx="1.5"/><path d="M6.5 10v2h11v-2M12 12v2"/></svg>',
    chart: '<svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/><circle cx="19" cy="8" r="1"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4 7.3V17h16V7.3l-8 4.9z"/></svg>',
    cap: '<svg viewBox="0 0 24 24"><path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3zm-6 10.2V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-3.8l-6 3.3-6-3.3z"/></svg>',
    code: '<svg viewBox="0 0 24 24"><path d="M8.6 16.6 4 12l4.6-4.6L7.2 6 1.2 12l6 6 1.4-1.4zm6.8 0L20 12l-4.6-4.6L16.8 6l6 6-6 6-1.4-1.4z"/></svg>',
    download: '<svg viewBox="0 0 24 24"><path d="M12 3v11.2l4.1-4.1 1.4 1.4L12 17l-5.5-5.5 1.4-1.4 4.1 4.1V3h0zM4 19h16v2H4z"/></svg>',
    pin: '<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>',
    building: '<svg viewBox="0 0 24 24"><path d="M4 21V5l8-3 8 3v16M9 21v-4h6v4M8 8h2M14 8h2M8 12h2M14 12h2"/></svg>',
    link: '<svg viewBox="0 0 24 24"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>',
    quote: '<svg viewBox="0 0 24 24"><path d="M7 7h4v4H8a3 3 0 0 0 3 3v2a5 5 0 0 1-5-5V8a1 1 0 0 1 1-1zm8 0h4v4h-3a3 3 0 0 0 3 3v2a5 5 0 0 1-5-5V8a1 1 0 0 1 1-1z"/></svg>'
  };
  var MOON = '<svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  var SUN = '<svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v3M12 19.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1.5 12h3M19.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>';

  // ---------- shared helpers ----------
  function orcidUrl() { return S.links.orcid ? "https://orcid.org/" + S.links.orcid : ""; }

  // [label, url, icon html, extra class]; empty links are skipped
  function profiles() {
    var L = S.links, out = [];
    if (S.contact.email) out.push(["Email", "mailto:" + S.contact.email, ICON.mail]);
    if (L.orcid) out.push(["ORCID", orcidUrl(), "iD", "orcid-dot"]);
    if (L.scholar) out.push(["Google Scholar", L.scholar, ICON.cap]);
    if (L.researchgate) out.push(["ResearchGate", L.researchgate, "RG"]);
    if (L.linkedin) out.push(["LinkedIn", L.linkedin, "in"]);
    if (L.github) out.push(["GitHub", L.github, ICON.code]);
    return out;
  }
  function iconLinks() {
    return profiles().map(function (p) {
      return '<a class="icon-link ' + (p[3] || "") + '" href="' + esc(p[1]) + '"' + ext(p[1]) + ' aria-label="' + esc(p[0]) + '" title="' + esc(p[0]) + '">' + p[2] + "</a>";
    }).join("");
  }
  function profileButtons() {
    return profiles().map(function (p) {
      return '<a class="btn btn-sm" href="' + esc(p[1]) + '"' + ext(p[1]) + ">" + esc(p[0]) + "</a>";
    }).join("");
  }

  // names wrapped in **...** in data.js are shown in bold
  function boldMe(authors) {
    return esc(authors).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }
  function citation(p) {
    var c = p.authors.replace(/\*\*/g, "") + ". " + p.title + ". " + p.venue + (p.details ? ". " + p.details : "") + ".";
    if (p.doi) c += " doi:" + p.doi;
    return c;
  }
  function byYearDesc(a, b) { return b.year - a.year; }

  function photoInto(el, cls) {
    if (!el) return;
    var P = S.profile;
    el.textContent = P.shortName.split(" ").map(function (w) { return w[0]; }).join("");
    if (!P.photo) return;
    var img = new Image();
    img.alt = P.name;
    img.onload = function () { el.textContent = ""; el.appendChild(img); };
    img.src = P.photo;
  }

  var TYPE_LABEL = { journal: "Journal article", preprint: "Preprint", conference: "Conference", other: "Other" };

  // one publication <li>; n = display number (or null to show the year instead)
  function pubItem(p, n, idx) {
    var title = p.doi
      ? '<a href="https://doi.org/' + esc(p.doi) + '" target="_blank" rel="noopener">' + esc(p.title) + "</a>"
      : esc(p.title);
    var chips = [];
    if (p.doi) chips.push('<a class="chip" href="https://doi.org/' + esc(p.doi) + '" target="_blank" rel="noopener">' + ICON.link.replace("<svg", '<svg aria-hidden="true"') + "DOI</a>");
    if (p.doi) chips.push('<span class="chip" data-cites="' + esc(p.doi) + '" hidden></span>');
    chips.push('<button class="chip" type="button" data-cite="' + idx + '">Cite</button>');
    (p.topics || []).forEach(function (t) { chips.push('<span class="chip topic">' + esc(t) + "</span>"); });
    return '<li class="' + (n == null ? "card " : "") + 'pub">' +
      (n == null ? '<div class="pub-year-tag">' + esc(p.year) + "</div>" : '<div class="pub-num">' + n + "</div>") +
      "<div>" +
      '<p class="pub-title">' + title + "</p>" +
      '<p class="pub-authors">' + boldMe(p.authors) + "</p>" +
      '<p class="pub-venue"><em>' + esc(p.venue) + "</em>" + (p.details ? ", " + esc(p.details) : "") +
      '<span class="type type-' + esc(p.type) + '">' + esc(p.note || TYPE_LABEL[p.type] || p.type) + "</span></p>" +
      '<div class="chips">' + chips.join("") + "</div>" +
      "</div></li>";
  }

  function bindCite(list, pubs) {
    list.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cite]");
      if (!b) return;
      copyText(citation(pubs[+b.getAttribute("data-cite")]), function () {
        b.textContent = "Copied!";
        setTimeout(function () { b.textContent = "Cite"; }, 1500);
      });
    });
  }

  // Live citation counts from OpenAlex (free, no key). Silently skipped if offline.
  var citeCache = {};
  function loadCitations(root) {
    if (!window.fetch || location.protocol === "file:") return;
    root.querySelectorAll("[data-cites]").forEach(function (el) {
      var doi = el.getAttribute("data-cites");
      var p = citeCache[doi] || (citeCache[doi] = fetch("https://api.openalex.org/works/doi:" + encodeURIComponent(doi))
        .then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }));
      p.then(function (w) {
        if (w && w.cited_by_count > 0) {
          el.innerHTML = ICON.quote.replace("<svg", '<svg aria-hidden="true"') + "Cited: " + w.cited_by_count;
          el.hidden = false;
        }
      });
    });
  }

  function copyText(text, done) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else fallback();
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  // ---------- header & footer (shared by all pages) ----------
  var NAV = [
    ["home", "Home", "./"],
    ["about", "About", "about.html"],
    ["research", "Research", "research.html"],
    ["publications", "Publications", "publications.html"],
    ["contact", "Contact", "contact.html"]
  ];

  function renderShell() {
    var P = S.profile;
    var head = $("site-header");
    if (head) {
      head.outerHTML =
        '<a class="skip-link" href="#main">Skip to content</a>' +
        '<div class="topbar"><div class="container">' +
        '<span class="topbar-affil">' + esc(P.title) + " · " + esc(P.unit) + ", " + esc(P.affiliation) + "</span>" +
        '<div class="icon-links">' + iconLinks() + "</div></div></div>" +
        '<header class="site-header"><nav class="nav container" aria-label="Main">' +
        '<a class="brand" href="./"><span class="brand-mark" aria-hidden="true">SI</span>' +
        '<span><span class="brand-name">' + esc(P.name) + '</span><span class="brand-sub">' + esc(P.roles[0]) + " · " + esc(P.affiliation) + "</span></span></a>" +
        '<button class="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu"><span></span><span></span><span></span></button>' +
        '<ul class="nav-links" id="nav-links">' +
        NAV.map(function (n) {
          return '<li><a href="' + n[2] + '"' + (n[0] === page ? ' class="active" aria-current="page"' : "") + ">" + n[1] + "</a></li>";
        }).join("") +
        '<li class="nav-cv"><a class="btn btn-primary btn-sm" href="' + esc(S.links.cv) + '" download data-cv>' + ICON.download + "CV</a></li>" +
        '<li><button class="theme-toggle" type="button" aria-label="Toggle dark mode" title="Toggle dark mode">' + MOON + SUN + "</button></li>" +
        "</ul></nav></header>";
    }

    var foot = $("site-footer");
    if (foot) {
      var prof = profiles().filter(function (p) { return p[0] !== "Email"; });
      foot.outerHTML =
        '<footer class="site-footer"><div class="container">' +
        '<div class="footer-grid">' +
        "<div><h2>" + esc(P.name) + "</h2>" +
        "<p>" + esc(P.title) + "<br>" + esc(P.unit) + '<br><a href="' + esc(P.affiliationUrl) + '" target="_blank" rel="noopener">' + esc(P.affiliation) + "</a>, " + esc(P.location) + "</p>" +
        (S.contact.email ? '<p><a href="mailto:' + esc(S.contact.email) + '">' + esc(S.contact.email) + "</a></p>" : "") +
        "</div>" +
        "<div><h2>Navigate</h2><ul>" +
        NAV.map(function (n) { return '<li><a href="' + n[2] + '">' + n[1] + "</a></li>"; }).join("") +
        '<li><a href="cv.html">Curriculum Vitae</a></li></ul></div>' +
        "<div><h2>Profiles</h2><ul>" +
        prof.map(function (p) { return '<li><a href="' + esc(p[1]) + '" target="_blank" rel="noopener">' + esc(p[0]) + "</a></li>"; }).join("") +
        "</ul></div></div>" +
        '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + " " + esc(P.name) + "</span><span>Built with HTML, CSS &amp; JavaScript · Hosted on GitHub Pages</span></div>" +
        "</div></footer>";
    }
  }

  // ---------- home ----------
  function renderHome() {
    var P = S.profile;
    set("hero-keywords", P.keywords.map(esc).join(" · "));
    set("hero-name", esc(P.name));
    set("hero-tagline", esc(P.tagline));
    set("hero-affil", esc(P.title) + ", " + esc(P.unit) + '<br><a href="' + esc(P.affiliationUrl) + '" target="_blank" rel="noopener">' + esc(P.affiliation) + "</a>, " + esc(P.location));
    set("hero-cta",
      '<a class="btn btn-accent" href="' + esc(S.links.cv) + '" download data-cv>' + ICON.download + "Download CV</a>" +
      '<a class="btn btn-ghost" href="publications.html">View publications</a>' +
      '<a class="btn btn-ghost" href="contact.html">Get in touch</a>');
    photoInto($("hero-photo"));
    set("hero-badge", '<span class="dot" aria-hidden="true"></span><span><strong>Currently at ' + esc(P.affiliation) + "</strong>" + esc(P.title) + "</span>");
    typeRoles($("hero-role"), P.roles);

    set("stats", S.stats.map(function (s) {
      var v = s.value === "pubs" ? S.publications.length : s.value === "projects" ? S.projects.length : s.value;
      return '<div class="stat"><div class="stat-num"><span data-count="' + v + '">' + v + '</span><span class="suf">' + esc(s.suffix) + "</span></div>" +
        '<div class="stat-label">' + esc(s.label) + "</div></div>";
    }).join(""));

    set("bio", P.bio.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join(""));
    var facts = [
      ["Position", P.title],
      ["Institution", P.affiliation + ", " + P.location],
      ["Education", S.education[0].degree + ", MBSTU"],
      ["Expertise", "Biostatistics · NCD epidemiology · M&E"],
      ["Languages", S.languages.join(", ")]
    ];
    if (S.links.orcid) facts.push(["ORCID", S.links.orcid]);
    set("facts", facts.map(function (f) { return "<dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd>"; }).join(""));

    set("areas", S.interests.map(function (i) {
      return '<a class="card area-card reveal" href="research.html#' + esc(i.id) + '" style="text-decoration:none;color:inherit">' +
        '<div class="area-icon">' + (ICON[i.icon] || ICON.chart) + "</div>" +
        "<h3>" + esc(i.title) + "</h3><p>" + esc(i.text) + '</p><span class="link-arrow">Learn more</span></a>';
    }).join(""));

    var pubs = S.publications.slice().sort(byYearDesc).slice(0, 3);
    var fl = set("pub-featured", pubs.map(function (p, i) { return pubItem(p, null, i); }).join(""));
    if (fl) { bindCite(fl, pubs); loadCitations(fl); }

    set("news", S.news.map(function (n) {
      return '<article class="card news-card reveal"><div class="news-meta"><span class="news-tag">' + esc(n.tag) + "</span><time>" + esc(fmtDate(n.date)) + "</time></div>" +
        "<h3>" + esc(n.title) + "</h3><p>" + esc(n.text) + "</p>" +
        (n.link ? '<a class="link-arrow" href="' + esc(n.link) + '"' + ext(n.link) + ">Read more</a>" : "") + "</article>";
    }).join(""));

    set("cta-actions",
      (S.contact.email ? '<a class="btn btn-accent" href="mailto:' + esc(S.contact.email) + '">' + ICON.mail + "Email me</a>" : "") +
      '<a class="btn btn-ghost" href="contact.html">Contact page</a>');

    heroNetwork($("hero-canvas"));
  }

  function fmtDate(d) {
    var m = String(d).split("-");
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return m[1] ? months[+m[1] - 1] + " " + m[0] : m[0];
  }

  // rotating role text with a typing effect
  function typeRoles(el, roles) {
    if (!el || !roles || !roles.length) return;
    el.textContent = roles[0];
    if (reduceMotion || roles.length < 2) return;
    var r = 0, i = roles[0].length, deleting = true;
    setTimeout(function tick() {
      if (deleting) {
        i--;
        if (i <= 0) { deleting = false; r = (r + 1) % roles.length; }
      } else {
        i++;
        if (i >= roles[r].length) { deleting = true; el.textContent = roles[r]; return setTimeout(tick, 2200); }
      }
      el.textContent = roles[r].slice(0, Math.max(i, 0)) || " ";
      setTimeout(tick, deleting ? 45 : 85);
    }, 2400);
  }

  // animated data-network background for the hero
  function heroNetwork(canvas) {
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d"), nodes = [], w, h, dpr = Math.min(window.devicePixelRatio || 1, 2), running = true;
    function size() {
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(70, w * h / 16000));
      nodes = [];
      for (var k = 0; k < n; k++) nodes.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.8 + 1, gold: Math.random() < .12 });
    }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      var max = 140;
      for (var a = 0; a < nodes.length; a++) {
        var p = nodes[a];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        for (var b = a + 1; b < nodes.length; b++) {
          var q = nodes[b], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < max) {
            ctx.strokeStyle = "rgba(140,196,255," + (0.35 * (1 - d / max)) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
      }
      nodes.forEach(function (p) {
        ctx.fillStyle = p.gold ? "rgba(240,184,71,.95)" : "rgba(170,210,255,.85)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.gold ? p.r + 1 : p.r, 0, Math.PI * 2); ctx.fill();
      });
      if (running && !reduceMotion) requestAnimationFrame(frame);
    }
    size(); frame();
    var t; window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(function () { size(); if (reduceMotion) frame(); }, 200); });
    if ("IntersectionObserver" in window && !reduceMotion) {
      new IntersectionObserver(function (en) {
        var vis = en[0].isIntersecting;
        if (vis && !running) { running = true; frame(); }
        running = vis;
      }).observe(canvas);
    }
  }

  // ---------- about ----------
  function renderAbout() {
    var P = S.profile;
    photoInto($("about-photo"));
    set("about-name", esc(P.name));
    set("about-title", esc(P.title) + " · " + esc(P.unit) + ", " + esc(P.affiliation));
    set("bio", P.bio.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join(""));
    set("about-links", '<a class="btn btn-primary" href="' + esc(S.links.cv) + '" download data-cv>' + ICON.download + "Download CV</a>" + profileButtons());

    set("timeline", S.experience.map(function (e) {
      return '<li class="reveal"><div class="tl-date">' + esc(e.period) + '</div><div class="tl-body"><h3>' + esc(e.role) + '</h3><p class="tl-org">' + esc(e.org) + "</p><ul>" +
        e.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div></li>";
    }).join(""));

    set("edu", S.education.map(function (e) {
      return '<div class="card edu"><div class="edu-year">' + esc(e.year) + "</div><div><h3>" + esc(e.degree) + "</h3><p>" + esc(e.org) + "</p><p>" + esc(e.result) + "</p></div></div>";
    }).join(""));
    set("training", S.training.map(function (t) {
      return "<li>" + esc(t.title) + '<span class="meta">' + esc(t.org) + (t.year ? " · " + esc(t.year) : "") + "</span></li>";
    }).join(""));
    set("skills", S.skills.map(function (g) {
      return '<div class="skill-group"><h3>' + esc(g.group) + '</h3><div class="tags">' +
        g.items.map(function (i) { return '<span class="tag">' + esc(i) + "</span>"; }).join("") + "</div></div>";
    }).join(""));
    set("languages", S.languages.map(function (l) { return '<span class="tag">' + esc(l) + "</span>"; }).join(""));
  }

  // ---------- research ----------
  function renderResearch() {
    set("area-jump", S.interests.map(function (i) {
      return '<a class="btn btn-sm" href="#' + esc(i.id) + '">' + esc(i.title) + "</a>";
    }).join(""));
    set("research-areas", S.interests.map(function (i) {
      var projects = S.projects.filter(function (p) { return p.area === i.id; });
      return '<section class="area-section" id="' + esc(i.id) + '"><div class="container area-layout">' +
        '<div class="reveal"><div class="area-icon">' + (ICON[i.icon] || ICON.chart) + "</div>" +
        "<h2>" + esc(i.title) + '</h2><p class="lead">' + esc(i.details || i.text) + "</p></div>" +
        '<div class="proj-list">' +
        (projects.length ? projects.map(function (p) {
          return '<article class="card proj reveal"><h3>' + esc(p.title) + '</h3><p class="meta">' + esc(p.org) + " · " + esc(p.period) + "</p><p>" + esc(p.text) + "</p></article>";
        }).join("") : '<p class="muted">Projects in this area will be listed here.</p>') +
        "</div></div></section>";
    }).join(""));
  }

  // ---------- publications ----------
  function renderPublications() {
    var list = $("pub-list");
    if (!list) return;
    var L = S.links, src = [];
    if (L.orcid) src.push(["ORCID", orcidUrl()]);
    if (L.scholar) src.push(["Google Scholar", L.scholar]);
    if (L.researchgate) src.push(["ResearchGate", L.researchgate]);
    set("pub-sources", src.map(function (s) { return '<a class="btn btn-sm" href="' + esc(s[1]) + '" target="_blank" rel="noopener">' + esc(s[0]) + "</a>"; }).join(""));

    // number publications oldest = 1, like a CV
    var pubs = S.publications.slice();
    var chrono = pubs.slice().sort(function (a, b) { return a.year - b.year; });
    pubs.forEach(function (p) { p._n = chrono.indexOf(p) + 1; });

    var types = {}, topics = {};
    pubs.forEach(function (p) { types[p.type] = 1; (p.topics || []).forEach(function (t) { topics[t] = 1; }); });
    $("pub-type").insertAdjacentHTML("beforeend", Object.keys(types).map(function (t) { return '<option value="' + esc(t) + '">' + esc(TYPE_LABEL[t] || t) + "</option>"; }).join(""));
    $("pub-topic").insertAdjacentHTML("beforeend", Object.keys(topics).sort().map(function (t) { return '<option value="' + esc(t) + '">' + esc(t) + "</option>"; }).join(""));

    var shown = [];
    function draw() {
      var q = $("pub-search").value.trim().toLowerCase();
      var ty = $("pub-type").value, tp = $("pub-topic").value, so = $("pub-sort").value;
      shown = pubs.filter(function (p) {
        if (ty !== "all" && p.type !== ty) return false;
        if (tp !== "all" && (p.topics || []).indexOf(tp) < 0) return false;
        if (q && (p.title + " " + p.authors + " " + p.venue + " " + (p.topics || []).join(" ")).toLowerCase().indexOf(q) < 0) return false;
        return true;
      }).sort(function (a, b) {
        if (so === "old") return a.year - b.year || a._n - b._n;
        if (so === "title") return a.title.localeCompare(b.title);
        return b.year - a.year || b._n - a._n;
      });
      list.innerHTML = shown.length
        ? shown.map(function (p, i) { return pubItem(p, p._n, i); }).join("")
        : '<li class="empty">No publications match your filters.</li>';
      set("pub-count", "Showing " + shown.length + " of " + pubs.length + " publications");
      loadCitations(list);
    }
    ["pub-search", "pub-type", "pub-topic", "pub-sort"].forEach(function (id) { $(id).addEventListener("input", draw); });
    list.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cite]");
      if (!b) return;
      copyText(citation(shown[+b.getAttribute("data-cite")]), function () {
        b.textContent = "Copied!";
        setTimeout(function () { b.textContent = "Cite"; }, 1500);
      });
    });
    draw();
  }

  // ---------- contact ----------
  function renderContact() {
    var C = S.contact, P = S.profile, cards = [];
    if (C.email) cards.push([ICON.mail, "Email", '<a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a>"]);
    if (C.phone) cards.push([ICON.link, "Phone", '<a href="tel:' + esc(C.phone.replace(/\s/g, "")) + '">' + esc(C.phone) + "</a>"]);
    cards.push([ICON.building, "Institution", esc(P.unit) + ', <a href="' + esc(P.affiliationUrl) + '" target="_blank" rel="noopener">' + esc(P.affiliation) + "</a>"]);
    cards.push([ICON.pin, "Location", esc(P.location)]);
    set("contact-cards", cards.map(function (c) {
      return '<div class="card contact-card"><div class="area-icon">' + c[0] + "</div><div><h3>" + c[1] + "</h3><p>" + c[2] + "</p></div></div>";
    }).join(""));
    set("contact-links", profileButtons());

    var form = $("contact-form");
    if (!form || !S.formspreeId) return;
    form.hidden = false;
    var note = $("contact-note"); if (note) note.hidden = true;
    form.action = "https://formspree.io/f/" + encodeURIComponent(S.formspreeId);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = $("form-status");
      status.textContent = "Sending…";
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (r.ok) { form.reset(); status.textContent = "Thank you! Your message has been sent."; }
          else status.textContent = "Sorry, something went wrong. Please email me directly.";
        })
        .catch(function () { status.textContent = "Network error. Please email me directly."; });
    });
  }

  // ---------- cv.html ----------
  function renderCv() {
    var P = S.profile, L = S.links, C = S.contact;
    var site = location.protocol === "file:" ? "https://sojibul-islam.github.io/" : location.origin + location.pathname.replace(/cv\.html$/, "");
    var contact = [];
    if (C.email) contact.push('<a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a>");
    if (C.phone) contact.push(esc(C.phone));
    contact.push(esc(P.location));
    if (L.orcid) contact.push('ORCID: <a href="' + esc(orcidUrl()) + '">' + esc(L.orcid) + "</a>");
    if (L.linkedin) contact.push('<a href="' + esc(L.linkedin) + '">LinkedIn</a> · <a href="' + esc(site) + '">' + esc(site.replace(/^https?:\/\//, "").replace(/\/$/, "")) + "</a>");

    var item = function (left, right, body) {
      return '<div class="cv-item"><div class="cv-row"><strong>' + left + "</strong><span>" + esc(right) + "</span></div>" + (body || "") + "</div>";
    };

    set("cv-body",
      '<header class="cv-head"><div><h1>' + esc(P.name) + "</h1><p>" + esc(P.title) + "</p><p>" + esc(P.unit) + ", " + esc(P.affiliation) + "</p></div>" +
      '<div class="cv-contact">' + contact.map(function (c) { return "<p>" + c + "</p>"; }).join("") + "</div></header>" +
      "<h2>Profile</h2><p>" + esc(P.bio.join(" ")) + "</p>" +
      "<h2>Research interests</h2><p>" + S.interests.map(function (i) { return esc(i.title); }).join(" · ") + "</p>" +
      "<h2>Experience</h2>" + S.experience.map(function (e) {
        return item(esc(e.role) + ' — <span style="font-weight:400">' + esc(e.org) + "</span>", e.period,
          "<ul>" + e.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>");
      }).join("") +
      "<h2>Education</h2>" + S.education.map(function (e) {
        return item(esc(e.degree), e.year, "<div>" + esc(e.org) + " · " + esc(e.result) + "</div>");
      }).join("") +
      "<h2>Publications</h2><ol>" + S.publications.slice().sort(byYearDesc).map(function (p) {
        return '<li class="cv-item">' + boldMe(p.authors) + ". " + esc(p.title) + ". <em>" + esc(p.venue) + "</em>" +
          (p.details ? ". " + esc(p.details) : "") + "." +
          (p.doi ? ' doi:<a href="https://doi.org/' + esc(p.doi) + '">' + esc(p.doi) + "</a>" : "") +
          (p.note ? " (" + esc(p.note) + ")" : "") + "</li>";
      }).join("") + "</ol>" +
      "<h2>Research projects</h2>" + S.projects.map(function (p) {
        return item(esc(p.title), p.period, "<div>" + esc(p.org) + "</div>");
      }).join("") +
      "<h2>Skills</h2>" + S.skills.map(function (g) {
        return "<p><strong>" + esc(g.group) + ":</strong> " + g.items.map(esc).join(", ") + "</p>";
      }).join("") +
      "<h2>Training &amp; teaching</h2><ul>" + S.training.map(function (t) {
        return "<li>" + esc(t.title) + " — " + esc(t.org) + (t.year ? " (" + esc(t.year) + ")" : "") + "</li>";
      }).join("") + "</ul>" +
      "<h2>Languages</h2><p>" + S.languages.map(esc).join(" · ") + "</p>" +
      "<h2>References</h2><p>Available on request.</p>");
  }

  // If assets/cv.pdf hasn't been added yet, point CV buttons to the online CV instead.
  function checkCv() {
    if (!window.fetch || location.protocol === "file:") return;
    fetch(S.links.cv, { method: "HEAD" }).then(function (r) {
      if (r.ok) return;
      document.querySelectorAll("[data-cv]").forEach(function (a) {
        a.href = "cv.html"; a.removeAttribute("download");
        a.lastChild.textContent = a.lastChild.textContent === "CV" ? "CV" : "View CV";
      });
    }).catch(function () {});
  }

  // ---------- common UI ----------
  function initUi() {
    var toggle = document.querySelector(".nav-toggle"), links = $("nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open);
      });
    }

    var tb = document.querySelector(".theme-toggle");
    if (tb) tb.addEventListener("click", function () {
      var root = document.documentElement;
      var cur = root.getAttribute("data-theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var next = cur === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });

    // fade-in on scroll + animated counters
    var items = document.querySelectorAll(".reveal, [data-count]");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add("in"); });
    } else {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target;
          if (el.hasAttribute("data-count")) countUp(el); else el.classList.add("in");
          obs.unobserve(el);
        });
      }, { rootMargin: "0px 0px -8% 0px" });
      items.forEach(function (el) { obs.observe(el); });
    }

    var pb = $("print-btn"); if (pb) pb.addEventListener("click", function () { window.print(); });
  }

  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count")), dec = target % 1 ? 1 : 0, t0 = null, dur = 1400;
    function step(t) {
      if (!t0) t0 = t;
      var k = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - k, 3);
      el.textContent = (target * e).toFixed(dec);
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ---------- boot ----------
  if ($("cv-body")) { renderCv(); initUi(); return; }
  renderShell();
  ({ home: renderHome, about: renderAbout, research: renderResearch, publications: renderPublications, contact: renderContact }[page] || renderHome)();
  initUi();
  checkCv();
})();
