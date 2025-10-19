/**
 * @module
 * Minimal, commonly-used response headers for DX-friendly autocomplete.
 * Users may always pass any custom header names.
 */
export type ResponseHeader =
	| "Cache-Control"
	| "Content-Type"
	| "Content-Length"
	| "Content-Disposition"
	| "Content-Encoding"
	| "Content-Language"
	| "ETag"
	| "Expires"
	| "Last-Modified"
	| "Location"
	| "Vary"
	| "WWW-Authenticate"
	| "Set-Cookie"
	| "Strict-Transport-Security"
	| "X-Content-Type-Options"
	| "X-Frame-Options"
	| "X-XSS-Protection"
	| "Access-Control-Allow-Origin"
	| "Access-Control-Allow-Headers"
	| "Access-Control-Allow-Methods"
	| "Access-Control-Expose-Headers"
	| "Access-Control-Max-Age"
	| "Server"
	| "Date"

export type CustomHeader = string & {}
