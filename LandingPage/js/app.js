/*
Notes / TODO's
- Love the process!
- Smile :)
*/
console.log("Starting..");


// ######################## Build the nav links ###########################
// get nav container
const navContainer = document.getElementById('nav');
let pageSections = document.querySelectorAll('section'); // Number of sections
let sectionTitles = document.querySelectorAll('.section-title'); //Grab title name of sections

// For every section title, create a nav item with the name of that section title
for (let index = 0; index < pageSections.length; index++) {
  // create new list item for navigation
  const newListItem = document.createElement('li');
  newListItem.classList.add('nav-item');
  newListItem.id = "navItem" + index; // <li id="navItem0" class="nav-item"> </li>

  // Create new link
  const newAnchor = document.createElement('a');
  newAnchor.classList.add('link');
  newAnchor.classList.add('color-white'); // <a class="link color-white"> </a>
  newAnchor.textContent = sectionTitles[index].innerHTML; // <a class="link color-white"> Product </a>
  // Place <li> inside of <ul>
  navContainer.appendChild(newListItem);
  // Place <a> inside of <li>
  newListItem.appendChild(newAnchor);
}

// ######################## Find out which section is being hovered ###########################
//Grab all of sections

// For every section that there is...
for (let sectionIndex = 0; sectionIndex < pageSections.length; sectionIndex++) {
  // Add an event listener to each section..
  pageSections[sectionIndex].addEventListener('mouseover', function() {
    // Print out wich section is being hovered
    console.log('Hovering section ' + sectionIndex);
    unselectAll();
    document.getElementById("navItem" + sectionIndex).classList.add('active');
  });
}



// ######################## Set a Nav item to active ###########################

function unselectAll() {
  for (let navItems = 0; navItems < pageSections.length; navItems++) {
    document.getElementById("navItem" + navItems).classList.remove('active');

  }
}






//Refresh page every 6 minutes
setTimeout(function() {
  window.location.reload(1);
}, 360000);

// ##################### Point of no return #######################
