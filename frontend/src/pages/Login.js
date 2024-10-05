import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';


function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        const {email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email, password are requir');
        }
        try {
            const url = "https://login-signup-mern-api-wheat.vercel.app/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const{success, message,jwtToken, name, error}=result;
            // if (response.status === 409) {
            //     return handleError('This email is already in use.');
            // }
            
             if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000);
            }

            else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }

            else if(!success){
                handleError(message);
            }


            console.log(result);

        } catch (err) {
            handleError(err)
        }
    }
    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                
                <div>
                    <label htmlFor='email'>Email</label>
                    <input onChange={handleChange} type='email' name='email' placeholder='Enter your email...'
                        value={loginInfo.email} />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input onChange={handleChange} type='password' name='password' placeholder='Enter your passwor...'
                        value={loginInfo.password} />
                </div>
                <button type='submit'>Login</button>
                <span>Does'n  have an account ?<Link to="/signup">signup</Link></span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login
