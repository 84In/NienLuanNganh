import React from "react";
import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const AdminPolarAreaCharts = ({ valueData, label }) => {
  const data = {
    labels: label,
    datasets: [
      {
        label: label,
        data: valueData,
        backgroundColor: ["rgb(255, 99, 132)", "rgb(75, 192, 192)", "rgb(255, 205, 86)"],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        // display: false,
        // position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="flex w-full items-center justify-center" style={{ width: "100%", height: "300px" }}>
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default AdminPolarAreaCharts;
