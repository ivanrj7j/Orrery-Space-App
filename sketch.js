const screenWidth = 1000;
const screenHeight = 1000;
const screenVector = new Vector(screenWidth,screenHeight);


function setup() {
  createCanvas(screenWidth, screenHeight);
}



function draw() {

  background(30);

  objects.forEach(body => {
    const [r, g, b] = body.color;
    const absolutePosition = body.mass.position.multiply(screenVector)
    fill(r, g, b);
    stroke(0, 0, 0);
    circle(absolutePosition.x, absolutePosition.y, body.diameter)
  });

}
