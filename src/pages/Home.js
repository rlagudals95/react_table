import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DataGrid from "../component/DataGrid";
import Select from "../component/Select";
import { customAxios } from "../config/customAxios";
import { useSelector, shallowEqual } from "react-redux";
import PieChart from "../component/PieChart";
import Button from "@mui/material/Button";
import { actionCreators as patientActions } from "../redux/modules/patient";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const [gender, setGender] = useState([]);
  const [race, setRace] = useState([]);
  const [ethnicity, setEthnicity] = useState([]);
  const [age, setAge] = useState([1, 10, 20, 30, 40, 50, 60, 70, 80, 90]);
  const [isDeath, setIsDeath] = useState(["사망", "생존"]);

  async function getOption() {
    const genderRes = await customAxios.get("/api/gender/list");
    const raceRes = await customAxios.get("/api/race/list");
    const ethnicityRes = await customAxios.get("/api/ethnicity/list");

    let _gender = genderRes.data.genderList;
    let _race = raceRes.data.raceList;
    let _ethnicity = ethnicityRes.data.ethnicityList;

    setGender(_gender);
    setRace(_race);
    setEthnicity(_ethnicity);
  }
  function resetFilter() {
    dispatch(patientActions.setFilter(null));
  }
  const { patient_list, filter } = useSelector(
    (state) => ({
      patient_list: state.patient.patient_list,
      filter: state.patient.filter,
    }),
    shallowEqual
  );

  useEffect(() => {
    getOption();
  }, []);

  return (
    <>
      <AppContainer>
        <ChartContainer>
          <h3>필터를 선택하면 차트 데이터를 볼 수 있습니다 :)</h3>
          <PieChart />
        </ChartContainer>
        <h3>Filter</h3>
        <FlexBox>
          <Select name="gender" option={gender} />
          <Select name="race" option={race} />
          <Select name="ethnicity" option={ethnicity} />
          <Select name="age" option={age} />
          <Select name="isDeath" option={isDeath} />
          <Button
            onClick={resetFilter}
            variant="contained"
            style={{ cursor: "pointer" }}
          >
            list reset
          </Button>
        </FlexBox>
        {/* <DataTable></DataTable> */}
        <DataGrid></DataGrid>
      </AppContainer>
    </>
  );
}

export default Home;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  //text-align: center;
  padding: 100px 50px 100px 50px;

  justify-content: center;
  /* position: absolute;
  top: 50%;
  left: 50%; */
  //transform: translate(-50%, -50%);
  /* padding: 0px 50px; */
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 10px;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px auto;
  display: flex;
  justify-content: center;
  opacity: 0.8;
`;
const GridContainer = styled.div`
  max-height: 500px;
  overflow: scroll;
`;
