<p align="center"><a href="https://reloved.vercel.app/" target="_blank"><img src="https://github.com/muallifdielis/reloved/blob/main/frontend/public/logo.png" width="400" alt="Reloved Logo"></a></p>

<h1 align="center"><b>Ready to be Reloved 🛍</b></h1>

Reloved adalah aplikasi marketplace preloved dan thrift untuk memfasilitasi pengguna menjual atau membeli produk bekas berkualitas. Aplikasi ini dirancang untuk mendukung gaya hidup berkelanjutan dengan mempromosikan pembelian barang bekas yang layak pakai. Selain membantu pengguna mendapatkan barang dengan harga terjangkau, aplikasi ini juga mendukung upaya mengurangi limbah.

## Tim Kelompok 2 💻

- [Alfia Meilani Putri](https://github.com/alfiameilaniputri) - Frontend & UI/UX Designer
- [Dimas Fadillah](https://github.com/dimasfdllah) - Backend
- [Kamilah Syahrabanu](https://github.com/kamilahsyhrbn) - Fullstack & UI/UX Designer
- [Muhammad Muallif Dielis](https://github.com/muallifdielis) - Backend
- [Siti Nurlaela](https://github.com/laelasnl) - Backend

## Dokumentasi 📝

#### Dokumentasi API

[![Dokumentasi API](https://www.vectorlogo.zone/logos/getpostman/getpostman-ar21.svg)](https://documenter.getpostman.com/view/39331160/2sAY4xAMe8)

#### Dokumentasi Prototipe

[![Dokumentasi Prototipe](https://www.vectorlogo.zone/logos/figma/figma-ar21.svg)](https://www.figma.com/design/3N9X2PYUvI2qRPgnUW5eyn/ReLoved?node-id=1-19&t=gd70NSW1mA03jlke-1)

## Tech Stack 🛠

| Teknologi                 | Kegunaan                                             | Ikon                                                                                                                                                                                                                                                                                                                       |
| ------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **HTML, CSS, Javascript** | Membuat struktur dan tampilan dasar antarmuka web.   | <img src="https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg" width="50" alt="HTML Logo" /> <img src="https://www.vectorlogo.zone/logos/w3_css/w3_css-icon~old.svg" width="50" alt="CSS Logo" /> <img src="https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg" width="50" alt="Javascript Logo" /> |
| **Vite**                  | Mengembangkan komponen frontend yang dinamis.        | <img src="https://www.vectorlogo.zone/logos/vitejsdev/vitejsdev-icon.svg" width="50" alt="Vite Logo" />                                                                                                                                                                                                                    |
| **Tailwind CSS**          | Framework CSS untuk desain yang cepat dan responsif. | <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" width="50" alt="Tailwind CSS Logo" />                                                                                                                                                                                                        |
| **MongoDB**               | Database .                                           | <img src="https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg" alt="MongoDB Logo" />                                                                                                                                                                                                                                |
| **Midtrans**              | Payment gateway untuk transaksi                      | <img src="https://iconape.com/wp-content/files/yh/207674/svg/207674.svg" width="200" alt="Midtrans Logo" />                                                                                                                                                                                                                |
| **NodeJS & ExpressJS**    | Backend untuk server dan API .                       | <img src="https://www.vectorlogo.zone/logos/nodejs/nodejs-horizontal.svg" width="100" alt="Node.js Logo" /> <img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg" width="100" alt="Express.js Logo" />                                                                                                 |
| **Vercel**                | Hosting untuk frontend                               | <img src="https://www.vectorlogo.zone/logos/vercel/vercel-ar21.svg" width="100" alt="Vercel Logo" />                                                                                                                                                                                                                       |
| **Railway**               | Hosting untuk backend.                               | <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz3HvVa5UCZAucCoKnA0owixY0dqaoYwdOxA&s" width="100" alt="Railway Logo" />                                                                                                                                                                                  |
| **Git**                   | Version control.                                     | <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" width="50" alt="Git Logo" />                                                                                                                                                                                                                         |
| **Postman**               | Pengujian API.                                       | <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" width="50" alt="Railway Logo" />                                                                                                                                                                                                               |

## Instalasi 🔧

#### 1. Clone Repository

```bash
git clone https://github.com/muallifdielis/reloved.git
```

#### 2. Install Dependencies

- Backend

```bash
#Masuk ke folder backend
cd backend

#Install dependencies
npm install
```

- Frontend

```bash
#Masuk ke folder frontend
cd frontend

#Install dependencies
npm install
```

#### 3. Setup Environment Variables

Buatlah file `.env` di folder backend dan frontend. Bisa copy dari `.env.example` lalu masukkan:

- Backend

```env
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
PORT=

# NODEMAILER
EMAIL=
EMAIL_PASSWORD=
CLIENT_URL=

# CLOUDINARY
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# MIDTRANS
MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
MIDTRANS_IS_PRODUCTION=
```

- Frontend

```env
VITE_SERVER_URL=
```

#### 4. Jalankan Aplikasi

- Backend

```bash
#Masuk ke folder backend
cd backend

#Jalankan aplikasi
npm run dev
```

- frontend

```bash
#Masuk ke folder frontend
cd frontend

#Jalankan aplikasi
npm run dev
```
