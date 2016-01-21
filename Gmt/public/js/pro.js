$("#Edit").click(function() {
	$("#blank").replaceWith(function() {
		return "<input type=\"text\" value=\"" + $(this).html() + "\" />";
	});
});

$("#Edits").click(function() {
	$("#blanks").replaceWith(function() {
		return "<input type=\"text\" value=\"" + $(this).html() + "\" />";
	});
});
$("#Editss").click(function() {
	$("#blankss").replaceWith(function() {
		return "<input type=\"text\" value=\"" + $(this).html() + "\" />";
	});
});
$('input[type=radio]').click(function() {
	$("form id or class").submit();
});

// $(document).ready(function() {
// var stickyNavTop = $('#nav').offset().top;
//
// var stickyNav = function(){
// var scrollTop = $(window).scrollTop();
//
// if (scrollTop > stickyNavTop) {
//     $('#nav').addClass('sticky');
// } else {
//     $('#nav').removeClass('sticky');
// }
// };
//
// stickyNav();
//
// $(window).scroll(function() {
//     stickyNav();
// });
// });
// $(document).ready(function() {
//
//   $(window).scroll(function () {
//       //if you hard code, then use console
//       //.log to determine when you want the
//       //nav bar to stick.
//       console.log($(window).scrollTop())
//     if ($(window).scrollTop() > 285) {
//       $('#nav_bar').addClass('navbar-fixed');
//     }
//     if ($(window).scrollTop() < 284) {
//       $('#nav_bar').removeClass('navbar-fixed');
//     }
//   });
// });

// $(document).ready(function() {
//
// 	var owl = $("#owl-demo");
//
// 	owl.owlCarousel({
// 		navigation: true,
// 		singleItem: true,
// 		transitionStyle: "fade"
// 	});
//
// });


// $( "#View" ).click( function() {
//     $( "input[type=text]" ).replaceWith( function() {
//         return "<label>" + $( this ).val() + "</label>";
//     });
// });

// $(document).ready(function() {
//     $('a.edit').click(function () {
//         var dad = $(this).parent().parent();
//         dad.find('#blank').hide();
//         dad.find('input[type="text"]').show().focus();
//     });
//
//     $('input[type=text]').focusout(function() {
//         var dad = $(this).parent();
//         $(this).hide();
//         dad.find('#blank').show();
//     });
// });
