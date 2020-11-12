import { WebVitalPayload } from '@perf-analytics/api-interfaces';
import { PerformanceEntries } from './typings';

const isPerformanceObserverSupported = 'PerformanceObserver' in window && typeof PerformanceObserver === 'function';

const isTimingsSupported = PerformanceObserver.supportedEntryTypes.includes('navigation');

export const isValidated = isPerformanceObserverSupported && isTimingsSupported;

const getNavigationEntryFromPerformanceTiming = () => {
  const timing = performance.timing;

  const navigationEntry = {
    entryType: 'navigation',
    startTime: 0,
  };

  for (const key in timing) {
    if (key !== 'navigationStart' && key !== 'toJSON') {
      navigationEntry[key] = Math.max(timing[key] - timing.navigationStart, 0);
    }
  }
  return navigationEntry as PerformanceNavigationTiming;
};

// Time to first byte
export const getTTFB = () => {
  try {
    return (performance.getEntriesByType('navigation')[0] ||
      getNavigationEntryFromPerformanceTiming()) as PerformanceNavigationTiming;
  } catch {
    // nothing
  }
};

const getPerformanceEntry = (entry: PerformanceEntry) =>
  ({
    duration: entry.duration,
    name: entry.name,
    startTime: entry.startTime,
    type: entry['initiatorType'] || entry.entryType || entry['type'],
  } as WebVitalPayload);

export const buildWebVital: (entry: PerformanceEntries, shortCode: string) => WebVitalPayload = (
  entry: PerformanceEntries,
  shortCode: string,
) => {
  switch (entry.entryType) {
    case 'navigation':
    case 'resource':
      return {
        ...getPerformanceEntry(entry),
        initiatorType: entry.initiatorType,
        decodedBodySize: entry.decodedBodySize,
        encodedBodySize: entry.encodedBodySize,
        transferSize: entry.transferSize,
        shortCode,
      };
    case 'first-input':
    case 'layout-shift':
    case 'paint':
      return {
        ...getPerformanceEntry(entry),
        shortCode,
      };
    case 'domload':
    case 'largest-contentful-paint':
    case 'pageload':
      return {
        ...getPerformanceEntry(entry),
        elementClasses: entry.element.className,
        elementId: entry.element.id,
        elementTagName: entry.element.tagName || entry.element.nodeName,
        shortCode,
      };
  }
};
