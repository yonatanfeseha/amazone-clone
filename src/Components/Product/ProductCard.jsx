import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurruncyFormat";
import classes from "./Product.module.css";

function ProductCard({ product }) {
  // ✅ object destructuring
  const { image, title, rating, price } = product;

  return (
    <div className={classes.card}>
      <a href="#" className={classes.imageContainer}>
        <img src={image} alt={title} className={classes.image} />
      </a>

      <div className={classes.details}>
        <h3 className={classes.title}>{title}</h3>

        <div className={classes.rating}>
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          <small>({rating?.count || 0})</small>
        </div>

        <div className={classes.price}>
          <CurrencyFormat amount={price} />
        </div>

        <button className={classes.btn}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
