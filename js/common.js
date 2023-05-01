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
	var $winW = $(window).width();
	var $winH = $(window).height();
	$charset = $('#charset').attr('content');
	$htmlLang = $html.attr('lang');
	$header = $('#header');
	$wide = null;

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

	/* 함수실행 */
	Page.init();


});

})(jQuery);

/***********************************************
* 실행 함수
************************************************/
Page = {
	/* ##페이지 Page.init */
	init: function () {
		$('.shareDataBox').remove();
		$('.yna-fx-loader').remove();

		Page.com();
		var $winW = $(window).width();
		if ($winW >= 769) {
			//console.log('769 이상 - 웹');
			$('[class*="ad-mob"]').remove();
			$('.wrap~[class*="aside-sticky"]').remove();
			$('[class*="module-mob"]').remove();
			Page.startW();
			Page.comW();
		} else {
			//console.log('769 이하 - 모바일');
			$('[class*="ad-web"]').remove();
			$('.container [class*="aside-sticky"]').remove();
			$('[class*="module-web"]').remove();
			Page.startM();
			Page.comM();
		}
	},

	/* ##공통 Page.com */
	com: function () {
		/*Page.main();
		Page.news();
		Page.photo();
		Page.graphic();
		Page.video();*/

	},
	/* ##데스크톱 공통 Page.comW */
	comW: function () {
		//MPW.checkRightAd();
	},

	/* ##모바일 전체(공통) Page.comM */
	comM: function () {

		//Master.wholeMenu();

		if ($('#subMenu01').length > 0) {
			Master.carouselTab01('#subMenu01');
		}
	},

	/* ##데스크톱 스타트 Page.startW */
	startW: function () {
		/*Page.viewW();
		Page.newsW();
		Page.photoW();
		Page.videoW();*/
	},

	/* ##모바일 스타트 Page.startM */
	startM: function () {
		/*Page.mainM();
		Page.viewM();
		Page.newsM();
		Page.photoM();
		Page.graphicM();
		Page.videoM();*/
	},

	/* ##메인(PC) Page.mainW */
	mainW: function () {
		if ($main) {
			console.log('Page.mainW');

		}
	},

	/* ##메인(M) Page.mainM */
	mainM: function () {
		if ($main) {
			console.log('Page.mainM');
			//CP Dynamic
			if ($('[data-type="auto"]').length) {
				var cp = function () {
					setTimeout(function () {
						MMW.slideFree01('#carouselStar01');
						MMW.slideFree01('#carouselSport01');
						MMW.slideFree01('#carouselVideo01');
					}, 300);
				};
				addCallback(cp);
			} else {
				MMW.slideFree01('#carouselStar01');
				MMW.slideFree01('#carouselSport01');
				MMW.slideFree01('#carouselVideo01');
			}

		}
	},

}

/***********************************************
* 마스터 호출 함수 (이벤트 함수)
************************************************/
//##마스터 Master
Master = {
	/* Master.randomClass01
	 * (공통) 랜덤클래스 배열
	 * Master.randomClass01('.visual-type05', 'object', 3)
	 - object 클래스 뒤에 랜덤으로 숫자를 붙인다. */
	randomClass01: function (conName, className, maxNum) {
		var num = Math.floor(Math.random() * maxNum);
		num = num + 1;
		num = (num < 10) ? '0' + num : '' + num;
		className = className + num;
		$(conName).addClass(className);
	},

	/* Master.imgCrop01 */
	imgCrop01: function (conName, findImg) {
		$(conName).find(findImg).each(function () {
			var imgW = $(this).width();
			var imgH = $(this).height();
			//console.log(imgW, imgH);

			if (imgW < imgH) $(this).parents('.img-con').addClass('rowH');

			$(conName + ' .img-con').imagesLoaded(function () {
				$(conName + ' .img-con').addClass('show');
			});
		});
	},

	/* Master.imgCrop02
	 * 포토/그래픽 가로세로 확인 */
	imgCrop02: function (conName, findImg, addName) {
		$(conName).find(findImg).each(function () {
			var imgW = $(this).width();
			var imgH = $(this).height();
			//console.log(imgW, imgH);
			if (imgW < imgH) {
				//세로
				$(addName).addClass('vertical');
				$(this).parents('.img-con').addClass('rowH');
			} else {
				//가로
				$(addName).addClass('horizontal');
				$(this).parents('.img-con').addClass('colW');
			}
			setTimeout(function () {
				$(conName + ' .img-con').imagesLoaded(function () {
					$(conName + ' .img-con').addClass('show');
				});
			}, 500);
		});
	},

	/* Master.imgCrop03
	 * limitW, limitH : 섬네일 크기
	 * 가로세로 확인 후 가로 일 때 img 태그를 이동시켜 가운데 정렬 */
	imgCrop03: function (conName, findImg, limitW, limitH) {
		$(conName).find(findImg).each(function (i) {
			//imgW, imgH : 최초 섬네일영역에 맞는 크기값
			//flexW, flexH : imgW, imgH의 크기 판단 후 변경 된 이미지 값
			var imgW = $(this).width(),
				imgH = $(this).height(),
				flexW = 0, flexH = 0, moveL;

			if (imgW < imgH) {
				//세로
				$(this).parents('.img-con').addClass('rowH');
			} else {
				//가로
				if (limitH <= imgH) {
					//썸네일 영역보다 이미지 높이가 클 경우 - 가운데 정렬
					$(this).parents('.img-con').addClass('colW01');
				} else {
					//썸네일 영역보다 이미지 높이가 작을 경우 - 높이 기준 늘림
					$(this).parents('.img-con').addClass('colW02');
				}
				//클래스 추가 후 변경 된 이미지 넓이 값으로 가운데 정렬
				flexW = $(this).outerWidth();
				moveL = -(flexW - limitW) / 2;
				$(this).css('margin-left', Math.round(moveL) + 'px');
			}

			$(conName + ' .img-con').imagesLoaded(function () {
				$(conName + ' .img-con').addClass('show');
			});

		});
	},

	/* Master.carouselNav01
	 * 슬라이드 - 내비게이션 GNB */
	carouselNav01: function (conName) {
		var activeNum = $(conName + ' li.active').index();
		var start = (activeNum >= 0) ? activeNum : 0;
		//console.log('carouselNav01', activeNum, start);

		var carouselNav01 = new Swiper(conName, {
			slidesPerView: 'auto', watchSlidesVisibility: true,
			spaceBetween: 0,
			initialSlide: start,
			preventLinksPropagation: true,
			preventClicks: false,
			slidesOffsetAfter: 10,
		});
		carouselNav01.slideTo(start, 300, false);
	},

	/* Master.carouselPaging01
	 * 슬라이드 - 페이징  */
	carouselPaging01: function (conName) {
		var itemLen = $(conName + ' .num').length;
		if (itemLen > 5) {
			var activeNum = $(conName + ' strong').index();
			var start = (activeNum >= 0) ? activeNum : 0;
			console.log('carouselPaging01', activeNum, start, itemLen);

			var carouselPaging01 = new Swiper(conName, {
				slidesPerView: 'auto', watchSlidesVisibility: true,
				spaceBetween: 0,
				initialSlide: start,
				preventLinksPropagation: true,
				preventClicks: false,
				slidesOffsetAfter: 10,
			});
			carouselPaging01.slideTo(start, 300, false);
		}
		$(conName).addClass('show');
	},

	/* Master.carouselTab01
	 * 슬라이드 - 내비게이션 GNB */
	carouselTab01: function (conName) {
		var activeNum = $(conName + ' li.active').index();
		var start = (activeNum >= 0) ? activeNum : 0;
		//console.log('carouselTab01', activeNum, start);

		var carouselTab01 = new Swiper(conName, {
			slidesPerView: 'auto', watchSlidesVisibility: true,
			spaceBetween: 0,
			initialSlide: start,
			preventLinksPropagation: true,
			preventClicks: false,
			slidesOffsetAfter: 10,
		});
		carouselTab01.slideTo(start, 300, false);
	},

	/* Master.printDay01
	 * (공통) D-day 디데이 계산
	 * conName : 선택자 / dday : 이벤트 날짜 (mm/dd/yyyy) */
	printDay01: function (conName, startDay) {
		var now = new Date();
		var then = new Date(startDay);
		var gap = now.getTime() - then.getTime();
		var dday = Math.floor(gap / (1000 * 60 * 60 * 24));
		var print = Math.abs(dday);
		//console.log(now, dday, print);

		var $dday = $(conName);
		var $ddayCount = $dday.find('.num');
		var result = String(print); //문자로 형변환

		if (dday < 0) {
			//시작 전
			$dday.addClass("day-before");
			$dday.append(result);
		} else {
			//시작 후
			$dday.addClass("day-ing");
		}
	},

	/* 함수생성 Master.functionName */
	//functionName : function() {},

} /*마스터 호출 함수 end*/


var scrollSave = {
	stop: function () {
		$('.wrap-container').css(
			{ 'top': -$(window).scrollTop() }
		);
	},
	go: function () {
		var scrollPosition = Math.abs($('.wrap-container').css('top').split('px')[0]);
		console.log(scrollPosition);
		$('.wrap-container').removeAttr('style');
		$(window).scrollTop(scrollPosition);
	}
};

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
		//$(this).toggleClass('active')
		//$(".mask-layer").fadeIn();

		if($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
		}

	});
});

//레이어팝업
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