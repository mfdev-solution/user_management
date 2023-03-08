import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactDOM from 'react-dom/client';
import App from './App';
import Layout from './pages/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App >
      <Layout/>
    </App>
  </React.StrictMode>
);

