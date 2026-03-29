"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReducedMotion = useReducedMotion;
const react_native_1 = require("react-native");
const react_1 = require("react");
function useReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        let isMounted = true;
        react_native_1.AccessibilityInfo.isReduceMotionEnabled()
            .then((enabled) => {
            if (isMounted) {
                setPrefersReducedMotion(enabled);
            }
        })
            .catch(() => undefined);
        const subscription = react_native_1.AccessibilityInfo.addEventListener('reduceMotionChanged', (enabled) => {
            setPrefersReducedMotion(enabled);
        });
        return () => {
            isMounted = false;
            subscription.remove();
        };
    }, []);
    return prefersReducedMotion;
}
