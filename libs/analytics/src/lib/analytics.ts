import { AnalyticsConfig, LayoutShift, PerformanceEntries } from './typings';
import { afterDocumentLoad, isIE, report, reportPageLoadEvents } from './utils';
import { buildWebVital, getTTFB, isValidated } from './performance.utils';
import { PerformanceMetrics } from './enums';
import { PerformanceEntryTypes } from './constants';

let isRegistered = false;

export function captureWebVitals(config: AnalyticsConfig) {
  const { disabled, apiURL } = config;

  if (disabled || isIE() || isRegistered) return;

  isRegistered = true;

  if (isValidated) {
    afterDocumentLoad(() => {
      const entry = getTTFB();
      report(apiURL, buildWebVital(entry as PerformanceEntries, 'TTFB'));
    });

    const observer = new PerformanceObserver((entries: PerformanceObserverEntryList) => {
      entries.getEntries().forEach((entry: PerformanceEntry) => {
        switch (entry.entryType) {
          case 'resource':
            const { name } = entry as PerformanceResourceTiming;
            if (!name.includes(apiURL)) {
              report(apiURL, buildWebVital(entry as PerformanceEntries, PerformanceMetrics.RESOURCE));
            }
            break;
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              report(apiURL, buildWebVital(entry as PerformanceEntries, PerformanceMetrics.FCP));
            }
            break;
          case 'first-input':
            report(apiURL, buildWebVital(entry as PerformanceEntries, PerformanceMetrics.FID));
            break;
          case 'navigation':
            report(apiURL, buildWebVital(entry as PerformanceEntries, PerformanceMetrics.NAVIGATION));
            break;
          case 'largest-contentful-paint':
            report(apiURL, buildWebVital(entry as PerformanceEntries, PerformanceMetrics.LCP));
            break;
          case 'layout-shift':
            const { hadRecentInput } = entry as LayoutShift;
            if (!hadRecentInput) {
              report(apiURL, buildWebVital(entry as PerformanceEntries, PerformanceMetrics.CLS));
            }
            break;
        }
      });
    });
    observer.observe({
      entryTypes: PerformanceEntryTypes,
    });
  }

  if (window !== undefined) {
    window.addEventListener('DOMContentLoaded', (event: Event) => {
      reportPageLoadEvents(apiURL, event, 'domload');
    });

    window.addEventListener('load', (event) => {
      reportPageLoadEvents(apiURL, event, 'pageload');
    });
  }
}
