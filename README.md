# knip-circulare-dep

A repository to reproduce knip bug

## installation

```shell
nvm use \
    && corepack enable \
    && pnpm install
```

## reproduce bug

```shell
pnpm knip
```

There is only 1 circular dependency. And knip is failing with 

```txt
Analyzing workspace ....
node:internal/modules/run_main:129
    triggerUncaughtException(
    ^

[Error: ENAMETOOLONG: name too long, scandir '/Users/admin/Projects/knip-circulare-dep/libs/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/.pnpm/@eslint-community+eslint-utils@4.4.0_eslint@8.57.0/node_modules/@eslint-community'] {
  errno: -63,
  code: 'ENAMETOOLONG',
  syscall: 'scandir',
  path: '/Users/admin/Projects/knip-circulare-dep/libs/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/eslint-config/node_modules/prettier-config/node_modules/.pnpm/@eslint-community+eslint-utils@4.4.0_eslint@8.57.0/node_modules/@eslint-community'
}
```

but with a mono-repository with a lot of package, knip is running for a while without exiting...

## workaround

steps : 

- change `ignore-workspace-cycles=true` by `disable-workspace-cycles=true` in .npmrc
- in `prettier-config` :
  - delete `"eslint-config": "workspace:*"` in package.json
  - change `extends: ['eslint-config'],` by `extends: ['../eslint-config/src/index.cjs'],` in `.eslintrc.cjs`
- in `eslint-config` :
  - delete `"prettier-config": "workspace:*"` in package.json
  - change `"prettier": "prettier-config",` by `"prettier": "../prettier-config/index.mjs",` in `package.json`
