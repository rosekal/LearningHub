import type { LearningUnit } from '@/content/schema';

export type SearchConfidence = 'exact' | 'high' | 'medium' | 'low';
export type SearchGroup = 'direct' | 'contextual' | 'weak';
export type SearchMatchType =
  | 'exact-title'
  | 'exact-symbol'
  | 'exact-short-label'
  | 'keyword-exact'
  | 'title-prefix'
  | 'symbol-prefix'
  | 'short-label-prefix'
  | 'title-whole-word'
  | 'keyword-whole-word'
  | 'description-whole-word'
  | 'title-substring'
  | 'symbol-substring'
  | 'short-label-substring'
  | 'keyword-substring'
  | 'description-substring';

export interface RankedUnitSearchResult {
  unit: LearningUnit;
  score: number;
  matchType: SearchMatchType;
  matchLabel: string;
  confidence: SearchConfidence;
  group: SearchGroup;
}

export interface UnitSearchState {
  query: string;
  results: RankedUnitSearchResult[];
  totalMatches: number;
  limited: boolean;
  showingFallback: boolean;
}

interface SearchCandidate {
  score: number;
  matchType: SearchMatchType;
  matchLabel: string;
  confidence: SearchConfidence;
  group: SearchGroup;
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

export function normalizeSearchText(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function tokenizeSearchText(value: string) {
  return normalizeSearchText(value).split(/[^a-z0-9+-]+/).filter(Boolean);
}

function hasWordPrefix(value: string, query: string) {
  return tokenizeSearchText(value).some((token) => token.startsWith(query));
}

function includesWholeWord(value: string, query: string) {
  return tokenizeSearchText(value).includes(query);
}

function extractUnitSymbolOrCode(unit: LearningUnit) {
  const segments = unit.shortTitle.split(/\s+/).filter(Boolean);
  return segments[segments.length - 1] ?? '';
}

function getKeywordTerms(unit: LearningUnit) {
  return unique(
    unit.searchTerms
      .map(normalizeSearchText)
      .filter((term) => term && term.length <= 48 && tokenizeSearchText(term).length <= 6)
  );
}

function closenessBonus(value: string, query: string, maxBonus: number) {
  const delta = Math.max(value.length - query.length, 0);
  return Math.max(0, maxBonus - delta);
}

function buildCandidate(
  score: number,
  matchType: SearchMatchType,
  matchLabel: string,
  confidence: SearchConfidence,
  group: SearchGroup
): SearchCandidate {
  return {
    score,
    matchType,
    matchLabel,
    confidence,
    group,
  };
}

function scoreLearningUnit(unit: LearningUnit, rawQuery: string): RankedUnitSearchResult | undefined {
  const query = normalizeSearchText(rawQuery);
  if (!query) {
    return undefined;
  }

  const normalizedTitle = normalizeSearchText(unit.title);
  const normalizedShortTitle = normalizeSearchText(unit.shortTitle);
  const normalizedSymbol = normalizeSearchText(extractUnitSymbolOrCode(unit));
  const normalizedSummary = normalizeSearchText(unit.summary);
  const normalizedOverview = normalizeSearchText(unit.overview);
  const keywordTerms = getKeywordTerms(unit);

  const candidates: SearchCandidate[] = [];

  if (normalizedTitle === query) {
    candidates.push(buildCandidate(1200, 'exact-title', 'Exact name match', 'exact', 'direct'));
  }

  if (normalizedSymbol && normalizedSymbol === query) {
    candidates.push(buildCandidate(1160, 'exact-symbol', 'Exact symbol match', 'exact', 'direct'));
  }

  if (normalizedShortTitle === query) {
    candidates.push(
      buildCandidate(1120, 'exact-short-label', 'Exact short label match', 'exact', 'direct')
    );
  }

  if (keywordTerms.includes(query)) {
    candidates.push(buildCandidate(900, 'keyword-exact', 'Exact keyword match', 'high', 'contextual'));
  }

  if (hasWordPrefix(normalizedTitle, query)) {
    candidates.push(
      buildCandidate(
        980 + closenessBonus(normalizedTitle, query, 18),
        'title-prefix',
        'Name prefix match',
        'high',
        'direct'
      )
    );
  }

  if (normalizedSymbol && normalizedSymbol.startsWith(query)) {
    candidates.push(
      buildCandidate(
        950 + closenessBonus(normalizedSymbol, query, 8),
        'symbol-prefix',
        'Symbol prefix match',
        'high',
        'direct'
      )
    );
  }

  if (normalizedShortTitle.startsWith(query)) {
    candidates.push(
      buildCandidate(
        900 + closenessBonus(normalizedShortTitle, query, 6),
        'short-label-prefix',
        'Short label prefix match',
        'high',
        'direct'
      )
    );
  }

  if (includesWholeWord(normalizedTitle, query)) {
    candidates.push(
      buildCandidate(840, 'title-whole-word', 'Whole-word name match', 'high', 'direct')
    );
  }

  if (keywordTerms.some((term) => includesWholeWord(term, query))) {
    candidates.push(
      buildCandidate(780, 'keyword-whole-word', 'Whole-word keyword match', 'high', 'contextual')
    );
  }

  if (includesWholeWord(normalizedSummary, query) || includesWholeWord(normalizedOverview, query)) {
    candidates.push(
      buildCandidate(
        760,
        'description-whole-word',
        'Whole-word description match',
        'high',
        'contextual'
      )
    );
  }

  if (normalizedTitle.includes(query)) {
    candidates.push(
      buildCandidate(
        690 + closenessBonus(normalizedTitle, query, 10),
        'title-substring',
        'Name contains match',
        'medium',
        'direct'
      )
    );
  }

  if (normalizedSymbol && normalizedSymbol.includes(query)) {
    candidates.push(
      buildCandidate(670, 'symbol-substring', 'Symbol contains match', 'medium', 'direct')
    );
  }

  if (normalizedShortTitle.includes(query)) {
    candidates.push(
      buildCandidate(
        650,
        'short-label-substring',
        'Short label contains match',
        'medium',
        'direct'
      )
    );
  }

  if (keywordTerms.some((term) => term.includes(query))) {
    candidates.push(
      buildCandidate(560, 'keyword-substring', 'Keyword contains match', 'low', 'contextual')
    );
  }

  if (normalizedSummary.includes(query) || normalizedOverview.includes(query)) {
    candidates.push(
      buildCandidate(520, 'description-substring', 'Description contains match', 'low', 'weak')
    );
  }

  if (candidates.length === 0) {
    return undefined;
  }

  candidates.sort((left, right) => right.score - left.score || left.matchLabel.localeCompare(right.matchLabel));
  const best = candidates[0];

  return {
    unit,
    score: best.score,
    matchType: best.matchType,
    matchLabel: best.matchLabel,
    confidence: best.confidence,
    group: best.group,
  };
}

export function rankLearningUnits(
  units: LearningUnit[],
  rawQuery: string,
  limit = 8
): UnitSearchState {
  const query = normalizeSearchText(rawQuery);
  if (!query) {
    return {
      query,
      results: [],
      totalMatches: 0,
      limited: false,
      showingFallback: false,
    };
  }

  const scored = units
    .map((unit) => scoreLearningUnit(unit, query))
    .filter((result): result is RankedUnitSearchResult => Boolean(result))
    .sort((left, right) => right.score - left.score || left.unit.order - right.unit.order);

  if (scored.length === 0) {
    return {
      query,
      results: [],
      totalMatches: 0,
      limited: false,
      showingFallback: false,
    };
  }

  const hasExactTitle = scored.some((result) => result.matchType === 'exact-title');
  const hasExactShortLabel = scored.some((result) => result.matchType === 'exact-short-label');
  const hasExactSymbol = scored.some((result) => result.matchType === 'exact-symbol');
  const directMatches = scored.filter((result) => result.group === 'direct');

  let filtered = scored;

  if (hasExactTitle) {
    filtered = scored.filter((result) => result.matchType === 'exact-title');
  } else if (hasExactShortLabel) {
    filtered = scored.filter(
      (result) => result.matchType === 'exact-short-label' || result.group === 'direct'
    );
  } else if (hasExactSymbol) {
    filtered = scored.filter(
      (result) =>
        result.matchType === 'exact-symbol' ||
        (result.group === 'direct' && result.confidence === 'high')
    );
  } else if (directMatches.length) {
    filtered = directMatches;
  } else if (scored.some((result) => result.confidence !== 'low')) {
    filtered = scored.filter((result) => result.confidence !== 'low');
  }

  const limited = filtered.length > limit;
  const results = filtered.slice(0, limit);
  const showingFallback = results.length > 0 && results.every((result) => result.confidence === 'low');

  return {
    query,
    results,
    totalMatches: filtered.length,
    limited,
    showingFallback,
  };
}
