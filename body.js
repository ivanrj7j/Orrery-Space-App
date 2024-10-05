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

    onHover(mousePosition, executables){
        const distance = this.mass.position.distance(mousePosition);
        console.log(distance, "dist");
        if(distance < this.diameter/2){
            for (let index = 0; index < executables.length; index++) {
                const exe = executables[index];
                exe();
            }
        }
    }
};