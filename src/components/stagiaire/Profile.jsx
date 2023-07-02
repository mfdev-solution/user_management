import React, { useState } from "react";
import { Row, Col, Card, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import user from "../../assets/user.png";
import "../../assets/css/Profile.css"; // import CSS file

const { Meta } = Card;

const Profile = ({ stagiaire, open }) => {
   const [opened, setOpened] = useState(open);
   const getGerne = (genre) => {
      switch (genre.toLowerCase()) {
         case "f":
            return "Femme";
         case "m":
            return "Homme";

         default:
            break;
      }
   };
   return (
      <Modal
         style={{ top: 0 }}
         open={opened}
         width={"50vw"}
         onCancel={() => {
            setOpened(false);
         }}
         footer={null}
      >
         <h2>
            Profile de {stagiaire.prenom} {stagiaire.nom}
         </h2>
         <Card
            className="profile-card" // add class name to the card
            actions={[
               <UserOutlined key="edit" onClick={() => console.log("edit")} />,
            ]}
         >
            <img
               src={stagiaire.photoUrl || user}
               alt="Profile"
               className="profile-image"
            />{" "}
            {/* add profile image with class name */}
            <Meta
               title={`${stagiaire.prenom} ${stagiaire.nom}`}
               description={`Email: ${stagiaire.email}`}
            />
            <Row gutter={24} style={{ marginTop: 20 }}>
               <Col span={12}>
                  <p>
                     <strong>Numéro de téléphone:</strong>{" "}
                     {stagiaire.numeroTelephone}
                  </p>
                  <p>
                     <strong>Date de naissance:</strong>{" "}
                     {stagiaire.dateNaissance}
                  </p>
                  <p>
                     <strong>Lieu de naissance:</strong>{" "}
                     {stagiaire.lieuNaissance}
                  </p>
                  <p>
                     <strong>CNI:</strong> {stagiaire.cni}
                  </p>
                  <p>
                     <strong>Adresse:</strong> {stagiaire.adresse}
                  </p>
                  <p>
                     <strong>Nationalité:</strong> {stagiaire.nationalite}
                  </p>
               </Col>
               <Col span={12}>
                  <p>
                     <strong>Formation en cours:</strong>{" "}
                     {stagiaire.formationEnCours}
                  </p>
                  <p>
                     <strong>École:</strong> {stagiaire.ecole}
                  </p>

                  <p>
                     <strong>Niveau d'études:</strong> {stagiaire.niveauEtude}
                  </p>
                  <p>
                     <strong>Diplôme obtenu:</strong> {stagiaire.diplomeObtenu}
                  </p>
                  <p>
                     <strong>Numéro de téléphone d'urgence:</strong>{" "}
                     {stagiaire.numeroTelUrgence}
                  </p>
                  <p>
                     <strong>Situation matrimoniale:</strong>{" "}
                     {getGerne(stagiaire.situationMatrimonial)}
                  </p>
               </Col>
            </Row>
         </Card>
      </Modal>
   );
};

export default Profile;
