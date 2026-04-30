// if user is not logged in, send them to login first
// we save where they were trying to go so we can redirect after login
var isLoggedIn = localStorage.getItem("isLoggedIn");
var userName = localStorage.getItem("userName");

if(isLoggedIn != "true"){
    localStorage.setItem("redirectTo", "report-lost.html");
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


// logout opens the popup
var logoutBtn = document.getElementById("logout-btn");
if(logoutBtn){
    logoutBtn.addEventListener("click", function(){
        document.getElementById("logout-modal").style.display = "flex";
    });
}

// confirm logout
document.getElementById("confirm-logout-btn").onclick = function(){
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    window.location.href = "index.html";
};

// cancel logout
document.getElementById("cancel-logout-btn").onclick = function(){
    document.getElementById("logout-modal").style.display = "none";
};

// clicking outside the logout box also closes it
document.getElementById("logout-modal").onclick = function(e){
    if(e.target == document.getElementById("logout-modal")){
        document.getElementById("logout-modal").style.display = "none";
    }
};

// navbar shadow when user scrolls
var navbar = document.getElementById("navbar");
window.addEventListener("scroll", function(){
    if(window.scrollY > 10){
        navbar.style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)";
    } else {
        navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.25)";
    }
});



// ---- image upload for the lost form ----

var uploadArea = document.getElementById("upload-area-lost");
var fileInput = document.getElementById("photo-upload-lost");
var uploadTrigger = document.getElementById("upload-trigger-lost");
var placeholder = document.getElementById("upload-placeholder-lost");
var previewWrap = document.getElementById("image-preview-lost");
var previewImg = document.getElementById("preview-img-lost");
var removeBtn = document.getElementById("remove-img-lost");

// clicking the "click to browse" text opens file picker
uploadTrigger.addEventListener("click", function(){
    fileInput.click();
});

// also clicking anywhere on the upload area opens file picker
uploadArea.addEventListener("click", function(){
    if(previewWrap.style.display == "none"){
        fileInput.click();
    }
});

// when a file is picked, show the preview
fileInput.addEventListener("change", function(){
    var file = fileInput.files[0];
    if(file){
        showImagePreview(file);
    }
});

// drag and drop - user drags a file over the area
uploadArea.addEventListener("dragover", function(e){
    e.preventDefault();
    uploadArea.classList.add("drag-over");
});

uploadArea.addEventListener("dragleave", function(){
    uploadArea.classList.remove("drag-over");
});

// file dropped - handle it
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

// show the preview image and hide the placeholder
function showImagePreview(file){
    // check size - don't allow more than 5MB
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

// remove button clears the image
removeBtn.addEventListener("click", function(e){
    e.stopPropagation();
    fileInput.value = "";
    previewImg.src = "";
    previewWrap.style.display = "none";
    placeholder.style.display = "flex";
});

// ---- form validation and submit ----

var submitBtn = document.getElementById("submit-lost-btn");

submitBtn.addEventListener("click", function(){

    // read all the values
    var itemName = document.getElementById("item-name").value.trim();
    var category = document.getElementById("item-category").value;
    var description = document.getElementById("item-desc").value.trim();
    var location = document.getElementById("last-location").value;
    var dateLost = document.getElementById("date-lost").value;

    // check all required fields
    if(itemName == ""){
        alert("Please enter the item name.");
        document.getElementById("item-name").focus();
        return;
    }

    if(category == ""){
        alert("Please select a category.");
        document.getElementById("item-category").focus();
        return;
    }

    if(description == ""){
        alert("Please add a description for the item.");
        document.getElementById("item-desc").focus();
        return;
    }

    if(description.length < 15){
        alert("Description is too short. Add more detail so others can identify the item.");
        document.getElementById("item-desc").focus();
        return;
    }

    if(location == ""){
        alert("Please select where you last saw the item.");
        document.getElementById("last-location").focus();
        return;
    }

    if(dateLost == ""){
        alert("Please select the date when you lost the item.");
        document.getElementById("date-lost").focus();
        return;
    }

    // all checks passed - build the report object
    // in the real version, this would be sent to the backend
    var report = {
        type: "lost",
        itemName: itemName,
        category: category,
        description: description,
        location: location,
        
        dateLost: dateLost,
        reportedBy: userName,
        reportedAt: new Date().toISOString()
    };

    
    console.log("Lost report submitted:", report);

    // show the success popup
    document.getElementById("success-modal").style.display = "flex";
});

// success popup buttons
document.getElementById("go-dashboard-btn").onclick = function(){
    window.location.href = "dashboard.html";
};

document.getElementById("go-browse-btn").onclick = function(){
    window.location.href = "browseitem.html";
};