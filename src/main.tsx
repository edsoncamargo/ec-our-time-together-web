import './_main.scss';

import Root from './root';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <em className='ec-pattern ec-pattern--noise'></em>
    <Root />
  </StrictMode>
);
