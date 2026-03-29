import type {
  BulletListBlock,
  Chapter,
  FigureContentBlock,
  Flashcard,
  GlossaryTerm,
  LearningUnit,
  ParagraphBlock,
  QuizOption,
  QuizQuestion,
  Topic,
} from '@/content/schema';
import type { SectionKey, SectionSeed } from '@/content/subjects/shared/sectionSeeds';

interface GeologyChapterDefinition {
  key: SectionKey;
  id: string;
  title: string;
  estimatedMinutes: number;
  bulletTitle: string;
  figureLabel: string;
}

interface GeologyUnitSeed {
  title: string;
  aliases?: string[];
  keywords?: string[];
}

interface GeologyTopicSeed {
  id: string;
  title: string;
  description: string;
  units: GeologyUnitSeed[];
}

interface GeologyUnitContext {
  id: string;
  subjectId: string;
  topicId: string;
  topicTitle: string;
  topicDescription: string;
  topicOrder: number;
  topicUnitTotal: number;
  title: string;
  order: number;
  shortCode: string;
  aliases: string[];
  keywords: string[];
  summary: string;
  overview: string;
  heroFacts: string[];
  sections: Record<SectionKey, SectionSeed>;
}

const subjectId = 'geology';

function assertNever(value: never): never {
  throw new Error(`Unhandled section key: ${String(value)}`);
}

const chapterDefinitions: GeologyChapterDefinition[] = [
  {
    key: 'classification',
    id: 'foundations-and-disciplinary-framing',
    title: 'Foundations and Disciplinary Framing',
    estimatedMinutes: 7,
    bulletTitle: 'Foundational Highlights',
    figureLabel: 'Discipline Map',
  },
  {
    key: 'electronic',
    id: 'structures-models-and-earth-systems',
    title: 'Structures, Models, and Earth Systems',
    estimatedMinutes: 8,
    bulletTitle: 'Model Highlights',
    figureLabel: 'Systems Flow',
  },
  {
    key: 'physical',
    id: 'properties-identification-and-representations',
    title: 'Properties, Identification, and Representations',
    estimatedMinutes: 7,
    bulletTitle: 'Property Highlights',
    figureLabel: 'Property Panel',
  },
  {
    key: 'reactivity',
    id: 'processes-dynamics-and-geologic-change',
    title: 'Processes, Dynamics, and Geologic Change',
    estimatedMinutes: 8,
    bulletTitle: 'Process Highlights',
    figureLabel: 'Process Panel',
  },
  {
    key: 'occurrence',
    id: 'natural-context-and-earth-occurrence',
    title: 'Natural Context and Earth Occurrence',
    estimatedMinutes: 6,
    bulletTitle: 'Context Highlights',
    figureLabel: 'Context Spectrum',
  },
  {
    key: 'isotopes',
    id: 'measurement-dating-and-deeper-theory',
    title: 'Measurement, Dating, and Deeper Theory',
    estimatedMinutes: 7,
    bulletTitle: 'Theory Highlights',
    figureLabel: 'Theory Terms',
  },
  {
    key: 'production',
    id: 'methods-fieldwork-and-worked-interpretation',
    title: 'Methods, Fieldwork, and Worked Interpretation',
    estimatedMinutes: 8,
    bulletTitle: 'Method Highlights',
    figureLabel: 'Study Workflow',
  },
  {
    key: 'applied',
    id: 'applications-significance-and-hazard-context',
    title: 'Applications, Significance, and Hazard Context',
    estimatedMinutes: 8,
    bulletTitle: 'Applied Highlights',
    figureLabel: 'Application Matrix',
  },
];

function seed(title: string, aliases: string[] = [], keywords: string[] = []): GeologyUnitSeed {
  return { title, aliases, keywords };
}

const geologyTopicSeeds: GeologyTopicSeed[] = [
  {
    id: 'foundations-of-geology',
    title: 'Foundations of Geology',
    description:
      'Introductory geology concepts, the scope of Earth science, and the methods used to study Earth materials, processes, and history.',
    units: [
      seed('What Is Geology?', ['Introduction to geology'], ['earth science']),
      seed('Earth Systems and Spheres', [], ['geosphere', 'hydrosphere', 'atmosphere', 'biosphere']),
      seed('The Scientific Method in Geology', ['Scientific method']),
      seed('Deep Time and Geological Thinking', ['Deep time']),
      seed('Scale, Maps, and Geological Evidence', ['Geologic maps', 'Geological maps']),
      seed('Matter, Minerals, and Rocks Overview', ['Minerals and rocks overview']),
    ],
  },
  {
    id: 'minerals',
    title: 'Minerals',
    description:
      'The building blocks of rocks, including mineral properties, classification, identification, and formation environments.',
    units: [
      seed('What Is a Mineral?'),
      seed('Crystal Structure and Atomic Arrangement'),
      seed('Physical Properties of Minerals'),
      seed('Mineral Identification Techniques'),
      seed('Silicate Minerals'),
      seed('Non-Silicate Minerals', ['Non-silicate minerals']),
      seed('Mineral Formation Processes'),
      seed('Economic and Industrial Minerals'),
    ],
  },
  {
    id: 'igneous-processes-and-igneous-rocks',
    title: 'Igneous Processes and Igneous Rocks',
    description:
      'How magma forms, evolves, and solidifies, and how igneous rocks are classified and interpreted.',
    units: [
      seed('Magma and Lava'),
      seed('Generation of Magma'),
      seed('Magma Composition and Viscosity'),
      seed('Igneous Textures'),
      seed('Intrusive Igneous Rocks'),
      seed('Extrusive Igneous Rocks'),
      seed('Igneous Rock Classification'),
      seed('Volcanic Landforms'),
      seed('Plutons, Dikes, and Sills'),
    ],
  },
  {
    id: 'sedimentary-processes-and-sedimentary-rocks',
    title: 'Sedimentary Processes and Sedimentary Rocks',
    description:
      'Weathering, erosion, transport, deposition, lithification, and the interpretation of sedimentary environments.',
    units: [
      seed('Weathering Processes'),
      seed('Erosion and Transport'),
      seed('Sediment Deposition'),
      seed('Burial and Lithification'),
      seed('Clastic Sedimentary Rocks'),
      seed('Chemical Sedimentary Rocks'),
      seed('Biochemical Sedimentary Rocks'),
      seed('Sedimentary Structures'),
      seed('Depositional Environments'),
    ],
  },
  {
    id: 'metamorphism-and-metamorphic-rocks',
    title: 'Metamorphism and Metamorphic Rocks',
    description:
      'How heat, pressure, fluids, and deformation alter rocks and create metamorphic textures and mineral assemblages.',
    units: [
      seed('What Is Metamorphism?'),
      seed('Agents of Metamorphism'),
      seed('Metamorphic Textures'),
      seed('Foliated Metamorphic Rocks'),
      seed('Non-Foliated Metamorphic Rocks', ['Non-foliated metamorphic rocks']),
      seed('Metamorphic Grade'),
      seed('Regional Metamorphism'),
      seed('Contact Metamorphism'),
      seed('Metamorphic Facies and Interpretation'),
    ],
  },
  {
    id: 'plate-tectonics-and-earth-structure',
    title: 'Plate Tectonics and Earth Structure',
    description:
      'The internal structure of Earth and the large-scale tectonic processes that shape the planet.',
    units: [
      seed('Layers of the Earth'),
      seed('Continental and Oceanic Crust'),
      seed('The Mantle and Core'),
      seed('Continental Drift'),
      seed('Seafloor Spreading'),
      seed('Plate Tectonic Theory'),
      seed('Plate Boundaries'),
      seed('Mantle Convection and Driving Forces'),
      seed('Tectonics and Surface Change'),
    ],
  },
  {
    id: 'structural-geology',
    title: 'Structural Geology',
    description:
      'Deformation of rocks and the structures produced by stress, strain, and tectonic forces.',
    units: [
      seed('Stress and Strain'),
      seed('Brittle vs Ductile Deformation', ['Brittle and ductile deformation']),
      seed('Folding'),
      seed('Faulting'),
      seed('Joints and Fractures'),
      seed('Orientation of Geological Structures'),
      seed('Geological Cross-Sections', ['Geologic cross-sections']),
      seed('Tectonic Structures in the Field'),
    ],
  },
  {
    id: 'earthquakes',
    title: 'Earthquakes',
    description:
      'Seismic processes, fault motion, earthquake measurement, and associated hazards.',
    units: [
      seed('Causes of Earthquakes'),
      seed('Elastic Rebound Theory'),
      seed('Seismic Waves'),
      seed('Measuring Earthquakes'),
      seed('Magnitude and Intensity'),
      seed('Earthquake Distribution'),
      seed('Fault Zones and Seismic Risk'),
      seed('Earthquake Hazards and Preparedness'),
    ],
  },
  {
    id: 'volcanoes',
    title: 'Volcanoes',
    description:
      'Volcanic systems, eruption styles, volcanic landforms, and related hazards.',
    units: [
      seed('Why Volcanoes Form'),
      seed('Magma Chambers and Eruptive Systems'),
      seed('Eruption Styles'),
      seed('Lava Types'),
      seed('Pyroclastic Materials'),
      seed('Shield Volcanoes'),
      seed('Stratovolcanoes'),
      seed('Calderas and Lava Domes'),
      seed('Volcanic Hazards'),
    ],
  },
  {
    id: 'surface-processes-and-landscapes',
    title: 'Surface Processes and Landscapes',
    description:
      'How running water, wind, ice, gravity, and climate shape Earth’s surface over time.',
    units: [
      seed('The Rock Cycle in the Landscape'),
      seed('Mass Wasting'),
      seed('Streams and Rivers'),
      seed('Floodplains and Drainage Basins'),
      seed('Groundwater Basics'),
      seed('Karst and Cave Systems'),
      seed('Deserts and Wind Processes'),
      seed('Glaciers and Glaciation'),
      seed('Coastal Processes and Landforms'),
    ],
  },
  {
    id: 'geologic-time-and-stratigraphy',
    title: 'Geologic Time and Stratigraphy',
    description:
      'How geologists reconstruct Earth history using relative dating, absolute dating, stratigraphy, and the fossil record.',
    units: [
      seed('Principles of Stratigraphy'),
      seed('Relative Dating'),
      seed('Unconformities'),
      seed('Correlation of Rock Layers'),
      seed('Fossils and Faunal Succession'),
      seed('Radiometric Dating'),
      seed('The Geologic Time Scale'),
      seed('Major Events in Earth History'),
    ],
  },
  {
    id: 'paleontology-and-earth-history',
    title: 'Paleontology and Earth History',
    description:
      'Ancient life, fossilization, biological change through time, and major transitions in Earth’s biosphere.',
    units: [
      seed('Fossil Formation'),
      seed('Types of Fossils'),
      seed('Interpreting Fossil Environments'),
      seed('Evolution and the Geological Record'),
      seed('Marine Life Through Time'),
      seed('Life on Land'),
      seed('Mass Extinctions'),
      seed('Humans in Geological Context'),
    ],
  },
  {
    id: 'oceanography-and-marine-geology',
    title: 'Oceanography and Marine Geology',
    description:
      'The geology of ocean basins, seafloor processes, marine sediments, and ocean-Earth interactions.',
    units: [
      seed('Ocean Basin Structure'),
      seed('Mid-Ocean Ridges'),
      seed('Trenches and Subduction Zones'),
      seed('Marine Sediments'),
      seed('Continental Margins'),
      seed('Seafloor Mapping'),
      seed('Ocean Circulation and the Seafloor'),
      seed('Marine Resources and Hazards'),
    ],
  },
  {
    id: 'environmental-geology',
    title: 'Environmental Geology',
    description:
      'Geology as applied to natural resources, land use, hazards, water systems, and human-environment interaction.',
    units: [
      seed('Geology and Society'),
      seed('Soil Systems and Land Use'),
      seed('Water Resources'),
      seed('Groundwater Contamination'),
      seed('Landslide Risk'),
      seed('Flood Risk'),
      seed('Earthquake and Volcanic Hazard Planning'),
      seed('Waste, Mining, and Environmental Impact'),
      seed('Climate Change in the Geologic Record'),
    ],
  },
  {
    id: 'resources-energy-and-applied-geology',
    title: 'Resources, Energy, and Applied Geology',
    description:
      'How geology supports extraction, exploration, engineering, and practical decision-making.',
    units: [
      seed('Mineral Resources'),
      seed('Ore Deposits'),
      seed('Fossil Fuels'),
      seed('Geothermal Energy'),
      seed('Hydrogeology Basics'),
      seed('Engineering Geology'),
      seed('Geological Mapping', ['Geologic mapping']),
      seed('Remote Sensing and GIS in Geology', ['GIS in geology']),
      seed('Exploration Methods'),
    ],
  },
];

const geologyAccentCycle = [
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
] as const;

function section(focusNote: string, highlights: string[], facts: string[]): SectionSeed {
  return { focusNote, highlights, facts };
}

function paragraph(id: string, text: string): ParagraphBlock {
  return { id, type: 'paragraph', text };
}

function bullets(id: string, title: string, items: string[]): BulletListBlock {
  return { id, type: 'bullet-list', title, items };
}

function figure(
  id: string,
  label: string,
  title: string,
  caption: string,
  altText: string,
  data: FigureContentBlock['figure']
): FigureContentBlock {
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

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function normalizeInlineText(text: string) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
}

function trimTrailingPunctuation(text: string) {
  return normalizeInlineText(text).replace(/[.;:,!?]+$/, '').trim();
}

function capitalizeLeading(text: string) {
  const normalized = normalizeInlineText(text);
  const firstLetterIndex = normalized.search(/[A-Za-z]/);
  if (firstLetterIndex === -1) {
    return normalized;
  }

  return (
    normalized.slice(0, firstLetterIndex) +
    normalized.charAt(firstLetterIndex).toUpperCase() +
    normalized.slice(firstLetterIndex + 1)
  );
}

function formatStandaloneText(text: string) {
  return capitalizeLeading(trimTrailingPunctuation(text));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function shortCodeForTitle(title: string) {
  const parts = title
    .replace(/&/g, ' and ')
    .split(/[^A-Za-z0-9]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => !['and', 'of', 'the', 'to', 'in', 'vs', 'as'].includes(part.toLowerCase()));

  if (parts.length === 0) {
    return 'GEO';
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 3).toUpperCase();
  }

  return parts
    .slice(0, 3)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function keywordTokens(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .split(/[^a-z0-9]+/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 2);
}

function rotate<T>(values: T[], offset: number) {
  if (values.length === 0) {
    return values;
  }

  const normalized = ((offset % values.length) + values.length) % values.length;
  return [...values.slice(normalized), ...values.slice(0, normalized)];
}

function createOptions(correct: string, distractors: string[], offset: number) {
  const displayCorrect = formatStandaloneText(correct);
  const pool = unique([correct, ...distractors].map(formatStandaloneText)).slice(0, 4);
  const options: QuizOption[] = rotate(pool, offset).map((text, index) => ({
    id: `option-${index + 1}`,
    label: String.fromCharCode(65 + index),
    text,
  }));

  return {
    options,
    correctOptionId: options.find((option) => option.text === displayCorrect)?.id ?? options[0].id,
  };
}

function multipleChoice(
  id: string,
  prompt: string,
  correct: string,
  distractors: string[],
  explanation: string,
  offset: number
): QuizQuestion {
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

function trueFalse(id: string, prompt: string, answer: boolean, explanation: string): QuizQuestion {
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

function lowerConcept(context: Pick<GeologyUnitContext, 'title'>) {
  return context.title.toLowerCase();
}

function buildSummary(topic: GeologyTopicSeed, unit: GeologyUnitSeed) {
  return `${unit.title} is presented here as a geology study unit within ${topic.title}, connecting definitions, Earth-system relationships, observational evidence, field method, and applied significance.`;
}

function buildOverview(topic: GeologyTopicSeed, unit: GeologyUnitSeed) {
  return `${unit.title} is organized as an eight-chapter geology reading sequence in ${topic.title}, moving from foundations and models through properties, process interpretation, field practice, and application.`;
}

function buildHeroFacts(topic: GeologyTopicSeed, order: number, totalUnits: number, shortCode: string) {
  return [
    `Unit ${String(order).padStart(2, '0')} of ${String(totalUnits).padStart(2, '0')}`,
    `${shortCode} study code`,
    `${topic.title} sequence`,
    '8 chapters, flashcards, and quizzes',
  ];
}

function buildSections(context: Omit<GeologyUnitContext, 'sections'>): Record<SectionKey, SectionSeed> {
  const concept = lowerConcept(context);

  return {
    classification: section(
      `${context.title} is introduced as a core geology concept within ${context.topicTitle}, so the opening chapter defines the term, sets scope, and explains why it matters for Earth materials, processes, or history.`,
      [
        `${context.title} should be learned first as a disciplined geological definition with standard examples and clear boundaries.`,
        `The vocabulary of ${concept} shapes later field description, process interpretation, and Earth-history reasoning.`,
        `${context.topicTitle} uses ${concept} to connect Earth materials, structures, environments, and time-based change.`,
        `A clear conceptual frame keeps the topic from becoming a list of isolated facts or landforms.`,
      ],
      [
        `a foundational topic in ${context.topicTitle.toLowerCase()} that organizes how geologists describe ${concept}`,
        `unit ${context.order} of ${context.topicUnitTotal} in the ${context.topicTitle} sequence`,
        `${context.title} is introduced through standard definitions, representative examples, and contrasting cases`,
        `it helps distinguish which observations, materials, or processes belong inside the topic and which do not`,
        `mastery of its foundation supports later interpretation, mapping, hazard analysis, and Earth-history reconstruction`,
      ]
    ),
    electronic: section(
      `Geology becomes clearer when ${context.title} is linked to models and Earth-system relationships, so this chapter explains the structural picture that geologists use to make the topic intelligible.`,
      [
        `Geologists rely on models to simplify ${concept} without losing the process or structural relationships that matter most.`,
        `Cross-sections, system diagrams, block models, and conceptual sketches compress the logic of ${concept} into usable form.`,
        `Comparing limiting cases helps distinguish the core rule from important variations across settings.`,
        `The chosen model is useful only if it still explains what field evidence, laboratory data, or regional patterns actually show.`,
      ],
      [
        `${concept} is interpreted through structural models, process relationships, and Earth-system context`,
        `the chapter emphasizes how diagrams, maps, sections, and conceptual models simplify ${concept} without removing geologic meaning`,
        `common patterns emerge when geologists compare representative settings, end-member cases, and linked Earth systems`,
        `the unit uses those models to predict how ${concept} shapes rocks, landscapes, hazards, or the geologic record`,
        `careful model choice matters because oversimplified pictures can hide scale effects, time effects, or environmental differences`,
      ]
    ),
    physical: section(
      `${context.title} is encountered not only in words but also through properties, measurements, and visual representations, so this chapter focuses on the forms in which the idea is identified and communicated.`,
      [
        `Standard descriptions, property terms, and visual conventions keep ${concept} comparable across labs, maps, and field notes.`,
        `A good representation shows both the meaning of the topic and the limits of a particular simplification.`,
        `Representative observations and measured values reveal how scale, texture, geometry, or composition shape interpretation.`,
        `The same idea may need different representations for specimen study, map reading, and process explanation.`,
      ],
      [
        `the core observable properties are expressed with standard geologic terminology, scale language, and descriptive conventions`,
        `maps, diagrams, hand-sample descriptions, or sections make the topic easier to compare across settings`,
        `representative observations show how texture, composition, geometry, or magnitude matter when geologists discuss ${concept}`,
        `worked examples reveal which variables are observed directly and which must be inferred`,
        `the best representation depends on whether the task is identification, interpretation, mapping, or hazard communication`,
      ]
    ),
    reactivity: section(
      `The usefulness of ${context.title} becomes clearer when it is tied to the processes that make Earth systems change, so this chapter follows the dynamic principles that govern geologic behavior.`,
      [
        `Core geologic principles determine when ${concept} becomes explanatory rather than merely descriptive.`,
        `The chapter follows how those principles appear in observable change, deformation, transport, melting, deposition, or preservation.`,
        `Representative settings help separate general rules from special cases tied to temperature, pressure, water, or tectonic context.`,
        `Assumptions must be stated explicitly, because the same principle can behave differently at new scales or under new boundary conditions.`,
      ],
      [
        `${concept} becomes geologically useful when linked to governing principles such as stress, heat flow, fluid interaction, transport, or energy balance`,
        `the chapter follows how those principles determine observable Earth behavior`,
        `geologists rely on the topic to explain why some materials, structures, or environments change while others remain stable`,
        `representative field and laboratory contexts show how the idea operates in real Earth systems`,
        `careful attention to assumptions prevents misapplication when scale, climate, tectonic setting, or time frame changes`,
      ]
    ),
    occurrence: section(
      `${context.title} appears in natural systems, field settings, laboratory interpretation, and applied Earth science, so the chapter treats context as part of understanding rather than an afterthought.`,
      [
        `The same topic can look different in mountains, basins, oceans, deserts, glaciers, or the subsurface.`,
        `Real-world context determines which approximations remain useful and which must be replaced.`,
        `Geologists encounter ${concept} in both theoretical interpretation and routine field or laboratory workflow.`,
        `Context is therefore a way of deciding when a model is sufficient and when a fuller Earth-system treatment is needed.`,
      ],
      [
        `the topic appears in natural settings, field studies, laboratory interpretation, and applied Earth science rather than in one isolated environment`,
        `its real-world importance comes from how often it is used to interpret rocks, landscapes, hazards, or geologic history`,
        `the unit highlights where a geologist is most likely to encounter the idea in practice`,
        `context matters because the same principle can look different in surface environments, deep crustal settings, marine systems, or engineered sites`,
        `understanding context helps decide when a simplified model is acceptable and when a broader Earth-system view is required`,
      ]
    ),
    isotopes: section(
      `Beyond definition and description, ${context.title} has a quantitative and theoretical side. This chapter explains the logic behind the calculations, time scales, measurement tools, and deeper principles that make the topic transferable.`,
      [
        `Quantitative geology treats ${concept} through measured relationships, assumptions, and scale-sensitive reasoning rather than description alone.`,
        `The deeper theory clarifies why standard diagrams, formulas, or interpretive rules have the forms that they do.`,
        `Common errors usually come from ignoring scale, uncertainty, inherited signals, or competing processes.`,
        `More advanced examples show how the topic extends from introductory observations to richer Earth-system problems.`,
      ],
      [
        `quantitative geology treats ${concept} through measurements, approximations, and boundary conditions rather than definition alone`,
        `the deeper theory explains why standard rules, time frameworks, or interpretive tools have the forms that they do`,
        `common student errors usually come from ignoring uncertainty, assumptions, or competing geologic processes`,
        `advanced examples show how the concept extends from introductory units to richer Earth-history or Earth-system problems`,
        `careful theoretical framing makes later mapping, hazard, resource, and environmental topics easier to connect`,
      ]
    ),
    production: section(
      `Students operationalize ${context.title} through field workflows, observation, data organization, and worked interpretation, so this chapter is organized around method rather than isolated fact recall.`,
      [
        `A reliable workflow starts by identifying the evidence available, choosing the right geologic framework, and checking scale.`,
        `Measurement quality determines how confidently the topic can be applied in real geology.`,
        `Worked practice links hand samples, maps, sections, data tables, and process interpretation.`,
        `The main instructional aim is reproducible reasoning rather than one-off tricks.`,
      ],
      [
        `students typically operationalize ${concept} through field observation, mapping, laboratory work, or stepwise interpretation`,
        `a reliable workflow starts by identifying available evidence, choosing the governing framework, and checking scale`,
        `measurement and method selection determine how confidently the concept can be applied`,
        `representative practice links specimens, maps, cross-sections, data, and process interpretation`,
        `the chapter emphasizes reproducible reasoning rather than memorized shortcuts`,
      ]
    ),
    applied: section(
      `${context.title} matters because it shapes how geologists reconstruct Earth history, assess hazards, locate resources, or interpret human interaction with the planet. The closing chapter ties the topic to practical use, broader significance, and safe professional judgment.`,
      [
        `Applications make the topic memorable because they show why the concept remains central in modern Earth science.`,
        `Historical development often reveals how field evidence, laboratory method, and theory improved together.`,
        `Good professional practice includes knowing the limits of the concept as well as its strengths.`,
        `Hazard context matters whenever a topic is applied to unstable slopes, seismic risk, eruptions, groundwater, engineering, or environmental change.`,
      ],
      [
        `${context.title} has practical importance because it shapes how geologists interpret evidence, assess risk, manage resources, or understand Earth history`,
        `applications range from classroom examples to fieldwork, environmental studies, engineering, and policy`,
        `the idea becomes most memorable when tied to a concrete hazard, resource, or landscape interpretation`,
        `historical development of the topic shows how Earth-science theory and observation evolved together`,
        `safe practice depends on understanding the limits of the concept as well as the hazards of the systems where it is applied`,
      ]
    ),
  };
}

function buildParagraphs(
  context: GeologyUnitContext,
  definition: GeologyChapterDefinition,
  section: SectionSeed
): ParagraphBlock[] {
  const concept = lowerConcept(context);
  const highlights = section.highlights;
  const facts = section.facts;

  const paragraphs: string[] = (() => {
    switch (definition.key) {
      case 'classification':
        return [
          `${context.title} is best approached first as a defined geology concept, not as a loose phrase. In ${context.topicTitle}, this unit helps the reader decide what belongs within the idea, what sits outside it, and why the distinction matters for later interpretation. ${section.focusNote}`,
          `${highlights[0]} ${facts[0]}. In practice that means the learner should be able to state what ${concept} names, which representative examples illustrate it, and which nearby ideas are often confused with it.`,
          `${highlights[1]} ${facts[2]}. A strong opening chapter therefore does more than define terms. It shows how the concept becomes a framework for organizing later geologic reasoning rather than a label placed on top of a notebook page.`,
          `${facts[3]}. ${highlights[2]} The chapter is also a reminder that geology topics are not isolated compartments. Each one gains meaning because it can later be connected to field evidence, processes, materials, and Earth history.`,
          `${facts[4]}. ${highlights[3]} By the end of the opening section, ${context.title} should read like a stable conceptual anchor for the rest of the unit rather than a vocabulary list waiting to be memorized.`,
        ];
      case 'electronic':
        return [
          `${context.title} becomes easier to retain when it is tied to a model. In geology, models are disciplined simplifications that let the learner predict which structures, processes, or relationships matter first and which details can be deferred temporarily. ${section.focusNote}`,
          `${facts[0]}. ${highlights[0]} For ${concept}, the key question is not whether a model is complete in every detail, but whether it preserves the Earth-system relationship geologists need for observation, explanation, and interpretation.`,
          `${facts[1]}. ${highlights[1]} That matters because students often treat maps, block diagrams, or conceptual sections as if they were the topic itself. In reality they are tools for compressing the structure of the topic into usable form.`,
          `${facts[2]}. ${facts[3]}. The value of comparison is that it exposes which features of ${concept} are robust and which depend on scale, setting, or simplifying assumptions.`,
          `${facts[4]}. ${highlights[2]} ${highlights[3]} A mature reading of the chapter therefore treats models of ${concept} as carefully chosen explanatory devices rather than rigid pictures that must never be questioned.`,
        ];
      case 'physical':
        return [
          `Geology is learned through representations as much as through prose, so this chapter turns ${context.title} into properties, observations, scales, and visual formats that can be used in field and laboratory reasoning. ${section.focusNote}`,
          `${facts[0]}. That claim matters because standard descriptive language lets geologists compare observations across field notebooks, thin sections, maps, and reports without redefining the topic each time.`,
          `${facts[1]}. ${highlights[0]} When a representation is chosen well, it does not merely save space. It also highlights the geologically meaningful parts of ${concept} and suppresses details that are secondary for the task at hand.`,
          `${facts[2]}. ${facts[3]}. Those ideas encourage the learner to ask what a map pattern, textural description, orientation measurement, or plotted trend is actually saying about the Earth system rather than copying the representation mechanically.`,
          `${facts[4]}. ${highlights[1]} ${highlights[2]} ${highlights[3]} In that sense, the chapter is a training ground for geologic literacy: learning to choose, read, and critique the representation that best serves the problem.`,
        ];
      case 'reactivity':
        return [
          `Introductory geology topics become genuinely useful only when they can explain change. This chapter therefore links ${context.title} to the governing processes that make an Earth system deform, melt, erode, crystallize, fail, circulate, or preserve evidence. ${section.focusNote}`,
          `${facts[0]}. ${highlights[0]} In different units the underlying driver may be stress, heat transfer, fluid movement, gravitational instability, transport, or tectonic forcing. Whatever the setting, the principle matters because it translates the topic into causal language.`,
          `${facts[1]}. ${facts[2]}. That is where the chapter moves beyond vocabulary. The reader is asked to connect the concept to what a rock body, landscape, basin, fault zone, or fossil record actually does under specified conditions.`,
          `${facts[3]}. ${highlights[1]} Representative geologic settings are crucial because they show how the same principle can appear in mountains, oceans, volcanoes, groundwater systems, or environmental sites without becoming a different topic each time.`,
          `${facts[4]}. ${highlights[2]} ${highlights[3]} By the end of the section, ${context.title} should feel like a tool for geologic explanation rather than an abstract statement detached from Earth processes.`,
        ];
      case 'occurrence':
        return [
          `${context.title} belongs to more than one branch of Earth science, and this chapter explains where the concept actually appears. A reader who knows only the definition of a topic often struggles to recognize it in the wild, so contextual placement is part of mastering the unit. ${section.focusNote}`,
          `${facts[0]}. That breadth matters because geologists do not encounter topics only in the chapter where they were first taught. The same idea may reappear in hand samples, outcrops, maps, hazard reports, resource studies, or Earth-history reconstructions.`,
          `${facts[1]}. ${highlights[0]} ${highlights[1]} When context is made explicit, the topic stops feeling like an isolated curriculum box and starts functioning as a reusable interpretive lens.`,
          `${facts[2]}. ${facts[3]}. Instructors often emphasize context to help students decide which approximations remain sensible. A model that works well in one environment may need revision in another basin, climate, tectonic setting, or depth range.`,
          `${facts[4]}. ${highlights[2]} ${highlights[3]} This makes contextual awareness part of geological judgment, not just supplementary reading.`,
        ];
      case 'isotopes':
        return [
          `Deeper geologic understanding requires more than recognizing a term or remembering an example. In ${context.title}, quantitative framing and theoretical logic show why a rule works, when it stops working, and how geologists extend it to richer systems. ${section.focusNote}`,
          `${facts[0]}. ${highlights[0]} This is often the point where students discover that geologic reasoning depends heavily on assumptions, time scales, uncertainty, and the validity range of simplified models.`,
          `${facts[1]}. ${facts[2]}. A strong theory chapter therefore teaches the reader to ask what has been assumed, what evidence has been inherited, and which competing processes would matter if conditions changed.`,
          `${facts[3]}. ${highlights[1]} The chapter is not meant to turn every topic into advanced theory, but it does show how introductory geology connects to broader Earth-system treatment rather than ending at a classroom mnemonic.`,
          `${facts[4]}. ${highlights[2]} ${highlights[3]} Once that theoretical backbone is clear, later chapters on method and application rest on firmer ground.`,
        ];
      case 'production':
        return [
          `Geology topics become operational when they are applied through a workflow. This chapter focuses on the repeatable steps by which a geologist turns ${context.title} into an observation, a map interpretation, a field decision, or a defensible conclusion. ${section.focusNote}`,
          `${facts[0]}. ${facts[1]}. This is where the unit becomes practical: identify the available evidence, choose the governing framework, keep track of scale and uncertainty, and decide whether the final interpretation is geologically reasonable.`,
          `${facts[2]}. ${highlights[0]} Good method matters because two people using the same concept can still reach different conclusions if one ignores map scale, sampling bias, orientation control, dating limits, or environmental context.`,
          `${facts[3]}. ${highlights[1]} Worked practice belongs in the chapter because geologic competence is not built by definitions alone. It grows through repeated translation between observations, sections, datasets, and final Earth-science claims.`,
          `${facts[4]}. ${highlights[2]} ${highlights[3]} By the end of this section, the reader should be able to recognize a standard workflow for ${concept} and explain why each step is there.`,
        ];
      case 'applied':
        return [
          `The closing chapter asks why ${context.title} matters once the definitions, models, and methods are in place. Geology retains its coherence when concepts are seen again in applications, hazard work, environmental interpretation, resources, and safe professional practice. ${section.focusNote}`,
          `${facts[0]}. ${highlights[0]} That practical reach is important because it shows the topic surviving the transition from textbook exposition to field decisions, engineering judgment, environmental assessment, or Earth-history interpretation.`,
          `${facts[1]}. ${facts[2]}. Applications are especially valuable pedagogically because they reveal what the concept is good for: explaining a landscape, recognizing a hazard, locating a resource, or reconstructing change through time.`,
          `${facts[3]}. ${highlights[1]} Historical perspective also matters because many geologic ideas were refined only after better mapping, dating, drilling, remote sensing, or stratigraphic correlation became available.`,
          `${facts[4]}. ${highlights[2]} ${highlights[3]} A good final chapter therefore leaves the reader with both practical relevance and intellectual restraint: knowing how to use the idea and knowing where its limits begin.`,
        ];
      default:
        return assertNever(definition.key);
    }
  })();

  return paragraphs.map((text, index) => paragraph(`${definition.id}-paragraph-${index + 1}`, text));
}

function buildFigureData(
  context: GeologyUnitContext,
  definition: GeologyChapterDefinition,
  section: SectionSeed
): FigureContentBlock['figure'] {
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
          { tag: 'Diagram', title: 'Representation choice', detail: formatStandaloneText(section.facts[1]) },
          { tag: 'Pattern', title: 'Recurring relationship', detail: formatStandaloneText(section.facts[2]) },
          { tag: 'Use', title: 'Interpretive outcome', detail: formatStandaloneText(section.facts[3]) },
        ],
        footer: section.focusNote,
      };
    case 'physical':
      return {
        variant: 'propertyComparison',
        metrics: [
          { label: 'Properties', value: 'Descriptors', detail: formatStandaloneText(section.facts[0]) },
          { label: 'Representations', value: 'Maps and sections', detail: formatStandaloneText(section.facts[1]) },
          { label: 'Examples', value: 'Observations', detail: formatStandaloneText(section.facts[2]) },
          { label: 'Selection', value: 'Fit to task', detail: formatStandaloneText(section.facts[4]) },
        ],
      };
    case 'reactivity':
      return {
        variant: 'safetyPanel',
        items: [
          { title: 'Governing process', detail: formatStandaloneText(section.facts[0]), severity: 'low' },
          { title: 'Observed change', detail: formatStandaloneText(section.facts[1]), severity: 'moderate' },
          { title: 'Representative setting', detail: formatStandaloneText(section.facts[3]), severity: 'moderate' },
          { title: 'Interpretive caution', detail: formatStandaloneText(section.facts[4]), severity: 'high' },
        ],
        footer: section.focusNote,
      };
    case 'occurrence':
      return {
        variant: 'spectrumBar',
        title: `${context.title} in context`,
        subtitle: `The topic is reused across ${context.topicTitle.toLowerCase()} and adjacent Earth-science study paths.`,
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
          { tag: 'Step 1', title: 'Gather evidence', detail: formatStandaloneText(section.facts[0]) },
          { tag: 'Step 2', title: 'Choose framework', detail: formatStandaloneText(section.facts[1]) },
          { tag: 'Step 3', title: 'Measure and interpret', detail: formatStandaloneText(section.facts[2]) },
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
            title: 'Limits and hazards',
            items: [
              { label: 'Professional caution', value: formatStandaloneText(section.facts[4]), tone: 'danger' },
              { label: 'Focus note', value: section.focusNote, tone: 'neutral' },
            ],
          },
        ],
        footer: section.highlights[0],
      };
    default:
      return assertNever(definition.key);
  }
}

function buildFigureTitle(context: GeologyUnitContext, definition: GeologyChapterDefinition) {
  return `${context.title}: ${definition.figureLabel}`;
}

function buildFigureCaption(context: GeologyUnitContext, definition: GeologyChapterDefinition, section: SectionSeed) {
  return `${definition.title} for ${context.title} in ${context.topicTitle}. ${section.highlights[0]}`;
}

function buildFigureAltText(context: GeologyUnitContext, definition: GeologyChapterDefinition) {
  return `${definition.figureLabel} figure for ${context.title}.`;
}

function buildGlossaryItems(context: GeologyUnitContext, key: SectionKey, section: SectionSeed): string[] {
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
        `Interpretive use: ${section.facts[3]}.`,
      ];
    case 'physical':
      return [
        `Observable properties: ${section.facts[0]}.`,
        `Representations: ${section.facts[1]}.`,
        `Selection rule: ${section.facts[4]}.`,
      ];
    case 'reactivity':
      return [
        `Governing process: ${section.facts[0]}.`,
        `Geologic behavior: ${section.facts[1]}.`,
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
        `Hazard context: ${section.facts[4]}.`,
      ];
    default:
      return assertNever(key);
  }
}

function buildFactPrompts(context: GeologyUnitContext, key: SectionKey): string[] {
  switch (key) {
    case 'classification':
      return [
        `How is ${context.title} best framed at the start of this unit?`,
        `Where does ${context.title} sit within ${context.topicTitle}?`,
        `How is ${context.title} first introduced to the learner?`,
        `What organizing role does ${context.title} serve?`,
        `Why does the foundation of ${context.title} matter later in geology?`,
      ];
    case 'electronic':
      return [
        `How is ${context.title} modeled in this chapter?`,
        `What kind of representation is emphasized for ${context.title}?`,
        `What repeated pattern is highlighted for ${context.title}?`,
        `What interpretive role does the model of ${context.title} serve?`,
        `Why does model choice matter for ${context.title}?`,
      ];
    case 'physical':
      return [
        `How are key observations for ${context.title} usually expressed?`,
        `Which kind of representation helps compare ${context.title} across settings?`,
        `What do representative observations reveal about ${context.title}?`,
        `What do worked examples identify in ${context.title}?`,
        `How should the best representation for ${context.title} be selected?`,
      ];
    case 'reactivity':
      return [
        `What gives ${context.title} explanatory power in geology?`,
        `What does this chapter follow about ${context.title}?`,
        `Why do geologists rely on ${context.title} in process analysis?`,
        `Where does ${context.title} appear in representative geologic settings?`,
        `What prevents misapplication of ${context.title}?`,
      ];
    case 'occurrence':
      return [
        `Where is ${context.title} encountered in Earth systems?`,
        `Why is ${context.title} important beyond a single chapter?`,
        `Where is a geologist likely to encounter ${context.title} in practice?`,
        `Why does context matter when applying ${context.title}?`,
        `What helps determine whether a simplified treatment of ${context.title} is acceptable?`,
      ];
    case 'isotopes':
      return [
        `How does quantitative geology treat ${context.title}?`,
        `What does deeper theory explain about ${context.title}?`,
        `What common mistake appears when students work with ${context.title}?`,
        `How does ${context.title} extend into richer Earth-system problems?`,
        `Why does theoretical framing matter for ${context.title}?`,
      ];
    case 'production':
      return [
        `How do students usually operationalize ${context.title}?`,
        `What is the first step in a reliable workflow for ${context.title}?`,
        `What influences the confidence of work on ${context.title}?`,
        `How does practice connect ${context.title} to geologic work?`,
        `What is the chapter's main instructional emphasis for ${context.title}?`,
      ];
    case 'applied':
      return [
        `Why does ${context.title} matter in applied geology?`,
        `Where do applications of ${context.title} appear?`,
        `What makes ${context.title} memorable in practice?`,
        `What does the history of ${context.title} show?`,
        `What kind of hazard-aware judgment belongs with ${context.title}?`,
      ];
    default:
      return assertNever(key);
  }
}

function buildStatementFrames(context: GeologyUnitContext, key: SectionKey): Array<(fact: string) => string> {
  switch (key) {
    case 'classification':
      return [
        (fact: string) => `${context.title} is best framed as ${fact}.`,
        (fact: string) => `${context.title} sits within ${context.topicTitle} as ${fact}.`,
        (fact: string) => `${context.title} is introduced through ${fact}.`,
        (fact: string) => `${context.title} serves as ${fact}.`,
        (fact: string) => `The foundation of ${context.title} matters because ${fact}.`,
      ];
    case 'electronic':
      return [
        (fact: string) => `${context.title} is modeled through ${fact}.`,
        (fact: string) => `A key representation choice for ${context.title} is ${fact}.`,
        (fact: string) => `A recurring pattern is that ${fact}.`,
        (fact: string) => `The model of ${context.title} predicts that ${fact}.`,
        (fact: string) => `Model choice matters because ${fact}.`,
      ];
    case 'physical':
      return [
        (fact: string) => `Key observations for ${context.title} are expressed through ${fact}.`,
        (fact: string) => `A useful representation is ${fact}.`,
        (fact: string) => `Representative observations show that ${fact}.`,
        (fact: string) => `Worked examples reveal that ${fact}.`,
        (fact: string) => `The best representation is chosen because ${fact}.`,
      ];
    case 'reactivity':
      return [
        (fact: string) => `${context.title} gains explanatory power from ${fact}.`,
        (fact: string) => `The chapter follows how ${fact}.`,
        (fact: string) => `Geologists rely on ${context.title} because ${fact}.`,
        (fact: string) => `A representative setting is ${fact}.`,
        (fact: string) => `Misapplication is avoided when ${fact}.`,
      ];
    case 'occurrence':
      return [
        (fact: string) => `${context.title} is encountered as ${fact}.`,
        (fact: string) => `Its broader importance is that ${fact}.`,
        (fact: string) => `A geologist is likely to meet the topic through ${fact}.`,
        (fact: string) => `Context matters because ${fact}.`,
        (fact: string) => `A simplified treatment is acceptable when ${fact}.`,
      ];
    case 'isotopes':
      return [
        (fact: string) => `Quantitative geology treats ${context.title} through ${fact}.`,
        (fact: string) => `Deeper theory explains that ${fact}.`,
        (fact: string) => `A common error is that ${fact}.`,
        (fact: string) => `Advanced systems show that ${fact}.`,
        (fact: string) => `Theoretical framing matters because ${fact}.`,
      ];
    case 'production':
      return [
        (fact: string) => `${context.title} is operationalized through ${fact}.`,
        (fact: string) => `A reliable workflow begins by ${fact}.`,
        (fact: string) => `Confidence depends on ${fact}.`,
        (fact: string) => `Practice connects the topic to ${fact}.`,
        (fact: string) => `The chapter emphasizes ${fact}.`,
      ];
    case 'applied':
      return [
        (fact: string) => `${context.title} matters because ${fact}.`,
        (fact: string) => `Applications appear across ${fact}.`,
        (fact: string) => `The topic is memorable when ${fact}.`,
        (fact: string) => `Its history shows that ${fact}.`,
        (fact: string) => `Safe practice requires that ${fact}.`,
      ];
    default:
      return assertNever(key);
  }
}

function buildUnitGlossary(context: GeologyUnitContext): GlossaryTerm[] {
  return [
    {
      term: context.title,
      definition: `A geology study unit in ${context.topicTitle} that organizes definitions, models, properties, process interpretation, and applications around ${lowerConcept(context)}.`,
    },
    {
      term: 'Evidence chain',
      definition: `${context.title} is learned by linking observations, scale, process reasoning, and Earth-history or hazard interpretation.`,
    },
    {
      term: 'Applied context',
      definition: `${context.title} becomes most visible in fieldwork, hazard assessment, environmental interpretation, resource geology, or Earth-history reconstruction.`,
    },
  ];
}

function collectSearchTerms(context: GeologyUnitContext) {
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

function buildFlashcards(
  context: GeologyUnitContext,
  definition: GeologyChapterDefinition,
  section: SectionSeed
): Flashcard[] {
  const prompts = buildFactPrompts(context, definition.key);
  const factCards = section.facts.map((fact: string, index: number) => ({
    id: `${definition.id}-fact-${index + 1}`,
    front: prompts[index] ?? `Key fact ${index + 1} for ${context.title}`,
    back: formatStandaloneText(fact),
  }));

  const highlightCards = section.highlights.slice(0, 3).map((highlight: string, index: number) => ({
    id: `${definition.id}-highlight-${index + 1}`,
    front: `${definition.title}: key takeaway ${index + 1} for ${context.title}`,
    back: highlight,
  }));

  return [...factCards, ...highlightCards];
}

function chooseDistractors(
  context: GeologyUnitContext,
  key: SectionKey,
  index: number,
  allContexts: GeologyUnitContext[]
): string[] {
  const sameTopic = allContexts
    .filter((candidate) => candidate.id !== context.id && candidate.topicId === context.topicId)
    .map((candidate) => candidate.sections[key].facts[index]);

  const crossTopic = allContexts
    .filter((candidate) => candidate.id !== context.id && candidate.topicId !== context.topicId)
    .map((candidate) => candidate.sections[key].facts[index]);

  return unique([...sameTopic, ...crossTopic].filter((fact): fact is string => Boolean(fact))).slice(0, 3);
}

function buildQuiz(
  context: GeologyUnitContext,
  definition: GeologyChapterDefinition,
  section: SectionSeed,
  allContexts: GeologyUnitContext[]
): QuizQuestion[] {
  const prompts = buildFactPrompts(context, definition.key);
  const statementFrames = buildStatementFrames(context, definition.key);

  const multipleChoiceQuestions = section.facts.map((fact: string, index: number) =>
    multipleChoice(
      `${definition.id}-mc-${index + 1}`,
      prompts[index] ?? `Key fact ${index + 1} for ${context.title}`,
      fact,
      chooseDistractors(context, definition.key, index, allContexts),
      `The best answer is "${formatStandaloneText(fact)}" because ${(section.highlights[index % section.highlights.length] ?? section.focusNote).toLowerCase()}`,
      index
    )
  );

  const trueFalseQuestions = section.facts.map((fact: string, index: number) => {
    const correct = index % 2 === 0;
    const distractor = chooseDistractors(context, definition.key, index, allContexts)[0] ?? fact;
    const statementFrame = statementFrames[index] ?? ((value: string) => value);
    const statement = statementFrame(correct ? fact : distractor);
    const explanation = correct
      ? `True. ${statementFrame(fact)} ${section.highlights[index % section.highlights.length] ?? section.focusNote}`
      : `False. For ${context.title}, ${statementFrame(fact)} ${section.highlights[index % section.highlights.length] ?? section.focusNote}`;

    return trueFalse(`${definition.id}-tf-${index + 1}`, statement, correct, explanation);
  });

  return [...multipleChoiceQuestions, ...trueFalseQuestions];
}

function createChapter(
  context: GeologyUnitContext,
  definition: GeologyChapterDefinition,
  allContexts: GeologyUnitContext[]
): Chapter {
  const section = context.sections[definition.key];
  const blocks = [
    ...buildParagraphs(context, definition, section),
    bullets(`${definition.id}-highlights`, definition.bulletTitle, section.highlights),
    figure(
      `${definition.id}-figure`,
      definition.figureLabel,
      buildFigureTitle(context, definition),
      buildFigureCaption(context, definition, section),
      buildFigureAltText(context, definition),
      buildFigureData(context, definition, section)
    ),
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

function createUnitContext(topic: GeologyTopicSeed, unit: GeologyUnitSeed, topicIndex: number, index: number): GeologyUnitContext {
  const order = index + 1;
  const shortCode = shortCodeForTitle(unit.title);
  const baseContext = {
    id: `${topic.id}--${slugify(unit.title)}`,
    subjectId,
    topicId: topic.id,
    topicTitle: topic.title,
    topicDescription: topic.description,
    topicOrder: topicIndex + 1,
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

function createGeologyUnit(context: GeologyUnitContext, allContexts: GeologyUnitContext[]): LearningUnit {
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
      { label: 'Subject', value: 'Geology' },
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

const geologyUnitContexts = geologyTopicSeeds.flatMap((topic, topicIndex) =>
  topic.units.map((unit, index) => createUnitContext(topic, unit, topicIndex, index))
);

export const geologyAccentSources = Object.fromEntries(
  geologyUnitContexts.map((context) => {
    const accentSource =
      geologyAccentCycle[(context.order - 1 + (context.topicOrder - 1) * 3) % geologyAccentCycle.length];
    return [context.id, accentSource];
  })
) as Record<string, string>;

export const geologyTopics: Topic[] = geologyTopicSeeds.map((topic) => {
  const topicContexts = geologyUnitContexts.filter((context) => context.topicId === topic.id);

  return {
    id: topic.id,
    subjectId,
    title: topic.title,
    description: topic.description,
    sectionLabel: 'Topic',
    learningUnits: topicContexts.map((context) => createGeologyUnit(context, geologyUnitContexts)),
  };
});

export const geologyUnits = geologyTopics.flatMap((topic) => topic.learningUnits);
