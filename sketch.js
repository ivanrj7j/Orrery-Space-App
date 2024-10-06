const screenWidth = window.innerHeight; // window.innerHeight returns the height of the window, same for the width
const screenHeight = window.innerHeight; // window.innerWidth
// both these two lines assign the same value to width and height to make the canvas square
// in shape as square representation is easier to analyse and pictorially represent
// for experimental purposes you can change the values

const screenVector = new Vector(screenWidth, screenHeight); // vector to represent the window width and height

const centerVector = new Vector(0.5, 0.5); // vector representing the centre of the canvas

let labels = false; // initializing the labels as false. You can toggleLabels 

const objects = initializeObjects(planetData); // initializing the planet data from data.js as objects.

const planetCheckBoxes = []; // to store the checkbox states

let planetASelector; // dropdown for selecting planets
let planetBSelector; // dropdown for selecting planets
let distanceSection; // in html section to display the distance
let distanceDisplay; // a div to show the calculated distance

// map distances for each planets position from planetData
let distances = planetData.map((obj) => {
  return obj.position;
});

// gets the maximum distance from the sun, to scale planetary distances properly
let maxDistance = Math.max(...distances);

function setup() {
  createCanvas(screenWidth, screenHeight);
  textSize(30);
  textAlign(CENTER, BOTTOM);

  // create button to toggle labels
  let toggleLabel = createButton("Toogle Labels");
  toggleLabel.mousePressed(() => {
    labels = !labels; //flip the state on button press
  })

  const checkBoxDiv = createDiv(); // this div contains all the checkboxes

  // create a section for distances
  distanceSection = createDiv("<h2>Calculate Distance b/w planets</h2>");
  planetASelector = createSelect();
  planetASelector.parent(distanceSection);
  planetBSelector = createSelect();
  planetBSelector.parent(distanceSection);
  
  objects.forEach((body) => {
    let checkbox = createCheckbox(" " + body.name, true);
    checkbox.parent(checkBoxDiv);
    planetCheckBoxes.push(checkbox);
    
    planetASelector.option(body.name);
    planetBSelector.option(body.name);
    if (body.name == "Earth"){
      planetBSelector.selected("Earth")
    }
  });
  
  distanceDisplay = createDiv("Distance: ");
  distanceDisplay.parent(distanceSection);

  
}




function draw() {
  background(0);

  const mousePosition = new Vector(mouseX, mouseY);


  objects.forEach((body, i) => {

    let distanceFromCenter = body.mass.position.distance(centerVector);
    let angularMomentum = 1 / (distanceFromCenter * 1000);
    if (distanceFromCenter == 0) {
      angularMomentum = 0;
    }
    body.update(angularMomentum);

    const [r, g, b] = body.color;
    const absolutePosition = body.mass.position.multiply(screenVector);

    if (planetCheckBoxes[i].checked()) {
      fill(r, g, b);
      noStroke()
      circle(absolutePosition.x, absolutePosition.y, body.diameter);
    }

    const labelDisplay = () => {

      fill(255 - r, 255 - g, 255 - b);
      stroke(r, g, b);
      text(body.name, absolutePosition.x, absolutePosition.y);

    }

    if (planetCheckBoxes[i].checked()) {
      if (!labels) {

        body.onHover(mousePosition, [labelDisplay], absolutePosition);

      } else {
        labelDisplay();
      }
    }


  });

  const planetAIdx = planetASelector.elt.selectedIndex; 
  const planetBIdx = planetBSelector.elt.selectedIndex; 
  const positionA = objects[planetAIdx].mass.position;
  const positionB = objects[planetBIdx].mass.position;

  let distance = positionA.distance(positionB);
  distance *= 2;
  distance = Math.pow(distance, 3);
  distance *= maxDistance;
  distance /= 1.28

  distanceDisplay.html("Distance: " + distance.toExponential(4) + " km");

}
