$(document).ready(function(){
    $(".box").hover(function() {
        $(this).find('.edit-btn').css({"opacity": 1});
    }, function(){
        $(this).find('.edit-btn').css({"opacity": 0});
    });



}); //end ready
