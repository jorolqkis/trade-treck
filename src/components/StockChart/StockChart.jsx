import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { fetchStockData } from '../../redux/stockDataSlice';

const StockChart = ({ symbol }) => {
	const dispatch = useDispatch();
	const { data, loading, error } = useSelector(state => state.stockData);

	useEffect(() => {
		if (symbol) {
			dispatch(fetchStockData(symbol));
		}
	}, [symbol, dispatch]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	const stockData = data[symbol] || { o: 0, h: 0, l: 0, c: 0 };
	const chartOptions = {
		chart: {
			type: 'line',
			height: 350,
			toolbar: {
				show: true,
			},
		},
		title: {
			text: `${symbol} Stock Price Movement`,
			align: 'left',
		},
		xaxis: {
			categories: ['Open', 'Low', 'High', 'Current'],
		},
		yaxis: {
			title: {
				text: 'Price',
			},
		},
		tooltip: {
			y: {
				formatter: function (val) {
					return '$' + val;
				},
			},
		},
	};

	const chartSeries = [
		{
			name: 'Price',
			data: [stockData.o, stockData.l, stockData.h, stockData.c],
		},
	];

	return (
		<ReactApexChart
			options={chartOptions}
			series={chartSeries}
			type="line"
			height={350}
			width={700}
		/>
	);
};

export default StockChart;
