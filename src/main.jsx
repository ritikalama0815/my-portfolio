/**
 * Application entry: mounts {@link App} into `#root` and loads global CSS.
 */
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
