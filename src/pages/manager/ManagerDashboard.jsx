import React, { useState, useEffect, useRef } from "react";
import { getDemandeInterneStatsByManager } from "../../services/StagiaireService";
import { Space } from "antd";
import { getAllAttestationByManager } from "../../services/ManagerService";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { CategoryScale, LinearScale, BarElement, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title);
export const ManagerDashboard = () => {
   const [demandeIntern, setDemandeIntern] = useState([]);
   const [attestations, setattestations] = useState([]);
   const flag = useRef(false);
   useEffect(() => {
      if (flag.current === false) {
         getDemandeInterneStatsByManager().then((response) => {
            setDemandeIntern(response.data);
         });
         getAllAttestationByManager()
            .then((response) => {
               const datas = response.data;
               setattestations(
                  datas.reduce((acc, item) => {
                     const { nom, prenom } = item.contratStage.stagiaire;
                     const idef = nom + " " + prenom;
                     if (!acc[idef]) {
                        acc[idef] = [];
                     }
                     acc[idef].push(item);
                     return acc;
                  }, {})
               );
            })
            .catch((err) => {
               console.log(err);
            });
      }
      return () => (flag.current = true);
   }, []);

   const data = {
      labels: ["En cours ", "Acceptee", "Rejetee"],
      datasets: [
         {
            label: "Attestations de presences",
            data: [
               demandeIntern.enCours,
               demandeIntern.acceptee,
               demandeIntern.rejetee,
            ],
            backgroundColor: ["#002140", "#009791", "#FF663E"],
            borderColor: ["#002140", "#009791", "#FF663E"],
            borderWidth: 1,
         },
      ],
   };

   const labels = Object.entries(attestations).map(
      ([attestation, _]) => attestation
   );

   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: "top",
         },
         title: {
            display: true,
            text: "statistique des attestations ",
         },
      },
   };

   const data1 = {
      labels,
      datasets: [
         {
            label: "Nombre d'attestations par stagiaire",
            data: Object.entries(attestations).map(([_, item]) => item.length),
            backgroundColor: "#009791",
         },
      ],
   };

   return (
      <Space
         className="d-flex justify-content-around justify-items-center mt-5"
         style={{
            height: "60vh",
            justifyItems: "center",
         }}
      >
         <Space size={"large"}>
            <Doughnut data={data} />
         </Space>
         <Space size={"large"}>
            <div style={{ width: "500px", height: "auto" }}>
               <Bar options={options} data={data1} />;
            </div>
         </Space>
      </Space>
   );
};
