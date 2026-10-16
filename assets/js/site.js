(function () {
  const btn = document.querySelector(".menu-btn");
  const links = document.querySelector(".nav-links");
  function setOpen(open) {
    if (!links || !btn) return;
    links.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }
  if (btn && links) {
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "site-nav");
    links.id = "site-nav";
    btn.addEventListener("click", () => setOpen(!links.classList.contains("open")));
    links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  }

  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || ((path === "" || path === "/") && href === "index.html")) a.classList.add("active");
  });

  document.querySelectorAll("form[data-demo]").forEach((form) => {
    const note = form.querySelector(".success") || form.parentElement.querySelector(".success");
    if (note) note.setAttribute("role", "status");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (note) {
        note.classList.add("show");
        note.focus?.();
      }
      form.reset();
    });
  });

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = '<button type="button" aria-label="Close image">×</button><img alt="">';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector("img");
  const closeLb = () => { lb.classList.remove("open"); lbImg.src = ""; };
  lb.querySelector("button").addEventListener("click", closeLb);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });
  document.querySelectorAll(".gallery img").forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || "";
      lb.classList.add("open");
    });
  });

  const config = window.EASTC_CONFIG || {};
  const payments = config.payments || {};
  const contact = config.contact || {};

  function isPlaceholder(value) {
    const text = String(value || "").trim();
    if (!text) return true;
    return /placeholder/i.test(text);
  }

  function money(amount) {
    return "R" + amount.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function renderFacts() {
    const main = document.querySelector("main");
    if (!main || document.getElementById("campus-facts")) return;
    const section = document.createElement("section");
    section.id = "campus-facts";
    section.className = "facts-band";
    section.innerHTML = `
      <div class="wrap">
        <div class="section-head">
          <div class="eyebrow">Campus facts</div>
          <h2>Courses, accommodation, and standards</h2>
          <p>Only what the EASTC sites already publish. Anything missing is marked to be confirmed.</p>
        </div>
        <div class="grid-3">
          <article class="panel">
            <h3>Course availability</h3>
            <p>EASTC Technocentric Varsity publishes NATED business and engineering courses designed to DHET standards, and short workshop courses of about 15 days. Its FAQ lists those short courses at R11&nbsp;250. Trades named there as in demand are welding, boilermaking, bricklaying, plumbing, fitting, solar, carpentry, electrical, air-conditioning and refrigeration, and motor mechanics. Saturday classes are listed as available.</p>
            <p>Published full-time hours are Monday to Thursday 08:00–16:00 and Friday 08:00–13:00. Part-time hours are Saturdays 08:00–15:30 for nine consecutive Saturdays. A 15-day course is described as a semi-skilled qualification, not a completed artisan trade.</p>
            <p>EASTECH Institute publishes engineering, computing and AI, energy and environment, and business-of-technology pathways, including contact, blended, and distance study, plus work-integrated learning.</p>
            <p><span class="placeholder-tag">To be confirmed</span> Which courses have seats open, and the next intake dates.</p>
          </article>
          <article class="panel">
            <h3>Student accommodation</h3>
            <p>The varsity FAQ publishes shared accommodation at R2&nbsp;100, with 24-hour security at the premises and the accommodation. Its 2026 brochure says that shared rate is for short courses only, and that students supply their own food and bedding. The training-courses page also says accommodation fees are available on request at reception.</p>
            <p><span class="placeholder-tag">To be confirmed</span> Whether a bed is free, and the fee for a stay longer than a short course.</p>
          </article>
          <article class="panel">
            <h3>Accreditation</h3>
            <p>NATED courses are described on the varsity site as designed by the Department of Higher Education and Training. On this site that is stated as designed to DHET standards. EASTECH Institute describes DHET alignment for its programmes.</p>
            <p><span class="placeholder-tag">To be confirmed</span> A documented registration or accreditation number, and the scope of any QCTO or CETA approval, for each qualification.</p>
            <p>This site does not confirm NSFAS eligibility. The varsity FAQ says EASTC currently does not accept NSFAS.</p>
          </article>
        </div>
        <p class="note fact-sources">Sources: <a href="https://eastc.co.za/faq/">EASTC FAQ</a>, <a href="https://eastc.co.za/nated_courses/">NATED courses</a>, <a href="https://eastc.co.za/training-courses/">training courses</a>, <a href="https://eastc.co.za/wp-content/uploads/2024/01/BROCHURE-2026.pdf">2026 brochure</a>, <a href="https://eastech-institute.co.za/">EASTECH Institute</a>.</p>
      </div>`;
    main.appendChild(section);
  }

  function renderQuickContact() {
    if (document.querySelector(".quick-contact")) return;
    const wrap = document.createElement("div");
    wrap.className = "quick-contact";
    const call = document.createElement("a");
    call.className = "quick-btn quick-call";
    call.href = "tel:" + (contact.phoneTel || "+27113941488");
    call.innerHTML = "<strong>Call</strong><span></span>";
    call.querySelector("span").textContent = contact.phoneDisplay || "011 394 1488";
    wrap.appendChild(call);

    const waNumber = String(contact.whatsappE164 || "").replace(/\D/g, "");
    if (waNumber && !isPlaceholder(contact.whatsappE164)) {
      const wa = document.createElement("a");
      wa.className = "quick-btn quick-wa";
      wa.href = "https://wa.me/" + waNumber;
      wa.target = "_blank";
      wa.rel = "noopener noreferrer";
      wa.innerHTML = "<strong>WhatsApp</strong><span>Message the published number</span>";
      wrap.appendChild(wa);
    } else {
      const wa = document.createElement("button");
      wa.type = "button";
      wa.className = "quick-btn quick-wa";
      wa.setAttribute("aria-disabled", "true");
      wa.innerHTML = "<strong>WhatsApp</strong><span>Number to be confirmed</span>";
      wrap.appendChild(wa);
    }
    document.body.appendChild(wrap);
  }

  function renderDirectory() {
    const mount = document.querySelector("[data-directory]");
    if (!mount) return;
    const published = document.createElement("div");
    published.className = "panel directory-office";
    published.innerHTML = "<h3>Published switchboard</h3><p class=\"note\">These are the only contact details published on this Foundation site. They are not department lines.</p>";
    const lines = document.createElement("p");
    lines.append(document.createTextNode(contact.address || "43 Maxwell Street, Kempton Park"));
    lines.append(document.createElement("br"));
    const mail = document.createElement("a");
    mail.href = "mailto:" + (contact.email || "info@eastcfoundation.org.za");
    mail.textContent = contact.email || "info@eastcfoundation.org.za";
    lines.append(mail, document.createTextNode(" · "));
    const tel = document.createElement("a");
    tel.href = "tel:" + (contact.phoneTel || "+27113941488");
    tel.textContent = contact.phoneDisplay || "011 394 1488";
    lines.append(tel, document.createTextNode(" · "));
    const mobile = document.createElement("a");
    mobile.href = "tel:" + (contact.mobileTel || "+27826051134");
    mobile.textContent = contact.mobileDisplay || "082 605 1134";
    lines.append(mobile);
    published.appendChild(lines);
    if (contact.campusEmail) {
      const campusLine = document.createElement("p");
      campusLine.append(document.createTextNode("Campus email published on this site: "));
      const campusMail = document.createElement("a");
      campusMail.href = "mailto:" + contact.campusEmail;
      campusMail.textContent = contact.campusEmail;
      campusLine.appendChild(campusMail);
      published.appendChild(campusLine);
    }
    mount.appendChild(published);

    const grid = document.createElement("div");
    grid.className = "grid-4 directory-grid";
    (config.departments || []).forEach((dept) => {
      const card = document.createElement("article");
      card.className = "card";
      const body = document.createElement("div");
      body.className = "card-body";
      const title = document.createElement("h3");
      title.textContent = dept.name;
      const note = document.createElement("p");
      note.textContent = dept.note || "";
      body.append(title, note);
      const emailLine = document.createElement("p");
      if (dept.email && !isPlaceholder(dept.email)) {
        const a = document.createElement("a");
        a.href = "mailto:" + dept.email;
        a.textContent = dept.email;
        emailLine.append(a);
      } else {
        emailLine.innerHTML = "<span class=\"placeholder-tag\">Email to be confirmed</span>";
      }
      const phoneLine = document.createElement("p");
      if (dept.phone && !isPlaceholder(dept.phone)) {
        const a = document.createElement("a");
        a.href = "tel:" + dept.phone.replace(/\s/g, "");
        a.textContent = dept.phone;
        phoneLine.append(a);
      } else {
        phoneLine.innerHTML = "<span class=\"placeholder-tag\">Phone to be confirmed</span>";
      }
      body.append(emailLine, phoneLine);
      if (dept.name === "Admissions") {
        const link = document.createElement("p");
        link.innerHTML = "<a href=\"https://eastech-institute.co.za/admissions.html\">Institute admissions page</a>";
        body.appendChild(link);
      }
      card.appendChild(body);
      grid.appendChild(card);
    });
    mount.appendChild(grid);
  }

  function bindContactForm() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;
    const status = form.querySelector(".success");
    const fallbackNote = form.querySelector("[data-mailto-note]");
    if (fallbackNote) {
      fallbackNote.textContent = isPlaceholder(contact.endpoint)
        ? "No form endpoint is configured. Send opens an email to " + (contact.mailto || "info@eastcfoundation.org.za") + "."
        : "Send posts to the configured endpoint. If that fails, it opens an email instead.";
    }
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const payload = Object.fromEntries(new FormData(form).entries());
      const show = (message) => {
        if (!status) return;
        status.textContent = message;
        status.classList.add("show");
      };
      if (!isPlaceholder(contact.endpoint)) {
        try {
          const response = await fetch(contact.endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload)
          });
          if (response.ok) {
            show("Message sent to the Foundation contact endpoint.");
            form.reset();
            return;
          }
        } catch (error) {
          /* Fall through to email. */
        }
      }
      const subject = encodeURIComponent("Contact staff and management — " + (payload.department || "General"));
      const body = encodeURIComponent(
        "Name: " + (payload.name || "") + "\nEmail: " + (payload.email || "") +
        "\nDepartment: " + (payload.department || "") + "\n\n" + (payload.message || "")
      );
      show("Opening your email app to " + (contact.mailto || "info@eastcfoundation.org.za") + ".");
      window.location.href = "mailto:" + (contact.mailto || "info@eastcfoundation.org.za") + "?subject=" + subject + "&body=" + body;
    });
  }

  function renderLeaders() {
    const leaders = config.leadership || {};
    document.querySelectorAll("[data-leader]").forEach((slot) => {
      const person = leaders[slot.getAttribute("data-leader")];
      if (!person) return;
      const img = slot.querySelector("img");
      const name = slot.querySelector("[data-leader-name]");
      const title = slot.querySelector("[data-leader-title]");
      if (img && person.image) {
        img.src = person.image;
        img.alt = person.imageAlt || "Placeholder graphic";
      }
      if (name) name.textContent = person.name || "To be confirmed";
      if (title) title.textContent = person.title || "To be confirmed";
    });
  }

  function fillEft() {
    const eft = config.eft || {};
    document.querySelectorAll("[data-eft]").forEach((node) => {
      const key = node.getAttribute("data-eft");
      if (eft[key]) node.textContent = eft[key];
    });
  }

  function pageUrl(result) {
    const url = new URL("pay.html", window.location.href);
    url.searchParams.set("result", result);
    return url.toString();
  }

  function secretIsExposed() {
    return payments.YOCO_SECRET_KEY && !isPlaceholder(payments.YOCO_SECRET_KEY);
  }

  function bindPayment() {
    const form = document.querySelector("[data-yoco-form]");
    if (!form) return;
    const banner = document.querySelector("[data-test-banner]");
    const status = document.querySelector("[data-pay-status]");
    const result = new URLSearchParams(window.location.search).get("result");
    if (banner) {
      banner.hidden = false;
      if (payments.testMode !== false) {
        banner.textContent = "Test mode — no live payment is taken. Card details stay on Yoco once a test checkout is connected.";
      } else {
        banner.textContent = "Test mode is off. A configured Yoco payment link can charge a real card.";
      }
    }
    if (secretIsExposed() && status) {
      status.textContent = "A Yoco secret key is in the public config. Remove it. This page will not send that key.";
      status.classList.add("show");
    }
    if (result === "success" && status) {
      status.textContent = "Yoco sent you back to this page. That return does not confirm the payment. The Foundation confirms receipt from Yoco.";
      status.classList.add("show");
    } else if ((result === "cancelled" || result === "failed") && status) {
      status.textContent = "The Yoco checkout was cancelled or did not finish. No receipt is confirmed from this page.";
      status.classList.add("show");
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const amount = Number(form.amount.value);
      const reference = String(form.reference.value || "").trim();
      const minimum = Number(payments.minAmountZar || 2);
      if (!reference || !Number.isFinite(amount) || amount < minimum) {
        form.reportValidity();
        if (status) {
          status.textContent = "Enter an amount of at least R" + minimum.toFixed(2) + " and a reference.";
          status.classList.add("show");
        }
        return;
      }
      const say = (message) => {
        if (!status) return;
        status.textContent = message;
        status.classList.add("show");
      };
      if (secretIsExposed()) {
        say("Payment stopped. Take the Yoco secret key out of the public config. Nothing was sent.");
        return;
      }

      const endpoint = payments.checkoutEndpoint;
      if (!isPlaceholder(endpoint)) {
        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              amount: Math.round(amount * 100),
              currency: payments.currency || "ZAR",
              reference: reference,
              testMode: payments.testMode !== false,
              successUrl: pageUrl("success"),
              cancelUrl: pageUrl("cancelled"),
              failureUrl: pageUrl("failed")
            })
          });
          const data = await response.json();
          const redirectUrl = data && data.redirectUrl;
          const mode = data && data.processingMode;
          const testMode = payments.testMode !== false;
          const safeRedirect = typeof redirectUrl === "string" && redirectUrl.startsWith("https://");
          if (response.ok && safeRedirect && (!testMode || mode === "test")) {
            window.location.assign(redirectUrl);
            return;
          }
          say(testMode
            ? "Test mode stayed on. The checkout endpoint did not return a Yoco test redirect, so no payment page was opened."
            : "Yoco checkout did not return a payment page. Nothing was opened.");
          return;
        } catch (error) {
          say("The Yoco checkout endpoint did not respond. No payment page was opened.");
          return;
        }
      }

      const link = payments.YOCO_PAYMENT_LINK_URL;
      if (isPlaceholder(link)) {
        say("Test mode. Yoco keys and the payment-link URL are still placeholders, so nothing was opened. Amount " + money(amount) + ". Reference " + reference + ".");
        return;
      }
      if (payments.testMode !== false) {
        say("Test mode is on, so this live Yoco payment link was not opened. Amount " + money(amount) + ". Reference " + reference + ".");
        return;
      }
      let destination;
      try {
        destination = new URL(link);
      } catch (error) {
        say("The Yoco payment-link URL in config is not a valid URL. Nothing was opened.");
        return;
      }
      if (destination.protocol !== "https:") {
        say("The Yoco payment link must be an https URL. Nothing was opened.");
        return;
      }
      destination.searchParams.set("amount", amount.toFixed(2));
      destination.searchParams.set("reference", reference);
      destination.searchParams.set("redirectOnPaymentSuccess", pageUrl("success"));
      window.location.assign(destination.toString());
    });
  }

  renderFacts();
  renderQuickContact();
  renderDirectory();
  bindContactForm();
  renderLeaders();
  fillEft();
  bindPayment();
})();
