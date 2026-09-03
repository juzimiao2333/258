import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  // 将缓存目录改到 .vite-cache（避免写入 node_modules 触发沙盒限制）
  cacheDir: path.resolve(__dirname, '.vite-cache'),
  optimizeDeps: {
    // 禁用强制预构建，减少写入操作
    force: false,
  },
})