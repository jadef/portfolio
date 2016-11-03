var $ = $.noConflict();

$(document).ready(function () {


  // ------- Smooth Anchor Scrolling
  $(function () {
    $('a[href*=#]:not([href=#])').click(function () {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').stop(false, false).animate({
            scrollTop: (target.offset().top - 50)
          }, 1000);
          return false;
        }
      }
    });
  });


  // ------- Scroller function
  var fulltitle, subtitle, description, footnote, slides, title, launch, source, h, current, thumb;
  slides = new Array();

  function grab_slide(current) {
    $('#scroller #slide img').fadeOut('500');
    $('#modal-description').empty().html(slides[current][2]);
    $('#modal-footnote').empty().html(slides[current][3]);

    $('#scroller #slide').addClass('loading').attr('title', slides[current][0]).html('<img src="' + slides[current][1] + '" alt="' + slides[current][0] + '" />');
    $('#navigation .current').removeClass('current');
    $('#navigation .thumbnail.' + current).addClass('current');
    $('#scroller #slide img').load(function () {
      if ($(window).width() < 1056) {
        h = $('#modal-title').outerHeight() + $('#launch').outerHeight() + $('#navigation').outerHeight() + $('#modal-description').outerHeight() + $('#modal-footnote').outerHeight() + $('#scroller #slide img').outerHeight() + 8; // 8 is borders
      } else {
        var largerh = Math.max($('#modal-description').outerHeight(), $('#navigation').outerHeight());
        h = $('#modal-title').outerHeight() + largerh + $('#modal-footnote').outerHeight() + $('#scroller #slide img').outerHeight() + 8; // 8 is borders
      }
      $('#scroller #slide').removeClass('loading');
      $('#modal-content').animate({ height: h },  600, function () {
        $('#scroller #slide img').fadeIn('500');
      });
    });
  }


  /// ------- Modal Window
  $('#what .thumb').click(function (e) {
    e.preventDefault();
    var worknode = $(this).attr('rel');
    if ($('#overlay').is(':empty')) {
      $('#overlay').append('<div id="modal-content"><div id="modal-title"></div><div id="launch"></div><a href="#" class="close"><span>&#xf00d;</span> Close</a><div id="modal-data"><div id="scroller"><div id="navigation"></div><div id="modal-description"></div><div id="modal-footnote"></div><div id="slide"></div></div></div></div>');
    }
    // -- Load it up
    $.ajax({
      type: 'GET',
      url: '/portfolio/' + worknode + '/control.xml',
      dataType: 'xml',
      success: function (xml) {
        slides.length = 0;
        $(xml).find('fulltitle').each(function () {
          fulltitle = $(this).text();
          $('#modal-title').empty().html(fulltitle);
        });
        $(xml).find('subtitle').each(function () {
          subtitle = $(this).text();
          if (subtitle !== '') {
            $('#modal-title').append('<span>' + subtitle + '</span>');
          }
        });
        $(xml).find('link').each(function () {
          launch = $(this).text();
          if (launch !== '') {
            $('#launch').html('<a href="' + launch + '" id="site-launch" target="_blank">Launch Site</a>');
          }
        });
        $(xml).find('slide').each(function () {
          current = $(this).attr('id');
          title = $(this).find('title').text();
          source = '/portfolio/' + worknode + '/images/' + $(this).find('image').text();
          thumb = '/portfolio/' + worknode + '/thumbs/' + $(this).find('image').text();
          description = $(this).find('description').text();
          footnote = $(this).find('footnote').text();
          slides[current] = new Array(title, source, description, footnote);

          $('#navigation').append('<a href="' + current + '" class="' + current + ' thumbnail"><img src="' + thumb + '" /></a>');
        });
        current = 1;
        $('#navigation').prepend('<a href="#" class="nav-lft">&#xf104;</a>');
        $('#navigation').append('<a href="#" class="nav-rt">&#xf105;</a>');

        $('#navigation .thumbnail').click(function (event) {
          event.preventDefault();
          current = $(this).attr('href');
          grab_slide(current);
        });

        $('#navigation .nav-lft').click(function (event) {
          event.preventDefault();
          current--;
          if (current < 1) {
            current = slides.length - 1;
          }
          grab_slide(current);
        });
        $('#navigation .nav-rt').click(function (event) {
          event.preventDefault();
          current++;
          if (current > slides.length - 1) {
            current = 1;
          }
          grab_slide(current);
        });
      }
    });

    // --- Show it
    $('#overlay').fadeIn(500, function () {
      $('#modal-content').css('top', $(window).scrollTop() + 'px').slideDown(500, function () {
        $('#modal-data').slideDown(500, function () {
          grab_slide(current);
        });
      });
    });
  });

  // --- Close it
  $(document.body).on('click', '#overlay, #overlay .close', function (event) {
    event.preventDefault();
    $('#modal-content').slideUp(500, function () {
      $('#overlay').fadeOut('500').empty();
    });
  });
  $(document.body).on('click', '#overlay > *', function (event) {
    event.stopPropagation();
  });

  // ------- Vertical Scrolling
  if ($('header nav').length) { // if there's navigation
    if ($(window).scrollTop() === 0) { // Top of page load
      $('nav').css('top', '0');
    }
    $('nav').css('background-image', 'url("images/pointer.png")');
    var
      // who = $('#who').offset().top,
      what = $('#what').offset().top,
      where = $('#where').offset().top,
      how = $('#how').offset().top,
      lastScrollTop = 0;
    $(window).scroll(function () { // Scolling
      var st = $(this).scrollTop();
      if (st < lastScrollTop) {
        $('nav').css('top', '0');
      } else {
        $('nav').css('top', '');
      }
      lastScrollTop = st;

      if ($(window).scrollTop() < what - 51) { // Who
        $('nav').css('background-position', '12.5% bottom');
      } else if ($(window).scrollTop() < where - 51) { // What
        $('nav').css('background-position', '37.5% bottom');
      } else if ($(window).scrollTop() < how - 51) { // Where
        $('nav').css('background-position', '62.5% bottom');
      } else if ($(window).scrollTop() >= how - 51) { // How
        $('nav').css('background-position', '87.5% bottom');
      }
    });
  }

  // ------- Email
  var mailto, domain, mailname;
  mailto = 'mailto:';
  domain = 'jfaist.com';
  mailname = 'jade@';
  $('.email').attr('href', mailto + mailname + domain).attr('title', 'Email Me').html('<span>&#xf0e0;</span> email me');

});
