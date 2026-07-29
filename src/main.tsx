import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {DemoDay} from './demo-day/DemoDay.tsx';
import './index.css';

// La app no usa router (ver AGENTS.md §5). La presentación del Demo Day es la
// única vista fuera del flujo principal, así que se resuelve por pathname:
// `/demo-day` renderiza la presentación; cualquier otra ruta, la app de siempre.
const isDemoDay = window.location.pathname.replace(/\/+$/, '') === '/demo-day';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isDemoDay ? <DemoDay /> : <App />}
  </StrictMode>,
);
