import '../styles/main.scss';


$(document).ready(function() {
  // $.getScript("//platform.twitter.com/widgets.js");
  var slider = $('.hero-slider');

  slider.slick({
    dots: true,
    infinite: false,
    autoplay: false,
    speed: 800,
    autoplaySpeed: 5000,
    arrows: false,
    fade: false,
    cssEase: 'linear',
    pauseOnHover: false
  });
});
