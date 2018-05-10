function loadTeam(json) {
    console.log(json.players);
    for (var i in json.players) {
        $("#results").append(" <tr> <th scope=\"row\">"+i+"</th> <td>"+json.players[i].name+"</td> <td>"+json.players[i].position+"</td> <td>"+json.players[i].jerseyNumber+"</td> <td>"+json.players[i].dateOfBirth+"</td>  <td>"+json.players[i].nationality+"</td>  <td>"+json.players[i].contractUntil+"</td>  </tr>");
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
            $.getJSON(clubInfo.team, function (json) {
                loadTeam(json);
            });
        }

    }
}