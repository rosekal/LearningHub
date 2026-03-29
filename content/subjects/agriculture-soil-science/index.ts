import {
  createStructuredSubject,
  defaultSubjectAccentCycle,
  structuredUnits,
  type StructuredTopicSeed,
} from '@/content/subjects/shared/createStructuredSubject';

const topics: StructuredTopicSeed[] = [
  {
    id: 'foundations-of-agriculture',
    title: 'Foundations of Agriculture',
    description:
      'Core agricultural systems, crop production, environmental constraints, and the science of food and land management.',
    units: structuredUnits([
      'What Is Agriculture?',
      'Agricultural Systems',
      'Crop vs Livestock Systems',
      'Climate and Agriculture',
      'Inputs and Productivity',
      'Sustainability in Agriculture',
    ]),
  },
  {
    id: 'foundations-of-soil-science',
    title: 'Foundations of Soil Science',
    description:
      'Soil formation, structure, composition, and the role of soils in agricultural systems.',
    units: structuredUnits([
      'What Is Soil?',
      'Soil Formation',
      'Soil Horizons',
      'Soil Texture',
      'Soil Structure',
      'Soil Organic Matter',
      'Soil Water',
      'Soil Air and Root Environment',
    ]),
  },
  {
    id: 'soil-chemistry-and-fertility',
    title: 'Soil Chemistry and Fertility',
    description:
      'Nutrients, pH, cation exchange, and chemical factors that influence crop growth.',
    units: structuredUnits([
      'Soil pH',
      'Macronutrients',
      'Micronutrients',
      'Cation Exchange Capacity',
      'Salinity and Sodicity',
      'Fertilizers',
      'Nutrient Cycling in Soils',
      'Soil Testing and Fertility Management',
    ]),
  },
  {
    id: 'soil-biology-and-ecology',
    title: 'Soil Biology and Ecology',
    description:
      'Microbial processes, decomposition, soil food webs, and biological controls on soil health.',
    units: structuredUnits([
      'Soil Microorganisms',
      'Decomposition',
      'Nitrogen Fixation',
      'Mycorrhizae',
      'Soil Fauna',
      'Soil Carbon Cycling',
      'Biological Indicators of Soil Health',
      'Rhizosphere Processes',
    ]),
  },
  {
    id: 'crop-science',
    title: 'Crop Science',
    description:
      'Plant growth, crop development, production systems, and agronomic decision making.',
    units: structuredUnits([
      'Crop Growth Stages',
      'Photosynthesis and Yield',
      'Plant Nutrition in Agriculture',
      'Crop Rotation',
      'Cover Crops',
      'Irrigation Basics',
      'Pest and Weed Management',
      'Harvest and Postharvest Basics',
    ]),
  },
  {
    id: 'soil-and-water-management',
    title: 'Soil and Water Management',
    description:
      'Management of water, erosion, drainage, and conservation in agricultural landscapes.',
    units: structuredUnits([
      'Soil Erosion',
      'Conservation Tillage',
      'Water Infiltration',
      'Drainage',
      'Irrigation Efficiency',
      'Salinity Management',
      'Watersheds and Agriculture',
      'Soil Conservation Planning',
    ]),
  },
  {
    id: 'sustainable-and-applied-agriculture',
    title: 'Sustainable and Applied Agriculture',
    description:
      'Applied farming systems, resilience, economics, and sustainable land stewardship.',
    units: structuredUnits([
      'Sustainable Agriculture',
      'Precision Agriculture',
      'Organic Farming Basics',
      'Regenerative Agriculture',
      'Agroecology',
      'Agricultural Policy Basics',
      'Climate Resilience in Farming',
      'Farm Resource Management',
    ]),
  },
];

const built = createStructuredSubject({
  id: 'agriculture-soil-science',
  title: 'Agriculture / Soil Science',
  description:
    'Local-first agriculture and soil science content spanning farming systems, soil processes, crop science, water management, and sustainability.',
  tagline: 'Study agricultural systems through linked soil, crop, water, and stewardship pathways.',
  accent: 'calcium',
  practitionerPlural: 'agricultural scientists',
  topics,
  accentCycle: defaultSubjectAccentCycle,
});

export const agricultureSoilScienceSubject = built.subject;
export const agricultureSoilScienceTopics = built.topics;
export const agricultureSoilScienceUnits = built.units;
export const agricultureSoilScienceAccentSources = built.accentSources;
