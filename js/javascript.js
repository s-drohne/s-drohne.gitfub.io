$(function() {
  $('.title').hide().fadeIn(2000);
  $(".backToTop").click(function () {
    $('body,  html').animate({
      scrollTop: 0
    }, 200);
    return false;
  });
  $('.works__items .works__items__item').on('click', function() {
    winScrollTop = $(window).scrollTop();
    var target = $(this).data('target');
    var modal = document.getElementById(target);
    var btnIndex = $(this).index();
    $('.modal-area .modal-area__items').eq(btnIndex).fadeIn(700);
    $('body').addClass('is-modal-open');
    $('.modal-area__close').css('visibility', 'visible');
    $('.modal-area__close').css('opacity', '1');
  });
  $('.modal-area__close').click(function(){
    $('.modal-area__items').fadeOut(700);
    $('body,html').stop().animate({scrollTop:winScrollTop}, 100);
    $('body').removeClass('is-modal-open');
    $(this).css('visibility', 'hidden');
    $(this).css('opacity', '0');
  });
});

$(window).scroll(function() {
  $('.fadein').each(function() {
    var targetElement = $(this).offset().top;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll > targetElement - windowHeight + 200) {
      $(this).css('opacity', '1');
      $(this).css('transform', 'translateY(0)');
    }
  });
  $('.backToTop').each(function() {
    if ($("html").scrollTop() > 100) {
      $(this).css("transform", "translateY(0)");
      $(this).css("opacity", "1");
    } else {
      $(this).css("transform", "translateY(40px)");
      $(this).css("opacity", "0");
    }
  });
});

$(document).ready(function(){
  var slider = $('.modal-area__items__img').slick({
    arrows: true,
    dots: true,
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          adaptiveHeight: true
        }
      }
    ]
  });
  $('.works__items__item').click(function(){
    slider.slick('setPosition')
  });
});
