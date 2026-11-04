const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const classRegex = /class=["'](.*?)["']/g;
let cm;
const classes = new Set();
while ((cm = classRegex.exec(html)) !== null) {
  cm[1].split(/\s+/).forEach(c => {
    if (c) classes.add(c);
  });
}

const list = Array.from(classes).sort();
console.log('Total classes:', list.length);
fs.writeFileSync('classes.json', JSON.stringify(list, null, 2));
console.log('Saved to classes.json');
