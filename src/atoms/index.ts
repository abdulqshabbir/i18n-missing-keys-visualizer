import { type FileWithPath } from "react-dropzone"
import {
  findMissingKeysRecurse,
  findNumberOfFilledOrMissingKeysRecurse,
} from "@/utils"
import { DEFAULT_LOCALE } from "@/utils/const"
import { atom } from "jotai"
import { type MissingKey } from "@/types"

// primitive atoms
const filesAtom = atom<FileWithPath[]>([])
const filePathToContentAtom = atom<Record<string, object>>({})
const isDoneParsingAtom = atom(false)

// derived atoms
const missingKeysAtom = atom((get) => {
  const missingKeys: MissingKey[] = []
  const paths = Object.keys(get(filePathToContentAtom))
  for (const path of paths) {
    const content = get(filePathToContentAtom)[path]
    const fileName = get(filesAtom).find((file) => file.path === path)?.name

    if (!content || !fileName) continue
    const keys = findMissingKeysRecurse(
      content as Record<string, unknown>,
      fileName,
      path,
    ).map((k) => ({
      file: fileName,
      missingKey: k.key,
      locale: k.locale ?? DEFAULT_LOCALE,
    }))

    missingKeys.push(...keys)
  }

  return missingKeys
})

const numberOfMissingKeysAtom = atom((get) => {
  let missingKeys = 0

  const filePathToContent = get(filePathToContentAtom)
  const paths = Object.keys(filePathToContent)

  for (const path of paths) {
    const fileContents = filePathToContent[path] as Record<string, object>
    const { missingKeys: missing } =
      findNumberOfFilledOrMissingKeysRecurse(fileContents)
    missingKeys += missing
  }
  return missingKeys
})

const numberOfFilledKeysAtom = atom((get) => {
  let filledKeys = 0

  const filePathToContent = get(filePathToContentAtom)
  const paths = Object.keys(filePathToContent)

  for (const path of paths) {
    const fileContents = filePathToContent[path] as Record<string, object>
    const { filledKeys: filled } =
      findNumberOfFilledOrMissingKeysRecurse(fileContents)
    filledKeys += filled
  }
  return filledKeys
})

if (process.env.NODE_ENV !== "production") {
  filesAtom.debugLabel = "filesAtom"
  filePathToContentAtom.debugLabel = "filePathToContentAtom"
  missingKeysAtom.debugLabel = "missingKeysAtom"
  numberOfMissingKeysAtom.debugLabel = "numberOfMissingKeysAtom"
  numberOfFilledKeysAtom.debugLabel = "numberOfFilledKeysAtom"
  isDoneParsingAtom.debugLabel = "isDoneParsingAtom"
}

export {
  filesAtom,
  filePathToContentAtom,
  missingKeysAtom,
  numberOfMissingKeysAtom,
  numberOfFilledKeysAtom,
  isDoneParsingAtom,
}
