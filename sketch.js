const screenWidth = window.innerHeight;
const screenHeight = window.innerHeight;
const screenVector = new Vector(screenWidth, screenHeight);

const centerVector = new Vector(0.5, 0.5);

function setup() {
  createCanvas(screenWidth, screenHeight);
  textSize(30);
  textAlign(CENTER,BOTTOM )
}


const objects = initializeObjects(planetData);

function draw() {
  background(0);

  const mousePosition = new Vector(mouseX, mouseY);


  objects.forEach(body => {

    let distanceFromCenter = body.mass.position.distance(centerVector);
    let angularMomentum = 1 / (distanceFromCenter * 1000);
    if(distanceFromCenter == 0){
      angularMomentum = 0;
    }
    body.update(angularMomentum);

    const [r, g, b] = body.color;
    const absolutePosition = body.mass.position.multiply(screenVector);

    fill(r, g, b);
    noStroke()
    circle(absolutePosition.x, absolutePosition.y, body.diameter);
    
    body.onHover(mousePosition, [() => {
      
        fill(255-r, 255-g, 255-b);
        stroke(r,g,b);
        text(body.name, absolutePosition.x, absolutePosition.y);

    }], absolutePosition);

  });



}
