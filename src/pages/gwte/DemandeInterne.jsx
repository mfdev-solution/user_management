import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Space, Table } from "antd";
import {
   getAllDemandesInternes,
   updateDemandeInterne,
} from "../../services/DemandeInternService";
import { formatDate, dateFormatFront } from "../../utils/dateFormat";
import "../../assets/css/DemandInternList.css";

export const DemandeInterne = () => {
   const flag = useRef(false);
   const [demandesInternes, setDemandeInternes] = useState([]);
   useEffect(() => {
      if (flag.current === false) {
         getAllDemandesInternes().then((response) => {
            console.log(response);
            setDemandeInternes(response.data);
         });
      }
      return () => (flag.current = true);
   }, []);
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
   const handleAccept = (values) => {
      values.etatDemandeInterne = "acceptee";
      updateDemandeInterne(values)
         .then((response) => {
            setDemandeInternes(
               demandesInternes.filter((demande) => demande.id !== values.id)
            );
            console.log(response);

            return response.data;
         })
         .catch((error) => {
            return error;
         });
   };
   const cancelDemande = (demandeInterne) => {
      demandeInterne.etatDemandeInterne = "rejetee";
      Modal.confirm({
         title: "Annuler  la demande",
         content: "Etes vous sur de vouloir supprimer la demande ?",
         onOk: () => {
            console.log(demandeInterne.id);
            updateDemandeInterne(demandeInterne)
               .then((response) => {
                  console.log(response.data);
                  setDemandeInternes(
                     demandesInternes.map((demande) => {
                        if (demande.id === demandeInterne.id) {
                           demande.etatDemandeInterne = "rejetee";
                        }
                        return demande;
                     })
                  );
               })
               .catch((error) => {
                  console.log(error);
               }); //
         },
         onCancel: () => {
            console.log("cancelled");
         },
      });
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
      {
         title: "Actions",
         key: "action",
         render: (text, record) => (
            <>
               {record && record.etatDemandeInterne.includes("enCours") && (
                  <Space size={"middle"}>
                     <Button
                        type="primary"
                        onClick={() => {
                           handleAccept(record);
                        }}
                     >
                        accepter
                     </Button>

                     <Button
                        type="primary"
                        danger
                        onClick={() => {
                           cancelDemande(record);
                        }}
                     >
                        Annuler
                     </Button>
                  </Space>
               )}
            </>
         ),
      },
   ];
   return (
      <div className="">
         <Table
            dataSource={demandesInternes}
            scroll={{ x: true }}
            columns={columns}
            showHeader
         />
      </div>
   );
};
