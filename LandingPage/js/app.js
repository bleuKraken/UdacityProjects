// Global varaiables
const navContainer = document.getElementById('nav');
const navIcon = document.getElementById('nav-icon');
let pageSections = document.querySelectorAll('section');
let sectionTitles = document.querySelectorAll('.section-title');

GenerateNavBar();
ToggleMobileNavbar();

// Add event listeners to every nav item
for (let index = 0; index < pageSections.length; index++) {

  // Scroll to section area when a nav link gets clicked on
  let navLink = document.getElementById('nav-item-' + index);
  let sectionArea = document.querySelectorAll('section');
  navLink.addEventListener('click', function() {
    RemoveActiveBackground();
    sectionArea[index].scrollIntoView({
      behavior: 'smooth'
    });
  });

  // affects the nav links background to active.
  pageSections[index].addEventListener('mouseover', function() {
    RemoveActiveBackground();
    document.getElementById('nav-item-' + index).classList.add('active');
    /* TODO .classlist.add('bg-light'); */
    document.getElementById('section-' + index).classList.remove('bg-dark-secondary');
     document.getElementById('section-' + index).classList.add('bg-light');
    console.log('hovering over ' + index);
  });

  // Give the sections an event listener that will make the nav go away
  pageSections[index].addEventListener('click', function() {
    if (!document.getElementById('nav-item-' + index).classList.contains('invisible')) {
      console.log("DOes NOT contain invisible");
      ToggleMobileNavbar();
    }
  });

  // Make mobile nav light up when buttons get clicked
  document.getElementById('nav-item-' + index).addEventListener('click', function() {
    document.getElementById('nav-item-' + index).classList.toggle('active');
  });
}

// Toggle navbar when nav-icon is clicked
navIcon.addEventListener('click', function() {
  ToggleMobileNavbar();
});


// ######################## Functions Below ###########################
// Unselect all link items from having a green background
function RemoveActiveBackground() {
  for (let navItems = 0; navItems < pageSections.length; navItems++) {
    document.getElementById("nav-item-" + navItems).classList.remove('active');
  }
}

// Toggle the dropdown shown on MOBILE when the user clicks on the navbar icon
function ToggleMobileNavbar() {
  for (let navIndex = 0; navIndex < pageSections.length; navIndex++) {
    document.getElementById('nav-item-' + navIndex).classList.toggle('invisible');
  }
}

// For every section, create a nav item with the name of that section title
function GenerateNavBar() {
  for (let index = 0; index < pageSections.length; index++) {

    // Creating nav bar items with links to sections
    pageSections[index].id = "section-" + index;
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
    // Result: <li id="nav-item-0" class="nav-item"> <a class="link color-white"> Product </a>  </li>
  }
}
