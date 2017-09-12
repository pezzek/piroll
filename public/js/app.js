$(window).on('load', function () {
   $('.block-loader').fadeOut('slow');
});

$(document).ready(function () {
   // Pop Up
   function disableScroll(disable) {
      if (disable == true) {
         $('body').css('overflow-y', 'hidden');
      } else {
         $('body').css('overflow-y', 'auto');
      }
   }

   // Navigation
   function navbarStickyClass(sticky) {
      if (sticky == true) {
         $('.navbar').addClass('navbar-sticky');
         $('#banner').addClass('block-fill');
      } else {
         $('.navbar').removeClass('navbar-sticky');
         $('#banner').removeClass('block-fill');
      }
   }

   function navbarToggleSide(toggle) {
      if (toggle == true) {
         $('.navbar-nav').addClass('navbar-nav-slide');
         $('.navbar-backdrop').fadeIn();
         disableScroll(true);
      } else {
         $('.navbar-nav').removeClass('navbar-nav-slide');
         $('.navbar-backdrop').fadeOut();
         disableScroll(false);
      }
   }

   $('.navbar-toggler').click(function (e) {
      e.preventDefault();
      navbarToggleSide(true);
   });

   $('#nav-close').click(function (e) {
      e.preventDefault();
      navbarToggleSide(false);
   });

   $window = $(window);
   if ($window.scrollTop() > 16) {
      navbarStickyClass(true);
   }

   $(window).scroll(function () {
      if ($(this).scrollTop() > 16) {
         navbarStickyClass(true);
      } else {
         navbarStickyClass(false);
      }
   });

   // Backdrop Click
   $('.navbar-backdrop').click(function() {
      navbarToggleSide(false);
   });

   // Background Block
   function setBackgroundBlock(url) {
      var url = $('.block-bg').attr('data-background');
      console.log(url);
   }

   // Slider
   $('#quotes').slick({
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      arrows: false,
      fade: true,
      cssEase: 'linear'
   });

   // Smooth Scroll
   $('[smooth-scroll-target]').on('click', function (e) {
      e.preventDefault();
      target = $(this).attr('smooth-scroll-target');
      $.smoothScroll({
         scrollTarget: target,
         offset: -56,
         speed: 'auto'
      });
      location.hash = target;
   });

   // Scroll Reveal
   window.sr = ScrollReveal({
      reset: true
   });
   sr.reveal('.block-reveal', {
      duration: 500,
      scale: 1,
      viewOffset: {top: 56}
   });

   // Fancybox
   $('[data-fancybox]').fancybox({
      buttons: [
         'thumbs',
         'close'
      ],
      animationDuration: 500,
      transitionEffect: "slide"
   });
});

// Play button
var playButton = $('#playButton');
var player;
function onYouTubeIframeAPIReady() {
   player = new YT.Player('player', {
      videoId: videoId,
      playerVars: {
         autoplay: 0,
         iv_load_policy: 3,
         rel: 0,
         showinfo: 0,
         theme: 'dark'
      },
      events: {
         'onReady': onPlayerReady,
         'onStateChange': onPlayerStateChange
      }
   });
}

function onPlayerReady(event) {
   playButton.show();
   playButton.click(function () {
      player.playVideo();
      playButton.fadeOut('slow');
   });
}

function onPlayerStateChange(event) {
   if (event.data == YT.PlayerState.PAUSED) {
      playButton.fadeIn();
   } else if (event.data == YT.PlayerState.PLAYING) {
      playButton.fadeOut();
   }
}
