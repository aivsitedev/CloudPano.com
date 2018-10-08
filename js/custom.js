/* Theme Name: Darya - App Landing page
   Author: Bighero
   Version : 1.0
*/



jQuery(document).ready(function($) {

    "use strict";

    // Preloader      
    $(window).load(function() {
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });
    });

    //  Magnific Popup
    $('.popup-video').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    // Animated typing text

    $(".animated-text").typed({
        strings: ["the modern web", "realtors", "entreperneurs", "luxury apartments"],
        typeSpeed: 50,
        loop: true,
    });

    // Sticky Navigation
    $("#sticky-nav").sticky({ topSpacing: 0 });

    // Smooth scroll 
    var $root = $('html, body');
    $('a').on('click', function() {
        $root.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1200, 'easeInOutCubic');
        return false;
    });


    // SCREENSHOTS SLIDER

    $("#screenshots .slider").owlCarousel({
        navigation: true,
        pagination: false,
        autoPlay: 5000, //Set AutoPlay to 3 seconds 
        items: 3,
        loop: true,
    });

    // TESTIMONIALS SLIDER

    $("#testimonials .slider").owlCarousel({
        navigation: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });

    // CLIENTS SLIDER

    $("#clients .slider").owlCarousel({
        navigation: false,
        pagination: false,
        autoPlay: 5000, //Set AutoPlay to 3 seconds 
        items: 5,
    });
    // scroll indicator
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > $("#about").offset().top) {
            $('.scroll-indicator').css('opacity', '1');
        } else {
            $('.scroll-indicator').css('opacity', '0');

        }
    });

    // FORM VALIDATION

    $(".subscribe-form input").jqBootstrapValidation({
        preventSubmit: true,
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            $.ajax({
                success: function() {
                    $('#subscribe-success').html("<div class='alert alert-success'>");
                    $('#subscribe-success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#subscribe-success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#subscribe-success > .alert-success')
                        .append('</div>');
                }
            })

        }
    });

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "../mail/sendmail.php",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    // HEADER PARTICLES EFFECT
    if ($(window).width() > 960 && 1 != 1 ) {

        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 118,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "polygon",
                    "stroke": {
                        "width": 1,
                        "color": "#ffffff"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.21306986324071361,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 4.2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }



    // GOOGLE MAP
    $('#map').addClass('scrolloff');

    $('#overlay').on("mouseup", function() {
        $('#map').addClass('scrolloff');
    });
    $('#overlay').on("mousedown", function() {
        $('#map').removeClass('scrolloff');
    });

    $("#map").mouseleave(function() {
        $('#map').addClass('scrolloff');
    });

    // Scroll animation with aos
    AOS.init({
        easing: 'ease-out-back',
        duration: 1000
    });


});
