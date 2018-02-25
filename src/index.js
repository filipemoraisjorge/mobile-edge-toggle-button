import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import App from './App';
import AppGrid from './DemoApps/Grid/AppGrid';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppGrid />, document.getElementById('root'));
registerServiceWorker();
