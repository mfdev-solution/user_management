//to formate date which is sent to the backend
export const dateFormat = (dateObj) => {
   const date = new Date(dateObj["$d"]);
   return date.toISOString(); // "2 avril 2023 à 17:00:29 UTC+2"
};
export const dateFormatFront = (dateObj) => {
   const date = new Date(dateObj);
   return date.getDate() + " " + date.getMonth() + " " + date.getFullYear(); // "2 avril 2023 à 17:00:29 UTC+2"
};
// export const dateFormatpicker = (dateObj) => {
//    const date = new Date(dateObj);
//    return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate(); // "2 avril 2023 à 17:00:29 UTC+2"
// };
export const dateFormatpicker = (dateObj) => {
   const date = new Date(dateObj);
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, "0");
   const day = String(date.getDate()).padStart(2, "0");
   return `${year}/${month}/${day}`;
};
//for the front
export const formatDate = (dateString) => {
   const dateObject = new Date(dateString);
   return dateObject.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
   });
};
