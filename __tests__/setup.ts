import { vi } from "vitest"

vi.stubGlobal("console", {
  warn: vi.fn(),
  log: vi.fn(),
})
