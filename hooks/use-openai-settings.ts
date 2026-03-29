import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'learnhub.openai-settings.v1';

interface StoredOpenAISettings {
  apiKey?: string;
}

function normalizeApiKey(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function getDefaultOpenAIModel() {
  return process.env.EXPO_PUBLIC_OPENAI_MODEL?.trim() || 'gpt-4.1-mini';
}

export function useOpenAISettings() {
  const envApiKey = normalizeApiKey(process.env.EXPO_PUBLIC_OPENAI_API_KEY);
  const [storedApiKey, setStoredApiKey] = useState<string>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSettings() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw || !mounted) {
          return;
        }

        const value = JSON.parse(raw) as StoredOpenAISettings;
        setStoredApiKey(normalizeApiKey(value.apiKey));
      } finally {
        if (mounted) {
          setIsReady(true);
        }
      }
    }

    loadSettings();

    return () => {
      mounted = false;
    };
  }, []);

  const activeApiKey = useMemo(() => storedApiKey ?? envApiKey, [envApiKey, storedApiKey]);

  async function saveApiKey(value: string) {
    const normalized = normalizeApiKey(value);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ apiKey: normalized }));
    setStoredApiKey(normalized);
  }

  async function clearApiKey() {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setStoredApiKey(undefined);
  }

  return {
    isReady,
    storedApiKey,
    envApiKey,
    activeApiKey,
    model: getDefaultOpenAIModel(),
    saveApiKey,
    clearApiKey,
  };
}
