import { defineConfig } from 'vitest/config'

// Vitest auto-detects npm workspaces and turns each one into a project, which
// silently drops root-level tests such as the data-contract suite in schemas/.
// A green run with most tests never executing is worse than a red one, so the
// single project is declared explicitly here.
export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'hot-seat',
          root: import.meta.dirname,
          include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
          exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/.svelte-kit/**',
            // The grading gate calls a paid API. It is the evidence behind the
            // choice of grader, not a check to run on every commit. Run it with
            // `npm run gate` before changing the model, effort or prompt.
            '**/grading-gate.test.js'
          ]
        }
      }
    ]
  }
})
