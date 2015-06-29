$(document).ready(function(){
    $('#fullpage').fullpage({
        sectionsColor: ['white', 'white', 'white', 'white', 'white'],
        anchors: ['goa', 'facilities', 'price', 'procedures', 'quote'],
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
