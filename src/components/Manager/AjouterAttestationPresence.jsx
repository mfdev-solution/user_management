import { Select, Form, Button, Modal, message, DatePicker, Input } from "antd";

import { useEffect, useRef, useState } from "react";
import { ajouterAttestationPresence } from "../../services/ManagerService";
import { dateFormat } from "../../utils/dateFormat";
const { Option } = Select;

export const AjouterAttestationPresence = ({ opened, values, onClosed }) => {
   const flag = useRef(false);
   const [form] = Form.useForm();
   const [open, setOpen] = useState(opened);
   useEffect(() => {
      if (flag.current === false) {
         console.log(values);
      }
      return () => (flag.current = true);
   }, [values]);
   const handleClose = () => {
      setOpen(false);
   };
   const handleSubmit = (formValues) => {
      ajouterAttestationPresence({
         stagiaire: values,
         dateDebut: dateFormat(formValues.dateDebutStage),
         dateFin: dateFormat(formValues.dateFinStage),
      })
         .then((response) => {
            console.log(response.data);
         })
         .catch((err) => {
            console.log(err);
         });
      console.log(formValues, values);
      setOpen(false);
   };
   return (
      <>
         <Modal
            title="Ajouter un manager"
            open={open}
            onCancel={handleClose}
            width={500}
            footer={null}
         >
            <Form form={form} onFinish={handleSubmit}>
               <>
                  <Form.Item
                     name="dateDebutStage"
                     label="Date de debut de stage"
                     placeholder="date debut"
                     rules={[{ required: true }]}
                  >
                     <DatePicker />
                  </Form.Item>
                  <Form.Item
                     name="dateFinStage"
                     label="Date de fin de stage"
                     rules={[{ required: true }]}
                  >
                     <DatePicker />
                  </Form.Item>
               </>

               <Form.Item style={{ textAlign: "left" }}>
                  <Button
                     onClick={() => setOpen(false)}
                     type="primary"
                     htmlType="submit"
                  >
                     Enregistrer
                  </Button>
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};
