import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hook': path.resolve(__dirname, './src/hook'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@service': path.resolve(__dirname, './src/service'),
      '@store': path.resolve(__dirname, './src/store'),
      '@types-global': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  plugins: [reactRefresh()],
})