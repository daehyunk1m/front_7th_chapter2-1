import { Loading } from "./Loading";
import { ProductSkeleton } from "./ProductSkeleton";

export const ProductList = () => {
  // 리스트 로직
  // const products = [];

  // use intersection observer to infinite scroll
  const isLoading = true;

  return /*html*/ `
  <div class="mb-6">
    <div>
      <!-- 상품 그리드 -->
      ${ProductList.Container({
        children: /*html*/ `
        
        ${
          isLoading ? ProductSkeleton({ length: 4 }) : "<div>상품</div>"
          // : products.map((product) => {
          //     console.log(product);
          //     return "<div>상품</div>";
          //   })
        }
        `,
      })}
      ${isLoading ? Loading() : ""}
    </div>
  </div>
  `;
};

ProductList.Container = ({ children }) => {
  return /*html*/ `
  <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
    ${children}
  </div>
  `;
};
