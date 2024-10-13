import { saveAs } from "file-saver"
import JSZip from "jszip"

const handleZipFileDownload = async ({
  filePathToContent,
}: {
  filePathToContent: Record<string, object>
}) => {
  const zip = new JSZip()

  Object.entries(filePathToContent).forEach(([filePath, content]) => {
    zip.file(filePath, JSON.stringify(content, null, 2))
  })

  const blob = await zip.generateAsync({ type: "blob" })
  saveAs(blob, "updated_translations.zip")
}

export { handleZipFileDownload }
