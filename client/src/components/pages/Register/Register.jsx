import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { registerNewProfile } from "../../../redux/actions/authActions";
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
const Register = ({ history, auth }) => {
    const [firstName, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push("/home");
        }
    },[])
    const onNameChange = e => {
        setName(e.target.value);
    };
    const onLastNameChange = e => {
        setLastName(e.target.value);
    };
    const onEmailChange = e => {
        setEmail(e.target.value);
    };
    const onCountryChange = e => {
        setCountry(e.target.value);
    };
    const onPasswordChange = e => {
        setPassword(e.target.value);
    };
    const onPassword2Change = e => {
        setPassword2(e.target.value);
    };
    const onSubmit = e => {
        e.preventDefault();
        const newUser = { firstName, lastName, email, password, password2 }
        registerNewProfile(newUser, history);
    };
    return (
        <div className="container">
            <Link to="/"> Back to home</Link>
            <div>
                <h4><b>Register</b> below</h4>
                <p>
                    Already have an account? <Link to="/">Log in</Link>
                </p>
            </div>
            <form noValidate onSubmit={onSubmit}>
                <label htmlFor="name">First Name</label>
                <input
                    onChange={onNameChange}
                    value={firstName}
                    error={errors.firstName}
                    id="name"
                    type="text"
                />
                <label htmlFor="name">Last Name</label>
                <input
                    onChange={onLastNameChange}
                    value={lastName}
                    error={errors.lastName}
                    id="lastName"
                    type="text"
                />
                <label htmlFor="name">Country</label>
                <input
                    onChange={onCountryChange}
                    value={country}
                    id="country"
                    type="text"
                />
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
                <label htmlFor="password2">Confirm Password</label>
                <input
                    onChange={onPassword2Change}
                    value={password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                />
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
}
export default withRouter(connect(mapStateToProps, { registerNewProfile })(Register));