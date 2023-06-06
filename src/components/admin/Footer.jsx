import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

export const AFooter = () => {
   const footerStyle = {
      textAlign: "center",
      color: "#fff",
      backgroundColor: "#2d928e", //2d928e 7dbcea
      display: "sti",
      bottom: 0,
      // position: "sticky",
      height: 50,
   };
   return <Footer style={footerStyle}>Footer</Footer>;
};
