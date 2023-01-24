import { createStore, compose } from 'redux';

import rootReducer from './reducers';

export default function configureStore() {

    const customCompose =
        process.env.NODE_ENV === 'development'
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
            : compose;

    const composedEnhancers = customCompose(...[]);

    return createStore(rootReducer, composedEnhancers);
}