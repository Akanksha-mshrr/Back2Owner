// check if the user is logged in
var isLoggedIn = localStorage.getItem("isLoggedIn");
var userName = localStorage.getItem("userName");

// if logged in show dashboard/logout, hide login/signup
if(isLoggedIn == "true"){
    document.getElementById("nav-right-logged-out").style.display = "none";
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


// grab all item cards
var allCards = document.querySelectorAll(".item-card");

// these store what filters are currently active
var activeType = "all";
var activeCategory = "all";
var activeLocation = "all";
var activeDate = "all";
var searchValue = "";


// lost / found / all toggle buttons
var toggleBtns = document.querySelectorAll(".toggle-btn");

toggleBtns.forEach(function(btn){
    btn.addEventListener("click", function(){

        // remove active from all buttons first
        toggleBtns.forEach(function(b){
            b.classList.remove("active");
        });

        // mark the clicked one as active
        btn.classList.add("active");
        activeType = btn.getAttribute("data-type");
        applyFilters();
    });
});


// category dropdown
var categoryFilter = document.getElementById("category-filter");
categoryFilter.addEventListener("change", function(){
    activeCategory = categoryFilter.value;
    applyFilters();
});


// location dropdown
var locationFilter = document.getElementById("location-filter");
locationFilter.addEventListener("change", function(){
    activeLocation = locationFilter.value;
    applyFilters();
});


// date dropdown
var dateFilter = document.getElementById("date-filter");
dateFilter.addEventListener("change", function(){
    activeDate = dateFilter.value;
    applyFilters();
});


// search button
var searchBtn = document.getElementById("search-btn");
var searchInput = document.getElementById("search-input");

searchBtn.addEventListener("click", function(){
    searchValue = searchInput.value.toLowerCase().trim();
    applyFilters();
});

// also run search when enter key is pressed
searchInput.addEventListener("keypress", function(e){
    if(e.key == "Enter"){
        searchValue = searchInput.value.toLowerCase().trim();
        applyFilters();
    }
});


// clear all filters and reset everything
function resetAllFilters(){
    activeType = "all";
    activeCategory = "all";
    activeLocation = "all";
    activeDate = "all";
    searchValue = "";

    searchInput.value = "";
    categoryFilter.value = "all";
    locationFilter.value = "all";
    dateFilter.value = "all";

    // reset the toggle buttons - make All active again
    toggleBtns.forEach(function(b){
        b.classList.remove("active");
    });
    document.querySelector(".toggle-btn[data-type='all']").classList.add("active");

    applyFilters();
}

document.getElementById("clear-filters-btn").addEventListener("click", function(){
    resetAllFilters();
});

document.getElementById("reset-btn").addEventListener("click", function(){
    resetAllFilters();
});


// main filter function - runs every time any filter changes
function applyFilters(){
    var visibleCount = 0;

    allCards.forEach(function(card){

        // read the card's data attributes
        var cardType = card.getAttribute("data-type");
        var cardCategory = card.getAttribute("data-category");
        var cardLocation = card.getAttribute("data-location");
        var cardDate = card.getAttribute("data-date");

        // read the card text for search
        var cardTitle = card.querySelector(".card-title").textContent.toLowerCase();
        var cardBody = card.querySelector(".card-body").textContent.toLowerCase();

        // check each filter one by one
        var typeOk = (activeType == "all") || (cardType == activeType);
        var categoryOk = (activeCategory == "all") || (cardCategory == activeCategory);
        var locationOk = (activeLocation == "all") || (cardLocation == activeLocation);

        // date check - each option includes older ones too
        var dateOk = true;
        if(activeDate == "today"){
            dateOk = (cardDate == "today");
        } else if(activeDate == "week"){
            dateOk = (cardDate == "today" || cardDate == "week");
        } else if(activeDate == "month"){
            dateOk = (cardDate == "today" || cardDate == "week" || cardDate == "month");
        }

        // search check - look in title and full card text
        var searchOk = true;
        if(searchValue != ""){
            searchOk = (cardTitle.includes(searchValue) || cardBody.includes(searchValue));
        }

        // if all checks pass, show the card
        if(typeOk && categoryOk && locationOk && dateOk && searchOk){
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    // update the count text
    var countText = document.getElementById("results-count");
    if(visibleCount == 1){
        countText.textContent = "Showing 1 item";
    } else {
        countText.textContent = "Showing " + visibleCount + " items";
    }

    // show no-results message if nothing is visible
    if(visibleCount == 0){
        document.getElementById("no-results").style.display = "block";
        document.getElementById("items-grid").style.display = "none";
    } else {
        document.getElementById("no-results").style.display = "none";
        document.getElementById("items-grid").style.display = "flex";
    }
}


// clicking a card or its button goes to item detail page
allCards.forEach(function(card){

    card.addEventListener("click", function(){
        window.location.href = "item-detail.html?id=" + card.getAttribute("data-id");
    });

    // stop the button click from also triggering the card click
    var viewBtn = card.querySelector(".view-btn");
    viewBtn.addEventListener("click", function(e){
        e.stopPropagation();
        window.location.href = "item-detail.html?id=" + card.getAttribute("data-id");
    });
});