"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chemistryConceptUnits = exports.chemistryConceptTopics = exports.chemistryConceptAccentSources = void 0;
const subjectId = 'chemistry';
const chapterDefinitions = [
    {
        key: 'classification',
        id: 'foundations-and-conceptual-classification',
        title: 'Foundations and Conceptual Classification',
        estimatedMinutes: 7,
        bulletTitle: 'Foundational Highlights',
        figureLabel: 'Concept Map',
    },
    {
        key: 'electronic',
        id: 'structure-models-and-core-relationships',
        title: 'Structure, Models, and Core Relationships',
        estimatedMinutes: 8,
        bulletTitle: 'Model Highlights',
        figureLabel: 'Model Flow',
    },
    {
        key: 'physical',
        id: 'quantities-properties-and-representations',
        title: 'Quantities, Properties, and Representations',
        estimatedMinutes: 7,
        bulletTitle: 'Representation Highlights',
        figureLabel: 'Property Panel',
    },
    {
        key: 'reactivity',
        id: 'governing-principles-and-chemical-behavior',
        title: 'Governing Principles and Chemical Behavior',
        estimatedMinutes: 8,
        bulletTitle: 'Principle Highlights',
        figureLabel: 'Behavior Panel',
    },
    {
        key: 'occurrence',
        id: 'scientific-context-and-real-world-presence',
        title: 'Scientific Context and Real-World Presence',
        estimatedMinutes: 6,
        bulletTitle: 'Context Highlights',
        figureLabel: 'Context Spectrum',
    },
    {
        key: 'isotopes',
        id: 'calculation-logic-and-deeper-theory',
        title: 'Calculation Logic and Deeper Theory',
        estimatedMinutes: 7,
        bulletTitle: 'Theory Highlights',
        figureLabel: 'Theory Terms',
    },
    {
        key: 'production',
        id: 'methods-measurement-and-worked-practice',
        title: 'Methods, Measurement, and Worked Practice',
        estimatedMinutes: 8,
        bulletTitle: 'Method Highlights',
        figureLabel: 'Study Workflow',
    },
    {
        key: 'applied',
        id: 'applications-significance-and-safe-practice',
        title: 'Applications, Significance, and Safe Practice',
        estimatedMinutes: 8,
        bulletTitle: 'Applied Highlights',
        figureLabel: 'Application Matrix',
    },
];
function seed(title, aliases = [], keywords = []) {
    return { title, aliases, keywords };
}
const conceptTopicSeeds = [
    {
        id: 'atomic-structure-periodicity',
        title: 'Atomic Structure & Periodicity',
        description: 'Foundational units on atomic models, quantum description, electron arrangement, and the periodic logic used to organize chemical behavior.',
        units: [
            seed('Atomic Theory and Historical Models', ['Atomic theory'], ['dalton', 'thomson', 'rutherford', 'bohr']),
            seed('Subatomic Particles', [], ['proton', 'neutron', 'electron']),
            seed('Nuclear Structure', [], ['nucleus', 'nucleon']),
            seed('Isotopes and Atomic Mass', [], ['average atomic mass']),
            seed('Electron Configuration', [], ['aufbau', 'orbital filling']),
            seed('Quantum Numbers', [], ['principal quantum number']),
            seed('Atomic Orbitals', [], ['s orbitals', 'p orbitals']),
            seed('Periodic Table Organization', [], ['groups', 'periods']),
            seed('Periodic Trends', [], ['atomic radius', 'ionization energy']),
            seed('Effective Nuclear Charge and Shielding', [], ['shielding', 'zeff']),
        ],
    },
    {
        id: 'chemical-bonding',
        title: 'Chemical Bonding',
        description: 'A structured bonding sequence covering ionic, covalent, metallic, and intermolecular models used to explain molecular and solid-state structure.',
        units: [
            seed('Introduction to Chemical Bonding'),
            seed('Ionic Bonding'),
            seed('Covalent Bonding'),
            seed('Metallic Bonding'),
            seed('Lewis Structures'),
            seed('Formal Charge'),
            seed('Resonance'),
            seed('Octet Rule and Exceptions'),
            seed('VSEPR Theory'),
            seed('Molecular Geometry'),
            seed('Polarity'),
            seed('Hybridization'),
            seed('Sigma and Pi Bonds', [], ['sigma bonds', 'pi bonds']),
            seed('Intermolecular Forces'),
            seed('Network Covalent Solids'),
        ],
    },
    {
        id: 'stoichiometry-chemical-reactions',
        title: 'Stoichiometry & Chemical Reactions',
        description: 'Core quantitative chemistry on formulas, equations, mole relationships, reaction classes, and calculation frameworks used across the laboratory.',
        units: [
            seed('Chemical Symbols, Formulae, and Nomenclature', ['Chemical formulas and nomenclature'], ['formulae', 'formulas', 'naming compounds']),
            seed('The Mole Concept', ['Mole concept']),
            seed('Molar Mass'),
            seed("Avogadro's Number", ['Avogadros number']),
            seed('Percent Composition'),
            seed('Empirical and Molecular Formulae', ['Empirical and molecular formulas']),
            seed('Writing and Balancing Equations', [], ['balancing equations']),
            seed('Reaction Types'),
            seed('Stoichiometric Calculations'),
            seed('Limiting Reagents', ['Limiting reactants']),
            seed('Theoretical Yield'),
            seed('Percent Yield'),
            seed('Solution Stoichiometry'),
            seed('Redox Reaction Basics'),
        ],
    },
    {
        id: 'thermodynamics-energetics',
        title: 'Thermodynamics & Energetics',
        description: 'Energy-centered chemistry content on heat, enthalpy, entropy, free energy, state functions, and phase change interpretation.',
        units: [
            seed('Energy in Chemical Systems'),
            seed('Endothermic and Exothermic Processes'),
            seed('Enthalpy'),
            seed('Thermochemical Equations'),
            seed('Calorimetry'),
            seed("Hess's Law", ['Hess law']),
            seed('Bond Enthalpy'),
            seed('Spontaneity'),
            seed('Entropy'),
            seed('Gibbs Free Energy'),
            seed('Standard States'),
            seed('Phase Changes and Energy'),
        ],
    },
    {
        id: 'chemical-kinetics',
        title: 'Chemical Kinetics',
        description: 'Units on reaction speed, rate laws, activation barriers, mechanisms, and catalysis, framed around the logic of chemical change over time.',
        units: [
            seed('Reaction Rates'),
            seed('Collision Theory'),
            seed('Factors Affecting Rate'),
            seed('Rate Laws'),
            seed('Reaction Order'),
            seed('Integrated Rate Laws'),
            seed('Half-Life', [], ['half life']),
            seed('Arrhenius Equation'),
            seed('Activation Energy'),
            seed('Reaction Mechanisms'),
            seed('Rate-Determining Step', ['Rate determining step']),
            seed('Catalysis'),
        ],
    },
    {
        id: 'equilibrium',
        title: 'Equilibrium',
        description: 'An equilibrium sequence covering mass action, equilibrium constants, ICE tables, solubility systems, and response to changing conditions.',
        units: [
            seed('Dynamic Equilibrium'),
            seed('Law of Mass Action'),
            seed('Equilibrium Constants'),
            seed('Reaction Quotient'),
            seed('Calculating Equilibrium Concentrations'),
            seed('ICE Tables'),
            seed("Le Chatelier's Principle", ['Le Chatelier principle']),
            seed('Heterogeneous Equilibria'),
            seed('Solubility Equilibria'),
            seed('Common Ion Effect'),
            seed('Equilibrium in Gas Systems'),
        ],
    },
    {
        id: 'acids-bases-solutions',
        title: 'Acids, Bases & Solutions',
        description: 'Solution chemistry content on acid-base theory, aqueous equilibrium, buffers, titrations, solubility, and concentration relationships.',
        units: [
            seed('Properties of Acids and Bases'),
            seed('Arrhenius, Bronsted-Lowry, and Lewis Definitions', ['Acid-base definitions', 'Bronsted-Lowry and Lewis definitions'], ['arrhenius', 'bronsted lowry', 'lewis acid', 'lewis base']),
            seed('Strong and Weak Acids'),
            seed('Strong and Weak Bases'),
            seed('pH and pOH', [], ['ph', 'poh']),
            seed('Acid Dissociation Constant (Ka)', ['Acid dissociation constant'], ['ka']),
            seed('Base Dissociation Constant (Kb)', ['Base dissociation constant'], ['kb']),
            seed('Polyprotic Acids'),
            seed('Neutralization'),
            seed('Salt Hydrolysis'),
            seed('Buffers'),
            seed('Henderson-Hasselbalch Equation'),
            seed('Acid-Base Titrations', ['Acid base titrations']),
            seed('Solubility in Aqueous Systems'),
            seed('Concentration Units and Dilution'),
        ],
    },
    {
        id: 'electrochemistry',
        title: 'Electrochemistry',
        description: 'Electrochemical units on oxidation-reduction logic, cell potentials, electrolysis, batteries, corrosion, and quantitative charge relationships.',
        units: [
            seed('Oxidation and Reduction', [], ['redox']),
            seed('Assigning Oxidation Numbers'),
            seed('Balancing Redox Equations'),
            seed('Electrochemical Cells'),
            seed('Galvanic Cells'),
            seed('Standard Electrode Potentials'),
            seed('Cell Potential Calculations'),
            seed('Nernst Equation'),
            seed('Electrolysis'),
            seed("Faraday's Law", ['Faraday law']),
            seed('Batteries and Fuel Cells'),
            seed('Corrosion'),
        ],
    },
    {
        id: 'organic-chemistry',
        title: 'Organic Chemistry',
        description: 'A broad organic sequence covering hydrocarbons, functional groups, stereochemistry, common reaction classes, biomolecular foundations, and polymer chemistry.',
        units: [
            seed('Introduction to Organic Chemistry'),
            seed('Hydrocarbons'),
            seed('Alkanes'),
            seed('Alkenes'),
            seed('Alkynes'),
            seed('Aromatic Compounds'),
            seed('Functional Groups'),
            seed('Isomerism'),
            seed('Stereochemistry'),
            seed('Organic Nomenclature'),
            seed('Substitution Reactions'),
            seed('Addition Reactions'),
            seed('Elimination Reactions'),
            seed('Oxidation and Reduction in Organic Chemistry', ['Organic redox chemistry']),
            seed('Alcohols'),
            seed('Ethers'),
            seed('Aldehydes and Ketones'),
            seed('Carboxylic Acids'),
            seed('Esters'),
            seed('Amines'),
            seed('Polymers'),
            seed('Biomolecule Foundations'),
        ],
    },
    {
        id: 'analytical-chemistry',
        title: 'Analytical Chemistry',
        description: 'Analytical chemistry units on measurement quality, separation, titration, calibration, and instrumental analysis across classical and modern methods.',
        units: [
            seed('Foundations of Chemical Analysis'),
            seed('Accuracy, Precision, and Error'),
            seed('Significant Figures and Data Quality'),
            seed('Calibration and Standards'),
            seed('Gravimetric Analysis'),
            seed('Volumetric Analysis'),
            seed('Acid-Base Titration Analysis', ['Acid base titration analysis']),
            seed('Redox Titration Analysis'),
            seed('Solubility and Precipitation Analysis'),
            seed('Chromatography'),
            seed('Gas Chromatography'),
            seed('Liquid Chromatography'),
            seed('Spectroscopy Overview'),
            seed('UV-Vis Spectroscopy', ['UV Vis Spectroscopy']),
            seed('Infrared Spectroscopy'),
            seed('NMR Spectroscopy'),
            seed('Mass Spectrometry'),
            seed('Qualitative vs Quantitative Analysis'),
        ],
    },
    {
        id: 'materials-solid-state-chemistry',
        title: 'Materials & Solid-State Chemistry',
        description: 'Materials-focused chemistry content on solids, band structure, functional materials, nanoscale systems, and the relationship between structure and performance.',
        units: [
            seed('States of Matter Review'),
            seed('Crystal Structures'),
            seed('Unit Cells'),
            seed('Ionic Solids'),
            seed('Metallic Solids'),
            seed('Covalent Network Solids'),
            seed('Amorphous Solids'),
            seed('Band Theory'),
            seed('Conductors, Semiconductors, and Insulators'),
            seed('Alloys'),
            seed('Ceramics'),
            seed('Polymers as Materials'),
            seed('Nanomaterials'),
            seed('Graphene and Carbon Materials'),
            seed('Materials Properties and Applications'),
        ],
    },
];
const conceptAccentCycle = [
    'hydrogen',
    'helium',
    'beryllium',
    'boron',
    'oxygen',
    'nitrogen',
    'cobalt',
    'carbon',
    'fluorine',
    'copper',
    'magnesium',
    'phosphorus',
];
const conceptAccentOffsets = {
    'atomic-structure-periodicity': 0,
    'chemical-bonding': 4,
    'stoichiometry-chemical-reactions': 8,
    'thermodynamics-energetics': 9,
    'chemical-kinetics': 5,
    equilibrium: 1,
    'acids-bases-solutions': 10,
    electrochemistry: 6,
    'organic-chemistry': 7,
    'analytical-chemistry': 2,
    'materials-solid-state-chemistry': 3,
};
function section(focusNote, highlights, facts) {
    return { focusNote, highlights, facts };
}
function paragraph(id, text) {
    return { id, type: 'paragraph', text };
}
function bullets(id, title, items) {
    return { id, type: 'bullet-list', title, items };
}
function figure(id, label, title, caption, altText, data) {
    return {
        id,
        type: 'figure',
        label,
        title,
        caption,
        altText,
        figure: data,
    };
}
function unique(values) {
    return Array.from(new Set(values.filter(Boolean)));
}
function normalizeInlineText(text) {
    return text
        .replace(/\s+/g, ' ')
        .replace(/\s+([,.;:!?])/g, '$1')
        .trim();
}
function trimTrailingPunctuation(text) {
    return normalizeInlineText(text).replace(/[.;:,!?]+$/, '').trim();
}
function capitalizeLeading(text) {
    const normalized = normalizeInlineText(text);
    const firstLetterIndex = normalized.search(/[A-Za-z]/);
    if (firstLetterIndex === -1) {
        return normalized;
    }
    return (normalized.slice(0, firstLetterIndex) +
        normalized.charAt(firstLetterIndex).toUpperCase() +
        normalized.slice(firstLetterIndex + 1));
}
function formatStandaloneText(text) {
    return capitalizeLeading(trimTrailingPunctuation(text));
}
function slugify(value) {
    return value
        .toLowerCase()
        .replace(/&/g, ' and ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/-{2,}/g, '-');
}
function shortCodeForTitle(title) {
    const parts = title
        .replace(/&/g, ' and ')
        .split(/[^A-Za-z0-9]+/)
        .map((part) => part.trim())
        .filter(Boolean)
        .filter((part) => !['and', 'of', 'the', 'to', 'in', 'vs', 'as'].includes(part.toLowerCase()));
    if (parts.length === 0) {
        return 'CHE';
    }
    if (parts.length === 1) {
        return parts[0].slice(0, 3).toUpperCase();
    }
    return parts
        .slice(0, 3)
        .map((part) => part.charAt(0).toUpperCase())
        .join('');
}
function keywordTokens(value) {
    return value
        .toLowerCase()
        .replace(/&/g, ' and ')
        .split(/[^a-z0-9]+/)
        .map((part) => part.trim())
        .filter((part) => part.length >= 2);
}
function rotate(values, offset) {
    if (values.length === 0) {
        return values;
    }
    const normalized = ((offset % values.length) + values.length) % values.length;
    return [...values.slice(normalized), ...values.slice(0, normalized)];
}
function createOptions(correct, distractors, offset) {
    const displayCorrect = formatStandaloneText(correct);
    const pool = unique([correct, ...distractors].map(formatStandaloneText)).slice(0, 4);
    const options = rotate(pool, offset).map((text, index) => ({
        id: `option-${index + 1}`,
        label: String.fromCharCode(65 + index),
        text,
    }));
    return {
        options,
        correctOptionId: options.find((option) => option.text === displayCorrect)?.id ?? options[0].id,
    };
}
function multipleChoice(id, prompt, correct, distractors, explanation, offset) {
    const { options, correctOptionId } = createOptions(correct, distractors, offset);
    return {
        id,
        type: 'multiple-choice',
        prompt,
        explanation,
        options,
        correctOptionId,
    };
}
function trueFalse(id, prompt, answer, explanation) {
    return {
        id,
        type: 'true-false',
        prompt,
        explanation,
        options: [
            { id: 'true', label: 'A', text: 'True' },
            { id: 'false', label: 'B', text: 'False' },
        ],
        correctOptionId: answer ? 'true' : 'false',
    };
}
function lowerConcept(context) {
    return context.title.toLowerCase();
}
function buildSummary(topic, unit) {
    return `${unit.title} is presented here as a compact chemistry text within ${topic.title}, connecting definitions, structural reasoning, worked practice, and practical chemical use.`;
}
function buildOverview(topic, unit) {
    return `${unit.title} is organized as an eight-chapter reading sequence in ${topic.title}, moving from foundations and models through quantitative treatment, laboratory method, and application.`;
}
function buildHeroFacts(topic, order, totalUnits, shortCode) {
    return [
        `Unit ${String(order).padStart(2, '0')} of ${String(totalUnits).padStart(2, '0')}`,
        `${shortCode} study code`,
        `${topic.title} sequence`,
        '8 chapters, flashcards, and quizzes',
    ];
}
function buildSections(context) {
    const concept = lowerConcept(context);
    return {
        classification: section(`${context.title} is introduced as a core idea within ${context.topicTitle}, so the opening chapter defines the term, sets boundaries, and establishes why chemists return to it throughout the course.`, [
            `${context.title} should be learned first as a disciplined definition with standard examples and boundary cases.`,
            `The vocabulary of ${concept} shapes later problem solving, data interpretation, and laboratory explanation.`,
            `${context.topicTitle} uses ${concept} to connect microscopic reasoning with observable chemical results.`,
            `A clear conceptual classification keeps the topic from becoming a memorized list of disconnected facts.`,
        ], [
            `a foundational topic in ${context.topicTitle.toLowerCase()} that organizes how chemists describe ${concept}`,
            `unit ${context.order} of ${context.topicUnitTotal} in the ${context.topicTitle} sequence`,
            `${context.title} is introduced through standard definitions, canonical examples, and contrasting cases`,
            `it helps classify which variables, models, or reaction ideas belong inside the topic and which do not`,
            `mastery of its foundation supports later calculations, mechanism work, and applied chemistry`,
        ]),
        electronic: section(`This chapter treats ${context.title} through models, structure, and core relationships, because introductory chemistry becomes much clearer when the concept is tied to a stable explanatory picture.`, [
            `Chemists use idealized models to make ${concept} predictable without losing the main physical meaning.`,
            `Representations such as equations, diagrams, and symbolic statements compress the logic of ${concept}.`,
            `Comparing limiting cases helps distinguish the core rule from its important qualifications.`,
            `The chosen model is useful only if it can still explain observed chemical behavior and measured results.`,
        ], [
            `${concept} is interpreted through structural models, causal relationships, and standard chemical representations`,
            `the chapter emphasizes how equations, diagrams, or symbolic language simplify ${concept} without removing chemical meaning`,
            `common patterns emerge when chemists compare idealized models, limiting cases, and representative examples`,
            `the unit uses those models to predict how ${concept} shapes bonding, matter, energy, or reaction outcomes`,
            `careful model choice matters because oversimplified pictures can hide important chemical distinctions`,
        ]),
        physical: section(`Chemistry students meet ${context.title} not only in words but also through quantities, representations, and worked comparisons, so this chapter focuses on the forms in which the idea is actually handled.`, [
            `Standard symbols, units, and diagrams keep ${concept} comparable across textbooks, lecture notes, and experiments.`,
            `A good representation shows both the meaning of the concept and the limits of a particular simplification.`,
            `Representative values and plotted trends reveal how magnitude, direction, and proportionality shape interpretation.`,
            `The same idea may need different representations for explanation, calculation, and laboratory reporting.`,
        ], [
            `the core measurable quantities are expressed with standard symbols, units, and reference conditions`,
            `graphs, balanced expressions, or structural sketches make the topic easier to compare across systems`,
            `representative values show how magnitude and direction matter when chemists discuss ${concept}`,
            `worked chemical examples reveal which variables are controlled and which respond`,
            `the best representation depends on whether the task is qualitative explanation, quantitative calculation, or experimental planning`,
        ]),
        reactivity: section(`The usefulness of ${context.title} becomes clearer once it is tied to governing principles such as energy change, particle interaction, equilibrium response, or electron transfer, depending on the system being discussed.`, [
            `Core chemical principles determine when ${concept} becomes explanatory rather than merely descriptive.`,
            `The chapter follows how those principles show up in observable chemical behavior.`,
            `Representative reaction contexts help separate general rules from special cases.`,
            `Assumptions must be stated explicitly, because the same principle can behave differently under new conditions.`,
        ], [
            `${concept} becomes chemically useful when linked to governing principles such as energy change, particle interaction, equilibrium response, or electron transfer`,
            `the chapter follows how those principles determine observable chemical behavior`,
            `chemists rely on the topic to explain why some processes are favored, fast, limited, reversible, or selective`,
            `representative reaction contexts show how the idea operates in laboratory and industrial settings`,
            `careful attention to assumptions prevents misapplication when conditions change`,
        ]),
        occurrence: section(`${context.title} appears across classroom examples, laboratory method, industrial chemistry, and natural systems, so the chapter treats context as part of chemical understanding rather than as an afterthought.`, [
            `The same topic can look different in gas-phase, solution, solid-state, biological, or analytical settings.`,
            `Real-world context determines which approximations remain useful and which must be replaced.`,
            `Chemists encounter ${concept} in both explanatory theory and routine laboratory workflow.`,
            `Context is therefore a way of deciding when a model is sufficient and when a fuller treatment is needed.`,
        ], [
            `the topic appears in classroom examples, laboratory methods, industrial chemistry, and natural systems rather than in one isolated setting`,
            `its real-world importance comes from how often it is used to interpret chemical data and design`,
            `the unit highlights where a chemist is most likely to encounter the idea in practice`,
            `context matters because the same principle can look different in gas-phase, solution, solid-state, or biological chemistry`,
            `understanding context helps decide when a simplified model is acceptable and when a more complete treatment is required`,
        ]),
        isotopes: section(`Beyond definition and vocabulary, ${context.title} has a quantitative and theoretical side. This chapter explains the logic behind the formulas, assumptions, and deeper consequences that make the topic transferable to new problems.`, [
            `Quantitative chemistry treats ${concept} through equations, approximations, and boundary conditions rather than definition alone.`,
            `The deeper theory clarifies why standard formulas or rules have the forms that they do.`,
            `Common errors usually come from ignoring units, assumptions, or competing effects.`,
            `More advanced examples show how the topic extends from introductory problems to richer systems.`,
        ], [
            `quantitative chemistry treats ${concept} through equations, approximations, and boundary conditions rather than definition alone`,
            `the deeper theory explains why standard formulas or rules have the forms that they do`,
            `common student errors usually come from ignoring assumptions, units, or competing effects`,
            `advanced examples show how the concept extends from introductory problems to richer chemical systems`,
            `careful theoretical framing makes later kinetics, thermodynamics, analytical, or materials topics easier to connect`,
        ]),
        production: section(`Students operationalize ${context.title} through worked examples, measurements, and repeatable problem-solving workflows, so this chapter is organized around method rather than isolated fact recall.`, [
            `A reliable workflow starts by identifying known quantities, choosing the governing relationship, and checking units.`,
            `Measurement quality determines how precisely the concept can be applied in real chemistry.`,
            `Worked practice links symbolic chemistry to instruments, calculations, and experimental design.`,
            `The main instructional aim is reproducible reasoning rather than one-off tricks.`,
        ], [
            `students typically operationalize ${concept} through worked examples, laboratory procedure, or stepwise data handling`,
            `a reliable workflow starts by identifying known quantities, choosing the governing relationship, and checking units`,
            `measurement and method selection determine how precisely the concept can be applied`,
            `representative practice links symbolic chemistry to instruments, calculations, or experimental design`,
            `the chapter emphasizes reproducible reasoning rather than memorized shortcuts`,
        ]),
        applied: section(`${context.title} matters because it shapes how chemists interpret experiments, build materials, control processes, or understand the environment. The closing chapter ties the concept to practical use, intellectual significance, and safe professional judgment.`, [
            `Applications make the topic memorable because they show why the concept survived into modern chemical practice.`,
            `Historical development often reveals how theory and laboratory method improved together.`,
            `Good scientific practice includes knowing the limits of the concept as well as its strengths.`,
            `Safety context matters whenever a topic is applied to energetic, corrosive, toxic, or high-precision systems.`,
        ], [
            `${context.title} has practical importance because it shapes how chemists interpret experiments, build materials, control processes, or understand the environment`,
            `applications range from classroom examples to research, industry, and regulation`,
            `the idea becomes most memorable when tied to a concrete technological or analytical use`,
            `historical development of the topic shows how chemical theory and laboratory practice evolved together`,
            `safe practice depends on understanding the limits of the concept as well as the hazards of the systems where it is applied`,
        ]),
    };
}
function buildParagraphs(context, definition, section) {
    const concept = lowerConcept(context);
    const highlights = section.highlights;
    const facts = section.facts;
    const paragraphs = (() => {
        switch (definition.key) {
            case 'classification':
                return [
                    `${context.title} is best approached first as a defined chemistry concept, not as a loose phrase. In ${context.topicTitle}, chemists use this unit to decide what belongs within the idea, what sits outside it, and why the distinction matters for later explanation. ${section.focusNote}`,
                    `${highlights[0]} ${facts[0]}. In practice that means the reader should be able to state what ${concept} names, which canonical examples best illustrate it, and which nearby ideas are often confused with it.`,
                    `${highlights[1]} ${facts[2]}. A good introductory classification chapter therefore does more than define terms. It shows how the concept becomes a framework for organizing later chemical reasoning rather than a heading at the top of a notes page.`,
                    `${facts[3]}. ${highlights[2]} The chapter is also a reminder that chemistry topics are not isolated compartments. Each one gains meaning because it can be connected to models, measurements, reactions, and laboratory interpretation later in the sequence.`,
                    `${facts[4]}. ${highlights[3]} By the end of the opening chapter, ${context.title} should read like a stable conceptual anchor for the rest of the unit rather than like a vocabulary list waiting to be memorized.`,
                ];
            case 'electronic':
                return [
                    `${context.title} becomes easier to retain when it is tied to a model. In chemistry, models are not decorative illustrations; they are disciplined simplifications that let the learner predict what matters first and which variables can be ignored temporarily. ${section.focusNote}`,
                    `${facts[0]}. ${highlights[0]} For ${concept}, the important question is not whether a model is literally complete, but whether it preserves the explanatory relationship chemists need in ordinary teaching, problem solving, and laboratory interpretation.`,
                    `${facts[1]}. ${highlights[1]} That point matters because students often treat chemical notation, orbital sketches, graphs, or symbolic relationships as if they were the topic itself. In reality they are tools for compressing the structure of the topic into a usable form.`,
                    `${facts[2]}. ${facts[3]}. The value of comparison is that it exposes which features of ${concept} are robust and which depend on the exact system, state, or simplifying assumption used in the model.`,
                    `${facts[4]}. ${highlights[2]} ${highlights[3]} A mature reading of the chapter therefore treats models of ${concept} as carefully chosen explanatory devices rather than as rigid pictures that must never be questioned.`,
                ];
            case 'physical':
                return [
                    `Chemistry is learned through representations as much as through prose, so this chapter turns ${context.title} into quantities, symbols, and visual formats that can be used in classwork and laboratory reasoning. ${section.focusNote}`,
                    `${facts[0]}. That claim is more important than it first appears. Standard units and conventions let chemists compare results across experiments, textbooks, and industries without redefining the topic each time it is used.`,
                    `${facts[1]}. ${highlights[0]} When a representation is chosen well, it does not merely save space. It also highlights the physically meaningful parts of ${concept} and suppresses details that are secondary for the task at hand.`,
                    `${facts[2]}. ${facts[3]}. Those ideas encourage the learner to ask what a graph slope, balanced coefficient, symbolic charge, structural sketch, or concentration ratio is actually saying about the chemistry rather than copying the representation mechanically.`,
                    `${facts[4]}. ${highlights[1]} ${highlights[2]} ${highlights[3]} In that sense, the chapter is a training ground for chemical literacy: learning to choose, read, and critique the representation that best serves the problem.`,
                ];
            case 'reactivity':
                return [
                    `Introductory chemistry topics become genuinely useful only when they can explain behavior. This chapter therefore links ${context.title} to the governing principles that make a chemical system change, resist change, speed up, slow down, or settle into a particular observable pattern. ${section.focusNote}`,
                    `${facts[0]}. ${highlights[0]} In many units the underlying driver may be energy, charge distribution, particle collisions, equilibrium response, or the stability of products and intermediates. Whatever the system, the principle matters because it translates the topic into causal language.`,
                    `${facts[1]}. ${facts[2]}. That is where the chapter moves beyond vocabulary. The reader is asked to connect the concept to what a reaction mixture, measurement, or material actually does under specified conditions.`,
                    `${facts[3]}. ${highlights[1]} Representative chemical contexts are crucial because they show how the same principle can appear in synthesis, analysis, environmental chemistry, or materials work without becoming a different topic each time.`,
                    `${facts[4]}. ${highlights[2]} ${highlights[3]} By the end of the section, ${context.title} should feel like a tool for chemical explanation rather than an abstract principle detached from practice.`,
                ];
            case 'occurrence':
                return [
                    `${context.title} belongs to more than one branch of chemistry, and this chapter explains where the concept actually shows up. A reader who knows only the definition of a topic often struggles to recognize it in the wild, so contextual placement is part of mastering the unit. ${section.focusNote}`,
                    `${facts[0]}. That breadth matters because chemists do not encounter topics only in the chapter where they were first taught. The same idea may reappear in equilibrium tables, titration curves, instrumental data, polymer design, or reactor operation.`,
                    `${facts[1]}. ${highlights[0]} ${highlights[1]} When context is made explicit, the topic stops feeling like an isolated curriculum box and starts functioning as a reusable explanatory lens.`,
                    `${facts[2]}. ${facts[3]}. Instructors often emphasize context to help students decide which approximations remain sensible. A model that works well in dilute aqueous solution may need revision in a concentrated electrolyte, a solid lattice, or a gas-phase mechanism.`,
                    `${facts[4]}. ${highlights[2]} ${highlights[3]} This makes contextual awareness part of chemical judgment, not just supplementary reading.`,
                ];
            case 'isotopes':
                return [
                    `Deeper chemical understanding requires more than recognizing a term or remembering an example. In ${context.title}, theoretical framing and quantitative logic show why a rule works, when it stops working, and how chemists extend it to richer systems. ${section.focusNote}`,
                    `${facts[0]}. ${highlights[0]} This is usually the point where students discover that chemistry reasoning depends heavily on assumptions, units, algebraic structure, and the validity range of simplified models.`,
                    `${facts[1]}. ${facts[2]}. A strong theory chapter therefore teaches the reader to ask what has been assumed silently, what has been neglected deliberately, and which competing effects would matter if conditions changed.`,
                    `${facts[3]}. ${highlights[1]} The chapter is not meant to turn every topic into formal theory, but it does show how introductory chemistry connects to more advanced treatment rather than ending at a classroom mnemonic.`,
                    `${facts[4]}. ${highlights[2]} ${highlights[3]} Once that theoretical backbone is clear, later chapters on method and application rest on firmer ground.`,
                ];
            case 'production':
                return [
                    `Chemistry topics become operational when they are applied through a workflow. This chapter focuses on the repeatable steps by which a chemist turns ${context.title} into a calculation, a laboratory plan, or an interpreted result. ${section.focusNote}`,
                    `${facts[0]}. ${facts[1]}. This is where the unit becomes practical: identify what is known, choose the governing relation, keep track of units, and decide whether the answer is chemically reasonable.`,
                    `${facts[2]}. ${highlights[0]} Good method matters because two people using the same concept can still reach different conclusions if one ignores calibration, uncertainty, limiting assumptions, or appropriate data handling.`,
                    `${facts[3]}. ${highlights[1]} Worked practice belongs in the chapter because chemistry competence is not built by definitions alone. It grows through repeated translation between words, equations, instrument outputs, and final chemical claims.`,
                    `${facts[4]}. ${highlights[2]} ${highlights[3]} By the end of this section, the reader should be able to recognize a standard workflow for ${concept} and explain why each step is there.`,
                ];
            case 'applied':
                return [
                    `The closing chapter asks why ${context.title} matters once the definitions, models, and methods are in place. Chemistry retains its coherence when concepts are seen again in applications, history, technology, and safe professional practice. ${section.focusNote}`,
                    `${facts[0]}. ${highlights[0]} That practical reach is important because it shows the topic surviving the transition from textbook exposition to industrial, environmental, analytical, or research use.`,
                    `${facts[1]}. ${facts[2]}. Applications are especially valuable pedagogically because they reveal what the concept is good for: predicting performance, explaining data, controlling reaction conditions, or designing materials and instruments.`,
                    `${facts[3]}. ${highlights[1]} Historical perspective also matters because many chemistry ideas were refined only after measurement techniques improved or after older models failed under demanding conditions.`,
                    `${facts[4]}. ${highlights[2]} ${highlights[3]} A good final chapter therefore leaves the reader with both professional relevance and intellectual restraint: knowing how to use the idea and knowing where its limits begin.`,
                ];
        }
    })();
    return paragraphs.map((text, index) => paragraph(`${definition.id}-paragraph-${index + 1}`, text));
}
function buildFigureData(context, definition, section) {
    switch (definition.key) {
        case 'classification':
            return {
                variant: 'glossaryCallout',
                terms: [
                    { term: 'Core definition', definition: formatStandaloneText(section.facts[0]) },
                    { term: 'Topic placement', definition: formatStandaloneText(section.facts[1]) },
                    { term: 'Study payoff', definition: formatStandaloneText(section.facts[4]) },
                ],
            };
        case 'electronic':
            return {
                variant: 'reactionFlow',
                steps: [
                    { tag: 'Model', title: 'Primary lens', detail: formatStandaloneText(section.facts[0]) },
                    { tag: 'Language', title: 'Representation choice', detail: formatStandaloneText(section.facts[1]) },
                    { tag: 'Pattern', title: 'Recurring relationship', detail: formatStandaloneText(section.facts[2]) },
                    { tag: 'Use', title: 'Predictive outcome', detail: formatStandaloneText(section.facts[3]) },
                ],
                footer: section.focusNote,
            };
        case 'physical':
            return {
                variant: 'propertyComparison',
                metrics: [
                    { label: 'Quantities', value: 'Units', detail: formatStandaloneText(section.facts[0]) },
                    { label: 'Representations', value: 'Models', detail: formatStandaloneText(section.facts[1]) },
                    { label: 'Examples', value: 'Comparisons', detail: formatStandaloneText(section.facts[2]) },
                    { label: 'Selection', value: 'Fit to task', detail: formatStandaloneText(section.facts[4]) },
                ],
            };
        case 'reactivity':
            return {
                variant: 'safetyPanel',
                items: [
                    { title: 'Governing principle', detail: formatStandaloneText(section.facts[0]), severity: 'low' },
                    { title: 'Observed behavior', detail: formatStandaloneText(section.facts[1]), severity: 'moderate' },
                    { title: 'Representative context', detail: formatStandaloneText(section.facts[3]), severity: 'moderate' },
                    { title: 'Analytical caution', detail: formatStandaloneText(section.facts[4]), severity: 'high' },
                ],
                footer: section.focusNote,
            };
        case 'occurrence':
            return {
                variant: 'spectrumBar',
                title: `${context.title} in context`,
                subtitle: `The concept is reused across ${context.topicTitle.toLowerCase()} and adjacent chemistry topics.`,
                note: section.focusNote,
                segments: [
                    { label: 'Foundations', detail: formatStandaloneText(section.facts[0]), weight: 3, tone: 'accent' },
                    { label: 'Importance', detail: formatStandaloneText(section.facts[1]), weight: 2, tone: 'success' },
                    { label: 'Practice', detail: formatStandaloneText(section.facts[2]), weight: 2, tone: 'neutral' },
                    { label: 'Limits', detail: formatStandaloneText(section.facts[4]), weight: 3, tone: 'warning' },
                ],
            };
        case 'isotopes':
            return {
                variant: 'glossaryCallout',
                terms: [
                    { term: 'Quantitative frame', definition: formatStandaloneText(section.facts[0]) },
                    { term: 'Deeper theory', definition: formatStandaloneText(section.facts[1]) },
                    { term: 'Common error', definition: formatStandaloneText(section.facts[2]) },
                ],
            };
        case 'production':
            return {
                variant: 'reactionFlow',
                steps: [
                    { tag: 'Step 1', title: 'Identify knowns', detail: formatStandaloneText(section.facts[0]) },
                    { tag: 'Step 2', title: 'Choose relation', detail: formatStandaloneText(section.facts[1]) },
                    { tag: 'Step 3', title: 'Measure and apply', detail: formatStandaloneText(section.facts[2]) },
                    { tag: 'Step 4', title: 'Check reasoning', detail: formatStandaloneText(section.facts[4]) },
                ],
                footer: section.focusNote,
            };
        case 'applied':
            return {
                variant: 'applicationMatrix',
                columns: [
                    {
                        title: 'Applications',
                        items: [
                            { label: 'Practical role', value: formatStandaloneText(section.facts[0]), tone: 'accent' },
                            { label: 'Usage range', value: formatStandaloneText(section.facts[1]), tone: 'neutral' },
                        ],
                    },
                    {
                        title: 'Scientific significance',
                        items: [
                            { label: 'Memorable context', value: formatStandaloneText(section.facts[2]), tone: 'success' },
                            { label: 'Historical note', value: formatStandaloneText(section.facts[3]), tone: 'warning' },
                        ],
                    },
                    {
                        title: 'Limits and safety',
                        items: [
                            { label: 'Professional caution', value: formatStandaloneText(section.facts[4]), tone: 'danger' },
                            { label: 'Focus note', value: section.focusNote, tone: 'neutral' },
                        ],
                    },
                ],
                footer: section.highlights[0],
            };
    }
}
function buildFigureTitle(context, definition) {
    return `${context.title}: ${definition.figureLabel}`;
}
function buildFigureCaption(context, definition, section) {
    return `${definition.title} for ${context.title} in ${context.topicTitle}. ${section.highlights[0]}`;
}
function buildFigureAltText(context, definition) {
    return `${definition.figureLabel} figure for ${context.title}.`;
}
function buildGlossaryItems(context, key, section) {
    switch (key) {
        case 'classification':
            return [
                `${context.title}: ${section.facts[0]}.`,
                `Topic placement: ${section.facts[1]}.`,
                `Foundational value: ${section.facts[4]}.`,
            ];
        case 'electronic':
            return [
                `Model choice: ${section.facts[0]}.`,
                `Representation: ${section.facts[1]}.`,
                `Predictive use: ${section.facts[3]}.`,
            ];
        case 'physical':
            return [
                `Standard quantities: ${section.facts[0]}.`,
                `Representations: ${section.facts[1]}.`,
                `Selection rule: ${section.facts[4]}.`,
            ];
        case 'reactivity':
            return [
                `Governing principle: ${section.facts[0]}.`,
                `Chemical behavior: ${section.facts[1]}.`,
                `Caution: ${section.facts[4]}.`,
            ];
        case 'occurrence':
            return [
                `Context: ${section.facts[0]}.`,
                `Importance: ${section.facts[1]}.`,
                `Limit: ${section.facts[4]}.`,
            ];
        case 'isotopes':
            return [
                `Quantitative frame: ${section.facts[0]}.`,
                `Theory link: ${section.facts[1]}.`,
                `Common error: ${section.facts[2]}.`,
            ];
        case 'production':
            return [
                `Workflow: ${section.facts[0]}.`,
                `Measurement: ${section.facts[2]}.`,
                `Practice goal: ${section.facts[4]}.`,
            ];
        case 'applied':
            return [
                `Practical role: ${section.facts[0]}.`,
                `Historical meaning: ${section.facts[3]}.`,
                `Safe practice: ${section.facts[4]}.`,
            ];
    }
}
function buildFactPrompts(context, key) {
    switch (key) {
        case 'classification':
            return [
                `How is ${context.title} best framed at the start of this unit?`,
                `Where does ${context.title} sit within ${context.topicTitle}?`,
                `How is ${context.title} first introduced to the learner?`,
                `What organizing role does ${context.title} serve?`,
                `Why does the foundation of ${context.title} matter later in chemistry?`,
            ];
        case 'electronic':
            return [
                `How is ${context.title} modeled in this chapter?`,
                `What kind of representation is emphasized for ${context.title}?`,
                `What repeated pattern is highlighted for ${context.title}?`,
                `What predictive role does the model of ${context.title} serve?`,
                `Why does model choice matter for ${context.title}?`,
            ];
        case 'physical':
            return [
                `How are key quantities for ${context.title} usually expressed?`,
                `Which kind of representation helps compare ${context.title} across systems?`,
                `What do representative values reveal about ${context.title}?`,
                `What do worked examples identify in ${context.title}?`,
                `How should the best representation for ${context.title} be selected?`,
            ];
        case 'reactivity':
            return [
                `What gives ${context.title} chemical explanatory power?`,
                `What does this chapter follow about ${context.title}?`,
                `Why do chemists rely on ${context.title} in reaction analysis?`,
                `Where does ${context.title} appear in representative chemical contexts?`,
                `What prevents misapplication of ${context.title}?`,
            ];
        case 'occurrence':
            return [
                `Where is ${context.title} encountered in chemistry?`,
                `Why is ${context.title} important beyond a single chapter?`,
                `Where is a chemist likely to encounter ${context.title} in practice?`,
                `Why does context matter when applying ${context.title}?`,
                `What helps determine whether a simplified treatment of ${context.title} is acceptable?`,
            ];
        case 'isotopes':
            return [
                `How does quantitative chemistry treat ${context.title}?`,
                `What does deeper theory explain about ${context.title}?`,
                `What common mistake appears when students work with ${context.title}?`,
                `How does ${context.title} extend into richer systems?`,
                `Why does theoretical framing matter for ${context.title}?`,
            ];
        case 'production':
            return [
                `How do students usually operationalize ${context.title}?`,
                `What is the first step in a reliable workflow for ${context.title}?`,
                `What influences the precision of work on ${context.title}?`,
                `How does practice connect ${context.title} to chemical work?`,
                `What is the chapter's main instructional emphasis for ${context.title}?`,
            ];
        case 'applied':
            return [
                `Why does ${context.title} matter in applied chemistry?`,
                `Where do applications of ${context.title} appear?`,
                `What makes ${context.title} memorable in practice?`,
                `What does the history of ${context.title} show?`,
                `What kind of safe-practice judgment belongs with ${context.title}?`,
            ];
    }
}
function buildStatementFrames(context, key) {
    switch (key) {
        case 'classification':
            return [
                (fact) => `${context.title} is best framed as ${fact}.`,
                (fact) => `${context.title} sits within ${context.topicTitle} as ${fact}.`,
                (fact) => `${context.title} is introduced through ${fact}.`,
                (fact) => `${context.title} serves as ${fact}.`,
                (fact) => `The foundation of ${context.title} matters because ${fact}.`,
            ];
        case 'electronic':
            return [
                (fact) => `${context.title} is modeled through ${fact}.`,
                (fact) => `A key representation choice for ${context.title} is ${fact}.`,
                (fact) => `A recurring pattern is that ${fact}.`,
                (fact) => `The model of ${context.title} predicts that ${fact}.`,
                (fact) => `Model choice matters because ${fact}.`,
            ];
        case 'physical':
            return [
                (fact) => `Key quantities for ${context.title} are expressed through ${fact}.`,
                (fact) => `A useful representation is ${fact}.`,
                (fact) => `Representative values show that ${fact}.`,
                (fact) => `Worked examples reveal that ${fact}.`,
                (fact) => `The best representation is chosen because ${fact}.`,
            ];
        case 'reactivity':
            return [
                (fact) => `${context.title} gains explanatory power from ${fact}.`,
                (fact) => `The chapter follows how ${fact}.`,
                (fact) => `Chemists rely on ${context.title} because ${fact}.`,
                (fact) => `A representative context is ${fact}.`,
                (fact) => `Misapplication is avoided when ${fact}.`,
            ];
        case 'occurrence':
            return [
                (fact) => `${context.title} is encountered as ${fact}.`,
                (fact) => `Its broader importance is that ${fact}.`,
                (fact) => `A chemist is likely to meet the topic through ${fact}.`,
                (fact) => `Context matters because ${fact}.`,
                (fact) => `A simplified treatment is acceptable when ${fact}.`,
            ];
        case 'isotopes':
            return [
                (fact) => `Quantitative chemistry treats ${context.title} through ${fact}.`,
                (fact) => `Deeper theory explains that ${fact}.`,
                (fact) => `A common error is that ${fact}.`,
                (fact) => `Advanced systems show that ${fact}.`,
                (fact) => `Theoretical framing matters because ${fact}.`,
            ];
        case 'production':
            return [
                (fact) => `${context.title} is operationalized through ${fact}.`,
                (fact) => `A reliable workflow begins by ${fact}.`,
                (fact) => `Precision depends on ${fact}.`,
                (fact) => `Practice connects the topic to ${fact}.`,
                (fact) => `The chapter emphasizes ${fact}.`,
            ];
        case 'applied':
            return [
                (fact) => `${context.title} matters because ${fact}.`,
                (fact) => `Applications appear across ${fact}.`,
                (fact) => `The topic is memorable when ${fact}.`,
                (fact) => `Its history shows that ${fact}.`,
                (fact) => `Safe practice requires that ${fact}.`,
            ];
    }
}
function buildUnitGlossary(context) {
    return [
        {
            term: context.title,
            definition: `A chemistry study unit in ${context.topicTitle} that organizes definitions, models, quantitative treatment, and applications around ${lowerConcept(context)}.`,
        },
        {
            term: 'Quantitative link',
            definition: `Problems involving ${lowerConcept(context)} are usually expressed through symbolic relationships, worked calculations, or measurement logic.`,
        },
        {
            term: 'Applied context',
            definition: `${context.title} becomes most visible in laboratory method, data interpretation, industrial practice, or environmental reasoning.`,
        },
    ];
}
function collectSearchTerms(context) {
    return unique([
        context.title,
        context.shortCode,
        context.topicTitle,
        ...context.aliases,
        ...context.keywords,
        ...keywordTokens(context.title),
        ...keywordTokens(context.topicTitle),
        ...context.heroFacts,
        ...chapterDefinitions.map((chapter) => chapter.title),
        ...Object.values(context.sections).flatMap((section) => [
            section.focusNote,
            ...section.highlights,
            ...section.facts,
        ]),
    ]);
}
function buildFlashcards(context, definition, section) {
    const prompts = buildFactPrompts(context, definition.key);
    const factCards = section.facts.map((fact, index) => ({
        id: `${definition.id}-fact-${index + 1}`,
        front: prompts[index],
        back: formatStandaloneText(fact),
    }));
    const highlightCards = section.highlights.slice(0, 3).map((highlight, index) => ({
        id: `${definition.id}-highlight-${index + 1}`,
        front: `${definition.title}: key takeaway ${index + 1} for ${context.title}`,
        back: highlight,
    }));
    return [...factCards, ...highlightCards];
}
function chooseDistractors(context, key, index, allContexts) {
    const sameTopic = allContexts
        .filter((candidate) => candidate.id !== context.id && candidate.topicId === context.topicId)
        .map((candidate) => candidate.sections[key].facts[index]);
    const crossTopic = allContexts
        .filter((candidate) => candidate.id !== context.id && candidate.topicId !== context.topicId)
        .map((candidate) => candidate.sections[key].facts[index]);
    return unique([...sameTopic, ...crossTopic]).slice(0, 3);
}
function buildQuiz(context, definition, section, allContexts) {
    const prompts = buildFactPrompts(context, definition.key);
    const statementFrames = buildStatementFrames(context, definition.key);
    const multipleChoiceQuestions = section.facts.map((fact, index) => multipleChoice(`${definition.id}-mc-${index + 1}`, prompts[index], fact, chooseDistractors(context, definition.key, index, allContexts), `The best answer is "${formatStandaloneText(fact)}" because ${section.highlights[index % section.highlights.length].toLowerCase()}`, index));
    const trueFalseQuestions = section.facts.map((fact, index) => {
        const correct = index % 2 === 0;
        const distractor = chooseDistractors(context, definition.key, index, allContexts)[0] ?? fact;
        const statement = statementFrames[index](correct ? fact : distractor);
        const explanation = correct
            ? `True. ${statementFrames[index](fact)} ${section.highlights[index % section.highlights.length]}`
            : `False. For ${context.title}, ${statementFrames[index](fact)} ${section.highlights[index % section.highlights.length]}`;
        return trueFalse(`${definition.id}-tf-${index + 1}`, statement, correct, explanation);
    });
    return [...multipleChoiceQuestions, ...trueFalseQuestions];
}
function createChapter(context, definition, allContexts) {
    const section = context.sections[definition.key];
    const blocks = [
        ...buildParagraphs(context, definition, section),
        bullets(`${definition.id}-highlights`, definition.bulletTitle, section.highlights),
        figure(`${definition.id}-figure`, definition.figureLabel, buildFigureTitle(context, definition), buildFigureCaption(context, definition, section), buildFigureAltText(context, definition), buildFigureData(context, definition, section)),
        bullets(`${definition.id}-glossary`, 'Glossary Focus', buildGlossaryItems(context, definition.key, section)),
    ];
    return {
        id: definition.id,
        title: definition.title,
        overview: section.focusNote,
        estimatedMinutes: definition.estimatedMinutes,
        blocks,
        flashcards: buildFlashcards(context, definition, section),
        quiz: buildQuiz(context, definition, section, allContexts),
    };
}
function createUnitContext(topic, unit, index) {
    const order = index + 1;
    const shortCode = shortCodeForTitle(unit.title);
    const baseContext = {
        id: `${topic.id}--${slugify(unit.title)}`,
        subjectId,
        topicId: topic.id,
        topicTitle: topic.title,
        topicDescription: topic.description,
        topicUnitTotal: topic.units.length,
        title: unit.title,
        order,
        shortCode,
        aliases: unit.aliases ?? [],
        keywords: unit.keywords ?? [],
        summary: buildSummary(topic, unit),
        overview: buildOverview(topic, unit),
        heroFacts: buildHeroFacts(topic, order, topic.units.length, shortCode),
    };
    return {
        ...baseContext,
        sections: buildSections(baseContext),
    };
}
function createConceptUnit(context, allContexts) {
    return {
        id: context.id,
        subjectId: context.subjectId,
        topicId: context.topicId,
        kind: 'concept',
        order: context.order,
        title: context.title,
        shortTitle: `${String(context.order).padStart(2, '0')} ${context.shortCode}`,
        summary: context.summary,
        overview: context.overview,
        hero: {
            eyebrow: `${context.topicTitle} • Unit ${String(context.order).padStart(2, '0')}`,
            title: context.title,
            subtitle: context.topicDescription,
            facts: context.heroFacts,
        },
        metadata: [
            { label: 'Unit', value: String(context.order).padStart(2, '0') },
            { label: 'Topic', value: context.topicTitle },
            { label: 'Study Code', value: context.shortCode },
            { label: 'Sequence', value: `${context.order} of ${context.topicUnitTotal}` },
            { label: 'Subject', value: 'Chemistry' },
            { label: 'Chapter Scaffold', value: String(chapterDefinitions.length) },
            { label: 'Assessments', value: 'Flashcards + Quiz' },
            { label: 'Progress', value: 'Local-first' },
            { label: 'Content Style', value: 'Academic seed text' },
        ],
        glossary: buildUnitGlossary(context),
        searchTerms: collectSearchTerms(context),
        chapters: chapterDefinitions.map((definition) => createChapter(context, definition, allContexts)),
    };
}
const conceptUnitContexts = conceptTopicSeeds.flatMap((topic) => topic.units.map((unit, index) => createUnitContext(topic, unit, index)));
exports.chemistryConceptAccentSources = Object.fromEntries(conceptUnitContexts.map((context) => {
    const offset = conceptAccentOffsets[context.topicId] ?? 0;
    const accentSource = conceptAccentCycle[(context.order - 1 + offset) % conceptAccentCycle.length];
    return [context.id, accentSource];
}));
exports.chemistryConceptTopics = conceptTopicSeeds.map((topic) => {
    const topicContexts = conceptUnitContexts.filter((context) => context.topicId === topic.id);
    return {
        id: topic.id,
        subjectId,
        title: topic.title,
        description: topic.description,
        sectionLabel: 'Topic',
        learningUnits: topicContexts.map((context) => createConceptUnit(context, conceptUnitContexts)),
    };
});
exports.chemistryConceptUnits = exports.chemistryConceptTopics.flatMap((topic) => topic.learningUnits);
