const photos = [
  { src: 'images/01.jpg', title: '巅峰行者', location: '风光 · 山峦' },
  { src: 'images/02.jpg', title: '云雾山谷', location: '苏格兰 · 斯凯岛' },
  { src: 'images/03.jpg', title: '林间小径', location: '森林 · 自然' },
  { src: 'images/04.jpg', title: '都市行迹', location: '街拍 · 城市' },
  { src: 'images/05.jpg', title: '湖上舟影', location: '意大利 · 布莱耶斯湖' },
  { src: 'images/06.jpg', title: '双层瀑布', location: '美国 · 俄勒冈' },
  { src: 'images/07.jpg', title: '逆光草海', location: '自然 · 黄昏' },
  { src: 'images/08.jpg', title: '海平落日', location: '海洋 · 黄昏' },
  { src: 'images/09.jpg', title: '银河雪山', location: '星空 · 长曝光' },
  { src: 'images/10.jpg', title: '石阵夕照', location: '苏格兰 · 仙女谷' },
  { src: 'images/11.jpg', title: '雪岭晴空', location: '高山 · 风光' },
];

const header = document.getElementById('header');
const menuBtn = document.getElementById('menuBtn');
const nav = document.querySelector('.nav');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentIndex = 0;

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

galleryItems.forEach((el) => observer.observe(el));

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.hidden = false;
  requestAnimationFrame(() => lightbox.classList.add('active'));
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { lightbox.hidden = true; }, 400);
}

function updateLightbox() {
  const photo = photos[currentIndex];
  lightboxImg.src = photo.src;
  lightboxImg.alt = photo.title;
  lightboxCaption.textContent = photo.title + ' — ' + photo.location;
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  updateLightbox();
});

lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % photos.length;
  updateLightbox();
});

document.addEventListener('keydown', (e) => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + photos.length) % photos.length; updateLightbox(); }
  if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % photos.length; updateLightbox(); }
});