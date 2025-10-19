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
	unauthorized: <T>(data: T) => json(data, 401),
	forbidden: <T>(data: T) => json(data, 403),
	notFound: <T>(data: T) => json(data, 404),
	conflict: <T>(data: T) => json(data, 409),

	internalError: <T>(data: T) => json(data, 500),
	notImplemented: <T>(data: T) => json(data, 501),

	// Plain text
	text,

	// Errors
	error,
}
