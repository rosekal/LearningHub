export interface Subject {
  id: string;
  title: string;
  description: string;
  tagline: string;
  accent: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  sectionLabel: string;
  learningUnits: LearningUnit[];
}

export interface LearningUnit {
  id: string;
  subjectId: string;
  topicId: string;
  kind: string;
  order: number;
  title: string;
  shortTitle: string;
  summary: string;
  overview: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    facts: string[];
  };
  metadata: Array<{ label: string; value: string }>;
  glossary: GlossaryTerm[];
  searchTerms: string[];
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  overview: string;
  estimatedMinutes: number;
  blocks: ContentBlock[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
}

export type ContentBlock = ParagraphBlock | BulletListBlock | FigureContentBlock;

export interface ParagraphBlock {
  id: string;
  type: 'paragraph';
  text: string;
}

export interface BulletListBlock {
  id: string;
  type: 'bullet-list';
  title?: string;
  items: string[];
}

export type FigureVariant =
  | 'applicationMatrix'
  | 'periodicTile'
  | 'atomicStructure'
  | 'spectrumBar'
  | 'reactionFlow'
  | 'propertyComparison'
  | 'safetyPanel'
  | 'glossaryCallout';

export type FigureTone = 'accent' | 'neutral' | 'success' | 'warning' | 'danger';

export interface FigureChip {
  label: string;
  value: string;
  tone?: FigureTone;
}

export interface FigureMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface ApplicationMatrixFigureData {
  variant: 'applicationMatrix';
  columns: Array<{
    title: string;
    items: FigureChip[];
  }>;
  footer?: string;
}

export interface PeriodicTileFigureData {
  variant: 'periodicTile';
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: string;
  group: string;
  period: string;
  block: string;
  category: string;
  state: string;
  oxidationStates: string;
}

export interface AtomicStructureFigureData {
  variant: 'atomicStructure';
  symbol: string;
  atomicNumber: number;
  electronConfiguration: string;
  shells: number[];
  valenceShell: string;
  bondingNote: string;
  oxidationStates: string;
}

export interface SpectrumBarFigureData {
  variant: 'spectrumBar';
  title: string;
  subtitle: string;
  note: string;
  segments: Array<{
    label: string;
    detail: string;
    weight: number;
    tone?: FigureTone;
  }>;
}

export interface ReactionFlowFigureData {
  variant: 'reactionFlow';
  steps: Array<{
    title: string;
    detail: string;
    tag?: string;
  }>;
  footer?: string;
}

export interface PropertyComparisonFigureData {
  variant: 'propertyComparison';
  metrics: FigureMetric[];
}

export interface SafetyPanelFigureData {
  variant: 'safetyPanel';
  items: Array<{
    title: string;
    detail: string;
    severity: 'low' | 'moderate' | 'high';
  }>;
  footer?: string;
}

export interface GlossaryCalloutFigureData {
  variant: 'glossaryCallout';
  terms: Array<{
    term: string;
    definition: string;
  }>;
}

export type FigureData =
  | ApplicationMatrixFigureData
  | PeriodicTileFigureData
  | AtomicStructureFigureData
  | SpectrumBarFigureData
  | ReactionFlowFigureData
  | PropertyComparisonFigureData
  | SafetyPanelFigureData
  | GlossaryCalloutFigureData;

export interface FigureContentBlock {
  id: string;
  type: 'figure';
  label: string;
  title: string;
  caption: string;
  altText?: string;
  placeholder?: string;
  figure: FigureData;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false';
  prompt: string;
  explanation: string;
  options: QuizOption[];
  correctOptionId: string;
}

export interface QuizOption {
  id: string;
  label: string;
  text: string;
}

export interface QuizResult {
  chapterKey: string;
  latestScore: number;
  bestScore: number;
  totalQuestions: number;
  lastTakenAt: string;
}

export interface Bookmark {
  chapterKey: string;
  createdAt: string;
}

export interface ContinueLearningState {
  subjectId: string;
  topicId: string;
  unitId: string;
  chapterId: string;
  updatedAt: string;
}

export interface StudyProgress {
  completedChapterKeys: string[];
  bookmarks: Bookmark[];
  quizResults: Record<string, QuizResult>;
  reviewedFlashcards: Record<string, string[]>;
  lastVisited?: ContinueLearningState;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}
