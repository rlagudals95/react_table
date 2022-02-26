import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import React, { useState, useEffect } from "react";
import { customAxios } from "../config/customAxios";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { actionCreators as patientActions } from "../redux/modules/patient";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Modal from "./Modal";

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "personID",
    numeric: false,
    disablePadding: true,
    label: "personID",
  },
  {
    id: "gender",
    numeric: false,
    disablePadding: false,
    label: "성별",
  },
  {
    id: "birthDatetime",
    numeric: false,
    disablePadding: false,
    label: "생년월일",
  },
  {
    id: "age",
    numeric: true,
    disablePadding: false,
    label: "나이",
  },
  {
    id: "race",
    numeric: false,
    disablePadding: false,
    label: "인종",
  },
  {
    id: "ethnicity",
    numeric: false,
    disablePadding: false,
    label: "민족",
  },
  {
    id: "isDeath",
    numeric: false,

    disablePadding: false,
    label: "사망여부",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  //onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          환자 리스트
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [conditionList, setConditionList] = useState([]);
  const [visitCount, setVisitCount] = useState("방문 횟수 ");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  //const patient_list = useSelector((state) => state.patient.patient_list);

  const {
    patient_list,
    gender,
    race,
    ethnicity,
    is_death,
    filter,
    detail_data,
  } = useSelector(
    (state) => ({
      patient_list: state.patient.patient_list,
      gender: state.patient.gender,
      race: state.patient.race,
      ethnicity: state.patient.ethnicity,
      is_death: state.patient.is_death,
      filter: state.patient.filter,
      _rows: state.patient.rows,
      detail_data: state.patient.detail_data,
    }),
    shallowEqual
  );

  async function getPatientList() {
    console.log("얘왜이러..", rows);

    //const res = await customAxios.get("/api/patient/list");
    await dispatch(patientActions.getPatientApi());

    let list = [];
    let _filter_list = [gender, race, ethnicity, is_death];

    for (let i = 0; i < _filter_list.length; i++) {
      if (_filter_list[i]) {
        filter_list.push(_filter_list[i]);
      }
    }
    let filter_list = [];

    let flag;

    const p = patient_list;
    let filter_name = filter ? filter.name : null;
    let filter_value = filter ? filter.value : null;

    // gender chart data
    let maleCnt = 0;
    let femaleCnt = 0;

    // race chart data
    let otherCnt = 0;
    let nativeCnt = 0;
    let blackCnt = 0;
    let whiteCnt = 0;
    let asianCnt = 0;

    // hispanic chart data
    let hispanicCnt = 0;
    let nonHispanicCnt = 0;

    // hispanic chart data
    let deathCnt = 0;
    let liveCnt = 0;

    // age chart data
    let ageCnt1 = 0;
    let ageCnt2 = 0;
    let ageCnt3 = 0;
    let ageCnt4 = 0;
    let ageCnt5 = 0;
    let ageCnt6 = 0;
    let ageCnt7 = 0;
    let ageCnt8 = 0;
    let ageCnt9 = 0;
    let ageCnt10 = 0;

    if (filter) {
      //   console.log("필터임니다>!", filter, filter_name);
      //   console.log("필터네임과 밸류", p[1].gender, filter_name, filter_value);
      for (let i = 0; i < p.length; i++) {
        //console.log("값확인", p[i].filter_name, filter_value);
        if (filter_name == "gender") {
          if (p[i].gender == "M") {
            maleCnt++;
          } else {
            femaleCnt++;
          }
          if (p[i].gender == filter_value) {
            list.push(p[i]);
          }
        }
        if (filter_name == "race") {
          if (p[i].race == "native") {
            nativeCnt++;
          } else if (p[i].race == "black") {
            blackCnt++;
          } else if (p[i].race == "white") {
            whiteCnt++;
          } else if (p[i].race == "asian") {
            asianCnt++;
          } else {
            otherCnt++;
          }
          if (p[i].race == filter_value) list.push(p[i]);
        }
        if (filter_name == "ethnicity") {
          if (p[i].ethnicity == "hispanic") {
            hispanicCnt++;
          } else {
            nonHispanicCnt++;
          }
          if (p[i].ethnicity == filter_value) list.push(p[i]);
        }
        if (filter_name == "isDeath") {
          let _isDeath = p[i].isDeath ? "사망" : "생존";

          if (p[i].isDeath) {
            // 사망
            deathCnt++;
          } else {
            liveCnt++;
          }
          if (_isDeath == filter_value) list.push(p[i]);
        }
        //console.log("필터이름 :", filter_name);
        if (filter_name == "age") {
          console.log(
            "이게 조건 맞음?",
            filter_value < parseInt(p[i].age) < filter_value + 9
          );
          if (
            // filter_value < 90 &&
            filter_value <= p[i].age &&
            p[i].age <= filter_value + 9
          ) {
            rows.length = 0;
            list.push(p[i]);
          }

          if (1 <= p[i].age && p[i].age < 10) {
            ageCnt1++;
          } else if (10 <= p[i].age && p[i].age < 20) {
            ageCnt2++;
          } else if (20 <= p[i].age && p[i].age < 30) {
            ageCnt3++;
          } else if (30 <= p[i].age && p[i].age < 40) {
            ageCnt4++;
          } else if (40 <= p[i].age && p[i].age < 50) {
            ageCnt6++;
          } else if (50 <= p[i].age && p[i].age < 60) {
            ageCnt7++;
          } else if (60 <= p[i].age && p[i].age < 70) {
            ageCnt8++;
          } else if (70 <= p[i].age && p[i].age < 80) {
            ageCnt9++;
          } else if (80 <= p[i].age && p[i].age < 90) {
            ageCnt10++;
          }
          //   console.log(
          //     "나이 범위 :",
          //     filter_value,
          //     "//",
          //     p[i].age,
          //     "//",
          //     filter_value + 9
          //   );
          //   console.log("필터이름 : ", filter_name);
          //   console.log("나이 : ", p[i].age);
          //   console.log("필터 밸류 : ", filter_value);
        }
      }
    } else {
      for (let i = 0; i < p.length; i++) {
        //console.log(p[i]);

        list.push(p[i]);
      }
    }

    // console.log("카운트 확인 성별 :", [
    //   { male: maleCnt },
    //   { female: femaleCnt },
    // ]);
    // console.log("카운트 인종 :", [
    //   { native: nativeCnt },
    //   { black: blackCnt },
    //   { white: whiteCnt },
    //   { asian: asianCnt },
    //   { other: otherCnt },
    // ]);
    console.log("카운트 인종 :", [
      { x: "hispanic", y: hispanicCnt },
      { x: "nonHispanicCnt", y: nonHispanicCnt },
    ]);
    if (filter) {
      if (filter_name == "gender") {
        dispatch(
          patientActions.setChart([
            { x: "male", y: maleCnt },
            { x: "female", y: femaleCnt },
          ])
        );
      }
      if (filter_name == "race") {
        dispatch(
          patientActions.setChart([
            { x: "native", y: nativeCnt },
            { x: "black", y: blackCnt },
            { x: "white", y: whiteCnt },
            { x: "asian", y: asianCnt },
            { x: "other", y: otherCnt },
          ])
        );
      }
      if (filter_name == "ethnicity") {
        dispatch(
          patientActions.setChart([
            { x: "hispanic", y: hispanicCnt },
            { x: "nonHispanicCnt", y: nonHispanicCnt },
          ])
        );
      }
      if (filter_name == "isDeath") {
        dispatch(
          patientActions.setChart([
            { x: "사망", y: deathCnt },
            { x: "생존", y: liveCnt },
          ])
        );
      }
      if (filter_name == "age") {
        dispatch(
          patientActions.setChart([
            { x: "10살 이하", y: ageCnt1 },
            { x: "10대", y: ageCnt2 },
            { x: "20대", y: ageCnt3 },
            { x: "30대", y: ageCnt4 },
            { x: "40대", y: ageCnt5 },
            { x: "50대", y: ageCnt6 },
            { x: "60대", y: ageCnt7 },
            { x: "70대", y: ageCnt8 },
            { x: "80대", y: ageCnt9 },
            { x: "90대", y: ageCnt10 },
          ])
        );
      }
    }
    console.log(list[1]);
    rows.push(...list);

    setTimeout(function () {
      setLoading(true);
    }, 1000);
  }

  useEffect(() => {
    rows.length = 0;
    getPatientList();
  }, [loading, filter]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    //const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    event.stopPropagation();
    //setOpen(!open);
    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }

    //setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // 상세보기
  const showDetail = async (id) => {
    await dispatch(patientActions.getDetailApi(id));
    //setOpen(!open);
    handleOpen();
  };
  // 모달
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  //const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ width: "100%" }}>
      {/* 모달 */}
      {/* <Modal /> */}
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              //   onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  //const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <React.Fragment>
                      <TableRow
                        hover
                        style={{ cursor: "pointer" }}
                        onClick={() => showDetail(row.personID)}
                        //role="checkbox"
                        //aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        //selected={isItemSelected}
                      >
                        <TableCell />
                        <TableCell>
                          <Modal
                            data={detail_data}
                            style={{ cursor: "pointer" }}
                            onClick={() => showDetail(row.personID)}
                            tabIndex={-1}
                            key={row.personID}
                          />
                        </TableCell>
                        {/* <TableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            //onClick={() => showDetail(row.personID)}
                          >
                            {open ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell> */}

                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.personID}
                        </TableCell>
                        <TableCell align="right">
                          {row.gender == "F" ? "여성" : "남성"}
                        </TableCell>
                        <TableCell align="right">{row.birthDatetime}</TableCell>
                        <TableCell align="right">{row.age}</TableCell>
                        <TableCell align="right">{row.race}</TableCell>
                        <TableCell align="right">{row.ethnicity}</TableCell>
                        <TableCell align="right">
                          {row.isDeath ? "사망" : "생존"}
                        </TableCell>
                      </TableRow>
                      {/*  상세보기 */}
                      {/* <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={6}
                        >
                          <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                              >
                                History
                              </Typography>
                              <Table size="small" aria-label="purchases">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="right">
                                      Total price ($)
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {detail.map((historyRow) => (
                                    <TableRow key={historyRow.date}>
                                      <TableCell component="th" scope="row">
                                        dd
                                      </TableCell>
                                      <TableCell>dd</TableCell>
                                      <TableCell align="right">dd</TableCell>
                                      <TableCell align="right">
                                        {Math.round(
                                          historyRow.amount * row.price * 100
                                        ) / 100}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow> */}
                    </React.Fragment>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
