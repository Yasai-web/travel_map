/* =========================
   ステータス定義
========================= */

const COLORS = {
  未訪問: "#E5E7EB",
  訪問: "#86EFAC",
  宿泊: "#60A5FA",
  居住: "#F87171"
};

/* =========================
   都道府県データ
========================= */

const prefectureStatus = {

  北海道: "居住",
  青森: "宿泊",
  岩手: "宿泊",
  宮城: "宿泊",
  秋田: "宿泊",
  山形: "宿泊",
  福島: "宿泊",

  茨城: "訪問",
  栃木: "宿泊",
  群馬: "宿泊",
  埼玉: "訪問",
  千葉: "宿泊",
  東京: "居住",
  神奈川: "宿泊", //箱根

  新潟: "宿泊",
  富山: "訪問",
  石川: "宿泊",
  福井: "訪問",
  山梨: "宿泊",
  長野: "宿泊",

  岐阜: "宿泊",
  静岡: "訪問",
  愛知: "宿泊",

  三重: "宿泊",
  滋賀: "宿泊",
  京都: "宿泊",
  大阪: "宿泊",
  兵庫: "訪問",
  奈良: "訪問",
  和歌山: "未訪問",

  鳥取: "訪問",
  島根: "宿泊",
  岡山: "宿泊",
  広島: "宿泊",
  山口: "訪問",

  徳島: "未訪問",
  香川: "宿泊",
  愛媛: "宿泊",
  高知: "未訪問",

  福岡: "宿泊",
  佐賀: "宿泊",
  長崎: "訪問",
  熊本: "宿泊",
  大分: "宿泊",
  宮崎: "訪問",
  鹿児島: "宿泊",

  沖縄: "宿泊"
};

/* =========================
   SVG読み込み
========================= */

const mapObject = document.getElementById("japan-map");

mapObject.addEventListener("load", () => {

  const svgDoc = mapObject.contentDocument;

  if (!svgDoc) return;

  applyColors(svgDoc);

  setupPopup(svgDoc);

  updateStats();

});

/* =========================
   色適用
========================= */

function applyColors(svgDoc) {

  Object.entries(prefectureStatus).forEach(
    ([prefecture, status]) => {

      const el = svgDoc.getElementById(prefecture);

      if (!el) {
        console.log(`${prefecture} が見つかりません`);
        return;
      }

      el.classList.add("prefecture");

      el.setAttribute(
        "fill",
        COLORS[status]
      );
    }
  );
}

/* =========================
   統計更新
========================= */

function updateStats() {

  const visitedCount = Object.values(
    prefectureStatus
  ).filter(status =>
    status !== "未訪問"
  ).length;

  const rate = Math.round(
    (visitedCount / 47) * 100
  );

  document.getElementById(
    "visited-count"
  ).textContent = visitedCount;

  document.getElementById(
    "achievement-rate"
  ).textContent = `${rate}%`;

  document.getElementById(
    "progress-fill"
  ).style.width = `${rate}%`;
}

/* =========================
   ポップアップ
========================= */

function setupPopup(svgDoc) {

  const popup = document.getElementById("popup");

  Object.entries(prefectureStatus).forEach(
    ([prefecture, status]) => {

      const el = svgDoc.getElementById(prefecture);

      if (!el) return;

      el.addEventListener("click", (event) => {

        showPopup(
          popup,
          prefecture,
          status,
          event
        );

      });

    }
  );
}

/* =========================
   ポップアップ表示
========================= */

let popupTimer = null;

function showPopup(
  popup,
  prefecture,
  status,
  event
) {

  popup.innerHTML = `
    <div>${prefecture}</div>
    <div>${status}</div>
  `;

  popup.style.left = `${event.clientX}px`;
  popup.style.top = `${event.clientY + 80}px`;

  popup.classList.add("show");

  clearTimeout(popupTimer);

  popupTimer = setTimeout(() => {
    popup.classList.remove("show");
  }, 1500);
}
