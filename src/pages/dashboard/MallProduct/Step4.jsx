import React, { useEffect, useState } from "react";
import { buyProduct } from "./apidata";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../components/store/store.ts";
import axios from "axios";
import { LoadingAnimation1 } from "../../../components/LoadingAnimation1";
import lg1 from "../../../static/images/login/lg1.svg";

const Step4 = () => {
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const [isloading, setisloading] = useState(true);
  const [isfinalstep, setIsfinalstep] = useState(false);
  const [profileId, setProfileId] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { setBuy, mallselectedCoin, index, setIndex } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    let email = userDetails?.user?.email;
    if (email) {
      axios
        .get(`https://comms.globalxchange.io/user/details/get?email=${email}`)
        .then((res) => {
          const { data } = res;
          if (data?.status) {
            setProfileId(data?.user["TaxChains_profile_id"]);
          }
        });
    }
  }, []);

  useEffect(() => {
    let product = localStorage.getItem("product");
    setIndex(JSON.parse(product));
  }, []);

  useEffect(() => {
    if (profileId && index) {
      let userEmail = userDetails?.user?.email;
      let token = userDetails?.idToken;
      let billing = index?.product?.lifetime
        ? "lifetime"
        : index?.product?.monthly
        ? "monthly"
        : "";

      let obj = {
        email: userEmail,
        token: token,
        product_id: index?.product?.product_id,
        billing_method: billing,
        pay_with_coin: mallselectedCoin?.coinSymbol,
        app_code: "TaxChains",
        profile_id: profileId,
      };
      buyProduct(obj).then((response) => {
        let result = response?.data;
        if (result?.status) {
          setIsfinalstep(true);
          setisloading(false);
        } else {
          setisloading(false);
          setErrMsg(result?.message);
        }
      });
    }
  }, [profileId, index]);

  return (
    <>
      {isloading ? (
        <div
          className="loading-component"
          style={{ top: "0", left: "0", width: "100%" }}
        >
          <LoadingAnimation1 icon={lg1} width={200} />
          <div className="bottom-textt">
            Buying {index?.product?.product_name}
          </div>
        </div>
      ) : (
        <>
          {isfinalstep ? (
            <>
              <div className="success-text">
                You Have Successfully Subscribed To{" "}
                {index?.product?.product_name}
              </div>
              <div className="boxx">See Receipt</div>
              <div
                className="boxx"
                style={{ marginTop: "1.5rem" }}
                onClick={() => {
                  navigate("/dashboard/users");
                  setBuy("step1");
                  setErrMsg("");
                  setIsfinalstep(false);
                }}
              >
                Close
              </div>
            </>
          ) : (
            <>
              <div className="success-text">{errMsg}</div>
              <div className="buttonss">
                <div
                  className="share-btn"
                  style={{ textAlign: "center" }}
                  onClick={() => {
                    navigate("/dashboard/users");
                    setBuy("step1");
                    setErrMsg("");
                    setIsfinalstep(false);
                  }}
                >
                  Close
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Step4;
