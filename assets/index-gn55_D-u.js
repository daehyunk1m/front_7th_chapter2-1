var e=function(exports){function t(e,t){if(t.has(e))throw TypeError(`Cannot initialize the same private elements twice on an object`)}function n(e,n){t(e,n),n.add(e)}function r(e,t,n){if(typeof e==`function`?e===t:e.has(t))return arguments.length<3?t:n;throw TypeError(`Private element is not present on this object`)}return exports.assertClassBrand=r,exports.classPrivateMethodInitSpec=n,exports}({}),t;(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const n=`modulepreload`,r=function(e){return`/front_7th_chapter2-1/`+e},i={},a=function(e,t,a){let o=Promise.resolve();if(t&&t.length>0){let e=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))},s=document.getElementsByTagName(`link`),c=document.querySelector(`meta[property=csp-nonce]`),l=c?.nonce||c?.getAttribute(`nonce`);o=e(t.map(e=>{if(e=r(e,a),e in i)return;i[e]=!0;let t=e.endsWith(`.css`),o=t?`[rel="stylesheet"]`:``,c=!!a;if(c)for(let n=s.length-1;n>=0;n--){let r=s[n];if(r.href===e&&(!t||r.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${e}"]${o}`))return;let u=document.createElement(`link`);if(u.rel=t?`stylesheet`:n,t||(u.as=`script`),u.crossOrigin=``,u.href=e,l&&u.setAttribute(`nonce`,l),document.head.appendChild(u),t)return new Promise((t,n)=>{u.addEventListener(`load`,t),u.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${e}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(t=>{for(let e of t||[]){if(e.status!==`rejected`)continue;s(e.reason)}return e().catch(s)})};async function o(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}async function s(e){let t=await fetch(`/api/products/${e}`);return await t.json()}async function c(){let e=await fetch(`/api/categories`);return await e.json()}const l={categories:new Map,products:[],selectedProduct:{title:``,link:``,image:``,lprice:``,hprice:``,mallName:``,productId:``,productType:``,brand:``,maker:``,category1:``,category2:``,category3:``,category4:``,description:``,rating:0,reviewCount:0,stock:0,images:[]},filters:{search:``,category1:``,category2:``,sort:`price_asc`},pagination:{page:1,limit:20,total:0,totalPages:0,hasNext:!1,hasPrev:!1},isLoading:!1,cart:{isOpen:!1,selectedAll:!1,quantity:1,list:new Map},toast:{isOpen:!1,type:`success`},isError:!1},u=()=>{let e={...l},t=new Set,n=t=>t?e[t]:e,r=n=>{e={...e,...n},console.log(e),t.forEach(t=>t(e))},i=e=>(t.add(e),()=>{t.delete(e)});return{getState:n,setState:r,subscribe:i}},d=u();let f=[],p=!1,m=new WeakMap,h=new WeakMap;const g=(e,t)=>{f.push({callback:e,dependencies:t})},_=()=>{p||(p=!0,Promise.resolve().then(()=>{let e=[...f];f=[],e.forEach(({callback:e,dependencies:t})=>{let n=m.get(e),r=!n||!t||t.length!==n.length||t.some((e,t)=>e!==n[t]);if(r){let n=h.get(e);n&&n();let r=e();typeof r==`function`&&h.set(e,r),m.set(e,t)}}),p=!1}))},v=()=>{let{categories:e}=d.getState();e.size===0&&(d.setState({isLoading:!0}),c().then(e=>{let t=new Map;Object.entries(e).forEach(([e,n])=>{let r=Object.keys(n);t.set(e,r)}),d.setState({categories:t,isLoading:!1})}))},y=()=>{let{isLoading:e,products:t}=d.getState(),n=new Set(t.map(e=>e.category1));return g(v,[]),`
  <div class="space-y-3">
      <!-- 카테고리 필터 -->
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-600">카테고리:</label>
          ${y.Breadcrumb()}
        </div>
        <!-- 1depth 카테고리 -->
        <div class="flex flex-wrap gap-2">
        ${e?`<div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>`:[...n,`디지털/가전`].map(e=>y.Category1(e)).join(``)}
        </div>
        <!-- 2depth 카테고리 -->
      </div>
      <!-- 기존 필터들 -->
      <div class="flex gap-2 items-center justify-between">
        <!-- 페이지당 상품 수 -->
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-600">개수:</label>
          ${y.Limit()}
        </div>
        <!-- 정렬 -->
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-600">정렬:</label>
          ${y.Sort()}
        </div>
      </div>
    </div>
  `};y.Breadcrumb=()=>`
  <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
  `,y.Category1=e=>`
  <button data-category1="${e}" class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
      bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
    ${e}
  </button>
  `,y.Limit=()=>{let e=d.getState(`pagination`),t=[10,20,50,100];return`
  <select id="limit-select"
          class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
          ${t.map(t=>`
            <option value="${t}" ${t===e.limit?`selected`:``}>
              ${t}개
            </option>
            `).join(``)}
  </select>
  `},y.Sort=()=>{let{sort:e}=d.getState(`filters`),t={price_asc:`가격 낮은순`,price_desc:`가격 높은순`,name_asc:`이름순`,name_desc:`이름 역순`};return`
  <select id="sort-select" class="text-sm border border-gray-300 rounded px-2 py-1
                focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
    ${Object.entries(t).map(([t,n])=>`
        <option value="${t}" ${t===e?`selected`:``}>
          ${n}
        </option>
        `).join(``)}
  </select>
  `};const b=()=>`
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
    <!-- 검색창 -->
    <div class="mb-4">
      ${b.InputBox()}
    </div>
    <!-- 필터 옵션 -->
    ${y()}
  </div>
  `;b.InputBox=()=>`
  <div class="relative">
    <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
  </div>
  `;const x=()=>{let{hasNext:e}=d.getState(`pagination`),t=e?`text-center py-4`:`text-center py-4 text-sm text-gray-500`;return`
    <div class="${t}">
      ${e?x.HasNext():`모든 상품을 확인했습니다`}
    </div>
  `};x.HasNext=()=>`
  <div class="inline-flex items-center">
    <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
  </div>
  `;const S=({length:e=1})=>`
  <!-- 로딩 스켈레톤 -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div class="aspect-square bg-gray-200"></div>
      <div class="p-3">
        <div class="h-4 bg-gray-200 rounded mb-2"></div>
        <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div class="h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  `.repeat(e),C=()=>{let{products:e}=d.getState();return e.map(e=>`
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
        data-product-id="${e.productId}">
      <!-- 상품 이미지 -->
      <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
        <img src="${e.image}" alt="${e.title}"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              loading="lazy">
      </div>
      <!-- 상품 정보 -->
      <div class="p-3">
        <div class="cursor-pointer product-info mb-3">
          <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
            ${e.title}
          </h3>
          <p class="text-xs text-gray-500 mb-2"></p>
          <p class="text-lg font-bold text-gray-900">
            ${e.lprice}
          </p>
        </div>
        <!-- 장바구니 버튼 -->
        <button class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
                hover:bg-blue-700 transition-colors add-to-cart-btn" data-product-id="${e.productId}">
          장바구니 담기
        </button>
      </div>
    </div>
    `).join(``)},w=()=>{let{products:e,isLoading:t,pagination:{hasNext:n,total:r}}=d.getState();return`
  <div class="mb-6">
    <div>
    <!-- 상품 개수 정보 -->
    ${e.length>0?w.TotalCount({total:r}):``}
      <!-- 상품 그리드 -->
      ${w.Container({children:`
        ${t&&e.length===0?S({length:4}):C()}
        `})}
      ${t||!n?x():``}
    </div>
  </div>
  `};w.Container=({children:e})=>`
  <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
    ${e}
  </div>
  `,w.TotalCount=({total:e})=>`
  <div class="mb-4 text-sm text-gray-600">
    총 <span class="font-medium text-gray-900">${e}개</span>의 상품
  </div>
  `;const T=()=>{let{products:e,isLoading:t,isError:n}=d.getState();return g(()=>{e.length===0&&!t&&(d.setState({isLoading:!0}),o().then(e=>{d.setState({...e,isLoading:!1})}).catch(()=>{d.setState({isError:!0,isLoading:!1,toast:{isOpen:!0,type:`error`}})}))},[]),`
  <!-- 검색 및 필터 -->
  ${b()}
  <!-- 상품 목록 -->
  ${n?`
      <div class="text-center py-8">
      <div class="text-600 mb-4">오류가 발생했습니다.</div>
      <button id="retry-fetch-btn" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">다시 시도</button>
      </div>`:w()}
  `},E=()=>`
    <div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
      <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4285f4;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:1" />
          </linearGradient>
          <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000000" flood-opacity="0.1"/>
          </filter>
        </defs>
        
        <!-- 404 Numbers -->
        <text x="160" y="85" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="48" font-weight="600" fill="url(#blueGradient)" text-anchor="middle">404</text>
        
        <!-- Icon decoration -->
        <circle cx="80" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
        <circle cx="240" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
        <circle cx="90" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
        <circle cx="230" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
        
        <!-- Message -->
        <text x="160" y="110" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="14" font-weight="400" fill="#5f6368" text-anchor="middle">페이지를 찾을 수 없습니다</text>
        
        <!-- Subtle bottom accent -->
        <rect x="130" y="130" width="60" height="2" rx="1" fill="url(#blueGradient)" opacity="0.3"/>
      </svg>
      
      <a href="/" data-link class="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">홈으로</a>
    </div>
  `,D=()=>{let e=d.getState(`isLoading`);return`
  ${e?D.Loading():D.Container()}
  `};D.Loading=()=>`
  <div class="py-20 bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">상품 정보를 불러오는 중...</p>
    </div>
  </div>
  `,D.Container=()=>`
  <!-- 브레드크럼 -->
  ${D.Breadcrumb()}
  <!-- 상품 상세 정보 -->
  ${D.Item()}
    <!-- 수량 선택 및 액션 -->
    ${D.Cart()}
  <!-- 상품 목록으로 이동 -->
  <div class="mb-6">
    <button class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md 
      hover:bg-gray-200 transition-colors go-to-product-list">
      상품 목록으로 돌아가기
    </button>
  </div>
  <!-- 관련 상품 -->
  ${D.RelatedProducts()}
  `,D.Breadcrumb=()=>{let{category1:e,category2:t}=d.getState(`selectedProduct`);return`
  <nav class="mb-4">
    <div class="flex items-center space-x-2 text-sm text-gray-600">
      <a href="/" data-link="" class="hover:text-blue-600 transition-colors">홈</a>
      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
      <button class="breadcrumb-link" data-category1="${e}">
        ${e}
      </button>
      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
      <button class="breadcrumb-link" data-category2="${t}">
        ${t}
      </button>
    </div>
  </nav>
  `},D.Item=()=>{let{title:e,image:t,lprice:n,brand:r,description:i,rating:a,reviewCount:o,stock:s}=d.getState(`selectedProduct`);return`
  <div class="bg-white rounded-lg shadow-sm mb-6">
    <!-- 상품 이미지 -->
    <div class="p-4">
      <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img src="${t}" alt="${e}" class="w-full h-full object-cover product-detail-image">
      </div>
      <!-- 상품 정보 -->
      <div>
        <p class="text-sm text-gray-600 mb-1">${r}</p>
        <h1 class="text-xl font-bold text-gray-900 mb-3">${e}</h1>
        <!-- 평점 및 리뷰 -->
        <div class="flex items-center mb-3">
          <div class="flex items-center">
            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
          <span class="ml-2 text-sm text-gray-600">${a} (${o}개 리뷰)</span>
        </div>
        <!-- 가격 -->
        <div class="mb-4">
          <span class="text-2xl font-bold text-blue-600">${n.toLocaleString(`ko-KR`)}원</span>
        </div>
        <!-- 재고 -->
        <div class="text-sm text-gray-600 mb-4">
          재고 ${s}개
        </div>
        <!-- 설명 -->
        <div class="text-sm text-gray-700 leading-relaxed mb-6">${i}</div>
      </div>
    </div>
  `},D.Cart=()=>{let{productId:e}=d.getState(`selectedProduct`),{quantity:t}=d.getState(`cart`);return`
  <div class="border-t border-gray-200 p-4">
      <div class="flex items-center justify-between mb-4">
        <span class="text-sm font-medium text-gray-900">수량</span>
        <div class="flex items-center">
          <button id="quantity-decrease" class="w-8 h-8 flex items-center justify-center border border-gray-300 
              rounded-l-md bg-gray-50 hover:bg-gray-100">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
            </svg>
          </button>
          <input type="number" id="quantity-input" value="${t}" min="1" max="107" class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 
            focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
          <button id="quantity-increase" class="w-8 h-8 flex items-center justify-center border border-gray-300 
              rounded-r-md bg-gray-50 hover:bg-gray-100">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
      </div>
      <!-- 액션 버튼 -->
      <button id="add-to-cart-btn" data-product-id="${e}" class="w-full bg-blue-600 text-white py-3 px-4 rounded-md 
            hover:bg-blue-700 transition-colors font-medium">
        장바구니 담기
      </button>
    </div>
  </div>
  `},D.RelatedProducts=()=>{let e=[];return`
  <div class="bg-white rounded-lg shadow-sm">
    <div class="p-4 border-b border-gray-200">
      <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
      <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
    </div>
    <div class="p-4">
      <div class="grid grid-cols-2 gap-3 responsive-grid">
        ${e.length>0?e.map(e=>D.RelatedItem(e)).join(``):`관련 상품이 없습니다.`}
      </div>
    </div>
  </div>
  `},D.RelatedItem=e=>{let{productId:t,title:n,image:r,lprice:i}=e;return`
  <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="${t}">
    <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
      <img src="${r}" alt="${n}" class="w-full h-full object-cover" loading="lazy">
    </div>
    <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">${n}</h3>
    <p class="text-sm font-bold text-blue-600">${i}원</p>
  </div>
  `};const O=[{path:`/`,name:`home`,render:T},{path:`/product/:id`,name:`product`,render:D},{path:`*`,name:`notFound`,render:E}];var k=(t=new WeakSet,class{constructor(n=[]){e.classPrivateMethodInitSpec(this,t),this.routes=n,this.basePath=`/front_7th_chapter2-1/`,this.currentRoute=null,this.params={},this.queryParams={}}init(n){this.renderCallback=n,window.addEventListener(`popstate`,()=>{e.assertClassBrand(t,this,A).call(this)}),document.addEventListener(`click`,e=>{let t=e.target.closest(`a[data-link]`);t&&(e.preventDefault(),this.navigate(t.href))})}navigate(n,r={}){let{replace:i=!1}=r,a=this.basePath===`/`?n:this.basePath+n;i?window.history.replaceState(null,``,a):window.history.pushState(null,``,a),e.assertClassBrand(t,this,A).call(this)}getCurrentRoute(){let n=this.getPath(),r=e.assertClassBrand(t,this,j).call(this,n),i=this.routes.find(e=>e.path===`*`);return r??i}getPath(){let e=window.location.pathname;return e.startsWith(this.basePath)&&(e=e.slice(this.basePath.length)||`/`),e.startsWith(`/`)?e:`/`+e}getParams(){return this.params}getQueryParams(){let e=new URLSearchParams(window.location.search),t={};for(let[n,r]of e)t[n]=r;return t}});function A(){var e;let t=this.getCurrentRoute();if(!t)throw Error(`Not Found Route`);this.currentRoute=t,(e=this.renderCallback)?.call(this)}function j(n){for(let r of this.routes){if(r.path===n)return this.params={},r;if(r.path.includes(`:`)){let i=e.assertClassBrand(t,this,M).call(this,r.path),a=n.match(i);if(a)return this.params=e.assertClassBrand(t,this,N).call(this,r.path,a),r}}}function M(e){let t=e.replace(/\//g,`\\/`).replace(/:\w+/g,`([^\\/]+)`);return RegExp(`^${t}$`)}function N(e,t){let n={},r=e.match(/:\w+/g)||[];return r.forEach((e,r)=>{let i=e.slice(1);n[i]=t[r+1]}),n}const P=new k(O),F=({path:e})=>{let t=e.includes(`/product/`);return`
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-md mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          ${I({isDetail:t})}
          <div class="flex items-center space-x-2">
            <!-- 장바구니 아이콘 -->
            ${L()}
          </div>
        </div>
      </div>
    </header>
  `},I=({isDetail:e=!1})=>e?`
    <div class="flex items-center space-x-3">
    <button id="back-btn" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>
    <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
  </div>
  `:`
  <h1 class="text-xl font-bold text-gray-900">
    <a href=/front_7th_chapter2-1/ data-link="">쇼핑몰</a>
  </h1>
  `,L=()=>{let{list:e}=d.getState(`cart`);return`
    <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors" data-link="/cart">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
      </svg>
      ${e.size>0?`
      <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        ${e.size}
      </span>
      `:``}
    </button>
  `},R=()=>`
  <div class="fixed inset-0 z-50 overflow-y-auto cart-modal">
      <!-- 배경 오버레이 -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity cart-modal-overlay"></div>
      <!-- 모달 컨테이너 -->
      ${R.Contents()}
    </div>
  `;R.Contents=()=>`
    <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
      <div class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">
        <!-- 헤더 -->
        <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
            </svg>
            장바구니
            <span class="text-sm font-normal text-gray-600 ml-1">(2)</span>
          </h2>
          <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <!-- 컨텐츠 -->
        <div class="flex flex-col max-h-[calc(90vh-120px)]">
          <!-- 전체 선택 섹션 -->
          <div class="p-4 border-b border-gray-200 bg-gray-50">
            <label class="flex items-center text-sm text-gray-700">
              <input type="checkbox" id="cart-modal-select-all-checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2">
              전체선택 (2개)
            </label>
          </div>
          <!-- 아이템 목록 -->
          <div class="flex-1 overflow-y-auto">
            <div class="p-4 space-y-4">
              <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="85067212996">
                <!-- 선택 체크박스 -->
                <label class="flex items-center mr-3">
                  <input type="checkbox" checked="" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                focus:ring-blue-500" data-product-id="85067212996">
                </label>
                <!-- 상품 이미지 -->
                <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img src="https://shopping-phinf.pstatic.net/main_8506721/85067212996.1.jpg" alt="PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="85067212996">
                </div>
                <!-- 상품 정보 -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="85067212996">
                    PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">
                    220원
                  </p>
                  <!-- 수량 조절 -->
                  <div class="flex items-center mt-2">
                    <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                  border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="85067212996">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input type="number" value="2" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" disabled="" data-product-id="85067212996">
                    <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                  border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="85067212996">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- 가격 및 삭제 -->
                <div class="text-right ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    440원
                  </p>
                  <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="85067212996">
                    삭제
                  </button>
                </div>
              </div>
              <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="86940857379">
                <!-- 선택 체크박스 -->
                <label class="flex items-center mr-3">
                  <input type="checkbox" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                focus:ring-blue-500" data-product-id="86940857379">
                </label>
                <!-- 상품 이미지 -->
                <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img src="https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg" alt="샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="86940857379">
                </div>
                <!-- 상품 정보 -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="86940857379">
                    샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">
                    230원
                  </p>
                  <!-- 수량 조절 -->
                  <div class="flex items-center mt-2">
                    <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                  border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="86940857379">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input type="number" value="1" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" disabled="" data-product-id="86940857379">
                    <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                  border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="86940857379">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- 가격 및 삭제 -->
                <div class="text-right ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    230원
                  </p>
                  <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="86940857379">
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 하단 액션 -->
        <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <!-- 선택된 아이템 정보 -->
          <div class="flex justify-between items-center mb-3 text-sm">
            <span class="text-gray-600">선택한 상품 (1개)</span>
            <span class="font-medium">440원</span>
          </div>
          <!-- 총 금액 -->
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-bold text-gray-900">총 금액</span>
            <span class="text-xl font-bold text-blue-600">670원</span>
          </div>
          <!-- 액션 버튼들 -->
          <div class="space-y-2">
            <button id="cart-modal-remove-selected-btn" class="w-full bg-red-600 text-white py-2 px-4 rounded-md 
                        hover:bg-red-700 transition-colors text-sm">
              선택한 상품 삭제 (1개)
            </button>
            <div class="flex gap-2">
              <button id="cart-modal-clear-cart-btn" class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md 
                        hover:bg-gray-700 transition-colors text-sm">
                전체 비우기
              </button>
              <button id="cart-modal-checkout-btn" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
                        hover:bg-blue-700 transition-colors text-sm">
                구매하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,R.CartItem=()=>`
  <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="85067212996">
    <!-- 선택 체크박스 -->
    <label class="flex items-center mr-3">
      <input type="checkbox" checked="" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
    focus:ring-blue-500" data-product-id="85067212996">
    </label>
  </div>
  `;const z=()=>{let{isOpen:e,type:t}=d.getState(`toast`),n={success:z.Success,info:z.Info,error:z.Error};return g(()=>{if(t){let e=setTimeout(()=>{d.setState({toast:{isOpen:!1}})},3e3);return()=>clearTimeout(e)}},[e]),`
  <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 toast-container">
    <div class="flex flex-col gap-2 items-center justify-center mx-auto" style="width: fit-content;">
        ${n[t]()}
    </div>
  </div>
  `};z.Success=()=>`
  <div class="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
    <div class="flex-shrink-0">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    <p class="text-sm font-medium">장바구니에 추가되었습니다</p>
    <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  `,z.Info=()=>`
  <div class="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
    <div class="flex-shrink-0">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </div>
    <p class="text-sm font-medium">선택된 상품들이 삭제되었습니다</p>
    <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  `,z.Error=()=>`
  <div class="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
    <div class="flex-shrink-0">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </div>
    <p class="text-sm font-medium">오류가 발생했습니다.</p>
    <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  `;const B=async()=>{let{products:e,pagination:t}=d.getState(),{products:n,pagination:r}=await o({page:t.page+1,limit:t.limit});d.setState({products:[...e,...n],pagination:{...t,...r}})},V=()=>(g(()=>{let e=document.querySelector(`footer`);if(!e)return;let t=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){let{path:e}=P.getCurrentRoute();if(e!==`/`)return;let{isLoading:t,pagination:n}=d.getState();if(t||!n.hasNext)return;d.setState({isLoading:!0}),B().then(()=>{d.setState({isLoading:!1})})}})},{root:null,rootMargin:`100px`,threshold:.1});return t.observe(e),()=>{t.disconnect()}},[]),`
    <footer class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-md mx-auto py-8 text-center text-gray-500">
        <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
      </div>
    </footer>
  `);function H(){let{path:e,render:t}=P.getCurrentRoute(),{cart:n,toast:r}=d.getState();return`
    <div class="min-h-screen bg-gray-50"> 
      ${F({path:e})}
      <main class="max-w-md mx-auto px-4 py-4">
        ${n.isOpen?R():``}
        ${t()}
        </main>
        ${r.isOpen?z():``}
      ${V()}
    </div>
  `}function U(e){if(!e)throw Error(`Component is required`);let t=document.querySelector(`#root`);t.innerHTML=e(),_()}const W=()=>{document.addEventListener(`click`,q),document.addEventListener(`change`,Y)},G=()=>{d.setState({isLoading:!0,isError:!1}),o().then(e=>{d.setState({...e,isLoading:!1})}).catch(()=>{d.setState({isError:!0,isLoading:!1,toast:{isOpen:!0,type:`error`}})})},K=e=>{d.setState({isLoading:!0,isError:!1}),s(e).then(e=>{d.setState({selectedProduct:e,isLoading:!1})}).catch(()=>{d.setState({isError:!0,isLoading:!1,toast:{isOpen:!0,type:`error`}})})},q=e=>{let t=e.target;if(t.closest(`#back-btn`)){P.navigate(`/front_7th_chapter2-1/`);return}if(t.closest(`#retry-fetch-btn`)){G();return}if(t.closest(`#cart-open-btn`)){let e=d.getState(`cart`);if(e.isOpen)return;d.setState({cart:{...e,isOpen:!0}});return}if(t.closest(`#cart-modal-close-btn`)||t.closest(`.cart-modal-overlay`)){let e=d.getState(`cart`);if(!e.isOpen)return;d.setState({cart:{...e,isOpen:!1}});return}if((t.closest(`.add-to-cart-btn`)||t.closest(`#add-to-cart-btn`))&&(e.stopPropagation(),J(t.dataset.productId),d.setState({toast:{isOpen:!0,type:`success`}})),t.closest(`.product-card`)){if(t.closest(`.add-to-cart-btn`))return;let e=t.closest(`[data-product-id]`),n=e.dataset.productId;K(n),P.navigate(`/product/${n}`);return}if(t.closest(`.go-to-product-list`)){P.navigate(`/front_7th_chapter2-1/`);return}if(t.closest(`#toast-close-btn`)){d.setState({toast:{isOpen:!1}});return}if(t.matches(`#quantity-increase`)){let e=d.getState(`cart`);d.setState({cart:{...e,quantity:e.quantity+1}})}if(t.matches(`#quantity-decrease`)){let e=d.getState(`cart`);if(e.quantity<=1)return;d.setState({cart:{...e,quantity:e.quantity-1}})}},J=e=>{let{products:t,cart:n}=d.getState();if(n.list.get(e))return;let{image:r,lprice:i,title:a}=t.find(({productId:t})=>t===e),o=n.list.set(e,{productId:e,image:r,lprice:i,title:a,quantity:1,selected:!1});d.setState({cart:{...n,list:o}}),d.setState({toast:{isOpen:!0,type:`success`}})},Y=e=>{let t=e.target;if(t.matches(`#limit-select`)){let e=d.getState(`pagination`),n=+t.value;if(e.limit===n)return;d.setState({pagination:{...e,limit:n}});return}if(t.matches(`#sort-select`)){let e=d.getState(`filters`);if(e.sort===t.value)return;d.setState({filters:{...e,sort:t.value}});return}},X=()=>{document.addEventListener(`input`,Z)},Z=e=>{let t=e.target;if(t.matches(`#search-input`)&&Q(t.value),t.matches(`#quantity-input`)){let e=t.dataset.productId,n=+t.value,r=d.getState(`cart`),i=r.list.get(e);if(!i)return;let a=r.list.set(e,{...i,quantity:n});d.setState({cart:{...r,list:a}})}},Q=e=>{let t=d.getState(`filters`);t.search!==e&&d.setState({filters:{...t,search:e}})},$=()=>a(async()=>{let{worker:e}=await import(`./browser-CcyfQrG1.js`);return{worker:e}},[]).then(({worker:e})=>e.start({onUnhandledRequest:`bypass`,serviceWorker:{url:`/front_7th_chapter2-1/mockServiceWorker.js`}}));function ee(){d.subscribe(()=>{U(H)}),P.init(()=>{U(H)}),U(H),W(),X();let e=`
    <main class="max-w-md mx-auto px-4 py-4">
      <!-- 검색 및 필터 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <!-- 검색창 -->
        <div class="mb-4">
          <div class="relative">
            <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- 필터 옵션 -->
        <div class="space-y-3">

          <!-- 카테고리 필터 -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">카테고리:</label>
              <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button><span class="text-xs text-gray-500">&gt;</span><button data-breadcrumb="category1" data-category1="생활/건강" class="text-xs hover:text-blue-800 hover:underline">생활/건강</button>
            </div>
            <div class="space-y-2">
              <div class="flex flex-wrap gap-2">
                <button data-category1="생활/건강" data-category2="생활용품" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                  생활용품
                </button>
                <button data-category1="생활/건강" data-category2="주방용품" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                  주방용품
                </button>
                <button data-category1="생활/건강" data-category2="문구/사무용품" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                  문구/사무용품
                </button>
              </div>
            </div>
          </div>
          
          <!-- 기존 필터들 -->
          <div class="flex gap-2 items-center justify-between">
            <!-- 페이지당 상품 수 -->
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">개수:</label>
              <select id="limit-select"
                      class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="10">
                  10개
                </option>
                <option value="20" selected="">
                  20개
                </option>
                <option value="50">
                  50개
                </option>
                <option value="100">
                  100개
                </option>
              </select>
            </div>
            <!-- 정렬 -->
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">정렬:</label>
              <select id="sort-select" class="text-sm border border-gray-300 rounded px-2 py-1
                           focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="price_asc" selected="">가격 낮은순</option>
                <option value="price_desc">가격 높은순</option>
                <option value="name_asc">이름순</option>
                <option value="name_desc">이름 역순</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </main>
  `,t=`
    <main class="max-w-md mx-auto px-4 py-4">
      <!-- 검색 및 필터 -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <!-- 검색창 -->
        <div class="mb-4">
          <div class="relative">
            <input type="text" id="search-input" placeholder="상품명을 검색해보세요..." value="" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- 필터 옵션 -->
        <div class="space-y-3">

          <!-- 카테고리 필터 -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">카테고리:</label>
              <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button><span class="text-xs text-gray-500">&gt;</span><button data-breadcrumb="category1" data-category1="생활/건강" class="text-xs hover:text-blue-800 hover:underline">생활/건강</button><span class="text-xs text-gray-500">&gt;</span><span class="text-xs text-gray-600 cursor-default">주방용품</span>
            </div>
            <div class="space-y-2">
              <div class="flex flex-wrap gap-2">
                <button data-category1="생활/건강" data-category2="생활용품" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                  생활용품
                </button>
                <button data-category1="생활/건강" data-category2="주방용품" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-blue-100 border-blue-300 text-blue-800">
                  주방용품
                </button>
                <button data-category1="생활/건강" data-category2="문구/사무용품" class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                  문구/사무용품
                </button>
              </div>
            </div>
          </div>
          
          <!-- 기존 필터들 -->
          <div class="flex gap-2 items-center justify-between">
            <!-- 페이지당 상품 수 -->
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">개수:</label>
              <select id="limit-select"
                      class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="10">
                  10개
                </option>
                <option value="20" selected="">
                  20개
                </option>
                <option value="50">
                  50개
                </option>
                <option value="100">
                  100개
                </option>
              </select>
            </div>
            <!-- 정렬 -->
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">정렬:</label>
              <select id="sort-select" class="text-sm border border-gray-300 rounded px-2 py-1
                           focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="price_asc" selected="">가격 낮은순</option>
                <option value="price_desc">가격 높은순</option>
                <option value="name_asc">이름순</option>
                <option value="name_desc">이름 역순</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </main>
  `,n=`
    <div class="flex flex-col gap-2 items-center justify-center mx-auto" style="width: fit-content;">
      <div class="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <p class="text-sm font-medium">장바구니에 추가되었습니다</p>
        <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
         </svg>
        </div>
        <p class="text-sm font-medium">선택된 상품들이 삭제되었습니다</p>
        <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
        <p class="text-sm font-medium">오류가 발생했습니다.</p>
        <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  `,r=`
    <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
      <div class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">
        <!-- 헤더 -->
        <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
            </svg>
            장바구니 
          </h2>
          
          <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- 컨텐츠 -->
        <div class="flex flex-col max-h-[calc(90vh-120px)]">
          <!-- 빈 장바구니 -->
          <div class="flex-1 flex items-center justify-center p-8">
            <div class="text-center">
              <div class="text-gray-400 mb-4">
                <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
              <p class="text-gray-600">원하는 상품을 담아보세요!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,i=`
    <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
      <div class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">
        <!-- 헤더 -->
        <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
            </svg>
            장바구니
            <span class="text-sm font-normal text-gray-600 ml-1">(2)</span>
          </h2>
          <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <!-- 컨텐츠 -->
        <div class="flex flex-col max-h-[calc(90vh-120px)]">
          <!-- 전체 선택 섹션 -->
          <div class="p-4 border-b border-gray-200 bg-gray-50">
            <label class="flex items-center text-sm text-gray-700">
              <input type="checkbox" id="cart-modal-select-all-checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2">
              전체선택 (2개)
            </label>
          </div>
          <!-- 아이템 목록 -->
          <div class="flex-1 overflow-y-auto">
            <div class="p-4 space-y-4">
              <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="85067212996">
                <!-- 선택 체크박스 -->
                <label class="flex items-center mr-3">
                  <input type="checkbox" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                focus:ring-blue-500" data-product-id="85067212996">
                </label>
                <!-- 상품 이미지 -->
                <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img src="https://shopping-phinf.pstatic.net/main_8506721/85067212996.1.jpg" alt="PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="85067212996">
                </div>
                <!-- 상품 정보 -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="85067212996">
                    PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">
                    220원
                  </p>
                  <!-- 수량 조절 -->
                  <div class="flex items-center mt-2">
                    <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="85067212996">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input type="number" value="2" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" disabled="" data-product-id="85067212996">
                    <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="85067212996">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- 가격 및 삭제 -->
                <div class="text-right ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    440원
                  </p>
                  <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="85067212996">
                    삭제
                  </button>
                </div>
              </div>
              <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="86940857379">
                <!-- 선택 체크박스 -->
                <label class="flex items-center mr-3">
                  <input type="checkbox" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                focus:ring-blue-500" data-product-id="86940857379">
                </label>
                <!-- 상품 이미지 -->
                <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img src="https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg" alt="샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="86940857379">
                </div>
                <!-- 상품 정보 -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="86940857379">
                    샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">
                    230원
                  </p>
                  <!-- 수량 조절 -->
                  <div class="flex items-center mt-2">
                    <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="86940857379">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input type="number" value="1" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" disabled="" data-product-id="86940857379">
                    <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="86940857379">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- 가격 및 삭제 -->
                <div class="text-right ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    230원
                  </p>
                  <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="86940857379">
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 하단 액션 -->
        <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <!-- 선택된 아이템 정보 -->
          <!-- 총 금액 -->
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-bold text-gray-900">총 금액</span>
            <span class="text-xl font-bold text-blue-600">670원</span>
          </div>
          <!-- 액션 버튼들 -->
          <div class="space-y-2">
            <div class="flex gap-2">
              <button id="cart-modal-clear-cart-btn" class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md 
                       hover:bg-gray-700 transition-colors text-sm">
                전체 비우기
              </button>
              <button id="cart-modal-checkout-btn" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
                       hover:bg-blue-700 transition-colors text-sm">
                구매하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,a=`
    <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
      <div class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">
        <!-- 헤더 -->
        <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
            </svg>
            장바구니
            <span class="text-sm font-normal text-gray-600 ml-1">(2)</span>
          </h2>
          <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <!-- 컨텐츠 -->
        <div class="flex flex-col max-h-[calc(90vh-120px)]">
          <!-- 전체 선택 섹션 -->
          <div class="p-4 border-b border-gray-200 bg-gray-50">
            <label class="flex items-center text-sm text-gray-700">
              <input type="checkbox" id="cart-modal-select-all-checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2">
              전체선택 (2개)
            </label>
          </div>
          <!-- 아이템 목록 -->
          <div class="flex-1 overflow-y-auto">
            <div class="p-4 space-y-4">
              <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="85067212996">
                <!-- 선택 체크박스 -->
                <label class="flex items-center mr-3">
                  <input type="checkbox" checked="" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                focus:ring-blue-500" data-product-id="85067212996">
                </label>
                <!-- 상품 이미지 -->
                <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img src="https://shopping-phinf.pstatic.net/main_8506721/85067212996.1.jpg" alt="PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="85067212996">
                </div>
                <!-- 상품 정보 -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="85067212996">
                    PVC 투명 젤리 쇼핑백 1호 와인 답례품 구디백 비닐 손잡이 미니 간식 선물포장
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">
                    220원
                  </p>
                  <!-- 수량 조절 -->
                  <div class="flex items-center mt-2">
                    <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="85067212996">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input type="number" value="2" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" disabled="" data-product-id="85067212996">
                    <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="85067212996">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- 가격 및 삭제 -->
                <div class="text-right ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    440원
                  </p>
                  <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="85067212996">
                    삭제
                  </button>
                </div>
              </div>
              <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="86940857379">
                <!-- 선택 체크박스 -->
                <label class="flex items-center mr-3">
                  <input type="checkbox" class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                focus:ring-blue-500" data-product-id="86940857379">
                </label>
                <!-- 상품 이미지 -->
                <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img src="https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg" alt="샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이" class="w-full h-full object-cover cursor-pointer cart-item-image" data-product-id="86940857379">
                </div>
                <!-- 상품 정보 -->
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title" data-product-id="86940857379">
                    샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">
                    230원
                  </p>
                  <!-- 수량 조절 -->
                  <div class="flex items-center mt-2">
                    <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100" data-product-id="86940857379">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                      </svg>
                    </button>
                    <input type="number" value="1" min="1" class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" disabled="" data-product-id="86940857379">
                    <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100" data-product-id="86940857379">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <!-- 가격 및 삭제 -->
                <div class="text-right ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    230원
                  </p>
                  <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800" data-product-id="86940857379">
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 하단 액션 -->
        <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <!-- 선택된 아이템 정보 -->
          <div class="flex justify-between items-center mb-3 text-sm">
            <span class="text-gray-600">선택한 상품 (1개)</span>
            <span class="font-medium">440원</span>
          </div>
          <!-- 총 금액 -->
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-bold text-gray-900">총 금액</span>
            <span class="text-xl font-bold text-blue-600">670원</span>
          </div>
          <!-- 액션 버튼들 -->
          <div class="space-y-2">
            <button id="cart-modal-remove-selected-btn" class="w-full bg-red-600 text-white py-2 px-4 rounded-md 
                       hover:bg-red-700 transition-colors text-sm">
              선택한 상품 삭제 (1개)
            </button>
            <div class="flex gap-2">
              <button id="cart-modal-clear-cart-btn" class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md 
                       hover:bg-gray-700 transition-colors text-sm">
                전체 비우기
              </button>
              <button id="cart-modal-checkout-btn" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
                       hover:bg-blue-700 transition-colors text-sm">
                구매하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;window.location.pathname.includes(`pub`)&&(document.body.innerHTML=`
      <div>상품목록_레이아웃_카테고리_1Depth</div>
      ${e}
      <br />
      <div>상품목록_레이아웃_카테고리_2Depth</div>
      ${t}
      <br />
      <div>토스트</div>
      ${n}
      <br />
      <div>장바구니_비어있음</div>
      ${r}
      <br />
      <div>장바구니_선택없음</div>
      ${i}
      <br />
      <div>장바구니_선택있음</div>
      ${a}
      <br />

    `)}$().then(ee);