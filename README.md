### respond-kit

Tiny, type-safe HTTP response helpers for modern runtimes (Bun, Cloudflare Workers, Deno, Node 18+). Keep responses consistent, DRY, and ergonomic.

---

### Install

```bash
bun add respond-kit
# or
npm i respond-kit
# or
pnpm add respond-kit
```

---

### Quick start

```ts
import { json, text, error, respond } from "respond-kit";

// JSON
export function GET() {
  return json({ ok: true });
}

// Shorthand helpers
return respond.ok({ user });
return respond.created({ id });
return respond.noContent();

// Plain text
return respond.text("pong");

// Error
return error("Bad Request", 400);
```

---

### Headers with autocomplete

All helpers accept `ResponseInit` and support typed header names. The built-in union only includes common headers to keep types light; you can still pass any custom header name.

```ts
import { json } from "respond-kit";
import { type ResponseHeader } from "respond-kit/headers";

const res = json(
  { ok: true },
  {
    status: 201,
    headers: {
      // typed names with autocomplete
      "Cache-Control": "public, max-age=60",
      Vary: "Accept-Encoding",
    } satisfies Record<ResponseHeader, string>,
  }
);
```

---

### Headers helper

```ts
import { headers } from "respond-kit/headers";

const merged = headers.merge({ "Cache-Control": "public" }, [
  ["Vary", "Accept-Encoding"],
]);
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
  - `notFound<T>(data: T)` → 404
  - `text(data: string, init?: ResponseInit | status)`
  - `error(err: string | Error, init?: ResponseInit | status)`

Types and utilities exported for DX:

- From `respond-kit`: `ContentfulStatusCode`
- From `respond-kit/headers`: `ResponseHeader`, `HeaderRecord`, `HeaderInitLike`, `BaseMime`

---

### Subpath imports and tree‑shaking

Import only what you need using subpath imports. The package is marked `sideEffects: false` to enable aggressive tree‑shaking.

```ts
import { json } from "respond-kit/http/json";
import { respond } from "respond-kit/http/respond";
import { headers } from "respond-kit/headers";
```

This loads the minimal modules instead of the full entry.

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

---

### Maintainers

This project is maintained by:

- [chrisachoo](https://github.com/chrisachoo) (GitHub)

