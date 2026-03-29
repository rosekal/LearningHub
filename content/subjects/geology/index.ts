import type { Subject } from '@/content/schema';

import { geologyTopics, geologyUnits } from '@/content/subjects/geology/topics';

export const geologySubject: Subject = {
  id: 'geology',
  title: 'Geology',
  description:
    'Local-first geology content spanning Earth materials, tectonics, stratigraphy, hazards, resources, and environmental interpretation.',
  tagline: 'Read, review, and quiz through a broad geology study sequence.',
  accent: 'silicon',
  recommendedFirstTopicId: geologyTopics[0]?.id,
  topics: geologyTopics,
};

export { geologyTopics, geologyUnits };
