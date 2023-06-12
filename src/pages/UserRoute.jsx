import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import PageNotFound from "./PageNotFound";
import { Test } from "../components/gwte/Test";
import { AccessDenied } from "./AccessDenied";
import { AdminDashboard } from "./Admin/AdminDashboard";
import ALayout from "./ALayout";
import { EditUser } from "./Admin/user/EditUser";
import { User } from "./Admin/user/User";
import { AddUser } from "./Admin/user/AddUser";
import { ManagerDashboard } from "./manager/ManagerDashboard";
import { GwteDashboard } from "./gwte/GwteDashboard";
import { Test1 } from "../components/gwte/Test1";
import MLayout from "./MLayout";
import { GestionContrat } from "./gwte/GestionContrat";
import { InternList } from "../components/contrat/InternList";
import Authentication from "./Authentication";
import CompleteProfile from "../components/stagiaire/CompleteProfile";
import { GestionStagiare } from "./manager/GestionStagiare";
import { GestionAttesttationPressence } from "./manager/GestionAttesttationPressence";
import { DemandeInterne } from "./gwte/DemandeInterne";
import { GestionDemandeIterne } from "./gwte/GestionDemandeIterne";
import { AuthenticationComponent } from "../components/AuthenticationComponent";
import { GestionPayement } from "./gwte/GestionPayement";

const UserRoute = () => {
   return (
      <Routes>
         <Route index element={<Authentication />} />
         <Route>
            <Route element={<Layout />}>
               <Route path="admin/*" element={<ALayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="user">
                     <Route index element={<User />} />
                     <Route path="edit/:id" component={<EditUser />} />
                     <Route path="add" component={<AddUser />} />
                  </Route>
               </Route>

               <Route path="manager/*" element={<MLayout />}>
                  <Route index element={<ManagerDashboard />} />
                  <Route path="dashboard" element={<ManagerDashboard />} />
                  <Route
                     path="gestion-stagiaires"
                     element={<GestionStagiare />}
                  />
                  <Route
                     path="gestion-attestation"
                     element={<GestionAttesttationPressence />}
                  />
               </Route>

               <Route path="gwte/*" element={<ALayout />}>
                  <Route index element={<GwteDashboard />} />
                  <Route path="auth" element={<AuthenticationComponent />} />

                  <Route path="demande-stage/">
                     <Route index element={<Test />} />
                     <Route path="edit/:id" element={<Test1 />} />
                     <Route path="suivis" element={<Test1 />} />
                     <Route path="add" element={<AddUser />} />
                  </Route>

                  <Route path="contrat-stage/" element={<GestionContrat />}>
                     <Route path="list" element={<InternList />} />
                     <Route path="suivis" element={<Test1 />} />
                     <Route path="add" element={<AddUser />} />
                  </Route>

                  <Route
                     path="stagiaire/profile/:id"
                     element={<CompleteProfile />}
                  />
                  <Route path="demande-interne" element={<DemandeInterne />} />
                  <Route
                     path="suivi-demande"
                     element={<GestionDemandeIterne />}
                  />
                  <Route path="payment" element={<GestionPayement />} />
                  <Route path="*" element={<PageNotFound />} />
               </Route>

               <Route path="/access-denied" element={<AccessDenied />} />
               <Route path="*" element={<PageNotFound />} />
            </Route>
         </Route>
      </Routes>
   );
};
export default UserRoute;
