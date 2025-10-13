// Basit profil resmi yükleme scripti
const fs = require('fs');
const path = require('path');

// Profil resimleri
const profileImages = [
  { name: 'profile-ahmet.jpg', user: 'Ahmet Yılmaz' },
  { name: 'profile-ayse.jpg', user: 'Ayşe Demir' },
  { name: 'profile-mehmet.jpg', user: 'Mehmet Kaya' },
  { name: 'profile-fatma.jpg', user: 'Fatma Özkan' },
  { name: 'profile-ali.jpg', user: 'Ali Çelik' },
  { name: 'profile-zeynep.jpg', user: 'Zeynep Arslan' }
];

console.log('📸 Profil resimleri kontrol ediliyor...\n');

let foundCount = 0;
let missingCount = 0;

profileImages.forEach((image, index) => {
  const imagePath = path.join(__dirname, 'assets', 'images', image.name);
  
  if (fs.existsSync(imagePath)) {
    const stats = fs.statSync(imagePath);
    const fileSizeKB = Math.round(stats.size / 1024);
    console.log(`✅ ${index + 1}. ${image.user}: ${image.name} (${fileSizeKB} KB)`);
    foundCount++;
  } else {
    console.log(`❌ ${index + 1}. ${image.user}: ${image.name} - BULUNAMADI`);
    missingCount++;
  }
});

console.log(`\n📊 Özet:`);
console.log(`✅ Bulunan: ${foundCount} dosya`);
console.log(`❌ Eksik: ${missingCount} dosya`);

if (foundCount === profileImages.length) {
  console.log('\n🎉 Tüm profil resimleri hazır!');
  console.log('\n📋 Sonraki adımlar:');
  console.log('1. Backend\'e manuel yükleme yap');
  console.log('2. Test kullanıcılarını güncelle');
  console.log('3. Uygulamada test et');
} else {
  console.log('\n⚠️ Eksik dosyalar var! Lütfen tüm resimleri assets/images/ klasörüne ekle.');
}
