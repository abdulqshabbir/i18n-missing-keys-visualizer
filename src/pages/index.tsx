import { useState } from "react"
import { type MissingKey } from "../types"
import { FilesParsedView } from "../components/FilesParsedView/FilesParsedView"
import { FilesNotParsedView } from "../components/FilesNotParsedView/FilesNotParsedView"

export type GroupedKeys = Record<string, string[]>

export default function Home() {
  const [isDoneParsing, setIsDoneParsing] = useState<boolean>(false)
  const [missingKeys, setMissingKeys] = useState<MissingKey[]>([])
  const [numberOfFilledKeys, setNumberOfFilledKeys] = useState<number>(0)
  const [numberOfMissingKeys, setNumberOfMissingKeys] = useState<number>(0)
  const [filesParsed, setFilesParsed] = useState<string[]>([])

  const groupedKeys = missingKeys.reduce(
    (groupedKeys: GroupedKeys, key: MissingKey) => {
      if (!groupedKeys[key.file]) {
        groupedKeys[key.file] = []
      }
      // @ts-expect-error - groupedKeys[key] is defined
      groupedKeys[key.file].push(key.missingKey)
      return groupedKeys
    },
    {},
  )

  if (isDoneParsing) {
    return (
      <FilesParsedView
        isDoneParsing={isDoneParsing}
        setNumberOfMissingKeys={setNumberOfMissingKeys}
        setNumberOfFilledKeys={setNumberOfFilledKeys}
        setMissingKeys={setMissingKeys}
        setFilesParsed={setFilesParsed}
        setIsDoneParsing={setIsDoneParsing}
        filesParsed={filesParsed}
        numberOfMissingKeys={numberOfMissingKeys}
        numberOfFilledKeys={numberOfFilledKeys}
        groupedKeys={groupedKeys}
      />
    )
  }

  return (
    <FilesNotParsedView
      isDoneParsing={isDoneParsing}
      setNumberOfMissingKeys={setNumberOfMissingKeys}
      setNumberOfFilledKeys={setNumberOfFilledKeys}
      setMissingKeys={setMissingKeys}
      setFilesParsed={setFilesParsed}
      setIsDoneParsing={setIsDoneParsing}
      filesParsed={filesParsed}
    />
  )
}
