/*
Notes / TODO's
- Love the process!
- Smile :)

*/

// ######################## Build the nav links ###########################
// Global varaiables
const navContainer = document.getElementById('nav');
const navIcon = document.getElementById('nav-icon');
let pageSections = document.querySelectorAll('section');
let sectionTitles = document.querySelectorAll('.section-title');


// For every section title, create a nav item with the name of that section title
for (let index = 0; index < pageSections.length; index++) {

  // Set and id to every section on page. Example: section-0
  pageSections[index].id = "section-" + index;

  // create new list item for navigation
  const newListItem = document.createElement('li');
  newListItem.classList.add('nav-item');
  newListItem.id = "nav-item-" + index;
  const newAnchor = document.createElement('a');
  newAnchor.classList.add('link');
  newAnchor.classList.add('color-white');
  newAnchor.textContent = sectionTitles[index].innerHTML;
  // Append the two variables created above
  navContainer.appendChild(newListItem);
  newListItem.appendChild(newAnchor);
  // Result: <li id="navItem0" class="nav-item"> <a class="link color-white"> Product </a>  </li>

  // Add event listeners to page sections being hovered
  pageSections[index].addEventListener('mouseover', function() {
    unselectAll();
    document.getElementById("nav-item-" + index).classList.add('active');
  });



  // Scroll to section area when a nav link gets clicked on
  let navLink = document.getElementById('nav-item-' + index);
  let sectionArea = document.querySelectorAll('section');
  navLink.addEventListener('click', function() {
    unselectAll();
    sectionArea[index].scrollIntoView({
      behavior: 'smooth'
    });
  });

  // Make mobile nav light up when buttons get clicked
  document.getElementById('nav-item-' + index).addEventListener('click', function() {
    document.getElementById('nav-item-' + index).classList.toggle('active');
  });
};


/*
if(document.getElementById('nav-icon').classList.contains('visible')) {
  console.log('menu is visible');
  document.querySelectorAll('page').addEventListener('click', function() {
    console.log('event listener added');
    for (let index = 0; index < pageSections.length; index++) {

      document.getElementById('nav-item-' + index).classList.toggle('visible');
      document.getElementById('nav-icon').classList.toggle('color-success');
      console.log('should be toggling');
    }
  });

}
*/


// Add event listener to Mobile dropdown. (Only works on small width, does not work on actual mobile. yet)
navIcon.addEventListener('click', function() {
  unselectAll();

  //Make nav items visible or invisible
  for (let index = 0; index < pageSections.length; index++) {
    document.getElementById('nav-item-' + index).classList.toggle('visible');
  }

  document.getElementById('nav-icon').classList.toggle('color-success');
  console.log('mobile nav visible');



});

// Give the sections an event listener that will make the nav go away
for (let index = 0; index < pageSections.length; index++) {
  pageSections[index].addEventListener('click', function() {
    for (let index = 0; index < pageSections.length; index++) {
      document.getElementById('nav-item-' + index).classList.remove('visible');
    }
  });

}





// ######################## Point of No Return, Functions Below ###########################
// Unselect all link items from having a green background
function unselectAll() {
  for (let navItems = 0; navItems < pageSections.length; navItems++) {
    document.getElementById("nav-item-" + navItems).classList.remove('active');
  }
}
