import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import airbnbBase from "eslint-config-airbnb-base";
import airbnbTypescript from "eslint-config-airbnb-typescript";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}", "front-end/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      'react': pluginReact,
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname, // Certifique-se de que o caminho está correto
      },
    },
    settings: {
      react: {
        version: 'detect', // Ou defina a versão exata, por exemplo, '18.0'
      },
    },
    rules: {
      ...airbnbBase.rules,
      ...airbnbTypescript.rules,
      ...pluginReact.configs.flat.recommended.rules,
      ...tseslint.configs.recommended.rules,
    },
  },
];
