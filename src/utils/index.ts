import { type MissingKey } from "@/types"
import { DEFAULT_LOCALE, localeMap } from "@/utils/const"

export type MissingKeyWithLocale = {
  locale: string | null
  key: string
}

function findMissingKeysRecurse(
  obj: Record<string, unknown>,
  fileName: string,
  filePath: string | undefined,
  missingKeys: MissingKeyWithLocale[] = [],
  prefix = "",
): MissingKeyWithLocale[] {
  const keys = Object.keys(obj)

  for (const key of keys) {
    // This is a leaf node
    if (typeof obj[key] === "string") {
      if (obj[key] === "") {
        const filePathSplitBySlash = filePath?.split("/") ?? null

        let keyLocale = null
        if (filePathSplitBySlash) {
          filePathSplitBySlash.forEach((subPath) => {
            if (localeMap[subPath]) {
              keyLocale = localeMap[subPath]
            }
          })
        }
        missingKeys.push({ key, locale: keyLocale })
      }
    } else {
      // This is a nested object
      findMissingKeysRecurse(
        obj[key] as Record<string, unknown>,
        fileName,
        filePath,
        missingKeys,
        !prefix ? key : `${prefix}.${key}`,
      )
    }
  }

  return missingKeys
}

export type AceEditorAnnotation = {
  row: number
  column: number
  type: "error" | "info"
  text: string
}

type RecurseInfo = {
  filledKeys: number
  missingKeys: number
  currentLine: number
  annotations: Array<AceEditorAnnotation>
}

function findJsonFieldInfoRecurse(
  obj: Record<string, unknown> | undefined,
  count: RecurseInfo = {
    filledKeys: 0,
    missingKeys: 0,
    currentLine: -1,
    annotations: [],
  },
) {
  if (!obj) return count
  const keys = Object.keys(obj)
  for (const key of keys) {
    // This is a leaf node
    count.currentLine++
    if (typeof obj[key] === "string") {
      if (obj[key] !== "") {
        count.filledKeys = count.filledKeys + 1
      } else {
        count.missingKeys = count.missingKeys + 1
        count.annotations.push({
          row: count.currentLine,
          column: 0,
          type: "error",
          text: `Missing value for ${key}`,
        })
      }
    } else {
      // This is a nested object
      count.currentLine++
      findJsonFieldInfoRecurse(
        obj[key] as Record<string, unknown>,
        count,
      )
    }
  }
  return count
}

function isJsonString(str: string) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

const groupMissingKeysByLocale = (missingKeys: MissingKey[]) => {
  return missingKeys.reduce(
    (acc: Record<string, MissingKey[]>, missingKey: MissingKey) => {
      const missingKeyLocale = missingKey.locale ?? DEFAULT_LOCALE
      if (acc[missingKeyLocale]) {
        acc[missingKeyLocale].push(missingKey)
      } else {
        acc[missingKeyLocale] = [missingKey]
      }
      return acc
    },
    {},
  )
}

export {
  findMissingKeysRecurse,
  findJsonFieldInfoRecurse,
  isJsonString,
  groupMissingKeysByLocale,
}
