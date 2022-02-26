import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "./config";

const InfinityScroll = (query, pageNumber) => {
  useEffect(() => {
    axios({
      method: "GET",
      url: `${config.api}/api/article`,
      params: { q: query, page: pageNumber },
    }).then((res) => {
      // console.log(res.data);
    });
  }, [query, pageNumber]);

  return <React.Fragment></React.Fragment>;
};

export default InfinityScroll;
