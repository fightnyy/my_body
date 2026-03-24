const STORAGE_KEYS = {
  routineBase: "xerxise-routine-v2",
  historyBase: "xerxise-history-v2",
  presetBase: "xerxise-preset-v1",
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
    name: "케이블 컬 + 케이블 푸쉬다운",
    targetSets: 4,
    exerciseType: "weight",
    description: "컬과 푸쉬다운을 연속 수행하는 슈퍼세트로 팔 전면/후면을 함께 훈련합니다.",
  },
];

const DEFAULT_LOWER_ROUTINE_TEMPLATE = [
  {
    name: "크런치 + 플랭크",
    targetSets: 3,
    exerciseType: "bodyweight",
    description: "크런치로 복부 수축을 만든 뒤 플랭크로 코어 안정성을 유지하는 슈퍼세트입니다.",
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

// ── 운동 유형 토글 상태 ──
let selectedExerciseType = "weight";

// ── 편집 모드 상태 ──
let editMode = false;

const state = {
  routine: [],
  history: [],
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

loadDataForCurrentUser();
renderAuthStatus();

renderRoutine();
renderSession();
renderHistory();

setupAuth();
renderOnboarding();

// ── 탭 네비게이션 ──
let activeTab = "routine";
const tabBar = document.querySelector("#tab-bar");
const tabSections = document.querySelectorAll("[data-tab]");
const tabBtns = document.querySelectorAll(".tab-btn[data-tab]");

function switchTab(tabName) {
  if (state.active && tabName !== "workout") {
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
switchTab("routine");

// ── 루틴 탭 "시작하기" 버튼 ──
const startFromRoutineBtn = document.querySelector("#start-from-routine");
if (startFromRoutineBtn) {
  startFromRoutineBtn.addEventListener("click", () => {
    if (state.routine.length === 0) {
      alert("운동을 먼저 추가하세요.");
      return;
    }
    switchTab("workout");
    startSessionBtn.click();
  });
}

// ── 운동 유형 토글 핸들러 ──
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
    description: `${name} 운동입니다. 안정적인 자세를 만든 뒤 반복하세요.`,
  });

  if (!state.previewExerciseId) {
    state.previewExerciseId = state.routine[state.routine.length - 1].id;
  }

  saveRoutine(state.routine);
  renderRoutine();
  renderSession();

  form.reset();
  // 유형 토글 초기화
  selectedExerciseType = "weight";
  if (exerciseTypeToggle) {
    exerciseTypeToggle.querySelectorAll(".type-btn").forEach((b) => b.classList.remove("active"));
    const weightBtn = exerciseTypeToggle.querySelector('[data-type="weight"]');
    if (weightBtn) weightBtn.classList.add("active");
  }
  nameInput.focus();
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
    if (exType === "weight") {
      if (weightInput) { weightInput.classList.remove("hidden"); weightInput.value = ""; weightInput.focus(); }
      if (repsInput) { repsInput.classList.remove("hidden"); repsInput.value = ""; }
      if (timeInput) timeInput.classList.add("hidden");
    } else if (exType === "bodyweight") {
      if (weightInput) weightInput.classList.add("hidden");
      if (repsInput) { repsInput.classList.remove("hidden"); repsInput.value = ""; repsInput.focus(); }
      if (timeInput) timeInput.classList.add("hidden");
    } else if (exType === "time") {
      if (weightInput) weightInput.classList.add("hidden");
      if (repsInput) repsInput.classList.add("hidden");
      if (timeInput) { timeInput.classList.remove("hidden"); timeInput.value = ""; timeInput.focus(); }
    }
    return;
  }

  const repsVal = repsInput ? Number(repsInput.value) : 0;
  const weightVal = weightInput ? Number(weightInput.value) : 0;
  const timeVal = timeInput ? Number(timeInput.value) : 0;
  if (!exercise.setsDetail) exercise.setsDetail = [];
  exercise.setsDetail.push({
    reps: Number.isFinite(repsVal) && repsVal > 0 ? repsVal : 0,
    weight: Number.isFinite(weightVal) && weightVal > 0 ? weightVal : 0,
    time: Number.isFinite(timeVal) && timeVal > 0 ? timeVal : 0,
  });
  if (repsInput) { repsInput.value = ""; repsInput.classList.add("hidden"); }
  if (weightInput) { weightInput.value = ""; weightInput.classList.add("hidden"); }
  if (timeInput) { timeInput.value = ""; timeInput.classList.add("hidden"); }

  exercise.completedSets += 1;
  saveRoutine(state.routine);

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
  state.countdown = ALERT_SECONDS;
  state.countdownStartMs = Date.now();

  const exercise = state.routine[state.currentExerciseIdx];
  setActionBtn.textContent = "세트 시작";
  if (repsInput) repsInput.classList.add("hidden");
  if (weightInput) weightInput.classList.add("hidden");
  if (timeInput) timeInput.classList.add("hidden");
  sessionStatus.textContent = `${exercise.name} ${exercise.completedSets + 1}세트: ${ALERT_SECONDS}초 안에 세트 시작을 누르세요.`;
  startReminderTimer();
}

function startReminderTimer() {
  countdownEl.textContent = `${state.countdown}초`;

  state.timerId = window.setInterval(() => {
    const elapsed = Math.floor((Date.now() - state.countdownStartMs) / 1000);
    state.countdown = Math.max(0, ALERT_SECONDS - elapsed);
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

  if (weightInput) { weightInput.value = ""; weightInput.classList.add("hidden"); }
  if (repsInput) { repsInput.value = ""; repsInput.classList.add("hidden"); }
  if (timeInput) { timeInput.value = ""; timeInput.classList.add("hidden"); }

  // 운동 종료 → 기록 탭으로 전환
  switchTab("history");

  if (!manual) {
    triggerAlarm(640);
  }

  renderRoutine();
  renderSession();
  renderHistory();
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
  if (weightInput) { weightInput.value = ""; weightInput.classList.add("hidden"); }
  if (repsInput) { repsInput.value = ""; repsInput.classList.add("hidden"); }
  if (timeInput) { timeInput.value = ""; timeInput.classList.add("hidden"); }
  switchTab("routine");

  if (!state.previewExerciseId) {
    state.previewExerciseId = state.routine[0]?.id || "";
  }
}

function formatSetDetail(s) {
  if (s.time) return `${s.time}초`;
  const parts = [];
  if (s.weight) parts.push(`${s.weight}kg`);
  parts.push(s.reps ? `${s.reps}회` : "-");
  return parts.join("×");
}

function renderRoutine() {
  exerciseList.innerHTML = "";

  state.routine.forEach((exercise, index) => {
    const item = template.content.firstElementChild.cloneNode(true);
    item.dataset.id = exercise.id;
    const nameEl = item.querySelector(".name");
    nameEl.textContent = exercise.name;
    // 운동 유형 배지
    const exType = exercise.exerciseType || "weight";
    if (exType !== "weight") {
      const badge = document.createElement("span");
      badge.className = `exercise-type-badge ${exType}`;
      badge.textContent = exType === "bodyweight" ? "맨몸" : "시간";
      nameEl.appendChild(badge);
    }

    const setsInfo = exercise.setsDetail && exercise.setsDetail.length > 0
      ? ` (${exercise.setsDetail.map(formatSetDetail).join(", ")})`
      : "";
    item.querySelector(".meta").textContent = `${exercise.completedSets} / ${exercise.targetSets} 세트${setsInfo}`;

    if (state.active && index === state.currentExerciseIdx) {
      item.classList.add("active-exercise");
    } else if (state.active) {
      item.classList.add("clickable-switch");
      if (exercise.completedSets >= exercise.targetSets) {
        item.style.opacity = "0.5";
      }
    } else if (!state.active && exercise.id === state.previewExerciseId) {
      item.style.borderColor = "rgba(244, 105, 47, 0.55)";
      item.style.boxShadow = "0 0 0 2px rgba(244, 105, 47, 0.14) inset";
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

  if (!state.active || !currentActive) {
    if (state.completionMessage) {
      sessionStatus.textContent = state.completionMessage;
    } else {
      sessionStatus.textContent = "루틴을 입력하고 시작하세요.";
    }

    if (preview) {
      currentExerciseEl.textContent = preview.name;
      currentSetEl.textContent = `0 / ${preview.targetSets}`;
      renderExerciseDescription(preview.description);
    } else {
      currentExerciseEl.textContent = "-";
      currentSetEl.textContent = "0 / 0";
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
    return;
  }

  currentExerciseEl.textContent = currentActive.name;
  currentSetEl.textContent = `${Math.min(currentActive.completedSets + 1, currentActive.targetSets)} / ${currentActive.targetSets}`;
  renderExerciseDescription(currentActive.description);

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
}

function renderExerciseDescription(description) {
  exerciseDescriptionEl.textContent =
    typeof description === "string" && description.trim()
      ? description.trim()
      : "운동을 선택하면 설명이 표시됩니다.";
}

function renderHistory() {
  historyListEl.innerHTML = "";

  if (state.history.length === 0) {
    historySummaryEl.textContent = "기록 0건";
    state.selectedDateKey = "";

    const empty = document.createElement("p");
    empty.className = "history-empty";
    empty.textContent = "아직 저장된 운동 기록이 없습니다.";
    historyListEl.appendChild(empty);
    renderCalendar();
    return;
  }

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

      const top = document.createElement("p");
      top.className = "history-top";
      const endTimeText = entry.endedAt ? formatTime(entry.endedAt) : "진행 중";
      const durationText = entry.status === "진행 중" ? "" : ` · ${formatDuration(entry.durationSec)}`;
      top.textContent = `${formatTime(entry.startedAt)} - ${endTimeText}${durationText} · ${entry.status}`;
      card.appendChild(top);

      const setMeta = document.createElement("p");
      setMeta.className = "history-meta";
      setMeta.textContent = `총 ${entry.totalCompletedSets}세트`;
      card.appendChild(setMeta);

      const detail = document.createElement("p");
      detail.className = "history-detail";
      if (entry.exercises.length === 0) {
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

      day.appendChild(card);
    });

    historyListEl.appendChild(day);
  });

  renderCalendar();
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

  calendarGridEl.innerHTML = "";

  const firstDay = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay();
  const lastDate = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();

  for (let i = 0; i < firstDay; i += 1) {
    const empty = document.createElement("div");
    empty.className = "calendar-day-empty";
    calendarGridEl.appendChild(empty);
  }

  for (let day = 1; day <= lastDate; day += 1) {
    const dateKey = formatDateKey(new Date(cursor.getFullYear(), cursor.getMonth(), day));
    const entries = grouped.get(dateKey) || [];

    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-day";
    button.dataset.date = dateKey;

    if (entries.length > 0) {
      button.classList.add("has-entry");
    }
    if (state.selectedDateKey === dateKey) {
      button.classList.add("selected");
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
      setAuthFeedback(
        user
          ? state.firestoreReady
            ? "로그인 성공. Firebase 클라우드와 동기화됩니다."
            : "로그인 성공. 현재는 로컬 저장만 사용 중입니다."
          : "게스트 모드입니다. 로그인하면 기록 유실 위험을 줄일 수 있어요.",
        "info",
      );
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
  state.currentExerciseIdx = 0;
  state.waitingForStart = false;
  clearReminderTimer();
  state.active = false;

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

function normalizeExerciseName(name) {
  if (typeof name !== "string") {
    return "";
  }
  return name.replace(/\s+/g, "").toLowerCase();
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

function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
}

function sendBackgroundNotification(title, body) {
  if ("Notification" in window && Notification.permission === "granted") {
    try {
      new Notification(title, { body, icon: "./favicon.svg" });
    } catch {
      // Silent fail
    }
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
