import type { ContentDifficulty, LearningUnit, Subject, Topic } from '@/content/schema';
import {
  chemistrySubject as chemistryElementsSubject,
  chemistryTopic as chemistryElementsTopic,
  chemistryUnits as chemistryElementUnitsBase,
} from '@/content/subjects/chemistry/elements';
import {
  chemistryConceptTopics,
  chemistryConceptUnits,
} from '@/content/subjects/chemistry/conceptTopics';

function inferDifficulty(order: number, total: number): ContentDifficulty {
  if (order <= Math.max(2, Math.ceil(total / 3))) {
    return 'introductory';
  }

  if (order >= Math.max(3, total - Math.floor(total / 3))) {
    return 'advanced';
  }

  return 'intermediate';
}

function withSequentialGuidance(units: LearningUnit[]) {
  return units.map((unit, index) => ({
    ...unit,
    difficulty: unit.difficulty ?? inferDifficulty(index + 1, units.length),
    prerequisiteUnitIds: unit.prerequisiteUnitIds ?? (index > 0 ? [units[index - 1].id] : []),
  }));
}

function withTopicGuidance(topics: Topic[]) {
  return topics.map((topic, index) => {
    const guidedUnits = withSequentialGuidance(topic.learningUnits);

    return {
      ...topic,
      recommendedFirstUnitId: topic.recommendedFirstUnitId ?? guidedUnits[0]?.id,
      prerequisiteTopicIds:
        topic.prerequisiteTopicIds ?? (index > 0 ? [topics[index - 1].id] : []),
      difficulty:
        topic.difficulty ??
        guidedUnits[Math.min(guidedUnits.length - 1, Math.floor(guidedUnits.length / 2))]
          ?.difficulty ??
        'introductory',
      learningUnits: guidedUnits,
    };
  });
}

const guidedElementsTopic = withTopicGuidance([chemistryElementsTopic])[0];
const guidedConceptTopics = withTopicGuidance(chemistryConceptTopics);

export const chemistryTopics: Topic[] = [guidedElementsTopic, ...guidedConceptTopics];
export const chemistryUnits: LearningUnit[] = chemistryTopics.flatMap((topic) => topic.learningUnits);

export const chemistrySubject: Subject = {
  ...chemistryElementsSubject,
  description:
    'Local-first chemistry content spanning elemental chemistry, atomic structure, bonding, reactions, measurement, and materials science.',
  tagline: 'Read, review, and quiz through a broad chemistry study sequence.',
  recommendedFirstTopicId: chemistryTopics[0]?.id,
  topics: chemistryTopics,
};

export const chemistryTopic = guidedElementsTopic;
export const chemistryElementTopic = guidedElementsTopic;
export const chemistryElementUnits = guidedElementsTopic.learningUnits;
export const chemistryLearningUnits = chemistryUnits;
