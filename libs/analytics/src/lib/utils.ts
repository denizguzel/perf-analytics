import { WebVitalPayload } from '@perf-analytics/api-interfaces';
import { buildWebVital } from './performance.utils';
import { PerformanceEntries } from './typings';

export const afterDocumentLoad = (callback: () => void) => {
  if (document.readyState === 'complete') {
    setTimeout(callback, 0);
  } else {
    window.addEventListener('pageshow', callback);
  }
};

export const isIE = () => {
  const ua = navigator.userAgent;
  /* MSIE used to detect old browsers and Trident used to newer ones*/
  return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
};

export const report = (url: string, vital: WebVitalPayload) => {
  fetch(url, {
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(vital),
    method: 'POST',
  }).catch(() => {
    // nothing
  });
};

export const reportPageLoadEvents = (url: string, event: Event, entryType: 'domload' | 'pageload') => {
  report(
    url,
    buildWebVital(
      {
        element: event.target as HTMLElement,
        startTime: event.timeStamp,
        entryType,
      } as PerformanceEntries,
      entryType.toUpperCase(),
    ),
  );
};
