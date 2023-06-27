import Axios from "./caller_service";
const baseUrl = "http://localhost:8080/api/messages/";

export const MessageService = () => {
   return <div>MessageService</div>;
};

export const getAllMessagesByManager = async () => {
   try {
      return await Axios.get(`${baseUrl}manager`);
   } catch (error) {
      return error;
   }
};

export const getAllMessagesBGwte = async () => {
   try {
      return await Axios.get(`${baseUrl}gwte`);
   } catch (error) {
      return error;
   }
};

export const addMessage = async (message) => {
   try {
      return await Axios.post(`${baseUrl}`, message);
   } catch (error) {
      return error;
   }
};

export const updateMessage = async (id, message) => {
   try {
      return await Axios.put(`${baseUrl}${id}`, message);
   } catch (error) {
      return error;
   }
};
export const messageModificationAtp = async (message) => {
   try {
      return await Axios.post(`${baseUrl}modication-atp-message`, message);
   } catch (error) {
      return error;
   }
};
