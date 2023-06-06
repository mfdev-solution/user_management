import { Layout, theme, Tabs } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import { InternList } from "../../components/contrat/InternList";
import { GenerateContract } from "../../components/contrat/GenerateContract";
import "./gwte.css";
const { TabPane } = Tabs;

export const GestionContrat = () => {
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
                  <TabPane tab="Liste des stagiaires" key="1">
                     <InternList />
                  </TabPane>
                  <TabPane tab="Contrat stage" key="2">
                     <GenerateContract />
                  </TabPane>
                  <TabPane tab="Tab 3" key="3">
                     Content of Tab Pane 3
                  </TabPane>
               </Tabs>
            </div>
            <Outlet />
         </>
      </Content>
   );
};
