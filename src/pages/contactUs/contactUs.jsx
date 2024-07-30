import React from 'react';
import { useNavigate } from "react-router-dom";
import { useCoinContextData } from "../../context/CoinContext";
import "./contactUs.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import logo from "../../static/images/logo.svg";
import hamIcon from "../../static/images/icons/hamIcon.svg";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const ContactUs = () => {
    const navigate = useNavigate();
    const { preLoginMenu, setPreLoginMenu } = useCoinContextData();

    const iconStyle = {
        color: 'dodgerblue',        // Set the color of the icon
        fontSize: '24px',    // Set the font size of the icon
        marginRight: '10px'  // Set the margin-right for spacing
        // Add any other CSS properties as needed
    };

    return (
        <div className='AIMethdologyPage'>
            <div className="navbar">
                <div className="hamMenu-home" >
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
                    <div
                        onClick={() => {
                            navigate("/");
                            setPreLoginMenu("About Us");
                        }}
                    >
                        <p style={{ fontWeight: preLoginMenu === "About Us" ? "600" : "" }}>
                            About Naavi
                        </p>
                    </div>
                   
                    {/* <div
            onClick={() => {
              navigate("/maps");
              setPreLoginMenu("Paths");
            }}
          >
            <p style={{ fontWeight: preLoginMenu === "Paths" ? "600" : "" }}>
              Paths
            </p>
          </div> */}
                    {/* <div
            onClick={() => {
              // navigate("/directory/nodes");
              setPreLoginMenu("Partners");
            }}
          >
            <p style={{ fontWeight: preLoginMenu === "Partners" ? "600" : "" }}>
              Partners
            </p>
          </div> */}
                    <div
                        onClick={() => {
                            navigate("/social");
                            setPreLoginMenu("SocialDimension");
                        }}
                    >
                        <p style={{ fontWeight: preLoginMenu === "SocialDimension" ? "600" : "" }}>
                            Social Dimension
                        </p>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/AIMethdology");
                            setPreLoginMenu("AIMethdology");
                        }}
                    >
                        <p style={{ fontWeight: preLoginMenu === "AIMethdology" ? "600" : "" }}>
                           AI Methdology
                        </p>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/contact");
                            setPreLoginMenu("ContactUs");
                        }}
                    >
                        <p style={{ fontWeight: preLoginMenu === "ContactUs" ? "600" : "" }}>
                            Contact
                        </p>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/WhitePaper");
                            setPreLoginMenu("WhitePaper");
                        }}
                    >
                        <p style={{ fontWeight: preLoginMenu === "WhitePaper" ? "600" : "" }}>
                            White Paper
                        </p>
                    </div>
                </div>
                {/* <div className="btns-div"> */}
                    {/* <div */}
                        {/* className="gs-Btn" */}
                        {/* onClick={() => { */}
                            {/* // navigate("/login"); */}
                        {/* }} */}
                    {/* > */}
                        {/* Login */}
                    {/* </div> */}
                {/* </div> */}
            </div>
            <div className="color-box"></div>
            <div className="container">
                <div className="parent" >
                    <div className="bgColor">
                        <div className="child  p-5">
                            <div className="contact">
                                <h2 className='pb-3'></h2>
                                <div className="item ps-2">
                                    <div className="d-flex">
                                        <FontAwesomeIcon icon={faUser} style={iconStyle} /> <p>A SeshAditya</p>
                                    </div>
                                    <hr />
                                    <div className="email1 d-flex">
                                        <FontAwesomeIcon icon={faEnvelope} style={iconStyle} />  <p>aditya@zedat.fu-berlin.de</p>
                                    </div>
                                    <hr />
                                    <div className="contact d-flex">
                                        <FontAwesomeIcon icon={faPhone} style={iconStyle} /> <p>+49 17686765221</p>
                                    </div>
                                    <hr />
                                    <div className="socialIcon text-center">
                                    <a href="https://twitter.com/adyti_369" target='_blank'>
                                    <FontAwesomeIcon icon={faTwitter} style={iconStyle} />
                                    </a>
                                    <a href="https://github.com/adytiaa/" target='_blank'>
                                    <FontAwesomeIcon icon={faGithub} style={iconStyle} />
                                    </a>
                                    <a href="https://de.linkedin.com/in/a-seshaditya-7180822a5" target='_blank'>
                                    <FontAwesomeIcon icon={faLinkedin} style={iconStyle} />
                                    </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <figure class="fill-primary opacity-5 position-absolute top-0 end-0 translate-middle mb-3">
                        {/* <svg width="180px" height="180px" style={{ borderRadius: '50%' }}> 
                                    <path
                                        d="M210.030,105.011 C210.030,163.014 163.010,210.029 105.012,210.029 C47.013,210.029 -0.005,163.014 -0.005,105.011 C-0.005,47.015 47.013,-0.004 105.012,-0.004 C163.010,-0.004 210.030,47.015 210.030,105.011 Z">
                                    </path>
                                </svg> */}
                        <div style={{ width: "100px", height: "100px", borderRadius: "50%" }}>
                            <svg width="100%" height="100%" viewBox="0 0 211 211" xmlns="http://www.w3.org/2000/svg">
                                <path d="M210.030,105.011 C210.030,163.014 163.010,210.029 105.012,210.029 C47.013,210.029 -0.005,163.014 -0.005,105.011 C-0.005,47.015 47.013,-0.004 105.012,-0.004 C163.010,-0.004 210.030,47.015 210.030,105.011 Z"></path>
                            </svg>
                        </div>

                    </figure>
                </div>

            </div>
        </div>



    );
};

export default ContactUs;