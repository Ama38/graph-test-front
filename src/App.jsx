import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReactApexChart from 'react-apexcharts';

const OTCChart = () => {
  const [quantity, setQuantity] = useState(5000);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: 'candlestick',
      height: 559,
      zoom: {
        enabled: true,
        type: 'xy',
        autoScaleYaxis: true
      },
    },
    title: {
      text: 'OTC Binary Options Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        formatter: (value) => value.toFixed(2)
      }
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#21ff46",
          downward: '#E10000'
        }
      }
    }
  });

  const fetchData = () => {
    fetch(`https://graph-test-22c1ac60ca6d.herokuapp.com/get-candles/?initial_price=100&volatility_percent=5&trend_strength=0.0005&num_points=${quantity}&candle_size=10`)
      .then(response => response.json())
      .then(data => {
        setSeries([{
          data: data.map(item => ({
            x: new Date(item.x),
            y: item.y
          }))
        }]);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          style={{ marginRight: '10px' }}
        />
        <button onClick={fetchData}>Fetch Data</button>
      </div>
      <div id="chart" style={{ width: '1200px', height: '559px' }}>
        <ReactApexChart 
          options={options} 
          series={series} 
          type="candlestick" 
          height={559}
          width="100%"
        />
      </div>
    </div>
  );
};

export default OTCChart;