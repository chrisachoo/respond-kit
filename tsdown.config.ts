import { defineConfig } from "tsdown"

const isProd = process.env.NODE_ENV === "production"

export default defineConfig({
	entry: [
		"src/index.ts",
		"src/headers/index.ts",
		"src/http/error.ts",
		"src/http/json.ts",
		"src/http/respond.ts",
		"src/http/status.ts",
		"src/http/text.ts",
		"src/headers/headers.ts",
		"src/headers/response-headers.ts",
		"src/headers/base-mime.ts",
	],
	format: ["esm"],
	sourcemap: !isProd,
	dts: true,
	clean: true,
})
