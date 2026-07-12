import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const RESUME_FILE = 'Resume.txt'

/**
 * The Resume lives at the repository root (per project requirements).
 * This plugin serves it at /Resume.txt during dev and copies it into
 * dist/ at build time so the deployed site can fetch it at runtime.
 */
function serveRootResume(): Plugin {
  return {
    name: 'serve-root-resume',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] === `/${RESUME_FILE}`) {
          const file = resolve(__dirname, RESUME_FILE)
          if (existsSync(file)) {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.end(readFileSync(file))
            return
          }
        }
        next()
      })
    },
    closeBundle() {
      const src = resolve(__dirname, RESUME_FILE)
      if (existsSync(src)) {
        copyFileSync(src, resolve(__dirname, 'dist', RESUME_FILE))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), serveRootResume()],
})
