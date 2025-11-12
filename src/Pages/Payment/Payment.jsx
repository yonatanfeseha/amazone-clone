import React, { useContext, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurruncyFormat";
import { axiosInstance } from "../Api/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../../Utility/firebase";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket?.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const handleChange = (event) => {
    event.error ? setCardError(event.error.message) : setCardError("");
  };

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    if (processing) return;
    if (!user) {
      navigate("/login");
      return;
    }

    setProcessing(true);

    try {
      const response = await axiosInstance.post(
        `/payments/create?total=${total * 100}`
      );

      const clientSecret = response.data.clientSecret;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      await setDoc(
        doc(collection(db, "users", user.uid, "orders"), paymentIntent.id),
        {
          basket,
          amount: paymentIntent.amount,
          created: serverTimestamp(),
        }
      );
      dispatch({ type: "EMPTY_BASKET" });

      navigate("/orders", { state: { msg: "You have placed a new order!" } });
    } catch (error) {
      console.log("payment error:", error);
    }

    setProcessing(false);
  };

  return (
    <Layout>
      <div className={classes.payment}>
        <div className={classes.payment__header}>
          <h1>Checkout ({totalItem}) Items</h1>
        </div>

        <section className={classes.payment__section}>
          <div className={classes.payment__sectionContent}>
            <h3>Delivery Address</h3>
            <p>{user?.email}</p>
            <p>woreda 03</p>
            <p>19 kebele</p>
          </div>

          <div className={classes.payment__divider}></div>

          <div className={classes.payment__sectionContent}>
            <h3>Review items and delivery</h3>
            <div>
              {basket.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>

          <div className={classes.payment__sectionContent}>
            <h3>Payment Method</h3>
            <div className={classes.payment__cardForm}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                <CardElement onChange={handleChange} />

                <h3 className={classes.orderTotal}>
                  Order Total:
                  <CurrencyFormat amount={total} />
                </h3>

                <button
                  type="submit"
                  disabled={!stripe || processing}
                  className={processing ? classes.btnDisabled : ""}
                >
                  {processing ? (
                    <div className={classes.payment_loader}>
                      <ClipLoader size={12} />
                      <p>Processing...</p>
                    </div>
                  ) : (
                    "Buy Now"
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Payment;
