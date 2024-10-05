const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const screenVector = new Vector(screenWidth,screenHeight);


function setup() {
  createCanvas(screenWidth, screenHeight);
}


const objects = initializeObjects(planetData);

function draw() {

  background(30);
  objects.forEach(body => {
    console.log(body.mass)
    const [r, g, b] = body.color;
    const absolutePosition = body.mass.position.multiply(screenVector)
    fill(r, g, b);
    stroke(0, 0, 0);
    circle(absolutePosition.x, absolutePosition.y, body.diameter);
  });

}
