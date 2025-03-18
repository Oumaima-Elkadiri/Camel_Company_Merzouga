import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Dossier de sortie pour la production
  },
  assetsInclude: ['**/*.JPG', '**/*.PNG', '**/*.jpg', '**/*.png']

})
