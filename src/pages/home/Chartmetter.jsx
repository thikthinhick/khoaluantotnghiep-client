import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import moment from "moment";

const Chart = require("react-chartjs-2").Chart;

const chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

const color = Chart.helpers.color;
const data = {
  datasets: [
    {
      label: "Dataset 2",
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      borderColor: "rgb(54, 162, 235)",
      cubicInterpolationMode: "monotone",
      fill: true,
    },
  ],
};

const options = {
  elements: {
    line: {
      tension: 0.2,
    },
  },
  scales: {
    xAxes: [
      {
        type: "realtime",
        distribution: "linear",
        realtime: {
          duration: 1000000,
          frameRate: 30,
          delay: 1000,
          refresh: 10000,
          pause: false,
          onRefresh: function (chart) {
            chart.data.datasets[0].data.push({
              x: moment(),
              y: Math.random(),
            });
          },
          delay: 2000,
          time: {
            displayFormat: "h:mm",
          },
        },
        ticks: {
          displayFormats: 1,
          maxRotation: 0,
          minRotation: 0,
          stepSize: 1,
          maxTicksLimit: 30,
          minUnit: "second",
          source: "auto",
          autoSkip: true,
          callback: function (value) {
            return moment(value, "HH:mm:ss").format("HH:mm");
          },
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          max: 1,
        },
      },
    ],
  },
};

function App() {
  return (
    <div className="App">
      <Line data={data} options={options} />
    </div>
  );
}

export default App;
