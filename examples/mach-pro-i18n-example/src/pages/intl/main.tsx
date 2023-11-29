import * as React from 'react';
import { render } from 'react-dom';
import App from './index';
import zhHantHKTest from './zh-Hant-HK.test';
import formatNumberZH_HK from './format-number.zh-HK.test';

render(<App />, document.body);

zhHantHKTest();
formatNumberZH_HK();