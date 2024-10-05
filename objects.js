const sunMassConst = 1.989e30;
const earthMassConst = 5.972e24;

const earthDiameter = 12742;
const sunDiameter = 1.3927e6;

const massDivisionFactor = 1e22;
const scaleDivisionFactor = 1e2;

const sunMass = new Mass(sunMassConst/massDivisionFactor, Vector.zero(), Vector.zero());
const earthMass = new Mass(earthMassConst/massDivisionFactor, new Vector(0.5, 0.5), Vector.zero());

const sun = new Body(sunMass, (255, 255, 255), sunDiameter/scaleDivisionFactor);
const earth = new Body(earthMass, (0, 0, 255), earthDiameter/scaleDivisionFactor);

export const objects = {
    sun,
    earth
}