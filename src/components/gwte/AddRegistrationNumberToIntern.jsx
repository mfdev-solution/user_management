import React, { useState } from "react";
import { Form, Modal, Input, Button } from "antd";
import { updateIntern } from "../../services/StagiaireService";

export const AddRegistrationNumberToIntern = ({ id, open, onClosed }) => {
   const [form] = Form.useForm();
   const [opened, setOpened] = useState(open);
   const handleSubmit = (values) => {
      updateIntern(id, { matricule: values.matricule, etat: "complet" })
         .then((response) => {
            console.log(response);
            onClosed();
         })
         .catch((err) => {
            console.log(err);
         });
      setOpened(false);
   };
   return (
      <Modal
         title="Ajouter un matricule au stagiaire"
         open={opened}
         width={500}
         onCancel={() => {
            setOpened(false);
         }}
         footer={null}
      >
         <Form form={form} onFinish={handleSubmit}>
            <Form.Item
               name="matricule"
               label="Matricule du stagiaire"
               rules={[{ required: true }]}
            >
               <Input />
            </Form.Item>
            <Form.Item className="center">
               <Button
                  type="primary"
                  style={{ backgroundColor: "rgba(0,151,149,0.9)" }}
                  htmlType="submit"
               >
                  Valider
               </Button>
            </Form.Item>
         </Form>
      </Modal>
   );
};
