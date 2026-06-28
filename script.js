const ADMIN_PASSWORD = "teacher1234";

function speakOnce(text) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 0.86;
  utterance.pitch = 1.03;
  window.speechSynthesis.speak(utterance);
}

function showMalangiSpeech(button, message) {
  let bubble = button.querySelector(".malangi-speech");

  if (!bubble) {
    bubble = document.createElement("span");
    bubble.className = "malangi-speech";
    bubble.setAttribute("aria-live", "polite");
    button.appendChild(bubble);
  }

  bubble.textContent = message;
  bubble.classList.add("is-open");
  button.classList.add("is-talking");
  speakOnce(message);

  window.clearTimeout(button._malangiTimer);
  button._malangiTimer = window.setTimeout(() => {
    bubble.classList.remove("is-open");
    button.classList.remove("is-talking");
  }, 5200);
}

function initMalangiHelpers() {
  const helpers = document.querySelectorAll("[data-malangi-help], [data-malangi-message]");
  const soonButtons = document.querySelectorAll("[data-soon-message]");

  helpers.forEach((helper) => {
    helper.addEventListener("click", () => {
      const message = helper.dataset.malangiMessage || "그림을 보고 마음에 드는 놀이터를 눌러 봐.";
      showMalangiSpeech(helper, message);
    });
  });

  soonButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const message = button.dataset.soonMessage || "새 놀이터가 찾아오고 있어요.";
      const output = document.querySelector("[data-soon-output]");
      if (output) output.textContent = message;
      speakOnce(message);
    });
  });
}

document.addEventListener("DOMContentLoaded", initMalangiHelpers);

function unlockAdmin() {
  const input = document.querySelector("[data-admin-password]");
  const locked = document.querySelector("[data-admin-locked]");
  const panel = document.querySelector("[data-admin-panel]");
  const error = document.querySelector("[data-admin-error]");

  if (!input || !locked || !panel || !error) return;

  if (input.value === ADMIN_PASSWORD) {
    locked.classList.add("hidden");
    panel.classList.remove("hidden");
    error.textContent = "";
    return;
  }

  error.textContent = "비밀번호가 맞지 않아요.";
}

function showAdminPreview(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const title = data.get("title") || "새 책";
  const activity = data.get("activity") || "활동";
  const result = document.querySelector("[data-admin-result]");

  if (!result) return;

  result.innerHTML = `
    <div class="notice">
      <strong>${title}</strong> 활동 미리보기 링크가 준비될 자리입니다.<br>
      선택한 활동: ${activity}<br>
      Firebase 연결 뒤 저장, 공개 설정, QR 생성이 실제로 동작합니다.
    </div>
  `;
}
