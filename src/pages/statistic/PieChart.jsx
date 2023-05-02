import React from "react";
import { Pie } from "react-chartjs-2";
export default function PieChart({ data }) {
  if (!data) data = [];
  const state = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Lượng tiêu thụ điện x 0.001 kWh",
        data: Object.values(data),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };
  return (
    <div>
      <Pie data={state} />
    </div>
  );
}
