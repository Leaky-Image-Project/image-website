// I watched this tutorial to create the source code of this Login Screen: https://www.youtube.com/watch?v=X3qyxo_UTR4&ab_channel=DaveGray

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuProv } from './AuProv';

ReactDOM.render(
  <React.StrictMode>
    <AuProv>
      <App />
    </AuProv>
  </React.StrictMode>,
  document.getElementById('root')
);