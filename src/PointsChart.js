import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Chart from "react-apexcharts";
// Registering the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PointsChart = ({value}) => {
  // Chart data setup
  const [chartData, setChartData] = useState({
    xaxis: [],
    yaxis: [],
  });
  // const sampleData = {
  //   xaxis: ["1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"],
  //   yaxis: [30, 40, 45, 50, 49, 5, 70, 91],
  // };
  // Fetching data from the backend
  useEffect(() => {
    // Replace this URL with your backend endpoint
    fetch('http://localhost:9091/chart/'+value) 
      .then(response => response.json())
      .then(data => {
        // Assuming the response structure has `xaxis` and `yaxis` arrays
        setChartData({
          xaxis: data.xaxis,
          yaxis: data.yaxis,
        });
      console.log("RaNaikjesh")
      console.log(value)
      console.log(data)})
      .catch(error => console.error('Error fetching data:', error));
      // setChartData({
      //   xaxis: sampleData.xaxis,
      //   yaxis: sampleData.yaxis,
      // })
      
  }, []);

  // If the data hasn't been loaded yet, you can show a loading indicator
  // if (!chartData.xaxis.length || !chartData.yaxis.length) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="App">
     
      <div className="row">
       

        {/* Line Chart */}
        <div className="col-4">
          <Chart
            series={[
              {
                name: "People Born",
                data: chartData.yaxis, // yaxis data fetched from the backend
              },
            ]}
            type="line"
            width="450"
            options={{
              xaxis: {
                categories: chartData.xaxis, // xaxis data fetched from the backend
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PointsChart;
