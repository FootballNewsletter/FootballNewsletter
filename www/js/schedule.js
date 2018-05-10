function loadScheduleRealMadryt() {
    $.ajaxSetup({
        headers: {
            'X-Auth-Token': '1b5d1d20547d4465b88db35bbaba25bf',
        }

    });

    $.getJSON('http://api.football-data.org/v1/teams/86/fixtures', function(json) {
        loadSchedule(json);
    });
}

function loadScheduleArsenal() {
    $.ajaxSetup({
        headers: {
            'X-Auth-Token': '1b5d1d20547d4465b88db35bbaba25bf',
        }

    });

    $.getJSON('http://api.football-data.org/v1/teams/57/fixtures', function(json) {
        loadSchedule(json);
    });
}

function loadScheduleRoma() {
    $.ajaxSetup({
        headers: {
            'X-Auth-Token': '1b5d1d20547d4465b88db35bbaba25bf',
        }

    });

    $.getJSON('http://api.football-data.org/v1/teams/100/fixtures', function(json) {
        loadSchedule(json);
    });
}

function loadSchedule(json) {
    console.log(json.fixtures);
    for (var i in json.fixtures) {
        $("#results").append(" <tr> <th scope=\"row\">"+i+"</th> <td>"+json.fixtures[i].homeTeamName+"</td> <td>"+json.fixtures[i].awayTeamName+"</td> <td>"+getScore(json.fixtures[i].result)+"</td> <td>"+json.fixtures[i].date.substring(0, 10)+"</td>  </tr>");
    }
}

function getScore(result) {
    if(result.goalsHomeTeam != null){
        return result.goalsHomeTeam+" - " +result.goalsAwayTeam;
    }
    else {
        return 'Brak danych';
    }

}

function load() {
    var clubs = localStorage.getItem("clubs");
    var contextClub = localStorage.context;
    console.log(clubs);

    var clubArr = clubs.split(",");

    for (i in clubArr) {
        if (clubArr[i] == contextClub) {
            console.log("znaleziono");
            clubInfo = JSON.parse(localStorage.getItem(clubArr[i]));
            $.ajaxSetup({
                headers: {
                    'X-Auth-Token': '1b5d1d20547d4465b88db35bbaba25bf',
                }

            });
            $.getJSON(clubInfo.calendar, function (json) {
                loadSchedule(json);
            });
        }

    }
}