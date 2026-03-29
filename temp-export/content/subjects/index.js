"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectRegistry = exports.subjectAccentSources = void 0;
const agriculture_soil_science_1 = require("@/content/subjects/agriculture-soil-science");
const astronomy_1 = require("@/content/subjects/astronomy");
const biology_1 = require("@/content/subjects/biology");
const botany_1 = require("@/content/subjects/botany");
const chemistry_1 = require("@/content/subjects/chemistry");
const conceptTopics_1 = require("@/content/subjects/chemistry/conceptTopics");
const computer_science_1 = require("@/content/subjects/computer-science");
const economics_resource_environmental_1 = require("@/content/subjects/economics-resource-environmental");
const energy_science_1 = require("@/content/subjects/energy-science");
const geochemistry_1 = require("@/content/subjects/geochemistry");
const geography_1 = require("@/content/subjects/geography");
const geology_1 = require("@/content/subjects/geology");
const topics_1 = require("@/content/subjects/geology/topics");
const geophysics_1 = require("@/content/subjects/geophysics");
const machine_learning_ai_1 = require("@/content/subjects/machine-learning-ai");
const mathematics_1 = require("@/content/subjects/mathematics");
const meteorology_1 = require("@/content/subjects/meteorology");
const oceanography_1 = require("@/content/subjects/oceanography");
const operations_research_systems_science_1 = require("@/content/subjects/operations-research-systems-science");
const pharmacology_medicinal_chemistry_1 = require("@/content/subjects/pharmacology-medicinal-chemistry");
const physics_1 = require("@/content/subjects/physics");
exports.subjectAccentSources = {
    ...conceptTopics_1.chemistryConceptAccentSources,
    ...topics_1.geologyAccentSources,
    ...physics_1.physicsAccentSources,
    ...biology_1.biologyAccentSources,
    ...mathematics_1.mathematicsAccentSources,
    ...astronomy_1.astronomyAccentSources,
    ...geography_1.geographyAccentSources,
    ...oceanography_1.oceanographyAccentSources,
    ...meteorology_1.meteorologyAccentSources,
    ...geophysics_1.geophysicsAccentSources,
    ...geochemistry_1.geochemistryAccentSources,
    ...computer_science_1.computerScienceAccentSources,
    ...machine_learning_ai_1.machineLearningAiAccentSources,
    ...pharmacology_medicinal_chemistry_1.pharmacologyMedicinalChemistryAccentSources,
    ...agriculture_soil_science_1.agricultureSoilScienceAccentSources,
    ...energy_science_1.energyScienceAccentSources,
    ...economics_resource_environmental_1.economicsResourceEnvironmentalAccentSources,
    ...operations_research_systems_science_1.operationsResearchSystemsScienceAccentSources,
    ...botany_1.botanyAccentSources,
};
exports.subjectRegistry = [
    {
        id: 'chemistry',
        loadSync: () => ({ subject: chemistry_1.chemistrySubject, units: chemistry_1.chemistryUnits }),
    },
    {
        id: 'geology',
        loadSync: () => ({ subject: geology_1.geologySubject, units: geology_1.geologyUnits }),
    },
    {
        id: 'physics',
        loadSync: () => ({ subject: physics_1.physicsSubject, units: physics_1.physicsUnits }),
    },
    {
        id: 'biology',
        loadSync: () => ({ subject: biology_1.biologySubject, units: biology_1.biologyUnits }),
    },
    {
        id: 'mathematics',
        loadSync: () => ({ subject: mathematics_1.mathematicsSubject, units: mathematics_1.mathematicsUnits }),
    },
    {
        id: 'astronomy-astrophysics',
        loadSync: () => ({ subject: astronomy_1.astronomySubject, units: astronomy_1.astronomyUnits }),
    },
    {
        id: 'geography',
        loadSync: () => ({ subject: geography_1.geographySubject, units: geography_1.geographyUnits }),
    },
    {
        id: 'oceanography',
        loadSync: () => ({ subject: oceanography_1.oceanographySubject, units: oceanography_1.oceanographyUnits }),
    },
    {
        id: 'meteorology',
        loadSync: () => ({ subject: meteorology_1.meteorologySubject, units: meteorology_1.meteorologyUnits }),
    },
    {
        id: 'geophysics',
        loadSync: () => ({ subject: geophysics_1.geophysicsSubject, units: geophysics_1.geophysicsUnits }),
    },
    {
        id: 'geochemistry',
        loadSync: () => ({ subject: geochemistry_1.geochemistrySubject, units: geochemistry_1.geochemistryUnits }),
    },
    {
        id: 'computer-science',
        loadSync: () => ({ subject: computer_science_1.computerScienceSubject, units: computer_science_1.computerScienceUnits }),
    },
    {
        id: 'machine-learning-ai',
        loadSync: () => ({ subject: machine_learning_ai_1.machineLearningAiSubject, units: machine_learning_ai_1.machineLearningAiUnits }),
    },
    {
        id: 'pharmacology-medicinal-chemistry',
        loadSync: () => ({
            subject: pharmacology_medicinal_chemistry_1.pharmacologyMedicinalChemistrySubject,
            units: pharmacology_medicinal_chemistry_1.pharmacologyMedicinalChemistryUnits,
        }),
    },
    {
        id: 'agriculture-soil-science',
        loadSync: () => ({ subject: agriculture_soil_science_1.agricultureSoilScienceSubject, units: agriculture_soil_science_1.agricultureSoilScienceUnits }),
    },
    {
        id: 'energy-science',
        loadSync: () => ({ subject: energy_science_1.energyScienceSubject, units: energy_science_1.energyScienceUnits }),
    },
    {
        id: 'economics-resource-environmental',
        loadSync: () => ({
            subject: economics_resource_environmental_1.economicsResourceEnvironmentalSubject,
            units: economics_resource_environmental_1.economicsResourceEnvironmentalUnits,
        }),
    },
    {
        id: 'operations-research-systems-science',
        loadSync: () => ({
            subject: operations_research_systems_science_1.operationsResearchSystemsScienceSubject,
            units: operations_research_systems_science_1.operationsResearchSystemsScienceUnits,
        }),
    },
    {
        id: 'botany',
        loadSync: () => ({ subject: botany_1.botanySubject, units: botany_1.botanyUnits }),
    },
];
