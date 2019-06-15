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

/* Test de verificador */



/*     function checkForm(form)
  {
    
    if(!form.terms.checked) {
      alert("Please indicate that you accept the Terms and Conditions");
      form.terms.focus();
      return false;
    }
    return true;
  } */

   function checkForm(form)
  {
   /*  if(form.username.value == "") {
      alert("Error: Username cannot be blank!");
      form.username.focus();
      return false;
    }
    re = /^\w+$/;
    if(!re.test(form.username.value)) {
      alert("Error: Username must contain only letters, numbers and underscores!");
      form.username.focus();
      return false;
    } */
    if(form.pwd1.value != "" && form.pwd1.value == form.pwd2.value) {
      if(!checkPassword(form.pwd1.value)) {
        alert("The password you have entered is not valid!");
        form.pwd1.focus();
        return false;
      }
    } else {
      alert("Error: Please check that you've entered and confirmed your password!");
      form.pwd1.focus();
      return false;
    }
    return true;
  }


/* var password = document.getElementById("pwd")
  , confirm_password = document.getElementById("pwd2");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
 */



//-------------------------------

function docsChange(selectObj) {
   var selectIndex=selectObj.selectedIndex;
   var selectValue=selectObj.options[selectIndex].text;
   var output=document.getElementById("surname");
   //alert(output.innerText);
   

   if(selectValue=="NIT"){
       output.disabled = true;
       output.value = '';
       output.required = false;
   }else{
       output.disabled = false;
       output.value = '';
       output.required = true;
   }

   //output.innerHTML=selectValue;
 }

 //----------------------------------------

 function locChange(selectObj) {
    var selectIndex=selectObj.selectedIndex;
    var selectValue=selectObj.options[selectIndex].text;
    var output=document.getElementById("colmun");
    var local=document.getElementById("boglocation");
    
    if(selectValue=="Bogota, D.C."){
        // output.prop('disabled', true);
        output.disabled = true;
        local.disabled = false;
       
    }else{
        output.disabled = false;
        local.disabled = true;
  
    }
 
    //output.innerHTML=selectValue;
  }

 //-----------------------------------------
 // toggle password visibility
 $(".reveal").on('click',function() {
    var $pwd = $(".pwd");
    if ($pwd.attr('type') === 'password') {
        $pwd.attr('type', 'text');
    } else {
        $pwd.attr('type', 'password');
    }
});
 
//--------------------------------------------
var check = function() {
    if (document.getElementById('pwd1').value ==
      document.getElementById('pwd2').value) {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'Coinciden';
    } else {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'No coinciden';
    }
  }


/*function getCity(val) {
	$.ajax({
	type: "POST",
	url: "{{ url_for('_update_dropdown') }}",
	data:'state_id='+val,
	success: function(data){
		$("#city-list").html(data);
	}
	});
}*/

