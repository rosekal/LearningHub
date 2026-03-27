export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function formatReadingTime(minutes: number) {
  return `${minutes} min read`;
}

export function formatQuizScore(score: number, total: number) {
  return `${score}/${total}`;
}

export function titleCase(value: string) {
  return value
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
