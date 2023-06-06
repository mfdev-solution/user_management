import React,{useState} from "react";
import { Layout,  Button,} from 'antd';
import { useNavigate } from "react-router-dom";
import { isLoged ,logout} from "../../services";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
  } from '@ant-design/icons';
  
const {  Header } = Layout;

export const AHeader = ({user}) => {
    const [collapsed, setCollapsed] = useState(false);
    const naviger = useNavigate();
    const toLogout = () => {
        logout();
        naviger("/users/auth",{replace:true})
       
     };
    const headerStyle = {
        color: '#fff',
        height: 64,
        paddingInline: 50,
        lineHeight: '64px',
        backgroundColor: '#009791',
        padding:0,
      };
   return<Header style={headerStyle}>
    <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
    Header {isLoged()?(<span onClick={toLogout}>  Deconnexion </span>):("")}  <span>{user.firstName}</span> 
    </Header>;
};
