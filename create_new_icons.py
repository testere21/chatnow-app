from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    # Create blue background
    img = Image.new('RGBA', (size, size), (59, 130, 246, 255))  # #3B82F6
    draw = ImageDraw.Draw(img)
    
    # Try to use a system font, fallback to default
    try:
        font_size = int(size * 0.4)  # 40% of icon size
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        try:
            font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", font_size)
        except:
            font = ImageFont.load_default()
    
    # Draw white "CN" text
    text = "CN"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size - text_width) // 2
    y = (size - text_height) // 2
    
    draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)  # White text
    
    # Save the image
    img.save(filename, 'PNG')
    print(f"Created {filename} ({size}x{size})")

# Create main icon
create_icon(512, "assets/images/icon.png")

# Create splash icon
create_icon(512, "assets/images/splash-icon.png")

print("✅ New icons created successfully!")
