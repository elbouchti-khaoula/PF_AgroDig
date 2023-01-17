import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import "../App.css";
import "boxicons";
import {
  BiMessageRoundedDots,
  BiUser,
  BiHome,
  BiGroup,
  BiCog,
  BiDoorOpen,
  BiLogOut,
  BiMenu,
  BiPodcast,
  BiJoystickButton,
  BiUpload,
  BiPackage,
  BiMemoryCard,
  BiAlbum,
  BiTime,
} from "react-icons/bi";
import { deleteAllCookies } from "../contexts/RequireAuth";
import { useAuth } from "../contexts/AuthContext";
import { useApp } from "../contexts/AppContext";

function Nav({ active }) {
  const [width, setWidth] = useState(0);
  const { isDark } = useApp();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [mobile, setMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleLogout = () => {
    setUser(null);
    deleteAllCookies();
    navigate("/login", { replace: true });
  };

  const handleMobile = () => {
    if (window.innerWidth < 640) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      setWidth(window.innerWidth);
      window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
        console.log(width);
        handleMobile();
      });
      handleMobile();
    }
  }, []);

  return (
    <>
      <div 
        className={`z-[19]  min-w-[200px]
      duration-500 tab:h-[92vh] tab:py-4 shadow-inner tab:w-fit w-full flex tab:flex-col justify-between ${
        isDark
          ? "bg-[#08021d] border-r-2 border-r-slate-200/20"
          : "bg-[#eff3f9] border-r-2 "
      }`}
      >
        <div
          className={`flex tab:flex-col w-full items-center px-0 ${
            isDark ? "text-slate-100" : "text-black"
          }`}
        >
          <Link
            style={{ width: mobile ? width / 5 : "100%" }}
            
            to="/"
            className={`${
              active === "home" &&
              " text-green-700 tab:border-l-[3px] border-b-[3px border-green-700"
            }
         flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:flex-row flex-col tab:w-full p-2 hover:text-green-700`}
          >
            <BiHome className="text-xl" />
            <p className="tab:ml-3 text-[0.7em] tab:text-base">Home</p>
          </Link>
          <Link
        to="/"
        className={`
          flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:w-full p-2 hover:text-green-700
          ${active === "home" && " text-green-700 tab:border-l-[3px] border-b-[3px border-green-700"}
        `}
        style={{ width: mobile ? width / 5 : "100%" }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <BiPodcast className="text-xl" />
        <p className="tab:ml-3 text-[0.7em] tab:text-base">Post</p>
        {isExpanded ? <span>▼</span> : <span>▶</span>}
      </Link>
      <div className={`${isExpanded ? "" : "hidden"}`}>
        <ul>
          <li>
            <Link to="/home/myposts" className={`${
              active === "/home/myposts" &&
              "text-green-700 tab:border-l-[3px] border-b-[3px border-green-700"
            }
        flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:w-full p-2 hover:text-green-700`}
          > <BiAlbum className="text-xl" />My Posts</Link>
          </li>
          <li>
            <Link to="/home/popular" className={`${
              active === "fome" &&
              "text-green-700 tab:border-l-[3px] border-b-[3px border-green-700"
            }
        flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:w-full p-2 hover:text-green-700`}
          ><BiGroup className="text-xl" /> Popular</Link>
          </li>
          <li>
            <Link to="/home/recent" className={`${
              active === "home" &&
              "text-green-700 tab:border-l-[3px] border-b-[3px border-green-700"
            }
        flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:w-full p-2 hover:text-green-700`}
          ><BiTime className="text-xl" />Recent</Link>
          </li>
        </ul>
      </div>
          

          <Link
            style={{ width: mobile ? width / 5 : "100%" }}
            to="/blogs"
            className={`${
              active === "blogs" &&
              "text-green-700 tab:border-l-[3px] border-b-[3px border-green-700"
            }
        flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:w-full p-2 hover:text-green-700`}
          >
            <BiPackage className="text-xl" />
            <p className="tab:ml-3 text-[0.7em] tab:text-base">Blogs</p>
          </Link>
          <Link
            style={{ width: mobile ? width / 5 : "100%" }}
            to="/profile"
            className={`${
              active === "profile" &&
              "text-green-700 tab:border-l-[3px] border-b-[3px border-green-700"
            }
        flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:w-full p-2 hover:text-green-700`}
          >
            <BiUser className="text-xl" />
            <p className="tab:ml-3 text-[0.7em] tab:text-base">Profile</p>
          </Link>
          <Link
            style={{ width: mobile ? width / 5 : "100%" }}
            to="/messages"
            className={`${
              active === "messages" &&
              "text-green-700 tab:border-l-[3px] border-b-[3px border-green-700"
            }
        flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:w-full p-2 hover:text-green-700`}
          >
            <BiMessageRoundedDots className="text-xl" />
            <p className="tab:ml-3 text-[0.7em] tab:text-base">Messages</p>
          </Link>
        </div>
        <div
          className={`flex tab:flex-col w-full items-center tab:px-3 ${
            isDark ? "text-slate-100" : "text-black"
          }`}
        >
          <Link
            style={{ width: mobile ? width / 5 : "100%" }}
            to={`/settings`}
            className={`${
              active === "settings" &&
              "text-green-700 tab:border-l-[3px] border-b-[3px border-green-700"
            }
          flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:w-full p-2 hover:text-green-700`}
          >
            <BiCog className="text-xl" />
            <p className="tab:ml-3 text-[0.7em] tab:text-base">Settings</p>
          </Link>
          <div
            style={{ width: mobile ? width / 5 : "100%" }}
            onClick={handleLogout}
            className={`
          flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:w-full p-2 hover:text-green-700`}
          >
            <BiLogOut className="text-xl" />
            <p className="tab:ml-3 text-[0.7em] tab:text-base">Logout</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
