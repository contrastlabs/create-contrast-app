const { resolve } = require('node:path')
const { defineConfig } = require('vitest/config')

module.exports = defineConfig({
  test: {
    include: [
      './**/*.use-case.{test,spec}.ts',
      './**/*.entity.{test,spec}.ts',
      './**/*.repository.{test,spec}.ts',
      './**/*.util.{test,spec}.ts',
      './**/*.base.{test,spec}.ts',
    ],
    coverage: {
      reporter: ['html'],
      reportsDirectory: './coverage',
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'package.json': resolve(__dirname, './package.json'),
    },
  },
})
