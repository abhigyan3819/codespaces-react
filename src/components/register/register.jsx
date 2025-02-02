import React, { useState } from 'react';
import './register.css';

const Register = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="container">
      <div className="login">
        <div className="title">{isLogin ? "Login" : "Sign Up"}</div>
        {isLogin ? (
          <div className="form-box">
            <form>
              <input type="text" name="email" placeholder="Enter your email" />
              <input type="password" name="password" placeholder="Enter your password" />
              <button type="submit">Login</button>
            </form>
            <span>Don't have an account?</span>
            <button className="create-btn" onClick={() => setIsLogin(false)}>Create an account</button>
          </div>
        ) : (
          <div className="form-box">
            <form>
              <input type="text" name="username" placeholder="Enter your username" />
              <input type="email" name="email" placeholder="Enter your email" />
              <input type="password" name="password" placeholder="Enter your password" />
              <button type="submit">Sign Up</button>
            </form>
            <span>Already have an account?</span>
            <button className="create-btn" onClick={() => setIsLogin(true)}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
