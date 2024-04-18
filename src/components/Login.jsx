import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signIn = async (event) => { 
        event.preventDefault();
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in user:' , userCredential.user);
            navigate('/');
            setLoading(false);
        } catch (error) {
            console.error('Login error:', error.message);
            setError('error.message');
        }
};                     

return (
    <div>
        <form onSubmit={signIn}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={signIn}>Sign In</button>
            {error && <p className='text-red-500'>{error}</p>}
        </form>
    </div>
)}