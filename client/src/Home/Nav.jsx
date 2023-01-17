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
  BiUserX,
  BiUserPlus,
  BiUserCheck,
  BiWorld,
  BiQuestionMark,
  BiTag,
  BiPaperclip,
  BiAddToQueue,
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
  const [isBlogsExpanded, setIsBlogsExpanded] = useState(false);

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
  {/*=================================================*/}
          <Link
        to="/"
        className={`
          flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:w-full p-2 hover:text-green-700
          ${active === "home" && " text-green-700 tab:border-l-[3px] border-b-[3px border-green-700"}
        `}
        style={{ width: mobile ? width / 5 : "100%" }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <BiWorld className="text-xl" />
        <p className="tab:ml-3 text-[0.7em] tab:text-base">Public</p>
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
            <Link to="/form-post" className={`${
              active === "/form-post" &&
              "text-green-700 tab:border-l-[3px] border-b-[3px border-green-700"
            }
        flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:w-full p-2 hover:text-green-700`}
          ><BiQuestionMark className="text-xl" />Questions</Link>
          </li>
          
          <li>
          <Link
            style={{ width: mobile ? width / 5 : "100%" }}
            to="/Users"
            className={`${
              active === "Users" &&
              "text-green-700 tab:border-l-[3px] border-b-[3px border-green-700"
            }
        flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:w-full p-2 hover:text-green-700`}
          >
            <BiGroup className="text-xl" />
            <p className="tab:ml-3 text-[0.7em] tab:text-base">Users</p>
          </Link></li>
          <li>
          <Link
            style={{ width: mobile ? width / 5 : "100%" }}
            to="/Users"
            className={`${
              active === "Users" &&
              "text-green-700 tab:border-l-[3px] border-b-[3px border-green-700"
            }
        flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:w-full p-2 hover:text-green-700`}
          >
            <BiUserCheck className="text-xl" />
            <p className="tab:ml-3 text-[0.7em] tab:text-base">Experts</p>
          </Link></li>
          <li>
            <Link to="tags" className={`${
              active === "tags" &&
              "text-green-700 tab:border-l-[3px] border-b-[3px border-green-700"
            }
        flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:w-full p-2 hover:text-green-700`}
          ><BiTag className="text-xl" />Tags</Link>
          </li>
        </ul>
      </div>
 {/*=================================================*/} 

          <Link
            style={{ width: mobile ? width / 5 : "100%" }}
            to="/blogs"
            className={`
              flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:w-full p-2 hover:text-green-700 " text-green-700 tab:border-l-[3px] border-b-[3px border-green-700"}
            `}
            onClick={() => setIsBlogsExpanded(!isBlogsExpanded)}
          >
            <BiPackage className="text-xl" />
            <p className="tab:ml-3 text-[0.7em] tab:text-base">Blogs</p>
            {isBlogsExpanded ? <span>▼</span> : <span>▶</span>}
          </Link>

          <div className={`${isBlogsExpanded ? "" : "hidden"}`}>
            {/*"/blogs/category1"*/}
                <Link to= "/blogs" className={`${
                  active === "/blogs" &&
                  "text-green-700 tab:border-l-[3px] border-b-[3px border-green-700"
                }
                flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:w-full p-2 hover:text-green-700`}
                ><BiPaperclip className="text-xl" />
                  <p className="tab:ml-3 text-[0.7em] tab:text-base">All Blogs</p>
                </Link>
                <Link to="/form-post" className={`${
                  active === "/form-post" &&
                  "text-green-700 tab:border-l-[3px] border-b-[3px border-green-700"
                }
                flex cursor-pointer tab:mt-3 mx-auto items-center tab:flex-row flex-col tab:w-full p-2 hover:text-green-700`}
                ><BiAddToQueue className="text-xl" />
                  <p className="tab:ml-3 text-[0.7em] tab:text-base">Add Blog</p>
                </Link>
              </div>


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