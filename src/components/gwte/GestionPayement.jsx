import React, { useEffect, useRef, useState } from "react";
import {
   getAllPayementByEtat,
   getAllPayment,
   updatePayment,
} from "../../services/PaymentService";
import { Button, Checkbox, Input, Space, Table } from "antd";
import { formatDate } from "../../utils/dateFormat";
import {
   UnorderedListOutlined,
   UserOutlined,
   CheckCircleFilled,
   CloseSquareFilled,
} from "@ant-design/icons";
const { Search } = Input;
export const GestionPayement = () => {
   const flag = useRef(false);
   const [listPayment, setListPayment] = useState([]);
   const [loading, setLoading] = useState(false);
   const [selectedRow, setSelectedRowKeys] = useState([]);
   useEffect(() => {
      if (flag.current === false) {
         setLoading(true);
         getAllPayementByEtat("enCours")
            .then((response) => {
               const updatedListPayment = response.data.map((item, index) => ({
                  ...item,
                  key: String(item.id),
               }));
               setListPayment(updatedListPayment);
               setLoading(false);
            })
            .catch((error) => {
               console.log(error);
            });
      }
      return () => (flag.current = true);
   }, []);
   const rowkeys = selectedRow.map((rowKey) => rowKey.key);
   const handleRowSelection = (selectedRowkeys, selectedRow) => {
      setSelectedRowKeys(selectedRow);
   };

   const columns = [
      {
         title: "Matricule",
         key: "matricule",
         dataIndex: [
            "attestationPresence",
            "contratStage",
            "stagiaire",
            "matricule",
         ],
         render: (matricule) => <span>{matricule}</span>,
         sorter: {
            compare: (a, b) =>
               a.attestationPresence.contratStage.stagiaire.matricule.localeCompare(
                  b.attestationPresence.contratStage.stagiaire.matricule
               ),
            multiple: 2,
         },
         showOnResponse: true,
         showOnDesktop: true,
      },
      {
         title: "prenom",
         key: "prenom",
         dataIndex: [
            "attestationPresence",
            "contratStage",
            "stagiaire",
            "prenom",
         ],
         render: (prenom) => <span>{prenom}</span>,
         sorter: {
            compare: (a, b) =>
               a.attestationPresence.contratStage.stagiaire.prenom.localeCompare(
                  b.attestationPresence.contratStage.stagiaire.prenom
               ),
            multiple: 2,
         },
         showOnResponse: true,
         showOnDesktop: true,
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
      {
         title: "Action",
         key: "action",
         render: (_, record) => (
            <Space>
               <Button
                  style={{
                     backgroundColor: "rgb(45, 146, 142)",
                     color: "#FFF",
                  }}
                  onClick={() => onUpdatepayment(record)}
                  className="btn btn-labeled "
                  icon={<CheckCircleFilled />}
               >
                  Accepter
               </Button>
               <Button
                  style={{
                     // backgroundColor: "rgb(45, 146, 142)",
                     color: "#FFF",
                  }}
                  onClick={() => console.log("rejected", record)}
                  className="btn btn-labeled btn-danger"
                  icon={<CloseSquareFilled />}
               >
                  Rejeter
               </Button>
            </Space>
         ),
      },
      // {
      //    title: "Sélection",
      //    key: "selection",
      //    dataIndex: "selection",
      //    render: (_, record) => (
      //       <span>
      //          <Checkbox
      //             checked={selectedRows.some((row) => row.key === record.key)}
      //             onChange={(e) => {
      //                const checked = e.target.checked;
      //                if (checked) {
      //                   setSelectedRows([...selectedRows, record]);
      //                } else {
      //                   setSelectedRows(
      //                      selectedRows.filter((row) => row.key !== record.key)
      //                   );
      //                }
      //             }}
      //          />
      //       </span>
      //    ),
      // },
   ];
   const onUpdatepayment = (record) => {
      record.attestationPresence.etatAttestationPresence = "valide";
      updatePayment(record)
         .then((response) => {
            console.log(response.data);
         })
         .catch((err) => {
            console.log(err);
         });
   };
   const [searchName, setSearchName] = useState("");
   const handleSearchChange = (keyWord) => {
      console.log(keyWord);
      setSearchName(keyWord);
   };
   return (
      <div>
         <div
            className="d-flex justify-content-end"
            style={{
               maxWidth: "100vw",
               height: "50px",
               backgroundColor: "#2d928e",
               paddingLeft: 10,
               color: "white",
               padding: 15,
            }}
         >
            <Space style={{ fontSize: 17 }}></Space>
            <Space>
               {selectedRow.length > 0 && (
                  <Button onClick={() => console.log(selectedRow)}>
                     Tout accepter
                  </Button>
               )}
               <Space>
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
               </Space>
            </Space>
         </div>
         <Table
            loading={loading}
            dataSource={listPayment.filter((list) =>
               list.attestationPresence.contratStage.stagiaire.prenom
                  .toLowerCase()
                  .includes(searchName.toLowerCase())
            )}
            columns={columns}
            rowSelection={{
               type: "checkbox",
               selectedRowKeys: rowkeys,
               onChange: handleRowSelection,
               getCheckboxProps: (record) => ({
                  disabled: record.disabled,
               }),
            }}
            showHeader
         />
      </div>
   );
};
