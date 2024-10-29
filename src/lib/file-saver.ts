import { saveAs } from "file-saver"
import JSZip from "jszip"
import { store, filePathToContentAtom } from "@/atoms"

const handleZipFileDownload = async () => {
  const zip = new JSZip()

  Object.entries(store.get(filePathToContentAtom)).forEach(
    ([filePath, content]) => {
      zip.file(filePath, JSON.stringify(content, null, 2))
    },
  )

  const blob = await zip.generateAsync({ type: "blob" })
  const date = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
  saveAs(blob, `${date}-translations.zip`)
}

export { handleZipFileDownload }
