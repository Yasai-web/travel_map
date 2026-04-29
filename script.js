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
  栃木: "訪問",
  群馬: "宿泊",
  埼玉: "訪問",
  千葉: "訪問",
  東京: "居住",
  神奈川: "訪問",

  新潟: "宿泊",
  富山: "訪問",
  石川: "宿泊",
  福井: "訪問",
  山梨: "訪問",
  長野県: "宿泊",

  岐阜県: "宿泊",
  静岡県: "訪問",
  愛知県: "宿泊",

  三重県: "宿泊",
  滋賀県: "宿泊",
  京都府: "宿泊",
  大阪府: "宿泊",
  兵庫県: "訪問",
  奈良県: "訪問",
  和歌山県: "未訪問",

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

      if (!el) return;

      el.classList.add("prefecture");

      el.style.fill = COLORS[status];
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
  popup.style.top = `${event.clientY}px`;

  popup.classList.add("show");

  clearTimeout(popupTimer);

  popupTimer = setTimeout(() => {
    popup.classList.remove("show");
  }, 1500);
}
