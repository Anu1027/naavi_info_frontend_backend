import React, { useContext, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useStore } from "../../../components/store/store.ts";
import { useCoinContextData } from "../../../context/CoinContext";

const NewStep1 = ({ setpstep }) => {
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const { setaccsideNav, setispopular } = useStore();
  const { setMypathsMenu } = useCoinContextData();

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
                    stepForm?.cost
                  ? "1"
                  : "0.5",
                cursor:
                  stepForm?.name &&
                  stepForm?.description &&
                  stepForm?.length &&
                  stepForm?.cost
                    ? "pointer"
                    : "not-allowed",
              }}
              onClick={() => {
                if (
                  stepForm?.name &&
                  stepForm?.description &&
                  stepForm?.length &&
                  stepForm?.cost
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
