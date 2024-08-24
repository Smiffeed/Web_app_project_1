import React from "react";
import { Bar } from 'react-chartjs-2';

export default function StackedBarChart({ brandModelData }) {
  // Define a list of colors to use
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56'
  ];

  // Collect all unique models
  const models = new Set();
  Object.values(brandModelData).forEach(brand => {
    Object.keys(brand.models).forEach(model => models.add(model));
  });

  const modelList = Array.from(models);

  // Prepare the data for each model
  const data = {
    labels: Object.keys(brandModelData), // Car Brands
    datasets: modelList.map((model, index) => ({
      label: model,
      data: Object.keys(brandModelData).map(brand => brandModelData[brand].models[model]?.count || 0),
      backgroundColor: colors[index % colors.length],
      stack: 'Stack 0', // Ensure all models are stacked
    }))
  };

  // Calculate the maximum value for any stacked bar
  const maxStackValue = Math.max(...Object.keys(brandModelData).map(brand => 
    modelList.reduce((acc, model) => acc + (brandModelData[brand].models[model]?.count || 0), 0)
  ));

  // Set a bit of padding to make the chart look better (optional)
  const maxYValue = Math.ceil(maxStackValue * 1.1);  // Adding 10% padding

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
        max: maxYValue,
      },
    },
    barThickness: 20,
    maxBarThickness: 40, // Set max thickness
  };

  return <Bar data={data} options={options}/>;
}
