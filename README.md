# Almanca Fiil Çalışma — PWA

## 📁 Dosya Yapısı
```
almanca-fiil/
├── index.html          ← Ana uygulama (bu dosyayı değiştirme)
├── verbs.json          ← Fiil veritabanı (buraya fiil ekleyebilirsin)
├── audio_map.json      ← Ses dosyası yolları (doldurmak senin elinde)
├── manifest.json       ← PWA tanım dosyası (değiştirme)
├── sw.js               ← Service worker (değiştirme)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── audio/
    ├── a1/
    │   ├── sein_verb.mp3       ← fiilin telaffuzu
    │   ├── sein_conj.mp3       ← çekim tablosu okunuşu
    │   └── ...
    ├── a2/
    ├── b1/
    └── b2/
```

## 🚀 GitHub Pages'e Yükleme (5 adım)

1. **github.com** → Sign Up → Ücretsiz hesap aç
2. **New Repository** → İsim: `almanca-fiil` → Public → Create
3. **Upload files** → Tüm dosyaları sürükle → Commit
4. **Settings** → Pages → Source: `main` branch → Save
5. Birkaç dakika sonra: `https://KULLANICI_ADIN.github.io/almanca-fiil`

## 📱 Telefona Kurma
1. Chrome ile siteyi aç
2. "Uygulamayı Kur" banner'ına bas VEYA
3. Chrome menü (⋮) → "Ana ekrana ekle"
4. Uygulama kurulur — internetsiz de çalışır!

## 🔊 Ses Dosyası Ekleme
1. `audio/a1/` klasörüne MP3 dosyasını ekle
2. `audio_map.json`'da ilgili satırı doldur:
   ```json
   "a1_01_verb": "audio/a1/sein_verb.mp3"
   ```
3. GitHub'a yükle → Otomatik güncellenir

## 📝 Yeni Fiil Ekleme
1. `verbs.json`'u düzenle (veya Excel → xlsx_to_json.py kullan)
2. GitHub'a yükle
3. Kullanıcılar "Güncelle" butonuna basınca yeni fiiller gelir

## 🔄 Güncelleme Notu
`sw.js` içindeki `CACHE_NAME` değerini artır:
```js
const CACHE_NAME = 'almanca-fiil-v2';  // v1 → v2
```
Bu, kullanıcılara otomatik güncelleme bildirimi gönderir.
