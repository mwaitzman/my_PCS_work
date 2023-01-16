import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const app = new App();

// console.log(app.render());
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
