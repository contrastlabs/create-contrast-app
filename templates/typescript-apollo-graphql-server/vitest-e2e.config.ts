import { defineConfig } from 'vitest/config'

import vitestConfig from './vitest.config'

export default defineConfig({
  test: {
    globals: true,
    sequence: {
      concurrent: false,
    },
    env: {
      NODE_ENV: 'test',
    },
    globalSetup: ['./src/tests/setup-global-e2e.ts'],
    include: ['./**/*.resolver.e2e-spec.ts'],
  },
  resolve: vitestConfig.resolve,
})
