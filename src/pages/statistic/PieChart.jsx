import React from "react";
import { Pie } from "react-chartjs-2";

const state = {
  labels: ["Nhà bếp", "Phòng khách", "Phòng ngủ", "Nhà tắm", "khác"],
  datasets: [
    {
      label: "Dataset 1",
      data: [10, 20, 30, 40, 50],
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

export default class PieChart extends React.Component {
  render() {
    return (
      <div>
        <Pie data={state} />
      </div>
    );
  }
}
