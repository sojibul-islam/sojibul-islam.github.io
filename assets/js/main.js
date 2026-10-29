/* Renders index.html and cv.html from window.SITE (assets/js/data.js). */
(function () {
  "use strict";
  var S = window.SITE;
  if (!S) return;

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var set = function (id, html) { var el = $(id); if (el) el.innerHTML = html; return el; };

  // ---------- shared helpers ----------
  function orcidUrl() { return S.links.orcid ? "https://orcid.org/" + S.links.orcid : ""; }

  // names wrapped in **...** in data.js are shown in bold
  function boldMe(authors) {
    return esc(authors).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  function citation(p) {
    var c = p.authors.replace(/\*\*/g, "") + ". " + p.title + ". " + p.venue + (p.details ? ". " + p.details : "") + ".";
    if (p.doi) c += " doi:" + p.doi;
    return c;
  }

  function profileLinks(opts) {
    var L = S.links, items = [];
    if (opts.cv) items.push(["Download CV", L.cv, "btn-primary", true]);
    if (S.contact.email) items.push(["Email", "mailto:" + S.contact.email]);
    if (L.orcid) items.push(["ORCID", orcidUrl()]);
    if (L.scholar) items.push(["Google Scholar", L.scholar]);
    if (L.researchgate) items.push(["ResearchGate", L.researchgate]);
    if (L.linkedin) items.push(["LinkedIn", L.linkedin]);
    if (L.github) items.push(["GitHub", L.github]);
    return items.map(function (i) {
      var ext = /^https?:/.test(i[1]);
      return '<a class="btn ' + (i[2] || "") + '" href="' + esc(i[1]) + '"' +
        (i[3] ? " download data-cv" : "") +
        (ext ? ' target="_blank" rel="noopener"' : "") + ">" + esc(i[0]) + "</a>";
    }).join("");
  }

  // ---------- index.html ----------
  function renderIndex() {
    var P = S.profile;

    // photo with initials fallback
    var ph = $("hero-photo");
    if (ph) {
      var initials = P.shortName.split(" ").map(function (w) { return w[0]; }).join("");
      ph.textContent = initials;
      if (P.photo) {
        var img = new Image();
        img.alt = P.name;
        img.onload = function () { ph.textContent = ""; ph.appendChild(img); };
        img.src = P.photo;
      }
    }

    set("hero-affil", esc(P.title) + ' · <a href="' + esc(P.affiliationUrl) + '" target="_blank" rel="noopener">' + esc(P.affiliation) + "</a>");
    set("hero-name", esc(P.name));
    set("hero-tagline", esc(P.tagline));
    set("hero-links", profileLinks({ cv: true }));
    set("bio", P.bio.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join(""));

    var facts = [
      ["Position", P.title + ", " + P.affiliation],
      ["Location", P.location],
      ["Education", S.education[0].degree + ", " + S.education[0].org.replace("Mawlana Bhashani Science and Technology University", "MBSTU")],
      ["Experience", "6+ years in public health research & data analysis"],
      ["Languages", S.languages.join(", ")]
    ];
    set("facts", facts.map(function (f) { return "<dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd>"; }).join(""));

    set("interests", S.interests.map(function (i) {
      return '<div class="card interest"><h4>' + esc(i.title) + "</h4><p>" + esc(i.text) + "</p></div>";
    }).join(""));

    set("projects", S.projects.map(function (p) {
      return '<article class="card project"><h4>' + esc(p.title) + '</h4><p class="meta">' +
        esc(p.org) + " · " + esc(p.period) + "</p><p>" + esc(p.text) + "</p></article>";
    }).join(""));

    renderPublications();

    set("timeline", S.experience.map(function (e) {
      return "<li><h4>" + esc(e.role) + '</h4><p class="meta">' + esc(e.org) + " · " + esc(e.period) +
        "</p><ul>" + e.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></li>";
    }).join(""));

    set("education", S.education.map(function (e) {
      return "<li><strong>" + esc(e.degree) + '</strong><span class="meta">' + esc(e.org) + " · " + esc(e.year) + " · " + esc(e.result) + "</span></li>";
    }).join(""));

    set("training", S.training.map(function (t) {
      return "<li>" + esc(t.title) + '<span class="meta">' + esc(t.org) + (t.year ? " · " + esc(t.year) : "") + "</span></li>";
    }).join(""));

    set("skills", S.skills.map(function (g) {
      return '<div class="skill-group"><h4>' + esc(g.group) + '</h4><div class="tags">' +
        g.items.map(function (i) { return '<span class="tag">' + esc(i) + "</span>"; }).join("") + "</div></div>";
    }).join(""));

    renderOrcid();
    renderContact();
    checkCv();
  }

  function renderPublications() {
    var list = $("pub-list");
    if (!list) return;
    var pubs = S.publications.slice().sort(function (a, b) { return b.year - a.year; });
    var labels = { all: "All", journal: "Journal articles", conference: "Conference", preprint: "Preprints", other: "Other" };
    var types = ["all"].concat(Object.keys(labels).filter(function (t) {
      return t !== "all" && pubs.some(function (p) { return p.type === t; });
    }));

    function draw(filter) {
      var shown = pubs.filter(function (p) { return filter === "all" || p.type === filter; });
      list.innerHTML = shown.map(function (p) {
        var i = pubs.indexOf(p);
        return '<li class="card pub"><div class="pub-year">' + esc(p.year) + "</div><div>" +
          '<p class="pub-title">' + (p.doi ? '<a href="https://doi.org/' + esc(p.doi) + '" target="_blank" rel="noopener">' + esc(p.title) + "</a>" : esc(p.title)) + "</p>" +
          '<p class="pub-authors">' + boldMe(p.authors) + "</p>" +
          '<p class="pub-venue">' + esc(p.venue) + (p.details ? ", " + esc(p.details) : "") +
          (p.note ? '<span class="badge">' + esc(p.note) + "</span>" : "") + "</p>" +
          '<div class="pub-actions">' +
          (p.doi ? '<a class="btn" href="https://doi.org/' + esc(p.doi) + '" target="_blank" rel="noopener">DOI</a>' : "") +
          '<button class="btn" type="button" data-cite="' + i + '">Copy citation</button>' +
          "</div></div></li>";
      }).join("");
    }

    set("pub-filters", types.map(function (t, i) {
      return '<button class="chip" type="button" data-filter="' + t + '" aria-pressed="' + (i === 0) + '">' + labels[t] + "</button>";
    }).join(""));
    $("pub-filters").addEventListener("click", function (e) {
      var b = e.target.closest("[data-filter]");
      if (!b) return;
      this.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c === b); });
      draw(b.getAttribute("data-filter"));
    });

    list.addEventListener("click", function (e) {
      var b = e.target.closest("[data-cite]");
      if (!b) return;
      copyText(citation(pubs[+b.getAttribute("data-cite")]), function () {
        b.textContent = "Copied!";
        setTimeout(function () { b.textContent = "Copy citation"; }, 1500);
      });
    });

    draw("all");

    var more = [];
    if (S.links.scholar) more.push('<a href="' + esc(S.links.scholar) + '" target="_blank" rel="noopener">Google Scholar</a>');
    if (S.links.orcid) more.push('<a href="' + esc(orcidUrl()) + '" target="_blank" rel="noopener">ORCID</a>');
    if (more.length) set("pub-more", "For a full and up-to-date list, see my " + more.join(" and ") + " profile.");
  }

  function copyText(text, done) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(); });
    } else fallback();
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  function renderOrcid() {
    var box = $("orcid-links");
    if (!box) return;
    if (!S.links.orcid) {
      set("orcid-text", "ORCID gives researchers a persistent identifier that connects them to their publications, grants and affiliations. My ORCID profile will be linked here soon.");
      box.innerHTML = '<a class="btn" href="https://orcid.org/register" target="_blank" rel="noopener">About ORCID</a>';
      return;
    }
    set("orcid-text", 'My ORCID iD: <a class="orcid-id" href="' + esc(orcidUrl()) + '" target="_blank" rel="noopener">' + esc(orcidUrl()) + "</a>" +
      '<br><span class="small muted" id="orcid-count"></span>');
    box.innerHTML = '<a class="btn btn-primary" href="' + esc(orcidUrl()) + '" target="_blank" rel="noopener">View ORCID profile</a>';

    // Live count of works from the ORCID public API (silently skipped if offline)
    if (window.fetch) {
      fetch("https://pub.orcid.org/v3.0/" + encodeURIComponent(S.links.orcid) + "/works", { headers: { Accept: "application/json" } })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) {
          if (d && d.group) set("orcid-count", d.group.length + " works listed on ORCID");
        })
        .catch(function () {});
    }
  }

  function renderContact() {
    var C = S.contact, items = [];
    if (C.email) items.push('<li>Email: <a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a></li>");
    if (C.phone) items.push('<li>Phone: <a href="tel:' + esc(C.phone.replace(/\s/g, "")) + '">' + esc(C.phone) + "</a></li>");
    items.push("<li>" + esc(S.profile.affiliation) + ", " + esc(S.profile.location) + "</li>");
    set("contact-list", items.join(""));
    set("contact-links", profileLinks({ cv: false }));

    var form = $("contact-form");
    if (!form || !S.formspreeId) return;
    form.hidden = false;
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

  // If assets/cv.pdf hasn't been added yet, point CV buttons to the online CV instead.
  function checkCv() {
    if (!window.fetch || location.protocol === "file:") return;
    fetch(S.links.cv, { method: "HEAD" }).then(function (r) {
      if (r.ok) return;
      document.querySelectorAll("[data-cv], #cv-download").forEach(function (a) {
        a.href = "cv.html"; a.removeAttribute("download");
        a.textContent = "View CV";
      });
    }).catch(function () {});
  }

  // ---------- cv.html ----------
  function renderCv() {
    var P = S.profile, L = S.links, C = S.contact;
    var contact = [];
    if (C.email) contact.push('<a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a>");
    if (C.phone) contact.push(esc(C.phone));
    contact.push(esc(P.location));
    if (L.orcid) contact.push('ORCID: <a href="' + esc(orcidUrl()) + '">' + esc(L.orcid) + "</a>");
    if (L.linkedin) contact.push('<a href="' + esc(L.linkedin) + '">LinkedIn</a>');
    contact.push('<a href="' + esc(location.origin + location.pathname.replace(/cv\.html$/, "")) + '">Website</a>');

    var item = function (left, right, body) {
      return '<div class="cv-item"><div class="cv-row"><strong>' + left + "</strong><span>" + esc(right) + "</span></div>" + (body || "") + "</div>";
    };

    var html =
      '<header class="cv-head"><div><h1>' + esc(P.name) + "</h1><p>" + esc(P.title) + ", " + esc(P.affiliation) + "</p></div>" +
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

      "<h2>Publications</h2><ol>" + S.publications.slice().sort(function (a, b) { return b.year - a.year; }).map(function (p) {
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
      '<h2>References</h2><p>Available on request.</p>';

    set("cv-body", html);
  }

  // ---------- common UI ----------
  function initUi() {
    var y = $("year"); if (y) y.textContent = new Date().getFullYear();

    var toggle = document.querySelector(".nav-toggle"), links = $("nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open);
      });
      links.addEventListener("click", function (e) {
        if (e.target.tagName === "A") { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
      });
    }

    var tb = document.querySelector(".theme-toggle");
    if (tb) tb.addEventListener("click", function () {
      var root = document.documentElement;
      var cur = root.getAttribute("data-theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      var next = cur === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });

    // highlight the nav link of the section in view
    var navAs = document.querySelectorAll('.nav-links a[href^="#"]');
    if ("IntersectionObserver" in window && navAs.length) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          navAs.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      document.querySelectorAll("main section[id]").forEach(function (s) { obs.observe(s); });
    }

    var pb = $("print-btn"); if (pb) pb.addEventListener("click", function () { window.print(); });
  }

  if ($("cv-body")) renderCv(); else renderIndex();
  initUi();
})();
