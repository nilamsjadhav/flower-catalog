const fs = require('fs');

const loadText = (filePath) => fs.readFileSync(filePath, 'utf8');

const loadJSON = (filePath) => JSON.parse(loadText(filePath))

const storeJSON = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { loadJSON, storeJSON, loadText };

