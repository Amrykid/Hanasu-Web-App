function nav(pagenum){
	var p = $(".page");
	switch(pagenum){
		case 0:
			p.fadeOut();
			$("#mainPage").fadeIn();
			break;
		case 1:
			p.fadeOut();
			$("#settings").fadeIn();
			break;
		case 2:
			p.fadeOut().hide();
			break;
	}
}

function dialog(t,p){
	$("#dialogI h1").html(t);
	$("#dialogI p").html(p);
	$("#dialogP").fadeIn();
}

function notification(i,t,a){
	$("#songimage").attr("src", i);
	$("#songname").html(t);
	$("#songartist").html(a);
	$("#notification").fadeIn(200);
	setTimeout(function() {
		$("#notification").fadeOut(1000);
	}, 3000);
}

$("#logo").click(function(){nav(0);});
$("#nButtonSettings").click(function(){nav(1);});
$("#dialogButton").click(function(){$("#dialogP").fadeOut();});
$("#mD").click(function(){dialog("Error","Some random stuff happened. You should probably look into it.");});
$("#nE").click(function(){notification("images/songexample.png","Song Name","Artist Name");});