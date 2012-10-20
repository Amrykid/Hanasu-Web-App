function nav(pagenum){
	var p = $(".page");
	switch(pagenum){
		case 0:
			p.fadeOut();
			$("#mainPage").fadeIn();
			break;
		case 1:
			p.fadeOut();
			$("#stationsPage").fadeIn();
			break;
		case 2:
			p.fadeOut();
			$("#settingsPage").fadeIn();
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
	setTimeout(function(){
		$("#notification").fadeOut(1000);
	}, 3000);
}

$("#logo").click(function(){nav(0);});
$("#nButtonStations").click(function(){nav(1);});
$("#nButtonSettings").click(function(){nav(2);});
$("#dialogButton").click(function(){$("#dialogP").fadeOut();});
$("#mD").click(function(){dialog("Error","Some random stuff happened. You should probably look into it.");});
$("#nE").click(function(){notification("images/songexample.png","What the function","The sleep deprived programmers");});
$("#nButtonFullscreen").click(function(){$(document).toggleFullScreen();});
$(document).keydown(function(e){if(e.keyCode=='70'){e.preventDefault();$(document).toggleFullScreen();}});

// Controls

var isPlaying = false;

$("#cPlay").click(function(){
	if (isPlaying == false){
		isPlaying = true;
		$.post("/play");
		$("#cPlay").attr('class','controlButton icon-pause');
	} else {
		isPlaying = false;
		$.post("/pause");
		$("#cPlay").attr('class','controlButton icon-play');
	}
});

//Detects if Hanasu is playing a station.
$.get("/isplaying", function(data){
        isPlaying = data == 'true';

        $("#cPlay").attr('class', isPlaying == true ? 'controlButton icon-pause' : 'controlButton icon-play');

        if (isPlaying){
                
                //Since Hanasu is playing a station, grab its 'now playing' data and show it in a notification.
                $.get("/nowplaying", function(track){
                     notification("images/songexample.png","Now Playing",track);
                });
        }
});