export interface AnalyticsConfig {
  apiURL: string;
  disabled?: boolean;
}

export interface PerformancePaintTiming extends PerformanceEntry {}

export interface PerformanceEventTiming extends PerformanceEntry {
  cancelable: boolean;
  processingEnd: number;
  processingStart: number;
  target: HTMLElement;
}

export interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

export interface LargestContentfulPaint extends PerformanceEntry {
  element: HTMLElement;
  id: string;
  loadTime: number;
  renderTime: number;
  size: number;
  url: string;
}

export type PerformanceEntries = LargestContentfulPaint &
  LayoutShift &
  PerformanceEntry &
  PerformanceEventTiming &
  PerformanceNavigationTiming &
  PerformancePaintTiming &
  PerformanceResourceTiming;
