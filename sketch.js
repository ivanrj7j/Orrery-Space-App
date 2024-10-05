const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const screenVector = new Vector(screenWidth, screenHeight);


function setup() {
  createCanvas(screenWidth, screenHeight);
}


const objects = initializeObjects(planetData);

function draw() {
  background(30);

  const mousePosition = new Vector(mouseX, mouseY);


  objects.forEach(body => {

    const [r, g, b] = body.color;
    const absolutePosition = body.mass.position.multiply(screenVector);

    fill(r, g, b);
    noStroke()
    circle(absolutePosition.x, absolutePosition.y, body.diameter);
    
    body.onHover(mousePosition, [() => {
    }], absolutePosition)

  });



}
