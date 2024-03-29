import React, { useState } from 'react';
import { collection, addDoc, doc } from 'firebase/firestore';
import { firestore, auth } from '../../utils/firebase.config'; // Import the firestore and auth instances
import './PortfolioForm.css';

// Initial state of our form
const INITIAL_STATE = {
	ticker: '',
	position: 'BUY',
	quantity: 10,
	price: 50,
};

export default function PortfolioForm({ setStocks, setInputVisibility }) {
	const [formValues, setFormValues] = useState(INITIAL_STATE);

	const handleChange = event => {
		setFormValues(formValues => ({
			...formValues,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSubmitNewStock = async e => {
		e.preventDefault();
		try {
			if (
				formValues.ticker &&
				formValues.price > 0 &&
				formValues.quantity > 0
			) {
				const newStock = {
					ticker: formValues.ticker,
					position: formValues.position,
					quantity: formValues.quantity,
					price: formValues.price,
				};

				const userId = auth.currentUser.uid;

				const docRef = await addDoc(
					collection(firestore, `users/${userId}/stocks`),
					newStock
				);

				setStocks(stocks => [
					...stocks,
					{ id: docRef.id, ...newStock },
				]);
				setFormValues(INITIAL_STATE);
				setInputVisibility(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="add-more-wrapper">
			<form className="add-more-form">
				<div className="add-more-row">
					<input
						type="text"
						name="ticker"
						value={formValues.ticker}
						onChange={handleChange}
					/>
				</div>
				<div className="add-more-row">
					<select
						name="position"
						onChange={handleChange}
						value={formValues.position}
					>
						<option value="BUY">BUY</option>
						<option value="SELL">SELL</option>
					</select>
				</div>
				<div className="add-more-row">
					<input
						type="number"
						name="quantity"
						min="0"
						value={formValues.quantity}
						onChange={handleChange}
					/>
				</div>
				<div className="add-more-row">
					<input
						type="number"
						name="price"
						min="0"
						value={formValues.price}
						onChange={handleChange}
					/>
				</div>
				<button
					className="add-new-stock-button"
					onClick={handleSubmitNewStock}
				>
					<span>+</span>
				</button>
			</form>
		</div>
	);
}
