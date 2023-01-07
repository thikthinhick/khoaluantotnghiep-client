import React from "react";
import { useParams } from "react-router-dom";
import { data } from "../utils/Data";

function Detail() {
  const param = useParams();
  const product = data.find((element) => element.id == param.productId);
  return (
    <div>
      <h2>{product ? `#${product?.id}: ${product?.title}` : "not found"}</h2>
    </div>
  );
}

export default Detail;
