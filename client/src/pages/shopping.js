import React, { useState, useEffect } from "react";
import NavBar from "../components/nav";
import productImg from "../images/productImg.png";
import axios from "axios";

const PAGE_PRODUCTS = "products";
const PAGE_CART = "cart";

const Shopping = (props) => {
  const searchTerm = props.searchTerm ?? "";
  const [cartList, setCartList] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    (async() => {
        try {
          const productData = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/ecommerce/products`,searchTerm)
          console.log(productData)
          setProducts(productData.data.rows)
          
        } catch (error) {
          return []
        }
        
      })();
  }, [])
  useEffect(() => {
    console.log("Update Filter " + searchTerm)
    setFilteredProducts(
          products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
  }, [products, searchTerm])
  const addToCart = async(product) => {

      setCartList([...cartList, product]);
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/ecommerce/cart`, product)
      console.log("Cart Response: ", response)
      navigateTo("/cart")
    
  };

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };
  
  const renderProducts = () => (
    <>
      <header id="shopping-head">
        <button onClick={() => navigateTo(PAGE_CART)} id="goToCart">
          Go to Cart ({cartList.length})
        </button>
      </header>
      <div id="shopping">
        {filteredProducts.map((product, idx) => (
          <div className="card" key={idx}>
            <div id="product">
              <img src={product.image_url} alt="" />
              <h2> {product.name} </h2>
              <h3> {product.description} </h3>
              <h3> {product.price} </h3>
              <button onClick={() => addToCart(product)}> Add to Cart </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderCart = () => (
    <>
      <div id="cart-container">
        <button onClick={() => navigateTo(PAGE_PRODUCTS)} id="products-btn">
          Back to Products
        </button>

        <h1 id="cart-title"> Cart </h1>

        {cartList.map((product, idx) => (
          <div className="card card-container" key={idx}>
            <div id="product">
              <img src={product.image_url} alt="" />
              <h2> {product.name} </h2>
              <h3> {product.description} </h3>
              <h3> {product.price} </h3>
            </div>
          </div>
        ))}
        <button id="checkout-btn">Checkout</button>
      </div>
    </>
  );

  return (
    <div className="main">
      {renderProducts()}
      {page === PAGE_CART && renderCart()}
      <NavBar length={cartList.length} />
    </div>
  );
};

export default Shopping;
