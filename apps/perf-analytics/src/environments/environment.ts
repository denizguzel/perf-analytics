// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  webVitalsEnabled: true,
  api: 'http://localhost:3333',
};
