"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botanyAccentSources = exports.botanyUnits = exports.botanyTopics = exports.botanySubject = void 0;
const createStructuredSubject_1 = require("@/content/subjects/shared/createStructuredSubject");
const topics = [
    {
        id: 'foundations-of-botany',
        title: 'Foundations of Botany',
        description: 'Core concepts in plant science, plant diversity, and the role of plants in ecosystems and human society.',
        units: (0, createStructuredSubject_1.structuredUnits)([
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
        description: 'Internal and external organization of plants, tissues, organs, and structural specialization.',
        units: (0, createStructuredSubject_1.structuredUnits)([
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
        description: 'Water transport, photosynthesis, respiration, signaling, and the physiological basis of plant function.',
        units: (0, createStructuredSubject_1.structuredUnits)([
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
        description: 'Life cycles, alternation of generations, pollination, seed formation, and developmental control.',
        units: (0, createStructuredSubject_1.structuredUnits)([
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
        description: 'The evolutionary history of plants and the major lineages across land plant diversity.',
        units: (0, createStructuredSubject_1.structuredUnits)([
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
        description: 'Interactions between plants and environment across populations, communities, and ecosystems.',
        units: (0, createStructuredSubject_1.structuredUnits)([
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
        description: 'Human uses of plants in agriculture, medicine, materials, conservation, and biotechnology.',
        units: (0, createStructuredSubject_1.structuredUnits)([
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
const built = (0, createStructuredSubject_1.createStructuredSubject)({
    id: 'botany',
    title: 'Botany',
    description: 'Local-first botany content spanning plant structure, physiology, reproduction, diversity, ecology, and applied plant science.',
    tagline: 'Study plant life through connected anatomy, physiology, evolution, ecology, and applied pathways.',
    accent: 'chlorine',
    practitionerPlural: 'botanists',
    topics,
    accentCycle: createStructuredSubject_1.defaultSubjectAccentCycle,
});
exports.botanySubject = built.subject;
exports.botanyTopics = built.topics;
exports.botanyUnits = built.units;
exports.botanyAccentSources = built.accentSources;
