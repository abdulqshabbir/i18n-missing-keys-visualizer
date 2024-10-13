import { localeMap } from "@/utils/const"

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

function findNumberOfFilledOrMissingKeysRecurse(
  obj: Record<string, unknown> | undefined,
  count = { filledKeys: 0, missingKeys: 0 },
) {
  if (!obj) return count
  const keys = Object.keys(obj)
  for (const key of keys) {
    // This is a leaf node
    if (typeof obj[key] === "string") {
      if (obj[key] !== "") {
        count.filledKeys = count.filledKeys + 1
      } else {
        count.missingKeys = count.missingKeys + 1
      }
    } else {
      // This is a nested object
      findNumberOfFilledOrMissingKeysRecurse(
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

export {
  findMissingKeysRecurse,
  findNumberOfFilledOrMissingKeysRecurse,
  isJsonString,
}
