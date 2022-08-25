const APP_PREFIX = 'BudgetTracker-'
const VERSION = 'version_1'
const CACHE_NAME = APP_PREFIX + VERSION
const DATA_CACHE_NAME = 'BT-cache-v1';

const FILES_TO_CACHE = [
    './index.html',
    './js/index.js',
    './icons/icon-72x72.png',
    './icons/icon-96x96.png',
    './icons/icon-128x128.png',
    './icons/icon-152x152.png',
    './icons/icon-192x192.png',
    './icons/icon-384x384.png',
    './icons/icon-512x512.png',
    './css/styles.css',
    './manifest.json',
    './js/idb.js'
]

self.addEventListener('fetch', function (event) {
    if (event.request.url.includes('/api/')) {
        console.log('>> fetch request >> ' + event.request.url)
        event.respondWith(
            caches
                .open(DATA_CACHE_NAME)
                .then((cache) => {
                    return fetch(eventNames.request)
                        .then((response) => {
                            if (response.status === 200) {
                                cache.put(event.request.url, response.clone())
                            }
                            return response
                        })
                        .catch((err) => {
                            
                            return cache.match(event.request)
                        })
                })
                .catch((err) => console.log(err))
        )
        return
    }

    event.respondWith(
        fetch(event.request).catch(function () {
            return caches.match(event.request).then(function (response) {
                if (response) {
                    return response
                } else if (
                    event.request.headers.get('accept').includes('text/html')
                ) {
                    return caches.match('/')
                }
            })
        })
    )
})

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            let cacheKeepList = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX)
            })
            cacheKeepList.push(CACHE_NAME)

            return Promise.all(
                keyList.map(function (key, i) {
                    if (cacheKeepList.indexOf(key) === -1) {
                        console.log('deleting  cache : ' + keyList[i])
                        return caches.delete(keyList[i])
                    }
                })
            )
        })
    )
})
