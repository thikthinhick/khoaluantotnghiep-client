import React from "react";
import { Bar } from "react-chartjs-2";

const state = {
  labels: ["60", "30", "10", "7", "6", "5", "4", "3", "2", "1", "Hiện tại"],

  datasets: [
    {
      label: "Lượng tiêu thụ",
      data: [20, 30, 10, 200, 10, 33, 10, 90, 11, 12, 3],
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

    // yAxes: [
    //   {
    //     type: "category",
    //     position: "left",
    //     display: true,
    //     scaleLabel: { display: true, labelString: "Request State" },
    //   },
    // ],
  },
};

export default class StatisticBarChart1 extends React.Component {
  render() {
    return (
      <div>
        <Bar options={options} data={state} />
      </div>
    );
  }
}
