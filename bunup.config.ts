import { defineWorkspace } from 'bunup'

// https://bunup.dev/docs/guide/workspaces

export default defineWorkspace([
  {
    name: 'core',
    root: 'packages/core',
    config: {
      target: 'node',
      entry: ['src/index.ts'],
      clean: true,
      dts: true,
      exports: true
    }
  }
])
