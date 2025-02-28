import { createRoot } from 'react-dom/client'

import { router } from './routes/router';

import './index.css'

createRoot(document.getElementById('root')!).render(router());
