import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    name: 'core',
    cwd: 'packages/core',
    entry: 'src/index.ts',
    dts: true,
    exports: true
  },
  {
    name: 'ui',
    cwd: 'packages/ui',
    entry: ['src/**/*.ts', 'src/**/*.tsx'],
    platform: 'browser',
    dts: true,
    copy: 'src/styles.css',
    exports: { customExports: { './styles.css': './dist/styles.css' } }
  }
])
