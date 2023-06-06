import React, { useEffect, useRef, useState } from "react";
import {
   getAllStagiaireByIdManager,
   getAllStagiaireByIdManagerAndStatEnProposition,
} from "../../services/ManagerService";
import { Empty, Table, Space, Button } from "antd";
import {
   updateIntern,
   acceptDemandeByManager,
} from "../../services/StagiaireService";
export const ListProposition = () => {
   const [loading, setLoading] = useState(true);
   const [listStagiaires, setListStagiaires] = useState([]);
   const flag = useRef(false);

   const handleUpdate = (id) => {
      updateIntern(id, { etat: "accepte" })
         .then((response) => {
            // console.log(response);
            setListStagiaires(
               listStagiaires.filter(
                  (stagiaire) => stagiaire.id !== response.data.id
               )
            );
         })
         .catch((err) => {
            console.log(err);
         });
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
            <Space size="middle">
               {record && (
                  <>
                     <Button
                        type="primary"
                        onClick={() => {
                           handleUpdate(record.id);
                        }}
                        style={{
                           backgroundColor: "rgba(0,151,149,0.9)",
                        }}
                     >
                        Accepter
                     </Button>
                     <Button
                        type="primary"
                        danger
                        onClick={() => {
                           console.log(record);
                        }}
                     >
                        Rejeter
                     </Button>
                  </>
               )}
            </Space>
         ),
      },
   ];

   useEffect(() => {
      if (flag.current === false) {
         setLoading(true);
         getAllStagiaireByIdManagerAndStatEnProposition(9) //A prendre en compte : on doit recuperer le manager pour utiliser son id
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

   return (
      <>
         <div>
            <Table
               loading={loading}
               dataSource={listStagiaires}
               columns={columns}
            />
         </div>
         {!listStagiaires && <Empty />}
      </>
   );
};
