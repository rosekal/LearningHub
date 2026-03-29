"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.term = term;
exports.classificationSection = classificationSection;
exports.electronicSection = electronicSection;
exports.physicalSection = physicalSection;
exports.reactivitySection = reactivitySection;
exports.occurrenceSection = occurrenceSection;
exports.isotopeSection = isotopeSection;
exports.productionSection = productionSection;
exports.appliedSection = appliedSection;
function section(focusNote, highlights, facts) {
    return { focusNote, highlights, facts };
}
function term(entry, definition) {
    return { term: entry, definition };
}
function classificationSection(name, facts) {
    return section(`${name} is best introduced as ${facts[0]}, and its periodic position becomes most useful when tied directly to the compounds and ions it actually forms.`, [
        `${name} shows how periodic location guides expectations about common ions, bond types, and broad family chemistry.`,
        'Comparisons with neighboring elements are essential because group labels are useful starting points, not complete explanations.',
        'Valence behavior, charge density, and metallic character refine the broad category assigned to the element.',
        `The classification of ${name} matters because it predicts the bonding, reactivity, and applications developed in later chapters.`,
    ], facts);
}
function electronicSection(name, facts) {
    return section(`The valence picture of ${name} begins with ${facts[0]}, and that arrangement explains most of the bonding and oxidation behavior seen in ordinary compounds.`, [
        'Electronic structure is the shortest route to understanding compound stability, bond polarity, and coordination preferences.',
        'Representative compounds make the valence pattern visible as actual structures instead of abstract notation.',
        'Charge density, shielding, and orbital availability all matter when moving from isolated atoms to condensed phases and solutions.',
        `Once the valence picture is clear, much of the chemistry of ${name} becomes easier to predict.`,
    ], facts);
}
function physicalSection(name, facts) {
    return section(`The physical form of ${name} is summarized as ${facts[0]}, and that form already reflects the structure and bonding forces characteristic of the element.`, [
        'Measured properties such as density, melting point, hardness, conductivity, or volatility become meaningful when interpreted structurally.',
        'The same element can behave differently when allotropy, crystal packing, particle size, or condensed phase changes.',
        'Handling and storage requirements often begin with physical form before chemical reactivity is even considered.',
        `Physical data connects directly to the laboratory, transport, and technological uses of ${name}.`,
    ], facts);
}
function reactivitySection(name, facts) {
    return section(`The chemistry of ${name} is best introduced through ${facts[0]}, which captures both the thermodynamic tendencies of the element and the practical hazards associated with it.`, [
        'Reactivity is not only about whether the element reacts, but also about which conditions activate it and which products are favored.',
        'Bond strength, charge stabilization, passivation, and catalysis often matter as much as simple thermodynamic driving force.',
        'Major reaction families carry the chemistry of the element into synthesis, industrial processing, environmental chemistry, and materials science.',
        `A useful reactivity summary for ${name} always combines mechanism with practical caution.`,
    ], facts);
}
function occurrenceSection(name, facts) {
    return section(`${name} is found mainly as ${facts[0]}, so its natural distribution is controlled by the forms in which the element is chemically stabilized.`, [
        'Occurrence is most informative when abundance, reservoirs, and environmental mobility are considered together.',
        'Geological, atmospheric, biological, and industrial reservoirs can tell very different stories about the same element.',
        'The forms in which an element is stored determine how it enters extraction, ecology, and long-term planetary cycling.',
        `For ${name}, abundance becomes useful only when it is tied to actual reservoirs and chemical forms.`,
    ], facts);
}
function isotopeSection(name, facts) {
    return section(`The isotope story of ${name} centers on ${facts[0]}, linking ordinary chemistry to nuclear stability, measurement, tracing, and sometimes radiological control.`, [
        'Isotopes preserve chemical identity while changing mass, nuclear stability, and analytical usefulness.',
        'Some isotope chapters matter mainly because of tracing and dating, while others matter because of radioactivity or unusual nuclear properties.',
        'Stable-isotope variation can be scientifically valuable even when no major radiological issue is present.',
        `For ${name}, isotope chemistry is most useful when tied to measurement, environmental interpretation, or technology.`,
    ], facts);
}
function productionSection(name, facts) {
    return section(`Modern supply of ${name} depends on ${facts[0]}, so industrial chemistry is inseparable from separation, reduction, purification, and energy cost.`, [
        'Production routes are shaped by feedstock chemistry as much as by abundance.',
        'A process becomes dominant when it balances thermodynamics, impurity control, scale, and economic efficiency.',
        'Alternative routes matter because different ores, brines, gases, or residues favor different purification strategies.',
        `A strong production summary for ${name} explains not only how material is made, but why that route dominates.`,
    ], facts);
}
function appliedSection(name, facts) {
    return section(`${name} matters technologically through ${facts[0]}, where atomic-scale behavior becomes useful at industrial, environmental, biological, or laboratory scale.`, [
        'Applications are strongest when linked back to the bonding, structure, and redox behavior that make the element distinctive.',
        'Major compounds and material systems often reveal more about an element than the isolated elemental form itself.',
        'Scientific and historical importance show how the chemistry of an element changed what researchers could explain or build.',
        `A responsible applications chapter for ${name} ends with both utility and operational limits in view.`,
    ], facts);
}
