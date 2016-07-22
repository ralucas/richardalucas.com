$.backstretch('images/climbingrainier.png', {fade: 1000});

$(window).on("backstretch.after", function (e, instance, index) {
  $('.container').fadeIn('slow');
});
