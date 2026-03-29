export type SectionKey =
  | 'classification'
  | 'electronic'
  | 'physical'
  | 'reactivity'
  | 'occurrence'
  | 'isotopes'
  | 'production'
  | 'applied';

export interface SectionSeed {
  focusNote: string;
  highlights: string[];
  facts: string[];
}
