import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import FaceDetection from './components/FaceDetection';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <FaceDetection /> */}
  </React.StrictMode>
);
