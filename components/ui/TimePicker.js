import React from "react";
import { Input } from "theme-ui";
import DateTime from "react-datetime";

const TimePicker = ({ ...props }) => {
  return (
    <DateTime
      viewMode="time"
      dateFormat=""
      renderInput={(props, openCalendar) => (
        <Input {...props} onClick={openCalendar} />
      )}
      {...props}
    />
  );
};

export default TimePicker;
