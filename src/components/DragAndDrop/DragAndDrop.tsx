import { Check, Drum, FolderUp } from "lucide-react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { type DragAndDropProps } from "../../types"
import {
  findNumberOfFilledOrMissingKeysRecurse,
  findMissingKeysRecurse,
  isJsonString,
} from "../../utils"

function DragAndDrop({
  isDoneParsing,
  setNumberOfMissingKeys,
  setNumberOfFilledKeys,
  setMissingKeys,
  filesParsed,
  setFilesParsed,
  setIsDoneParsing,
}: DragAndDropProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setNumberOfFilledKeys(0)
      setNumberOfMissingKeys(0)
      setMissingKeys([])
      setIsDoneParsing(false)
      setFilesParsed(() => [])
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onloadend = () => {
          const jsonFile = reader.result
          if (typeof jsonFile !== "string") {
            return
          }

          const translationFileAsObject =
            isJsonString(jsonFile) &&
            (JSON.parse(jsonFile) as unknown as Record<string, unknown>)

          if (!translationFileAsObject) return

          const keys = findMissingKeysRecurse(translationFileAsObject)

          const { filledKeys, missingKeys } =
            findNumberOfFilledOrMissingKeysRecurse(translationFileAsObject)

          setFilesParsed((prev) => [...prev, file.name])
          setMissingKeys((prevMissingKeys) => [
            ...prevMissingKeys,
            ...keys.map((key) => ({ file: file.name, missingKey: key })),
          ])
          setNumberOfFilledKeys((prev) => prev + filledKeys)
          setNumberOfMissingKeys((prev) => prev + missingKeys)
          setIsDoneParsing(true)
        }
      })
    },
    [
      setFilesParsed,
      setIsDoneParsing,
      setMissingKeys,
      setNumberOfFilledKeys,
      setNumberOfMissingKeys,
    ],
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer border-2 border-dashed ${isDragActive ? "border-purple-500" : "border-purple-500"} grid h-64 w-64 place-items-center p-12 ${isDragActive ? "bg-purple-200" : "bg-primary"} rounded-lg text-md text-secondary hover:bg-purple-50`}
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
      <div className="flex items-center justify-center text-secondary lg:w-2/3">
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
