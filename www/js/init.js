function init() {
    //TODO
    //przyklad odczytu localstorage
    var uid = localStorage.getItem("UID");
    var name = localStorage.getItem("name");
    var clubs = localStorage.getItem("clubs");
    var clubsNames = [];

    console.log(uid);
    console.log(name);
    console.log(clubs);
    //real_madryt,as_roma,arsenal
    //odczyt klubow
    var clubArr = clubs.split(",");

    for (i in clubArr) {
        console.log(clubArr[i]);
        console.log(localStorage.getItem(clubArr[i]));
        clubInfo = JSON.parse(localStorage.getItem(clubArr[i]));

        clubsNames.push(clubInfo.name);
        console.log(clubInfo.name);
    }
    console.log(clubsNames);
    loadNews(clubsNames)
}