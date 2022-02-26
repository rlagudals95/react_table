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

    let filter_value = event.target.value;

    let _name = props.name;
    //console.log("프롭스 확인 : ", _name);
    dispatch(
      patientActions.setFilter({ name: _name, value: event.target.value })
    );

    // if (_name == "gender") {
    //   console.log("성별 선택");
    //   //dispatch(patientActions.setGender(filter_value));
    //   dispatch(patientActions.setFilter(_name));
    //   dispatch(patientActions.setList());
    // } else if (_name == "race") {
    //   console.log("인종 선택");
    //   //dispatch(patientActions.setRace(filter_value));
    //   dispatch(patientActions.setList());
    // } else if (_name == "ethnicity") {
    //   console.log("민족 선택");
    //   //dispatch(patientActions.setEthnicity(filter_value));
    //   dispatch(patientActions.setList());
    // } else if (_name == "age") {
    //   console.log("나이 선택");
    //   //dispatch(patientActions.setAge(filter_value));
    //   dispatch(patientActions.setList());
    // } else if (_name == "isDeath") {
    //   console.log("생존유무 선택");
    //   //dispatch(patientActions.setIsDeath(filter_value));
    //   dispatch(patientActions.setList());
    // }

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
            value={value}
            label="Age"
            onChange={handleChange}
          >
            {props.option.map((p) => {
              return <MenuItem value={p}>{p}</MenuItem>;
            })}
            {/* <MenuItem value={10}>{props.option}</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
