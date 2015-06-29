$(document).ready(function(){
    $('#fullpage').fullpage({
        sectionsColor: ['white', 'white', 'white', 'white', 'white'],
        anchors: ['goa', 'facilities', 'price', 'procedures', 'quote'],
        menu: '#menu',
        autoScrolling: false,
        scrollBar: true,
        normalScrollElements:'#goa , #facilities',
        afterLoad: function(anchorLink, index, slideAnchor, slideIndex){
            $('#menu li').removeClass('active-section');
            $('#menu li:nth-child('+index+')').addClass('active-section');
            if (index === 1) {
                $('.cd-top').hide();
            } else {
                $('.cd-top').show();
            }
            
        },
    });
});
