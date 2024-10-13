import React from "react"
import { it, expect } from "vitest"
import { render, screen } from "./helpers"
import App from "@/pages"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import "vitest-canvas-mock"

const files = [
  new File(['{"key1": "value1"}'], "first.json", { type: "application/json" }),
  new File(['{"key2": "value2", "key2missing": ""}'], "second.json", {
    type: "application/json",
  }),
]

it("renders file names and edit buttons", async () => {
  render(<App />)

  const uploadButton = screen.getByTestId("dropzone")
  await userEvent.upload(uploadButton, files)
  const missingKey = screen.getByTestId("missing-key-key2missing")
  expect(missingKey).toBeInTheDocument()
})

it("renders an edit button for the missing key", async () => {
  render(<App />)

  const uploadButton = screen.getByTestId("dropzone")
  await userEvent.upload(uploadButton, files)

  const editButton = screen.getByTestId("edit-file-second.json")
  expect(editButton).toBeInTheDocument()
})

it("clicking edit button opens a modal", async () => {
  render(<App />)

  const uploadButton = screen.getByTestId("dropzone")
  await userEvent.upload(uploadButton, files)

  const editButton = screen.getByTestId("edit-file-second.json")
  await userEvent.click(editButton)

  const modal = screen.getByRole("dialog")
  expect(modal).toBeInTheDocument()
})

it("modal contents match the file contents", async () => {
  render(<App />)

  const uploadButton = screen.getByTestId("dropzone")
  await userEvent.upload(uploadButton, files)

  const editButton = screen.getByTestId("edit-file-second.json")
  await userEvent.click(editButton)

  const modal = screen.getByRole("dialog")
  expect(modal).toBeInTheDocument()

  const saveButton = screen.getByRole("button", { name: /save/i })
  expect(saveButton).toBeInTheDocument()

  const cancelButton = screen.getByRole("button", { name: /cancel/i })
  expect(cancelButton).toBeInTheDocument()
})
