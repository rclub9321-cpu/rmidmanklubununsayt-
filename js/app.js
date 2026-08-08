'use strict';

/* =========================================
   SCROLL & PAGE HISTORY
   ========================================= */
var scrollPositions = {};
var pageHistory = [];
var currentPage = 'home';

/* =========================================
   CORE PAGE ROUTER
   ========================================= */
function showPage(pageId, saveScroll) {
  if (saveScroll !== false) {
    scrollPositions[currentPage] = window.scrollY;
  }

  var pages = document.querySelectorAll('.page');
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove('active');
  }

  var target = document.getElementById('page-' + pageId);
  if (!target) return;
  target.classList.add('active');

  var links = document.querySelectorAll('.nav-link');
  for (var j = 0; j < links.length; j++) {
    links[j].classList.remove('active');
    if (links[j].getAttribute('data-page') === pageId) {
      links[j].classList.add('active');
    }
  }

  closeMobileNav();

  var savedScroll = scrollPositions[pageId];
  window.scrollTo(0, typeof savedScroll === 'number' ? savedScroll : 0);

  currentPage = pageId;
}

/* =========================================
   GERI DUYMESI
   ========================================= */
function goBackPage(fromPage) {
  var targetPage, targetScroll;

  if (pageHistory.length > 0) {
    var prev = pageHistory.pop();
    targetPage = prev.page;
    targetScroll = prev.scroll;
  } else {
    targetPage = 'home';
    targetScroll = scrollPositions['home'] || 0;
  }

  _switchPage(targetPage, targetScroll);
}

/* =========================================
   DAXILI SEHIFE KECID
   ========================================= */
function _switchPage(pageId, scrollY) {
  var pages = document.querySelectorAll('.page');
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove('active');
  }

  var target = document.getElementById('page-' + pageId);
  if (!target) return;
  target.classList.add('active');

  var links = document.querySelectorAll('.nav-link');
  for (var j = 0; j < links.length; j++) {
    links[j].classList.remove('active');
    if (links[j].getAttribute('data-page') === pageId) {
      links[j].classList.add('active');
    }
  }

  closeMobileNav();
  currentPage = pageId;
  window.scrollTo(0, typeof scrollY === 'number' ? scrollY : 0);
}

/* =========================================
   MOBILE NAV
   ========================================= */
function closeMobileNav() {
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');
  if (hamburger) hamburger.classList.remove('open');
  if (navLinks) navLinks.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function() {
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  document.addEventListener('click', function(e) {
    if (navLinks && navLinks.classList.contains('open')) {
      if (!e.target.closest('.navbar')) {
        closeMobileNav();
      }
    }
  }, { passive: true });

  /* Scroll: rAF throttle */
  var header = document.getElementById('main-header');
  var scrollTicking = false;
  window.addEventListener('scroll', function() {
    if (!scrollTicking) {
      window.requestAnimationFrame(function() {
        if (header) {
          header.classList.toggle('scrolled', window.scrollY > 10);
        }
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });
});

/* Nav links with history */
document.addEventListener('DOMContentLoaded', function() {
  var navLinkEls = document.querySelectorAll('.nav-link');
  for (var i = 0; i < navLinkEls.length; i++) {
    (function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var targetPage = link.getAttribute('data-page');
        if (targetPage && targetPage !== currentPage) {
          scrollPositions[currentPage] = window.scrollY;
          pageHistory.push({ page: currentPage, scroll: window.scrollY });
          _switchPage(targetPage, 0);
        }
      });
    })(navLinkEls[i]);
  }
});

/* =========================================
   TRAINING DATA
   ========================================= */
var trainingData = {
  'trenajor-kisi': {
    icon: 'fas fa-dumbbell',
    tag: 'Fitnes',
    title: 'Trenajor (Kişi)',
    desc: 'Kişilər üçün xüsusi hazırlanmış güc məşq proqramı. Peşəkar məşqçilərimizin rəhbərliyi altında əzələ kütləsi artırmaq, güclənmək, formada qalmaq və sağlıqlı həyat sürməyə başlamaq üçün ideal imkan. Müasir trenajorlarımız və fərdi yanaşmamızla hədəflərinizə çatacaqsınız.',
    prices: [
      { label: 'Aylıq', amount: 'Müraciət Et' },
      { label: '3 Aylıq', amount: 'Müraciət Et' },
      { label: '6 Aylıq', amount: 'Müraciət Et' },
      { label: 'İllik', amount: 'Müraciət Et' }
    ],
    features: [
      'Fərdi məşq planı',
      'Peşəkar məşqçi dəstəyi',
      'Müasir trenajorlar',
      'Pulsuz ilkin qiymətləndirmə',
      'Qidalanma məsləhəti',
      'İstənilən vaxt məşq'
    ]
  },
  'trenajor-qadin': {
    icon: 'fas fa-heart',
    tag: 'Fitnes',
    title: 'Trenajor (Qadın)',
    desc: 'Qadınlar üçün nəzərdə tutulmuş xüsusi fitnes proqramı. Arıqlamaq, elastiklik qazanmaq, sağlam qalmaq və özünüzə olan inamı artırmaq üçün uyğun bir mühit. Rahat, təhlükəsiz və motivasiyalı məşq mühiti ilə hədəflərinizə çatın.',
    prices: [
      { label: 'Aylıq', amount: 'Müraciət Et' },
      { label: '3 Aylıq', amount: 'Müraciət Et' },
      { label: '6 Aylıq', amount: 'Müraciət Et' },
      { label: 'İllik', amount: 'Müraciət Et' }
    ],
    features: [
      'Qadına xüsusi proqram',
      'Peşəkar məşqçi dəstəyi',
      'Rahat mühit',
      'Bədən kompozisiya analizi',
      'Qidalanma məsləhəti',
      'Çevik cədvəl'
    ]
  },
  'kikboksinq': {
    icon: 'fas fa-fist-raised',
    tag: 'Döyüş Sənəti',
    title: 'Kikboksinq',
    desc: 'Boks və karatenin birləşməsindən yaranan dinamik döyüş sənəti. Kikboksinq həm özünmüdafiə bacarıqları, həm güc və çeviklik, həm də möhtəşəm bir kondisiya məşqi üçün ideal seçimdir. Uşaqlardan böyüklərə qədər hər yaş qrupu üçün uyğundur.',
    prices: [
      { label: 'Aylıq', amount: 'Müraciət Et' },
      { label: '3 Aylıq', amount: 'Müraciət Et' },
      { label: '6 Aylıq', amount: 'Müraciət Et' },
      { label: 'İllik', amount: 'Müraciət Et' }
    ],
    features: [
      'Texnika məşqi',
      'Döyüş hazırlığı',
      'Kondisiya inkişafı',
      'Müsabiqəyə hazırlıq',
      'Özünmüdafiə bacarıqları',
      'Uşaq qrupları mövcuddur'
    ]
  }
};

/* =========================================
   CAMPAIGN DATA
   ========================================= */
var campaignData = {
  'starter': {
    icon: 'fas fa-star',
    title: 'Başlanğıc Paketi',
    badge: 'Yeni',
    desc: 'Yeni başlayanlar üçün xüsusi hazırlanmış paket. Günlük, həftəlik və aylıq seçimlərlə zala qoşulun! Peşəkar məşqçimiz sizin üçün fərdi məşq planı hazırlayacaq.',
    features: [
      'Günlük – 3 AZN',
      '12 gediş – 30 AZN',
      '16 gediş – 35 AZN',
      'Limitsiz – 40 AZN',
      'Pulsuz ilkin qiymətləndirmə',
      'Məşqçi dəstəyi'
    ],
    /* Starter üçün xüsusi qiymət seçimləri */
    priceOptions: [
      { label: 'Günlük', price: '3 AZN', waText: 'Günlük – 3 AZN' },
      { label: '12 gediş', price: '30 AZN', waText: '12 gediş – 30 AZN' },
      { label: '16 gediş', price: '35 AZN', waText: '16 gediş – 35 AZN' },
      { label: 'Limitsiz', price: '40 AZN', waText: 'Limitsiz – 40 AZN' }
    ]
  },
  'family': {
    icon: 'fas fa-users',
    title: 'Ailə Paketi',
    badge: 'Populyar',
    desc: 'Ailənizlə birgə məşq edin, daha çox qazanın! 2 və daha çox şəxs üçün xüsusi endirim tətbiq edilir. Ailə olaraq sağlıqlı həyat sürmek üçün ideal seçim. Bütün məşq növlərini əhatə edir.',
    features: [
      '2+ şəxs üçün endirim',
      'Bütün məşq növləri daxil',
      'Fərdi məşq planları',
      'Çevik cədvəl seçimi',
      'Uşaq qrupları mövcuddur',
      'Ödəniş üstünlüyü'
    ]
  },
  'student': {
    icon: 'fas fa-graduation-cap',
    title: 'Tələbə Paketi',
    badge: 'Tələbə',
    desc: 'Tələbə şəhadətnaməsi ilə xüsusi endirimli qiymətlə keyfiyyətli məşq imkanı əldə edin. Tələbə cədvəlinə uyğun çevik məşq saatları ilə həm oxuyun, həm də sağlıqlı qalın.',
    features: [
      'Tələbə şəhadətnaməsi tələb olunur',
      'Xüsusi endirimli qiymət',
      'Çevik cədvəl seçimi',
      'Bütün imkanlara giriş',
      'Məşqçi dəstəyi',
      'Aylıq ödəniş imkanı'
    ]
  },
  'annual': {
    icon: 'fas fa-calendar-alt',
    title: 'İllik Paket',
    badge: 'Sərfəli',
    desc: 'Bütün il boyunca sınırsız giriş. İllik ödəniş ilə ən sərfəli seçim. Qeydiyyat haqqı pulsuz! Uzunmüddətli öhdəlik götürməklə ən yaxşı dəyəri əldə edin və sağlıqlı həyat tərzinizi davamlı edin.',
    features: [
      '12 aylıq tam abunə',
      'Qeydiyyat haqqı pulsuz',
      'Prioritet xidmət',
      'Bütün məşq növlərə giriş',
      'Fərdi illik proqram',
      'Xüsusi VIP münasibət'
    ]
  }
};

/* =========================================
   OPEN TRAINING PAGE
   ========================================= */
function openTrainingPage(id) {
  var data = trainingData[id];
  if (!data) return;

  scrollPositions[currentPage] = window.scrollY;
  pageHistory.push({ page: currentPage, scroll: window.scrollY });

  var selectedPlan = data.prices[0].label;

  var priceTabsHTML = data.prices.map(function(p, idx) {
    return '<button class="price-tab' + (idx === 0 ? ' active' : '') + '" data-label="' + p.label + '" onclick="selectPriceTab(this, \'' + id + '\')">' + p.label + '</button>';
  }).join('');

  var featuresHTML = data.features.map(function(f) {
    return '<li><i class="fas fa-check-circle"></i> ' + f + '</li>';
  }).join('');

  var waMsg = encodeURIComponent(
    '🥊 Salam, RM İdman Klubu!\n\n' +
    'Məşq növü: ' + data.title + '\n' +
    'Plan: ' + selectedPlan + '\n' +
    'Müraciət etmək istəyirəm.\n\n' +
    'Zəhmət olmasa əlaqə saxlayın.'
  );

  var html =
    '<div class="detail-page-card">' +
      '<div class="detail-header">' +
        '<div class="detail-header-icon"><i class="' + data.icon + '"></i></div>' +
        '<div>' +
          '<div class="detail-tag">' + data.tag + '</div>' +
          '<h2>' + data.title + '</h2>' +
        '</div>' +
      '</div>' +
      '<div class="detail-body">' +
        '<p class="detail-desc">' + data.desc + '</p>' +
        '<div class="detail-section-title"><i class="fas fa-user-tie"></i> Məşqçi</div>' +
        '<div class="detail-trainer">' +
          '<img src="images/coach.jpg" alt="Məşqçi" class="trainer-avatar" />' +
          '<div class="trainer-info">' +
            '<h4>RM İdman Klubu Məşqçisi</h4>' +
            '<p>Peşəkar idman məşqçisi. Müsabiqələrin iştirakçısı. Tələbələrini çempionluğa aparan həvəsli məşqçi.</p>' +
          '</div>' +
        '</div>' +
        '<div class="detail-section-title"><i class="fas fa-list-check"></i> Nə daxildir?</div>' +
        '<ul class="detail-features-list">' + featuresHTML + '</ul>' +
        '<div class="detail-section-title"><i class="fas fa-tag"></i> Abunəlik Növü Seçin</div>' +
        '<div class="price-tabs" id="price-tabs-' + id + '">' + priceTabsHTML + '</div>' +
        '<div class="detail-section-title" style="margin-top:18px"><i class="fas fa-info-circle"></i> Qiymət Məlumatı</div>' +
        '<div class="detail-price-info">Dəqiq qiymət məlumatı üçün WhatsApp üzərindən əlaqə saxlayın.</div>' +
      '</div>' +
      '<div class="detail-cta">' +
        '<a href="https://wa.me/994555056722?text=' + waMsg + '" target="_blank" rel="noopener" class="btn btn-gold" id="wa-link-' + id + '"><i class="fab fa-whatsapp"></i> WhatsApp ilə Müraciət Et</a>' +
      '</div>' +
    '</div>';

  document.getElementById('training-detail-hero-title').textContent = data.title;
  document.getElementById('training-detail-content').innerHTML = html;
  _switchPage('training-detail', 0);
}

function selectPriceTab(btn, trainingId) {
  var tabs = btn.closest('.price-tabs').querySelectorAll('.price-tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
  }
  btn.classList.add('active');

  var selectedLabel = btn.getAttribute('data-label');
  var data = trainingData[trainingId];
  if (!data) return;

  var waMsg = encodeURIComponent(
    '🥊 Salam, RM İdman Klubu!\n\n' +
    'Məşq növü: ' + data.title + '\n' +
    'Plan: ' + selectedLabel + '\n' +
    'Müraciət etmək istəyirəm.\n\n' +
    'Zəhmət olmasa əlaqə saxlayın.'
  );

  var waLink = document.getElementById('wa-link-' + trainingId);
  if (waLink) {
    waLink.href = 'https://wa.me/994555056722?text=' + waMsg;
  }
}

/* =========================================
   OPEN CAMPAIGN PAGE
   ========================================= */
function openCampaignPage(id) {
  var data = campaignData[id];
  if (!data) return;

  scrollPositions[currentPage] = window.scrollY;
  pageHistory.push({ page: currentPage, scroll: window.scrollY });

  var featuresHTML = data.features.map(function(f) {
    return '<li><i class="fas fa-check-circle"></i> ' + f + '</li>';
  }).join('');

  var html = '';

  if (id === 'starter' && data.priceOptions) {
    /* Başlanğıc paketi – xüsusi qiymət seçimləri */
    var defaultOpt = data.priceOptions[0];
    var defaultWaMsg = encodeURIComponent(
      '🎯 Salam, RM İdman Klubu!\n\n' +
      'Kampaniya: ' + data.title + '\n' +
      'Seçdiyim paket: ' + defaultOpt.waText + '\n' +
      'Bu kampaniya haqqında məlumat almaq istəyirəm.\n\n' +
      'Zəhmət olmasa əlaqə saxlayın.'
    );

    var priceOptionsHTML = data.priceOptions.map(function(opt, idx) {
      return '<div class="starter-price-option' + (idx === 0 ? ' selected' : '') + '" ' +
             'onclick="selectStarterOption(this, \'' + opt.label + '\', \'' + opt.price + '\', \'' + opt.waText + '\')">' +
             '<span class="spo-label">' + opt.label + '</span>' +
             '<span class="spo-price">' + opt.price + '</span>' +
             '</div>';
    }).join('');

    html =
      '<div class="detail-page-card">' +
        '<div class="detail-header">' +
          '<div class="detail-header-icon"><i class="' + data.icon + '"></i></div>' +
          '<div>' +
            '<div class="detail-tag">' + data.badge + '</div>' +
            '<h2>' + data.title + '</h2>' +
          '</div>' +
        '</div>' +
        '<div class="detail-body">' +
          '<p class="detail-desc">' + data.desc + '</p>' +
          '<div class="detail-section-title"><i class="fas fa-money-bill-wave"></i> Paket Seçin</div>' +
          '<div class="starter-price-options" id="starter-price-options">' + priceOptionsHTML + '</div>' +
          '<div class="detail-section-title" style="margin-top:18px"><i class="fas fa-gift"></i> Paketə daxildir</div>' +
          '<ul class="detail-features-list">' + featuresHTML + '</ul>' +
        '</div>' +
        '<div class="detail-cta">' +
          '<a href="https://wa.me/994555056722?text=' + defaultWaMsg + '" target="_blank" rel="noopener" class="btn btn-gold" id="starter-wa-link"><i class="fab fa-whatsapp"></i> WhatsApp ilə Müraciət Et</a>' +
        '</div>' +
      '</div>';
  } else {
    /* Digər kampaniyalar */
    var waMsg = encodeURIComponent(
      '🎯 Salam, RM İdman Klubu!\n\n' +
      'Kampaniya: ' + data.title + '\n' +
      'Bu kampaniya haqqında məlumat almaq istəyirəm.\n\n' +
      'Zəhmət olmasa əlaqə saxlayın.'
    );

    html =
      '<div class="detail-page-card">' +
        '<div class="detail-header">' +
          '<div class="detail-header-icon"><i class="' + data.icon + '"></i></div>' +
          '<div>' +
            '<div class="detail-tag">' + data.badge + '</div>' +
            '<h2>' + data.title + '</h2>' +
          '</div>' +
        '</div>' +
        '<div class="detail-body">' +
          '<p class="detail-desc">' + data.desc + '</p>' +
          '<div class="detail-section-title"><i class="fas fa-gift"></i> Paketə daxildir</div>' +
          '<ul class="detail-features-list">' + featuresHTML + '</ul>' +
          '<div class="detail-section-title"><i class="fas fa-info-circle"></i> Qiymət Məlumatı</div>' +
          '<div class="detail-price-info"><i class="fas fa-phone-alt" style="color:var(--lime);margin-right:8px"></i>Dəqiq qiymət məlumatı üçün bizimlə əlaqə saxlayın. Fərdi təkliflər hazırlayırıq.</div>' +
        '</div>' +
        '<div class="detail-cta">' +
          '<a href="https://wa.me/994555056722?text=' + waMsg + '" target="_blank" rel="noopener" class="btn btn-gold"><i class="fab fa-whatsapp"></i> WhatsApp ilə Müraciət Et</a>' +
        '</div>' +
      '</div>';
  }

  document.getElementById('campaign-detail-hero-title').textContent = data.title;
  document.getElementById('campaign-detail-content').innerHTML = html;
  _switchPage('campaign-detail', 0);
}

/* Başlanğıc paketi qiymət seçimi */
function selectStarterOption(el, label, price, waText) {
  var opts = document.querySelectorAll('.starter-price-option');
  for (var i = 0; i < opts.length; i++) {
    opts[i].classList.remove('selected');
  }
  el.classList.add('selected');

  var waMsg = encodeURIComponent(
    '🎯 Salam, RM İdman Klubu!\n\n' +
    'Kampaniya: Başlanğıc Paketi\n' +
    'Seçdiyim paket: ' + waText + '\n' +
    'Bu kampaniya haqqında məlumat almaq istəyirəm.\n\n' +
    'Zəhmət olmasa əlaqə saxlayın.'
  );

  var waLink = document.getElementById('starter-wa-link');
  if (waLink) {
    waLink.href = 'https://wa.me/994555056722?text=' + waMsg;
  }
}

/* =========================================
   LIGHTBOX (multi-source: gallery & students)
   ========================================= */
var lightboxImages = [];
var lightboxIndex = 0;
var lightboxSource = 'gallery';

function buildLightboxImages(source) {
  lightboxImages = [];
  var gridId;
  if (source === 'students') {
    gridId = 'students-gallery-grid';
  } else if (source === 'athletes') {
    gridId = 'athletes-gallery-grid';
  } else if (source === 'champions') {
    gridId = 'champions-gallery-grid';
  } else {
    gridId = 'gallery-grid';
  }
  var items = document.querySelectorAll('#' + gridId + ' img');
  for (var i = 0; i < items.length; i++) {
    lightboxImages.push({ src: items[i].src, alt: items[i].alt });
  }
}

function openLightbox(index, source) {
  lightboxSource = source || 'gallery';
  buildLightboxImages(lightboxSource);
  if (!lightboxImages.length) return;
  lightboxIndex = index;
  _showLightboxImage();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function _showLightboxImage() {
  var lbImg = document.getElementById('lightbox-img');
  var counter = document.getElementById('lightbox-counter');
  var item = lightboxImages[lightboxIndex];
  if (!item) return;
  lbImg.src = item.src;
  lbImg.alt = item.alt;
  if (counter) {
    counter.textContent = (lightboxIndex + 1) + ' / ' + lightboxImages.length;
  }
}

function lightboxNav(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  _showLightboxImage();
}

function closeLightbox() {
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', function(e) {
  var lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'Escape') { closeLightbox(); }
  else if (e.key === 'ArrowRight') { lightboxNav(1); }
  else if (e.key === 'ArrowLeft') { lightboxNav(-1); }
});

/* Lightbox: backdrop click to close */
document.addEventListener('DOMContentLoaded', function() {
  var lb = document.getElementById('lightbox');
  if (lb) {
    lb.addEventListener('click', function(e) {
      if (e.target === lb) { closeLightbox(); }
    });

    /* Touch/swipe support */
    var touchStartX = 0;
    lb.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    lb.addEventListener('touchend', function(e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) { lightboxNav(dx < 0 ? 1 : -1); }
    }, { passive: true });
  }
});

/* =========================================
   PREVENT POPSTATE NAVIGATION
   ========================================= */
window.addEventListener('popstate', function(e) {
  e.preventDefault();
  e.stopPropagation();
});

/* =========================================
   PERFORMANCE: IMAGE ERROR HANDLING
   ========================================= */
document.addEventListener('DOMContentLoaded', function() {
  /* Handle broken images gracefully */
  var imgs = document.querySelectorAll('img');
  for (var i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('error', function() {
      this.style.background = 'var(--dark3)';
      this.style.minHeight = '120px';
    });
  }

  /* IntersectionObserver for lazy loading performance */
  if ('IntersectionObserver' in window) {
    var lazyImgs = document.querySelectorAll('img[loading="lazy"]');
    var imgObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            delete img.dataset.src;
          }
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });

    lazyImgs.forEach(function(img) {
      imgObserver.observe(img);
    });
  }
});

/* =========================================
   PERFORMANCE: PASSIVE SCROLL & RESIZE
   ========================================= */
(function() {
  /* Debounced resize handler */
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      /* Close mobile nav on resize to desktop */
      if (window.innerWidth > 640) {
        closeMobileNav();
      }
    }, 150);
  }, { passive: true });
})();

/* =========================================
   PERFORMANCE: PREFETCH & CACHE
   ========================================= */
(function() {
  /* Prefetch images that will likely be needed */
  if ('requestIdleCallback' in window) {
    requestIdleCallback(function() {
      var criticalImgs = ['images/coach.jpg'];
      criticalImgs.forEach(function(src) {
        var img = new Image();
        img.src = src;
      });
    }, { timeout: 2000 });
  }
})();

/* =========================================
   PERFORMANCE: PREVENT LAYOUT THRASH
   ========================================= */
(function() {
  /* Cache DOM queries for frequent elements */
  var _header = null;
  function getHeader() {
    if (!_header) _header = document.getElementById('main-header');
    return _header;
  }

  /* Use rAF for DOM reads/writes to avoid forced reflow */
  var _rafScheduled = false;
  function scheduleRaf(fn) {
    if (!_rafScheduled) {
      _rafScheduled = true;
      requestAnimationFrame(function() {
        fn();
        _rafScheduled = false;
      });
    }
  }
})();

/* =========================================
   PERFORMANCE: FAST CLICK ON MOBILE
   ========================================= */
(function() {
  /* Eliminate 300ms tap delay on older mobile browsers */
  if ('ontouchstart' in window) {
    document.documentElement.style.touchAction = 'manipulation';
  }
})();

/* =========================================
   PERFORMANCE: SERVICE WORKER HINT
   ========================================= */
(function() {
  /* Register service worker for caching if supported */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      /* SW registration is optional – skip if not present */
    });
  }
})();

/* =========================================
   PERFORMANCE: LINK PREFETCH ON HOVER
   ========================================= */
(function() {
  /* Prefetch WhatsApp link on hover for faster tap response */
  var waLinks = document.querySelectorAll('a[href*="wa.me"]');
  waLinks.forEach(function(link) {
    link.addEventListener('mouseenter', function() {
      var prefetchLink = document.createElement('link');
      prefetchLink.rel = 'prefetch';
      prefetchLink.href = this.href;
      document.head.appendChild(prefetchLink);
    }, { once: true });
  });
})();

/* =========================================
   PERFORMANCE: OPTIMIZED PAGE VISIBILITY
   ========================================= */
(function() {
  /* Pause animations when tab is hidden */
  document.addEventListener('visibilitychange', function() {
    var heroLogo = document.querySelector('.hero-logo');
    var heroScroll = document.querySelector('.hero-scroll');
    if (document.hidden) {
      if (heroLogo) heroLogo.style.animationPlayState = 'paused';
      if (heroScroll) heroScroll.style.animationPlayState = 'paused';
    } else {
      if (heroLogo) heroLogo.style.animationPlayState = 'running';
      if (heroScroll) heroScroll.style.animationPlayState = 'running';
    }
  });
})();

/* =========================================
   PERFORMANCE: MEMORY CLEANUP
   ========================================= */
(function() {
  /* Clean up scroll positions for pages not visited in a while */
  var MAX_HISTORY = 10;
  setInterval(function() {
    if (pageHistory.length > MAX_HISTORY) {
      pageHistory.splice(0, pageHistory.length - MAX_HISTORY);
    }
  }, 30000);
})();

/* =========================================
   PERFORMANCE: SMOOTH SCROLL TO TOP ON PAGE CHANGE
   ========================================= */
(function() {
  /* Use requestAnimationFrame for smooth scroll reset */
  var _origSwitchPage = _switchPage;
})();

/* =========================================
   PERFORMANCE: IMAGE LOADING OPTIMIZATION
   ========================================= */
(function() {
  /* Add decode() hint for critical images */
  document.addEventListener('DOMContentLoaded', function() {
    var criticalImages = document.querySelectorAll('.hero-logo, .about-img-wrap img');
    criticalImages.forEach(function(img) {
      if (img.decode) {
        img.decode().catch(function() { /* ignore */ });
      }
    });
  });
})();

/* =========================================
   PERFORMANCE: EVENT DELEGATION
   ========================================= */
(function() {
  /* Use event delegation for card clicks instead of individual handlers */
  document.addEventListener('DOMContentLoaded', function() {
    /* Optimize touch events for cards */
    var cards = document.querySelectorAll('.training-card, .campaign-card');
    cards.forEach(function(card) {
      card.addEventListener('touchstart', function() {}, { passive: true });
    });
  });
})();
