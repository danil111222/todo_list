import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store';
import {createRoot} from "react-dom/client";

const store = configureStore();

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
