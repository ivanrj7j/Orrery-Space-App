const massDivisionFactor = 1e22;
const scaleDivisionFactor = 1e4;

/*
    #This is the structure of the input data for planets or celestial objects.
    
    The input is an array of objects containing:
    
    [
        {
            name: string,           // Name of the celestial body.
            mass: float/integer,    // Mass of the body (scaled by massDivisionFactor).
            sunDistance: int/float, // Distance from the sun (in AU).
            diameter: int/float,    // Diameter of the body (for visual scaling).
            color: [int, int, int]  // RGB color values representing the object's color.
        }
    ]

    The output is structured as an array of Body objects, each representing a celestial object.
    
    [
        Body // Each element in this array is an instance of the Body class.
    ]
*/



function initializeObjects(objectData){
    
    let objects = []; // array to store body objects
    let maxDistance;  // variable to store the maximum distance (scaling purposes)
    let maxSize;      // variable to store the maximum size (scaling purposes)

    // extract diatances of all objects(planets) from the sun
    let distances = objectData.map((obj) => {
        return obj.position; 
    });

    // extracts sizes (diameter) of all objects
    let sizes = objectData.map((obj) => {
        return obj.diameter; 
    });

    // determines the maximum diatnce and saze for scaling purposes
    maxDistance = Math.max(...distances);
    maxSize = Math.max(...sizes);

    // iterates over the input data for each planet/celestial object
    objectData.forEach(planet => {
        
        let massValue = planet.mass ;

        // scale the planet's distance from the sun using the maximum distance and normalizing
        let sunDistance = Math.pow(planet.position / (maxDistance*1.28), 1/3) / 2;
        let y = sunDistance+0.5;

        // Scale the planets diameter for visualization ensuring its proportional to max siz.
        let diameter = (planet.diameter/maxSize) + 0.1;

        // Use a tanh function to constrain the size
        diameter = Math.tanh(diameter) * 200;

        // Set the planet's initial position and velocity.
        let position = new Vector(0.5,y);
        let velocity = Vector.zero();

        // create a new Mass object for the planet representing its mass, position, and velocity
        let mass = new Mass(massValue,position,velocity);
        
        // create a new Body object using the mass, color, diameter, name, and sun distance.
        const body = new Body(mass, planet.color, diameter, planet.name, sunDistance);
        
        // add the new body object to the objects array
        objects.push(body);
    });

    // returns the array of objects
    return objects;
        

}