//===============================================================
// 繝｡繝九Η繝ｼ蛻ｶ蠕｡逕ｨ縺ｮ髢｢謨ｰ縺ｨ繧､繝吶Φ繝郁ｨｭ螳夲ｼ遺ｻ繝舌�繧ｸ繝ｧ繝ｳ2025-1��
//===============================================================
$(function(){
  //-------------------------------------------------
  // 螟画焚縺ｮ螳｣險
  //-------------------------------------------------
  const $menubar = $('#menubar');
  const $menubarHdr = $('#menubar_hdr');
  const breakPoint = 900;	// 縺薙％縺後ヶ繝ｬ繧､繧ｯ繝昴う繝ｳ繝域欠螳夂ｮ�園縺ｧ縺�

  // 笆ｼ縺薙％繧貞�繧頑崛縺医ｋ縺�縺代〒 2繝代ち繝ｼ繝ｳ繧剃ｽｿ縺��縺托ｼ�
  //   false 竊� 窶懷ｾ捺擂縺ｩ縺翫ｊ窶�
  //   true  竊� 窶懊ワ繝ｳ繝舌�繧ｬ繝ｼ縺碁撼陦ｨ遉ｺ縺ｮ髢薙� #menubar 繧る撼陦ｨ遉ｺ窶�
  const HIDE_MENUBAR_IF_HDR_HIDDEN = false;

  // 繧ｿ繝�メ繝�ヰ繧､繧ｹ縺九←縺�°縺ｮ蛻､螳�
  const isTouchDevice = ('ontouchstart' in window) ||
                       (navigator.maxTouchPoints > 0) ||
                       (navigator.msMaxTouchPoints > 0);

  //-------------------------------------------------
  // debounce(蜃ｦ逅��蜻ｼ縺ｳ蜃ｺ縺鈴�ｻ蠎ｦ繧呈椛蛻ｶ) 髢｢謨ｰ
  //-------------------------------------------------
  function debounce(fn, wait) {
    let timerId;
    return function(...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn.apply(this, args);
      }, wait);
    };
  }

  //-------------------------------------------------
  // 繝峨Ο繝��繝繧ｦ繝ｳ逕ｨ縺ｮ蛻晄悄蛹夜未謨ｰ
  //-------------------------------------------------
  function initDropdown($menu, isTouch) {
    // 繝峨Ο繝��繝繧ｦ繝ｳ繝｡繝九Η繝ｼ縺悟ｭ伜惠縺吶ｋli縺ｫ繧ｯ繝ｩ繧ｹ霑ｽ蜉�
    $menu.find('ul li').each(function() {
      if ($(this).find('ul').length) {
        $(this).addClass('ddmenu_parent');
        $(this).children('a').addClass('ddmenu');
      }
    });

    // 繝峨Ο繝��繝繧ｦ繝ｳ髢矩哩縺ｮ繧､繝吶Φ繝郁ｨｭ螳�
    if (isTouch) {
      // 繧ｿ繝�メ繝�ヰ繧､繧ｹ縺ｮ蝣ｴ蜷� 竊� 繧ｿ繝��縺ｧ髢矩哩
      $menu.find('.ddmenu').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const $dropdownMenu = $(this).siblings('ul');
        if ($dropdownMenu.is(':visible')) {
          $dropdownMenu.hide();
        } else {
          $menu.find('.ddmenu_parent ul').hide(); // 莉悶ｒ髢峨§繧�
          $dropdownMenu.show();
        }
      });
    } else {
      // PC縺ｮ蝣ｴ蜷� 竊� 繝帙ヰ繝ｼ縺ｧ髢矩哩
      $menu.find('.ddmenu_parent').hover(
        function() {
          $(this).children('ul').show();
        },
        function() {
          $(this).children('ul').hide();
        }
      );
    }
  }

  //-------------------------------------------------
  // 繝上Φ繝舌�繧ｬ繝ｼ繝｡繝九Η繝ｼ縺ｧ縺ｮ髢矩哩蛻ｶ蠕｡髢｢謨ｰ
  //-------------------------------------------------
  function initHamburger($hamburger, $menu) {
    $hamburger.on('click', function() {
      $(this).toggleClass('ham');
      if ($(this).hasClass('ham')) {
        $menu.show();
        // 笆ｼ 繝悶Ξ繧､繧ｯ繝昴う繝ｳ繝域悴貅縺ｧ繝上Φ繝舌�繧ｬ繝ｼ縺碁幕縺�◆繧� body 縺ｮ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ遖∵ｭ｢
        //    �医Γ繝九Η繝ｼ縺檎判髱｢縺�▲縺ｱ縺�↓ fixed 陦ｨ遉ｺ縺輔ｌ縺ｦ縺�ｋ譎ゅ↓閭悟ｾ後ｒ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ縺輔○縺ｪ縺�◆繧�ｼ�
        if ($(window).width() < breakPoint) {
          $('body').addClass('noscroll');
        }
      } else {
        $menu.hide();
        // 笆ｼ 繝上Φ繝舌�繧ｬ繝ｼ繧帝哩縺倥◆繧峨せ繧ｯ繝ｭ繝ｼ繝ｫ遖∵ｭ｢繧定ｧ｣髯､
        if ($(window).width() < breakPoint) {
          $('body').removeClass('noscroll');
        }
      }
      // 繝峨Ο繝��繝繧ｦ繝ｳ驛ｨ蛻�ｂ荳譌ｦ髢峨§繧�
      $menu.find('.ddmenu_parent ul').hide();
    });
  }

  //-------------------------------------------------
  // 繝ｬ繧ｹ繝昴Φ繧ｷ繝匁凾縺ｮ陦ｨ遉ｺ蛻ｶ蠕｡ (繝ｪ繧ｵ繧､繧ｺ譎�)
  //-------------------------------------------------
  const handleResize = debounce(function() {
    const windowWidth = $(window).width();

    // body繧ｯ繝ｩ繧ｹ縺ｮ蛻ｶ蠕｡ (small-screen / large-screen)
    if (windowWidth < breakPoint) {
      $('body').removeClass('large-screen').addClass('small-screen');
    } else {
      $('body').removeClass('small-screen').addClass('large-screen');
      // PC陦ｨ遉ｺ縺ｫ縺ｪ縺｣縺溘ｉ縲√ワ繝ｳ繝舌�繧ｬ繝ｼ隗｣髯､ + 繝｡繝九Η繝ｼ繧帝幕縺�
      $menubarHdr.removeClass('ham');
      $menubar.find('.ddmenu_parent ul').hide();

      // 笆ｼ PC陦ｨ遉ｺ縺ｫ蛻�ｊ譖ｿ繧上▲縺溘ｉ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ遖∵ｭ｢繧りｧ｣髯､縺励※縺翫￥ (菫晞匱逧�↑諢丞袖蜷医＞)
      $('body').removeClass('noscroll'); // 笘�ｿｽ蜉�

      // 笆ｼ #menubar 繧定｡ｨ遉ｺ縺吶ｋ縺�/縺励↑縺�°縺ｮ蛻�ｊ譖ｿ縺�
      if (HIDE_MENUBAR_IF_HDR_HIDDEN) {
        $menubarHdr.hide();
        $menubar.hide();
      } else {
        $menubarHdr.hide();
        $menubar.show();
      }
    }

    // 繧ｹ繝槭�(繝悶Ξ繧､繧ｯ繝昴う繝ｳ繝域悴貅)縺ｮ縺ｨ縺�
    if (windowWidth < breakPoint) {
      $menubarHdr.show();
      if (!$menubarHdr.hasClass('ham')) {
        $menubar.hide();
        // 笆ｼ 繝上Φ繝舌�繧ｬ繝ｼ縺碁哩縺倥※縺�ｋ迥ｶ諷九↑繧峨せ繧ｯ繝ｭ繝ｼ繝ｫ遖∵ｭ｢繧りｧ｣髯､
        $('body').removeClass('noscroll'); // 笘�ｿｽ蜉�
      }
    }
  }, 200);

  //-------------------------------------------------
  // 蛻晄悄蛹�
  //-------------------------------------------------
  // 1) 繝峨Ο繝��繝繧ｦ繝ｳ蛻晄悄蛹� (#menubar)
  initDropdown($menubar, isTouchDevice);

  // 2) 繝上Φ繝舌�繧ｬ繝ｼ繝｡繝九Η繝ｼ蛻晄悄蛹� (#menubar_hdr + #menubar)
  initHamburger($menubarHdr, $menubar);

  // 3) 繝ｬ繧ｹ繝昴Φ繧ｷ繝冶｡ｨ遉ｺ縺ｮ蛻晄悄蜃ｦ逅� & 繝ｪ繧ｵ繧､繧ｺ繧､繝吶Φ繝�
  handleResize();
  $(window).on('resize', handleResize);

  //-------------------------------------------------
  // 繧｢繝ｳ繧ｫ繝ｼ繝ｪ繝ｳ繧ｯ(#)縺ｮ繧ｯ繝ｪ繝�け繧､繝吶Φ繝�
  //-------------------------------------------------
  $menubar.find('a[href^="#"]').on('click', function() {
    // 繝峨Ο繝��繝繧ｦ繝ｳ繝｡繝九Η繝ｼ縺ｮ隕ｪ(a.ddmenu)縺ｮ繝ｪ繝ｳ繧ｯ縺ｯ繝｡繝九Η繝ｼ繧帝哩縺倥↑縺�
    if ($(this).hasClass('ddmenu')) return;

    // 繧ｹ繝槭�陦ｨ遉ｺ��ワ繝ｳ繝舌�繧ｬ繝ｼ縺碁幕縺�※縺�ｋ迥ｶ諷九↑繧蛾哩縺倥ｋ
    if ($menubarHdr.is(':visible') && $menubarHdr.hasClass('ham')) {
      $menubarHdr.removeClass('ham');
      $menubar.hide();
      $menubar.find('.ddmenu_parent ul').hide();
      // 繝上Φ繝舌�繧ｬ繝ｼ縺碁哩縺倥◆縺ｮ縺ｧ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ遖∵ｭ｢繧定ｧ｣髯､
      $('body').removeClass('noscroll'); // 笘�ｿｽ蜉�
    }
  });

  //-------------------------------------------------
  // 縲敬eader nav縲阪↑縺ｩ蛻･繝｡繝九Η繝ｼ縺ｫ繝峨Ο繝��繝繧ｦ繝ｳ縺�縺鷹←逕ｨ縺励◆縺��ｴ蜷�
  //-------------------------------------------------
  // 萓具ｼ喇eader nav 縺ｸ繝峨Ο繝��繝繧ｦ繝ｳ縺�縺鷹←逕ｨ�医ワ繝ｳ繝舌�繧ｬ繝ｼ騾｣蜍輔↑縺暦ｼ�
  //initDropdown($('header nav'), isTouchDevice);
});


//===============================================================
// 繧ｹ繝�繝ｼ繧ｹ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ�遺ｻ繝舌�繧ｸ繝ｧ繝ｳ2024-1�俄ｻ騾壼ｸｸ繧ｿ繧､繝�
//===============================================================
$(function() {
    // 繝壹�繧ｸ荳企Κ縺ｸ謌ｻ繧九�繧ｿ繝ｳ縺ｮ繧ｻ繝ｬ繧ｯ繧ｿ繝ｼ
    var topButton = $('.pagetop');
    // 繝壹�繧ｸ繝医ャ繝励�繧ｿ繝ｳ陦ｨ遉ｺ逕ｨ縺ｮ繧ｯ繝ｩ繧ｹ蜷�
    var scrollShow = 'pagetop-show';

    // 繧ｹ繝�繝ｼ繧ｹ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ繧貞ｮ溯｡後☆繧矩未謨ｰ
    // target縺ｫ縺ｯ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ蜈医�隕∫ｴ�縺ｮ繧ｻ繝ｬ繧ｯ繧ｿ繝ｼ縺ｾ縺溘�'#'�医�繝ｼ繧ｸ繝医ャ繝暦ｼ峨ｒ謖�ｮ�
    function smoothScroll(target) {
        // 繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ蜈医�菴咲ｽｮ繧定ｨ育ｮ暦ｼ医�繝ｼ繧ｸ繝医ャ繝励�蝣ｴ蜷医�0縲√◎繧御ｻ･螟悶�隕∫ｴ�縺ｮ菴咲ｽｮ��
        var scrollTo = target === '#' ? 0 : $(target).offset().top;
        // 繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ縺ｧ繧ｹ繝�繝ｼ繧ｹ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ繧貞ｮ溯｡�
        $('html, body').animate({scrollTop: scrollTo}, 500);
    }

    // 繝壹�繧ｸ蜀�Μ繝ｳ繧ｯ縺ｨ繝壹�繧ｸ繝医ャ繝励∈謌ｻ繧九�繧ｿ繝ｳ縺ｫ繧ｯ繝ｪ繝�け繧､繝吶Φ繝医ｒ險ｭ螳�
    $('a[href^="#"], .pagetop').click(function(e) {
        e.preventDefault(); // 繝�ヵ繧ｩ繝ｫ繝医�繧｢繝ｳ繧ｫ繝ｼ蜍穂ｽ懊ｒ繧ｭ繝｣繝ｳ繧ｻ繝ｫ
        var id = $(this).attr('href') || '#'; // 繧ｯ繝ｪ繝�け縺輔ｌ縺溯ｦ∫ｴ�縺ｮhref螻樊ｧ繧貞叙蠕励√↑縺代ｌ縺ｰ'#'
        smoothScroll(id); // 繧ｹ繝�繝ｼ繧ｹ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ繧貞ｮ溯｡�
    });

    // 繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ縺ｫ蠢懊§縺ｦ繝壹�繧ｸ繝医ャ繝励�繧ｿ繝ｳ縺ｮ陦ｨ遉ｺ/髱櫁｡ｨ遉ｺ繧貞�繧頑崛縺�
    $(topButton).hide(); // 蛻晄悄迥ｶ諷九〒縺ｯ繝懊ち繝ｳ繧帝國縺�
    $(window).scroll(function() {
        if($(this).scrollTop() >= 300) { // 繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ菴咲ｽｮ縺�300px繧定ｶ�∴縺溘ｉ
            $(topButton).fadeIn().addClass(scrollShow); // 繝懊ち繝ｳ繧定｡ｨ遉ｺ
        } else {
            $(topButton).fadeOut().removeClass(scrollShow); // 縺昴ｌ莉･螟悶〒縺ｯ髱櫁｡ｨ遉ｺ
        }
    });

    // 繝壹�繧ｸ繝ｭ繝ｼ繝画凾縺ｫURL縺ｮ繝上ャ繧ｷ繝･縺悟ｭ伜惠縺吶ｋ蝣ｴ蜷医�蜃ｦ逅�
    if(window.location.hash) {
        // 1. 縺ｾ縺壹ヶ繝ｩ繧ｦ繧ｶ縺ｮ閾ｪ蜍輔ず繝｣繝ｳ繝励ｒ髦ｻ豁｢縺励※縲√ヨ繝��縺ｧ蠕�ｩ溘＆縺帙ｋ
        // �医％繧後ｒ蜈･繧後↑縺�→縲√ヶ繝ｩ繧ｦ繧ｶ縺ｫ繧医▲縺ｦ縺ｯ繧ｬ繧ｯ繝�→蜈医↓遘ｻ蜍輔＠縺ｦ縺励∪縺�◆繧�ｼ�
        $('html, body').scrollTop(0);
        
        // 2. 0.5遘貞ｾ�▲縺ｦ縺九ｉ縲∵隼繧√※繧ｹ繝�繝ｼ繧ｹ繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ螳溯｡�
        setTimeout(function() {
            smoothScroll(window.location.hash);
        }, 1000);
    }
});


//===============================================================
// 讓ｪ繧ｹ繝ｩ繧､繝峨う繝ｳ繧ｿ繧､繝励�繧ｹ繝ｩ繧､繝峨す繝ｧ繝ｼ
//===============================================================
$(function() {
    $('.slide').each(function() {
        var $this = $(this);
        var slides = $this.find('.slide');
        var slideCount = slides.length;
        var currentIndex = 0;
        var isAnimating = false;

        // 繧､繝ｳ繧ｸ繧ｱ繝ｼ繧ｿ繧定｡ｨ遉ｺ縺吶ｋ隕∫ｴ�繧貞叙蠕�
        var indicators = $this.find('.slide-indicators');

        // 繧ｹ繝ｩ繧､繝峨�謨ｰ縺ｫ蠢懊§縺溘う繝ｳ繧ｸ繧ｱ繝ｼ繧ｿ繧堤函謌�
        for (var i = 0; i < slideCount; i++) {
            indicators.append('<span class="indicator" data-index="' + i + '"></span>');
        }

        // 繧､繝ｳ繧ｸ繧ｱ繝ｼ繧ｿ縺ｮ蛻晄悄迥ｶ諷九ｒ險ｭ螳�
        var indicatorElements = indicators.find('.indicator');
        indicatorElements.eq(currentIndex).addClass('active');

        // 蛻晄悄迥ｶ諷九〒蜈ｨ縺ｦ縺ｮ繧ｹ繝ｩ繧､繝峨↓ .hidden 繧ｯ繝ｩ繧ｹ繧定ｿｽ蜉�
        slides.addClass('hidden');

        // 譛蛻昴�繧ｹ繝ｩ繧､繝峨↓ .active 縺ｨ .initial 繧ｯ繝ｩ繧ｹ繧定ｿｽ蜉�縺励�.hidden 繧ｯ繝ｩ繧ｹ繧貞炎髯､
        slides.eq(currentIndex).addClass('active initial').removeClass('hidden');

        // 驕�ｻｶ蠕後↓ .initial 繧ｯ繝ｩ繧ｹ繧貞炎髯､
        setTimeout(function() {
            slides.eq(currentIndex).removeClass('initial');
        }, 50);

        // 繧､繝ｳ繧ｸ繧ｱ繝ｼ繧ｿ繧偵け繝ｪ繝�け縺励◆縺ｨ縺阪�蜍穂ｽ懊ｒ險ｭ螳�
        indicatorElements.on('click', function() {
            var clickedIndex = $(this).data('index');

            // 繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ荳ｭ縺ｯ謫堺ｽ懊ｒ蜿励￠莉倥￠縺ｪ縺�
            if (isAnimating) return;

            // 迴ｾ蝨ｨ縺ｮ繧ｹ繝ｩ繧､繝峨→蜷後§蝣ｴ蜷医�菴輔ｂ縺励↑縺�
            if (clickedIndex === currentIndex) return;

            // 繧ｹ繝ｩ繧､繝峨�蛻�ｊ譖ｿ縺�
            changeSlide(clickedIndex);
        });

        // 閾ｪ蜍輔せ繝ｩ繧､繝峨�繧ｿ繧､繝槭�
        setInterval(function() {
            var nextIndex = (currentIndex + 1) % slideCount;
            changeSlide(nextIndex);
        }, 4000); // 4遘偵＃縺ｨ縺ｫ繧ｹ繝ｩ繧､繝峨ｒ蛻�ｊ譖ｿ縺医ｋ

        function changeSlide(nextIndex) {
            isAnimating = true;

            // 迴ｾ蝨ｨ縺ｮ繧ｹ繝ｩ繧､繝峨ｒ蟾ｦ縺ｫ遘ｻ蜍�
            slides.eq(currentIndex).removeClass('active').addClass('left');

            // 谺｡縺ｮ繧ｹ繝ｩ繧､繝峨ｒ陦ｨ遉ｺ
            slides.eq(nextIndex).addClass('active').removeClass('hidden');

            // 繧､繝ｳ繧ｸ繧ｱ繝ｼ繧ｿ縺ｮ譖ｴ譁ｰ
            indicatorElements.eq(currentIndex).removeClass('active');
            indicatorElements.eq(nextIndex).addClass('active');

            // 繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ邨ゆｺ�ｾ後�蜃ｦ逅�
            setTimeout(function() {
                // 蟾ｦ縺ｫ遘ｻ蜍輔＠縺溘せ繝ｩ繧､繝峨↓ .hidden 繧ｯ繝ｩ繧ｹ繧定ｿｽ蜉�
                slides.eq(currentIndex).removeClass('left').addClass('hidden');

                currentIndex = nextIndex;
                isAnimating = false;
            }, 700); // css縺ｮ縲�.slide .slide縲阪�陦後�譎る俣縺ｨ蜷医ｏ縺帙ｋ
        }
    });
});
