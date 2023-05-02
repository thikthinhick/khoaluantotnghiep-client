import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export default function StatisticBarChart1({ data }) {
  const state = {
    labels: [
      "-60",
      "-30",
      "-10",
      "-7",
      "-6",
      "-5",
      "-4",
      "-3",
      "-2",
      "-1",
      "Now",
    ],
    datasets: [
      {
        label: "Lượng tiêu thụ điện x 0.001 kWh",
        data: data,
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      xAxes: {
        title: {
          display: true,
          text: "chuong",
          font: {
            size: 15,
          },
        },
      },
    },
  };

  return (
    <div>
      <Bar options={options} data={state} />
    </div>
  );
}
