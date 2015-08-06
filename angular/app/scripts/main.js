(function ($) {
  // Use strict mode to avoid errors:
  // https://developer.mozilla.org/en/JavaScript/Strict_mode
  "use strict";

  $(document).ready(function () {
    var siteWrapper = $('html');

    siteWrapper.addClass('dark');

    $('.theme-switcher').click(function(){
      if(siteWrapper.hasClass('dark')){
        siteWrapper.removeClass('dark').addClass('light');
      }
      else {
        siteWrapper.removeClass('light').addClass('dark');
      }

    });

    var sideBar = $('.sidebar'),
        rollIcon = $('.roll-icon'),
        pageContent = $('.main-content');

    rollIcon.on('click', function(){
      pageContent.toggleClass('roll-bar');
    })

  });
})(jQuery);