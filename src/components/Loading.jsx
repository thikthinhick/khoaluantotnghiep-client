import React from "react";
import loading from "../../src/assets/images/loading.gif";
function Loading() {
  return (
    <div
      style={{
        background: "rgba(0,0,0,0.3)",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={loading} style={{ height: "40px", width: "40px" }} />
    </div>
  );
}

export default Loading;
