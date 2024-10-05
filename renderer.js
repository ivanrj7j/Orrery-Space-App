class Renderer {
    constructor(color, position, diameter) {
      this.color = color;
      this.position = position;
      this.diameter = diameter;
    }
  
    display() {
      fill(this.color);
      ellipse(this.position.x, this.position.y, this.diameter);
    }
  }
  
export default Renderer;
  