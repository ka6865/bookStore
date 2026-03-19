// 랜덤 평점 생성기 (0.0 ~ 5.0)
function getRandomRating() {
  const rawRandom = Math.floor(Math.random() * 51);
  return (rawRandom / 10).toFixed(1);
}

// 1. 메인 슬라이더 (mySwiper)
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 3, // 한 화면에 보여질 슬라이드 개수
  slidesPerGroup: 3, // 한 번에 넘어갈 슬라이드 개수
  spaceBetween: 20, // 카드 사이의 간격
  loop: true, // 무한 반복
  autoplay: {
    // 자동 넘김
    delay: 3000,
  },
  navigation: {
    nextEl: ".main-next", // 고유 클래스로 연결
    prevEl: ".main-prev", // 고유 클래스로 연결
  },
  mousewheel: {
    forceToAxis: true,
  },
});

// 2. 지금 많이 읽고 있는 작품 (API 연동 및 화면 그리기)
async function renderNowRanking() {
  try {
    const books = await getNowRankingBooks();
    const nowrankingList = document.querySelector("#nowranking-list");

    if (!books || books.length === 0) {
      nowrankingList.innerHTML = "<p>데이터를 불러오지 못했습니다.</p>";
      return;
    }

    let html = "";
    books.forEach((book, index) => {
      const rating = getRandomRating();
      const starColor = rating === "0.0" ? "#d1d5d9" : "#ff0000";
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
              <span style="color: ${starColor}; font-size: 11px;">★</span>
              <p class="rating">${rating}</p>
              </div>
            </div>
    
          </div>
        </article>
      `;
    });

    nowrankingList.innerHTML = html;

    const swiper2 = new Swiper(".nowrankingSwiper", {
      slidesPerView: 3,
      slidesPerGroup: 3,
      grid: {
        rows: 3,
        fill: "column",
      },
      spaceBetween: 5,
      navigation: {
        nextEl: ".ranking-next",
        prevEl: ".ranking-prev",
      },
      mousewheel: {
        forceToAxis: true,
      },
    });
  } catch (error) {
    console.error("랭킹 화면 렌더링 에러:", error);
  }
}
renderNowRanking();

// ==========================================
// 3. 오늘, 리디의 발견 (API 연동 및 화면 그리기)
// ==========================================
async function renderDiscover() {
  try {
    const books = await getDiscoverBooks();
    const discoverList = document.querySelector("#discover-list");

    if (!books || books.length === 0) {
      discoverList.innerHTML = "<p>데이터를 불러오지 못했습니다.</p>";
      return;
    }

    let html = "";

    books.forEach((book) => {
      const promoLine1 = book.originalTitle;

      html += `
        <article class="swiper-slide discover-item">
          <div class="thumb-wrapper">
            <img src="${book.thumbnail}" alt="${book.originalTitle}" class="discover-thumb">
          </div>
          <div class="discover-info">
            <p class="promo-text">${promoLine1}</p>
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
