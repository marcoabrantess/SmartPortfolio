import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import airbnbBase from "eslint-config-airbnb-base";
import airbnbTypescript from "eslint-config-airbnb-typescript";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      'eslint-plugin-react': pluginReact,
    },
    rules: {
      // Configurações gerais de regras podem ser adicionadas aqui
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      'react': pluginReact,
    },
    settings: {
      react: {
        version: 'detect', // Ou defina a versão exata, por exemplo, '18.0'
      },
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      ...airbnbBase.rules,
      ...airbnbTypescript.rules,
    },
  },
];
