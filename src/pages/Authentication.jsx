import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { isLoged } from "../services/";

import { Layout, Input, Space, Button } from "antd";
import ModalAddStudentForm from "../components/ModalAddStudentForm";
import sonatelImage from "../assets/images/sonatel1.jpg";
import logogSonatel from "../assets/images/LOGO_SONATEL.png";
import { render } from "@testing-library/react";
import { Header } from "antd/es/layout/layout";
import ImageCarousel from "../components/ImageCarousel";
import { AuthenticationComponent } from "../components/AuthenticationComponent";
import { LoginOutlined, BookOutlined } from "@ant-design/icons";
const Authentication = () => {
   const { Content } = Layout;

   const [authOped, setauthOped] = useState(false);

   if (isLoged()) {
      return <Navigate to={"/gwte"} />;
   }

   return (
      <Layout
         style={{
            backgroundImage: `url(${sonatelImage})`,
            backgroundColor: "rgba(254,62,20,.4)",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            width: "100vw",
            height: "100vh", // occupe toute la hauteur de l'écran
         }}
      >
         <Header
            style={{
               zIndex: 9999,
               width: "100vw",
               position: "absolute",
               backgroundColor: "#009791", //#f7640100
               display: "flex",
               justifyContent: "space-between",
            }}
         >
            <Space>
               <img
                  style={{
                     width: "150px",
                     color: "#fff",
                  }}
                  src={logogSonatel}
                  alt="logo"
               />
            </Space>
            <Space style={{ display: "flex", columnGap: "30px" }}>
               <Button
                  style={{
                     backgroundColor: "#fff", //f76401009791 009791 f76401
                     color: "#009791",
                     width: "200px",
                     height: "40px",
                     fontSize: 18,
                     fontWeight: "bold",
                     border: 0,
                     maxWidth: "auto",
                  }}
                  type="button"
                  onClick={() => {
                     render(<AuthenticationComponent opened={true} />);
                  }}
                  icon={<LoginOutlined />}
               >
                  Connexion
               </Button>
               <Button
                  style={{
                     backgroundColor: "#fff",
                     color: "#009791",
                     width: "auto",
                     height: "40px",
                     fontSize: 18,
                     fontWeight: "bold",
                     border: 0,
                  }}
                  icon={
                     <BookOutlined style={{ fontSize: 24, color: "#009791" }} />
                  }
                  type="button"
                  value={"Demander Stage"}
                  onClick={() => render(<ModalAddStudentForm open={true} />)}
               >
                  Demander Stage
               </Button>
            </Space>
         </Header>
         <Content
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "end",
            }}
         >
            <div
               style={{
                  width: "50vw",
                  height: "65vh",
                  justifyContent: "center",
                  borderRadius: "10px",
                  margin: "50px",
                  padding: "50px",
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: "30px",
               }}
            >
               <ImageCarousel />
            </div>
         </Content>
      </Layout>
   );
};
export default Authentication;
