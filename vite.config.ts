import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ command }) => {
  // In GitHub Actions this env is "owner/repo"
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''

  // user/organization site repos look like "<username>.github.io"
  const isUserSite = /^[\w-]+\.github\.io$/i.test(repo)

  // For GitHub Pages build: '/' for user sites, '/repo/' for project sites
  const pagesBase = isUserSite ? '/' : (repo ? `/${repo}/` : '/')

  return {
    // Always use '/' in dev to avoid malformed URLs.
    // Use the Pages base only for build output.
    base: command === 'serve' ? '/' : pagesBase,
    // Add multi-page inputs so Vite includes transition.html in the build output
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          transition: resolve(__dirname, 'src/transition.html'),
          combat: resolve(__dirname, 'src/combat.html'),
        },
      },
    },
  }  
  
})