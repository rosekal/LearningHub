export function clampValue(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

interface InterpolateByWidthOptions {
  width: number;
  minValue: number;
  maxValue: number;
  minWidth?: number;
  maxWidth?: number;
}

export function interpolateByWidth({
  width,
  minValue,
  maxValue,
  minWidth = 320,
  maxWidth = 768,
}: InterpolateByWidthOptions) {
  const boundedWidth = clampValue(width, minWidth, maxWidth);
  const progress = (boundedWidth - minWidth) / (maxWidth - minWidth);

  return minValue + (maxValue - minValue) * progress;
}
