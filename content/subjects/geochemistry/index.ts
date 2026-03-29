import {
  createStructuredSubject,
  defaultSubjectAccentCycle,
  structuredUnits,
  type StructuredTopicSeed,
} from '@/content/subjects/shared/createStructuredSubject';

const topics: StructuredTopicSeed[] = [
  {
    id: 'foundations-of-geochemistry',
    title: 'Foundations of Geochemistry',
    description:
      'Chemical principles applied to Earth materials, processes, and reservoirs.',
    units: structuredUnits([
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
    description:
      'Chemical equilibria, aqueous reactions, and the behavior of dissolved species in natural systems.',
    units: structuredUnits([
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
    description:
      'Stable and radiogenic isotopes as tracers of age, source, and process in Earth systems.',
    units: structuredUnits([
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
    description:
      'Chemical processes in magma generation, crystallization, and rock transformation.',
    units: structuredUnits([
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
    description:
      'Chemical weathering, sediment composition, diagenesis, and surface chemical cycles.',
    units: structuredUnits([
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
    description:
      'Contaminants, resource exploration, environmental monitoring, and practical geochemical analysis.',
    units: structuredUnits([
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

const built = createStructuredSubject({
  id: 'geochemistry',
  title: 'Geochemistry',
  description:
    'Local-first geochemistry content spanning Earth reservoirs, aqueous chemistry, isotopes, petrologic processes, surface systems, and environmental applications.',
  tagline: 'Study Earth chemistry through linked reservoir, reaction, isotope, and environmental pathways.',
  accent: 'copper',
  practitionerPlural: 'geochemists',
  topics,
  accentCycle: defaultSubjectAccentCycle,
});

export const geochemistrySubject = built.subject;
export const geochemistryTopics = built.topics;
export const geochemistryUnits = built.units;
export const geochemistryAccentSources = built.accentSources;
