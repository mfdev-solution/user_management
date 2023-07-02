import React from "react";
import { useState } from "react";
import { dateFormat } from "../utils/dateFormat";
import { addIntern } from "../services/AdminService";
import {
   Form,
   Modal,
   Input,
   DatePicker,
   Select,
   Button,
   message,
   Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ModalAddStudentForm = ({ open }) => {
   const { Option } = Select;
   const [form] = Form.useForm();
   const [isPedagogical, setIsPedagogical] = useState(false);
   const [fileList, setFileList] = useState([]);
   const [modalOpen, setModalOpen] = useState(open);

   const handleInternChange = (values) => {
      if (values === "pedagogique") {
         // console.log(values,"yes");
         setIsPedagogical(true);
      }
   };
   const handleFileUpload = (file) => {
      const isFileValid =
         file.type === "application/pdf" || file.type === "application/msword";
      if (!isFileValid) {
         message.error("Veuillez importer un fichier PDF ou Word valide.");
      }
      return isFileValid;
   };
   const handleFileChange = (info) => {
      let fileList = [...info.fileList];
      // Limitez la liste des fichiers à un seul fichier
      fileList = fileList.slice(-1);

      // Validez le fichier et mettez à jour la liste des fichiers importés
      fileList = fileList.filter(handleFileUpload);

      setFileList(fileList);
   };

   const handleSubmit = (values) => {
      // console.log(values);
      var intern = {
         adresse: values.adresse,
         cni: values.cni,
         dateNaissance: dateFormat(values.dateNaissance),
         diplomeObtenu: values.diplomeObtenu,
         ecole: values.ecole,
         email: values.email,
         formationEnCours: values.formationEnCours,
         lieuNaissance: values.lieuNaissance,
         typeStage: values.typeStage,
         nationalite: values.nationalite,
         niveauEtude: values.niveauEtude,
         nom: values.nom,
         numeroTelUrgence: values.numeroTelUrgence,
         numeroTelephone: values.numeroTelephone,
         prenom: values.prenom,
         situationMatrimonial: values.situationMatrimonial,
         genre: values.genre,
      };

      addIntern(intern)
         .then((res) =>
            message.success(
               `Bonjour ${res.data.prenom} ${res.data.nom}  votre demande a ete bien recue nous vous reviendrons`
            )
         )
         .catch((err) => console.log(err));
      setModalOpen(false);
   };

   return (
      <Modal
         style={{
            top: 65,
            overflow: "scroll",
         }}
         width={"50vw"}
         open={modalOpen}
         onCancel={() => setModalOpen(false)}
         footer={null}
      >
         <div
            style={{
               width: "500px",
               height: "30px",
               backgroundColor: "999",
            }}
         ></div>
         <Form
            form={form}
            onFinish={handleSubmit}
            style={{ maxWidth: "90vw", margin: "10 px 10px" }}
         >
            <div
               style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "16px",
               }}
            >
               <Form.Item name="nom" label="Nom" rules={[{ required: true }]}>
                  <Input />
               </Form.Item>
               <Form.Item
                  name="prenom"
                  label="Prénom"
                  rules={[{ required: true }]}
               >
                  <Input />
               </Form.Item>
            </div>
            <div
               style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "16px",
               }}
            >
               <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true }, { type: "email" }]}
               >
                  <Input />
               </Form.Item>
               <Form.Item name="numeroTelephone" label="Numéro de téléphone">
                  <Input type="tel" />
               </Form.Item>
            </div>
            <div
               style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "16px",
               }}
            >
               <Form.Item
                  name="dateNaissance"
                  label="Date de naissance"
                  rules={[{ required: true }]}
               >
                  <DatePicker />
               </Form.Item>
               <Form.Item
                  name="lieuNaissance"
                  label="Lieu de naissance"
                  rules={[{ required: true }]}
               >
                  <Input />
               </Form.Item>
            </div>
            <div
               style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "16px",
               }}
            >
               <Form.Item
                  name="cni"
                  label="Numéro de carte d'identité"
                  rules={[{ required: true }]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  name="nationalite"
                  label="Nationalité"
                  rules={[{ required: true }]}
               >
                  <Input />
               </Form.Item>
            </div>
            <div
               style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "16px",
               }}
            >
               <Form.Item name="genre" label="Genre">
                  <Select
                     placeholder="Sélectionnez votre genre"
                     // onChange={handleInternChange}
                  >
                     <Option value="M">Homme</Option>
                     <Option value="F">Femme</Option>
                  </Select>
               </Form.Item>
               <Form.Item
                  name="situationMatrimonial"
                  label="Situation matrimoniale"
                  rules={[
                     {
                        required: true,
                        message: "Veuillez saisir la situation matrimoniale!",
                     },
                  ]}
               >
                  <Select placeholder="Sélectionnez la situation matrimoniale">
                     <Option value="celibataire">Célibataire</Option>
                     <Option value="marié(e)">Marié(e)</Option>
                     <Option value="divorcé(e)">Divorcé(e)</Option>
                     <Option value="veuf(ve)">Veuf(ve)</Option>
                  </Select>
               </Form.Item>
            </div>
            <div
               style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "16px",
               }}
            >
               <Form.Item
                  name="adresse"
                  label="Adresse"
                  rules={[{ required: true }]}
               >
                  <Input.TextArea rows={1} />
               </Form.Item>
               <Form.Item
                  name="numeroTelUrgence"
                  label="Numéro de téléphone en cas d'urgence"
               >
                  <Input type="tel" />
               </Form.Item>
            </div>
            <div
               style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "16px",
               }}
            >
               <Form.Item name="typeStage" label="Type de stage">
                  <Select
                     placeholder="Sélectionnez une un type de sage"
                     onChange={handleInternChange}
                  >
                     <Option value="pedagogique">Pédagogique</Option>
                     <Option value="autre" disabled>
                        {" "}
                        autre
                     </Option>
                  </Select>
               </Form.Item>
               <Form.Item
                  name="cv"
                  label="Importez votre CV"
                  rules={[
                     {
                        required: true,
                        message: "Veuillez importer votre CV.",
                     },
                  ]}
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e.fileList}
               >
                  <Upload
                     accept=".pdf,.doc,.docx"
                     beforeUpload={() => false}
                     fileList={fileList}
                     onChange={handleFileChange}
                  >
                     <Button icon={<UploadOutlined />} size="small">
                        Importer
                     </Button>
                  </Upload>
               </Form.Item>
            </div>
            <div
               style={{
                  display: isPedagogical && "grid",
                  gridTemplateColumns: isPedagogical && "1fr 1fr",
                  gridGap: isPedagogical && "16px",
               }}
            >
               <Form.Item name="ecole" label="École">
                  <Input />
               </Form.Item>
               {isPedagogical && (
                  <Form.Item name="formationEnCours" label="Formation en cours">
                     <Input />
                  </Form.Item>
               )}
            </div>

            <div
               style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "16px",
               }}
            >
               <Form.Item name="niveauEtude" label="Niveau d'étude">
                  <Select>
                     <Option value="bac+1">Bac+1</Option>
                     <Option value="bac+2">Bac+2</Option>
                     <Option value="bac+3">Bac+3</Option>
                     <Option value="bac+4">Bac+4</Option>
                     <Option value="bac+5">Bac+5</Option>
                  </Select>
               </Form.Item>
               <Form.Item name="diplomeObtenu" label="Diplôme obtenu">
                  <Input />
               </Form.Item>
            </div>

            <div
               style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "32px",
               }}
            >
               <Button
                  type="primary"
                  className="btn"
                  style={{ backgroundColor: "#009791", color: "white" }}
                  htmlType="submit"
               >
                  Envoyer la demande
               </Button>
            </div>
         </Form>
      </Modal>
   );
};
export default ModalAddStudentForm;
