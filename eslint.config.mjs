import js from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    /* 除外するファイル/ディレクトリを指定 */
    globalIgnores([
        "node_modules/**",
        "build/**",
        "dist/**",
    ]),

    /* TypeScript + React 総合設定（create-vite モダン標準 + @eslint-react） */
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            eslintReact.configs["recommended-typescript"],
            eslintReact.configs["disable-conflict-eslint-plugin-react-hooks"],
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.browser,
        },
        rules: {
            /* Vite Fast Refresh ルール（create-vite 標準の warn に設定） */
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],

            /* React Hooks ルール（既存の eslint-disable コメント保護のため react-hooks 側を正とする） */
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "@eslint-react/rules-of-hooks": "off",
            "@eslint-react/exhaustive-deps": "off",

            /* 既存コードパターンに対する @eslint-react ルールの調整 */
            "@eslint-react/no-use-context": "off",
            "@eslint-react/no-array-index-key": "off",
            "@eslint-react/use-state": "off",
            "@eslint-react/purity": "off",

            /* TypeScript ルール */
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-unused-vars": ["warn", {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
            }],

            /* 一般的なコード品質ルール */
            "no-console": ["warn", {
                allow: ["warn", "error"],
            }],
            "prefer-const": "warn",
        },
    },
]);
