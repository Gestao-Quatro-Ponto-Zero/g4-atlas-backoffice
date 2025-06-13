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