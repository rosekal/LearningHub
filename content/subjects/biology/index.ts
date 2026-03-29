import {
  createStructuredSubject,
  defaultSubjectAccentCycle,
  type StructuredTopicSeed,
} from '@/content/subjects/shared/createStructuredSubject';

const topics: StructuredTopicSeed[] = [
  {
    id: 'foundations-of-biology',
    title: 'Foundations of Biology',
    description:
      'Core biological principles, characteristics of life, levels of organization, and scientific investigation in biology.',
    units: [
      { title: 'What Is Biology?' },
      { title: 'Characteristics of Life' },
      { title: 'Levels of Biological Organization' },
      { title: 'Scientific Inquiry in Biology' },
      { title: 'Biological Data and Evidence' },
      { title: 'Themes of Modern Biology' },
    ],
  },
  {
    id: 'cell-biology',
    title: 'Cell Biology',
    description:
      'Cell structure, function, transport, signaling, and the organization of life at the cellular level.',
    units: [
      { title: 'Cell Theory' },
      { title: 'Prokaryotic and Eukaryotic Cells' },
      { title: 'Cell Membrane Structure' },
      { title: 'Membrane Transport' },
      { title: 'Organelles and Cell Function' },
      { title: 'Cytoskeleton and Cell Organization' },
      { title: 'Cell Communication' },
      { title: 'Cell Cycle' },
      { title: 'Mitosis' },
      { title: 'Meiosis Overview' },
    ],
  },
  {
    id: 'biomolecules-and-metabolism',
    title: 'Biomolecules and Metabolism',
    description:
      'The chemistry of life, biological macromolecules, enzymes, and cellular energy processes.',
    units: [
      { title: 'Water and Biological Systems' },
      { title: 'Carbohydrates' },
      { title: 'Lipids' },
      { title: 'Proteins' },
      { title: 'Nucleic Acids' },
      { title: 'Enzymes' },
      { title: 'ATP and Cellular Energy' },
      { title: 'Photosynthesis' },
      { title: 'Cellular Respiration' },
      { title: 'Fermentation' },
    ],
  },
  {
    id: 'genetics-and-heredity',
    title: 'Genetics and Heredity',
    description:
      'Inheritance, gene expression, DNA structure, and the transmission of traits across generations.',
    units: [
      { title: 'Mendelian Genetics' },
      { title: 'Probability and Punnett Squares' },
      { title: 'Chromosomes and Inheritance' },
      { title: 'DNA Structure' },
      { title: 'DNA Replication' },
      { title: 'Transcription' },
      { title: 'Translation' },
      { title: 'Gene Regulation' },
      { title: 'Mutations' },
      { title: 'Non-Mendelian Inheritance', aliases: ['Non Mendelian Inheritance'] },
    ],
  },
  {
    id: 'evolution',
    title: 'Evolution',
    description:
      'Mechanisms of evolutionary change, common ancestry, adaptation, and the history of life.',
    units: [
      { title: 'Evidence for Evolution' },
      { title: 'Natural Selection' },
      { title: 'Adaptation' },
      { title: 'Speciation' },
      { title: 'Genetic Drift' },
      { title: 'Gene Flow' },
      { title: 'Evolutionary Trees and Cladistics' },
      { title: 'Origins of Life Overview' },
      { title: 'Evolution of Major Groups' },
    ],
  },
  {
    id: 'diversity-of-life',
    title: 'Diversity of Life',
    description:
      'Classification of organisms and the major groups of life across bacteria, archaea, protists, fungi, plants, and animals.',
    units: [
      { title: 'Taxonomy and Classification' },
      { title: 'Domains of Life' },
      { title: 'Bacteria' },
      { title: 'Archaea' },
      { title: 'Protists' },
      { title: 'Fungi' },
      { title: 'Plant Diversity' },
      { title: 'Invertebrates' },
      { title: 'Vertebrates' },
    ],
  },
  {
    id: 'plant-biology',
    title: 'Plant Biology',
    description:
      'Plant structure, transport, reproduction, and the biological processes that support plant life.',
    units: [
      { title: 'Plant Cells and Tissues' },
      { title: 'Roots, Stems, and Leaves' },
      { title: 'Vascular Transport' },
      { title: 'Photosynthesis in Plants' },
      { title: 'Plant Hormones' },
      { title: 'Plant Reproduction' },
      { title: 'Seeds, Flowers, and Fruits' },
      { title: 'Plant Responses to the Environment' },
    ],
  },
  {
    id: 'animal-form-and-function',
    title: 'Animal Form and Function',
    description:
      'Body systems, tissue organization, regulation, and how animals maintain homeostasis.',
    units: [
      { title: 'Animal Tissues' },
      { title: 'Homeostasis' },
      { title: 'Digestive System' },
      { title: 'Circulatory System' },
      { title: 'Respiratory System' },
      { title: 'Excretory System' },
      { title: 'Nervous System' },
      { title: 'Endocrine System' },
      { title: 'Musculoskeletal System' },
      { title: 'Immune System' },
      { title: 'Reproductive System' },
    ],
  },
  {
    id: 'ecology',
    title: 'Ecology',
    description:
      'Interactions between organisms and environments, population dynamics, ecosystems, and energy flow.',
    units: [
      { title: 'Ecology Foundations' },
      { title: 'Populations' },
      { title: 'Communities' },
      { title: 'Ecosystems' },
      { title: 'Food Chains and Food Webs' },
      { title: 'Energy Flow' },
      { title: 'Biogeochemical Cycles' },
      { title: 'Biomes' },
      { title: 'Species Interactions' },
      { title: 'Ecological Succession' },
    ],
  },
  {
    id: 'human-biology-and-health',
    title: 'Human Biology and Health',
    description:
      'Human structure and function, disease, immunity, and biological foundations of health.',
    units: [
      { title: 'Human Cells and Tissues' },
      { title: 'Organ Systems Overview' },
      { title: 'Nutrition and Metabolism' },
      { title: 'Pathogens and Disease' },
      { title: 'Immune Response' },
      { title: 'Genetics and Health' },
      { title: 'Development and Reproduction' },
      { title: 'Public Health and Biology' },
    ],
  },
  {
    id: 'biotechnology',
    title: 'Biotechnology',
    description:
      'Modern biological techniques, genetic engineering, applied microbiology, and ethical issues in biological science.',
    units: [
      { title: 'DNA Technology' },
      { title: 'PCR and Sequencing' },
      { title: 'Genetic Engineering' },
      { title: 'CRISPR Basics' },
      { title: 'Cloning' },
      { title: 'Stem Cells' },
      { title: 'Microbiology Applications' },
      { title: 'Bioethics in Biology' },
    ],
  },
];

const built = createStructuredSubject({
  id: 'biology',
  title: 'Biology',
  description:
    'Local-first biology content spanning cells, genetics, evolution, ecology, organismal systems, and biotechnology.',
  tagline: 'Read, review, and quiz through a broad biology study sequence.',
  accent: 'beryllium',
  practitionerPlural: 'biologists',
  topics,
  accentCycle: defaultSubjectAccentCycle,
});

export const biologySubject = built.subject;
export const biologyTopics = built.topics;
export const biologyUnits = built.units;
export const biologyAccentSources = built.accentSources;
