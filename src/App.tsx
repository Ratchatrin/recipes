import axios from "axios";
import Nav from "./component/Nav";
import "./index.css";
import { useEffect, useState } from "react";
import Footer from "./component/Footer";
import { useDispatch } from "react-redux";
import { getId } from "./component/redux/slicer";
import { Link } from "react-router-dom";
import HomeXl from "./component/HomeXl";
import "./component/home.css";
interface detail {
  id: number;
  image: string;
  name: string;
  rating: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  isFavorite: boolean;
}
function App() {
  const [recipes, setRecipes] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cuisine, setCuisine] = useState<string[]>([]);
  const [selectCuisine, setSelectCuisine] = useState<string>("");
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [resultSearch, setResultSearch] = useState<detail[]>([]);
  const [ratingUp, setRatingUp] = useState(false);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const data = await axios.get("https://dummyjson.com/recipes");
      setRecipes(data.data.recipes);
    } catch (error) {
      console.log(error);
    }
  };
  const sortRatingUp = () => {
    recipes.sort((a: detail, b: detail) => {
      return b.rating - a.rating;
    });
    setRatingUp(true);
    console.log(ratingUp);
  };
  const sortRatingDown = () => {
    recipes.sort((a: detail, b: detail) => {
      return a.rating - b.rating;
    });
    setRatingUp(false);
    console.log(ratingUp);
  };
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    const filter = recipes.map((detail: detail) => {
      return detail.cuisine;
    });
    setCuisine(() => {
      return [...new Set(filter)];
    });
  }, [recipes]);
  useEffect(() => {
    const filter = recipes.filter((detail: detail) => {
      return detail.cuisine === selectCuisine;
    });
    setFilterRecipes(filter);
  }, [recipes, selectCuisine]);
  window.addEventListener("resize", updateWindowWidth);
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setResultSearch([]);
    recipes.map((detail: detail) => {
      detail.tags.map((tag) => {
        if (tag.toLocaleLowerCase() === search) {
          setResultSearch((result) => {
            return [...result, detail];
          });
        }
      });
    });
  }, [recipes, search]);
  return (
    <div className="h-full flex flex-col justify-start items-center">
      {windowWidth < 1024 ? (
        <>
          <div
            onClick={() => {
              setShowFilter(false);
            }}
          >
            <Nav></Nav>
          </div>
          {!showFilter ? (
            <>
              <div className="w-11/12 flex flex-col items-center justify-center">
                <div className=" flex justify-start items-start ">
                  <details className="dropdown ">
                    <summary className="m-1 btn bg-slate-300 text-slate-950 font-bold">
                      Cuisine
                    </summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-slate-300 text-slate-950 rounded-box w-52">
                      {cuisine.map((detail) => {
                        return (
                          <>
                            <li>
                              <p
                                onClick={() => {
                                  setSelectCuisine(detail);
                                  setShowFilter(!showFilter);
                                }}
                                className="font-bold"
                              >
                                {detail}
                              </p>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </details>
                  <Link to="/fav">
                    <button className="btn btn-active btn-secondary m-1">
                      Favorite Recipe
                    </button>
                  </Link>
                </div>
                <label className="form-control w-full max-w-xs mt-3">
                  <input
                    type="text"
                    placeholder="Search Recipes"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(ev) => {
                      setSearch(ev.target.value);
                    }}
                  />
                </label>
                {search === "" ? (
                  <></>
                ) : (
                  <>
                    {resultSearch.length === 0 ? (
                      <>
                        <div className="bg-gray-700 text-slate-200 w-11/12 p-5 text-center absolute top-40 mt-3 rounded-b-xl">
                          <p>Not Found :(</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-11/12  z-0 absolute top-40 mt-3 flex flex-col  bg-gray-700 text-slate-200 p-2 pb-5 rounded-b-xl">
                          {resultSearch.map((result: detail) => {
                            return (
                              <>
                                <Link to="/detail">
                                  <div
                                    onClick={() => {
                                      dispatch(getId(result.id));
                                    }}
                                    className="flex justify-start items-start mt-5 text-pretty "
                                  >
                                    <div className="w-full flex justify-center item-center">
                                      <img
                                        src={result.image}
                                        alt="food-picture"
                                        className="w-full h-full max-w-5xl rounded-2xl mt-3"
                                      />
                                    </div>
                                    <div className="h-full flex flex-col w-full items-center ml-3 text-center">
                                      <p className="mb-5">Name</p>
                                      <p className="text-sm w-full text-balance">
                                        {result.name.toUpperCase()}
                                      </p>
                                    </div>
                                    <div className="h-full flex flex-col w-full items-center">
                                      <p className="mb-5">Level</p>
                                      <p className="text-sm m-2">
                                        {result.difficulty.toUpperCase()}
                                      </p>
                                    </div>
                                    <div className="h-full flex flex-col w-full items-center">
                                      <p className="mb-5">Rating</p>
                                      <p>★{result.rating}</p>
                                    </div>
                                  </div>
                                </Link>
                              </>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </>
                )}
                <div className="w-full text-center mt-5">
                  <details className="dropdown">
                    <summary className="m-1 btn">Sort By Rating</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[2] bg-base-100 rounded-box w-52">
                      <li onClick={sortRatingUp}>
                        <a> Rating &uarr;</a>
                      </li>
                      <li onClick={sortRatingDown}>
                        <a>Rating &darr;</a>
                      </li>
                    </ul>
                  </details>
                </div>
                {recipes.map((detail: detail) => {
                  return (
                    <>
                      <div
                        onClick={() => {
                          dispatch(getId(detail.id));
                        }}
                        className="w-full flex justify-center items-center"
                      >
                        <Link to="/detail">
                          <div className="flex justify-start items-start mt-5 text-pretty">
                            <div className="w-full h-full flex justify-center item-center">
                              <img
                                src={detail.image}
                                alt="food-picture"
                                className="w-full h-full max-w-5xl rounded-2xl mt-3"
                              />
                            </div>
                            <div className="h-full flex flex-col w-full items-center ml-3 text-center">
                              <p className="mb-5">Name</p>
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
                    </>
                  );
                })}
              </div>
              <Footer></Footer>
            </>
          ) : (
            <div className="w-full flex justify-start items-start h-full flex-col">
              <div className=" w-full flex justify-center items-center ">
                <div className="flex ">
                  <details className="dropdown">
                    <summary className="m-1 btn bg-slate-300 text-slate-950">
                      Cuisine
                    </summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-slate-300 text-slate-950 rounded-box w-52">
                      {cuisine.map((detail) => {
                        return (
                          <>
                            <li>
                              <p
                                onClick={() => {
                                  setSelectCuisine(detail);
                                }}
                              >
                                {detail}
                              </p>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </details>
                  <Link to="/fav">
                    <button className="btn btn-active btn-secondary m-1 w-24">
                      Favorite Recipe
                    </button>
                  </Link>
                </div>
                <p className=" text-center ml-6">
                  <p className="underline">Cuisine</p>
                  {selectCuisine}
                </p>
              </div>
              <div className="w-full  flex flex-col items-center justify-start h-full">
                {filterRecipes.map((detail: detail) => {
                  return (
                    <div
                      onClick={() => {
                        dispatch(getId(detail.id));
                      }}
                      className="w-11/12 flex justify-center items-center  "
                    >
                      <Link to="/detail">
                        <div className="flex justify-start items-start mt-5 text-pretty">
                          <div className="w-full h-full flex justify-center item-center">
                            <img
                              src={detail.image}
                              alt="food-picture"
                              className="w-full h-full max-w-5xl rounded-2xl mt-3"
                            />
                          </div>
                          <div className="h-full flex flex-col w-full items-center ml-3 text-center">
                            <p className="mb-2">Name</p>
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
                  );
                })}
              </div>
              <Footer></Footer>
            </div>
          )}
        </>
      ) : (
        <>
          <HomeXl></HomeXl>
        </>
      )}
    </div>
  );
}
export default App;
