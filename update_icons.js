const fs = require('fs');
const { createCanvas } = require('canvas');

// Canvas boyutları
const sizes = {
    'icon.png': 512,
    'android-icon-foreground.png': 192,
    'android-icon-background.png': 512,
    'splash-icon.png': 512
};

// roundRect polyfill
CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
    this.beginPath();
    this.moveTo(x + radius, y);
    this.lineTo(x + width - radius, y);
    this.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.lineTo(x + width, y + height - radius);
    this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.lineTo(x + radius, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.lineTo(x + radius, y + radius);
    this.quadraticCurveTo(x, y, x + radius, y);
    this.closePath();
};

function generateIcon(size, filename) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Beyaz arka plan
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);
    
    // Gölge efekti
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = size * 0.05;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = size * 0.02;
    
    // Ana container (beyaz yuvarlak köşeli kare)
    const containerSize = size * 0.8;
    const containerX = (size - containerSize) / 2;
    const containerY = (size - containerSize) / 2;
    const borderRadius = size * 0.05;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(containerX, containerY, containerSize, containerSize, borderRadius);
    ctx.fill();
    
    // Gölgeyi sıfırla
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // İç kare (mor)
    const innerSize = containerSize * 0.7;
    const innerX = containerX + (containerSize - innerSize) / 2;
    const innerY = containerY + (containerSize - innerSize) / 2;
    const innerRadius = size * 0.04;
    
    ctx.fillStyle = '#8B5CF6';
    ctx.beginPath();
    ctx.roundRect(innerX, innerY, innerSize, innerSize, innerRadius);
    ctx.fill();
    
    // Chat bubble
    const bubbleWidth = innerSize * 0.4;
    const bubbleHeight = innerSize * 0.3;
    const bubbleX = innerX + (innerSize - bubbleWidth) / 2;
    const bubbleY = innerY + (innerSize - bubbleHeight) / 2;
    const bubbleRadius = size * 0.02;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, bubbleRadius);
    ctx.fill();
    
    // Chat bubble kuyruğu
    const tailSize = size * 0.015;
    const tailX = bubbleX + bubbleWidth * 0.3;
    const tailY = bubbleY + bubbleHeight;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(tailX - tailSize, tailY + tailSize);
    ctx.lineTo(tailX + tailSize, tailY + tailSize);
    ctx.closePath();
    ctx.fill();
    
    // Chat dots
    const dotSize = size * 0.008;
    const dotSpacing = size * 0.015;
    const dotsY = bubbleY + bubbleHeight / 2;
    const dotsStartX = bubbleX + bubbleWidth * 0.3;
    
    ctx.fillStyle = '#8B5CF6';
    for (let i = 0; i < 3; i++) {
        const dotX = dotsStartX + i * dotSpacing;
        ctx.beginPath();
        ctx.arc(dotX, dotsY, dotSize, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    // Dosyayı kaydet
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`assets/images/${filename}`, buffer);
    console.log(`${filename} oluşturuldu (${size}x${size})`);
}

// Tüm icon'ları oluştur
Object.entries(sizes).forEach(([filename, size]) => {
    generateIcon(size, filename);
});

console.log('Tüm icon\'lar başarıyla güncellendi!');
