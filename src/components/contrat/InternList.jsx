import React, { useEffect, useState } from "react";
import { Tag, Table, Empty } from "antd";
import { getInternApplications } from "../../services/StagiaireService";
import { useRef } from "react";
export const InternList = () => {
   const [internList, setInternList] = useState([null]);
   const [loading, setLoading] = useState(true);
   const flag = useRef(false);
   useEffect(() => {
      if (flag.current === false) {
         setLoading(true);

         getInternApplications("complet")
            .then((response) => {
               setInternList(response.data);
               setLoading(false);
            })
            .catch((error) => console.log(error));
      }
      return () => (flag.current = true);
   }, []);
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
         render: (etat) => <Tag color={"success"}>{etat}</Tag>,
         key: "etat",
      },
   ];

   const sortedInternList = [...internList].sort((a, b) => b.id - a.id);
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
