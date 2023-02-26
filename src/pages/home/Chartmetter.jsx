import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import "chartjs-plugin-zoom";
import moment from "moment";

function App({ speed }) {
  const [x, setX] = useState([
    { y: 0.1, x: moment().subtract(450, "second") },
    { y: 0.2, x: moment().subtract(420, "second") },
    { y: 0.2, x: moment().subtract(390, "second") },
    { y: 0.4, x: moment().subtract(360, "second") },
    { y: 0.3, x: moment().subtract(330, "second") },
    { y: 0.4, x: moment().subtract(300, "second") },
    { y: 0.5, x: moment().subtract(270, "second") },
    { y: 0.1, x: moment().subtract(240, "second") },
    { y: 0.5, x: moment().subtract(210, "second") },
    { y: 0.1, x: moment().subtract(180, "second") },
    { y: 0.5, x: moment().subtract(150, "second") },
    { y: 0.9, x: moment().subtract(120, "second") },
    { y: 0.2, x: moment().subtract(90, "second") },
    { y: 0.7, x: moment().subtract(60, "second") },
    { y: 0.8, x: moment().subtract(30, "second") },
  ]);
  const data = {
    datasets: [
      {
        label: "Số liệu",
        borderColor: "",
        cubicInterpolationMode: "monotone",
        fill: true,
        pointStyle: "none",
        pointRadius: 0,
        data: x,
      },
    ],
  };
  const options = {
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          enabled: true,
          mode: "x",
        },
        limits: {
          x: {
            minDelay: null, // Min value of the delay option
            maxDelay: null, // Max value of the delay option
            minDuration: null, // Min value of the duration option
            maxDuration: null, // Max value of the duration option
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.5,
        borderWidth: 2,
        color: "#666",
        lineTension: 0,
      },
    },
    scales: {
      xAxes: [
        {
          type: "realtime",

          realtime: {
            duration: 500000,
            frameRate: 30,
            delay: 20000,
            refresh: 10000,
            pause: false,
            onRefresh: function (chart) {
              chart.config.data.datasets.forEach(function (dataset) {
                const item = { x: moment(), y: Math.random() };
                dataset.data.push(item);
              });
            },
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
            source: "auto",
            autoSkip: true,
            callback: function (value) {
              let x = moment(value, "HH:mm:ss").format("HH:mm");
              return x;
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            max: 1,
            min: 0,
          },
        },
      ],
    },
  };
  return (
    <div style={{ height: "100%" }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default App;
