### respond-kit

Tiny, type-safe HTTP response helpers for modern runtimes (Bun, Cloudflare Workers, Deno, Node 18+). Keep responses consistent, DRY, and ergonomic.

---

### Install

```bash
bun add respond-kit
```

---

### Quick start

```ts
import { json, text, error, respond } from "respond-kit"

// JSON
export function GET() {
	return json({ ok: true })
}

// Shorthand helpers
return respond.ok({ user })
return respond.created({ id })
return respond.noContent()

// Plain text
return respond.text("pong")

// Error
return error("Bad Request", 400)
```

---

### Headers with autocomplete

All helpers accept `ResponseInit` and support typed header names. You can pass any `HeadersInit`, and you’ll get autocompletion for standard response headers.

```ts
import { json, type ResponseHeader } from "respond-kit"

const res = json({ ok: true }, {
	status: 201,
	headers: {
		// typed names with autocomplete
		"Cache-Control": "public, max-age=60",
		"Vary": "Accept-Encoding",
	} satisfies Record<ResponseHeader, string>,
})
```

---

### MIME utilities

```ts
import { mimes } from "respond-kit"

// Useful when creating a Response manually
const file = await Bun.file("./logo.png").arrayBuffer()
return new Response(file, {
	headers: { "Content-Type": mimes.png },
})
```

---

### API

- `json<T>(data: T, init?: ResponseInit | status)` → `Response`
- `text(data: string, init?: ResponseInit | status)` → `Response`
- `error(err: string | Error, init?: ResponseInit | status)` → `Response`
- `respond`
  - `ok<T>(data: T)` → 200
  - `created<T>(data: T)` → 201
  - `noContent()` → 204
  - `badRequest<T>(data: T)` → 400
  - `unauthorized<T>(data: T)` → 401
  - `forbidden<T>(data: T)` → 403
  - `notFound<T>(data: T)` → 404
  - `conflict<T>(data: T)` → 409
  - `internalError<T>(data: T)` → 500
  - `notImplemented<T>(data: T)` → 501
  - `text(data: string, init?: ResponseInit | status)`
  - `error(err: string | Error, init?: ResponseInit | status)`

Types and utilities exported for DX:

- `ContentfulStatusCode`
- `ResponseHeader`, `HeaderRecord`
- `mimes`, `BaseMime`

---

### Runtime compatibility

- Bun 1.x
- Cloudflare Workers (undici/fetch-compatible)
- Deno
- Node 18+ (global fetch)

---

### Development

```bash
bun install
bun run check  # biome format + lint
bun run build  # tsdown build to dist/
```

---

### Contributing (git-flow)

This repo uses git-flow for branching and releases. See the excellent
[git-flow cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/).

Initialize git-flow in the repo:

```bash
git flow init
```

Create a feature branch:

```bash
git flow feature start my-feature
# ...commit work...
git flow feature finish my-feature
```

Cut a release:

```bash
git flow release start 1.1.0
# ...bump version, changelog, fixes...
git flow release finish 1.1.0
git push --follow-tags
```

Hotfix from production:

```bash
git flow hotfix start 1.1.1
# ...fix...
git flow hotfix finish 1.1.1
git push --follow-tags
```

---

### License

MIT
