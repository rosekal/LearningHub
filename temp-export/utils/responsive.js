"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clampValue = clampValue;
exports.interpolateByWidth = interpolateByWidth;
function clampValue(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
function interpolateByWidth({ width, minValue, maxValue, minWidth = 320, maxWidth = 768, }) {
    const boundedWidth = clampValue(width, minWidth, maxWidth);
    const progress = (boundedWidth - minWidth) / (maxWidth - minWidth);
    return minValue + (maxValue - minValue) * progress;
}
