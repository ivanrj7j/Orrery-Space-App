class Body{
    constructor(mass, color, diameter, name){
        this.mass = mass;
        this.color = color;
        this.diameter = diameter;
        this.name = name;
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
};