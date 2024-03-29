import { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
	Link,
} from 'react-router-dom';
import { auth, signOut } from './utils/firebase.config';

import Portfolio from './components/Portfolio/Portfolio';
import PortfolioMonitor from './components/PortfolioMonitor/PortfolioMonitor';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

import './App.css';

function App() {
	const [stocks, setStocks] = useState([]);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(setUser);
		return unsubscribe;
	}, []);

	const handleLogout = async () => {
		try {
			await signOut(auth);
			alert('Logged out successfully!');
		} catch (error) {
			console.error('Logout Error:', error);
		}
	};

	return (
		<Router>
			<div className="App">
				<header>
					<div className="logo-container">
						<div className="logo"></div>
						<h1>Trade Treck</h1>
					</div>
					<nav>
						{user ? (
							<>
								<Link to="/" className="nav-link">
									Edit Portfolio
								</Link>
								<Link
									to="/portfolio-monitor"
									className="nav-link"
								>
									View Portfolio
								</Link>
								<button
									className="button logout-button"
									onClick={handleLogout}
								>
									Logout
								</button>
								<span className="user-credentials">{`Logged in as ${user.displayName || user.email}`}</span>
							</>
						) : (
							<Link to="/login" className="nav-link">
								Login
							</Link>
						)}
					</nav>
				</header>
				<Routes>
					<Route
						path="/login"
						element={
							!user ? <Login /> : <Navigate replace to="/" />
						}
					/>
					<Route
						path="/register"
						element={
							!user ? (
								<Registration />
							) : (
								<Navigate replace to="/" />
							)
						}
					/>
					<Route
						path="/"
						element={
							user ? (
								<Portfolio
									stocks={stocks}
									setStocks={setStocks}
								/>
							) : (
								<Navigate replace to="/login" />
							)
						}
					/>
					<Route
						path="/portfolio-monitor"
						element={
							user ? (
								<PortfolioMonitor
									stocks={stocks}
									setStocks={setStocks}
								/>
							) : (
								<Navigate replace to="/login" />
							)
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
