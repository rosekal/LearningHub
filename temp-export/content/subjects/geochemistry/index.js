"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geochemistryAccentSources = exports.geochemistryUnits = exports.geochemistryTopics = exports.geochemistrySubject = void 0;
const createStructuredSubject_1 = require("@/content/subjects/shared/createStructuredSubject");
const topics = [
    {
        id: 'foundations-of-geochemistry',
        title: 'Foundations of Geochemistry',
        description: 'Chemical principles applied to Earth materials, processes, and reservoirs.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'What Is Geochemistry?',
            "Earth's Chemical Reservoirs",
            'Chemical Elements in Earth Systems',
            'Geochemical Cycles',
            'Mass Balance in Geochemistry',
            'Sampling and Geochemical Data',
        ]),
    },
    {
        id: 'thermodynamics-and-aqueous-geochemistry',
        title: 'Thermodynamics and Aqueous Geochemistry',
        description: 'Chemical equilibria, aqueous reactions, and the behavior of dissolved species in natural systems.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Chemical Equilibrium in Natural Systems',
            'Acids, Bases, and pH in Geochemistry',
            'Solubility and Precipitation',
            'Redox in Aqueous Systems',
            'Complexation',
            'Carbonate Chemistry',
            'Water-Rock Interaction',
            'Geochemical Modeling Basics',
        ]),
    },
    {
        id: 'isotope-geochemistry',
        title: 'Isotope Geochemistry',
        description: 'Stable and radiogenic isotopes as tracers of age, source, and process in Earth systems.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Isotopes and Atomic Variation',
            'Stable Isotopes',
            'Radiogenic Isotopes',
            'Fractionation Processes',
            'Geochronology Basics',
            'Isotopes in Climate Reconstruction',
            'Isotopes in Hydrology',
            'Isotopes in Petrology',
        ]),
    },
    {
        id: 'magmatic-and-metamorphic-geochemistry',
        title: 'Magmatic and Metamorphic Geochemistry',
        description: 'Chemical processes in magma generation, crystallization, and rock transformation.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Major and Trace Elements',
            'Partial Melting',
            'Fractional Crystallization',
            'Magma Differentiation',
            'Element Partitioning',
            'Metamorphic Reactions',
            'Fluid-Rock Interaction in Metamorphism',
            'Geochemistry of Igneous Suites',
        ]),
    },
    {
        id: 'sedimentary-and-surface-geochemistry',
        title: 'Sedimentary and Surface Geochemistry',
        description: 'Chemical weathering, sediment composition, diagenesis, and surface chemical cycles.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Chemical Weathering',
            'Sediment Geochemistry',
            'Diagenesis',
            'Soil Geochemistry',
            'River and Ocean Geochemistry',
            'Carbon Cycle in Surface Systems',
            'Nutrient Cycling',
            'Environmental Surface Chemistry',
        ]),
    },
    {
        id: 'environmental-and-applied-geochemistry',
        title: 'Environmental and Applied Geochemistry',
        description: 'Contaminants, resource exploration, environmental monitoring, and practical geochemical analysis.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Trace Metals in the Environment',
            'Contaminant Transport',
            'Acid Mine Drainage',
            'Geochemistry of Groundwater',
            'Exploration Geochemistry',
            'Geochemical Mapping',
            'Forensic and Applied Geochemistry',
            'Risk Assessment in Geochemistry',
        ]),
    },
];
const built = (0, createStructuredSubject_1.createStructuredSubject)({
    id: 'geochemistry',
    title: 'Geochemistry',
    description: 'Local-first geochemistry content spanning Earth reservoirs, aqueous chemistry, isotopes, petrologic processes, surface systems, and environmental applications.',
    tagline: 'Study Earth chemistry through linked reservoir, reaction, isotope, and environmental pathways.',
    accent: 'copper',
    practitionerPlural: 'geochemists',
    topics,
    accentCycle: createStructuredSubject_1.defaultSubjectAccentCycle,
});
exports.geochemistrySubject = built.subject;
exports.geochemistryTopics = built.topics;
exports.geochemistryUnits = built.units;
exports.geochemistryAccentSources = built.accentSources;
