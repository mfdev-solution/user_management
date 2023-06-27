import { Image, Space, Typography, Drawer } from "antd";
import { useState, useEffect, useRef } from "react";
import userImage from "../../assets/user.png";
const { Text } = Typography;

export const MessageDrawer = ({ getAllMessages }) => {
   const flag = useRef(false);
   const [messages, setMessages] = useState([]);
   useEffect(() => {
      if (flag.current === false) {
         getAllMessages()
            .then((response) => {
               setMessages(response.data);
               console.log(response.data);
            })
            .catch((error) => {
               console.log(error);
            });
      }

      return () => (flag.current = true);
   }, [getAllMessages]);
   const MessageCard = ({ message }) => {
      return (
         <>
            <Space
               style={{
                  display: "flex",
                  justifyContent: "start",
                  borderRadius: "5px",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderBottom: "3px solid rgba(0, 0, 0, 0.15)",
                  borderRight: "3px solid rgba(0, 0, 0, 0.15)",
               }}
            >
               <Space>
                  <Image
                     style={{
                        width: 45,
                        height: "auto",
                     }}
                     src={userImage}
                  />
               </Space>
               <Space
                  style={{
                     display: "flex",
                     flexFlow: "column",
                     alignItems: "start",
                  }}
               >
                  <Space>
                     {message.manager.firstName} {message.manager.lastName}
                  </Space>
                  <Space>
                     {" "}
                     <Text type="secondary">
                        {message.contenu.substring(0, 30)}...
                     </Text>
                  </Space>
               </Space>
            </Space>
         </>
      );
   };
   return (
      <>
         {messages.map((message) => (
            <>
               <MessageCard message={message} key={message.id} />
            </>
         ))}
      </>
   );
};
