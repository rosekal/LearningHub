"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meteorologyAccentSources = exports.meteorologyUnits = exports.meteorologyTopics = exports.meteorologySubject = void 0;
const createStructuredSubject_1 = require("@/content/subjects/shared/createStructuredSubject");
const topics = [
    {
        id: 'foundations-of-meteorology',
        title: 'Foundations of Meteorology',
        description: 'Basic atmospheric concepts, weather science, measurement, and the role of the atmosphere in the Earth system.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'What Is Meteorology?',
            'Composition of the Atmosphere',
            'Layers of the Atmosphere',
            'Weather vs Climate',
            'Observing the Atmosphere',
            'Meteorological Data and Maps',
        ]),
    },
    {
        id: 'atmospheric-physics',
        title: 'Atmospheric Physics',
        description: 'Physical principles that govern atmospheric temperature, pressure, radiation, and motion.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Solar Radiation',
            'Energy Balance of Earth',
            'Temperature in the Atmosphere',
            'Pressure and Pressure Gradients',
            'Density and Stability',
            'Heat Transfer in the Atmosphere',
            'Atmospheric Thermodynamics',
            'Adiabatic Processes',
        ]),
    },
    {
        id: 'moisture-clouds-and-precipitation',
        title: 'Moisture, Clouds, and Precipitation',
        description: 'Water vapor, condensation, cloud formation, and the mechanisms that produce precipitation.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Humidity and Water Vapor',
            'Condensation and Saturation',
            'Cloud Formation',
            'Cloud Types',
            'Fog and Dew',
            'Precipitation Processes',
            'Rain, Snow, and Hail',
            'Atmospheric Stability and Clouds',
        ]),
    },
    {
        id: 'winds-and-global-circulation',
        title: 'Winds and Global Circulation',
        description: 'Air motion from local winds to planetary-scale circulation patterns.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Wind Basics',
            'Pressure Gradient Force',
            'Coriolis Effect',
            'Geostrophic Wind',
            'Global Circulation Cells',
            'Jet Streams',
            'Local Winds',
            'Monsoons',
        ]),
    },
    {
        id: 'weather-systems',
        title: 'Weather Systems',
        description: 'Air masses, fronts, cyclones, anticyclones, and midlatitude weather dynamics.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Air Masses',
            'Fronts',
            'Midlatitude Cyclones',
            'Anticyclones',
            'Weather Map Interpretation',
            'Forecasting Synoptic Systems',
            'Storm Tracks',
            'Seasonal Weather Patterns',
        ]),
    },
    {
        id: 'severe-weather',
        title: 'Severe Weather',
        description: 'Thunderstorms, tornadoes, hurricanes, and hazardous atmospheric events.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Thunderstorms',
            'Lightning',
            'Tornadoes',
            'Hurricanes and Tropical Cyclones',
            'Flooding and Heavy Rain',
            'Blizzards and Winter Storms',
            'Heat Waves and Cold Waves',
            'Severe Weather Forecasting',
        ]),
    },
    {
        id: 'climate-and-climate-systems',
        title: 'Climate and Climate Systems',
        description: 'Longer-term atmospheric patterns, variability, and climate change.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Climate Controls',
            'Climate Zones',
            'Ocean-Atmosphere Climate Links',
            'ENSO Basics',
            'Paleoclimate',
            'Climate Change Science',
            'Atmospheric Greenhouse Effect',
            'Climate Modeling Basics',
        ]),
    },
];
const built = (0, createStructuredSubject_1.createStructuredSubject)({
    id: 'meteorology',
    title: 'Meteorology',
    description: 'Local-first meteorology content spanning atmospheric structure, moisture, circulation, weather systems, severe events, and climate dynamics.',
    tagline: 'Read weather and climate science through connected atmospheric study paths.',
    accent: 'argon',
    practitionerPlural: 'meteorologists',
    topics,
    accentCycle: createStructuredSubject_1.defaultSubjectAccentCycle,
});
exports.meteorologySubject = built.subject;
exports.meteorologyTopics = built.topics;
exports.meteorologyUnits = built.units;
exports.meteorologyAccentSources = built.accentSources;
