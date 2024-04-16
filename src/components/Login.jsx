import React, { useState } from 'react';
import { auth } from '../firebase-config';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => { 
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            console.log('Logged in user:' , userCredential.user);
            setError('');
        } catch (error) {
            console.error('Login error:', error.message);
            setError('error.message');
        }
};

return (
    <div>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button onClick={signIn}>Sign In</button>
    </div>
)}