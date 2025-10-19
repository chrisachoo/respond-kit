import { error } from "./error"
import { json } from "./json"
import { text } from "./text"

/**
 * Common HTTP response helpers for quick API building.
 *
 * @example
 * return respond.ok({ user })
 * return respond.text("pong")
 * return respond.error("Bad Request", 400)
 */
export const respond = {
	// JSON
	ok: <T>(data: T) => json(data, 200),
	created: <T>(data: T) => json(data, 201),
	noContent: () => new Response(null, { status: 204 }),

	badRequest: <T>(data: T) => json(data, 400),
	notFound: <T>(data: T) => json(data, 404),

	// Plain text
	text,

	// Errors
	error,
}
