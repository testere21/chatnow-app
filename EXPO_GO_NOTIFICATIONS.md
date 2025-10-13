# Expo Go Push Notification Sınırlaması

## ⚠️ Önemli Bilgi

**Expo Go'da Push Notification Desteği Kaldırıldı!**

SDK 53+ ile Expo Go'da push notification desteği kaldırılmıştır. Bu nedenle:

### 🚫 Expo Go'da Çalışmayan:
- Push notifications (uzak bildirimler)
- Expo push token alma
- Firebase push notifications

### ✅ Expo Go'da Çalışan:
- Yerel bildirimler (sınırlı)
- Uygulama içi bildirimler
- Mesajlaşma sistemi

## 🔧 Çözümler:

### 1. **Development Build Kullanın**
```bash
# EAS Build ile development build oluşturun
eas build --profile development --platform android
```

### 2. **APK Build (Önerilen)**
```bash
# Production APK oluşturun
eas build --profile production --platform android
```

### 3. **Expo Go'da Test**
- Push notification'lar çalışmaz
- Diğer özellikler normal çalışır
- Hata mesajları normal (görmezden gelin)

## 📱 APK'da Çalışacak:

### ✅ **Production APK'da:**
- Push notifications ✅
- Mesaj bildirimleri ✅
- Firebase notifications ✅
- Tüm özellikler ✅

### ⚠️ **Expo Go'da:**
- Push notifications ❌
- Yerel bildirimler ⚠️ (sınırlı)
- Mesajlaşma ✅
- Diğer özellikler ✅

## 🎯 Sonuç:

**Expo Go'da test ederken:**
- Push notification hataları normal
- Uygulama çalışmaya devam eder
- APK'da her şey düzgün çalışır

**APK build edin ve test edin!** 🚀
