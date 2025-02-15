import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";

const BarChart = ({valuee}) => {
  const [revenueData, setRevenueData] = useState({
    xaxis: [],
    yaxis: [],
  });

  const [NWData, setNWData] = useState({
    xaxis: [],
    yaxis: [],
  });

  const [PRData, setPRData] = useState({
    xaxis: [],
    yaxis: [],
  });

  const [selectedCategory, setSelectedCategory] = useState("revenue");

  // Function to fetch data for each category
  const fetchData = (category) => {
    let url = "";
    
    switch (category) {
      case "revenue":
        url = 'http://localhost:9091/revenue/'+valuee; // Replace with your actual endpoint
        console.log("Rajesh")
      console.log(valuee)
        break;
      case "NW":
        url = 'http://localhost:9091/netWorth/'+valuee; // Replace with your actual endpoint
        break;
      case "PR":
        url = 'http://localhost:9091/profit/'+valuee; // Replace with your actual endpoint
        break;
      default:
        return;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Data:', data); // Debugging output

        if (data && data.xaxis && data.yaxis) {
          switch (category) {
            case "revenue":
              setRevenueData({
                xaxis: data.xaxis,
                yaxis: data.yaxis,
              });
              break;
            case "NW":
              setNWData({
                xaxis: data.xaxis,
                yaxis: data.yaxis,
              });
              break;
            case "PR":
              setPRData({
                xaxis: data.xaxis,
                yaxis: data.yaxis,
              });
              break;
            default:
              break;
          }
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchData(category); // Fetch data for the selected category
  };

  // Fetch the default "revenue" data when the component mounts
  useEffect(() => {
    fetchData("revenue"); // Automatically fetch revenue data on initial load
  }, []);

 
  const dataToDisplay =
    selectedCategory === "revenue"
      ? revenueData
      : selectedCategory === "NW"
      ? NWData
      : PRData;

  return (
    <div className="App">
      <h3>Financials</h3> 

      {/* Category Buttons (Revenue, NW, PR) shown automatically */}
      <div>
        <button onClick={() => handleCategoryClick("revenue")}>Revenue</button>
        <button onClick={() => handleCategoryClick("NW")}>NW</button>
        <button onClick={() => handleCategoryClick("PR")}>PR</button>
      </div>

      {/* Render Bar Chart for the selected category */}
      {selectedCategory && (
        <div className="row">
          <div className="col-4">
            <Chart
              series={[
                {
                  name: selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1),
                  data: dataToDisplay.yaxis, // Display the correct data for the selected category
                },
              ]}
              type="bar"
              width="450"
              options={{
                xaxis: {
                  categories: dataToDisplay.xaxis, // Display the correct xaxis categories for the selected category
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BarChart;
