class Vector{

    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    
    add(other){
        const newX = this.x + other.x;
        const newY = this.y + other.y;

        return new Vector(newX, newY);
    }

    subtract(other){
        const newX = this.x - other.x;
        const newY = this.y - other.y;

        return new Vector(newX,newY);
    }

    multiply(other){
        const newX = this.x * other.x;
        const newY = this.y * other.y;

        return new Vector(newX,newY);
    }

    divide(other){
        const newX = this.x / other.x;
        const newY = this.y / other.y;
        
        return new Vector(newX,newY);
    }

    addScalar(other){
        const newX = this.x + other;
        const newY = this.y + other;

        return new Vector(newX, newY);
    }

    subtractScalar(other){
        const newX = this.x - other;
        const newY = this.y - other;
        return new Vector(newX, newY);
    }

    multiplyScalar(other){
        const newX = this.x * other;
        const newY = this.y * other;

        return new Vector(newX, newY);
    }

    divideScalar(other){
        const newX = this.x / other;
        const newY = this.y / other;

        return new Vector(newX, newY);
    }

    dot(other){
        const V = this.multiply(other);
        
        return V.x + V.y;
    }

    magnitude(){
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    distance(other){
        const a = this.subtract(other);
        return a.magnitude();
    }
}