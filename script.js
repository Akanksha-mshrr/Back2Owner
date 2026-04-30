// check if user is logged in and update navbar
var isLoggedIn = localStorage.getItem("isLoggedIn");
var userName = localStorage.getItem("userName");

if(isLoggedIn == "true"){
    // hide login/signup buttons
    document.getElementById("nav-right-logout").style.display = "none";
    // show dashboard and logout buttons
    document.getElementById("nav-right-login").style.display = "flex";
    // show the user's name
    document.getElementById("nav-username").innerText = "Hi, " + userName;
}
// login button - only runs if user is not logged in
var loginButton = document.getElementById("login-btn");
if(loginButton){
    loginButton.addEventListener("click", function(){
        window.location.href = "login-signup.html";
    });
}

// signup button
var signupButton = document.getElementById("signup-btn");
if(signupButton){
    signupButton.addEventListener("click", function(){
        window.location.href = "login-signup.html#signup";
    });
}

// dashboard button - for logged in users
var dashBtn = document.getElementById("dashboard-btn");
if(dashBtn){
    dashBtn.addEventListener("click", function(){
        window.location.href = "dashboard.html";
    });
}

// logout button - opens the popup
var logoutBtn = document.getElementById("logout-btn");
if(logoutBtn){
    logoutBtn.addEventListener("click", function(){
        document.getElementById("logout-modal").style.display = "flex";
    });
}

// yes logout button inside popup
document.getElementById("confirm-logout-btn").onclick = function(){
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    window.location.href = "index.html";
}

// cancel button inside popup
document.getElementById("cancel-logout-btn").onclick = function(){
    document.getElementById("logout-modal").style.display = "none";
}

// click outside the box to close popup
document.getElementById("logout-modal").onclick = function(e){
    if(e.target == document.getElementById("logout-modal")){
        document.getElementById("logout-modal").style.display = "none";
    }
}


// report lost button
var lostButton = document.getElementById("lost");
lostButton.addEventListener("click", function(){
    // check if logged in
    if(localStorage.getItem("isLoggedIn") == "true"){
        window.location.href = "report-lost.html";
    } else {
        // save where user was trying to go
        localStorage.setItem("redirectTo", "report-lost.html");
        // send them to login first
        window.location.href = "login-signup.html";
    }
});

// report found button
var foundButton = document.getElementById("found");
foundButton.addEventListener("click", function(){
    if(localStorage.getItem("isLoggedIn") == "true"){
        window.location.href = "report-found.html";
    } else {
        localStorage.setItem("redirectTo", "report-found.html");
        window.location.href = "login-signup.html";
    }
});



// browse items button
let browseButton = document.getElementById("browse");
browseButton.addEventListener("click", function(){
    window.location.href = "browseitem.html";
});


// search bar
// when user searches it goes to browse page with the search word in the url
// on the browse page we can read that url and filter items

let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function(){
    let value = searchInput.value.trim();
    if(value == ""){
        alert("Please type something to search!");
    } else {
        window.location.href = "browseitem.html?search=" + value;
    }
});

// also search when user presses enter key
searchInput.addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        let value = searchInput.value.trim();
        if(value == ""){
            alert("Please type something to search!");
        } else {
            window.location.href = "browseitem.html?search=" + value;
        }
    }
});

// quick search tags
function quickSearch(term){
    searchInput.value = term;
    window.location.href = "browseitem.html?search=" + term;
}


// view details buttons - each one separately

let viewBtn1 = document.getElementById("viewBtn1");
viewBtn1.addEventListener("click", function(){
    window.location.href = "browseitem.html?search=Black Wallet";
});

let viewBtn2 = document.getElementById("viewBtn2");
viewBtn2.addEventListener("click", function(){
    window.location.href = "browseitem.html?search=Headphones";
});

let viewBtn3 = document.getElementById("viewBtn3");
viewBtn3.addEventListener("click", function(){
    window.location.href = "browseitem.html?search=Blue Backpack";
});

let viewBtn4 = document.getElementById("viewBtn4");
viewBtn4.addEventListener("click", function(){
    window.location.href = "browseitem.html?search=Apple EarPods";
});

let viewBtn5 = document.getElementById("viewBtn5");
viewBtn5.addEventListener("click", function(){
    window.location.href = "browseitem.html?search=Red Water Bottle";
});


// browse all button
let browseAllBtn = document.getElementById("browse-all-btn");
browseAllBtn.addEventListener("click", function(){
    window.location.href = "browseitem.html";
});


// step hover effects

let step1 = document.getElementById("step-1");
step1.addEventListener("mouseover", function(){
    step1.style.transform = "scale(1.05)";
});
step1.addEventListener("mouseout", function(){
    step1.style.transform = "scale(1)";
});

let step2 = document.getElementById("step-2");
step2.addEventListener("mouseover", function(){
    step2.style.transform = "scale(1.05)";
});
step2.addEventListener("mouseout", function(){
    step2.style.transform = "scale(1)";
});

let step3 = document.getElementById("step-3");
step3.addEventListener("mouseover", function(){
    step3.style.transform = "scale(1.05)";
});
step3.addEventListener("mouseout", function(){
    step3.style.transform = "scale(1)";
});


// navbar shadow on scroll

let navbar = document.getElementById("navbar");
window.addEventListener("scroll", function(){
    if(window.scrollY > 10){
        navbar.style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)";
    } else {
        navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.25)";
    }
});