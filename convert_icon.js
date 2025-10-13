const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// SVG'yi PNG'ye çevirmek için basit bir yaklaşım
// Canvas kullanarak CN harflerini çizelim

const canvas = createCanvas(1024, 1024);
const ctx = canvas.getContext('2d');

// Background gradient
const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
gradient.addColorStop(0, '#3B82F6');
gradient.addColorStop(1, '#1E40AF');

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 1024, 1024);

// Add subtle pattern
ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
for (let i = 0; i < 50; i++) {
    ctx.fillRect(Math.random() * 1024, Math.random() * 1024, 2, 2);
}

// CN Text with shadow
ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
ctx.font = 'bold 400px Arial, sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('CN', 512 + 4, 512 + 4);

// Main text
ctx.fillStyle = '#FFFFFF';
ctx.fillText('CN', 512, 512);

// Border
ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
ctx.lineWidth = 8;
ctx.strokeRect(20, 20, 984, 984);

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./assets/images/icon.png', buffer);

console.log('CN icon created successfully!');
