# Deployment Guide

## 🌐 Cloud Deployment Options

### **Option 1: Render.com (Recommended - Free)**
Backend'i buluta deploy et, PC'yi kapat!

#### **Adım 1: GitHub'a Push**
```bash
git add .
git commit -m "Add cloud deployment config"
git push origin main
```

#### **Adım 2: Render.com Hesabı**
1. [render.com](https://render.com) adresine git
2. GitHub ile giriş yap
3. "New +" → "Web Service"

#### **Adım 3: Repository Bağla**
```
Repository: solitaryAI-project-product-review
Root Directory: backend
Build Command: mvn clean package -DskipTests
Start Command: java -jar target/product-review-backend-0.0.1-SNAPSHOT.jar
```

#### **Adım 4: Database**
1. "New +" → "PostgreSQL"
2. Free plan seç
3. Database URL'yi kopyala

#### **Adım 5: Environment Variables**
```
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=postgresql://username:password@host:port/database
SPRING_DATASOURCE_URL=postgresql://username:password@host:port/database
```

#### **Adım 6: App URL**
Deploy bittiğinde URL alacaksın:
```
https://product-review-api.onrender.com
```

---

### **Option 2: Railway.app (Alternatif)**
```bash
# Railway CLI kur
npm install -g @railway/cli

# Login
railway login

# Proje oluştur
railway init
railway up

# Environment variables ekle
railway variables set SPRING_PROFILES_ACTIVE=prod
```

---

### **Option 3: Vercel (Frontend için)**
Mobile app'i Vercel'e deploy et:
```bash
# Vercel CLI
npm i -g vercel
vercel --prod
```

---

## 📱 Mobile App Configuration

### **Base URL Güncelle**
Mobile app'te Settings'e gir:
```
Base URL: https://product-review-api.onrender.com
```

### **APK Build Et**
```bash
cd mobile
npx expo build:android --type apk
```

---

## 🔄 Otomatik Deployment

### **GitHub Actions**
`.github/workflows/deploy.yml`:
```yaml
name: Deploy to Render
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          curl POST "https://api.render.com/v1/services/${SERVICE_ID}/deploys" \
          -H "Authorization: Bearer ${RENDER_API_KEY}"
```

---

## 💰 Maliyet

### **Free Planlar**
- **Render.com**: $0/ay (750 saat/ay)
- **Railway.app**: $0/ay (500 saat/ay)
- **Vercel**: $0/ay (statik hosting)

### **Pro Planlar (Gerekirse)**
- **Render.com**: $7/ay (daha fazla saat)
- **Railway.app**: $5/ay (daha fazla saat)

---

## 🎯 Sonuç

### **Deploy Sonrası**
1. ✅ Backend 24/7 çalışır (PC kapalı olsa bile)
2. ✅ Herkes erişebilir
3. ✅ Demo mode sadece gerçek internet yoksa aktif olur
4. ✅ APK'yı indirip hemen kullanabilir

### **İş Akışı**
```
Sen: Kodu GitHub'a push et
Render: Otomatik deploy eder
İşveren: APK'yı indirir, live data kullanır
PC: Kapatabilirsin, backend bulutta çalışır
```

---

## 🚀 Hızlı Başlangıç

### **En Kolay Yol**
1. GitHub'a push et
2. Render.com'da web service oluştur
3. Database oluştur
4. APK build et
5. İşverene gönder

**Toplam süre: 15-20 dakika**

---

## 📞 Destek

### **Sorun Giderme**
- **Deploy fail**: Logları kontrol et
- **Database error**: Connection string'i kontrol et
- **API timeout**: Health check endpoint'i ekle

### **Monitoring**
- Render.com dashboard
- Uptime monitoring
- Error tracking
