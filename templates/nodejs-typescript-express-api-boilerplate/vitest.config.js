const { defineConfig } = require("vitest/config");

module.exports = defineConfig({
  test: {
    include: [
      './**/*.use-case.ts',
      './**/*.entity.ts',
      './**/*.repository.ts',
      './**/*.util.ts',
      './**/*.base.ts',
    ],
    coverage: {
      reporter: ['html'],
      reportsDirectory: './coverage'
    },
  },
});