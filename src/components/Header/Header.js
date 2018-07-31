// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

// IMPORT PROJECT REFERENCES

import { fetchZipCodes } from '../state/actions/ZipCodeActions';
import {logout} from '../../services/LoginService';
import {editLayout} from '../../services/DashboardService';


// COMPONENT

class Header extends Component {

    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
        this.onEditLayout = this.onEditLayout.bind(this);
    }

    onLogout(e) {
        e.preventDefault();
        logout();
        this.props.history.push('/');
    }

    onEditLayout(e) {
        e.preventDefault();
        editLayout(!this.props.editLayout);
    }

    // componentWillMount() {
    //     console.log(this);
    // }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <i className="fab fa fa-universal-access fa-1x" style={{color: 'white'}}></i>
                <div className="collapse navbar-collapse" id="menu">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <div className="nav-link">
                                <NavLink to='/dashboard' activeClassName='menu selected' exact={true}>Dashboard</NavLink>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle button-blue" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-user"></i> Admin
                    </button>
                    <div className="dropdown-menu dropdown-box" aria-labelledby="dropdownMenuButton">                            
                        <a className="dropdown-item" href="#" onClick={this.onLogout}>Logout</a>
                        <a className="dropdown-item" href="#" onClick={this.onEditLayout}>
                            {this.props.editLayout && <span>View</span>}
                            {!this.props.editLayout && <span>Edit</span>}
                        </a>
                    </div>
                </div>             
            </nav>
        );
    }
}

Header.propTypes = {
    history: PropTypes.object,
    push: PropTypes.func,
    editLayout: PropTypes.bool
};

// CONFIGURE REACT REDUX

const mapStateToProps = state => {
    return {
        editLayout: state.DashboardReducer.editLayout
    };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchZipCodes }, dispatch)
);

const nav = connect(mapStateToProps, mapDispatchToProps)(Header);
//const nav = connect(mapDispatchToProps)(Header);


// EXPORT COMPONENT

export { nav as Header };