import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.scss";
import Appnavbar from "../../components/appnavbar/appnavbar";
import Dashsidebar from "../../components/dashsidebar/dashsidebar";
import searchic from "../../static/images/dashboard/searchic.svg";
import downarrow from "../../static/images/dashboard/downarrow.svg";
import darrow from "../../static/images/dashboard/darrow.svg";
import clickarrow from "../../static/images/dashboard/clickarrow.svg";
import nvest from "../../static/images/dashboard/nvest.svg";
import profile from "../../static/images/dashboard/profile.svg";
import correct from "../../static/images/dashboard/correct.svg";
import gx from "../../static/images/dashboard/gx.svg";
import accounts from "../../static/images/dashboard/accounts.svg";
import vaults from "../../static/images/dashboard/vaults.svg";
import profilea from "../../static/images/dashboard/profilea.svg";
import support from "../../static/images/dashboard/support.svg";
import settings from "../../static/images/dashboard/settings.svg";
import sidearrow from "../../static/images/dashboard/sidearrow.svg";
import logout from "../../static/images/dashboard/logout.svg";
import { useStore } from "../../components/store/store.ts";
import {
  GetAllSpecialties,
  GetAllAccountants,
  GetAllAccountantsForOneSpecialty,
  FollowBrand,
  GetAutomatedServices,
  GetFollowList,
  UnfollowBrand,
} from "../../services/accountant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import closepop from "../../static/images/dashboard/closepop.svg";
import { formatDate } from "../../utils/time";
import EarningCalendar from "./EarningCalendar/index";
import Vaults from "../Vaults";
import Toggle from "../../components/Toggle";
import Tasks from "../Tasks";
import WalletScan from "./WalletScan";
import MapsPage from "../MapsPage";
import PathComponent from "../../components/PathComponent";
import JourneyPage from "../JourneyPage";
import CurrentStep from "../CurrentStep";

const accountantsData = [
  {
    id: 0,
    name: "Shorupan P",
    works: "HR Block",
    countries: ["Canada", "India"],
    speaclities: [
      "Individual Tax Returns",
      "Crypto",
      "Couples",
      "Insurance Deductions",
      "Individual Tax Returns",
      "Crypto",
    ],
    pimage: profile,
  },
  {
    id: 1,
    name: "Shorupan P",
    works: "HR Block",
    countries: ["Canada", "India", "United States"],
    speaclities: [
      "Individual Tax Returns",
      "Crypto",
      "Couples",
      "Insurance Deductions",
      "Individual Tax Returns",
      "Crypto",
    ],
    pimage: profile,
  },
  {
    id: 2,
    name: "Shorupan P",
    works: "HR Block",
    countries: ["Canada", "India"],
    speaclities: [
      "Individual Tax Returns",
      "Crypto",
      "Couples",
      "Insurance Deductions",
      "Individual Tax Returns",
      "Crypto",
    ],
    pimage: profile,
  },
  {
    id: 3,
    name: "Shorupan P",
    works: "HR Block",
    countries: ["Canada", "India", "United States"],
    speaclities: [
      "Individual Tax Returns",
      "Crypto",
      "Couples",
      "Insurance Deductions",
      "Individual Tax Returns",
      "Crypto",
    ],
    pimage: profile,
  },
];

const servicesBy = [
  {
    id: 0,
    title: "Individual Tax Filings",
    desc: "Products that perform seamlessly during any kind of surge, so you don’t have to worry about uptime and reliability.",
    price: "$20.00/Month",
    icon: nvest,
  },
  {
    id: 1,
    title: "Individual Tax Filings",
    desc: "Products that perform seamlessly during any kind of surge, so you don’t have to worry about uptime and reliability.",
    price: "$20.00/Month",
    icon: nvest,
  },
  {
    id: 2,
    title: "Individual Tax Filings",
    desc: "Products that perform seamlessly during any kind of surge, so you don’t have to worry about uptime and reliability.",
    price: "$20.00/Month",
    icon: nvest,
  },
  {
    id: 3,
    title: "Individual Tax Filings",
    desc: "Products that perform seamlessly during any kind of surge, so you don’t have to worry about uptime and reliability.",
    price: "$20.00/Month",
    icon: nvest,
  },
  {
    id: 4,
    title: "Individual Tax Filings",
    desc: "Products that perform seamlessly during any kind of surge, so you don’t have to worry about uptime and reliability.",
    price: "$20.00/Month",
    icon: nvest,
  },
];

const Dashboard = () => {
  const {
    sideNav,
    setsideNav,
    isLoading,
    setisLoading,
    coinType,
    setCoinType,
    balanceToggle,
    setBalanceToggle,
  } = useStore();
  const [search, setSearch] = useState("");
  const [searchservice, setSearchservice] = useState("");
  const [countriesChecked, setCountriesChecked] = useState([]);
  const [specalitiesChecked, setSpecalitiesChecked] = useState([]);
  const [automatedservices, setautomatedservices] = useState([]);
  const [servicesByList, setServicesByList] = useState([]);
  const [Speaclities, setSpeaclities] = useState(null);
  const [accountantsList, setAccountantsList] = useState(null);
  const [submit, setsubmit] = useState(false);
  const [follow, setFollow] = useState({});
  const [followList, setFollowList] = useState([]);
  const [serviceby, setServiceby] = useState({});
  const [openRight, setOpenRight] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  const [currentFollow, setcurrentFollow] = useState({});
  const [isServiceByLoading, setIsServiceByLoading] = useState(false);
  const [choice, setChoice] = useState("");
  const [searchVault, setSearchVault] = useState("");

  const userDetails = JSON.parse(localStorage.getItem("user"));

  let navigate = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    if (userDetails === null || userDetails === undefined) {
      navigate("/login");
    }
    handleFollowList();
  }, []);

  useEffect(() => {
    setShowDrop(false);
    if (sideNav === "Mentors") {
      handleSpecalities();
      handleAccountant();
    } else if (sideNav === "Institutions") {
      // handleFollowList();
      handleAutomatedServices();
    }
  }, [sideNav]);

  const handleAutomatedServices = () => {
    setisLoading(true);
    let obj = {
      app_code: "TaxChains",
      product_creator: "shorupan@taxchains.com",
    };
    GetAutomatedServices(obj)
      .then((res) => {
        if (res.data.status) {
          setautomatedservices(res.data.products);
          setisLoading(false);
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  };

  const handleServicesBy = () => {
    if (currentFollow?.bankerDetails?.displayName !== undefined) {
      setIsServiceByLoading(true);
      let obj = {
        // app_code: "TaxChains",
        product_creator: currentFollow.bankerEmail,
      };
      // console.log(obj);
      GetAutomatedServices(obj)
        .then((res) => {
          if (res.data.status) {
            setServicesByList(res.data.products);
            setIsServiceByLoading(false);
          }
        })
        .catch((err) => {
          setIsServiceByLoading(false);
        });
    }
  };

  const handleSpecalities = () => {
    GetAllSpecialties().then((res) => {
      if (res.data.status) {
        setSpeaclities(res.data);
      }
    });
  };

  const handleAccountant = () => {
    let userEmail = userDetails?.user?.email;
    GetAllAccountants(userEmail).then((res) => {
      if (res.data.status) {
        // console.log(res?.data, 'res.data');
        setAccountantsList(res.data);
      }
    });
  };

  const handleAccountantSpecalities = (each) => {
    let obj = {
      category: "accountants",
      subCategory: each.subCategory,
    };
    GetAllAccountantsForOneSpecialty(obj).then((res) => {
      if (res.data.status) {
        setAccountantsList(res.data);
      }
    });
  };

  const handleFollowBrand = (each) => {
    let obj = {
      appCode: "TaxChains",
      bankerEmail: each?.email,
    };
    let userDetails = JSON.parse(localStorage.getItem("user"));
    let data = {
      email: userDetails.user.email,
      idToken: userDetails.idToken,
    };
    FollowBrand(obj, data).then((res) => {
      if (res?.data?.status) {
        // console.log(res?.data, 'followbrand res?.data')
        // setAccountantsList(res?.data);
        handleAccountant();
        setsubmit(true);
        setFollow(each);
      } else {
        setsubmit(true);
        setFollow(each);
        handleCloseFollow();
      }
    });
  };

  const handleUnFollowBrand = (each) => {
    let obj = {
      appCode: "TaxChains",
      bankerEmail: each?.email,
    };
    let userDetails = JSON.parse(localStorage.getItem("user"));
    let data = {
      email: userDetails.user.email,
      idToken: userDetails.idToken,
    };
    UnfollowBrand(obj, data).then((res) => {
      if (res?.data?.status) {
        // console.log(res?.data, 'Unfollowbrand res?.data')
        // setAccountantsList(res?.data);
        handleAccountant();
        setsubmit(true);
        setFollow(each);
      } else {
        setsubmit(true);
        setFollow(each);
        handleCloseFollow();
      }
    });
  };

  const handleCountryChange = (name) => {
    let data = countriesChecked;
    let indexVal = data.indexOf(name);
    if (indexVal !== -1) {
      setCountriesChecked([...data, name]);
    } else {
      data.splice(indexVal, 1);
      setCountriesChecked(data);
    }
  };

  const handleSpecalityChange = (each) => {
    let data = specalitiesChecked;
    let indexVal = data.indexOf(each.subCategory);
    if (indexVal === -1) {
      setSpecalitiesChecked([each.subCategory]);
      handleAccountantSpecalities(each);
    } else {
      setSpecalitiesChecked([]);
      handleAccountant();
    }
  };

  const handleCloseFollow = () => {
    setTimeout(() => {
      setsubmit(false);
      setFollow("");
      setChoice("");
    }, "4000");
  };

  const handleFollowList = () => {
    let userDetails = JSON.parse(localStorage.getItem("user"));
    GetFollowList(userDetails?.user?.email).then((res) => {
      let result = res?.data;
      if (result?.status) {
        // console.log(res.data, "follo");
        setFollowList(result?.data?.bankers);
        setcurrentFollow(result?.data?.bankers[0]);
        handleServicesBy();
      }
    });
  };

  useEffect(() => {
    if (currentFollow && Object.keys(currentFollow).length > 0) {
      handleServicesBy();
    }
  }, [currentFollow]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <div className="dashboard-main">
        <div className="dashboard-body">
          <div onClick={() => setShowDrop(false)}>
            <Dashsidebar />
          </div>
          <div className="dashboard-screens">
            <div style={{ height: "100%" }}>
              {sideNav === "Mentors" ? (
                <>
                  <div className="dash-nav">
                    <div
                      className="search-input-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <input
                        className="search-input"
                        type="text"
                        placeholder="Search For Mentors..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div
                      className="search-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <img className="search-icon" src={searchic} alt="" />
                    </div>
                    <div
                      className="full-user"
                      onClick={() => setShowDrop(!showDrop)}
                    >
                      <div className="user-box">
                        <img
                          className="user-icon"
                          src={
                            JSON.parse(localStorage.getItem("user"))?.user
                              ?.profile_img !== undefined
                              ? JSON.parse(localStorage.getItem("user"))?.user
                                  ?.profile_img
                              : profile
                          }
                          alt=""
                        />
                      </div>
                      <div
                        className="arrow-box"
                        style={{
                          transform: showDrop ? "rotate(180deg)" : "",
                          cursor: "pointer",
                        }}
                      >
                        <img className="arrow-icon" src={downarrow} alt="" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="account-container"
                    onClick={() => setShowDrop(false)}
                  >
                    <div className="account-left">
                      <div className="filter-actions-box">
                        {/* <div className="filter-action1">Add A Filter</div>
                        <div className="filter-action2">Add A Filter</div> */}
                      </div>
                      <div className="all-account">
                        {accountantsList != null &&
                        accountantsList != undefined &&
                        accountantsList?.data != null &&
                        accountantsList?.data != undefined ? (
                          <>
                            {accountantsList?.data
                              ?.filter((element) => {
                                return element.displayName
                                  .toLowerCase()
                                  .startsWith(search.toLowerCase());
                              })
                              ?.map((each, i) => (
                                <div className="each-account" key={i}>
                                  <div className="account-img-box">
                                    <img
                                      className="account-img"
                                      src={each?.profilePicURL}
                                      alt=""
                                    />
                                  </div>
                                  <div className="account-name">
                                    {each?.displayName}
                                  </div>
                                  <div className="account-work">
                                    {each?.description}
                                  </div>
                                  <div className="account-country">
                                    Countries
                                  </div>
                                  <div>
                                    {typeof each.country === "object" ? (
                                      <div className="account-countries-all">
                                        <div className="account-countries-each">
                                          {each?.country[0]}
                                        </div>
                                        <div className="account-countries-each1">
                                          {each?.country[1]}
                                        </div>
                                        <div
                                          className="account-countries-more"
                                          style={{
                                            display:
                                              each?.country?.length > 2
                                                ? ""
                                                : "none",
                                          }}
                                        >
                                          More
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="account-countries-all">
                                        <div className="account-countries-each">
                                          {each?.country}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <div className="account-speaclities">
                                    Specialty
                                  </div>
                                  {typeof each?.subCategory === "object" ? (
                                    <div className="account-speaclities-all">
                                      <div className="account-speaclities-each">
                                        {each?.subCategory[0]}
                                      </div>
                                      <div className="account-speaclities-each1">
                                        {each?.subCategory[1]}
                                      </div>
                                      <div className="account-speaclities-each2">
                                        {each?.subCategory[2]}
                                      </div>
                                      <div className="account-speaclities-each3">
                                        {each?.subCategory[3]}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="account-speaclities-all">
                                      <div className="account-speaclities-each">
                                        {each?.subCategory}
                                      </div>
                                    </div>
                                  )}
                                  <div
                                    className="account-see-more"
                                    onClick={() => {
                                      if (!each?.userFollow) {
                                        handleFollowBrand(each);
                                        setChoice("Follow");
                                      } else {
                                        handleUnFollowBrand(each);
                                        setChoice("Unfollow");
                                      }
                                    }}
                                    style={{
                                      background: each?.userFollow
                                        ? "#FE2C55"
                                        : "#59A2DD",
                                    }}
                                  >
                                    {each?.userFollow ? "Unfollow" : "Follow"}
                                  </div>
                                </div>
                              ))}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="account-right">
                      <div className="account-right-box1">
                        <div className="account-right-title">Country</div>
                        <div style={{ overflowY: "scroll", height: "73%" }}>
                          <div className="check-div">
                            <div className="check">
                              <img
                                className=""
                                src={correct}
                                alt=""
                                style={{
                                  visibility:
                                    countriesChecked.length === 0
                                      ? "visible"
                                      : "hidden",
                                }}
                              />
                            </div>
                            <div className="check-label">All Countries</div>
                          </div>
                        </div>
                        <div className="account-right-btn">See All</div>
                      </div>
                      <div className="account-right-box2">
                        <div className="account-right-title">Specialty</div>
                        {Speaclities != null &&
                        Speaclities != undefined &&
                        Speaclities.data != null &&
                        Speaclities.data != undefined ? (
                          <div style={{ overflowY: "scroll", height: "76%" }}>
                            {Speaclities.data.map((each, i) => (
                              <div className="check-div">
                                <div
                                  className="check"
                                  onClick={() => handleSpecalityChange(each)}
                                >
                                  <img
                                    className=""
                                    src={correct}
                                    alt=""
                                    style={{
                                      visibility: specalitiesChecked.includes(
                                        each.subCategory
                                      )
                                        ? "visible"
                                        : "hidden",
                                    }}
                                  />
                                </div>
                                <div className="check-label">
                                  {each.subCategory}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="account-right-btn">See All</div>
                      </div>
                    </div>
                  </div>
                </>
              ) : sideNav === "Institutions" ? (
                <>
                  <div className="dash-nav">
                    <div
                      className="search-input-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <input
                        className="search-input"
                        type="text"
                        placeholder="Search For Institutions..."
                        value={searchservice}
                        onChange={(e) => setSearchservice(e.target.value)}
                      />
                    </div>
                    <div
                      className="search-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <img className="search-icon" src={searchic} alt="" />
                    </div>
                    <div
                      className="full-user"
                      onClick={() => setShowDrop(!showDrop)}
                    >
                      <div className="user-box">
                        <img
                          className="user-icon"
                          src={
                            JSON.parse(localStorage.getItem("user"))?.user
                              ?.profile_img !== undefined
                              ? JSON.parse(localStorage.getItem("user"))?.user
                                  ?.profile_img
                              : profile
                          }
                          alt=""
                        />
                      </div>
                      <div
                        className="arrow-box"
                        style={{
                          transform: showDrop ? "rotate(180deg)" : "",
                          cursor: "pointer",
                        }}
                      >
                        <img className="arrow-icon" src={downarrow} alt="" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="service-container"
                    onClick={() => setShowDrop(false)}
                  >
                    <div className="service-main">
                      <div
                        className="serviceby-box"
                        onClick={() => {
                          setOpenRight(true);
                          setShowDrop(false);
                        }}
                      >
                        <div className="serviceby-title">
                          Institutions Used By
                        </div>
                        <div className="serciceby-option-box">
                          <div className="serviceby-imgbox">
                            <img
                              className="serviceby-img"
                              src={currentFollow?.bankerDetails?.profilePicURL}
                              alt=""
                            />
                          </div>
                          <div className="serviceby-name">
                            {currentFollow?.bankerDetails?.displayName}
                          </div>
                          <div className="serviceby-arrowbox">
                            <img
                              className="serviceby-arrow"
                              src={darrow}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        className="serviceby-allbox"
                        onClick={() => setShowDrop(false)}
                      >
                        {isServiceByLoading ? (
                          <div className="each-service">
                            <Skeleton className="each-service-img" />
                            <Skeleton className="each-service-title" />
                            <Skeleton className="each-service-desc" />
                            <div className="each-service-bottom">
                              <Skeleton className="each-service-price" />
                              <Skeleton className="zoom1" />
                            </div>
                          </div>
                        ) : (
                          <>
                            {servicesByList != null &&
                            servicesByList != undefined ? (
                              <>
                                {servicesByList
                                  ?.filter((item) =>
                                    item.product.product_name
                                      .toLowerCase()
                                      .startsWith(searchservice.toLowerCase())
                                  )
                                  ?.map((each, i) => (
                                    <div
                                      className="each-service"
                                      onClick={() => {
                                        // console.log(each, 'each product1')
                                        localStorage.setItem(
                                          "product",
                                          JSON.stringify(each)
                                        );
                                        navigate(
                                          `/dashboard/users/${each?.product?.product_code}`
                                        );
                                      }}
                                    >
                                      <div>
                                        <img
                                          className="each-service-img"
                                          src={each?.product?.product_icon}
                                          alt=""
                                        />
                                      </div>
                                      <div className="each-service-title">
                                        {each.product.product_name}
                                      </div>
                                      <div className="each-service-desc">
                                        {each.product.sub_text}
                                      </div>
                                      <div className="each-service-bottom">
                                        <div className="each-service-price">
                                          $
                                          {`${parseFloat(
                                            each.product.pricesWithAppFees[
                                              each.product.pricesWithAppFees
                                                .length - 1
                                            ].price
                                          ).toFixed(2)}/${
                                            each.product.pricesWithAppFees[
                                              each.product.pricesWithAppFees
                                                .length - 1
                                            ].billing_method
                                          }`}
                                        </div>
                                        <div
                                          className="zoom1"
                                          style={{ cursor: "not-allowed" }}
                                        >
                                          <span
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-around",
                                              alignItems: "center",
                                              height: "40px",
                                            }}
                                          >
                                            <div className="check1-text">
                                              CHECK
                                            </div>
                                            <img
                                              className="clickarrow-img"
                                              src={clickarrow}
                                              alt=""
                                            />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </div>
                      <div
                        className="serviceby-title1"
                        onClick={() => setShowDrop(false)}
                      >
                        Naavi Recommended Institutions
                      </div>
                      <div
                        className="serviceby-allbox"
                        onClick={() => setShowDrop(false)}
                      >
                        {isLoading ? (
                          <div className="each-service">
                            <Skeleton className="each-service-img" />
                            <Skeleton className="each-service-title" />
                            <Skeleton className="each-service-desc" />
                            <div className="each-service-bottom">
                              <Skeleton className="each-service-price" />
                              <Skeleton className="zoom1" />
                            </div>
                          </div>
                        ) : (
                          <>
                            {automatedservices != null &&
                            automatedservices != undefined ? (
                              <>
                                {automatedservices
                                  ?.filter((item) =>
                                    item.product.product_name
                                      .toLowerCase()
                                      .startsWith(searchservice.toLowerCase())
                                  )
                                  ?.map((each, i) => (
                                    <div
                                      className="each-service"
                                      onClick={() => {
                                        // console.log(each, 'each product2')
                                        localStorage.setItem(
                                          "product",
                                          JSON.stringify(each)
                                        );
                                        navigate(
                                          `/dashboard/users/${each?.product?.product_code}`
                                        );
                                      }}
                                    >
                                      <div>
                                        <img
                                          className="each-service-img"
                                          src={each.product.product_icon}
                                          alt=""
                                        />
                                      </div>
                                      <div className="each-service-title">
                                        {each.product.product_name}
                                      </div>
                                      <div className="each-service-desc">
                                        {each.product.sub_text}
                                      </div>
                                      <div className="each-service-bottom">
                                        <div className="each-service-price">
                                          $
                                          {`${parseFloat(
                                            each.product.pricesWithAppFees[
                                              each.product.pricesWithAppFees
                                                .length - 1
                                            ].price
                                          ).toFixed(2)}/${
                                            each.product.pricesWithAppFees[
                                              each.product.pricesWithAppFees
                                                .length - 1
                                            ].billing_method
                                          }`}
                                        </div>
                                        <div
                                          className="zoom1"
                                          style={{ cursor: "not-allowed" }}
                                        >
                                          <span
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-around",
                                              alignItems: "center",
                                              height: "40px",
                                            }}
                                          >
                                            <div className="check1-text">
                                              CHECK
                                            </div>
                                            <img
                                              className="clickarrow-img"
                                              src={clickarrow}
                                              alt=""
                                            />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : sideNav === "Calendar" ? (
                <>
                  <div className="dash-nav">
                    <div
                      className="search-input-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <input
                        className="search-input"
                        type="text"
                        placeholder="Search Events..."
                        value={searchservice}
                        onChange={(e) => setSearchservice(e.target.value)}
                      />
                    </div>
                    <div
                      className="search-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <img className="search-icon" src={searchic} alt="" />
                    </div>
                    <div
                      className="full-user"
                      onClick={() => setShowDrop(!showDrop)}
                    >
                      <div className="user-box">
                        <img
                          className="user-icon"
                          src={
                            JSON.parse(localStorage.getItem("user"))?.user
                              ?.profile_img !== undefined
                              ? JSON.parse(localStorage.getItem("user"))?.user
                                  ?.profile_img
                              : profile
                          }
                          alt=""
                        />
                      </div>
                      <div
                        className="arrow-box"
                        style={{
                          transform: showDrop ? "rotate(180deg)" : "",
                          cursor: "pointer",
                        }}
                      >
                        <img className="arrow-icon" src={downarrow} alt="" />
                      </div>
                    </div>
                  </div>
                  <div onClick={() => setShowDrop(false)}>
                    <EarningCalendar />
                  </div>
                </>
              ) : sideNav === "Vaults" ? (
                <>
                  <div className="dash-nav">
                    <div
                      className="search-input-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <input
                        className="search-input"
                        type="text"
                        placeholder="Search Vaults..."
                        value={searchVault}
                        onChange={(e) => setSearchVault(e.target.value)}
                      />
                    </div>
                    <div
                      className="search-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <img className="search-icon" src={searchic} alt="" />
                    </div>
                    <div
                      className="full-user"
                      onClick={() => setShowDrop(!showDrop)}
                    >
                      <div className="user-box">
                        <img
                          className="user-icon"
                          src={
                            JSON.parse(localStorage.getItem("user"))?.user
                              ?.profile_img !== undefined
                              ? JSON.parse(localStorage.getItem("user"))?.user
                                  ?.profile_img
                              : profile
                          }
                          alt=""
                        />
                      </div>
                      <div
                        className="arrow-box"
                        style={{
                          transform: showDrop ? "rotate(180deg)" : "",
                          cursor: "pointer",
                        }}
                      >
                        <img className="arrow-icon" src={downarrow} alt="" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="services-main"
                    style={{ height: "calc(100% - 70px)" }}
                    onClick={() => setShowDrop(false)}
                  >
                    <div
                      className="services-all-menu"
                      style={{ borderBottom: "0.5px solid #E5E5E5" }}
                    >
                      <div style={{ display: "flex", width: "83%" }}>
                        <div
                          className="services-each-menu"
                          style={{
                            background:
                              coinType === "crypto"
                                ? "rgba(241, 241, 241, 0.5)"
                                : "",
                            fontWeight: coinType === "crypto" ? "700" : "",
                          }}
                          onClick={() => {
                            setCoinType("crypto");
                            setSearch("");
                          }}
                        >
                          Crypto
                        </div>

                        <div
                          className="services-each-menu"
                          style={{
                            background:
                              coinType === "fiat"
                                ? "rgba(241, 241, 241, 0.5)"
                                : "",
                            fontWeight: coinType === "fiat" ? "700" : "",
                          }}
                          onClick={() => {
                            setCoinType("fiat");
                            setSearch("");
                          }}
                        >
                          Forex
                        </div>
                      </div>

                      <div style={{ display: "flex" }}>
                        <Toggle
                          toggle={balanceToggle}
                          setToggle={setBalanceToggle}
                          coinType={coinType}
                        />
                      </div>
                    </div>
                    <Vaults searchedValue={searchVault} />
                  </div>
                </>
              ) : sideNav === "Next Steps" ? (
                <>
                  <div className="dash-nav">
                    <div
                      className="search-input-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <input
                        className="search-input"
                        type="text"
                        placeholder="Search..."
                        // value={searchVault}
                        // onChange={(e) => setSearchVault(e.target.value)}
                      />
                    </div>
                    <div
                      className="search-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <img className="search-icon" src={searchic} alt="" />
                    </div>
                    <div
                      className="full-user"
                      onClick={() => setShowDrop(!showDrop)}
                    >
                      <div className="user-box">
                        <img
                          className="user-icon"
                          src={
                            JSON.parse(localStorage.getItem("user"))?.user
                              ?.profile_img !== undefined
                              ? JSON.parse(localStorage.getItem("user"))?.user
                                  ?.profile_img
                              : profile
                          }
                          alt=""
                        />
                      </div>
                      <div
                        className="arrow-box"
                        style={{
                          transform: showDrop ? "rotate(180deg)" : "",
                          cursor: "pointer",
                        }}
                      >
                        <img className="arrow-icon" src={downarrow} alt="" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="services-main"
                    style={{ height: "calc(100% - 70px)" }}
                    onClick={() => setShowDrop(false)}
                  >
                    <Tasks />
                  </div>
                </>
              ) : sideNav === "Scanner" ? (
                <>
                  <div className="dash-nav">
                    <div
                      className="search-input-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <input
                        className="search-input"
                        type="text"
                        placeholder="Search..."
                        // value={searchVault}
                        // onChange={(e) => setSearchVault(e.target.value)}
                      />
                    </div>
                    <div
                      className="search-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <img className="search-icon" src={searchic} alt="" />
                    </div>
                    <div
                      className="full-user"
                      onClick={() => setShowDrop(!showDrop)}
                    >
                      <div className="user-box">
                        <img
                          className="user-icon"
                          src={
                            JSON.parse(localStorage.getItem("user"))?.user
                              ?.profile_img !== undefined
                              ? JSON.parse(localStorage.getItem("user"))?.user
                                  ?.profile_img
                              : profile
                          }
                          alt=""
                        />
                      </div>
                      <div
                        className="arrow-box"
                        style={{
                          transform: showDrop ? "rotate(180deg)" : "",
                          cursor: "pointer",
                        }}
                      >
                        <img className="arrow-icon" src={downarrow} alt="" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="services-main"
                    style={{ height: "calc(100% - 70px)" }}
                    onClick={() => setShowDrop(false)}
                  >
                    <WalletScan />
                  </div>
                </>
              ) : sideNav === "Paths" ? (
                <>
                  <div className="dash-nav">
                    <div
                      className="search-input-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <input
                        className="search-input"
                        type="text"
                        placeholder="Search For Paths..."
                        // value={searchVault}
                        // onChange={(e) => setSearchVault(e.target.value)}
                      />
                    </div>
                    <div
                      className="search-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <img className="search-icon" src={searchic} alt="" />
                    </div>
                    <div
                      className="full-user"
                      onClick={() => setShowDrop(!showDrop)}
                    >
                      <div className="user-box">
                        <img
                          className="user-icon"
                          src={
                            JSON.parse(localStorage.getItem("user"))?.user
                              ?.profile_img !== undefined
                              ? JSON.parse(localStorage.getItem("user"))?.user
                                  ?.profile_img
                              : profile
                          }
                          alt=""
                        />
                      </div>
                      <div
                        className="arrow-box"
                        style={{
                          transform: showDrop ? "rotate(180deg)" : "",
                          cursor: "pointer",
                        }}
                      >
                        <img className="arrow-icon" src={downarrow} alt="" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="services-main"
                    style={{ height: "calc(100% - 70px)" }}
                    onClick={() => setShowDrop(false)}
                  >
                    <PathComponent />
                  </div>
                </>
              ) : sideNav === "My Journey" ? (
                <>
                  <div className="dash-nav">
                    <div
                      className="search-input-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <input
                        className="search-input"
                        type="text"
                        placeholder="Search..."
                        // value={searchVault}
                        // onChange={(e) => setSearchVault(e.target.value)}
                      />
                    </div>
                    <div
                      className="search-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <img className="search-icon" src={searchic} alt="" />
                    </div>
                    <div
                      className="full-user"
                      onClick={() => setShowDrop(!showDrop)}
                    >
                      <div className="user-box">
                        <img
                          className="user-icon"
                          src={
                            JSON.parse(localStorage.getItem("user"))?.user
                              ?.profile_img !== undefined
                              ? JSON.parse(localStorage.getItem("user"))?.user
                                  ?.profile_img
                              : profile
                          }
                          alt=""
                        />
                      </div>
                      <div
                        className="arrow-box"
                        style={{
                          transform: showDrop ? "rotate(180deg)" : "",
                          cursor: "pointer",
                        }}
                      >
                        <img className="arrow-icon" src={downarrow} alt="" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="services-main"
                    style={{ height: "calc(100% - 70px)" }}
                    onClick={() => setShowDrop(false)}
                  >
                    <JourneyPage />
                  </div>
                </>
              ) : sideNav === "Current Step" ? (
                <>
                  <div className="dash-nav">
                    <div
                      className="search-input-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <input
                        className="search-input"
                        type="text"
                        placeholder="Search..."
                        // value={searchVault}
                        // onChange={(e) => setSearchVault(e.target.value)}
                      />
                    </div>
                    <div
                      className="search-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <img className="search-icon" src={searchic} alt="" />
                    </div>
                    <div
                      className="full-user"
                      onClick={() => setShowDrop(!showDrop)}
                    >
                      <div className="user-box">
                        <img
                          className="user-icon"
                          src={
                            JSON.parse(localStorage.getItem("user"))?.user
                              ?.profile_img !== undefined
                              ? JSON.parse(localStorage.getItem("user"))?.user
                                  ?.profile_img
                              : profile
                          }
                          alt=""
                        />
                      </div>
                      <div
                        className="arrow-box"
                        style={{
                          transform: showDrop ? "rotate(180deg)" : "",
                          cursor: "pointer",
                        }}
                      >
                        <img className="arrow-icon" src={downarrow} alt="" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="services-main"
                    style={{ height: "calc(100% - 70px)" }}
                    onClick={() => setShowDrop(false)}
                  >
                    <CurrentStep />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <>
        {submit ? (
          <div
            className="pagemask"
            onMouseDown={() => {
              setsubmit(false);
              setFollow("");
              setChoice("");
            }}
            onClick={() => setShowDrop(false)}
          >
            <div className="full-box">
              <div className="endbox" onMouseDown={(e) => e.stopPropagation()}>
                <>{console.log(follow)}</>
                <div className="account-img-box">
                  <img
                    className="account-img"
                    src={follow.profilePicURL}
                    alt=""
                  />
                </div>
                <div className="follow-text">
                  {choice === "Follow"
                    ? "You Are Now Following"
                    : "You Have Now Unfollowed"}
                  <br />
                  {follow?.displayName}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
      <>
        {showDrop ? (
          <div className="m-drop" onMouseDown={(e) => e.stopPropagation()}>
            {/* <div className="m-each">
              <div className="m-left">
                <div className="m-left-icon-box">
                  <img className="m-left-icon" src={accounts} alt="" />
                </div>
                <div className="m-left-text">Accounts</div>
              </div>
              <div className="m-right-icon-box">
                <img className="m-right-icon" src={sidearrow} alt="" />
              </div>
            </div>
            <div className="m-each">
              <div className="m-left">
                <div className="m-left-icon-box">
                  <img className="m-left-icon" src={vaults} alt="" />
                </div>
                <div className="m-left-text">Vaults</div>
              </div>
              <div className="m-right-icon-box">
                <img className="m-right-icon" src={sidearrow} alt="" />
              </div>
            </div> */}
            <div className="m-each" style={{ opacity: "0.5" }}>
              <div className="m-left">
                <div className="m-left-icon-box">
                  <img className="m-left-icon" src={profilea} alt="" />
                </div>
                <div className="m-left-text">Profile</div>
              </div>
              <div className="m-right-icon-box">
                <img className="m-right-icon" src={sidearrow} alt="" />
              </div>
            </div>
            <div className="m-each-line"> </div>
            <div className="m-each" style={{ opacity: "0.5" }}>
              <div className="m-left">
                <div className="m-left-icon-box">
                  <img className="m-left-icon" src={support} alt="" />
                </div>
                <div className="m-left-text">Support</div>
              </div>
              <div className="m-right-icon-box">
                <img className="m-right-icon" src={sidearrow} alt="" />
              </div>
            </div>
            <div className="m-each" style={{ opacity: "0.5" }}>
              <div className="m-left">
                <div className="m-left-icon-box">
                  <img className="m-left-icon" src={settings} alt="" />
                </div>
                <div className="m-left-text">Settings</div>
              </div>
              <div className="m-right-icon-box">
                <img className="m-right-icon" src={sidearrow} alt="" />
              </div>
            </div>
            <div className="m-each" onClick={() => handleLogout()}>
              <div className="m-left">
                <div className="m-left-icon-box">
                  <img className="m-left-icon" src={logout} alt="" />
                </div>
                <div className="m-left-text">Logout</div>
              </div>
              <div className="m-right-icon-box">
                <img className="m-right-icon" src={sidearrow} alt="" />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
      <>
        {openRight && sideNav === "Institutions" ? (
          <div className="all-follow" onClick={() => setShowDrop(false)}>
            <div className="all-follow-head-box">
              <div className="all-follow-head-title">Mentors You Follow</div>
              <div
                className="all-follow-head-box-img-box"
                onClick={() => setOpenRight(false)}
                style={{ cursor: "pointer" }}
              >
                <img className="all-follow-head-img" src={closepop} alt="" />
              </div>
            </div>
            <div className="scrollable-follow">
              <div className="follow-current">
                <div className="follow-current-head">Currently Selected</div>
                <div
                  className="each-follow"
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    borderRadius: "10px",
                  }}
                >
                  <div className="follow-details">
                    <div className="follow-icon-box">
                      <img
                        className="follow-icon"
                        src={currentFollow.bankerDetails.profilePicURL}
                        alt=""
                      />
                    </div>
                    <div className="follow-name-box">
                      <div className="follow-pop-name">
                        {currentFollow.bankerDetails.displayName}
                      </div>
                      <div className="follow-pop-time">
                        Following&nbsp;Since&nbsp;
                        <span>{formatDate(currentFollow.timeStamp)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="follow-button-box">
                    <div className="unfollow-btn">Unfollow</div>
                    <div className="profilebtn">Profile</div>
                  </div>
                </div>
              </div>
              <div className="follow-current">
                <div className="follow-current-head">Other</div>
                <div>
                  {followList
                    ?.filter((item) => item !== currentFollow)
                    ?.map((each, i) => (
                      <div
                        className="each-follow"
                        onClick={() => setcurrentFollow(each)}
                      >
                        <div className="follow-details">
                          <div className="follow-icon-box">
                            <img
                              className="follow-icon"
                              src={each.bankerDetails.profilePicURL}
                              alt=""
                            />
                          </div>
                          <div className="follow-name-box">
                            <div className="follow-pop-name">
                              {each.bankerDetails.displayName}
                            </div>
                            <div className="follow-pop-time">
                              Following&nbsp;Since&nbsp;
                              <span>{formatDate(each.timeStamp)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="follow-button-box">
                          <div className="unfollow-btn">Unfollow</div>
                          <div className="profilebtn">Profile</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
