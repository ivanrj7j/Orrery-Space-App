const screenWidth = window.innerHeight;
const screenHeight = window.innerHeight;
const screenVector = new Vector(screenWidth, screenHeight);

const centerVector = new Vector(0.5, 0.5);

let labels = false;
const objects = initializeObjects(planetData);
const planetCheckBoxes = [];

let planetASelector;
let planetBSelector;
let distanceSection;
let distanceDisplay;

let distances = planetData.map((obj) => {
  return obj.position;
});

let maxDistance = Math.max(...distances);

function setup() {
  createCanvas(screenWidth, screenHeight);
  textSize(30);
  textAlign(CENTER, BOTTOM);

  let toggleLabel = createButton("Toogle Labels");
  toggleLabel.mousePressed(() => {
    labels = !labels;
  })

  const checkBoxDiv = createDiv();

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
