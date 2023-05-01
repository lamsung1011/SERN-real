import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
    }


    render() {


        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input className='form-control' type='text' placeholder='Enter your Username' />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <input className='form-control' type='password' placeholder='Enter your Password' />
                        </div >
                        <div className='col-12 '>
                            <button className='login-btn'>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-pass'>Forgot you password?</span>
                        </div>
                        <div className='col-12 mt-3 text-center'>
                            <span className=' login-other'>Or login with:</span>
                        </div>
                        <div className='col-12 login-social'>
                            <i className='fab fa-google-plus-g google'></i>
                            <i className='fab fa-facebook-f facebook'></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
