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

