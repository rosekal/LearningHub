"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chemistryLearningUnits = exports.chemistryElementUnits = exports.chemistryElementTopic = exports.chemistryTopic = exports.chemistrySubject = exports.chemistryUnits = exports.chemistryTopics = void 0;
const elements_1 = require("@/content/subjects/chemistry/elements");
const conceptTopics_1 = require("@/content/subjects/chemistry/conceptTopics");
function inferDifficulty(order, total) {
    if (order <= Math.max(2, Math.ceil(total / 3))) {
        return 'introductory';
    }
    if (order >= Math.max(3, total - Math.floor(total / 3))) {
        return 'advanced';
    }
    return 'intermediate';
}
function withSequentialGuidance(units) {
    return units.map((unit, index) => ({
        ...unit,
        difficulty: unit.difficulty ?? inferDifficulty(index + 1, units.length),
        prerequisiteUnitIds: unit.prerequisiteUnitIds ?? (index > 0 ? [units[index - 1].id] : []),
    }));
}
function withTopicGuidance(topics) {
    return topics.map((topic, index) => {
        const guidedUnits = withSequentialGuidance(topic.learningUnits);
        return {
            ...topic,
            recommendedFirstUnitId: topic.recommendedFirstUnitId ?? guidedUnits[0]?.id,
            prerequisiteTopicIds: topic.prerequisiteTopicIds ?? (index > 0 ? [topics[index - 1].id] : []),
            difficulty: topic.difficulty ??
                guidedUnits[Math.min(guidedUnits.length - 1, Math.floor(guidedUnits.length / 2))]
                    ?.difficulty ??
                'introductory',
            learningUnits: guidedUnits,
        };
    });
}
const guidedElementsTopic = withTopicGuidance([elements_1.chemistryTopic])[0];
const guidedConceptTopics = withTopicGuidance(conceptTopics_1.chemistryConceptTopics);
exports.chemistryTopics = [guidedElementsTopic, ...guidedConceptTopics];
exports.chemistryUnits = exports.chemistryTopics.flatMap((topic) => topic.learningUnits);
exports.chemistrySubject = {
    ...elements_1.chemistrySubject,
    description: 'Local-first chemistry content spanning elemental chemistry, atomic structure, bonding, reactions, measurement, and materials science.',
    tagline: 'Read, review, and quiz through a broad chemistry study sequence.',
    recommendedFirstTopicId: exports.chemistryTopics[0]?.id,
    topics: exports.chemistryTopics,
};
exports.chemistryTopic = guidedElementsTopic;
exports.chemistryElementTopic = guidedElementsTopic;
exports.chemistryElementUnits = guidedElementsTopic.learningUnits;
exports.chemistryLearningUnits = exports.chemistryUnits;
