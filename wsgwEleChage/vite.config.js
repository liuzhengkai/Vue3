import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// const HOST = '"http://30.20.110.183:18000/"' // 测试
const HOST = '"https://csc-service-simu.sgcc.com.cn:28630/"' // 北京业务验证
// const HOST = '"https://csc-service.sgcc.com.cn:28630/"' // 北京生产

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    open: true,
    proxy: {
      '/api/': {
        target: JSON.parse(HOST),
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  //全局引入
  css: {
    cssPreprocessOptions: {
      scss: {
         additionalData: '@import "../wsgwEleChage/src/assets/style/globalVar.scss";' // 全局公共样式
      }
   }
  },
})
