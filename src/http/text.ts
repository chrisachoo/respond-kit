import type { ContentfulStatusCode } from "./status"
import { resolveInit } from "./utils"

/**
 * Create a plain text response.
 *
 * @example
 * return text("Hello World", 200)
 */
export function text(
	data: string,
	init?: ContentfulStatusCode | (ResponseInit & { status?: ContentfulStatusCode })
): Response {
	const responseInit = resolveInit(init, { "Content-Type": "text/plain; charset=utf-8" })
	return new Response(data, responseInit)
}
