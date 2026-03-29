"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const chemistry_1 = require("../content/subjects/chemistry");
const topic = chemistry_1.chemistrySubject.topics.find((item) => item.id === 'elements');
if (!topic) {
    throw new Error('Elements topic not found');
}
const targets = process.argv.slice(2);
if (targets.length === 0) {
    throw new Error('No element ids provided');
}
function chapterText(chapter) {
    return chapter.blocks
        .filter((block) => block.type === 'paragraph' && typeof block.content === 'string')
        .map((block) => block.content.trim())
        .filter(Boolean)
        .join('\n\n');
}
for (const id of targets) {
    const unit = topic.learningUnits.find((item) => item.id === id);
    if (!unit) {
        throw new Error(`Unit not found: ${id}`);
    }
    const parts = [`Chemistry -> Elements -> ${unit.title}`, ''];
    for (const chapter of unit.chapters) {
        parts.push(chapter.title);
        parts.push('');
        parts.push(chapterText(chapter));
        parts.push('');
    }
    const outPath = node_path_1.default.join(process.cwd(), `${id}-chapter-texts.txt`);
    node_fs_1.default.writeFileSync(outPath, parts.join('\n'), 'utf8');
}
