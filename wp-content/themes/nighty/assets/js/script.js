(function($){
	"use strict";

	function nighty_menu(){

		var $btn = $('.main-navigation .menu-toggle'),
        $menu = $('.main-navigation');
        $btn.on('click', function () {
            $menu.toggleClass('toggled');
        });

        if ($menu.length > 0) {
            $menu.find('.menu-item-has-children > a, .page_item_has_children > a').each((index, element) => {
                var $dropdown = $('<button class="dropdown-toggle"></button>');
                $dropdown.insertAfter(element);

            });
            $(document).on('click', '.main-navigation .dropdown-toggle', function (e) {
                e.preventDefault();
                $(e.target).toggleClass('toggled-on');
                $(e.target).siblings('ul').stop().toggleClass('show');
            });
        }
	}

	function nighty_set_menu_direction($item) {
        var sub = $item.children('.sub-menu'),
            offset = $item.offset(),
            width = $item.outerWidth(),
            screen_width = $(window).width(),
            sub_width = sub.outerWidth();
        var align_delta = offset.left + width + sub_width - screen_width;
        if (align_delta > 0) {
            if ($item.parents('.menu-item-has-children').length) {
                sub.css({ left: 'auto', right: '100%' });
            }else {
                sub.css({ left: 'auto', right: '0' });
            }
        } else {
            sub.css({ left: '', right: '' });
        }
    }

    function nighty_hover_submenu() {
        $('.primary-navigation .menu-item-has-children').hover(function (event) {
            var $item = $(event.currentTarget);
            nighty_set_menu_direction($item);
        });
    }	

		
	/* Click scroll button at bottom */	
	function nighty_scrollUp(options) {
	       
		var defaults = {
		    scrollName: 'scrollUp', 
		    topDistance: 600, 
		    topSpeed: 800, 
		    animation: 'fade', 
		    animationInSpeed: 200, 
		    animationOutSpeed: 200, 
		    scrollText: '<i class="ovaicon-up-arrow"></i>', 
		    scrollImg: false, 
		    activeOverlay: false 
		};

		var o = $.extend({}, defaults, options),
		        scrollId = '#' + o.scrollName;


		$('<a/>', {
		    id: o.scrollName,
		    href: '#top',
		    title: ScrollUpText.value
		}).appendTo('body');


		if (!o.scrollImg) {

		    $(scrollId).html(o.scrollText);
		}


		$(scrollId).css({'display': 'none', 'position': 'fixed', 'z-index': '2147483647'});


		if (o.activeOverlay) {
		    $("body").append("<div id='" + o.scrollName + "-active'></div>");
		    $(scrollId + "-active").css({'position': 'absolute', 'top': o.topDistance + 'px', 'width': '100%', 'border-top': '1px dotted ' + o.activeOverlay, 'z-index': '2147483647'});
		}


		$(window).scroll(function () {
		    switch (o.animation) {
		        case "fade":
		            $(($(window).scrollTop() > o.topDistance) ? $(scrollId).fadeIn(o.animationInSpeed) : $(scrollId).fadeOut(o.animationOutSpeed));
		            break;
		        case "slide":
		            $(($(window).scrollTop() > o.topDistance) ? $(scrollId).slideDown(o.animationInSpeed) : $(scrollId).slideUp(o.animationOutSpeed));
		            break;
		        default:
		            $(($(window).scrollTop() > o.topDistance) ? $(scrollId).show(0) : $(scrollId).hide(0));
		    }
		});


		$(scrollId).on( "click", function (event) {
		    $('html, body').animate({scrollTop: 0}, o.topSpeed);
		    event.preventDefault();
		});

		$("[href='#top']").on( "click", function (event) {
		    $('html, body').animate({scrollTop: 0}, o.topSpeed);
		    event.preventDefault();
		});

	}

	
	// Post Format - Gallery
	$('.slide_gallery').each(function(){
		
		var autoplay = $(this).data('autoplay');
		var autoplayTimeout = $(this).data('autoplaytimeout');
		var autoplaySpeed = $(this).data('autoplayspeed');
		var stopOnHover = $(this).data('stoponhover');
		var loop = $(this).data('loop');
		var dots = $(this).data('dots');
		var nav = $(this).data('nav');
		var items = $(this).data('items');
		

		$(this).owlCarousel({
			autoplayTimeout: parseInt( autoplayTimeout ),
		    autoplay: autoplay,
		    autoplaySpeed: parseInt( autoplaySpeed ),
		    stopOnHover : stopOnHover,
		    loop:loop,
		    dots:dots,
		    nav: nav,
		    items: parseInt( items ),
		});
	});
	

	if( $('.header_sticky').length ){

		function sticky_menu(menu, sticky) {
		    if (typeof sticky === 'undefined' || !jQuery.isNumeric(sticky)) sticky = 0;
		    if ($(window).scrollTop() >= sticky) {
		        if ($('#just-for-height').length === 0) {

		        	if( $('.above_menu').length > 0 && $(window).width() > 767 ){
		        		var menuoutheight = menu.outerHeight() + $('.above_menu').outerHeight(); 
		        	}else{
		        		var menuoutheight = menu.outerHeight();	
		        	}
		        	
		            menu.after('<div id="just-for-height" style="height:' + menuoutheight + 'px"></div>')
		        }
		        menu.addClass("active_sticky");
		    } else {
		        menu.removeClass("active_sticky");
		        $('#just-for-height').remove();
		    }
		}

		$(document).ready(function () {
		    var menu = $(".header_sticky");
		    if (menu.length) {
		        var sticky = menu.offset().top + 100;
		        if( $(".header_sticky").hasClass('mobile_sticky') ){
		        	
		            sticky_menu(menu, sticky);
		        	$(window).on('scroll', function () {
		                sticky_menu(menu, sticky);
		            });    
			        	
		        }else{
		        	if ($(window).width() > 767) {
			            sticky_menu(menu, sticky);
			            $(window).on('scroll', function () {
			                sticky_menu(menu, sticky);
			            });
			        }
		        }

		        
		    }
		});

	}
		

	// Check link has Hash (#about) in landing page
	if( $( 'ul.menu' ).length ){

		var url = $( 'ul.menu li a' ).attr('href');
	    var hash = url.substring(url.indexOf("#")+1);
	    if( hash ){
	    	$( 'ul.menu li a' ).on( 'click', function(){
	    	$( 'ul.menu li' ).removeClass( 'current-menu-item' );
	    	$(this).parent().addClass( 'current-menu-item' );
	    	$(this).closest( '.menu-canvas' ).toggleClass('toggled');

	    });	
	    }
	    
	}
	

	// Mansory Blog
    $('.blog_masonry').each( function() {

        var grid = $(this);
        var run  = grid.masonry({
          itemSelector: '.post-wrap',
          gutter: 0,
          percentPosition: true,
          transitionDuration: 0,
        });

        run.imagesLoaded().progress( function() {
          run.masonry();
        });
       
        
    });

    nighty_hover_submenu();
	nighty_menu();
	
	/* Scroll to top */
	nighty_scrollUp();

	// Stretch Column Left/Right
	$('.nighty_section_margin_left').each( function() {
		var that = $(this);
		if ( that.length != null ) {
			nighty_calculate_width( that );
		}	
	});
    
    $('.nighty_stretch_column_left').each( function() {
		var that = $(this);
		if ( that.length != null ) {
			nighty_calculate_width( that );
		}
	});

    $('.nighty_stretch_column_right').each( function() {
		var that = $(this);
		if ( that.length != null ) {
			nighty_calculate_width( that );
		}
	});

    // Calculate width with special class
	function nighty_calculate_width( directly ){

		if( $(directly).length ){

			var col_offset = $(directly).offset();

			var width_curr = $( window ).width();

			if( directly.hasClass('nighty_stretch_column_left') ){

				var ending_left = col_offset.left;
				var width_left 	= $(directly).outerWidth() + ending_left;
				
				$('.nighty_stretch_column_left .elementor-widget-wrap').css('width', width_left);
				$('.nighty_stretch_column_left .elementor-widget-wrap').css('margin-left', -ending_left);
			}

			if( directly.hasClass('nighty_stretch_column_right') ){

				var ending_right 	= ($(window).width() - (col_offset.left + $(directly).outerWidth()));
				var width_right 	= $(directly).outerWidth() + ending_right;

				directly.find('.elementor-widget-wrap').css('width', width_right);
				directly.find('.elementor-widget-wrap').css('margin-right', -ending_right);
			}

			if ( width_curr > 767 ) {
				if( directly.hasClass('nighty_section_margin_left') && $('.row_site').length ){
					var ending_left = $('.row_site').offset().left;
					$('.nighty_section_margin_left').css('margin-left', ending_left);
					directly.find('.elementor-container').css('margin-left', 0);
				}

			} else {
				if( directly.hasClass('nighty_section_margin_left') ){
					$('.nighty_section_margin_left').css('margin-left', 0);
				}
			}

		}
	}

	$(window).resize(function () {

		$('.nighty_stretch_column_left').each( function() {
			var that = $(this);
			if ( that.length != null ) {
				nighty_calculate_width( that );
			}
		});

		$('.nighty_stretch_column_right').each( function() {
			var that = $(this);
			if ( that.length != null ) {
				nighty_calculate_width( that );
			}
		});

		$('.nighty_section_margin_left').each( function() {
			var that = $(this);
			if ( that.length != null ) {
				nighty_calculate_width( that );
			}	
		});

	});	

})(jQuery);