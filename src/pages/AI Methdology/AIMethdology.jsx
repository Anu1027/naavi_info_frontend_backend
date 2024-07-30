import React from 'react';
import { useNavigate } from "react-router-dom";
import { useCoinContextData } from "../../context/CoinContext";
import "./AIMethdology.scss";


import logo from "../../static/images/logo.svg";
import hamIcon from "../../static/images/icons/hamIcon.svg";
import pathEnginee from "../../static/images/path-engine.jpg";
import tickPath from "../../static/images/tick.png";
import firstImg from "../../static/images/first.png";

const AIMethdology = () => {
  const navigate = useNavigate();
  const { preLoginMenu, setPreLoginMenu } = useCoinContextData();

  const pathEngine = [
    {
      id: 1,
      point: "Education Knowledge Graphs: Building the knowledge graphs for diverse higher education and other opportunities, while consistently updating them to reﬂect  changes in the educational landscape",
    },
    {
      id: 2,
      point: "LLMs Synergising: Unifying knowledge representation with focus on reasoning in order to provide personalised recommendations",
    },
    {
      id: 3,
      point: "Pathway Generation: Synergised LLMs to generate personalised education pathways based on user input, considering factors like interests, goals, time constraints, and prerequisites",
    },
    {
      id: 4,
      point: "User Interaction and Gamiﬁed development: for active participation and continuous engagement, ultimately contributing to a more immersive and effective interaction with the platform or application",
    },
    // {
    //   id: 5,
    //   point: "Algorithms free from any kind of biases enabling career navigation and career transitions",
    // },
  ]

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
      <div className="pathEngine container py-5">
        <div className="row">
          <div className="col-md-6">
            <img className="pathImage mt-lg-4" src={pathEnginee} alt="" />
          </div>
          <div className="col-md-6">
            <h1 className='mb-3 fw-bold'>Personalised Education Pathways using Generative AI</h1>
            <div className="">
              {pathEngine.map((e, i) => {
                return (
                  <ul key={e.id} className="d-flex">
                    <img className="tickImage" src={tickPath} alt="" />
                    <li className="points shadow bg-white p-2 rounded">{e.point}</li>
                  </ul>
                )
              })}
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <h1 className="fw-bold mb-3">LLMs-Synergised with Knowledge Graphs (KG)</h1>
          <div className="col-md-6">
            <ul>
              <li className='shadow bg-white p-2 rounded mb-2'>Using open-source LLM models such as Llama2, Mistral 7B  running locally using Ollama</li>
              <li className='shadow bg-white p-2 rounded mb-2'>With vector/graph databases (Qdrant/Neo4j), Langchain, as well as Knowledge graph embeddings (pykg2vec library)</li>
              <li className='shadow bg-white p-2 rounded'>Synergising LLMs with KGs from the perspective of knowledge representation as well as reasoning on the data related to education paths, and counseling scenarios</li>
            </ul>
          </div>
          <div className="col-md-6">
            <img className="firstImage" src={firstImg} alt="" />
          </div>
        </div>
      </div>

    </div>

  );
};

export default AIMethdology;