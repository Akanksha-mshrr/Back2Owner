var items = [
    { id: "1", badge: "LOST", title: "Black Wallet", category: "Accessories", location: "Near Central Library Gate", date: "Today", postedBy: "Anonymous User", img: "wallet.jpeg", description: "A black leather wallet was lost near the Central Library Gate. Contains cash, student ID, and a debit card." },
    { id: "2", badge: "FOUND", title: "Black Headphones", category: "Electronics", location: "Near Main Street", date: "Yesterday", postedBy: "Anonymous User", img: "headphone.jpeg", description: "A pair of black headphones found near Main Street. In good condition." },
    { id: "3", badge: "LOST", title: "Blue Backpack", category: "Clothing & Bags", location: "Near Cafeteria", date: "13 June 2026", postedBy: "Anonymous User", img: "backpack.png", description: "A blue backpack lost near the cafeteria. Contains notebooks and a charger." },
    { id: "4", badge: "FOUND", title: "Apple EarPods", img: "earpods.jpeg", category: "Electronics", location: "Gymkhana Area", date: "12 June 2026", postedBy: "Anonymous User", description: "Apple EarPods found at Gymkhana Area. In working condition." },
    { id: "5", badge: "LOST", title: "Red Water Bottle", img: "water-bottle.png", category: "Other", location: "Boys Hostel Mess", date: "26 April 2026", postedBy: "Anonymous User", description: "A red water bottle lost in Boys Hostel Mess." },
    { id: "6", badge: "FOUND", title: "Student ID Card", img: "id-card.png", category: "ID & Documents", location: "Lecture Hall Block A", date: "Today", postedBy: "Anonymous User", description: "A student ID card found in Lecture Hall Block A." },
    { id: "7", badge: "LOST", title: "Badminton Rackets", img: "rackets.png", category: "Other", location: "Gymkhana Area", date: "10 June 2026", postedBy: "Anonymous User", description: "Badminton rackets lost near Gymkhana Area." },
    { id: "8", badge: "FOUND", title: "Sports Watch", img: "sportswatch.png", category: "Accessories", location: "Sports Ground", date: "11 June 2026", postedBy: "Anonymous User", description: "A sports watch found at the Sports Ground." },
    { id: "9", badge: "LOST", title: "Scientific Calculator", img: "scientific-calc.png", category: "Stationery", location: "Lecture Hall Block B", date: "Today", postedBy: "Anonymous User", description: "A scientific calculator lost in Lecture Hall Block B." },
    { id: "10", badge: "FOUND", title: "Blue Jacket", img: "blue-jacket.png", category: "Clothing & Bags", location: "Girls Hostel Common Room", date: "5 June 2026", postedBy: "Anonymous User", description: "A blue jacket found in Girls Hostel Common Room." },
    { id: "11", badge: "LOST", title: "Exam Notebook", img: "notebook.png", category: "Stationery", location: "Reading Room, Library", date: "9 June 2026", postedBy: "Anonymous User", description: "An exam notebook lost in the Library Reading Room." },
    { id: "12", badge: "FOUND", title: "Spectacles", img: "specs.png", category: "Accessories", location: "Cafeteria Table", date: "Today", postedBy: "Anonymous User", description: "A pair of spectacles found on a Cafeteria table." },
];

var params = new URLSearchParams(window.location.search);
var itemId = params.get("id");
var item = null;

for(var i = 0; i < items.length; i++){
    if(items[i].id == itemId){
        item = items[i];
    }
}

if(item != null){
    document.getElementById("detail-title").textContent = item.title;
    document.getElementById("detail-img").src = item.img;
    document.getElementById("detail-img").alt = item.title;
    document.getElementById("detail-description").textContent = item.description;
    document.getElementById("detail-badge").textContent = item.badge;

    // update badge color
    if(item.badge == "LOST"){
        document.getElementById("detail-badge").className = "badge lost-badge";
    } else {
        document.getElementById("detail-badge").className = "badge found-badge";
    }

    // fill the meta rows - grab by index since they don't have IDs
    var metaRows = document.querySelectorAll(".meta-row span");
    metaRows[0].innerHTML = "<strong>Category:</strong> " + item.category;
    metaRows[1].innerHTML = "<strong>Location:</strong> " + item.location;
    metaRows[2].innerHTML = "<strong>Date Reported:</strong> " + item.date;
    metaRows[3].innerHTML = "<strong>Posted By:</strong> " + item.postedBy;
}


// check if the user is logged in
var isLoggedIn = localStorage.getItem("isLoggedIn");
var userName = localStorage.getItem("userName");

// if logged in show dashboard/logout, hide login/signup
if(isLoggedIn == "true"){
    document.getElementById("nav-right-logout").style.display = "none";
    document.getElementById("nav-right-login").style.display = "flex";
    document.getElementById("nav-username").innerText = "Hi, " + userName;
}

// login button
var loginBtn = document.getElementById("login-btn");
if(loginBtn){
    loginBtn.addEventListener("click", function(){
        window.location.href = "login-signup.html";
    });
}

// signup button
var signupBtn = document.getElementById("signup-btn");
if(signupBtn){
    signupBtn.addEventListener("click", function(){
        window.location.href = "login-signup.html#signup";
    });
}

// dashboard button
var dashBtn = document.getElementById("dashboard-btn");
if(dashBtn){
    dashBtn.addEventListener("click", function(){
        window.location.href = "dashboard.html";
    });
}

// logout button opens the popup
var logoutBtn = document.getElementById("logout-btn");
if(logoutBtn){
    logoutBtn.addEventListener("click", function(){
        document.getElementById("logout-modal").style.display = "flex";
    });
}

// yes logout - clear storage and go home
document.getElementById("confirm-logout-btn").onclick = function(){
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    window.location.href = "index.html";
};

// cancel - just close the popup
document.getElementById("cancel-logout-btn").onclick = function(){
    document.getElementById("logout-modal").style.display = "none";
};

// clicking outside the popup box also closes it
document.getElementById("logout-modal").onclick = function(e){
    if(e.target == document.getElementById("logout-modal")){
        document.getElementById("logout-modal").style.display = "none";
    }
};



// button text change based on lost or found

var detailBadge = document.getElementById("detail-badge");
var mainBtn = document.getElementById("main-action-btn");

if(detailBadge.textContent.trim() == "LOST"){
    mainBtn.innerHTML = '<i class="fa-solid fa-handshake"></i> I Found This Item!';
    document.getElementById("chat-btn").innerHTML = '<i class="fa-solid fa-comments"></i> Chat with Owner';
} else {
    mainBtn.innerHTML = '<i class="fa-solid fa-flag"></i> This is My Item!';
    document.getElementById("chat-btn").innerHTML = '<i class="fa-solid fa-comments"></i> Chat with Finder';
}

console.log("badge type: " + detailBadge.textContent.trim());


document.getElementById("main-action-btn").onclick = function(){
    document.getElementById("modal-overlay").style.display = "flex";
}


// cancel button closes the modal

document.getElementById("modal-cancel-btn").onclick = function(){
    document.getElementById("modal-overlay").style.display = "none";
    document.getElementById("modal-name").value = "";
    document.getElementById("modal-contact").value = "";
    document.getElementById("modal-message").value = "";
}


// close modal if user clicks outside

document.getElementById("modal-overlay").onclick = function(e){
    if(e.target == document.getElementById("modal-overlay")){
        document.getElementById("modal-overlay").style.display = "none";
        document.getElementById("modal-name").value = "";
        document.getElementById("modal-contact").value = "";
        document.getElementById("modal-message").value = "";
    }
}


// submit button inside modal

document.getElementById("modal-submit-btn").onclick = function(){
    var name = document.getElementById("modal-name").value;
    var contact = document.getElementById("modal-contact").value;

    if(name == ""){
        alert("Please enter your name!");
    } else if(contact == ""){
        alert("Please enter your email or phone number!");
    } else {
        document.getElementById("modal-overlay").style.display = "none";
        alert("Notification sent! The reporter will contact you soon.");
        document.getElementById("modal-name").value = "";
        document.getElementById("modal-contact").value = "";
        document.getElementById("modal-message").value = "";
    }
}
// share button
document.getElementById("share-btn").onclick = function(){
    navigator.clipboard.writeText(window.location.href).then(function(){
        alert("Link copied to clipboard!");
    }).catch(function(){
        alert("Share this link: " + window.location.href);
    });
}
document.getElementById("chat-btn").onclick = function(){
    alert("Chat feature coming soon!");
}

// clicking view details button takes to detail page
var viewBtns = document.querySelectorAll(".view-btn");

for(var i = 0; i < viewBtns.length; i++){
    viewBtns[i].onclick = function(){
        window.location.href = "item-detail.html";
    }
}


