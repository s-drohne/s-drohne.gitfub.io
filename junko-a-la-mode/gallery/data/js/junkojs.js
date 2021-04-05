$(function() {
  $('.index-open').on({'click': function() {
    $(this).addClass('is-pressed');
    $('.index-bg, .index').show();
    setTimeout(function() {
      $('.index').removeClass('is-shrinking');
    }, 100);
  },
  'mouseleave': function() {
    $(this).removeClass('is-pressed');
  }
  });

  $('.index__close, .index-bg').on('click', function() {
    $('.index').addClass('is-shrinking');
    setTimeout(function() {
      $('.index, .index-bg').fadeOut()
    }, 650);
  });

  $('.index__list li').first().addClass('active');

  var
  cursor = $('.cursor'),
  cWidth = 8,
  mouseX = 0,
  mouseY = 0;

  $(document).on('mousemove', function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    cursor.css({
      left: mouseX - (cWidth / 2),
      top: mouseY - (cWidth / 2)
    })
  });
  $('a, .index__list li').on({
    'mouseenter': function() {
      cursor.addClass('is-active');
    },
    'mouseleave': function() {
      cursor.removeClass('is-active');
    }
  });
  $('.nav--prev').on({
    'mouseenter': function() {
      cursor.addClass('is-prev');
      $('.cursor__text').text('prev');
    },
    'mouseleave': function() {
      cursor.removeClass('is-prev');
      $('.cursor__text').text();
    }
  });
  $('.nav--next').on({
    'mouseenter': function() {
      cursor.addClass('is-next');
      $('.cursor__text').text('next');
    },
    'mouseleave': function() {
      cursor.removeClass('is-next');
      $('.cursor__text').text();
    }
  });

  $('.index__list li').each(function(i){
    $(this).attr('data-url','../photo/img-' + (i+1) + '.jpg');
  });

  function toggleChangeBtn() {
    var slideIndex = $('.index__list li').index($('.active'));
    $('.nav').show();
    if(slideIndex == 0){
        $('.nav--prev').hide();
    }else if(slideIndex == $('.index__list li').length - 1){
        $('.nav--next').hide();
    }
  }
  toggleChangeBtn();

  $('.nav--next').click(function() {
    var $displaySlide = $('.active');
    $displaySlide.removeClass('active');
    $displaySlide.next().addClass('active');
    var uri = $('.active').attr('data-url');
    $('.image').css('background-image', 'url(' + uri + ')');
    toggleChangeBtn();
  });
  $('.nav--prev').click(function() {
    var $displaySlide = $('.active');
    $displaySlide.removeClass('active');
    $displaySlide.prev().addClass('active');
    var uri = $('.active').attr('data-url');
    $('.image').css('background-image', 'url(' + uri + ')');
    toggleChangeBtn();
  });

  $('.index__list li').on('click', function() {
    var uri = $(this).attr('data-url');
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $('.image').css('background-image', 'url(' + uri + ')');
    $('.index').addClass('is-shrinking');
    setTimeout(function() {
      $('.index, .index-bg').fadeOut()
    }, 650);
    $('.credit').fadeOut();
    $('.credit').removeClass('is-moving');
    toggleChangeBtn();
  });

  $('.index__credit').on('click', function() {
    $('.index').addClass('is-shrinking');
    setTimeout(function() {
      $('.index, .index-bg').fadeOut()
    }, 650);
    setTimeout(function() {
      $('.credit').fadeIn();
      $('.credit-scroll').addClass('is-moving');
    }, 800);
  });
});

$(document).ready(function(){
  $('.loader').fadeOut();
});
