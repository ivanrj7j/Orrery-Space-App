let planetData = [
    {
        name: "Sun",
        mass: 1.989e6,
        position: 0,
        diameter: 1.3927e6
    },

    {
        name: "Mercury",
        mass: 0.330,
        position: 0.39,
        diameter: 4879
    },

    {
        name: "Venus",
        mass: 4.87,
        position: 0.72,
        diameter: 12104
    },

    {
        name: "Earth",
        mass: 5.97,
        position: 1,
        diameter: 12576
    },

    {
        name: "Mars",
        mass: 0.642,
        position: 1.52,
        diameter: 6794
    },

    {
        name: "Jupiter",
        mass: 1898,
        position: 5.2,
        diameter: 142980
    },

    {
        name: "Saturn",
        mass: 568,
        position: 9.54,
        diameter: 120540
    },

    {
        name: "Uranus",
        mass: 86.8,
        position: 19.2,
        diameter: 51120
    },

    {
        name: "Neptune",
        mass: 102,
        position: 30.06,
        diameter: 49530
    },
];


planetData = planetData.map((data) => {
    data.position *= 1.496e8;
    data.mass *= 1e24;

    return data;
});
// converting au to kilometers 