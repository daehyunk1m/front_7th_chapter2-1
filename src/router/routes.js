import { Home } from "../pages/Home.js";
import { NotFound } from "../pages/NotFound.js";
import { ProductDetail } from "../pages/ProductDetail.js";

export const routes = [
  { path: "/", name: "home", render: Home },
  { path: "/product/:id", name: "product", render: ProductDetail },
  { path: "*", name: "notFound", render: NotFound },
];
