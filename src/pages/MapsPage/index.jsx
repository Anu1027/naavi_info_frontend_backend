import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./mapspage.scss";

//images
import logo from "../../static/images/logo.svg";
import careerIcon from "../../static/images/mapspage/careerIcon.svg";
import educationIcon from "../../static/images/mapspage/educationIcon.svg";
import immigrationIcon from "../../static/images/mapspage/immigrationIcon.svg";
import plus from "../../static/images/mapspage/plus.svg";
import close from "../../static/images/mapspage/close.svg";
import hamIcon from "../../static/images/icons/hamIcon.svg";

const MapsPage = () => {
  const navigate = useNavigate();
  const [option, setOption] = useState("Career");
  const [containers, setContainers] = useState([
    { id: 1, inputValue1: "", inputValue2: "", removable: false },
  ]);

  const handleAddContainer = () => {
    const lastContainer = containers[containers.length - 1];
    const newContainerId = lastContainer.id + 1;
    const newContainer = {
      id: newContainerId,
      inputValue1: "",
      inputValue2: "",
      removable: true,
    };
    setContainers([...containers, newContainer]);
  };

  const handleRemoveContainer = (containerId) => {
    const updatedContainers = containers.filter(
      (container) => container.id !== containerId
    );
    // Renumber the containers after removing one
    const renumberedContainers = updatedContainers.map((container, index) => {
      return { ...container, id: index + 1 };
    });
    setContainers(renumberedContainers);
  };

  const handleInputChange = (e, containerId, inputIndex) => {
    const updatedContainers = [...containers];
    const containerIndex = updatedContainers.findIndex(
      (container) => container.id === containerId
    );

    if (containerIndex !== -1) {
      if (inputIndex === 1) {
        updatedContainers[containerIndex].inputValue1 = e.target.value;
      } else if (inputIndex === 2) {
        updatedContainers[containerIndex].inputValue2 = e.target.value;
      }

      setContainers(updatedContainers);
    }
  };

  const handleResetContainer = () => {
    setContainers([
      { id: 1, inputValue1: "", inputValue2: "", removable: false },
    ]);
  };

  return (
    <div className="mapspage">
      <div className="maps-navbar">
        <div className="hamMenu">
          <img src={hamIcon} alt="" />
        </div>
        <div
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="logo" />
        </div>
        <div className="menu-items">
          <div>
            <p>Paths</p>
          </div>
          <div>
            <p>Explore</p>
          </div>
          <div>
            <p>Products</p>
          </div>
          <div>
            <p>Resources</p>
          </div>
          <div>
            <p>Vendors</p>
          </div>
        </div>
        <div className="btns-div">
          <div
            className="gs-Btn"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Get Started
          </div>
        </div>
      </div>
      <div className="maps-color-box"></div>
      <div className="maps-container">
        <div className="maps-sidebar">
          <div className="top-icons">
            <div
              className="each-icon"
              onClick={() => {
                setOption("Career");
              }}
            >
              <div
                className="border-div"
                style={{
                  border:
                    option === "Career"
                      ? "1px solid #100F0D"
                      : "1px solid #e7e7e7",
                }}
              >
                <img src={careerIcon} alt="" />
              </div>
              <div
                className="icon-name-txt"
                style={{
                  fontWeight: option === "Career" ? "600" : "",
                }}
              >
                Career
              </div>
            </div>
            <div
              className="each-icon"
              onClick={() => {
                setOption("Education");
              }}
            >
              <div
                className="border-div"
                style={{
                  border:
                    option === "Education"
                      ? "1px solid #100F0D"
                      : "1px solid #e7e7e7",
                }}
              >
                <img src={educationIcon} alt="" />
              </div>
              <div
                className="icon-name-txt"
                style={{
                  fontWeight: option === "Education" ? "600" : "",
                }}
              >
                Education
              </div>
            </div>
            <div
              className="each-icon"
              onClick={() => {
                setOption("Immigration");
              }}
            >
              <div
                className="border-div"
                style={{
                  border:
                    option === "Immigration"
                      ? "1px solid #100F0D"
                      : "1px solid #e7e7e7",
                }}
              >
                <img src={immigrationIcon} alt="" />
              </div>
              <div
                className="icon-name-txt"
                style={{
                  fontWeight: option === "Immigration" ? "600" : "",
                }}
              >
                Immigration
              </div>
            </div>
          </div>
          <div className="mid-area">
            <div className="input-div1">
              <input type="text" placeholder="Choose Starting Coordinates.." />
            </div>
            {containers.map((container, index) => (
              <div className="destination-container" key={container.id}>
                <div className="dest-txt">
                  <div>Destination {container.id}</div>
                  {container.removable && (
                    <div onClick={() => handleRemoveContainer(container.id)}>
                      <img src={close} alt="" />
                    </div>
                  )}
                </div>
                <div className="input-div2">
                  <input
                    type="text"
                    value={container.inputValue1}
                    placeholder="Where Do You Want To Go?"
                    onChange={(e) => handleInputChange(e, container.id, 1)}
                  />
                </div>
                <div className="input-div2">
                  <input
                    type="text"
                    value={container.inputValue2}
                    placeholder="By When?"
                    onChange={(e) => handleInputChange(e, container.id, 2)}
                  />
                </div>
              </div>
            ))}
            {/* <div className="destination-container">
              <div className="dest-txt">Destination 1</div>
              <div className="input-div2">
                <input type="text" placeholder="Where Do You Want To Go?" />
              </div>
              <div className="input-div2">
                <input type="text" placeholder="By When?" />
              </div>
            </div> */}
            <div className="add-div" onClick={handleAddContainer}>
              <img src={plus} alt="" />
              Add Destination
            </div>
            <div className="maps-btns-div">
              <div className="gs-Btn-maps">Get Started</div>
              <div className="reset-btn" onClick={handleResetContainer}>
                Reset
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsPage;
