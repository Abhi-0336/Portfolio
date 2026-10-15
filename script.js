    // Live Milky Way-style background: drifting nebula clouds, twinkling stars, and shooting stars.
    (() => {
      const canvas = document.getElementById("starfield");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      let width = 0, height = 0, stars = [], shootingStars = [], raf = 0;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const clouds = [
        {x:.18,y:.24,rx:.34,ry:.30,color:[98,68,218],phase:.2,speed:.00020},
        {x:.78,y:.30,rx:.30,ry:.33,color:[24,155,205],phase:1.8,speed:.00016},
        {x:.55,y:.80,rx:.38,ry:.28,color:[185,54,173],phase:3.4,speed:.00018},
        {x:.41,y:.47,rx:.26,ry:.20,color:[72,93,190],phase:5.1,speed:.00013}
      ];
      let lastShot = 0;
      function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth; height = window.innerHeight;
        canvas.width = Math.floor(width * dpr); canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + "px"; canvas.style.height = height + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.min(340, Math.max(120, Math.floor((width * height) / 3900)));
        stars = Array.from({length: count}, () => ({
          x: Math.random() * width, y: Math.random() * height,
          r: Math.random() < .09 ? Math.random() * 1.7 + 1.1 : Math.random() * 1.05 + .25,
          alpha: Math.random() * .55 + .25, phase: Math.random() * Math.PI * 2,
          speed: Math.random() * .0018 + .00035, drift: (Math.random() - .5) * .22
        }));
        draw(performance.now());
      }
      function draw(t) {
        ctx.clearRect(0, 0, width, height);
        const light = document.documentElement.getAttribute("data-theme") === "light";
        // Soft coloured clouds move independently to make the background feel alive.
        clouds.forEach((c, i) => {
          const drift = reduceMotion ? 0 : Math.sin(t * c.speed + c.phase);
          const x = (c.x + drift * .075) * width;
          const y = (c.y + Math.cos(t * c.speed * .8 + c.phase) * (reduceMotion ? 0 : .055)) * height;
          const radius = Math.max(width, height) * c.rx;
          const [r,g,b] = c.color;
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
          gradient.addColorStop(0, `rgba(${r},${g},${b},${light ? .055 : .17})`);
          gradient.addColorStop(.42, `rgba(${r},${g},${b},${light ? .025 : .075})`);
          gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);
        });
        // Stars shimmer and gently float.
        for (const star of stars) {
          const pulse = reduceMotion ? 0 : Math.sin(t * star.speed + star.phase) * .34;
          const alpha = Math.max(.12, Math.min(1, star.alpha + pulse));
          const color = light ? `rgba(53,62,102,${alpha * .52})` : `rgba(235,241,255,${alpha})`;
          if (star.r > 1.7 && !light) {
            ctx.shadowBlur = 9;
            ctx.shadowColor = `rgba(174,193,255,${alpha * .7})`;
          }
          ctx.beginPath(); ctx.fillStyle = color;
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur = 0;
          if (!reduceMotion) {
            star.y += .09; star.x += star.drift * .2;
            if (star.y > height + 3) { star.y = -3; star.x = Math.random() * width; }
            if (star.x < -3) star.x = width + 3;
            if (star.x > width + 3) star.x = -3;
          }
        }
        // One short shooting star every few seconds, never in reduced-motion mode.
        if (!reduceMotion && t - lastShot > 2500 + Math.random() * 3500) {
          shootingStars.push({x:Math.random()*width*.85,y:Math.random()*height*.45,vx:5+Math.random()*5,vy:2+Math.random()*2,life:1});
          lastShot = t;
        }
        shootingStars = shootingStars.filter(s => s.life > 0);
        shootingStars.forEach(s => {
          const tail = ctx.createLinearGradient(s.x,s.y,s.x-s.vx*9,s.y-s.vy*9);
          tail.addColorStop(0, light ? "rgba(78,88,140,.65)" : "rgba(225,239,255,.95)");
          tail.addColorStop(1, "rgba(225,239,255,0)");
          ctx.strokeStyle = tail; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(s.x,s.y); ctx.lineTo(s.x-s.vx*9,s.y-s.vy*9); ctx.stroke();
          s.x += s.vx; s.y += s.vy; s.life -= .018;
        });
        if (!reduceMotion) raf = requestAnimationFrame(draw);
      }
      window.addEventListener("resize", resize, {passive:true});
      resize();
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) cancelAnimationFrame(raf);
        else if (!reduceMotion) raf = requestAnimationFrame(draw);
      });
    })();
    // Optional: paste your YouTube channel URL here to connect the gallery card.
    const YOUTUBE_CHANNEL_URL = "";
    document.getElementById("year").textContent = new Date().getFullYear();

    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = (() => { try { return localStorage.getItem("abhi-portfolio-theme"); } catch(e) { return null; } })();
    if (savedTheme === "light") root.setAttribute("data-theme", "light");
    function updateThemeButton() {
      const light = root.getAttribute("data-theme") === "light";
      themeToggle.innerHTML = light ? "☾ <span class='theme-label'>Dark mode</span>" : "☼ <span class='theme-label'>Light mode</span>";
      themeToggle.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
    }
    updateThemeButton();
    themeToggle.addEventListener("click", () => {
      const light = root.getAttribute("data-theme") !== "light";
      if (light) root.setAttribute("data-theme", "light"); else root.removeAttribute("data-theme");
      try { localStorage.setItem("abhi-portfolio-theme", light ? "light" : "dark"); } catch(e) {}
      updateThemeButton();
    });

    if (YOUTUBE_CHANNEL_URL) {
      const yt = document.getElementById("youtubeLink");
      yt.href = YOUTUBE_CHANNEL_URL;
      yt.textContent = "Visit my channel ↗";
    }

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    menuBtn.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      menuBtn.textContent = open ? "✕" : "☰";
    });
    navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open navigation menu");
      menuBtn.textContent = "☰";
    }));

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
      }), {threshold:.12});
      document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    } else {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    }
