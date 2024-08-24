import React from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function StackedBarChart({ brandModelData }) {
  // Define a list of colors to use
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56'
  ];

  // Prepare the data and options here
  const data = {
    labels: Object.keys(brandModelData),
    datasets: Object.keys(brandModelData).flatMap((brand, brandIndex) => (
      Object.keys(brandModelData[brand].models).map((model, modelIndex) => ({
        label: model,
        data: Object.keys(brandModelData).map(b => brandModelData[b].models[model]?.count || 0),
        backgroundColor: colors[modelIndex % colors.length], // Assign different color to each model
        stack: brand,
      }))
    ))
  };

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      max: 100,
      ticks: {
        stepSize: 10,
      }      
    },
  },
  barThickness: 20,
  maxBarThickness: 40, // Set max thickness
};
  return <Bar data={data} options={options} />;
}