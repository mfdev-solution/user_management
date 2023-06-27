import { Table, Space, Tag, Button, Empty, Input, FloatButton } from "antd";
import { useEffect, useState, useRef } from "react";
import {
   getInternApplications,
   exportToExcel,
} from "../../services/StagiaireService";
import {
   EyeFilled,
   PlusCircleFilled,
   UnorderedListOutlined,
   UserAddOutlined,
} from "@ant-design/icons";
import "./test.css";

import { render } from "@testing-library/react";
import AddManagerToIntern from "../AddManagerToIntern";
import { Link } from "react-router-dom";
import icon from "../../assets/images/excel4.png";
import AjouterStagiare from "./AjouterStagiaire";
const { Search } = Input;

export const Test = () => {
   const [stagiaires, setStagiaires] = useState([]);
   const flag = useRef(false);
   const [loading, setLoading] = useState(true);
   const [selectedRows, setSelectedRows] = useState([]); // State for storing selected rows
   const [loadingExport, setloadingExport] = useState(false); //
   useEffect(() => {
      if (flag.current === false) {
         setLoading(true);

         getInternApplications("enCours")
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

   const handleColose = (id) => {
      setStagiaires(stagiaires.filter((stagiaire) => stagiaire.id !== id));
   };
   const handleDownload = () => {
      setloadingExport(true);
      exportToExcel().then((response) => {
         const blob = new Blob([response.data], {
            type:
               "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
         });
         const url = window.URL.createObjectURL(blob);
         const link = document.createElement("a");
         link.href = url;
         link.target = "_blank";
         link.download = "listStagiaires.xlsx"; // Specify the desired file name
         link.click();
         URL.revokeObjectURL(url);
         link.remove();
         setloadingExport(false);
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
               {"En cours"}
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
                  className="btn"
                  onClick={() => {
                     render(
                        <AddManagerToIntern
                           opened={true}
                           id={record.id}
                           onClosed={() => handleColose(record.id)}
                           action={"attribuer"}
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
               <Button
                  className="btn"
                  onClick={() => {
                     render(
                        <AddManagerToIntern
                           opened={true}
                           id={record.id}
                           onClosed={() => handleColose(record.id)}
                           action={"proposer"}
                        />
                     );
                  }}
                  style={{
                     backgroundColor: "rgba(0,151,149,0.9)",
                     color: "white",
                  }}
               >
                  Proposer
               </Button>
               <Link to={`/gwte/stagiaire/profile/${record.id}`}>
                  <Button className="btn" type="primary">
                     <EyeFilled />
                  </Button>
               </Link>
            </Space>
         ),
      },
   ];
   const sortedstagiaires = [...stagiaires].sort((a, b) => b.id - a.id);

   const rowKeys = selectedRows.map((row) => row.key);
   const handleRowSelection = (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
      console.log(selectedRows);
   };
   const [keywordSh, setkeywordSh] = useState("");
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
            ></Space>
            <div
               className="d-flex justify-content-between"
               style={{
                  maxWidth: "100vw",
                  height: "50px",
                  backgroundColor: "#2d928e",
                  display: "flex",
                  paddingLeft: 10,
                  color: "white",
                  padding: 5,
               }}
            >
               <Space style={{ fontSize: 17 }}>
                  <UnorderedListOutlined />
                  List des nouveaux demandes de stages
               </Space>
               <Space>
                  {selectedRows && selectedRows.length > 0 && (
                     <Button
                        type="primary"
                        ghost
                        onClick={() => {
                           handleDownload();
                        }}
                        loading={loadingExport}
                        style={{
                           display: "flex",
                           width: "auto",
                           height: "auto",
                           paddingTop: "4px",
                           paddingBottom: "4px",
                           paddingLeft: "15px",
                           paddingRight: "15px",
                           justifyContent: "space-between",
                           backgroundColor: "#2d928e",
                           color: "#FFF",
                           fontSize: 17,
                           borderColor: "#FFF",
                        }}
                     >
                        <img src={icon} alt="excel export" />
                        Export Excel
                     </Button>
                  )}
                  <Search
                     type="primary"
                     color="#2d928e"
                     onChange={(e) => {
                        handleSearchChange(e.target.value);
                     }}
                     placeholder="search a name"
                     style={{
                        borderRadius: "10px",
                        height: "auto",
                     }}
                  />
                  <Button icon={<UserAddOutlined />} className="button-92">
                     {" "}
                     {/* Ajouter */}
                  </Button>
               </Space>
            </div>

            <Table
               loading={loading}
               dataSource={sortedstagiaires
                  .map((stagiaire) => ({
                     ...stagiaire,
                     key: stagiaire.id,
                  }))
                  .filter((stg) =>
                     stg.prenom.toLowerCase().includes(keywordSh.toLowerCase())
                  )}
               columns={columns}
               rowSelection={{
                  type: "checkbox",
                  selectedRowKeys: rowKeys,
                  onChange: handleRowSelection,
               }}
               pagination={{
                  pageSize: 6,
               }}
            />
            <FloatButton
               shape="circle"
               type="primary"
               icon={<UserAddOutlined />}
               style={{
                  right: 60,
                  width: 50,
                  height: 50,
                  bottom: 52,
               }}
               onClick={() => {
                  render(<AjouterStagiare opened={true} />);
               }}
            />
         </div>
         {!stagiaires && <Empty />}
      </>
   );
};
