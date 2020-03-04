
//ON PAGE LOAD
// Global varaiables
const navContainer = document.getElementById('nav');
const navIcon = document.getElementById('nav-icon');
let pageSections = document.querySelectorAll('section');
let sectionTitles = document.querySelectorAll('.section-title');

// For every section, create a nav item with the name of that section title
for (let index = 0; index < pageSections.length; index++) {

  // Each section gets its own ID. Example: section-0
  pageSections[index].id = "section-" + index;

  // Creating nav bar items with links to sections
  const newListItem = document.createElement('li');
  const newAnchor = document.createElement('a');
  newListItem.classList.add('nav-item');
  newListItem.id = "nav-item-" + index;
  newAnchor.classList.add('link');
  newAnchor.classList.add('color-white');
  newAnchor.textContent = sectionTitles[index].innerHTML;
  // Append and create nav links for navbar
  navContainer.appendChild(newListItem);
  newListItem.appendChild(newAnchor);
  // Result: <li id="navItem0" class="nav-item"> <a class="link color-white"> Product </a>  </li>

  // Add Event listeners to every section,
  // affects the nav links background to active.
  pageSections[index].addEventListener('mouseover', function() {
    RemoveActiveBackground();
    document.getElementById("nav-item-" + index).classList.add('active');
  });

  // Scroll to section area when a nav link gets clicked on
  let navLink = document.getElementById('nav-item-' + index);
  let sectionArea = document.querySelectorAll('section');
  navLink.addEventListener('click', function() {
    RemoveActiveBackground();
    sectionArea[index].scrollIntoView({
      behavior: 'smooth'
    });
  });

  // Make mobile nav light up when buttons get clicked
  document.getElementById('nav-item-' + index).addEventListener('click', function() {
    document.getElementById('nav-item-' + index).classList.toggle('active');
  });

  // Give the sections an event listener that will make the nav go away
  pageSections[index].addEventListener('click', function() {
    for (let index = 0; index < pageSections.length; index++) {
      document.getElementById('nav-item-' + index).classList.remove('visible');
    }
  });
}
// End of For Loop

// ######################## Functions Below ###########################
// Unselect all link items from having a green background
function RemoveActiveBackground() {
  for (let navItems = 0; navItems < pageSections.length; navItems++) {
    document.getElementById("nav-item-" + navItems).classList.remove('active');
  }
}

// ######################## Event Listeners Below ###########################
// Listener for Mobile nav icon.
navIcon.addEventListener('click', function() {
  RemoveActiveBackground();
  document.getElementById('nav-icon').classList.toggle('color-success');
  //Make nav items visible or invisible
  for (let index = 0; index < pageSections.length; index++) {
    document.getElementById('nav-item-' + index).classList.toggle('visible');
  }
});
