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
    "2 ngày",
    "1 ngày",
    "Hiện tại",
  ],
  datasets: [
    {
      label: "Trước khi tối ưu",
      data: [20, 30, 10, 200, 10, 33, 10, 90, 11, 12, 3],
      backgroundColor: "#9BD0F5",
    },
    {
      label: "Tiêu thụ",
      data: [20, 30, 10, 200, 10, 33, 10, 90, 11, 12, 3],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Bar
          data={state}
          // options={{
          //   title: {
          //     display: true,
          //     text: "Average Rainfall per month",
          //     fontSize: 20,
          //   },
          //   legend: {
          //     display: true,
          //     position: "bottom",
          //   },
          // }}
        />
      </div>
    );
  }
}
