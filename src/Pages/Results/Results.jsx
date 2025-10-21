import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../Api/endPoints";
import Classes from "./Results.module.css";
import ProductCard from "../../Components/Product/ProductCard";

function Results() {
  const [results, setResults] = useState([]);
  const { catagoryName } = useParams();

  useEffect(() => {
    axios
      .get(`${productUrl}products/category/${encodeURIComponent(catagoryName)}`)
      .then((res) => {
        setResults(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [catagoryName]); // <-- run again when category changes

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>category/{catagoryName}</p>
        <hr />
        <div className={Classes.products_container}>
          {results.map((product) => (
            <ProductCard key={product.id} product={product} renderAdd={true} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Results;
