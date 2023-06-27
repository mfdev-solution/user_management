import React, { useEffect, useRef, useState } from "react";
import { getAllAttestationByManager } from "../../services/ManagerService";
import { Button, Space, Table } from "antd";
import { formatDate } from "../../utils/dateFormat";
import { downloadAttestationPresenceService } from "../../services/AttestationStageService";

export const GestionAttesttationPressence = () => {
   const [listAttestation, setListAttestations] = useState([]);
   const flag = useRef(false);
   const [loading, setLoading] = useState(true);
   const [reducedData, setReducedData] = useState([]);
   //    const etat = "enCours";
   const getButtonType = (etat) => {
      switch (etat) {
         case "enCours":
            return "#1890ff";
         // case "valide":
         //    return "#52c41a";
         case "modifie":
            return "#f5222d";
         case "valide":
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
         title: "date de debut",
         dataIndex: "dateDebut",
         render: (text, record) => <span>{formatDate(record?.dateDebut)}</span>,
         key: "dateDebut",
      },
      {
         title: "date de fin",
         dataIndex: "dateFin",
         render: (text, record) => <span>{formatDate(record?.dateFin)}</span>,
         key: "dateFin",
      },
      {
         title: "Nom Structure",
         dataIndex: [
            "contratStage",
            "stagiaire",
            "manager",
            "structure",
            "nomStructure",
         ], // Access nested property
         key: "nomStruct",
      },
      {
         title: "État",
         dataIndex: "etatAttestationPresence",
         key: "etatAttestationPresence",
         render: (etatAttestationPresence) => (
            <Button
               className="btn"
               style={{
                  backgroundColor: getButtonType(etatAttestationPresence),
                  color: "#fff",
               }}
               type={getButtonType(etatAttestationPresence)}
            >
               {getButtonValue(etatAttestationPresence)}
            </Button>
         ),
      },
      {
         title: "Action",
         key: "action",
         render: (text, record) => (
            <Space
               size="middle"
               style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               {record.etatAttestationPresence === "modifie" && (
                  <Button
                     className="btn"
                     style={{
                        backgroundColor: "rgba(255,5,5,0.9)",
                        color: "white",
                     }}
                     onClick={() => modify(record)}
                  >
                     Modifier
                  </Button>
               )}
               {record.etatAttestationPresence === "valide" && (
                  <Button
                     className="btn"
                     style={{
                        backgroundColor: "rgba(0,151,149,0.9)",
                        color: "white",
                     }}
                     onClick={() => download(record)}
                     disabled={
                        record.etatAttestationPresence === "valide"
                           ? ""
                           : "disabled"
                     }
                  >
                     Télécharger
                  </Button>
               )}
               {record.etatAttestationPresence === "enCours" && (
                  <Button
                     className="btn"
                     style={{
                        backgroundColor: "rgba(0,151,149,0.9)",
                        color: "white",
                     }}
                     onClick={() => console.log(record)}
                  >
                     en Attente
                  </Button>
               )}
            </Space>
         ),
      },
   ];

   const modify = (values) => {
      console.log("modified", values);
   };
   const download = (values) => {
      const fileName =
         values.contratStage.stagiaire.nom +
         "_" +
         values.contratStage.stagiaire.prenom +
         "_" +
         formatDate(values.dateDebut) +
         "_au_" +
         formatDate(values.dateFin) +
         ".pdf";
      setLoading(true);
      downloadAttestationPresenceService(values).then((response) => {
         const pdfBlob = response.data;
         const pdfUrl = URL.createObjectURL(pdfBlob);
         const a = document.createElement("a");
         a.href = pdfUrl;
         a.download = fileName;
         document.body.appendChild(a);
         a.click();
         document.body.removeChild(a);
         setLoading(false);
      });
      console.log(values);
   };

   useEffect(() => {
      if (flag.current === false) {
         getAllAttestationByManager()
            .then((response) => {
               setListAttestations(response.data);
               let datas = response.data;
               setReducedData(
                  datas.reduce((acc, item) => {
                     const { nom, prenom } = item.contratStage.stagiaire;
                     const idef = prenom + " " + nom;
                     if (!acc[idef]) {
                        acc[idef] = [];
                     }
                     acc[idef].push(item);
                     return acc;
                  }, {})
               );
            })
            .catch((error) => {
               console.log(error);
            });
      }
      return () => (flag.current = true);
   }, []);

   return (
      <>
         <div className="container-fluid mt-5">
            <div className="row">
               {Object.entries(reducedData).map(([key, item]) => (
                  <div className="col-6 mb-5 ">
                     {console.log(item)}
                     <p style={{ textAlign: "center" }}>{key}</p>
                     <Table dataSource={item} columns={columns} />
                  </div>
               ))}
            </div>
         </div>
      </>
   );
};
