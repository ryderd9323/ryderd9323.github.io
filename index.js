const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

const startSearchbar = document.querySelector(".startSearchbar");
const endSearchbar = document.querySelector(".endSearchbar");
const startSearchbox = document.querySelector(".startSearchbox input");
const endSearchbox = document.querySelector(".endSearchbox input");
const startOptionsContainer = document.getElementById("start-container");
const endOptionsContainer = document.getElementById("end-container");

const startOptionsList = startOptionsContainer.querySelectorAll(".option");
const endOptionsList = endOptionsContainer.querySelectorAll(".option");

var startDestination;
var endDestination;

// Get image filepath once start and end destination are set
// If it exists, display it
function displayRoute() {
  var routePath;
  // Route files are structured alphabetically
  if(startDestination < endDestination) {
    routePath = "images/routes/" + startDestination + "-" + endDestination + ".png";
  }
  else {
    routePath = "images/routes/" + endDestination + "-" + startDestination + ".png";
  }

  var route = document.getElementById("route");
  route.hidden = false;
  // Display if image exists, hide if not
  route.src = routePath;
  route.onerror = () => {
      route.hidden = true;
  }
}

// Search box filter functionality
function filterList(searchTerm, optionsList) {
  searchTerm = searchTerm.toLowerCase();
  optionsList.forEach(option => {
    let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
    if(label.indexOf(searchTerm) != -1) {
      option.style.display = "block";
    }
    else {
      option.style.display = "none";
    }
  }); 
}

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";

    document.getElementById("closeIcon").style.opacity = "0";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";

    document.getElementById("closeIcon").style.opacity = "1";
  }
}

hamburger.addEventListener("click", toggleMenu);

menuItems.forEach( 
  function(menuItem) { 
    menuItem.addEventListener("click", toggleMenu);
  }
)

// Toggle active (opened) state, untoggle (close) end search menu
startSearchbar.addEventListener("click", () => {
  startOptionsContainer.classList.toggle("active");
  endOptionsContainer.classList.remove("active");

  startSearchbox.value = "";
  filterList("", startOptionsList);

  // Focus search text box when user opens the menu
  if(startOptionsContainer.classList.contains("active")) {
    startSearchbox.focus();
  }
});

// Toggle active (opened) state, untoggle (close) start search menu
endSearchbar.addEventListener("click", () => {
  endOptionsContainer.classList.toggle("active");
  startOptionsContainer.classList.remove("active");

  endSearchbox.value = "";
  filterList("", endOptionsList);

  // Focus search text box when user opens the menu
  if(endOptionsContainer.classList.contains("active")) {
    endSearchbox.focus();
  }
});

// Option selected on start search menu, replace its text with selected option and untoggle (close)
startOptionsList.forEach(s => {
  s.addEventListener("click", event => {
    startSearchbar.innerHTML = s.querySelector("label").innerHTML;
    startOptionsContainer.classList.remove("active");

    startDestination = s.querySelector("label").innerHTML.toLowerCase().replace(/\s/g, '');
    if(startDestination != null && endDestination != null) {
      console.log(startDestination + " and " + endDestination);
      displayRoute();
    }
  });
});

// Option selected on end search menu, replace its text with selected option and untoggle (close)
endOptionsList.forEach(e => {
  e.addEventListener("click", event => {
    endSearchbar.innerHTML = e.querySelector("label").innerHTML;
    endOptionsContainer.classList.remove("active");

    endDestination = e.querySelector("label").innerHTML.toLowerCase().replace(/\s/g, '');
    if(startDestination != null && endDestination != null) {
      console.log(startDestination + " and " + endDestination);
      displayRoute();
    }
  });
});

// Filter list when user types in start search box
startSearchbox.addEventListener("keyup", function(e) {
  filterList(e.target.value, startOptionsList);
});

// Filter list when user types in end search box
endSearchbox.addEventListener("keyup", function(e) {
  filterList(e.target.value, endOptionsList);
});