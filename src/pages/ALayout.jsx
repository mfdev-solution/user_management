import { BellFilled, MailOutlined, LogoutOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { logout, isLoged } from "../services";
import user from "../assets/user.png";
import {
   Image,
   Layout,
   theme,
   Badge,
   Space,
   Typography,
   Avatar,
   Drawer,
   Modal,
} from "antd";
import { MessageDrawer } from "../components/messages/MessageDrawer";
import { MessageDrawerTabs } from "../components/messages/MessageDrawerTabs";
import { useState } from "react";
import {} from "./gwte/GwteDashboard";
import { SideMenu } from "../components/admin/SideMenu";
import logo_sonatel from "../assets/images/LOGO_SONATEL_1.png";
import { AFooter } from "../components/admin/Footer";
import { render } from "@testing-library/react";
import { getAllMessagesBGwte } from "../services/MessageService";
const { Header, Content } = Layout;
export const ALayout = () => {
   const [commentsOpen, setCommentsOpen] = useState(false);
   const [notificationsOpen, setNotificationsOpen] = useState(false);
   const naviger = useNavigate();
   const toLogout = () => {
      Modal.confirm({
         title: "Cancel Contract",
         content: "Deconnexion ?",
         onOk: () => {
            logout();
            naviger("/users/auth", { replace: true });
         },
         onCancel: () => {
            console.log("cancelled");
         },
      });
   };
   const [collapsed, setCollapsed] = useState(false);
   const {
      token: { colorBgContainer },
   } = theme.useToken("#002140");
   return (
      <Layout
         style={{
            minHeight: "100vh",
         }}
      >
         <SideMenu collapse={collapsed} />
         <Layout className="site-layout">
            <Header
               style={{
                  position: "sticky",
                  zIndex: 1,
                  width: "100%",
                  height: 70,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "4 20 4 12",
                  borderBottom: "3px solid rgba(0, 0, 0, 0.15)",
                  backgroundColor: colorBgContainer,
               }}
            >
               <Image width={100} src={logo_sonatel} />
               <Typography.Title
                  style={{
                     fontStyle: "revert-layer",
                     color: "#2d928e",
                  }}
               >
                  GWTE DASHBOARD
               </Typography.Title>
               <Space style={{ height: 70 }}>
                  {isLoged() && <Avatar src={user} alt="User Avatar" />}
                  <Badge count={3} dot>
                     <MailOutlined
                        style={{
                           fontSize: 24,
                           color: "rgba(0,151,149,0.9)",
                           marginLeft: 15,
                        }}
                        onClick={() => {
                           render(
                              <MessageDrawerTabs
                                 open={true}
                                 getAllMessages={getAllMessagesBGwte}
                              />
                           );
                        }}
                     />
                  </Badge>
                  <Badge count={4}>
                     <BellFilled
                        style={{
                           fontSize: 24,
                           marginLeft: 15,
                           color: "rgba(0,151,149,0.9)",
                        }}
                        onClick={() => {
                           setNotificationsOpen(true);
                        }}
                     />
                  </Badge>
                  {isLoged() ? (
                     <Badge>
                        <LogoutOutlined
                           key={1}
                           title="Deconnexion"
                           onClick={toLogout}
                           style={{ marginLeft: 15, color: "red" }}
                        />
                     </Badge>
                  ) : (
                     ""
                  )}
               </Space>
            </Header>
            <Content
               style={{
                  marginTop: "44px",
                  marginLeft: "20px",
                  marginRight: "30px",
                  padding: 0,
                  minHeight: 280,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 10,
                  background: colorBgContainer,
                  overflow: "scroll",
                  height: "80vh",
               }}
            >
               <div
                  style={{
                     maxWidth: "100vw",
                     height: "30px",
                     backgroundColor: "#2d928e",
                     display: "flex",
                     justifyContent: "start",
                     paddingLeft: 10,
                     justifyItems: "center",
                     color: "white",
                  }}
               ></div>
               <div
                  style={{
                     margin: 30,
                  }}
               >
                  <Outlet />
               </div>
            </Content>

            <Drawer
               style={{
                  marginTop: 70,
               }}
               title="notifications"
               open={notificationsOpen}
               onClose={() => {
                  setNotificationsOpen(false);
               }}
            ></Drawer>
            <AFooter />
         </Layout>
      </Layout>
   );
};
