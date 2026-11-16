import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
    { ignores: ["node_modules/"] },
    js.configs.recommended,
    prettier,
    {
        files: ["js/**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.browser,
        },
        // After `prettier`, which turns `curly` off. "all" is safe to use with Prettier.
        rules: {
            curly: ["error", "all"],
            eqeqeq: "error",
            "no-var": "error",
            "prefer-const": "error",
        },
    },
    {
        files: ["eslint.config.js"],
        languageOptions: { globals: globals.node },
    },
];
