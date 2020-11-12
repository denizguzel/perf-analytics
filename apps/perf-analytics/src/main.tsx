import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import { environment } from './environments/environment';
import { captureWebVitals } from '@perf-analytics/analytics';
import './styles.scss';
import { Provider } from 'use-http';

if (environment.webVitalsEnabled) {
  captureWebVitals({
    apiURL: `${environment.api}/vitals`,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider options={{ responseType: 'json' }}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
