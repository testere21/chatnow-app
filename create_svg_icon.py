import os

def create_svg_icon(size, filename):
    svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{size}" height="{size}" viewBox="0 0 {size} {size}" xmlns="http://www.w3.org/2000/svg">
    <!-- Beyaz arka plan -->
    <rect width="{size}" height="{size}" fill="#FFFFFF"/>
    
    <!-- Ana container (beyaz yuvarlak köşeli kare) -->
    <rect x="{int(size * 0.1)}" y="{int(size * 0.1)}" width="{int(size * 0.8)}" height="{int(size * 0.8)}" 
          rx="{int(size * 0.05)}" ry="{int(size * 0.05)}" fill="#FFFFFF" stroke="none"/>
    
    <!-- İç kare (mor) -->
    <rect x="{int(size * 0.22)}" y="{int(size * 0.22)}" width="{int(size * 0.56)}" height="{int(size * 0.56)}" 
          rx="{int(size * 0.04)}" ry="{int(size * 0.04)}" fill="#8B5CF6"/>
    
    <!-- Chat bubble -->
    <rect x="{int(size * 0.35)}" y="{int(size * 0.35)}" width="{int(size * 0.22)}" height="{int(size * 0.17)}" 
          rx="{int(size * 0.02)}" ry="{int(size * 0.02)}" fill="#FFFFFF"/>
    
    <!-- Chat bubble kuyruğu -->
    <polygon points="{int(size * 0.42)},{int(size * 0.52)} {int(size * 0.39)},{int(size * 0.55)} {int(size * 0.45)},{int(size * 0.55)}" 
             fill="#FFFFFF"/>
    
    <!-- Chat dots -->
    <circle cx="{int(size * 0.39)}" cy="{int(size * 0.43)}" r="{int(size * 0.008)}" fill="#8B5CF6"/>
    <circle cx="{int(size * 0.405)}" cy="{int(size * 0.43)}" r="{int(size * 0.008)}" fill="#8B5CF6"/>
    <circle cx="{int(size * 0.42)}" cy="{int(size * 0.43)}" r="{int(size * 0.008)}" fill="#8B5CF6"/>
</svg>'''
    
    # SVG dosyasını kaydet
    svg_filename = filename.replace('.png', '.svg')
    with open(f'assets/images/{svg_filename}', 'w', encoding='utf-8') as f:
        f.write(svg_content)
    
    print(f'{svg_filename} oluşturuldu ({size}x{size})')

# Icon boyutları
sizes = {
    'icon.png': 512,
    'android-icon-foreground.png': 192,
    'android-icon-background.png': 512,
    'splash-icon.png': 512
}

# Tüm icon'ları oluştur
for filename, size in sizes.items():
    create_svg_icon(size, filename)

print('Tüm SVG icon\'lar oluşturuldu!')
