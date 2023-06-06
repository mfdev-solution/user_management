import { Select, Form, Button, Modal, message, DatePicker,  } from "antd";

import { useEffect, useRef, useState } from "react";
import {
   getAllStructures,
   getManagersByStructure,
} from "../services/StructureService";
import {  addInternToMananer } from "../services/StagiaireService";
import { dateFormat } from "../utils/dateFormat";
const { Option } = Select;
const AddManagerToIntern = ({ opened, id, onClosed, action }) => {
   const [structures, setStructures] = useState([]);
   // const [selectedStructure, setSelectedStructure] = useState(null);
   const flag = useRef(false);
   const [managers, setManagers] = useState([]);
   const [form] = Form.useForm();
   const [open, setOpen] = useState(opened);
   useEffect(() => {
      if (flag.current === false)
         getAllStructures()
            .then((response) => {
               setStructures(response.data);
            })
            .catch((err) => {
               console.log(err);
            });
      return () => (flag.current = true);
   }, []);
   const handleStructureChange = (value) => {
      setManagers(null);
      getManagersByStructure(value)
         .then((response) => {
            console.log(response.data, value);
            setManagers(response.data);
         })
         .catch((error) => {
            console.log(error);
         });
   };
   const handleSubmit = (values) => {
      const demande = {
         manager: values.manager,
         structure: values.structure,
         remuneration: values.remuneration,
         dateDebutStage: dateFormat(values.dateDebutStage),
         dateFinStage: dateFormat(values.dateFinStage),
         action: action,
      };

      addInternToMananer(id, demande)
         .then((response) => {
            console.log(response);
            onClosed(id);
            message.success(
               "affectation reussie vous devrez attendre l'accord du manager"
            );
         })
         .catch((err) => {
            console.log(values, err);
         });

      // console.log(values.remuneration);
   };
   const handleClose = () => {
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
               <Form.Item
                  name="structure"
                  label="Structure"
                  rules={[
                     {
                        required: true,
                        message: "Veuillez sélectionner une structure",
                     },
                  ]}
               >
                  <Select
                     placeholder="Sélectionnez une structure"
                     onChange={handleStructureChange}
                  >
                     {structures.map((structure) => (
                        <Option key={structure.id} value={structure.id}>
                           {structure.nomStructure}
                        </Option>
                     ))}
                  </Select>
               </Form.Item>

               {managers && managers.length > 0 ? (
                  <>
                     <Form.Item
                        name="manager"
                        label="Manager"
                        rules={[
                           {
                              required: true,
                              message: "Veuillez sélectionner un manager",
                           },
                        ]}
                     >
                        <Select placeholder="Sélectionnez un manager">
                           {/* {console.log(managers)} */}
                           {managers.map((manager) => (
                              <Option key={manager.id} value={manager.id}>
                                 {manager.firstName} {manager.lastName}
                              </Option>
                           ))}
                        </Select>
                     </Form.Item>
                     <Form.Item
                        name="dateDebutStage"
                        label="Date de debut de stage"
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
                     <Form.Item
                        name="remuneration"
                        label="remuneration"
                        rules={[{ required: true }, { type: "number" }]}
                     >
                        <Select placeholder="Selectionner le montant de la remuneration">
                           <Option key={30000} value={30000}>
                              30.000
                           </Option>
                           <Option key={60000} value={60000}>
                              60.000
                           </Option>
                        </Select>
                     </Form.Item>
                  </>
               ) : (
                  ""
               )}
               <Form.Item>
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
export default AddManagerToIntern;
