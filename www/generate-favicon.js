const fs = require('fs');
const { createCanvas } = require('canvas');

// Create apple-touch-icon.png (180x180)
function createAppleTouchIcon() {
    const canvas = createCanvas(180, 180);
    const ctx = canvas.getContext('2d');

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 180, 180);
    gradient.addColorStop(0, '#2563eb');
    gradient.addColorStop(1, '#1d4ed8');

    // Draw rounded rectangle background
    ctx.fillStyle = gradient;
    roundRect(ctx, 0, 0, 180, 180, 28);
    ctx.fill();

    // Draw IP text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 60px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('IP', 90, 90);

    // Save the image
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('www/assets/images/apple-touch-icon.png', buffer);
    console.log('Created apple-touch-icon.png');
}

// Create android-chrome-192x192.png
function createAndroidChrome192() {
    const canvas = createCanvas(192, 192);
    const ctx = canvas.getContext('2d');

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 192, 192);
    gradient.addColorStop(0, '#2563eb');
    gradient.addColorStop(1, '#1d4ed8');

    // Draw rounded rectangle background
    ctx.fillStyle = gradient;
    roundRect(ctx, 0, 0, 192, 192, 30);
    ctx.fill();

    // Draw IP text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('IP', 96, 96);

    // Save the image
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('www/assets/images/android-chrome-192x192.png', buffer);
    console.log('Created android-chrome-192x192.png');
}

// Create android-chrome-512x512.png
function createAndroidChrome512() {
    const canvas = createCanvas(512, 512);
    const ctx = canvas.getContext('2d');

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, '#2563eb');
    gradient.addColorStop(1, '#1d4ed8');

    // Draw rounded rectangle background
    ctx.fillStyle = gradient;
    roundRect(ctx, 0, 0, 512, 512, 80);
    ctx.fill();

    // Draw grid pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            roundRect(ctx, 96 + x * 48, 96 + y * 48, 32, 32, 4);
            ctx.fill();
        }
    }

    // Draw lock body
    ctx.fillStyle = '#ffffff';
    roundRect(ctx, 288, 192, 128, 160, 16);
    ctx.fill();

    // Draw lock shackle
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 24;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(320, 192);
    ctx.lineTo(320, 144);
    ctx.arc(352, 144, 32, Math.PI, 0, false);
    ctx.lineTo(384, 192);
    ctx.stroke();

    // Draw lock keyhole
    ctx.fillStyle = gradient;
    roundRect(ctx, 312, 232, 80, 80, 8);
    ctx.fill();

    // Draw IP text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 120px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('IP', 112, 352);

    // Save the image
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('www/assets/images/android-chrome-512x512.png', buffer);
    console.log('Created android-chrome-512x512.png');
}

// Helper function to draw rounded rectangles
function roundRect(ctx, x, y, width, height, radius) {
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

// Generate all icons
createAppleTouchIcon();
createAndroidChrome192();
createAndroidChrome512();

console.log('Favicon generation complete!');