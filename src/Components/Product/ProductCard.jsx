import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurruncyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductCard({ product, renderDisc }) {
  const { image, title, rating, id, price, description } = product;

  const [state, dispatch] = useContext(DataContext);
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: (image, title, rating, id, price, description),
    });
  };

  return (
    <div className={classes.card}>
      <Link to={`/products/${id}`} className={classes.imageContainer}>
        <img src={image} alt={title} className={classes.image} />
      </Link>

      <div className={classes.details}>
        <h3 className={classes.title}>{title}</h3>
        {renderDisc && <div style={{ maxWidth: "750px" }}>{description}</div>}

        <div className={classes.rating}>
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          <small>({rating?.count || 0})</small>
        </div>

        <div className={classes.price}>
          <CurrencyFormat amount={price} />
        </div>

        <button className={classes.btn} onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
