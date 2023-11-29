import * as React from 'react';
import { createRoot } from 'react-dom/client';
// import { Hello } from './components/Hello';
import App from './App';

const root = createRoot(document.getElementById('app') as Element);
root.render(<App />);