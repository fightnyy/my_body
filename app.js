const STORAGE_KEYS = {
  routineBase: "xerxise-routine-v2",
  historyBase: "xerxise-history-v2",
  presetBase: "xerxise-preset-v1",
  prBase: "xerxise-pr-v1",
  onboardingDismissed: "xerxise-onboarding-dismissed-v1",
  legacyRoutineV1: "xerxise-routine-v1",
  legacyHistoryV1: "xerxise-history-v1",
  legacyRoutine: "set-pilot-routine-v1",
  wizardHidden: "xerxise-wizard-hidden-v1",
};

const ALERT_SECONDS = 60;
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30분

const DEFAULT_UPPER_ROUTINE_TEMPLATE = [
  {
    name: "행잉 니업",
    targetSets: 3,
    exerciseType: "bodyweight",
    description: "매달린 상태에서 무릎을 가슴 방향으로 당겨 복부를 수축합니다.",
  },
  {
    name: "슬로우 푸쉬업",
    targetSets: 2,
    exerciseType: "bodyweight",
    description: "내려가는 구간을 3초 이상 천천히 제어해 가슴과 코어 긴장 시간을 늘립니다.",
  },
  {
    name: "스미스 머신 벤치 프레스",
    targetSets: 6,
    exerciseType: "weight",
    description: "견갑을 고정하고 바를 가슴 중앙으로 내려 안정적으로 밀어 올립니다.",
  },
  {
    name: "케이블 시티드 로우",
    targetSets: 4,
    exerciseType: "weight",
    description: "가슴을 세운 상태에서 손잡이를 배꼽 방향으로 당겨 등 수축을 만듭니다.",
  },
  {
    name: "어시스트 풀업",
    targetSets: 4,
    exerciseType: "bodyweight",
    description: "반동 없이 내려오며 광배와 이두로 몸을 끌어올립니다.",
  },
  {
    name: "스탠딩 덤벨 숄더 프레스",
    targetSets: 3,
    exerciseType: "weight",
    description: "허리를 과하게 젖히지 않고 팔꿈치 아래 손목을 유지한 채 위로 밀어 올립니다.",
  },
  {
    name: "리버스 팩덱 플라이",
    targetSets: 4,
    exerciseType: "weight",
    description: "어깨를 으쓱하지 않고 팔을 바깥으로 벌려 후면 삼각근을 집중 자극합니다.",
  },
  {
    name: "케이블 컬",
    targetSets: 4,
    exerciseType: "weight",
    description: "팔꿈치를 고정한 채 케이블을 당겨 이두근을 집중 수축합니다.",
  },
  {
    name: "케이블 푸쉬다운",
    targetSets: 4,
    exerciseType: "weight",
    description: "팔꿈치를 몸에 붙이고 케이블을 아래로 밀어 삼두근을 수축합니다.",
  },
];

const DEFAULT_LOWER_ROUTINE_TEMPLATE = [
  {
    name: "크런치",
    targetSets: 3,
    exerciseType: "bodyweight",
    description: "등을 바닥에 대고 상체를 말아 올려 복부 상단을 집중 수축합니다.",
  },
  {
    name: "플랭크",
    targetSets: 3,
    exerciseType: "bodyweight",
    description: "팔꿈치와 발끝으로 몸을 지탱하며 코어 안정성을 유지합니다.",
  },
  {
    name: "레그 프레스",
    targetSets: 4,
    exerciseType: "weight",
    description: "발 전체로 플랫폼을 밀며 무릎과 발끝 방향을 맞춰 하체를 안정적으로 자극합니다.",
  },
  {
    name: "바벨 힙 쓰러스트",
    targetSets: 3,
    exerciseType: "weight",
    description: "데드리프트 대신 둔근과 햄스트링을 집중 강화하는 동작으로 허리 부담을 줄여줍니다.",
  },
  {
    name: "스미스 머신 스쿼트",
    targetSets: 7,
    exerciseType: "weight",
    description: "코어를 단단히 고정하고 고관절-무릎을 함께 굽혀 하체 전반을 강하게 훈련합니다.",
  },
  {
    name: "시티드 힙 어브덕션",
    targetSets: 2,
    exerciseType: "weight",
    description: "앉은 자세에서 다리를 바깥으로 벌려 둔근 측면을 자극합니다.",
  },
  {
    name: "시티드 힙 어덕션",
    targetSets: 2,
    exerciseType: "weight",
    description: "앉은 자세에서 다리를 안쪽으로 모아 내전근을 강화합니다.",
  },
  {
    name: "레그 컬",
    targetSets: 4,
    exerciseType: "weight",
    description: "무릎을 굽히는 구간을 통제해 햄스트링 수축을 끝까지 가져갑니다.",
  },
];

const ALL_DEFAULT_ROUTINES = [...DEFAULT_UPPER_ROUTINE_TEMPLATE, ...DEFAULT_LOWER_ROUTINE_TEMPLATE];

// ──────────────────────────────────────────────────────────
function getExerciseGifUrl(name) {
  const filename = name.replace(/ /g, '_').replace(/\//g, '_');
  return `gifs/${filename}.gif`;
}

// 운동 데이터베이스 (검색용)
// ──────────────────────────────────────────────────────────
const EXERCISE_DB = [
  // 가슴
  { name: "바벨 벤치프레스", type: "weight", sets: 4, rest: 90, category: "가슴", aliases: ["벤치프레스", "가슴운동"] },
  { name: "덤벨 벤치프레스", type: "weight", sets: 4, rest: 90, category: "가슴" },
  { name: "인클라인 벤치프레스", type: "weight", sets: 4, rest: 90, category: "가슴" },
  { name: "케이블 크로스오버", type: "weight", sets: 3, rest: 60, category: "가슴" },
  { name: "딥스", type: "bodyweight", sets: 3, rest: 90, category: "가슴", aliases: ["평행봉 딥스"] },
  { name: "펙덱 플라이", type: "weight", sets: 3, rest: 60, category: "가슴" },
  { name: "체스트 프레스 머신", type: "weight", sets: 3, rest: 60, category: "가슴" },
  // 등
  { name: "랫풀다운", type: "weight", sets: 4, rest: 90, category: "등" },
  { name: "바벨 로우", type: "weight", sets: 4, rest: 90, category: "등" },
  { name: "덤벨 로우", type: "weight", sets: 4, rest: 90, category: "등" },
  { name: "시티드 케이블 로우", type: "weight", sets: 4, rest: 90, category: "등" },
  { name: "풀업", type: "bodyweight", sets: 3, rest: 120, category: "등", aliases: ["턱걸이", "철봉"] },
  { name: "친업", type: "bodyweight", sets: 3, rest: 120, category: "등", aliases: ["언더그립 턱걸이"] },
  { name: "티바 로우", type: "weight", sets: 4, rest: 90, category: "등" },
  { name: "페이스풀", type: "weight", sets: 3, rest: 60, category: "등" },
  // 어깨
  { name: "오버헤드 프레스", type: "weight", sets: 4, rest: 90, category: "어깨" },
  { name: "사이드 레터럴 레이즈", type: "weight", sets: 3, rest: 60, category: "어깨" },
  { name: "프론트 레이즈", type: "weight", sets: 3, rest: 60, category: "어깨" },
  { name: "리어 델트 플라이", type: "weight", sets: 3, rest: 60, category: "어깨" },
  { name: "아놀드 프레스", type: "weight", sets: 3, rest: 90, category: "어깨" },
  { name: "덤벨 숄더 프레스", type: "weight", sets: 4, rest: 90, category: "어깨" },
  // 하체
  { name: "바벨 스쿼트", type: "weight", sets: 4, rest: 120, category: "하체", aliases: ["스쿼트", "앉았다일어서기"] },
  { name: "레그프레스", type: "weight", sets: 4, rest: 90, category: "하체" },
  { name: "루마니안 데드리프트", type: "weight", sets: 4, rest: 90, category: "하체" },
  { name: "레그 익스텐션", type: "weight", sets: 3, rest: 60, category: "하체" },
  { name: "레그 컬", type: "weight", sets: 4, rest: 60, category: "하체" },
  { name: "힙 쓰러스트", type: "weight", sets: 4, rest: 90, category: "하체" },
  { name: "런지", type: "weight", sets: 3, rest: 60, category: "하체", aliases: ["앞으로 런지", "포워드 런지"] },
  { name: "카프 레이즈", type: "weight", sets: 4, rest: 60, category: "하체" },
  { name: "불가리안 스플릿 스쿼트", type: "weight", sets: 3, rest: 90, category: "하체" },
  // 팔
  { name: "바벨 컬", type: "weight", sets: 3, rest: 60, category: "팔" },
  { name: "덤벨 컬", type: "weight", sets: 3, rest: 60, category: "팔" },
  { name: "트라이셉 푸쉬다운", type: "weight", sets: 3, rest: 60, category: "팔" },
  { name: "해머 컬", type: "weight", sets: 3, rest: 60, category: "팔" },
  { name: "오버헤드 트라이셉 익스텐션", type: "weight", sets: 3, rest: 60, category: "팔" },
  { name: "케이블 컬", type: "weight", sets: 3, rest: 60, category: "팔" },
  // 코어
  { name: "플랭크", type: "time", sets: 3, rest: 60, category: "코어" },
  { name: "크런치", type: "bodyweight", sets: 3, rest: 60, category: "코어" },
  { name: "레그 레이즈", type: "bodyweight", sets: 3, rest: 60, category: "코어" },
  { name: "행잉 니업", type: "bodyweight", sets: 3, rest: 60, category: "코어" },
  { name: "러시안 트위스트", type: "bodyweight", sets: 3, rest: 60, category: "코어" },
  { name: "사이드 플랭크", type: "time", sets: 3, rest: 60, category: "코어" },
  // 전신
  { name: "데드리프트", type: "weight", sets: 4, rest: 180, category: "전신", aliases: ["컨벤셔널 데드리프트"] },
  { name: "클린 앤 프레스", type: "weight", sets: 4, rest: 120, category: "전신" },
  { name: "버피", type: "bodyweight", sets: 3, rest: 90, category: "전신" },
  // 기본 루틴 운동들 (DEFAULT_UPPER / DEFAULT_LOWER 포함)
  { name: "스미스 머신 벤치 프레스", type: "weight", sets: 6, rest: 90, category: "가슴" },
  { name: "케이블 시티드 로우", type: "weight", sets: 4, rest: 90, category: "등" },
  { name: "어시스트 풀업", type: "bodyweight", sets: 4, rest: 120, category: "등" },
  { name: "스탠딩 덤벨 숄더 프레스", type: "weight", sets: 3, rest: 90, category: "어깨" },
  { name: "리버스 팩덱 플라이", type: "weight", sets: 4, rest: 60, category: "어깨" },
  { name: "레그 프레스", type: "weight", sets: 4, rest: 90, category: "하체" },
  { name: "바벨 힙 쓰러스트", type: "weight", sets: 3, rest: 90, category: "하체" },
  { name: "스미스 머신 스쿼트", type: "weight", sets: 7, rest: 90, category: "하체" },
  { name: "시티드 힙 어브덕션", type: "weight", sets: 2, rest: 60, category: "하체" },
  { name: "시티드 힙 어덕션", type: "weight", sets: 2, rest: 60, category: "하체" },
  // 가슴 추가
  { name: "인클라인 덤벨 프레스", type: "weight", sets: 4, rest: 90, category: "가슴" },
  { name: "디클라인 벤치프레스", type: "weight", sets: 4, rest: 90, category: "가슴" },
  { name: "머신 플라이", type: "weight", sets: 3, rest: 60, category: "가슴" },
  // 등 추가
  { name: "시티드 로우 머신", type: "weight", sets: 4, rest: 90, category: "등" },
  { name: "원암 덤벨 로우", type: "weight", sets: 4, rest: 90, category: "등" },
  { name: "리버스 그립 랫풀다운", type: "weight", sets: 3, rest: 90, category: "등" },
  { name: "스트레이트 암 풀다운", type: "weight", sets: 3, rest: 60, category: "등" },
  // 어깨 추가
  { name: "머신 숄더 프레스", type: "weight", sets: 4, rest: 90, category: "어깨" },
  { name: "업라이트 로우", type: "weight", sets: 3, rest: 60, category: "어깨" },
  { name: "케이블 페이스 풀", type: "weight", sets: 3, rest: 60, category: "어깨" },
  // 하체 추가
  { name: "고블릿 스쿼트", type: "weight", sets: 3, rest: 90, category: "하체" },
  { name: "프론트 스쿼트", type: "weight", sets: 4, rest: 120, category: "하체" },
  { name: "스모 데드리프트", type: "weight", sets: 4, rest: 120, category: "하체" },
  { name: "케이블 힙 어브덕션", type: "weight", sets: 3, rest: 60, category: "하체" },
  { name: "글루트 킥백 머신", type: "weight", sets: 3, rest: 60, category: "하체" },
  { name: "워킹 런지", type: "weight", sets: 3, rest: 60, category: "하체" },
  { name: "시시 스쿼트", type: "bodyweight", sets: 3, rest: 60, category: "하체" },
  { name: "스텝업", type: "weight", sets: 3, rest: 60, category: "하체" },
  // 팔 추가
  { name: "케이블 푸쉬다운", type: "weight", sets: 3, rest: 60, category: "팔" },
  { name: "이지바 컬", type: "weight", sets: 3, rest: 60, category: "팔" },
  { name: "컨센트레이션 컬", type: "weight", sets: 3, rest: 60, category: "팔" },
  { name: "클로즈그립 벤치프레스", type: "weight", sets: 3, rest: 90, category: "팔" },
  { name: "리스트 컬", type: "weight", sets: 3, rest: 60, category: "팔" },
  // 코어 추가
  { name: "윗몸일으키기", type: "bodyweight", sets: 3, rest: 60, category: "코어" },
  { name: "바이시클 크런치", type: "bodyweight", sets: 3, rest: 60, category: "코어" },
  { name: "마운틴 클라이머", type: "time", sets: 3, rest: 60, category: "코어" },
  { name: "행잉 레그 레이즈", type: "bodyweight", sets: 3, rest: 60, category: "코어" },
  { name: "케이블 크런치", type: "weight", sets: 3, rest: 60, category: "코어" },
  { name: "데드 버그", type: "bodyweight", sets: 3, rest: 60, category: "코어" },
  // 전신 추가
  { name: "케틀벨 스윙", type: "weight", sets: 4, rest: 90, category: "전신" },
  { name: "쓰러스터", type: "weight", sets: 3, rest: 90, category: "전신" },
  { name: "맨몸 스쿼트", type: "bodyweight", sets: 3, rest: 60, category: "전신" },
  { name: "점프 스쿼트", type: "bodyweight", sets: 3, rest: 60, category: "전신" },
  // 유산소/맨몸 추가
  { name: "점핑잭", type: "time", sets: 3, rest: 30, category: "전신" },
  { name: "하이니", type: "time", sets: 3, rest: 30, category: "전신" },
  { name: "박스점프", type: "bodyweight", sets: 3, rest: 60, category: "전신" },
  { name: "푸쉬업", type: "bodyweight", sets: 3, rest: 60, category: "가슴", aliases: ["팔굽혀펴기"] },
  { name: "인클라인 푸쉬업", type: "bodyweight", sets: 3, rest: 60, category: "가슴", aliases: ["인클라인 팔굽혀펴기"] },
  // 스트레칭/재활
  { name: "밴드 풀 어파트", type: "weight", sets: 3, rest: 30, category: "어깨" },
  { name: "힙 플렉서 스트레치", type: "time", sets: 2, rest: 30, category: "하체" },
  { name: "폼롤러 상체", type: "time", sets: 2, rest: 30, category: "전신" },
  { name: "폼롤러 하체", type: "time", sets: 2, rest: 30, category: "전신" },
  { name: "월 슬라이드", type: "bodyweight", sets: 3, rest: 30, category: "어깨" },
  { name: "인버티드 로우", type: "bodyweight", sets: 3, rest: 60, category: "등" },
  { name: "닐링 힙 쓰러스트", type: "bodyweight", sets: 3, rest: 60, category: "하체" },
];

function getPastExercises() {
  const seen = new Map(); // normalized name -> entry
  for (const entry of state.history) {
    if (!Array.isArray(entry.exercises)) continue;
    for (const ex of entry.exercises) {
      if (!ex.name) continue;
      const key = normalizeExerciseName(ex.name);
      if (!seen.has(key)) {
        seen.set(key, {
          name: ex.name,
          type: ex.exerciseType || "weight",
          sets: ex.targetSets || 3,
          rest: ex.restSeconds || ALERT_SECONDS,
          category: "",
          source: "history",
        });
      }
    }
  }
  return Array.from(seen.values());
}

function searchExercises(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const past = getPastExercises();
  const pastNames = new Set(past.map((e) => normalizeExerciseName(e.name)));

  const pastMatches = past.filter((e) => e.name.toLowerCase().includes(q));

  const dbMatches = EXERCISE_DB
    .filter((e) => {
      const normKey = normalizeExerciseName(e.name);
      if (pastNames.has(normKey)) return false;
      if (e.name.toLowerCase().includes(q)) return true;
      if (e.aliases && e.aliases.some((a) => a.toLowerCase().includes(q))) return true;
      return false;
    })
    .map((e) => ({ ...e, source: "db" }));

  return [...pastMatches, ...dbMatches].slice(0, 8);
}

function getPopularExercises() {
  // Count exercise frequency from history
  const freq = new Map();
  for (const entry of state.history) {
    if (!Array.isArray(entry.exercises)) continue;
    for (const ex of entry.exercises) {
      if (!ex.name) continue;
      const key = normalizeExerciseName(ex.name);
      freq.set(key, (freq.get(key) || 0) + 1);
    }
  }

  // Sort EXERCISE_DB by frequency descending, take top 8
  return EXERCISE_DB
    .map((e) => ({ ...e, source: "db", _freq: freq.get(normalizeExerciseName(e.name)) || 0 }))
    .sort((a, b) => b._freq - a._freq)
    .slice(0, 8)
    .map(({ _freq, ...rest }) => rest);
}

function renderSearchResults(results, query) {
  const container = document.querySelector("#search-results");
  if (!container) return;

  const typeLabel = { weight: "웨이트", bodyweight: "맨몸", time: "시간" };

  let html = "";

  if (!query || !query.trim()) {
    // Show past + popular sections
    const past = getPastExercises().slice(0, 4);
    if (past.length > 0) {
      html += '<p class="search-section-label">최근 운동</p>';
      for (const ex of past) {
        html += buildResultItem(ex, typeLabel);
      }
    }
    const popular = getPopularExercises().filter(
      (e) => !past.some((p) => normalizeExerciseName(p.name) === normalizeExerciseName(e.name))
    ).slice(0, 4);
    if (popular.length > 0) {
      html += '<p class="search-section-label">인기 운동</p>';
      for (const ex of popular) {
        html += buildResultItem(ex, typeLabel);
      }
    }
    if (!html) {
      // No history at all – show first 8 from DB
      html += '<p class="search-section-label">추천 운동</p>';
      for (const ex of EXERCISE_DB.slice(0, 8)) {
        html += buildResultItem({ ...ex, source: "db" }, typeLabel);
      }
    }
  } else {
    for (const ex of results) {
      html += buildResultItem(ex, typeLabel);
    }
    if (results.length === 0) {
      html += '<p class="search-no-result">검색 결과가 없습니다</p>';
    }
  }

  html += '<button class="search-result-item manual-add" type="button" data-manual="1"><span class="result-name">✏️ 수기로 추가</span></button>';

  container.innerHTML = html;
  container.classList.remove("hidden");
}

function buildResultItem(ex, typeLabel) {
  const sourceTag = ex.source === "history"
    ? '<span class="result-source">최근</span>'
    : "";
  const metaParts = [];
  if (ex.category) metaParts.push(ex.category);
  if (ex.type) metaParts.push(typeLabel[ex.type] || ex.type);
  if (ex.sets) metaParts.push(`${ex.sets}세트`);
  const meta = metaParts.join(" · ");
  return `<button class="search-result-item" type="button"
    data-name="${ex.name.replace(/"/g, "&quot;")}"
    data-type="${ex.type || "weight"}"
    data-sets="${ex.sets || 3}"
    data-rest="${ex.rest || 60}">
    <div class="result-info">
      <span class="result-name">${ex.name}</span>
      ${meta ? `<span class="result-meta">${meta}</span>` : ""}
    </div>
    ${sourceTag}
  </button>`;
}

function showExerciseForm(prefill) {
  const wrap = document.querySelector("#exercise-search-wrap");
  const form = document.querySelector("#exercise-form");
  const titleEl = document.querySelector("#add-form-title");
  const nameEl = document.querySelector("#exercise-name");
  const setsEl = document.querySelector("#exercise-sets");
  const restEl = document.querySelector("#exercise-rest");
  const toggle = document.querySelector("#exercise-type-toggle");

  if (wrap) wrap.classList.add("hidden");
  if (form) form.classList.remove("hidden");

  if (prefill) {
    if (titleEl) titleEl.textContent = prefill.name || "운동 추가";
    if (nameEl) nameEl.value = prefill.name || "";
    if (setsEl) setsEl.value = prefill.sets || 3;
    if (restEl) restEl.value = String(prefill.rest || 60);

    const type = prefill.type || "weight";
    selectedExerciseType = type;
    if (toggle) {
      toggle.querySelectorAll(".type-btn").forEach((b) => b.classList.remove("active"));
      const btn = toggle.querySelector(`[data-type="${type}"]`);
      if (btn) btn.classList.add("active");
    }
  } else {
    if (titleEl) titleEl.textContent = "운동 추가";
    if (nameEl) nameEl.value = "";
    if (setsEl) setsEl.value = "";
    if (restEl) restEl.value = "60";
    selectedExerciseType = "weight";
    if (toggle) {
      toggle.querySelectorAll(".type-btn").forEach((b) => b.classList.remove("active"));
      const weightBtn = toggle.querySelector('[data-type="weight"]');
      if (weightBtn) weightBtn.classList.add("active");
    }
  }

  if (nameEl) nameEl.focus();
}

function hideExerciseForm() {
  const wrap = document.querySelector("#exercise-search-wrap");
  const form = document.querySelector("#exercise-form");
  const searchInput = document.querySelector("#exercise-search");
  const results = document.querySelector("#search-results");

  if (form) form.classList.add("hidden");
  if (wrap) wrap.classList.remove("hidden");
  if (results) results.classList.add("hidden");
  if (searchInput) {
    searchInput.value = "";
    searchInput.focus();
  }
}

// ──────────────────────────────────────────────────────────
// 맞춤 운동 추천 데이터 (근거 기반)
// Sources: ACSM, WHO, NSCA, PubMed 논문
// ──────────────────────────────────────────────────────────

const RECOMMEND_AGE_GROUPS = [
  { value: "teen", label: "10대~20대", desc: "성장기 / 체력 기반 구축" },
  { value: "adult", label: "30대~40대", desc: "근력 유지 / 대사 건강" },
  { value: "middle", label: "50대~60대", desc: "관절 보호 / 골밀도" },
  { value: "senior", label: "70대 이상", desc: "낙상 예방 / 기능 체력" },
];

const RECOMMEND_GENDERS = [
  { value: "male", label: "남성" },
  { value: "female", label: "여성" },
];

const RECOMMEND_LEVELS = [
  { value: "beginner", label: "입문 (0~6개월)", desc: "운동을 처음 시작하거나 6개월 미만" },
  { value: "intermediate", label: "중급 (6개월~2년)", desc: "기본 동작에 익숙하고 점진적 과부하 적용 가능" },
  { value: "advanced", label: "상급 (2년 이상)", desc: "주기화 프로그래밍이 필요한 숙련자" },
];

const RECOMMENDATION_DB = {
  // ── 남성 · 10대~20대 ──
  "male_teen_beginner": {
    title: "남성 10대~20대 입문자",
    summary: "동작 패턴 학습에 집중하며 전신을 균형 있게 훈련합니다.",
    evidence: "NSCA: 청소년 저항 훈련은 적절한 지도 하에 안전하며, 초기 근력 향상은 주로 신경근 적응에 의한 것입니다.",
    source: "NSCA Youth Resistance Training Position Statement (2009)",
    frequency: "주 2~3회, 전신 운동",
    guideline: "1RM의 60~70% · 2~3세트 · 10~12회 · 휴식 90초",
    routine: [
      { name: "레그 프레스", targetSets: 3, description: "머신으로 안전하게 하체 전반을 훈련합니다. 무릎과 발끝 방향을 맞추세요." },
      { name: "랫 풀다운", targetSets: 3, description: "가슴을 펴고 바를 쇄골 방향으로 당겨 광배근을 수축합니다." },
      { name: "덤벨 체스트 프레스", targetSets: 3, description: "벤치에 눕고 견갑을 고정한 채 덤벨을 위로 밀어 올립니다." },
      { name: "케이블 시티드 로우", targetSets: 3, description: "가슴을 세운 상태에서 손잡이를 배꼽 방향으로 당겨 등 수축을 만듭니다." },
      { name: "덤벨 숄더 프레스", targetSets: 2, description: "허리를 과하게 젖히지 않고 팔꿈치 아래 손목을 유지한 채 위로 밀어 올립니다." },
      { name: "플랭크", targetSets: 2, exerciseType: "time", description: "어깨-골반-발목이 일직선이 되도록 유지하며 코어를 단단히 잡습니다. 20~30초씩." },
    ],
  },
  "male_teen_intermediate": {
    title: "남성 10대~20대 중급자",
    summary: "상·하체 분할로 볼륨을 높이고 점진적 과부하를 적용합니다.",
    evidence: "ACSM: 중급자는 1RM의 70~85%에서 3~4세트, 6~12회 반복이 권장됩니다.",
    source: "ACSM Progression Models in Resistance Training (2009)",
    frequency: "주 3~4회, 상하체 분할",
    guideline: "1RM의 70~80% · 3~4세트 · 8~10회 · 휴식 90~120초",
    routine: [
      { name: "바벨 스쿼트", targetSets: 4, description: "코어를 단단히 고정하고 고관절-무릎을 함께 굽혀 하체 전반을 훈련합니다." },
      { name: "루마니안 데드리프트", targetSets: 3, description: "엉덩이를 뒤로 빼며 내려가 햄스트링과 둔근에 스트레치를 느낍니다." },
      { name: "벤치 프레스", targetSets: 4, description: "견갑을 고정하고 바를 가슴 중앙으로 내려 안정적으로 밀어 올립니다." },
      { name: "바벨 로우", targetSets: 4, description: "상체를 45도로 숙이고 바를 배꼽 방향으로 당겨 등 전체를 자극합니다." },
      { name: "오버헤드 프레스", targetSets: 3, description: "바벨을 어깨에서 머리 위로 밀어 올려 삼각근 전체를 훈련합니다." },
      { name: "풀업 / 어시스트 풀업", targetSets: 3, description: "반동 없이 광배와 이두로 몸을 끌어올립니다." },
      { name: "레그 컬", targetSets: 3, description: "무릎을 굽히는 구간을 통제해 햄스트링 수축을 끝까지 가져갑니다." },
    ],
  },
  "male_teen_advanced": {
    title: "남성 10대~20대 상급자",
    summary: "주기화 프로그래밍으로 근비대·근력·파워를 체계적으로 발전시킵니다.",
    evidence: "NSCA: 상급자는 일간 비선형 주기화(DUP)로 강도와 볼륨을 변화시키는 것이 효과적입니다.",
    source: "NSCA CSCS Chapter 17: Program Design",
    frequency: "주 4~5회, Push/Pull/Legs 분할",
    guideline: "1RM의 75~90% · 4~5세트 · 4~10회 · 주기화 적용",
    routine: [
      { name: "바벨 스쿼트", targetSets: 5, description: "근력일 4~6회 / 근비대일 8~10회로 주기화합니다." },
      { name: "컨벤셔널 데드리프트", targetSets: 4, description: "전신 복합 운동의 핵심. 허리를 중립으로 유지하세요." },
      { name: "벤치 프레스", targetSets: 5, description: "근력일과 볼륨일을 교차하며 점진적으로 중량을 올립니다." },
      { name: "바벨 로우", targetSets: 4, description: "등 두께를 만드는 핵심 복합 운동입니다." },
      { name: "오버헤드 프레스", targetSets: 4, description: "어깨 근력과 안정성을 동시에 강화합니다." },
      { name: "가중 풀업", targetSets: 4, description: "웨이트 벨트로 부하를 추가해 광배근을 강하게 자극합니다." },
      { name: "바벨 힙 쓰러스트", targetSets: 4, description: "둔근과 햄스트링을 집중 강화하는 동작입니다." },
      { name: "덤벨 래터럴 레이즈", targetSets: 3, description: "측면 삼각근을 고립시켜 어깨 볼륨을 키웁니다." },
    ],
  },

  // ── 여성 · 10대~20대 ──
  "female_teen_beginner": {
    title: "여성 10대~20대 입문자",
    summary: "후면 사슬(둔근·햄스트링) 중심으로 골반 안정성과 전신 균형을 잡습니다.",
    evidence: "여성은 Type I(지근) 섬유 비율이 높아 근지구력이 뛰어나며, 중간 강도 프로그램에서 운동 지속률이 더 높습니다.",
    source: "Prescribing Exercise for Women (PMC3702775)",
    frequency: "주 2~3회, 전신 운동",
    guideline: "1RM의 60~70% · 2~3세트 · 10~12회 · 휴식 60~90초",
    routine: [
      { name: "고블릿 스쿼트", targetSets: 3, description: "덤벨을 가슴 앞에 잡고 스쿼트하여 하체와 코어를 동시에 훈련합니다." },
      { name: "루마니안 데드리프트", targetSets: 3, description: "엉덩이를 뒤로 빼며 햄스트링 스트레치를 느끼고 둔근으로 올라옵니다." },
      { name: "힙 쓰러스트", targetSets: 3, description: "등 상부를 벤치에 기대고 골반을 들어올려 둔근을 집중 수축합니다." },
      { name: "랫 풀다운", targetSets: 3, description: "가슴을 펴고 바를 쇄골 방향으로 당겨 상체 후면을 강화합니다." },
      { name: "케이블 시티드 로우", targetSets: 3, description: "등 상부의 약한 부분을 보강하는 핵심 풀링 동작입니다." },
      { name: "머신 체스트 프레스", targetSets: 2, description: "머신으로 안전하게 가슴과 전면 삼각근을 훈련합니다." },
    ],
  },
  "female_teen_intermediate": {
    title: "여성 10대~20대 중급자",
    summary: "하체·둔근 볼륨을 높이고 상체 밀기·당기기의 균형을 맞춥니다.",
    evidence: "ACSM: 중급 여성에게 1RM의 70~80%에서 3~4세트, 8~12회가 근비대에 효과적입니다.",
    source: "ACSM Progression Models in Resistance Training (2009)",
    frequency: "주 3~4회, 상하체 분할",
    guideline: "1RM의 70~80% · 3~4세트 · 8~12회 · 휴식 90초",
    routine: [
      { name: "바벨 스쿼트", targetSets: 4, description: "코어를 고정하고 풀 ROM으로 하체 전반을 강하게 훈련합니다." },
      { name: "바벨 힙 쓰러스트", targetSets: 4, description: "둔근 활성화의 핵심. 골반 상단에서 2초간 정지합니다." },
      { name: "루마니안 데드리프트", targetSets: 3, description: "햄스트링과 둔근에 집중하는 힌지 패턴입니다." },
      { name: "랫 풀다운", targetSets: 3, description: "등 넓이를 만드는 기본 당기기 동작입니다." },
      { name: "인클라인 덤벨 프레스", targetSets: 3, description: "상부 가슴과 전면 삼각근을 함께 훈련합니다." },
      { name: "케이블 페이스 풀", targetSets: 3, description: "후면 삼각근과 회전근개 건강에 필수적인 동작입니다." },
      { name: "케이블 힙 어브덕션", targetSets: 3, description: "중둔근을 고립시켜 골반 안정성을 강화합니다." },
    ],
  },
  "female_teen_advanced": {
    title: "여성 10대~20대 상급자",
    summary: "주기화와 고급 테크닉을 적용해 체계적으로 발전시킵니다.",
    evidence: "여성도 남성과 동등한 상대적 근력 향상이 가능하며, 주기화 프로그래밍이 효과적입니다.",
    source: "Sex Differences in Muscle Strength (PubMed 2023)",
    frequency: "주 4~5회, 부위별 분할",
    guideline: "1RM의 75~90% · 4~5세트 · 4~12회 · 블록 주기화",
    routine: [
      { name: "바벨 스쿼트", targetSets: 5, description: "주기화에 따라 고중량(4~6회)과 볼륨(8~12회)을 교차합니다." },
      { name: "바벨 힙 쓰러스트", targetSets: 4, description: "고중량으로 둔근 근력을 극대화합니다." },
      { name: "컨벤셔널 데드리프트", targetSets: 4, description: "전신 근력의 기초를 다지는 복합 운동입니다." },
      { name: "인클라인 벤치 프레스", targetSets: 4, description: "상체 밀기 패턴의 핵심입니다." },
      { name: "바벨 로우", targetSets: 4, description: "등 두께와 상체 밸런스를 위한 필수 당기기 동작입니다." },
      { name: "오버헤드 프레스", targetSets: 3, description: "삼각근 전체와 코어 안정성을 함께 훈련합니다." },
      { name: "불가리안 스플릿 스쿼트", targetSets: 3, description: "단측 훈련으로 좌우 불균형을 교정하고 둔근을 추가 자극합니다." },
      { name: "케이블 페이스 풀", targetSets: 3, description: "어깨 건강을 위한 후면 삼각근·회전근개 보조 운동입니다." },
    ],
  },

  // ── 남성 · 30대~40대 ──
  "male_adult_beginner": {
    title: "남성 30대~40대 입문자",
    summary: "근감소 예방을 위해 복합 운동 패턴을 학습하고 대사 건강을 개선합니다.",
    evidence: "근육량은 30대부터 감소하기 시작하며, 저항 훈련이 가장 효과적인 대응책입니다.",
    source: "ACSM Position Stand: Quantity and Quality of Exercise (2011)",
    frequency: "주 3회, 전신 운동 + 유산소 주 3회",
    guideline: "1RM의 60~70% · 3세트 · 10~12회 · 휴식 90초",
    routine: [
      { name: "레그 프레스", targetSets: 3, description: "머신으로 안전하게 하체 전반을 자극합니다." },
      { name: "루마니안 데드리프트", targetSets: 3, description: "햄스트링과 둔근을 강화하며 요추를 보호합니다." },
      { name: "머신 체스트 프레스", targetSets: 3, description: "가슴과 삼두를 안정적으로 훈련합니다." },
      { name: "케이블 시티드 로우", targetSets: 3, description: "등 중앙부를 타겟으로 자세를 교정하는 효과도 있습니다." },
      { name: "덤벨 숄더 프레스", targetSets: 2, description: "어깨 근력을 키워 일상 동작 능력을 향상시킵니다." },
      { name: "랫 풀다운", targetSets: 2, description: "상체 당기기 패턴의 기초를 만듭니다." },
      { name: "플랭크", targetSets: 2, exerciseType: "time", description: "코어 안정성은 모든 복합 운동의 기반입니다. 30초씩." },
    ],
  },
  "male_adult_intermediate": {
    title: "남성 30대~40대 중급자",
    summary: "근력 유지와 심혈관 건강을 위해 복합 운동 강도를 높입니다.",
    evidence: "ACSM: 저항 훈련은 혈중 지질, 안정시 혈압, 인슐린 감수성을 개선합니다.",
    source: "ACSM Strength Training Guidelines",
    frequency: "주 4회, 상하체 분할 + 유산소 주 3회",
    guideline: "1RM의 70~80% · 3~4세트 · 8~10회 · 휴식 90~120초",
    routine: [
      { name: "바벨 스쿼트", targetSets: 4, description: "하체 근력의 핵심. 풀 ROM으로 수행합니다." },
      { name: "컨벤셔널 데드리프트", targetSets: 4, description: "전신 복합 운동으로 대사율 향상에 효과적입니다." },
      { name: "벤치 프레스", targetSets: 4, description: "상체 밀기의 기본 복합 운동입니다." },
      { name: "바벨 로우", targetSets: 4, description: "후면 사슬 밸런스를 위한 핵심 당기기 동작입니다." },
      { name: "오버헤드 프레스", targetSets: 3, description: "삼각근과 코어를 동시에 훈련합니다." },
      { name: "풀업 / 어시스트 풀업", targetSets: 3, description: "등 넓이와 팔 근력을 함께 키웁니다." },
      { name: "런지", targetSets: 3, description: "단측 하체 훈련으로 균형 능력도 향상시킵니다." },
    ],
  },
  "male_adult_advanced": {
    title: "남성 30대~40대 상급자",
    summary: "블록 주기화로 근비대→근력→파워를 순환하며 심혈관 건강을 병행합니다.",
    evidence: "블록 주기화는 상급자의 정체기를 돌파하는 데 효과적이며, 과훈련 방지를 위해 주당 볼륨 증가는 2.5~5%로 제한합니다.",
    source: "Current Concepts in Periodization (PMC4637911)",
    frequency: "주 4~5회 저항 + 유산소 주 3회",
    guideline: "1RM의 75~95% · 4~5세트 · 3~10회 · 블록 주기화",
    routine: [
      { name: "바벨 스쿼트", targetSets: 5, description: "프로그램의 핵심. 주기별 강도를 조절합니다." },
      { name: "컨벤셔널 데드리프트", targetSets: 4, description: "고중량 풀링으로 전신 근력을 극대화합니다." },
      { name: "벤치 프레스", targetSets: 5, description: "근력일(3~5회)과 볼륨일(8~10회)을 교차합니다." },
      { name: "가중 풀업", targetSets: 4, description: "웨이트를 추가해 상체 당기기 근력을 극대화합니다." },
      { name: "오버헤드 프레스", targetSets: 4, description: "어깨 근력과 상체 안정성의 핵심입니다." },
      { name: "바벨 힙 쓰러스트", targetSets: 4, description: "둔근 근력이 스쿼트·데드리프트 수행력을 높여줍니다." },
      { name: "바벨 로우", targetSets: 4, description: "등 두께와 후면 사슬 밸런스를 유지합니다." },
      { name: "페이스 풀", targetSets: 3, description: "고중량 밀기 운동의 균형을 맞추는 보조 운동입니다." },
    ],
  },

  // ── 여성 · 30대~40대 ──
  "female_adult_beginner": {
    title: "여성 30대~40대 입문자",
    summary: "골밀도 유지와 후면 사슬 강화에 집중하며 근감소를 예방합니다.",
    evidence: "ACSM: 폐경 전 여성도 1RM의 60~80%로 주 2~3회 저항 훈련 시 골밀도 유지에 효과적입니다.",
    source: "Comparative efficacy of RT on BMD (Frontiers 2023)",
    frequency: "주 3회, 전신 운동",
    guideline: "1RM의 60~70% · 3세트 · 10~12회 · 휴식 60~90초",
    routine: [
      { name: "고블릿 스쿼트", targetSets: 3, description: "덤벨을 가슴 앞에 잡고 하체와 코어를 동시에 훈련합니다." },
      { name: "루마니안 데드리프트", targetSets: 3, description: "둔근과 햄스트링 강화로 허리 부담을 줄여줍니다." },
      { name: "힙 쓰러스트", targetSets: 3, description: "골반 안정성과 둔근 근력의 핵심 동작입니다." },
      { name: "랫 풀다운", targetSets: 3, description: "여성에게 상대적으로 약한 상체 후면을 강화합니다." },
      { name: "케이블 시티드 로우", targetSets: 3, description: "등 중앙부를 강화하여 자세를 개선합니다." },
      { name: "머신 체스트 프레스", targetSets: 2, description: "가슴과 전면 삼각근을 안전하게 훈련합니다." },
    ],
  },
  "female_adult_intermediate": {
    title: "여성 30대~40대 중급자",
    summary: "근비대와 골밀도를 위해 복합 운동 강도를 높이고 체성분을 개선합니다.",
    evidence: "저항 훈련은 여성의 근감소증과 골다공증 예방에 가장 효과적인 단일 개입입니다.",
    source: "ACSM Strength Training Guidelines",
    frequency: "주 3~4회, 상하체 분할",
    guideline: "1RM의 70~80% · 3~4세트 · 8~12회 · 휴식 90초",
    routine: [
      { name: "바벨 스쿼트", targetSets: 4, description: "하체 근력과 골밀도 자극의 핵심입니다." },
      { name: "바벨 힙 쓰러스트", targetSets: 4, description: "고중량으로 둔근을 집중 강화합니다." },
      { name: "루마니안 데드리프트", targetSets: 3, description: "후면 사슬 전체를 타겟으로 합니다." },
      { name: "랫 풀다운", targetSets: 3, description: "등 넓이와 상체 균형을 만듭니다." },
      { name: "인클라인 덤벨 프레스", targetSets: 3, description: "상부 가슴과 삼각근을 함께 훈련합니다." },
      { name: "케이블 페이스 풀", targetSets: 3, description: "어깨 건강을 유지하는 필수 보조 운동입니다." },
      { name: "스텝업", targetSets: 3, description: "단측 훈련으로 둔근과 대퇴사두를 기능적으로 강화합니다." },
    ],
  },
  "female_adult_advanced": {
    title: "여성 30대~40대 상급자",
    summary: "주기화와 고급 테크닉으로 체계적 발전을 추구합니다.",
    evidence: "여성도 주기화 프로그래밍에서 남성과 동등한 상대적 근력 향상이 가능합니다.",
    source: "Sex Differences in Muscle Strength (PubMed 2023)",
    frequency: "주 4~5회, 부위별 분할",
    guideline: "1RM의 75~90% · 4~5세트 · 4~12회 · 블록 주기화",
    routine: [
      { name: "바벨 스쿼트", targetSets: 5, description: "주기화에 따라 강도를 변화시킵니다." },
      { name: "바벨 힙 쓰러스트", targetSets: 4, description: "둔근 근력 극대화의 핵심입니다." },
      { name: "컨벤셔널 데드리프트", targetSets: 4, description: "전신 복합 근력의 기초입니다." },
      { name: "인클라인 벤치 프레스", targetSets: 4, description: "상체 밀기 패턴의 주력 운동입니다." },
      { name: "바벨 로우", targetSets: 4, description: "등 두께를 만드는 핵심 당기기 동작입니다." },
      { name: "불가리안 스플릿 스쿼트", targetSets: 3, description: "단측 하체 훈련으로 좌우 불균형을 교정합니다." },
      { name: "오버헤드 프레스", targetSets: 3, description: "어깨 전체와 코어 안정성을 훈련합니다." },
      { name: "케이블 페이스 풀", targetSets: 3, description: "밀기 운동의 균형을 맞추는 보조 동작입니다." },
    ],
  },

  // ── 남성 · 50대~60대 ──
  "male_middle_beginner": {
    title: "남성 50대~60대 입문자",
    summary: "관절에 부담이 적은 머신 위주로 근력 기반을 구축합니다.",
    evidence: "근력 훈련은 골관절염 위험을 18~23% 감소시키며, 관절 부하 능력을 먼저 높이는 것이 권장됩니다.",
    source: "ACSM Hot Topic: Strength & Power Exercise for OA",
    frequency: "주 2~3회, 전신 운동 + 저충격 유산소",
    guideline: "1RM의 50~65% · 2~3세트 · 12~15회 · 천천히 통제된 템포",
    routine: [
      { name: "레그 프레스", targetSets: 3, description: "무릎 부담을 줄이며 하체 전반을 안전하게 자극합니다." },
      { name: "머신 체스트 프레스", targetSets: 3, description: "머신으로 안정적인 궤도에서 가슴을 훈련합니다." },
      { name: "케이블 시티드 로우", targetSets: 3, description: "자세 교정 효과가 있는 등 운동입니다." },
      { name: "랫 풀다운", targetSets: 2, description: "상체 당기기 패턴을 안전하게 훈련합니다." },
      { name: "시티드 숄더 프레스 머신", targetSets: 2, description: "머신으로 어깨에 안정적인 부하를 줍니다." },
      { name: "카프 레이즈", targetSets: 2, description: "종아리 근력은 보행 안정성의 기본입니다." },
      { name: "스텝업 (낮은 단)", targetSets: 2, description: "기능적 하체 훈련으로 계단 오르기 능력을 유지합니다." },
    ],
  },
  "male_middle_intermediate": {
    title: "남성 50대~60대 중급자",
    summary: "복합 운동 강도를 점진적으로 높이되 관절 보호를 우선합니다.",
    evidence: "ACSM: 50대 이상에서도 1RM의 60~75%로 통제된 훈련 시 안전하게 근력을 유지·향상시킬 수 있습니다.",
    source: "Coming of Age: Exercise Prescription for Older Adults (PMC)",
    frequency: "주 3회, 전신 또는 상하체 분할 + 저충격 유산소",
    guideline: "1RM의 60~75% · 3세트 · 10~12회 · 휴식 90~120초",
    routine: [
      { name: "레그 프레스", targetSets: 3, description: "하체 근력의 핵심. 무릎 통증이 없는 범위에서 수행합니다." },
      { name: "스미스 머신 스쿼트", targetSets: 3, description: "가이드 레일이 안정성을 제공합니다." },
      { name: "케이블 시티드 로우", targetSets: 3, description: "등 중앙부를 강화하여 자세를 교정합니다." },
      { name: "머신 체스트 프레스", targetSets: 3, description: "어깨 관절에 부담이 적은 밀기 동작입니다." },
      { name: "랫 풀다운", targetSets: 3, description: "등 넓이와 상체 기능성을 유지합니다." },
      { name: "스텝업", targetSets: 3, description: "한쪽 다리의 기능적 근력과 균형을 훈련합니다." },
      { name: "카프 레이즈", targetSets: 2, description: "보행 안정성과 발목 근력을 유지합니다." },
    ],
  },
  "male_middle_advanced": {
    title: "남성 50대~60대 상급자",
    summary: "축적된 경험을 바탕으로 관절 친화적 고강도 훈련을 유지합니다.",
    evidence: "ACSM: 관절 보호를 위해 저충격 변형을 선택하되 충분한 강도로 근력을 유지하는 것이 핵심입니다.",
    source: "ACSM: Physical Activity and Function in Older Age",
    frequency: "주 3~4회, 상하체 분할 + 균형 훈련",
    guideline: "1RM의 70~85% · 3~4세트 · 6~12회 · 통제된 템포",
    routine: [
      { name: "스미스 머신 스쿼트", targetSets: 4, description: "안정된 궤도에서 하체를 고강도로 훈련합니다." },
      { name: "레그 프레스", targetSets: 3, description: "스쿼트와 병행하여 하체 볼륨을 확보합니다." },
      { name: "케이블 시티드 로우", targetSets: 4, description: "관절 부담 없이 등을 고강도로 훈련합니다." },
      { name: "머신 체스트 프레스", targetSets: 3, description: "안정적인 궤도에서 가슴 근력을 유지합니다." },
      { name: "랫 풀다운", targetSets: 3, description: "상체 당기기 볼륨을 확보합니다." },
      { name: "레그 컬", targetSets: 3, description: "햄스트링을 고립시켜 무릎 안정성을 강화합니다." },
      { name: "시티드 숄더 프레스 머신", targetSets: 3, description: "어깨 관절을 보호하며 근력을 유지합니다." },
      { name: "한 발 서기 균형 훈련", targetSets: 2, description: "30초씩 양발 교대. 균형 능력 유지에 중요합니다." },
    ],
  },

  // ── 여성 · 50대~60대 ──
  "female_middle_beginner": {
    title: "여성 50대~60대 입문자",
    summary: "폐경 후 가속되는 골밀도 감소에 대응해 체중 부하 훈련에 집중합니다.",
    evidence: "폐경 후 여성은 골밀도 유지를 위해 1RM의 60~80%로 주 2~3회 저항 훈련이 필요합니다.",
    source: "ACSM-based exercise on BMD in osteoporosis (Frontiers 2023)",
    frequency: "주 2~3회, 전신 운동 + 저충격 유산소",
    guideline: "1RM의 50~65% · 2~3세트 · 12~15회 · 통제된 템포",
    routine: [
      { name: "레그 프레스", targetSets: 3, description: "골밀도 자극에 효과적인 하지 체중 부하 운동입니다." },
      { name: "힙 쓰러스트", targetSets: 3, description: "둔근 강화로 골반 안정성을 높입니다." },
      { name: "케이블 시티드 로우", targetSets: 3, description: "등을 강화해 둥근 등(원배증)을 예방합니다." },
      { name: "랫 풀다운", targetSets: 2, description: "상체 후면 근력의 기초를 만듭니다." },
      { name: "머신 체스트 프레스", targetSets: 2, description: "상체 전면을 안전하게 훈련합니다." },
      { name: "스텝업 (낮은 단)", targetSets: 2, description: "체중 부하 + 단측 훈련으로 골밀도에 효과적입니다." },
      { name: "카프 레이즈", targetSets: 2, description: "발목 안정성과 보행 능력을 유지합니다." },
    ],
  },
  "female_middle_intermediate": {
    title: "여성 50대~60대 중급자",
    summary: "체중 부하 강도를 높이고 균형 훈련을 추가합니다.",
    evidence: "고관절·척추에 부하를 주는 운동(레그 프레스, 스쿼트, 스텝업)이 골밀도에 가장 효과적입니다.",
    source: "Exercise and Physical Activity for Older Adults (ACSM/Medscape)",
    frequency: "주 3회, 전신 운동 + 균형 훈련",
    guideline: "1RM의 60~75% · 3세트 · 10~12회 · 휴식 90초",
    routine: [
      { name: "레그 프레스", targetSets: 3, description: "하체 근력과 골밀도 유지의 핵심입니다." },
      { name: "스미스 머신 스쿼트", targetSets: 3, description: "안정된 궤도에서 체중 부하 자극을 높입니다." },
      { name: "힙 쓰러스트", targetSets: 3, description: "둔근과 햄스트링을 집중 강화합니다." },
      { name: "케이블 시티드 로우", targetSets: 3, description: "등 강화로 자세를 바로잡습니다." },
      { name: "랫 풀다운", targetSets: 3, description: "상체 전체의 기능적 근력을 유지합니다." },
      { name: "시티드 힙 어브덕션", targetSets: 2, description: "중둔근 강화로 보행 안정성을 높입니다." },
      { name: "한 발 서기 균형 훈련", targetSets: 2, description: "낙상 예방을 위한 균형 능력을 키웁니다. 30초씩." },
    ],
  },
  "female_middle_advanced": {
    title: "여성 50대~60대 상급자",
    summary: "충분한 강도를 유지하되 관절 친화적 운동을 선택합니다.",
    evidence: "장기 훈련 경험이 있는 여성도 관절 보호를 위해 머신/케이블 비중을 높이는 것이 권장됩니다.",
    source: "ACSM: Physical Activity and Function in Older Age",
    frequency: "주 3~4회, 상하체 분할 + 균형 훈련",
    guideline: "1RM의 65~80% · 3~4세트 · 8~12회 · 통제된 템포",
    routine: [
      { name: "스미스 머신 스쿼트", targetSets: 4, description: "안정적인 궤도에서 고강도 하체 훈련을 합니다." },
      { name: "바벨 힙 쓰러스트", targetSets: 4, description: "둔근 근력을 유지하는 핵심 동작입니다." },
      { name: "레그 프레스", targetSets: 3, description: "스쿼트와 병행해 하체 볼륨을 확보합니다." },
      { name: "케이블 시티드 로우", targetSets: 3, description: "등 강화와 자세 유지의 핵심입니다." },
      { name: "랫 풀다운", targetSets: 3, description: "상체 당기기 근력을 유지합니다." },
      { name: "머신 체스트 프레스", targetSets: 3, description: "상체 밀기 패턴의 기본입니다." },
      { name: "레그 컬", targetSets: 3, description: "햄스트링 고립으로 무릎 안정성을 강화합니다." },
      { name: "한 발 서기 균형 훈련", targetSets: 2, description: "균형 능력 유지에 필수적입니다. 30초씩." },
    ],
  },

  // ── 남성 · 70대 이상 ──
  "male_senior_beginner": {
    title: "남성 70대 이상 입문자",
    summary: "낙상 예방과 일상 기능 유지를 최우선으로 머신 위주의 안전한 훈련을 합니다.",
    evidence: "WHO: 65세 이상은 주 3회 이상 다요소 신체 활동(균형+근력)으로 낙상 관련 부상을 32~40% 감소시킬 수 있습니다.",
    source: "WHO Guidelines on Physical Activity (2020)",
    frequency: "주 2~3회, 전신 머신 + 매일 균형 훈련",
    guideline: "1RM의 40~60% · 2세트 · 12~15회 · 머신 우선 · 느린 템포",
    routine: [
      { name: "앉았다 일어서기 (체어 스쿼트)", targetSets: 2, description: "일상 동작(ADL)의 기초. 의자에서 보조 없이 일어서는 능력을 유지합니다." },
      { name: "레그 프레스 (가벼운 무게)", targetSets: 2, description: "머신으로 안전하게 하체를 훈련합니다." },
      { name: "머신 시티드 로우", targetSets: 2, description: "등 근력으로 자세를 유지합니다." },
      { name: "머신 체스트 프레스 (가벼운 무게)", targetSets: 2, description: "상체 밀기 능력을 유지합니다." },
      { name: "카프 레이즈", targetSets: 2, description: "발목 안정성은 낙상 예방의 핵심입니다." },
      { name: "한 발 서기 균형 훈련", targetSets: 2, description: "매일 수행. 양발 교대로 30초씩." },
      { name: "뒤꿈치-발끝 걷기 (탠덤 워크)", targetSets: 2, description: "일직선 위를 걷듯 걸어 동적 균형 능력을 키웁니다." },
    ],
  },
  "male_senior_intermediate": {
    title: "남성 70대 이상 중급자",
    summary: "기능 체력을 유지하며 머신 강도를 점진적으로 올립니다.",
    evidence: "ACSM: 허약 노인도 적절한 감독 하에 1RM의 60~80%로 근력을 유의미하게 향상시킬 수 있습니다.",
    source: "ACSM Position Stand: Exercise for Older Adults (2009)",
    frequency: "주 2~3회, 전신 머신 + 매일 균형 훈련",
    guideline: "1RM의 55~70% · 2~3세트 · 10~12회 · 머신 우선",
    routine: [
      { name: "레그 프레스", targetSets: 3, description: "하체 근력을 점진적으로 높입니다." },
      { name: "앉았다 일어서기 (체어 스쿼트)", targetSets: 2, description: "ADL 기초 능력을 강화합니다." },
      { name: "머신 시티드 로우", targetSets: 3, description: "등 근력과 자세 유지 능력을 키웁니다." },
      { name: "머신 체스트 프레스", targetSets: 2, description: "상체 밀기 근력을 유지합니다." },
      { name: "시티드 힙 어브덕션", targetSets: 2, description: "골반 안정성과 보행 패턴을 개선합니다." },
      { name: "카프 레이즈", targetSets: 2, description: "발목 근력과 보행 안정성을 강화합니다." },
      { name: "한 발 서기 균형 훈련", targetSets: 2, description: "매일 수행. 점진적으로 눈 감고 시도합니다." },
    ],
  },
  "male_senior_advanced": {
    title: "남성 70대 이상 상급자",
    summary: "오랜 운동 경험을 활용해 근력과 기능성을 높은 수준으로 유지합니다.",
    evidence: "ACSM: 숙련된 고령자는 감독 하에 고강도(1RM의 60~80%)를 유지하는 것이 기능 체력에 유리합니다.",
    source: "ACSM: Working with Older Adults - Strength Training",
    frequency: "주 3회, 전신 + 균형 훈련",
    guideline: "1RM의 60~80% · 3세트 · 8~12회 · 통제된 템포",
    routine: [
      { name: "레그 프레스", targetSets: 3, description: "머신으로 안전하게 고강도 하체 훈련을 합니다." },
      { name: "스미스 머신 스쿼트", targetSets: 3, description: "가이드 레일로 안전성을 확보한 스쿼트입니다." },
      { name: "머신 시티드 로우", targetSets: 3, description: "등 근력을 높은 수준으로 유지합니다." },
      { name: "머신 체스트 프레스", targetSets: 3, description: "상체 밀기 패턴의 근력을 유지합니다." },
      { name: "랫 풀다운", targetSets: 2, description: "상체 당기기 볼륨을 추가합니다." },
      { name: "레그 컬", targetSets: 2, description: "햄스트링 강화로 무릎 안정성을 보강합니다." },
      { name: "카프 레이즈", targetSets: 2, description: "보행 안정성의 기초입니다." },
      { name: "한 발 서기 균형 훈련", targetSets: 2, description: "매일 수행. 다양한 지면에서 도전합니다." },
    ],
  },

  // ── 여성 · 70대 이상 ──
  "female_senior_beginner": {
    title: "여성 70대 이상 입문자",
    summary: "낙상 예방이 최우선 목표이며, 머신 위주의 매우 안전한 프로그램으로 시작합니다.",
    evidence: "신체 활동은 낙상 관련 부상을 32~40% 감소시키며, 허약 노인은 근력·균형 훈련을 유산소보다 먼저 시작해야 합니다.",
    source: "Effectiveness of exercise on fall prevention (PMC 2023)",
    frequency: "주 2~3회, 전신 머신 + 매일 균형 훈련",
    guideline: "1RM의 40~55% · 2세트 · 12~15회 · 머신 우선 · 매우 느린 템포",
    routine: [
      { name: "앉았다 일어서기 (체어 스쿼트)", targetSets: 2, description: "가장 중요한 기능적 동작. 의자에서 독립적으로 일어서는 능력입니다." },
      { name: "시티드 힙 어브덕션", targetSets: 2, description: "골반 안정성과 보행 패턴을 개선합니다." },
      { name: "레그 프레스 (가벼운 무게)", targetSets: 2, description: "하체 근력의 기초를 안전하게 만듭니다." },
      { name: "머신 시티드 로우", targetSets: 2, description: "등 근력으로 둥근 등을 방지합니다." },
      { name: "월 푸쉬업", targetSets: 2, description: "벽에 기대어 수행하는 안전한 상체 밀기 운동입니다." },
      { name: "탠덤 스탠딩 (일직선 서기)", targetSets: 2, description: "양발을 앞뒤 일직선으로 놓고 30초 유지. 균형의 기초입니다." },
      { name: "카프 레이즈", targetSets: 2, description: "벽을 잡고 수행. 발목 안정성을 키웁니다." },
    ],
  },
  "female_senior_intermediate": {
    title: "여성 70대 이상 중급자",
    summary: "머신 강도를 점진적으로 올리고 균형 훈련의 난이도를 높입니다.",
    evidence: "ACSM: 점진적으로 지지면 축소(양발→세미 탠덤→탠덤→한 발) 방식의 균형 훈련이 효과적입니다.",
    source: "ACSM Position Stand: Exercise for Older Adults (2009)",
    frequency: "주 2~3회, 전신 머신 + 매일 균형 훈련",
    guideline: "1RM의 50~65% · 2~3세트 · 10~12회 · 머신 우선",
    routine: [
      { name: "레그 프레스", targetSets: 3, description: "하체 근력을 점진적으로 높여갑니다." },
      { name: "시티드 힙 어브덕션", targetSets: 2, description: "골반 안정성을 강화합니다." },
      { name: "머신 시티드 로우", targetSets: 3, description: "등 근력을 키워 자세를 바로잡습니다." },
      { name: "머신 체스트 프레스", targetSets: 2, description: "상체 밀기 근력을 유지합니다." },
      { name: "랫 풀다운", targetSets: 2, description: "상체 전체의 기능적 근력을 확보합니다." },
      { name: "카프 레이즈", targetSets: 2, description: "보행 안정성의 기초를 다집니다." },
      { name: "한 발 서기 균형 훈련", targetSets: 2, description: "점진적으로 눈 감고 도전합니다. 30초씩." },
    ],
  },
  "female_senior_advanced": {
    title: "여성 70대 이상 상급자",
    summary: "오랜 운동 경험으로 높은 기능 체력을 유지하면서 안전을 확보합니다.",
    evidence: "숙련된 고령 여성도 머신 위주의 안전한 환경에서 근력을 높은 수준으로 유지할 수 있습니다.",
    source: "ACSM: Working with Older Adults - Strength Training",
    frequency: "주 3회, 전신 + 균형 훈련",
    guideline: "1RM의 60~75% · 3세트 · 10~12회 · 통제된 템포",
    routine: [
      { name: "레그 프레스", targetSets: 3, description: "하체 근력을 높은 수준으로 유지합니다." },
      { name: "스미스 머신 스쿼트", targetSets: 3, description: "안전한 궤도에서 체중 부하를 확보합니다." },
      { name: "힙 쓰러스트", targetSets: 3, description: "둔근 근력으로 보행과 기립 능력을 유지합니다." },
      { name: "머신 시티드 로우", targetSets: 3, description: "등 근력을 유지하여 자세를 바로잡습니다." },
      { name: "머신 체스트 프레스", targetSets: 2, description: "상체 밀기 근력을 확보합니다." },
      { name: "랫 풀다운", targetSets: 2, description: "상체 당기기 근력을 보강합니다." },
      { name: "레그 컬", targetSets: 2, description: "햄스트링을 강화해 무릎을 안정시킵니다." },
      { name: "한 발 서기 균형 훈련", targetSets: 2, description: "다양한 조건(눈 감기, 불안정면)에서 도전합니다." },
    ],
  },
};

const form = document.querySelector("#exercise-form");
const onboardingOverlay = document.querySelector("#onboarding-overlay");
const onboardingLoginBtn = document.querySelector("#onboarding-login");
const onboardingGuestBtn = document.querySelector("#onboarding-guest");
const obPhaseWelcome = document.querySelector("#ob-phase-welcome");
const obPhaseBenefits = document.querySelector("#ob-phase-benefits");
const obPhaseChoose = document.querySelector("#ob-phase-choose");
const obBenefitsNextBtn = document.querySelector("#ob-benefits-next");
const obFindWorkoutBtn = document.querySelector("#ob-find-workout");
const obOwnRoutineBtn = document.querySelector("#ob-own-routine");
const repsInput = document.querySelector("#reps-input");
const authStatusEl = document.querySelector("#auth-status");
const authFeedbackEl = document.querySelector("#auth-feedback");
const googleLoginBtn = document.querySelector("#google-login");
const logoutBtn = document.querySelector("#logout");
const nameInput = document.querySelector("#exercise-name");
const setsInput = document.querySelector("#exercise-sets");
const userPresetSelect = document.querySelector("#user-preset-select");
const saveUserPresetBtn = document.querySelector("#save-user-preset");
const loadUserPresetBtn = document.querySelector("#load-user-preset");
const exerciseList = document.querySelector("#exercise-list");
const template = document.querySelector("#exercise-item-template");
const loadUpperPresetBtn = document.querySelector("#load-upper-preset");
const loadLowerPresetBtn = document.querySelector("#load-lower-preset");
const startSessionBtn = document.querySelector("#start-session");
const setActionBtn = document.querySelector("#set-action");
const endSessionBtn = document.querySelector("#end-session");
const sessionStatus = document.querySelector("#session-status");
const currentExerciseEl = document.querySelector("#current-exercise");
const currentSetEl = document.querySelector("#current-set");
const countdownEl = document.querySelector("#countdown");
const exerciseDescriptionEl = document.querySelector("#exercise-description");
const historySummaryEl = document.querySelector("#history-summary");
const calendarScopeEl = document.querySelector("#calendar-scope");
const historyListEl = document.querySelector("#history-list");
const calendarPrevBtn = document.querySelector("#calendar-prev");
const calendarNextBtn = document.querySelector("#calendar-next");
const calendarMonthEl = document.querySelector("#calendar-month");
const calendarGridEl = document.querySelector("#calendar-grid");
const calendarDetailEl = document.querySelector("#calendar-detail");

const weightInput = document.querySelector("#weight-input");
const timeInput = document.querySelector("#time-input");
const setNoteInput = document.querySelector("#set-note");
const recentRoutinesEl = document.querySelector("#recent-routines");
const recentRoutinesListEl = document.querySelector("#recent-routines-list");

// ── 운동 유형 토글 상태 ──
let selectedExerciseType = "weight";

// ── 편집 모드 상태 ──
let editMode = false;

const state = {
  routine: [],
  history: [],
  prs: {},
  active: false,
  currentExerciseIdx: 0,
  previewExerciseId: "",
  waitingForStart: false,
  completionMessage: "",
  countdown: ALERT_SECONDS,
  countdownStartMs: 0,
  timerId: null,
  sessionStartedAtMs: 0,
  activeSessionId: "",
  inactivityTimerId: null,
  calendarCursor: getMonthStart(new Date()),
  selectedDateKey: "",
  user: null,
  authReady: false,
  onboardingDismissed: loadOnboardingDismissed(),
  onboardingPhase: "welcome",
  presets: [],
  firestore: null,
  firestoreReady: false,
  cloudSyncTimers: {
    routine: null,
    history: null,
    presets: null,
  },
  hydrationUserScope: "",
};

function updateHeroGreeting() {
  const el = document.querySelector("#hero-greeting");
  if (!el) return;
  const h = new Date().getHours();
  if (h < 6) el.textContent = "새벽도 운동하는 당신 💪";
  else if (h < 11) el.textContent = "좋은 아침이에요 ☀️";
  else if (h < 14) el.textContent = "점심엔 몸도 충전 🏋️";
  else if (h < 17) el.textContent = "오후도 힘차게 💪";
  else if (h < 21) el.textContent = "퇴근 후 루틴 시간 🔥";
  else el.textContent = "오늘도 해냈습니다 ✨";
}

loadDataForCurrentUser();
renderAuthStatus();

renderRoutine();
renderSession();
renderHistory();
updateStreakBar();
renderRecentRoutines();
updateHeroGreeting();

setupAuth();
renderOnboarding();

// ── 탭 네비게이션 ──
let activeTab = "workout";
const tabBar = document.querySelector("#tab-bar");
const tabSections = document.querySelectorAll("[data-tab]");
const tabBtns = document.querySelectorAll(".tab-btn[data-tab]");

function switchTab(tabName) {
  if (state.active && tabName === "history") {
    if (!window.confirm("운동 중입니다. 탭을 전환하면 운동 화면을 벗어납니다. 계속할까요?")) {
      return;
    }
  }
  activeTab = tabName;
  tabSections.forEach((section) => {
    section.classList.toggle("tab-visible", section.dataset.tab === tabName);
  });
  tabBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });
}

if (tabBar) {
  tabBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab-btn[data-tab]");
    if (!btn) return;
    switchTab(btn.dataset.tab);
  });
}

// 초기 탭 표시
switchTab("workout");

// ── 기록 서브탭 ──
let activeHistorySubtab = "calendar";
const historySubtabBtns = document.querySelectorAll(".history-subtab");
const historySubtabContents = document.querySelectorAll(".history-subtab-content");

function switchHistorySubtab(subtab) {
  activeHistorySubtab = subtab;
  historySubtabBtns.forEach((btn) => btn.classList.toggle("active", btn.dataset.subtab === subtab));
  historySubtabContents.forEach((el) => el.classList.toggle("subtab-visible", el.dataset.subtabContent === subtab));
}

const historySubtabsEl = document.getElementById("history-subtabs");
if (historySubtabsEl) {
  historySubtabsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".history-subtab");
    if (btn) switchHistorySubtab(btn.dataset.subtab);
  });
}

switchHistorySubtab("calendar");

// ── 루틴 탭 "시작하기" 버튼 ──
const startFromRoutineBtn = document.querySelector("#start-from-routine");
if (startFromRoutineBtn) {
  startFromRoutineBtn.addEventListener("click", () => {
    requestNotificationPermission();
    if (state.routine.length === 0) {
      alert("운동을 먼저 추가하세요.");
      return;
    }
    switchTab("workout");
    startSessionBtn.click();
  });
}

// ── 운동 유형 토글 핸들러 ──
const exerciseRestSelect = document.querySelector("#exercise-rest");
const exerciseTypeToggle = document.querySelector("#exercise-type-toggle");
if (exerciseTypeToggle) {
  exerciseTypeToggle.addEventListener("click", (e) => {
    const btn = e.target.closest(".type-btn");
    if (!btn) return;
    selectedExerciseType = btn.dataset.type || "weight";
    exerciseTypeToggle.querySelectorAll(".type-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
}

// ── 운동 검색 핸들러 ──
(function initExerciseSearch() {
  const searchInput = document.querySelector("#exercise-search");
  const resultsEl = document.querySelector("#search-results");
  const cancelBtn = document.querySelector("#add-form-cancel");

  if (!searchInput || !resultsEl) return;

  let debounceTimer = null;

  searchInput.addEventListener("focus", () => {
    const q = searchInput.value.trim();
    const results = q ? searchExercises(q) : [];
    renderSearchResults(results, q);
  });

  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const q = searchInput.value.trim();
      const results = q ? searchExercises(q) : [];
      renderSearchResults(results, q);
    }, 150);
  });

  resultsEl.addEventListener("click", (e) => {
    const item = e.target.closest(".search-result-item");
    if (!item) return;

    if (item.dataset.manual) {
      showExerciseForm(null);
      return;
    }

    const name = item.dataset.name;
    const type = item.dataset.type || "weight";
    const sets = Number(item.dataset.sets) || 3;
    const rest = Number(item.dataset.rest) || 60;
    showExerciseForm({ name, type, sets, rest });
  });

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      hideExerciseForm();
    });
  }

  // 외부 클릭 시 드롭다운 닫기
  document.addEventListener("click", (e) => {
    const wrap = document.querySelector("#exercise-search-wrap");
    if (wrap && !wrap.contains(e.target)) {
      if (resultsEl) resultsEl.classList.add("hidden");
    }
  });
})();

// ── 편집 모드 토글 핸들러 ──
const toggleEditBtn = document.querySelector("#toggle-edit-mode");
if (toggleEditBtn) {
  toggleEditBtn.addEventListener("click", () => {
    editMode = !editMode;
    exerciseList.classList.toggle("edit-mode", editMode);
    toggleEditBtn.textContent = editMode ? "완료" : "편집";
  });
}

// 위저드 숨김 상태 복원
if (localStorage.getItem(STORAGE_KEYS.wizardHidden)) {
  const wizSection = document.querySelector(".recommend");
  if (wizSection) wizSection.classList.add("hidden");
}

if (calendarPrevBtn) {
  calendarPrevBtn.addEventListener("click", () => {
    state.calendarCursor = shiftMonth(state.calendarCursor, -1);
    renderCalendar();
  });
}

if (calendarNextBtn) {
  calendarNextBtn.addEventListener("click", () => {
    state.calendarCursor = shiftMonth(state.calendarCursor, 1);
    renderCalendar();
  });
}

if (calendarGridEl) {
  calendarGridEl.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const button = target.closest(".calendar-day");
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    const dateKey = button.dataset.date;
    if (!dateKey) {
      return;
    }

    state.selectedDateKey = dateKey;
    renderCalendar();
  });
}

if (googleLoginBtn) {
  googleLoginBtn.addEventListener("click", () => {
    handleGoogleLogin();
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    if (!window.firebase || !window.firebase.auth || !state.authReady) {
      return;
    }

    try {
      await window.firebase.auth().signOut();
    } catch {
      sessionStatus.textContent = "로그아웃에 실패했습니다. 잠시 후 다시 시도해 주세요.";
    }
  });
}

const authChipBtn = document.querySelector("#auth-chip-btn");
const authDropdownEl = document.querySelector("#auth-dropdown");
if (authChipBtn && authDropdownEl) {
  authChipBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = authDropdownEl.classList.toggle("open");
    authChipBtn.setAttribute("aria-expanded", String(isOpen));
  });
  document.addEventListener("click", (e) => {
    if (!authChipBtn.contains(e.target) && !authDropdownEl.contains(e.target)) {
      authDropdownEl.classList.remove("open");
      authChipBtn.setAttribute("aria-expanded", "false");
    }
  });
}

if (onboardingLoginBtn) {
  onboardingLoginBtn.addEventListener("click", () => {
    handleGoogleLogin();
  });
}

if (onboardingGuestBtn) {
  onboardingGuestBtn.addEventListener("click", () => {
    setOnboardingPhase("choose");
  });
}

if (obBenefitsNextBtn) {
  obBenefitsNextBtn.addEventListener("click", () => {
    setOnboardingPhase("choose");
  });
}

if (obFindWorkoutBtn) {
  obFindWorkoutBtn.addEventListener("click", () => {
    dismissOnboarding();
    const wizSection = document.querySelector(".recommend");
    if (wizSection) wizSection.scrollIntoView({ behavior: "smooth" });
  });
}

if (obOwnRoutineBtn) {
  obOwnRoutineBtn.addEventListener("click", () => {
    requestNotificationPermission();
    dismissOnboarding();
    const wizSection = document.querySelector(".recommend");
    if (wizSection) wizSection.classList.add("hidden");
    localStorage.setItem(STORAGE_KEYS.wizardHidden, "1");
    sessionStatus.textContent = "내 루틴으로 시작합니다. 운동을 추가하거나 프리셋을 불러오세요.";
  });
}

if (saveUserPresetBtn) {
  saveUserPresetBtn.addEventListener("click", () => {
    if (state.routine.length === 0) {
      sessionStatus.textContent = "저장할 루틴이 없습니다.";
      return;
    }

    const name = window.prompt("저장할 루틴 이름을 입력하세요.", "");
    if (!name) {
      return;
    }

    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }

    const payload = state.routine.map((exercise) => ({
      name: exercise.name,
      targetSets: exercise.targetSets,
      exerciseType: exercise.exerciseType || "weight",
      description: exercise.description,
    }));

    const existing = state.presets.find((preset) => preset.name === trimmed);
    if (existing) {
      existing.items = payload;
    } else {
      state.presets.push({
        id: createId(),
        name: trimmed,
        items: payload,
      });
    }

    saveUserPresets(state.presets);
    renderUserPresets();
    sessionStatus.textContent = `'${trimmed}' 루틴을 저장했습니다.`;
  });
}

if (loadUserPresetBtn) {
  loadUserPresetBtn.addEventListener("click", () => {
    const presetId = userPresetSelect?.value || "";
    const preset = state.presets.find((item) => item.id === presetId);
    if (!preset) {
      sessionStatus.textContent = "불러올 루틴을 먼저 선택하세요.";
      return;
    }

    const shouldReplace =
      state.routine.length === 0 ||
      window.confirm(`현재 루틴을 '${preset.name}'으로 교체할까요?`);

    if (!shouldReplace) {
      return;
    }

    if (state.active) {
      resetSession({ message: "루틴 불러오기로 기존 세션이 종료되었습니다." });
    }

    state.routine = createRoutineFromTemplate(
      preset.items.map((item) => ({
        name: item.name,
        targetSets: item.targetSets,
        exerciseType: item.exerciseType || "weight",
        description: item.description || `${item.name} 운동입니다. 안정적인 자세를 먼저 만드세요.`,
      })),
    );
    state.previewExerciseId = state.routine[0]?.id || "";

    saveRoutine(state.routine);
    renderRoutine();
    renderSession();
    sessionStatus.textContent = `'${preset.name}' 루틴을 불러왔습니다.`;
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const targetSets = Number(setsInput.value);

  if (!name || !Number.isInteger(targetSets) || targetSets < 1) {
    return;
  }

  state.routine.push({
    id: createId(),
    name,
    targetSets,
    completedSets: 0,
    setsDetail: [],
    exerciseType: selectedExerciseType,
    restSeconds: exerciseRestSelect ? Number(exerciseRestSelect.value) : ALERT_SECONDS,
    description: `${name} 운동입니다. 안정적인 자세를 만든 뒤 반복하세요.`,
  });

  if (!state.previewExerciseId) {
    state.previewExerciseId = state.routine[state.routine.length - 1].id;
  }

  saveRoutine(state.routine);
  renderRoutine();
  renderSession();

  hideExerciseForm();
});

exerciseList.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  if (target instanceof HTMLButtonElement) {
    const id = target.dataset.id;
    if (!id) {
      return;
    }

    if (target.classList.contains("edit-btn")) {
      const exercise = state.routine.find((item) => item.id === id);
      if (!exercise) {
        return;
      }

      const nextValue = window.prompt("목표 세트 수를 입력하세요.", String(exercise.targetSets));
      if (nextValue === null) {
        return;
      }

      const parsed = Number(nextValue.trim());
      if (!Number.isInteger(parsed) || parsed < 1 || parsed > 50) {
        window.alert("세트 수는 1~50 사이의 정수로 입력해 주세요.");
        return;
      }

      if (parsed === exercise.targetSets) {
        return;
      }

      exercise.targetSets = parsed;
      exercise.completedSets = Math.min(exercise.completedSets, parsed);

      if (state.active) {
        resetSession({ message: "세트 수 변경으로 세션이 종료되었습니다." });
      } else {
        state.completionMessage = `${exercise.name} 목표 세트를 ${parsed}세트로 변경했습니다.`;
      }

      saveRoutine(state.routine);
      renderRoutine();
      renderSession();
      return;
    }

    state.routine = state.routine.filter((exercise) => exercise.id !== id);

    if (state.previewExerciseId === id) {
      state.previewExerciseId = state.routine[0]?.id || "";
    }

    if (state.active) {
      resetSession({ message: "루틴 변경으로 세션이 종료되었습니다." });
    }

    saveRoutine(state.routine);
    renderRoutine();
    renderSession();
    return;
  }

  // Set detail row inline edit handling
  if (target.classList.contains("set-detail-save-btn") || target.closest(".set-detail-save-btn")) {
    const btn = target.classList.contains("set-detail-save-btn") ? target : target.closest(".set-detail-save-btn");
    const row = btn.closest(".set-detail-row");
    if (!row || !state.active) return;
    const exId = row.dataset.exerciseId;
    const si = parseInt(row.dataset.setIndex, 10);
    const exercise = state.routine.find((e) => e.id === exId);
    if (!exercise || !exercise.setsDetail[si]) return;
    const s = exercise.setsDetail[si];
    if (exercise.exerciseType === "time") {
      const timeVal = parseInt(row.querySelector(".set-edit-time")?.value || "0", 10);
      if (timeVal > 0) s.time = timeVal;
    } else {
      const weightVal = row.querySelector(".set-edit-weight")?.value?.trim();
      const repsVal = parseInt(row.querySelector(".set-edit-reps")?.value || "0", 10);
      s.weight = weightVal ? parseFloat(weightVal) : 0;
      s.reps = repsVal || 0;
    }
    saveRoutine(state.routine);
    updateActiveSessionHistory();
    renderRoutine();
    renderSession();
    return;
  }

  if (target.classList.contains("set-detail-delete-btn") || target.closest(".set-detail-delete-btn")) {
    const btn = target.classList.contains("set-detail-delete-btn") ? target : target.closest(".set-detail-delete-btn");
    const row = btn.closest(".set-detail-row");
    if (!row || !state.active) return;
    const exId = row.dataset.exerciseId;
    const si = parseInt(row.dataset.setIndex, 10);
    const exercise = state.routine.find((e) => e.id === exId);
    if (!exercise) return;
    if (!window.confirm(`${si + 1}세트 기록을 삭제할까요?`)) return;
    exercise.setsDetail.splice(si, 1);
    exercise.completedSets = Math.max(0, exercise.completedSets - 1);
    saveRoutine(state.routine);
    updateActiveSessionHistory();
    renderRoutine();
    renderSession();
    return;
  }

  const setRow = target.closest(".set-detail-row");
  if (setRow instanceof HTMLElement) {
    if (!state.active) return;
    // Close any other open edit rows first
    document.querySelectorAll(".set-detail-row.editing").forEach((r) => {
      if (r !== setRow) r.classList.remove("editing");
    });
    setRow.classList.toggle("editing");
    if (setRow.classList.contains("editing")) {
      const exId = setRow.dataset.exerciseId;
      const si = parseInt(setRow.dataset.setIndex, 10);
      const exercise = state.routine.find((e) => e.id === exId);
      if (!exercise || !exercise.setsDetail[si]) return;
      const s = exercise.setsDetail[si];
      const exType = exercise.exerciseType || "weight";
      // Build edit fields inside the row
      let editHTML = `<div class="set-detail-edit">`;
      if (exType === "time") {
        editHTML += `<input class="set-edit-time" type="number" inputmode="numeric" min="1" value="${s.time || ""}" placeholder="초">`;
        editHTML += `<span class="set-edit-unit">초</span>`;
      } else {
        if (exType === "weight") {
          editHTML += `<input class="set-edit-weight" type="number" inputmode="decimal" min="0" step="0.5" value="${s.weight || ""}" placeholder="kg">`;
          editHTML += `<span class="set-edit-unit">kg ×</span>`;
        }
        editHTML += `<input class="set-edit-reps" type="number" inputmode="numeric" min="0" value="${s.reps || ""}" placeholder="회">`;
        editHTML += `<span class="set-edit-unit">회</span>`;
      }
      editHTML += `<button class="set-detail-save-btn" type="button">저장</button>`;
      editHTML += `<button class="set-detail-delete-btn" type="button">삭제</button>`;
      editHTML += `</div>`;
      // Remove existing edit container if any
      setRow.querySelector(".set-detail-edit")?.remove();
      setRow.insertAdjacentHTML("beforeend", editHTML);
      setRow.querySelector(".set-edit-weight, .set-edit-time, .set-edit-reps")?.focus();
    } else {
      setRow.querySelector(".set-detail-edit")?.remove();
    }
    return;
  }

  const item = target.closest(".exercise-item");
  if (!(item instanceof HTMLElement)) {
    return;
  }

  const selectedId = item.dataset.id;
  if (!selectedId) {
    return;
  }

  if (state.active) {
    // 세션 중 클릭으로 운동 전환
    const clickedIdx = state.routine.findIndex((ex) => ex.id === selectedId);
    if (clickedIdx !== -1 && clickedIdx !== state.currentExerciseIdx) {
      state.currentExerciseIdx = clickedIdx;
      clearReminderTimer();
      resetInactivityTimer();
      if (weightInput) { weightInput.value = ""; weightInput.classList.add("hidden"); }
      if (repsInput) { repsInput.value = ""; repsInput.classList.add("hidden"); }
      armNextSet();
      renderRoutine();
      renderSession();
    }
    return;
  }

  state.previewExerciseId = selectedId;
  renderRoutine();
  renderSession();
});

// Session sets list inline edit handling
document.querySelector(".card.session").addEventListener("click", (e) => {
  const target = e.target;

  // Save button
  if (target.classList.contains("session-set-save-btn") || target.closest(".session-set-save-btn")) {
    const btn = target.classList.contains("session-set-save-btn") ? target : target.closest(".session-set-save-btn");
    const row = btn.closest(".session-set-row");
    if (!row || !state.active) return;
    const exId = row.dataset.exerciseId;
    const si = parseInt(row.dataset.setIndex, 10);
    const exercise = state.routine.find((ex) => ex.id === exId);
    if (!exercise || !exercise.setsDetail[si]) return;
    const s = exercise.setsDetail[si];
    if (exercise.exerciseType === "time") {
      const timeVal = parseInt(row.querySelector(".set-edit-time")?.value || "0", 10);
      if (timeVal > 0) s.time = timeVal;
    } else {
      const weightVal = row.querySelector(".set-edit-weight")?.value?.trim();
      const repsVal = parseInt(row.querySelector(".set-edit-reps")?.value || "0", 10);
      s.weight = weightVal ? parseFloat(weightVal) : 0;
      s.reps = repsVal || 0;
    }
    saveRoutine(state.routine);
    updateActiveSessionHistory();
    renderRoutine();
    renderSession();
    return;
  }

  // Delete button
  if (target.classList.contains("session-set-delete-btn") || target.closest(".session-set-delete-btn")) {
    const btn = target.classList.contains("session-set-delete-btn") ? target : target.closest(".session-set-delete-btn");
    const row = btn.closest(".session-set-row");
    if (!row || !state.active) return;
    const exId = row.dataset.exerciseId;
    const si = parseInt(row.dataset.setIndex, 10);
    const exercise = state.routine.find((ex) => ex.id === exId);
    if (!exercise) return;
    if (!window.confirm(`${si + 1}세트 기록을 삭제할까요?`)) return;
    exercise.setsDetail.splice(si, 1);
    exercise.completedSets = Math.max(0, exercise.completedSets - 1);
    saveRoutine(state.routine);
    updateActiveSessionHistory();
    renderRoutine();
    renderSession();
    return;
  }

  // Row tap — toggle editing
  const sessionRow = target.closest(".session-set-row");
  if (sessionRow instanceof HTMLElement) {
    if (!state.active) return;
    // Close any other open edit rows first
    document.querySelectorAll(".session-set-row.editing").forEach((r) => {
      if (r !== sessionRow) {
        r.classList.remove("editing");
        r.querySelector(".session-set-edit")?.remove();
      }
    });
    sessionRow.classList.toggle("editing");
    if (sessionRow.classList.contains("editing")) {
      const exId = sessionRow.dataset.exerciseId;
      const si = parseInt(sessionRow.dataset.setIndex, 10);
      const exercise = state.routine.find((ex) => ex.id === exId);
      if (!exercise || !exercise.setsDetail[si]) return;
      const s = exercise.setsDetail[si];
      const exType = exercise.exerciseType || "weight";
      let editHTML = `<div class="session-set-edit">`;
      if (exType === "time") {
        editHTML += `<input class="set-edit-time" type="number" inputmode="numeric" min="1" value="${s.time || ""}" placeholder="초">`;
        editHTML += `<span class="set-edit-unit">초</span>`;
      } else {
        if (exType === "weight") {
          editHTML += `<input class="set-edit-weight" type="number" inputmode="decimal" min="0" step="0.5" value="${s.weight || ""}" placeholder="kg">`;
          editHTML += `<span class="set-edit-unit">kg ×</span>`;
        }
        editHTML += `<input class="set-edit-reps" type="number" inputmode="numeric" min="0" value="${s.reps || ""}" placeholder="회">`;
        editHTML += `<span class="set-edit-unit">회</span>`;
      }
      editHTML += `<button class="session-set-save-btn" type="button">저장</button>`;
      editHTML += `<button class="session-set-delete-btn" type="button">삭제</button>`;
      editHTML += `</div>`;
      sessionRow.querySelector(".session-set-edit")?.remove();
      sessionRow.insertAdjacentHTML("beforeend", editHTML);
      sessionRow.querySelector(".set-edit-weight, .set-edit-time, .set-edit-reps")?.focus();
    } else {
      sessionRow.querySelector(".session-set-edit")?.remove();
    }
    return;
  }
});

loadUpperPresetBtn.addEventListener("click", () => {
  applyPreset(DEFAULT_UPPER_ROUTINE_TEMPLATE, "상체");
});

if (loadLowerPresetBtn) {
  loadLowerPresetBtn.addEventListener("click", () => {
    applyPreset(DEFAULT_LOWER_ROUTINE_TEMPLATE, "하체");
  });
}

function applyPreset(template, label) {
  const shouldReplace =
    state.routine.length === 0 ||
    window.confirm(`현재 루틴을 ${label} 기본 루틴으로 교체할까요?`);

  if (!shouldReplace) {
    return;
  }

  if (state.active) {
    resetSession({ message: "기본 루틴 적용으로 기존 세션이 종료되었습니다." });
  }

  state.routine = createRoutineFromTemplate(template);
  state.previewExerciseId = state.routine[0]?.id || "";

  saveRoutine(state.routine);
  renderRoutine();
  renderSession();

  sessionStatus.textContent = `${label} 기본 루틴을 적용했습니다. 운동 시작을 누르세요.`;
}

startSessionBtn.addEventListener("click", () => {
  if (state.routine.length === 0) {
    sessionStatus.textContent = "운동을 먼저 추가하세요.";
    return;
  }

  requestNotificationPermission();
  state.active = true;
  state.completionMessage = "";
  state.currentExerciseIdx = 0;
  state.sessionStartedAtMs = Date.now();
  document.body.classList.add("session-active");

  // 포커스 모드 진입
  switchTab("workout");
  // 편집 모드 해제
  editMode = false;
  exerciseList.classList.remove("edit-mode");
  if (toggleEditBtn) toggleEditBtn.textContent = "편집";

  state.routine.forEach((exercise) => {
    exercise.completedSets = 0;
    exercise.setsDetail = [];
  });

  // 운동 시작 시 즉시 "진행 중" 상태로 기록 저장
  const sessionId = createId();
  state.activeSessionId = sessionId;
  const startEntry = {
    id: sessionId,
    dateKey: formatDateKey(new Date(state.sessionStartedAtMs)),
    startedAt: new Date(state.sessionStartedAtMs).toISOString(),
    endedAt: "",
    durationSec: 0,
    totalCompletedSets: 0,
    status: "진행 중",
    exercises: state.routine.map((exercise) => ({
      name: exercise.name,
      completedSets: 0,
      targetSets: exercise.targetSets,
      setsDetail: [],
    })),
  };
  state.history.unshift(startEntry);
  state.history = state.history.slice(0, 120);
  saveHistory(state.history);

  saveRoutine(state.routine);
  armNextSet();
  resetInactivityTimer();
  renderRoutine();
  renderSession();
  renderHistory();
});

setActionBtn.addEventListener("click", () => {
  if (!state.active) {
    return;
  }

  resetInactivityTimer();

  const exercise = state.routine[state.currentExerciseIdx];
  if (!exercise) {
    return;
  }

  if (state.waitingForStart) {
    clearReminderTimer();
    state.waitingForStart = false;
    setActionBtn.textContent = "세트 완료";
    sessionStatus.textContent = `${exercise.name} ${exercise.completedSets + 1}세트 진행 중`;
    countdownEl.textContent = "세트 진행 중";
    const exType = exercise.exerciseType || "weight";
    const lastData = getLastSessionData(exercise.name);
    if (exType === "weight") {
      if (weightInput) {
        weightInput.classList.remove("hidden");
        if (!weightInput.value && lastData && lastData.weight) weightInput.value = lastData.weight;
        weightInput.focus();
      }
      if (repsInput) {
        repsInput.classList.remove("hidden");
        if (!repsInput.value && lastData && lastData.reps) repsInput.value = lastData.reps;
      }
      if (timeInput) timeInput.classList.add("hidden");
    } else if (exType === "bodyweight") {
      if (weightInput) weightInput.classList.add("hidden");
      if (repsInput) {
        repsInput.classList.remove("hidden");
        if (!repsInput.value && lastData && lastData.reps) repsInput.value = lastData.reps;
        repsInput.focus();
      }
      if (timeInput) timeInput.classList.add("hidden");
    } else if (exType === "time") {
      if (weightInput) weightInput.classList.add("hidden");
      if (repsInput) repsInput.classList.add("hidden");
      if (timeInput) {
        timeInput.classList.remove("hidden");
        if (!timeInput.value && lastData && lastData.time) timeInput.value = lastData.time;
        timeInput.focus();
      }
    }
    // 메모 입력 표시 (이전 메모가 있으면 힌트로 표시)
    if (setNoteInput) {
      setNoteInput.classList.remove("hidden");
      setNoteInput.value = "";
      if (lastData && lastData.note) {
        setNoteInput.placeholder = `이전: ${lastData.note}`;
      } else {
        setNoteInput.placeholder = "메모 (선택)";
      }
    }
    return;
  }

  const repsVal = repsInput ? Number(repsInput.value) : 0;
  const weightVal = weightInput ? Number(weightInput.value) : 0;
  const timeVal = timeInput ? Number(timeInput.value) : 0;
  const noteVal = setNoteInput ? setNoteInput.value.trim() : "";
  if (!exercise.setsDetail) exercise.setsDetail = [];
  const setEntry = {
    reps: Number.isFinite(repsVal) && repsVal > 0 ? repsVal : 0,
    weight: Number.isFinite(weightVal) && weightVal > 0 ? weightVal : 0,
    time: Number.isFinite(timeVal) && timeVal > 0 ? timeVal : 0,
  };
  if (noteVal) setEntry.note = noteVal;
  exercise.setsDetail.push(setEntry);

  // PR 자동 감지
  const prResult = checkAndUpdatePR(exercise.name, setEntry.weight, setEntry.reps, setEntry.time, exercise.exerciseType || "weight");
  if (prResult) {
    showPRToast(prResult);
  }

  if (repsInput) { repsInput.value = ""; repsInput.classList.add("hidden"); }
  if (weightInput) { weightInput.value = ""; weightInput.classList.add("hidden"); }
  if (timeInput) { timeInput.value = ""; timeInput.classList.add("hidden"); }
  if (setNoteInput) { setNoteInput.value = ""; setNoteInput.classList.add("hidden"); setNoteInput.placeholder = "메모 (선택)"; }

  exercise.completedSets += 1;
  saveRoutine(state.routine);

  // 세트 완료 shake 애니메이션
  const doneCardEl = exerciseList.querySelector(`[data-exercise-id="${exercise.id}"]`);
  if (doneCardEl) {
    doneCardEl.classList.remove("set-done");
    // force reflow so animation re-triggers
    void doneCardEl.offsetWidth;
    doneCardEl.classList.add("set-done");
    setTimeout(() => doneCardEl.classList.remove("set-done"), 350);
  }

  // 진행 중 기록 실시간 업데이트
  updateActiveSessionHistory();

  if (exercise.completedSets >= exercise.targetSets) {
    const allDone = state.routine.every((ex) => ex.completedSets >= ex.targetSets);
    if (allDone) {
      finishSession({ manual: false });
      return;
    }
    // 다음 미완료 운동으로 자동 이동
    const nextIdx = findNextIncompleteExercise(state.currentExerciseIdx);
    if (nextIdx === -1) {
      finishSession({ manual: false });
      return;
    }
    state.currentExerciseIdx = nextIdx;
  }

  armNextSet();
  renderRoutine();
  renderSession();
});

endSessionBtn.addEventListener("click", () => {
  if (!state.active) {
    return;
  }

  finishSession({ manual: true });
});

function resetInactivityTimer() {
  clearInactivityTimer();
  if (!state.active) return;
  state.inactivityTimerId = setTimeout(() => {
    if (state.active) {
      sendBackgroundNotification("운동 자동 종료", "30분간 활동이 없어 운동이 자동 종료되었습니다.");
      finishSession({ manual: true });
      sessionStatus.textContent = "30분간 활동이 없어 운동이 자동 종료되었습니다.";
    }
  }, INACTIVITY_TIMEOUT_MS);
}

function clearInactivityTimer() {
  if (state.inactivityTimerId) {
    clearTimeout(state.inactivityTimerId);
    state.inactivityTimerId = null;
  }
}

function updateActiveSessionHistory() {
  if (!state.activeSessionId) return;
  const entry = state.history.find((h) => h.id === state.activeSessionId);
  if (!entry) return;

  const now = Date.now();
  entry.durationSec = state.sessionStartedAtMs > 0
    ? Math.max(1, Math.floor((now - state.sessionStartedAtMs) / 1000))
    : 0;
  entry.exercises = state.routine
    .map((exercise) => ({
      name: exercise.name,
      completedSets: exercise.completedSets,
      targetSets: exercise.targetSets,
      setsDetail: exercise.setsDetail || [],
    }));
  entry.totalCompletedSets = state.routine.reduce((sum, ex) => sum + ex.completedSets, 0);
  saveHistory(state.history);
}

function findNextIncompleteExercise(fromIdx) {
  // 현재 인덱스 이후부터 찾기
  for (let i = fromIdx + 1; i < state.routine.length; i++) {
    if (state.routine[i].completedSets < state.routine[i].targetSets) return i;
  }
  // 처음부터 현재까지 찾기
  for (let i = 0; i <= fromIdx; i++) {
    if (state.routine[i].completedSets < state.routine[i].targetSets) return i;
  }
  return -1;
}

function armNextSet() {
  clearReminderTimer();
  state.waitingForStart = true;
  state.countdownStartMs = Date.now();

  const exercise = state.routine[state.currentExerciseIdx];
  const restTime = exercise.restSeconds || ALERT_SECONDS;
  state.countdown = restTime;
  setActionBtn.textContent = "세트 시작";
  if (repsInput) repsInput.classList.add("hidden");
  if (weightInput) weightInput.classList.add("hidden");
  if (timeInput) timeInput.classList.add("hidden");
  sessionStatus.textContent = `${exercise.name} ${exercise.completedSets + 1}세트: ${restTime}초 안에 세트 시작을 누르세요.`;
  startReminderTimer();
}

function startReminderTimer() {
  countdownEl.textContent = `${state.countdown}초`;

  state.timerId = window.setInterval(() => {
    const elapsed = Math.floor((Date.now() - state.countdownStartMs) / 1000);
    const exercise = state.routine[state.currentExerciseIdx];
    const restTime = exercise ? (exercise.restSeconds || ALERT_SECONDS) : ALERT_SECONDS;
    state.countdown = Math.max(0, restTime - elapsed);
    countdownEl.textContent = `${state.countdown}초`;

    if (state.countdown > 0) {
      return;
    }

    clearReminderTimer();
    triggerAlarm();
    sendBackgroundNotification("세트 시작 시간!", "휴식 시간이 끝났습니다. 다음 세트를 시작하세요.");
    sessionStatus.textContent = "세트 시작 대기 시간이 지났습니다. 지금 시작하세요.";
    countdownEl.textContent = "알림 발생";
  }, 1000);
}

function clearReminderTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function finishSession({ manual }) {
  clearReminderTimer();
  clearInactivityTimer();

  const endedAtMs = Date.now();
  const durationSec =
    state.sessionStartedAtMs > 0
      ? Math.max(1, Math.floor((endedAtMs - state.sessionStartedAtMs) / 1000))
      : 0;

  const completedSnapshot = state.routine
    .map((exercise) => ({
      name: exercise.name,
      completedSets: exercise.completedSets,
      targetSets: exercise.targetSets,
      setsDetail: exercise.setsDetail || [],
    }));

  const totalCompletedSets = completedSnapshot.reduce((sum, exercise) => sum + exercise.completedSets, 0);

  // 진행 중 기록을 업데이트하여 완료 처리
  const existingEntry = state.activeSessionId
    ? state.history.find((h) => h.id === state.activeSessionId)
    : null;

  if (existingEntry) {
    existingEntry.endedAt = new Date(endedAtMs).toISOString();
    existingEntry.durationSec = durationSec;
    existingEntry.totalCompletedSets = totalCompletedSets;
    existingEntry.status = manual ? "중간 종료" : "완료";
    existingEntry.exercises = completedSnapshot.filter((ex) => ex.completedSets > 0);
    saveHistory(state.history);
  } else if (durationSec > 0 || totalCompletedSets > 0) {
    state.history.unshift({
      id: createId(),
      dateKey: formatDateKey(new Date(endedAtMs)),
      startedAt: new Date(state.sessionStartedAtMs || endedAtMs).toISOString(),
      endedAt: new Date(endedAtMs).toISOString(),
      durationSec,
      totalCompletedSets,
      status: manual ? "중간 종료" : "완료",
      exercises: completedSnapshot.filter((ex) => ex.completedSets > 0),
    });
    state.history = state.history.slice(0, 120);
    saveHistory(state.history);
  }

  state.active = false;
  state.waitingForStart = false;
  state.sessionStartedAtMs = 0;
  state.activeSessionId = "";
  state.currentExerciseIdx = 0;
  state.completionMessage = manual ? "운동을 종료했습니다." : "운동 완료. 잘했습니다.";
  document.body.classList.remove("session-active");

  if (weightInput) { weightInput.value = ""; weightInput.classList.add("hidden"); }
  if (repsInput) { repsInput.value = ""; repsInput.classList.add("hidden"); }
  if (timeInput) { timeInput.value = ""; timeInput.classList.add("hidden"); }
  if (setNoteInput) { setNoteInput.value = ""; setNoteInput.classList.add("hidden"); }

  renderRoutine();
  renderSession();
  renderHistory();
  updateStreakBar();

  // 완료 축하 오버레이 (완료 시에만)
  if (!manual) {
    showCompletionOverlay({
      totalSets: totalCompletedSets,
      durationSec,
      exerciseCount: completedSnapshot.filter((e) => e.completedSets > 0).length,
      exercises: completedSnapshot.filter((e) => e.completedSets > 0),
    });
    triggerAlarm(640);
  } else {
    // 수동 종료 시 바로 기록 탭으로
    switchTab("history");
  }
}

function resetSession({ message = "" } = {}) {
  clearReminderTimer();
  clearInactivityTimer();
  state.active = false;
  state.waitingForStart = false;
  state.currentExerciseIdx = 0;
  state.sessionStartedAtMs = 0;
  state.activeSessionId = "";
  state.completionMessage = message;
  document.body.classList.remove("session-active");
  if (weightInput) { weightInput.value = ""; weightInput.classList.add("hidden"); }
  if (repsInput) { repsInput.value = ""; repsInput.classList.add("hidden"); }
  if (timeInput) { timeInput.value = ""; timeInput.classList.add("hidden"); }
  if (setNoteInput) { setNoteInput.value = ""; setNoteInput.classList.add("hidden"); }
  switchTab("workout");

  if (!state.previewExerciseId) {
    state.previewExerciseId = state.routine[0]?.id || "";
  }
  renderRecentRoutines();
}

function formatSetDetail(s) {
  if (s.time) {
    const base = `${s.time}초`;
    return s.note ? `${base} · ${s.note}` : base;
  }
  const parts = [];
  if (s.weight) parts.push(`${s.weight}kg`);
  parts.push(s.reps ? `${s.reps}회` : "-");
  const base = parts.join("×");
  return s.note ? `${base} · ${s.note}` : base;
}

// ── 완료 축하 오버레이 ──
let _completionDismissTimer = null;

function showCompletionOverlay({ totalSets, durationSec, exerciseCount, exercises }) {
  const overlay = document.querySelector("#completion-overlay");
  if (!overlay) return;

  // 통계 필
  const statsEl = document.querySelector("#completion-stats");
  if (statsEl) {
    statsEl.innerHTML = "";
    const pills = [
      { value: totalSets, label: "총 세트" },
      { value: formatDuration(durationSec), label: "운동 시간" },
      { value: exerciseCount, label: "운동 종목" },
    ];
    pills.forEach(({ value, label }) => {
      const pill = document.createElement("div");
      pill.className = "stat-pill";
      pill.innerHTML = `<span class="stat-pill-value">${value}</span><span class="stat-pill-label">${label}</span>`;
      statsEl.appendChild(pill);
    });
  }

  // 이전 세션과 비교
  const compEl = document.querySelector("#completion-comparison");
  if (compEl) {
    compEl.innerHTML = "";
    const comparisons = [];
    exercises.forEach((ex) => {
      const lastSet = getLastSessionData(ex.name);
      if (!lastSet) return;
      const curSets = ex.setsDetail || [];
      if (!curSets.length) return;
      const curLast = curSets[curSets.length - 1];
      if (curLast.weight && lastSet.weight && curLast.weight !== lastSet.weight) {
        const diff = curLast.weight - lastSet.weight;
        const sign = diff > 0 ? "+" : "";
        const cls = diff > 0 ? "comp-up" : "comp-down";
        comparisons.push(`${ex.name}: ${lastSet.weight}kg → ${curLast.weight}kg <span class="${cls}">(${sign}${diff}kg)</span>`);
      }
    });
    if (comparisons.length > 0) {
      comparisons.forEach((text) => {
        const item = document.createElement("p");
        item.className = "comparison-item";
        item.innerHTML = text;
        compEl.appendChild(item);
      });
    }
  }

  // 버스트 도트 생성
  const burstEl = document.querySelector("#burst-dots");
  if (burstEl) {
    burstEl.innerHTML = "";
    const colors = ["#0056d6", "#0a9e6f", "#f4692f", "#ffd886", "#5f9bff", "#7ce4d7"];
    for (let i = 0; i < 12; i++) {
      const dot = document.createElement("span");
      dot.className = "burst-dot";
      const angle = (i / 12) * 2 * Math.PI;
      const dist = 120 + Math.random() * 80;
      const bx = Math.round(Math.cos(angle) * dist);
      const by = Math.round(Math.sin(angle) * dist);
      dot.style.setProperty("--bx", `${bx}px`);
      dot.style.setProperty("--by", `${by}px`);
      dot.style.backgroundColor = colors[i % colors.length];
      dot.style.animationDelay = `${0.1 + Math.random() * 0.3}s`;
      burstEl.appendChild(dot);
    }
  }

  overlay.classList.remove("hidden");
  overlay.classList.add("visible");

  // 버튼 dismiss
  const dismissBtn = document.querySelector("#completion-dismiss");
  const onDismiss = () => {
    hideCompletionOverlay();
  };
  if (dismissBtn) {
    dismissBtn.removeEventListener("click", onDismiss);
    dismissBtn.addEventListener("click", onDismiss, { once: true });
  }

  // 3초 자동 dismiss
  if (_completionDismissTimer) clearTimeout(_completionDismissTimer);
  _completionDismissTimer = setTimeout(() => {
    hideCompletionOverlay();
  }, 3000);
}

function hideCompletionOverlay() {
  if (_completionDismissTimer) {
    clearTimeout(_completionDismissTimer);
    _completionDismissTimer = null;
  }
  const overlay = document.querySelector("#completion-overlay");
  if (overlay) {
    overlay.classList.remove("visible");
    overlay.classList.add("hidden");
  }
  switchTab("history");
}

// ── 최근 루틴 빠른 시작 ──
function renderRecentRoutines() {
  if (!recentRoutinesEl || !recentRoutinesListEl) return;

  // 루틴이 있으면 숨김
  if (state.routine.length > 0) {
    recentRoutinesEl.classList.add("hidden");
    return;
  }

  // 히스토리에서 최근 5개 고유 루틴 추출 (운동 이름 집합으로 중복 제거)
  const seen = new Set();
  const uniqueRoutines = [];
  for (const entry of state.history) {
    if (!Array.isArray(entry.exercises) || entry.exercises.length === 0) continue;
    const nameSet = entry.exercises
      .map((e) => e.name)
      .sort()
      .join("|");
    if (seen.has(nameSet)) continue;
    seen.add(nameSet);
    uniqueRoutines.push(entry);
    if (uniqueRoutines.length >= 5) break;
  }

  if (uniqueRoutines.length === 0) {
    recentRoutinesEl.classList.add("hidden");
    return;
  }

  recentRoutinesListEl.innerHTML = "";
  uniqueRoutines.forEach((entry) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "recent-routine-card";

    const dateEl = document.createElement("p");
    dateEl.className = "card-date";
    dateEl.textContent = formatDateLabel(entry.dateKey);
    card.appendChild(dateEl);

    const names = entry.exercises.map((e) => e.name);
    const exercisesEl = document.createElement("p");
    exercisesEl.className = "card-exercises";
    const displayNames = names.length > 3
      ? names.slice(0, 3).join(", ") + ` 외 ${names.length - 3}개`
      : names.join(", ");
    exercisesEl.textContent = displayNames;
    card.appendChild(exercisesEl);

    const totalSets = entry.exercises.reduce((s, e) => s + (e.targetSets || e.completedSets || 0), 0);
    const metaEl = document.createElement("p");
    metaEl.className = "card-meta";
    const durationText = entry.durationSec ? formatDuration(entry.durationSec) : "";
    metaEl.textContent = `${totalSets}세트${durationText ? " · " + durationText : ""}`;
    card.appendChild(metaEl);

    card.addEventListener("click", () => {
      // 루틴으로 로드
      const newRoutine = entry.exercises.map((ex) => ({
        id: createId(),
        name: ex.name,
        targetSets: ex.targetSets || ex.completedSets || 3,
        completedSets: 0,
        setsDetail: [],
        exerciseType: ex.exerciseType || "weight",
        restSeconds: ex.restSeconds || ALERT_SECONDS,
        description: ex.description || "",
      }));
      state.routine = newRoutine;
      saveRoutine(state.routine);
      renderRoutine();
      renderSession();
      recentRoutinesEl.classList.add("hidden");
    });

    recentRoutinesListEl.appendChild(card);
  });

  recentRoutinesEl.classList.remove("hidden");
}

function renderSetDots(completed, total) {
  let html = "";
  for (let i = 0; i < total; i++) {
    html += `<span class="set-dot${i < completed ? " filled" : ""}"></span>`;
  }
  return html;
}

function renderRoutine() {
  exerciseList.innerHTML = "";

  state.routine.forEach((exercise, index) => {
    const item = template.content.firstElementChild.cloneNode(true);
    item.dataset.id = exercise.id;
    item.dataset.exerciseId = exercise.id;

    // data-type for accent bar color
    const exType = exercise.exerciseType || "weight";
    item.dataset.type = exType;

    const nameEl = item.querySelector(".name");
    nameEl.textContent = exercise.name;
    // 운동 유형 배지
    if (exType !== "weight") {
      const badge = document.createElement("span");
      badge.className = `exercise-type-badge ${exType}`;
      badge.textContent = exType === "bodyweight" ? "맨몸" : "시간";
      nameEl.appendChild(badge);
    }

    // Meta row: "N세트 · 타입 · 휴식Xs"
    const typeLabel = exType === "weight" ? "웨이트" : exType === "bodyweight" ? "맨몸" : "시간";
    const restSec = exercise.restSeconds || 60;
    const restLabel = restSec >= 60 && restSec % 60 === 0 ? `${restSec / 60}분` : `${restSec}초`;
    item.querySelector(".meta").textContent =
      `${exercise.targetSets}세트 · ${typeLabel} · 휴식 ${restLabel}`;

    // Set ring: conic-gradient progress
    const pct = exercise.targetSets > 0
      ? Math.round((exercise.completedSets / exercise.targetSets) * 100)
      : 0;
    const ring = item.querySelector(".set-ring");
    if (ring) {
      ring.style.setProperty("--pct", pct);
      const inner = ring.querySelector(".set-ring-inner");
      if (inner) inner.textContent = `${exercise.completedSets}/${exercise.targetSets}`;
    }

    if (state.active && index === state.currentExerciseIdx) {
      item.classList.add("active-exercise");
    } else if (state.active) {
      item.classList.add("clickable-switch");
      if (exercise.completedSets >= exercise.targetSets) {
        item.style.opacity = "0.5";
      }
    } else if (!state.active && exercise.id === state.previewExerciseId) {
      item.style.setProperty("--ex-color", "#f4692f");
    }

    const removeButton = item.querySelector(".remove-btn");
    removeButton.dataset.id = exercise.id;
    const editButton = item.querySelector(".edit-btn");
    editButton.dataset.id = exercise.id;
    exerciseList.appendChild(item);
  });
}

function renderSession() {
  const currentActive = state.active ? state.routine[state.currentExerciseIdx] : null;
  const preview = getPreviewExercise();

  startSessionBtn.disabled = state.routine.length === 0 || state.active;
  setActionBtn.disabled = !state.active;
  endSessionBtn.disabled = !state.active;

  const setDotsEl = document.querySelector("#set-dots");
  const sessionRail = document.querySelector("#session-progress-rail");
  const sessionFill = document.querySelector("#session-progress-fill");

  if (!state.active || !currentActive) {
    if (state.completionMessage) {
      sessionStatus.textContent = state.completionMessage;
    } else {
      sessionStatus.textContent = "루틴을 입력하고 시작하세요.";
    }

    if (preview) {
      currentExerciseEl.textContent = preview.name;
      currentSetEl.textContent = `0 / ${preview.targetSets} 세트`;
      renderExerciseDescription(preview.description, preview.name);
    } else {
      currentExerciseEl.textContent = "-";
      currentSetEl.textContent = "0 / 0 세트";
      renderExerciseDescription("운동을 선택하면 설명이 표시됩니다.");
    }

    countdownEl.textContent = "-";
    setActionBtn.textContent = "세트 시작";
    if (repsInput) repsInput.classList.add("hidden");
    if (weightInput) weightInput.classList.add("hidden");
    if (timeInput) timeInput.classList.add("hidden");

    // 진행률 바 숨김
    const progressWrapInactive = document.querySelector("#focus-progress-wrap");
    if (progressWrapInactive) progressWrapInactive.classList.add("hidden");

    // set dots: clear
    if (setDotsEl) setDotsEl.innerHTML = "";
    // session rail: hide
    if (sessionRail) sessionRail.style.display = "none";
    return;
  }

  currentExerciseEl.textContent = currentActive.name;
  currentSetEl.textContent = `${Math.min(currentActive.completedSets + 1, currentActive.targetSets)} / ${currentActive.targetSets} 세트`;
  renderExerciseDescription(currentActive.description, currentActive.name);

  // Set dots
  if (setDotsEl) {
    setDotsEl.innerHTML = renderSetDots(currentActive.completedSets, currentActive.targetSets);
  }

  if (state.waitingForStart) {
    countdownEl.textContent = `${Math.max(0, state.countdown)}초`;
  } else {
    countdownEl.textContent = "세트 진행 중";
  }

  // 진행률 바 업데이트
  const totalSets = state.routine.reduce((s, ex) => s + ex.targetSets, 0);
  const doneSets = state.routine.reduce((s, ex) => s + ex.completedSets, 0);
  const pct = totalSets > 0 ? Math.round((doneSets / totalSets) * 100) : 0;
  const progressWrap = document.querySelector("#focus-progress-wrap");
  const progressBar = document.querySelector("#focus-progress-bar");
  const progressText = document.querySelector("#focus-progress-text");
  if (progressWrap) {
    if (state.active) {
      progressWrap.classList.remove("hidden");
    } else {
      progressWrap.classList.add("hidden");
    }
  }
  if (progressBar) progressBar.style.width = `${pct}%`;
  if (progressText) progressText.textContent = `${pct}%`;

  // Session progress rail
  if (sessionRail && sessionFill) {
    sessionRail.style.display = "block";
    sessionFill.style.width = `${pct}%`;
  }

  // Session sets list
  const sessionSetsList = document.querySelector("#session-sets-list");
  if (sessionSetsList) {
    sessionSetsList.innerHTML = "";
    if (state.active && currentActive && currentActive.setsDetail && currentActive.setsDetail.length > 0) {
      currentActive.setsDetail.forEach((s, si) => {
        const row = document.createElement("li");
        row.className = "session-set-row";
        row.dataset.setIndex = si;
        row.dataset.exerciseId = currentActive.id;

        const labelEl = document.createElement("span");
        labelEl.className = "session-set-label";
        labelEl.textContent = `${si + 1}세트`;

        const valueEl = document.createElement("span");
        valueEl.className = "session-set-value";
        valueEl.textContent = formatSetDetail(s);

        row.appendChild(labelEl);
        row.appendChild(valueEl);
        sessionSetsList.appendChild(row);
      });
    }
  }
}

function renderExerciseDescription(description, exerciseName) {
  exerciseDescriptionEl.textContent =
    typeof description === "string" && description.trim()
      ? description.trim()
      : "운동을 선택하면 설명이 표시됩니다.";
  const gifEl = document.querySelector("#exercise-gif");
  if (gifEl && exerciseName) {
    gifEl.src = getExerciseGifUrl(exerciseName);
    gifEl.classList.remove("hidden");
    gifEl.onerror = () => gifEl.classList.add("hidden");
  } else if (gifEl) {
    gifEl.classList.add("hidden");
  }
}

function renderHistory() {
  historyListEl.innerHTML = "";

  if (state.history.length === 0) {
    historySummaryEl.textContent = "기록 0건";
    state.selectedDateKey = "";

    // Hide sub-tabs, show empty state directly in the card
    const _subtabsEl = document.getElementById("history-subtabs");
    if (_subtabsEl) _subtabsEl.style.display = "none";
    document.querySelectorAll(".history-subtab-content").forEach((el) => { el.style.display = "none"; });

    // Show the list container so empty state is visible
    const listContainer = historyListEl.closest(".history-subtab-content");
    if (listContainer) listContainer.style.display = "block";

    const emptyState = document.createElement("div");
    emptyState.className = "history-empty-state";
    emptyState.innerHTML = `
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="28" stroke="#0056d6" stroke-width="2" opacity="0.3"/>
        <path d="M22 32 L30 40 L42 24" stroke="#0056d6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <h3>첫 기록을 만들어보세요</h3>
      <p>운동을 완료하면 달력과 성장 그래프로<br>나의 변화를 확인할 수 있어요</p>
      <button class="primary" id="empty-state-start" type="button">운동 시작하기</button>
    `;
    historyListEl.appendChild(emptyState);

    const emptyStartBtn = emptyState.querySelector("#empty-state-start");
    if (emptyStartBtn) {
      emptyStartBtn.addEventListener("click", () => switchTab("workout"));
    }

    renderCalendar();
    renderProgressChart();
    return;
  }

  // Restore sub-tabs visibility
  const _subtabsEl2 = document.getElementById("history-subtabs");
  if (_subtabsEl2) _subtabsEl2.style.display = "";
  document.querySelectorAll(".history-subtab-content").forEach((el) => { el.style.display = ""; });
  switchHistorySubtab(activeHistorySubtab);

  historySummaryEl.textContent = `기록 ${state.history.length}건`;

  if (!state.selectedDateKey) {
    state.selectedDateKey = state.history[0].dateKey;
  }

  const grouped = new Map();
  state.history.forEach((entry) => {
    if (!grouped.has(entry.dateKey)) {
      grouped.set(entry.dateKey, []);
    }
    grouped.get(entry.dateKey).push(entry);
  });

  Array.from(grouped.entries()).forEach(([dateKey, entries]) => {
    const day = document.createElement("section");
    day.className = "history-day";

    const title = document.createElement("h3");
    title.textContent = formatDateLabel(dateKey);
    day.appendChild(title);

    entries.forEach((entry) => {
      const card = document.createElement("article");
      card.className = "history-entry";

      // Header row: time range, duration, status badge
      const header = document.createElement("div");
      header.className = "entry-header";

      const timeSpan = document.createElement("span");
      timeSpan.className = "entry-time";
      const endTimeText = entry.endedAt ? formatTime(entry.endedAt) : "진행 중";
      timeSpan.textContent = `${formatTime(entry.startedAt)} - ${endTimeText}`;
      header.appendChild(timeSpan);

      if (entry.durationSec && entry.status !== "진행 중") {
        const durSpan = document.createElement("span");
        durSpan.className = "entry-duration";
        durSpan.textContent = formatDuration(entry.durationSec);
        header.appendChild(durSpan);
      }

      const statusSpan = document.createElement("span");
      const statusClass = entry.status === "완료" ? "status-완료"
        : entry.status === "진행 중" ? "status-진행중"
        : "status-중간종료";
      statusSpan.className = `entry-status ${statusClass}`;
      statusSpan.textContent = entry.status;
      header.appendChild(statusSpan);

      card.appendChild(header);

      // Summary line
      const summary = document.createElement("div");
      summary.className = "entry-summary";
      const exerciseCount = entry.exercises ? entry.exercises.length : 0;
      summary.textContent = `총 ${entry.totalCompletedSets}세트 · ${exerciseCount}가지 운동`;
      card.appendChild(summary);

      // Exercise chips
      if (entry.exercises && entry.exercises.length > 0) {
        const chipsWrap = document.createElement("div");
        chipsWrap.className = "entry-exercises";
        entry.exercises.forEach((exercise) => {
          const chip = document.createElement("div");
          chip.className = "entry-exercise-chip";
          chip.innerHTML = `${exercise.name} <span class="chip-sets">${exercise.completedSets}/${exercise.targetSets}</span>`;
          chipsWrap.appendChild(chip);
        });
        card.appendChild(chipsWrap);
      }

      // Detail section (hidden, toggled on click)
      const detail = document.createElement("div");
      detail.className = "entry-detail hidden";
      if (!entry.exercises || entry.exercises.length === 0) {
        detail.textContent = "진행한 세트 없음";
      } else {
        detail.textContent = entry.exercises
          .map((exercise) => {
            const sets = exercise.setsDetail && exercise.setsDetail.length > 0
              ? ` (${exercise.setsDetail.map(formatSetDetail).join(", ")})`
              : "";
            return `${exercise.name} ${exercise.completedSets}/${exercise.targetSets}${sets}`;
          })
          .join(" · ");
      }
      card.appendChild(detail);

      card.addEventListener("click", () => {
        detail.classList.toggle("hidden");
      });

      day.appendChild(card);
    });

    historyListEl.appendChild(day);
  });

  renderCalendar();
  renderProgressChart();
}

function renderCalendar() {
  if (!calendarGridEl || !calendarMonthEl || !calendarDetailEl) {
    return;
  }

  const cursor = getMonthStart(state.calendarCursor);
  state.calendarCursor = cursor;
  calendarMonthEl.textContent = `${cursor.getFullYear()}년 ${cursor.getMonth() + 1}월`;

  const grouped = new Map();
  state.history.forEach((entry) => {
    if (!grouped.has(entry.dateKey)) {
      grouped.set(entry.dateKey, []);
    }
    grouped.get(entry.dateKey).push(entry);
  });

  // 월간 통계 렌더링
  renderMonthStats(cursor, grouped);

  calendarGridEl.innerHTML = "";

  const firstDay = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay();
  const lastDate = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();

  for (let i = 0; i < firstDay; i += 1) {
    const empty = document.createElement("div");
    empty.className = "calendar-day-empty";
    calendarGridEl.appendChild(empty);
  }

  const todayKey = formatDateKey(new Date());

  for (let day = 1; day <= lastDate; day += 1) {
    const dateKey = formatDateKey(new Date(cursor.getFullYear(), cursor.getMonth(), day));
    const entries = grouped.get(dateKey) || [];

    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-day";
    button.dataset.date = dateKey;

    // 히트맵: 총 완료 세트 수 기반 열강도
    const totalSets = entries.reduce((sum, e) => sum + (e.totalCompletedSets || 0), 0);
    if (totalSets >= 51) {
      button.classList.add("cal-heat-4");
    } else if (totalSets >= 31) {
      button.classList.add("cal-heat-3");
    } else if (totalSets >= 16) {
      button.classList.add("cal-heat-2");
    } else if (totalSets >= 1) {
      button.classList.add("cal-heat-1");
    }

    if (entries.length > 0) {
      button.classList.add("has-entry");
    }
    if (state.selectedDateKey === dateKey) {
      button.classList.add("selected");
    }
    if (dateKey === todayKey) {
      button.classList.add("cal-today");
    }

    const dayText = document.createElement("span");
    dayText.textContent = String(day);
    button.appendChild(dayText);

    const count = document.createElement("span");
    count.className = "count";
    count.textContent = entries.length > 0 ? `${entries.length}회` : "";
    button.appendChild(count);

    calendarGridEl.appendChild(button);
  }

  renderCalendarDetail(grouped);
}

function renderCalendarDetail(groupedByDate) {
  if (!calendarDetailEl) {
    return;
  }

  calendarDetailEl.innerHTML = "";

  if (!state.selectedDateKey) {
    const empty = document.createElement("p");
    empty.className = "calendar-empty";
    empty.textContent = "날짜를 선택하면 해당 날짜 운동 기록이 표시됩니다.";
    calendarDetailEl.appendChild(empty);
    return;
  }

  const entries = groupedByDate.get(state.selectedDateKey) || [];
  const header = document.createElement("div");
  header.className = "calendar-detail-head";

  const title = document.createElement("h4");
  title.textContent = formatDateLabel(state.selectedDateKey);
  header.appendChild(title);

  const count = document.createElement("p");
  count.className = "calendar-day-count";
  count.textContent = `${entries.length}회 운동`;
  header.appendChild(count);

  calendarDetailEl.appendChild(header);

  if (entries.length === 0) {
    const empty = document.createElement("p");
    empty.className = "calendar-empty";
    empty.textContent = "이 날짜에는 저장된 기록이 없습니다.";
    calendarDetailEl.appendChild(empty);
    return;
  }

  entries.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "calendar-session-card";

    const sessionMeta = document.createElement("p");
    sessionMeta.className = "calendar-session-meta";
    const calEndTime = entry.endedAt ? formatTime(entry.endedAt) : "진행 중";
    const calDuration = entry.status === "진행 중" ? "" : ` · ${formatDuration(entry.durationSec)}`;
    sessionMeta.textContent = `${formatTime(entry.startedAt)}-${calEndTime}${calDuration} · ${entry.status}`;
    card.appendChild(sessionMeta);

    const chips = document.createElement("div");
    chips.className = "calendar-exercise-chips";

    if (!entry.exercises.length) {
      const chip = document.createElement("span");
      chip.className = "exercise-chip empty";
      chip.textContent = "진행한 세트 없음";
      chips.appendChild(chip);
    } else {
      entry.exercises.forEach((exercise) => {
        const chip = document.createElement("span");
        chip.className = "exercise-chip";
        const sets = exercise.setsDetail && exercise.setsDetail.length > 0
          ? ` (${exercise.setsDetail.map(formatSetDetail).join(", ")})`
          : "";
        chip.textContent = `${exercise.name} ${exercise.completedSets}/${exercise.targetSets}${sets}`;
        chips.appendChild(chip);
      });
    }

    card.appendChild(chips);
    calendarDetailEl.appendChild(card);
  });
}

function setupAuth() {
  const config = window.XERXISE_FIREBASE_CONFIG;
  if (!config || !window.firebase || !window.firebase.auth) {
    state.authReady = false;
    renderAuthStatus();
    return;
  }

  if (!window.firebase.apps.length) {
    window.firebase.initializeApp(config);
  }

  state.authReady = true;
  state.firestoreReady = !!window.firebase.firestore;
  state.firestore = state.firestoreReady ? window.firebase.firestore() : null;

  const auth = window.firebase.auth();

  auth.onAuthStateChanged((user) => {
    const prevUserId = state.user?.uid || "guest";
    const nextUserId = user?.uid || "guest";

    state.user = user
      ? {
          uid: user.uid,
          name: user.displayName || user.email || "사용자",
        }
      : null;

    renderAuthStatus();
    renderOnboarding();

    if (prevUserId !== nextUserId) {
      loadDataForCurrentUser();
      renderRoutine();
      renderSession();
      renderHistory();
      sessionStatus.textContent = user ? `${state.user.name} 계정 데이터를 불러왔습니다.` : "게스트 모드로 전환했습니다.";
      // Auth feedback removed — not important for the user to see
    }
  });

  auth.getRedirectResult().catch((error) => {
    setAuthFeedback(mapFirebaseAuthError(error), "error");
  });
}

function renderAuthStatus() {
  if (authStatusEl) {
    if (state.user) {
      authStatusEl.textContent = `${state.user.name}`;
    } else if (state.authReady) {
      authStatusEl.textContent = "게스트 모드";
    } else {
      authStatusEl.textContent = "로그인 설정 필요";
    }
  }

  if (googleLoginBtn) {
    googleLoginBtn.disabled = !!state.user || !state.authReady;
  }

  if (logoutBtn) {
    logoutBtn.disabled = !state.user || !state.authReady;
  }

  const chipLabel = document.querySelector("#auth-chip-label");
  if (chipLabel) {
    chipLabel.textContent = state.user ? state.user.name.split(" ")[0] : "게스트";
  }
}

async function handleGoogleLogin() {
  if (!window.firebase || !window.firebase.auth || !state.authReady) {
    setAuthFeedback("로그인 설정이 아직 준비되지 않았습니다.", "error");
    return;
  }

  try {
    const provider = new window.firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    await window.firebase.auth().signInWithPopup(provider);
    if (!state.onboardingDismissed && onboardingOverlay && !onboardingOverlay.classList.contains("hidden")) {
      setOnboardingPhase("benefits");
    } else {
      dismissOnboarding();
    }
    setAuthFeedback("Google 계정으로 로그인했습니다.", "info");
  } catch (error) {
    const code = getFirebaseErrorCode(error);

    if (code === "auth/popup-blocked") {
      try {
        const provider = new window.firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        await window.firebase.auth().signInWithRedirect(provider);
        setAuthFeedback("팝업이 차단되어 리다이렉트 로그인으로 전환합니다.", "info");
        return;
      } catch (redirectError) {
        setAuthFeedback(mapFirebaseAuthError(redirectError), "error");
        return;
      }
    }

    setAuthFeedback(mapFirebaseAuthError(error), "error");
  }
}

function loadOnboardingDismissed() {
  return localStorage.getItem(STORAGE_KEYS.onboardingDismissed) === "1";
}

function dismissOnboarding() {
  state.onboardingDismissed = true;
  localStorage.setItem(STORAGE_KEYS.onboardingDismissed, "1");
  renderOnboarding();
}

function renderOnboarding() {
  if (!onboardingOverlay) {
    return;
  }

  const shouldShow = !state.onboardingDismissed;
  onboardingOverlay.classList.toggle("hidden", !shouldShow);

  if (onboardingLoginBtn) {
    onboardingLoginBtn.disabled = !state.authReady;
  }
}

function setOnboardingPhase(phase) {
  state.onboardingPhase = phase;
  if (obPhaseWelcome) obPhaseWelcome.classList.toggle("hidden", phase !== "welcome");
  if (obPhaseBenefits) obPhaseBenefits.classList.toggle("hidden", phase !== "benefits");
  if (obPhaseChoose) obPhaseChoose.classList.toggle("hidden", phase !== "choose");
}

function setAuthFeedback(message, type = "info") {
  if (!authFeedbackEl) {
    return;
  }

  if (!message) {
    authFeedbackEl.textContent = "";
    authFeedbackEl.classList.add("hidden");
    authFeedbackEl.classList.remove("error", "info");
    return;
  }

  authFeedbackEl.textContent = message;
  authFeedbackEl.classList.remove("hidden");
  authFeedbackEl.classList.remove("error", "info");
  authFeedbackEl.classList.add(type === "error" ? "error" : "info");
}

function getFirebaseErrorCode(error) {
  if (error && typeof error === "object" && typeof error.code === "string") {
    return error.code;
  }
  return "";
}

function mapFirebaseAuthError(error) {
  const code = getFirebaseErrorCode(error);

  if (code === "auth/unauthorized-domain") {
    return "현재 도메인이 Firebase 인증 허용 도메인에 없습니다. Firebase Console > Authentication > Settings > Authorized domains에 mybody.vercel.app을 추가해 주세요.";
  }
  if (code === "auth/operation-not-allowed") {
    return "Firebase Console에서 Google 로그인 제공자가 비활성화되어 있습니다. Authentication > Sign-in method에서 Google을 활성화해 주세요.";
  }
  if (code === "auth/popup-closed-by-user") {
    return "로그인 창이 닫혔습니다. 다시 시도해 주세요.";
  }
  if (code === "auth/popup-blocked") {
    return "브라우저에서 팝업이 차단되었습니다. 팝업 허용 후 다시 시도해 주세요.";
  }
  if (code === "auth/network-request-failed") {
    return "네트워크 오류로 로그인에 실패했습니다. 네트워크 상태를 확인해 주세요.";
  }
  if (code) {
    return `로그인에 실패했습니다. (${code})`;
  }
  return "Google 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

function loadDataForCurrentUser() {
  state.routine = loadRoutine();
  state.history = loadHistory();
  state.presets = loadUserPresets();
  state.prs = loadPRs();
  state.currentExerciseIdx = 0;
  state.waitingForStart = false;
  clearReminderTimer();
  state.active = false;
  document.body.classList.remove("session-active");

  if (state.routine.length > 0) {
    state.previewExerciseId = state.routine[0].id;
  } else {
    state.previewExerciseId = "";
  }

  if (state.history.length > 0) {
    state.selectedDateKey = state.history[0].dateKey;
  } else {
    state.selectedDateKey = "";
  }

  renderUserPresets();
  renderCalendarScope();

  if (state.user && state.firestoreReady) {
    hydrateFromCloudForCurrentUser();
  }
}

function renderUserPresets() {
  if (!userPresetSelect || !loadUserPresetBtn) {
    return;
  }

  userPresetSelect.innerHTML = "";
  if (state.presets.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "저장된 루틴 없음";
    userPresetSelect.appendChild(option);
    userPresetSelect.disabled = true;
    loadUserPresetBtn.disabled = true;
    return;
  }

  state.presets.forEach((preset) => {
    const option = document.createElement("option");
    option.value = preset.id;
    option.textContent = preset.name;
    userPresetSelect.appendChild(option);
  });

  userPresetSelect.disabled = false;
  loadUserPresetBtn.disabled = false;
}

function renderCalendarScope() {
  if (!calendarScopeEl) {
    return;
  }
  calendarScopeEl.textContent = `캘린더 기준: ${getCurrentUserLabel()}`;
}

function getCurrentUserLabel() {
  return state.user?.name || "게스트";
}

function getPreviewExercise() {
  if (state.routine.length === 0) {
    state.previewExerciseId = "";
    return null;
  }

  if (!state.previewExerciseId) {
    state.previewExerciseId = state.routine[0].id;
  }

  return state.routine.find((exercise) => exercise.id === state.previewExerciseId) || state.routine[0];
}

function calculateStreak() {
  const doneDateKeys = new Set(
    state.history
      .filter((e) => e.status === "완료" || e.status === "중간 종료")
      .map((e) => e.dateKey)
  );
  const sorted = Array.from(doneDateKeys).sort((a, b) => b.localeCompare(a));
  if (sorted.length === 0) return 0;

  const todayKey = new Date().toISOString().slice(0, 10);
  const yesterdayKey = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
  })();

  // streak only counts if today or yesterday has a workout
  if (sorted[0] !== todayKey && sorted[0] !== yesterdayKey) return 0;

  let streak = 0;
  let cursor = new Date(sorted[0]);
  for (const key of sorted) {
    const expected = cursor.toISOString().slice(0, 10);
    if (key === expected) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function calculateWeeklyCount() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const diffToMon = (day === 0 ? -6 : 1 - day);
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMon);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const monKey = monday.toISOString().slice(0, 10);
  const sunKey = sunday.toISOString().slice(0, 10);

  const uniqueDays = new Set(
    state.history
      .filter((e) => e.status === "완료" || e.status === "중간 종료")
      .filter((e) => e.dateKey >= monKey && e.dateKey <= sunKey)
      .map((e) => e.dateKey)
  );
  return uniqueDays.size;
}

function updateStreakBar() {
  const streakEl = document.querySelector("#streak-count");
  const weeklyEl = document.querySelector("#weekly-progress");
  const totalEl = document.querySelector("#total-workouts");
  if (!streakEl || !weeklyEl || !totalEl) return;

  const streak = calculateStreak();
  const weeklyCount = calculateWeeklyCount();
  const weeklyGoal = Number(localStorage.getItem("xerxise-weekly-goal-v1") || 3);
  const total = new Set(
    state.history
      .filter((e) => e.status === "완료" || e.status === "중간 종료")
      .map((e) => e.dateKey)
  ).size;

  streakEl.textContent = String(streak);
  weeklyEl.textContent = `${weeklyCount}/${weeklyGoal}`;
  totalEl.textContent = String(total);
}

function normalizeExerciseName(name) {
  if (typeof name !== "string") {
    return "";
  }
  return name.replace(/\s+/g, "").toLowerCase();
}

function getLastSessionData(exerciseName) {
  const key = normalizeExerciseName(exerciseName);
  for (let i = 0; i < state.history.length; i++) {
    const entry = state.history[i];
    if (!Array.isArray(entry.exercises)) continue;
    const match = entry.exercises.find(
      (ex) => normalizeExerciseName(ex.name) === key
    );
    if (match && Array.isArray(match.setsDetail) && match.setsDetail.length > 0) {
      return match.setsDetail[match.setsDetail.length - 1];
    }
  }
  return null;
}

function findCanonicalExerciseByName(name) {
  const key = normalizeExerciseName(name);
  return ALL_DEFAULT_ROUTINES.find((exercise) => normalizeExerciseName(exercise.name) === key) || null;
}

function normalizeRoutineArray(parsed) {
  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed
    .filter((item) => item && typeof item.name === "string" && Number.isInteger(item.targetSets))
    .map((item) => {
      const canonical = findCanonicalExerciseByName(item.name);
      return {
        id: typeof item.id === "string" ? item.id : createId(),
        name: item.name,
        targetSets: item.targetSets,
        completedSets: Number.isInteger(item.completedSets) ? item.completedSets : 0,
        setsDetail: Array.isArray(item.setsDetail) ? item.setsDetail : [],
        exerciseType: ["weight", "bodyweight", "time"].includes(item.exerciseType) ? item.exerciseType : "weight",
        restSeconds: Number.isFinite(item.restSeconds) && item.restSeconds > 0 ? Number(item.restSeconds) : ALERT_SECONDS,
        description:
          typeof item.description === "string" && item.description.trim()
            ? item.description
            : canonical?.description || `${item.name} 운동입니다. 안정적인 자세를 먼저 만드세요.`,
      };
    });
}

function normalizeHistoryArray(parsed) {
  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed
    .filter((entry) => entry && typeof entry.dateKey === "string")
    .map((entry) => ({
      id: typeof entry.id === "string" ? entry.id : createId(),
      dateKey: entry.dateKey,
      startedAt: typeof entry.startedAt === "string" ? entry.startedAt : new Date().toISOString(),
      endedAt: typeof entry.endedAt === "string" ? entry.endedAt : new Date().toISOString(),
      durationSec: Number.isFinite(entry.durationSec) ? Number(entry.durationSec) : 0,
      totalCompletedSets: Number.isFinite(entry.totalCompletedSets) ? Number(entry.totalCompletedSets) : 0,
      status: entry.status === "완료" ? "완료" : entry.status === "진행 중" ? "진행 중" : "중간 종료",
      exercises: Array.isArray(entry.exercises)
        ? entry.exercises
            .filter((exercise) => exercise && typeof exercise.name === "string")
            .map((exercise) => ({
              name: exercise.name,
              completedSets: Number.isFinite(exercise.completedSets) ? Number(exercise.completedSets) : 0,
              targetSets: Number.isFinite(exercise.targetSets) ? Number(exercise.targetSets) : 0,
              setsDetail: Array.isArray(exercise.setsDetail) ? exercise.setsDetail : [],
            }))
        : [],
    }));
}

function normalizePresetArray(parsed) {
  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed
    .filter((preset) => preset && typeof preset.name === "string" && Array.isArray(preset.items))
    .map((preset) => ({
      id: typeof preset.id === "string" ? preset.id : createId(),
      name: preset.name.trim() || "내 루틴",
      items: preset.items
        .filter((item) => item && typeof item.name === "string" && Number.isInteger(item.targetSets))
        .map((item) => ({
          name: item.name,
          targetSets: item.targetSets,
          exerciseType: ["weight", "bodyweight", "time"].includes(item.exerciseType) ? item.exerciseType : "weight",
          description:
            typeof item.description === "string" && item.description.trim()
              ? item.description
              : `${item.name} 운동입니다. 안정적인 자세를 먼저 만드세요.`,
        })),
    }))
    .filter((preset) => preset.items.length > 0);
}

function getUserStorageScope() {
  return state.user?.uid || "guest";
}

function getRoutineStorageKey() {
  return `${STORAGE_KEYS.routineBase}:${getUserStorageScope()}`;
}

function getHistoryStorageKey() {
  return `${STORAGE_KEYS.historyBase}:${getUserStorageScope()}`;
}

function getPresetStorageKey() {
  return `${STORAGE_KEYS.presetBase}:${getUserStorageScope()}`;
}

function canUseCloudSync() {
  return !!(state.user && state.firestoreReady && state.firestore);
}

function getCloudDocRef(kind, userId = state.user?.uid) {
  if (!canUseCloudSync() || !userId) {
    return null;
  }
  return state.firestore.collection("users").doc(userId).collection("xerxise").doc(kind);
}

function queueCloudSync(kind, payload) {
  if (!canUseCloudSync()) {
    return;
  }

  const prev = state.cloudSyncTimers[kind];
  if (prev) {
    clearTimeout(prev);
  }

  const userId = state.user?.uid || "";
  state.cloudSyncTimers[kind] = setTimeout(() => {
    syncCloudDoc(kind, payload, userId);
  }, 350);
}

async function syncCloudDoc(kind, payload, userId) {
  if (!canUseCloudSync()) {
    return;
  }

  const ref = getCloudDocRef(kind, userId);
  if (!ref) {
    return;
  }

  try {
    await ref.set(
      {
        items: payload,
        updatedAt: window.firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  } catch {
    setAuthFeedback("클라우드 저장에 실패했습니다. 잠시 후 다시 시도합니다.", "error");
  }
}

async function hydrateFromCloudForCurrentUser() {
  if (!canUseCloudSync()) {
    return;
  }

  const userId = state.user?.uid || "";
  if (!userId) {
    return;
  }

  state.hydrationUserScope = userId;

  try {
    const [routineDoc, historyDoc, presetDoc] = await Promise.all([
      getCloudDocRef("routine", userId)?.get(),
      getCloudDocRef("history", userId)?.get(),
      getCloudDocRef("presets", userId)?.get(),
    ]);

    if ((state.user?.uid || "") !== userId || state.hydrationUserScope !== userId) {
      return;
    }

    const cloudRoutineRaw = routineDoc?.data()?.items;
    if (Array.isArray(cloudRoutineRaw)) {
      const cloudRoutine = normalizeRoutineArray(cloudRoutineRaw);
      if (cloudRoutine.length > 0) {
        state.routine = cloudRoutine;
        localStorage.setItem(getRoutineStorageKey(), JSON.stringify(cloudRoutine));
      }
    }

    const cloudHistoryRaw = historyDoc?.data()?.items;
    if (Array.isArray(cloudHistoryRaw)) {
      const cloudHistory = normalizeHistoryArray(cloudHistoryRaw);
      state.history = cloudHistory;
      localStorage.setItem(getHistoryStorageKey(), JSON.stringify(cloudHistory));
    }

    const cloudPresetRaw = presetDoc?.data()?.items;
    if (Array.isArray(cloudPresetRaw)) {
      const cloudPresets = normalizePresetArray(cloudPresetRaw);
      state.presets = cloudPresets;
      localStorage.setItem(getPresetStorageKey(), JSON.stringify(cloudPresets));
    }

    if (state.routine.length > 0) {
      state.previewExerciseId = state.routine[0].id;
    }
    if (state.history.length > 0) {
      state.selectedDateKey = state.history[0].dateKey;
    } else {
      state.selectedDateKey = "";
    }

    renderUserPresets();
    renderRoutine();
    renderSession();
    renderHistory();
    updateStreakBar();
  } catch {
    setAuthFeedback("클라우드 불러오기에 실패해 로컬 데이터를 사용합니다.", "error");
  }
}

function loadRoutine() {
  try {
    const currentKey = getRoutineStorageKey();
    const scopedRaw = localStorage.getItem(currentKey);

    let raw = scopedRaw;
    if (!raw && getUserStorageScope() === "guest") {
      raw =
        localStorage.getItem(STORAGE_KEYS.legacyRoutineV1) ||
        localStorage.getItem(STORAGE_KEYS.legacyRoutine);
    }

    if (!raw) {
      const seeded = createRoutineFromTemplate(DEFAULT_UPPER_ROUTINE_TEMPLATE);
      saveRoutine(seeded);
      return seeded;
    }

    if (!scopedRaw) {
      localStorage.setItem(currentKey, raw);
    }

    const parsed = JSON.parse(raw);
    const normalized = normalizeRoutineArray(parsed);
    if (normalized.length === 0) {
      const seeded = createRoutineFromTemplate(DEFAULT_UPPER_ROUTINE_TEMPLATE);
      saveRoutine(seeded);
      return seeded;
    }

    saveRoutine(normalized);
    return normalized;
  } catch {
    const seeded = createRoutineFromTemplate(DEFAULT_UPPER_ROUTINE_TEMPLATE);
    saveRoutine(seeded);
    return seeded;
  }
}

function saveRoutine(routine) {
  localStorage.setItem(getRoutineStorageKey(), JSON.stringify(routine));
  queueCloudSync(
    "routine",
    routine.map((item) => ({
      id: item.id,
      name: item.name,
      targetSets: item.targetSets,
      completedSets: item.completedSets,
      setsDetail: item.setsDetail || [],
      exerciseType: item.exerciseType || "weight",
      description: item.description,
    })),
  );
}

function createRoutineFromTemplate(template) {
  return template.map((exercise) => ({
    id: createId(),
    name: exercise.name,
    targetSets: exercise.targetSets,
    completedSets: 0,
    setsDetail: [],
    exerciseType: exercise.exerciseType || "weight",
    description: exercise.description,
  }));
}

function loadHistory() {
  try {
    const currentKey = getHistoryStorageKey();
    const scopedRaw = localStorage.getItem(currentKey);

    let raw = scopedRaw;
    if (!raw && getUserStorageScope() === "guest") {
      raw = localStorage.getItem(STORAGE_KEYS.legacyHistoryV1);
    }

    if (!raw) {
      return [];
    }

    if (!scopedRaw) {
      localStorage.setItem(currentKey, raw);
    }

    const parsed = JSON.parse(raw);
    return normalizeHistoryArray(parsed);
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(getHistoryStorageKey(), JSON.stringify(history));
  queueCloudSync("history", history);
}

function loadUserPresets() {
  try {
    const raw = localStorage.getItem(getPresetStorageKey());
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return normalizePresetArray(parsed);
  } catch {
    return [];
  }
}

function saveUserPresets(presets) {
  localStorage.setItem(getPresetStorageKey(), JSON.stringify(presets));
  queueCloudSync("presets", presets);
}

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getMonthStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function shiftMonth(base, delta) {
  return new Date(base.getFullYear(), base.getMonth() + delta, 1);
}

function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateLabel(dateKey) {
  const date = new Date(`${dateKey}T00:00:00`);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = days[date.getDay()] || "";
  return `${dateKey} (${weekday})`;
}

function formatTime(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "--:--";
  }

  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function formatDuration(totalSec) {
  const safe = Math.max(0, Math.floor(totalSec));
  const min = Math.floor(safe / 60);
  const sec = safe % 60;

  if (min === 0) {
    return `${sec}초`;
  }

  return `${min}분 ${sec}초`;
}

function triggerAlarm(baseFrequency = 880) {
  if (navigator.vibrate) {
    navigator.vibrate([180, 110, 180]);
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return;
  }

  const audioContext = new AudioContextClass();
  const now = audioContext.currentTime;

  [0, 0.25, 0.5].forEach((offset) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = "square";
    osc.frequency.value = baseFrequency + offset * 140;
    gain.gain.setValueAtTime(0.0001, now + offset);
    gain.gain.exponentialRampToValueAtTime(0.25, now + offset + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.14);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start(now + offset);
    osc.stop(now + offset + 0.15);
  });

  setTimeout(() => {
    audioContext.close().catch(() => {});
  }, 1000);
}

// ── Service Worker 등록 (PWA + 백그라운드 알림) ──
let swRegistration = null;
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then((reg) => {
    swRegistration = reg;
    console.log("[SW] registered", reg.scope);
  }).catch((err) => console.warn("[SW] registration failed", err));
}

function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission().then((perm) => {
      console.log("[Notification] permission:", perm);
      updateNotificationBanner();
    });
  } else if (!("Notification" in window)) {
    console.warn("[Notification] not supported in this browser/context");
  }
}

// ── 알림 배너 표시/숨김 ──
const notificationBanner = document.querySelector("#notification-banner");
const enableNotificationBtn = document.querySelector("#enable-notification-btn");

function updateNotificationBanner() {
  if (!notificationBanner) return;
  const supported = "Notification" in window;
  const granted = supported && Notification.permission === "granted";
  const denied = supported && Notification.permission === "denied";

  if (!supported || granted) {
    notificationBanner.style.display = "none";
  } else if (denied) {
    notificationBanner.querySelector("p").textContent = "🔕 알림이 차단되어 있어요. 기기 설정 > Safari/xerxise > 알림에서 허용해주세요.";
    notificationBanner.querySelector("button").style.display = "none";
    notificationBanner.style.display = "block";
  } else {
    notificationBanner.style.display = "block";
  }
}

if (enableNotificationBtn) {
  enableNotificationBtn.addEventListener("click", () => {
    requestNotificationPermission();
  });
}

// 초기 배너 상태 설정
updateNotificationBanner();

function sendBackgroundNotification(title, body) {
  if ("Notification" in window && Notification.permission !== "granted") return;

  // Service Worker 알림 (PWA 백그라운드에서도 동작)
  if (swRegistration) {
    swRegistration.showNotification(title, {
      body,
      icon: "./favicon.svg",
      tag: "xerxise-alert",
      requireInteraction: true,
      vibrate: [200, 100, 200],
    }).catch(() => {});
    return;
  }

  // Fallback: 일반 Notification
  try {
    new Notification(title, { body, icon: "./favicon.svg" });
  } catch {
    // Silent fail
  }
}

// ──────────────────────────────────────────────────────────
// 맞춤 운동 추천 위저드
// ──────────────────────────────────────────────────────────

const wizContainer = document.querySelector("#wiz-container");
const wizProgress = document.querySelector("#wiz-progress");
const wizApplyBtn = document.querySelector("#wiz-apply");

const wizState = {
  step: 0,
  gender: "",
  age: "",
  level: "",
  time: 0,
  exactAge: 0,
};

let currentRecommendation = null;

// ── 나이 → 나이대 매핑 ──
const AGE_MIN = 14;
const AGE_MAX = 80;
const ITEM_HEIGHT = 42;

function ageToGroup(age) {
  if (age <= 29) return "teen";
  if (age <= 49) return "adult";
  if (age <= 69) return "middle";
  return "senior";
}

function ageGroupMeta(group) {
  const map = {
    teen:   { label: "10대~20대", desc: "성장기 · 체력 기반 구축" },
    adult:  { label: "30대~40대", desc: "근력 유지 · 대사 건강" },
    middle: { label: "50대~60대", desc: "관절 보호 · 골밀도 관리" },
    senior: { label: "70대 이상", desc: "낙상 예방 · 기능 체력" },
  };
  return map[group] || map.teen;
}

// ── 스크롤 피커 초기화 ──
const agePickerScroll = document.querySelector("#age-picker-scroll");
const agePicker = document.querySelector("#age-picker");
const agePickerAgeEl = document.querySelector("#age-picker-age");
const agePickerGroupEl = document.querySelector("#age-picker-group");
const agePickerDescEl = document.querySelector("#age-picker-desc");
const agePickerConfirmBtn = document.querySelector("#age-picker-confirm");

let pickerSelectedAge = 25;
let pickerOffset = 0;
let pickerDragging = false;
let pickerStartY = 0;
let pickerStartOffset = 0;
let pickerMomentum = 0;
let pickerLastY = 0;
let pickerLastTime = 0;
let pickerAnimFrame = null;

function initAgePicker() {
  if (!agePickerScroll) return;

  agePickerScroll.innerHTML = "";
  const count = AGE_MAX - AGE_MIN + 1;
  const pickerHeight = agePicker ? agePicker.clientHeight : 200;
  const padItems = Math.floor(pickerHeight / ITEM_HEIGHT / 2);

  for (let i = 0; i < padItems; i++) {
    const pad = document.createElement("div");
    pad.className = "age-picker-item";
    pad.style.height = `${ITEM_HEIGHT}px`;
    agePickerScroll.appendChild(pad);
  }

  for (let age = AGE_MIN; age <= AGE_MAX; age++) {
    const item = document.createElement("div");
    item.className = "age-picker-item";
    item.style.height = `${ITEM_HEIGHT}px`;
    item.dataset.age = String(age);
    item.textContent = `${age}`;
    agePickerScroll.appendChild(item);
  }

  for (let i = 0; i < padItems; i++) {
    const pad = document.createElement("div");
    pad.className = "age-picker-item";
    pad.style.height = `${ITEM_HEIGHT}px`;
    agePickerScroll.appendChild(pad);
  }

  scrollToAge(pickerSelectedAge, false);
}

function scrollToAge(age, animate) {
  const idx = age - AGE_MIN;
  pickerOffset = -idx * ITEM_HEIGHT;
  applyPickerOffset(animate);
  pickerSelectedAge = age;
  updateAgeInfo();
}

function applyPickerOffset(animate) {
  if (!agePickerScroll) return;
  agePickerScroll.style.transition = animate ? "transform 0.3s cubic-bezier(.23,1,.32,1)" : "none";
  agePickerScroll.style.transform = `translateY(${pickerOffset}px)`;
  highlightCenter();
}

function highlightCenter() {
  if (!agePickerScroll) return;
  const items = agePickerScroll.querySelectorAll(".age-picker-item[data-age]");
  items.forEach((item) => {
    const age = Number(item.dataset.age);
    const idx = age - AGE_MIN;
    const itemCenter = idx * ITEM_HEIGHT + pickerOffset;
    item.classList.toggle("center", Math.abs(itemCenter) < ITEM_HEIGHT / 2);
  });
}

function snapToNearest() {
  const idx = Math.round(-pickerOffset / ITEM_HEIGHT);
  const clamped = Math.max(0, Math.min(AGE_MAX - AGE_MIN, idx));
  const age = AGE_MIN + clamped;
  scrollToAge(age, true);
}

function updateAgeInfo() {
  const group = ageToGroup(pickerSelectedAge);
  const meta = ageGroupMeta(group);
  if (agePickerAgeEl) agePickerAgeEl.textContent = `${pickerSelectedAge}세`;
  if (agePickerGroupEl) agePickerGroupEl.textContent = meta.label;
  if (agePickerDescEl) agePickerDescEl.textContent = meta.desc;
}

function handlePickerStart(y) {
  pickerDragging = true;
  pickerStartY = y;
  pickerStartOffset = pickerOffset;
  pickerMomentum = 0;
  pickerLastY = y;
  pickerLastTime = Date.now();
  if (pickerAnimFrame) cancelAnimationFrame(pickerAnimFrame);
  if (agePickerScroll) agePickerScroll.style.transition = "none";
}

function handlePickerMove(y) {
  if (!pickerDragging) return;
  const delta = y - pickerStartY;
  const maxOffset = 0;
  const minOffset = -(AGE_MAX - AGE_MIN) * ITEM_HEIGHT;
  pickerOffset = Math.max(minOffset, Math.min(maxOffset, pickerStartOffset + delta));
  if (agePickerScroll) agePickerScroll.style.transform = `translateY(${pickerOffset}px)`;

  const now = Date.now();
  const dt = now - pickerLastTime;
  if (dt > 0) {
    pickerMomentum = (y - pickerLastY) / dt * 12;
  }
  pickerLastY = y;
  pickerLastTime = now;
  highlightCenter();

  const idx = Math.round(-pickerOffset / ITEM_HEIGHT);
  const clamped = Math.max(0, Math.min(AGE_MAX - AGE_MIN, idx));
  const liveAge = AGE_MIN + clamped;
  if (liveAge !== pickerSelectedAge) {
    pickerSelectedAge = liveAge;
    updateAgeInfo();
  }
}

function handlePickerEnd() {
  if (!pickerDragging) return;
  pickerDragging = false;

  if (Math.abs(pickerMomentum) > 2) {
    animateMomentum();
  } else {
    snapToNearest();
  }
}

function animateMomentum() {
  const minOffset = -(AGE_MAX - AGE_MIN) * ITEM_HEIGHT;
  const maxOffset = 0;
  const friction = 0.92;

  function step() {
    pickerMomentum *= friction;
    pickerOffset += pickerMomentum;
    pickerOffset = Math.max(minOffset, Math.min(maxOffset, pickerOffset));

    if (agePickerScroll) {
      agePickerScroll.style.transition = "none";
      agePickerScroll.style.transform = `translateY(${pickerOffset}px)`;
    }
    highlightCenter();

    const idx = Math.round(-pickerOffset / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(AGE_MAX - AGE_MIN, idx));
    const liveAge = AGE_MIN + clamped;
    if (liveAge !== pickerSelectedAge) {
      pickerSelectedAge = liveAge;
      updateAgeInfo();
    }

    if (Math.abs(pickerMomentum) > 0.5) {
      pickerAnimFrame = requestAnimationFrame(step);
    } else {
      snapToNearest();
    }
  }
  pickerAnimFrame = requestAnimationFrame(step);
}

if (agePicker) {
  agePicker.addEventListener("touchstart", (e) => {
    handlePickerStart(e.touches[0].clientY);
  }, { passive: true });

  agePicker.addEventListener("touchmove", (e) => {
    handlePickerMove(e.touches[0].clientY);
    e.preventDefault();
  }, { passive: false });

  agePicker.addEventListener("touchend", () => handlePickerEnd());

  agePicker.addEventListener("mousedown", (e) => {
    handlePickerStart(e.clientY);
    e.preventDefault();
  });

  window.addEventListener("mousemove", (e) => {
    if (pickerDragging) handlePickerMove(e.clientY);
  });

  window.addEventListener("mouseup", () => handlePickerEnd());

  agePicker.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    const nextAge = Math.max(AGE_MIN, Math.min(AGE_MAX, pickerSelectedAge + delta));
    scrollToAge(nextAge, true);
  }, { passive: false });
}

if (agePickerConfirmBtn) {
  agePickerConfirmBtn.addEventListener("click", () => {
    wizState.age = ageToGroup(pickerSelectedAge);
    wizState.exactAge = pickerSelectedAge;
    setWizStep(2);
  });
}

function setWizStep(step) {
  wizState.step = step;

  const slides = wizContainer ? Array.from(wizContainer.querySelectorAll(".wiz-slide")) : [];
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === step);
  });

  const dots = wizProgress ? Array.from(wizProgress.querySelectorAll(".wiz-step-dot")) : [];
  const lines = wizProgress ? Array.from(wizProgress.querySelectorAll(".wiz-step-line")) : [];

  dots.forEach((dot, i) => {
    dot.classList.remove("active", "done");
    if (i < step && step <= 4) {
      dot.classList.add("done");
    } else if (i === step && step < 4) {
      dot.classList.add("active");
    } else if (step === 4) {
      dot.classList.add("done");
    }
  });

  lines.forEach((line, i) => {
    line.classList.toggle("done", i < step);
  });

  if (step === 1) {
    initAgePicker();
  }

  if (step === 4) {
    showWizResult();
  }
}

function adjustRoutineForTime(routine, minutes) {
  const exercises = routine.map((ex) => ({ ...ex }));

  if (minutes <= 30) {
    const sliced = exercises.slice(0, Math.min(4, exercises.length));
    return sliced.map((ex) => ({
      ...ex,
      targetSets: Math.max(2, Math.round(ex.targetSets * 0.7)),
    }));
  }

  if (minutes <= 45) {
    const sliced = exercises.slice(0, Math.min(5, exercises.length));
    return sliced.map((ex) => ({
      ...ex,
      targetSets: Math.max(2, Math.round(ex.targetSets * 0.85)),
    }));
  }

  if (minutes <= 60) {
    return exercises;
  }

  return exercises.map((ex) => ({
    ...ex,
    targetSets: ex.targetSets + 1,
  }));
}

function timeLabel(minutes) {
  if (minutes <= 30) return "30분";
  if (minutes <= 45) return "45분";
  if (minutes <= 60) return "60분";
  return "90분+";
}

function showWizResult() {
  const key = `${wizState.gender}_${wizState.age}_${wizState.level}`;
  const rec = RECOMMENDATION_DB[key];
  if (!rec) {
    return;
  }

  const minutes = wizState.time || 60;
  const adjusted = adjustRoutineForTime(rec.routine, minutes);

  currentRecommendation = { ...rec, routine: adjusted };

  const genderLabel = wizState.gender === "male" ? "남성" : "여성";
  const ageMeta = ageGroupMeta(wizState.age);
  const ageLabel = wizState.exactAge ? `${wizState.exactAge}세 (${ageMeta.label})` : ageMeta.label;
  const levelLabel = RECOMMEND_LEVELS.find((l) => l.value === wizState.level)?.label || "";

  const badge = document.querySelector("#wiz-result-badge");
  const title = document.querySelector("#wiz-result-title");
  const summary = document.querySelector("#wiz-result-summary");
  const frequency = document.querySelector("#wiz-result-frequency");
  const guideline = document.querySelector("#wiz-result-guideline");
  const evidence = document.querySelector("#wiz-result-evidence");
  const source = document.querySelector("#wiz-result-source");
  const routineList = document.querySelector("#wiz-result-routine");

  if (badge) badge.textContent = `${genderLabel} · ${ageLabel} · ${levelLabel} · ${timeLabel(minutes)}`;
  if (title) title.textContent = rec.title;
  if (summary) summary.textContent = rec.summary;
  if (frequency) frequency.textContent = rec.frequency;
  if (guideline) guideline.textContent = rec.guideline;
  if (evidence) evidence.textContent = rec.evidence;
  if (source) source.textContent = rec.source;

  if (routineList) {
    routineList.innerHTML = "";
    adjusted.forEach((exercise) => {
      const li = document.createElement("li");
      li.className = "recommend-routine-item";

      const info = document.createElement("div");
      const nameEl = document.createElement("p");
      nameEl.className = "rr-name";
      nameEl.textContent = exercise.name;
      info.appendChild(nameEl);

      const descEl = document.createElement("p");
      descEl.className = "rr-desc";
      descEl.textContent = exercise.description;
      info.appendChild(descEl);

      li.appendChild(info);

      const setsEl = document.createElement("span");
      setsEl.className = "rr-sets";
      setsEl.textContent = `${exercise.targetSets}세트`;
      li.appendChild(setsEl);

      routineList.appendChild(li);
    });
  }
}

function markCardSelected(container, value) {
  if (!container) return;
  Array.from(container.querySelectorAll(".wiz-card")).forEach((card) => {
    card.classList.toggle("selected", card.dataset.value === value);
  });
}

// Step 0: 성별 선택
const wizGenderCards = document.querySelector("#wiz-gender-cards");
if (wizGenderCards) {
  wizGenderCards.addEventListener("click", (e) => {
    const card = e.target.closest(".wiz-card");
    if (!card) return;
    wizState.gender = card.dataset.value;
    markCardSelected(wizGenderCards, wizState.gender);
    setTimeout(() => setWizStep(1), 250);
  });
}

// Step 1: 나이 스크롤 피커 (이벤트는 위에서 등록됨)

// Step 2: 경력 선택
const wizLevelCards = document.querySelector("#wiz-level-cards");
if (wizLevelCards) {
  wizLevelCards.addEventListener("click", (e) => {
    const card = e.target.closest(".wiz-card");
    if (!card) return;
    wizState.level = card.dataset.value;
    markCardSelected(wizLevelCards, wizState.level);
    setTimeout(() => setWizStep(3), 250);
  });
}

// Step 3: 시간 선택
const wizTimeCards = document.querySelector("#wiz-time-cards");
if (wizTimeCards) {
  wizTimeCards.addEventListener("click", (e) => {
    const card = e.target.closest(".wiz-card");
    if (!card) return;
    wizState.time = Number(card.dataset.value);
    markCardSelected(wizTimeCards, card.dataset.value);
    setTimeout(() => setWizStep(4), 250);
  });
}

// 뒤로가기
const wizBack1 = document.querySelector("#wiz-back-1");
const wizBack2 = document.querySelector("#wiz-back-2");
const wizBack3 = document.querySelector("#wiz-back-3");
const wizBack4 = document.querySelector("#wiz-back-4");

if (wizBack1) wizBack1.addEventListener("click", () => setWizStep(0));
if (wizBack2) wizBack2.addEventListener("click", () => setWizStep(1));
if (wizBack3) wizBack3.addEventListener("click", () => setWizStep(2));
if (wizBack4) {
  wizBack4.addEventListener("click", () => {
    wizState.gender = "";
    wizState.age = "";
    wizState.level = "";
    wizState.time = 0;
    wizState.exactAge = 0;
    currentRecommendation = null;
    pickerSelectedAge = 25;
    if (wizGenderCards) markCardSelected(wizGenderCards, "");
    if (wizLevelCards) markCardSelected(wizLevelCards, "");
    if (wizTimeCards) markCardSelected(wizTimeCards, "");
    setWizStep(0);
  });
}

// 루틴 적용
if (wizApplyBtn) {
  wizApplyBtn.addEventListener("click", () => {
    if (!currentRecommendation) return;

    const shouldReplace =
      state.routine.length === 0 ||
      window.confirm(`현재 루틴을 '${currentRecommendation.title}' 추천 루틴으로 교체할까요?`);

    if (!shouldReplace) return;

    if (state.active) {
      resetSession({ message: "추천 루틴 적용으로 기존 세션이 종료되었습니다." });
    }

    state.routine = createRoutineFromTemplate(currentRecommendation.routine);
    state.previewExerciseId = state.routine[0]?.id || "";

    saveRoutine(state.routine);
    renderRoutine();
    renderSession();

    sessionStatus.textContent = `'${currentRecommendation.title}' 추천 루틴을 적용했습니다. 운동 시작을 누르세요.`;

    const wizSection = document.querySelector(".recommend");
    if (wizSection) wizSection.classList.add("hidden");
    localStorage.setItem(STORAGE_KEYS.wizardHidden, "1");
  });
}

// ──────────────────────────────────────────────────────────
// 드래그 앤 드롭 (데스크톱 + 모바일 터치)
// ──────────────────────────────────────────────────────────

let dragSrcEl = null;

exerciseList.addEventListener("dragstart", (e) => {
  if (!editMode) { e.preventDefault(); return; }
  const item = e.target.closest(".exercise-item");
  if (!item) return;
  dragSrcEl = item;
  item.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", item.dataset.id || "");
});

exerciseList.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  exerciseList.querySelectorAll(".drag-over").forEach((el) => el.classList.remove("drag-over"));
  const item = e.target.closest(".exercise-item");
  if (item && item !== dragSrcEl) item.classList.add("drag-over");
});

exerciseList.addEventListener("dragleave", (e) => {
  const item = e.target.closest(".exercise-item");
  if (item) item.classList.remove("drag-over");
});

exerciseList.addEventListener("drop", (e) => {
  e.preventDefault();
  const targetItem = e.target.closest(".exercise-item");
  if (!targetItem || !dragSrcEl || targetItem === dragSrcEl) return;

  const srcId = dragSrcEl.dataset.id;
  const targetId = targetItem.dataset.id;
  const srcIdx = state.routine.findIndex((ex) => ex.id === srcId);
  const targetIdx = state.routine.findIndex((ex) => ex.id === targetId);
  if (srcIdx < 0 || targetIdx < 0) return;

  const [moved] = state.routine.splice(srcIdx, 1);
  state.routine.splice(targetIdx, 0, moved);
  saveRoutine(state.routine);
  renderRoutine();
  renderSession();
});

exerciseList.addEventListener("dragend", () => {
  if (dragSrcEl) dragSrcEl.classList.remove("dragging");
  exerciseList.querySelectorAll(".drag-over").forEach((el) => el.classList.remove("drag-over"));
  dragSrcEl = null;
});

// 모바일 터치 드래그
let touchDragItem = null;
let touchClone = null;
let touchDragId = null;

exerciseList.addEventListener("touchstart", (e) => {
  if (!editMode) return;
  const handle = e.target.closest(".drag-handle");
  if (!handle) return;
  const item = handle.closest(".exercise-item");
  if (!item) return;

  e.preventDefault();
  touchDragItem = item;
  touchDragId = item.dataset.id;

  touchClone = item.cloneNode(true);
  touchClone.classList.add("drag-clone");
  touchClone.style.position = "fixed";
  touchClone.style.width = item.offsetWidth + "px";
  touchClone.style.top = item.getBoundingClientRect().top + "px";
  touchClone.style.left = item.getBoundingClientRect().left + "px";
  document.body.appendChild(touchClone);
  item.classList.add("dragging");
}, { passive: false });

document.addEventListener("touchmove", (e) => {
  if (!touchDragItem || !touchClone) return;
  e.preventDefault();

  const touchY = e.touches[0].clientY;
  touchClone.style.top = (touchY - 30) + "px";

  touchClone.style.display = "none";
  const below = document.elementFromPoint(e.touches[0].clientX, touchY);
  touchClone.style.display = "";

  exerciseList.querySelectorAll(".drag-over").forEach((el) => el.classList.remove("drag-over"));
  const targetItem = below?.closest(".exercise-item");
  if (targetItem && targetItem !== touchDragItem) targetItem.classList.add("drag-over");
}, { passive: false });

document.addEventListener("touchend", () => {
  if (!touchDragItem) return;

  const overItem = exerciseList.querySelector(".drag-over");
  if (overItem && touchDragId) {
    const targetId = overItem.dataset.id;
    const srcIdx = state.routine.findIndex((ex) => ex.id === touchDragId);
    const targetIdx = state.routine.findIndex((ex) => ex.id === targetId);
    if (srcIdx >= 0 && targetIdx >= 0) {
      const [moved] = state.routine.splice(srcIdx, 1);
      state.routine.splice(targetIdx, 0, moved);
      saveRoutine(state.routine);
    }
  }

  if (touchClone) { touchClone.remove(); touchClone = null; }
  if (touchDragItem) touchDragItem.classList.remove("dragging");
  exerciseList.querySelectorAll(".drag-over").forEach((el) => el.classList.remove("drag-over"));
  touchDragItem = null;
  touchDragId = null;
  renderRoutine();
  renderSession();
});

// ─────────────────────────────────────────────
// Feature: PR 자동 감지 (Personal Record)
// ─────────────────────────────────────────────

function getPRStorageKey() {
  return `${STORAGE_KEYS.prBase}:${getUserStorageScope()}`;
}

function loadPRs() {
  try {
    const raw = localStorage.getItem(getPRStorageKey());
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function savePRs(prs) {
  localStorage.setItem(getPRStorageKey(), JSON.stringify(prs));
}

// 해당 운동의 역사적 세션 수를 반환 (PR 억제용)
function countExerciseSessions(normalizedName) {
  let count = 0;
  state.history.forEach((entry) => {
    if (Array.isArray(entry.exercises)) {
      const found = entry.exercises.find(
        (ex) => normalizeExerciseName(ex.name) === normalizedName
      );
      if (found && found.completedSets > 0) count += 1;
    }
  });
  return count;
}

function checkAndUpdatePR(exerciseName, weight, reps, time, exerciseType) {
  const key = normalizeExerciseName(exerciseName);
  if (!key) return null;

  // 2회 미만 기록이면 PR 감지 안 함
  if (countExerciseSessions(key) < 2) return null;

  if (!state.prs) state.prs = {};
  const existing = state.prs[key] || {};
  let newPR = null;

  if (exerciseType === "bodyweight") {
    const newReps = reps || 0;
    if (newReps > 0 && newReps > (existing.maxReps || 0)) {
      state.prs[key] = Object.assign({}, existing, {
        maxReps: newReps,
        date: formatDateKey(new Date()),
      });
      newPR = { type: "reps", name: exerciseName, reps: newReps };
    }
  } else if (exerciseType === "time") {
    const newTime = time || 0;
    if (newTime > 0 && newTime > (existing.maxTime || 0)) {
      state.prs[key] = Object.assign({}, existing, {
        maxTime: newTime,
        date: formatDateKey(new Date()),
      });
      newPR = { type: "time", name: exerciseName, time: newTime };
    }
  } else {
    // weight exercise: check maxWeight and maxVolume
    const w = weight || 0;
    const r = reps || 0;
    const vol = w * r;
    let updated = Object.assign({}, existing);
    let isNew = false;

    if (w > 0 && w > (existing.maxWeight || 0)) {
      updated.maxWeight = w;
      updated.maxWeightReps = r;
      updated.date = formatDateKey(new Date());
      isNew = true;
      newPR = { type: "weight", name: exerciseName, weight: w, reps: r };
    }
    if (vol > 0 && vol > (existing.maxVolume || 0)) {
      updated.maxVolume = vol;
      updated.date = formatDateKey(new Date());
      isNew = true;
      if (!newPR) {
        newPR = { type: "volume", name: exerciseName, weight: w, reps: r };
      }
    }
    if (isNew) {
      state.prs[key] = updated;
    }
  }

  if (newPR) {
    savePRs(state.prs);
  }
  return newPR;
}

let _prToastTimer = null;

function showPRToast(prInfo) {
  const toast = document.querySelector("#pr-toast");
  const toastText = document.querySelector("#pr-toast-text");
  if (!toast || !toastText) return;

  let msg = prInfo.name;
  if (prInfo.type === "reps") {
    msg += ` ${prInfo.reps}회`;
  } else if (prInfo.type === "time") {
    msg += ` ${prInfo.time}초`;
  } else {
    if (prInfo.weight) msg += ` ${prInfo.weight}kg`;
    if (prInfo.reps) msg += ` x ${prInfo.reps}회`;
  }

  toastText.textContent = `PR! ${msg}`;
  toast.classList.remove("hidden");
  // force reflow before adding visible
  void toast.offsetWidth;
  toast.classList.add("visible");

  if (_prToastTimer) clearTimeout(_prToastTimer);
  _prToastTimer = setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.classList.add("hidden"), 350);
  }, 2500);
}

// ─────────────────────────────────────────────
// Feature: 월간 통계 스트립
// ─────────────────────────────────────────────

function renderMonthStats(cursor, grouped) {
  const monthStatsEl = document.querySelector("#month-stats");
  if (!monthStatsEl) return;

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const lastDate = new Date(year, month + 1, 0).getDate();

  let workoutDays = 0;
  let totalSets = 0;
  for (let d = 1; d <= lastDate; d += 1) {
    const dk = formatDateKey(new Date(year, month, d));
    const entries = grouped.get(dk) || [];
    if (entries.length > 0) workoutDays += 1;
    entries.forEach((e) => { totalSets += e.totalCompletedSets || 0; });
  }

  // 연속 운동일 계산 (오늘 기준 이전으로)
  let streak = 0;
  const today = new Date();
  let checkDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  while (true) {
    const dk = formatDateKey(checkDate);
    const entries = grouped.get(dk) || [];
    if (entries.length > 0) {
      streak += 1;
      checkDate = new Date(checkDate.getFullYear(), checkDate.getMonth(), checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  monthStatsEl.innerHTML = "";

  function makePill(value, label) {
    const pill = document.createElement("div");
    pill.className = "month-stat-pill";
    pill.innerHTML = `<span class="month-stat-pill-value">${value}</span><span class="month-stat-pill-label">${label}</span>`;
    return pill;
  }

  monthStatsEl.appendChild(makePill(`${workoutDays}회`, "이번 달 운동"));
  monthStatsEl.appendChild(makePill(`${totalSets}세트`, "총 세트"));
  monthStatsEl.appendChild(makePill(`${streak}일`, "연속"));
}

// ─────────────────────────────────────────────
// Feature: 운동별 성장 차트
// ─────────────────────────────────────────────

let _activeChartExercise = "";

function renderProgressChart() {
  const chipsEl = document.querySelector("#exercise-chips");
  const chartCanvas = document.querySelector("#progress-chart");
  const chartStatsEl = document.querySelector("#chart-stats");
  if (!chipsEl || !chartCanvas || !chartStatsEl) return;

  // 고유 운동 이름 수집 + 빈도 계산
  const nameMap = new Map(); // normalized -> display name
  const freqMap = new Map(); // normalized -> count
  state.history.forEach((entry) => {
    if (!Array.isArray(entry.exercises)) return;
    entry.exercises.forEach((ex) => {
      if (ex.completedSets > 0) {
        const key = normalizeExerciseName(ex.name);
        if (key) {
          if (!nameMap.has(key)) nameMap.set(key, ex.name);
          freqMap.set(key, (freqMap.get(key) || 0) + 1);
        }
      }
    });
  });

  chipsEl.innerHTML = "";

  if (nameMap.size === 0) {
    chartCanvas.style.display = "none";
    chartStatsEl.innerHTML = "";
    return;
  }

  // 유효한 active 운동 확인 — 없으면 가장 자주 훈련한 운동으로 자동 선택
  if (!_activeChartExercise || !nameMap.has(normalizeExerciseName(_activeChartExercise))) {
    let maxFreq = 0;
    let mostFrequentKey = nameMap.keys().next().value;
    freqMap.forEach((count, key) => {
      if (count > maxFreq) {
        maxFreq = count;
        mostFrequentKey = key;
      }
    });
    _activeChartExercise = nameMap.get(mostFrequentKey);
  }

  nameMap.forEach((displayName) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "exercise-chip";
    chip.textContent = displayName;
    if (displayName === _activeChartExercise) chip.classList.add("active");
    chip.addEventListener("click", () => {
      _activeChartExercise = displayName;
      chipsEl.querySelectorAll(".exercise-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      drawExerciseChart(displayName);
    });
    chipsEl.appendChild(chip);
  });

  drawExerciseChart(_activeChartExercise);
}

function drawExerciseChart(exerciseName) {
  const chartCanvas = document.querySelector("#progress-chart");
  const chartStatsEl = document.querySelector("#chart-stats");
  if (!chartCanvas || !chartStatsEl) return;

  const key = normalizeExerciseName(exerciseName);

  // 데이터 수집: 날짜별 최고값
  const dataPoints = []; // { dateKey, value }

  // 운동 타입 판별
  let exerciseType = "weight";
  outer: for (let i = state.history.length - 1; i >= 0; i--) {
    const entry = state.history[i];
    if (!Array.isArray(entry.exercises)) continue;
    for (const ex of entry.exercises) {
      if (normalizeExerciseName(ex.name) === key && Array.isArray(ex.setsDetail) && ex.setsDetail.length > 0) {
        const s = ex.setsDetail[0];
        if (s.time) { exerciseType = "time"; }
        else if (!s.weight && s.reps) { exerciseType = "bodyweight"; }
        else { exerciseType = "weight"; }
        break outer;
      }
    }
  }

  // history는 내림차순(최신이 앞)이므로 역순으로 처리
  const sortedHistory = state.history.slice().sort((a, b) => a.dateKey.localeCompare(b.dateKey));

  sortedHistory.forEach((entry) => {
    if (!Array.isArray(entry.exercises)) return;
    const ex = entry.exercises.find((e) => normalizeExerciseName(e.name) === key);
    if (!ex || !Array.isArray(ex.setsDetail) || ex.setsDetail.length === 0) return;

    let maxVal = 0;
    ex.setsDetail.forEach((s) => {
      if (exerciseType === "time") {
        maxVal = Math.max(maxVal, s.time || 0);
      } else if (exerciseType === "bodyweight") {
        maxVal = Math.max(maxVal, s.reps || 0);
      } else {
        maxVal = Math.max(maxVal, s.weight || 0);
      }
    });

    if (maxVal > 0) {
      dataPoints.push({ dateKey: entry.dateKey, value: maxVal });
    }
  });

  chartStatsEl.innerHTML = "";

  if (dataPoints.length < 2) {
    // 데이터 부족 메시지
    chartCanvas.style.display = "none";
    const msg = document.createElement("p");
    msg.className = "chart-empty-msg";
    msg.textContent = "기록이 부족합니다 (최소 2회 이상)";
    chartStatsEl.appendChild(msg);
    return;
  }

  chartCanvas.style.display = "block";

  // 캔버스 반응형 너비 설정 (Retina 대응)
  const container = chartCanvas.parentElement;
  const containerWidth = container ? container.clientWidth - 32 : 360;
  const W = Math.max(280, containerWidth);
  const H = 200;
  const dpr = window.devicePixelRatio || 1;
  chartCanvas.width = W * dpr;
  chartCanvas.height = H * dpr;
  chartCanvas.style.width = W + "px";
  chartCanvas.style.height = H + "px";

  const ctx = chartCanvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, W, H);

  const PAD_L = 44;
  const PAD_R = 12;
  const PAD_T = 16;
  const PAD_B = 28;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;

  const values = dataPoints.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const valRange = maxVal - minVal || 1;

  function xPos(i) {
    return PAD_L + (i / (dataPoints.length - 1)) * chartW;
  }
  function yPos(v) {
    return PAD_T + chartH - ((v - minVal) / valRange) * chartH;
  }

  // 그리드라인
  ctx.strokeStyle = "rgba(93,116,161,0.15)";
  ctx.lineWidth = 1;
  const gridLines = 4;
  for (let g = 0; g <= gridLines; g++) {
    const y = PAD_T + (g / gridLines) * chartH;
    ctx.beginPath();
    ctx.moveTo(PAD_L, y);
    ctx.lineTo(W - PAD_R, y);
    ctx.stroke();

    // Y축 레이블
    const labelVal = maxVal - (g / gridLines) * valRange;
    ctx.fillStyle = "rgba(96,112,138,0.9)";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(Math.round(labelVal), PAD_L - 4, y + 3.5);
  }

  // 단위 레이블
  let unit = "kg";
  if (exerciseType === "bodyweight") unit = "회";
  else if (exerciseType === "time") unit = "초";
  ctx.fillStyle = "rgba(96,112,138,0.8)";
  ctx.font = "9px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(unit, 2, PAD_T + 4);

  // X축 날짜 레이블 (최대 5개)
  const labelInterval = Math.ceil(dataPoints.length / 5);
  ctx.fillStyle = "rgba(96,112,138,0.9)";
  ctx.font = "9px sans-serif";
  ctx.textAlign = "center";
  dataPoints.forEach((d, i) => {
    if (i % labelInterval === 0 || i === dataPoints.length - 1) {
      const x = xPos(i);
      const parts = d.dateKey.split("-");
      const label = parts.length >= 3 ? `${parts[1]}/${parts[2]}` : d.dateKey;
      ctx.fillText(label, x, H - 6);
    }
  });

  // 그라디언트 채우기
  const grad = ctx.createLinearGradient(0, PAD_T, 0, PAD_T + chartH);
  grad.addColorStop(0, "rgba(0,86,214,0.18)");
  grad.addColorStop(1, "rgba(0,86,214,0)");
  ctx.beginPath();
  dataPoints.forEach((d, i) => {
    const x = xPos(i);
    const y = yPos(d.value);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(xPos(dataPoints.length - 1), PAD_T + chartH);
  ctx.lineTo(xPos(0), PAD_T + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // 선
  ctx.beginPath();
  ctx.strokeStyle = "#0056d6";
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  dataPoints.forEach((d, i) => {
    const x = xPos(i);
    const y = yPos(d.value);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // 점
  dataPoints.forEach((d, i) => {
    const x = xPos(i);
    const y = yPos(d.value);
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = "#0056d6";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // 통계
  const maxData = Math.max(...values);
  const latestData = values[values.length - 1];
  const unitLabel = exerciseType === "time" ? "초" : exerciseType === "bodyweight" ? "회" : "kg";

  function makeStat(label, value) {
    const div = document.createElement("div");
    div.className = "chart-stat";
    div.innerHTML = `<span class="stat-label">${label}</span><span class="stat-value">${value}${unitLabel}</span>`;
    return div;
  }

  chartStatsEl.appendChild(makeStat("최고", maxData));
  chartStatsEl.appendChild(makeStat("최근", latestData));
  const countDiv = document.createElement("div");
  countDiv.className = "chart-stat";
  countDiv.innerHTML = `<span class="stat-label">기록 수</span><span class="stat-value">${dataPoints.length}회</span>`;
  chartStatsEl.appendChild(countDiv);
}
