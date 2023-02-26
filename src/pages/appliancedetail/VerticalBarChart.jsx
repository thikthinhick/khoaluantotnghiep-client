import React from "react";
import { Bar } from "react-chartjs-2";

const state = {
  labels: [
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
      label: "Thấp nhất",
      data: [23, 36, 37, 39, 10, 11, 60, 80],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Cao nhất",
      data: [20, 30, 10, 200, 10, 33, 10, 90],
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
          options={
            {
              // title: {
              //   display: true,
              //   text: "Average Rainfall per month",
              //   fontSize: 20,
              // },
              // legend: {
              //   display: true,
              //   position: "right",
              // },
            }
          }
        />
      </div>
    );
  }
}
