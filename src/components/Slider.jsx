import styles from "./Slider.module.css";
import { useState,useEffect } from "react";

import p1 from "../assets/1.png";
import p2 from "../assets/2.png";
import p3 from "../assets/3.png";
import p4 from "../assets/4.png";
import p5 from "../assets/5.png";

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 4 ? 0 : prevSlide + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 4 : prevSlide - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const renderSlide = (slideIndex) => {
    const imagePaths = [
      p1,p2,p3,p4,p5
    ];

    return <img src={imagePaths[slideIndex]} alt={`Slide ${slideIndex}`} />;
  };

  return (
    <div>
      <div>{renderSlide(currentSlide)}</div>
    </div>
  );
};

