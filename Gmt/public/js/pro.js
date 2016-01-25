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
