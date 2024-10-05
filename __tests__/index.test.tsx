import { test, expect, describe } from "vitest"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import App from "@/pages/index"
import userEvent from "@testing-library/user-event"
import "vitest-canvas-mock"

const UPLOAD_FILES_MATCHER = /upload.*file/i
const FILES_ACCEPTED_REGEX = /1.*file.*accepted/i
const FILES_PARSED_REGEX = /(\d+).*file.*parsed/i

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

    const file = new File(["hello world"], "test.text", { type: "text/plain" })
    const uploadButton = screen.getByTestId("dropzone")
    await userEvent.upload(uploadButton, file)
    const text = await screen.findByText(UPLOAD_FILES_MATCHER)

    expect(text).toBeDefined()
  })

  test("it does not accept non-JSON files", async () => {
    render(<App />)

    const file = new File(["hello world"], "test.text", { type: "text/plain" })
    const uploadButton = screen.getByTestId("dropzone")
    await userEvent.upload(uploadButton, file)
    const text = await screen.findByText(UPLOAD_FILES_MATCHER)

    expect(text).toBeDefined()
  })

  test("it can show the file names and total number of files parsed", async () => {
    render(<App />)

    const files = [
      new File(['{"hi": "hello"}'], "hello.json", { type: "application/json" }),
      new File(['{"missing": ""}'], "world.json", { type: "application/json" }),
    ]
    const uploadButton = screen.getByTestId("dropzone")
    await userEvent.upload(uploadButton, files)
    const numFilesParsed = await screen.findByText(FILES_PARSED_REGEX)
    const firstFile = screen.queryAllByText(/^hello\.json$/i)
    const secondFile = screen.queryAllByText(/^world\.json$/i)

    expect(numFilesParsed).toHaveTextContent(FILES_PARSED_REGEX)
    expect(firstFile.length).toBeGreaterThan(0)
    expect(secondFile.length).toBeGreaterThan(0)
    expect(firstFile[0]).toHaveTextContent(/^hello\.json$/i)
    expect(secondFile[0]).toHaveTextContent(/^world\.json$/i)
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

    screen.debug(missingKeyMarkedWithX)
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

    expect(screen.getByText(FILES_PARSED_REGEX)).toBeInTheDocument()
    expect(screen.getByTestId("confetti")).toBeInTheDocument()
  })
})
