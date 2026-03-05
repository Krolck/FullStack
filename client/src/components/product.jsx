import React from "react";

const Product = (props) => {
  return (
    <div id="product">
      <img src={props.image_url} alt="" />
      <h2> {props.name} </h2>
      <h3> {props.description} </h3>
      <h3> ${props.price} </h3>
      <button  onClick={props.function}> {props.buttonText}</button> 
    </div>
  );
};

export default Product;
