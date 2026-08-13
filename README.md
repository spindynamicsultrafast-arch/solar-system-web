# 🪐 반짝반짝 우리 태양계

6살 아이를 위한 한국어 3D 태양계. 태양 · 8행성 · 왜소행성 · 위성 30여 개 · 소행성대 · 카이퍼 벨트를
돌려 보고, 우주선으로 여행하고, 퀴즈를 푼다.

**열기 → https://spindynamicsultrafast-arch.github.io/solar-system-web/**

## 태블릿에 설치

크롬으로 위 주소를 열고 메뉴 → **앱 설치** / **홈 화면에 추가**.
설치할 때 8MB를 한 번 받아 두고, 그 뒤로는 **비행기 모드에서도** 실행된다.

## 크레딧

- 천체 표면: © [Solar System Scope](https://www.solarsystemscope.com/textures/) (CC BY 4.0), 원자료 NASA/JPL·USGS
- 탐사선 모자이크: NASA/JPL/SSI · NASA/JHUAPL/SwRI
- 별자리 그림: © Johan Meuris / Stellarium (Free Art License)
- 3D: [Three.js](https://threejs.org/)

## 이 저장소

배포본만 담긴다. 소스와 개발 기록은 별도 저장소에 있고, `deploy.py`가 앱이 실제로 읽는
파일만 여기로 복사한다. `sw.js`는 `build_sw.py`가 만드는 자동 생성 파일이라 직접 고치지 않는다.
