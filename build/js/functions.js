$(document).ready(function(){$(".box").hover(function(){$(this).find(".edit-btn").css({opacity:1}),console.log("hover")},function(){$(this).find(".edit-btn").css({opacity:0})}),$(".edit-btn").click(function(){$("#bb-create").modal()}),$("#toggle-one").change(function(){console.log("off")})});