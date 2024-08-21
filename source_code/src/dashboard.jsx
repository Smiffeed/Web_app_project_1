import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  // Pie Chart Data
  const pieData = {
    labels: data.map(brand => brand.brand),
    datasets: [
      {
        data: data.map(brand => brand.total),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Stacked Bar Chart Data
  const barData = {
    labels: data.map(brand => brand.brand),
    datasets: data.flatMap((brand, brandIndex) =>
      brand.models.map((model, modelIndex) => ({
        label: model.model,
        data: data.map(b => b.models[modelIndex]?.count || 0),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'][modelIndex % 3],
      }))
    ),
  };

  const barOptions = {
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  return (
    <div>
      <h1>Car Dashboard</h1>

      {/* Table */}
      {data.map((brandData, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3>{brandData.brand} = {brandData.total}</h3>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Model</th>
                <th>Number of Cars</th>
                <th>Value (in Baht)</th>
              </tr>
            </thead>
            <tbody>
              {brandData.models.map((model, modelIndex) => (
                <tr key={modelIndex}>
                  <td>{brandData.brand} / {model.model}</td>
                  <td>{model.count}</td>
                  <td>{model.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* Pie Chart */}
      <div style={{ width: '400px', margin: '20px auto' }}>
        <h3>Portion of Cars by Brand</h3>
        <Pie data={pieData} />
      </div>

      {/* Stacked Bar Chart */}
      <div style={{ width: '600px', margin: '20px auto' }}>
        <h3>Models of a Brand in a Bar</h3>
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
