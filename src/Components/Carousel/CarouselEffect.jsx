import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import classes from "./Carousel.module.css";

function CarouselEffect() {
  return (
    <div className="carousel-container">
      <Carousel
        autoPlay
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={700}
        swipeable
        emulateTouch
      >
        {img.map((imageItemLink, index) => (
          <div key={index} className={classes.hero_img}>
            <img
              src={imageItemLink}
              alt={`Slide ${index + 1}`}
              loading="lazy"
              // style={{
              //   width: "100%",
              //   height: "auto",
              //   objectFit: "cover",
              // }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselEffect;
