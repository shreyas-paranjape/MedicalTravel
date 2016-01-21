function showHover1(img) {
	if (img) {
		img.src = '/images/ProviderResearch49.png';
	}
}

function showNormal1(img) {
	if (img) {
		img.src = '/images/ProviderResearch149.png';
	}
}

function showHover2(img) {
	if (img) {
		img.src = '/images/MedicalVisa49.png';
	}
}

function showNormal2(img) {
	if (img) {
		img.src = '/images/MedicalVisa149.png';
	}
}

function showHover3(img) {
	if (img) {
		img.src = '/images/FlightBooking49.png';
	}
}

function showNormal3(img) {
	if (img) {
		img.src = '/images/FlightBooking149.png';
	}
}

function showHover4(img) {
	if (img) {
		img.src = '/images/Stay49.png';
	}
}

function showNormal4(img) {
	if (img) {
		img.src = '/images/Stay149.png';
	}
}

function showHover5(img) {
	if (img) {
		img.src = '/images/LocalLogistics49.png';
	}
}

function showNormal5(img) {
	if (img) {
		img.src = '/images/LocalLogistics149.png';
	}
}

function showHover6(img) {
	if (img) {
		img.src = '/images/Assistance49.png';
	}
}

function showNormal6(img) {
	if (img) {
		img.src = '/images/Assistance149.png';
	}
}
$(document).ready(function() {
	$('#ex1').mouseover(function() {
		showHover1(this);
	}).mouseout(function() {
		showNormal1(this);
	});
	$('#ex2').mouseover(function() {
		showHover2(this);
	}).mouseout(function() {
		showNormal2(this);
	});
	$('#ex3').mouseover(function() {
		showHover3(this);
	}).mouseout(function() {
		showNormal3(this);
	});
	$('#ex4').mouseover(function() {
		showHover4(this);
	}).mouseout(function() {
		showNormal4(this);
	});
	$('#ex5').mouseover(function() {
		showHover5(this);
	}).mouseout(function() {
		showNormal5(this);
	});
	$('#ex6').mouseover(function() {
		showHover6(this);
	}).mouseout(function() {
		showNormal6(this);
	});
});
