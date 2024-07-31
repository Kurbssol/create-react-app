import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';
import axios from 'axios';

function TokenChart({ contractAddress }) {
  const [chartData, setChartData] = useState([]);
  const [tokenInfo, setTokenInfo] = useState({});

  useEffect(() => {
    // Fetch token data
    axios.get(`/token/${contractAddress}`)
      .then(response => {
        setTokenInfo(response.data);
        setChartData(response.data.priceHistory);
      });

    // Initialize Chart.js or TradingView chart with data
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.map(entry => entry.time),
        datasets: [{
          label: 'Price',
          data: chartData.map(entry => entry.price),
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
        }],
      },
      options: {
        scales: {
          x: { type: 'time' },
          y: { beginAtZero: true },
        },
      },
    });

  }, [contractAddress]);

  return (
    <div>
      <div className="sidebar">
        <h2>{tokenInfo.name}</h2>
        <p>Price: {tokenInfo.price}</p>
        <p>Market Cap: {tokenInfo.marketCap}</p>
        <p>Volume: {tokenInfo.volume}</p>
        {/* Add more details as needed */}
      </div>
      <div className="chart-container">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
}

export default TokenChart;
