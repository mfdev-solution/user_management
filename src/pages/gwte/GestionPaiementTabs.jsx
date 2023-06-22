import { Layout, theme, Tabs } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import { GestionPayement } from "../../components/gwte/GestionPayement";
import { GestionPayementWaitListe } from "../../components/gwte/GestionPayementWaitListe";
const { TabPane } = Tabs;

export const GestionPaiementTabs = () => {
   const { Content } = Layout;
   function callback(key) {
      console.log(key);
   }
   const {
      token: { colorBgContainer },
   } = theme.useToken();
   return (
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
                  <TabPane tab="Gestion paiement" key="1">
                     <GestionPayement />
                  </TabPane>
                  <TabPane tab="Liste paiement" key="2">
                     <GestionPayementWaitListe />
                  </TabPane>
               </Tabs>
            </div>
            <Outlet />
         </>
      </Content>
   );
};
