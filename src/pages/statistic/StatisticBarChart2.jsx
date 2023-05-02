import React from "react";
import { Bar } from "react-chartjs-2";

export default function StatisticBarChart2({ data }) {
  const state = {
    labels: Array.from(
      { length: 24 },
      (value, index) => index + "-" + (index + 1)
    ),

    datasets: [
      {
        label: "Lượng tiêu thụ điện x 0.001 kWh",
        data: data,
        backgroundColor: "#36A2EB",
      },
    ],
  };
  return (
    <div>
      <Bar data={state} />
    </div>
  );
}
