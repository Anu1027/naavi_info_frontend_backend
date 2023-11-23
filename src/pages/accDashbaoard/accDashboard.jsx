import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./accDashboard.scss";
import searchic from "../../static/images/dashboard/searchic.svg";
import downarrow from "../../static/images/dashboard/downarrow.svg";
import uploadv from "../../static/images/dashboard/uploadv.svg";
import nvest from "../../static/images/dashboard/nvest.svg";
import profile from "../../static/images/dashboard/profile.svg";
import closepop from "../../static/images/dashboard/closepop.svg";
import accounts from "../../static/images/dashboard/accounts.svg";
import vaults from "../../static/images/dashboard/vaults.svg";
import profilea from "../../static/images/dashboard/profilea.svg";
import support from "../../static/images/dashboard/support.svg";
import settings from "../../static/images/dashboard/settings.svg";
import sidearrow from "../../static/images/dashboard/sidearrow.svg";
import logout from "../../static/images/dashboard/logout.svg";
import upgif from "../../static/images/dashboard/upgif.gif";
import lg1 from "../../static/images/login/lg1.svg";
import threedot from "../../static/images/dashboard/threedot.svg";
import close from "../../images/close.svg";
import upload from "../../images/upload.svg";
import { useStore } from "../../components/store/store.ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AccDashsidebar from "../../components/accDashsidebar/accDashsidebar";
import {
  GetFollowersPerAccount,
  GetCategoriesAcc,
  GetAllCustomerLicenses,
  GetLogServices,
  GetAllCurrencies,
  CreatePopularService,
  DeleteServiceFunction,
  addCompPlanFunction,
} from "../../services/accountant";
import { formatDate } from "../../utils/time";
import * as jose from "jose";
import EarningCalendar from "./EarningCalendar/index";
import { LoadingAnimation1 } from "../../components/LoadingAnimation1";
import { uploadImageFunc } from "../../utils/imageUpload";
import Vaults from "../Vaults";
import Toggle from "../../components/Toggle";
import Tasks from "../Tasks";
import arrow from "./arrow.svg";
import trash from "./trash.svg";
import { useCoinContextData } from "../../context/CoinContext";
import MyPaths from "../MyPaths";
import NewStep1 from "../../globalComponents/GlobalDrawer/NewStep1";

const AccDashboard = () => {
  const {
    accsideNav,
    setaccsideNav,
    ispopular,
    setispopular,
    coinType,
    setCoinType,
    balanceToggle,
    setBalanceToggle,
  } = useStore();
  const [search, setSearch] = useState("");
  const [crmMenu, setcrmMenu] = useState("Followers");
  const [servicesMenu, setservicesMenu] = useState("Services");
  const [isLoading, setIsLoading] = useState(false);
  const [isPurchaseLoading, setIsPurchaseLoading] = useState(false);
  const [isCatoading, setIsCatLoading] = useState(false);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [followCount, setfollowCount] = useState(0);
  const [followData, setfollowData] = useState([]);
  const [coverImageS3url, setCoverImageS3url] = useState("");
  const [selectedFollower, setSelectedFollower] = useState({});
  const [pstep, setpstep] = useState(1);
  const [selectNew, setselectNew] = useState("");
  const [billingType, setbillingType] = useState("");
  const [categoriesData, setcategoriesData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [selectCategory, setselectCategory] = useState("");
  const [serviceNameInput, setServiceNameInput] = useState("");
  const [serviceCodeInput, setServiceCodeInput] = useState("");
  const [productLabel, setProductLabel] = useState("");
  const [serviceTagline, setServiceTagline] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [isCurrencies, setIsCurrencies] = useState(false);
  const [allCurrencies, setallCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [firstMonthPrice, setfirstMonthPrice] = useState("");
  const [monthlyPrice, setmonthlyPrice] = useState("");
  const [gracePeriod, setgracePeriod] = useState("");
  const [secondChargeAttempt, setsecondChargeAttempt] = useState("");
  const [thirdChargeAttempt, setthirdChargeAttempt] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isServicesAcc, setIsServicesAcc] = useState(false);
  const [servicesAcc, setservicesAcc] = useState([]);
  const [serviceActionEnabled, setServiceActionEnabled] = useState(false);
  const [serviceActionStep, setServiceActionStep] = useState(1);
  const [selectedService, setSelectedService] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [updatedIcon, setUpdatedIcon] = useState("");

  //add compPlan
  const [addCompPlan, setAddCompPlan] = useState(false);
  const [addCompPlanStep, setAddCompPlanStep] = useState("step1");
  const [userCreatedApps, setUserCreatedApps] = useState([]);
  const [compPlanApp, setCompPlanApp] = useState("");
  const [levels, setLevels] = useState();
  const [addingComp, setAddingComp] = useState(false);
  const [inputValues, setInputValues] = useState([]);
  const [multiplier, setMultiplier] = useState([]);
  const [isfetching, setIsfetching] = useState(false);

  //with compPlan
  const [withCompPlanData, setWithCompPlanData] = useState([]);
  const [gettingData, setGettingData] = useState(false);

  // new step
  const [mainMenu, setMainMenu] = useState("");
  const [step, setStep] = useState("");
  const [loading, setLoading] = useState(false);

  // new path
  const [grade, setGrade] = useState([]);
  const [gradeAvg, setGradeAvg] = useState([]);
  const [curriculum, setCurriculum] = useState([]);
  const [stream, setStream] = useState([]);
  const [finance, setFinance] = useState([]);
  const streamList = ["MPC", "BIPC", "CEC", "MEC", "HEC"];
  const curriculumList = ["IB", "IGCSE", "CBSE", "ICSE", "Nordic"];
  const gradeList = ["9", "10", "11", "12"];
  const gradePointAvg = [
    "0% - 35%",
    "36% - 60%",
    "61% - 75%",
    "76% - 85%",
    "86% - 95%",
    "96% - 100%",
  ];
  const financeList = ["0-25L", "25L-75L", "75L-3CR", "3CR+", "Other"];

  let navigate = useNavigate();

  const {
    allSteps,
    setAllSteps,
    stepsToggle,
    setStepsToggle,
    pathSteps,
    setPathSteps,
    creatingPath,
    setCreatingPath,
    mypathsMenu,
    setMypathsMenu,
  } = useCoinContextData();

  //upload part starts here

  const secret = "uyrw7826^&(896GYUFWE&*#GBjkbuaf"; // secret not to be disclosed anywhere.
  const emailDev = "rahulrajsb@outlook.com"; // email of the developer.
  const userDetails = JSON.parse(localStorage.getItem("user"));

  const handleGrade = (item) => {
    if (grade.includes(item)) {
      // If the grade is already selected, remove it
      setGrade(grade.filter((o) => o !== item));
    } else {
      // If the grade is not selected, add it
      setGrade([...grade, item]);
    }
  };
  
  const handleGradeAvg = (item) => {
    if (gradeAvg.includes(item)) {
      // If the gradeAvg is already selected, remove it
      setGradeAvg(gradeAvg.filter((o) => o !== item));
    } else {
      // If the gradeAvg is not selected, add it
      setGradeAvg([...gradeAvg, item]);
    }
  };

  const handleCurriculum = (item) => {
    if (curriculum.includes(item)) {
      // If the curriculum is already selected, remove it
      setCurriculum(curriculum.filter((o) => o !== item));
    } else {
      // If the curriculum is not selected, add it
      setCurriculum([...curriculum, item]);
    }
  };

  const handleStream = (item) => {
    if (stream.includes(item)) {
      // If the stream is already selected, remove it
      setStream(stream.filter((o) => o !== item));
    } else {
      // If the stream is not selected, add it
      setStream([...stream, item]);
    }
  };

  const handleFinance = (item) => {
    if (finance.includes(item)) {
      // If the finance is already selected, remove it
      setFinance(finance.filter((o) => o !== item));
    } else {
      // If the finance is not selected, add it
      setFinance([...finance, item]);
    }
  };

  useEffect(() => {
    if (userDetails) {
      setPathSteps((prev) => {
        return {
          ...prev,
          email: userDetails?.user?.email,
        };
      });
    }
  }, []);

  useEffect(() => {
    handleFollowerPerAccountants();
    handleGetCurrencies();
    // setaccsideNav("CRM")
    resetpop();
    const userDetails = JSON.parse(localStorage.getItem("user"));
    if (userDetails === null || userDetails === undefined) {
      navigate("/login");
    }
  }, []);

  const uploadCoverImage = async (file) => {
    setIsUploadLoading(true);

    const fileName = `${new Date().getTime()}${file.name.substr(
      file.name.lastIndexOf(".")
    )}`;

    const formData = new FormData();
    const newfile = renameFile(file, fileName);
    formData.append("files", newfile);
    const path_inside_brain = "root/";

    const jwts = await signJwt(fileName, emailDev, secret);
    console.log(jwts, "lkjkswedcf");
    let { data } = await axios.post(
      `https://drivetest.globalxchange.io/file/dev-upload-file?email=${emailDev}&path=${path_inside_brain}&token=${jwts}&name=${fileName}`,
      formData,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setCoverImageS3url(data.payload.url);
    setIsUploadLoading(false);
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

  function renameFile(originalFile, newName) {
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  }

  //upload end here

  const handleFollowerPerAccountants = () => {
    setIsLoading(true);
    let mailId = userDetails?.user?.email;
    GetFollowersPerAccount(mailId)
      .then((res) => {
        let result = res?.data;
        if (result?.status) {
          setfollowCount(result?.data?.count);
          setfollowData(result?.data?.followers);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err, "jkjkk");
        setIsLoading(false);
        toast.error("Something Went Wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleAllCustomerLicenses = () => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    setIsPurchaseLoading(true);
    GetAllCustomerLicenses(userDetails.user.email)
      .then((res) => {
        let result = res.data;
        if (result.status) {
          setPurchaseData(result.licenses);
          setIsPurchaseLoading(false);
        }
      })
      .catch((err) => {
        // console.log(err)
        setIsPurchaseLoading(false);
      });
  };

  const handleCategories = () => {
    setIsCatLoading(true);
    GetCategoriesAcc()
      .then((res) => {
        let result = res.data;
        if (result.status) {
          setcategoriesData(result.categories);
          setIsCatLoading(false);
        }
      })
      .catch((err) => {
        setIsCatLoading(false);
        console.log(err, "jkjkk");
        toast.error("Something Went Wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleGetCurrencies = () => {
    setIsCurrencies(true);
    GetAllCurrencies()
      .then((res) => {
        let result = res?.data;
        if (result?.status) {
          setallCurrencies(result?.coins);
          setIsCurrencies(false);
        }
      })
      .catch((err) => {
        console.log(err, "jkjkk");
        setIsCurrencies(false);
        toast.error("Something Went Wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const resetpop = () => {
    setispopular(false);
    setpstep(1);
    setbillingType("");
    setselectNew("");
    setselectCategory("");
    setcategoriesData([]);
    setSearch("");
    setSelectedCurrency({});
    setServiceNameInput("");
    setServiceCodeInput("");
    setProductLabel("");
    setServiceTagline("");
    setServiceDescription("");
    setfirstMonthPrice("");
    setmonthlyPrice("");
    setgracePeriod("");
    setsecondChargeAttempt("");
    setthirdChargeAttempt("");
    setfirstMonthPrice("");
    setmonthlyPrice("");
    setgracePeriod("");
    setsecondChargeAttempt("");
    setthirdChargeAttempt("");
    setCoverImageS3url("");
    setImage(null);
    setPathSteps({
      email: userDetails?.user?.email,
      nameOfPath: "",
      description: "",
      length: "",
      path_type: "",
      step_ids: [],
      destination_institution: "",
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleServicesForLogged = (value) => {
    setIsServicesAcc(true);
    GetLogServices(value)
      .then((res) => {
        // console.log(res, "kk");
        let result = res?.data;
        if (result?.status) {
          setservicesAcc(result?.products);
          setIsServicesAcc(false);
        }
      })
      .catch((err) => {
        console.log(err, "error in GetLogServices");
        setIsServicesAcc(false);
      });
  };

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    setImage(e.target.files[0]);
    uploadCoverImage(e.target.files[0]);
  };

  const handleFinalSubmit = () => {
    setIsSubmit(true);
    let userDetails = JSON.parse(localStorage.getItem("user"));
    let objmonthly = {
      email: userDetails.user.email,
      token: userDetails.idToken,
      product_code: serviceCodeInput,
      product_name: serviceNameInput,
      product_icon: coverImageS3url,
      revenue_account: userDetails.user.email,
      client_app: "TaxChains",
      product_category_code: "CoE",
      sub_category_code: "",
      custom_product_label: productLabel,
      points_creation: false,
      sub_text: serviceTagline,
      full_description: serviceDescription,
      first_purchase: {
        price: firstMonthPrice !== "" ? parseFloat(firstMonthPrice) : 0,
        coin: selectedCurrency.coinSymbol,
      },
      billing_cycle: {
        monthly: {
          price:
            billingType === "One Time"
              ? firstMonthPrice !== ""
                ? parseFloat(firstMonthPrice)
                : 0
              : monthlyPrice !== ""
              ? parseFloat(monthlyPrice)
              : 0,
          coin: selectedCurrency.coinSymbol,
        },
      },
      grace_period:
        billingType === "One Time"
          ? 0
          : gracePeriod !== ""
          ? parseFloat(gracePeriod)
          : 0,
      first_retry:
        billingType === "One Time"
          ? 0
          : secondChargeAttempt !== ""
          ? parseFloat(secondChargeAttempt)
          : 0,
      second_retry:
        billingType === "One Time"
          ? 0
          : thirdChargeAttempt !== ""
          ? parseFloat(thirdChargeAttempt)
          : 0,
      staking_allowed: false,
      staking_details: {},
    };

    let objone = {
      email: userDetails.user.email,
      token: userDetails.idToken,
      product_code: serviceCodeInput,
      product_name: serviceNameInput,
      product_icon: coverImageS3url,
      revenue_account: userDetails.user.email,
      client_app: "TaxChains",
      product_category_code: "CoE",
      sub_category_code: "",
      custom_product_label: productLabel,
      points_creation: false,
      sub_text: serviceTagline,
      full_description: serviceDescription,
      first_purchase: {
        price: firstMonthPrice !== "" ? parseFloat(firstMonthPrice) : 0,
        coin: selectedCurrency.coinSymbol,
      },
      billing_cycle: {
        lifetime: {
          price:
            billingType === "One Time"
              ? firstMonthPrice !== ""
                ? parseFloat(firstMonthPrice)
                : 0
              : monthlyPrice !== ""
              ? parseFloat(monthlyPrice)
              : 0,
          coin: selectedCurrency.coinSymbol,
        },
      },
      grace_period:
        billingType === "One Time"
          ? 0
          : gracePeriod !== ""
          ? parseFloat(gracePeriod)
          : 0,
      first_retry:
        billingType === "One Time"
          ? 0
          : secondChargeAttempt !== ""
          ? parseFloat(secondChargeAttempt)
          : 0,
      second_retry:
        billingType === "One Time"
          ? 0
          : thirdChargeAttempt !== ""
          ? parseFloat(thirdChargeAttempt)
          : 0,
      staking_allowed: false,
      staking_details: {},
    };

    let obj = billingType === "One Time" ? objone : objmonthly;
    CreatePopularService(obj)
      .then((res) => {
        let result = res.data;
        if (result.status) {
          setpstep(7);
          setbillingType("");
          setselectNew("");
          setselectCategory("");
          setcategoriesData([]);
          setSearch("");
          setSelectedCurrency({});
          setServiceNameInput("");
          setServiceCodeInput("");
          setProductLabel("");
          setServiceTagline("");
          setServiceDescription("");
          setfirstMonthPrice("");
          setmonthlyPrice("");
          setgracePeriod("");
          setsecondChargeAttempt("");
          setthirdChargeAttempt("");
          setfirstMonthPrice("");
          setmonthlyPrice("");
          setgracePeriod("");
          setsecondChargeAttempt("");
          setthirdChargeAttempt("");
          setIsSubmit(false);
          setCoverImageS3url("");
          setImage(null);
        }
      })
      .catch((err) => {
        setIsSubmit(false);
      });
  };

  useEffect(() => {
    resetpop();
    // console.log(
    //   accsideNav == "My Services" && servicesMenu == "Services",
    //   "uyuyuy"
    // );
    if (accsideNav == "CRM" && crmMenu == "Followers") {
      handleFollowerPerAccountants();
    } else if (accsideNav == "CRM" && crmMenu == "Purchases") {
      handleAllCustomerLicenses();
    } else if (accsideNav == "My Services" && servicesMenu == "Services") {
      const userDetails = JSON.parse(localStorage.getItem("user"));
      // console.log(userDetails, "kkk");
      handleServicesForLogged(userDetails.user.email);
    }
  }, [crmMenu, servicesMenu, accsideNav]);

  const myTimeout = () => {
    setTimeout(reload, 3000);
  };

  function reload() {
    setServiceActionEnabled(false);
    setServiceActionStep(1);
    setSelectedService("");
    setUpdatedIcon("");
    handleServicesForLogged(userDetails?.user?.email);
  }

  const deleteService = () => {
    setIsloading(true);
    let obj = {
      email: userDetails?.user?.email,
      token: userDetails?.idToken,
      product_id: selectedService?.product_id,
    };
    DeleteServiceFunction(obj).then((response) => {
      let result = response?.data;
      if (result?.status) {
        setIsloading(false);
        setServiceActionStep(3);
        myTimeout();
      } else {
        setIsloading(false);
      }
    });
  };

  const changeServiceIcon = () => {
    setIsloading(true);
    let obj = {
      email: userDetails?.user?.email,
      token: userDetails?.idToken,
      field_name: "product_icon",
      field_value: updatedIcon,
      product_id: selectedService?.product_id,
    };
    axios
      .post(`https://comms.globalxchange.io/gxb/product/edit`, obj)
      .then((response) => {
        let result = response?.data;
        console.log(result, "changeServiceIcon result");
        if (result?.status) {
          setIsloading(false);
          setServiceActionStep(6);
          myTimeout();
        } else {
          setIsloading(false);
        }
      })
      .catch((error) => {
        console.log(error, "error in changeServiceIcon");
      });
  };

  const getAppsforUser = () => {
    setIsfetching(true);
    axios
      .get("https://comms.globalxchange.io/gxb/apps/get")
      .then((response) => {
        let result = response?.data?.apps;
        // console.log(result, 'getAppsforUser result');
        setUserCreatedApps(result);
        setIsfetching(false);
      })
      .catch((error) => {
        console.log(error, "getAppsforUser error");
      });
  };

  const myTimeout1 = () => {
    setTimeout(reload1, 3000);
  };

  function reload1() {
    setAddCompPlan(false);
    setAddCompPlanStep("step1");
    setUserCreatedApps([]);
    setCompPlanApp("");
    setLevels();
    setInputValues([]);
    setMultiplier([]);
    getWithCompPlan();
    setservicesMenu("With CompPlan");
  }

  const addComplan = () => {
    setAddingComp(true);

    let fixedPayouts = inputValues.map((e, i) => {
      return {
        level: i,
        percentage: e,
      };
    });
    // console.log(fixedPayouts, 'fixedPayouts');

    let numValues = multiplier.map((e, i) => {
      return {
        level: i,
        numerator: e,
      };
    });
    // console.log(numValues, 'numValues');

    let obj = {
      email: userDetails?.user?.email,
      token: userDetails?.idToken,
      app_code: compPlanApp,
      product_id: selectedService?.product_id,
      comp_plan_id: "comp4",
      fixed_payouts: fixedPayouts,
      numeratorValues: numValues,
    };
    // console.log(obj, 'object');

    addCompPlanFunction(obj).then((response) => {
      let result = response?.data;
      console.log(result);
      if (result?.status) {
        setAddingComp(false);
        setAddCompPlanStep("step6");
        myTimeout1();
      } else {
        setAddingComp(false);
      }
    });
  };

  const styles = {
    opacity: "0.25",
    pointerEvents: "none",
  };
  const applyStyle = (condition) => (condition ? {} : styles);

  function spreadFunc(value) {
    if (value.length > 0) {
      const result = value.reduce((acc, val) => acc && val);
      // console.log(result, 'resultttt');
      return result;
    }
  }

  const handleLevelChange = (event) => {
    const newLevel = parseInt(event.target.value);
    if (newLevel >= 1) {
      setLevels(newLevel);
      setInputValues(Array(newLevel).fill(""));
      setMultiplier(Array(newLevel).fill(""));
    }
  };

  const handleInputChange = (index, event, funcValue, func) => {
    const newInputValues = [...funcValue];
    newInputValues[index] = event.target.value;
    // console.log(newInputValues, 'newInputValues');
    func(newInputValues);
  };

  const renderLevelInputs = (funcValue, func) => {
    return funcValue.map((value, index) => (
      <div className="each-action1" key={index}>
        <div className="partition">
          <div>{index}</div>
          <input
            type="number"
            value={value}
            onChange={(event) =>
              handleInputChange(index, event, funcValue, func)
            }
            placeholder="0.00%"
          />
        </div>
      </div>
    ));
  };

  const getWithCompPlan = () => {
    setGettingData(true);
    let obj = {
      product_creator: userDetails?.user?.email,
    };
    axios
      .post(
        `https://comms.globalxchange.io/gxb/product/price/with/fees/get`,
        obj
      )
      .then((response) => {
        let result = response?.data?.products;
        setWithCompPlanData(result);
        setGettingData(false);
      })
      .catch((error) => {
        console.log(error, "error in getWithCompPlan");
      });
  };

  useEffect(() => {
    getWithCompPlan();
  }, []);

  useEffect(() => {
    let email = userDetails?.user?.email;
    axios
      .get(`https://careers.marketsverse.com/steps/get?email=${email}`)
      .then((response) => {
        let result = response?.data?.data;
        // console.log(result, "all steps fetched");
        setAllSteps(result);
      })
      .catch((error) => {
        console.log(error, "error in fetching all steps");
      });
  }, []);

  const pathSubmission = () => {
    // console.log(pathSteps, "api body");
    setCreatingPath(true);
    axios
      .post(`https://careers.marketsverse.com/paths/add`, {
        ...pathSteps,
        performance: gradeAvg,
        curriculum: curriculum,
        grade: grade,
        stream: stream,
        financialSituation: finance,
      })
      .then((response) => {
        let result = response?.data;
        console.log(result, "pathSubmission result");
        if (result?.status) {
          setCreatingPath(false);
          window.location.reload();
        } else {
          setCreatingPath(false);
        }
      })
      .catch((error) => {
        console.log(error, "error in pathSubmission");
      });
  };

  const removeStep = (stepId) => {
    const updatedStepIds = pathSteps?.step_ids?.filter((id) => id !== stepId);
    setPathSteps({
      ...pathSteps,
      step_ids: updatedStepIds,
    });
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="dashboard-main">
        <div className="dashboard-body">
          <div onClick={() => setShowDrop(false)}>
            <AccDashsidebar />
          </div>
          <div className="dashboard-screens" onClick={() => resetpop()}>
            <div style={{ height: "100%" }}>
              {accsideNav === "CRM" ? (
                <>
                  <div className="dash-nav">
                    <div
                      className="search-input-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <input
                        className="search-input"
                        type="text"
                        placeholder={
                          crmMenu === "Followers"
                            ? "Search Followers.."
                            : crmMenu === "Purchases"
                            ? "Search Purchases.."
                            : "Search For CRM..."
                        }
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
                  <div className="crm-main" onClick={() => setShowDrop(false)}>
                    <div
                      className="crm-all-menu"
                      style={{ padding: "12px 35px" }}
                    >
                      <div
                        className="crm-each-menu"
                        style={{
                          display: crmMenu === "Followers" ? "" : "none",
                          background:
                            crmMenu === "Followers"
                              ? "rgba(241, 241, 241, 0.5)"
                              : "",
                          fontWeight: crmMenu === "Followers" ? "700" : "",
                          marginLeft: "0",
                        }}
                        onClick={() => {
                          setcrmMenu("Followers");
                          setSearch("");
                        }}
                      >
                        Followers (<span>{followCount}</span>)
                      </div>
                      <div
                        className="crm-each-menu"
                        style={{
                          display: crmMenu !== "Followers" ? "" : "none",
                        }}
                        onClick={() => {
                          setcrmMenu("Followers");
                          setSearch("");
                        }}
                      >
                        Followers
                      </div>
                      <div
                        className="crm-each-menu"
                        style={{
                          display: crmMenu === "Purchases" ? "" : "none",
                          background:
                            crmMenu === "Purchases"
                              ? "rgba(241, 241, 241, 0.5)"
                              : "",
                          fontWeight: crmMenu === "Purchases" ? "700" : "",
                        }}
                        onClick={() => {
                          setcrmMenu("Purchases");
                          setSearch("");
                        }}
                      >
                        Purchases (<span>{purchaseData.length}</span>)
                      </div>
                      <div
                        className="crm-each-menu"
                        style={{
                          display: crmMenu !== "Purchases" ? "" : "none",
                        }}
                        onClick={() => {
                          setcrmMenu("Purchases");
                          setSearch("");
                        }}
                      >
                        Purchases
                      </div>
                      <div
                        className="crm-each-menu"
                        style={{
                          background:
                            crmMenu === "Clients"
                              ? "rgba(241, 241, 241, 0.5)"
                              : "",
                          fontWeight: crmMenu === "Clients" ? "700" : "",
                        }}
                        onClick={() => {
                          setcrmMenu("Clients");
                          setSearch("");
                        }}
                      >
                        Clients
                      </div>
                      <div
                        className="crm-each-menu"
                        style={{
                          background:
                            crmMenu === "Previous Clients"
                              ? "rgba(241, 241, 241, 0.5)"
                              : "",
                          fontWeight:
                            crmMenu === "Previous Clients" ? "700" : "",
                        }}
                        onClick={() => {
                          setcrmMenu("Previous Clients");
                          setSearch("");
                        }}
                      >
                        Previous Clients
                      </div>
                      <div
                        className="crm-each-menu"
                        style={{
                          background:
                            crmMenu === "Affiliates"
                              ? "rgba(241, 241, 241, 0.5)"
                              : "",
                          fontWeight: crmMenu === "Affiliates" ? "700" : "",
                        }}
                        onClick={() => {
                          setcrmMenu("Affiliates");
                          setSearch("");
                        }}
                      >
                        Affiliates
                      </div>
                    </div>
                    <div className="crm-all-box">
                      {crmMenu === "Followers" ? (
                        <>
                          <div
                            className="crm-follow-tab"
                            style={{ padding: "10px 35px" }}
                          >
                            <div className="crm-follow-col1">Name</div>
                            <div className="crm-follow-col2">
                              Following Since
                            </div>
                          </div>
                          <>
                            {followData.length > 0 && !isLoading ? (
                              <div className="follow-data-main">
                                {followData
                                  .filter((element) => {
                                    return element.userEmail
                                      .toLowerCase()
                                      .startsWith(search.toLowerCase());
                                  })
                                  .map((each, i) => (
                                    <div
                                      className="follower-box"
                                      style={{
                                        background:
                                          selectedFollower === each
                                            ? "rgba(241, 241, 241, 0.5)"
                                            : "",
                                        padding: "22px 35px",
                                        width: "100%",
                                      }}
                                      onClick={() => setSelectedFollower(each)}
                                    >
                                      <div className="follower-details">
                                        <div>
                                          <img
                                            className="user-icon"
                                            src={each.profile_img}
                                            alt=""
                                          />
                                        </div>
                                        <div>
                                          <div className="follower-mail">
                                            {each.username}
                                          </div>
                                          <div
                                            className="follower-name"
                                            style={{
                                              textTransform: "lowercase",
                                            }}
                                          >
                                            {each.userEmail}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="follow-time">
                                        {formatDate(each.timeStamp)}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            ) : isLoading ? (
                              <div className="follow-data-main">
                                {[1, 2, 3, 4, 5, 6].map((each, i) => (
                                  <div className="follower-box">
                                    <div className="follower-details">
                                      <div>
                                        <Skeleton className="user-icon" />
                                      </div>
                                      <Skeleton
                                        className="follower-mail"
                                        style={{ width: "200px" }}
                                      />
                                    </div>
                                    <Skeleton
                                      className="follow-time"
                                      style={{ width: "150px" }}
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        </>
                      ) : crmMenu === "Purchases" ? (
                        <>
                          <div className="crm-purchase-tab">
                            <div className="crm-purchase-col1">Client</div>
                            <div className="crm-purchase-col2">Service</div>
                            <div className="crm-purchase-col3">Receipt</div>
                            <div className="crm-purchase-col4">Status</div>
                          </div>
                          <div className="purchase-alldata">
                            {!isPurchaseLoading && purchaseData.length > 0 ? (
                              <>
                                {purchaseData
                                  .filter(
                                    (item) =>
                                      item.name
                                        .toLowerCase()
                                        .startsWith(search.toLowerCase()) ||
                                      item.email
                                        .toLowerCase()
                                        .startsWith(search.toLowerCase()) ||
                                      item.product_name
                                        .toLowerCase()
                                        .startsWith(search.toLowerCase()) ||
                                      item.license_code
                                        .toLowerCase()
                                        .startsWith(search.toLowerCase()) ||
                                      item.license_id
                                        .toLowerCase()
                                        .startsWith(search.toLowerCase()) ||
                                      item.license_status
                                        .toLowerCase()
                                        .startsWith(search.toLowerCase())
                                  )
                                  .map((each, i) => (
                                    <div className="each-purchase">
                                      <div className="each-purchase-clients">
                                        <div className="each-purchase-head">
                                          {each.name}
                                        </div>
                                        <div className="each-purchase-text">
                                          {each.email}
                                        </div>
                                      </div>
                                      <div className="each-purchase-services">
                                        <div className="each-product-iconbox">
                                          <img
                                            className="each-product-icon"
                                            src={each.product_icon}
                                            alt=""
                                          />
                                        </div>
                                        <div className="each-purchase-data">
                                          <div className="each-purchase-head">
                                            {each.product_name}
                                          </div>
                                          <div className="each-purchase-text">
                                            {each.product_id}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="each-purchase-receipt">
                                        <div className="each-purchase-head">
                                          {each.license_id}
                                        </div>
                                        <div className="each-purchase-text">
                                          {each.license_code}
                                        </div>
                                      </div>
                                      <div className="each-purchase-status">
                                        <div className="each-purchase-statustext">
                                          {each.license_status}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </>
                            ) : isPurchaseLoading ? (
                              <>
                                {[1, 2, 3, 4, 5, 6].map((each) => (
                                  <div className="each-purchase">
                                    <div className="each-purchase-clients">
                                      <Skeleton
                                        className="each-purchase-head"
                                        style={{ width: "150px" }}
                                      />
                                      <Skeleton
                                        className="each-purchase-text"
                                        style={{ width: "150px" }}
                                      />
                                    </div>
                                    <div
                                      className="each-purchase-services"
                                      style={{ display: "flex" }}
                                    >
                                      <div className="each-product-iconbox">
                                        <Skeleton className="each-product-icon" />
                                      </div>
                                      <div className="each-purchase-data">
                                        <Skeleton
                                          className="each-purchase-head"
                                          style={{ width: "150px" }}
                                        />
                                        <Skeleton
                                          className="each-purchase-text"
                                          style={{ width: "150px" }}
                                        />
                                      </div>
                                    </div>
                                    <div className="each-purchase-receipt">
                                      <Skeleton
                                        className="each-purchase-head"
                                        style={{ width: "150px" }}
                                      />
                                      <Skeleton
                                        className="each-purchase-text"
                                        style={{ width: "150px" }}
                                      />
                                    </div>
                                    <div className="each-purchase-status">
                                      <Skeleton
                                        className="each-purchase-statustext"
                                        style={{ width: "150px" }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </>
                      ) : crmMenu === "Clients" ? (
                        <div className="crm-tab">
                          <div className="crm-each-col">Name</div>
                          <div className="crm-each-col">Contact</div>
                          <div className="crm-each-col">Product</div>
                          <div className="crm-each-col">
                            Total&nbsp;Earnings
                          </div>
                          <div className="crm-each-col">Actions</div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </>
              ) : accsideNav === "My Services" ? (
                <>
                  <div className="dash-nav">
                    <div
                      className="search-input-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <input
                        className="search-input"
                        type="text"
                        placeholder="Search Services.."
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
                    className="services-main"
                    onClick={() => setShowDrop(false)}
                  >
                    <div
                      className="services-all-menu"
                      style={{ borderBottom: "0.5px solid #E5E5E5" }}
                    >
                      <div
                        className="services-each-menu"
                        style={{
                          display: servicesMenu === "Services" ? "" : "none",
                          background:
                            servicesMenu === "Services"
                              ? "rgba(241, 241, 241, 0.5)"
                              : "",
                          fontWeight: servicesMenu === "Services" ? "700" : "",
                        }}
                        onClick={() => {
                          setservicesMenu("Services");
                          setSearch("");
                        }}
                      >
                        Services (<span>{servicesAcc.length}</span>)
                      </div>
                      <div
                        className="services-each-menu"
                        style={{
                          display: servicesMenu !== "Services" ? "" : "none",
                        }}
                        onClick={() => {
                          setservicesMenu("Services");
                          setSearch("");
                        }}
                      >
                        Services
                      </div>
                      <div
                        className="services-each-menu"
                        style={{
                          background:
                            servicesMenu === "With CompPlan"
                              ? "rgba(241, 241, 241, 0.5)"
                              : "",
                          fontWeight:
                            servicesMenu === "With CompPlan" ? "700" : "",
                        }}
                        onClick={() => {
                          setservicesMenu("With CompPlan");
                          setSearch("");
                        }}
                      >
                        With CompPlan
                      </div>
                    </div>
                    <div>
                      <>
                        {servicesMenu === "Services" ? (
                          <div className="service-body">
                            <div className="service-body-left">
                              <>
                                {isServicesAcc ? (
                                  <>
                                    {[1, 2, 3, 4, 5].map((each, i) => (
                                      <div className="each-service-map" key={i}>
                                        <div className="dot-box">
                                          <img
                                            className="dot-icon"
                                            src={threedot}
                                            alt=""
                                          />
                                        </div>
                                        <div>
                                          <Skeleton
                                            className="each-service-img"
                                            style={{ marginBottom: "10px" }}
                                          />
                                        </div>
                                        <Skeleton
                                          className="serv-price"
                                          style={{
                                            width: "100px",
                                            marginBottom: "10px",
                                          }}
                                        />
                                        <Skeleton
                                          className="serv-subtext"
                                          style={{
                                            width: "200px",
                                            height: "50px",
                                          }}
                                        />
                                        <div>
                                          <Skeleton
                                            className="serv-price"
                                            style={{ width: "100px" }}
                                          />
                                        </div>

                                        {/* {`${(allCurrencies.filter((item) => item?.coinSymbol === each?.billingType[`${Object.keys(each?.billingType)[0]}`].coin))[0]}`} */}
                                      </div>
                                    ))}
                                  </>
                                ) : servicesAcc.length > 0 ? (
                                  <>
                                    {servicesAcc
                                      .filter((item) =>
                                        item.product_name
                                          .toLowerCase()
                                          .startsWith(search.toLowerCase())
                                      )
                                      .map((each, i) => (
                                        <div
                                          className="each-service-map"
                                          key={i}
                                        >
                                          <div
                                            className="dot-box"
                                            onClick={() => {
                                              setServiceActionEnabled(true);
                                              setSelectedService(each);
                                            }}
                                          >
                                            <img
                                              className="dot-icon"
                                              src={threedot}
                                              alt=""
                                            />
                                          </div>
                                          <div>
                                            <img
                                              className="each-service-img"
                                              src={each.product_icon}
                                              alt=""
                                            />
                                          </div>
                                          <div className="serv-title">
                                            {each.product_name}
                                          </div>
                                          <div className="serv-subtext">
                                            {each.sub_text}
                                          </div>
                                          <div>
                                            {each.billing_cycle !== undefined &&
                                            each.billing_cycle !== null &&
                                            Object.keys(
                                              each.billing_cycle
                                            )[0] === "monthly" ? (
                                              <div className="serv-price">
                                                {
                                                  allCurrencies?.filter(
                                                    (item) =>
                                                      item?.coinSymbol ===
                                                      each?.billing_cycle
                                                        ?.monthly?.coin
                                                  )[0]?.symbol
                                                }{" "}
                                                {
                                                  each.billing_cycle.monthly
                                                    .price
                                                }{" "}
                                                /{" "}
                                                <span
                                                  style={{ fontWeight: "300" }}
                                                >
                                                  Monthly
                                                </span>
                                              </div>
                                            ) : each.billing_cycle !==
                                                undefined &&
                                              each.billing_cycle !== null &&
                                              Object.keys(
                                                each.billing_cycle
                                              )[0] === "lifetime" ? (
                                              <div className="serv-price">
                                                {
                                                  allCurrencies?.filter(
                                                    (item) =>
                                                      item?.coinSymbol ===
                                                      each?.billing_cycle
                                                        ?.lifetime?.coin
                                                  )[0]?.symbol
                                                }{" "}
                                                {
                                                  each?.billing_cycle?.lifetime
                                                    ?.price
                                                }{" "}
                                                /{" "}
                                                <span
                                                  style={{ fontWeight: "300" }}
                                                >
                                                  Lifetime
                                                </span>
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                          </div>

                                          {/* {`${(allCurrencies.filter((item) => item?.coinSymbol === each?.billingType[`${Object.keys(each?.billingType)[0]}`].coin))[0]}`} */}
                                        </div>
                                      ))}
                                  </>
                                ) : (
                                  ""
                                )}
                              </>
                            </div>
                            {/* <div className="service-body-right">
                          <div className="service-box1">
                          <div className="service-right-title">Country</div>
                          <div className="service-right-btn">See All</div>
                          </div>
                          <div className="service-box1">
                          <div className="service-right-title">Country</div>
                          <div className="service-right-btn">See All</div>
                          </div>
                          <div className="service-box1">
                          <div className="service-right-title">Country</div>
                          <div className="service-right-btn">See All</div>
                          </div>
                        </div> */}
                          </div>
                        ) : (
                          <div className="service-body">
                            <div className="service-body-left">
                              {gettingData ? (
                                <>
                                  {[1, 2, 3, 4, 5].map((each, i) => (
                                    <div className="each-service-map" key={i}>
                                      <div className="dot-box">
                                        <img
                                          className="dot-icon"
                                          src={threedot}
                                          alt=""
                                        />
                                      </div>
                                      <div>
                                        <Skeleton
                                          className="each-service-img"
                                          style={{ marginBottom: "10px" }}
                                        />
                                      </div>
                                      <Skeleton
                                        className="serv-price"
                                        style={{
                                          width: "100px",
                                          marginBottom: "10px",
                                        }}
                                      />
                                      <Skeleton
                                        className="serv-subtext"
                                        style={{
                                          width: "200px",
                                          height: "50px",
                                        }}
                                      />
                                      <div>
                                        <Skeleton
                                          className="serv-price"
                                          style={{ width: "100px" }}
                                        />
                                      </div>

                                      {/* {`${(allCurrencies.filter((item) => item?.coinSymbol === each?.billingType[`${Object.keys(each?.billingType)[0]}`].coin))[0]}`} */}
                                    </div>
                                  ))}
                                </>
                              ) : withCompPlanData.length > 0 ? (
                                <>
                                  {withCompPlanData
                                    ?.filter((item) =>
                                      item?.product?.product_name
                                        ?.toLowerCase()
                                        ?.startsWith(search?.toLowerCase())
                                    )
                                    ?.map((each, i) => (
                                      <div
                                        className="each-service-map"
                                        key={i}
                                        style={{ height: "250px" }}
                                      >
                                        <div
                                          className="dot-box"
                                          // onClick={() => {
                                          //   setServiceActionEnabled(true);
                                          //   setSelectedService(each?.product);
                                          // }}
                                        >
                                          <img
                                            className="dot-icon"
                                            src={threedot}
                                            alt=""
                                          />
                                        </div>
                                        <div>
                                          <img
                                            className="each-service-img"
                                            src={each?.product?.product_icon}
                                            alt=""
                                          />
                                        </div>
                                        <div className="serv-title">
                                          {each?.product?.product_name}
                                        </div>
                                        <div className="serv-subtext">
                                          {each?.product?.sub_text}
                                        </div>
                                        <div>
                                          {each?.product?.billing_cycle !==
                                            undefined &&
                                          each?.product?.billing_cycle !==
                                            null &&
                                          Object.keys(
                                            each?.product?.billing_cycle
                                          )[0] === "monthly" ? (
                                            <div className="serv-price">
                                              {
                                                allCurrencies?.filter(
                                                  (item) =>
                                                    item?.coinSymbol ===
                                                    each?.product?.billing_cycle
                                                      ?.monthly.coin
                                                )[0].symbol
                                              }{" "}
                                              {
                                                each?.product?.billing_cycle
                                                  ?.monthly?.price
                                              }{" "}
                                              /{" "}
                                              <span
                                                style={{ fontWeight: "300" }}
                                              >
                                                Monthly
                                              </span>
                                            </div>
                                          ) : each?.product?.billing_cycle !==
                                              undefined &&
                                            each?.product?.billing_cycle !==
                                              null &&
                                            Object.keys(
                                              each?.product?.billing_cycle
                                            )[0] === "lifetime" ? (
                                            <div className="serv-price">
                                              {
                                                allCurrencies?.filter(
                                                  (item) =>
                                                    item?.coinSymbol ===
                                                    each?.product?.billing_cycle
                                                      ?.lifetime.coin
                                                )[0].symbol
                                              }{" "}
                                              {
                                                each?.product?.billing_cycle
                                                  ?.lifetime.price
                                              }{" "}
                                              /{" "}
                                              <span
                                                style={{ fontWeight: "300" }}
                                              >
                                                Lifetime
                                              </span>
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </div>

                                        {/* {`${(allCurrencies.filter((item) => item?.coinSymbol === each?.billingType[`${Object.keys(each?.billingType)[0]}`].coin))[0]}`} */}
                                      </div>
                                    ))}
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    </div>
                  </div>
                </>
              ) : accsideNav === "Calendar" ? (
                <>
                  <div className="dash-nav">
                    <div
                      className="search-input-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <input
                        className="search-input"
                        type="text"
                        placeholder="Search Services.."
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
                    className="services-main"
                    onClick={() => setShowDrop(false)}
                  >
                    <EarningCalendar />
                  </div>
                </>
              ) : accsideNav === "Wallet" ? (
                <>
                  <div className="dash-nav">
                    <div
                      className="search-input-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <input
                        className="search-input"
                        type="text"
                        placeholder="Search Wallet..."
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
                    <Vaults searchedValue={search} />
                  </div>
                </>
              ) : accsideNav === "Tasks" ? (
                <>
                  <div className="dash-nav">
                    <div
                      className="search-input-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <input
                        className="search-input"
                        type="text"
                        placeholder="Search ..."
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
                    className="services-main"
                    style={{ height: "calc(100% - 70px)" }}
                    onClick={() => setShowDrop(false)}
                  >
                    <Tasks />
                  </div>
                </>
              ) : accsideNav === "Paths" ? (
                <>
                  <div className="dash-nav">
                    <div
                      className="search-input-box"
                      onClick={() => setShowDrop(false)}
                    >
                      <input
                        className="search-input"
                        type="text"
                        placeholder={
                          mypathsMenu === "Paths"
                            ? "Search For Paths..."
                            : "Search For Steps..."
                        }
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
                    className="services-main"
                    style={{ height: "calc(100% - 70px)" }}
                    onClick={() => setShowDrop(false)}
                  >
                    <MyPaths search={search} />
                  </div>
                </>
              ) : (
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
                        value={search}
                        // onChange={(e) => setSearch(e.target.value)}
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
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "600",
                        fontSize: "1.5rem",
                      }}
                    >
                      Coming Soon
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <>
        {ispopular ? (
          <div
            className="acc-popular"
            onClick={() => setShowDrop(false)}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="acc-popular-top">
              <div className="acc-popular-head">
                {pstep === 8
                  ? "New Path"
                  : pstep > 1 && pstep < 8
                  ? "New Service"
                  : "Popular Actions"}
              </div>
              <div
                className="acc-popular-img-box"
                onClick={() => resetpop()}
                style={{ cursor: "pointer" }}
              >
                <img className="acc-popular-img" src={closepop} alt="" />
              </div>
            </div>
            <>
              {pstep === 1 ? (
                <div>
                  <div className="acc-step-text">New</div>
                  <div>
                    <div
                      className="acc-step-box"
                      onClick={() => {
                        setselectNew("Service");
                        setpstep(2);
                      }}
                      style={{
                        background: selectNew === "Service" ? "#182542" : "",
                        color: selectNew === "Service" ? "#FFF" : "",
                      }}
                    >
                      Service
                    </div>

                    <div
                      className="acc-step-box"
                      onClick={() => {
                        setselectNew("Path");
                        setpstep(8);
                      }}
                      style={{
                        background: selectNew === "Path" ? "#182542" : "",
                        color: selectNew === "Path" ? "#FFF" : "",
                      }}
                    >
                      Path
                    </div>

                    <div
                      className="acc-step-box"
                      onClick={() => {
                        setselectNew("Step");
                        setpstep(9);
                      }}
                      style={{
                        background: selectNew === "Step" ? "#182542" : "",
                        color: selectNew === "Step" ? "#FFF" : "",
                      }}
                    >
                      Step
                    </div>
                    {/* <div
                      className="acc-step-box"
                      onClick={() => {
                        setselectNew("Task");
                        setpstep(2);
                      }}
                      style={{
                        background: selectNew === "Task" ? "#182542" : "",
                        color: selectNew === "Task" ? "#FFF" : "",
                      }}
                    >
                      Task
                    </div>
                    <div
                      className="acc-step-box"
                      onClick={() => {
                        setselectNew("Article");
                        setpstep(2);
                      }}
                      style={{
                        background: selectNew === "Article" ? "#182542" : "",
                        color: selectNew === "Article" ? "#FFF" : "",
                      }}
                    >
                      Article
                    </div>
                    <div
                      className="acc-step-box"
                      onClick={() => {
                        setselectNew("Video");
                        setpstep(2);
                      }}
                      style={{
                        background: selectNew === "Video" ? "#182542" : "",
                        color: selectNew === "Video" ? "#FFF" : "",
                      }}
                    >
                      Video
                    </div> */}
                  </div>
                </div>
              ) : pstep === 2 ? (
                <div>
                  <div className="acc-step-text">Select Billing Type</div>
                  <div>
                    <div
                      className="acc-step-box"
                      onClick={() => {
                        setbillingType("Monthly Subscription");
                        handleCategories();
                        setpstep(3);
                      }}
                      style={{
                        background:
                          billingType === "Monthly Subscription"
                            ? "#182542"
                            : "",
                        color:
                          billingType === "Monthly Subscription" ? "#FFF" : "",
                      }}
                    >
                      Monthly Subscription
                    </div>
                    <div
                      className="acc-step-box"
                      onClick={() => {
                        setbillingType("One Time");
                        handleCategories();
                        setpstep(3);
                      }}
                      style={{
                        background: billingType === "One Time" ? "#182542" : "",
                        color: billingType === "One Time" ? "#FFF" : "",
                      }}
                    >
                      One Time
                    </div>
                    <div
                      className="acc-step-box"
                      // onClick={() => {
                      //   setbillingType("Staking");
                      //   handleCategories();
                      //   setpstep(3);
                      // }}
                      style={{
                        opacity: "0.4",
                        cursor: "not-allowed",
                        background: billingType === "Staking" ? "#182542" : "",
                        color: billingType === "Staking" ? "#FFF" : "",
                      }}
                    >
                      Staking
                    </div>
                  </div>
                  <div
                    className="goBack"
                    onClick={() => {
                      setpstep(1);
                      setbillingType("");
                    }}
                  >
                    Go Back
                  </div>
                </div>
              ) : pstep === 3 ? (
                <div>
                  <div className="acc-step-text">
                    How would you categorize this product?
                  </div>
                  <>
                    {isCatoading ? (
                      <div className="acc-step-allbox">
                        {[1, 2, 3].map((each, i) => (
                          <div className="acc-step-box">
                            <Skeleton style={{ width: "150px" }} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="acc-step-allbox">
                        {categoriesData.map((each, i) => (
                          <div
                            className="acc-step-box"
                            onClick={() => {
                              setselectCategory(each.name);
                              setpstep(4);
                            }}
                            style={{
                              background:
                                selectCategory === each.name ? "#182542" : "",
                              color: selectCategory === each.name ? "#FFF" : "",
                            }}
                          >
                            {each.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                  <div
                    className="goBack"
                    onClick={() => {
                      setpstep(2);
                      setselectCategory("");
                    }}
                  >
                    Go Back
                  </div>
                </div>
              ) : pstep === 4 ? (
                <div>
                  <div className="acc-step-text">Service Information</div>
                  <div className="acc-step-allbox1">
                    <div className="acc-upload">
                      <div className="acc-upload-title">
                        Upload Profile Image
                      </div>
                      <div className="acc-upload-imgbox">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileInputChange}
                          style={{ display: "none" }}
                          ref={fileInputRef}
                        />
                        <img
                          className="acc-upload-img"
                          src={
                            isUploadLoading
                              ? upgif
                              : coverImageS3url !== ""
                              ? coverImageS3url
                              : uploadv
                          }
                          alt=""
                          onClick={handleImageClick}
                        />
                      </div>
                    </div>
                    <div className="acc-step-box">
                      <input
                        className="acc-step-input"
                        type="text"
                        placeholder="Service Name"
                        value={serviceNameInput}
                        onChange={(e) => setServiceNameInput(e.target.value)}
                      />
                    </div>
                    <div className="acc-step-box">
                      <input
                        className="acc-step-input"
                        type="text"
                        placeholder="Service Code"
                        value={serviceCodeInput}
                        onChange={(e) => setServiceCodeInput(e.target.value)}
                      />
                    </div>
                    <div className="acc-step-box">
                      <input
                        className="acc-step-input"
                        type="text"
                        placeholder="Product Label"
                        value={productLabel}
                        onChange={(e) => setProductLabel(e.target.value)}
                      />
                    </div>
                    <div className="acc-step-box">
                      <input
                        className="acc-step-input"
                        type="text"
                        placeholder="Service Tagline"
                        value={serviceTagline}
                        onChange={(e) => setServiceTagline(e.target.value)}
                      />
                    </div>
                    <div className="acc-step-box1">
                      <textarea
                        className="acc-step-input1"
                        type="text"
                        placeholder="Service Description"
                        value={serviceDescription}
                        onChange={(e) => setServiceDescription(e.target.value)}
                      />
                    </div>
                    <div>
                      <div
                        className="goNext"
                        onClick={() => {
                          handleGetCurrencies();
                          setpstep(5);
                        }}
                      >
                        Next Step
                      </div>
                      <div
                        className="goBack1"
                        onClick={() => {
                          setpstep(3);
                          setServiceNameInput("");
                          setServiceCodeInput("");
                          setProductLabel("");
                          setServiceTagline("");
                          setServiceDescription("");
                          setCoverImageS3url("");
                          setImage(null);
                        }}
                      >
                        Go Back
                      </div>
                    </div>
                  </div>
                </div>
              ) : pstep === 5 ? (
                <div>
                  <div className="acc-step-text">
                    What currency do you want to collect?
                  </div>
                  <>
                    {isCurrencies ? (
                      <div className="acc-step-allbox">
                        {[1, 2, 3].map((each, i) => (
                          <div className="acc-step-box">
                            <Skeleton style={{ width: "150px" }} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="acc-step-allbox">
                        {allCurrencies.map((each, i) => (
                          <div
                            className="acc-step-box"
                            onClick={() => {
                              setSelectedCurrency(each);
                              setpstep(6);
                            }}
                            style={{
                              background:
                                selectedCurrency === each ? "#182542" : "",
                              color: selectedCurrency === each ? "#FFF" : "",
                            }}
                          >
                            {each.coinName}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                  <div
                    className="goBack"
                    onClick={() => {
                      setpstep(4);
                      setSelectedCurrency({});
                    }}
                  >
                    Go Back
                  </div>
                </div>
              ) : pstep === 6 ? (
                <div>
                  <div className="acc-step-text">Pricing Information</div>
                  <div className="acc-step-allbox1">
                    <div className="acc-step-box">
                      <input
                        className="acc-step-input2"
                        type="number"
                        placeholder={
                          billingType === "One Time"
                            ? "Service Price"
                            : "First Months Price"
                        }
                        value={firstMonthPrice}
                        onChange={(e) => setfirstMonthPrice(e.target.value)}
                        onWheel={(e) => e.target.blur()}
                      />
                      <div className="acc-step-feildHead">
                        {selectedCurrency.coinSymbol}
                      </div>
                    </div>
                    <div
                      className="acc-step-box"
                      style={{
                        display: billingType === "One Time" ? "none" : "",
                      }}
                    >
                      <input
                        className="acc-step-input2"
                        type="number"
                        placeholder="Monthly Price"
                        value={monthlyPrice}
                        onChange={(e) => setmonthlyPrice(e.target.value)}
                        onWheel={(e) => e.target.blur()}
                      />
                      <div className="acc-step-feildHead">
                        {selectedCurrency.coinSymbol}
                      </div>
                    </div>
                    <div
                      className="acc-step-box"
                      style={{
                        display: billingType === "One Time" ? "none" : "",
                      }}
                    >
                      <input
                        className="acc-step-input2"
                        type="number"
                        placeholder="Grace Period"
                        value={gracePeriod}
                        onChange={(e) => setgracePeriod(e.target.value)}
                        onWheel={(e) => e.target.blur()}
                      />
                      <div className="acc-step-feildHead">Days</div>
                    </div>
                    <div
                      className="acc-step-box"
                      style={{
                        display: billingType === "One Time" ? "none" : "",
                      }}
                    >
                      <input
                        className="acc-step-input2"
                        type="number"
                        placeholder="Second Charge Attempt"
                        value={secondChargeAttempt}
                        onChange={(e) => setsecondChargeAttempt(e.target.value)}
                        onWheel={(e) => e.target.blur()}
                      />
                      <div className="acc-step-feildHead">Days</div>
                    </div>
                    <div
                      className="acc-step-box"
                      style={{
                        display: billingType === "One Time" ? "none" : "",
                      }}
                    >
                      <input
                        className="acc-step-input2"
                        type="number"
                        placeholder="Third Charge Attempt"
                        value={thirdChargeAttempt}
                        onChange={(e) => setthirdChargeAttempt(e.target.value)}
                        onWheel={(e) => e.target.blur()}
                      />
                      <div className="acc-step-feildHead">Days</div>
                    </div>
                    <div>
                      <div
                        style={{
                          position:
                            billingType === "One Time" ? "fixed" : "initial",
                          bottom: billingType === "One Time" ? "0px" : "",
                        }}
                      >
                        <div
                          className="goNext"
                          onClick={() => {
                            handleFinalSubmit();
                          }}
                        >
                          Submit
                        </div>
                        <div
                          className="goBack1"
                          onClick={() => {
                            setpstep(5);
                            setfirstMonthPrice("");
                            setmonthlyPrice("");
                            setgracePeriod("");
                            setsecondChargeAttempt("");
                            setthirdChargeAttempt("");
                          }}
                        >
                          Go Back
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {isSubmit ? (
                      <div className="popularlogo">
                        <img className="popularlogoimg" src={lg1} alt="" />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : pstep === 7 ? (
                <div className="success-box">
                  You Have Successfully Created A New Service
                </div>
              ) : pstep === 8 ? (
                <div className="acc-addpath">
                  <div className="each-acc-addpath-field">
                    <div className="each-acc-addpath-field-name">
                      What is the name of the path?
                    </div>
                    <div className="each-acc-addpath-field-input">
                      <input
                        type="text"
                        placeholder="Name.."
                        value={pathSteps?.nameOfPath}
                        onChange={(e) => {
                          setPathSteps((prev) => {
                            return {
                              ...prev,
                              nameOfPath: e.target.value,
                            };
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="each-acc-addpath-field">
                    <div className="each-acc-addpath-field-name">
                      How long will the path apx take?
                    </div>
                    <div className="each-acc-addpath-field-input">
                      <input
                        type="number"
                        placeholder="0"
                        style={{ width: "70%" }}
                        value={pathSteps?.length}
                        onChange={(e) => {
                          setPathSteps((prev) => {
                            return {
                              ...prev,
                              length: e.target.value,
                            };
                          });
                        }}
                      />
                      <div className="years-div">Years</div>
                    </div>
                  </div>

                  <div className="each-acc-addpath-field">
                    <div className="each-acc-addpath-field-name">
                      Describe the path
                    </div>
                    <div className="each-acc-addpath-field-input">
                      <textarea
                        placeholder="Enter description.."
                        value={pathSteps?.description}
                        onChange={(e) => {
                          setPathSteps((prev) => {
                            return {
                              ...prev,
                              description: e.target.value,
                            };
                          });
                        }}
                      ></textarea>
                    </div>
                  </div>

                  <div className="each-acc-addpath-field">
                    <div className="each-acc-addpath-field-name">
                      What type of path is it?
                    </div>
                    <div className="each-acc-addpath-field-flex">
                      <div
                        onClick={() => {
                          setPathSteps((prev) => {
                            return {
                              ...prev,
                              path_type: "education",
                            };
                          });
                        }}
                        style={{
                          background:
                            pathSteps?.path_type === "education"
                              ? "linear-gradient(90deg, #47b4d5 0.02%, #29449d 119.26%)"
                              : "",
                          color:
                            pathSteps?.path_type === "education" ? "white" : "",
                        }}
                      >
                        Education
                      </div>
                      <div
                        onClick={() => {
                          setPathSteps((prev) => {
                            return {
                              ...prev,
                              path_type: "career",
                            };
                          });
                        }}
                        style={{
                          background:
                            pathSteps?.path_type === "career"
                              ? "linear-gradient(90deg, #47b4d5 0.02%, #29449d 119.26%)"
                              : "",
                          color:
                            pathSteps?.path_type === "career" ? "white" : "",
                        }}
                      >
                        Career
                      </div>
                      <div
                        onClick={() => {
                          setPathSteps((prev) => {
                            return {
                              ...prev,
                              path_type: "immigration",
                            };
                          });
                        }}
                        style={{
                          background:
                            pathSteps?.path_type === "immigration"
                              ? "linear-gradient(90deg, #47b4d5 0.02%, #29449d 119.26%)"
                              : "",
                          color:
                            pathSteps?.path_type === "immigration"
                              ? "white"
                              : "",
                        }}
                      >
                        Immigration
                      </div>
                    </div>
                  </div>

                  <div className="each-acc-addpath-field">
                    <div className="each-acc-addpath-field-name">
                      What is the destination of the path?
                    </div>
                    <div className="each-acc-addpath-field-input">
                      <input
                        type="text"
                        placeholder="Name.."
                        value={pathSteps?.destination_institution}
                        onChange={(e) => {
                          setPathSteps((prev) => {
                            return {
                              ...prev,
                              destination_institution: e.target.value,
                            };
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="each-acc-addpath-field">
                    <div className="each-acc-addpath-field-name">Add steps</div>
                    <div
                      className="each-acc-addpath-field-input"
                      style={{ flexDirection: "column" }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setStepsToggle(!stepsToggle);
                        }}
                      >
                        <div
                          style={{
                            width: "85%",
                            cursor: "pointer",
                            padding: "1.5rem",
                            borderRadius: "15px",
                            opacity: "0.25",
                            fontSize: "1rem",
                            fontWeight: "500",
                          }}
                        >
                          Click To Select
                        </div>
                        <div className="arrow-box">
                          <img
                            src={arrow}
                            alt=""
                            style={{
                              transform: stepsToggle ? "rotate(180deg)" : "",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="hidden-steps"
                        style={{ display: stepsToggle ? "flex" : "none" }}
                      >
                        {allSteps?.map((e, i) => {
                          return (
                            <div
                              className="each-hidden-step"
                              key={i}
                              onClick={() => {
                                setPathSteps((prev) => {
                                  return {
                                    ...prev,
                                    step_ids:
                                      prev?.step_ids?.length > 0
                                        ? [...prev?.step_ids, e?._id]
                                        : [e?._id],
                                  };
                                });
                                setStepsToggle(false);
                              }}
                            >
                              <div className="stepp-textt">{e?.name}</div>
                              <div className="stepp-textt1">
                                {e?.description}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="selected-steps">
                    {allSteps?.map((e, i) => {
                      if (pathSteps?.step_ids?.includes(e?._id)) {
                        return (
                          <div className="each-selected-step" key={e?._id}>
                            <div className="stepp-textt">{e?.name}</div>
                            <div className="stepp-textt1">{e?.description}</div>
                            <div
                              className="trash-icon-div"
                              onClick={() => removeStep(e._id)}
                            >
                              <img src={trash} alt="" />
                            </div>
                          </div>
                        );
                      }
                      return null; // Add this line to prevent rendering if step is not included
                    })}
                  </div>

                  <div className="each-acc-addpath-field">
                    <div className="each-acc-addpath-field-name">
                      Select ideal grade for participant
                    </div>
                    <div className="optioncardWrapper">
                      {gradeList.map((item) => (
                        <div
                          className={
                            grade.includes(item)
                              ? "optionCardSmallSelected"
                              : "optionCardSmall"
                          }
                          onClick={(e) => handleGrade(item)}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="each-acc-addpath-field">
                    <div className="each-acc-addpath-field-name">
                      Select ideal grade point average for participant
                    </div>
                    <div className="optionCardFullWrapper">
                      {gradePointAvg.map((item) => (
                        <div
                          className={
                            gradeAvg.includes(item)
                              ? "optionCardFullSelected"
                              : "optionCardFull"
                          }
                          onClick={(e) => handleGradeAvg(item)}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="each-acc-addpath-field">
                    <div className="each-acc-addpath-field-name">
                      Select ideal curriculum for participant
                    </div>
                    <div className="optionCardFullWrapper">
                      {curriculumList.map((item) => (
                        <div
                          className={
                            curriculum.includes(item)
                              ? "optionCardFullSelected"
                              : "optionCardFull"
                          }
                          onClick={(e) => handleCurriculum(item)}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="each-acc-addpath-field">
                    <div className="each-acc-addpath-field-name">
                      Select ideal stream for participant
                    </div>
                    <div className="optionCardFullWrapper">
                      {streamList.map((item) => (
                        <div
                          className={
                            stream.includes(item)
                              ? "optionCardFullSelected"
                              : "optionCardFull"
                          }
                          onClick={(e) => handleStream(item)}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="each-acc-addpath-field">
                    <div className="each-acc-addpath-field-name">
                      Select ideal financial situation for participant
                    </div>
                    <div className="optionCardFullWrapper">
                      {financeList.map((item) => (
                        <div
                          className={
                            finance.includes(item)
                              ? "optionCardFullSelected"
                              : "optionCardFull"
                          }
                          onClick={(e) => handleFinance(item)}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="each-acc-addpath-field">
                    <div className="each-acc-addpath-field-name">
                      What program will they be studying?
                    </div>
                    <div className="each-acc-addpath-field-input">
                      <input
                        type="text"
                        placeholder="Name.."
                        value={pathSteps?.program}
                        onChange={(e) => {
                          setPathSteps((prev) => {
                            return {
                              ...prev,
                              program: e.target.value,
                            };
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="each-acc-addpath-field">
                    <div className="each-acc-addpath-field-name">
                      What city is the university in?
                    </div>
                    <div className="each-acc-addpath-field-input">
                      <input
                        type="text"
                        placeholder="City.."
                        value={pathSteps?.city}
                        onChange={(e) => {
                          setPathSteps((prev) => {
                            return {
                              ...prev,
                              city: e.target.value,
                            };
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="each-acc-addpath-field">
                    <div className="each-acc-addpath-field-name">
                      What country is the university in?
                    </div>
                    <div className="each-acc-addpath-field-input">
                      <input
                        type="text"
                        placeholder="Country.."
                        value={pathSteps?.country}
                        onChange={(e) => {
                          setPathSteps((prev) => {
                            return {
                              ...prev,
                              country: e.target.value,
                            };
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="each-acc-addpath-field">
                    <div
                      className="submit-path-btn"
                      style={{
                        opacity: creatingPath
                          ? "0.5"
                          : pathSteps?.nameOfPath &&
                            pathSteps?.description &&
                            pathSteps?.length &&
                            pathSteps?.path_type &&
                            pathSteps?.step_ids?.length > 0 &&
                            pathSteps?.destination_institution &&
                            pathSteps?.program &&
                            pathSteps?.city &&
                            pathSteps?.country &&
                            grade.length > 0 &&
                            gradeAvg.length > 0 &&
                            curriculum.length > 0 &&
                            stream.length > 0 &&
                            finance.length > 0
                          ? "1"
                          : "0.5",
                        cursor: creatingPath
                          ? "not-allowed"
                          : pathSteps?.nameOfPath &&
                            pathSteps?.description &&
                            pathSteps?.length &&
                            pathSteps?.path_type &&
                            pathSteps?.step_ids?.length > 0 &&
                            pathSteps?.destination_institution &&
                            pathSteps?.program &&
                            pathSteps?.city &&
                            pathSteps?.country &&
                            grade.length > 0 &&
                            gradeAvg.length > 0 &&
                            curriculum.length > 0 &&
                            stream.length > 0 &&
                            finance.length > 0
                          ? "pointer"
                          : "not-allowed",
                      }}
                      onClick={() => {
                        if (
                          pathSteps?.nameOfPath &&
                          pathSteps?.description &&
                          pathSteps?.length &&
                          pathSteps?.path_type &&
                          pathSteps?.step_ids?.length > 0 &&
                          pathSteps?.destination_institution &&
                          pathSteps?.program &&
                          pathSteps?.city &&
                          pathSteps?.country &&
                          grade.length > 0 &&
                          gradeAvg.length > 0 &&
                          curriculum.length > 0 &&
                          stream.length > 0 &&
                          finance.length > 0
                        ) {
                          pathSubmission();
                        }
                      }}
                    >
                      {creatingPath ? "Loading.." : "Submit Path"}
                    </div>
                    <div
                      className="go-back-btn"
                      onClick={() => {
                        setpstep(1);
                        setPathSteps({
                          nameOfPath: "",
                          description: "",
                          length: "",
                          path_type: "",
                          step_ids: [],
                          destination_institution: "",
                        });
                      }}
                    >
                      Go Back
                    </div>
                  </div>
                </div>
              ) : pstep === 9 ? (
                <NewStep1 setpstep={setpstep} />
              ) : (
                ""
              )}
            </>
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
            <div
              className="m-each"
              onClick={() => {
                setaccsideNav("");
                navigate("/dashboard/accountants/profile");
              }}
            >
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
            {/* <div className="m-each" style={{ opacity: "0.25" }}>
              <div className="m-left">
                <div className="m-left-icon-box">
                  <img className="m-left-icon" src={support} alt="" />
                </div>
                <div className="m-left-text">Support</div>
              </div>
              <div className="m-right-icon-box">
                <img className="m-right-icon" src={sidearrow} alt="" />
              </div>
            </div> */}
            {/* <div className="m-each" style={{ opacity: "0.25" }}>
              <div className="m-left">
                <div className="m-left-icon-box">
                  <img className="m-left-icon" src={settings} alt="" />
                </div>
                <div className="m-left-text">Settings</div>
              </div>
              <div className="m-right-icon-box">
                <img className="m-right-icon" src={sidearrow} alt="" />
              </div>
            </div> */}
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

      {serviceActionEnabled && (
        <div className="popularS">
          {serviceActionStep === 1 && (
            <>
              <div className="head-txt" style={{ height: "4rem" }}>
                <div>Service Actions</div>
                <div
                  onClick={() => {
                    setServiceActionEnabled(false);
                  }}
                  className="close-div"
                >
                  <img src={close} alt="" />
                </div>
              </div>

              <div
                className="overall-div"
                style={{ height: "calc(100% - 4rem)" }}
              >
                <div
                  className="each-action1"
                  onClick={() => {
                    setServiceActionStep(2);
                  }}
                >
                  Delete Service
                </div>
                <div
                  className="each-action1"
                  onClick={() => {
                    setServiceActionStep(4);
                  }}
                >
                  Edit Service
                </div>
                <div
                  className="each-action1"
                  onClick={() => {
                    setServiceActionEnabled(false);
                    setAddCompPlan(true);
                  }}
                >
                  Add CompPlan
                </div>
              </div>
            </>
          )}

          {serviceActionStep === 2 && (
            <>
              <div className="head-txt" style={{ height: "4rem" }}>
                <div>Service Actions</div>
                <div
                  onClick={() => {
                    setServiceActionEnabled(false);
                    setServiceActionStep(1);
                  }}
                  className="close-div"
                >
                  <img src={close} alt="" />
                </div>
              </div>
              <div
                className="overall-div"
                style={{ height: "calc(100% - 4rem)" }}
              >
                <div
                  className="each-action1"
                  onClick={() => {
                    deleteService();
                  }}
                >
                  Confirm And Delete
                </div>
                <div
                  className="each-action1"
                  onClick={() => {
                    setServiceActionStep(1);
                  }}
                >
                  Never Mind
                </div>
              </div>
              {isloading && (
                <div
                  className="loading-component"
                  style={{
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    display: "flex",
                  }}
                >
                  <LoadingAnimation1 icon={lg1} width={200} />
                </div>
              )}
            </>
          )}

          {serviceActionStep === 3 && (
            <div className="successMsg">
              You have successfully deleted {selectedService?.product_name}. You
              will be redirected to the updated services list.
            </div>
          )}

          {serviceActionStep === 4 && (
            <>
              <div className="head-txt" style={{ height: "4rem" }}>
                <div>Edit Service</div>
                <div
                  onClick={() => {
                    setServiceActionEnabled(false);
                    setServiceActionStep(1);
                  }}
                  className="close-div"
                >
                  <img src={close} alt="" />
                </div>
              </div>
              <div
                className="overall-div"
                style={{ height: "calc(100% - 8.5rem)" }}
              >
                <div className="subbTxt">What do you want to edit?</div>
                <div
                  className="each-action1"
                  onClick={() => {
                    setServiceActionStep(5);
                  }}
                >
                  Service Icon
                </div>
              </div>
              <div className="stepBtns" style={{ height: "4.5rem" }}>
                <div
                  style={{ background: "#1F304F" }}
                  onClick={() => {
                    setServiceActionStep(1);
                  }}
                >
                  Go Back
                </div>
              </div>
            </>
          )}

          {serviceActionStep === 5 && (
            <>
              <div className="head-txt">
                <div>Edit Service Icon</div>
                <div
                  onClick={() => {
                    setServiceActionEnabled(false);
                    setServiceActionStep(1);
                  }}
                  className="close-div"
                >
                  <img src={close} alt="" />
                </div>
              </div>

              <div
                className="overall-div"
                style={{ height: "calc(100% - 14rem)" }}
              >
                <div
                  className="each-action1"
                  style={{ border: "none", justifyContent: "center" }}
                >
                  <div style={{ height: "120px", width: "120px" }}>
                    <img
                      src={selectedService?.product_icon}
                      alt=""
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                </div>
                <div className="line-container">
                  <div className="linee"></div>
                  <div className="new-txt">New</div>
                  <div className="linee"></div>
                </div>
                <div
                  className="each-action1"
                  style={{ border: "none", justifyContent: "center" }}
                >
                  <ImageUploadDivProfilePic
                    setFunc={setUpdatedIcon}
                    funcValue={updatedIcon}
                  />
                </div>
              </div>

              <div
                className="stepBtns"
                style={{
                  height: "8rem",
                  gap: "1rem",
                  flexDirection: "column",
                  padding: "0",
                }}
              >
                <div
                  style={{
                    opacity: updatedIcon ? "1" : "0.25",
                    cursor: updatedIcon ? "pointer" : "not-allowed",
                    background: "#59A2DD",
                    height: "3.5rem",
                  }}
                  onClick={() => {
                    if (updatedIcon) {
                      changeServiceIcon();
                    }
                  }}
                >
                  Complete Update
                </div>
                <div
                  style={{
                    background: "#1F304F",
                    height: "3.5rem",
                  }}
                  onClick={() => {
                    setServiceActionStep(4);
                    setUpdatedIcon("");
                  }}
                >
                  Go Back
                </div>
              </div>

              {isloading && (
                <div
                  className="loading-component"
                  style={{
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    display: "flex",
                  }}
                >
                  <LoadingAnimation1 icon={lg1} width={200} />
                </div>
              )}
            </>
          )}

          {serviceActionStep === 6 && (
            <div className="successMsg">
              You have successfully updated the icon for{" "}
              {selectedService?.product_name}
            </div>
          )}

          {serviceActionStep === 7 && (
            <>
              <div className="head-txt"></div>
              <div></div>
            </>
          )}
        </div>
      )}

      {addCompPlan && (
        <div className="popularS">
          {addCompPlanStep === "step1" && (
            <>
              <div className="head-txt">
                <div>Add Comp Plan</div>
                <div
                  onClick={() => {
                    setAddCompPlan(false);
                  }}
                  className="close-div"
                >
                  <img src={close} alt="" />
                </div>
              </div>

              <div
                className="overall-div"
                style={{ height: "calc(100% - 9.5rem)" }}
              >
                <div
                  className="each-action1"
                  onClick={() => {
                    setAddCompPlanStep("step2");
                    getAppsforUser();
                  }}
                >
                  <div>Unilevel Standard</div>
                </div>

                <div
                  className="each-action1"
                  style={{ opacity: "0.5", cursor: "not-allowed" }}
                >
                  <div>Binary Standard</div>
                </div>
              </div>

              <div className="stepBtnss">
                <div
                  style={{ background: "#1F304F" }}
                  onClick={() => {
                    setServiceActionEnabled(true);
                    setAddCompPlan(false);
                  }}
                >
                  Go Back
                </div>
                <div
                  style={{
                    background: "#59A2DD",
                    opacity: "0.25",
                    cursor: "not-allowed",
                  }}
                >
                  Next Step
                </div>
              </div>
            </>
          )}

          {addCompPlanStep === "step2" && (
            <>
              <div className="head-txt">
                <div>Add Comp Plan</div>
                <div
                  onClick={() => {
                    setAddCompPlan(false);
                    setAddCompPlanStep("step1");
                  }}
                  className="close-div"
                >
                  <img src={close} alt="" />
                </div>
              </div>

              <div
                className="overall-div"
                style={{ height: "calc(100% - 9.5rem)" }}
              >
                <div className="subbTxt">
                  Which Marketplace Are You Listing On?
                </div>
                {isfetching
                  ? Array(10)
                      .fill(" ")
                      .map((item, index) => {
                        return (
                          <div className="each-action1" key={index}>
                            <Skeleton width={150} height={30} />
                          </div>
                        );
                      })
                  : userCreatedApps &&
                    userCreatedApps?.map((e, i) => {
                      return (
                        <div
                          className="each-action1"
                          onClick={() => {
                            setAddCompPlanStep("step3");
                            setCompPlanApp(e?.app_code);
                          }}
                        >
                          <div>
                            <img src={e?.app_icon} alt="" />
                          </div>
                          <div>{e?.app_name}</div>
                        </div>
                      );
                    })}
              </div>

              <div className="stepBtnss">
                <div
                  style={{ background: "#1F304F" }}
                  onClick={() => {
                    setAddCompPlanStep("step1");
                  }}
                >
                  Go Back
                </div>
                <div
                  style={{
                    background: "#59A2DD",
                    opacity: "0.25",
                    cursor: "not-allowed",
                  }}
                >
                  Next Step
                </div>
              </div>
            </>
          )}

          {addCompPlanStep === "step3" && (
            <>
              <div className="head-txt">
                <div>Add Comp Plan</div>
                <div
                  onClick={() => {
                    setAddCompPlan(false);
                    setAddCompPlanStep("step1");
                  }}
                  className="close-div"
                >
                  <img src={close} alt="" />
                </div>
              </div>

              <div
                className="overall-div"
                style={{ height: "calc(100% - 9.5rem)" }}
              >
                <div className="subbTxt">How Many Levels Will Be Paid Out?</div>
                <div className="each-action1">
                  <input type="number" onChange={handleLevelChange} />
                </div>
              </div>

              <div className="stepBtnss">
                <div
                  style={{ background: "#1F304F" }}
                  onClick={() => {
                    setAddCompPlanStep("step2");
                  }}
                >
                  Go Back
                </div>
                <div
                  style={{
                    background: "#59A2DD",
                    opacity: levels > 0 ? "1" : "0.25",
                    cursor: levels > 0 ? "pointer" : "not-allowed",
                  }}
                  onClick={() => {
                    if (levels > 0) {
                      setAddCompPlanStep("step4");
                    }
                  }}
                >
                  Next Step
                </div>
              </div>
            </>
          )}

          {addCompPlanStep === "step4" && (
            <>
              <div className="head-txt">
                <div>Add Comp Plan</div>
                <div
                  onClick={() => {
                    setAddCompPlan(false);
                    setAddCompPlanStep("step1");
                  }}
                  className="close-div"
                >
                  <img src={close} alt="" />
                </div>
              </div>

              <div
                className="overall-div"
                style={{ height: "calc(100% - 9.5rem)" }}
              >
                <div className="subbTxt">Enter Payout Percentage Per Level</div>
                {renderLevelInputs(inputValues, setInputValues)}
              </div>

              <div className="stepBtnss">
                <div
                  style={{ background: "#1F304F" }}
                  onClick={() => {
                    setAddCompPlanStep("step3");
                  }}
                >
                  Go Back
                </div>
                <div
                  style={{
                    ...applyStyle(spreadFunc(inputValues)),
                    background: "#59A2DD",
                  }}
                  onClick={() => {
                    if (levels == inputValues.length) {
                      setAddCompPlanStep("step5");
                    }
                  }}
                >
                  Next Step
                </div>
              </div>
            </>
          )}

          {addCompPlanStep === "step5" && (
            <>
              <div className="head-txt">
                <div>Add Comp Plan</div>
                <div
                  onClick={() => {
                    setAddCompPlan(false);
                    setAddCompPlanStep("step1");
                  }}
                  className="close-div"
                >
                  <img src={close} alt="" />
                </div>
              </div>

              <div
                className="overall-div"
                style={{ height: "calc(100% - 9.5rem)" }}
              >
                <div className="subbTxt">Enter Multiplier Per Level</div>
                {renderLevelInputs(multiplier, setMultiplier)}
              </div>

              <div className="stepBtnss">
                <div
                  style={{ background: "#1F304F" }}
                  onClick={() => {
                    setAddCompPlanStep("step4");
                  }}
                >
                  Go Back
                </div>
                <div
                  style={{
                    background: "#59A2DD",
                    ...applyStyle(spreadFunc(multiplier)),
                  }}
                  onClick={() => {
                    addComplan();
                  }}
                >
                  Next Step
                </div>
              </div>
            </>
          )}

          {addingComp && (
            <div
              className="loading-component"
              style={{
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                position: "absolute",
                display: "flex",
              }}
            >
              <LoadingAnimation1 icon={lg1} width={200} />
            </div>
          )}

          {addCompPlanStep === "step6" && (
            <>
              <div className="head-txt" style={{ justifyContent: "flex-end" }}>
                <div
                  onClick={() => {
                    setAddCompPlan(false);
                    setAddCompPlanStep("step1");
                    setSelectedService("");
                  }}
                  className="close-div"
                >
                  <img src={close} alt="" />
                </div>
              </div>

              <div
                className="overall-div"
                style={{ height: "calc(100% - 6rem)" }}
              >
                <div className="successMsg">
                  You Have Successfully Added A CompPlan To{" "}
                  {selectedService?.product_name}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AccDashboard;

export const ImageUploadDivProfilePic = ({ setFunc, funcValue }) => {
  const {
    planBAccountPicUploading,
    setplanBAccountPicUploading,
    setSelectedDropDown,
  } = useStore();

  return (
    <div
      className="imageUploadDiv"
      onClick={() => setSelectedDropDown("")}
      style={{
        width: "120px",
        height: "120px",
        border: "0.5px solid #e7e7e7",
        borderRadius: "50%",
      }}
    >
      {funcValue ? (
        <div
          className="imageDiv"
          style={{ height: "100%", width: "100%", marginRight: "0" }}
        >
          <img
            src={funcValue}
            alt="planBAccountPic"
            className="profileImg"
            htmlFor="profileUpdateImgPlanB"
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          />
        </div>
      ) : (
        <label
          htmlFor="profileUpdateImgPlanB"
          className="uploadFileDiv"
          style={{
            width: "100%",
            height: "100%",
            marginBottom: "0",
          }}
        >
          <input
            className="uploadNewPicPlanB"
            type="file"
            onChange={(e) => {
              uploadImageFunc(e, setFunc, setplanBAccountPicUploading);
            }}
            accept="image/*"
            id="profileUpdateImgPlanB"
          />
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
            }}
          >
            {planBAccountPicUploading ? (
              <div>Uploading...</div>
            ) : (
              <div>
                <img
                  src={upload}
                  alt=""
                  style={{ width: "30px", height: "30px" }}
                />
              </div>
            )}
          </div>
        </label>
      )}
    </div>
  );
};
