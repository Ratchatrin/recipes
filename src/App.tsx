import axios from "axios";
import Nav from "./component/Nav";
import "./index.css";
import { useEffect, useState } from "react";
import Footer from "./component/Footer";
import { useDispatch } from "react-redux";
import { getId } from "./component/redux/slicer";
import { Link } from "react-router-dom";
import HomeXl from "./component/HomeXl";
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
}
function App() {
  const [recipes, setRecipes] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cuisine, setCuisine] = useState<string[]>([]);
  const [selectCuisine, setSelectCuisine] = useState<string>("");
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const data = await axios.get("https://dummyjson.com/recipes");
      setRecipes(data.data.recipes);
    } catch (error) {
      console.log(error);
    }
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
  return (
    <div className="flex flex-col justify-between items-center h-full w-full">
      <div
        onClick={() => {
          setShowFilter(false);
        }}
      >
        <Nav></Nav>
      </div>

      {windowWidth < 1024 ? (
        <>
          {!showFilter ? (
            <>
              <div className="w-full flex flex-col items-center justify-center">
                <div className=" flex justify-start items-start ">
                  <details className="dropdown ">
                    <summary className="m-1 btn bg-slate-400 text-slate-950">
                      Sort By Cuisine
                    </summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-slate-400 text-slate-950 rounded-box w-52">
                      {cuisine.map((detail) => {
                        return (
                          <>
                            <li>
                              <p
                                onClick={() => {
                                  setSelectCuisine(detail);
                                  setShowFilter(!showFilter);
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
                </div>
                {recipes.map((detail: detail) => {
                  return (
                    <div
                      onClick={() => {
                        dispatch(getId(detail.id));
                      }}
                      className="w-10/12 flex justify-center items-center"
                    >
                      <Link to="/detail">
                        <div className="flex justify-start items-start mt-8 text-pretty">
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
                  );
                })}
              </div>
            </>
          ) : (
            <div className="h-fit flex flex-col">
              <div className=" w-full flex justify-between items-center ">
                <details className="dropdown ml-6">
                  <summary className="m-1 btn bg-slate-400 text-slate-950">
                    Sort By Cuisine
                  </summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] bg-slate-400 text-slate-950 rounded-box w-52">
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
                <p className=" text-center mr-8">
                  <p className="underline">Cuisine</p>
                  {selectCuisine}
                </p>
              </div>
              <div className="w-full  flex flex-col items-center justify-center">
                {filterRecipes.map((detail: detail) => {
                  return (
                    <div
                      onClick={() => {
                        dispatch(getId(detail.id));
                      }}
                      className="w-10/12 flex justify-center items-center  "
                    >
                      <Link to="/detail">
                        <div className="flex justify-start items-start mt-8 text-pretty">
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
                  );
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <HomeXl></HomeXl>
        </>
      )}
      <Footer></Footer>
    </div>
  );
}
export default App;
