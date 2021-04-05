$(document).ready(function(){
  $('.loader').fadeOut();
});

$(function(){

  // open index
  $('.js-index-opener').on('click', function() {
    $('.works__index__list').toggleClass('is-open');
    if ($('.works__index__list').hasClass('is-open')) {
      $(this).children('span').text('Close Index');
    } else {
      $(this).children('span').text('Open Index');
    }
  });

  // fix works index
  var windowHeight = $(window).innerHeight();
  var worksPos = $('.works').offset().top;
  var bioPos = $('.biography').offset().top;
  let fixItem = $('.works__index, .works__index__opener');
  $(window).on('scroll', function() {
    var scrollPos = $(this).scrollTop();
    // when works are visible
    if ( scrollPos >= worksPos - (windowHeight / 2)) {
      fixItem.removeClass('is-up').addClass('is-fixed');
    } else {
      fixItem.removeClass('is-fixed');
    }
    //when scroll down
    if ( scrollPos >= bioPos - windowHeight) {
      fixItem.removeClass('is-fixed').addClass('is-up');
    }
  });

  // works navigation
  var windowHeight = $(window).innerHeight();
  var worksHeight = $('.works').innerHeight();
  var item = $('.works__item');
  var itemHeight = item.innerHeight();
  var itemMargin = 80
  var itemAreaHeight = itemHeight + itemMargin;
  var prev = $('.works__nav__prev');
  var next = $('.works__nav__next');

  $(window).on('scroll', function() {
    var pos = $(window).scrollTop();
    item.each(function() {
    if (pos >= $(this).offset().top - windowHeight) {
      $(this).addClass('is-visible');
    } else if (pos >= $(this).offset().top + $(this).innerHeight()) {
      $(this).remoeClass('is-visible');
    }
  });

  // show/hide arrows
  var worksPos = $('.works__inner').offset().top;
  // when the 1st work is shown
  if (pos >= worksPos) {
    next.addClass('is-show');
  }
  // when the 2nd work is shown
  if (pos >= worksPos + itemAreaHeight) {
    prev.addClass('is-show');
  } else {
    prev.removeClass('is-show');
  }
  // when the last work is shown
  if (pos >= worksHeight - itemAreaHeight) {
    next.removeClass('is-show');
  }
  // when the last work is invisible
  if ( pos >= bioPos - itemAreaHeight ) {
    prev.removeClass('is-show');
  }
  // when scroll up
  if (pos <= worksHeight - itemAreaHeight) {
    next.addClass('is-show');
  }
  if (pos <= worksPos - itemAreaHeight) {
    next.removeClass('is-show');
  }
});

$('.works__item__title').each(function(i) {
  var title = $(this).text();
  $('.works__index__list').append('<li data-href="work-' + i + '">' + title + '</li>')
});
$('[data-href^="work-"]').on('click', function() {
  var num = $(this).attr('data-href');
  var targetPos = $('[data-label="' + num + '"]').offset().top - itemMargin;
  $('html, body').animate({
    scrollTop: targetPos
  }, 200);
  console.log(targetPos)
});

  next.on('click', function() {
    var currentPos = $(window).scrollTop();
    $('html,body').animate({
      scrollTop: currentPos + itemAreaHeight},200
    );
  });
  prev.on('click', function() {
    var currentPos = $(window).scrollTop();
    $('html,body').animate({
      scrollTop: currentPos - itemAreaHeight},200
    );
  })


  // stick heading
  var heading = $('.works__heading');
  var headingHeight = heading.height();
  $(window).on('scroll', function() {
    var currentPos = $(window).scrollTop();
    if ( currentPos >= worksPos ) {
      heading.addClass('is-fixed');
    } else {
      heading.removeClass('is-fixed');
    }
    if ( currentPos >= bioPos - headingHeight ) {
      heading.removeClass('is-fixed').addClass('is-bottom-fixed');
    } else {
      heading.removeClass('is-bottom-fixed');
    }
  });

  // modal
  // numbering
  $('.works__item').each(function(i){
    $(this).attr('data-label', 'work-' + i);
  });
  $('.modal').each(function(i) {
    $(this).attr('data-id', 'work-' + i)
  });

  // open modal
  $('[data-label^="work-"]').on('click', function() {
    var name = $(this).attr('data-label');
    $('.modal[data-id="' + name +'"]').addClass('is-open');
    $('html, body').css('overflow', 'hidden');
  });
  // close modal
  $('.modal__close').on('click', function() {
    $(this).parents('.modal').removeClass('is-open');
    $('html, body').css('overflow', 'auto');
  });
});
