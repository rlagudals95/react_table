import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import ScrollToTop from "../config/ScrollToTop";
import Home from "../pages/Home";
import Navigation from "../component/Navigation";
import "../shared/App.css";

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("username")) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    }, 1000);
  }, [login]);

  return (
    <ReactContainer>
      <ConnectedRouter history={history}>
        {/* <Backbtn history={history}/> */}

        <InnerContainer>
          <ScrollToTop>
            {/* ScrollToTop을 이용해 페이지가 이동할 때마다 스크롤 최상단으로  */}
            <Switch>
              <Route path="/" exact component={Home} />
            </Switch>
          </ScrollToTop>
        </InnerContainer>
        <AppBackground />
      </ConnectedRouter>
    </ReactContainer>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
body{
  
}`;

const ReactContainer = styled.div``;
const InnerContainer = styled.div``;

const AppBackground = styled.div`
  background: url("https://images.unsplash.com/photo-1601662528567-526cd06f6582?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80");
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  z-index: -1;
  opacity: 0.7;
`;
