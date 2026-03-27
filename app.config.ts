import type { ExpoConfig } from 'expo/config';

const { expo } = require('./app.json') as { expo: ExpoConfig };

function normalizeBaseUrl(value?: string) {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed || trimmed === '/') {
    return undefined;
  }

  return `/${trimmed.replace(/^\/+/, '').replace(/\/+$/, '')}`;
}

const baseUrl =
  normalizeBaseUrl(process.env.EXPO_BASE_URL) ??
  normalizeBaseUrl(process.env.GITHUB_REPOSITORY?.split('/').pop());

const config: ExpoConfig = {
  ...expo,
  experiments: {
    ...expo.experiments,
    ...(baseUrl ? { baseUrl } : {}),
  },
};

export default config;
