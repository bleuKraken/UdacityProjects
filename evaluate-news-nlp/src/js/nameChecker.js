
function checkForName(inputText) {
  console.log('Inside of CheckForName function');
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    if(names.includes(inputText)) {
        alert("Welcome, Captain!")
    }
    console.log('Exiting CheckForName function');
}

export { checkForName }
