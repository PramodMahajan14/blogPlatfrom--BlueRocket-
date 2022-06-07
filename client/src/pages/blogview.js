import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar } from "evergreen-ui";
import "../css/viewblog.scss";
import { mydate } from "../components/date";
import { useHistory } from "react-router";
import axios from "axios";
import { CornerDialog, toaster } from "evergreen-ui";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { IoMdStar } from "react-icons/io";
import { Pane, Badge, Text } from "evergreen-ui";
import pic from "../Images/empty.png";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const BlogView = () => {
  const [dsize, setdsize] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const blogs = useSelector((state) => state.allblogs.blogs);
  const userdata = useSelector((state) => state.auser.alluser);
  const rootuser = useSelector((state) => state.auser.ruserinfo);
  const Token = useSelector((state) => state.tokenuser);
  const [loader, setloader] = useState(false);
  const [isUser, setisUser] = useState();
  const hist = useHistory();
  const [DAP, setDAP] = useState(true);
  const { purl } = useParams();

  var releatedblog;
  var ReleatedBlogs;
  const selectblog = blogs.find((item) => item.purl === purl);

  const selectuser = userdata.find(
    (s_user) => s_user.userid === selectblog.user_id
  );

  releatedblog = blogs.filter(function (el) {
    if (el._id !== selectblog._id) {
      return el.ptype == selectblog.ptype;
    }
  });

  const ReleatedBlog = () => {
    return (
      <>
        {releatedblog.length == 0 ? (
          <di className="emptybox">
            <img src={pic} />
            <h5>Not yet</h5>
          </di>
        ) : (
          releatedblog.map((a) => {
            return (
              <>
                <div className="col-4" key={a._id}>
                  <img className="ui top aligned small image" src={a.image} />
                </div>
                <div className="col-8" style={{ marginTop: "16px" }}>
                  <Link to={`/user/${a.purl}`}>
                    <h6>{a.title}</h6>
                  </Link>
                  <Pane>
                    {" "}
                    <Badge color="green" marginLeft={10}>
                      {mydate(a.date.substring(5, 7))},{a.date.substring(8, 10)}
                    </Badge>
                    <Badge color="teal" marginLeft={8}>
                      {a.ptype}
                    </Badge>
                  </Pane>
                </div>

                <div className="ui divider"></div>
              </>
            );
          })
        )}
      </>
    );
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setdsize(true);
    } else {
      setdsize(false);
    }
    if (!Token) return setisUser(true);
  });

  const likeAction = async () => {
    if (!Token) return hist.push("/signin");
    if (selectuser.userid === rootuser.userid) return setIsShown(true);
    const like = selectblog.like + 1;
    try {
      const res = await axios.post("/user/post_like", { like, purl });
      if (res.status == 200) {
        toaster.success("You like this post");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const isCreate = () => {
    if (!Token) return hist.push("/signup");
    else return hist.push("/createblog");
  };

  return (
    <>
      {loader ? (
        <div className="spinner-border text-dark" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
          <div className="container">
            <div className="row ">
              <div className={dsize ? "col-12" : "col-8"}>
                <div className="post_details">
                  <img
                    className="ui avatar image"
                    src={selectblog.user_avatar}
                    style={{ fontSize: "20px" }}
                  />
                  <span>
                    <b>{selectblog.user_id} </b>
                  </span>
                  <br />
                  <p style={{ marginLeft: "2.8rem", marginTop: "-.7rem" }}>
                    {mydate(selectblog.date.substring(5, 7))}{" "}
                    {selectblog.date.substring(8, 10)}{" "}
                    {selectblog.date.substring(0, 4)} <IoMdStar />
                  </p>
                  <h1>
                    <b>{selectblog.title}</b>
                  </h1>
                  <img
                    src={selectblog.image}
                    alt="credite image"
                    className="p_image"
                  />
                  <p className="Post_end">. . .</p>
                  <div
                    className="body_post"
                    dangerouslySetInnerHTML={{ __html: selectblog.body }}
                  ></div>
                  <di>
                    <p>{selectblog.description}</p>
                  </di>
                  <p className="Post_end">
                    <b>. . .</b>
                  </p>

                  <div
                    style={{
                      float: "left",
                      fontSize: "1.3rem",
                      cursor: "pointer",
                    }}
                  >
                    <b>
                      <i onClick={likeAction} className="thumbs up icon"></i>
                      {selectblog.like}
                    </b>
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      Width: "20%",
                      float: "right",
                      fontSize: "1.3rem",
                    }}
                  >
                    <b>
                      <i className="linkedin icon"></i>
                      <i className="instagram icon"></i>
                      <i className="facebook icon"></i>
                    </b>
                  </div>
                </div>
              </div>

              <div
                className={dsize ? "invisible" : "col-4"}
                id="profile_view_bigSize"
              >
                <div className="post_details1">
                  <button className="getstart_btn" onClick={isCreate}>
                    Get Started
                  </button>{" "}
                  <span className={isUser ? "visible" : "invisible"}>
                    <Link to={"/signin"} style={{ textDecorationLine: "none" }}>
                      <b>Sign In</b>
                    </Link>
                  </span>
                  <form class="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2">
                    <input
                      class="form-control form-control-sm mr-3 w-75"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <i
                      className="search icon"
                      id="icon"
                      style={{
                        marginTop: "2.7rem",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                      }}
                    ></i>
                  </form>
                  <img
                    className="ui tiny circular image"
                    src={selectblog.user_avatar}
                  />
                  <h6>{selectblog.user_id}</h6>
                  <p className="user_profe">{selectuser.Profession}</p>
                  <p className="user_bio">-{selectuser.bio}</p>
                  <div className="ui divider"></div>
                  <h5>Related</h5>
                  <div className="row" style={{ overfloY: "scroll" }}>
                    <ReleatedBlog />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
              open={isShown}
              autoHideDuration={6000}
              onClose={() => setIsShown(false)}
            >
              <Alert
                onClose={() => setIsShown(false)}
                severity="warning"
                sx={{ width: "100%" }}
              >
                You can't perfom this action !
              </Alert>
            </Snackbar>
          </Stack>
        </div>
      )}
    </>
  );
};
export default BlogView;
