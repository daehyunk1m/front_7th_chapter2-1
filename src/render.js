/**
 * @param {string} component
 * @param {Router} router
 */
export function render(component, router = null) {
  const $root = document.querySelector("#root");
  $root.innerHTML = component({ router });
}
