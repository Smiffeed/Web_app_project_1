import React, { useState } from "react";
import { Table, Container, Dropdown } from 'react-bootstrap';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import StackedBarChart from "./components/dashboard/stackBar"; 
import PieBarChart from "./components/dashboard/pieChart"; 
import { RxDashboard } from "react-icons/rx";
import carsData from './data/taladrod-cars.min.json';
import "./dashboard.css";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [selectedBrand, setSelectedBrand] = useState('All');
  const cars = carsData.Cars;

  const processData = (cars) => {
    const brandModelData = {};

    cars.forEach(car => {
      const price = parseFloat(car.Prc.replace(/,/g, ''));
      const brand = car.NameMMT.split(" ")[0];
      const model = car.Model;

      if (!brandModelData[brand]) {
        brandModelData[brand] = {
          totalValue: 0,
          count: 0,
          models: {}
        };
      }

      if (!brandModelData[brand].models[model]) {
        brandModelData[brand].models[model] = {
          totalValue: 0,
          count: 0
        };
      }

      brandModelData[brand].totalValue += price;
      brandModelData[brand].count += 1;
      brandModelData[brand].models[model].totalValue += price;
      brandModelData[brand].models[model].count += 1;
    });

    return brandModelData;
  };

  const brandModelData = processData(cars);

  // Prepare data for the pie chart
  const pieData = {
    labels: Object.keys(brandModelData),
    datasets: [{
      data: Object.values(brandModelData).map(brand => brand.count),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    }]
  };

  // Filter data based on selected brand
  const filteredBrandModelData = selectedBrand === 'All' 
    ? brandModelData
    : { [selectedBrand]: brandModelData[selectedBrand] };

  return (
    <Container className="dashboard-container mt-4">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />
      <div className="header mb-4">
        <h1><RxDashboard className="icon" /> Dashboard</h1>
      </div>

      <h3>Table showing Number of Cars and Values (in Baht) by Brands and Models</h3>

      {/* Dropdown for Brand Selection */}
      <div className="dropdown-container mb-4">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedBrand === 'All' ? 'Select Brand' : selectedBrand}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSelectedBrand('All')}>All</Dropdown.Item>
            {Object.keys(brandModelData).map((brand) => (
              <Dropdown.Item key={brand} onClick={() => setSelectedBrand(brand)}>
                {brand}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="content-container">
        
        {/* Table */}
        <div className="table-container mb-4">
          <Table striped hover className="table">
            <thead>
              <tr>
                <th>Brand</th>
                <th>Model</th>
                <th>Count</th>
                <th>Value (Baht)</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(filteredBrandModelData).map((brand, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td rowSpan={Object.keys(filteredBrandModelData[brand].models).length + 1} className='text-center' style={{ verticalAlign: 'middle' }}>
                      <strong>{brand}</strong> <br />
                      <span className="badge bg-success">{filteredBrandModelData[brand].count.toLocaleString()} cars</span> <br />
                      <strong>Total: </strong>{filteredBrandModelData[brand].totalValue.toLocaleString()} Baht
                    </td>
                  </tr>
                  {Object.keys(filteredBrandModelData[brand].models).map((model, idx) => (
                    <tr key={idx} className="text-center">
                      <td>{model}</td>
                      <td>{filteredBrandModelData[brand].models[model].count}</td>
                      <td>{filteredBrandModelData[brand].models[model].totalValue.toLocaleString()}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Charts */}
        <div className="charts-container">
          <div className="chart pie-chart-container mb-4">
            <h3 className="mb-5">Car Distribution by Brand</h3>
            <div className="pie-chart">
              <PieBarChart brandModelData={brandModelData} />
            </div>
          </div>
          <div className="chart stacked-bar-chart-container">
            <h3 className="mb-5">Car Models Distribution</h3>
            <StackedBarChart brandModelData={filteredBrandModelData} />
          </div>
        </div>
      </div>
    </Container>
  );
}
