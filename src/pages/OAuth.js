import React from "react";
import styled from "styled-components";
import { customAxios } from "../config/customAxios";
// import kakaoLogin from "../assets/kakao_login.png";
import naverLogin from "../assets/naver_login.png";
import { useDispatch } from "react-redux";
import KakaoLogin from "../component/KakaoLogin";

function OAuth() {
  const dispatch = useDispatch();

  return (
    <BtnWrap>
      <KakaoLogin />
    </BtnWrap>
  );
}

export default OAuth;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 0px auto;
`;

const OauthBtnNaver = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
  background: url(${naverLogin});
  background-size: cover;
  height: 65px;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
  background-position: center;
`;
