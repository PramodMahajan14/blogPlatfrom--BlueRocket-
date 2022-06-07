import React from "react";
import { Pane, Badge, Text } from "evergreen-ui";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { mydate } from "./date";
import "../pages/login_f.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import usePagination from "./pagination";
import pic from "../Images/empty.png";

const Card2 = (props) => {
  const data = useSelector((state) => state.allblogs.blogs);
  const [blogs, setblogs] = useState(data);
  const [IsMobile, setIsMobile] = useState(false);
  const [currentpage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(4);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  });

  const indexOfLastProduct = currentpage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = blogs.slice(indexOfFirstProduct, indexOfLastProduct);

  const count = Math.ceil(blogs.length / productPerPage);
  const _DATA = usePagination(blogs, productPerPage);

  const handleChange = (e, p) => {
    setCurrentPage(p);
    _DATA.jump(p);
  };
  // filter;
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = blogs.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(currentProduct);
    }
  };
  const filteredData = blogs.filter((item) => {
    return Object.values(item)
      .join("")
      .toLowerCase()
      .includes(searchInput.toLowerCase());
  });
  console.log(currentProduct);

  const maincard = currentProduct.map((item) => {
    const {
      title,
      body,
      purl,
      ptype,
      image,
      user_avatar,
      user_id,
      description,
      date,
      _id,
    } = item;

    return <>{}</>;
  });
  const Cards = () => {
    return (
      <>
        {searchInput.length > 1 ? (
          filteredData.length === 0 ? (
            <div className="container emptyimg" style={{ diplay: "row" }}>
              {/* <img src={pic} style={{ height: "200px", width: "150px" }} /> */}
              <h6>Not Found</h6>
            </div>
          ) : (
            filteredData.map((a) => {
              return (
                <>
                  <div
                    className=" container"
                    style={{
                      display: "flex",
                      minWidth: "70%",
                      marginTop: "1rem",
                    }}
                  >
                    <div
                      className="link_card"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="image header"
                        style={{ display: "flex" }}
                        key={a._id}
                      >
                        <img
                          className="ui avatar image"
                          src={a.user_avatar}
                          alt="pic"
                        />
                        <div className="medium line">{a.user_id}</div>
                      </div>
                      <Link to={`/user/${a.purl}`} className="title_of_post">
                        {" "}
                        <div className="paragraph">
                          <div className="full line">
                            {" "}
                            <b className="btitle">{a.title}</b>
                          </div>
                          <div className="medium line">
                            <p className="paragr">
                              {a.description.substr(0, 80)}...
                            </p>
                          </div>
                          <div>
                            <Pane>
                              {" "}
                              <Badge color="green" marginRight={8}>
                                {mydate(a.date.substring(5, 7))},
                                {a.date.substring(8, 10)}
                              </Badge>
                              <Badge color="teal" marginRight={8}>
                                {a.ptype}
                              </Badge>
                            </Pane>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <img
                      className="ui tiny image"
                      id="blog_card"
                      src={a.image}
                      alt="pic"
                    />
                  </div>
                  <div className="ui divider"></div>
                </>
              );
            })
          )
        ) : currentProduct.length === 0 ? (
          <div
            className="container emptyimg"
            style={{ justifyCcontent: "center" }}
          >
            {/* <img src={pic} style={{ height: "200px", width: "150px" }} /> */}
            <h6>Not Found</h6>
          </div>
        ) : (
          currentProduct.map((a) => {
            return (
              <>
                <div
                  className=" container"
                  style={{
                    display: "flex",
                    minWidth: "70%",
                    marginTop: "1rem",
                  }}
                >
                  <div className="link_card" style={{ textDecoration: "none" }}>
                    <div
                      className="image header"
                      style={{ display: "flex" }}
                      key={a._id}
                    >
                      <img
                        className="ui avatar image"
                        src={a.user_avatar}
                        alt="pic"
                      />
                      <div className="medium line">{a.user_id}</div>
                    </div>
                    <Link to={`/user/${a.purl}`} className="title_of_post">
                      {" "}
                      <div className="paragraph">
                        <div className="full line">
                          {" "}
                          <b className="btitle">{a.title}</b>
                        </div>
                        <div className="medium line">
                          <p className="paragr">
                            {a.description.substr(0, 80)}...
                          </p>
                        </div>
                        <div>
                          <Pane>
                            {" "}
                            <Badge color="green" marginRight={8}>
                              {mydate(a.date.substring(5, 7))},
                              {a.date.substring(8, 10)}
                            </Badge>
                            <Badge color="teal" marginRight={8}>
                              {a.ptype}
                            </Badge>
                          </Pane>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <img
                    className="ui tiny image"
                    id="blog_card"
                    src={a.image}
                    alt="pic"
                  />
                </div>
                <div className="ui divider"></div>
              </>
            );
          })
        )}
      </>
    );
  };

  const [menudish, setmenudish] = useState(false);
  const setpositionmenudish = () => {
    if (window.innerWidth < 680 === true) {
      if (window.scrollY >= 788) {
        setmenudish(true);
      } else {
        setmenudish(false);
      }
    }
  };
  window.addEventListener("scroll", setpositionmenudish);
  const filterblogs = (type) => {
    const Filteredpost = data.filter((post) => {
      return post.ptype == type;
    });
    setblogs(Filteredpost);
  };
  const AllPost = () => {
    setblogs(data);
  };
  useEffect(() => {
    setblogs(data);
  }, [data]);

  return (
    <>
      {/* {maincard} */}

      {/* <div className="pagination">
      <Stack spacing={2}>
         <Pagination count={count} page={currentpage} onChange={handleChange} variant="outlined" color="primary" />
      </Stack>
    </div>

    <div className="ui container" style={{margin:'2rem 0'}}>
      <div class="ui three column wide">
         <div>{props.card}</div>
      </div>
    </div> */}

      <div className="ui divider"></div>
      <div className="container">
        <div class="row">
          <div className="col-xs-12 col-sm-5 ">
            <div className={menudish ? "filterTrue active" : "filterFalse"}>
              <b>{props.titlemenu}</b>
              <div style={{ zIndex: "-99" }}>
                <button
                  class="ui  red basic button"
                  style={{ margin: "4px" }}
                  onClick={AllPost}
                >
                  All
                </button>
                <button
                  className="ui orange basic button"
                  onClick={() => filterblogs("politics")}
                >
                  politics
                </button>
                <button
                  className="ui yellow basic button"
                  onClick={() => filterblogs("sport")}
                >
                  Sport
                </button>
                <button
                  className="ui olive basic button"
                  onClick={() => filterblogs("place")}
                >
                  place
                </button>
                <button
                  className="ui green basic button"
                  onClick={() => filterblogs("person")}
                >
                  person
                </button>
                <button
                  className="ui teal basic button"
                  onClick={() => filterblogs("lifestyle")}
                >
                  Lifestyle
                </button>
                <button
                  className="ui pink basic button"
                  onClick={() => filterblogs("food")}
                >
                  food
                </button>
                <button
                  className="ui brown basic button"
                  onClick={() => filterblogs("Health&fitness")}
                >
                  Health and fitness
                </button>
                <button
                  className="ui grey basic button"
                  onClick={() => filterblogs("technology")}
                >
                  Technology
                </button>
                <button
                  className="ui blue basic button"
                  style={{ margin: "4px" }}
                  onClick={() => filterblogs("business")}
                >
                  Business
                </button>
                {/* search filter */}
                <div className="form_group has_search">
                  <span className="searchicon">
                    <AiOutlineSearch />
                  </span>
                  <input
                    type="text"
                    className="form_control"
                    placeHolder="Search"
                    onChange={(e) => searchItems(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="ui divider"></div>
          </div>

          <div className="col-xs-12 col-sm-7" style={{ overflow: "auto" }}>
            {/* search filter */}
            {/* <div className="form_group has_search">
              <span className="searchicon">
                <AiOutlineSearch />
              </span>
              <input
                type="text"
                className="form_control"
                placeHolder="Search"
                onChange={(e) => searchItems(e.target.value)}
              />
            </div> */}

            {maincard}
            <Cards />
            <div className="pagination">
              <Stack spacing={2}>
                <Pagination
                  count={count}
                  page={currentpage}
                  onChange={handleChange}
                  variant="outlined"
                  color="primary"
                />
              </Stack>
            </div>

            <div className="ui container" style={{ margin: "2rem 0" }}>
              <div class="ui three column wide">
                <div>{props.card}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Card2;

// w=12.5rem
// h=9rem
// {marginLeft:'1rem'
//

// <div
//                className=" container"
//                style={{ display: "flex", minWidth: "70%", marginTop: "1rem" }}
//              >
//                <div className="link_card" style={{ textDecoration: "none" }}>
//                  <div
//                    className="image header"
//                    style={{ display: "flex" }}
//                    key={_id}
//                  >
//                    <img
//                      className="ui avatar image"
//                      src={user_avatar}
//                      alt="pic"
//                    />
//                    <div className="medium line">{user_id}</div>
//                  </div>
//                  <Link to={`/user/${purl}`} className="title_of_post">
//                    {" "}
//                    <div className="paragraph">
//                      <div className="full line">
//                        {" "}
//                        <b className="btitle">{title}</b>
//                      </div>
//                      <div className="medium line">
//                        <p className="paragr">{description.substr(0, 80)}...</p>
//                      </div>
//                      <div>
//                        <Pane>
//                          {" "}
//                          <Badge color="green" marginRight={8}>
//                            {mydate(date.substring(5, 7))},{date.substring(8, 10)}
//                          </Badge>
//                          <Badge color="teal" marginRight={8}>
//                            {ptype}
//                          </Badge>
//                        </Pane>
//                      </div>
//                    </div>
//                  </Link>
//                </div>
//                <img
//                  className="ui tiny image"
//                  id="blog_card"
//                  src={image}
//                  alt="pic"
//                />
//              </div>
//              <div className="ui divider"></div>

// filteredResults.map((a) => {
//   return (
// <>
//   <div
//     className=" container"
//     style={{
//       display: "flex",
//       minWidth: "70%",
//       marginTop: "1rem",
//     }}
//   >
//     <div className="link_card" style={{ textDecoration: "none" }}>
//       <div
//         className="image header"
//         style={{ display: "flex" }}
//         key={a._id}
//       >
//         <img
//           className="ui avatar image"
//           src={a.user_avatar}
//           alt="pic"
//         />
//         <div className="medium line">{a.user_id}</div>
//       </div>
//       <Link to={`/user/${a.purl}`} className="title_of_post">
//         {" "}
//         <div className="paragraph">
//           <div className="full line">
//             {" "}
//             <b className="btitle">{a.title}</b>
//           </div>
//           <div className="medium line">
//             <p className="paragr">
//               {a.description.substr(0, 80)}...
//             </p>
//           </div>
//           <div>
//             <Pane>
//               {" "}
//               <Badge color="green" marginRight={8}>
//                 {mydate(a.date.substring(5, 7))},
//                 {a.date.substring(8, 10)}
//               </Badge>
//               <Badge color="teal" marginRight={8}>
//                 {a.ptype}
//               </Badge>
//             </Pane>
//           </div>
//         </div>
//       </Link>
//     </div>
//     <img
//       className="ui tiny image"
//       id="blog_card"
//       src={a.image}
//       alt="pic"
//     />
//   </div>
//   <div className="ui divider"></div>
// </>
