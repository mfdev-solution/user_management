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

   const columns = [
      // {
      //    title: "Prénom",
      //    dataIndex: ["contratStage", "stagiaire", "prenom"], // Access nested property
      //    key: "prenom",
      // },
      // {
      //    title: "Nom",
      //    dataIndex: ["contratStage", "stagiaire", "nom"], // Access nested property
      //    key: "nom",
      // },
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
               <Button
                  style={{
                     backgroundColor: "rgba(0,151,149,0.9)",
                     color: "white",
                  }}
                  onClick={() => download(record)}
               >
                  Télécharger
               </Button>
            </Space>
         ),
      },
   ];
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
               // console.log(response.data);
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
         <div
            // style={{
            //    display: "flex",
            //    flexDirection: "column",
            // }}
            className="container-fluid mt-5"
         >
            <div className="row">
               {Object.entries(reducedData).map(([key, item]) => (
                  <div className="col-6 mb-5 ">
                     {console.log(key)}
                     <p style={{ textAlign: "center" }}>{key}</p>
                     <Table dataSource={item} columns={columns} />
                  </div>
               ))}
            </div>
         </div>
      </>
   );
};
