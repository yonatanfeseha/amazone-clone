import React, { useContext, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurruncyFormat";
import { axiosInstance } from "../Api/axios";

function Payment() {
  const [{ user, basket }] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const handleChange = (event) => {
    // console.log(event);
    event.error ? setCardError(event.error.message) : setCardError("");
  };

  const handlePayment = async (event) => {
    event.preventDefault();

    const total = basket?.reduce(
      (amount, item) => item.price * item.amount + amount,
      0
    );

    console.log("Total:", total);

    try {
      // 1. backend || functions ---> contact to the client secret

      const response = await axiosInstance({
        method: "post",
        url: `/payments/create?total=${total * 100}`,
      });
      console.log(response.data);
    } catch (error) {
      console.log("payment error:", error);
    }

    //2. client-side(react) ---> confirm the card payment

    // 3.after confirmation ---> order firestore db save,clear the basket
  };

  return (
    <Layout>
      <div className={classes.payment}>
        {/* header */}
        <div className={classes.payment__header}>
          <h1>Checkout ({totalItem}) Items </h1>
        </div>

        {/* body */}
        <section className={classes.payment__section}>
          {/* address */}
          <div className={classes.payment__sectionContent}>
            <h3>Delivery Address</h3>
            <div>{user?.email}</div>
            <div>woreda 03</div>
            <div>19 kebele</div>
            {/* address content here */}
          </div>

          <div className={classes.payment__divider}></div>

          {/* product */}
          <div className={classes.payment__sectionContent}>
            <h3>Review items and delivery</h3>
            <div>
              {basket.map((item) => {
                return <ProductCard key={item.id} product={item} />;
              })}
            </div>
          </div>

          {/* card form */}
          <div className={classes.payment__sectionContent}>
            <h3>Payment Method</h3>
            <div>
              <div className={classes.payment__cardForm}>
                <form onSubmit={handlePayment}>
                  {cardError && (
                    <small style={{ color: "red" }}>{cardError}</small>
                  )}
                  <CardElement onChange={handleChange} />
                  {/* price container */}
                  <h3 className="orderTotal">
                    Order Total: $
                    {basket?.reduce(
                      (amount, item) => item.price * item.amount + amount,
                      0
                    )}
                    {/* <CurrencyFormat amount={total} /> */}
                  </h3>

                  <button type="submit">Buy Now</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Payment;
