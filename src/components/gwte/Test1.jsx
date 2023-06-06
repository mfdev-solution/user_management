import { Table, Space, Tag, Button, Empty, Input } from "antd";
import { useEffect, useState, useRef } from "react";
import {
   getInternApplications,
   updateInternv1,
} from "../../services/StagiaireService";
import { render } from "@testing-library/react";
import AddManagerToIntern from "../AddManagerToIntern";
import { AddRegistrationNumberToIntern } from "./AddRegistrationNumberToIntern";
import { ImporteExcelFile } from "../ImporteExcelFile";

export const Test1 = () => {
   const [stagiaires, setStagiaires] = useState([]);
   const flag = useRef(false);
   const [selectedId, setSelectedId] = useState(null);
   const [loading, setLoading] = useState(false);
   const [keywordSh, setkeywordSh] = useState("");
   const { Search } = Input;
   useEffect(() => {
      if (flag.current === false) {
         setLoading(true);
         getInternApplications("accepte")
            .then((response) => {
               setStagiaires(response.data);
               setLoading(false);
            })
            .catch((err) => {
               console.log(err);
            });
      }
      return () => (flag.current = true);
   }, []);

   const handleUpdate = (stagiaireparam) => {
      stagiaireparam.manager = null;
      stagiaireparam.structure = null;
      stagiaireparam.etat = "enCours";
      updateInternv1(stagiaireparam.id, stagiaireparam)
         .then((response) => {
            console.log(response);
            setStagiaires(
               stagiaires.filter(
                  (stagiaire) => stagiaire.id !== stagiaireparam.id
               )
            );
         })
         .catch((err) => {
            console.log(err);
         });
   };
   const handleColose = () => {
      setStagiaires(
         stagiaires.filter((stagiaire) => stagiaire.id !== selectedId)
      );
   };
   const getEtat = (etat) => {
      if (etat === "accepte") {
         return "Accepte";
      }
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
         title: "État",
         dataIndex: "etat",
         render: (etat) => (
            <Tag
               color={
                  etat === "enCours"
                     ? "processing"
                     : etat === "accepte"
                     ? "success"
                     : etat === "rejete"
                     ? "error"
                     : "default"
               }
            >
               {getEtat(etat)}
            </Tag>
         ),
         key: "etat",
      },
      {
         title: "Action",
         key: "action",
         render: (text, record) => (
            <Space size="middle">
               <Button
                  type="primary"
                  danger
                  onClick={() => handleUpdate(record)}
               >
                  Annuler
               </Button>

               {record.manager === null ? (
                  <>
                     <Button
                        onClick={() => {
                           render(
                              <AddManagerToIntern
                                 opened={true}
                                 id={record.id}
                                 onClosed={handleColose}
                              />
                           );
                        }}
                        style={{
                           backgroundColor: "rgba(0,151,149,0.9)",
                           color: "white",
                        }}
                     >
                        Ajouter Manager
                     </Button>
                     console.log
                  </>
               ) : (
                  ""
               )}
               {record.manager !== null && !record.matricule ? (
                  <Button
                     type="primary"
                     onClick={() => {
                        render(
                           <AddRegistrationNumberToIntern
                              open={true}
                              id={record.id}
                              onClosed={handleColose}
                           />
                        );
                     }}
                     style={{
                        backgroundColor: "#2d928e",
                     }}
                  >
                     Attribuer Matricule
                  </Button>
               ) : (
                  ""
               )}
            </Space>
         ),
      },
   ];
   const sortedstagiaires = [...stagiaires].sort((a, b) => b.id - a.id);
   const handleSearchChange = (value) => {
      console.log(value);
      setkeywordSh(value);
   };

   return (
      <>
         <div>
            <Space
               style={{
                  marginBottom: 25,
                  display: "flex",

                  justifyContent: "end",
                  justifyItems: "center",
                  columnGap: 30,
               }}
            >
               <Button
                  type="primary"
                  ghost
                  onClick={() => {
                     render(<ImporteExcelFile opened={true} key={"modal"} />);
                  }}
                  style={{
                     display: "flex",
                     width: "auto",
                     height: "auto",
                     padding: "10px 10px",
                     justifyContent: "space-between",
                     backgroundColor: "#2d928e",
                     color: "#FFF",
                     fontSize: 17,
                     borderColor: "#FFF",
                  }}
               >
                  importer fichier de validation
               </Button>
               <Search
                  type="primary"
                  color="#2d928e"
                  onChange={(e) => {
                     handleSearchChange(e.target.value);
                  }}
                  placeholder="search a name"
                  style={{
                     borderRadius: "10px",
                  }}
               />
            </Space>
            <Table
               loading={loading}
               dataSource={sortedstagiaires.filter(
                  (stg) =>
                     stg.prenom
                        .toLowerCase()
                        .includes(keywordSh.toLowerCase()) ||
                     stg.nom.toLowerCase().includes(keywordSh.toLowerCase())
               )}
               columns={columns}
               pagination={{
                  pageSize: 5, // Limite le nombre d'éléments affichés par page à 10
                  showSizeChanger: false,
               }}
            />
         </div>
         {stagiaires.length === 0 && <Empty />}
      </>
   );
};
