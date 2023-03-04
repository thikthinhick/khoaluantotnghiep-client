import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";
function Weather() {
  const [state, setState] = useState({
    location: {},
    current: { condition: {} },
  });
  useEffect(() => {
    axios
      .get(
        "https://api.weatherapi.com/v1/current.json?key=f0d4d9631e9b4fb89e4175156232502&q=Hanoi&aqi=no"
      )
      .then((response) => {
        setState(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      <div className="container-weather">
        <div>
          <h2>
            {state.current.temp_c}
            <b>o</b> C
            <span style={{ color: "gray" }}>
              {" "}
              , {state.current.condition.text}
            </span>
          </h2>
          <span style={{ color: "gray", fontSize: "12px" }}>
            {state.location.name}, {state.location.country}
          </span>
        </div>
        <div>
          <img src={state.current.condition.icon} />
        </div>
      </div>
    </div>
  );
}
export default memo(Weather);
