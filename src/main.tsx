import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Store from "./component/redux/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FoodDetail from "./component/FoodDetail.tsx";
import Fav from "./component/Fav.tsx";
const router = createBrowserRouter([
  {
    path: "/detail",
    element: <FoodDetail></FoodDetail>,
  },
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/fav",
    element: <Fav></Fav>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={Store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
