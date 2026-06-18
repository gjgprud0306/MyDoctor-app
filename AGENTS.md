## Handoff 규칙 (OpenCode / Codex 공통)

### 세션 시작
- "폴더 안에 내용 확인해" → HANDOFF.md 읽고 현재 상태 요약

### 작업 완료 후
- 파일을 수정한 작업 완료 후 HANDOFF.md 업데이트 (완료한 작업, 검증 결과, 남은 작업)
- 사용자가 요청한 경우 GitHub에 push (git add / commit / push)

### 세션 종료 (터미널 전용)
- "터미널 종료할게" / 종료 관련 질문
  → GitHub push 상태 확인
  → Vercel 배포 상태 확인
  → HANDOFF.md 최신 상태 확인
  → 모두 완료되었는지 사용자에게 보고

## Assets 규칙

- 아이콘, 이미지, 로고는 반드시 각 버전 폴더의 `public/assets/` 경로만 사용
  - 예: `hifi/public/assets/`, `final/public/assets/`
- AI가 임의로 아이콘을 생성하지 말 것
- Figma URL을 직접 이미지 경로로 사용하지 말 것
- 모든 assets는 구현 전에 Figma에서 export하여 로컬에 저장되어 있어야 함
- export 완료 여부는 DESIGN_HANDOFF.md에 기록

## Issue 처리 규칙

- 작업 완료 후 관련 이슈에 변경사항, 검증 결과, 배포 URL을 댓글로 남긴다
- 완료 조건을 모두 충족한 경우에만 관련 이슈를 닫는다

## Figma 연동

- Figma MCP 서버를 사용할 수 있음
- Figma 파일 키 또는 노드 링크를 받으면 MCP 도구로 디자인 데이터를 읽어서 구현
