import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
    plugins: [
        react(),
        dts({
            tsconfigPath: "./tsconfig.json",
            rollupTypes: false,
            copyDtsFiles: true
        }),
        {
            name: "copy-theme-css",
            apply: "build",
            generateBundle() {
                this.emitFile({
                    type: "asset",
                    fileName: "theme.css",
                    source: readFileSync(resolve(import.meta.dirname, "src/styles/theme.css"), "utf-8")
                })
            }
        }
    ],
    resolve: {
        alias: {
            "@": resolve(import.meta.dirname, "./src")
        }
    },
    build: {
        lib: {
            entry: resolve(import.meta.dirname, "src/index.ts"),
            formats: ["es"],
            fileName: "index"
        },
        rollupOptions: {
            external: (id: string) => !id.startsWith(".") && !id.startsWith("/") && !id.startsWith("@/")
        },
        sourcemap: true,
        emptyOutDir: true
    }
})
