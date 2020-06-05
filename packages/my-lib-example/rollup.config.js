import dts from 'rollup-plugin-dts'

import { writeFile, mkdir } from 'fs/promises'
import { copy, esBuildPlugin } from 'aria-build'
import { symlinkDir } from 'aria-fs'

function createCommonJsPackage() {
  const pkg = { type: 'commonjs' }
  return {
    name: 'cjs-package',
    buildEnd: async () => {
      await mkdir('./dist/my-lib-example/cjs', { recursive: true })
      await writeFile('./dist/my-lib-example/cjs/package.json', JSON.stringify(pkg, null, 2))
    }
  }
}

function symlinkLib() {
  return {
    name: 'link',
    buildEnd: async () => {
      await mkdir('dist/my-lib-example', { recursive: true })
      await symlinkDir('./dist/my-lib-example', './node_modules/my-lib-example')
    }
  }
}

export default [
  {
    input: './packages/my-lib-example/src/my-lib.ts',
    plugins: [
      esBuildPlugin(),
      copy({
        targets: [
          { src: './packages/my-lib-example/*.json', dest: 'dist/my-lib-example' }
        ]
      }),
      createCommonJsPackage(),
      symlinkLib()
    ],
    output: [
      {
        file: './dist/my-lib-example/cjs/my-lib.js',
        format: 'cjs'
      },
      {
        file: './dist/my-lib-example/my-lib.js',
        format: 'es'
      }
    ]
  },
  {
    input: './packages/my-lib-example/src/my-lib.ts',
    plugins: [ dts() ],
    output: {
      file: './dist/my-lib-example/my-lib.d.ts'
    }
  }
]