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
            //stationHtml.append("<br />");
            stationHtml.append("<span class=\"sTitle sLanguage\">" + $(language).html() + "</span>");
            stationHtml.append("<div class=\"stationsStream\" style=\"\"><div class=\"stationsStreamI\"><ul></ul></div></div>");

            $("#stationContainer").append(stationHtml);
        });

        $(".station").click(function (data) {
            var statName = $(jQuery(this).children("span")[0]).html();

            if (isConnected == false) {
                dialog("Error", "Can't play station: " + statName + ". You are not connected to Hanasu.", "Close");
                return;
            }

            var targetElement = jQuery(this);
            var ul = $($(jQuery(this).children("div")[0]).children("div")[0]).children("ul");

            if (ul.html() == "") {
                //Since we never retrieved the stations, fetch them.
                $.get("/getstationstreams?station=" + statName, function (data) {


                    var $xml = $(data);
                    var station = $xml[0];
                    var streams = $(station)[0];

                    $(streams).find('Stream').each(function (Index, stream) {

                        var title = $(stream).find("Title").html();
                        var url = $(stream).find("Url").html();

                        var firstDiv = $(targetElement).children("div")[0];
                        var secondDiv = $(firstDiv).children("div")[0]
                        $($(secondDiv).children("ul")[0]).append("<li class=\"ssConnection\"><span class=\"ssName\">" + title + "</span><span class=\"ssLocation\">" + url + "</span></li>");

                    });

                    $(".ssConnection").click(function (data) {
                        var statUrl = $(jQuery(this).children("span")[1]).html();
                        $.post("/play2?station=" + statName + "&url=" + statUrl);
                    });
                });
            }

            var heightis = $(this).height();
            if (heightis == 120) {
                $(this).animate({ height: "240px" }, 400);
                $(targetedElement).find(".stationsStream").show();
            } else {
                $(this).animate({ height: "120px" }, 400);
                $(targetedElement).find(".stationsStream").hide();
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

                    if (track != " - ") {
                        notification("images/songexample.png", "Now Playing", track);
                    }
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