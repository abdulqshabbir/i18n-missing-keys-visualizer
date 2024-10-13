import { test, expect, describe, vitest } from "vitest"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import "vitest-canvas-mock"

import { render, screen } from "./helpers"

import App from "@/pages/index"

const UPLOAD_FILES_MATCHER = /upload.*file/i
const FILES_ACCEPTED_REGEX = /1.*file.*accepted/i

describe("App front-end tests", async () => {
  test("it can load the page", async () => {
    render(<App />)

    const uploadButton = screen.getByText(UPLOAD_FILES_MATCHER)

    expect(uploadButton).toBeDefined()
  })

  test("it can upload a file", async () => {
    render(<App />)

    const file = new File(['{"full": "full"}'], "test.json", {
      type: "application/json",
    })
    const uploadButton = screen.getByTestId("dropzone")
    await userEvent.upload(uploadButton, file)
    const text = await screen.findByText(FILES_ACCEPTED_REGEX)

    expect(text).toBeDefined()
  })

  test("it can accept JSON files", async () => {
    render(<App />)

    const file = [
      new File(['{"hi": "hello"}'], "hello.json", { type: "application/json" }),
    ]
    const uploadButton = screen.getByTestId("dropzone")
    await userEvent.upload(uploadButton, file)
    const text = screen.queryByText(UPLOAD_FILES_MATCHER)

    expect(text).toBeNull()
  })

  test("it does not accept non-JSON files", async () => {
    render(<App />)

    const file = new File(["hello world"], "test.text", { type: "text/plain" })
    const uploadButton = screen.getByTestId("dropzone")
    await userEvent.upload(uploadButton, file)
    const text = await screen.findByText(UPLOAD_FILES_MATCHER)

    expect(text).toBeDefined()
  })

  test("missing keys are marked with an x", async () => {
    render(<App />)

    const files = new File(
      ['{"missing1": "", "missing2": "", "filled": "filled value"}'],
      "missing.json",
      { type: "application/json" },
    )
    const uploadButton = screen.getByTestId("dropzone")
    await userEvent.upload(uploadButton, files)
    const missingKeyMarkedWithX = await screen.findAllByTestId(
      "missing-key-missing1",
    )
    const missingKeyMarkedWithX2 = await screen.findAllByTestId(
      "missing-key-missing2",
    )

    expect(missingKeyMarkedWithX).toBeDefined()
    expect(missingKeyMarkedWithX2).toBeDefined()
  })

  test("it shows confetti when there are no missing keys", async () => {
    render(<App />)

    const file = new File(['{"key": "value"}'], "test.json", {
      type: "application/json",
    })
    const uploadButton = screen.getByTestId("dropzone")
    await userEvent.upload(uploadButton, file)

    expect(screen.getByTestId("confetti")).toBeInTheDocument()
  })

  test("it should render a locale picker if there are missing keys from more than one locale", async () => {
    window.HTMLElement.prototype.hasPointerCapture = vitest.fn()
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.HTMLElement.prototype.scrollIntoView = function () {}

    render(<App />)

    const files = [
      new File(['{"missing_en": ""}'], "locales/en/en.json", {
        type: "application/json",
      }),
      new File(['{"missing_fr": ""}'], "locales/fr/fr.json", {
        type: "application/json",
      }),
    ]

    const uploadButton = screen.getByTestId("dropzone")
    await userEvent.upload(uploadButton, files)
    const localePicker = screen.getByRole("combobox")

    expect(localePicker).toBeInTheDocument()
    expect(screen.getByText("missing_en")).toBeInTheDocument()
    expect(screen.queryByText("missing_fr")).toBe(null)
  })

  test("it should allow user to switch between missing keys grouped by locale", async () => {
    window.HTMLElement.prototype.hasPointerCapture = vitest.fn()
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.HTMLElement.prototype.scrollIntoView = function () {}

    render(<App />)

    const files = [
      new File(['{"missing_en": ""}'], "locales/en/en.json", {
        type: "application/json",
      }),
      new File(['{"missing_fr": ""}'], "locales/fr/fr.json", {
        type: "application/json",
      }),
    ]

    const uploadButton = screen.getByTestId("dropzone")
    await userEvent.upload(uploadButton, files)
    const localePicker = screen.getByRole("combobox")

    await userEvent.click(localePicker)
    const frenchOption = screen.getByText(/french.*general.*/i)
    await userEvent.click(frenchOption)

    expect(screen.getByText("missing_fr")).toBeInTheDocument()
    expect(screen.queryByText("missing_en")).toBe(null)
  })
})
