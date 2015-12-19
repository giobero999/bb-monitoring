$(document).ready(function(){

    $(".box").hover(function() {
        $(this).find('.edit-btn').css({"opacity": 1});
        console.log("hover")
    }, function(){
        $(this).find('.edit-btn').css({"opacity": 0});
    });


    //edit modal show
    $(".edit-btn").click(function(){
        $("#bb-create").modal();
    });

    //dropzone
    $("myDropzone").dropzone({ url: "/file/post" });


    //on/off swithcer
    $('#toggle-one').change(function() {
        console.log("off");
    });







}); //end ready
