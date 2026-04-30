
// if user is already logged in just send them to dashboard
var checkLogin = localStorage.getItem("isLoggedIn");
if(checkLogin == "true"){
    window.location.href = "dashboard.html";
}

// check if user came from signup button
if(window.location.hash == "#signup"){
    document.getElementById("signup-section").style.display = "block";
    document.getElementById("login-section").style.display = "none";
    // navbar button also change
    document.getElementById("nav-signup-btn").style.display = "none";
    document.getElementById("nav-login-btn").style.display = "block";
}

// when user clicks sign up in navbar
document.getElementById("nav-signup-btn").onclick = function(){
    document.getElementById("signup-section").style.display = "block";
    document.getElementById("login-section").style.display = "none";
    document.getElementById("nav-signup-btn").style.display = "none";
    document.getElementById("nav-login-btn").style.display = "block";
}

// when user clicks login in navbar
document.getElementById("nav-login-btn").onclick = function(){
    document.getElementById("login-section").style.display = "block";
    document.getElementById("signup-section").style.display = "none";
    document.getElementById("nav-login-btn").style.display = "none";
    document.getElementById("nav-signup-btn").style.display = "block";
}

// open signup link inside login form
let goToSignup = document.getElementById("open-signup");
goToSignup.addEventListener("click", function(){
    document.getElementById("signup-section").style.display = "block";
    document.getElementById("login-section").style.display = "none";
    // navbar also toggles
    document.getElementById("nav-signup-btn").style.display = "none";
    document.getElementById("nav-login-btn").style.display = "block";
});
 
// open login link inside signup form
let goToLogin = document.getElementById("open-login");
goToLogin.addEventListener("click", function(){
    document.getElementById("login-section").style.display = "block";
    document.getElementById("signup-section").style.display = "none";
    // navbar also toggles
    document.getElementById("nav-login-btn").style.display = "none";
    document.getElementById("nav-signup-btn").style.display = "block";
});
 
// login button
let loginBtn = document.getElementById("login-button");
loginBtn.addEventListener("click", function(){
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;
 
    if (email=="" && password==""){
        alert("please enter your details!");
    } else if(email==""){
        alert("please enter your email!");
    } else if(password==""){
        alert("please enter your password!");
    } else {
       
       localStorage.setItem("isLoggedIn", "true");
       localStorage.setItem("userName", "Akanksha");

       // check if user was going somewhere before login
       var goTo = localStorage.getItem("redirectTo");

       if(goTo != null){
           // clear the saved page
           localStorage.removeItem("redirectTo");
           // send them to where they wanted to go
           window.location.href = goTo;
       } else {
           // no saved page, just go to dashboard
           window.location.href = "dashboard.html";
           }
    }
});
 
 // signup button logic
let signupBtn = document.getElementById("signup-button");
signupBtn.addEventListener("click", function(){
    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;
    // get the value from the new confirm box
    let confirmPass = document.getElementById("signup-confirm").value;
 
    if(name == "" || email =="" || password==""){
        alert("Please fill in all fields!");
    } else if(password !== confirmPass){
        // check if passwords match
        alert("Passwords do not match! Please check again.");
    } else {
        alert("Account created successfully! Please login.");
        // switch back to login view
        document.getElementById("signup-section").style.display = "none";
        document.getElementById("login-section").style.display = "block";
        document.getElementById("nav-login-btn").style.display = "none";
        document.getElementById("nav-signup-btn").style.display = "block";
    }
});

// forgot password part
let forgotLink = document.getElementById("forgot-password");

forgotLink.addEventListener("click", function(e) {
    e.preventDefault(); // stop page from jumping
    
    let emailBox = prompt("Enter email for reset:");

    // simple beginner check
    if (emailBox == "") {
        alert("You didn't type anything!");
    } 
    else if (emailBox) {
        alert("Reset link sent to " + emailBox);
    }
    // if they hit cancel, nothing happens (very beginner style)
});