import React from "react";
import "./mobMenu.scss";
import { useStore } from "../store/store.ts";
import { useNavigate } from "react-router-dom";

const navMenu = [
  {
    id: 0,
    title: "About",
    link:"/"
  },
  {
    id: 1,
    title: "Directory",
    link:"/directory"
  },
  {
    id: 2,
    title: "Products",
    link:"/"
  },
  // {
  //   id: 3,
  //   title: "Signature Suite",
  //   link:"/"
  // },
  // {
  //   id: 4,
  //   title: "Affiliates",
  //   link:"/"
  // },
];

const MobMenu = () => {
    let navigate = useNavigate();
  const { selectedNav, setselectedNav, mobMenuOpen, setmobMenuOpen } = useStore();
  return (
    <div className="mob-menu">
      <div className="all-mob-menu">
        {navMenu.map((each, i) => (
          <div
            className="each-mob-title"
            onClick={() => {
                setselectedNav(each.title);
                navigate(each.link);
                setmobMenuOpen(false);
            }}
            style={{
              background:
                selectedNav === each.title ? "rgba(31, 48, 79, 0.05)" : "",
              fontWeight: selectedNav === each.title ? "600" : "",
            }}
          >
            {each.title}
          </div>
        ))}
      </div>
      <div className="mob-buttons">
        <div className="mob-started">For Users</div>
        <div className="mob-accountants">For Accountants</div>
      </div>
    </div>
  );
};

export default MobMenu;
