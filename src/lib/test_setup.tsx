import React, { type ReactElement } from "react"
import { render, type RenderOptions } from "@testing-library/react"
import { Provider as JotaiProvider } from "jotai"
import { store } from "@/atoms"
import "vitest-canvas-mock"
import "@testing-library/dom"

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <JotaiProvider store={store}>{children}</JotaiProvider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"
export { customRender as render }
