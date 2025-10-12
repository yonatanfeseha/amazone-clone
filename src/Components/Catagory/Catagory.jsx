import React from "react";
import CatagoryCard from "./CatagoryCard";
import catagoryInfo from "./CatagoryInfo";
import classes from "./catagory.module.css";

function Catagory() {
  return (
    <section className={classes.catagory_container}>
      {catagoryInfo.map((infos) => (
        <CatagoryCard key={infos.title} data={infos} />
      ))}
    </section>
  );
}

export default Catagory;
