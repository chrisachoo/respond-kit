import type { BaseMime } from "./base-mime"
import { type HeaderInitLike, type HeaderRecord, mergeHeaders } from "./headers"
import type { ResponseHeader } from "./response-headers"

export const headers = {
	merge: mergeHeaders,
}

export type { BaseMime, HeaderInitLike, HeaderRecord, ResponseHeader }
