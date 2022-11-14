import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(true);
    const loginStatus=localStorage.getItem('loginStatus')
    useEffect(()=> {
        
        if(loginStatus){
            navigate('/home');
        }
    
    })
    const auth = ()=> {
        if(username==='admin'&&password==='12345'){
            localStorage.setItem('loginStatus', true)
            setError(true)
        }
        setError(false)
    }
    return (
        <div className='main-background'>
            <div className='form-container'>
                <span>Welcome to Fruit list 😋</span>
                <p>Please login to go to home page !!!</p>
                {!error && <p>Invalid credentials !!!</p>}
                <form>
                    <input value={username} type='text' onChange={(e)=>setUsername(e.target.value)} placeholder='Username'></input>
                    <input value={password} type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Password'></input>
                    <button onClick={auth}>Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;