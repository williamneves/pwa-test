import { writeFileSync } from 'node:fs';
import { createCanvas } from 'canvas';

// Function to create a simple icon with text
function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, size, size);

  // Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${size/3}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('TODO', size/2, size/2);

  return canvas.toBuffer('image/png');
}

// Generate icons
// Generate icons
for (const size of [192, 512]) {
  const buffer = generateIcon(size);
  writeFileSync(`public/icon-${size}x${size}.png`, buffer);
  console.log(`Generated ${size}x${size} icon`);
}
