module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    project: ["tsconfig.json"],
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    createDefaultProgram: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: [
    "src/types/v3",
    "src/abis/types",
    "src/locales/**/*.js",
    "src/state/data/generated.ts",
    "node_modules",
    "coverage",
    "build",
    "dist",
    ".DS_Store",
    ".env.local",
    ".env.development.local",
    ".env.test.local",
    ".env.production.local",
    ".idea/",
    ".vscode/",
    "package-lock.json",
    "yarn.lock",
  ],
  extends: [
    "react-app",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:react/jsx-runtime",
  ],
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "prettier/prettier": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/react-in-jsx-scope": "off",
    "object-shorthand": ["error", "always"],
    semi: 0,
    "@typescript-eslint/no-var-requires": 0,
    "react/display-name": 0,
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace|debug)$/]",
        message: "Unexpected property on console object was called",
      },
    ],
    "no-unused-vars": 0,
    "react/no-unused-state": 1,

    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/triple-slash-reference": 0,

    "prefer-const": 0,

    "@typescript-eslint/no-empty-function": 0,

    "import/no-unresolved": "off",
    "import/no-mutable-exports": "off",
    "import/prefer-default-export": "off",
    "import/no-dynamic-require": "off",
    "global-require": "off",
    "import/no-extraneous-dependencies": "off",

    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "react-hooks/exhaustive-deps": "off",

    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/media-has-caption": "off",

    "no-useless-catch": "off",
    "no-continue": "off",
    "no-nested-ternary": "off",
    "no-unused-expressions": "off",
    "consistent-return": "off",
    "react/no-danger": "off",
    "no-console": "off",
    "no-underscore-dangle": "off",
    "@typescript-eslint/no-namespace": "off",
    "import/order": [
      "warn",
      {
        pathGroups: [
          {
            pattern: "~/**",
            group: "external",
            position: "after",
          },
        ],
        "newlines-between": "always-and-inside-groups",
      },
    ],
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
  },
};
