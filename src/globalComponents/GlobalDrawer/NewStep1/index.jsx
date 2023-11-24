import React, { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useStore } from "../../../components/store/store.ts";
import { useCoinContextData } from "../../../context/CoinContext";
import arrow from "../../../pages/accDashbaoard/arrow.svg";
import trash from "../../../pages/accDashbaoard/trash.svg";

const NewStep1 = ({ setpstep }) => {
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const { setaccsideNav, setispopular } = useStore();
  const {
    setMypathsMenu,
    servicesToggle,
    setServicesToggle,
    allServices,
    setAllServices,
  } = useCoinContextData();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("");
  const [stepForm, setStepForm] = useState({
    email: userDetails?.user?.email,
    name: "",
    description: "",
    cost: "",
    other_data: {},
    length: "",
  });

  useEffect(() => {
    if (userDetails) {
      setStepForm((prev) => {
        return {
          ...prev,
          email: userDetails?.user?.email,
        };
      });
    }
  }, []);

  const myTimeout = () => {
    setTimeout(reload, 3000);
  };

  function reload() {
    setispopular(false);
    setpstep(1);
    setStepForm({
      name: "",
      description: "",
      cost: "",
      other_data: {},
      length: "",
    });
    setaccsideNav("My Paths");
    setMypathsMenu("Steps");
    setStep("");
  }

  const createNewStep = () => {
    setLoading(true);
    axios
      .post(`https://careers.marketsverse.com/steps/add`, stepForm)
      .then((response) => {
        let result = response?.data;
        if (result?.status) {
          setLoading(false);
          setStep("success");
          myTimeout();
        } else {
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://comms.globalxchange.io/gxb/product/banker/get?category=naavi partners`
      )
      .then((response) => {
        let result = response?.data?.data;
        // console.log(result, "all services result");
        setAllServices(result);
      })
      .catch((error) => {
        console.log(error, "error in fetching all services");
      });
  }, []);

  const removeStep = (stepId) => {
    // Find the key corresponding to the value stepId
    const keyToRemove = Object.keys(stepForm?.other_data).find(
      (key) => stepForm?.other_data[key] === stepId
    );

    if (!keyToRemove) {
      // If the key is not found, do nothing
      return;
    }

    // Remove the key from other_data
    const { [keyToRemove]: removedKey, ...restOtherData } =
      stepForm?.other_data;

    // Reorder the remaining keys
    const reorderedOtherData = Object.keys(restOtherData).reduce(
      (acc, key, index) => ({
        ...acc,
        [`productid${index + 1}`]: restOtherData[key],
      }),
      {}
    );

    // Update the state with the modified other_data
    setStepForm({
      ...stepForm,
      other_data: reorderedOtherData,
    });
  };

  const getContent = () => {
    switch (step) {
      case "success":
        return (
          <div
            className="newConglomerate"
            style={{
              height: "calc(100% - 4rem)",
              padding: "0",
            }}
          >
            <div className="succesView">
              <div className="labelItm" style={{ textAlign: "center" }}>
                You Have Successfully Created A New Step.
              </div>
            </div>
          </div>
        );

      default:
        return (
          <>
            <div
              className="newConglomerate"
              style={{
                height: "calc(100% - 8rem)",
                padding: "0",
              }}
            >
              <Scrollbars
                className="scrollForm"
                renderTrackHorizontal={() => <div />}
                renderThumbHorizontal={() => <div />}
                renderTrackVertical={() => <div />}
                renderThumbVertical={() => <div />}
              >
                <div className="name">What is the name of this step?</div>
                <div className="inputWrap" style={{ maxHeight: "3.5rem" }}>
                  <input
                    type="text"
                    className="text"
                    placeholder="Name..."
                    onChange={(e) => {
                      setStepForm((prev) => {
                        return {
                          ...prev,
                          name: e.target.value,
                        };
                      });
                    }}
                  />
                </div>

                <div className="name">How long does this step take?</div>
                <div className="inputWrap" style={{ maxHeight: "3.5rem" }}>
                  <input
                    type="number"
                    className="text"
                    placeholder="Days..."
                    onChange={(e) => {
                      setStepForm((prev) => {
                        return {
                          ...prev,
                          length: e.target.value,
                        };
                      });
                    }}
                  />
                </div>

                <div className="name">
                  What is the instructions for the macro view?
                </div>
                <textarea
                  type="text"
                  class="text-textarea"
                  placeholder="Enter instructions..."
                  rows="5"
                  cols="40"
                  spellcheck="false"
                  onChange={(e) => {
                    setStepForm((prev) => {
                      return {
                        ...prev,
                        description: e.target.value,
                      };
                    });
                  }}
                ></textarea>

                <div className="name">What type of step is it?</div>
                <div
                  className="inputWrap"
                  style={{
                    maxHeight: "3.5rem",
                    margin: "20px 0 5px 0",
                    display: "flex",
                    paddingLeft: "2rem",
                    alignItems: "center",
                    cursor: "pointer",
                    fontWeight: stepForm?.cost === "paid" ? "500" : "300",
                    background:
                      stepForm?.cost === "paid"
                        ? "linear-gradient(90deg, #47b4d5 0.02%, #29449d 119.26%)"
                        : "",
                    color: stepForm?.cost === "paid" ? "white" : "",
                  }}
                  onClick={() => {
                    setStepForm((prev) => {
                      return {
                        ...prev,
                        cost: "paid",
                      };
                    });
                  }}
                >
                  Paid
                </div>
                <div
                  className="inputWrap"
                  style={{
                    maxHeight: "3.5rem",
                    margin: "5px 0 40px 0",
                    display: "flex",
                    paddingLeft: "2rem",
                    alignItems: "center",
                    cursor: "pointer",
                    fontWeight: stepForm?.cost === "free" ? "500" : "300",
                    background:
                      stepForm?.cost === "free"
                        ? "linear-gradient(90deg, #47b4d5 0.02%, #29449d 119.26%)"
                        : "",
                    color: stepForm?.cost === "free" ? "white" : "",
                  }}
                  onClick={() => {
                    setStepForm((prev) => {
                      return {
                        ...prev,
                        cost: "free",
                      };
                    });
                  }}
                >
                  Free
                </div>

                <div className="name">Add services</div>
                <div
                  className="each-acc-addpath-field-input-addstep"
                  style={{ flexDirection: "column" }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setServicesToggle(!servicesToggle);
                    }}
                  >
                    <div
                      style={{
                        width: "85%",
                        cursor: "pointer",
                        paddingLeft: "1.5rem",
                        borderRadius: "35px",
                        opacity: "0.25",
                        fontSize: "1rem",
                        fontWeight: "500",
                        display: "flex",
                        height: "56px",
                        alignItems: "center",
                      }}
                    >
                      Click To Select
                    </div>
                    <div className="arrow-box-addstep">
                      <img
                        src={arrow}
                        alt=""
                        style={{
                          transform: servicesToggle ? "rotate(180deg)" : "",
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="hidden-steps-addstep"
                    style={{ display: servicesToggle ? "flex" : "none" }}
                  >
                    {allServices?.map((e, i) => {
                      return (
                        <div
                          className="each-hidden-step-addstep"
                          key={i}
                          onClick={() => {
                            setStepForm((prev) => {
                              const productId = `productid${
                                Object.keys(prev?.other_data).length + 1
                              }`;
                              return {
                                ...prev,
                                other_data: {
                                  ...prev?.other_data,
                                  [productId]: e?.product_id,
                                },
                              };
                            });
                            setServicesToggle(false);
                          }}
                        >
                          <div className="stepp-textt-addstep">
                            <div>{e?.product_name}</div>
                            <div>
                              <img src={e?.product_icon} alt="" />
                            </div>
                          </div>
                          <div className="stepp-textt1-addstep">
                            {e?.full_description}
                          </div>
                          <div className="stepp-text-amountt-addstep">
                            <span style={{ fontSize: "1.2rem" }}>
                              {e?.billing_cycle && e?.billing_cycle?.monthly
                                ? e?.billing_cycle?.monthly?.coin
                                : e?.billing_cycle && e?.billing_cycle?.lifetime
                                ? e?.billing_cycle?.lifetime?.coin
                                : ""}
                            </span>
                            <span style={{ fontSize: "1.2rem" }}>
                              {e?.billing_cycle && e?.billing_cycle?.monthly
                                ? Number(
                                    e?.billing_cycle?.monthly?.price
                                  )?.toFixed(2)
                                : e?.billing_cycle && e?.billing_cycle?.lifetime
                                ? Number(
                                    e?.billing_cycle?.lifetime?.price
                                  )?.toFixed(2)
                                : ""}
                            </span>
                            <span
                              style={{
                                fontSize: "0.9rem",
                              }}
                            >
                              {e?.monthly ? "/Month" : "/Lifetime"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="selected-steps-addstep">
                  {allServices?.map((e, i) => {
                    if (
                      Object.values(stepForm?.other_data).includes(
                        e?.product_id
                      )
                    ) {
                      return (
                        <div className="each-selected-addstep" key={e?.product_id}>
                          <div className="stepp-textt-addstep">
                            <div>{e?.product_name}</div>
                            <div>
                              <img src={e?.product_icon} alt="" />
                            </div>
                          </div>
                          <div className="stepp-textt1-addstep">
                            {e?.full_description}
                          </div>
                          <div className="stepp-text-amountt-addstep">
                            <span style={{ fontSize: "1.2rem" }}>
                              {e?.billing_cycle && e?.billing_cycle?.monthly
                                ? e?.billing_cycle?.monthly?.coin
                                : e?.billing_cycle && e?.billing_cycle?.lifetime
                                ? e?.billing_cycle?.lifetime?.coin
                                : ""}
                            </span>
                            <span style={{ fontSize: "1.2rem" }}>
                              {e?.billing_cycle && e?.billing_cycle?.monthly
                                ? Number(
                                    e?.billing_cycle?.monthly?.price
                                  )?.toFixed(2)
                                : e?.billing_cycle && e?.billing_cycle?.lifetime
                                ? Number(
                                    e?.billing_cycle?.lifetime?.price
                                  )?.toFixed(2)
                                : ""}
                            </span>
                            <span
                              style={{
                                fontSize: "0.9rem",
                              }}
                            >
                              {e?.monthly ? "/Month" : "/Lifetime"}
                            </span>
                          </div>
                          <div
                            className="trash-icon-div-addstep"
                            onClick={() => removeStep(e?.product_id)}
                          >
                            <img src={trash} alt="" />
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                <div className="space"></div>
              </Scrollbars>
            </div>

            <div
              className="NextBtn"
              style={{
                width: "100%",
                opacity: loading
                  ? "0.5"
                  : stepForm?.name &&
                    stepForm?.description &&
                    stepForm?.length &&
                    stepForm?.cost &&
                    Object.keys(stepForm?.other_data).length > 0
                  ? "1"
                  : "0.5",
                cursor:
                  stepForm?.name &&
                  stepForm?.description &&
                  stepForm?.length &&
                  stepForm?.cost &&
                  Object.keys(stepForm?.other_data).length > 0
                    ? "pointer"
                    : "not-allowed",
              }}
              onClick={() => {
                if (
                  stepForm?.name &&
                  stepForm?.description &&
                  stepForm?.length &&
                  stepForm?.cost &&
                  Object.keys(stepForm?.other_data).length > 0
                ) {
                  createNewStep();
                }
              }}
            >
              {loading ? "Loading..." : "Submit Step"}
            </div>
          </>
        );
    }
  };

  return (
    <>
      {getContent()}
      <ToastContainer />
    </>
  );
};

export default NewStep1;
