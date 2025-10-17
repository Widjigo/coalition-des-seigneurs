import { defineConfig } from 'vite'

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
  }
})