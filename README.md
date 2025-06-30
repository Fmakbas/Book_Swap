
# 📚 BookSwap

BookSwap, bireylerin sahip oldukları kitapları diğer kullanıcılarla **ilan oluşturarak takas edebilecekleri** ve **gerçek zamanlı mesajlaşarak iletişim kurabilecekleri** tam işlevli bir kitap paylaşım platformudur. Proje, modern web teknolojileri kullanılarak full-stack yapıda geliştirilmiştir.

---

## 🧠 Projenin Amacı

Günümüzde kitap paylaşımını dijital ortama taşımak hem sürdürülebilirlik hem de bilgiye erişim açısından önemlidir. BookSwap projesi, bu amaca hizmet ederek:
- Kitapların yeniden dolaşıma girmesini teşvik eder.
- Kullanıcıların kitap takası yaparken güvenli ve etkileşimli bir ortamda iletişim kurmalarını sağlar.
- Minimalist ve kullanıcı dostu bir arayüz sunar.

---

## 👨‍💻 Geliştiriciler

Bu proje iki geliştirici tarafından birlikte yürütülmüştür:

| İsim | Rolü | GitHub |
|------|------|--------|
| Fatih Akbaş | Back-End Developer<br>API tasarımı, veritabanı mimarisi, JWT auth, Socket.IO mesajlaşma | [@Fmakbas](https://github.com/Fmakbas) |
| Ahmet Küçükkor | Front-End Developer<br>Kullanıcı arayüzü, sayfa akışı, stil tasarımı, API entegrasyonu | [@kucukkor](https://github.com/kucukkor) |

---

## 🔧 Kullanılan Teknolojiler

### ⚙️ Backend
- **Node.js** & **Express.js** – RESTful API yapısı
- **MongoDB** & **Mongoose** – Veritabanı ve şema yönetimi
- **JWT (JSON Web Token)** – Kullanıcı kimlik doğrulama
- **Socket.IO** – Gerçek zamanlı özel mesajlaşma
- **Multer** – Resim yükleme işlemleri
- **CORS, dotenv, bcryptjs** gibi güvenlik ve yapılandırma paketleri

### 🎨 Frontend
- **React.js** – Bileşen tabanlı modern kullanıcı arayüzü
- **React Router** – Sayfa yönlendirme
- **Axios** – API istekleri
- **Tailwind CSS** (veya kullanılan stil kütüphanesi)
- **Socket.IO Client** – Canlı mesajlaşma altyapısı

---

## 🔍 Temel Özellikler

- ✅ Kullanıcı kayıt & giriş (JWT doğrulamalı)
- 📌 Kitap ilanı oluşturma, listeleme ve filtreleme
- 🖼️ Kitap kapağı görselleri yükleme (image upload)
- 🔐 İlan detayına sadece giriş yapmış kullanıcılar erişebilir
- 💬 Gerçek zamanlı birebir sohbet (Socket.IO tabanlı)
- 🔎 Kitap adına göre dinamik arama
- 📱 Responsive tasarım (mobil uyumlu)

---

## 📁 Proje Yapısı

\`\`\`bash
Book_Swap/
│
├── frontend/               # React uygulaması
├── models/                 # Mongoose modelleri
├── routes/                 # API uçları
├── services/               # İş mantığı ve veri işlemleri
├── middleware/             # JWT, hata yönetimi vb.
├── index.js                # Express sunucu başlangıç dosyası
├── uploads/                # Yüklenen resimler
├── docker-compose.yml      # Docker yapılandırması
├── .env                    # Ortam değişkenleri (gizli tutulmalı)
└── README.md               # Bu dökümantasyon
\`\`\`

---

## ⚙️ Kurulum ve Çalıştırma

### 1. Repository’yi Klonlayın
\`\`\`bash
git clone https://github.com/Fmakbas/Book_Swap.git
cd Book_Swap
\`\`\`

### 2. Ortam Değişkenlerini Ayarlayın
\`/.env\` dosyası oluşturun ve aşağıdaki gibi doldurun:
\`\`\`
PORT=5000
MONGO_URL=mongodb://localhost:27017/bookswap
JWT_SECRET=your_jwt_secret_key
\`\`\`

### 3. Back-End'i Başlatın
\`\`\`bash
npm install
node index.js
\`\`\`

### 4. Front-End'i Başlatın
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

> Not: Frontend varsayılan olarak \`http://localhost:5173\`, backend ise \`http://localhost:5000\` üzerinde çalışır.

---

## 🐳 Docker ile Kurulum (Opsiyonel)

Eğer Docker yüklüyse, tek komutla tüm sistemi ayağa kaldırabilirsiniz:
\`\`\`bash
docker-compose up --build
\`\`\`

---

## 📸 Ekran Görüntüleri (isteğe bağlı)

Eğer demo ekran görüntüleri yüklersen, aşağıya eklenebilir:

\`\`\`
📷 /test_images/test-image.png
📷 /test_images/test-image2.png
\`\`\`

---

## 🤝 Katkıda Bulunmak

Katkılar memnuniyetle karşılanır! Yeni özellik önerileri, bug bildirimi ya da geliştirmeler için:

1. Fork'la
2. Yeni bir branch oluştur (\`feature/yenilik\`)
3. Değişikliklerini yap ve commit et
4. Pull Request gönder

---

## 📜 Lisans

Bu proje MIT lisansı altındadır. Daha fazla bilgi için \`LICENSE\` dosyasına göz atabilirsiniz.

---

## 📫 İletişim

Herhangi bir soru veya işbirliği için bana GitHub üzerinden ulaşabilirsiniz:  
Fatih Akbaş → [@Fmakbas](https://github.com/Fmakbas)

---
