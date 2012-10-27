var isPlaying = false;
var isConnected = true; //Assume true at first since it had to be connected to download the page.
var currentSong = ""; //Holds on to the current so for display and checking for new songs.
var currentStreamUrl = "";

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
            if (!isWeb) {
                getCatalogStations(); //You should move this to where you press Hanasu catalog
            }
            break;
        case 2:
            p.fadeOut();
            $("#settingsPage").fadeIn();
            break;
    }
}

$("#hanasuCatalogButton").click(function () {
    if (!isWeb) {
        getCatalogStations(); //You should move this to where you press Hanasu catalog
    }
});



function initializeApp() {
    //any important starting procedures, we can put here.

    $(document).ready(function () {
        setTimeout(function () {
            $("#loadingSplash").fadeOut();
        }, 1000);
    });

    $.ajaxSetup({ cache: false });

    if (isWeb) {

        // Temp Web Only and Client mode switching

        $("#toggleMode").click(function () {
            if (isWeb == false) {
                isWeb = true;
            } else {
                isWeb = false;
            }
        });

        $(".station").click(function () {
            if (isWeb == true) {
                var heightis = $(this).height();
                if (heightis == 120) {
                    $(this).animate({ height: "240px" }, 400);
                    $(".station .stationsStream").show();
                } else {
                    $(this).animate({ height: "120px" }, 400);
                    $(".station .stationsStream").hide();
                }
            }
        });

        $.getScript("js/jplayer/jquery.jplayer.min.js", function (data, textStatus, jqxhr) {
            $("#jquery_jplayer").jPlayer({
                swfPath: "/js/jplayer"
            });
        });

    }
    else {

        $.getScript("js/desktop.js", function () {

            localizeApp(); //Begin translating the app.

            $.getScript("js/jquery.timer.js", function (data, textStatus, jqxhr) {

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

                        dialog("Error", "Connection to Hanasu has been lost.", "Close");
                    }

                    isConnected = false;
                    isPlaying = false;

                    currentSong = "";

                    $("#cPlay").attr('class', 'controlButton icon-play');
                });

                });
                heartBeatTimer.set({ time: 5000, autostart: true });
            });
        });
    }

}

function dialog(t, p, n) {
    $("#dialogI h1").html(t);
    $("#dialogI p").html(p);
    $("#dialogButton").html(n)
    $("#dialogP").fadeIn();
}

function notification(i, t, a) {
    $("#songimage").attr("src", i);
    $("#songname").html(t);
    $("#songartist").html(a);
    $("#notification").show('slide', { direction: 'right' }, 500);
    setTimeout(function () {
        $("#notification").hide('slide', { direction: 'right' }, 500);
    }, 3000);
}

$("#logo").click(function () { nav(0); });
$("#nButtonStations").click(function () { nav(1); });
$("#nButtonSettings").click(function () { nav(2); });
$("#dialogButton").click(function () { $("#dialogP").fadeOut(); });
$("#nButtonFullscreen").click(function () { $(document).toggleFullScreen(); });
$(document).keydown(function (e) { if (e.keyCode == '70') { e.preventDefault(); $(document).toggleFullScreen(); } });

// Controls

$("#cPlay").click(function () {
    if (isPlaying == false) {
        isPlaying = true;

        if (isWeb) {
            $.post("/play");
        }
        else {
            $("#jquery_jplayer").jPlayer("setMedia", { mp3: currentStreamUrl });
            $("#jquery_jplayer").jPlayer("play");
        }
    } else {
        isPlaying = false;


        if (isWeb) {
            $("#jquery_jplayer").jPlayer("pause");
        }
        else {
            $.post("/pause");
        }
    }
    $("#cPlay").attr('class', isPlaying == true ? 'controlButton icon-pause' : 'controlButton icon-play');
});

initializeApp(); //Starts the app


// Testing Features

$(function () {
    $(".testElemnt").hide();
    $("#testing").draggable();
});

$(document).keydown(function (e) {
    if (e.keyCode == '192') {
        e.preventDefault();
        $("#testing").toggle();
    }
});

$("#toggleTestElements").click(function () {
    $(".testElemnt").toggle();
});

$("#mD").click(function () { dialog("Error", "Some random stuff happened. You should probably look into it.", "Close"); });
$("#nE").click(function () { notification("images/songexample.png", "What the function", "The sleep deprived programmers"); });

