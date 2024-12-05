# reloved
# API Documentation

## Table of Contents
1. Authentication
2. Users
3. Categories
4. Products
5. Orders
6. Reviews
7. Transactions

## Authentication

1. POST `/api/auth/register`  
   Daftar akun baru dengan mengirimkan nama, email, dan kata sandi.

2. POST `/api/auth/login`  
   Login menggunakan email, username, dan kata sandi.

3. POST `/api/auth/forgot-password`  
   Meminta token untuk lupa kata sandi.

4. PUT `/api/auth/update-password`  
   Mengganti kata sandi dengan kata sandi lama dan baru.

5. POST `/api/auth/logout`  
   Logout pengguna yang sedang aktif.

6. POST `/api/auth/verify-email`  
   Mengirimkan email verifikasi setelah pendaftaran untuk memastikan pengguna memiliki alamat email yang valid.

7. POST `/api/auth/change-role`  
   Mengubah peran pengguna dari 'user' ke 'admin' atau sebaliknya.

## Users

1. GET `/api/users`  
   Mengambil daftar semua pengguna (hanya untuk admin).

2. GET `/api/users/:id`  
   Mengambil informasi pengguna berdasarkan ID (hanya untuk admin).

3. PUT `/api/users/:id`  
   Memperbarui informasi pengguna berdasarkan ID (hanya untuk admin).

4. DELETE `/api/users/:id`  
   Menghapus pengguna berdasarkan ID (hanya untuk admin).

5. DELETE `/api/users/me`  
   Menghapus akun pengguna yang sedang login (pengguna dapat menghapus akun mereka sendiri).

## Categories

1. GET `/api/categories`  
   Mengambil semua kategori.

2. GET `/api/categories/:id`  
   Mengambil kategori berdasarkan ID.

3. PUT `/api/categories/:id`  
   Memperbarui kategori berdasarkan ID.

4. DELETE `/api/categories/:id`  
   Menghapus kategori berdasarkan ID.

## Products

1. GET `/api/products`  
   Mengambil semua produk.

2. POST `/api/products`  
   Menambahkan produk baru dengan mengirimkan semua informasi produk.

3. GET `/api/products/:id`  
   Mengambil produk berdasarkan ID.

4. PUT `/api/products/:id`  
   Memperbarui produk berdasarkan ID.

5. DELETE `/api/products/:id`  
   Menghapus produk berdasarkan ID.

## Orders

1. GET `/api/orders`  
   Mengambil semua pesanan.

2. POST `/api/orders`  
   Membuat pesanan baru dengan mengirimkan user_id, total_price, dan order_items.

3. GET `/api/orders/:id`  
   Mengambil pesanan berdasarkan ID.

4. PUT `/api/orders/:id`  
   Memperbarui status pesanan berdasarkan ID.

5. DELETE `/api/orders/:id`  
   Menghapus pesanan berdasarkan ID.

## Reviews

1. GET `/api/reviews`  
   Mengambil semua ulasan.

2. POST `/api/reviews`  
   Menambahkan ulasan baru dengan mengirimkan product_id, user_id, comment, dan rating.

3. GET `/api/reviews/:id`  
   Mengambil ulasan berdasarkan ID.

4. PUT `/api/reviews/:id`  
   Memperbarui ulasan berdasarkan ID.

5. DELETE `/api/reviews/:id`  
   Menghapus ulasan berdasarkan ID.

## Transactions

1. GET `/api/transactions`  
   Mengambil daftar semua transaksi (hanya untuk admin).

2. POST `/api/transactions`  
   Membuat transaksi baru dengan mengirimkan order_id, user_id, payment_method, dan status.

3. GET `/api/transactions/:id`  
   Mengambil transaksi berdasarkan ID.

4. PUT `/api/transactions/:id`  
   Memperbarui status transaksi berdasarkan ID.

5. DELETE `/api/transactions/:id`  
   Menghapus transaksi berdasarkan ID.