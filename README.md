# LearnLingo

Online dil öğrenimi hizmeti veren bir platform için tek sayfa uygulama (SPA). Kullanıcılar öğretmenleri dil, seviye ve saatlik ücrete göre filtreleyebilir, favorilerine ekleyebilir ve deneme dersi rezervasyonu yapabilir.

## Sayfalar

- **Home** — platformun avantajlarını tanıtır, "Teachers" sayfasına yönlendirir.
- **Teachers** — öğretmen listesi, filtreleme (dil / seviye / saatlik ücret) ve "Load more" ile sayfalama.
- **Favorites** — sadece giriş yapmış kullanıcılar için, favorilenen öğretmenler.

## Ana teknolojiler

- React 19 + Vite
- React Router v6
- Tailwind CSS v4
- react-hook-form + yup (form validasyonu)
- Firebase Authentication (email/password) + Realtime Database

## Tasarım

Tasarım `Learn Lingo/` klasöründeki maket görsellerine göre uygulanmıştır (Home, Teachers, öğretmen kartı, Log In / Registration / Book trial lesson modalları, renk paleti).

## Teknik şartname

Proje, öğretmen filtreleme, favoriler (localStorage), Firebase auth/veritabanı entegrasyonu, react-hook-form + yup ile form validasyonu, modal davranışları (backdrop/X/Esc ile kapama) ve React Router tabanlı routing gerektiren teknik şartnameye göre geliştirilmiştir.

## Kurulum

```bash
npm install
cp .env.example .env   # Firebase proje bilgilerinizi doldurun
npm run dev
```

## Veritabanını doldurma

`teachers.json` içeriğini Firebase Realtime Database'deki `teachers` node'una yüklemek için:

```bash
node scripts/seedTeachers.mjs
```

## Komutlar

- `npm run dev` — geliştirme sunucusu
- `npm run build` — production build
- `npm run lint` — lint kontrolü
- `npm run preview` — build çıktısını önizleme
