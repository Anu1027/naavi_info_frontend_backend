import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import Scrollbars from "react-custom-scrollbars";
import * as jose from "jose";
import cloudUploadIcon from "../../../static/images/clipIcons/cloudUpload.svg";

import loadingGif from "../../../static/images/loading.gif";
import arrowDown from "../../../static/images/arrowDown.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAllergies, faCaretDown } from "@fortawesome/free-solid-svg-icons";

// import LoadingAnimation from "../LoadingAnimation";
import { useNavigate, useLocation } from "react-router-dom";
// import { selectLoginData } from "../../app/loginSlice";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import clearInput from "../../../static/images/icons/refresh.svg";
// import CountryList from "./CountryList";
// import AppsList from "./AppsList";
// import "./numberInput.css";
import { GlobalContex } from "../../../globalContext";

import plus from "../../../static/images/globaldrawer/plus.svg";
import closeWhite from "../../../static/images/icons/closeWhite.svg";

// import AppList from "./AppsList";
import LoadingAnimation from "../../LoadingAnimation";
// import PublicationList from "./PublicationList";
import defaultImg from "../../../static/images/icons/defaultImg.svg";
// import AuthorList from "./AuthorList";
// import EnterArticle from "./EnterArticle";
// import CategoryList from "./CategoryList";
// import NavBarList from "./NavBarList";
import plusIcon from "../../../static/images/addNewIcons/plusIcon.svg";
import closeIconRed from "../../../static/images/addNewIcons/closeIconRed.svg";
import blackPlus from "../../../static/images/icons/blackPlus.svg";

function renameFile(originalFile, newName) {
  return new File([originalFile], newName, {
    type: originalFile.type,
    lastModified: originalFile.lastModified,
  });
}

const secret = "uyrw7826^&(896GYUFWE&*#GBjkbuaf"; // secret not to be disclosed anywhere.
const emailDev = "rahulrajsb@outlook.com"; // email of the developer.

const NewStep = ({ step, setStep, setMainMenu, loading, setLoading }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    loginData,
    bankerEmail,
    refetchAppData,
    setRefetchAppData,
    globalMenuAdd,
    setGlobalMenuAdd,
    tabSelected,
    setTabSelected,
    selectedPublication,
    wideDrawer,
    setWideDrawer,
    selectedApp,
    refetchArticles,
    setSlider,
    setRefetchArticles,
    NumberToText,
  } = useContext(GlobalContex);

  //
  const [publication, setPublication] = useState(null);
  const [author, setAuthor] = useState(null);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleExcerpt, setArticleExcerpt] = useState("");
  const [articleBody, setArticleBody] = useState("");

  const [colouredIcon, setColouredIcon] = useState("");
  const [colouredIconLoading, setColouredIconLoading] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [coverPhotoLoading, setCoverPhotoLoading] = useState("");
  const [selectBtn, setSelectBtn] = useState("");

  const [categories, setCategories] = useState([]);
  const [navBars, setNavBars] = useState([]);
  const [buttonTitle, setButtonTitle] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [altTag, setAltTag] = useState("");

  // Form Variables

  const [company, setCompany] = useState();
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenAvailable, setTokenAvailable] = useState(null);

  //Publishers New Publication
  const [publicationName, setPublicationName] = useState("");
  const [app, setApp] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState(null);

  const [visibleSubmit, setVisibleSubmit] = useState(false);

  const [metaTag, setMetaTag] = useState("");
  const [metaArr, setMetaArr] = useState([]);

  const [keywords, setKeywords] = useState("");
  const [keywordsArr, setKeywordsArr] = useState([]);
  const [customUrl, setCustomUrl] = useState("");
  const [microSteps, setMicroSteps] = useState([]);
  const [stepNumber, setStepNumber] = useState(0);

  useEffect(() => {
    localStorage.setItem("step", step);
  }, [step]);

  useEffect(() => {
    // console.log("selectedPublication", selectedPublication);
    if (selectedApp.appName === "Publishers") {
      setPublication(selectedPublication);
    }
    // setPublication(selectedPublication);
    if (selectedApp.appName === "Authors") {
      if (!publication?.PublicationDetail[0]?.fxa_app_id) {
        axios
          .get(
            `https://publications.apimachine.com/application/publisher/detail/${bankerEmail}`
          )
          .then(({ data }) => {
            setPublication(data?.data[0]?.PublicationDetails[0]);
            setLoading(false);
          });
      }
      axios
        .get(
          `https://publications.apimachine.com/publisher?email=${bankerEmail}`
        )
        .then((res) => {
          if (res.data.data.length > 0) {
            setAuthor(res.data.data[0]);
          }
        });
    }
  }, []);

  const handleCheckTokenAvailability = () => {
    if (tokenAvailable === null && tokenSymbol !== "") {
      axios
        .get(
          `https://comms.globalxchange.io/coin/investment/path/get?token=${tokenSymbol}`
        )
        .then((res) => {
          if (res.data.status) {
            setTokenAvailable(false);
          } else {
            setTokenAvailable(true);
          }
        });
    } else {
      setTokenAvailable(null);
      setTokenSymbol("");
    }
  };

  const signJwt = async (fileName, emailDev, secret) => {
    try {
      const jwts = await new jose.SignJWT({ name: fileName, email: emailDev })
        .setProtectedHeader({ alg: "HS512" })
        .setIssuer("gxjwtenchs512")
        .setExpirationTime("10m")
        .sign(new TextEncoder().encode(secret));
      return jwts;
    } catch (error) {
      console.log(error, "kjbedkjwebdw");
    }
  };

  const uploadImage = async (e, setImage, setLoading) => {
    setLoading(true);
    const fileName = `${new Date().getTime()}${e.target.files[0].name.substr(
      e.target.files[0].name.lastIndexOf(".")
    )}`;
    const formData = new FormData();
    const file = renameFile(e.target.files[0], fileName);
    formData.append("files", file);
    const path_inside_brain = "root/";

    const jwts = await signJwt(fileName, emailDev, secret);
    console.log(jwts, "lkjkswedcf");
    let { data } = await Axios.post(
      `https://drivetest.globalxchange.io/file/dev-upload-file?email=${emailDev}&path=${path_inside_brain}&token=${jwts}&name=${fileName}`,
      formData,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    console.log(data.payload.url, "data.payload.url");
    setImage(data.payload.url);
    setLoading(false);
  };

  const authorStep = () => {
    if (selectedApp.appName !== "Authors") {
      setStep("Select Author");
    }
  };

  const removeCategory = (category) => {
    setCategories(categories.filter((item) => item !== category));
  };
  const removeNav = (navBar) => {
    setNavBars(navBars.filter((item) => item !== navBar));
  };

  const addMetaTag = (metaTag) => {
    if (metaTag === "") return;
    setMetaArr([...metaArr, metaTag]);
    console.log(metaArr, "metaArr");
    setMetaTag("");
  };

  const removeTag = (item) => {
    setMetaArr(metaArr.filter((tag) => tag !== item));
  };

  const addKeyword = (keyword) => {
    if (keyword === "") return;
    setKeywordsArr([...keywordsArr, keyword]);
    console.log(keywordsArr, "keywordsArr");
    setKeywords("");
  };

  const removeKeyword = (item) => {
    setKeywordsArr(keywordsArr.filter((keyword) => keyword !== item));
  };

  const addMicroStep = () => {
    setMicroSteps([...microSteps, { title: "", description: "" }]);
  };

  const getContent = () => {
    switch (step) {
      case "success":
        setTimeout(() => {
          // // navigate("/ventures/Brands");
          // window.location.reload();
          setSlider(false);
        }, 1000);
        setRefetchAppData(true);
        return (
          <div className="newConglomerate">
            <div className="succesView">
              <div className="labelItm" style={{ textAlign: "center" }}>
                You Have Successfully Published {articleTitle}.
              </div>
            </div>
          </div>
        );
      //   case "app":
      //     return (
      //       <div className="newConglomerate" style={{ paddingBottom: "0px" }}>
      //         <AppList setApp={setApp} onClose={() => setStep("")} />
      //       </div>
      //     );

      //   case "country":
      //     return (
      //       <div className="newConglomerate">
      //         <CountryList setCountry={setCountry} onClose={() => setStep("")} />
      //       </div>
      //     );

      case "Token Expired":
        return (
          <>
            <div className="newConglomerate">
              <div className="succesView">
                <div className="labelItm" style={{ textAlign: "center" }}>
                  Token Expired. Login Again.
                </div>
              </div>
            </div>

            <div className="footerBtns">
              <div
              // onClick={(e) => handleBackStep()}
              >
                Go Back
              </div>
              <div
                onClick={(e) => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Logout
              </div>
            </div>
          </>
        );

      //   case "Select Publication":
      //     return (
      //       <div className="newConglomerate" style={{ paddingBottom: "0px" }}>
      //         <PublicationList
      //           setPublication={setPublication}
      //           onClose={() => setStep("")}
      //         />
      //       </div>
      //     );
      //   case "Select Author":
      //     return (
      //       <div className="newConglomerate" style={{ paddingBottom: "0px" }}>
      //         <AuthorList setAuthor={setAuthor} onClose={() => setStep("")} />
      //       </div>
      //     );

      //   case "Enter Article":
      //     return (
      //       <div className="newConglomerate" style={{ paddingBottom: "0px" }}>
      //         <EnterArticle
      //           articleBody={articleBody}
      //           setArticleBody={setArticleBody}
      //           onClose={() => {
      //             setStep("");
      //             setWideDrawer(false);
      //           }}
      //         />
      //       </div>
      //     );
      //   case "Add Category":
      //     return (
      //       <div className="newConglomerate" style={{ paddingBottom: "0px" }}>
      //         <CategoryList
      //           categories={categories}
      //           setCategories={setCategories}
      //           onClose={() => setStep("")}
      //         />
      //       </div>
      //     );
      //   case "Add Navbar":
      //     return (
      //       <div className="newConglomerate" style={{ paddingBottom: "0px" }}>
      //         <NavBarList
      //           navBars={navBars}
      //           setNavBars={setNavBars}
      //           onClose={() => setStep("")}
      //         />
      //       </div>
      //     );

      default:
        return (
          <>
            <div
              className="newConglomerate"
              style={{
                height: pathname?.includes("/dashboard/accountants")
                  ? "calc(100% - 8rem)"
                  : "",
                  padding: pathname?.includes("/dashboard/accountants") ? '0' : ''
              }}
            >
              <Scrollbars
                className="scrollForm"
                renderTrackHorizontal={() => <div />}
                renderThumbHorizontal={() => <div />}
                renderTrackVertical={() => <div />}
                renderThumbVertical={() => <div />}
              >
                {/* Select Publication */}
                <div className="name">What is the name of this step?</div>
                <div className="inputWrap">
                  <input type="text" className="text" placeholder="Name..." />
                  {/* <div
                                        className="btnCheck"
                                        style={{
                                            border: "none",
                                        }}
                                    >
                                        <img src={arrowDown} width="30px" alt="down" />
                                    </div> */}
                </div>

                {/* Select Author */}
                <div className="name">
                  What country will this step take place in?
                </div>
                {author?._id ? (
                  <div className="user" onClick={authorStep}>
                    <img
                      className="dp"
                      src={
                        author?.profile_pic ? author?.profile_pic : defaultImg
                      }
                      alt=""
                    />
                    <div className="userDetail">
                      <div className="name">{author?.name}</div>
                      <div className="email">{author?.email}</div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="inputWrap"
                    onClick={() => setStep("Select Author")}
                  >
                    <input
                      type="text"
                      className="text"
                      placeholder="Click To Select"
                      readOnly
                    />
                    <div
                      className="btnCheck"
                      style={{
                        border: "none",
                      }}
                    >
                      <img src={arrowDown} width="10px" alt="down" />
                    </div>
                  </div>
                )}

                {/* Article Title */}
                <div className="name">Describe the step</div>
                <textarea
                  type="text"
                  class="text-textarea"
                  placeholder="Description..."
                  rows="5"
                  cols="40"
                  spellcheck="false"
                ></textarea>

                {/* Upload Logos */}
                <div className="name" onClick={() => setSelectBtn(!selectBtn)}>
                  Upload a icon
                  {/* <div className={"samebtn " + (selectBtn ? "active" : "")}>Use same</div> */}
                </div>
                {/* <br /> */}
                <div
                  className="name"
                  style={{ display: selectBtn ? "" : "none" }}
                >
                  (Same Logo for Icon and coverPhoto)
                </div>
                <div
                  className="filesUpload"
                  style={{ justifyContent: "flex-start" }}
                >
                  <label className="fileInp icon">
                    <img
                      className={`${Boolean(colouredIcon)}`}
                      src={
                        colouredIconLoading
                          ? loadingGif
                          : colouredIcon || cloudUploadIcon
                      }
                      alt=""
                      style={{ width: "40px" }}
                    />
                    <input
                      type="file"
                      onChange={(e) => {
                        uploadImage(e, setColouredIcon, setColouredIconLoading);
                      }}
                      accept="image/*"
                    />
                    <div
                      className="text"
                      style={{ fontWeight: "700", fontSize: "12px" }}
                    >
                      {/* Colored Icon */}
                    </div>
                    <div className="hovTxt">
                      Upload
                      <br />
                      New
                    </div>
                  </label>
                  {/* <label
                                        className="fileInp icon"
                                        style={{
                                            flex: "0 0 50%",
                                            maxWidth: "50%",
                                            marginLeft: "20px",
                                            display: selectBtn ? "none" : "",
                                        }}
                                    >
                                        <img
                                            className={`${Boolean(coverPhoto)}`}
                                            src={
                                                coverPhotoLoading
                                                    ? loadingGif
                                                    : coverPhoto || cloudUploadIcon
                                            }
                                            alt=""
                                            style={{ width: "40px" }}
                                        />
                                        <input
                                            type="file"
                                            onChange={(e) => {
                                                uploadImage(e, setCoverPhoto, setCoverPhotoLoading);
                                            }}
                                            accept="image/*"
                                        />
                                        <div
                                            className="text"
                                            style={{ fontWeight: "700", fontSize: "12px" }}
                                        >
                                            Cover Photo
                                        </div>
                                        <div className="hovTxt">
                                            Upload
                                            <br />
                                            New
                                        </div>
                                    </label> */}
                  {/* <label
      className="fileInp icon"
      style={{ visibility: "hidden" }}
    ></label> */}
                </div>

                {/* Article Excerpt */}
                <div className="name">What type of step is it?</div>
                {author?._id ? (
                  <div className="user" onClick={authorStep}>
                    <img
                      className="dp"
                      src={
                        author?.profile_pic ? author?.profile_pic : defaultImg
                      }
                      alt=""
                    />
                    <div className="userDetail">
                      <div className="name">{author?.name}</div>
                      <div className="email">{author?.email}</div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="inputWrap"
                    onClick={() => setStep("Select Author")}
                  >
                    <input
                      type="text"
                      className="text"
                      placeholder="Click To Select"
                      readOnly
                    />
                    <div
                      className="btnCheck"
                      style={{
                        border: "none",
                      }}
                    >
                      <img src={arrowDown} width="10px" alt="down" />
                    </div>
                  </div>
                )}

                <div className="name">
                  What is the costing structure of the step?
                </div>
                {author?._id ? (
                  <div className="user" onClick={authorStep}>
                    <img
                      className="dp"
                      src={
                        author?.profile_pic ? author?.profile_pic : defaultImg
                      }
                      alt=""
                    />
                    <div className="userDetail">
                      <div className="name">{author?.name}</div>
                      <div className="email">{author?.email}</div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="inputWrap"
                    onClick={() => setStep("Select Author")}
                  >
                    <input
                      type="text"
                      className="text"
                      placeholder="Click To Select"
                      readOnly
                    />
                    <div
                      className="btnCheck"
                      style={{
                        border: "none",
                      }}
                    >
                      <img src={arrowDown} width="10px" alt="down" />
                    </div>
                  </div>
                )}

                {/* Add Categories */}
                <div className="name">Add mentors</div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {categories?.map((item, index) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",

                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "100px",
                            height: "100px",
                            border: "0.5px solid #E7E7E7",
                            padding: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "10px",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              background: "black",
                              width: "15px",
                              padding: "3px",
                              borderRadius: "20px",
                              position: "absolute",
                              height: "15px",
                              top: "0px",
                              right: "-6px",
                              marginTop: "-5px",
                            }}
                            onClick={() => removeCategory(item)}
                          >
                            <img
                              style={{
                                marginTop: "-15px",
                                width: "10px",
                                height: "10px",
                                cursor: "pointer",
                              }}
                              src={closeWhite}
                              alt=""
                            />
                          </div>
                          <img
                            src={item?.thumbnail}
                            alt=""
                            style={{ width: "60px", height: "60px" }}
                          />
                        </div>

                        <div
                          style={{
                            wordWrap: "break-word",
                            width: "100px",
                            textAlign: "center",
                          }}
                        >
                          {item?.title}
                        </div>
                      </div>
                    );
                  })}
                  <div
                    onClick={(e) => setStep("Add mentor")}
                    style={{
                      width: "100px",
                      height: "100px",
                      border: "0.5px solid #E7E7E7",
                      padding: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "10px",
                      borderRadius: "15px",
                    }}
                  >
                    <img src={plus} alt="" width="20px" />
                  </div>
                </div>

                {/* Add Categories */}
                <div className="name" style={{ paddingTop: "20px" }}>
                  Add vendors
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {navBars.map((item, index) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          borderRadius: "15px",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "100px",
                            height: "100px",
                            border: "0.5px solid #E7E7E7",
                            padding: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "10px",
                            position: "relative",
                            borderRadius: "15px",
                          }}
                        >
                          <div
                            style={{
                              background: "black",
                              width: "15px",
                              padding: "3px",
                              borderRadius: "20px",
                              position: "absolute",
                              height: "15px",
                              top: "0px",
                              right: "-6px",
                              marginTop: "-5px",
                            }}
                            onClick={() => removeNav(item)}
                          >
                            <img
                              style={{
                                marginTop: "-15px",
                                width: "10px",
                                height: "10px",
                                cursor: "pointer",
                              }}
                              src={closeWhite}
                              alt=""
                            />
                          </div>
                          <img
                            src={item?.icon}
                            alt=""
                            style={{ width: "60px", height: "60px" }}
                          />
                        </div>
                        <div
                          style={{
                            wordWrap: "break-word",
                            width: "100px",
                            textAlign: "center",
                          }}
                        >
                          {item.navTitle}
                        </div>
                      </div>
                    );
                  })}
                  <div
                    onClick={(e) => setStep("Add vendor")}
                    style={{
                      width: "100px",
                      height: "100px",
                      border: "0.5px solid #E7E7E7",
                      padding: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "10px",
                      borderRadius: "15px",
                    }}
                  >
                    <img src={plus} alt="" width="20px" />
                  </div>
                </div>

                {/* Action Button Title */}
                <div className="name" style={{ paddingTop: "20px" }}>
                  Add first microstep
                </div>
                <br />
                {Array(stepNumber)
                  .fill("")
                  .map((item, index) => {
                    return (
                      <>
                        <div className="expandBox">
                          <div className="name topmarg">Name the microstep</div>
                          <div className="inputWrap">
                            <input
                              // value={microstepTitle}
                              // onChange={(e) => setMicrostepTitle(e.target.value)}
                              type="text"
                              className="text"
                              placeholder="name.."
                            />
                          </div>
                          <div className="name topmarg">Describe the step</div>
                          <textarea
                            type="text"
                            class="box-textarea"
                            placeholder="Description..."
                            rows="5"
                            cols="40"
                            spellcheck="false"
                          ></textarea>
                          <div style={{ display: "flex" }}>
                            <img src={blackPlus} alt="plus" width="15px" />
                            &nbsp;&nbsp;&nbsp;
                            <div className="name">Add first nanostep</div>
                          </div>
                          <div className="saveBtn">Save</div>
                        </div>
                        <br />
                      </>
                    );
                  })}
                <br />
                <br />
                <div
                  style={{ display: "flex", cursor: "pointer" }}
                  onClick={() => setStepNumber(stepNumber + 1)}
                >
                  <img src={blackPlus} alt="plus" width="15px" />
                  &nbsp;&nbsp;&nbsp;
                  <div className="name">Add microstep {stepNumber + 1}</div>
                </div>
                <br />
                <br />

                {/* Action Button Link */}
                {/* <div className="name">Action Button Link</div>
                                <div className="inputWrap">
                                    <div
                                        // onClick={(e) => handleCheckTokenAvailability()}
                                        className="btnCheck"
                                        style={{
                                            border: "solid 1px #e7e7e7",
                                            borderWidth: "0px 1px 0px 0px",
                                        }}
                                    >
                                        {tokenAvailable !== null ? (
                                            tokenAvailable === true ? (
                                                <img style={{ cursor: "pointer" }} src={clearInput} />
                                            ) : (
                                                <img style={{ cursor: "pointer" }} src={clearInput} />
                                            )
                                        ) : (
                                            "https://"
                                        )}
                                    </div>
                                    <input
                                        value={buttonLink}
                                        onChange={(e) => setButtonLink(e.target.value)}
                                        type="text"
                                        className="text"
                                        placeholder="Link..."
                                    />
                                </div>

                                <div className="name">Add Metatags</div>
                                <div className="inputWrap">
                                    <input
                                        value={metaTag}
                                        onChange={(e) => setMetaTag(e.target.value)}
                                        type="text"
                                        className="text"
                                        placeholder="Enter Metatag.."
                                    />
                                    <img src={plusIcon} alt="plus" onClick={() => addMetaTag(metaTag)} className="plusImg" />
                                </div>
                                <div className="metaFields">
                                    {metaArr.map((item, index) => {
                                        return (
                                            <div className="metaField">
                                                <div className="metaTitle">{item}</div>
                                                <div className="metaClose">
                                                    <img src={closeIconRed} alt="close" onClick={() => removeTag(item)} />
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>

                                <div className="name">Add Keywords</div>
                                <div className="inputWrap">
                                    <input
                                        value={keywords}
                                        onChange={(e) => setKeywords(e.target.value)}
                                        type="text"
                                        className="text"
                                        placeholder="Enter Keyword.."
                                    />
                                    <img src={plusIcon} alt="plus" onClick={() => addKeyword(keywords)} className="plusImg" />

                                </div>

                                <div className="metaFields">
                                    {keywordsArr.map((item, index) => {
                                        return (
                                            <div className="metaField">
                                                <div className="metaTitle">{item}</div>
                                                <div className="metaClose">
                                                    <img src={closeIconRed} alt="close" onClick={() => removeKeyword(item)} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="name" style={{ paddingTop: "20px" }}>
                                    Add Alt tags
                                </div>
                                <div className="inputWrap">
                                    <input
                                        value={altTag}
                                        onChange={(e) => setAltTag(e.target.value)}
                                        type="text"
                                        className="text"
                                        placeholder="Enter Alt tag..."
                                    />
                                </div>

                                <div className="name">Enter Custom URL</div>
                                <div className="inputWrap">
                                    <input
                                        value={customUrl}
                                        onChange={(e) => setCustomUrl(e.target.value)}
                                        type="text"
                                        className="text"
                                        placeholder="Enter Custom URL(optional)..."
                                    />
                                </div> */}

                <div className="space"></div>
              </Scrollbars>
            </div>

            {/* <div className="footerBtns"> */}
            <div className="NextBtn">Next Step</div>
            {/* <div
                                className="newField"
                                style={{ fontWeight: 700 }}
                                onClick={(e) => {
                                    setStep("");
                                    setMainMenu("");
                                }}
                            >
                                Go Back
                            </div>
                            <div
                                className="btnSubmit"
                                onClick={() => validate()}
                                style={{
                                    fontWeight: 700,
                                    opacity:
                                        publication &&
                                            author &&
                                            articleTitle &&
                                            articleBody &&
                                            articleExcerpt &&
                                            colouredIcon &&
                                            categories &&
                                            navBars &&
                                            buttonTitle &&
                                            buttonLink &&
                                            altTag
                                            ? 1
                                            : 0.3,
                                }}
                            >
                                Publish Article
                            </div> */}
            {/* </div> */}

            {/* <div className="ftBtns">
              <div
                className="newField"
                style={{ fontWeight: 700 }}
                onClick={(e) => {
                  setStep("");
                  setMainMenu("");
                }}
              >
                Go Back
              </div>
              <div
                className="btnSubmit"
                onClick={() => validate()}
                style={{ fontWeight: 700, opacity: visibleSubmit ? 1 : 0.3 }}
              >
                Submit App
              </div>
            </div> */}
          </>
        );
    }
  };

  const validate = () => {
    if (
      publication &&
      author &&
      articleTitle &&
      articleBody &&
      articleExcerpt &&
      colouredIcon &&
      categories &&
      navBars &&
      buttonTitle &&
      buttonLink &&
      altTag
    ) {
      setVisibleSubmit(true);
      publishNewArticle();
    } else {
      toast.warning("All Fields Are Mandatory");
    }
  };

  const publishNewArticle = () => {
    setLoading(true);
    axios
      .post(`https://publications.apimachine.com/article/new`, {
        categoryType: categories.map((o) => o._id),
        navbar_id: navBars.map((o) => o._id),
        publication_id:
          selectedApp?.appName === "Authors"
            ? publication?.PublicationDetail[0]?._id
            : publication?._id,
        email: author?.email,
        user_id: author?._id,
        title: articleTitle,
        desc: articleExcerpt,
        icon: colouredIcon,
        media: selectBtn ? colouredIcon : coverPhoto,
        article: articleBody,
        action_link: buttonLink,
        action: buttonTitle,
        metatags: metaArr,
        keywords: keywordsArr,
        altTag: altTag,
        custom_url: customUrl,
      })
      .then(({ data }) => {
        if (data.status === false) {
          if (data.message === "jwt expired") {
            setStep("Token Expired");
          }
          toast.success(data.message || "API Error");
        } else setStep("success");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setRefetchArticles(!refetchArticles);
        setLoading(false);
        setTabSelected("Articles");
      });
  };

  return (
    <>
      {loading ? (
        // <div
        //   style={{
        //     display: "flex",
        //     flexDirection: "column",
        //     justifyContent: "center",
        //     alignItems: "center",
        //     height: "70vh",
        //   }}
        // >
        //   <div className="loader"></div>
        //   <div style={{ padding: "20px", fontWeight: 600, color: "#18191D" }}>
        //     Creating New Publication ...
        //   </div>
        // </div>
        <div
          style={{
            height: window.innerHeight,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingAnimation logoAnim sideDraw={true} />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              textAlign: "center",
              marginBottom: "40px",
              fontWeight: 600,
              color: "#18191D",
              fontSize: "20px",
            }}
          >
            Publishing Article...
          </div>
        </div>
      ) : (
        getContent()
      )}
      <ToastContainer />
    </>
  );
};

export default NewStep;
