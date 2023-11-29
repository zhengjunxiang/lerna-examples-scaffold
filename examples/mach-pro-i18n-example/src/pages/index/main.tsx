/* eslint-disable max-len */
import * as React from 'react';
import { render } from 'react-dom';
import { I18nextProvider } from '@sailor/i18n-mach-pro';
import App from './index';
import i18nClient from './i18n.config';

render(
  <I18nextProvider i18n={i18nClient}>
    <App />
  </I18nextProvider>,
  document.body,
);
