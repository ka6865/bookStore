// 전역변수로 api 키 값주기
const REST_API_KEY = "ea96961c88fc57cd9098fbf565cc62eb";

// ==========================================
//  공통 책 불러오기 함수 (만능 심부름꾼)
// ==========================================
async function getBooksByTitles(titles) {
  try {
    const promises = titles.map(async (title) => {
      // 파이프(|)가 있으면 뒤에 것만 추출, 없으면 그대로 사용되도록 처리
      const keyword = title.includes("|")
        ? title.split("|").pop().trim()
        : title;

      const params = new URLSearchParams({
        target: "title",
        query: keyword,
        size: 1,
      });

      const response = await fetch(
        `https://dapi.kakao.com/v3/search/book?${params}`,
        {
          headers: { Authorization: `KakaoAK ${REST_API_KEY}` },
        }
      );
      const data = await response.json();
      const bookData = data.documents[0];

      if (!bookData) return null;
      return { originalTitle: title, ...bookData };
    });

    const results = await Promise.all(promises);
    return results.filter((book) => book !== null);
  } catch (error) {
    console.error("데이터 로드 에러:", error);
    return [];
  }
}

// ==========================================
// 1. 지금 많이 읽고 있는 작품 (18개)
// ==========================================
const NowRankingTitles = [
  "프로젝트 헤일메리",
  "개정 번역판 | 해리 포터와 마법사의 돌",
  "눈물을 마시는 새",
  "피를 마시는 새",
  "레벨 세븐",
  "개정판 | 삼체 1권",
  "반복의 쓸모",
  "개정판 | 죽은 왕녀를 위한 파반느",
  "드래곤 라자",
  "합본 | 해리포터와 저주받은 아이 1,2부",
  "인생을 건 공부",
  "방금 한 말, 진짜 당신 생각인가요?",
  "검은 밤의 여자들",
  "장미와 나이프",
  "셜록 홈즈 전집 1권",
  "듄 시리즈 1권",
  "개정판 | 내 심장을 쏴라",
  "인생을 위한 최소한의 생각",
];

async function getNowRankingBooks() {
  return await getBooksByTitles(NowRankingTitles);
}

// ==========================================
// 2. 오늘, 리디의 발견 (7개)
// ==========================================
const DiscoverTitles = [
  "스노우 걸",
  "레벨세븐",
  "눈표범",
  "웹툰 단행본 편집 가이드북",
  "녹나무의 파수꾼",
  "프로젝트 헤일메리",
  "경계에 선 남자",
];

async function getDiscoverBooks() {
  return await getBooksByTitles(DiscoverTitles);
}

// ==========================================
// 3. 베스트 (18개)
// ==========================================
const BestTitles = [
  "프로젝트 헤일메리",
  "시간관리국",
  "괴테는 모든 것을 말했다",
  "인생을 위한 최소한의 생각",
  "웹툰단행본 편집 가이드북",
  "돈의 방정식",
  "돈의 심리학",
  "내 심장을 쏴라",
  "미국은 왜 전쟁을 멈추지 못하는가",
  "레벨 세븐",
  "도서 연체의 말로",
  "은하수를 여행하는 히치하이커를 위한 안내서 1",
  "한 잔의 마음",
  "혼모노",
  "눈물을 마시는 새 세트",
  "마션(스페셜 에디션)",
  "최소한의 삼국지",
  "생각의 도약",
];

async function getBestBooks() {
  return await getBooksByTitles(BestTitles);
}
