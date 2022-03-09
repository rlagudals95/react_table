import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { formControlClasses } from "@mui/material";
import styled from "styled-components";
import { actionCreators as patientActions } from "../redux/modules/patient";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

// }

export default function NestedModal(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const { detail_data } = useSelector(
    (state) => ({
      detail_data: state.patient.detail_data,
    }),
    shallowEqual
  );
  const { isModal } = useSelector(
    (state) => ({
      isModal: state.patient.isModal,
    }),
    shallowEqual
  );
  const handleOpen = () => {
    //setOpen(true);
  };

  const handleClose = () => {
    //setOpen(false);
    dispatch(patientActions.isModal(false));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">환자 상세정보</h2>
          <p id="parent-modal-description">
            방문 횟수 : {props.detail_data && props.detail_data.visitCount}
          </p>
          <p>진단정보</p>
          <p id="parent-modal-description">
            {props.detail_data && props.detail_data.conditionList}
          </p>

          {/* <ChildModal /> */}
        </Box>
      </Modal>
    </div>
  );
}
const GridContainer = styled.div`
  max-height: 500px;
  overflow: scroll;
`;
