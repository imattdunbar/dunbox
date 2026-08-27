import { defineWorkspace } from 'bunup'
import { copy } from 'bunup/plugins'

// https://bunup.dev/docs/guide/workspaces

export default defineWorkspace(
  [
    // Defaults: src/index.ts entry, ESM, dts generation, node target
    {
      name: 'core',
      root: 'packages/core'
    },
    {
      name: 'ui',
      root: 'packages/ui',
      config: {
        target: 'browser',
        // sourceBase keeps dist/export keys flat (./core/button etc.)
        sourceBase: './src',
        // Raw Tailwind source must be byte-identical for consumer-side
        // compilation; bunup's CSS pipeline would rewrite Tailwind at-rules
        entry: ['src/**/*.ts', 'src/**/*.tsx'],
        dts: {
          inferTypes: true
        },
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          'react/jsx-dev-runtime',
          'tailwindcss'
        ],
        // Copied CSS isn't auto-detected by exports generation
        exports: {
          customExports: () => ({
            './styles.css': './dist/styles.css'
          })
        },
        plugins: [copy('src/styles.css')]
      }
    }
  ],
  {
    // Auto-generate and sync package.json exports on every build
    exports: true
  }
)
