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
            '**/.svelte-kit/**'
          ]
        }
      }
    ]
  }
})
