/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { Input, jsx, Box } from "theme-ui";
import DateTime from "react-datetime";
import moment from "moment";

const DatePicker = ({ ...props }) => {
  return (
    <DateTime
      dateFormat="L"
      timeFormat=""
      locale="vi"
      renderInput={(props, openCalendar) => (
        <Input {...props} onClick={openCalendar} />
      )}
      renderYear={(props, year, selectedDate) => {
        return (
          <Box
            as="td"
            {...props}
            sx={{
              fontWeight:
                moment(selectedDate).year() === year ? "bold" : "normal",
            }}
          >
            {year}
          </Box>
        );
      }}
      renderMonth={(props, month, year, selectedDate) => {
        return (
          <Box
            as="td"
            {...props}
            sx={{
              fontWeight:
                moment(selectedDate).month() === month &&
                moment(selectedDate).year() === year
                  ? "bold"
                  : "normal",
            }}
          >
            {moment.localeData().monthsShort(moment().month(month))}
          </Box>
        );
      }}
      {...props}
    />
  );
};

export default DatePicker;
