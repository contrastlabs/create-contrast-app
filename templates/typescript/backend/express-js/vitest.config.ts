import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config.js'

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      reporter: ['html'],
      reportsDirectory: './coverage',
    },
    include: [
      './**/*.use-case.spec.ts',
      './**/*.mapper.spec.ts',
      './**/*.entity.spec.ts',
      './**/*.repository.spec.ts',
      './**/*.util.spec.ts',
      './**/*.base.spec.ts',
    ],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'package.json': resolve(__dirname, './package.json'),
    },
  },
})
