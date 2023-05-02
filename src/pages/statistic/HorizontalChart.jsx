import React from "react";
import { HorizontalBar } from "react-chartjs-2";
export default function HorizontalChart({ data }) {
  if (!data) data = {};
  const state = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Lượng tiêu thụ điện x 0.001 kWh",
        data: Object.values(data),
        backgroundColor: "#4BC0C0",
      },
    ],
  };
  var options = {
    scales: {
      yAxes: [
        {
          barPercentage: 0.5,
        },
      ],
    },
  };
  return (
    <div className="d-flex">
      <HorizontalBar data={state} options={options} />
    </div>
  );
}
