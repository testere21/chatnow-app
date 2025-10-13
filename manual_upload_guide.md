# Profil Resimlerini Backend'e Yükleme Rehberi

## 📤 Manuel Yükleme Yöntemi:

### 1. Backend'e Git:
- URL: https://chatnow-app.onrender.com
- Upload endpoint: https://chatnow-app.onrender.com/api/upload

### 2. Postman veya Browser ile Test Et:
```
POST https://chatnow-app.onrender.com/api/upload
Content-Type: multipart/form-data
Body: form-data
Key: image
Value: [Dosya seç] (profile-ahmet.jpg)
```

### 3. Her Resim için Tekrarla:
- profile-ahmet.jpg
- profile-ayse.jpg  
- profile-mehmet.jpg
- profile-fatma.jpg
- profile-ali.jpg
- profile-zeynep.jpg

### 4. Alternatif: Backend'e Dosya Kopyala:
- Render dashboard'a git
- File system'e erişim
- uploads/ klasörüne resimleri kopyala

## 🔄 Sonraki Adım:
- Test kullanıcılarını tekrar güncelle
- Uygulamada test et
