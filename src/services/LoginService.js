import { store } from '../components/state/stores/AppStore';
import {LoginAction} from '../components/state/reducers/LoginReducer';

export const getLoggedUser = () => {
    setTimeout(() => {
        store.dispatch({
            type: LoginAction.GET_LOGGED_USER
        });
    }, 500);
};

export const login = (username, password) => {
    return new Promise((resolve, reject) => {
        if (username === 'admin' && password === 'admin') {
            setTimeout(() => {
                store.dispatch({
                    type: LoginAction.SET_LOGGED_USER,
                    logged: true
                });
                resolve();
            } ,500);
        } else {
            setTimeout(() => {
                store.dispatch({
                    type: LoginAction.SET_LOGGED_USER_ERROR
                });
                reject(new Error('Invalid username or password'));
            } ,500);
        }
        
    });
};

export const logout = () => {
    store.dispatch({
        type: LoginAction.SET_LOGOUT_USER
    });
};