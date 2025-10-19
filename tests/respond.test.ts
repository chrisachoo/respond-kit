import { describe, expect, it } from "bun:test"
import { type ContentfulStatusCode, error, json, respond, text } from "../src/index"

describe("json", () => {
	it("returns application/json and serializes body", async () => {
		const res = json({ ok: true })
		expect(res.status).toBe(200)
		expect(res.headers.get("Content-Type")).toContain("application/json")
		expect(await res.json()).toEqual({ ok: true })
	})

	it("respects status and merges headers", async () => {
		const res = json(
			{ ok: true },
			{ status: 201 as ContentfulStatusCode, headers: { "Cache-Control": "no-cache" } }
		)
		expect(res.status).toBe(201)
		expect(res.headers.get("Cache-Control")).toBe("no-cache")
	})
})

describe("text", () => {
	it("returns text/plain by default", async () => {
		const res = text("hello")
		expect(res.status).toBe(200)
		expect(res.headers.get("Content-Type")).toContain("text/plain")
		expect(await res.text()).toBe("hello")
	})
})

describe("error", () => {
	it("serializes error message", async () => {
		const res = error("Bad Request", 400)
		expect(res.status).toBe(400)
		const body = await res.json()
		expect(body).toHaveProperty("error", "Bad Request")
	})
})

describe("respond", () => {
	it("ok/created/noContent", async () => {
		const ok = respond.ok({ a: 1 })
		expect(ok.status).toBe(200)
		const created = respond.created({ id: 1 })
		expect(created.status).toBe(201)
		const no = respond.noContent()
		expect(no.status).toBe(204)
		const body = await ok.json()
		expect(body).toEqual({ a: 1 })
	})

	it("badRequest/notFound", async () => {
		const bad = respond.badRequest({ msg: "no" })
		expect(bad.status).toBe(400)
		const nf = respond.notFound({ msg: "nope" })
		expect(nf.status).toBe(404)
	})
})
