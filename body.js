class Body{
    constructor(mass, color, diameter){
        this.mass = mass;
        this.color = color;
        this.diameter = diameter;
    }


    attract(other){
        const massProdcut = this.mass * other.mass;
        const distance = this.mass.position.distance(other.mass.position);
        const force = massProdcut / distance;
        other.body.mass.applyForce();
    }
}