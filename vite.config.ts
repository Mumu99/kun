import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import fs from 'fs'
// 引入path
import path from 'path'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br'
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[name]'
    }),
    {
      name: 'print-size',
      closeBundle() {
        const dir = path.resolve(__dirname, 'dist')

        // 读取 dist 目录
        fs.readdir(dir, (err, files) => {
          if (err) {
            console.error(err)
            return
          }

          let totalSize = 0

          files.forEach(file => {
            const filePath = path.join(dir, file)
            const stats = fs.statSync(filePath)
            totalSize += stats.size
            console.log(`${file}: ${(stats.size / 1024).toFixed(2)} KB`)
          })

          console.log(`总文件大小: ${(totalSize / 1024).toFixed(2)} KB`)
        })
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '127.0.0.1',
    port: 8899,
    open: true,
    proxy: {
      '/api': {
        target: 'http://syt.atguigu.cn',
        changeOrigin: true
      }
    }
  }
})
