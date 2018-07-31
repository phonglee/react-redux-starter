// IMPORT PACKAGES

import React from 'react';
import { Provider } from 'react-redux';

// IMPORT STORE

import { store } from '../components/state/stores/AppStore';

// IMPORT COMPONENTS

import { AppRouter } from './routers/AppRouter';


// COMPONENT

export const App = () => (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);