import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  resolve: {
    alias: {
      "~": "/src",
    }
  },
  server: {
    port: 3000    
  },
  build: {
    rollupOptions: {
      output: {
        experimentalMinChunkSize: 200000,
        entryFileNames: `assets/fireduino.[hash].js`,
        chunkFileNames: `assets/fireduino.[hash].js`,
        assetFileNames: `assets/fireduino.[hash].[ext]`,
        compact: true
      }
    }
  }
})
