import React from "react";
import { Input } from "theme-ui";
import DateTime from "react-datetime";

const TimePicker = ({ ...props }) => {
  return (
    <DateTime
      initialViewMode="time"
      dateFormat=""
      locale="vi"
      renderInput={(props, openCalendar) => {
        return <Input {...props} onClick={openCalendar} />;
      }}
      timeConstraints={{
        minutes: {
          step: 15,
        },
      }}
      {...props}
    />
  );
};

export default TimePicker;
