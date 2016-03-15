$(window).scroll(function() {
	// get the scroll position
	var height = $(window).scrollTop();

	// Output the height for debug
	if ("#navprocedure") {
		if (height > 265) {
			// make the nav bar stick at the top
			$("#navprocedure").addClass("sticky");
			$("#navstick").addClass("offset");
		} else {
			// reset the nav bar
			$("#navprocedure").removeClass("sticky");
			$("#navstick").removeClass("offset");
		}
	}
	if ("#navdoctor") {
		if (height > 450) {
			// make the nav bar stick at the top
			$("#navdoctor").addClass("sticky");
			$("#navstick").addClass("offset");
		} else {
			// reset the nav bar
			$("#navdoctor").removeClass("sticky");
			$("#navstick").removeClass("offset");
		}
	}
	if ("#navprovider") {
		if (height > 450) {
			// make the nav bar stick at the top
			$("#navprovider").addClass("sticky");
			$("#navstick").addClass("offset");
		} else {
			// reset the nav bar
			$("#navprovider").removeClass("sticky");
			$("#navstick").removeClass("offset");
		}
	}
});
