import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';

const container = document.getElementById('root');
const root = createRoot(container!);

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
root.render(app);
