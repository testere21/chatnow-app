const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/mytodoapp3', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User modeli
const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  age: Number,
  location: String,
  gender: String,
  avatar: String,
  bg_color: String,
  is_online: Boolean,
  last_active: Date,
  created_at: Date,
  diamonds: Number,
  about: String,
  hobbies: [String],
  avatar_image: String
});

const User = mongoose.model('User', UserSchema);

// Türkiye illeri
const turkishCities = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
  'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa',
  'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan',
  'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta',
  'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir',
  'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla',
  'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt',
  'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
  'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman',
  'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye',
  'Düzce'
];

// Rastgele yaş (18-65 arası)
function getRandomAge() {
  return Math.floor(Math.random() * 48) + 18;
}

// Rastgele cinsiyet
function getRandomGender() {
  return Math.random() < 0.5 ? 'male' : 'female';
}

// Rastgele şehir
function getRandomCity() {
  return turkishCities[Math.floor(Math.random() * turkishCities.length)];
}

// Rastgele avatar emoji
function getRandomAvatar(gender) {
  const maleAvatars = ['👨', '👨‍💼', '👨‍🎓', '👨‍💻', '👨‍🔬', '👨‍🎨', '👨‍🚀', '👨‍✈️'];
  const femaleAvatars = ['👩', '👩‍💼', '👩‍🎓', '👩‍💻', '👩‍🔬', '👩‍🎨', '👩‍🚀', '👩‍✈️'];
  
  const avatars = gender === 'male' ? maleAvatars : femaleAvatars;
  return avatars[Math.floor(Math.random() * avatars.length)];
}

// Rastgele arka plan rengi
function getRandomBgColor(gender) {
  const maleColors = ['#3B82F6', '#1E40AF', '#1D4ED8', '#2563EB', '#1E3A8A'];
  const femaleColors = ['#FF6B95', '#FF8FAB', '#FFB3D1', '#FF5571', '#FF1493'];
  
  const colors = gender === 'male' ? maleColors : femaleColors;
  return colors[Math.floor(Math.random() * colors.length)];
}

// Rastgele hobi
function getRandomHobbies() {
  const hobbies = [
    'Müzik', 'Spor', 'Kitap', 'Film', 'Oyun', 'Seyahat', 'Fotoğraf', 'Resim',
    'Dans', 'Yemek', 'Bahçıvanlık', 'El sanatları', 'Koleksiyon', 'Yazılım', 'Tasarım'
  ];
  
  const numHobbies = Math.floor(Math.random() * 3) + 1; // 1-3 hobi
  const selectedHobbies = [];
  
  for (let i = 0; i < numHobbies; i++) {
    const hobby = hobbies[Math.floor(Math.random() * hobbies.length)];
    if (!selectedHobbies.includes(hobby)) {
      selectedHobbies.push(hobby);
    }
  }
  
  return selectedHobbies;
}

// Rastgele hakkında metni
function getRandomAbout() {
  const aboutTexts = [
    'Yeni insanlarla tanışmayı seviyorum',
    'Hayatın tadını çıkarmaya çalışıyorum',
    'Sosyal aktiviteleri seviyorum',
    'Yeni deneyimler yaşamayı seviyorum',
    'Arkadaş canlısı biriyim',
    'Eğlenceli vakit geçirmeyi seviyorum',
    'Sohbet etmeyi seviyorum',
    'Yeni hobiler keşfetmeyi seviyorum'
  ];
  
  return aboutTexts[Math.floor(Math.random() * aboutTexts.length)];
}

// Kullanıcıları oluştur
async function createUsers() {
  try {
    console.log('🚀 100 kullanıcı oluşturuluyor...');
    
    const users = [];
    
    for (let i = 1; i <= 100; i++) {
      const gender = getRandomGender();
      const password = `hesap${i}`;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = {
        name: `hesap${i}`,
        surname: `hesap${i}`,
        email: `hesap${i}@gmail.com`,
        password: hashedPassword,
        age: getRandomAge(),
        location: getRandomCity(),
        gender: gender,
        avatar: getRandomAvatar(gender),
        bg_color: getRandomBgColor(gender),
        is_online: false,
        last_active: new Date(),
        created_at: new Date(),
        diamonds: Math.floor(Math.random() * 1000),
        about: getRandomAbout(),
        hobbies: getRandomHobbies(),
        avatar_image: ''
      };
      
      users.push(user);
      
      if (i % 10 === 0) {
        console.log(`📝 ${i} kullanıcı hazırlandı...`);
      }
    }
    
    // Veritabanına kaydet
    await User.insertMany(users);
    
    console.log('✅ 100 kullanıcı başarıyla oluşturuldu!');
    console.log('📊 Örnek kullanıcılar:');
    
    // İlk 5 kullanıcıyı göster
    for (let i = 0; i < 5; i++) {
      const user = users[i];
      console.log(`${i + 1}. ${user.name} ${user.surname} - ${user.email} - ${user.location} - ${user.gender}`);
    }
    
  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Scripti çalıştır
createUsers();
