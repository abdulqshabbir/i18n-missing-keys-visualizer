import { type Dispatch, type SetStateAction } from "react"

export type MissingKey = {
  file: string
  missingKey: string
  locale: string | null
}

export type DragAndDropProps = {
  isDoneParsing: boolean
  setNumberOfMissingKeys: Dispatch<SetStateAction<number>>
  setNumberOfFilledKeys: Dispatch<SetStateAction<number>>
  setMissingKeys: Dispatch<SetStateAction<MissingKey[]>>
  filesParsed: string[]
  setFilesParsed: Dispatch<SetStateAction<string[]>>
  setIsDoneParsing: Dispatch<SetStateAction<boolean>>
}
