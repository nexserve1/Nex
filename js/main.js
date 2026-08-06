/* ==========================================================================
   NexServe IT Solutions — main.js
   Vanilla JS. No dependencies. Progressive enhancement.
   ========================================================================== */
(function(){
  "use strict";

  var CONTACT = {
    phone: "+919462253470",
    phoneDisplay: "+91 94622 53470",
    whatsapp: "919462253470",
    email: "contact@nexserveitsolutions.com"
  };
  window.NEXSERVE_CONTACT = CONTACT;

  document.addEventListener("DOMContentLoaded", function(){
    initLoader();
    initHeader();
    initMobileNav();
    initSearch();
    initScrollProgress();
    initReveal();
    initCounters();
    initBackToTop();
    initTestimonialSlider();
    initFaqAccordion();
    initGallery();
    initVideoModal();
    initForms();
    initToastDemo();
    initCookieConsent();
    initThemeToggle();
    initChatWidget();
    initTyping();
    initParticles();
    initYear();
  });

  /* ---------------- Loader ---------------- */
  function initLoader(){
    var loader = document.getElementById("pageLoader");
    if(!loader) return;
    window.addEventListener("load", function(){
      setTimeout(function(){ loader.classList.add("hide"); }, 320);
    });
    setTimeout(function(){ loader.classList.add("hide"); }, 2200);
  }

  /* ---------------- Sticky header ---------------- */
  function initHeader(){
    var header = document.getElementById("siteHeader");
    if(!header) return;
    function onScroll(){
      if(window.scrollY > 30){ header.classList.add("scrolled"); }
      else{ header.classList.remove("scrolled"); }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, {passive:true});
  }

  /* ---------------- Mobile nav ---------------- */
  function initMobileNav(){
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("mobileNav");
    var scrim = document.getElementById("navScrim");
    var closeBtn = document.querySelector(".mobile-nav-close");
    if(!toggle || !nav) return;
    function open(){
      nav.classList.add("open"); scrim.classList.add("open");
      document.documentElement.classList.add("no-scroll");
      toggle.setAttribute("aria-expanded","true");
    }
    function close(){
      nav.classList.remove("open"); scrim.classList.remove("open");
      document.documentElement.classList.remove("no-scroll");
      toggle.setAttribute("aria-expanded","false");
    }
    toggle.addEventListener("click", open);
    if(closeBtn) closeBtn.addEventListener("click", close);
    if(scrim) scrim.addEventListener("click", close);
    document.addEventListener("keydown", function(e){ if(e.key === "Escape") close(); });
  }

  /* ---------------- Search overlay ---------------- */
  var SITE_INDEX = [
    {t:"Home", u:"index.html", d:"Start here"},
    {t:"About Us", u:"about.html", d:"Our story & team"},
    {t:"Services", u:"services.html", d:"Everything we offer"},
    {t:"Laptop Sales", u:"services.html#laptop-sales", d:"New & refurbished laptops"},
    {t:"Laptop Repair", u:"services.html#laptop-repair", d:"Hardware & software fixes"},
    {t:"Data Recovery", u:"services.html#data-recovery", d:"Recover lost data"},
    {t:"AMC Services", u:"services.html#amc", d:"Annual maintenance contracts"},
    {t:"CCTV Installation", u:"services.html#cctv", d:"Surveillance systems"},
    {t:"Networking Solutions", u:"services.html#networking", d:"LAN, WiFi, routers"},
    {t:"Office IT Setup", u:"services.html#office-setup", d:"Turnkey office IT"},
    {t:"Software Installation", u:"services.html#software", d:"OS & applications"},
    {t:"Printer Support", u:"services.html#printer", d:"Setup & repair"},
    {t:"Business IT Support", u:"services.html#business-support", d:"Corporate IT desk"},
    {t:"Blog", u:"blog.html", d:"Guides & updates"},
    {t:"Careers", u:"careers.html", d:"Join our team"},
    {t:"Gallery", u:"gallery.html", d:"Our work"},
    {t:"FAQ", u:"faq.html", d:"Common questions"},
    {t:"Testimonials", u:"testimonials.html", d:"Client reviews"},
    {t:"Contact", u:"contact.html", d:"Get in touch"},
    {t:"Privacy Policy", u:"privacy.html", d:"Legal"},
    {t:"Terms & Conditions", u:"terms.html", d:"Legal"},
    {t:"Refund Policy", u:"refund.html", d:"Legal"}
  ];
  function initSearch(){
    var trigger = document.querySelectorAll(".search-trigger");
    var overlay = document.getElementById("searchOverlay");
    if(!overlay) return;
    var input = overlay.querySelector("input");
    var resultsEl = overlay.querySelector(".search-results");
    var closeBtn = overlay.querySelector(".search-close");

    function render(list){
      resultsEl.innerHTML = "";
      list.forEach(function(item){
        var a = document.createElement("a");
        a.href = item.u;
        a.innerHTML = "<span>"+item.t+"</span><small>"+item.d+"</small>";
        resultsEl.appendChild(a);
      });
      if(list.length === 0){
        resultsEl.innerHTML = '<p style="color:rgba(255,255,255,.4);font-size:.9rem;padding:10px;">No matches. Try “repair”, “CCTV”, or “careers”.</p>';
      }
    }
    render(SITE_INDEX);

    function open(){
      overlay.classList.add("open");
      document.documentElement.classList.add("no-scroll");
      setTimeout(function(){ input.focus(); }, 150);
    }
    function close(){
      overlay.classList.remove("open");
      document.documentElement.classList.remove("no-scroll");
      input.value = "";
      render(SITE_INDEX);
    }
    trigger.forEach(function(t){ t.addEventListener("click", open); });
    if(closeBtn) closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", function(e){ if(e.target === overlay) close(); });
    document.addEventListener("keydown", function(e){
      if((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)){ e.preventDefault(); open(); }
      if(e.key === "Escape") close();
    });
    input.addEventListener("input", function(){
      var q = input.value.trim().toLowerCase();
      if(!q){ render(SITE_INDEX); return; }
      render(SITE_INDEX.filter(function(i){ return (i.t+i.d).toLowerCase().indexOf(q) > -1; }));
    });
  }

  /* ---------------- Scroll progress bar ---------------- */
  function initScrollProgress(){
    var bar = document.getElementById("scrollProgress");
    if(!bar) return;
    window.addEventListener("scroll", function(){
      var h = document.documentElement;
      var pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = pct + "%";
    }, {passive:true});
  }

  /* ---------------- Scroll reveal ---------------- */
  function initReveal(){
    var els = document.querySelectorAll("[data-reveal]");
    if(!els.length) return;
    if(!("IntersectionObserver" in window)){
      els.forEach(function(el){ el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.15, rootMargin:"0px 0px -60px 0px"});
    els.forEach(function(el, i){
      el.style.setProperty("--i", (i % 6));
      io.observe(el);
    });
  }

  /* ---------------- Animated counters ---------------- */
  function initCounters(){
    var counters = document.querySelectorAll("[data-count]");
    if(!counters.length) return;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        animateCount(entry.target);
        io.unobserve(entry.target);
      });
    }, {threshold:0.5});
    counters.forEach(function(c){ io.observe(c); });

    function animateCount(el){
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var duration = 1800;
      var start = null;
      function step(ts){
        if(!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var val = Math.floor(eased * target);
        el.textContent = val.toLocaleString("en-IN") + suffix;
        if(progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString("en-IN") + suffix;
      }
      requestAnimationFrame(step);
    }
  }

  /* ---------------- Back to top ---------------- */
  function initBackToTop(){
    var btn = document.getElementById("backToTop");
    if(!btn) return;
    window.addEventListener("scroll", function(){
      if(window.scrollY > 600) btn.classList.add("show");
      else btn.classList.remove("show");
    }, {passive:true});
    btn.addEventListener("click", function(){
      window.scrollTo({top:0, behavior:"smooth"});
    });
  }

  /* ---------------- Testimonial slider ---------------- */
  function initTestimonialSlider(){
    var track = document.querySelector(".testi-track");
    if(!track) return;
    var slides = track.children;
    var dotsWrap = document.querySelector(".testi-nav");
    var prevBtn = document.querySelector(".testi-arrow.prev");
    var nextBtn = document.querySelector(".testi-arrow.next");
    var idx = 0, timer;

    for(var i=0;i<slides.length;i++){
      var dot = document.createElement("button");
      dot.className = "testi-dot" + (i===0 ? " active" : "");
      dot.setAttribute("aria-label", "Go to testimonial " + (i+1));
      (function(n){ dot.addEventListener("click", function(){ goTo(n); restart(); }); })(i);
      if(dotsWrap) dotsWrap.appendChild(dot);
    }
    var dots = dotsWrap ? dotsWrap.querySelectorAll(".testi-dot") : [];

    function goTo(n){
      idx = (n + slides.length) % slides.length;
      track.style.transform = "translateX(-" + (idx*100) + "%)";
      dots.forEach(function(d,i2){ d.classList.toggle("active", i2===idx); });
    }
    function restart(){
      clearInterval(timer);
      timer = setInterval(function(){ goTo(idx+1); }, 5500);
    }
    if(prevBtn) prevBtn.addEventListener("click", function(){ goTo(idx-1); restart(); });
    if(nextBtn) nextBtn.addEventListener("click", function(){ goTo(idx+1); restart(); });
    restart();
  }

  /* ---------------- FAQ accordion ---------------- */
  function initFaqAccordion(){
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function(item){
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if(!q || !a) return;
      q.addEventListener("click", function(){
        var isOpen = item.classList.contains("open");
        items.forEach(function(other){
          other.classList.remove("open");
          other.querySelector(".faq-a").style.maxHeight = null;
          other.querySelector(".faq-q").setAttribute("aria-expanded","false");
        });
        if(!isOpen){
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
          q.setAttribute("aria-expanded","true");
        }
      });
    });
    // FAQ category tabs (if present)
    var tabs = document.querySelectorAll(".faq-tab");
    if(tabs.length){
      tabs.forEach(function(tab){
        tab.addEventListener("click", function(){
          tabs.forEach(function(t){ t.classList.remove("active"); });
          tab.classList.add("active");
          var cat = tab.getAttribute("data-cat");
          document.querySelectorAll(".faq-item").forEach(function(item){
            var show = cat === "all" || item.getAttribute("data-cat") === cat;
            item.style.display = show ? "" : "none";
          });
        });
      });
    }
  }

  /* ---------------- Gallery + lightbox ---------------- */
  function initGallery(){
    var items = document.querySelectorAll(".gallery-item");
    var lightbox = document.getElementById("lightbox");
    if(!items.length || !lightbox) return;
    var imgs = Array.prototype.map.call(items, function(it){
      return {src: it.querySelector("img").src, caption: it.getAttribute("data-caption") || ""};
    });
    var lbImg = lightbox.querySelector("img");
    var caption = lightbox.querySelector(".lb-caption");
    var closeBtn = lightbox.querySelector(".lb-close");
    var prevBtn = lightbox.querySelector(".lb-prev");
    var nextBtn = lightbox.querySelector(".lb-next");
    var current = 0;

    function show(i){
      current = (i + imgs.length) % imgs.length;
      lbImg.src = imgs[current].src;
      caption.textContent = imgs[current].caption;
    }
    items.forEach(function(it, i){
      it.addEventListener("click", function(){
        show(i);
        lightbox.classList.add("open");
        document.documentElement.classList.add("no-scroll");
      });
    });
    function close(){
      lightbox.classList.remove("open");
      document.documentElement.classList.remove("no-scroll");
    }
    if(closeBtn) closeBtn.addEventListener("click", close);
    if(prevBtn) prevBtn.addEventListener("click", function(){ show(current-1); });
    if(nextBtn) nextBtn.addEventListener("click", function(){ show(current+1); });
    lightbox.addEventListener("click", function(e){ if(e.target === lightbox) close(); });
    document.addEventListener("keydown", function(e){
      if(!lightbox.classList.contains("open")) return;
      if(e.key === "Escape") close();
      if(e.key === "ArrowLeft") show(current-1);
      if(e.key === "ArrowRight") show(current+1);
    });

    // Filters
    var filters = document.querySelectorAll(".gallery-filters button");
    if(filters.length){
      filters.forEach(function(btn){
        btn.addEventListener("click", function(){
          filters.forEach(function(b){ b.classList.remove("active"); });
          btn.classList.add("active");
          var cat = btn.getAttribute("data-filter");
          items.forEach(function(it){
            var show2 = cat === "all" || it.getAttribute("data-cat") === cat;
            it.style.display = show2 ? "" : "none";
          });
        });
      });
    }
  }

  /* ---------------- Video modal ---------------- */
  function initVideoModal(){
    var trigger = document.querySelector(".video-card");
    var modal = document.getElementById("videoModal");
    if(!trigger || !modal) return;
    var frameWrap = modal.querySelector(".video-frame-wrap");
    var closeBtn = modal.querySelector(".lb-close");
    trigger.addEventListener("click", function(){
      var embedUrl = trigger.getAttribute("data-video") || "https://www.youtube.com/embed/dQw4w9WgXcQ";
      frameWrap.innerHTML = '<iframe src="'+embedUrl+'?autoplay=1" title="NexServe video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
      modal.classList.add("open");
      document.documentElement.classList.add("no-scroll");
    });
    function close(){
      modal.classList.remove("open");
      frameWrap.innerHTML = "";
      document.documentElement.classList.remove("no-scroll");
    }
    if(closeBtn) closeBtn.addEventListener("click", close);
    modal.addEventListener("click", function(e){ if(e.target === modal) close(); });
  }

  /* ---------------- Forms (validation + toast) ---------------- */
  function initForms(){
    var forms = document.querySelectorAll("form[data-validate]");
    forms.forEach(function(form){
      form.addEventListener("submit", function(e){
        e.preventDefault();
        // honeypot spam check
        var hp = form.querySelector('input[name="company_website"]');
        if(hp && hp.value){ return; }

        var valid = true;
        var fields = form.querySelectorAll("[required]");
        fields.forEach(function(field){
          var wrap = field.closest(".field");
          var ok = true;
          if(field.type === "email"){
            ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
          } else if(field.type === "tel"){
            ok = /^[0-9+\-\s()]{7,15}$/.test(field.value.trim());
          } else if(field.type === "checkbox"){
            ok = field.checked;
          } else {
            ok = field.value.trim().length > 1;
          }
          if(wrap){ wrap.classList.toggle("invalid", !ok); }
          if(!ok) valid = false;
        });

        if(!valid){
          showToast("error", "Please check the form", "Some fields need your attention.");
          return;
        }

        var btn = form.querySelector('[type="submit"]');
        var originalText = btn ? btn.textContent : "";
        if(btn){ btn.textContent = "Sending…"; btn.disabled = true; }

        setTimeout(function(){
          if(btn){ btn.textContent = originalText; btn.disabled = false; }
          form.reset();
          form.querySelectorAll(".field.invalid").forEach(function(f){ f.classList.remove("invalid"); });
          showToast("success", "Message received!", "Our team will contact you within 2 business hours.");
        }, 900);
      });
    });

    // Newsletter mini forms
    document.querySelectorAll(".newsletter-mini, .newsletter-form").forEach(function(nf){
      nf.addEventListener("submit", function(e){
        e.preventDefault();
        var input = nf.querySelector("input[type=email]");
        if(input && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())){
          showToast("error", "Invalid email", "Please enter a valid email address.");
          return;
        }
        showToast("success", "Subscribed!", "You’ll now receive our IT tips & updates.");
        nf.reset();
      });
    });
  }

  /* ---------------- Toast ---------------- */
  function showToast(type, title, msg){
    var stack = document.getElementById("toastStack");
    if(!stack) return;
    var toast = document.createElement("div");
    toast.className = "toast " + type;
    var icon = type === "success"
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>'
      : type === "error"
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';
    toast.innerHTML = icon + '<div><strong>'+title+'</strong><span>'+msg+'</span></div><button class="toast-close" aria-label="Dismiss">&times;</button>';
    stack.appendChild(toast);
    requestAnimationFrame(function(){ toast.classList.add("show"); });
    var timeout = setTimeout(remove, 5000);
    toast.querySelector(".toast-close").addEventListener("click", remove);
    function remove(){
      clearTimeout(timeout);
      toast.classList.remove("show");
      setTimeout(function(){ toast.remove(); }, 400);
    }
  }
  window.showToast = showToast;
  function initToastDemo(){} // reserved

  /* ---------------- Cookie consent ---------------- */
  function initCookieConsent(){
    var banner = document.getElementById("cookieBanner");
    if(!banner) return;
    var KEY = "nexserve_cookie_consent";
    if(!localStorage.getItem(KEY)){
      setTimeout(function(){ banner.classList.add("show"); }, 1200);
    }
    banner.querySelectorAll("[data-consent]").forEach(function(btn){
      btn.addEventListener("click", function(){
        localStorage.setItem(KEY, btn.getAttribute("data-consent"));
        banner.classList.remove("show");
      });
    });
  }

  /* ---------------- Dark mode ---------------- */
  function initThemeToggle(){
    var toggles = document.querySelectorAll(".theme-toggle");
    if(!toggles.length) return;
    var KEY = "nexserve_theme";
    var saved = localStorage.getItem(KEY);
    if(saved === "dark"){ document.documentElement.classList.add("dark"); }
    toggles.forEach(function(t){
      t.addEventListener("click", function(){
        document.documentElement.classList.toggle("dark");
        localStorage.setItem(KEY, document.documentElement.classList.contains("dark") ? "dark" : "light");
      });
    });
  }

  /* ---------------- Chat widget ---------------- */
  function initChatWidget(){
    var launcher = document.getElementById("chatLauncher");
    var win = document.getElementById("chatWindow");
    if(!launcher || !win) return;
    var closeBtn = win.querySelector(".chat-close");
    var body = win.querySelector(".chat-body");
    var input = win.querySelector(".chat-input-row input");
    var sendBtn = win.querySelector(".chat-input-row button");
    var quickWrap = win.querySelector(".chat-quick");

    launcher.addEventListener("click", function(){ win.classList.toggle("open"); });
    if(closeBtn) closeBtn.addEventListener("click", function(){ win.classList.remove("open"); });

    function addMsg(text, who){
      var div = document.createElement("div");
      div.className = "chat-msg " + who;
      div.textContent = text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }
    function reply(userText){
      var t = userText.toLowerCase();
      var r;
      if(t.indexOf("price") > -1 || t.indexOf("cost") > -1) r = "Pricing depends on the service — most laptop repairs range ₹499–₹4,999. Share your issue on WhatsApp for an exact quote.";
      else if(t.indexOf("cctv") > -1) r = "We install HD & 4K CCTV systems for homes and offices, with mobile viewing setup included. Want a free site visit?";
      else if(t.indexOf("data") > -1) r = "Our data recovery team handles crashed drives, formatted disks, and corrupted partitions with a no-recovery-no-fee policy on diagnostics.";
      else if(t.indexOf("amc") > -1) r = "Our AMC plans cover unlimited visits, priority support, and preventive maintenance. Check the AMC section on our Services page.";
      else if(t.indexOf("contact") > -1 || t.indexOf("call") > -1 || t.indexOf("number") > -1) r = "Call or WhatsApp us anytime at " + CONTACT.phoneDisplay + " — we usually reply within 30 minutes.";
      else r = "Thanks for reaching out! For a fast response, tap “Chat on WhatsApp” below or call " + CONTACT.phoneDisplay + ".";
      setTimeout(function(){ addMsg(r, "bot"); }, 600);
    }
    function send(){
      var val = input.value.trim();
      if(!val) return;
      addMsg(val, "user");
      input.value = "";
      reply(val);
    }
    if(sendBtn) sendBtn.addEventListener("click", send);
    if(input) input.addEventListener("keydown", function(e){ if(e.key === "Enter") send(); });
    if(quickWrap){
      quickWrap.querySelectorAll("button").forEach(function(btn){
        btn.addEventListener("click", function(){
          addMsg(btn.textContent, "user");
          reply(btn.textContent);
        });
      });
    }
  }

  /* ---------------- Hero typing animation ---------------- */
  function initTyping(){
    var el = document.querySelector("[data-typing]");
    if(!el) return;
    var words = JSON.parse(el.getAttribute("data-typing"));
    var wi = 0, ci = 0, deleting = false;
    function tick(){
      var word = words[wi];
      if(!deleting){
        ci++;
        el.textContent = word.slice(0, ci);
        if(ci === word.length){ deleting = true; setTimeout(tick, 1600); return; }
      } else {
        ci--;
        el.textContent = word.slice(0, ci);
        if(ci === 0){ deleting = false; wi = (wi+1) % words.length; }
      }
      setTimeout(tick, deleting ? 35 : 70);
    }
    tick();
  }

  /* ---------------- Particle background (hero) ---------------- */
  function initParticles(){
    var canvas = document.getElementById("particleCanvas");
    if(!canvas || !canvas.getContext) return;
    if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var ctx = canvas.getContext("2d");
    var particles = [];
    var count = window.innerWidth < 768 ? 30 : 60;
    function resize(){
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    function init(){
      resize();
      particles = [];
      for(var i=0;i<count;i++){
        particles.push({
          x: Math.random()*canvas.width,
          y: Math.random()*canvas.height,
          vx: (Math.random()-0.5)*0.25,
          vy: (Math.random()-0.5)*0.25,
          r: Math.random()*1.6+0.6
        });
      }
    }
    function step(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(var i=0;i<particles.length;i++){
        var p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = "rgba(120,180,255,0.55)";
        ctx.fill();
        for(var j=i+1;j<particles.length;j++){
          var q = particles[j];
          var dx = p.x-q.x, dy = p.y-q.y;
          var dist = Math.sqrt(dx*dx+dy*dy);
          if(dist < 120){
            ctx.beginPath();
            ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
            ctx.strokeStyle = "rgba(120,180,255," + (0.12*(1-dist/120)) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(step);
    }
    init();
    window.addEventListener("resize", init);
    requestAnimationFrame(step);
  }

  /* ---------------- Footer year ---------------- */
  function initYear(){
    document.querySelectorAll("[data-year]").forEach(function(el){
      el.textContent = new Date().getFullYear();
    });
  }

})();
