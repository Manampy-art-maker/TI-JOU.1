const C='tijou-v3';
const F=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>c.add(u).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
if(e.request.method!=='GET')return;
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(m=>{
const net=fetch(e.request).then(r=>{if(r&&r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>null);
if(m){return m}
return net.then(r=>r||(e.request.mode==='navigate'?caches.match('./index.html'):Response.error()))}))});
