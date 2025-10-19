import { type HeaderInitLike, mergeHeaders } from "../headers/headers"
import type { ContentfulStatusCode } from "./status"

export function resolveInit(
	init: ContentfulStatusCode | (ResponseInit & { status?: ContentfulStatusCode }) | undefined,
	defaultHeaders?: Record<string, string>
): ResponseInit {
	const status = typeof init === "number" ? init : (init?.status ?? 200)
	const statusText = typeof init === "number" ? undefined : init?.statusText
	const headers = mergeHeaders(
		{ ...(defaultHeaders ?? {}) },
		typeof init === "number" ? undefined : (init?.headers as HeaderInitLike | undefined)
	)
	return { headers, status, statusText }
}
