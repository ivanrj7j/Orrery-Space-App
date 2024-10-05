
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

    let distances = objectData.map((obj) => {
        return obj.position;
    });

    maxDistance = Math.max(...distances);

    objectData.forEach(planet => {
        
        let massValue = planet.mass / massDivisionFactor;
        let sunDistance = planet.position / (maxDistance*1.05*2);
        let y = sunDistance+0.5;
        let diameter = planet.diameter/scaleDivisionFactor;

        let position = new Vector(0.5,y);
        let velocity = Vector.zero();
        let mass = new Mass(massValue,position,velocity);
        
        const body = new Body(mass, planet.color, diameter);
        
        minDistance = diameter;


        objects.push(body);
    });

    return objects;
        

}