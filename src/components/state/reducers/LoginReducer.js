const initialState = {
    error: false,
    logged: false
};

export const LoginAction = {
    'SET_LOGGED_USER_ERROR': 'SET_LOGGED_USER_ERROR',
    'SET_LOGGED_USER': 'SET_LOGGED_USER',
    'SET_LOGOUT_USER': 'SET_LOGOUT_USER'
};

export const LoginReducer = (state = initialState, action) => {
    switch(action.type) {
        case LoginAction.SET_LOGGED_USER_ERROR:
            return Object.assign({}, state, {
                error: true,
                logged: false
            });
        case LoginAction.SET_LOGGED_USER:
            return Object.assign({}, state, {
                error: false,
                logged: action.logged
            });
        case LoginAction.SET_LOGOUT_USER:
            return Object.assign({}, state, {
                error: false,
                logged: false
            });            
        default:
            return state;
    }
};