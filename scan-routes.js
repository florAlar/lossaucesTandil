const fs = require('fs');
const path = require('path');

const projectPath = 'C:\\Users\\zeroCore\\Desktop\\proyectos\\cabañas';
const htmlFiles = ['index.html', 'cabanas.html', 'servicios.html', 'contacto.html'];

console.log('🔍 Escaneando rutas de imágenes en todos los archivos HTML...\n');

const problematicPatterns = [
  { pattern: /\/assets\//g, name: 'Rutas absolutas (/assets/)' },
  { pattern: /\\assets\\/g, name: 'Backslashes en rutas' },
  { pattern: /src="assets\s+/g, name: 'Espacios en blanco en rutas' }
];

htmlFiles.forEach(file => {
  const filePath = path.join(projectPath, file);
  
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    let foundIssues = false;
    
    console.log(`📄 ${file}:`);
    
    problematicPatterns.forEach(({ pattern, name }) => {
      const matches = content.match(pattern);
      if (matches) {
        console.log(`  ⚠️  ${name}: ${matches.length} coincidencias`);
        foundIssues = true;
      }
    });
    
    // Buscar todas las rutas de assets
    const imageRoutes = content.match(/src="assets\/[^"]+"|href="assets\/[^"]+"/g);
    if (imageRoutes) {
      console.log(`  ✅ Rutas relativas correctas encontradas: ${imageRoutes.length}`);
    }
    
    if (!foundIssues) {
      console.log(`  ✅ Sin problemas detectados\n`);
    } else {
      console.log('');
    }
  }
});

console.log('✨ Escaneo completado');
