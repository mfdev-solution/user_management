import React from "react";
import { Layout, theme, Tabs } from "antd";
import { ListProposition } from "../../components/Manager/ListProposition";
import { ListStagiaires } from "../../components/Manager/ListStagiaires";
import { DemandeStagiare } from "../../components/Manager/DemandeStagiare";
import { ListDemandeStagiaire } from "../../components/Manager/ListDemandeStagiaire";

const { TabPane } = Tabs;

export const GestionStagiare = () => {
   const { Content } = Layout;
   const {
      token: { colorBgContainer },
   } = theme.useToken();

   function callback(key) {
      console.log(key);
   }

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
                  <TabPane key="1" tab="Proposition de stage">
                     <ListProposition />
                  </TabPane>
                  <TabPane key="2" tab="Contrat stage">
                     <ListStagiaires />
                  </TabPane>
                  <TabPane key="3" tab="Demander Stagiaire">
                     <DemandeStagiare />
                  </TabPane>
                  <TabPane key="4" tab="Liste des demandes">
                     <ListDemandeStagiaire />
                  </TabPane>
               </Tabs>
            </div>
            {/* <Outl /> */}
         </>
      </Content>
   );
};
