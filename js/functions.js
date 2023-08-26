// JavaScript Document


//slickスライドショー
$(function() {
	$('.slideshow').slick({
		autoplay: true,
		autoplaySpeed: 3000,
		arrow: false,
		fade: true,
		pauseOnHover: false,
		speed: 2000,
	});
});

//PC表示時ナビゲーションを左に固定（ナビがtopに来たら固定）
$(function() {
  var $win = $(window),
      $main = $('main'),
      $nav = $('.nav'),
      navHeight = $nav.outerHeight(),
      navPos = $nav.offset().top,
      fixedClass = 'is-fixed';

  $win.on('load scroll', function() {
    var value = $(this).scrollTop();
    if ( value > navPos ) {
      $nav.addClass(fixedClass);
      $main.css('margin-top', navHeight);
    } else {
      $nav.removeClass(fixedClass);
      $main.css('margin-top', '0');
    }
  });
});

//リンク（ページ内遷移）クリックで自動スクロール
$(function(){
  $('a[href^="#"]').click(function(){
    let speed = 500;
    let href= $(this).attr("href");
    let target = $(href == "#" || href == "" ? 'html' : href);
    let position = target.offset().top;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });
});

//カーソルをクリックできる場所の上に持ってきたらカーソル拡大
$(function() {
  var
  cursor = $(".cursor"),
  cWidth = 20, //カーソルの大きさ
  mouseX = 0, //マウスのX座標
  mouseY = 0; //マウスのY座標
  
  $(document).on('mousemove', function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    cursor.css({
      //カーソルの真ん中に座標軸が来るよう、
      //カーソルの大きさの半分を引きます
      left: mouseX - (cWidth / 2),
      top: mouseY - (cWidth / 2)
    })
  });

  $("a").on({
    "mouseenter": function() {
      cursor.addClass("is-active");
    },
    "mouseleave": function() {
      cursor.removeClass("is-active");
    }
  });
  
});

//ハンバーガーメニュークリックでクラス名付与とbody固定
$(function() {
  var pos = $(window).scrollTop();

  $('.humberger-button').click(function(){
    $(this).toggleClass('is-active');
    $('.humberger-contents').toggleClass('is-active');
    $("body").toggleClass('is-fixed').css({'top': pos});

  });

  $('.humberger-contents a').click(function () {//ナビゲーションのリンクがクリックされたら
    $('.humberger-button').removeClass('is-active');//ボタンの is-activeクラスを除去し
    $('.humberger-contents').removeClass('is-active');//ナビゲーションのis-activeクラスも除去
    $("body").removeClass('is-fixed').css({'top':0});
  });
});
