import { useState } from "react"
import { type MissingKey } from "@/types"
import { FilesParsedView } from "@/components/FilesParsedView/FilesParsedView"
import { FilesNotParsedView } from "@/components/FilesNotParsedView/FilesNotParsedView"

export type GroupedKeys = Record<string, string[]>

export default function Home() {
  const [isDoneParsing, setIsDoneParsing] = useState<boolean>(false)
  const [missingKeys, setMissingKeys] = useState<MissingKey[]>([])
  const [numberOfFilledKeys, setNumberOfFilledKeys] = useState<number>(0)
  const [numberOfMissingKeys, setNumberOfMissingKeys] = useState<number>(0)
  const [filesParsed, setFilesParsed] = useState<string[]>([])

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
        missingKeys={missingKeys}
      />
    )
  }

  return (
    <>
      <FilesNotParsedView
        isDoneParsing={isDoneParsing}
        setNumberOfMissingKeys={setNumberOfMissingKeys}
        setNumberOfFilledKeys={setNumberOfFilledKeys}
        setMissingKeys={setMissingKeys}
        setFilesParsed={setFilesParsed}
        setIsDoneParsing={setIsDoneParsing}
        filesParsed={filesParsed}
      />
    </>
  )
}
