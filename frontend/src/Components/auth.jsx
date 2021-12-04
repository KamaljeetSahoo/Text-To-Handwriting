import React from 'react';
// import GoogleLogin from 'react-google-login';
import './css/auth.css';

export default class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.clientId = '423352380083-s7bj30u7rr63lc4hhehutapaqlt3auar.apps.googleusercontent.com';
        this.state = {
            signUpActive: false
        };
    }

    responseGoogle = (response) => {
        console.log(response);
    }

    render() {
        return(
            <div className="auth-div">
                {/* <GoogleLogin
                    clientId={this.clientId}
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                /> */}
                <div className={this.state.signUpActive ? "auth-container right-panel-active" : "auth-container"} id="container">
                    <div className="form-container sign-up-container">
                        <form className="auth-form" action="#">
                            <h1 className="auth-h1">Create Account</h1>
                            {/* <div className="social-container">
                                <a href={()=>false} className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href={()=>false} className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href={()=>false} className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your email for registration</span> */}
                            <input className="auth-input" type="text" placeholder="Name" />
                            <input className="auth-input" type="email" placeholder="Email" />
                            <input className="auth-input" type="password" placeholder="Password" />
                            <button className="auth-button">Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form className="auth-form" action="#">
                            <h1 className="auth-h1">Sign in</h1>
                            {/* <div className="social-container">
                                <a href={()=>false} className="social"><i className="fab fa-facebook-f"></i></a>
                                <a href={()=>false} className="social"><i className="fab fa-google-plus-g"></i></a>
                                <a href={()=>false} className="social"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your account</span> */}
                            <input className="auth-input" type="email" placeholder="Email" />
                            <input className="auth-input" type="password" placeholder="Password" />
                            <a className="auth-a" href={()=>false}>Forgot your password?</a>
                            <button className="auth-button">Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1 className="auth-h1">Welcome Back!</h1>
                                <p className="auth-p">To keep connected with us please login with your personal info</p>
                                <button className="ghost auth-button" id="signIn" onClick={()=>this.setState({signUpActive: false})} >Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1 className="auth-h1">Hello, Friend!</h1>
                                <p className="auth-p">Enter your personal details and start journey with us</p>
                                <button className="ghost auth-button" id="signUp" onClick={()=>this.setState({signUpActive: true})}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
