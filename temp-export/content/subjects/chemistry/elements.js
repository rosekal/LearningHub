"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chemistrySubject = exports.chemistryTopic = exports.chemistryUnits = void 0;
const elementSeeds_1 = require("@/content/subjects/chemistry/elementSeeds");
const subjectId = 'chemistry';
const topicId = 'elements';
function assertNever(value) {
    throw new Error(`Unhandled section key: ${String(value)}`);
}
const chapterDefinitions = [
    {
        key: 'classification',
        id: 'atomic-identity-classification',
        title: 'Atomic Identity and Periodic Classification',
        estimatedMinutes: 7,
        bulletTitle: 'Classification Highlights',
        figureLabel: 'Periodic Context',
    },
    {
        key: 'electronic',
        id: 'electronic-structure-bonding',
        title: 'Electronic Structure and Bonding Behavior',
        estimatedMinutes: 8,
        bulletTitle: 'Bonding Highlights',
        figureLabel: 'Valence Model',
    },
    {
        key: 'physical',
        id: 'physical-properties',
        title: 'Physical Properties and Structural Forms',
        estimatedMinutes: 7,
        bulletTitle: 'Physical Highlights',
        figureLabel: 'Property Profile',
    },
    {
        key: 'reactivity',
        id: 'chemical-properties-reactivity',
        title: 'Chemical Properties and Reactivity',
        estimatedMinutes: 8,
        bulletTitle: 'Reactivity Highlights',
        figureLabel: 'Reaction Profile',
    },
    {
        key: 'occurrence',
        id: 'occurrence-abundance',
        title: 'Natural Occurrence and Abundance',
        estimatedMinutes: 6,
        bulletTitle: 'Occurrence Highlights',
        figureLabel: 'Abundance Map',
    },
    {
        key: 'isotopes',
        id: 'isotopes-nuclear-considerations',
        title: 'Isotopes and Nuclear Considerations',
        estimatedMinutes: 7,
        bulletTitle: 'Isotope Highlights',
        figureLabel: 'Nuclear Snapshot',
    },
    {
        key: 'production',
        id: 'industrial-production-processing',
        title: 'Industrial Production, Extraction, and Processing',
        estimatedMinutes: 8,
        bulletTitle: 'Process Highlights',
        figureLabel: 'Process Flow',
    },
    {
        key: 'applied',
        id: 'major-compounds-applications-safety',
        title: 'Major Compounds, Applications, and Safety',
        estimatedMinutes: 8,
        bulletTitle: 'Applied Chemistry Highlights',
        figureLabel: 'Application Matrix',
    },
];
const nobleGasShells = {
    He: [2],
    Ne: [2, 8],
    Ar: [2, 8, 8],
    Kr: [2, 8, 18, 8],
    Xe: [2, 8, 18, 18, 8],
    Rn: [2, 8, 18, 32, 18, 8],
};
const trailingFigureConnectorPattern = /\b(?:and|or|but|with|without|including|especially|because|while|where|when|which|that|than|as|of|in|on|to|for|from|by|at|into|onto|under|over|after|before)\s*$/i;
const riskyFigureEndingPattern = /\b(?:rather|mainly|chiefly|largely|primarily|particularly|especially|only|more|less|other|another)\s*$/i;
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
function normalizeParagraphText(text) {
    return capitalizeLeading(text);
}
function formatStandaloneText(text) {
    return capitalizeLeading(trimTrailingPunctuation(text));
}
function safeFigureFragment(text) {
    let fragment = trimTrailingPunctuation(text);
    while (trailingFigureConnectorPattern.test(fragment)) {
        const words = fragment.split(/\s+/).filter(Boolean);
        if (words.length <= 1) {
            break;
        }
        words.pop();
        fragment = trimTrailingPunctuation(words.join(' '));
    }
    return fragment;
}
function compactFigureText(text, maxWords = 10) {
    const cleaned = normalizeInlineText(text);
    const words = cleaned.split(/\s+/).filter(Boolean);
    if (words.length <= maxWords) {
        return safeFigureFragment(cleaned);
    }
    const minimumWords = Math.min(Math.max(4, Math.floor(maxWords / 2)), maxWords);
    for (let count = maxWords; count >= minimumWords; count -= 1) {
        const candidate = safeFigureFragment(words.slice(0, count).join(' '));
        if (!riskyFigureEndingPattern.test(candidate)) {
            return candidate;
        }
    }
    return safeFigureFragment(words.slice(0, minimumWords).join(' '));
}
function headlineFromText(text, maxWords = 6) {
    return capitalizeLeading(compactFigureText(text, maxWords));
}
function inlineElementName(seed) {
    return seed.id === 'hydrogen' ||
        seed.id === 'helium' ||
        seed.id === 'lithium' ||
        seed.id === 'beryllium'
        ? seed.name.toLowerCase()
        : seed.name;
}
function parseElectronShells(configuration) {
    const shells = [0, 0, 0, 0, 0, 0, 0];
    const coreMatch = configuration.match(/\[([A-Za-z]+)\]/);
    const core = coreMatch ? nobleGasShells[coreMatch[1]] : undefined;
    if (core) {
        core.forEach((count, index) => {
            shells[index] = count;
        });
    }
    const matches = configuration.match(/(\d)([spdf])(\d+)/g) ?? [];
    matches.forEach((token) => {
        const parts = token.match(/(\d)([spdf])(\d+)/);
        if (!parts) {
            return;
        }
        const shellIndex = Number.parseInt(parts[1], 10) - 1;
        const electronCount = Number.parseInt(parts[3], 10);
        shells[shellIndex] += electronCount;
    });
    return shells.filter((count) => count > 0);
}
function classifyOccurrenceLabel(text, index) {
    const normalized = text.toLowerCase();
    if (normalized.includes('atmos') || normalized.includes('air')) {
        return 'Atmosphere';
    }
    if (normalized.includes('water') || normalized.includes('ocean') || normalized.includes('sea')) {
        return 'Hydrosphere';
    }
    if (normalized.includes('biosphere') || normalized.includes('biolog') || normalized.includes('living')) {
        return 'Biosphere';
    }
    if (normalized.includes('star') || normalized.includes('cosmic') || normalized.includes('solar') || normalized.includes('stellar')) {
        return 'Cosmic';
    }
    if (normalized.includes('ore') || normalized.includes('mineral') || normalized.includes('rock') || normalized.includes('crust')) {
        return 'Mineral';
    }
    return ['Reservoir', 'Abundance', 'Geochemistry', 'Constraint'][index] ?? 'Reservoir';
}
function occurrenceTone(label) {
    switch (label) {
        case 'Biosphere':
            return 'success';
        case 'Atmosphere':
            return 'accent';
        case 'Cosmic':
            return 'warning';
        default:
            return 'neutral';
    }
}
function severityFromText(text) {
    const normalized = text.toLowerCase();
    if (normalized.includes('explosive') ||
        normalized.includes('violent') ||
        normalized.includes('toxic') ||
        normalized.includes('corrosive') ||
        normalized.includes('pyrophoric') ||
        normalized.includes('radioactive')) {
        return 'high';
    }
    if (normalized.includes('flammable') ||
        normalized.includes('oxid') ||
        normalized.includes('compressed') ||
        normalized.includes('reactive') ||
        normalized.includes('hazard') ||
        normalized.includes('irrit')) {
        return 'moderate';
    }
    return 'low';
}
function unique(values) {
    return Array.from(new Set(values.filter(Boolean)));
}
function rotate(values, offset) {
    if (values.length === 0) {
        return values;
    }
    const normalized = offset % values.length;
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
function paragraph(id, text) {
    return { id, type: 'paragraph', text };
}
function bullets(id, title, items) {
    return { id, type: 'bullet-list', title, items };
}
function figure(id, label, title, caption, figureData, altText) {
    return { id, type: 'figure', label, title, caption, altText, figure: figureData };
}
function multipleChoice(id, prompt, correct, distractors, explanation, offset) {
    const { options, correctOptionId } = createOptions(correct, distractors, offset);
    return { id, type: 'multiple-choice', prompt, explanation, options, correctOptionId };
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
function buildOverview(seed, definition, section) {
    const inlineName = inlineElementName(seed);
    switch (definition.key) {
        case 'classification':
            return `${seed.name} is interpreted first through periodic placement, and this chapter explains how ${section.facts[1]} establishes the element's identity.`;
        case 'electronic':
            return `This chapter follows how ${section.facts[0]} controls bond type, oxidation behavior, and structural chemistry in ${inlineName}.`;
        case 'physical':
            return `Observable properties of ${inlineName} become more meaningful when read through the structural picture summarized by ${section.facts[2]}.`;
        case 'reactivity':
            return `${seed.name} shows its characteristic chemistry through ${section.facts[0]}, and this chapter connects that profile to major reactions and hazards.`;
        case 'occurrence':
            return `Abundance, reservoirs, and environmental context reveal why ${inlineName} is encountered where it is and why free elemental samples may be rare or common.`;
        case 'isotopes':
            return `The isotope story of ${inlineName} links introductory chemistry to nuclear structure, measurement, and practical scientific use.`;
        case 'production':
            return `Industrial chemistry treats ${inlineName} not as an abstract symbol but as a feedstock obtained through specific extraction and purification routes.`;
        case 'applied':
            return `Major compounds, historical significance, technological use, and safe handling all show how the chemistry of ${inlineName} extends beyond the textbook page.`;
        default:
            return assertNever(definition.key);
    }
}
function buildParagraphs(seed, definition, section) {
    const facts = section.facts;
    const highlights = section.highlights;
    const inlineName = inlineElementName(seed);
    const paragraphs = (() => {
        switch (definition.key) {
            case 'classification':
                return [
                    `${seed.name} is classified as ${facts[0]}. In periodic terms it occupies ${facts[1]}, and the neutral atom is written as ${facts[2]}. Those descriptors are useful because they place ${inlineName} inside a broader map of size, valence, and typical compound formation. ${section.focusNote}`,
                    `Periodic placement matters because ${facts[3]}. ${highlights[0]} ${highlights[1]} When chemists compare ${inlineName} with nearby elements, they are comparing how similar electron counts generate recurring patterns and where size, shielding, or covalency force those patterns to bend.`,
                    `One of the most instructive features of ${inlineName} is that ${facts[4]}. That point keeps classification from becoming mechanical. It shows why group labels are helpful starting points but not substitutes for actual chemical reasoning about structure, charge distribution, and bond type.`,
                    `${highlights[2]} In practice, classification frames expectations about which ions, molecules, oxides, hydrides, or coordination environments will appear first in the chemistry of ${inlineName}. It also helps explain why the rest of the chapter sequence can be read as consequences of periodic location rather than as disconnected facts.`,
                    `${highlights[3]} The value of classification is therefore predictive. Once the reader knows where ${inlineName} belongs and why that placement is slightly qualified or strongly reinforced, later discussions of bonding, reactivity, occurrence, and application become much easier to organize.`,
                ];
            case 'electronic':
                return [
                    `The electronic starting point for ${inlineName} is ${facts[0]}. From that arrangement follow the most important questions in the chapter: how readily electrons are shared or transferred, which oxidation states are stable, and what kinds of structures emerge in molecules, ions, or extended solids. ${section.focusNote}`,
                    `${highlights[0]} ${facts[1]}. In ordinary chemistry that behavior is summarized by ${facts[2]}, but the real significance is structural. Electron count, shielding, and polarization determine whether compounds of ${inlineName} look strongly ionic, strongly covalent, or somewhere between those limits.`,
                    `A representative bonding picture is ${facts[3]}. ${highlights[1]} This kind of example matters because it turns electron configuration into something visible: coordination geometry, bond multiplicity, lattice type, or molecular polarity. Those are the forms through which bonding behavior actually appears in data and experiment.`,
                    `Another consequence of that valence picture is that ${trimTrailingPunctuation(facts[4])}. ${highlights[2]} For ${inlineName}, electronic structure is not background information. It is the shortest path to understanding why some reactions are fast, why some compounds are unusually stable, and why certain materials or ions recur across textbooks and industrial practice.`,
                    `${highlights[3]} Once the valence picture is clear, the rest of the chemistry of ${inlineName} becomes easier to read. Bond type, oxidation pattern, and representative compounds all follow from the same underlying electronic logic rather than from a list of unrelated facts.`,
                ];
            case 'physical':
                return [
                    `At ordinary conditions, ${inlineName} is encountered as ${facts[0]}. That physical description is already chemically meaningful, because it reflects how strongly atoms or molecules attract one another and what sort of structure is present in the condensed phase. ${section.focusNote}`,
                    `A standout feature is that ${facts[1]}. The structural reason is that ${facts[2]}. ${highlights[0]} ${highlights[1]} In a strong physical-chemistry reading, measured properties such as density, melting point, hardness, conductivity, and volatility are all interpreted through that structural explanation.`,
                    `${seed.id === 'beryllium' ? 'Representative engineering forms include beryllium metal, beryllium-containing alloys, and beryllium oxide ceramics; one important application is X-ray window material.' : `A representative form of the element is ${facts[3]}.`} For ${inlineName}, this matters because physical form often determines how the material is actually used or studied. ${seed.id === 'hydrogen' ? 'Gaseous hydrogen, compressed hydrogen, cryogenic liquid hydrogen, and the ortho/para forms behave differently in storage and use; under ultrahigh pressure, hydrogen can also enter unusual solid phases, including metallic behavior.' : seed.id === 'helium' ? 'Monatomic helium gas, liquid helium, pressurized solid helium, and the superfluid phase below the lambda point for helium-4 behave very differently even before chemical reaction begins.' : seed.id === 'lithium' ? 'Bulk lithium metal, freshly cut surfaces, molten lithium, and finely divided lithium behave very differently even before chemical reaction begins.' : seed.id === 'beryllium' ? 'Bulk beryllium metal, machined or powdered beryllium, beryllium-containing alloys, and beryllium oxide ceramics behave very differently even before chemical reaction begins.' : 'Gases, cryogenic liquids, metallic solids, network allotropes, and fine powders behave very differently even before chemical reaction begins.'}`,
                    `Handling concerns are defined by the fact that ${trimTrailingPunctuation(facts[4])}. ${highlights[2]} Laboratory handling, storage, transport, and instrumentation all depend on these physical constraints. In many cases the first technical decision about ${inlineName} is not what reaction to run, but which physical form can be managed safely and effectively.`,
                    `${highlights[3]} Physical properties are therefore not decorative data. They explain why ${inlineName} becomes useful in specific technologies, why certain hazards dominate, and why the same element can appear so differently across engineering, laboratory, and natural settings.`,
                ];
            case 'reactivity':
                return [
                    `The reactivity profile of ${inlineName} is best summarized as ${facts[0]}. That single description already implies a balance between thermodynamic driving force, kinetic accessibility, and the types of bonds the element prefers to form or break. ${section.focusNote}`,
                    `A defining reaction pattern is that ${facts[1]}. ${highlights[0]} ${highlights[1]} For ${inlineName}, reactivity is not just a matter of whether the element reacts, but of which conditions activate it and which products are energetically favored once reaction begins.`,
                    `The main explanation is that ${facts[2]}. This is the chemical logic behind the chapter: strong product bonds, charge stabilization, bond dissociation energy, passivating surfaces, or catalytic activation dictate the observable behavior. That is why apparently similar elements can have sharply different reactivity profiles.`,
                    `Important families built on this behavior include ${facts[3]}. ${highlights[2]} These reaction classes matter because they carry the chemistry of ${inlineName} into synthesis, industrial processing, atmospheric chemistry, biological chemistry, or materials degradation.`,
                    `Operational caution follows from the fact that ${trimTrailingPunctuation(facts[4])}. ${highlights[3]} The most useful way to finish a reactivity chapter is with that combination of mechanism and caution in mind: what drives the chemistry of ${inlineName}, what conditions unlock it, and what practical limits the chemist must respect.`,
                ];
            case 'occurrence':
                return [
                    `In nature, ${inlineName} is found mainly as ${facts[0]}. That pattern reflects both abundance and chemical preference: some elements remain free in ordinary environments, while others are stabilized almost entirely inside minerals, gases, waters, or biological matter. ${section.focusNote}`,
                    `In abundance terms, ${facts[1]}. ${highlights[0]} ${highlights[1]} A useful occurrence chapter therefore does more than name a reservoir. It explains whether the element is cosmically abundant, crustally concentrated, biologically cycled, or economically important only in unusual local environments.`,
                    `For ${inlineName}, the major reservoir statement is ${facts[2]}. This reservoir pattern tells the reader where the element is actually encountered in geology, atmospheric chemistry, environmental systems, or industrial feedstocks. It also explains why extraction can be straightforward for some elements and difficult for others.`,
                    `${facts[3]}. ${highlights[2]} Occurrence is never chemically neutral. The forms in which ${inlineName} is stored determine how it moves through ecosystems, how it enters industrial use, and what role it plays in large-scale Earth or planetary processes.`,
                    `${facts[4]}. ${highlights[3]} Once those ideas are clear, abundance stops being a memorized statistic and becomes part of the chemical identity of ${inlineName}: where it belongs, how it cycles, and why elemental samples may be common, rare, or practically absent.`,
                ];
            case 'isotopes':
                return [
                    `The isotope set most relevant to ${inlineName} is ${facts[0]}. These nuclides share chemical identity because they contain the same number of protons, yet they differ in mass, nuclear stability, or abundance in ways that can matter strongly in chemistry, physics, and measurement. ${section.focusNote}`,
                    `A central nuclear distinction is that ${facts[1]}. ${highlights[0]} ${highlights[1]} This difference may affect stability, radioactive decay, or isotopic abundance, and it determines whether the chapter leans more heavily toward analytical tracing, nuclear applications, or subtle physical effects.`,
                    `For ${inlineName}, one important isotope-related consequence is that ${facts[2]}. This is where isotope chemistry becomes more than a nuclear footnote. Mass differences can shift vibrational frequencies, diffusion, reaction rates, or environmental partitioning in ways that are scientifically useful.`,
                    `A major practical use follows because ${facts[3]}. ${highlights[2]} The most interesting isotope chapters are usually the ones in which nuclear identity changes how the element is measured, dated, traced, or applied in technology.`,
                    `${facts[4]}. ${highlights[3]} The resulting picture is precise and limited at the same time: isotopes do not rewrite the whole chemistry of ${inlineName}, but they can change measurement, safety, and interpretation enough to justify a chapter of their own.`,
                ];
            case 'production':
                return [
                    `${seed.id === 'lithium' ? 'Industrial lithium supply commonly begins with extraction from brines and hard-rock minerals followed by conversion to carbonate or hydroxide; elemental lithium metal is then produced separately by fused-salt electrolysis.' : `Industrial production of ${inlineName} begins with ${facts[0]}.`} That route reflects not just availability, but the thermodynamics of separation, the chemistry of the feedstock, and the purity demands of downstream users. ${section.focusNote}`,
                    `The dominant process logic is that ${facts[1]}. ${highlights[0]} ${highlights[1]} Once this is understood, the production chapter becomes easier to read as chemical engineering rather than as an arbitrary list of industrial steps.`,
                    `A supporting or alternative route is ${facts[2]}. ${seed.id === 'helium' ? 'Helium production and purification depend mainly on helium-bearing natural gas, low-temperature separation, adsorption, compression, and in some cases recycling of boil-off; these routes create different impurity profiles and economic tradeoffs.' : seed.id === 'lithium' ? 'Brines, pegmatite ores, clays, and downstream electrochemical refining routes do not create the same impurity profile or the same economic tradeoffs.' : seed.id === 'beryllium' ? 'Beryllium production begins from bertrandite and beryl ores, and the downstream conversion, purification, reduction, and ceramic-processing steps do not produce the same impurity profile or the same economic tradeoffs.' : 'This matters because different sources and technologies favor different process chains. Brines, air, ores, natural gas, electrolysis cells, and high-temperature furnaces do not produce the same impurity profile or the same economic tradeoffs.'}`,
                    `An important refining step is ${facts[3]}. ${highlights[2]} For many elements the real difficulty is not making a crude product, but delivering material with the stability, cleanliness, particle size, or isotopic composition required for modern applications.`,
                    `${facts[4]}. ${highlights[3]} A production chapter is strongest when it leaves the reader with a clear sense of where ${inlineName} comes from, why that route dominates, and what technical constraints shape the quality and cost of the final product.`,
                ];
            case 'applied':
                return [
                    `A leading application area for ${inlineName} is ${facts[0]}. This matters because application is where atomic-scale behavior becomes visible in medicine, manufacturing, energy systems, environmental chemistry, or instrumentation. ${section.focusNote}`,
                    `Much of that importance is carried by ${facts[1]}. ${highlights[0]} ${highlights[1]} The chapter is most useful when it ties these compounds or materials back to bond strength, oxidation behavior, structure, or physical form rather than presenting them as isolated examples.`,
                    `The broader scientific or environmental significance is that ${facts[2]}. For ${inlineName}, applications are not limited to commerce. They also reveal why the element matters in biological systems, planetary processes, analytical science, or the history of chemical theory.`,
                    `Historically, ${facts[3]}. ${highlights[2]} That historical angle is worth keeping because it shows how the chemistry of ${seed.name} changed what scientists could explain, build, or measure.`,
                    `Responsible use begins with the fact that ${trimTrailingPunctuation(facts[4])}. ${highlights[3]} A strong applications chapter therefore ends with both utility and limits in view: what chemists gain from the distinctive behavior of ${inlineName}, and what controls are required to use that behavior responsibly.`,
                ];
            default:
                return assertNever(definition.key);
        }
    })();
    return paragraphs.map((text, index) => paragraph(`${definition.id}-p${index + 1}`, normalizeParagraphText(text)));
}
function buildFigureTitle(seed, definition) {
    switch (definition.key) {
        case 'classification':
            return `${seed.name} in periodic context`;
        case 'electronic':
            return `${seed.name} valence-shell model`;
        case 'physical':
            return `${seed.name} property and structure profile`;
        case 'reactivity':
            return `${seed.name} reaction landscape`;
        case 'occurrence':
            return `${seed.name} reservoirs and abundance`;
        case 'isotopes':
            return `${seed.name} isotope map`;
        case 'production':
            return `${seed.name} process pathway`;
        case 'applied':
            return `${seed.name} applications and safety matrix`;
        default:
            return assertNever(definition.key);
    }
}
function buildFigureCaption(seed, definition, section) {
    switch (definition.key) {
        case 'classification':
            return `Periodic-tile figure showing atomic number, group, period, block, room state, and oxidation context for ${seed.name}, centered on ${compactFigureText(section.facts[1], 7)}.`;
        case 'electronic':
            return `Concentric-shell model summarizing ${seed.electronConfiguration}, valence-shell occupancy, and oxidation-state behavior for ${seed.name}, with emphasis on ${compactFigureText(section.facts[1], 7)}.`;
        case 'physical':
            return `Property panel comparing state, family, structural cue, and handling context for ${seed.name}, including ${compactFigureText(section.facts[4], 8)}.`;
        case 'reactivity':
            return `Reactivity panel highlighting dominant behavior, representative systems, and operational caution for ${seed.name}, anchored by ${compactFigureText(section.facts[0], 8)}.`;
        case 'occurrence':
            return `Qualitative reservoir spectrum showing the main occurrence domains and abundance context discussed for ${seed.name}, including ${compactFigureText(section.facts[2], 8)}.`;
        case 'isotopes':
            return `Glossary-style isotope callout summarizing principal nuclides and measurement relevance for ${seed.name}, including ${compactFigureText(section.facts[3], 8)}.`;
        case 'production':
            return `Process-flow diagram summarizing the principal industrial route, supporting steps, and supply constraints for ${seed.name}, beginning with ${compactFigureText(section.facts[0], 8)}.`;
        case 'applied':
            return `Applications-and-safety matrix mapping the major uses, chemical systems, and handling limits of ${seed.name}, including ${compactFigureText(section.facts[4], 8)}.`;
        default:
            return assertNever(definition.key);
    }
}
function buildFigureAltText(seed, definition, section) {
    return `${buildFigureTitle(seed, definition)}. ${buildFigureCaption(seed, definition, section)}`;
}
function buildPeriodicTileData(seed) {
    return {
        variant: 'periodicTile',
        atomicNumber: seed.atomicNumber,
        symbol: seed.symbol,
        name: seed.name,
        atomicMass: seed.atomicMass,
        group: seed.group,
        period: seed.period,
        block: seed.block,
        category: seed.category,
        state: seed.roomState,
        oxidationStates: seed.oxidationStates,
    };
}
function buildAtomicStructureData(seed, section) {
    const shells = parseElectronShells(seed.electronConfiguration);
    const valenceCount = shells[shells.length - 1] ?? 0;
    return {
        variant: 'atomicStructure',
        symbol: seed.symbol,
        atomicNumber: seed.atomicNumber,
        electronConfiguration: seed.electronConfiguration,
        shells,
        valenceShell: `n=${shells.length} with ${valenceCount} electron${valenceCount === 1 ? '' : 's'}`,
        bondingNote: section.facts[1],
        oxidationStates: seed.oxidationStates,
    };
}
function buildPropertyComparisonData(seed, section) {
    return {
        variant: 'propertyComparison',
        metrics: [
            {
                label: 'State',
                value: seed.roomState,
                detail: section.facts[0],
            },
            {
                label: 'Family',
                value: seed.category,
                detail: section.facts[1],
            },
            {
                label: 'Structure',
                value: headlineFromText(section.facts[2], 7),
                detail: section.facts[3],
            },
            {
                label: 'Handling',
                value: headlineFromText(section.facts[4], 8),
                detail: section.facts[4],
            },
        ],
    };
}
function buildSafetyPanelData(section) {
    return {
        variant: 'safetyPanel',
        items: [
            {
                title: 'Overall profile',
                detail: section.facts[0],
                severity: severityFromText(section.facts[0]),
            },
            {
                title: 'Representative system',
                detail: section.facts[1],
                severity: severityFromText(section.facts[1]),
            },
            {
                title: 'Operational caution',
                detail: section.facts[4],
                severity: severityFromText(section.facts[4]),
            },
        ],
        footer: `${section.highlights[2]} ${section.focusNote}`,
    };
}
function buildSpectrumBarData(seed, section) {
    return {
        variant: 'spectrumBar',
        title: `${seed.name} reservoirs`,
        subtitle: compactFigureText(section.focusNote, 16),
        note: section.facts[4],
        segments: section.facts.slice(0, 4).map((fact, index) => {
            const label = classifyOccurrenceLabel(fact, index);
            return {
                label,
                detail: fact,
                weight: [34, 26, 22, 18][index] ?? 18,
                tone: occurrenceTone(label),
            };
        }),
    };
}
function buildGlossaryCalloutData(section) {
    return {
        variant: 'glossaryCallout',
        terms: [
            {
                term: 'Principal isotopes',
                definition: section.facts[0],
            },
            {
                term: 'Nuclear distinction',
                definition: section.facts[1],
            },
            {
                term: 'Practical use',
                definition: section.facts[3],
            },
            {
                term: 'Measurement note',
                definition: section.facts[4],
            },
        ],
    };
}
function buildReactionFlowData(section) {
    return {
        variant: 'reactionFlow',
        steps: [
            {
                tag: 'Feedstock',
                title: 'Source material',
                detail: section.facts[0],
            },
            {
                tag: 'Route',
                title: 'Dominant process',
                detail: section.facts[1],
            },
            {
                tag: 'Support',
                title: 'Alternative pathway',
                detail: section.facts[2],
            },
            {
                tag: 'Refining',
                title: 'Purification control',
                detail: section.facts[3],
            },
        ],
        footer: section.facts[4],
    };
}
function buildApplicationMatrixData(seed, section) {
    if (seed.id === 'hydrogen') {
        return {
            variant: 'applicationMatrix',
            columns: [
                {
                    title: 'Major applications',
                    items: [
                        { label: 'Energy', value: section.facts[0], tone: 'accent' },
                        { label: 'Compounds', value: section.facts[1], tone: 'neutral' },
                        { label: 'Scientific role', value: section.facts[2], tone: 'success' },
                    ],
                },
                {
                    title: 'Reaction systems',
                    items: [
                        { label: 'Key pathway', value: section.highlights[0], tone: 'accent' },
                        { label: 'Operational context', value: section.focusNote, tone: 'neutral' },
                        { label: 'Historical reach', value: section.facts[3], tone: 'warning' },
                    ],
                },
                {
                    title: 'Safety controls',
                    items: [
                        { label: 'Handling', value: section.facts[4], tone: 'danger' },
                        { label: 'Limits', value: section.highlights[3], tone: 'warning' },
                        { label: 'Reason', value: section.highlights[2], tone: 'neutral' },
                    ],
                },
            ],
            footer: section.highlights[1],
        };
    }
    return {
        variant: 'applicationMatrix',
        columns: [
            {
                title: 'Applications',
                items: [
                    { label: 'Use case', value: section.facts[0], tone: 'accent' },
                    { label: 'Material system', value: section.facts[1], tone: 'neutral' },
                    { label: 'Scientific role', value: section.facts[2], tone: 'success' },
                ],
            },
            {
                title: 'Context',
                items: [
                    { label: 'Historical note', value: section.facts[3], tone: 'warning' },
                    { label: 'Focus', value: section.focusNote, tone: 'neutral' },
                    { label: 'Takeaway', value: section.highlights[0], tone: 'accent' },
                ],
            },
            {
                title: 'Safety and limits',
                items: [
                    { label: 'Handling', value: section.facts[4], tone: 'danger' },
                    { label: 'Constraint', value: section.highlights[3], tone: 'warning' },
                    { label: 'Control', value: section.highlights[2], tone: 'neutral' },
                ],
            },
        ],
        footer: section.highlights[1],
    };
}
function buildFigureData(seed, definition, section) {
    switch (definition.key) {
        case 'classification':
            return buildPeriodicTileData(seed);
        case 'electronic':
            return buildAtomicStructureData(seed, section);
        case 'physical':
            return buildPropertyComparisonData(seed, section);
        case 'reactivity':
            return buildSafetyPanelData(section);
        case 'occurrence':
            return buildSpectrumBarData(seed, section);
        case 'isotopes':
            return buildGlossaryCalloutData(section);
        case 'production':
            return buildReactionFlowData(section);
        case 'applied':
            return buildApplicationMatrixData(seed, section);
        default:
            return assertNever(definition.key);
    }
}
function buildFactPrompts(seed, key) {
    switch (key) {
        case 'classification':
            return [
                `Which classification phrase best describes ${seed.name}?`,
                `Which periodic-table location matches ${seed.name}?`,
                `Which electron configuration belongs to neutral ${seed.name}?`,
                `Which statement best captures why the periodic position of ${seed.name} matters?`,
                `Which comparison statement about ${seed.name} is most accurate?`,
            ];
        case 'electronic':
            return [
                `How should the valence arrangement of ${seed.name} be described?`,
                `Which bonding behavior best fits ${seed.name}?`,
                `Which oxidation-state tendency is most characteristic of ${seed.name}?`,
                `Which representative structural pattern belongs with ${seed.name}?`,
                `Which statement best captures the electronic consequence for ${seed.name}?`,
            ];
        case 'physical':
            return [
                `How is ${seed.name} best described physically at room temperature?`,
                `Which standout physical property belongs with ${seed.name}?`,
                `Which structural explanation best accounts for the physical behavior of ${seed.name}?`,
                `Which representative form or material reference belongs with ${seed.name}?`,
                `Which laboratory implication best follows from the physical properties of ${seed.name}?`,
            ];
        case 'reactivity':
            return [
                `How should the overall reactivity of ${seed.name} be described?`,
                `Which reaction pattern is characteristic of ${seed.name}?`,
                `Which explanation best accounts for the reactivity of ${seed.name}?`,
                `Which family of compounds or reactions is central to ${seed.name}?`,
                `Which practical caution best fits the reactivity profile of ${seed.name}?`,
            ];
        case 'occurrence':
            return [
                `Where is ${seed.name} chiefly found in nature?`,
                `Which abundance statement about ${seed.name} is most accurate?`,
                `Which reservoir statement best matches ${seed.name}?`,
                `Which environmental or geochemical statement fits ${seed.name}?`,
                `Why is free elemental ${seed.name} common or uncommon on Earth?`,
            ];
        case 'isotopes':
            return [
                `Which isotope set is most important for ${seed.name}?`,
                `Which nuclear distinction belongs with ${seed.name}?`,
                `Which isotope-related chemical or physical consequence is accurate for ${seed.name}?`,
                `Which scientific or technical use of isotopes belongs with ${seed.name}?`,
                `Which measurement or safety note best fits ${seed.name}?`,
            ];
        case 'production':
            return [
                `Which production route is most important for obtaining ${seed.name}?`,
                `Which process statement best explains the dominant industrial route for ${seed.name}?`,
                `Which alternative or supporting route belongs with ${seed.name}?`,
                `Which purification or process-control step is associated with ${seed.name}?`,
                `Which supply-chain or sustainability note best fits ${seed.name}?`,
            ];
        case 'applied':
            return [
                `Which application area is central to ${seed.name}?`,
                `Which major compound or material system belongs with ${seed.name}?`,
                `Which biological, environmental, or scientific significance best fits ${seed.name}?`,
                `Which historical statement about ${seed.name} is most accurate?`,
                `Which safety context is most relevant when working with ${seed.name} or its important compounds?`,
            ];
        default:
            return assertNever(key);
    }
}
function buildStatementFrames(seed, key) {
    switch (key) {
        case 'classification':
            return [
                (fact) => `${seed.name} can be classified as ${fact}.`,
                (fact) => `A concise placement for ${seed.name} is ${fact}.`,
                (fact) => `Neutral ${seed.name} is written as ${fact}.`,
                (fact) => `The position of ${seed.name} matters because ${fact}.`,
                (fact) => `A useful comparison statement is that ${fact}.`,
            ];
        case 'electronic':
            return [
                (fact) => `The valence-shell picture for ${seed.name} is ${fact}.`,
                (fact) => `${seed.name} is best described as an element that ${fact}.`,
                (fact) => `A characteristic oxidation-state tendency for ${seed.name} is ${fact}.`,
                (fact) => `A representative structural pattern for ${seed.name} is ${fact}.`,
                (fact) => `An important electronic consequence is that ${fact}.`,
            ];
        case 'physical':
            return [
                (fact) => `At room temperature, ${seed.name} is best described as ${fact}.`,
                (fact) => `A standout physical property of ${seed.name} is that ${fact}.`,
                (fact) => `A useful structural explanation is that ${fact}.`,
                (fact) => `A representative form or material reference is ${fact}.`,
                (fact) => `A practical laboratory implication is that ${fact}.`,
            ];
        case 'reactivity':
            return [
                (fact) => `The overall reactivity of ${seed.name} is best summarized as ${fact}.`,
                (fact) => `A characteristic reaction pattern is that ${fact}.`,
                (fact) => `A key explanation for the chemistry of ${seed.name} is that ${fact}.`,
                (fact) => `A major reaction family for ${seed.name} is ${fact}.`,
                (fact) => `A practical caution is that ${fact}.`,
            ];
        case 'occurrence':
            return [
                (fact) => `In nature, ${seed.name} is found mainly as ${fact}.`,
                (fact) => `An accurate abundance statement is that ${fact}.`,
                (fact) => `A major reservoir statement is that ${fact}.`,
                (fact) => `An environmental or geochemical consequence is that ${fact}.`,
                (fact) => `A key reason for the natural distribution of ${seed.name} is that ${fact}.`,
            ];
        case 'isotopes':
            return [
                (fact) => `The principal isotope set for ${seed.name} is ${fact}.`,
                (fact) => `A nuclear distinction for ${seed.name} is that ${fact}.`,
                (fact) => `An isotope-related consequence is that ${fact}.`,
                (fact) => `A scientific or technical use is that ${fact}.`,
                (fact) => `A measurement or safety note is that ${fact}.`,
            ];
        case 'production':
            return [
                (fact) => `A principal production route for ${seed.name} is ${fact}.`,
                (fact) => `The dominant industrial logic is that ${fact}.`,
                (fact) => `A supporting route or process choice is ${fact}.`,
                (fact) => `An important refining step is ${fact}.`,
                (fact) => `A supply-chain or sustainability note is that ${fact}.`,
            ];
        case 'applied':
            return [
                (fact) => `A leading application area for ${seed.name} is ${fact}.`,
                (fact) => `A major compound or material system is ${fact}.`,
                (fact) => `An important scientific or environmental role is that ${fact}.`,
                (fact) => `A historical statement is that ${fact}.`,
                (fact) => `A major safety consideration is that ${fact}.`,
            ];
        default:
            return assertNever(key);
    }
}
function buildGlossaryItems(seed, key, section) {
    switch (key) {
        case 'classification':
            return [
                `Atomic number ${seed.atomicNumber}: the number of protons defining ${seed.name}.`,
                `${section.facts[1]}: the periodic location used to compare ${seed.name} with neighboring elements.`,
                `${seed.category}: the broad chemical family label applied to ${seed.name}.`,
            ];
        case 'electronic':
            return [
                `Electron configuration ${seed.electronConfiguration}: the electron arrangement used to interpret ${seed.name}.`,
                `Oxidation states ${seed.oxidationStates}: the common formal charge patterns shown by ${seed.name}.`,
                `Bonding behavior: ${section.facts[1]}.`,
            ];
        case 'physical':
            return [
                `Room state ${seed.roomState}: the ordinary physical state of elemental ${seed.name}.`,
                `Representative form: ${section.facts[3]}.`,
                `Laboratory note: ${section.facts[4]}.`,
            ];
        case 'reactivity':
            return [
                `Reactivity profile: ${section.facts[0]}.`,
                `Major reaction class: ${section.facts[3]}.`,
                `Practical caution: ${section.facts[4]}.`,
            ];
        case 'occurrence':
            return [
                `Occurrence: ${section.facts[0]}.`,
                `Abundance: ${section.facts[1]}.`,
                `Environmental significance: ${section.facts[3]}.`,
            ];
        case 'isotopes':
            return [
                `Principal isotopes: ${section.facts[0]}.`,
                `Nuclear distinction: ${section.facts[1]}.`,
                `Technical use: ${section.facts[3]}.`,
            ];
        case 'production':
            return [
                `Main production route: ${section.facts[0]}.`,
                `Process logic: ${section.facts[1]}.`,
                `Supply note: ${section.facts[4]}.`,
            ];
        case 'applied':
            return [
                `Leading application: ${section.facts[0]}.`,
                `Major compounds or materials: ${section.facts[1]}.`,
                `Safety context: ${section.facts[4]}.`,
            ];
        default:
            return assertNever(key);
    }
}
function chooseDistractors(seed, key, index) {
    return elementSeeds_1.chemistryElementSeeds
        .filter((candidate) => candidate.id !== seed.id)
        .map((candidate) => candidate.sections[key].facts[index])
        .filter((fact) => Boolean(fact))
        .slice(0, 3);
}
function buildFlashcards(seed, definition, section) {
    const prompts = buildFactPrompts(seed, definition.key);
    const factCards = section.facts.map((fact, index) => ({
        id: `${definition.id}-fact-${index + 1}`,
        front: prompts[index] ?? `Key fact ${index + 1} for ${seed.name}`,
        back: formatStandaloneText(fact),
    }));
    const highlightCards = section.highlights.slice(0, 3).map((highlight, index) => ({
        id: `${definition.id}-highlight-${index + 1}`,
        front: `${definition.title}: key takeaway ${index + 1} for ${seed.name}`,
        back: highlight,
    }));
    return [...factCards, ...highlightCards];
}
function buildQuiz(seed, definition, section) {
    const prompts = buildFactPrompts(seed, definition.key);
    const statementFrames = buildStatementFrames(seed, definition.key);
    const multipleChoiceQuestions = section.facts.map((fact, index) => multipleChoice(`${definition.id}-mc-${index + 1}`, prompts[index] ?? `Key fact ${index + 1} for ${seed.name}`, fact, chooseDistractors(seed, definition.key, index), `The best answer is "${formatStandaloneText(fact)}" because ${(section.highlights[index % section.highlights.length] ?? section.focusNote).toLowerCase()}`, index));
    const trueFalseQuestions = section.facts.map((fact, index) => {
        const correct = index % 2 === 0;
        const distractor = chooseDistractors(seed, definition.key, index)[0] ?? fact;
        const statementFrame = statementFrames[index] ?? ((value) => value);
        const statement = statementFrame(correct ? fact : distractor);
        const explanation = correct
            ? `True. ${statementFrame(fact)} ${section.highlights[index % section.highlights.length] ?? section.focusNote}`
            : `False. For ${seed.name}, ${statementFrame(fact)} ${section.highlights[index % section.highlights.length] ?? section.focusNote}`;
        return trueFalse(`${definition.id}-tf-${index + 1}`, statement, correct, explanation);
    });
    return [...multipleChoiceQuestions, ...trueFalseQuestions];
}
function createChapter(seed, definition) {
    const section = seed.sections[definition.key];
    const blocks = [
        ...buildParagraphs(seed, definition, section),
        bullets(`${definition.id}-highlights`, definition.bulletTitle, section.highlights),
        figure(`${definition.id}-figure`, definition.figureLabel, buildFigureTitle(seed, definition), buildFigureCaption(seed, definition, section), buildFigureData(seed, definition, section), buildFigureAltText(seed, definition, section)),
        bullets(`${definition.id}-glossary`, 'Glossary Focus', buildGlossaryItems(seed, definition.key, section)),
    ];
    return {
        id: definition.id,
        title: definition.title,
        overview: buildOverview(seed, definition, section),
        estimatedMinutes: definition.estimatedMinutes,
        blocks,
        flashcards: buildFlashcards(seed, definition, section),
        quiz: buildQuiz(seed, definition, section),
    };
}
function buildUnitGlossary(seed) {
    const baseTerms = [
        {
            term: 'Atomic number',
            definition: `The number of protons in the nucleus; ${seed.name} has atomic number ${seed.atomicNumber}.`,
        },
        {
            term: 'Electron configuration',
            definition: `A compact way of writing electron arrangement; ${seed.name} is ${seed.electronConfiguration}.`,
        },
        {
            term: 'Oxidation state',
            definition: `A formal electron-accounting value used across redox and compound chemistry; common values for ${seed.name} are ${seed.oxidationStates}.`,
        },
    ];
    const uniqueTerms = new Map();
    [...baseTerms, ...seed.glossaryExtras].forEach((entry) => {
        uniqueTerms.set(entry.term, entry);
    });
    return Array.from(uniqueTerms.values());
}
function collectSearchTerms(seed) {
    return unique([
        seed.name,
        seed.symbol,
        seed.category,
        seed.group,
        seed.period,
        seed.block,
        seed.roomState,
        seed.electronConfiguration,
        seed.oxidationStates,
        ...seed.heroFacts,
        ...chapterDefinitions.map((chapter) => chapter.title),
        ...Object.values(seed.sections).flatMap((section) => [
            section.focusNote,
            ...section.highlights,
            ...section.facts,
        ]),
    ]);
}
function createElementUnit(seed) {
    return {
        id: seed.id,
        subjectId,
        topicId,
        kind: 'element',
        order: seed.atomicNumber,
        title: seed.name,
        shortTitle: `${seed.atomicNumber} ${seed.symbol}`,
        summary: seed.summaryLine,
        overview: `${seed.summaryLine} This book-length unit follows ${seed.name} across ${chapterDefinitions.length} chapters covering classification, bonding, properties, occurrence, isotopes, production, and applications.`,
        hero: {
            eyebrow: `${seed.symbol} • Element ${seed.atomicNumber}`,
            title: seed.name,
            subtitle: seed.importanceLine,
            facts: seed.heroFacts,
        },
        metadata: [
            { label: 'Atomic Number', value: String(seed.atomicNumber) },
            { label: 'Atomic Mass', value: seed.atomicMass },
            { label: 'Group', value: seed.group },
            { label: 'Period', value: seed.period },
            { label: 'Block', value: seed.block },
            { label: 'Category', value: seed.category },
            { label: 'Room State', value: seed.roomState },
            { label: 'Oxidation States', value: seed.oxidationStates },
            { label: 'Chapters', value: String(chapterDefinitions.length) },
        ],
        glossary: buildUnitGlossary(seed),
        searchTerms: collectSearchTerms(seed),
        chapters: chapterDefinitions.map((definition) => createChapter(seed, definition)),
    };
}
exports.chemistryUnits = elementSeeds_1.chemistryElementSeeds.map(createElementUnit);
exports.chemistryTopic = {
    id: topicId,
    subjectId,
    title: 'Elements',
    description: `A deeper chemistry reading sequence on the first ${elementSeeds_1.chemistryElementSeeds.length} elements, structured as compact academic mini-textbooks.`,
    sectionLabel: 'Topic',
    learningUnits: exports.chemistryUnits,
};
exports.chemistrySubject = {
    id: subjectId,
    title: 'Chemistry',
    description: 'Introductory chemistry content built as a general learning-platform subject, beginning with elemental structure, properties, and applications.',
    tagline: 'Read, review, and quiz through structured academic content.',
    accent: 'teal',
    topics: [exports.chemistryTopic],
};
