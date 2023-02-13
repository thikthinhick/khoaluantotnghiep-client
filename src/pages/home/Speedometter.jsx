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
    fontSize: "1em",
    color: "#000",
  },
};

const Speedometer = ({ id, value, title }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  });
  return (
    <div style={styles.dial}>
      <ReactSpeedometer
        maxValue={120}
        minValue={0}
        height={160}
        width={255}
        value={count}
        needleTransition="easeQuadIn"
        needleTransitionDuration={1000}
        needleColor="red"
        startColor="green"
        segments={10}
        endColor="blue"
      />
      <div style={styles.title}>{title}</div>
    </div>
  );
};

export default Speedometer;
