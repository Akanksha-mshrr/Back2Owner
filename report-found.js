// same auth check as report-lost - must be logged in to report
var isLoggedIn = localStorage.getItem("isLoggedIn");
var userName = localStorage.getItem("userName");

if(isLoggedIn != "true"){
    localStorage.setItem("redirectTo", "report-found.html");
    window.location.href = "login-signup.html";
}

// user is always logged in here so just set the name directly
document.getElementById("nav-username").innerText = "Hi, " + userName;


// dashboard button
var dashBtn = document.getElementById("dashboard-btn");
if(dashBtn){
    dashBtn.addEventListener("click", function(){
        window.location.href = "dashboard.html";
    });
}


// logout popup
var logoutBtn = document.getElementById("logout-btn");
if(logoutBtn){
    logoutBtn.addEventListener("click", function(){
        document.getElementById("logout-modal").style.display = "flex";
    });
}

document.getElementById("confirm-logout-btn").onclick = function(){
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    window.location.href = "index.html";
};

document.getElementById("cancel-logout-btn").onclick = function(){
    document.getElementById("logout-modal").style.display = "none";
};

document.getElementById("logout-modal").onclick = function(e){
    if(e.target == document.getElementById("logout-modal")){
        document.getElementById("logout-modal").style.display = "none";
    }
};

// navbar scroll shadow
var navbar = document.getElementById("navbar");
window.addEventListener("scroll", function(){
    if(window.scrollY > 10){
        navbar.style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)";
    } else {
        navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.25)";
    }
});

// ---- image upload for found form ----

var uploadArea = document.getElementById("upload-area-found");
var fileInput = document.getElementById("photo-upload-found");
var uploadTrigger = document.getElementById("upload-trigger-found");
var placeholder = document.getElementById("upload-placeholder-found");
var previewWrap = document.getElementById("image-preview-found");
var previewImg = document.getElementById("preview-img-found");
var removeBtn = document.getElementById("remove-img-found");

uploadTrigger.addEventListener("click", function(){
    fileInput.click();
});

uploadArea.addEventListener("click", function(){
    if(previewWrap.style.display == "none"){
        fileInput.click();
    }
});

fileInput.addEventListener("change", function(){
    var file = fileInput.files[0];
    if(file){
        showImagePreview(file);
    }
});

// drag and drop
uploadArea.addEventListener("dragover", function(e){
    e.preventDefault();
    uploadArea.classList.add("drag-over");
});

uploadArea.addEventListener("dragleave", function(){
    uploadArea.classList.remove("drag-over");
});

uploadArea.addEventListener("drop", function(e){
    e.preventDefault();
    uploadArea.classList.remove("drag-over");
    var file = e.dataTransfer.files[0];
    if(file && file.type.startsWith("image/")){
        showImagePreview(file);
    } else {
        alert("Please drop an image file.");
    }
});

function showImagePreview(file){
    if(file.size > 5 * 1024 * 1024){
        alert("Image is too large. Please upload something under 5MB.");
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e){
        previewImg.src = e.target.result;
        placeholder.style.display = "none";
        previewWrap.style.display = "flex";
    };
    reader.readAsDataURL(file);
}

removeBtn.addEventListener("click", function(e){
    e.stopPropagation();
    fileInput.value = "";
    previewImg.src = "";
    previewWrap.style.display = "none";
    placeholder.style.display = "flex";
});

// ---- radio card selection highlight ----
// the CSS handles most of it but we also add/remove a class for styling flexibility

var radioOptions = document.querySelectorAll(".radio-option input[type='radio']");
radioOptions.forEach(function(radio){
    radio.addEventListener("change", function(){
        // remove selected state from all cards first
        document.querySelectorAll(".radio-card").forEach(function(card){
            card.classList.remove("selected-card");
        });
        // add to the one that was just clicked
        radio.nextElementSibling.classList.add("selected-card");
    });
});

// ---- form validation and submit ----

var submitBtn = document.getElementById("submit-found-btn");

submitBtn.addEventListener("click", function(){

    var itemName = document.getElementById("item-name").value.trim();
    var category = document.getElementById("item-category").value;
    var description = document.getElementById("item-desc").value.trim();
    var location = document.getElementById("found-location").value;
    var dateFound = document.getElementById("date-found").value;

    // check item status radio - which option is selected
    var itemStatus = "";
    var radioChecked = document.querySelector("input[name='item-status']:checked");
    if(radioChecked){
        itemStatus = radioChecked.value;
    }

    // validation - same approach as the lost form
    if(itemName == ""){
        alert("Please enter the item name.");
        document.getElementById("item-name").focus();
        return;
    }

    if(category == ""){
        alert("Please select a category.");
        return;
    }

    if(description == ""){
        alert("Please describe the item you found.");
        document.getElementById("item-desc").focus();
        return;
    }

    if(description.length < 15){
        alert("Description is too short. Add more detail so the owner can recognize it.");
        document.getElementById("item-desc").focus();
        return;
    }

    if(location == ""){
        alert("Please select where you found the item.");
        return;
    }

    if(dateFound == ""){
        alert("Please enter the date you found the item.");
        document.getElementById("date-found").focus();
        return;
    }

    if(itemStatus == ""){
        alert("Please tell us where the item is right now.");
        document.getElementById("item-status-group").scrollIntoView({ behavior: "smooth" });
        return;
    }
    
    var report = {
        type: "found",
        itemName: itemName,
        category: category,
        description: description,
        location: location,
        
        dateFound: dateFound,
        itemStatus: itemStatus,
        reportedBy: userName,
        reportedAt: new Date().toISOString()
    };

    console.log("Found report submitted:", report);

    // show success popup
    document.getElementById("success-modal").style.display = "flex";
});

// success popup buttons
document.getElementById("go-dashboard-btn").onclick = function(){
    window.location.href = "dashboard.html";
};

document.getElementById("go-browse-btn").onclick = function(){
    window.location.href = "browseitem.html";
};