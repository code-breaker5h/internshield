const fs = require('fs');
const src = 'c:\\Users\\Naman\\OneDrive\\Desktop\\InterShield\\internslogo.jpeg';
const dst = 'c:\\Users\\Naman\\OneDrive\\Desktop\\InterShield\\public\\logo.jpeg';
fs.copyFileSync(src, dst);
console.log('Copied successfully. File size:', fs.statSync(dst).size, 'bytes');
