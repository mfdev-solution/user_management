import React from "react";
import { useState, useEffect, useRef } from "react";
import { getDemandeInterneStatsByManager } from "../../services/StagiaireService";
import { Doughnut } from "react-chartjs-2";
import { Space } from "antd";
import { getAllAttestationByManager } from "../../services/ManagerService";

export const ManagerDashboard = () => {
   const [demandeIntern, setDemandeIntern] = useState([]);
   const flag = useRef(false);
   
   useEffect(() => {
      if (flag.current === false) {
         getDemandeInterneStatsByManager().then((response) => {
            console.log(response.data);
            setDemandeIntern(response.data);
         });

         getAllAttestationByManager().then((response) => {
            // console.log(response.data);
            response.data.map((attestation) =>
               console.log(attestation.contratStage.stagiaire.prenom)
            );
         });
      }
      return () => (flag.current = true);
   }, []);

   const total =
      demandeIntern.acceptee + demandeIntern.enCours + demandeIntern.rejetee;
   const data2 = {
      labels: ["En cours", "Acceptee", "Rejetee"],
      datasets: [
         {
            data: [
               demandeIntern.enCours,
               demandeIntern.acceptee,
               demandeIntern.rejetee,
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
   };
   function MySectorChart() {
      <div>

         <Doughnut data={data2} options={options2} />
      </div>;
   }
   return (
      <div>
         <Space className="d-flex justify-content-evenly mt-5">
            <MySectorChart />
         </Space>
      </div>
   );
};
