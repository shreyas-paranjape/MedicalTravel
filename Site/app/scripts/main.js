$(document).ready(function(){
    $('#fullpage').fullpage({
        sectionsColor: ['whitesmoke', 'whitesmoke', 'whitesmoke', 'whitesmoke', 'whitesmoke'],
        anchors: ['goa', 'hospital', 'procedure', 'about-us', 'contact-us'],
        menu: '#menu',
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
