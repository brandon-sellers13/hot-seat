import { defineConfig } from 'vitest/config'

// The grading gate only. Costs money and needs the network, so it is deliberately
// separate from the suite that runs on every commit.
//
//   set -a && . ./.env && set +a && npm run gate
export default defineConfig({
  test: {
    include: ['**/grading-gate.test.js'],
    exclude: ['**/node_modules/**'],
    testTimeout: 120_000
  }
})
