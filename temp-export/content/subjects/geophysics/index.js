"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geophysicsAccentSources = exports.geophysicsUnits = exports.geophysicsTopics = exports.geophysicsSubject = void 0;
const createStructuredSubject_1 = require("@/content/subjects/shared/createStructuredSubject");
const topics = [
    {
        id: 'foundations-of-geophysics',
        title: 'Foundations of Geophysics',
        description: 'Physical methods and principles used to study Earth’s structure, processes, and properties.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'What Is Geophysics?',
            'Earth as a Physical System',
            'Measurements in Geophysics',
            'Geophysical Fields and Signals',
            'Scales in Geophysics',
            'Applied vs Theoretical Geophysics',
        ]),
    },
    {
        id: 'seismology',
        title: 'Seismology',
        description: 'Earthquake waves, Earth structure, seismic methods, and the analysis of subsurface materials.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Earthquakes and Seismic Sources',
            'P-Waves and S-Waves',
            'Surface Waves',
            'Seismic Wave Propagation',
            'Seismometers and Seismic Records',
            'Earth Interior from Seismology',
            'Reflection Seismology',
            'Refraction Seismology',
            'Seismic Hazards',
        ]),
    },
    {
        id: 'gravity-and-geodesy',
        title: 'Gravity and Geodesy',
        description: 'Earth’s gravity field, shape, geodetic measurement, and gravitational methods in Earth science.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Gravity Basics',
            "Earth's Shape and Geoid",
            'Gravity Anomalies',
            'Gravimetry',
            'Isostasy',
            'Satellite Geodesy',
            'GPS and Positioning',
            'Applications of Gravity Data',
        ]),
    },
    {
        id: 'geomagnetism',
        title: 'Geomagnetism',
        description: "Earth's magnetic field, magnetic materials, and geophysical magnetic methods.",
        units: (0, createStructuredSubject_1.structuredUnits)([
            "Earth's Magnetic Field",
            'Magnetic Poles and Field Lines',
            'Magnetism in Rocks',
            'Paleomagnetism',
            'Magnetic Reversals',
            'Magnetometers',
            'Magnetic Anomalies',
            'Applications of Magnetic Surveys',
        ]),
    },
    {
        id: 'heat-flow-and-geodynamics',
        title: 'Heat Flow and Geodynamics',
        description: "Earth's internal heat, mantle processes, and the physical basis of tectonic motion.",
        units: (0, createStructuredSubject_1.structuredUnits)([
            "Earth's Internal Heat",
            'Heat Transfer in Earth',
            'Geothermal Gradient',
            'Mantle Convection',
            'Lithosphere and Asthenosphere',
            'Plate Driving Forces',
            'Rheology of Earth Materials',
            'Geodynamic Modeling Basics',
        ]),
    },
    {
        id: 'electrical-and-electromagnetic-methods',
        title: 'Electrical and Electromagnetic Methods',
        description: 'Subsurface investigation using electrical conductivity and electromagnetic response.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Electrical Properties of Earth Materials',
            'Resistivity Methods',
            'Induced Polarization',
            'Electromagnetic Surveys',
            'Magnetotellurics',
            'Ground Penetrating Radar',
            'Borehole Geophysics',
            'Environmental and Resource Applications',
        ]),
    },
    {
        id: 'applied-and-exploration-geophysics',
        title: 'Applied and Exploration Geophysics',
        description: 'Geophysical methods used in natural resources, environmental work, engineering, and hazard analysis.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Exploration Strategy',
            'Resource Geophysics',
            'Engineering Geophysics',
            'Environmental Geophysics',
            'Groundwater Investigations',
            'Volcanic and Tectonic Monitoring',
            'Remote Sensing in Geophysics',
            'Integrated Geophysical Interpretation',
        ]),
    },
];
const built = (0, createStructuredSubject_1.createStructuredSubject)({
    id: 'geophysics',
    title: 'Geophysics',
    description: 'Local-first geophysics content spanning seismic, gravity, magnetic, thermal, electrical, and applied Earth-physics methods.',
    tagline: 'Study Earth structure and subsurface interpretation through quantitative physical methods.',
    accent: 'cobalt',
    practitionerPlural: 'geophysicists',
    topics,
    accentCycle: createStructuredSubject_1.defaultSubjectAccentCycle,
});
exports.geophysicsSubject = built.subject;
exports.geophysicsTopics = built.topics;
exports.geophysicsUnits = built.units;
exports.geophysicsAccentSources = built.accentSources;
