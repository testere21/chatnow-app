// Profil resimlerini backend'e yükleme scripti
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');

const BACKEND_URL = 'https://chatnow-app.onrender.com';
const UPLOAD_ENDPOINT = '/api/upload';

// Profil resimleri
const profileImages = [
  { name: 'profile-ahmet.jpg', user: 'Ahmet Yılmaz' },
  { name: 'profile-ayse.jpg', user: 'Ayşe Demir' },
  { name: 'profile-mehmet.jpg', user: 'Mehmet Kaya' },
  { name: 'profile-fatma.jpg', user: 'Fatma Özkan' },
  { name: 'profile-ali.jpg', user: 'Ali Çelik' },
  { name: 'profile-zeynep.jpg', user: 'Zeynep Arslan' }
];

async function uploadProfileImages() {
  console.log('📸 Profil resimleri yükleniyor...\n');
  
  for (const image of profileImages) {
    try {
      const imagePath = path.join(__dirname, 'assets', 'images', image.name);
      
      // Dosya var mı kontrol et
      if (!fs.existsSync(imagePath)) {
        console.log(`❌ ${image.name} bulunamadı: ${imagePath}`);
        continue;
      }
      
      // FormData oluştur
      const formData = new FormData();
      formData.append('image', fs.createReadStream(imagePath));
      
      // Backend'e yükle
      const response = await axios.post(`${BACKEND_URL}${UPLOAD_ENDPOINT}`, formData, {
        headers: {
          ...formData.getHeaders(),
        },
        timeout: 30000
      });
      
      if (response.data && response.data.filename) {
        console.log(`✅ ${image.user}: ${response.data.filename}`);
      } else {
        console.log(`⚠️ ${image.user}: Yükleme tamamlandı ama dosya adı alınamadı`);
      }
      
    } catch (error) {
      console.log(`❌ ${image.user}: ${error.message}`);
    }
  }
  
  console.log('\n🎉 Profil resim yükleme işlemi tamamlandı!');
}

// Scripti çalıştır
uploadProfileImages();
