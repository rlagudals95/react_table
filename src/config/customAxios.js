import axios, { AxiosInstance } from "axios";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export const customAxios = axios.create({
  baseURL: "http://49.50.167.136:9871", // 기본 서버 주소 입력
  // headers: {
  //   access_token: cookies.get('access_token'),
  // },
});
