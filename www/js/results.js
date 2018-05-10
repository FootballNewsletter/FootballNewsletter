function loadResultsRealMadryt() {
    $.ajaxSetup({
        headers: {
            'X-Auth-Token': '1b5d1d20547d4465b88db35bbaba25bf',
        }

    });

    $.getJSON('https://api.football-data.org/v1/competitions/455/leagueTable', function(json) {
        loadResults(json);
    });
}

function loadResultsArsenal() {
    $.ajaxSetup({
        headers: {
            'X-Auth-Token': '1b5d1d20547d4465b88db35bbaba25bf',
        }

    });

    $.getJSON('http://api.football-data.org/v1/competitions/445/leagueTable', function(json) {
        loadResults(json);
    });
}

function loadResultsRoma() {
    $.ajaxSetup({
        headers: {
            'X-Auth-Token': '1b5d1d20547d4465b88db35bbaba25bf',
        }

    });

    $.getJSON('http://api.football-data.org/v1/competitions/456/leagueTable', function(json) {
        loadResults(json);
    });
}

function loadResults(json) {
    console.log(json.standing);
        for (var i in json.standing) {
                $("#results").append(" <tr> <th scope=\"row\">"+json.standing[i].position+"</th> <td>"+json.standing[i].teamName+"</td> <td>"+json.standing[i].playedGames+"</td> <td>"+json.standing[i].wins+"</td> <td>"+json.standing[i].draws+"</td> <td>"+json.standing[i].losses+"</td> <td>"+json.standing[i].goals+"</td> <td>"+json.standing[i].goalsAgainst+"</td>  <td>"+json.standing[i].goalDifference+"</td>  <td>"+json.standing[i].points+"</td>  </tr>");
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
            $.getJSON(clubInfo.table, function (json) {
                loadResults(json);
            });
        }

    }
}