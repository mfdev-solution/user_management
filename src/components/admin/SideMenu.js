import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, theme } from 'antd';
import {
    AppstoreOutlined,
    CheckCircleOutlined,
    LineChartOutlined,
    FileSearchOutlined,
    MoneyCollectOutlined,
    BarChartOutlined,
    SafetyCertificateFilled,
    UnorderedListOutlined,
    FileTextOutlined,
    FileDoneOutlined
} from '@ant-design/icons';

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
    getItem('Historiques', '4', <BarChartOutlined style={{ fontSize: 20, color: "rgb(45, 146, 142)" }} />),
    getItem('Validation stages', 'sub1', <CheckCircleOutlined style={{ fontSize: 20, color: "rgb(45, 146, 142)" }} />, [
        getItem('Demandes externes', '1', <FileSearchOutlined style={{ fontSize: 20, color: "rgb(45, 146, 142)" }} />),
        getItem('Suivi stagiaire', '2', <LineChartOutlined style={{ fontSize: 20, color: "rgb(45, 146, 142)" }} />),
        getItem('gestion contrats', '3', <FileTextOutlined style={{ fontSize: 20, color: "rgb(45, 146, 142)" }} />),
        getItem('Gestion paiement', '7', <MoneyCollectOutlined style={{ fontSize: 20, color: "rgb(45, 146, 142)" }} />),
    ]),
    getItem('Demandes internes', 'sub2', <AppstoreOutlined style={{ fontSize: 20, color: "rgb(45, 146, 142)" }} />, [
        getItem('List Demandes', '5', <UnorderedListOutlined style={{ fontSize: 20, color: "rgb(45, 146, 142)" }} />),
        getItem('Suivi prosition stage', '6', <SafetyCertificateFilled style={{ fontSize: 20, color: "rgb(45, 146, 142)" }} />),
    ]),
    getItem('Attestation fin stage', '8', <FileDoneOutlined style={{ fontSize: 20, color: "rgb(45, 146, 142)" }} />),
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
        } else if (key === "8") {
            navigate("/gwte/attestation-fin-stage")
        }
    };
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{
                position: 'sticky',
                left: 0,
                top: 0,
                height: '100vh',
                width: "300px"
            }} >
            <div
                style={{
                    height: 32,
                    margin: 16,
                    background: 'rgba(255, 255, 255, 0.2)',
                }}
            />
            <Menu theme="dark" color="#FFF" openKeys={openKeys}
                onOpenChange={onOpenChange}
                onClick={({ key }) => handleMenuClick(key)}
                defaultSelectedKeys={['4']}
                mode="inline" items={items} />
        </Sider>)
}
