import { defineConfig } from 'vite';

export default defineConfig({
  root: './src', // Set the root directory to 'src'
  publicDir: '../assets', // Serve assets from the 'public' directory
  build: {
    outDir: '../dist', // Output directory for the build
    rollupOptions: {
      input: {
        index: './src/index.html', // Include index.html as an entry point
        editor: './src/editor.html', // Include editor.html as an entry point
      },
      output: {
        entryFileNames: '[name].js', // Ensure consistent naming
        assetFileNames: '[name].[ext]', // Keep asset names consistent
      },
    },
  },
});
