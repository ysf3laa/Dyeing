const CACHE="marahel-v1";
const CORE=["./","index.html","manifest.webmanifest","icon-192x192.png","icon-512x512.png","lib/react.js","lib/reactdom.js","lib/babel.js","lib/fbapp.js","lib/fbauth.js","lib/fbfs.js","lib/jsbarcode.js","lib/qrcode.js","lib/html5qrcode.js","lib/tesseract.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
const u=new URL(e.request.url);
if(e.request.mode==="navigate"){
e.respondWith(fetch(e.request).then(f=>{const cl=f.clone();caches.open(CACHE).then(c=>c.put("./",cl));return f;}).catch(()=>caches.match("./")));
}else if(u.origin===location.origin&&u.pathname.indexOf("/lib/")>-1){
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(f=>{const cl=f.clone();caches.open(CACHE).then(c=>c.put(e.request,cl));return f;})));
}
});
