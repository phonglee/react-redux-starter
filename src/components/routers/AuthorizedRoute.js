import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoggedUser } from '../../services/LoginService';

class AuthorizedRoute extends React.Component {

    componentWillMount() {
        getLoggedUser();
    }

    render() {
        const { component: Component, pending, logged, ...rest } = this.props;

        return (
            <Route {...rest} render={props => {
                if (pending) 
                    return <div>Loading...</div>;
                return logged ? <Component {...props} /> : <Redirect to="/auth/login" />;
          }} />
        )
    }
}

const stateToProps = ({ LoginReducer }) => ({
  pending: LoginReducer.pending,
  logged: LoginReducer.logged
});

export default connect(stateToProps)(AuthorizedRoute);
