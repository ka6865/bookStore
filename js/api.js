// 전역변수로 api 키 값주기
const REST_API_KEY = "ea96961c88fc57cd9098fbf565cc62eb";

//지금 많이 읽고 있는 작품 18개 불러오기
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
  try {
    const promises = NowRankingTitles.map(async (title) => {
      const keyword = title.split("|").pop().trim();
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
    console.error("랭킹 데이터 로드 에러:", error);
  }
}
//오늘, 리디의발견 7개 불러오기
const DiscoverTitles = [
  "눈표범",
  "녹나무의 파수꾼",
  "프로젝트 헤일메리",
  "경계에 선 남자",
  "고백",
  "도서 연체의 말로",
  "시간관리국",
];

async function getDiscoverBooks() {
  try {
    const promises = DiscoverTitles.map(async (title) => {
      const keyword = title;
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
    console.error("랭킹 데이터 로드 에러:", error);
  }
}
