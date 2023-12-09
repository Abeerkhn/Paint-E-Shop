import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimpleSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        <div>
          <img
            src="/images/walpaper1.jpg"
            alt="batman"
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
          />
        </div>
        <div>
          <img
            src="/images/walpaper2.jpg"
            alt="batman"
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
          />
        </div>
        <div>
          <img
            src="/images/walpaper3.jpg"
            alt="batman"
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
          />
        </div>
        <div>
          <img
            src="/images/walpapaer4.jpg"
            alt="batman"
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
          />
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
