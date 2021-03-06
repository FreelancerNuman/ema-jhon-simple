import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Review.css";
import happyImage from "../../images/giphy.gif";
import "./Review.css";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    // const productCount = Object.values(savedCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);

  const handleRemoveProduct = (productKey) => {
    console.log("clicked", productKey);
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  const handlePlaceOrder = () => {
    setCart([]);
    setOrderPlaced(true);
    processOrder();
  };

  let thankYou;
  if (orderPlaced) {
    thankYou = <img className="thank-you" src={happyImage} alt="Thank you" />;
  }
  return (
    <div className="box-container">
      <div className="product-container">
        {cart.map((product) => (
          <ReviewItem
            handleRemoveProduct={handleRemoveProduct}
            showCartBtn={true}
            key={product.key}
            product={product}
          ></ReviewItem>
        ))}
        {thankYou}
      </div>
      <div className="shop-container">
        <Cart cart={cart}>
          <button onClick={handlePlaceOrder} className="review-btn">
            Place Order
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
