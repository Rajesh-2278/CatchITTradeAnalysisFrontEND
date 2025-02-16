import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";

const BarChart = ({ valuee }) => {
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

  const [selectedCategory, setSelectedCategory] = useState(null); // Start with null so no chart is displayed initially
  const [showCategoryButtons, setShowCategoryButtons] = useState(false);

  // Function to fetch data for each category
  const fetchData = (category) => {
    let url = "";

    switch (category) {
      case "revenue":
        url = 'http://localhost:9091/revenue/' + valuee; // Replace with your actual endpoint
        break;
      case "NW":
        url = 'http://localhost:9091/netWorth/' + valuee; // Replace with your actual endpoint
        break;
      case "PR":
        url = 'http://localhost:9091/profit/' + valuee; // Replace with your actual endpoint
        break;
      default:
        return;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
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

  const handleAboutClick = () => {
    setShowCategoryButtons(!showCategoryButtons); // Toggle the visibility of the category buttons
    if (showCategoryButtons) {
      setSelectedCategory(null); // Reset the chart when hiding the category buttons
    }
  };

  // Fetch the default "revenue" data when the component mounts
  useEffect(() => {
    if (selectedCategory) {
      fetchData(selectedCategory); // Automatically fetch data when a category is selected
    }
  }, [selectedCategory]); // Only run when the selectedCategory changes

  // Determine which data to use based on the selected category
  const dataToDisplay =
    selectedCategory === "revenue"
      ? revenueData
      : selectedCategory === "NW"
      ? NWData
      : PRData;

  return (
    <div className="App">
      <h3>Financials</h3>

      {/* ABOUTT Button */}
      <div>
        <button onClick={handleAboutClick}>ABOUTT</button>
      </div>

      {/* Conditionally render the Category Buttons (Revenue, NW, PR) */}
      {showCategoryButtons && (
        <div>
          <button onClick={() => handleCategoryClick("revenue")}>REVENUE</button>
          <button onClick={() => handleCategoryClick("NW")}>NETWORTH</button>
          <button onClick={() => handleCategoryClick("PR")}>PROFIT</button>
        </div>
      )}

      {/* Only render the chart if a category is selected */}
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
