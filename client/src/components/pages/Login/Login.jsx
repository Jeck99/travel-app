import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginProfile } from "../../../redux/actions/authActions";
import { withRouter } from 'react-router';

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.history.push("/home");
        }
    })
    const onEmailChange = e => {
        setEmail(e.target.value);
    };
    const onPasswordChange = e => {
        setPassword(e.target.value);
    };
    const onSubmit = e => {
        e.preventDefault();
        const loginInfo = { email, password };
        props.loginUser(loginInfo, props.history);
    };
    return (
        <div className="container">
            <Link to="/">
                Back to home
            </Link>
            <div>
                <h4><b>Login</b> below</h4>
                <p className="grey-text text-darken-1">
                    Don't have an account?
                    <Link to="/register">Register</Link>
                </p>
            </div>
            <form noValidate onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    onChange={onEmailChange}
                    value={email}
                    error={errors.email}
                    id="email"
                    type="email"
                />
                <label htmlFor="password">Password</label>
                <input
                    onChange={onPasswordChange}
                    value={password}
                    error={errors.password}
                    id="password"
                    type="password"
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default withRouter(connect(mapStateToProps, { loginProfile })(Login));