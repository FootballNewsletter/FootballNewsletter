function savePreferences() {
    var arr = [];
    if (document.getElementById('real_madryt').checked) {
        arr.push('real_madryt');
        console.log("real");

    }
    if(document.getElementById('as_roma').checked) {
        arr.push('as_roma');
        console.log("roma");
    }
    if(document.getElementById('arsenal').checked) {
        arr.push('arsenal');
        console.log("arsenal");
    }
    setPref(arr);
    document.getElementById('redirect').style.visibility='visible';
}

function loadPreferences() {

    var clubs = localStorage.clubs.split(',');

    for(var i in clubs){
        console.log(clubs[i]);
        document.getElementById(clubs[i]).checked = true;
    }
}

function redirectToNews() {
    window.location.href = 'welcomeJarka.html';
}