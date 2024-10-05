class Body{
    constructor(mass, color, diameter, name, maxDistance){
        this.mass = mass;
        this.color = color;
        this.diameter = diameter;
        this.name = name;
        this.maxDistance = maxDistance;

        this.theta = 0;
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

    onHover(mousePosition, executables, absolutePosition){
        const distance = absolutePosition.distance(mousePosition);
        if(distance < this.diameter/2){
            for (let index = 0; index < executables.length; index++) {
                const exe = executables[index];
                exe();
            }
        }
    }

    update(angularMomentum){
        this.theta += angularMomentum;
        this.mass.position.x = ((this.maxDistance * Math.cos(this.theta)) * 0.875) + 0.5;
        this.mass.position.y = (this.maxDistance * Math.sin(this.theta)) + 0.5;
    }
};