$(document).ready(function () {
  //Navigation menu scrollTo
  $('a[href*="#"]:not([href="#"])').click(function (event) {
    // event.preventDefault();
    if (
      location.pathname.replace(/^\//, '') ==
        this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash)
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
      console.log('target', target)
      console.log('target.length', target.length)
      if (target.length) {
        $('html, body').animate(
          {
            scrollTop: target.offset().top,
          },
          1000
        )
        return false
      }
    }
  })

  //Show & Hide menu on mobile
  $('.burger_icon').click(function () {
    $('header nav').toggleClass('show')
    $('header .burger_icon').toggleClass('active')
  })

  //wow.js on scroll animations initialization
  wow = new WOW({
    animateClass: 'animated',
    mobile: false,
    offset: 50,
  })
  wow.init()

  //parallax effect initialization
  $('.hero').parallax('50%', 0.3)

  //Testimonials slider initialization
  $('#tslider').owlCarousel({
    items: 1,
    navigation: true,
    pagination: false,
    slideSpeed: 300,
    paginationSpeed: 400,
    singleItem: true,
    responsive: true,
    autoPlay: true,
    transitionStyle: 'fade',
  })

  //Mailchimp subscription form initialization
  $('#submit_form').submit(function () {
    $('#mc_submit').attr('disabled', 'disabled')
    processing('icon', 'loading')
  })

  if ($('#submit_form').length) {
    //Mailchim Subscription form
    $('#submit_form').ajaxChimp({
      callback: chimpResponce,
    })
  }

  //Mail chimp callback function
  function chimpResponce(resp) {
    if (resp.result === 'success') {
      processing('loading', 'icon')
      $('#mc_submit').removeAttr('disabled', 'disabled')
      $('#submit_form #mc-email').val('')
      $('#error_msg').hide()
      $('#success_msg').show()
    } else {
      processing('loading', 'icon')
      $('#success_msg').hide()
      $('#error_msg').show()
      $('#mc_submit').removeAttr('disabled', 'disabled')
    }
  }

  function processing(hide, show) {
    $('#mc_submit i').removeClass(hide).addClass(show)
  }

  //Popup video
  $('#play_video').click(function (e) {
    e.preventDefault()

    var video_link = $(this).data('video')
    video_link =
      '<iframe src="' +
      video_link +
      '" width="500" height="208" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'

    $('.about_video').append(video_link).fadeIn(200)
  })

  $('.close_video').click(function (e) {
    e.preventDefault()

    $('.about_video').fadeOut(200, function () {
      $('iframe', this).remove()
    })
  })
})
