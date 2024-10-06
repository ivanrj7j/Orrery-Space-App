class Mass{
    constructor(mass, position, velocity){
        this.mass = mass;
        this.position = position;
        this.velocity = velocity;
    }

    // UNNECESSARY CODEs

    // updatePosition(){
    //     this.position = this.position.add(this.velocity);
    // }

    // applyForce(force){
    //     const accl = force.divideScalar(this.mass);
    //     this.velocity = this.velocity.add(accl);
    // }

    update(){
        this.updatePosition();
    }
}