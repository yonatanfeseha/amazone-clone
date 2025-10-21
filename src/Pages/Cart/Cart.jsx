import React, { useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import classes from "../../Components/Product/Product.module.css";
import CurrencyFormat from "../../Components/CurrencyFormat/CurruncyFormat";
import { Link } from "react-router-dom";
import classe from "./Cart.module.css";
import { Type } from "../../Utility/action.type";

function Cart() {
  const [{ basket }, dispatch] = useContext(DataContext);

  const increament = (item) => {
    dispatch({ type: Type.ADD_TO_BASKET, item });
  };

  const decreament = (id) => {
    dispatch({ type: Type.REMOVE_FROM_BASKET, id });
  };

  const total = basket.reduce((amount, item) => {
    return amount + item.price * item.amount;
  }, 0);

  return (
    <Layout>
      <section className={classe.cart_section}>
        <div className={classe.cart_items}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />

          {basket?.length === 0 ? (
            <p>Your Basket is empty</p>
          ) : (
            basket.map((item, i) => (
              <div key={i} className={classe.cart_item_wrapper}>
                <ProductCard
                  product={item}
                  renderDisc={true}
                  className={classes.flex}
                  renderAdd={false}
                />
                <div className={classe.item_controls}>
                  <button onClick={() => increament(item)}>+</button>
                  <span>{item.amount}</span>
                  <button onClick={() => decreament(item.id)}>-</button>
                </div>
              </div>
            ))
          )}
        </div>

        {basket?.length > 0 && (
          <div className={classe.cart_subtotal}>
            <p>Subtotal ({basket.length} items)</p>
            <div className="subtotal_amount">
              <CurrencyFormat amount={total} />
            </div>

            <span className={classe.checkout_checkbox}>
              <input type="checkbox" />
              <small>Check this before checkout</small>
            </span>

            <Link to="/payments" className={classe.checkout_btn}>
              Proceed to Checkout
            </Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
