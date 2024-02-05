import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from "@sentry/react";
import KMap from "./components/Pages";
import {BrowserTracing} from "@sentry/tracing";

// Sentry.init({
//     dsn: "https://ecce49a2c4f64c799c27fc188bbfe12a@o4504525747781632.ingest.sentry.io/4504526065762304",
//     integrations: [new BrowserTracing()],
//     tracesSampleRate: 1.0,
// });

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <KMap/>
);
