"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pharmacologyMedicinalChemistryAccentSources = exports.pharmacologyMedicinalChemistryUnits = exports.pharmacologyMedicinalChemistryTopics = exports.pharmacologyMedicinalChemistrySubject = void 0;
const createStructuredSubject_1 = require("@/content/subjects/shared/createStructuredSubject");
const topics = [
    {
        id: 'foundations-of-pharmacology',
        title: 'Foundations of Pharmacology',
        description: 'Core principles of drugs, receptors, dose response, and the biological basis of pharmacological action.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'What Is Pharmacology?',
            'Drug Classes and Terminology',
            'Receptors and Targets',
            'Dose-Response Relationships',
            'Agonists and Antagonists',
            'Therapeutic Index',
            'Drug Development Overview',
            'Routes of Administration',
        ]),
    },
    {
        id: 'pharmacokinetics',
        title: 'Pharmacokinetics',
        description: 'How the body absorbs, distributes, metabolizes, and eliminates drugs.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Absorption',
            'Bioavailability',
            'Distribution',
            'Plasma Protein Binding',
            'Metabolism',
            'Phase I and Phase II Metabolism',
            'Elimination and Clearance',
            'Half-Life and Dosing',
            'Pharmacokinetic Modeling Basics',
        ]),
    },
    {
        id: 'pharmacodynamics',
        title: 'Pharmacodynamics',
        description: 'How drugs interact with targets and produce physiological effects.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Drug-Receptor Binding',
            'Signal Transduction',
            'Potency and Efficacy',
            'Tolerance and Desensitization',
            'Therapeutic Effects',
            'Adverse Effects',
            'Drug Interactions',
            'Precision Pharmacology Basics',
        ]),
    },
    {
        id: 'medicinal-chemistry-foundations',
        title: 'Medicinal Chemistry Foundations',
        description: 'Chemical principles underlying drug design, structure-activity relationships, and optimization of drug properties.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'What Is Medicinal Chemistry?',
            'Functional Groups in Drugs',
            'Stereochemistry in Drug Design',
            'Acid-Base Behavior of Drugs',
            'Lipophilicity and Solubility',
            'Structure-Activity Relationships',
            'Lead Compounds',
            'Drug Optimization',
        ]),
    },
    {
        id: 'drug-discovery-and-design',
        title: 'Drug Discovery and Design',
        description: 'Target identification, screening, optimization, and translation from molecule to candidate drug.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Target Identification',
            'Hit Discovery',
            'Screening Methods',
            'Lead Optimization',
            'Prodrugs',
            'Biologics Overview',
            'Formulation Basics',
            'Preclinical Development',
        ]),
    },
    {
        id: 'major-therapeutic-areas',
        title: 'Major Therapeutic Areas',
        description: 'Representative drug classes organized by major body systems and disease categories.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Autonomic Pharmacology',
            'Cardiovascular Drugs',
            'Anti-Inflammatory Drugs',
            'Antimicrobial Agents',
            'Antiviral Drugs',
            'CNS Pharmacology',
            'Endocrine Pharmacology',
            'Cancer Therapeutics Basics',
        ]),
    },
    {
        id: 'toxicology-and-drug-safety',
        title: 'Toxicology and Drug Safety',
        description: 'Toxic effects, safety assessment, and risk management in pharmacological practice and development.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Principles of Toxicology',
            'Dose and Toxic Response',
            'Organ Toxicity',
            'Drug-Induced Liver Injury',
            'Safety Pharmacology',
            'Adverse Drug Reactions',
            'Drug Monitoring',
            'Regulatory Safety Basics',
        ]),
    },
];
const built = (0, createStructuredSubject_1.createStructuredSubject)({
    id: 'pharmacology-medicinal-chemistry',
    title: 'Pharmacology / Medicinal Chemistry',
    description: 'Local-first pharmacology and medicinal chemistry content spanning drug action, kinetics, design, therapeutics, and safety.',
    tagline: 'Study drugs from receptor logic and body handling through design, therapy, and risk.',
    accent: 'carbon',
    practitionerPlural: 'pharmacologists',
    topics,
    accentCycle: createStructuredSubject_1.defaultSubjectAccentCycle,
});
exports.pharmacologyMedicinalChemistrySubject = built.subject;
exports.pharmacologyMedicinalChemistryTopics = built.topics;
exports.pharmacologyMedicinalChemistryUnits = built.units;
exports.pharmacologyMedicinalChemistryAccentSources = built.accentSources;
