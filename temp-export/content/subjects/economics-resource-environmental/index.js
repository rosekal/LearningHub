"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.economicsResourceEnvironmentalAccentSources = exports.economicsResourceEnvironmentalUnits = exports.economicsResourceEnvironmentalTopics = exports.economicsResourceEnvironmentalSubject = void 0;
const createStructuredSubject_1 = require("@/content/subjects/shared/createStructuredSubject");
const topics = [
    {
        id: 'foundations-of-economics',
        title: 'Foundations of Economics',
        description: 'Core economic concepts, incentives, scarcity, and decision making relevant to environmental and resource systems.',
        units: (0, createStructuredSubject_1.structuredUnits)([
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
        description: 'Extraction, allocation, scarcity, and intertemporal decisions regarding natural resources.',
        units: (0, createStructuredSubject_1.structuredUnits)([
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
        description: 'Externalities, public goods, environmental valuation, and economic tools for environmental management.',
        units: (0, createStructuredSubject_1.structuredUnits)([
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
        description: 'Economic analysis of climate change, mitigation, adaptation, and long-term risk.',
        units: (0, createStructuredSubject_1.structuredUnits)([
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
        description: 'Market structure, pricing, investment, and trade in energy and natural resource systems.',
        units: (0, createStructuredSubject_1.structuredUnits)([
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
        description: 'Long-term welfare, development, environmental justice, and policy design in coupled human-natural systems.',
        units: (0, createStructuredSubject_1.structuredUnits)([
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
const built = (0, createStructuredSubject_1.createStructuredSubject)({
    id: 'economics-resource-environmental',
    title: 'Economics (Resource / Environmental)',
    description: 'Local-first economics content spanning resource use, environmental policy, climate tradeoffs, markets, and sustainability.',
    tagline: 'Study environmental and resource economics through incentives, markets, and long-horizon policy decisions.',
    accent: 'boron',
    practitionerPlural: 'economists',
    topics,
    accentCycle: createStructuredSubject_1.defaultSubjectAccentCycle,
});
exports.economicsResourceEnvironmentalSubject = built.subject;
exports.economicsResourceEnvironmentalTopics = built.topics;
exports.economicsResourceEnvironmentalUnits = built.units;
exports.economicsResourceEnvironmentalAccentSources = built.accentSources;
