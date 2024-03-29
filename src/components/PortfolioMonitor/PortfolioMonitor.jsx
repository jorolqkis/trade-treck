import React, { useEffect, useState } from 'react';
import StockNews from '../StockNews/StockNews';
import { STOCK_API } from '../../utils/stockAPI';
import { TOKEN } from '../../utils/stockAPI';
import stockFetcher from '../../utils/stockFetcher';
import StockChart from '../StockChart/StockChart';
import './PortfolioMonitor.css';

export default function PortfolioMonitor({ stocks, setStocks }) {
	const [stockNews, setStocksNews] = useState({});
	const [showNews, setShowNews] = useState(false);
	const [visibleChartId, setVisibleChartId] = useState(null);

	useEffect(() => {
		stockFetcher(stocks, setStocks, profitLossCalculator);
	}, []);

	const profitLossCalculator = (price, currentPrice, position, quantity) => {
		let profitLoss = 0;

		if (currentPrice) {
			if (position === 'BUY') {
				profitLoss = (currentPrice - price) * quantity;
			} else {
				profitLoss = (price - currentPrice) * quantity;
			}
		}

		return profitLoss.toFixed(2);
	};

	const profitLossTotalCalculator = stocks => {
		let profitLossTotal = 0;

		stocks.forEach(s => {
			if (!isNaN(Number(s.profitLoss))) {
				profitLossTotal += Number(s.profitLoss);
			}
		});

		return profitLossTotal.toFixed(2);
	};

	const fetchPrices = () => {
		stockFetcher(stocks, setStocks, profitLossCalculator);
	};

	const handleNews = async stock => {
		if (stockNews.hasOwnProperty(stock)) {
			setShowNews(false);
			setStocksNews({});
		} else {
			try {
				const stockName = stock.replace('', '');

				const currentDate = new Date();
				const oneWeekAgo = new Date(
					currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
				);
				const fromDate = oneWeekAgo.toISOString().split('T')[0];
				const toDate = currentDate.toISOString().split('T')[0];

				const response = await fetch(
					`${STOCK_API}company-news?symbol=${stockName}&from=${fromDate}&to=${toDate}&token=${TOKEN}`
				);
				const data = await response.json();

				setShowNews(true);
				setStocksNews({
					[stockName]: data.slice(0, 10),
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<>
			<div className="monitor-page">
				<div className="monitor-widget">
					<div className="monitor-main-row-wrapper">
						<div className="monitor-main-row">Stock</div>
						<div className="monitor-main-row">Position</div>
						<div className="monitor-main-row">Quantity</div>
						<div className="monitor-main-row">Price</div>
						<div className="monitor-main-row">Current Price</div>
						<div className="monitor-main-row">Profit/Loss</div>
						<div className="monitor-main-row">News</div>
						<div className="monitor-main-row">Chart</div>
					</div>

					{stocks.map(s => {
						return (
							<div key={s.id}>
								<div className="monitor-row-wrapper">
									<div className="monitor-row">
										{s.ticker}
									</div>
									<div className="monitor-row">
										{s.position}
									</div>
									<div className="monitor-row">
										{s.quantity}
									</div>
									<div className="monitor-row">{s.price}</div>
									<div className="monitor-row">
										{s.currentPrice ? s.currentPrice : null}
									</div>
									<div
										className={`${
											s.profitLoss > 0
												? 'profit-row'
												: 'loss-row'
										} monitor-row`}
									>
										{s.profitLoss ? s.profitLoss : null}
									</div>
									<div className="monitor-row">
										<button
											className="button"
											onClick={() => handleNews(s.ticker)}
										>
											Latest news
										</button>
									</div>
									<div className="monitor-row">
										<button
											className="button"
											onClick={() =>
												setVisibleChartId(s.ticker)
											}
										>
											Show Chart
										</button>
									</div>
								</div>
							</div>
						);
					})}
					<div className="monitor-summary-row-wrapper">
						<div className="monitor-summary-row">Total:</div>
						<div
							className={`${
								profitLossTotalCalculator(stocks)
									? 'profit-row'
									: 'loss-row'
							} monitor-summary-row`}
						>
							{profitLossTotalCalculator(stocks)}
						</div>
					</div>
					<button className="button" onClick={fetchPrices}>
						<span>Update prices</span>
					</button>
					<div>
						{showNews && Object.keys(stockNews)[0] ? (
							<StockNews stockNews={stockNews} />
						) : null}
					</div>
				</div>

				{visibleChartId && <StockChart symbol={visibleChartId} />}
			</div>
		</>
	);
}
