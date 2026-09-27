import { mkdir, readFile, writeFile } from 'node:fs/promises';

const [html, css, script] = await Promise.all([
  readFile('index.html', 'utf8'),
  readFile('style.css', 'utf8'),
  readFile('app.js', 'utf8'),
]);
const standalone = html
  .replace(/\s*<link rel="stylesheet" href="style\.css"\s*\/>/, `<style>${css}</style>`)
  .replace(/\s*<script src="app\.js"><\/script>/, `<script>${script}</script>`)
  .replace('href="downloads/matchday-simulador.html"', 'href="#"')
  .replace('download="matchday-simulador.html"', 'onclick="window.print(); return false;"');
await mkdir('downloads', { recursive: true });
await writeFile('downloads/matchday-simulador.html', standalone);
console.log('Created downloads/matchday-simulador.html');
