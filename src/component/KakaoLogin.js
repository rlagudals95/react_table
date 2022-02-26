import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import kakaoLogin from "../assets/kakao_login.png";

const jsKey = "4205e8829366343b39451e3d60099dbe";
// jskey = 4205e8829366343b39451e3d60099dbe
// native = e0d51523e6f60d267a1b1a7d39eff6ac
// SDK는 한 번만 초기화해야 한다.
// 중복되는 초기화를 막기 위해 isInitialized()로 SDK 초기화 여부를 판단한다.
if (!window.Kakao.isInitialized()) {
  // JavaScript key를 인자로 주고 SDK 초기화
  window.Kakao.init(jsKey);
  // SDK 초기화 여부를 확인하자.
  console.log(window.Kakao.isInitialized());
}

const loginWithKakao2 = () => {
  const scope = "profile_nickname,profile_image, account_email";
  window.Kakao.Auth.login({
    scope,
    // success는 인증 정보를 응답(response)으로 받는다.
    success: function (response) {
      //카카오 SDK에 사용자 토큰을 설정한다.
      window.Kakao.Auth.setAccessToken(response.access_token);
      console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);

      var ACCESS_TOKEN = window.Kakao.Auth.getAccessToken();

      window.Kakao.API.request({
        url: "/v2/user/me",
        success: function ({ kakao_account }) {
          //어떤 정보 넘어오는지 확인
          console.log(kakao_account);
          const { email, profile } = kakao_account;

          console.log(email);
          console.log(`responsed img: ${profile.profile_image_url}`);
          console.log(profile.nickname);

          axios({
            method: "post",
            url: "/auth/sns",
            data: {
              id: email,
              nickname: profile.nickname,
              image: profile.profile_image_url,
            },
          })
            .then((res) => {
              console.log(res);
              // history.push("/main/feed");
            })
            .catch((error) => {
              // console.log(error);
              console.error(error);
              alert("카카오 로그인 에러?");
            });
        },
        fail: function (error) {
          console.log(error);
        },
      });
    },
    fail: function (error) {
      console.log(error);
    },
  });
};

export default function KakaoLogin() {
  const dispatch = useDispatch();

  function loginWithKakao() {
    console.log("리다이렉트 ::: ", process.env.REACT_APP_REDIRECT_URL);
    window.Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_REDIRECT_URL,
    });
  }

  return (
    <OauthBtnKakao
      id="custom-login-bth"
      onClick={loginWithKakao}
    ></OauthBtnKakao>
  );
}

const OauthBtnKakao = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
  background: url(${kakaoLogin});
  background-size: cover;
  height: 50px;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
  background-position: center;
`;
