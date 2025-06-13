#!/usr/bin/env node

/**
 * Script para gerar tipos TypeScript a partir de schema OpenAPI
 * 
 * Uso:
 * node scripts/generate-api.js
 * 
 * Ou via npm:
 * npm run generate:api
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CONFIG_FILE = 'openapi-ts.config.ts';
const OUTPUT_DIR = './src/lib/api';

console.log('🔄 Gerando tipos TypeScript da API...');

try {
  // Verificar se o arquivo de configuração existe
  if (!fs.existsSync(CONFIG_FILE)) {
    console.log('⚠️  Arquivo de configuração não encontrado:', CONFIG_FILE);
    console.log('📝 Criando configuração padrão...');
    
    const defaultConfig = `
import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-axios',
  input: 'http://localhost:3001/api/openapi.json', // Sua URL da API
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/lib/api',
  },
  types: {
    enums: 'javascript',
  },
});
`;
    
    fs.writeFileSync(CONFIG_FILE, defaultConfig.trim());
    console.log('✅ Configuração criada em:', CONFIG_FILE);
    console.log('📝 Edite o arquivo para configurar sua API URL');
  }

  // Criar diretório de output se não existir
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log('📁 Diretório criado:', OUTPUT_DIR);
  }

  // Executar geração de tipos
  console.log('🚀 Executando @hey-api/openapi-ts...');
  execSync('npx @hey-api/openapi-ts', { stdio: 'inherit' });
  
  console.log('✅ Tipos TypeScript gerados com sucesso!');
  console.log('📂 Arquivos disponíveis em:', OUTPUT_DIR);
  
} catch (error) {
  console.error('❌ Erro ao gerar tipos da API:', error.message);
  
  if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
    console.log('\n💡 Dicas para resolver:');
    console.log('1. Verifique se a API está rodando');
    console.log('2. Confirme a URL no arquivo', CONFIG_FILE);
    console.log('3. Use um arquivo local se a API não estiver disponível');
  }
  
  process.exit(1);
}