import path from 'node:path'
import { defineConfig } from 'vite'

const ASSET_URL = process.env.ASSET_URL || ''

export default defineConfig({
  base: '/file_storage/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@mocks': path.resolve(__dirname, './src/mocks')
    }
  }
})
