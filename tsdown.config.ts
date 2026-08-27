import { defineConfig } from 'tsdown'

export default defineConfig({
  workspace: [
    // packages
    'packages/core',
    'packages/ui'
  ],
  entry: 'src/index.ts',
  dts: true,
  exports: true
})
