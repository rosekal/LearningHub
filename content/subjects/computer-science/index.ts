import {
  createStructuredSubject,
  defaultSubjectAccentCycle,
  structuredUnits,
  type StructuredTopicSeed,
} from '@/content/subjects/shared/createStructuredSubject';

const topics: StructuredTopicSeed[] = [
  {
    id: 'foundations-of-computer-science',
    title: 'Foundations of Computer Science',
    description:
      'Core ideas of computation, information, abstraction, and the structure of computer systems.',
    units: structuredUnits([
      'What Is Computer Science?',
      'Data, Information, and Encoding',
      'Abstraction in Computing',
      'Algorithms and Problems',
      'Hardware and Software',
      'History of Computing',
    ]),
  },
  {
    id: 'programming-fundamentals',
    title: 'Programming Fundamentals',
    description:
      'Basic programming concepts, logic, control flow, and structured problem solving.',
    units: structuredUnits([
      'Variables and Data Types',
      'Expressions and Operators',
      'Conditionals',
      'Loops',
      'Functions',
      'Input and Output',
      'Debugging Basics',
      'Program Design',
    ]),
  },
  {
    id: 'data-structures-and-algorithms',
    title: 'Data Structures and Algorithms',
    description:
      'Organizing data and designing efficient procedures to solve computational problems.',
    units: structuredUnits([
      'Arrays and Lists',
      'Stacks and Queues',
      'Linked Structures',
      'Trees',
      'Hash Tables',
      'Sorting Algorithms',
      'Searching Algorithms',
      'Algorithmic Complexity',
      'Recursion',
    ]),
  },
  {
    id: 'computer-systems',
    title: 'Computer Systems',
    description:
      'How computers execute programs through processors, memory, storage, and operating systems.',
    units: structuredUnits([
      'Digital Logic Basics',
      'Computer Architecture Overview',
      'CPU and Instruction Execution',
      'Memory Hierarchy',
      'Storage Systems',
      'Operating Systems Basics',
      'Processes and Threads',
      'Virtualization Basics',
    ]),
  },
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    description:
      'Methods for building, testing, maintaining, and scaling software systems.',
    units: structuredUnits([
      'Software Development Lifecycle',
      'Requirements and Specifications',
      'Version Control',
      'Testing',
      'Debugging at Scale',
      'Modularity and Design',
      'Documentation',
      'Deployment Basics',
      'Maintainability and Refactoring',
    ]),
  },
  {
    id: 'databases-and-data-management',
    title: 'Databases and Data Management',
    description:
      'Data modeling, storage, retrieval, and management in relational and non-relational systems.',
    units: structuredUnits([
      'Data Models',
      'Relational Databases',
      'Tables, Keys, and Relationships',
      'SQL Basics',
      'Normalization',
      'Transactions',
      'NoSQL Overview',
      'Data Warehousing Basics',
    ]),
  },
  {
    id: 'networks-and-the-internet',
    title: 'Networks and the Internet',
    description:
      'Communication protocols, network design, and the architecture of the internet.',
    units: structuredUnits([
      'Network Fundamentals',
      'Packets and Routing',
      'IP and Addressing',
      'Transport Protocols',
      'Web Basics',
      'Client-Server Architecture',
      'Distributed Systems Overview',
      'Cloud Computing Basics',
    ]),
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description:
      'Threats, security principles, cryptographic basics, and secure system design.',
    units: structuredUnits([
      'Security Principles',
      'Authentication and Authorization',
      'Common Threats and Attacks',
      'Cryptography Basics',
      'Network Security',
      'Application Security',
      'Privacy in Computing',
      'Secure Development Practices',
    ]),
  },
  {
    id: 'theory-of-computation',
    title: 'Theory of Computation',
    description:
      'Formal languages, computability, complexity, and the mathematical foundations of computation.',
    units: structuredUnits([
      'Formal Languages',
      'Finite Automata',
      'Regular Expressions',
      'Context-Free Grammars',
      'Turing Machines',
      'Computability',
      'Complexity Classes',
      'NP-Completeness Basics',
    ]),
  },
];

const built = createStructuredSubject({
  id: 'computer-science',
  title: 'Computer Science',
  description:
    'Local-first computer science content spanning computation, programming, systems, data, networks, security, and theory.',
  tagline: 'Study computing through connected programming, systems, and algorithmic pathways.',
  accent: 'silicon',
  practitionerPlural: 'computer scientists',
  topics,
  accentCycle: defaultSubjectAccentCycle,
});

export const computerScienceSubject = built.subject;
export const computerScienceTopics = built.topics;
export const computerScienceUnits = built.units;
export const computerScienceAccentSources = built.accentSources;
