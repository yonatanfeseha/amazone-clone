import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";

function Product() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className={classes.productGrid}>
      {product.length > 0 ? (
        product.map((singleProduct) => (
          <ProductCard product={singleProduct} key={singleProduct.id} />
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </section>
  );
}

export default Product;
