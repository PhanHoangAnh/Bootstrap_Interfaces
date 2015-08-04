$('body').scrollspy({ target: '#sidebar', offset:80 });


var clicked = false;
$('#mynav li a').click(
function(){
	$('#mycontent > div > h2').css('padding-top',0);
	$($( this ).attr('href') + ' > h2').css('padding-top','50px');
	clicked = true;
	}
);	

$('body').on('activate.bs.scrollspy', function () {
  console.log('scrolling...');
  if(!clicked)$('#mycontent > div > h2').css('padding-top',0);
  clicked = false;
})