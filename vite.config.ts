import { defineConfig } from 'vite'

// Auto-detect base for project pages. If you’re deploying to a user/organization
// site repo named <username>.github.io, the base should be '/'.
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isUserSite = /^[\w-]+\.github\.io$/i.test(repo)

export default defineConfig({
  base: isUserSite ? '/' : `/${repo}/`,
})