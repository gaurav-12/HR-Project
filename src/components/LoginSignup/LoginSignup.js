import { Close } from '@material-ui/icons';
import React, { useState } from 'react';
import firebase from './../../Firebase';

const LoginSignup = ({ showDialog, hideDialog, setIsLoading, getUserType }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }

    const handleLogin = () => {
        clearErrors();
        setIsLoading(true);
        firebase
            .auth()
            .signInWithEmailAndPassword(email.trim(), password.trim())
            .then(user => {
                getUserType(user.user.uid)
                    .then(() => {
                        setIsLoading(false);
                        hideDialog();
                        clearErrors();
                        clearInputs();
                    })
            })
            .catch((err) => {
                setIsLoading(false);

                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    const verifyFields = () => {
        clearErrors();

        if (email.trim().length === 0)
            setEmailError("Please enter Email");
        else if (password.trim().length === 0)
            setPasswordError("Please enter Password");
        else handleLogin();

    }

    return (
        <section className="login" style={{ display: showDialog ? "flex" : "none" }}>
            <button className="close" onClick={() => hideDialog()}>
                <Close fontSize="large" />
            </button>

            <div className="loginContainer">
                <label>Username</label>
                <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                <p className="errorMsg">{emailError}</p>

                <label>Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <p className="errorMsg">{passwordError}</p>

                <button onClick={verifyFields}>Sign In</button>
            </div>
        </section>
    )
};

export default LoginSignup;