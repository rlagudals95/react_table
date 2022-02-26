import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as patientActions } from "../redux/modules/patient";

export default function BasicSelect(props) {
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    console.log("event :: ", event.target.value);

    //let filter_value = event.target.value;

    let _name = props.name;
    dispatch(
      patientActions.setFilter({ name: _name, value: event.target.value })
    );

    setValue(event.target.value);
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }} style={{ marginRight: "10px" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{props.name}</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className={props.name}
            value={value}
            label="Age"
            onChange={handleChange}
          >
            {props.option.map((p) => {
              return <MenuItem value={p}>{p}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
