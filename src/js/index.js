$(function() {

  function scrollTo(selector, cb) {
    $("html").animate({
      scrollTop: $(selector).offset().top + 5 + 'px'
    }, 500, cb);
  }

  $('a[href^="#"]').click(function (e) {
    e.preventDefault();
    scrollTo( $(this).attr('href') );
  });

  // Video
  const $video = $(".video");
  $video.addClass("js-enabled");
  $video.one("click", function(e) {
    e.preventDefault();

    const $link = $video.find("a");
    const href = $link.attr("href");
    // Remove link
    $link.remove();
    // Remove button
    const $button = $video.find(".video-play");
    $button.remove();
    // Insert iframe
    const vidId = href.split("v=")[1];
    const iframe = document.createElement("iframe");
    iframe.setAttribute("allow", "autoplay");
    iframe.setAttribute("src", `https://www.youtube.com/embed/${vidId}?autoplay=1`);
    iframe.classList.add("video-cover");

    $video.prepend(iframe);

    // Включение видео
    console.log("Включение видео");
    ym(86219923, 'reachGoal', 'play-video');
    gtag('event', 'click', { 'event_category': 'video_click' });
  });

  // Слайдер
  $(".slider")
    .addClass("owl-carousel")
    .owlCarousel({
      loop:   true,
      dots:   true,
      nav:    true,
      items:  1,
      margin: 2,
      autoHeight: true,
      mouseDrag: true,
      touchDrag: true,
    })

  // Яндекс Метрика

  setTimeout(() => {
    // Яндекс Метрика: На сайте больше 30 сек
    console.log("Яндекс Метрика: На сайте больше 30 сек");
    ym(86219923, 'reachGoal', 'stayed-30-seconds');
  }, 30_000);
  
  setTimeout(() => {
    // Яндекс Метрика: На сайте больше 50 сек
    console.log("Яндекс Метрика: На сайте больше 50 сек");
    ym(86219923, 'reachGoal', 'stayed-50-seconds');
  }, 50_000);

  let reachedScroll50 = false;
  let reachedScroll100 = false;
  document.addEventListener("scroll", e => {
    var elem = document.documentElement;
    const scroll = (elem.scrollTop || elem.scrollTop) / (elem.scrollHeight - elem.clientHeight) * 100;

    if (scroll > 50 && !reachedScroll50) {
      reachedScroll50 = true;
      console.log("Скролл 50% страницы");
      ym(86219923,'reachGoal','scroll-50%');
      gtag('event', 'scroll', { 'event_category': 'scroll_50%' });
    }
    
    if (scroll > 99.6 && !reachedScroll100) {
      reachedScroll100 = true;
      console.log("Скролл 100% страницы");
      ym(86219923, 'reachGoal', 'scroll-100%');
      gtag('event', 'scroll', { 'event_category': 'scroll_100%' });
    }
  })

  document.getElementById("logo").addEventListener("click", e => {
    console.log("Яндекс Метрика: Клик на логотип");
    ym(86219923, 'reachGoal', 'click-logo');

    console.log("Гугл Аналитика: Клик на логотип");
    gtag('event', 'click', { 'event_category': 'logo_click' });
  });
  
  document.getElementById("nav1").addEventListener("click", e => {
    console.log("Гугл Аналитика: Клик по 'О проекте' в навигации");
    gtag('event', 'click', { 'event_category': 'nav1_click' });
  });

  document.getElementById("nav2").addEventListener("click", e => {
    console.log("Клик по 'Конкурс' в навигации");
    gtag('event', 'click', { 'event_category': 'nav2_click' });
  });

  document.getElementById("nav3").addEventListener("click", e => {
    console.log("Клик по 'О смартфоне' в навигации");
    gtag('event', 'click', { 'event_category': 'nav3_click' });
  });
  
  $(".js-slider-btn").click(() => {
    console.log("Клик по кнопке 'Купить' в слайдере");
    ym(86219923, 'reachGoal', 'click-btn-in-slider');
    gtag('event', 'click', { 'event_category': 'click_btn_in_slider' });
  });
  
  $("#participate-btn").click(e => {
    console.log("Клик по кнопке 'Участвовать'");
    gtag('event', 'click', { 'event_category': 'participate_click' });
  })
  
  $(".section5__btn").click(e => {
    console.log("Клик по кнопке 'Купить' в блоке перед видео");
    gtag('event', 'click', { 'event_category': 'buy_btn_before_video_click' });
  });
  
  $("#rules-link").click(e => {
    console.log("Клик по ссылке с правилами конкурса");
    gtag('event', 'click', { 'event_category': 'rules_click' });
  })

});
