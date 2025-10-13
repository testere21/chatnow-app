// Test kullanıcıları oluşturma scripti
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB bağlantısı
const MONGODB_URI = 'mongodb+srv://ferhatkortak:ferhat123@cluster0.8qjqj.mongodb.net/chatnow?retryWrites=true&w=majority';

// User model (backend/models/User.js'den)
const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  avatar: String,
  avatarImage: String,
  bgColor: String,
  gender: String,
  isOnline: Boolean,
  lastActive: Date,
  diamonds: Number,
  createdAt: Date
});

const User = mongoose.model('User', userSchema);

// Test kullanıcıları
const testUsers = [
  {
    name: 'Ahmet',
    surname: 'Yılmaz',
    email: 'ahmet@test.com',
    password: '123456',
    avatar: '👨',
    avatarImage: '',
    bgColor: '#3B82F6',
    gender: 'male',
    isOnline: true,
    lastActive: new Date(),
    diamonds: 150,
    createdAt: new Date()
  },
  {
    name: 'Ayşe',
    surname: 'Demir',
    email: 'ayse@test.com',
    password: '123456',
    avatar: '👩',
    avatarImage: '',
    bgColor: '#FF6B95',
    gender: 'female',
    isOnline: true,
    lastActive: new Date(),
    diamonds: 200,
    createdAt: new Date()
  },
  {
    name: 'Mehmet',
    surname: 'Kaya',
    email: 'mehmet@test.com',
    password: '123456',
    avatar: '👨‍💼',
    avatarImage: '',
    bgColor: '#10B981',
    gender: 'male',
    isOnline: false,
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 saat önce
    diamonds: 75,
    createdAt: new Date()
  },
  {
    name: 'Fatma',
    surname: 'Özkan',
    email: 'fatma@test.com',
    password: '123456',
    avatar: '👩‍🎓',
    avatarImage: '',
    bgColor: '#F59E0B',
    gender: 'female',
    isOnline: true,
    lastActive: new Date(),
    diamonds: 300,
    createdAt: new Date()
  },
  {
    name: 'Ali',
    surname: 'Çelik',
    email: 'ali@test.com',
    password: '123456',
    avatar: '👨‍🔧',
    avatarImage: '',
    bgColor: '#8B5CF6',
    gender: 'male',
    isOnline: false,
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 gün önce
    diamonds: 50,
    createdAt: new Date()
  },
  {
    name: 'Zeynep',
    surname: 'Arslan',
    email: 'zeynep@test.com',
    password: '123456',
    avatar: '👩‍💻',
    avatarImage: '',
    bgColor: '#EF4444',
    gender: 'female',
    isOnline: true,
    lastActive: new Date(),
    diamonds: 400,
    createdAt: new Date()
  }
];

async function createTestUsers() {
  try {
    // MongoDB'ye bağlan
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı');

    // Mevcut test kullanıcılarını sil
    await User.deleteMany({ email: { $regex: /@test\.com$/ } });
    console.log('🗑️ Eski test kullanıcıları silindi');

    // Yeni test kullanıcılarını oluştur
    for (const userData of testUsers) {
      // Şifreyi hash'le
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      
      await user.save();
      console.log(`✅ Kullanıcı oluşturuldu: ${userData.name} ${userData.surname} (${userData.email})`);
    }

    console.log('\n🎉 Tüm test kullanıcıları başarıyla oluşturuldu!');
    console.log('\n📋 Test Kullanıcıları:');
    testUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} ${user.surname} - ${user.email} - ${user.diamonds} 💎`);
    });

  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    // Bağlantıyı kapat
    await mongoose.disconnect();
    console.log('\n🔌 MongoDB bağlantısı kapatıldı');
  }
}

// Scripti çalıştır
createTestUsers();
