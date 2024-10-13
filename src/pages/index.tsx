import { FilesParsedView } from "@/components/FilesParsedView/FilesParsedView"
import { FilesNotParsedView } from "@/components/FilesNotParsedView/FilesNotParsedView"
import { useAtomValue } from "jotai"
import { isDoneParsingAtom } from "@/atoms"

export type GroupedKeys = Record<string, string[]>

export default function Home() {
  const isDoneParsing = useAtomValue(isDoneParsingAtom)

  if (isDoneParsing) {
    return <FilesParsedView />
  }

  return (
    <>
      <FilesNotParsedView />
    </>
  )
}
