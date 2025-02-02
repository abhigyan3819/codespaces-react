import React, { useState } from 'react';
import "./register.css";

const Register = () => {
  const [IsLogin, setIsLogin] = useState(false);

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
              <form>
                <input type="text" name="email" placeholder='Enter your email'/>
                <input type="password" name='password' placeholder='Enter your password'/>
                <button type='submit'>Login</button>
              </form>
            </div>
          ) : (
            <div>
              <form>
                <input type="text" name='username' placeholder='Enter your username' />
                <input type="email" name='email' placeholder='Enter your email' />
                <input type="password" name='password' placeholder='Enter your password' />
                <button type="submit">Sign In</button>
              </form>
            </div>
          )}
        </div>
    </div>
  );
}

export default Register;
