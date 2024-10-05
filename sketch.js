const screenWidth = window.innerHeight;
const screenHeight = window.innerHeight;
const screenVector = new Vector(screenWidth, screenHeight);

const centerVector = new Vector(0.5, 0.5);

let labels = false;

function setup() {
  createCanvas(screenWidth, screenHeight);
  textSize(30);
  textAlign(CENTER, BOTTOM);

  let toggleLabel = createButton("Toogle Labels");
  toggleLabel.mousePressed(() => {
    labels = !labels;
  })
  // button.positon(10, 100);
}


const objects = initializeObjects(planetData);

function draw() {
  background(0);

  const mousePosition = new Vector(mouseX, mouseY);


  objects.forEach(body => {

    let distanceFromCenter = body.mass.position.distance(centerVector);
    let angularMomentum = 1 / (distanceFromCenter * 1000);
    if (distanceFromCenter == 0) {
      angularMomentum = 0;
    }
    body.update(angularMomentum);

    const [r, g, b] = body.color;
    const absolutePosition = body.mass.position.multiply(screenVector);

    fill(r, g, b);
    noStroke()
    circle(absolutePosition.x, absolutePosition.y, body.diameter);

    if (!labels) {

      body.onHover(mousePosition, [() => {

        fill(255 - r, 255 - g, 255 - b);
        stroke(r, g, b);
        text(body.name, absolutePosition.x, absolutePosition.y);

      }], absolutePosition);

    }else{
      text(body.name, absolutePosition.x, absolutePosition.y);
    }
  });



}
