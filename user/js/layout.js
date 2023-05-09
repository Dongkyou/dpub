$(document).ready(function(){

    /*mobile menu*/
    $('.mobile-btn').on('click',function(){
        $(this).toggleClass('open');
        $('.mobile-menu').toggleClass('open');
        $('body').toggleClass('mobile-menu-open')
    })

    /* 문의하기 탭메뉴*/
    $('ul.tab-unit03 li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tab-unit03 li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    });

    /* 메인 슬라이드 */
    var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

    /*메인 문의하기 탭메뉴*/
    $('ul.tab-unit02 li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tab-unit02 li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    });





});
