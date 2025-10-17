import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',         // or 'src' if your files are there
  build: { outDir: 'doc' }
})
