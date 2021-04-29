(function($) {
  $(function() {

    // アニメーション速度
    const transition = 1000; // ミリ秒

    // 変数
    const windowHeight = $(window).height();
    let targets = [];

    // ターゲットにCSSアニメーションを追加
    $('[data-scroll-on]').each(function() {
      $(this).css('transition', (transition / 1000) + 's');
    });

    // ターゲット位置を取得
    getPositions(); // 即時取得
    setTimeout(getPositions, 1000); // 1秒後に取得(画像の取得などで位置が変更される場合対策)
    $(window).on('load', getPositions()); // 画像などが完全に読み込まれてから
    function getPositions() {
      targets = [];
      $('[data-scroll-on]').each(function() {
        const value = $(this).data('scroll-on');
        const top = $(this).offset().top;
        targets.push({
          selector: $(this),
          amount: (value > 1) ? value : (value <= 1) ? top - windowHeight + (windowHeight * value) : 0.5,
          playBack: $(this).is('[data-playback]'),
        });
      });
    }

    // スクロール時の処理
    $(window).on('load scroll', function() {
      const scroll = $(window).scrollTop();
      $.each(targets, function(index, target) {
        if (target.amount <= scroll) {
          if (! target.selector.hasClass('on')) {
            target.selector.addClass('on');
          }
        } else {
          if (target.playBack && target.selector.hasClass('on')) {
            target.selector.removeClass('on');
          }
        }
      });
    });

  });
})( jQuery );
