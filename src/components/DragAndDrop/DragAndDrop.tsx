import { Check, Drum, FolderUp } from "lucide-react"
import { useCallback } from "react"
import { type FileWithPath, useDropzone } from "react-dropzone"
import { isJsonString } from "../../utils"
import { useAtom, useSetAtom } from "jotai"
import {
  filePathToContentAtom,
  filesAtom,
  isDoneParsingAtom,
  localeAtom,
} from "@/atoms"
import { DEFAULT_LOCALE, localeSet } from "@/utils/const"

function DragAndDrop() {
  const [filesParsed, setFilesParsed] = useAtom(filesAtom)
  const [isDoneParsing, setIsDoneParsing] = useAtom(isDoneParsingAtom)
  const setFilePathToContent = useSetAtom(filePathToContentAtom)
  const setLocale = useSetAtom(localeAtom)
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDoneParsing(false)
      setFilesParsed(() => [])
      setFilePathToContent(() => ({}))
      setLocale(() => DEFAULT_LOCALE)
      acceptedFiles.forEach((file: FileWithPath) => {
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onloadend = () => {
          const jsonFile = reader.result

          const translationFileAsObject =
            typeof jsonFile === "string" &&
            isJsonString(jsonFile) &&
            (JSON.parse(jsonFile) as unknown as Record<string, unknown>)

          if (
            !translationFileAsObject ||
            typeof translationFileAsObject !== "object" ||
            !file.path
          )
            return

          setFilePathToContent((prev) => ({
            ...prev,
            [file.path!]: translationFileAsObject,
          }))

          setFilesParsed((prev) => [...prev, { name: file.name, path: file.path }])
          setIsDoneParsing(true)

          const subpaths = file.path?.split("/")
          for (const spath of subpaths) {
            if (localeSet.has(spath)) {
              setLocale(() => spath)
            }
          }
        }
      })
    },
    [setFilePathToContent, setFilesParsed, setIsDoneParsing, setLocale],
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer border-2 border-dashed ${isDragActive ? "border-purple-500" : "border-purple-500"} grid h-64 w-64 place-items-center p-12 ${isDragActive ? "bg-purple-200" : "bg-white"} rounded-lg text-md text-primary hover:bg-purple-50`}
    >
      <input {...getInputProps()} data-testid="dropzone" />
      {!isDoneParsing && (
        <>
          {isDragActive ? (
            <div className="flex flex-col items-center justify-center gap-4 text-sm text-gray-400">
              <Drum size={60} />
              <p>Drop the goods!</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 text-sm text-gray-400">
              <FolderUp size={60} />
              <p>
                Drag &apos;n Drop or Click Here to Upload Folders or JSON files
              </p>
            </div>
          )}
        </>
      )}
      <div className="flex items-center justify-center text-primary lg:w-2/3">
        {isDoneParsing && (
          <div className="flex flex-col items-center justify-center gap-4 text-sm text-gray-400">
            <Check size={60} className="text-green-500" />
            <p className="text-center">
              {filesParsed.length} JSON Files accepted!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export { DragAndDrop }
