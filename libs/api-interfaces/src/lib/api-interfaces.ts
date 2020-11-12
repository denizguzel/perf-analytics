export type WebVitalPayload = {
  startTime: number;
  type: 'navigation' | 'resource' | 'domload' | 'pageload' | string;
  shortCode: string;
} & Partial<{
  decodedBodySize: number;
  duration: number;
  elementTagName: string;
  elementClasses: string;
  elementId: string;
  encodedBodySize: number;
  initiatorType: string;
  name: string;
  transferSize: number;
}>;
