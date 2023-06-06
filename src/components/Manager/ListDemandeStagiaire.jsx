import React, { useEffect, useRef, useState } from "react";
import { getAllDemandesInternesByManager } from "../../services/DemandeInternService";
import { Button, Table } from "antd";
import { formatDate } from "../../utils/dateFormat";
import "../../assets/css/DemandInternList.css";

export const ListDemandeStagiaire = () => {
   const flag = useRef(false);
   const [listDemandeStagiaires, seLlistDemandeStagiaires] = useState();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (flag.current === false) {
         setLoading(true);
         getAllDemandesInternesByManager()
            .then((response) => {
               console.log(response.data);
               seLlistDemandeStagiaires(response.data);
               setLoading(false);
            })
            .catch((error) => {
               console.log(error);
            });
      }
      return () => (flag.current = true);
   });
   //    const etat = "enCours";
   const getButtonType = (etat) => {
      switch (etat) {
         case "enCours":
            return "#1890ff";
         case "terminé":
            return "#52c41a";
         case "rejetee":
            return "#f5222d";
         case "acceptee":
            return "green";
         default:
            return "#ffffff";
      }
   };
   const getButtonValue = (etat) => {
      if (etat === "enCours") {
         return "En cours";
      }
      return etat;
   };
   const columns = [
      {
         title: "Date Début",
         dataIndex: "dateDebut",
         key: "dateDebut",
         render: (dateDebut) => <span>{formatDate(dateDebut)}</span>,
         sorter: {
            compare: (a, b) => new Date(a.dateDebut) - new Date(b.dateDebut),
            multiple: 3,
         },
         showOnResponse: true,
         showOnDesktop: true,
      },
      {
         title: "Date Fin",
         dataIndex: "dateFin",
         key: "dateFin",
         render: (dateFin) => <span>{formatDate(dateFin)}</span>,
      },
      {
         title: "Profil",
         dataIndex: "profile",
         key: "profile",
         sorter: (a, b) => a.profile.localeCompare(b.profile),
      },
      {
         title: "Nombre de Stagiaires",
         dataIndex: "nombreStagiaire",
         key: "nombreStagiaire",
         sorter: {
            compare: (a, b) => a.nombreStagiaire - b.nombreStagiaire,
            multiple: 3,
         },
         showOnResponse: true,
         showOnDesktop: true,
      },
      {
         title: "État",
         dataIndex: "etatDemandeInterne",
         key: "etatDemandeInterne",
         render: (etatDemandeInterne) => (
            <Button
               style={{
                  backgroundColor: getButtonType(etatDemandeInterne),
                  color: "#fff",
               }}
               type={getButtonType(etatDemandeInterne)}
            >
               {getButtonValue(etatDemandeInterne)}
            </Button>
         ),
      },
      {
         title: "Manager",
         dataIndex: "manager",
         key: "manager",
         render: (manager) => (
            <span>
               {manager.firstName} {manager.lastName}
            </span>
         ),
      },
      {
         title: "Structure",
         dataIndex: "manager",
         key: "structure",
         render: (manager) => <span>{manager.structure.nomStructure}</span>,
      },
   ];
   return (
      <div className="demand-list-container">
         <Table
            dataSource={listDemandeStagiaires}
            loading={loading}
            scroll={{ x: true }}
            columns={columns}
            showHeader
         />
      </div>
   );
};
