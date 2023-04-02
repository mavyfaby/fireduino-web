import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("md-"),
        }
      }
    }),
    svgLoader()
  ],
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
