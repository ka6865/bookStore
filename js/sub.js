//책정보 불러오기 및 작성
async function loadDetailPage() {
  const book = await getBookDetail("프로젝트 헤일메리");

  if (!book) {
    alert("책 정보를 찾을 수 없습니다!");
    return;
  }
  document.getElementById("book-thumbnail").src = book.thumbnail;
  document.getElementById("detail-title").innerText = book.title;
  document.getElementById("detail-author").innerText = book.authors.join(", ");
  const translator =
    book.translators.length > 0 ? book.translators.join(", ") : "정보 없음";
  document.getElementById("detail-translator").innerText = translator;
  document.getElementById("detail-publisher").innerText =
    book.publisher + " 출판";
  document.getElementById("author").innerHTML = `저자 | ${book.authors.join(
    ", "
  )}`;
  document.getElementById("translation").innerHTML = `번역 | ${translator}`;
}

loadDetailPage();

// ==========================================
// 탭 시스템 초기화 함수
// ==========================================
function initTabs(buttonSelector) {
  const btns = document.querySelectorAll(buttonSelector);

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;

      // 1. 현재 버튼 그룹(btns)과 연결된 타겟 콘텐츠만 정확히 찾아 active 제거
      btns.forEach((b) => {
        b.classList.remove("active");

        const contentId = b.dataset.target;
        const contentEl = document.getElementById(contentId);
        if (contentEl) {
          contentEl.classList.remove("active", "expanded");
        }
      });

      // 2. 선택된 버튼과 내용 활성화
      btn.classList.add("active");
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add("active");
      }

      // '작가 소개' 탭의 더보기 버튼 보이기/숨기기 처리
      if (buttonSelector === ".tab-btn2") {
        const moreBtn2Wrapper = document
          .getElementById("btn-more2")
          ?.closest(".more-btn-wrapper");
        if (moreBtn2Wrapper) {
          // '작가 소개' 탭이 활성화될 때만 더보기 버튼을 보이기
          moreBtn2Wrapper.style.display =
            targetId === "introduce" ? "block" : "none";
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTabs(".tab-btn");
  initTabs(".tab-btn2");
  initTabs(".tab-btn3");
});

// //작품 소개
// const tabBtns = document.querySelectorAll(".tab-btn");

// tabBtns.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const targetId = btn.getAttribute("data-target");

//     // 1. 탭 버튼들 전체에서 active 제거
//     tabBtns.forEach((b) => b.classList.remove("active"));
//     // 2. 현재 클릭한 탭이 속한 구역(section) 내부의 탭 내용만 찾아 active 제거
//     const sectionContents = btn
//       .closest("section")
//       .querySelectorAll(".tab-content");
//     sectionContents.forEach((c) => c.classList.remove("active"));

//     // 3. 클릭한 버튼과 연결된 내용에만 active 클래스 추가
//     btn.classList.add("active");
//     document.getElementById(targetId).classList.add("active");
//   });
// });

// // 작가 소개 탭
// const tabBtns2 = document.querySelectorAll(".tab-btn2");

// tabBtns2.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const targetId = btn.getAttribute("data-target");

//     tabBtns2.forEach((b) => b.classList.remove("active"));
//     const sectionContents = btn
//       .closest("section")
//       .querySelectorAll(".tab-content");
//     sectionContents.forEach((c) => c.classList.remove("active"));

//     btn.classList.add("active");
//     document.getElementById(targetId).classList.add("active");
//   });
// });

// 작품소개 작성
// document.addEventListener("DOMContentLoaded", async function () {
//   try {
//     const response = await fetch("./text/text1.txt");
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.text();
//     document.getElementById("intro").innerHTML = data;
//   } catch (error) {
//     console.error("There was a problem with the fetch operation:", error);
//   }
// });

// ==========================================
// 텍스트 파일 불러오기 전용 함수
// ==========================================

async function loadTextToElement(filePath, targetId) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.text();

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.innerHTML = data;
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
// 함수실행
document.addEventListener("DOMContentLoaded", function () {
  loadTextToElement("./text/text1.txt", "intro");
  loadTextToElement("./text/text2.txt", "index");
  loadTextToElement("./text/text3.txt", "review");
  loadTextToElement("./text/text4.txt", "introduce");
  loadTextToElement("./text/text5.txt", "author-name");
});

// // 더보기 버튼 작동
// const moreBtn = document.getElementById("btn-more");

// moreBtn.addEventListener("click", function () {
//   const activeContent = this.closest(".tab-body").querySelector(
//     ".tab-content.active"
//   );

//   if (!activeContent) return;

//   activeContent.classList.toggle("expanded");

//   const isExpanded = activeContent.classList.contains("expanded");
//   if (isExpanded) {
//     this.innerHTML =
//       '접기 <svg width="12" height="12" viewBox="0 0 24 24" style="transform:rotate(180deg)"><path d="M7 10l5 5 5-5z" fill="currentColor"/></svg>';
//   } else {
//     this.innerHTML =
//       '더보기 <svg width="12" height="12" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" fill="currentColor"/></svg>';
//   }
// });

// // 작가 소개 더보기 버튼 작동
// const moreBtn2 = document.getElementById("btn-more2");

// moreBtn2.addEventListener("click", function () {
//   const activeContent = this.closest(".tab-body").querySelector(
//     ".tab-content.active"
//   );

//   if (!activeContent) return;

//   activeContent.classList.toggle("expanded");

//   const isExpanded = activeContent.classList.contains("expanded");
//   if (isExpanded) {
//     this.innerHTML =
//       '접기 <svg width="12" height="12" viewBox="0 0 24 24" style="transform:rotate(180deg)"><path d="M7 10l5 5 5-5z" fill="currentColor"/></svg>';
//   } else {
//     this.innerHTML =
//       '더보기 <svg width="12" height="12" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" fill="currentColor"/></svg>';
//   }
// });

// ==========================================
// 더보기 버튼 초기화 함수
// ==========================================
function initMoreButton(selector) {
  const moreBtns = document.querySelectorAll(selector);

  moreBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // 현재 버튼이 속한 tab-body 안에서 활성화된 컨텐츠 찾기 (중첩 탭 오류 방지를 위해 직계 자식 탐색)
      const tabBody = this.closest(".tab-body");
      const activeContent = Array.from(tabBody.children).find(
        (child) =>
          child.classList.contains("tab-content") &&
          child.classList.contains("active")
      );

      if (!activeContent) return;

      //  펼치기/접기 토글
      activeContent.classList.toggle("expanded");

      // 버튼 상태에 따라 아이콘과 텍스트 변경
      const isExpanded = activeContent.classList.contains("expanded");

      // 화살표 SVG
      const arrowIcon = (rotate) => `
          <svg width="12" height="12" viewBox="0 0 24 24" style="${
            rotate ? "transform:rotate(180deg)" : ""
          }">
            <path d="M7 10l5 5 5-5z" fill="currentColor"/>
          </svg>`;

      if (isExpanded) {
        this.innerHTML = `접기 ${arrowIcon(true)}`;
      } else {
        this.innerHTML = `더보기 ${arrowIcon(false)}`;
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMoreButton("#btn-more");
  initMoreButton("#btn-more2");

  // '작가 소개' 더보기 버튼(#btn-more2) 초기 상태 설정
  const moreBtn2Wrapper = document
    .getElementById("btn-more2")
    ?.closest(".more-btn-wrapper");
  if (moreBtn2Wrapper) {
    // 페이지 로드 시 기본 활성화 탭이 '작가 프로필'이므로, 버튼을 숨깁니다.
    moreBtn2Wrapper.style.display = "none";
  }
});
