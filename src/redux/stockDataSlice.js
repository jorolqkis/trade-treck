import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOKEN } from '../utils/stockAPI';

export const fetchStockData = createAsyncThunk(
	'stockData/fetchStockData',
	async symbol => {
		const response = await fetch(
			`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${TOKEN}`
		);
		const data = await response.json();
		return { symbol, ...data };
	}
);

export const stockDataSlice = createSlice({
	name: 'stockData',
	initialState: {
		data: {},
		loading: false,
		error: null,
	},
	extraReducers: builder => {
		builder
			.addCase(fetchStockData.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchStockData.fulfilled, (state, action) => {
				state.loading = false;
				state.data[action.payload.symbol] = action.payload;
			})
			.addCase(fetchStockData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default stockDataSlice.reducer;
