
const massDivisionFactor = 1e22;
const scaleDivisionFactor = 8e3;

/**
 Data structure

 [
    {
        name:string
        mass: float/integer
        sunDistance: int/float
        diameter: int/float
        color: [int, int, int]
    }
 ]

 Ouptut structure

 [
  Body
 ]
  
 */



function initializeObjects(objectData){
    
    let objects = [];
    let maxDistance;
    let maxSize;

    let distances = objectData.map((obj) => {
        return obj.position;
    });

    let sizes = objectData.map((obj) => {
        return obj.diameter;
    });

    maxDistance = Math.max(...distances);
    maxSize = Math.max(...sizes);

    objectData.forEach(planet => {
        
        let massValue = planet.mass / massDivisionFactor;
        let sunDistance = Math.pow(planet.position / (maxDistance*1.28), 1/3) / 2;
        let y = sunDistance+0.5;
        let diameter = (planet.diameter/maxSize) + 0.1;
        diameter = Math.tanh(diameter) * 200;

        let position = new Vector(0.5,y);
        let velocity = Vector.zero();
        let mass = new Mass(massValue,position,velocity);
        
        const body = new Body(mass, planet.color, diameter, planet.name);
        
        minDistance = diameter;


        objects.push(body);
    });

    return objects;
        

}