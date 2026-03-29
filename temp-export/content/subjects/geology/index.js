"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geologyUnits = exports.geologyTopics = exports.geologySubject = void 0;
const topics_1 = require("@/content/subjects/geology/topics");
Object.defineProperty(exports, "geologyTopics", { enumerable: true, get: function () { return topics_1.geologyTopics; } });
Object.defineProperty(exports, "geologyUnits", { enumerable: true, get: function () { return topics_1.geologyUnits; } });
exports.geologySubject = {
    id: 'geology',
    title: 'Geology',
    description: 'Local-first geology content spanning Earth materials, tectonics, stratigraphy, hazards, resources, and environmental interpretation.',
    tagline: 'Read, review, and quiz through a broad geology study sequence.',
    accent: 'silicon',
    recommendedFirstTopicId: topics_1.geologyTopics[0]?.id,
    topics: topics_1.geologyTopics,
};
