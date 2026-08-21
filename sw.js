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

/* 옛 캐시를 지우고 이 워커가 화면을 넘겨받는다. 갱신인 경우(지울 옛 캐시가 있었다)
   열려 있는 화면을 한 번 새로 고친다 — 캐시 우선이라 화면은 이미 옛 파일로 그려졌고,
   8MB 를 다 받을 때까지 걸리는 시간 때문에 「두 번 켜기」로는 빗나갈 때가 많다.
   첫 설치 때는 새로 고치지 않는다(지울 캐시가 없다). VER 은 내용 해시라 반복되지 않는다. */
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => {
      const old = ks.filter(k => k !== VER);
      return Promise.all(old.map(k => caches.delete(k))).then(() => old.length > 0);
    })
    .then(wasUpdate => self.clients.claim().then(() => wasUpdate))
    .then(wasUpdate => wasUpdate && self.clients.matchAll({ type: 'window' })
      .then(cs => cs.forEach(c => c.navigate(c.url).catch(() => {})))));
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
