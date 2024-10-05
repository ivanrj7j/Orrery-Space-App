class Body{
    constructor(mass, color, diameter){
        this.mass = mass;
        this.color = color;
        this.diameter = diameter;
    }


    attract(other){
        const massProdcut = this.mass * other.mass;
        const distance = this.mass.position.distance(other.mass.position);
        const forceMagnitude = massProdcut / distance;

        let direction = this.mass.position.subtract(other.mass.position);
        direction = direction.normalize();

        const force = direction.multiply(forceMagnitude);
        
        other.body.mass.applyForce(force);
    }
};