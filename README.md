# xerxise

운동할 때 세트 수와 진행 기록을 놓치지 않도록 만든 웹 앱입니다.

## 기능
- 운동 이름 + 목표 세트 수를 미리 추가
- 추가한 운동의 목표 세트 수를 언제든 수정
- 최초 실행 시 사용자 기본 루틴(2분할 상체 템플릿) 자동 로드
- `상체 기본 루틴 불러오기` 버튼으로 언제든 기본 루틴 재적용
- `하체 기본 루틴 불러오기` 버튼으로 하체 루틴 즉시 적용
- 사용자별로 내 루틴 저장/불러오기 지원
- `운동 시작` 후 현재 운동/세트 자동 표시
- 운동 시작 전에도 리스트 항목을 눌러 운동 설명 확인 가능
- 세트 대기 상태에서 **10초 안에 시작하지 않으면 알림(소리 + 진동)**
- `세트 완료` 누를 때마다 자동 카운트 및 다음 세트/운동으로 이동
- 일자별 운동 기록(수행 세트, 소요 시간, 완료/중간 종료) 자동 저장
- 캘린더에서 날짜별 운동 여부 확인 + 선택 날짜 상세 기록 확인
- 캘린더는 로그인 계정 기준으로 분리 표시
- Google 로그인 시 사용자별로 루틴/기록 분리 저장
- 로그인 시 Firebase Firestore에 루틴/기록/내 루틴 클라우드 동기화
- 비로그인(게스트) 모드도 사용 가능

## 로그인 설정
- `firebase-config.js`에서 `window.XERXISE_FIREBASE_CONFIG` 값을 프로젝트 Firebase 설정으로 채우면 Google 로그인이 동작합니다.
- Google 로그인이 안 될 때:
  - Firebase Console > Authentication > Sign-in method에서 Google 제공자 활성화
  - Firebase Console > Authentication > Settings > Authorized domains에 `mybody.vercel.app` 추가
- Firestore 사용 설정:
  - Firebase Console > Firestore Database 생성
  - 보안 규칙에서 인증 사용자(`request.auth != null`)의 `users/{uid}` 경로 접근 허용

## 실행
브라우저에서 `index.html`을 열면 바로 사용 가능합니다.
