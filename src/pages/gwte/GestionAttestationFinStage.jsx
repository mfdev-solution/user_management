import React, { useRef, useState, useEffect } from "react";
import { getAllAttestationFinStage } from "../../services/AttestationFinStage";
import { Button, Space, Table } from "antd";

export const GestionAttestationFinStage = () => {
   const [attestationFinStages, setAttestationFinStages] = useState([]);
   const flag = useRef(false);
   const [loading, setLoading] = useState(false);
   useEffect(() => {
      if (flag.current === false) {
         setLoading(true);
         getAllAttestationFinStage()
            .then((response) => setAttestationFinStages(response.data))
            .catch((error) => console.log(error));
         setLoading(false);
      }

      return () => (flag.current = true);
   }, []);

   const columns = [
      {
         title: "Nom",
         dataIndex: ["contratStage", "stagiaire", "nom"],
         key: "nom",
      },
      {
         title: "Prénom",
         dataIndex: ["contratStage", "stagiaire", "prenom"],
         key: "prenom",
      },
      {
         title: "Lieu de naissance",
         dataIndex: ["contratStage", "stagiaire", "lieuNaissance"],
         key: "lieuNaissance",
      },
      {
         title: "CNI",
         dataIndex: ["contratStage", "stagiaire", "cni"],
         key: "cni",
      },
      {
         title: "Adresse",
         dataIndex: ["contratStage", "stagiaire", "adresse"],
         key: "adresse",
      },
      {
         title: "Nationalité",
         dataIndex: ["contratStage", "stagiaire", "nationalite"],
         key: "nationalite",
      },
      {
         title: "status",
         dataIndex: "etatAttestationFinStage",
         key: "etatAttestationFinStage",
      },
      {
         title: "Formation en cours",
         dataIndex: ["contratStage", "stagiaire", "formationEnCours"],
         key: "formationEnCours",
      },
      {
         title: "École",
         dataIndex: ["contratStage", "stagiaire", "ecole"],
         key: "ecole",
      },
      {
         title: "Niveau d'études",
         dataIndex: ["contratStage", "stagiaire", "niveauEtude"],
         key: "niveauEtude",
      },
      {
         title: "Structure",
         dataIndex: "contratStage.stagiaire?.manager?.structure?.nomStructure",
         render: (text, record) => (
            <span>
               {
                  record?.contratStage?.stagiaire?.manager?.structure
                     ?.nomStructure
               }
            </span>
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
                        onClick={() => suprmier(record)}
                     >
                        Generer attestation
                     </Button>
                  </>
               )}
            </Space>
         ),
      },
   ];
   const suprmier = (attestationFinstage) => {
      console.log(attestationFinStages);
   };
   return (
      <div>
         <Table
            loading={loading}
            dataSource={attestationFinStages.map((stagiaire) => ({
               ...stagiaire,
               key: stagiaire.id,
            }))}
            pagination={{ pageSize: 6 }}
            columns={columns}
            scroll={{ x: true }}
         />
      </div>
   );
};
