import * as React from 'react';
import { createRoot } from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { l10nClient } from '@sailor/l10n-web';
import App from './App';

l10nClient.init({
  systemRegion: 'HK',
  systemLocale: 'zh-HK',
  systemTimeZone: 'GMT+08:00',
  appToken: 517,
  isDev: true
}, (result, errorInfo) => {
  if (!result) {
    console.log('errorInfo?.error', errorInfo?.error);
  }
  const root = createRoot(document.getElementById('app') as Element);
  root.render(<App />);
});
