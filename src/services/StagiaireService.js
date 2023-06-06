import Axios from "./caller_service";
const baseUrl = "http://localhost:8080/api/stagiaires";
export const StagiaireService = () => {
  return (
    <div>StagiaireService</div>
  )
}
export const getInternApplications = async (etat) => {
  try {
    return await Axios.get(`${baseUrl}/etat/${etat}`)
  } catch (error) {
    return error;
  }

}
export const getAnInternById = async (id) => {
  try {
    return await Axios.get(`${baseUrl}/${id}`)
  } catch (error) {
    return error;
  }
}
export const updateIntern = async (id, inter) => {
  try {
    return await Axios.put(`${baseUrl}/${id}`, inter)
  } catch (error) {
    return error;
  }
}
export const updateInternv1 = async (id, inter) => {
  try {
    return await Axios.put(`${baseUrl}/v1/${id}`, inter)
  } catch (error) {
    return error;
  }
}
export const acceptDemandeByManager = async (id, inter) => {
  try {
    return await Axios.put(`${baseUrl}/contrat/${id}`, inter)
  } catch (error) {
    return error;
  }
}
export const accepteIntern = async (id, inter) => {
  try {
    return await Axios.put(`${baseUrl}/mail/${id}`, inter)
  } catch (error) {
    return error;
  }
}
export const addInternToMananer = async (id, inter) => {
  try {
    return await Axios.put(`${baseUrl}/gwte/${id}`, inter)
  } catch (error) {
    return error;
  }
}
export const proposeInternToMananer = async (id, inter) => {
  try {
    return await Axios.put(`${baseUrl}/gwte/${id}`, inter)
  } catch (error) {
    return error;
  }
}
export const getStatsEtat = async () => {
  try {

    return await Axios.get(`${baseUrl}/stats-etat`);
  } catch (error) {
    return error;
  }

}
export const getDemandeInterneStats = async () => {
  try {
    return await Axios.get(`${baseUrl}/demande-interne-status`)
  } catch (error) {
    return error;
  }
}
export const getDemandeInterneStatsByManager = async () => {
  try {
    return await Axios.get(`${baseUrl}/demande-interne-status-manager`);
  } catch (error) {
    return error;
  }
}
export const exportToExcel = async () => {

  try {
    return await Axios.get(`${baseUrl}/dowload/excel/enCours`, {
      responseType: 'arraybuffer',
    });
  } catch (error) {
    return error;
  }
}
export const deleteInternApplication = async (id) => {

}