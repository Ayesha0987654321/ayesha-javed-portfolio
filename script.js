// ── Custom Cursor ──
const cur  = document.getElementById("cur");
const curR = document.getElementById("cur-r");
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener("mousemove", e => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + "px";
  cur.style.top  = my + "px";
});

(function animCursor() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  curR.style.left = rx + "px";
  curR.style.top  = ry + "px";
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll("a, button, .cert-card").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cur.style.width  = "18px";
    cur.style.height = "18px";
    curR.style.width  = "48px";
    curR.style.height = "48px";
  });
  el.addEventListener("mouseleave", () => {
    cur.style.width  = "10px";
    cur.style.height = "10px";
    curR.style.width  = "34px";
    curR.style.height = "34px";
  });
});

// ── Typing Effect ──
const phrases = [
  "Front-End Developer",
  "UI/UX Enthusiast",
  "Responsive Design Expert",
  "Open to Freelance Work"
];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById("typed");

function type() {
  const current = phrases[pi];
  typedEl.textContent = deleting ? current.slice(0, ci--) : current.slice(0, ci++);
  let speed = deleting ? 50 : 85;
  if (!deleting && ci > current.length)  { deleting = true;  speed = 1800; }
  if (deleting  && ci < 0)              { deleting = false; pi = (pi + 1) % phrases.length; ci = 0; speed = 300; }
  setTimeout(type, speed);
}
type();

// ── Scroll Reveal ──
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add("on"), i * 70);
  });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach(r => revealObs.observe(r));

// ── Animated Skill Bars ──
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll(".bar-fill").forEach(bar => {
        bar.style.width = bar.dataset.w + "%";
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll(".sk-card").forEach(c => barObs.observe(c));

// ── Contact Form ──
document.getElementById("cForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("fs").style.display = "block";
  e.target.reset();
  setTimeout(() => document.getElementById("fs").style.display = "none", 5000);
});

// ── Certificate Modal ──
// ⚠️ Make sure these filenames match EXACTLY what is inside your assets/images/ folder
const CERTS = {
  py: {
    src:   "assests/images/courseraPythonCrashCourseCertificate.pdf",
    title: "Google Python Certificate"
  },
  js: {
    src:   "assests/images/JavaScriptEssentials.pdf",
    title: "JavaScript Essentials 1 Certificate"
  }
};

function openModal(type) {
  const cert    = CERTS[type];
  const overlay = document.getElementById("modal");
  const frame   = document.getElementById("modal-frame");
  const title   = document.getElementById("modal-title");

  if (!cert) return;

  title.textContent = cert.title;
  frame.src         = cert.src;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const overlay = document.getElementById("modal");
  overlay.classList.remove("open");
  document.getElementById("modal-frame").src = "";
  document.body.style.overflow = "";
}

// Close when clicking dark backdrop
document.getElementById("modal").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

// Close on Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});