/* Theme Name: Darya - App Landing page
   Author: Bighero
   Version : 1.0
*/



jQuery(document).ready(function($) {
	
	$('#embedTourContainer').on('click', function(event) {
		$('#embedTourContainer iframe').css('pointer-events', 'auto');
	});
	
	$('#embedTourContainer').mouseleave(function(e) { 
		$('#embedTourContainer iframe').css('pointer-events', 'none');
	});
	
  
  //$('#youtube-frame').trigger('click');
	
  // email capture form email placeholder
	var emailFieldClicked = false;
	$('#_email-field').on('click', function(event)
	{
      if (!emailFieldClicked) $(this).val('');
      emailFieldClicked = true;	
	});
  
  // email capture form close button
  $('#ecClose').on('click', function(e) 
  {
      $('#_form_33_').hide();
  });
	
  // close navbar when link clicked
  $('#navbar-menu a').on('click', function(e) {
    $('#navbar-menu').collapse('hide');
  });
  
  var appeared = false;
 
  // show email capture form if it wasn't appeared yet  
	$(document).scroll( function()
  {
    if ( appeared ) { return; }    
		var y = $(this).scrollTop();
		if (y > 900) 
    {
        $('.email-sign').fadeIn();
        appeared = true; 
    }
    
	});

	window.cfields = [];
	window._show_thank_you = function(id, message, trackcmp_url) {
		var form = document.getElementById('_form_' + id + '_'), thank_you = form.querySelector('._form-thank-you');
		form.querySelector('._form-content').style.display = 'none';
		thank_you.innerHTML = message;
		thank_you.style.display = 'block';
		if (typeof(trackcmp_url) != 'undefined' && trackcmp_url) {
		// Site tracking URL to use after inline form submission.
		_load_script(trackcmp_url);
		}
		if (typeof window._form_callback !== 'undefined') window._form_callback(id);
	};
		window._show_error = function(id, message, html) {
		var form = document.getElementById('_form_' + id + '_'), err = document.createElement('div'), button = form.querySelector('button'), old_error = form.querySelector('._form_error');
		if (old_error) old_error.parentNode.removeChild(old_error);
		err.innerHTML = message;
		err.className = '_error-inner _form_error _no_arrow';
		var wrapper = document.createElement('div');
		wrapper.className = '_form-inner';
		wrapper.appendChild(err);
		button.parentNode.insertBefore(wrapper, button);
		document.querySelector('[id^="_form"][id$="_submit"]').disabled = false;
		if (html) {
		var div = document.createElement('div');
		div.className = '_error-html';
		div.innerHTML = html;
		err.appendChild(div);
		}
	};
	window._load_script = function(url, callback) {
		var head = document.querySelector('head'), script = document.createElement('script'), r = false;
		script.type = 'text/javascript';
		script.charset = 'utf-8';
		script.src = url;
		if (callback) {
		  script.onload = script.onreadystatechange = function() {
		  if (!r && (!this.readyState || this.readyState == 'complete')) {
			r = true;
			callback();
			}
		  };
		}
		head.appendChild(script);
	};
	(function() {
	if (window.location.search.search("excludeform") !== -1) return false;
	var getCookie = function(name) {
	var match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
	return match ? match[2] : null;
	}
	var setCookie = function(name, value) {
	var now = new Date();
	var time = now.getTime();
	var expireTime = time + 1000 * 60 * 60 * 24 * 365;
	now.setTime(expireTime);
	document.cookie = name + '=' + value + '; expires=' + now + ';path=/';
	}
	  var addEvent = function(element, event, func) {
	if (element.addEventListener) {
	  element.addEventListener(event, func);
	} else {
	  var oldFunc = element['on' + event];
	  element['on' + event] = function() {
		oldFunc.apply(this, arguments);
		func.apply(this, arguments);
	  };
	}
	}
	var _removed = false;
	var form_to_submit = document.getElementById('_form_33_');
	var allInputs = form_to_submit.querySelectorAll('input, select, textarea'), tooltips = [], submitted = false;

	var getUrlParam = function(name) {
	var regexStr = '[\?&]' + name + '=([^&#]*)';
	var results = new RegExp(regexStr, 'i').exec(window.location.href);
	return results != undefined ? decodeURIComponent(results[1]) : false;
	};

	for (var i = 0; i < allInputs.length; i++) {
	var regexStr = "field\\[(\\d+)\\]";
	var results = new RegExp(regexStr).exec(allInputs[i].name);
	if (results != undefined) {
	  allInputs[i].dataset.name = window.cfields[results[1]];
	} else {
	  allInputs[i].dataset.name = allInputs[i].name;
	}
	var fieldVal = getUrlParam(allInputs[i].dataset.name);

	if (fieldVal) {
	  if (allInputs[i].type == "radio" || allInputs[i].type == "checkbox") {
		if (allInputs[i].value == fieldVal) {
		  allInputs[i].checked = true;
		}
	  } else {
		allInputs[i].value = fieldVal;
	  }
	}
	}

	var remove_tooltips = function() {
	for (var i = 0; i < tooltips.length; i++) {
	  tooltips[i].tip.parentNode.removeChild(tooltips[i].tip);
	}
	  tooltips = [];
	};
	var remove_tooltip = function(elem) {
	for (var i = 0; i < tooltips.length; i++) {
	  if (tooltips[i].elem === elem) {
		tooltips[i].tip.parentNode.removeChild(tooltips[i].tip);
		tooltips.splice(i, 1);
		return;
	  }
	}
	};
	var create_tooltip = function(elem, text) {
	var tooltip = document.createElement('div'), arrow = document.createElement('div'), inner = document.createElement('div'), new_tooltip = {};
	if (elem.type != 'radio' && elem.type != 'checkbox') {
	  tooltip.className = '_error';
	  arrow.className = '_error-arrow';
	  inner.className = '_error-inner';
	  inner.innerHTML = text;
	  tooltip.appendChild(arrow);
	  tooltip.appendChild(inner);
	  elem.parentNode.appendChild(tooltip);
	} else {
	  tooltip.className = '_error-inner _no_arrow';
	  tooltip.innerHTML = text;
	  elem.parentNode.insertBefore(tooltip, elem);
	  new_tooltip.no_arrow = true;
	}
	new_tooltip.tip = tooltip;
	new_tooltip.elem = elem;
	tooltips.push(new_tooltip);
	return new_tooltip;
	};
	var resize_tooltip = function(tooltip) {
	var rect = tooltip.elem.getBoundingClientRect();
	var doc = document.documentElement, scrollPosition = rect.top - ((window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0));
	if (scrollPosition < 40) {
	  tooltip.tip.className = tooltip.tip.className.replace(/ ?(_above|_below) ?/g, '') + ' _below';
	} else {
	  tooltip.tip.className = tooltip.tip.className.replace(/ ?(_above|_below) ?/g, '') + ' _above';
	}
	};
	var resize_tooltips = function() {
	if (_removed) return;
	for (var i = 0; i < tooltips.length; i++) {
	  if (!tooltips[i].no_arrow) resize_tooltip(tooltips[i]);
	}
	};
	var validate_field = function(elem, remove) {
	var tooltip = null, value = elem.value, no_error = true;
	remove ? remove_tooltip(elem) : false;
	if (elem.type != 'checkbox') elem.className = elem.className.replace(/ ?_has_error ?/g, '');
	if (elem.getAttribute('required') !== null) {
	  if (elem.type == 'radio' || (elem.type == 'checkbox' && /any/.test(elem.className))) {
		var elems = form_to_submit.elements[elem.name];
		if (!(elems instanceof NodeList || elems instanceof HTMLCollection) || elems.length <= 1) {
		  no_error = elem.checked;
		}
		else {
		  no_error = false;
		  for (var i = 0; i < elems.length; i++) {
			if (elems[i].checked) no_error = true;
		  }
		}
		if (!no_error) {
		  tooltip = create_tooltip(elem, "Please select an option.");
		}
	  } else if (elem.type =='checkbox') {
		var elems = form_to_submit.elements[elem.name], found = false, err = [];
		no_error = true;
		for (var i = 0; i < elems.length; i++) {
		  if (elems[i].getAttribute('required') === null) continue;
		  if (!found && elems[i] !== elem) return true;
		  found = true;
		  elems[i].className = elems[i].className.replace(/ ?_has_error ?/g, '');
		  if (!elems[i].checked) {
			no_error = false;
			elems[i].className = elems[i].className + ' _has_error';
			err.push("Checking %s is required".replace("%s", elems[i].value));
		  }
		}
		if (!no_error) {
		  tooltip = create_tooltip(elem, err.join('<br/>'));
		}
	  } else if (elem.tagName == 'SELECT') {
		var selected = true;
		if (elem.multiple) {
		  selected = false;
		  for (var i = 0; i < elem.options.length; i++) {
			if (elem.options[i].selected) {
			  selected = true;
			  break;
			}
		  }
		} else {
		  for (var i = 0; i < elem.options.length; i++) {
			if (elem.options[i].selected && !elem.options[i].value) {
			  selected = false;
			}
		  }
		}
		if (!selected) {
		  elem.className = elem.className + ' _has_error';
		  no_error = false;
		  tooltip = create_tooltip(elem, "Please select an option.");
		}
	  } else if (value === undefined || value === null || value === '') {
		elem.className = elem.className + ' _has_error';
		no_error = false;
		tooltip = create_tooltip(elem, "This field is required.");
	  }
	}
	if (no_error && elem.name == 'email') {
	  if (!value.match(/^[\+_a-z0-9-'&=]+(\.[\+_a-z0-9-']+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i)) {
		elem.className = elem.className + ' _has_error';
		no_error = false;
		tooltip = create_tooltip(elem, "Enter a valid email address.");
	  }
	}
	if (no_error && /date_field/.test(elem.className)) {
	  if (!value.match(/^\d\d\d\d-\d\d-\d\d$/)) {
		elem.className = elem.className + ' _has_error';
		no_error = false;
		tooltip = create_tooltip(elem, "Enter a valid date.");
	  }
	}
	tooltip ? resize_tooltip(tooltip) : false;
	return no_error;
	};
	var needs_validate = function(el) {
	return el.name == 'email' || el.getAttribute('required') !== null;
	};
	var validate_form = function(e) {
	var err = form_to_submit.querySelector('._form_error'), no_error = true;
	if (!submitted) {
	  submitted = true;
	  for (var i = 0, len = allInputs.length; i < len; i++) {
		var input = allInputs[i];
		if (needs_validate(input)) {
		  if (input.type == 'text') {
			addEvent(input, 'blur', function() {
			  this.value = this.value.trim();
			  validate_field(this, true);
			});
			addEvent(input, 'input', function() {
			  validate_field(this, true);
			});
		  } else if (input.type == 'radio' || input.type == 'checkbox') {
			(function(el) {
			  var radios = form_to_submit.elements[el.name];
			  for (var i = 0; i < radios.length; i++) {
				addEvent(radios[i], 'click', function() {
				  validate_field(el, true);
				});
			  }
			})(input);
		  } else if (input.tagName == 'SELECT') {
			addEvent(input, 'change', function() {
			  validate_field(this, true);
			});
		  } else if (input.type == 'textarea'){
			addEvent(input, 'input', function() {
			  validate_field(this, true);
			});
		  }
		}
	  }
	}
	remove_tooltips();
	for (var i = 0, len = allInputs.length; i < len; i++) {
	  var elem = allInputs[i];
	  if (needs_validate(elem)) {
		if (elem.tagName.toLowerCase() !== "select") {
		  elem.value = elem.value.trim();
		}
		validate_field(elem) ? true : no_error = false;
	  }
	}
	if (!no_error && e) {
	  e.preventDefault();
	}
	resize_tooltips();
	return no_error;
	};
	addEvent(window, 'resize', resize_tooltips);
	addEvent(window, 'scroll', resize_tooltips);
	window._old_serialize = null;
	if (typeof serialize !== 'undefined') window._old_serialize = window.serialize;
	_load_script("//d3rxaij56vjege.cloudfront.net/form-serialize/0.3/serialize.min.js", function() {
	window._form_serialize = window.serialize;
	if (window._old_serialize) window.serialize = window._old_serialize;
	});
	var form_submit = function(e) {
	e.preventDefault();
	if (validate_form()) {
	  // use this trick to get the submit button & disable it using plain javascript
	  document.querySelector('#_form_33_submit').disabled = true;
			var serialized = _form_serialize(document.getElementById('_form_33_'));
	  var err = form_to_submit.querySelector('._form_error');
	  err ? err.parentNode.removeChild(err) : false;
	  _load_script('https://zachcalhoun.activehosted.com/proc.php?' + serialized + '&jsonp=true');
	}
	return false;
	};
	addEvent(form_to_submit, 'submit', form_submit);
	})();

    "use strict";

    $(window).on('load', function () {
        AOS.refresh();
    });

    // Preloader      
    $(window).load(function() {
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });
    });


    $("#show-details").click(function (e) {
        $("#details").animate({"max-height": "10000px"}, 5500);
        e.preventDefault();
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
        if( $('#about').length ) {
            if ((scrollTop > $("#about").offset().top)) {
            $('.scroll-indicator').css('opacity', '1');
            } else { $('.scroll-indicator').css('opacity', '0'); }
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
                        .append("<strong>Your free guide is on it's way! You can unsubscribe at any time.</strong>");
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
