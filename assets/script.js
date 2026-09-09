
// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

// River rail: builds dots from sections present on the current page
const sections = document.querySelectorAll('main section[id]');
const railDots = document.getElementById('rail-dots');
if (railDots && sections.length > 1) {
  const total = sections.length;
  sections.forEach((sec, i) => {
    const y = 30 + (i / (total - 1)) * 640;
    const dot = document.createElementNS('http://www.w3.org/2000/svg','circle');
    dot.setAttribute('cx', 26);
    dot.setAttribute('cy', y);
    dot.setAttribute('r', 5);
    dot.setAttribute('fill', 'rgba(31,74,77,0.35)');
    dot.classList.add('river-dot');
    dot.dataset.id = sec.id;
    railDots.appendChild(dot);
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const dot = railDots.querySelector('[data-id="'+entry.target.id+'"]');
      if (!dot) return;
      if (entry.isIntersecting) { dot.classList.add('active'); dot.setAttribute('r', 7); }
      else { dot.classList.remove('active'); dot.setAttribute('r', 5); }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(sec => observer.observe(sec));
}
