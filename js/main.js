// 새암교회 홈페이지 — 메뉴·스크롤 효과
(function () {
  var header = document.querySelector('.site-header');
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');

  // 첫 화면 위에서는 투명, 내려가면 흰 머리글
  if (header && !header.classList.contains('sub')) {
    var onScroll = function () {
      header.classList.toggle('solid', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // 모바일 햄버거 메뉴
  if (btn && nav) {
    var setOpen = function (open) {
      document.body.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    };
    btn.addEventListener('click', function () {
      setOpen(!document.body.classList.contains('menu-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1020) setOpen(false);
    });
  }

  // 은은하게 나타나기
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // 바닥글 연도
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
