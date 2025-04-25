(function($){
	"use strict";
	
	$(window).on('elementor/frontend/init', function () {
		
        elementorFrontend.hooks.addAction('frontend/element_ready/nighty_elementor_toggle_content.default', function(){
	   
	        $('.toggle-content .button-toggle').each(function(){
		        $(this).off().on('click', function() {
		            $(this).closest( '.toggle-content' ).toggleClass('toggled');
		        });
		    });
	        
	       	if( $('.toggle-content .site-overlay').length > 0 ){
	        	$('.toggle-content .site-overlay').off().on('click', function () {
		        	$(this).closest( '.toggle-content' ).toggleClass('toggled');
		        });
	        }

	        if( $('.toggle-content .close-menu').length > 0 ){
	        	$('.toggle-content .close-menu').off().on('click', function () {
		        	$(this).closest( '.toggle-content' ).toggleClass('toggled');
		        });
	        }

        });
   });

})(jQuery);
