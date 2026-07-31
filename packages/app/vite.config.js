import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit()],
  // Environment lives at the repository root, not in this package, so one .env
  // serves the app, the functions and the Supabase CLI rather than three copies
  // drifting apart.
  envDir: '../..',
  server: { port: 5173 }
})
