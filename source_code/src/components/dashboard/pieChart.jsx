import React from "react";
import { Pie } from 'react-chartjs-2';

export default function PieBarChart({ brandModelData }) {
  // Prepare data for the pie chart
  const data = {
    labels: Object.keys(brandModelData),
    datasets: [{
      data: Object.values(brandModelData).map(brand => brand.count),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            const total = pieData.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} cars (${percentage}%)`;
          }
        }
      },
      legend: {
        display: true,
        position: 'top'
      }
    }
  }

  return <Pie data={data} options={options} />;
}
