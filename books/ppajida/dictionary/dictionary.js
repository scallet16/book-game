const dictionaryEntries = [
  {
    expression: "사랑에 빠지다",
    meaning: "아주 좋아하게 되다",
    easy: "정말 좋아하는 거예요.",
    example: "나는 그림책에 빠졌어요.",
    think: "나는 무엇을 정말 좋아하나요?"
  },
  {
    expression: "잠에 빠지다",
    meaning: "잠이 들다",
    easy: "잠을 자게 되었어요.",
    example: "동생은 금방 잠에 빠졌어요.",
    think: "나는 언제 잠이 잘 오나요?"
  },
  {
    expression: "구멍에 빠지다",
    meaning: "구멍 안으로 들어가다",
    easy: "쏙 안으로 들어간 거예요.",
    example: "공이 구멍에 빠졌어요.",
    think: "무엇이 구멍에 빠질 수 있을까요?"
  },
  {
    expression: "물에 빠지다",
    meaning: "물속에 들어가다",
    easy: "물속으로 들어간 거예요.",
    example: "신발이 물에 빠졌어요.",
    think: "물에 빠지면 어떻게 해야 할까요?"
  },
  {
    expression: "물이 빠지다",
    meaning: "물이 밖으로 흘러나가다",
    easy: "물이 줄어들거나 없어지는 거예요.",
    example: "욕조의 물이 빠졌어요.",
    think: "어디에서 물이 빠지는 것을 본 적 있나요?"
  },
  {
    expression: "기운이 빠지다",
    meaning: "힘이 없어지다",
    easy: "힘이 없어서 축 처지는 거예요.",
    example: "많이 뛰어서 기운이 빠졌어요.",
    think: "나는 언제 기운이 빠지나요?"
  },
  {
    expression: "배꼽 빠지게 웃다",
    meaning: "아주 많이 웃다",
    easy: "너무 웃겨서 크게 웃는 거예요.",
    example: "친구 말이 웃겨서 배꼽 빠지게 웃었어요.",
    think: "나는 언제 크게 웃나요?"
  },
  {
    expression: "생각에 빠지다",
    meaning: "깊이 생각하다",
    easy: "한 가지 생각을 오래 하는 거예요.",
    example: "나는 문제를 풀며 생각에 빠졌어요.",
    think: "나는 어떤 생각을 오래 하나요?"
  },
  {
    expression: "목 빠지게 기다리다",
    meaning: "오래 애타게 기다리다",
    easy: "아주 오래 기다리는 거예요.",
    example: "생일 선물을 목 빠지게 기다렸어요.",
    think: "나는 무엇을 오래 기다려 봤나요?"
  },
  {
    expression: "옆길로 빠지다",
    meaning: "하던 이야기나 길에서 벗어나다",
    easy: "원래 가던 길이나 이야기가 다른 쪽으로 간 거예요.",
    example: "이야기가 옆길로 빠졌어요.",
    think: "수업 중 이야기가 다른 쪽으로 간 적 있나요?"
  },
  {
    expression: "줄이 빠지다",
    meaning: "끼워져 있던 줄이 빠져나오다",
    easy: "줄이 제자리에서 나오는 거예요.",
    example: "운동화 끈이 빠졌어요.",
    think: "내 물건에서 빠진 것이 있었나요?"
  },
  {
    expression: "눈물이 쏙 빠지다",
    meaning: "눈물이 많이 나다",
    easy: "너무 힘들거나 슬퍼서 눈물이 나는 거예요.",
    example: "넘어져서 눈물이 쏙 빠졌어요.",
    think: "나는 언제 눈물이 났나요?"
  },
  {
    expression: "빠지지 않는다",
    meaning: "어디에 가도 잘 어울리고 뒤처지지 않는다",
    easy: "어디서나 잘 어울리는 거예요.",
    example: "우리 친구는 어디 가도 빠지지 않아요.",
    think: "내가 잘하는 것은 무엇인가요?"
  }
];

let dictionaryIndex = 0;

function escapeDictionaryText(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderDictionaryCard() {
  const entry = dictionaryEntries[dictionaryIndex];
  document.querySelector("[data-dictionary-count]").textContent = `${dictionaryIndex + 1} / ${dictionaryEntries.length}`;
  document.querySelector("[data-dictionary-expression]").textContent = entry.expression;
  document.querySelector("[data-dictionary-meaning]").textContent = entry.meaning;
  document.querySelector("[data-dictionary-easy]").textContent = entry.easy;
  document.querySelector("[data-dictionary-example]").textContent = entry.example;
  document.querySelector("[data-dictionary-think]").textContent = entry.think;
  document.querySelector("[data-dictionary-prev]").disabled = dictionaryIndex === 0;
  document.querySelector("[data-dictionary-next]").disabled = dictionaryIndex === dictionaryEntries.length - 1;
}

function renderDictionaryPrintList() {
  const printList = document.querySelector("[data-dictionary-print]");
  printList.innerHTML = `
    <header class="dictionary-print-title">
      <p>수다쟁이 여니쌤의 뿜뿜 놀이터</p>
      <h1>『빠질 때가 됐어』 말랑 낱말사전</h1>
      <p>‘빠지다’의 13가지 뜻</p>
    </header>
    ${dictionaryEntries.map((entry, index) => `
      <article class="dictionary-print-card">
        <div class="dictionary-print-number">${index + 1} / ${dictionaryEntries.length}</div>
        <h2>${escapeDictionaryText(entry.expression)}</h2>
        <p><strong>뜻</strong>${escapeDictionaryText(entry.meaning)}</p>
        <p><strong>쉬운 말</strong>${escapeDictionaryText(entry.easy)}</p>
        <p><strong>예문</strong>${escapeDictionaryText(entry.example)}</p>
        <p><strong>생각해 봐요</strong>${escapeDictionaryText(entry.think)}</p>
      </article>
    `).join("")}
  `;
}

function speakDictionaryMeaning() {
  const entry = dictionaryEntries[dictionaryIndex];
  speakOnce(`${entry.expression}. ${entry.meaning}. ${entry.easy}`);
}

document.addEventListener("DOMContentLoaded", () => {
  renderDictionaryCard();
  renderDictionaryPrintList();

  document.querySelector("[data-dictionary-prev]").addEventListener("click", () => {
    if (dictionaryIndex > 0) {
      dictionaryIndex -= 1;
      renderDictionaryCard();
    }
  });

  document.querySelector("[data-dictionary-next]").addEventListener("click", () => {
    if (dictionaryIndex < dictionaryEntries.length - 1) {
      dictionaryIndex += 1;
      renderDictionaryCard();
    }
  });

  document.querySelector("[data-dictionary-listen]").addEventListener("click", speakDictionaryMeaning);
});
