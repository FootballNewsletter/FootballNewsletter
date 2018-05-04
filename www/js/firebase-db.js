var loginUser;

//

//logowanie email tymczasowow bez parametrow z formularza
function loginEmail() {
    var email = document.getElementById("emailLogin").value;
    var passwd = document.getElementById("passwdLogin").value;

    user = firebase.auth().signInWithEmailAndPassword(email, passwd).catch(function(error) {
        //wyswietlenie bledu nad formularzem logowania
        //code = auth/invalid-email - niepoprawny format maila
        //code = auth/wrong-passwordl - bledne haslo

        //testowo
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("message").innerHTML = errorMessage;
        console.log(errorCode);
        console.log(errorMessage);
    });

    user.then(function(user) {
        if (typeof user.uid === "undefined") {
            document.getElementById("message").innerHTML = "logowanie niepoprawne";
            console.log("logowanie niepoprawne");
        } else {
            console.log("ok");
            login(user);
        }
    });
}

//rejesrtacja email/passwd
function registerEmail() {
    var email = document.getElementById("email").value;
    var passwd = document.getElementById("passwd").value;

    user = firebase.auth().createUserWithEmailAndPassword(email, passwd).catch(function(error) {
        //wyswietlenie bledu nad formularzem logowania
        //code = auth/invalid-email - niepoprawny format maila
        //code = auth/wrong-passwordl - bledne haslo

        //testowo
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("message").innerHTML = errorMessage;
    });

    user.then(function(user) {
        if (typeof user === "undefined") {
            console.log("logowanie niepoprawne")
        } else {
            document.getElementById("message").innerHTML ='Użytkownik został zarejesrtowany';
        }
    });

}

//funkcja po onclick logowanie google
function loginGoogle() {
    console.log('google');
    firebase.auth().onAuthStateChanged( function(user){
        if(user) {
            //poprawne logowanie
            login(user);
        } else {
            var provider = new  firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        }
    });
}

//przekieowanie do strony glownej po zalogowaniu
//dodanie sprawdzanai czy istnieje uzytkownik czy pierwsze logowanie
//jesli pierwsze logowanie usera do realtime db i okno z wyborem klubów
// jesli kolejne odczytanie preferencji
function login(user) {
    console.log("login");
    if(user) {
        return firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
            var username = (snapshot.val() && snapshot.val().name) || -1;

            localStorage.UID = user.uid;
            localStorage.name = user.displayName || user.email;

            console.log(user);

            if(username === -1) {
                window.location.href = 'newuser.html';
            } else {
                localStorage.clubs = snapshot.val().clubs;
                setClubsToStorage();
                window.location.href = 'welcome.html';
            }

        });

    }
}

function logout() {
    console.log("logout");
    firebase.auth().signOut().then(function() {
        //TO DO:
        //przekierowanie do panelu logowania
        loginUser = null;
        document.getElementById("message").innerHTML = "Wylogowano";
    }).catch(function(error) {
        console.log(error);
    });
}

function createUser(uid, name) {

    var userInfo = {
        name: name,
        clubs: 'empty'
    };

    firebase.database().ref().child('users/'+uid).set(userInfo);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCurio() {
    console.log("curio");

    var lc_clubs = localStorage.getItem("clubs");
    var clubs = lc_clubs.split(",");
    var clubIndex = getRandomInt(0,clubs.length-1);
    var clubUID = clubs[clubIndex];

    firebase.database().ref('/clubs/' + clubUID +'/curiosity').once('value').then(function(snapshot) {
        var curios = snapshot.val();
        var curioIndex = getRandomInt(0,curios.length-1);
        document.getElementById("curio").innerHTML = curios[curioIndex];
    });

}

function setPref(arr) {
    var updates = {};
    updates['/users/' + localStorage.getItem("UID") + '/clubs'] = arr;

    firebase.database().ref().update(updates);
}

function getClubs() {
    console.log("clubs");

    firebase.database().ref('/clubs').once('value').then(function(snapshot) {
        var clubs = snapshot.val();

        for(var i in clubs){
            var key = i;
            var name = clubs[i].name;

            //TO DO: sposob na wyswietlenie tego na stonie:
            // key - unilakny klucz do zapisu w bazie
            // name - nazwa klubu tylko do wyswietlenia na froncie
            console.log(key);
            console.log(name);
        }

    });
}

function setClubsToStorage() {
    var clubs = localStorage.clubs.split(',');

    firebase.database().ref('/clubs').once('value').then(function(snapshot) {
        var info = snapshot.val();

        for(var i in clubs) {
            var clubInfo = {
                name: info[clubs[i]].name,
                calendar: info[clubs[i]].calendar,
                table: info[clubs[i]].table,
                team: info[clubs[i]].team,
            };
            //console.log(clubs[i]);
            //console.log(clubInfo);
            //console.log(JSON.stringify(clubInfo));

            localStorage.setItem(clubs[i], JSON.stringify(clubInfo));
        }

    });

}