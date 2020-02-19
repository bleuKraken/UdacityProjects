/*
Todo List
- get event listener to print out which section I am hovering over
- when hovering over a section, highlight that setion on the nav
- create entire nav from javascript ? 

*/

// get first Nav item
/*
const navItem1 = document.getElementById('nav-item-1');
*/
// get nav container
const navContainer = document.getElementById('nav');

// create new nev item for navigation
const newListItem = document.createElement('li');
const newLink = document.createElement('a');


// Add class to new link child
newLink.classList.add('link');
//add classes to newly created item
newListItem.classList.add('nav-item');
// add <a> tag to list item
newListItem.appendChild(newLink);
// Give new string name to newly created item
newListItem.textContent = 'Product';

// Append (add) newly created list item to the navigation container
navContainer.appendChild(newListItem);




// Adding Event Listeners
/*
navItem.addEventListener("click", function() {
  document.getElementById('product-section').scrollIntoView();
});
*/


//Refresh page every 6 minutes
setTimeout(function() {
  window.location.reload(1);
}, 360000);

// ##################### Point of no return #######################
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
