import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, []);

  return (
    <section className={classes.productGrid}>
      {product.length > 0 ? (
        product.map((singleProduct) => (
          <ProductCard
            product={singleProduct}
            key={singleProduct.id}
            renderAdd={true}
          />
        ))
      ) : (
        <Loader loading={loading} />
      )}
    </section>
  );
}

export default Product;
