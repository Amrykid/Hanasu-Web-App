var isPlaying = false;
var isConnected = true; //Assume true at first since it had to be connected to download the page.
var currentSong = ""; //Holds on to the current so for display and checking for new songs.

function nav(pagenum) {
    var p = $(".page");
    switch (pagenum) {
        case 0:
            p.fadeOut();
            $("#mainPage").fadeIn();
            break;
        case 1:
            p.fadeOut();
            $("#stationsPage").fadeIn();
            getCatalogStations(); //You should move this to where you press Hanasu catalog
            break;
        case 2:
            p.fadeOut();
            $("#settingsPage").fadeIn();
            break;
    }
}

function getCatalogStations() {
    //load the stations
    $.get("/stations", function (data) {
        var $xml = $(data);

        $xml.find('Station').each(function (stationIndex, station) {
            var stationHtml = $("<div></div>");
            stationHtml.attr("class", "station");

            var logo = $(station).find("Logo");
            var name = $(station).find("Name");
            var language = $(station).find("Language");

            stationHtml.append("<img src=\"" + $(logo).html() + "\"/>");
            stationHtml.append("<span class=\"sTitle sName\">" + $(name).html() + "</span>");
            stationHtml.append("<br />");
            stationHtml.append("<span class=\"sTitle sLanguage\">" + $(language).html() + "</span>");

            $("#stationContainer").append(stationHtml);
        });

        $(".station").click(function (data) {
            var statName = $(jQuery(this).children("span")[0]).html();
            $.get("/getstationstreams?station=" + statName, function (data) {
                var ul = $($(jQuery(this).children("div")[0]).children("div")[0]).children("ul");
                ul.html("");

                var $xml = $(data);
                var station = $xml[0];
                var streams = $(station)[0];

                $(streams).find('Stream').each(function (Index, stream) {

                    var title = $(stream).find("Title").html();
                    var url = $(stream).find("Url").html();

                    $($(jQuery(this).children("div")[0]).children("div")[0]).children("ul").append("<li class\"ssConnection\"><span class=\"ssName\">" + title + "</span><span class=\"ssLocation\">" + url + "</span></li>");

                });

                $(".ssConnection").click(function (data) {
                    var statUrl = $(jQuery(this).children("span")[1]).html();
                    $.post("/play2?station=" + statName + "&url=" + statUrl);
                });
            });

            var heightis = $(this).height();
            if (heightis == 120) {
                $(this).animate({ height: "240px" }, 400);
                $(".station .stationsStream").show();
            } else {
                $(this).animate({ height: "120px" }, 400);
                $(".station .stationsStream").hide();
            }
        });
    });
}

function detectPlayStatus() {
    //Detects if Hanasu is playing a station.
    $.get("/isplaying", function (data) {
        isPlaying = data == 'true';

        $("#cPlay").attr('class', isPlaying == true ? 'controlButton icon-pause' : 'controlButton icon-play');

        if (isPlaying) {

            //Since Hanasu is playing a station, grab its 'now playing' data and show it in a notification.
            $.get("/nowplaying", function (track) {

                if (track != currentSong) {
                    //New song, so show a notification.
                    currentSong = track;
                    notification("images/songexample.png", "Now Playing", track);
                }
            });
        }
    });
}

function localizeApp() {
    $('[i18n-name]').each(function (index, element) {
        var key = $(element).attr('i18n-name');

        $.get("/getlocalizedvalue?key=" + key, function (data) {
            $(element).html(data);
        });
    });
}

function initializeApp() {
    //any important starting procedures, we can put here.

    $.ajaxSetup({ cache: false });

    localizeApp(); //Begin translating the app.


    //initalize heartbeat timer
    var heartBeatTimer = $.timer(function () {
        //this runs every 5 seconds to check if theres a connection to Hanasu. 
        //If there is, grab the current song. 
        //If the current song is different from the stored current song, its a new song.

        $.get("/ping")
        .success(function (data) {
            //got a response from Hanasu, so set isConnected to true
            isConnected = true;

            detectPlayStatus();
        })
        .error(function (data) {
            //failed to get a response from Hanasu, set isConnected to false
            if (isConnected) {
                //the last time the heartbeat ran, it was connected.
                //lets alert the user that the connection as been lost.

                dialog("Error", "Connection to Hanasu has been lost.","Close");
            }

            isConnected = false;
            isPlaying = false;

            currentSong = "";

            $("#cPlay").attr('class', 'controlButton icon-play');
        });

    });
    heartBeatTimer.set({ time: 5000, autostart: true });


}

function dialog(t, p ,n) {
    $("#dialogI h1").html(t);
    $("#dialogI p").html(p);
    $("#dialogButton").html(n)
    $("#dialogP").fadeIn();
}

function notification(i, t, a) {
    $("#songimage").attr("src", i);
    $("#songname").html(t);
    $("#songartist").html(a);
    $("#notification").show('slide', {direction: 'right'}, 500);
    setTimeout(function () {
        $("#notification").hide('slide', {direction: 'right'}, 500);
    }, 3000);
}

$("#logo").click(function () { nav(0); });
$("#nButtonStations").click(function () { nav(1); });
$("#nButtonSettings").click(function () { nav(2); });
$("#dialogButton").click(function () { $("#dialogP").fadeOut(); });
$("#mD").click(function () { dialog("Error", "Some random stuff happened. You should probably look into it.","Close"); });
$("#nE").click(function () { notification("images/songexample.png", "What the function", "The sleep deprived programmers"); });
$("#nButtonFullscreen").click(function () { $(document).toggleFullScreen(); });
$(document).keydown(function (e) { if (e.keyCode == '70') { e.preventDefault(); $(document).toggleFullScreen(); } });

// Controls

$("#cPlay").click(function () {
    if (isPlaying == false) {
        isPlaying = true;
        $.post("/play");
    } else {
        isPlaying = false;
        $.post("/pause");
    }
    $("#cPlay").attr('class', isPlaying == true ? 'controlButton icon-pause' : 'controlButton icon-play');
});

initializeApp(); //Starts the app

$(document).ready(function(){
    setTimeout(function () {
        $("#loadingSplash").fadeOut();
    }, 1000);
});
