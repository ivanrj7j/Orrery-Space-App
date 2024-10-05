const sunMass = 1.989e30;
const earthMass = 5.972e24;

const earthDiameter = 12742;
const sunDiameter = 1.3927e6;

const massDivisionFactor = 1e22;
const scaleDivisionFactor = 1e2;

const sun = new Body(sunMass/massDivisionFactor, (255, 255, 255), sunDiameter/scaleDivisionFactor);
const earth = new Body(earthMass/massDivisionFactor, (0, 0, 255), earthDiameter/scaleDivisionFactor);