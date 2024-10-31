import { FilesParsedView } from "../components/files-parsed-view/files-parsed-view"
import { FilesNotParsedView } from "../components/files-not-parsed-view/files-not-parsed-view"
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
