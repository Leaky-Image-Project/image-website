// I watched this tutorial to create the source code of this Login Screen: https://www.youtube.com/watch?v=X3qyxo_UTR4&ab_channel=DaveGray

import { useState, useEffect, useContext, useRef } from 'react';
import AuCon from "./AuProv";
import FileUpload from './FileUpload';

import axios from 'axios';

const LOGIN_URL = 'http://localhost:3030/auth/login';

const LoginScreen = () => {

    const { setAuth } = useContext(AuCon); 
    const errorRef = useRef();

    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErrorMessage('');
    }, [userName, passWord])

    const Submit = async (e) => {
        e.preventDefault();

        try {
            // This section is directly taken from the video with variable name changes
            const resp = await axios.post(LOGIN_URL, JSON.stringify({ username: userName, password: passWord}), {headers: { 'Content-Type': 'application/json' }});
            const token = resp?.data?.token;
            const role = resp?.data?.role;
            setAuth({ userName, passWord, role, token });
            setSuccess(true);
            
        } catch (e) {
            setErrorMessage('Login Failed');
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <FileUpload />
                </section>
            ) : (
                <section>
                    {/* this section for the error message is directly taken from the video */}
                    <p ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"}>{errorMessage}</p>
                    <h1>Sign In Here</h1>
                    <form onSubmit={Submit}>
                        <label>Username:</label>
                        <input
                            onChange={(e) => setUserName(e.target.value)}
                            value={userName}
                            required
                        />

                        <label>Password:</label>
                        <input
                            type="password"
                            onChange={(e) => setPassWord(e.target.value)}
                            value={passWord}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                </section>
            )}
        </>
    )
}

export default LoginScreen;

