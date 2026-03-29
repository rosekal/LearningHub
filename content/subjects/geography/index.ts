import {
  createStructuredSubject,
  defaultSubjectAccentCycle,
  type StructuredTopicSeed,
} from '@/content/subjects/shared/createStructuredSubject';

const topics: StructuredTopicSeed[] = [
  {
    id: 'foundations-of-geography',
    title: 'Foundations of Geography',
    description:
      'The basic concepts, tools, and perspectives used to study places, spaces, environments, and human activity.',
    units: [
      { title: 'What Is Geography?' },
      { title: 'Physical vs Human Geography' },
      { title: 'Spatial Thinking' },
      { title: 'Maps and Scale' },
      { title: 'Geographic Data' },
      { title: 'Regions and Place' },
    ],
  },
  {
    id: 'cartography-and-geospatial-tools',
    title: 'Cartography and Geospatial Tools',
    description:
      'Mapmaking, geographic representation, GIS, remote sensing, and spatial analysis.',
    units: [
      { title: 'Types of Maps' },
      { title: 'Latitude and Longitude' },
      { title: 'Map Projections' },
      { title: 'Topographic Maps' },
      { title: 'Thematic Maps' },
      { title: 'GIS Basics' },
      { title: 'Remote Sensing' },
      { title: 'Interpreting Spatial Data' },
    ],
  },
  {
    id: 'earth-systems-and-physical-geography',
    title: 'Earth Systems and Physical Geography',
    description:
      'The atmosphere, hydrosphere, lithosphere, and biosphere as interacting components of the Earth system.',
    units: [
      { title: 'Earth System Overview' },
      { title: 'Atmosphere' },
      { title: 'Hydrosphere' },
      { title: 'Lithosphere' },
      { title: 'Biosphere' },
      { title: 'Energy Balance of Earth' },
      { title: 'Earth System Interactions' },
    ],
  },
  {
    id: 'weather-and-climate',
    title: 'Weather and Climate',
    description:
      'Atmospheric processes, climate systems, and the distribution of weather patterns across Earth.',
    units: [
      { title: 'Weather vs Climate' },
      { title: 'Temperature' },
      { title: 'Air Pressure and Wind' },
      { title: 'Humidity and Clouds' },
      { title: 'Precipitation' },
      { title: 'Storm Systems' },
      { title: 'Climate Zones' },
      { title: 'Climate Change Basics' },
    ],
  },
  {
    id: 'landforms-and-surface-processes',
    title: 'Landforms and Surface Processes',
    description:
      'The physical shaping of Earth’s surface through tectonics, erosion, rivers, glaciers, and coasts.',
    units: [
      { title: 'Major Landforms' },
      { title: 'Tectonic Landforms' },
      { title: 'Weathering and Erosion' },
      { title: 'River Systems' },
      { title: 'Glacial Landscapes' },
      { title: 'Desert Landscapes' },
      { title: 'Coastal Landforms' },
      { title: 'Soil and Surface Processes' },
    ],
  },
  {
    id: 'biogeography-and-ecosystems',
    title: 'Biogeography and Ecosystems',
    description:
      'The spatial distribution of living systems and the relationships between ecosystems and environment.',
    units: [
      { title: 'Biomes of the World' },
      { title: 'Ecosystems and Geography' },
      { title: 'Species Distribution' },
      { title: 'Vegetation Patterns' },
      { title: 'Human Impacts on Ecosystems' },
      { title: 'Conservation Geography' },
    ],
  },
  {
    id: 'population-geography',
    title: 'Population Geography',
    description:
      'Population patterns, migration, settlement, and demographic change across regions.',
    units: [
      { title: 'Population Distribution' },
      { title: 'Population Growth' },
      { title: 'Demographic Transition Model' },
      { title: 'Migration' },
      { title: 'Urbanization' },
      { title: 'Rural and Urban Settlements' },
      { title: 'Population Policy and Planning' },
    ],
  },
  {
    id: 'cultural-geography',
    title: 'Cultural Geography',
    description:
      'Language, religion, identity, cultural landscapes, and the geographic expression of human societies.',
    units: [
      { title: 'Culture and Place' },
      { title: 'Language Geography' },
      { title: 'Religion and Space' },
      { title: 'Ethnicity and Identity' },
      { title: 'Cultural Landscapes' },
      { title: 'Diffusion of Culture' },
      { title: 'Globalization and Culture' },
    ],
  },
  {
    id: 'political-geography',
    title: 'Political Geography',
    description:
      'Territory, borders, states, geopolitics, and the spatial organization of political power.',
    units: [
      { title: 'States and Nations' },
      { title: 'Boundaries and Borders' },
      { title: 'Geopolitics' },
      { title: 'Supranational Organizations' },
      { title: 'Electoral Geography' },
      { title: 'Conflict and Territory' },
      { title: 'Political Maps and Power' },
    ],
  },
  {
    id: 'economic-geography',
    title: 'Economic Geography',
    description:
      'Production, trade, industry, development, and the spatial organization of economic systems.',
    units: [
      { title: 'Economic Activity and Space' },
      { title: 'Agriculture and Land Use' },
      { title: 'Industrial Geography' },
      { title: 'Trade and Global Networks' },
      { title: 'Transportation Geography' },
      { title: 'Development and Inequality' },
      { title: 'Globalization and Supply Chains' },
    ],
  },
  {
    id: 'urban-geography',
    title: 'Urban Geography',
    description:
      'Cities, urban systems, land use, infrastructure, and the spatial form of urban environments.',
    units: [
      { title: 'Origins of Cities' },
      { title: 'Urban Land Use' },
      { title: 'City Structure Models' },
      { title: 'Transportation in Cities' },
      { title: 'Housing and Segregation' },
      { title: 'Infrastructure and Services' },
      { title: 'Sustainable Cities' },
    ],
  },
  {
    id: 'environmental-geography',
    title: 'Environmental Geography',
    description:
      'Human-environment interaction, resource use, environmental risk, and sustainability.',
    units: [
      { title: 'Resources and Resource Management' },
      { title: 'Water Geography' },
      { title: 'Energy Geography' },
      { title: 'Natural Hazards' },
      { title: 'Environmental Degradation' },
      { title: 'Sustainability' },
      { title: 'Climate Risk and Adaptation' },
    ],
  },
  {
    id: 'regional-geography',
    title: 'Regional Geography',
    description:
      'Comparative study of world regions through physical, cultural, political, and economic patterns.',
    units: [
      { title: 'North America' },
      { title: 'Latin America' },
      { title: 'Europe' },
      { title: 'Sub-Saharan Africa', aliases: ['Sub Saharan Africa'] },
      { title: 'North Africa and Southwest Asia' },
      { title: 'South Asia' },
      { title: 'East and Southeast Asia' },
      { title: 'Australia and Oceania' },
      { title: 'Polar Regions' },
    ],
  },
];

const built = createStructuredSubject({
  id: 'geography',
  title: 'Geography',
  description:
    'Local-first geography content spanning physical systems, human geography, regions, mapping, population, cities, and environmental change.',
  tagline: 'Read, review, and quiz through a broad geography study sequence.',
  accent: 'magnesium',
  practitionerPlural: 'geographers',
  topics,
  accentCycle: defaultSubjectAccentCycle,
});

export const geographySubject = built.subject;
export const geographyTopics = built.topics;
export const geographyUnits = built.units;
export const geographyAccentSources = built.accentSources;
