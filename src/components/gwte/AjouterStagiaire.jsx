import { useState } from "react";
import {
   Steps,
   Button,
   Form,
   Input,
   Select,
   Modal,
   DatePicker,
   Upload,
} from "antd";
import { wait } from "@testing-library/user-event/dist/utils";
import { UploadOutlined } from "@ant-design/icons";
const { Step } = Steps;
const { Option } = Select;

const AjouterStagiaire = ({ opened }) => {
   const [currentStep, setCurrentStep] = useState(0);
   const [form] = Form.useForm();
   const [modalVisible, setModalVisible] = useState(opened);
   const [formValues, setFormValues] = useState({});

   const handleNext = () => {
      form.validateFields().then((values) => {
         setFormValues({ ...formValues, ...values });
         setCurrentStep(currentStep + 1);
      });
   };

   const handlePrev = () => {
      setCurrentStep(currentStep - 1);
   };

   const handleFinish = (values) => {
      setFormValues({ ...formValues, ...values });
      wait(3);
      console.log(formValues);
   };
   const handleInternChange = () => {};
   const steps = [
      {
         title: "Informaions de contact",
         content: (
            <>
               <div
                  style={{
                     display: "grid",
                     gridTemplateColumns: "1fr 1fr",
                     gridGap: "16px",
                  }}
               >
                  <Form.Item
                     name="nom"
                     label="Nom"
                     rules={[
                        {
                           required: true,
                           message: "Veuillez saisir votre nom.",
                        },
                     ]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     name="prenom"
                     label="Prénom"
                     rules={[
                        {
                           required: true,
                           message: "Veuillez saisir votre prénom.",
                        },
                     ]}
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
                     rules={[
                        {
                           required: true,
                           message: "Veuillez saisir votre adresse email.",
                        },
                        {
                           type: "email",
                           message: "Veuillez saisir une adresse email valide.",
                        },
                     ]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     name="telephone"
                     label="Numéro de Téléphone"
                     rules={[
                        {
                           required: true,
                           message:
                              "Veuillez saisir votre numéro de téléphone.",
                        },
                     ]}
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
               {/* <div
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
                           message:
                              "Veuillez saisir la situation matrimoniale!",
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
               </div> */}
            </>
         ),
      },
      {
         title: "informations de formation",
         content: (
            <>
               <div
                  style={{
                     display: "grid",
                     gridTemplateColumns: "1fr 1fr",
                     gridGap: "16px",
                  }}
               >
                  <Form.Item name="ecole" label="École">
                     <Input />
                  </Form.Item>
                  <Form.Item name="formationEnCours" label="Formation en cours">
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
            </>
         ),
      },
      {
         title: "Information supplémentairs",
         content: (
            <>
               <div
                  style={{
                     display: "grid",
                     gridTemplateColumns: "1fr 1fr",
                     gridGap: "16px",
                  }}
               >
                  <Form.Item
                     name="numeroTelUrgence"
                     label="Numéro de téléphone en cas d'urgence"
                  >
                     <Input type="tel" />
                  </Form.Item>
                  <Form.Item
                     name="situationMatrimonial"
                     label="Situation matrimoniale"
                     rules={[
                        {
                           required: true,
                           message:
                              "Veuillez saisir la situation matrimoniale!",
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
                  <Form.Item name="genre" label="Genre">
                     <Select
                        placeholder="Sélectionnez votre genre"
                        // onChange={handleInternChange}
                     >
                        <Option value="M">Homme</Option>
                        <Option value="F">Femme</Option>
                     </Select>
                  </Form.Item>
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
               </div>
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
                     // fileList={fileList}
                     // onChange={handleFileChange}
                  >
                     <Button icon={<UploadOutlined />} size="small">
                        Importer
                     </Button>
                  </Upload>
               </Form.Item>
            </>
         ),
      },
      {
         title: "Validation",
         content: <p>Succes veillez confirmer</p>,
      },
   ];

   return (
      <Modal
         style={{
            top: 65,
            overflow: "scroll",
            marginBottom: 30,
         }}
         width={"60vw"}
         open={modalVisible}
         onCancel={() => setModalVisible(false)}
         footer={null}
      >
         <div
            style={{
               maxWidth: "50vw",
               margin: "30px 0 0 0 ",
            }}
         >
            <Steps current={currentStep}>
               {steps.map((step, index) => (
                  <Step key={index} title={step.title} />
               ))}
            </Steps>
            <Form form={form} onFinish={handleFinish}>
               <div
                  style={{
                     marginTop: "24px",
                  }}
               >
                  {steps[currentStep].content}
               </div>
               <div style={{ marginTop: "24px", textAlign: "center" }}>
                  {currentStep > 0 && (
                     <Button
                        style={{ marginRight: "8px" }}
                        onClick={handlePrev}
                     >
                        Précédent
                     </Button>
                  )}
                  {currentStep < steps.length - 1 && (
                     <Button type="primary" onClick={handleNext}>
                        Suivant
                     </Button>
                  )}
                  {currentStep === steps.length - 1 && (
                     <Button type="primary" htmlType="submit">
                        Terminer
                     </Button>
                  )}
               </div>
            </Form>
         </div>
      </Modal>
   );
};

export default AjouterStagiaire;
