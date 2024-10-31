import { type FileWithPath } from "react-dropzone"
import {
  type AceEditorAnnotation,
  findMissingKeysRecurse,
  findJsonFieldInfoRecurse,
} from "@/utils"
import { DEFAULT_LOCALE, localeSet } from "@/utils/const"
import { atom, createStore } from "jotai"
import { type MissingKey } from "@/types"

const store = createStore()

// primitive atoms
const filesAtom = atom<FileWithPath[]>([])
const filePathToContentAtom = atom<Record<string, object>>({})
const isDoneParsingAtom = atom(false)
const localeAtom = atom(DEFAULT_LOCALE)

// derived atoms
const resetFiles = () => {
  store.set(filesAtom, [])
  store.set(filePathToContentAtom, {})
  store.set(isDoneParsingAtom, false)
  store.set(localeAtom, DEFAULT_LOCALE)
}
const filesByLocaleAtom = atom((get) => {
  const files = get(filesAtom)
  const locale = get(localeAtom)
  const result: FileWithPath[] = []
  for (const file of files) {
    const path = file.path
    let fileLocale = DEFAULT_LOCALE
    const subpaths = path?.split("/")
    if (!subpaths) {
      result.push(file)
      continue
    }
    for (const subpath of subpaths) {
      if (localeSet.has(subpath)) {
        fileLocale = subpath
      }
    }
    if (fileLocale === locale) {
      result.push(file)
    }
  }
  return result
})
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

const missingKeysAtomByLocale = atom((get) => {
  const missingKeys = get(missingKeysAtom)
  return missingKeys.filter((mk) => mk.locale === get(localeAtom))
})

const numberOfMissingKeysAtom = atom((get) => {
  let missingKeys = 0

  const filePathToContent = get(filePathToContentAtom)
  const paths = Object.keys(filePathToContent)

  for (const path of paths) {
    const fileContents = filePathToContent[path] as Record<string, object>
    const { missingKeys: missing } =
      findJsonFieldInfoRecurse(fileContents)
    missingKeys += missing
  }
  return missingKeys
})

const numberOfMissingKeysByFilePathAtom = atom((get) => {
  const filePathToContent = get(filePathToContentAtom)
  const filePaths = Object.keys(filePathToContent)
  const result: Record<string, number> = {}

  for (const path of filePaths) {
    const { missingKeys } = findJsonFieldInfoRecurse(
      filePathToContent[path] as Record<string, object>,
    )
    result[path] = missingKeys
  }
  return result
})

const numberOfFilledKeysByFilePathAtom = atom((get) => {
  const filePathToContent = get(filePathToContentAtom)
  const filePaths = Object.keys(filePathToContent)
  const result: Record<string, number> = {}

  for (const path of filePaths) {
    const { filledKeys } = findJsonFieldInfoRecurse(
      filePathToContent[path] as Record<string, object>,
    )
    result[path] = filledKeys
  }
  return result
})

const totalNumberOfFilledKeysForLocale = atom((get) => {
  const locale = get(localeAtom)
  const paths = Object.keys(get(filePathToContentAtom))
  const filledKeysByPath = get(numberOfFilledKeysByFilePathAtom)
  let result = 0

  for (const path of paths) {
    if (locale === DEFAULT_LOCALE) {
      result += filledKeysByPath[path]!
    } else {
      const subpaths = path.split("/")
      for (const subpath of subpaths) {
        if (subpath === locale) {
          result += filledKeysByPath[path]!
        }
      }
    }
  }
  return result
})

const totalNumberOfMissingKeysForLocale = atom((get) => {
  const locale = get(localeAtom)
  const paths = Object.keys(get(filePathToContentAtom))
  const missingKeysByPath = get(numberOfMissingKeysByFilePathAtom)
  let result = 0

  for (const path of paths) {
    if (locale === DEFAULT_LOCALE) {
      result += missingKeysByPath[path]!
    } else {
      const subpaths = path.split("/")
      for (const subpath of subpaths) {
        if (subpath === locale) {
          result += missingKeysByPath[path]!
        }
      }
    }
  }
  return result
})

const totalMissingKeys = atom((get) => {
  const missingKeys = get(missingKeysAtom)
  return missingKeys.length
})

const aceEditorMissingKeyAnnotationsByFilePathAtom = atom((get) => {
  const result: Record<string, AceEditorAnnotation[]> = {}

  const fileContentsByPath = get(filePathToContentAtom)
  const paths = Object.keys(fileContentsByPath)

  for (const path of paths) {
    const content = fileContentsByPath[path]!
    const { annotations } = findJsonFieldInfoRecurse(
      content as Record<string, unknown>,
    )
    result[path] = annotations
  }
  return result
})

if (process.env.NODE_ENV !== "production") {
  filesAtom.debugLabel = "filesAtom"
  filePathToContentAtom.debugLabel = "filePathToContentAtom"
  missingKeysAtom.debugLabel = "missingKeysAtom"
  numberOfMissingKeysAtom.debugLabel = "numberOfMissingKeysAtom"
  isDoneParsingAtom.debugLabel = "isDoneParsingAtom"
  localeAtom.debugLabel = "  localeAtom"
  missingKeysAtomByLocale.debugLabel = "  missingKeysAtomByLocale"
  numberOfMissingKeysByFilePathAtom.debugLabel =
    "  numberOfMissingKeysByFilePathAtom"
  numberOfFilledKeysByFilePathAtom.debugLabel =
    "numberOfFilledKeysByFilePathAtom"
  totalMissingKeys.debugLabel = "totalMissingKeys"
}

export {
  store,
  filesAtom,
  filesByLocaleAtom,
  filePathToContentAtom,
  missingKeysAtom,
  numberOfMissingKeysAtom,
  isDoneParsingAtom,
  localeAtom,
  missingKeysAtomByLocale,
  numberOfMissingKeysByFilePathAtom,
  numberOfFilledKeysByFilePathAtom,
  totalNumberOfFilledKeysForLocale,
  totalNumberOfMissingKeysForLocale,
  totalMissingKeys,
  aceEditorMissingKeyAnnotationsByFilePathAtom,
  resetFiles,
}
