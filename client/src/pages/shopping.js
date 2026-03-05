import React, { useState, useEffect } from "react";
import NavBar from "../components/nav";
import productImg from "../images/productImg.png";
import Product from "../components/product"
import axios from "axios";

const PAGE_PRODUCTS = "products";
const PAGE_CART = "cart";

const Shopping = (props) => {
  const searchTerm = props.searchTerm ?? "";
  const cartList= props.cartList
  const setCartList = props.setCartList
  const [page, setPage] = useState(PAGE_PRODUCTS);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartText, setCartText] = useState("Open Cart")
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
  }, [searchTerm])
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
  
    
  };
  const removeFromCart = async(product, idx) => {

    

    console.log(idx)
    setCartList([...cartList.slice(0, idx),...cartList.slice(idx + 1)]);
    console.log(cartList)
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/ecommerce/cart`, product)
    console.log("Cart Response: ", response)
   
  
};

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };
  
  const renderProducts = () => (
    <>
      <header id="shopping-head">
        <button onClick={() => {
          if (cartText === "Open Cart"){
            navigateTo(PAGE_CART)
            setCartText("Close Cart")
          }
          else {
            navigateTo(PAGE_PRODUCTS)
            setCartText("Open Cart")
          }
          
  }} id="goToCart">
          {cartText} ({cartList.length})
        </button>
      </header>
      <div id="shopping">
        {filteredProducts.map((product, idx) => (
          <div className="card" key={idx}>
            <Product image_url = {product.image_url} name = {product.name} description = {product.description} price = {product.price} function = {() => addToCart(product)} buttonText = "Add To Cart"/>
          </div>
        ))}
      </div>
    </>
  );

  const renderCart = () => (
    <>
      <div id="cart-container">
        <button onClick={() => {
          if (cartText === "Open Cart"){
            navigateTo(PAGE_CART)
            setCartText("Close Cart")
          }
          else {
            navigateTo(PAGE_PRODUCTS)
            setCartText("Open Cart")
          }}} id="products-btn">Close Cart
        </button>

        <h1 id="cart-title"> Cart </h1>

        {cartList.map((product, idx) => (
          <div className="card card-container" key={idx}>
            <Product image_url = {product.image_url} name = {product.name} description = {product.description} price = {product.price} function = {() => removeFromCart(product, idx)} buttonText = "Remove From Cart" />
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
