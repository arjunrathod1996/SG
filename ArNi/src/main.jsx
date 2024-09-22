import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import App from './App';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';


// import './components/jsFiles/dark-mode';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
