import React, { useEffect, useRef, useState } from "react";
import { Button, Empty, Modal, Space, Table } from "antd";
import {
   cancelPropostionStage,
   getAllPropositionStageGwte,
} from "../../services/contratStage";
import { formatDate } from "../../utils/dateFormat";
import { render } from "@testing-library/react";
import { EditContrat } from "../../components/contrat/EditContrat";

export const GestionDemandeIterne = () => {
   const flag = useRef(false);
   const [listProposition, setListProposition] = useState([]);
   const [loading, setLoding] = useState(true);
   useEffect(() => {
      if (flag.current === false) {
         getAllPropositionStageGwte().then((response) => {
            console.log(response.data);
            setListProposition(response.data);
            setLoding(false);
         });
      }
      return () => (flag.current = true);
   }, []);
   const columns = [
      {
         title: "Date de début",
         dataIndex: "dateDebut",
         key: "dateDebut",
         render: (dateDebut) => <span>{formatDate(dateDebut)}</span>,
      },
      {
         title: "Date de fin",
         dataIndex: "dateFin",
         key: "dateFin",
         render: (dateFin) => <span>{formatDate(dateFin)}</span>,
      },
      {
         title: "Nom du stagiaire",
         key: "stagiaire",
         render: (_, contrat) => (
            <span>
               {contrat.stagiaire.nom} {contrat.stagiaire.prenom}
            </span>
         ),
      },
      {
         title: "Nom de la structure du manager",
         //  dataIndex: "gwte.structure.nomStructure",
         key: "nomStructure",
         render: (_, contrat) => (
            <span>{contrat.stagiaire.manager.structure.nomStructure}</span>
         ),
      },
      {
         title: "Nom et prénom du manager",
         key: "manager",
         render: (_, contrat) => (
            <span>
               {contrat.stagiaire.manager.lastName}{" "}
               {contrat.stagiaire.manager.firstName}
            </span>
         ),
      },
      {
         title: "Actions",
         key: "actions",
         render: (_, contrat) => (
            <Space>
               <Button
                  type="primary"
                  onClick={() => {
                     render(<EditContrat data={contrat} open={true} key={1} />);
                  }}
               >
                  Modifier
               </Button>
               <Button
                  type="primary"
                  danger
                  onClick={() => handleCancel(contrat)}
               >
                  Annuler
               </Button>
            </Space>
         ),
      },
   ];

   // Event handler for cancel action
   const handleCancel = (contrat) => {
      // Implement your logic for canceling the contrat
      Modal.confirm({
         title: "Cancel Contract",
         content: "Are you sure you want to cancel this contract?",
         onOk: () => {
            contrat.gwte = null;
            contrat.stagiaire.manager = null;
            contrat.stagiaire.etat = "enCours";
            cancelPropostionStage(contrat.id, contrat)
               .then((response) => {
                  console.log(response.data);
               })
               .catch((error) => {
                  console.log(error);
               });
         },
         onCancel: () => {
            console.log("cancelled");
         },
      });
      //   console.log("Cancel contrat:", contrat);
   };
   return (
      <>
         {listProposition ? (
            <Table
               columns={columns}
               dataSource={listProposition}
               loading={loading}
            />
         ) : (
            <Empty />
         )}
      </>
   );
};
