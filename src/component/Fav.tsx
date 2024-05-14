import { useEffect, useState } from "react";
import Nav from "./Nav";
import { useDispatch } from "react-redux";
import { getId } from "./redux/slicer";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "./home.css";
import FavXl from "./FavXl";
interface detail {
  id: number;
  image: string;
  name: string;
  rating: string;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  isFavorite: boolean;
}
function Fav() {
  const [fav, setFav] = useState<detail[]>([]);
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const deleteFav = (id: number) => {
    const result = fav.filter((data: detail) => data.id !== id);
    setFav(result);
    localStorage.setItem("recipes", JSON.stringify(result));
  };
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  window.addEventListener("resize", updateWindowWidth);
  useEffect(() => {
    const local: string | null = localStorage.getItem("recipes");
    if (local !== null) {
      setFav(JSON.parse(local));
    }
  }, []);
  return (
    <>
      {windowWidth < 1024 ? (
        <>
          <div className=" w-full h-full flex flex-col justify-between items-center">
            <Nav></Nav>
            {fav.length === 0 ? (
              <>
                <div className="flex flex-col justify-center items-center h-full w-full">
                  <p className="text-2xl  text-slate-300">
                    Empty Favorite Recipe
                  </p>
                  <Link to="/">
                    <button className="btn btn-active btn-secondary mt-5">
                      Go to Recipes
                    </button>
                  </Link>
                </div>
                <Footer></Footer>
              </>
            ) : (
              <>
                <div className="h-full flex flex-col justify-between items-center w-full">
                  <p className="text-3xl underline">Favorite Recipes</p>
                  {fav.map((detail: detail) => {
                    return (
                      <>
                        <div className="flex items-start justify-center h-full">
                          <div className="flex justify-center items-center">
                            <button
                              className=" bg-red-600 p-2 rounded-md"
                              onClick={() => {
                                deleteFav(detail.id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4  w-4 text-white "
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                            <div
                              onClick={() => {
                                dispatch(getId(detail.id));
                              }}
                              className="w-full flex justify-center items-start"
                            >
                              <Link to="/detail">
                                <div className="flex justify-start items-start mt-5 text-pretty">
                                  <div className="w-full h-full flex justify-center item-center">
                                    <img
                                      src={detail.image}
                                      alt="food-picture"
                                      className="w-full h-full max-w-5xl rounded-2xl mt-3 ml-3"
                                    />
                                  </div>
                                  <div className="h-full flex flex-col w-full items-center ml-3 text-center">
                                    <p className="mb-4">Name</p>
                                    <p className="text-sm w-full text-balance">
                                      {detail.name.toUpperCase()}
                                    </p>
                                  </div>
                                  <div className="h-full flex flex-col w-full items-center">
                                    <p className="mb-5">Level</p>
                                    <p className="text-sm m-2">
                                      {detail.difficulty.toUpperCase()}
                                    </p>
                                  </div>
                                  <div className="h-full flex flex-col w-full items-center">
                                    <p className="mb-5">Rating</p>
                                    <p>★{detail.rating}</p>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                  <Footer></Footer>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <FavXl></FavXl>
        </>
      )}
    </>
  );
}

export default Fav;
