import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import KMap from "./components/Pages";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <KMap/>
    </React.StrictMode>
);
