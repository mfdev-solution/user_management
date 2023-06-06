import { Button, Modal, Upload } from "antd";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { uploadExcelFile } from "../services/Test";
import Axios from "../services/caller_service";

export const ImporteExcelFile = ({ opened }) => {
   const [modalOpen, setModalOpen] = useState(opened);
   const [file, setFile] = useState(null);
   const [loading, setLoading] = useState(false);

   const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
   };
   const handleUpload = () => {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      uploadExcelFile(formData)
         .then((response) => {
            console.log(response.data); // Handle the response from the server
            setLoading(false);
            setModalOpen(false);
         })
         .catch((error) => {
            console.error("Error:", error);
         });
   };

   return (
      <Modal
         style={{
            top: "10vw",
            overflow: "scroll",
         }}
         width={"30vw"}
         open={modalOpen}
         onCancel={() => setModalOpen(false)}
         onOk={() => setModalOpen(false)}
         footer={null}
      >
         <div>
            <input
               type="file"
               accept=".xlsx,.xls"
               onChange={handleFileChange}
            />
            <button onClick={handleUpload} disabled={!file}>
               Upload
            </button>
         </div>
      </Modal>
   );
};
