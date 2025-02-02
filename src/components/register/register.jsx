import React, { useState } from 'react'
import "./register.css"

const Register = () => {
  const [IsLogin, setIsLogin] = useState(false)
  return (
    <div className='container'>
        <div className="login">
            <div className="title">{IsLogin ? "Login" : "Sign in"}</div>
            {IsLogin ?
            <div>
            <form>
                <input type="text" name="email" placeholder='Enter your email'/>
                <input type="password" name='password' placeholder='Enter your password'/>
                <button type='submit'>Login</button>
            </form>
            <span>Don't have an account ? </span><button className='create-btn'>create an account</button>
            </div>
            :
            <div>
            <form>
              <input type="text" name='username' placeholder='Enter your username' />
              <input type="email" name='email' placeholder='Enter your email' />
              <input type="password" name='password' placeholder='Enter your password' />

              <button type="submit">Sign In</button>
            </form>
            <span>Already have an account ? </span><button className='create-btn'>Login</button>
            </div>
            }
        </div>
    </div>
  )
}

export default Register