import { DatePicker, Modal } from "antd";
import dayjs from "dayjs";

import React, { useState } from "react";
import { dateFormatpicker } from "../../utils/dateFormat";

export const EditContrat = ({ open, data }) => {
   const [opened, setopened] = useState(open);
   const dateFormat = "YYYY/MM/DD";
   const { RangePicker } = DatePicker;
   return (
      <div>
         <Modal
            open={opened}
            data={data}
            onCancel={() => setopened(false)}
            onOk={() => setopened(false)}
         >
            {console.log(dateFormatpicker(data.dateDebut))}
            <RangePicker
               defaultValue={[
                  dayjs(dateFormatpicker(data.dateDebut), dateFormat),
                  dayjs(dateFormatpicker(data.dateFin), dateFormat),
               ]}
               format={dateFormat}
               onChange={(values) => console.log(values)}
            />
         </Modal>
      </div>
   );
};
