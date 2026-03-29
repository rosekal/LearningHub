"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPercent = formatPercent;
exports.formatReadingTime = formatReadingTime;
exports.formatQuizScore = formatQuizScore;
exports.formatCount = formatCount;
exports.titleCase = titleCase;
function formatPercent(value) {
    return `${Math.round(value)}%`;
}
function formatReadingTime(minutes) {
    return `${minutes} min read`;
}
function formatQuizScore(score, total) {
    return `${score}/${total}`;
}
function formatCount(value, singular, plural) {
    const label = value === 1 ? singular : plural ?? `${singular}s`;
    return `${value} ${label}`;
}
function titleCase(value) {
    return value
        .split(' ')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}
