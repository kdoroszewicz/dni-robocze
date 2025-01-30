/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        include: [
            "**/*.{test,spec}.{ts,tsx,js,jsx}",
            "**/__tests__/**/*.{ts,tsx,js,jsx}",
        ],
        globals: true,
        setupFiles: ["./vitest.setup.ts"],
        testTimeout: 10000,
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
});
