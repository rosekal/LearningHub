import type { ElementSeed } from '@/content/subjects/chemistry/elementSeeds';
import {
  appliedSection,
  classificationSection,
  electronicSection,
  isotopeSection,
  occurrenceSection,
  physicalSection,
  productionSection,
  reactivitySection,
  term,
  type FactSet,
} from '@/content/subjects/chemistry/seedFactories';

function facts(a: string, b: string, c: string, d: string, e: string): FactSet {
  return [a, b, c, d, e];
}

export const transitionElementSeeds: ElementSeed[] = [
  {
    id: 'scandium',
    name: 'Scandium',
    symbol: 'Sc',
    atomicNumber: 21,
    atomicMass: '44.955908',
    group: '3',
    period: '4',
    block: 'd',
    category: 'Transition metal',
    roomState: 'Solid',
    electronConfiguration: '[Ar]3d1 4s2',
    oxidationStates: '+3',
    summaryLine:
      'Scandium is an early transition metal whose strongly favored Sc3+ chemistry and scarcity make it important in specialty alloys, ceramics, and separation chemistry rather than in bulk metallurgy.',
    importanceLine:
      'Its chemistry bridges the d-block and rare-earth-like geochemical behavior, highlighting how supply and separation can matter as much as periodic position.',
    heroFacts: [
      'Early transition metal',
      'Sc3+ dominates its chemistry',
      'Added to advanced aluminum alloys',
      'Recovered mainly as a byproduct',
    ],
    glossaryExtras: [
      term('Thortveitite', 'A scandium-bearing silicate mineral and one of the rare natural concentrations of scandium.'),
      term('Scandia', 'Scandium oxide, Sc2O3, a major scandium compound used in ceramics and electronics.'),
      term('Byproduct metal', 'A metal obtained mainly during processing of other primary ores or industrial residues.'),
    ],
    sections: {
      classification: classificationSection(
        'Scandium',
        facts(
          'an early transition metal often geochemically associated with rare-earth-like trivalent chemistry',
          'group 3, period 4, d-block',
          '[Ar]3d1 4s2',
          'it strongly favors Sc3+ and d0 compounds in ordinary chemistry',
          'its chemistry is simpler and less oxidation-state-diverse than that of many later transition metals'
        )
      ),
      electronic: electronicSection(
        'Scandium',
        facts(
          'an [Ar]3d1 4s2 valence arrangement',
          'it loses three electrons readily to form hard, strongly Lewis-acidic Sc3+ centers',
          '+3',
          'Sc2O3, ScCl3, hydrated Sc3+, and scandium-doped oxide materials',
          'dominant d0 scandium chemistry reduces ligand-field complexity compared with mid-series transition metals'
        )
      ),
      physical: physicalSection(
        'Scandium',
        facts(
          'a light, silvery transition-metal solid',
          'it has low density for a transition metal and can strengthen aluminum alloys markedly in small amounts',
          'metallic bonding gives a workable solid while many scandium compounds are high-melting ionic materials',
          'scandium metal and aluminum-scandium aerospace alloys',
          'metal and fine powders should be protected from oxidation during high-temperature processing'
        )
      ),
      reactivity: reactivitySection(
        'Scandium',
        facts(
          'a moderately reactive early transition metal whose stable oxidized state is Sc3+',
          'it reacts with oxygen, halogens, and acids to form trivalent compounds, while bulk metal passivates to some extent in air',
          'strong stabilization of Sc3+ and of oxide or halide lattices drives the chemistry',
          'oxide, fluoride or chloride, coordination compounds, and scandia-containing ceramics',
          'powders and hot metal require oxidation control, though hazards are more typical metallic than violently pyrophoric'
        )
      ),
      occurrence: occurrenceSection(
        'Scandium',
        facts(
          'dispersed in thortveitite, laterites, bauxite residues, and some uranium or titanium ores',
          'it is much less abundant than common structural metals and rarely forms concentrated ores',
          'lateritic deposits and industrial byproduct streams are the main practical reservoirs',
          'geochemical dispersion makes scandium supply a separation problem rather than a simple mining problem',
          'free scandium is absent in nature because trivalent oxide and silicate forms are far more stable'
        )
      ),
      isotopes: isotopeSection(
        'Scandium',
        facts(
          'stable scandium-45 together with radioactive isotopes such as scandium-46',
          'scandium-45 is the only stable isotope while scandium-46 is radiologically important',
          'radioisotopes support tracing and specialized nuclear applications',
          'scandium-46 is used in tracer and neutron-activation contexts',
          'routine chemistry uses stable scandium and isotope work is specialized'
        )
      ),
      production: productionSection(
        'Scandium',
        facts(
          'recovery as a byproduct from laterites, bauxite residues, or specialty ores followed by separation and purification',
          'production is limited mainly by separation difficulty and low concentration rather than by simple reduction chemistry',
          'oxide conversion and metallothermic or electrolytic finishing can be used to obtain the metal',
          'isolation requires careful separation from chemically similar trivalent metals',
          'supply is constrained by byproduct economics and the high cost of purification'
        )
      ),
      applied: appliedSection(
        'Scandium',
        facts(
          'aluminum-scandium alloys, high-intensity lighting, solid-oxide fuel-cell materials, and specialty ceramics',
          'Sc2O3, scandium halides, Sc-Al alloys, and scandia-stabilized zirconia',
          'scandium is scientifically valuable because small additions can strongly modify alloy microstructure and oxide conductivity',
          'modern interest in scandium rose with aerospace alloys and advanced ceramic applications rather than with bulk commodity chemistry',
          'hazards are moderate and usually tied to dusts, powders, and high-temperature processing rather than unusual solution toxicity'
        )
      ),
    },
  },
  {
    id: 'titanium',
    name: 'Titanium',
    symbol: 'Ti',
    atomicNumber: 22,
    atomicMass: '47.867',
    group: '4',
    period: '4',
    block: 'd',
    category: 'Transition metal',
    roomState: 'Solid',
    electronConfiguration: '[Ar]3d2 4s2',
    oxidationStates: '+2, +3, +4',
    summaryLine:
      'Titanium is a strong, low-density transition metal whose oxide chemistry, corrosion resistance, and biocompatibility make it central to pigments, aerospace alloys, and implants.',
    importanceLine:
      'Its chemistry links early transition-metal bonding to passivation, chloride processing, photocatalytic oxides, and high-performance structural materials.',
    heroFacts: [
      'Strong low-density metal',
      'Protected by TiO2 passivation',
      'Derived from ilmenite and rutile',
      'Produced by the Kroll process',
    ],
    glossaryExtras: [
      term('Rutile', 'A naturally occurring titanium dioxide mineral and major titanium feedstock.'),
      term('Kroll process', 'Industrial reduction of titanium tetrachloride with magnesium to produce titanium metal.'),
      term('Passivation', 'The formation of a protective oxide film that suppresses further corrosion.'),
    ],
    sections: {
      classification: classificationSection(
        'Titanium',
        facts(
          'an early transition metal with strong oxide-forming tendencies and multiple accessible oxidation states',
          'group 4, period 4, d-block',
          '[Ar]3d2 4s2',
          'it commonly forms Ti4+ and a chemistry dominated by oxides, chlorides, and coordination compounds',
          'its structural-metal image is more corrosion resistant than chemically inert because passivation masks substantial thermodynamic reactivity'
        )
      ),
      electronic: electronicSection(
        'Titanium',
        facts(
          'an [Ar]3d2 4s2 valence arrangement',
          'it forms both ionic and covalent compounds, with Ti4+ particularly important in oxides and chlorides',
          '+2, +3, and +4',
          'TiO2 octahedral networks, TiCl4 molecular chemistry, and Ti3+ coordination compounds',
          'vacant d orbitals and strong oxygen affinity make titanium important in both materials and coordination chemistry'
        )
      ),
      physical: physicalSection(
        'Titanium',
        facts(
          'a lustrous, low-density, high-strength metallic solid',
          'it combines excellent specific strength with notable corrosion resistance',
          'metallic structure gives mechanical strength while the surface TiO2 film protects the bulk material',
          'titanium alloys, titanium sponge, and rutile-derived titanium dioxide pigments',
          'high-temperature processing must limit oxygen, nitrogen, and hydrogen pickup because these embrittle the metal'
        )
      ),
      reactivity: reactivitySection(
        'Titanium',
        facts(
          'a reactive metal whose everyday behavior is dominated by rapid passivation',
          'fresh surfaces react readily with oxygen and halogens, while bulk metal remains resistant in many corrosive environments because of oxide protection',
          'formation of highly stable TiO2 is a major thermodynamic driving force',
          'oxides, chlorides, titanates, organotitanium compounds, and catalytic systems such as Ziegler-Natta-related chemistry',
          'TiCl4 fumes violently in moist air and hot metal processing must control gas uptake carefully'
        )
      ),
      occurrence: occurrenceSection(
        'Titanium',
        facts(
          'ilmenite, rutile, titanomagnetite, and other oxide-rich minerals',
          'it is fairly abundant in Earth crust but is encountered almost entirely as stable oxide minerals',
          'heavy-mineral sands and oxide ores provide the major industrial reservoirs',
          'strong oxygen affinity ensures that titanium is locked into minerals rather than appearing in native form',
          'commercial importance depends more on separable ore deposits than on simple crustal abundance'
        )
      ),
      isotopes: isotopeSection(
        'Titanium',
        facts(
          'titanium-46, titanium-47, titanium-48, titanium-49, and titanium-50',
          'all five principal naturally occurring isotopes are stable, with titanium-48 the most abundant',
          'isotopic composition can be useful in geochemistry, cosmochemistry, and high-precision materials studies',
          'stable-isotope work and isotopically distinctive meteoritic signatures make titanium scientifically informative',
          'ordinary titanium chemistry is not dominated by radiological isotope issues'
        )
      ),
      production: productionSection(
        'Titanium',
        facts(
          'chlorination of oxide ores to TiCl4 followed by reduction in the Kroll process',
          'titanium production is challenging because the metal reacts strongly with oxygen, so a chloride route is preferred over direct oxide reduction',
          'pigment-grade titanium dioxide production is a major parallel industrial pathway distinct from metal production',
          'chloride purification and exclusion of oxygen, nitrogen, and moisture are essential to obtain quality metal',
          'cost is driven by process complexity and contamination control rather than by ore rarity alone'
        )
      ),
      applied: appliedSection(
        'Titanium',
        facts(
          'aerospace alloys, implants, corrosion-resistant equipment, pigments, and photocatalytic materials',
          'titanium alloys, TiO2 pigments, TiCl4 feed chemistry, and titanate materials',
          'titanium is important because it combines structural performance with corrosion resistance and biocompatibility',
          'titanium became strategically important as aircraft, marine engineering, and advanced medical devices expanded',
          'hazards are often tied to reactive powders, machining swarf, and moisture-sensitive chlorides rather than to bulk passivated metal'
        )
      ),
    },
  },
  {
    id: 'vanadium',
    name: 'Vanadium',
    symbol: 'V',
    atomicNumber: 23,
    atomicMass: '50.9415',
    group: '5',
    period: '4',
    block: 'd',
    category: 'Transition metal',
    roomState: 'Solid',
    electronConfiguration: '[Ar]3d3 4s2',
    oxidationStates: '+2, +3, +4, +5',
    summaryLine:
      'Vanadium is a transition metal notable for broad oxidation-state chemistry, catalytic oxides, and alloying value in steels and emerging electrochemical technologies.',
    importanceLine:
      'Its chemistry highlights how d-block elements connect redox flexibility, oxide catalysis, metallurgical strengthening, and energy-storage materials.',
    heroFacts: [
      'Multiple accessible oxidation states',
      'Important steel alloy addition',
      'V2O5 is a major catalyst',
      'Recovered from ores, slags, and residues',
    ],
    glossaryExtras: [
      term('Vanadate', 'An oxyanion family derived from oxidized vanadium, usually in the +5 oxidation state.'),
      term('Vanadyl', 'A common oxovanadium motif, often associated with the +4 oxidation state.'),
      term('Ferrovanadium', 'An iron-vanadium alloy used as a vanadium source in steelmaking.'),
    ],
    sections: {
      classification: classificationSection(
        'Vanadium',
        facts(
          'a transition metal whose chemistry is distinguished by broad redox flexibility',
          'group 5, period 4, d-block',
          '[Ar]3d3 4s2',
          'it forms a wide range of oxidized and reduced compounds from simple cations to oxoanions',
          'its chemistry is more oxidation-state-diverse and more strongly redox-driven than that of titanium'
        )
      ),
      electronic: electronicSection(
        'Vanadium',
        facts(
          'an [Ar]3d3 4s2 valence arrangement',
          'it forms coordination compounds and oxides across several oxidation states with substantial ligand-dependent variability',
          '+2, +3, +4, and +5',
          'V2O5, vanadyl species, vanadates, and lower-valent coordination complexes',
          'partially filled d orbitals make color changes, redox interconversion, and catalytic behavior especially prominent'
        )
      ),
      physical: physicalSection(
        'Vanadium',
        facts(
          'a hard, steel-gray metallic solid',
          'it improves strength and wear resistance when added in small amounts to steels and titanium alloys',
          'metallic bonding gives a tough solid while oxide and salt chemistry is strongly affected by multiple accessible d-electron states',
          'ferrovanadium, metallic vanadium additions, and vanadium oxide materials',
          'dusts, oxides, and process fumes require tighter hygiene control than inert bulk metal'
        )
      ),
      reactivity: reactivitySection(
        'Vanadium',
        facts(
          'a transition metal with strongly redox-active oxide chemistry and moderate metallic reactivity',
          'it oxidizes at elevated temperature and forms a range of oxides, halides, and coordination compounds that interconvert by redox processes',
          'stabilization of several oxidation states under different ligand and oxygen conditions drives its chemistry',
          'vanadium oxides, vanadates, vanadyl compounds, and catalytic oxidation systems',
          'vanadium pentoxide dust and related process streams require care because inhalation can be harmful'
        )
      ),
      occurrence: occurrenceSection(
        'Vanadium',
        facts(
          'vanadium-bearing titanomagnetite ores, slags, petroleum residues, and some uranium-related minerals',
          'it is less abundant than iron but common enough to be economically recovered from several industrial streams',
          'ore concentrates, metallurgical slags, and heavy petroleum residues are major practical reservoirs',
          'vanadium often follows iron or heavy-organic geochemistry rather than forming large pure deposits',
          'the element is not found free because oxide and mineral forms are much more stable'
        )
      ),
      isotopes: isotopeSection(
        'Vanadium',
        facts(
          'vanadium-51 and the long-lived radioisotope vanadium-50',
          'vanadium-51 is stable and dominant, whereas vanadium-50 is very weakly radioactive and rare',
          'isotopic behavior is useful in specialized geochemical and nuclear studies',
          'vanadium isotopes can support tracing and high-precision analytical work',
          'routine vanadium chemistry is governed far more by redox state than by isotope effects'
        )
      ),
      production: productionSection(
        'Vanadium',
        facts(
          'recovery from vanadium-bearing ores, slags, and residues as oxidized vanadium intermediates such as V2O5',
          'industrial routes often target ferrovanadium or oxide products rather than pure metal first',
          'salt-roasting and leaching routes can concentrate vanadium from complex feedstocks',
          'purification depends on controlling iron, titanium, sulfur, and other co-occurring impurities',
          'supply is closely tied to steelmaking, oil refining, and byproduct recovery economics'
        )
      ),
      applied: appliedSection(
        'Vanadium',
        facts(
          'alloy steels, oxidation catalysis, pigments, and vanadium redox-flow batteries',
          'ferrovanadium, V2O5 catalysts, vanadates, and electrolyte systems for flow batteries',
          'vanadium is valuable because multiple oxidation states can be exploited both in catalysis and in electrochemical energy storage',
          'its industrial importance grew through specialty steels and later through catalytic sulfuric-acid chemistry and energy applications',
          'major hazards relate to inhalation of vanadium oxides and safe handling of strongly oxidized vanadium compounds'
        )
      ),
    },
  },
  {
    id: 'chromium',
    name: 'Chromium',
    symbol: 'Cr',
    atomicNumber: 24,
    atomicMass: '51.9961',
    group: '6',
    period: '4',
    block: 'd',
    category: 'Transition metal',
    roomState: 'Solid',
    electronConfiguration: '[Ar]3d5 4s1',
    oxidationStates: '+2, +3, +6',
    summaryLine:
      'Chromium is a hard transition metal whose passivating oxide, colorful coordination chemistry, and high-oxidation-state oxoanions make it essential in alloys, plating, and redox chemistry.',
    importanceLine:
      'Its chemistry links metallic corrosion resistance to one of the clearest contrasts in the periodic table between useful passivation and hazardous high-valent oxidants.',
    heroFacts: [
      'Hard lustrous metal',
      'Passivates stainless steel',
      'Chromate chemistry is strongly oxidizing',
      'Recovered mainly from chromite',
    ],
    glossaryExtras: [
      term('Chromite', 'The principal chromium ore, an iron chromium oxide mineral.'),
      term('Passivation', 'Protection of a metal by formation of a thin adherent oxide layer.'),
      term('Chromate', 'A Cr(VI) oxyanion family important in oxidation chemistry and environmental regulation.'),
    ],
    sections: {
      classification: classificationSection(
        'Chromium',
        facts(
          'a transition metal with an electronically unusual half-filled d-shell ground-state arrangement and strong oxide chemistry',
          'group 6, period 4, d-block',
          '[Ar]3d5 4s1',
          'it supports both relatively stable Cr3+ chemistry and strongly oxidizing Cr6+ oxoanion chemistry',
          'its behavior combines metallic passivation with oxidation-state contrasts that are more dramatic than in many neighboring elements'
        )
      ),
      electronic: electronicSection(
        'Chromium',
        facts(
          'an [Ar]3d5 4s1 valence arrangement',
          'it forms coordination compounds, oxides, and oxoanions whose behavior changes strongly with oxidation state',
          '+2, +3, and +6',
          'Cr2O3, octahedral Cr3+ complexes, chromate, and dichromate',
          'the contrast between kinetically durable Cr3+ species and strongly oxidizing Cr6+ species is central to chromium chemistry'
        )
      ),
      physical: physicalSection(
        'Chromium',
        facts(
          'a hard, lustrous, high-melting metallic solid',
          'it contributes hardness, wear resistance, and corrosion resistance when alloyed',
          'metallic structure gives hardness while a thin Cr2O3 film protects the surface of chromium-containing alloys',
          'metal plating, stainless steels, and refractory chromium-containing materials',
          'processing can generate dusts and fumes whose hazard depends strongly on oxidation state'
        )
      ),
      reactivity: reactivitySection(
        'Chromium',
        facts(
          'a metal whose bulk reactivity is moderated by passivation but whose high-valent oxides and oxoanions are strongly oxidizing',
          'it forms protective oxide films in alloys while chromate and dichromate oxidants react vigorously with many reductants and organics',
          'stability of Cr2O3 and the strong oxidizing power of Cr(VI) species drive the major chemistry',
          'passivating metal surfaces, Cr3+ coordination compounds, and Cr6+ oxidation systems',
          'hexavalent chromium compounds are toxic and carcinogenic and must be handled under strict exposure controls'
        )
      ),
      occurrence: occurrenceSection(
        'Chromium',
        facts(
          'chromite ores and related oxide mineral deposits',
          'it is not among the most abundant crustal metals, but it is concentrated enough in chromite to support large-scale mining',
          'layered mafic and ultramafic rock deposits containing chromite are the major reservoirs',
          'chromium geochemistry is strongly tied to oxide minerals rather than to native metal or simple aqueous ions',
          'free chromium metal does not persist naturally because oxide minerals are much more stable'
        )
      ),
      isotopes: isotopeSection(
        'Chromium',
        facts(
          'chromium-50, chromium-52, chromium-53, and chromium-54',
          'these principal isotopes are stable, with chromium-52 dominant in abundance',
          'chromium isotope ratios can track redox processes and planetary differentiation',
          'stable-isotope studies are valuable in geochemistry, cosmochemistry, and environmental chromium tracing',
          'routine chromium practice is governed by oxidation-state toxicity rather than by radiological isotope issues'
        )
      ),
      production: productionSection(
        'Chromium',
        facts(
          'smelting of chromite to ferrochrome and reduction of chromium oxides for higher-purity products',
          'alloy production dominates because chromium is used chiefly to impart corrosion resistance and hardness to steels',
          'aluminothermic or related reduction routes can produce more refined chromium materials',
          'ore beneficiation, redox control, and management of chromium valence are critical in processing',
          'environmental control is especially important wherever Cr(VI) can form during extraction or finishing'
        )
      ),
      applied: appliedSection(
        'Chromium',
        facts(
          'stainless steel, protective plating, refractory materials, catalysts, and pigments',
          'ferrochrome, chromium metal coatings, Cr2O3, and chromate or dichromate systems',
          'chromium is valuable because small amounts can transform corrosion behavior in steels and surfaces',
          'the development of stainless steels and decorative or functional chrome plating made chromium central to modern materials engineering',
          'the most serious hazards belong to Cr(VI) compounds rather than to passive metallic chromium in finished alloys'
        )
      ),
    },
  },
  {
    id: 'manganese',
    name: 'Manganese',
    symbol: 'Mn',
    atomicNumber: 25,
    atomicMass: '54.938044',
    group: '7',
    period: '4',
    block: 'd',
    category: 'Transition metal',
    roomState: 'Solid',
    electronConfiguration: '[Ar]3d5 4s2',
    oxidationStates: '+2, +4, +7',
    summaryLine:
      'Manganese is a transition metal whose oxidation-state diversity makes it essential to steelmaking, batteries, oxidants, and biological redox chemistry.',
    importanceLine:
      'Its chemistry highlights the versatility of the 3d series, spanning metallic alloy roles, dark oxide solids, and intensely oxidizing permanganate chemistry.',
    heroFacts: [
      'Important steelmaking additive',
      'Broad redox chemistry',
      'MnO2 is a battery material',
      'Permanganate is a strong oxidant',
    ],
    glossaryExtras: [
      term('Pyrolusite', 'Manganese dioxide mineral and one of the principal manganese ores.'),
      term('Permanganate', 'A Mn(VII) oxyanion family well known for strong oxidizing behavior.'),
      term('Ferroalloy', 'An alloy used to introduce an element such as manganese into steel or iron melts.'),
    ],
    sections: {
      classification: classificationSection(
        'Manganese',
        facts(
          'a transition metal whose chemistry spans several oxidation states and oxide structures',
          'group 7, period 4, d-block',
          '[Ar]3d5 4s2',
          'it commonly forms Mn2+ but also stabilizes higher oxidation states in oxides and oxyanions',
          'its chemistry is more varied in redox behavior than that of many neighboring structural alloying metals'
        )
      ),
      electronic: electronicSection(
        'Manganese',
        facts(
          'an [Ar]3d5 4s2 valence arrangement',
          'it forms high-spin cations, mixed oxides, and strongly oxidized oxyanions depending on conditions',
          '+2, +4, and +7',
          'Mn2+ aquo ions, MnO2, mixed manganese oxides, and permanganate',
          'half-filled d-shell stability helps explain the significance of Mn2+ while oxygen-rich environments stabilize much higher oxidation states'
        )
      ),
      physical: physicalSection(
        'Manganese',
        facts(
          'a hard, brittle, gray metallic solid',
          'pure manganese is less mechanically useful than its alloyed forms but its oxides are widely useful functional solids',
          'complex metallic structures and variable oxide frameworks influence both metal brittleness and oxide utility',
          'ferromanganese alloys, MnO2 battery solids, and permanganate salts',
          'dust control and oxidation-state awareness matter more in practice than simple bulk-metal handling alone'
        )
      ),
      reactivity: reactivitySection(
        'Manganese',
        facts(
          'a redox-active transition metal whose chemistry ranges from relatively simple Mn2+ salts to very strong oxidants',
          'the metal oxidizes in air and acids, while higher-valent manganese oxides and permanganate participate in oxidation reactions',
          'stability of multiple manganese oxidation states under different ligand and oxygen conditions drives the chemistry',
          'manganese oxides, Mn2+ salts, mixed-valence solids, and permanganate oxidation systems',
          'permanganate is a powerful oxidant, and chronic manganese exposure in dust or fumes can create health concerns'
        )
      ),
      occurrence: occurrenceSection(
        'Manganese',
        facts(
          'manganese oxide minerals such as pyrolusite, sedimentary deposits, and ocean-floor nodules',
          'it is common enough to support large ferroalloy and battery-material industries',
          'oxide ore bodies, marine nodules, and dispersed Mn in many soils and rocks are major reservoirs',
          'manganese geochemistry is strongly redox sensitive and therefore important in environmental mineral transformations',
          'native manganese metal is absent because oxide and silicate forms are much more stable naturally'
        )
      ),
      isotopes: isotopeSection(
        'Manganese',
        facts(
          'stable manganese-55 together with radioisotopes such as manganese-54',
          'manganese-55 is the only stable isotope while manganese-54 is a useful radioisotope',
          'radioisotopes support tracing and specialized activation or biomedical studies',
          'manganese-54 is important in tracer and nuclear research contexts',
          'most routine manganese chemistry is governed by oxidation-state behavior rather than isotope diversity'
        )
      ),
      production: productionSection(
        'Manganese',
        facts(
          'reduction of manganese oxides in blast or electric furnaces and electrolysis for refined metal or dioxide products',
          'much manganese enters commerce as ferromanganese or silicomanganese rather than as pure metal',
          'battery-grade MnO2 and electrolytic manganese are important specialized products',
          'ore grading, redox control, and impurity removal are important because iron, phosphorus, and silicon often accompany manganese ores',
          'supply is tied strongly to steel and battery demand rather than to single-use markets'
        )
      ),
      applied: appliedSection(
        'Manganese',
        facts(
          'steelmaking, dry-cell and alkaline batteries, oxidants, pigments, and biological metalloenzymes',
          'ferromanganese, MnO2, manganese sulfate, and permanganate salts',
          'manganese is biologically important in enzyme systems and technologically important in both alloys and electrochemical materials',
          'industrial use expanded through steel refining and later through widespread battery chemistry',
          'major hazards include dust or fume inhalation during processing and the strong oxidizing behavior of permanganate systems'
        )
      ),
    },
  },
  {
    id: 'iron',
    name: 'Iron',
    symbol: 'Fe',
    atomicNumber: 26,
    atomicMass: '55.845',
    group: '8',
    period: '4',
    block: 'd',
    category: 'Transition metal',
    roomState: 'Solid',
    electronConfiguration: '[Ar]3d6 4s2',
    oxidationStates: '+2, +3',
    summaryLine:
      'Iron is a foundational transition metal whose abundance, redox chemistry, magnetism, and central role in steelmaking make it one of the most important elements in technology and geology.',
    importanceLine:
      'Its chemistry connects mineral resources, corrosion, biological oxygen transport, and the materials infrastructure of modern civilization.',
    heroFacts: [
      'Core metal of steelmaking',
      'Common as Fe2+ and Fe3+',
      'Abundant in Earth and industry',
      'Essential in heme proteins',
    ],
    glossaryExtras: [
      term('Hematite', 'An iron(III) oxide mineral and one of the principal iron ores.'),
      term('Blast furnace', 'A high-temperature reactor used to reduce iron oxides to metallic iron.'),
      term('Corrosion', 'Electrochemical deterioration of a metal, exemplified by rusting in iron systems.'),
    ],
    sections: {
      classification: classificationSection(
        'Iron',
        facts(
          'a mid-series transition metal with major structural, redox, and magnetic significance',
          'group 8, period 4, d-block',
          '[Ar]3d6 4s2',
          'it readily forms Fe2+ and Fe3+ and supports rich oxide, sulfide, and coordination chemistry',
          'its chemistry is more geologically abundant and technologically dominant than that of most neighboring transition metals'
        )
      ),
      electronic: electronicSection(
        'Iron',
        facts(
          'an [Ar]3d6 4s2 valence arrangement',
          'it forms coordination compounds and solids in which Fe2+ and Fe3+ are especially important',
          '+2 and +3',
          'FeO, Fe2O3, Fe3O4, hexaaqua iron ions, and heme-type coordination environments',
          'partially filled d orbitals make ligand field, spin state, redox exchange, and magnetic behavior central to iron chemistry'
        )
      ),
      physical: physicalSection(
        'Iron',
        facts(
          'a dense, lustrous metallic solid that can be ferromagnetic in common structural forms',
          'it is strong, workable, and magnetically important, especially when alloyed as steel',
          'metallic bonding and allotropic changes between ferritic and austenitic forms influence structure and engineering behavior',
          'wrought iron, carbon steels, cast irons, and magnetic iron-containing materials',
          'bulk iron is easy to handle, but corrosion control and high-temperature oxidation are constant practical concerns'
        )
      ),
      reactivity: reactivitySection(
        'Iron',
        facts(
          'a transition metal that oxidizes readily in moist air and participates in wide-ranging Fe2+/Fe3+ redox chemistry',
          'it corrodes in oxygen and water, dissolves in many acids, and forms oxides, hydroxides, sulfides, and coordination complexes',
          'stability of multiple oxidation states and of iron oxides drives both useful redox chemistry and corrosion',
          'rusting systems, iron oxides, Fe2+/Fe3+ salts, catalysts, and bioinorganic redox centers',
          'corrosion, acid attack, and high-temperature scale formation are the dominant practical hazards rather than violent pyrophoricity of bulk metal'
        )
      ),
      occurrence: occurrenceSection(
        'Iron',
        facts(
          'hematite, magnetite, goethite, siderite, sulfides, and planetary core materials',
          'it is one of the most abundant and geochemically dominant transition metals on Earth',
          'iron ores, crustal minerals, sediments, and Earth core reservoirs are all major stores of the element',
          'iron cycling strongly influences redox chemistry in soils, waters, biology, and planetary differentiation',
          'native iron is uncommon at Earth surface because oxidation is usually favored, though meteoritic iron can occur'
        )
      ),
      isotopes: isotopeSection(
        'Iron',
        facts(
          'iron-54, iron-56, iron-57, and iron-58',
          'these naturally occurring isotopes are stable, with iron-56 dominant and iron-57 important spectroscopically',
          'iron isotope ratios can trace planetary formation, biological processing, and environmental redox changes',
          '57Fe is central to Mossbauer spectroscopy and stable isotopes support geochemical tracing',
          'isotope effects are scientifically rich even though ordinary iron chemistry is not radiologically driven'
        )
      ),
      production: productionSection(
        'Iron',
        facts(
          'reduction of iron oxides in blast furnaces and direct-reduced-iron processes',
          'large-scale iron production is built around removing oxygen from abundant ores and then controlling carbon content',
          'electric-arc recycling and direct reduction provide important alternative routes to ore-based blast-furnace ironmaking',
          'ore preparation, slag chemistry, impurity control, and oxygen management are central process steps',
          'the scale of iron and steel production makes energy use and carbon emissions major industrial concerns'
        )
      ),
      applied: appliedSection(
        'Iron',
        facts(
          'steelmaking, structural materials, magnets, catalysts, and biological oxygen transport systems',
          'steels, cast irons, iron oxides, iron salts, and heme-containing biomolecules',
          'iron is central to infrastructure, metabolism, and environmental redox chemistry',
          'mastery of iron metallurgy transformed tools, transport, architecture, and industrialization on a global scale',
          'hazards focus on corrosion, dusts, high-temperature metal processing, and specific toxic iron compounds rather than on unusual intrinsic reactivity'
        )
      ),
    },
  },
  {
    id: 'cobalt',
    name: 'Cobalt',
    symbol: 'Co',
    atomicNumber: 27,
    atomicMass: '58.933194',
    group: '9',
    period: '4',
    block: 'd',
    category: 'Transition metal',
    roomState: 'Solid',
    electronConfiguration: '[Ar]3d7 4s2',
    oxidationStates: '+2, +3',
    summaryLine:
      'Cobalt is a transition metal known for coordination chemistry, magnetic alloys, battery materials, and the long-lived radioisotope cobalt-60.',
    importanceLine:
      'Its chemistry links colored complexes, high-performance alloys, electrochemical materials, and medically useful radioisotopes.',
    heroFacts: [
      'Transition metal with rich coordination chemistry',
      'Important in battery cathodes',
      'Used in superalloys and magnets',
      'Co-60 is radiologically important',
    ],
    glossaryExtras: [
      term('Superalloy', 'A high-performance alloy engineered for strength and stability at elevated temperature.'),
      term('Coordination complex', 'A compound in which a central metal ion is bonded to surrounding ligands.'),
      term('Cobalt-60', 'A radioactive cobalt isotope used in radiation sources and sterilization.'),
    ],
    sections: {
      classification: classificationSection(
        'Cobalt',
        facts(
          'a transition metal with durable metallic behavior and especially rich coordination chemistry',
          'group 9, period 4, d-block',
          '[Ar]3d7 4s2',
          'it commonly forms Co2+ and Co3+ compounds and supports important alloy and catalytic chemistry',
          'its chemistry is more coordination-centered and technologically specialized than that of iron'
        )
      ),
      electronic: electronicSection(
        'Cobalt',
        facts(
          'an [Ar]3d7 4s2 valence arrangement',
          'it forms many colored coordination compounds whose properties depend on oxidation state, ligand set, and geometry',
          '+2 and +3',
          'CoCl2, cobalt oxides, octahedral Co3+ complexes, and layered battery-cathode materials',
          'spin state and ligand field effects are more important in cobalt chemistry than in simple ionic descriptions alone'
        )
      ),
      physical: physicalSection(
        'Cobalt',
        facts(
          'a hard, lustrous metallic solid that can be ferromagnetic',
          'it retains useful mechanical and magnetic properties in demanding alloy applications',
          'metallic bonding gives a robust solid, while electronic structure supports significant magnetic behavior',
          'cobalt-based superalloys, hard metals, magnets, and ceramic battery materials',
          'dusts and fine particulates require hygiene control, especially in alloy, pigment, and battery processing'
        )
      ),
      reactivity: reactivitySection(
        'Cobalt',
        facts(
          'a moderately reactive transition metal whose most important chemistry appears in oxides, salts, and complexes rather than in dramatic bulk-metal reactions',
          'it reacts with oxygen and acids under suitable conditions and can cycle between Co2+ and Co3+ in catalytic and electrochemical systems',
          'accessible redox states and strong ligand interactions drive much of the chemistry',
          'coordination complexes, cobalt oxides, catalyst systems, and electrochemical insertion materials',
          'cobalt compounds and dusts require exposure control because chronic inhalation and certain soluble compounds can be harmful'
        )
      ),
      occurrence: occurrenceSection(
        'Cobalt',
        facts(
          'nickel and copper sulfide ores, laterites, and cobalt-bearing arsenides or oxides',
          'it is less abundant than iron and is obtained mainly as a companion or byproduct metal',
          'sulfide ores, lateritic nickel deposits, and copper-cobalt ore bodies are major reservoirs',
          'cobalt supply is tightly linked to broader nickel and copper geochemistry and mining infrastructure',
          'free cobalt metal is not found naturally because the element is stabilized in ores and oxides'
        )
      ),
      isotopes: isotopeSection(
        'Cobalt',
        facts(
          'stable cobalt-59 together with radioactive cobalt-60',
          'cobalt-59 is the only stable isotope, while cobalt-60 is a prominent gamma-emitting radioisotope',
          'radioisotopes make cobalt unusually important in medicine, sterilization, and radiation technology',
          'cobalt-60 is used in radiotherapy, industrial radiography, and sterilization sources',
          'isotope handling can be a major safety issue for cobalt when radioactive material is involved'
        )
      ),
      production: productionSection(
        'Cobalt',
        facts(
          'recovery and refining from nickel or copper ores and lateritic processing streams',
          'cobalt production is dominated by separation from other metals rather than by reduction of a simple standalone ore',
          'hydrometallurgical routes, solvent extraction, and refining to salts or metal are common',
          'purity control requires careful separation from nickel, copper, iron, manganese, and trace contaminants',
          'supply risk is shaped strongly by geopolitics and by dependence on byproduct recovery'
        )
      ),
      applied: appliedSection(
        'Cobalt',
        facts(
          'rechargeable battery materials, superalloys, magnets, pigments, and radiation sources',
          'lithium cobalt oxide, cobalt metal, cobalt oxides, cobalt salts, and cobalt-60 source materials',
          'cobalt is valuable because it combines redox-active coordination chemistry with alloy durability and magnetic utility',
          'its importance expanded from pigments and alloys into nuclear technology and modern electrochemical storage',
          'key hazards include compound toxicity, dust exposure, and strict radiological control where cobalt-60 is present'
        )
      ),
    },
  },
  {
    id: 'nickel',
    name: 'Nickel',
    symbol: 'Ni',
    atomicNumber: 28,
    atomicMass: '58.6934',
    group: '10',
    period: '4',
    block: 'd',
    category: 'Transition metal',
    roomState: 'Solid',
    electronConfiguration: '[Ar]3d8 4s2',
    oxidationStates: '+2, +3',
    summaryLine:
      'Nickel is a corrosion-resistant transition metal central to stainless alloys, catalysis, electroplating, and modern battery materials.',
    importanceLine:
      'Its chemistry connects metallic durability, coordination behavior, surface catalysis, and increasingly important energy-material supply chains.',
    heroFacts: [
      'Corrosion-resistant alloy metal',
      'Common as Ni2+ in chemistry',
      'Important catalyst and battery material',
      'Recovered from sulfides and laterites',
    ],
    glossaryExtras: [
      term('Mond process', 'Nickel purification route based on formation and decomposition of nickel tetracarbonyl.'),
      term('Laterite', 'A weathered ore deposit type important in nickel production.'),
      term('Catalytic hydrogenation', 'Addition of hydrogen to unsaturated substrates using a catalyst, often nickel-based.'),
    ],
    sections: {
      classification: classificationSection(
        'Nickel',
        facts(
          'a late transition metal with durable metallic behavior and significant catalytic chemistry',
          'group 10, period 4, d-block',
          '[Ar]3d8 4s2',
          'it commonly forms Ni2+ compounds and stable metallic surfaces useful in alloys and catalysis',
          'its chemistry is less oxidation-state-diverse than cobalt or manganese but especially important at metal surfaces and in complexes'
        )
      ),
      electronic: electronicSection(
        'Nickel',
        facts(
          'an [Ar]3d8 4s2 valence arrangement',
          'it forms coordination compounds and catalytic surfaces in which Ni2+ is especially common',
          '+2 and +3',
          'NiO, NiCl2, octahedral and square-planar nickel complexes, and nickel carbonyl chemistry',
          'd-electron count makes ligand-field preferences, surface adsorption, and catalytic reactivity especially important'
        )
      ),
      physical: physicalSection(
        'Nickel',
        facts(
          'a silvery metallic solid that can be ferromagnetic',
          'it shows good corrosion resistance, toughness, and useful high-temperature alloy behavior',
          'metallic structure supports durable alloys and relatively stable passivated surfaces',
          'stainless steels, nickel superalloys, electroplated coatings, and battery precursor materials',
          'dusts, fumes, and certain nickel salts require exposure control despite the relative stability of bulk metal'
        )
      ),
      reactivity: reactivitySection(
        'Nickel',
        facts(
          'a moderately reactive transition metal whose most important chemistry lies in surface catalysis, alloying, and Ni2+ salts',
          'it dissolves in suitable acids, forms oxides and halides, and catalyzes hydrogenation and related surface reactions',
          'stability of Ni2+, adsorption at metallic surfaces, and passivation under some conditions drive the chemistry',
          'nickel oxides, salts, plated surfaces, hydrogenation catalysts, and nickel carbonyl-related processing chemistry',
          'certain nickel compounds are hazardous and nickel carbonyl is exceptionally toxic, so process control matters greatly'
        )
      ),
      occurrence: occurrenceSection(
        'Nickel',
        facts(
          'sulfide ores such as pentlandite and lateritic weathering deposits',
          'it is less abundant than iron but common enough to support major alloy and battery industries',
          'sulfide deposits, laterites, and ultramafic geological settings are major reservoirs',
          'nickel geochemistry links strongly to sulfur-rich magmatic ores and tropical weathering systems',
          'native nickel is uncommon on Earth surface because oxide and sulfide forms are generally favored'
        )
      ),
      isotopes: isotopeSection(
        'Nickel',
        facts(
          'nickel-58, nickel-60, nickel-61, nickel-62, and nickel-64',
          'these principal isotopes are stable, with nickel-58 the most abundant',
          'nickel isotopes can illuminate meteoritic, geochemical, and industrial fractionation processes',
          'stable-isotope studies and isotope-sensitive materials analysis support modern nickel research',
          'routine nickel chemistry is shaped more by compound toxicity and catalysis than by isotope effects'
        )
      ),
      production: productionSection(
        'Nickel',
        facts(
          'smelting and refining of sulfide ores together with hydrometallurgical processing of laterites',
          'different ore types require very different processing strategies, making nickel production chemically diverse',
          'the Mond process and solvent extraction routes provide important purification options for selected streams',
          'sulfur, iron, cobalt, magnesium, and moisture control are important depending on the feedstock and refinement route',
          'battery demand has increased the importance of laterite processing and high-purity nickel chemical intermediates'
        )
      ),
      applied: appliedSection(
        'Nickel',
        facts(
          'stainless steels, superalloys, electroplating, catalysts, and battery materials',
          'nickel metal, nickel oxides, nickel salts, hydrogenation catalysts, and battery precursor compounds',
          'nickel is crucial because it combines corrosion resistance, catalytic utility, and electrochemical relevance',
          'its industrial role grew from coinage and plating into high-temperature alloys, catalysis, and modern rechargeable batteries',
          'hazards include sensitization, compound toxicity, and especially strict control where volatile nickel carbonyl could form'
        )
      ),
    },
  },
  {
    id: 'copper',
    name: 'Copper',
    symbol: 'Cu',
    atomicNumber: 29,
    atomicMass: '63.546',
    group: '11',
    period: '4',
    block: 'd',
    category: 'Transition metal',
    roomState: 'Solid',
    electronConfiguration: '[Ar]3d10 4s1',
    oxidationStates: '+1, +2',
    summaryLine:
      'Copper is a highly conductive transition metal whose redox chemistry, corrosion products, and alloy behavior make it indispensable in wiring, architecture, and catalysis.',
    importanceLine:
      'Its chemistry connects metallic conductivity, accessible Cu+ and Cu2+ states, mineral extraction, and trace biological function.',
    heroFacts: [
      'Excellent electrical conductor',
      'Reddish metallic luster',
      'Common as Cu+ and Cu2+',
      'Recovered mainly from sulfide ores',
    ],
    glossaryExtras: [
      term('Chalcopyrite', 'A major copper iron sulfide ore mineral and the leading source of copper.'),
      term('Patina', 'A protective or decorative surface layer formed on weathered copper and copper alloys.'),
      term('Electrorefining', 'Purification of a metal by electrolysis, central to high-purity copper production.'),
    ],
    sections: {
      classification: classificationSection(
        'Copper',
        facts(
          'a coinage transition metal with exceptional conductivity and accessible lower oxidation states',
          'group 11, period 4, d-block',
          '[Ar]3d10 4s1',
          'it commonly forms Cu+ and Cu2+ species while retaining strong metallic behavior in the elemental state',
          'its chemistry is less reactive than that of iron or zinc yet far more redox-active and coordinatively rich than silver in many aqueous systems'
        )
      ),
      electronic: electronicSection(
        'Copper',
        facts(
          'an [Ar]3d10 4s1 valence arrangement',
          'it forms coordination compounds and solids built around Cu+ and especially Cu2+ under ordinary conditions',
          '+1 and +2',
          'Cu2O, CuO, hydrated Cu2+, tetraammine copper complexes, and metallic copper',
          'filled and nearly filled d-shell behavior gives distinctive colors, redox chemistry, and coordination distortions such as Jahn-Teller effects in Cu2+'
        )
      ),
      physical: physicalSection(
        'Copper',
        facts(
          'a reddish, highly conductive metallic solid',
          'it combines excellent electrical and thermal conductivity with good ductility',
          'face-centered-cubic metallic bonding supports easy shaping and high conductivity',
          'electrical wire, copper tubing, architectural sheet, and bronze or brass alloys',
          'bulk copper is easy to handle, but dusts, hot metal, and corrosion chemistry still demand routine industrial control'
        )
      ),
      reactivity: reactivitySection(
        'Copper',
        facts(
          'a moderately unreactive metal whose chemistry is dominated by oxidation to Cu+ or Cu2+ under suitable conditions',
          'it tarnishes in air, reacts with oxidizing acids, and forms oxides, halides, sulfides, and many coordination complexes',
          'stability of Cu+ and Cu2+ under different ligand and redox environments drives much of its chemistry',
          'patina formation, copper salts, catalytic redox cycles, and metal-organic or coordination chemistry',
          'hazards are generally moderate but can include dust exposure, oxidizing acid reactions, and toxicity of some soluble copper salts'
        )
      ),
      occurrence: occurrenceSection(
        'Copper',
        facts(
          'sulfide ores such as chalcopyrite, secondary carbonate minerals, and some native metal deposits',
          'it is less abundant than iron or aluminum but concentrated enough in ores to support major global extraction',
          'porphyry copper systems, sulfide veins, and oxidized near-surface ore zones are major reservoirs',
          'copper geochemistry includes both sulfide concentration and secondary oxidation products such as malachite or azurite',
          'native copper can occur because copper is less reactive than many common structural metals'
        )
      ),
      isotopes: isotopeSection(
        'Copper',
        facts(
          'copper-63 and copper-65',
          'both principal isotopes are stable and occur in substantial abundance',
          'copper isotope ratios can reflect ore formation, environmental transport, and biological processing',
          'stable-isotope studies are useful in geochemistry, archaeology, and environmental chemistry',
          'ordinary copper chemistry is not strongly shaped by radiological isotope considerations'
        )
      ),
      production: productionSection(
        'Copper',
        facts(
          'flotation, smelting, converting, and electrorefining of sulfide concentrates together with solvent extraction and electrowinning for some oxidized ores',
          'production routes depend strongly on whether the feed is sulfide-rich or oxide-rich',
          'SX-EW processing is an important alternative to smelting for suitable leach solutions',
          'sulfur management, impurity removal, anode slime handling, and electrorefining are critical for high-purity metal',
          'copper supply is shaped by ore grade, energy cost, sulfur capture, and demand for electrical infrastructure'
        )
      ),
      applied: appliedSection(
        'Copper',
        facts(
          'electrical transmission, plumbing, alloys, antimicrobial surfaces, and catalytic or electrochemical systems',
          'copper metal, brass, bronze, copper sulfate, copper oxides, and coordination complexes',
          'copper is essential biologically in trace amounts and technologically indispensable because of its conductivity',
          'copper metallurgy ranks among the oldest major metal technologies and profoundly shaped the development of tools and trade',
          'hazards are moderate for the metal itself but can increase with dusts, hot processing, and soluble copper compounds'
        )
      ),
    },
  },
  {
    id: 'zinc',
    name: 'Zinc',
    symbol: 'Zn',
    atomicNumber: 30,
    atomicMass: '65.38',
    group: '12',
    period: '4',
    block: 'd',
    category: 'D-block metal',
    roomState: 'Solid',
    electronConfiguration: '[Ar]3d10 4s2',
    oxidationStates: '+2',
    summaryLine:
      'Zinc is a d-block metal whose Zn2+ chemistry, sacrificial-corrosion behavior, and large-scale galvanizing role make it central to protective coatings, alloys, and bioinorganic chemistry.',
    importanceLine:
      'Its chemistry shows how a filled d shell yields a more limited oxidation-state range while still supporting major industrial and biological importance.',
    heroFacts: [
      'Commonly forms Zn2+',
      'Used for galvanizing steel',
      'Important in brass and die casting',
      'Recovered mainly from sphalerite',
    ],
    glossaryExtras: [
      term('Sphalerite', 'The principal zinc sulfide ore and most important natural zinc feedstock.'),
      term('Galvanization', 'Application of zinc to steel or iron to protect against corrosion.'),
      term('Roast-leach-electrowin', 'A common zinc production route involving roasting, solution chemistry, and electrolytic recovery.'),
    ],
    sections: {
      classification: classificationSection(
        'Zinc',
        facts(
          'a filled-d-shell d-block metal often treated alongside transition metals but chemically more limited in oxidation-state variety',
          'group 12, period 4, d-block',
          '[Ar]3d10 4s2',
          'it forms Zn2+ very consistently and shows little of the multivalent redox behavior typical of many transition metals',
          'its chemistry is more ionic and less oxidation-state-diverse than that of copper or nickel'
        )
      ),
      electronic: electronicSection(
        'Zinc',
        facts(
          'an [Ar]3d10 4s2 valence arrangement',
          'it forms mainly Zn2+ compounds with substantial ionic character but also important coordination chemistry',
          '+2',
          'ZnO, ZnCl2, tetrahedral zinc complexes, and zinc-containing enzymes or biological binding sites',
          'the filled d shell suppresses many classical transition-metal color and redox features while leaving Lewis-acid chemistry important'
        )
      ),
      physical: physicalSection(
        'Zinc',
        facts(
          'a bluish-white metallic solid',
          'it has a relatively low melting point for a metal and is brittle at room temperature but more workable when heated moderately',
          'metallic bonding in zinc gives useful casting behavior and surface protection when used as a coating',
          'galvanized coatings, die-cast zinc alloys, and brass as a copper-zinc alloy system',
          'bulk zinc is manageable, but heating can produce metal fumes and oxide smoke that require ventilation control'
        )
      ),
      reactivity: reactivitySection(
        'Zinc',
        facts(
          'a moderately reactive metal that oxidizes to protective surface films and readily forms Zn2+ salts',
          'it reacts with acids to evolve hydrogen and is deliberately used as a sacrificial anode to protect more noble metals',
          'stabilization of Zn2+ and of surface oxide or carbonate films drives much of the chemistry',
          'galvanizing systems, zinc salts, zinc oxide, organozinc reagents, and bioinorganic Zn2+ complexes',
          'acid reactions, fume generation during hot work, and flammable organozinc reagents are the most relevant practical hazards'
        )
      ),
      occurrence: occurrenceSection(
        'Zinc',
        facts(
          'sphalerite ores together with carbonates, silicates, and weathered secondary deposits',
          'it is abundant enough to support very large global coating and alloy industries',
          'sulfide ore bodies are the dominant practical reservoirs, with oxidized zones providing additional feed',
          'zinc often follows sulfur-rich ore geology and later weathering products rather than occurring as native metal',
          'free zinc is absent in nature because the metal is readily stabilized as sulfide, oxide, or carbonate'
        )
      ),
      isotopes: isotopeSection(
        'Zinc',
        facts(
          'zinc-64, zinc-66, zinc-67, zinc-68, and zinc-70',
          'these naturally occurring isotopes are stable, with zinc-64 the most abundant',
          'zinc isotope ratios can trace biological uptake, ore formation, and environmental transport',
          'stable-isotope studies are valuable in geochemistry, environmental chemistry, and nutritional science',
          'routine zinc chemistry is shaped more by Zn2+ coordination and corrosion behavior than by isotope effects'
        )
      ),
      production: productionSection(
        'Zinc',
        facts(
          'roasting, leaching, purification, and electrowinning of zinc concentrates, with pyrometallurgical routes also important',
          'zinc production typically converts sulfide ores into oxide or solution intermediates before final metal recovery',
          'roast-leach-electrowin is a major hydrometallurgical route, while some feeds are still treated thermally',
          'cadmium, iron, lead, and chloride impurity control is essential in refined zinc production',
          'supply depends strongly on sulfide ore quality and the economics of protective-coating markets'
        )
      ),
      applied: appliedSection(
        'Zinc',
        facts(
          'galvanized coatings, die-cast alloys, brass manufacture, micronutrients, and zinc-based chemicals',
          'zinc metal, brass, zinc oxide, zinc sulfate, zinc chloride, and organozinc reagents',
          'zinc is biologically essential in many enzymes and technologically important as a protective and alloying metal',
          'large-scale galvanizing made zinc indispensable to modern corrosion management and construction materials',
          'hazards are usually moderate but include zinc-fume fever from hot processing and the handling risks of reactive organozinc compounds'
        )
      ),
    },
  },
];
