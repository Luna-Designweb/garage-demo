/* ============================================================
   GARAGE BARBEARIA — Fase 1 (demo)
   JavaScript vanilla, sem dependências
   ============================================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Header: estado scrolled ---------- */
    var header = document.querySelector('.site-header');
    function onScroll() {
      if (header) header.classList.toggle('scrolled', window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- Menu mobile (drawer) ---------- */
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');

    function setMenu(open) {
      if (!nav || !toggle) return;
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      document.body.style.overflow = open ? 'hidden' : '';

      if (open) {
        var firstLink = nav.querySelector('a');
        if (firstLink) firstLink.focus();
      } else {
        toggle.focus();
      }
    }

    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        setMenu(!nav.classList.contains('open'));
      });

      nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          setMenu(false);
        });
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('open')) {
          setMenu(false);
        }
      });
    }

    /* ---------- Marquee: duplica conteúdo para loop infinito ---------- */
    var track = document.getElementById('marquee-track');
    if (track) {
      track.innerHTML += track.innerHTML;
    }

    /* ---------- Fallback de imagem ---------- */
    function handleImgError(img) {
      var holder = img.closest('figure, .hero-media');
      if (holder) holder.classList.add('img-failed');
      img.style.display = 'none';
    }

    document.querySelectorAll('img').forEach(function (img) {
      img.addEventListener('error', function () {
        handleImgError(img);
      });
      if (img.complete && img.naturalWidth === 0) {
        handleImgError(img);
      }
    });

    /* ---------- Reveal on scroll (fade/slide, stagger por grupo) ---------- */
    var groups = document.querySelectorAll(
      '.grid-diferenciais, .grid-servicos, .grid-depoimentos, ' +
      '.grid-planos, .grid-unidades, .grid-galeria'
    );

    groups.forEach(function (group) {
      group.querySelectorAll('.reveal').forEach(function (el, i) {
        el.style.transitionDelay = Math.min(i * 80, 320) + 'ms';
      });
    });

    var reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && reveals.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      reveals.forEach(function (el) {
        io.observe(el);
      });
    } else {
      reveals.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  });
})();
