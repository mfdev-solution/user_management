import { Layout, theme, Tabs, Drawer } from "antd";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { MessageDrawer } from "./MessageDrawer";
const { TabPane } = Tabs;

export const MessageDrawerTabs = ({ open, getAllMessages }) => {
   const { Content } = Layout;
   const [opened, setOpened] = useState(open);

   function callback(key) {
      console.log(key);
   }
   const {
      token: { colorBgContainer },
   } = theme.useToken();
   return (
      <Drawer
         style={{
            marginTop: 70,
         }}
         title="Messages"
         open={opened}
         onClose={() => {
            setOpened(false);
         }}
         maskClosable
      >
         <Content
            style={{
               borderTopLeftRadius: 10,
               borderTopRightRadius: 10,
               minHeight: 280,
               background: colorBgContainer,
            }}
         >
            <>
               <div>
                  <Tabs
                     className="center d-flex tab"
                     defaultActiveKey="1"
                     onChange={callback}
                  >
                     <TabPane tab="message reçus" key="1">
                        <h6>received messages</h6>
                     </TabPane>
                     <TabPane tab="Message envoyés" key="2">
                        <MessageDrawer getAllMessages={getAllMessages} />
                     </TabPane>
                  </Tabs>
               </div>
               <Outlet />
            </>
         </Content>
      </Drawer>
   );
};
