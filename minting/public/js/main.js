$(document).ready(function () {

  $('.burger').click(function () {
    $(this).children().toggleClass('active');
    $('.header__menu').toggleClass('active');
    return false;
  });

  $('.arts__items').slick({
    slidesToShow: 3,
    dots: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
    ],
  });

  $('.news__items').slick({
    slidesToShow: 3,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1011,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint : 767,
        settings: {
          slidesToShow:1,
          arrows: false,
        },
      },
    ],
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 800) {
      $(".top_button").fadeIn(0);
    } else {
      $(".top_button").fadeOut(0);
    }
  });

  $(".top_button").click(function (event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });

  function responsiev_slider(selector, size) {
    if($(window).width() < size) {
      if(!$(selector).hasClass('slick-slider')) {
        $('.features__items').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        })
      }
    } else {
      if($(selector).hasClass('slick-slider')) {
        $(selector).slick('destroy');
      }
    }
  }

  responsiev_slider('.features__items', 600);
  responsiev_slider('.features__items', 600);

  $(window).resize(function() {
    responsiev_slider('.features__items', 600);
    responsiev_slider('.features__items', 600);
  });

  $(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
      $(".header__menu.active").addClass("fixed");
    } else {
      $(".header").removeClass("fixed");
    }
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".burger a, .header__menu").length) {
      $(".burger a").removeClass("active");
      $(".header__menu").removeClass("active");
    }
    e.stopPropagation();
  });

  $(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
      $(".header").addClass("fixed");
    } else {
      $(".header").removeClass("fixed");
    }
  });
});





