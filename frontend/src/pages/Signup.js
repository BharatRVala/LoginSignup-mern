/*import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';


function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }


    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email, password are requir');
        }
        try {
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const{success, message, error}=result;
            if (response.status === 409) {
                return handleError('This email is already in use.');
            }
            
            else if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
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
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input onChange={handleChange} type='text' name='name' autoFocus placeholder='Enter your name...'
                        value={signupInfo.name} />
                </div>

                <div>
                    <label htmlFor='email'>Email</label>
                    <input onChange={handleChange} type='email' name='email' placeholder='Enter your email...'
                        value={signupInfo.email} />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input onChange={handleChange} type='password' name='password' placeholder='Enter your passwor...'
                        value={signupInfo.password} />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account ?<Link to="/login">Login</Link></span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup

*/
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
// import './index.css'; 

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);  // Add loading state

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }

        try {
            setLoading(true);  // Set loading to true when submitting
            const url = "https://login-signup-mern-api-wheat.vercel.app/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            setLoading(false);  // Set loading to false after response

            if (response.status === 409) {
                return handleError('This email is already in use.');
            } else if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }

        } catch (err) {
            setLoading(false);  // Set loading to false in case of error
            handleError(err);
        }
    };

    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input onChange={handleChange} type='text' name='name' autoFocus placeholder='Enter your name...'
                        value={signupInfo.name} />
                </div>

                <div>
                    <label htmlFor='email'>Email</label>
                    <input onChange={handleChange} type='email' name='email' placeholder='Enter your email...'
                        value={signupInfo.email} />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input onChange={handleChange} type='password' name='password' placeholder='Enter your password...'
                        value={signupInfo.password} />
                </div>
                
                <button type='submit'>
                
                    Signup</button>
                 
            {loading && (
                    <div className="loading-spinner"></div>  // Replace with desired animation
                )}


                
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
            <ToastContainer />
           
            
        </div>
    );
}

export default Signup;

