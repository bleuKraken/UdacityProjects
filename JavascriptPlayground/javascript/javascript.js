
prompt("Hello");

let testTwo = getClothing(false);

document.getElementById('text').innerHtml = getClothing(true);


function getClothing(isCold) {
  if (isCold) {
    const freezing = 'Grab a jacket!';
  } else {
    const hot = 'It’s a shorts kind of day.';
    console.log(freezing);
  }
}
