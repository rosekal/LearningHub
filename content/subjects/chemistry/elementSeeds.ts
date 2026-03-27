import type { GlossaryTerm } from '@/content/schema';
import { additionalChemistryElementSeeds } from '@/content/subjects/chemistry/additionalElementSeeds';
import { transitionElementSeeds } from '@/content/subjects/chemistry/transitionElementSeeds';

export type SectionKey =
  | 'classification'
  | 'electronic'
  | 'physical'
  | 'reactivity'
  | 'occurrence'
  | 'isotopes'
  | 'production'
  | 'applied';

export interface SectionSeed {
  focusNote: string;
  highlights: string[];
  facts: string[];
}

export interface ElementSeed {
  id: string;
  name: string;
  symbol: string;
  atomicNumber: number;
  atomicMass: string;
  group: string;
  period: string;
  block: string;
  category: string;
  roomState: string;
  electronConfiguration: string;
  oxidationStates: string;
  summaryLine: string;
  importanceLine: string;
  heroFacts: string[];
  glossaryExtras: GlossaryTerm[];
  sections: Record<SectionKey, SectionSeed>;
}

function section(focusNote: string, highlights: string[], facts: string[]): SectionSeed {
  return { focusNote, highlights, facts };
}

function term(entry: string, definition: string): GlossaryTerm {
  return { term: entry, definition };
}

export const chemistryElementSeeds: ElementSeed[] = [
  {
    id: 'hydrogen',
    name: 'Hydrogen',
    symbol: 'H',
    atomicNumber: 1,
    atomicMass: '1.008',
    group: 'Usually shown above Group 1',
    period: '1',
    block: 's',
    category: 'Unique nonmetal',
    roomState: 'Gas',
    electronConfiguration: '1s1',
    oxidationStates: '+1, -1',
    summaryLine:
      'Hydrogen is the lightest element and a chemically unusual nonmetal whose single electron links acid-base chemistry, redox chemistry, isotopes, and energy systems.',
    importanceLine:
      'Its chemistry connects the periodic table to molecular bonding, nuclear science, industrial synthesis, and modern energy technology.',
    heroFacts: [
      '1s1 electron configuration',
      'Lowest-density element',
      'Most abundant element in the universe',
      'Key feedstock for ammonia and refining',
    ],
    glossaryExtras: [
      term('Proton', 'A hydrogen nucleus containing one proton and no electrons.'),
      term('Hydride', 'A species in which hydrogen behaves with formal oxidation state -1 or as a hydrogen donor.'),
      term('Hydrogenation', 'Addition of hydrogen across unsaturated bonds, usually under catalytic conditions.'),
    ],
    sections: {
      classification: section(
        'Hydrogen is placed at the top of the periodic table as the simplest atom, but its chemistry does not fit neatly into any single family.',
        [
          'Although hydrogen is drawn above the alkali metals, it is a nonmetal whose chemistry is dominated by the 1s orbital.',
          'The element can appear as H+, H., or H-, so periodic analogies must be used cautiously.',
          'Because it has no inner shell, hydrogen often magnifies quantum and bonding effects that are muted in heavier atoms.',
          'Its unusual position makes it a bridge topic linking atomic structure, acids, covalent bonding, and reduction chemistry.',
        ],
        [
          'a unique 1s nonmetal often shown above Group 1 but chemically atypical',
          'period 1, s-block, conventionally placed above Group 1 without behaving like a true alkali metal',
          '1s1',
          'it can lose one electron to form H+ or gain or share electron density in covalent and hydride chemistry',
          'its chemistry overlaps with both alkali metals and halogens, yet it fully matches neither family',
        ]
      ),
      electronic: section(
        'The single 1s electron gives hydrogen the simplest possible valence pattern, yet that simplicity supports exceptionally rich chemistry.',
        [
          'Valence behavior in hydrogen cannot be reduced to a simple metal-versus-nonmetal label.',
          'Proton transfer, hydride transfer, and electron-sharing chemistry all emerge from the same 1s valence shell.',
          'Short X-H bond distances and large quantum effects help determine acid strength, spectroscopy, and kinetics.',
          'Hydrogen bonding, though involving bound hydrogen rather than elemental H, remains one of the most consequential extensions of hydrogen chemistry.',
        ],
        [
          'a single 1s electron with no inner-shell shielding',
          'it most often forms covalent bonds, but it can also appear as H+ in acids and H- in ionic hydrides',
          '+1 in protonic compounds, -1 in saline hydrides, and 0 in H2',
          'the H-H bond in dihydrogen and polarized X-H bonds in water, acids, and hydrocarbons',
          'small size gives short bond lengths and makes proton transfer and hydrogen bonding especially significant',
        ]
      ),
      physical: section(
        'Elemental hydrogen is encountered as a very light diatomic gas, and many of its most important physical features follow from weak intermolecular forces between small H2 molecules.',
        [
          'Hydrogen has the lowest density of any element and diffuses rapidly through many materials.',
          'Its exceptionally low boiling and melting points follow from weak attractions between nonpolar H2 molecules.',
          'Liquid hydrogen is technologically important because it combines cryogenic temperature with high gravimetric energy content.',
          'Physical containment matters because leakage, embrittlement, and ignition risk are practical design constraints.',
        ],
        [
          'a colorless, odorless, extremely low-density diatomic gas',
          'it has the lowest density and among the highest diffusivities of any gas',
          'H2 molecules interact only weakly, so melting and boiling points are exceptionally low',
          'liquid hydrogen is a cryogenic fluid and compressed hydrogen is a high-energy industrial gas',
          'its low ignition energy and ability to leak through small defects demand careful containment',
        ]
      ),
      reactivity: section(
        'Hydrogen can appear deceptively gentle in the gas cylinder, but it becomes chemically decisive whenever strong X-H or O-H bond formation, catalytic activation, or proton transfer is involved.',
        [
          'As elemental H2, hydrogen is a combustible reducing agent whose oxidation product is water.',
          'Catalysts dramatically change hydrogen chemistry, allowing rapid hydrogenation, reforming, and isotope exchange.',
          'Acid-base chemistry, metal hydrides, and radical processes all belong to hydrogen’s reactivity landscape.',
          'Kinetics matter: some hydrogen mixtures are metastable until a spark, surface, or catalyst initiates reaction.',
        ],
        [
          'a combustible reducing agent that forms water when oxidized',
          'it reacts with oxygen after ignition and adds across unsaturated bonds in catalytic hydrogenation',
          'reaction energetics are governed by strong O-H and X-H bond formation',
          'acid-base proton transfer, metal hydride chemistry, and hydrogenation are major reaction classes',
          'many mixtures appear quiet until a catalyst, spark, or radical initiator is present',
        ]
      ),
      occurrence: section(
        'Hydrogen dominates the visible universe, yet on Earth it is mostly locked into compounds rather than encountered as free elemental gas.',
        [
          'Terrestrial hydrogen chemistry is inseparable from water, hydrocarbons, biomass, and hydrated minerals.',
          'Astronomical abundance makes hydrogen the starting point for stellar structure and cosmic chemical evolution.',
          'Because H2 is light and reactive, free hydrogen is uncommon near Earth’s surface even though hydrogen atoms are everywhere.',
          'Hydrogen abundance must therefore be discussed differently in planetary, environmental, and industrial contexts.',
        ],
        [
          'on Earth it is found mainly in water, hydrocarbons, biomass, and hydrated minerals rather than as free H2',
          'it is the most abundant element in the universe',
          'stars and interstellar clouds are dominated by hydrogen',
          'the terrestrial water cycle and organic chemistry act as large hydrogen reservoirs',
          'free H2 is scarce near Earth’s surface because it escapes easily and reacts readily',
        ]
      ),
      isotopes: section(
        'No other light element demonstrates isotope effects as clearly as hydrogen, because the relative mass differences between protium, deuterium, and tritium are so large.',
        [
          'Hydrogen isotopes influence both nuclear science and ordinary chemical kinetics.',
          'Replacing protium with deuterium changes vibrational frequencies and can measurably slow bond-breaking reactions.',
          'Heavy water, isotopic tracing, and fusion research all depend on the distinct isotope chemistry of hydrogen.',
          'Tritium introduces radiological issues that do not arise for protium or deuterium.',
        ],
        [
          'protium, deuterium, and tritium',
          'protium has no neutron, deuterium has one, and tritium has two and is radioactive',
          'heavier isotopes lower vibrational frequencies and can slow reactions through kinetic isotope effects',
          'heavy water, isotopic tracers, and fusion research all rely on hydrogen isotopes',
          'tritium use requires radiological control because it undergoes beta decay',
        ]
      ),
      production: section(
        'Hydrogen production sits at the intersection of fuel processing, industrial catalysis, and low-carbon energy strategy.',
        [
          'Most industrial hydrogen still comes from fossil-derived feedstocks rather than direct water splitting.',
          'Steam reforming remains dominant because it integrates efficiently with large chemical complexes.',
          'Electrolysis becomes more attractive when low-carbon electricity is available and when integration with oxygen coproducts is useful.',
          'The climate significance of hydrogen depends heavily on how the gas is produced, purified, and transported.',
        ],
        [
          'steam methane reforming, coal gasification, and water electrolysis',
          'steam reforming dominates because it integrates efficiently with large chemical plants',
          'electrolysis offers a low-carbon route when electricity is clean',
          'water-gas shift conversion, pressure swing adsorption, and membrane separation are common processing steps',
          'the environmental profile of hydrogen depends more on the production route than on the gas itself',
        ]
      ),
      applied: section(
        'Hydrogen matters technologically because it is both a reagent and an energy carrier, and intellectually because it helped shape central ideas of chemistry and physics.',
        [
          'Large-scale ammonia synthesis and petroleum hydroprocessing consume vast quantities of hydrogen.',
          'Hydrogen also anchors theories of acidity, spectroscopy, and atomic structure far beyond its industrial role.',
          'Fuel cells and related technologies treat hydrogen as a clean-use energy vector rather than as a simple combustible gas.',
          'Safe operation requires attention to ventilation, ignition sources, flame visibility, and materials compatibility.',
        ],
        [
          'ammonia synthesis, petroleum refining, hydrogenation, and fuel-cell systems',
          'ammonia, methanol, hydrocarbons, and metal hydrides are major hydrogen-containing products or reaction systems',
          'hydrogen underpins acid-base chemistry, spectroscopy, and the cosmic evolution of matter',
          'study of hydrogen helped shape quantum theory, atomic spectroscopy, and modern pH concepts',
          'safe use requires ventilation, leak detection, ignition control, and awareness that hydrogen flames can be hard to see',
        ]
      ),
    },
  },
  {
    id: 'helium',
    name: 'Helium',
    symbol: 'He',
    atomicNumber: 2,
    atomicMass: '4.0026',
    group: '18',
    period: '1',
    block: 's',
    category: 'Noble gas',
    roomState: 'Gas',
    electronConfiguration: '1s2',
    oxidationStates: '0',
    summaryLine:
      'Helium is a closed-shell noble gas whose extraordinary physical properties make it far more important in cryogenics and measurement than its chemical reactivity would suggest.',
    importanceLine:
      'It links atomic structure to low-temperature physics, natural-gas recovery, spectroscopy, and strategic resource management.',
    heroFacts: [
      'Filled 1s shell',
      'Lowest boiling point of any element',
      'Second most abundant element in the universe',
      'Essential cryogen for superconducting magnets',
    ],
    glossaryExtras: [
      term('Superfluidity', 'Flow without viscosity under special low-temperature quantum conditions, observed in liquid helium-4.'),
      term('Alpha decay', 'Nuclear decay that emits a helium-4 nucleus.'),
      term('Cryogenics', 'The science and engineering of very low temperatures.'),
    ],
    sections: {
      classification: section(
        'Helium is chemically interpreted through its completely filled 1s shell, which overrides the fact that it occupies period 1 rather than the higher-shell valence pattern seen in other noble gases.',
        [
          'Helium is placed in group 18 because its reactivity matches the noble gases, not because it has an ns2 np6 valence shell.',
          'Its classification reminds students that chemical family behavior matters more than shell notation alone.',
          'Helium serves as the simplest real example of a closed-shell, chemically inert atom.',
          'Its position clarifies why periodic classification is both structural and behavioral.',
        ],
        [
          'a period 1 noble gas with a completely filled 1s shell',
          'period 1, group 18, s-block',
          '1s2',
          'the closed shell makes helium chemically inert under ordinary conditions',
          'it resembles the noble gases in reactivity even though its electron filling is 1s rather than ns2 np6',
        ]
      ),
      electronic: section(
        'Helium shows how profoundly a closed-shell electron arrangement can suppress ordinary bond formation.',
        [
          'Its ionization energy is extremely high because the small 1s shell is tightly held close to the nucleus.',
          'Helium remains monatomic under ordinary conditions because there is no energetic benefit to conventional covalent or ionic bonding.',
          'Excited states and rare ions such as HeH+ are scientifically important even though ordinary helium chemistry is sparse.',
          'The electronic story of helium is mainly a lesson in why nonreactivity can itself be chemically informative.',
        ],
        [
          'a filled 1s shell with exceptionally high ionization energy',
          'it remains monatomic and participates only in very weak dispersion interactions under normal conditions',
          '0 is overwhelmingly dominant because stable common helium compounds are absent',
          'isolated atoms and van der Waals interactions rather than conventional bonding networks',
          'excited states and species such as HeH+ matter mostly in plasmas or astrophysical environments',
        ]
      ),
      physical: section(
        'The scientific importance of helium comes far more from its physical behavior than from ordinary chemistry.',
        [
          'Helium has the lowest boiling point of any element and stays liquid only under very low temperatures.',
          'Weak interatomic attractions and low polarizability keep condensed helium unusually elusive.',
          'Liquid helium-4 enters a superfluid regime that made helium central to twentieth-century low-temperature physics.',
          'Because helium expands rapidly on warming, cryogenic engineering depends on careful boil-off control.',
        ],
        [
          'a colorless, odorless, monatomic gas',
          'it has the lowest boiling point of any element and does not solidify at one atmosphere',
          'very weak interatomic attractions arise from closed-shell atoms with low polarizability',
          'liquid helium, including the superfluid behavior of helium-4 below the lambda point',
          'cryogenic systems must minimize boil-off and account for rapid gas expansion',
        ]
      ),
      reactivity: section(
        'Helium is the classic example of an element whose practical hazards are usually physical rather than chemical.',
        [
          'Under ordinary conditions helium resists oxidation, reduction, and direct combination with almost all reagents.',
          'When helium does appear in reactive settings, it is usually through plasmas, excited states, or extreme high-pressure environments.',
          'The very absence of common helium compounds is a consequence of electronic stability rather than lack of scientific interest.',
          'Confined-space asphyxiation and cryogenic exposure are therefore more relevant than corrosive chemistry.',
        ],
        [
          'chemically inert under ordinary conditions',
          'it resists oxidation, reduction, and direct combination with almost all other elements',
          'the closed shell and very high ionization energy make bond formation unfavorable',
          'plasma chemistry, metastable helium, and rare high-pressure inclusion compounds',
          'practical reactivity concerns are usually physical rather than chemical, especially displacement of oxygen in confined spaces',
        ]
      ),
      occurrence: section(
        'Helium is cosmically abundant but geologically scarce, making its earthly supply a resource question as much as a scientific one.',
        [
          'Most helium on Earth originates from alpha decay in rocks rather than from primordial atmospheric retention.',
          'Natural-gas reservoirs become valuable helium sources when the gas accumulates faster than it escapes.',
          'The contrast between cosmic abundance and terrestrial scarcity is one of helium’s defining themes.',
          'Because helium is light and unreactive, once released it is difficult to recapture from the atmosphere.',
        ],
        [
          'helium on Earth is concentrated in some natural gas reservoirs',
          'it is the second most abundant element in the universe',
          'stellar fusion and primordial nucleosynthesis account for cosmic helium abundance',
          'radiogenic helium is generated continuously by alpha decay in crustal rocks',
          'Earth retains only limited helium because the light gas can eventually escape to space',
        ]
      ),
      isotopes: section(
        'Helium isotopes are disproportionately important in physics because small mass changes produce large quantum and thermodynamic consequences at very low temperature.',
        [
          'Helium-4 dominates naturally and is directly tied to alpha decay.',
          'Helium-3 is rarer, more expensive, and especially valuable in low-temperature research and neutron science.',
          'Isotopic composition changes how helium behaves in cryogenic experiments.',
          'The isotope story shows how nuclear origin and physical behavior can be closely linked.',
        ],
        [
          'helium-3 and helium-4',
          'helium-4 is the common alpha-particle product, whereas helium-3 is rarer and prized scientifically',
          'isotopic mass strongly influences low-temperature quantum behavior',
          'helium-3 is used in low-temperature physics and specialized neutron-detection systems',
          'scarcity of helium-3 makes recovery and controlled use important',
        ]
      ),
      production: section(
        'Helium supply is an exercise in separation engineering rather than chemical synthesis.',
        [
          'Atmospheric helium is too dilute for cheap bulk recovery, so natural-gas processing remains the central industrial pathway.',
          'Cryogenic separation and purification are required because helium must be stripped from complex gas mixtures.',
          'Laboratories and hospitals increasingly recycle boil-off because lost helium is difficult to replace quickly.',
          'The production story of helium is therefore closely connected to conservation policy.',
        ],
        [
          'recovery from helium-bearing natural gas followed by low-temperature separation',
          'natural gas processing is dominant because atmospheric helium concentration is far too low for economical bulk recovery',
          'small amounts can be reclaimed by recycling boil-off in laboratories and hospitals',
          'purification relies on cryogenic fractionation, adsorption, and compression steps',
          'because helium is finite on human timescales once released, conservation and recycling are strategically important',
        ]
      ),
      applied: section(
        'Helium’s major uses arise from the combination of inertness, low density, and unmatched cryogenic behavior.',
        [
          'MRI magnets, low-temperature laboratories, and leak-detection systems are among helium’s most consequential applications.',
          'High-purity helium also serves as an inert atmosphere and shielding gas where contamination must be minimized.',
          'The element is historically important because it was first identified in the solar spectrum before isolation on Earth.',
          'Safety practice emphasizes cryogenic burns, pressure management, and oxygen displacement rather than chemical toxicity.',
        ],
        [
          'cryogenics, superconducting magnets, leak detection, inert shielding, and controlled-atmosphere work',
          'liquid helium and high-purity gas are the major practical forms used in science and industry',
          'helium enables MRI magnets, low-temperature physics, and high-sensitivity leak testing',
          'discovery of helium in the solar spectrum before terrestrial isolation is a classic example of spectroscopy guiding chemistry',
          'handling focuses on pressure hazards, frostbite in cryogenic service, and asphyxiation risk in poorly ventilated spaces',
        ]
      ),
    },
  },
  {
    id: 'lithium',
    name: 'Lithium',
    symbol: 'Li',
    atomicNumber: 3,
    atomicMass: '6.94',
    group: '1',
    period: '2',
    block: 's',
    category: 'Alkali metal',
    roomState: 'Solid',
    electronConfiguration: '[He] 2s1',
    oxidationStates: '+1',
    summaryLine:
      'Lithium is the lightest metal, an alkali element with unusually small ionic size, distinctive bonding behavior, and outsized importance in electrochemical technology.',
    importanceLine:
      'Its chemistry spans periodic trends, strong solvation effects, ore processing, batteries, and high-reactivity laboratory reagents.',
    heroFacts: ['Lightest metal', '[He] 2s1 valence structure', 'Commonly forms Li+', 'Central to lithium-ion batteries'],
    glossaryExtras: [
      term('Intercalation', 'Reversible insertion of ions into layered or framework solids, central to battery chemistry.'),
      term('Organolithium reagent', 'A strongly basic and nucleophilic carbon-lithium compound used in synthesis.'),
      term('Spodumene', 'A lithium-bearing silicate mineral that is an important hard-rock ore.'),
    ],
    sections: {
      classification: section(
        'Lithium belongs to the alkali metals, but its small size makes it behave differently from the heavier members of the group in many measurable ways.',
        [
          'Lithium is the first metallic element encountered in the periodic table and the lightest member of group 1.',
          'Its chemistry shows that group trends can be real without making every member interchangeable.',
          'High charge density in Li+ gives lithium partial resemblance to magnesium as well as to sodium and potassium.',
          'For this reason lithium is often taught as both a representative alkali metal and an exception within the family.',
        ],
        [
          'the lightest alkali metal and the first metal of period 2',
          'period 2, group 1, s-block',
          '[He] 2s1',
          'its very small cation gives lithium chemistry noticeably different from sodium and potassium',
          'diagonal similarities with magnesium and strong polarizing power make lithium an exception within the alkali metals',
        ]
      ),
      electronic: section(
        'Lithium illustrates how a simple one-electron valence shell can still generate rich chemistry once ionic size and solvation are taken seriously.',
        [
          'The 2s electron is readily removed, so Li+ dominates ordinary ionic chemistry.',
          'Small lithium ions interact strongly with solvents and anions, giving lithium salts distinctive thermodynamic behavior.',
          'Many organolithium compounds show polar covalent bonding rather than purely ionic separation.',
          'Electronic simplicity at the atom level leads to considerable complexity in condensed-phase and synthetic chemistry.',
        ],
        [
          'a single 2s valence electron outside a compact helium-like core',
          'it readily loses that electron to form Li+ and forms polar covalent bonds in many organolithium compounds',
          '+1 is strongly preferred in ordinary compounds',
          'small, highly solvated Li+ ions and strongly basic organolithium reagents',
          'the small radius of Li+ increases lattice energies and hydration effects relative to heavier alkali metals',
        ]
      ),
      physical: section(
        'Lithium is a metal, but many of its physical properties are unusual because the atoms are both light and relatively small.',
        [
          'Lithium combines metallic luster with very low density, making it the least dense metallic element.',
          'Its low mass does not mean weakness in every context, since microstructure and alloying strongly influence performance.',
          'Freshly cut lithium rapidly tarnishes, so apparent physical stability can be misleading.',
          'Battery technology exploits lithium more often through compounds and ion transport than through bulk metal alone.',
        ],
        [
          'a soft, silvery, very low-density metal',
          'it is the least dense metallic element and is noticeably lighter than the common engineering metals',
          'metallic bonding in a light, small-atom lattice gives modest hardness but very low density',
          'body-centered cubic lithium metal and high-surface-area battery materials derived from lithium compounds',
          'fresh surfaces tarnish in air, so samples are cut and stored under inert conditions or oil',
        ]
      ),
      reactivity: section(
        'Lithium is an alkali metal, yet its reactivity profile is more controlled and chemically nuanced than the dramatic demonstrations often associated with sodium or potassium.',
        [
          'Lithium reacts with water, oxygen, and nitrogen, but the details reflect its small ionic radius and high lattice energies.',
          'Direct formation of lithium nitride is a classic group-1 exception.',
          'Organolithium reagents reveal how elemental lithium ultimately supports some of the strongest bases used in synthesis.',
          'Finely divided lithium and battery materials can react far more aggressively than bulk metal samples.',
        ],
        [
          'a reactive alkali metal and strong reducing agent',
          'it reacts with water, oxygen, and nitrogen, though less violently than sodium or potassium',
          'the stability of Li+ and high lattice energies drive formation of ionic products',
          'oxide, nitride, hydride, organolithium, and lithium salt chemistry are major reaction classes',
          'its reactions can accelerate sharply once clean metal is exposed or finely divided material is formed',
        ]
      ),
      occurrence: section(
        'Lithium never occurs native in nature, so its supply depends on the geochemistry of soluble salts and specialized silicate minerals.',
        [
          'Economically important lithium accumulates in brines, pegmatites, and selected clay deposits.',
          'Its mobility in water allows natural concentration by evaporation in arid basins.',
          'The abundance question for lithium is shaped as much by recoverable concentration as by crustal average abundance.',
          'Modern battery demand has turned geological occurrence into a major industrial and geopolitical topic.',
        ],
        [
          'lithium occurs in brines, pegmatite minerals, clays, and trace amounts in seawater',
          'it is relatively scarce in Earth’s crust compared with common rock-forming elements',
          'spodumene, lepidolite, and salar brines are major economic sources',
          'lithium is mobile in aqueous geochemical systems and becomes concentrated by evaporation',
          'because of its reactivity, free lithium metal does not occur naturally',
        ]
      ),
      isotopes: section(
        'Lithium isotope chemistry matters not because lithium is radioactive in ordinary samples, but because the two stable nuclides differ in abundance and nuclear usefulness.',
        [
          'Lithium-7 dominates natural lithium, while lithium-6 has specialized nuclear importance.',
          'The light masses of both isotopes allow measurable isotopic effects in transport and spectroscopy.',
          'Lithium-6 participates in neutron-capture pathways relevant to fusion technology.',
          'Isotopic enrichment turns a common element into a strategic nuclear material.',
        ],
        [
          'lithium-6 and lithium-7',
          'both are stable, with lithium-7 much more abundant',
          'isotopic mass differences affect diffusion and some spectroscopic measurements',
          'lithium-6 is important for neutron capture and tritium breeding in fusion technology',
          'isotopic enrichment is technically valuable but costly',
        ]
      ),
      production: section(
        'Lithium production begins not with metal but with salts, concentrates, and refining routes tuned to downstream battery requirements.',
        [
          'Brine extraction and hard-rock mining lead to different chemical processing chains and different environmental tradeoffs.',
          'Battery-grade lithium compounds demand tight impurity control because trace metals can damage performance.',
          'Conversion from ore or brine to carbonate and hydroxide is the central chemical step in most supply chains.',
          'The industrial story of lithium is therefore a story of purification as much as extraction.',
        ],
        [
          'extraction from brines and hard-rock minerals followed by conversion to carbonate or hydroxide',
          'brine processing is attractive where evaporation and impurity control are favorable',
          'spodumene concentrates can be calcined, leached, and converted into battery-grade salts',
          'refining aims to control magnesium, sodium, calcium, and transition-metal impurities',
          'supply chains are shaped by battery demand, water use, and ore-to-chemical processing choices',
        ]
      ),
      applied: section(
        'Lithium became globally important long before portable electronics, but modern batteries made it one of the signature elements of contemporary materials chemistry.',
        [
          'Rechargeable lithium-ion systems dominate the public perception of lithium for good reason.',
          'Lithium compounds also matter in glass, ceramics, lubricants, and medicine.',
          'The element demonstrates how atomic size, ion mobility, and redox stability can scale into transformative technologies.',
          'Safety concerns depend strongly on chemical form, especially for metallic lithium and reactive organolithium reagents.',
        ],
        [
          'rechargeable batteries, light alloys, glass and ceramics, greases, and selected pharmaceuticals',
          'lithium carbonate, lithium hydroxide, lithium cobalt oxide, and other electrode materials are especially important',
          'lithium-ion intercalation chemistry underpins portable electronics and electric vehicles',
          'the element’s modern importance surged with electrochemical energy storage, although earlier uses included greases and specialty glass',
          'metallic lithium and strong lithium reagents require dry handling because moisture and air can trigger fire',
        ]
      ),
    },
  },
  {
    id: 'beryllium',
    name: 'Beryllium',
    symbol: 'Be',
    atomicNumber: 4,
    atomicMass: '9.0122',
    group: '2',
    period: '2',
    block: 's',
    category: 'Alkaline earth metal',
    roomState: 'Solid',
    electronConfiguration: '[He] 2s2',
    oxidationStates: '+2',
    summaryLine:
      'Beryllium is a light, stiff alkaline earth metal whose very small doubly charged ion makes its chemistry far more covalent and hazardous than group trends alone would suggest.',
    importanceLine:
      'It connects periodic structure to polarizing power, oxide passivation, specialized metallurgy, and significant occupational toxicology.',
    heroFacts: ['[He] 2s2 valence structure', 'Small, highly polarizing Be2+', 'High stiffness-to-weight ratio', 'Serious inhalation hazard'],
    glossaryExtras: [
      term('Amphoteric', 'Able to react as either an acid or a base, as seen in some beryllium compounds.'),
      term('Beryllia', 'Beryllium oxide, a high-performance ceramic with useful thermal properties.'),
      term('Chronic beryllium disease', 'A serious immune-mediated lung disorder caused by exposure to beryllium particles.'),
    ],
    sections: {
      classification: section(
        'Beryllium is formally an alkaline earth metal, but its group identity must always be read alongside its unusually small cation and strong polarizing power.',
        [
          'Beryllium occupies the expected group-2 position but does not behave like a simple scaled-down magnesium.',
          'The very small Be2+ ion makes many of its compounds partly covalent rather than purely ionic.',
          'Group trends become less reliable at beryllium than at the heavier alkaline earth metals.',
          'Its classification is therefore a useful reminder that position in the table is only the start of interpretation.',
        ],
        [
          'a period 2 alkaline earth metal with unusually covalent chemistry for its group',
          'period 2, group 2, s-block',
          '[He] 2s2',
          'its tiny Be2+ ion polarizes anions strongly, so simple ionic models often fail',
          'beryllium differs sharply from magnesium and heavier group 2 metals because of its small size and high charge density',
        ]
      ),
      electronic: section(
        'Beryllium demonstrates that a formally simple 2s2 valence shell can produce unexpectedly complex bonding once ionic size and electron deficiency are considered.',
        [
          'Loss of two valence electrons gives Be2+, but the resulting cation is so small that it distorts neighboring electron clouds strongly.',
          'Many beryllium compounds are short-bonded, covalent, bridged, or polymeric rather than straightforward ionic lattices.',
          'Lewis acidity and electron deficiency help explain the behavior of beryllium halides and oxides.',
          'The bonding chemistry of beryllium is therefore central to understanding why its toxicology and materials behavior are unusual.',
        ],
        [
          'a filled 2s valence shell that is normally ionized to Be2+',
          'beryllium forms short, often covalent bonds and readily makes polymeric or bridged structures',
          '+2 dominates, but the resulting compounds can be far less ionic than group trends suggest',
          'linear BeCl2 in the gas phase and tetrahedral coordination in many complexes',
          'electron deficiency and strong polarization explain amphoteric behavior and Lewis acidity',
        ]
      ),
      physical: section(
        'The physical appeal of beryllium lies in a combination of low density, rigidity, and transparency to X-rays that few other engineering elements can match.',
        [
          'Beryllium is light, stiff, and dimensionally stable, which makes it valuable in demanding aerospace and instrument applications.',
          'Its physical advantages cannot be separated from the hazards of machining or powder formation.',
          'Bulk metal and ceramic beryllia each exploit different aspects of the same underlying atomic and bonding picture.',
          'Handling therefore requires both materials-science judgment and industrial hygiene discipline.',
        ],
        [
          'a hard, light, steel-gray metal with high stiffness and low density',
          'it combines low density with a high elastic modulus and good X-ray transparency',
          'a tightly bound metallic lattice and low atomic mass produce an unusual stiffness-to-weight ratio',
          'beryllium metal, BeO ceramics, and X-ray window materials',
          'machining and powder handling require strict containment because inhaled beryllium dust is highly toxic',
        ]
      ),
      reactivity: section(
        'Beryllium can seem less reactive than might be expected for an alkaline earth metal because a passive oxide film moderates the behavior of the surface.',
        [
          'Passivation suppresses attack in air and water under many conditions, but it does not remove the underlying reactivity of the metal.',
          'Beryllium compounds frequently reveal amphoteric and covalent tendencies absent from simpler group-2 models.',
          'Acid and base reactions alike can become important once the protective surface layer is disrupted.',
          'Reactivity and toxicity must be discussed together because the main laboratory hazard is not dramatic combustion but chronic exposure.',
        ],
        [
          'a moderately reactive metal protected by a passive oxide film',
          'it resists attack in air at room temperature but reacts with acids and strong bases under the right conditions',
          'surface passivation suppresses reaction until the film is removed or destabilized',
          'amphoteric oxide and hydroxide chemistry, halides, and high-temperature oxidation are central reaction patterns',
          'apparent stability should not be confused with safety because toxicology, not only reactivity, governs laboratory handling',
        ]
      ),
      occurrence: section(
        'Beryllium is not abundant, and economic production depends on a narrow set of mineral sources.',
        [
          'Beryl and bertrandite are the principal ores from which industrial beryllium is obtained.',
          'The element tends to concentrate in specialized igneous and hydrothermal settings rather than common crustal minerals.',
          'Natural occurrence is therefore best understood through economic geology, not simple abundance tables alone.',
          'Because the metal is reactive and rare, elemental beryllium does not occur native in ordinary environments.',
        ],
        [
          'beryllium is found mainly in minerals such as beryl and bertrandite',
          'it is a minor crustal element concentrated in specialized igneous and hydrothermal environments',
          'pegmatites and altered volcanic deposits host the principal ores',
          'it does not play a broad biological role but it can persist as a contaminant where industrial use occurs',
          'native beryllium is absent in nature because the metal is too reactive to remain uncombined',
        ]
      ),
      isotopes: section(
        'Beryllium isotope chemistry is unusual because one stable nuclide coexists with cosmogenic radioisotopes of major scientific value.',
        [
          'Beryllium-9 is the only stable isotope in ordinary matter.',
          'Beryllium-10 and beryllium-7 are especially important in Earth and atmospheric sciences because they are produced by cosmic-ray interactions.',
          'The element also has a distinctive place in neutron-related nuclear applications.',
          'Isotope discussion must be separated from dust toxicity, since the hazards arise from different mechanisms.',
        ],
        [
          'beryllium-9 is the only stable isotope, with important radioactive isotopes such as beryllium-10 and beryllium-7',
          'beryllium-10 is long-lived and cosmogenic, while beryllium-7 is shorter-lived and atmospheric',
          'cosmogenic production links beryllium isotopes to erosion and atmospheric transport studies',
          'beryllium-9 is important in neutron-producing and neutron-reflecting contexts',
          'radiological and toxicological controls differ, so isotope work must distinguish nuclear hazard from metal toxicity',
        ]
      ),
      production: section(
        'Producing beryllium is a multi-step chemical purification problem constrained by both ore chemistry and stringent safety requirements.',
        [
          'Ores are converted into purified compounds before final reduction to metal or conversion to ceramic oxide.',
          'Fluoride and hydroxide chemistry often appear in extraction flowsheets because they help separate beryllium from other metals.',
          'High-purity products demand carefully controlled thermal and vacuum processing.',
          'Because worker protection is critical, production costs reflect more than simple ore grade and energy use.',
        ],
        [
          'conversion of beryl or bertrandite into purified beryllium compounds, then reduction to metal or firing to BeO',
          'ore processing typically forms soluble fluorides or hydroxides before final purification',
          'high-purity BeO ceramics and metal powders require tightly controlled refining',
          'vacuum processing and impurity control are important because properties are sensitive to contamination',
          'production costs remain high because ore grades are limited and occupational safety requirements are stringent',
        ]
      ),
      applied: section(
        'Beryllium is important precisely because a small quantity of material can deliver exceptional mechanical or nuclear performance.',
        [
          'Aerospace hardware, X-ray windows, and neutron systems exploit a combination of low density and high stiffness that is difficult to replace.',
          'Beryllium-copper alloys and beryllia ceramics extend the element’s reach beyond pure metal service.',
          'Historically, beryllium became strategically important in the twentieth century through aerospace and nuclear engineering.',
          'The decisive safety issue remains inhalation exposure rather than simple skin contact or flammability.',
        ],
        [
          'aerospace structures, X-ray windows, neutron reflectors, and high-performance ceramics',
          'beryllium metal, beryllia ceramics, and beryllium-copper alloys are the main engineering forms',
          'its importance comes from stiffness, low density, thermal stability, and neutron behavior',
          'beryllium became strategically important in twentieth-century aerospace and nuclear technology',
          'the dominant hazard is chronic beryllium disease from inhalation, so engineering controls are essential',
        ]
      ),
    },
  },
  {
    id: 'boron',
    name: 'Boron',
    symbol: 'B',
    atomicNumber: 5,
    atomicMass: '10.81',
    group: '13',
    period: '2',
    block: 'p',
    category: 'Metalloid',
    roomState: 'Solid',
    electronConfiguration: '[He] 2s2 2p1',
    oxidationStates: '+3',
    summaryLine:
      'Boron is a metalloid whose electron deficiency, covalent networking, and unusual cluster chemistry make it one of the most conceptually distinctive light elements.',
    importanceLine:
      'Its chemistry ties together multicenter bonding, borate minerals, nuclear technology, glass science, and semiconductor doping.',
    heroFacts: ['Lightest group 13 element', 'Electron-deficient covalent chemistry', 'Important isotopes B-10 and B-11', 'Key role in glass and neutron control'],
    glossaryExtras: [
      term('Lewis acid', 'An electron-pair acceptor; many boron compounds show strong Lewis acidity.'),
      term('Borane', 'A boron hydride, often featuring multicenter bonding.'),
      term('Borosilicate glass', 'A chemically durable glass containing boron oxide.'),
    ],
    sections: {
      classification: section(
        'Boron occupies the borderland between metals and nonmetals, but its chemistry is far more covalent than a simple intermediate label might suggest.',
        [
          'As the lightest member of group 13, boron sets the pattern from which the rest of the group departs.',
          'Its metalloid label is useful, but the underlying reason is an electron-deficient valence shell rather than a vague partial metallic character.',
          'Boron’s position in period 2 prevents the kind of expanded-valence chemistry seen in heavier p-block elements.',
          'The classification chapter matters because many later structural features of boron flow directly from this periodic placement.',
        ],
        [
          'a period 2 metalloid and the lightest member of group 13',
          'period 2, group 13, p-block',
          '[He] 2s2 2p1',
          'electron deficiency makes boron chemistry structurally and electronically distinctive',
          'its behavior stands between metals and nonmetals, but with far more covalent character than aluminum',
        ]
      ),
      electronic: section(
        'Boron chemistry is shaped by the fact that three valence electrons are often not enough to satisfy ordinary two-center bonding expectations.',
        [
          'Electron deficiency explains the Lewis acidity of compounds such as BF3.',
          'Multicenter bonding in boranes gave chemistry one of its classic examples of structures that exceed simple octet reasoning.',
          'Formal oxidation-state language is useful, but actual electron distribution in boron compounds is strongly covalent.',
          'For students, boron is one of the best introductions to the limits of oversimplified bonding rules.',
        ],
        [
          'three valence electrons arranged as 2s2 2p1',
          'boron forms electron-deficient covalent compounds and multicenter bonds',
          '+3 is common in compounds, although formal oxidation-state bookkeeping can hide strong covalency',
          'trigonal planar BF3, boranes with three-center two-electron bonds, and network solids',
          'Lewis acidity and multicenter bonding are recurring consequences of boron’s limited valence electron count',
        ]
      ),
      physical: section(
        'Elemental boron does not behave like a simple metal or a simple molecular solid; instead it forms hard, complex covalent structures.',
        [
          'Crystalline boron is hard, brittle, and thermally robust.',
          'Its allotropes arise from intricate covalent frameworks rather than from simple close-packed metallic arrangements.',
          'These structural features explain why boron is useful in high-temperature and wear-resistant materials.',
          'Physical behavior must also be discussed in relation to particle size because powders and bulk solids behave differently.',
        ],
        [
          'a hard, brittle, dark metalloid with several complex allotropes',
          'crystalline boron has high hardness and a very high melting range',
          'extended covalent networks produce rigidity, low volatility, and poor metallic conductivity',
          'amorphous boron powders, crystalline allotropes, and boron-rich ceramics',
          'fine powders can be reactive at elevated temperature even when bulk boron appears relatively inert',
        ]
      ),
      reactivity: section(
        'Boron is relatively unreactive in bulk at room temperature, but that statement changes quickly once temperature, particle size, or compound class is altered.',
        [
          'The element forms a protective oxide film that moderates low-temperature attack.',
          'At higher temperatures boron reacts readily with oxygen, halogens, and many metals.',
          'Boron chemistry is especially rich in borates, boron halides, boranes, and boron-containing ceramics.',
          'Because some boron hydrides and halides are dangerous, chemical form determines the safety profile more than the element name alone.',
        ],
        [
          'elemental boron is comparatively inert at room temperature but strongly reactive when heated',
          'it reacts with oxygen, halogens, and many metals under appropriate conditions',
          'a protective oxide layer and robust covalent networks reduce low-temperature reactivity',
          'borates, boranes, boron halides, and carbide-forming reactions dominate its chemistry',
          'some boron hydrides and halides are moisture sensitive, toxic, or pyrophoric, so context matters',
        ]
      ),
      occurrence: section(
        'Boron is not a major crustal element, yet local concentration into borate minerals makes it industrially accessible.',
        [
          'Economically important boron occurs chiefly in evaporite and saline mineral systems.',
          'Because boron is mobile as borate species in water, geochemical concentration processes are crucial.',
          'Boron also has biological significance as a plant micronutrient.',
          'Its occurrence chapter therefore links mineral deposits, environmental transport, and agriculture.',
        ],
        [
          'boron occurs chiefly in borate minerals and saline evaporite deposits',
          'it is a trace crustal element rather than a major rock-forming constituent',
          'borax, kernite, and ulexite are historically important mineral sources',
          'boron is a micronutrient for plants and moves through soils and waters as borate species',
          'elemental boron is not found free in nature because it oxidizes readily',
        ]
      ),
      isotopes: section(
        'Boron is an excellent example of an element whose isotope chemistry matters both analytically and technologically.',
        [
          'Natural boron contains two stable isotopes, and their relative proportions matter in nuclear contexts.',
          'Boron-10 is especially important because it captures neutrons efficiently.',
          'Isotopic composition can also be used in tracer studies and analytical interpretation.',
          'This isotope pair gives boron a nuclear importance that exceeds what its abundance might suggest.',
        ],
        [
          'boron-10 and boron-11',
          'both are stable, with boron-11 more abundant',
          'the large neutron-capture cross section of boron-10 gives it exceptional nuclear importance',
          'boron isotopes are used in reactor control, shielding, and isotopic tracing',
          'isotope selection matters in both analytical chemistry and nuclear engineering',
        ]
      ),
      production: section(
        'Industrial boron manufacture depends on converting abundant borate minerals into purified oxides, acids, or elemental material.',
        [
          'Bulk production and high-purity production are not the same problem: the latter requires far more stringent purification.',
          'Magnesiothermic reduction, gas-phase routes, and ceramic processing each serve different endpoints.',
          'Because boron enters semiconductors and advanced materials, impurity control often dominates process design.',
          'Production chemistry therefore spans both classical mineral processing and modern high-purity materials science.',
        ],
        [
          'reduction and purification of boron oxide or volatile boron halides',
          'bulk boron can be made by magnesiothermic reduction, while high purity material often relies on gas-phase routes',
          'borax and other borates are converted to boric acid or boron oxide as intermediates',
          'purity control is critical for semiconductor and high-temperature materials applications',
          'energy use and purification difficulty rise sharply when very high purity boron is required',
        ]
      ),
      applied: section(
        'Boron’s applications are unusually diverse because the element can contribute hardness, neutron absorption, chemical durability, and electronic control depending on the compound.',
        [
          'Borosilicate glass, detergents, high-hardness ceramics, and semiconductor doping are among the best-known applications.',
          'Nuclear technology adds another important dimension through boron-10-containing materials.',
          'The history of borane chemistry was intellectually important because it reshaped views of chemical bonding.',
          'Handling requirements depend strongly on compound class, with boranes and reactive halides demanding the greatest care.',
        ],
        [
          'borosilicate glass, detergents, ceramics, permanent magnets, semiconductors, and neutron-control materials',
          'boric acid, borax, BF3, boron carbide, and boron-doped silicon are major compounds or materials',
          'boron chemistry matters in agriculture, materials science, and nuclear technology',
          'development of borane chemistry and electron-deficient bonding reshaped twentieth-century structural chemistry',
          'laboratory handling depends strongly on the compound, with boranes and boron halides demanding the greatest caution',
        ]
      ),
    },
  },
  {
    id: 'carbon',
    name: 'Carbon',
    symbol: 'C',
    atomicNumber: 6,
    atomicMass: '12.011',
    group: '14',
    period: '2',
    block: 'p',
    category: 'Nonmetal',
    roomState: 'Solid',
    electronConfiguration: '[He] 2s2 2p2',
    oxidationStates: '-4 to +4',
    summaryLine:
      'Carbon is a period-2 nonmetal whose ability to catenate and hybridize makes it the structural core of organic chemistry, major industrial materials, and the global carbon cycle.',
    importanceLine:
      'Its chemistry links allotropy, bonding theory, combustion, climate science, metallurgy, and the molecular basis of life.',
    heroFacts: ['Tetravalent p-block element', 'Supports sp, sp2, and sp3 bonding', 'Many allotropes from diamond to graphene', 'Central to organic and environmental chemistry'],
    glossaryExtras: [
      term('Catenation', 'The ability of an element to form extended bonds to itself, especially important for carbon.'),
      term('Hybridization', 'A bonding model used to describe orbital mixing in carbon structures such as sp, sp2, and sp3.'),
      term('Allotrope', 'Different structural forms of the same element in the same physical state.'),
    ],
    sections: {
      classification: section(
        'Carbon sits at the boundary between simple elemental chemistry and the enormous structural diversity of organic compounds because four valence electrons allow many stable bonding patterns.',
        [
          'As the period-2 member of group 14, carbon sets the benchmark for tetravalent covalent chemistry.',
          'Its position in the table explains why carbon is neither strongly metallic nor a simple molecular nonmetal in all forms.',
          'Carbon’s classification is only the starting point for understanding the huge range of compounds it can build.',
          'The element is best taught as a central structural framework rather than as an isolated periodic-table fact.',
        ],
        [
          'a period 2 group 14 nonmetal with unmatched capacity for catenation',
          'period 2, group 14, p-block',
          '[He] 2s2 2p2',
          'four valence electrons let carbon form stable chains, rings, and networks',
          'it occupies a central position between simple inorganic chemistry and the enormous diversity of organic chemistry',
        ]
      ),
      electronic: section(
        'Carbon’s electronic importance lies in the flexibility of four valence electrons, which can produce tetrahedral, trigonal, linear, aromatic, and extended-network bonding patterns.',
        [
          'Carbon uses sp, sp2, and sp3 hybridization to generate very different structures from the same atomic building block.',
          'Strong C-C and C-H bonds make large molecules and extended solids kinetically persistent.',
          'Formal oxidation states of carbon range widely, but actual electron density depends strongly on bonding context.',
          'This range of bonding modes is the reason carbon dominates molecular structural chemistry.',
        ],
        [
          'four valence electrons that support sp, sp2, and sp3 hybridization',
          'carbon readily forms strong covalent bonds to itself and to many other elements',
          'oxidation states from -4 to +4 are all important in carbon chemistry',
          'single-bond frameworks, double bonds, triple bonds, aromatic systems, and extended solids such as graphite and diamond',
          'hybridization and catenation explain the structural diversity of carbon compounds',
        ]
      ),
      physical: section(
        'Carbon has no single representative physical form; its allotropes differ so strongly that they seem almost like different materials rather than versions of one element.',
        [
          'Diamond, graphite, graphene, and amorphous carbon display sharply different hardness, conductivity, and optical behavior.',
          'These contrasts are not anomalies but direct consequences of different bonding topologies.',
          'For carbon, structure-property relationships can be taught with unusual clarity because the allotropes are so distinct.',
          'Physical description of carbon is therefore inseparable from the idea of allotropy.',
        ],
        [
          'an element with strikingly different allotropes rather than a single typical physical form',
          'diamond is exceptionally hard, graphite is soft and conductive, and graphene combines strength with high mobility',
          'different bonding networks create radically different macroscopic properties',
          'diamond, graphite, amorphous carbon, fullerenes, nanotubes, and graphene',
          'sampling and use depend on allotrope because structure determines conductivity, hardness, and surface chemistry',
        ]
      ),
      reactivity: section(
        'Carbon is simultaneously stable enough to build durable frameworks and reactive enough to participate in combustion, redox chemistry, and an enormous range of synthesis.',
        [
          'The same element can appear in inert graphite electrodes, reactive organometallic intermediates, or fully oxidized carbon dioxide.',
          'Combustion and oxidation are thermodynamically important, but kinetics and structure determine which transformations are practical.',
          'Carbon chemistry includes both classical inorganic systems such as carbonates and the massive domain of organic functional-group chemistry.',
          'No short reactivity summary is complete unless it distinguishes elemental form, oxidation state, and bonding environment.',
        ],
        [
          'chemically versatile, participating in combustion, reduction, polymerization, and countless bond-forming reactions',
          'it forms stable oxides, carbides, hydrocarbons, carbonates, and organofunctional compounds',
          'the strength of C-C and C-H bonds allows stable frameworks, while oxidation to CO2 is thermodynamically favored',
          'combustion, redox in metallurgy, electrophilic and nucleophilic organic reactions, and acid-base carbonate chemistry',
          'reaction behavior depends strongly on allotrope, oxidation state, and functional group environment',
        ]
      ),
      occurrence: section(
        'Carbon is distributed through the atmosphere, hydrosphere, lithosphere, and biosphere in a way that makes it central to both geochemistry and life.',
        [
          'No discussion of carbon abundance is complete without the carbon cycle.',
          'Large reservoirs of carbon exist in carbonate rocks, dissolved bicarbonate, fossil fuels, and living matter.',
          'Because carbon moves between oxidation states and reservoirs, occurrence is tied directly to climate and metabolism.',
          'This environmental breadth makes carbon different from nearly every other first-row element.',
        ],
        [
          'carbon is present in the atmosphere, oceans, organisms, fossil fuels, and carbonate rocks',
          'it is less abundant in the crust than oxygen or silicon but indispensable to the biosphere',
          'major reservoirs include limestone, dissolved bicarbonate, petroleum, coal, methane, and living matter',
          'the carbon cycle links geochemistry, climate, and biology',
          'free elemental carbon exists as graphite or diamond, but much of Earth’s carbon is locked in compounds',
        ]
      ),
      isotopes: section(
        'Carbon isotopes are famous because they are useful simultaneously in structural chemistry, Earth science, and archaeology.',
        [
          'Carbon-12 and carbon-13 are stable and chemically familiar, while carbon-14 adds a radioactive dimension of broad scientific use.',
          'Because carbon participates in so many biological and geochemical processes, isotope ratios can preserve rich environmental information.',
          'Radiocarbon dating is only the best-known example of the broader value of carbon isotope systems.',
          'This chapter shows how isotopes turn an ordinary element into a tool for reconstructing time and process.',
        ],
        [
          'carbon-12, carbon-13, and carbon-14',
          'carbon-12 and carbon-13 are stable, while carbon-14 is radioactive',
          'isotopic composition is used to trace metabolism, paleoclimate, and source processes',
          'radiocarbon dating is one of the most influential applications of any elemental isotope system',
          'accurate isotope work requires careful correction for fractionation and contamination',
        ]
      ),
      production: section(
        'Industrial carbon processing is less about isolating elemental carbon from a single ore and more about controlling structure, purity, and feedstock transformation.',
        [
          'Coke, graphite, activated carbon, and synthetic diamond arise from different processing routes and different target properties.',
          'Thermal treatment, microstructure control, and impurity management are the essential chemical-engineering themes.',
          'Carbon manufacturing therefore stretches from metallurgy to advanced nanomaterials.',
          'The production route strongly determines whether the final material conducts, adsorbs, cuts, lubricates, or reinforces.',
        ],
        [
          'industrial carbon materials arise from coking, pyrolysis, graphitization, and synthetic high-pressure or vapor-phase routes',
          'coke production remains central to metallurgy, while graphitic and activated carbons are tailored by controlled heat treatment',
          'synthetic diamond and advanced carbon nanomaterials use specialized high-energy processing',
          'activation, purification, and microstructure control determine final material performance',
          'manufacturing route strongly controls porosity, crystallinity, and therefore application',
        ]
      ),
      applied: section(
        'Carbon is applied at nearly every scale of chemistry, from the molecules of living cells to massive industrial furnaces and climate systems.',
        [
          'Steelmaking, fuels, polymers, electrodes, adsorbents, and composites all depend on carbon chemistry.',
          'Because carbon is the backbone of organic molecules, it is equally a materials element and a biological element.',
          'Historically, recognition of carbon tetravalence transformed structural chemistry and modern organic science.',
          'Safety concerns vary widely by form, with carbon monoxide, soot, dust, and combustion products each introducing different risks.',
        ],
        [
          'steelmaking, electrodes, fuels, sorbents, structural composites, electronics, and the molecular basis of life',
          'carbon monoxide, carbon dioxide, hydrocarbons, graphite, diamond, activated carbon, and polymers are all major carbon systems',
          'carbon is central to biochemistry and to environmental issues surrounding greenhouse forcing',
          'the recognition of carbon’s tetravalence and structural chemistry transformed modern organic science',
          'hazards depend on form, ranging from carbon monoxide toxicity to dust, soot, and combustion exposure',
        ]
      ),
    },
  },
  {
    id: 'nitrogen',
    name: 'Nitrogen',
    symbol: 'N',
    atomicNumber: 7,
    atomicMass: '14.007',
    group: '15',
    period: '2',
    block: 'p',
    category: 'Nonmetal',
    roomState: 'Gas',
    electronConfiguration: '[He] 2s2 2p3',
    oxidationStates: '-3 to +5',
    summaryLine:
      'Nitrogen is a pnictogen whose elemental stability as N2 contrasts with the extreme chemical importance of its fixed compounds in biology, agriculture, and atmospheric chemistry.',
    importanceLine:
      'It connects triple-bonded diatomic molecules to fertilizers, explosives, atmospheric pollution, cryogenics, and the global nitrogen cycle.',
    heroFacts: ['Half-filled 2p subshell', 'Very strong N≡N bond', '78% of Earth’s atmosphere', 'Central to ammonia and fertilizer chemistry'],
    glossaryExtras: [
      term('Nitrogen fixation', 'Conversion of atmospheric N2 into chemically reactive compounds such as ammonia.'),
      term('Pnictogen', 'A member of group 15 of the periodic table.'),
      term('Cryogenic fluid', 'A liquid maintained at very low temperature, such as liquid nitrogen.'),
    ],
    sections: {
      classification: section(
        'Nitrogen is classified as a period-2 pnictogen, but the physical and chemical identity of elemental nitrogen is dominated by the unusual strength of the N≡N bond.',
        [
          'Nitrogen occupies the nonmetallic top of group 15 and sets the pattern from which phosphorus and heavier pnictogens diverge.',
          'Its half-filled p subshell is a key reason that elemental nitrogen is both stable and electronically distinctive.',
          'The classification chapter is essential because later redox chemistry of nitrogen compounds spans an unusually wide range.',
          'Nitrogen therefore illustrates how one element can be kinetically inert as N2 yet chemically central in compounds.',
        ],
        [
          'a period 2 pnictogen whose elemental form is a strongly bonded diatomic nonmetal',
          'period 2, group 15, p-block',
          '[He] 2s2 2p3',
          'the half-filled p subshell supports both stability in N2 and rich oxidation-state chemistry in compounds',
          'nitrogen sits at the center of a group that progresses from nonmetallic molecular chemistry to metallic and semimetallic behavior',
        ]
      ),
      electronic: section(
        'Nitrogen’s valence shell allows three ordinary covalent bonds, a lone pair, and one of the strongest multiple bonds seen in elemental molecules.',
        [
          'The half-filled 2p set stabilizes nitrogen’s atomic configuration and helps explain the exceptional N≡N bond.',
          'Nitrogen bonding patterns range from ammonia and amines to nitriles, oxides, and oxyanions.',
          'Oxidation-state diversity is chemically meaningful because nitrogen can be strongly reduced or strongly oxidized in different environments.',
          'Electronic structure is the thread that ties ammonia, nitrate, NOx, and biological nitrogen chemistry together.',
        ],
        [
          'five valence electrons with a half-filled 2p subshell',
          'nitrogen forms three covalent bonds in many compounds and a very strong triple bond in N2',
          'oxidation states from -3 to +5 are common across ammonia, oxides, and oxyanions',
          'ammonia, ammonium, nitriles, NO, NO2, nitrite, and nitrate illustrate its bonding range',
          'the strength of the N≡N bond is the main reason elemental nitrogen is kinetically inert',
        ]
      ),
      physical: section(
        'Nitrogen is physically familiar because it is the dominant gas in air, yet its significance in the laboratory often comes through the cryogenic properties of liquid nitrogen.',
        [
          'Elemental nitrogen is colorless and odorless, with low boiling and melting points typical of small diatomic molecules.',
          'The outstanding feature is not intermolecular attraction but the internal bond strength of N2.',
          'Liquid nitrogen is cheap and widely used, making nitrogen one of the most common cryogenic substances in education and industry.',
          'Physical handling therefore involves both gas-displacement hazards and low-temperature hazards.',
        ],
        [
          'a colorless, odorless diatomic gas at room temperature',
          'the N≡N bond gives unusual thermodynamic stability to the gas',
          'weak intermolecular forces keep boiling and melting points low, while the triple bond keeps chemical activation energy high',
          'liquid nitrogen is a widely used cryogenic fluid',
          'laboratory use centers on cold hazards, pressure control, and the risk of oxygen displacement',
        ]
      ),
      reactivity: section(
        'Nitrogen teaches a classic chemistry lesson: kinetic inertness of the element does not imply low reactivity across the rest of the element’s compounds.',
        [
          'Atmospheric N2 is difficult to activate, which is why fixation by biology or industry matters so much.',
          'Once fixed, nitrogen participates in acid-base chemistry, oxidation-reduction chemistry, nitration, and highly energetic decompositions.',
          'Nitrogen oxides and nitrates illustrate the environmental side of nitrogen reactivity.',
          'Explosives and fertilizers can both be understood as consequences of nitrogen’s redox range.',
        ],
        [
          'elemental nitrogen is relatively inert, whereas many nitrogen compounds are highly reactive',
          'biological or industrial fixation converts N2 into ammonia, and oxidation leads to NOx and oxyanions',
          'breaking the N≡N bond requires significant energy or catalytic assistance',
          'acid-base ammonium chemistry, nitration, azo chemistry, oxidation-reduction, and explosive decomposition are key patterns',
          'nitrogen chemistry ranges from inert blanketing gas to highly energetic oxidizers and explosives',
        ]
      ),
      occurrence: section(
        'Nitrogen is abundant in the atmosphere, but biological availability depends on conversion into chemically accessible forms.',
        [
          'The atmosphere is the overwhelming reservoir of elemental nitrogen on Earth.',
          'The nitrogen cycle explains how this abundant gas becomes available to organisms and then returns to the air.',
          'Agriculture, ecosystems, and pollution are all shaped by the balance between inert N2 and reactive fixed nitrogen.',
          'Occurrence is therefore inseparable from biogeochemistry.',
        ],
        [
          'nitrogen makes up about 78 percent of Earth’s atmosphere by volume',
          'it is abundant in air but far less accessible biologically until fixed into reactive compounds',
          'reservoirs include atmospheric N2, soil nitrates, ammonium, proteins, and dissolved species in water',
          'the nitrogen cycle links atmospheric chemistry, agriculture, ecology, and pollution',
          'free N2 persists because the triple bond slows spontaneous reaction under ordinary conditions',
        ]
      ),
      isotopes: section(
        'Nitrogen isotopes are less famous to the public than carbon isotopes, but they are powerful tools in ecology, biochemistry, and atmospheric science.',
        [
          'Natural nitrogen consists mainly of nitrogen-14 with a smaller but useful fraction of nitrogen-15.',
          'Nitrogen-15 labeling allows researchers to track nutrients and reaction pathways directly.',
          'Short-lived radioisotopes such as nitrogen-13 extend the element into specialized imaging contexts.',
          'Isotope fractionation provides insight into biological processing and environmental cycling.',
        ],
        [
          'nitrogen-14 and nitrogen-15',
          'both are stable, with nitrogen-14 strongly dominant',
          'isotopic fractionation helps trace nutrient cycling and biological processing',
          'nitrogen-15 labeling is widely used in biochemistry, ecology, and mechanistic studies',
          'radioisotopes such as nitrogen-13 are valuable in specialized imaging but short-lived',
        ]
      ),
      production: section(
        'Nitrogen production is largely a separation problem, since the atmosphere already supplies a vast feedstock.',
        [
          'Air separation is the dominant route for producing bulk nitrogen.',
          'Different users require different purity levels, so cryogenic, PSA, and membrane systems all have roles.',
          'Because elemental nitrogen is already stable, production economics center on purification and compression rather than synthesis.',
          'The industrial language of nitrogen is therefore the language of gas processing.',
        ],
        [
          'fractional distillation of liquid air, pressure-swing adsorption, and membrane separation',
          'cryogenic air separation supplies bulk high-purity nitrogen at industrial scale',
          'onsite PSA and membrane units are common where purity or volume demands are moderate',
          'drying, compression, and oxygen removal determine final gas quality',
          'the value of produced nitrogen depends on purity, pressure, and energy cost rather than chemical transformation of the element',
        ]
      ),
      applied: section(
        'Nitrogen becomes technologically indispensable not because N2 itself is very reactive, but because controlled nitrogen chemistry supports agriculture, manufacturing, and cryogenic practice.',
        [
          'Inert nitrogen atmospheres protect sensitive materials and processes from oxidation.',
          'Reactive nitrogen compounds such as ammonia, nitric acid, and nitrates are pillars of modern industry and agriculture.',
          'The Haber-Bosch process is one of the defining chemical technologies of the modern world.',
          'Safety depends both on asphyxiation risks from nitrogen gas and on the extreme reactivity of many nitrogen compounds.',
        ],
        [
          'fertilizer manufacture, inert atmospheres, cryogenics, electronics processing, and food packaging',
          'ammonia, nitric acid, nitrates, amines, and energetic nitrogen compounds are major nitrogen chemical products',
          'nitrogen is essential to amino acids, nucleic acids, and many environmental redox processes',
          'the Haber-Bosch process changed agriculture and population history by industrializing nitrogen fixation',
          'major safety issues include asphyxiation by inert gas and hazards associated with reactive nitrogen compounds',
        ]
      ),
    },
  },
  {
    id: 'oxygen',
    name: 'Oxygen',
    symbol: 'O',
    atomicNumber: 8,
    atomicMass: '15.999',
    group: '16',
    period: '2',
    block: 'p',
    category: 'Nonmetal',
    roomState: 'Gas',
    electronConfiguration: '[He] 2s2 2p4',
    oxidationStates: '-2, -1, +1, +2',
    summaryLine:
      'Oxygen is a strongly electronegative chalcogen whose bonding power shapes minerals, water, respiration, combustion, and the chemistry of the atmosphere.',
    importanceLine:
      'It joins atomic structure to oxidation, environmental cycles, steelmaking, medicine, and the historical foundations of modern chemistry.',
    heroFacts: ['Highly electronegative chalcogen', 'Paramagnetic O2 molecule', 'Major component of air and water', 'Central oxidant in combustion and respiration'],
    glossaryExtras: [
      term('Oxidation', 'A process involving electron loss or increased bonding to oxygen in many classical chemical descriptions.'),
      term('Peroxide', 'A species containing an O-O linkage with oxygen in oxidation state -1.'),
      term('Paramagnetism', 'Magnetic behavior caused by unpaired electrons, notably seen in O2.'),
    ],
    sections: {
      classification: section(
        'Oxygen occupies the top of group 16, and its strong electronegativity makes it the archetypal nonmetallic partner in countless compounds.',
        [
          'As a period-2 chalcogen, oxygen defines the chemistry against which sulfur and heavier group members are compared.',
          'Its periodic position helps explain both high bond polarity and the prevalence of the -2 oxidation state.',
          'Oxygen is not merely abundant; it is structurally dominant in minerals, water, and biomolecules.',
          'Classification matters because it anticipates why oxygen chemistry is so broad and so thermodynamically important.',
        ],
        [
          'a period 2 chalcogen and strongly electronegative nonmetal',
          'period 2, group 16, p-block',
          '[He] 2s2 2p4',
          'its high electronegativity and tendency toward -2 oxidation state make it the archetypal oxidizing partner',
          'oxygen’s position explains why it forms stable bonds across inorganic, organic, biological, and geological chemistry',
        ]
      ),
      electronic: section(
        'Oxygen’s six-valence-electron configuration makes it strongly inclined to complete the octet by forming polarized bonds or accepting electron density.',
        [
          'The common two-bond pattern in oxygen compounds follows directly from two vacancies in the valence shell plus two lone pairs.',
          'Oxygen can participate in neutral covalent bonding, oxide ions, peroxides, ozone, and oxides with exceptional bond polarity.',
          'Open-shell molecular oxygen adds an important complication: elemental O2 is not electronically simple despite its everyday familiarity.',
          'This combination of ordinary valence behavior and special molecular features is why oxygen deserves more than a brief summary.',
        ],
        [
          'six valence electrons with two vacancies in the valence shell',
          'oxygen usually forms two covalent bonds or accepts electron density to give oxide species',
          '-2 is dominant, with -1 in peroxides and positive values in compounds with fluorine',
          'O2, H2O, metal oxides, peroxides, ozone, carbonyls, and silicates are representative oxygen-containing systems',
          'paramagnetism in O2 and strong bond polarization are key consequences of oxygen’s electron structure',
        ]
      ),
      physical: section(
        'Oxygen is often introduced as a colorless gas, but its physical chemistry becomes richer once liquid, solid, and magnetic behavior are considered.',
        [
          'Ordinary oxygen gas is small and mobile, yet liquid oxygen reveals striking blue color and strong magnetic response.',
          'The physical properties of oxygen are shaped not only by intermolecular forces but also by its open-shell electronic structure.',
          'These features give oxygen a special place in both laboratory demonstration and cryogenic engineering.',
          'Physical form also matters because oxygen-enriched systems behave very differently from ordinary air.',
        ],
        [
          'a colorless diatomic gas at room temperature',
          'liquid oxygen is pale blue and liquid or solid oxygen is strongly paramagnetic',
          'the O2 molecule is small, but its open-shell electronic structure gives unusual magnetic behavior',
          'gaseous oxygen, liquid oxygen, dissolved oxygen in water, and ozone in the atmosphere',
          'oxygen-enriched environments greatly increase combustion risk even though oxygen itself is not a fuel',
        ]
      ),
      reactivity: section(
        'Oxygen is one of the chemically defining oxidizing elements because it forms especially stable bonds to many metals and nonmetals.',
        [
          'Combustion, corrosion, respiration, and industrial oxidation all depend on the driving force associated with oxygen bond formation.',
          'Different forms of oxygen, including ground-state O2, singlet oxygen, ozone, and peroxides, differ substantially in reactivity.',
          'The practical meaning of "oxidation" remains tied historically and conceptually to oxygen chemistry.',
          'Reactivity is therefore both thermodynamic and mechanistic: strong bonds create driving force, but activation barriers and molecular form still matter.',
        ],
        [
          'a strong oxidizing element that supports combustion and countless redox processes',
          'it reacts with most elements to form oxides and participates in radical and electrochemical pathways',
          'formation of strong O-H, C=O, Si-O, and metal-oxygen bonds drives many reactions thermodynamically',
          'combustion, corrosion, respiration, oxide formation, peroxide chemistry, and ozone reactions are central themes',
          'reactivity depends on form: ground-state O2, singlet oxygen, ozone, and peroxide species behave differently',
        ]
      ),
      occurrence: section(
        'Oxygen is abundant in both free and combined forms, but its distribution across the atmosphere, hydrosphere, and crust reflects very different chemical stories.',
        [
          'Elemental oxygen in air is only one part of the larger oxygen inventory of Earth.',
          'Water, silicates, and oxides store far more oxygen than the atmosphere alone.',
          'Biological activity is essential to maintaining atmospheric O2 at modern levels.',
          'The occurrence chapter therefore links geology, climate, and life.',
        ],
        [
          'oxygen is abundant in the atmosphere, hydrosphere, and especially the solid Earth',
          'it is the most abundant element in Earth’s crust by mass and about one-fifth of the atmosphere by volume',
          'water, silicate minerals, metal oxides, and atmospheric O2 are the main reservoirs',
          'photosynthesis and respiration tie oxygen directly to planetary metabolism',
          'elemental O2 became abundant only after biological oxygen production reshaped Earth’s atmosphere',
        ]
      ),
      isotopes: section(
        'Oxygen isotopes are a powerful reminder that small mass differences can encode major information about environmental history.',
        [
          'The stable isotope trio of oxygen supports a large field of geochemical and climatic interpretation.',
          'Because oxygen is present in water, minerals, and atmospheric species, isotope ratios become records of temperature and process.',
          'Oxygen isotopes are therefore central to paleoclimate and planetary science.',
          'This is one of the clearest examples of an element whose isotope chemistry is broader than any single laboratory technique.',
        ],
        [
          'oxygen-16, oxygen-17, and oxygen-18',
          'all three are stable, with oxygen-16 overwhelmingly dominant',
          'small isotopic variations preserve information about temperature, evaporation, and geochemical pathways',
          'oxygen isotope ratios are fundamental in paleoclimate, hydrology, and planetary science',
          'precision measurements demand careful calibration because natural fractionations can be subtle but meaningful',
        ]
      ),
      production: section(
        'Oxygen production is a classic gas-separation problem whose scale is driven by metallurgical, medical, and chemical demand.',
        [
          'Cryogenic air separation dominates when purity and throughput are both high.',
          'Pressure-swing adsorption provides smaller-scale onsite oxygen generation where logistics favor local supply.',
          'The chemistry of oxygen production is therefore tied to process engineering and purity control rather than to synthesis from ores.',
          'Because oxygen intensifies combustion, storage and delivery systems must be designed for compatibility as well as purity.',
        ],
        [
          'fractional distillation of liquid air and pressure-swing adsorption',
          'large-scale oxygen supply often comes from cryogenic air separation because purity and volume demands are high',
          'PSA units provide onsite oxygen for hospitals and smaller industrial users',
          'compression, drying, and impurity removal are central to delivering safe product gas',
          'production scale is driven by steelmaking, chemical oxidation, medicine, and combustion engineering',
        ]
      ),
      applied: section(
        'Oxygen is indispensable because it is both a biological necessity and an industrial oxidant of exceptional scale.',
        [
          'Steelmaking, medicine, water treatment, propulsion oxidizers, and chemical manufacture all rely on controlled oxygen use.',
          'Historically, understanding oxygen’s role in combustion helped overturn phlogiston theory and establish modern chemistry.',
          'The element also sits at the center of atmospheric and aquatic environmental chemistry.',
          'The major hazard is not toxicity in ordinary use but the greatly increased fire risk created by oxygen-rich conditions.',
        ],
        [
          'steelmaking, medical respiration, water treatment, chemical oxidation, and propulsion oxidizer service',
          'liquid oxygen, ozone, metal oxides, and oxygenated organic intermediates are major technological forms',
          'oxygen is indispensable to respiration and to the environmental chemistry of the atmosphere and waters',
          'recognition of oxygen’s role in combustion helped overturn phlogiston theory and establish modern chemistry',
          'handling priorities include fire intensification, compatibility of materials, and control of cryogenic burns or pressure hazards',
        ]
      ),
    },
  },
  {
    id: 'fluorine',
    name: 'Fluorine',
    symbol: 'F',
    atomicNumber: 9,
    atomicMass: '18.998',
    group: '17',
    period: '2',
    block: 'p',
    category: 'Halogen',
    roomState: 'Gas',
    electronConfiguration: '[He] 2s2 2p5',
    oxidationStates: '-1',
    summaryLine:
      'Fluorine is the most electronegative element and the most aggressive common elemental oxidant, giving it a chemistry dominated by strong fluoride bond formation and severe handling challenges.',
    importanceLine:
      'Its chemistry reaches from mineral fluorides to nuclear fuel processing, advanced polymers, pharmaceuticals, and highly specialized industrial safety practice.',
    heroFacts: ['Most electronegative element', 'Powerful elemental oxidant', 'Forms very strong M-F and C-F bonds', 'Produced industrially by electrolysis'],
    glossaryExtras: [
      term('Hydrogen fluoride', 'A hydrogen halide that is highly corrosive and chemically significant in fluorine processing.'),
      term('Passivation', 'Formation of a protective surface layer that can slow further reaction.'),
      term('Organofluorine compound', 'An organic molecule containing one or more carbon-fluorine bonds.'),
    ],
    sections: {
      classification: section(
        'Fluorine sits at the top of group 17, and its extreme electronegativity gives the halogen family a chemically meaningful upper limit.',
        [
          'As the lightest common halogen, fluorine differs from chlorine, bromine, and iodine in more than simple scale.',
          'Its position explains why fluorine overwhelmingly prefers the -1 oxidation state and why F2 is such a powerful oxidant.',
          'Period-2 restrictions also matter: fluorine does not show the positive oxidation states available to heavier halogens.',
          'The classification story of fluorine is therefore tightly linked to bond strength and reactivity limits.',
        ],
        [
          'a period 2 halogen and the most electronegative element',
          'period 2, group 17, p-block',
          '[He] 2s2 2p5',
          'its extreme tendency to attract electron density dominates nearly all of its chemistry',
          'fluorine sets the upper limit of halogen reactivity and differs from heavier halogens in bond strengths and oxidation behavior',
        ]
      ),
      electronic: section(
        'Fluorine needs only one electron to complete the octet, and that simple fact drives a remarkably forceful chemistry.',
        [
          'Very high electronegativity and small size produce strongly polarized bonds and highly stable fluoride products.',
          'Because fluorine cannot expand its valence shell like heavier halogens, the chemistry is dominated by F- and by strong single bonds.',
          'The C-F and many metal-fluoride bonds are technologically valuable because they are so strong.',
          'Electronic structure therefore explains both the usefulness and the danger of fluorine chemistry.',
        ],
        [
          'seven valence electrons needing one more for a closed shell',
          'fluorine forms one bond in many compounds and strongly polarizes those bonds',
          '-1 dominates in compounds, with elemental fluorine at 0 and no stable positive oxidation states',
          'F2, HF, metal fluorides, UF6, and organofluorine compounds illustrate its bonding behavior',
          'small size and very high electronegativity create exceptionally strong M-F and C-F interactions',
        ]
      ),
      physical: section(
        'Fluorine is physically a pale yellow gas, but any physical description must immediately acknowledge that containment and chemistry are inseparable for this element.',
        [
          'Unlike more benign gases, fluorine cannot be discussed without reference to the materials that contain it.',
          'The weak F-F bond combined with strong product bonds means that physical handling conditions can trigger severe chemical consequences.',
          'Even when cooled or diluted, fluorine remains a specialized material rather than a routine laboratory gas.',
          'Physical properties are therefore best interpreted through reactive engineering context.',
        ],
        [
          'a pale yellow, highly corrosive diatomic gas',
          'it is dense for a light gas and is aggressively reactive even at low temperature',
          'the weak F-F bond and strong product bonds explain why physical containment is tightly coupled to chemistry',
          'compressed fluorine gas, anhydrous HF-derived feed systems, and fluoride salts',
          'materials selection is critical because many substances ignite or corrode in fluorine service',
        ]
      ),
      reactivity: section(
        'Fluorine is the standard against which the reactivity of other elemental oxidants is often measured.',
        [
          'Formation of strong fluoride bonds drives the chemistry of elemental fluorine toward extreme exergonicity.',
          'The element reacts with most metals, many nonmetals, and numerous compounds that resist other oxidants.',
          'Passivation can sometimes moderate surface attack, but it does not remove the underlying hazard.',
          'Because fluorine chemistry is so forceful, process design must account for kinetics, heat release, and by-product control simultaneously.',
        ],
        [
          'the most powerful common elemental oxidizing agent',
          'it reacts with most elements, many compounds, and even some noble-gas systems under the right conditions',
          'formation of strong fluoride bonds drives extremely exergonic chemistry',
          'metal fluorides, interhalogens, uranium hexafluoride, sulfur fluorides, and organofluorination are major reaction classes',
          'passivation can protect some metals, but water, organics, and powdered materials can react violently',
        ]
      ),
      occurrence: section(
        'Fluorine is chemically too reactive to exist as F2 in nature, so all occurrence discussions center on fluoride minerals and dissolved fluoride.',
        [
          'Mineral fluoride deposits are the starting point for practical fluorine chemistry.',
          'Because fluorine strongly prefers the fluoride ion, native elemental fluorine is absent from natural environments.',
          'Low-level fluoride in water and biological tissues has important health implications.',
          'Occurrence is therefore best understood through mineralogy and environmental fluoride balance.',
        ],
        [
          'fluorine occurs naturally as fluoride in minerals such as fluorite, cryolite, and fluorapatite',
          'it is moderately abundant in the crust but never found free',
          'economic sources are mineral deposits rather than atmospheric or biological reservoirs',
          'fluoride is present in soils, waters, and teeth or bone at low levels',
          'free elemental fluorine is absent because its oxidizing power is too great for persistence in nature',
        ]
      ),
      isotopes: section(
        'Fluorine isotope chemistry is dominated by a single stable nuclide plus one radioisotope of enormous medical importance.',
        [
          'Natural fluorine is essentially all fluorine-19, simplifying spectroscopy and isotopic accounting.',
          'Fluorine-18 adds a radioactive dimension that became crucial in positron emission tomography.',
          'The contrast between a single stable isotope and a highly useful short-lived radioisotope is one of fluorine’s defining nuclear features.',
          'Because fluorine-18 decays quickly, production and application are inseparable in practice.',
        ],
        [
          'fluorine-19 is the only stable isotope, with fluorine-18 as the most important radioisotope',
          'fluorine-19 dominates natural fluorine, while fluorine-18 is positron-emitting and short-lived',
          'the single stable isotope simplifies NMR interpretation and elemental mass assignment',
          'fluorine-18 is central to positron emission tomography',
          'radiofluorination requires rapid synthesis and handling because fluorine-18 decays quickly',
        ]
      ),
      production: section(
        'Industrial fluorine manufacture is an electrochemical problem because fluoride is so stable that ordinary chemical oxidants are inadequate.',
        [
          'Anhydrous hydrogen fluoride and suitable fluoride salts are central to practical fluorine electrolysis.',
          'Moisture exclusion is essential because even traces of water change both safety and chemistry dramatically.',
          'Equipment selection is dictated by corrosion resistance and controlled passivation.',
          'The production chapter shows how redox thermodynamics, materials science, and hazard control meet in one process.',
        ],
        [
          'electrolysis of anhydrous hydrogen fluoride containing fluoride salts such as potassium bifluoride',
          'electrochemical production is necessary because no chemical oxidant can conveniently liberate fluorine from fluoride at scale',
          'downstream processing often integrates HF preparation, drying, and corrosion-resistant equipment',
          'nickel-based and specially passivated materials are used to purify and contain product streams',
          'fluorine manufacture is energy intensive and demands strict moisture exclusion and hazard control',
        ]
      ),
      applied: section(
        'Fluorine chemistry matters because exceptionally strong fluoride bonds can create materials and processes that are hard to duplicate any other way.',
        [
          'Nuclear fuel processing, fluoropolymers, pharmaceuticals, and specialty surface chemistry all rely on fluorine-containing compounds.',
          'The historical isolation of fluorine was a landmark because it solved a major problem in inorganic chemistry and demanded unusual experimental ingenuity.',
          'Fluorinated materials often derive value from chemical durability, volatility control, or unique biological behavior.',
          'The major hazards arise from both elemental fluorine and hydrogen fluoride, making safe handling inseparable from application.',
        ],
        [
          'uranium processing, polymer and refrigerant manufacture, pharmaceuticals, specialty materials, and surface treatment',
          'HF, UF6, PTFE, fluorocarbons, aluminum fluoride, and many organofluorine compounds are technologically important',
          'fluorine chemistry influences medicine, nuclear fuel processing, and materials durability',
          'Moissan’s isolation of fluorine was historically significant because it solved a major problem in inorganic chemistry',
          'the dominant hazards are extreme oxidizing power and the toxicity of HF and soluble fluorides',
        ]
      ),
    },
  },
  {
    id: 'neon',
    name: 'Neon',
    symbol: 'Ne',
    atomicNumber: 10,
    atomicMass: '20.180',
    group: '18',
    period: '2',
    block: 'p',
    category: 'Noble gas',
    roomState: 'Gas',
    electronConfiguration: '[He] 2s2 2p6',
    oxidationStates: '0',
    summaryLine:
      'Neon is a noble gas with a filled second shell, famous for its emission colors and important as a model of inert atomic behavior in lighting, lasers, and gas-separation technology.',
    importanceLine:
      'It links closed-shell electronic structure to spectroscopy, cryogenic separation, trace-atmosphere recovery, and the science of electrical discharge.',
    heroFacts: ['Closed-shell noble gas', 'Red-orange glow in discharge tubes', 'Recovered from liquid air', 'Important in lighting and lasers'],
    glossaryExtras: [
      term('Emission spectrum', 'The set of wavelengths emitted by excited atoms, characteristic of each element.'),
      term('Helium-neon laser', 'A gas laser that uses a mixture of helium and neon to generate coherent light.'),
      term('Noble gas', 'A group-18 element with a filled valence shell and generally low chemical reactivity.'),
    ],
    sections: {
      classification: section(
        'Neon is classified as a noble gas because its filled second shell suppresses ordinary chemical reactivity and stabilizes the monatomic element.',
        [
          'Neon is the period-2 noble gas and the first group-18 element with a complete octet in the second shell.',
          'Its classification shows how closed-shell stability becomes even clearer after helium once the familiar octet pattern appears.',
          'The element is best understood as a chemically inert atom with exceptional spectroscopic usefulness.',
          'This classification chapter sets up why neon’s applications depend more on physical and electronic behavior than on ordinary compound chemistry.',
        ],
        [
          'a period 2 noble gas with a filled second shell',
          'period 2, group 18, p-block',
          '[He] 2s2 2p6',
          'its completed valence shell makes neon one of the least reactive elements known',
          'it exemplifies how a closed-shell configuration suppresses ordinary chemical bonding',
        ]
      ),
      electronic: section(
        'Neon is a clean example of a closed-shell atom whose electronic completeness leads to inert chemistry but vivid behavior under excitation.',
        [
          'The filled octet gives neon high ionization energy and little tendency to share or transfer electrons in ordinary conditions.',
          'Electrical discharge does not make neon chemically reactive in bulk, but it does reveal its characteristic emission spectrum.',
          'This distinction between stable ground-state atoms and optically active excited states is central to understanding neon.',
          'As a result, neon often appears in textbooks as both a noble gas and a spectroscopy standard.',
        ],
        [
          'a completely filled octet outside the 1s core',
          'neon remains monatomic and interacts mainly through weak dispersion forces',
          '0 is the only practical oxidation state in common chemistry',
          'atomic emission in electrical discharges rather than stable neutral bonding compounds',
          'high ionization energy and low polarizability explain its reluctance to form compounds',
        ]
      ),
      physical: section(
        'Neon is physically a light monatomic gas, but its best-known property is not density or boiling point; it is luminous behavior in an electrical discharge.',
        [
          'Weak interatomic attractions give neon a low boiling point and a simple condensed-phase picture compared with more reactive elements.',
          'When excited electrically, however, neon produces the intense red-orange glow that made it culturally and technologically famous.',
          'This combination of inertness and optical signature makes neon useful in both industry and teaching.',
          'Physical handling is usually straightforward, though still governed by compressed-gas discipline and confined-space ventilation.',
        ],
        [
          'a colorless, odorless, monatomic gas',
          'it has a low boiling point and produces intense red-orange light in electrical discharge tubes',
          'closed-shell atoms interact weakly, so condensed phases form only at low temperature',
          'neon gas in luminous tubes and liquid neon as a specialized cryogenic refrigerant',
          'handling is usually straightforward, but pressure control and confined-space ventilation remain important',
        ]
      ),
      reactivity: section(
        'Neon is among the least chemically reactive elements, so most practical discussion focuses on physical rather than synthetic chemistry.',
        [
          'Ordinary reagents do not form stable common compounds with neon.',
          'Any discussion of neon "chemistry" usually refers to excited discharge conditions, matrix isolation, or exotic high-pressure systems.',
          'This inertness is itself chemically instructive because it confirms the predictive value of a closed-shell electron configuration.',
          'For users, the main concerns are cylinder safety and oxygen displacement, not corrosion or vigorous reaction.',
        ],
        [
          'chemically inert under ordinary conditions',
          'it does not form stable common compounds and resists direct reaction with ordinary reagents',
          'the closed-shell electron configuration makes electron transfer and sharing highly unfavorable',
          'excited-state discharge behavior and a few exotic high-pressure or matrix-isolated species',
          'practical concerns are physical, especially asphyxiation and compressed-gas hazards, rather than chemical corrosion',
        ]
      ),
      occurrence: section(
        'Neon is present in the atmosphere only in trace amounts, so practical supply depends on processing very large volumes of air.',
        [
          'Atmospheric abundance is low enough that recovery is economically tied to large air-separation plants.',
          'Neon also has cosmochemical significance because noble-gas isotopes help trace planetary and stellar processes.',
          'In contrast to bioactive elements, neon participates little in environmental cycling because it is inert.',
          'Occurrence therefore means trace atmosphere on Earth but informative abundance in cosmic materials.',
        ],
        [
          'neon is a trace constituent of the atmosphere and also occurs in cosmic materials',
          'it is far less abundant in air than nitrogen, oxygen, or argon',
          'atmospheric air and stellar nucleosynthesis are the relevant reservoirs for practical and cosmic discussions',
          'because it is chemically inert, neon participates little in biogeochemical cycles',
          'its low atmospheric concentration makes recovery an exercise in large-scale air processing',
        ]
      ),
      isotopes: section(
        'Neon isotopes are especially valuable in geochemistry and cosmochemistry because multiple stable nuclides record different source histories.',
        [
          'Natural neon contains three stable isotopes with sufficiently distinct origins to be analytically useful.',
          'Differences among atmospheric, mantle, and cosmogenic neon can be resolved isotopically.',
          'This makes neon more than a lighting gas; it becomes a tracer of planetary process and exposure history.',
          'The isotope chapter highlights how an inert gas can still carry rich scientific information.',
        ],
        [
          'neon-20, neon-21, and neon-22',
          'all three are stable, with neon-20 most abundant',
          'variation in isotopic composition helps distinguish atmospheric, mantle, and cosmogenic sources',
          'neon isotopes are valuable in geochemistry, cosmochemistry, and exposure dating',
          'isotope interpretation requires care because multiple source processes can overlap',
        ]
      ),
      production: section(
        'Neon manufacture is a trace-gas separation problem built on very large air-processing infrastructure.',
        [
          'Because air contains only small amounts of neon, the economics of production depend on integration with large cryogenic plants.',
          'Separation from helium and other noble gases requires careful low-temperature and adsorption methods.',
          'High purity is especially important because discharge and laser applications are sensitive to contamination.',
          'The production story therefore combines rarity, purification, and precision gas handling.',
        ],
        [
          'fractional distillation of liquid air, often in streams associated with helium and other noble gases',
          'large air-separation plants are required because neon is present only in trace amounts',
          'purification may combine cryogenic steps with adsorption and controlled separation from helium',
          'high purity is essential for lighting, laser, and electronics applications',
          'cost is governed mainly by the difficulty of recovering a rare inert gas from enormous volumes of air',
        ]
      ),
      applied: section(
        'Neon is applied where stable inert gas behavior and distinctive emission characteristics are more important than chemical transformation.',
        [
          'The element became famous through luminous signage, but its uses also include indicators, lasers, and specialized refrigeration.',
          'Neon spectroscopy and plasma behavior made it scientifically important long before many modern display technologies changed public visibility.',
          'Its cultural footprint is therefore larger than its atmospheric abundance might suggest.',
          'Hazards are modest chemically, though compressed-gas safety and oxygen displacement still apply.',
        ],
        [
          'advertising illumination, high-voltage indicators, lasers, cryogenic refrigeration, and specialized electronics',
          'glow-discharge tubes, helium-neon lasers, and liquid neon are the best known technological forms',
          'its spectral lines made neon a model system for spectroscopy and plasma physics',
          'early twentieth-century neon lighting helped define the visual culture of cities and signs',
          'hazards are modest chemically, but gas-cylinder handling and oxygen displacement must still be respected',
        ]
      ),
    },
  },
  ...additionalChemistryElementSeeds,
  ...transitionElementSeeds,
];
