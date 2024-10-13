import { filePathToContentAtom } from "@/atoms"
import { useAtomValue } from "jotai"
import dynamic from "next/dynamic"
import { useState } from "react"
import { type InteractionProps } from "react-json-view"

const ReactJson = dynamic(import("react-json-view"), { ssr: false })

// Add this new component
type EditableFileBufferProps = {
  onClose: () => void
  selectedFilePath: string
}

function EditableJSONBuffer({
  onClose,
  selectedFilePath,
}: EditableFileBufferProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const filePathToContent = useAtomValue(filePathToContentAtom)
  const [content, setContent] = useState<object>(
    filePathToContent[selectedFilePath]!,
  )

  // const handleSave = (p: InteractionProps) => {
  //   console.log("", {
  //     updated_src: p.updated_src,
  //     name: p.name,
  //     new_value: p.new_value,
  //     existing_value: p.existing_value,
  //   })
  //   // onSave(JSON.stringify(editedContent, null, 2))
  //   onClose()
  // }
  const handleEdit = (interaction: InteractionProps) => {
    setContent(interaction.updated_src)
  }

  const handleSave = async () => {
    // await handleZipFileDownload({
    //   filePathToContent,
    // })
  }

  return (
    <div
      role="dialog"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white p-4 rounded-lg w-3/4 h-3/4 flex flex-col">
        <h2 className="text-lg font-bold mb-2">{}</h2>
        {/* {error ? ( */}
        {/*   <div className="text-red-500 mb-2">{error}</div> */}
        {/* ) : ( */}
        <div className="flex-grow border p-2 mb-4 overflow-auto">
          <ReactJson
            theme="bright:inverted"
            name={null}
            src={content}
            defaultValue="string"
            onEdit={handleEdit}
            onDelete={handleEdit}
            displayDataTypes={false}
            enableClipboard={true}
          />
        </div>
        {/* )} */}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
            // disabled={!!error}
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

export { EditableJSONBuffer }
