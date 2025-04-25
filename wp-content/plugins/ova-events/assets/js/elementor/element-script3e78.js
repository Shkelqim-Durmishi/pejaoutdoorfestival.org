(function($){
    "use strict";
    
    $(window).on('elementor/frontend/init', function () {

        elementorFrontend.hooks.addAction('frontend/element_ready/ova_event_countdown.default', function(){
           
            /* Add your code here */
            $('.ovaev-event-countdown').each(function(e) {
            
            var austDay     = new Date();
            var year        = $(this).data("year");
            var day         = $(this).data("day");
            var month       = $(this).data("month");
            var hour        = $(this).data("hour");
            var minute      = $(this).data("minute");
            var timezone    = $(this).data("timezone");
            var lang        = $(this).data("lang");
            var url         = $(this).data("url");

            if ( lang != 'en' ) {
                $.localise(url + 'assets/libs/countdown/jquery.countdown', lang);
            }
            
            austDay = new Date(year, month - 1, day, hour, minute);
                    $(this).find(".event-time").countdown($.extend( {until: austDay,timezone: timezone,
            layout: `<div class="item">
                        <div class="time">
                            <h5>{dnn}</h5>
                            <p>{dl}</p>
                        </div>
                        <div class="colon">
                            <div class="colon_inner">
                                <div class="dot"></div>
                                <div class="dot"></div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="time">
                            <h5>{hnn}</h5>
                            <p>{hl}</p>
                        </div>
                        <div class="colon">
                            <div class="colon_inner">
                                <div class="dot"></div>
                                <div class="dot"></div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="time">
                            <h5>{mnn}</h5>
                            <p>{ml}</p>
                        </div>
                        <div class="colon">
                            <div class="colon_inner">
                                <div class="dot"></div>
                                <div class="dot"></div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="time">
                            <h5>{snn}</h5>
                            <p>{sl}</p>
                        </div>
                    </div>`
                },$.countdown.regionalOptions[lang] ) );
                    
            });
            
        });

        
        
    });

})(jQuery);