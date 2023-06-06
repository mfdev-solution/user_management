import React, { useEffect, useRef, useState } from "react";
import { getAllStagiaireByIdManager } from "../../services/ManagerService";
import { Button, Empty, Space, Table } from "antd";
import { AjouterAttestationPresence } from "./AjouterAttestationPresence";
import { render } from "@testing-library/react";

export const ListStagiaires = () => {
   const [loading, setLoading] = useState(true);
   const [ListStagiaires, setListStagiaires] = useState([]);
   const flag = useRef(false);

   const handleAdd = (values) => {
      console.log(values);
   };
   const handleColose = (values) => {
      console.log(values);
   };
   const columns = [
      { title: "Nom", dataIndex: "nom", key: "nom" },
      { title: "Prénom", dataIndex: "prenom", key: "prenom" },
      {
         title: "Lieu de naissance",
         dataIndex: "lieuNaissance",
         key: "lieuNaissance",
      },
      { title: "CNI", dataIndex: "cni", key: "cni" },
      { title: "Adresse", dataIndex: "adresse", key: "adresse" },
      { title: "Nationalité", dataIndex: "nationalite", key: "nationalite" },
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
         title: "Action",
         key: "action",
         render: (text, record) => (
            <Space size={"middle"}>
               {record && (
                  <>
                     {record && record.matricule != null ? (
                        <Button
                           type="primary"
                           onClick={() => {
                              render(
                                 <AjouterAttestationPresence
                                    opened={true}
                                    values={record}
                                    onClosed={handleColose(record.id)}
                                 />
                              );
                           }}
                           style={{
                              backgroundColor: "rgba(0,151,149,0.9)",
                              color: "white",
                           }}
                        >
                           Ajouter attestation
                        </Button>
                     ) : (
                        <Button type="primary" danger>
                           pas de matricule
                        </Button>
                     )}
                     {/* <Button type="primary">Télécharger</Button> */}
                  </>
               )}
            </Space>
         ),
      },
   ];

   useEffect(() => {
      if (flag.current === false) {
         setLoading(true);
         getAllStagiaireByIdManager(9)
            .then((response) => {
               console.log(response.data);
               setListStagiaires(response.data);
               setLoading(false);
            })
            .catch((error) => {
               console.log(error);
            });
      }

      return () => {
         return (flag.current = true);
      };
   }, []);
//validate an mail with regex pattern
   return (
      <>
         {ListStagiaires && !loading ? (
            <div>
               <Table
                  loading={loading}
                  dataSource={ListStagiaires}
                  columns={columns}
               />
            </div>
         ) : (
            <Empty />
         )}
      </>
   );
};
