// Script de verificación de configuración para VitaMia
// Ejecutar con: node check-setup.js

require('dotenv').config();

console.log('🔍 Verificando configuración de VitaMia...\n');

let allGood = true;

// Verificar variables de entorno
const requiredEnvVars = {
  'DATABASE_URL': 'Conexión a base de datos',
  'JWT_SECRET': 'Clave secreta para JWT',
  'GEMINI_API_KEY': 'API Key de Google Gemini',
  'PORT': 'Puerto del servidor'
};

console.log('📋 Verificando variables de entorno:\n');

Object.entries(requiredEnvVars).forEach(([key, description]) => {
  const value = process.env[key];
  
  if (!value || value.includes('TU_') || value.includes('tu-') || value.includes('aqui')) {
    console.log(`❌ ${key} - ${description}`);
    console.log(`   → No configurada o tiene valor de placeholder`);
    allGood = false;
  } else {
    // Mostrar solo parte del valor por seguridad
    const preview = value.length > 20 ? value.substring(0, 20) + '...' : value;
    console.log(`✅ ${key} - ${description}`);
    console.log(`   → Configurada: ${preview}`);
  }
  console.log('');
});

// Verificar dependencias
console.log('📦 Verificando dependencias...\n');

try {
  require('express');
  console.log('✅ Express instalado');
} catch (e) {
  console.log('❌ Express NO instalado - ejecuta: npm install');
  allGood = false;
}

try {
  require('@google/generative-ai');
  console.log('✅ Google Generative AI instalado');
} catch (e) {
  console.log('❌ Google Generative AI NO instalado - ejecuta: npm install');
  allGood = false;
}

try {
  require('dotenv');
  console.log('✅ dotenv instalado');
} catch (e) {
  console.log('❌ dotenv NO instalado - ejecuta: npm install');
  allGood = false;
}

try {
  require('jsonwebtoken');
  console.log('✅ jsonwebtoken instalado');
} catch (e) {
  console.log('❌ jsonwebtoken NO instalado - ejecuta: npm install');
  allGood = false;
}

console.log('');

// Resultado final
if (allGood) {
  console.log('🎉 ¡TODO LISTO! Configuración correcta.');
  console.log('\n▶️  Puedes iniciar el servidor con:');
  console.log('   node index.js\n');
} else {
  console.log('⚠️  HAY PROBLEMAS DE CONFIGURACIÓN');
  console.log('\n📖 Consulta la guía de configuración:');
  console.log('   📄 SETUP.md - Guía paso a paso');
  console.log('   📄 docs/GEMINI_API_SETUP.md - Obtener API key de Gemini\n');
  process.exit(1);
}
