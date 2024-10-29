import { filePathToContentAtom } from "@/atoms"
import { useAtom } from "jotai"
import { useState } from "react"
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/ext-language_tools"

type EditableFileBufferProps = {
  onClose: () => void
  selectedFilePath: string
}

function EditableJSONBuffer({
  onClose,
  selectedFilePath,
}: EditableFileBufferProps) {
  const [filePathToContent, setFilePathToContent] = useAtom(
    filePathToContentAtom,
  )
  const [content, setContent] = useState<string>(
    JSON.stringify(filePathToContent[selectedFilePath] ?? {}),
  )

  const [jsonError, setJsonError] = useState<string | null>(null)
  const filename = selectedFilePath.split("/").pop() ?? selectedFilePath

  const handleSave = async () => {
    let isError = null
    try {
      JSON.parse(content)
      setJsonError(null)
    } catch (e) {
      setJsonError((e as Error).message)
      isError = true
    }
    if (isError) return
    setFilePathToContent((prev) => ({
      ...prev,
      [selectedFilePath]: JSON.parse(content) as object,
    }))
    onClose()
  }

  const handleChange = (newValue: string) => {
    try {
      setContent(newValue)
      JSON.parse(newValue)
      setJsonError(null)
    } catch (e) {
      setJsonError((e as Error).message)
    }
  }

  return (
    <div
      role="dialog"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overscroll-contain"
    >
      <div className="bg-white p-4 rounded-lg w-3/4 h-3/4 flex flex-col overscroll-contain">
        <h2 className="text-md font-bold mb-2 text-purple-800">
          Editing {filename}
        </h2>
        <div className="flex-grow border p-2 mb-4 overflow-hidden overscroll-contain">
          {jsonError && (
            <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              Invalid JSON: {jsonError}
            </div>
          )}
          <AceEditor
            mode="json"
            wrapEnabled
            theme="github"
            onChange={handleChange}
            value={formatString(content)}
            name="json-editor"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              tabSize: 2,
            }}
            tabSize={2}
            width="100%"
            height="410px"
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
            onClick={handleSave}
            disabled={!!jsonError}
          >
            Save
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

function formatString(text: string) {
  let result = text
  try {
    result = JSON.stringify(JSON.parse(text), null, 2)
  } catch (e) {}
  return result
}

export { EditableJSONBuffer }
