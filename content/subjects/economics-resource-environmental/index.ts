import {
  createStructuredSubject,
  defaultSubjectAccentCycle,
  structuredUnits,
  type StructuredTopicSeed,
} from '@/content/subjects/shared/createStructuredSubject';

const topics: StructuredTopicSeed[] = [
  {
    id: 'foundations-of-economics',
    title: 'Foundations of Economics',
    description:
      'Core economic concepts, incentives, scarcity, and decision making relevant to environmental and resource systems.',
    units: structuredUnits([
      'What Is Economics?',
      'Scarcity and Choice',
      'Opportunity Cost',
      'Supply and Demand',
      'Markets and Incentives',
      'Efficiency and Equity',
    ]),
  },
  {
    id: 'resource-economics',
    title: 'Resource Economics',
    description:
      'Extraction, allocation, scarcity, and intertemporal decisions regarding natural resources.',
    units: structuredUnits([
      'What Is Resource Economics?',
      'Renewable vs Nonrenewable Resources',
      'Extraction and Scarcity',
      'Property Rights and Resource Use',
      'Resource Rent',
      'Hotelling Rule Basics',
      'Fisheries and Common Resources',
      'Forest and Land Resource Economics',
    ]),
  },
  {
    id: 'environmental-economics',
    title: 'Environmental Economics',
    description:
      'Externalities, public goods, environmental valuation, and economic tools for environmental management.',
    units: structuredUnits([
      'Externalities',
      'Public Goods',
      'Common-Pool Resources',
      'Pollution Economics',
      'Environmental Valuation',
      'Cost-Benefit Analysis',
      'Marginal Abatement Concepts',
      'Environmental Policy Instruments',
    ]),
  },
  {
    id: 'climate-economics',
    title: 'Climate Economics',
    description:
      'Economic analysis of climate change, mitigation, adaptation, and long-term risk.',
    units: structuredUnits([
      'Climate Change as an Economic Problem',
      'Damages and Risk',
      'Mitigation Economics',
      'Adaptation Economics',
      'Carbon Pricing',
      'Discounting Over Time',
      'Integrated Assessment Models',
      'Climate Policy Tradeoffs',
    ]),
  },
  {
    id: 'energy-and-natural-resource-markets',
    title: 'Energy and Natural Resource Markets',
    description:
      'Market structure, pricing, investment, and trade in energy and natural resource systems.',
    units: structuredUnits([
      'Energy Markets Basics',
      'Commodity Pricing',
      'Resource Trade',
      'Energy Demand and Supply',
      'Infrastructure and Investment',
      'Market Volatility',
      'Strategic Resources',
      'Energy Transition Economics',
    ]),
  },
  {
    id: 'sustainability-development-and-policy',
    title: 'Sustainability, Development, and Policy',
    description:
      'Long-term welfare, development, environmental justice, and policy design in coupled human-natural systems.',
    units: structuredUnits([
      'Sustainable Development',
      'Green Growth',
      'Environmental Justice',
      'Development and Resource Use',
      'Policy Design and Incentives',
      'Regulation vs Market Mechanisms',
      'International Environmental Agreements',
      'Economics of Conservation',
    ]),
  },
];

const built = createStructuredSubject({
  id: 'economics-resource-environmental',
  title: 'Economics (Resource / Environmental)',
  description:
    'Local-first economics content spanning resource use, environmental policy, climate tradeoffs, markets, and sustainability.',
  tagline: 'Study environmental and resource economics through incentives, markets, and long-horizon policy decisions.',
  accent: 'boron',
  practitionerPlural: 'economists',
  topics,
  accentCycle: defaultSubjectAccentCycle,
});

export const economicsResourceEnvironmentalSubject = built.subject;
export const economicsResourceEnvironmentalTopics = built.topics;
export const economicsResourceEnvironmentalUnits = built.units;
export const economicsResourceEnvironmentalAccentSources = built.accentSources;
