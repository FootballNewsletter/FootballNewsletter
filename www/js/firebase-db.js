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
            console.log("logowanie niepoprawne")
        } else {
            console.log("ok");
            login(user);
        }
    });
}

//rejesrtacja email/passwd
function registerEmail() {
    var email = document.getElementById("emailRegister").value;
    var passwd = document.getElementById("passwdRegister").value;

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
            login(user);
        }
    });

}

//funkcja po onclick logowanie google
function loginGoogle() {
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
        loginUser = user;
        localStorage.UID = loginUser.uid;
        //document.getElementById("message").innerHTML = localStorage.getItem("UID");
        window.location.href = '../welcome.html';
    }
}

function logout() {
    console.log("logout");
    firebase.auth().signOut().then(function() {
        //przekierowanie do panelu logowania
        loginUser = null;
        document.getElementById("message").innerHTML = "Wylogowano";
    }).catch(function(error) {
        console.log(error);
    });
}