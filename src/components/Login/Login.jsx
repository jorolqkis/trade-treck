import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom'; // Ensure this is your Firebase auth configuration
import './Login.css';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();
		const auth = getAuth();
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			alert('Logged in successfully!');
		} catch (error) {
			alert(error.message);
			console.log(error.message);
		}
	};

	return (
		<div className="login-container">
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder="Email"
					required
				/>
				<input
					type="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder="Password"
					required
				/>
				<button type="submit">Login</button>
			</form>

			<p>
				Don't have an account? <Link to="/register">Sign up</Link>
			</p>
		</div>
	);
}

export default Login;
