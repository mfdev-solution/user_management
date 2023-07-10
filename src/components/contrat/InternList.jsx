import React, { useEffect, useState } from "react";
import { Tag, Table, Empty, Space, Button } from "antd";
import { getInternApplications } from "../../services/StagiaireService";
import { useRef } from "react";
import { addAttestationFinStage } from "../../services/AttestationFinStage";
export const InternList = () => {
   const [internList, setInternList] = useState([null]);
   const [loading, setLoading] = useState(true);
   const flag = useRef(false);
   useEffect(() => {
      if (flag.current === false) {
         setLoading(true);

         getInternApplications("accepte")
            .then((response) => {
               setInternList(response.data);
               setLoading(false);
            })
            .catch((error) => console.log(error));
      }
      return () => (flag.current = true);
   }, []);
   const columns = [
      { title: "Matricule", dataIndex: "matricule", key: "matricule" },
      { title: "Nom", dataIndex: "nom", key: "nom" },
      { title: "Prénom", dataIndex: "prenom", key: "prenom" },
      {
         title: "Lieu de naissance",
         dataIndex: "lieuNaissance",
         key: "lieuNaissance",
      },
      { title: "CNI", dataIndex: "cni", key: "cni" },
      { title: "Adresse", dataIndex: "adresse", key: "adresse" },
      {
         title: "Formation en cours",
         dataIndex: "formationEnCours",
         key: "formationEnCours",
      },
      { title: "École", dataIndex: "ecole", key: "ecole" },
      {
         title: "Niveau d'études",
         dataIndex: "niveauEtude",
         key: "niveauEtude",
      },
      {
         title: "Diplôme obtenu",
         dataIndex: "diplomeObtenu",
         key: "diplomeObtenu",
      },
      {
         title: "État",
         dataIndex: "etat",
         render: (etat) => <Tag color={"success"}>{etat}</Tag>,
         key: "etat",
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
                        onClick={() => validerContrat(record)}
                     >
                        valider fin contrat
                     </Button>
                  </>
               )}
            </Space>
         ),
      },
   ];

   const sortedInternList = [...internList].sort((a, b) => b.id - a.id);
   const validerContrat = (contrat) => {
      var attestation = {
         etatAttestationFinStage: "enCours",
         contratStage: contrat,
      };
      addAttestationFinStage(attestation)
         .then((response) => {
            console.log(response.data);
            return response.data;
         })
         .catch((err) => {
            console.log(err);
         });
   };
   return (
      <>
         {internList && internList.length > 0 ? (
            <div>
               <Table
                  loading={loading}
                  dataSource={sortedInternList}
                  columns={columns}
               />
            </div>
         ) : (
            <Empty />
         )}
      </>
   );
};
