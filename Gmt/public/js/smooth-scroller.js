(function($) {

	var scrollers = null;
	var duration = 1000;

	var activeClass = "active";

	$.fn.smoothScroller = function(params) {
		if (typeof params != "undefined") {
			if (typeof params.duration != "undefined") {
				duration = params.duration;
			}
			if (typeof params.activeClass != "undefined") {
				activeClass = params.activeClass;
			}
		}
		scrollers = $(this);

		enableScrolling();
	};

	var enableScrolling = function() {
		scrollers.click(function(evt) {
			evt.preventDefault();

			var target = $(this).attr("href");
			if (target == "" || typeof target == "undefined") {
				target = $(this).attr("data-target");
			}
			target = $(target);


			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top) - 168
				}, duration);
			}

			scrollers.removeClass(activeClass);
			$(this).addClass(activeClass);

		});
	}

}(jQuery));
