import { Carousel, Button } from "antd";
import auth from "../assets/images/bgAuth.png";
import {
   ArrowLeftOutlined,
   ArrowRightOutlined,
   PlayCircleOutlined,
   StopOutlined,
} from "@ant-design/icons";
import { useState, useRef } from "react";

const ImageCarousel = () => {
   const carouselRef = useRef(null);
   const [isPlaying, setIsPlaying] = useState(true);

   const handlePrev = () => {
      carouselRef.current.prev();
   };

   const handleNext = () => {
      carouselRef.current.next();
   };

   const handleToggleAutoplay = () => {
      setIsPlaying((prevState) => !prevState);
   };

   const contentStyle = {
      width: "auto",
      height: "auto",
      color: "#fff",
      lineHeight: "160px",
      textAlign: "center",
      background: "#364d79",
   };

   return (
      <div>
         <Carousel autoplay={isPlaying} ref={carouselRef}>
            <div>
               <div style={contentStyle}>
                  <img src={auth} alt="auth 1" />
               </div>
            </div>
            <div>
               <div style={contentStyle}>
                  <img src={auth} alt="auth 1" />
               </div>
            </div>
            <div>
               <div style={contentStyle}>
                  <img src={auth} alt="auth 1" />
               </div>
            </div>
            <div>
               <div style={contentStyle}>
                  <img src={auth} alt="auth 1" />
               </div>
            </div>
         </Carousel>
         <div style={{ textAlign: "center", marginTop: "10px" }}>
            <div
               style={{
                  display: "flex",
                  zIndex: 99999,
                  justifyContent: "space-between",
                  alignItems: "center",
                  top: "25vh",
               }}
            >
               <Button
                  type="primary"
                  shape="circle"
                  icon={<ArrowLeftOutlined />}
                  onClick={handlePrev}
               />
                  <Button
                     type="primary"
                     shape="circle"
                     icon={isPlaying ? <StopOutlined /> : <PlayCircleOutlined />}
                     onClick={handleToggleAutoplay}
                    //  style={{ marginTop: "10px" }}
                  />
               <Button
                  type="primary"
                  shape="circle"
                  icon={<ArrowRightOutlined />}
                  onClick={handleNext}
               />
            </div>
         </div>
      </div>
   );
};

export default ImageCarousel;
