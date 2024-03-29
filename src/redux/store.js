import { configureStore } from '@reduxjs/toolkit';
import stockDataReducer from './stockDataSlice';

export const store = configureStore({
	reducer: {
		stockData: stockDataReducer,
	},
});
