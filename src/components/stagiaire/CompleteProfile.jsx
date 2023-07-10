import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { Card, Divider, Input, Button, Switch, DatePicker } from "antd";
import "./ProfileView.css";
import { useParams } from "react-router-dom";
import { getAnInternById, updateIntern } from "../../services/StagiaireService";

const ProfileView = () => {
   const { id } = useParams();
   const flag = useRef(false);
   const [stagiaire, setStagiaire] = useState();
   const [editing, setEditing] = useState(false);
   const [updatedStagiaire, setUpdatedStagiaire] = useState({});
   const getGerne = (genre) => {
      genre = genre.toLowerCase();
      switch (genre) {
         case "f":
            return "Femme";
         case "m":
            return "Homme";

         default:
            break;
      }
   };
   useEffect(() => {
      if (flag.current === false) {
         getAnInternById(id).then((response) => {
            setStagiaire(response.data);
            setUpdatedStagiaire(response.data);
         });
      }
      return () => {
         flag.current = true;
      };
   }, [id]);

   const handleEdit = () => {
      setEditing(!editing);
   };

   const handleSave = () => {
      updateIntern(id, updatedStagiaire).then(() => {
         setStagiaire(updatedStagiaire);
         setEditing(false);
      });
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedStagiaire((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };

   const handleSwitchChange = (checked) => {
      setEditing(checked);
   };

   const profileCardStyle = {
      maxWidth: "auto",
      margin: "0 auto",
      padding: 24,
      borderRadius: 8,
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
   };

   const sectionTitleStyle = {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 12,
   };

   const fieldStyle = {
      marginBottom: 8,
   };

   const labelStyle = {
      fontWeight: "bold",
   };

   const valueStyle = {
      marginLeft: 8,
   };

   const switchStyle = {
      marginBottom: 16,
      fontSize: 16,
      fontWeight: "bold",
      color: editing ? "#1890ff" : "inherit",
   };

   return (
      <>
         <div style={switchStyle}>
            <Switch checked={editing} onChange={handleSwitchChange} />
            <span style={{ marginLeft: 8 }}>
               {!editing ? "Activer" : "Desactiver"} la modification
            </span>
         </div>
         {stagiaire && (
            <Card
               className="profile-card"
               title={`${stagiaire.prenom} ${stagiaire.nom}`}
               style={profileCardStyle}
            >
               <div className="profile-section">
                  <h3 style={sectionTitleStyle}>Informations de contact</h3>
                  <div className="profile-list">
                     <div className="profile-field">
                        <strong style={labelStyle}>Email :</strong>
                        {editing ? (
                           <Input
                              name="email"
                              value={updatedStagiaire.email}
                              onChange={handleChange}
                           />
                        ) : (
                           <span className="profile-value" style={valueStyle}>
                              {stagiaire.email}
                           </span>
                        )}
                     </div>
                     <div className="profile-field">
                        <strong style={labelStyle}>
                           Numéro de téléphone :
                        </strong>
                        {editing ? (
                           <Input
                              name="numeroTelephone"
                              value={updatedStagiaire.numeroTelephone}
                              onChange={handleChange}
                           />
                        ) : (
                           <span className="profile-value" style={valueStyle}>
                              {stagiaire.numeroTelephone}
                           </span>
                        )}
                     </div>
                     <div className="profile-field">
                        <strong style={labelStyle}>Date de naissance :</strong>
                        {editing ? (
                           <DatePicker
                              name="dateNaissance"
                              value={
                                 updatedStagiaire.dateNaissance
                                    ? moment(updatedStagiaire.dateNaissance)
                                    : null
                              }
                              onChange={(date, dateString) =>
                                 handleChange({
                                    target: {
                                       name: "dateNaissance",
                                       value: dateString,
                                    },
                                 })
                              }
                              style={{ width: "100%" }}
                           />
                        ) : (
                           <span className="profile-value" style={valueStyle}>
                              {stagiaire.dateNaissance
                                 ? moment(stagiaire.dateNaissance).format(
                                      "YYYY-MM-DD"
                                   )
                                 : ""}
                           </span>
                        )}
                     </div>
                     <div className="profile-field">
                        <strong style={labelStyle}>Lieu de naissance :</strong>
                        {editing ? (
                           <Input
                              name="lieuNaissance"
                              value={updatedStagiaire.lieuNaissance}
                              onChange={handleChange}
                           />
                        ) : (
                           <span className="profile-value" style={valueStyle}>
                              {stagiaire.lieuNaissance}
                           </span>
                        )}
                     </div>
                     <div className="profile-field">
                        <strong style={labelStyle}>CNI :</strong>
                        {editing ? (
                           <Input
                              name="cni"
                              value={updatedStagiaire.cni}
                              onChange={handleChange}
                           />
                        ) : (
                           <span className="profile-value" style={valueStyle}>
                              {stagiaire.cni}
                           </span>
                        )}
                     </div>
                     <div className="profile-field">
                        <strong style={labelStyle}>Adresse :</strong>
                        {editing ? (
                           <Input
                              name="adresse"
                              value={updatedStagiaire.adresse}
                              onChange={handleChange}
                           />
                        ) : (
                           <span className="profile-value" style={valueStyle}>
                              {stagiaire.adresse}
                           </span>
                        )}
                     </div>
                     <div className="profile-field">
                        <strong style={labelStyle}>Nationalité :</strong>
                        {editing ? (
                           <Input
                              name="nationalite"
                              value={updatedStagiaire.nationalite}
                              onChange={handleChange}
                           />
                        ) : (
                           <span className="profile-value" style={valueStyle}>
                              {stagiaire.nationalite}
                           </span>
                        )}
                     </div>
                  </div>
               </div>

               <Divider />

               <div className="profile-section">
                  <h3 style={sectionTitleStyle}>Informations de formation</h3>
                  <div className="profile-list">
                     <div className="profile-field">
                        <strong style={labelStyle}>Formation en cours :</strong>
                        {editing ? (
                           <Input
                              name="formationEnCours"
                              value={updatedStagiaire.formationEnCours}
                              onChange={handleChange}
                           />
                        ) : (
                           <span className="profile-value" style={valueStyle}>
                              {stagiaire.formationEnCours}
                           </span>
                        )}
                     </div>
                     <div className="profile-field">
                        <strong style={labelStyle}>École :</strong>
                        {editing ? (
                           <Input
                              name="ecole"
                              value={updatedStagiaire.ecole}
                              onChange={handleChange}
                           />
                        ) : (
                           <span className="profile-value" style={valueStyle}>
                              {stagiaire.ecole}
                           </span>
                        )}
                     </div>
                     <div className="profile-field">
                        <strong style={labelStyle}>Matricule :</strong>
                        {editing ? (
                           <Input
                              name="matricule"
                              value={updatedStagiaire.matricule}
                              onChange={handleChange}
                           />
                        ) : (
                           <span className="profile-value" style={valueStyle}>
                              {stagiaire.matricule
                                 ? stagiaire.matricule
                                 : "matricule non attribué"}
                           </span>
                        )}
                     </div>
                     <div className="profile-field">
                        <strong style={labelStyle}>Niveau d'étude :</strong>
                        {editing ? (
                           <Input
                              name="niveauEtude"
                              value={updatedStagiaire.niveauEtude}
                              onChange={handleChange}
                           />
                        ) : (
                           <span className="profile-value" style={valueStyle}>
                              {stagiaire.niveauEtude}
                           </span>
                        )}
                     </div>
                     <div className="profile-field">
                        <strong style={labelStyle}>Diplôme obtenu :</strong>
                        {editing ? (
                           <Input
                              name="diplomeObtenu"
                              value={updatedStagiaire.diplomeObtenu}
                              onChange={handleChange}
                           />
                        ) : (
                           <span className="profile-value" style={valueStyle}>
                              {stagiaire.diplomeObtenu}
                           </span>
                        )}
                     </div>
                  </div>
               </div>

               <Divider />

               <div className="profile-section">
                  <h3 style={sectionTitleStyle}>
                     Informations supplémentaires
                  </h3>
                  <div className="profile-list">
                     <div className="profile-field">
                        <strong style={labelStyle}>
                           Numéro de téléphone d'urgence :
                        </strong>
                        {editing ? (
                           <Input
                              name="numeroTelUrgence"
                              value={updatedStagiaire.numeroTelUrgence}
                              onChange={handleChange}
                           />
                        ) : (
                           <span className="profile-value" style={valueStyle}>
                              {stagiaire.numeroTelUrgence}
                           </span>
                        )}
                     </div>
                     <div className="profile-field">
                        <strong style={labelStyle}>
                           Situation matrimoniale :
                        </strong>
                        {editing ? (
                           <Input
                              name="situationMatrimonial"
                              value={updatedStagiaire.situationMatrimonial}
                              onChange={handleChange}
                           />
                        ) : (
                           <span className="profile-value" style={valueStyle}>
                              {stagiaire.situationMatrimonial}
                           </span>
                        )}
                     </div>
                     <div className="profile-field">
                        <strong style={labelStyle}>Genre :</strong>
                        {editing ? (
                           <Input
                              name="genre"
                              value={updatedStagiaire.genre}
                              onChange={handleChange}
                           />
                        ) : (
                           <span className="profile-value" style={valueStyle}>
                              {getGerne(stagiaire.genre)}
                           </span>
                        )}
                     </div>
                     <div className="profile-field">
                        <strong style={labelStyle}>Type de stage :</strong>
                        {editing ? (
                           <Input
                              name="typeStage"
                              value={updatedStagiaire.typeStage}
                              onChange={handleChange}
                           />
                        ) : (
                           <span className="profile-value" style={valueStyle}>
                              {stagiaire.typeStage}
                           </span>
                        )}
                     </div>
                  </div>
               </div>

               {editing && (
                  <Button type="primary" onClick={handleSave}>
                     Sauvegarder
                  </Button>
               )}
            </Card>
         )}
      </>
   );
};

export default ProfileView;
