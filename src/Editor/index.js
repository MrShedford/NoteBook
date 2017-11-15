import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NoteBookEditor from './NoteBookEditor';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<NoteBookEditor />, document.getElementById('root'));
registerServiceWorker();
