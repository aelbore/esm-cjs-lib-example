import dts from 'rollup-plugin-dts'
import { esBuildPlugin, copy, mkdir, symlinkDir } from 'aria-build'

function symlinkLib() {
  return {
    name: 'link',
    buildEnd: async () => {
      await mkdir('dist/my-lib-cjs', { recursive: true })
      await symlinkDir('./dist/my-lib-cjs', './node_modules/my-lib-cjs')
    }
  }
}

export default [
  {
    input: './packages/my-lib-cjs/src/index.ts',
    plugins: [ 
      esBuildPlugin(),
      copy({
        targets: [
          { src: './packages/my-lib-cjs/*.json', dest: 'dist/my-lib-cjs' }
        ]
      }),
      symlinkLib()
    ],
    output: {
      format: 'cjs',
      file: './dist/my-lib-cjs/my-lib-cjs.js'
    }
  },
  {
    input: './packages/my-lib-cjs/src/index.ts',
    plugins: [ dts() ],
    output: {
      file: './dist/my-lib-cjs/my-lib-cjs.d.ts'
    }
  }
]