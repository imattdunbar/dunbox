import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/**/*.ts', 'src/**/*.tsx'],
  platform: 'browser',
  copy: 'src/styles.css',
  exports: {
    customExports: {
      './styles.css': './dist/styles.css'
    }
  }
})
