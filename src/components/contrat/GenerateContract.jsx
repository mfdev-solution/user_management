import React, { useEffect, useState, useRef } from "react";
import { Table, Space, Button, Modal, Empty } from "antd";
import {
   getAllContracts,
   downloadContractService,
} from "../../services/contratStage";
import "../../assets/css/table.css";
export const GenerateContract = () => {
   const [internList, setInternList] = useState([null]);
   const [loading, setLoading] = useState(true);
   const flag = useRef(false);
   const [opened, setOpened] = useState(false);

   const downloadOneContract1 = (values) => {
      const fileName =
         values.stagiaire.nom + "_" + values.stagiaire.prenom + ".pdf";
      setLoading(true);
      downloadContractService(values.id).then((response) => {
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
   };

   useEffect(() => {
      if (flag.current === false) {
         setLoading(true);
         getAllContracts()
            .then((response) => {
               setInternList(response.data);
               setLoading(false);
            })
            .catch((error) => console.log(error));
      }
      return () => (flag.current = true);
   }, []);

   const columns = [
      { title: "Nom", dataIndex: ["stagiaire", "nom"], key: "nom" },
      { title: "Prénom", dataIndex: ["stagiaire", "prenom"], key: "prenom" },
      {
         title: "Lieu de naissance",
         dataIndex: ["stagiaire", "lieuNaissance"],
         key: "lieuNaissance",
      },
      { title: "CNI", dataIndex: ["stagiaire", "cni"], key: "cni" },
      { title: "Adresse", dataIndex: ["stagiaire", "adresse"], key: "adresse" },
      {
         title: "Nationalité",
         dataIndex: ["stagiaire", "nationalite"],
         key: "nationalite",
      },
      {
         title: "Formation en cours",
         dataIndex: ["stagiaire", "formationEnCours"],
         key: "formationEnCours",
      },
      { title: "École", dataIndex: ["stagiaire", "ecole"], key: "ecole" },
      {
         title: "Niveau d'études",
         dataIndex: ["stagiaire", "niveauEtude"],
         key: "niveauEtude",
      },
      {
         title: "Structure",
         dataIndex: "stagiaire?.manager?.structure?.nomStructure",
         render: (text, record) => (
            <span>{record?.stagiaire?.manager?.structure?.nomStructure}</span>
         ),
         key: "structure",
      },
      {
         title: "Action",
         key: "action",
         render: (text, record) => (
            <Space size="middle">
               {record != null && (
                  <>
                     <Button
                        type="primary"
                        style={{ backgroundColor: "rgba(0,151,149,0.9)" }}
                        onClick={() => downloadOneContract1(record)}
                        onLoad={loading}
                     >
                        Generer contrat
                     </Button>
                     <Button
                        type="primary"
                     >
                        Envoyer
                     </Button>
                  </>
               )}
            </Space>
         ),
      },
   ];
   return (
      <div className="table-container">
         {internList.length > 0 ? (
            <>
               <Table
                  loading={loading}
                  dataSource={internList}
                  pagination={{ pageSize: 7 }}
                  columns={columns}
                  scroll={{ x: true }}
               />

               <Modal
                  onCancel={() => setOpened(false)}
                  open={opened}
                  width={"75vw"}
                  style={{ display: "block", justifyContent: "center" }}
                  footer={null}
               ></Modal>
            </>
         ) : (
            <Empty />
         )}
      </div>
   );
};
