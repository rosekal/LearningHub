import {
  createStructuredSubject,
  defaultSubjectAccentCycle,
  structuredUnits,
  type StructuredTopicSeed,
} from '@/content/subjects/shared/createStructuredSubject';

const topics: StructuredTopicSeed[] = [
  {
    id: 'foundations-of-oceanography',
    title: 'Foundations of Oceanography',
    description:
      'Core concepts, history, methods, and systems-level understanding of the oceans as physical, chemical, biological, and geological environments.',
    units: structuredUnits([
      'What Is Oceanography?',
      'History of Ocean Exploration',
      'The Ocean as a System',
      'Ocean Basins Overview',
      'Tools and Methods in Ocean Science',
      'Human Dependence on the Ocean',
    ]),
  },
  {
    id: 'marine-geology',
    title: 'Marine Geology',
    description:
      'The structure of ocean basins, seafloor features, sediments, and tectonic processes beneath the oceans.',
    units: structuredUnits([
      'Ocean Basin Structure',
      'Continental Margins',
      'Mid-Ocean Ridges',
      'Deep-Sea Trenches',
      'Seafloor Spreading',
      'Marine Sediments',
      'Hydrothermal Vents',
      'Plate Tectonics and the Ocean Floor',
    ]),
  },
  {
    id: 'physical-oceanography',
    title: 'Physical Oceanography',
    description:
      'The motion, properties, and circulation of seawater across local and global scales.',
    units: structuredUnits([
      'Properties of Seawater',
      'Salinity and Temperature',
      'Density in the Ocean',
      'Waves',
      'Tides',
      'Surface Currents',
      'Deep Ocean Circulation',
      'Upwelling and Downwelling',
      'Ocean-Atmosphere Interaction',
    ]),
  },
  {
    id: 'chemical-oceanography',
    title: 'Chemical Oceanography',
    description:
      'The chemical composition of seawater, dissolved gases, nutrient cycles, and chemical exchange processes.',
    units: structuredUnits([
      'Composition of Seawater',
      'Dissolved Salts and Ions',
      'Ocean pH and Buffering',
      'Dissolved Gases in the Ocean',
      'Nutrient Cycles',
      'Carbon in the Ocean',
      'Ocean Acidification',
      'Chemical Tracers in Ocean Science',
    ]),
  },
  {
    id: 'biological-oceanography',
    title: 'Biological Oceanography',
    description:
      'Marine life, ocean ecosystems, food webs, productivity, and biological adaptation to marine environments.',
    units: structuredUnits([
      'Life in the Ocean',
      'Marine Microorganisms',
      'Phytoplankton and Primary Productivity',
      'Marine Food Webs',
      'Nekton, Plankton, and Benthos',
      'Coral Reefs',
      'Deep Sea Ecosystems',
      'Marine Biodiversity',
      'Biological Adaptation in the Ocean',
    ]),
  },
  {
    id: 'coastal-and-estuarine-systems',
    title: 'Coastal and Estuarine Systems',
    description:
      'Dynamic coastal environments where land, ocean, and atmosphere interact.',
    units: structuredUnits([
      'Coasts and Shorelines',
      'Beaches and Barrier Islands',
      'Estuaries',
      'Tides in Coastal Systems',
      'Coastal Erosion',
      'Sediment Transport Along Coasts',
      'Wetlands and Mangroves',
      'Coastal Hazards',
    ]),
  },
  {
    id: 'ocean-resources-and-human-impacts',
    title: 'Ocean Resources and Human Impacts',
    description:
      'Marine resources, pollution, climate impacts, fisheries, and stewardship of ocean environments.',
    units: structuredUnits([
      'Fisheries and Marine Resources',
      'Offshore Energy',
      'Marine Minerals',
      'Plastic and Chemical Pollution',
      'Eutrophication',
      'Climate Change and the Ocean',
      'Marine Conservation',
      'Ocean Governance and Policy',
    ]),
  },
];

const built = createStructuredSubject({
  id: 'oceanography',
  title: 'Oceanography',
  description:
    'Local-first oceanography content spanning marine systems, seafloor structure, circulation, chemistry, ecosystems, coasts, and human-ocean interaction.',
  tagline: 'Study the oceans through connected physical, chemical, biological, and geologic pathways.',
  accent: 'oxygen',
  practitionerPlural: 'oceanographers',
  topics,
  accentCycle: defaultSubjectAccentCycle,
});

export const oceanographySubject = built.subject;
export const oceanographyTopics = built.topics;
export const oceanographyUnits = built.units;
export const oceanographyAccentSources = built.accentSources;
