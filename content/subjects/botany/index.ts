import {
  createStructuredSubject,
  defaultSubjectAccentCycle,
  structuredUnits,
  type StructuredTopicSeed,
} from '@/content/subjects/shared/createStructuredSubject';

const topics: StructuredTopicSeed[] = [
  {
    id: 'foundations-of-botany',
    title: 'Foundations of Botany',
    description:
      'Core concepts in plant science, plant diversity, and the role of plants in ecosystems and human society.',
    units: structuredUnits([
      'What Is Botany?',
      'Plant Characteristics',
      'Major Plant Groups',
      'Plants and Ecosystems',
      'Plants and Human Society',
      'Methods in Plant Science',
    ]),
  },
  {
    id: 'plant-structure-and-anatomy',
    title: 'Plant Structure and Anatomy',
    description:
      'Internal and external organization of plants, tissues, organs, and structural specialization.',
    units: structuredUnits([
      'Plant Cells',
      'Meristems',
      'Dermal, Ground, and Vascular Tissues',
      'Roots',
      'Stems',
      'Leaves',
      'Flowers',
      'Fruits and Seeds',
      'Secondary Growth',
    ]),
  },
  {
    id: 'plant-physiology',
    title: 'Plant Physiology',
    description:
      'Water transport, photosynthesis, respiration, signaling, and the physiological basis of plant function.',
    units: structuredUnits([
      'Water Relations in Plants',
      'Xylem and Phloem Transport',
      'Photosynthesis',
      'Respiration in Plants',
      'Mineral Nutrition',
      'Plant Hormones',
      'Plant Signaling',
      'Stress Physiology',
    ]),
  },
  {
    id: 'plant-reproduction-and-development',
    title: 'Plant Reproduction and Development',
    description:
      'Life cycles, alternation of generations, pollination, seed formation, and developmental control.',
    units: structuredUnits([
      'Plant Life Cycles',
      'Alternation of Generations',
      'Reproduction in Non-Seed Plants',
      'Gymnosperm Reproduction',
      'Angiosperm Reproduction',
      'Pollination',
      'Seed Development',
      'Germination',
      'Plant Developmental Patterns',
    ]),
  },
  {
    id: 'plant-diversity-and-evolution',
    title: 'Plant Diversity and Evolution',
    description:
      'The evolutionary history of plants and the major lineages across land plant diversity.',
    units: structuredUnits([
      'Origins of Plants',
      'Bryophytes',
      'Ferns and Seedless Vascular Plants',
      'Gymnosperms',
      'Angiosperms',
      'Plant Phylogeny Basics',
      'Evolution of Plant Adaptations',
      'Coevolution with Animals',
    ]),
  },
  {
    id: 'plant-ecology',
    title: 'Plant Ecology',
    description:
      'Interactions between plants and environment across populations, communities, and ecosystems.',
    units: structuredUnits([
      'Plants and Climate',
      'Plant Populations',
      'Plant Communities',
      'Competition and Facilitation',
      'Herbivory and Defense',
      'Plant-Soil Interactions',
      'Succession and Vegetation Change',
      'Biomes and Vegetation Patterns',
    ]),
  },
  {
    id: 'economic-botany-and-applied-plant-science',
    title: 'Economic Botany and Applied Plant Science',
    description:
      'Human uses of plants in agriculture, medicine, materials, conservation, and biotechnology.',
    units: structuredUnits([
      'Crops and Domestication',
      'Forest Products',
      'Medicinal Plants',
      'Plant Breeding Basics',
      'Plant Biotechnology',
      'Invasive Plants',
      'Conservation Botany',
      'Plants in Sustainable Systems',
    ]),
  },
];

const built = createStructuredSubject({
  id: 'botany',
  title: 'Botany',
  description:
    'Local-first botany content spanning plant structure, physiology, reproduction, diversity, ecology, and applied plant science.',
  tagline: 'Study plant life through connected anatomy, physiology, evolution, ecology, and applied pathways.',
  accent: 'chlorine',
  practitionerPlural: 'botanists',
  topics,
  accentCycle: defaultSubjectAccentCycle,
});

export const botanySubject = built.subject;
export const botanyTopics = built.topics;
export const botanyUnits = built.units;
export const botanyAccentSources = built.accentSources;
