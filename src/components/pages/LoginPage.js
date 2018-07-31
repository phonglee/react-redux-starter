// IMPORT PACKAGE REFERENCES

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {login} from '../../services/LoginService';
import { connect } from 'react-redux';

// COMPONENT
class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error:''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentWillMount() {
        console.log(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const {username, password} = this.state;
        const history = this.props.history;
        login(username, password)
            .then(() => {
                console.log('Login successfull');
                history.push('/dashboard');
            }, (error) => {
                console.log(error);                
            });
    }

    render() {
        return (
            <form className="form-signin" onSubmit={this.onSubmit}>
                <h2 className="h4 mb-4 font-weight-normal">Login to Your Account</h2>
                <input type="text" onChange={this.onChange} value={this.state.username} name='username' className="form-control input-space" placeholder="Username" required autoFocus />
                <input type="password" onChange={this.onChange} value={this.state.password} name='password' className="form-control input-space" placeholder="Password" required/>
                <button className="btn btn-lg btn-primary btn-block button-blue" type="submit">Login</button>
                {this.props.error && <p>Invalid username or password</p>}
            </form>
        );
    }
}

LoginPage.propTypes = {
    logged: PropTypes.bool,
    error: PropTypes.bool,
    history: PropTypes.object,
    push: PropTypes.func
};

const mapStateToProps = state => {
    return {
        error: state.LoginReducer.error,
        logged: state.LoginReducer.logged
    };
};

const hoc = connect(mapStateToProps)(LoginPage);


// EXPORT COMPONENT
export { hoc as LoginPage };
