import axios from "axios";
import "../index.css";
import { useEffect, useState } from "react";
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
}
function HomeXl() {
  const [recipes, setRecipes] = useState([]);
  const [cuisine, setCuisine] = useState<string[]>([]);
  const [selectCuisine, setSelectCuisine] = useState<string>("");
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
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

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {!showFilter ? (
        <>
          <div className="w-full flex flex-col items-center justify-center">
            <div className="collapse bg-base-200 w-7/12 text-center mt-10 ">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Sort By Cuisine
              </div>
              <div className="collapse-content grid grid-cols-4">
                {cuisine.map((detail) => {
                  return (
                    <>
                      <p
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectCuisine(detail);
                          setShowFilter(!showFilter);
                        }}
                      >
                        {detail}
                      </p>
                    </>
                  );
                })}
              </div>
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
                              <p
                                className="text-lg
                          "
                              >
                                {data}
                              </p>
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
        </>
      ) : (
        <>
          <div className="w-full  flex flex-col items-center justify-center">
            <div className="collapse bg-base-200 w-7/12 text-center mt-10 ">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Sort By Cuisine
              </div>
              <div className="collapse-content grid grid-cols-4">
                {cuisine.map((detail) => {
                  return (
                    <>
                      <p
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectCuisine(detail);
                        }}
                      >
                        {detail}
                      </p>
                    </>
                  );
                })}
              </div>
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
                              <p
                                className="text-lg
                          "
                              >
                                {data}
                              </p>
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
        </>
      )}
    </>
  );
}
export default HomeXl;
