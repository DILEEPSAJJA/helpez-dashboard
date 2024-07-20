import React from "react";
import "../styles/hero.css";

const Hero = () => {
  const images = [
    "../images/anim1.png",
    "../images/anim2.png",
    "../images/anim3.png",
    "../images/anim4.png",
  ];
  return (
    <div className="hero-header78">
      <div className="hero-content1">
        <div className="hero-row-container thq-animated-group-container-horizontal thq-mask-image-horizontal">
          <div className="thq-animated-group-horizontal">
            {images.map((image, index) => {
              return (
                <img
                  key={`image-home${index}`}
                  alt="image"
                  src={image}
                  className="hero-placeholder-image thq-img-scale thq-img-ratio-1-1 mx-1"
                />
              );
            })}
          </div>
          <div className="thq-animated-group-horizontal">
            {images.map((image, index) => {
              return (
                <img
                  key={`image-home${index}`}
                  alt="image"
                  src={image}
                  className="hero-placeholder-image thq-img-scale thq-img-ratio-1-1 mx-1"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
