from PIL import Image, ImageDraw
import os

def create_chatnow_icon(size, filename):
    # Yeni canvas oluştur
    img = Image.new('RGBA', (size, size), (255, 255, 255, 255))
    draw = ImageDraw.Draw(img)
    
    # Ana container (beyaz yuvarlak köşeli kare)
    container_size = int(size * 0.8)
    container_x = (size - container_size) // 2
    container_y = (size - container_size) // 2
    border_radius = int(size * 0.05)
    
    # Beyaz container
    draw.rounded_rectangle(
        [container_x, container_y, container_x + container_size, container_y + container_size],
        radius=border_radius,
        fill=(255, 255, 255, 255)
    )
    
    # İç kare (mor)
    inner_size = int(container_size * 0.7)
    inner_x = container_x + (container_size - inner_size) // 2
    inner_y = container_y + (container_size - inner_size) // 2
    inner_radius = int(size * 0.04)
    
    draw.rounded_rectangle(
        [inner_x, inner_y, inner_x + inner_size, inner_y + inner_size],
        radius=inner_radius,
        fill=(139, 92, 246, 255)  # #8B5CF6
    )
    
    # Chat bubble
    bubble_width = int(inner_size * 0.4)
    bubble_height = int(inner_size * 0.3)
    bubble_x = inner_x + (inner_size - bubble_width) // 2
    bubble_y = inner_y + (inner_size - bubble_height) // 2
    bubble_radius = int(size * 0.02)
    
    draw.rounded_rectangle(
        [bubble_x, bubble_y, bubble_x + bubble_width, bubble_y + bubble_height],
        radius=bubble_radius,
        fill=(255, 255, 255, 255)
    )
    
    # Chat bubble kuyruğu
    tail_size = int(size * 0.015)
    tail_x = bubble_x + int(bubble_width * 0.3)
    tail_y = bubble_y + bubble_height
    
    # Kuyruk üçgeni
    draw.polygon([
        (tail_x, tail_y),
        (tail_x - tail_size, tail_y + tail_size),
        (tail_x + tail_size, tail_y + tail_size)
    ], fill=(255, 255, 255, 255))
    
    # Chat dots
    dot_size = int(size * 0.008)
    dot_spacing = int(size * 0.015)
    dots_y = bubble_y + bubble_height // 2
    dots_start_x = bubble_x + int(bubble_width * 0.3)
    
    for i in range(3):
        dot_x = dots_start_x + i * dot_spacing
        draw.ellipse(
            [dot_x - dot_size, dots_y - dot_size, dot_x + dot_size, dots_y + dot_size],
            fill=(139, 92, 246, 255)  # #8B5CF6
        )
    
    # Dosyayı kaydet
    img.save(f'assets/images/{filename}', 'PNG')
    print(f'{filename} oluşturuldu ({size}x{size})')

# Icon boyutları
sizes = {
    'icon.png': 512,
    'android-icon-foreground.png': 192,
    'android-icon-background.png': 512,
    'splash-icon.png': 512
}

# Tüm icon'ları oluştur
for filename, size in sizes.items():
    create_chatnow_icon(size, filename)

print('Tüm icon\'lar başarıyla güncellendi!')
