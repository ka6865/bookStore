// 랜덤 평점 생성기 (0.0 ~ 5.0)
function getRandomRating() {
  const rawRandom = Math.floor(Math.random() * 51);
  return (rawRandom / 10).toFixed(1);
}
// 랜덤 평점 인원 생성기 (0 ~ 1000)
function getRandomPeople() {
  return Math.floor(Math.random() * 1001);
}
// 1. 책 평점을 기억해둘 변수
const bookRatingsMemory = {};

// 2. 평점을 기억 발급 받는함수
function getOrGenerateRating(bookTitle) {
  //  메모리에 이미 이 책 이름이 있다면
  if (bookRatingsMemory[bookTitle]) {
    return bookRatingsMemory[bookTitle]; // 메모리값을 그대로 변환
  }
  // 메모리에없는책이라면 책이라면?
  const rating = getRandomRating();
  const starColor = rating === "0.0" ? "#d1d5d9" : "#ff0000";
  const displayPeople = rating === "0.0" ? 0 : getRandomPeople();
  // 새로 뽑은 값을 메모리에 저장
  bookRatingsMemory[bookTitle] = {
    rating: rating,
    starColor: starColor,
    displayPeople: displayPeople,
  };
  // 방금 저장한 그 값을 반환
  return bookRatingsMemory[bookTitle];
}
// ==========================================
// 1. 메인 슬라이더
// ==========================================
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 3, // 한 화면에 보여질 슬라이드 개수
  slidesPerGroup: 3, // 한 번에 넘어갈 슬라이드 개수
  spaceBetween: 20, // 카드 사이의 간격
  loop: true, // 무한 반복

  loopAddBlankSlides: false, // Swiper 최신 버전(10 이상)용
  speed: 400, // 핸드폰 스크롤 같은느낌
  tocuhRatio: 0.6,
  freeMode: true,

  autoplay: {
    // 자동 넘김
    delay: 30000,
  },
  navigation: {
    nextEl: ".main-next", // 고유 클래스로 연결
    prevEl: ".main-prev", // 고유 클래스로 연결
  },
  mousewheel: {
    forceToAxis: true,
    thresholdTime: 500,
  },
});
// ==========================================
// 2. 지금 많이 읽고 있는작품 (API 연동 및 화면 그리기)
// ==========================================

// async function renderNowRanking() {
//   try {
//     const books = await getNowRankingBooks();
//     const nowrankingList = document.querySelector("#nowranking-list");

//     if (!books || books.length === 0) {
//       nowrankingList.innerHTML = "<p>데이터를 불러오지 못했습니다.</p>";
//       return;
//     }

//     let html = "";
//     books.forEach((book, index) => {
//       const rating = getRandomRating();
//       const starColor = rating === "0.0" ? "#d1d5d9" : "#ff0000";

//       const displayPeople = rating === "0.0" ? 0 : getRandomPeople();
//       html += `
//         <article class="swiper-slide book-item">
//           <div class="ranking-card">
//             <img src="${book.thumbnail}" alt="${
//         book.originalTitle
//       }" class="ranking-thumb">
//             <strong class="rank-num">${index + 1}</strong>
//             <div class="book-info">
//               <p class="title">${book.originalTitle}</p>
//               <p class="author">${
//                 book.authors ? book.authors.join(", ") : "저자 미상"
//               }</p>
//               <div class="rating-area">
//               <span style="color: ${starColor}; font-size: 11px;">★</span>
//               <p class="rating">${rating}</p>
//               <p class="rating-people">
//                   (${displayPeople.toLocaleString()})
//                 </p>
//               </div>
//             </div>

//           </div>
//         </article>
//       `;
//     });

//     nowrankingList.innerHTML = html;

//     const swiper2 = new Swiper(".nowrankingSwiper", {
//       slidesPerView: 3,
//       slidesPerGroup: 1,
//       grid: {
//         rows: 3,
//         fill: "column",
//       },
//       spaceBetween: 5,
//       navigation: {
//         nextEl: ".ranking-next",
//         prevEl: ".ranking-prev",
//       },
//       mousewheel: {
//         forceToAxis: true,
//       },
//     });
//   } catch (error) {
//     console.error("랭킹 화면 렌더링 에러:", error);
//   }
// }
// renderNowRanking();

// ==========================================
// 3. 오늘, 리디의 발견 (API 연동 및 화면 그리기)
// ==========================================
const discovertext1 = [
  "넷플릭스 글로벌",
  "미스터리의 거장",
  "2019 르노드상",
  "웹툰단행본 편집에",
  "밤마다 나무에게",
  "라이언 고슬링",
  "6시 20분 남자",
];
const discovertext2 = [
  "1위 원작 소설!",
  "미미여사의 시작점",
  "극한 여행 에세이",
  "대한 모든 노하우",
  "소원을 비는 이유",
  "주연 영화 원작!",
  "화려환 귀한!",
];

async function renderDiscover() {
  try {
    const books = await getDiscoverBooks();
    const discoverList = document.querySelector("#discover-list");

    if (!books || books.length === 0) {
      discoverList.innerHTML = "<p>데이터를 불러오지 못했습니다.</p>";
      return;
    }

    let html = "";

    books.forEach((book, index) => {
      const text1 = discovertext1[index] || "";
      const text2 = discovertext2[index] || "";
      html += `
        <article class="swiper-slide discover-item">
          <div class="thumb-wrapper">
            <img src="${book.thumbnail}" alt="${book.originalTitle}" class="discover-thumb">
          </div>
          <div class="discover-info">
            <p class="promo-text">${text1}</p>
            <p class="promo-text">${text2}</p>
          </div>
        </article>
      `;
    });
    discoverList.innerHTML = html;

    const discoverSwiper = new Swiper(".discoverSwiper", {
      slidesPerView: 6,
      slidesPerGroup: 1,
      spaceBetween: 15,
      navigation: {
        nextEl: ".discover-next",
        prevEl: ".discover-prev",
      },
      mousewheel: {
        forceToAxis: true,
      },
    });
  } catch (error) {
    console.error("리디의 발견 화면 렌더링 에러:", error);
  }
}
renderDiscover();

// ==========================================
// 4. 베스트 (API 연동 및 화면 그리기)
// ==========================================

// ==========================================
//  3x3 그리드 책 목록 공통 렌더링 함수
// ==========================================
function renderGridSection(books, listId, swiperClass, nextBtn, prevBtn) {
  const listContainer = document.querySelector(listId);
  if (!books || books.length === 0) return;

  let html = "";
  books.forEach((book, index) => {
    // 평점정보받기
    const bookRatingInfo = getOrGenerateRating(book.originalTitle);

    html += `
      <article class="swiper-slide book-item">
        <div class="ranking-card">
          <img src="${book.thumbnail}" alt="${
      book.originalTitle
    }" class="ranking-thumb">
          <strong class="rank-num">${index + 1}</strong>
          <div class="book-info">
            <p class="title">${book.originalTitle}</p>
            <p class="author">${
              book.authors ? book.authors.join(", ") : "저자 미상"
            }</p>
            <div class="rating-area">
              <span style="color: ${
                bookRatingInfo.starColor
              }; font-size: 11px;">★</span>
              <p class="rating">${bookRatingInfo.rating}</p>
              <p class="rating-people">(${bookRatingInfo.displayPeople.toLocaleString()})</p>
            </div>
          </div>
        </div>
      </article>
    `;
  });

  listContainer.innerHTML = html;

  new Swiper(swiperClass, {
    slidesPerView: 3,
    slidesPerGroup: 1,
    grid: {
      rows: 3,
      fill: "column",
    },
    spaceBetween: 5,
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    mousewheel: {
      forceToAxis: true,
    },
  });
}

// 지금 많이 읽고 있는 작품' 화면 그리기
async function initNowRanking() {
  const books = await getNowRankingBooks();
  renderGridSection(
    books,
    "#nowranking-list",
    ".nowrankingSwiper",
    ".ranking-next",
    ".ranking-prev"
  );
}

// 2. '베스트' 화면 그리기
async function initBest() {
  // api.js에서 책 데이터를 가져옵니다.
  const books = await getBestBooks();

  // 만능 기계에 재료와 위치를 넣어줍니다. (이름만 베스트용으로 교체!)
  renderGridSection(
    books,
    "#best-list",
    ".bestSwiper",
    ".best-next",
    ".best-prev"
  );
}

// 3. 페이지가 열리면 두 함수를 동시에 실행!
initNowRanking();
initBest();

// 우주라이크 소설 슬라이더 실행
const novelSwiper = new Swiper(".novelSwiper", {
  slidesPerView: 5,
  slidesPerGroup: 1,
  spaceBetween: 5,
  mousewheel: {
    forceToAxis: true,
  },
});

// 푸터 사업자정보
// 사업자 정보 토글 기능
const bizBtn = document.getElementById("biz-btn");
const bizContent = document.getElementById("biz-content");

if (bizBtn && bizContent) {
  bizBtn.addEventListener("click", () => {
    // 버튼과 내용 상자에 'open' 이라는 클래스를 껐다 켰다 합니다.
    bizBtn.classList.toggle("open");
    bizContent.classList.toggle("open");
  });
}
