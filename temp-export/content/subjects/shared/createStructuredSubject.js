"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSubjectAccentCycle = void 0;
exports.structuredUnits = structuredUnits;
exports.createStructuredSubject = createStructuredSubject;
const chapterDefinitions = [
    {
        key: 'classification',
        id: 'foundations-and-core-definitions',
        title: 'Foundations and Core Definitions',
        estimatedMinutes: 7,
        bulletTitle: 'Foundational Highlights',
        figureLabel: 'Concept Map',
    },
    {
        key: 'electronic',
        id: 'models-relationships-and-system-logic',
        title: 'Models, Relationships, and System Logic',
        estimatedMinutes: 8,
        bulletTitle: 'Model Highlights',
        figureLabel: 'Systems Flow',
    },
    {
        key: 'physical',
        id: 'properties-quantities-and-representations',
        title: 'Properties, Quantities, and Representations',
        estimatedMinutes: 7,
        bulletTitle: 'Representation Highlights',
        figureLabel: 'Property Panel',
    },
    {
        key: 'reactivity',
        id: 'processes-mechanisms-and-governing-principles',
        title: 'Processes, Mechanisms, and Governing Principles',
        estimatedMinutes: 8,
        bulletTitle: 'Principle Highlights',
        figureLabel: 'Behavior Panel',
    },
    {
        key: 'occurrence',
        id: 'context-real-world-presence-and-variation',
        title: 'Context, Real-World Presence, and Variation',
        estimatedMinutes: 6,
        bulletTitle: 'Context Highlights',
        figureLabel: 'Context Spectrum',
    },
    {
        key: 'isotopes',
        id: 'theory-calculation-and-deeper-logic',
        title: 'Theory, Calculation, and Deeper Logic',
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
exports.defaultSubjectAccentCycle = [
    'silicon',
    'oxygen',
    'calcium',
    'cobalt',
    'carbon',
    'boron',
    'beryllium',
    'nitrogen',
    'copper',
    'sulfur',
    'argon',
    'magnesium',
];
function structuredUnits(entries) {
    return entries.map((entry) => (typeof entry === 'string' ? { title: entry } : entry));
}
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
        return 'GEN';
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
function buildSummary(topic, unit, context) {
    return `${unit.title} is presented here as a ${context.subjectLower} study unit within ${topic.title}, connecting definitions, models, evidence, worked practice, and applied significance.`;
}
function buildOverview(topic, unit, context) {
    return `${unit.title} is organized as an eight-chapter ${context.subjectLower} reading sequence in ${topic.title}, moving from foundations and models through properties, reasoning, method, and application.`;
}
function buildHeroFacts(topic, order, totalUnits, shortCode) {
    return [
        `Unit ${String(order).padStart(2, '0')} of ${String(totalUnits).padStart(2, '0')}`,
        `${shortCode} study code`,
        `${topic.title} sequence`,
        '8 chapters, flashcards, and quizzes',
    ];
}
function inferDifficulty(order, totalUnits) {
    if (order <= Math.max(2, Math.ceil(totalUnits / 3))) {
        return 'introductory';
    }
    if (order >= Math.max(3, totalUnits - Math.floor(totalUnits / 3))) {
        return 'advanced';
    }
    return 'intermediate';
}
function getTopicIndexById(topics, topicId) {
    return topics.findIndex((topic) => topic.id === topicId);
}
function buildSections(context) {
    const concept = lowerConcept(context);
    const subject = context.subjectLower;
    return {
        classification: section(`${context.title} is introduced as a core concept within ${context.topicTitle}, so the opening chapter defines the term, sets scope, and explains why it matters within ${subject}.`, [
            `${context.title} should be learned first as a disciplined definition with standard examples and clear boundaries.`,
            `The vocabulary of ${concept} shapes later explanation, evidence-based reasoning, and problem solving.`,
            `${context.topicTitle} uses ${concept} to connect models, observations, systems, and real-world interpretation.`,
            `A clear conceptual frame keeps the topic from becoming a list of isolated facts or formulas.`,
        ], [
            `a foundational topic in ${context.topicTitle.toLowerCase()} that organizes how ${context.practitionerPlural} describe ${concept}`,
            `unit ${context.order} of ${context.topicUnitTotal} in the ${context.topicTitle} sequence`,
            `${context.title} is introduced through standard definitions, representative examples, and contrasting cases`,
            `it helps distinguish which observations, models, or relationships belong inside the topic and which do not`,
            `mastery of its foundation supports later analysis, explanation, and applied reasoning across ${subject}`,
        ]),
        electronic: section(`${context.title} becomes clearer when it is linked to models and system relationships, so this chapter explains the structural picture used to make the topic intelligible.`, [
            `${context.practitionerPlural} rely on models to simplify ${concept} without losing the relationships that matter most.`,
            `Diagrams, symbolic forms, graphs, and conceptual frameworks compress the logic of ${concept} into usable form.`,
            `Comparing limiting cases helps distinguish the core rule from important variations across settings.`,
            `The chosen model is useful only if it still explains what evidence, examples, or measured patterns actually show.`,
        ], [
            `${concept} is interpreted through models, system relationships, and standard disciplinary representations`,
            `the chapter emphasizes how diagrams, symbolic language, graphs, and conceptual models simplify ${concept} without removing meaning`,
            `common patterns emerge when ${context.practitionerPlural} compare representative settings, end-member cases, and linked systems`,
            `the unit uses those models to predict how ${concept} shapes behavior, structure, evidence, or outcomes`,
            `careful model choice matters because oversimplified pictures can hide assumptions, scale effects, or boundary conditions`,
        ]),
        physical: section(`${context.title} is encountered not only in words but also through properties, measurements, and representations, so this chapter focuses on the forms in which the idea is handled in practice.`, [
            `Standard descriptions, quantities, and visual conventions keep ${concept} comparable across lessons, worked examples, and applied contexts.`,
            `A good representation shows both the meaning of the topic and the limits of a particular simplification.`,
            `Representative observations and measured values reveal how scale, magnitude, structure, or composition shape interpretation.`,
            `The same idea may need different representations for explanation, calculation, and communication.`,
        ], [
            `the core observable or measurable properties are expressed with standard terminology, scale language, and representational conventions`,
            `maps, diagrams, graphs, tables, or structured descriptions make the topic easier to compare across settings`,
            `representative observations show how magnitude, structure, geometry, or variation matter when ${context.practitionerPlural} discuss ${concept}`,
            `worked examples reveal which variables are observed directly and which must be inferred`,
            `the best representation depends on whether the task is explanation, calculation, comparison, or practical interpretation`,
        ]),
        reactivity: section(`The usefulness of ${context.title} becomes clearer when it is tied to the processes or governing principles that make a system change, remain stable, or behave in a recognizable way.`, [
            `Core principles determine when ${concept} becomes explanatory rather than merely descriptive.`,
            `The chapter follows how those principles appear in observable behavior, change, interaction, or system response.`,
            `Representative settings help separate general rules from special cases tied to conditions, scale, or context.`,
            `Assumptions must be stated explicitly, because the same principle can behave differently under new boundary conditions.`,
        ], [
            `${concept} becomes useful when linked to governing principles such as interaction, flow, conservation, change, or system response`,
            `the chapter follows how those principles determine observable behavior`,
            `${context.practitionerPlural} rely on the topic to explain why some systems, structures, or outcomes change while others remain stable`,
            `representative contexts show how the idea operates in realistic settings rather than as an isolated abstraction`,
            `careful attention to assumptions prevents misapplication when scale, environment, or boundary conditions change`,
        ]),
        occurrence: section(`${context.title} appears across classroom examples, interpreted evidence, practical workflows, and real-world settings, so the chapter treats context as part of understanding rather than an afterthought.`, [
            `The same topic can look different across systems, settings, time scales, or data sources.`,
            `Real-world context determines which approximations remain useful and which must be replaced.`,
            `${context.practitionerPlural} encounter ${concept} in both theoretical interpretation and routine analytical or practical work.`,
            `Context is therefore a way of deciding when a model is sufficient and when a fuller treatment is needed.`,
        ], [
            `the topic appears in classroom examples, interpreted evidence, practical workflows, and real-world settings rather than in one isolated context`,
            `its importance comes from how often it is used to interpret data, explain systems, or guide decisions`,
            `the unit highlights where a learner is most likely to encounter the idea in practice`,
            `context matters because the same principle can look different across environments, scales, or application domains`,
            `understanding context helps decide when a simplified model is acceptable and when a broader view is required`,
        ]),
        isotopes: section(`Beyond definition and description, ${context.title} has a quantitative and theoretical side. This chapter explains the logic behind formulas, assumptions, measurement tools, and deeper principles that make the topic transferable.`, [
            `Quantitative work treats ${concept} through measured relationships, assumptions, and scale-sensitive reasoning rather than description alone.`,
            `The deeper theory clarifies why standard rules, formulas, or interpretive tools have the forms that they do.`,
            `Common errors usually come from ignoring scale, uncertainty, assumptions, or competing effects.`,
            `More advanced examples show how the topic extends from introductory observations to richer systems.`,
        ], [
            `quantitative study treats ${concept} through measurements, approximations, and boundary conditions rather than definition alone`,
            `the deeper theory explains why standard rules, formulas, or interpretive tools have the forms that they do`,
            `common student errors usually come from ignoring uncertainty, assumptions, or competing processes`,
            `advanced examples show how the concept extends from introductory units to richer analytical problems`,
            `careful theoretical framing makes later method and application chapters easier to connect`,
        ]),
        production: section(`Students operationalize ${context.title} through workflows, observation, data organization, and worked interpretation, so this chapter is organized around method rather than isolated fact recall.`, [
            `A reliable workflow starts by identifying the evidence available, choosing the right framework, and checking scale or units.`,
            `Measurement quality determines how confidently the topic can be applied.`,
            `Worked practice links observations, representations, data, and interpreted conclusions.`,
            `The main instructional aim is reproducible reasoning rather than one-off tricks.`,
        ], [
            `students typically operationalize ${concept} through observation, structured problem solving, data handling, or stepwise interpretation`,
            `a reliable workflow starts by identifying available evidence, choosing the governing framework, and checking assumptions`,
            `measurement and method selection determine how confidently the concept can be applied`,
            `representative practice links evidence, models, calculations, and interpretation`,
            `the chapter emphasizes reproducible reasoning rather than memorized shortcuts`,
        ]),
        applied: section(`${context.title} matters because it shapes how ${context.practitionerPlural} interpret evidence, assess systems, build explanations, or make practical decisions. The closing chapter ties the topic to application, broader significance, and responsible professional judgment.`, [
            `Applications make the topic memorable because they show why the concept remains central in modern ${subject}.`,
            `Historical development often reveals how evidence, method, and theory improved together.`,
            `Good professional practice includes knowing the limits of the concept as well as its strengths.`,
            `Safe or responsible context matters whenever a topic is applied to risk, uncertainty, complex systems, or public-facing decisions.`,
        ], [
            `${context.title} has practical importance because it shapes how ${context.practitionerPlural} interpret evidence, assess systems, or guide decisions`,
            `applications range from classroom examples to research, analysis, policy, technology, or professional practice`,
            `the idea becomes most memorable when tied to a concrete case, system, or real-world use`,
            `historical development of the topic shows how theory and method evolved together`,
            `responsible practice depends on understanding the limits of the concept as well as the risks or consequences of the systems where it is applied`,
        ]),
    };
}
function buildParagraphs(context, definition, seed) {
    const concept = lowerConcept(context);
    const highlights = seed.highlights;
    const facts = seed.facts;
    const paragraphs = (() => {
        switch (definition.key) {
            case 'classification':
                return [
                    `${context.title} is best approached first as a defined ${context.subjectLower} concept, not as a loose phrase. In ${context.topicTitle}, this unit helps the reader decide what belongs within the idea, what sits outside it, and why the distinction matters for later interpretation. ${seed.focusNote}`,
                    `${highlights[0]} ${facts[0]}. In practice that means the learner should be able to state what ${concept} names, which representative examples illustrate it, and which nearby ideas are often confused with it.`,
                    `${highlights[1]} ${facts[2]}. A strong opening chapter therefore does more than define terms. It shows how the concept becomes a framework for organizing later reasoning rather than a label placed on top of a notebook page.`,
                    `${facts[3]}. ${highlights[2]} The chapter is also a reminder that study topics are not isolated compartments. Each one gains meaning because it can later be connected to evidence, models, methods, and real-world interpretation.`,
                    `${facts[4]}. ${highlights[3]} By the end of the opening section, ${context.title} should read like a stable conceptual anchor for the rest of the unit rather than a vocabulary list waiting to be memorized.`,
                ];
            case 'electronic':
                return [
                    `${context.title} becomes easier to retain when it is tied to a model. In ${context.subjectLower}, models are disciplined simplifications that let the learner predict which relationships matter first and which details can be deferred temporarily. ${seed.focusNote}`,
                    `${facts[0]}. ${highlights[0]} For ${concept}, the key question is not whether a model is complete in every detail, but whether it preserves the relationship needed for observation, explanation, and interpretation.`,
                    `${facts[1]}. ${highlights[1]} That matters because students often treat diagrams, graphs, or symbolic forms as if they were the topic itself. In reality they are tools for compressing the structure of the topic into usable form.`,
                    `${facts[2]}. ${facts[3]}. The value of comparison is that it exposes which features of ${concept} are robust and which depend on scale, context, or simplifying assumptions.`,
                    `${facts[4]}. ${highlights[2]} ${highlights[3]} A mature reading of the chapter therefore treats models of ${concept} as carefully chosen explanatory devices rather than rigid pictures that must never be questioned.`,
                ];
            case 'physical':
                return [
                    `${context.subjectTitle} is learned through representations as much as through prose, so this chapter turns ${context.title} into properties, measurements, scales, and visual formats that can be used in disciplined reasoning. ${seed.focusNote}`,
                    `${facts[0]}. That matters because standard descriptive language lets ${context.practitionerPlural} compare observations, results, and examples without redefining the topic each time.`,
                    `${facts[1]}. ${highlights[0]} When a representation is chosen well, it does not merely save space. It also highlights the meaningful parts of ${concept} and suppresses details that are secondary for the task at hand.`,
                    `${facts[2]}. ${facts[3]}. Those ideas encourage the learner to ask what a graph, equation, dataset, map, or diagram is actually saying about the topic rather than copying the representation mechanically.`,
                    `${facts[4]}. ${highlights[1]} ${highlights[2]} ${highlights[3]} In that sense, the chapter is a training ground for disciplinary literacy: learning to choose, read, and critique the representation that best serves the problem.`,
                ];
            case 'reactivity':
                return [
                    `Introductory ${context.subjectLower} topics become genuinely useful only when they can explain behavior or change. This chapter therefore links ${context.title} to the governing principles that make a system change, remain stable, or respond in a recognizable way. ${seed.focusNote}`,
                    `${facts[0]}. ${highlights[0]} In different units the underlying driver may be interaction, structure, flow, conservation, adaptation, or system response. Whatever the setting, the principle matters because it translates the topic into causal language.`,
                    `${facts[1]}. ${facts[2]}. That is where the chapter moves beyond vocabulary. The reader is asked to connect the concept to what a system, structure, dataset, or real-world case actually does under specified conditions.`,
                    `${facts[3]}. ${highlights[1]} Representative settings are crucial because they show how the same principle can appear in different contexts without becoming a different topic each time.`,
                    `${facts[4]}. ${highlights[2]} ${highlights[3]} By the end of the section, ${context.title} should feel like a tool for explanation rather than an abstract statement detached from practice.`,
                ];
            case 'occurrence':
                return [
                    `${context.title} belongs to more than one branch of ${context.subjectLower}, and this chapter explains where the concept actually shows up. A reader who knows only the definition of a topic often struggles to recognize it in the wild, so contextual placement is part of mastering the unit. ${seed.focusNote}`,
                    `${facts[0]}. That breadth matters because ${context.practitionerPlural} do not encounter topics only in the chapter where they were first taught. The same idea may reappear in new systems, datasets, environments, or practical decisions.`,
                    `${facts[1]}. ${highlights[0]} ${highlights[1]} When context is made explicit, the topic stops feeling like an isolated curriculum box and starts functioning as a reusable interpretive lens.`,
                    `${facts[2]}. ${facts[3]}. Instructors often emphasize context to help students decide which approximations remain sensible. A model that works well in one setting may need revision in another scale, environment, or application domain.`,
                    `${facts[4]}. ${highlights[2]} ${highlights[3]} This makes contextual awareness part of disciplinary judgment, not just supplementary reading.`,
                ];
            case 'isotopes':
                return [
                    `Deeper understanding requires more than recognizing a term or remembering an example. In ${context.title}, quantitative framing and theoretical logic show why a rule works, when it stops working, and how ${context.practitionerPlural} extend it to richer systems. ${seed.focusNote}`,
                    `${facts[0]}. ${highlights[0]} This is often the point where students discover that careful reasoning depends heavily on assumptions, scale, uncertainty, and the validity range of simplified models.`,
                    `${facts[1]}. ${facts[2]}. A strong theory chapter therefore teaches the reader to ask what has been assumed, what evidence has been neglected, and which competing effects would matter if conditions changed.`,
                    `${facts[3]}. ${highlights[1]} The chapter is not meant to turn every topic into formal theory, but it does show how introductory study connects to broader analytical treatment rather than ending at a classroom mnemonic.`,
                    `${facts[4]}. ${highlights[2]} ${highlights[3]} Once that theoretical backbone is clear, later chapters on method and application rest on firmer ground.`,
                ];
            case 'production':
                return [
                    `${context.subjectTitle} topics become operational when they are applied through a workflow. This chapter focuses on the repeatable steps by which a learner turns ${context.title} into an observation, a calculation, an interpretation, or a defensible conclusion. ${seed.focusNote}`,
                    `${facts[0]}. ${facts[1]}. This is where the unit becomes practical: identify the available evidence, choose the governing framework, keep track of scale or units, and decide whether the final interpretation is reasonable.`,
                    `${facts[2]}. ${highlights[0]} Good method matters because two people using the same concept can still reach different conclusions if one ignores uncertainty, assumptions, or appropriate handling of evidence.`,
                    `${facts[3]}. ${highlights[1]} Worked practice belongs in the chapter because competence is not built by definitions alone. It grows through repeated translation between observations, representations, calculations, and final claims.`,
                    `${facts[4]}. ${highlights[2]} ${highlights[3]} By the end of this section, the reader should be able to recognize a standard workflow for ${concept} and explain why each step is there.`,
                ];
            case 'applied':
                return [
                    `The closing chapter asks why ${context.title} matters once the definitions, models, and methods are in place. ${context.subjectTitle} retains its coherence when concepts are seen again in applications, history, technology, policy, and responsible professional practice. ${seed.focusNote}`,
                    `${facts[0]}. ${highlights[0]} That practical reach is important because it shows the topic surviving the transition from textbook exposition to analysis, design, interpretation, or decision-making.`,
                    `${facts[1]}. ${facts[2]}. Applications are especially valuable pedagogically because they reveal what the concept is good for: explaining systems, assessing evidence, building tools, or understanding real-world patterns.`,
                    `${facts[3]}. ${highlights[1]} Historical perspective also matters because many disciplinary ideas were refined only after better methods, evidence, or instruments became available.`,
                    `${facts[4]}. ${highlights[2]} ${highlights[3]} A good final chapter therefore leaves the reader with both practical relevance and intellectual restraint: knowing how to use the idea and knowing where its limits begin.`,
                ];
        }
    })();
    return paragraphs.map((text, index) => paragraph(`${definition.id}-paragraph-${index + 1}`, text));
}
function buildFigureData(context, definition, sectionSeed) {
    switch (definition.key) {
        case 'classification':
            return {
                variant: 'glossaryCallout',
                terms: [
                    { term: 'Core definition', definition: formatStandaloneText(sectionSeed.facts[0]) },
                    { term: 'Topic placement', definition: formatStandaloneText(sectionSeed.facts[1]) },
                    { term: 'Study payoff', definition: formatStandaloneText(sectionSeed.facts[4]) },
                ],
            };
        case 'electronic':
            return {
                variant: 'reactionFlow',
                steps: [
                    { tag: 'Model', title: 'Primary lens', detail: formatStandaloneText(sectionSeed.facts[0]) },
                    { tag: 'Language', title: 'Representation choice', detail: formatStandaloneText(sectionSeed.facts[1]) },
                    { tag: 'Pattern', title: 'Recurring relationship', detail: formatStandaloneText(sectionSeed.facts[2]) },
                    { tag: 'Use', title: 'Interpretive outcome', detail: formatStandaloneText(sectionSeed.facts[3]) },
                ],
                footer: sectionSeed.focusNote,
            };
        case 'physical':
            return {
                variant: 'propertyComparison',
                metrics: [
                    { label: 'Quantities', value: 'Descriptors', detail: formatStandaloneText(sectionSeed.facts[0]) },
                    { label: 'Representations', value: 'Models', detail: formatStandaloneText(sectionSeed.facts[1]) },
                    { label: 'Examples', value: 'Comparisons', detail: formatStandaloneText(sectionSeed.facts[2]) },
                    { label: 'Selection', value: 'Fit to task', detail: formatStandaloneText(sectionSeed.facts[4]) },
                ],
            };
        case 'reactivity':
            return {
                variant: 'safetyPanel',
                items: [
                    { title: 'Governing principle', detail: formatStandaloneText(sectionSeed.facts[0]), severity: 'low' },
                    { title: 'Observed behavior', detail: formatStandaloneText(sectionSeed.facts[1]), severity: 'moderate' },
                    { title: 'Representative context', detail: formatStandaloneText(sectionSeed.facts[3]), severity: 'moderate' },
                    { title: 'Analytical caution', detail: formatStandaloneText(sectionSeed.facts[4]), severity: 'high' },
                ],
                footer: sectionSeed.focusNote,
            };
        case 'occurrence':
            return {
                variant: 'spectrumBar',
                title: `${context.title} in context`,
                subtitle: `The topic is reused across ${context.topicTitle.toLowerCase()} and adjacent ${context.subjectLower} topics.`,
                note: sectionSeed.focusNote,
                segments: [
                    { label: 'Foundations', detail: formatStandaloneText(sectionSeed.facts[0]), weight: 3, tone: 'accent' },
                    { label: 'Importance', detail: formatStandaloneText(sectionSeed.facts[1]), weight: 2, tone: 'success' },
                    { label: 'Practice', detail: formatStandaloneText(sectionSeed.facts[2]), weight: 2, tone: 'neutral' },
                    { label: 'Limits', detail: formatStandaloneText(sectionSeed.facts[4]), weight: 3, tone: 'warning' },
                ],
            };
        case 'isotopes':
            return {
                variant: 'glossaryCallout',
                terms: [
                    { term: 'Quantitative frame', definition: formatStandaloneText(sectionSeed.facts[0]) },
                    { term: 'Deeper theory', definition: formatStandaloneText(sectionSeed.facts[1]) },
                    { term: 'Common error', definition: formatStandaloneText(sectionSeed.facts[2]) },
                ],
            };
        case 'production':
            return {
                variant: 'reactionFlow',
                steps: [
                    { tag: 'Step 1', title: 'Identify knowns', detail: formatStandaloneText(sectionSeed.facts[0]) },
                    { tag: 'Step 2', title: 'Choose relation', detail: formatStandaloneText(sectionSeed.facts[1]) },
                    { tag: 'Step 3', title: 'Measure and apply', detail: formatStandaloneText(sectionSeed.facts[2]) },
                    { tag: 'Step 4', title: 'Check reasoning', detail: formatStandaloneText(sectionSeed.facts[4]) },
                ],
                footer: sectionSeed.focusNote,
            };
        case 'applied':
            return {
                variant: 'applicationMatrix',
                columns: [
                    {
                        title: 'Applications',
                        items: [
                            { label: 'Practical role', value: formatStandaloneText(sectionSeed.facts[0]), tone: 'accent' },
                            { label: 'Usage range', value: formatStandaloneText(sectionSeed.facts[1]), tone: 'neutral' },
                        ],
                    },
                    {
                        title: 'Scientific significance',
                        items: [
                            { label: 'Memorable context', value: formatStandaloneText(sectionSeed.facts[2]), tone: 'success' },
                            { label: 'Historical note', value: formatStandaloneText(sectionSeed.facts[3]), tone: 'warning' },
                        ],
                    },
                    {
                        title: 'Limits and practice',
                        items: [
                            { label: 'Professional caution', value: formatStandaloneText(sectionSeed.facts[4]), tone: 'danger' },
                            { label: 'Focus note', value: sectionSeed.focusNote, tone: 'neutral' },
                        ],
                    },
                ],
                footer: sectionSeed.highlights[0],
            };
    }
}
function buildGlossaryItems(context, key, sectionSeed) {
    switch (key) {
        case 'classification':
            return [
                `${context.title}: ${sectionSeed.facts[0]}.`,
                `Topic placement: ${sectionSeed.facts[1]}.`,
                `Foundational value: ${sectionSeed.facts[4]}.`,
            ];
        case 'electronic':
            return [
                `Model choice: ${sectionSeed.facts[0]}.`,
                `Representation: ${sectionSeed.facts[1]}.`,
                `Predictive use: ${sectionSeed.facts[3]}.`,
            ];
        case 'physical':
            return [
                `Standard quantities: ${sectionSeed.facts[0]}.`,
                `Representations: ${sectionSeed.facts[1]}.`,
                `Selection rule: ${sectionSeed.facts[4]}.`,
            ];
        case 'reactivity':
            return [
                `Governing principle: ${sectionSeed.facts[0]}.`,
                `System behavior: ${sectionSeed.facts[1]}.`,
                `Caution: ${sectionSeed.facts[4]}.`,
            ];
        case 'occurrence':
            return [
                `Context: ${sectionSeed.facts[0]}.`,
                `Importance: ${sectionSeed.facts[1]}.`,
                `Limit: ${sectionSeed.facts[4]}.`,
            ];
        case 'isotopes':
            return [
                `Quantitative frame: ${sectionSeed.facts[0]}.`,
                `Theory link: ${sectionSeed.facts[1]}.`,
                `Common error: ${sectionSeed.facts[2]}.`,
            ];
        case 'production':
            return [
                `Workflow: ${sectionSeed.facts[0]}.`,
                `Measurement: ${sectionSeed.facts[2]}.`,
                `Practice goal: ${sectionSeed.facts[4]}.`,
            ];
        case 'applied':
            return [
                `Practical role: ${sectionSeed.facts[0]}.`,
                `Historical meaning: ${sectionSeed.facts[3]}.`,
                `Responsible practice: ${sectionSeed.facts[4]}.`,
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
                `Why does the foundation of ${context.title} matter later in ${context.subjectLower}?`,
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
                `How are key observations for ${context.title} usually expressed?`,
                `Which kind of representation helps compare ${context.title} across systems?`,
                `What do representative values reveal about ${context.title}?`,
                `What do worked examples identify in ${context.title}?`,
                `How should the best representation for ${context.title} be selected?`,
            ];
        case 'reactivity':
            return [
                `What gives ${context.title} explanatory power?`,
                `What does this chapter follow about ${context.title}?`,
                `Why do ${context.practitionerPlural} rely on ${context.title} in analysis?`,
                `Where does ${context.title} appear in representative contexts?`,
                `What prevents misapplication of ${context.title}?`,
            ];
        case 'occurrence':
            return [
                `Where is ${context.title} encountered in practice?`,
                `Why is ${context.title} important beyond a single chapter?`,
                `Where is a learner likely to meet ${context.title} again?`,
                `Why does context matter when applying ${context.title}?`,
                `What helps determine whether a simplified treatment of ${context.title} is acceptable?`,
            ];
        case 'isotopes':
            return [
                `How does quantitative study treat ${context.title}?`,
                `What does deeper theory explain about ${context.title}?`,
                `What common mistake appears when students work with ${context.title}?`,
                `How does ${context.title} extend into richer systems?`,
                `Why does theoretical framing matter for ${context.title}?`,
            ];
        case 'production':
            return [
                `How do students usually operationalize ${context.title}?`,
                `What is the first step in a reliable workflow for ${context.title}?`,
                `What influences the confidence of work on ${context.title}?`,
                `How does practice connect ${context.title} to real work?`,
                `What is the chapter's main instructional emphasis for ${context.title}?`,
            ];
        case 'applied':
            return [
                `Why does ${context.title} matter in applied work?`,
                `Where do applications of ${context.title} appear?`,
                `What makes ${context.title} memorable in practice?`,
                `What does the history of ${context.title} show?`,
                `What kind of responsible judgment belongs with ${context.title}?`,
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
                (fact) => `Key observations for ${context.title} are expressed through ${fact}.`,
                (fact) => `A useful representation is ${fact}.`,
                (fact) => `Representative values show that ${fact}.`,
                (fact) => `Worked examples reveal that ${fact}.`,
                (fact) => `The best representation is chosen because ${fact}.`,
            ];
        case 'reactivity':
            return [
                (fact) => `${context.title} gains explanatory power from ${fact}.`,
                (fact) => `The chapter follows how ${fact}.`,
                (fact) => `${context.practitionerPlural} rely on ${context.title} because ${fact}.`,
                (fact) => `A representative context is ${fact}.`,
                (fact) => `Misapplication is avoided when ${fact}.`,
            ];
        case 'occurrence':
            return [
                (fact) => `${context.title} is encountered as ${fact}.`,
                (fact) => `Its broader importance is that ${fact}.`,
                (fact) => `A learner is likely to meet the topic through ${fact}.`,
                (fact) => `Context matters because ${fact}.`,
                (fact) => `A simplified treatment is acceptable when ${fact}.`,
            ];
        case 'isotopes':
            return [
                (fact) => `Quantitative study treats ${context.title} through ${fact}.`,
                (fact) => `Deeper theory explains that ${fact}.`,
                (fact) => `A common error is that ${fact}.`,
                (fact) => `Advanced systems show that ${fact}.`,
                (fact) => `Theoretical framing matters because ${fact}.`,
            ];
        case 'production':
            return [
                (fact) => `${context.title} is operationalized through ${fact}.`,
                (fact) => `A reliable workflow begins by ${fact}.`,
                (fact) => `Confidence depends on ${fact}.`,
                (fact) => `Practice connects the topic to ${fact}.`,
                (fact) => `The chapter emphasizes ${fact}.`,
            ];
        case 'applied':
            return [
                (fact) => `${context.title} matters because ${fact}.`,
                (fact) => `Applications appear across ${fact}.`,
                (fact) => `The topic is memorable when ${fact}.`,
                (fact) => `Its history shows that ${fact}.`,
                (fact) => `Responsible practice requires that ${fact}.`,
            ];
    }
}
function buildUnitGlossary(context) {
    return [
        {
            term: context.title,
            definition: `A ${context.subjectLower} study unit in ${context.topicTitle} that organizes definitions, models, quantities, method, and applications around ${lowerConcept(context)}.`,
        },
        {
            term: 'Evidence chain',
            definition: `${context.title} is learned by linking observations, representations, structured reasoning, and applied interpretation.`,
        },
        {
            term: 'Applied context',
            definition: `${context.title} becomes most visible in analysis, interpretation, practical problem solving, or professional decision-making.`,
        },
    ];
}
function collectSearchTerms(context) {
    return unique([
        context.title,
        context.shortCode,
        context.topicTitle,
        context.subjectTitle,
        ...context.aliases,
        ...context.keywords,
        ...keywordTokens(context.title),
        ...keywordTokens(context.topicTitle),
        ...context.heroFacts,
        ...chapterDefinitions.map((chapter) => chapter.title),
        ...Object.values(context.sections).flatMap((sectionSeed) => [
            sectionSeed.focusNote,
            ...sectionSeed.highlights,
            ...sectionSeed.facts,
        ]),
    ]);
}
function buildFlashcards(context, definition, seed) {
    const prompts = buildFactPrompts(context, definition.key);
    const factCards = seed.facts.map((fact, index) => ({
        id: `${definition.id}-fact-${index + 1}`,
        front: prompts[index],
        back: formatStandaloneText(fact),
    }));
    const highlightCards = seed.highlights.slice(0, 3).map((highlight, index) => ({
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
function buildQuiz(context, definition, seed, allContexts) {
    const prompts = buildFactPrompts(context, definition.key);
    const statementFrames = buildStatementFrames(context, definition.key);
    const multipleChoiceQuestions = seed.facts.map((fact, index) => multipleChoice(`${definition.id}-mc-${index + 1}`, prompts[index], fact, chooseDistractors(context, definition.key, index, allContexts), `The best answer is "${formatStandaloneText(fact)}" because ${seed.highlights[index % seed.highlights.length].toLowerCase()}`, index));
    const trueFalseQuestions = seed.facts.map((fact, index) => {
        const correct = index % 2 === 0;
        const distractor = chooseDistractors(context, definition.key, index, allContexts)[0] ?? fact;
        const statement = statementFrames[index](correct ? fact : distractor);
        const explanation = correct
            ? `True. ${statementFrames[index](fact)} ${seed.highlights[index % seed.highlights.length]}`
            : `False. For ${context.title}, ${statementFrames[index](fact)} ${seed.highlights[index % seed.highlights.length]}`;
        return trueFalse(`${definition.id}-tf-${index + 1}`, statement, correct, explanation);
    });
    return [...multipleChoiceQuestions, ...trueFalseQuestions];
}
function createChapter(context, definition, allContexts) {
    const seed = context.sections[definition.key];
    const blocks = [
        ...buildParagraphs(context, definition, seed),
        bullets(`${definition.id}-highlights`, definition.bulletTitle, seed.highlights),
        figure(`${definition.id}-figure`, definition.figureLabel, `${context.title}: ${definition.figureLabel}`, `${definition.title} for ${context.title} in ${context.topicTitle}. ${seed.highlights[0]}`, `${definition.figureLabel} figure for ${context.title}.`, buildFigureData(context, definition, seed)),
        bullets(`${definition.id}-glossary`, 'Glossary Focus', buildGlossaryItems(context, definition.key, seed)),
    ];
    return {
        id: definition.id,
        title: definition.title,
        overview: seed.focusNote,
        estimatedMinutes: definition.estimatedMinutes,
        blocks,
        flashcards: buildFlashcards(context, definition, seed),
        quiz: buildQuiz(context, definition, seed, allContexts),
    };
}
function createUnitContext(config, topic, topicIndex, unit, index) {
    const order = index + 1;
    const shortCode = shortCodeForTitle(unit.title);
    const baseContext = {
        id: `${topic.id}--${slugify(unit.title)}`,
        subjectId: config.id,
        subjectTitle: config.title,
        subjectLower: config.title.toLowerCase(),
        practitionerPlural: config.practitionerPlural,
        topicId: topic.id,
        topicTitle: topic.title,
        topicDescription: topic.description,
        topicOrder: topicIndex + 1,
        topicUnitTotal: topic.units.length,
        title: unit.title,
        order,
        difficulty: inferDifficulty(order, topic.units.length),
        shortCode,
        aliases: unit.aliases ?? [],
        keywords: unit.keywords ?? [],
        summary: buildSummary(topic, unit, { subjectLower: config.title.toLowerCase() }),
        overview: buildOverview(topic, unit, { subjectLower: config.title.toLowerCase() }),
        heroFacts: buildHeroFacts(topic, order, topic.units.length, shortCode),
    };
    return {
        ...baseContext,
        sections: buildSections(baseContext),
    };
}
function createLearningUnit(context, allContexts) {
    const topicContexts = allContexts.filter((candidate) => candidate.topicId === context.topicId);
    const prerequisiteUnitIds = context.order > 1 ? [topicContexts[context.order - 2]?.id].filter(Boolean) : [];
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
        difficulty: context.difficulty,
        prerequisiteUnitIds,
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
            { label: 'Subject', value: context.subjectTitle },
            { label: 'Chapter Scaffold', value: String(chapterDefinitions.length) },
            { label: 'Assessments', value: 'Flashcards + Quiz' },
            { label: 'Progress', value: 'Local-first' },
            { label: 'Content Style', value: 'Academic seed text' },
        ],
        glossary: buildUnitGlossary(context),
        references: [
            {
                title: `${context.topicTitle} sequence`,
                detail: `This seeded unit belongs to the LearnHub ${context.subjectTitle} scaffold.`,
            },
        ],
        searchTerms: collectSearchTerms(context),
        chapters: chapterDefinitions.map((definition) => createChapter(context, definition, allContexts)),
    };
}
function createStructuredSubject(config) {
    const unitContexts = config.topics.flatMap((topic, topicIndex) => topic.units.map((unit, index) => createUnitContext(config, topic, topicIndex, unit, index)));
    const accentSources = Object.fromEntries(unitContexts.map((context) => {
        const accentSource = config.accentCycle[(context.order - 1 + (context.topicOrder - 1) * 3) % config.accentCycle.length];
        return [context.id, accentSource];
    }));
    const topics = config.topics.map((topic) => {
        const topicContexts = unitContexts.filter((context) => context.topicId === topic.id);
        const topicIndex = getTopicIndexById(config.topics, topic.id);
        return {
            id: topic.id,
            subjectId: config.id,
            title: topic.title,
            description: topic.description,
            sectionLabel: 'Topic',
            recommendedFirstUnitId: topicContexts[0]?.id,
            prerequisiteTopicIds: topicIndex > 0
                ? [config.topics[topicIndex - 1].id]
                : [],
            difficulty: topicContexts[Math.min(topicContexts.length - 1, Math.floor(topicContexts.length / 2))]?.difficulty ?? 'introductory',
            learningUnits: topicContexts.map((context) => createLearningUnit(context, unitContexts)),
        };
    });
    const units = topics.flatMap((topic) => topic.learningUnits);
    const subject = {
        id: config.id,
        title: config.title,
        description: config.description,
        tagline: config.tagline,
        accent: config.accent,
        recommendedFirstTopicId: config.topics[0]?.id,
        topics,
    };
    return {
        subject,
        topics,
        units,
        accentSources,
    };
}
