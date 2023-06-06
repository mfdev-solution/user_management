import React, { useState } from "react";
import { Form, Input, DatePicker, Button, InputNumber, message } from "antd";
import "../../assets/css/AddDemandeExterne.css";
import { AddDemandeExterne } from "../../services/DemandeInternService";
import { dateFormat } from "../../utils/dateFormat";
const { RangePicker } = DatePicker;

export const DemandeStagiare = () => {
   const [form] = Form.useForm();
   const [loading, setLoading] = useState(false);

   const handleAddDemandeExterne = async (values) => {
      setLoading(true);
      const demande = {
         dateDebut: dateFormat(values.periodeStage[0]),
         dateFin: dateFormat(values.periodeStage[1]),
         profile: values.profile,
         nombreStagiaire: values.nombreStagiaire,
      };
      try {
         AddDemandeExterne(demande)
            .then((response) => {
               console.log(response);
               message.success("Votre demande est envoyee avec successs");
            })
            .catch((error) => {
               console.log(error);
            });
         form.resetFields();
      } catch (error) {
         console.error("Failed to add DemandeExterne:", error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="add-demande-externe">
         <Form form={form} layout="vertical" onFinish={handleAddDemandeExterne}>
            <h2>Ajouter une Demande Externe</h2>
            <Form.Item
               name="periodeStage"
               label="Période de stage"
               rules={[
                  {
                     required: true,
                     message: "Veuillez sélectionner la période de stage",
                  },
               ]}
            >
               <RangePicker />
            </Form.Item>
            <Form.Item
               name="profile"
               label="Profil"
               rules={[
                  { required: true, message: "Veuillez entrer le profil" },
               ]}
            >
               <Input />
            </Form.Item>
            <Form.Item
               name="nombreStagiaire"
               label="Nombre de stagiaires"
               rules={[
                  {
                     required: true,
                     message: "Veuillez entrer le nombre de stagiaires",
                  },
               ]}
            >
               <InputNumber />
            </Form.Item>
            <Form.Item>
               <Button type="primary" htmlType="submit" loading={loading}>
                  Ajouter
               </Button>
            </Form.Item>
         </Form>
      </div>
   );
};
