import type { BaseMime } from "./base-mime"
import type { ResponseHeader } from "./response-headers"

export type HeaderRecord =
	| Record<"Content-Type", BaseMime>
	| Record<ResponseHeader, string | string[]>
	| Record<string, string | string[]>

/** Headers-like input that preserves autocomplete for known header names. */
export type HeaderInitLike =
	| HeaderRecord
	| Record<string, string | string[]>
	| Array<[string, string]>
	| Iterable<[string, string]>

function isIterablePairs(value: unknown): value is Iterable<[string, string]> {
	return value != null && typeof (value as any)[Symbol.iterator] === "function"
}

export function mergeHeaders(
	base: Record<string, string>,
	incoming?: HeaderInitLike
): Record<string, string> {
	if (!incoming) return base

	// Convert to mutable target
	const target = base

	if (Array.isArray(incoming) || isIterablePairs(incoming)) {
		for (const [key, value] of incoming as Iterable<[string, string]>) target[key] = value
	} else {
		for (const [key, value] of Object.entries(incoming as Record<string, string | string[]>)) {
			if (Array.isArray(value)) target[key] = value.join(", ")
			else target[key] = value
		}
	}

	return target
}
