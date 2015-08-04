
var $body   = $(document.body);
var navHeight = $('.navbar').outerHeight(true) + 10;

$body.scrollspy({
	target: '.bs-docs-sidebar',
	offset: navHeight	
});
$('#sidebar').affix({
      offset: {
        top: 245
      }
      
});
