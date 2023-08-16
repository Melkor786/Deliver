import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatch();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
  }
  
  const finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
 
  return (
    <div className="card mb-3" style={{ maxWidth: "18rem" }}>
      <img
        src={props.foodItem.img}
        className="card-img-top"
        alt="..."
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <select
            className="m-2 h-100 bg-success rounded form-select"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            className="m-2 h-100 bg-success rounded form-select"
            ref={priceRef}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <div className="fs-6">₹{finalPrice}/-</div>
        </div>
        <hr />
        <button
          className="btn btn-success w-100"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
