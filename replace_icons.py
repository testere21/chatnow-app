from PIL import Image, ImageDraw, ImageFont
import os

def create_cn_icon(size, filename):
    # Mavi gradient arka plan
    img = Image.new('RGB', (size, size), '#3B82F6')
    draw = ImageDraw.Draw(img)
    
    # Gradient efekti için
    for y in range(size):
        for x in range(size):
            # Basit gradient
            ratio = (x + y) / (size * 2)
            r = int(59 + (30 * ratio))  # 59 to 89
            g = int(130 + (64 * ratio))  # 130 to 194
            b = int(246 - (46 * ratio))  # 246 to 200
            img.putpixel((x, y), (r, g, b))
    
    # CN yazısı
    try:
        # Font boyutunu hesapla
        font_size = int(size * 0.4)
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        # Arial yoksa default font kullan
        font_size = int(size * 0.4)
        font = ImageFont.load_default()
    
    # Gölge efekti
    draw.text((size//2 + 2, size//2 + 2), 'CN', font=font, fill='rgba(0,0,0,0.3)', anchor='mm')
    
    # Ana yazı
    draw.text((size//2, size//2), 'CN', font=font, fill='white', anchor='mm')
    
    # Kenarlık
    draw.rectangle([size//32, size//32, size - size//32, size - size//32], outline='rgba(255,255,255,0.2)', width=max(1, size//128))
    
    # Kaydet
    img.save(f'assets/images/{filename}')
    print(f'✅ {filename} oluşturuldu ({size}x{size})')

# Icon dosyalarını oluştur
create_cn_icon(1024, 'icon.png')
create_cn_icon(512, 'android-icon-foreground.png')
create_cn_icon(512, 'android-icon-background.png')
create_cn_icon(256, 'splash-icon.png')

print('\n🎉 Tüm CN iconları oluşturuldu!')
print('📱 Şimdi APK build edebilirsiniz.')
