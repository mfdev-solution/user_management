import Axios from "./caller_service";
const baseUrl = "http://localhost:8080/api/";

export const StructureService = () => {
   return <div>StructureService</div>;
};

export const getAllStructures = async () => {
   try {
      return await Axios.get(`${baseUrl}structure`);
   } catch (error) {
      return error;
   }
};

export const getManagersByStructure = async (id) => {
   try {
      return await Axios.get(`${baseUrl}managers/structure/${id}`)
   } catch (error) {
      return error
   }
}
