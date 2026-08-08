# LearnLingo — Tasarım Spesifikasyonu

## Amaç

Online dil öğrenimi şirketi için 3 sayfalı web uygulaması: Home, Teachers, Favorites. Firebase auth + Realtime Database, mockup'a birebir uyumlu tasarım.

## Kaynaklar

- Teknik şartname: kullanıcı tarafından sağlandı (bu konuşmada)
- Maket: `Learn Lingo/` klasöründeki PNG dosyaları (Home sayfası 3 renk varyantı, UI KIT, teacher card iki durumu, 3 modal)
- Veri: `teachers.json` (30 kayıt, alanlar: name, surname, languages, levels, rating, reviews, price_per_hour, lessons_done, avatar_url, lesson_info, conditions, experience)

## Stack

- Vite + React 18 + React Router v6
- Tailwind CSS (mockup renk paletine göre yapılandırılmış)
- react-hook-form + yup (form + validasyon)
- Firebase: Authentication (email/password), Realtime Database (`teachers` node)
- localStorage: favoriler

## Tasarım sistemi

Ana renk sarı `#F4C550` (buton, vurgu, aktif filtre chip). UI KIT paletindeki diğer renkler dekoratif hero varyantları için mevcut ama ana ürün sarı temada kalır (Home mockup'ın birinci görseli referans). Tipografi: sans-serif (Inter), başlıklar bold/geniş, gövde metni gri tonlarda (`text-gray-500/600`).

## Sayfa yapısı

### Header (tüm sayfalarda ortak)
- Sol: logo (🌐 ikon + "LearnLingo")
- Orta: nav linkleri "Home", "Teachers" (giriş yapmışsa "Favorites" de eklenir)
- Sağ: misafirse "Log in" linki + "Registration" siyah buton; giriş yapmışsa kullanıcı adı + "Log out" butonu

### Home
- Hero: sol metin bloğu (başlık, açıklama, "Get started" CTA → Teachers sayfasına yönlendirir, misafirse önce Registration modalını açar), sağ görsel blok (mockup görseli veya CSS ile yeniden üretilmiş eşdeğeri)
- Stats bar: 4 istatistik (32,000+ Experienced tutors, 300,000+ 5-star tutor reviews, 120+ Subjects taught, 200+ Tutor nationalities) — kesikli çizgili kutu içinde

### Teachers
- Filtre bar: Languages / Level of knowledge / Price per hour — 3 select, mockup'taki gibi
- Kart listesi: ilk 4 kart, "Load more" butonu ile artan sayıda kayıt yeniden Firebase'den çekilir (limitToFirst artırımı)
- Her kart: avatar (yeşil online noktası), Languages label, isim, lessons online ikon, lessons done, rating, price/hour (yeşil), kalp butonu, Speaks/Lesson Info/Conditions satırları, "Read more" linki, level etiketleri (chip, aktif olan sarı dolu)
- "Read more" tıklanınca kart genişler: experience paragrafı + review listesi (reviewer avatar, isim, rating, comment) + "Book trial lesson" butonu görünür

### Favorites
- Sadece giriş yapmış kullanıcı erişebilir (misafir → Home'a yönlendirilir)
- Teachers sayfasıyla birebir aynı kart stilizasyonu, sadece favorilenen öğretmenler listelenir, filtre/load-more yok

## Modallar (Login / Register / Book trial lesson)

Ortak `Modal` bileşeni: backdrop tıklama, X ikonu, Esc tuşu — üçü de kapatır. Body scroll kilidi açıkken.

- **Login**: Email + Password (göz ikonu ile göster/gizle), "Log In" submit
- **Registration**: Name + Email + Password, "Sign Up" submit
- **Book trial lesson**: seçili öğretmen bilgisi (avatar+isim), radio grup "What is your main reason for learning X?" (5 seçenek), Full Name + Email + Phone number, "Book" submit

Üçünde de react-hook-form + yup, tüm alanlar zorunlu, hata mesajları alan altında gösterilir.

## Auth akışı

- Firebase `onAuthStateChanged` → React Context (`AuthProvider`) tüm uygulamaya user state sağlar
- Register: `createUserWithEmailAndPassword` + `updateProfile(displayName)`
- Login: `signInWithEmailAndPassword`
- Logout: `signOut`
- Hatalar: Firebase error code + message doğrudan form altında gösterilir, sessiz yutma yok

## Favoriler

- localStorage key: `learnlingo_favorites` → teacher id dizisi
- Kalp tıklama:
  - Kullanıcı yok → uyarı modalı/toast: "Favorilere eklemek için giriş yapmalısınız"
  - Kullanıcı var → id listede yoksa ekle (buton dolu sarı kalp), varsa çıkar (buton outline)
- Sayfa yenilemede localStorage'dan okunur, state korunur

## Veri katmanı (Firebase Realtime Database)

- `teachers/{id}` node'u, `teachers.json` içeriğiyle seed edilir (bir kerelik seed script, `scripts/seedTeachers.mjs`, Firebase Admin SDK veya REST ile)
- Teachers sayfası: `orderByKey().limitToFirst(n)` ile n=4'ten başlayıp Load More'da +4 artan sorgu
- Filtreler: çekilen veri üzerinde client-side filtre (dil/seviye/fiyat aralığı)

## Hata yönetimi

- Firebase istekleri try/catch ile sarılır, hata kullanıcıya görünür mesaj olarak gösterilir (ör. form altı kırmızı metin), console'a sessizce yutulmaz
- Yükleme/hata state'leri: Teachers sayfasında loading spinner + hata durumunda "Öğretmenler yüklenemedi" mesajı

## Test / doğrulama

- Manuel: dev server ile Home → Teachers → filtre → Load more → Read more → Book trial lesson → Login/Register → favori ekleme/çıkarma → sayfa yenileme → Favorites sayfası akışı tarayıcıda test edilir
- Konsolda hata olmaması doğrulanır
- Build (`vite build`) hatasız tamamlanmalı

## Kapsam dışı

- Gerçek ödeme/rezervasyon backend'i yok (form sadece kaydediliyormuş gibi davranır / opsiyonel Firebase'e yazılır)
- Responsive mobil/tablet: şartname sadece desktop için semantik/valid istiyor, mobile nice-to-have ama zorunlu değil (yıldızlı görev değil) — yine de temel breakpoint'ler eklenecek
