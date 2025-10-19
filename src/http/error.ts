import { json } from "./json"
import type { ContentfulStatusCode } from "./status"

/**
 * Create an error response from an Error or message.
 *
 * @example
 * return error(new Error("Something went wrong"), 500)
 * return error("Invalid request", 400)
 */
export function error(
	err: string | Error,
	init?: number | (ResponseInit & { status?: number })
): Response {
	const message = typeof err === "string" ? err : err.message
	const status = typeof init === "number" ? init : (init?.status ?? 500)
	const stack = typeof err === "string" ? undefined : err.stack

	return json(
		{ error: message, ...(stack ? { stack } : {}) },
		{ status: status as ContentfulStatusCode }
	)
}
