function loadTeamRealMadryt() {
    $.ajaxSetup({
        headers: {
            'X-Auth-Token': '1b5d1d20547d4465b88db35bbaba25bf',
        }

    });

    $.getJSON('http://api.football-data.org/v1/teams/86/players', function(json) {
        loadTeam(json);
    });
}

function loadTeamArsenal() {
    $.ajaxSetup({
        headers: {
            'X-Auth-Token': '1b5d1d20547d4465b88db35bbaba25bf',
        }

    });

    $.getJSON('http://api.football-data.org/v1/teams/57/players', function(json) {
        loadTeam(json);
    });
}

function loadTeamRoma() {
    $.ajaxSetup({
        headers: {
            'X-Auth-Token': '1b5d1d20547d4465b88db35bbaba25bf',
        }

    });

    $.getJSON('http://api.football-data.org/v1/teams/100/players', function(json) {
        loadTeam(json);
    });
}

function loadTeam(json) {
    console.log(json.players);
    for (var i in json.players) {
        $("#results").append(" <tr> <th scope=\"row\">"+i+"</th> <td>"+json.players[i].name+"</td> <td>"+json.players[i].position+"</td> <td>"+json.players[i].jerseyNumber+"</td> <td>"+json.players[i].dateOfBirth+"</td>  <td>"+json.players[i].nationality+"</td>  <td>"+json.players[i].contractUntil+"</td>  </tr>");
    }
}