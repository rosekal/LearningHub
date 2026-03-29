"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operationsResearchSystemsScienceAccentSources = exports.operationsResearchSystemsScienceUnits = exports.operationsResearchSystemsScienceTopics = exports.operationsResearchSystemsScienceSubject = void 0;
const createStructuredSubject_1 = require("@/content/subjects/shared/createStructuredSubject");
const topics = [
    {
        id: 'foundations-of-operations-research',
        title: 'Foundations of Operations Research',
        description: 'Optimization, decision analysis, modeling, and the quantitative study of complex systems.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'What Is Operations Research?',
            'Systems Thinking Basics',
            'Mathematical Models in Decision Making',
            'Deterministic vs Stochastic Models',
            'Objectives and Constraints',
            'Model Validation and Interpretation',
        ]),
    },
    {
        id: 'linear-optimization',
        title: 'Linear Optimization',
        description: 'Linear programming, feasible regions, duality, and resource allocation problems.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Linear Programming Basics',
            'Objective Functions',
            'Constraints and Feasible Solutions',
            'Graphical Methods',
            'Simplex Method Overview',
            'Duality Basics',
            'Sensitivity Analysis',
            'Applications of Linear Optimization',
        ]),
    },
    {
        id: 'integer-and-combinatorial-optimization',
        title: 'Integer and Combinatorial Optimization',
        description: 'Discrete decision problems, network structures, and hard optimization tasks.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Integer Programming',
            'Binary Decision Models',
            'Assignment Problems',
            'Scheduling Basics',
            'Traveling Salesman Problem',
            'Network Optimization',
            'Heuristics and Approximation',
            'Combinatorial Problem Structure',
        ]),
    },
    {
        id: 'probability-stochastic-models-and-simulation',
        title: 'Probability, Stochastic Models, and Simulation',
        description: 'Uncertainty, random processes, queues, and simulation-based system analysis.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Probability Review for OR',
            'Random Variables in Systems',
            'Markov Chains',
            'Queueing Theory Basics',
            'Inventory Under Uncertainty',
            'Monte Carlo Simulation',
            'Discrete Event Simulation',
            'Risk and Uncertainty in Decisions',
        ]),
    },
    {
        id: 'decision-analysis-and-game-theory',
        title: 'Decision Analysis and Game Theory',
        description: 'Decision-making under uncertainty, strategic interaction, and tradeoff analysis.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Decision Trees',
            'Utility and Preferences',
            'Bayesian Decision Concepts',
            'Multi-Criteria Decision Analysis',
            'Game Theory Basics',
            'Cooperative vs Noncooperative Games',
            'Strategic Equilibrium Concepts',
            'Applications in Policy and Operations',
        ]),
    },
    {
        id: 'systems-dynamics-and-control',
        title: 'Systems Dynamics and Control',
        description: 'Feedback, delays, stock-flow structures, and dynamic behavior in complex systems.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Stocks and Flows',
            'Feedback Loops',
            'Delays in Systems',
            'Nonlinear Behavior',
            'System Dynamics Modeling',
            'Stability and Control Basics',
            'Policy Resistance',
            'Dynamic Decision Systems',
        ]),
    },
    {
        id: 'applied-or-and-systems-science',
        title: 'Applied OR and Systems Science',
        description: 'Applications across logistics, health, infrastructure, environment, and strategic planning.',
        units: (0, createStructuredSubject_1.structuredUnits)([
            'Supply Chain Optimization',
            'Transportation Systems',
            'Facility Location',
            'Project Scheduling',
            'Health Systems Applications',
            'Energy Systems Modeling',
            'Environmental Systems Modeling',
            'Decision Support Systems',
        ]),
    },
];
const built = (0, createStructuredSubject_1.createStructuredSubject)({
    id: 'operations-research-systems-science',
    title: 'Operations Research / Systems Science',
    description: 'Local-first operations research content spanning optimization, simulation, strategic decisions, and dynamic systems.',
    tagline: 'Study complex decisions through optimization, uncertainty, feedback, and system modeling.',
    accent: 'magnesium',
    practitionerPlural: 'operations researchers',
    topics,
    accentCycle: createStructuredSubject_1.defaultSubjectAccentCycle,
});
exports.operationsResearchSystemsScienceSubject = built.subject;
exports.operationsResearchSystemsScienceTopics = built.topics;
exports.operationsResearchSystemsScienceUnits = built.units;
exports.operationsResearchSystemsScienceAccentSources = built.accentSources;
