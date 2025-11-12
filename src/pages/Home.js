import { SearchBox } from "../components/SearchBox.js";
import { ProductList } from "../components/ProductList.js";

export const Home = () => {
  return /*html*/ `
  <!-- 검색 및 필터 -->
  ${SearchBox()}
  <!-- 상품 목록 -->
  ${ProductList()}
  `;
};
