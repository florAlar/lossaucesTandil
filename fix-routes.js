const fs = require('fs');
const path = require('path');

const projectPath = 'C:\\Users\\zeroCore\\Desktop\\proyectos\\cabañas';
const htmlFiles = ['index.html', 'cabanas.html', 'servicios.html', 'contacto.html'];

console.log('🔧 Iniciando corrección de rutas de imágenes...\n');

htmlFiles.forEach(file => {
  const filePath = path.join(projectPath, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // 1. Cambiar /assets/ a assets/ (rutas absolutas a relativas)
    content = content.replace(/src="\/assets\//g, 'src="assets/');
    content = content.replace(/href="\/assets\//g, 'href="assets/');
    
    // 2. Cambiar backslashes a forward slashes
    content = content.replace(/assets\\ctas\\/g, 'assets/ctas/');
    content = content.replace(/assets\\cabs\\/g, 'assets/cabs/');
    content = content.replace(/assets\\servicios\\/g, 'assets/servicios/');
    content = content.replace(/assets\\gal\\/g, 'assets/gal/');
    content = content.replace(/assets\\portadas\\/g, 'assets/portadas/');
    
    // 3. Corregir rutas incompletas (hay un error en index.html)
    content = content.replace(/assets\/servicios\/parrilla\/ ser para/g, 'assets/servicios/parrilla/__1326_podria ser para');
    
    // Escribir solo si hubo cambios
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('✅ Corregido: ' + file);
    } else {
      console.log('⏭️  Sin cambios: ' + file);
    }
  } else {
    console.log('❌ No encontrado: ' + file);
  }
});

console.log('\n✨ Proceso completado exitosamente');
