function loadClubs() {
    var clubs = localStorage.clubs.split(',');

    for(var i in clubs){
        console.log(clubs[i]);
        document.getElementById(clubs[i]).style.visibility='visible';
    }
}

function redirectChooseTeam(team_id){
    localStorage.context = team_id;
    window.location.href = localStorage.redirectEndpoint;
}