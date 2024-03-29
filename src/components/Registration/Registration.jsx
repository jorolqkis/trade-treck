import React, { useState } from 'react';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import './Registration.css';
function Registration() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState(''); // Added username state

	const handleSubmit = async e => {
		e.preventDefault();
		const auth = getAuth();
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			await updateProfile(userCredential.user, {
				displayName: username,
			});
			alert('User registered successfully!');
		} catch (error) {
			alert(error.message);
			console.log(error.message);
		}
	};

	return (
		<div className="register-container">
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={username}
					onChange={e => setUsername(e.target.value)}
					placeholder="Username"
					required
				/>
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
				<button type="submit">Register</button>
			</form>
		</div>
	);
}

export default Registration;
