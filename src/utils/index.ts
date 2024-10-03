function findMissingKeysRecurse(
  obj: Record<string, unknown>,
  missingKeys: string[] = [],
  prefix = "",
): string[] {
  const keys = Object.keys(obj)

  for (const key of keys) {
    // This is a leaf node
    if (typeof obj[key] === "string") {
      if (obj[key] === "") {
        missingKeys.push(key)
      }
    } else {
      // This is a nested object
      findMissingKeysRecurse(
        obj[key] as Record<string, unknown>,
        missingKeys,
        !prefix ? key : `${prefix}.${key}`,
      )
    }
  }

  return missingKeys
}

function findNumberOfFilledOrMissingKeysRecurse(
  obj: Record<string, unknown>,
  count = { filledKeys: 0, missingKeys: 0 },
) {
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
