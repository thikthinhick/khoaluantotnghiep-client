import "chartjs-plugin-streaming";
import React, { memo, useState } from "react";
import { GraphUp } from "react-bootstrap-icons";
import { Line } from "react-chartjs-2";
const typeTimes = [
  {
    duration: 1000 * 60 * 15,
    delay: 15000,
    refresh: 15000,
  },
  {
    duration: 1000 * 60 * 60 * 3,
    delay: 15000 * 12,
    refresh: 15000 * 12,
  },
  {
    duration: 1000 * 60 * 60 * 24,
    delay: 15000 * 12 * 8,
    refresh: 15000 * 60 * 8,
  },
];
function Chartmetter({ dataChart }) {
  const [typeTime, setTypeTime] = useState(typeTimes[0]);

  const changeTypeTime = (e) => {
    setTypeTime(typeTimes[e.target.value]);
  };
  const data = {
    datasets: [
      {
        label: "Công suất tiêu thụ",
        borderColor: "rgb(255, 99, 132)",
        fill: true,
        pointStyle: "none",
        pointRadius: 2,
        data: dataChart,
      },
    ],
  };
  const options = {
    elements: {
      line: {
        tension: 0.2,
        borderWidth: 1.5,
        color: "#666",
        lineTension: 0,
      },
    },
    animation: {
      duration: 0,
    },
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            duration: typeTime.duration,
            frameRate: 30,
            delay: typeTime.delay,
            refresh: typeTime.refresh,
            pause: false,
            time: {
              displayFormat: "h",
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            max: 5000,
            min: -1000,
          },
        },
      ],
    },
  };

  return (
    <div class="card mb-4" style={{ height: "100%" }}>
      <div className="card-header align-items-center d-flex live-chart justify-content-between">
        <div>
          <GraphUp />
          &nbsp; Biểu đồ theo dõi tiêu thụ trực tiếp
        </div>
        <select name="time" id="time" onChange={changeTypeTime}>
          <option value="0">Theo dõi trong 30 phút</option>
          <option value="1">Theo dõi trong 3 giờ</option>
          <option value="2">Theo dõi trong 1 ngày</option>
        </select>
      </div>
      <div style={{ height: "100%" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default memo(Chartmetter);
