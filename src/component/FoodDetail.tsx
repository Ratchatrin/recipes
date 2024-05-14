import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Nav from "./Nav";
import Footer from "./Footer";
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
interface state {
  user: {
    idProduct: number;
  };
}
function FoodDetail() {
  const foodId = useSelector((state: state) => state.user.idProduct);
  const [foodDetail, setFoodDetail] = useState<detail[]>([]);
  const [addComplete, setAddComplete] = useState(false);
  const [exist, setExist] = useState(false);
  const getData = async () => {
    try {
      const data = (await axios.get(`https://dummyjson.com/recipes/${foodId}`))
        .data;
      setFoodDetail([data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
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
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      <Nav></Nav>
      {foodDetail.map((detail: detail) => {
        return (
          <div className="w-11/12">
            <div className="text-center">
              {!addComplete ? (
                <>
                  {!exist ? (
                    <>
                      <button
                        className="btn m-2 bg-secondary"
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
                        <span className="text-slate-800">Add to Favorite</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-error m-2">
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
                    className="btn m-2 bg-green-500"
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
                      });
                    }}
                  >
                    <span className="text-slate-800"> &#x2714; Complete</span>
                  </button>
                </>
              )}
              <img src={detail.image} alt="food" className="rounded-2xl" />
            </div>
            <p className="mt-5">Name : {detail.name}</p>
            <p className="mt-2">Rating : ★{detail.rating}</p>
            <p className="mt-2">Difficulty : {detail.difficulty}</p>
            <p className="mt-2">Cuisine : {detail.cuisine}</p>
            <p className="mt-2">Calories : {detail.caloriesPerServing}</p>
            {detail.tags.map((data) => {
              return (
                <>
                  <div className="badge badge-neutral mt-2 text-m ml-1 p-3 text-slate-200">
                    <p className="p-1">{data}</p>
                  </div>
                </>
              );
            })}
            <div className="collapse bg-slate-200 mt-3 text-slate-950">
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
            <div className="collapse bg-slate-200 mt-3 text-slate-950">
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
        );
      })}
      <Footer></Footer>
    </div>
  );
}

export default FoodDetail;
