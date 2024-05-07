import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron/simple'
import multiple from 'vite-plugin-multiple'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  fs.rmSync(path.join(__dirname, 'dist-electron'), { recursive: true, force: true })

  return {
    plugins: [
      react(),
      electron({
        main: {
          entry: 'electron/main.ts',
        },
        preload: {
          input: path.join(__dirname, 'electron/preload.ts'),
        },
      }),
      multiple([
        {
          name: 'fake',
          config: 'vite.button.config.ts',
        },
        {
          name: 'button',
          config: 'vite.button.config.ts',
        },
      ]),
    ],
    build: {
      rollupOptions: {
        input: path.join(__dirname, 'html/index.html'),
      },
    },
  }
})
