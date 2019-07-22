import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

// This images should be served on a CDN
import '../img/cap.png';
import '../img/mug.png';
import '../img/shirt.png';
import '../img/background.png';

ReactDOM.render(<App />, document.getElementById('root'));