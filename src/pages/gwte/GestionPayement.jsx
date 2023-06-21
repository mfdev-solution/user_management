import React, { useEffect, useRef, useState } from "react";
import { getAllPayment } from "../../services/PaymentService";
import { Space, Table } from "antd";
import { formatDate } from "../../utils/dateFormat";
import { UnorderedListOutlined } from "@ant-design/icons";

export const GestionPayement = () => {
   const flag = useRef(false);
   const [listPayment, setListPayment] = useState([]);
   const [loading, setLoading] = useState(false);
   const [selectedRows, setSelectedRows] = useState([]); // State for storing selected rows

   useEffect(() => {
      if (flag.current === false) {
         setLoading(true);
         getAllPayment()
            .then((response) => {
               setListPayment(response.data);
               setLoading(false);
            })
            .catch((error) => {
               console.log(error);
            });
      }
      return () => (flag.current = true);
   }, []);
   const columns = [
      {
         title: "Matricule",
         key: "matricule",
         dataIndex: "attestationPresence",
         render: (attestationPresence) => (
            <span>
               {attestationPresence?.contratStage?.stagiaire?.matricule}
            </span>
         ),
      },
      {
         title: "prenom",
         key: "prenom",
         dataIndex: "attestationPresence",
         render: (attestationPresence) => (
            <span>{attestationPresence?.contratStage?.stagiaire?.prenom}</span>
         ),
      },
      {
         title: "nom",
         key: "nom",
         dataIndex: "attestationPresence",
         render: (attestationPresence) => (
            <span>{attestationPresence?.contratStage?.stagiaire?.nom}</span>
         ),
      },
      {
         title: "telephone",
         key: "telephone",
         dataIndex: "attestationPresence",
         render: (attestationPresence) => (
            <span>
               {attestationPresence?.contratStage?.stagiaire?.numeroTelephone}
            </span>
         ),
      },
      {
         title: "mois de début",
         key: "mois de début",
         dataIndex: "attestationPresence",
         render: (attestationPresence) => (
            <span>
               {formatDate(attestationPresence?.contratStage?.dateDebut)}
            </span>
         ),
      },
      {
         title: "mois de fin",
         key: "mois de fin",
         dataIndex: "attestationPresence",
         render: (attestationPresence) => (
            <span>
               {formatDate(attestationPresence?.contratStage?.dateFin)}
            </span>
         ),
      },
      {
         title: "manager ",
         key: "manager",
         dataIndex: "attestationPresence",
         render: (attestationPresence) => (
            <span>
               {attestationPresence?.contratStage?.stagiaire.manager.firstName}{" "}
               {attestationPresence?.contratStage?.stagiaire.manager.lastName}
            </span>
         ),
      },
      {
         title: "Structure",
         key: "structure",
         dataIndex: "attestationPresence",
         render: (attestationPresence) => (
            <span>
               {
                  attestationPresence?.contratStage?.stagiaire.manager.structure
                     .nomStructure
               }
            </span>
         ),
      },
   ];
   const handleRowSelection = (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
   };
   const rowKeys = selectedRows.map((row) => row.key);
 
   return (
      <div>
         {console.log(listPayment)}
         <div
            style={{
               maxWidth: "100vw",
               height: "50px",
               backgroundColor: "#2d928e",
               display: "flex",
               justifyContent: "start",
               paddingLeft: 10,
               justifyItems: "center",
               color: "white",
            }}
         >
            <Space style={{ fontSize: 17 }}>
               <UnorderedListOutlined />
               List des payements
            </Space>
         </div>
         <Table
            loading={loading}
            dataSource={listPayment}
            columns={columns}
            rowSelection={{
               type: "checkbox",
               selectedRowKeys: rowKeys,
               onChange: handleRowSelection,
            }}
         />
      </div>
   );
};
