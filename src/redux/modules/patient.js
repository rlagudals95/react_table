import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { customAxios } from "../../config/customAxios";
import axios from "axios";

// 액션 타입을 정의해줍니다.
const SET_ALL_LIST = "SET_ALL_LIST";
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
const RESET_CHART = "RESET_CHART";
const SET_DETAIL = "SET_DETAIL";

const IS_MODAL = "IS_MODAL";

// 액션 생성 함수를 만듭니다.
const setPatient = createAction(SET_PATIENT);
const setAllList = createAction(SET_ALL_LIST);
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
const resetChart = createAction(RESET_CHART);

// modal
const isModal = createAction(IS_MODAL);

const setDetail = createAction(SET_DETAIL);
// 초기 State를 정의합니다.
const initialState = {
  detail_data: null,
  patient_list: [],
  all_patient_list: [],
  isLoding: false,
  filter: null,
  gender: null,
  race: null,
  ethnicity: null,
  is_death: null,
  _rows: [],
  chartData: [
    { x: "data1 (10%)", y: 100 },
    { x: "data2 (20%)", y: 200 },
    { x: "data3 (40%)", y: 400 },
    { x: "data4 (0%)", y: 300 },
  ],
  chartTotal: 0,
  isModal: false,
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
        // 필터 선택시 모든 데이터중에서 적용하기 위해 따로 데이터 메모
        dispatch(setAllList(list));
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
        dispatch(isModal(true));
      })
      .catch((err) => {});
  };
};

// 리듀서 함수를 정의합니다.
export default handleActions(
  {
    [SET_PATIENT]: (state, action) =>
      produce(state, (draft) => {
        console.log("리스트 변경 : ", action.payload);
        draft.patient_list = action.payload;
      }),
    [SET_ALL_LIST]: (state, action) =>
      produce(state, (draft) => {
        console.log("리스트 변경 : ", action.payload);
        draft.all_patient_list = action.payload;
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
    [SET_ROW]: (state, action) => produce(state, (draft) => {}),
    [SET_CHART]: (state, action) =>
      produce(state, (draft) => {
        let percent;
        // 차트 데이터 퍼센트 표시
        for (let i = 0; i < action.payload.length; i++) {
          percent = (action.payload[i].y / 1000) * 100;
          action.payload[i].x =
            action.payload[i].x + " " + "(" + Math.floor(percent) + "%" + ")";
        }
        draft.chartData = action.payload;
      }),
    [SET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_data = action.payload;
      }),
    [RESET_CHART]: (state, action) =>
      produce(state, (draft) => {
        draft.chartData = [
          { x: "data1 (10%)", y: 100 },
          { x: "data2 (20%)", y: 200 },
          { x: "data3 (40%)", y: 400 },
          { x: "data4 (30%)", y: 300 },
        ];
      }),
    [IS_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.isModal = action.payload;
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
  setFilter,
  setRow,
  setChart,
  getDetailApi,
  resetChart,
  setPatient,
  setAllList,
  isModal,
};

export { actionCreators };
