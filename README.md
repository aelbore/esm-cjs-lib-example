# esm-cjs-lib-example
Example code how to publish ESM and CJS backward compatible package

Pre-requisite
-----
`ts-esm` loader for javascript es module and typescript
  ```
  npm install ts-esm --dev
  ```

## Structure
* `./packages/my-lib-example` 
  - this is the hybrid backward compatibility, with [conditional exports](https://nodejs.org/api/esm.html#esm_conditional_exports)
  - `yarn build.lib` to create package for hybrid package
    - output structure
      ```
       ./dist/my-lib-example/
        cjs/
          my-lib.js
          package.json
        my-lib.d.ts
        my-lib.js
        package.json
      ```
    - `./dist/my-lib-example/cjs/package.json`
      - this will indicate that `.js` file is `commonjs` file
      - all the `.js` file with the same directory of `package.json` would treat as `commonjs`
      ```json
      {
        "type": "commonjs"
      }
      ```
    - `./dist/my-lib-example/package.json`
      - `main` entry point for commonjs, this property can be overriden by `exports`
      - `exports` property has `require` for commonjs entry point `import` for es module entry point
      - `module` is for bundler, if `module` is not present bundler gets `main` entry point
      - `type` property indicates that all `.js` file treat as `es` module 
        ```json
        {
          "name": "my-package-example",
          "version": "0.0.1",
          "type": "module",
          "main": "./my-lib.js",
          "module": "./my-lib.js",
          "exports": {
            "require": "./cjs/my-lib.js",
            "import": "./my-lib.js"
          },
          "typings": "./my-lib.d.ts"
        }
        ```