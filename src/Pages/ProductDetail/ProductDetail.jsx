import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios
      .get(`${productUrl}products/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, []);
  return (
    <Layout>
      <ProductCard product={product} />
    </Layout>
  );
}

export default ProductDetail;
