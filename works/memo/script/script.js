

$(function() {

  // ローカルストレージの保存・読み込み
  function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }
  function getLocalStorage(key) {
    return localStorage.getItem(key);
  }
  $(".post").html(getLocalStorage("post"));
  var i = 1;
  i = getLocalStorage('val');
  i++

  // 投稿
  var submit = function() {
    var comment = $('.comment').val();
     $('.post').prepend('<article class="singlePost' + i +'"></article>');
    Promise.resolve()
    .then (function () {
      $('.singlePost' + i).prepend('<p>' + comment + '</p>');
      insertDate();
    }).finally(function() {
      reset();
    });
  }
  $('.submit').on('click', function(){
    if ($('.file').val().length == 0 && $('.comment').val().length != 0) {
      submit();
    } else {
      return false;
    }
  });
  $(document).on('keydown', function(e) {
    if ($('.file').val().length == 0 && $('.comment').val().length != 0) {
      if(e.metaKey && e.keyCode === 13){
        submit();
      }
    } else {
      return false;
    }
  });
  $('.file').on('change', function(e) {
    var file = e.target.files[0];
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function() {
      var dataUri = this.result;
      $('.submit').one('click', function() {
        Promise.resolve()
        .then (function () {
          var comment = $('.comment').val();
          $('.post').prepend('<article class="singlePost' + i +'"></article>');
          $('.singlePost' + i).append('<div class="imgWrap"><img class="image" src="' + dataUri + '"></div>');
          if (comment) {
            $('.singlePost' + i).prepend('<p>' + comment + '</p>');
          }
          insertDate();
        }).finally(function() {
          reset();
        });
      });
      $('.comment').on('keydown', function(e){
        if(e.metaKey && e.keyCode === 13){
          $('.submit').trigger('click');
        }
      });
    }
    $('.comment').off();
  });

  // 日付を挿入
  function insertDate() {
    var date = new Date();
    var yyyy = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mm = ('0' + m).slice(-2);
    var dd = ('0' + d).slice(-2);
    var mi = date.getMinutes();
    var hh = ('0' + h).slice(-2);
    var mmi = ('0' + mi).slice(-2);
    var dateTxt = yyyy + '/' + mm + '/' + dd + ' ' + hh + ':' + mmi;
    $('.singlePost' + i).append('<div class="bottom"><time class="time">' + dateTxt +'</time><span class="delete"><ion-icon name="trash-outline"></ion-icon></span></div>');
  }

  // 投稿後の処理
  function reset() {
    var post = $('.post').html();
    $('.file, .comment').val('');
    i++;
    comment = '';
    setLocalStorage('post', post);
    setLocalStorage('val', i);
    $(this).off();
  }

  // 削除ボタン
  $(document).on('click', '.delete', function() {
    var thePost = $(this).closest('[class^="singlePost"]');
    $.when(
      thePost.fadeOut(),
      setTimeout (function() {
        thePost.remove();
      },1000)
    ).done(function(){ 
      var post = $('.post').html();
      setLocalStorage('post', post)
    });
  });

  // リセットボタン
  $('.reset').on('click', function() {
    $('.modal, .modalBg').addClass('is-visible');
    $('.ok').on('click', function() {
      localStorage.removeItem('post');
      localStorage.removeItem('val');
      $('.post').html('');
      i = 1;
      $('.modal, .modalBg').removeClass('is-visible');
    });
    $('.no').on('click', function() {
      $('.modal, .modalBg').removeClass('is-visible');
    });
  });
});

