import { Close } from '@material-ui/icons';
import React, { useState } from 'react';
import firebase from './../../Firebase';

const LoginSignup = (props) => {
    const { showDialog, hideDialog, setIsLoading, hasAccount, setHasAccount } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confPasswordError, setConfPasswordError] = useState('');

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
        setConfPasswordError('');
    }

    const clearInputs = () => {
        setEmail('');
        setPassword('');
        setConfPassword('');
    }

    const handleLogin = () => {
        clearErrors();
        setIsLoading(true);
        firebase
            .auth()
            .signInWithEmailAndPassword(email.trim(), password.trim())
            .then(user => {
                setIsLoading(false);
                hideDialog();
                clearErrors();
                clearInputs();
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

    const handleSignup = () => {
        clearErrors();
        setIsLoading(true);
        firebase
            .auth()
            .createUserWithEmailAndPassword(email.trim(), password.trim())
            .then(user => {
                handleLogin();
                hideDialog();
                clearErrors();
                clearInputs();
            })
            .catch((err) => {
                setIsLoading(false);

                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                }
            });
    };

    const verifyFields = () => {
        clearErrors();

        if (email.trim().length == 0)
            setEmailError("Please enter Email");
        else if (password.trim().length == 0)
            setPasswordError("Please enter Password");

        // No error in the fields
        else if (!hasAccount) {
            if (confirmPassword.trim().length == 0)
                setConfPasswordError("Please enter confirm Password");
            else if (confirmPassword !== password)
                setConfPasswordError("Confirm Password and Password must match");
            else
                handleSignup();
        }
        else handleLogin();

    }

    return (
        <section className="login" style={{ display: showDialog ? "flex" : "none" }}>
            <button id="close" onClick={() => hideDialog()}>
                <Close fontSize="large" />
            </button>

            <div className="loginContainer">
                <label>Username</label>
                <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                <p className="errorMsg">{emailError}</p>

                <label>Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <p className="errorMsg">{passwordError}</p>

                <div style={{ display: hasAccount ? "none" : "block" }}>
                    <label>Confirm Password</label>
                    <input type="password" required value={confirmPassword} onChange={(e) => setConfPassword(e.target.value)} />
                    <p className="errorMsg">{confPasswordError}</p>
                </div>

                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                            <button onClick={verifyFields}>Sign In</button>
                            <p>Don't have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span></p>
                        </>
                    ) : (
                            <>
                                <button onClick={verifyFields}>Sign Up</button>
                                <p>Have an account already? <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span></p>
                            </>
                        )}
                </div>
            </div>
        </section>
    )
};

export default LoginSignup;