function nav(pagenum){
	switch(pagenum){
		case 0:
			$(".navlink").removeClass('currentnav');
			$("#homenavbtn").addClass('currentnav');
			pagetab.fadeOut().hide();
			hometab.fadeIn().show();
			break;
		case 1:
			$(".navlink").removeClass('currentnav');
			$("#experimentsnavbtn").addClass('currentnav');
			pagetab.fadeOut().hide();
			experimentstab.fadeIn().show();
			break;
		case 2:
			$(".navlink").removeClass('currentnav');
			$("#contactnavbtn").addClass('currentnav');
			pagetab.fadeOut().hide();
			contacttab.fadeIn().show();
			break;
	}
}

$("#homenavbtn").addClass('currentnav');

$("#logo").click(function(){
	nav(0);
});

$("#homenavbtn").click(function(){
	nav(0);
});

$("#experimentsnavbtn").click(function(){
	nav(1);
});

$("#contactnavbtn").click(function(){
	nav(2);
});

$(".popupclose").click(function(){
	$(".popup").hide();
	nav(2);
});