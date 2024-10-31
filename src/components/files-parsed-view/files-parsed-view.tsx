import ReactConfetti from "react-confetti"
import { DocumentHead } from "../../components/document-head/document-head"
import { DragAndDrop } from "../../components/drag-and-drop/drag-and-drop"
import { Footer } from "../../components/footer/footer"
import { Header } from "../../components/header/header"
import { HeroText } from "../../components/hero-text/hero-text"
import { useState } from "react"
import { type MissingKey } from "@/types"
import { Info, Check, X, Edit2, Download } from "lucide-react"
import { useWindowSize } from "react-use"
import { LocaleListPicker } from "../../components/locale-picker/locale-picker"
import { DEFAULT_LOCALE, localeCodeToLabelMap } from "@/utils/const"
import { EditableJSONBuffer } from "../../components/json-editor/json-editor"
import { useAtom, useAtomValue } from "jotai"
import {
  filesByLocaleAtom,
  localeAtom,
  missingKeysAtom,
  missingKeysAtomByLocale,
  numberOfMissingKeysByFilePathAtom,
  totalNumberOfFilledKeysForLocale,
  totalNumberOfMissingKeysForLocale,
} from "@/atoms"
import { type FileWithPath } from "react-dropzone"
import { Button } from "../../components/ui/button"
import { handleZipFileDownload } from "@/lib/file-saver"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip"

function FilesParsedView() {
  const { width, height } = useWindowSize(1000, 1000)
  const filesByLocale = useAtomValue(filesByLocaleAtom)
  const totalMissingKeys = useAtomValue(totalNumberOfMissingKeysForLocale)

  const handleDownload = async () => {
    try {
      await handleZipFileDownload()
    } finally {
    }
  }

  return (
    <>
      {totalMissingKeys === 0 && (
        <ReactConfetti
          width={width - 100}
          height={height}
          data-testid="confetti"
        />
      )}
      <DocumentHead />
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-8 font-normal">
        <Header />
        <div className="grid grid-cols-1 place-items-center gap-8 rounded-lg bg-purple-200 p-16 lg:grid-cols-[5fr_1fr] lg:px-8">
          <HeroText />
          <DragAndDrop />
        </div>
        <div className="flex flex-col gap-8 text-primary">
          <div className="flex justify-between items-center">
            <SummaryOfNumberOfFilledAndMissingKeys />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      onClick={handleDownload}
                      variant="default"
                      disabled={
                        filesByLocale.length === 0 || totalMissingKeys > 0
                      }
                      data-testid="download-button"
                    >
                      <Download />
                      Download Files
                    </Button>
                  </div>
                </TooltipTrigger>
                {totalMissingKeys > 0 && (
                  <TooltipContent>
                    <p>Fill missing keys before downloading</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
          <SummaryOfFiles />
          <SummaryOfMissingKeys />
        </div>
        <Footer />
      </main>
    </>
  )
}

function SummaryOfFiles() {
  const [selectedFilePath, setSelectedFilePath] = useState<string | undefined>()
  const [editingFile, setEditingFile] = useState(false)

  const filesParsed = useAtomValue(filesByLocaleAtom)
  const numberOfMissingKeysByFilePath = useAtomValue(
    numberOfMissingKeysByFilePathAtom,
  )

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {filesParsed.map((file: FileWithPath, idx) => (
          <div
            className="rounded-sm bg-gray-100 px-2 py-1 text-sm text-primary flex items-center gap-2"
            key={`file-${idx}`}
          >
            {file.name}
            {file.path !== undefined &&
            numberOfMissingKeysByFilePath[file.path]! > 0 ? (
              <X className="text-red-500" />
            ) : (
              <Check className="text-green-500" />
            )}
            <button
              onClick={() => {
                if (!file.path) return
                setSelectedFilePath(file.path)
                setEditingFile(true)
              }}
              className="text-blue-500 hover:text-blue-700 hover:bg-gray-200 p-1 rounded-sm"
              data-testid={`edit-file-${file.name}`}
            >
              <Edit2 size={16} />
            </button>
          </div>
        ))}
      </div>
      {editingFile && selectedFilePath && (
        <EditableJSONBuffer
          selectedFilePath={selectedFilePath}
          onClose={() => setEditingFile(false)}
        />
      )}
    </>
  )
}

function SummaryOfNumberOfFilledAndMissingKeys() {
  const totalFilledKeys = useAtomValue(totalNumberOfFilledKeysForLocale)
  const totalMissingKeys = useAtomValue(totalNumberOfMissingKeysForLocale)
  return (
    <div className="flex gap-8 rounded-lg bg-gray-100 p-4">
      <div className="flex gap-4">
        <Info className="text-gray-400" />
        <p>Summary of keys: </p>
      </div>
      <div className="flex gap-4">
        <Check className="text-green-500" />
        <p>{totalFilledKeys} keys filled!</p>
      </div>
      <div className="flex gap-4">
        <X className="text-red-400" />
        <p>{totalMissingKeys} keys missing</p>
      </div>
    </div>
  )
}

const groupMissingKeysByLocale = (missingKeys: MissingKey[]) => {
  return missingKeys.reduce(
    (acc: Record<string, MissingKey[]>, missingKey: MissingKey) => {
      const missingKeyLocale = missingKey.locale ?? DEFAULT_LOCALE
      if (acc[missingKeyLocale]) {
        acc[missingKeyLocale].push(missingKey)
      } else {
        acc[missingKeyLocale] = [missingKey]
      }
      return acc
    },
    {},
  )
}

const groupMissingKeysByFilePath = (missingKeys: MissingKey[]) => {
  return missingKeys.reduce(
    (acc: Record<string, MissingKey[]>, missingKey: MissingKey) => {
      const missingKeyFile = missingKey.file
      if (acc[missingKeyFile]) {
        acc[missingKeyFile].push(missingKey)
      } else {
        acc[missingKeyFile] = [missingKey]
      }
      return acc
    },
    {},
  )
}

function SummaryOfMissingKeys() {
  const missingKeys = useAtomValue(missingKeysAtom)
  const missingKeysGroupedByLocale = groupMissingKeysByLocale(missingKeys)
  const [languageSelected, setLanguageSelected] = useAtom(localeAtom)

  const onlyDefaultLocale =
    Object.keys(missingKeysGroupedByLocale).length === 1 &&
    Object.keys(missingKeysGroupedByLocale)[0] === DEFAULT_LOCALE

  const atLeastOneMissingKey = missingKeys.length > 0

  const IS_DEFAULT_LOCALE = languageSelected === DEFAULT_LOCALE

  if (missingKeys.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-8">
      {(!onlyDefaultLocale || atLeastOneMissingKey) && (
        <div className="flex justify-between items-center">
          <div className="text-primary text-md font-bold">
            {IS_DEFAULT_LOCALE ? (
              <>Missing Keys</>
            ) : (
              <>Missing Keys in {localeCodeToLabelMap[languageSelected]}</>
            )}
          </div>
          <div>
            <LocaleListPicker
              onChange={(l) => setLanguageSelected(l)}
              locales={Object.keys(missingKeysGroupedByLocale)}
            />
          </div>
        </div>
      )}
      <MissingAndFilledKeysByLocale />
    </div>
  )
}

function MissingAndFilledKeysByLocale() {
  const generateUniqueKey = (
    file: string,
    key: string,
    locale: string | null,
  ) => `${file}-${key}-${locale}`
  const locale = useAtomValue(localeAtom)
  const missingKeysByLocale = useAtomValue(missingKeysAtomByLocale)
  const missingKeysGroupedByFileName = groupMissingKeysByFilePath(
    missingKeysByLocale.filter((mk) => mk.locale === locale),
  )

  return (
    <>
      {Object.keys(missingKeysGroupedByFileName).map((fileName) => (
        <div key={fileName} className="flex flex-col gap-4">
          <div className="text-md">{fileName}</div>
          <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-lg">
            {(missingKeysGroupedByFileName[fileName] ?? []).map(
              (missingKey: MissingKey) => (
                <div
                  key={generateUniqueKey(
                    missingKey.file,
                    missingKey.missingKey,
                    missingKey.locale,
                  )}
                  data-testid={`missing-key-${missingKey.missingKey}`}
                  className="flex flex-row gap-4"
                >
                  <X className="text-red-400" />
                  <div
                    key={generateUniqueKey(
                      missingKey.file,
                      missingKey.missingKey,
                      missingKey.locale,
                    )}
                    className="text-sm"
                  >
                    {missingKey.missingKey}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      ))}
    </>
  )
}

export { FilesParsedView }
