// Script sederhana untuk memvalidasi file JSON info update
const fs = require('fs');
const path = require('path');

// Ganti dengan path ke file JSON Anda
const jsonFilePath = path.join(__dirname, 'data', 'updates.json');

try {
  const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
  const parsedData = JSON.parse(jsonData);
  console.log('✅ JSON valid!');
  console.log('Struktur data:');
  console.log(JSON.stringify(parsedData, null, 2));
} catch (error) {
  console.error('❌ Error validasi JSON:', error.message);
}