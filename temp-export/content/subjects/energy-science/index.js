"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.energyScienceAccentSources = exports.energyScienceUnits = exports.energyScienceTopics = exports.energyScienceSubject = void 0;
const createStructuredSubject_1 = require("@/content/subjects/shared/createStructuredSubject");
const topics = [
    {
        id: 'foundations-of-energy-science',
        title: 'Foundations of Energy Science',
        description: 'Core concepts of energy, power, efficiency, resources, and the physical basis of energy systems.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'What Is Energy?',
            'Forms of Energy',
            'Power and Efficiency',
            'Energy Conversion',
            'Energy Systems Overview',
            'Energy Use in Society',
        ]),
    },
    {
        id: 'fossil-and-conventional-energy-resources',
        title: 'Fossil and Conventional Energy Resources',
        description: 'Traditional energy resources, extraction, conversion, and environmental implications.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Coal',
            'Oil',
            'Natural Gas',
            'Fossil Fuel Extraction',
            'Thermal Power Plants',
            'Combustion Basics',
            'Environmental Impacts of Fossil Energy',
            'Energy Security and Supply',
        ]),
    },
    {
        id: 'solar-energy',
        title: 'Solar Energy',
        description: 'Solar radiation, photovoltaics, solar thermal systems, and deployment considerations.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Solar Radiation',
            'Photovoltaic Principles',
            'Solar Panels and Modules',
            'Solar Thermal Energy',
            'Grid-Connected Solar',
            'Off-Grid Solar Systems',
            'Energy Storage for Solar',
            'Solar Deployment Challenges',
        ]),
    },
    {
        id: 'wind-energy',
        title: 'Wind Energy',
        description: 'Wind resources, turbine design, power generation, and system integration.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Wind as an Energy Resource',
            'Wind Turbine Basics',
            'Power from Wind',
            'Wind Farm Design',
            'Offshore Wind',
            'Grid Integration of Wind',
            'Environmental Considerations in Wind Energy',
            'Wind Energy Economics Basics',
        ]),
    },
    {
        id: 'hydropower-and-marine-energy',
        title: 'Hydropower and Marine Energy',
        description: 'Energy from flowing water, tides, waves, and marine systems.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Hydropower Basics',
            'Dams and Reservoir Systems',
            'Run-of-River Systems',
            'Pumped Storage',
            'Tidal Energy',
            'Wave Energy',
            'Ocean Thermal Energy Concepts',
            'Environmental Impacts of Water-Based Energy',
        ]),
    },
    {
        id: 'geothermal-nuclear-and-emerging-energy',
        title: 'Geothermal, Nuclear, and Emerging Energy',
        description: 'Alternative and advanced energy systems beyond the most common renewable technologies.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Geothermal Energy',
            'Geothermal Systems and Resources',
            'Nuclear Fission Basics',
            'Nuclear Power Systems',
            'Hydrogen as an Energy Carrier',
            'Bioenergy Basics',
            'Fuel Cells',
            'Emerging Energy Technologies',
        ]),
    },
    {
        id: 'energy-systems-storage-and-policy',
        title: 'Energy Systems, Storage, and Policy',
        description: 'Integrated energy systems, storage technologies, transmission, and the policy context of energy transitions.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Electrical Grids',
            'Energy Storage Systems',
            'Batteries Basics',
            'Demand and Load Management',
            'Decarbonization Pathways',
            'Energy Policy Basics',
            'Life Cycle Assessment in Energy',
            'Resource Constraints and Energy Transition',
        ]),
    },
];
const built = (0, createStructuredSubject_1.createStructuredSubject)({
    id: 'energy-science',
    title: 'Energy Science (Renewables & Resources)',
    description: 'Local-first energy science content spanning resources, conversion, renewables, storage, policy, and energy-system transitions.',
    tagline: 'Study energy through connected physical, technological, and policy pathways.',
    accent: 'sulfur',
    practitionerPlural: 'energy scientists',
    topics,
    accentCycle: createStructuredSubject_1.defaultSubjectAccentCycle,
});
exports.energyScienceSubject = built.subject;
exports.energyScienceTopics = built.topics;
exports.energyScienceUnits = built.units;
exports.energyScienceAccentSources = built.accentSources;
