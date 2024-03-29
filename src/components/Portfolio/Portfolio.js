import React, { useState, useEffect } from 'react';
import PortfolioForm from '../PortfolioForm/PortfolioForm';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { firestore, auth } from '../../utils/firebase.config';
import './Portfolio.css';

export default function Portfolio({ stocks, setStocks }) {
	const [inputVisibility, setInputVisibility] = useState(false);

	useEffect(() => {
		const fetchPortfolio = async () => {
			try {
				const userId = auth.currentUser.uid;
				const portfolioSnapshot = await getDocs(
					collection(firestore, `users/${userId}/stocks`)
				);
				const portfolioData = portfolioSnapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				}));
				setStocks(portfolioData);
			} catch (error) {
				console.error('Error fetching portfolio:', error);
			}
		};

		fetchPortfolio();

		return () => {};
	}, [setStocks]);

	const handleRemoveStock = async stockId => {
		try {
			const userId = auth.currentUser.uid;
			await deleteDoc(doc(firestore, `users/${userId}/stocks`, stockId));
			setStocks(stocks.filter(s => s.id !== stockId));
		} catch (error) {
			console.error('Error removing stock:', error);
		}
	};

	const toggleChartVisibility = stockId => {
		setVisibleChartId(visibleChartId === stockId ? null : stockId);
	};

	return (
		<>
			<div className="portfolio-page">
				<div className="portfolio-main-row-wrapper">
					<div className="portfolio-main-row">Stock</div>
					<div className="portfolio-main-row">Position</div>
					<div className="portfolio-main-row">Quantity</div>
					<div className="portfolio-main-row">Price</div>
				</div>
				{stocks.map(stock => (
					<div className="portfolio-row-wrapper" key={stock.id}>
						<div className="portfolio-row">{stock.ticker}</div>
						<div className="portfolio-row">{stock.position}</div>
						<div className="portfolio-row">{stock.quantity}</div>
						<div className="portfolio-row">{stock.price}</div>
						<button
							className="button button-remove"
							onClick={() => handleRemoveStock(stock.id)}
						>
							Remove
						</button>
					</div>
				))}
				{inputVisibility && (
					<PortfolioForm
						setStocks={setStocks}
						setInputVisibility={setInputVisibility}
					/>
				)}
				<button
					className="button button-add"
					onClick={() => setInputVisibility(!inputVisibility)}
				>
					<span>ADD NEW STOCK</span>
				</button>
			</div>
		</>
	);
}
