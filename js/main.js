const photos = [
  { src: 'images/01.jpg', title: '森林光束', location: '自然 · 西北' },
  { src: 'images/02.jpg', title: '雾中湖岸', location: '风光 · 挪威' },
  { src: 'images/03.jpg', title: '林间小径', location: '森林 · 德国' },
  { src: 'images/04.jpg', title: '海岸余晖', location: '海洋 · 加州' },
  { src: 'images/05.jpg', title: '湖畔倒影', location: '湖泊 · 加拿大' },
  { src: 'images/06.jpg', title: '瀑布秘境', location: '瀑布 · 冰岛' },
  { src: 'images/07.jpg', title: '星空之下', location: '星空 · 犹他' },
  { src: 'images/08.jpg', title: '沙漠弧线', location: '沙漠 · 撒哈拉' },
  { src: 'images/09.jpg', title: '雪峰星夜', location: '雪山 · 喜马拉雅' },
  { src: 'images/10.jpg', title: '绿野牧歌', location: '草原 · 新西兰' },
  { src: 'images/11.jpg', title: '城市天际', location: '城市 · 东京' },
  { src: 'images/hero.jpg', title: '雪山晨曦', location: '高山 · 瑞士' },
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