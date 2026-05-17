const fs = require('fs');
const path = require('path');

const dirs = [
  r'c:\Users\Naman\OneDrive\Desktop\InterShield\lib',
  r'c:\Users\Naman\OneDrive\Desktop\InterShield\pages\api'
];

const results = [];

// Try fs.mkdirSync with recursive option
try {
  for (const dir of dirs) {
    fs.mkdirSync(dir, { recursive: true });
    if (fs.existsSync(dir)) {
      results.push(`✓ Node.js fs.mkdirSync - SUCCESS: ${dir}`);
    } else {
      results.push(`✗ Node.js fs.mkdirSync - FAILED: ${dir}`);
    }
  }
} catch (e) {
  results.push(`✗ Node.js fs.mkdirSync - ERROR: ${e.message}`);
}

console.log(results.join('\n'));
