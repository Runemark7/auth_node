
// skapa lyssnare för loginknapp

const  loginButton = document.getElementById("login");
loginButton.addEventListener("click", login);



// funktion för att skicka inloggningsppgifter till servern
function login(){

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let user = {};
        user.email = email;
        user.password = password;

    // skicka användaruppgifter till servern AJAX
    const req = new XMLHttpRequest(); // ajax objekt

    req.open("POST", "/login", true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; chartset=UTF-8');
    req.send("user=" + JSON.stringify(user));



}