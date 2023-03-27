import React from "react";
import { HorizontalBar } from "react-chartjs-2";

const state = {
  labels: [
    "Máy giặt",
    "Tủ lạnh",
    "Ti vi",
    "Máy lọc nước",
    "Lò vi sóng",
    "Bóng đèn",
    "Máy vi tính",
    "Bình nóng lạnh",
    "Máy sấy tóc",
    "Quạt",
    "Điều hòa",
    "Laptop",
  ],
  datasets: [
    {
      label: "Trước khi tối ưu",
      data: [20, 30, 10, 200, 10, 33, 10, 90, 11, 12, 3, 70],
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

export default class HorizontalChart extends React.Component {
  render() {
    return (
      <div className="d-flex">
        <HorizontalBar data={state} options={options} />
      </div>
    );
  }
}
