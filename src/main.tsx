import { createRoot } from 'react-dom/client';
import { router } from './router';

import './index.css';

createRoot(document.getElementById('root')!).render(router());
