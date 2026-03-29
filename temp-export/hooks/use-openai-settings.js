"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultOpenAIModel = getDefaultOpenAIModel;
exports.useOpenAISettings = useOpenAISettings;
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const react_1 = require("react");
const STORAGE_KEY = 'learnhub.openai-settings.v1';
function normalizeApiKey(value) {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
}
function getDefaultOpenAIModel() {
    return process.env.EXPO_PUBLIC_OPENAI_MODEL?.trim() || 'gpt-4.1-mini';
}
function useOpenAISettings() {
    const envApiKey = normalizeApiKey(process.env.EXPO_PUBLIC_OPENAI_API_KEY);
    const [storedApiKey, setStoredApiKey] = (0, react_1.useState)();
    const [isReady, setIsReady] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        let mounted = true;
        async function loadSettings() {
            try {
                const raw = await async_storage_1.default.getItem(STORAGE_KEY);
                if (!raw || !mounted) {
                    return;
                }
                const value = JSON.parse(raw);
                setStoredApiKey(normalizeApiKey(value.apiKey));
            }
            finally {
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
    const activeApiKey = (0, react_1.useMemo)(() => storedApiKey ?? envApiKey, [envApiKey, storedApiKey]);
    async function saveApiKey(value) {
        const normalized = normalizeApiKey(value);
        await async_storage_1.default.setItem(STORAGE_KEY, JSON.stringify({ apiKey: normalized }));
        setStoredApiKey(normalized);
    }
    async function clearApiKey() {
        await async_storage_1.default.removeItem(STORAGE_KEY);
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
