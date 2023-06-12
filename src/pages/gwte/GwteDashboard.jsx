import { Card, Layout, Progress, Space, Typography, theme } from "antd";
import { useState, useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Outlet } from "react-router-dom";
import {
   getDemandeInterneStats,
   getStatsEtat,
} from "../../services/StagiaireService";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import {
   UserOutlined,
   CheckCircleOutlined,
   CloseCircleOutlined,
   HourglassOutlined,
   PlusCircleOutlined,
} from "@ant-design/icons";
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

export const GwteDashboard = ({ user }) => {
   const { Content } = Layout;
   const [statsEtat, setStatsEtat] = useState({});
   const [statsEtatReduced, setstatsEtatReduced] = useState([]);
   const [demandeInterne, setdemandeInterne] = useState({});
   const flag = useRef(false);

   const {
      token: { colorBgContainer },
   } = theme.useToken();

   useEffect(() => {
      if (flag.current === false) {
         getStatsEtat().then((response) => {
            setStatsEtat(response.data);
            let datas = response.data;
            setstatsEtatReduced(datas.reduce((acc, item) => {}));
         });
         getDemandeInterneStats()
            .then((response) => {
               console.log(response.data);
               setdemandeInterne(response.data);
            })
            .catch((err) => {
               console.log(err);
            });
      }
      return () => (flag.current = true);
   }, []);
   const total =
      statsEtat.enCours +
      statsEtat.accepte +
      statsEtat.rejete +
      statsEtat.enProposition +
      statsEtat.complet;
   const labels = [
      "en cours",
      "accepte",
      "rejete",
      "en proposition",
      "complet",
   ];
   const data = {
      labels,
      datasets: [
         {
            label: "Histogramme des demandes de stage",
            data: [
               statsEtat.enCours,
               statsEtat.accepte,
               statsEtat.rejete,
               statsEtat.enProposition,
               statsEtat.complet,
            ],
            backgroundColor: "rgba(0, 151, 145, 1)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
         },
      ],
   };
   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: "bottom",
         },
         title: {
            display: true,
            text: "statistique des demande de stages ",
         },
      },
   };
   const data2 = {
      labels: ["En cours", "Acceptee", "Rejetee"],
      datasets: [
         {
            data: [
               demandeInterne.enCours,
               demandeInterne.acceptee,
               demandeInterne.rejetee,
            ],
            backgroundColor: ["#002140", "#009791", "#FF663E"],
            hoverBackgroundColor: ["#002140", "#009791", "#FF663E"],
         },
      ],
   };

   const options2 = {
      responsive: true,
      tooltips: {
         callbacks: {
            label: function (tooltipItem, data) {
               // Get the dataset for the current tooltip item
               const dataset = data.datasets[tooltipItem.datasetIndex];

               // Get the total value for all data in the dataset
               const total = dataset.data.reduce(
                  (previousValue, currentValue) => previousValue + currentValue
               );

               // Get the value for the current data point
               const currentValue = dataset.data[tooltipItem.index];

               // Calculate the percentage value for the current data point
               const percentage = Math.floor(
                  (currentValue / total) * 100 + 0.5
               );

               // Return the label with the percentage value
               return `${dataset.label}: ${currentValue} (${percentage}%)`;
            },
         },
      },
      plugins: {
         legend: {
            position: "bottom",
            display: "block",
         },
         title: {
            display: true,
            text: "statistique des demandes internes de stages ",
         },
      },
   };

   const DashboardCard = ({
      title,
      value,
      icon,
      borderColor,
      backgroundColor,
   }) => {
      return (
         <Card
            title={title}
            bordered={true}
            style={{ border: `5px ${borderColor}` }}
         >
            <p>Nombre de stagiaires: {value}</p>
            <div
               style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "50px",
                  color: icon.props.style.color,
                  borderRadius: 20,
                  padding: 8,
               }}
            >
               <div style={{ flex: 1 }}>
                  <Progress
                     size={50}
                     strokeColor={backgroundColor}
                     type="circle"
                     percent={(value * 100.0) / total}
                  />
               </div>
               <div style={{ marginLeft: 16 }}>{icon}</div>
            </div>
         </Card>
      );
   };
   return (
      <Content
         style={{
            margin: "24px 16px",
            minHeight: 280,
            background: colorBgContainer,
            justifyContent: "space-between",
            alignItems: "start",
         }}
      >
         <Space size={10} direction="vertical" style={{ width: "80vw" }}>
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Space
               direction="horizontal"
               className="d-flex justify-content-between"
               style={{ flexWrap: "wrap" }}
            >
               <DashboardCard
                  icon={
                     <UserOutlined
                        style={{ fontSize: "50px", color: "#1890ff" }}
                     />
                  }
                  title={"En cours"}
                  value={statsEtat.enCours}
                  borderColor={"inset #002140"}
                  backgroundColor={"#002140"}
               />
               <DashboardCard
                  icon={
                     <CheckCircleOutlined
                        style={{ fontSize: "50px", color: "#52c41a" }}
                     />
                  }
                  title={"Accepté"}
                  value={statsEtat.accepte}
                  borderColor={"outset #009791"}
                  backgroundColor={"#009791"}
               />
               <DashboardCard
                  icon={
                     <CloseCircleOutlined
                        style={{ fontSize: "50px", color: "#f5222d" }}
                     />
                  }
                  title={"Rejeté"}
                  value={statsEtat.rejete}
                  borderColor={"inset #f5222d"}
                  backgroundColor={"rgba(0,255,255,0.25)"}
               />
               <DashboardCard
                  icon={
                     <HourglassOutlined
                        style={{ fontSize: "50px", color: "#faad14" }}
                     />
                  }
                  title={"En proposition"}
                  value={statsEtat.enProposition}
                  borderColor={"outset #faad14"}
                  backgroundColor={"rgba(255,0,0,0.25)"}
               />
               <DashboardCard
                  icon={
                     <PlusCircleOutlined
                        style={{ fontSize: "50px", color: "#722ed1" }}
                     />
                  }
                  title={"Complet"}
                  value={statsEtat.complet}
                  borderColor={"inset #722ed1"}
                  backgroundColor={"rgba(255,0,0,0.25)"}
               />
            </Space>
         </Space>
         <Space className="d-flex justify-content-evenly mt-5">
            <Space size={"large"}>
               <div style={{ width: "500px", height: "auto" }}>
                  <Bar options={options} data={data} />;
               </div>
            </Space>
            <Space size={"large"}>
               <Doughnut data={data2} options={options2} />
            </Space>
         </Space>
         <Outlet />
      </Content>
   );
};
