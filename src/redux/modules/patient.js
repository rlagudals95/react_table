import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { customAxios } from "../../config/customAxios";
import axios from "axios";

// 액션 타입을 정의해줍니다.
const SET_PATIENT = "SET_PATIENT";
const SET_COUNT = "SET_COUNT";
const SET_PAGING = "SET_PAGING";
const IS_LOADING = "IS_LOADING";
const SET_FILTER = "SET_FILTER";
const SET_ROW = "SET_ROW";

const SET_GENDER = "SET_GENDER";
const SET_RACE = "SET_RACE";
const SET_ETHNICITY = "SET_ETHNICITY";
const SET_AGE = "SET_AGE";
const SET_IS_DEATH = "SET_IS_DEATH";

const SET_CHART = "SET_CHART";

const SET_DETAIL = "SET_DETAIL";

// 액션 생성 함수를 만듭니다.
const setPatient = createAction(SET_PATIENT);
const setCount = createAction(SET_COUNT);
const setPaging = createAction(SET_PAGING);
const isLoding = createAction(IS_LOADING);
const setRow = createAction(SET_ROW);

// filter
const setGender = createAction(SET_GENDER);
const setRace = createAction(SET_RACE);
const setEthnicity = createAction(SET_ETHNICITY);
const setAge = createAction(SET_AGE);
const setIsDeath = createAction(SET_IS_DEATH);
const setFilter = createAction(SET_FILTER);
const setChart = createAction(SET_CHART);

const setDetail = createAction(SET_DETAIL);
// 초기 State를 정의합니다.
const initialState = {
  detail_data: null,
  patient_list: [],
  isLoding: false,
  filter: null,
  gender: null,
  race: null,
  ethnicity: null,
  is_death: null,
  _rows: [],
  chartData: [
    { x: "data1 ", y: 300 },
    { x: "data2", y: 900 },
    { x: "data3", y: 400 },
    { x: "data4", y: 670 },
  ],
};

// 미들웨어
const getPatientApi = () => {
  return function (dispatch, getState, { history }) {
    customAxios
      .get("/api/patient/list")
      .then((res) => {
        let list = res.data.patient.list;
        //console.log("리스트 코드 : ", list);
        dispatch(setPatient(list));
        dispatch(isLoding());
      })
      .catch((err) => {});
  };
};

const getGenderApi = () => {
  return function (dispatch, getState, { history }) {
    customAxios
      .get("/api/gender/list")
      .then((res) => {
        console.log("성별 리스트 :", res);
        // let list = res.data.patient.list;
        // console.log("리스트 코드 : ", list);
        // dispatch(setPatient(list));
        // dispatch(isLoding());
      })
      .catch((err) => {});
  };
};

const getDetailApi = (id) => {
  return function (dispatch, getState, { history }) {
    customAxios
      .get(`/api/patient/brief/${id}`)
      .then((res) => {
        console.log("상세보기 정보 :", res.data);
        dispatch(setDetail(res.data));
        // let list = res.data.patient.list;
        // console.log("리스트 코드 : ", list);
        // dispatch(setPatient(list));
        // dispatch(isLoding());
      })
      .catch((err) => {});
  };
};

const setList = () => {
  return function (dispatch, getState, { history }) {
    // 필터 적용
    const _state = getState().patient;

    const gender = _state.gender;
    const race = _state.race;
    const ethnicity = _state.ethnicity;
    const is_death = _state.is_death;

    if (gender) {
    } else if (race) {
    } else if (ethnicity) {
    } else if (is_death) {
    }
    console.log("젠더값 가져오기 ", gender, race, ethnicity, is_death);

    dispatch(setPatient({ gender, race, ethnicity, is_death }));
  };
};

// 리듀서 함수를 정의합니다.
export default handleActions(
  {
    [SET_PATIENT]: (state, action) =>
      produce(state, (draft) => {
        //console.log("페이로드 확인 : ", action.payload);
        let payload = action.payload;
        //console.log("페이로드 확인2 : ", action.payload.gender);

        for (let i = 0; i < action.payload.length; i++) {
          if (action.payload.gender != null) {
            console.log(1);
          } else if (payload.race) {
            console.log(2);
          } else if (payload.ethnicity) {
            console.log(3);
          } else if (payload.is_death) {
            console.log(4);
          }

          draft.patient_list.push(action.payload[i]);
        }
        //draft.patient_list = action.payload;
      }),
    [SET_COUNT]: (state, action) =>
      produce(state, (draft) => {
        draft.count = action.payload;
      }),
    [SET_PAGING]: (state, action) =>
      produce(state, (draft) => {
        let list = state.patient_list;

        draft.patient_paging = action.payload;
      }),
    [IS_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.isLoding = !draft.isLoding;
      }),
    [SET_GENDER]: (state, action) =>
      produce(state, (draft) => {
        console.log("성별 선택 리덕스 : ", action.payload);
        draft.gender = action.payload;
      }),
    [SET_RACE]: (state, action) =>
      produce(state, (draft) => {
        draft.race = action.payload;
      }),
    [SET_ETHNICITY]: (state, action) =>
      produce(state, (draft) => {
        draft.ethnicity = action.payload;
      }),
    [SET_AGE]: (state, action) =>
      produce(state, (draft) => {
        draft.age = action.payload;
      }),
    [SET_IS_DEATH]: (state, action) =>
      produce(state, (draft) => {
        draft.is_death = action.payload;
      }),
    [SET_FILTER]: (state, action) =>
      produce(state, (draft) => {
        draft.filter = action.payload;
      }),
    [SET_ROW]: (state, action) =>
      produce(state, (draft) => {
        //console.log("액션 와라잉 :", action.payload);
        //draft._rows = action.payload;
      }),
    [SET_CHART]: (state, action) =>
      produce(state, (draft) => {
        draft.chartData = action.payload;
      }),
    [SET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        console.log("페이로드 검사", action.payload);
        draft.detail_data = action.payload;
      }),
  },
  initialState
);

const actionCreators = {
  getPatientApi,
  setPaging,
  getGenderApi,
  // filter
  setGender,
  setRace,
  setEthnicity,
  setAge,
  setIsDeath,
  setList,
  setFilter,
  setRow,
  setChart,
  getDetailApi,
};

export { actionCreators };
