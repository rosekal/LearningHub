"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStudy = useStudy;
const study_provider_1 = require("@/store/study-provider");
function useStudy() {
    return (0, study_provider_1.useStudyContext)();
}
