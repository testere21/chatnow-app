const fs = require('fs');
const path = require('path');

// Basit bir PNG oluşturucu (Canvas olmadan)
function createSimplePNG(width, height, backgroundColor, textColor) {
    // Bu basit bir yaklaşım - gerçek PNG oluşturmak için canvas gerekli
    // Ama şimdilik mevcut icon'u kopyalayalım
    return null;
}

// Mevcut icon dosyalarını "CN" versiyonları ile değiştir
const iconFiles = [
    'icon.png',
    'android-icon-foreground.png', 
    'android-icon-background.png',
    'splash-icon.png'
];

console.log('CN Icon dosyaları oluşturuluyor...');

// Şimdilik mevcut icon'ları kopyalayalım
// Gerçek CN icon'ları HTML dosyasından oluşturulacak
iconFiles.forEach(file => {
    const sourcePath = path.join('assets', 'images', file);
    const backupPath = path.join('assets', 'images', file.replace('.png', '-old.png'));
    
    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, backupPath);
        console.log(`✅ ${file} yedeklendi`);
    }
});

console.log('\n📱 Şimdi create_simple_cn_icon.html dosyasını açın ve iconları indirin!');
console.log('📁 İndirilen dosyaları assets/images/ klasörüne kopyalayın');
console.log('🚀 Sonra eas build --platform android komutunu çalıştırın');
