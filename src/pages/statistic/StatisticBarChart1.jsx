import React from "react";
import { Bar } from "react-chartjs-2";

const state = {
  labels: [
    "10 ngày",
    "9 ngày",
    "8 ngày",
    "7 ngày",
    "6 ngày",
    "5 ngày",
    "4 ngày",
    "3 ngày",
    "2 tháng",
    "1 tháng",
    "Hiện tại",
  ],
  datasets: [
    {
      label: "Trước khi tối ưu",
      data: [20, 30, 10, 200, 10, 33, 10, 90, 11, 12, 3],
      backgroundColor: "rgb(255, 99, 132)",
    },
  ],
};

export default class StatisticBarChart1 extends React.Component {
  render() {
    return (
      <div>
        <Bar data={state} />
      </div>
    );
  }
}
