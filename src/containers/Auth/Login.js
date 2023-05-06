import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }
    handleOnchangeInput = (event) => {
        this.setState({
            userName: event.target.value
        })
    }

    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.userName, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }


    render() {


        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Enter your Username'
                                value={this.state.userName}
                                onChange={(event) => this.handleOnchangeInput(event)} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input
                                    className='form-control'
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder='Enter your Password'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnchangePassword(event)}
                                />
                                <span onClick={() => { this.handleShowHidePassword() }}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div >
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 '>
                            <button className='login-btn' onClick={() => { this.handleLogin() }}>Login</button>
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
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
