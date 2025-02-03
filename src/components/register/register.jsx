import React, { useState } from 'react';
import "./register.css";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../backend/firebase';

const Register = () => {
  const [IsLogin, setIsLogin] = useState(false);
  const [IsRegistering, setIsRegistering] = useState(false)

  const handleLogin =(e)=>{
    e.preventDefault();
    toast.success("Login")
  }
  const handleSignin = async (e) => {
    e.preventDefault();
    setIsRegistering(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account successfully created!");
    } catch (err) {
        const errorMessage = formatFirebaseError(err.message);
        toast.error(errorMessage);
    }

    setIsRegistering(false);
};
const formatFirebaseError = (error) => {
    const errorMessages = {
        "auth/email-already-in-use": "This email is already registered.",
        "auth/invalid-email": "Invalid email format.",
        "auth/weak-password": "Password must be at least 6 characters long.",
        "auth/missing-password": "Please enter a password.",
        "auth/internal-error": "An internal error occurred. Try again.",
    };

    return errorMessages[error] || "An error occurred. Please try again.";
};

  return (
    <div className='container'>
        <div className="login">
          <div className="switcher">
            <button 
              className={IsLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >Login</button>
            <button 
              className={!IsLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >Sign In</button>
          </div>

          <div className="title">{IsLogin ? "Login" : "Sign in"}</div>

          {IsLogin ? (
            <div>
              <form onSubmit={handleLogin}>
                <input type="text" name="email" placeholder='Enter your email' required/>
                <input type="password" name='password' placeholder='Enter your password' required/>
                <button type='submit' disabled={IsRegistering} >Login</button>
              </form>
            </div>
          ) : (
            <div>
              <form onSubmit={handleSignin}>
                <input type="text" name='username' placeholder='Enter your username' />
                <input type="email" name='email' placeholder='Enter your email' required/>
                <input type="password" name='password' placeholder='Enter your password' required/>
                <button type="submit" disabled={IsRegistering}>Sign In</button>
              </form>
            </div>
          )}
        </div>
    </div>
  );
}

export default Register;
