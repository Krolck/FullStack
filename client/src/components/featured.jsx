import React, { useState, useEffect } from "react";
import productImg from '../images/productImg.png';
import axios from "axios";
const Featured = () => {
  const [products, setProducts] = useState([]);
   useEffect(() => {
   (async() => {
      try {
        const productData = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/ecommerce/products`)
        console.log(productData)
        setProducts(productData.data.rows)
      } catch (error) {
        return []
      }
      
    })()
  }, [])

  return (
    <>
      <div id="gallery-head">
        <h1> Gallery </h1>
      </div>
      <div id="card-container">
        {products.map((product, idx) => (
          <div className="featured-card" key={idx}>
            <div id="card">
              <img src={product.image_url} alt="" />
              <h2> {product.name} </h2>
              <h3> {product.description} </h3>
              <h3> {product.price} </h3>            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Featured;
