import React, { useContext, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import db from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from "./Orders.module.css";
function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    if (user) {
      db.collection("user")
        .doc(user.uid)
        .collection("orders", "desc")
        .onSnapShot((SnapShot) => {
          setOrders(
            SnapShot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
    }
  }, []);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.order_container}>
          <h2>Your orders</h2>
          <div></div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
