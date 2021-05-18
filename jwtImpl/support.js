
var currentUser = null;
var currentToken = null;

function signUp(userEmail, userPassword){

    let response = await fetch("https://rbds-attendance.herokuapp.com/user/signup", {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        }),
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    // Converting to JSON
    .then(response => response.json());
    
    console.log(response);

}

function login(userEmail, userPassword){
    let response = await fetch("https://rbds-attendance.herokuapp.com/user/login", {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        }),
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    // Converting to JSON
    .then(response => response.json());
    
    console.log(response);
}

function startSession(){
    const token = getToken(userEmail);
    let response = await fetch("https://rbds-attendance.herokuapp.com/attendance/startSession", {
        // Adding method type
        method: "POST",
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Barer ${token}`
        }
    })
    // Converting to JSON
    .then(response => response.json());
    
    console.log(response);
}

function endSession(){
    let response = await fetch("https://rbds-attendance.herokuapp.com/attendance/endSession", {
        // Adding method type
        method: "POST",
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Barer ${token}`
        }
    })
    // Converting to JSON
    .then(response => response.json());
    
    console.log(response);
}

function getToken(userEmail){

}

















