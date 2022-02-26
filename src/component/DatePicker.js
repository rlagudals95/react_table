import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user"

export default function BasicDatePicker() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(null);

  function setBirthday(day) {
    console.log("선택날짜 :", day.toISOString().substr(0, 10));
    let dayStr = day.toISOString().substr(0, 10);

    setValue(dayStr);
    dispatch(userActions.setBirthday(dayStr));
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Birthday"
        value={value}
        onChange={(newValue) => {
          setBirthday(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
