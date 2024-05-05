import { useEffect, useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "./home.css";
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
  cookTimeMinutes: string;
  prepTimeMinutes: string;
  isFavorite: boolean;
}
function FavXl() {
  const [fav, setFav] = useState<detail[]>([]);
  const deleteFav = (id: number) => {
    const result = fav.filter((data: detail) => data.id !== id);
    setFav(result);
    localStorage.setItem("recipes", JSON.stringify(result));
  };
  useEffect(() => {
    const local: string | null = localStorage.getItem("recipes");
    setFav(JSON.parse(local));
  }, []);
  return (
    <>
      <div className="w-full flex flex-col items-center justify-between h-full">
        <Nav></Nav>
        {fav.length === 0 ? (
          <>
            <div className="flex flex-col justify-center items-center h-full w-full">
              <p className="text-2xl  text-slate-300">Empty Favorite Recipe</p>
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
            <div className="h-full w-full flex flex-col justify-between items-center">
              <div className="flex flex-col justify-start  items-center">
                <p className="text-3xl underline mt-10">Favorite Recipes</p>
                {fav.map((detail: detail) => {
                  return (
                    <>
                      <div className="collapse bg-base-200 max-w-3xl mt-7">
                        <div className="flex justify-end ">
                          <button
                            className=" bg-red-600  p-2 rounded-md"
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
                        </div>
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium p-5 h-full">
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
      </div>
    </>
  );
}

export default FavXl;
