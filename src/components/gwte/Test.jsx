import { Table, Space, Tag, Button, Empty, Input, FloatButton } from "antd";
import { useEffect, useState, useRef } from "react";
import {
   getInternApplications,
   exportToExcel,
   getStatsEtat,
} from "../../services/StagiaireService";
import {
   EyeFilled,
   DownCircleFilled,
   UnorderedListOutlined,
   UserAddOutlined,
   DownCircleOutlined,
   ExclamationCircleFilled,
   CheckCircleOutlined,
   CheckOutlined,
} from "@ant-design/icons";

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
   const [status, setStatus] = useState([]);
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
         getStatsEtat()
            .then((stats) => {
               setStatus(stats.data);
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

      { title: "Adresse", dataIndex: "adresse", key: "adresse" },
      {
         title: "Nationalité",
         dataIndex: "nationalite",
         key: "nationalite",
      },
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
         width: 200,
      },
      {
         title: "Diplôme obtenu",
         dataIndex: "diplomeObtenu",
         key: "diplomeObtenu",
         width: 200,
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
                     fontSize: "12px",
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
                     fontSize: "12px",
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
         width: 100,
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
   const getIcon = (keyword) => {
      switch (keyword) {
         case "accepte":
            return <DownCircleFilled style={{ color: "#fff" }} size={30} />;
         case "rejete":
            return <ExclamationCircleFilled style={{ color: "#fff" }} />;
         case "complet":
            return <DownCircleOutlined style={{ color: "#fff" }} />;
         case "enProposition":
            return <CheckCircleOutlined style={{ color: "#fff" }} />;
         case "enCours":
            return <CheckOutlined style={{ color: "#fff" }} />;
         default:
            break;
      }
   };
   const getBackgroundColor = (key) => {
      switch (key) {
         case "enCours":
            return "#1890ff";
         case "complet":
            return "#52c41a";
         case "rejete":
            return "#f5222d";
         case "accepte":
            return "green";
         case "enProposition":
            return "orange";
         default:
            return "#ffffff";
      }
   };
   return (
      <>
         <div>
            <Space
               style={{
                  marginBottom: 40,
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  justifyItems: "center",
                  columnGap: 60,
               }}
               ClassName="d-flex justify-content-between"
            >
               {" "}
               {Object.entries(status).map(([key, value]) => (
                  <Space
                     style={{
                        width: "200px",
                        height: 60,
                        border: "1px solid gray",
                        padding: 0,
                     }}
                     key={key}
                  >
                     <Space
                        style={{
                           width: "60px",
                           height: 60,
                           // border: "1px solid gray",
                           backgroundColor: getBackgroundColor(key),
                           display: "flex",
                           justifyContent: "center",
                           justifyItems: "center",
                        }}
                     >
                        {getIcon(key)}
                     </Space>
                     <Space
                        style={{
                           display: "flex",
                           justifyContent: "center",
                           justifyItems: "center",
                           width: 140,
                        }}
                     >
                        {value}
                        {key}
                     </Space>
                  </Space>
               ))}
            </Space>
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
                  {/* <Button icon={<UserAddOutlined />} className="button-92">
                     {" "}
                  </Button> */}
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
