// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  const scrollPosition = window.scrollY + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.getElementById('navbar').offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll(
  '.glass-card, h1, h2, h3, .reveal'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== Skill Bar Animation =====
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const targetWidth = bar.style.width;
      bar.style.setProperty('--target-width', targetWidth);
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 100);
      skillObserver.unobserve(bar);
    }
  });
}, {
  threshold: 0.5
});

skillBars.forEach(bar => skillObserver.observe(bar));

// ===== Navbar Glass Effect on Scroll =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 50) {
    navbar.querySelector('.glass-nav').style.background = 'rgba(255, 255, 255, 0.88)';
  } else {
    navbar.querySelector('.glass-nav').style.background = 'rgba(255, 255, 255, 0.72)';
  }

  lastScroll = currentScroll;
});

// ===== Add subtle parallax to hero images =====
const heroImage = document.querySelector('#about img');
if (heroImage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroImage.style.transform = `translateY(${scrolled * 0.05}px) scale(1.05)`;
    }
  });
}

// ===== Gallery Lightbox =====
const galleries = {
  jd: {
    title: '京东 · FIELD NOTES',
    images: [
      'images/work-jd-recognition.jpg?v=3',
      'images/work-jd-award.jpg?v=3',
      'images/work-jd-team.jpg?v=3'
    ]
  },
  baidu: {
    title: '百度 · 千帆 · FIELD NOTES',
    images: [
      'images/work-baidu-badge.jpg?v=3',
      'images/work-baidu-conference.jpg?v=3',
      'images/work-baidu-presentation.jpg?v=3'
    ]
  },
  baidu2: {
    title: '百度 · 文心 · FIELD NOTES',
    images: [
      'images/work-wenxin-1.jpg?v=3',
      'images/work-wenxin-2.jpg?v=3'
    ]
  },
  offeryo: {
    title: 'OfferYo · 界面预览',
    images: [
      'images/project-offeryo-home.jpg?v=3',
      'images/project-offeryo-list.jpg?v=3',
      'images/project-offeryo-detail.jpg?v=3',
      'images/project-offeryo-form.jpg?v=3',
      'images/project-offeryo-calendar.jpg?v=3',
      'images/project-offeryo-community.jpg?v=3',
      'images/project-offeryo-profile.jpg?v=3'
    ]
  },
  food: {
    title: '热爱美食',
    images: ['images/hobby-food.jpg?v=3', 'images/hobby-food-2.jpg?v=3', 'images/hobby-food-3.jpg?v=3', 'images/hobby-food-4.jpg?v=3']
  },
  sports: {
    title: '热爱运动',
    images: ['images/hobby-sports.jpg?v=3', 'images/hobby-sports-2.jpg?v=3']
  },
  travel: {
    title: '热爱旅游',
    images: ['images/hobby-travel-4.jpg?v=3', 'images/hobby-travel.jpg?v=3', 'images/hobby-travel-2.jpg?v=3', 'images/hobby-travel-3.jpg?v=3']
  },
  art: {
    title: '艺术爱好',
    images: ['images/hobby-art-4.jpg?v=3', 'images/hobby-art.jpg?v=3', 'images/hobby-art-2.jpg?v=3', 'images/hobby-art-3.jpg?v=3']
  }
};

let currentImages = [];
let currentIndex = 0;

function openGallery(key, startIndex = 0) {
  const gallery = galleries[key];
  if (!gallery) return;
  currentImages = gallery.images;
  currentIndex = startIndex;
  document.getElementById('lightbox-title').textContent = gallery.title;
  updateLightbox();
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeGallery() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const img = document.getElementById('lightbox-img');
  img.src = currentImages[currentIndex];
  document.getElementById('lightbox-counter').textContent =
    `${currentIndex + 1} / ${currentImages.length}`;
}

function prevImage(e) {
  if (e) e.stopPropagation();
  if (!currentImages.length) return;
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateLightbox();
}

function nextImage(e) {
  if (e) e.stopPropagation();
  if (!currentImages.length) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateLightbox();
}

document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox || lightbox.classList.contains('hidden')) return;
  if (e.key === 'Escape') closeGallery();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
});

// ===== Skill Card Draw Game =====
const skillCards = [
  {
    cat: 'AI NATIVE', type: '技能', backCat: 'AI 技能',
    title: 'Prompt 工程', icon: 'fa-wand-magic-sparkles', grad: 'from-blue-500 to-indigo-600',
    desc: '主导 B 端金融产品质检 Prompt 框架设计与版本迭代，构建「模型首检→人工复核→Bad Case 归因→提示词调优」的飞轮闭环。',
    tags: ['规则提炼', '框架设计', '版本迭代']
  },
  {
    cat: 'AI NATIVE', type: '技能', backCat: 'AI 技能',
    title: 'Agent / Workflow 搭建', icon: 'fa-diagram-project', grad: 'from-indigo-500 to-blue-600',
    desc: '从 0 到 1 搭建分层智能陪练 Agent，深度参与千帆 AppBuilder 工作流组件建设等。',
    tags: ['状态机', '会话管理', '原子能力']
  },
  {
    cat: 'AI NATIVE', type: '技能', backCat: 'AI 技能',
    title: 'Skill 提炼', icon: 'fa-puzzle-piece', grad: 'from-sky-500 to-cyan-600',
    desc: '在工作和学习中沉淀可复用的 AI 工作流 Skill（如学术写作 Skill、个人网页制作 Skill），擅长把最佳实践固化并实现重复调用。',
    tags: ['学术写作', '网页制作', '复用沉淀']
  },
  {
    cat: 'AI NATIVE', type: '技能', backCat: 'AI 技能',
    title: '知识库建设', icon: 'fa-database', grad: 'from-cyan-500 to-teal-600',
    desc: '熟悉知识库构建与 RAG 落地链路、知识图谱，从文档切分、向量化到召回调优，让大模型基于私有知识稳定作答。',
    tags: ['RAG', '知识图谱', '召回调优']
  },
  {
    cat: 'AI NATIVE', type: '技能', backCat: 'AI 技能',
    title: '意图识别', icon: 'fa-bullseye', grad: 'from-amber-500 to-orange-600',
    desc: '参与重构"业务域→用户目标→具体问题"三级意图类目树，搭建"Embedding 候选粗召回+大模型精分类"两阶段识别链路，推动意图识别准确率由 72% 提升至 89%。',
    tags: ['意图类目树', 'Query 改写', '两阶段召回']
  },
  {
    cat: 'AI NATIVE', type: '技能', backCat: 'AI 技能',
    title: '记忆管理', icon: 'fa-brain', grad: 'from-violet-500 to-purple-600',
    desc: '了解记忆分层设计的框架与主要技术，如滑动窗口、对话摘要、记忆向量化等。',
    tags: ['滑动窗口', '对话摘要', '记忆向量化']
  }
];

let currentCardIndex = 0;
let isDrawing = false;

const flipCardEl = document.getElementById('flip-card');
const drawBtn = document.getElementById('draw-btn');
const deckEl = document.getElementById('card-deck');

function renderSkillCard(i) {
  const c = skillCards[i];
  document.getElementById('card-cat').textContent = c.cat;
  document.getElementById('card-type').textContent = c.type;
  document.getElementById('card-title').textContent = c.title;
  document.getElementById('card-back-cat').textContent = c.backCat;
  document.getElementById('card-back-title').textContent = c.title;
  document.getElementById('card-desc').textContent = c.desc;
  document.getElementById('card-tags').innerHTML = c.tags
    .map(t => `<span class="px-2.5 py-1 rounded-full bg-white/10 text-xs text-white/80">${t}</span>`)
    .join('');
  document.getElementById('card-index').textContent = String(i + 1).padStart(2, '0');
}

function drawSkillCard() {
  if (isDrawing) return;
  isDrawing = true;
  drawBtn.disabled = true;
  flipCardEl.classList.remove('flipped');
  deckEl.classList.add('deck-shuffling');

  let ticks = 0;
  const interval = setInterval(() => {
    renderSkillCard(Math.floor(Math.random() * skillCards.length));
    ticks++;
    if (ticks >= 10) {
      clearInterval(interval);
      let next;
      do {
        next = Math.floor(Math.random() * skillCards.length);
      } while (next === currentCardIndex && skillCards.length > 1);
      currentCardIndex = next;
      renderSkillCard(next);
      deckEl.classList.remove('deck-shuffling');
      flipCardEl.classList.add('card-pop');
      setTimeout(() => flipCardEl.classList.remove('card-pop'), 500);
      drawBtn.disabled = false;
      isDrawing = false;
    }
  }, 80);
}

if (drawBtn && flipCardEl) {
  drawBtn.addEventListener('click', drawSkillCard);
  flipCardEl.addEventListener('click', () => {
    if (!isDrawing) flipCardEl.classList.toggle('flipped');
  });
  renderSkillCard(0);
}

// ===== Copy Email on Double Click =====
function copyEmail() {
  const email = 'Zhang15839623812@163.com';
  const toast = document.getElementById('toast');
  const show = () => {
    if (!toast) return;
    toast.classList.remove('opacity-0', 'translate-y-2');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
    }, 1800);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(show).catch(() => fallbackCopyEmail(email, show));
  } else {
    fallbackCopyEmail(email, show);
  }
}

function fallbackCopyEmail(text, done) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch (e) { /* ignore */ }
  document.body.removeChild(ta);
  done();
}

// ===== Scroll Hint Visibility =====
const scrollHint = document.getElementById('scroll-hint');

function updateScrollHint() {
  if (!scrollHint) return;
  const contact = document.getElementById('contact');
  // Hide when the contact section (last) is in view
  const nearEnd = contact && (window.scrollY + window.innerHeight >= contact.offsetTop + 120);
  scrollHint.classList.toggle('opacity-0', nearEnd);
}

window.addEventListener('scroll', updateScrollHint);
window.addEventListener('load', updateScrollHint);
