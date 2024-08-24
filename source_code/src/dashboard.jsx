import React from "react";
import { Table, Container } from 'react-bootstrap';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import StackedBarChart from "./components/dashboard/stackBar"; 
import PieBarChart from "./components/dashboard/pieChart"; 
import carsData from './data/taladrod-cars.json';
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
  // Get data from json file
  const cars = carsData.Cars;

  // Preparing dataset for visualization
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

  return (
    <Container className="dashboard-container mt-4">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />
      <div className="header mb-4">
        <h2>Dashboard</h2>
      </div>

      <h3>Table showing Number of Cars and Values (in Baht) by Brands and Models</h3>
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
              {Object.keys(brandModelData).map((brand, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td rowSpan={Object.keys(brandModelData[brand].models).length + 1} className='text-center' style={{ verticalAlign: 'middle' }}>
                      <strong>{brand}</strong> <br />
                      <span className="badge bg-success">{brandModelData[brand].count.toLocaleString()} cars</span> <br />
                      <strong>Total: </strong>{brandModelData[brand].totalValue.toLocaleString()} Baht
                    </td>
                  </tr>
                  {Object.keys(brandModelData[brand].models).map((model, idx) => (
                    <tr key={idx} className="text-center">
                      <td>{model}</td>
                      <td>{brandModelData[brand].models[model].count}</td>
                      <td>{brandModelData[brand].models[model].totalValue.toLocaleString()}</td>
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
            <h3 className="mb-5">Car Distribution by Brand pie chart</h3>
            <div className="pie-chart">
              <PieBarChart brandModelData={brandModelData} />
            </div>
          </div>
          <div className="chart stacked-bar-chart-container">
            <h3 className="mb-5">Car Models Distribution by stacked bar chart</h3>
            <StackedBarChart brandModelData={brandModelData} />
          </div>
        </div>
      </div>
    </Container>
  );
}