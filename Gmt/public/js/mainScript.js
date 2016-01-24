// $(document).ready(function(){
//     $('#fullpage').fullpage({
//         sectionsColor: ['white', 'white', 'white', 'white'],
//         anchors: ['overview', 'providers', 'doctors', 'procedures'],
//         menu: '#menu',
//         autoScrolling: false,
//         fitToSection: false,
//         scrollBar: true,
//         responsive: 2000,
//         afterLoad: function(anchorLink, index, slideAnchor, slideIndex){
//             $('#menu li').removeClass('active-section');
//             $('#menu li:nth-child('+index+')').addClass('active-section');
//         },
//     });
// });

$(".demo").smoothScroller({
  duration: 700, // scrolling duration
  activeClass: "active" // the CSS class for the anchor links to indicate the current section
});
