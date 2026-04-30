if(localStorage.getItem("isLoggedIn") != "true"){
    window.location.href = "login-signup.html";
}

document.getElementById("matches-btn").onclick = function(){
    document.getElementById("match-alert").scrollIntoView({ behavior: "smooth" });
}
// filter tabs

var cards = document.querySelectorAll(".report-card");

document.getElementById("tab-all").onclick = function(){
    document.getElementById("tab-all").classList.add("active-tab");
    document.getElementById("tab-lost").classList.remove("active-tab");
    document.getElementById("tab-found").classList.remove("active-tab");

    for(var i = 0; i < cards.length; i++){
        cards[i].style.display = "flex";
    }
}

document.getElementById("tab-lost").onclick = function(){
    document.getElementById("tab-lost").classList.add("active-tab");
    document.getElementById("tab-all").classList.remove("active-tab");
    document.getElementById("tab-found").classList.remove("active-tab");

    for(var i = 0; i < cards.length; i++){
        if(cards[i].getAttribute("data-type") == "lost"){
            cards[i].style.display = "flex";
        } else {
            cards[i].style.display = "none";
        }
    }
}

document.getElementById("tab-found").onclick = function(){
    document.getElementById("tab-found").classList.add("active-tab");
    document.getElementById("tab-all").classList.remove("active-tab");
    document.getElementById("tab-lost").classList.remove("active-tab");

    for(var i = 0; i < cards.length; i++){
        if(cards[i].getAttribute("data-type") == "found"){
            cards[i].style.display = "flex";
        } else {
            cards[i].style.display = "none";
        }
    }
}


// delete button

function deleteReport(btn){
    var ans = confirm("Delete this report?");
    if(ans == true){
        btn.closest(".report-card").remove();
    }
}


// mark all notifications as read

document.getElementById("mark-read-btn").onclick = function(){
    var dots = document.querySelectorAll(".notif-dot");
    for(var i = 0; i < dots.length; i++){
        dots[i].classList.add("read-dot");
    }
    var unreads = document.querySelectorAll(".unread");
    for(var i = 0; i < unreads.length; i++){
        unreads[i].classList.remove("unread");
    }
    document.getElementById("bell-badge").style.display = "none";
}

// show the real user name in navbar
var savedName = localStorage.getItem("userName");
if(savedName != null){
    document.getElementById("user-name-nav").innerText = savedName;
    document.getElementById("user-avatar").innerText = savedName[0].toUpperCase();
    document.getElementById("profile-card-name").innerText = savedName;
    document.getElementById("profile-card-avatar").innerText = savedName[0].toUpperCase();
}



document.getElementById("confirm-logout-btn").onclick = function(){
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    window.location.href = "login-signup.html";
}

document.getElementById("cancel-logout-btn").onclick = function(){
    document.getElementById("logout-modal").style.display = "none";
}

document.getElementById("logout-modal").onclick = function(e){
    if(e.target == document.getElementById("logout-modal")){
        document.getElementById("logout-modal").style.display = "none";
    }
}
// hamburger toggle
document.getElementById("hamburger-btn").onclick = function(e){
    e.stopPropagation();
    var menu = document.getElementById("hamburger-menu");
    if(menu.style.display == "none"){
        menu.style.display = "block";
        document.getElementById("profile-dropdown").style.display = "none";
    } else {
        menu.style.display = "none";
    }
}

// profile dropdown toggle
document.getElementById("profile-trigger").onclick = function(e){
    e.stopPropagation();
    var drop = document.getElementById("profile-dropdown");
    if(drop.style.display == "none"){
        drop.style.display = "block";
        document.getElementById("hamburger-menu").style.display = "none";
    } else {
        drop.style.display = "none";
    }
}

// clicking anywhere outside closes both menus
document.onclick = function(){
    document.getElementById("hamburger-menu").style.display = "none";
    document.getElementById("profile-dropdown").style.display = "none";
}

// bell button scrolls to notifications section
document.getElementById("bell-btn").onclick = function(){
    document.getElementById("notifications-box").scrollIntoView({ behavior: "smooth" });
}

// contact us trigger from both hamburger and profile dropdown
document.getElementById("contact-trigger").onclick = function(e){
    e.preventDefault();
    document.getElementById("contact-modal").style.display = "flex";
    document.getElementById("profile-dropdown").style.display = "none";
}
document.getElementById("contact-trigger-ham").onclick = function(e){
    e.preventDefault();
    document.getElementById("contact-modal").style.display = "flex";
    document.getElementById("hamburger-menu").style.display = "none";
}

// logout is now inside profile dropdown
document.getElementById("logout-btn").onclick = function(e){
    e.preventDefault();
    document.getElementById("profile-dropdown").style.display = "none";
    document.getElementById("logout-modal").style.display = "flex";
}

// contact modal cancel
document.getElementById("contact-cancel-btn").onclick = function(){
    document.getElementById("contact-modal").style.display = "none";
}

// close if clicking outside
document.getElementById("contact-modal").onclick = function(e){
    if(e.target == document.getElementById("contact-modal")){
        document.getElementById("contact-modal").style.display = "none";
    }
}

// contact submit
document.getElementById("contact-submit-btn").onclick = function(){
    var name = document.getElementById("contact-name").value;
    var email = document.getElementById("contact-email").value;
    var subject = document.getElementById("contact-subject").value;
    var msg = document.getElementById("contact-message").value;

    if(subject == ""){
        alert("Please select a subject!");
    } else if(name == ""){
        alert("Please enter your name!");
    } else if(email == ""){
        alert("Please enter your email!");
    } else if(msg == ""){
        alert("Please write your message!");
    } else {
        document.getElementById("contact-modal").style.display = "none";
        alert("Message sent! Admin will respond within 24 hours.");
        document.getElementById("contact-name").value = "";
        document.getElementById("contact-email").value = "";
        document.getElementById("contact-message").value = "";
        document.getElementById("contact-subject").value = "";
    }
}

var unreadCount = document.querySelectorAll(".unread").length;
document.getElementById("bell-badge").innerText = unreadCount;

if(unreadCount == 0){
    document.getElementById("bell-badge").style.display = "none";
}
function markResolved(btn){
    var ans = confirm("Mark this item as resolved?");
    if(ans == true){
        var card = btn.closest(".report-card");
        var badge = card.querySelector(".status-badge");
        badge.className = "status-badge resolved-status";
        badge.innerText = "RESOLVED";
        card.classList.add("resolved-card");
        btn.remove();
    }
}

document.getElementById("tab-resolved").onclick = function(){
    document.getElementById("tab-resolved").classList.add("active-tab");
    document.getElementById("tab-all").classList.remove("active-tab");
    document.getElementById("tab-lost").classList.remove("active-tab");
    document.getElementById("tab-found").classList.remove("active-tab");

    for(var i = 0; i < cards.length; i++){
        var badge = cards[i].querySelector(".status-badge");
        if(badge.classList.contains("resolved-status")){
            cards[i].style.display = "flex";
        } else {
            cards[i].style.display = "none";
        }
    }
}