/* 자동 생성 — build_sw.py 가 만든다. 직접 고치지 말 것.
   설치 시 아래 파일을 전부 받아 두고(약 8MB), 그 뒤로는 캐시에서 먼저 꺼낸다(오프라인 동작).
   VER 이 바뀌면 새 캐시를 채운 뒤 옛 캐시를 지운다. */
const VER = 'solar-855ea1bc98';
const FILES = [
  './',   // 주소를 폴더까지만 치고 들어오는 경우. 빼면 오프라인에서 상대경로가 다 어긋난다
  'app/baby.html',
  'app/celestial-textures.js',
  'app/constellation-art.js',
  'app/index.html',
  'img/icon-192.png',
  'img/icon-512.png',
  'img/icon-maskable.png',
  'index.html',
  'lib/OrbitControls.js',
  'lib/textures.js',
  'lib/three.min.js',
  'manifest.json',
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(VER).then(c => c.addAll(FILES)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== VER).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

/* 캐시 우선 — 오프라인에서 즉시 뜬다. 캐시에 없으면 네트워크로 가고,
   받아 온 것은 다음을 위해 넣어 둔다. 둘 다 실패하면 시작 화면을 돌려준다
   (앱 화면을 직접 돌려주면 주소가 어긋나 옆 파일들을 못 찾는다). */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit ||
    fetch(e.request).then(res => {
      if (res.ok && res.type === 'basic') {
        const copy = res.clone();
        caches.open(VER).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match('./'))));
});
