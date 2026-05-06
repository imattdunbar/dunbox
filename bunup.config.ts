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
  },
  {
  name: 'ui',
  root: 'packages/ui',
  config: {
    target: 'browser',
    entry: ['src/index.ts'],
    clean: true,
    dts: true,
    exports: true,
    external: ['react', 'react-dom', 'tailwindcss']
  }
}
])
