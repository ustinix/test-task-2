import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '',
  root: '.',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    target: 'es2020',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
      assetFileNames: assetInfo => {
        // Используем assetInfo.names вместо assetInfo.name
        const fileName = Array.isArray(assetInfo.names) && assetInfo.names.length > 0
          ? assetInfo.names[0]
          : '';

        if (fileName.endsWith('.css')) {
          return 'css/style.[hash].css';
        }

        const ext = fileName.split('.').pop()?.toLowerCase() || '';

        const fontExts = ['woff2', 'woff', 'otf', 'ttf', 'eot'];
        if (fontExts.includes(ext)) {
          return 'fonts/[name].[hash].[ext]';
        }

        return 'assets/[name].[hash].[ext]';
      },

      entryFileNames: 'js/bundle.[hash].js',
      chunkFileNames: 'js/[name].[hash].js',

      manualChunks: undefined,
    },
    },
  },

  css: {
    postcss: './postcss.config.js',
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        quietDeps: true,
      },
    },
  },

  server: {
    port: 3000,
    open: true,
    host: true,
  },

  plugins: [],

  optimizeDeps: {
    include: [],
  },
});
