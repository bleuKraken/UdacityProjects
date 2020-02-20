/*
Notes

// TODO:
- remove some of the comments when the code gets cemented in my head more! :D

// TODO COMPLETED:
- Hightlight nav area when hovering cover
  - detect mouse over div

*/
console.log("Starting..");




// ######################## Build the nav ###########################
// get nav container
const navContainer = document.getElementById('nav');
let pageSections = document.querySelectorAll('section');
// Array of section titles
let sectionTitles = document.querySelectorAll('.section-title'); //Grab title of sections

// For every section title, create a nav item with the name of that section title
for (let index = 0; index < pageSections.length; index++) {
  // create new list item for navigation
  const newListItem = document.createElement('li');
  newListItem.classList.add('nav-item'); // <li class="nav-item"> </li>
  newListItem.id = "navItem" + index;    // <li id="navItem0" class="nav-item"> </li>
  // Create new link
  const newAnchor = document.createElement('a');
  newAnchor.classList.add('link');
  newAnchor.classList.add('color-white');                 // <a class="link color-white"> </a>
  newAnchor.textContent = sectionTitles[index].innerHTML; // <a class="link color-white"> Product </a>
  // Place <li> inside of <ul>
  navContainer.appendChild(newListItem);
  // Place <a> inside of <li>
  newListItem.appendChild(newAnchor);
}

// ######################## Find out which section is being hovered ###########################
//Grab all of sections

// For every section that there is...
for(let sectionIndex = 0; sectionIndex < pageSections.length; sectionIndex++){
  // Add an event listener to each section..
  pageSections[sectionIndex].addEventListener('mouseover', function(){
    // Print out wich section is being hovered
    console.log('Hovering section ' + sectionIndex);
    unselectAll();
    document.getElementById("navItem" + sectionIndex).classList.add('active');
  });
}



// ######################## Set a Nav item to active ###########################

function unselectAll() {
  for(let navItems = 0; navItems < pageSections.length; navItems++) {
    document.getElementById("navItem" + navItems).classList.remove('active');

  }
}


/*
for(let index = 0; index < sectionTitle.length; index++){

  console.dir(sectionTitle[index].innerHTML);

  //add classes to newly created item
  newListItem.classList.add('nav-item');
  // Add class to new link child
  newAnchor.classList.add('link');
  // add <a> tag to list item
  newListItem.appendChild(newLink);
  // Give new string name to newly created item
  newListItem.textContent = sectionTitle[index].innerHTML;

  // Append (add) newly created list item to the navigation container
  navContainer.appendChild(newListItem);
}


console.log(newListItem);

*/


//Refresh page every 6 minutes
setTimeout(function() {
  window.location.reload(1);
}, 360000);

// ##################### Point of no return #######################


// Adding Event Listeners
/*
navItem.addEventListener("click", function() {
  document.getElementById('product-section').scrollIntoView();
});
*/


// get first Nav item
/*
const navItem1 = document.getElementById('nav-item-1');
*/

/*
// get key down
document.addEventListener("keydown", function(event) {
  console.log(event.which);
});


# Refreshes the page every 30 seconds.
- Commecnted out becasue it slows down page after a while.
- don't leave on forever
setTimeout(function(){
   window.location.reload(1);
}, 20000);

*/
