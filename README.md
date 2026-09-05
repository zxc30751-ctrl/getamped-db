# GetAmped DB

겟앰프드 액세서리 정보를 검색·필터링·확인하기 위한 비공식 팬 데이터베이스입니다.

## 포함 기능

- 액세서리 이름/설명 검색
- 출시연도 필터
- 획득처 필터
- 능력치 필터
- 최신순 / 오래된순 / 이름순 정렬
- 상세 페이지
- `?id=3` 형태의 공유 가능한 고유 URL
- 브라우저 뒤로가기/앞으로가기 처리
- 공유 링크로 직접 접속했을 때도 뒤로가기로 목록 복귀
- 잘못된 ID 자동 복구
- 모바일 반응형 UI
- 링크 공유 / 클립보드 복사
- 출처 URL 자동 링크 처리

## 파일

- `index.html`
- `style.css`
- `data.js`
- `script.js`

## GitHub Pages 배포

현재 GitHub 저장소에서 위 4개 파일을 교체한 뒤:

1. VS Code Source Control에서 변경사항 확인
2. Commit 메시지 예: `Build v1 complete pack`
3. Commit
4. Sync Changes
5. GitHub Pages 재배포 후 `Ctrl + F5`

## 데이터 수정

액세서리 데이터는 `data.js`의 `accessories` 배열에서 관리합니다.

확인하지 못한 값은 추측해서 채우지 말고 `미확인` 또는 빈 배열로 유지하는 것을 권장합니다.

## 주의

GetAmped DB는 팬이 제작한 비공식 정보 사이트이며 게임사 및 공식 서비스와 제휴·공식 관계가 없습니다.
