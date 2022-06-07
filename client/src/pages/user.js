import React, { useEffect, useState } from "react";
import "../../node_modules/semantic-ui-css";
import Nav2 from "../components/Nav2";
import Blog from "../components/blog";
import Card2 from "../components/blogcard";
import { useHistory } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  rootinfo,
  rootinfoDetail,
  accesstoken,
} from "../redux/Action/blogAction";
import "../css/error.css";

const User = () => {
  const [loading, setloading] = useState(false);
  const openORnot = useSelector((state) => state.auser.isLogged);
  const Token = useSelector((state) => state.tokenuser);
  const dispatch = useDispatch();
  const hist = useHistory();

  const gettingtoken = async () => {
    setloading(true);
    const res = await axios.post("/user/refresh_token", null);
    await dispatch(accesstoken(res.data.access_token));
    setloading(false);
  };
  localStorage.setItem("cookies", Token);

  useEffect(() => {
    if (openORnot) {
      gettingtoken();
      // gettingdata();
    } else if (localStorage.getItem("cookies")) {
    } else hist.push("/");
  }, [openORnot.isLogged]);

  const token = localStorage.getItem("cookies");

  //  useEffect(()=>{

  //      gettingdata();

  //  },[])

  const gettingdata = async () => {
    const res = await rootinfo(token);
    dispatch(rootinfoDetail(res));
  };
  gettingdata();
  return (
    <>
      <Nav2 />
      {loading && (
        <div className="outer">
          <div className="inner">
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          </div>
        </div>
      )}
      {!loading && (
        <div>
          {" "}
          <Card2 titlemenu="Recommended topics" />{" "}
        </div>
      )}

      <div className="container footer">
        <p> copyright BlueRocket | terms and coditions </p>
      </div>
    </>
  );
};
export default User;
