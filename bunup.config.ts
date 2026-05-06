import { defineWorkspace } from 'bunup'
import { copy } from 'bunup/plugins'

// https://bunup.dev/docs/guide/workspaces

export default defineWorkspace([
  {
    name: 'core',
    root: 'packages/core',
    config: {
      sourceBase: "src",
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
    sourceBase: "src",
    target: 'browser',
    entry: [
      'src/core/*.tsx',
      'src/components/*.tsx',
      'src/hooks/*.ts',
      'src/lib/*.ts',
    ],
    clean: true,
    dts: false,
    external: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'tailwindcss'
    ],
    // Manually define exports with /* in package.json
    exports: false,
    // Copy styles.css into dist
    plugins: [
      copy('src/styles.css').to('styles.css')
    ]
  }
}
])
