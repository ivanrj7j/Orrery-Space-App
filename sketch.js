const screenWidth = window.innerHeight;
const screenHeight = window.innerHeight;
const screenVector = new Vector(screenWidth, screenHeight);

const centerVector = new Vector(0.5, 0.5);

let labels = false;
const objects = initializeObjects(planetData);
const planetCheckBoxes = []

function setup() {
  createCanvas(screenWidth, screenHeight);
  textSize(30);
  textAlign(CENTER, BOTTOM);

  let toggleLabel = createButton("Toogle Labels");
  toggleLabel.mousePressed(() => {
    labels = !labels;
  })

  const checkBoxDiv = createDiv();

  objects.forEach((body) => {
    let checkbox = createCheckbox(" " + body.name, true);
    checkbox.parent(checkBoxDiv);
    planetCheckBoxes.push(checkbox);
  });
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

}
