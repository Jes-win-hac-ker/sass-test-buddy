
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Main.tsx loading...');
console.log('Base URL:', import.meta.env.BASE_URL);
console.log('Current location:', window.location.href);

const rootElement = document.getElementById("root");
console.log('Root element:', rootElement);

if (rootElement) {
  console.log('Creating React root...');
  createRoot(rootElement).render(<App />);
  console.log('React app rendered');
} else {
  console.error('Root element not found!');
}
