$(function() {
  $('main').hide().fadeIn(700);
  $(".backToTop").click(function () {
    $('body,  html').animate({
      scrollTop: 0
    }, 200);
    return false;
  });
  $('.header__menu').click(function() {
    $('.sidemenu').addClass('is-open');
  });
  $('.sidemenu__close').click(function(){
    $('.sidemenu').removeClass('is-open');
  });
  $('.detail__item__thumbnail img').click(function(){
    var $thisImg = $(this).attr('src');
    var $thisAlt = $(this).attr('alt');
    $('.detail__item__main img').fadeOut(function(){
      $('.detail__item__main img').attr({src:$thisImg,alt:$thisAlt}).fadeIn();
    });
  });
});
