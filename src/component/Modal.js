import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { formControlClasses } from "@mui/material";
import styled from "styled-components";

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

// function ChildModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Button onClick={handleOpen}>
//         <ZoomInIcon />
//       </Button>
//       <Modal
//         hideBackdrop
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="child-modal-title"
//         aria-describedby="child-modal-description"
//       >
//         <Box sx={{ ...style, width: 200 }}>
//           <h2 id="child-modal-title">Text in a child modal</h2>
//           <p id="child-modal-description">}</p>
//           <Button onClick={handleClose}>Close Child Modal</Button>
//         </Box>
//       </Modal>
//     </React.Fragment>
//   );
// }

export default function NestedModal(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let conditionList = "진단정보";

  function renderConditionList() {
    if (props.data) {
      conditionList = props.data.conditionList;
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>
        <ZoomInIcon></ZoomInIcon>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">환자 상세정보</h2>
          <p id="parent-modal-description">
            방문 횟수 : {props.data && props.data.visitCount}
          </p>
          <p>진단정보</p>
          <p id="parent-modal-description">
            {props.data && props.data.conditionList}
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
