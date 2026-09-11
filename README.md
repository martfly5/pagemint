# PageMint

Ebooks bechne ke liye ek static website — **Home, Ebooks Store (search + filters), About, aur Contact Us** pages ke saath. Pure HTML/CSS/JS hai, koi backend nahi chahiye, isliye ye seedha **GitHub Pages** par free host ho sakti hai.

## Folder structure

```
pagemint/
├── index.html        → Homepage
├── store.html         → Ebooks Store (search + category/price filters)
├── about.html          → About page
├── contact.html         → Contact Us page
├── css/style.css        → Poora design system (colors, fonts, layout)
├── js/data.js            → Saari ebooks aur categories yahin par hain
├── js/render.js          → Book card / cover / detail modal banane ka code
├── js/cart.js             → Cart (localStorage) + checkout ka demo
├── js/main.js              → Homepage ka JS (nav, featured books)
├── js/store.js              → Store page ka search/filter/sort logic
└── README.md
```

## Apni ebooks add karna

Sab kuch ek hi file me hai — **`js/data.js`**. Har book ka format:

```js
{ id: "st-05", title: "Book ka naam", author: "Author ka naam",
  category: "study", price: 149, mrp: 249, rating: 4.5,
  pages: 120, format: "PDF + EPUB",
  blurb: "1-2 line ka description.", isNew: true, isBestseller: false }
```

- `category` in char me se ek hona chahiye: `study`, `earning`, `story`, `comics`.
- Naya category add karna ho to `CATEGORIES` array (usi file ke top par) me ek naya object daal do — poori site (homepage shelf, filters, colors) apne aap update ho jayegi.
- `isNew: true` se "New" badge lagta hai, `isBestseller: true` se homepage ke "Reader favourites" me book dikhti hai.

Filhaal covers **generate hote hain CSS se** (category ke color ka gradient + title), koi image file chahiye nahi. Agar aap real cover images use karna chahte hain, `images/` folder me daal kar `render.js` ke `bookCoverHTML()` function me `<img>` tag add kar dena — poori jagah bata di gayi hai comment se.

## ⚠️ Zaroori: Payment aur download abhi connect nahi hain

Ye website ek **poora frontend/demo** hai — cart, filters, search sab kaam karte hain, lekin:

1. **Payment gateway nahi laga hai.** "Checkout" button abhi ek demo message dikhata hai. Real payment ke liye India me **Razorpay**, **Instamojo**, ya **Cashfree** jaisa gateway integrate karna hoga (ismein server-side code chahiye hoga — GitHub Pages sirf static files serve karta hai, isliye payment ke liye ek chhota backend, ya un providers ka "payment link" / checkout button feature use karna sabse aasan raasta hai).
2. **Ebook delivery automatic nahi hai.** Payment ke baad file customer tak automatically pahunchane ke liye ek delivery service chahiye (jaise Gumroad, Payhip, ya khud ka backend + email service).
3. **Contact form abhi email nahi bhejta.** `contact.html` ka form sirf ek "sent" message dikhata hai. Isse kaam ka banane ke liye **Formspree**, **Web3Forms**, ya apna backend use karo — form ka `action` attribute unke instructions ke hisaab se set kar dena.

Agar chahen to ek simple approach ye ho sakta hai: shuru me Gumroad/Payhip par actual ebooks upload kar do, aur PageMint ke har "Buy now" button ko us product ke link par point kar do — isse payment + delivery dono ready-made mil jaate hain, jab tak khud ka poora system nahi bana lete.

## GitHub Pages par host karna

1. Is poore folder ka content apne GitHub repository me push karo (`index.html` root me hona chahiye).
2. Repo Settings → **Pages** me jao.
3. Source me apni default branch (jaise `main`) aur folder `/root` select karo, phir Save karo.
4. Kuch minute me site `https://<username>.github.io/<repo-name>/` par live ho jayegi.

## Local par dekhna

Sirf `index.html` ko browser me double-click karke khol sakte ho. Agar search/filter kaam na kare (kuch browsers file:// se strict hote hain), to ek simple local server chala lo:

```
npx serve .
```

phir jo localhost link mile wahan jao.

## Design notes

- Fonts: **Fraunces** (headings) + **Karla** (body/UI), Google Fonts se load hote hain.
- Har category (Study, Earning, Story, Comics) ka apna color hai — ye color homepage shelf, category cards, book covers, aur filter checkboxes sabme use hota hai, taaki poori site me ek category ko pehchan na aasan rahe.
- Cart data browser ke `localStorage` me save hota hai, isliye ek hi browser me reload karne par bhi cart bana rehta hai (dusre device/browser me nahi dikhega).
