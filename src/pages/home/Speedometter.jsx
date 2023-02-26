import React, { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";

const styles = {
  dial: {
    display: "inline-block",
    width: `250px`,
    height: `auto`,
    color: "#000",
    border: "0.5px solid #fff",
    padding: "2px",
  },
  title: {
    color: "#000",
    textAlign: "center",
    position: "absolute",
    top: "-24px",
    background: "white",
    width: "100%",
  },
};

const Speedometer = ({ id, value, title }) => {
  return (
    <div style={styles.dial}>
      <ReactSpeedometer
        maxValue={300}
        minValue={0}
        height={160}
        width={255}
        value={value}
        needleTransition="easeQuadIn"
        needleTransitionDuration={1000}
        needleColor="gray"
        startColor="green"
        segments={10}
        endColor="red"
      />

      <div style={{ position: "relative" }}>
        <h3 style={styles.title}>
          {value} <span style={{ color: "gray" }}>kWh</span>
        </h3>
      </div>
    </div>
  );
};

export default Speedometer;
