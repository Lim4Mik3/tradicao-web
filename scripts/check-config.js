#!/usr/bin/env node

/**
 * Script para verificar a configuração da aplicação
 */

import { readFileSync } from 'fs';
import { join } from 'path';

console.log('🔍 Verificando configuração da aplicação...\n');

// Verifica package.json
try {
  const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'));
  console.log('✅ package.json encontrado');
  
  // Verifica dependências importantes
  const requiredDeps = ['@supabase/supabase-js', 'react', 'react-dom', 'react-router-dom'];
  const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]);
  
  if (missingDeps.length > 0) {
    console.log('❌ Dependências faltando:', missingDeps.join(', '));
  } else {
    console.log('✅ Todas as dependências principais estão instaladas');
  }
} catch (error) {
  console.log('❌ Erro ao ler package.json:', error.message);
}

// Verifica .env
try {
  const envExists = readFileSync(join(process.cwd(), '.env'), 'utf8');
  console.log('✅ Arquivo .env encontrado');
} catch (error) {
  console.log('⚠️ Arquivo .env não encontrado');
}

// Verifica variáveis de ambiente essenciais
const requiredEnvVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.log('❌ Variáveis de ambiente faltando:', missingEnvVars.join(', '));
  console.log('💡 Certifique-se de configurar essas variáveis no arquivo .env');
} else {
  console.log('✅ Todas as variáveis de ambiente estão configuradas');
}

// Verifica estrutura de arquivos
const essentialFiles = [
  'src/main.tsx',
  'src/infra/supabase.ts',
  'src/hooks/useAuth.tsx',
  'src/contexts/AuthContext.tsx',
  'src/routes/router.tsx'
];

console.log('\n📁 Verificando estrutura de arquivos:');
essentialFiles.forEach(file => {
  try {
    readFileSync(join(process.cwd(), file), 'utf8');
    console.log(`✅ ${file}`);
  } catch (error) {
    console.log(`❌ ${file} - não encontrado`);
  }
});

console.log('\n🏁 Verificação concluída!');
console.log('\n💡 Se você ainda está enfrentando problemas:');
console.log('1. Limpe o cache do navegador');
console.log('2. Execute: pnpm install');
console.log('3. Verifique se as variáveis de ambiente estão corretas');
console.log('4. Reinicie o servidor de desenvolvimento');
