import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";
import classes from "../../Components/Product/Product.module.css";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${productUrl}products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, []);
  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <ProductCard
          product={product}
          renderDisc={true}
          className={classes.flex}
          renderAdd={true}
        />
      )}
    </Layout>
  );
}

export default ProductDetail;
