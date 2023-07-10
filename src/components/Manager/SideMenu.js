import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, theme } from 'antd';
import { CheckCircleOutlined, BarChartOutlined, TeamOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const items = [
    { key: '1', label: 'Gestion stagiaires', icon: <TeamOutlined style={{ fontSize: 24, color: "rgb(45, 146, 142)" }} /> },
    { key: '2', label: 'Attestation de presence', icon: <CheckCircleOutlined style={{ fontSize: 20, color: "rgb(45, 146, 142)" }} /> },
    { key: '3', label: 'Historiques', icon: <BarChartOutlined style={{ fontSize: 20, color: "rgb(45, 146, 142)" }} /> },
    // { key: '4', label: 'Historiques', icon: <CheckCircleOutlined /> },
];

export const SideMenu = ({ collapse }) => {
    const [collapsed, setCollapsed] = useState(collapse)
    const navigate = useNavigate();
    const [openKeys, setOpenKeys] = useState([]);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    };
    const handleMenuClick = (key) => {
        if (key === "1") {
            navigate("/manager/gestion-stagiaires");
        } else if (key === "2") {
            navigate("/manager/gestion-attestation");
        }
        else if (key === "3") {
            navigate("/manager/dashboard");
        }
        //  else if (key === "4") {
        //     navigate("/gwte")
        // }
    };
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} >
            <div
                style={{
                    height: 32,
                    margin: 16,
                    background: 'rgba(255, 255, 255, 0.2)',
                }}
            />
            <Menu
                theme="dark"
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                items={items}
                onClick={({ key }) => handleMenuClick(key)}
                defaultSelectedKeys={['1']}
                activeKey="rgba(255, 255, 255, 0.2)"
            />
        </Sider>
    );
};
