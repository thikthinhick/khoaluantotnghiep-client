import React from "react";
import { Bar } from "react-chartjs-2";

const state = {
  labels: Array.from({ length: 24 }, (value, index) => index + 1),

  datasets: [
    {
      label: "Trước khi tối ưu",
      data: [20, 30, 10, 200, 10, 33, 10, 90, 11, 12, 3],
      backgroundColor: "#36A2EB",
    },
  ],
};

export default class StatisticBarChart2 extends React.Component {
  render() {
    return (
      <div>
        <Bar data={state} />
      </div>
    );
  }
}
