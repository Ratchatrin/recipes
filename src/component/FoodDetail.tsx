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
}
interface state {
  user: {
    idProduct: number;
  };
}

function FoodDetail() {
  const foodId = useSelector((state: state) => state.user.idProduct);
  const [foodDetail, setFoodDetail] = useState<detail[]>([]);
  const getData = async () => {
    try {
      const data = (await axios.get(`https://dummyjson.com/recipes/${foodId}`))
        .data;
      setFoodDetail([data]);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
            <img src={detail.image} alt="food" className="rounded-2xl" />
            <p className="mt-5">Name : {detail.name}</p>
            <p className="mt-2">Rating : ★{detail.rating}</p>
            <p className="mt-2">Difficulty : {detail.difficulty}</p>
            <p className="mt-2">Cuisine : {detail.cuisine}</p>
            <p className="mt-2">Calories : {detail.caloriesPerServing}</p>
            {detail.tags.map((data) => {
              return (
                <>
                  <div className="badge badge-neutral mt-2 text-m ml-1">
                    <p className="p-1">{data}</p>
                  </div>
                </>
              );
            })}
            <div className="collapse bg-base-200 mt-3">
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
            <div className="collapse bg-base-200 mt-3">
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
