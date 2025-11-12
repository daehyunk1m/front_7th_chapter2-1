import { Header } from "./components/Header.js";
// import { Routes } from "./router/routes.js";

import { Footer } from "./components/Footer.js";

/**
 * @param {{ router: Router }} props
 */
export default function App({ router }) {
  // 비동기 데이터 처리

  // 현재 라우트
  const { path, render } = router.getCurrentRoute();
  // const params = router.getParams();
  // const content = route ? route.render(params) : "";
  console.log(router.getParams());
  return /*html*/ `
    <div class="min-h-screen bg-gray-50"> 
      ${Header({ path })}
      <main class="max-w-md mx-auto px-4 py-4">
        ${render()}
      </main>
      ${Footer()}
    </div>
  `;
}
