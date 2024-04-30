import { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  window.addEventListener("resize", updateWindowWidth);
  return (
    <>
      {windowWidth < 1024 ? (
        <>
          <div className="sticky top-0 w-full ">
            <Link to="/recipe">
              <div className="navbar bg-base-100 ">
                <div className="flex-1 flex justify-center">
                  <a className="btn btn-ghost text-2xl">Cooking Buddy</a>
                </div>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="sticky top-0 w-full mt-8">
            <Link to="/recipe">
              <div className="navbar bg-base-100 ">
                <div className="flex-1 flex justify-center">
                  <a className="btn btn-ghost text-5xl">Cooking Buddy</a>
                </div>
              </div>
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default Nav;
