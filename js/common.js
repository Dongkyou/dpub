/* browser */
; (function ($) { $.browserTest = function (a, z) { var u = 'unknown', x = 'X', m = function (r, h) { for (var i = 0; i < h.length; i = i + 1) { r = r.replace(h[i][0], h[i][1]); } return r; }, c = function (i, a, b, c) { var r = { name: m((a.exec(i) || [u, u])[1], b) }; r[r.name] = true; r.version = (c.exec(i) || [x, x, x, x])[3]; if (r.name.match(/safari/) && r.version > 400) { r.version = '2.0'; } if (r.name === 'presto') { r.version = ($.browser.version > 9.27) ? 'futhark' : 'linear_b'; } r.versionNumber = parseFloat(r.version, 10) || 0; r.versionX = (r.version !== x) ? (r.version + '').substr(0, 1) : x; r.className = r.name + r.versionX; return r; }; a = (a.match(/Opera|Navigator|Minefield|KHTML|Chrome/) ? m(a, [[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/, ''], ['Chrome Safari', 'Chrome'], ['KHTML', 'Konqueror'], ['Minefield', 'Firefox'], ['Navigator', 'Netscape']]) : a).toLowerCase(); $.browser = $.extend((!z) ? $.browser : {}, c(a, /(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/, [], /(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/)); $.layout = c(a, /(gecko|konqueror|msie|opera|webkit)/, [['konqueror', 'khtml'], ['msie', 'trident'], ['opera', 'presto']], /(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/); $.os = { name: (/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase()) || [u])[0].replace('sunos', 'solaris') }; if (!z) { $('html').addClass([$.os.name, $.browser.name, $.browser.className, $.layout.name, $.layout.className].join(' ')); } }; $.browserTest(navigator.userAgent); })(jQuery);//http://jquery.thewikies.com/browser/
; (function ($) { $.fn.bgIframe = $.fn.bgiframe = function (s) { if ($.browser.msie && /6.0/.test(navigator.userAgent)) { s = $.extend({ top: 'auto', left: 'auto', width: 'auto', height: 'auto', opacity: true, src: 'javascript:false;' }, s || {}); var prop = function (n) { return n && n.constructor == Number ? n + 'px' : n; }, html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + s.src + '"' + 'style="display:block;position:absolute;z-index:-1;' + (s.opacity !== false ? 'filter:Alpha(Opacity=\'0\');' : '') + 'top:' + (s.top == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')' : prop(s.top)) + ';' + 'left:' + (s.left == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')' : prop(s.left)) + ';' + 'width:' + (s.width == 'auto' ? 'expression(this.parentNode.offsetWidth+\'px\')' : prop(s.width)) + ';' + 'height:' + (s.height == 'auto' ? 'expression(this.parentNode.offsetHeight+\'px\')' : prop(s.height)) + ';' + '"/>'; return this.each(function () { if ($('> iframe.bgiframe', this).length == 0) this.insertBefore(document.createElement(html), this.firstChild); }); } return this; }; })(jQuery);
; (function ($) {
	/***********************************************
	* 변수설정
	- user agent / device / platform
	***********************************************/
	var pf = navigator.platfrm;
	var ua = navigator.userAgent;
	var osFilter = "win16|win32|win64|mac";
	var $html = $('html');

	var isM = (/lgtelecom|Android|blackberry|iPhone|samsung|symbian|sony|SCH-|SPH-|nokia|bada|semc|IEMobile|Mobile|PPC|Windows CE|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|SonyEricsson|symbos/i).test(ua);
	var isIos = (/(ipod|iphone|ipad)/i).test(ua);  //ios
	var isIphone = (/(iphone)/i).test(ua);  //iphone
	var isIpad = (/(ipad)/i).test(ua);  //ipad

	var isAndroid = (/android/i).test(ua);  //android
	var isSamsung = (/samsung/i).test(ua);  //samsung
	var isGalTab = (/(android|SHW-M)/i).test(ua);  //galaxy tab
	var device;

	if (isM) $html.addClass('mobile-web');
	else $html.addClass('pc-web');


	function anchorPoint(el) {
		return $($(el).attr('href'));
	}

	$(window).scroll(function () {
		if ($(window).scrollTop() > 100) {
			$('.wrap-header').addClass('fixed');
		} else {
			$('.wrap-header').removeClass('fixed');
		}
	});

	$('#nav li a').on('click', function (e) {
		e.preventDefault();
		$('html,body').animate({ scrollTop: anchorPoint(this).offset().top - 56 }); //픽스드 메뉴 높이
	});

	/* WAYPOINT를 두번 선언한 이유
	* offset 옵션값이 스크롤 업/다운 일때 다르게 적용되어야 하기 때문 */
	$('.scroll-zone').waypoint(function (direction) {
		//console.log('WAYPOINT DOWN', direction,this.element.id, this.triggerPoint);
		if (direction == 'down') {
			//console.log('scroll down during');
			$('#nav li[class="' + this.element.id + '"]').addClass('active').siblings().removeClass('active');
		}
	}, {
		//offset: 'bottom-in-view'
		offset: '50%'
	});

	$('.scroll-zone').waypoint(function (direction) {
		//console.log('WAYPOINT UP', direction,this.element.id, this.triggerPoint);
		if (direction == 'up') {
			//console.log('scroll up during');
			$('#nav li[class="' + this.element.id + '"]').addClass('active').siblings().removeClass('active');
		}
	}, {
		offset: '0'
	});

	/***********************************************
	* 온로드 실행 함수
	************************************************/
	$(function () {
		$body = $('body');
		$winW = $(window).width();
		if ($.browser.name == 'msie') $body.addClass($.browser.className);
		else $body.addClass($.browser.name);

		setTimeout(function () {
			$('.section-visual').addClass('show')
		}, 100)

		scrollShow.init('.scroll-zone', 10);
		$(window).on('scroll resize', function () {
			scrollShow.init('.scroll-zone', 200);
		});

		setTimeout(function () {
			$('.section-visual').addClass('show01');
		}, 600);
		setTimeout(function () {
			$('.section-visual').addClass('show02');
		}, 1100);
		// setTimeout(function(){
		// 	$('.section-visual').addClass('show04');
		// } , 1400);
		// setTimeout(function(){
		// 	$('.section-visual').addClass('show02');
		// } , 1900);
	});

})(jQuery);

//스크롤이벤트 리스트 (순차적으로 보이는 효과)
var scrollShow = {
	init: function ($obj, $move) {
		$($obj).each(function () {
			var $winW = $(window).width();
			var $this = $(this);
			var $pos = $this.offset().top;
			var $scroll = $(window).scrollTop() + $(window).height();
			if ($scroll > $pos) {
				$this.addClass('active');
			} else {
				$this.removeClass('active');
			}
		});
	},
	reset: function () {
		scrollShow.init();
	}
}

//스크롤 탑 버튼 구현
$(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 530) {
			$('.foot-box01').addClass('active');
		} else {
			$('.foot-box01').removeClass('active').animate();
		}
	});
});

//(M)전체메뉴 작동
$(function wholeMenu() {

	$(".btn-unit-wholemenu").click(function () {
		$('body').toggleClass('left-menu-active')
		$('.mask-layer').toggleClass('active')
		$('.wrap-left-menu').toggleClass('active')
		$(this).toggleClass('active')
		//$(".mask-layer").fadeIn();

		if ($('.btn-unit-wholemenu').hasClass('acive')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}

	});
});

//서비스신청 레이어팝업
$(function () {
	var LayerPopup = $('#popupForm');
	var LayerWrap = $('.layer-unit01');

	$("#openPop").click(function () {
		$('body').addClass('open-layer')
		$(LayerPopup).show();
		//$(".mask-layer").fadeIn();
	});

	$("#close_button").click(function () {
		$('body').removeClass('open-layer')
		$(LayerPopup).fadeOut();
		$(LayerPopup).removeClass('active');
	});

	// 외부영역 클릭 시 팝업 닫기
	$(LayerPopup).click(function (e) {
		$('body').removeClass('open-layer');
		if (!$(LayerWrap).has(e.target).length) $(LayerPopup).fadeOut();
	});

});