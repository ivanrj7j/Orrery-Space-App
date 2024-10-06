class Vector{

    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    static zero(){
        return new Vector(0, 0); //returns zero vector
    }

    static unit(){
        return new Vector(1, 1); // returns unit vector
    }
    
    add(other){
        const newX = this.x + other.x;
        const newY = this.y + other.y;

        return new Vector(newX, newY); // adds two vectors and returns it
    }

    subtract(other){
        const newX = this.x - other.x;
        const newY = this.y - other.y;

        return new Vector(newX,newY); // subtracts two vectors and returns it
    }

    multiply(other){
        const newX = this.x * other.x;
        const newY = this.y * other.y;

        return new Vector(newX,newY); // multiply two vectors and returns it
    }

    divide(other){
        const newX = this.x / other.x;
        const newY = this.y / other.y;
        
        return new Vector(newX,newY); // divides two vectors and returns it
    }

    addScalar(other){
        const newX = this.x + other;
        const newY = this.y + other;

        return new Vector(newX, newY); // adds a scalar value to the vector
    }

    subtractScalar(other){
        const newX = this.x - other;
        const newY = this.y - other;
        return new Vector(newX, newY); // subtract a scalar value to the vector
    }

    multiplyScalar(other){
        const newX = this.x * other;
        const newY = this.y * other;

        return new Vector(newX, newY); // Multiply a scalar value to the vector
    }

    divideScalar(other){
        const newX = this.x / other;
        const newY = this.y / other;

        return new Vector(newX, newY); // divides a scalar value to the vector
    }

    dot(other){
        const V = this.multiply(other);
        
        return V.x + V.y; // finds the dot product of vectors and returns it
    }

    magnitude(){
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)); // finds the magnitude of the vector and returns it
    }

    distance(other){
        const a = this.subtract(other);
        return a.magnitude(); // finds the distance betweem two vectors
    }

    normalize(){
        const magnitude = this.magnitude();
        
        return this.divideScalar(magnitude); // returns a unitvector in the same direction as the original vector but has a magnitude of 1
    }
}