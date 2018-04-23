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
            var username = (snapshot.val() && snapshot.val().email) || -1;


            localStorage.UID = user.uid;
            localStorage.name = user.displayName || user.email;
            //console.log(user);

            if(username === -1) {
                window.location.href = 'newuser.html';
            } else {
                localStorage.clubs = snapshot.val().clubs;
                window.location.href = 'welcome.html';
            }

        });

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

function createUser(uid, name) {

    var userInfo = {
       name: name
    };

    // Get a key for a new Post.
    firebase.database().ref().child('users/'+uid).set(userInfo);

    // Write the new post's data simultaneously in the posts list and the user's post list.
    //var updates = {};
    //updates['/users/' + user.uid] = userInfo;

    //return firebase.database().ref().update(updates);
}