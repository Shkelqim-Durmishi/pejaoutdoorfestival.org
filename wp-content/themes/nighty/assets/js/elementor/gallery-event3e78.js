(function($){
	"use strict";
	
	$(window).on('elementor/frontend/init', function () {
		
        elementorFrontend.hooks.addAction('frontend/element_ready/nighty_elementor_gallery_event.default', function(){
	       
	        /* Add your code here */
        	$(".ova-gallery-event").each( function(e){

        		Fancybox.bind('[data-fancybox="gallery-event"]', {
				  	// Your custom options
				});

        	} );
	    	
        });
        
   });

})(jQuery);