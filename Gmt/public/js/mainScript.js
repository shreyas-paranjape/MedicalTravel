$(document).ready(function(){
    $('#fullpage').fullpage({
        sectionsColor: ['white', 'white', 'white', 'white'],
        anchors: ['overview', 'providers', 'doctors', 'procedures'],
        menu: '#menu',
        autoScrolling: false,
        fitToSection: false,
        scrollBar: true,
        responsive: 2000,
        afterLoad: function(anchorLink, index, slideAnchor, slideIndex){
            $('#menu li').removeClass('active-section');
            $('#menu li:nth-child('+index+')').addClass('active-section');
        },
    });
});


//
// $(function() {
//     $('a.page-scroll').bind('click', function(event) {
//         var $anchor = $(this);
//         $('html, body').stop().animate({
//             scrollTop: $($anchor.attr('href')).offset().top
//         }, 1500, 'easeInOutExpo');
//         event.preventDefault();
//     });
// });
