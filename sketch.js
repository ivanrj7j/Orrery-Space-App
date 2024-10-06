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
let planetBSelector; // dropdown

let distanceSection; // in html section to display the distance
let distanceDisplay; // a div to show the calculated distance


// map distances for each planets position from planetData
let distances = planetData.map((obj) => {
  return obj.position;
});

// gets the maximum distance from the sun, to scale planetary distances properly
let maxDistance = Math.max(...distances);

// the variable to represent that it is simulating
let simulating = true; 



function setup() {
  createCanvas(screenWidth, screenHeight);
  textSize(30);
  textAlign(CENTER, BOTTOM);

  // create button to toggle labels
  let toggleLabel = createButton("Toogle Labels");
  toggleLabel.mousePressed(() => {
    labels = !labels; //flip the state on button press
  })


  // this div contains all the checkboxes
  const checkBoxDiv = createDiv(); // this div contains all the checkboxes


  // create a section for distances
  distanceSection = createDiv("<h2>Calculate Distance b/w planets</h2>");
  planetASelector = createSelect();
  planetASelector.parent(distanceSection);
  planetBSelector = createSelect();
  planetBSelector.parent(distanceSection);

  // loops through each planetary body (sun included)
  objects.forEach((body) => {
    // checkboxes for each planet
    let checkbox = createCheckbox(" " + body.name, true);
    checkbox.parent(checkBoxDiv); // attach to checkbox div
    planetCheckBoxes.push(checkbox); // stores the checkbox state (true or false)

    // add planets as options in the dropdowns
    planetASelector.option(body.name); 
    planetBSelector.option(body.name);

    // set "earth as the default selected option for planet B"
    if (body.name == "Earth") {
      planetBSelector.selected("Earth")
    }
  });


  // create a div to display the calculated distance
  distanceDisplay = createDiv("Distance: ");
  distanceDisplay.parent(distanceSection);


  // creates a button to play/pause the animation
  let pauseButton = createButton("Pause");
  pauseButton.mousePressed(() => {
    simulating = !simulating; // flips the boolean value
    if(simulating){
      pauseButton.html("Pause");
    }else{
      pauseButton.html("Resume");
    }
  })
}




function draw() {
  background(0); // set background colour to black

  // get the current mouse position as a vector
  const mousePosition = new Vector(mouseX, mouseY);

  // loop through each planetary object to update and display them
  objects.forEach((body, i) => {

    if (simulating) { // condtion to update play or pause function of the animation

      //calculate the distance of the planet from the center (the sun)
      let distanceFromCenter = body.mass.position.distance(centerVector);
      let angularMomentum = 1 / (distanceFromCenter * 1000);
      
      if (distanceFromCenter == 0) {
        // no angular momentum if at the center in this considering this system
        angularMomentum = 0;
      }

      // update the planets's position based on angualr momentum
      body.update(angularMomentum);
    }

    const [r, g, b] = body.color; // destructuing the RGB values

    // absolutePosition scaling based on the canvas
    const absolutePosition = body.mass.position.multiply(screenVector);

    // checks if the planets should be visible
    if (planetCheckBoxes[i].checked()) {
      fill(r, g, b); // sets the colour of the planet
      noStroke(); // remove the stroke around the planet

      // draws the planet on the canvas
      circle(absolutePosition.x, absolutePosition.y, body.diameter);
    }
    

    // function to display planet name (label) with an outline
    const labelDisplay = () => {

      // set text colour opposite to the planet for easier visibility
      fill(255 - r, 255 - g, 255 - b); 

      stroke(r, g, b); // outlines the text

      // display the planet's name
      text(body.name, absolutePosition.x, absolutePosition.y); 

    }


    // If the planet checkbox is checked
    if (planetCheckBoxes[i].checked()) {
      if (!labels) {

        // if lables are toggled off, display label only on hover
        body.onHover(mousePosition, [labelDisplay], absolutePosition);

      } else {
        
        // if labels are toggled on, displat for all planets
        labelDisplay();
      }
    }


  });


  // THIS ARE THE VALUES SHOWN IN THE GUI
  // gets the selected planets from the dropdown menus
  const planetAIdx = planetASelector.elt.selectedIndex; // index of planet A
  const planetBIdx = planetBSelector.elt.selectedIndex; // index of planet B
  const positionA = objects[planetAIdx].mass.position; // position of the planet A
  const positionB = objects[planetBIdx].mass.position; // position of the planet B

  // calculate distance between planet A and planet B
  let distance = positionA.distance(positionB);
  
  //double the distance for scaling
  distance *= 2; 

  // cube the distance for exaggerated scaling
  distance = Math.pow(distance, 3);

  // scale it accordingly to the maximum distance
  distance *= maxDistance;

  // apply final scaling to match real-world values
  distance /= 1.28

  // display the calculated distance with scientific notation
  distanceDisplay.html("Distance: " + distance.toExponential(4) + " km");

}
