import axios from "axios";
import "../index.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";
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
  cookTimeMinutes: string;
  prepTimeMinutes: string;
  isFavorite: boolean;
}
function HomeXl() {
  const [recipes, setRecipes] = useState([]);
  const [cuisine, setCuisine] = useState<string[]>([]);
  const [selectCuisine, setSelectCuisine] = useState<string>("");
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [resultSearch, setResultSearch] = useState<detail[]>([]);
  const [search, setSearch] = useState<string>("");
  const [addComplete, setAddComplete] = useState(false);
  const [exist, setExist] = useState(false);
  const [ratingUp, setRatingUp] = useState(false);
  console.log(ratingUp);
  const getData = async () => {
    try {
      const data = await axios.get("https://dummyjson.com/recipes");
      setRecipes(data.data.recipes);
    } catch (error) {
      console.log(error);
    }
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
  const addToFav = async (recipe: detail) => {
    const existingData = localStorage.getItem("recipes");
    let favoriteRecipes = [];
    if (existingData) {
      favoriteRecipes = JSON.parse(existingData);
    }
    const findExist = favoriteRecipes.findIndex(
      (data: detail) => data.id === recipe.id
    );
    if (findExist === -1) {
      favoriteRecipes.push(recipe);
      localStorage.setItem("recipes", JSON.stringify(favoriteRecipes));
      favoriteRecipes.map;
      setAddComplete(true);
      setTimeout(() => {
        setAddComplete(false);
      }, 1000);
    } else {
      setExist(true);
      setTimeout(() => {
        setExist(false);
      }, 1000);
    }
  };
  const sortRatingUp = () => {
    recipes.sort((a: detail, b: detail) => {
      return b.rating - a.rating;
    });
    setRatingUp(true);
  };
  const sortRatingDown = () => {
    recipes.sort((a: detail, b: detail) => {
      return a.rating - b.rating;
    });
    setRatingUp(false);
  };
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
          <div className="w-full flex flex-col items-center justify-start">
            <div className=" flex justify-start items-start mt-5">
              <details className="dropdown ">
                <summary className="m-1 btn bg-slate-300 text-slate-950 font-bold">
                  Cuisine
                </summary>
                <ul className="p-2 shadow menu dropdown-content z-[2] bg-slate-300 text-slate-950 rounded-box w-52">
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
            <label className="form-control w-4/6 max-w-lg mt-3">
              <input
                type="text"
                placeholder="Search Recipes"
                className="input input-bordered w-full "
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
                    <div className="bg-gray-700 text-slate-200 w-4/6 max-w-lg p-5 z-[2] text-center absolute top-52 mt-3 rounded-b-xl">
                      <p>Not Found :(</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-4/6 max-w-lg z-[2] absolute top-52 mt-4 flex flex-col  bg-gray-700 text-slate-200 p-2 pb-5 rounded-b-xl">
                      {resultSearch.map((detail: detail) => {
                        return (
                          <>
                            <div className="collapse bg-base-200 max-w-lg mt-10">
                              <input type="checkbox" />
                              <div className="collapse-title text-xl font-medium h-full">
                                <div className="flex justify-between items-center w-full h-full mt-8 text-pretty">
                                  <div className="w-full h-full">
                                    <img
                                      src={detail.image}
                                      alt="food-picture"
                                      className="w-full max-w-60 rounded-2xl"
                                    />
                                  </div>
                                  <div className="h-full flex flex-col w-full items-center">
                                    <p className="mb-5">Name</p>
                                    <p className="text-xl ml-2 w-6/12 text-balance">
                                      {detail.name.toUpperCase()}
                                    </p>
                                  </div>
                                  <div className="h-full flex flex-col w-full items-center">
                                    <p className="mb-10">Level</p>
                                    <p className="text-xl m-2">
                                      {detail.difficulty.toUpperCase()}
                                    </p>
                                  </div>
                                  <div className="h-full flex flex-col w-full items-center">
                                    <p className="mb-10">Rating</p>
                                    <p>★{detail.rating}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="collapse-content bg-zinc-300 text-slate-950  rounded-xl">
                                <p className="mt-5 text-xl font-bold">
                                  Name : {detail.name}
                                </p>
                                <p className="mt-2 text-2xl font-bold">
                                  Rating : ★{detail.rating}
                                </p>
                                <p className="mt-2 text-2xl font-bold">
                                  Difficulty : {detail.difficulty}
                                </p>
                                <p className="mt-2 text-2xl font-bold">
                                  Cuisine : {detail.cuisine}
                                </p>
                                <p className="mt-2 text-2xl font-bold">
                                  Calories : {detail.caloriesPerServing}
                                </p>
                                <p className="mt-2 text-2xl font-bold">
                                  Prepare Time : {detail.prepTimeMinutes}{" "}
                                  minutes
                                </p>
                                <p className="mt-2 text-2xl font-bold">
                                  Cook Time : {detail.cookTimeMinutes} minutes
                                </p>
                                {detail.tags.map((data) => {
                                  return (
                                    <>
                                      <div className="badge badge-neutral mt-2 p-4 ml-2">
                                        <p className="text-lg ">{data}</p>
                                      </div>
                                    </>
                                  );
                                })}
                                <div className="collapse bg-base-200 mt-3 text-zinc-200">
                                  <input type="checkbox" />
                                  <div className="collapse-title text-xl font-medium">
                                    Ingredients
                                  </div>
                                  <div className="collapse-content">
                                    {detail.ingredients.map((data) => {
                                      return (
                                        <>
                                          <li>{data}</li>
                                        </>
                                      );
                                    })}
                                  </div>
                                </div>
                                <div className="collapse bg-base-200 mt-3 text-zinc-200">
                                  <input type="checkbox" />
                                  <div className="collapse-title text-xl font-medium">
                                    instructions
                                  </div>
                                  <div className="collapse-content">
                                    {detail.instructions.map((data, index) => {
                                      return (
                                        <p>
                                          {index + 1}. {data}
                                        </p>
                                      );
                                    })}
                                  </div>
                                </div>
                                {!addComplete ? (
                                  <>
                                    {!exist ? (
                                      <>
                                        <button
                                          className="btn mt-2 bg-secondary border-none w-full"
                                          onClick={() => {
                                            addToFav({
                                              id: detail.id,
                                              image: detail.image,
                                              name: detail.name,
                                              difficulty: detail.difficulty,
                                              rating: detail.rating,
                                              isFavorite: true,
                                              cuisine: detail.cuisine,
                                              caloriesPerServing:
                                                detail.caloriesPerServing,
                                              ingredients: detail.ingredients,
                                              instructions: detail.instructions,
                                              tags: detail.tags,
                                              cookTimeMinutes:
                                                detail.cookTimeMinutes,
                                              prepTimeMinutes:
                                                detail.prepTimeMinutes,
                                            });
                                          }}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-slate-950"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            />
                                          </svg>
                                          <span className="text-slate-800">
                                            Add to Favorite
                                          </span>
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button className="btn btn-error w-full border-none mt-2">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
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
                                          Already Exist
                                        </button>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="btn mt-2 w-full border-none bg-green-500"
                                      onClick={() => {
                                        addToFav({
                                          id: detail.id,
                                          image: detail.image,
                                          name: detail.name,
                                          difficulty: detail.difficulty,
                                          rating: detail.rating,
                                          isFavorite: true,
                                          cuisine: detail.cuisine,
                                          caloriesPerServing:
                                            detail.caloriesPerServing,
                                          ingredients: detail.ingredients,
                                          instructions: detail.instructions,
                                          tags: detail.tags,
                                          cookTimeMinutes:
                                            detail.cookTimeMinutes,
                                          prepTimeMinutes:
                                            detail.prepTimeMinutes,
                                        });
                                      }}
                                    >
                                      <span className="text-slate-800">
                                        &#x2714; Complete
                                      </span>
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
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
                  <div className="collapse bg-base-200 max-w-3xl mt-10">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium h-full">
                      <div className="flex justify-between items-center w-full h-full mt-8 text-pretty">
                        <div className="w-full h-full">
                          <img
                            src={detail.image}
                            alt="food-picture"
                            className="w-full max-w-60 rounded-2xl"
                          />
                        </div>
                        <div className="h-full flex flex-col w-full items-center">
                          <p className="mb-5">Name</p>
                          <p className="text-xl ml-2 w-6/12 text-balance">
                            {detail.name.toUpperCase()}
                          </p>
                        </div>
                        <div className="h-full flex flex-col w-full items-center">
                          <p className="mb-10">Level</p>
                          <p className="text-xl m-2">
                            {detail.difficulty.toUpperCase()}
                          </p>
                        </div>
                        <div className="h-full flex flex-col w-full items-center">
                          <p className="mb-10">Rating</p>
                          <p>★{detail.rating}</p>
                        </div>
                      </div>
                    </div>
                    <div className="collapse-content bg-zinc-300 text-slate-950  rounded-xl">
                      <p className="mt-5 text-xl font-bold">
                        Name : {detail.name}
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        Rating : ★{detail.rating}
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        Difficulty : {detail.difficulty}
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        Cuisine : {detail.cuisine}
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        Calories : {detail.caloriesPerServing}
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        Prepare Time : {detail.prepTimeMinutes} minutes
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        Cook Time : {detail.cookTimeMinutes} minutes
                      </p>
                      {detail.tags.map((data) => {
                        return (
                          <>
                            <div className="badge badge-neutral mt-2 p-4 ml-2">
                              <p className="text-lg ">{data}</p>
                            </div>
                          </>
                        );
                      })}
                      <div className="collapse bg-base-200 mt-3 text-zinc-200">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">
                          Ingredients
                        </div>
                        <div className="collapse-content">
                          {detail.ingredients.map((data) => {
                            return (
                              <>
                                <li>{data}</li>
                              </>
                            );
                          })}
                        </div>
                      </div>
                      <div className="collapse bg-base-200 mt-3 text-zinc-200">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">
                          instructions
                        </div>
                        <div className="collapse-content">
                          {detail.instructions.map((data, index) => {
                            return (
                              <p>
                                {index + 1}. {data}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                      {!addComplete ? (
                        <>
                          {!exist ? (
                            <>
                              <button
                                className="btn mt-2 bg-secondary border-none w-full"
                                onClick={() => {
                                  addToFav({
                                    id: detail.id,
                                    image: detail.image,
                                    name: detail.name,
                                    difficulty: detail.difficulty,
                                    rating: detail.rating,
                                    isFavorite: true,
                                    cuisine: detail.cuisine,
                                    caloriesPerServing:
                                      detail.caloriesPerServing,
                                    ingredients: detail.ingredients,
                                    instructions: detail.instructions,
                                    tags: detail.tags,
                                    cookTimeMinutes: detail.cookTimeMinutes,
                                    prepTimeMinutes: detail.prepTimeMinutes,
                                  });
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 text-slate-950"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                  />
                                </svg>
                                <span className="text-slate-800">
                                  Add to Favorite
                                </span>
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="btn btn-error w-full border-none mt-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
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
                                Already Exist
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <button
                            className="btn mt-2 w-full border-none bg-green-500"
                            onClick={() => {
                              addToFav({
                                id: detail.id,
                                image: detail.image,
                                name: detail.name,
                                difficulty: detail.difficulty,
                                rating: detail.rating,
                                isFavorite: true,
                                cuisine: detail.cuisine,
                                caloriesPerServing: detail.caloriesPerServing,
                                ingredients: detail.ingredients,
                                instructions: detail.instructions,
                                tags: detail.tags,
                                cookTimeMinutes: detail.cookTimeMinutes,
                                prepTimeMinutes: detail.prepTimeMinutes,
                              });
                            }}
                          >
                            <span className="text-slate-800">
                              &#x2714; Complete
                            </span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <Footer></Footer>
        </>
      ) : (
        <>
          <div className="flex w-full flex-col justify-between items-start h-full">
            <div className="w-full  flex flex-col items-center justify-center">
              <div className=" flex justify-center items-start ">
                <details className="dropdown ">
                  <summary className="m-1 btn bg-slate-300 text-slate-950 font-bold">
                    Cuisine
                  </summary>
                  <ul className="p-2 shadow menu dropdown-content z-[2] bg-slate-300 text-slate-950 rounded-box w-52">
                    {cuisine.map((detail) => {
                      return (
                        <>
                          <li>
                            <p
                              onClick={() => {
                                setSelectCuisine(detail);
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
                <p className=" text-center ml-10 mt-1">
                  <p className="underline">Cuisine</p>
                  {selectCuisine}
                </p>
              </div>
              {filterRecipes.map((detail: detail) => {
                return (
                  <>
                    <div className="collapse bg-base-200 max-w-3xl mt-10">
                      <input type="checkbox" />
                      <div className="collapse-title text-xl font-medium h-full">
                        <div className="flex justify-between items-center w-full h-full mt-8 text-pretty">
                          <div className="w-full h-full">
                            <img
                              src={detail.image}
                              alt="food-picture"
                              className="w-full max-w-60 rounded-2xl"
                            />
                          </div>
                          <div className="h-full flex flex-col w-full items-center">
                            <p className="mb-5">Name</p>
                            <p className="text-xl ml-2 w-6/12 text-balance">
                              {detail.name.toUpperCase()}
                            </p>
                          </div>
                          <div className="h-full flex flex-col w-full items-center">
                            <p className="mb-10">Level</p>
                            <p className="text-xl m-2">
                              {detail.difficulty.toUpperCase()}
                            </p>
                          </div>
                          <div className="h-full flex flex-col w-full items-center">
                            <p className="mb-10">Rating</p>
                            <p>★{detail.rating}</p>
                          </div>
                        </div>
                      </div>
                      <div className="collapse-content bg-zinc-300 text-slate-950  rounded-xl">
                        <p className="mt-5 text-xl font-bold">
                          Name : {detail.name}
                        </p>
                        <p className="mt-2 text-2xl font-bold">
                          Rating : ★{detail.rating}
                        </p>
                        <p className="mt-2 text-2xl font-bold">
                          Difficulty : {detail.difficulty}
                        </p>
                        <p className="mt-2 text-2xl font-bold">
                          Cuisine : {detail.cuisine}
                        </p>
                        <p className="mt-2 text-2xl font-bold">
                          Calories : {detail.caloriesPerServing}
                        </p>
                        <p className="mt-2 text-2xl font-bold">
                          Prepare Time : {detail.prepTimeMinutes} minutes
                        </p>
                        <p className="mt-2 text-2xl font-bold">
                          Cook Time : {detail.cookTimeMinutes} minutes
                        </p>
                        {detail.tags.map((data) => {
                          return (
                            <>
                              <div className="badge badge-neutral mt-2 p-4 ml-2">
                                <p className="text-lg">{data}</p>
                              </div>
                            </>
                          );
                        })}
                        <div className="collapse bg-base-200 mt-3 text-zinc-200">
                          <input type="checkbox" />
                          <div className="collapse-title text-xl font-medium">
                            Ingredients
                          </div>
                          <div className="collapse-content">
                            {detail.ingredients.map((data) => {
                              return (
                                <>
                                  <li>{data}</li>
                                </>
                              );
                            })}
                          </div>
                        </div>
                        <div className="collapse bg-base-200 mt-3 text-zinc-200">
                          <input type="checkbox" />
                          <div className="collapse-title text-xl font-medium">
                            instructions
                          </div>
                          <div className="collapse-content">
                            {detail.instructions.map((data, index) => {
                              return (
                                <p>
                                  {index + 1}. {data}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                        {!addComplete ? (
                          <>
                            {!exist ? (
                              <>
                                <button
                                  className="btn mt-2 bg-secondary border-none w-full"
                                  onClick={() => {
                                    addToFav({
                                      id: detail.id,
                                      image: detail.image,
                                      name: detail.name,
                                      difficulty: detail.difficulty,
                                      rating: detail.rating,
                                      isFavorite: true,
                                      cuisine: detail.cuisine,
                                      caloriesPerServing:
                                        detail.caloriesPerServing,
                                      ingredients: detail.ingredients,
                                      instructions: detail.instructions,
                                      tags: detail.tags,
                                      cookTimeMinutes: detail.cookTimeMinutes,
                                      prepTimeMinutes: detail.prepTimeMinutes,
                                    });
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-slate-950"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                  </svg>
                                  <span className="text-slate-800">
                                    Add to Favorite
                                  </span>
                                </button>
                              </>
                            ) : (
                              <>
                                <button className="btn btn-error w-full border-none mt-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
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
                                  Already Exist
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <button
                              className="btn mt-2 w-full border-none bg-green-500"
                              onClick={() => {
                                addToFav({
                                  id: detail.id,
                                  image: detail.image,
                                  name: detail.name,
                                  difficulty: detail.difficulty,
                                  rating: detail.rating,
                                  isFavorite: true,
                                  cuisine: detail.cuisine,
                                  caloriesPerServing: detail.caloriesPerServing,
                                  ingredients: detail.ingredients,
                                  instructions: detail.instructions,
                                  tags: detail.tags,
                                  cookTimeMinutes: detail.cookTimeMinutes,
                                  prepTimeMinutes: detail.prepTimeMinutes,
                                });
                              }}
                            >
                              <span className="text-slate-800">
                                &#x2714; Complete
                              </span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <Footer></Footer>
          </div>
        </>
      )}
    </>
  );
}
export default HomeXl;
