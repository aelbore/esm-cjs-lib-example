# esm-cjs-lib-example
Example code how to publish ESM and CJS backward compatible package

## Structure
* `./packages/my-lib-example` 
  - this is the hybrid backward compatibility, with conditional exports
  - `yarn build.lib` to create package for hybrid package
    - output structure
      ```
       my-lib-example/
        cjs/
          my-lib.js
          package.json
        my-lib.d.ts
        my-lib.js
        package.json
      ```
    - `my-lib-example/cjs/package.json`
      ```json
      {
        "type": "commonjs"
      }
      ```
    - `my-lib-example/package.json`
      - `main` entry point for commonjs, this property will be overriden can be by `exports`
      - notice the `exports` property has `require` for commonjs entry point
       `import` for es module entry point
      - `module` is for bundler, if `module` is not present bundler gets `main` entry point
      - `type` property indicates that all `.js` file treat as `es` module 
        ```json
        {
          "name": "my-package-example",
          "version": "0.0.1",
          "type": "module",
          "main": "./cjs/my-lib.js",
          "module": "./my-lib.js",
          "exports": {
            "require": "./cjs/my-lib.js",
            "import": "./my-lib.js"
          },
          "typings": "./my-lib.d.ts"
        }
        ```