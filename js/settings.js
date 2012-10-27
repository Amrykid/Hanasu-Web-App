$(".settingsPagePane").hide();

function changeP(pA){
	switch(pA){
		case 0:
			$(".settingsPagePane").hide();
			break;
		case 1:
			$(".settingsPagePane").hide();
			
			break;
		case 2:
			$(".settingsPagePane").hide();
			$("#settingInterface").show();
			break;
		case 3:
			$(".settingsPagePane").hide();

			break;
	}
}
$("#sL0").click(function(){changeP(0);});
$("#sL1").click(function(){changeP(1);});
$("#sL2").click(function(){changeP(2);});
$("#sL3").click(function(){changeP(3);});

// Themes

var currentTheme = 0;

$(function () {

});

function theme(st){
	switch(st){
		case 0:
			$("header").css("background-color","rgba(169,7,7,1)");
			$(".station .stationsStream").css("border-top","rgba(169,7,7,1)");
			$("html,body").css("background-color","rgba(37,37,37,1);");
			$(".page").css("color","#ffffff");
			$(".leftBar").css("background-color","rgba(51,51,51,1)");
			break;
		case 1:
			$("header").css("background-color","rgba(100,7,7,1)");
			$(".station .stationsStream").css("border-top","rgba(100,7,7,1)");
			$("html,body").css("background-color","rgba(220,220,220,1);");
			$(".page").css("color","#000000");
			$(".leftBar").css("background-color","rgba(180,180,180,1)");
			$(".leftBar ul li span:hover").css("color","#ffffff");
			break;
		case 2:

			break;
		case 3:

			break;
	}
}

$("#th0").click(function(){theme(0);});
$("#th1").click(function(){theme(1);});
$("#th2").click(function(){theme(2);});
$("#th3").click(function(){theme(3);});