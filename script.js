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

  北海道: "宿泊",
  青森県: "未訪問",
  岩手県: "未訪問",
  宮城県: "訪問",
  秋田県: "未訪問",
  山形県: "未訪問",
  福島県: "訪問",

  茨城県: "訪問",
  栃木県: "訪問",
  群馬県: "宿泊",
  埼玉県: "訪問",
  千葉県: "訪問",
  東京都: "居住",
  神奈川県: "訪問",

  新潟県: "未訪問",
  富山県: "未訪問",
  石川県: "未訪問",
  福井県: "未訪問",
  山梨県: "宿泊",
  長野県: "宿泊",

  岐阜県: "未訪問",
  静岡県: "訪問",
  愛知県: "訪問",

  三重県: "未訪問",
  滋賀県: "未訪問",
  京都府: "訪問",
  大阪府: "訪問",
  兵庫県: "宿泊",
  奈良県: "訪問",
  和歌山県: "未訪問",

  鳥取県: "未訪問",
  島根県: "未訪問",
  岡山県: "訪問",
  広島県: "訪問",
  山口県: "未訪問",

  徳島県: "未訪問",
  香川県: "訪問",
  愛媛県: "未訪問",
  高知県: "未訪問",

  福岡県: "訪問",
  佐賀県: "未訪問",
  長崎県: "未訪問",
  熊本県: "未訪問",
  大分県: "未訪問",
  宮崎県: "未訪問",
  鹿児島県: "未訪問",

  沖縄県: "訪問"
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
