import type { ContentfulStatusCode } from "./status"
import { resolveInit } from "./utils"

/**
 * Create a JSON Response.
 * - Ensures `Content-Type: application/json`
 * - Accepts a status code or ResponseInit
 * - Defaults to 200 OK
 *
 * @example
 * return json({ ok: true }, 201)
 * return json({ error: "Bad Request" }, { status: 400 })
 */
export function json<T>(
	data: T,
	init?: ContentfulStatusCode | (ResponseInit & { status?: ContentfulStatusCode })
): Response {
	const responseInit = resolveInit(init, { "Content-Type": "application/json" })
	const body = data == null ? null : JSON.stringify(data)
	return new Response(body, responseInit)
}
