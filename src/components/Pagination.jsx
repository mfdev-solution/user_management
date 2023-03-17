import React from "react";

const Pagination = ({
   nbUser,
   setcurrentPage,
   currentPage,
}) => {
    // console.log(usersPerPage);
   let pages = [];
   for (let i = 1; i <= nbUser; i++) {
      pages.push(i);
   }

   return (
      <div className="col">
         {pages.map((page, index) => {
            return (
               <button
                  key={index}
                  onClick={() => setcurrentPage(page)}
                  className={page === currentPage ? "active" : ""}
               >
                  {page}
               </button>
            );
         })}
      </div>
   );
};

export default Pagination;
