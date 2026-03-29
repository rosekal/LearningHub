"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { expo } = require('./app.json');
function normalizeBaseUrl(value) {
    if (!value) {
        return undefined;
    }
    const trimmed = value.trim();
    if (!trimmed || trimmed === '/') {
        return undefined;
    }
    return `/${trimmed.replace(/^\/+/, '').replace(/\/+$/, '')}`;
}
const baseUrl = normalizeBaseUrl(process.env.EXPO_BASE_URL) ??
    normalizeBaseUrl(process.env.GITHUB_REPOSITORY?.split('/').pop());
const config = {
    ...expo,
    experiments: {
        ...expo.experiments,
        ...(baseUrl ? { baseUrl } : {}),
    },
};
exports.default = config;
