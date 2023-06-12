import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, theme } from 'antd';
import { SettingOutlined, AppstoreOutlined, CheckCircleOutlined, MoneyCollectOutlined } from '@ant-design/icons';

const { Sider } = Layout;
function getItem(label, key, icon, children, type) {
    const hasChildren = children && children.length > 0;
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Historiques', '4', <AppstoreOutlined />),
    getItem('Validation', 'sub1', <CheckCircleOutlined />, [
        getItem('Demandes', '1'),
        getItem('Suivi demandes', '2'),
        getItem('gestion contrat', '3'),
        getItem('Gestion payement', '7', <MoneyCollectOutlined />),
    ]),
    getItem('Demande interne', 'sub2', <AppstoreOutlined />, [
        getItem('List Demandes', '5'),
        getItem('Suivi prosition stage', '6'),
    ]),
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
];
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4', "sub5"];
export const SideMenu = ({ collapse }) => {
    const [collapsed, setCollapsed] = useState(collapse)
    const navigate = useNavigate();
    const [openKeys, setOpenKeys] = useState([]);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    const handleMenuClick = (key) => {
        if (key === "1") {
            navigate("/gwte/demande-stage");
        } else if (key === "2") {
            navigate("/gwte/demande-stage/suivis");
        }
        else if (key === "3") {
            navigate("/gwte/contrat-stage");
        } else if (key === "4") {
            navigate("/gwte")
        } else if (key === "5") {
            navigate("/gwte/demande-interne");
        } else if (key === "6") {
            navigate("/gwte/suivi-demande")
        } else if (key === "7") {
            navigate("/gwte/payment");
        }
    };
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}  >
            <div
                style={{
                    height: 32,
                    margin: 16,
                    background: 'rgba(255, 255, 255, 0.2)',
                }}
            />
            <Menu theme="dark" color="#FFF" openKeys={openKeys}
                onOpenChange={onOpenChange}
                onClick={({ key }) => handleMenuClick(key)} defaultSelectedKeys={['4']} mode="inline" items={items} />
        </Sider>)
}
