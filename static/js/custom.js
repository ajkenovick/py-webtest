$(function () {


    /** Menu **/

    $('.navbar-nav>li>a').click(function () {
        $('.navbar-nav>li>a').removeClass("active");
        $(this).parent().addClass("active");
    });

  /*   $('.navbar-nav>li>a.active').removeClass("active");
    $('.navbar-nav>li#' + $('body').attr('id')).addClass("active"); */

    /** Mobile **/

    checkIfMobile();

    $(window).resize(function () {
        checkIfMobile();
    });

    function checkIfMobile() {
        if ($('.navbar-toggle').css('display') == 'block') {  //Si es móvil
            if ($('.slider-servicios').length) {
                /*$('.slider-servicios').removeClass('slider-servicios');*/
                $('ul').removeClass('bxslider');
            }
        }
    }

    /*if($('.slider-servicios').length) {
        $('.slider-servicios').removeClass('slider-servicios');
    }*/

    /** Scroll **/

    var headerMini = false;

    $(window).scroll(function () {

        /*console.log($(this).scrollTop());
        console.log($('.slider-servicios .bx-wrapper').outerHeight(true));*/

        if ($(this).scrollTop() > 50) {
            if (!headerMini) {
                /* Sticky header */
                $('.logo img').animate({ width: '60%' }, 300, function () {
                    //callback
                });
                $('.navbar-nav>li').animate({ marginTop: '0' }, 300, function () {
                    //callback
                });

                $('.navbar-default').css('box-shadow', '0px 2px 4px 0px rgba(50, 50, 50, 0.3)');

                headerMini = true;
            }
        }
        else {
            if (headerMini) {
                /* Sticky header */
                $('.logo img').animate({ width: '100%' }, 300, function () {
                    //callback
                });
                $('.navbar-nav>li').animate({ marginTop: '15px' }, 300, function () {
                    //callback
                });

                $('.navbar-default').css('box-shadow', 'none');

                headerMini = false;
            }
        }

        if ($(this).scrollTop() > 175 && $('.collapse').css('display') != 'none') {  //no usar si está en versión móvil

            $('.slider-servicios .bx-wrapper').addClass("fixed-slider-content");
            /*if($(this).scrollTop() > $('.slider-servicios .bx-wrapper').outerHeight(true)) {
                console.log('entro');
                $('.slider-servicios .bx-wrapper').css('top', ($('.slider-servicios .bx-wrapper').css('top') + 175) + 'px');
            }*/
        }
        else {
            $('.slider-servicios .bx-wrapper').removeClass("fixed-slider-content");
        }

        /*wrap.addClass("fix-search");
        } else {
        wrap.removeClass("fix-search");
        }*/

    });

    /** Slider servicios **/

    $(window).load(function () {

        if ($('.navbar-toggle').css('display') == 'none') {
            $('.slider-servicios .bxslider li').css('display', 'table');

            $('.bxslider').bxSlider({
                pagerCustom: '#bx-pager',
                mode: 'vertical',
                controls: false
            });

            var activeTop = 0;
            var clicked;

            $('.slider-servicios #bx-pager a').click(function () {
                clicked = $(this);
                setTimeout(function () {
                    activeTop = clicked.position().top + (clicked.outerHeight(true) / 4);
                    $('#pointer').animate({ top: activeTop }, 300, function () {
                        //callback
                    });
                }, 200);
            });
        }
    });

    /** Metodologia **/

    $('[data-toggle="tooltip"]').tooltip();


    /**  Galería **/


    $('.bxslider-galeria').bxSlider({
        pagerCustom: '#bx-pager',
        mode: 'vertical',
        controls: false,
        onSliderLoad: function () {

        }
    });

    $('.bxslider-fotos').bxSlider({
        /*mode: 'vertical',
        controls: false*/
        /*slideWidth: 500*/
        /*minSlides: 3,
        maxSlides: 3,*/
        preloadImages: 'visible',
        slideWidth: 640,
        /*slideMargin: 20,*/
        pager: false,
        auto: true,
        autoStart: true
    });


    $(document).delegate('*[data-toggle="lightbox"]', 'click', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });

    /**  Google Maps **/

    function initialize() {
        var myLatlng = new google.maps.LatLng(4.698641, -74.030561);

        var mapOptions = {
            zoom: 16,
            center: myLatlng
        }
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Beable'
        });
    }

    if ($('#contactenos').length) {
        google.maps.event.addDomListener(window, 'load', initialize);

        /** Send Contact **/

        // Get the form.
        var form = $('#mycontactform');

        // Get the messages div.
        var formMessages = $('#form-messages');

        // Set up an event listener for the contact form.
        $(form).submit(function (event) {
            // Stop the browser from submitting the form.
            event.preventDefault();

            // Serialize the form data.
            var formData = $(form).serialize();

            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            }).done(function (response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');

                // Set the message text.
                $(formMessages).text(response);

                // Clear the form.
                $('#nombre').val('');
                $('#email').val('');
                $('#telefono').val('');
                $('#mensaje').val('');
            }).fail(function (data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });
        });
    }



});