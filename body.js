class Body{
    constructor(mass, color, diameter, name, maxDistance){
        // inirializing each planetary body with parameters it needs
        this.mass = mass;
        this.color = color;
        this.diameter = diameter;
        this.name = name;
        this.maxDistance = maxDistance;

        this.theta = 0; // angle theta used to calculate the position in the orbit
    }


    // attract(other){
    //     const massProdcut = this.mass * other.mass;
    //     const distance = this.mass.position.distance(other.mass.position);
    //     const forceMagnitude = massProdcut / distance;

    //     let direction = this.mass.position.subtract(other.mass.position);
    //     direction = direction.normalize();

    //     const force = direction.multiply(forceMagnitude);
        
    //     other.body.mass.applyForce(force);
        
    // }

    onHover(mousePosition, executables, absolutePosition){
        // calculates the distance between teh mouse pointer and the center of the body
        const distance = absolutePosition.distance(mousePosition);

        // checks if the dsitance is smaller than half the body's diameter
        if(distance < this.diameter/2){
            // if the condition is true, execute the provided callback functions
            for (let index = 0; index < executables.length; index++) {
                const exe = executables[index];
                exe(); // execute the callback
            }
        }
    }


    // update method to change the body's position based on angular momentum
    update(angularMomentum){
        // increment the angle by the angular momentum to simulate the body's orbit
        this.theta += angularMomentum;

        // updates the body's X and Y position based on its distance using the polar form of ellipse
        // the 0.875 and 0.5 values scale the position of orbit more accurately
        this.mass.position.x = ((this.maxDistance * Math.cos(this.theta)) * 0.875) + 0.5;
        this.mass.position.y = (this.maxDistance * Math.sin(this.theta)) + 0.5;
    }
};