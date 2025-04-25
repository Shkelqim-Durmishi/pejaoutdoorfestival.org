(function($){
 "use strict";

 $(document).ready(function(){

    /* Countdown */
    $('.event-countdown').each(function(e) {
        
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
                $(this).find(".event-time").countdown($.extend({until: austDay,timezone: timezone,
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

    /* Search Ajax */
    $(".event-archive #event-archive-search").submit( function(event){
        event.preventDefault();

        var key_words = '';
        if ( $("#keywords").val() ) {
            key_words = $("#keywords").val();
        }

        var data = {
            action: 'search_ajax_events',
            keywords: key_words,
        };

        var loading = $(".lds-dual-ring");

        loading.addClass("active");

        $.post(ajax_object.admin_ajax, data, function(response) {
            loading.removeClass("active");
            $(".list-events-wrap").html(response);
        });

    });


    /* Ajax Pagination */
    $( ".event-content" ).on( 'click', 'ul.pagination a' , function( e ) {
        e.preventDefault();

        /** Get data-page */
        var data_page       = $(this).attr( 'data-page' );
        var posts_per_page  = $('.ajax_pagination').attr( 'data-posts_per_page' );
        var post_type       = $('.ajax_pagination').attr( 'data-post_type' );
        var $orderby        = $('.ajax_pagination').attr( 'data-orderby' );
        var $order          = $('.ajax_pagination').attr( 'data-order' );
        var $show_pass      = $('.ajax_pagination').attr( 'data-show_pass' );
        var $key_words      = $('.ajax_pagination').attr( 'data-key_words' ); 

        var loading = $(".lds-dual-ring");
        loading.addClass("active");
        $('html, body').animate({
            scrollTop: $("#event-archive-search").offset().top - 250
        }, 500);
      
        $.ajax({
            cache: false,
            timeout: 8000,
            url: ajax_object.admin_ajax,
            type: "POST",
            data: ({ 
                action          :  'LoadPostPagination', 
                data_page       :  data_page,
                posts_per_page  :  posts_per_page,
                post_type       :  post_type,
                orderby         :  $orderby,
                order           :  $order,
                show_pass       :  $show_pass,
                key_words       :  $key_words,
            }),
            success: function( data, textStatus, jqXHR ){  
                loading.removeClass("active");           
                $( '.list-events-wrap' ).html( data );
            },
            error: function( jqXHR, textStatus, errorThrown ){
                console.log( 'The following error occured: ' + textStatus, errorThrown );
            },
        });
    });

    /* Click add event to cart and go to checkout page*/
    $('.ovaev-booking-via-woo').on('click', function(e) {

        e.preventDefault();

        var that = $(this);

        var id_event  = that.find('a').attr('data-id_event');
        var ovaev_checkout_event_nonce = that.find('#ovaev_checkout_event_nonce').val();

        $.ajax({
            url: ajax_object.admin_ajax,
            type: 'POST',
            data: ({
                action: 'ovaev_ajax_process_checkout',
                ovaev_checkout_event_nonce: ovaev_checkout_event_nonce,
                ide: id_event,
            }),
            success: function(response){
                var data = JSON.parse(response);
                var message_error = data.el_message;

                if ( ! message_error ) {
                    let url = data.el_url;
                    window.location.href = url;
                } else {
                    that.append(message_error);
                }
            }
        });
        
    });

});

})(jQuery);