import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Store from "./component/redux/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FoodDetail from "./component/FoodDetail.tsx";
const router = createBrowserRouter([
  {
    path: "/detail",
    element: <FoodDetail></FoodDetail>,
  },
  {
    path: "/recipe",
    element: <App></App>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={Store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
