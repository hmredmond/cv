jQuery(document).ready(function($) {

    $('.level-bar-inner').css('width', '0');
    
    $(window).on('load', function() {
    
        $('a_[target="_blank"]').each(function(){
            $(this).append('<i><hr><hr><hr><hr><hr></i>');
        })
    
        $('.level-bar-inner').each(function() {
        
            var itemWidth = $(this).data('level');
            
            $(this).animate({
                width: itemWidth
            }, 800);


            $(this).find('.level-description').stop(true, true).delay(800).animate({opacity:1}, 300);
        });

        $('.projects-section .screenshots a').simpleLightbox();
    });
   
    $("#change-theme").on('change', function(){
       var newTheme = $("#change-theme").val();
       $('link#theme-style').attr('href','assets/css/'+newTheme +'/styles.css');
    });

});